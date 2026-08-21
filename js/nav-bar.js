/**
 * <nav-bar> Web Component
 * 龙岗数据聚合服务平台 — 统一导航栏组件
 *
 * 用法：
 *   <nav-bar active="home"></nav-bar>
 *
 * active 可选值：
 *   home | public-data-operations | data-trade | data-services | data-ecosystem | demand | policy | help
 *
 * 登录状态通过 localStorage('lgk_logged_in') 驱动，登录后自动切换右侧 UI。
 */
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

class NavBar extends HTMLElement {
    static get observedAttributes() {
        return ['active'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this._refresh();
    }

    attributeChangedCallback() {
        if (this.isConnected) this._refresh();
    }

    _refresh() {
        var self = this;
        loadLGUserMenuConfig(function () {
            self._render();
            self._bindEvents();
        });
    }

    _isLoggedIn() {
        try { return localStorage.getItem('lgk_logged_in') === '1'; }
        catch (e) { return false; }
    }

    _getSpecialZoneItems() {
        const fallback = [
            {
                id: 'corpus-data-zone',
                label: '语料数据专区',
                href: 'special-zone.html?zone=corpus-data-zone',
                sort: 1
            },
            {
                id: 'city-governance-zone',
                label: '城市治理专区',
                href: 'special-zone.html?zone=city-governance-zone',
                sort: 2
            },
            {
                id: 'medical-health-zone',
                label: '医疗健康专区',
                href: 'special-zone.html?zone=medical-health-zone',
                sort: 3
            },
            {
                id: 'embodied-intelligence-zone',
                label: '具身智能专区',
                href: 'special-zone.html?zone=embodied-intelligence-zone',
                sort: 4
            }
        ];
        try {
            const raw = localStorage.getItem('lgk_special_zones_v1');
            if (!raw) return fallback;
            const state = JSON.parse(raw);
            if (!state || !Array.isArray(state.zones)) return fallback;
            const zones = state.zones
                .filter(zone => zone && zone.status === 'published' && zone.id && zone.name);
            if (Number(state.version || 1) < 2) {
                fallback.forEach(item => {
                    if (!zones.some(zone => zone.id === item.id)) {
                        zones.push({
                            id: item.id,
                            name: item.label,
                            status: 'published',
                            sort: item.sort
                        });
                    }
                });
            }
            return zones
                .sort((a, b) => Number(a.sort || 0) - Number(b.sort || 0))
                .map(zone => ({
                    id: zone.id,
                    label: String(zone.name).replace(/[&<>"']/g, char => ({
                        '&': '&amp;',
                        '<': '&lt;',
                        '>': '&gt;',
                        '"': '&quot;',
                        "'": '&#039;'
                    }[char])),
                    href: 'special-zone.html?zone=' + encodeURIComponent(zone.id)
                }));
        } catch (e) {
            return fallback;
        }
    }

