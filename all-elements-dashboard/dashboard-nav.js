(function () {
  const SMART_QUERY_URL = 'https://yangyaotain.github.io/smart-query-prototype/pages/business/smart-query.html';
  const YEAR_STORAGE_KEY = 'all-elements-dashboard-year';
  const YEAR_OPTIONS = ['2026', '2025', '2024'];
  const DEFAULT_YEAR = '2026';
  const YEAR_FACTORS = {
    '2026': 1,
    '2025': 0.9,
    '2024': 0.8
  };

  let selectedYear = readStoredYear();
  let dashboardDataCaptured = false;
  const dashboardMetricEntries = [];
  const dashboardChartEntries = [];
  const dashboardYearTextEntries = [];

  const navItems = [
    { id: 'overview', label: '综合分析', icon: 'fa-dashboard', href: 'index.html' },
    { id: 'resources', label: '数据资源', icon: 'fa-database', href: 'data-resources.html' },
    { id: 'products', label: '数据产品', icon: 'fa-shopping-bag', href: 'data-products.html' },
    { id: 'consulting', label: '数据咨询', icon: 'fa-comments', href: 'consulting-services.html' },
    { id: 'solutions', label: '行业方案', icon: 'fa-sitemap', href: 'industry-solutions.html' },
    { id: 'demand', label: '需求大厅', icon: 'fa-tasks', href: 'demand-hall.html' },
    { id: 'smart-query', label: '智能问数', icon: 'fa-question-circle', href: SMART_QUERY_URL, target: '_blank' },
    { id: 'monitor-warning', label: '监测预警', icon: 'fa-bell', href: 'monitor-warning.html' }
  ];

  const baseItemClass = 'px-3 2xl:px-5 py-2 rounded-md border border-transparent flex items-center gap-2 font-medium text-sm 2xl:text-base whitespace-nowrap transition-all duration-300';
  const normalItemClass = baseItemClass + ' hover:bg-dark-card text-gray-200';
  const activeItemClass = baseItemClass + ' bg-primary/10 text-primary border border-primary hover:bg-primary/20';

  function normalizeYear(year) {
    const value = String(year || '');
    return YEAR_OPTIONS.includes(value) ? value : DEFAULT_YEAR;
  }

  function readStoredYear() {
    try {
      return normalizeYear(window.sessionStorage.getItem(YEAR_STORAGE_KEY));
    } catch (error) {
      return DEFAULT_YEAR;
    }
  }

  function storeYear(year) {
    try {
      window.sessionStorage.setItem(YEAR_STORAGE_KEY, year);
    } catch (error) {
      // 文件预览或隐私模式下不可写时，仅保留当前页面状态。
    }
  }

  function renderYearOptions() {
    return YEAR_OPTIONS.map(function (year) {
      const selected = year === selectedYear;
      const itemClass = selected ? 'bg-primary/10 text-primary' : 'text-gray-300';
      return [
        '<button type="button" role="option" aria-selected="' + selected + '" data-dashboard-year-option="' + year + '" class="w-full px-3 py-2 rounded-md flex items-center justify-between gap-3 text-sm transition-colors duration-200 hover:bg-primary/10 hover:text-primary ' + itemClass + '">',
        '  <span>' + year + '年度</span>',
        '  <i class="fa fa-check text-primary" style="visibility:' + (selected ? 'visible' : 'hidden') + '"></i>',
        '</button>'
      ].join('');
    }).join('');
  }

  function detectActive() {
    const path = window.location.pathname;
    if (path.includes('data-resources')) return 'resources';
    if (path.includes('data-products')) return 'products';
    if (path.includes('consulting-services')) return 'consulting';
    if (path.includes('industry-solutions')) return 'solutions';
    if (path.includes('demand-hall')) return 'demand';
    if (path.includes('monitor-warning')) return 'monitor-warning';
    return 'overview';
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
      '  <div class="w-full flex justify-between items-center gap-3">',
      '    <div class="flex items-center gap-3 shrink-0">',
      '      <div class="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">',
      '        <i class="fa fa-line-chart text-white text-xl"></i>',
      '      </div>',
      '      <h1 class="text-xl font-bold text-white whitespace-nowrap">全要素展示驾驶舱</h1>',
      '    </div>',
      '    <nav class="flex flex-1 items-center justify-end gap-1 2xl:gap-2 min-w-0">',
      navHtml,
      '    </nav>',
      '    <div class="relative shrink-0 pl-3 border-l border-dark-border" data-dashboard-year-control>',
      '      <button type="button" class="h-9 px-3 rounded-md border border-dark-border bg-dark-card text-gray-200 flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:border-primary hover:text-white" data-dashboard-year-trigger aria-haspopup="listbox" aria-expanded="false">',
      '        <i class="fa fa-calendar-o text-primary"></i>',
      '        <span class="hidden 2xl:inline text-gray-400">统计年度</span>',
      '        <span data-dashboard-year-label>' + selectedYear + '年度</span>',
      '        <i class="fa fa-angle-down text-gray-400 transition-transform duration-200" data-dashboard-year-chevron></i>',
      '      </button>',
      '      <div class="absolute right-0 top-full mt-2 z-50 w-36 rounded-lg border border-dark-border bg-dark-card p-1.5 card-shadow" data-dashboard-year-menu role="listbox" hidden>',
      renderYearOptions(),
      '      </div>',
      '    </div>',
      '  </div>',
      '</header>'
    ].join('');
  }

  function setYearMenuOpen(control, open) {
    const trigger = control.querySelector('[data-dashboard-year-trigger]');
    const menu = control.querySelector('[data-dashboard-year-menu]');
    const chevron = control.querySelector('[data-dashboard-year-chevron]');
    menu.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
    chevron.style.transform = open ? 'rotate(180deg)' : '';
  }

  function updateYearControls(year) {
    document.querySelectorAll('[data-dashboard-year-label]').forEach(function (label) {
      label.textContent = year + '年度';
    });

    document.querySelectorAll('[data-dashboard-year-option]').forEach(function (option) {
      const selected = option.getAttribute('data-dashboard-year-option') === year;
      option.setAttribute('aria-selected', String(selected));
      option.classList.toggle('bg-primary/10', selected);
      option.classList.toggle('text-primary', selected);
      option.classList.toggle('text-gray-300', !selected);
      const check = option.querySelector('.fa-check');
      if (check) check.style.visibility = selected ? 'visible' : 'hidden';
    });
  }

  function scaleNumber(value, factor) {
    if (!Number.isFinite(value)) return value;
    const valueText = String(value);
    const decimals = valueText.includes('.') ? Math.min(valueText.split('.')[1].length, 2) : 0;
    return Number((value * factor).toFixed(decimals));
  }

  function scaleChartPoint(value, factor) {
    if (typeof value === 'number') return scaleNumber(value, factor);
    if (!value || typeof value !== 'object') return value;

    const scaled = Array.isArray(value) ? value.slice() : Object.assign({}, value);
    if (typeof scaled.y === 'number') scaled.y = scaleNumber(scaled.y, factor);
    if (typeof scaled.r === 'number') scaled.r = scaleNumber(scaled.r, factor);
    return scaled;
  }

  function scaleMetricHtml(html, factor) {
    const percentageFactor = 1 - ((1 - factor) * 0.25);
    const metricFactor = html.includes('%') ? percentageFactor : factor;

    return html.replace(/-?\d[\d,]*(?:\.\d+)?/, function (match) {
      const numericValue = Number(match.replace(/,/g, ''));
      if (!Number.isFinite(numericValue)) return match;

      const decimals = match.includes('.') ? match.split('.')[1].length : 0;
      const scaledValue = Number((numericValue * metricFactor).toFixed(decimals));
      if (match.includes(',')) {
        return scaledValue.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        });
      }
      return scaledValue.toFixed(decimals);
    });
  }

  function captureDashboardData() {
    if (dashboardDataCaptured) return;
    dashboardDataCaptured = true;

    const metricSelector = [
      'main h3.text-2xl',
      'main h3.text-3xl',
      'main .text-secondary',
      'main .text-primary',
      'main .text-accent',
      'main .text-red-400',
      'main .text-green-400',
      'main .text-yellow-400',
      'main .text-purple-400',
      'main [data-dashboard-year-value]'
    ].join(',');

    const capturedMetrics = new Set();
    document.querySelectorAll(metricSelector).forEach(function (element) {
      if (capturedMetrics.has(element)) return;
      if (!/-?\d[\d,]*(?:\.\d+)?/.test(element.textContent || '')) return;
      capturedMetrics.add(element);
      dashboardMetricEntries.push({
        element: element,
        baseHtml: element.innerHTML
      });
    });

    document.querySelectorAll('main').forEach(function (main) {
      const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        if ((node.nodeValue || '').includes(DEFAULT_YEAR)) {
          dashboardYearTextEntries.push({ node: node, baseText: node.nodeValue });
        }
        node = walker.nextNode();
      }
    });

    if (window.Chart && typeof window.Chart.getChart === 'function') {
      document.querySelectorAll('main canvas').forEach(function (canvas) {
        const chart = window.Chart.getChart(canvas);
        if (!chart) return;
        dashboardChartEntries.push({
          chart: chart,
          baseDatasets: chart.data.datasets.map(function (dataset) {
            return Array.isArray(dataset.data) ? dataset.data.map(function (value) {
              return value && typeof value === 'object' ? Object.assign({}, value) : value;
            }) : [];
          })
        });
      });
    }
  }

  function applyDashboardYearData(year, animate) {
    captureDashboardData();
    const factor = YEAR_FACTORS[year] || 1;

    dashboardMetricEntries.forEach(function (entry) {
      entry.element.innerHTML = scaleMetricHtml(entry.baseHtml, factor);
    });

    dashboardYearTextEntries.forEach(function (entry) {
      entry.node.nodeValue = entry.baseText.replaceAll(DEFAULT_YEAR, year);
    });

    dashboardChartEntries.forEach(function (entry) {
      entry.baseDatasets.forEach(function (baseData, datasetIndex) {
        const dataset = entry.chart.data.datasets[datasetIndex];
        if (!dataset || !Array.isArray(dataset.data)) return;
        dataset.data.length = baseData.length;
        baseData.forEach(function (value, valueIndex) {
          dataset.data[valueIndex] = scaleChartPoint(value, factor);
        });
      });

      if (animate) entry.chart.update();
      else entry.chart.update('none');
    });
  }

  function emitYearChange(year, previousYear, source) {
    document.dispatchEvent(new CustomEvent('dashboard:year-change', {
      detail: {
        year: year,
        previousYear: previousYear,
        source: source
      }
    }));
  }

  function selectDashboardYear(year, options) {
    const settings = options || {};
    const normalizedYear = normalizeYear(year);
    const previousYear = selectedYear;
    selectedYear = normalizedYear;
    storeYear(normalizedYear);
    updateYearControls(normalizedYear);
    applyDashboardYearData(normalizedYear, settings.animate !== false);
    if (settings.emit !== false) {
      emitYearChange(normalizedYear, previousYear, settings.source || 'user');
    }
  }

  function initYearControl(root) {
    const control = root.querySelector('[data-dashboard-year-control]');
    if (!control || control.getAttribute('data-dashboard-year-ready') === 'true') return;
    control.setAttribute('data-dashboard-year-ready', 'true');

    const trigger = control.querySelector('[data-dashboard-year-trigger]');
    const menu = control.querySelector('[data-dashboard-year-menu]');

    trigger.addEventListener('click', function () {
      setYearMenuOpen(control, menu.hidden);
    });

    trigger.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowDown') return;
      event.preventDefault();
      setYearMenuOpen(control, true);
      const selectedOption = menu.querySelector('[aria-selected="true"]');
      if (selectedOption) selectedOption.focus();
    });

    control.querySelectorAll('[data-dashboard-year-option]').forEach(function (option) {
      option.addEventListener('click', function () {
        selectDashboardYear(option.getAttribute('data-dashboard-year-option'), {
          animate: true,
          emit: true,
          source: 'user'
        });
        setYearMenuOpen(control, false);
        trigger.focus();
      });
    });

    document.addEventListener('click', function (event) {
      if (!control.contains(event.target)) setYearMenuOpen(control, false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || menu.hidden) return;
      setYearMenuOpen(control, false);
      trigger.focus();
    });
  }

  function ensureDashboardFitStyle() {
    if (document.getElementById('dashboard-screen-fit-style')) return;

    const style = document.createElement('style');
    style.id = 'dashboard-screen-fit-style';
    style.textContent = [
      '.dashboard-screen-main { height: calc(100vh - 4rem) !important; padding: 16px !important; overflow: hidden !important; }',
      '@media (min-width: 1600px) { .dashboard-screen-main { padding: 18px !important; } }',
      '.dashboard-screen-main .gap-6 { gap: 16px !important; }',
      '.dashboard-screen-main .mb-6 { margin-bottom: 16px !important; }',
      '.dashboard-screen-main .p-6 { padding: 16px !important; }',
      '.dashboard-screen-main .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 8px !important; }',
      '.dashboard-screen-main .h-\\[380px\\] { height: clamp(280px, 31.5vh, 340px) !important; }',
      '.dashboard-screen-main .h-\\[338px\\] { height: clamp(286px, 31.5vh, 340px) !important; }',
      '.dashboard-screen-main .h-\\[320px\\] { height: clamp(260px, 32vh, 350px) !important; }',
      '.dashboard-screen-main .h-\\[300px\\] { height: clamp(260px, 30vh, 324px) !important; }',
      '.dashboard-screen-main .h-\\[280px\\] { height: clamp(250px, 30vh, 326px) !important; }',
      '.dashboard-screen-main .h-\\[260px\\] { height: clamp(230px, 26vh, 280px) !important; }',
      '.dashboard-screen-main .text-3xl { font-size: 1.6rem !important; line-height: 1.95rem !important; }',
      '.dashboard-screen-main .text-2xl { font-size: 1.35rem !important; line-height: 1.75rem !important; }'
    ].join('\n');

    document.head.appendChild(style);
  }

  function applyDashboardFit() {
    ensureDashboardFitStyle();
    document.querySelectorAll('main').forEach(function (main) {
      main.classList.add('dashboard-screen-main');
      main.setAttribute('data-dashboard-fit', '1920x1080');
    });
  }

  function init() {
    document.querySelectorAll('[data-dashboard-nav]').forEach(function (root) {
      renderNav(root);
      initYearControl(root);
    });
    applyDashboardFit();

    window.DashboardYear = {
      get: function () { return selectedYear; },
      set: function (year) {
        selectDashboardYear(year, { animate: true, emit: true, source: 'api' });
      },
      options: YEAR_OPTIONS.slice()
    };

    window.requestAnimationFrame(function () {
      selectDashboardYear(selectedYear, { animate: false, emit: true, source: 'initial' });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
