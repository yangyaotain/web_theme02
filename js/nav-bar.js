/** Shared navigation for portal pages. */
(function () {
'use strict';

const paths = {
    home: '<path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    network: '<circle cx="12" cy="5" r="3"/><circle cx="5" cy="18" r="3"/><circle cx="19" cy="18" r="3"/><path d="m10.5 7.5-4 8m7-8 4 8M8 18h8"/>',
    leaf: '<path d="M20 3c1 9-2 16-9 16a7 7 0 0 1-7-7C4 5 11 4 20 3zM3 21l12-12"/>',
    shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z"/><path d="m8 12 3 3 5-6"/>',
    box: '<path d="m3 7 9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10M8 5l9 4"/>',
    robot: '<rect x="5" y="7" width="14" height="13" rx="3"/><path d="M12 3v4M2 11v5m20-5v5M9 12h.01M15 12h.01M9 16h6"/>',
    chart: '<path d="M4 3v18h17M8 16v-4m5 4V7m5 9v-7"/>',
    chat: '<path d="M21 11a8 8 0 0 1-8 8H7l-4 3V11a9 9 0 0 1 18 0zM7 9h10M7 13h7"/>',
    factory: '<path d="M3 21V10l7 4V7l7 4V3h4v18zM7 18h1m4 0h1m4 0h1"/>',
    register: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 5V3h8v4H8M8 12h8m-8 4h5"/>',
    book: '<path d="M12 5v16M3 3c4 0 6 0 9 2 3-2 5-2 9-2v16c-4 0-6 0-9 2-3-2-5-2-9-2z"/>',
    users: '<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 4c3 0 4 2 4 4v3"/>',
    news: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h4v5H7zM15 7h2m-2 4h2M7 16h10"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 1 1 5 2c-1 1-2 1-2 3m0 3h.01"/>',
    login: '<path d="M14 3h6v18h-6M3 12h12m-4-4 4 4-4 4"/>',
    logout: '<path d="M10 3H4v18h6m-1-9h12m-4-4 4 4-4 4"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>'
};
function icon(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || paths.grid) + '</svg>';
}
function escape(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));
}
const item = (label, href, glyph, description) => ({ label, href, glyph, description });
const resourceTypes = ['公共数据', '行业数据', '企业数据'];
const productTypes = ['数据集', 'API', '报告', '数据模型'];
const demandTypes = ['数据需求', '服务需求', '应用需求'];
const publishDemandHref = 'buyer-center.html?menu=my-demand&view=publish';
const placeholderItem = (label, key, glyph, description) => item(label, 'portal-placeholder.html?page=' + key, glyph, description);
const partnerDirectoryHref = 'partner-directory.html';

function catalogHref(page, type, keyword) {
    const params = [];
    if (type) params.push('type=' + encodeURIComponent(type));
    if (keyword) params.push('q=' + encodeURIComponent(keyword));
    return params.length ? page + '?' + params.join('&') : page;
}

const dataScenarios = [
    ['城市治理数据', 'city-governance-zone'],
    ['低空巡检与监管数据', 'low-altitude-inspection-zone'],
    ['机器人训练数据', 'robot-training-zone'],
    ['治理与规范数据', 'data-standards-zone']
].map(([label, zoneId]) => ({
    ...item(label, 'special-zone.html?zone=' + zoneId, 'box'), zoneId
}));

let zoneStoreReady;
function loadZoneStore() {
    if (window.SpecialZoneStore) return Promise.resolve();
    if (!zoneStoreReady) {
        zoneStoreReady = new Promise(resolve => {
            const existing = document.querySelector('script[src="js/special-zone-store.js"]');
            const script = existing || document.createElement('script');
            script.addEventListener('load', resolve, { once: true });
            script.addEventListener('error', resolve, { once: true });
            if (!existing) {
                script.src = 'js/special-zone-store.js';
                document.head.appendChild(script);
            }
        });
    }
    return zoneStoreReady;
}

const navAssets = new Map();
function loadNavAsset(path) {
    if (!navAssets.has(path)) {
        const stylesheet = path.endsWith('.css');
        const existing = document.querySelector(stylesheet ? `link[href="${path}"]` : `script[src="${path}"]`);
        if (existing && stylesheet && existing.sheet) return Promise.resolve();
        const asset = existing || document.createElement(stylesheet ? 'link' : 'script');
        navAssets.set(path, new Promise((resolve, reject) => {
            asset.addEventListener('load', resolve, { once: true });
            asset.addEventListener('error', reject, { once: true });
            if (!existing) {
                if (stylesheet) {
                    asset.rel = 'stylesheet';
                    asset.href = path;
                } else {
                    asset.src = path;
                }
                document.head.appendChild(asset);
            }
        }).catch(error => {
            navAssets.delete(path);
            if (!existing) asset.remove();
            throw error;
        }));
    }
    return navAssets.get(path);
}