    _detectRoute() {
        const path = window.location.pathname;
        const params = new URLSearchParams(window.location.search);
        const placeholder = params.get('page') || '';

        if (path.includes('portal-placeholder')) {
            const placeholderRoutes = {
                'corpus-data-zone': ['data-trade', 'special-zones', 'corpus-data-zone'],
                'city-governance-zone': ['data-trade', 'special-zones', 'city-governance-zone'],
                'medical-health-zone': ['data-trade', 'special-zones', 'medical-health-zone'],
                'embodied-intelligence-zone': ['data-trade', 'special-zones', 'embodied-intelligence-zone'],
                'merchant-onboarding': ['data-ecosystem', 'merchant-onboarding', ''],
                'ecosystem-cooperation': ['data-ecosystem', 'ecosystem-cooperation', ''],
                'industry-education': ['data-ecosystem', 'industry-education', '']
            };
            const target = placeholderRoutes[placeholder] || ['home', '', ''];
            return { primary: target[0], secondary: target[1], tertiary: target[2] };
        }

        if (path.includes('special-zone')) {
            return {
                primary: 'data-trade',
                secondary: 'special-zones',
                tertiary: params.get('zone') || 'corpus-data-zone'
            };
        }
        if (path.includes('data-resources') || path.includes('data-detail') || path.includes('data-apply')) {
            return { primary: 'data-trade', secondary: 'data-resources', tertiary: '' };
        }
        if (path.includes('data-products') || path.includes('product-detail') || path.includes('product-buy')) {
            return { primary: 'data-trade', secondary: 'data-products', tertiary: '' };
        }
        if (path.includes('data-production-line')) {
            return { primary: 'data-services', secondary: 'creative-workshop', tertiary: 'factory-production-line' };
        }
        if (path.includes('data-factory')) {
            return { primary: 'data-services', secondary: 'creative-workshop', tertiary: 'annotation-platform' };
        }
        if (path.includes('data-scenario')) {
            return { primary: 'public-data-operations', secondary: 'creative-workshop', tertiary: 'operation-platform' };
        }
        if (path.includes('data-dev-platform')) {
            return { primary: 'data-services', secondary: 'creative-workshop', tertiary: 'development-tools' };
        }
        if (path.includes('data-consulting') || path.includes('consulting-')) {
            return { primary: 'data-services', secondary: 'data-consulting', tertiary: '' };
        }
        if (path.includes('industry-solutions') || path.includes('solution-')) {
            return { primary: 'data-services', secondary: 'industry-solutions', tertiary: '' };
        }
        if (path.includes('data-space')) {
            const requestedSpace = params.get('space') || 'overview';
            const supportedSpaces = ['overview', 'public', 'low-altitude', 'embodied', 'health', 'culture'];
            const space = supportedSpaces.includes(requestedSpace) ? requestedSpace : 'overview';
            return { primary: 'data-ecosystem', secondary: 'space-connect', tertiary: 'space-' + space };
        }
        if (path.includes('community')) {
            return { primary: 'data-ecosystem', secondary: 'data-science-community', tertiary: '' };
        }
        if (path.includes('demand-')) return { primary: 'demand', secondary: '', tertiary: '' };
        if (path.includes('policy')) return { primary: 'policy', secondary: '', tertiary: '' };
        if (path.includes('help')) return { primary: 'help', secondary: '', tertiary: '' };
        if (path.includes('site-message')) return { primary: '', secondary: '', tertiary: '' };
        return { primary: 'home', secondary: '', tertiary: '' };
    }

