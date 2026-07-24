(function () {
    'use strict';

    var root = document.querySelector('[data-fee-report]');
    if (!root) return;

    var REFERENCE_DATE = new Date(2026, 6, 24, 10, 0, 0);
    var BUSINESS_OPTIONS = {
        all: { label: '全部业务类型', factor: 1, feeRate: 0.028 },
        resource: { label: '数据资源订单', factor: 0.18, feeRate: 0.03 },
        product: { label: '数据产品订单', factor: 0.42, feeRate: 0.028 },
        consulting: { label: '数据咨询服务订单', factor: 0.25, feeRate: 0.026 },
        solution: { label: '行业解决方案订单', factor: 0.15, feeRate: 0.025 }
    };
    var OPERATION_OPTIONS = {
        all: { label: '全部运营类型', factor: 1 },
        self: { label: '自营', factor: 0.28 },
        third: { label: '第三方供方', factor: 0.72 }
    };
    var REPORT_PERIODS = {
        month: [
            { value: '2026-07', label: '2026年7月' },
            { value: '2026-06', label: '2026年6月' },
            { value: '2026-05', label: '2026年5月' },
            { value: '2026-04', label: '2026年4月' },
            { value: '2026-03', label: '2026年3月' },
            { value: '2026-02', label: '2026年2月' },
            { value: '2026-01', label: '2026年1月' },
            { value: '2025-12', label: '2025年12月' },
            { value: '2025-11', label: '2025年11月' },
            { value: '2025-10', label: '2025年10月' },
            { value: '2025-09', label: '2025年9月' },
            { value: '2025-08', label: '2025年8月' }
        ],
        year: [
            { value: '2026', label: '2026年' },
            { value: '2025', label: '2025年' },
            { value: '2024', label: '2024年' }
        ]
    };
    var RANKING_DATA = {
        provider: [
            '深圳市龙岗数智科技有限公司',
            '深圳市智碳数据服务有限公司',
            '龙岗数科产业运营有限公司',
            '深圳市龙岗区政务数据运营有限公司',
            '深圳市星途数据科技有限公司'
        ],
        buyer: [
            '深圳市龙岗产业发展集团有限公司',
            '龙岗区产业发展研究中心',
            '深圳市龙岗科创金融服务有限公司',
            '龙岗数智产业研究院有限公司',
            '龙岗区重点项目服务中心'
        ],
        target: [
            '公共数据授权运营咨询服务',
            '行业数据空间建设咨询服务',
            '数据治理成熟度阶段评估服务',
            '重点产业链企业运行分析数据产品',
            '企业信用风险监测数据集'
        ]
    };
    var RANKING_SHARES = [0.29, 0.235, 0.19, 0.155, 0.13];
    var BUSINESS_STRUCTURE = [
        { key: 'resource', label: '数据资源订单', ratio: 0.18, color: '#20A565' },
        { key: 'product', label: '数据产品订单', ratio: 0.42, color: '#409EFF' },
        { key: 'consulting', label: '数据咨询服务订单', ratio: 0.25, color: '#F7AF1D' },
        { key: 'solution', label: '行业解决方案订单', ratio: 0.15, color: '#3AAFA3' }
    ];
    var STATUS_META = [
        { key: 'settled', label: '已结清', color: '#20A565' },
        { key: 'waiting', label: '待支付', color: '#F7AF1D' },
        { key: 'payConfirm', label: '待支付确认', color: '#409EFF' },
        { key: 'sellerConfirm', label: '待供方确认', color: '#3AAFA3' },
        { key: 'buyerConfirm', label: '待需方确认', color: '#909399' }
    ];
    var ICONS = {
        amount: '<svg viewBox="0 0 24 24"><path d="M12 3v18M17 7.5c0-1.4-2.2-2.5-5-2.5S7 6.1 7 7.5 9.2 10 12 10s5 1.1 5 2.5S14.8 15 12 15s-5-1.1-5-2.5"/></svg>',
        paid: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/></svg>',
        fee: '<svg viewBox="0 0 24 24"><path d="M4 7h16M7 3v4M17 3v4M6 11h4v4H6zM14 11h4M14 15h4M6 19h12"/></svg>',
        supplier: '<svg viewBox="0 0 24 24"><path d="M3 10h18M5 10v9h14v-9M4 10l2-6h12l2 6M9 14h6v5"/></svg>',
        bill: '<svg viewBox="0 0 24 24"><path d="M6 2h12v20l-3-2-3 2-3-2-3 2zM9 7h6M9 11h6M9 15h4"/></svg>',
        rate: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></svg>',
        view: '<svg viewBox="0 0 24 24"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/></svg>'
    };

    var state = {
        reportType: 'month',
        period: REPORT_PERIODS.month[0].value,
        business: 'all',
        operation: 'all',
        ranking: 'provider',
        page: 1,
        pageSize: 10,
        model: null
    };
    var trendChart = null;
    var structureChart = null;

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function roundMoney(value) {
        return Math.round(value * 100) / 100;
    }

    function formatNumber(value, digits) {
        return Number(value || 0).toLocaleString('zh-CN', {
            minimumFractionDigits: digits == null ? 2 : digits,
            maximumFractionDigits: digits == null ? 2 : digits
        });
    }

    function formatWan(value) {
        return formatNumber(Number(value || 0) / 10000, 2);
    }

    function formatDateTime(date) {
        function pad(value) {
            return String(value).padStart(2, '0');
        }
        return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate())
            + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
    }

    function daysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    function getMonthEndDay(year, month) {
        if (year === REFERENCE_DATE.getFullYear() && month === REFERENCE_DATE.getMonth() + 1) {
            return REFERENCE_DATE.getDate();
        }
        return daysInMonth(year, month);
    }

    function applyScope(base) {
        var business = BUSINESS_OPTIONS[state.business];
        var operation = OPERATION_OPTIONS[state.operation];
        var moneyFactor = business.factor * operation.factor;
        var billFactor = state.business === 'all' ? 1 : Math.max(0.22, business.factor * 1.7);
        if (state.operation !== 'all') billFactor *= Math.max(0.45, operation.factor * 1.25);

        var gross = roundMoney(base.gross * moneyFactor);
        var paid = roundMoney(base.paid * moneyFactor);
        var bills = Math.max(1, Math.round(base.bills * billFactor));
        var orders = Math.max(1, Math.min(bills, Math.round(base.orders * billFactor)));
        var settled = Math.min(bills, Math.max(0, Math.round(bills * base.settledRate)));
        var thirdPaid = state.operation === 'self'
            ? 0
            : state.operation === 'third'
                ? paid
                : paid * 0.72;
        var platformFee = roundMoney(thirdPaid * business.feeRate);
        var supplierNet = roundMoney(Math.max(0, thirdPaid - platformFee));

        return {
            label: base.label,
            shortLabel: base.shortLabel,
            queryPeriod: base.queryPeriod,
            gross: gross,
            paid: paid,
            platformFee: platformFee,
            supplierNet: supplierNet,
            pending: roundMoney(Math.max(0, gross - paid)),
            bills: bills,
            orders: orders,
            settled: settled,
            settledRate: bills ? settled / bills : 0
        };
    }

    function generateMonthlyRows(period) {
        var parts = period.split('-');
        var year = Number(parts[0]);
        var month = Number(parts[1]);
        var endDay = getMonthEndDay(year, month);
        var monthScale = 0.82 + ((year - 2024) * 0.08) + month * 0.027;
        var rows = [];

        for (var day = 1; day <= endDay; day += 1) {
            var weekday = new Date(year, month - 1, day).getDay();
            var weekdayFactor = weekday === 0 || weekday === 6 ? 0.72 : 1;
            var wave = 1 + (((day * 13 + month * 7) % 17) - 8) / 50;
            var gross = (11800 + ((day * 739 + month * 311) % 7200)) * monthScale * weekdayFactor * wave;
            if (day === 8 || day === 18 || day === 23) gross *= 1.34;
            var paidRate = clamp(0.69 + ((day * 7 + month) % 19) / 100, 0.68, 0.9);
            var bills = Math.max(3, Math.round((4 + ((day * 5 + month) % 8)) * weekdayFactor));
            var label = year + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');

            rows.push(applyScope({
                label: label,
                shortLabel: String(day) + '日',
                queryPeriod: label,
                gross: gross,
                paid: gross * paidRate,
                bills: bills,
                orders: Math.max(2, bills - 1 - (day % 4 === 0 ? 1 : 0)),
                settledRate: paidRate
            }));
        }

        return rows;
    }

    function generateAnnualRows(period) {
        var year = Number(period);
        var endMonth = year === REFERENCE_DATE.getFullYear() ? REFERENCE_DATE.getMonth() + 1 : 12;
        var yearScale = 0.88 + (year - 2024) * 0.08;
        var rows = [];

        for (var month = 1; month <= endMonth; month += 1) {
            var seasonal = 0.91 + month * 0.024 + (month % 3 === 0 ? 0.09 : 0);
            var gross = (265000 + month * 17600 + ((month * 19831) % 58000)) * yearScale * seasonal;
            var paidRate = clamp(0.73 + ((month * 11 + year) % 16) / 100, 0.72, 0.91);
            var bills = 63 + month * 4 + ((month * 7) % 19);

            rows.push(applyScope({
                label: year + '年' + month + '月',
                shortLabel: month + '月',
                queryPeriod: year + '-' + String(month).padStart(2, '0'),
                gross: gross,
                paid: gross * paidRate,
                bills: bills,
                orders: Math.round(bills * 0.86),
                settledRate: paidRate
            }));
        }

        return rows;
    }

    function sumRows(rows, key) {
        return rows.reduce(function (sum, row) {
            return sum + Number(row[key] || 0);
        }, 0);
    }

    function buildStatusSummary(totalBills, settledBills, totalGross) {
        var settled = Math.min(totalBills, settledBills);
        var open = Math.max(0, totalBills - settled);
        var waiting = Math.round(open * 0.43);
        var payConfirm = Math.round(open * 0.24);
        var sellerConfirm = Math.round(open * 0.17);
        var buyerConfirm = Math.max(0, open - waiting - payConfirm - sellerConfirm);
        var counts = {
            settled: settled,
            waiting: waiting,
            payConfirm: payConfirm,
            sellerConfirm: sellerConfirm,
            buyerConfirm: buyerConfirm
        };

        return STATUS_META.map(function (item) {
            var count = counts[item.key];
            return {
                key: item.key,
                label: item.label,
                color: item.color,
                count: count,
                amount: totalBills ? totalGross * count / totalBills : 0
            };
        });
    }

    function buildBusinessStructure(totalGross) {
        if (state.business !== 'all') {
            var selected = BUSINESS_STRUCTURE.find(function (item) {
                return item.key === state.business;
            });
            return [{
                key: selected.key,
                label: selected.label,
                value: totalGross,
                color: selected.color
            }];
        }

        return BUSINESS_STRUCTURE.map(function (item) {
            return {
                key: item.key,
                label: item.label,
                value: totalGross * item.ratio,
                color: item.color
            };
        });
    }

    function buildRanking(totalGross) {
        var rankingBase = state.ranking === 'provider'
            ? totalGross * (state.operation === 'self' ? 0 : state.operation === 'third' ? 1 : 0.72)
            : totalGross;
        return RANKING_DATA[state.ranking].map(function (name, index) {
            return {
                name: name,
                value: rankingBase * RANKING_SHARES[index]
            };
        });
    }

    function buildModel() {
        var rows = state.reportType === 'month'
            ? generateMonthlyRows(state.period)
            : generateAnnualRows(state.period);
        var totalGross = sumRows(rows, 'gross');
        var totalPaid = sumRows(rows, 'paid');
        var totalFee = sumRows(rows, 'platformFee');
        var supplierNet = sumRows(rows, 'supplierNet');
        var totalBills = Math.round(sumRows(rows, 'bills'));
        var totalOrders = Math.round(sumRows(rows, 'orders'));
        var settledBills = Math.round(sumRows(rows, 'settled'));
        var settlementRate = totalBills ? settledBills / totalBills : 0;
        var compareValues = state.reportType === 'month'
            ? [8.6, 7.9, 9.2, 8.8, 4.3, 2.6]
            : [12.4, 11.8, 13.2, 12.9, 9.6, 1.4];

        return {
            rows: rows,
            totalGross: totalGross,
            totalPaid: totalPaid,
            totalFee: totalFee,
            supplierNet: supplierNet,
            totalBills: totalBills,
            totalOrders: totalOrders,
            settledBills: settledBills,
            settlementRate: settlementRate,
            pending: Math.max(0, totalGross - totalPaid),
            compareValues: compareValues,
            statuses: buildStatusSummary(totalBills, settledBills, totalGross),
            businessStructure: buildBusinessStructure(totalGross),
            ranking: buildRanking(totalGross)
        };
    }

    function getPeriodOption() {
        return REPORT_PERIODS[state.reportType].find(function (item) {
            return item.value === state.period;
        }) || REPORT_PERIODS[state.reportType][0];
    }

    function getReportCaption() {
        if (state.reportType === 'month') {
            var parts = state.period.split('-');
            var year = Number(parts[0]);
            var month = Number(parts[1]);
            var endDay = getMonthEndDay(year, month);
            return '统计周期：' + state.period + '-01 至 ' + state.period + '-' + String(endDay).padStart(2, '0');
        }

        var endText = state.period === String(REFERENCE_DATE.getFullYear())
            ? state.period + '-07-24'
            : state.period + '-12-31';
        return '统计周期：' + state.period + '-01-01 至 ' + endText;
    }

    function renderReportHeading() {
        var period = getPeriodOption();
        root.querySelector('[data-report-title]').textContent = period.label
            + '交易费用' + (state.reportType === 'month' ? '月报' : '年报');
        root.querySelector('[data-report-caption]').textContent = getReportCaption()
            + '｜' + BUSINESS_OPTIONS[state.business].label
            + '｜' + OPERATION_OPTIONS[state.operation].label;
        root.querySelector('[data-report-updated]').textContent = '数据更新时间：' + formatDateTime(REFERENCE_DATE);
        root.querySelector('[data-trend-desc]').textContent = state.reportType === 'month'
            ? '按日展示交易额、实付金额与平台服务费'
            : '按月展示交易额、实付金额与平台服务费';
        root.querySelector('[data-detail-title]').textContent = state.reportType === 'month' ? '每日费用汇总' : '每月费用汇总';
        root.querySelector('[data-detail-desc]').textContent = state.reportType === 'month'
            ? '按日汇总当月交易、支付和平台服务费情况'
            : '按月汇总全年交易、支付和平台服务费情况';
        root.querySelector('[data-period-column]').textContent = state.reportType === 'month' ? '日期' : '月份';
    }

    function renderKpis(model) {
        var compareLabel = state.reportType === 'month' ? '较上月' : '较上年';
        var items = [
            { label: '交易总额', value: formatWan(model.totalGross), unit: '万元', compare: model.compareValues[0], icon: 'amount', tone: '' },
            { label: '实付金额', value: formatWan(model.totalPaid), unit: '万元', compare: model.compareValues[1], icon: 'paid', tone: 'blue' },
            { label: '平台服务费', value: formatWan(model.totalFee), unit: '万元', compare: model.compareValues[2], icon: 'fee', tone: 'orange' },
            { label: '供方实收', value: formatWan(model.supplierNet), unit: '万元', compare: model.compareValues[3], icon: 'supplier', tone: '' },
            { label: '账单数量', value: formatNumber(model.totalBills, 0), unit: '笔', compare: model.compareValues[4], icon: 'bill', tone: 'blue' },
            { label: '账单结清率', value: formatNumber(model.settlementRate * 100, 1), unit: '%', compare: model.compareValues[5], icon: 'rate', tone: model.settlementRate < 0.75 ? 'red' : '' }
        ];

        root.querySelector('[data-kpi-grid]').innerHTML = items.map(function (item) {
            var direction = item.compare >= 0 ? '↑' : '↓';
            return '<article class="fee-report-kpi ' + item.tone + '">'
                + '<div class="fee-report-kpi-head"><span class="fee-report-kpi-label">' + item.label + '</span>'
                + '<span class="fee-report-kpi-icon">' + ICONS[item.icon] + '</span></div>'
                + '<div class="fee-report-kpi-value">' + item.value + '<small>' + item.unit + '</small></div>'
                + '<div class="fee-report-kpi-compare"><span>' + compareLabel + '</span><strong class="' + (item.compare < 0 ? 'down' : '') + '">'
                + direction + Math.abs(item.compare).toFixed(1) + '%</strong></div>'
                + '</article>';
        }).join('');
    }

    function showChartFallback(selector, message) {
        var fallback = root.querySelector(selector);
        if (!fallback) return;
        fallback.textContent = message || '图表组件加载失败';
        fallback.classList.remove('hidden');
    }

    function renderTrendChart(model) {
        var fallback = root.querySelector('[data-trend-fallback]');
        if (typeof window.Chart === 'undefined') {
            showChartFallback('[data-trend-fallback]', '图表组件未加载，请检查网络连接');
            return;
        }
        fallback.classList.add('hidden');
        if (trendChart) trendChart.destroy();

        trendChart = new window.Chart(root.querySelector('[data-trend-chart]').getContext('2d'), {
            type: 'bar',
            data: {
                labels: model.rows.map(function (row) { return row.shortLabel; }),
                datasets: [
                    {
                        type: 'bar',
                        label: '交易金额',
                        data: model.rows.map(function (row) { return roundMoney(row.gross / 10000); }),
                        backgroundColor: 'rgba(32, 165, 101, 0.68)',
                        borderColor: '#20A565',
                        borderWidth: 1,
                        borderRadius: 3,
                        maxBarThickness: 18,
                        yAxisID: 'yMoney',
                        order: 2
                    },
                    {
                        type: 'bar',
                        label: '实付金额',
                        data: model.rows.map(function (row) { return roundMoney(row.paid / 10000); }),
                        backgroundColor: 'rgba(64, 158, 255, 0.58)',
                        borderColor: '#409EFF',
                        borderWidth: 1,
                        borderRadius: 3,
                        maxBarThickness: 18,
                        yAxisID: 'yMoney',
                        order: 3
                    },
                    {
                        type: 'line',
                        label: '平台服务费',
                        data: model.rows.map(function (row) { return roundMoney(row.platformFee / 10000); }),
                        borderColor: '#D99100',
                        backgroundColor: '#F7AF1D',
                        borderWidth: 2,
                        pointRadius: state.reportType === 'month' ? 1.8 : 3,
                        pointHoverRadius: 5,
                        pointBackgroundColor: '#F7AF1D',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 1,
                        tension: 0.28,
                        yAxisID: 'yFee',
                        order: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#606266',
                            usePointStyle: true,
                            pointStyle: 'circle',
                            boxWidth: 7,
                            boxHeight: 7,
                            padding: 18,
                            font: { size: 11 }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(31, 43, 40, 0.92)',
                        titleColor: '#fff',
                        bodyColor: '#edf5f1',
                        padding: 10,
                        callbacks: {
                            label: function (context) {
                                return context.dataset.label + '：' + formatNumber(context.raw, 2) + ' 万元';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            color: '#909399',
                            font: { size: 10 },
                            maxRotation: 0,
                            autoSkip: true,
                            maxTicksLimit: state.reportType === 'month' ? 12 : 12
                        },
                        border: { color: '#e9eceb' }
                    },
                    yMoney: {
                        position: 'left',
                        beginAtZero: true,
                        grid: { color: '#f0f2f5' },
                        ticks: {
                            color: '#909399',
                            font: { size: 10 },
                            callback: function (value) { return value + '万'; }
                        },
                        border: { display: false }
                    },
                    yFee: {
                        position: 'right',
                        beginAtZero: true,
                        grid: { drawOnChartArea: false },
                        ticks: {
                            color: '#b27c00',
                            font: { size: 10 },
                            callback: function (value) { return value + '万'; }
                        },
                        border: { display: false }
                    }
                }
            }
        });
    }

    function renderStructureChart(model) {
        var fallback = root.querySelector('[data-structure-fallback]');
        if (typeof window.Chart === 'undefined') {
            showChartFallback('[data-structure-fallback]', '图表组件未加载，请检查网络连接');
            return;
        }
        fallback.classList.add('hidden');
        if (structureChart) structureChart.destroy();

        structureChart = new window.Chart(root.querySelector('[data-structure-chart]').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: model.businessStructure.map(function (item) { return item.label; }),
                datasets: [{
                    data: model.businessStructure.map(function (item) { return roundMoney(item.value / 10000); }),
                    backgroundColor: model.businessStructure.map(function (item) { return item.color; }),
                    borderColor: '#fff',
                    borderWidth: 3,
                    hoverOffset: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '62%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#606266',
                            usePointStyle: true,
                            pointStyle: 'circle',
                            boxWidth: 7,
                            boxHeight: 7,
                            padding: 14,
                            font: { size: 11 }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(31, 43, 40, 0.92)',
                        titleColor: '#fff',
                        bodyColor: '#edf5f1',
                        padding: 10,
                        callbacks: {
                            label: function (context) {
                                var total = context.dataset.data.reduce(function (sum, value) { return sum + value; }, 0);
                                var ratio = total ? context.raw / total * 100 : 0;
                                return context.label + '：' + formatNumber(context.raw, 2) + ' 万元（' + ratio.toFixed(1) + '%）';
                            }
                        }
                    }
                }
            }
        });
    }

    function renderStatusAnalysis(model) {
        var totalBills = model.totalBills || 1;
        root.querySelector('[data-status-list]').innerHTML = model.statuses.map(function (item) {
            var ratio = item.count / totalBills * 100;
            return '<div class="fee-report-status-row" style="--status-color:' + item.color + ';--status-width:' + ratio.toFixed(1) + '%">'
                + '<span class="fee-report-status-name"><i></i>' + item.label + '</span>'
                + '<span class="fee-report-status-track"><span></span></span>'
                + '<strong class="fee-report-status-count">' + item.count + '</strong>'
                + '<span class="fee-report-status-amount">' + formatWan(item.amount) + ' 万</span>'
                + '</div>';
        }).join('');

        var selfAmount = state.operation === 'third' ? 0 : state.operation === 'self' ? model.totalGross : model.totalGross * 0.28;
        var thirdAmount = state.operation === 'self' ? 0 : state.operation === 'third' ? model.totalGross : model.totalGross * 0.72;
        var total = selfAmount + thirdAmount;
        var selfRatio = total ? selfAmount / total * 100 : 0;
        var thirdRatio = total ? thirdAmount / total * 100 : 0;

        root.querySelector('[data-operation-summary]').innerHTML = ''
            + '<div class="fee-report-operation-item"><span>自营交易</span><strong>' + formatWan(selfAmount) + ' 万元</strong>'
            + '<small>占比 ' + selfRatio.toFixed(1) + '%，不参与供方分账</small></div>'
            + '<div class="fee-report-operation-item"><span>第三方供方交易</span><strong>' + formatWan(thirdAmount) + ' 万元</strong>'
            + '<small>占比 ' + thirdRatio.toFixed(1) + '%，平台服务费 ' + formatWan(model.totalFee) + ' 万元</small></div>';
    }

    function renderRanking(model) {
        var maxValue = model.ranking.length ? model.ranking[0].value : 0;
        root.querySelector('[data-ranking-list]').innerHTML = model.ranking.map(function (item, index) {
            var width = maxValue ? item.value / maxValue * 100 : 0;
            return '<div class="fee-report-ranking-row">'
                + '<span class="fee-report-ranking-index">' + (index + 1) + '</span>'
                + '<div class="fee-report-ranking-main"><span class="fee-report-ranking-name" title="' + item.name + '">' + item.name + '</span>'
                + '<div class="fee-report-ranking-track"><span style="--rank-width:' + width.toFixed(1) + '%"></span></div></div>'
                + '<strong class="fee-report-ranking-value">' + formatWan(item.value) + ' 万</strong>'
                + '</div>';
        }).join('');
    }

    function getBillMonitorHref(row) {
        var params = new URLSearchParams();
        var businessType = '';
        if (state.business === 'resource' || state.business === 'product') businessType = '产品交易';
        if (state.business === 'consulting' || state.business === 'solution') businessType = '服务交易';
        if (businessType) params.set('businessType', businessType);

        if (state.reportType === 'month') {
            params.set('startAt', row.queryPeriod + ' 00:00:00');
            params.set('endAt', row.queryPeriod + ' 23:59:59');
        } else {
            var parts = row.queryPeriod.split('-');
            var year = Number(parts[0]);
            var month = Number(parts[1]);
            var endDay = getMonthEndDay(year, month);
            params.set('startAt', row.queryPeriod + '-01 00:00:00');
            params.set('endAt', row.queryPeriod + '-' + String(endDay).padStart(2, '0') + ' 23:59:59');
        }

        return 'operation-bill-monitor.html?' + params.toString();
    }

    function renderTable(model) {
        var pageCount = Math.max(1, Math.ceil(model.rows.length / state.pageSize));
        state.page = clamp(state.page, 1, pageCount);
        var start = (state.page - 1) * state.pageSize;
        var rows = model.rows.slice(start, start + state.pageSize);

        root.querySelector('[data-report-table-body]').innerHTML = rows.map(function (row) {
            var href = getBillMonitorHref(row);
            return '<tr>'
                + '<td class="fee-report-period-cell">' + row.label + '</td>'
                + '<td>' + row.orders + '</td>'
                + '<td>' + row.bills + '</td>'
                + '<td class="fee-report-money">' + formatNumber(row.gross, 2) + '</td>'
                + '<td class="fee-report-money">' + formatNumber(row.paid, 2) + '</td>'
                + '<td class="fee-report-fee">' + formatNumber(row.platformFee, 2) + '</td>'
                + '<td class="fee-report-money">' + formatNumber(row.supplierNet, 2) + '</td>'
                + '<td class="fee-report-money">' + formatNumber(row.pending, 2) + '</td>'
                + '<td><span class="fee-report-rate">' + formatNumber(row.settledRate * 100, 1) + '%</span></td>'
                + '<td><a class="fee-report-table-action" href="' + href + '">' + ICONS.view + '<span>查看账单</span></a></td>'
                + '</tr>';
        }).join('');

        root.querySelector('[data-table-total]').textContent = '共 ' + model.rows.length + ' 条';
        root.querySelector('[data-page-info]').textContent = '第 ' + state.page + ' / ' + pageCount + ' 页';
        root.querySelector('[data-page-prev]').disabled = state.page <= 1;
        root.querySelector('[data-page-next]').disabled = state.page >= pageCount;
    }

    function render() {
        state.model = buildModel();
        renderReportHeading();
        renderKpis(state.model);
        renderTrendChart(state.model);
        renderStructureChart(state.model);
        renderStatusAnalysis(state.model);
        renderRanking(state.model);
        renderTable(state.model);
    }

    function populatePeriodOptions() {
        var select = root.querySelector('[data-report-period]');
        select.innerHTML = REPORT_PERIODS[state.reportType].map(function (item) {
            return '<option value="' + item.value + '">' + item.label + '</option>';
        }).join('');
        select.value = state.period;
    }

    function setReportType(type) {
        if (type !== 'month' && type !== 'year') return;
        state.reportType = type;
        state.period = REPORT_PERIODS[type][0].value;
        state.page = 1;
        root.querySelectorAll('[data-report-tab]').forEach(function (tab) {
            var active = tab.getAttribute('data-report-tab') === type;
            tab.classList.toggle('active', active);
            tab.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        populatePeriodOptions();
        render();
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function getExportTitle() {
        return getPeriodOption().label + '交易费用' + (state.reportType === 'month' ? '月报' : '年报');
    }

    function getExportFileName(extension) {
        var scope = [];
        if (state.business !== 'all') scope.push(BUSINESS_OPTIONS[state.business].label);
        if (state.operation !== 'all') scope.push(OPERATION_OPTIONS[state.operation].label);
        return getExportTitle() + (scope.length ? '-' + scope.join('-') : '') + '.' + extension;
    }

    function getExportKpis(model) {
        var compareLabel = state.reportType === 'month' ? '较上月' : '较上年';
        return [
            { label: '交易总额', value: model.totalGross, display: formatWan(model.totalGross), unit: '万元', compareLabel: compareLabel, compare: model.compareValues[0] },
            { label: '实付金额', value: model.totalPaid, display: formatWan(model.totalPaid), unit: '万元', compareLabel: compareLabel, compare: model.compareValues[1] },
            { label: '平台服务费', value: model.totalFee, display: formatWan(model.totalFee), unit: '万元', compareLabel: compareLabel, compare: model.compareValues[2] },
            { label: '供方实收', value: model.supplierNet, display: formatWan(model.supplierNet), unit: '万元', compareLabel: compareLabel, compare: model.compareValues[3] },
            { label: '账单数量', value: model.totalBills, display: formatNumber(model.totalBills, 0), unit: '笔', compareLabel: compareLabel, compare: model.compareValues[4] },
            { label: '账单结清率', value: model.settlementRate, display: formatNumber(model.settlementRate * 100, 1), unit: '%', compareLabel: compareLabel, compare: model.compareValues[5] }
        ];
    }

    function getExportRankingLabel() {
        return state.ranking === 'buyer' ? '需求方' : state.ranking === 'target' ? '交易标的' : '提供方';
    }

    function setSheetCellFormat(sheet, rowIndex, columnIndex, format) {
        var address = window.XLSX.utils.encode_cell({ r: rowIndex, c: columnIndex });
        if (sheet[address]) sheet[address].z = format;
    }

    function ensureSheetCell(sheet, rowIndex, columnIndex) {
        var address = window.XLSX.utils.encode_cell({ r: rowIndex, c: columnIndex });
        if (!sheet[address]) sheet[address] = { t: 's', v: '' };
        return sheet[address];
    }

    function applyExcelTableStyle(sheet, startRow, endRow, startColumn, endColumn, options) {
        options = options || {};
        var borderColor = { rgb: 'C9D5CF' };
        var border = {
            top: { style: 'thin', color: borderColor },
            right: { style: 'thin', color: borderColor },
            bottom: { style: 'thin', color: borderColor },
            left: { style: 'thin', color: borderColor }
        };

        for (var rowIndex = startRow; rowIndex <= endRow; rowIndex += 1) {
            for (var columnIndex = startColumn; columnIndex <= endColumn; columnIndex += 1) {
                var cell = ensureSheetCell(sheet, rowIndex, columnIndex);
                var isHeader = rowIndex === startRow;
                var isStriped = options.striped && !isHeader && (rowIndex - startRow) % 2 === 0;
                var style = {
                    font: {
                        name: 'Microsoft YaHei',
                        sz: isHeader ? 11 : 10,
                        bold: isHeader,
                        color: { rgb: isHeader && options.strongHeader ? 'FFFFFF' : isHeader ? '1B6D49' : '303A35' }
                    },
                    fill: {
                        patternType: 'solid',
                        fgColor: {
                            rgb: isHeader && options.strongHeader
                                ? '208B5C'
                                : isHeader
                                    ? 'E8F4ED'
                                    : isStriped
                                        ? 'F7FAF8'
                                        : 'FFFFFF'
                        }
                    },
                    border: border,
                    alignment: {
                        vertical: 'center',
                        horizontal: options.alignAllLeft || columnIndex === startColumn ? 'left' : 'right',
                        wrapText: true
                    }
                };
                if (cell.z) style.numFmt = cell.z;
                cell.s = style;
            }
        }
    }

    function applyExcelTitleStyle(sheet, endColumn) {
        var titleBorder = {
            top: { style: 'thin', color: { rgb: '19764D' } },
            right: { style: 'thin', color: { rgb: '19764D' } },
            bottom: { style: 'thin', color: { rgb: '19764D' } },
            left: { style: 'thin', color: { rgb: '19764D' } }
        };
        for (var columnIndex = 0; columnIndex <= endColumn; columnIndex += 1) {
            var cell = ensureSheetCell(sheet, 0, columnIndex);
            cell.s = {
                font: { name: 'Microsoft YaHei', sz: 16, bold: true, color: { rgb: 'FFFFFF' } },
                fill: { patternType: 'solid', fgColor: { rgb: '19764D' } },
                border: titleBorder,
                alignment: { vertical: 'center', horizontal: 'left' }
            };
        }
    }

    function exportExcel() {
        if (!window.XLSX) {
            throw new Error('Excel 导出组件未加载，请检查网络连接后重试。');
        }

        var model = state.model;
        var kpis = getExportKpis(model);
        var summaryRows = [
            [getExportTitle()],
            [],
            ['报表信息', '内容'],
            ['报表名称', getExportTitle()],
            ['统计周期', getReportCaption().replace('统计周期：', '')],
            ['业务类型', BUSINESS_OPTIONS[state.business].label],
            ['运营类型', OPERATION_OPTIONS[state.operation].label],
            ['数据更新时间', formatDateTime(REFERENCE_DATE)],
            ['导出时间', formatDateTime(new Date())]
        ];
        var infoStartRow = 2;
        var infoEndRow = summaryRows.length - 1;

        summaryRows.push([], ['核心指标', '数值', '单位', '比较口径', '变化率']);
        var kpiStartRow = summaryRows.length - 1;
        kpis.forEach(function (item) {
            summaryRows.push([item.label, item.value, item.label === '账单结清率' ? '百分比' : item.unit === '万元' ? '元' : item.unit, item.compareLabel, item.compare / 100]);
        });
        var kpiEndRow = summaryRows.length - 1;

        summaryRows.push(
            [],
            ['业务类型金额构成', '交易金额（元）', '占比']
        );
        var structureHeaderRow = summaryRows.length - 1;
        var structureStartRow = summaryRows.length;
        model.businessStructure.forEach(function (item) {
            summaryRows.push([item.label, roundMoney(item.value), model.totalGross ? item.value / model.totalGross : 0]);
        });
        var structureEndRow = summaryRows.length - 1;

        summaryRows.push(
            [],
            ['账单状态', '账单数（笔）', '交易金额（元）', '占比']
        );
        var statusHeaderRow = summaryRows.length - 1;
        var statusStartRow = summaryRows.length;
        model.statuses.forEach(function (item) {
            summaryRows.push([item.label, item.count, roundMoney(item.amount), model.totalBills ? item.count / model.totalBills : 0]);
        });
        var statusEndRow = summaryRows.length - 1;

        summaryRows.push(
            [],
            [getExportRankingLabel() + '交易排行', '交易金额（元）', '占比']
        );
        var rankingHeaderRow = summaryRows.length - 1;
        var rankingStartRow = summaryRows.length;
        model.ranking.forEach(function (item) {
            summaryRows.push([item.name, roundMoney(item.value), model.totalGross ? item.value / model.totalGross : 0]);
        });
        var rankingEndRow = summaryRows.length - 1;

        var summarySheet = window.XLSX.utils.aoa_to_sheet(summaryRows);
        summarySheet['!merges'] = [window.XLSX.utils.decode_range('A1:E1')];
        summarySheet['!cols'] = [
            { wch: 34 },
            { wch: 30 },
            { wch: 18 },
            { wch: 18 },
            { wch: 14 }
        ];
        summarySheet['!rows'] = [];
        summarySheet['!rows'][0] = { hpt: 28 };
        [infoStartRow, kpiStartRow, structureHeaderRow, statusHeaderRow, rankingHeaderRow].forEach(function (rowIndex) {
            summarySheet['!rows'][rowIndex] = { hpt: 22 };
        });

        for (var summaryRow = kpiStartRow + 1; summaryRow <= kpiEndRow; summaryRow += 1) {
            var kpiIndex = summaryRow - kpiStartRow - 1;
            var summaryFormat = kpiIndex === 5 ? '0.0%' : kpiIndex === 4 ? '#,##0' : '#,##0.00';
            setSheetCellFormat(summarySheet, summaryRow, 1, summaryFormat);
            setSheetCellFormat(summarySheet, summaryRow, 4, '0.0%');
        }
        for (var structureRow = structureStartRow; structureRow <= structureEndRow; structureRow += 1) {
            setSheetCellFormat(summarySheet, structureRow, 1, '#,##0.00');
            setSheetCellFormat(summarySheet, structureRow, 2, '0.0%');
        }
        for (var statusRow = statusStartRow; statusRow <= statusEndRow; statusRow += 1) {
            setSheetCellFormat(summarySheet, statusRow, 1, '#,##0');
            setSheetCellFormat(summarySheet, statusRow, 2, '#,##0.00');
            setSheetCellFormat(summarySheet, statusRow, 3, '0.0%');
        }
        for (var rankingRow = rankingStartRow; rankingRow <= rankingEndRow; rankingRow += 1) {
            setSheetCellFormat(summarySheet, rankingRow, 1, '#,##0.00');
            setSheetCellFormat(summarySheet, rankingRow, 2, '0.0%');
        }
        applyExcelTitleStyle(summarySheet, 4);
        applyExcelTableStyle(summarySheet, infoStartRow, infoEndRow, 0, 1, { alignAllLeft: true });
        applyExcelTableStyle(summarySheet, kpiStartRow, kpiEndRow, 0, 4, { striped: true, strongHeader: true });
        applyExcelTableStyle(summarySheet, structureHeaderRow, structureEndRow, 0, 2, { striped: true });
        applyExcelTableStyle(summarySheet, statusHeaderRow, statusEndRow, 0, 3, { striped: true });
        applyExcelTableStyle(summarySheet, rankingHeaderRow, rankingEndRow, 0, 2, { striped: true });

        var detailHeaders = [
            state.reportType === 'month' ? '日期' : '月份',
            '订单数（笔）',
            '账单数（笔）',
            '交易金额（元）',
            '实付金额（元）',
            '平台服务费（元）',
            '供方实收（元）',
            '未结金额（元）',
            '结清率'
        ];
        var detailRows = model.rows.map(function (row) {
            return [
                row.label,
                row.orders,
                row.bills,
                roundMoney(row.gross),
                roundMoney(row.paid),
                roundMoney(row.platformFee),
                roundMoney(row.supplierNet),
                roundMoney(row.pending),
                row.settledRate
            ];
        });
        var detailSheet = window.XLSX.utils.aoa_to_sheet([detailHeaders].concat(detailRows));
        detailSheet['!cols'] = [
            { wch: 16 },
            { wch: 14 },
            { wch: 14 },
            { wch: 18 },
            { wch: 18 },
            { wch: 20 },
            { wch: 18 },
            { wch: 18 },
            { wch: 12 }
        ];
        detailSheet['!rows'] = [{ hpt: 23 }];
        detailSheet['!autofilter'] = { ref: 'A1:I' + (detailRows.length + 1) };
        detailRows.forEach(function (_, index) {
            for (var column = 3; column <= 7; column += 1) {
                setSheetCellFormat(detailSheet, index + 1, column, '#,##0.00');
            }
            setSheetCellFormat(detailSheet, index + 1, 8, '0.0%');
        });
        applyExcelTableStyle(detailSheet, 0, detailRows.length, 0, 8, { striped: true, strongHeader: true });

        var workbook = window.XLSX.utils.book_new();
        workbook.Props = {
            Title: getExportTitle(),
            Subject: '交易费用统计报表',
            Author: '龙岗数据聚合服务平台',
            CreatedDate: new Date()
        };
        window.XLSX.utils.book_append_sheet(workbook, summarySheet, '报表摘要');
        window.XLSX.utils.book_append_sheet(workbook, detailSheet, state.reportType === 'month' ? '每日费用明细' : '每月费用明细');
        window.XLSX.writeFile(workbook, getExportFileName('xlsx'), { cellStyles: true });
    }

    function buildExportTable(headers, rows, className) {
        return '<table class="' + (className || '') + '"><thead><tr>'
            + headers.map(function (header) { return '<th>' + escapeHtml(header) + '</th>'; }).join('')
            + '</tr></thead><tbody>'
            + rows.map(function (row) {
                return '<tr>' + row.map(function (cell) {
                    return '<td>' + escapeHtml(cell) + '</td>';
                }).join('') + '</tr>';
            }).join('')
            + '</tbody></table>';
    }

    function getStructureExportImage(model) {
        if (!window.Chart) return '';
        var canvas = document.createElement('canvas');
        canvas.width = 480;
        canvas.height = 480;
        var exportChart = new window.Chart(canvas.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: model.businessStructure.map(function (item) { return item.label; }),
                datasets: [{
                    data: model.businessStructure.map(function (item) { return roundMoney(item.value / 10000); }),
                    backgroundColor: model.businessStructure.map(function (item) { return item.color; }),
                    borderColor: '#fff',
                    borderWidth: 3,
                    hoverOffset: 0
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                devicePixelRatio: 1,
                animation: false,
                cutout: '62%',
                layout: { padding: { top: 8, right: 8, bottom: 4, left: 8 } },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#606266',
                            usePointStyle: true,
                            pointStyle: 'circle',
                            boxWidth: 7,
                            boxHeight: 7,
                            padding: 12,
                            font: { size: 11 }
                        }
                    },
                    tooltip: { enabled: false }
                }
            }
        });
        var image = canvas.toDataURL('image/png');
        exportChart.destroy();
        return image;
    }

    function buildPdfExportSheet() {
        var model = state.model;
        var kpis = getExportKpis(model);
        var trendImage = trendChart && typeof trendChart.toBase64Image === 'function' ? trendChart.toBase64Image() : '';
        var structureImage = getStructureExportImage(model);
        var structureRows = model.businessStructure.map(function (item) {
            return [
                item.label,
                formatNumber(item.value, 2),
                (model.totalGross ? item.value / model.totalGross * 100 : 0).toFixed(1) + '%'
            ];
        });
        var statusRows = model.statuses.map(function (item) {
            return [
                item.label,
                formatNumber(item.count, 0),
                formatNumber(item.amount, 2),
                (model.totalBills ? item.count / model.totalBills * 100 : 0).toFixed(1) + '%'
            ];
        });
        var rankingRows = model.ranking.map(function (item, index) {
            return [
                String(index + 1),
                item.name,
                formatNumber(item.value, 2),
                (model.totalGross ? item.value / model.totalGross * 100 : 0).toFixed(1) + '%'
            ];
        });
        var detailRows = model.rows.map(function (row) {
            return [
                row.label,
                formatNumber(row.orders, 0),
                formatNumber(row.bills, 0),
                formatNumber(row.gross, 2),
                formatNumber(row.paid, 2),
                formatNumber(row.platformFee, 2),
                formatNumber(row.supplierNet, 2),
                formatNumber(row.pending, 2),
                formatNumber(row.settledRate * 100, 1) + '%'
            ];
        });
        var exportSheet = document.createElement('section');
        exportSheet.className = 'fee-report-pdf-sheet';
        exportSheet.setAttribute('aria-hidden', 'true');
        exportSheet.innerHTML = ''
            + '<header class="fee-report-pdf-head"><div><h1>' + escapeHtml(getExportTitle()) + '</h1>'
            + '<p>' + escapeHtml(getReportCaption()) + '</p></div><strong>龙岗数据聚合服务平台</strong></header>'
            + '<div class="fee-report-pdf-meta"><span>业务类型：' + escapeHtml(BUSINESS_OPTIONS[state.business].label) + '</span>'
            + '<span>运营类型：' + escapeHtml(OPERATION_OPTIONS[state.operation].label) + '</span>'
            + '<span>数据更新时间：' + escapeHtml(formatDateTime(REFERENCE_DATE)) + '</span>'
            + '<span>导出时间：' + escapeHtml(formatDateTime(new Date())) + '</span></div>'
            + '<div class="fee-report-pdf-kpis">' + kpis.map(function (item) {
                var direction = item.compare >= 0 ? '↑' : '↓';
                return '<article><span>' + escapeHtml(item.label) + '</span><strong>' + escapeHtml(item.display)
                    + '<small>' + escapeHtml(item.unit) + '</small></strong><em>' + escapeHtml(item.compareLabel) + ' '
                    + direction + Math.abs(item.compare).toFixed(1) + '%</em></article>';
            }).join('') + '</div>'
            + '<div class="fee-report-pdf-charts">'
            + '<article><h2>交易与费用趋势</h2>' + (trendImage ? '<img src="' + trendImage + '" alt="交易与费用趋势图">' : '<p class="empty">图表组件未加载</p>') + '</article>'
            + '<article class="fee-report-pdf-structure-chart"><h2>业务类型金额构成</h2>' + (structureImage ? '<img src="' + structureImage + '" alt="业务类型金额构成图">' : '<p class="empty">图表组件未加载</p>') + '</article>'
            + '</div>'
            + '<div class="fee-report-pdf-analyses">'
            + '<article><h2>业务类型金额构成</h2>' + buildExportTable(['业务类型', '交易金额（元）', '占比'], structureRows) + '</article>'
            + '<article><h2>账单状态分析</h2>' + buildExportTable(['账单状态', '账单数', '交易金额（元）', '占比'], statusRows) + '</article>'
            + '<article><h2>' + escapeHtml(getExportRankingLabel()) + '交易排行</h2>' + buildExportTable(['排名', getExportRankingLabel(), '交易金额（元）', '占比'], rankingRows) + '</article>'
            + '</div>'
            + '<article class="fee-report-pdf-detail"><h2>' + (state.reportType === 'month' ? '每日费用汇总' : '每月费用汇总')
            + '<small>共 ' + model.rows.length + ' 条，导出全部筛选结果</small></h2>'
            + buildExportTable([
                state.reportType === 'month' ? '日期' : '月份',
                '订单数',
                '账单数',
                '交易金额（元）',
                '实付金额（元）',
                '平台服务费（元）',
                '供方实收（元）',
                '未结金额（元）',
                '结清率'
            ], detailRows, 'fee-report-pdf-detail-table') + '</article>'
            + '<footer><strong>统计口径说明：</strong>平台服务费按订单或付款阶段保存的服务费快照汇总；第三方供方交易展示平台服务费与供方实收，自营交易不计算供方分账。分账渠道手续费不等同于平台服务费，当前报表不纳入统计。</footer>';
        document.body.appendChild(exportSheet);
        return exportSheet;
    }

    function waitForExportImages(container) {
        var images = Array.prototype.slice.call(container.querySelectorAll('img'));
        return Promise.all(images.map(function (image) {
            if (image.complete) return Promise.resolve();
            return new Promise(function (resolve) {
                image.addEventListener('load', resolve, { once: true });
                image.addEventListener('error', resolve, { once: true });
            });
        }));
    }

    function getPdfSliceRanges(canvas, exportSheet, maxSliceHeight) {
        var scale = canvas.height / exportSheet.scrollHeight;
        var sheetTop = exportSheet.getBoundingClientRect().top;
        var candidates = Array.prototype.slice.call(exportSheet.querySelectorAll(
            '.fee-report-pdf-head, .fee-report-pdf-meta, .fee-report-pdf-kpis, '
            + '.fee-report-pdf-charts, .fee-report-pdf-analyses, .fee-report-pdf-detail h2, '
            + '.fee-report-pdf-detail tr, .fee-report-pdf-sheet footer'
        )).map(function (element) {
            return Math.round((element.getBoundingClientRect().bottom - sheetTop) * scale);
        }).filter(function (position) {
            return position > 0 && position < canvas.height;
        }).sort(function (a, b) {
            return a - b;
        });
        var ranges = [];
        var offset = 0;

        while (canvas.height - offset > maxSliceHeight) {
            var target = offset + maxSliceHeight;
            var minimum = offset + maxSliceHeight * 0.62;
            var breakAt = candidates.reduce(function (selected, position) {
                return position >= minimum && position <= target ? position : selected;
            }, 0);
            if (!breakAt || breakAt <= offset) breakAt = target;
            ranges.push({ offset: offset, height: breakAt - offset });
            offset = breakAt;
        }
        ranges.push({ offset: offset, height: canvas.height - offset });
        return ranges;
    }

    function buildPdfPages(canvas, exportSheet) {
        var JsPdf = window.jspdf && window.jspdf.jsPDF;
        if (!JsPdf) throw new Error('PDF 导出组件未加载，请检查网络连接后重试。');

        var pdf = new JsPdf({ orientation: 'landscape', unit: 'mm', format: 'a4', compress: true });
        var pageWidth = pdf.internal.pageSize.getWidth();
        var pageHeight = pdf.internal.pageSize.getHeight();
        var margin = 8;
        var footerHeight = 6;
        var contentWidth = pageWidth - margin * 2;
        var contentHeight = pageHeight - margin * 2 - footerHeight;
        var renderRatio = contentWidth / canvas.width;
        var sliceHeight = Math.max(1, Math.floor(contentHeight / renderRatio));
        var ranges = getPdfSliceRanges(canvas, exportSheet, sliceHeight);
        var totalPages = ranges.length;

        for (var pageIndex = 0; pageIndex < totalPages; pageIndex += 1) {
            if (pageIndex > 0) pdf.addPage('a4', 'landscape');
            var offset = ranges[pageIndex].offset;
            var currentHeight = ranges[pageIndex].height;
            var pageCanvas = document.createElement('canvas');
            pageCanvas.width = canvas.width;
            pageCanvas.height = currentHeight;
            var context = pageCanvas.getContext('2d');
            context.fillStyle = '#ffffff';
            context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
            context.drawImage(canvas, 0, offset, canvas.width, currentHeight, 0, 0, canvas.width, currentHeight);
            pdf.addImage(
                pageCanvas.toDataURL('image/jpeg', 0.94),
                'JPEG',
                margin,
                margin,
                contentWidth,
                currentHeight * renderRatio,
                undefined,
                'FAST'
            );
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(8);
            pdf.setTextColor(128, 128, 128);
            pdf.text((pageIndex + 1) + ' / ' + totalPages, pageWidth / 2, pageHeight - 5, { align: 'center' });
            pageCanvas.width = 1;
            pageCanvas.height = 1;
        }

        return pdf;
    }

    function exportPdf() {
        if (!window.html2canvas || !window.jspdf || !window.jspdf.jsPDF) {
            return Promise.reject(new Error('PDF 导出组件未加载，请检查网络连接后重试。'));
        }

        var exportSheet = buildPdfExportSheet();
        return waitForExportImages(exportSheet)
            .then(function () {
                return window.html2canvas(exportSheet, {
                    backgroundColor: '#ffffff',
                    scale: 1.5,
                    useCORS: true,
                    logging: false,
                    width: exportSheet.scrollWidth,
                    height: exportSheet.scrollHeight,
                    windowWidth: exportSheet.scrollWidth,
                    windowHeight: exportSheet.scrollHeight
                });
            })
            .then(function (canvas) {
                buildPdfPages(canvas, exportSheet).save(getExportFileName('pdf'));
            })
            .finally(function () {
                if (exportSheet.parentNode) exportSheet.parentNode.removeChild(exportSheet);
            });
    }

    function setExportBusy(busy) {
        exportToggle.disabled = busy;
        exportToggle.setAttribute('aria-busy', busy ? 'true' : 'false');
        root.querySelectorAll('[data-export-type]').forEach(function (button) {
            button.disabled = busy;
        });
    }

    function showExportResult(type, fileName) {
        if (window.GlobalDialog) {
            window.GlobalDialog.success({
                title: type + ' 报表导出成功',
                desc: fileName + ' 已按当前页面筛选结果下载。',
                duration: 2200
            });
        }
    }

    function showExportError(message) {
        if (window.GlobalDialog) {
            window.GlobalDialog.info({
                title: '报表导出失败',
                desc: message || '导出过程中发生异常，请稍后重试。',
                duration: 2600
            });
        }
    }

    function handleExport(type) {
        var extension = type === 'PDF' ? 'pdf' : 'xlsx';
        var fileName = getExportFileName(extension);
        setExportBusy(true);

        if (type === 'PDF') {
            exportPdf()
                .then(function () {
                    showExportResult(type, fileName);
                })
                .catch(function (error) {
                    showExportError(error && error.message);
                })
                .finally(function () {
                    setExportBusy(false);
                });
            return;
        }

        try {
            exportExcel();
            showExportResult(type, fileName);
        } catch (error) {
            showExportError(error && error.message);
        } finally {
            setExportBusy(false);
        }
    }

    root.querySelectorAll('[data-report-tab]').forEach(function (tab) {
        tab.addEventListener('click', function () {
            setReportType(tab.getAttribute('data-report-tab'));
        });
    });

    root.querySelector('[data-report-query]').addEventListener('click', function () {
        state.period = root.querySelector('[data-report-period]').value;
        state.business = root.querySelector('[data-business-filter]').value;
        state.operation = root.querySelector('[data-operation-filter]').value;
        state.page = 1;
        render();
    });

    root.querySelector('[data-report-reset]').addEventListener('click', function () {
        state.period = REPORT_PERIODS[state.reportType][0].value;
        state.business = 'all';
        state.operation = 'all';
        state.page = 1;
        root.querySelector('[data-report-period]').value = state.period;
        root.querySelector('[data-business-filter]').value = state.business;
        root.querySelector('[data-operation-filter]').value = state.operation;
        render();
    });

    root.querySelectorAll('[data-ranking-tab]').forEach(function (tab) {
        tab.addEventListener('click', function () {
            state.ranking = tab.getAttribute('data-ranking-tab');
            root.querySelectorAll('[data-ranking-tab]').forEach(function (item) {
                var active = item === tab;
                item.classList.toggle('active', active);
                item.setAttribute('aria-selected', active ? 'true' : 'false');
            });
            state.model.ranking = buildRanking(state.model.totalGross);
            renderRanking(state.model);
        });
    });

    var exportWrap = root.querySelector('.fee-report-export');
    var exportToggle = root.querySelector('[data-export-toggle]');
    exportToggle.addEventListener('click', function (event) {
        event.stopPropagation();
        var open = exportWrap.classList.toggle('is-open');
        exportToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    root.querySelectorAll('[data-export-type]').forEach(function (button) {
        button.addEventListener('click', function () {
            exportWrap.classList.remove('is-open');
            exportToggle.setAttribute('aria-expanded', 'false');
            handleExport(button.getAttribute('data-export-type'));
        });
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.fee-report-export')) {
            exportWrap.classList.remove('is-open');
            exportToggle.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            exportWrap.classList.remove('is-open');
            exportToggle.setAttribute('aria-expanded', 'false');
        }
    });

    root.querySelector('[data-page-size]').addEventListener('change', function (event) {
        state.pageSize = Number(event.target.value) || 10;
        state.page = 1;
        renderTable(state.model);
    });

    root.querySelector('[data-page-prev]').addEventListener('click', function () {
        if (state.page <= 1) return;
        state.page -= 1;
        renderTable(state.model);
    });

    root.querySelector('[data-page-next]').addEventListener('click', function () {
        var pageCount = Math.max(1, Math.ceil(state.model.rows.length / state.pageSize));
        if (state.page >= pageCount) return;
        state.page += 1;
        renderTable(state.model);
    });

    if (window.Chart) {
        window.Chart.defaults.font.family = "'Inter', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif";
        window.Chart.defaults.color = '#606266';
    }

    populatePeriodOptions();
    render();
})();
