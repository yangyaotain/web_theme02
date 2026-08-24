(function () {
    var STATUS_TABS = [
        { key: 'pending', label: '待上架' },
        { key: 'online', label: '已上架' },
        { key: 'offline', label: '已下架' },
        { key: 'draft', label: '草稿' },
        { key: 'reviewing', label: '审批中' },
        { key: 'rejected', label: '审批驳回' }
    ];

    var RESOURCE_FORMAT_TREE = [
        { key: 'electronic-document', label: '电子文件', values: ['OFD', 'wps', 'xml', 'txt', 'doc', 'docx', 'pdf'] },
        { key: 'electronic-sheet', label: '电子表格', values: ['et', 'xls', 'xlsx', 'csv'] },
        { key: 'database', label: '数据库', values: ['Dm', 'KingbaseES', 'access', 'dbf', 'dbase', 'sybase', 'Oracle', 'MySQL', 'SQL Server', 'PostgreSQL'] },
        { key: 'image', label: '图形图像', values: ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'tif', 'tiff'] },
        { key: 'streaming-media', label: '流媒体', values: ['swf', 'rm', 'mpg', 'mpeg', 'mp4', 'avi', 'mov'] },
        { key: 'self-describing', label: '自描述格式', terminal: true }
    ];

    var RESOURCE_RECORDS = [
        {
            id: 'RS-20260806-001',
            code: '70202607240010001000001234567890',
            name: '龙岗区商事主体登记基础信息',
            format: 'Dm',
            updatedAt: '2026-08-06 09:28:16',
            source: '本节点',
            status: 'pending',
            category: '公共数据',
            industry: '公共管理、社会保障和社会组织',
            region: '深圳市龙岗区',
            coverage: '2025-01-01 至 2026-07-31',
            frequency: '1次/日',
            developmentTerms: '面向依法合规的数据开发利用场景开放，调用方须通过平台身份认证。',
            circulationType: '授权运营',
            holder: '深圳市龙岗数智运营有限公司',
            contact: '林晓雯',
            contactInfo: '13800138026',
            summary: '汇集龙岗区商事主体登记、行业分类、登记状态和经营期限等基础信息。',
            dataSource: '原始取得',
            personalInfo: '否',
            other: '数据按日更新，异常登记记录在下一更新周期校正。',
            image: 'images/economic-monitor.jpg'
        },
        {
            id: 'RS-20260805-002',
            code: '70202607100010001000001234567961',
            name: '建筑工地扬尘监测数据',
            format: '自描述格式',
            updatedAt: '2026-08-05 16:42:08',
            source: '本节点',
            status: 'pending',
            category: '公共数据',
            industry: '建筑业',
            region: '深圳市龙岗区',
            coverage: '2026-01-01 至 2026-08-04',
            frequency: '1次/小时',
            developmentTerms: '仅用于工地环境治理、扬尘趋势分析和监管辅助。',
            circulationType: '有条件开放',
            holder: '深圳市龙岗数智运营有限公司',
            contact: '周启明',
            contactInfo: '0755-28941266',
            summary: '提供建筑工地 PM2.5、PM10、噪声、风速及设备在线状态等监测数据。',
            dataSource: '收集取得',
            personalInfo: '否',
            other: '设备离线期间不生成监测记录。',
            image: 'images/data-detail-hero.jpg'
        },
        {
            id: 'RS-20260804-003',
            code: '70202607080010001000001234567977',
            name: '公交线路运行时刻数据',
            format: '自描述格式',
            updatedAt: '2026-08-04 14:18:37',
            source: '本节点',
            status: 'pending',
            category: '公共数据',
            industry: '交通运输、仓储和邮政业',
            region: '深圳市龙岗区',
            coverage: '2026-01-01 至 2026-07-31',
            frequency: '1次/日',
            developmentTerms: '面向交通分析、出行服务和公交运营优化场景使用。',
            circulationType: '普遍开放',
            holder: '深圳市龙岗数智运营有限公司',
            contact: '陈路',
            contactInfo: '0755-28941618',
            summary: '包含线路、站点、计划班次、首末班时间和运行方向等基础数据。',
            dataSource: '原始取得',
            personalInfo: '否',
            other: '节假日运行计划以当日版本为准。',
            image: 'images/traffic-sensing.jpg'
        },
        {
            id: 'RS-20260803-004',
            code: '70202607060010001000001234567993',
            name: '惠企政策申报服务数据',
            format: 'xml',
            updatedAt: '2026-08-03 11:05:49',
            source: '本节点',
            status: 'online',
            category: '公共数据',
            industry: '公共管理、社会保障和社会组织',
            region: '深圳市龙岗区',
            coverage: '2025-01-01 至 2026-08-01',
            frequency: '1次/日',
            developmentTerms: '仅用于惠企政策检索、适配分析和申报辅助。',
            circulationType: '授权运营',
            holder: '深圳市龙岗数智运营有限公司',
            contact: '谢雨晴',
            contactInfo: '0755-28941008',
            summary: '提供惠企政策名称、适用对象、申报条件、申报期限及受理部门等信息。',
            dataSource: '交易取得',
            personalInfo: '否',
            other: '政策失效后保留历史版本用于追溯。',
            image: 'images/policy-recommend.jpg'
        },
        {
            id: 'RS-20260802-005',
            code: '70202607030010001000001234568006',
            name: '社区养老服务设施名录',
            format: 'xlsx',
            updatedAt: '2026-08-02 10:26:31',
            source: '本节点',
            status: 'online',
            category: '公共数据',
            industry: '卫生和社会工作',
            region: '深圳市龙岗区',
            coverage: '2026-01-01 至 2026-07-31',
            frequency: '1次/月',
            developmentTerms: '面向养老服务查询、设施规划和公共服务分析使用。',
            circulationType: '普遍开放',
            holder: '深圳市龙岗数智运营有限公司',
            contact: '吴欣',
            contactInfo: '0755-28941326',
            summary: '提供社区养老服务设施名称、地址、服务类型和服务时间等信息。',
            dataSource: '收集取得',
            personalInfo: '否',
            other: '名录不包含服务对象个人信息。',
            image: 'images/rec-gov-data.jpg'
        },
        {
            id: 'RS-20260801-006',
            code: '70202606300010001000001234568022',
            name: '工业园区空间地理数据',
            format: 'KingbaseES',
            updatedAt: '2026-08-01 17:36:52',
            source: '本节点',
            status: 'offline',
            category: '公共数据',
            industry: '房地产业',
            region: '深圳市龙岗区',
            coverage: '2025-01-01 至 2026-06-30',
            frequency: '1次/季度',
            developmentTerms: '仅用于园区运营、产业规划和招商研判。',
            circulationType: '有条件开放',
            holder: '深圳市龙岗数智运营有限公司',
            contact: '许安',
            contactInfo: '0755-28941915',
            summary: '提供工业园区、楼宇、产业空间边界及基础属性信息。',
            dataSource: '原始取得',
            personalInfo: '否',
            other: '涉及重点区域的精细坐标需单独授权。',
            image: 'images/smart-park.jpg'
        },
        {
            id: 'RS-20260731-007',
            code: '70202606280010001000001234568038',
            name: '重点项目建设进度数据',
            format: 'csv',
            updatedAt: '2026-07-31 15:42:20',
            source: '本节点',
            status: 'draft',
            category: '公共数据',
            industry: '建筑业',
            region: '深圳市龙岗区',
            coverage: '2026-01-01 至 2026-07-25',
            frequency: '1次/周',
            developmentTerms: '仅用于重点项目调度、进度分析和建设管理。',
            circulationType: '授权运营',
            holder: '深圳市龙岗数智运营有限公司',
            contact: '罗睿',
            contactInfo: '0755-28941730',
            summary: '提供重点项目计划节点、实际进度、投资完成率和风险提示信息。',
            dataSource: '收集取得',
            personalInfo: '否',
            other: '未公开项目仅展示汇总信息。',
            image: 'images/data-factory-overview.png'
        },
        {
            id: 'RS-20260730-008',
            code: '70202606260010001000001234568054',
            name: '文化场馆活动排期数据',
            format: 'xml',
            updatedAt: '2026-07-30 13:29:45',
            source: '本节点',
            status: 'reviewing',
            category: '公共数据',
            industry: '文化、体育和娱乐业',
            region: '深圳市龙岗区',
            coverage: '2026-01-01 至 2026-12-31',
            frequency: '1次/日',
            developmentTerms: '面向公共文化服务、活动推荐和场馆运营分析使用。',
            circulationType: '普遍开放',
            holder: '深圳市龙岗数智运营有限公司',
            contact: '何舒',
            contactInfo: '0755-28941511',
            summary: '提供文化场馆活动名称、时间、场地、预约方式和活动状态。',
            dataSource: '原始取得',
            personalInfo: '否',
            other: '临时调整信息以接口最新更新时间为准。',
            image: 'images/news-industry.jpg'
        },
        {
            id: 'RS-20260729-009',
            code: '70202606230010001000001234568070',
            name: '河流水质监测数据',
            format: '自描述格式',
            updatedAt: '2026-07-29 09:55:31',
            source: '本节点',
            status: 'reviewing',
            category: '公共数据',
            industry: '水利、环境和公共设施管理业',
            region: '深圳市龙岗区',
            coverage: '2025-07-01 至 2026-07-28',
            frequency: '1次/小时',
            developmentTerms: '仅用于水环境治理、趋势分析和风险预警。',
            circulationType: '有条件开放',
            holder: '深圳市龙岗数智运营有限公司',
            contact: '唐清',
            contactInfo: '0755-28941673',
            summary: '提供河流断面水温、pH、溶解氧、氨氮和浊度等监测数据。',
            dataSource: '收集取得',
            personalInfo: '否',
            other: '监测设备校准期间数据标记为待复核。',
            image: 'images/water-analytics.jpg'
        },
        {
            id: 'RS-20260728-010',
            code: '70202606200010001000001234568086',
            name: '城市部件巡查事件数据',
            format: '自描述格式',
            updatedAt: '2026-07-28 18:12:06',
            source: '本节点',
            status: 'reviewing',
            category: '公共数据',
            industry: '公共管理、社会保障和社会组织',
            region: '深圳市龙岗区',
            coverage: '2026-01-01 至 2026-07-27',
            frequency: '实时',
            developmentTerms: '仅用于城市治理事件分析和处置效率评估。',
            circulationType: '授权运营',
            holder: '深圳市龙岗数智运营有限公司',
            contact: '赵恒',
            contactInfo: '0755-28941872',
            summary: '提供城市部件巡查事件类型、区域、发现时间、处置状态和处置时长。',
            dataSource: '原始取得',
            personalInfo: '否',
            other: '公开数据不展示精确上报人信息。',
            image: 'images/rec-smart-city.jpg'
        },
        {
            id: 'RS-20260727-011',
            code: '70202606180010001000001234568102',
            name: '物流园区车辆通行数据',
            format: 'Dm',
            updatedAt: '2026-07-27 10:18:44',
            source: '本节点',
            status: 'rejected',
            category: '企业数据',
            industry: '交通运输、仓储和邮政业',
            region: '深圳市龙岗区',
            coverage: '2026-01-01 至 2026-07-20',
            frequency: '实时',
            developmentTerms: '仅用于园区交通组织、物流效率分析和安全管理。',
            circulationType: '有条件开放',
            holder: '深圳市龙岗数智运营有限公司',
            contact: '孟妍',
            contactInfo: '0755-28941339',
            summary: '提供物流园区车辆进出时间、车辆类型、通道和停留时长的脱敏汇总数据。',
            dataSource: '交易取得',
            personalInfo: '否',
            other: '审批驳回原因为删除控制要求描述不完整。',
            image: 'images/toll-traffic.jpg'
        }
    ];

    var STRATEGIES = [
        { key: 'accessCount', label: '访问次数限制' },
        { key: 'accessTime', label: '访问时间限制' },
        { key: 'concurrency', label: '并发限制' },
        { key: 'roleRestriction', label: '使用用户角色限制' },
        { key: 'useRestriction', label: '使用限制' },
        { key: 'purposeRestriction', label: '用途限制' },
        { key: 'storageRestriction', label: '存储限制' },
        { key: 'toolRestriction', label: '使用工具限制' },
        { key: 'deleteControl', label: '删除控制' },
        { key: 'securityLevel', label: '使用环境安全级别限制' },
        { key: 'overagePolicy', label: '超额策略' },
        { key: 'eventRestriction', label: '事件限制' }
    ];

    var CONTRACT_TEMPLATES = [
        {
            id: 'contract-api-standard',
            name: '标准API访问合约',
            strategyName: '访问策略模板',
            behavior: '访问',
            constraints: {
                timeRange: { start: '2026-08-01', end: '2027-07-31' },
                timeWindow: { start: '09:00:00', end: '18:00:00' },
                usageCount: '1000',
                usageFrequency: { value: '60', unit: '次/分钟' },
                networkAddress: '0.0.0.0/0'
            }
        },
        {
            id: 'contract-enterprise-credit',
            name: '企业信用数据查询合约',
            strategyName: 'API策略',
            behavior: '访问',
            constraints: {
                usageCount: '500',
                usageFrequency: { value: '30', unit: '次/分钟' },
                networkAddress: '10.26.0.0/16'
            }
        },
        {
            id: 'contract-park-energy',
            name: '园区能耗API调用合约',
            strategyName: '访问策略模板',
            behavior: '访问',
            constraints: {
                timeWindow: { start: '08:30:00', end: '20:00:00' },
                usageCount: '2000',
                usageFrequency: { value: '120', unit: '次/分钟' },
                networkAddress: '172.16.0.0/12'
            }
        },
        {
            id: 'contract-public-development',
            name: '公共数据开发利用合约',
            strategyName: '访问策略模板',
            behavior: '访问',
            constraints: {
                timeRange: { start: '2026-08-01', end: '2026-12-31' },
                timeWindow: { start: '09:00:00', end: '17:00:00' },
                networkAddress: '0.0.0.0/0'
            }
        },
        {
            id: 'contract-resource-trial',
            name: '数据资源试用合约',
            strategyName: 'API策略',
            behavior: '访问',
            constraints: {
                timeRange: { start: '2026-08-01', end: '2026-08-31' },
                usageCount: '100',
                networkAddress: '0.0.0.0/0'
            }
        }
    ];

    function icon(name) {
        return '<span class="material-symbols-outlined" aria-hidden="true">' + name + '</span>';
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character];
        });
    }

    function copyValue(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function initSupplierResourceShelf() {
        var params = new URLSearchParams(window.location.search || '');
        if (params.get('menu') !== 'resource-shelf') return;

        var panel = document.querySelector('[data-consult-panel]');
        var title = document.querySelector('[data-center-title]');
        if (!panel) return;

        var state = {
            view: 'list',
            activeStatus: 'pending',
            keyword: '',
            resourceFormat: '',
            formatKeyword: '',
            formatOpen: false,
            activeFormatCategory: 'electronic-document',
            startDate: '',
            endDate: '',
            page: 1,
            pageSize: 10,
            step: 1,
            currentId: '',
            form: null,
            formError: '',
            modalOpen: false,
            pendingTemplateId: '',
            pendingToast: ''
        };
        var toastTimer = null;

        document.addEventListener('click', function (event) {
            if (!state.formatOpen || event.target.closest('.resource-shelf-format-filter')) return;
            captureKeyword();
            state.formatOpen = false;
            state.formatKeyword = state.resourceFormat;
            renderList();
        });

        function clearPanelClasses() {
            panel.classList.remove(
                'is-placeholder',
                'is-service-management',
                'is-order-management',
                'is-supplier-order-management',
                'is-supplier-bill-management',
                'is-product-registration',
                'is-product-registration-editor',
                'is-resource-register-management',
                'is-resource-register-editor',
                'is-product-shelf',
                'is-product-shelf-editor',
                'is-resource-shelf',
                'is-resource-shelf-editor'
            );
        }

        function getRecord(id) {
            return RESOURCE_RECORDS.find(function (item) {
                return item.id === id;
            });
        }

        function getTemplate(id) {
            return CONTRACT_TEMPLATES.find(function (item) {
                return item.id === id;
            });
        }

        function defaultStrategyValues() {
            return {
                accessCount: '1000',
                accessTime: { start: '08:30', end: '18:30' },
                concurrency: '5',
                roleRestriction: ['开发者', '普通用户'],
                useRestriction: ['试用', '加工'],
                purposeRestriction: '仅用于资源申请中约定的数据分析、产品开发和公共服务优化场景。',
                storageRestriction: '脱敏后存储',
                toolRestriction: '仅允许使用平台可信分析工具和已备案的数据开发环境。',
                deleteControl: '合约到期自动删除',
                securityLevel: '可信',
                overagePolicy: '达到授权额度后暂停调用，并通知使用方申请扩容。',
                eventRestriction: '发生越权访问、批量异常下载或数据泄露时立即停止访问并上报。'
            };
        }

        function createForm(record) {
            return {
                deliverySpec: '',
                deliveryMethod: 'API传输',
                visuals: [],
                specialZoneId: record.specialZoneId || '',
                deliveryDescription: '通过平台API网关交付，调用方完成身份认证、签名校验和授权确认后，可按约定频率访问资源。',
                pricingMode: '按次数',
                price: '80',
                periodUnit: '月',
                supportPostpaid: false,
                transferMode: '双向支持(all)',
                digitalContract: '否',
                contractTemplateId: '',
                contractValues: {},
                strategies: ['accessCount', 'accessTime', 'concurrency'],
                strategyValues: defaultStrategyValues()
            };
        }

        function getStatusCount(status) {
            return RESOURCE_RECORDS.filter(function (item) {
                return item.status === status;
            }).length;
        }

        function renderTabs() {
            return STATUS_TABS.map(function (tab) {
                var showCount = tab.key === 'draft' || tab.key === 'reviewing' || tab.key === 'rejected';
                var count = showCount ? '<span class="product-shelf-tab-count">(' + getStatusCount(tab.key) + ')</span>' : '';
                return '<button class="product-shelf-tab' + (tab.key === state.activeStatus ? ' active' : '') + '" type="button" data-resource-shelf-tab="' + tab.key + '">'
                    + '<span>' + tab.label + '</span>' + count
                    + '</button>';
            }).join('');
        }

        function getFormatCategory(key) {
            return RESOURCE_FORMAT_TREE.find(function (item) {
                return item.key === key;
            }) || RESOURCE_FORMAT_TREE[0];
        }

        function getFormatMatches(keyword) {
            var normalized = keyword.trim().toLowerCase();
            if (!normalized) return [];
            var matches = [];
            RESOURCE_FORMAT_TREE.forEach(function (category) {
                if (category.terminal) {
                    if (category.label.toLowerCase().indexOf(normalized) !== -1) {
                        matches.push({ category: '', value: category.label, terminal: true });
                    }
                    return;
                }
                category.values.forEach(function (value) {
                    if (category.label.toLowerCase().indexOf(normalized) !== -1 || value.toLowerCase().indexOf(normalized) !== -1) {
                        matches.push({ category: category.label, value: value, terminal: false });
                    }
                });
            });
            return matches;
        }

        function renderFormatTree() {
            var activeCategory = getFormatCategory(state.activeFormatCategory);
            return ''
                + '<div class="resource-shelf-format-tree">'
                +   '<div class="resource-shelf-format-categories">'
                +       RESOURCE_FORMAT_TREE.map(function (category) {
                            var active = !category.terminal && category.key === activeCategory.key;
                            return '<button class="resource-shelf-format-category' + (active ? ' active' : '') + (category.terminal ? ' terminal' : '') + '" type="button" data-resource-shelf-format-category="' + category.key + '"><span>' + escapeHtml(category.label) + '</span>' + (category.terminal ? '' : icon('chevron_right')) + '</button>';
                        }).join('')
                +   '</div>'
                +   '<div class="resource-shelf-format-values">'
                +       (activeCategory.values || []).map(function (value) {
                            return '<button class="resource-shelf-format-value' + (state.resourceFormat === value ? ' active' : '') + '" type="button" data-resource-shelf-format-value="' + escapeHtml(value) + '">' + escapeHtml(value) + '</button>';
                        }).join('')
                +   '</div>'
                + '</div>';
        }

        function renderFormatSearchResults() {
            var matches = getFormatMatches(state.formatKeyword);
            if (!matches.length) {
                return '<div class="resource-shelf-format-empty">' + icon('search_off') + '<strong>未找到匹配的资源格式</strong><span>请尝试输入其他格式名称</span></div>';
            }
            return '<div class="resource-shelf-format-results">' + matches.map(function (match) {
                return '<button class="resource-shelf-format-result' + (match.terminal ? ' terminal' : '') + '" type="button" data-resource-shelf-format-value="' + escapeHtml(match.value) + '">'
                    + (match.terminal ? '<strong>' + escapeHtml(match.value) + '</strong>' : '<span>' + escapeHtml(match.category) + '</span><b>/</b><strong>' + escapeHtml(match.value) + '</strong>')
                    + '</button>';
            }).join('') + '</div>';
        }

        function renderResourceFormatFilter() {
            var inputValue = state.formatOpen ? state.formatKeyword : state.resourceFormat;
            return ''
                + '<div class="resource-shelf-format-filter' + (state.formatOpen ? ' open' : '') + '">'
                +   '<div class="resource-shelf-format-control" data-resource-shelf-format-toggle>'
                +       '<span>资源格式</span>'
                +       '<input type="text" value="' + escapeHtml(inputValue) + '" placeholder="请选择" autocomplete="off" role="combobox" aria-label="搜索并选择资源格式" aria-expanded="' + (state.formatOpen ? 'true' : 'false') + '" data-resource-shelf-format-input>'
                +       (state.resourceFormat ? '<button class="resource-shelf-clear-control" type="button" aria-label="清除资源格式" data-resource-shelf-format-clear>' + icon('close') + '</button>' : icon('search'))
                +   '</div>'
                +   (state.formatOpen ? '<div class="resource-shelf-format-dropdown">' + (state.formatKeyword.trim() ? renderFormatSearchResults() : renderFormatTree()) + '</div>' : '')
                + '</div>';
        }

        function captureKeyword() {
            var keyword = panel.querySelector('[data-resource-shelf-keyword]');
            if (keyword) state.keyword = keyword.value.trim();
        }

        function getFilteredRecords() {
            var keyword = state.keyword.trim().toLowerCase();
            return RESOURCE_RECORDS.filter(function (item) {
                var date = item.updatedAt.slice(0, 10);
                if (item.status !== state.activeStatus) return false;
                if (state.resourceFormat && item.format !== state.resourceFormat) return false;
                if (state.startDate && date < state.startDate) return false;
                if (state.endDate && date > state.endDate) return false;
                if (!keyword) return true;
                return [item.name, item.code].join(' ').toLowerCase().indexOf(keyword) !== -1;
            });
        }

        function actionForRecord(item) {
            if (item.status === 'pending') return { label: '上架', icon: 'publish', action: 'shelf' };
            if (item.status === 'draft') return { label: '继续上架', icon: 'edit_square', action: 'shelf' };
            if (item.status === 'offline' || item.status === 'rejected') return { label: '重新上架', icon: 'refresh', action: 'shelf' };
            return { label: '查看', icon: 'visibility', action: 'view' };
        }

        function renderRows(records) {
            if (!records.length) {
                return '<tr><td class="product-shelf-empty" colspan="6">暂无符合当前条件的数据资源</td></tr>';
            }
            return records.map(function (item) {
                var action = actionForRecord(item);
                return ''
                    + '<tr>'
                    +   '<td><span class="product-shelf-code" title="' + escapeHtml(item.code) + '">' + escapeHtml(item.code) + '</span></td>'
                    +   '<td><span class="product-shelf-name" title="' + escapeHtml(item.name) + '">' + escapeHtml(item.name) + '</span></td>'
                    +   '<td>' + escapeHtml(item.format) + '</td>'
                    +   '<td>' + escapeHtml(item.updatedAt) + '</td>'
                    +   '<td>' + escapeHtml(item.source) + '</td>'
                    +   '<td class="product-shelf-action-cell">'
                    +       '<button class="product-shelf-action' + (action.action === 'view' ? ' secondary' : '') + '" type="button" data-resource-shelf-action="' + action.action + '" data-resource-shelf-id="' + escapeHtml(item.id) + '">'
                    +           icon(action.icon) + '<span>' + action.label + '</span>'
                    +       '</button>'
                    +   '</td>'
                    + '</tr>';
            }).join('');
        }

        function renderPagination(total, totalPages) {
            var buttons = [];
            for (var page = 1; page <= totalPages; page += 1) {
                buttons.push('<button class="product-shelf-page-button' + (page === state.page ? ' active' : '') + '" type="button" data-resource-shelf-page="' + page + '">' + page + '</button>');
            }
            return ''
                + '<div class="product-shelf-pagination">'
                +   '<span>共 ' + total + ' 条</span>'
                +   '<button class="product-shelf-page-button" type="button" aria-label="上一页" data-resource-shelf-page="prev"' + (state.page <= 1 ? ' disabled' : '') + '>' + icon('chevron_left') + '</button>'
                +   buttons.join('')
                +   '<button class="product-shelf-page-button" type="button" aria-label="下一页" data-resource-shelf-page="next"' + (state.page >= totalPages ? ' disabled' : '') + '>' + icon('chevron_right') + '</button>'
                +   '<select class="product-shelf-page-size" aria-label="每页条数" data-resource-shelf-page-size>'
                +       '<option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10 条/页</option>'
                +       '<option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20 条/页</option>'
                +   '</select>'
                +   '<span>前往</span>'
                +   '<input class="product-shelf-page-jump" type="number" min="1" max="' + totalPages + '" aria-label="前往页码" data-resource-shelf-page-jump>'
                + '</div>';
        }

        function renderTable() {
            var filtered = getFilteredRecords();
            var totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
            if (state.page > totalPages) state.page = totalPages;
            var start = (state.page - 1) * state.pageSize;
            var records = filtered.slice(start, start + state.pageSize);
            return ''
                + '<div class="product-shelf-table-card">'
                +   '<div class="product-shelf-table-scroll" aria-label="资源上下架列表，可横向滚动">'
                +       '<table class="product-shelf-table">'
                +           '<colgroup><col class="col-code"><col class="col-name"><col class="col-type"><col class="col-updated"><col class="col-source"><col class="col-action"></colgroup>'
                +           '<thead><tr><th>数据资源标识码</th><th>资源名称</th><th>资源格式</th><th>更新时间</th><th>登记来源</th><th class="product-shelf-action-cell">操作</th></tr></thead>'
                +           '<tbody>' + renderRows(records) + '</tbody>'
                +       '</table>'
                +   '</div>'
                +   renderPagination(filtered.length, totalPages)
                + '</div>';
        }

        function renderList() {
            clearPanelClasses();
            panel.classList.add('is-product-shelf', 'is-resource-shelf');
            if (title) {
                title.style.display = '';
                title.textContent = '资源上下架管理';
            }
            document.title = '资源上下架管理 - 供方中心';
            panel.innerHTML = ''
                + '<div class="product-shelf-board">'
                +   '<div class="product-shelf-tabs" role="tablist">' + renderTabs() + '</div>'
                +   '<div class="product-shelf-filter-bar">'
                +       '<div class="product-shelf-search resource-shelf-keyword-search"><input type="search" value="' + escapeHtml(state.keyword) + '" placeholder="请输入数据资源标识码或名称" aria-label="搜索数据资源" data-resource-shelf-keyword><button class="resource-shelf-clear-control" type="button" aria-label="清除搜索内容" data-resource-shelf-keyword-clear' + (state.keyword ? '' : ' hidden') + '>' + icon('close') + '</button>' + icon('search') + '</div>'
                +       renderResourceFormatFilter()
                +       '<div class="product-shelf-date-range">'
                +           '<span>更新时间</span>'
                +           '<input type="date" value="' + escapeHtml(state.startDate) + '" aria-label="更新开始日期" data-resource-shelf-start-date>'
                +           '<b>至</b>'
                +           '<input type="date" value="' + escapeHtml(state.endDate) + '" aria-label="更新结束日期" data-resource-shelf-end-date>'
                +           (state.startDate || state.endDate ? '<button class="resource-shelf-clear-control" type="button" aria-label="清除更新时间" data-resource-shelf-date-clear>' + icon('close') + '</button>' : icon('calendar_month'))
                +       '</div>'
                +       '<button class="product-shelf-filter-button primary" type="button" data-resource-shelf-search>' + icon('search') + '<span>查询</span></button>'
                +       '<button class="product-shelf-filter-button" type="button" data-resource-shelf-reset>' + icon('restart_alt') + '<span>重置</span></button>'
                +   '</div>'
                +   renderTable()
                + '</div>'
                + '<div class="product-shelf-toast" role="status" aria-live="polite" data-resource-shelf-toast>' + icon('check_circle') + '<span></span></div>';
            bindListEvents();
            if (state.formatOpen) {
                var formatInput = panel.querySelector('[data-resource-shelf-format-input]');
                if (formatInput) {
                    formatInput.focus();
                    formatInput.setSelectionRange(formatInput.value.length, formatInput.value.length);
                }
            }
            if (state.pendingToast) {
                var message = state.pendingToast;
                state.pendingToast = '';
                showToast(message);
            }
        }

        function renderStepMarker(step, label) {
            var statusClass = state.step === step ? ' active' : (state.step > step ? ' complete' : '');
            var marker = state.step > step ? icon('check') : String(step);
            return '<div class="product-shelf-step' + statusClass + '"><i>' + marker + '</i><span>' + label + '</span></div>';
        }

        function renderEditorHeader() {
            return ''
                + '<header class="product-shelf-editor-header resource-shelf-editor-header">'
                +   '<button class="product-shelf-editor-back" type="button" data-resource-shelf-editor-action="cancel">' + icon('arrow_back_ios_new') + '<span>数据资源上架</span></button>'
                +   '<div class="product-shelf-steps resource-shelf-steps" aria-label="数据资源上架步骤">'
                +       renderStepMarker(1, '基本信息')
                +       '<span class="product-shelf-step-line' + (state.step > 1 ? ' active' : '') + '"></span>'
                +       renderStepMarker(2, '定价信息')
                +       '<span class="product-shelf-step-line' + (state.step > 2 ? ' active' : '') + '"></span>'
                +       renderStepMarker(3, '交付要求')
                +   '</div>'
                +   '<span aria-hidden="true"></span>'
                + '</header>';
        }

        function renderSummary(record) {
            var rows = [
                ['资源名称', record.name],
                ['资源所属行业分类', record.industry],
                ['地域分类', record.region],
                ['覆盖时间范围', record.coverage],
                ['更新频率', record.frequency],
                ['开发利用条件', record.developmentTerms],
                ['流通类型', record.circulationType],
                ['资源持有方', record.holder],
                ['联系人', record.contact],
                ['联系方式', record.contactInfo],
                ['资源摘要', record.summary],
                ['资源格式', record.format],
                ['数据来源', record.dataSource],
                ['是否涉及个人信息', record.personalInfo],
                ['数据资源标识码', record.code],
                ['其他', record.other]
            ];
            return '<dl class="product-shelf-summary-card resource-shelf-summary-card">'
                + rows.map(function (row) {
                    return '<div class="product-shelf-summary-item"><dt>' + row[0] + '：</dt><dd>' + escapeHtml(row[1]) + '</dd></div>';
                }).join('')
                + '</dl>';
        }

        function renderFormRow(label, required, content, hint, testId) {
            return ''
                + '<div class="product-shelf-form-row"' + (testId ? ' data-testid="' + testId + '"' : '') + '>'
                +   '<div class="product-shelf-form-label' + (required ? ' required' : '') + '">' + label + '</div>'
                +   '<div class="product-shelf-form-control">' + content + (hint ? '<p class="product-shelf-form-hint">' + hint + '</p>' : '') + '</div>'
                + '</div>';
        }

        function getPublishedSpecialZones() {
            if (!window.SpecialZoneStore || typeof window.SpecialZoneStore.listZones !== 'function') return [];
            return window.SpecialZoneStore.listZones().filter(function (zone) {
                return zone.status === 'published';
            });
        }

        function renderSpecialZoneOptions(selectedId) {
            var zones = getPublishedSpecialZones();
            var options = '<option value="">请选择</option>';
            if (!zones.length) {
                return options + '<option value="" disabled>暂无已上架特色专区</option>';
            }
            return options + zones.map(function (zone) {
                return '<option value="' + escapeHtml(zone.id) + '"' + (selectedId === zone.id ? ' selected' : '') + '>' + escapeHtml(zone.name) + '</option>';
            }).join('');
        }

        function renderStepOne(record) {
            var form = state.form;
            var alertMessage = state.formError === 'basic'
                ? '请补充完整交付方式说明、交付方式和资源图片。'
                : state.formError;
            var fileControl = form.deliverySpec
                ? '<div class="product-shelf-file">' + icon('description') + '<span class="product-shelf-file-name">' + escapeHtml(form.deliverySpec) + '</span>' + icon('check_circle') + '<button class="product-shelf-file-delete" type="button" aria-label="删除交付方式说明" data-resource-shelf-remove-file>' + icon('delete') + '</button></div>'
                : '<button class="product-shelf-upload-button" type="button" data-resource-shelf-upload-file>' + icon('upload_file') + '<span>上传交付说明</span></button>';
            var imageControl = '<div data-resource-image-icon-picker></div>';
            return ''
                + '<div class="product-shelf-step-content resource-shelf-step-content">'
                +   '<h2 class="product-shelf-section-title">资源登记信息</h2>'
                +   renderSummary(record)
                +   '<h2 class="product-shelf-section-title resource-shelf-listing-title">资源上架信息</h2>'
                +   '<div class="product-shelf-form">'
                +       (alertMessage ? '<div class="product-shelf-form-alert">' + icon('error') + '<span>' + escapeHtml(alertMessage) + '</span></div>' : '')
                +       renderFormRow('交付方式说明', true, fileControl, '请上传 1 个交付说明文件，支持 doc、docx、pdf 格式，单个文件不超过 3MB。')
                +       renderFormRow('交付方式', true, '<select aria-label="交付方式" data-resource-shelf-field="deliveryMethod"><option value="API传输" selected>API传输</option></select>', '本次原型按截图实现 API 传输分支。')
                +       renderFormRow('资源图片', true, imageControl, '支持上传 jpg、jpeg、png 图片，或从图标库选择；建议尺寸 128 × 128，单张不超过 5MB。')
                +       renderFormRow('特色专区', false, '<select aria-label="特色专区" data-resource-shelf-field="specialZoneId">' + renderSpecialZoneOptions(form.specialZoneId) + '</select>')
                +       renderFormRow('交付说明', false, '<div class="product-shelf-counted"><textarea class="product-shelf-textarea" maxlength="500" data-resource-shelf-field="deliveryDescription" data-resource-counter="deliveryDescription">' + escapeHtml(form.deliveryDescription) + '</textarea><span class="product-shelf-counter">' + form.deliveryDescription.length + '/500</span></div>')
                +   '</div>'
                +   '<input class="product-shelf-hidden-input" type="file" accept=".doc,.docx,.pdf" data-resource-shelf-file-input>'
                + '</div>';
        }

        function renderRadioOptions(name, options, selected, attribute) {
            return '<div class="product-shelf-radio-group">' + options.map(function (option) {
                return '<label><input type="radio" name="' + name + '" value="' + escapeHtml(option) + '" ' + attribute + '="' + escapeHtml(option) + '"' + (selected === option ? ' checked' : '') + '><span>' + escapeHtml(option) + '</span></label>';
            }).join('') + '</div>';
        }

        function pricingLabel() {
            if (state.form.pricingMode === '按周期') return '按周期定价';
            if (state.form.pricingMode === '按次数') return '按次数定价';
            return '按流量定价';
        }

        function pricingUnit() {
            if (state.form.pricingMode === '按周期') {
                return '<select class="product-shelf-pricing-unit" aria-label="周期单位" data-resource-shelf-pricing-field="periodUnit">'
                    + '<option value="天"' + (state.form.periodUnit === '天' ? ' selected' : '') + '>元/天</option>'
                    + '<option value="月"' + (state.form.periodUnit === '月' ? ' selected' : '') + '>元/月</option>'
                    + '<option value="年"' + (state.form.periodUnit === '年' ? ' selected' : '') + '>元/年</option>'
                    + '</select>';
            }
            return '<span class="product-shelf-pricing-unit">' + (state.form.pricingMode === '按次数' ? '元/次' : '元/MB') + '</span>';
        }

        function renderStepTwo() {
            var form = state.form;
            var pricingContent = '';
            if (form.pricingMode !== '一事一议') {
                pricingContent = renderFormRow(
                    pricingLabel(),
                    true,
                    '<div class="product-shelf-radio-group"><div class="product-shelf-pricing-box"><input class="product-shelf-input" type="number" min="0" step="0.01" value="' + escapeHtml(form.price) + '" placeholder="请输入价格" data-resource-shelf-pricing-field="price">' + pricingUnit() + '</div>'
                    + (form.pricingMode === '按次数' || form.pricingMode === '按流量'
                        ? '<label class="product-shelf-inline-control"><input type="checkbox" data-resource-shelf-pricing-field="supportPostpaid"' + (form.supportPostpaid ? ' checked' : '') + '><span>支持后付费</span></label>'
                        : '')
                    + '</div>'
                );
            }
            return ''
                + '<div class="product-shelf-step-content resource-shelf-step-content">'
                +   '<h2 class="product-shelf-section-title">' + escapeHtml(form.deliveryMethod) + '</h2>'
                +   '<div class="product-shelf-form">'
                +       (state.formError ? '<div class="product-shelf-form-alert">' + icon('error') + '<span>请输入大于 0 的资源价格。</span></div>' : '')
                +       renderFormRow('计量方式', true, renderRadioOptions('resourcePricingMode', ['按周期', '按次数', '按流量', '一事一议'], form.pricingMode, 'data-resource-shelf-price-mode'))
                +       pricingContent
                +   '</div>'
                + '</div>';
        }

        function renderStrategyOptions() {
            return '<div class="product-shelf-checkbox-group resource-shelf-strategy-grid">' + STRATEGIES.map(function (strategy) {
                return '<label><input type="checkbox" value="' + strategy.key + '" data-resource-shelf-strategy="' + strategy.key + '" data-testid="resource-strategy-' + strategy.key + '"' + (state.form.strategies.indexOf(strategy.key) !== -1 ? ' checked' : '') + '><span>' + strategy.label + '</span></label>';
            }).join('') + '</div>';
        }

        function hasStrategy(key) {
            return state.form.strategies.indexOf(key) !== -1;
        }

        function renderMultiChoice(key, options, selected) {
            return '<div class="product-shelf-checkbox-group">' + options.map(function (option) {
                return '<label><input type="checkbox" value="' + escapeHtml(option) + '" data-resource-shelf-array-field="' + key + '"' + (selected.indexOf(option) !== -1 ? ' checked' : '') + '><span>' + escapeHtml(option) + '</span></label>';
            }).join('') + '</div>';
        }

        function renderStrategyRadio(key, options, selected) {
            return '<div class="product-shelf-radio-group">' + options.map(function (option) {
                return '<label><input type="radio" name="strategy-' + key + '" value="' + escapeHtml(option) + '" data-resource-shelf-strategy-radio="' + key + '"' + (selected === option ? ' checked' : '') + '><span>' + escapeHtml(option) + '</span></label>';
            }).join('') + '</div>';
        }

        function renderCountedStrategyTextarea(key, maxLength) {
            var value = state.form.strategyValues[key] || '';
            return '<div class="product-shelf-counted"><textarea class="product-shelf-textarea" maxlength="' + maxLength + '" data-resource-shelf-strategy-field="' + key + '" data-resource-counter="' + key + '">' + escapeHtml(value) + '</textarea><span class="product-shelf-counter">' + value.length + '/' + maxLength + '</span></div>';
        }

        function renderStrategyField(key) {
            var values = state.form.strategyValues;
            if (key === 'accessCount') {
                return renderFormRow('访问次数限制', true, '<div class="product-shelf-input-group"><input class="product-shelf-input" type="number" min="1" value="' + escapeHtml(values.accessCount) + '" data-resource-shelf-strategy-field="accessCount"><b>次/日</b></div>', '', 'resource-strategy-field-accessCount');
            }
            if (key === 'accessTime') {
                return renderFormRow('访问时间限制', true, '<div class="product-shelf-time-range"><input type="time" value="' + escapeHtml(values.accessTime.start) + '" aria-label="访问开始时间" data-resource-shelf-time-field="start"><span>至</span><input type="time" value="' + escapeHtml(values.accessTime.end) + '" aria-label="访问结束时间" data-resource-shelf-time-field="end">' + icon('schedule') + '</div>', '', 'resource-strategy-field-accessTime');
            }
            if (key === 'concurrency') {
                return renderFormRow('并发限制', true, '<div class="product-shelf-input-group"><input class="product-shelf-input" type="number" min="1" value="' + escapeHtml(values.concurrency) + '" data-resource-shelf-strategy-field="concurrency"><b>次/秒</b></div>', '', 'resource-strategy-field-concurrency');
            }
            if (key === 'roleRestriction') {
                return renderFormRow('使用用户角色限制', true, renderMultiChoice(key, ['管理员', '开发者', '普通用户'], values.roleRestriction), '', 'resource-strategy-field-roleRestriction');
            }
            if (key === 'useRestriction') {
                return renderFormRow('使用限制', true, renderMultiChoice(key, ['试用', '加工', '售卖', '存留', '公开'], values.useRestriction), '', 'resource-strategy-field-useRestriction');
            }
            if (key === 'purposeRestriction') {
                return renderFormRow('用途限制', true, renderCountedStrategyTextarea(key, 400), '', 'resource-strategy-field-purposeRestriction');
            }
            if (key === 'storageRestriction') {
                return renderFormRow('存储限制', true, renderStrategyRadio(key, ['明文存储', '密文存储', '脱敏后存储', '匿名化后存储', '不允许本地存储'], values.storageRestriction), '', 'resource-strategy-field-storageRestriction');
            }
            if (key === 'toolRestriction') {
                return renderFormRow('使用工具限制', true, renderCountedStrategyTextarea(key, 400), '', 'resource-strategy-field-toolRestriction');
            }
            if (key === 'deleteControl') {
                return renderFormRow('删除控制', true, '<select aria-label="删除控制" data-resource-shelf-strategy-field="deleteControl"><option value="">请选择</option><option value="合约到期自动删除"' + (values.deleteControl === '合约到期自动删除' ? ' selected' : '') + '>合约到期自动删除</option><option value="到期后7日内删除"' + (values.deleteControl === '到期后7日内删除' ? ' selected' : '') + '>到期后7日内删除</option><option value="供方确认后删除"' + (values.deleteControl === '供方确认后删除' ? ' selected' : '') + '>供方确认后删除</option><option value="不允许本地留存"' + (values.deleteControl === '不允许本地留存' ? ' selected' : '') + '>不允许本地留存</option></select>', '', 'resource-strategy-field-deleteControl');
            }
            if (key === 'securityLevel') {
                return renderFormRow('使用环境安全级别限制', true, renderStrategyRadio(key, ['基础', '可信', '可信+'], values.securityLevel), '', 'resource-strategy-field-securityLevel');
            }
            if (key === 'overagePolicy') {
                return renderFormRow('超额策略', true, renderCountedStrategyTextarea(key, 400), '', 'resource-strategy-field-overagePolicy');
            }
            return renderFormRow('事件限制', true, renderCountedStrategyTextarea(key, 400), '', 'resource-strategy-field-eventRestriction');
        }

        function renderDynamicStrategyFields() {
            var selected = STRATEGIES.filter(function (strategy) {
                return hasStrategy(strategy.key);
            });
            if (!selected.length) {
                return '<div class="resource-shelf-strategy-empty">' + icon('rule') + '<span>请选择控制策略，所选策略的配置表单将在此处显示。</span></div>';
            }
            return '<div class="resource-shelf-dynamic-fields">' + selected.map(function (strategy) {
                return renderStrategyField(strategy.key);
            }).join('') + '</div>';
        }

        function strategyLabel(key) {
            var strategy = STRATEGIES.find(function (item) { return item.key === key; });
            return strategy ? strategy.label : key;
        }

        function contractConstraintLabel(key) {
            return ({
                timeRange: '时间范围',
                timeWindow: '时间窗口',
                usageCount: '使用次数',
                usageFrequency: '使用频次',
                networkAddress: '网络地址'
            })[key] || key;
        }

        function contractValueSummary(key, value) {
            if (key === 'timeRange') return value.start + '~' + value.end;
            if (key === 'timeWindow') return value.start + '-' + value.end;
            if (key === 'usageFrequency') return value.value + value.unit;
            return value;
        }

        function renderContractValueEditor(key, value) {
            if (key === 'timeRange') {
                return '<div class="resource-shelf-contract-range"><input type="date" value="' + escapeHtml(value.start) + '" aria-label="合约开始日期" data-resource-shelf-contract-field="timeRange.start"><span>至</span><input type="date" value="' + escapeHtml(value.end) + '" aria-label="合约结束日期" data-resource-shelf-contract-field="timeRange.end">' + icon('calendar_month') + '</div>';
            }
            if (key === 'timeWindow') {
                return '<div class="resource-shelf-contract-range"><input type="time" step="1" value="' + escapeHtml(value.start) + '" aria-label="合约开始时间" data-resource-shelf-contract-field="timeWindow.start"><span>至</span><input type="time" step="1" value="' + escapeHtml(value.end) + '" aria-label="合约结束时间" data-resource-shelf-contract-field="timeWindow.end">' + icon('schedule') + '</div>';
            }
            if (key === 'usageCount') {
                return '<input class="resource-shelf-contract-input" type="number" min="1" step="1" value="' + escapeHtml(value) + '" aria-label="合约使用次数" data-resource-shelf-contract-field="usageCount">';
            }
            if (key === 'usageFrequency') {
                return '<div class="resource-shelf-contract-frequency"><input type="number" min="1" step="1" value="' + escapeHtml(value.value) + '" aria-label="合约使用频次" data-resource-shelf-contract-field="usageFrequency.value"><select aria-label="使用频次单位" data-resource-shelf-contract-field="usageFrequency.unit"><option value="次/秒"' + (value.unit === '次/秒' ? ' selected' : '') + '>次/秒</option><option value="次/分钟"' + (value.unit === '次/分钟' ? ' selected' : '') + '>次/分钟</option><option value="次/小时"' + (value.unit === '次/小时' ? ' selected' : '') + '>次/小时</option></select></div>';
            }
            return '<input class="resource-shelf-contract-input" type="text" value="' + escapeHtml(value) + '" aria-label="合约网络地址" data-resource-shelf-contract-field="networkAddress">';
        }

        function renderContractRows(template, values, editable) {
            var keys = Object.keys(template.constraints);
            return keys.map(function (key, index) {
                var value = values[key] == null ? copyValue(template.constraints[key]) : values[key];
                return '<tr>'
                    + (index === 0 ? '<td rowspan="' + keys.length + '"><strong>' + escapeHtml(template.strategyName) + '</strong></td><td rowspan="' + keys.length + '">' + escapeHtml(template.behavior) + '</td>' : '')
                    + '<td>' + escapeHtml(contractConstraintLabel(key)) + '</td>'
                    + '<td>' + (editable ? renderContractValueEditor(key, value) : '<span class="resource-shelf-contract-value">' + escapeHtml(contractValueSummary(key, value)) + '</span>') + '</td>'
                    + '</tr>';
            }).join('');
        }

        function renderContractPicker() {
            var template = getTemplate(state.form.contractTemplateId);
            return '<button class="resource-shelf-contract-picker" type="button" data-resource-shelf-open-template>'
                + '<span>' + (template ? escapeHtml(template.name) : '请选择数字合约模板') + '</span>'
                + icon('more_vert')
                + '</button>';
        }

        function renderContractPreview() {
            var template = getTemplate(state.form.contractTemplateId);
            if (!template) return '';
            return ''
                + '<div class="resource-shelf-contract-preview">'
                +   '<div class="resource-shelf-contract-caption">' + icon('contract_edit') + '<span>已关联数字合约模板，可根据本次上架要求调整约束条件具体值。</span></div>'
                +   '<div class="resource-shelf-contract-table-wrap">'
                +       '<table class="resource-shelf-contract-table">'
                +           '<thead><tr><th>策略模板</th><th>行为</th><th>约束条件</th><th>约束条件具体值</th></tr></thead>'
                +           '<tbody>' + renderContractRows(template, state.form.contractValues, true) + '</tbody>'
                +       '</table>'
                +   '</div>'
                + '</div>';
        }

        function renderStepThree() {
            var form = state.form;
            var contractRows = '';
            if (form.digitalContract === '是') {
                contractRows = renderFormRow('数字合约模板', true, renderContractPicker(), '所选模板将作为后续交易生成数字合约的预设依据；模板中的约束条件可按本次上架要求调整，最终以交易双方确认并签署的合约内容为准。') + renderContractPreview();
            }
            return ''
                + '<div class="product-shelf-step-content resource-shelf-step-content">'
                +   '<div class="product-shelf-form resource-shelf-delivery-form">'
                +       (state.formError ? '<div class="product-shelf-form-alert">' + icon('error') + '<span>' + escapeHtml(state.formError) + '</span></div>' : '')
                +       renderFormRow('传输模式', true, renderRadioOptions('resourceTransferMode', ['拉取(pull)', '推送(push)', '双向支持(all)'], form.transferMode, 'data-resource-shelf-transfer-mode'))
                +       renderFormRow('数字合约', true, renderRadioOptions('resourceDigitalContract', ['是', '否'], form.digitalContract, 'data-resource-shelf-digital-contract'), '数字合约是将数据使用范围、访问方式、调用频次、安全要求等交易约束数字化记录的电子合约，用于明确供需双方的权利义务，并为后续合约签署、履约监测和异常处置提供依据。')
                +       contractRows
                +   '</div>'
                +   '<div class="product-shelf-api-tag"><span>API传输</span></div>'
                +   '<h3 class="product-shelf-subsection-title">控制策略</h3>'
                +   '<div class="product-shelf-form resource-shelf-control-form">'
                +       renderFormRow('控制策略', true, renderStrategyOptions(), '选择或取消策略后，下方表单立即联动。')
                +       renderDynamicStrategyFields()
                +   '</div>'
                + '</div>';
        }

        function renderTemplateModal() {
            if (!state.modalOpen) return '';
            var selected = getTemplate(state.pendingTemplateId) || CONTRACT_TEMPLATES[0];
            return ''
                + '<div class="resource-shelf-modal-backdrop" data-resource-shelf-modal-backdrop>'
                +   '<section class="resource-shelf-modal" role="dialog" aria-modal="true" aria-labelledby="resource-contract-modal-title">'
                +       '<header class="resource-shelf-modal-header"><h2 id="resource-contract-modal-title">选择数字合约模板</h2><button type="button" aria-label="关闭合约模板弹窗" data-resource-shelf-template-close>' + icon('close') + '</button></header>'
                +       '<div class="resource-shelf-modal-body">'
                +           '<nav class="resource-shelf-template-list" aria-label="数字合约模板列表">'
                +               CONTRACT_TEMPLATES.map(function (template) {
                                    return '<button class="resource-shelf-template-item' + (template.id === selected.id ? ' active' : '') + '" type="button" data-resource-shelf-template-id="' + template.id + '">' + icon('description') + '<span>' + escapeHtml(template.name) + '</span></button>';
                                }).join('')
                +           '</nav>'
                +           '<div class="resource-shelf-template-detail">'
                +               '<div class="resource-shelf-template-intro"><span>操作类行为：数据使用方在使用数据产品时的操作</span></div>'
                +               '<div class="resource-shelf-contract-table-wrap">'
                +                   '<table class="resource-shelf-contract-table">'
                +                       '<thead><tr><th>策略模板</th><th>行为</th><th>约束条件</th><th>约束条件具体值</th></tr></thead>'
                +                       '<tbody>' + renderContractRows(selected, selected.constraints, false) + '</tbody>'
                +                   '</table>'
                +               '</div>'
                +           '</div>'
                +       '</div>'
                +       '<footer class="resource-shelf-modal-footer"><button class="product-shelf-footer-button" type="button" data-resource-shelf-template-close>' + icon('close') + '<span>取消</span></button><button class="product-shelf-footer-button primary" type="button" data-resource-shelf-template-confirm>' + icon('check') + '<span>确定</span></button></footer>'
                +   '</section>'
                + '</div>';
        }

        function renderEditorFooter() {
            return ''
                + '<footer class="product-shelf-editor-footer">'
                +   '<button class="product-shelf-footer-button" type="button" data-resource-shelf-editor-action="cancel">' + icon('close') + '<span>取消</span></button>'
                +   '<button class="product-shelf-footer-button" type="button" data-resource-shelf-editor-action="draft">' + icon('save') + '<span>保存草稿</span></button>'
                +   (state.step > 1 ? '<button class="product-shelf-footer-button" type="button" data-resource-shelf-editor-action="prev">' + icon('arrow_back') + '<span>上一步</span></button>' : '')
                +   (state.step < 3
                    ? '<button class="product-shelf-footer-button primary" type="button" data-resource-shelf-editor-action="next"><span>下一步</span>' + icon('arrow_forward') + '</button>'
                    : '<button class="product-shelf-footer-button primary" type="button" data-resource-shelf-editor-action="submit">' + icon('publish') + '<span>上架</span></button>')
                + '</footer>';
        }

        function renderEditor() {
            var record = getRecord(state.currentId);
            if (!record) {
                state.view = 'list';
                renderList();
                return;
            }
            clearPanelClasses();
            panel.classList.add('is-product-shelf-editor', 'is-resource-shelf-editor');
            if (title) title.style.display = 'none';
            document.title = '数据资源上架 - 供方中心';
            panel.innerHTML = ''
                + '<div class="product-shelf-editor">'
                +   renderEditorHeader()
                +   '<div class="product-shelf-editor-body">' + (state.step === 1 ? renderStepOne(record) : (state.step === 2 ? renderStepTwo() : renderStepThree())) + '</div>'
                +   renderEditorFooter()
                + '</div>'
                + '<div class="product-shelf-toast" role="status" aria-live="polite" data-resource-shelf-toast>' + icon('check_circle') + '<span></span></div>'
                + renderTemplateModal();
            bindEditorEvents();
        }

        function showToast(message) {
            var toast = panel.querySelector('[data-resource-shelf-toast]');
            if (!toast) return;
            toast.querySelector('span').textContent = message;
            toast.classList.add('show');
            window.clearTimeout(toastTimer);
            toastTimer = window.setTimeout(function () {
                toast.classList.remove('show');
            }, 2400);
        }

        function changePage(value) {
            var totalPages = Math.max(1, Math.ceil(getFilteredRecords().length / state.pageSize));
            state.page = Math.min(totalPages, Math.max(1, parseInt(value, 10) || 1));
            state.formatOpen = false;
            renderList();
        }

        function applyFilters() {
            captureKeyword();
            state.formatOpen = false;
            state.page = 1;
            renderList();
        }

        function openEditor(id) {
            var record = getRecord(id);
            if (!record) return;
            state.view = 'editor';
            state.currentId = id;
            state.step = 1;
            state.form = createForm(record);
            state.formError = '';
            state.modalOpen = false;
            state.formatOpen = false;
            renderEditor();
        }

        function bindListEvents() {
            panel.querySelectorAll('[data-resource-shelf-tab]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.activeStatus = this.dataset.resourceShelfTab;
                    state.formatOpen = false;
                    state.page = 1;
                    renderList();
                });
            });

            var keyword = panel.querySelector('[data-resource-shelf-keyword]');
            if (keyword) {
                keyword.addEventListener('input', function () {
                    var clearButton = panel.querySelector('[data-resource-shelf-keyword-clear]');
                    if (clearButton) clearButton.hidden = !this.value;
                });
                keyword.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') {
                        state.formatOpen = false;
                        applyFilters();
                    }
                });
            }

            var keywordClear = panel.querySelector('[data-resource-shelf-keyword-clear]');
            if (keywordClear) keywordClear.addEventListener('click', function () {
                state.keyword = '';
                state.formatOpen = false;
                state.page = 1;
                renderList();
            });

            var search = panel.querySelector('[data-resource-shelf-search]');
            if (search) search.addEventListener('click', function () {
                state.formatOpen = false;
                applyFilters();
            });

            var formatToggle = panel.querySelector('[data-resource-shelf-format-toggle]');
            if (formatToggle) formatToggle.addEventListener('click', function () {
                if (state.formatOpen) return;
                captureKeyword();
                state.formatOpen = true;
                state.formatKeyword = state.resourceFormat;
                renderList();
            });

            var formatClear = panel.querySelector('[data-resource-shelf-format-clear]');
            if (formatClear) formatClear.addEventListener('click', function (event) {
                event.stopPropagation();
                captureKeyword();
                state.resourceFormat = '';
                state.formatKeyword = '';
                state.formatOpen = false;
                state.page = 1;
                renderList();
            });

            var formatInput = panel.querySelector('[data-resource-shelf-format-input]');
            if (formatInput) {
                formatInput.addEventListener('input', function () {
                    captureKeyword();
                    state.formatKeyword = this.value;
                    if (state.resourceFormat && this.value !== state.resourceFormat) state.resourceFormat = '';
                    state.formatOpen = true;
                    state.page = 1;
                    renderList();
                });
                formatInput.addEventListener('keydown', function (event) {
                    if (event.key === 'Escape') {
                        state.formatOpen = false;
                        state.formatKeyword = state.resourceFormat;
                        renderList();
                        return;
                    }
                    if (event.key !== 'Enter') return;
                    var matches = getFormatMatches(this.value);
                    var exact = matches.filter(function (match) {
                        return match.value.toLowerCase() === formatInput.value.trim().toLowerCase();
                    });
                    var selected = exact.length === 1 ? exact[0] : (matches.length === 1 ? matches[0] : null);
                    if (!selected) return;
                    captureKeyword();
                    state.resourceFormat = selected.value;
                    state.formatKeyword = selected.value;
                    state.formatOpen = false;
                    state.page = 1;
                    renderList();
                });
            }

            panel.querySelectorAll('[data-resource-shelf-format-category]').forEach(function (button) {
                button.addEventListener('click', function () {
                    captureKeyword();
                    var category = getFormatCategory(this.dataset.resourceShelfFormatCategory);
                    if (category.terminal) {
                        state.resourceFormat = category.label;
                        state.formatKeyword = category.label;
                        state.formatOpen = false;
                        state.page = 1;
                        renderList();
                        return;
                    }
                    state.activeFormatCategory = category.key;
                    state.formatKeyword = '';
                    renderList();
                });
            });

            panel.querySelectorAll('[data-resource-shelf-format-value]').forEach(function (button) {
                button.addEventListener('click', function () {
                    captureKeyword();
                    state.resourceFormat = this.dataset.resourceShelfFormatValue;
                    state.formatKeyword = state.resourceFormat;
                    state.formatOpen = false;
                    state.page = 1;
                    renderList();
                });
            });

            var startDate = panel.querySelector('[data-resource-shelf-start-date]');
            if (startDate) startDate.addEventListener('change', function () {
                captureKeyword();
                state.startDate = this.value;
                state.formatOpen = false;
                state.page = 1;
                renderList();
            });

            var endDate = panel.querySelector('[data-resource-shelf-end-date]');
            if (endDate) endDate.addEventListener('change', function () {
                captureKeyword();
                state.endDate = this.value;
                state.formatOpen = false;
                state.page = 1;
                renderList();
            });

            var dateClear = panel.querySelector('[data-resource-shelf-date-clear]');
            if (dateClear) dateClear.addEventListener('click', function () {
                captureKeyword();
                state.startDate = '';
                state.endDate = '';
                state.formatOpen = false;
                state.page = 1;
                renderList();
            });

            var reset = panel.querySelector('[data-resource-shelf-reset]');
            if (reset) reset.addEventListener('click', function () {
                state.keyword = '';
                state.resourceFormat = '';
                state.formatKeyword = '';
                state.formatOpen = false;
                state.startDate = '';
                state.endDate = '';
                state.page = 1;
                renderList();
            });

            panel.querySelectorAll('[data-resource-shelf-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.dataset.resourceShelfAction === 'shelf') {
                        openEditor(this.dataset.resourceShelfId);
                        return;
                    }
                    showToast('已展示该资源当前上架信息。');
                });
            });

            panel.querySelectorAll('[data-resource-shelf-page]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.disabled) return;
                    var value = this.dataset.resourceShelfPage;
                    if (value === 'prev') changePage(state.page - 1);
                    else if (value === 'next') changePage(state.page + 1);
                    else changePage(value);
                });
            });

            var pageSize = panel.querySelector('[data-resource-shelf-page-size]');
            if (pageSize) pageSize.addEventListener('change', function () {
                state.pageSize = parseInt(this.value, 10) || 10;
                state.page = 1;
                renderList();
            });

            var pageJump = panel.querySelector('[data-resource-shelf-page-jump]');
            if (pageJump) {
                pageJump.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter' && this.value) changePage(this.value);
                });
                pageJump.addEventListener('change', function () {
                    if (this.value) changePage(this.value);
                });
            }
        }

        function updateCounter(element) {
            var key = element.dataset.resourceCounter;
            if (!key) return;
            var wrapper = element.closest('.product-shelf-counted');
            var counter = wrapper ? wrapper.querySelector('.product-shelf-counter') : null;
            if (counter) counter.textContent = element.value.length + '/' + element.maxLength;
        }

        function validateStrategy(key) {
            var value = state.form.strategyValues[key];
            if (key === 'accessTime') return Boolean(value.start && value.end);
            if (key === 'accessCount' || key === 'concurrency') return Boolean(value && Number(value) > 0);
            if (Array.isArray(value)) return value.length > 0;
            return Boolean(String(value || '').trim());
        }

        function validateContract(template) {
            if (!template) return false;
            return Object.keys(template.constraints).every(function (key) {
                var value = state.form.contractValues[key];
                if (key === 'timeRange' || key === 'timeWindow') {
                    return Boolean(value && value.start && value.end && value.start <= value.end);
                }
                if (key === 'usageCount') return Boolean(value && Number(value) > 0);
                if (key === 'usageFrequency') return Boolean(value && Number(value.value) > 0 && value.unit);
                return Boolean(String(value || '').trim());
            });
        }

        function validateStep() {
            state.formError = '';
            if (state.step === 1) {
                if (!state.form.deliverySpec || !state.form.deliveryMethod || !state.form.visuals.length) {
                    state.formError = 'basic';
                    return false;
                }
                return true;
            }
            if (state.step === 2) {
                if (state.form.pricingMode !== '一事一议' && (!state.form.price || Number(state.form.price) <= 0)) {
                    state.formError = 'pricing';
                    return false;
                }
                return true;
            }
            if (!state.form.transferMode || !state.form.digitalContract) {
                state.formError = '请选择传输模式和数字合约。';
                return false;
            }
            if (state.form.digitalContract === '是' && !state.form.contractTemplateId) {
                state.formError = '请选择数字合约模板。';
                return false;
            }
            if (state.form.digitalContract === '是' && !validateContract(getTemplate(state.form.contractTemplateId))) {
                state.formError = '请完整填写数字合约的约束条件具体值，并确认起止范围有效。';
                return false;
            }
            if (!state.form.strategies.length) {
                state.formError = '请至少选择一项控制策略。';
                return false;
            }
            var invalid = state.form.strategies.find(function (key) {
                return !validateStrategy(key);
            });
            if (invalid) {
                state.formError = '请完整填写“' + strategyLabel(invalid) + '”的限制值。';
                return false;
            }
            return true;
        }

        function saveRecord(status, message) {
            var record = getRecord(state.currentId);
            if (!record) return;
            record.status = status;
            record.specialZoneId = state.form.specialZoneId || '';
            record.updatedAt = status === 'draft' ? '2026-08-06 15:18:36' : '2026-08-06 15:26:08';
            state.view = 'list';
            state.activeStatus = status;
            state.page = 1;
            state.pendingToast = message;
            renderList();
        }

        function applyTemplate(template) {
            var templateChanged = state.form.contractTemplateId !== template.id;
            state.form.contractTemplateId = template.id;
            if (templateChanged || !Object.keys(state.form.contractValues).length) {
                state.form.contractValues = copyValue(template.constraints);
            }
        }

        function fileExtension(fileName) {
            var parts = String(fileName || '').toLowerCase().split('.');
            return parts.length > 1 ? parts.pop() : '';
        }

        function setNestedValue(target, path, value) {
            var parts = path.split('.');
            if (parts.length === 1) {
                target[parts[0]] = value;
                return;
            }
            if (!target[parts[0]]) target[parts[0]] = {};
            target[parts[0]][parts[1]] = value;
        }

        function bindEditorEvents() {
            panel.querySelectorAll('[data-resource-shelf-field]').forEach(function (control) {
                control.addEventListener('input', function () {
                    state.form[this.dataset.resourceShelfField] = this.value;
                    updateCounter(this);
                });
                control.addEventListener('change', function () {
                    state.form[this.dataset.resourceShelfField] = this.value;
                });
            });

            panel.querySelectorAll('[data-resource-shelf-pricing-field]').forEach(function (control) {
                function syncPricingField() {
                    var field = control.dataset.resourceShelfPricingField;
                    state.form[field] = control.type === 'checkbox' ? control.checked : control.value;
                    state.formError = '';
                }
                control.addEventListener('input', syncPricingField);
                control.addEventListener('change', syncPricingField);
            });

            panel.querySelectorAll('[data-resource-shelf-price-mode]').forEach(function (radio) {
                radio.addEventListener('change', function () {
                    state.form.pricingMode = this.value;
                    state.formError = '';
                    renderEditor();
                });
            });

            panel.querySelectorAll('[data-resource-shelf-transfer-mode]').forEach(function (radio) {
                radio.addEventListener('change', function () {
                    state.form.transferMode = this.value;
                    state.formError = '';
                });
            });

            panel.querySelectorAll('[data-resource-shelf-digital-contract]').forEach(function (radio) {
                radio.addEventListener('change', function () {
                    state.form.digitalContract = this.value;
                    state.formError = '';
                    renderEditor();
                });
            });

            panel.querySelectorAll('[data-resource-shelf-strategy]').forEach(function (checkbox) {
                checkbox.addEventListener('change', function () {
                    var key = this.value;
                    var index = state.form.strategies.indexOf(key);
                    if (this.checked && index === -1) state.form.strategies.push(key);
                    if (!this.checked && index !== -1) state.form.strategies.splice(index, 1);
                    state.formError = '';
                    renderEditor();
                });
            });

            panel.querySelectorAll('[data-resource-shelf-strategy-field]').forEach(function (control) {
                function sync() {
                    state.form.strategyValues[control.dataset.resourceShelfStrategyField] = control.value;
                    updateCounter(control);
                }
                control.addEventListener('input', sync);
                control.addEventListener('change', sync);
            });

            panel.querySelectorAll('[data-resource-shelf-time-field]').forEach(function (control) {
                control.addEventListener('change', function () {
                    state.form.strategyValues.accessTime[this.dataset.resourceShelfTimeField] = this.value;
                });
            });

            panel.querySelectorAll('[data-resource-shelf-array-field]').forEach(function (control) {
                control.addEventListener('change', function () {
                    var key = this.dataset.resourceShelfArrayField;
                    var values = state.form.strategyValues[key];
                    var index = values.indexOf(this.value);
                    if (this.checked && index === -1) values.push(this.value);
                    if (!this.checked && index !== -1) values.splice(index, 1);
                });
            });

            panel.querySelectorAll('[data-resource-shelf-strategy-radio]').forEach(function (control) {
                control.addEventListener('change', function () {
                    state.form.strategyValues[this.dataset.resourceShelfStrategyRadio] = this.value;
                });
            });

            panel.querySelectorAll('[data-resource-shelf-contract-field]').forEach(function (control) {
                function syncContractField() {
                    setNestedValue(state.form.contractValues, control.dataset.resourceShelfContractField, control.value);
                    state.formError = '';
                }
                control.addEventListener('input', syncContractField);
                control.addEventListener('change', syncContractField);
            });

            var fileInput = panel.querySelector('[data-resource-shelf-file-input]');
            var resourceImagePicker = panel.querySelector('[data-resource-image-icon-picker]');
            if (resourceImagePicker && window.ImageIconPicker) {
                window.ImageIconPicker.mount(resourceImagePicker, {
                    label: '资源图片',
                    modalTitle: '选择资源图标',
                    maxSizeMB: 5,
                    values: state.form.visuals,
                    onChange: function (values) {
                        state.form.visuals = values;
                        state.formError = '';
                    },
                    onError: function (message) {
                        state.formError = message;
                        renderEditor();
                    }
                });
            }
            var uploadFile = panel.querySelector('[data-resource-shelf-upload-file]');
            if (uploadFile && fileInput) uploadFile.addEventListener('click', function () { fileInput.click(); });

            if (fileInput) fileInput.addEventListener('change', function () {
                if (!this.files || !this.files[0]) return;
                var file = this.files[0];
                if (['doc', 'docx', 'pdf'].indexOf(fileExtension(file.name)) === -1) {
                    state.formError = '交付方式说明仅支持 doc、docx、pdf 格式。';
                    renderEditor();
                    return;
                }
                if (file.size > 3 * 1024 * 1024) {
                    state.formError = '交付方式说明文件不能超过 3MB。';
                    renderEditor();
                    return;
                }
                state.form.deliverySpec = file.name;
                state.formError = '';
                renderEditor();
            });

            var removeFile = panel.querySelector('[data-resource-shelf-remove-file]');
            if (removeFile) removeFile.addEventListener('click', function () {
                state.form.deliverySpec = '';
                renderEditor();
            });

            var openTemplate = panel.querySelector('[data-resource-shelf-open-template]');
            if (openTemplate) openTemplate.addEventListener('click', function () {
                state.pendingTemplateId = state.form.contractTemplateId || CONTRACT_TEMPLATES[0].id;
                state.modalOpen = true;
                renderEditor();
            });

            panel.querySelectorAll('[data-resource-shelf-template-id]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.pendingTemplateId = this.dataset.resourceShelfTemplateId;
                    renderEditor();
                });
            });

            panel.querySelectorAll('[data-resource-shelf-template-close]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.modalOpen = false;
                    renderEditor();
                });
            });

            var confirmTemplate = panel.querySelector('[data-resource-shelf-template-confirm]');
            if (confirmTemplate) confirmTemplate.addEventListener('click', function () {
                var template = getTemplate(state.pendingTemplateId);
                if (!template) return;
                applyTemplate(template);
                state.modalOpen = false;
                state.formError = '';
                renderEditor();
            });

            panel.querySelectorAll('[data-resource-shelf-editor-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var action = this.dataset.resourceShelfEditorAction;
                    if (action === 'cancel') {
                        state.view = 'list';
                        state.formError = '';
                        state.modalOpen = false;
                        renderList();
                        return;
                    }
                    if (action === 'draft') {
                        saveRecord('draft', '资源上架信息已保存为草稿。');
                        return;
                    }
                    if (action === 'prev') {
                        state.step = Math.max(1, state.step - 1);
                        state.formError = '';
                        renderEditor();
                        return;
                    }
                    if (action === 'next') {
                        if (!validateStep()) {
                            renderEditor();
                            return;
                        }
                        state.step = Math.min(3, state.step + 1);
                        state.formError = '';
                        renderEditor();
                        return;
                    }
                    if (action === 'submit') {
                        if (!validateStep()) {
                            renderEditor();
                            return;
                        }
                        saveRecord('reviewing', '资源上架申请已提交，进入审批中。');
                    }
                });
            });
        }

        renderList();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSupplierResourceShelf);
    } else {
        initSupplierResourceShelf();
    }
})();
