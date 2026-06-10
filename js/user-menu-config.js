/*
 * Shared user menu config.
 * Used by nav-bar.js and admin-topbar.js so user dropdown entries stay consistent.
 */
(function () {
    window.LG_USER_MENU_CONFIG = {
        user: {
            triggerName: '小智',
            accountName: 'gf_demo01',
            company: 'xxx科技有限公司',
            tags: ['数据提供方', '数据需求方']
        },
        items: [
            { label: '用户中心', href: 'user-center.html' },
            { label: '管理中心', href: '#' },
            { label: '工作台', href: 'workbench.html' },
            { label: '运营中心', href: 'operation-center.html' },
            { label: '运维中心', href: 'maintenance-center.html' },
            { label: '全要素展示驾驶舱', href: 'all-elements-dashboard/index.html', target: '_blank' },
            { label: '智能问数', href: 'https://yangyaotain.github.io/smart-query-prototype/pages/business/smart-query.html', target: '_blank' },
            { label: '公共数据运营平台', href: 'https://lgdataops.lggov.cn/index', target: '_blank' },
            { label: '可信数据空间', href: 'https://lgdata.lggov.cn/index', target: '_blank' },
            { label: '数据开发平台', href: 'data-dev-system.html', target: '_blank' }
        ]
    };

    document.dispatchEvent(new CustomEvent('lg-user-menu-config-ready'));
})();
