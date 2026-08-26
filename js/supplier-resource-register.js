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

    var RESOURCE_TABLE_TREE = [
        {
            id: 'catalog-park',
            label: '园区运营',
            children: [
                {
                    id: 'catalog-park-energy',
                    label: '能耗管理',
                    children: [
                        { id: 'table-park-energy-daily', label: '园区企业能耗日汇总表', code: 'lg_park_energy_daily' },
                        { id: 'table-park-energy-device', label: '园区能耗采集设备表', code: 'lg_park_energy_device' },
                        { id: 'table-park-carbon-detail', label: '园区碳排放测算明细表', code: 'lg_park_carbon_detail' }
                    ]
                },
                {
                    id: 'catalog-park-enterprise',
                    label: '企业服务',
                    children: [
                        { id: 'table-park-enterprise-profile', label: '园区企业基础信息表', code: 'lg_park_enterprise_profile' },
                        { id: 'table-park-enterprise-operation', label: '园区企业经营状态表', code: 'lg_park_enterprise_operation' }
                    ]
                }
            ]
        },
        {
            id: 'catalog-industry',
            label: '产业发展',
            children: [
                {
                    id: 'catalog-industry-monitor',
                    label: '产业监测',
                    children: [
                        { id: 'table-industry-distribution', label: '产业空间分布统计表', code: 'lg_industry_distribution' },
                        { id: 'table-industry-chain', label: '产业链企业关联表', code: 'lg_industry_chain_relation' }
                    ]
                }
            ]
        }
    ];

    var SAMPLE_UPLOAD_FIELDS = {
        dataset: {
            key: 'sampleDataset',
            label: '数据集样例',
            accept: '.xls,.xlsx',
            extensions: ['xls', 'xlsx'],
            maxSize: 30,
            maxCount: 1,
            description: '支持 .xls、.xlsx，单个文件不超过 30MB，最多导入 1 个 Excel 文件'
        },
        other: {
            key: 'sampleOther',
            label: '其他样例',
            maxSize: 2048,
            maxSizeText: '2GB',
            maxCount: null,
            multiple: true,
            description: '支持多个附件上传，单个文件大小不超过2GB。'
        }
    };

    var SAMPLE_API_TREE = [
        {
            id: 'enterprise',
            label: '企业服务',
            children: [
                {
                    id: 'enterprise-subject',
                    label: '商事主体',
                    children: [
                        { id: 'api-enterprise-profile', label: '企业基础信息查询 API', code: 'API-LG-ENT-001', method: 'GET', path: '/v1/enterprises/profile' },
                        { id: 'api-enterprise-status', label: '企业经营状态查询 API', code: 'API-LG-ENT-002', method: 'GET', path: '/v1/enterprises/status' }
                    ]
                },
                {
                    id: 'enterprise-vitality',
                    label: '经营活力',
                    children: [
                        { id: 'api-enterprise-vitality', label: '企业经营活力指数 API', code: 'API-LG-ENT-006', method: 'POST', path: '/v1/enterprises/vitality' }
                    ]
                }
            ]
        },
        {
            id: 'industry',
            label: '产业发展',
            children: [
                {
                    id: 'industry-chain',
                    label: '产业链分析',
                    children: [
                        { id: 'api-industry-distribution', label: '产业空间分布查询 API', code: 'API-LG-IND-003', method: 'GET', path: '/v1/industries/distribution' },
                        { id: 'api-industry-match', label: '产业链供需匹配 API', code: 'API-LG-IND-008', method: 'POST', path: '/v1/industries/match' }
                    ]
                }
            ]
        },
        {
            id: 'park',
            label: '园区运营',
            children: [
                {
                    id: 'park-operation',
                    label: '园区运行',
                    children: [
                        { id: 'api-park-company', label: '园区企业名录查询 API', code: 'API-LG-PARK-002', method: 'GET', path: '/v1/parks/enterprises' }
                    ]
                }
            ]
        }
    ];

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

    function defaultTableTreeConfig() {
        return {
            selectedId: 'table-park-energy-daily',
            query: '',
            open: false,
            expanded: ['catalog-park', 'catalog-park-energy']
        };
    }

    function copyTableTreeConfig(source) {
        var config = source || defaultTableTreeConfig();
        return {
            selectedId: config.selectedId || 'table-park-energy-daily',
            query: '',
            open: false,
            expanded: (config.expanded || []).slice()
        };
    }

    function emptySampleAttachments() {
        return { sampleDataset: [], sampleOther: [] };
    }

    function copySampleAttachments(source) {
        var result = emptySampleAttachments();
        Object.keys(result).forEach(function (key) {
            result[key] = (source && source[key] || []).map(function (file) {
                return {
                    name: file.name,
                    size: file.size || 0,
                    type: file.type || '',
                    source: file.source || 'existing',
                    file: file.file || null
                };
            });
        });
        return result;
    }

    function copyEffectiveSampleAttachments(source, sampleType) {
        var result = copySampleAttachments(source);
        if (sampleType !== 'dataset') result.sampleDataset = [];
        if (sampleType !== 'other') result.sampleOther = [];
        return result;
    }

    function existingSampleAttachments(resourceName) {
        var safeName = resourceName || '数据资源';
        return {
            sampleDataset: [{ name: safeName + '-数据样例.xlsx', size: 2860000, source: 'existing' }],
            sampleOther: [{ name: safeName + '-数据样例.pdf', size: 2860000, source: 'existing' }]
        };
    }

    function defaultSampleApiConfig() {
        return {
            selectedId: 'api-enterprise-vitality',
            query: '',
            open: false,
            expanded: ['enterprise', 'enterprise-vitality']
        };
    }

    function copySampleApiConfig(source) {
        var config = source || defaultSampleApiConfig();
        return {
            selectedId: config.selectedId || '',
            query: '',
            open: false,
            expanded: (config.expanded || []).slice()
        };
    }

    function copyEffectiveSampleApiConfig(source, sampleType) {
        if (sampleType === 'api') return copySampleApiConfig(source);
        return { selectedId: '', query: '', open: false, expanded: [] };
    }

    function initSupplierResourceRegister() {
        var params = new URLSearchParams(window.location.search || '');
        var sidebar = document.querySelector('[data-workbench-sidebar]');
        var activeMenu = params.get('menu') || (sidebar && sidebar.dataset.active);
        if (activeMenu !== 'resource-register') return;

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
            dataTable: defaultTableTreeConfig(),
            attachments: emptySampleAttachments(),
            sampleType: 'dataset',
            sampleApi: defaultSampleApiConfig(),
            itemDrawer: {
                open: false,
                mode: 'create',
                index: -1,
                draft: null
            }
        };
        var toastTimer = null;
        var confirmPopover = null;
        var confirmPopoverTrigger = null;
        var confirmOutsideHandler = null;
        var confirmKeyHandler = null;
        var confirmViewportHandler = null;

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
                +       '<button class="resource-register-toolbar-button" type="button" data-resource-register-toolbar-action="批量登记">' + icon('playlist_add_check') + '<span>批量登记</span></button>'
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
            if (state.formMode === 'create') return '新增';
            if (state.formMode === 'change') return '变更';
            return '编辑';
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
            state.dataTable = copyTableTreeConfig(item && item.dataTable);
            state.attachments = item
                ? copySampleAttachments(item.attachments || existingSampleAttachments(item.name))
                : emptySampleAttachments();
            state.sampleType = item && item.sampleType
                ? item.sampleType
                : (item && state.formData.format === 'API接口' ? 'api' : 'dataset');
            state.sampleApi = item
                ? copySampleApiConfig(item.sampleApi)
                : defaultSampleApiConfig();
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
            var afterFirstStep = state.formStep > 1;
            var afterSecondStep = state.formStep > 2;
            return ''
                + '<header class="resource-editor-header">'
                +   '<button class="resource-editor-back" type="button" data-resource-editor-action="cancel">' + icon('arrow_back') + '<span>' + getEditorTitle() + '</span></button>'
                +   '<div class="resource-editor-steps" aria-label="资源登记步骤">'
                +       '<button class="resource-editor-step' + (afterFirstStep ? ' complete' : ' active') + '" type="button" data-resource-editor-step="1">'
                +           '<i>' + (afterFirstStep ? icon('check') : '1') + '</i><span>基本信息</span>'
                +       '</button>'
                +       '<span class="resource-editor-step-line' + (afterFirstStep ? ' active' : '') + '"></span>'
                +       '<button class="resource-editor-step' + (afterSecondStep ? ' complete' : (state.formStep === 2 ? ' active' : '')) + '" type="button" data-resource-editor-step="2"' + (afterFirstStep ? '' : ' disabled') + '>'
                +           '<i>' + (afterSecondStep ? icon('check') : '2') + '</i><span>数据项信息</span>'
                +       '</button>'
                +       '<span class="resource-editor-step-line' + (afterSecondStep ? ' active' : '') + '"></span>'
                +       '<button class="resource-editor-step' + (state.formStep === 3 ? ' active' : '') + '" type="button" data-resource-editor-step="3"' + (afterSecondStep ? '' : ' disabled') + '>'
                +           '<i>3</i><span>样例数据</span>'
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

        function findTreeSelection(id, nodes, path) {
            var result = null;
            (nodes || []).some(function (node) {
                var nextPath = (path || []).concat(node.label);
                if (node.id === id) {
                    result = { node: node, path: nextPath };
                    return true;
                }
                if (node.children) {
                    result = findTreeSelection(id, node.children, nextPath);
                    return Boolean(result);
                }
                return false;
            });
            return result;
        }

        function treeNodeMatches(node, keyword) {
            if (!keyword) return true;
            var searchable = [node.label, node.code, node.method, node.path].join(' ').toLowerCase();
            if (searchable.indexOf(keyword) !== -1) return true;
            return Boolean(node.children && node.children.some(function (child) {
                return treeNodeMatches(child, keyword);
            }));
        }

        function renderTableTree(nodes, depth) {
            var keyword = state.dataTable.query.trim().toLowerCase();
            var html = '';
            (nodes || []).forEach(function (node) {
                if (!treeNodeMatches(node, keyword)) return;
                var isFolder = Boolean(node.children);
                var expanded = keyword || state.dataTable.expanded.indexOf(node.id) !== -1;
                var selected = state.dataTable.selectedId === node.id;
                if (isFolder) {
                    html += ''
                        + '<div class="product-register-api-folder">'
                        +   '<button type="button" style="--tree-indent:' + (depth * 18) + 'px" data-resource-table-folder="' + escapeHtml(node.id) + '">'
                        +       icon(expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right')
                        +       icon('folder')
                        +       '<span>' + escapeHtml(node.label) + '</span>'
                        +   '</button>'
                        +   (expanded ? '<div>' + renderTableTree(node.children, depth + 1) + '</div>' : '')
                        + '</div>';
                    return;
                }
                html += ''
                    + '<button class="product-register-api-option' + (selected ? ' selected' : '') + '" type="button" style="--tree-indent:' + (depth * 18) + 'px" data-resource-table-select="' + escapeHtml(node.id) + '">'
                    +   icon('table_view')
                    +   '<span><b>' + escapeHtml(node.label) + '</b><small>' + escapeHtml(node.code) + '</small></span>'
                    +   (selected ? icon('check') : '')
                    + '</button>';
            });
            return html;
        }

        function renderTableSelector() {
            var selected = findTreeSelection(state.dataTable.selectedId, RESOURCE_TABLE_TREE, []);
            var selectedLabel = selected ? selected.path.join(' / ') : '请选择数据库表';
            var treeHtml = renderTableTree(RESOURCE_TABLE_TREE, 0);
            return ''
                + '<div class="product-register-api-selector resource-editor-table-tree">'
                +   '<button class="product-register-api-trigger' + (state.dataTable.open ? ' active' : '') + '" type="button" data-resource-table-toggle aria-expanded="' + (state.dataTable.open ? 'true' : 'false') + '">'
                +       icon('account_tree')
                +       '<span>' + escapeHtml(selectedLabel) + '</span>'
                +       icon(state.dataTable.open ? 'expand_less' : 'expand_more')
                +   '</button>'
                +   (state.dataTable.open
                        ? '<div class="product-register-api-dropdown">'
                            + '<label class="product-register-api-search">' + icon('search')
                            +   '<input type="search" value="' + escapeHtml(state.dataTable.query) + '" placeholder="搜索目录或数据库表" data-resource-table-search>'
                            + '</label>'
                            + '<div class="product-register-api-tree">'
                            +   (treeHtml || '<div class="product-register-api-empty">' + icon('search_off') + '<span>未找到匹配的目录或数据库表</span></div>')
                            + '</div>'
                        + '</div>'
                        : '')
                + '</div>';
        }

        function renderDataItemsStep() {
            var allSelected = state.dataItems.length && state.dataItems.every(function (item) {
                return state.selectedDataItems[item.id];
            });
            return ''
                + '<div class="resource-editor-body resource-editor-items-body">'
                +   '<div class="resource-editor-items-toolbar">'
                +       renderTableSelector()
                +       '<div class="resource-editor-items-actions">'
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

        function renderSampleFormLabel() {
            return '<label class="product-register-form-label"><span>数据样例</span>' + icon('help_outline') + '</label>';
        }

        function formatFileSize(bytes) {
            if (!bytes) return '';
            if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + 'MB';
            return Math.max(1, Math.round(bytes / 1024)) + 'KB';
        }

        function renderUploadedSampleFile(field, file, index) {
            return ''
                + '<div class="product-register-uploaded-file">'
                +   icon('description')
                +   '<span title="' + escapeHtml(file.name) + '">' + escapeHtml(file.name) + '</span>'
                +   '<small>' + escapeHtml(formatFileSize(file.size)) + '</small>'
                +   icon('check_circle')
                +   '<button type="button" data-resource-sample-remove="' + escapeHtml(field.key) + '" data-resource-sample-index="' + index + '">'
                +       icon('delete')
                +       '<span>移除</span>'
                +   '</button>'
                + '</div>';
        }

        function renderSampleUploadSpace(field, buttonLabel, buttonIcon) {
            var files = state.attachments[field.key] || [];
            var uploadId = 'resourceSampleUpload-' + field.key;
            var canUpload = !field.maxCount || files.length < field.maxCount;
            var acceptAttr = field.accept ? ' accept="' + escapeHtml(field.accept) + '"' : '';
            var multipleAttr = field.multiple || !field.maxCount || field.maxCount > 1 ? ' multiple' : '';
            return ''
                + '<div class="product-register-upload-space">'
                +   (canUpload
                        ? '<input id="' + uploadId + '" type="file"' + acceptAttr + multipleAttr + ' data-resource-sample-upload="' + escapeHtml(field.key) + '">'
                            + '<label class="product-register-upload-button" for="' + uploadId + '">' + icon(buttonIcon || 'upload_file') + '<span>' + escapeHtml(buttonLabel || '上传文件') + '</span></label>'
                        : '')
                +   '<p>' + escapeHtml(field.description) + '</p>'
                +   '<div class="product-register-uploaded-files">'
                +       files.map(function (file, index) { return renderUploadedSampleFile(field, file, index); }).join('')
                +   '</div>'
                + '</div>';
        }

        function renderSampleApiTree(nodes, depth) {
            var keyword = state.sampleApi.query.trim().toLowerCase();
            var html = '';
            (nodes || []).forEach(function (node) {
                if (!treeNodeMatches(node, keyword)) return;
                var isFolder = Boolean(node.children);
                var expanded = keyword || state.sampleApi.expanded.indexOf(node.id) !== -1;
                var selected = state.sampleApi.selectedId === node.id;
                if (isFolder) {
                    html += ''
                        + '<div class="product-register-api-folder">'
                        +   '<button type="button" style="--tree-indent:' + (depth * 18) + 'px" data-resource-sample-api-folder="' + escapeHtml(node.id) + '">'
                        +       icon(expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right')
                        +       icon('folder')
                        +       '<span>' + escapeHtml(node.label) + '</span>'
                        +   '</button>'
                        +   (expanded ? '<div>' + renderSampleApiTree(node.children, depth + 1) + '</div>' : '')
                        + '</div>';
                    return;
                }
                html += ''
                    + '<button class="product-register-api-option' + (selected ? ' selected' : '') + '" type="button" style="--tree-indent:' + (depth * 18) + 'px" data-resource-sample-api-select="' + escapeHtml(node.id) + '">'
                    +   icon('api')
                    +   '<span><b>' + escapeHtml(node.label) + '</b><small>' + escapeHtml(node.code) + '</small></span>'
                    +   (selected ? icon('check') : '')
                    + '</button>';
            });
            return html;
        }

        function renderSampleApiConfig() {
            var selected = findTreeSelection(state.sampleApi.selectedId, SAMPLE_API_TREE, []);
            var selectedLabel = selected ? selected.path.join(' / ') : '请选择目录中的 API';
            var treeHtml = renderSampleApiTree(SAMPLE_API_TREE, 0);
            return ''
                + '<div class="product-register-api-selector">'
                +   '<button class="product-register-api-trigger' + (state.sampleApi.open ? ' active' : '') + '" type="button" data-resource-sample-api-toggle aria-expanded="' + (state.sampleApi.open ? 'true' : 'false') + '">'
                +       icon('account_tree')
                +       '<span>' + escapeHtml(selectedLabel) + '</span>'
                +       icon(state.sampleApi.open ? 'expand_less' : 'expand_more')
                +   '</button>'
                +   (state.sampleApi.open
                        ? '<div class="product-register-api-dropdown">'
                            + '<label class="product-register-api-search">' + icon('search')
                            +   '<input type="search" value="' + escapeHtml(state.sampleApi.query) + '" placeholder="搜索目录或 API" data-resource-sample-api-search>'
                            + '</label>'
                            + '<div class="product-register-api-tree">'
                            +   (treeHtml || '<div class="product-register-api-empty">' + icon('search_off') + '<span>未找到匹配的目录或 API</span></div>')
                            + '</div>'
                        + '</div>'
                        : '')
                +   (selected
                        ? '<div class="product-register-api-selected">'
                            + '<span>' + icon('check_circle') + '已选择</span>'
                            + '<b>' + escapeHtml(selected.node.label) + '</b>'
                            + '<code>' + escapeHtml(selected.node.method + '  ' + selected.node.path) + '</code>'
                        + '</div>'
                        : '')
                +   '<p>可按名称、编码搜索，展开目录后选择具体 API。</p>'
                + '</div>';
        }

        function renderSampleStep() {
            var type = state.sampleType;
            var content = '';
            var description = '';
            var typeOptions = [
                { value: 'dataset', label: '数据集', icon: 'table_view' },
                { value: 'api', label: 'API', icon: 'api' },
                { value: 'other', label: '其他', icon: 'upload_file' }
            ];
            if (type === 'api') {
                description = '从数据岛已登记的 API 目录中选择一项作为调用样例。';
                content = renderSampleApiConfig();
            } else if (type === 'other') {
                description = '上传文档、图片或文本等其他形式的数据样例。';
                content = renderSampleUploadSpace(SAMPLE_UPLOAD_FIELDS.other, '上传文件', 'upload_file');
            } else {
                description = '导入 Excel 文件作为数据集的结构与内容样例。';
                content = renderSampleUploadSpace(SAMPLE_UPLOAD_FIELDS.dataset, '导入 Excel 文件', 'table_view');
            }
            return ''
                + '<div class="resource-editor-body product-register-declaration-body">'
                +   '<div class="product-register-declaration-form">'
                +       '<div class="product-register-upload-row product-register-sample-row">'
                +           renderSampleFormLabel()
                +           '<div class="product-register-sample-config">'
                +               '<div class="product-register-sample-type-options" role="radiogroup" aria-label="数据样例类型">'
                +                   typeOptions.map(function (option) {
                                        var active = option.value === type;
                                        return '<label class="' + (active ? 'active' : '') + '">'
                                            + '<input type="radio" name="resourceSampleType" value="' + option.value + '" data-resource-sample-type="' + option.value + '"' + (active ? ' checked' : '') + '>'
                                            + icon(option.icon)
                                            + '<span>' + option.label + '</span>'
                                            + '</label>';
                                    }).join('')
                +               '</div>'
                +               '<div class="product-register-sample-heading"><p>' + escapeHtml(description) + '</p></div>'
                +               content
                +           '</div>'
                +       '</div>'
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
            if (state.formStep === 1) {
                return ''
                    + '<footer class="resource-editor-footer">'
                    +   '<button type="button" data-resource-editor-action="cancel">' + icon('close') + '<span>取消</span></button>'
                    +   '<button class="primary" type="button" data-resource-editor-action="next">' + icon('arrow_forward') + '<span>下一步</span></button>'
                    + '</footer>';
            }

            if (state.formStep === 2) {
                return ''
                    + '<footer class="resource-editor-footer">'
                    +   '<button type="button" data-resource-editor-action="cancel">' + icon('close') + '<span>取消</span></button>'
                    +   '<button type="button" data-resource-editor-action="previous">' + icon('arrow_back') + '<span>上一步</span></button>'
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
                +   (state.formStep === 1 ? renderBasicInfoStep() : (state.formStep === 2 ? renderDataItemsStep() : renderSampleStep()))
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

        function validateDataItems() {
            if (state.dataItems.length) return true;
            showToast('请至少保留一个数据项后再继续。');
            return false;
        }

        function submitResourceForm(action) {
            if (!validateDataItems()) return;

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
                    dataItems: copyDataItems(state.dataItems),
                    dataTable: copyTableTreeConfig(state.dataTable),
                    attachments: copyEffectiveSampleAttachments(state.attachments, state.sampleType),
                    sampleType: state.sampleType,
                    sampleApi: copyEffectiveSampleApiConfig(state.sampleApi, state.sampleType)
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
                item.dataTable = copyTableTreeConfig(state.dataTable);
                item.attachments = copyEffectiveSampleAttachments(state.attachments, state.sampleType);
                item.sampleType = state.sampleType;
                item.sampleApi = copyEffectiveSampleApiConfig(state.sampleApi, state.sampleType);
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

        function rerenderEditorAtCurrentScroll(focusSelector) {
            var body = panel.querySelector('.resource-editor-body');
            var scrollTop = body ? body.scrollTop : 0;
            render();
            var nextBody = panel.querySelector('.resource-editor-body');
            if (nextBody) nextBody.scrollTop = scrollTop;
            if (!focusSelector) return;
            var focusTarget = panel.querySelector(focusSelector);
            if (!focusTarget) return;
            focusTarget.focus();
            if (typeof focusTarget.setSelectionRange === 'function') {
                focusTarget.setSelectionRange(focusTarget.value.length, focusTarget.value.length);
            }
        }

        function handleSampleFiles(fieldKey, fileList) {
            var field = SAMPLE_UPLOAD_FIELDS.dataset.key === fieldKey
                ? SAMPLE_UPLOAD_FIELDS.dataset
                : (SAMPLE_UPLOAD_FIELDS.other.key === fieldKey ? SAMPLE_UPLOAD_FIELDS.other : null);
            if (!field || !fileList || !fileList.length) return;
            var current = state.attachments[fieldKey] || [];
            var selected = Array.prototype.slice.call(fileList);
            var room = field.maxCount ? field.maxCount - current.length : selected.length;
            if (field.maxCount && room <= 0) {
                showToast(field.label + '最多上传 ' + field.maxCount + ' 个附件。');
                return;
            }

            var accepted = [];
            var rejectedMessage = '';
            selected.slice(0, room).forEach(function (file) {
                var extension = (file.name.split('.').pop() || '').toLowerCase();
                if (field.extensions && field.extensions.length && field.extensions.indexOf(extension) === -1) {
                    rejectedMessage = file.name + ' 的文件格式不支持。';
                    return;
                }
                if (file.size > field.maxSize * 1024 * 1024) {
                    rejectedMessage = file.name + ' 超过 ' + (field.maxSizeText || field.maxSize + 'MB') + ' 限制。';
                    return;
                }
                accepted.push({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    source: 'local',
                    file: file
                });
            });
            if (accepted.length) {
                state.attachments[fieldKey] = current.concat(accepted);
                rerenderEditorAtCurrentScroll();
                showToast(rejectedMessage ? '已上传 ' + accepted.length + ' 个文件，部分文件未通过校验。' : '已上传 ' + accepted.length + ' 个文件。');
            } else if (rejectedMessage) {
                showToast(rejectedMessage);
            }
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
                    else if (action === 'next') {
                        if (state.formStep === 1 && validateBasicForm()) {
                            state.formStep = 2;
                            render();
                        } else if (state.formStep === 2 && validateDataItems()) {
                            state.formStep = 3;
                            render();
                        }
                    } else if (action === 'previous') {
                        state.formStep = Math.max(1, state.formStep - 1);
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

            var tableToggle = panel.querySelector('[data-resource-table-toggle]');
            if (tableToggle) {
                tableToggle.addEventListener('click', function () {
                    state.dataTable.open = !state.dataTable.open;
                    state.dataTable.query = '';
                    rerenderEditorAtCurrentScroll(state.dataTable.open ? '[data-resource-table-search]' : '');
                });
            }

            var tableSearch = panel.querySelector('[data-resource-table-search]');
            if (tableSearch) {
                tableSearch.addEventListener('input', function () {
                    state.dataTable.query = this.value;
                    rerenderEditorAtCurrentScroll('[data-resource-table-search]');
                });
            }

            panel.querySelectorAll('[data-resource-table-folder]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var id = this.dataset.resourceTableFolder;
                    var index = state.dataTable.expanded.indexOf(id);
                    if (index === -1) state.dataTable.expanded.push(id);
                    else state.dataTable.expanded.splice(index, 1);
                    rerenderEditorAtCurrentScroll();
                });
            });

            panel.querySelectorAll('[data-resource-table-select]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.dataTable.selectedId = this.dataset.resourceTableSelect;
                    state.dataTable.query = '';
                    state.dataTable.open = false;
                    rerenderEditorAtCurrentScroll();
                });
            });

            var importItems = panel.querySelector('[data-resource-item-import]');
            if (importItems) importItems.addEventListener('click', function () {
                var selectedTable = findTreeSelection(state.dataTable.selectedId, RESOURCE_TABLE_TREE, []);
                showToast('已载入“' + (selectedTable ? selectedTable.node.label : '所选数据库表') + '”字段示例，可继续新增或编辑数据项。');
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

            panel.querySelectorAll('[data-resource-sample-type]').forEach(function (radio) {
                radio.addEventListener('change', function () {
                    if (!this.checked || this.dataset.resourceSampleType === state.sampleType) return;
                    state.sampleType = this.dataset.resourceSampleType;
                    state.sampleApi.open = false;
                    state.sampleApi.query = '';
                    rerenderEditorAtCurrentScroll();
                });
            });

            panel.querySelectorAll('[data-resource-sample-upload]').forEach(function (input) {
                input.addEventListener('change', function () {
                    handleSampleFiles(this.dataset.resourceSampleUpload, this.files);
                });
            });

            panel.querySelectorAll('[data-resource-sample-remove]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var key = this.dataset.resourceSampleRemove;
                    var index = parseInt(this.dataset.resourceSampleIndex, 10);
                    var files = state.attachments[key] || [];
                    if (index >= 0 && index < files.length) files.splice(index, 1);
                    rerenderEditorAtCurrentScroll();
                    showToast('样例文件已移除。');
                });
            });

            var sampleApiToggle = panel.querySelector('[data-resource-sample-api-toggle]');
            if (sampleApiToggle) {
                sampleApiToggle.addEventListener('click', function () {
                    state.sampleApi.open = !state.sampleApi.open;
                    state.sampleApi.query = '';
                    rerenderEditorAtCurrentScroll(state.sampleApi.open ? '[data-resource-sample-api-search]' : '');
                });
            }

            var sampleApiSearch = panel.querySelector('[data-resource-sample-api-search]');
            if (sampleApiSearch) {
                sampleApiSearch.addEventListener('input', function () {
                    state.sampleApi.query = this.value;
                    rerenderEditorAtCurrentScroll('[data-resource-sample-api-search]');
                });
            }

            panel.querySelectorAll('[data-resource-sample-api-folder]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var id = this.dataset.resourceSampleApiFolder;
                    var index = state.sampleApi.expanded.indexOf(id);
                    if (index === -1) state.sampleApi.expanded.push(id);
                    else state.sampleApi.expanded.splice(index, 1);
                    rerenderEditorAtCurrentScroll();
                });
            });

            panel.querySelectorAll('[data-resource-sample-api-select]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.sampleApi.selectedId = this.dataset.resourceSampleApiSelect;
                    state.sampleApi.query = '';
                    state.sampleApi.open = false;
                    rerenderEditorAtCurrentScroll();
                });
            });
        }

        function render() {
            closeConfirmPopover(false);
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

        function closeConfirmPopover(restoreFocus) {
            var trigger = confirmPopoverTrigger;
            if (confirmPopover) confirmPopover.remove();
            if (trigger) {
                trigger.setAttribute('aria-expanded', 'false');
                trigger.removeAttribute('aria-controls');
            }
            if (confirmOutsideHandler) document.removeEventListener('click', confirmOutsideHandler, true);
            if (confirmKeyHandler) document.removeEventListener('keydown', confirmKeyHandler);
            if (confirmViewportHandler) {
                window.removeEventListener('resize', confirmViewportHandler);
                window.removeEventListener('scroll', confirmViewportHandler, true);
            }
            confirmPopover = null;
            confirmPopoverTrigger = null;
            confirmOutsideHandler = null;
            confirmKeyHandler = null;
            confirmViewportHandler = null;
            if (restoreFocus && trigger && document.contains(trigger)) trigger.focus();
        }

        function positionConfirmPopover(trigger) {
            if (!confirmPopover || !trigger) return;
            var triggerRect = trigger.getBoundingClientRect();
            var popoverRect = confirmPopover.getBoundingClientRect();
            var left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
            var top = triggerRect.top - popoverRect.height - 10;
            left = Math.max(12, Math.min(left, window.innerWidth - popoverRect.width - 12));
            if (top < 12) top = triggerRect.bottom + 10;
            confirmPopover.style.left = Math.round(left) + 'px';
            confirmPopover.style.top = Math.round(top) + 'px';
        }

        function openConfirmPopover(trigger, message, onConfirm) {
            closeConfirmPopover(false);
            var popover = document.createElement('div');
            var popoverId = 'resourceRegisterConfirmPopover';
            popover.id = popoverId;
            popover.className = 'resource-register-confirm-popover';
            popover.setAttribute('role', 'dialog');
            popover.setAttribute('aria-label', '登记确认');
            popover.innerHTML = ''
                + '<div class="resource-register-confirm-message">'
                +   icon('error')
                +   '<span>' + escapeHtml(message) + '</span>'
                + '</div>'
                + '<div class="resource-register-confirm-actions">'
                +   '<button class="resource-register-confirm-button is-cancel" type="button" data-resource-register-confirm-cancel>取消</button>'
                +   '<button class="resource-register-confirm-button is-confirm" type="button" data-resource-register-confirm-submit>确定</button>'
                + '</div>';
            document.body.appendChild(popover);
            confirmPopover = popover;
            confirmPopoverTrigger = trigger;
            trigger.setAttribute('aria-expanded', 'true');
            trigger.setAttribute('aria-controls', popoverId);
            positionConfirmPopover(trigger);

            popover.querySelector('[data-resource-register-confirm-cancel]').addEventListener('click', function () {
                closeConfirmPopover(true);
            });
            popover.querySelector('[data-resource-register-confirm-submit]').addEventListener('click', function () {
                closeConfirmPopover(false);
                onConfirm();
            });
            confirmOutsideHandler = function (event) {
                if (confirmPopover && !confirmPopover.contains(event.target)) closeConfirmPopover(true);
            };
            confirmKeyHandler = function (event) {
                if (event.key === 'Escape') closeConfirmPopover(true);
            };
            confirmViewportHandler = function () {
                closeConfirmPopover(false);
            };
            document.addEventListener('click', confirmOutsideHandler, true);
            document.addEventListener('keydown', confirmKeyHandler);
            window.addEventListener('resize', confirmViewportHandler);
            window.addEventListener('scroll', confirmViewportHandler, true);
            popover.querySelector('[data-resource-register-confirm-submit]').focus();
        }

        function isRegisterable(record) {
            return record && (record.status === '待登记' || record.status === '已退回');
        }

        function submitRegistrations(records, isBatch) {
            records.forEach(function (record) {
                record.status = '登记审核中';
                record.updatedAt = '2026-07-27 10:30:00';
                state.selected[record.id] = false;
            });
            render();
            showToast(isBatch
                ? '已提交 ' + records.length + ' 条资源登记申请，当前状态为“登记审核中”。'
                : '资源登记申请已提交，当前状态为“登记审核中”。');
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
                    if (action === '批量登记') {
                        var selectedRecords = RESOURCE_RECORDS.filter(function (record) {
                            return state.selected[record.id];
                        });
                        if (!selectedRecords.length) {
                            showToast('请先勾选需要登记的资源。');
                            return;
                        }
                        var registerableRecords = selectedRecords.filter(isRegisterable);
                        if (!registerableRecords.length) {
                            showToast('所选资源当前均不可登记，请选择“待登记”或“已退回”的资源。');
                            return;
                        }
                        GlobalDialog.confirm({
                            title: '批量登记确认',
                            desc: '是否确认对已勾选的 ' + registerableRecords.length + ' 条资源执行批量登记？',
                            confirmText: '确定',
                            cancelText: '取消',
                            onConfirm: function () {
                                submitRegistrations(registerableRecords, true);
                            }
                        });
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
                        if (isRegisterable(record)) {
                            openConfirmPopover(this, '是否确认执行登记吗？', function () {
                                submitRegistrations([record], false);
                            });
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
