(function () {
    var BILL_STATUS_OPTIONS = ['全部账单状态', '待出账', '待支付', '待支付确认', '已结清', '待供方确认', '待需方确认'];

    var BILL_RECORDS = [
        { billNo: '2026071810352168900000101148674', orderNo: '2026071810324437100000101148221', target: '龙岗企业经营画像数据集', businessType: '产品交易', targetType: '数据集', provider: '深圳市龙岗区数据服务中心', payMode: '预付费', measureMode: '按次数', price: '100元/次', quantity: '1次', amount: '100', createdAt: '2026-07-18 10:35:21', period: '--', paidAt: '--', status: '待支付' },
        { billNo: '2026071714481279100000101148551', orderNo: '2026071714454903500000101148179', target: '重点企业运行监测数据产品', businessType: '产品交易', targetType: '数据产品', provider: '龙岗数科产业运营有限公司', payMode: '预付费', measureMode: '按周期', price: '50元/天', quantity: '30天', amount: '1,500', createdAt: '2026-07-17 14:48:12', period: '--', paidAt: '--', status: '待支付' },
        { billNo: '2026071611291846400000101148420', orderNo: '2026071611262062500000101148121', target: '企业数据治理与合规评估服务', businessType: '服务交易', targetType: '企业数据治理与合规咨询服务', provider: '深圳市龙岗区数据要素交易服务有限公司', payMode: '预付费', measureMode: '合同分期', price: '首期30%', quantity: '第1/3期', amount: '3,600', createdAt: '2026-07-16 11:29:18', period: '首期款', paidAt: '--', status: '待支付', paymentStage: { periodNo: 1, periodTotal: 3, name: '首期款', percent: 30, contractAmount: 12000, serviceFeeRate: 3, payStatus: '待支付', outTradeNo: 'PAY20260716112918464000P01' } },
        { billNo: '2026071517183952000000101148245', orderNo: '2026071517152436900000101148980', target: '园区能耗监测指标服务', businessType: '产品交易', targetType: '数据产品', provider: '深圳市智碳数据服务有限公司', payMode: '后付费', measureMode: '按周期', price: '20元/天', quantity: '31天', amount: '620', createdAt: '2026-07-15 17:18:39', period: '2026-06-01 至 2026-06-30', paidAt: '--', status: '待需方确认' },
        { billNo: '2026071413555498600000101148220', orderNo: '2026071413522854500000101148928', target: '低空巡检影像数据治理服务', businessType: '服务交易', targetType: '数据治理服务', provider: '龙岗数智集成服务有限公司', payMode: '后付费', measureMode: '按服务次数计费', price: '3000元/次', quantity: '1次', amount: '3,000', createdAt: '2026-07-14 13:55:54', period: '2026-07-01 至 2026-07-14', paidAt: '--', status: '待供方确认' },
        { billNo: '2026071310282446800000101148103', orderNo: '2026071310254673400000101148870', target: '产业链企业关联数据产品', businessType: '产品交易', targetType: '数据产品', provider: '龙岗区产业发展研究中心', payMode: '预付费', measureMode: '按周期', price: '300元/月', quantity: '1月', amount: '300', createdAt: '2026-07-13 10:28:24', period: '--', paidAt: '--', status: '待支付确认' },
        { billNo: '2026071210210648700000101148228', orderNo: '2026071210183245300000101148835', target: '公共信用评价数据服务', businessType: '产品交易', targetType: '数据集', provider: '深圳市公共信用中心', payMode: '后付费', measureMode: '按次数', price: '80元/次', quantity: '5次', amount: '400', createdAt: '2026-07-12 10:21:06', period: '2026-07-01 至 2026-07-10', paidAt: '--', status: '待出账' },
        { billNo: '2026071115573189900000101148214', orderNo: '2026071115544067700000101148821', target: '龙岗区区域交通拥堵指数服务', businessType: '产品交易', targetType: '数据产品', provider: '深圳市龙岗区政务数据中心', payMode: '预付费', measureMode: '按周期', price: '22元/天', quantity: '7天', amount: '154', createdAt: '2026-07-11 15:57:31', period: '--', paidAt: '2026-07-11 15:58:04', status: '已结清', showUsage: true },
        { billNo: '2026071013113659200000101148198', orderNo: '2026071013085448400000101148796', target: '中小微企业扶持政策匹配数据集', businessType: '产品交易', targetType: '数据集', provider: '龙岗区企业服务集团有限公司', payMode: '预付费', measureMode: '按次数', price: '50元/次', quantity: '5次', amount: '250', createdAt: '2026-07-10 13:11:36', period: '--', paidAt: '2026-07-10 13:12:08', status: '已结清', showUsage: true },
        { billNo: '2026070916362000000000101148187', orderNo: '2026070916334074400000101148788', target: '企业经营风险监测数据集', businessType: '产品交易', targetType: '数据集', provider: '深圳市企业征信服务有限公司', payMode: '预付费', measureMode: '按次数', price: '100元/次', quantity: '1次', amount: '100', createdAt: '2026-07-09 16:36:20', period: '--', paidAt: '--', status: '待支付' },
        { billNo: '2026070817271796000000101148114', orderNo: '2026070817260805600000101148101', target: '数据治理与标准体系咨询服务', businessType: '服务交易', targetType: '企业数据治理咨询服务', provider: '深圳市龙岗区政务数据运营有限公司', payMode: '预付费', measureMode: '面议', price: '10000元', quantity: '--', amount: '10,000', createdAt: '2026-07-08 17:27:17', period: '--', paidAt: '2026-07-08 17:27:34', status: '已结清' },
        { billNo: '2026070817154863200000101148203', orderNo: '2026070817135286300000101148174', target: '企业经营登记基础信息数据集', businessType: '产品交易', targetType: '数据集', provider: '深圳市龙岗区政务数据运营有限公司', payMode: '预付费', measureMode: '按周期', price: '10元/天', quantity: '100天', amount: '1,000', createdAt: '2026-07-08 17:15:48', period: '--', paidAt: '2026-07-08 17:16:24', status: '已结清', showUsage: true },
        { billNo: '2026070814074822600000101148140', orderNo: '2026070814070075400000101148170', target: '智慧园区解决方案评估服务', businessType: '服务交易', targetType: '行业解决方案咨询服务', provider: '龙岗智慧园区运营有限公司', payMode: '预付费', measureMode: '面议', price: '122元', quantity: '--', amount: '122', createdAt: '2026-07-08 14:07:48', period: '--', paidAt: '2026-07-08 14:07:58', status: '已结清' },
        { billNo: '2026070814030262900000101148290', orderNo: '2026070814015177100000101148162', target: '数据战略与要素发展顶层规划', businessType: '服务交易', targetType: '企业数据治理咨询服务', provider: '深圳市龙岗区政务数据运营有限公司', payMode: '预付费', measureMode: '面议', price: '100元', quantity: '--', amount: '100', createdAt: '2026-07-08 14:03:02', period: '--', paidAt: '2026-07-08 14:03:12', status: '已结清' },
        { billNo: '2026070715032669200000101148226', orderNo: '2026070715011393200000101148110', target: '园区能耗趋势分析报告', businessType: '产品交易', targetType: '数据产品', provider: '深圳市智碳数据服务有限公司', payMode: '预付费', measureMode: '按次数', price: '1元/次', quantity: '1000次', amount: '1,000', createdAt: '2026-07-07 15:03:26', period: '--', paidAt: '2026-07-07 15:05:20', status: '已结清', showUsage: true },
        { billNo: '2026070716282007100000101148306', orderNo: '2026070716265451500000101148172', target: '数据战略与要素发展顾问服务', businessType: '服务交易', targetType: '企业数据治理咨询服务', provider: '深圳市龙岗区政务数据运营有限公司', payMode: '预付费', measureMode: '面议', price: '100元', quantity: '--', amount: '100', createdAt: '2026-07-07 16:28:20', period: '--', paidAt: '2026-07-07 16:28:37', status: '已结清' },
        { billNo: '2026070716030708200000101148308', orderNo: '2026070716015636100000101148182', target: '智慧园区解决方案咨询服务', businessType: '服务交易', targetType: '行业解决方案咨询服务', provider: '龙岗智慧园区运营有限公司', payMode: '预付费', measureMode: '面议', price: '100元', quantity: '--', amount: '100', createdAt: '2026-07-07 16:03:07', period: '--', paidAt: '2026-07-07 16:03:24', status: '已结清' },
        { billNo: '2026061916064264800000101148264', orderNo: '2026061916051502100000101148116', target: '福田区金融风控数据建模服务', businessType: '服务交易', targetType: '数据建模服务', provider: '深圳市金融数据服务有限公司', payMode: '后付费', measureMode: '按服务次数计费', price: '100元/次', quantity: '1次', amount: '100', createdAt: '2026-06-19 16:06:42', period: '2026-06-01 至 2026-06-18', paidAt: '2026-06-19 16:07:05', status: '已结清' },
        { billNo: '2026061915534737100000101148273', orderNo: '2026061915515202800000101148184', target: '医疗健康主题数据集', businessType: '产品交易', targetType: '数据集', provider: '深圳市健康数据服务中心', payMode: '预付费', measureMode: '面议', price: '1元', quantity: '--', amount: '1', createdAt: '2026-06-19 15:53:47', period: '--', paidAt: '2026-06-19 15:58:31', status: '已结清' },
        { billNo: '2026060419485168900000101148674', orderNo: '2026060419400437100000101148221', target: '坪山区智能制造产业生态图谱', businessType: '产品交易', targetType: '数据集', provider: '深圳市龙岗区政务数据运营有限公司', payMode: '预付费', measureMode: '按周期', price: '20元/天', quantity: '10天', amount: '200', createdAt: '2026-06-04 19:48:51', period: '--', paidAt: '2026-06-04 19:49:20', status: '已结清', showUsage: true },
        { billNo: '2026060419214779100000101148551', orderNo: '2026060419184903500000101148173', target: '罗湖区商业数据咨询服务', businessType: '服务交易', targetType: '企业数据治理与合规咨询服务', provider: '深圳市龙岗区数据要素交易服务有限公司', payMode: '预付费', measureMode: '按服务次数计费', price: '100元/次', quantity: '1次', amount: '100', createdAt: '2026-06-04 19:21:47', period: '--', paidAt: '2026-06-04 19:22:10', status: '已结清' },
        { billNo: '2026060116110648700000101148228', orderNo: '2026060116103245300000101148835', target: '企业运营指标分析数据产品', businessType: '产品交易', targetType: '数据产品', provider: '深圳市龙岗远望软件技术有限公司', payMode: '预付费', measureMode: '按次数', price: '10元/次', quantity: '10次', amount: '100', createdAt: '2026-06-01 16:11:06', period: '--', paidAt: '2026-06-01 16:11:13', status: '已结清', showUsage: true }
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

    function formatAmount(value) {
        var amount = Number(String(value == null ? '' : value).replace(/[^\d.]/g, '')) || 0;
        return amount.toLocaleString('zh-CN', { maximumFractionDigits: 2 });
    }

    function formatNow() {
        var date = new Date();
        function two(value) { return String(value).padStart(2, '0'); }
        return date.getFullYear() + '-' + two(date.getMonth() + 1) + '-' + two(date.getDate()) + ' '
            + two(date.getHours()) + ':' + two(date.getMinutes()) + ':' + two(date.getSeconds());
    }

    function initTransactionBills() {
        var params = new URLSearchParams(window.location.search || '');
        if (params.get('menu') !== 'transaction-bill') return;

        var panel = document.querySelector('[data-consult-panel]');
        var title = document.querySelector('[data-center-title]');
        if (!panel) return;

        var state = {
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
        var checkout = window.BuyerPaymentCheckout ? window.BuyerPaymentCheckout.create() : null;
        var buyerName = '深圳市龙岗智慧产业有限公司';

        panel.classList.remove('is-placeholder', 'is-service-management', 'is-order-management');
        panel.classList.add('is-bill-management');
        if (title) title.textContent = '交易账单管理';
        document.title = '交易账单管理 - 需方中心';

        function getFilteredRecords() {
            var keyword = state.keyword.toLowerCase();
            return BILL_RECORDS.filter(function (item) {
                if (state.businessType !== '全部业务类型' && item.businessType !== state.businessType) return false;
                if (state.payMode !== '全部付费方式' && item.payMode !== state.payMode) return false;
                if (state.status !== '全部账单状态' && item.status !== state.status) return false;
                if (state.createdDate && item.createdAt.slice(0, 10) !== state.createdDate) return false;
                if (!keyword) return true;
                var text = [item.billNo, item.orderNo, item.target, item.provider].join(' ').toLowerCase();
                return text.indexOf(keyword) !== -1;
            });
        }

        function renderOptions(options, selected) {
            return options.map(function (option) {
                return '<option' + (option === selected ? ' selected' : '') + '>' + escapeHtml(option) + '</option>';
            }).join('');
        }

        function renderFilterPanel() {
            return ''
                + '<div class="buyer-order-filter-panel buyer-bill-filter-panel' + (state.filterOpen ? ' show' : '') + '" data-bill-filter-panel>'
                +   '<select data-bill-business aria-label="业务类型">' + renderOptions(['全部业务类型', '产品交易', '服务交易'], state.businessType) + '</select>'
                +   '<select data-bill-pay-mode aria-label="付费方式">' + renderOptions(['全部付费方式', '预付费', '后付费'], state.payMode) + '</select>'
                +   '<select data-bill-status aria-label="账单状态">' + renderOptions(BILL_STATUS_OPTIONS, state.status) + '</select>'
                +   '<label class="buyer-bill-date"><span>账单生成时间</span><input type="date" value="' + escapeHtml(state.createdDate) + '" data-bill-date></label>'
                +   '<button class="buyer-order-filter-reset" type="button" data-bill-reset>' + icon('reset') + '<span>重置</span></button>'
                + '</div>';
        }

        function getActions(item) {
            if (item.status === '待支付') return [['去支付', 'pay'], ['账单详情', 'detail']];
            if (item.status === '待需方确认') return [['确认账单', 'confirm'], ['账单详情', 'detail']];
            if (item.status === '已结清' && item.showUsage) return [['用量明细', 'usage'], ['账单详情', 'detail']];
            return [['账单详情', 'detail']];
        }

        function renderActions(item) {
            return getActions(item).map(function (action) {
                return '<button class="buyer-order-action" type="button" data-bill-action="' + escapeHtml(action[0]) + '" data-bill-no="' + escapeHtml(item.billNo) + '">'
                    + icon(action[1]) + '<span>' + escapeHtml(action[0]) + '</span></button>';
            }).join('');
        }

        function renderRows(records) {
            if (!records.length) return '<tr><td class="buyer-bill-empty" colspan="16">暂无符合条件的交易账单</td></tr>';
            return records.map(function (item) {
                return ''
                    + '<tr>'
                    +   '<td class="buyer-bill-ellipsis" title="' + escapeHtml(item.billNo) + '">' + escapeHtml(item.billNo) + '</td>'
                    +   '<td class="buyer-bill-ellipsis" title="' + escapeHtml(item.orderNo) + '"><button class="buyer-bill-order-link" type="button" data-bill-order-link="' + escapeHtml(item.orderNo) + '">' + escapeHtml(item.orderNo) + '</button></td>'
                    +   '<td class="buyer-bill-ellipsis" title="' + escapeHtml(item.target) + '">' + escapeHtml(item.target) + (item.paymentStage ? '<span class="buyer-bill-stage">第' + item.paymentStage.periodNo + '/' + item.paymentStage.periodTotal + '期 · ' + escapeHtml(item.paymentStage.name) + ' · ' + item.paymentStage.percent + '%</span>' : '') + '</td>'
                    +   '<td>' + escapeHtml(item.businessType) + '</td>'
                    +   '<td class="buyer-bill-ellipsis" title="' + escapeHtml(item.targetType) + '">' + escapeHtml(item.targetType) + '</td>'
                    +   '<td class="buyer-bill-ellipsis" title="' + escapeHtml(item.provider) + '">' + escapeHtml(item.provider) + '</td>'
                    +   '<td>' + escapeHtml(item.payMode) + '</td>'
                    +   '<td class="buyer-bill-ellipsis" title="' + escapeHtml(item.measureMode) + '">' + escapeHtml(item.measureMode) + '</td>'
                    +   '<td>' + escapeHtml(item.price) + '</td>'
                    +   '<td>' + escapeHtml(item.quantity) + '</td>'
                    +   '<td class="buyer-bill-amount">' + escapeHtml(formatAmount(item.amount)) + '</td>'
                    +   '<td>' + escapeHtml(item.createdAt) + '</td>'
                    +   '<td>' + escapeHtml(item.period) + '</td>'
                    +   '<td>' + escapeHtml(item.paidAt) + '</td>'
                    +   '<td class="buyer-bill-status-cell"><span class="buyer-order-status">' + escapeHtml(item.status) + '</span></td>'
                    +   '<td class="buyer-bill-action-cell"><div class="buyer-order-actions">' + renderActions(item) + '</div></td>'
                    + '</tr>';
            }).join('');
        }

        function renderPagination(total, totalPages) {
            var buttons = [];
            for (var page = 1; page <= totalPages; page += 1) {
                buttons.push('<button class="buyer-order-page-btn' + (page === state.page ? ' active' : '') + '" type="button" data-bill-page="' + page + '">' + page + '</button>');
            }
            return ''
                + '<div class="buyer-order-pagination">'
                +   '<span>共 ' + total + ' 条</span>'
                +   '<button class="buyer-order-page-btn" type="button" aria-label="上一页" data-bill-page="prev"' + (state.page <= 1 ? ' disabled' : '') + '>‹</button>'
                +   buttons.join('')
                +   '<button class="buyer-order-page-btn" type="button" aria-label="下一页" data-bill-page="next"' + (state.page >= totalPages ? ' disabled' : '') + '>›</button>'
                +   '<select class="buyer-order-page-size" data-bill-page-size aria-label="每页条数">'
                +       '<option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10 条/页</option>'
                +       '<option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20 条/页</option>'
                +   '</select>'
                +   '<span>前往</span>'
                +   '<input class="buyer-order-page-jump" type="number" min="1" max="' + totalPages + '" aria-label="前往页码" data-bill-page-jump>'
                + '</div>';
        }

        function renderTable() {
            var filtered = getFilteredRecords();
            var totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
            if (state.page > totalPages) state.page = totalPages;
            var start = (state.page - 1) * state.pageSize;
            var records = filtered.slice(start, start + state.pageSize);
            return ''
                + '<div class="buyer-bill-table-card">'
                +   '<div class="buyer-bill-table-scroll" aria-label="交易账单列表，可横向滚动">'
                +       '<table class="buyer-bill-table">'
                +           '<colgroup>'
                +               '<col class="col-bill-no"><col class="col-order-no"><col class="col-target"><col class="col-business"><col class="col-target-type"><col class="col-provider">'
                +               '<col class="col-pay-mode"><col class="col-measure"><col class="col-price"><col class="col-quantity"><col class="col-amount"><col class="col-created">'
                +               '<col class="col-period"><col class="col-paid"><col class="col-status"><col class="col-actions">'
                +           '</colgroup>'
                +           '<thead><tr>'
                +               '<th>账单编号</th><th>订单编号</th><th>交易标的</th><th>业务类型</th><th>标的类型</th><th>提供方</th><th>付费方式</th><th>计量方式</th>'
                +               '<th>价格</th><th>购买数量</th><th class="buyer-bill-amount">账单金额(元)</th><th>账单生成时间</th><th>账期</th><th>付款时间</th>'
                +               '<th class="buyer-bill-status-cell">账单状态</th><th class="buyer-bill-action-cell">操作</th>'
                +           '</tr></thead>'
                +           '<tbody>' + renderRows(records) + '</tbody>'
                +       '</table>'
                +   '</div>'
                +   renderPagination(filtered.length, totalPages)
                + '</div>';
        }

        function renderDetailFields(fields) {
            return '<div class="buyer-bill-detail-grid">' + fields.map(function (field) {
                return '<div class="buyer-bill-detail-field">'
                    + '<span class="buyer-bill-detail-label">' + escapeHtml(field.label) + '：</span>'
                    + '<span class="buyer-bill-detail-value">' + (field.html || escapeHtml(field.value || '--')) + '</span>'
                    + '</div>';
            }).join('') + '</div>';
        }

        function renderDetailSection(titleText, content) {
            return '<section class="buyer-bill-detail-section">'
                + '<h3>' + escapeHtml(titleText) + '</h3>'
                + content
                + '</section>';
        }

        function getPaymentNo(item) {
            if (item.paymentStage && item.paymentStage.outTradeNo) return item.paymentStage.outTradeNo;
            var digits = String(item.billNo || '').replace(/\D/g, '');
            return 'ZF' + (digits.slice(-26) || '20260723000000000000000001');
        }

        function detailStatus(text, tone) {
            return '<span class="buyer-bill-detail-status' + (tone ? ' ' + tone : '') + '"><i></i>' + escapeHtml(text) + '</span>';
        }

        function renderPaymentDetail(item) {
            var hasPaid = item.paidAt && item.paidAt !== '--';
            var awaitingConfirmation = item.status === '待支付确认';
            if (!hasPaid && !awaitingConfirmation) {
                return '<div class="buyer-bill-detail-empty">暂无支付记录</div>';
            }
            return '<div class="buyer-bill-detail-table-scroll">'
                + '<table class="buyer-bill-detail-table">'
                + '<thead><tr><th>支付编号</th><th>支付时间</th><th>支付状态</th></tr></thead>'
                + '<tbody><tr><td>' + escapeHtml(getPaymentNo(item)) + '</td><td>' + escapeHtml(hasPaid ? item.paidAt : '--') + '</td><td>'
                + detailStatus(hasPaid ? '已通过' : '待确认', hasPaid ? 'success' : 'waiting')
                + '</td></tr></tbody></table></div>';
        }

        function renderFlowDetail(item) {
            var hasPaid = item.paidAt && item.paidAt !== '--';
            var rows = [
                { operator: '系统自动', type: '生成账单', result: '成功', content: '--', time: item.createdAt }
            ];

            if (hasPaid) {
                rows.push({ operator: buyerName, type: '支付账单', result: '成功', content: '--', time: item.paidAt });
                rows.push({ operator: item.provider, type: '确认支付账单', result: '通过', content: '--', time: item.paidAt });
            } else if (item.status === '待支付确认') {
                rows.push({ operator: buyerName, type: '提交支付凭证', result: '成功', content: '等待提供方确认', time: item.createdAt });
            } else if (item.status === '待供方确认') {
                rows.push({ operator: buyerName, type: '提交账单确认', result: '成功', content: '等待提供方确认', time: item.createdAt });
            } else if (item.status === '待需方确认') {
                rows.push({ operator: item.provider, type: '提交账单确认', result: '成功', content: '等待需方确认', time: item.createdAt });
            }

            return '<div class="buyer-bill-detail-table-scroll is-flow">'
                + '<table class="buyer-bill-detail-table">'
                + '<thead><tr><th>操作者</th><th>操作类型</th><th>操作结果</th><th>内容</th><th>操作时间</th></tr></thead>'
                + '<tbody>' + rows.map(function (row) {
                    return '<tr><td>' + escapeHtml(row.operator) + '</td><td>' + escapeHtml(row.type) + '</td><td>' + escapeHtml(row.result) + '</td><td>' + escapeHtml(row.content) + '</td><td>' + escapeHtml(row.time) + '</td></tr>';
                }).join('') + '</tbody></table></div>';
        }

        function renderBillDetail(item) {
            return ''
                + '<div class="buyer-bill-detail-mask" data-buyer-bill-detail-layer data-buyer-bill-detail-close></div>'
                + '<aside class="buyer-bill-detail-drawer" role="dialog" aria-modal="true" aria-labelledby="buyerBillDetailTitle" data-buyer-bill-detail-layer>'
                +   '<header class="buyer-bill-detail-head">'
                +       '<button type="button" aria-label="关闭账单详情" data-buyer-bill-detail-close data-buyer-bill-detail-close-button>' + icon('close') + '</button>'
                +       '<h2 id="buyerBillDetailTitle">账单详情</h2>'
                +   '</header>'
                +   '<div class="buyer-bill-detail-body">'
                +       renderDetailSection('订单信息', renderDetailFields([
                            { label: '订单编号', value: item.orderNo },
                            { label: '交易标的', value: item.target },
                            { label: '业务类型', value: item.businessType },
                            { label: '标的类型', value: item.targetType },
                            { label: '提供方', value: item.provider },
                            { label: '付费方式', value: item.payMode },
                            { label: '计量方式', value: item.measureMode },
                            { label: '价格', value: item.price },
                            { label: '订单金额', value: '¥' + formatAmount(item.amount) },
                            { label: '购买数量', value: item.quantity }
                        ]))
                +       renderDetailSection('账单信息', renderDetailFields([
                            { label: '账单编号', value: item.billNo },
                            { label: '账单状态', html: '<span class="buyer-order-status">' + escapeHtml(item.status) + '</span>' },
                            { label: '账单金额', value: '¥' + formatAmount(item.amount) },
                            { label: '账单生成时间', value: item.createdAt },
                            { label: '账期', value: item.period },
                            { label: '付款时间', value: item.paidAt }
                        ]))
                +       renderDetailSection('支付信息', renderPaymentDetail(item))
                +       renderDetailSection('流程动态', renderFlowDetail(item))
                +   '</div>'
                + '</aside>';
        }

        function closeBillDetail() {
            var billNo = state.activeBillNo;
            panel.querySelectorAll('[data-buyer-bill-detail-layer]').forEach(function (layer) { layer.remove(); });
            state.activeBillNo = '';
            document.body.classList.remove('buyer-bill-detail-open');
            panel.querySelectorAll('[data-bill-action="账单详情"]').forEach(function (button) {
                if (button.dataset.billNo === billNo) button.focus();
            });
        }

        function bindBillDetailEvents() {
            panel.querySelectorAll('[data-buyer-bill-detail-close]').forEach(function (control) {
                control.addEventListener('click', closeBillDetail);
            });
        }

        function openBillDetail(item) {
            closeBillDetail();
            state.activeBillNo = item.billNo;
            panel.insertAdjacentHTML('beforeend', renderBillDetail(item));
            document.body.classList.add('buyer-bill-detail-open');
            bindBillDetailEvents();
            var closeButton = panel.querySelector('[data-buyer-bill-detail-close-button]');
            if (closeButton) closeButton.focus();
        }

        function render() {
            panel.innerHTML = ''
                + '<div class="buyer-bill-board">'
                +   '<div class="buyer-order-toolbar buyer-bill-toolbar">'
                +       '<label class="buyer-order-search buyer-bill-search">'
                +           '<input type="search" placeholder="请输入账单编号/订单编号/交易标的/提供方" value="' + escapeHtml(state.keyword) + '" data-bill-keyword aria-label="搜索交易账单">'
                +           icon('search')
                +       '</label>'
                +       '<button class="buyer-order-filter-toggle buyer-bill-filter-toggle' + (state.filterOpen ? ' active' : '') + '" type="button" aria-label="筛选交易账单" aria-expanded="' + state.filterOpen + '" data-bill-filter-toggle>' + icon('filter') + '<span>筛选</span></button>'
                +       '<button class="buyer-bill-export" type="button" data-bill-export>' + icon('export') + '<span>导出</span></button>'
                +   '</div>'
                +   renderFilterPanel()
                +   renderTable()
                + '</div>'
                + '<div class="buyer-order-toast" role="status" aria-live="polite" data-bill-toast>' + icon('success') + '<span></span></div>';
            bindEvents();
        }

        function showToast(message) {
            var toast = panel.querySelector('[data-bill-toast]');
            if (!toast) return;
            toast.querySelector('span').textContent = message;
            toast.classList.add('show');
            window.clearTimeout(toastTimer);
            toastTimer = window.setTimeout(function () { toast.classList.remove('show'); }, 2200);
        }

        function openCheckout(item) {
            if (!checkout) {
                showToast('收银台组件加载失败，请稍后重试。');
                return;
            }
            checkout.open({
                feeType: '交易价款',
                merchantId: 'MER-PLATFORM-202607-0001',
                orderNo: item.orderNo,
                billNo: item.billNo,
                objectLabel: '交易标的',
                objectName: item.target,
                objectTypeLabel: '标的类型',
                objectType: item.targetType,
                payerName: buyerName,
                providerName: item.provider,
                merchantName: item.provider,
                amount: item.amount,
                stageNo: item.paymentStage ? item.paymentStage.periodNo : '',
                stageTotal: item.paymentStage ? item.paymentStage.periodTotal : '',
                stageName: item.paymentStage ? item.paymentStage.name : '',
                stagePercent: item.paymentStage ? item.paymentStage.percent : '',
                contractAmount: item.paymentStage ? item.paymentStage.contractAmount : '',
                serviceFeeRate: item.paymentStage ? item.paymentStage.serviceFeeRate : 3,
                stageStatus: item.paymentStage ? item.paymentStage.payStatus : '待支付',
                outTradeNo: item.paymentStage ? item.paymentStage.outTradeNo : '',
                successText: '账单已结清，付款结果已同步。',
                failureText: '账单仍保留在“待支付”状态，不会重复扣款。'
            }, {
                onOfflineSubmitted: function () {
                    item.status = '待支付确认';
                    item.paidAt = '--';
                    render();
                    showToast('线下支付凭证已提交，等待支付确认。');
                },
                onOnlineSuccess: function () {
                    if (item.paymentStage) item.paymentStage.payStatus = '已支付';
                    item.status = '已结清';
                    item.paidAt = formatNow();
                    render();
                },
                onDone: function () {
                    showToast('支付成功，账单已结清。');
                }
            });
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

        function bindEvents() {
            var keyword = panel.querySelector('[data-bill-keyword]');
            if (keyword) {
                keyword.addEventListener('input', function () {
                    state.keyword = this.value.trim();
                    state.page = 1;
                    render();
                    var next = panel.querySelector('[data-bill-keyword]');
                    if (next) {
                        next.focus();
                        next.setSelectionRange(next.value.length, next.value.length);
                    }
                });
            }

            var filterToggle = panel.querySelector('[data-bill-filter-toggle]');
            if (filterToggle) filterToggle.addEventListener('click', function () { state.filterOpen = !state.filterOpen; render(); });

            bindSelect('[data-bill-business]', 'businessType');
            bindSelect('[data-bill-pay-mode]', 'payMode');
            bindSelect('[data-bill-status]', 'status');

            var date = panel.querySelector('[data-bill-date]');
            if (date) date.addEventListener('change', function () { state.createdDate = this.value; state.page = 1; render(); });

            var reset = panel.querySelector('[data-bill-reset]');
            if (reset) {
                reset.addEventListener('click', function () {
                    state.businessType = '全部业务类型';
                    state.payMode = '全部付费方式';
                    state.status = '全部账单状态';
                    state.createdDate = '';
                    state.page = 1;
                    render();
                });
            }

            var exportButton = panel.querySelector('[data-bill-export]');
            if (exportButton) exportButton.addEventListener('click', function () { showToast('账单导出任务已创建。'); });

            panel.querySelectorAll('[data-bill-order-link]').forEach(function (button) {
                button.addEventListener('click', function () {
                    showToast('订单详情：已触发订单 ' + button.dataset.billOrderLink);
                });
            });

            panel.querySelectorAll('[data-bill-page]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.disabled) return;
                    var target = this.dataset.billPage;
                    if (target === 'prev') state.page -= 1;
                    else if (target === 'next') state.page += 1;
                    else state.page = parseInt(target, 10) || 1;
                    render();
                });
            });

            var pageSize = panel.querySelector('[data-bill-page-size]');
            if (pageSize) pageSize.addEventListener('change', function () { state.pageSize = parseInt(this.value, 10) || 10; state.page = 1; render(); });

            var jump = panel.querySelector('[data-bill-page-jump]');
            if (jump) {
                jump.addEventListener('keydown', function (event) {
                    if (event.key !== 'Enter') return;
                    var totalPages = Math.max(1, Math.ceil(getFilteredRecords().length / state.pageSize));
                    state.page = Math.max(1, Math.min(totalPages, parseInt(this.value, 10) || 1));
                    render();
                });
            }

            panel.querySelectorAll('[data-bill-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var item = BILL_RECORDS.find(function (record) { return record.billNo === button.dataset.billNo; });
                    if (!item) return;
                    if (button.dataset.billAction === '去支付') {
                        openCheckout(item);
                        return;
                    }
                    if (button.dataset.billAction === '账单详情') {
                        openBillDetail(item);
                        return;
                    }
                    showToast(button.dataset.billAction + '：已触发账单 ' + item.billNo);
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
        document.addEventListener('DOMContentLoaded', initTransactionBills);
    } else {
        initTransactionBills();
    }
})();
