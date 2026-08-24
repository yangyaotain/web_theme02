(function () {
    var STATUS_TABS = [
        { key: 'pending', label: '待上架' },
        { key: 'online', label: '已上架' },
        { key: 'offline', label: '已下架' },
        { key: 'draft', label: '草稿' },
        { key: 'reviewing', label: '审批中' },
        { key: 'rejected', label: '审批驳回' }
    ];

    var PRODUCT_RECORDS = [
        {
            id: 'PS-20260729-001',
            code: '6020260729094216300000101149001',
            name: '龙岗企业经营活力监测数据产品',
            type: '数据产品',
            updatedAt: '2026-07-29 09:42:16',
            source: '本节点',
            status: 'pending',
            provider: '深圳市龙岗数智科技有限公司',
            industry: '企业服务',
            region: '深圳市 / 龙岗区',
            coverage: '2026-01-01 至 2026-06-30',
            frequency: '1次/日',
            personalInfo: '否',
            restrictions: '仅限企业服务、产业研究和园区运营场景使用',
            authorizedUse: '是',
            dataSubject: '企业法人及产业主体',
            scale: '860MB',
            relatedResource: '龙岗区商事主体登记基础数据资源',
            introduction: '基于企业登记、经营活跃度、创新能力和产业分布等数据形成经营活力监测指标。'
        },
        {
            id: 'PS-20260728-002',
            code: '6020260728163854200000101149002',
            name: '园区企业用能碳排趋势数据产品',
            type: '数据产品',
            updatedAt: '2026-07-28 16:38:54',
            source: '本节点',
            status: 'pending',
            provider: '龙岗区智慧园区服务有限公司',
            industry: '生态环保',
            region: '深圳市 / 龙岗区',
            coverage: '2025-01-01 至 2026-06-30',
            frequency: '1次/月',
            personalInfo: '否',
            restrictions: '仅用于园区能源管理、碳排分析和节能评估',
            authorizedUse: '是',
            dataSubject: '园区与楼宇主体',
            scale: '1.6GB',
            relatedResource: '龙岗区重点园区企业运行数据资源',
            introduction: '汇聚园区企业分项用能与碳排数据，支持按园区、行业和月份分析变化趋势。'
        },
        {
            id: 'PS-20260727-003',
            code: '6020260727112648300000101149003',
            name: '产业园区空间载体画像数据产品',
            type: '数据集',
            updatedAt: '2026-07-27 11:26:48',
            source: '本节点',
            status: 'online',
            provider: '深圳市产业数据运营有限公司',
            industry: '产业发展',
            region: '深圳市 / 龙岗区',
            coverage: '2026-01-01 至 2026-07-20',
            frequency: '1次/季度',
            personalInfo: '否',
            restrictions: '仅用于园区运营、产业规划和招商研判',
            authorizedUse: '是',
            dataSubject: '园区与楼宇主体',
            scale: '2.8GB',
            relatedResource: '龙岗区产业空间载体基础数据资源',
            introduction: '提供园区、楼宇、产业空间及入驻企业的多维画像数据。'
        },
        {
            id: 'PS-20260726-004',
            code: '6020260726151842500000101149004',
            name: '低空飞行服务保障数据产品',
            type: '数据指标产品',
            updatedAt: '2026-07-26 15:18:42',
            source: '本节点',
            status: 'online',
            provider: '深圳市龙岗数智科技有限公司',
            industry: '交通出行',
            region: '深圳市 / 龙岗区',
            coverage: '2026-05-01 至 2026-07-25',
            frequency: '实时',
            personalInfo: '否',
            restrictions: '仅用于获得授权的低空飞行保障与城市巡检场景',
            authorizedUse: '是',
            dataSubject: '公共管理与服务主体',
            scale: '420MB',
            relatedResource: '暂不关联',
            introduction: '提供低空气象、起降点和飞行保障状态等指标数据。'
        },
        {
            id: 'PS-20260725-005',
            code: '6020260725104731900000101149005',
            name: '惠企政策适配分析数据产品',
            type: '数据模型产品',
            updatedAt: '2026-07-25 10:47:31',
            source: '本节点',
            status: 'offline',
            provider: '深圳市产业数据运营有限公司',
            industry: '企业服务',
            region: '深圳市 / 龙岗区',
            coverage: '2025-01-01 至 2026-07-01',
            frequency: '1次/周',
            personalInfo: '否',
            restrictions: '仅用于企业政策匹配和申报辅助',
            authorizedUse: '是',
            dataSubject: '企业法人及产业主体',
            scale: '360MB',
            relatedResource: '龙岗区商事主体登记基础数据资源',
            introduction: '结合企业画像与政策申报条件，形成政策适配度分析结果。'
        },
        {
            id: 'PS-20260724-006',
            code: '6020260724143627800000101149006',
            name: '商事主体信用风险预警数据产品',
            type: '数据产品',
            updatedAt: '2026-07-24 14:36:27',
            source: '本节点',
            status: 'draft',
            provider: '深圳市龙岗数智科技有限公司',
            industry: '企业服务',
            region: '深圳市 / 龙岗区',
            coverage: '2026-01-01 至 2026-06-30',
            frequency: '1次/日',
            personalInfo: '否',
            restrictions: '仅用于企业风险识别和合规管理',
            authorizedUse: '是',
            dataSubject: '企业法人及产业主体',
            scale: '720MB',
            relatedResource: '龙岗区商事主体登记基础数据资源',
            introduction: '整合经营异常、司法风险与信用评价信息，提供风险等级和预警线索。'
        },
        {
            id: 'PS-20260723-007',
            code: '6020260723091548600000101149007',
            name: '城市治理事件趋势研判数据产品',
            type: '数据产品',
            updatedAt: '2026-07-23 09:15:48',
            source: '本节点',
            status: 'reviewing',
            provider: '深圳市龙岗数智科技有限公司',
            industry: '公共服务',
            region: '深圳市 / 龙岗区',
            coverage: '2025-07-01 至 2026-06-30',
            frequency: '1次/小时',
            personalInfo: '否',
            restrictions: '仅用于城市治理与公共服务分析',
            authorizedUse: '是',
            dataSubject: '公共管理与服务主体',
            scale: '3.2GB',
            relatedResource: '暂不关联',
            introduction: '对城市治理事件的类型、区域、时段和处置情况进行趋势研判。'
        },
        {
            id: 'PS-20260722-008',
            code: '6020260722172836400000101149008',
            name: '文旅消费热力趋势数据产品',
            type: '数据指标产品',
            updatedAt: '2026-07-22 17:28:36',
            source: '本节点',
            status: 'rejected',
            provider: '深圳市产业数据运营有限公司',
            industry: '公共服务',
            region: '深圳市 / 龙岗区',
            coverage: '2025-01-01 至 2026-06-30',
            frequency: '1次/月',
            personalInfo: '否',
            restrictions: '仅用于文旅运营和客流趋势分析',
            authorizedUse: '是',
            dataSubject: '公共管理与服务主体',
            scale: '580MB',
            relatedResource: '暂不关联',
            introduction: '形成文旅场所客流、消费活跃度和节假日热力变化指标。'
        }
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
            id: 'contract-product-trial',
            name: '数据产品试用合约',
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

    function copyObject(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function initSupplierProductShelf() {
        var params = new URLSearchParams(window.location.search || '');
        if (params.get('menu') !== 'product-shelf') return;

        var panel = document.querySelector('[data-consult-panel]');
        var title = document.querySelector('[data-center-title]');
        if (!panel) return;

        var state = {
            view: 'list',
            activeStatus: 'pending',
            keyword: '',
            productType: '全部产品类型',
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
                'is-product-shelf-editor'
            );
        }

        function getRecord(id) {
            return PRODUCT_RECORDS.find(function (item) {
                return item.id === id;
            });
        }

        function getTemplate(id) {
            return CONTRACT_TEMPLATES.find(function (item) {
                return item.id === id;
            });
        }

        function createForm(record) {
            return {
                deliverySpec: record.name + 'API交付说明.pdf',
                deliveryMethod: 'API传输',
                image: 'images/economic-monitor.jpg',
                imageIcon: '',
                specialZoneId: record.specialZoneId || '',
                other: '接口按日更新，调用方需按交付说明完成身份认证、签名校验和频率控制。',
                pricingMode: '按次数',
                price: '120',
                periodUnit: '月',
                supportPostpaid: false,
                transferMode: '推送(push)',
                digitalContract: '否',
                contractTemplateId: '',
                contractValues: {},
                trial: '否',
                strategies: ['访问次数限制', '访问时间限制', '并发限制'],
                timeStart: '08:30',
                timeEnd: '18:30',
                concurrency: '5',
                accessCount: '1000'
            };
        }

        function getStatusCount(status) {
            return PRODUCT_RECORDS.filter(function (item) {
                return item.status === status;
            }).length;
        }

        function renderTabs() {
            return STATUS_TABS.map(function (tab) {
                var showCount = tab.key === 'draft' || tab.key === 'reviewing' || tab.key === 'rejected';
                var count = showCount ? '<span class="product-shelf-tab-count">(' + getStatusCount(tab.key) + ')</span>' : '';
                return '<button class="product-shelf-tab' + (tab.key === state.activeStatus ? ' active' : '') + '" type="button" data-product-shelf-tab="' + tab.key + '">'
                    + '<span>' + tab.label + '</span>' + count
                    + '</button>';
            }).join('');
        }

        function getProductTypes() {
            return PRODUCT_RECORDS.reduce(function (result, item) {
                if (result.indexOf(item.type) === -1) result.push(item.type);
                return result;
            }, []).sort();
        }

        function renderProductTypeOptions() {
            return ['全部产品类型'].concat(getProductTypes()).map(function (item) {
                return '<option value="' + escapeHtml(item) + '"' + (state.productType === item ? ' selected' : '') + '>' + escapeHtml(item) + '</option>';
            }).join('');
        }

        function getFilteredRecords() {
            var keyword = state.keyword.trim().toLowerCase();
            return PRODUCT_RECORDS.filter(function (item) {
                var date = item.updatedAt.slice(0, 10);
                if (item.status !== state.activeStatus) return false;
                if (state.productType !== '全部产品类型' && item.type !== state.productType) return false;
                if (state.startDate && date < state.startDate) return false;
                if (state.endDate && date > state.endDate) return false;
                if (!keyword) return true;
                return [item.name, item.code].join(' ').toLowerCase().indexOf(keyword) !== -1;
            });
        }

        function actionForRecord(item) {
            if (item.status === 'pending' || item.status === 'offline' || item.status === 'rejected') {
                return { label: item.status === 'pending' ? '上架' : '重新上架', icon: 'publish', action: 'shelf' };
            }
            if (item.status === 'draft') {
                return { label: '继续上架', icon: 'edit', action: 'shelf' };
            }
            return { label: '查看', icon: 'visibility', action: 'view' };
        }

        function renderRows(records) {
            if (!records.length) {
                return '<tr><td class="product-shelf-empty" colspan="6">暂无符合当前条件的数据产品</td></tr>';
            }
            return records.map(function (item) {
                var action = actionForRecord(item);
                return ''
                    + '<tr>'
                    +   '<td><span class="product-shelf-code" title="' + escapeHtml(item.code) + '">' + escapeHtml(item.code) + '</span></td>'
                    +   '<td><span class="product-shelf-name" title="' + escapeHtml(item.name) + '">' + escapeHtml(item.name) + '</span></td>'
                    +   '<td>' + escapeHtml(item.type) + '</td>'
                    +   '<td>' + escapeHtml(item.updatedAt) + '</td>'
                    +   '<td>' + escapeHtml(item.source) + '</td>'
                    +   '<td class="product-shelf-action-cell">'
                    +       '<button class="product-shelf-action' + (action.action === 'view' ? ' secondary' : '') + '" type="button" data-product-shelf-action="' + action.action + '" data-product-shelf-id="' + escapeHtml(item.id) + '">'
                    +           icon(action.icon) + '<span>' + action.label + '</span>'
                    +       '</button>'
                    +   '</td>'
                    + '</tr>';
            }).join('');
        }

        function renderPagination(total, totalPages) {
            var buttons = [];
            for (var page = 1; page <= totalPages; page += 1) {
                buttons.push('<button class="product-shelf-page-button' + (page === state.page ? ' active' : '') + '" type="button" data-product-shelf-page="' + page + '">' + page + '</button>');
            }
            return ''
                + '<div class="product-shelf-pagination">'
                +   '<span>共 ' + total + ' 条</span>'
                +   '<button class="product-shelf-page-button" type="button" aria-label="上一页" data-product-shelf-page="prev"' + (state.page <= 1 ? ' disabled' : '') + '>' + icon('chevron_left') + '</button>'
                +   buttons.join('')
                +   '<button class="product-shelf-page-button" type="button" aria-label="下一页" data-product-shelf-page="next"' + (state.page >= totalPages ? ' disabled' : '') + '>' + icon('chevron_right') + '</button>'
                +   '<select class="product-shelf-page-size" aria-label="每页条数" data-product-shelf-page-size>'
                +       '<option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10 条/页</option>'
                +       '<option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20 条/页</option>'
                +   '</select>'
                +   '<span>前往</span>'
                +   '<input class="product-shelf-page-jump" type="number" min="1" max="' + totalPages + '" aria-label="前往页码" data-product-shelf-page-jump>'
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
                +   '<div class="product-shelf-table-scroll" aria-label="产品上下架列表，可横向滚动">'
                +       '<table class="product-shelf-table">'
                +           '<colgroup><col class="col-code"><col class="col-name"><col class="col-type"><col class="col-updated"><col class="col-source"><col class="col-action"></colgroup>'
                +           '<thead><tr><th>数据产品标识码</th><th>数据产品名称</th><th>产品类型</th><th>更新时间</th><th>登记来源</th><th class="product-shelf-action-cell">操作</th></tr></thead>'
                +           '<tbody>' + renderRows(records) + '</tbody>'
                +       '</table>'
                +   '</div>'
                +   renderPagination(filtered.length, totalPages)
                + '</div>';
        }

        function renderList() {
            clearPanelClasses();
            panel.classList.add('is-product-shelf');
            if (title) {
                title.style.display = '';
                title.textContent = '产品上下架管理';
            }
            document.title = '产品上下架管理 - 供方中心';
            panel.innerHTML = ''
                + '<div class="product-shelf-board">'
                +   '<div class="product-shelf-tabs" role="tablist">' + renderTabs() + '</div>'
                +   '<div class="product-shelf-filter-bar">'
                +       '<label class="product-shelf-search">' + icon('search') + '<input type="search" value="' + escapeHtml(state.keyword) + '" placeholder="请输入数据产品标识码或名称" aria-label="搜索数据产品" data-product-shelf-keyword></label>'
                +       '<label class="product-shelf-select"><span>产品类型</span><select aria-label="产品类型" data-product-shelf-type>' + renderProductTypeOptions() + '</select></label>'
                +       '<div class="product-shelf-date-range">'
                +           '<span>更新时间</span>'
                +           '<input type="date" value="' + escapeHtml(state.startDate) + '" aria-label="更新开始日期" data-product-shelf-start-date>'
                +           '<b>至</b>'
                +           '<input type="date" value="' + escapeHtml(state.endDate) + '" aria-label="更新结束日期" data-product-shelf-end-date>'
                +           icon('calendar_month')
                +       '</div>'
                +       '<button class="product-shelf-filter-button primary" type="button" data-product-shelf-search>' + icon('search') + '<span>搜索</span></button>'
                +       '<button class="product-shelf-filter-button" type="button" data-product-shelf-reset>' + icon('restart_alt') + '<span>重置</span></button>'
                +   '</div>'
                +   renderTable()
                + '</div>'
                + '<div class="product-shelf-toast" role="status" aria-live="polite" data-product-shelf-toast>' + icon('check_circle') + '<span></span></div>';
            bindListEvents();
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
                + '<header class="product-shelf-editor-header">'
                +   '<button class="product-shelf-editor-back" type="button" data-product-shelf-editor-action="cancel">' + icon('arrow_back_ios_new') + '<span>数据产品上架</span></button>'
                +   '<div class="product-shelf-steps" aria-label="数据产品上架步骤">'
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
                ['产品名称', record.name],
                ['产品提供方', record.provider],
                ['产品类型', record.type],
                ['行业分类', record.industry],
                ['地域分类', record.region],
                ['覆盖时间范围', record.coverage],
                ['更新频率', record.frequency],
                ['是否涉及个人信息', record.personalInfo],
                ['使用限制', record.restrictions],
                ['授权使用', record.authorizedUse],
                ['数据主体', record.dataSubject],
                ['数据规模', record.scale],
                ['关联数据资源', record.relatedResource],
                ['其他说明', '指标口径按月复核，异常记录在下一更新周期校正。'],
                ['产品简介', record.introduction]
            ];
            return '<dl class="product-shelf-summary-card">'
                + rows.map(function (row) {
                    return '<div class="product-shelf-summary-item"><dt>' + row[0] + '：</dt><dd>' + escapeHtml(row[1]) + '</dd></div>';
                }).join('')
                + '</dl>';
        }

        function renderFormRow(label, required, content, hint) {
            return ''
                + '<div class="product-shelf-form-row">'
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
            var alertMessage = state.formError === 'basic' ? '请补充完整交付方式说明、交付方式和产品图片。' : state.formError;
            var alert = alertMessage
                ? '<div class="product-shelf-form-alert">' + icon('error') + '<span>' + escapeHtml(alertMessage) + '</span></div>'
                : '';
            var fileControl = form.deliverySpec
                ? '<div class="product-shelf-file">' + icon('description') + '<span class="product-shelf-file-name">' + escapeHtml(form.deliverySpec) + '</span>' + icon('check_circle') + '<button class="product-shelf-file-delete" type="button" aria-label="删除交付方式说明" data-product-shelf-remove-file>' + icon('delete') + '</button></div>'
                : '<button class="product-shelf-upload-button" type="button" data-product-shelf-upload-file>' + icon('upload_file') + '<span>上传交付说明</span></button>';
            var imageControl = '<div data-product-image-icon-picker></div>';
            return ''
                + '<div class="product-shelf-step-content">'
                +   '<h2 class="product-shelf-section-title">产品登记信息</h2>'
                +   renderSummary(record)
                +   '<div class="product-shelf-form">'
                +       alert
                +       renderFormRow('交付方式说明', true, fileControl, '请上传 1 个交付说明文件，支持 doc、docx、pdf 格式，单个文件不超过 3MB。')
                +       renderFormRow('交付方式', true, '<select data-product-shelf-field="deliveryMethod"><option value="API传输"' + (form.deliveryMethod === 'API传输' ? ' selected' : '') + '>API传输</option><option value="文件传输"' + (form.deliveryMethod === '文件传输' ? ' selected' : '') + '>文件传输</option><option value="人工交付"' + (form.deliveryMethod === '人工交付' ? ' selected' : '') + '>人工交付</option></select>')
                +       renderFormRow('产品图片', true, imageControl, '支持上传 jpg、jpeg、png 图片，或从图标库选择；建议尺寸 64 × 64，单张不超过 5MB。')
                +       renderFormRow('特色专区', false, '<select data-product-shelf-field="specialZoneId">' + renderSpecialZoneOptions(form.specialZoneId) + '</select>')
                +       renderFormRow('其他说明', false, '<div class="product-shelf-counted"><textarea class="product-shelf-textarea" maxlength="400" data-product-shelf-field="other">' + escapeHtml(form.other) + '</textarea><span class="product-shelf-counter">' + form.other.length + '/400</span></div>')
                +   '</div>'
                +   '<input class="product-shelf-hidden-input" type="file" accept=".doc,.docx,.pdf" data-product-shelf-file-input>'
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
                return '<select class="product-shelf-pricing-unit" aria-label="周期单位" data-product-shelf-field="periodUnit">'
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
                    '<div class="product-shelf-radio-group"><div class="product-shelf-pricing-box"><input class="product-shelf-input" type="number" min="0" step="0.01" value="' + escapeHtml(form.price) + '" placeholder="请输入价格" data-product-shelf-field="price">' + pricingUnit() + '</div>'
                    + (form.pricingMode === '按次数' || form.pricingMode === '按流量'
                        ? '<label class="product-shelf-inline-control"><input type="checkbox" data-product-shelf-field="supportPostpaid"' + (form.supportPostpaid ? ' checked' : '') + '><span>支持后付费</span></label>'
                        : '')
                    + '</div>'
                );
            }
            return ''
                + '<div class="product-shelf-step-content">'
                +   '<h2 class="product-shelf-section-title">' + escapeHtml(form.deliveryMethod) + '</h2>'
                +   '<div class="product-shelf-form">'
                +       (state.formError ? '<div class="product-shelf-form-alert">' + icon('error') + '<span>请输入大于 0 的产品价格。</span></div>' : '')
                +       renderFormRow('计量方式', true, renderRadioOptions('pricingMode', ['按周期', '按次数', '按流量', '一事一议'], form.pricingMode, 'data-product-shelf-price-mode'))
                +       pricingContent
                +   '</div>'
                + '</div>';
        }

        function renderStrategyOptions() {
            var options = [
                '访问次数限制',
                '访问时间限制',
                '并发限制',
                '使用用户角色限制',
                '使用限制',
                '用途限制',
                '存储限制',
                '使用工具限制',
                '删除控制',
                '使用环境安全级别限制',
                '超额策略',
                '事件限制',
                '高密数据传输限制'
            ];
            return '<div class="product-shelf-checkbox-group">' + options.map(function (option) {
                return '<label><input type="checkbox" value="' + escapeHtml(option) + '" data-product-shelf-strategy="' + escapeHtml(option) + '"' + (state.form.strategies.indexOf(option) !== -1 ? ' checked' : '') + '><span>' + escapeHtml(option) + '</span></label>';
            }).join('') + '</div>';
        }

        function hasStrategy(name) {
            return state.form.strategies.indexOf(name) !== -1;
        }

        function renderStrategyFields() {
            var html = '';
            if (hasStrategy('访问时间限制')) {
                html += renderFormRow('访问时间限制', true, '<div class="product-shelf-time-range"><input type="time" value="' + escapeHtml(state.form.timeStart) + '" data-product-shelf-field="timeStart"><span>至</span><input type="time" value="' + escapeHtml(state.form.timeEnd) + '" data-product-shelf-field="timeEnd">' + icon('schedule') + '</div>');
            }
            if (hasStrategy('并发限制')) {
                html += renderFormRow('并发限制', true, '<div class="product-shelf-input-group"><input class="product-shelf-input" type="number" min="1" value="' + escapeHtml(state.form.concurrency) + '" data-product-shelf-field="concurrency"><b>次/秒</b></div>');
            }
            if (hasStrategy('访问次数限制')) {
                html += renderFormRow('访问次数限制', true, '<div class="product-shelf-input-group"><input class="product-shelf-input" type="number" min="1" value="' + escapeHtml(state.form.accessCount) + '" data-product-shelf-field="accessCount"><b>次/日</b></div>');
            }
            return html;
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
                return '<div class="resource-shelf-contract-range"><input type="date" value="' + escapeHtml(value.start) + '" aria-label="合约开始日期" data-product-shelf-contract-field="timeRange.start"><span>至</span><input type="date" value="' + escapeHtml(value.end) + '" aria-label="合约结束日期" data-product-shelf-contract-field="timeRange.end">' + icon('calendar_month') + '</div>';
            }
            if (key === 'timeWindow') {
                return '<div class="resource-shelf-contract-range"><input type="time" step="1" value="' + escapeHtml(value.start) + '" aria-label="合约开始时间" data-product-shelf-contract-field="timeWindow.start"><span>至</span><input type="time" step="1" value="' + escapeHtml(value.end) + '" aria-label="合约结束时间" data-product-shelf-contract-field="timeWindow.end">' + icon('schedule') + '</div>';
            }
            if (key === 'usageCount') {
                return '<input class="resource-shelf-contract-input" type="number" min="1" step="1" value="' + escapeHtml(value) + '" aria-label="合约使用次数" data-product-shelf-contract-field="usageCount">';
            }
            if (key === 'usageFrequency') {
                return '<div class="resource-shelf-contract-frequency"><input type="number" min="1" step="1" value="' + escapeHtml(value.value) + '" aria-label="合约使用频次" data-product-shelf-contract-field="usageFrequency.value"><select aria-label="使用频次单位" data-product-shelf-contract-field="usageFrequency.unit"><option value="次/秒"' + (value.unit === '次/秒' ? ' selected' : '') + '>次/秒</option><option value="次/分钟"' + (value.unit === '次/分钟' ? ' selected' : '') + '>次/分钟</option><option value="次/小时"' + (value.unit === '次/小时' ? ' selected' : '') + '>次/小时</option></select></div>';
            }
            return '<input class="resource-shelf-contract-input" type="text" value="' + escapeHtml(value) + '" aria-label="合约网络地址" data-product-shelf-contract-field="networkAddress">';
        }

        function renderContractRows(template, values, editable) {
            var keys = Object.keys(template.constraints);
            return keys.map(function (key, index) {
                var value = values[key] == null ? copyObject(template.constraints[key]) : values[key];
                return '<tr>'
                    + (index === 0 ? '<td rowspan="' + keys.length + '"><strong>' + escapeHtml(template.strategyName) + '</strong></td><td rowspan="' + keys.length + '">' + escapeHtml(template.behavior) + '</td>' : '')
                    + '<td>' + escapeHtml(contractConstraintLabel(key)) + '</td>'
                    + '<td>' + (editable ? renderContractValueEditor(key, value) : '<span class="resource-shelf-contract-value">' + escapeHtml(contractValueSummary(key, value)) + '</span>') + '</td>'
                    + '</tr>';
            }).join('');
        }

        function renderContractPicker() {
            var template = getTemplate(state.form.contractTemplateId);
            return '<button class="resource-shelf-contract-picker" type="button" data-product-shelf-open-template>'
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
                + '<div class="product-shelf-step-content">'
                +   '<div class="product-shelf-form">'
                +       (state.formError ? '<div class="product-shelf-form-alert">' + icon('error') + '<span>' + escapeHtml(state.formError) + '</span></div>' : '')
                +       renderFormRow('传输模式', true, renderRadioOptions('transferMode', ['拉(pull)', '推(push)', '都支持(all)'], form.transferMode, 'data-product-shelf-transfer-mode'))
                +       renderFormRow('数字合约', true, renderRadioOptions('digitalContract', ['是', '否'], form.digitalContract, 'data-product-shelf-digital-contract'), '数字合约是将数据使用范围、访问方式、调用频次、安全要求等交易约束数字化记录的电子合约，用于明确供需双方的权利义务，并为后续合约签署、履约监测和异常处置提供依据。')
                +       contractRows
                +   '</div>'
                +   '<div class="product-shelf-api-tag"><span>' + escapeHtml(form.deliveryMethod) + '</span></div>'
                +   '<h3 class="product-shelf-subsection-title">试用策略</h3>'
                +   '<div class="product-shelf-form">'
                +       renderFormRow('是否支持试用', true, renderRadioOptions('trial', ['是', '否'], form.trial, 'data-product-shelf-trial'))
                +   '</div>'
                +   '<div class="product-shelf-divider"></div>'
                +   '<h3 class="product-shelf-subsection-title">控制策略</h3>'
                +   '<div class="product-shelf-form">'
                +       renderFormRow('控制策略', true, renderStrategyOptions())
                +       renderStrategyFields()
                +   '</div>'
                + '</div>';
        }

        function renderTemplateModal() {
            if (!state.modalOpen) return '';
            var selected = getTemplate(state.pendingTemplateId) || CONTRACT_TEMPLATES[0];
            return ''
                + '<div class="resource-shelf-modal-backdrop" data-product-shelf-modal-backdrop>'
                +   '<section class="resource-shelf-modal" role="dialog" aria-modal="true" aria-labelledby="product-contract-modal-title">'
                +       '<header class="resource-shelf-modal-header"><h2 id="product-contract-modal-title">选择数字合约模板</h2><button type="button" aria-label="关闭合约模板弹窗" data-product-shelf-template-close>' + icon('close') + '</button></header>'
                +       '<div class="resource-shelf-modal-body">'
                +           '<nav class="resource-shelf-template-list" aria-label="数字合约模板列表">'
                +               CONTRACT_TEMPLATES.map(function (template) {
                                    return '<button class="resource-shelf-template-item' + (template.id === selected.id ? ' active' : '') + '" type="button" data-product-shelf-template-id="' + template.id + '">' + icon('description') + '<span>' + escapeHtml(template.name) + '</span></button>';
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
                +       '<footer class="resource-shelf-modal-footer"><button class="product-shelf-footer-button" type="button" data-product-shelf-template-close>' + icon('close') + '<span>取消</span></button><button class="product-shelf-footer-button primary" type="button" data-product-shelf-template-confirm>' + icon('check') + '<span>确定</span></button></footer>'
                +   '</section>'
                + '</div>';
        }

        function renderEditorFooter() {
            return ''
                + '<footer class="product-shelf-editor-footer">'
                +   '<button class="product-shelf-footer-button" type="button" data-product-shelf-editor-action="cancel">' + icon('close') + '<span>取消</span></button>'
                +   '<button class="product-shelf-footer-button" type="button" data-product-shelf-editor-action="draft">' + icon('save') + '<span>保存草稿</span></button>'
                +   (state.step > 1 ? '<button class="product-shelf-footer-button" type="button" data-product-shelf-editor-action="prev">' + icon('arrow_back') + '<span>上一步</span></button>' : '')
                +   (state.step < 3
                    ? '<button class="product-shelf-footer-button primary" type="button" data-product-shelf-editor-action="next"><span>下一步</span>' + icon('arrow_forward') + '</button>'
                    : '<button class="product-shelf-footer-button primary" type="button" data-product-shelf-editor-action="submit">' + icon('publish') + '<span>上架</span></button>')
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
            panel.classList.add('is-product-shelf-editor');
            if (title) title.style.display = 'none';
            document.title = '数据产品上架 - 供方中心';
            panel.innerHTML = ''
                + '<div class="product-shelf-editor">'
                +   renderEditorHeader()
                +   '<div class="product-shelf-editor-body">'
                +       (state.step === 1 ? renderStepOne(record) : (state.step === 2 ? renderStepTwo() : renderStepThree()))
                +   '</div>'
                +   renderEditorFooter()
                + '</div>'
                + '<div class="product-shelf-toast" role="status" aria-live="polite" data-product-shelf-toast>' + icon('check_circle') + '<span></span></div>'
                + renderTemplateModal();
            bindEditorEvents();
        }

        function showToast(message) {
            var toast = panel.querySelector('[data-product-shelf-toast]');
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
            renderList();
        }

        function applyFilters() {
            var keyword = panel.querySelector('[data-product-shelf-keyword]');
            state.keyword = keyword ? keyword.value.trim() : state.keyword;
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
            renderEditor();
        }

        function bindListEvents() {
            panel.querySelectorAll('[data-product-shelf-tab]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.activeStatus = this.dataset.productShelfTab;
                    state.page = 1;
                    renderList();
                });
            });

            var keyword = panel.querySelector('[data-product-shelf-keyword]');
            if (keyword) {
                keyword.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') applyFilters();
                });
            }

            var search = panel.querySelector('[data-product-shelf-search]');
            if (search) search.addEventListener('click', applyFilters);

            var type = panel.querySelector('[data-product-shelf-type]');
            if (type) {
                type.addEventListener('change', function () {
                    state.productType = this.value;
                    state.page = 1;
                    renderList();
                });
            }

            var startDate = panel.querySelector('[data-product-shelf-start-date]');
            if (startDate) {
                startDate.addEventListener('change', function () {
                    state.startDate = this.value;
                });
            }

            var endDate = panel.querySelector('[data-product-shelf-end-date]');
            if (endDate) {
                endDate.addEventListener('change', function () {
                    state.endDate = this.value;
                });
            }

            var reset = panel.querySelector('[data-product-shelf-reset]');
            if (reset) {
                reset.addEventListener('click', function () {
                    state.keyword = '';
                    state.productType = '全部产品类型';
                    state.startDate = '';
                    state.endDate = '';
                    state.page = 1;
                    renderList();
                });
            }

            panel.querySelectorAll('[data-product-shelf-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.dataset.productShelfAction === 'shelf') {
                        openEditor(this.dataset.productShelfId);
                        return;
                    }
                    showToast('已展示该产品当前上架信息。');
                });
            });

            panel.querySelectorAll('[data-product-shelf-page]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.disabled) return;
                    var value = this.dataset.productShelfPage;
                    if (value === 'prev') changePage(state.page - 1);
                    else if (value === 'next') changePage(state.page + 1);
                    else changePage(value);
                });
            });

            var pageSize = panel.querySelector('[data-product-shelf-page-size]');
            if (pageSize) {
                pageSize.addEventListener('change', function () {
                    state.pageSize = parseInt(this.value, 10) || 10;
                    state.page = 1;
                    renderList();
                });
            }

            var pageJump = panel.querySelector('[data-product-shelf-page-jump]');
            if (pageJump) {
                pageJump.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter' && this.value) changePage(this.value);
                });
                pageJump.addEventListener('change', function () {
                    if (this.value) changePage(this.value);
                });
            }
        }

        function syncField(element) {
            var field = element.dataset.productShelfField;
            if (!field) return;
            state.form[field] = element.type === 'checkbox' ? element.checked : element.value;
            if (field === 'other') {
                var counter = panel.querySelector('.product-shelf-counter');
                if (counter) counter.textContent = element.value.length + '/400';
            }
        }

        function validateStep() {
            state.formError = '';
            if (state.step === 1) {
                if (!state.form.deliverySpec || (!state.form.image && !state.form.imageIcon) || !state.form.deliveryMethod) {
                    state.formError = 'basic';
                    return false;
                }
            }
            if (state.step === 2 && state.form.pricingMode !== '一事一议') {
                if (!state.form.price || Number(state.form.price) <= 0) {
                    state.formError = 'pricing';
                    return false;
                }
            }
            if (state.step === 3) {
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
                if ((hasStrategy('访问时间限制') && (!state.form.timeStart || !state.form.timeEnd))
                    || (hasStrategy('并发限制') && (!state.form.concurrency || Number(state.form.concurrency) <= 0))
                    || (hasStrategy('访问次数限制') && (!state.form.accessCount || Number(state.form.accessCount) <= 0))) {
                    state.formError = '请完整填写已启用控制策略对应的限制值。';
                    return false;
                }
            }
            return true;
        }

        function saveRecord(status, message) {
            var record = getRecord(state.currentId);
            if (!record) return;
            record.status = status;
            record.specialZoneId = state.form.specialZoneId || '';
            record.updatedAt = '2026-07-29 ' + (status === 'draft' ? '14:18:36' : '14:26:08');
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
                state.form.contractValues = copyObject(template.constraints);
            }
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
            panel.querySelectorAll('[data-product-shelf-field]').forEach(function (control) {
                control.addEventListener('input', function () {
                    syncField(this);
                });
                control.addEventListener('change', function () {
                    syncField(this);
                    if (this.dataset.productShelfField === 'periodUnit') renderEditor();
                });
            });

            panel.querySelectorAll('[data-product-shelf-price-mode]').forEach(function (radio) {
                radio.addEventListener('change', function () {
                    state.form.pricingMode = this.value;
                    state.formError = '';
                    renderEditor();
                });
            });

            panel.querySelectorAll('[data-product-shelf-transfer-mode]').forEach(function (radio) {
                radio.addEventListener('change', function () {
                    state.form.transferMode = this.value;
                });
            });

            panel.querySelectorAll('[data-product-shelf-digital-contract]').forEach(function (radio) {
                radio.addEventListener('change', function () {
                    state.form.digitalContract = this.value;
                    state.formError = '';
                    renderEditor();
                });
            });

            panel.querySelectorAll('[data-product-shelf-contract-field]').forEach(function (control) {
                function syncContractField() {
                    setNestedValue(state.form.contractValues, control.dataset.productShelfContractField, control.value);
                    state.formError = '';
                }
                control.addEventListener('input', syncContractField);
                control.addEventListener('change', syncContractField);
            });

            panel.querySelectorAll('[data-product-shelf-trial]').forEach(function (radio) {
                radio.addEventListener('change', function () {
                    state.form.trial = this.value;
                });
            });

            panel.querySelectorAll('[data-product-shelf-strategy]').forEach(function (checkbox) {
                checkbox.addEventListener('change', function () {
                    var name = this.value;
                    var index = state.form.strategies.indexOf(name);
                    if (this.checked && index === -1) state.form.strategies.push(name);
                    if (!this.checked && index !== -1) state.form.strategies.splice(index, 1);
                    state.formError = '';
                    renderEditor();
                });
            });

            var fileInput = panel.querySelector('[data-product-shelf-file-input]');
            var uploadFile = panel.querySelector('[data-product-shelf-upload-file]');
            if (uploadFile && fileInput) uploadFile.addEventListener('click', function () { fileInput.click(); });
            var productImagePicker = panel.querySelector('[data-product-image-icon-picker]');
            if (productImagePicker && window.ImageIconPicker) {
                window.ImageIconPicker.mount(productImagePicker, {
                    label: '产品图片',
                    modalTitle: '选择产品图标',
                    maxSizeMB: 5,
                    value: state.form.image ? { type: 'image', src: state.form.image } : (state.form.imageIcon ? { type: 'icon', name: state.form.imageIcon } : null),
                    onChange: function (value) {
                        state.form.image = value && value.type === 'image' ? value.src : '';
                        state.form.imageIcon = value && value.type === 'icon' ? value.name : '';
                        state.formError = '';
                    },
                    onError: function (message) {
                        state.formError = message;
                        renderEditor();
                    }
                });
            }
            if (fileInput) {
                fileInput.addEventListener('change', function () {
                    if (!this.files || !this.files[0]) return;
                    state.form.deliverySpec = this.files[0].name;
                    state.formError = '';
                    renderEditor();
                });
            }
            var removeFile = panel.querySelector('[data-product-shelf-remove-file]');
            if (removeFile) {
                removeFile.addEventListener('click', function () {
                    state.form.deliverySpec = '';
                    renderEditor();
                });
            }

            var openTemplate = panel.querySelector('[data-product-shelf-open-template]');
            if (openTemplate) openTemplate.addEventListener('click', function () {
                state.pendingTemplateId = state.form.contractTemplateId || CONTRACT_TEMPLATES[0].id;
                state.modalOpen = true;
                renderEditor();
            });

            panel.querySelectorAll('[data-product-shelf-template-id]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.pendingTemplateId = this.dataset.productShelfTemplateId;
                    renderEditor();
                });
            });

            panel.querySelectorAll('[data-product-shelf-template-close]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.modalOpen = false;
                    renderEditor();
                });
            });

            var confirmTemplate = panel.querySelector('[data-product-shelf-template-confirm]');
            if (confirmTemplate) confirmTemplate.addEventListener('click', function () {
                var template = getTemplate(state.pendingTemplateId);
                if (!template) return;
                applyTemplate(template);
                state.modalOpen = false;
                state.formError = '';
                renderEditor();
            });

            panel.querySelectorAll('[data-product-shelf-editor-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var action = this.dataset.productShelfEditorAction;
                    if (action === 'cancel') {
                        state.view = 'list';
                        state.formError = '';
                        state.modalOpen = false;
                        renderList();
                        return;
                    }
                    if (action === 'draft') {
                        saveRecord('draft', '上架信息已保存为草稿。');
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
                        renderEditor();
                        return;
                    }
                    if (action === 'submit') {
                        if (!validateStep()) {
                            renderEditor();
                            return;
                        }
                        saveRecord('reviewing', '上架申请已提交，等待平台审批。');
                    }
                });
            });
        }

        clearPanelClasses();
        renderList();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSupplierProductShelf);
    } else {
        initSupplierProductShelf();
    }
})();
