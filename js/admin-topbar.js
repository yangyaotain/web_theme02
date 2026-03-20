/**
 * admin-topbar.js — 后台管理模块公共顶部栏组件
 *
 * 用法：在页面 topbar-right 区域放置 <div id="adminUserArea"></div>，
 *       引入此脚本后自动注入 首页链接 + 通知铃 + 用户下拉面板。
 *
 * 修改用户信息或菜单只需改此文件，所有后台页面自动生效。
 */
(function () {
    var USER = {
        name: 'gf_demo01',
        company: 'xxx科技有限公司',
        tags: ['数据提供方', '数据需求方']
    };

    var MENU = [
        { label: '用户中心', href: 'user-center.html' },
        { label: '管理中心', href: '#' },
        { label: '工作台', href: '#' },
        { label: '运营中心', href: 'operation-center.html' },
        { label: '可视化大屏', href: '#' },
        { label: '智能问数', href: '#' },
        { label: '智能报告', href: '#' },
        { label: '公共数据运营平台', href: '#' }
    ];

    var tagsHTML = USER.tags.map(function (t) {
        return '<span class="user-tag">' + t + '</span>';
    }).join('');

    var menuHTML = MENU.map(function (m) {
        return '<a href="' + m.href + '" class="user-menu-item">' + m.label + '</a>';
    }).join('');

    var html = ''
        + '<a href="index.html" class="topbar-home">'
        +     '<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>'
        +     '首页'
        + '</a>'
        + '<span class="topbar-notify">'
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

    var el = document.getElementById('adminUserArea');
    if (el) {
        el.innerHTML = html;
    }
})();
