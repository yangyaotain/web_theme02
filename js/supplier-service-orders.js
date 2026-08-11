(function () {
    var STATUS_TABS = [
        '全部',
        '待关联合同',
        '关联审批中',
        '关联合同签署中',
        '待支付',
        '解除审批中',
        '已解除关联',
        '待交付',
        '待确认交付',
        '交易完成'
    ];
    var CONTRACT_SERVICE_FEE_MODE = 'P';
    var CONTRACT_SERVICE_FEE_VALUE = 2.5;
    var PLATFORM_OPERATOR_NAME = '深圳市龙岗区数据要素交易服务有限公司';

    function getOperationMode(item) {
        if (item && item.operationMode === 'self') return 'self';
        if (item && item.operationMode === 'thirdParty') return 'thirdParty';
        return String(item && item.provider || '') === PLATFORM_OPERATOR_NAME ? 'self' : 'thirdParty';
    }

    function isSelfOperated(item) {
        return getOperationMode(item) === 'self';
    }

    function getPartyTotal(item) {
        return isSelfOperated(item) ? 2 : 3;
    }

    function getOperationModeLabel(item) {
        return isSelfOperated(item) ? '自营' : '第三方';
    }

    var ORDER_RECORDS = [
        ['2026072116142806100000101149401', '龙岗企业数据资产入表辅导服务', '数据资产入表辅导服务', '深圳市龙岗产业投资服务有限公司', '3000元/次', '1次', '线下交付', '¥3000', '2026-07-21 16:14:28', '待关联合同'],
        ['2026072015074302800000101149417', '园区数据治理体系规划咨询服务', '企业数据治理与合规咨询服务', '龙岗区园区运营管理有限公司', '5000元/次', '1次', '线下交付', '¥5000', '2026-07-20 15:07:43', '待关联合同'],
        ['2026071911360908500000101149433', '企业信用画像合规查询服务', '企业数据资源托管运营服务', '深圳市清澜企业服务有限公司', '500元/次', '3次', '线下交付', '¥1500', '2026-07-19 11:36:09', '关联审批中'],
        ['2026071911052604700000101149425', '园区企业数据治理整改实施服务', '企业数据治理与合规咨询服务', '深圳市龙岗智慧产业有限公司', '8000元/项', '1项', '报告+驻场', '¥8000', '2026-07-19 11:05:26', '关联审批中'],
        ['2026071817245104300000101149449', '数字化转型顶层规划咨询服务', '企业数字化转型咨询服务', '龙岗数智产业研究院有限公司', '8000元/次', '1次', '线下交付', '¥8000', '2026-07-18 17:24:51', '关联合同签署中'],
        ['2026071714092607600000101149465', '数据资产融资可行性评估服务', '企业数据资产融资咨询服务', '深圳市龙岗科创金融服务有限公司', '6000元/次', '1次', '线下交付', '¥6000', '2026-07-17 14:09:26', '待支付（首次）'],
        ['2026071610513701900000101149481', '公共数据授权运营合规评估', '数据交易合规评估服务', '深圳市数治咨询服务有限公司', '4500元/次', '1次', '线下交付', '¥4500', '2026-07-16 10:51:37', '解除审批中'],
        ['2026071518321405400000101149497', '企业数据资源托管运营服务', '企业数据资源托管运营服务', '龙岗区企业服务集团有限公司', '1200元/月', '6月', '线下交付', '¥7200', '2026-07-15 18:32:14', '已解除关联'],
        ['2026071414250309200000101149513', '智慧园区数据运营解决方案', '智慧园区运营咨询服务', '龙岗区绿色产业运营有限公司', '10000元/次', '1次', '线下交付', '¥10000', '2026-07-14 14:25:03', '待交付'],
        ['2026071216294803700000101149529', '数据产品市场化运营策划服务', '数据产品运营策划服务', '深圳市龙岗招商服务有限公司', '6800元/次', '1次', '线下交付', '¥6800', '2026-07-12 16:29:48', '待确认交付'],
        ['2026071011182506400000101149545', '行业数据空间建设咨询服务', '行业数据空间建设咨询服务', '龙岗区产业发展研究中心', '12000元/次', '1次', '线下交付', '¥12000', '2026-07-10 11:18:25', '交易完成'],
        ['2026070817260802200000101149561', '金融风控模型优化咨询服务', '企业数据治理与合规咨询服务', '深圳市龙岗科创金融服务有限公司', '5000元/次', '1次', '线下交付', '¥5000', '2026-07-08 17:26:08', '交易完成'],
        ['2026070714070007500000101149577', '交通运行分析解决方案', '企业数字化转型咨询服务', '龙岗智慧交通科技有限公司', '3500元/次', '1次', '线下交付', '¥3500', '2026-07-07 14:07:00', '待交付'],
        ['2026070613102407500000101149593', '数据治理成熟度阶段评估服务', '企业数据治理与合规咨询服务', '龙岗区数据应用创新中心', '12000元/次', '1次', '线下交付', '¥12000', '2026-07-06 13:10:24', '待支付（阶段）'],
        ['2026070510294107500000101149609', '公共数据授权运营咨询服务', '数据交易合规评估服务', '龙岗数智产业研究院有限公司', '20000元/次', '1次', '线下交付', '¥20000', '2026-07-05 10:29:41', '待支付（最后）']
    ].map(function (row, index) {
        var selfOperated = index % 4 === 0;
        return {
            orderNo: row[0],
            name: row[1],
            serviceType: row[2],
            user: row[3],
            provider: selfOperated ? PLATFORM_OPERATOR_NAME : '深圳市龙岗数智科技有限公司',
            operationMode: selfOperated ? 'self' : 'thirdParty',
            partyTotal: selfOperated ? 2 : 3,
            price: row[4],
            quantity: row[5],
            delivery: row[6],
            amount: row[7],
            appliedAt: row[8],
            status: row[9]
        };
    });

    var ELECTRONIC_CONTRACT_META = {
        '2026071911360908500000101149433': { signMode: '电子签章', initiatorRole: '需求方', reviewerRole: '提供方', contractSubStatus: '当前提供方待审核并签署', signProgress: '1/3 已签署', taskId: 'FDD-20260719149433', primaryAction: '审核并签署' },
        '2026071911052604700000101149425': { signMode: '线下签署', initiatorRole: '提供方', reviewerRole: '需求方', currentActor: '需求方', contractSubStatus: '提供方已提交线下合同，等待需求方确认关联', signProgress: '--', taskStatus: '等待关联确认', primaryAction: '撤回关联' },
        '2026071817245104300000101149449': { signMode: '电子签章', initiatorRole: '提供方', reviewerRole: '平台运营方', contractSubStatus: '当前运营方待审核并签署', signProgress: '2/3 已签署', taskId: 'FDD-20260718149449', primaryAction: '审核并签署' }
    };

    ORDER_RECORDS.forEach(function (item) {
        if (ELECTRONIC_CONTRACT_META[item.orderNo]) Object.assign(item, ELECTRONIC_CONTRACT_META[item.orderNo]);
        if (isSelfOperated(item) && item.signProgress) {
            item.signProgress = item.signProgress.replace(/(\d+)\/3/, function (_, count) { return Math.min(2, Number(count) || 0) + '/2'; });
            if (item.reviewerRole === '平台运营方') {
                item.reviewerRole = '需求方';
                item.currentActor = '需求方';
                item.contractSubStatus = '当前需求方待审核并签署';
            }
        }
    });
    if (window.EContractDemoScenarios) {
        ORDER_RECORDS = window.EContractDemoScenarios.getOrders('supplier', 'service').concat(ORDER_RECORDS);
    }
    if (window.EContractDemoScenarios && window.EContractDemoScenarios.ensureOperationModeCoverage) {
        ORDER_RECORDS = window.EContractDemoScenarios.ensureOperationModeCoverage(ORDER_RECORDS, {
            orderPrefix: '33',
            thirdPartyProvider: '深圳市龙岗数智科技有限公司',
            requiredStatuses: ['待关联合同', '关联审批中', '关联合同签署中', '待支付（首次）', '待支付（阶段）', '待支付（最后）', '解除审批中', '已解除关联', '待交付', '待确认交付', '交易完成'],
            forceSamples: [{ status: '待关联合同', mode: 'self' }]
        });
    }
    ensureOrderSignModes(ORDER_RECORDS);

    function applyElectronicSignResult(record, result, role) {
        if (!record) return '';
        if (result.status !== 'signed') {
            record.contractSubStatus = role + '已拒绝签署，签约任务已终止';
            record.taskStatus = '签约任务已终止';
            record.status = '关联合同签署中';
            record.primaryAction = '';
            record.currentActor = '流程终止';
            return role + '已拒绝签署，本次签约任务已停止。';
        }

        var partyTotal = getPartyTotal(record);
        var partyLabel = isSelfOperated(record) ? '双方' : '三方';
        var targetCount = Math.min(partyTotal, (parseInt(record.signProgress, 10) || 0) + 1);
        record.signProgress = targetCount + '/' + partyTotal + ' 已签署';
        record.lastSignCallbackAt = result.processedAt;
        if (targetCount < partyTotal) {
            record.status = '关联合同签署中';
            record.reviewerRole = '';
            record.currentActor = '其他未签署方';
            record.contractSubStatus = role + '已完成签署，等待其他签署方独立完成';
            record.primaryAction = '';
            return role + '签署成功回调已确认，其他签署方可独立完成签署。';
        }
        record.status = isSelfOperated(record) ? '待支付（首次）' : '关联合同签署中';
        record.reviewerRole = isSelfOperated(record) ? '' : '平台运营方';
        record.currentActor = isSelfOperated(record) ? '需求方' : '系统处理';
        record.contractSubStatus = isSelfOperated(record)
            ? '双方签署完成，最终合同已归档，等待需求方支付首期款'
            : partyLabel + '签署完成，等待任务关闭与归档';
        record.taskStatus = isSelfOperated(record) ? '签约任务已关闭并归档' : partyLabel + '签署完成，等待任务关闭';
        record.primaryAction = '';
        return isSelfOperated(record)
            ? role + '签署成功回调已确认，双方合同已归档，订单进入首期待支付。'
            : '运营方签署成功回调已确认，正在关闭签约任务并归档最终文件。';
    }

    var ACTIONS_BY_STATUS = {
        '待关联合同': [['关联合同', 'contract'], ['订单详情', 'detail']],
        '关联审批中': [['关联审批', 'approve'], ['订单详情', 'detail']],
        '关联合同签署中': [['继续签署', 'sign'], ['订单详情', 'detail']],
        '待支付（首次）': [['解除关联合同', 'unlink'], ['订单详情', 'detail']],
        '待支付（阶段）': [['订单详情', 'detail']],
        '待支付（最后）': [['订单详情', 'detail']],
        '解除审批中': [['订单详情', 'detail']],
        '已解除关联': [['关联合同', 'contract'], ['订单详情', 'detail']],
        '待交付': [['服务交付', 'delivery'], ['订单详情', 'detail']],
        '待确认交付': [['交付详情', 'delivery'], ['订单详情', 'detail']],
        '交易完成': [['交付详情', 'delivery'], ['订单详情', 'detail']]
    };

    var ICON_PATHS = {
        search: '<path d="M9.5 3a6.5 6.5 0 0 1 5.16 10.45l4.45 4.44-1.42 1.42-4.44-4.45A6.5 6.5 0 1 1 9.5 3zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"/>',
        filter: '<path d="M3 5h18l-7 8v5l-4 2v-7L3 5zm4.4 2 4.6 5.25V17l1-.5v-4.25L17.6 7H7.4z"/>',
        reset: '<path d="M12 5V2L7 7l5 5V7a5 5 0 1 1-4.55 7.06l-1.82.83A7 7 0 1 0 12 5z"/>',
        approve: '<path d="M9 16.2 5.5 12.7 4.1 14.1 9 19 20.3 7.7l-1.4-1.4L9 16.2z"/>',
        contract: '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-5 4h8v2H8v-2zm0 4h8v2H8v-2z"/>',
        withdraw: '<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.42-1.41L7.83 13H20v-2z"/>',
        sign: '<path d="m4 17.25 9.85-9.85 2.75 2.75L6.75 20H4v-2.75zM18.7 8.05 15.95 5.3l1.15-1.15a1 1 0 0 1 1.4 0l1.35 1.35a1 1 0 0 1 0 1.4L18.7 8.05z"/>',
        unlink: '<path d="M17 7h-3V5h3a5 5 0 0 1 0 10h-3v-2h3a3 3 0 0 0 0-6zM7 7a3 3 0 0 0 0 6h3v2H7A5 5 0 0 1 7 5h3v2H7zm1 4h8v2H8v-2zM4.7 3.3l16 16-1.4 1.4-16-16 1.4-1.4z"/>',
        delivery: '<path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2a3 3 0 0 0 6 0h6a3 3 0 0 0 6 0h2v-5l-3-4zM6 18.5A1.5 1.5 0 1 1 6 15a1.5 1.5 0 0 1 0 3.5zM15 15H9a3 3 0 0 0-6 0V6h12v9zm3 3.5a1.5 1.5 0 1 1 0-3.5 1.5 1.5 0 0 1 0 3.5zm3-3.5a3 3 0 0 0-4-2.83V10h2l2 3v2z"/>',
        detail: '<path d="M12 5c5 0 8.4 4.2 9.5 7-1.1 2.8-4.5 7-9.5 7S3.6 14.8 2.5 12C3.6 9.2 7 5 12 5zm0 2c-3.6 0-6.2 2.7-7.3 5 1.1 2.3 3.7 5 7.3 5s6.2-2.7 7.3-5C18.2 9.7 15.6 7 12 7zm0 2.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6z"/>',
        success: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-2 15-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"/>'
    };

    function icon(name) {
        return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICON_PATHS[name] || ICON_PATHS.detail) + '</svg>';
    }

    function hasAssociatedContract(item) {
        return Boolean(item && item.status !== '订单退回' && item.status !== '待关联合同');
    }

    function ensureOrderSignModes(records) {
        records.forEach(function (item, index) {
            item.operationMode = getOperationMode(item);
            item.partyTotal = getPartyTotal(item);
            if (isSelfOperated(item) && item.signProgress) {
                item.signProgress = String(item.signProgress).replace(/(\d+)\/\d+/, function (_, count) {
                    return Math.min(2, Number(count) || 0) + '/2';
                });
                item.contractSubStatus = String(item.contractSubStatus || '').replace(/三方/g, '双方');
                item.taskStatus = String(item.taskStatus || '').replace(/三方/g, '双方');
            }
            if (!item.signMode && hasAssociatedContract(item)) {
                item.signMode = index % 2 === 0 ? '电子签章' : '线下签署';
            }
        });
    }

    function renderSignModeBadge(item) {
        if (!item.signMode || !hasAssociatedContract(item)) return '';
        var modeClass = item.signMode === '线下签署' ? ' is-offline' : ' is-electronic';
        return '<span class="supplier-order-sign-mode' + modeClass + '" aria-label="签署方式：' + escapeHtml(item.signMode) + '">' + escapeHtml(item.signMode) + '</span>';
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
        });
    }

    function parseOrderAmount(value) {
        return Number(String(value == null ? '' : value).replace(/[^\d.-]/g, '')) || 0;
    }

    function getPaidAmount(item, totalAmount) {
        if (item.paidAmount != null && Number.isFinite(Number(item.paidAmount))) {
            return Math.min(totalAmount, Math.max(0, Number(item.paidAmount)));
        }
        if (item.status === '交易完成') return totalAmount;

        var totalStages = Math.max(1, Number(item.paymentStage && item.paymentStage.periodTotal || 3));
        var currentStage = Math.max(1, Number(item.paymentStage && item.paymentStage.periodNo || 1));
        var paidCount = 0;
        if (item.status === '待支付（阶段）') paidCount = Math.max(1, currentStage - 1);
        else if (item.status === '待支付（最后）') paidCount = totalStages - 1;
        else if (item.status === '待交付') paidCount = item.paymentStage && item.paymentStage.payStatus === '已支付' ? currentStage : 1;
        else if (item.status === '待确认交付') paidCount = Math.max(1, totalStages - 1);

        if (!paidCount) return 0;
        var percents = totalStages === 4 ? [25, 25, 25, 25] : (totalStages === 3 ? [30, 40, 30] : Array(totalStages).fill(100 / totalStages));
        if (item.paymentStage && Number.isFinite(Number(item.paymentStage.percent))) {
            percents[currentStage - 1] = Number(item.paymentStage.percent);
        }
        var paidPercent = percents.slice(0, paidCount).reduce(function (sum, percent) {
            return sum + percent;
        }, 0);
        return Math.min(totalAmount, Math.round(totalAmount * paidPercent) / 100);
    }

    function formatPaymentProgress(item) {
        var totalAmount = parseOrderAmount(item.amount);
        var paidAmount = getPaidAmount(item, totalAmount);
        return '￥' + paidAmount.toFixed(2) + '/￥' + totalAmount.toFixed(2);
    }

    function initSupplierServiceOrders() {
        var params = new URLSearchParams(window.location.search || '');
        if (params.get('menu') !== 'service-order') return;

        var panel = document.querySelector('[data-consult-panel]');
        var title = document.querySelector('[data-center-title]');
        if (!panel) return;

        var state = {
            tab: '全部',
            keyword: '',
            keywordDraft: '',
            serviceType: '全部服务类型',
            operationMode: 'all',
            page: 1,
            pageSize: 10,
            filterOpen: false
        };
        var toastTimer = null;

        function restoreServiceOrderList() {
            panel.classList.add('is-supplier-order-management');
            if (title) title.textContent = '服务订单管理';
            document.title = '服务订单管理 - 供方中心';
            render();
        }

        var serviceDeliveryDetail = window.ServiceOrderDeliveryDetail ? window.ServiceOrderDeliveryDetail.create({
            panel: panel,
            titleElement: title,
            onBack: restoreServiceOrderList
        }) : null;

        var serviceOrderDetail = window.ServiceOrderDetail ? window.ServiceOrderDetail.create({
            panel: panel,
            titleElement: title,
            role: 'supplier',
            supplierName: '深圳市龙岗数智科技有限公司',
            operatorName: '深圳市龙岗区数据要素交易服务有限公司',
            onBack: restoreServiceOrderList,
            onAction: function (action, item, controls) {
                if ((action === '服务交付' || action === '交付详情') && serviceDeliveryDetail) {
                    serviceOrderDetail.close();
                    serviceDeliveryDetail.open(item, 'basic');
                    return;
                }
                controls.showToast(action + '操作已触发：' + item.name + '（原型演示）');
            }
        }) : null;

        panel.classList.remove('is-placeholder', 'is-service-management', 'is-order-management');
        panel.classList.add('is-supplier-order-management');
        if (title) title.textContent = '服务订单管理';
        document.title = '服务订单管理 - 供方中心';

        function getServiceTypes() {
            return ORDER_RECORDS.map(function (item) {
                return item.serviceType;
            }).filter(function (value, index, list) {
                return list.indexOf(value) === index;
            });
        }

        function getFilteredRecords() {
            var keyword = state.keyword.toLowerCase();
            return ORDER_RECORDS.filter(function (item) {
                if (state.tab === '待支付' && item.status.indexOf('待支付') !== 0) return false;
                if (state.tab !== '全部' && state.tab !== '待支付' && item.status !== state.tab) return false;
                if (state.serviceType !== '全部服务类型' && item.serviceType !== state.serviceType) return false;
                if (state.operationMode !== 'all' && getOperationMode(item) !== state.operationMode) return false;
                if (!keyword) return true;
                var searchable = [item.orderNo, item.name, item.serviceType, item.user].join(' ').toLowerCase();
                return searchable.indexOf(keyword) !== -1;
            });
        }

        function renderTabs() {
            return STATUS_TABS.map(function (tab) {
                var active = tab === state.tab;
                return '<button class="supplier-order-tab' + (active ? ' active' : '') + '" type="button" role="tab" aria-selected="' + active + '" data-supplier-service-tab="' + escapeHtml(tab) + '">' + escapeHtml(tab) + '</button>';
            }).join('');
        }

        function renderFilterPanel() {
            var options = getServiceTypes().map(function (serviceType) {
                return '<option' + (state.serviceType === serviceType ? ' selected' : '') + '>' + escapeHtml(serviceType) + '</option>';
            }).join('');
            return ''
                + '<div class="supplier-order-filter-panel' + (state.filterOpen ? ' show' : '') + '">'
                +   '<select data-supplier-service-type aria-label="服务类型">'
                +       '<option>全部服务类型</option>'
                +       options
                +   '</select>'
                +   '<select data-supplier-service-operation-mode aria-label="经营属性">'
                +       '<option value="all"' + (state.operationMode === 'all' ? ' selected' : '') + '>全部经营属性</option>'
                +       '<option value="self"' + (state.operationMode === 'self' ? ' selected' : '') + '>自营</option>'
                +       '<option value="thirdParty"' + (state.operationMode === 'thirdParty' ? ' selected' : '') + '>第三方</option>'
                +   '</select>'
                +   '<button class="supplier-order-filter-reset" type="button" data-supplier-service-reset>' + icon('reset') + '<span>重置</span></button>'
                + '</div>';
        }

        function renderActions(item) {
            var actions = ACTIONS_BY_STATUS[item.status] || [['订单详情', 'detail']];
            if (item.demoMode && !item.primaryAction) actions = [['订单详情', 'detail']];
            if (item.status === '关联审批中' && item.initiatorRole === '提供方') {
                actions = [['撤回关联', 'withdraw'], ['订单详情', 'detail']];
            } else if (item.primaryAction) {
                var primaryIcon = item.primaryAction === '审核并签署' ? 'approve' : 'sign';
                actions = [[item.primaryAction, primaryIcon], ['订单详情', 'detail']];
            }
            return actions.map(function (action) {
                return '<button class="supplier-order-action" type="button" data-supplier-service-action="' + escapeHtml(action[0]) + '" data-supplier-service-no="' + escapeHtml(item.orderNo) + '">' + icon(action[1]) + '<span>' + escapeHtml(action[0]) + '</span></button>';
            }).join('');
        }

        function renderRows(records) {
            if (!records.length) {
                return '<tr><td class="supplier-order-empty" colspan="11">暂无符合条件的服务订单</td></tr>';
            }

            return records.map(function (item) {
                var muted = item.status === '已解除关联' ? ' is-muted' : '';
                return ''
                    + '<tr' + (item.demoMode ? ' class="is-contract-demo"' : '') + '>'
                    +   '<td title="' + escapeHtml(item.orderNo) + '">' + escapeHtml(item.orderNo) + '</td>'
                    +   '<td class="supplier-order-ellipsis" title="' + escapeHtml(item.name) + '"><span class="supplier-order-name-with-badge"><span>' + escapeHtml(item.name) + '</span><span class="supplier-order-operation-badge is-' + escapeHtml(getOperationMode(item)) + '">' + escapeHtml(getOperationModeLabel(item)) + '</span></span></td>'
                    +   '<td class="supplier-order-ellipsis" title="' + escapeHtml(item.serviceType) + '">' + escapeHtml(item.serviceType) + '</td>'
                    +   '<td class="supplier-order-ellipsis" title="' + escapeHtml(item.user) + '">' + escapeHtml(item.user) + '</td>'
                    +   '<td>' + escapeHtml(item.price) + '</td>'
                    +   '<td>' + escapeHtml(item.quantity) + '</td>'
                    +   '<td>' + escapeHtml(item.delivery) + '</td>'
                    +   '<td>' + escapeHtml(formatPaymentProgress(item)) + '</td>'
                    +   '<td>' + escapeHtml(item.appliedAt) + '</td>'
                    +   '<td class="order-status-cell"><div class="supplier-order-status-stack"><span class="supplier-order-status' + muted + '">' + escapeHtml(item.status) + '</span>'
                    +       renderSignModeBadge(item)
                    +       (item.contractSubStatus ? '<small>' + escapeHtml(item.contractSubStatus) + (item.signProgress ? ' · ' + escapeHtml(item.signProgress) : '') + (item.currentActor ? ' · 当前处理：' + escapeHtml(item.currentActor) : '') + '</small>' : '')
                    +   '</div></td>'
                    +   '<td class="order-action-cell"><div class="supplier-order-actions">' + renderActions(item) + '</div></td>'
                    + '</tr>';
            }).join('');
        }

        function renderPagination(total, totalPages) {
            var pageButtons = [];
            for (var page = 1; page <= totalPages; page += 1) {
                pageButtons.push('<button class="supplier-order-page-btn' + (page === state.page ? ' active' : '') + '" type="button" data-supplier-service-page="' + page + '">' + page + '</button>');
            }

            return ''
                + '<div class="supplier-order-pagination">'
                +   '<span>共 ' + total + ' 条</span>'
                +   '<button class="supplier-order-page-btn" type="button" aria-label="上一页" data-supplier-service-page="prev"' + (state.page <= 1 ? ' disabled' : '') + '>‹</button>'
                +   pageButtons.join('')
                +   '<button class="supplier-order-page-btn" type="button" aria-label="下一页" data-supplier-service-page="next"' + (state.page >= totalPages ? ' disabled' : '') + '>›</button>'
                +   '<select class="supplier-order-page-size" data-supplier-service-page-size aria-label="每页条数">'
                +       '<option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10 条/页</option>'
                +       '<option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20 条/页</option>'
                +   '</select>'
                +   '<span>前往</span>'
                +   '<input class="supplier-order-page-jump" type="number" min="1" max="' + totalPages + '" aria-label="前往页码" data-supplier-service-page-jump>'
                + '</div>';
        }

        function renderTable() {
            var filtered = getFilteredRecords();
            var totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
            if (state.page > totalPages) state.page = totalPages;
            var start = (state.page - 1) * state.pageSize;
            var pageRecords = filtered.slice(start, start + state.pageSize);

            return ''
                + '<div class="supplier-order-table-card">'
                +   '<div class="supplier-order-table-scroll" aria-label="服务订单列表，可横向滚动">'
                +       '<table class="supplier-order-table supplier-service-order-table">'
                +           '<colgroup>'
                +               '<col class="col-order-no"><col class="col-name"><col class="col-service-type"><col class="col-user">'
                +               '<col class="col-price"><col class="col-quantity"><col class="col-delivery"><col class="col-amount">'
                +               '<col class="col-applied-at"><col class="col-status"><col class="col-actions">'
                +           '</colgroup>'
                +           '<thead><tr>'
                +               '<th>订单编号</th><th>名称</th><th>服务类型</th><th>使用方</th><th>价格</th><th>数量</th>'
                +               '<th>交付方式</th><th>已支付/应支付</th><th>申请时间</th>'
                +               '<th class="order-status-cell">交易状态</th><th class="order-action-cell">操作</th>'
                +           '</tr></thead>'
                +           '<tbody>' + renderRows(pageRecords) + '</tbody>'
                +       '</table>'
                +   '</div>'
                +   renderPagination(filtered.length, totalPages)
                + '</div>';
        }

        function render() {
            panel.innerHTML = ''
                + '<div class="supplier-order-board">'
                +   '<div class="supplier-order-tabs" role="tablist" aria-label="服务订单状态">' + renderTabs() + '</div>'
                +   '<div class="supplier-order-toolbar">'
                +       '<label class="supplier-order-search">'
                +           '<input type="search" placeholder="请输入订单编号/名称" value="' + escapeHtml(state.keywordDraft) + '" data-supplier-service-keyword aria-label="搜索服务订单">'
                +           icon('search')
                +       '</label>'
                +       '<button class="supplier-order-query-button" type="button" data-supplier-service-query>' + icon('search') + '<span>查询</span></button>'
                +       '<button class="supplier-order-filter-toggle' + (state.filterOpen ? ' active' : '') + '" type="button" aria-expanded="' + state.filterOpen + '" data-supplier-service-filter>' + icon('filter') + '<span>筛选</span></button>'
                +   '</div>'
                +   renderFilterPanel()
                +   renderTable()
                + '</div>'
                + '<div class="supplier-order-toast" role="status" aria-live="polite" data-supplier-service-toast>' + icon('success') + '<span></span></div>';
            bindEvents();
        }

        function showToast(message) {
            var toast = panel.querySelector('[data-supplier-service-toast]');
            if (!toast) return;
            toast.querySelector('span').textContent = message;
            toast.classList.add('show');
            window.clearTimeout(toastTimer);
            toastTimer = window.setTimeout(function () {
                toast.classList.remove('show');
            }, 2200);
        }

        function removeContractSnapshot(record) {
            if (!record) return;
            record.contractSnapshot = null;
            try {
                var store = JSON.parse(window.localStorage.getItem('ServiceOrderContractSnapshots:v1') || '{}') || {};
                delete store['supplier:' + record.orderNo];
                window.localStorage.setItem('ServiceOrderContractSnapshots:v1', JSON.stringify(store));
            } catch (error) {
                // localStorage不可用时，仅清理当前页面中的合同快照。
            }
        }

        function openWithdrawRelationModal(record, trigger) {
            if (!record || !window.ContractRelationOperations) return;
            window.ContractRelationOperations.openWithdraw({
                returnFocus: trigger,
                onConfirm: function () {
                    record.status = '待关联合同';
                    record.primaryAction = '';
                    record.contractSubStatus = '';
                    record.signMode = '';
                    record.signProgress = '';
                    record.initiatorRole = '';
                    record.currentActor = '';
                    record.reviewerRole = '';
                    record.taskId = '';
                    record.taskStatus = '签约任务已撤回';
                    removeContractSnapshot(record);
                    render();
                    showToast('已撤回合同关联，订单已恢复为待关联合同。');
                }
            });
        }

        function openUnlinkContractDrawer(record, trigger) {
            if (!record || !window.ContractRelationOperations) return;
            if (window.ServiceOrderDetail) window.ServiceOrderDetail.hydrateSnapshot(record, 'supplier');
            window.ContractRelationOperations.openUnlink({
                record: record,
                snapshot: record.contractSnapshot,
                businessType: 'service',
                operationMode: getOperationMode(record),
                provider: record.provider || '深圳市龙岗数智科技有限公司',
                demander: record.user,
                operator: '深圳市龙岗区数据要素交易服务有限公司',
                serviceFeeMode: CONTRACT_SERVICE_FEE_MODE,
                serviceFeeValue: isSelfOperated(record) ? 0 : CONTRACT_SERVICE_FEE_VALUE,
                returnFocus: trigger,
                onDemo: showToast,
                onConfirm: function (reason) {
                    record.preUnlinkStatus = record.status;
                    record.status = '解除审批中';
                    record.contractSubStatus = '提供方已提交解除关联合同申请，等待审批';
                    record.unlinkInitiatorRole = '提供方';
                    record.unlinkReason = reason;
                    record.primaryAction = '';
                    render();
                    showToast('解除关联合同申请已提交。');
                }
            });
        }

        function changePage(value) {
            var totalPages = Math.max(1, Math.ceil(getFilteredRecords().length / state.pageSize));
            state.page = Math.min(totalPages, Math.max(1, parseInt(value, 10) || 1));
            render();
        }

        function bindEvents() {
            panel.querySelectorAll('[data-supplier-service-tab]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.keyword = state.keywordDraft.trim();
                    state.tab = this.dataset.supplierServiceTab;
                    state.page = 1;
                    render();
                });
            });

            var keywordInput = panel.querySelector('[data-supplier-service-keyword]');
            if (keywordInput) {
                keywordInput.addEventListener('input', function () {
                    state.keywordDraft = this.value;
                });
                keywordInput.addEventListener('keydown', function (event) {
                    if (event.key !== 'Enter') return;
                    state.keyword = state.keywordDraft.trim();
                    state.page = 1;
                    render();
                });
            }

            var queryButton = panel.querySelector('[data-supplier-service-query]');
            if (queryButton) {
                queryButton.addEventListener('click', function () {
                    state.keyword = state.keywordDraft.trim();
                    state.page = 1;
                    render();
                });
            }

            var filterToggle = panel.querySelector('[data-supplier-service-filter]');
            if (filterToggle) {
                filterToggle.addEventListener('click', function () {
                    state.filterOpen = !state.filterOpen;
                    render();
                });
            }

            var serviceType = panel.querySelector('[data-supplier-service-type]');
            if (serviceType) {
                serviceType.value = state.serviceType;
                serviceType.addEventListener('change', function () {
                    state.keyword = state.keywordDraft.trim();
                    state.serviceType = this.value;
                    state.page = 1;
                    render();
                });
            }

            var operationMode = panel.querySelector('[data-supplier-service-operation-mode]');
            if (operationMode) {
                operationMode.value = state.operationMode;
                operationMode.addEventListener('change', function () {
                    state.keyword = state.keywordDraft.trim();
                    state.operationMode = this.value;
                    state.page = 1;
                    render();
                });
            }

            var resetButton = panel.querySelector('[data-supplier-service-reset]');
            if (resetButton) {
                resetButton.addEventListener('click', function () {
                    state.keyword = state.keywordDraft.trim();
                    state.serviceType = '全部服务类型';
                    state.operationMode = 'all';
                    state.page = 1;
                    render();
                });
            }

            panel.querySelectorAll('[data-supplier-service-page]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.disabled) return;
                    var action = this.dataset.supplierServicePage;
                    if (action === 'prev') changePage(state.page - 1);
                    else if (action === 'next') changePage(state.page + 1);
                    else changePage(action);
                });
            });

            var pageSize = panel.querySelector('[data-supplier-service-page-size]');
            if (pageSize) {
                pageSize.addEventListener('change', function () {
                    state.pageSize = parseInt(this.value, 10) || 10;
                    state.page = 1;
                    render();
                });
            }

            var pageJump = panel.querySelector('[data-supplier-service-page-jump]');
            if (pageJump) {
                pageJump.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') changePage(this.value);
                });
                pageJump.addEventListener('change', function () {
                    if (this.value) changePage(this.value);
                });
            }

            panel.querySelectorAll('[data-supplier-service-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var action = this.dataset.supplierServiceAction;
                    var clickedRecord = ORDER_RECORDS.find(function (item) { return item.orderNo === button.dataset.supplierServiceNo; });
                    if (action === '订单详情' && serviceOrderDetail && clickedRecord) {
                        serviceOrderDetail.open(clickedRecord, 'order', this);
                        return;
                    }
                    if ((action === '服务交付' || action === '交付详情') && serviceDeliveryDetail && clickedRecord) {
                        serviceDeliveryDetail.open(clickedRecord, 'basic', this);
                        return;
                    }
                    if (action === '撤回关联' && clickedRecord) {
                        openWithdrawRelationModal(clickedRecord, this);
                        return;
                    }
                    if (action === '解除关联合同' && clickedRecord) {
                        openUnlinkContractDrawer(clickedRecord, this);
                        return;
                    }
                    if ((action === '关联审批' || action === '审核并签署') && window.SupplierContractApproval) {
                        var approvalOrderNo = this.dataset.supplierServiceNo;
                        var approvalRecord = ORDER_RECORDS.find(function (item) { return item.orderNo === approvalOrderNo; });
                        var approvalSnapshot = approvalRecord && approvalRecord.contractSnapshot;
                        var approvalSelfOperated = approvalRecord && isSelfOperated(approvalRecord);
                        var approvalPartyLabel = approvalSelfOperated ? '双方' : '三方';
                        window.SupplierContractApproval.open({
                            orderNo: approvalOrderNo,
                            provider: approvalRecord ? approvalRecord.provider : '',
                            demander: approvalRecord ? approvalRecord.user : '',
                            itemName: approvalRecord ? approvalRecord.name : '',
                            amount: approvalSnapshot && approvalSnapshot.contractAmount != null ? approvalSnapshot.contractAmount : (approvalRecord ? approvalRecord.amount : ''),
                            appliedAt: approvalRecord ? approvalRecord.appliedAt : '',
                            businessType: 'service',
                            operationMode: approvalRecord ? getOperationMode(approvalRecord) : 'thirdParty',
                            partyTotal: approvalRecord ? getPartyTotal(approvalRecord) : 3,
                            paymentMode: approvalSnapshot && approvalSnapshot.paymentMode,
                            paymentStages: approvalSnapshot && approvalSnapshot.paymentStages,
                            serviceFeeMode: approvalSnapshot && approvalSnapshot.serviceFeeMode || CONTRACT_SERVICE_FEE_MODE,
                            serviceFeeValue: approvalSelfOperated ? 0 : (approvalSnapshot && approvalSnapshot.serviceFeeValue != null ? approvalSnapshot.serviceFeeValue : CONTRACT_SERVICE_FEE_VALUE),
                            signing: approvalRecord && approvalRecord.signMode ? approvalRecord.signMode : '电子签章',
                            initiatorRole: approvalRecord && approvalRecord.initiatorRole,
                            reviewerRole: approvalRecord && approvalRecord.reviewerRole,
                            approvalStatus: approvalRecord && approvalRecord.contractSubStatus,
                            currentNode: approvalRecord && approvalRecord.contractSubStatus,
                            signProgress: approvalRecord && approvalRecord.signProgress,
                            taskId: approvalRecord && approvalRecord.taskId,
                            demoMode: Boolean(approvalRecord && approvalRecord.demoMode),
                            documentMode: 'template',
                            templateName: '数据服务' + approvalPartyLabel + '交易合同（V2.6）',
                            onConfirm: function (result) {
                                if (approvalRecord) {
                                    if (result.decision === 'pass') {
                                        approvalRecord.contractSubStatus = '审核通过，待' + (approvalRecord.reviewerRole || '提供方') + '完成签署';
                                        approvalRecord.primaryAction = '继续签署';
                                        approvalRecord.currentActor = approvalRecord.reviewerRole || '提供方';
                                    } else {
                                        approvalRecord.status = '待关联合同';
                                        approvalRecord.contractSubStatus = '上次关联审核不通过';
                                        approvalRecord.primaryAction = '';
                                        approvalRecord.currentActor = approvalRecord.initiatorRole || '提供方';
                                    }
                                    render();
                                }
                                showToast(result.decision === 'pass'
                                    ? '审核已通过，已打开法大大；签署结果以回调为准。'
                                    : '关联审核未通过，法大大签约任务已撤销。');
                            },
                            onSignResult: function (signResult) {
                                var message = applyElectronicSignResult(approvalRecord, signResult, approvalRecord.reviewerRole || '提供方');
                                render();
                                showToast(message);
                            }
                        });
                        return;
                    }
                    if ((action === '关联合同' || action === '重新关联合同') && window.SupplierContractDrawer) {
                        var orderNo = this.dataset.supplierServiceNo;
                        var record = ORDER_RECORDS.find(function (item) { return item.orderNo === orderNo; });
                        var selfOperated = record && isSelfOperated(record);
                        var partyTotal = record ? getPartyTotal(record) : 3;
                        var partyLabel = selfOperated ? '双方' : '三方';
                        window.SupplierContractDrawer.open({
                            orderNo: orderNo,
                            provider: record ? record.provider : '',
                            demander: record ? record.user : '',
                            itemName: record ? record.name : '',
                            amount: record ? record.amount : '',
                            serviceFeeMode: CONTRACT_SERVICE_FEE_MODE,
                            serviceFeeValue: selfOperated ? 0 : CONTRACT_SERVICE_FEE_VALUE,
                            appliedAt: record ? record.appliedAt : '',
                            businessType: 'service',
                            operationMode: record ? getOperationMode(record) : 'thirdParty',
                            partyTotal: partyTotal,
                            demoMode: Boolean(record && record.demoMode),
                            esignUnavailableDemo: Boolean(record && record.esignUnavailableDemo),
                            onConfirm: function (values) {
                                if (record && window.ServiceOrderDetail) {
                                    window.ServiceOrderDetail.applyContractValues(record, values, {
                                        role: 'supplier',
                                        supplierName: record.provider || '深圳市龙岗数智科技有限公司',
                                        buyerName: record.user,
                                        operatorName: '深圳市龙岗区数据要素交易服务有限公司'
                                    });
                                }
                                if (record && values.signing === 'electronic') {
                                    record.status = '关联合同签署中';
                                    record.signMode = '电子签章';
                                    record.initiatorRole = '提供方';
                                    record.reviewerRole = '提供方';
                                    record.currentActor = '提供方';
                                    record.contractSubStatus = '法大大任务已创建，' + partyLabel + '可独立签署；当前提供方待签署';
                                    record.signProgress = '0/' + partyTotal + ' 已签署';
                                    record.taskId = values.taskId || ('FDD-' + String(record.orderNo).slice(-14));
                                    record.taskStatus = '签约任务进行中';
                                    record.primaryAction = '继续签署';
                                    render();
                                    showToast('法大大签约任务已创建，' + partyLabel + '可分别进入法大大完成签署。');
                                    return;
                                }
                                if (record) {
                                    record.status = '关联审批中';
                                    record.signMode = '线下签署';
                                    record.initiatorRole = '提供方';
                                    record.reviewerRole = selfOperated ? '需求方' : '需求方、平台运营方';
                                    record.currentActor = selfOperated ? '需求方' : '需求方、平台运营方';
                                    record.contractSubStatus = '线下' + partyLabel + '合同已提交，等待关联审批';
                                    record.signProgress = partyTotal + '/' + partyTotal + ' 已签署';
                                    record.primaryAction = '撤回关联';
                                    render();
                                }
                                showToast('线下合同已提交，等待关联审核。');
                            },
                            onSignResult: function (signResult) {
                                var message = applyElectronicSignResult(record, signResult, '提供方');
                                render();
                                showToast(message);
                            }
                        });
                        return;
                    }
                    if (action === '继续签署') {
                        var signOrderNo = this.dataset.supplierServiceNo || '';
                        var signRecord = ORDER_RECORDS.find(function (item) { return item.orderNo === signOrderNo; });
                        if (window.FadadaSignDemo && signRecord) {
                            if (!signRecord.demoMode && (!window.ESignServiceState || !window.ESignServiceState.isReady())) {
                                showToast('当前企业电子签章服务尚未就绪，请前往用户中心查看状态。');
                                window.open('user-center.html?menu=esign-service', '_blank');
                                return;
                            }
                            window.FadadaSignDemo.open({
                                taskId: signRecord.taskId,
                                contractName: signRecord.name + (isSelfOperated(signRecord) ? '双方' : '三方') + '交易合同',
                                orderNo: signRecord.orderNo,
                                operationMode: getOperationMode(signRecord),
                                partyTotal: getPartyTotal(signRecord),
                                role: signRecord.reviewerRole || '提供方',
                                party: signRecord.reviewerRole === '平台运营方'
                                    ? '深圳市龙岗区数据要素交易服务有限公司'
                                    : (signRecord.reviewerRole === '需求方' ? signRecord.user : '深圳市龙岗数智科技有限公司'),
                                node: action,
                                onResult: function (signResult) {
                                    var message = applyElectronicSignResult(signRecord, signResult, signRecord.reviewerRole || '提供方');
                                    render();
                                    showToast(message);
                                }
                            });
                            showToast('已打开法大大签署页面，完成结果以回调为准。');
                        }
                        return;
                    }
                    showToast(action + '功能将在后续设计，本页仅展示操作入口。');
                });
            });
        }

        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSupplierServiceOrders);
    } else {
        initSupplierServiceOrders();
    }
})();
