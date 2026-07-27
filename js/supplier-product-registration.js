(function () {
    var STATUS_OPTIONS = ['全部', '待登记', '登记审核中', '已登记', '已退回', '变更审核中', '注销审核中', '已注销'];
    var DELIVERY_OPTIONS = ['全部交付方式', 'API传输', '文件传输', '人工交付'];

    var ACTIONS_BY_STATUS = {
        '待登记': [
            { label: '编辑', icon: 'edit' },
            { label: '登记', icon: 'send' },
            { label: '日志', icon: 'history' }
        ],
        '登记审核中': [
            { label: '日志', icon: 'history' }
        ],
        '已登记': [
            { label: '变更', icon: 'edit_note' },
            { label: '注销', icon: 'cancel' },
            { label: '日志', icon: 'history' }
        ],
        '已退回': [
            { label: '编辑', icon: 'edit' },
            { label: '登记', icon: 'send' },
            { label: '日志', icon: 'history' }
        ],
        '变更审核中': [
            { label: '日志', icon: 'history' }
        ],
        '注销审核中': [
            { label: '日志', icon: 'history' }
        ],
        '已注销': [
            { label: '日志', icon: 'history' }
        ]
    };

    var PRODUCT_RECORDS = [
        {
            id: 'PR-20260727-001',
            name: '龙岗企业经营画像指数数据产品',
            code: '--',
            delivery: 'API传输',
            frequency: '1次/日',
            updatedAt: '2026-07-27 09:42:16',
            status: '登记审核中'
        },
        {
            id: 'PR-20260726-002',
            name: '园区企业用能碳排趋势数据产品',
            code: '6020260726152841300000101149002',
            delivery: '文件传输',
            frequency: '1次/月',
            updatedAt: '2026-07-26 15:28:41',
            status: '已登记'
        },
        {
            id: 'PR-20260725-003',
            name: '商事主体信用风险预警数据产品',
            code: '--',
            delivery: 'API传输',
            frequency: '实时',
            updatedAt: '2026-07-25 11:16:08',
            status: '已退回'
        },
        {
            id: 'PR-20260724-004',
            name: '龙岗交通路网运行指数数据产品',
            code: '6020260724173545200000101149004',
            delivery: 'API传输',
            frequency: '1次/小时',
            updatedAt: '2026-07-24 17:35:45',
            status: '变更审核中'
        },
        {
            id: 'PR-20260723-005',
            name: '惠企政策适配分析数据产品',
            code: '6020260723100826700000101149005',
            delivery: '文件传输',
            frequency: '1次/周',
            updatedAt: '2026-07-23 10:08:26',
            status: '注销审核中'
        },
        {
            id: 'PR-20260722-006',
            name: '重点项目建设进度监测数据产品',
            code: '6020260722164358900000101149006',
            delivery: 'API传输',
            frequency: '1次/日',
            updatedAt: '2026-07-22 16:43:58',
            status: '已注销'
        },
        {
            id: 'PR-20260721-007',
            name: '产业园区空间载体画像数据产品',
            code: '6020260721142653100000101149007',
            delivery: '文件传输',
            frequency: '1次/季度',
            updatedAt: '2026-07-21 14:26:53',
            status: '已登记'
        },
        {
            id: 'PR-20260720-008',
            name: '文旅消费热力趋势数据产品',
            code: '--',
            delivery: '文件传输',
            frequency: '1次/月',
            updatedAt: '2026-07-20 10:52:37',
            status: '已退回'
        },
        {
            id: 'PR-20260719-009',
            name: '低空飞行服务保障数据产品',
            code: '6020260719181437600000101149009',
            delivery: 'API传输',
            frequency: '实时',
            updatedAt: '2026-07-19 18:14:37',
            status: '已登记'
        },
        {
            id: 'PR-20260718-010',
            name: '公共信用综合评价数据产品',
            code: '--',
            delivery: '人工交付',
            frequency: '按需更新',
            updatedAt: '2026-07-18 09:36:22',
            status: '登记审核中'
        },
        {
            id: 'PR-20260717-011',
            name: '物流园区货运周转指数数据产品',
            code: '6020260717163842900000101149011',
            delivery: 'API传输',
            frequency: '1次/日',
            updatedAt: '2026-07-17 16:38:42',
            status: '已登记'
        },
        {
            id: 'PR-20260716-012',
            name: '工业企业创新能力分析数据产品',
            code: '6020260716112758400000101149012',
            delivery: '文件传输',
            frequency: '1次/月',
            updatedAt: '2026-07-16 11:27:58',
            status: '已登记'
        },
        {
            id: 'PR-20260715-013',
            name: '城市治理事件趋势研判数据产品',
            code: '6020260715094521300000101149013',
            delivery: 'API传输',
            frequency: '1次/小时',
            updatedAt: '2026-07-15 09:45:21',
            status: '变更审核中'
        },
        {
            id: 'PR-20260714-014',
            name: '社区养老服务资源评估数据产品',
            code: '6020260714153619700000101149014',
            delivery: '人工交付',
            frequency: '1次/季度',
            updatedAt: '2026-07-14 15:36:19',
            status: '已注销'
        },
        {
            id: 'PR-20260713-015',
            name: '区域人才供需结构分析数据产品',
            code: '6020260713101846500000101149015',
            delivery: '文件传输',
            frequency: '1次/月',
            updatedAt: '2026-07-13 10:18:46',
            status: '已登记'
        },
        {
            id: 'PR-20260711-016',
            name: '绿色制造企业评价数据产品',
            code: '6020260711172943800000101149016',
            delivery: 'API传输',
            frequency: '1次/周',
            updatedAt: '2026-07-11 17:29:43',
            status: '注销审核中'
        },
        {
            id: 'PR-20260710-017',
            name: '专精特新企业成长监测数据产品',
            code: '6020260710134857200000101149017',
            delivery: 'API传输',
            frequency: '1次/日',
            updatedAt: '2026-07-10 13:48:57',
            status: '已登记'
        },
        {
            id: 'PR-20260708-018',
            name: '招商项目产业链匹配数据产品',
            code: '6020260708092154600000101149018',
            delivery: '文件传输',
            frequency: '1次/月',
            updatedAt: '2026-07-08 09:21:54',
            status: '已注销'
        }
    ];

    var PRODUCT_FORM_EXAMPLE = {
        name: '龙岗企业经营活力监测数据产品',
        provider: '深圳市龙岗数智科技有限公司',
        productType: '数据产品',
        industry: '企业服务',
        region: '深圳市 / 龙岗区',
        coverageStart: '2026-01-01',
        coverageEnd: '2026-06-30',
        frequencyValue: '1',
        frequencyUnit: '次/日',
        personalInfo: '否',
        delivery: 'API传输',
        restrictions: '仅限平台审核通过的企业服务、产业研究和园区运营场景使用，不得向未经授权的第三方转售、转授权或用于个人画像。',
        authorizedUse: '是',
        dataSubject: '企业法人及产业主体',
        dataScale: '860',
        dataScaleUnit: 'MB',
        relatedResource: '龙岗区商事主体登记基础数据资源',
        code: '登记通过后由平台自动生成',
        introduction: '基于龙岗区企业登记、经营活跃度、创新能力和产业分布等数据形成企业经营活力监测指标，为企业服务、产业研究、园区招商和政策评估提供数据支撑。',
        other: '指标按日更新，历史数据按月复核；异常记录会在下一更新周期完成校正。'
    };

    var FILE_FIELDS = [
        {
            key: 'authorization',
            label: '授权委托书',
            required: false,
            accept: '.doc,.docx,.png,.pdf,.xls,.xlsx',
            extensions: ['doc', 'docx', 'png', 'pdf', 'xls', 'xlsx'],
            maxSize: 5,
            maxCount: 1,
            description: '支持 .doc、.docx、.png、.pdf、.xls、.xlsx，单个文件不超过 5MB，最多上传 1 个附件'
        },
        {
            key: 'compliance',
            label: '合法合规声明',
            required: true,
            accept: '.doc,.docx,.jpg,.jpeg,.pdf,.png,.txt',
            extensions: ['doc', 'docx', 'jpg', 'jpeg', 'pdf', 'png', 'txt'],
            maxSize: 30,
            maxCount: 1,
            description: '支持 .doc、.docx、.jpg、.pdf、.png、.txt，单个文件不超过 30MB，最多上传 1 个附件'
        },
        {
            key: 'source',
            label: '数据来源声明',
            required: true,
            accept: '.doc,.docx,.jpg,.jpeg,.pdf,.png,.txt',
            extensions: ['doc', 'docx', 'jpg', 'jpeg', 'pdf', 'png', 'txt'],
            maxSize: 30,
            maxCount: 1,
            description: '支持 .doc、.docx、.jpg、.pdf、.png、.txt，单个文件不超过 30MB，最多上传 1 个附件'
        },
        {
            key: 'security',
            label: '安全分级分类报告',
            required: false,
            accept: '.doc,.docx,.pdf,.xls,.xlsx',
            extensions: ['doc', 'docx', 'pdf', 'xls', 'xlsx'],
            maxSize: 5,
            maxCount: 1,
            description: '支持 .doc、.docx、.pdf、.xls、.xlsx，单个文件不超过 5MB，最多上传 1 个附件'
        },
        {
            key: 'quality',
            label: '数据质量、产品价值评估报告',
            required: false,
            accept: '.doc,.docx,.txt,.xls,.xlsx',
            extensions: ['doc', 'docx', 'txt', 'xls', 'xlsx'],
            maxSize: 10,
            maxCount: 4,
            description: '支持 .doc、.docx、.txt、.xls、.xlsx，单个文件不超过 10MB，最多上传 4 个附件'
        }
    ];

    var SAMPLE_UPLOAD_FIELDS = {
        dataset: {
            key: 'sampleDataset',
            label: '数据集样例',
            required: false,
            accept: '.xls,.xlsx',
            extensions: ['xls', 'xlsx'],
            maxSize: 30,
            maxCount: 1,
            description: '支持 .xls、.xlsx，单个文件不超过 30MB，最多导入 1 个 Excel 文件'
        },
        other: {
            key: 'sampleOther',
            label: '其他样例',
            required: false,
            accept: '.doc,.docx,.pdf,.jpg,.jpeg,.png,.txt',
            extensions: ['doc', 'docx', 'pdf', 'jpg', 'jpeg', 'png', 'txt'],
            maxSize: 30,
            maxCount: 1,
            description: '支持 .doc、.docx、.pdf、.jpg、.png、.txt，单个文件不超过 30MB，最多上传 1 个附件'
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
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
        });
    }

    function materialIcon(name) {
        return '<span class="material-symbols-outlined" aria-hidden="true">' + name + '</span>';
    }

    function copyObject(source) {
        var result = {};
        Object.keys(source || {}).forEach(function (key) {
            result[key] = source[key];
        });
        return result;
    }

    function getAllUploadFields() {
        return FILE_FIELDS.concat([SAMPLE_UPLOAD_FIELDS.dataset, SAMPLE_UPLOAD_FIELDS.other]);
    }

    function emptyAttachments() {
        return getAllUploadFields().reduce(function (result, field) {
            result[field.key] = [];
            return result;
        }, {});
    }

    function copyAttachments(source) {
        var result = emptyAttachments();
        getAllUploadFields().forEach(function (field) {
            result[field.key] = (source && source[field.key] || []).map(function (file) {
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

    function copyEffectiveAttachments(source, sampleType) {
        var result = copyAttachments(source);
        if (sampleType !== 'dataset') result.sampleDataset = [];
        if (sampleType !== 'other') result.sampleOther = [];
        return result;
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
            query: config.query || '',
            open: false,
            expanded: (config.expanded || []).slice()
        };
    }

    function copyEffectiveSampleApiConfig(source, sampleType) {
        if (sampleType === 'api') return copySampleApiConfig(source);
        return {
            selectedId: '',
            query: '',
            open: false,
            expanded: []
        };
    }

    function existingAttachments(productName) {
        var safeName = productName || '数据产品';
        return {
            authorization: [{ name: safeName + '-授权委托书.docx', size: 1240000, source: 'existing' }],
            sampleDataset: [{ name: safeName + '-数据样例.xlsx', size: 2860000, source: 'existing' }],
            sampleOther: [{ name: safeName + '-数据样例.pdf', size: 2860000, source: 'existing' }],
            compliance: [{ name: safeName + '-合法合规声明.pdf', size: 980000, source: 'existing' }],
            source: [{ name: safeName + '-数据来源声明.pdf', size: 860000, source: 'existing' }],
            security: [{ name: safeName + '-安全分级分类报告.pdf', size: 1460000, source: 'existing' }],
            quality: [{ name: safeName + '-质量与价值评估报告.xlsx', size: 2280000, source: 'existing' }]
        };
    }

    function initSupplierProductRegistration() {
        var params = new URLSearchParams(window.location.search || '');
        if (params.get('menu') !== 'product-register') return;

        var panel = document.querySelector('[data-consult-panel]');
        var title = document.querySelector('[data-center-title]');
        if (!panel) return;

        var state = {
            view: 'list',
            keyword: '',
            status: '全部',
            delivery: '全部交付方式',
            startDate: '',
            endDate: '',
            page: 1,
            pageSize: 10,
            advancedOpen: true,
            selectedIds: [],
            formMode: 'create',
            formStep: 1,
            editingId: '',
            formData: copyObject(PRODUCT_FORM_EXAMPLE),
            attachments: emptyAttachments(),
            sampleType: 'dataset',
            sampleApi: defaultSampleApiConfig(),
            formError: ''
        };
        var toastTimer = null;

        panel.classList.remove(
            'is-placeholder',
            'is-service-management',
            'is-order-management',
            'is-supplier-order-management',
            'is-supplier-bill-management'
        );
        panel.classList.add('is-product-registration');
        if (title) title.textContent = '产品登记管理';
        document.title = '产品登记管理 - 供方中心';

        function renderOptions(options, selected) {
            return options.map(function (option) {
                return '<option value="' + escapeHtml(option) + '"' + (option === selected ? ' selected' : '') + '>' + escapeHtml(option) + '</option>';
            }).join('');
        }

        function getRecordById(id) {
            return PRODUCT_RECORDS.find(function (item) {
                return item.id === id;
            }) || null;
        }

        function splitFrequency(frequency) {
            var value = String(frequency || '');
            var match = value.match(/^(\d+)(次\/.+)$/);
            if (match) return { value: match[1], unit: match[2] };
            if (value === '实时') return { value: '1', unit: '实时' };
            if (value === '按需更新') return { value: '1', unit: '按需更新' };
            return { value: '1', unit: '次/日' };
        }

        function formatFrequency(form) {
            if (form.frequencyUnit === '实时' || form.frequencyUnit === '按需更新') {
                return form.frequencyUnit;
            }
            return String(form.frequencyValue || '1') + String(form.frequencyUnit || '次/日');
        }

        function getFormDataForRecord(item) {
            var form = copyObject(PRODUCT_FORM_EXAMPLE);
            if (!item) return form;
            if (item.formData) {
                Object.keys(item.formData).forEach(function (key) {
                    form[key] = item.formData[key];
                });
            }
            var frequency = splitFrequency(item.frequency);
            form.name = item.name;
            form.delivery = item.delivery;
            form.frequencyValue = frequency.value;
            form.frequencyUnit = frequency.unit;
            form.code = item.code === '--' ? '登记通过后由平台自动生成' : item.code;
            form.introduction = item.name + '面向龙岗区数据要素流通与产业服务场景，整合经治理的主题指标、统计结果和业务标签，为企业服务、产业分析和运营决策提供数据支撑。';
            form.other = '当前产品已完成数据口径、更新周期和授权使用范围梳理，本次编辑同步完善产品说明及声明材料。';
            return form;
        }

        function openEditor(mode, id) {
            var item = id ? getRecordById(id) : null;
            state.view = 'form';
            state.formMode = mode || 'create';
            state.formStep = 1;
            state.editingId = item ? item.id : '';
            state.formData = getFormDataForRecord(item);
            state.attachments = item
                ? copyAttachments(item.attachments || existingAttachments(item.name))
                : emptyAttachments();
            state.sampleType = item && item.sampleType
                ? item.sampleType
                : (item && item.delivery === 'API传输' ? 'api' : 'dataset');
            state.sampleApi = item
                ? copySampleApiConfig(item.sampleApi)
                : defaultSampleApiConfig();
            state.formError = '';
            render();
        }

        function closeEditor() {
            state.view = 'list';
            state.formStep = 1;
            state.editingId = '';
            state.formError = '';
            render();
        }

        function getEditorTitle() {
            if (state.formMode === 'change') return '变更产品登记';
            if (state.formMode === 'draft') return '编辑待登记产品';
            if (state.formMode === 'edit') return '编辑产品登记';
            return '新增产品登记';
        }

        function renderFormLabel(label, required) {
            return '<label class="product-register-form-label">'
                + (required ? '<em>*</em>' : '')
                + '<span>' + escapeHtml(label) + '</span>'
                + materialIcon('help_outline')
                + '</label>';
        }

        function renderFormRow(label, required, control) {
            return '<div class="product-register-form-row">'
                + renderFormLabel(label, required)
                + '<div class="product-register-form-control">' + control + '</div>'
                + '</div>';
        }

        function renderTextarea(field, value, maxLength, placeholder) {
            return '<div class="product-register-form-textarea">'
                + '<textarea maxlength="' + maxLength + '" placeholder="' + escapeHtml(placeholder) + '" data-product-form-field="' + field + '">' + escapeHtml(value) + '</textarea>'
                + '<i data-product-form-counter="' + field + '">' + String(value || '').length + '/' + maxLength + '</i>'
                + '</div>';
        }

        function renderRadioGroup(field, selected) {
            return '<div class="product-register-radio-group">'
                + '<label><input type="radio" name="' + field + '" value="否" data-product-form-field="' + field + '"' + (selected === '否' ? ' checked' : '') + '><span>否</span></label>'
                + '<label><input type="radio" name="' + field + '" value="是" data-product-form-field="' + field + '"' + (selected === '是' ? ' checked' : '') + '><span>是</span></label>'
                + '</div>';
        }

        function renderEditorHeader() {
            var onSecondStep = state.formStep === 2;
            return ''
                + '<header class="product-register-editor-header">'
                +   '<button class="product-register-editor-back" type="button" data-product-editor-action="cancel">'
                +       materialIcon('arrow_back_ios_new')
                +       '<span>' + escapeHtml(getEditorTitle()) + '</span>'
                +   '</button>'
                +   '<div class="product-register-editor-steps" aria-label="产品登记步骤">'
                +       '<button class="product-register-editor-step' + (onSecondStep ? ' complete' : ' active') + '" type="button" data-product-editor-step="1">'
                +           '<i>' + (onSecondStep ? materialIcon('check') : '1') + '</i><span>基本信息</span>'
                +       '</button>'
                +       '<span class="product-register-editor-step-line' + (onSecondStep ? ' active' : '') + '"></span>'
                +       '<button class="product-register-editor-step' + (onSecondStep ? ' active' : '') + '" type="button" data-product-editor-step="2"' + (onSecondStep ? '' : ' disabled') + '>'
                +           '<i>2</i><span>声明信息</span>'
                +       '</button>'
                +   '</div>'
                + '</header>';
        }

        function renderBasicInfoStep() {
            var form = state.formData;
            var alert = state.formError === 'basic'
                ? '<div class="product-register-form-alert">' + materialIcon('error') + '<span>请完整填写带星号的必填信息，并检查时间范围。</span></div>'
                : '';

            return ''
                + '<div class="product-register-editor-body">'
                +   '<form class="product-register-basic-form" novalidate>'
                +       alert
                +       renderFormRow('数据产品名称', true,
                            '<input type="text" maxlength="80" value="' + escapeHtml(form.name) + '" data-product-form-field="name">')
                +       renderFormRow('提供方名称', true,
                            '<select data-product-form-field="provider">' + renderOptions([
                                '深圳市龙岗数智科技有限公司',
                                '龙岗区智慧园区服务有限公司',
                                '深圳市产业数据运营有限公司'
                            ], form.provider) + '</select>')
                +       renderFormRow('产品类型', true,
                            '<select data-product-form-field="productType">' + renderOptions([
                                '数据产品',
                                '数据集',
                                '数据指标产品',
                                '数据模型产品'
                            ], form.productType) + '</select>')
                +       renderFormRow('行业分类', true,
                            '<select data-product-form-field="industry">' + renderOptions([
                                '企业服务',
                                '产业发展',
                                '交通出行',
                                '生态环保',
                                '公共服务'
                            ], form.industry) + '</select>')
                +       renderFormRow('地域分类', false,
                            '<select data-product-form-field="region">' + renderOptions([
                                '深圳市 / 龙岗区',
                                '深圳市 / 全市',
                                '粤港澳大湾区',
                                '全国'
                            ], form.region) + '</select>')
                +       renderFormRow('覆盖时间范围', false,
                            '<div class="product-register-date-range">'
                            +   '<input type="date" value="' + escapeHtml(form.coverageStart) + '" aria-label="覆盖开始日期" data-product-form-field="coverageStart">'
                            +   '<b>至</b>'
                            +   '<input type="date" value="' + escapeHtml(form.coverageEnd) + '" aria-label="覆盖结束日期" data-product-form-field="coverageEnd">'
                            + '</div>')
                +       renderFormRow('更新频率', true,
                            '<div class="product-register-composite">'
                            +   '<input type="number" min="1" max="9999" value="' + escapeHtml(form.frequencyValue) + '" data-product-form-field="frequencyValue">'
                            +   '<select aria-label="更新频率单位" data-product-form-field="frequencyUnit">' + renderOptions([
                                    '次/小时',
                                    '次/日',
                                    '次/周',
                                    '次/月',
                                    '次/季度',
                                    '实时',
                                    '按需更新'
                                ], form.frequencyUnit) + '</select>'
                            + '</div>')
                +       renderFormRow('是否涉及个人信息', true, renderRadioGroup('personalInfo', form.personalInfo))
                +       renderFormRow('交付方式', false,
                            '<select data-product-form-field="delivery">' + renderOptions([
                                'API传输',
                                '文件传输',
                                '人工交付'
                            ], form.delivery) + '</select>')
                +       renderFormRow('使用限制', true, renderTextarea('restrictions', form.restrictions, 255, '请输入产品使用限制'))
                +       renderFormRow('授权使用', true, renderRadioGroup('authorizedUse', form.authorizedUse))
                +       renderFormRow('数据主体', true,
                            '<select data-product-form-field="dataSubject">' + renderOptions([
                                '企业法人及产业主体',
                                '园区与楼宇主体',
                                '公共管理与服务主体',
                                '自然人'
                            ], form.dataSubject) + '</select>')
                +       renderFormRow('数据规模', true,
                            '<div class="product-register-composite">'
                            +   '<input type="number" min="1" value="' + escapeHtml(form.dataScale) + '" data-product-form-field="dataScale">'
                            +   '<select aria-label="数据规模单位" data-product-form-field="dataScaleUnit">' + renderOptions(['MB', 'GB', 'TB'], form.dataScaleUnit) + '</select>'
                            + '</div>')
                +       renderFormRow('关联数据资源', false,
                            '<select data-product-form-field="relatedResource">' + renderOptions([
                                '龙岗区商事主体登记基础数据资源',
                                '龙岗区重点园区企业运行数据资源',
                                '龙岗区产业空间载体基础数据资源',
                                '暂不关联'
                            ], form.relatedResource) + '</select>')
                +       renderFormRow('数据产品标识码', false,
                            '<input type="text" value="' + escapeHtml(form.code) + '" disabled aria-label="数据产品标识码">')
                +       renderFormRow('产品简介', true, renderTextarea('introduction', form.introduction, 500, '请输入产品简介'))
                +       renderFormRow('其他', false, renderTextarea('other', form.other, 500, '请输入其他补充说明'))
                +   '</form>'
                + '</div>';
        }

        function formatFileSize(bytes) {
            if (!bytes) return '';
            if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + 'MB';
            return Math.max(1, Math.round(bytes / 1024)) + 'KB';
        }

        function renderUploadedFile(field, file, index) {
            return ''
                + '<div class="product-register-uploaded-file">'
                +   materialIcon('description')
                +   '<span title="' + escapeHtml(file.name) + '">' + escapeHtml(file.name) + '</span>'
                +   '<small>' + escapeHtml(formatFileSize(file.size)) + '</small>'
                +   materialIcon('check_circle')
                +   '<button type="button" data-product-upload-remove="' + escapeHtml(field.key) + '" data-product-upload-index="' + index + '">'
                +       materialIcon('delete')
                +       '<span>移除</span>'
                +   '</button>'
                + '</div>';
        }

        function renderUploadSpace(field, buttonLabel, buttonIcon) {
            var files = state.attachments[field.key] || [];
            var uploadId = 'productRegisterUpload-' + field.key;
            var canUpload = files.length < field.maxCount;
            var hasError = state.formError === 'attachments' && field.required && !files.length;
            return ''
                + '<div class="product-register-upload-space' + (hasError ? ' has-error' : '') + '">'
                +   (canUpload
                        ? '<input id="' + uploadId + '" type="file" accept="' + escapeHtml(field.accept) + '"' + (field.maxCount > 1 ? ' multiple' : '') + ' data-product-upload-input="' + escapeHtml(field.key) + '">'
                            + '<label class="product-register-upload-button" for="' + uploadId + '">' + materialIcon(buttonIcon || 'upload_file') + '<span>' + escapeHtml(buttonLabel || '上传文件') + '</span></label>'
                        : '')
                +   '<p>' + escapeHtml(field.description) + '</p>'
                +   '<div class="product-register-uploaded-files">'
                +       files.map(function (file, index) { return renderUploadedFile(field, file, index); }).join('')
                +   '</div>'
                +   (hasError ? '<strong>请上传' + escapeHtml(field.label) + '。</strong>' : '')
                + '</div>';
        }

        function renderUploadField(field) {
            var files = state.attachments[field.key] || [];
            var hasError = state.formError === 'attachments' && field.required && !files.length;
            return ''
                + '<div class="product-register-upload-row' + (hasError ? ' has-error' : '') + '">'
                +   renderFormLabel(field.label, field.required)
                +   renderUploadSpace(field, '上传文件', 'upload_file')
                + '</div>';
        }

        function findApiSelection(id, nodes, path) {
            var result = null;
            (nodes || SAMPLE_API_TREE).some(function (node) {
                var nextPath = (path || []).concat(node.label);
                if (node.id === id) {
                    result = { node: node, path: nextPath };
                    return true;
                }
                if (node.children) {
                    result = findApiSelection(id, node.children, nextPath);
                    return Boolean(result);
                }
                return false;
            });
            return result;
        }

        function apiNodeMatches(node, keyword) {
            if (!keyword) return true;
            var searchable = [node.label, node.code, node.path].join(' ').toLowerCase();
            if (searchable.indexOf(keyword) !== -1) return true;
            return Boolean(node.children && node.children.some(function (child) {
                return apiNodeMatches(child, keyword);
            }));
        }

        function renderApiTree(nodes, depth) {
            var keyword = state.sampleApi.query.trim().toLowerCase();
            var html = '';
            (nodes || []).forEach(function (node) {
                if (!apiNodeMatches(node, keyword)) return;
                var isFolder = Boolean(node.children);
                var expanded = keyword || state.sampleApi.expanded.indexOf(node.id) !== -1;
                var selected = state.sampleApi.selectedId === node.id;
                if (isFolder) {
                    html += ''
                        + '<div class="product-register-api-folder">'
                        +   '<button type="button" style="--tree-indent:' + (depth * 18) + 'px" data-product-sample-api-folder="' + escapeHtml(node.id) + '">'
                        +       materialIcon(expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right')
                        +       materialIcon('folder')
                        +       '<span>' + escapeHtml(node.label) + '</span>'
                        +   '</button>'
                        +   (expanded ? '<div>' + renderApiTree(node.children, depth + 1) + '</div>' : '')
                        + '</div>';
                    return;
                }
                html += ''
                    + '<button class="product-register-api-option' + (selected ? ' selected' : '') + '" type="button" style="--tree-indent:' + (depth * 18) + 'px" data-product-sample-api-select="' + escapeHtml(node.id) + '">'
                    +   materialIcon('api')
                    +   '<span><b>' + escapeHtml(node.label) + '</b><small>' + escapeHtml(node.code) + '</small></span>'
                    +   (selected ? materialIcon('check') : '')
                    + '</button>';
            });
            return html;
        }

        function renderApiSampleConfig() {
            var selected = findApiSelection(state.sampleApi.selectedId);
            var treeHtml = renderApiTree(SAMPLE_API_TREE, 0);
            var selectedLabel = selected ? selected.path.join(' / ') : '请选择目录中的 API';
            return ''
                + '<div class="product-register-api-selector">'
                +   '<button class="product-register-api-trigger' + (state.sampleApi.open ? ' active' : '') + '" type="button" data-product-sample-api-toggle aria-expanded="' + (state.sampleApi.open ? 'true' : 'false') + '">'
                +       materialIcon('account_tree')
                +       '<span>' + escapeHtml(selectedLabel) + '</span>'
                +       materialIcon(state.sampleApi.open ? 'expand_less' : 'expand_more')
                +   '</button>'
                +   (state.sampleApi.open
                        ? '<div class="product-register-api-dropdown">'
                            + '<label class="product-register-api-search">' + materialIcon('search')
                            +   '<input type="search" value="' + escapeHtml(state.sampleApi.query) + '" placeholder="搜索目录或 API" data-product-sample-api-search>'
                            + '</label>'
                            + '<div class="product-register-api-tree">'
                            +   (treeHtml || '<div class="product-register-api-empty">' + materialIcon('search_off') + '<span>未找到匹配的目录或 API</span></div>')
                            + '</div>'
                        + '</div>'
                        : '')
                +   (selected
                        ? '<div class="product-register-api-selected">'
                            + '<span>' + materialIcon('check_circle') + '已选择</span>'
                            + '<b>' + escapeHtml(selected.node.label) + '</b>'
                            + '<code>' + escapeHtml(selected.node.method + '  ' + selected.node.path) + '</code>'
                        + '</div>'
                        : '')
                +   '<p>可按名称、编码搜索，展开目录后选择具体 API。</p>'
                + '</div>';
        }

        function renderDataSampleField() {
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
                content = renderApiSampleConfig();
            } else if (type === 'other') {
                description = '上传文档、图片或文本等其他形式的数据样例。';
                content = renderUploadSpace(SAMPLE_UPLOAD_FIELDS.other, '上传文件', 'upload_file');
            } else {
                description = '导入 Excel 文件作为数据集的结构与内容样例。';
                content = renderUploadSpace(SAMPLE_UPLOAD_FIELDS.dataset, '导入 Excel 文件', 'table_view');
            }
            return ''
                + '<div class="product-register-upload-row product-register-sample-row">'
                +   renderFormLabel('数据样例', false)
                +   '<div class="product-register-sample-config">'
                +       '<div class="product-register-sample-type-options" role="radiogroup" aria-label="数据样例类型">'
                +           typeOptions.map(function (option) {
                                var active = option.value === type;
                                return '<label class="' + (active ? 'active' : '') + '">'
                                    + '<input type="radio" name="productSampleType" value="' + option.value + '" data-product-sample-type="' + option.value + '"' + (active ? ' checked' : '') + '>'
                                    + materialIcon(option.icon)
                                    + '<span>' + option.label + '</span>'
                                    + '</label>';
                            }).join('')
                +       '</div>'
                +       '<div class="product-register-sample-heading"><p>' + escapeHtml(description) + '</p></div>'
                +       content
                +   '</div>'
                + '</div>';
        }

        function renderDeclarationStep() {
            var alert = state.formError === 'attachments'
                ? '<div class="product-register-form-alert">' + materialIcon('error') + '<span>发布或更新前，请补充必传声明材料。</span></div>'
                : '';
            return ''
                + '<div class="product-register-editor-body product-register-declaration-body">'
                +   '<div class="product-register-declaration-form">'
                +       alert
                +       renderUploadField(FILE_FIELDS[0])
                +       renderDataSampleField()
                +       FILE_FIELDS.slice(1).map(renderUploadField).join('')
                +   '</div>'
                + '</div>';
        }

        function renderEditorFooter() {
            var isSecondStep = state.formStep === 2;
            var isRegistrationFlow = state.formMode === 'create' || state.formMode === 'draft';
            var primaryLabel = isRegistrationFlow ? '发布' : '更新';
            return ''
                + '<footer class="product-register-editor-footer">'
                +   '<button type="button" data-product-editor-action="cancel">' + materialIcon('close') + '<span>取消</span></button>'
                +   (isSecondStep
                        ? '<button type="button" data-product-editor-action="previous">' + materialIcon('arrow_back') + '<span>上一步</span></button>'
                            + (isRegistrationFlow ? '<button type="button" data-product-editor-action="save">' + materialIcon('save') + '<span>保存</span></button>' : '')
                            + '<button class="primary" type="button" data-product-editor-action="submit">' + materialIcon(isRegistrationFlow ? 'publish' : 'update') + '<span>' + primaryLabel + '</span></button>'
                        : '<button class="primary" type="button" data-product-editor-action="next">' + materialIcon('arrow_forward') + '<span>下一步</span></button>')
                + '</footer>';
        }

        function renderEditor() {
            panel.classList.remove(
                'is-placeholder',
                'is-service-management',
                'is-order-management',
                'is-supplier-order-management',
                'is-supplier-bill-management',
                'is-product-registration'
            );
            panel.classList.add('is-product-registration-editor');
            if (title) title.style.display = 'none';
            document.title = getEditorTitle() + ' - 供方中心';
            panel.innerHTML = ''
                + '<div class="product-register-editor">'
                +   renderEditorHeader()
                +   (state.formStep === 1 ? renderBasicInfoStep() : renderDeclarationStep())
                +   renderEditorFooter()
                + '</div>'
                + '<div class="product-register-toast" role="status" aria-live="polite" data-product-register-toast>'
                +   materialIcon('check_circle')
                +   '<span></span>'
                + '</div>';
            bindEditorEvents();
        }

        function validateBasicForm() {
            var requiredFields = [
                'name',
                'provider',
                'productType',
                'industry',
                'frequencyValue',
                'frequencyUnit',
                'personalInfo',
                'restrictions',
                'authorizedUse',
                'dataSubject',
                'dataScale',
                'dataScaleUnit',
                'introduction'
            ];
            var missing = requiredFields.some(function (field) {
                return !String(state.formData[field] || '').trim();
            });
            var invalidRange = state.formData.coverageStart
                && state.formData.coverageEnd
                && state.formData.coverageStart > state.formData.coverageEnd;
            if (missing || invalidRange) {
                state.formError = 'basic';
                render();
                showToast(invalidRange ? '覆盖时间的开始日期不能晚于结束日期。' : '请完整填写带星号的必填信息。');
                return false;
            }
            state.formError = '';
            return true;
        }

        function validateAttachments() {
            var missing = FILE_FIELDS.some(function (field) {
                return field.required && !(state.attachments[field.key] || []).length;
            });
            if (missing) {
                state.formError = 'attachments';
                render();
                showToast('请上传合法合规声明和数据来源声明。');
                return false;
            }
            state.formError = '';
            return true;
        }

        function saveDraft() {
            var item = state.editingId ? getRecordById(state.editingId) : null;
            var nowText = '2026-07-27 16:10:00';
            if (!item) {
                item = {
                    id: 'PR-20260727-' + String(PRODUCT_RECORDS.length + 1).padStart(3, '0'),
                    name: state.formData.name,
                    code: '--',
                    delivery: state.formData.delivery,
                    frequency: formatFrequency(state.formData),
                    updatedAt: nowText,
                    status: '待登记',
                    formData: copyObject(state.formData),
                    attachments: copyEffectiveAttachments(state.attachments, state.sampleType),
                    sampleType: state.sampleType,
                    sampleApi: copyEffectiveSampleApiConfig(state.sampleApi, state.sampleType)
                };
                PRODUCT_RECORDS.unshift(item);
            } else {
                item.name = state.formData.name;
                item.delivery = state.formData.delivery;
                item.frequency = formatFrequency(state.formData);
                item.updatedAt = nowText;
                item.status = '待登记';
                item.formData = copyObject(state.formData);
                item.attachments = copyEffectiveAttachments(state.attachments, state.sampleType);
                item.sampleType = state.sampleType;
                item.sampleApi = copyEffectiveSampleApiConfig(state.sampleApi, state.sampleType);
            }
            state.view = 'list';
            state.formStep = 1;
            state.editingId = '';
            state.formError = '';
            state.page = 1;
            render();
        }

        function submitProductForm() {
            if (!validateAttachments()) return;
            var item = state.editingId ? getRecordById(state.editingId) : null;
            var nowText = '2026-07-27 16:20:00';
            if (state.formMode === 'create' && !item) {
                PRODUCT_RECORDS.unshift({
                    id: 'PR-20260727-' + String(PRODUCT_RECORDS.length + 1).padStart(3, '0'),
                    name: state.formData.name,
                    code: '--',
                    delivery: state.formData.delivery,
                    frequency: formatFrequency(state.formData),
                    updatedAt: nowText,
                    status: '登记审核中',
                    formData: copyObject(state.formData),
                    attachments: copyEffectiveAttachments(state.attachments, state.sampleType),
                    sampleType: state.sampleType,
                    sampleApi: copyEffectiveSampleApiConfig(state.sampleApi, state.sampleType)
                });
            } else if (item) {
                item.name = state.formData.name;
                item.delivery = state.formData.delivery;
                item.frequency = formatFrequency(state.formData);
                item.updatedAt = nowText;
                item.status = state.formMode === 'change' ? '变更审核中' : '登记审核中';
                item.formData = copyObject(state.formData);
                item.attachments = copyEffectiveAttachments(state.attachments, state.sampleType);
                item.sampleType = state.sampleType;
                item.sampleApi = copyEffectiveSampleApiConfig(state.sampleApi, state.sampleType);
            }

            var message = state.formMode === 'create' || state.formMode === 'draft'
                ? '产品登记已发布，当前状态为“登记审核中”。'
                : '产品登记信息已更新并提交审核。';
            state.view = 'list';
            state.formStep = 1;
            state.editingId = '';
            state.formError = '';
            state.page = 1;
            render();
            showToast(message);
        }

        function rerenderEditorAtCurrentScroll(focusSelector) {
            var body = panel.querySelector('.product-register-editor-body');
            var scrollTop = body ? body.scrollTop : 0;
            render();
            var nextBody = panel.querySelector('.product-register-editor-body');
            if (nextBody) nextBody.scrollTop = scrollTop;
            if (focusSelector) {
                var focusTarget = panel.querySelector(focusSelector);
                if (focusTarget) {
                    focusTarget.focus();
                    if (typeof focusTarget.setSelectionRange === 'function') {
                        focusTarget.setSelectionRange(focusTarget.value.length, focusTarget.value.length);
                    }
                }
            }
        }

        function handleFiles(fieldKey, fileList) {
            var field = getAllUploadFields().find(function (item) { return item.key === fieldKey; });
            if (!field || !fileList || !fileList.length) return;
            var current = state.attachments[fieldKey] || [];
            var selected = Array.prototype.slice.call(fileList);
            var room = field.maxCount - current.length;
            if (room <= 0) {
                showToast(field.label + '最多上传 ' + field.maxCount + ' 个附件。');
                return;
            }

            var accepted = [];
            var errorMessage = '';
            selected.slice(0, room).forEach(function (file) {
                var extension = (file.name.split('.').pop() || '').toLowerCase();
                if (field.extensions.indexOf(extension) === -1) {
                    errorMessage = file.name + ' 的文件格式不支持。';
                    return;
                }
                if (file.size > field.maxSize * 1024 * 1024) {
                    errorMessage = file.name + ' 超过 ' + field.maxSize + 'MB 限制。';
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
                state.formError = '';
                rerenderEditorAtCurrentScroll();
                showToast('已上传 ' + accepted.length + ' 个文件。');
            } else if (errorMessage) {
                showToast(errorMessage);
            }
        }

        function bindEditorEvents() {
            panel.querySelectorAll('[data-product-form-field]').forEach(function (field) {
                var eventName = field.tagName === 'SELECT' || field.type === 'radio' ? 'change' : 'input';
                field.addEventListener(eventName, function () {
                    if (this.type === 'radio' && !this.checked) return;
                    state.formData[this.dataset.productFormField] = this.value;
                    state.formError = '';
                    var counter = panel.querySelector('[data-product-form-counter="' + this.dataset.productFormField + '"]');
                    if (counter) counter.textContent = this.value.length + '/' + this.maxLength;
                });
            });

            panel.querySelectorAll('[data-product-editor-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var action = this.dataset.productEditorAction;
                    if (action === 'cancel') closeEditor();
                    else if (action === 'next' && validateBasicForm()) {
                        state.formStep = 2;
                        render();
                    } else if (action === 'previous') {
                        state.formStep = 1;
                        state.formError = '';
                        render();
                    } else if (action === 'save') {
                        saveDraft();
                    } else if (action === 'submit') {
                        submitProductForm();
                    }
                });
            });

            panel.querySelectorAll('[data-product-editor-step]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.disabled) return;
                    state.formStep = parseInt(this.dataset.productEditorStep, 10) || 1;
                    state.formError = '';
                    render();
                });
            });

            panel.querySelectorAll('[data-product-upload-input]').forEach(function (input) {
                input.addEventListener('change', function () {
                    handleFiles(this.dataset.productUploadInput, this.files);
                });
            });

            panel.querySelectorAll('[data-product-sample-type]').forEach(function (radio) {
                radio.addEventListener('change', function () {
                    if (!this.checked) return;
                    var nextType = this.dataset.productSampleType;
                    if (!nextType || nextType === state.sampleType) return;
                    state.sampleType = nextType;
                    state.sampleApi.open = false;
                    state.sampleApi.query = '';
                    rerenderEditorAtCurrentScroll();
                });
            });

            var apiToggle = panel.querySelector('[data-product-sample-api-toggle]');
            if (apiToggle) {
                apiToggle.addEventListener('click', function () {
                    state.sampleApi.open = !state.sampleApi.open;
                    state.sampleApi.query = '';
                    rerenderEditorAtCurrentScroll(state.sampleApi.open ? '[data-product-sample-api-search]' : '');
                });
            }

            var apiSearch = panel.querySelector('[data-product-sample-api-search]');
            if (apiSearch) {
                apiSearch.addEventListener('input', function () {
                    state.sampleApi.query = this.value;
                    rerenderEditorAtCurrentScroll('[data-product-sample-api-search]');
                });
            }

            panel.querySelectorAll('[data-product-sample-api-folder]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var id = this.dataset.productSampleApiFolder;
                    var index = state.sampleApi.expanded.indexOf(id);
                    if (index === -1) state.sampleApi.expanded.push(id);
                    else state.sampleApi.expanded.splice(index, 1);
                    rerenderEditorAtCurrentScroll();
                });
            });

            panel.querySelectorAll('[data-product-sample-api-select]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.sampleApi.selectedId = this.dataset.productSampleApiSelect;
                    state.sampleApi.query = '';
                    state.sampleApi.open = false;
                    rerenderEditorAtCurrentScroll();
                });
            });

            panel.querySelectorAll('[data-product-upload-remove]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var key = this.dataset.productUploadRemove;
                    var index = parseInt(this.dataset.productUploadIndex, 10);
                    var files = state.attachments[key] || [];
                    if (index >= 0 && index < files.length) files.splice(index, 1);
                    rerenderEditorAtCurrentScroll();
                    showToast('附件已移除，可重新上传文件。');
                });
            });
        }

        function getFilteredRecords() {
            var keyword = state.keyword.toLowerCase();
            var startTime = state.startDate ? new Date(state.startDate + 'T00:00:00').getTime() : 0;
            var endTime = state.endDate ? new Date(state.endDate + 'T23:59:59').getTime() : 0;

            return PRODUCT_RECORDS.filter(function (item) {
                if (state.status !== '全部' && item.status !== state.status) return false;
                if (state.delivery !== '全部交付方式' && item.delivery !== state.delivery) return false;

                var updatedTime = new Date(item.updatedAt.replace(' ', 'T')).getTime();
                if (startTime && updatedTime < startTime) return false;
                if (endTime && updatedTime > endTime) return false;

                if (!keyword) return true;
                return [item.name, item.code].join(' ').toLowerCase().indexOf(keyword) !== -1;
            });
        }

        function getStatusClass(status) {
            if (status === '待登记') return 'is-draft';
            if (status === '已登记') return 'is-success';
            if (status === '已退回') return 'is-returned';
            if (status === '已注销') return 'is-cancelled';
            return 'is-review';
        }

        function renderStatusOptions() {
            return STATUS_OPTIONS.map(function (option) {
                return '<option value="' + escapeHtml(option) + '"' + (option === state.status ? ' selected' : '') + '>' + escapeHtml(option) + '</option>';
            }).join('');
        }

        function renderDeliveryOptions() {
            return DELIVERY_OPTIONS.map(function (option) {
                return '<option value="' + escapeHtml(option) + '"' + (option === state.delivery ? ' selected' : '') + '>' + escapeHtml(option) + '</option>';
            }).join('');
        }

        function renderActions(item) {
            var actions = ACTIONS_BY_STATUS[item.status] || ACTIONS_BY_STATUS['登记审核中'];
            return actions.map(function (action) {
                return ''
                    + '<button class="product-register-action" type="button" data-product-register-action="' + escapeHtml(action.label) + '" data-product-register-id="' + escapeHtml(item.id) + '">'
                    +   materialIcon(action.icon)
                    +   '<span>' + escapeHtml(action.label) + '</span>'
                    + '</button>';
            }).join('');
        }

        function renderRows(records) {
            if (!records.length) {
                return '<tr><td class="product-register-empty" colspan="8">暂无符合条件的产品登记记录</td></tr>';
            }

            return records.map(function (item) {
                var checked = state.selectedIds.indexOf(item.id) !== -1;
                return ''
                    + '<tr>'
                    +   '<td><input class="product-register-check" type="checkbox" aria-label="选择' + escapeHtml(item.name) + '" data-product-register-select="' + escapeHtml(item.id) + '"' + (checked ? ' checked' : '') + '></td>'
                    +   '<td><span class="product-register-name" title="' + escapeHtml(item.name) + '">' + escapeHtml(item.name) + '</span></td>'
                    +   '<td><span class="product-register-code" title="' + escapeHtml(item.code) + '">' + escapeHtml(item.code) + '</span></td>'
                    +   '<td>' + escapeHtml(item.delivery) + '</td>'
                    +   '<td>' + escapeHtml(item.frequency) + '</td>'
                    +   '<td>' + escapeHtml(item.updatedAt) + '</td>'
                    +   '<td><span class="product-register-status ' + getStatusClass(item.status) + '">' + escapeHtml(item.status) + '</span></td>'
                    +   '<td class="product-register-action-cell"><div class="product-register-actions">' + renderActions(item) + '</div></td>'
                    + '</tr>';
            }).join('');
        }

        function renderPagination(total, totalPages) {
            var pageButtons = [];
            for (var page = 1; page <= totalPages; page += 1) {
                pageButtons.push(
                    '<button class="product-register-page-button' + (page === state.page ? ' active' : '') + '" type="button" data-product-register-page="' + page + '">' + page + '</button>'
                );
            }

            return ''
                + '<div class="product-register-pagination">'
                +   '<span>共 ' + total + ' 条</span>'
                +   '<button class="product-register-page-button" type="button" aria-label="上一页" data-product-register-page="prev"' + (state.page <= 1 ? ' disabled' : '') + '>‹</button>'
                +   pageButtons.join('')
                +   '<button class="product-register-page-button" type="button" aria-label="下一页" data-product-register-page="next"' + (state.page >= totalPages ? ' disabled' : '') + '>›</button>'
                +   '<select class="product-register-page-size" aria-label="每页条数" data-product-register-page-size>'
                +       '<option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10 条/页</option>'
                +       '<option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20 条/页</option>'
                +   '</select>'
                +   '<span>前往</span>'
                +   '<input class="product-register-page-jump" type="number" min="1" max="' + totalPages + '" aria-label="前往页码" data-product-register-page-jump>'
                + '</div>';
        }

        function renderFilterRow() {
            return ''
                + '<div class="product-register-filter-row' + (state.advancedOpen ? '' : ' is-collapsed') + '" data-product-register-filter-row>'
                +   '<label class="product-register-field">'
                +       '<span>交付方式</span>'
                +       '<select aria-label="交付方式" data-product-register-delivery>' + renderDeliveryOptions() + '</select>'
                +   '</label>'
                +   '<div class="product-register-field product-register-date-field">'
                +       '<span>更新时间</span>'
                +       '<input type="date" value="' + escapeHtml(state.startDate) + '" aria-label="更新开始日期" data-product-register-start-date>'
                +       '<b>至</b>'
                +       '<input type="date" value="' + escapeHtml(state.endDate) + '" aria-label="更新结束日期" data-product-register-end-date>'
                +   '</div>'
                +   '<button class="product-register-reset" type="button" data-product-register-reset>'
                +       materialIcon('restart_alt')
                +       '<span>重置</span>'
                +   '</button>'
                + '</div>';
        }

        function renderTable() {
            var filtered = getFilteredRecords();
            var totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
            if (state.page > totalPages) state.page = totalPages;
            var start = (state.page - 1) * state.pageSize;
            var pageRecords = filtered.slice(start, start + state.pageSize);
            var allSelected = pageRecords.length && pageRecords.every(function (item) {
                return state.selectedIds.indexOf(item.id) !== -1;
            });

            return ''
                + '<div class="product-register-table-card">'
                +   '<div class="product-register-table-scroll" aria-label="产品登记列表，可横向滚动">'
                +       '<table class="product-register-table">'
                +           '<colgroup>'
                +               '<col class="col-check"><col class="col-name"><col class="col-code"><col class="col-delivery">'
                +               '<col class="col-frequency"><col class="col-updated"><col class="col-status"><col class="col-actions">'
                +           '</colgroup>'
                +           '<thead><tr>'
                +               '<th><input class="product-register-check" type="checkbox" aria-label="选择当前页全部记录" data-product-register-select-all' + (allSelected ? ' checked' : '') + '></th>'
                +               '<th>数据产品名称</th><th>数据产品标识码</th><th>交付方式</th><th>更新频率</th><th>更新时间</th><th>登记状态</th>'
                +               '<th class="product-register-action-cell">操作</th>'
                +           '</tr></thead>'
                +           '<tbody>' + renderRows(pageRecords) + '</tbody>'
                +       '</table>'
                +   '</div>'
                +   renderPagination(filtered.length, totalPages)
                + '</div>';
        }

        function render() {
            if (state.view === 'form') {
                renderEditor();
                return;
            }
            panel.classList.remove('is-product-registration-editor');
            panel.classList.add('is-product-registration');
            if (title) {
                title.style.display = '';
                title.textContent = '产品登记管理';
            }
            document.title = '产品登记管理 - 供方中心';
            panel.innerHTML = ''
                + '<div class="product-register-board">'
                +   '<div class="product-register-toolbar">'
                +       '<div class="product-register-query">'
                +           '<label class="product-register-search">'
                +               '<input type="search" value="' + escapeHtml(state.keyword) + '" placeholder="请输入数据产品名称或标识码" aria-label="搜索数据产品" data-product-register-keyword>'
                +               '<button class="product-register-search-button" type="button" aria-label="搜索" data-product-register-search>' + materialIcon('search') + '</button>'
                +           '</label>'
                +           '<label class="product-register-field">'
                +               '<span>登记状态</span>'
                +               '<select aria-label="登记状态" data-product-register-status>' + renderStatusOptions() + '</select>'
                +           '</label>'
                +           '<button class="product-register-filter-toggle' + (state.advancedOpen ? ' active' : '') + '" type="button" aria-label="' + (state.advancedOpen ? '收起更多筛选' : '展开更多筛选') + '" aria-expanded="' + state.advancedOpen + '" data-product-register-filter-toggle>'
                +               materialIcon('filter_alt')
                +           '</button>'
                +       '</div>'
                +       '<div class="product-register-list-actions">'
                +           '<button class="product-register-list-button" type="button" data-product-register-list-action="新增">' + materialIcon('add') + '<span>新增</span></button>'
                +           '<button class="product-register-list-button" type="button" data-product-register-list-action="导出记录">' + materialIcon('download') + '<span>导出记录</span></button>'
                +           '<button class="product-register-list-button primary" type="button" data-product-register-list-action="导入登记">' + materialIcon('upload') + '<span>导入登记</span></button>'
                +       '</div>'
                +   '</div>'
                +   renderFilterRow()
                +   renderTable()
                + '</div>'
                + '<div class="product-register-toast" role="status" aria-live="polite" data-product-register-toast>'
                +   materialIcon('check_circle')
                +   '<span></span>'
                + '</div>';

            bindEvents();
        }

        function showToast(message) {
            var toast = panel.querySelector('[data-product-register-toast]');
            if (!toast) return;
            toast.querySelector('span').textContent = message;
            toast.classList.add('show');
            window.clearTimeout(toastTimer);
            toastTimer = window.setTimeout(function () {
                toast.classList.remove('show');
            }, 2200);
        }

        function applyKeyword() {
            var input = panel.querySelector('[data-product-register-keyword]');
            state.keyword = input ? input.value.trim() : '';
            state.page = 1;
            render();
        }

        function changePage(value) {
            var totalPages = Math.max(1, Math.ceil(getFilteredRecords().length / state.pageSize));
            state.page = Math.min(totalPages, Math.max(1, parseInt(value, 10) || 1));
            render();
        }

        function bindEvents() {
            var keyword = panel.querySelector('[data-product-register-keyword]');
            if (keyword) {
                keyword.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') applyKeyword();
                });
            }

            var searchButton = panel.querySelector('[data-product-register-search]');
            if (searchButton) searchButton.addEventListener('click', applyKeyword);

            var status = panel.querySelector('[data-product-register-status]');
            if (status) {
                status.addEventListener('change', function () {
                    state.status = this.value;
                    state.page = 1;
                    render();
                });
            }

            var filterToggle = panel.querySelector('[data-product-register-filter-toggle]');
            if (filterToggle) {
                filterToggle.addEventListener('click', function () {
                    state.advancedOpen = !state.advancedOpen;
                    render();
                });
            }

            var delivery = panel.querySelector('[data-product-register-delivery]');
            if (delivery) {
                delivery.addEventListener('change', function () {
                    state.delivery = this.value;
                    state.page = 1;
                    render();
                });
            }

            var startDate = panel.querySelector('[data-product-register-start-date]');
            if (startDate) {
                startDate.addEventListener('change', function () {
                    state.startDate = this.value;
                    state.page = 1;
                    render();
                });
            }

            var endDate = panel.querySelector('[data-product-register-end-date]');
            if (endDate) {
                endDate.addEventListener('change', function () {
                    state.endDate = this.value;
                    state.page = 1;
                    render();
                });
            }

            var reset = panel.querySelector('[data-product-register-reset]');
            if (reset) {
                reset.addEventListener('click', function () {
                    state.keyword = '';
                    state.status = '全部';
                    state.delivery = '全部交付方式';
                    state.startDate = '';
                    state.endDate = '';
                    state.page = 1;
                    render();
                });
            }

            panel.querySelectorAll('[data-product-register-page]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.disabled) return;
                    var action = this.dataset.productRegisterPage;
                    if (action === 'prev') changePage(state.page - 1);
                    else if (action === 'next') changePage(state.page + 1);
                    else changePage(action);
                });
            });

            var pageSize = panel.querySelector('[data-product-register-page-size]');
            if (pageSize) {
                pageSize.addEventListener('change', function () {
                    state.pageSize = parseInt(this.value, 10) || 10;
                    state.page = 1;
                    render();
                });
            }

            var pageJump = panel.querySelector('[data-product-register-page-jump]');
            if (pageJump) {
                pageJump.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') changePage(this.value);
                });
                pageJump.addEventListener('change', function () {
                    if (this.value) changePage(this.value);
                });
            }

            panel.querySelectorAll('[data-product-register-select]').forEach(function (checkbox) {
                checkbox.addEventListener('change', function () {
                    var id = this.dataset.productRegisterSelect;
                    var index = state.selectedIds.indexOf(id);
                    if (this.checked && index === -1) state.selectedIds.push(id);
                    if (!this.checked && index !== -1) state.selectedIds.splice(index, 1);
                    render();
                });
            });

            var selectAll = panel.querySelector('[data-product-register-select-all]');
            if (selectAll) {
                selectAll.addEventListener('change', function () {
                    var filtered = getFilteredRecords();
                    var start = (state.page - 1) * state.pageSize;
                    var pageRecords = filtered.slice(start, start + state.pageSize);
                    pageRecords.forEach(function (item) {
                        var index = state.selectedIds.indexOf(item.id);
                        if (selectAll.checked && index === -1) state.selectedIds.push(item.id);
                        if (!selectAll.checked && index !== -1) state.selectedIds.splice(index, 1);
                    });
                    render();
                });
            }

            panel.querySelectorAll('[data-product-register-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var action = this.dataset.productRegisterAction;
                    var item = getRecordById(this.dataset.productRegisterId);
                    if (action === '变更') {
                        openEditor('change', this.dataset.productRegisterId);
                        return;
                    }
                    if (action === '编辑') {
                        openEditor(item && item.status === '待登记' ? 'draft' : 'edit', this.dataset.productRegisterId);
                        return;
                    }
                    if (action === '登记' && item && (item.status === '待登记' || item.status === '已退回')) {
                        openEditor(item.status === '待登记' ? 'draft' : 'edit', this.dataset.productRegisterId);
                        return;
                    }
                    showToast(action + '入口已展示，后续再设计对应页面。');
                });
            });

            panel.querySelectorAll('[data-product-register-list-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.dataset.productRegisterListAction === '新增') {
                        openEditor('create', '');
                        return;
                    }
                    showToast(this.dataset.productRegisterListAction + '入口已展示，后续再设计对应流程。');
                });
            });
        }

        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSupplierProductRegistration);
    } else {
        initSupplierProductRegistration();
    }
})();
