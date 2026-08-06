(function () {
    'use strict';

    var PLATFORM_OPERATOR_NAME = '深圳市龙岗区数据要素交易服务有限公司';
    var DEFAULT_SUPPLIER_NAME = '深圳市龙岗数智科技有限公司';
    var DEFAULT_BUYER_NAME = '深圳市龙岗智慧产业有限公司';
    var SNAPSHOT_STORAGE_KEY = 'ServiceOrderContractSnapshots:v1';
    var DETAIL_TABS = [
        { key: 'order', label: '订单信息' },
        { key: 'application', label: '申请信息' },
        { key: 'contract', label: '合同信息' },
        { key: 'payment', label: '支付信息' },
        { key: 'evaluation', label: '评价信息' }
    ];
    var DETAIL_STEPS = ['提交订单', '三方合同', '首期付款', '服务履约与分期结算', '交易完成'];
    var STATUS_STEP = {
        '待审批': 0,
        '待关联合同': 1,
        '关联审批中': 1,
        '关联合同签署中': 1,
        '解除审批中': 1,
        '已解除关联': 1,
        '待支付（首次）': 2,
        '待交付': 3,
        '待确认交付': 3,
        '待支付（阶段）': 3,
        '待支付（最后）': 3,
        '交易完成': 4
    };

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
        });
    }

    function clone(value) {
        return value == null ? value : JSON.parse(JSON.stringify(value));
    }

    function parseMoney(value) {
        return Number(String(value == null ? '' : value).replace(/[^\d.-]/g, '')) || 0;
    }

    function formatMoney(value) {
        return '¥' + Number(value || 0).toLocaleString('zh-CN', {
            minimumFractionDigits: Number(value || 0) % 1 ? 2 : 0,
            maximumFractionDigits: 2
        });
    }

    function formatPercent(value) {
        var number = Number(value || 0);
        return number.toLocaleString('zh-CN', {
            minimumFractionDigits: number % 1 ? 2 : 0,
            maximumFractionDigits: 2
        }) + '%';
    }

    function materialIcon(name) {
        return '<span class="material-symbols-outlined" aria-hidden="true">' + escapeHtml(name) + '</span>';
    }

    function pad(value) {
        return String(value).padStart(2, '0');
    }

    function addDays(dateText, days) {
        var match = String(dateText || '').match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})(?::(\d{2}))?/);
        if (!match) return dateText || '--';
        var date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), Number(match[4]), Number(match[5]), Number(match[6] || 0));
        date.setDate(date.getDate() + Number(days || 0));
        return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate())
            + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
    }

    function dateOnly(value) {
        return String(value || '').slice(0, 10) || '--';
    }

    function getSnapshotStore() {
        try {
            return JSON.parse(window.localStorage.getItem(SNAPSHOT_STORAGE_KEY) || '{}') || {};
        } catch (error) {
            return {};
        }
    }

    function getSnapshotKey(role, orderNo) {
        return String(role || 'supplier') + ':' + String(orderNo || '');
    }

    function saveSnapshot(item, role, snapshot) {
        if (!item || !item.orderNo || !snapshot) return snapshot;
        item.contractSnapshot = clone(snapshot);
        try {
            var store = getSnapshotStore();
            store[getSnapshotKey(role, item.orderNo)] = item.contractSnapshot;
            window.localStorage.setItem(SNAPSHOT_STORAGE_KEY, JSON.stringify(store));
        } catch (error) {
            // Static prototype: keep the in-memory snapshot when storage is unavailable.
        }
        return item.contractSnapshot;
    }

    function hydrateSnapshot(item, role) {
        if (!item || item.contractSnapshot) return item && item.contractSnapshot;
        var snapshot = getSnapshotStore()[getSnapshotKey(role, item.orderNo)];
        if (snapshot) item.contractSnapshot = clone(snapshot);
        return item.contractSnapshot;
    }

    function getPartyContext(item, options) {
        var role = options.role === 'buyer' ? 'buyer' : 'supplier';
        return {
            role: role,
            supplier: role === 'buyer'
                ? String(item.provider || options.supplierName || DEFAULT_SUPPLIER_NAME)
                : String(options.supplierName || DEFAULT_SUPPLIER_NAME),
            buyer: role === 'buyer'
                ? String(options.buyerName || DEFAULT_BUYER_NAME)
                : String(item.user || options.buyerName || DEFAULT_BUYER_NAME),
            operator: String(options.operatorName || PLATFORM_OPERATOR_NAME)
        };
    }

    function applyContractValues(item, values, options) {
        options = options || {};
        var parties = getPartyContext(item, options);
        var electronic = values.signing === 'electronic';
        var snapshot = {
            contractNo: values.contractNo || ('LG-FWHT-' + String(item.orderNo || '').slice(0, 8) + '-' + String(item.orderNo || '').slice(-6)),
            contractName: values.contractName || (String(item.name || '数据服务') + '三方交易合同'),
            signedAt: values.signedAt || '--',
            signingDeadline: values.signingDeadline || '--',
            startsAt: values.startsAt || dateOnly(item.appliedAt),
            endsAt: values.endsAt || '--',
            contractAmount: Number(values.contractAmount || parseMoney(item.amount)),
            serviceFeeMode: values.serviceFeeMode === 'G' ? 'G' : 'P',
            serviceFeeValue: Number(values.serviceFeeValue || 0),
            paymentMode: values.paymentMode || 'installment',
            paymentStages: clone(values.paymentStages || []),
            files: clone(values.files || []),
            pendingPdfFile: values.pendingPdfFile || '',
            fileName: values.pendingPdfFile || (values.files && values.files[0]) || (String(item.name || '数据服务') + '三方交易合同.pdf'),
            remark: values.remark || '--',
            signMethod: electronic ? '电子签章' : '线下签署',
            signProgress: electronic ? '0/3' : '3/3',
            taskId: electronic ? ('FDD-' + String(item.orderNo || '').slice(-14)) : '--',
            taskStatus: electronic ? '签约任务进行中' : '线下合同待关联确认',
            contractStatus: electronic ? '签署中' : '关联审批中',
            currentNode: electronic ? '等待三方完成审核与签署' : '等待关联合同审批',
            initiatedAt: item.appliedAt || '--',
            completedAt: '--',
            initiatorRole: parties.role === 'buyer' ? '需求方' : '提供方',
            provider: parties.supplier,
            demander: parties.buyer,
            operator: parties.operator
        };
        return saveSnapshot(item, parties.role, snapshot);
    }

    function hasContract(item) {
        if (item.contractSnapshot) return true;
        return item.status !== '待审批' && item.status !== '待关联合同';
    }

    function getDerivedContractStatus(item) {
        if (item.status === '待关联合同') return item.contractSnapshot ? '关联未通过' : '未关联';
        if (item.status === '关联审批中') return '关联审批中';
        if (item.status === '关联合同签署中') return '签署中';
        if (item.status === '解除审批中') return '解除审批中';
        if (item.status === '已解除关联') return '已解除关联';
        return '已签署并归档';
    }

    function getSigners(item, contract, parties) {
        var complete = contract.contractStatus === '已签署并归档';
        var terminated = contract.contractStatus === '已解除关联';
        var initiator = contract.initiatorRole || item.initiatorRole || (parties.role === 'buyer' ? '需求方' : '提供方');
        var reviewer = item.reviewerRole || '';
        var progress = parseInt(contract.signProgress, 10) || 0;
        function signerStatus(role, index) {
            if (terminated) return '关联已解除';
            if (complete) return '已签署';
            if (reviewer === role) return '待审核并签署';
            if (initiator === role || index < progress) return '已发起/已签署';
            return contract.contractStatus === '关联审批中' ? '待关联审批' : '待签署';
        }
        return [
            ['法人', '提供方', parties.supplier, signerStatus('提供方', 0)],
            ['法人', '需求方', parties.buyer, signerStatus('需求方', 1)],
            ['法人', '平台运营方', parties.operator, signerStatus('平台运营方', 2)]
        ];
    }

    function buildContract(item, options, parties) {
        hydrateSnapshot(item, parties.role);
        if (!hasContract(item)) return null;
        var source = item.contractSnapshot || {};
        var signed = getDerivedContractStatus(item) === '已签署并归档';
        var signedAt = source.signedAt && source.signedAt !== '--'
            ? source.signedAt
            : (signed ? dateOnly(addDays(item.appliedAt, 1)) : '--');
        var progressMatch = String(item.signProgress || source.signProgress || (signed ? '3/3 已签署' : '1/3 已签署')).match(/\d+\/3/);
        var contract = {
            number: source.contractNo || source.number || source.id || ('LG-FWHT-' + String(item.orderNo || '').slice(0, 8) + '-' + String(item.orderNo || '').slice(-6)),
            name: source.contractName || source.name || (String(item.name || '数据服务') + '三方交易合同'),
            contractStatus: getDerivedContractStatus(item),
            signMethod: source.signMethod || item.signMode || '电子签章',
            signedAt: signedAt,
            signingDeadline: source.signingDeadline || dateOnly(addDays(item.appliedAt, 10)),
            effectiveAt: source.startsAt || source.effectiveAt || (signed ? signedAt : dateOnly(item.appliedAt)),
            endsAt: source.endsAt || '2027-07-31',
            fileName: source.fileName || (String(item.name || '数据服务') + '三方交易合同.pdf'),
            amount: Number(source.contractAmount || source.amount || parseMoney(item.amount)),
            paymentMode: source.paymentMode || 'installment',
            paymentStages: clone(source.paymentStages || []),
            serviceFeeMode: source.serviceFeeMode === 'G' ? 'G' : 'P',
            serviceFeeValue: Number(source.serviceFeeValue != null ? source.serviceFeeValue : (item.paymentStage && item.paymentStage.serviceFeeValue != null ? item.paymentStage.serviceFeeValue : 2.5)),
            signProgress: progressMatch ? progressMatch[0] : (signed ? '3/3' : '1/3'),
            taskId: source.taskId || item.taskId || ('FDD-' + String(item.orderNo || '').slice(-14)),
            taskStatus: item.taskStatus || source.taskStatus || (signed ? '签约任务已关闭并归档' : '签约任务进行中'),
            currentNode: item.contractSubStatus || source.currentNode || (signed ? '三方合同签署完成，最终合同已归档' : '等待三方完成关联审批与签署'),
            initiatedAt: source.initiatedAt || item.appliedAt || '--',
            completedAt: source.completedAt || (signed ? addDays(item.appliedAt, 1) : '--'),
            initiatorRole: source.initiatorRole || item.initiatorRole || (parties.role === 'buyer' ? '需求方' : '提供方'),
            remark: source.remark || '--',
            provider: source.provider || parties.supplier,
            demander: source.demander || parties.buyer,
            operator: source.operator || parties.operator
        };
        contract.signers = getSigners(item, contract, parties);
        contract.logs = [
            { node: '发起关联', role: contract.initiatorRole, result: '已发起', time: contract.initiatedAt, opinion: '--' },
            { node: '三方审核与签署', role: '提供方、需求方、平台运营方', result: contract.contractStatus, time: contract.completedAt, opinion: contract.remark }
        ];
        return contract;
    }

    function getExternalPaymentPlan(orderNo) {
        if (!window.TransactionBillDemoData || !window.TransactionBillDemoData.getPaymentPlan) return null;
        return window.TransactionBillDemoData.getPaymentPlan(orderNo);
    }

    function getExternalOrderBill(orderNo) {
        if (!window.TransactionBillDemoData || !window.TransactionBillDemoData.getOrderBill) return null;
        return window.TransactionBillDemoData.getOrderBill(orderNo);
    }

    function getStagePreset(total) {
        if (total === 4) {
            return {
                names: ['首期款', '方案确认款', '实施进度款', '尾款'],
                percents: [25, 25, 25, 25]
            };
        }
        return {
            names: ['首期款', '阶段款', '尾款'],
            percents: [30, 40, 30]
        };
    }

    function getPaymentPosition(item, total) {
        if (item.status === '交易完成') return { paidCount: total, current: 0 };
        if (item.status === '待支付（首次）') return { paidCount: 0, current: 1 };
        if (item.status === '待支付（阶段）') return { paidCount: Math.max(1, Number(item.paymentStage && item.paymentStage.periodNo || 2) - 1), current: Number(item.paymentStage && item.paymentStage.periodNo || 2) };
        if (item.status === '待支付（最后）') return { paidCount: total - 1, current: total };
        if (item.status === '待交付') return { paidCount: 1, current: 0 };
        if (item.status === '待确认交付') return { paidCount: Math.max(1, total - 1), current: 0 };
        return { paidCount: 0, current: 0 };
    }

    function getStageNode(index, total) {
        if (index === 0) return '三方合同签署完成后';
        if (index === total - 1) return '服务最终验收通过后';
        return '第' + (index + 1) + '阶段成果确认后';
    }

    function buildFallbackStages(item, contract) {
        var total = Number(item.paymentStage && item.paymentStage.periodTotal || 3);
        var preset = getStagePreset(total);
        var position = getPaymentPosition(item, total);
        var totalAmount = Number(contract.amount || parseMoney(item.amount));
        var allocated = 0;
        return preset.names.map(function (name, index) {
            var percent = preset.percents[index];
            if (item.paymentStage && Number(item.paymentStage.periodNo) === index + 1) {
                name = item.paymentStage.name || name;
                percent = Number(item.paymentStage.percent || percent);
            }
            var amount = index === total - 1 ? totalAmount - allocated : Math.round(totalAmount * percent) / 100;
            if (item.paymentStage && Number(item.paymentStage.periodNo) === index + 1 && Number.isFinite(Number(item.paymentStage.amount))) {
                amount = Number(item.paymentStage.amount);
            }
            allocated += amount;
            var paid = index + 1 <= position.paidCount;
            var current = index + 1 === position.current;
            var status = paid ? '已支付' : (current ? item.status : '未到付款节点');
            var payment = paid ? {
                paymentNo: 'PAY' + String(item.orderNo || '').slice(0, 20) + 'P' + pad(index + 1),
                channel: '统一支付平台',
                paidAt: addDays(item.appliedAt, index * 7 + 1),
                status: '支付成功'
            } : null;
            return {
                name: name,
                percent: percent,
                amount: amount,
                node: getStageNode(index, total),
                status: status,
                current: current,
                payment: payment
            };
        });
    }

    function normalizeStages(sourceStages, item, contract) {
        var totalAmount = Number(contract.amount || parseMoney(item.amount));
        var allocated = 0;
        return sourceStages.map(function (source, index) {
            var percent = parseFloat(String(source.percent == null ? 0 : source.percent).replace('%', '')) || 0;
            var amountValue = Number(String(source.amount == null ? '' : source.amount).replace(/,/g, ''));
            var amount = Number.isFinite(amountValue)
                ? amountValue
                : (index === sourceStages.length - 1 ? totalAmount - allocated : Math.round(totalAmount * percent) / 100);
            allocated += amount;
            return {
                name: source.name || source.periodName || ('第' + (index + 1) + '期'),
                percent: percent,
                amount: amount,
                node: source.node || getStageNode(index, sourceStages.length),
                status: source.status || source.payStatus || '未到付款节点',
                current: Boolean(source.current),
                payment: source.payment ? clone(source.payment) : null,
                outTradeNo: source.outTradeNo || ''
            };
        });
    }

    function reconcileStageState(stages, item) {
        var position = getPaymentPosition(item, stages.length);
        var lifecycleStarted = /^待支付/.test(item.status)
            || item.status === '待交付'
            || item.status === '待确认交付'
            || item.status === '交易完成';
        stages.forEach(function (stage, index) {
            var periodNo = index + 1;
            if (stage.payment) {
                stage.status = '已支付';
                stage.current = false;
                return;
            }
            if (periodNo <= position.paidCount) {
                stage.status = '已支付';
                stage.current = false;
                stage.payment = {
                    paymentNo: 'PAY' + String(item.orderNo || '').slice(0, 20) + 'P' + pad(periodNo),
                    channel: '统一支付平台',
                    paidAt: addDays(item.appliedAt, index * 7 + 1),
                    status: '支付成功'
                };
                return;
            }
            if (periodNo === position.current) {
                stage.status = item.status;
                stage.current = true;
                return;
            }
            stage.current = false;
            if (lifecycleStarted && (stage.status === '待发起' || /^待支付/.test(stage.status))) stage.status = '未到付款节点';
        });
        return stages;
    }

    function buildPayment(item, contract, options) {
        if (!contract) return null;
        var plan = getExternalPaymentPlan(item.orderNo);
        var bill = getExternalOrderBill(item.orderNo);
        var sourceStages = contract.paymentStages && contract.paymentStages.length
            ? contract.paymentStages
            : (plan && plan.stages && plan.stages.length ? plan.stages : []);
        var stages = sourceStages.length ? normalizeStages(sourceStages, item, contract) : buildFallbackStages(item, contract);
        stages = reconcileStageState(stages, item);
        var feeMode = bill && bill.serviceFeeMode ? bill.serviceFeeMode : contract.serviceFeeMode;
        var feeValue = Number(bill && bill.serviceFeeValue != null ? bill.serviceFeeValue : contract.serviceFeeValue);
        var paidAmount = 0;
        var totalServiceFee = 0;
        var currentStage = null;
        stages.forEach(function (stage, index) {
            var paid = Boolean(stage.payment) || stage.status === '已支付';
            var fee = feeMode === 'G' ? feeValue : stage.amount * feeValue / 100;
            var rawSplit = stage.payment && stage.payment.split;
            stage.index = index + 1;
            stage.fee = fee;
            stage.netAmount = stage.amount - fee;
            stage.paymentNo = stage.payment ? (stage.payment.paymentNo || stage.outTradeNo || '--') : (stage.outTradeNo || '--');
            stage.channel = stage.payment ? (stage.payment.channel || '统一支付平台') : '--';
            stage.paidAt = stage.payment ? (stage.payment.paidAt || '--') : '--';
            stage.splitStatus = rawSplit ? rawSplit.status : (paid ? '分账成功' : '--');
            stage.splitNo = rawSplit ? rawSplit.outTraceNo : (paid ? 'PS' + String(item.orderNo || '').slice(0, 18) + pad(index + 1) : '--');
            if (paid) paidAmount += stage.amount;
            totalServiceFee += fee;
            if (!currentStage && (stage.current || /^待支付/.test(stage.status))) currentStage = stage;
        });
        return {
            paymentMode: contract.paymentMode === 'once' ? '一次性付款' : '分期付款',
            orderAmount: contract.amount,
            paidAmount: paidAmount,
            unpaidAmount: Math.max(0, contract.amount - paidAmount),
            totalServiceFee: totalServiceFee,
            expectedNet: contract.amount - totalServiceFee,
            feeMode: feeMode,
            feeValue: feeValue,
            currentStage: currentStage,
            stages: stages,
            progressText: '已支付 ' + stages.filter(function (stage) { return stage.payment || stage.status === '已支付'; }).length + '/' + stages.length + ' 期'
        };
    }

    function buildApplication(item, parties) {
        var logs = [
            { role: '业务认证用户-数据需求方角色', type: '提交订单', result: '成功', content: '提交服务申请', time: item.appliedAt }
        ];
        if (item.status !== '待审批') {
            logs.unshift({ role: '业务认证用户-数据提供方角色', type: '订单审批', result: '通过', content: '同意受理服务订单', time: addDays(item.appliedAt, 0) });
        }
        return {
            intendedPrice: item.amount || '--',
            delivery: item.delivery || '线下交付',
            scene: item.scene || (String(item.name || '').indexOf('合规') !== -1 ? '企业数据合规治理与风险评估' : '企业经营与数据分析服务'),
            purpose: item.purpose || '用于当前业务场景的数据分析、咨询与决策支持。',
            fileName: item.applicationFile || ('数据服务申请材料-' + String(item.orderNo || '').slice(-8) + '.docx'),
            logs: logs,
            demander: parties.buyer
        };
    }

    function buildEvaluation(item) {
        if (item.status !== '交易完成') return null;
        return {
            score: 5,
            time: addDays(item.appliedAt, 24),
            content: '服务成果完整，响应及时，交付内容符合合同约定。',
            visible: '是'
        };
    }

    function getCurrentDescription(item, payment) {
        var descriptions = {
            '待审批': '服务申请已提交，等待提供方审核。',
            '待关联合同': '订单已通过审核，等待发起三方合同关联。',
            '关联审批中': '三方合同已发起，等待相关主体完成关联审批。',
            '关联合同签署中': '三方合同审核通过，正在完成电子签署与归档。',
            '待支付（首次）': '三方合同已生效，等待需求方支付首期款。',
            '待支付（阶段）': '阶段成果已确认，等待需求方支付当前阶段款。',
            '待支付（最后）': '服务验收已通过，等待需求方支付尾款。',
            '待交付': '首期款已支付，服务履约正在进行。',
            '待确认交付': '服务成果已提交，等待需求方确认验收。',
            '解除审批中': '解除合同关联申请已提交，等待审批。',
            '已解除关联': '当前合同关联已解除，可重新发起三方合同关联。',
            '交易完成': '三方合同、服务履约和全部分期付款均已完成。'
        };
        var text = descriptions[item.status] || '查看当前服务订单的完整交易信息。';
        if (payment && payment.currentStage) text += ' 当前期次：' + payment.currentStage.name + '。';
        return text;
    }

    function buildDetail(item, options) {
        var parties = getPartyContext(item, options);
        var contract = buildContract(item, options, parties);
        var payment = buildPayment(item, contract, options);
        return {
            item: item,
            parties: parties,
            contract: contract,
            payment: payment,
            application: buildApplication(item, parties),
            evaluation: buildEvaluation(item),
            stepIndex: Object.prototype.hasOwnProperty.call(STATUS_STEP, item.status) ? STATUS_STEP[item.status] : 0,
            currentDescription: getCurrentDescription(item, payment)
        };
    }

    function renderCopyValue(value) {
        return '<span class="supplier-order-detail-copy-value"><span>' + escapeHtml(value) + '</span>'
            + '<button type="button" data-service-order-copy="' + escapeHtml(value) + '">' + materialIcon('content_copy') + '<span>复制</span></button></span>';
    }

    function renderInfoGrid(fields, extraClass) {
        return '<div class="supplier-order-detail-info-grid' + (extraClass ? ' ' + extraClass : '') + '">'
            + fields.map(function (field) {
                return '<div class="supplier-order-detail-info-field' + (field.full ? ' is-full' : '') + '">'
                    + '<span>' + escapeHtml(field.label) + '</span>'
                    + '<div>' + (field.html != null ? field.html : escapeHtml(field.value == null || field.value === '' ? '--' : field.value)) + '</div>'
                    + '</div>';
            }).join('')
            + '</div>';
    }

    function renderSection(title, content, extraClass) {
        return '<section class="supplier-order-detail-section' + (extraClass ? ' ' + extraClass : '') + '"><h3>'
            + escapeHtml(title) + '</h3>' + content + '</section>';
    }

    function renderCell(value) {
        if (value && typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, 'html')) return value.html;
        return escapeHtml(value == null || value === '' ? '--' : value);
    }

    function renderTable(headers, rows, extraClass) {
        return '<div class="supplier-order-detail-table-scroll' + (extraClass ? ' ' + extraClass : '') + '">'
            + '<table class="supplier-order-detail-table"><thead><tr>'
            + headers.map(function (header) { return '<th>' + escapeHtml(header) + '</th>'; }).join('')
            + '</tr></thead><tbody>'
            + rows.map(function (row) {
                return '<tr>' + row.map(function (cell) { return '<td>' + renderCell(cell) + '</td>'; }).join('') + '</tr>';
            }).join('')
            + '</tbody></table></div>';
    }

    function renderEmpty(iconName, title, description) {
        return '<div class="supplier-order-detail-empty">' + materialIcon(iconName)
            + '<strong>' + escapeHtml(title) + '</strong><p>' + escapeHtml(description) + '</p></div>';
    }

    function renderLogs(logs, contractMode) {
        return renderTable(
            contractMode
                ? ['操作节点', '操作角色', '操作结果', '操作时间', '操作意见']
                : ['操作者角色', '操作类型', '操作结果', '内容', '操作时间'],
            logs.map(function (log) {
                return contractMode
                    ? [log.node, log.role, log.result, log.time, log.opinion]
                    : [log.role, log.type, log.result, log.content, log.time];
            }),
            'is-log-table'
        );
    }

    function renderStageStatus(status) {
        var tone = status === '已支付' || status === '支付成功'
            ? ' is-success'
            : (/^待支付/.test(status) ? ' is-current' : ' is-muted');
        return '<span class="service-order-detail-stage-status' + tone + '">' + escapeHtml(status) + '</span>';
    }

    function renderSummary(detail) {
        var exception = detail.item.status === '解除审批中' || detail.item.status === '已解除关联';
        return '<section class="supplier-order-detail-summary' + (exception ? ' is-exception' : '') + '">'
            + '<div class="supplier-order-detail-summary-head">'
            + '<div><span>当前交易状态</span><h2>' + escapeHtml(detail.item.status) + '</h2><p>' + escapeHtml(detail.currentDescription) + '</p></div>'
            + '<dl><div><dt>订单编号</dt><dd>' + renderCopyValue(detail.item.orderNo) + '</dd></div><div><dt>申请时间</dt><dd>' + escapeHtml(detail.item.appliedAt) + '</dd></div></dl>'
            + '</div>'
            + '<div class="supplier-order-detail-progress' + (exception ? ' is-exception' : '') + '" role="list" aria-label="服务订单交易进度">'
            + DETAIL_STEPS.map(function (label, index) {
                var complete = index < detail.stepIndex;
                var current = index === detail.stepIndex;
                var stateClass = complete ? ' is-complete' : (current ? ' is-current' : '');
                return '<div class="supplier-order-detail-step' + stateClass + '" role="listitem"><div class="supplier-order-detail-step-marker">'
                    + (complete ? materialIcon('check') : '<span>' + (index + 1) + '</span>')
                    + '</div><strong>' + escapeHtml(label) + '</strong></div>';
            }).join('')
            + '</div></section>';
    }

    function renderTabs(activeTab) {
        return '<div class="supplier-order-detail-tabs" role="tablist" aria-label="服务订单详情分类">'
            + DETAIL_TABS.map(function (tab) {
                var active = tab.key === activeTab;
                return '<button type="button" role="tab" aria-selected="' + active + '" tabindex="' + (active ? '0' : '-1') + '" class="supplier-order-detail-tab' + (active ? ' active' : '') + '" data-service-order-detail-tab="' + tab.key + '">'
                    + escapeHtml(tab.label) + '</button>';
            }).join('') + '</div>';
    }

    function renderPaymentOverview(payment, role) {
        if (!payment) return renderEmpty('payments', '尚未生成支付信息', '三方合同完成关联并生效后，系统将按合同付款计划生成支付期次。');
        var headers = role === 'supplier'
            ? ['付款计划', '合同金额', '支付进度', '已收金额', '待收金额']
            : ['付款计划', '合同金额', '支付进度', '已付金额', '待付金额'];
        return renderTable(headers, [[payment.paymentMode, formatMoney(payment.orderAmount), payment.progressText, formatMoney(payment.paidAmount), formatMoney(payment.unpaidAmount)]]);
    }

    function renderOrderInformation(detail, options) {
        var item = detail.item;
        var paymentStatus = detail.payment ? detail.payment.progressText : '尚未生成';
        return ''
            + renderSection('基本信息', renderInfoGrid([
                { label: '订单编号', html: renderCopyValue(item.orderNo) },
                { label: '订单类型', value: '服务订单' },
                { label: '付费时点', value: '预付费' },
                { label: '付款计划', value: detail.payment ? detail.payment.paymentMode : '--' },
                { label: '申请时间', value: item.appliedAt },
                { label: '订单状态', html: '<span class="supplier-order-detail-status-text">' + escapeHtml(item.status) + '</span>' },
                { label: '支付进度', value: paymentStatus }
            ]))
            + renderPaymentOverview(detail.payment, detail.parties.role)
            + renderSection('交易主体信息', renderInfoGrid([
                { label: '需求方', value: detail.parties.buyer },
                { label: '提供方', value: detail.parties.supplier },
                { label: '平台运营方', value: detail.parties.operator, full: true }
            ], 'is-party-grid'))
            + renderSection('服务信息', renderTable(
                ['服务名称', '服务类型', '计量方式', '价格', '数量', '交付方式', '金额'],
                [[item.name, item.serviceType || item.productType || '--', '按服务次数计费', item.price, item.quantity, item.delivery, item.amount]],
                'is-product-table'
            ) + '<div class="supplier-order-detail-total"><span>服务总价：<strong>' + formatMoney(parseMoney(item.amount)) + '</strong></span><span>订单金额：<b>' + formatMoney(parseMoney(item.amount)) + '</b></span></div>');
    }

    function renderApplicationInformation(detail) {
        var application = detail.application;
        var file = '<div class="supplier-order-detail-file"><span>' + materialIcon('description') + '<span>' + escapeHtml(application.fileName) + '</span></span>'
            + '<button type="button" data-service-order-demo-action="申请资料预览">' + materialIcon('visibility') + '<span>预览</span></button>'
            + '<button type="button" data-service-order-demo-action="申请资料下载">' + materialIcon('download') + '<span>下载</span></button></div>';
        return ''
            + renderSection('申请信息', renderInfoGrid([
                { label: '意向价格', value: application.intendedPrice },
                { label: '交付方式', value: application.delivery },
                { label: '服务使用场景描述', value: application.scene },
                { label: '使用目的及方式', value: application.purpose, full: true },
                { label: '数据服务相关资料', html: file, full: true }
            ]), 'service-order-detail-application')
            + renderSection('日志信息', renderLogs(application.logs));
    }

    function renderContractTerms(detail) {
        var contract = detail.contract;
        var payment = detail.payment;
        var feeRule = contract.serviceFeeMode === 'G'
            ? formatMoney(contract.serviceFeeValue) + '/笔'
            : formatPercent(contract.serviceFeeValue);
        var rows = payment ? payment.stages.map(function (stage) {
            return [stage.index, stage.name, stage.node, formatPercent(stage.percent), formatMoney(stage.amount), renderStageStatus(stage.status)];
        }) : [];
        var supplierView = detail.parties.role === 'supplier';
        return '<div class="supplier-order-payment-summary service-order-contract-summary">'
            + '<div><span>合同金额</span><strong>' + formatMoney(contract.amount) + '</strong><small>关联订单应付总额</small></div>'
            + '<div><span>付款方式</span><strong>' + (contract.paymentMode === 'once' ? '一次性付款' : '分期付款') + '</strong><small>合同签署后冻结</small></div>'
            + '<div><span>平台服务费</span><strong>' + escapeHtml(feeRule) + '</strong><small>' + (contract.serviceFeeMode === 'G' ? '每笔付款流水收取' : '按每期付款金额计算') + '</small></div>'
            + '<div><span>' + (supplierView ? '提供方预计净收' : '分期期数') + '</span><strong>'
            + (supplierView ? formatMoney(payment ? payment.expectedNet : contract.amount) : ((payment ? payment.stages.length : 0) + ' 期'))
            + '</strong><small>' + (supplierView ? '合同金额扣除平台服务费' : '各期按付款节点生成支付流水') + '</small></div>'
            + '</div>'
            + (rows.length ? renderTable(['期次', '阶段名称', '付款触发节点', '付款比例', '付款金额', '当前状态'], rows, 'service-order-contract-stage-table') : '');
    }

    function renderContractInformation(detail) {
        var contract = detail.contract;
        if (!contract) return renderSection('合同信息', renderEmpty('contract', '尚未关联合同', '订单审批通过后，可从当前订单发起三方合同关联。'));
        var status = '<span class="supplier-order-detail-inline-status">' + materialIcon(contract.contractStatus === '已解除关联' ? 'warning' : 'radio_button_checked') + '<span>' + escapeHtml(contract.contractStatus) + '</span></span>';
        var file = '<div class="supplier-order-detail-file"><span>' + materialIcon('description') + '<span>' + escapeHtml(contract.fileName) + '</span></span>'
            + '<button type="button" data-service-order-demo-action="合同预览">' + materialIcon('visibility') + '<span>预览</span></button>'
            + '<button type="button" data-service-order-demo-action="合同下载">' + materialIcon('download') + '<span>下载</span></button></div>';
        var relationAction = '<button class="supplier-order-detail-link-button" type="button" data-service-order-relation>' + materialIcon('visibility') + '<span>关联详情</span></button>';
        return ''
            + renderSection('合同信息', renderInfoGrid([
                { label: '合同名称', value: contract.name },
                { label: '合同编号', html: renderCopyValue(contract.number) },
                { label: '合同类型', value: '服务订单三方交易合同' },
                { label: '合同状态', html: status },
                { label: '签署方式', value: contract.signMethod },
                { label: '签署时间', value: contract.signedAt },
                { label: '合同文件', html: file, full: true }
            ]))
            + renderSection('三方签署主体', renderTable(['主体类型', '签署方角色', '签署方名称', '审核/签署状态'], contract.signers, 'is-signer-table'))
            + renderSection('关联合同流程', renderTable(
                ['合同名称', '合同编号', '签署方式', '发起时间', '完成时间', '关联状态', '操作'],
                [[contract.name, contract.number, contract.signMethod, contract.initiatedAt, contract.completedAt, contract.contractStatus, { html: relationAction }]],
                'is-contract-table'
            ))
            + renderSection('付款与分账条款', renderContractTerms(detail))
            + renderSection('合同日志', renderLogs(contract.logs, true));
    }

    function renderPaymentInformation(detail) {
        var payment = detail.payment;
        if (!payment) return renderSection('支付信息', renderEmpty('payments', '尚未生成支付信息', '三方合同完成关联并生效后，系统将按合同付款计划生成支付期次。'));
        var supplier = detail.parties.role === 'supplier';
        var feeRule = payment.feeMode === 'G' ? formatMoney(payment.feeValue) + '/笔' : formatPercent(payment.feeValue);
        var currentText = payment.currentStage ? payment.currentStage.name + ' · ' + formatMoney(payment.currentStage.amount) : '当前无待支付期次';
        var cards = '<div class="supplier-order-payment-summary">'
            + '<div><span>合同金额</span><strong>' + formatMoney(payment.orderAmount) + '</strong><small>' + escapeHtml(payment.paymentMode) + '</small></div>'
            + '<div><span>' + (supplier ? '已收金额' : '已付金额') + '</span><strong>' + formatMoney(payment.paidAmount) + '</strong><small>' + escapeHtml(payment.progressText) + '</small></div>'
            + '<div><span>' + (supplier ? '平台服务费' : '待付金额') + '</span><strong>' + formatMoney(supplier ? payment.totalServiceFee : payment.unpaidAmount) + '</strong><small>' + (supplier ? escapeHtml(feeRule) : '尚未支付的合同金额') + '</small></div>'
            + '<div><span>' + (supplier ? '提供方预计净收' : '当前应付') + '</span><strong>' + formatMoney(supplier ? payment.expectedNet : (payment.currentStage ? payment.currentStage.amount : 0)) + '</strong><small>' + escapeHtml(currentText) + '</small></div>'
            + '</div>';
        var rows = payment.stages.map(function (stage) {
            var common = [stage.index, stage.name, stage.node, formatPercent(stage.percent), formatMoney(stage.amount), { html: renderStageStatus(stage.status) }, stage.paymentNo, stage.channel, stage.paidAt];
            if (supplier) common.push(formatMoney(stage.fee), formatMoney(stage.netAmount), stage.splitStatus, stage.splitNo);
            return common;
        });
        var headers = ['期次', '付款节点', '触发条件', '比例', '应付金额', '支付状态', '支付流水号', '支付方式', '支付时间'];
        if (supplier) headers = headers.concat(['平台服务费', '提供方净收', '分账状态', '分账流水号']);
        var logs = [];
        payment.stages.forEach(function (stage) {
            if (!stage.payment || stage.paymentNo === '--') return;
            logs.push({ role: '业务认证用户-数据需求方角色', type: '支付' + stage.name, result: '成功', content: stage.paymentNo, time: stage.paidAt });
            if (supplier) logs.push({ role: '平台运营方', type: '订单分账', result: stage.splitStatus, content: stage.splitNo, time: stage.paidAt });
        });
        return ''
            + renderSection('支付概况', cards)
            + renderSection('分期付款明细', renderTable(headers, rows, 'is-payment-table service-order-payment-table'))
            + renderSection('支付日志', logs.length ? renderLogs(logs) : renderEmpty('receipt_long', '暂无支付记录', '未到付款节点的期次不会生成支付流水。'));
    }

    function renderEvaluationInformation(detail) {
        var evaluation = detail.evaluation;
        if (!evaluation) return renderSection('评价信息', renderEmpty('star', '需求方暂未评价', '服务履约完成并完成全部付款后，需求方可对本次交易进行评价。'));
        var stars = '';
        for (var index = 1; index <= 5; index += 1) stars += materialIcon(index <= evaluation.score ? 'star' : 'star_border');
        return renderSection('评价信息', renderInfoGrid([
            { label: '评分', html: '<span class="supplier-order-detail-stars" aria-label="' + evaluation.score + '星">' + stars + '<b>' + evaluation.score + '.0</b></span>' },
            { label: '评价时间', value: evaluation.time },
            { label: '评价内容', value: evaluation.content, full: true },
            { label: '是否公开', value: evaluation.visible }
        ]));
    }

    function renderTab(detail, tab) {
        if (tab === 'application') return renderApplicationInformation(detail);
        if (tab === 'contract') return renderContractInformation(detail);
        if (tab === 'payment') return renderPaymentInformation(detail);
        if (tab === 'evaluation') return renderEvaluationInformation(detail);
        return renderOrderInformation(detail);
    }

    function renderRelationDrawer(detail) {
        var contract = detail.contract;
        if (!contract) return '';
        var file = '<div class="supplier-order-detail-file"><span>' + materialIcon('description') + '<span>' + escapeHtml(contract.fileName) + '</span></span>'
            + '<button type="button" data-service-order-demo-action="合同预览">' + materialIcon('visibility') + '<span>预览</span></button>'
            + '<button type="button" data-service-order-demo-action="合同下载">' + materialIcon('download') + '<span>下载</span></button></div>';
        return '<div class="supplier-contract-drawer-mask supplier-order-relation-mask show" data-service-order-relation-close></div>'
            + '<aside class="supplier-contract-drawer supplier-order-relation-drawer service-order-relation-drawer show" role="dialog" aria-modal="true" aria-labelledby="serviceOrderRelationTitle">'
            + '<header class="supplier-contract-drawer-head"><button class="supplier-contract-drawer-close" type="button" aria-label="关闭关联详情" data-service-order-relation-close data-service-order-relation-close-button>' + materialIcon('close') + '</button><h2 id="serviceOrderRelationTitle">关联详情</h2></header>'
            + '<div class="supplier-contract-drawer-body">'
            + renderSection('关联信息', renderInfoGrid([
                { label: '业务类型', value: '服务订单三方合同关联' },
                { label: '关联状态', value: contract.contractStatus },
                { label: '发起方', value: contract.initiatorRole },
                { label: '发起时间', value: contract.initiatedAt },
                { label: '完成时间', value: contract.completedAt },
                { label: '当前节点', value: contract.currentNode },
                { label: '备注', value: contract.remark, full: true }
            ]))
            + renderSection('合同基本信息', renderInfoGrid([
                { label: '合同名称', value: contract.name },
                { label: '合同编号', html: renderCopyValue(contract.number) },
                { label: '合同生效时间', value: contract.effectiveAt },
                { label: '合同失效时间', value: contract.endsAt },
                { label: '合同签署方式', value: contract.signMethod },
                { label: '签署时间', value: contract.signedAt },
                { label: '签约任务编号', html: renderCopyValue(contract.taskId) },
                { label: '三方签署进度', value: contract.signProgress }
            ]))
            + renderSection('合同文件', file)
            + renderSection('签署主体', renderTable(['主体类型', '签署方角色', '签署方名称', '审核/签署状态'], contract.signers, 'is-signer-table'))
            + renderSection('付款与分账条款', renderContractTerms(detail))
            + renderSection('关联日志', renderLogs(contract.logs, true))
            + '</div></aside>';
    }

    function getPrimaryAction(detail) {
        var status = detail.item.status;
        if (detail.parties.role === 'buyer' && /^待支付/.test(status)) return '去支付';
        if (detail.parties.role === 'buyer' && status === '待确认交付') return '确认服务';
        if (detail.parties.role === 'supplier' && status === '待交付') return '服务交付';
        if (detail.parties.role === 'supplier' && (status === '待确认交付' || status === '交易完成')) return '交付详情';
        return '';
    }

    function create(options) {
        options = options || {};
        var panel = options.panel;
        var title = options.titleElement;
        var state = { item: null, tab: 'order', relationOpen: false, open: false, lastFocused: null };
        var toastTimer = null;

        function showToast(message) {
            var toast = panel && panel.querySelector('[data-service-order-detail-toast]');
            if (!toast) return;
            toast.querySelector('span').textContent = message;
            toast.classList.add('show');
            window.clearTimeout(toastTimer);
            toastTimer = window.setTimeout(function () { toast.classList.remove('show'); }, 2200);
        }

        function render() {
            if (!panel || !state.item) return;
            var detail = buildDetail(state.item, options);
            var primaryAction = getPrimaryAction(detail);
            panel.classList.remove('is-order-management', 'is-supplier-order-management', 'is-placeholder', 'is-service-management');
            panel.classList.add('is-supplier-order-detail', 'is-service-order-detail');
            if (title) title.textContent = '服务订单详情';
            document.title = '服务订单详情 - ' + (detail.parties.role === 'buyer' ? '需方中心' : '供方中心');
            panel.innerHTML = '<div class="supplier-order-detail-shell service-order-detail-shell">'
                + '<div class="supplier-order-detail-toolbar"><button class="supplier-order-detail-back" type="button" data-service-order-detail-back>' + materialIcon('arrow_back') + '<span>返回服务订单管理</span></button>'
                + '<div>' + (primaryAction ? '<button class="supplier-order-detail-primary" type="button" data-service-order-detail-action="' + escapeHtml(primaryAction) + '">' + materialIcon(primaryAction === '去支付' ? 'payments' : (primaryAction.indexOf('交付') !== -1 ? 'local_shipping' : 'task_alt')) + '<span>' + escapeHtml(primaryAction) + '</span></button>' : '') + '</div></div>'
                + '<div class="supplier-order-detail-scroll">' + renderSummary(detail) + renderTabs(state.tab)
                + '<div class="supplier-order-detail-panel" role="tabpanel">' + renderTab(detail, state.tab) + '</div></div></div>'
                + (state.relationOpen ? renderRelationDrawer(detail) : '')
                + '<div class="supplier-order-toast" role="status" aria-live="polite" data-service-order-detail-toast>' + materialIcon('check_circle') + '<span></span></div>';
            bind(detail);
        }

        function close() {
            if (!state.open) return;
            state.open = false;
            state.relationOpen = false;
            panel.classList.remove('is-supplier-order-detail', 'is-service-order-detail');
            if (typeof options.onBack === 'function') options.onBack(state.item);
            if (state.lastFocused && typeof state.lastFocused.focus === 'function') state.lastFocused.focus();
        }

        function fallbackCopy(value) {
            var input = document.createElement('textarea');
            input.value = value;
            input.setAttribute('readonly', '');
            input.style.position = 'fixed';
            input.style.opacity = '0';
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
        }

        function bind(detail) {
            var back = panel.querySelector('[data-service-order-detail-back]');
            if (back) back.addEventListener('click', close);

            panel.querySelectorAll('[data-service-order-detail-tab]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.tab = this.dataset.serviceOrderDetailTab;
                    state.relationOpen = false;
                    render();
                });
            });

            var primary = panel.querySelector('[data-service-order-detail-action]');
            if (primary) primary.addEventListener('click', function () {
                var action = this.dataset.serviceOrderDetailAction;
                if (typeof options.onAction === 'function') options.onAction(action, state.item, { refresh: refresh, showToast: showToast });
                else showToast(action + '操作已触发（原型演示）');
            });

            var relation = panel.querySelector('[data-service-order-relation]');
            if (relation) relation.addEventListener('click', function () {
                state.relationOpen = true;
                render();
                window.setTimeout(function () {
                    var closeButton = panel.querySelector('[data-service-order-relation-close-button]');
                    if (closeButton) closeButton.focus();
                }, 0);
            });

            panel.querySelectorAll('[data-service-order-relation-close]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.relationOpen = false;
                    render();
                });
            });

            panel.querySelectorAll('[data-service-order-demo-action]').forEach(function (button) {
                button.addEventListener('click', function () { showToast(this.dataset.serviceOrderDemoAction + '操作已触发（原型演示）'); });
            });

            panel.querySelectorAll('[data-service-order-copy]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var value = this.dataset.serviceOrderCopy || '';
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(value).then(function () { showToast('已复制：' + value); }).catch(function () {
                            fallbackCopy(value);
                            showToast('已复制：' + value);
                        });
                    } else {
                        fallbackCopy(value);
                        showToast('已复制：' + value);
                    }
                });
            });
        }

        function open(item, initialTab, trigger) {
            if (!item) return;
            state.item = item;
            state.tab = DETAIL_TABS.some(function (tab) { return tab.key === initialTab; }) ? initialTab : 'order';
            state.relationOpen = false;
            state.open = true;
            state.lastFocused = trigger || document.activeElement;
            hydrateSnapshot(item, options.role);
            render();
            window.setTimeout(function () {
                var back = panel.querySelector('[data-service-order-detail-back]');
                if (back) back.focus();
            }, 0);
        }

        function refresh(item) {
            if (item) state.item = item;
            if (state.open) render();
        }

        document.addEventListener('keydown', function (event) {
            if (!state.open || event.key !== 'Escape') return;
            if (state.relationOpen) {
                state.relationOpen = false;
                render();
            } else {
                close();
            }
        });

        return { open: open, refresh: refresh, close: close, isOpen: function () { return state.open; }, showToast: showToast };
    }

    window.ServiceOrderDetail = {
        create: create,
        applyContractValues: applyContractValues,
        hydrateSnapshot: hydrateSnapshot,
        saveSnapshot: saveSnapshot
    };
})();
