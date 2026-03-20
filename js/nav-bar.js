/**
 * <nav-bar> Web Component
 * 龙岗数据聚合服务平台 — 统一导航栏组件
 *
 * 用法：
 *   <nav-bar active="home"></nav-bar>
 *
 * active 可选值：
 *   home | data-resources | data-store | demand | data-space | consulting | solutions | community | policy | help | my-space
 *
 * 登录状态通过 localStorage('lgk_logged_in') 驱动，登录后自动切换右侧 UI。
 */
class NavBar extends HTMLElement {
    static get observedAttributes() {
        return ['active'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this._render();
        this._bindEvents();
    }

    attributeChangedCallback() {
        this._render();
        this._bindEvents();
    }

    _isLoggedIn() {
        try { return localStorage.getItem('lgk_logged_in') === '1'; }
        catch (e) { return false; }
    }

    _detectActive() {
        const path = window.location.pathname;
        if (path.includes('data-resources')) return 'data-resources';
        if (path.includes('data-detail'))    return 'data-resources';
        if (path.includes('data-apply'))     return 'data-resources';
        if (path.includes('data-production-line')) return 'data-store';
        if (path.includes('data-scenario'))  return 'data-store';
        if (path.includes('data-factory'))   return 'data-store';
        if (path.includes('data-products'))  return 'data-store';
        if (path.includes('product-detail')) return 'data-store';
        if (path.includes('product-buy'))    return 'data-store';
        if (path.includes('data-dev-platform')) return 'data-store';
        if (path.includes('demand-hall'))    return 'demand';
        if (path.includes('demand-detail'))  return 'demand';
        if (path.includes('data-consulting')) return 'consulting';
        if (path.includes('consulting-detail')) return 'consulting';
        if (path.includes('industry-solutions')) return 'solutions';
        if (path.includes('solution-detail'))  return 'solutions';
        if (path.includes('data-space'))     return 'data-space';
        if (path.includes('community'))      return 'community';
        if (path.includes('policy'))         return 'policy';
        if (path.includes('help'))           return 'help';
        if (path.includes('my-space'))       return 'my-space';
        return 'home';
    }

    _render() {
        const active = this.getAttribute('active') || this._detectActive();
        const loggedIn = this._isLoggedIn();

        const NAV_ITEMS = [
            { id: 'home',           label: '首页',         href: 'index.html' },
            { id: 'data-resources', label: '数据资源',     href: 'data-resources.html' },
            { id: 'data-store',     label: '数据商店',     dropdown: true },
            { id: 'demand',         label: '需求大厅',     href: 'demand-hall.html' },
            { id: 'data-space',     label: '可信数据空间', href: 'data-space.html' },
            { id: 'consulting',     label: '数据咨询服务', href: 'data-consulting.html' },
            { id: 'solutions',      label: '行业解决方案', href: 'industry-solutions.html' },
            { id: 'community',      label: '数据社区',     href: '#' },
            { id: 'policy',         label: '政策资讯',     href: 'policy-news.html' },
            { id: 'help',           label: '帮助中心',     href: 'help-center.html' },
        ];

        const DROPDOWNS = {
            'data-store': [
                { label: '数据工厂',     disabled: false, href: 'data-factory.html' },
                { label: '数据生产线',   disabled: false, href: 'data-production-line.html' },
                { label: '数据场景',     disabled: false, href: 'data-scenario.html' },
                { label: '数据开发平台', disabled: false, href: 'data-dev-platform.html' },
                { label: '数据产品',     disabled: false, href: 'data-products.html' },
            ],
            'my-space': [
                { label: '低空经济可信数据空间', disabled: false, href: '#' },
                { label: '具身智能可信数据空间', disabled: false, href: '#' },
                { label: '医药健康可信数据空间', disabled: false, href: '#' },
                { label: '文化艺术可信数据空间', disabled: false, href: '#' },
            ],
        };

        const USER_MENU = [
            { label: '用户中心',         href: 'user-center.html' },
            { label: '管理中心',         href: '#' },
            { label: '工作台',           href: '#' },
            { label: '运营中心',         href: 'operation-center.html' },
            { label: '可视化大屏',       href: '#' },
            { label: '智能问数',         href: '#' },
            { label: '智能报告',         href: '#' },
            { label: '公共数据运营平台', href: '#' },
            { label: '可信数据空间',     href: '#' },
            { label: '数据开发平台',     href: 'data-dev-platform.html' },
        ];

        const chevronSVG = `<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

        const currentPath = window.location.pathname;
        function buildDropdown(items) {
            return items.map(item => {
                if (item.disabled) return `<span class="dropdown-item disabled">${item.label}</span>`;
                const isActive = item.href && currentPath.includes(item.href.replace('.html', ''));
                const cls = isActive ? 'dropdown-item active' : 'dropdown-item';
                return `<a href="${item.href}" class="${cls}">${item.label}</a>`;
            }).join('');
        }

        const linksHTML = NAV_ITEMS.map(item => {
            if (item.dropdown && DROPDOWNS[item.id]) {
                const triggerCls = item.id === active ? 'nav-dropdown-trigger active' : 'nav-dropdown-trigger';
                return `
                <div class="nav-dropdown">
                    <span class="${triggerCls}">${item.label}${chevronSVG}</span>
                    <div class="nav-dropdown-menu">${buildDropdown(DROPDOWNS[item.id])}</div>
                </div>`;
            }
            const cls = item.id === active ? 'nav-link active' : 'nav-link';
            return `<a href="${item.href}" class="${cls}">${item.label}</a>`;
        }).join('');

        const userMenuHTML = USER_MENU.map(m =>
            `<a href="${m.href}" class="user-menu-item">${m.label}</a>`
        ).join('');

        /* ── 右侧区域：登录前 vs 登录后 ── */
        let actionsHTML;
        if (loggedIn) {
            actionsHTML = `
            <div class="nav-dropdown nav-dropdown-right">
                <span class="nav-dropdown-trigger">我的空间${chevronSVG}</span>
                <div class="nav-dropdown-menu nav-dropdown-menu-right">${buildDropdown(DROPDOWNS['my-space'])}</div>
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
                    <span class="user-name-text">小智</span>
                    ${chevronSVG}
                </span>
                <div class="user-panel" id="userPanel">
                    <div class="user-info-card">
                        <div class="user-info-avatar">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/></svg>
                        </div>
                        <div class="user-info-meta">
                            <div class="user-info-name">gf_demo01</div>
                            <div class="user-info-company">xxx科技有限公司</div>
                        </div>
                    </div>
                    <div class="user-tags">
                        <span class="user-tag">数据提供方</span>
                        <span class="user-tag">数据需求方</span>
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
                <div class="nav-dropdown-menu nav-dropdown-menu-right">${buildDropdown(DROPDOWNS['my-space'])}</div>
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
    max-width: 1920px; height: 100%; margin: 0 auto; padding: 0 32px;
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
}
.nav-dropdown:hover .nav-dropdown-trigger { color: #1F2B28; background: #f4f4f5; }
.nav-dropdown-trigger.active { color: #20A565; background: #f0fdf6; }
.chevron { width: 14px; height: 14px; flex-shrink: 0; transition: transform 0.25s ease; color: #919B96; }
.nav-dropdown:hover .chevron { transform: rotate(180deg); color: #1F2B28; }

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
}

customElements.define('nav-bar', NavBar);
