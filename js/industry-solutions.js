(function () {
    'use strict';
    var catalog = window.IndustrySolutionCatalog;
    var content = document.querySelector('.content-area');
    var tree = document.querySelector('.solution-tree');
    if (!catalog || !content || !tree) return;
    var records = catalog.createRecords().filter(function (item) { return item.status === 'listed'; });
    var groups = catalog.groups;
    var params = new URLSearchParams(window.location.search);
    var previewToken = params.get('preview');
    var expanded = {};
    var activeId = '';
    var activeRecord = null;
    var returnFocus = null;
    var overlay = document.getElementById('consultOverlay');
    var aliases = {
        '龙华区智能制造诊断解决方案': 'solution-production-efficiency',
        '园区产业链精准招商解决方案': 'solution-park-investment',
        '企业数据资产入表服务方案': 'solution-enterprise-assets',
        '区域医疗资源协同分析方案': 'solution-medical-resources'
    };
    var paths = {
        arrow: 'm6 9 6 6 6-6',
        cart: 'M3 3h2l3 12h11l2-8H6M9 21h.01M18 21h.01',
        chat: 'M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z',
        check: 'm5 12 4 4L19 6',
        close: 'm6 6 12 12M6 18 18 6',
        favorite: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z'
    };
    function icon(name) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + paths[name] + '"/></svg>'; }
    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
        });
    }
    function safeImage(value) {
        var image = String(value || '');
        if (/^data:image\/(png|jpeg|gif|webp);base64,[a-z0-9+/=]+$/i.test(image)) return image;
        if (/^(images\/|https:\/\/)[^<>"'\\\r\n]+$/i.test(image)) return image;
        return 'images/consult-governance.jpg';
    }
    function getPrice(item) {
        var pricing = item.pricing || {};
        var measure = (pricing.measures || ['面议'])[0];
        if (measure === '按次数' && pricing.countPrice) return pricing.countPrice + (pricing.countUnit || '元/次');
        if (measure === '按时长' && pricing.durationPrice) return pricing.durationPrice + (pricing.durationUnit || '元/月');
        return '面议';
    }
    function renderText(value) {
        return String(value || '').split('\n').filter(Boolean).map(function (line) { return '<p>' + escapeHtml(line) + '</p>'; }).join('');
    }
    function renderCards(section) {
        var sequenceIndex = 0;
        var cards = (section.cards || section.features || []).filter(function (card) { return card && (card.title || card.desc || card.icon); });
        if (!cards.length) return '';
        return '<div class="solution-card-flow">' + cards.map(function (card) {
            var type = card.type || (section.title.indexOf('流程') > -1 ? 'sequence' : (section.title.indexOf('案例') > -1 ? 'integrated' : 'icon'));
            if (type === 'sequence') {
                sequenceIndex += 1;
                return '<div class="process-card"><div class="process-index">' + String(sequenceIndex).padStart(2, '0') + '</div><div class="process-title">' + escapeHtml(card.title) + '</div><p class="process-desc">' + escapeHtml(card.desc) + '</p></div>';
            }
            if (type === 'integrated') return '<div class="case-card"><div class="case-title">' + escapeHtml(card.title) + '</div><p class="case-content">' + escapeHtml(card.desc) + '</p></div>';
            var image = card.icon ? '<img src="' + escapeHtml(safeImage(card.icon)) + '" alt="">' : icon('check');
            return '<div class="advantage-card"><div class="advantage-icon">' + image + '</div><div><div class="advantage-title">' + escapeHtml(card.title) + '</div><p class="advantage-desc">' + escapeHtml(card.desc) + '</p></div></div>';
        }).join('') + '</div>';
    }
    function renderSections(sections) {
        return (sections || []).map(function (section, index) {
            return '<section class="content-section"><div class="section-header"><span class="section-number">' + (index + 1) + '</span><h2 class="section-title">' + escapeHtml(section.title) + '</h2></div>'
                + (section.content ? '<div class="rich-copy">' + renderText(section.content) + '</div>' : '') + renderCards(section) + '</section>';
        }).join('');
    }
    function renderDetail(item) {
        activeRecord = item;
        var pricing = item.pricing || {};
        content.innerHTML = (previewToken ? '<div class="solution-preview-bar"><span>行业解决方案预览</span><button type="button" class="outline-button" data-close-preview>' + icon('close') + '关闭预览</button></div>' : '')
            + '<section class="service-panel active"><article class="service-article"><div class="service-hero"><div class="service-hero-main"><div class="service-hero-content">'
            + '<div class="service-kicker">' + icon('check') + escapeHtml(item.badge || item.portalCategory) + '</div>'
            + '<h1 class="service-title">' + escapeHtml(item.heroTitle || item.tabTitle || '未命名方案') + '</h1><p class="service-desc">' + escapeHtml(item.heroSubtitle || item.tabDesc) + '</p></div></div>'
            + '<aside class="service-action-card"><div class="action-price-row"><div><div class="price-label">参考价</div><div class="price-value">' + escapeHtml(getPrice(item)) + '</div></div>'
            + (previewToken ? '' : '<button type="button" class="detail-favorite-btn" data-detail-favorite data-favorite-scope="solution" data-favorite-item="' + escapeHtml(item.id) + '" aria-pressed="false" aria-label="收藏此内容">' + icon('favorite') + '<span data-favorite-label>收藏</span></button>')
            + '</div><div class="action-facts"><div class="action-fact"><span>付费模式</span><span>' + escapeHtml(pricing.payMode || '预付费') + '</span></div>'
            + '<div class="action-fact"><span>计量方式</span><span>' + escapeHtml((pricing.measures || ['面议']).join(' / ')) + '</span></div>'
            + '<div class="action-fact"><span>交付方式</span><span>' + escapeHtml(item.delivery || '线下交付') + '</span></div></div>'
            + '<div class="action-buttons"><button class="action-button" type="button" data-buy>' + icon('cart') + '立即购买</button><button class="outline-button" type="button" data-consult>' + icon('chat') + '方案咨询</button></div></aside></div>'
            + '<div class="service-body">' + (item.lead ? '<p class="article-lead">' + escapeHtml(item.lead) + '</p>' : '') + renderSections(item.sections) + '</div></article></section>';
        content.querySelector('.service-hero-main').style.backgroundImage = 'linear-gradient(180deg, rgba(15,31,26,.08) 0%, rgba(15,31,26,.86) 100%), url(' + JSON.stringify(safeImage(item.heroImg || item.cover)) + ')';
        document.title = (item.tabTitle || item.name || '未命名方案') + (previewToken ? ' - 行业解决方案预览' : ' - 行业解决方案');
        if (!previewToken && window.DetailFavorite) window.DetailFavorite.init(content);
    }
    function renderTree() {
        tree.innerHTML = '<div class="service-tree">' + groups.map(function (group) {
            var children = records.filter(function (item) { return item.portalCategory === group.title; });
            if (!children.length) return '';
            var open = !!expanded[group.id];
            return '<section class="service-category' + (open ? '' : ' collapsed') + '"><button class="category-toggle" type="button" data-category="' + group.id + '" aria-expanded="' + open + '" aria-controls="group-' + group.id + '">'
                + '<span class="category-main"><span class="category-title" title="' + escapeHtml(group.title) + '">' + escapeHtml(group.title) + '</span><span class="category-meta">' + children.length + '项方案 · ' + escapeHtml(group.badge) + '</span></span><span class="category-arrow">' + icon('arrow') + '</span></button>'
                + '<div class="category-services" id="group-' + group.id + '">' + children.map(function (item) {
                    return '<button class="service-card' + (item.id === activeId ? ' active' : '') + '" type="button" data-solution-id="' + item.id + '" aria-pressed="' + (item.id === activeId) + '" title="' + escapeHtml(item.tabTitle + '：' + item.tabDesc) + '"><span class="service-card-icon" aria-hidden="true"><img src="' + escapeHtml(safeImage(item.thumb)) + '" alt=""></span><span class="service-card-content"><span class="service-card-title">' + escapeHtml(item.tabTitle) + '</span><span class="service-card-desc">' + escapeHtml(item.tabDesc) + '</span></span></button>';
                }).join('') + '</div></section>';
        }).join('') + '</div>';
    }
    function emptyContent(message) {
        activeRecord = null;
        document.title = '行业解决方案 - 龙岗数据聚合服务平台';
        content.innerHTML = '<div class="service-article solution-empty"><p>' + escapeHtml(message) + '</p></div>';
    }
    function updateUrl(item, replace) {
        var url = new URL(window.location.href);
        url.search = '';
        url.searchParams.set('id', item.id);
        try { window.history[replace ? 'replaceState' : 'pushState']({}, '', url.href); } catch (error) { /* file:// 环境保留当前页选择。 */ }
    }
    function selectItem(item, historyMode) {
        activeId = item.id;
        var group = groups.find(function (entry) { return entry.title === item.portalCategory; });
        if (group) expanded[group.id] = true;
        renderTree();
        renderDetail(item);
        if (historyMode) updateUrl(item, historyMode === 'replace');
    }
    function selectFromLocation() {
        var query = new URLSearchParams(window.location.search);
        var requestedId = query.get('id') || aliases[query.get('title')];
        var item = records.find(function (entry) { return entry.id === requestedId || entry.name === query.get('title'); });
        if (!item && (query.has('id') || query.has('title'))) {
            activeId = '';
            renderTree();
            emptyContent('未找到对应方案，请从目录选择当前已上架的行业解决方案。');
            return;
        }
        if (item || records[0]) selectItem(item || records[0]);
        else emptyContent('暂无已上架的行业解决方案。');
    }
    tree.addEventListener('click', function (event) {
        var toggle = event.target.closest('[data-category]');
        if (toggle) {
            expanded[toggle.dataset.category] = !expanded[toggle.dataset.category];
            renderTree();
            tree.querySelector('[data-category="' + toggle.dataset.category + '"]').focus();
            return;
        }
        var button = event.target.closest('[data-solution-id]');
        if (!button) return;
        var item = records.find(function (entry) { return entry.id === button.dataset.solutionId; });
        if (item) { selectItem(item, 'push'); tree.querySelector('[data-solution-id="' + item.id + '"]').focus(); }
    });
    function closeConsult() {
        overlay.classList.remove('active');
        if (returnFocus) returnFocus.focus();
    }
    content.addEventListener('click', function (event) {
        if (event.target.closest('[data-close-preview]')) { window.close(); return; }
        var buy = event.target.closest('[data-buy]');
        var consult = event.target.closest('[data-consult]');
        if (!buy && !consult) return;
        if (previewToken) { window.GlobalDialog.info({ title: '当前为方案预览', desc: '此处用于查看展示效果，购买和咨询请从已上架的门户方案进入。' }); return; }
        if (!activeRecord) return;
        if (buy) {
            var price = getPrice(activeRecord);
            var query = new URLSearchParams({ id: activeRecord.id, title: activeRecord.tabTitle, price: price });
            window.location.href = (price === '面议' ? 'solution-buy-negotiate.html' : 'solution-buy.html') + '?' + query.toString();
            return;
        }
        returnFocus = consult;
        document.getElementById('consultTarget').textContent = activeRecord.tabTitle;
        overlay.classList.add('active');
        document.getElementById('txtConsult').focus();
    });
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', '方案咨询');
    document.getElementById('consultClose').addEventListener('click', closeConsult);
    document.getElementById('consultCancel').addEventListener('click', closeConsult);
    overlay.addEventListener('click', function (event) { if (event.target === overlay) closeConsult(); });
    overlay.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeConsult();
        if (event.key !== 'Tab') return;
        var controls = overlay.querySelectorAll('button, input, textarea');
        var first = controls[0]; var last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    document.getElementById('txtConsult').addEventListener('input', function () { document.getElementById('consultCount').textContent = this.value.length; });
    document.getElementById('consultForm').addEventListener('submit', function (event) {
        event.preventDefault();
        var input = document.getElementById('txtConsult');
        if (!input.value.trim()) { input.setCustomValidity('请输入咨询内容'); input.reportValidity(); input.setCustomValidity(''); return; }
        closeConsult();
        input.value = '';
        document.getElementById('consultCount').textContent = '0';
        window.GlobalDialog.success({ title: '咨询提交成功', desc: '行业解决方案咨询已提交，服务人员将与您联系。', duration: 1600 });
    });
    window.addEventListener('popstate', function () { if (!previewToken) selectFromLocation(); });
    if (previewToken) {
        document.body.classList.add('solution-preview');
        try {
            var data = JSON.parse(localStorage.getItem('industry-solution-preview:' + previewToken));
            if (!data || data.category !== '行业解决方案' || !Array.isArray(data.sections)) throw new Error('Invalid preview');
            renderDetail(data);
        } catch (error) { emptyContent('预览内容不可用，请返回供方编辑页面重新点击预览。'); }
    } else selectFromLocation();
})();
