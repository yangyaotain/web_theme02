(function () {
    var RESOURCE_RECORDS = [
        {
            id: 'resource-001',
            name: '龙岗区商事主体登记基础信息',
            code: '70202607240010001000001234567890',
            industry: '公共管理、社会保障和社会组织',
            holder: '深圳市龙岗数智运营有限公司',
            source: '原始取得',
            updatedAt: '2026-07-24 16:32:18',
            status: '已登记'
        },
        {
            id: 'resource-002',
            name: '园区企业能耗采集数据集',
            code: '--',
            industry: '电力、热力、燃气及水生产和供应业',
            holder: '深圳市龙岗数智运营有限公司',
            source: '收集取得',
            updatedAt: '2026-07-23 11:08:42',
            status: '已退回'
        },
        {
            id: 'resource-003',
            name: '企业信用风险监测数据资源',
            code: '--',
            industry: '租赁和商务服务业',
            holder: '深圳市龙岗数智运营有限公司',
            source: '交易取得',
            updatedAt: '2026-07-22 17:45:09',
            status: '登记审核中'
        },
        {
            id: 'resource-004',
            name: '低空巡检影像数据资源',
            code: '70202607180010001000001234567913',
            industry: '科学研究和技术服务业',
            holder: '深圳市龙岗数智运营有限公司',
            source: '原始取得',
            updatedAt: '2026-07-21 09:26:35',
            status: '变更审核中'
        },
        {
            id: 'resource-005',
            name: '公共停车场实时泊位数据',
            code: '70202607150010001000001234567929',
            industry: '交通运输、仓储和邮政业',
            holder: '深圳市龙岗数智运营有限公司',
            source: '交易取得',
            updatedAt: '2026-07-19 15:18:27',
            status: '已注销'
        },
        {
            id: 'resource-006',
            name: '医疗机构执业许可信息',
            code: '--',
            industry: '卫生和社会工作',
            holder: '深圳市龙岗数智运营有限公司',
            source: '原始取得',
            updatedAt: '2026-07-18 13:42:56',
            status: '待登记'
        },
        {
            id: 'resource-007',
            name: '建筑工地扬尘监测数据',
            code: '70202607100010001000001234567961',
            industry: '建筑业',
            holder: '深圳市龙岗数智运营有限公司',
            source: '收集取得',
            updatedAt: '2026-07-16 18:05:14',
            status: '已登记'
        },
        {
            id: 'resource-008',
            name: '公交线路运行时刻数据',
            code: '70202607080010001000001234567977',
            industry: '交通运输、仓储和邮政业',
            holder: '深圳市龙岗数智运营有限公司',
            source: '原始取得',
            updatedAt: '2026-07-15 10:36:08',
            status: '已登记'
        },
        {
            id: 'resource-009',
            name: '惠企政策申报服务数据',
            code: '70202607060010001000001234567993',
            industry: '公共管理、社会保障和社会组织',
            holder: '深圳市龙岗数智运营有限公司',
            source: '交易取得',
            updatedAt: '2026-07-12 14:28:40',
            status: '已登记'
        },
        {
            id: 'resource-010',
            name: '社区养老服务设施名录',
            code: '70202607030010001000001234568006',
            industry: '卫生和社会工作',
            holder: '深圳市龙岗数智运营有限公司',
            source: '收集取得',
            updatedAt: '2026-07-10 09:51:22',
            status: '已登记'
        },
        {
            id: 'resource-011',
            name: '工业园区空间地理数据',
            code: '70202606300010001000001234568022',
            industry: '房地产业',
            holder: '深圳市龙岗数智运营有限公司',
            source: '原始取得',
            updatedAt: '2026-07-08 16:14:33',
            status: '已登记'
        },
        {
            id: 'resource-012',
            name: '重点项目建设进度数据',
            code: '70202606280010001000001234568038',
            industry: '建筑业',
            holder: '深圳市龙岗数智运营有限公司',
            source: '收集取得',
            updatedAt: '2026-07-06 11:37:25',
            status: '已登记'
        },
        {
            id: 'resource-013',
            name: '文化场馆活动排期数据',
            code: '70202606260010001000001234568054',
            industry: '文化、体育和娱乐业',
            holder: '深圳市龙岗数智运营有限公司',
            source: '原始取得',
            updatedAt: '2026-07-03 17:20:48',
            status: '已登记'
        },
        {
            id: 'resource-014',
            name: '河流水质监测数据',
            code: '70202606230010001000001234568070',
            industry: '水利、环境和公共设施管理业',
            holder: '深圳市龙岗数智运营有限公司',
            source: '收集取得',
            updatedAt: '2026-07-01 08:55:31',
            status: '已登记'
        },
        {
            id: 'resource-015',
            name: '城市部件巡查事件数据',
            code: '70202606200010001000001234568086',
            industry: '公共管理、社会保障和社会组织',
            holder: '深圳市龙岗数智运营有限公司',
            source: '原始取得',
            updatedAt: '2026-06-28 19:12:06',
            status: '已登记'
        },
        {
            id: 'resource-016',
            name: '技能人才岗位需求数据',
            code: '--',
            industry: '居民服务、修理和其他服务业',
            holder: '深圳市龙岗数智运营有限公司',
            source: '交易取得',
            updatedAt: '2026-06-25 15:40:17',
            status: '登记审核中'
        },
        {
            id: 'resource-017',
            name: '物流园区车辆通行数据',
            code: '70202606180010001000001234568102',
            industry: '交通运输、仓储和邮政业',
            holder: '深圳市龙岗数智运营有限公司',
            source: '收集取得',
            updatedAt: '2026-06-22 10:18:44',
            status: '已注销'
        }
    ];

    var ACTIONS_BY_STATUS = {
        '待登记': [
            { label: '编辑', icon: 'edit_square' },
            { label: '登记', icon: 'fact_check' },
            { label: '日志', icon: 'history' }
        ],
        '已登记': [
            { label: '变更', icon: 'edit_note' },
            { label: '注销', icon: 'do_not_disturb_on' },
            { label: '日志', icon: 'history' }
        ],
        '已退回': [
            { label: '编辑', icon: 'edit_square' },
            { label: '登记', icon: 'fact_check' },
            { label: '日志', icon: 'history' }
        ],
        '登记审核中': [
            { label: '日志', icon: 'history' }
        ],
        '变更审核中': [
            { label: '日志', icon: 'history' }
        ],
        '已注销': [
            { label: '日志', icon: 'history' }
        ]
    };

    var RESOURCE_FORM_EXAMPLE = {
        name: '园区企业综合能耗监测数据集',
        category: '企业数据',
        industry: '电力、热力、燃气及水生产和供应业',
        region: '深圳市龙岗区',
        updateFrequency: '24',
        updateUnit: '次/天',
        coverageStart: '2025-01-01',
        coverageEnd: '2026-12-31',
        developmentTerms: '面向经授权的园区运营方、节能服务机构和企业用户使用，使用过程中须遵守平台数据安全管理要求。',
        circulationType: '授权运营',
        holder: '深圳市龙岗数智运营有限公司',
        contact: '林晓雯',
        contactInfo: '13800138026',
        summary: '汇集龙岗区重点产业园区企业用电、用水、用气、峰值负荷及碳排放测算结果，为园区能耗分析、节能诊断和绿色运营提供数据支撑。',
        format: '数据库表',
        source: '收集取得',
        personalInfo: '否',
        code: '系统登记通过后自动生成',
        other: '数据按园区和日期形成日汇总记录，统计口径已完成统一，异常采集记录会在下一更新周期校正。'
    };

    var RESOURCE_DATA_ITEM_EXAMPLES = [
        { id: 'item-001', name: '园区编码', englishName: 'park_code', dataType: '字符串型C', dataLength: '32' },
        { id: 'item-002', name: '园区名称', englishName: 'park_name', dataType: '字符串型C', dataLength: '100' },
        { id: 'item-003', name: '统计日期', englishName: 'stat_date', dataType: '日期型D', dataLength: '10' },
        { id: 'item-004', name: '综合用电量', englishName: 'total_power', dataType: '数值型N', dataLength: '18,2' },
        { id: 'item-005', name: '综合用水量', englishName: 'total_water', dataType: '数值型N', dataLength: '18,2' },
        { id: 'item-006', name: '综合用气量', englishName: 'total_gas', dataType: '数值型N', dataLength: '18,2' },
        { id: 'item-007', name: '峰值负荷', englishName: 'peak_load', dataType: '数值型N', dataLength: '18,2' },
        { id: 'item-008', name: '碳排放量', englishName: 'carbon_emission', dataType: '数值型N', dataLength: '18,4' },
        { id: 'item-009', name: '数据更新时间', englishName: 'updated_at', dataType: '日期时间型T', dataLength: '19' },
        { id: 'item-010', name: '采集状态', englishName: 'collect_status', dataType: '字符串型C', dataLength: '20' }
    ];

    var DATA_TYPE_OPTIONS = ['字符串型C', '数值型N', '货币型Y', '日期型D', '日期时间型T', '逻辑型L'];

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character];
        });
    }

    function icon(name) {
        return '<span class="material-symbols-outlined" aria-hidden="true">' + escapeHtml(name) + '</span>';
    }

    function getStatusClass(status) {
        if (status === '待登记') return ' is-pending';
        if (status === '已退回') return ' is-returned';
        if (status === '登记审核中' || status === '变更审核中') return ' is-review';
        if (status === '已注销') return ' is-cancelled';
        return '';
    }

    function copyObject(source) {
        var result = {};
        Object.keys(source || {}).forEach(function (key) {
            result[key] = source[key];
        });
        return result;
    }

    function copyDataItems(items) {
        return (items || []).map(function (item) {
            return copyObject(item);
        });
    }

    function initSupplierResourceRegister() {
        var params = new URLSearchParams(window.location.search || '');
        if (params.get('menu') !== 'resource-register') return;

        var panel = document.querySelector('[data-consult-panel]');
        var title = document.querySelector('[data-center-title]');
        if (!panel) return;

        var state = {
            view: 'list',
            keyword: '',
            status: '全部',
            industry: '全部行业分类',
            source: '全部数据来源',
            startDate: '',
            endDate: '',
            filterOpen: true,
            page: 1,
            pageSize: 10,
            selected: {},
            formMode: 'create',
            formStep: 1,
            editingId: '',
            formData: copyObject(RESOURCE_FORM_EXAMPLE),
            dataItems: copyDataItems(RESOURCE_DATA_ITEM_EXAMPLES),
            selectedDataItems: {},
            itemDrawer: {
                open: false,
                mode: 'create',
                index: -1,
                draft: null
            }
        };
        var toastTimer = null;

        panel.classList.remove('is-placeholder', 'is-service-management', 'is-order-management', 'is-supplier-order-management', 'is-supplier-bill-management');
        panel.classList.add('is-resource-register-management');
        if (title) title.textContent = '资源登记管理';
        document.title = '资源登记管理 - 供方中心';

        function getIndustries() {
            return RESOURCE_RECORDS.reduce(function (result, item) {
                if (result.indexOf(item.industry) === -1) result.push(item.industry);
                return result;
            }, []).sort();
        }

        function getFilteredRecords() {
            var keyword = state.keyword.toLowerCase();
            return RESOURCE_RECORDS.filter(function (item) {
                var date = item.updatedAt.slice(0, 10);
                if (state.status !== '全部' && item.status !== state.status) return false;
                if (state.industry !== '全部行业分类' && item.industry !== state.industry) return false;
                if (state.source !== '全部数据来源' && item.source !== state.source) return false;
                if (state.startDate && date < state.startDate) return false;
                if (state.endDate && date > state.endDate) return false;
                if (!keyword) return true;
                return [item.name, item.code, item.industry, item.holder, item.source]
                    .join(' ')
                    .toLowerCase()
                    .indexOf(keyword) !== -1;
            });
        }

        function renderOptions(options, selected) {
            return options.map(function (option) {
                return '<option' + (option === selected ? ' selected' : '') + '>' + escapeHtml(option) + '</option>';
            }).join('');
        }

        function renderToolbar() {
            return ''
                + '<div class="resource-register-toolbar">'
                +   '<label class="resource-register-search">'
                +       '<input type="search" placeholder="请输入资源名称或标识码搜索" value="' + escapeHtml(state.keyword) + '" aria-label="搜索资源名称或标识码" data-resource-register-keyword>'
                +       icon('search')
                +   '</label>'
                +   '<label class="resource-register-status-field">'
                +       '<span class="resource-register-status-label">登记状态</span>'
                +       '<select class="resource-register-select" aria-label="登记状态" data-resource-register-status>'
                +           renderOptions(['全部', '待登记', '已登记', '已退回', '登记审核中', '变更审核中', '已注销'], state.status)
                +       '</select>'
                +   '</label>'
                +   '<button class="resource-register-filter-toggle' + (state.filterOpen ? ' active' : '') + '" type="button" aria-expanded="' + state.filterOpen + '" aria-controls="resourceRegisterFilterPanel" data-resource-register-filter-toggle>'
                +       icon('filter_alt')
                +       '<span>' + (state.filterOpen ? '收起筛选' : '展开筛选') + '</span>'
                +   '</button>'
                +   '<div class="resource-register-toolbar-actions">'
                +       '<button class="resource-register-toolbar-button" type="button" data-resource-register-toolbar-action="新增">' + icon('add') + '<span>新增</span></button>'
                +       '<button class="resource-register-toolbar-button" type="button" data-resource-register-toolbar-action="导出记录">' + icon('download') + '<span>导出记录</span></button>'
                +       '<button class="resource-register-toolbar-button is-primary" type="button" data-resource-register-toolbar-action="导入">' + icon('upload') + '<span>导入</span></button>'
                +       '<button class="resource-register-toolbar-button" type="button" data-resource-register-toolbar-action="更多">' + icon('more_vert') + '<span>更多</span></button>'
                +   '</div>'
                + '</div>';
        }

        function renderFilterPanel() {
            return ''
                + '<div class="resource-register-filter-panel" id="resourceRegisterFilterPanel"' + (state.filterOpen ? '' : ' hidden') + '>'
                +   '<select class="resource-register-filter-select" aria-label="资源所属行业分类" data-resource-register-industry>'
                +       renderOptions(['全部行业分类'].concat(getIndustries()), state.industry)
                +   '</select>'
                +   '<select class="resource-register-filter-select" aria-label="数据来源" data-resource-register-source>'
                +       renderOptions(['全部数据来源', '原始取得', '收集取得', '交易取得'], state.source)
                +   '</select>'
                +   '<div class="resource-register-date-range" aria-label="更新时间范围">'
                +       '<span>更新时间</span>'
                +       '<input class="resource-register-date-input" type="date" value="' + escapeHtml(state.startDate) + '" aria-label="更新时间开始日期" data-resource-register-start-date>'
                +       '<span class="resource-register-date-separator">-</span>'
                +       '<input class="resource-register-date-input" type="date" value="' + escapeHtml(state.endDate) + '" aria-label="更新时间结束日期" data-resource-register-end-date>'
                +   '</div>'
                +   '<button class="resource-register-filter-reset" type="button" data-resource-register-reset>' + icon('restart_alt') + '<span>重置</span></button>'
                + '</div>';
        }

        function renderActions(item) {
            return (ACTIONS_BY_STATUS[item.status] || []).map(function (action) {
                return ''
                    + '<button class="resource-register-action" type="button"'
                    + ' data-resource-register-action="' + escapeHtml(action.label) + '"'
                    + ' data-resource-register-id="' + escapeHtml(item.id) + '">'
                    + icon(action.icon)
                    + '<span>' + escapeHtml(action.label) + '</span>'
                    + '</button>';
            }).join('');
        }

        function renderRows(records) {
            if (!records.length) {
                return '<tr><td class="resource-register-empty" colspan="9">暂无符合条件的资源登记记录</td></tr>';
            }

            return records.map(function (item) {
                return ''
                    + '<tr>'
                    +   '<td class="col-check"><input class="resource-register-check" type="checkbox" aria-label="选择' + escapeHtml(item.name) + '" data-resource-register-check="' + escapeHtml(item.id) + '"' + (state.selected[item.id] ? ' checked' : '') + '></td>'
                    +   '<td class="resource-register-ellipsis"><button class="resource-register-name" type="button" title="' + escapeHtml(item.name) + '" data-resource-register-name="' + escapeHtml(item.id) + '">' + escapeHtml(item.name) + '</button></td>'
                    +   '<td class="resource-register-ellipsis" title="' + escapeHtml(item.code) + '">' + escapeHtml(item.code) + '</td>'
                    +   '<td class="resource-register-ellipsis" title="' + escapeHtml(item.industry) + '">' + escapeHtml(item.industry) + '</td>'
                    +   '<td class="resource-register-ellipsis" title="' + escapeHtml(item.holder) + '">' + escapeHtml(item.holder) + '</td>'
                    +   '<td>' + escapeHtml(item.source) + '</td>'
                    +   '<td>' + escapeHtml(item.updatedAt) + '</td>'
                    +   '<td class="resource-register-status-cell"><span class="resource-register-status' + getStatusClass(item.status) + '">' + escapeHtml(item.status) + '</span></td>'
                    +   '<td class="resource-register-action-cell"><div class="resource-register-actions">' + renderActions(item) + '</div></td>'
                    + '</tr>';
            }).join('');
        }

        function getPageData() {
            var filtered = getFilteredRecords();
            var totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
            if (state.page > totalPages) state.page = totalPages;
            if (state.page < 1) state.page = 1;
            var start = (state.page - 1) * state.pageSize;
            return {
                records: filtered.slice(start, start + state.pageSize),
                total: filtered.length,
                totalPages: totalPages
            };
        }

        function renderPagination(total, totalPages) {
            var pageButtons = [];
            for (var page = 1; page <= totalPages; page += 1) {
                pageButtons.push('<button class="resource-register-page-button' + (page === state.page ? ' active' : '') + '" type="button" data-resource-register-page="' + page + '">' + page + '</button>');
            }

            return ''
                + '<div class="resource-register-pagination">'
                +   '<span>共 ' + total + ' 条</span>'
                +   '<button class="resource-register-page-button" type="button" aria-label="上一页" data-resource-register-page="prev"' + (state.page <= 1 ? ' disabled' : '') + '>' + icon('chevron_left') + '</button>'
                +   pageButtons.join('')
                +   '<button class="resource-register-page-button" type="button" aria-label="下一页" data-resource-register-page="next"' + (state.page >= totalPages ? ' disabled' : '') + '>' + icon('chevron_right') + '</button>'
                +   '<select class="resource-register-page-size" aria-label="每页条数" data-resource-register-page-size>'
                +       '<option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10 条/页</option>'
                +       '<option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20 条/页</option>'
                +   '</select>'
                +   '<span>前往</span>'
                +   '<input class="resource-register-page-jump" type="number" min="1" max="' + totalPages + '" aria-label="前往页码" data-resource-register-page-jump>'
                + '</div>';
        }

        function renderTable() {
            var pageData = getPageData();
            var allPageSelected = pageData.records.length && pageData.records.every(function (item) { return state.selected[item.id]; });

            return ''
                + '<div class="resource-register-table-card">'
                +   '<div class="resource-register-table-scroll" aria-label="资源登记管理列表，可横向滚动">'
                +       '<table class="resource-register-table">'
                +           '<colgroup>'
                +               '<col class="col-check"><col class="col-name"><col class="col-code"><col class="col-industry"><col class="col-holder">'
                +               '<col class="col-source"><col class="col-updated"><col class="col-status"><col class="col-actions">'
                +           '</colgroup>'
                +           '<thead><tr>'
                +               '<th class="col-check"><input class="resource-register-check" type="checkbox" aria-label="选择当前页全部记录" data-resource-register-check-all' + (allPageSelected ? ' checked' : '') + '></th>'
                +               '<th>资源名称</th><th>数据资源标识码</th><th>资源所属行业分类</th><th>资源持有方</th>'
                +               '<th>数据来源</th><th>更新时间</th><th class="resource-register-status-cell">登记状态</th><th class="resource-register-action-cell">操作</th>'
                +           '</tr></thead>'
                +           '<tbody>' + renderRows(pageData.records) + '</tbody>'
                +       '</table>'
                +   '</div>'
                +   renderPagination(pageData.total, pageData.totalPages)
                + '</div>';
        }

        function getRecordById(id) {
            return RESOURCE_RECORDS.find(function (item) {
                return item.id === id;
            });
        }

        function getEditorTitle() {
            return state.formMode === 'create' ? '新增' : '编辑';
        }

        function getFormDataForRecord(item) {
            var formData = copyObject(RESOURCE_FORM_EXAMPLE);
            if (!item) return formData;
            var hasSavedForm = !!item.formData;
            if (item.formData) {
                Object.keys(item.formData).forEach(function (key) {
                    formData[key] = item.formData[key];
                });
            }
            formData.name = item.name;
            formData.industry = item.industry;
            formData.holder = item.holder;
            formData.source = item.source;
            formData.code = item.code === '--' ? '系统登记通过后自动生成' : item.code;
            if (!hasSavedForm) {
                formData.summary = item.name + '汇集业务运行过程中形成的主题数据，已完成字段口径、更新周期和质量校验规则整理，可用于平台授权范围内的数据分析与场景应用。';
                formData.developmentTerms = '仅限经平台审核通过的业务场景使用，使用方须落实访问控制、使用留痕和成果合规管理要求。';
                formData.other = '当前资源已完成基础目录梳理，本次编辑同步补充数据项定义、更新时间范围和使用条件。';
            }
            return formData;
        }

        function openEditor(mode, id) {
            var item = id ? getRecordById(id) : null;
            state.view = 'form';
            state.formMode = mode || 'create';
            state.formStep = 1;
            state.editingId = item ? item.id : '';
            state.formData = getFormDataForRecord(item);
            state.dataItems = copyDataItems(item && item.dataItems ? item.dataItems : RESOURCE_DATA_ITEM_EXAMPLES);
            state.selectedDataItems = {};
            state.itemDrawer = { open: false, mode: 'create', index: -1, draft: null };
            render();
        }

        function closeEditor() {
            state.view = 'list';
            state.formStep = 1;
            state.editingId = '';
            state.itemDrawer = { open: false, mode: 'create', index: -1, draft: null };
            render();
        }

        function renderEditorHeader() {
            var isSecondStep = state.formStep === 2;
            return ''
                + '<header class="resource-editor-header">'
                +   '<button class="resource-editor-back" type="button" data-resource-editor-action="cancel">' + icon('arrow_back') + '<span>' + getEditorTitle() + '</span></button>'
                +   '<div class="resource-editor-steps" aria-label="资源登记步骤">'
                +       '<button class="resource-editor-step' + (isSecondStep ? ' complete' : ' active') + '" type="button" data-resource-editor-step="1">'
                +           '<i>' + (isSecondStep ? icon('check') : '1') + '</i><span>基本信息</span>'
                +       '</button>'
                +       '<span class="resource-editor-step-line' + (isSecondStep ? ' active' : '') + '"></span>'
                +       '<button class="resource-editor-step' + (isSecondStep ? ' active' : '') + '" type="button" data-resource-editor-step="2"' + (isSecondStep ? '' : ' disabled') + '>'
                +           '<i>2</i><span>数据项信息</span>'
                +       '</button>'
                +   '</div>'
                + '</header>';
        }

        function renderFormLabel(label, required, helpText) {
            return ''
                + '<span class="resource-editor-form-label">'
                +   (required ? '<em>*</em>' : '')
                +   escapeHtml(label)
                +   (helpText ? '<span class="material-symbols-outlined resource-editor-help" title="' + escapeHtml(helpText) + '">help_outline</span>' : '')
                + '</span>';
        }

        function renderFormRow(label, control, required, helpText, extraClass) {
            return ''
                + '<label class="resource-editor-form-row' + (extraClass ? ' ' + extraClass : '') + '">'
                +   renderFormLabel(label, required, helpText)
                +   '<span class="resource-editor-form-control">' + control + '</span>'
                + '</label>';
        }

        function renderFormSelect(field, options, value, required) {
            return '<select data-resource-form-field="' + escapeHtml(field) + '"' + (required ? ' required' : '') + '>'
                + renderOptions(options, value)
                + '</select>';
        }

        function renderRadioGroup(field, options, value) {
            return '<span class="resource-editor-radio-group">' + options.map(function (option) {
                return '<label><input type="radio" name="resource-' + escapeHtml(field) + '" value="' + escapeHtml(option) + '" data-resource-form-field="' + escapeHtml(field) + '"' + (option === value ? ' checked' : '') + '><span>' + escapeHtml(option) + '</span></label>';
            }).join('') + '</span>';
        }

        function renderBasicInfoStep() {
            var form = state.formData;
            return ''
                + '<div class="resource-editor-body resource-editor-basic-body">'
                +   '<form class="resource-editor-basic-form" novalidate data-resource-basic-form>'
                +       renderFormRow('资源名称', '<input type="text" maxlength="100" value="' + escapeHtml(form.name) + '" data-resource-form-field="name" required>', true, '用于资源目录展示和检索。')
                +       renderFormRow('资源类别', renderFormSelect('category', ['公共数据', '企业数据', '个人数据'], form.category, true), true)
                +       renderFormRow('资源所属行业分类', renderFormSelect('industry', getIndustries(), form.industry, true), true, '按照资源主要业务归属选择行业分类。')
                +       renderFormRow('地域分类', renderFormSelect('region', ['深圳市龙岗区', '深圳市', '广东省', '全国'], form.region, false), false, '用于标识资源覆盖的主要地域范围。')
                +       renderFormRow('更新频率', ''
                +           '<span class="resource-editor-composite">'
                +               '<input type="number" min="1" max="999" value="' + escapeHtml(form.updateFrequency) + '" data-resource-form-field="updateFrequency" required>'
                +               renderFormSelect('updateUnit', ['次/天', '次/月', '次/年', '实时'], form.updateUnit, true)
                +           '</span>', true, '资源数据的常规更新周期。')
                +       renderFormRow('覆盖时间范围', ''
                +           '<span class="resource-editor-date-range">'
                +               '<input type="date" value="' + escapeHtml(form.coverageStart) + '" data-resource-form-field="coverageStart" required>'
                +               '<b>-</b>'
                +               '<input type="date" value="' + escapeHtml(form.coverageEnd) + '" data-resource-form-field="coverageEnd" required>'
                +           '</span>', true)
                +       renderFormRow('开发利用条件', ''
                +           '<span class="resource-editor-textarea">'
                +               '<textarea maxlength="255" data-resource-form-field="developmentTerms">' + escapeHtml(form.developmentTerms) + '</textarea>'
                +               '<i data-resource-counter="developmentTerms">' + form.developmentTerms.length + '/255</i>'
                +           '</span>', false)
                +       renderFormRow('流通类型', renderFormSelect('circulationType', ['授权运营', '公开共享', '协议交易', '定向交付'], form.circulationType, true), true)
                +       renderFormRow('资源持有方', renderFormSelect('holder', ['深圳市龙岗数智运营有限公司', '深圳市龙岗产业服务有限公司', '龙岗区智慧园区运营中心'], form.holder, true), true, '登记资源权属或合法持有主体。')
                +       renderFormRow('联系人', '<input type="text" maxlength="30" value="' + escapeHtml(form.contact) + '" data-resource-form-field="contact" required>', true, '负责资源登记和后续业务对接的联系人。')
                +       renderFormRow('联系方式', '<input type="tel" maxlength="20" value="' + escapeHtml(form.contactInfo) + '" data-resource-form-field="contactInfo" required>', true, '请输入有效手机号码或固定电话。')
                +       renderFormRow('资源摘要', ''
                +           '<span class="resource-editor-textarea">'
                +               '<textarea maxlength="500" data-resource-form-field="summary" required>' + escapeHtml(form.summary) + '</textarea>'
                +               '<i data-resource-counter="summary">' + form.summary.length + '/500</i>'
                +           '</span>', true, '简要说明资源内容、覆盖范围和使用价值。')
                +       renderFormRow('资源格式', renderFormSelect('format', ['数据库表', 'API接口', 'Excel文件', 'CSV文件', 'JSON文件'], form.format, true), true, '资源当前主要存储或交付格式。')
                +       renderFormRow('数据来源', renderRadioGroup('source', ['原始取得', '收集取得', '交易取得', '其他'], form.source), true, '资源形成或取得方式。')
                +       renderFormRow('是否涉及个人信息', renderRadioGroup('personalInfo', ['否', '是'], form.personalInfo), true, '涉及个人信息时须满足相应合规要求。')
                +       renderFormRow('数据资源标识码', '<input type="text" value="' + escapeHtml(form.code) + '" disabled aria-label="数据资源标识码">', false)
                +       renderFormRow('其他', ''
                +           '<span class="resource-editor-textarea">'
                +               '<textarea maxlength="500" data-resource-form-field="other">' + escapeHtml(form.other) + '</textarea>'
                +               '<i data-resource-counter="other">' + form.other.length + '/500</i>'
                +           '</span>', false)
                +   '</form>'
                + '</div>';
        }

        function renderDataItemRows() {
            if (!state.dataItems.length) {
                return '<tr><td class="resource-editor-item-empty" colspan="6">暂无数据项，请点击“新增”补充字段</td></tr>';
            }

            return state.dataItems.map(function (item, index) {
                return ''
                    + '<tr>'
                    +   '<td class="col-check"><input class="resource-register-check" type="checkbox" aria-label="选择' + escapeHtml(item.name) + '" data-resource-item-select="' + index + '"' + (state.selectedDataItems[item.id] ? ' checked' : '') + '></td>'
                    +   '<td>' + escapeHtml(item.name) + '</td>'
                    +   '<td>' + escapeHtml(item.englishName) + '</td>'
                    +   '<td>' + escapeHtml(item.dataType) + '</td>'
                    +   '<td>' + escapeHtml(item.dataLength) + '</td>'
                    +   '<td class="resource-editor-item-action-cell"><div class="resource-editor-item-actions">'
                    +       '<button type="button" data-resource-item-action="edit" data-resource-item-index="' + index + '">' + icon('edit_square') + '<span>编辑</span></button>'
                    +       '<button type="button" data-resource-item-action="delete" data-resource-item-index="' + index + '">' + icon('delete') + '<span>删除</span></button>'
                    +   '</div></td>'
                    + '</tr>';
            }).join('');
        }

        function renderDataItemsStep() {
            var allSelected = state.dataItems.length && state.dataItems.every(function (item) {
                return state.selectedDataItems[item.id];
            });
            return ''
                + '<div class="resource-editor-body resource-editor-items-body">'
                +   '<div class="resource-editor-items-toolbar">'
                +       '<select aria-label="选择数据库表" data-resource-database-table>'
                +           '<option>园区企业能耗日汇总表（lg_park_energy_daily）</option>'
                +           '<option>园区能耗采集设备表（lg_park_energy_device）</option>'
                +           '<option>园区碳排放测算明细表（lg_park_carbon_detail）</option>'
                +       '</select>'
                +       '<div>'
                +           '<button type="button" data-resource-item-import>' + icon('upload_file') + '<span>导入</span></button>'
                +           '<button class="primary" type="button" data-resource-item-add>' + icon('add') + '<span>新增</span></button>'
                +       '</div>'
                +   '</div>'
                +   '<div class="resource-editor-items-table-scroll">'
                +       '<table class="resource-editor-items-table">'
                +           '<colgroup><col class="col-check"><col><col><col><col><col class="col-actions"></colgroup>'
                +           '<thead><tr>'
                +               '<th class="col-check"><input class="resource-register-check" type="checkbox" aria-label="选择全部数据项" data-resource-item-select-all' + (allSelected ? ' checked' : '') + '></th>'
                +               '<th>信息项名称</th><th>信息项英文名</th><th>数据类型</th><th>数据长度</th><th class="resource-editor-item-action-cell">操作</th>'
                +           '</tr></thead>'
                +           '<tbody>' + renderDataItemRows() + '</tbody>'
                +       '</table>'
                +   '</div>'
                + '</div>';
        }

        function renderDataItemDrawer() {
            if (!state.itemDrawer.open || !state.itemDrawer.draft) return '';
            var draft = state.itemDrawer.draft;
            var isCreate = state.itemDrawer.mode === 'create';
            return ''
                + '<div class="resource-item-drawer-mask" data-resource-item-drawer-close></div>'
                + '<aside class="resource-item-drawer" role="dialog" aria-modal="true" aria-labelledby="resourceItemDrawerTitle">'
                +   '<header>'
                +       '<button type="button" aria-label="关闭数据项表单" data-resource-item-drawer-close>' + icon('close') + '</button>'
                +       '<h2 id="resourceItemDrawerTitle">' + (isCreate ? '新增数据项' : '编辑数据项') + '</h2>'
                +   '</header>'
                +   '<div class="resource-item-drawer-body">'
                +       '<label><span>信息项名称' + icon('help_outline') + '</span><input type="text" maxlength="50" value="' + escapeHtml(draft.name) + '" data-resource-item-field="name"></label>'
                +       '<label><span>信息项英文名' + icon('help_outline') + '</span><input type="text" maxlength="50" value="' + escapeHtml(draft.englishName) + '" data-resource-item-field="englishName"></label>'
                +       '<label><span>数据类型' + icon('help_outline') + '</span><select data-resource-item-field="dataType">' + renderOptions(DATA_TYPE_OPTIONS, draft.dataType) + '</select></label>'
                +       '<label><span>数据长度' + icon('help_outline') + '</span><input type="text" maxlength="12" value="' + escapeHtml(draft.dataLength) + '" data-resource-item-field="dataLength"></label>'
                +   '</div>'
                +   '<footer>'
                +       '<button type="button" data-resource-item-drawer-close>' + icon('close') + '<span>取消</span></button>'
                +       '<button class="primary" type="button" data-resource-item-confirm>' + icon(isCreate ? 'save' : 'update') + '<span>' + (isCreate ? '保存' : '更新') + '</span></button>'
                +   '</footer>'
                + '</aside>';
        }

        function renderEditorFooter() {
            var isSecondStep = state.formStep === 2;
            if (!isSecondStep) {
                return ''
                    + '<footer class="resource-editor-footer">'
                    +   '<button type="button" data-resource-editor-action="cancel">' + icon('close') + '<span>取消</span></button>'
                    +   '<button class="primary" type="button" data-resource-editor-action="next">' + icon('arrow_forward') + '<span>下一步</span></button>'
                    + '</footer>';
            }

            return ''
                + '<footer class="resource-editor-footer">'
                +   '<button type="button" data-resource-editor-action="cancel">' + icon('close') + '<span>取消</span></button>'
                +   '<button type="button" data-resource-editor-action="previous">' + icon('arrow_back') + '<span>上一步</span></button>'
                +   (state.formMode === 'create'
                    ? '<button type="button" data-resource-editor-action="save">' + icon('save') + '<span>保存</span></button>'
                        + '<button class="primary" type="button" data-resource-editor-action="register">' + icon('fact_check') + '<span>登记</span></button>'
                    : '<button class="primary" type="button" data-resource-editor-action="update">' + icon('update') + '<span>更新</span></button>')
                + '</footer>';
        }

        function renderEditor() {
            panel.classList.remove('is-placeholder', 'is-service-management', 'is-order-management', 'is-supplier-order-management', 'is-supplier-bill-management', 'is-resource-register-management');
            panel.classList.add('is-resource-register-editor');
            if (title) title.style.display = 'none';
            document.title = getEditorTitle() + '资源登记 - 供方中心';
            panel.innerHTML = ''
                + '<div class="resource-register-editor">'
                +   renderEditorHeader()
                +   (state.formStep === 1 ? renderBasicInfoStep() : renderDataItemsStep())
                +   renderEditorFooter()
                + '</div>'
                + '<div class="resource-register-toast" role="status" aria-live="polite" data-resource-register-toast hidden>' + icon('check_circle') + '<span></span></div>'
                + renderDataItemDrawer();
            bindEditorEvents();
        }

        function validateBasicForm() {
            var requiredFields = ['name', 'category', 'industry', 'updateFrequency', 'updateUnit', 'coverageStart', 'coverageEnd', 'circulationType', 'holder', 'contact', 'contactInfo', 'summary', 'format', 'source', 'personalInfo'];
            var missing = requiredFields.some(function (field) {
                return !String(state.formData[field] || '').trim();
            });
            if (missing) {
                showToast('请完整填写带星号的必填信息。');
                return false;
            }
            if (state.formData.coverageStart > state.formData.coverageEnd) {
                showToast('覆盖时间的开始日期不能晚于结束日期。');
                return false;
            }
            return true;
        }

        function submitResourceForm(action) {
            if (!state.dataItems.length) {
                showToast('请至少保留一个数据项后再继续。');
                return;
            }

            var nowText = '2026-07-27 10:30:00';
            var item = state.editingId ? getRecordById(state.editingId) : null;
            if (state.formMode === 'create') {
                var isSave = action === 'save';
                var newRecord = {
                    id: 'resource-' + String(RESOURCE_RECORDS.length + 1).padStart(3, '0'),
                    name: state.formData.name,
                    code: '--',
                    industry: state.formData.industry,
                    holder: state.formData.holder,
                    source: state.formData.source,
                    updatedAt: nowText,
                    status: isSave ? '待登记' : '登记审核中',
                    formData: copyObject(state.formData),
                    dataItems: copyDataItems(state.dataItems)
                };
                RESOURCE_RECORDS.unshift(newRecord);
            } else if (item) {
                item.name = state.formData.name;
                item.industry = state.formData.industry;
                item.holder = state.formData.holder;
                item.source = state.formData.source;
                item.updatedAt = nowText;
                if (state.formMode === 'change') item.status = '变更审核中';
                item.formData = copyObject(state.formData);
                item.dataItems = copyDataItems(state.dataItems);
            }

            var message = '资源信息已更新。';
            if (state.formMode === 'create') {
                message = action === 'save'
                    ? '资源信息已保存，当前状态为“待登记”。'
                    : '资源登记申请已提交，当前状态为“登记审核中”。';
            } else if (state.formMode === 'change') {
                message = '资源变更信息已更新，当前状态为“变更审核中”。';
            }
            state.view = 'list';
            state.formStep = 1;
            state.page = 1;
            render();
            showToast(message);
        }

        function openDataItemDrawer(mode, index) {
            var isCreate = mode === 'create';
            state.itemDrawer = {
                open: true,
                mode: isCreate ? 'create' : 'edit',
                index: isCreate ? -1 : index,
                draft: isCreate ? {
                    id: 'item-' + String(state.dataItems.length + 1).padStart(3, '0'),
                    name: '园区运营状态',
                    englishName: 'operation_status',
                    dataType: '字符串型C',
                    dataLength: '20'
                } : copyObject(state.dataItems[index])
            };
            render();
        }

        function saveDataItemDrawer() {
            var draft = state.itemDrawer.draft;
            panel.querySelectorAll('[data-resource-item-field]').forEach(function (field) {
                draft[field.dataset.resourceItemField] = field.value.trim();
            });
            if (!draft.name || !draft.englishName || !draft.dataType || !draft.dataLength) {
                showToast('请完整填写数据项名称、英文名、数据类型和数据长度。');
                return;
            }
            if (state.itemDrawer.mode === 'create') {
                state.dataItems.push(copyObject(draft));
            } else if (state.itemDrawer.index >= 0) {
                state.dataItems[state.itemDrawer.index] = copyObject(draft);
            }
            var message = state.itemDrawer.mode === 'create' ? '数据项已保存。' : '数据项已更新。';
            state.itemDrawer = { open: false, mode: 'create', index: -1, draft: null };
            render();
            showToast(message);
        }

        function bindEditorEvents() {
            panel.querySelectorAll('[data-resource-form-field]').forEach(function (field) {
                var eventName = field.tagName === 'SELECT' || field.type === 'radio' ? 'change' : 'input';
                field.addEventListener(eventName, function () {
                    if (this.type === 'radio' && !this.checked) return;
                    state.formData[this.dataset.resourceFormField] = this.value;
                    var counter = panel.querySelector('[data-resource-counter="' + this.dataset.resourceFormField + '"]');
                    if (counter) counter.textContent = this.value.length + '/' + (this.maxLength > 0 ? this.maxLength : 500);
                });
            });

            panel.querySelectorAll('[data-resource-editor-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var action = this.dataset.resourceEditorAction;
                    if (action === 'cancel') closeEditor();
                    else if (action === 'next' && validateBasicForm()) {
                        state.formStep = 2;
                        render();
                    } else if (action === 'previous') {
                        state.formStep = 1;
                        render();
                    } else if (action === 'save' || action === 'register' || action === 'update') {
                        submitResourceForm(action);
                    }
                });
            });

            panel.querySelectorAll('[data-resource-editor-step]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.disabled) return;
                    state.formStep = parseInt(this.dataset.resourceEditorStep, 10) || 1;
                    render();
                });
            });

            var addItem = panel.querySelector('[data-resource-item-add]');
            if (addItem) addItem.addEventListener('click', function () { openDataItemDrawer('create', -1); });

            var importItems = panel.querySelector('[data-resource-item-import]');
            if (importItems) importItems.addEventListener('click', function () {
                showToast('已载入数据库表字段示例，可继续新增或编辑数据项。');
            });

            panel.querySelectorAll('[data-resource-item-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var index = parseInt(this.dataset.resourceItemIndex, 10);
                    if (this.dataset.resourceItemAction === 'edit') {
                        openDataItemDrawer('edit', index);
                        return;
                    }
                    var removed = state.dataItems.splice(index, 1)[0];
                    if (removed) delete state.selectedDataItems[removed.id];
                    render();
                    showToast('数据项已删除。');
                });
            });

            panel.querySelectorAll('[data-resource-item-select]').forEach(function (checkbox) {
                checkbox.addEventListener('change', function () {
                    var item = state.dataItems[parseInt(this.dataset.resourceItemSelect, 10)];
                    if (item) state.selectedDataItems[item.id] = this.checked;
                });
            });

            var selectAllItems = panel.querySelector('[data-resource-item-select-all]');
            if (selectAllItems) {
                selectAllItems.addEventListener('change', function () {
                    var checked = this.checked;
                    state.dataItems.forEach(function (item) {
                        state.selectedDataItems[item.id] = checked;
                    });
                    render();
                });
            }

            panel.querySelectorAll('[data-resource-item-drawer-close]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.itemDrawer = { open: false, mode: 'create', index: -1, draft: null };
                    render();
                });
            });

            var confirmItem = panel.querySelector('[data-resource-item-confirm]');
            if (confirmItem) confirmItem.addEventListener('click', saveDataItemDrawer);
        }

        function render() {
            if (state.view === 'form') {
                renderEditor();
                return;
            }
            panel.classList.remove('is-resource-register-editor');
            panel.classList.add('is-resource-register-management');
            if (title) {
                title.style.display = '';
                title.textContent = '资源登记管理';
            }
            document.title = '资源登记管理 - 供方中心';
            panel.innerHTML = ''
                + '<div class="resource-register-board">'
                +   renderToolbar()
                +   renderFilterPanel()
                +   renderTable()
                + '</div>'
                + '<div class="resource-register-toast" role="status" aria-live="polite" data-resource-register-toast hidden>' + icon('check_circle') + '<span></span></div>';
            bindEvents();
        }

        function showToast(message) {
            var toast = panel.querySelector('[data-resource-register-toast]');
            if (!toast) return;
            toast.querySelector('span').textContent = message;
            toast.hidden = false;
            toast.classList.remove('show');
            void toast.offsetWidth;
            toast.classList.add('show');
            window.clearTimeout(toastTimer);
            toastTimer = window.setTimeout(function () {
                toast.classList.remove('show');
                window.setTimeout(function () {
                    if (!toast.classList.contains('show')) toast.hidden = true;
                }, 200);
            }, 2200);
        }

        function changePage(value) {
            var totalPages = Math.max(1, Math.ceil(getFilteredRecords().length / state.pageSize));
            state.page = Math.min(totalPages, Math.max(1, parseInt(value, 10) || 1));
            render();
        }

        function bindSelect(selector, stateKey) {
            var select = panel.querySelector(selector);
            if (!select) return;
            select.addEventListener('change', function () {
                state[stateKey] = this.value;
                state.page = 1;
                render();
            });
        }

        function bindDate(selector, stateKey) {
            var input = panel.querySelector(selector);
            if (!input) return;
            input.addEventListener('change', function () {
                state[stateKey] = this.value;
                state.page = 1;
                render();
            });
        }

        function bindEvents() {
            var keyword = panel.querySelector('[data-resource-register-keyword]');
            if (keyword) {
                keyword.addEventListener('keydown', function (event) {
                    if (event.key !== 'Enter') return;
                    state.keyword = this.value.trim();
                    state.page = 1;
                    render();
                });
                keyword.addEventListener('change', function () {
                    state.keyword = this.value.trim();
                    state.page = 1;
                    render();
                });
            }

            bindSelect('[data-resource-register-status]', 'status');
            bindSelect('[data-resource-register-industry]', 'industry');
            bindSelect('[data-resource-register-source]', 'source');
            bindDate('[data-resource-register-start-date]', 'startDate');
            bindDate('[data-resource-register-end-date]', 'endDate');

            var filterToggle = panel.querySelector('[data-resource-register-filter-toggle]');
            if (filterToggle) {
                filterToggle.addEventListener('click', function () {
                    state.filterOpen = !state.filterOpen;
                    render();
                });
            }

            var reset = panel.querySelector('[data-resource-register-reset]');
            if (reset) {
                reset.addEventListener('click', function () {
                    state.keyword = '';
                    state.status = '全部';
                    state.industry = '全部行业分类';
                    state.source = '全部数据来源';
                    state.startDate = '';
                    state.endDate = '';
                    state.page = 1;
                    render();
                });
            }

            panel.querySelectorAll('[data-resource-register-page]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.disabled) return;
                    var target = this.dataset.resourceRegisterPage;
                    if (target === 'prev') changePage(state.page - 1);
                    else if (target === 'next') changePage(state.page + 1);
                    else changePage(target);
                });
            });

            var pageSize = panel.querySelector('[data-resource-register-page-size]');
            if (pageSize) {
                pageSize.addEventListener('change', function () {
                    state.pageSize = parseInt(this.value, 10) || 10;
                    state.page = 1;
                    render();
                });
            }

            var pageJump = panel.querySelector('[data-resource-register-page-jump]');
            if (pageJump) {
                pageJump.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') changePage(this.value);
                });
                pageJump.addEventListener('change', function () {
                    if (this.value) changePage(this.value);
                });
            }

            var checkAll = panel.querySelector('[data-resource-register-check-all]');
            if (checkAll) {
                checkAll.addEventListener('change', function () {
                    var checked = this.checked;
                    getPageData().records.forEach(function (item) {
                        state.selected[item.id] = checked;
                    });
                    render();
                });
            }

            panel.querySelectorAll('[data-resource-register-check]').forEach(function (checkbox) {
                checkbox.addEventListener('change', function () {
                    state.selected[this.dataset.resourceRegisterCheck] = this.checked;
                });
            });

            panel.querySelectorAll('[data-resource-register-toolbar-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var action = this.dataset.resourceRegisterToolbarAction;
                    if (action === '新增') {
                        openEditor('create', '');
                        return;
                    }
                    showToast(action + '功能将在后续设计。');
                });
            });

            panel.querySelectorAll('[data-resource-register-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var action = this.dataset.resourceRegisterAction;
                    if (action === '编辑' || action === '变更') {
                        openEditor(action === '变更' ? 'change' : 'edit', this.dataset.resourceRegisterId);
                        return;
                    }
                    if (action === '登记') {
                        var record = getRecordById(this.dataset.resourceRegisterId);
                        if (record && (record.status === '待登记' || record.status === '已退回')) {
                            record.status = '登记审核中';
                            record.updatedAt = '2026-07-27 10:30:00';
                            render();
                            showToast('资源登记申请已提交，当前状态为“登记审核中”。');
                            return;
                        }
                    }
                    showToast(action + '功能将在后续设计。');
                });
            });

            panel.querySelectorAll('[data-resource-register-name]').forEach(function (button) {
                button.addEventListener('click', function () {
                    showToast('资源详情将在后续设计，本次仅完成资源登记列表。');
                });
            });
        }

        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSupplierResourceRegister);
    } else {
        initSupplierResourceRegister();
    }
})();
