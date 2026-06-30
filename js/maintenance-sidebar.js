(function () {
    const ICONS = {
        base: '<svg viewBox="0 0 24 24"><path d="M12 2 4 6v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V6l-8-4zm0 2.2 6 3V12c0 4-2.5 7.8-6 8.9C8.5 19.8 6 16 6 12V7.2l6-3z"/></svg>',
        business: '<svg viewBox="0 0 24 24"><path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm8-2h8v8h-8v-8zm2 2v4h4v-4h-4z"/></svg>',
        channel: '<svg viewBox="0 0 24 24"><path d="M3 5h18v14H3V5zm2 2v10h14V7H5zm2 2h2v2H7V9zm4 0h6v2h-6V9zm-4 4h10v2H7v-2z"/></svg>',
        payment: '<svg viewBox="0 0 24 24"><path d="M7 11c-1.1 0-2 .9-2 2v1.2L2.6 12.9l-.9 1.8 5.6 3.1c.3.2.6.2 1 .2H15c1.1 0 2-.9 2-2v-1h-2v1H8.3L7 15.3V13h4v-2H7zm11-7c-1.3 0-2.4.8-2.8 2H13v2h2.2c.4 1.2 1.5 2 2.8 2 1.7 0 3-1.3 3-3s-1.3-3-3-3zm0 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"/></svg>',
        portal: '<svg viewBox="0 0 24 24"><path d="M6 3h12c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm0 2v14h12V5H6zm3 3h6v2H9V8zm0 4h6v2H9v-2z"/></svg>',
        message: '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>',
        log: '<svg viewBox="0 0 24 24"><path d="M12 14c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3S9 3.3 9 5v6c0 1.7 1.3 3 3 3zm5.3-3c0 3-2.5 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.4 2.7 6.2 6 6.7V21h2v-3.3c3.3-.5 6-3.3 6-6.7h-1.7z"/></svg>',
        arrow: '<svg class="arrow" viewBox="0 0 24 24"><path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>'
    };

    const MENU = [
        { type: 'group', key: 'base-config', label: '基础配置管理', icon: 'base', children: [] },
        { type: 'group', key: 'business-config', label: '业务配置管理', icon: 'business', children: [] },
        { type: 'group', key: 'data-channel', label: '数据通道管理', icon: 'channel', children: [] },
        { type: 'group', key: 'payment-config', label: '支付结算配置', icon: 'payment', children: [] },
        { type: 'item', key: 'portal-config', label: '门户配置管理', icon: 'portal' },
        {
            type: 'group',
            key: 'message-config',
            label: '消息配置管理',
            icon: 'message',
            open: true,
            children: [
                { key: 'message-template', label: '消息模板' },
                { key: 'channel-config', label: '渠道配置' },
                { key: 'message-base-config', label: '基础配置' },
                { key: 'alert-management', label: '告警管理', href: 'maintenance-alert-management.html' }
            ]
        },
        { type: 'group', key: 'log-manage', label: '日志管理', icon: 'log', children: [] }
    ];

    const ACTIVE_BY_PAGE = {
        'maintenance-center.html': 'alert-management',
        'maintenance-data-board.html': 'data-board',
        'maintenance-dashboard.html': 'dashboard',
        'maintenance-query-control.html': 'query-control',
        'maintenance-dataset.html': 'dataset',
        'maintenance-data-source.html': 'data-source',
        'maintenance-alert-management.html': 'alert-management',
        'maintenance-alert-form.html': 'alert-management'
    };

    function getPageName() {
        const pathname = window.location.pathname || '';
        return pathname.substring(pathname.lastIndexOf('/') + 1) || 'maintenance-alert-management.html';
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
        const childActive = isChildActive(item, activeKey);
        const open = item.open || childActive;
        const classes = ['sidebar-group-title'];
        if (open) classes.push('open');
        if (childActive || item.key === activeKey) classes.push('active');
        const children = (item.children || []).map(child => renderItem(child, activeKey)).join('');
        return ''
            + '<div class="' + classes.join(' ') + '" data-maintenance-group>'
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
