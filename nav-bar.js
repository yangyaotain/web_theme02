/**
 * <nav-bar> Web Component
 * 龙岗数据聚合服务平台 — 统一导航栏组件
 *
 * 用法：
 *   <nav-bar active="home"></nav-bar>
 *
 * active 可选值：
 *   home | data-resources | data-store | demand | data-space | policy | help
 *
 * 若不传 active 属性，组件会自动根据当前页面 URL 判断激活项。
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
    }

    attributeChangedCallback() {
        this._render();
    }

    /** 根据当前 URL 自动推断激活项 */
    _detectActive() {
        const path = window.location.pathname;
        if (path.includes('data-resources')) return 'data-resources';
        if (path.includes('data-space'))     return 'data-space';
        if (path.includes('data-detail'))    return 'data-resources'; // 详情归属资源
        return 'home';
    }

    _render() {
        const active = this.getAttribute('active') || this._detectActive();

        const NAV_ITEMS = [
            { id: 'home',           label: '首页',       href: 'index.html' },
            { id: 'data-resources', label: '数据资源',   href: 'data-resources.html' },
            { id: 'data-store',     label: '数据商店',   dropdown: true },
            { id: 'demand',         label: '需求大厅',   href: '#' },
            { id: 'data-space',     label: '可信数据空间', href: 'data-space.html' },
            { id: 'policy',         label: '政策资讯',   href: '#' },
            { id: 'help',           label: '帮助中心',   href: '#' },
        ];

        const DROPDOWN_ITEMS = [
            { label: '数据工厂',     disabled: true },
            { label: '数据生产线',   disabled: true },
            { label: '数据场景',     disabled: true },
            { label: '数据开发平台', disabled: false, href: 'data-dev-platform.html' },
            { label: '数据产品',     disabled: true },
        ];

        const chevronSVG = `
            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>`;

        const dropdownHTML = DROPDOWN_ITEMS.map(item =>
            item.disabled
                ? `<span class="dropdown-item disabled">${item.label}</span>`
                : `<a href="${item.href}" class="dropdown-item">${item.label}</a>`
        ).join('');

        const linksHTML = NAV_ITEMS.map(item => {
            if (item.dropdown) {
                return `
                <div class="nav-dropdown">
                    <span class="nav-dropdown-trigger">
                        ${item.label}${chevronSVG}
                    </span>
                    <div class="nav-dropdown-menu">${dropdownHTML}</div>
                </div>`;
            }
            const cls = item.id === active ? 'nav-link active' : 'nav-link';
            return `<a href="${item.href}" class="${cls}">${item.label}</a>`;
        }).join('');

        this.shadowRoot.innerHTML = `
<style>
/* ── Host ────────────────────────────────────────────── */
:host {
    display: block;
}

/* ── Nav Shell ───────────────────────────────────────── */
.nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 72px;
    background: linear-gradient(180deg, #1B9A5C 0%, var(--forest-green, #20A565) 100%);
    box-shadow: 0 2px 12px rgba(21, 128, 61, 0.25);
    z-index: 100;
}

.nav-container {
    max-width: 1400px;
    height: 100%;
    margin: 0 auto;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* ── Brand ───────────────────────────────────────────── */
.nav-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
}

.nav-logo-img {
    height: 36px;
    width: auto;
}

/* ── Links ───────────────────────────────────────────── */
.nav-links {
    display: flex;
    align-items: center;
    gap: 2px;
    height: 100%;
}

.nav-link {
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.75);
    border-radius: var(--radius-md, 3px);
    transition: all var(--transition-fast, 150ms cubic-bezier(0.4, 0, 0.2, 1));
    position: relative;
    height: 72px;
    display: flex;
    align-items: center;
    text-decoration: none;
    white-space: nowrap;
}

.nav-link:hover {
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
    color: #FFFFFF;
    font-weight: 600;
}

.nav-link.active::after {
    content: '';
    position: absolute;
    bottom: 6px;
    left: 16px;
    right: 16px;
    height: 3px;
    background: #FFFFFF;
    border-radius: 2px;
}

/* ── Dropdown ────────────────────────────────────────── */
.nav-dropdown {
    position: relative;
    height: 72px;
    display: flex;
    align-items: center;
}

.nav-dropdown-trigger {
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.75);
    border-radius: var(--radius-md, 3px);
    transition: all var(--transition-fast, 150ms cubic-bezier(0.4, 0, 0.2, 1));
    height: 72px;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: default;
    user-select: none;
    white-space: nowrap;
}

.nav-dropdown:hover .nav-dropdown-trigger {
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.1);
}

.chevron {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    transition: transform 0.25s ease;
    opacity: 0.8;
}

.nav-dropdown:hover .chevron {
    transform: rotate(180deg);
    opacity: 1;
}

.nav-dropdown-menu {
    position: absolute;
    top: calc(100% - 2px);
    left: 50%;
    transform: translateX(-50%) translateY(-6px);
    background: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
    padding: 6px 0;
    min-width: 152px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
    z-index: 200;
}

.nav-dropdown-menu::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top: none;
    border-bottom-color: #FFFFFF;
}

.nav-dropdown:hover .nav-dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}

.dropdown-item {
    display: block;
    padding: 9px 20px;
    font-size: 13px;
    font-weight: 500;
    color: #4A5568;
    transition: background 0.15s ease, color 0.15s ease;
    text-decoration: none;
    white-space: nowrap;
}

a.dropdown-item:hover {
    background: #F0FDF4;
    color: var(--forest-green, #20A565);
}

.dropdown-item.disabled {
    color: #CBD5E0;
    cursor: not-allowed;
    pointer-events: none;
}

/* ── Actions ─────────────────────────────────────────── */
.nav-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 18px;
    font-size: 13px;
    font-weight: 600;
    border-radius: var(--radius-md, 3px);
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast, 150ms cubic-bezier(0.4, 0, 0.2, 1));
    font-family: inherit;
}

.btn-outline {
    color: #FFFFFF;
    background: transparent;
    border: 1.5px solid rgba(255, 255, 255, 0.5);
}

.btn-outline:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.8);
}

.btn-primary {
    color: var(--forest-green, #20A565);
    background: #FFFFFF;
}

.btn-primary:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:active {
    transform: scale(0.98);
}

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 768px) {
    .nav {
        height: 64px;
    }

    .nav-links {
        display: none;
    }
}
</style>

<nav class="nav">
    <div class="nav-container">
        <a href="index.html" class="nav-brand">
            <img src="images/logo.png" alt="龙岗数据" class="nav-logo-img">
        </a>
        <div class="nav-links">
            ${linksHTML}
        </div>
        <div class="nav-actions">
            <button class="btn btn-outline">注册</button>
            <button class="btn btn-primary">登录</button>
        </div>
    </div>
</nav>`;
    }
}

customElements.define('nav-bar', NavBar);
