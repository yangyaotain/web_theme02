(function () {
    'use strict';
    const catalog = window.PartnerApplicationCatalog;
    const params = new URLSearchParams(window.location.search);
    const partnerId = catalog.getPartnerId(params);
    const content = catalog.getLists(partnerId);
    const labels = { resources: '数据资源', products: '数据产品', services: '数据咨询服务', solutions: '行业解决方案' };
    const tabs = Array.from(document.querySelectorAll('[data-tab]'));
    const lists = {};

    function detailHref(item, key) {
        const pages = { resources: 'data-detail.html', products: 'product-detail.html', services: 'consulting-detail.html', solutions: 'industry-solutions.html' };
        const query = new URLSearchParams({
            partnerItem: item.id, partner: partnerId,
            tab: key, page: lists[key].pager ? lists[key].pager.getPage() : 1
        });
        if (key === 'services') {
            query.set('title', item[0]);
            query.set('price', '面议');
        }
        if (key === 'solutions') query.set('id', item.id);
        return pages[key] + '?' + query.toString();
    }

    function escape(value) {
        return String(value ?? '').replace(/[&<>"']/g, char => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[char]));
    }

    function dataCard(item, key) {
        const [title, description] = item.map(escape);
        const isData = key === 'resources' || key === 'products';
        const type = isData ? escape(item[2]) : labels[key];
        const delivery = isData ? (type === 'API' ? 'API 传输' : '文件交付') : '按项目交付';
        const visual = isData
            ? `<div class="data-card-image is-icon" aria-hidden="true"><span class="material-symbols-outlined">${escape(item[3])}</span></div>`
            : `<div class="data-card-image" aria-hidden="true"><img src="${escape(item[2])}" alt=""></div>`;
        const scopeLabel = isData ? '覆盖范围' : '服务方式';
        const scope = isData ? '全国' : '线上 / 线下';
        const periodLabel = isData ? '更新频率' : '交付周期';
        const period = isData ? escape(item[4]) : '按项目约定';
        return `<a class="data-card" href="${escape(detailHref(item, key))}" aria-label="查看${title}详情">
            <div class="data-card-header">
                ${visual}
                <div class="data-card-heading"><h3 class="data-card-title" title="${title}">${title}</h3>
                    <div class="data-card-tags"><span class="data-card-tag">${type}</span><span class="data-card-tag">${delivery}</span></div>
                </div>
            </div>
            <p class="data-card-desc">${description}</p>
            <div class="data-card-info">
                <span class="data-card-info-item"><span class="data-card-info-label">${scopeLabel}：</span><span class="data-card-info-value">${scope}</span></span>
                <span class="data-card-info-item"><span class="data-card-info-label">${periodLabel}：</span><span class="data-card-info-value">${period}</span></span>
            </div>
            <div class="data-card-price-row"><span class="data-card-price-label">参考价格</span><strong class="data-card-price-value">一事一议</strong></div>
            <div class="data-card-footer"><span class="data-card-type">${type}</span><span class="data-card-meta">2026-11-20</span></div>
        </a>`;
    }

    function renderList(key) {
        const items = content[key];
        const list = lists[key];
        const visible = list.pager ? list.pager.slice(items) : items;
        list.grid.innerHTML = visible.length ? visible.map(item => dataCard(item, key)).join('')
            : '<p class="partner-detail-empty" role="status">暂无' + labels[key] + '</p>';
    }

    function selectTab(tab) {
        tabs.forEach(button => {
            const active = button === tab;
            button.classList.toggle('active', active);
            button.setAttribute('aria-selected', String(active));
            button.tabIndex = active ? 0 : -1;
            document.getElementById(button.getAttribute('aria-controls')).hidden = !active;
        });
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => selectTab(tab));
        tab.addEventListener('keydown', event => {
            let next;
            if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
            if (event.key === 'ArrowLeft') next = tabs[(index + tabs.length - 1) % tabs.length];
            if (event.key === 'Home') next = tabs[0];
            if (event.key === 'End') next = tabs[tabs.length - 1];
            if (!next) return;
            event.preventDefault();
            selectTab(next);
            next.focus();
        });
    });

    Object.entries(labels).forEach(([key, label]) => {
        const panel = document.querySelector(`[data-panel="${key}"]`);
        const paginated = key === 'resources' || key === 'products';
        panel.innerHTML = `<p class="application-results">共 <strong>${content[key].length}</strong> 条${label}</p><div class="data-grid" aria-live="polite"></div>` +
            (paginated ? `<nav class="pagination" aria-label="${label}分页">
                <button class="pagination-btn" type="button" disabled><span aria-hidden="true">‹</span> 上一页</button>
                <div class="pagination-numbers"></div>
                <button class="pagination-btn" type="button" disabled>下一页 <span aria-hidden="true">›</span></button>
            </nav>` : '');
        lists[key] = {
            grid: panel.querySelector('.data-grid'),
            pager: paginated ? window.PortalDomainFilter.createPager(panel.querySelector('.pagination'), () => renderList(key), params.get('tab') === key ? params.get('page') : 1) : null
        };
    });

    const initialTab = tabs.find(tab => tab.dataset.tab === params.get('tab'));
    if (initialTab) selectTab(initialTab);

    function render() {
        const company = window.PartnerStore.listPublished().find(record => record.id === partnerId);
        const title = company ? company.name + ' 相关应用与服务' : '生态伙伴应用';
        document.querySelector('[data-application-name]').textContent = title;
        document.title = title + ' · 灵拓数据聚合服务平台';
        document.querySelector('[data-company]').hidden = !company;
        document.querySelector('[data-catalog]').hidden = !company;
        document.querySelector('[data-empty]').hidden = !!company;
        if (!company) return;
        // 与伙伴目录详情共用公司记录及横幅字段。
        document.querySelector('[data-title]').textContent = company.heroTitle || company.name;
        document.querySelector('[data-badge]').textContent = company.badge || company.category;
        document.querySelector('[data-subtitle]').textContent = company.heroSubtitle || company.subtitle;
        const image = document.querySelector('[data-hero-image]');
        image.hidden = !company.heroImg;
        if (company.heroImg) image.src = company.heroImg;
        Object.keys(labels).forEach(renderList);
    }

    render();
    window.addEventListener('partner-store-change', event => {
        if (!event.detail || event.detail === 'profiles') render();
    });
})();
