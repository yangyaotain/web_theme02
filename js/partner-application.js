(function () {
    'use strict';
    const params = new URLSearchParams(window.location.search);
    // Old individual-app links now open their own detail; company links open the full directory.
    if (params.has('app')) {
        window.location.replace('partner-application-detail.html?id=' + encodeURIComponent(params.get('app')));
        return;
    }
    const store = window.PartnerStore;
    const { escape, logo, icon } = window.PartnerUI;
    const grid = document.querySelector('[data-application-grid]');
    const pagination = document.querySelector('.pagination');
    const form = document.querySelector('[data-application-search]');
    const empty = document.querySelector('[data-application-empty]');
    let keyword = (params.get('q') || '').trim();
    form.elements.keyword.value = keyword;
    const pager = window.PortalDomainFilter.createPager(pagination, render, params.get('page'));

    function render(reset = false) {
        const queryText = keyword.toLowerCase();
        const records = store.applicationStore.listPublished().filter(record => {
            const content = store.applicationStore.presentation(record);
            return [content.name, content.partnerName, content.subtitle].some(value => value.toLowerCase().includes(queryText));
        });
        const visible = pager.slice(records, reset);
        const page = pager.getPage();
        document.querySelector('[data-application-count]').textContent = '共 ' + records.length + ' 个应用';
        empty.hidden = records.length > 0;
        empty.textContent = keyword ? '暂无符合搜索条件的应用，请调整关键词后重试' : '暂无已发布的伙伴应用';
        pagination.hidden = records.length <= 9;
        const query = new URLSearchParams();
        if (keyword) query.set('q', keyword);
        if (page > 1) query.set('page', page);
        history.replaceState(null, '', 'partner-application.html' + (query.size ? '?' + query : ''));
        grid.innerHTML = visible.map(record => {
            const content = store.applicationStore.presentation(record);
            const detailQuery = new URLSearchParams({ id: record.id, page });
            if (keyword) detailQuery.set('q', keyword);
            return '<a class="data-card partner-brand-card application-card" href="partner-application-detail.html?' + detailQuery + '" aria-label="查看' + escape(record.name) + '详情">'
                + '<div class="partner-brand-content"><div class="data-card-header">'
                + logo({ ...record, logo: content.logo }) + '<div class="data-card-heading">'
                + '<h2 class="data-card-title" title="' + escape(content.name) + '">' + escape(content.name) + '</h2>'
                + (content.partnerName ? '<p class="application-card-partner">' + escape(content.partnerName) + '</p>' : '')
                + '</div></div>'
                + (content.subtitle ? '<p class="data-card-desc">' + escape(content.subtitle) + '</p>' : '')
                + '<div class="data-card-footer">' + (content.badge ? '<span class="data-card-tag">' + escape(content.badge) + '</span>' : '')
                + '<span class="partner-brand-link">查看应用' + icon('next') + '</span></div></div></a>';
        }).join('');
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        keyword = form.elements.keyword.value.trim();
        render(true);
    });
    render();
    window.addEventListener('partner-store-change', event => {
        if (!event.detail || ['profiles', 'partnerApps'].includes(event.detail)) render();
    });
})();
