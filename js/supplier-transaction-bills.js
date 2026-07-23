(function () {
    var BILL_STATUS_OPTIONS = ['全部账单状态', '待出账', '待支付', '待支付（首次）', '待支付（阶段）', '待支付（最后）', '待支付确认', '已结清', '待供方确认', '待需方确认'];

    function mapRows(rows) {
        return rows.map(function (row) {
            return {
                billNo: row[0],
                orderNo: row[1],
                target: row[2],
                businessType: row[3],
                targetType: row[4],
                counterparty: row[5],
                payMode: row[6],
                measureMode: row[7],
                price: row[8],
                quantity: row[9],
                amount: row[10],
                createdAt: row[11],
                period: row[12],
                repaymentAt: row[13],
                paidAt: row[14],
                status: row[15],
                showUsage: Boolean(row[16])
            };
        });
    }

    var RECEIVABLE_RECORDS = mapRows([
        ['2026072210521604200000101149064', '2026071613195704200000101149064', '企业信用风险监测数据集', '产品交易', '数据集', '深圳市龙岗产业投资服务有限公司', '一次性付款', '按次数', '100元/次', '5次', '500', '2026-07-22 10:52:16', '一次性付款', '--', '--', '待支付', true],
        ['2026072114290605700000101149113', '2026071214075305700000101149113', '公共信用评价数据产品', '产品交易', '数据产品', '深圳市数治咨询服务有限公司', '一次性付款', '按份数', '500元/份', '1份', '500', '2026-07-12 14:09:06', '一次性付款', '--', '2026-07-12 14:12:18', '已结清', true],
        ['2026072016382203300000101149129', '2026071016243803300000101149129', '重点项目运行监测数据产品', '产品交易', '数据产品', '龙岗区重点项目服务中心', '一次性付款', '按周期', '300元/月', '2月', '600', '2026-07-10 16:26:22', '一次性付款', '--', '2026-07-10 16:29:11', '已结清', true],
        ['2026071817264102700000101149145', '2026070817135202700000101149145', '产业招商线索分析数据集', '产品交易', '数据集', '深圳市龙岗招商服务有限公司', '一次性付款', '按份数', '1000元/份', '1份', '1,000', '2026-07-08 17:15:41', '一次性付款', '--', '2026-07-08 17:16:21', '已结清', true],
        ['2026071715131905100000101149161', '2026070715011305100000101149161', '园区企业经营趋势分析报告', '产品交易', '数据产品', '龙岗数智产业研究院有限公司', '一次性付款', '按份数', '600元/份', '1份', '600', '2026-07-07 15:03:19', '一次性付款', '--', '2026-07-07 15:04:08', '已结清', true],
        ['2026071419522401500000101149209', '2026070419400401500000101149209', '企业诉求热点分析数据集', '产品交易', '数据集', '深圳市政务服务数据中心', '一次性付款', '按次数', '80元/次', '2次', '160', '2026-07-04 19:42:24', '一次性付款', '--', '--', '待支付', true],
        ['2026072310111807600000101149465', '2026071714092607600000101149465', '数据资产融资可行性评估服务', '服务交易', '企业数据资产融资咨询服务', '深圳市龙岗科创金融服务有限公司', '分期付款', '按服务次数计费', '6000元/次', '1次', '1,800', '2026-07-23 10:11:18', '首期款（第1/3期）', '--', '--', '待支付（首次）'],
        ['2026072213374207500000101149593', '2026070613102407500000101149593', '数据治理成熟度阶段评估服务', '服务交易', '企业数据治理与合规咨询服务', '龙岗区数据应用创新中心', '分期付款', '按服务次数计费', '12000元/次', '1次', '4,800', '2026-07-22 13:37:42', '阶段款（第2/3期）', '--', '--', '待支付（阶段）'],
        ['2026072210311907500000101149609', '2026070510294107500000101149609', '公共数据授权运营咨询服务', '服务交易', '数据交易合规评估服务', '龙岗数智产业研究院有限公司', '分期付款', '按服务次数计费', '20000元/次', '1次', '6,000', '2026-07-22 10:31:19', '尾款（第3/3期）', '--', '--', '待支付（最后）'],
        ['2026071011301806400000101149545', '2026071011182506400000101149545', '行业数据空间建设咨询服务', '服务交易', '行业数据空间建设咨询服务', '龙岗区产业发展研究中心', '分期付款', '按服务次数计费', '12000元/次', '1次', '3,600', '2026-07-10 11:30:18', '尾款（第3/3期）', '--', '2026-07-10 11:31:06', '已结清']
    ]);

    function createPayment(paymentNo, amount, paidAt, split) {
        return {
            paymentNo: paymentNo,
            amount: amount,
            channel: '统一支付平台',
            paidAt: paidAt,
            status: '支付成功',
            split: split
        };
    }

    function createSplit(fee, netAmount, outTraceNo, appliedAt, status) {
        return {
            fee: fee,
            netAmount: netAmount,
            outTraceNo: outTraceNo,
            receiverId: 'RCV-202607-00986',
            appliedAt: appliedAt,
            queriedAt: appliedAt,
            status: status || '分账成功'
        };
    }

    var PAYMENT_PLANS = {
        '2026071613195704200000101149064': { orderAmount: '500', stages: [
            { name: '一次性付款', percent: '100%', amount: '500', node: '订单提交并完成合同签署后', status: '待支付', current: true }
        ] },
        '2026071214075305700000101149113': { orderAmount: '500', stages: [
            { name: '一次性付款', percent: '100%', amount: '500', node: '订单提交并完成合同签署后', status: '已支付', current: true, payment: createPayment('PAY20260712140753057000P00', '500', '2026-07-12 14:12:18', createSplit('15.00', '485.00', 'PS20260712141218001', '2026-07-12 14:12:32')) }
        ] },
        '2026071016243803300000101149129': { orderAmount: '600', stages: [
            { name: '一次性付款', percent: '100%', amount: '600', node: '订单提交并完成合同签署后', status: '已支付', current: true, payment: createPayment('PAY20260710162438033000P00', '600', '2026-07-10 16:29:11', createSplit('18.00', '582.00', 'PS20260710162911002', '2026-07-10 16:29:25')) }
        ] },
        '2026070817135202700000101149145': { orderAmount: '1,000', stages: [
            { name: '一次性付款', percent: '100%', amount: '1,000', node: '订单提交并完成合同签署后', status: '已支付', current: true, payment: createPayment('PAY20260708171352027000P00', '1,000', '2026-07-08 17:16:21', createSplit('30.00', '970.00', 'PS20260708171621003', '2026-07-08 17:16:36')) }
        ] },
        '2026070715011305100000101149161': { orderAmount: '600', stages: [
            { name: '一次性付款', percent: '100%', amount: '600', node: '订单提交并完成合同签署后', status: '已支付', current: true, payment: createPayment('PAY20260707150113051000P00', '600', '2026-07-07 15:04:08', createSplit('18.00', '582.00', 'PS20260707150408004', '2026-07-07 15:04:21')) }
        ] },
        '2026070419400401500000101149209': { orderAmount: '160', stages: [
            { name: '一次性付款', percent: '100%', amount: '160', node: '订单提交并完成合同签署后', status: '待支付', current: true }
        ] },
        '2026071714092607600000101149465': { orderAmount: '6,000', stages: [
            { name: '首期款', percent: '30%', amount: '1,800', node: '合同签署后', status: '待支付（首次）', current: true },
            { name: '阶段款', percent: '40%', amount: '2,400', node: '阶段成果确认后', status: '未到付款节点' },
            { name: '尾款', percent: '30%', amount: '1,800', node: '服务验收通过后', status: '未到付款节点' }
        ] },
        '2026070613102407500000101149593': { orderAmount: '12,000', stages: [
            { name: '首期款', percent: '30%', amount: '3,600', node: '合同签署后', status: '已支付', payment: createPayment('PAY20260706131024075000P01', '3,600', '2026-07-06 13:18:05', createSplit('108.00', '3,492.00', 'PS20260706131805005', '2026-07-06 13:18:20')) },
            { name: '阶段款', percent: '40%', amount: '4,800', node: '阶段成果确认后', status: '待支付（阶段）', current: true },
            { name: '尾款', percent: '30%', amount: '3,600', node: '服务验收通过后', status: '未到付款节点' }
        ] },
        '2026070510294107500000101149609': { orderAmount: '20,000', stages: [
            { name: '首期款', percent: '30%', amount: '6,000', node: '合同签署后', status: '已支付', payment: createPayment('PAY20260705102941075000P01', '6,000', '2026-07-05 10:38:12', createSplit('180.00', '5,820.00', 'PS20260705103812006', '2026-07-05 10:38:28')) },
            { name: '阶段款', percent: '40%', amount: '8,000', node: '阶段成果确认后', status: '已支付', payment: createPayment('PAY20260705102941075000P02', '8,000', '2026-07-18 16:22:41', createSplit('240.00', '7,760.00', 'PS20260718162241007', '2026-07-18 16:22:56')) },
            { name: '尾款', percent: '30%', amount: '6,000', node: '服务验收通过后', status: '待支付（最后）', current: true }
        ] },
        '2026071011182506400000101149545': { orderAmount: '12,000', stages: [
            { name: '首期款', percent: '30%', amount: '3,600', node: '合同签署后', status: '已支付', payment: createPayment('PAY20260710111825064000P01', '3,600', '2026-07-10 11:23:18', createSplit('108.00', '3,492.00', 'PS20260710112318008', '2026-07-10 11:23:34')) },
            { name: '阶段款', percent: '40%', amount: '4,800', node: '阶段成果确认后', status: '已支付', payment: createPayment('PAY20260710111825064000P02', '4,800', '2026-07-10 11:26:09', createSplit('144.00', '4,656.00', 'PS20260710112609009', '2026-07-10 11:26:23')) },
            { name: '尾款', percent: '30%', amount: '3,600', node: '服务验收通过后', status: '已支付', current: true, payment: createPayment('PAY20260710111825064000P03', '3,600', '2026-07-10 11:31:06', createSplit('108.00', '3,492.00', 'PS20260710113106010', '2026-07-10 11:31:20')) }
        ] }
    };

    RECEIVABLE_RECORDS.forEach(function (item) {
        var plan = PAYMENT_PLANS[item.orderNo];
        if (!plan) return;
        item.orderAmount = plan.orderAmount;
        item.paymentStages = plan.stages;
    });

    var PAYABLE_RECORDS = mapRows([
        ['FY20260721173018061000001011401', '2026072116142806100000101149401', '龙岗企业经营画像数据集交易服务费', '平台服务', '交易服务费', '龙岗数据聚合服务平台', '后付费', '按交易金额比例', '3%', '1笔', '9', '2026-07-21 17:30:18', '2026-07-01 至 2026-07-21', '2026-07-31 23:59:59', '--', '待支付'],
        ['FY20260720152334028000001011417', '2026072015074302800000101149417', '园区数据治理咨询交易服务费', '平台服务', '交易服务费', '龙岗数据聚合服务平台', '后付费', '按交易金额比例', '3%', '1笔', '150', '2026-07-20 15:23:34', '2026-07-01 至 2026-07-20', '2026-07-31 23:59:59', '2026-07-20 15:25:10', '已结清'],
        ['FY20260719115326085000001011433', '2026071911360908500000101149433', '企业信用画像查询交易服务费', '平台服务', '交易服务费', '龙岗数据聚合服务平台', '后付费', '按交易金额比例', '3%', '1笔', '45', '2026-07-19 11:53:26', '2026-07-01 至 2026-07-19', '2026-07-31 23:59:59', '--', '待支付确认'],
        ['FY20260718174142043000001011449', '2026071817245104300000101149449', '数字化转型咨询平台技术服务费', '平台服务', '技术服务费', '龙岗数据聚合服务平台', '后付费', '按交易金额比例', '2%', '1笔', '160', '2026-07-18 17:41:42', '2026-07-01 至 2026-07-18', '2026-07-31 23:59:59', '--', '待出账'],
        ['FY20260717142619076000001011465', '2026071714092607600000101149465', '企业信用风险监测交易服务费', '平台服务', '交易服务费', '龙岗数据聚合服务平台', '后付费', '按交易金额比例', '3%', '1笔', '15', '2026-07-17 14:26:19', '2026-07-01 至 2026-07-17', '2026-07-31 23:59:59', '2026-07-17 14:28:03', '已结清'],
        ['FY20260716110828019000001011481', '2026071610513701900000101149481', '授权运营合规评估技术服务费', '平台服务', '技术服务费', '龙岗数据聚合服务平台', '后付费', '按交易金额比例', '2%', '1笔', '90', '2026-07-16 11:08:28', '2026-07-01 至 2026-07-16', '2026-07-31 23:59:59', '--', '待支付'],
        ['FY20260715184907054000001011497', '2026071518321405400000101149497', '数据资源托管运营平台服务费', '平台服务', '技术服务费', '龙岗数据聚合服务平台', '后付费', '按交易金额比例', '2%', '1笔', '144', '2026-07-15 18:49:07', '2026-07-01 至 2026-07-15', '2026-07-31 23:59:59', '2026-07-15 18:50:36', '已结清'],
        ['FY20260714144155092000001011513', '2026071414250309200000101149513', '园区能耗报告交易服务费', '平台服务', '交易服务费', '龙岗数据聚合服务平台', '后付费', '按交易金额比例', '3%', '1笔', '24', '2026-07-14 14:41:55', '2026-07-01 至 2026-07-14', '2026-07-31 23:59:59', '2026-07-14 14:43:09', '已结清']
    ]);

    var AUTO_SPLIT_ORDER_NOS = [
        '2026072116142806100000101149401',
        '2026072015074302800000101149417',
        '2026071911360908500000101149433',
        '2026071817245104300000101149449',
        '2026071714092607600000101149465',
        '2026071610513701900000101149481',
        '2026071518321405400000101149497',
        '2026071414250309200000101149513'
    ];
    PAYABLE_RECORDS = PAYABLE_RECORDS.filter(function (item) {
        return AUTO_SPLIT_ORDER_NOS.indexOf(item.orderNo) === -1;
    });

    var ICON_PATHS = {
        search: '<path d="M9.5 3a6.5 6.5 0 0 1 5.16 10.45l4.45 4.44-1.42 1.42-4.44-4.45A6.5 6.5 0 1 1 9.5 3zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"/>',
        filter: '<path d="M3 5h18l-7 8v5l-4 2v-7L3 5zm4.4 2 4.6 5.25V17l1-.5v-4.25L17.6 7H7.4z"/>',
        reset: '<path d="M12 5V2L7 7l5 5V7a5 5 0 1 1-4.55 7.06l-1.82.83A7 7 0 1 0 12 5z"/>',
        export: '<path d="M5 20h14v-2H5v2zm7-18-5 5h3v7h4V7h3l-5-5z"/>',
        pay: '<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4H4V6h16v2zm-8 8H5v-2h7v2z"/>',
        detail: '<path d="M12 5c5 0 8.4 4.2 9.5 7-1.1 2.8-4.5 7-9.5 7S3.6 14.8 2.5 12C3.6 9.2 7 5 12 5zm0 2c-3.6 0-6.2 2.7-7.3 5 1.1 2.3 3.7 5 7.3 5s6.2-2.7 7.3-5C18.2 9.7 15.6 7 12 7zm0 2.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6z"/>',
        usage: '<path d="M4 19h16v2H4v-2zm1-3h3V8H5v8zm5 0h3V3h-3v13zm5 0h3v-6h-3v6z"/>',
        confirm: '<path d="m9 16.2-3.5-3.5L4.1 14.1 9 19 20.3 7.7l-1.4-1.4L9 16.2z"/>',
        close: '<path d="M18.3 5.71 12 12l6.3 6.29-1.42 1.42L10.59 13.4 4.29 19.71 2.88 18.3 9.17 12 2.88 5.71 4.29 4.3l6.3 6.29 6.29-6.29 1.42 1.41z"/>',
        success: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-2 15-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"/>'
    };

    function icon(name) {
        return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICON_PATHS[name] || ICON_PATHS.detail) + '</svg>';
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
        });
    }

    function initSupplierTransactionBills() {
        var params = new URLSearchParams(window.location.search || '');
        if (params.get('menu') !== 'transaction-bill') return;

        var panel = document.querySelector('[data-consult-panel]');
        var title = document.querySelector('[data-center-title]');
        if (!panel) return;

        var state = {
            tab: 'receivable',
            keyword: '',
            businessType: '全部业务类型',
            payMode: '全部付费方式',
            status: '全部账单状态',
            createdDate: '',
            page: 1,
            pageSize: 10,
            filterOpen: false,
            activeBillNo: ''
        };
        var toastTimer = null;
        var supplierName = '深圳市龙岗数智科技有限公司';

        panel.classList.remove('is-placeholder', 'is-service-management', 'is-order-management', 'is-supplier-order-management');
        panel.classList.add('is-supplier-bill-management');
        if (title) title.textContent = '交易账单管理';
        document.title = '交易账单管理 - 供方中心';

        function getCurrentRecords() {
            if (state.tab === 'payable') return PAYABLE_RECORDS;
            return RECEIVABLE_RECORDS;
        }

        function getFilteredRecords() {
            var keyword = state.keyword.toLowerCase();
            return getCurrentRecords().filter(function (item) {
                if (state.businessType !== '全部业务类型' && item.businessType !== state.businessType) return false;
                if (state.payMode !== '全部付费方式' && item.payMode !== state.payMode) return false;
                if (state.status !== '全部账单状态' && item.status !== state.status) return false;
                if (state.createdDate && item.createdAt.slice(0, 10) !== state.createdDate) return false;
                if (!keyword) return true;
                var searchable = [item.billNo, item.orderNo, item.target, item.counterparty].join(' ').toLowerCase();
                return searchable.indexOf(keyword) !== -1;
            });
        }

        function renderOptions(options, selected) {
            return options.map(function (option) {
                return '<option' + (option === selected ? ' selected' : '') + '>' + escapeHtml(option) + '</option>';
            }).join('');
        }

        function getBusinessTypes() {
            var types = getCurrentRecords().map(function (item) { return item.businessType; });
            return ['全部业务类型'].concat(types.filter(function (value, index, list) { return list.indexOf(value) === index; }));
        }

        function renderTabs() {
            return ''
                + '<button class="supplier-order-tab' + (state.tab === 'receivable' ? ' active' : '') + '" type="button" role="tab" aria-selected="' + (state.tab === 'receivable') + '" data-supplier-bill-tab="receivable">应收账单</button>'
                + '<button class="supplier-order-tab' + (state.tab === 'payable' ? ' active' : '') + '" type="button" role="tab" aria-selected="' + (state.tab === 'payable') + '" data-supplier-bill-tab="payable">应付账单</button>';
        }

        function getPayModeOptions() {
            return state.tab === 'payable'
                ? ['全部付费方式', '预付费', '后付费']
                : ['全部付费方式', '一次性付款', '分期付款'];
        }

        function getStatusOptions() {
            return state.tab === 'payable'
                ? ['全部账单状态', '待出账', '待支付', '待支付确认', '已结清']
                : BILL_STATUS_OPTIONS;
        }

        function renderFilterPanel() {
            return ''
                + '<div class="supplier-order-filter-panel supplier-bill-filter-panel' + (state.filterOpen ? ' show' : '') + '">'
                +   '<select data-supplier-bill-business aria-label="业务类型">' + renderOptions(getBusinessTypes(), state.businessType) + '</select>'
                +   '<select data-supplier-bill-pay-mode aria-label="付费方式">' + renderOptions(getPayModeOptions(), state.payMode) + '</select>'
                +   '<select data-supplier-bill-status aria-label="账单状态">' + renderOptions(getStatusOptions(), state.status) + '</select>'
                +   '<label class="supplier-bill-date"><span>账单生成时间</span><input type="date" value="' + escapeHtml(state.createdDate) + '" data-supplier-bill-date></label>'
                +   '<button class="supplier-order-filter-reset" type="button" data-supplier-bill-reset>' + icon('reset') + '<span>重置</span></button>'
                + '</div>';
        }

        function getActions(item) {
            if (state.tab === 'payable' && item.status === '待支付') return [['去支付', 'pay'], ['账单详情', 'detail']];
            if (state.tab === 'receivable' && item.status === '待供方确认') return [['确认账单', 'confirm'], ['账单详情', 'detail']];
            if (item.status === '已结清' && item.showUsage) return [['用量明细', 'usage'], ['账单详情', 'detail']];
            return [['账单详情', 'detail']];
        }

        function renderActions(item) {
            return getActions(item).map(function (action) {
                return '<button class="supplier-order-action" type="button" data-supplier-bill-action="' + escapeHtml(action[0]) + '" data-supplier-bill-no="' + escapeHtml(item.billNo) + '">' + icon(action[1]) + '<span>' + escapeHtml(action[0]) + '</span></button>';
            }).join('');
        }

        function renderRows(records) {
            if (!records.length) return '<tr><td class="supplier-bill-empty" colspan="17">暂无符合条件的交易账单</td></tr>';
            return records.map(function (item) {
                return ''
                    + '<tr>'
                    +   '<td class="supplier-bill-ellipsis" title="' + escapeHtml(item.billNo) + '">' + escapeHtml(item.billNo) + '</td>'
                    +   '<td class="supplier-bill-ellipsis" title="' + escapeHtml(item.orderNo) + '"><button class="supplier-bill-order-link" type="button" data-supplier-bill-order="' + escapeHtml(item.orderNo) + '">' + escapeHtml(item.orderNo) + '</button></td>'
                    +   '<td class="supplier-bill-ellipsis" title="' + escapeHtml(item.target) + '">' + escapeHtml(item.target) + '</td>'
                    +   '<td>' + escapeHtml(item.businessType) + '</td>'
                    +   '<td class="supplier-bill-ellipsis" title="' + escapeHtml(item.targetType) + '">' + escapeHtml(item.targetType) + '</td>'
                    +   '<td class="supplier-bill-ellipsis" title="' + escapeHtml(item.counterparty) + '">' + escapeHtml(item.counterparty) + '</td>'
                    +   '<td>' + escapeHtml(item.payMode) + '</td>'
                    +   '<td class="supplier-bill-ellipsis" title="' + escapeHtml(item.measureMode) + '">' + escapeHtml(item.measureMode) + '</td>'
                    +   '<td>' + escapeHtml(item.price) + '</td>'
                    +   '<td>' + escapeHtml(item.quantity) + '</td>'
                    +   '<td class="supplier-bill-amount">' + escapeHtml(item.amount) + '</td>'
                    +   '<td>' + escapeHtml(item.createdAt) + '</td>'
                    +   '<td>' + escapeHtml(item.period) + '</td>'
                    +   '<td>' + escapeHtml(item.repaymentAt) + '</td>'
                    +   '<td>' + escapeHtml(item.paidAt) + '</td>'
                    +   '<td class="supplier-bill-status-cell"><span class="supplier-order-status">' + escapeHtml(item.status) + '</span></td>'
                    +   '<td class="supplier-bill-action-cell"><div class="supplier-order-actions">' + renderActions(item) + '</div></td>'
                    + '</tr>';
            }).join('');
        }

        function renderPagination(total, totalPages) {
            var buttons = [];
            for (var page = 1; page <= totalPages; page += 1) {
                buttons.push('<button class="supplier-order-page-btn' + (page === state.page ? ' active' : '') + '" type="button" data-supplier-bill-page="' + page + '">' + page + '</button>');
            }
            return ''
                + '<div class="supplier-order-pagination">'
                +   '<span>共 ' + total + ' 条</span>'
                +   '<button class="supplier-order-page-btn" type="button" aria-label="上一页" data-supplier-bill-page="prev"' + (state.page <= 1 ? ' disabled' : '') + '>‹</button>'
                +   buttons.join('')
                +   '<button class="supplier-order-page-btn" type="button" aria-label="下一页" data-supplier-bill-page="next"' + (state.page >= totalPages ? ' disabled' : '') + '>›</button>'
                +   '<select class="supplier-order-page-size" data-supplier-bill-page-size aria-label="每页条数">'
                +       '<option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10 条/页</option>'
                +       '<option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20 条/页</option>'
                +   '</select>'
                +   '<span>前往</span>'
                +   '<input class="supplier-order-page-jump" type="number" min="1" max="' + totalPages + '" aria-label="前往页码" data-supplier-bill-page-jump>'
                + '</div>';
        }

        function renderTable() {
            var filtered = getFilteredRecords();
            var totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
            if (state.page > totalPages) state.page = totalPages;
            var start = (state.page - 1) * state.pageSize;
            var records = filtered.slice(start, start + state.pageSize);
            var counterpartyLabel = state.tab === 'payable' ? '收款方' : '需求方';
            var periodLabel = state.tab === 'payable' ? '账期' : '付款期次';
            return ''
                + '<div class="supplier-bill-table-card">'
                +   '<div class="supplier-bill-table-scroll" aria-label="交易账单列表，可横向滚动">'
                +       '<table class="supplier-bill-table">'
                +           '<colgroup>'
                +               '<col class="col-bill-no"><col class="col-order-no"><col class="col-target"><col class="col-business"><col class="col-target-type"><col class="col-buyer">'
                +               '<col class="col-pay-mode"><col class="col-measure"><col class="col-price"><col class="col-quantity"><col class="col-amount"><col class="col-created">'
                +               '<col class="col-period"><col class="col-repayment"><col class="col-paid"><col class="col-status"><col class="col-actions">'
                +           '</colgroup>'
                +           '<thead><tr>'
                +               '<th>账单编号</th><th>订单编号</th><th>交易标的</th><th>业务类型</th><th>标的类型</th><th>' + counterpartyLabel + '</th><th>付费方式</th><th>计量方式</th>'
                +               '<th>价格</th><th>购买数量</th><th class="supplier-bill-amount">账单金额(元)</th><th>账单生成时间</th><th>' + periodLabel + '</th><th>还款时间</th><th>付款时间</th>'
                +               '<th class="supplier-bill-status-cell">账单状态</th><th class="supplier-bill-action-cell">操作</th>'
                +           '</tr></thead>'
                +           '<tbody>' + renderRows(records) + '</tbody>'
                +       '</table>'
                +   '</div>'
                +   renderPagination(filtered.length, totalPages)
                + '</div>';
        }

        function renderDetailFields(fields) {
            return '<div class="supplier-bill-detail-grid">' + fields.map(function (field) {
                return '<div class="supplier-bill-detail-field">'
                    + '<span class="supplier-bill-detail-label">' + escapeHtml(field.label) + '：</span>'
                    + '<span class="supplier-bill-detail-value">' + (field.html || escapeHtml(field.value || '--')) + '</span>'
                    + '</div>';
            }).join('') + '</div>';
        }

        function renderDetailSection(title, content) {
            return '<section class="supplier-bill-detail-section">'
                + '<h3>' + escapeHtml(title) + '</h3>'
                + content
                + '</section>';
        }

        function detailStatus(text, tone) {
            return '<span class="supplier-bill-detail-status' + (tone ? ' ' + tone : '') + '"><i></i>' + escapeHtml(text) + '</span>';
        }

        function getStageTone(status) {
            if (status === '已支付' || status === '支付成功' || status === '分账成功') return 'success';
            if (String(status || '').indexOf('待支付') === 0 || status === '分账处理中') return 'waiting';
            return '';
        }

        function renderStagePayment(stage) {
            if (!stage.payment) {
                return '<div class="supplier-bill-stage-empty">尚未发起支付</div>';
            }
            return '<div class="supplier-bill-stage-grid">'
                + '<div><span>支付流水号</span><strong>' + escapeHtml(stage.payment.paymentNo) + '</strong></div>'
                + '<div><span>实付金额</span><strong>¥' + escapeHtml(stage.payment.amount) + '</strong></div>'
                + '<div><span>支付渠道</span><strong>' + escapeHtml(stage.payment.channel) + '</strong></div>'
                + '<div><span>支付时间</span><strong>' + escapeHtml(stage.payment.paidAt) + '</strong></div>'
                + '<div><span>支付状态</span><strong>' + detailStatus(stage.payment.status, getStageTone(stage.payment.status)) + '</strong></div>'
                + '</div>';
        }

        function renderStageSplit(stage) {
            var split = stage.payment && stage.payment.split;
            if (!split) {
                return '<div class="supplier-bill-stage-empty">当前期次尚未支付，暂未触发分账</div>';
            }
            return '<div class="supplier-bill-stage-grid is-split">'
                + '<div><span>平台服务费</span><strong>¥' + escapeHtml(split.fee) + '</strong></div>'
                + '<div><span>供方分账金额</span><strong class="is-money">¥' + escapeHtml(split.netAmount) + '</strong></div>'
                + '<div><span>外部分账流水号</span><strong>' + escapeHtml(split.outTraceNo) + '</strong></div>'
                + '<div><span>分账接收方编号</span><strong>' + escapeHtml(split.receiverId) + '</strong></div>'
                + '<div><span>分账状态</span><strong>' + detailStatus(split.status, getStageTone(split.status)) + '</strong></div>'
                + '<div><span>最近查询时间</span><strong>' + escapeHtml(split.queriedAt) + '</strong></div>'
                + '</div>';
        }

        function renderPaymentStage(stage, index, total, includeSplit) {
            var stageLabel = total === 1 ? '一次性付款' : '第' + (index + 1) + '/' + total + '期';
            return '<article class="supplier-bill-payment-stage' + (stage.current ? ' is-current' : '') + '">'
                + '<header class="supplier-bill-payment-stage-head">'
                +   '<div><span>' + escapeHtml(stageLabel) + '</span><strong>' + escapeHtml(stage.name) + '</strong></div>'
                +   '<div class="supplier-bill-payment-stage-tags">' + (stage.current ? '<em>当前账单</em>' : '') + detailStatus(stage.status, getStageTone(stage.status)) + '</div>'
                + '</header>'
                + '<div class="supplier-bill-stage-summary">'
                +   '<div><span>付款比例</span><strong>' + escapeHtml(stage.percent || '--') + '</strong></div>'
                +   '<div><span>应付金额</span><strong>¥' + escapeHtml(stage.amount) + '</strong></div>'
                +   '<div><span>付款节点</span><strong>' + escapeHtml(stage.node || '--') + '</strong></div>'
                + '</div>'
                + '<div class="supplier-bill-stage-block"><h4>支付记录</h4>' + renderStagePayment(stage) + '</div>'
                + (includeSplit ? '<div class="supplier-bill-stage-block is-split"><h4>分账信息</h4>' + renderStageSplit(stage) + '</div>' : '')
                + '</article>';
        }

        function getFallbackPaymentStages(item) {
            var hasPaid = item.paidAt && item.paidAt !== '--';
            var digits = String(item.billNo || '').replace(/\D/g, '');
            return [{
                name: '账单支付',
                percent: '100%',
                amount: item.amount,
                node: '账单生成后',
                status: hasPaid ? '已支付' : item.status,
                current: true,
                payment: hasPaid ? {
                    paymentNo: 'PAY' + (digits.slice(-24) || '202607230000000000000001'),
                    amount: item.amount,
                    channel: '统一支付平台',
                    paidAt: item.paidAt,
                    status: '支付成功'
                } : null
            }];
        }

        function renderPaymentDetail(item) {
            var stages = item.paymentStages || getFallbackPaymentStages(item);
            return '<div class="supplier-bill-payment-groups">' + stages.map(function (stage, index) {
                return renderPaymentStage(stage, index, stages.length, state.tab === 'receivable');
            }).join('') + '</div>';
        }

        function renderFlowDetail(item) {
            var hasPaid = item.paidAt && item.paidAt !== '--';
            var payer = state.tab === 'payable' ? supplierName : item.counterparty;
            var receiver = state.tab === 'payable' ? item.counterparty : supplierName;
            var currentStage = (item.paymentStages || []).find(function (stage) { return stage.current; });
            var currentSplit = currentStage && currentStage.payment && currentStage.payment.split;
            var rows = [
                { operator: '系统自动', type: '生成账单', result: '成功', content: '--', time: item.createdAt }
            ];

            if (hasPaid) {
                rows.push({ operator: payer, type: '支付账单', result: '成功', content: '--', time: item.paidAt });
                rows.push({ operator: receiver, type: '确认支付账单', result: '通过', content: '--', time: item.paidAt });
                if (currentSplit) rows.push({ operator: '统一支付平台', type: '执行分账', result: currentSplit.status, content: '供方到账 ¥' + currentSplit.netAmount, time: currentSplit.appliedAt });
            } else if (item.status === '待支付确认') {
                rows.push({ operator: payer, type: '提交支付凭证', result: '成功', content: '等待收款方确认', time: item.createdAt });
            } else if (item.status === '待供方确认') {
                rows.push({ operator: item.counterparty, type: '提交账单确认', result: '成功', content: '等待供方确认', time: item.createdAt });
            } else if (item.status === '待需方确认') {
                rows.push({ operator: supplierName, type: '提交账单确认', result: '成功', content: '等待需方确认', time: item.createdAt });
            }

            return '<div class="supplier-bill-detail-table-scroll is-flow">'
                + '<table class="supplier-bill-detail-table">'
                + '<thead><tr><th>操作者</th><th>操作类型</th><th>操作结果</th><th>内容</th><th>操作时间</th></tr></thead>'
                + '<tbody>' + rows.map(function (row) {
                    return '<tr><td>' + escapeHtml(row.operator) + '</td><td>' + escapeHtml(row.type) + '</td><td>' + escapeHtml(row.result) + '</td><td>' + escapeHtml(row.content) + '</td><td>' + escapeHtml(row.time) + '</td></tr>';
                }).join('') + '</tbody></table></div>';
        }

        function renderBillDetail(item) {
            var counterpartyLabel = state.tab === 'payable' ? '收款方' : '需求方';
            return ''
                + '<div class="supplier-bill-detail-mask" data-supplier-bill-detail-layer data-supplier-bill-detail-close></div>'
                + '<aside class="supplier-bill-detail-drawer" role="dialog" aria-modal="true" aria-labelledby="supplierBillDetailTitle" data-supplier-bill-detail-layer>'
                +   '<header class="supplier-bill-detail-head">'
                +       '<button type="button" aria-label="关闭账单详情" data-supplier-bill-detail-close data-supplier-bill-detail-close-button>' + icon('close') + '</button>'
                +       '<h2 id="supplierBillDetailTitle">账单详情</h2>'
                +   '</header>'
                +   '<div class="supplier-bill-detail-body">'
                +       renderDetailSection('订单信息', renderDetailFields([
                            { label: '订单编号', value: item.orderNo },
                            { label: '交易标的', value: item.target },
                            { label: '业务类型', value: item.businessType },
                            { label: '标的类型', value: item.targetType },
                            { label: counterpartyLabel, value: item.counterparty },
                            { label: '付费方式', value: item.payMode },
                            { label: '计量方式', value: item.measureMode },
                            { label: '价格', value: item.price },
                            { label: '订单金额', value: '¥' + (item.orderAmount || item.amount) },
                            { label: '购买数量', value: item.quantity }
                        ]))
                +       renderDetailSection('账单信息', renderDetailFields([
                            { label: '账单编号', value: item.billNo },
                            { label: '账单状态', html: '<span class="supplier-order-status">' + escapeHtml(item.status) + '</span>' },
                            { label: '账单金额', value: '¥' + item.amount },
                            { label: '账单生成时间', value: item.createdAt },
                            { label: state.tab === 'payable' ? '账期' : '付款期次', value: item.period },
                            { label: '还款时间', value: item.repaymentAt },
                            { label: '付款时间', value: item.paidAt }
                        ]))
                +       renderDetailSection('支付信息', renderPaymentDetail(item))
                +       renderDetailSection('流程动态', renderFlowDetail(item))
                +   '</div>'
                + '</aside>';
        }

        function closeBillDetail() {
            var billNo = state.activeBillNo;
            panel.querySelectorAll('[data-supplier-bill-detail-layer]').forEach(function (layer) { layer.remove(); });
            state.activeBillNo = '';
            document.body.classList.remove('supplier-bill-detail-open');
            panel.querySelectorAll('[data-supplier-bill-action="账单详情"]').forEach(function (button) {
                if (button.dataset.supplierBillNo === billNo) button.focus();
            });
        }

        function bindBillDetailEvents() {
            panel.querySelectorAll('[data-supplier-bill-detail-close]').forEach(function (control) {
                control.addEventListener('click', closeBillDetail);
            });
        }

        function openBillDetail(billNo) {
            var item = getCurrentRecords().find(function (record) { return record.billNo === billNo; });
            if (!item) return;
            closeBillDetail();
            state.activeBillNo = billNo;
            panel.insertAdjacentHTML('beforeend', renderBillDetail(item));
            document.body.classList.add('supplier-bill-detail-open');
            bindBillDetailEvents();
            var closeButton = panel.querySelector('[data-supplier-bill-detail-close-button]');
            if (closeButton) closeButton.focus();
        }

        function render() {
            panel.innerHTML = ''
                + '<div class="supplier-bill-board">'
                +   '<div class="supplier-order-tabs" role="tablist" aria-label="交易账单类型">' + renderTabs() + '</div>'
                +   '<div class="supplier-order-toolbar supplier-bill-toolbar">'
                +       '<label class="supplier-order-search supplier-bill-search">'
                +           '<input type="search" placeholder="请输入账单编号/订单编号/交易标的/' + (state.tab === 'payable' ? '收款方' : '需求方') + '" value="' + escapeHtml(state.keyword) + '" data-supplier-bill-keyword aria-label="搜索交易账单">'
                +           icon('search')
                +       '</label>'
                +       '<button class="supplier-order-filter-toggle' + (state.filterOpen ? ' active' : '') + '" type="button" aria-expanded="' + state.filterOpen + '" data-supplier-bill-filter>' + icon('filter') + '<span>筛选</span></button>'
                +       '<button class="supplier-bill-export" type="button" data-supplier-bill-export>' + icon('export') + '<span>导出</span></button>'
                +   '</div>'
                +   renderFilterPanel()
                +   renderTable()
                + '</div>'
                + '<div class="supplier-order-toast" role="status" aria-live="polite" data-supplier-bill-toast>' + icon('success') + '<span></span></div>';
            bindEvents();
        }

        function showToast(message) {
            var toast = panel.querySelector('[data-supplier-bill-toast]');
            if (!toast) return;
            toast.querySelector('span').textContent = message;
            toast.classList.add('show');
            window.clearTimeout(toastTimer);
            toastTimer = window.setTimeout(function () { toast.classList.remove('show'); }, 2200);
        }

        function bindSelect(selector, key) {
            var select = panel.querySelector(selector);
            if (!select) return;
            select.addEventListener('change', function () {
                state[key] = this.value;
                state.page = 1;
                render();
            });
        }

        function changePage(value) {
            var totalPages = Math.max(1, Math.ceil(getFilteredRecords().length / state.pageSize));
            state.page = Math.min(totalPages, Math.max(1, parseInt(value, 10) || 1));
            render();
        }

        function bindEvents() {
            panel.querySelectorAll('[data-supplier-bill-tab]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.tab = this.dataset.supplierBillTab;
                    state.businessType = '全部业务类型';
                    state.payMode = '全部付费方式';
                    state.status = '全部账单状态';
                    state.createdDate = '';
                    state.page = 1;
                    render();
                });
            });

            var keyword = panel.querySelector('[data-supplier-bill-keyword]');
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

            var filterToggle = panel.querySelector('[data-supplier-bill-filter]');
            if (filterToggle) filterToggle.addEventListener('click', function () { state.filterOpen = !state.filterOpen; render(); });

            bindSelect('[data-supplier-bill-business]', 'businessType');
            bindSelect('[data-supplier-bill-pay-mode]', 'payMode');
            bindSelect('[data-supplier-bill-status]', 'status');

            var date = panel.querySelector('[data-supplier-bill-date]');
            if (date) date.addEventListener('change', function () { state.createdDate = this.value; state.page = 1; render(); });

            var reset = panel.querySelector('[data-supplier-bill-reset]');
            if (reset) reset.addEventListener('click', function () {
                state.businessType = '全部业务类型';
                state.payMode = '全部付费方式';
                state.status = '全部账单状态';
                state.createdDate = '';
                state.page = 1;
                render();
            });

            var exportButton = panel.querySelector('[data-supplier-bill-export]');
            if (exportButton) exportButton.addEventListener('click', function () {
                showToast((state.tab === 'payable' ? '应付账单' : '应收账单') + '导出功能将在后续设计，本页仅展示操作入口。');
            });

            panel.querySelectorAll('[data-supplier-bill-order]').forEach(function (button) {
                button.addEventListener('click', function () {
                    showToast('订单详情功能将在后续设计，本页仅展示订单入口。');
                });
            });

            panel.querySelectorAll('[data-supplier-bill-page]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.disabled) return;
                    var target = this.dataset.supplierBillPage;
                    if (target === 'prev') changePage(state.page - 1);
                    else if (target === 'next') changePage(state.page + 1);
                    else changePage(target);
                });
            });

            var pageSize = panel.querySelector('[data-supplier-bill-page-size]');
            if (pageSize) pageSize.addEventListener('change', function () {
                state.pageSize = parseInt(this.value, 10) || 10;
                state.page = 1;
                render();
            });

            var jump = panel.querySelector('[data-supplier-bill-page-jump]');
            if (jump) {
                jump.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') changePage(this.value);
                });
                jump.addEventListener('change', function () {
                    if (this.value) changePage(this.value);
                });
            }

            panel.querySelectorAll('[data-supplier-bill-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.dataset.supplierBillAction === '账单详情') {
                        openBillDetail(this.dataset.supplierBillNo);
                        return;
                    }
                    showToast(this.dataset.supplierBillAction + '功能将在后续设计，本页仅展示操作入口。');
                });
            });

        }

        render();
        document.addEventListener('keydown', function (event) {
            if (event.key !== 'Escape') return;
            if (state.activeBillNo) closeBillDetail();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSupplierTransactionBills);
    } else {
        initSupplierTransactionBills();
    }
})();
