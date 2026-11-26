(function () {
    'use strict';
    const params = new URLSearchParams(window.location.search);
    const store = window.PartnerStore;
    const token = params.get('preview');
    const empty = document.querySelector('[data-empty]');

    function readRecord() {
        if (token) {
            try {
                return JSON.parse(localStorage.getItem('partner-preview:' + token));
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
        document.querySelector('[data-preview-close]').addEventListener('click', () => window.close());
    } else {
        document.querySelector('[data-partner-navigation]').innerHTML = '<nav-bar active="data-ecosystem"></nav-bar>';
        const script = document.createElement('script');
        script.src = 'js/nav-bar.js';
        document.head.appendChild(script);
    }

    function render() {
        const record = readRecord();
        document.querySelector('[data-partner-article]').hidden = !record;
        empty.hidden = !!record;
        if (!record) {
            empty.textContent = token ? '预览内容已失效，请返回编辑页面重新预览。' : '该伙伴尚未发布、已下架或已删除，可返回伙伴目录查看其他伙伴。';
            return;
        }
        document.title = (record.name || '伙伴介绍预览') + ' · 灵拓数据聚合服务平台';
        const values = {
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
        hero.hidden = !record.heroImg;
        if (record.heroImg) hero.src = record.heroImg;
        document.querySelector('[data-sections]').innerHTML = window.ServiceContentPreview.renderSections(window.ContentSectionEditor.normalize(record).sections);

    }
    render();
    window.addEventListener('partner-store-change', event => {
        if (!token && (!event.detail || event.detail === 'profiles')) render();
    });
})();
