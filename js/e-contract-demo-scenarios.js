(function () {
    'use strict';

    if (window.EContractDemoScenarios) return;

    var PLATFORM_OPERATOR_NAME = '深圳市龙岗区数据要素交易服务有限公司';
    var BUYER_NAME = '深圳市龙岗智慧产业有限公司';
    var PROVIDER_NAME = '深圳市龙岗数智科技有限公司';
    var SELF_OPERATED_STAGE_CODES = ['buyer_review', 'archived'];
    var STAGES = [
        { code: 'buyer_link', label: '需求方待关联合同', status: '待关联合同', progress: '--', initiatorRole: '需求方', currentActor: '需求方', subStatus: '需求方待提交关联合同' },
        { code: 'provider_link', label: '提供方待关联合同', status: '待关联合同', progress: '--', initiatorRole: '提供方', currentActor: '提供方', subStatus: '提供方待提交关联合同' },
        { code: 'buyer_first_sign', label: '需求方待签署', status: '关联合同签署中', progress: '0/3 已签署', initiatorRole: '需求方', currentActor: '需求方', subStatus: '法大大任务已创建，三方可独立签署；当前需求方待签署' },
        { code: 'provider_first_sign', label: '提供方待签署', status: '关联合同签署中', progress: '0/3 已签署', initiatorRole: '提供方', currentActor: '提供方', subStatus: '法大大任务已创建，三方可独立签署；当前提供方待签署' },
        { code: 'buyer_review', label: '待需求方审核并签署', status: '关联合同签署中', progress: '1/3 已签署', initiatorRole: '提供方', currentActor: '需求方', subStatus: '当前需求方待审核并签署' },
        { code: 'provider_review', label: '待提供方审核并签署', status: '关联合同签署中', progress: '1/3 已签署', initiatorRole: '需求方', currentActor: '提供方', subStatus: '当前提供方待审核并签署' },
        { code: 'operator_review', label: '待运营方审核并签署', status: '关联合同签署中', progress: '2/3 已签署', initiatorRole: '需求方', currentActor: '平台运营方', subStatus: '当前运营方待审核并签署' },
        { code: 'closing', label: '三方签署完成待归档', status: '关联合同签署中', progress: '3/3 已签署', initiatorRole: '提供方', currentActor: '系统处理', subStatus: '三方签署完成，等待任务关闭与最终文件归档' },
        { code: 'archived', label: '签约归档完成', status: '', progress: '3/3 已签署', initiatorRole: '需求方', currentActor: '流程完成', subStatus: '签约任务已关闭，最终文件已下载、校验并归档' },
        { code: 'callback_exception', label: '签署回调异常', status: '关联合同签署中', progress: '1/3 已签署', initiatorRole: '需求方', currentActor: '提供方', subStatus: '提供方签署回调验签失败，等待继续签署' }
    ];

    var PRODUCT_NAMES = [
        '企业经营活力监测数据集', '产业链企业图谱数据产品', '园区企业画像数据集', '交通运行指数数据产品', '公共信用评价数据集',
        '企业风险预警数据产品', '产业空间供需监测数据集', '重点项目运行数据产品', '招商线索分析数据集', '商事主体趋势数据产品'
    ];
    var SERVICE_NAMES = [
        '企业数据资产入表辅导服务', '园区数据治理规划咨询服务', '数据合规评估服务', '企业画像建设实施服务', '数据战略规划咨询服务',
        '数据质量提升实施服务', '公共数据运营合规服务', '数字化转型咨询服务', '数据资产价值评估服务', '数据接口接入实施服务'
    ];

    function pad(value) {
        return String(value).padStart(2, '0');
    }

    function amountText(value) {
        return '¥' + Number(value).toLocaleString('zh-CN');
    }

    function primaryAction(stage, center) {
        var role = center === 'buyer' ? '需求方' : '提供方';
        if (stage.code === 'operator_review') return center === 'supplier' ? '审核并签署' : '';
        if (stage.code === 'closing' || stage.code === 'archived') return '';
        if (stage.code === 'callback_exception') return role === stage.currentActor ? '继续签署' : '';
        if (role !== stage.currentActor) return '';
        if (stage.code.indexOf('_link') !== -1) return '关联合同';
        if (stage.code.indexOf('first_sign') !== -1) return '继续签署';
        if (stage.code.indexOf('_review') !== -1) return '审核并签署';
        return '';
    }

    function reviewerRole(stage) {
        if (stage.code === 'buyer_review') return '需求方';
        if (stage.code === 'provider_review' || stage.code === 'callback_exception') return '提供方';
        if (stage.code === 'operator_review' || stage.code === 'closing' || stage.code === 'archived') return '平台运营方';
        return stage.initiatorRole;
    }

    function buildScenario(type, stage, index) {
        var service = type === 'service';
        var selfOperated = SELF_OPERATED_STAGE_CODES.indexOf(stage.code) !== -1;
        var partyTotal = selfOperated ? 2 : 3;
        var typeCode = service ? 'S' : 'P';
        var orderNo = '20260804' + (service ? '20' : '10') + String(index + 1).padStart(21, '0');
        var amount = (service ? 6000 : 800) + index * (service ? 500 : 100);
        var name = service ? SERVICE_NAMES[index] : PRODUCT_NAMES[index];
        var archivedStatus = service ? '待支付（首次）' : '待支付';
        return {
            id: typeCode + '-' + pad(index + 1),
            type: type,
            stage: stage.code,
            stageLabel: stage.label,
            orderNo: orderNo,
            contractId: 'LG-DEMO-' + typeCode + '-20260804-' + pad(index + 1),
            taskId: stage.code.indexOf('_link') !== -1 ? '--' : 'FDD-DEMO-' + typeCode + '-20260804-' + pad(index + 1),
            name: name,
            itemType: service ? '数据咨询服务' : (index % 2 ? '数据产品' : '数据集'),
            provider: selfOperated ? PLATFORM_OPERATOR_NAME : PROVIDER_NAME,
            demander: BUYER_NAME,
            operator: selfOperated ? '' : PLATFORM_OPERATOR_NAME,
            operationMode: selfOperated ? 'self' : 'thirdParty',
            partyTotal: partyTotal,
            price: service ? (amount + '元/项') : (amount + '元/次'),
            quantity: service ? '1项' : '1次',
            delivery: service ? '报告交付' : (index % 2 ? 'API传输' : '文件传输'),
            amount: amount,
            amountText: amountText(amount),
            appliedAt: '2026-08-' + pad(4 - Math.min(index, 3)) + ' ' + pad(9 + index) + ':10:00',
            status: stage.code === 'archived' ? archivedStatus : stage.status,
            signMode: stage.code.indexOf('_link') !== -1 ? '' : '电子签章',
            initiatorRole: stage.initiatorRole,
            reviewerRole: selfOperated && stage.code === 'archived' ? '需求方' : reviewerRole(stage),
            currentActor: selfOperated && stage.code === 'archived' ? '流程完成' : stage.currentActor,
            contractSubStatus: selfOperated
                ? stage.subStatus.replace(/三方/g, '双方')
                : stage.subStatus,
            signProgress: selfOperated
                ? stage.progress.replace(/\/3/g, '/' + partyTotal).replace('3/2', '2/2')
                : stage.progress,
            taskStatus: stage.code === 'closing'
                ? '三方签署完成，等待任务关闭'
                : (stage.code === 'archived' ? '签约任务已关闭' : (stage.code === 'callback_exception' ? '回调验签失败' : (stage.code.indexOf('_link') !== -1 ? '尚未创建任务' : '签约任务进行中'))),
            hasContract: stage.code.indexOf('_link') === -1,
            esignUnavailableDemo: type === 'product' && stage.code === 'buyer_link',
            demoMode: true
        };
    }

    var SCENARIOS = ['product', 'service'].reduce(function (result, type) {
        return result.concat(STAGES.map(function (stage, index) {
            return buildScenario(type, stage, index);
        }));
    }, []);

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function getOrders(center, type) {
        return SCENARIOS.filter(function (scenario) { return scenario.type === type; }).map(function (scenario) {
            var record = clone(scenario);
            record.contractAmount = scenario.amount;
            record.amount = scenario.amountText;
            record.primaryAction = primaryAction({
                code: scenario.stage,
                currentActor: scenario.currentActor
            }, center);
            if (center === 'buyer') {
                record.orderType = type === 'service' ? '服务订单' : '常规订单';
                record.productType = scenario.itemType;
            } else {
                record.user = scenario.demander;
                if (type === 'product') {
                    record.orderType = '常规订单';
                    record.productType = scenario.itemType;
                } else {
                    record.serviceType = scenario.itemType;
                }
            }
            return record;
        });
    }

    function statusForParty(scenario, role) {
        if (scenario.operationMode === 'self' && role === '平台运营方') return '--';
        var count = parseInt(scenario.signProgress, 10);
        if (scenario.stage === 'archived' || scenario.stage === 'closing') return '已签署';
        if (scenario.stage === 'callback_exception') return role === '提供方' ? '签署异常' : (role === '需求方' ? '已签署' : '待签署');
        if (!Number.isFinite(count)) return '待关联';
        if (count === 0) return '待签署';
        if (count === 1) return role === scenario.initiatorRole ? '已签署' : (role === scenario.currentActor ? '待审核并签署' : '待签署');
        return role === scenario.currentActor ? '待审核并签署' : '已签署';
    }

    function getContracts() {
        return SCENARIOS.filter(function (scenario) { return scenario.hasContract; }).map(function (scenario, index) {
            var service = scenario.type === 'service';
            var archived = scenario.stage === 'archived';
            var closing = scenario.stage === 'closing';
            var exception = scenario.stage === 'callback_exception';
            var contractStatus = archived
                ? '已签署并归档'
                : (closing ? '已签署待归档' : (exception ? '签署异常' : '签署中'));
            var stageSource = service ? [['首期款', 30], ['阶段款', 40], ['尾款', 30]] : [['一次性付款', 100]];
            var selfOperated = scenario.operationMode === 'self';
            var contractPartyLabel = selfOperated ? '双方' : '三方';
            return {
                id: scenario.contractId,
                orderNo: scenario.orderNo,
                name: scenario.name + contractPartyLabel + '交易合同',
                itemName: scenario.name,
                provider: scenario.provider,
                demander: scenario.demander,
                amount: scenario.amount,
                signedAt: archived || closing ? '2026-08-04' : '--',
                effectiveAt: '2026-08-05',
                endsAt: service ? '2027-02-04' : '2027-08-04',
                supplierStatus: statusForParty(scenario, '提供方'),
                buyerStatus: statusForParty(scenario, '需求方'),
                operatorStatus: selfOperated ? '--' : statusForParty(scenario, '平台运营方'),
                signMethod: '电子签章',
                contractStatus: contractStatus,
                signProgress: scenario.signProgress.replace(' 已签署', ''),
                currentNode: scenario.contractSubStatus,
                archiveStatus: archived ? '归档成功' : (closing ? '归档中' : '未归档'),
                evidenceStatus: archived ? '存证成功' : '未存证',
                evidenceNo: archived ? 'BC-DEMO-' + scenario.id : '--',
                fddEvidenceStatus: archived ? '证据已固化' : '未生成',
                fddEvidenceNo: archived ? 'FDD-EV-DEMO-' + scenario.id : '--',
                taskId: scenario.taskId,
                taskStatus: scenario.taskStatus,
                taskCloseStatus: archived ? '关闭成功' : '未关闭',
                finalFileStatus: archived ? '下载并校验成功' : '未生成',
                signingDeadline: '2026-08-31',
                documentMode: '法大大模板生成',
                templateName: service
                    ? '数据服务' + contractPartyLabel + '交易合同（V2.6）'
                    : '数据产品' + contractPartyLabel + '交易合同（V3.2）',
                initiatorRole: scenario.initiatorRole,
                latestException: exception ? '法大大回调验签失败，可由当前处理方继续签署' : '--',
                type: scenario.type,
                source: '订单关联生成',
                remark: '--',
                fileName: scenario.contractId + '.pdf',
                fileSize: (1.6 + index % 4 * 0.2).toFixed(1) + ' MB',
                flowId: 'CF-' + scenario.contractId,
                initiatedAt: scenario.appliedAt,
                updatedAt: '2026-08-04 ' + pad(10 + index % 8) + ':20:00',
                contractAmount: scenario.amount,
                operationMode: scenario.operationMode,
                partyTotal: scenario.partyTotal,
                serviceFeeMode: service ? 'P' : 'G',
                serviceFeeValue: selfOperated ? 0 : (service ? 2.5 : 50),
                paymentMode: service ? 'installment' : 'once',
                paymentStages: stageSource.map(function (stage, stageIndex) {
                    return {
                        periodNo: stageIndex + 1,
                        periodName: stage[0],
                        percent: stage[1],
                        amount: scenario.amount * stage[1] / 100,
                        payStatus: archived && stageIndex === 0 ? '待支付' : '待发起',
                        outTradeNo: ''
                    };
                }),
                demoMode: true,
                demoStage: scenario.stage,
                currentActor: scenario.currentActor
            };
        });
    }

    function ensureOperationModeCoverage(records, options) {
        options = options || {};
        var result = Array.isArray(records) ? records : [];
        var requiredStatuses = Array.isArray(options.requiredStatuses) ? options.requiredStatuses : [];
        var thirdPartyProvider = options.thirdPartyProvider || PROVIDER_NAME;
        var prefix = String(options.orderPrefix || '90').padStart(2, '0').slice(-2);
        var seed = 0;

        function getMode(record) {
            if (record && record.operationMode === 'self') return 'self';
            if (record && record.operationMode === 'thirdParty') return 'thirdParty';
            return String(record && record.provider || '') === PLATFORM_OPERATOR_NAME ? 'self' : 'thirdParty';
        }

        function buildOrderNo() {
            seed += 1;
            return '20260811' + prefix + String(seed).padStart(21, '0');
        }

        function findTemplate(status) {
            return result.find(function (record) { return record.status === status; })
                || (/解除/.test(status) ? result.find(function (record) { return /解除/.test(record.status); }) : null)
                || (/待支付/.test(status) ? result.find(function (record) { return /待支付/.test(record.status); }) : null)
                || result[0];
        }

        function normalizeContractState(record, status, mode) {
            var selfOperated = mode === 'self';
            var partyTotal = selfOperated ? 2 : 3;
            var partyLabel = selfOperated ? '双方' : '三方';
            var noContract = status === '订单退回' || status === '待关联合同';
            var signing = status === '关联合同签署中';
            var approval = status === '关联审批中';

            record.hasContract = !noContract;
            record.contractSnapshot = null;
            record.demoMode = false;
            record.demoStage = '';
            record.primaryAction = '';
            record.taskId = noContract || approval ? '' : 'FDD-COVER-' + String(record.orderNo).slice(-12);
            record.signMode = noContract ? '' : (approval ? '线下签署' : '电子签章');
            record.initiatorRole = noContract ? '' : '提供方';
            record.reviewerRole = signing ? '需求方' : '';
            record.currentActor = noContract ? '' : (signing ? '需求方' : (approval ? '需求方' : '流程完成'));

            if (noContract) {
                record.signProgress = '';
                record.taskStatus = '尚未创建签约任务';
                record.contractSubStatus = status === '待关联合同' ? '等待发起' + partyLabel + '合同关联' : '';
            } else if (approval) {
                record.signProgress = '--';
                record.taskStatus = '等待关联确认';
                record.contractSubStatus = '提供方已提交线下' + partyLabel + '合同，等待需求方确认关联';
            } else if (signing) {
                record.signProgress = '1/' + partyTotal + ' 已签署';
                record.taskStatus = '签约任务进行中';
                record.contractSubStatus = '当前需求方待审核并签署';
            } else {
                record.signProgress = partyTotal + '/' + partyTotal + ' 已签署';
                record.taskStatus = '签约任务已关闭并归档';
                record.contractSubStatus = partyLabel + '签署完成，最终合同已归档';
            }
        }

        function addExample(status, mode) {
            var template = findTemplate(status);
            if (!template) return;
            var record = clone(template);
            record.orderNo = buildOrderNo();
            record.status = status;
            record.appliedAt = '2026-08-11 ' + pad(8 + (seed % 10)) + ':' + pad((seed * 7) % 60) + ':00';
            record.operationMode = mode;
            record.partyTotal = mode === 'self' ? 2 : 3;
            record.provider = mode === 'self' ? PLATFORM_OPERATOR_NAME : thirdPartyProvider;
            normalizeContractState(record, status, mode);
            result.push(record);
        }

        result.forEach(function (record) {
            record.operationMode = getMode(record);
            record.partyTotal = record.operationMode === 'self' ? 2 : 3;
        });

        (options.forceSamples || []).forEach(function (sample) {
            addExample(sample.status, sample.mode);
        });

        requiredStatuses.forEach(function (status) {
            ['self', 'thirdParty'].forEach(function (mode) {
                var exists = result.some(function (record) {
                    return record.status === status && getMode(record) === mode;
                });
                if (!exists) addExample(status, mode);
            });
        });

        return result;
    }

    window.EContractDemoScenarios = {
        getOrders: getOrders,
        getContracts: getContracts,
        ensureOperationModeCoverage: ensureOperationModeCoverage,
        platformOperatorName: PLATFORM_OPERATOR_NAME
    };
})();