    _render() {
        const route = this._detectRoute();
        const declaredActive = this.getAttribute('active');
        const supportedActive = ['home', 'public-data-operations', 'data-trade', 'data-services', 'data-ecosystem', 'demand', 'policy', 'help'];
        const active = supportedActive.includes(declaredActive) ? declaredActive : route.primary;
        const loggedIn = this._isLoggedIn();
        const dataTradeChildren = [
            { id: 'data-resources', label: '数据资源', href: 'data-resources.html' },
            { id: 'data-products', label: '数据产品', href: 'data-products.html' }
        ];
        const specialZoneItems = this._getSpecialZoneItems();
        if (specialZoneItems.length) {
            dataTradeChildren.push({
                id: 'special-zones',
                label: '特色专区',
                children: specialZoneItems
            });
        }

        const NAV_ITEMS = [
            { id: 'home', label: '首页', href: 'index.html' },
            { id: 'public-data-operations', label: '公共数据授权运营', href: 'data-scenario.html' },
            {
                id: 'data-trade',
                label: '数据交易',
                children: dataTradeChildren
            },
            {
                id: 'data-services',
                label: '数据服务',
                children: [
                    { id: 'industry-solutions', label: '行业解决方案', href: 'industry-solutions.html' },
                    { id: 'data-consulting', label: '数据咨询服务', href: 'data-consulting.html' },
                    {
                        id: 'creative-workshop',
                        label: '创意工坊',
                        children: [
                            { id: 'factory-production-line', label: '数据工厂生产线', href: 'data-production-line.html' },
                            { id: 'annotation-platform', label: '自有数据标注平台', href: 'data-factory.html' },
                            { id: 'operation-platform', label: '龙岗区公共数据授权运营平台', href: 'data-scenario.html' },
                            { id: 'development-tools', label: '开发工具', href: 'data-dev-platform.html' }
                        ]
                    }
                ]
            },
            {
                id: 'data-ecosystem',
                label: '数据生态',
                children: [
                    {
                        id: 'space-connect',
                        label: '空间互联',
                        children: [
                            { id: 'space-overview', label: '龙岗可信数据空间', href: 'data-space.html?space=overview' },
                            { id: 'space-public', label: '公共数据可信数据空间', href: 'data-space.html?space=public' },
                            { id: 'space-low-altitude', label: '低空经济可信数据空间', href: 'data-space.html?space=low-altitude' },
                            { id: 'space-embodied', label: '具身智能可信数据空间', href: 'data-space.html?space=embodied' },
                            { id: 'space-health', label: '医药健康可信数据空间', href: 'data-space.html?space=health' },
                            { id: 'space-culture', label: '文化艺术可信数据空间', href: 'data-space.html?space=culture' }
                        ]
                    },
                    { id: 'merchant-onboarding', label: '数商入驻', href: 'portal-placeholder.html?page=merchant-onboarding' },
                    { id: 'ecosystem-cooperation', label: '生态合作', href: 'portal-placeholder.html?page=ecosystem-cooperation' },
                    { id: 'data-science-community', label: '数据科学社区', href: 'community.html' },
                    { id: 'industry-education', label: '产教融合', href: 'portal-placeholder.html?page=industry-education' }
                ]
            },
            { id: 'demand', label: '需求大厅', href: 'demand-hall.html' },
            { id: 'policy', label: '政策资讯', href: 'policy-news.html' },
            { id: 'help', label: '帮助中心', href: 'help-center.html' }
        ];

        const MY_SPACE_ITEMS = [
            { label: '低空经济可信数据空间', href: 'data-space.html?space=low-altitude' },
            { label: '具身智能可信数据空间', href: 'data-space.html?space=embodied' },
            { label: '医药健康可信数据空间', href: 'data-space.html?space=health' },
            { label: '文化艺术可信数据空间', href: 'data-space.html?space=culture' }
        ];

        const menuConfig = window.LG_USER_MENU_CONFIG || {};
        const USER = menuConfig.user || {
            triggerName: '小智',
            accountName: 'gf_demo01',
            company: 'xxx科技有限公司',
            tags: ['数据提供方', '数据需求方']
        };
        const USER_MENU = menuConfig.items || [];

        const chevronSVG = `<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
        const arrowSVG = `<svg class="menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

        function buildDropdown(items) {
            return items.map(item => {
                const cls = item.href && window.location.href.includes(item.href) ? 'dropdown-item active' : 'dropdown-item';
                return `<a href="${item.href}" class="${cls}">${item.label}</a>`;
            }).join('');
        }

        function buildMegaMenu(item) {
            const currentSecondItem = item.id === route.primary
                ? item.children.find(child => child.id === route.secondary)
                : null;
            const initialSecondItem = currentSecondItem || item.children[0];
            const initialHasThird = Boolean(initialSecondItem.children);
            const secondLevelHTML = item.children.map(child => {
                const isActive = child.id === initialSecondItem.id;
                if (child.children) {
                    return `<button type="button" class="mega-second-item mega-second-group${isActive ? ' active' : ''}" data-mega-target="${child.id}" aria-haspopup="true">
                        <span>${child.label}</span>${arrowSVG}
                    </button>`;
                }
                return `<a href="${child.href}" class="mega-second-item${isActive ? ' active' : ''}" data-mega-target="${child.id}">
                    <span>${child.label}</span>
                </a>`;
            }).join('');
            const thirdLevelHTML = item.children.filter(child => child.children).map(group => {
                const thirdItems = group.children.map(child => {
                    const isActive = child.id === route.tertiary;
                    const targetAttrs = child.target === '_blank' ? ' target="_blank" rel="noopener noreferrer"' : '';
                    return `<a href="${child.href}" class="mega-third-item${isActive ? ' active' : ''}"${targetAttrs}>
                        <span class="mega-third-dot"></span>
                        <span>${child.label}</span>
                    </a>`;
                }).join('');
                return `<div class="mega-third-panel${group.id === initialSecondItem.id ? ' active' : ''}" data-mega-panel="${group.id}">
                    <div class="mega-menu-heading">${group.label}</div>
                    ${thirdItems}
                </div>`;
            }).join('');
            const triggerCls = item.id === active ? 'nav-dropdown-trigger active' : 'nav-dropdown-trigger';
            return `
                <div class="nav-dropdown nav-mega-dropdown" data-initial-target="${initialSecondItem.id}">
                    <button type="button" class="${triggerCls}" aria-haspopup="true">
                        ${item.label}${chevronSVG}
                    </button>
                    <div class="nav-mega-menu${initialHasThird ? ' has-third' : ''}" data-mega-menu>
                        <div class="mega-second-column">
                            <div class="mega-menu-heading">${item.label}</div>
                            ${secondLevelHTML}
                        </div>
                        <div class="mega-third-column">
                            ${thirdLevelHTML}
                        </div>
                    </div>
                </div>`;
        }

        const linksHTML = NAV_ITEMS.map(item => {
            if (item.children) return buildMegaMenu(item);
            const cls = item.id === active ? 'nav-link active' : 'nav-link';
            return `<a href="${item.href}" class="${cls}">${item.label}</a>`;
        }).join('');

        const userMenuHTML = USER_MENU.map(m =>
            `<a href="${m.href}" class="user-menu-item"${m.target ? ' target="' + m.target + '"' : ''}>${m.label}</a>`
        ).join('');
        const userTagsHTML = (USER.tags || []).map(tag => `<span class="user-tag">${tag}</span>`).join('');

        /* ── 右侧区域：登录前 vs 登录后 ── */
        let actionsHTML;
        if (loggedIn) {
            actionsHTML = `
            <div class="nav-dropdown nav-dropdown-right">
                <span class="nav-dropdown-trigger">我的空间${chevronSVG}</span>
                <div class="nav-dropdown-menu nav-dropdown-menu-right">${buildDropdown(MY_SPACE_ITEMS)}</div>
            </div>
            <span class="notify-bell" title="通知">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <span class="notify-badge"></span>
            </span>
            <div class="user-dropdown" id="userDropdown">
                <span class="user-trigger" id="userTrigger">
                    <svg class="user-avatar-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                    <span class="user-name-text">${USER.triggerName || USER.accountName}</span>
                    ${chevronSVG}
                </span>
                <div class="user-panel" id="userPanel">
                    <div class="user-info-card">
                        <div class="user-info-avatar">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/></svg>
                        </div>
                        <div class="user-info-meta">
                            <div class="user-info-name">${USER.accountName}</div>
                            <div class="user-info-company">${USER.company}</div>
                        </div>
                    </div>
                    <div class="user-tags">
                        ${userTagsHTML}
                    </div>
                    <div class="user-menu-list">${userMenuHTML}</div>
                    <div class="user-logout-wrap">
                        <button class="logout-btn" id="logoutBtn">退出</button>
                    </div>
                </div>
            </div>`;
        } else {
            actionsHTML = `
            <div class="nav-dropdown nav-dropdown-right">
                <span class="nav-dropdown-trigger">我的空间${chevronSVG}</span>
                <div class="nav-dropdown-menu nav-dropdown-menu-right">${buildDropdown(MY_SPACE_ITEMS)}</div>
            </div>
            <a href="register.html" class="btn btn-outline">注册</a>
            <a href="login.html" class="btn btn-primary">登录</a>`;
        }

        this.shadowRoot.innerHTML = `
<style>
:host { display: block; }

.nav {
    position: fixed; top: 0; left: 0; right: 0;
    height: 64px;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    z-index: 100;
}
.nav-container {
    max-width: var(--content-max-width); height: 100%; margin: 0 auto; padding: 0 32px;
    display: flex; align-items: center; justify-content: space-between;
}

/* ── Brand ── */
.nav-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
.nav-logo-img { height: 52px; width: auto; }
.nav-brand-name { font-size: 20px; font-weight: 600; color: #1F2B28; letter-spacing: -0.01em; line-height: 1; }

/* ── Links ── */
.nav-links { display: flex; align-items: center; gap: 4px; height: 100%; }
.nav-link {
    padding: 8px 14px; font-size: 13px; font-weight: 500;
    color: #5C6863; border-radius: 6px;
    transition: all 150ms ease; position: relative;
    height: 64px; display: flex; align-items: center;
    text-decoration: none; white-space: nowrap;
}
.nav-link:hover { color: #1F2B28; background: #f4f4f5; }
.nav-link.active { color: #20A565; background: #f0fdf6; }

/* ── Dropdown (shared) ── */
.nav-dropdown { position: relative; height: 64px; display: flex; align-items: center; }
.nav-dropdown-trigger {
    padding: 8px 14px; font-size: 13px; font-weight: 500;
    color: #5C6863; border-radius: 6px;
    transition: all 150ms ease; height: 64px;
    display: flex; align-items: center; gap: 5px;
    cursor: default; user-select: none; white-space: nowrap;
    border: 0; background: transparent; font-family: inherit;
}
.nav-dropdown:hover .nav-dropdown-trigger { color: #1F2B28; background: #f4f4f5; }
.nav-dropdown-trigger.active { color: #20A565; background: #f0fdf6; }
.chevron { width: 14px; height: 14px; flex-shrink: 0; transition: transform 0.25s ease; color: #919B96; }
.nav-dropdown:hover .chevron { transform: rotate(180deg); color: #1F2B28; }

/* ── Three-level mega menu ── */
.nav-mega-menu {
    position: absolute; top: calc(100% - 2px); left: 0;
    width: 234px;
    display: block;
    transform: translateY(-6px);
    background: #FFF; border: 1px solid #E8EDEB; border-radius: 12px;
    box-shadow: 0 16px 40px rgba(22, 39, 33, 0.14), 0 3px 10px rgba(22, 39, 33, 0.06);
    opacity: 0; visibility: hidden; overflow: hidden;
    transition: width 0.18s ease, opacity 0.18s ease, visibility 0.18s ease, transform 0.18s ease;
    z-index: 220;
}
.nav-mega-menu.has-third {
    width: 540px; min-height: 232px;
    display: grid; grid-template-columns: 210px minmax(0, 1fr);
}
.nav-mega-dropdown:hover .nav-mega-menu,
.nav-mega-dropdown:focus-within .nav-mega-menu {
    opacity: 1; visibility: visible; transform: translateY(0);
}
.mega-second-column {
    padding: 16px 12px;
    background: #F8FAF9;
}
.nav-mega-menu.has-third .mega-second-column { border-right: 1px solid #E8EDEB; }
.mega-menu-heading {
    padding: 0 10px 10px;
    font-size: 12px; font-weight: 600; color: #919B96;
    letter-spacing: 0.04em;
}
.mega-second-item {
    width: 100%; border: 0; background: transparent; font-family: inherit;
    min-height: 42px; padding: 0 12px;
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    color: #4F5C57; border-radius: 8px;
    font-size: 14px; font-weight: 500; text-decoration: none;
    transition: color 150ms ease, background 150ms ease;
}
a.mega-second-item:hover,
.mega-second-group:hover,
.mega-second-item.active {
    color: #168C55; background: #EAF8F0;
}
.mega-second-group { cursor: pointer; }
.menu-arrow { width: 15px; height: 15px; flex-shrink: 0; color: #A4AEA9; }
.mega-second-item.active .menu-arrow { color: #20A565; }
.mega-third-column {
    display: none;
    padding: 16px 14px 18px;
}
.nav-mega-menu.has-third .mega-third-column { display: block; }
.mega-third-panel { display: none; }
.mega-third-panel.active {
    display: flex; flex-direction: column; gap: 4px;
}
.mega-third-item {
    min-height: 42px; padding: 8px 10px;
    display: flex; align-items: center; gap: 9px;
    color: #4F5C57; border-radius: 8px;
    font-size: 13px; font-weight: 500; line-height: 1.45;
    text-decoration: none;
    transition: color 150ms ease, background 150ms ease;
}
.mega-third-item:hover,
.mega-third-item.active { color: #168C55; background: #F0FDF4; }
.mega-third-dot {
    width: 6px; height: 6px;
    flex-shrink: 0; border-radius: 50%; background: #B8C3BE;
}
.mega-third-item:hover .mega-third-dot,
.mega-third-item.active .mega-third-dot { background: #20A565; }

.nav-dropdown-menu {
    position: absolute; top: calc(100% - 2px); left: 50%;
    transform: translateX(-50%) translateY(-6px);
    background: #FFF; border-radius: 10px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
    padding: 6px 0; min-width: 152px;
    opacity: 0; visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
    z-index: 200;
}
.nav-dropdown-menu::before {
    content: ''; position: absolute; top: -6px; left: 50%; transform: translateX(-50%);
    border: 6px solid transparent; border-top: none; border-bottom-color: #FFF;
}
.nav-dropdown:hover .nav-dropdown-menu {
    opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0);
}
.dropdown-item {
    display: block; padding: 9px 20px; font-size: 13px; font-weight: 500;
    color: #4A5568; transition: background 0.15s ease, color 0.15s ease;
    text-decoration: none; white-space: nowrap;
}
a.dropdown-item:hover { background: #F0FDF4; color: #20A565; }
a.dropdown-item.active { background: #F0FDF4; color: #20A565; font-weight: 600; }
.dropdown-item.disabled { color: #CBD5E0; cursor: not-allowed; pointer-events: none; }

/* ── Actions ── */
.nav-actions { display: flex; align-items: center; gap: 12px; }
.btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    padding: 8px 16px; font-size: 13px; font-weight: 500;
    border-radius: 10px; border: none; cursor: pointer;
    transition: all 150ms ease; font-family: inherit; text-decoration: none;
}
.btn-outline {
    color: #5C6863; background: transparent; border: none;
}
.btn-outline:hover { color: #1F2B28; background: #f4f4f5; }
.btn-primary {
    color: white;
    background: linear-gradient(180deg, #20A565 0%, #16a34a 100%);
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.1);
}
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.1); }
.btn-primary:active { transform: scale(0.98); }

/* ── Right-aligned dropdown ── */
.nav-dropdown-right .nav-dropdown-trigger { font-size: 13px; }
.nav-dropdown-menu-right { left: auto !important; right: 0; transform: translateX(0) translateY(-6px) !important; }
.nav-dropdown-menu-right::before { left: auto !important; right: 20px; transform: none !important; }
.nav-dropdown:hover .nav-dropdown-menu-right { transform: translateX(0) translateY(0) !important; }

/* ══════════════════════════════════════════════════════════
   LOGGED-IN STATE
   ══════════════════════════════════════════════════════════ */

/* ── Notification Bell ── */
.notify-bell {
    position: relative; display: flex; align-items: center; justify-content: center;
    width: 36px; height: 36px; cursor: pointer;
    color: #5C6863; transition: color 150ms ease;
}
.notify-bell:hover { color: #1F2B28; }
.notify-bell svg { width: 22px; height: 22px; }
.notify-badge {
    position: absolute; top: 4px; right: 4px;
    width: 8px; height: 8px; background: #EF4444;
    border-radius: 50%; border: 1.5px solid #FFF;
}

/* ── User Dropdown (click-driven) ── */
.user-dropdown { position: relative; height: 64px; display: flex; align-items: center; }
.user-trigger {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 12px; cursor: pointer; user-select: none;
    color: #5C6863; transition: all 150ms ease;
    border-radius: 6px;
}
.user-trigger:hover { color: #1F2B28; background: #f4f4f5; }
.user-avatar-icon { width: 24px; height: 24px; flex-shrink: 0; }
.user-name-text { font-size: 14px; font-weight: 500; white-space: nowrap; }
.user-trigger .chevron { width: 14px; height: 14px; }

.user-panel {
    position: absolute; top: calc(100% - 2px); right: 0;
    width: 260px; background: #FFF; border-radius: 10px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
    opacity: 0; visibility: hidden;
    transform: translateY(-6px);
    transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
    z-index: 300; overflow: hidden;
}
.user-panel.open {
    opacity: 1; visibility: visible; transform: translateY(0);
}
.user-panel::before {
    content: ''; position: absolute; top: -6px; right: 24px;
    border: 6px solid transparent; border-top: none; border-bottom-color: #FFF;
}

/* ── User Info Card ── */
.user-info-card {
    display: flex; align-items: center; gap: 12px;
    padding: 20px 20px 12px;
}
.user-info-avatar {
    width: 40px; height: 40px; border-radius: 6px;
    background: #EBF5FF; display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; color: #4A90D9;
}
.user-info-avatar svg { width: 22px; height: 22px; }
.user-info-name { font-size: 15px; font-weight: 600; color: #1F2B28; }
.user-info-company { font-size: 12px; color: #919B96; margin-top: 2px; }

/* ── Tags ── */
.user-tags { display: flex; gap: 8px; padding: 8px 20px 16px; }
.user-tag {
    padding: 3px 10px; font-size: 12px; font-weight: 500;
    color: #6B7280; background: #F3F4F6; border-radius: 4px;
    border: 1px solid #E5E7EB;
}

/* ── Menu List ── */
.user-menu-list {
    border-top: 1px solid #F3F4F6;
    padding: 6px 0;
    max-height: 320px; overflow-y: auto;
}
.user-menu-list::-webkit-scrollbar { width: 3px; }
.user-menu-list::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 2px; }
.user-menu-item {
    display: block; padding: 10px 20px; font-size: 14px; font-weight: 400;
    color: #374151; text-decoration: none;
    transition: background 0.12s ease, color 0.12s ease;
}
.user-menu-item:hover { background: #F0FDF4; color: #20A565; }

/* ── Logout ── */
.user-logout-wrap {
    border-top: 1px solid #F3F4F6;
    padding: 12px 20px;
}
.logout-btn {
    width: 100%; padding: 8px 0; font-size: 14px; font-weight: 500;
    color: #6B7280; background: #F9FAFB; border: 1px solid #E5E7EB;
    border-radius: 6px; cursor: pointer; font-family: inherit;
    transition: all 150ms ease;
}
.logout-btn:hover { color: #EF4444; border-color: #FECACA; background: #FEF2F2; }

/* ── Responsive ── */
@media (max-width: 1180px) {
    .nav-container { padding: 0 20px; }
    .nav-brand-name { display: none; }
    .nav-links { gap: 0; }
    .nav-link, .nav-dropdown-trigger { padding-left: 10px; padding-right: 10px; }
    .nav-actions { gap: 6px; }
}
@media (max-width: 768px) {
    .nav-links { display: none; }
}
</style>

<nav class="nav">
    <div class="nav-container">
        <a href="index.html" class="nav-brand">
            <img src="images/logo.png" alt="龙岗数据" class="nav-logo-img">
            <span class="nav-brand-name">龙岗数据聚合服务平台</span>
        </a>
        <div class="nav-links">${linksHTML}</div>
        <div class="nav-actions">${actionsHTML}</div>
    </div>
</nav>`;
    }

