(function () {
    'use strict';
    const params = new URLSearchParams(window.location.search);
    const isApplication = window.location.pathname.endsWith('/partner-application-detail.html');
    const store = isApplication ? window.PartnerStore.applicationStore : window.PartnerStore;
    const token = params.get('preview');
    const empty = document.querySelector('[data-empty]');
    const directory = isApplication ? 'partner-application.html' : 'partner-directory.html';
    const directoryLabel = isApplication ? '全部伙伴应用' : '伙伴目录';
    const returnPage = Math.max(1, Number.parseInt(params.get('page'), 10) || 1);
    const returnQuery = new URLSearchParams();
    if (isApplication && params.get('q')?.trim()) returnQuery.set('q', params.get('q').trim());
    if (returnPage > 1) returnQuery.set('page', returnPage);
    document.querySelectorAll('[data-application-return]').forEach(link => {
        link.href = directory + (returnQuery.size ? '?' + returnQuery : '');
    });

    function readRecord() {
        if (token) {
            try {
                return JSON.parse(localStorage.getItem((isApplication ? 'lg-ecosystem-partners:v1:app-preview:' : 'partner-preview:') + token));
            } catch {
                return null;
            }
        }
        return store.listPublished().find(record => record.id === params.get('id'));
    }

    if (token) {
        document.body.classList.add('partner-preview');
        document.querySelector('[data-preview-bar]').hidden = false;
        document.querySelector('[data-partner-breadcrumb]').hidden = true;
        document.querySelector('[data-preview-close]').addEventListener('click', () => {
            window.close();
            if (!window.closed) window.location.href = isApplication ? 'operation-partners.html?menu=partner-apps' : 'operation-partners.html';
        });
    } else {
        document.querySelector('[data-partner-navigation]').innerHTML = '<nav-bar active="' + (isApplication ? 'data-services' : 'data-ecosystem') + '"></nav-bar>';
        const script = document.createElement('script');
        script.src = 'js/nav-bar.js';
        document.head.appendChild(script);
    }

    function render() {
        const record = readRecord();
        document.querySelector('[data-partner-article]').hidden = !record;
        empty.hidden = !!record;
        if (!record) {
            empty.textContent = token ? '预览内容已失效，请返回管理页面重新预览。' : '该' + (isApplication ? '应用' : '伙伴') + '尚未发布、已下架或已删除。';
            const link = document.createElement('a');
            link.href = token ? (isApplication ? 'operation-partners.html?menu=partner-apps' : 'operation-partners.html') : directory;
            link.textContent = token ? '返回管理列表' : '返回' + directoryLabel;
            empty.append(' ', link);
            return;
        }
        document.title = (record.name || (isApplication ? '应用介绍预览' : '伙伴介绍预览')) + ' · 灵拓数据聚合服务平台';
        const content = isApplication ? store.presentation(record) : record;
        const values = isApplication ? {
            'partner-name': content.name,
            badge: content.badge, title: content.heroTitle, subtitle: content.heroSubtitle, lead: content.lead
        } : {
            'partner-name': record.name,
            badge: record.badge || record.category,
            title: record.heroTitle || record.name || '伙伴介绍预览',
            subtitle: record.heroSubtitle || record.subtitle,
            lead: record.lead ?? record.intro
        };
        Object.entries(values).forEach(([key, value]) => {
            const element = document.querySelector('[data-' + key + ']');
            element.textContent = value || '';
            element.hidden = !value;
        });
        const hero = document.querySelector('[data-hero-image]');
        hero.hidden = !content.heroImg;
        if (content.heroImg) hero.src = content.heroImg;
        else hero.removeAttribute('src');
        if (isApplication) document.querySelector('.preview-hero').hidden = ![content.heroImg, content.badge, content.heroTitle, content.heroSubtitle].some(Boolean);
        document.querySelector('[data-sections]').innerHTML = window.ServiceContentPreview.renderSections(
            isApplication ? content.sections : window.ContentSectionEditor.normalize(content).sections,
            { exactFields: isApplication }
        );
    }
    render();
    window.addEventListener('partner-store-change', event => {
        if (!event.detail || (!token && (event.detail === 'profiles' || (isApplication && event.detail === 'partnerApps')))) render();
    });
})();
