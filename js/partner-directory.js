(function () {
    'use strict';

    const store = window.PartnerStore;
    const { escape, icon, logo } = window.PartnerUI;
    const form = document.querySelector('.partner-directory-search');
    const grid = document.querySelector('[data-partner-grid]');
    const count = document.querySelector('[data-partner-count]');
    const empty = document.querySelector('[data-partner-empty]');
    let keyword = '';

    function render() {
        const records = store.listPublished().filter(record => [record.name, record.category]
            .some(value => value.toLowerCase().includes(keyword)));
        count.textContent = `共 ${records.length} 家伙伴`;
        grid.innerHTML = records.map(record => `
            <a class="data-card partner-brand-card" href="partner-detail.html?id=${encodeURIComponent(record.id)}" aria-label="查看${escape(record.name)}">
                <div class="partner-brand-stage">${logo(record)}</div>
                <div class="partner-brand-content">
                    <h2 class="data-card-title">${escape(record.name)}</h2>
                    <p class="data-card-desc">${escape(record.subtitle)}</p>
                    <div class="data-card-footer">
                        <span class="data-card-tag">${escape(record.category)}</span>
                        <span class="partner-brand-link">查看伙伴${icon('next')}</span>
                    </div>
                </div>
            </a>`).join('');
        empty.hidden = records.length > 0;
        empty.textContent = keyword ? '暂无符合搜索条件的伙伴' : '暂无已发布伙伴';
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        keyword = form.elements.keyword.value.trim().toLowerCase();
        render();
    });
    window.addEventListener('partner-store-change', event => {
        if (!event.detail || event.detail === 'profiles') render();
    });

    render();
    const requestedPartner = new URLSearchParams(window.location.search).get('partner');
    if (requestedPartner) {
        window.location.replace('partner-detail.html?id=' + encodeURIComponent(requestedPartner));
    }
})();