    _bindEvents() {
        const shadow = this.shadowRoot;
        const trigger = shadow.getElementById('userTrigger');
        const panel = shadow.getElementById('userPanel');
        const logoutBtn = shadow.getElementById('logoutBtn');

        this._bindMegaMenus();
        this._bindMessageDropdown();

        if (!trigger || !panel) return;

        trigger.addEventListener('click', function (e) {
            e.stopPropagation();
            panel.classList.toggle('open');
        });

        shadow.addEventListener('click', function (e) {
            if (!panel.contains(e.target) && e.target !== trigger && !trigger.contains(e.target)) {
                panel.classList.remove('open');
            }
        });

        document.addEventListener('click', function () {
            panel.classList.remove('open');
        });

        if (logoutBtn) {
            var self = this;
            logoutBtn.addEventListener('click', function () {
                try { localStorage.removeItem('lgk_logged_in'); } catch (e) {}
                self._render();
                self._bindEvents();
            });
        }
    }

    _bindMegaMenus() {
        const shadow = this.shadowRoot;

        shadow.querySelectorAll('.nav-mega-dropdown').forEach(function (dropdown) {
            const menu = dropdown.querySelector('[data-mega-menu]');
            const trigger = dropdown.querySelector('.nav-dropdown-trigger');
            const secondItems = Array.from(dropdown.querySelectorAll('[data-mega-target]'));
            const thirdPanels = Array.from(dropdown.querySelectorAll('[data-mega-panel]'));
            const initialTarget = dropdown.dataset.initialTarget;

            if (!menu || !initialTarget) return;

            function activateSecondLevel(target) {
                const targetPanel = thirdPanels.find(function (panel) {
                    return panel.dataset.megaPanel === target;
                });

                secondItems.forEach(function (item) {
                    item.classList.toggle('active', item.dataset.megaTarget === target);
                });
                thirdPanels.forEach(function (panel) {
                    panel.classList.toggle('active', panel === targetPanel);
                });
                menu.classList.toggle('has-third', Boolean(targetPanel));
            }

            dropdown.addEventListener('mouseenter', function () {
                activateSecondLevel(initialTarget);
            });
            if (trigger) {
                trigger.addEventListener('focus', function () {
                    activateSecondLevel(initialTarget);
                });
            }
            secondItems.forEach(function (item) {
                item.addEventListener('mouseenter', function () {
                    activateSecondLevel(item.dataset.megaTarget);
                });
                item.addEventListener('focus', function () {
                    activateSecondLevel(item.dataset.megaTarget);
                });
            });
        });
    }

    _loadMessageCenter(callback) {
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

    _bindMessageDropdown() {
        if (!this.shadowRoot.querySelector('.notify-bell')) return;

        const self = this;
        this._loadMessageCenter(function () {
            if (!window.MessageCenter) return;
            const shadow = self.shadowRoot;
            const bell = shadow.querySelector('.notify-bell');
            if (!bell) return;

            window.MessageCenter.bindDropdown({
                root: shadow,
                trigger: bell,
                badgeSelector: '.notify-badge'
            });
        });
    }
}

customElements.define('nav-bar', NavBar);
