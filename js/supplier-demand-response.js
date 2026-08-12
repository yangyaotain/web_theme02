(function () {
    'use strict';

    var params = new URLSearchParams(window.location.search || '');
    if (params.get('menu') !== 'demand-response') return;

    var panel = document.querySelector('[data-consult-panel]');
    var titleEl = document.querySelector('[data-center-title]');
    if (!panel || panel.dataset.role !== 'supplier') return;

    var SUPPLIER = {
        company: '深圳市龙岗数智科技有限公司',
        contact: '李明',
        phone: '13800002651',
        email: 'liming@example.com'
    };

    function icon(name) {
        return '<span class="dmd-material-icon" aria-hidden="true">' + name + '</span>';
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>'"]/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char];
        });
    }

    function makeRecord(config) {
        var company = config.demanderCompany;
        return {
            id: config.id,
            title: config.title,
            demanderCompany: company,
            type: config.type,
            scenes: config.scenes,
            priority: config.priority,
            matchStatus: config.matchStatus,
            summaryStatus: config.summaryStatus || config.matchStatus,
            responseAt: config.responseAt,
            createdAt: config.createdAt,
            deadline: config.deadline,
            budget: config.budget || '面议',
            keywords: config.keywords || [],
            description: config.description,
            image: config.image || '',
            supplement: config.supplement || '--',
            dataForm: config.dataForm || '结构化',
            personalInfo: config.personalInfo || '否',
            delivery: config.delivery || '文件传输',
            dataStart: config.dataStart || '2026-08-01',
            dataEnd: config.dataEnd || '2026-12-31',
            updateCycle: config.updateCycle || '每日',
            dataItems: config.dataItems || '时间、区域、业务分类、统计指标、状态标识',
            other: config.other || '--',
            demander: {
                company: company,
                contact: config.demanderContact,
                phone: config.demanderPhone,
                email: config.demanderEmail,
                address: config.demanderAddress
            },
            subject: {
                type: config.subjectType || '企业法人',
                creditCode: config.creditCode,
                businessScope: config.businessScope,
                validPeriod: config.validPeriod || '2022-06-18～长期',
                registeredAddress: config.registeredAddress || config.demanderAddress
            },
            response: {
                company: SUPPLIER.company,
                createdAt: config.responseAt,
                price: config.responsePrice || '面议',
                description: config.responseDescription,
                contact: config.responseContact || SUPPLIER.contact,
                phone: config.responsePhone || SUPPLIER.phone,
                email: config.responseEmail || SUPPLIER.email,
                material: config.material || ''
            }
        };
    }

    var records = [
        makeRecord({
            id: 'DEMAND-DM202608100001',
            title: '龙岗区产业园区综合能耗监测数据需求',
            demanderCompany: '深圳市龙岗区产业园区运营服务有限公司',
            type: '数据需求',
            scenes: ['工业制造', '生态环境'],
            priority: '较高',
            matchStatus: '匹配成功',
            responseAt: '2026-08-10 17:18:06',
            createdAt: '2026-08-10 09:26:14',
            deadline: '2026-08-25',
            keywords: ['园区能耗', '负荷监测', '节能分析'],
            description: '汇集园区用电、用水和重点设备能耗数据，用于开展分时负荷分析、异常识别和节能评估。',
            image: 'images/economic-monitor.jpg',
            delivery: 'API传输',
            updateCycle: '实时',
            dataItems: '园区编码、采集时间、能源类型、用量、峰谷标识、设备状态',
            demanderContact: '周敏',
            demanderPhone: '13800001236',
            demanderEmail: 'zhoumin@example.com',
            demanderAddress: '广东省深圳市龙岗区龙城街道产业园路18号',
            creditCode: '91440300MA5H8Y7D2K',
            businessScope: '产业园区运营管理、企业服务、节能管理及数字化平台建设。',
            responsePrice: '面议',
            responseDescription: '可提供园区能耗数据接入、指标标准化、异常识别及持续运营分析服务。',
            material: '园区能耗数据服务能力介绍.doc'
        }),
        makeRecord({
            id: 'DEMAND-DM202608080002',
            title: '坂田街道公共停车泊位动态数据需求',
            demanderCompany: '深圳市龙岗智慧交通科技有限公司',
            type: '数据需求',
            scenes: ['交通运输', '公共服务'],
            priority: '紧急',
            matchStatus: '匹配成功',
            responseAt: '2026-08-08 15:03:44',
            createdAt: '2026-08-08 14:16:32',
            deadline: '2026-08-24',
            budget: '定价',
            keywords: ['停车泊位', '实时余位', '停车诱导'],
            description: '获取公共停车场基础信息、实时余位和进出场趋势，用于停车诱导和高峰期调度分析。',
            image: 'images/demand-transit.jpg',
            delivery: 'API传输',
            updateCycle: '实时',
            dataItems: '停车场编码、泊位总数、实时余位、入场量、出场量、采集时间',
            demanderContact: '陈洁',
            demanderPhone: '13800006172',
            demanderEmail: 'chenjie@example.com',
            demanderAddress: '广东省深圳市龙岗区坂田街道环城南路5号',
            creditCode: '91440300MA5G3T6R8M',
            businessScope: '智慧交通平台建设、交通数据分析、停车运营管理及技术服务。',
            responsePrice: '¥ 18,000',
            responseDescription: '支持停车场基础数据和余位数据实时接入，并提供接口文档、联调及运行监测。',
            responseContact: '陈宇',
            responsePhone: '13800006173',
            responseEmail: 'chenyu@example.com',
            material: '智慧停车数据接口服务说明.doc'
        }),
        makeRecord({
            id: 'DEMAND-DM202608070003',
            title: '跨境电商企业经营活跃度分析需求',
            demanderCompany: '深圳市龙岗区产业投资服务集团有限公司',
            type: '应用需求',
            scenes: ['商贸流通', '智慧金融'],
            priority: '较高',
            matchStatus: '匹配成功',
            responseAt: '2026-08-07 11:09:26',
            createdAt: '2026-08-07 10:28:45',
            deadline: '2026-09-05',
            budget: '¥ 35,000',
            keywords: ['跨境电商', '企业画像', '经营活跃度'],
            description: '构建企业经营活跃度分析模型，支持按街道、行业和企业规模查看经营变化趋势。',
            image: 'images/demand-finance.jpg',
            dataForm: '半结构化',
            delivery: '数据流传输',
            updateCycle: '每月',
            dataItems: '企业编码、行业分类、经营状态、用工变化、业务活跃指数、统计月份',
            demanderContact: '王宁',
            demanderPhone: '13800007983',
            demanderEmail: 'wangning@example.com',
            demanderAddress: '广东省深圳市龙岗区平湖街道华南大道12号',
            creditCode: '91440300MA5F6P2N9A',
            businessScope: '产业投资、企业培育、招商服务、产业研究和园区运营。',
            responsePrice: '¥ 32,000',
            responseDescription: '基于多源企业数据构建活跃度指标体系，交付分析模型、可视化看板和专题报告。',
            responseContact: '王宁',
            responsePhone: '13800007984',
            responseEmail: 'project@example.com',
            material: '企业经营活跃度分析能力介绍.doc'
        }),
        makeRecord({
            id: 'DEMAND-DM202607280004',
            title: '制造企业数据资产盘点与治理咨询需求',
            demanderCompany: '深圳市龙岗先进制造业协会',
            type: '服务需求',
            scenes: ['工业制造', '企业服务'],
            priority: '普通',
            matchStatus: '匹配失败',
            summaryStatus: '已截止',
            responseAt: '2026-07-28 13:20:08',
            createdAt: '2026-07-28 09:35:12',
            deadline: '2026-08-08',
            budget: '¥ 50,000',
            keywords: ['数据资产', '数据治理', '标准体系'],
            description: '面向制造企业开展数据目录梳理、数据标准评估和治理路线规划。',
            image: 'images/demand-asset.jpg',
            delivery: '文件传输',
            updateCycle: '一次性',
            dataItems: '业务系统清单、数据目录、标准差异、质量问题、治理任务',
            demanderContact: '赵倩',
            demanderPhone: '13800003489',
            demanderEmail: 'zhaoqian@example.com',
            demanderAddress: '广东省深圳市龙岗区宝龙街道科技园二路9号',
            subjectType: '社会团体法人',
            creditCode: '51440300MJL18627XQ',
            businessScope: '开展制造业企业交流、产业研究、技术推广及公共服务。',
            validPeriod: '2021-09-08～2029-09-07',
            responsePrice: '¥ 45,000',
            responseDescription: '拟提供数据资产盘点、标准差异分析和治理路线规划咨询服务。'
        }),
        makeRecord({
            id: 'DEMAND-DM202608060005',
            title: '校园周边交通安全态势分析需求',
            demanderCompany: '深圳市龙岗区教育发展服务中心',
            type: '应用需求',
            scenes: ['教育文化', '交通运输'],
            priority: '紧急',
            matchStatus: '匹配中',
            responseAt: '2026-08-06 16:42:19',
            createdAt: '2026-08-06 15:12:54',
            deadline: '2026-08-28',
            budget: '面议',
            keywords: ['校园安全', '交通态势', '高峰研判'],
            description: '分析上下学时段校园周边车流、人流和重点路口拥堵情况，为交通组织优化提供参考。',
            image: 'images/demand-education.jpg',
            delivery: '文件传输',
            updateCycle: '每日',
            dataItems: '学校编码、道路名称、时段、车流量、人流量、拥堵指数、风险等级',
            demanderContact: '林悦',
            demanderPhone: '13800009628',
            demanderEmail: 'linyue@example.com',
            demanderAddress: '广东省深圳市龙岗区龙城街道清林中路213号',
            subjectType: '事业单位法人',
            creditCode: '12440307MB2D68142E',
            businessScope: '承担教育公共服务、教育发展研究及相关技术支持工作。',
            validPeriod: '2024-01-01～2028-12-31',
            responsePrice: '¥ 28,000',
            responseDescription: '可融合道路运行和校园周边事件数据，形成分时段交通风险分析与专题报告。',
            responseContact: '林悦',
            responsePhone: '13800009629',
            responseEmail: 'linyue.project@example.com',
            material: '校园交通安全分析服务方案.doc'
        }),
        makeRecord({
            id: 'DEMAND-DM202608050006',
            title: '龙岗河道水质巡检数据融合需求',
            demanderCompany: '深圳市龙岗区生态治理服务有限公司',
            type: '数据需求',
            scenes: ['生态环境', '地理遥感'],
            priority: '较高',
            matchStatus: '匹配中',
            responseAt: '2026-08-05 14:32:11',
            createdAt: '2026-08-05 11:47:29',
            deadline: '2026-08-31',
            keywords: ['河道水质', '巡检', '遥感影像'],
            description: '融合水质监测、巡检记录和遥感影像信息，支撑河道异常点位发现与变化分析。',
            image: 'images/water-analytics.jpg',
            delivery: 'API传输',
            updateCycle: '每日',
            dataItems: '河道编码、监测点位、采样时间、水质指标、巡检事件、影像索引',
            demanderContact: '刘畅',
            demanderPhone: '13800008546',
            demanderEmail: 'liuchang@example.com',
            demanderAddress: '广东省深圳市龙岗区园山街道生态路26号',
            creditCode: '91440300MA5K7Q4C6T',
            businessScope: '生态环境监测、河道治理、环境数据服务及技术咨询。',
            responsePrice: '面议',
            responseDescription: '可提供水质监测、巡检事件和遥感影像的关联治理与标准接口服务。'
        })
    ];

    var state = {
        view: params.get('view') === 'detail' ? 'detail' : 'list',
        activeId: params.get('id') || records[0].id,
        detailTab: params.get('tab') === 'responses' ? 'responses' : 'info',
        keywordDraft: '',
        keyword: '',
        status: '',
        priority: '',
        startDate: '',
        endDate: '',
        page: 1,
        pageSize: 10,
        filterOpen: true
    };
    var contactLayer = null;
    var contactReturnFocus = null;

    function getRecord(id) {
        return records.find(function (record) { return record.id === id; }) || records[0];
    }

    function priorityClass(priority) {
        if (priority === '紧急') return 'urgent';
        if (priority === '较高') return 'high';
        return 'normal';
    }

    function statusClass(status) {
        if (status === '匹配成功') return 'matched';
        if (status === '匹配失败') return 'failed';
        if (status === '匹配中') return 'matching';
        return 'closed';
    }

    function renderPriority(priority) {
        return '<span class="dmd-priority ' + priorityClass(priority) + '">' + escapeHtml(priority) + '</span>';
    }

    function renderStatus(status) {
        return '<span class="dmd-status sdr-status ' + statusClass(status) + '">' + escapeHtml(status) + '</span>';
    }

    function setTitle(text, visible) {
        if (!titleEl) return;
        titleEl.textContent = text;
        titleEl.style.display = visible === false ? 'none' : '';
    }

    function syncRoute(view, id, tab, replace) {
        var url = new URL(window.location.href);
        url.searchParams.set('menu', 'demand-response');
        if (view === 'detail') url.searchParams.set('view', 'detail');
        else url.searchParams.delete('view');
        if (view === 'detail' && id) url.searchParams.set('id', id);
        else url.searchParams.delete('id');
        if (view === 'detail' && tab === 'responses') url.searchParams.set('tab', 'responses');
        else url.searchParams.delete('tab');
        var next = url.pathname + url.search + url.hash;
        if (replace) window.history.replaceState({}, '', next);
        else window.history.pushState({}, '', next);
    }

    function navigate(view, id, tab, replace) {
        state.view = view;
        state.activeId = id || state.activeId;
        state.detailTab = tab || 'info';
        syncRoute(view, state.activeId, state.detailTab, replace);
        render();
    }

    function getFilteredRecords() {
        var keyword = state.keyword.trim().toLowerCase();
        return records.filter(function (record) {
            var responseDate = record.responseAt.slice(0, 10);
            if (keyword && record.title.toLowerCase().indexOf(keyword) < 0) return false;
            if (state.status && record.matchStatus !== state.status) return false;
            if (state.priority && record.priority !== state.priority) return false;
            if (state.startDate && responseDate < state.startDate) return false;
            if (state.endDate && responseDate > state.endDate) return false;
            return true;
        });
    }

    function renderFilterPanel() {
        if (!state.filterOpen) return '';
        return ''
            + '<div class="sdr-filter-panel" aria-label="需求响应筛选条件">'
            +   '<label class="sdr-filter-field"><span>需求状态</span><select data-response-filter="status">'
            +       '<option value="">请选择</option>'
            +       '<option value="匹配成功"' + (state.status === '匹配成功' ? ' selected' : '') + '>匹配成功</option>'
            +       '<option value="匹配失败"' + (state.status === '匹配失败' ? ' selected' : '') + '>匹配失败</option>'
            +       '<option value="匹配中"' + (state.status === '匹配中' ? ' selected' : '') + '>匹配中</option>'
            +   '</select>' + icon('expand_more') + '</label>'
            +   '<label class="sdr-filter-field"><span>需求优先级</span><select data-response-filter="priority">'
            +       '<option value="">请选择</option>'
            +       '<option value="紧急"' + (state.priority === '紧急' ? ' selected' : '') + '>紧急</option>'
            +       '<option value="较高"' + (state.priority === '较高' ? ' selected' : '') + '>较高</option>'
            +       '<option value="普通"' + (state.priority === '普通' ? ' selected' : '') + '>普通</option>'
            +   '</select>' + icon('expand_more') + '</label>'
            +   '<div class="sdr-date-filter"><span class="sdr-date-label">响应时间</span><input type="date" value="' + escapeHtml(state.startDate) + '" aria-label="响应开始日期" data-response-filter="startDate"><span class="sdr-date-separator">-</span><input type="date" value="' + escapeHtml(state.endDate) + '" aria-label="响应结束日期" data-response-filter="endDate">' + icon('calendar_month') + '</div>'
            +   '<button class="sdr-reset-button" type="button" data-response-reset>' + icon('restart_alt') + '<span>重置</span></button>'
            + '</div>';
    }

    function renderList() {
        setTitle('我的响应', true);
        var filtered = getFilteredRecords();
        var totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
        if (state.page > totalPages) state.page = totalPages;
        var start = (state.page - 1) * state.pageSize;
        var pageRecords = filtered.slice(start, start + state.pageSize);
        var rows = pageRecords.map(function (record) {
            var contactAction = record.matchStatus === '匹配失败' ? '' : '<button class="dmd-action-link" type="button" data-response-contact="' + escapeHtml(record.id) + '">' + icon('contact_phone') + '<span>联系需求方</span></button>';
            return ''
                + '<tr>'
                +   '<td><span class="dmd-ellipsis" title="' + escapeHtml(record.title) + '">' + escapeHtml(record.title) + '</span></td>'
                +   '<td><span class="dmd-ellipsis" title="' + escapeHtml(record.id) + '">' + escapeHtml(record.id) + '</span></td>'
                +   '<td><span class="dmd-ellipsis" title="' + escapeHtml(record.demanderCompany) + '">' + escapeHtml(record.demanderCompany) + '</span></td>'
                +   '<td>' + escapeHtml(record.type) + '</td>'
                +   '<td><span class="dmd-ellipsis" title="' + escapeHtml(record.scenes.join('、')) + '">' + escapeHtml(record.scenes.join('、')) + '</span></td>'
                +   '<td class="is-center">' + renderPriority(record.priority) + '</td>'
                +   '<td>' + renderStatus(record.matchStatus) + '</td>'
                +   '<td>' + escapeHtml(record.responseAt) + '</td>'
                +   '<td class="is-action"><div class="sdr-action-group">' + contactAction + '<button class="dmd-action-link" type="button" data-response-detail="' + escapeHtml(record.id) + '">' + icon('visibility') + '<span>查看详情</span></button></div></td>'
                + '</tr>';
        }).join('');
        if (!rows) rows = '<tr><td colspan="9"><div class="dmd-empty-state">' + icon('search_off') + '<span>未找到匹配的响应记录</span></div></td></tr>';

        var pageButtons = '';
        for (var page = 1; page <= totalPages; page += 1) {
            pageButtons += '<button class="' + (page === state.page ? 'active' : '') + '" type="button" data-response-page="' + page + '">' + page + '</button>';
        }

        return ''
            + '<section class="dmd-list-view sdr-list-view" aria-label="我的响应列表">'
            +   '<div class="dmd-toolbar sdr-toolbar">'
            +       '<div class="dmd-search sdr-search"><input type="search" value="' + escapeHtml(state.keywordDraft) + '" placeholder="请输入需求标题" aria-label="按需求标题搜索" data-response-search><button class="sdr-search-button" type="button" aria-label="查询" data-response-search-submit>' + icon('search') + '<span class="sdr-visually-hidden">查询</span></button></div>'
            +       '<button class="dmd-filter-button sdr-filter-toggle' + (state.filterOpen ? ' active' : '') + '" type="button" aria-expanded="' + state.filterOpen + '" data-response-filter-toggle>' + icon('filter_alt') + '<span class="sdr-visually-hidden">筛选</span></button>'
            +   '</div>'
            +   renderFilterPanel()
            +   '<div class="dmd-table-card sdr-table-card"><table class="dmd-table sdr-table">'
            +       '<colgroup><col style="width:180px"><col style="width:190px"><col style="width:225px"><col style="width:115px"><col style="width:185px"><col style="width:112px"><col style="width:130px"><col style="width:175px"><col style="width:230px"></colgroup>'
            +       '<thead><tr><th>需求标题</th><th>需求编号</th><th>需求提出方</th><th>需求类型</th><th>需求场景</th><th class="is-center">需求优先级</th><th>需求状态</th><th>响应时间</th><th class="is-action">操作</th></tr></thead>'
            +       '<tbody>' + rows + '</tbody></table></div>'
            +   '<div class="dmd-pagination" aria-label="分页">'
            +       '<span>共 ' + filtered.length + ' 条</span>'
            +       '<button type="button" aria-label="上一页" data-response-page="' + Math.max(1, state.page - 1) + '" ' + (state.page === 1 ? 'disabled' : '') + '>' + icon('chevron_left') + '</button>'
            +       pageButtons
            +       '<button type="button" aria-label="下一页" data-response-page="' + Math.min(totalPages, state.page + 1) + '" ' + (state.page === totalPages ? 'disabled' : '') + '>' + icon('chevron_right') + '</button>'
            +       '<select class="dmd-page-size" aria-label="每页条数" data-response-page-size><option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10 条/页</option><option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20 条/页</option><option value="50"' + (state.pageSize === 50 ? ' selected' : '') + '>50 条/页</option></select>'
            +       '<span>前往</span><input class="dmd-jump-input" type="number" min="1" max="' + totalPages + '" aria-label="跳转页码" data-response-jump>'
            +   '</div>'
            + '</section>';
    }

    function infoItem(label, value, full) {
        return '<div class="dmd-info-item' + (full ? ' full' : '') + '"><span class="dmd-info-label">' + label + '：</span><span class="dmd-info-value">' + (value || '--') + '</span></div>';
    }

    function renderSummary(record) {
        var tags = [record.type].concat(record.scenes).map(function (tag) {
            return '<span class="dmd-tag">' + escapeHtml(tag) + '</span>';
        }).join('');
        return '<section class="dmd-summary-card">'
            + '<div class="dmd-summary-title-row">' + renderPriority(record.priority) + '<strong class="dmd-summary-title">' + escapeHtml(record.title) + '</strong>' + renderStatus(record.summaryStatus) + '</div>'
            + '<div class="dmd-summary-tags">' + tags + '</div>'
            + '<div class="dmd-summary-stats">'
            +   '<div class="dmd-summary-stat"><span>需求预算</span><strong class="price">' + escapeHtml(record.budget) + '</strong></div>'
            +   '<div class="dmd-summary-stat"><span>截止时间</span><strong>' + escapeHtml(record.deadline) + '</strong></div>'
            +   '<div class="dmd-summary-stat"><span>发布时间</span><strong>' + escapeHtml(record.createdAt.slice(0, 10)) + '</strong></div>'
            + '</div></section>';
    }

    function renderDemandInfo(record) {
        var keywords = record.keywords.length ? record.keywords.join('、') : '--';
        var image = record.image ? '<img class="dmd-detail-image" src="' + escapeHtml(record.image) + '" alt="' + escapeHtml(record.title) + '需求图片">' : '--';
        return ''
            + '<section class="dmd-detail-section"><h2>基本信息</h2><div class="dmd-info-card">'
            +   infoItem('需求标题', escapeHtml(record.title))
            +   infoItem('需求类型', escapeHtml(record.type))
            +   infoItem('需求场景', escapeHtml(record.scenes.join('、')))
            +   infoItem('需求优先级', escapeHtml(record.priority))
            +   infoItem('需求预算', escapeHtml(record.budget))
            +   infoItem('需求截止时间', escapeHtml(record.deadline))
            +   infoItem('需求图片', image, true)
            +   infoItem('补充材料', escapeHtml(record.supplement))
            +   infoItem('需求关键词', escapeHtml(keywords))
            +   infoItem('需求描述', escapeHtml(record.description), true)
            +   infoItem('数据组织形式', escapeHtml(record.dataForm))
            +   infoItem('是否涉及个人信息', escapeHtml(record.personalInfo))
            +   infoItem('数据交付方式', escapeHtml(record.delivery))
            +   infoItem('数据时间范围', escapeHtml(record.dataStart + '～' + record.dataEnd))
            +   infoItem('更新周期需求', escapeHtml(record.updateCycle))
            +   infoItem('数据信息项', escapeHtml(record.dataItems))
            +   infoItem('其他', escapeHtml(record.other), true)
            + '</div></section>'
            + '<section class="dmd-detail-section"><h2>需求方信息</h2><div class="dmd-info-card">'
            +   infoItem('需求方名称', escapeHtml(record.demander.company))
            +   infoItem('需求方联系人', escapeHtml(record.demander.contact))
            +   infoItem('需求方电话', escapeHtml(record.demander.phone))
            +   infoItem('需求方邮箱', escapeHtml(record.demander.email))
            +   infoItem('需求方地址', escapeHtml(record.demander.address), true)
            + '</div></section>'
            + '<section class="dmd-detail-section"><h2>主体信息</h2><div class="dmd-info-card">'
            +   infoItem('需求方主体类型', escapeHtml(record.subject.type))
            +   infoItem('统一社会信用代码', escapeHtml(record.subject.creditCode))
            +   infoItem('经营范围或业务范围', escapeHtml(record.subject.businessScope))
            +   infoItem('营业期限或有效期', escapeHtml(record.subject.validPeriod))
            +   infoItem('注册详细地址', escapeHtml(record.subject.registeredAddress), true)
            + '</div></section>';
    }

    function renderResponse(record) {
        var response = record.response;
        var decisionTag = record.matchStatus === '匹配成功'
            ? '<span class="dmd-match-tag is-matched">' + icon('check_circle') + '<span>匹配</span></span>'
            : (record.matchStatus === '匹配失败' ? '<span class="dmd-match-tag is-unmatched">' + icon('cancel') + '<span>不匹配</span></span>' : '');
        var material = response.material
            ? escapeHtml(response.material) + '<span class="dmd-preview-actions"><button class="dmd-preview-action" type="button" data-response-material-preview>' + icon('visibility') + '<span>预览</span></button><button class="dmd-preview-action" type="button" data-response-material-download>' + icon('download') + '<span>下载</span></button></span>'
            : '--';
        return '<article class="dmd-response-card sdr-response-card">'
            + '<div class="dmd-response-head"><div class="dmd-response-title"><strong>' + escapeHtml(response.company) + '</strong><time>' + escapeHtml(response.createdAt) + '</time>' + decisionTag + '</div><div class="dmd-response-price">' + escapeHtml(response.price) + '</div></div>'
            + '<div class="dmd-response-desc">' + escapeHtml(response.description) + '</div>'
            + '<div class="dmd-response-meta">'
            +   '<div><span>联系人姓名：</span>' + escapeHtml(response.contact) + '</div>'
            +   '<div><span>联系人电话：</span>' + escapeHtml(response.phone) + '</div>'
            +   '<div><span>联系人邮箱：</span>' + escapeHtml(response.email) + '</div>'
            +   '<div><span>能力介绍材料：</span>' + material + '</div>'
            + '</div></article>';
    }

    function renderDetail() {
        setTitle('需求详情', false);
        var record = getRecord(state.activeId);
        return ''
            + '<div class="dmd-page-backbar"><button class="dmd-page-back" type="button" data-response-back>' + icon('chevron_left') + '<span>需求详情</span></button></div>'
            + '<div class="dmd-detail-view">'
            +   renderSummary(record)
            +   '<div class="dmd-tabs" role="tablist" aria-label="需求详情标签页">'
            +       '<button class="dmd-tab' + (state.detailTab === 'info' ? ' active' : '') + '" type="button" role="tab" aria-selected="' + (state.detailTab === 'info') + '" data-response-tab="info">需求信息</button>'
            +       '<button class="dmd-tab' + (state.detailTab === 'responses' ? ' active' : '') + '" type="button" role="tab" aria-selected="' + (state.detailTab === 'responses') + '" data-response-tab="responses">响应情况</button>'
            +   '</div>'
            +   (state.detailTab === 'info' ? renderDemandInfo(record) : renderResponse(record))
            + '</div>';
    }

    function render() {
        panel.classList.remove('is-placeholder', 'is-service-management', 'is-order-management', 'is-supplier-order-management');
        panel.classList.add('is-demand-management', 'is-supplier-demand-response');
        panel.innerHTML = '<div class="demand-board supplier-demand-board">' + (state.view === 'detail' ? renderDetail() : renderList()) + '</div>';
        document.title = (state.view === 'detail' ? '需求详情' : '我的响应') + ' - 供方中心';
    }

    function showToast(message, error) {
        var old = document.querySelector('.dmd-toast');
        if (old) old.remove();
        var toast = document.createElement('div');
        toast.className = 'dmd-toast' + (error ? ' error' : '');
        toast.setAttribute('role', 'status');
        toast.innerHTML = icon(error ? 'error' : 'check_circle') + '<span>' + escapeHtml(message) + '</span>';
        document.body.appendChild(toast);
        window.setTimeout(function () { if (toast.parentNode) toast.remove(); }, 2200);
    }

    function copyText(value) {
        function copied() { showToast('已复制到剪贴板'); }
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(value).then(copied, function () { showToast('复制失败，请手动复制', true); });
            return;
        }
        var input = document.createElement('textarea');
        input.value = value;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        try {
            if (document.execCommand('copy')) copied();
            else showToast('复制失败，请手动复制', true);
        } catch (error) {
            showToast('复制失败，请手动复制', true);
        }
        input.remove();
    }

    function closeContact(restoreFocus) {
        if (!contactLayer) return;
        var layer = contactLayer;
        contactLayer = null;
        document.body.classList.remove('sdr-contact-open');
        layer.classList.remove('show');
        window.setTimeout(function () {
            if (layer.parentNode) layer.remove();
            if (restoreFocus && contactReturnFocus && contactReturnFocus.isConnected) contactReturnFocus.focus();
            contactReturnFocus = null;
        }, 160);
    }

    function openContact(record, returnFocus) {
        closeContact(false);
        contactReturnFocus = returnFocus || document.activeElement;
        contactLayer = document.createElement('div');
        contactLayer.className = 'sdr-contact-overlay';
        contactLayer.innerHTML = ''
            + '<section class="sdr-contact-dialog" role="dialog" aria-modal="true" aria-labelledby="sdrContactTitle">'
            +   '<header class="sdr-contact-header"><h2 id="sdrContactTitle">联系需求方</h2><button class="sdr-contact-close" type="button" aria-label="关闭" data-contact-close>' + icon('close') + '<span class="sdr-visually-hidden">关闭</span></button></header>'
            +   '<div class="sdr-contact-body">'
            +       '<div class="sdr-contact-profile"><div class="sdr-contact-avatar">' + icon('person') + '</div><strong>' + escapeHtml(record.demander.contact) + '</strong></div>'
            +       '<div class="sdr-contact-details">'
            +           '<div class="sdr-contact-row">' + icon('apartment') + '<span>' + escapeHtml(record.demander.company) + '</span></div>'
            +           '<div class="sdr-contact-row">' + icon('phone_iphone') + '<span>' + escapeHtml(record.demander.phone) + '</span><button type="button" aria-label="复制手机号码" data-contact-copy="' + escapeHtml(record.demander.phone) + '">' + icon('content_copy') + '<span class="sdr-visually-hidden">复制</span></button></div>'
            +           '<div class="sdr-contact-row">' + icon('mail') + '<span>' + escapeHtml(record.demander.email) + '</span><button type="button" aria-label="复制邮箱" data-contact-copy="' + escapeHtml(record.demander.email) + '">' + icon('content_copy') + '<span class="sdr-visually-hidden">复制</span></button></div>'
            +       '</div>'
            +   '</div>'
            + '</section>';
        document.body.appendChild(contactLayer);
        document.body.classList.add('sdr-contact-open');
        contactLayer.addEventListener('click', function (event) {
            if (event.target === contactLayer || event.target.closest('[data-contact-close]')) { closeContact(true); return; }
            var copyButton = event.target.closest('[data-contact-copy]');
            if (copyButton) copyText(copyButton.dataset.contactCopy);
        });
        window.requestAnimationFrame(function () {
            if (!contactLayer) return;
            contactLayer.classList.add('show');
            var closeButton = contactLayer.querySelector('[data-contact-close]');
            if (closeButton) closeButton.focus();
        });
    }

    function closeDocumentPreview() {
        var overlay = document.querySelector('[data-response-document-overlay]');
        if (overlay) overlay.remove();
    }

    function openDocumentPreview(record) {
        closeDocumentPreview();
        var overlay = document.createElement('div');
        overlay.className = 'dmd-document-overlay';
        overlay.setAttribute('data-response-document-overlay', '');
        overlay.innerHTML = ''
            + '<section class="dmd-document-dialog" role="dialog" aria-modal="true" aria-labelledby="sdrDocumentTitle">'
            +   '<header class="dmd-document-header"><button class="dmd-modal-close" type="button" aria-label="关闭预览" data-response-document-close>' + icon('close') + '<span class="sdr-visually-hidden">关闭</span></button><strong id="sdrDocumentTitle">' + escapeHtml(record.response.material) + '</strong></header>'
            +   '<div class="dmd-document-stage"><article class="dmd-document-page">'
            +       '<h1>' + escapeHtml(record.response.material.replace(/\.docx?$/i, '')) + '</h1>'
            +       '<p>本材料用于介绍' + escapeHtml(record.response.company) + '面向数据要素流通和数据应用场景的综合服务能力。</p>'
            +       '<h2>一、项目理解</h2><p>' + escapeHtml(record.response.description) + '</p>'
            +       '<h2>二、服务能力</h2>'
            +       '<table><thead><tr><th>能力方向</th><th>服务内容</th><th>交付成果</th></tr></thead><tbody>'
            +         '<tr><td>需求分析</td><td>梳理业务目标、数据范围、质量要求和交付边界。</td><td>需求确认清单</td></tr>'
            +         '<tr><td>数据治理</td><td>开展标准映射、质量检查、异常处理和安全合规核验。</td><td>治理报告与问题台账</td></tr>'
            +         '<tr><td>交付支持</td><td>按约定方式完成数据或服务交付，并提供联调与使用说明。</td><td>交付清单与使用文档</td></tr>'
            +       '</tbody></table>'
            +   '</article></div>'
            + '</section>';
        document.body.appendChild(overlay);
        var closeButton = overlay.querySelector('[data-response-document-close]');
        if (closeButton) closeButton.focus();
    }

    function downloadMaterial(record) {
        var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + escapeHtml(record.response.material) + '</title></head><body><h1>' + escapeHtml(record.response.material.replace(/\.docx?$/i, '')) + '</h1><p>' + escapeHtml(record.response.description) + '</p><h2>服务内容</h2><p>提供需求分析、数据治理、质量核验和交付支持服务。</p></body></html>';
        var blob = new Blob(['\ufeff' + html], { type: 'application/msword' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.download = record.response.material;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
        showToast('能力介绍材料已下载');
    }

    panel.addEventListener('click', function (event) {
        var detailButton = event.target.closest('[data-response-detail]');
        if (detailButton) { navigate('detail', detailButton.dataset.responseDetail, 'info'); return; }
        var contactButton = event.target.closest('[data-response-contact]');
        if (contactButton) { openContact(getRecord(contactButton.dataset.responseContact), contactButton); return; }
        if (event.target.closest('[data-response-back]')) { navigate('list'); return; }
        if (event.target.closest('[data-response-search-submit]')) {
            state.keyword = state.keywordDraft;
            state.page = 1;
            render();
            return;
        }
        if (event.target.closest('[data-response-filter-toggle]')) {
            state.filterOpen = !state.filterOpen;
            render();
            return;
        }
        if (event.target.closest('[data-response-reset]')) {
            state.keywordDraft = '';
            state.keyword = '';
            state.status = '';
            state.priority = '';
            state.startDate = '';
            state.endDate = '';
            state.page = 1;
            render();
            return;
        }
        var pageButton = event.target.closest('[data-response-page]');
        if (pageButton && !pageButton.disabled) { state.page = Number(pageButton.dataset.responsePage) || 1; render(); return; }
        var tabButton = event.target.closest('[data-response-tab]');
        if (tabButton) {
            state.detailTab = tabButton.dataset.responseTab;
            syncRoute('detail', state.activeId, state.detailTab, true);
            render();
            return;
        }
        var record = getRecord(state.activeId);
        if (event.target.closest('[data-response-material-preview]')) { openDocumentPreview(record); return; }
        if (event.target.closest('[data-response-material-download]')) downloadMaterial(record);
    });

    panel.addEventListener('input', function (event) {
        if (event.target.matches('[data-response-search]')) state.keywordDraft = event.target.value;
    });

    panel.addEventListener('change', function (event) {
        var filter = event.target.dataset.responseFilter;
        if (filter) {
            state[filter] = event.target.value;
            state.page = 1;
            render();
            return;
        }
        if (event.target.matches('[data-response-page-size]')) {
            state.pageSize = Number(event.target.value) || 10;
            state.page = 1;
            render();
            return;
        }
        if (event.target.matches('[data-response-jump]')) {
            var totalPages = Math.max(1, Math.ceil(getFilteredRecords().length / state.pageSize));
            state.page = Math.min(totalPages, Math.max(1, Number(event.target.value) || 1));
            render();
        }
    });

    panel.addEventListener('keydown', function (event) {
        if (event.target.matches('[data-response-search]') && event.key === 'Enter') {
            event.preventDefault();
            state.keyword = state.keywordDraft;
            state.page = 1;
            render();
        }
    });

    document.addEventListener('click', function (event) {
        var overlay = event.target.closest('[data-response-document-overlay]');
        if (overlay && (event.target === overlay || event.target.closest('[data-response-document-close]'))) closeDocumentPreview();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;
        if (contactLayer) closeContact(true);
        else if (document.querySelector('[data-response-document-overlay]')) closeDocumentPreview();
    });

    window.addEventListener('popstate', function () {
        var route = new URLSearchParams(window.location.search || '');
        state.view = route.get('view') === 'detail' ? 'detail' : 'list';
        state.activeId = route.get('id') || records[0].id;
        state.detailTab = route.get('tab') === 'responses' ? 'responses' : 'info';
        render();
    });

    render();
})();
