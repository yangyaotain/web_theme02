(function () {
    const ICONS = {
        overview: '<svg viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>',
        users: '<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
        connector: '<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/></svg>',
        approval: '<svg viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',
        monitor: '<svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',
        contract: '<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',
        delivery: '<svg viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>',
        money: '<svg viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>',
        supply: '<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',
        space: '<svg viewBox="0 0 24 24"><path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3zm0 2.18L18 6.43V11c0 4.28-2.7 8.36-6 9.84C8.7 19.36 6 15.28 6 11V6.43l6-2.25zM8 10h8v2H8v-2zm0 4h8v2H8v-2z"/></svg>',
        member: '<svg viewBox="0 0 24 24"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/></svg>',
        content: '<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"/></svg>',
        arrow: '<svg class="arrow" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>'
    };

    const MENU = [
        {
            type: 'group',
            key: 'user-config',
            label: '用户管理',
            icon: 'users',
            children: [
                { key: 'user-list', label: '用户列表', disabled: true },
                { key: 'role-manage', label: '角色管理', disabled: true }
            ]
        },
        { type: 'item', key: 'connector', label: '连接器管理', icon: 'connector', disabled: true },
        { type: 'item', key: 'catalog-approval', label: '数据目录审批', icon: 'approval', disabled: true },
        { type: 'item', key: 'monitor-overview', label: '监测概览', icon: 'overview', href: 'operation-monitor-overview.html' },
        {
            type: 'group',
            key: 'catalog-monitor',
            label: '数据目录监测',
            icon: 'monitor',
            children: [
                { key: 'resource-register-catalog', label: '资源登记目录', href: 'operation-resource-register-catalog.html' },
                { key: 'product-register-catalog', label: '产品登记目录', href: 'operation-product-register-catalog.html' },
                { key: 'resource-listing-monitor', label: '数据资源上架监测', href: 'operation-resource-listing-monitor.html' },
                { key: 'product-listing-monitor', label: '数据产品上架监测', href: 'operation-product-listing-monitor.html' },
                { key: 'service-listing-monitor', label: '数据服务上架监测', href: 'operation-service-listing-monitor.html' }
            ]
        },
        {
            type: 'group',
            key: 'contract-monitor',
            label: '订单合同监测',
            icon: 'contract',
            children: [
                { key: 'data-auth-monitor', label: '数据授权监测', href: 'operation-data-auth-monitor.html' },
                { key: 'contract-list-monitor', label: '交易合同监测', href: 'operation-contract-monitor.html' }
            ]
        },
        {
            type: 'group',
            key: 'delivery-monitor',
            label: '数据交付监测',
            icon: 'delivery',
            children: [
                { key: 'delivery-task-monitor', label: '交付任务监测', href: 'operation-delivery-task-monitor.html' },
                { key: 'delivery-log-monitor', label: '交付任务日志', href: 'operation-delivery-log.html' }
            ]
        },
        {
            type: 'group',
            key: 'trade-fee-monitor',
            label: '交易费用监测',
            icon: 'money',
            children: [
                { key: 'bill-monitor', label: '交易账单监测', href: 'operation-bill-monitor.html' },
                { key: 'profitsharing-config', label: '分账基础配置', href: 'operation-profitsharing-config.html' },
                { key: 'profitsharing-merchants', label: '分账接收方管理', href: 'operation-profitsharing-merchants.html' },
                { key: 'profitsharing-rules', label: '平台服务费规则', href: 'operation-profitsharing-rules.html' }
            ]
        },
        { type: 'item', key: 'supply-demand', label: '供需管理', icon: 'supply', disabled: true },
        {
            type: 'group',
            key: 'trusted-space',
            label: '集成管理',
            icon: 'space',
            children: [
                { key: 'space-management', label: '空间管理', href: 'space-management.html' },
                { key: 'space-approval', label: '服务开通审批', href: 'space-approval.html' }
            ]
        },
        {
            type: 'group',
            key: 'member',
            label: '会员管理',
            icon: 'member',
            children: [
                { key: 'member-audit', label: '会员审核', href: 'operation-center.html' },
                { key: 'member-manage', label: '会员管理', href: 'member-manage.html' },
                { key: 'member-system', label: '会员体系', href: 'member-system.html' }
            ]
        },
        {
            type: 'group',
            key: 'content',
            label: '内容管理',
            icon: 'content',
            children: [
                { key: 'cms-portal', label: '门户管理', href: 'cms-portal.html' },
                { key: 'help-center', label: '帮助中心', disabled: true },
                { key: 'policy-news', label: '政策资讯', disabled: true },
                { key: 'cms-community', label: '数据社区', href: 'cms-community.html' },
                { key: 'cms-dashboard', label: '大屏管理', href: 'cms-dashboard.html' },
                { key: 'cms-ai-service', label: '智能客服', href: 'cms-ai-service.html' }
            ]
        }
    ];

    const ACTIVE_BY_PAGE = {
        'operation-center.html': 'member-audit',
        'audit-detail.html': 'member-audit',
        'audit-detail-done.html': 'member-audit',
        'operation-monitor-overview.html': 'monitor-overview',
        'operation-resource-register-catalog.html': 'resource-register-catalog',
        'operation-product-register-catalog.html': 'product-register-catalog',
        'operation-resource-listing-monitor.html': 'resource-listing-monitor',
        'operation-product-listing-monitor.html': 'product-listing-monitor',
        'operation-product-listing-detail.html': 'product-listing-monitor',
        'operation-service-listing-monitor.html': 'service-listing-monitor',
        'operation-data-auth-monitor.html': 'data-auth-monitor',
        'operation-contract-monitor.html': 'contract-list-monitor',
        'operation-delivery-task-monitor.html': 'delivery-task-monitor',
        'operation-delivery-task-detail.html': 'delivery-log-monitor',
        'operation-delivery-log.html': 'delivery-log-monitor',
        'operation-bill-monitor.html': 'bill-monitor',
        'operation-profitsharing-config.html': 'profitsharing-config',
        'operation-profitsharing-rules.html': 'profitsharing-rules',
        'operation-profitsharing-merchants.html': 'profitsharing-merchants',
        'operation-usage-detail-monitor.html': 'bill-monitor',
        'space-approval.html': 'space-approval',
        'space-approval-detail.html': 'space-approval',
        'space-approval-detail-done.html': 'space-approval',
        'space-management.html': 'space-management',
        'member-manage.html': 'member-manage',
        'member-system.html': 'member-system',
        'cms-portal.html': 'cms-portal',
        'cms-community.html': 'cms-community',
        'cms-community-audit.html': 'cms-community',
        'cms-community-audit-pending.html': 'cms-community',
        'cms-community-audit-view.html': 'cms-community',
        'cms-community-detail.html': 'cms-community',
        'cms-dashboard.html': 'cms-dashboard',
        'cms-ai-service.html': 'cms-ai-service'
    };

    function getPageName() {
        const pathname = window.location.pathname || '';
        return pathname.substring(pathname.lastIndexOf('/') + 1) || 'operation-center.html';
    }

    function getActiveKey(container) {
        return container.dataset.active || ACTIVE_BY_PAGE[getPageName()] || '';
    }

    function getCommunityHref() {
        const pageName = getPageName();
        if (pageName === 'cms-community-detail.html') return 'cms-community.html?from=content';
        if (pageName.indexOf('cms-community-audit') === 0) return 'cms-community.html?from=audit';
        const from = new URLSearchParams(window.location.search || '').get('from');
        return from ? 'cms-community.html?from=' + encodeURIComponent(from) : 'cms-community.html';
    }

    function getItemHref(item) {
        if (item.key === 'cms-community') return getCommunityHref();
        return item.href;
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
        const href = getItemHref(item);
        if (href && !item.disabled) {
            return '<a href="' + href + '" class="' + classes.join(' ') + '">' + content + '</a>';
        }
        return '<a class="' + classes.join(' ') + '">' + content + '</a>';
    }

    function renderGroup(item, activeKey) {
        const open = isChildActive(item, activeKey);
        const children = item.children.map(child => renderItem(child, activeKey)).join('');
        return ''
            + '<div class="sidebar-group-title' + (open ? ' open' : '') + '" data-sidebar-group>'
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
        const nav = MENU.map(item => item.type === 'group' ? renderGroup(item, activeKey) : renderItem(item, activeKey)).join('');
        container.innerHTML = '<div class="sidebar-title">运营中心</div><nav class="sidebar-nav">' + nav + '</nav>';
    }

    function bind(container) {
        container.querySelectorAll('[data-sidebar-group]').forEach(group => {
            group.addEventListener('click', () => {
                group.classList.toggle('open');
                const sub = group.nextElementSibling;
                if (sub) sub.style.display = group.classList.contains('open') ? '' : 'none';
            });
        });
    }

    function init() {
        document.querySelectorAll('[data-operation-sidebar]').forEach(container => {
            if (container.dataset.sidebarReady === 'true') return;
            render(container);
            bind(container);
            container.dataset.sidebarReady = 'true';
        });
    }

    init();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    }

    window.OperationSidebar = {
        render,
        menu: MENU
    };
})();
