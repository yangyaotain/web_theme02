(function () {
    'use strict';

    var params = new URLSearchParams(window.location.search || '');
    if (params.get('menu') !== 'my-demand') return;

    var panel = document.querySelector('[data-consult-panel]');
    var titleEl = document.querySelector('[data-center-title]');
    if (!panel || panel.dataset.role !== 'buyer') return;

    var SCENE_OPTIONS = [
        '公共服务', '地理遥感', '智慧金融', '通信运营商', '医疗健康', '安全服务',
        '法律服务', '咨询服务', '气象服务', '交通运输', '工业制造', '教育文化',
        '生态环境', '商贸流通', '文旅体育', '企业服务'
    ];
    var TYPE_OPTIONS = ['数据需求', '服务需求', '应用需求'];
    var CYCLE_OPTIONS = ['实时', '每日', '每周', '每月', '每季度', '每年'];

    function icon(name) {
        return '<span class="dmd-material-icon" aria-hidden="true">' + name + '</span>';
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>'"]/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char];
        });
    }

    function formatDateTime(date) {
        function two(value) { return String(value).padStart(2, '0'); }
        return date.getFullYear() + '-' + two(date.getMonth() + 1) + '-' + two(date.getDate()) + ' '
            + two(date.getHours()) + ':' + two(date.getMinutes()) + ':' + two(date.getSeconds());
    }

    function dateKey(date) {
        return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    }

    function parseDateKey(value) {
        var parts = String(value || '').split('-').map(Number);
        if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) return null;
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    function monthStart(value) {
        var date = value instanceof Date ? value : parseDateKey(value);
        if (!date) date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    function addMonths(value, amount) {
        var date = monthStart(value);
        return new Date(date.getFullYear(), date.getMonth() + amount, 1);
    }

    function monthLabel(date) {
        return date.getFullYear() + ' - ' + String(date.getMonth() + 1).padStart(2, '0');
    }

    function monthStateKey(date) {
        return dateKey(monthStart(date));
    }

    function makeResponse(company, price, contact, phone, email, createdAt, decision) {
        return {
            company: company,
            price: price,
            contact: contact,
            phone: phone,
            email: email,
            createdAt: createdAt,
            decision: decision || 'pending',
            description: '可按需求范围提供数据梳理、质量核验、标准化加工和交付支持。',
            material: '企业数据服务能力介绍材料（原型示例）.doc'
        };
    }

    function makeRecord(config) {
        var record = {
            id: config.id,
            title: config.title,
            type: config.type,
            scenes: config.scenes,
            priority: config.priority,
            status: config.status,
            responseCount: config.responseCount,
            createdAt: config.createdAt,
            budget: config.budget || '面议',
            deadline: config.deadline,
            keywords: config.keywords || [],
            description: config.description,
            image: config.image,
            imageIcon: config.imageIcon || '',
            supplement: config.supplement || '--',
            dataForm: config.dataForm || '结构化',
            personalInfo: config.personalInfo || '否',
            delivery: config.delivery || '文件传输',
            dataStart: config.dataStart || '2026-07-01',
            dataEnd: config.dataEnd || '2026-12-31',
            updateCycle: config.updateCycle || '每日',
            dataItems: config.dataItems || '时间、区域、业务分类、统计指标、状态标识',
            other: config.other || '--',
            demander: {
                company: '深圳市龙岗区数智产业发展有限公司',
                contact: '周敏',
                phone: '13800001236',
                email: 'zhoumin@example.com',
                address: '广东省深圳市龙岗区龙城街道龙翔大道示例园区'
            },
            subject: {
                type: '企业法人',
                creditCode: '91440300MA5EXAMPLE1',
                businessScope: '数据技术服务、信息系统集成、数据治理咨询及数字化应用建设。',
                validPeriod: '2024-03-18～长期',
                registeredAddress: '广东省深圳市龙岗区龙城街道龙翔大道示例园区'
            },
            responses: config.responses || []
        };
        record.logs = [
            { role: '实名认证用户', action: '需求发布', result: '成功', content: '--', time: record.createdAt },
            { role: '平台运营角色', action: '需求审核', result: '同意', content: '--', time: record.createdAt },
            { role: '系统匹配', action: record.status === '匹配成功' ? '匹配' : '状态更新', result: '成功', content: '--', time: record.createdAt }
        ];
        return record;
    }

    var records = [
        makeRecord({
            id: 'DEMAND-DM202608090001',
            title: '龙岗区产业园区综合能耗监测数据需求',
            type: '数据需求',
            scenes: ['工业制造', '生态环境'],
            priority: '较高',
            status: '已截止',
            responseCount: 2,
            createdAt: '2026-08-09 16:42:18',
            deadline: '2026-08-09',
            keywords: ['园区能耗', '负荷监测', '节能分析'],
            description: '汇集园区用电、用水和重点设备能耗数据，用于开展分时负荷分析、异常识别和节能评估。',
            image: 'images/economic-monitor.jpg',
            dataItems: '园区编码、采集时间、能源类型、用量、峰谷标识、设备状态',
            responses: [
                makeResponse('深圳市龙岗区智城数据服务有限公司（示例）', '面议', '李明', '13800002651', 'liming@example.com', '2026-08-09 17:18:06'),
                makeResponse('深圳市园区节能数字科技有限公司（示例）', '¥ 26,000', '许晨', '13800004217', 'xuchen@example.com', '2026-08-09 18:05:31', 'unmatched')
            ]
        }),
        makeRecord({
            id: 'DEMAND-DM202608080002',
            title: '坂田街道公共停车泊位动态数据需求',
            type: '数据需求',
            scenes: ['交通运输', '公共服务'],
            priority: '紧急',
            status: '匹配成功',
            responseCount: 3,
            createdAt: '2026-08-08 14:16:32',
            deadline: '2026-08-24',
            budget: '定价',
            keywords: ['停车泊位', '实时余位'],
            description: '获取公共停车场基础信息、实时余位和进出场趋势，用于停车诱导和高峰期调度分析。',
            image: 'images/demand-transit.jpg',
            delivery: 'API传输',
            updateCycle: '实时',
            responses: [
                makeResponse('深圳市龙岗区交通数联科技有限公司（示例）', '¥ 18,000', '陈宇', '13800006172', 'chenyu@example.com', '2026-08-08 15:03:44', 'matched'),
                makeResponse('深圳市泊联城市服务有限公司（示例）', '¥ 22,500', '唐洁', '13800005384', 'tangjie@example.com', '2026-08-08 15:26:18', 'unmatched'),
                makeResponse('深圳市智慧停车数据研究中心（示例）', '面议', '高原', '13800001749', 'gaoyuan@example.com', '2026-08-08 16:08:52', 'unmatched')
            ]
        }),
        makeRecord({
            id: 'DEMAND-DM202608070003',
            title: '跨境电商企业经营活跃度分析需求',
            type: '应用需求',
            scenes: ['商贸流通', '智慧金融'],
            priority: '较高',
            status: '匹配成功',
            responseCount: 1,
            createdAt: '2026-08-07 10:28:45',
            deadline: '2026-09-05',
            keywords: ['跨境电商', '企业画像'],
            description: '构建企业经营活跃度分析模型，支持按街道、行业和企业规模查看经营变化趋势。',
            image: 'images/demand-finance.jpg',
            dataForm: '半结构化',
            delivery: '数据流传输',
            responses: [makeResponse('深圳市湾区企业数据研究中心（示例）', '¥ 32,000', '王宁', '13800007983', 'wangning@example.com', '2026-08-07 11:09:26', 'matched')]
        }),
        makeRecord({
            id: 'DEMAND-DM202607280004',
            title: '制造企业数据资产盘点与治理咨询需求',
            type: '服务需求',
            scenes: ['工业制造', '企业服务'],
            priority: '普通',
            status: '已截止',
            responseCount: 1,
            createdAt: '2026-07-28 09:35:12',
            deadline: '2026-08-08',
            keywords: ['数据资产', '数据治理'],
            description: '面向制造企业开展数据目录梳理、数据标准评估和治理路线规划。',
            image: 'images/demand-asset.jpg',
            responses: [makeResponse('深圳市龙岗区数治咨询有限公司（示例）', '¥ 45,000', '赵倩', '13800003489', 'zhaoqian@example.com', '2026-07-28 13:20:08')]
        }),
        makeRecord({
            id: 'DEMAND-DM202607220005',
            title: '校园周边交通安全态势分析需求',
            type: '应用需求',
            scenes: ['教育文化', '交通运输'],
            priority: '紧急',
            status: '已截止',
            responseCount: 0,
            createdAt: '2026-07-22 15:12:54',
            deadline: '2026-08-05',
            keywords: ['校园安全', '交通态势'],
            description: '分析上下学时段校园周边车流、人流和重点路口拥堵情况，为交通组织优化提供参考。',
            image: 'images/demand-education.jpg',
            updateCycle: '每日'
        }),
        makeRecord({
            id: 'DEMAND-DM202607160006',
            title: '龙岗河道水质巡检数据融合需求',
            type: '数据需求',
            scenes: ['生态环境', '地理遥感'],
            priority: '较高',
            status: '已截止',
            responseCount: 1,
            createdAt: '2026-07-16 11:47:29',
            deadline: '2026-07-31',
            keywords: ['河道水质', '巡检'],
            description: '融合水质监测、巡检记录和遥感影像信息，支撑河道异常点位发现与变化分析。',
            image: 'images/water-analytics.jpg',
            responses: [makeResponse('深圳市清源环境数据有限公司（示例）', '面议', '刘畅', '13800008546', 'liuchang@example.com', '2026-07-16 14:32:11', 'unmatched')]
        }),
        makeRecord({
            id: 'DEMAND-DM202607080007',
            title: '文体场馆客流预测与活动排期需求',
            type: '应用需求',
            scenes: ['文旅体育', '公共服务'],
            priority: '普通',
            status: '需求关闭',
            responseCount: 0,
            createdAt: '2026-07-08 16:06:38',
            deadline: '2026-07-25',
            keywords: ['场馆客流', '活动排期'],
            description: '根据历史客流、活动日历和天气因素预测场馆客流，为活动排期和现场保障提供参考。',
            image: 'images/solution-asset.jpg',
            updateCycle: '每周'
        })
    ];

    function createDraft() {
        return {
            title: '',
            type: '',
            scenes: [],
            keywords: [],
            keywordInput: '',
            priority: '',
            budget: '',
            description: '',
            deadline: '',
            images: [],
            supplement: '',
            dataForm: '',
            personalInfo: '',
            delivery: '',
            dataStart: '',
            dataEnd: '',
            updateCycle: '',
            dataItems: '',
            other: '',
            company: '深圳市龙岗区数智产业发展有限公司',
            contact: '',
            phone: '',
            email: '',
            address: ''
        };
    }

    var draft = createDraft();
    var state = {
        view: params.get('view') || 'list',
        activeId: params.get('id') || records[0].id,
        detailTab: params.get('tab') === 'responses' ? 'responses' : 'info',
        keywordDraft: '',
        keyword: '',
        page: 1,
        pageSize: 10,
        openSelect: '',
        sceneOpen: false,
        sceneQuery: '',
        openCalendar: '',
        deadlineMonth: '',
        rangeMonth: '',
        formScrollTop: 0,
        errors: {}
    };
    var decisionLayer = null;
    var decisionState = null;
    var decisionKeydownHandler = null;
    var decisionRemoveTimer = null;

    function getRecord(id) {
        return records.find(function (record) { return record.id === id; }) || records[0];
    }

    function priorityClass(priority) {
        if (priority === '紧急') return 'urgent';
        if (priority === '较高') return 'high';
        return 'normal';
    }

    function statusClass(status) {
        return status === '匹配成功' ? 'matched' : '';
    }

    function renderPriority(priority) {
        return '<span class="dmd-priority ' + priorityClass(priority) + '">' + escapeHtml(priority) + '</span>';
    }

    function renderStatus(status) {
        return '<span class="dmd-status ' + statusClass(status) + '">' + escapeHtml(status) + '</span>';
    }

    function setTitle(text, visible) {
        if (!titleEl) return;
        titleEl.textContent = text;
        titleEl.style.display = visible === false ? 'none' : '';
    }

    function syncRoute(view, id, tab, replace) {
        var url = new URL(window.location.href);
        url.searchParams.set('menu', 'my-demand');
        if (view && view !== 'list') url.searchParams.set('view', view);
        else url.searchParams.delete('view');
        if (id) url.searchParams.set('id', id);
        else url.searchParams.delete('id');
        if (tab && tab !== 'info') url.searchParams.set('tab', tab);
        else url.searchParams.delete('tab');
        var next = url.pathname + url.search + url.hash;
        if (replace) window.history.replaceState({}, '', next);
        else window.history.pushState({}, '', next);
    }

    function navigate(view, id, tab, replace) {
        state.view = view;
        state.activeId = id || state.activeId;
        state.detailTab = tab || 'info';
        state.openSelect = '';
        state.sceneOpen = false;
        state.openCalendar = '';
        state.errors = {};
        syncRoute(view, view === 'detail' ? state.activeId : '', state.detailTab, replace);
        render();
    }

    function renderList() {
        setTitle('我的需求', true);
        var keyword = state.keyword.trim().toLowerCase();
        var filtered = records.filter(function (record) {
            return !keyword || record.title.toLowerCase().indexOf(keyword) >= 0;
        });
        var totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
        if (state.page > totalPages) state.page = totalPages;
        var start = (state.page - 1) * state.pageSize;
        var pageRecords = filtered.slice(start, start + state.pageSize);
        var rows = pageRecords.map(function (record) {
            return ''
                + '<tr>'
                +   '<td><span class="dmd-ellipsis" title="' + escapeHtml(record.title) + '">' + escapeHtml(record.title) + '</span></td>'
                +   '<td><span class="dmd-ellipsis" title="' + escapeHtml(record.id) + '">' + escapeHtml(record.id) + '</span></td>'
                +   '<td>' + escapeHtml(record.type) + '</td>'
                +   '<td><span class="dmd-ellipsis" title="' + escapeHtml(record.scenes.join('、')) + '">' + escapeHtml(record.scenes.join('、')) + '</span></td>'
                +   '<td class="is-center">' + renderPriority(record.priority) + '</td>'
                +   '<td>' + renderStatus(record.status) + '</td>'
                +   '<td class="is-center"><span class="dmd-response-count">' + record.responseCount + '</span></td>'
                +   '<td>' + escapeHtml(record.createdAt) + '</td>'
                +   '<td class="is-action"><button class="dmd-action-link" type="button" data-demand-detail="' + escapeHtml(record.id) + '">' + icon('visibility') + '<span>查看详情</span></button></td>'
                + '</tr>';
        }).join('');
        if (!rows) {
            rows = '<tr><td colspan="9"><div class="dmd-empty-state">' + icon('search_off') + '<span>未找到匹配的需求</span></div></td></tr>';
        }
        var pageButtons = '';
        for (var page = 1; page <= totalPages; page += 1) {
            pageButtons += '<button class="' + (page === state.page ? 'active' : '') + '" type="button" data-demand-page="' + page + '">' + page + '</button>';
        }
        return ''
            + '<section class="dmd-list-view" aria-label="我的需求列表">'
            +   '<div class="dmd-list-head"><button class="dmd-primary-button" type="button" data-demand-publish>' + icon('add') + '<span>发布需求</span></button></div>'
            +   '<div class="dmd-toolbar">'
            +       '<label class="dmd-search">'
            +           '<input type="search" value="' + escapeHtml(state.keywordDraft) + '" placeholder="请输入需求标题" aria-label="按需求标题搜索" data-demand-search>'
            +           icon('search')
            +       '</label>'
            +       '<button class="dmd-filter-button" type="button" data-demand-search-submit>' + icon('filter_alt') + '<span>筛选</span></button>'
            +   '</div>'
            +   '<div class="dmd-table-card">'
            +       '<table class="dmd-table">'
            +           '<colgroup><col style="width:230px"><col style="width:180px"><col style="width:112px"><col style="width:185px"><col style="width:112px"><col style="width:132px"><col style="width:110px"><col style="width:185px"><col style="width:120px"></colgroup>'
            +           '<thead><tr><th>需求标题</th><th>需求编号</th><th>需求类型</th><th>需求场景</th><th class="is-center">需求优先级</th><th>需求状态</th><th class="is-center">需求响应数</th><th>创建时间</th><th class="is-action">操作</th></tr></thead>'
            +           '<tbody>' + rows + '</tbody>'
            +       '</table>'
            +   '</div>'
            +   '<div class="dmd-pagination" aria-label="分页">'
            +       '<span>共 ' + filtered.length + ' 条</span>'
            +       '<button type="button" aria-label="上一页" data-demand-page="' + Math.max(1, state.page - 1) + '" ' + (state.page === 1 ? 'disabled' : '') + '>' + icon('chevron_left') + '</button>'
            +       pageButtons
            +       '<button type="button" aria-label="下一页" data-demand-page="' + Math.min(totalPages, state.page + 1) + '" ' + (state.page === totalPages ? 'disabled' : '') + '>' + icon('chevron_right') + '</button>'
            +       '<select class="dmd-page-size" aria-label="每页条数" data-demand-page-size><option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10 条/页</option><option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20 条/页</option><option value="50"' + (state.pageSize === 50 ? ' selected' : '') + '>50 条/页</option></select>'
            +       '<span>前往</span><input class="dmd-jump-input" type="number" min="1" max="' + totalPages + '" aria-label="跳转页码" data-demand-jump>'
            +   '</div>'
            + '</section>';
    }

    function renderError(name) {
        return '<div class="dmd-field-error" data-error-for="' + name + '">' + escapeHtml(state.errors[name] || '') + '</div>';
    }

    function renderCustomSelect(name, options, placeholder) {
        var value = draft[name];
        var open = state.openSelect === name;
        var optionHtml = options.map(function (option) {
            return '<button class="dmd-select-option' + (value === option ? ' selected' : '') + '" type="button" role="option" aria-selected="' + (value === option) + '" data-select-value="' + escapeHtml(option) + '" data-select-name="' + name + '">' + escapeHtml(option) + '</button>';
        }).join('');
        return ''
            + '<div class="dmd-custom-select" data-custom-select="' + name + '">'
            +   '<button class="dmd-select-trigger' + (!value ? ' placeholder' : '') + (state.errors[name] ? ' invalid' : '') + '" type="button" aria-haspopup="listbox" aria-expanded="' + open + '" data-select-toggle="' + name + '"><span>' + escapeHtml(value || placeholder) + '</span>' + icon('expand_more') + '</button>'
            +   (open ? '<div class="dmd-select-menu" role="listbox">' + optionHtml + '</div>' : '')
            + '</div>'
            + renderError(name);
    }

    function renderScenePicker() {
        var selected = draft.scenes.map(function (scene) {
            return '<span class="dmd-scene-chip">' + escapeHtml(scene) + '<button type="button" aria-label="移除需求场景 ' + escapeHtml(scene) + '" data-scene-remove="' + escapeHtml(scene) + '">' + icon('close') + '</button></span>';
        }).join('');
        var filtered = SCENE_OPTIONS.filter(function (scene) {
            return !state.sceneQuery || scene.indexOf(state.sceneQuery) >= 0;
        });
        var options = filtered.map(function (scene) {
            var checked = draft.scenes.indexOf(scene) >= 0;
            return '<label class="dmd-scene-option' + (checked ? ' selected' : '') + '"><input type="checkbox" value="' + escapeHtml(scene) + '" data-scene-option ' + (checked ? 'checked' : '') + '><span>' + escapeHtml(scene) + '</span></label>';
        }).join('');
        if (!options) options = '<div class="dmd-scene-empty">未找到匹配场景</div>';
        return ''
            + '<div class="dmd-scene-picker">'
            +   '<div class="dmd-scene-control' + (state.errors.scenes ? ' invalid' : '') + '">'
            +       selected
            +       '<input type="text" value="' + escapeHtml(state.sceneQuery) + '" placeholder="' + (draft.scenes.length ? '输入关键词搜索' : '请选择') + '" autocomplete="off" aria-label="搜索并选择需求场景" data-scene-search>'
            +       icon('search')
            +   '</div>'
            +   (state.sceneOpen ? '<div class="dmd-scene-menu">' + options + '</div>' : '')
            + '</div>'
            + renderError('scenes');
    }

    function renderRadioGroup(name, options) {
        return '<div class="dmd-radio-group">' + options.map(function (option) {
            return '<label><input type="radio" name="' + name + '" value="' + escapeHtml(option) + '" data-field="' + name + '" ' + (draft[name] === option ? 'checked' : '') + '><span>' + escapeHtml(option) + '</span></label>';
        }).join('') + '</div>' + renderError(name);
    }

    function renderKeywordField() {
        var chips = draft.keywords.map(function (keyword, index) {
            return '<span class="dmd-keyword-chip">' + escapeHtml(keyword) + '<button type="button" aria-label="移除关键词 ' + escapeHtml(keyword) + '" data-keyword-remove="' + index + '">×</button></span>';
        }).join('');
        return '<input type="text" value="' + escapeHtml(draft.keywordInput) + '" placeholder="请输入关键字，按 Enter 键确认" data-keyword-input>'
            + (chips ? '<div class="dmd-keyword-list">' + chips + '</div>' : '');
    }

    function renderImages() {
        return '<div data-demand-image-icon-picker></div><div class="dmd-helper">支持上传 jpg、jpeg、png 图片，或从图标库选择；建议尺寸 64 × 64，单张不超过 5MB。</div>' + renderError('images');
    }

    function renderCalendarMonth(month, kind) {
        var weekdays = ['日', '一', '二', '三', '四', '五', '六'].map(function (day) {
            return '<span>' + day + '</span>';
        }).join('');
        var gridStart = new Date(month.getFullYear(), month.getMonth(), 1 - month.getDay());
        var today = dateKey(new Date());
        var days = '';
        for (var index = 0; index < 42; index += 1) {
            var current = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
            var key = dateKey(current);
            var classNames = ['dmd-calendar-day'];
            if (current.getMonth() !== month.getMonth()) classNames.push('outside');
            if (key === today) classNames.push('today');
            if (kind === 'deadline' && key === draft.deadline) classNames.push('selected');
            if (kind === 'range') {
                if (key === draft.dataStart) classNames.push('range-start', 'selected');
                if (key === draft.dataEnd) classNames.push('range-end', 'selected');
                if (draft.dataStart && draft.dataEnd && key > draft.dataStart && key < draft.dataEnd) classNames.push('in-range');
            }
            days += '<button class="' + classNames.join(' ') + '" type="button" aria-label="' + key + '" data-calendar-day="' + key + '" data-calendar-kind="' + kind + '"><span>' + current.getDate() + '</span></button>';
        }
        return '<div class="dmd-calendar-month"><div class="dmd-calendar-weekdays">' + weekdays + '</div><div class="dmd-calendar-days">' + days + '</div></div>';
    }

    function renderCalendarNavButton(kind, amount, iconName, label) {
        return '<button class="dmd-calendar-nav" type="button" aria-label="' + label + '" data-calendar-kind="' + kind + '" data-calendar-nav="' + amount + '">' + icon(iconName) + '</button>';
    }

    function renderDeadlinePicker() {
        var open = state.openCalendar === 'deadline';
        var month = monthStart(state.deadlineMonth || draft.deadline || new Date());
        var panelHtml = '';
        if (open) {
            panelHtml = '<div class="dmd-calendar-panel dmd-calendar-single" role="dialog" aria-label="选择需求截止时间">'
                + '<div class="dmd-calendar-header">'
                +   '<div class="dmd-calendar-nav-group">' + renderCalendarNavButton('deadline', -12, 'keyboard_double_arrow_left', '上一年') + renderCalendarNavButton('deadline', -1, 'chevron_left', '上个月') + '</div>'
                +   '<strong>' + monthLabel(month) + '</strong>'
                +   '<div class="dmd-calendar-nav-group">' + renderCalendarNavButton('deadline', 1, 'chevron_right', '下个月') + renderCalendarNavButton('deadline', 12, 'keyboard_double_arrow_right', '下一年') + '</div>'
                + '</div>'
                + renderCalendarMonth(month, 'deadline')
                + '<button class="dmd-calendar-today" type="button" data-calendar-today>今天</button>'
                + '</div>';
        }
        return '<div class="dmd-date-picker" data-date-picker="deadline">'
            + '<button class="dmd-date-trigger' + (!draft.deadline ? ' placeholder' : '') + (state.errors.deadline ? ' invalid' : '') + '" type="button" aria-haspopup="dialog" aria-expanded="' + open + '" data-calendar-toggle="deadline"><span>' + escapeHtml(draft.deadline || '请选择日期') + '</span>' + icon('calendar_month') + '</button>'
            + panelHtml
            + '</div>'
            + renderError('deadline');
    }

    function renderRangePicker() {
        var open = state.openCalendar === 'range';
        var leftMonth = monthStart(state.rangeMonth || draft.dataStart || new Date());
        var rightMonth = addMonths(leftMonth, 1);
        var panelHtml = '';
        if (open) {
            panelHtml = '<div class="dmd-calendar-panel dmd-calendar-range-panel" role="dialog" aria-label="选择数据时间范围">'
                + '<div class="dmd-range-calendar-header">'
                +   '<div><span class="dmd-calendar-nav-group">' + renderCalendarNavButton('range', -12, 'keyboard_double_arrow_left', '上一年') + renderCalendarNavButton('range', -1, 'chevron_left', '上个月') + '</span><strong>' + monthLabel(leftMonth) + '</strong></div>'
                +   '<div><strong>' + monthLabel(rightMonth) + '</strong><span class="dmd-calendar-nav-group">' + renderCalendarNavButton('range', 1, 'chevron_right', '下个月') + renderCalendarNavButton('range', 12, 'keyboard_double_arrow_right', '下一年') + '</span></div>'
                + '</div>'
                + '<div class="dmd-range-calendar-months">' + renderCalendarMonth(leftMonth, 'range') + renderCalendarMonth(rightMonth, 'range') + '</div>'
                + '</div>';
        }
        return '<div class="dmd-date-picker" data-date-picker="range">'
            + '<button class="dmd-date-trigger dmd-range-trigger' + (!draft.dataStart && !draft.dataEnd ? ' placeholder' : '') + '" type="button" aria-haspopup="dialog" aria-expanded="' + open + '" data-calendar-toggle="range">'
            +   '<span>' + escapeHtml(draft.dataStart || '开始日期') + '</span><em>—</em><span>' + escapeHtml(draft.dataEnd || '结束日期') + '</span>' + icon('calendar_month')
            + '</button>'
            + panelHtml
            + '</div>';
    }

    function formRow(label, required, content) {
        return '<div class="dmd-form-row"><div class="dmd-form-label' + (required ? ' required' : '') + '">' + label + '</div><div class="dmd-field">' + content + '</div></div>';
    }

    function renderPublish() {
        setTitle('发布需求', false);
        return ''
            + '<div class="dmd-page-backbar"><button class="dmd-page-back" type="button" data-demand-back>' + icon('chevron_left') + '<span>发布需求</span></button></div>'
            + '<div class="dmd-form-view">'
            +   '<form class="dmd-form" novalidate data-demand-form>'
            +       '<section class="dmd-form-section"><h2>需求信息</h2>'
            +           formRow('需求标题', true, '<input class="dmd-with-counter' + (state.errors.title ? ' invalid' : '') + '" type="text" maxlength="50" value="' + escapeHtml(draft.title) + '" placeholder="请输入" data-field="title"><span class="dmd-counter is-input">' + draft.title.length + '/50</span>' + renderError('title'))
            +           formRow('需求类型', true, renderCustomSelect('type', TYPE_OPTIONS, '请选择'))
            +           formRow('需求场景', true, renderScenePicker())
            +           formRow('需求关键词', false, renderKeywordField())
            +           formRow('需求优先级', true, renderRadioGroup('priority', ['普通', '较高', '紧急']))
            +           formRow('需求预算', true, renderRadioGroup('budget', ['面议', '定价']))
            +           formRow('需求描述', true, '<textarea class="' + (state.errors.description ? 'invalid' : '') + '" maxlength="500" placeholder="请输入" data-field="description">' + escapeHtml(draft.description) + '</textarea><span class="dmd-counter">' + draft.description.length + '/500</span>' + renderError('description'))
            +           formRow('需求截止时间', true, renderDeadlinePicker())
            +           formRow('需求图片', true, renderImages())
            +           formRow('补充材料', false, '<button class="dmd-file-button" type="button" data-file-upload>' + icon('upload_file') + '<span>上传文件</span></button><input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" hidden data-file-input><span class="dmd-file-name">' + escapeHtml(draft.supplement) + '</span><div class="dmd-helper">上传单个文件，支持 pdf/doc/docx/ppt 等格式，大小不超过50M</div>')
            +           formRow('数据组织形式', true, renderRadioGroup('dataForm', ['结构化', '非结构化', '半结构化']))
            +           formRow('是否涉及个人信息', true, renderRadioGroup('personalInfo', ['是', '否']))
            +           formRow('数据交付方式', false, renderRadioGroup('delivery', ['文件传输', '数据流传输', 'API传输']))
            +           formRow('数据时间范围', false, renderRangePicker())
            +           formRow('更新周期需求', false, renderCustomSelect('updateCycle', CYCLE_OPTIONS, '请选择'))
            +           formRow('数据信息项', false, '<textarea maxlength="300" placeholder="请输入" data-field="dataItems">' + escapeHtml(draft.dataItems) + '</textarea><span class="dmd-counter">' + draft.dataItems.length + '/300</span>')
            +           formRow('其他', false, '<textarea maxlength="300" placeholder="请输入" data-field="other">' + escapeHtml(draft.other) + '</textarea><span class="dmd-counter">' + draft.other.length + '/300</span>')
            +       '</section>'
            +       '<section class="dmd-form-section"><h2>需求方信息</h2>'
            +           formRow('需求方名称', false, '<input type="text" value="' + escapeHtml(draft.company) + '" disabled>')
            +           formRow('需求方联系人', true, '<input class="' + (state.errors.contact ? 'invalid' : '') + '" type="text" value="' + escapeHtml(draft.contact) + '" placeholder="请输入" data-field="contact">' + renderError('contact'))
            +           formRow('需求方电话', true, '<input class="' + (state.errors.phone ? 'invalid' : '') + '" type="tel" value="' + escapeHtml(draft.phone) + '" placeholder="请输入" data-field="phone">' + renderError('phone'))
            +           formRow('需求方邮箱', false, '<input type="email" value="' + escapeHtml(draft.email) + '" placeholder="请输入" data-field="email">')
            +           formRow('需求方地址', false, '<textarea maxlength="500" placeholder="请输入" data-field="address">' + escapeHtml(draft.address) + '</textarea><span class="dmd-counter">' + draft.address.length + '/500</span>')
            +       '</section>'
            +   '</form>'
            + '</div>'
            + '<div class="dmd-form-actions"><button class="dmd-secondary-button" type="button" data-demand-cancel>' + icon('close') + '<span>取消</span></button><button class="dmd-primary-button" type="button" data-demand-submit>' + icon('check') + '<span>提交</span></button></div>';
    }

    function infoItem(label, value, full) {
        return '<div class="dmd-info-item' + (full ? ' full' : '') + '"><span class="dmd-info-label">' + label + '：</span><span class="dmd-info-value">' + (value || '--') + '</span></div>';
    }

    function renderSummary(record) {
        var tags = [record.type].concat(record.scenes).map(function (tag) { return '<span class="dmd-tag">' + escapeHtml(tag) + '</span>'; }).join('');
        return '<section class="dmd-summary-card">'
            + '<div class="dmd-summary-title-row">' + renderPriority(record.priority) + '<strong class="dmd-summary-title">' + escapeHtml(record.title) + '</strong>' + renderStatus(record.status) + '</div>'
            + '<div class="dmd-summary-tags">' + tags + '</div>'
            + '<div class="dmd-summary-stats">'
            +   '<div class="dmd-summary-stat"><span>需求预算</span><strong class="price">' + escapeHtml(record.budget) + '</strong></div>'
            +   '<div class="dmd-summary-stat"><span>截止时间</span><strong>' + escapeHtml(record.deadline) + '</strong></div>'
            +   '<div class="dmd-summary-stat"><span>发布时间</span><strong>' + escapeHtml(record.createdAt.slice(0, 10)) + '</strong></div>'
            + '</div></section>';
    }

    function renderDemandInfo(record) {
        var keywords = record.keywords.length ? record.keywords.join('、') : '--';
        var imageValue = record.image ? { type: 'image', src: record.image } : (record.imageIcon ? { type: 'icon', name: record.imageIcon } : null);
        var image = imageValue && window.ImageIconPicker ? window.ImageIconPicker.renderDisplay(imageValue, { className: 'dmd-detail-image', alt: record.title + '需求图片' }) : '--';
        var logs = record.logs.map(function (log) {
            return '<tr><td>' + escapeHtml(log.role) + '</td><td>' + escapeHtml(log.action) + '</td><td>' + escapeHtml(log.result) + '</td><td>' + escapeHtml(log.content) + '</td><td>' + escapeHtml(log.time) + '</td></tr>';
        }).join('');
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
            + '</div></section>'
            + '<section class="dmd-detail-section"><h2>日志信息</h2><div class="dmd-table-card"><table class="dmd-log-table"><thead><tr><th>操作者角色</th><th>操作类型</th><th>操作结果</th><th>内容</th><th>操作时间</th></tr></thead><tbody>' + logs + '</tbody></table></div></section>';
    }

    function renderResponses(record) {
        if (!record.responses.length) {
            return '<div class="dmd-empty-state">' + icon('inbox') + '<span>暂无需求响应</span></div>';
        }
        var hasMatchedResponse = record.responses.some(function (response) { return response.decision === 'matched'; });
        return record.responses.map(function (response, index) {
            var decisionTag = response.decision === 'matched'
                ? '<span class="dmd-match-tag is-matched">' + icon('check_circle') + '<span>匹配</span></span>'
                : (response.decision === 'unmatched'
                    ? '<span class="dmd-match-tag is-unmatched">' + icon('cancel') + '<span>不匹配</span></span>'
                    : '');
            var decisionActions = response.decision === 'pending' && !hasMatchedResponse
                ? '<div class="dmd-response-actions"><button class="dmd-response-decision is-unmatched" type="button" data-response-decision="unmatched" data-response-index="' + index + '">不匹配</button><button class="dmd-response-decision" type="button" data-response-decision="matched" data-response-index="' + index + '">匹配</button></div>'
                : '';
            return '<article class="dmd-response-card">'
                + '<div class="dmd-response-head"><div class="dmd-response-title"><strong>' + escapeHtml(response.company) + '</strong><time>' + escapeHtml(response.createdAt) + '</time>' + decisionTag + '</div><div class="dmd-response-side"><div class="dmd-response-price">' + escapeHtml(response.price) + '</div>' + decisionActions + '</div></div>'
                + '<div class="dmd-response-desc">' + escapeHtml(response.description) + '</div>'
                + '<div class="dmd-response-meta">'
                +   '<div><span>联系人姓名：</span>' + escapeHtml(response.contact) + '</div>'
                +   '<div><span>联系人电话：</span>' + escapeHtml(response.phone) + '</div>'
                +   '<div><span>联系人邮箱：</span>' + escapeHtml(response.email) + '</div>'
                +   '<div><span>能力介绍材料：</span>' + escapeHtml(response.material) + '<span class="dmd-preview-actions"><button class="dmd-preview-action" type="button" data-material-preview="' + index + '">预览</button><button class="dmd-preview-action" type="button" data-material-download="' + index + '">下载</button></span></div>'
                + '</div></article>';
        }).join('');
    }

    function renderDetail() {
        setTitle('需求详情', false);
        var record = getRecord(state.activeId);
        return ''
            + '<div class="dmd-page-backbar"><button class="dmd-page-back" type="button" data-demand-back>' + icon('chevron_left') + '<span>需求详情</span></button></div>'
            + '<div class="dmd-detail-view">'
            +   renderSummary(record)
            +   '<div class="dmd-tabs" role="tablist" aria-label="需求详情标签页">'
            +       '<button class="dmd-tab' + (state.detailTab === 'info' ? ' active' : '') + '" type="button" role="tab" aria-selected="' + (state.detailTab === 'info') + '" data-detail-tab="info">需求信息</button>'
            +       '<button class="dmd-tab' + (state.detailTab === 'responses' ? ' active' : '') + '" type="button" role="tab" aria-selected="' + (state.detailTab === 'responses') + '" data-detail-tab="responses">响应情况</button>'
            +   '</div>'
            +   (state.detailTab === 'info' ? renderDemandInfo(record) : renderResponses(record))
            + '</div>';
    }

    function render() {
        var currentFormView = panel.querySelector('.dmd-form-view');
        if (currentFormView && state.view === 'publish') state.formScrollTop = currentFormView.scrollTop;
        panel.classList.remove('is-placeholder', 'is-service-management');
        panel.classList.add('is-demand-management');
        panel.innerHTML = '<div class="demand-board">' + (state.view === 'publish' ? renderPublish() : (state.view === 'detail' ? renderDetail() : renderList())) + '</div>';
        if (state.view === 'publish') {
            var demandImagePicker = panel.querySelector('[data-demand-image-icon-picker]');
            if (demandImagePicker && window.ImageIconPicker) {
                window.ImageIconPicker.mount(demandImagePicker, {
                    label: '需求图片',
                    modalTitle: '选择需求图标',
                    maxSizeMB: 5,
                    value: draft.images[0] || null,
                    onChange: function (value) {
                        draft.images = value ? [value] : [];
                        clearFieldError('images');
                    },
                    onError: function (message) { showToast(message, 'error'); }
                });
            }
            var nextFormView = panel.querySelector('.dmd-form-view');
            if (nextFormView) nextFormView.scrollTop = state.formScrollTop;
        }
        document.title = (state.view === 'publish' ? '发布需求' : (state.view === 'detail' ? '需求详情' : '我的需求')) + ' - 需方中心';
    }

    function clearFieldError(name) {
        if (!state.errors[name]) return;
        delete state.errors[name];
        var error = panel.querySelector('[data-error-for="' + name + '"]');
        if (error) error.textContent = '';
        panel.querySelectorAll('[data-field="' + name + '"]').forEach(function (input) { input.classList.remove('invalid'); });
    }

    function validateDraft() {
        var required = {
            title: '请输入需求标题',
            type: '请选择需求类型',
            scenes: '请选择需求场景',
            priority: '请选择需求优先级',
            budget: '请选择需求预算',
            description: '请输入需求描述',
            deadline: '请选择需求截止时间',
            images: '请上传需求图片',
            dataForm: '请选择数据组织形式',
            personalInfo: '请选择是否涉及个人信息',
            contact: '请输入需求方联系人',
            phone: '请输入需求方电话'
        };
        state.errors = {};
        Object.keys(required).forEach(function (name) {
            var value = draft[name];
            if ((Array.isArray(value) && !value.length) || (!Array.isArray(value) && !String(value || '').trim())) {
                state.errors[name] = required[name];
            }
        });
        if (draft.phone && !/^1\d{10}$/.test(draft.phone.trim())) state.errors.phone = '请输入正确的11位手机号码';
        return Object.keys(state.errors).length === 0;
    }

    function createRecordFromDraft() {
        var now = new Date();
        var createdAt = formatDateTime(now);
        var sampleResponse = makeResponse('深圳市龙岗区数据应用服务有限公司（示例）', draft.budget === '定价' ? '¥ 20,000' : '面议', '林悦', '13800009628', 'linyue@example.com', createdAt, 'matched');
        var record = makeRecord({
            id: 'DEMAND-DM' + String(now.getFullYear()) + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0') + String(Date.now()).slice(-4),
            title: draft.title.trim(),
            type: draft.type,
            scenes: draft.scenes.slice(),
            priority: draft.priority,
            status: '匹配成功',
            responseCount: 1,
            createdAt: createdAt,
            deadline: draft.deadline,
            budget: draft.budget,
            keywords: draft.keywords.slice(),
            description: draft.description.trim(),
            image: draft.images[0] && draft.images[0].type === 'image' ? draft.images[0].src : '',
            imageIcon: draft.images[0] && draft.images[0].type === 'icon' ? draft.images[0].name : '',
            supplement: draft.supplement || '--',
            dataForm: draft.dataForm,
            personalInfo: draft.personalInfo,
            delivery: draft.delivery || '--',
            dataStart: draft.dataStart || '--',
            dataEnd: draft.dataEnd || '--',
            updateCycle: draft.updateCycle || '--',
            dataItems: draft.dataItems || '--',
            other: draft.other || '--',
            responses: [sampleResponse]
        });
        record.demander = {
            company: draft.company,
            contact: draft.contact.trim(),
            phone: draft.phone.trim(),
            email: draft.email.trim() || '--',
            address: draft.address.trim() || '--'
        };
        return record;
    }

    function showToast(message, type) {
        var old = document.querySelector('.dmd-toast');
        if (old) old.remove();
        var toast = document.createElement('div');
        toast.className = 'dmd-toast' + (type === 'error' ? ' error' : '');
        toast.setAttribute('role', 'status');
        toast.innerHTML = icon(type === 'error' ? 'error' : 'check_circle') + '<span>' + escapeHtml(message) + '</span>';
        document.body.appendChild(toast);
        window.setTimeout(function () { if (toast.parentNode) toast.remove(); }, 2200);
    }

    function removeDecisionLayerImmediately() {
        window.clearTimeout(decisionRemoveTimer);
        decisionRemoveTimer = null;
        if (decisionKeydownHandler) document.removeEventListener('keydown', decisionKeydownHandler);
        decisionKeydownHandler = null;
        if (decisionLayer && decisionLayer.parentNode) decisionLayer.remove();
        decisionLayer = null;
        decisionState = null;
        document.body.classList.remove('dmd-decision-open');
    }

    function closeDecisionDialog(restoreFocus) {
        if (!decisionLayer) return;
        var currentLayer = decisionLayer;
        var returnFocus = decisionState && decisionState.returnFocus;
        if (decisionKeydownHandler) document.removeEventListener('keydown', decisionKeydownHandler);
        decisionKeydownHandler = null;
        decisionState = null;
        currentLayer.classList.remove('show');
        document.body.classList.remove('dmd-decision-open');
        decisionRemoveTimer = window.setTimeout(function () {
            if (currentLayer.parentNode) currentLayer.remove();
            if (decisionLayer === currentLayer) decisionLayer = null;
            decisionRemoveTimer = null;
            if (restoreFocus && returnFocus && returnFocus.isConnected && typeof returnFocus.focus === 'function') returnFocus.focus();
        }, 180);
    }

    function confirmResponseDecision() {
        if (!decisionState) return;
        var currentState = decisionState;
        var record = getRecord(currentState.recordId);
        var response = record.responses[currentState.responseIndex];
        if (!response || response.decision !== 'pending') {
            closeDecisionDialog(false);
            return;
        }
        if (currentState.decision === 'matched' && record.responses.some(function (item) { return item.decision === 'matched'; })) {
            closeDecisionDialog(false);
            render();
            showToast('该需求已完成机构匹配', 'error');
            return;
        }
        response.decision = currentState.decision;
        if (currentState.decision === 'matched') record.status = '匹配成功';
        closeDecisionDialog(false);
        render();
        showToast('操作成功');
    }

    function openDecisionDialog(decision, responseIndex, returnFocus) {
        var record = getRecord(state.activeId);
        var response = record.responses[responseIndex];
        if (!response || response.decision !== 'pending') return;
        removeDecisionLayerImmediately();
        var isMatched = decision === 'matched';
        decisionState = {
            recordId: record.id,
            responseIndex: responseIndex,
            decision: decision,
            returnFocus: returnFocus || document.activeElement
        };
        decisionLayer = document.createElement('div');
        decisionLayer.className = 'dmd-decision-overlay';
        decisionLayer.innerHTML = ''
            + '<section class="dmd-decision-dialog" role="dialog" aria-modal="true" aria-labelledby="dmdDecisionTitle" aria-describedby="dmdDecisionCopy">'
            +   '<header class="dmd-decision-header"><h2 id="dmdDecisionTitle">' + icon('warning') + '<span>' + (isMatched ? '匹配' : '不匹配') + '</span></h2><button class="dmd-decision-close" type="button" aria-label="关闭' + (isMatched ? '匹配' : '不匹配') + '确认" data-response-decision-close>' + icon('close') + '</button></header>'
            +   '<div class="dmd-decision-body"><p id="dmdDecisionCopy">' + (isMatched ? '仅能选择1家机构达成合作，匹配后无法进行机构更换，确认该机构符合您的需求吗？' : '选择不匹配后，将无法再次匹配该机构') + '</p></div>'
            +   '<footer class="dmd-decision-footer"><button class="dmd-secondary-button" type="button" data-response-decision-close>取消</button><button class="dmd-primary-button" type="button" data-response-decision-confirm>确定</button></footer>'
            + '</section>';
        document.body.appendChild(decisionLayer);
        document.body.classList.add('dmd-decision-open');
        decisionLayer.addEventListener('click', function (event) {
            if (event.target === decisionLayer || event.target.closest('[data-response-decision-close]')) {
                closeDecisionDialog(true);
                return;
            }
            if (event.target.closest('[data-response-decision-confirm]')) confirmResponseDecision();
        });
        decisionKeydownHandler = function (event) {
            if (!decisionLayer) return;
            if (event.key === 'Escape') {
                event.preventDefault();
                closeDecisionDialog(true);
                return;
            }
            if (event.key !== 'Tab') return;
            var focusable = Array.prototype.slice.call(decisionLayer.querySelectorAll('button:not([disabled])'));
            if (!focusable.length) return;
            var first = focusable[0];
            var last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', decisionKeydownHandler);
        window.requestAnimationFrame(function () {
            if (!decisionLayer) return;
            decisionLayer.classList.add('show');
            var confirmButton = decisionLayer.querySelector('[data-response-decision-confirm]');
            if (confirmButton) confirmButton.focus();
        });
    }

    function openDocumentPreview() {
        closeDocumentPreview();
        var overlay = document.createElement('div');
        overlay.className = 'dmd-document-overlay';
        overlay.setAttribute('data-document-overlay', '');
        overlay.innerHTML = ''
            + '<section class="dmd-document-dialog" role="dialog" aria-modal="true" aria-labelledby="dmdDocumentTitle">'
            +   '<header class="dmd-document-header"><button class="dmd-modal-close" type="button" aria-label="关闭预览" data-document-close>' + icon('close') + '</button><strong id="dmdDocumentTitle">企业数据服务能力介绍材料（原型示例）.doc</strong></header>'
            +   '<div class="dmd-document-stage">'
            +       '<article class="dmd-document-page">'
            +           '<h1>企业数据服务能力介绍材料（原型示例）</h1>'
            +           '<p>本材料用于介绍示例企业面向数据要素流通、数据资源管理和数据应用场景的综合服务能力，可作为需求响应能力展示与商务沟通材料示例。</p>'
            +           '<h2>一、企业概况</h2>'
            +           '<p>示例企业面向政企客户提供数据治理、数据资源盘点、数据分析应用和信息化系统建设服务，覆盖园区、企业服务、城市治理和公共服务等领域。</p>'
            +           '<p>团队具备数据标准建设、数据质量评估、安全合规评估、接口交付和运营分析等能力，可支持从需求梳理到交付运营的完整流程。</p>'
            +           '<h2>二、数据服务能力矩阵</h2>'
            +           '<table><thead><tr><th>能力方向</th><th>服务内容</th><th>典型成果</th></tr></thead><tbody>'
            +             '<tr><td>数据资源盘点</td><td>梳理业务系统、数据表、字段、来源、更新频率和责任主体。</td><td>数据资源目录、字段说明书</td></tr>'
            +             '<tr><td>数据治理与质量</td><td>开展标准映射、格式检查、重复值识别、缺失值核查和问题整改跟踪。</td><td>数据质量评估报告、整改台账</td></tr>'
            +             '<tr><td>数据安全合规</td><td>围绕数据来源、授权范围和个人信息处理开展合规审查。</td><td>合规评估报告、风险清单</td></tr>'
            +             '<tr><td>数据交付服务</td><td>支持文件、数据流和API等交付方式，提供交付记录与使用说明。</td><td>接口文档、交付清单</td></tr>'
            +           '</tbody></table>'
            +       '</article>'
            +   '</div>'
            + '</section>';
        document.body.appendChild(overlay);
        var close = overlay.querySelector('[data-document-close]');
        if (close) close.focus();
    }

    function closeDocumentPreview() {
        var overlay = document.querySelector('[data-document-overlay]');
        if (overlay) overlay.remove();
    }

    function downloadMaterial() {
        var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>企业数据服务能力介绍材料</title></head><body><h1>企业数据服务能力介绍材料（原型示例）</h1><p>本材料用于静态原型中的需求响应能力展示。</p><h2>一、企业概况</h2><p>提供数据资源盘点、数据治理、质量评估、安全合规和数据交付等服务。</p><h2>二、服务能力</h2><table border="1" cellspacing="0" cellpadding="8"><tr><th>能力方向</th><th>服务内容</th></tr><tr><td>数据资源盘点</td><td>形成数据资源目录与字段说明。</td></tr><tr><td>数据治理与质量</td><td>开展标准映射、质量检查与整改跟踪。</td></tr><tr><td>数据安全合规</td><td>开展授权范围和个人信息处理合规审查。</td></tr></table></body></html>';
        var blob = new Blob(['\ufeff' + html], { type: 'application/msword' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.download = '企业数据服务能力介绍材料（原型示例）.doc';
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
        showToast('示例材料已下载');
    }

    panel.addEventListener('click', function (event) {
        var detailButton = event.target.closest('[data-demand-detail]');
        if (detailButton) { navigate('detail', detailButton.dataset.demandDetail, 'info'); return; }
        if (event.target.closest('[data-demand-publish]')) { draft = createDraft(); state.formScrollTop = 0; navigate('publish'); return; }
        if (event.target.closest('[data-demand-back], [data-demand-cancel]')) { navigate('list'); return; }
        if (event.target.closest('[data-demand-search-submit]')) {
            state.keyword = state.keywordDraft;
            state.page = 1;
            render();
            return;
        }
        var pageButton = event.target.closest('[data-demand-page]');
        if (pageButton && !pageButton.disabled) { state.page = Number(pageButton.dataset.demandPage) || 1; render(); return; }
        var calendarToggle = event.target.closest('[data-calendar-toggle]');
        if (calendarToggle) {
            var calendarKind = calendarToggle.dataset.calendarToggle;
            var opening = state.openCalendar !== calendarKind;
            state.openCalendar = opening ? calendarKind : '';
            state.openSelect = '';
            state.sceneOpen = false;
            if (opening && calendarKind === 'deadline') state.deadlineMonth = monthStateKey(draft.deadline || new Date());
            if (opening && calendarKind === 'range') state.rangeMonth = monthStateKey(draft.dataStart || new Date());
            render();
            return;
        }
        var calendarNav = event.target.closest('[data-calendar-nav]');
        if (calendarNav) {
            var navKind = calendarNav.dataset.calendarKind;
            var amount = Number(calendarNav.dataset.calendarNav) || 0;
            if (navKind === 'deadline') state.deadlineMonth = monthStateKey(addMonths(state.deadlineMonth || draft.deadline || new Date(), amount));
            if (navKind === 'range') state.rangeMonth = monthStateKey(addMonths(state.rangeMonth || draft.dataStart || new Date(), amount));
            render();
            return;
        }
        var calendarDay = event.target.closest('[data-calendar-day]');
        if (calendarDay) {
            var selectedDate = calendarDay.dataset.calendarDay;
            if (calendarDay.dataset.calendarKind === 'deadline') {
                draft.deadline = selectedDate;
                state.openCalendar = '';
                clearFieldError('deadline');
            } else if (!draft.dataStart || draft.dataEnd) {
                draft.dataStart = selectedDate;
                draft.dataEnd = '';
            } else if (selectedDate < draft.dataStart) {
                draft.dataStart = selectedDate;
            } else {
                draft.dataEnd = selectedDate;
                state.openCalendar = '';
            }
            render();
            return;
        }
        if (event.target.closest('[data-calendar-today]')) {
            draft.deadline = dateKey(new Date());
            state.deadlineMonth = monthStateKey(new Date());
            state.openCalendar = '';
            clearFieldError('deadline');
            render();
            return;
        }
        var selectToggle = event.target.closest('[data-select-toggle]');
        if (selectToggle) {
            var selectName = selectToggle.dataset.selectToggle;
            state.openSelect = state.openSelect === selectName ? '' : selectName;
            state.sceneOpen = false;
            state.openCalendar = '';
            render();
            return;
        }
        var selectOption = event.target.closest('[data-select-value]');
        if (selectOption) {
            var name = selectOption.dataset.selectName;
            draft[name] = selectOption.dataset.selectValue;
            state.openSelect = '';
            clearFieldError(name);
            render();
            return;
        }
        var sceneRemove = event.target.closest('[data-scene-remove]');
        if (sceneRemove) {
            var sceneIndex = draft.scenes.indexOf(sceneRemove.dataset.sceneRemove);
            if (sceneIndex >= 0) draft.scenes.splice(sceneIndex, 1);
            state.sceneOpen = true;
            clearFieldError('scenes');
            render();
            var sceneSearch = panel.querySelector('[data-scene-search]');
            if (sceneSearch) sceneSearch.focus();
            return;
        }
        var keywordRemove = event.target.closest('[data-keyword-remove]');
        if (keywordRemove) { draft.keywords.splice(Number(keywordRemove.dataset.keywordRemove), 1); render(); return; }
        if (event.target.closest('[data-file-upload]')) { var fileInput = panel.querySelector('[data-file-input]'); if (fileInput) fileInput.click(); return; }
        if (event.target.closest('[data-demand-submit]')) {
            if (!validateDraft()) {
                render();
                var firstError = panel.querySelector('.invalid');
                if (firstError) firstError.scrollIntoView({ block: 'center', behavior: 'smooth' });
                showToast('请完善必填信息', 'error');
                return;
            }
            records.unshift(createRecordFromDraft());
            draft = createDraft();
            state.keyword = '';
            state.keywordDraft = '';
            state.page = 1;
            navigate('list');
            showToast('需求提交成功');
            return;
        }
        var detailTab = event.target.closest('[data-detail-tab]');
        if (detailTab) {
            state.detailTab = detailTab.dataset.detailTab;
            syncRoute('detail', state.activeId, state.detailTab, true);
            render();
            return;
        }
        var responseDecision = event.target.closest('[data-response-decision]');
        if (responseDecision) {
            openDecisionDialog(responseDecision.dataset.responseDecision, Number(responseDecision.dataset.responseIndex), responseDecision);
            return;
        }
        if (event.target.closest('[data-material-preview]')) { openDocumentPreview(); return; }
        if (event.target.closest('[data-material-download]')) { downloadMaterial(); }
    });

    panel.addEventListener('input', function (event) {
        if (event.target.matches('[data-demand-search]')) { state.keywordDraft = event.target.value; return; }
        if (event.target.matches('[data-scene-search]')) {
            state.sceneQuery = event.target.value;
            if (!state.sceneOpen) state.sceneOpen = true;
            var picker = event.target.closest('.dmd-scene-picker');
            if (picker) {
                var filtered = SCENE_OPTIONS.filter(function (scene) { return !state.sceneQuery || scene.indexOf(state.sceneQuery) >= 0; });
                var menu = picker.querySelector('.dmd-scene-menu');
                if (!menu) { render(); return; }
                menu.innerHTML = filtered.length ? filtered.map(function (scene) {
                    var checked = draft.scenes.indexOf(scene) >= 0;
                    return '<label class="dmd-scene-option' + (checked ? ' selected' : '') + '"><input type="checkbox" value="' + escapeHtml(scene) + '" data-scene-option ' + (checked ? 'checked' : '') + '><span>' + escapeHtml(scene) + '</span></label>';
                }).join('') : '<div class="dmd-scene-empty">未找到匹配场景</div>';
            }
            return;
        }
        if (event.target.matches('[data-keyword-input]')) { draft.keywordInput = event.target.value; return; }
        if (event.target.matches('[data-field]')) {
            var name = event.target.dataset.field;
            draft[name] = event.target.value;
            clearFieldError(name);
            var counter = event.target.parentElement.querySelector('.dmd-counter');
            if (counter) counter.textContent = event.target.value.length + '/' + event.target.maxLength;
        }
    });

    panel.addEventListener('focusin', function (event) {
        if (event.target.matches('[data-scene-search]') && !state.sceneOpen) {
            state.sceneOpen = true;
            state.openSelect = '';
            state.openCalendar = '';
            render();
            var input = panel.querySelector('[data-scene-search]');
            if (input) input.focus();
        }
    });

    panel.addEventListener('change', function (event) {
        if (event.target.matches('[data-demand-page-size]')) { state.pageSize = Number(event.target.value) || 10; state.page = 1; render(); return; }
        if (event.target.matches('[data-demand-jump]')) { state.page = Math.max(1, Number(event.target.value) || 1); render(); return; }
        if (event.target.matches('[data-scene-option]')) {
            var scene = event.target.value;
            var index = draft.scenes.indexOf(scene);
            if (event.target.checked && index < 0) draft.scenes.push(scene);
            if (!event.target.checked && index >= 0) draft.scenes.splice(index, 1);
            clearFieldError('scenes');
            render();
            var sceneInput = panel.querySelector('[data-scene-search]');
            if (sceneInput) sceneInput.focus();
            return;
        }
        if (event.target.matches('[data-field]')) {
            draft[event.target.dataset.field] = event.target.value;
            clearFieldError(event.target.dataset.field);
            return;
        }
        if (event.target.matches('[data-file-input]')) {
            var file = event.target.files && event.target.files[0];
            if (!file) return;
            if (file.size > 50 * 1024 * 1024) { showToast('补充材料大小不能超过50M', 'error'); return; }
            draft.supplement = file.name;
            render();
        }
    });

    panel.addEventListener('keydown', function (event) {
        if (event.target.matches('[data-demand-search]') && event.key === 'Enter') {
            event.preventDefault();
            state.keyword = state.keywordDraft;
            state.page = 1;
            render();
            return;
        }
        if (event.target.matches('[data-keyword-input]') && event.key === 'Enter') {
            event.preventDefault();
            var keyword = draft.keywordInput.trim();
            if (keyword && draft.keywords.indexOf(keyword) < 0) draft.keywords.push(keyword);
            draft.keywordInput = '';
            render();
        }
    });

    document.addEventListener('click', function (event) {
        var overlay = event.target.closest('[data-document-overlay]');
        if (overlay && event.target === overlay) closeDocumentPreview();
        if (state.view !== 'publish') return;
        if (!event.target.closest('.dmd-custom-select') && state.openSelect) { state.openSelect = ''; render(); return; }
        if (!event.target.closest('.dmd-scene-picker') && state.sceneOpen) { state.sceneOpen = false; state.sceneQuery = ''; render(); }
        if (!event.target.closest('.dmd-date-picker') && state.openCalendar) { state.openCalendar = ''; render(); }
    });

    document.addEventListener('click', function (event) {
        if (event.target.closest('[data-document-close]')) closeDocumentPreview();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && document.querySelector('[data-document-overlay]')) closeDocumentPreview();
        else if (event.key === 'Escape' && state.openCalendar) { state.openCalendar = ''; render(); }
    });

    window.addEventListener('popstate', function () {
        var route = new URLSearchParams(window.location.search || '');
        state.view = route.get('view') || 'list';
        state.activeId = route.get('id') || records[0].id;
        state.detailTab = route.get('tab') === 'responses' ? 'responses' : 'info';
        render();
    });

    render();
})();
