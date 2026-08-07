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
    var CONTRACT_SERVICE_FEE_MODE = 'G';
    var CONTRACT_SERVICE_FEE_VALUE = 50;
    var CURRENT_SUPPLIER_NAME = '深圳市龙岗数智科技有限公司';
    var CURRENT_BUYER_NAME = '深圳市星途科技发展有限公司';
    var PLATFORM_OPERATOR_NAME = '深圳市龙岗区数据要素交易服务有限公司';
    var DETAIL_SAMPLE_ORDER_NO = '2026070817135202700000101149145';
    var DETAIL_TABS = [
        { key: 'order', label: '订单信息' },
        { key: 'application', label: '申请信息' },
        { key: 'contract', label: '合同信息' },
        { key: 'payment', label: '支付信息' },
        { key: 'evaluation', label: '评价信息' }
    ];
    var DELIVERY_TABS = [
        { key: 'basic', label: '基本信息' },
        { key: 'goods', label: '交付物' },
        { key: 'timeline', label: '交付时间轴' },
        { key: 'metering', label: '交付计量' }
    ];
    var DETAIL_STEPS = ['提交订单', '关联合同', '订单支付', '产品交付', '交易完成'];
    var DETAIL_STATUS_STEP = {
        '待关联合同': 1,
        '关联审批中': 1,
        '关联合同签署中': 1,
        '解除审批中': 1,
        '已解除关联': 1,
        '待支付': 2,
        '待交付': 3,
        '待确认交付': 3,
        '交易完成': 4
    };
    var PRODUCT_ORDER_CONFIG = {
        key: 'product',
        menu: 'product-order',
        entityLabel: '产品',
        entityDataLabel: '数据产品',
        pageTitle: '产品订单管理',
        typeKey: 'productType',
        allTypeLabel: '全部产品类型',
        typeLabel: '产品类型',
        typeOptions: ['数据集', '数据产品'],
        contractBusinessType: 'product',
        contractTemplateName: '数据产品三方交易合同（V3.2）',
        deliveryStepLabel: '产品交付',
        centerRole: 'supplier',
        centerTitle: '供方中心',
        currentRoleLabel: '提供方',
        counterpartyRoleLabel: '需求方',
        counterpartyLabel: '使用方',
        currentPartyName: CURRENT_SUPPLIER_NAME
    };
    var ACTIVE_ORDER_CONFIG = PRODUCT_ORDER_CONFIG;
    var CONTRACT_SNAPSHOT_STORAGE_KEY = 'SupplierOrderContractSnapshots:v1';

    function isBuyerCenter() {
        return ACTIVE_ORDER_CONFIG.centerRole === 'buyer';
    }

    function getCurrentRoleLabel() {
        return ACTIVE_ORDER_CONFIG.currentRoleLabel || (isBuyerCenter() ? '需求方' : '提供方');
    }

    function getCounterpartyRoleLabel() {
        return ACTIVE_ORDER_CONFIG.counterpartyRoleLabel || (isBuyerCenter() ? '提供方' : '需求方');
    }

    function getCurrentPartyName() {
        return ACTIVE_ORDER_CONFIG.currentPartyName || (isBuyerCenter() ? CURRENT_BUYER_NAME : CURRENT_SUPPLIER_NAME);
    }

    function getProviderName(record) {
        return isBuyerCenter() ? String(record && record.provider || '--') : getCurrentPartyName();
    }

    function getDemanderName(record) {
        return isBuyerCenter() ? getCurrentPartyName() : String(record && record.user || '--');
    }

    function getCounterpartyName(record) {
        return isBuyerCenter() ? getProviderName(record) : getDemanderName(record);
    }

    function getContractSnapshotStorageKey() {
        return ACTIVE_ORDER_CONFIG.snapshotStorageKey || CONTRACT_SNAPSHOT_STORAGE_KEY;
    }

    function readContractSnapshotStore() {
        try {
            return JSON.parse(window.localStorage.getItem(getContractSnapshotStorageKey()) || '{}') || {};
        } catch (error) {
            return {};
        }
    }

    function getContractSnapshotKey(orderNo) {
        return ACTIVE_ORDER_CONFIG.key + ':' + String(orderNo || '');
    }

    function getSnapshotContractStatus(record) {
        if (!record) return '未关联';
        if (record.status === '关联审批中') return '关联审批中';
        if (record.status === '关联合同签署中') return '签署中';
        if (record.status === '已解除关联') return '已解除关联';
        if (record.status === '待关联合同') return /拒绝|不通过/.test(record.contractSubStatus || '') ? '关联未通过' : '未关联';
        return '已签署并归档';
    }

    function normalizeSignProgress(value) {
        var match = String(value || '').match(/\d+\/3/);
        return match ? match[0] : '--';
    }

    function buildDefaultContractSnapshot(record) {
        var amount = parseMoney(record && record.amount);
        var orderNo = String(record && record.orderNo || '');
        var serial = orderNo.slice(-6) || '000001';
        var signed = getSnapshotContractStatus(record) === '已签署并归档';
        return {
            id: (ACTIVE_ORDER_CONFIG.key === 'resource' ? 'LG-ZY-' : 'LG-C-') + orderNo.slice(0, 8) + '-' + serial,
            name: String(record && record.name || ACTIVE_ORDER_CONFIG.entityDataLabel) + '三方交易合同',
            contractStatus: getSnapshotContractStatus(record),
            signedAt: signed ? String(record.appliedAt || '').slice(0, 10) : '--',
            effectiveAt: signed ? String(record.appliedAt || '').slice(0, 10) : '--',
            endsAt: signed ? '2027-08-05' : '--',
            signMethod: record && record.signMode ? record.signMode : '电子签章',
            signProgress: normalizeSignProgress(record && record.signProgress),
            taskId: record && record.taskId ? record.taskId : ('FDD-' + serial),
            taskStatus: record && record.taskStatus ? record.taskStatus : (signed ? '签约任务已关闭' : '签约任务进行中'),
            currentNode: record && record.contractSubStatus ? record.contractSubStatus : '等待合同关联处理',
            source: '订单关联生成',
            fileName: String(record && record.name || ACTIVE_ORDER_CONFIG.entityDataLabel) + '三方交易合同.pdf',
            provider: getProviderName(record),
            demander: getDemanderName(record),
            amount: amount,
            contractAmount: amount,
            paymentMode: 'once',
            paymentStages: [{ periodNo: 1, periodName: '一次性付款', percent: 100, amount: amount, payStatus: '待发起', outTradeNo: '' }],
            serviceFeeMode: CONTRACT_SERVICE_FEE_MODE,
            serviceFeeValue: CONTRACT_SERVICE_FEE_VALUE,
            initiatedAt: record && record.appliedAt ? record.appliedAt : '--',
            remark: '--',
            documentMode: 'template',
            templateName: ACTIVE_ORDER_CONFIG.contractTemplateName,
            businessType: ACTIVE_ORDER_CONFIG.contractBusinessType,
            initiatorRole: record && record.initiatorRole ? record.initiatorRole : getCurrentRoleLabel(),
            reviewerRole: record && record.reviewerRole ? record.reviewerRole : '',
            currentActor: record && record.currentActor ? record.currentActor : '',
            orderStatus: record && record.status ? record.status : '',
            primaryAction: record && record.primaryAction ? record.primaryAction : '',
            signProgressText: record && record.signProgress ? record.signProgress : '',
            contractSubStatus: record && record.contractSubStatus ? record.contractSubStatus : ''
        };
    }

    function persistContractSnapshot(record, snapshot) {
        if (!record) return null;
        record.contractSnapshot = Object.assign({}, snapshot || record.contractSnapshot || buildDefaultContractSnapshot(record));
        try {
            var store = readContractSnapshotStore();
            store[getContractSnapshotKey(record.orderNo)] = record.contractSnapshot;
            window.localStorage.setItem(getContractSnapshotStorageKey(), JSON.stringify(store));
        } catch (error) {
            // localStorage不可用时，当前页面仍保留合同快照。
        }
        return record.contractSnapshot;
    }

    function removeContractSnapshot(record) {
        if (!record) return;
        record.contractSnapshot = null;
        try {
            var store = readContractSnapshotStore();
            delete store[getContractSnapshotKey(record.orderNo)];
            window.localStorage.setItem(getContractSnapshotStorageKey(), JSON.stringify(store));
        } catch (error) {
            // localStorage不可用时，仅清理当前页面快照。
        }
    }

    function hydrateContractSnapshot(record) {
        if (!record) return;
        var stored = readContractSnapshotStore()[getContractSnapshotKey(record.orderNo)];
        if (stored) {
            record.contractSnapshot = stored;
            if (stored.orderStatus) record.status = stored.orderStatus;
            record.primaryAction = stored.primaryAction || '';
            record.signMode = stored.signMethod || record.signMode;
            record.signProgress = stored.signProgressText || stored.signProgress || record.signProgress;
            record.taskId = stored.taskId || record.taskId;
            record.taskStatus = stored.taskStatus || record.taskStatus;
            record.initiatorRole = stored.initiatorRole || record.initiatorRole;
            record.reviewerRole = stored.reviewerRole || '';
            record.currentActor = stored.currentActor || '';
            record.contractSubStatus = stored.contractSubStatus || stored.currentNode || record.contractSubStatus;
            return;
        }
        if (getScenarioContract(record.orderNo)) return;
        if (record.status !== '待关联合同') record.contractSnapshot = buildDefaultContractSnapshot(record);
    }

    function createContractSnapshot(record, values) {
        var currentRole = getCurrentRoleLabel();
        var counterpartyRole = getCounterpartyRoleLabel();
        var snapshot = Object.assign({}, buildDefaultContractSnapshot(record), {
            id: values.contractNo || buildDefaultContractSnapshot(record).id,
            name: values.contractName || buildDefaultContractSnapshot(record).name,
            contractStatus: values.signing === 'electronic' ? '签署中' : '关联审批中',
            signedAt: values.signing === 'electronic' ? '--' : (values.signedAt || '--'),
            effectiveAt: values.startsAt || '--',
            endsAt: values.endsAt || '--',
            signMethod: values.signing === 'electronic' ? '电子签章' : '线下签署',
            signProgress: values.signing === 'electronic' ? '0/3' : '--',
            taskId: values.taskId || '',
            taskStatus: values.signing === 'electronic' ? '签约任务进行中' : '等待关联确认',
            currentNode: values.signing === 'electronic' ? '签约任务已创建，当前' + currentRole + '待完成签署' : '等待' + counterpartyRole + '确认关联',
            fileName: values.pendingPdfFile || (values.files && values.files[0]) || ((values.contractName || record.name + '三方交易合同') + '.pdf'),
            paymentMode: values.paymentMode || 'once',
            paymentStages: Array.isArray(values.paymentStages) ? values.paymentStages : [],
            serviceFeeMode: values.serviceFeeMode || CONTRACT_SERVICE_FEE_MODE,
            serviceFeeValue: Number.isFinite(Number(values.serviceFeeValue)) ? Number(values.serviceFeeValue) : CONTRACT_SERVICE_FEE_VALUE,
            initiatedAt: new Date().toLocaleString('zh-CN', { hour12: false }),
            remark: values.remark || '--',
            documentMode: values.documentMode || 'offline-file',
            templateName: values.templateName || '',
            initiatorRole: currentRole,
            reviewerRole: values.signing === 'electronic' ? currentRole : counterpartyRole,
            currentActor: values.signing === 'electronic' ? currentRole : counterpartyRole,
            orderStatus: values.signing === 'electronic' ? '关联合同签署中' : '关联审批中',
            primaryAction: values.signing === 'electronic' ? '继续签署' : '撤回关联',
            signProgressText: values.signing === 'electronic' ? '0/3 已签署' : '--',
            contractSubStatus: values.signing === 'electronic'
                ? '签约任务已创建，当前' + currentRole + '待完成签署'
                : currentRole + '已提交线下合同，等待' + counterpartyRole + '确认关联'
        });
        return persistContractSnapshot(record, snapshot);
    }

    function syncContractSnapshotFromRecord(record) {
        if (!record || !record.contractSnapshot) return;
        var snapshot = Object.assign({}, record.contractSnapshot, {
            contractStatus: getSnapshotContractStatus(record),
            signProgress: normalizeSignProgress(record.signProgress),
            taskId: record.taskId || record.contractSnapshot.taskId,
            taskStatus: record.taskStatus || record.contractSnapshot.taskStatus,
            currentNode: record.contractSubStatus || record.contractSnapshot.currentNode,
            reviewerRole: record.reviewerRole || '',
            currentActor: record.currentActor || '',
            initiatorRole: record.initiatorRole || record.contractSnapshot.initiatorRole,
            orderStatus: record.status || '',
            primaryAction: record.primaryAction || '',
            signProgressText: record.signProgress || '',
            contractSubStatus: record.contractSubStatus || ''
        });
        if (snapshot.contractStatus === '已签署并归档') {
            snapshot.signedAt = record.lastSignCallbackAt || snapshot.signedAt || String(record.appliedAt || '').slice(0, 10);
            snapshot.signProgress = '3/3';
        }
        persistContractSnapshot(record, snapshot);
    }

    var ORDER_RECORDS = [
        {
            orderNo: '2026072016421807100000101149001',
            orderType: '常规订单',
            name: '龙岗企业经营画像数据集',
            productType: '数据集',
            user: '深圳市星途科技发展有限公司',
            price: '300元/次',
            quantity: '1次',
            delivery: '文件传输',
            amount: '¥300',
            appliedAt: '2026-07-20 16:42:18',
            status: '待关联合同'
        },
        {
            orderNo: '2026071915384202300000101149016',
            orderType: '常规订单',
            name: '园区企业能耗趋势分析报告',
            productType: '数据产品',
            user: '龙岗区绿色产业运营有限公司',
            price: '800元/份',
            quantity: '1份',
            delivery: '人工交付',
            amount: '¥800',
            appliedAt: '2026-07-19 15:38:42',
            status: '待关联合同'
        },
        {
            orderNo: '2026071811043608500000101149032',
            orderType: '常规订单',
            name: '商事主体活跃度监测数据产品',
            productType: '数据产品',
            user: '深圳市清澜企业服务有限公司',
            price: '120元/次',
            quantity: '2次',
            delivery: 'API传输',
            amount: '¥240',
            appliedAt: '2026-07-18 11:04:36',
            status: '关联审批中'
        },
        {
            orderNo: '2026071717251106400000101149048',
            orderType: '常规订单',
            name: '龙岗区交通运行拥堵指数服务',
            productType: '数据产品',
            user: '龙岗智慧交通科技有限公司',
            price: '50元/天',
            quantity: '30天',
            delivery: 'API传输',
            amount: '¥1500',
            appliedAt: '2026-07-17 17:25:11',
            status: '关联合同签署中'
        },
        {
            orderNo: '2026071613195704200000101149064',
            orderType: '常规订单',
            name: '企业信用风险监测数据集',
            productType: '数据集',
            user: '深圳市龙岗产业投资服务有限公司',
            price: '100元/次',
            quantity: '5次',
            delivery: '文件传输',
            amount: '¥500',
            appliedAt: '2026-07-16 13:19:57',
            status: '待支付'
        },
        {
            orderNo: '2026071510502409600000101149081',
            orderType: '常规订单',
            name: '产业园区空间信息数据集',
            productType: '数据集',
            user: '龙岗区园区运营管理有限公司',
            price: '200元/月',
            quantity: '3月',
            delivery: 'API传输',
            amount: '¥600',
            appliedAt: '2026-07-15 10:50:24',
            status: '解除审批中'
        },
        {
            orderNo: '2026071418360901800000101149097',
            orderType: '常规订单',
            name: '惠企政策智能匹配数据服务',
            productType: '数据产品',
            user: '深圳市龙岗企业服务集团有限公司',
            price: '60元/次',
            quantity: '10次',
            delivery: 'API传输',
            amount: '¥600',
            appliedAt: '2026-07-14 18:36:09',
            status: '已解除关联'
        },
        {
            orderNo: '2026071214075305700000101149113',
            orderType: '常规订单',
            name: '公共信用评价数据产品',
            productType: '数据产品',
            user: '深圳市数治咨询服务有限公司',
            price: '500元/份',
            quantity: '1份',
            delivery: '人工交付',
            amount: '¥500',
            appliedAt: '2026-07-12 14:07:53',
            status: '待交付'
        },
        {
            orderNo: '2026071016243803300000101149129',
            orderType: '常规订单',
            name: '重点项目运行监测数据产品',
            productType: '数据产品',
            user: '龙岗区重点项目服务中心',
            price: '300元/月',
            quantity: '2月',
            delivery: 'API传输',
            amount: '¥600',
            appliedAt: '2026-07-10 16:24:38',
            status: '待确认交付'
        },
        {
            orderNo: '2026070817135202700000101149145',
            orderType: '常规订单',
            name: '产业招商线索分析数据集',
            productType: '数据集',
            user: '深圳市龙岗招商服务有限公司',
            price: '1000元/份',
            quantity: '1份',
            delivery: '文件传输',
            amount: '¥1000',
            appliedAt: '2026-07-08 17:13:52',
            status: '交易完成'
        },
        {
            orderNo: '2026070715011305100000101149161',
            orderType: '常规订单',
            name: '园区企业经营趋势分析报告',
            productType: '数据产品',
            user: '龙岗数智产业研究院有限公司',
            price: '600元/份',
            quantity: '1份',
            delivery: '人工交付',
            amount: '¥600',
            appliedAt: '2026-07-07 15:01:13',
            status: '交易完成'
        },
        {
            orderNo: '2026070613374208200000101149177',
            orderType: '常规订单',
            name: '龙岗区企业纳税信用评级数据',
            productType: '数据集',
            user: '深圳市星途科技发展有限公司',
            price: '100元/次',
            quantity: '1次',
            delivery: '文件传输',
            amount: '¥100',
            appliedAt: '2026-07-06 13:37:42',
            status: '待确认交付'
        },
        {
            orderNo: '2026070511460904900000101149193',
            orderType: '常规订单',
            name: '产业链企业关联关系数据产品',
            productType: '数据产品',
            user: '龙岗区产业发展研究中心',
            price: '180元/次',
            quantity: '3次',
            delivery: 'API传输',
            amount: '¥540',
            appliedAt: '2026-07-05 11:46:09',
            status: '待交付'
        },
        {
            orderNo: '2026070419400401500000101149209',
            orderType: '常规订单',
            name: '企业诉求热点分析数据集',
            productType: '数据集',
            user: '深圳市政务服务数据中心',
            price: '80元/次',
            quantity: '2次',
            delivery: 'API传输',
            amount: '¥160',
            appliedAt: '2026-07-04 19:40:04',
            status: '待支付'
        },
        {
            orderNo: '2026070314261807300000101149225',
            orderType: '常规订单',
            name: '龙岗区从业人员结构分析数据',
            productType: '数据产品',
            user: '深圳市人力资源数据服务中心',
            price: '200元/份',
            quantity: '1份',
            delivery: '人工交付',
            amount: '¥200',
            appliedAt: '2026-07-03 14:26:18',
            status: '关联合同签署中'
        },
        {
            orderNo: '2026070211093702400000101149241',
            orderType: '常规订单',
            name: '龙岗区产业用房供需监测数据产品',
            productType: '数据产品',
            user: '龙岗区产业空间服务有限公司',
            price: '200元/天',
            quantity: '7天',
            delivery: 'API传输',
            amount: '¥1400',
            appliedAt: '2026-07-02 11:09:37',
            status: '关联审批中'
        },
        {
            orderNo: '2026070110184309100000101149257',
            orderType: '常规订单',
            name: '园区企业基础登记信息数据产品',
            productType: '数据集',
            user: '龙岗区企业服务集团有限公司',
            price: '100元/次',
            quantity: '1次',
            delivery: '文件传输',
            amount: '¥100',
            appliedAt: '2026-07-01 10:18:43',
            status: '待关联合同'
        },
        {
            orderNo: '2026063016372506600000101149273',
            orderType: '常规订单',
            name: '区域商业活力监测数据集',
            productType: '数据集',
            user: '深圳市龙岗商业发展有限公司',
            price: '150元/次',
            quantity: '2次',
            delivery: 'API传输',
            amount: '¥300',
            appliedAt: '2026-06-30 16:37:25',
            status: '待关联合同'
        },
        {
            orderNo: '2026062913550803800000101149289',
            orderType: '常规订单',
            name: '企业经营风险预警数据服务',
            productType: '数据产品',
            user: '深圳市企业征信服务有限公司',
            price: '90元/次',
            quantity: '5次',
            delivery: 'API传输',
            amount: '¥450',
            appliedAt: '2026-06-29 13:55:08',
            status: '解除审批中'
        },
        {
            orderNo: '2026062811064401200000101149305',
            orderType: '常规订单',
            name: '产业经济月度分析数据产品',
            productType: '数据产品',
            user: '龙岗数智产业研究院有限公司',
            price: '600元/月',
            quantity: '1月',
            delivery: '人工交付',
            amount: '¥600',
            appliedAt: '2026-06-28 11:06:44',
            status: '交易完成'
        },
        {
            orderNo: '2026062710091908400000101149321',
            orderType: '常规订单',
            name: '区域交通出行特征数据集',
            productType: '数据集',
            user: '深圳市龙岗智慧交通有限公司',
            price: '220元/次',
            quantity: '1次',
            delivery: '文件传输',
            amount: '¥220',
            appliedAt: '2026-06-27 10:09:19',
            status: '已解除关联'
        },
        {
            orderNo: '2026062615360705500000101149337',
            orderType: '常规订单',
            name: '重点企业运行监测数据产品',
            productType: '数据产品',
            user: '龙岗区产业运营服务有限公司',
            price: '500元/月',
            quantity: '2月',
            delivery: 'API传输',
            amount: '¥1000',
            appliedAt: '2026-06-26 15:36:07',
            status: '交易完成'
        }
    ];

    var ELECTRONIC_CONTRACT_META = {
        '2026071811043608500000101149032': { signMode: '电子签章', initiatorRole: '需求方', reviewerRole: '提供方', contractSubStatus: '当前提供方待审核并签署', signProgress: '1/3 已签署', taskId: 'FDD-20260718149032', primaryAction: '审核并签署' },
        '2026070211093702400000101149241': { signMode: '电子签章', initiatorRole: '提供方', reviewerRole: '平台运营方', contractSubStatus: '当前运营方待审核并签署', signProgress: '2/3 已签署', taskId: 'FDD-20260702149241', primaryAction: '' },
        '2026071717251106400000101149048': { signMode: '电子签章', initiatorRole: '提供方', reviewerRole: '平台运营方', contractSubStatus: '当前运营方待审核并签署', signProgress: '2/3 已签署', taskId: 'FDD-20260717149048', primaryAction: '审核并签署' },
        '2026070314261807300000101149225': { signMode: '电子签章', initiatorRole: '需求方', reviewerRole: '提供方', contractSubStatus: '审核通过，待完成签署', signProgress: '1/3 已签署', taskId: 'FDD-20260703149225', primaryAction: '继续签署' }
    };

    ORDER_RECORDS.forEach(function (item) {
        if (ELECTRONIC_CONTRACT_META[item.orderNo]) Object.assign(item, ELECTRONIC_CONTRACT_META[item.orderNo]);
    });
    if (window.EContractDemoScenarios) {
        ORDER_RECORDS = window.EContractDemoScenarios.getOrders('supplier', 'product').concat(ORDER_RECORDS);
    }

    function applyElectronicSignResult(record, result, role) {
        if (!record) return '';
        if (result.status !== 'signed') {
            record.contractSubStatus = role + '已拒绝签署，签约任务已终止';
            record.taskStatus = '签约任务已终止';
            record.status = '待关联合同';
            record.primaryAction = '';
            record.currentActor = '流程终止';
            syncContractSnapshotFromRecord(record);
            return role + '已拒绝签署，本次签约任务已停止。';
        }

        var targetCount = Math.min(3, (parseInt(record.signProgress, 10) || 0) + 1);
        record.signProgress = targetCount + '/3 已签署';
        record.lastSignCallbackAt = result.processedAt;
        if (targetCount < 3) {
            record.status = '关联合同签署中';
            record.reviewerRole = '';
            record.currentActor = '其他未签署方';
            record.contractSubStatus = role + '已完成签署，等待其他签署方独立完成';
            record.primaryAction = '';
            syncContractSnapshotFromRecord(record);
            return role + '签署成功回调已确认，其他签署方可独立完成签署。';
        }
        record.status = '待支付';
        record.reviewerRole = '';
        record.currentActor = '需求方';
        record.contractSubStatus = '三方签署完成，最终合同已归档，等待需求方支付';
        record.taskStatus = '签约任务已关闭并归档';
        record.primaryAction = '';
        syncContractSnapshotFromRecord(record);
        return role + '签署成功回调已确认，三方合同已归档，订单进入待支付。';
    }

    var ACTIONS_BY_STATUS = {
        '待关联合同': [
            ['关联合同', 'contract'],
            ['订单详情', 'detail']
        ],
        '关联审批中': [
            ['撤回关联', 'withdraw'],
            ['订单详情', 'detail']
        ],
        '关联合同签署中': [
            ['继续签署', 'sign'],
            ['订单详情', 'detail']
        ],
        '待支付': [
            ['解除关联合同', 'unlink'],
            ['订单详情', 'detail']
        ],
        '解除审批中': [
            ['订单详情', 'detail']
        ],
        '已解除关联': [
            ['关联合同', 'contract'],
            ['订单详情', 'detail']
        ],
        '待交付': [
            ['交付详情', 'delivery'],
            ['订单详情', 'detail']
        ],
        '待确认交付': [
            ['交付详情', 'delivery'],
            ['订单详情', 'detail']
        ],
        '交易完成': [
            ['交付详情', 'delivery'],
            ['订单详情', 'detail']
        ]
    };

    var ICON_PATHS = {
        search: '<path d="M9.5 3a6.5 6.5 0 0 1 5.16 10.45l4.45 4.44-1.42 1.42-4.44-4.45A6.5 6.5 0 1 1 9.5 3zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"/>',
        filter: '<path d="M3 5h18l-7 8v5l-4 2v-7L3 5zm4.4 2 4.6 5.25V17l1-.5v-4.25L17.6 7H7.4z"/>',
        reset: '<path d="M12 5V2L7 7l5 5V7a5 5 0 1 1-4.55 7.06l-1.82.83A7 7 0 1 0 12 5z"/>',
        cancel: '<path d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5z"/>',
        dispute: '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>',
        approve: '<path d="M9 16.2 5.5 12.7 4.1 14.1 9 19 20.3 7.7l-1.4-1.4L9 16.2z"/>',
        contract: '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-5 4h8v2H8v-2zm0 4h8v2H8v-2z"/>',
        withdraw: '<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.42-1.41L7.83 13H20v-2z"/>',
        sign: '<path d="m4 17.25 9.85-9.85 2.75 2.75L6.75 20H4v-2.75zM18.7 8.05 15.95 5.3l1.15-1.15a1 1 0 0 1 1.4 0l1.35 1.35a1 1 0 0 1 0 1.4L18.7 8.05z"/>',
        pay: '<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4H4V6h16v2zm-8 8H5v-2h7v2z"/>',
        confirm: '<path d="m9 16.2-3.5-3.5L4.1 14.1 9 19 20.3 7.7l-1.4-1.4L9 16.2z"/>',
        star: '<path d="m12 17.3-6.18 3.73 1.64-7.03L2 9.27l7.19-.61L12 2l2.81 6.66 7.19.61-5.46 4.73 1.64 7.03L12 17.3z"/>',
        unlink: '<path d="M17 7h-3V5h3a5 5 0 0 1 0 10h-3v-2h3a3 3 0 0 0 0-6zM7 7a3 3 0 0 0 0 6h3v2H7A5 5 0 0 1 7 5h3v2H7zm1 4h8v2H8v-2zM4.7 3.3l16 16-1.4 1.4-16-16 1.4-1.4z"/>',
        delivery: '<path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2a3 3 0 0 0 6 0h6a3 3 0 0 0 6 0h2v-5l-3-4zM6 18.5A1.5 1.5 0 1 1 6 15a1.5 1.5 0 0 1 0 3.5zM15 15H9a3 3 0 0 0-6 0V6h12v9zm3 3.5a1.5 1.5 0 1 1 0-3.5 1.5 1.5 0 0 1 0 3.5zm3-3.5a3 3 0 0 0-4-2.83V10h2l2 3v2z"/>',
        detail: '<path d="M12 5c5 0 8.4 4.2 9.5 7-1.1 2.8-4.5 7-9.5 7S3.6 14.8 2.5 12C3.6 9.2 7 5 12 5zm0 2c-3.6 0-6.2 2.7-7.3 5 1.1 2.3 3.7 5 7.3 5s6.2-2.7 7.3-5C18.2 9.7 15.6 7 12 7zm0 2.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6z"/>',
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

    function hasAssociatedContract(item) {
        return Boolean(item && item.status !== '订单退回' && item.status !== '待关联合同');
    }

    function ensureOrderSignModes(records) {
        records.forEach(function (item, index) {
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

    function getOrderText(productText, resourceText) {
        return ACTIVE_ORDER_CONFIG.key === 'resource' ? resourceText : productText;
    }

    function getItemType(item) {
        return item[ACTIVE_ORDER_CONFIG.typeKey] || item.productType || item.resourceType || '--';
    }

    function materialIcon(name) {
        return '<span class="material-symbols-outlined" aria-hidden="true">' + escapeHtml(name) + '</span>';
    }

    function parseMoney(value) {
        var normalized = String(value == null ? '' : value).replace(/[^0-9.-]/g, '');
        return Number(normalized) || 0;
    }

    function formatMoney(value) {
        return '¥' + Number(value || 0).toLocaleString('zh-CN', {
            minimumFractionDigits: Number(value || 0) % 1 ? 2 : 0,
            maximumFractionDigits: 2
        });
    }

    function getMeasureMode(price) {
        var value = String(price || '');
        if (value.indexOf('/天') !== -1 || value.indexOf('/月') !== -1 || value.indexOf('/年') !== -1) return '按周期';
        if (value.indexOf('/次') !== -1) return '按次数';
        if (value.indexOf('/份') !== -1) return '按份数';
        return '按订购量';
    }

    function addMinutes(dateText, minutes) {
        var match = String(dateText || '').match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})(?::(\d{2}))?/);
        if (!match) return dateText || '--';
        var value = new Date(
            Number(match[1]),
            Number(match[2]) - 1,
            Number(match[3]),
            Number(match[4]),
            Number(match[5]),
            Number(match[6] || 0)
        );
        value.setMinutes(value.getMinutes() + Number(minutes || 0));
        function pad(number) { return String(number).padStart(2, '0'); }
        return value.getFullYear() + '-' + pad(value.getMonth() + 1) + '-' + pad(value.getDate())
            + ' ' + pad(value.getHours()) + ':' + pad(value.getMinutes()) + ':' + pad(value.getSeconds());
    }

    function getDeliveryModeKey(item) {
        if (item.delivery === 'API传输') return 'api';
        return 'file';
    }

    function getDeliveryTabs() {
        return DELIVERY_TABS;
    }

    function getDetailStepIndex(status) {
        return Object.prototype.hasOwnProperty.call(DETAIL_STATUS_STEP, status) ? DETAIL_STATUS_STEP[status] : 0;
    }

    function getScenarioContract(orderNo) {
        if (!window.EContractDemoScenarios || !window.EContractDemoScenarios.getContracts) return null;
        return window.EContractDemoScenarios.getContracts().find(function (contract) {
            return contract.orderNo === orderNo;
        }) || null;
    }

    function getOrderBill(orderNo) {
        if (typeof ACTIVE_ORDER_CONFIG.getOrderBill === 'function') {
            return ACTIVE_ORDER_CONFIG.getOrderBill(orderNo) || null;
        }
        if (isBuyerCenter()) return null;
        if (!window.TransactionBillDemoData || !window.TransactionBillDemoData.getSupplierReceivables) return null;
        return window.TransactionBillDemoData.getSupplierReceivables(getCurrentPartyName()).find(function (bill) {
            return bill.orderNo === orderNo;
        }) || null;
    }

    function buildApplicationDetail(item) {
        var serial = String(item.orderNo || '').slice(-12);
        var datasetFields = [
            ['企业名称', '企业登记名称', '字符串', '200'],
            ['统一社会信用代码', '企业唯一身份标识', '字符串', '18'],
            ['行业分类', '国民经济行业分类名称', '字符串', '100'],
            ['所属区域', '企业登记所属行政区域', '字符串', '100']
        ];
        var resourceFields = [
            ['记录编号', '资源记录唯一标识', '字符串', '64'],
            ['统计时间', '资源数据统计时间', '日期时间', '20'],
            ['所属区域', '资源数据所属行政区域', '字符串', '100'],
            ['指标值', '资源数据业务指标值', '字符串', '500']
        ];
        var productFields = [
            ['指标名称', getOrderText('产品结果指标名称', '资源数据指标名称'), '字符串', '200'],
            ['指标值', getOrderText('产品分析结果值', '资源数据指标值'), '字符串', '500'],
            ['统计周期', '结果对应统计周期', '日期', '20']
        ];
        var logs = [
            {
                role: '业务认证用户-数据需求方角色',
                type: '提交订单',
                result: '成功',
                content: '已提交' + ACTIVE_ORDER_CONFIG.entityLabel + '购买申请',
                time: item.appliedAt
            }
        ];
        var application = {
            intendedPrice: item.amount,
            industry: item.name.indexOf('交通') !== -1 ? '交通运输业' : '制造业',
            scene: item.name.indexOf('园区') !== -1 ? '园区运营分析' : '产业分析',
            purpose: '数据分析',
            demanderConnectorId: 'LG-DEM-' + serial,
            supplierConnectorId: 'LG-SUP-' + serial,
            fields: ACTIVE_ORDER_CONFIG.key === 'resource' ? resourceFields : (getItemType(item) === '数据集' ? datasetFields : productFields),
            validPeriod: '2026-07-08 至 2027-07-07',
            ipWhitelist: '10.20.31.0/24',
            accessLimit: '1000次/日',
            usageMode: '正式使用',
            logs: logs
        };
        if (item.orderNo === DETAIL_SAMPLE_ORDER_NO) {
            application.intendedPrice = '¥1,000';
            application.industry = '制造业';
            application.scene = '产业招商';
            application.purpose = '企业线索分析';
            application.demanderConnectorId = 'LG-DEM-20260708-01378';
            application.supplierConnectorId = 'LG-SUP-20260708-00861';
            application.validPeriod = '2026-07-08 至 2027-07-07';
            application.ipWhitelist = '10.20.31.0/24';
            application.accessLimit = '1000次/日';
            application.logs = [
                { role: '业务认证用户-数据需求方角色', type: '提交订单', result: '成功', content: '已提交产业招商线索分析数据集购买申请', time: '2026-07-08 17:13:53' }
            ];
        }
        return application;
    }

    function buildContractDetail(item, source, amountValue) {
        if (item.status === '待关联合同' || item.hasContract === false) return null;

        var contract;
        if (source) {
            contract = {
                name: source.name,
                number: source.id,
                status: source.contractStatus,
                signedAt: source.signedAt,
                effectiveAt: source.effectiveAt,
                endsAt: source.endsAt,
                signMethod: source.signMethod,
                signProgress: source.signProgress,
                taskId: source.taskId,
                taskStatus: source.taskStatus,
                currentNode: source.currentNode,
                source: source.source,
                fileName: source.fileName,
                provider: source.provider,
                demander: source.demander,
                operator: PLATFORM_OPERATOR_NAME,
                amount: Number(source.contractAmount || source.amount || amountValue),
                paymentMode: source.paymentMode,
                paymentStages: source.paymentStages || [],
                serviceFeeMode: source.serviceFeeMode,
                serviceFeeValue: source.serviceFeeValue,
                initiatedAt: source.initiatedAt,
                completedAt: source.signedAt,
                remark: source.remark || '--',
                initiatorRole: source.initiatorRole || item.initiatorRole || getCurrentRoleLabel(),
                reviewerRole: source.reviewerRole || item.reviewerRole || getCounterpartyRoleLabel()
            };
        } else {
            var serial = String(item.orderNo || '').slice(-6);
            var signed = getDetailStepIndex(item.status) >= 2;
            contract = {
                name: item.name + '三方交易合同',
                number: (ACTIVE_ORDER_CONFIG.key === 'resource' ? 'LG-ZY-' : 'LG-C-') + String(item.orderNo || '').slice(0, 8) + '-' + serial,
                status: item.status === '已解除关联' ? '已解除关联' : (signed ? '已签署并归档' : '关联审批中'),
                signedAt: signed ? String(item.appliedAt || '').slice(0, 10) : '--',
                effectiveAt: signed ? String(item.appliedAt || '').slice(0, 10) : '--',
                endsAt: signed ? '2027-07-07' : '--',
                signMethod: item.signMode || '电子签章',
                signProgress: signed ? '3/3' : (item.signProgress || '1/3'),
                taskId: item.taskId || ('FDD-' + serial),
                taskStatus: signed ? '签约任务已关闭' : (item.taskStatus || '签约任务进行中'),
                currentNode: item.contractSubStatus || (signed ? '三方签署完成并归档' : '等待关联审批'),
                source: '订单关联生成',
                fileName: item.name + '三方交易合同.pdf',
                provider: getProviderName(item),
                demander: getDemanderName(item),
                operator: PLATFORM_OPERATOR_NAME,
                amount: amountValue,
                paymentMode: 'once',
                paymentStages: [],
                serviceFeeMode: CONTRACT_SERVICE_FEE_MODE,
                serviceFeeValue: CONTRACT_SERVICE_FEE_VALUE,
                initiatedAt: item.appliedAt,
                completedAt: signed ? item.appliedAt : '--',
                remark: '--',
                initiatorRole: item.initiatorRole || getCurrentRoleLabel(),
                reviewerRole: item.reviewerRole || getCounterpartyRoleLabel()
            };
        }

        if (item.orderNo === DETAIL_SAMPLE_ORDER_NO) {
            contract.name = '产业招商线索分析数据集三方交易合同';
            contract.number = 'LG-C-20260708-001';
            contract.status = '已签署并归档';
            contract.signedAt = '2026-07-08';
            contract.effectiveAt = '2026-07-08';
            contract.endsAt = '2027-07-07';
            contract.signMethod = '电子签章';
            contract.signProgress = '3/3';
            contract.taskId = 'FDD-20260708149145';
            contract.taskStatus = '签约任务已关闭';
            contract.currentNode = '三方签署完成并归档';
            contract.fileName = '产业招商线索分析数据集三方交易合同.pdf';
            contract.initiatedAt = '2026-07-08 17:15:23';
            contract.completedAt = '2026-07-08 17:15:48';
            contract.paymentMode = 'once';
            contract.serviceFeeMode = 'P';
            contract.serviceFeeValue = 3;
        }

        contract.logs = [
            {
                node: '关联审核',
                role: contract.reviewerRole,
                result: contract.status === '关联审批中' ? '待处理' : (contract.status === '已解除关联' ? '已解除' : '通过'),
                time: contract.status === '关联审批中' ? '--' : contract.completedAt,
                opinion: '--'
            },
            { node: '发起关联', role: contract.initiatorRole, result: '已发起', time: contract.initiatedAt, opinion: '--' }
        ];
        return contract;
    }

    function buildPaymentDetail(item, contract, bill, amountValue) {
        var stepIndex = getDetailStepIndex(item.status);
        if (!bill && stepIndex < 2) return null;

        var sourceStages = bill && Array.isArray(bill.paymentStages) && bill.paymentStages.length
            ? bill.paymentStages
            : (contract && Array.isArray(contract.paymentStages) && contract.paymentStages.length ? contract.paymentStages : []);
        var serviceFeeMode = bill ? bill.serviceFeeMode : (contract ? contract.serviceFeeMode : CONTRACT_SERVICE_FEE_MODE);
        var serviceFeeValue = Number(bill ? bill.serviceFeeValue : (contract ? contract.serviceFeeValue : CONTRACT_SERVICE_FEE_VALUE)) || 0;
        var paymentMode = bill ? bill.payMode : (contract && contract.paymentMode === 'installment' ? '分期付款' : '一次性付款');
        var completed = item.status === '交易完成' || item.status === '待交付' || item.status === '待确认交付';
        if (!sourceStages.length) {
            sourceStages = [{
                name: '一次性付款',
                percent: '100%',
                amount: amountValue,
                node: '合同签署后',
                status: completed ? '已支付' : '待支付',
                payment: completed ? {
                    paymentNo: 'PAY-' + String(item.orderNo || '').slice(-16),
                    channel: '统一支付平台',
                    paidAt: item.appliedAt,
                    status: '支付成功'
                } : null
            }];
        }

        var receivedAmount = 0;
        var expectedFee = 0;
        var rows = sourceStages.map(function (stage, index) {
            var stageAmount = parseMoney(stage.amount);
            var status = stage.status || stage.payStatus || '待发起';
            var payment = stage.payment || null;
            var paid = Boolean(payment) || status === '已支付' || status === '支付成功';
            var fee = payment && payment.split ? parseMoney(payment.split.fee) : (serviceFeeMode === 'P' ? stageAmount * serviceFeeValue / 100 : serviceFeeValue);
            var netAmount = payment && payment.split ? parseMoney(payment.split.netAmount) : Math.max(0, stageAmount - fee);
            expectedFee += fee;
            if (paid) receivedAmount += stageAmount;
            return {
                index: index + 1,
                name: stage.name || stage.periodName || ('第' + (index + 1) + '期'),
                percent: typeof stage.percent === 'number' ? stage.percent + '%' : (stage.percent || '--'),
                amount: stageAmount,
                node: stage.node || '按合同约定',
                status: status,
                paymentNo: payment ? payment.paymentNo : '--',
                channel: payment ? payment.channel : (bill && bill.payMode === '线下支付' ? '线下支付' : '--'),
                paidAt: payment ? payment.paidAt : (bill && bill.paidAt && bill.paidAt !== '--' ? bill.paidAt : '--'),
                fee: fee,
                netAmount: netAmount,
                splitStatus: payment && payment.split ? payment.split.status : (paid ? '待分账' : '--')
            };
        });

        var logs = [];
        rows.forEach(function (row) {
            if (row.paidAt === '--') return;
            logs.push({
                role: '统一支付平台',
                type: '支付到账',
                result: '成功',
                content: isBuyerCenter() ? row.name + '已完成支付' : row.name + '已完成支付并进入分账处理',
                time: row.paidAt
            });
        });
        if (!logs.length) {
            logs.push({ role: '系统', type: '生成支付计划', result: '成功', content: '等待需求方完成付款', time: item.appliedAt });
        }

        return {
            paymentMode: paymentMode,
            status: bill ? bill.status : (completed ? '已结清' : '待支付'),
            orderAmount: Number(bill && bill.orderAmount ? parseMoney(bill.orderAmount) : amountValue),
            receivedAmount: receivedAmount,
            serviceFeeMode: serviceFeeMode,
            serviceFeeValue: serviceFeeValue,
            serviceFee: expectedFee,
            netAmount: Math.max(0, amountValue - expectedFee),
            rows: rows,
            logs: logs
        };
    }

    function buildOrderDetail(item) {
        var amountValue = parseMoney(item.amount);
        var sourceContract = item.contractSnapshot || getScenarioContract(item.orderNo);
        var contract = buildContractDetail(item, sourceContract, amountValue);
        var bill = getOrderBill(item.orderNo);
        var payment = buildPaymentDetail(item, contract, bill, amountValue);
        var completed = item.status === '交易完成';
        var rating = item.rating || (!isBuyerCenter() && completed && item.orderNo !== DETAIL_SAMPLE_ORDER_NO ? {
            score: 5,
            content: '数据口径清晰，交付及时，能够满足本次业务分析需要。',
            time: '2026-07-12 10:23:16',
            visible: '是'
        } : null);

        return {
            item: item,
            amountValue: amountValue,
            provider: sourceContract ? sourceContract.provider : getProviderName(item),
            operator: PLATFORM_OPERATOR_NAME,
            measureMode: getMeasureMode(item.price),
            stepIndex: getDetailStepIndex(item.status),
            application: buildApplicationDetail(item),
            contract: contract,
            payment: payment,
            rating: rating,
            currentDescription: item.contractSubStatus || (item.status === '交易完成' ? '订单已完成支付、交付与确认' : '当前订单处于' + item.status + '阶段')
        };
    }

    function buildDeliveryDetail(item) {
        var orderDetail = buildOrderDetail(item);
        var application = orderDetail.application;
        var mode = getDeliveryModeKey(item);
        var orderNo = String(item.orderNo || '');
        var serial = orderNo.slice(-12);
        var createdAt = addMinutes(item.appliedAt, 30);
        var submitted = item.status === '待确认交付' || item.status === '交易完成';
        var completed = item.status === '交易完成';
        var submittedAt = submitted ? addMinutes(createdAt, 38) : '--';
        var stage = completed ? '交付完成' : (submitted ? '待确认交付' : '交付中');
        var taskNo = '02' + orderNo;
        var timeline = [
            { title: '交付阶段更新为' + stage, description: '交付阶段变为【' + stage + '】', time: completed ? addMinutes(submittedAt, 1) : (submitted ? submittedAt : createdAt) },
            { title: '供方完成交付', description: '供方手动完成交付，操作人：张辰', time: submitted ? submittedAt : '--' },
            { title: '交付阶段信息上报', description: '状态上报给业务节点', time: submitted ? submittedAt : createdAt },
            { title: '合约规则引擎执行', description: '合约规则引擎执行成功', time: submitted ? addMinutes(submittedAt, -1) : createdAt },
            { title: '合约规则引擎执行', description: '合约规则引擎执行开始', time: submitted ? addMinutes(submittedAt, -1) : createdAt },
            { title: '数据传输（' + (mode === 'api' ? 'API' : '文件') + '）', description: mode === 'api' ? '为需方连接器生成AK/SK，生成使用文档成功，交付状态变为：【使用中】' : '交付文件传输完成', time: submitted ? addMinutes(submittedAt, -7) : createdAt },
            { title: '供方连接器响应协商', description: '供方连接器响应协商成功，传输id：37d686736fae40e4b22e141f7882e9c2，交付状态变为：【交付物传输中】', time: addMinutes(createdAt, 1) },
            { title: '连接器自动获取交付任务', description: '供方连接器定期接收交付任务，交付阶段：【交付中】', time: createdAt },
            { title: '交付阶段信息上报', description: '状态上报给业务节点', time: createdAt },
            { title: '交付阶段更新为交付中', description: '交付阶段变为【交付中】，交付状态变为：【交付待协商】', time: createdAt },
            { title: '交付任务创建', description: '订单支付完成，系统创建交付任务', time: createdAt }
        ].filter(function (event) { return event.time !== '--'; });

        return {
            item: item,
            mode: mode,
            taskNo: taskNo,
            stage: stage,
            createdAt: String(createdAt).slice(0, 16),
            productId: '60' + orderNo.slice(0, 12) + serial + 'ABCHD10QVJ0T',
            demanderConnectorId: application.demanderConnectorId,
            supplierConnectorId: application.supplierConnectorId,
            businessNodeName: '流通利用平台',
            businessNodeId: '41234567899876543210018XKTB1KZF',
            digitalContractName: 'DC-' + orderNo,
            digitalContractId: '5291330114MA2KL9LU' + serial + 'D7IDoamXM',
            file: {
                path: 'oss/default-oss',
                name: '交付数据文件-数据样例.' + (getItemType(item) === '数据集' ? 'xlsx' : (getItemType(item) === '数据库' ? 'csv' : 'pdf')),
                size: '9.85KB'
            },
            api: {
                serviceName: ACTIVE_ORDER_CONFIG.key === 'resource' ? item.name + '_API' : '外部注册数据服务_6058',
                method: 'GET',
                format: 'JSON',
                protocol: 'http',
                encoding: 'UTF-8',
                averageTime: '9ms',
                endpoint: 'http://172.16.120.46:8090/gateway/ozjxc/wbzcsjfw_6058',
                apiKey: '应用的secretid的值',
                token: 'id8YG9Q4xsO7bQd3bSSWZc8GXM7ZrQMA',
                requestParams: [
                    ['areaCode', '区域编码', 'String', '是', '440307', '龙岗区行政区划代码'],
                    ['statDate', '统计日期', 'Date', '否', '2026-07-07', '格式：YYYY-MM-DD']
                ],
                responseParams: [
                    ['code', '响应状态码', 'Integer', '0', '0 表示调用成功'],
                    ['message', '响应信息', 'String', 'success', '接口响应结果说明'],
                    ['data', '返回数据', 'Object', '{...}', '园区能耗趋势数据']
                ],
                responseExample: '{\n  "code": 0,\n  "message": "success",\n  "data": {\n    "areaCode": "440307",\n    "statDate": "2026-07-07",\n    "energyTrend": "平稳"\n  }\n}'
            },
            metering: {
                mode: getMeasureMode(item.price),
                unit: item.price.indexOf('/天') !== -1 ? '元/天' : (item.price.indexOf('/月') !== -1 ? '元/月' : '元/次'),
                validPeriod: application.validPeriod,
                metrics: [
                    ['交付总次数(次)', '1,000'],
                    ['已调用成功(次)', '126'],
                    ['调用失败(次)', '3'],
                    ['剩余次数(次)', '871'],
                    ['已调用次数(次)', '129'],
                    ['已使用天数(天)', '5'],
                    ['已使用量(B)', '2,475,008']
                ],
                rows: mode === 'api' ? [
                    { index: 1, ip: '172.16.120.31', time: '2026-07-11 10:28:16', status: '调用成功', volume: '18.6KB' },
                    { index: 2, ip: '172.16.120.31', time: '2026-07-10 16:42:09', status: '调用成功', volume: '22.4KB' },
                    { index: 3, ip: '172.16.120.46', time: '2026-07-10 09:15:32', status: '调用失败', volume: '0B' }
                ] : []
            },
            timeline: timeline
        };
    }

    function renderCopyValue(value) {
        return '<span class="supplier-order-detail-copy-value"><span>' + escapeHtml(value) + '</span>'
            + '<button type="button" data-supplier-order-copy="' + escapeHtml(value) + '">' + materialIcon('content_copy') + '<span>复制</span></button></span>';
    }

    function renderDetailInfoGrid(fields, extraClass) {
        return '<div class="supplier-order-detail-info-grid' + (extraClass ? ' ' + extraClass : '') + '">'
            + fields.map(function (field) {
                return '<div class="supplier-order-detail-info-field' + (field.full ? ' is-full' : '') + '">'
                    + '<span>' + escapeHtml(field.label) + '</span>'
                    + '<div>' + (field.html != null ? field.html : escapeHtml(field.value == null || field.value === '' ? '--' : field.value)) + '</div>'
                    + '</div>';
            }).join('')
            + '</div>';
    }

    function renderDetailSection(titleText, content, extraClass) {
        return '<section class="supplier-order-detail-section' + (extraClass ? ' ' + extraClass : '') + '">'
            + '<h3>' + escapeHtml(titleText) + '</h3>'
            + content
            + '</section>';
    }

    function renderDetailCell(cell) {
        if (cell && typeof cell === 'object' && Object.prototype.hasOwnProperty.call(cell, 'html')) return cell.html;
        return escapeHtml(cell == null || cell === '' ? '--' : cell);
    }

    function renderDetailTable(headers, rows, extraClass) {
        return '<div class="supplier-order-detail-table-scroll' + (extraClass ? ' ' + extraClass : '') + '">'
            + '<table class="supplier-order-detail-table"><thead><tr>'
            + headers.map(function (header) { return '<th>' + escapeHtml(header) + '</th>'; }).join('')
            + '</tr></thead><tbody>'
            + rows.map(function (row) {
                return '<tr>' + row.map(function (cell) { return '<td>' + renderDetailCell(cell) + '</td>'; }).join('') + '</tr>';
            }).join('')
            + '</tbody></table></div>';
    }

    function renderDetailLogs(logs, contractMode) {
        if (contractMode) {
            return renderDetailTable(
                ['操作节点', '操作角色', '操作结果', '操作时间', '操作意见'],
                logs.map(function (log) { return [log.node, log.role, log.result, log.time, log.opinion]; }),
                'is-log-table'
            );
        }
        return renderDetailTable(
            ['操作者角色', '操作类型', '操作结果', '内容', '操作时间'],
            logs.map(function (log) { return [log.role, log.type, log.result, log.content, log.time]; }),
            'is-log-table'
        );
    }

    function renderDetailEmpty(iconName, titleText, description) {
        return '<div class="supplier-order-detail-empty">'
            + materialIcon(iconName)
            + '<strong>' + escapeHtml(titleText) + '</strong>'
            + '<p>' + escapeHtml(description) + '</p>'
            + '</div>';
    }

    function renderOrderInformation(detail) {
        var item = detail.item;
        var paymentStatus = detail.payment ? detail.payment.status : '尚未生成支付信息';
        var paymentMode = detail.payment ? detail.payment.paymentMode : '--';
        var paymentOverview = renderDetailTable(
            ['支付方式', '订单金额', '支付状态', '已收金额'],
            [[paymentMode, formatMoney(detail.amountValue), paymentStatus, detail.payment ? formatMoney(detail.payment.receivedAmount) : '--']]
        );
        var productRows = [[
            item.name,
            getItemType(item),
            detail.measureMode,
            item.price,
            item.quantity,
            item.delivery,
            formatMoney(detail.amountValue)
        ]];
        return ''
            + renderDetailSection('基本信息', renderDetailInfoGrid([
                { label: '订单编号', html: renderCopyValue(item.orderNo) },
                { label: '订单类型', value: item.orderType },
                { label: '付费方式', value: detail.payment ? detail.payment.paymentMode : '预付费' },
                { label: '申请时间', value: item.appliedAt },
                { label: '订单状态', html: '<span class="supplier-order-detail-status-text">' + escapeHtml(item.status) + '</span>' },
                { label: '支付状态', value: paymentStatus }
            ]))
            + paymentOverview
            + renderDetailSection('交易主体信息', renderDetailInfoGrid([
                { label: '需求方', value: getDemanderName(item) },
                { label: '提供方', value: detail.provider },
                { label: '平台运营方', value: detail.operator, full: true }
            ], 'is-party-grid'))
            + renderDetailSection(ACTIVE_ORDER_CONFIG.entityLabel + '信息', renderDetailTable(
                [ACTIVE_ORDER_CONFIG.entityLabel + '名称', ACTIVE_ORDER_CONFIG.typeLabel, '计量方式', '价格', '数量', '交付方式', '金额'],
                productRows,
                'is-product-table'
            ) + '<div class="supplier-order-detail-total"><span>商品总价：<strong>' + formatMoney(detail.amountValue) + '</strong></span><span>订单金额：<b>' + formatMoney(detail.amountValue) + '</b></span></div>');
    }

    function renderApplicationInformation(detail) {
        var application = detail.application;
        return ''
            + renderDetailSection('申请信息', renderDetailInfoGrid([
                { label: '意向价格', value: application.intendedPrice },
                { label: '应用行业', value: application.industry },
                { label: '应用场景', value: application.scene },
                { label: '使用目的及方式', value: application.purpose },
                { label: '需方连接器标识', html: renderCopyValue(application.demanderConnectorId) },
                { label: '供方连接器标识', html: renderCopyValue(application.supplierConnectorId) }
            ]))
            + renderDetailSection('已选字段', application.fields.length ? renderDetailTable(
                ['字段名称', '字段描述', '字段类型', '字段长度'],
                application.fields,
                'is-field-table'
            ) : renderDetailEmpty('inventory_2', '未选择字段', '该' + ACTIVE_ORDER_CONFIG.entityLabel + '按整包方式交付，无需单独选择字段。'))
            + renderDetailSection('访问策略', renderDetailInfoGrid([
                { label: '使用有效期', value: application.validPeriod },
                { label: 'IP白名单', html: renderCopyValue(application.ipWhitelist) }
            ]))
            + renderDetailSection('使用策略', renderDetailInfoGrid([
                { label: '访问次数限制', value: application.accessLimit },
                { label: '使用限制', value: application.usageMode }
            ]))
            + renderDetailSection('日志信息', renderDetailLogs(application.logs));
    }

    function renderContractInformation(detail) {
        var contract = detail.contract;
        if (!contract) {
            return renderDetailSection('合同信息', renderDetailEmpty('contract', '尚未关联合同', '订单提交后，可从当前订单发起合同关联。'));
        }
        var statusHtml = '<span class="supplier-order-detail-inline-status">' + materialIcon(contract.status.indexOf('解除') !== -1 ? 'warning' : 'radio_button_checked') + '<span>' + escapeHtml(contract.status) + '</span></span>';
        var fileHtml = '<div class="supplier-order-detail-file"><span>' + materialIcon('description') + '<span title="' + escapeHtml(contract.fileName) + '">' + escapeHtml(contract.fileName) + '</span></span>'
            + '<button type="button" data-supplier-order-demo-action="合同预览">' + materialIcon('visibility') + '<span>预览</span></button>'
            + '<button type="button" data-supplier-order-demo-action="合同下载">' + materialIcon('download') + '<span>下载</span></button></div>';
        var relationButton = '<button class="supplier-order-detail-link-button" type="button" data-supplier-order-relation>' + materialIcon('visibility') + '<span>关联详情</span></button>';
        return ''
            + renderDetailSection('合同信息', renderDetailInfoGrid([
                { label: '合同名称', value: contract.name },
                { label: '合同编号', html: renderCopyValue(contract.number) },
                { label: '签署时间', value: contract.signedAt },
                { label: '合同状态', html: statusHtml },
                { label: '合同文件', html: fileHtml, full: true }
            ]))
            + renderDetailSection('关联合同流程', renderDetailTable(
                ['合同名称', '合同编号', '签署方式', '提供方', '需求方', '发起时间', '完成时间', '关联状态', '操作'],
                [[contract.name, contract.number, contract.signMethod, contract.provider, contract.demander, contract.initiatedAt, contract.completedAt, contract.status, { html: relationButton }]],
                'is-contract-table'
            ));
    }

    function renderPaymentInformation(detail) {
        var payment = detail.payment;
        if (!payment) {
            return renderDetailSection('支付信息', renderDetailEmpty('payments', '尚未生成支付信息', '合同完成签署后，系统将按合同付款计划生成支付记录。'));
        }
        var feeRule = payment.serviceFeeMode === 'P'
            ? '按每笔付款金额的 ' + payment.serviceFeeValue + '% 收取'
            : '每笔付款固定收取 ' + formatMoney(payment.serviceFeeValue);
        var cards = isBuyerCenter()
            ? '<div class="supplier-order-payment-summary">'
                + '<div><span>订单金额</span><strong>' + formatMoney(payment.orderAmount) + '</strong><small>' + escapeHtml(payment.paymentMode) + '</small></div>'
                + '<div><span>已付金额</span><strong>' + formatMoney(payment.receivedAmount) + '</strong><small>' + escapeHtml(payment.status) + '</small></div>'
                + '<div><span>待付金额</span><strong>' + formatMoney(Math.max(0, payment.orderAmount - payment.receivedAmount)) + '</strong><small>按合同付款计划执行</small></div>'
                + '<div><span>付款状态</span><strong>' + escapeHtml(payment.status) + '</strong><small>支付结果以统一支付平台为准</small></div>'
                + '</div>'
            : '<div class="supplier-order-payment-summary">'
                + '<div><span>订单金额</span><strong>' + formatMoney(payment.orderAmount) + '</strong><small>' + escapeHtml(payment.paymentMode) + '</small></div>'
                + '<div><span>已收金额</span><strong>' + formatMoney(payment.receivedAmount) + '</strong><small>' + escapeHtml(payment.status) + '</small></div>'
                + '<div><span>平台服务费</span><strong>' + formatMoney(payment.serviceFee) + '</strong><small>' + escapeHtml(feeRule) + '</small></div>'
                + '<div><span>提供方预计净收</span><strong>' + formatMoney(payment.netAmount) + '</strong><small>订单金额扣除平台服务费</small></div>'
                + '</div>';
        var rows = payment.rows.map(function (row) {
            return [
                row.index,
                row.name,
                row.percent,
                formatMoney(row.amount),
                row.status,
                row.paymentNo,
                row.channel,
                row.paidAt,
                formatMoney(row.fee),
                formatMoney(row.netAmount),
                row.splitStatus
            ];
        });
        var buyerRows = payment.rows.map(function (row) {
            return [row.index, row.name, row.percent, formatMoney(row.amount), row.status, row.paymentNo, row.channel, row.paidAt];
        });
        return ''
            + renderDetailSection('支付信息', cards)
            + renderDetailSection(isBuyerCenter() ? '付款明细' : '付款与分账明细', isBuyerCenter()
                ? renderDetailTable(
                    ['期次', '付款节点', '比例', '应付金额', '支付状态', '支付流水号', '支付方式', '支付时间'],
                    buyerRows,
                    'is-payment-table'
                )
                : renderDetailTable(
                    ['期次', '付款节点', '比例', '应付金额', '支付状态', '支付流水号', '支付方式', '支付时间', '平台服务费', '提供方净收', '分账状态'],
                    rows,
                    'is-payment-table'
                ))
            + renderDetailSection('日志信息', renderDetailLogs(payment.logs));
    }

    function renderEvaluationInformation(detail) {
        var rating = detail.rating;
        if (!rating) {
            return renderDetailSection('评价信息', renderDetailEmpty('star', isBuyerCenter() ? '您尚未评价' : '需求方暂未评价', '完成' + ACTIVE_ORDER_CONFIG.entityLabel + '交付后，需求方可对本次交易进行评价。'));
        }
        var stars = '';
        for (var index = 1; index <= 5; index += 1) {
            stars += materialIcon(index <= rating.score ? 'star' : 'star_border');
        }
        return renderDetailSection('评价信息', renderDetailInfoGrid([
            { label: '评分', html: '<span class="supplier-order-detail-stars" aria-label="' + rating.score + '星">' + stars + '<b>' + rating.score + '.0</b></span>' },
            { label: '评价时间', value: rating.time },
            { label: '评价内容', value: rating.content, full: true },
            { label: '是否公开', value: rating.visible }
        ]));
    }

    function renderDeliveryBasicInformation(detail) {
        return ''
            + renderDetailSection('连接器信息', renderDetailInfoGrid([
                { label: '数据需求方连接器 ID', html: renderDeliveryReferenceValue(detail.demanderConnectorId, '需求方连接器详情') },
                { label: '数据提供方连接器 ID', html: renderDeliveryReferenceValue(detail.supplierConnectorId, '提供方连接器详情') }
            ]))
            + renderDetailSection('业务节点信息', renderDetailInfoGrid([
                { label: '业务节点名称', value: detail.businessNodeName },
                { label: '业务节点标识码', html: renderDeliveryReferenceValue(detail.businessNodeId, '业务节点详情') }
            ]))
            + renderDetailSection('交付物基础信息', renderDetailInfoGrid([
                { label: ACTIVE_ORDER_CONFIG.entityLabel + '名称', value: detail.item.name },
                { label: ACTIVE_ORDER_CONFIG.entityDataLabel + '标识码', html: renderDeliveryReferenceValue(detail.productId, ACTIVE_ORDER_CONFIG.entityDataLabel + '详情') },
                { label: '交付方式', value: detail.item.delivery }
            ]))
            + renderDetailSection('数字合约', renderDetailInfoGrid([
                { label: '合约名称', value: detail.digitalContractName },
                { label: '合约标识码', html: '<span class="supplier-delivery-contract-code">' + escapeHtml(detail.digitalContractId) + '</span>' }
            ]));
    }

    function renderDeliveryReferenceValue(value, actionLabel) {
        return '<span class="supplier-delivery-reference"><span>' + escapeHtml(value) + '</span>'
            + '<button type="button" data-supplier-order-copy="' + escapeHtml(value) + '">' + materialIcon('content_copy') + '<span>复制</span></button>'
            + '<button type="button" data-supplier-delivery-demo-action="' + escapeHtml(actionLabel) + '">' + materialIcon('visibility') + '<span>详情</span></button></span>';
    }

    function renderDeliveryEmptyState() {
        return '<div class="supplier-delivery-empty-state">' + materialIcon('inbox') + '<span>暂无数据</span></div>';
    }

    function renderDeliveryTable(headers, rows) {
        return '<div class="supplier-order-detail-table-scroll supplier-delivery-plain-table"><table class="supplier-order-detail-table"><thead><tr>'
            + headers.map(function (header) { return '<th>' + escapeHtml(header) + '</th>'; }).join('')
            + '</tr></thead><tbody>'
            + (rows && rows.length
                ? rows.map(function (row) { return '<tr>' + row.map(function (cell) { return '<td>' + renderDetailCell(cell) + '</td>'; }).join('') + '</tr>'; }).join('')
                : '<tr><td colspan="' + headers.length + '">' + renderDeliveryEmptyState() + '</td></tr>')
            + '</tbody></table></div>';
    }

    function renderDeliveryApiGoods(detail) {
        var api = detail.api;
        return ''
            + '<div class="supplier-delivery-api-heading"><h3>' + escapeHtml(api.serviceName) + '</h3><p>' + escapeHtml(api.serviceName) + '</p></div>'
            + renderDetailSection('基础属性', renderDetailInfoGrid([
                { label: '请求方式', html: '<span class="supplier-delivery-method-pill">' + escapeHtml(api.method) + '</span>' },
                { label: '支持格式', value: api.format },
                { label: '请求协议', value: api.protocol },
                { label: '字符编码', value: api.encoding },
                { label: '平均耗时', value: api.averageTime },
                { label: '调用地址', html: '<span class="supplier-delivery-endpoint"><span class="supplier-delivery-method-pill">' + escapeHtml(api.method) + '</span><span>' + escapeHtml(api.endpoint) + '</span></span>', full: true }
            ]))
            + renderDetailSection('Headers', '<div class="supplier-order-detail-table-scroll supplier-delivery-plain-table"><table class="supplier-order-detail-table"><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody><tr><td>apiKey</td><td>' + escapeHtml(api.apiKey) + '</td></tr><tr><td>Token</td><td>' + escapeHtml(api.token) + '</td></tr></tbody></table></div>')
            + renderDetailSection('请求参数', renderDeliveryTable(['参数名称', '参数中文名称', '参数类型', '必填', '示例值', '描述'], api.requestParams))
            + renderDetailSection('返回参数', renderDeliveryTable(['参数名称', '参数中文名称', '参数类型', '示例值', '描述'], api.responseParams))
            + renderDetailSection('请求示例', '<div class="supplier-delivery-request-example"><span class="supplier-delivery-method-pill">' + escapeHtml(api.method) + '</span><span>' + escapeHtml(api.endpoint) + '</span></div>')
            + renderDetailSection('返回示例', '<pre class="supplier-delivery-return-example"><code>' + escapeHtml(api.responseExample) + '</code></pre>');
    }

    function renderDeliveryFileGoods(detail) {
        return renderDetailSection('交付文件', renderDetailInfoGrid([
            { label: '文件路径', value: detail.file.path },
            { label: '文件名称', value: detail.file.name },
            { label: '文件大小', value: detail.file.size }
        ], 'supplier-delivery-file-fields'));
    }

    function renderDeliveryGoods(detail) {
        if (detail.mode === 'api') return renderDeliveryApiGoods(detail);
        return renderDeliveryFileGoods(detail);
    }

    function renderDeliveryTimeline(detail, expanded) {
        var events = expanded ? detail.timeline : detail.timeline.slice(0, 10);
        var timeline = '<ol class="supplier-delivery-timeline">' + events.map(function (event) {
            return '<li><span class="supplier-delivery-timeline-marker"></span><div><h3>' + escapeHtml(event.title) + '</h3><p>' + escapeHtml(event.description) + '</p><time>' + escapeHtml(event.time) + '</time></div></li>';
        }).join('') + '</ol>';
        if (detail.timeline.length > 10) {
            timeline += '<div class="supplier-delivery-timeline-more"><button type="button" data-supplier-delivery-timeline-toggle>'
                + materialIcon(expanded ? 'expand_less' : 'expand_more') + '<span>' + (expanded ? '收起' : '查看更多') + '</span></button></div>';
        }
        return timeline;
    }

    function renderDeliveryMetering(detail, filters) {
        var metering = detail.metering;
        var rows = metering.rows.filter(function (row) {
            var rowDate = String(row.time || '').slice(0, 10);
            if (filters.status !== '全部' && row.status !== filters.status) return false;
            if (filters.startDate && rowDate < filters.startDate) return false;
            if (filters.endDate && rowDate > filters.endDate) return false;
            return true;
        }).map(function (row) {
            var statusHtml = '<span class="supplier-delivery-call-status ' + (row.status === '调用成功' ? 'is-success' : 'is-failure') + '">' + escapeHtml(row.status) + '</span>';
            var actionHtml = '<button class="supplier-order-detail-link-button" type="button" data-supplier-delivery-demo-action="查看调用详情">' + materialIcon('visibility') + '<span>详情</span></button>';
            return [row.index, row.ip, row.time, { html: statusHtml }, row.volume, { html: actionHtml }];
        });
        return ''
            + '<section class="supplier-delivery-meter-head"><h3>调用概况</h3><dl><div><dt>计量方式</dt><dd>' + escapeHtml(metering.mode) + '</dd></div><div><dt>计量单位</dt><dd>' + escapeHtml(metering.unit) + '</dd></div><div><dt>使用有效期</dt><dd>' + escapeHtml(metering.validPeriod) + '</dd></div></dl></section>'
            + '<div class="supplier-delivery-meter-summary">'
            + metering.metrics.map(function (metric) { return '<div><span>' + escapeHtml(metric[0]) + '</span><strong>' + escapeHtml(metric[1]) + '</strong></div>'; }).join('')
            + '</div>'
            + renderDetailSection('调用明细', '<div class="supplier-delivery-call-toolbar">'
                + '<div class="supplier-delivery-call-segment" role="group" aria-label="调用状态筛选">'
                + ['全部', '调用成功', '调用失败'].map(function (status) {
                    return '<button type="button" class="' + (filters.status === status ? 'active' : '') + '" data-supplier-delivery-call-status="' + escapeHtml(status) + '">' + escapeHtml(status) + '</button>';
                }).join('') + '</div>'
                + '<div class="supplier-delivery-date-range"><span>调用时间</span><label><span>开始日期</span><input type="date" value="' + escapeHtml(filters.startDate) + '" data-supplier-delivery-start-date></label><i>—</i><label><span>结束日期</span><input type="date" value="' + escapeHtml(filters.endDate) + '" data-supplier-delivery-end-date></label>' + materialIcon('calendar_today') + '</div>'
                + '</div>' + renderDeliveryTable(['序号', '调用IP', '调用时间', '返回状态', '返回数据量', '操作'], rows));
    }

    function renderDeliveryTabContent(detail, tabKey, filters) {
        if (tabKey === 'goods') return renderDeliveryGoods(detail);
        if (tabKey === 'timeline') return renderDeliveryTimeline(detail, filters.timelineExpanded);
        if (tabKey === 'metering') return renderDeliveryMetering(detail, filters);
        return renderDeliveryBasicInformation(detail);
    }

    function renderDetailTabContent(detail, tabKey) {
        if (tabKey === 'application') return renderApplicationInformation(detail);
        if (tabKey === 'contract') return renderContractInformation(detail);
        if (tabKey === 'payment') return renderPaymentInformation(detail);
        if (tabKey === 'evaluation') return renderEvaluationInformation(detail);
        return renderOrderInformation(detail);
    }

    function renderRelationDrawer(detail) {
        var contract = detail.contract;
        if (!contract) return '';
        var initiatorParty = contract.initiatorRole === '需求方'
            ? contract.demander
            : (contract.initiatorRole === '平台运营方' ? contract.operator : contract.provider);
        var feeRule = contract.serviceFeeMode === 'P'
            ? '按每笔付款金额的 ' + contract.serviceFeeValue + '% 收取'
            : '每笔付款固定收取 ' + formatMoney(contract.serviceFeeValue);
        var signerRows = [
            ['法人', '提供方', contract.provider, contract.signProgress === '3/3' ? '已签署' : '处理中'],
            ['法人', '需求方', contract.demander, contract.signProgress === '3/3' ? '已签署' : '处理中'],
            ['法人', '平台运营方', contract.operator, contract.signProgress === '3/3' ? '已签署' : '待签署']
        ];
        return ''
            + '<div class="supplier-contract-drawer-mask supplier-order-relation-mask" data-supplier-order-relation-layer data-supplier-order-relation-close></div>'
            + '<aside class="supplier-contract-drawer supplier-order-relation-drawer" role="dialog" aria-modal="true" aria-labelledby="supplierOrderRelationTitle" data-supplier-order-relation-layer>'
            +   '<header class="supplier-contract-drawer-head">'
            +       '<button class="supplier-contract-drawer-close" type="button" aria-label="关闭关联详情" data-supplier-order-relation-close data-supplier-order-relation-close-button>' + materialIcon('close') + '<span class="supplier-order-visually-hidden">关闭</span></button>'
            +       '<h2 id="supplierOrderRelationTitle">关联详情</h2>'
            +   '</header>'
            +   '<div class="supplier-contract-drawer-body">'
            +       renderDetailSection('关联信息', renderDetailInfoGrid([
                        { label: '业务类型', value: '三方合同关联' },
                        { label: '关联状态', value: contract.status },
                        { label: '发起方', value: initiatorParty },
                        { label: '发起时间', value: contract.initiatedAt },
                        { label: '完成时间', value: contract.completedAt },
                        { label: '当前节点', value: contract.currentNode },
                        { label: '备注', value: contract.remark, full: true }
                    ]))
            +       renderDetailSection('合同基本信息', renderDetailInfoGrid([
                        { label: '合同名称', value: contract.name },
                        { label: '合同编号', html: renderCopyValue(contract.number) },
                        { label: '合同生效时间', value: contract.effectiveAt },
                        { label: '合同失效时间', value: contract.endsAt },
                        { label: '合同签署方式', value: contract.signMethod },
                        { label: '签署时间', value: contract.signedAt },
                        { label: '签约任务编号', html: renderCopyValue(contract.taskId) },
                        { label: '三方签署进度', value: contract.signProgress }
                    ]))
            +       renderDetailSection('合同文件', '<div class="supplier-order-detail-file"><span>' + materialIcon('description') + '<span>' + escapeHtml(contract.fileName) + '</span></span><button type="button" data-supplier-order-demo-action="合同预览">' + materialIcon('visibility') + '<span>预览</span></button><button type="button" data-supplier-order-demo-action="合同下载">' + materialIcon('download') + '<span>下载</span></button></div>')
            +       renderDetailSection('签署主体', renderDetailTable(['主体类型', '签署方角色', '签署方名称', '签署状态'], signerRows, 'is-signer-table'))
            +       renderDetailSection(isBuyerCenter() ? '付款条款' : '付款与分账条款', '<div class="supplier-order-relation-payment"><div><span>合同金额</span><strong>' + formatMoney(contract.amount) + '</strong></div><div><span>付款方式</span><strong>' + (contract.paymentMode === 'installment' ? '分期付款' : '一次性付款') + '</strong></div><div><span>平台服务费</span><strong>' + escapeHtml(feeRule) + '</strong></div></div>')
            +       renderDetailSection('关联日志', renderDetailLogs(contract.logs, true))
            +   '</div>'
            + '</aside>';
    }

    function initSupplierProductOrders() {
        var params = new URLSearchParams(window.location.search || '');
        var sidebar = document.querySelector('[data-workbench-sidebar]');
        var activeMenu = params.get('menu') || (sidebar && sidebar.dataset.active) || '';
        if (activeMenu !== 'product-order' && activeMenu !== 'resource-order') return;

        var panel = document.querySelector('[data-consult-panel]');
        var centerRole = panel && panel.dataset.role === 'buyer' ? 'buyer' : 'supplier';
        var requestedView = params.get('view');
        var buyerProductConfig = centerRole === 'buyer' && activeMenu === 'product-order'
            ? window.BuyerProductOrderConfig
            : null;
        if (centerRole === 'buyer' && activeMenu === 'product-order'
            && (!buyerProductConfig || (requestedView !== 'detail' && requestedView !== 'delivery'))) return;
        var resourceConfig = centerRole === 'buyer' ? window.BuyerResourceOrderConfig : window.SupplierResourceOrderConfig;
        if (activeMenu === 'resource-order' && (!resourceConfig || !Array.isArray(resourceConfig.records))) return;
        ACTIVE_ORDER_CONFIG = activeMenu === 'resource-order'
            ? Object.assign({
                centerRole: centerRole,
                centerTitle: centerRole === 'buyer' ? '需方中心' : '供方中心',
                currentRoleLabel: centerRole === 'buyer' ? '需求方' : '提供方',
                counterpartyRoleLabel: centerRole === 'buyer' ? '提供方' : '需求方',
                counterpartyLabel: centerRole === 'buyer' ? '提供方' : '使用方',
                currentPartyName: centerRole === 'buyer' ? CURRENT_BUYER_NAME : CURRENT_SUPPLIER_NAME
            }, resourceConfig)
            : (buyerProductConfig
                ? Object.assign({
                    centerRole: 'buyer',
                    centerTitle: '需方中心',
                    currentRoleLabel: '需求方',
                    counterpartyRoleLabel: '提供方',
                    counterpartyLabel: '提供方',
                    currentPartyName: CURRENT_BUYER_NAME,
                    detailOnly: true
                }, buyerProductConfig)
                : PRODUCT_ORDER_CONFIG);
        DETAIL_STEPS = ['提交订单', '关联合同', '订单支付', ACTIVE_ORDER_CONFIG.deliveryStepLabel, '交易完成'];
        var records = activeMenu === 'resource-order'
            ? resourceConfig.records
            : (buyerProductConfig ? buyerProductConfig.records : ORDER_RECORDS);
        ensureOrderSignModes(records);
        records.forEach(hydrateContractSnapshot);

        var title = document.querySelector('[data-center-title]');
        if (!panel) return;

        var state = {
            tab: '全部',
            keyword: '',
            keywordDraft: '',
            orderType: '全部订单类型',
            productType: ACTIVE_ORDER_CONFIG.allTypeLabel,
            page: 1,
            pageSize: 10,
            filterOpen: false,
            view: params.get('view') === 'delivery' ? 'delivery' : (params.get('view') === 'detail' ? 'detail' : 'list'),
            detailOrderNo: params.get('orderNo') || '',
            detailTab: DETAIL_TABS.some(function (tab) { return tab.key === params.get('tab'); }) ? params.get('tab') : 'order',
            deliveryTab: DELIVERY_TABS.some(function (tab) { return tab.key === params.get('tab'); }) ? params.get('tab') : 'basic',
            deliveryCallStatus: '全部',
            deliveryStartDate: '',
            deliveryEndDate: '',
            deliveryTimelineExpanded: false,
            deliveryReturnView: 'list',
            detailHistoryPushed: false
        };
        var toastTimer = null;
        var relationReturnFocus = null;
        var relationKeydownHandler = null;
        var operationReturnFocus = null;
        var operationKeydownHandler = null;
        var sharedCheckout = isBuyerCenter() && window.BuyerPaymentCheckout ? window.BuyerPaymentCheckout.create() : null;

        panel.classList.remove('is-placeholder', 'is-service-management', 'is-order-management');
        panel.classList.add('is-supplier-order-management');
        if (title) title.textContent = state.view === 'delivery' ? '交付详情' : (state.view === 'detail' ? '订单详情' : ACTIVE_ORDER_CONFIG.pageTitle);
        document.title = (state.view === 'delivery' ? '交付详情' : (state.view === 'detail' ? '订单详情' : ACTIVE_ORDER_CONFIG.pageTitle)) + ' - ' + ACTIVE_ORDER_CONFIG.centerTitle;

        function setViewTitle() {
            var detailMode = state.view === 'detail';
            var deliveryMode = state.view === 'delivery';
            panel.classList.toggle('is-supplier-order-management', !detailMode && !deliveryMode);
            panel.classList.toggle('is-supplier-order-detail', detailMode);
            panel.classList.toggle('is-supplier-order-delivery', deliveryMode);
            if (title) title.textContent = deliveryMode ? '交付详情' : (detailMode ? '订单详情' : ACTIVE_ORDER_CONFIG.pageTitle);
            document.title = (deliveryMode ? '交付详情' : (detailMode ? '订单详情' : ACTIVE_ORDER_CONFIG.pageTitle)) + ' - ' + ACTIVE_ORDER_CONFIG.centerTitle;
        }

        function getActiveDetailRecord() {
            return records.find(function (item) { return item.orderNo === state.detailOrderNo; }) || null;
        }

        function resolvePrimaryAction(item) {
            if (!item) return '';
            if (item.primaryAction) return item.primaryAction;
            var currentRole = getCurrentRoleLabel();
            if (item.status === '关联审批中') {
                if (item.initiatorRole === currentRole) return '撤回关联';
                if (item.reviewerRole === currentRole || item.currentActor === currentRole) {
                    return item.signMode === '线下签署' ? '关联审批' : '审核并签署';
                }
                return '';
            }
            if (item.status === '关联合同签署中') {
                if ((item.currentActor && item.currentActor !== currentRole) || (item.reviewerRole && item.reviewerRole !== currentRole)) return '';
                return '继续签署';
            }
            if (isBuyerCenter()) {
                if (item.status === '待关联合同' || item.status === '已解除关联') return '关联合同';
                if (item.status === '待支付') return '去支付';
                if (ACTIVE_ORDER_CONFIG.supplierReferenceActionsOnly) {
                    if (item.status === '待交付' || item.status === '待确认交付' || item.status === '交易完成') return '交付详情';
                    return '';
                }
                if (item.status === '待交付') return '交付详情';
                if (item.status === '待确认交付') return '确认交付';
                if (item.status === '交易完成') return item.rating ? '交付详情' : '去评价';
                return '';
            }
            var actions = ACTIONS_BY_STATUS[item.status] || [];
            var match = actions.find(function (action) { return action[0] !== '订单详情'; });
            return match ? match[0] : '';
        }

        function getActionIconName(action) {
            if (action === '审核并签署' || action === '关联审批') return 'approve';
            if (action === '继续签署') return 'sign';
            if (action === '撤回关联') return 'withdraw';
            if (action === '关联合同' || action === '重新关联合同') return 'contract';
            if (action === '解除关联合同') return 'unlink';
            if (action === '取消订单') return 'cancel';
            if (action === '发起争议') return 'dispute';
            if (action === '去支付') return 'pay';
            if (action === '确认交付') return 'confirm';
            if (action === '去评价') return 'star';
            if (action === '交付详情') return 'delivery';
            return 'detail';
        }

        function buildSignReturnUrl(orderNo) {
            var returnUrl = new URL(window.location.href);
            returnUrl.searchParams.set('menu', ACTIVE_ORDER_CONFIG.menu);
            returnUrl.searchParams.set('view', 'detail');
            returnUrl.searchParams.set('orderNo', orderNo || '');
            returnUrl.searchParams.set('tab', 'contract');
            return returnUrl.pathname + returnUrl.search + returnUrl.hash;
        }

        function getPrimaryDetailAction(item) {
            return resolvePrimaryAction(item);
        }

        function updateDetailUrl(push) {
            var url = new URL(window.location.href);
            if (state.view === 'detail' || state.view === 'delivery') {
                url.searchParams.set('view', state.view);
                url.searchParams.set('orderNo', state.detailOrderNo);
                url.searchParams.set('tab', state.view === 'delivery' ? state.deliveryTab : state.detailTab);
            } else {
                url.searchParams.delete('view');
                url.searchParams.delete('orderNo');
                url.searchParams.delete('tab');
            }
            window.history[push ? 'pushState' : 'replaceState']({}, '', url.pathname + url.search + url.hash);
        }

        function openOrderDetail(orderNo) {
            var item = records.find(function (record) { return record.orderNo === orderNo; });
            if (!item) return;
            state.view = 'detail';
            state.detailOrderNo = orderNo;
            state.detailTab = 'order';
            state.detailHistoryPushed = true;
            updateDetailUrl(true);
            render();
        }

        function openDeliveryDetail(orderNo) {
            var item = records.find(function (record) { return record.orderNo === orderNo; });
            if (!item) return;
            state.deliveryReturnView = state.view === 'detail' ? 'detail' : 'list';
            state.view = 'delivery';
            state.detailOrderNo = orderNo;
            state.deliveryTab = 'basic';
            state.deliveryCallStatus = '全部';
            state.deliveryStartDate = '';
            state.deliveryEndDate = '';
            state.deliveryTimelineExpanded = false;
            state.detailHistoryPushed = true;
            updateDetailUrl(true);
            render();
        }

        function returnToOrderList() {
            if (state.detailHistoryPushed) {
                window.history.back();
                return;
            }
            if (ACTIVE_ORDER_CONFIG.detailOnly) {
                var listUrl = new URL(window.location.href);
                listUrl.searchParams.delete('view');
                listUrl.searchParams.delete('orderNo');
                listUrl.searchParams.delete('tab');
                window.location.href = listUrl.pathname + listUrl.search + listUrl.hash;
                return;
            }
            state.view = 'list';
            state.detailOrderNo = '';
            state.detailTab = 'order';
            state.deliveryTab = 'basic';
            state.deliveryTimelineExpanded = false;
            state.deliveryReturnView = 'list';
            updateDetailUrl(false);
            render();
        }

        function renderDetailProgress(detail) {
            var exception = detail.item.status === '解除审批中' || detail.item.status === '已解除关联';
            return '<div class="supplier-order-detail-progress' + (exception ? ' is-exception' : '') + '" role="list" aria-label="订单交易进度">'
                + DETAIL_STEPS.map(function (label, index) {
                    var complete = index < detail.stepIndex;
                    var current = index === detail.stepIndex;
                    var stateClass = complete ? ' is-complete' : (current ? ' is-current' : '');
                    var iconHtml = complete ? materialIcon('check') : '<span>' + (index + 1) + '</span>';
                    return '<div class="supplier-order-detail-step' + stateClass + '" role="listitem">'
                        + '<div class="supplier-order-detail-step-marker">' + iconHtml + '</div>'
                        + '<strong>' + escapeHtml(label) + '</strong>'
                        + '</div>';
                }).join('')
                + '</div>';
        }

        function renderDetailSummary(detail) {
            var item = detail.item;
            var exception = item.status === '解除审批中' || item.status === '已解除关联';
            return '<section class="supplier-order-detail-summary' + (exception ? ' is-exception' : '') + '">'
                + '<div class="supplier-order-detail-summary-head">'
                +   '<div><span>当前交易状态</span><h2>' + escapeHtml(item.status) + '</h2><p>' + escapeHtml(detail.currentDescription) + '</p></div>'
                +   '<dl><div><dt>订单编号</dt><dd>' + renderCopyValue(item.orderNo) + '</dd></div><div><dt>申请时间</dt><dd>' + escapeHtml(item.appliedAt) + '</dd></div></dl>'
                + '</div>'
                + renderDetailProgress(detail)
                + '</section>';
        }

        function renderDeliverySummary(detail) {
            return '<section class="supplier-order-detail-summary is-delivery-summary">'
                + '<div class="supplier-order-detail-summary-head">'
                + '<h2>' + escapeHtml(detail.stage) + '</h2>'
                + '<dl>'
                + '<div><dt>任务编号</dt><dd>' + escapeHtml(detail.taskNo) + '</dd></div>'
                + '<div><dt>订单编号</dt><dd>' + escapeHtml(detail.item.orderNo) + '</dd></div>'
                + '<div><dt>创建时间</dt><dd>' + escapeHtml(detail.createdAt) + '</dd></div>'
                + '<div><dt>交付阶段</dt><dd>' + escapeHtml(detail.stage) + '</dd></div>'
                + '</dl></div>'
                + '</section>';
        }

        function renderDetailTabs() {
            return '<div class="supplier-order-detail-tabs" role="tablist" aria-label="订单详情分类">'
                + DETAIL_TABS.map(function (tab) {
                    var active = state.detailTab === tab.key;
                    return '<button type="button" role="tab" aria-selected="' + active + '" class="supplier-order-detail-tab' + (active ? ' active' : '') + '" data-supplier-order-detail-tab="' + tab.key + '">' + escapeHtml(tab.label) + '</button>';
                }).join('')
                + '</div>';
        }

        function renderDeliveryTabs(detail) {
            var tabs = getDeliveryTabs(detail.item);
            return '<div class="supplier-order-detail-tabs supplier-delivery-tabs" role="tablist" aria-label="交付详情分类">'
                + tabs.map(function (tab) {
                    var active = state.deliveryTab === tab.key;
                    return '<button type="button" role="tab" aria-selected="' + active + '" class="supplier-order-detail-tab' + (active ? ' active' : '') + '" data-supplier-delivery-tab="' + tab.key + '">' + escapeHtml(tab.label) + '</button>';
                }).join('')
                + '</div>';
        }

        function renderOrderDetailPage(item) {
            var detail = buildOrderDetail(item);
            var primaryAction = getPrimaryDetailAction(item);
            var primaryButton = primaryAction
                ? '<button class="supplier-order-detail-primary" type="button" data-supplier-order-action="' + escapeHtml(primaryAction) + '" data-supplier-order-no="' + escapeHtml(item.orderNo) + '">' + materialIcon(primaryAction.indexOf('交付') !== -1 ? 'local_shipping' : 'task_alt') + '<span>' + escapeHtml(primaryAction) + '</span></button>'
                : '';
            return ''
                + '<div class="supplier-order-detail-shell">'
                +   '<div class="supplier-order-detail-toolbar">'
                +       '<button class="supplier-order-detail-back" type="button" data-supplier-order-detail-back>' + materialIcon('arrow_back') + '<span>返回' + escapeHtml(ACTIVE_ORDER_CONFIG.pageTitle) + '</span></button>'
                +       '<div>' + primaryButton + '</div>'
                +   '</div>'
                +   '<div class="supplier-order-detail-scroll">'
                +       renderDetailSummary(detail)
                +       renderDetailTabs()
                +       '<div class="supplier-order-detail-panel" role="tabpanel">' + renderDetailTabContent(detail, state.detailTab) + '</div>'
                +   '</div>'
                + '</div>'
                + '<div class="supplier-order-toast" role="status" aria-live="polite" data-supplier-order-toast>' + icon('success') + '<span></span></div>';
        }

        function renderDeliveryDetailPage(item) {
            var detail = buildDeliveryDetail(item);
            var availableTabs = getDeliveryTabs();
            var backLabel = state.deliveryReturnView === 'detail' ? '返回订单详情' : '返回' + ACTIVE_ORDER_CONFIG.pageTitle;
            if (!availableTabs.some(function (tab) { return tab.key === state.deliveryTab; })) state.deliveryTab = 'basic';
            return ''
                + '<div class="supplier-order-detail-shell supplier-delivery-detail-shell">'
                + '<div class="supplier-order-detail-toolbar">'
                + '<button class="supplier-order-detail-back" type="button" data-supplier-order-detail-back>' + materialIcon('arrow_back') + '<span>' + backLabel + '</span></button>'
                + '</div>'
                + '<div class="supplier-order-detail-scroll">'
                + renderDeliverySummary(detail)
                + renderDeliveryTabs(detail)
                + '<div class="supplier-order-detail-panel supplier-delivery-detail-panel" role="tabpanel">'
                + renderDeliveryTabContent(detail, state.deliveryTab, {
                    status: state.deliveryCallStatus,
                    startDate: state.deliveryStartDate,
                    endDate: state.deliveryEndDate,
                    timelineExpanded: state.deliveryTimelineExpanded
                })
                + '</div></div></div>'
                + '<div class="supplier-order-toast" role="status" aria-live="polite" data-supplier-order-toast>' + icon('success') + '<span></span></div>';
        }

        function fallbackCopy(text) {
            var textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
            showToast('已复制：' + text);
        }

        function copyText(value) {
            var text = String(value || '');
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(function () {
                    showToast('已复制：' + text);
                }).catch(function () {
                    fallbackCopy(text);
                });
                return;
            }
            fallbackCopy(text);
        }

        function bindCopyButtons(root) {
            root.querySelectorAll('[data-supplier-order-copy]').forEach(function (button) {
                button.addEventListener('click', function () { copyText(this.dataset.supplierOrderCopy); });
            });
        }

        function closeOrderOperationLayer(immediate) {
            var layers = Array.prototype.slice.call(document.querySelectorAll('[data-supplier-order-operation-layer]'));
            if (!layers.length) return;
            if (operationKeydownHandler) document.removeEventListener('keydown', operationKeydownHandler);
            operationKeydownHandler = null;
            layers.forEach(function (layer) { layer.classList.remove('show'); });
            document.body.classList.remove('supplier-contract-drawer-open');
            window.setTimeout(function () {
                layers.forEach(function (layer) { layer.remove(); });
                if (operationReturnFocus && document.contains(operationReturnFocus)) operationReturnFocus.focus();
                operationReturnFocus = null;
            }, immediate ? 0 : 220);
        }

        function activateOrderOperationLayer(focusSelector) {
            var layers = document.querySelectorAll('[data-supplier-order-operation-layer]');
            window.requestAnimationFrame(function () {
                layers.forEach(function (layer) { layer.classList.add('show'); });
            });
            document.body.classList.add('supplier-contract-drawer-open');
            document.querySelectorAll('[data-supplier-order-operation-close]').forEach(function (control) {
                control.addEventListener('click', function () { closeOrderOperationLayer(false); });
            });
            operationKeydownHandler = function (event) {
                var dialog = document.querySelector('[data-supplier-order-operation-dialog]');
                if (!dialog) return;
                if (event.key === 'Escape') {
                    event.preventDefault();
                    closeOrderOperationLayer(false);
                    return;
                }
                if (event.key !== 'Tab') return;
                var focusables = dialog.querySelectorAll('button:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])');
                if (!focusables.length) return;
                var first = focusables[0];
                var last = focusables[focusables.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            };
            document.addEventListener('keydown', operationKeydownHandler);
            window.setTimeout(function () {
                var target = document.querySelector(focusSelector);
                if (target) target.focus();
            }, 60);
        }

        function openWithdrawRelationModal(record) {
            if (!record) return;
            closeOrderOperationLayer(true);
            operationReturnFocus = document.activeElement;
            document.body.insertAdjacentHTML('beforeend', ''
                + '<div class="supplier-contract-drawer-mask supplier-order-operation-mask" data-supplier-order-operation-layer data-supplier-order-operation-close></div>'
                + '<section class="supplier-order-withdraw-modal" role="dialog" aria-modal="true" aria-labelledby="supplierOrderWithdrawTitle" data-supplier-order-operation-layer data-supplier-order-operation-dialog>'
                +   '<div class="supplier-order-withdraw-content">'
                +       '<h2 id="supplierOrderWithdrawTitle">' + materialIcon('warning') + '<span>撤回关联</span></h2>'
                +       '<p>确定撤回已关联的合同吗？</p>'
                +   '</div>'
                +   '<footer>'
                +       '<button class="supplier-order-operation-button" type="button" data-supplier-order-operation-close>取消</button>'
                +       '<button class="supplier-order-operation-button is-primary" type="button" data-supplier-order-withdraw-confirm>确定</button>'
                +   '</footer>'
                + '</section>');
            activateOrderOperationLayer('[data-supplier-order-operation-close].supplier-order-operation-button');
            var confirmButton = document.querySelector('[data-supplier-order-withdraw-confirm]');
            if (confirmButton) {
                confirmButton.addEventListener('click', function () {
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
                    closeOrderOperationLayer(false);
                    render();
                    showToast('已撤回合同关联，订单已恢复为待关联合同。');
                });
            }
        }

        function renderUnlinkContractDrawer(detail) {
            var contract = detail.contract;
            if (!contract) return '';
            var payment = detail.payment;
            var paymentTerms = '';
            if (payment) {
                var feeRule = payment.serviceFeeMode === 'P'
                    ? '按每笔付款金额的 ' + payment.serviceFeeValue + '% 收取'
                    : '每笔付款固定收取 ' + formatMoney(payment.serviceFeeValue);
                paymentTerms = ''
                    + '<section class="supplier-contract-approval-section">'
                    +   '<div class="supplier-contract-approval-heading"><h3>付款与分账条款</h3></div>'
                    +   '<div class="supplier-order-relation-payment supplier-contract-unlink-payment">'
                    +       '<div><span>合同金额</span><strong>' + formatMoney(payment.orderAmount) + '</strong></div>'
                    +       '<div><span>付款方式</span><strong>' + escapeHtml(payment.paymentMode) + '</strong></div>'
                    +       '<div><span>平台服务费</span><strong>' + escapeHtml(feeRule) + '</strong></div>'
                    +       '<div><span>提供方预计实收</span><strong>' + formatMoney(payment.netAmount) + '</strong></div>'
                    +   '</div>'
                    + '</section>';
            }
            return ''
                + '<div class="supplier-contract-drawer-mask supplier-order-operation-mask" data-supplier-order-operation-layer data-supplier-order-operation-close></div>'
                + '<aside class="supplier-contract-drawer supplier-contract-unlink" role="dialog" aria-modal="true" aria-labelledby="supplierContractUnlinkTitle" data-supplier-order-operation-layer data-supplier-order-operation-dialog>'
                +   '<header class="supplier-contract-drawer-head">'
                +       '<button class="supplier-contract-drawer-close" type="button" aria-label="关闭解除关联合同抽屉" data-supplier-order-operation-close data-supplier-order-unlink-close>' + materialIcon('close') + '</button>'
                +       '<h2 id="supplierContractUnlinkTitle">解除关联合同</h2>'
                +   '</header>'
                +   '<form class="supplier-contract-form" data-supplier-order-unlink-form>'
                +       '<div class="supplier-contract-drawer-body supplier-contract-approval-body">'
                +           '<div class="supplier-contract-unlink-note">' + materialIcon('info') + '<p>解除关联后，您的原合同仍然生效，若想作废该合同，请前往合同管理进行操作</p></div>'
                +           '<section class="supplier-contract-approval-section">'
                +               '<div class="supplier-contract-approval-heading"><h3>合同基本信息</h3><span class="supplier-contract-approval-status">' + materialIcon('radio_button_unchecked') + '<span>已签署</span></span></div>'
                +               '<div class="supplier-contract-approval-info">'
                +                   '<div><span>合同名称：</span><strong>' + escapeHtml(contract.name) + '</strong></div>'
                +                   '<div><span>合同编号：</span><strong>' + escapeHtml(contract.number) + '</strong></div>'
                +                   '<div><span>合同生效时间：</span><strong>' + escapeHtml(contract.effectiveAt) + '</strong></div>'
                +                   '<div><span>合同失效时间：</span><strong>' + escapeHtml(contract.endsAt) + '</strong></div>'
                +                   '<div><span>合同签署方式：</span><strong>' + escapeHtml(contract.signMethod) + '</strong></div>'
                +                   '<div><span>签署时间：</span><strong>' + escapeHtml(contract.signedAt) + '</strong></div>'
                +                   '<div><span>合同来源：</span><strong>' + escapeHtml(contract.source || '--') + '</strong></div>'
                +                   '<div class="is-full"><span>备注：</span><strong>' + escapeHtml(contract.remark || '--') + '</strong></div>'
                +               '</div>'
                +           '</section>'
                +           '<section class="supplier-contract-approval-section">'
                +               '<div class="supplier-contract-approval-heading"><h3>合同文件</h3></div>'
                +               '<div class="supplier-contract-approval-file">'
                +                   materialIcon('description')
                +                   '<strong>' + escapeHtml(contract.fileName) + '</strong>'
                +                   '<button type="button" data-supplier-order-unlink-demo="预览">' + materialIcon('visibility') + '<span>预览</span></button>'
                +                   '<button type="button" data-supplier-order-unlink-demo="下载">' + materialIcon('download') + '<span>下载</span></button>'
                +               '</div>'
                +           '</section>'
                +           '<section class="supplier-contract-approval-section">'
                +               '<div class="supplier-contract-approval-heading"><h3>签署主体</h3></div>'
                +               '<div class="supplier-contract-signers supplier-contract-approval-signers supplier-contract-unlink-signers">'
                +                   '<div class="supplier-contract-signer-head"><span>主体类型</span><span>签署方角色</span><span>签署方名称</span></div>'
                +                   '<div class="supplier-contract-signer-row"><span>法人</span><span>提供方</span><span>' + escapeHtml(contract.provider) + '</span></div>'
                +                   '<div class="supplier-contract-signer-row"><span>法人</span><span>需求方</span><span>' + escapeHtml(contract.demander) + '</span></div>'
                +                   '<div class="supplier-contract-signer-row"><span>法人</span><span>平台运营方</span><span>深圳市龙岗区数据要素交易服务有限公司</span></div>'
                +               '</div>'
                +           '</section>'
                +           paymentTerms
                +           '<section class="supplier-contract-approval-section">'
                +               '<div class="supplier-contract-approval-heading"><h3>解除原因</h3></div>'
                +               '<div class="supplier-contract-approval-form-row is-required is-top-aligned">'
                +                   '<label class="supplier-contract-approval-label" for="supplierContractUnlinkReason">解除原因</label>'
                +                   '<div class="supplier-contract-approval-opinion">'
                +                       '<textarea id="supplierContractUnlinkReason" maxlength="400" placeholder="请输入" data-supplier-order-unlink-reason></textarea>'
                +                       '<span><b data-supplier-order-unlink-count>0</b>/400</span>'
                +                   '</div>'
                +               '</div>'
                +           '</section>'
                +       '</div>'
                +       '<footer class="supplier-contract-drawer-foot">'
                +           '<button class="supplier-contract-button" type="button" data-supplier-order-operation-close>取消</button>'
                +           '<button class="supplier-contract-button is-primary" type="submit">确定</button>'
                +       '</footer>'
                +   '</form>'
                + '</aside>';
        }

        function openUnlinkContractDrawer(record) {
            if (!record) return;
            var detail = buildOrderDetail(record);
            if (!detail.contract) return;
            closeOrderOperationLayer(true);
            operationReturnFocus = document.activeElement;
            document.body.insertAdjacentHTML('beforeend', renderUnlinkContractDrawer(detail));
            activateOrderOperationLayer('[data-supplier-order-unlink-close]');
            var reasonInput = document.querySelector('[data-supplier-order-unlink-reason]');
            var reasonCount = document.querySelector('[data-supplier-order-unlink-count]');
            if (reasonInput) {
                reasonInput.addEventListener('input', function () {
                    if (reasonCount) reasonCount.textContent = String(this.value.length);
                    this.classList.remove('is-invalid');
                });
            }
            document.querySelectorAll('[data-supplier-order-unlink-demo]').forEach(function (button) {
                button.addEventListener('click', function () {
                    showToast('合同文件' + this.dataset.supplierOrderUnlinkDemo + '操作已触发（原型演示）');
                });
            });
            var form = document.querySelector('[data-supplier-order-unlink-form]');
            if (form) {
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
                    var reason = reasonInput ? reasonInput.value.trim() : '';
                    if (!reason) {
                        if (reasonInput) {
                            reasonInput.classList.add('is-invalid');
                            reasonInput.focus();
                        }
                        return;
                    }
                    record.preUnlinkStatus = record.status;
                    record.status = '解除审批中';
                    record.contractSubStatus = '解除关联合同申请已提交，等待审批';
                    record.primaryAction = '';
                    record.unlinkInitiatorRole = getCurrentRoleLabel();
                    record.unlinkReason = reason;
                    closeOrderOperationLayer(false);
                    render();
                    showToast('解除关联合同申请已提交。');
                });
            }
        }

        function getBuyerBillNo(record) {
            return 'BILL' + String(record && record.orderNo || '').slice(-24);
        }

        function openBuyerCheckout(record) {
            if (!record || !sharedCheckout) {
                showToast('支付组件暂不可用，请刷新页面后重试。');
                return;
            }
            sharedCheckout.open({
                feeType: '资源交易价款',
                merchantId: 'MER-PLATFORM-202607-0001',
                orderNo: record.orderNo,
                billNo: getBuyerBillNo(record),
                objectLabel: '资源名称',
                objectName: record.name,
                objectTypeLabel: ACTIVE_ORDER_CONFIG.typeLabel,
                objectType: getItemType(record),
                payerName: getDemanderName(record),
                providerName: getProviderName(record),
                merchantName: getProviderName(record),
                receiverName: PLATFORM_OPERATOR_NAME,
                receiverBank: '中国农业银行深圳龙岗支行',
                receiverAccount: '4405 0101 0000 12345',
                receiverMemo: '资源订单号后8位',
                amount: record.amount,
                successText: '资源订单已进入待交付状态。',
                failureText: '订单仍保留在待支付状态，不会重复扣款。'
            }, {
                onOfflineSubmitted: function () {
                    showToast('线下支付凭证已提交，等待平台确认到账。');
                },
                onOnlineSuccess: function () {
                    record.status = '待交付';
                    record.contractSubStatus = '交易价款支付成功，等待提供方交付资源';
                    record.paymentCompletedAt = new Date().toLocaleString('zh-CN', { hour12: false });
                    syncContractSnapshotFromRecord(record);
                    render();
                },
                onDone: function () {
                    showToast('支付成功，资源订单已进入待交付。');
                }
            });
        }

        function openBuyerCancelOrder(record, trigger) {
            if (!record || !window.BuyerOrderOperations) return;
            window.BuyerOrderOperations.openCancel({
                orderNo: record.orderNo,
                itemName: record.name,
                entityLabel: '资源',
                returnFocus: trigger,
                onConfirm: function (payload) {
                    record.preCancelStatus = record.status;
                    record.status = '已取消';
                    record.cancelReason = payload.reason;
                    record.canceledAt = new Date().toLocaleString('zh-CN', { hour12: false });
                    record.contractSubStatus = '需求方已取消订单';
                    record.primaryAction = '';
                    record.signMode = '';
                    record.signProgress = '';
                    record.initiatorRole = '';
                    record.reviewerRole = '';
                    record.currentActor = '';
                    record.taskId = '';
                    record.taskStatus = '订单已取消';
                    render();
                    showToast('订单已取消。');
                }
            });
        }

        function openBuyerOrderDispute(record, trigger) {
            if (!record || !window.BuyerOrderOperations) return;
            window.BuyerOrderOperations.openDispute({
                orderNo: record.orderNo,
                itemName: record.name,
                entityLabel: '资源',
                returnFocus: trigger,
                onConfirm: function (payload) {
                    record.disputeSubmitted = true;
                    record.dispute = {
                        description: payload.description,
                        attachments: payload.files.map(function (file) {
                            return { name: file.name, size: file.size, type: file.type || '' };
                        }),
                        submittedAt: new Date().toLocaleString('zh-CN', { hour12: false })
                    };
                    render();
                    showToast('争议已提交，请在争议仲裁中查看处理进度。');
                }
            });
        }

        function openConfirmDeliveryModal(record, trigger) {
            if (!record || !window.BuyerOrderOperations) return;
            window.BuyerOrderOperations.openConfirmDelivery({
                orderNo: record.orderNo,
                itemName: record.name,
                entityLabel: '资源',
                returnFocus: trigger,
                onConfirm: function () {
                    record.status = '交易完成';
                    record.contractSubStatus = '需求方已确认交付，交易完成';
                    record.deliveredAt = new Date().toLocaleString('zh-CN', { hour12: false });
                    render();
                    showToast('交付已确认，订单已进入交易完成。');
                }
            });
        }

        function openEvaluationModal(record) {
            if (!record) return;
            closeOrderOperationLayer(true);
            operationReturnFocus = document.activeElement;
            var currentScore = record.rating ? record.rating.score : 5;
            document.body.insertAdjacentHTML('beforeend', ''
                + '<div class="supplier-contract-drawer-mask supplier-order-operation-mask" data-supplier-order-operation-layer data-supplier-order-operation-close></div>'
                + '<section class="supplier-order-withdraw-modal buyer-resource-evaluation-modal" role="dialog" aria-modal="true" aria-labelledby="buyerResourceEvaluationTitle" data-supplier-order-operation-layer data-supplier-order-operation-dialog>'
                +   '<div class="supplier-order-withdraw-content">'
                +       '<h2 id="buyerResourceEvaluationTitle">' + materialIcon('star') + '<span>交易评价</span></h2>'
                +       '<p>请对“' + escapeHtml(record.name) + '”的资源质量和交付服务进行评价。</p>'
                +       '<div class="buyer-resource-evaluation-stars" role="radiogroup" aria-label="评价星级">'
                +           [1, 2, 3, 4, 5].map(function (score) {
                                return '<button type="button" class="' + (score <= currentScore ? 'active' : '') + '" data-buyer-evaluation-score="' + score + '" aria-label="' + score + '星">' + materialIcon('star') + '</button>';
                            }).join('')
                +           '<strong data-buyer-evaluation-label>' + currentScore + '.0 分</strong>'
                +       '</div>'
                +       '<label class="buyer-resource-evaluation-field"><span>评价内容</span><textarea maxlength="300" placeholder="请输入本次资源质量、交付及时性等评价" data-buyer-evaluation-content>' + escapeHtml(record.rating ? record.rating.content : '') + '</textarea></label>'
                +       '<div class="buyer-resource-evaluation-error" data-buyer-evaluation-error></div>'
                +   '</div>'
                +   '<footer>'
                +       '<button class="supplier-order-operation-button" type="button" data-supplier-order-operation-close>取消</button>'
                +       '<button class="supplier-order-operation-button is-primary" type="button" data-buyer-evaluation-submit>提交评价</button>'
                +   '</footer>'
                + '</section>');
            activateOrderOperationLayer('[data-supplier-order-operation-close].supplier-order-operation-button');
            var selectedScore = currentScore;
            var scoreButtons = document.querySelectorAll('[data-buyer-evaluation-score]');
            var scoreLabel = document.querySelector('[data-buyer-evaluation-label]');
            scoreButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    selectedScore = parseInt(this.dataset.buyerEvaluationScore, 10) || 5;
                    scoreButtons.forEach(function (item) {
                        item.classList.toggle('active', parseInt(item.dataset.buyerEvaluationScore, 10) <= selectedScore);
                    });
                    if (scoreLabel) scoreLabel.textContent = selectedScore + '.0 分';
                });
            });
            var submitButton = document.querySelector('[data-buyer-evaluation-submit]');
            if (submitButton) {
                submitButton.addEventListener('click', function () {
                    var contentInput = document.querySelector('[data-buyer-evaluation-content]');
                    var error = document.querySelector('[data-buyer-evaluation-error]');
                    var content = contentInput ? contentInput.value.trim() : '';
                    if (!content) {
                        if (error) error.textContent = '请填写评价内容。';
                        if (contentInput) contentInput.focus();
                        return;
                    }
                    record.rating = {
                        score: selectedScore,
                        content: content,
                        time: new Date().toLocaleString('zh-CN', { hour12: false }),
                        visible: '是'
                    };
                    closeOrderOperationLayer(false);
                    render();
                    showToast('评价已提交。');
                });
            }
        }

        function closeRelationDrawer(immediate) {
            var layers = Array.prototype.slice.call(document.querySelectorAll('[data-supplier-order-relation-layer]'));
            if (!layers.length) return;
            if (relationKeydownHandler) document.removeEventListener('keydown', relationKeydownHandler);
            relationKeydownHandler = null;
            layers.forEach(function (layer) { layer.classList.remove('show'); });
            document.body.classList.remove('supplier-contract-drawer-open');
            window.setTimeout(function () {
                layers.forEach(function (layer) { layer.remove(); });
                if (relationReturnFocus && document.contains(relationReturnFocus)) relationReturnFocus.focus();
                relationReturnFocus = null;
            }, immediate ? 0 : 220);
        }

        function openRelationDrawer() {
            var item = getActiveDetailRecord();
            if (!item) return;
            var detail = buildOrderDetail(item);
            if (!detail.contract) return;
            closeRelationDrawer(true);
            relationReturnFocus = document.activeElement;
            document.body.insertAdjacentHTML('beforeend', renderRelationDrawer(detail));
            var layers = document.querySelectorAll('[data-supplier-order-relation-layer]');
            window.requestAnimationFrame(function () {
                layers.forEach(function (layer) { layer.classList.add('show'); });
            });
            document.body.classList.add('supplier-contract-drawer-open');
            document.querySelectorAll('[data-supplier-order-relation-close]').forEach(function (control) {
                control.addEventListener('click', function () { closeRelationDrawer(false); });
            });
            document.querySelectorAll('.supplier-order-relation-drawer [data-supplier-order-demo-action]').forEach(function (button) {
                button.addEventListener('click', function () { showToast(this.dataset.supplierOrderDemoAction + '操作已触发（原型演示）'); });
            });
            var drawer = document.querySelector('.supplier-order-relation-drawer');
            if (drawer) bindCopyButtons(drawer);
            relationKeydownHandler = function (event) {
                var activeDrawer = document.querySelector('.supplier-order-relation-drawer');
                if (!activeDrawer) return;
                if (event.key === 'Escape') {
                    event.preventDefault();
                    closeRelationDrawer(false);
                    return;
                }
                if (event.key !== 'Tab') return;
                var focusables = activeDrawer.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])');
                if (!focusables.length) return;
                var first = focusables[0];
                var last = focusables[focusables.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            };
            document.addEventListener('keydown', relationKeydownHandler);
            var closeButton = document.querySelector('[data-supplier-order-relation-close-button]');
            if (closeButton) closeButton.focus();
        }

        function getFilteredRecords() {
            var keyword = state.keyword.toLowerCase();
            return records.filter(function (item) {
                if (state.tab !== '全部' && item.status !== state.tab) return false;
                if (state.orderType !== '全部订单类型' && item.orderType !== state.orderType) return false;
                if (state.productType !== ACTIVE_ORDER_CONFIG.allTypeLabel && getItemType(item) !== state.productType) return false;
                if (!keyword) return true;
                var searchable = [item.orderNo, item.name, getCounterpartyName(item)].join(' ').toLowerCase();
                return searchable.indexOf(keyword) !== -1;
            });
        }

        function renderTabs() {
            return STATUS_TABS.map(function (tab) {
                var active = tab === state.tab;
                return '<button class="supplier-order-tab' + (active ? ' active' : '') + '" type="button" role="tab" aria-selected="' + active + '" data-supplier-order-tab="' + escapeHtml(tab) + '">' + escapeHtml(tab) + '</button>';
            }).join('');
        }

        function renderFilterPanel() {
            var typeOptions = ACTIVE_ORDER_CONFIG.typeOptions.map(function (type) {
                return '<option' + (state.productType === type ? ' selected' : '') + '>' + escapeHtml(type) + '</option>';
            }).join('');
            return ''
                + '<div class="supplier-order-filter-panel' + (state.filterOpen ? ' show' : '') + '" data-supplier-order-filter-panel>'
                +   '<select data-supplier-order-type aria-label="订单类型">'
                +       '<option>全部订单类型</option>'
                +       '<option' + (state.orderType === '常规订单' ? ' selected' : '') + '>常规订单</option>'
                +   '</select>'
                +   '<select data-supplier-order-product-type aria-label="' + escapeHtml(ACTIVE_ORDER_CONFIG.typeLabel) + '">'
                +       '<option>' + escapeHtml(ACTIVE_ORDER_CONFIG.allTypeLabel) + '</option>'
                +       typeOptions
                +   '</select>'
                +   '<button class="supplier-order-filter-reset" type="button" data-supplier-order-reset>' + icon('reset') + '<span>重置</span></button>'
                + '</div>';
        }

        function renderActions(item) {
            var primaryAction = resolvePrimaryAction(item);
            var actions = primaryAction
                ? [[primaryAction, getActionIconName(primaryAction)], ['订单详情', 'detail']]
                : [['订单详情', 'detail']];
            if (isBuyerCenter()) {
                if (item.status === '待支付') {
                    actions = [['发起争议', 'dispute'], ['解除关联合同', 'unlink'], ['去支付', 'pay'], ['订单详情', 'detail']];
                } else if (item.status === '待交付') {
                    actions = [['发起争议', 'dispute'], ['交付详情', 'delivery'], ['订单详情', 'detail']];
                } else if (item.status === '待确认交付') {
                    actions = [['发起争议', 'dispute'], ['确认交付', 'confirm'], ['交付详情', 'delivery'], ['订单详情', 'detail']];
                } else if (['订单退回', '待关联合同', '关联审批中', '关联合同签署中'].indexOf(item.status) !== -1) {
                    actions.unshift(['取消订单', 'cancel']);
                }
                if (item.disputeSubmitted) {
                    actions = actions.filter(function (action) { return action[0] !== '发起争议'; });
                }
            }
            return actions.map(function (action) {
                return '<button class="supplier-order-action" type="button" data-supplier-order-action="' + escapeHtml(action[0]) + '" data-supplier-order-no="' + escapeHtml(item.orderNo) + '">' + icon(action[1]) + '<span>' + escapeHtml(action[0]) + '</span></button>';
            }).join('');
        }

        function renderRows(records) {
            if (!records.length) {
                return '<tr><td class="supplier-order-empty" colspan="12">暂无符合条件的' + escapeHtml(ACTIVE_ORDER_CONFIG.entityLabel) + '订单</td></tr>';
            }

            return records.map(function (item) {
                var muted = item.status === '已解除关联' ? ' is-muted' : '';
                return ''
                    + '<tr' + (item.demoMode ? ' class="is-contract-demo"' : '') + '>'
                    +   '<td title="' + escapeHtml(item.orderNo) + '">' + escapeHtml(item.orderNo) + '</td>'
                    +   '<td>' + escapeHtml(item.orderType) + '</td>'
                    +   '<td class="supplier-order-ellipsis" title="' + escapeHtml(item.name) + '">' + escapeHtml(item.name) + '</td>'
                    +   '<td>' + escapeHtml(getItemType(item)) + '</td>'
                    +   '<td class="supplier-order-ellipsis" title="' + escapeHtml(getCounterpartyName(item)) + '">' + escapeHtml(getCounterpartyName(item)) + '</td>'
                    +   '<td>' + escapeHtml(item.price) + '</td>'
                    +   '<td>' + escapeHtml(item.quantity) + '</td>'
                    +   '<td>' + escapeHtml(item.delivery) + '</td>'
                    +   '<td>' + escapeHtml(item.amount) + '</td>'
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
                pageButtons.push('<button class="supplier-order-page-btn' + (page === state.page ? ' active' : '') + '" type="button" data-supplier-order-page="' + page + '">' + page + '</button>');
            }

            return ''
                + '<div class="supplier-order-pagination">'
                +   '<span>共 ' + total + ' 条</span>'
                +   '<button class="supplier-order-page-btn" type="button" aria-label="上一页" data-supplier-order-page="prev"' + (state.page <= 1 ? ' disabled' : '') + '>‹</button>'
                +   pageButtons.join('')
                +   '<button class="supplier-order-page-btn" type="button" aria-label="下一页" data-supplier-order-page="next"' + (state.page >= totalPages ? ' disabled' : '') + '>›</button>'
                +   '<select class="supplier-order-page-size" data-supplier-order-page-size aria-label="每页条数">'
                +       '<option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10 条/页</option>'
                +       '<option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20 条/页</option>'
                +   '</select>'
                +   '<span>前往</span>'
                +   '<input class="supplier-order-page-jump" type="number" min="1" max="' + totalPages + '" aria-label="前往页码" data-supplier-order-page-jump>'
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
                +   '<div class="supplier-order-table-scroll" aria-label="' + escapeHtml(ACTIVE_ORDER_CONFIG.entityLabel) + '订单列表，可横向滚动">'
                +       '<table class="supplier-order-table">'
                +           '<colgroup>'
                +               '<col class="col-order-no"><col class="col-order-type"><col class="col-name"><col class="col-product-type">'
                +               '<col class="col-user"><col class="col-price"><col class="col-quantity"><col class="col-delivery">'
                +               '<col class="col-amount"><col class="col-applied-at"><col class="col-status"><col class="col-actions">'
                +           '</colgroup>'
                +           '<thead><tr>'
                +               '<th>订单编号</th><th>订单类型</th><th>' + escapeHtml(ACTIVE_ORDER_CONFIG.entityLabel) + '名称</th><th>' + escapeHtml(ACTIVE_ORDER_CONFIG.typeLabel) + '</th><th>' + escapeHtml(ACTIVE_ORDER_CONFIG.counterpartyLabel) + '</th><th>价格</th>'
                +               '<th>数量</th><th>交付方式</th><th>实支付/应支付</th><th>申请时间</th>'
                +               '<th class="order-status-cell">交易状态</th><th class="order-action-cell">操作</th>'
                +           '</tr></thead>'
                +           '<tbody>' + renderRows(pageRecords) + '</tbody>'
                +       '</table>'
                +   '</div>'
                +   renderPagination(filtered.length, totalPages)
                + '</div>';
        }

        function render() {
            setViewTitle();
            if (state.view === 'delivery') {
                var deliveryRecord = getActiveDetailRecord();
                if (!deliveryRecord) {
                    state.view = 'list';
                    state.detailOrderNo = '';
                    state.deliveryTab = 'basic';
                    updateDetailUrl(false);
                    setViewTitle();
                } else {
                    panel.innerHTML = renderDeliveryDetailPage(deliveryRecord);
                    bindEvents();
                    return;
                }
            }
            if (state.view === 'detail') {
                var detailRecord = getActiveDetailRecord();
                if (!detailRecord) {
                    state.view = 'list';
                    state.detailOrderNo = '';
                    state.detailTab = 'order';
                    updateDetailUrl(false);
                    setViewTitle();
                } else {
                    panel.innerHTML = renderOrderDetailPage(detailRecord);
                    bindEvents();
                    return;
                }
            }
            panel.innerHTML = ''
                + '<div class="supplier-order-board">'
                +   '<div class="supplier-order-tabs" role="tablist" aria-label="订单状态">' + renderTabs() + '</div>'
                +   '<div class="supplier-order-toolbar">'
                +       '<label class="supplier-order-search">'
                +           '<input type="search" placeholder="请输入订单编号/' + escapeHtml(ACTIVE_ORDER_CONFIG.entityLabel) + '名称" value="' + escapeHtml(state.keywordDraft) + '" data-supplier-order-keyword aria-label="搜索' + escapeHtml(ACTIVE_ORDER_CONFIG.entityLabel) + '订单">'
                +           icon('search')
                +       '</label>'
                +       '<button class="supplier-order-query-button" type="button" data-supplier-order-query>' + icon('search') + '<span>查询</span></button>'
                +       '<button class="supplier-order-filter-toggle' + (state.filterOpen ? ' active' : '') + '" type="button" aria-expanded="' + state.filterOpen + '" data-supplier-order-filter-toggle>' + icon('filter') + '<span>筛选</span></button>'
                +   '</div>'
                +   renderFilterPanel()
                +   renderTable()
                + '</div>'
                + '<div class="supplier-order-toast" role="status" aria-live="polite" data-supplier-order-toast>' + icon('success') + '<span></span></div>';
            bindEvents();
        }

        function showToast(message) {
            var toast = panel.querySelector('[data-supplier-order-toast]');
            if (!toast) return;
            toast.querySelector('span').textContent = message;
            toast.classList.add('show');
            window.clearTimeout(toastTimer);
            toastTimer = window.setTimeout(function () {
                toast.classList.remove('show');
            }, 2200);
        }

        function changePage(value) {
            var filtered = getFilteredRecords();
            var totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
            var nextPage = Math.min(totalPages, Math.max(1, parseInt(value, 10) || 1));
            state.page = nextPage;
            render();
        }

        function applyKeyword() {
            state.keyword = state.keywordDraft.trim();
            state.page = 1;
        }

        function bindEvents() {
            var detailBack = panel.querySelector('[data-supplier-order-detail-back]');
            if (detailBack) detailBack.addEventListener('click', returnToOrderList);

            panel.querySelectorAll('[data-supplier-order-detail-tab]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.detailTab = this.dataset.supplierOrderDetailTab;
                    updateDetailUrl(false);
                    render();
                });
            });

            panel.querySelectorAll('[data-supplier-delivery-tab]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.deliveryTab = this.dataset.supplierDeliveryTab;
                    updateDetailUrl(false);
                    render();
                });
            });

            var deliveryTimelineToggle = panel.querySelector('[data-supplier-delivery-timeline-toggle]');
            if (deliveryTimelineToggle) {
                deliveryTimelineToggle.addEventListener('click', function () {
                    state.deliveryTimelineExpanded = !state.deliveryTimelineExpanded;
                    render();
                });
            }

            var relationButton = panel.querySelector('[data-supplier-order-relation]');
            if (relationButton) relationButton.addEventListener('click', openRelationDrawer);

            panel.querySelectorAll('[data-supplier-order-demo-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    showToast(this.dataset.supplierOrderDemoAction + '操作已触发（原型演示）');
                });
            });

            panel.querySelectorAll('[data-supplier-delivery-demo-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    showToast(this.dataset.supplierDeliveryDemoAction + '操作已触发（原型演示）');
                });
            });

            panel.querySelectorAll('[data-supplier-delivery-call-status]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.deliveryCallStatus = this.dataset.supplierDeliveryCallStatus;
                    render();
                });
            });

            var deliveryStartDate = panel.querySelector('[data-supplier-delivery-start-date]');
            if (deliveryStartDate) {
                deliveryStartDate.addEventListener('change', function () {
                    state.deliveryStartDate = this.value;
                    render();
                });
            }

            var deliveryEndDate = panel.querySelector('[data-supplier-delivery-end-date]');
            if (deliveryEndDate) {
                deliveryEndDate.addEventListener('change', function () {
                    state.deliveryEndDate = this.value;
                    render();
                });
            }

            bindCopyButtons(panel);

            panel.querySelectorAll('[data-supplier-order-tab]').forEach(function (button) {
                button.addEventListener('click', function () {
                    applyKeyword();
                    state.tab = this.dataset.supplierOrderTab;
                    render();
                });
            });

            var keywordInput = panel.querySelector('[data-supplier-order-keyword]');
            if (keywordInput) {
                keywordInput.addEventListener('input', function () {
                    state.keywordDraft = this.value;
                });
                keywordInput.addEventListener('keydown', function (event) {
                    if (event.key !== 'Enter') return;
                    applyKeyword();
                    render();
                });
            }

            var queryButton = panel.querySelector('[data-supplier-order-query]');
            if (queryButton) {
                queryButton.addEventListener('click', function () {
                    applyKeyword();
                    render();
                });
            }

            var filterToggle = panel.querySelector('[data-supplier-order-filter-toggle]');
            if (filterToggle) {
                filterToggle.addEventListener('click', function () {
                    state.filterOpen = !state.filterOpen;
                    render();
                });
            }

            var orderType = panel.querySelector('[data-supplier-order-type]');
            if (orderType) {
                orderType.value = state.orderType;
                orderType.addEventListener('change', function () {
                    applyKeyword();
                    state.orderType = this.value;
                    render();
                });
            }

            var productType = panel.querySelector('[data-supplier-order-product-type]');
            if (productType) {
                productType.value = state.productType;
                productType.addEventListener('change', function () {
                    applyKeyword();
                    state.productType = this.value;
                    render();
                });
            }

            var resetButton = panel.querySelector('[data-supplier-order-reset]');
            if (resetButton) {
                resetButton.addEventListener('click', function () {
                    applyKeyword();
                    state.orderType = '全部订单类型';
                    state.productType = ACTIVE_ORDER_CONFIG.allTypeLabel;
                    render();
                });
            }

            panel.querySelectorAll('[data-supplier-order-page]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.disabled) return;
                    var action = this.dataset.supplierOrderPage;
                    if (action === 'prev') changePage(state.page - 1);
                    else if (action === 'next') changePage(state.page + 1);
                    else changePage(action);
                });
            });

            var pageSize = panel.querySelector('[data-supplier-order-page-size]');
            if (pageSize) {
                pageSize.addEventListener('change', function () {
                    state.pageSize = parseInt(this.value, 10) || 10;
                    state.page = 1;
                    render();
                });
            }

            var pageJump = panel.querySelector('[data-supplier-order-page-jump]');
            if (pageJump) {
                pageJump.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') changePage(this.value);
                });
                pageJump.addEventListener('change', function () {
                    if (this.value) changePage(this.value);
                });
            }

            panel.querySelectorAll('[data-supplier-order-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var action = this.dataset.supplierOrderAction;
                    var clickedRecord = records.find(function (item) { return item.orderNo === button.dataset.supplierOrderNo; });
                    if (action === '取消订单') {
                        openBuyerCancelOrder(clickedRecord, this);
                        return;
                    }
                    if (action === '发起争议') {
                        openBuyerOrderDispute(clickedRecord, this);
                        return;
                    }
                    if (action === '订单详情') {
                        openOrderDetail(this.dataset.supplierOrderNo);
                        return;
                    }
                    if (action === '交付详情') {
                        openDeliveryDetail(this.dataset.supplierOrderNo);
                        return;
                    }
                    if (action === '去支付') {
                        openBuyerCheckout(clickedRecord);
                        return;
                    }
                    if (action === '确认交付') {
                        openConfirmDeliveryModal(clickedRecord, this);
                        return;
                    }
                    if (action === '去评价') {
                        openEvaluationModal(clickedRecord);
                        return;
                    }
                    if (action === '撤回关联') {
                        openWithdrawRelationModal(clickedRecord);
                        return;
                    }
                    if (action === '解除关联合同') {
                        openUnlinkContractDrawer(clickedRecord);
                        return;
                    }
                    if ((action === '关联审批' || action === '审核并签署') && window.SupplierContractApproval) {
                        var approvalOrderNo = this.dataset.supplierOrderNo;
                        var approvalRecord = records.find(function (item) { return item.orderNo === approvalOrderNo; });
                        var approvalSnapshot = approvalRecord && approvalRecord.contractSnapshot;
                        window.SupplierContractApproval.open({
                            orderNo: approvalOrderNo,
                            provider: approvalRecord ? getProviderName(approvalRecord) : '',
                            demander: approvalRecord ? getDemanderName(approvalRecord) : '',
                            itemName: approvalRecord ? approvalRecord.name : '',
                            amount: approvalRecord ? approvalRecord.amount : '',
                            appliedAt: approvalRecord ? approvalRecord.appliedAt : '',
                            businessType: ACTIVE_ORDER_CONFIG.contractBusinessType,
                            serviceFeeMode: CONTRACT_SERVICE_FEE_MODE,
                            serviceFeeValue: CONTRACT_SERVICE_FEE_VALUE,
                            signing: approvalRecord && approvalRecord.signMode ? approvalRecord.signMode : '电子签章',
                            initiatorRole: approvalRecord && approvalRecord.initiatorRole,
                            reviewerRole: approvalRecord && approvalRecord.reviewerRole,
                            approvalStatus: approvalRecord && approvalRecord.contractSubStatus,
                            currentNode: approvalRecord && approvalRecord.contractSubStatus,
                            signProgress: approvalRecord && approvalRecord.signProgress,
                            taskId: approvalRecord && approvalRecord.taskId,
                            taskStatus: approvalRecord && approvalRecord.taskStatus,
                            demoMode: Boolean(approvalRecord && approvalRecord.demoMode),
                            contractNo: approvalSnapshot && approvalSnapshot.id,
                            contractName: approvalSnapshot && approvalSnapshot.name,
                            startsAt: approvalSnapshot && approvalSnapshot.effectiveAt,
                            endsAt: approvalSnapshot && approvalSnapshot.endsAt,
                            fileName: approvalSnapshot && approvalSnapshot.fileName,
                            documentMode: approvalSnapshot && approvalSnapshot.documentMode || 'template',
                            templateName: approvalSnapshot && approvalSnapshot.templateName || ACTIVE_ORDER_CONFIG.contractTemplateName,
                            paymentMode: approvalSnapshot && approvalSnapshot.paymentMode,
                            paymentStages: approvalSnapshot && approvalSnapshot.paymentStages,
                            serviceFeeMode: approvalSnapshot && approvalSnapshot.serviceFeeMode || CONTRACT_SERVICE_FEE_MODE,
                            serviceFeeValue: approvalSnapshot && approvalSnapshot.serviceFeeValue != null ? approvalSnapshot.serviceFeeValue : CONTRACT_SERVICE_FEE_VALUE,
                            sourceMenu: ACTIVE_ORDER_CONFIG.menu,
                            returnUrl: buildSignReturnUrl(approvalOrderNo),
                            signUrl: approvalSnapshot && approvalSnapshot.signUrl,
                            onConfirm: function (result) {
                                if (approvalRecord) {
                                    if (result.decision === 'pass') {
                                        if (result.requiresSignature) {
                                            approvalRecord.status = '关联合同签署中';
                                            approvalRecord.taskId = result.taskId || approvalRecord.taskId;
                                            approvalRecord.taskStatus = '审核通过，等待当前企业完成签署';
                                            approvalRecord.contractSubStatus = '审核通过，待' + (approvalRecord.reviewerRole || '提供方') + '完成签署';
                                            approvalRecord.primaryAction = '继续签署';
                                            approvalRecord.currentActor = approvalRecord.reviewerRole || '提供方';
                                        } else {
                                            approvalRecord.status = '待支付';
                                            approvalRecord.taskStatus = '线下合同关联已确认';
                                            approvalRecord.contractSubStatus = '线下合同关联已确认，等待需求方支付';
                                            approvalRecord.signProgress = '3/3 已签署';
                                            approvalRecord.primaryAction = '';
                                            approvalRecord.currentActor = '需求方';
                                        }
                                    } else {
                                        approvalRecord.status = '待关联合同';
                                        approvalRecord.contractSubStatus = '上次关联审核不通过';
                                        approvalRecord.taskStatus = '签约任务已撤销';
                                        approvalRecord.primaryAction = '';
                                        approvalRecord.currentActor = approvalRecord.initiatorRole || '提供方';
                                    }
                                    syncContractSnapshotFromRecord(approvalRecord);
                                    render();
                                }
                                showToast(result.decision === 'pass'
                                    ? (result.requiresSignature ? '审核已通过，已打开法大大；签署结果以回调为准。' : '关联审核已通过，订单进入待支付。')
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
                        var orderNo = this.dataset.supplierOrderNo;
                        var record = records.find(function (item) { return item.orderNo === orderNo; });
                        window.SupplierContractDrawer.open({
                            orderNo: orderNo,
                            provider: record ? getProviderName(record) : '',
                            demander: record ? getDemanderName(record) : '',
                            itemName: record ? record.name : '',
                            amount: record ? record.amount : '',
                            serviceFeeMode: CONTRACT_SERVICE_FEE_MODE,
                            serviceFeeValue: CONTRACT_SERVICE_FEE_VALUE,
                            appliedAt: record ? record.appliedAt : '',
                            businessType: ACTIVE_ORDER_CONFIG.contractBusinessType,
                            templateName: ACTIVE_ORDER_CONFIG.contractTemplateName,
                            demoMode: Boolean(record && record.demoMode),
                            esignUnavailableDemo: Boolean(record && record.esignUnavailableDemo),
                            sourceMenu: ACTIVE_ORDER_CONFIG.menu,
                            returnUrl: buildSignReturnUrl(orderNo),
                            signUrl: record && record.contractSnapshot && record.contractSnapshot.signUrl,
                            onConfirm: function (values) {
                                if (!record) return;
                                createContractSnapshot(record, values);
                                if (record && values.signing === 'electronic') {
                                    record.status = '关联合同签署中';
                                    record.signMode = '电子签章';
                                    record.initiatorRole = getCurrentRoleLabel();
                                    record.reviewerRole = getCurrentRoleLabel();
                                    record.currentActor = getCurrentRoleLabel();
                                    record.contractSubStatus = '法大大任务已创建，三方可独立签署；当前' + getCurrentRoleLabel() + '待签署';
                                    record.signProgress = '0/3 已签署';
                                    record.taskId = values.taskId || ('FDD-' + String(record.orderNo).slice(-14));
                                    record.taskStatus = '签约任务进行中';
                                    record.primaryAction = '继续签署';
                                    syncContractSnapshotFromRecord(record);
                                    render();
                                    showToast('法大大签约任务已创建，三方可分别进入法大大完成签署。');
                                    return;
                                }
                                record.status = '关联审批中';
                                record.signMode = '线下签署';
                                record.initiatorRole = getCurrentRoleLabel();
                                record.reviewerRole = getCounterpartyRoleLabel();
                                record.currentActor = getCounterpartyRoleLabel();
                                record.contractSubStatus = getCurrentRoleLabel() + '已提交线下合同，等待' + getCounterpartyRoleLabel() + '确认关联';
                                record.signProgress = '--';
                                record.taskStatus = '等待关联确认';
                                record.primaryAction = '撤回关联';
                                syncContractSnapshotFromRecord(record);
                                render();
                                showToast('线下合同已提交，订单已进入关联审批中。');
                            },
                            onSignResult: function (signResult) {
                                var message = applyElectronicSignResult(record, signResult, getCurrentRoleLabel());
                                render();
                                showToast(message);
                            }
                        });
                        return;
                    }
                    if (action === '继续签署') {
                        var signOrderNo = this.dataset.supplierOrderNo || '';
                        var signRecord = records.find(function (item) { return item.orderNo === signOrderNo; });
                        if (window.FadadaSignDemo && signRecord) {
                            if (!signRecord.demoMode && (!window.ESignServiceState || !window.ESignServiceState.isReady())) {
                                showToast('当前企业电子签章服务尚未就绪，请前往用户中心查看状态。');
                                window.open('user-center.html?menu=esign-service', '_blank');
                                return;
                            }
                            var signSnapshot = signRecord.contractSnapshot || buildDefaultContractSnapshot(signRecord);
                            var signLaunchResult = window.FadadaSignDemo.open({
                                taskId: signRecord.taskId,
                                contractName: signSnapshot.name || (signRecord.name + '三方交易合同'),
                                contractNo: signSnapshot.id || '',
                                orderNo: signRecord.orderNo,
                                role: signRecord.reviewerRole || '提供方',
                                party: signRecord.reviewerRole === '平台运营方'
                                    ? '深圳市龙岗区数据要素交易服务有限公司'
                                    : (signRecord.reviewerRole === '需求方' ? getDemanderName(signRecord) : getProviderName(signRecord)),
                                node: action,
                                businessType: ACTIVE_ORDER_CONFIG.contractBusinessType,
                                sourceMenu: ACTIVE_ORDER_CONFIG.menu,
                                returnUrl: buildSignReturnUrl(signRecord.orderNo),
                                signUrl: signSnapshot.signUrl,
                                onResult: function (signResult) {
                                    var message = applyElectronicSignResult(signRecord, signResult, signRecord.reviewerRole || '提供方');
                                    render();
                                    showToast(message);
                                }
                            });
                            if (!signLaunchResult.windowRef) {
                                showToast('浏览器阻止了签署页面，请允许打开新窗口后重试。');
                                return;
                            }
                            showToast('已打开法大大签署页面，完成结果以回调为准。');
                        }
                        return;
                    }
                    showToast(action + '功能将在后续设计，本页仅展示操作入口。');
                });
            });
        }

        window.addEventListener('popstate', function () {
            closeOrderOperationLayer(true);
            closeRelationDrawer(true);
            var currentParams = new URLSearchParams(window.location.search || '');
            state.view = currentParams.get('view') === 'delivery' ? 'delivery' : (currentParams.get('view') === 'detail' ? 'detail' : 'list');
            state.detailOrderNo = currentParams.get('orderNo') || '';
            state.detailTab = DETAIL_TABS.some(function (tab) { return tab.key === currentParams.get('tab'); }) ? currentParams.get('tab') : 'order';
            state.deliveryTab = DELIVERY_TABS.some(function (tab) { return tab.key === currentParams.get('tab'); }) ? currentParams.get('tab') : 'basic';
            state.detailHistoryPushed = state.view !== 'list';
            render();
        });

        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSupplierProductOrders);
    } else {
        initSupplierProductOrders();
    }
})();
