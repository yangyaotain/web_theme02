(function () {
    const ICONS = {
        register: '<svg viewBox="0 0 24 24"><path d="M4 5c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V5zm2 0v14h12V5H6zm2 2h8v2H8V7zm0 4h3v2H8v-2zm5 0h3v2h-3v-2zm-5 4h3v2H8v-2zm5 0h3v2h-3v-2z"/></svg>',
        base: '<svg viewBox="0 0 24 24"><path d="M12 2 4 6v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V6l-8-4zm0 2.2 6 3V12c0 4-2.5 7.8-6 8.9C8.5 19.8 6 16 6 12V7.2l6-3z"/></svg>',
        business: '<svg viewBox="0 0 24 24"><path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm8-2h8v8h-8v-8zm2 2v4h4v-4h-4z"/></svg>',
        channel: '<svg viewBox="0 0 24 24"><path d="M3 5h18v14H3V5zm2 2v10h14V7H5zm2 2h2v2H7V9zm4 0h6v2h-6V9zm-4 4h10v2H7v-2z"/></svg>',
        control: '<svg viewBox="0 0 24 24"><path d="M12 1 21 6v7c0 5-3.8 9.3-9 10-5.2-.7-9-5-9-10V6l9-5zm0 2.3L5 7.2V13c0 4 2.8 7.3 7 8 4.2-.7 7-4 7-8V7.2l-7-3.9zm0 4.7 1.4 2.8 3.1.4-2.2 2.1.5 3.1L12 15l-2.8 1.4.5-3.1-2.2-2.1 3.1-.4L12 8z"/></svg>',
        payment: '<svg viewBox="0 0 24 24"><path d="M3 17h18v2H3v-2zm2-4h4c1.7 0 3-1.3 3-3V5h2v5c0 2.8-2.2 5-5 5H5v-2zm11.5-7.5 4 4-4 4-1.4-1.4 1.6-1.6H14V8.5h2.7l-1.6-1.6 1.4-1.4z"/></svg>',
        portal: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/></svg>',
        message: '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>',
        log: '<svg viewBox="0 0 24 24"><path d="M12 14c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3S9 3.3 9 5v6c0 1.7 1.3 3 3 3zm5.3-3c0 3-2.5 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.4 2.7 6.2 6 6.7V21h2v-3.3c3.3-.5 6-3.3 6-6.7h-1.7z"/></svg>',
        dashboard: '<svg viewBox="0 0 24 24"><path d="M5 9h2v10H5V9zm4-4h2v14H9V5zm4 7h2v7h-2v-7zm4-9h2v16h-2V3zM3 21h18v-2H3v2z"/></svg>',
        menu: '<svg viewBox="0 0 24 24"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg>',
        arrow: '<svg class="arrow" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>'
    };

    const MENU = [
        { type: 'item', key: 'platform-register', label: '平台登记管理', icon: 'register' },
        { type: 'group', key: 'base-config', label: '基础配置管理', icon: 'base', children: [] },
        { type: 'group', key: 'business-config', label: '业务配置管理', icon: 'business', children: [] },
        { type: 'group', key: 'data-channel', label: '数据通道管理', icon: 'channel', children: [] },
        { type: 'group', key: 'system-control', label: '系统控制策略', icon: 'control', children: [] },
        { type: 'group', key: 'payment-config', label: '支付结算配置', icon: 'payment', children: [] },
        { type: 'item', key: 'portal-config', label: '门户配置管理', icon: 'portal' },
        { type: 'group', key: 'message-config', label: '消息配置管理', icon: 'message', children: [] },
        { type: 'group', key: 'log-manage', label: '日志管理', icon: 'log', children: [] },
        {
            type: 'group',
            key: 'dashboard-custom',
            label: '仪表盘定制',
            icon: 'dashboard',
            open: true,
            hidden: true,
            children: [
                { key: 'data-board', label: '数据看板', href: 'maintenance-data-board.html' },
                { key: 'dashboard', label: '仪表盘', href: 'maintenance-dashboard.html' },
                { key: 'query-control', label: '查询控件', href: 'maintenance-query-control.html' },
                { key: 'dataset', label: '数据集', href: 'maintenance-dataset.html' },
                { key: 'data-source', label: '数据源', href: 'maintenance-data-source.html' }
            ]
        }
    ];

    const ACTIVE_BY_PAGE = {
        'maintenance-center.html': 'platform-register',
        'maintenance-data-board.html': 'data-board',
        'maintenance-dashboard.html': 'dashboard',
        'maintenance-query-control.html': 'query-control',
        'maintenance-dataset.html': 'dataset',
        'maintenance-data-source.html': 'data-source'
    };

    function getPageName() {
        const pathname = window.location.pathname || '';
        return pathname.substring(pathname.lastIndexOf('/') + 1) || 'maintenance-center.html';
    }

    function getActiveKey(container) {
        return container.dataset.active || ACTIVE_BY_PAGE[getPageName()] || '';
    }

    function isChildActive(item, activeKey) {
        return item.children && item.children.some(child => child.key === activeKey);
    }

    function renderItem(item, activeKey) {
        const classes = ['sidebar-item'];
        if (item.key === activeKey) classes.push('active');
        if (item.disabled) classes.push('disabled');
        const icon = item.icon ? (ICONS[item.icon] || '') : '';
        const content = icon + '<span>' + item.label + '</span>';
        if (item.href && !item.disabled) {
            return '<a href="' + item.href + '" class="' + classes.join(' ') + '">' + content + '</a>';
        }
        return '<a class="' + classes.join(' ') + '">' + content + '</a>';
    }

    function renderGroup(item, activeKey) {
        const open = item.open || isChildActive(item, activeKey);
        const children = (item.children || []).map(child => renderItem(child, activeKey)).join('');
        return ''
            + '<div class="sidebar-group-title' + (open ? ' open' : '') + '" data-maintenance-group>'
            + (ICONS[item.icon] || '')
            + '<span>' + item.label + '</span>'
            + ICONS.arrow
            + '</div>'
            + '<div class="sidebar-sub" style="display:' + (open ? '' : 'none') + '">'
            + children
            + '</div>';
    }

    function render(container) {
        const activeKey = getActiveKey(container);
        const nav = MENU
            .filter(item => !item.hidden)
            .map(item => item.type === 'group' ? renderGroup(item, activeKey) : renderItem(item, activeKey))
            .join('');
        container.innerHTML = ''
            + '<div class="sidebar-title">'
            + '<span>运维中心</span>'
            + '<span class="maintenance-menu-icon" aria-hidden="true">' + ICONS.menu + '</span>'
            + '</div>'
            + '<nav class="sidebar-nav">' + nav + '</nav>';
    }

    function bind(container) {
        container.querySelectorAll('[data-maintenance-group]').forEach(group => {
            group.addEventListener('click', () => {
                group.classList.toggle('open');
                const sub = group.nextElementSibling;
                if (sub) sub.style.display = group.classList.contains('open') ? '' : 'none';
            });
        });
    }

    function init() {
        document.querySelectorAll('[data-maintenance-sidebar]').forEach(container => {
            render(container);
            bind(container);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.MaintenanceSidebar = {
        render,
        menu: MENU
    };
})();
