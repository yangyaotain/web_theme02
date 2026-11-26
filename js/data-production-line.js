(function () {
    'use strict';

    const store = window.DataProductionLineStore;
    const sectionEditor = window.ContentSectionEditor;
    const detail = document.getElementById('lineDetail');
    const platformTitle = document.title;
    const isPreview = new URLSearchParams(location.search).has('preview');

    function escape(value) {
        return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
    }

    function icon(name) {
        return `<span class="material-symbols-outlined" aria-hidden="true">${escape(name)}</span>`;
    }

    function image(source, alt = '') {
        const src = store.imageSrc(source);
        return src ? `<img src="${escape(src)}" alt="${escape(alt)}">` : '';
    }

    function paragraphs(text) {
        return String(text || '').split('\n').filter(line => line.trim()).map(line => `<p>${escape(line)}</p>`).join('');
    }

    function renderImageGrid(card) {
        const { rows, columns, preset } = card.layout;
        return Array.from({ length: rows }, (_, index) => {
            const blocks = card.blocks.slice(index * columns, (index + 1) * columns);
            if (!blocks.some(block => block.kind === 'image' ? store.imageSrc(block.visual?.src) : block.text.trim())) return '';
            const widths = blocks.map(block => `minmax(0, ${block.ratio}fr)`).join(' ');
            const legacyLayout = preset === 'left-right' && blocks[0].kind === 'text' && blocks[1].kind === 'image' && blocks.every(block => block.ratio === 1);
            return `<div class="line-image-row"${legacyLayout ? ' data-layout="left-right"' : ''} style="--line-grid-columns: ${widths}">
                ${blocks.map(block => block.kind === 'image'
                    ? `<div class="content-image">${image(block.visual?.src, block.visual?.name)}</div>`
                    : `<div class="content-text">${paragraphs(block.text)}</div>`).join('')}
            </div>`;
        }).join('');
    }

    function renderCards(cards) {
        let number = 0;
        let group = '';
        let result = '';
        cards.filter(sectionEditor.hasCardContent).forEach(card => {
            if (card.type === 'image-grid') {
                if (group) result += `<div class="case-grid">${group}</div>`;
                result += renderImageGrid(card);
                group = '';
                return;
            }
            let visual = '';
            if (card.type === 'sequence') visual = String(++number);
            if (card.type === 'icon') visual = card.visual?.type === 'image'
                ? image(card.visual.src) : icon(card.visual?.name || 'description');
            group += `<div class="case-card${card.type === 'integrated' ? ' case-card-wide' : ''}">
                ${visual ? `<div class="case-card-icon">${visual}</div>` : ''}
                ${card.title ? `<h3 class="case-card-title">${escape(card.title)}</h3>` : ''}
                ${card.desc ? `<div class="case-card-desc">${paragraphs(card.desc)}</div>` : ''}
            </div>`;
        });
        return result + (group ? `<div class="case-grid">${group}</div>` : '');
    }

    function renderDetail(line) {
        let chapterNumber = 0;
        const sections = sectionEditor.normalize({ sections: line.sections }).sections
            .filter(sectionEditor.hasSectionContent);
        return `<article class="article">
            <header class="article-hero">
                ${image(line.heroImg)}
                <div class="article-hero-content">
                    ${line.badge ? `<span class="article-badge">${escape(line.badge)}</span>` : ''}
                    <h1 class="article-title">${escape(line.heroTitle || '数据生产线')}</h1>
                    ${line.heroSubtitle ? `<p class="article-subtitle">${escape(line.heroSubtitle)}</p>` : ''}
                </div>
            </header>
            ${line.lead || sections.length ? `<div class="article-body">
                ${line.lead ? `<div class="article-lead">${paragraphs(line.lead)}</div>` : ''}
                ${sections.map(section => section.type === 'related-links' ? sectionEditor.renderLinks(section) : `<section class="article-section">
                    ${section.title ? `<div class="section-header"><span class="section-number">${++chapterNumber}</span><h2 class="section-title">${escape(section.title)}</h2></div>` : ''}
                    ${section.content ? `<div class="section-content">${paragraphs(section.content)}</div>` : ''}
                    ${renderCards(section.cards)}
                </section>`).join('')}
            </div>` : ''}
        </article>`;
    }

    function selectLine(line) {
        detail.innerHTML = renderDetail(line);
        document.title = `${line.heroTitle || '数据生产线'} · ${platformTitle}`;
    }

    function showEmpty(message) {
        detail.innerHTML = `<article class="article line-empty">${escape(message)}</article>`;
        document.title = `数据生产线 · ${platformTitle}`;
    }

    if (isPreview) {
        document.querySelector('nav-bar').hidden = true;
        document.getElementById('linePreviewBar').hidden = false;
        document.getElementById('linePreviewClose').addEventListener('click', () => window.close());
        let preview = null;
        try { preview = JSON.parse(sessionStorage.getItem(store.previewKey)); } catch { /* Expired preview. */ }
        if (preview) {
            selectLine({ ...store.normalize(preview), id: 'preview' });
        } else {
            showEmpty('预览已失效，请从编辑表单重新打开。');
        }
        return;
    }

    let records = [];
    function selectRequestedLine() {
        const requested = new URLSearchParams(location.search).get('line');
        const line = requested ? records.find(entry => entry.id === requested) : records[0];
        if (line) {
            selectLine(line);
        } else {
            showEmpty(requested ? '该生产线尚未发布、已下架或已删除，请从门户导航选择其他生产线。' : '暂无已发布的数据生产线。');
        }
        window.dispatchEvent(new Event('production-line-selection-change'));
    }

    function loadLines() {
        records = store.listForPortal();
        selectRequestedLine();
    }

    window.addEventListener('popstate', selectRequestedLine);
    window.addEventListener('data-production-line-change', loadLines);
    window.addEventListener('storage', event => {
        if (event.key === store.storageKey || event.key === null) loadLines();
    });
    loadLines();
})();
