(function () {
  const SMART_QUERY_URL = 'https://yangyaotain.github.io/smart-query-prototype/pages/business/smart-query.html';

  const navItems = [
    { id: 'overview', label: '综合分析', icon: 'fa-dashboard', href: 'index.html' },
    { id: 'resources', label: '数据资源', icon: 'fa-database', href: 'data-resources.html' },
    { id: 'products', label: '数据产品', icon: 'fa-shopping-bag', href: 'data-products.html' },
    { id: 'consulting', label: '数据咨询', icon: 'fa-comments', href: 'consulting-services.html' },
    { id: 'solutions', label: '行业方案', icon: 'fa-sitemap', href: 'industry-solutions.html' },
    { id: 'demand', label: '需求大厅', icon: 'fa-tasks', href: 'demand-hall.html' },
    { id: 'smart-query', label: '智能问数', icon: 'fa-question-circle', href: SMART_QUERY_URL, target: '_blank' },
    { id: 'monitor-warning', label: '监测预警', icon: 'fa-bell', reserved: true }
  ];

  const baseItemClass = 'px-3 2xl:px-5 py-2 rounded-md border border-transparent flex items-center gap-2 font-medium text-sm 2xl:text-base whitespace-nowrap transition-all duration-300';
  const normalItemClass = baseItemClass + ' hover:bg-dark-card text-gray-200';
  const activeItemClass = baseItemClass + ' bg-primary/10 text-primary border border-primary hover:bg-primary/20';

  function detectActive() {
    const path = window.location.pathname;
    if (path.includes('data-resources')) return 'resources';
    if (path.includes('data-products')) return 'products';
    if (path.includes('consulting-services')) return 'consulting';
    if (path.includes('industry-solutions')) return 'solutions';
    if (path.includes('demand-hall')) return 'demand';
    return 'overview';
  }

  function showReservedToast() {
    let toast = document.getElementById('dashboardNavToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'dashboardNavToast';
      toast.className = 'fixed top-20 right-8 z-50 rounded-lg border border-primary/40 bg-dark-card px-4 py-3 text-sm text-white shadow-2xl transition-all duration-300 opacity-0 translate-y-2';
      toast.innerHTML = '<i class="fa fa-info-circle text-primary mr-2"></i><span>监测预警功能建设中</span>';
      document.body.appendChild(toast);
    }

    window.clearTimeout(toast._hideTimer);
    requestAnimationFrame(function () {
      toast.classList.remove('opacity-0', 'translate-y-2');
    });
    toast._hideTimer = window.setTimeout(function () {
      toast.classList.add('opacity-0', 'translate-y-2');
    }, 1800);
  }

  function renderNav(root) {
    const active = root.getAttribute('data-active') || detectActive();
    const navHtml = navItems.map(function (item) {
      const itemClass = item.id === active ? activeItemClass : normalItemClass;
      const content = '<i class="fa ' + item.icon + '"></i><span>' + item.label + '</span>';

      if (item.reserved) {
        return '<button type="button" class="' + itemClass + '" data-dashboard-reserved="monitor-warning">' + content + '</button>';
      }

      const target = item.target ? ' target="' + item.target + '" rel="noopener noreferrer"' : '';
      return '<a href="' + item.href + '" class="' + itemClass + '"' + target + '>' + content + '</a>';
    }).join('');

    root.innerHTML = [
      '<header class="bg-dark border-b border-dark-border h-16 flex items-center px-6 2xl:px-8">',
      '  <div class="w-full flex justify-between items-center gap-4">',
      '    <div class="flex items-center gap-3 shrink-0">',
      '      <div class="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">',
      '        <i class="fa fa-line-chart text-white text-xl"></i>',
      '      </div>',
      '      <h1 class="text-xl font-bold text-white whitespace-nowrap">全要素展示驾驶舱</h1>',
      '    </div>',
      '    <nav class="flex items-center justify-end gap-1 2xl:gap-2 min-w-0">',
      navHtml,
      '    </nav>',
      '    <div class="hidden 2xl:block w-1"></div>',
      '  </div>',
      '</header>'
    ].join('');
  }

  function init() {
    document.querySelectorAll('[data-dashboard-nav]').forEach(function (root) {
      renderNav(root);
    });

    document.addEventListener('click', function (event) {
      if (event.target.closest('[data-dashboard-reserved="monitor-warning"]')) {
        showReservedToast();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
