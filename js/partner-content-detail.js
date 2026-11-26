(function () {
    'use strict';
    const catalog = window.PartnerApplicationCatalog;
    const params = new URLSearchParams(window.location.search);
    if (params.has('partnerItem')) document.body.classList.add('partner-content-detail');
    const labels = { resources: '数据资源', products: '数据产品', services: '数据咨询服务', solutions: '行业解决方案' };
    const scenes = {
        shumei: ['内容与业务安全', '风险类型', 'risk_type', '内容风险', '识别风险分布、复核处理结果并调整业务规则'],
        volcano: ['人工智能应用', '业务场景', 'scenario', '知识问答', '组织业务知识、验证模型效果并优化智能应用'],
        'cec-cloud': ['可信数据协作', '协作主题', 'topic', '产业协同', '梳理资源目录、明确授权范围并核验协作结果']
    };

    function escape(value) {
        return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
    }

    function addReturn(root) {
        if ((!params.has('partner') && !Object.hasOwn(catalog.applications, params.get('app'))) || root.querySelector('.partner-return-link')) return;
        const link = document.createElement('a');
        link.className = 'partner-return-link';
        link.href = 'partner-application.html';
        link.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg><span>返回全部伙伴应用</span>';
        root.prepend(link);
    }

    function missing(root) {
        root.innerHTML = '<p class="partner-content-empty" role="status">未找到对应内容，请返回全部伙伴应用重新选择。</p>';
        addReturn(root);
    }

    function sections(record) {
        const scene = scenes[record.company];
        return [
            { title: '内容介绍', content: record.description, cards: [] },
            { title: '应用场景', content: '面向' + scene[0] + '相关业务，围绕“' + record.name + '”' + scene[4] + '。实施前确认业务目标、数据来源与使用范围，结合现有系统组织接入及验证。', cards: [] },
            { title: '实施流程', content: '', cards: [
                { type: 'sequence', title: '需求梳理', desc: '围绕' + record.name + '确认使用场景、业务对象和验收要求。' },
                { type: 'sequence', title: '方案配置', desc: '依据现有业务流程确定接入方式、数据口径与交付范围。' },
                { type: 'sequence', title: '验证交付', desc: '结合' + scene[3] + '等场景开展验证，记录问题并完成交付确认。' }
            ] },
            { title: '交付成果', content: record.name + '相关的配置说明、验证记录与使用指引，具体范围及周期在项目启动时确认。', cards: [] }
        ];
    }

    function dataRecord(record) {
        const scene = scenes[record.company];
        const api = record.type === 'API';
        return {
            name: record.name, description: record.description, type: record.type, resourceType: record.type,
            image: record.image, price: '一事一议', pricing: '按交付范围协商', pricingAmount: '一事一议',
            delivery: api ? 'API 传输' : '文件交付', measure: '一事一议', billing: '按协议约定',
            publishedAt: '2026-11-20', industry: '信息传输、软件和信息技术服务业', region: '全国',
            coverage: '以交付清单为准', frequency: record.frequency, updateFrequency: record.frequency,
            personalInfo: '否', authorizedUse: '按协议约定', dataSubject: record.type,
            dataScale: '按交付范围确认', relatedSource: scene[0] + '相关授权数据',
            notes: '交付范围、使用期限和用途以双方确认的协议为准。', usageLimit: '按授权范围使用',
            introduction: record.description, securityLevel: '按协议约定', storageLimit: '按协议约定',
            pricingUnit: api ? '次' : '套', measureUnit: api ? '次' : '套', postpaid: '按协议约定', deferredPayment: '按协议约定',
            developmentTerms: '按授权用途开发利用', circulationType: '授权使用', contact: '平台服务专员', contactPhone: '通过在线咨询联系',
            format: api ? 'JSON' : (record.type === '报告' ? 'PDF' : 'CSV / JSON'), source: '授权取得',
            fields: [['记录编号', 'record_id', '字符串型', '64'], [scene[1], scene[2], '字符串型', '100'], ['更新时间', 'updated_at', '日期时间型', '19']],
            featureIntroduction: { sections: sections(record) }
        };
    }

    function renderSample(record) {
        const scene = scenes[record.company];
        if (record.type === 'API') {
            return '<h3 class="api-doc-title">' + escape(record.name) + '</h3><p class="sample-table-note">请求及返回字段示例，正式调用信息在接入时确认。</p>' +
                '<div class="sample-api-info-card"><div class="sample-api-info-field"><span>请求方式</span><strong>POST</strong></div><div class="sample-api-info-field"><span>支持格式</span><strong>JSON</strong></div></div>' +
                '<h3 class="api-doc-title">请求示例</h3><pre>' + escape(JSON.stringify({ request_id: record.id + '-001', business_scene: scene[3], content: record.name + '输入样例' }, null, 2)) + '</pre>' +
                '<h3 class="api-doc-title">返回示例</h3><pre>' + escape(JSON.stringify({ code: 0, request_id: record.id + '-001', data: { status: 'completed', result: record.description } }, null, 2)) + '</pre>';
        }
        if (record.type === '报告' || record.type === '数据模型') {
            return '<h3 class="sample-table-title">' + escape(record.name) + '</h3><p class="sample-table-note">' + escape(record.description) + '</p>' +
                '<div class="sample-file-card"><div class="sample-file-info"><strong>内容范围</strong><span>' + escape(scene[0]) + '相关的业务背景、分析口径、结果说明与应用建议。</span></div></div>' +
                '<div class="sample-file-card"><div class="sample-file-info"><strong>交付说明</strong><span>具体指标、模型输入输出和交付文件以确认的交付清单为准。</span></div></div>';
        }
        return '<h3 class="sample-table-title">' + escape(record.name) + '样例</h3><div class="sample-table-scroll"><table class="sample-preview-table"><thead><tr><th>记录编号</th><th>' + scene[1] + '</th><th>更新时间</th></tr></thead><tbody>' +
            [1, 2, 3].map(index => '<tr><td>' + escape(record.id + '-00' + index) + '</td><td>' + scene[3] + '</td><td>2026-11-20 10:00:00</td></tr>').join('') + '</tbody></table></div>';
    }

    function solutionRecords(company) {
        return catalog.records.filter(record => record.company === company && record.kind === 'solutions').map(record => ({
            id: record.id, partnerContent: true, status: 'listed', category: '行业解决方案', portalCategory: '生态伙伴方案',
            name: record.name, tabTitle: record.name, tabDesc: record.description, description: record.description,
            thumb: record.image, heroImg: record.image, heroTitle: record.name, heroSubtitle: record.description,
            badge: scenes[company][0], delivery: '线上 / 线下', lead: '围绕' + record.name + '组织需求梳理、实施验证与交付确认。',
            pricing: { payMode: '按协议约定', measures: ['面议'], referencePrice: '一事一议' }, sections: sections(record)
        }));
    }

    function renderConsulting(record) {
        const text = (selector, value) => { const element = document.querySelector(selector); if (element) element.textContent = value; };
        text('.product-title', record.name);
        text('.g-breadcrumb .current', record.name);
        text('.product-desc', record.description);
        text('.product-price .amount', '一事一议');
        const metadata = document.querySelectorAll('.product-meta-row .val');
        if (metadata[0]) metadata[0].textContent = labels.services;
        if (metadata[1]) metadata[1].textContent = '2026-11-20';
        text('#consultForm .consult-static', record.name);
        document.querySelectorAll('.product-gallery img').forEach(image => { image.src = record.image; image.alt = record.name; });
        const body = document.querySelector('.content-main');
        body.innerHTML = '<h3 class="section-heading">基本信息</h3><table class="info-table">' +
            '<tr><td class="label-cell">服务名称：</td><td class="value-cell">' + escape(record.name) + '</td><td class="label-cell">服务类型：</td><td class="value-cell">数据咨询服务</td></tr>' +
            '<tr><td class="label-cell">服务方式：</td><td class="value-cell">线上 / 线下</td><td class="label-cell">交付周期：</td><td class="value-cell">按项目约定</td></tr>' +
            '<tr><td class="label-cell">服务介绍：</td><td class="desc-cell" colspan="3">' + escape(record.description) + '</td></tr></table>' +
            sections(record).map(section => '<h3 class="section-heading">' + escape(section.title) + '</h3><div class="rich-text">' +
                (section.content ? '<p>' + escape(section.content) + '</p>' : '') +
                section.cards.map(card => '<p><b>' + escape(card.title) + '</b></p><p>' + escape(card.desc) + '</p>').join('') + '</div>').join('');
    }

    window.PartnerContentDetail = { addReturn, missing, dataRecord, renderSample, solutionRecords };
    const record = catalog.get(params.get('partnerItem'));
    const page = window.location.pathname.split('/').pop();
    if (page === 'consulting-detail.html' && params.has('partnerItem')) {
        if (!record || record.kind !== 'services') {
            missing(document.querySelector('.detail-wrapper'));
            return;
        }
        renderConsulting(record);
        document.title = record.name + ' · 灵拓数据聚合服务平台';
    }
    if (record) document.querySelectorAll('[data-detail-favorite]').forEach(button => button.setAttribute('data-favorite-item', record.id));
    const breadcrumb = document.querySelector('.g-breadcrumb');
    if (breadcrumb && params.has('partnerItem')) addReturn(breadcrumb);
})();
