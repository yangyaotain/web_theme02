(function () {
    var BILL_STATUS_OPTIONS = ['全部账单状态', '待出账', '待支付', '待支付确认', '已结清', '待供方确认', '待需方确认', '待分账', '分账处理中', '分账成功', '分账失败'];

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
        ['2026072117251806100000101149601', '2026072116142806100000101149401', '龙岗企业经营画像数据集', '产品交易', '数据集', '深圳市星途科技发展有限公司', '预付费', '按次数', '300元/次', '1次', '300', '2026-07-21 17:25:18', '--', '--', '2026-07-21 17:26:02', '已结清', true],
        ['2026072015183402800000101149617', '2026072015074302800000101149417', '园区数据治理体系规划咨询服务', '服务交易', '企业数据治理与合规咨询服务', '龙岗区园区运营管理有限公司', '预付费', '面议', '5000元/次', '1次', '5,000', '2026-07-20 15:18:34', '--', '--', '2026-07-20 15:19:08', '已结清'],
        ['2026071911482608500000101149633', '2026071911360908500000101149433', '企业信用画像合规查询服务', '服务交易', '企业数据资源托管运营服务', '深圳市清澜企业服务有限公司', '预付费', '按服务次数计费', '500元/次', '3次', '1,500', '2026-07-19 11:48:26', '--', '--', '--', '待支付'],
        ['2026071817364204300000101149649', '2026071817245104300000101149449', '数字化转型顶层规划咨询服务', '服务交易', '企业数字化转型咨询服务', '龙岗数智产业研究院有限公司', '后付费', '面议', '8000元/次', '1次', '8,000', '2026-07-18 17:36:42', '2026-07-01 至 2026-07-18', '2026-07-31 23:59:59', '--', '待出账'],
        ['2026071714211907600000101149665', '2026071714092607600000101149465', '企业信用风险监测数据集', '产品交易', '数据集', '深圳市龙岗产业投资服务有限公司', '预付费', '按次数', '100元/次', '5次', '500', '2026-07-17 14:21:19', '--', '--', '--', '待支付确认'],
        ['2026071611032801900000101149681', '2026071610513701900000101149481', '公共数据授权运营合规评估', '服务交易', '数据交易合规评估服务', '深圳市数治咨询服务有限公司', '后付费', '按服务次数计费', '4500元/次', '1次', '4,500', '2026-07-16 11:03:28', '2026-07-01 至 2026-07-15', '2026-07-31 23:59:59', '--', '待供方确认'],
        ['2026071518440705400000101149697', '2026071518321405400000101149497', '企业数据资源托管运营服务', '服务交易', '企业数据资源托管运营服务', '龙岗区企业服务集团有限公司', '后付费', '按周期', '1200元/月', '6月', '7,200', '2026-07-15 18:44:07', '2026-01-01 至 2026-06-30', '2026-07-31 23:59:59', '--', '待需方确认'],
        ['2026071414365509200000101149713', '2026071414250309200000101149513', '园区企业能耗趋势分析报告', '产品交易', '数据产品', '龙岗区绿色产业运营有限公司', '预付费', '按次数', '800元/份', '1份', '800', '2026-07-14 14:36:55', '--', '--', '2026-07-14 14:37:19', '已结清', true],
        ['2026071216413103700000101149729', '2026071216294803700000101149529', '数据产品市场化运营策划服务', '服务交易', '数据产品运营策划服务', '深圳市龙岗招商服务有限公司', '预付费', '面议', '6800元/次', '1次', '6,800', '2026-07-12 16:41:31', '--', '--', '--', '待支付'],
        ['2026071011301806400000101149745', '2026071011182506400000101149545', '行业数据空间建设咨询服务', '服务交易', '行业数据空间建设咨询服务', '龙岗区产业发展研究中心', '预付费', '面议', '12000元/次', '1次', '12,000', '2026-07-10 11:30:18', '--', '--', '2026-07-10 11:31:06', '已结清'],
        ['2026070817375102200000101149761', '2026070817260802200000101149561', '重点企业运行监测数据产品', '产品交易', '数据产品', '龙岗区产业运营服务有限公司', '预付费', '按周期', '500元/月', '2月', '1,000', '2026-07-08 17:37:51', '--', '--', '2026-07-08 17:38:24', '已结清', true],
        ['2026070714184307500000101149777', '2026070714070007500000101149577', '交通运行分析解决方案', '服务交易', '企业数字化转型咨询服务', '龙岗智慧交通科技有限公司', '预付费', '面议', '3500元/次', '1次', '3,500', '2026-07-07 14:18:43', '--', '--', '2026-07-07 14:19:12', '已结清'],
        ['2026070615251604900000101149793', '2026070615133304900000101149593', '产业园区空间信息数据集', '产品交易', '数据集', '龙岗区产业空间服务有限公司', '后付费', '按周期', '200元/月', '3月', '600', '2026-07-06 15:25:16', '2026-04-01 至 2026-06-30', '2026-07-20 23:59:59', '--', '待供方确认'],
        ['2026070512093803100000101149809', '2026070511575503100000101149609', '企业经营风险预警数据服务', '产品交易', '数据产品', '深圳市企业征信服务有限公司', '预付费', '按次数', '90元/次', '5次', '450', '2026-07-05 12:09:38', '--', '--', '2026-07-05 12:10:07', '已结清', true],
        ['2026070419522706800000101149825', '2026070419404406800000101149625', '企业数据资产融资咨询服务', '服务交易', '企业数据资产融资咨询服务', '深圳市龙岗科创金融服务有限公司', '预付费', '面议', '6000元/次', '1次', '6,000', '2026-07-04 19:52:27', '--', '--', '2026-07-04 19:53:01', '已结清'],
        ['2026070314381102400000101149841', '2026070314262802400000101149641', '龙岗区从业人员结构分析数据', '产品交易', '数据产品', '深圳市人力资源数据服务中心', '预付费', '按次数', '200元/份', '1份', '200', '2026-07-03 14:38:11', '--', '--', '--', '待支付确认'],
        ['2026070211213009100000101149857', '2026070211094709100000101149657', '产业用房供需监测数据产品', '产品交易', '数据产品', '龙岗区产业空间服务有限公司', '后付费', '按周期', '200元/天', '7天', '1,400', '2026-07-02 11:21:30', '2026-06-25 至 2026-07-01', '2026-07-15 23:59:59', '--', '待需方确认'],
        ['2026070110303605600000101149873', '2026070110185305600000101149673', '园区企业基础登记信息数据产品', '产品交易', '数据集', '龙岗区企业服务集团有限公司', '预付费', '按次数', '100元/次', '1次', '100', '2026-07-01 10:30:36', '--', '--', '2026-07-01 10:31:02', '已结清', true],
        ['2026063016491803300000101149889', '2026063016373503300000101149689', '区域商业活力监测数据集', '产品交易', '数据集', '深圳市龙岗商业发展有限公司', '预付费', '按次数', '150元/次', '2次', '300', '2026-06-30 16:49:18', '--', '--', '2026-06-30 16:49:51', '已结清', true],
        ['2026062914065108800000101149905', '2026062913551808800000101149705', '企业数据安全风险评估服务', '服务交易', '数据安全风险评估服务', '深圳市数治咨询服务有限公司', '后付费', '按服务次数计费', '5000元/次', '1次', '5,000', '2026-06-29 14:06:51', '2026-06-01 至 2026-06-28', '2026-07-10 23:59:59', '2026-06-29 14:07:26', '已结清'],
        ['2026062811183701200000101149921', '2026062811065401200000101149721', '产业经济月度分析数据产品', '产品交易', '数据产品', '龙岗数智产业研究院有限公司', '预付费', '按周期', '600元/月', '1月', '600', '2026-06-28 11:18:37', '--', '--', '2026-06-28 11:19:09', '已结清', true],
        ['2026062710211208400000101149937', '2026062710092908400000101149737', '区域交通出行特征数据集', '产品交易', '数据集', '深圳市龙岗智慧交通有限公司', '预付费', '按次数', '220元/次', '1次', '220', '2026-06-27 10:21:12', '--', '--', '--', '待支付'],
        ['2026062615475005500000101149953', '2026062615361705500000101149753', '智慧园区运营咨询服务', '服务交易', '智慧园区运营咨询服务', '龙岗区绿色产业运营有限公司', '后付费', '面议', '10000元/次', '1次', '10,000', '2026-06-26 15:47:50', '2026-06-01 至 2026-06-25', '2026-07-10 23:59:59', '--', '待出账'],
        ['2026062514332602700000101149969', '2026062514214302700000101149769', '惠企政策智能匹配数据服务', '产品交易', '数据产品', '深圳市龙岗企业服务集团有限公司', '预付费', '按次数', '60元/次', '10次', '600', '2026-06-25 14:33:26', '--', '--', '2026-06-25 14:33:58', '已结清', true]
    ]);

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

    var SPLIT_RECORDS = [
        { billNo: 'FZ202607221018360000001', orderNo: '2026071714092607600000101149465', target: '数据资产融资可行性评估服务', businessType: '服务交易', targetType: '企业数据资产融资咨询服务', counterparty: '深圳市龙岗科创金融服务有限公司', payMode: '自动分账', measureMode: '按本期实付金额比例', price: '平台服务费3%', quantity: '第1/3期', amount: '1,800', createdAt: '2026-07-22 10:18:36', period: '首期款', repaymentAt: '--', paidAt: '2026-07-22 10:18:22', status: '分账成功', splitFee: '54.00', netAmount: '1,746.00', outTraceNo: 'PS20260722101836001' },
        { billNo: 'FZ202607211516200000002', orderNo: '2026071518321405400000101149497', target: '企业数据资源托管运营服务', businessType: '服务交易', targetType: '企业数据资源托管运营服务', counterparty: '龙岗区企业服务集团有限公司', payMode: '自动分账', measureMode: '按本期实付金额比例', price: '平台服务费2%', quantity: '第2/3期', amount: '2,880', createdAt: '2026-07-21 15:16:20', period: '阶段款', repaymentAt: '--', paidAt: '2026-07-21 15:16:05', status: '分账成功', splitFee: '57.60', netAmount: '2,822.40', outTraceNo: 'PS20260721151620002' },
        { billNo: 'FZ202607201108420000003', orderNo: '2026072015074302800000101149417', target: '园区数据治理体系规划咨询服务', businessType: '服务交易', targetType: '企业数据治理与合规咨询服务', counterparty: '龙岗区园区运营管理有限公司', payMode: '自动分账', measureMode: '按本期实付金额比例', price: '平台服务费3%', quantity: '第3/3期', amount: '1,500', createdAt: '2026-07-20 11:08:42', period: '尾款', repaymentAt: '--', paidAt: '2026-07-20 11:08:28', status: '分账处理中', splitFee: '45.00', netAmount: '1,455.00', outTraceNo: 'PS20260720110842003' },
        { billNo: 'FZ202607191426020000004', orderNo: '2026072116142806100000101149401', target: '龙岗企业经营画像数据集', businessType: '产品交易', targetType: '数据集', counterparty: '深圳市星途科技发展有限公司', payMode: '自动分账', measureMode: '按订单实付金额比例', price: '平台服务费3%', quantity: '一次性付款', amount: '300', createdAt: '2026-07-19 14:26:02', period: '一次性付款', repaymentAt: '--', paidAt: '2026-07-19 14:25:48', status: '分账成功', splitFee: '9.00', netAmount: '291.00', outTraceNo: 'PS20260719142602004' }
    ];

    var ICON_PATHS = {
        search: '<path d="M9.5 3a6.5 6.5 0 0 1 5.16 10.45l4.45 4.44-1.42 1.42-4.44-4.45A6.5 6.5 0 1 1 9.5 3zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"/>',
        filter: '<path d="M3 5h18l-7 8v5l-4 2v-7L3 5zm4.4 2 4.6 5.25V17l1-.5v-4.25L17.6 7H7.4z"/>',
        reset: '<path d="M12 5V2L7 7l5 5V7a5 5 0 1 1-4.55 7.06l-1.82.83A7 7 0 1 0 12 5z"/>',
        export: '<path d="M5 20h14v-2H5v2zm7-18-5 5h3v7h4V7h3l-5-5z"/>',
        pay: '<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4H4V6h16v2zm-8 8H5v-2h7v2z"/>',
        detail: '<path d="M12 5c5 0 8.4 4.2 9.5 7-1.1 2.8-4.5 7-9.5 7S3.6 14.8 2.5 12C3.6 9.2 7 5 12 5zm0 2c-3.6 0-6.2 2.7-7.3 5 1.1 2.3 3.7 5 7.3 5s6.2-2.7 7.3-5C18.2 9.7 15.6 7 12 7zm0 2.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6z"/>',
        usage: '<path d="M4 19h16v2H4v-2zm1-3h3V8H5v8zm5 0h3V3h-3v13zm5 0h3v-6h-3v6z"/>',
        confirm: '<path d="m9 16.2-3.5-3.5L4.1 14.1 9 19 20.3 7.7l-1.4-1.4L9 16.2z"/>',
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
            activeSplitBillNo: ''
        };
        var toastTimer = null;

        panel.classList.remove('is-placeholder', 'is-service-management', 'is-order-management', 'is-supplier-order-management');
        panel.classList.add('is-supplier-bill-management');
        if (title) title.textContent = '交易账单管理';
        document.title = '交易账单管理 - 供方中心';

        function getCurrentRecords() {
            if (state.tab === 'payable') return PAYABLE_RECORDS;
            if (state.tab === 'split') return SPLIT_RECORDS;
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
                + '<button class="supplier-order-tab' + (state.tab === 'payable' ? ' active' : '') + '" type="button" role="tab" aria-selected="' + (state.tab === 'payable') + '" data-supplier-bill-tab="payable">应付账单</button>'
                + '<button class="supplier-order-tab' + (state.tab === 'split' ? ' active' : '') + '" type="button" role="tab" aria-selected="' + (state.tab === 'split') + '" data-supplier-bill-tab="split">分账结算</button>';
        }

        function renderFilterPanel() {
            return ''
                + '<div class="supplier-order-filter-panel supplier-bill-filter-panel' + (state.filterOpen ? ' show' : '') + '">'
                +   '<select data-supplier-bill-business aria-label="业务类型">' + renderOptions(getBusinessTypes(), state.businessType) + '</select>'
                +   '<select data-supplier-bill-pay-mode aria-label="付费方式">' + renderOptions(['全部付费方式', '预付费', '后付费', '自动分账'], state.payMode) + '</select>'
                +   '<select data-supplier-bill-status aria-label="账单状态">' + renderOptions(BILL_STATUS_OPTIONS, state.status) + '</select>'
                +   '<label class="supplier-bill-date"><span>账单生成时间</span><input type="date" value="' + escapeHtml(state.createdDate) + '" data-supplier-bill-date></label>'
                +   '<button class="supplier-order-filter-reset" type="button" data-supplier-bill-reset>' + icon('reset') + '<span>重置</span></button>'
                + '</div>';
        }

        function getActions(item) {
            if (state.tab === 'split') return [['分账详情', 'detail']];
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
                    +   '<td class="supplier-bill-ellipsis" title="' + escapeHtml(item.target) + '">' + escapeHtml(item.target) + (item.splitFee ? '<span class="supplier-bill-split-detail">' + escapeHtml(item.quantity) + ' · 平台费¥' + escapeHtml(item.splitFee) + ' · 供方到账¥' + escapeHtml(item.netAmount) + '</span>' : '') + '</td>'
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
                +               '<th>价格</th><th>购买数量</th><th class="supplier-bill-amount">账单金额(元)</th><th>账单生成时间</th><th>账期</th><th>还款时间</th><th>付款时间</th>'
                +               '<th class="supplier-bill-status-cell">账单状态</th><th class="supplier-bill-action-cell">操作</th>'
                +           '</tr></thead>'
                +           '<tbody>' + renderRows(records) + '</tbody>'
                +       '</table>'
                +   '</div>'
                +   renderPagination(filtered.length, totalPages)
                + '</div>';
        }

        function renderSplitDetail() {
            if (!state.activeSplitBillNo) return '';
            var item = SPLIT_RECORDS.find(function (record) { return record.billNo === state.activeSplitBillNo; });
            if (!item) return '';
            var feeRate = String(item.price || '').match(/[\d.]+%/);
            return ''
                + '<div class="supplier-split-modal-mask" data-split-detail-close></div>'
                + '<aside class="supplier-split-modal" role="dialog" aria-modal="true" aria-labelledby="supplierSplitDetailTitle">'
                +   '<header><div><h2 id="supplierSplitDetailTitle">分账结算详情</h2><p>' + escapeHtml(item.outTraceNo) + '</p></div><button type="button" aria-label="关闭" data-split-detail-close>×</button></header>'
                +   '<div class="supplier-split-modal-body">'
                +       '<section><h3>关联交易</h3><div class="supplier-split-detail-grid"><div><span>订单编号</span><strong>' + escapeHtml(item.orderNo) + '</strong></div><div><span>交易标的</span><strong>' + escapeHtml(item.target) + '</strong></div><div><span>付款期次</span><strong>' + escapeHtml(item.quantity + ' · ' + item.period) + '</strong></div><div><span>需方付款时间</span><strong>' + escapeHtml(item.paidAt) + '</strong></div></div></section>'
                +       '<section><h3>资金分配</h3><div class="supplier-split-money-grid"><div><span>需方实付金额</span><strong>¥' + escapeHtml(item.amount) + '</strong></div><div><span>平台服务费</span><strong>¥' + escapeHtml(item.splitFee) + '</strong><small>' + escapeHtml(feeRate ? feeRate[0] : item.price) + '</small></div><div class="is-net"><span>供方实际分账金额</span><strong>¥' + escapeHtml(item.netAmount) + '</strong></div></div></section>'
                +       '<section><h3>分账结果</h3><div class="supplier-split-detail-grid"><div><span>分账接收方</span><strong>深圳市龙岗数智科技有限公司</strong></div><div><span>接收方编号</span><strong>RCV-202607-00986</strong></div><div><span>分账单号</span><strong>' + escapeHtml(item.outTraceNo) + '</strong></div><div><span>分账状态</span><strong class="supplier-split-status">' + escapeHtml(item.status) + '</strong></div><div><span>分账时间</span><strong>' + escapeHtml(item.createdAt) + '</strong></div><div><span>结算账户</span><strong>中国农业银行 · 4405 **** 12345</strong></div></div></section>'
                +   '</div>'
                +   '<footer><button type="button" data-split-detail-close>关闭</button></footer>'
                + '</aside>';
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
                + renderSplitDetail()
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
                showToast((state.tab === 'payable' ? '应付账单' : (state.tab === 'split' ? '分账结算记录' : '应收账单')) + '导出功能将在后续设计，本页仅展示操作入口。');
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
                    if (state.tab === 'split' && this.dataset.supplierBillAction === '分账详情') {
                        state.activeSplitBillNo = this.dataset.supplierBillNo;
                        render();
                        return;
                    }
                    showToast(this.dataset.supplierBillAction + '功能将在后续设计，本页仅展示操作入口。');
                });
            });

            panel.querySelectorAll('[data-split-detail-close]').forEach(function (control) {
                control.addEventListener('click', function () {
                    state.activeSplitBillNo = '';
                    render();
                });
            });
        }

        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSupplierTransactionBills);
    } else {
        initSupplierTransactionBills();
    }
})();
