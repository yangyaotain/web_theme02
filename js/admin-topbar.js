/**
 * admin-topbar.js — 后台管理模块公共顶部栏组件
 *
 * 用法：
 * 1. 新页面推荐放置 <div data-admin-topbar data-active="operation"></div>。
 * 2. 旧页面保留 <header class="admin-topbar">...</header>，引入脚本后会自动统一顶部导航。
 *
 * 用户信息和菜单来自 user-menu-config.js，所有后台页面自动生效。
 */
(function () {
    var TOP_NAV = [
        { key: 'workbench', label: '工作台', href: 'workbench.html' },
        { key: 'buyer', label: '需方中心', href: 'buyer-center.html' },
        { key: 'supplier', label: '供方中心', href: 'supplier-center.html' },
        { key: 'operation', label: '运营中心', href: 'operation-center.html' },
        { key: 'maintenance', label: '运维中心', href: 'maintenance-alert-management.html' },
        { key: 'island', label: '数据岛系统', href: 'data-island-system.html' }
    ];

    function getPageName() {
        var pathname = window.location.pathname || '';
        return pathname.substring(pathname.lastIndexOf('/') + 1) || 'index.html';
    }

    function inferActiveByPage() {
        var page = getPageName();
        if (page === 'workbench.html') return 'workbench';
        if (page === 'buyer-center.html') return 'buyer';
        if (page === 'supplier-center.html') return 'supplier';
        if (page === 'data-island-system.html') return 'island';
        if (page === 'maintenance-center.html' || page.indexOf('maintenance-') === 0) return 'maintenance';
        if (page === 'smart-report.html') return 'maintenance';
        if (
            page === 'operation-center.html'
            || page.indexOf('operation-') === 0
            || page.indexOf('cms-') === 0
            || page.indexOf('member-') === 0
            || page.indexOf('space-') === 0
            || page.indexOf('audit-detail') === 0
        ) {
            return 'operation';
        }
        return '';
    }

    function getActiveFromExistingNav(root) {
        var active = root && root.querySelector ? root.querySelector('.topbar-nav-item.active') : null;
        if (!active) return '';
        var label = (active.textContent || '').replace(/\s+/g, '');
        var href = active.getAttribute('href') || '';
        if (label === '工作台' || href.indexOf('workbench.html') >= 0) return 'workbench';
        if (label === '需方中心' || href.indexOf('buyer-center.html') >= 0) return 'buyer';
        if (label === '供方中心' || href.indexOf('supplier-center.html') >= 0) return 'supplier';
        if (label === '运营中心' || href.indexOf('operation-center.html') >= 0) return 'operation';
        if (
            label === '运维中心'
            || href.indexOf('maintenance-center.html') >= 0
            || href.indexOf('maintenance-alert-management.html') >= 0
            || label === '智能报告'
        ) return 'maintenance';
        if (label === '数据岛系统' || href.indexOf('data-island-system.html') >= 0 || href.indexOf('all-elements-dashboard') >= 0) return 'island';
        return '';
    }

    function getActiveKey(target) {
        return (target && (target.dataset.adminActive || target.dataset.active))
            || getActiveFromExistingNav(target)
            || inferActiveByPage();
    }

    function renderTopNav(activeKey) {
        return TOP_NAV.map(function (item) {
            var cls = item.key === activeKey ? 'topbar-nav-item active' : 'topbar-nav-item';
            var target = item.target ? ' target="' + item.target + '"' : '';
            return '<a href="' + item.href + '" class="' + cls + '"' + target + '>' + item.label + '</a>';
        }).join('');
    }

    function renderHeaderInner(activeKey) {
        return ''
            + '<div class="topbar-left">'
            +     '<a href="index.html" class="topbar-logo">'
            +         '<img src="images/logo.png" alt="龙岗数据">'
            +         '龙岗数据聚合服务平台'
            +     '</a>'
            +     '<nav class="topbar-nav">' + renderTopNav(activeKey) + '</nav>'
            + '</div>'
            + '<div id="adminUserArea" class="topbar-right"></div>';
    }

    function renderAdminTopbar(target) {
        if (!target) return;
        var activeKey = getActiveKey(target);
        if (target.classList && target.classList.contains('admin-topbar')) {
            target.innerHTML = renderHeaderInner(activeKey);
            target.dataset.adminTopbarReady = 'true';
            return;
        }

        target.innerHTML = '<header class="admin-topbar" data-admin-topbar-ready="true">'
            + renderHeaderInner(activeKey)
            + '</header>';
    }

    function renderAdminTopbars() {
        var containers = document.querySelectorAll('[data-admin-topbar], [data-workbench-topbar]');
        containers.forEach(function (container) {
            renderAdminTopbar(container);
        });

        document.querySelectorAll('header.admin-topbar').forEach(function (header) {
            if (header.closest('[data-admin-topbar], [data-workbench-topbar]')) return;
            renderAdminTopbar(header);
        });
    }

    function loadLGUserMenuConfig(callback) {
        if (window.LG_USER_MENU_CONFIG) {
            callback(window.LG_USER_MENU_CONFIG);
            return;
        }

        if (window.__lgUserMenuConfigLoading) {
            document.addEventListener('lg-user-menu-config-ready', function () {
                callback(window.LG_USER_MENU_CONFIG);
            }, { once: true });
            return;
        }

        window.__lgUserMenuConfigLoading = true;
        var script = document.createElement('script');
        script.src = 'js/user-menu-config.js';
        script.onload = function () {
            window.__lgUserMenuConfigLoading = false;
            callback(window.LG_USER_MENU_CONFIG);
        };
        script.onerror = function () {
            window.__lgUserMenuConfigLoading = false;
            callback(null);
        };
        document.head.appendChild(script);
    }

    function renderAdminUserArea(el) {
        var menuConfig = window.LG_USER_MENU_CONFIG || {};
        var configUser = menuConfig.user || {};
        var USER = {
            name: configUser.accountName || 'gf_demo01',
            company: configUser.company || 'xxx科技有限公司',
            tags: configUser.tags || ['数据提供方', '数据需求方']
        };

        var MENU = menuConfig.items || [];

        var tagsHTML = USER.tags.map(function (t) {
            return '<span class="user-tag">' + t + '</span>';
        }).join('');

        var menuHTML = MENU.map(function (m) {
            return '<a href="' + m.href + '" class="user-menu-item"' + (m.target ? ' target="' + m.target + '"' : '') + '>' + m.label + '</a>';
        }).join('');

        var html = ''
        + '<a href="index.html" class="topbar-home">'
        +     '<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>'
        +     '首页'
        + '</a>'
        + '<span class="topbar-notify" title="通知">'
        +     '<svg viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>'
        +     '<span class="topbar-notify-dot"></span>'
        + '</span>'
        + '<div class="topbar-user-wrap">'
        +     '<span class="topbar-user">'
        +         '<span class="topbar-avatar">'
        +             '<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>'
        +         '</span>'
        +         USER.name
        +         '<svg class="topbar-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>'
        +     '</span>'
        +     '<div class="user-panel">'
        +         '<div class="user-info-card">'
        +             '<div class="user-info-avatar">'
        +                 '<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/></svg>'
        +             '</div>'
        +             '<div>'
        +                 '<div class="user-info-name">' + USER.name + '</div>'
        +                 '<div class="user-info-company">' + USER.company + '</div>'
        +             '</div>'
        +         '</div>'
        +         '<div class="user-tags">' + tagsHTML + '</div>'
        +         '<div class="user-menu-list">' + menuHTML + '</div>'
        +         '<div class="user-logout-wrap">'
        +             '<button class="logout-btn" onclick="localStorage.removeItem(\'lgk_logged_in\');location.href=\'index.html\';">退出</button>'
        +         '</div>'
        +     '</div>'
        + '</div>';

        if (el) {
            el.innerHTML = html;
            bindMessageDropdown(el);
        }
    }

    function renderAdminUserAreas() {
        document.querySelectorAll('#adminUserArea').forEach(function (el) {
            renderAdminUserArea(el);
        });
    }

    function loadMessageCenter(callback) {
        if (window.MessageCenter) {
            callback();
            return;
        }

        if (window.__messageCenterLoading) {
            document.addEventListener('message-center-ready', callback, { once: true });
            return;
        }

        window.__messageCenterLoading = true;
        var script = document.createElement('script');
        script.src = 'js/message-center.js';
        script.onload = function () {
            window.__messageCenterLoading = false;
            document.dispatchEvent(new CustomEvent('message-center-ready'));
            callback();
        };
        document.head.appendChild(script);
    }

    function bindMessageDropdown(root) {
        var bell = root.querySelector('.topbar-notify');
        if (!bell) return;

        loadMessageCenter(function () {
            if (!window.MessageCenter) return;
            window.MessageCenter.bindDropdown({
                root: document,
                trigger: bell,
                badgeSelector: '.topbar-notify-dot'
            });
        });
    }

    function init() {
        renderAdminTopbars();
        loadLGUserMenuConfig(renderAdminUserAreas);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.AdminTopbar = {
        navItems: TOP_NAV,
        render: renderAdminTopbar,
        renderAll: renderAdminTopbars,
        getActiveKey: getActiveKey
    };
})();
