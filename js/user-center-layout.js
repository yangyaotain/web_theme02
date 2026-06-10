(function () {
    var icons = {
        workbench: '<svg viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>',
        connector: '<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/></svg>',
        todo: '<svg viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',
        account: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
        arrow: '<svg class="arrow" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',
        message: '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>',
        subscribe: '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 1.99 2H20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
        demand: '<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',
        objection: '<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>'
    };

    var topItems = [
        { key: 'workbench', label: '工作台', icon: 'workbench' },
        { key: 'connector', label: '我的连接器', icon: 'connector' },
        { key: 'todo', label: '待办中心', icon: 'todo' }
    ];

    var accountItems = [
        { key: 'identity', label: '用户身份管理' },
        { key: 'business', label: '业务开通' },
        { key: 'account-info', label: '账号信息' },
        { key: 'account-security', label: '账号安全' },
        { key: 'member', label: '会员中心', href: 'user-center.html' }
    ];

    var bottomItems = [
        { key: 'message', label: '我的消息', icon: 'message' },
        { key: 'subscribe', label: '我的订阅', icon: 'subscribe' },
        { key: 'demand', label: '我的需求', icon: 'demand' },
        { key: 'consults', label: '我的咨询', icon: 'message', href: 'user-consults.html?menu=consults' },
        { key: 'objection', label: '公示异议', icon: 'objection' }
    ];

    function renderItem(item, activeKey, includeIcon) {
        var active = item.key === activeKey ? ' active' : '';
        var href = item.href ? ' href="' + item.href + '"' : '';
        var disabled = item.href ? '' : ' disabled';
        var icon = includeIcon ? icons[item.icon] : '';
        return '<a' + href + ' class="sidebar-item' + disabled + active + '">' + icon + '<span>' + item.label + '</span></a>';
    }

    function renderSidebar(sidebar) {
        var activeKey = sidebar.dataset.active || 'member';
        var topHtml = topItems.map(function (item) {
            return renderItem(item, activeKey, true);
        }).join('');
        var accountHtml = accountItems.map(function (item) {
            return renderItem(item, activeKey, false);
        }).join('');
        var bottomHtml = bottomItems.map(function (item) {
            return renderItem(item, activeKey, true);
        }).join('');

        sidebar.innerHTML = ''
            + '<div class="sidebar-title">用户中心</div>'
            + '<nav class="sidebar-nav">'
            + topHtml
            + '<div class="sidebar-group-title open" data-user-menu-group>'
            + icons.account
            + '<span>账号中心</span>'
            + icons.arrow
            + '</div>'
            + '<div class="sidebar-sub">' + accountHtml + '</div>'
            + bottomHtml
            + '</nav>';

        var group = sidebar.querySelector('[data-user-menu-group]');
        if (!group) return;
        group.addEventListener('click', function () {
            var sub = group.nextElementSibling;
            group.classList.toggle('open');
            if (sub) sub.style.display = group.classList.contains('open') ? '' : 'none';
        });
    }

    function init() {
        document.querySelectorAll('[data-user-center-sidebar]').forEach(renderSidebar);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
