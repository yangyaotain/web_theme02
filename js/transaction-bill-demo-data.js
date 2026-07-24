(function () {
    var CURRENT_SUPPLIER_NAME = '深圳市龙岗数智科技有限公司';

    function createPayment(paymentNo, amount, paidAt, split) {
        return {
            paymentNo: paymentNo,
            amount: amount,
            channel: '统一支付平台',
            paidAt: paidAt,
            status: '支付成功',
            split: split || null
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

    var PLATFORM_BILLS = [
        { billNo: '2026072310111807600000101149465', orderNo: '2026071714092607600000101149465', target: '数据资产融资可行性评估服务', businessType: '服务交易', targetType: '企业数据资产融资咨询服务', buyer: '深圳市龙岗科创金融服务有限公司', seller: CURRENT_SUPPLIER_NAME, payMode: '分期付款', measureMode: '按服务次数计费', price: '6000元/次', quantity: '1次', amount: '1,800', createdAt: '2026-07-23 10:11:18', period: '首期款（第1/3期）', repaymentAt: '--', paidAt: '--', status: '待支付（首次）', showUsage: false, serviceFeeMode: 'P', serviceFeeValue: 3 },
        { billNo: '2026072213374207500000101149593', orderNo: '2026070613102407500000101149593', target: '数据治理成熟度阶段评估服务', businessType: '服务交易', targetType: '企业数据治理与合规咨询服务', buyer: '龙岗区数据应用创新中心', seller: CURRENT_SUPPLIER_NAME, payMode: '分期付款', measureMode: '按服务次数计费', price: '12000元/次', quantity: '1次', amount: '4,800', createdAt: '2026-07-22 13:37:42', period: '阶段款（第2/3期）', repaymentAt: '--', paidAt: '--', status: '待支付（阶段）', showUsage: false, serviceFeeMode: 'P', serviceFeeValue: 3 },
        { billNo: '2026072210521604200000101149064', orderNo: '2026071613195704200000101149064', target: '企业信用风险监测数据集', businessType: '产品交易', targetType: '数据集', buyer: '深圳市龙岗产业投资服务有限公司', seller: CURRENT_SUPPLIER_NAME, payMode: '一次性付款', measureMode: '按次数', price: '100元/次', quantity: '5次', amount: '500', createdAt: '2026-07-22 10:52:16', period: '一次性付款', repaymentAt: '--', paidAt: '--', status: '待支付', showUsage: true, serviceFeeMode: 'P', serviceFeeValue: 3 },
        { billNo: '2026072210311907500000101149609', orderNo: '2026070510294107500000101149609', target: '公共数据授权运营咨询服务', businessType: '服务交易', targetType: '数据交易合规评估服务', buyer: '龙岗数智产业研究院有限公司', seller: CURRENT_SUPPLIER_NAME, payMode: '分期付款', measureMode: '按服务次数计费', price: '20000元/次', quantity: '1次', amount: '6,000', createdAt: '2026-07-22 10:31:19', period: '尾款（第3/3期）', repaymentAt: '--', paidAt: '--', status: '待支付（最后）', showUsage: false, serviceFeeMode: 'P', serviceFeeValue: 3 },
        { billNo: '2026072116221408300000101149712', orderNo: '2026072115364208300000101149712', target: '重点产业链企业运行分析数据产品', businessType: '产品交易', targetType: '数据产品', buyer: '深圳市龙岗产业发展集团有限公司', seller: '深圳市龙岗区数据要素交易服务有限公司', payMode: '一次性付款', measureMode: '按份数', price: '800元/份', quantity: '1份', amount: '800', createdAt: '2026-07-21 16:22:14', period: '一次性付款', repaymentAt: '--', paidAt: '2026-07-21 16:25:03', status: '已结清', showUsage: true, serviceFeeMode: 'P', serviceFeeValue: 3 },
        { billNo: '2026072015413606800000101149728', orderNo: '2026072015081706800000101149728', target: '园区企业能耗趋势监测数据集', businessType: '产品交易', targetType: '数据集', buyer: '龙岗区重点项目服务中心', seller: '深圳市智碳数据服务有限公司', payMode: '后付费', measureMode: '按周期', price: '20元/天', quantity: '30天', amount: '600', createdAt: '2026-07-20 15:41:36', period: '2026-07-01 至 2026-07-30', repaymentAt: '2026-07-31 23:59:59', paidAt: '--', status: '待需方确认', showUsage: true, serviceFeeMode: 'G', serviceFeeValue: 20 },
        { billNo: '2026071817562403400000101149744', orderNo: '2026071817230903400000101149744', target: '低空经济企业经营画像数据产品', businessType: '产品交易', targetType: '数据产品', buyer: '龙岗区产业发展研究中心', seller: '龙岗数科产业运营有限公司', payMode: '一次性付款', measureMode: '按份数', price: '1200元/份', quantity: '1份', amount: '1,200', createdAt: '2026-07-18 17:56:24', period: '一次性付款', repaymentAt: '--', paidAt: '--', status: '待支付确认', showUsage: true, serviceFeeMode: 'P', serviceFeeValue: 2.5 },
        { billNo: '2026071214290605700000101149113', orderNo: '2026071214075305700000101149113', target: '公共信用评价数据产品', businessType: '产品交易', targetType: '数据产品', buyer: '深圳市数治咨询服务有限公司', seller: CURRENT_SUPPLIER_NAME, payMode: '一次性付款', measureMode: '按份数', price: '500元/份', quantity: '1份', amount: '500', createdAt: '2026-07-12 14:09:06', period: '一次性付款', repaymentAt: '--', paidAt: '2026-07-12 14:12:18', status: '已结清', showUsage: true, serviceFeeMode: 'P', serviceFeeValue: 3 },
        { billNo: '2026071011301806400000101149545', orderNo: '2026071011182506400000101149545', target: '行业数据空间建设咨询服务', businessType: '服务交易', targetType: '行业数据空间建设咨询服务', buyer: '龙岗区产业发展研究中心', seller: CURRENT_SUPPLIER_NAME, payMode: '分期付款', measureMode: '按服务次数计费', price: '12000元/次', quantity: '1次', amount: '3,600', createdAt: '2026-07-10 11:30:18', period: '尾款（第3/3期）', repaymentAt: '--', paidAt: '2026-07-10 11:31:06', status: '已结清', showUsage: false, serviceFeeMode: 'P', serviceFeeValue: 3 },
        { billNo: '2026072016382203300000101149129', orderNo: '2026071016243803300000101149129', target: '重点项目运行监测数据产品', businessType: '产品交易', targetType: '数据产品', buyer: '龙岗区重点项目服务中心', seller: CURRENT_SUPPLIER_NAME, payMode: '一次性付款', measureMode: '按周期', price: '300元/月', quantity: '2月', amount: '600', createdAt: '2026-07-10 16:26:22', period: '一次性付款', repaymentAt: '--', paidAt: '2026-07-10 16:29:11', status: '已结清', showUsage: true, serviceFeeMode: 'P', serviceFeeValue: 3 },
        { billNo: '2026071817264102700000101149145', orderNo: '2026070817135202700000101149145', target: '产业招商线索分析数据集', businessType: '产品交易', targetType: '数据集', buyer: '深圳市龙岗招商服务有限公司', seller: CURRENT_SUPPLIER_NAME, payMode: '一次性付款', measureMode: '按份数', price: '1000元/份', quantity: '1份', amount: '1,000', createdAt: '2026-07-08 17:15:41', period: '一次性付款', repaymentAt: '--', paidAt: '2026-07-08 17:16:21', status: '已结清', showUsage: true, serviceFeeMode: 'P', serviceFeeValue: 3 },
        { billNo: '2026071715131905100000101149161', orderNo: '2026070715011305100000101149161', target: '园区企业经营趋势分析报告', businessType: '产品交易', targetType: '数据产品', buyer: '龙岗数智产业研究院有限公司', seller: CURRENT_SUPPLIER_NAME, payMode: '一次性付款', measureMode: '按份数', price: '600元/份', quantity: '1份', amount: '600', createdAt: '2026-07-07 15:03:19', period: '一次性付款', repaymentAt: '--', paidAt: '2026-07-07 15:04:08', status: '已结清', showUsage: true, serviceFeeMode: 'P', serviceFeeValue: 3 },
        { billNo: '2026071419522401500000101149209', orderNo: '2026070419400401500000101149209', target: '企业诉求热点分析数据集', businessType: '产品交易', targetType: '数据集', buyer: '深圳市政务服务数据中心', seller: CURRENT_SUPPLIER_NAME, payMode: '一次性付款', measureMode: '按次数', price: '80元/次', quantity: '2次', amount: '160', createdAt: '2026-07-04 19:42:24', period: '一次性付款', repaymentAt: '--', paidAt: '--', status: '待支付', showUsage: true, serviceFeeMode: 'P', serviceFeeValue: 3 }
    ];

    function padNumber(value) {
        return String(value).padStart(2, '0');
    }

    function formatInteger(value) {
        return Number(value || 0).toLocaleString('en-US', { maximumFractionDigits: 0 });
    }

    function createOperationHistoryBills(currentBills) {
        var daysWithBills = {};
        var result = [];
        var targets = [
            { name: '企业经营画像分析数据产品', businessType: '产品交易', targetType: '数据产品', measureMode: '按份数', unit: '份' },
            { name: '重点产业链运行监测数据集', businessType: '产品交易', targetType: '数据集', measureMode: '按周期', unit: '月' },
            { name: '公共数据合规流通咨询服务', businessType: '服务交易', targetType: '数据交易合规评估服务', measureMode: '按服务次数计费', unit: '次' },
            { name: '园区企业能耗趋势数据集', businessType: '产品交易', targetType: '数据集', measureMode: '按次数', unit: '次' },
            { name: '行业数据空间建设咨询服务', businessType: '服务交易', targetType: '行业数据空间建设咨询服务', measureMode: '按服务次数计费', unit: '次' },
            { name: '企业信用风险监测数据产品', businessType: '产品交易', targetType: '数据产品', measureMode: '按份数', unit: '份' }
        ];
        var buyers = [
            '深圳市龙岗产业发展集团有限公司',
            '龙岗区产业发展研究中心',
            '深圳市龙岗科创金融服务有限公司',
            '龙岗数智产业研究院有限公司',
            '龙岗区重点项目服务中心',
            '深圳市龙岗招商服务有限公司'
        ];
        var sellers = [
            '深圳市智碳数据服务有限公司',
            '龙岗数科产业运营有限公司',
            '深圳市龙岗区政务数据运营有限公司',
            '深圳市星途数据科技有限公司',
            '深圳市龙岗区数据要素交易服务有限公司'
        ];
        var statusOptions = ['已结清', '已结清', '已结清', '待支付', '待支付确认', '待供方确认', '待需方确认'];
        var cursor = new Date(2024, 0, 1, 0, 0, 0);
        var dailyCoverageStart = new Date(2025, 7, 1, 0, 0, 0);
        var end = new Date(2026, 6, 24, 0, 0, 0);
        var sequence = 1;
        var requiredBusinessTypes = ['产品交易', '服务交易'];

        currentBills.forEach(function (bill) {
            var dateText = String(bill.createdAt || '').slice(0, 10);
            if (!daysWithBills[dateText]) daysWithBills[dateText] = {};
            daysWithBills[dateText][bill.businessType] = true;
        });

        while (cursor <= end) {
            var year = cursor.getFullYear();
            var month = cursor.getMonth() + 1;
            var day = cursor.getDate();
            var dateText = year + '-' + padNumber(month) + '-' + padNumber(day);

            if (cursor >= dailyCoverageStart || day === 5 || day === 15 || day === 25) {
                requiredBusinessTypes.forEach(function (businessType) {
                    var existingTypes = daysWithBills[dateText] || {};
                    if (existingTypes[businessType]) return;
                    var matchingTargets = targets.filter(function (targetItem) {
                        return targetItem.businessType === businessType;
                    });
                    var target = matchingTargets[(sequence - 1) % matchingTargets.length];
                    var buyer = buyers[(sequence * 3 + month) % buyers.length];
                    var seller = sellers[(sequence * 5 + day) % sellers.length];
                    var hour = 9 + (sequence * 7) % 10;
                    var minute = (sequence * 13) % 60;
                    var second = (sequence * 17) % 60;
                    var timeText = padNumber(hour) + ':' + padNumber(minute) + ':' + padNumber(second);
                    var amountValue = 480 + ((sequence * 317 + month * 89 + day * 41) % 7200);
                    var status = statusOptions[(sequence + day) % statusOptions.length];
                    var isSettled = status === '已结清';
                    var dateDigits = String(year) + padNumber(month) + padNumber(day);
                    var timeDigits = padNumber(hour) + padNumber(minute) + padNumber(second);
                    var serial = String(sequence).padStart(5, '0');
                    var quantity = target.businessType === '产品交易' ? 1 + sequence % 5 : 1;
                    var unitPrice = Math.max(80, Math.round(amountValue / quantity));
                    var selfOperated = sequence % 6 === 0;

                    result.push({
                        billNo: dateDigits + timeDigits + '0000010114' + serial,
                        orderNo: dateDigits + timeDigits + '0000010113' + serial,
                        target: target.name,
                        businessType: target.businessType,
                        targetType: target.targetType,
                        buyer: buyer,
                        seller: selfOperated ? '深圳市龙岗区数据要素交易服务有限公司' : seller,
                        providerMerchantId: selfOperated ? 'MER-PLATFORM-202607-0001' : 'MER-HISTORY-' + serial,
                        payMode: sequence % 4 === 0 ? '后付费' : '预付费',
                        measureMode: target.measureMode,
                        price: formatInteger(unitPrice) + '元/' + target.unit,
                        quantity: quantity + target.unit,
                        amount: formatInteger(amountValue),
                        createdAt: dateText + ' ' + timeText,
                        period: target.businessType === '服务交易' && sequence % 3 === 0 ? '阶段款（第2/3期）' : '一次性付款',
                        repaymentAt: status === '待支付' ? dateText + ' 23:59:59' : '--',
                        paidAt: isSettled ? dateText + ' ' + padNumber(Math.min(hour + 1, 23)) + ':' + padNumber((minute + 8) % 60) + ':' + padNumber((second + 11) % 60) : '--',
                        status: status,
                        showUsage: target.businessType === '产品交易',
                        serviceFeeMode: sequence % 5 === 0 ? 'G' : 'P',
                        serviceFeeValue: sequence % 5 === 0 ? 20 : 3,
                        space: '流通利用平台',
                        historicalDemo: true
                    });
                    sequence += 1;
                });
            }

            cursor.setDate(cursor.getDate() + 1);
        }

        return result;
    }

    var OPERATION_HISTORY_BILLS = createOperationHistoryBills(PLATFORM_BILLS);

    PLATFORM_BILLS.forEach(function (bill) {
        var plan = PAYMENT_PLANS[bill.orderNo];
        bill.space = '流通利用平台';
        if (!plan) return;
        bill.orderAmount = plan.orderAmount;
        bill.paymentStages = plan.stages;
    });

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function getPlatformBills() {
        return clone(PLATFORM_BILLS.concat(OPERATION_HISTORY_BILLS)).sort(function (left, right) {
            return String(right.createdAt).localeCompare(String(left.createdAt));
        });
    }

    function getSupplierReceivables(supplierName) {
        return clone(PLATFORM_BILLS).filter(function (bill) {
            return bill.seller === supplierName;
        }).sort(function (left, right) {
            return String(right.createdAt).localeCompare(String(left.createdAt));
        }).map(function (bill) {
            bill.counterparty = bill.buyer;
            return bill;
        });
    }

    window.TransactionBillDemoData = {
        currentSupplierName: CURRENT_SUPPLIER_NAME,
        getPlatformBills: getPlatformBills,
        getSupplierReceivables: getSupplierReceivables
    };
})();