function loadPartnerStore() {
    return window.PartnerStore ? Promise.resolve() : loadNavAsset('js/partner-store.js');
}

function loadPartnerApplicationCatalog() {
    return window.PartnerApplicationCatalog ? Promise.resolve() : loadNavAsset('js/partner-application-catalog.js');
}

function loadProductionLineStore() {
    return window.DataProductionLineStore ? Promise.resolve() : loadNavAsset('js/data-production-line-store.js');
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
        loadZoneStore().then(() => self._refreshScenarioMenu());
        Promise.all([loadPartnerStore(), loadPartnerApplicationCatalog()])
            .then(() => self._refreshPartnerMenu(), () => self._refreshPartnerMenu(true));
        loadProductionLineStore().then(() => self._refreshProductionLineMenu(), () => self._refreshProductionLineMenu(true));
        loadLGUserMenuConfig(function () {
            self._render();
            self._bindEvents();
        });
    }

    _isLoggedIn() {
        try { return localStorage.getItem('lgk_logged_in') === '1'; }
        catch (e) { return false; }
    }

    // Shared by 数据聚合 and 我的空间.
    _getSpaceItems() {
        return [
            { id: 'space-overview', label: '龙岗可信数据空间', href: 'data-space.html?space=overview', glyph: 'network', description: '连接数据供需双方，了解可信数据空间与跨主体数据协作。' },
            { id: 'space-language', label: '语言服务可信数据空间', href: 'data-space.html?space=language', glyph: 'chat', description: '面向语言服务场景的数据协作' },
            { id: 'space-city-governance', label: '城市治理可信数据空间', href: 'data-space.html?space=city-governance', glyph: 'grid', description: '连接城市治理领域的数据与应用' },
            { id: 'space-embodied', label: '具身智能可信数据空间', href: 'data-space.html?space=embodied', glyph: 'robot', description: '面向机器人与具身智能数据协作' },
            { id: 'space-public', label: '公共数据可信数据空间', href: 'data-space.html?space=public', glyph: 'shield', description: '支撑公共数据的可信流通与开发利用' },
            { id: 'space-agri-trade', label: '农贸可信数据空间', href: 'data-space.html?space=agri-trade', glyph: 'leaf', description: '连接农贸领域的数据资源与业务协作' }
        ];
    }

    _detectRoute() {
        const page = window.location.pathname.split('/').pop() || 'index.html';
        const params = new URLSearchParams(window.location.search);
        const route = (section, href = '') => ({ section, href });

        if (page === 'index.html') return route('home', page);
        if (page === 'login.html' || page === 'register.html') return route('home');
        if (page === 'site-message.html') return route('');
        if (page === partnerDirectoryHref) {
            const id = params.get('partner');
            return route('eco', id ? partnerDirectoryHref + '?partner=' + encodeURIComponent(id) : partnerDirectoryHref);
        }
        if (page === 'partner-detail.html') return route('eco', 'partner-detail.html?id=' + encodeURIComponent(params.get('id') || ''));

        if (page === 'portal-placeholder.html') {
            const key = params.get('page') || '';
            const href = 'portal-placeholder.html?page=' + encodeURIComponent(key);
            if (['partner-applications', 'partner-application-join'].includes(key) || Object.hasOwn(window.PartnerApplicationCatalog?.applications || {}, key)) return route('app', href);
            if (key.endsWith('-zone')) return route('data', 'special-zone.html?zone=' + encodeURIComponent(key));
            if (['merchant-onboarding', 'ecosystem-cooperation', 'industry-education'].includes(key)) return route('eco', href);
        }
        if (page === 'partner-application.html') {
            return route('app', page);
        }
        if (page === 'partner-application-detail.html') return route('app', page + '?id=' + encodeURIComponent(params.get('id') || ''));
        if (params.has('partnerItem') && window.PartnerApplicationCatalog) {
            const record = window.PartnerApplicationCatalog.get(params.get('partnerItem'));
            if (record) return route('app', 'partner-application.html');
        }
        if (page === 'special-zone.html') return route('data', 'special-zone.html?zone=' + encodeURIComponent(params.get('zone') || 'corpus-data-zone'));
        if (page === 'data-space.html') {
            const href = 'data-space.html?space=' + encodeURIComponent(params.get('space') || 'overview');
            return route('data', href);
        }
        if (page === 'data-resources.html' || page === 'data-products.html') {
            const types = page === 'data-resources.html' ? resourceTypes : productTypes;
            const requestedType = params.get('type');
            const type = types.includes(requestedType) ? requestedType : '';
            const keyword = (params.get('q') || '').trim();
            return { ...route('data', catalogHref(page, type, keyword)), parentHref: page, filterHref: catalogHref(page, type) };
        }
        if (['data-detail.html', 'data-apply.html'].includes(page)) return route('data', 'data-resources.html');
        if (page === 'product-buy.html') return route('data', params.get('catalog') === 'resource' ? 'data-resources.html' : 'data-products.html');
        if (page === 'product-detail.html') return route('data', 'data-products.html');
        if (page === 'data-scenario.html') return route('data', page);

        if (page === 'data-production-line.html') {
            const lines = this._getProductionLineItems();
            const href = window.DataProductionLineStore?.href(params.get('line'));
            const selected = params.has('line') ? lines.find(line => line.href === href) : lines[0];
            return route('app', params.has('preview') ? '' : selected?.href);
        }
        if (['data-factory.html', 'data-dev-platform.html'].includes(page)) return route('app', page);
        if (page === 'data-consulting.html' || page.startsWith('consulting-')) return route('app', 'data-consulting.html');
        if (page === 'industry-solutions.html' || page.startsWith('solution-')) return route('app', 'industry-solutions.html');

        if (page === 'community.html' || page.startsWith('community-')) return route('eco', 'community.html');
        if (page === 'demand-hall.html') {
            const type = params.get('type');
            return { ...route('eco', catalogHref(page, demandTypes.includes(type) ? type : '')), parentHref: page };
        }
        if (page.startsWith('demand-')) return route('eco', 'demand-hall.html');
        if (page.startsWith('policy-')) return route('eco', 'policy-news.html');
        if (page === 'help-center.html') return route('eco', page);

        // Existing portal pages can continue declaring their previous category.
        const declaredSections = new Map([
            ['home', 'home'], ['public-data-operations', 'data'], ['data-trade', 'data'], ['data-services', 'app'],
            ['data-ecosystem', 'eco'], ['demand', 'eco'], ['policy', 'eco'], ['help', 'eco']
        ]);
        return route(declaredSections.get(this.getAttribute('active')) || '');
    }

    _sections() {
        const spaces = this._getSpaceItems();
        const catalogEntry = (label, page, glyph, types) => ({
            ...item(label, page, glyph),
            links: types.map(type => ({ label: type, href: catalogHref(page, type) }))
        });
        return [
            {
                id: 'data', label: '数据聚合', glyph: 'database',
                groups: [
                    { title: '授权与可信流通', items: [
                        item('公共数据授权运营', 'data-scenario.html', 'shield', '查阅公共数据目录与授权规则，再进入运营平台。'),
                        { ...spaces[0], description: '了解跨机构数据流通，浏览空间内的资源与产品。' }
                    ], topics: spaces.slice(1).map(space => item(space.label, space.href, 'box')) },
                    { title: '本平台数据目录', items: [
                        catalogEntry('数据资源', 'data-resources.html', 'database', resourceTypes),
                        catalogEntry('数据产品', 'data-products.html', 'box', productTypes)
                    ] },
                    { title: '按业务场景找数据', items: this._getScenarioItems(), scenarioMenu: true }
                ]
            },
            {
                id: 'app', label: '应用聚合', glyph: 'grid',
                groups: [
                    { title: '数据工厂', glyph: 'factory', productionLineMenu: true },
                    { title: '生态伙伴应用', glyph: 'grid', applicationEntry: true, links: [item('浏览全部伙伴应用 →', 'partner-application.html', 'grid')] },
                    { title: '服务与行业方案', glyph: 'chart', items: [
                        item('数据咨询服务', 'data-consulting.html', 'chat', '了解数据开发利用相关的专业咨询服务'),
                        item('行业解决方案', 'industry-solutions.html', 'chart', '围绕行业场景，查找适用的解决方案')
                    ] }
                ]
            },
            {
                id: 'eco', label: '生态聚合', glyph: 'network',
                groups: [
                    { title: '生态伙伴展示', glyph: 'network', partnerMenu: true, links: [item('查看伙伴目录', partnerDirectoryHref, 'users')] },
                    { title: '供需对接', glyph: 'register', items: [
                        catalogEntry('需求大厅', 'demand-hall.html', 'chat', demandTypes),
                        item('发布合作需求', publishDemandHref, 'box', '发布需求，说明希望合作方提供的能力。')
                    ] },
                    { title: '社区交流与共建', glyph: 'users', items: [
                        item('数据科学社区', 'community.html', 'users', '参与数据话题交流，分享经验与实践'),
                        item('政策资讯', 'policy-news.html', 'news', '了解数据要素相关政策与平台资讯'),
                        item('帮助中心', 'help-center.html', 'help', '查看平台使用指南与常见问题')
                    ] }
                ]
            }
        ];
    }

    _getScenarioItems() {
        if (!window.SpecialZoneStore) return dataScenarios;
        return window.SpecialZoneStore.listForNavigation().map(zone => ({
            ...item(zone.name, 'special-zone.html?zone=' + encodeURIComponent(zone.id), 'box', zone.subtitle || ''),
            zoneId: zone.id
        }));
    }

    _refreshScenarioMenu() {
        const menu = this.shadowRoot.querySelector('[data-scenario-menu]');
        if (menu) menu.innerHTML = this._renderScenarioEntries(this._getScenarioItems(), this._detectRoute());
    }

    _getProductionLineItems() {
        const store = window.DataProductionLineStore;
        return store ? store.listForNavigation().map(line =>
            item(line.heroTitle, store.href(line.id), '', line.heroSubtitle)
        ) : [];
    }

    _renderProductionLineEntries(route, failed = false) {
        if (failed) return '<p class="v2-scenario-empty">暂时无法加载数据生产线</p>';
        if (!window.DataProductionLineStore) return '';
        const lines = this._getProductionLineItems();
        return lines.length ? lines.map(line => this._renderEntry(line, route)).join('')
            : '<p class="v2-scenario-empty">暂无数据生产线</p>';
    }

    _refreshProductionLineMenu(failed) {
        const menu = this.shadowRoot.querySelector('[data-production-line-menu]');
        if (menu) menu.innerHTML = this._renderProductionLineEntries(this._detectRoute(), failed);
    }

    _renderScenarioEntries(entries, route) {
        return entries.length ? entries.map(entry => this._renderEntry(entry, route)).join('')
            : '<p class="v2-scenario-empty">暂无已发布的场景专区</p>';
    }

    _renderPartnerEntries(route, failed = false) {
        if (failed) return '<p class="v2-scenario-empty">暂时无法加载伙伴列表</p>';
        const store = window.PartnerStore;
        if (!store) return '';
        const partners = store.listForNavigation();
        return partners.length ? partners.map(partner => this._renderEntry({
            ...item(partner.name, 'partner-detail.html?id=' + encodeURIComponent(partner.id), 'users', partner.subtitle),
            partnerLogo: store.logoSrc(partner.logo)
        }, route)).join('') : '<p class="v2-scenario-empty">暂无已上架伙伴</p>';
    }

    _refreshPartnerMenu(failed) {
        const menu = this.shadowRoot.querySelector('[data-partner-menu]');
        if (menu) menu.innerHTML = this._renderPartnerEntries(this._detectRoute(), failed);
        const applications = this.shadowRoot.querySelector('[data-partner-applications]');
        if (applications) applications.innerHTML = this._renderPartnerApplicationEntries(this._detectRoute(), failed);
    }

    _renderPartnerApplicationEntries(route, failed = false) {
        if (failed) return '<p class="v2-scenario-empty">暂时无法加载伙伴应用</p>';
        if (!window.PartnerStore) return '';
        const store = window.PartnerStore.applicationStore;
        const entries = store.listForNavigation().map(application => {
            const content = store.presentation(application);
            return item(content.name, 'partner-application-detail.html?id=' + encodeURIComponent(application.id), '', content.subtitle);
        });
        return entries.length ? entries.map(entry => this._renderEntry(entry, route)).join('') : '<p class="v2-scenario-empty">暂无已发布的伙伴应用</p>';
    }

    _renderEntry(entry, route) {
        const current = entry.href === route.href || entry.href === route.parentHref ? ' is-current' : '';
        const isPartner = entry.partnerLogo !== undefined;
        const isThumbnail = entry.thumbnail !== undefined;
        const logo = isThumbnail ? (entry.thumbnail ? `<img src="${escape(entry.thumbnail)}" alt="">` : '')
            : isPartner ? (entry.partnerLogo ? `<img src="${escape(entry.partnerLogo)}" alt="">`
                : escape(Array.from(entry.label).slice(0, 2).join(''))) : icon(entry.glyph);
        const link = `<a class="v2-entry${current}${isPartner ? ' v2-partner-entry' : ''}" href="${escape(entry.href)}">
            <span class="v2-entry-icon${entry.partnerLogo ? ' has-partner-image' : ''}${isThumbnail ? ' has-thumbnail' : ''}" aria-hidden="true">${logo}</span>
            <span class="v2-entry-copy"><strong>${escape(entry.label)}</strong>${entry.description ? `<small>${escape(entry.description)}</small>` : ''}</span>
            <span class="v2-entry-arrow">${icon('arrow')}</span>
        </a>`;
        return entry.links ? `<div>${link}${this._renderTextLinks(entry.links, route, 'v2-catalog-links')}</div>` : link;
    }

    _renderTextLinks(links, route, layout = '') {
        return `<div class="v2-text-links ${layout}">${links.map(link =>
            `<a href="${escape(link.href)}"${link.href === route.href || link.href === route.filterHref ? ' class="is-current"' : ''}>${link.glyph ? icon(link.glyph) : ''}<span>${escape(link.label)}</span></a>`
        ).join('')}</div>`;
    }

    _renderGroup(group, route) {
        const topics = group.topics ? `<details class="v2-topic-spaces" open>
            <summary>龙岗公开目录收录的专题空间（${group.topics.length}）</summary>
            <div class="v2-entries">${group.topics.map(space => this._renderEntry(space, route)).join('')}</div>
        </details>` : '';
        return `<section class="v2-group">
            <h3>${group.glyph ? icon(group.glyph) : ''}${escape(group.title)}</h3>
            ${group.partnerMenu ? `<div class="v2-entries" data-partner-menu>${this._renderPartnerEntries(route)}</div>`
                : group.scenarioMenu ? `<div class="v2-entries" data-scenario-menu>${this._renderScenarioEntries(group.items, route)}</div>`
                : group.productionLineMenu ? `<div class="v2-entries" data-production-line-menu>${this._renderProductionLineEntries(route)}</div>`
                : group.applicationEntry ? `<div class="v2-entries" data-partner-applications>${this._renderPartnerApplicationEntries(route)}</div>`
                : group.items ? `<div class="v2-entries">${group.items.map(entry => this._renderEntry(entry, route)).join('')}</div>` : ''}
            ${group.links ? this._renderTextLinks(group.links, route, 'v2-group-links') : ''}
            ${group.applicationEntry ? `<button type="button" class="v2-partner-apply" data-partner-apply aria-haspopup="dialog">${icon('register')}<span>应用共创伙伴加入</span></button>` : ''}${topics}
        </section>`;
    }

    _render() {
        clearTimeout(this._closeTimer);
        this._openSection = null;
        this._hoverOpened = null;
        const route = this._detectRoute();
        const homeState = route.section === 'home'
            ? ` aria-current="${route.href === 'index.html' ? 'page' : 'location'}"`
            : '';
        const links = `<a href="index.html" class="v2-home"${homeState}>${icon('home')}<span>首页</span></a>` + this._sections().map(section => `
            <div class="v2-nav-item">
                <button type="button" class="v2-trigger" id="v2-trigger-${section.id}" aria-expanded="false" aria-controls="v2-panel-${section.id}"${route.section === section.id ? ' aria-current="true"' : ''}>
                    ${icon(section.glyph)}<span>${section.label}</span><span class="v2-chevron">${icon('chevron')}</span>
                </button>
                <div class="v2-panel${section.id === 'data' ? ' v2-panel-data' : ''}" id="v2-panel-${section.id}" aria-labelledby="v2-trigger-${section.id}" hidden>
                    <div class="v2-panel-inner">
                        <div class="v2-panel-heading"><h2>${section.label}</h2>
                            <button type="button" class="v2-close" data-close aria-label="关闭${section.label}导航">${icon('close')}</button>
                        </div>
                        <div class="v2-grid">${section.groups.map(group => this._renderGroup(group, route)).join('')}</div>
                    </div>
                </div>
            </div>`).join('');

        this._renderShell(links, route);
    }

    _renderShell(links, route) {
        const loggedIn = this._isLoggedIn();

        const menuConfig = window.LG_USER_MENU_CONFIG || {};
        const USER = menuConfig.user || {
            triggerName: '小智',
            accountName: 'gf_ops01',
            company: 'xxx科技有限公司',
            tags: ['数据提供方', '数据需求方']
        };
        const USER_MENU = menuConfig.items || [];

        const chevronSVG = `<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
        const spacesHTML = this._getSpaceItems().map(space => {
            const current = space.href === route.href ? ' active' : '';
            return `<a href="${escape(space.href)}" class="dropdown-item${current}">${icon('network')}${escape(space.label)}</a>`;
        }).join('');
        const spacesDropdown = `
            <div class="nav-dropdown nav-dropdown-right">
                <button type="button" class="nav-dropdown-trigger" aria-expanded="false" aria-controls="v2-spaces-panel">${icon('network')}我的空间${chevronSVG}</button>
                <div id="v2-spaces-panel" class="nav-dropdown-menu nav-dropdown-menu-right" inert>${spacesHTML}</div>
            </div>`;

        const userMenuHTML = USER_MENU.map(m =>
            `<a href="${escape(m.href)}" class="user-menu-item"${m.target ? ` target="${escape(m.target)}" rel="noopener noreferrer"` : ''}>${icon('grid')}${escape(m.label)}</a>`
        ).join('');
        const userTagsHTML = (USER.tags || []).map(tag => `<span class="user-tag">${tag}</span>`).join('');

        /* ── 右侧区域：登录前 vs 登录后 ── */
        let actionsHTML;
        if (loggedIn) {
            actionsHTML = `
            ${spacesDropdown}
            <span class="notify-bell" role="button" tabindex="0" aria-label="通知" title="通知">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <span class="notify-badge"></span>
            </span>
            <div class="user-dropdown" id="userDropdown">
                <button type="button" class="user-trigger" id="userTrigger" aria-expanded="false" aria-controls="userPanel">
                    <svg class="user-avatar-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                    <span class="user-name-text">${USER.triggerName || USER.accountName}</span>
                    ${chevronSVG}
                </button>
                <div class="user-panel" id="userPanel" inert>
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
                        <button type="button" class="logout-btn" id="logoutBtn">${icon('logout')}退出</button>
                    </div>
                </div>
            </div>`;
        } else {
            actionsHTML = `
            ${spacesDropdown}
            <a href="register.html" class="btn btn-outline">${icon('register')}注册</a>
            <a href="login.html" class="btn btn-primary">${icon('login')}登录</a>`;
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
.nav-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; flex-shrink: 0; }
.nav-logo-img { height: 52px; width: auto; }
.nav-brand-copy { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; white-space: nowrap; }
.nav-brand-name { font-size: var(--brand-name-font-size, 20px); font-weight: 600; color: var(--text-primary, #1F2B28); letter-spacing: -0.01em; line-height: var(--brand-name-line-height, 1.3); }
.nav-brand-subtitle { font-size: var(--brand-subtitle-font-size, 13px); font-weight: 400; color: var(--text-secondary, #5C6863); line-height: var(--brand-subtitle-line-height, 1.4); }

/* ── Links ── */
.nav-links { display: flex; align-items: center; height: 100%; }
.v2-mobile-toggle { display: none; }
/* ── Dropdown (shared) ── */
.nav-dropdown { position: relative; height: 64px; display: flex; align-items: center; }
.nav-dropdown-trigger {
    padding: 8px 14px; font-size: 13px; font-weight: 500;
    color: #5C6863; border-radius: 6px;
    transition: all 150ms ease; height: 64px;
    display: flex; align-items: center; gap: 5px;
    cursor: pointer; user-select: none; white-space: nowrap;
    border: 0; background: transparent; font-family: inherit;
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

/* ── Notifications ── */
.notify-bell {
    position: relative; display: flex; align-items: center; justify-content: center;
    width: 36px; height: 36px; cursor: pointer;
    color: #5C6863; transition: color 150ms ease;
}
.notify-bell:hover { color: #1F2B28; }
.notify-bell > svg { width: 22px; height: 22px; }
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
    border: 0; background: transparent; font: inherit;
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
    .nav-brand-copy { display: none; }
    .nav-links { gap: 0; }
    .nav-dropdown-trigger { padding-left: 10px; padding-right: 10px; }
    .nav-actions { gap: 6px; }
}
@media (max-width: 768px) {
    .nav-links { display: none; }
}
</style>
<link rel="stylesheet" href="css/nav-bar.css">

<nav class="nav" aria-label="平台主导航">
    <div class="nav-container">
        <a href="index.html" class="nav-brand">
            <img src="images/logo.png" alt="灵拓" class="nav-logo-img">
            <span class="nav-brand-copy">
                <span class="nav-brand-name">灵拓 · 数据聚合服务平台</span>
                <span class="nav-brand-subtitle">人工智能与机器人数据聚合服务中心</span>
            </span>
        </a>
        <button type="button" class="v2-mobile-toggle" aria-expanded="false" aria-controls="v2-primary">${icon('menu')}<span>导航</span></button>
        <div class="nav-links" id="v2-primary">${links}</div>
        <div class="nav-actions">${actionsHTML}</div>
    </div>
</nav>`;
    }

    _closePrimary(restoreFocus = false) {
        clearTimeout(this._closeTimer);
        const openGroup = this._openSection;
        this.shadowRoot.querySelectorAll('.v2-nav-item').forEach(group => {
            group.querySelector('.v2-trigger').setAttribute('aria-expanded', 'false');
            group.querySelector('.v2-panel').hidden = true;
        });
        this._openSection = null;
        this._hoverOpened = null;
        if (restoreFocus && openGroup) openGroup.querySelector('.v2-trigger').focus({ preventScroll: true });
    }

    _closeAccounts(except, keepNotifications = false) {
        this.shadowRoot.querySelectorAll('.nav-actions [aria-controls]').forEach(trigger => {
            if (trigger === except) return;
            trigger.setAttribute('aria-expanded', 'false');
            const panel = this.shadowRoot.getElementById(trigger.getAttribute('aria-controls'));
            panel.classList.remove('open');
            panel.setAttribute('inert', '');
        });
        if (!keepNotifications) {
            this.shadowRoot.querySelectorAll('.mc-dropdown.open').forEach(panel => panel.classList.remove('open'));
        }
    }

    _openPrimary(group, hover = false) {
        this._closePrimary();
        this._closeAccounts();
        group.querySelector('.v2-trigger').setAttribute('aria-expanded', 'true');
        group.querySelector('.v2-panel').hidden = false;
        this._openSection = group;
        this._hoverOpened = hover ? group : null;
    }

    _closeMobile() {
        this._closePrimary();
        this.shadowRoot.querySelector('.nav-links').classList.remove('v2-mobile-open');
        this.shadowRoot.querySelector('.v2-mobile-toggle').setAttribute('aria-expanded', 'false');
    }

    _bindEvents() {
        if (this._events) this._events.abort();
        this._events = new AbortController();
        const options = { signal: this._events.signal };
        const shadow = this.shadowRoot;
        const groups = Array.from(shadow.querySelectorAll('.v2-nav-item'));
        const isDesktop = () => window.matchMedia('(min-width: 901px)').matches;

        groups.forEach(group => {
            const trigger = group.querySelector('.v2-trigger');
            group.addEventListener('pointerenter', event => {
                if (event.pointerType === 'mouse' && isDesktop()) this._openPrimary(group, true);
            }, options);
            group.addEventListener('pointerleave', event => {
                if (event.pointerType !== 'mouse' || !isDesktop()) return;
                clearTimeout(this._closeTimer);
                this._closeTimer = setTimeout(() => {
                    // Keep an open panel available to keyboard users.
                    if (!group.contains(shadow.activeElement)) this._closePrimary();
                }, 180);
            }, options);
            trigger.addEventListener('click', () => {
                if (this._hoverOpened === group) {
                    this._hoverOpened = null;
                    return;
                }
                if (this._openSection === group) this._closePrimary();
                else this._openPrimary(group);
            }, options);
            trigger.addEventListener('keydown', event => {
                if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
                event.preventDefault();
                this._openPrimary(group);
                const entries = group.querySelectorAll('.v2-panel a');
                entries[event.key === 'ArrowUp' ? entries.length - 1 : 0].focus();
            }, options);
            group.querySelector('[data-close]').addEventListener('click', () => this._closePrimary(true), options);
            group.addEventListener('focusout', event => {
                if (this._openSection === group && !group.contains(event.relatedTarget)) this._closePrimary();
            }, options);
        });

        const mobile = shadow.querySelector('.v2-mobile-toggle');
        mobile.addEventListener('click', () => {
            const open = mobile.getAttribute('aria-expanded') !== 'true';
            this._closePrimary();
            this._closeAccounts();
            mobile.setAttribute('aria-expanded', String(open));
            shadow.querySelector('.nav-links').classList.toggle('v2-mobile-open', open);
        }, options);

        shadow.querySelectorAll('.nav-actions [aria-controls]').forEach(trigger => {
            const panel = shadow.getElementById(trigger.getAttribute('aria-controls'));
            trigger.addEventListener('click', event => {
                event.stopPropagation();
                const open = trigger.getAttribute('aria-expanded') !== 'true';
                this._closeMobile();
                this._closeAccounts(trigger);
                trigger.setAttribute('aria-expanded', String(open));
                panel.classList.toggle('open', open);
                panel.toggleAttribute('inert', !open);
            }, options);
            trigger.addEventListener('keydown', event => {
                if (event.key !== 'ArrowDown') return;
                event.preventDefault();
                if (trigger.getAttribute('aria-expanded') !== 'true') trigger.click();
                panel.querySelector('a, button')?.focus();
            }, options);
            trigger.parentElement.addEventListener('focusout', event => {
                if (!trigger.parentElement.contains(event.relatedTarget)) {
                    trigger.setAttribute('aria-expanded', 'false');
                    panel.classList.remove('open');
                    panel.setAttribute('inert', '');
                }
            }, options);
        });
        const logout = shadow.getElementById('logoutBtn');
        if (logout) logout.addEventListener('click', () => {
            try { localStorage.removeItem('lgk_logged_in'); } catch (error) { /* Keep the existing guest fallback. */ }
            this._closeMobile();
            this._render();
            this._bindEvents();
        }, options);

        this._bindMessageDropdown();
        const bell = shadow.querySelector('.notify-bell');
        if (bell) {
            bell.addEventListener('click', event => {
                if (event.target.closest('.mc-dropdown')) return;
                this._closeMobile();
                this._closeAccounts(null, true);
            }, { ...options, capture: true });
            bell.addEventListener('keydown', event => {
                if (event.target !== bell) return;
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    bell.click();
                }
            }, options);
        }

        shadow.addEventListener('click', event => {
            if (event.target.closest('[data-partner-apply]')) {
                if (isDesktop()) this._closePrimary(true);
                else {
                    this._closeMobile();
                    mobile.focus();
                }
                Promise.all([
                    loadPartnerStore(),
                    window.PartnerUI ? Promise.resolve() : loadNavAsset('js/partner-ui.js'),
                    loadNavAsset('css/service-application-modal.css'),
                    loadNavAsset('css/monitor-pages.css'),
                    loadNavAsset('css/ecosystem-partners.css')
                ]).then(() => window.PartnerUI.openApplication()).catch(() => {
                    window.alert('暂时无法打开申请表单，请稍后重试。');
                });
                return;
            }
            if (event.target.closest('a')) this._closeMobile();
        }, options);
        document.addEventListener('pointerdown', event => {
            if (!event.composedPath().includes(this)) {
                this._closeMobile();
                this._closeAccounts();
            }
        }, options);
        shadow.addEventListener('keydown', event => {
            if (event.key !== 'Escape') return;
            event.preventDefault();
            if (this._openSection) this._closePrimary(true);
            else {
                const account = shadow.querySelector('.nav-actions [aria-expanded="true"]');
                this._closeAccounts();
                if (account) account.focus();
                else if (mobile.getAttribute('aria-expanded') === 'true') {
                    this._closeMobile();
                    mobile.focus();
                }
            }
        }, options);
        window.addEventListener('resize', () => {
            this._closeMobile();
            this._closeAccounts();
        }, options);
        window.addEventListener('storage', event => {
            if (event.key === 'lgk_logged_in' || event.key === null) this._refresh();
            if (event.key === window.DataProductionLineStore?.storageKey) this._refreshProductionLineMenu();
        }, options);
        window.addEventListener('production-line-selection-change', () => this._refreshProductionLineMenu(), options);
        window.addEventListener('data-production-line-change', () => this._refreshProductionLineMenu(), options);
        window.addEventListener('special-zone-store-change', () => this._refreshScenarioMenu(), options);
        window.addEventListener('pageshow', event => {
            if (!event.persisted) return;
            this._refreshScenarioMenu();
            this._refreshProductionLineMenu();
            this._refreshPartnerMenu();
        }, options);
        window.addEventListener('partner-store-change', event => {
            if (!event.detail || event.detail === 'profiles' || event.detail === 'partnerApps') this._refreshPartnerMenu();
        }, options);
    }

    disconnectedCallback() {
        clearTimeout(this._closeTimer);
        if (this._events) this._events.abort();
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
})();
