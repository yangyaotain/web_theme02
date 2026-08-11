(function () {
    'use strict';

    var params = new URLSearchParams(window.location.search || '');
    var menu = params.get('menu');
    if (menu !== 'product-contract' && menu !== 'service-contract') return;

    var panel = document.querySelector('[data-consult-panel]');
    var title = document.querySelector('[data-center-title]');
    if (!panel) return;

    var role = panel.dataset.role || 'buyer';
    var businessType = menu === 'service-contract' ? 'service' : 'product';
    var PLATFORM_OPERATOR_NAME = '深圳市龙岗区数据要素交易服务有限公司';
    var activeContractId = '';
    var activeVoidContractId = '';
    var voidAgreementFile = null;
    var voidReason = '';
    var voidFeedback = '';
    var toastText = '';
    var state = {
        draftKeyword: '',
        keyword: '',
        signMethod: '全部签署方式',
        status: '全部状态',
        startDate: '',
        endDate: '',
        page: 1,
        pageSize: 10
    };

    var PRODUCT_ROWS = [
        ['LG-CP-20260718-119048', '2026071717251106400000101149048', '龙岗区交通运行拥堵指数数据产品交易合同', '龙岗区交通运行拥堵指数数据产品', '深圳市龙岗数智科技有限公司', '龙岗智慧交通科技有限公司', 1500, '--', '2026-07-18', '2027-07-17', '待签署', '已签署', '线上签署'],
        ['LG-CP-20260716-114833', '2026071610053204300000101148331', '产业链企业图谱查询产品交易合同', '产业链企业图谱查询产品', '深圳市龙岗数智科技有限公司', '深圳龙岗科创金融服务有限公司', 1500, '2026-07-16', '2026-07-16', '2027-07-15', '已签署', '已签署', '线上签署'],
        ['LG-CP-20260611-118853', '2026061014253600800000101148853', '中小微企业扶持政策匹配数据集交易合同', '龙岗区中小微企业扶持政策匹配数据集', '龙岗区企业服务集团有限公司', '深圳市龙岗智慧产业有限公司', 250, '2026-06-11', '2026-06-11', '2027-06-10', '已签署', '已签署', '线下签署'],
        ['LG-CP-20260606-118721', '2026060514041806600000101148721', '重点企业经营画像数据集采购合同', '重点企业经营画像数据集', '深圳市龙岗数智科技有限公司', '龙岗区产业发展研究中心', 1200, '2026-06-06', '2026-06-06', '2027-06-05', '已签署', '已签署', '线上签署'],
        ['LG-CP-20260530-118593', '2026052910362704700000101148593', '企业纳税信用评级数据产品采购合同', '龙岗区企业纳税信用评级数据产品', '龙岗区企业服务集团有限公司', '深圳市清澜企业服务有限公司', 800, '2026-05-30', '2026-05-30', '2027-05-29', '已签署', '已签署', '线下签署'],
        ['LG-CP-20260526-118465', '2026052517165302900000101148465', '园区企业经营趋势分析报告采购合同', '园区企业经营趋势分析报告', '深圳市龙岗数智科技有限公司', '龙岗区园区运营管理有限公司', 600, '2026-05-26', '2026-05-26', '2026-11-25', '已签署', '已签署', '线上签署'],
        ['LG-CP-20260521-118337', '2026052011420908400000101148337', '产业链企业关联关系数据产品交易合同', '产业链企业关联关系数据产品', '深圳市龙岗数智科技有限公司', '深圳市龙岗招商服务有限公司', 540, '--', '2026-05-21', '2026-11-20', '待签署', '已签署', '线上签署'],
        ['LG-CP-20260516-118209', '2026051515534202500000101148209', '企业诉求热点分析数据集采购合同', '企业诉求热点分析数据集', '龙岗区企业服务集团有限公司', '深圳市政务服务数据中心', 160, '2026-05-16', '2026-05-16', '2026-11-15', '已签署', '已签署', '线上签署'],
        ['LG-CP-20260511-118081', '2026051010053607300000101148081', '龙岗区从业人员结构分析数据采购合同', '龙岗区从业人员结构分析数据', '深圳市龙岗数智科技有限公司', '深圳市人力资源数据服务中心', 200, '2026-05-11', '2026-05-11', '2026-11-10', '已作废', '已作废', '线下签署'],
        ['LG-CP-20260506-117953', '2026050516194401500000101147953', '产业用房供需监测数据产品采购合同', '龙岗区产业用房供需监测数据产品', '深圳市龙岗数智科技有限公司', '龙岗区产业空间服务有限公司', 1400, '2026-05-06', '2026-05-06', '2027-05-05', '已签署', '已签署', '线上签署'],
        ['LG-CP-20260426-117697', '2026042511132405100000101147697', '园区企业基础登记信息数据采购合同', '园区企业基础登记信息数据产品', '龙岗区企业服务集团有限公司', '龙岗区绿色产业运营有限公司', 300, '2026-04-26', '2026-04-26', '2026-10-25', '已签署', '已签署', '线下签署'],
        ['LG-CP-20260418-117441', '2026041716421803100000101147441', '企业投融资事件监测数据产品交易合同', '企业投融资事件监测数据产品', '深圳市龙岗数智科技有限公司', '深圳市龙岗产业投资服务有限公司', 1800, '2026-04-18', '2026-04-18', '2027-04-17', '已签署', '已签署', '线上签署']
    ];

    var SERVICE_ROWS = [
        ['LG-FW-20260719-114949', '2026071817245104300000101149449', '数字化转型顶层规划咨询服务合同', '数字化转型顶层规划咨询服务', '深圳市龙岗数智科技有限公司', '龙岗数智产业研究院有限公司', 8000, '--', '2026-07-19', '2026-10-19', '待签署', '已签署', '线上签署'],
        ['LG-FW-20260716-114965', '2026071518321405400000101149497', '企业数据资源托管运营服务合同', '企业数据资源托管运营服务', '龙岗区企业服务集团有限公司', '龙岗区园区运营管理有限公司', 7200, '2026-07-16', '2026-07-16', '2027-01-15', '已签署', '已签署', '线下签署'],
        ['LG-FW-20260715-113908', '2026071510364507600000101139088', '数据治理成熟度评估服务合同', '数据治理成熟度评估服务', '深圳市龙岗数智科技有限公司', '龙岗区数据应用创新中心', 12000, '2026-07-15', '2026-07-15', '2026-11-15', '已签署', '已签署', '线上签署'],
        ['LG-FW-20260713-114981', '2026071216294803700000101149529', '数据产品市场化运营策划服务合同', '数据产品市场化运营策划服务', '深圳市龙岗数智科技有限公司', '深圳市龙岗招商服务有限公司', 6800, '2026-07-13', '2026-07-13', '2026-10-12', '已签署', '已签署', '线上签署'],
        ['LG-FW-20260711-114997', '2026071011182506400000101149545', '行业数据空间建设咨询服务合同', '行业数据空间建设咨询服务', '深圳市龙岗数智科技有限公司', '龙岗区产业发展研究中心', 12000, '2026-07-11', '2026-07-11', '2026-12-10', '已签署', '已签署', '线上签署'],
        ['LG-FW-20260709-115013', '2026070817260802200000101149561', '金融风控模型优化咨询服务合同', '金融风控模型优化咨询服务', '深圳市龙岗区数据服务中心', '深圳市龙岗科创金融服务有限公司', 5000, '2026-07-09', '2026-07-09', '2026-10-08', '已签署', '已签署', '线下签署'],
        ['LG-FW-20260708-115029', '2026070714070007500000101149577', '交通运行分析解决方案服务合同', '交通运行分析解决方案', '深圳市龙岗数智科技有限公司', '龙岗智慧交通科技有限公司', 3500, '--', '2026-07-08', '2026-10-07', '待签署', '已签署', '线上签署'],
        ['LG-FW-20260707-115045', '2026070613102407500000101149593', '数据治理成熟度阶段评估服务合同', '数据治理成熟度阶段评估服务', '深圳市龙岗数智科技有限公司', '龙岗区数据应用创新中心', 12000, '2026-07-07', '2026-07-07', '2026-12-06', '已签署', '已签署', '线上签署'],
        ['LG-FW-20260706-115061', '2026070510294107500000101149609', '公共数据授权运营咨询服务合同', '公共数据授权运营咨询服务', '深圳市龙岗数智科技有限公司', '龙岗数智产业研究院有限公司', 20000, '2026-07-06', '2026-07-06', '2026-09-30', '已签署', '已签署', '线上签署'],
        ['LG-FW-20260621-118466', '2026061916051502100000101148466', '金融风控数据建模与实施服务合同', '金融风控数据建模与实施服务', '深圳市龙岗区数据服务中心', '深圳市龙岗智慧产业有限公司', 1000, '2026-06-21', '2026-06-21', '2026-09-20', '已作废', '已作废', '线下签署'],
        ['LG-FW-20260613-118338', '2026061214183509100000101148338', '企业数据资产入表辅导服务合同', '企业数据资产入表辅导服务', '深圳市龙岗数智科技有限公司', '深圳市龙岗产业投资服务有限公司', 3000, '2026-06-13', '2026-06-13', '2026-09-12', '已签署', '已签署', '线上签署'],
        ['LG-FW-20260605-118210', '2026060410542703600000101148210', '园区数据治理体系规划咨询服务合同', '园区数据治理体系规划咨询服务', '深圳市龙岗数智科技有限公司', '龙岗区园区运营管理有限公司', 5000, '2026-06-05', '2026-06-05', '2026-10-04', '已签署', '已签署', '线上签署']
    ];

    function createContract(row, type, index) {
        var selfOperated = index % 5 === 2;
        var electronic = row[12] === '线上签署' || row[12] === '电子签章';
        var paymentMode = type === 'service' ? 'installment' : 'once';
        var serviceFeeMode = index % 4 === 1 ? 'G' : 'P';
        var serviceFeeValue = serviceFeeMode === 'G'
            ? (type === 'service' && row[6] >= 2000 ? 500 : 50)
            : (type === 'service' ? 2.5 : 3);
        var stageSource = type === 'service'
            ? [['首期款', 30], ['阶段款', 40], ['尾款', 30]]
            : [['一次性付款', 100]];
        var paymentStages = stageSource.map(function (stage, stageIndex) {
            return {
                periodNo: stageIndex + 1,
                periodName: stage[0],
                percent: stage[1],
                amount: row[6] * stage[1] / 100,
                payStatus: '待发起',
                outTradeNo: ''
            };
        });
        var supplierStatus = row[10];
        var buyerStatus = row[11];
        var voided = supplierStatus === '已作废' || buyerStatus === '已作废';
        var waiting = supplierStatus === '待签署' || buyerStatus === '待签署';
        var contractStatus = voided
            ? '已作废'
            : (waiting ? '签署中' : (electronic && index % 5 === 3 ? '已签署待归档' : '已签署并归档'));
        if (electronic && type === 'product' && index === 7) contractStatus = '签署异常';
        var signProgress = voided ? '--' : (waiting ? (supplierStatus === '待签署' && buyerStatus === '待签署' ? '1/3' : '2/3') : '3/3');
        var archiveStatus = contractStatus === '已签署并归档' ? '归档成功' : (contractStatus === '已签署待归档' ? '归档中' : '未归档');
        var evidenceStatus = contractStatus === '已签署并归档' && electronic ? '存证成功' : (electronic ? '未存证' : '不适用');
        var currentNode = voided
            ? '流程已结束'
            : (contractStatus === '签署异常'
                ? '签署回调异常'
                : (supplierStatus === '待签署'
                    ? '当前提供方待审核并签署'
                    : (buyerStatus === '待签署' ? '当前需求方待审核并签署' : (waiting ? '等待未签方完成' : '签署完成'))));
        var operatorReviewOrder = row[1] === '2026071717251106400000101149048' || row[1] === '2026071817245104300000101149449';
        if (operatorReviewOrder) {
            supplierStatus = '已签署';
            buyerStatus = '已签署';
            contractStatus = '签署中';
            signProgress = '2/3';
            archiveStatus = '未归档';
            evidenceStatus = '未存证';
            currentNode = '当前运营方待审核并签署';
        }
        return {
            id: row[0],
            orderNo: row[1],
            name: row[2],
            itemName: row[3],
            provider: selfOperated ? PLATFORM_OPERATOR_NAME : row[4],
            demander: row[5],
            amount: row[6],
            signedAt: row[7],
            effectiveAt: row[8],
            endsAt: row[9],
            supplierStatus: supplierStatus,
            buyerStatus: buyerStatus,
            operatorStatus: operatorReviewOrder ? '待审核并签署' : (waiting ? '待审核并签署' : (voided ? '已作废' : '已签署')),
            signMethod: electronic ? '电子签章' : '线下签署',
            contractStatus: contractStatus,
            signProgress: signProgress,
            currentNode: currentNode,
            archiveStatus: archiveStatus,
            evidenceStatus: evidenceStatus,
            evidenceNo: evidenceStatus === '存证成功' ? 'BC-LG-' + row[0].replace(/[^0-9]/g, '').slice(-12) : '--',
            fddEvidenceStatus: electronic && !waiting && !voided && contractStatus !== '签署异常' ? '证据已固化' : (electronic ? '未生成' : '不适用'),
            fddEvidenceNo: electronic && !waiting && !voided && contractStatus !== '签署异常' ? 'FDD-EV-' + row[0].replace(/[^0-9]/g, '').slice(-12) : '--',
            taskId: electronic ? 'FDD-' + row[0].replace(/[^0-9]/g, '').slice(-14) : '--',
            taskStatus: contractStatus === '签署异常' ? '回调验签失败' : ((waiting || operatorReviewOrder) ? '签约任务进行中' : (voided ? '合同已作废' : (electronic ? '签约任务已关闭' : '不适用'))),
            taskCloseStatus: electronic ? ((waiting || operatorReviewOrder || contractStatus === '签署异常') ? '未关闭' : (voided ? '已结束' : '关闭成功')) : '不适用',
            finalFileStatus: electronic && !waiting && !operatorReviewOrder && !voided && contractStatus !== '签署异常' ? '下载并校验成功' : (electronic ? '未生成' : '线下文件'),
            signingDeadline: electronic ? '2026-07-31' : '--',
            documentMode: electronic ? (index % 3 === 1 ? '上传待签PDF' : '法大大模板生成') : '线下合同文件',
            templateName: electronic && index % 3 !== 1 ? (type === 'service' ? '数据服务三方交易合同（V2.6）' : '数据产品三方交易合同（V3.2）') : '--',
            initiatorRole: index % 2 ? '需求方' : '提供方',
            latestException: contractStatus === '签署异常' ? '法大大回调验签失败，等待系统自动重试' : '--',
            type: type,
            source: index % 4 === 2 ? '线下合同补录' : '订单关联生成',
            remark: index % 3 === 1 ? '合同履约内容以双方确认的交付清单为准。' : '--',
            fileName: row[0] + '-' + (type === 'service' ? '服务合同' : '产品合同') + '.pdf',
            fileSize: (1.2 + (index % 5) * 0.3).toFixed(1) + ' MB',
            flowId: 'CF-' + row[0].replace(/[^0-9]/g, '').slice(-14),
            initiatedAt: (row[7] === '--' ? row[8] : row[7]) + ' ' + ['09:18:26', '10:36:12', '14:05:48'][index % 3],
            updatedAt: (row[7] === '--' ? row[8] : row[7]) + ' ' + ['15:18:26', '16:36:12', '17:05:48'][index % 3],
            contractAmount: row[6],
            serviceFeeMode: serviceFeeMode,
            serviceFeeValue: selfOperated ? 0 : serviceFeeValue,
            paymentMode: paymentMode,
            paymentStages: paymentStages,
            operationMode: selfOperated ? 'self' : 'thirdParty',
            partyTotal: selfOperated ? 2 : 3
        };
    }

    var CONTRACTS = PRODUCT_ROWS.map(function (row, index) {
        return createContract(row, 'product', index);
    }).concat(SERVICE_ROWS.map(function (row, index) {
        return createContract(row, 'service', index);
    }));
    if (window.EContractDemoScenarios) {
        CONTRACTS = window.EContractDemoScenarios.getContracts().concat(CONTRACTS);
    }

    function isSelfOperated(item) {
        if (item.operationMode === 'self') return true;
        if (item.operationMode === 'thirdParty') return false;
        return item.provider === PLATFORM_OPERATOR_NAME;
    }

    function getPartyLabel(item) {
        return isSelfOperated(item) ? '双方' : '三方';
    }

    function ensurePartyContractName(value, partyLabel) {
        var name = String(value || '');
        if (/双方|三方/.test(name)) return partyLabel === '双方' ? name.replace(/三方/g, '双方') : name;
        return name.replace(/交易合同$/, partyLabel + '交易合同').replace(/采购合同$/, partyLabel + '采购合同').replace(/服务合同$/, partyLabel + '服务合同');
    }

    CONTRACTS.forEach(function (item) {
        var selfOperated = isSelfOperated(item);
        var partyTotal = selfOperated ? 2 : 3;
        var partyLabel = selfOperated ? '双方' : '三方';
        item.operationMode = selfOperated ? 'self' : 'thirdParty';
        item.partyTotal = partyTotal;
        item.name = ensurePartyContractName(item.name, partyLabel);
        item.templateName = ensurePartyContractName(item.templateName, partyLabel);
        item.currentNode = selfOperated ? String(item.currentNode || '').replace(/三方/g, '双方').replace(/运营方/g, '需求方') : item.currentNode;
        if (item.signProgress !== '--') {
            item.signProgress = String(item.signProgress || '').replace(/(\d+)\/\d+/, function (_, count) {
                return Math.min(partyTotal, Number(count) || 0) + '/' + partyTotal;
            });
        }
        if (selfOperated) {
            item.provider = PLATFORM_OPERATOR_NAME;
            item.operatorStatus = '不适用';
            item.serviceFeeValue = 0;
        }
    });

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
        });
    }

    function icon(name) {
        var names = {
            search: 'search',
            filter: 'filter_alt',
            reset: 'restart_alt',
            view: 'visibility',
            void: 'delete_forever',
            close: 'close',
            file: 'description',
            download: 'download',
            sign: 'edit_note',
            link: 'link',
            detail: 'open_in_new',
            check: 'check_circle',
            lock: 'lock',
            info: 'info'
        };
        return '<span class="material-symbols-outlined" aria-hidden="true">' + (names[name] || names.detail) + '</span>';
    }

    function actionButton(label, action, iconName, className, attrs) {
        return '<button class="trade-contract-action ' + (className || '') + '" type="button" data-contract-action="' + action + '" ' + (attrs || '') + '>' + icon(iconName) + '<span>' + label + '</span></button>';
    }

    function getStatus(item) {
        return item.contractStatus;
    }

    function getMyStatus(item) {
        var menuConfig = window.LG_USER_MENU_CONFIG || {};
        var currentCompany = menuConfig.user && menuConfig.user.company;
        if (role === 'supplier' && currentCompany === PLATFORM_OPERATOR_NAME && !isSelfOperated(item)) return item.operatorStatus;
        return role === 'supplier' ? item.supplierStatus : item.buyerStatus;
    }

    function formatMoney(value) {
        return '¥' + Number(value || 0).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function formatFileSize(value) {
        var size = Number(value || 0);
        if (size < 1024 * 1024) return Math.max(1, Math.round(size / 1024)) + ' KB';
        return (size / 1024 / 1024).toFixed(2) + ' MB';
    }

    function isSignedPartyStatus(value) {
        return /已签署|已审核并签署/.test(String(value || ''));
    }

    function partyResult(value) {
        if (isSignedPartyStatus(value)) return '已签署';
        return value || '待签署';
    }

    function getStageServiceFee(item, stageAmount) {
        return item.serviceFeeMode === 'G'
            ? Number(item.serviceFeeValue || 0)
            : Number(stageAmount || 0) * Number(item.serviceFeeValue || 0) / 100;
    }

    function getTotalServiceFee(item) {
        return item.paymentStages.reduce(function (sum, stage) {
            return sum + getStageServiceFee(item, stage.amount);
        }, 0);
    }

    function formatServiceFeeRule(item) {
        return item.serviceFeeMode === 'G'
            ? '固定金额 ' + formatMoney(item.serviceFeeValue) + '/笔'
            : '金额比例 ' + Number(item.serviceFeeValue || 0).toFixed(2) + '%';
    }

    function getFilteredRecords() {
        var lower = state.keyword.trim().toLowerCase();
        return CONTRACTS.filter(function (item) {
            if (item.type !== businessType) return false;
            if (state.signMethod !== '全部签署方式' && item.signMethod !== state.signMethod) return false;
            if (state.status !== '全部状态' && getStatus(item) !== state.status) return false;
            if (state.startDate && (item.signedAt === '--' || item.signedAt < state.startDate)) return false;
            if (state.endDate && (item.signedAt === '--' || item.signedAt > state.endDate)) return false;
            if (!lower) return true;
            return [item.name, item.id, item.orderNo, item.provider, item.demander, item.itemName].join(' ').toLowerCase().indexOf(lower) !== -1;
        });
    }

    function renderStatus(value) {
        var className = /已签署并归档|已签署$|归档成功|存证成功/.test(value)
            ? 'signed'
            : (/作废|撤销/.test(value) ? 'voided' : (/异常|失败|不通过|拒绝/.test(value) ? 'danger' : 'pending'));
        return '<span class="trade-contract-status ' + className + '"><i></i>' + escapeHtml(value) + '</span>';
    }

    function canVoidContract(item) {
        return item.contractStatus === '已签署并归档';
    }

    function renderQuery() {
        return ''
            + '<section class="trade-contract-query" aria-label="合同查询条件">'
            +   '<div class="trade-contract-query-primary">'
            +       '<label class="trade-contract-search">' + icon('search') + '<input type="search" placeholder="输入' + (role === 'supplier' ? '需方' : '提供方') + '/合同编号/合同名称" value="' + escapeHtml(state.draftKeyword) + '" data-contract-search></label>'
            +       actionButton('查询', 'search', 'filter', 'query')
            +   '</div>'
            +   '<div class="trade-contract-query-advanced">'
            +       '<select data-contract-method aria-label="签署方式"><option>全部签署方式</option><option>电子签章</option><option>线下签署</option></select>'
            +       '<select data-contract-status aria-label="合同状态"><option>全部状态</option><option>待发起签署</option><option>签署中</option><option>已签署待归档</option><option>已签署并归档</option><option>签署异常</option><option>作废中</option><option>已撤销</option><option>已作废</option></select>'
            +       '<div class="trade-contract-date-range"><span>签署时间</span><input type="date" value="' + state.startDate + '" aria-label="签署开始日期" data-contract-start-date><b>—</b><input type="date" value="' + state.endDate + '" aria-label="签署结束日期" data-contract-end-date></div>'
            +       actionButton('重置', 'reset', 'reset', 'reset')
            +   '</div>'
            + '</section>';
    }

    function renderRows(records) {
        if (!records.length) {
            return '<tr><td class="trade-contract-empty" colspan="11">未找到符合条件的合同，请调整查询条件后重试</td></tr>';
        }
        return records.map(function (item) {
            var status = getStatus(item);
            var myStatus = getMyStatus(item);
            var counterparty = role === 'supplier' ? item.demander : item.provider;
            var actions = actionButton('查看详情', 'detail', 'view', '', 'data-contract-id="' + item.id + '"')
                + (canVoidContract(item) ? actionButton('作废合同', 'void', 'void', 'danger', 'data-contract-id="' + item.id + '"') : '');
            return ''
                + '<tr>'
                +   '<td class="contract-name-cell" title="' + escapeHtml(item.name) + '">' + escapeHtml(item.name) + '</td>'
                +   '<td title="' + escapeHtml(item.id) + '">' + escapeHtml(item.id) + '</td>'
                +   '<td>' + escapeHtml(item.signMethod) + '</td>'
                +   '<td class="contract-counterparty-cell" title="' + escapeHtml(counterparty) + '">' + escapeHtml(counterparty) + '</td>'
                +   '<td><button class="trade-contract-order-link" type="button" data-contract-action="order" data-contract-id="' + item.id + '">' + icon('link') + '<span>1</span></button></td>'
                +   '<td>' + renderStatus(myStatus) + '</td>'
                +   '<td><div class="trade-contract-progress"><strong>' + escapeHtml(item.signProgress) + '</strong><small>' + escapeHtml(item.currentNode) + '</small></div></td>'
                +   '<td class="contract-status-cell">' + renderStatus(status) + '</td>'
                +   '<td><div class="trade-contract-archive"><span>' + escapeHtml(item.archiveStatus) + '</span><small>' + escapeHtml(item.evidenceStatus) + '</small></div></td>'
                +   '<td>' + escapeHtml(item.updatedAt) + '</td>'
                +   '<td class="contract-actions-cell"><div class="trade-contract-actions">' + actions + '</div></td>'
                + '</tr>';
        }).join('');
    }

    function renderPagination(total, totalPages) {
        var pages = [];
        for (var page = 1; page <= totalPages; page += 1) {
            pages.push('<button class="trade-contract-page-btn' + (page === state.page ? ' active' : '') + '" type="button" data-contract-page="' + page + '">' + page + '</button>');
        }
        return ''
            + '<div class="trade-contract-pagination">'
            +   '<span>共 ' + total + ' 条</span>'
            +   '<button class="trade-contract-page-btn arrow" type="button" aria-label="上一页" data-contract-page="prev"' + (state.page <= 1 ? ' disabled' : '') + '>‹</button>'
            +   pages.join('')
            +   '<button class="trade-contract-page-btn arrow" type="button" aria-label="下一页" data-contract-page="next"' + (state.page >= totalPages ? ' disabled' : '') + '>›</button>'
            +   '<select class="trade-contract-page-size" data-contract-page-size aria-label="每页条数"><option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10 条/页</option><option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20 条/页</option><option value="50"' + (state.pageSize === 50 ? ' selected' : '') + '>50 条/页</option></select>'
            +   '<label class="trade-contract-page-jump"><span>前往</span><input type="number" min="1" max="' + totalPages + '" data-contract-page-jump aria-label="前往页码"></label>'
            + '</div>';
    }

    function renderTable() {
        var filtered = getFilteredRecords();
        var totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
        if (state.page > totalPages) state.page = totalPages;
        var start = (state.page - 1) * state.pageSize;
        var currentPageRecords = filtered.slice(start, start + state.pageSize);
        var counterpartyLabel = role === 'supplier' ? '需方' : '提供方';
        return ''
            + '<section class="trade-contract-table-card">'
            +   '<div class="trade-contract-table-scroll" aria-label="合同列表，可横向滚动">'
            +       '<table class="trade-contract-table">'
            +           '<colgroup><col class="col-name"><col class="col-id"><col class="col-method"><col class="col-party"><col class="col-order"><col class="col-status"><col class="col-progress"><col class="col-status"><col class="col-archive"><col class="col-updated"><col class="col-actions"></colgroup>'
            +           '<thead><tr><th>合同名称</th><th>合同编号</th><th>签署方式</th><th>' + counterpartyLabel + '</th><th>关联订单</th><th>我的状态</th><th>签约进度</th><th class="contract-status-cell">合同状态</th><th>归档/存证</th><th>更新时间</th><th class="contract-actions-cell">操作</th></tr></thead>'
            +           '<tbody>' + renderRows(currentPageRecords) + '</tbody>'
            +       '</table>'
            +   '</div>'
            +   renderPagination(filtered.length, totalPages)
            + '</section>';
    }

    function detailItem(label, value, className) {
        return '<div class="trade-contract-detail-item ' + (className || '') + '"><dt>' + label + '：</dt><dd title="' + escapeHtml(value) + '">' + escapeHtml(value) + '</dd></div>';
    }

    function renderPaymentTerms(item) {
        var selfOperated = isSelfOperated(item);
        var totalServiceFee = selfOperated ? 0 : getTotalServiceFee(item);
        var totalPercent = item.paymentStages.reduce(function (sum, stage) { return sum + Number(stage.percent || 0); }, 0);
        var stageRows = item.paymentStages.map(function (stage) {
            var serviceFee = selfOperated ? 0 : getStageServiceFee(item, stage.amount);
            var providerNet = Number(stage.amount || 0) - serviceFee;
            return ''
                + '<tr>'
                +   '<td>' + stage.periodNo + '</td>'
                +   '<td>' + escapeHtml(stage.periodName) + '</td>'
                +   '<td>' + Number(stage.percent || 0).toFixed(2) + '%</td>'
                +   '<td>' + formatMoney(stage.amount) + '</td>'
                +   (selfOperated ? '' : '<td>' + formatMoney(serviceFee) + '</td><td class="provider-net">' + formatMoney(providerNet) + '</td>')
                +   '<td><span class="trade-contract-payment-status">' + escapeHtml(stage.payStatus) + '</span></td>'
                + '</tr>';
        }).join('');
        return ''
            + '<section class="trade-contract-detail-section trade-contract-payment-section">'
            +   '<div class="trade-contract-payment-head">'
            +       '<div><h3>' + (selfOperated ? '付款条款' : '付款与分账条款') + '</h3><p>' + (selfOperated ? '以下内容为关联合同时已确定的付款计划。' : '以下内容为关联合同时已确定的付款计划和平台服务费规则。') + '</p></div>'
            +       '<span>' + icon('lock') + '签订后冻结</span>'
            +   '</div>'
            +   '<div class="trade-contract-payment-summary' + (selfOperated ? ' self-operated' : '') + '">'
            +       '<div><span>合同金额</span><strong>' + formatMoney(item.contractAmount) + '</strong><small>关联订单应付总额</small></div>'
            +       (selfOperated ? '' : '<div><span>平台服务费</span><strong>' + formatServiceFeeRule(item) + '</strong><small>按关联合同时规则冻结</small></div>')
            +       '<div><span>结算方式</span><strong>' + (item.type === 'service' ? '按合同付款计划支付' : '订单一次性支付') + '</strong><small>' + (selfOperated ? '运营方统一收款，不发起对外分账' : '支付成功后按订单发起分账') + '</small></div>'
            +       (selfOperated ? '<div><span>经营属性</span><strong>运营方自营</strong><small>提供方与收款方均为运营方</small></div>' : '<div><span>提供方预计实收</span><strong>' + formatMoney(item.contractAmount - totalServiceFee) + '</strong><small>合同金额扣除各笔平台服务费</small></div>')
            +   '</div>'
            +   '<div class="trade-contract-payment-mode"><span>付款方式</span><strong>' + (item.paymentMode === 'installment' ? '分期付款' : '一次性付款') + '</strong><small>关联合同时已确定</small></div>'
            +   '<div class="trade-contract-payment-table"><table><thead><tr><th>期次</th><th>阶段名称</th><th>付款比例</th><th>付款金额</th>' + (selfOperated ? '' : '<th>平台服务费</th><th>提供方实收</th>') + '<th>支付状态</th></tr></thead><tbody>' + stageRows + '</tbody></table></div>'
            +   '<div class="trade-contract-payment-foot"><span>' + icon('info') + '每一期在到达付款节点后独立生成支付流水号，未到付款节点不生成流水。</span><strong>合计：<b>' + totalPercent.toFixed(2) + '%</b> / <b>' + formatMoney(item.contractAmount) + '</b></strong></div>'
            + '</section>';
    }

    function renderContractFlow(item, status) {
        var completedAt = /已签署并归档|已作废/.test(status)
            ? (item.signedAt === '--' ? item.effectiveAt : item.signedAt) + ' 16:58:35'
            : '--';
        var electronicLogs = [
            ['签约任务创建', item.initiatorRole, '已完成', item.initiatedAt, '--'],
            ['提供方审核并签署', '提供方', partyResult(item.supplierStatus), isSignedPartyStatus(item.supplierStatus) ? item.updatedAt : '--', '--'],
            ['需求方审核并签署', '需求方', partyResult(item.buyerStatus), isSignedPartyStatus(item.buyerStatus) ? item.updatedAt : '--', '--']
        ];
        if (!isSelfOperated(item)) electronicLogs.push(['运营方审核并签署', '平台运营方', partyResult(item.operatorStatus), isSignedPartyStatus(item.operatorStatus) ? item.updatedAt : '--', '--']);
        electronicLogs.push(['任务关闭与归档', '系统', item.archiveStatus, item.archiveStatus === '归档成功' ? item.updatedAt : '--', item.latestException]);
        var offlineLogs = [
            ['关联合同', item.initiatorRole, '已完成', item.initiatedAt, '--'],
            ['线下合同归档', '系统', item.archiveStatus, item.updatedAt, '--']
        ];
        var logs = (item.signMethod === '电子签章' ? electronicLogs : offlineLogs).map(function (log) {
            return '<tr><td>' + escapeHtml(log[0]) + '</td><td>' + escapeHtml(log[1]) + '</td><td>' + escapeHtml(log[2]) + '</td><td>' + escapeHtml(log[3]) + '</td><td>' + escapeHtml(log[4]) + '</td></tr>';
        }).join('');
        return ''
            + '<section class="trade-contract-detail-section">'
            +   '<div class="trade-contract-section-title"><h3>合同流程</h3></div>'
            +   '<dl class="trade-contract-flow-info">'
            +       detailItem('流程ID', item.flowId) + detailItem('处理类型', '合同签署')
            +       detailItem('处理方式', item.signMethod) + detailItem('流程状态', status)
            +       detailItem('当前节点', item.currentNode) + detailItem('发起时间', item.initiatedAt)
            +       detailItem('签署截止时间', item.signingDeadline) + detailItem('结束时间', completedAt)
            +       detailItem('外部流程ID', item.taskId, 'wide')
            +   '</dl>'
            +   '<h4 class="trade-contract-flow-log-title">流程日志</h4>'
            +   '<div class="trade-contract-flow-log"><table><thead><tr><th>流程节点</th><th>操作人角色</th><th>操作结果</th><th>操作时间</th><th>操作意见</th></tr></thead><tbody>' + logs + '</tbody></table></div>'
            + '</section>';
    }

    function renderVoidInfo(item) {
        if (!item.voidAgreementName) return '';
        return ''
            + '<section class="trade-contract-detail-section trade-contract-void-info">'
            +   '<div class="trade-contract-section-title"><h3>合同作废信息</h3>' + renderStatus(item.voidStatus || '作废协议已提交') + '</div>'
            +   '<dl class="trade-contract-detail-grid">'
            +       detailItem('作废原因', item.voidReason || '--', 'wide')
            +       detailItem('提交时间', item.voidSubmittedAt || '--')
            +       detailItem('处理状态', item.voidStatus || '作废协议已提交')
            +   '</dl>'
            +   '<div class="trade-contract-file-list trade-contract-void-file"><div class="trade-contract-file-row"><span title="' + escapeHtml(item.voidAgreementName) + '">' + icon('file') + '<b>作废协议</b>' + escapeHtml(item.voidAgreementName) + '<small>' + escapeHtml(item.voidAgreementSize || '--') + '</small></span><div>' + actionButton('预览', 'view-file', 'view', '', 'data-contract-id="' + item.id + '"') + actionButton('下载', 'download-file', 'download', '', 'data-contract-id="' + item.id + '"') + '</div></div></div>'
            + '</section>';
    }

    function renderDrawer() {
        if (!activeContractId) return '';
        var item = CONTRACTS.find(function (contract) { return contract.id === activeContractId; });
        if (!item) return '';
        var status = getStatus(item);
        var signedCount = parseInt(item.signProgress, 10);
        if (!Number.isFinite(signedCount)) signedCount = /已作废/.test(status) ? 3 : 0;
        var signedTime = item.signedAt === '--' ? item.updatedAt : item.signedAt;
        var supplierSignStatus = item.supplierStatus === '已作废' ? '已签署' : item.supplierStatus;
        var buyerSignStatus = item.buyerStatus === '已作废' ? '已签署' : item.buyerStatus;
        var operatorSignStatus = item.operatorStatus === '已作废' ? '已签署' : item.operatorStatus;
        var selfOperated = isSelfOperated(item);
        var partyLabel = getPartyLabel(item);
        var completeProgress = item.partyTotal + '/' + item.partyTotal;
        var signerRowData = [
            ['法人', '提供方', item.provider, isSignedPartyStatus(supplierSignStatus) ? '已审核' : '待处理', supplierSignStatus, isSignedPartyStatus(supplierSignStatus) ? signedTime : '--'],
            ['法人', '需求方', item.demander, isSignedPartyStatus(buyerSignStatus) ? '已审核' : '待处理', buyerSignStatus, isSignedPartyStatus(buyerSignStatus) ? signedTime : '--']
        ];
        if (!selfOperated) signerRowData.push(['法人', '平台运营方', PLATFORM_OPERATOR_NAME, isSignedPartyStatus(operatorSignStatus) ? '已审核' : '待处理', operatorSignStatus, isSignedPartyStatus(operatorSignStatus) ? signedTime : '--']);
        var signerRows = signerRowData.map(function (row) {
            return '<tr><td>' + row[0] + '</td><td>' + row[1] + '</td><td>' + escapeHtml(row[2]) + '</td><td>' + renderStatus(row[3]) + '</td><td>' + renderStatus(row[4]) + '</td><td>' + escapeHtml(row[5]) + '</td></tr>';
        }).join('');
        var approvalRowData = [
            ['签约任务创建', item.initiatorRole, '已完成', item.initiatedAt, '--'],
            ['提供方审核并签署', '提供方', partyResult(item.supplierStatus), isSignedPartyStatus(item.supplierStatus) ? item.updatedAt : '--', '--'],
            ['需求方审核并签署', '需求方', partyResult(item.buyerStatus), isSignedPartyStatus(item.buyerStatus) ? item.updatedAt : '--', '--']
        ];
        if (!selfOperated) approvalRowData.push(['运营方审核并签署', '平台运营方', partyResult(item.operatorStatus), isSignedPartyStatus(item.operatorStatus) ? item.updatedAt : '--', '--']);
        var approvalRows = approvalRowData.map(function (row) {
            return '<tr><td>' + escapeHtml(row[0]) + '</td><td>' + escapeHtml(row[1]) + '</td><td>' + escapeHtml(row[2]) + '</td><td>' + escapeHtml(row[3]) + '</td><td>' + escapeHtml(row[4]) + '</td></tr>';
        }).join('');
        return ''
            + '<div class="trade-contract-drawer-mask" data-contract-drawer-close></div>'
            + '<aside class="trade-contract-drawer" role="dialog" aria-modal="true" aria-labelledby="tradeContractDrawerTitle">'
            +   '<header><button type="button" data-contract-action="close-drawer" aria-label="关闭合同详情">' + icon('close') + '</button><h2 id="tradeContractDrawerTitle">合同详情</h2></header>'
            +   '<div class="trade-contract-drawer-body">'
            +       '<section class="trade-contract-detail-section">'
            +           '<div class="trade-contract-section-title"><h3>合同基本信息</h3>' + renderStatus(status) + '</div>'
            +           '<dl class="trade-contract-detail-grid">'
            +               detailItem('合同名称', item.name) + detailItem('合同编号', item.id)
            +               detailItem('合同生效时间', item.effectiveAt) + detailItem('合同失效时间', item.endsAt)
            +               detailItem('合同签署方式', item.signMethod) + detailItem('签署时间', item.signedAt)
            +               detailItem('合同来源', item.source) + detailItem('关联订单', item.orderNo)
            +               detailItem('经营属性', selfOperated ? '自营' : '第三方') + detailItem('合同主体', partyLabel + '合同')
            +               detailItem('关联发起方', item.initiatorRole) + detailItem('当前处理节点', item.currentNode)
            +               detailItem('签署截止时间', item.signingDeadline) + detailItem('法大大任务编号', item.taskId)
            +               detailItem('交易标的', item.itemName, 'wide') + detailItem('备注', item.remark, 'wide')
            +           '</dl>'
            +       '</section>'
            +       (item.signMethod === '电子签章' ? '<section class="trade-contract-detail-section trade-contract-esign-card"><div class="trade-contract-section-title"><h3>电子签约信息</h3>' + renderStatus(item.taskStatus) + '</div><div class="trade-contract-esign-summary"><div><span>' + partyLabel + '签署进度</span><strong>' + escapeHtml(item.signProgress) + '</strong><small>' + escapeHtml(item.currentNode) + '</small></div><div><span>签约任务关闭</span><strong>' + escapeHtml(item.taskCloseStatus) + '</strong><small>' + partyLabel + '签署完成后关闭任务</small></div><div><span>最终签署文件</span><strong>' + escapeHtml(item.finalFileStatus) + '</strong><small>下载后校验文件摘要</small></div><div><span>本地归档</span><strong>' + escapeHtml(item.archiveStatus) + '</strong><small>最终文件以本地归档为主</small></div><div><span>法大大司法存证</span><strong>' + escapeHtml(item.fddEvidenceStatus) + '</strong><small>' + escapeHtml(item.fddEvidenceNo) + '</small></div><div><span>平台区块链存证</span><strong>' + escapeHtml(item.evidenceStatus) + '</strong><small>' + escapeHtml(item.evidenceNo) + '</small></div></div>' + (item.latestException !== '--' ? '<div class="trade-contract-exception">' + icon('info') + '<span>' + escapeHtml(item.latestException) + '</span></div>' : '') + '</section>' : '')
            +       renderPaymentTerms(item)
            +       renderVoidInfo(item)
            +       '<section class="trade-contract-detail-section">'
            +           '<div class="trade-contract-section-title"><h3>合同文件</h3></div>'
            +           '<div class="trade-contract-file-list"><div class="trade-contract-file-row"><span title="' + escapeHtml(item.fileName) + '">' + icon('file') + '<b>原始合同</b>' + escapeHtml(item.fileName) + '<small>' + item.fileSize + '</small></span><div>' + actionButton('预览', 'view-file', 'view', '', 'data-contract-id="' + item.id + '"') + actionButton('下载', 'download-file', 'download', '', 'data-contract-id="' + item.id + '"') + '</div></div>' + (item.finalFileStatus === '下载并校验成功' ? '<div class="trade-contract-file-row"><span>' + icon('file') + '<b>最终合同</b>' + escapeHtml(item.id + '-' + partyLabel + '签署完成.pdf') + '<small>' + (item.archiveStatus === '归档成功' ? 'SHA256 已校验 · 已归档' : 'SHA256 已校验 · 待归档') + '</small></span><div>' + actionButton('预览', 'view-file', 'view', '', 'data-contract-id="' + item.id + '"') + actionButton('下载', 'download-file', 'download', '', 'data-contract-id="' + item.id + '"') + '</div></div>' : '<div class="trade-contract-file-pending">' + (item.signProgress === completeProgress ? partyLabel + '签署已完成，等待关闭任务并下载最终合同' : '等待' + partyLabel + '签署完成后生成最终合同') + '</div>') + '</div>'
            +       '</section>'
            +       '<section class="trade-contract-detail-section">'
            +           '<div class="trade-contract-section-title"><h3>审核及签署记录</h3></div>'
            +           '<div class="trade-contract-detail-table"><table><thead><tr><th>处理节点</th><th>处理方</th><th>处理结果</th><th>处理时间</th><th>意见</th></tr></thead><tbody>' + approvalRows + '</tbody></table></div>'
            +       '</section>'
            +       '<section class="trade-contract-detail-section">'
            +           '<div class="trade-contract-section-title"><h3>签署主体</h3></div>'
            +           '<div class="trade-contract-detail-table signers"><table><thead><tr><th>主体类型</th><th>签署方角色</th><th>签署方名称</th><th>审核状态</th><th>签署状态</th><th>签署时间</th></tr></thead><tbody>' + signerRows + '</tbody></table></div>'
            +       '</section>'
            +       renderContractFlow(item, status)
            +   '</div>'
            + '</aside>';
    }

    function renderVoidDialog() {
        if (!activeVoidContractId) return '';
        var item = CONTRACTS.find(function (contract) { return contract.id === activeVoidContractId; });
        if (!item) return '';
        var fileState = voidAgreementFile
            ? '<div class="trade-contract-void-file-state is-selected">' + icon('file') + '<div><strong>' + escapeHtml(voidAgreementFile.name) + '</strong><small>' + escapeHtml(formatFileSize(voidAgreementFile.size)) + '</small></div><button type="button" data-contract-void-select>重新选择</button></div>'
            : '<div class="trade-contract-void-file-state">' + icon('file') + '<div><strong>上传作废协议</strong><small>仅支持 PDF，单个文件不超过 20 MB</small></div><button type="button" data-contract-void-select>选择文件</button></div>';
        return ''
            + '<div class="trade-contract-void-mask" data-contract-void-close></div>'
            + '<section class="trade-contract-void-modal" role="dialog" aria-modal="true" aria-labelledby="tradeContractVoidTitle">'
            +   '<header><div><h2 id="tradeContractVoidTitle">作废合同</h2><p>提交作废原因及作废协议后，进入合同作废处理。</p></div><button type="button" data-contract-void-close aria-label="关闭作废合同弹窗">' + icon('close') + '</button></header>'
            +   '<form data-contract-void-form>'
            +       '<div class="trade-contract-void-body">'
            +           '<div class="trade-contract-void-contract"><span>待作废合同</span><strong>' + escapeHtml(item.name) + '</strong><small>' + escapeHtml(item.id) + ' · ' + escapeHtml(item.signMethod) + '</small></div>'
            +           '<div class="trade-contract-void-notice">' + icon('info') + '<span>提交后将创建合同作废流程，原合同、签署文件、存证信息和历史记录继续保留。</span></div>'
            +           (voidFeedback ? '<div class="trade-contract-void-feedback" role="alert">' + escapeHtml(voidFeedback) + '</div>' : '')
            +           '<label class="trade-contract-void-field is-required"><span>作废原因</span><div><textarea maxlength="200" placeholder="请说明合同作废原因" data-contract-void-reason>' + escapeHtml(voidReason) + '</textarea><small><b data-contract-void-count>' + voidReason.length + '</b>/200</small></div></label>'
            +           '<div class="trade-contract-void-field is-required"><span>作废协议</span><div><input type="file" accept=".pdf,application/pdf" data-contract-void-file hidden>' + fileState + '</div></div>'
            +       '</div>'
            +       '<footer><button class="trade-contract-action secondary" type="button" data-contract-void-close>' + icon('close') + '<span>取消</span></button><button class="trade-contract-action primary" type="submit">' + icon('check') + '<span>提交作废</span></button></footer>'
            +   '</form>'
            + '</section>';
    }

    function renderToast() {
        return toastText ? '<div class="trade-contract-toast" role="status">' + icon('check') + '<span>' + escapeHtml(toastText) + '</span></div>' : '';
    }

    function render() {
        var typeLabel = businessType === 'service' ? '服务' : '产品';
        if (title) title.textContent = typeLabel + '合同管理';
        document.title = typeLabel + '合同管理 - ' + (role === 'supplier' ? '供方中心' : '需方中心');
        panel.className = 'wb-consult-shell is-trade-contracts';
        panel.innerHTML = '<div class="trade-contract-page">' + renderQuery() + renderTable() + '</div>' + renderDrawer() + renderVoidDialog() + renderToast();
        bindEvents();
    }

    function showToast(message) {
        toastText = message;
        render();
        window.clearTimeout(showToast.timer);
        showToast.timer = window.setTimeout(function () {
            toastText = '';
            render();
        }, 2200);
    }

    function applySelectionQuery() {
        state.keyword = state.draftKeyword;
        state.page = 1;
        render();
    }

    function bindEvents() {
        var search = panel.querySelector('[data-contract-search]');
        var method = panel.querySelector('[data-contract-method]');
        var status = panel.querySelector('[data-contract-status]');
        var startDate = panel.querySelector('[data-contract-start-date]');
        var endDate = panel.querySelector('[data-contract-end-date]');
        var pageSize = panel.querySelector('[data-contract-page-size]');
        var pageJump = panel.querySelector('[data-contract-page-jump]');

        if (search) {
            search.addEventListener('input', function () { state.draftKeyword = this.value; });
            search.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    state.keyword = state.draftKeyword;
                    state.page = 1;
                    render();
                }
            });
        }
        if (method) {
            method.value = state.signMethod;
            method.addEventListener('change', function () { state.signMethod = this.value; applySelectionQuery(); });
        }
        if (status) {
            status.value = state.status;
            status.addEventListener('change', function () { state.status = this.value; applySelectionQuery(); });
        }
        if (startDate) startDate.addEventListener('change', function () { state.startDate = this.value; applySelectionQuery(); });
        if (endDate) endDate.addEventListener('change', function () { state.endDate = this.value; applySelectionQuery(); });
        if (pageSize) pageSize.addEventListener('change', function () { state.pageSize = Number(this.value); state.page = 1; render(); });
        if (pageJump) {
            pageJump.addEventListener('keydown', function (event) {
                if (event.key !== 'Enter') return;
                var totalPages = Math.max(1, Math.ceil(getFilteredRecords().length / state.pageSize));
                state.page = Math.max(1, Math.min(totalPages, Number(this.value) || 1));
                render();
            });
        }

        panel.querySelectorAll('[data-contract-page]').forEach(function (control) {
            control.addEventListener('click', function () {
                var target = this.dataset.contractPage;
                var totalPages = Math.max(1, Math.ceil(getFilteredRecords().length / state.pageSize));
                if (target === 'prev') state.page = Math.max(1, state.page - 1);
                else if (target === 'next') state.page = Math.min(totalPages, state.page + 1);
                else state.page = Number(target) || 1;
                render();
            });
        });

        panel.querySelectorAll('[data-contract-action]').forEach(function (control) {
            control.addEventListener('click', function () {
                var action = this.dataset.contractAction;
                var contractId = this.dataset.contractId;
                if (action === 'search') {
                    state.keyword = state.draftKeyword;
                    state.page = 1;
                    render();
                } else if (action === 'reset') {
                    state = { draftKeyword: '', keyword: '', signMethod: '全部签署方式', status: '全部状态', startDate: '', endDate: '', page: 1, pageSize: state.pageSize };
                    render();
                } else if (action === 'detail') {
                    activeContractId = contractId;
                    render();
                } else if (action === 'close-drawer') {
                    activeContractId = '';
                    render();
                } else if (action === 'order') {
                    var orderItem = CONTRACTS.find(function (item) { return item.id === contractId; });
                    showToast(orderItem ? '已关联订单：' + orderItem.orderNo : '未找到关联订单。');
                } else if (action === 'void') {
                    activeContractId = '';
                    activeVoidContractId = contractId;
                    voidAgreementFile = null;
                    voidReason = '';
                    voidFeedback = '';
                    render();
                } else if (action === 'view-file') {
                    showToast('合同文件预览已打开。');
                } else if (action === 'download-file') {
                    showToast('合同文件已加入下载任务。');
                }
            });
        });

        var drawerMask = panel.querySelector('[data-contract-drawer-close]');
        if (drawerMask) drawerMask.addEventListener('click', function () { activeContractId = ''; render(); });

        panel.querySelectorAll('[data-contract-void-close]').forEach(function (control) {
            control.addEventListener('click', function () {
                activeVoidContractId = '';
                voidAgreementFile = null;
                voidReason = '';
                voidFeedback = '';
                render();
            });
        });
        var voidReasonInput = panel.querySelector('[data-contract-void-reason]');
        if (voidReasonInput) {
            voidReasonInput.addEventListener('input', function () {
                voidReason = this.value;
                var counter = panel.querySelector('[data-contract-void-count]');
                if (counter) counter.textContent = String(voidReason.length);
                if (voidFeedback) {
                    voidFeedback = '';
                    var feedback = panel.querySelector('.trade-contract-void-feedback');
                    if (feedback) feedback.remove();
                }
            });
        }
        panel.querySelectorAll('[data-contract-void-select]').forEach(function (control) {
            control.addEventListener('click', function () {
                var input = panel.querySelector('[data-contract-void-file]');
                if (input) input.click();
            });
        });
        var voidFileInput = panel.querySelector('[data-contract-void-file]');
        if (voidFileInput) {
            voidFileInput.addEventListener('change', function () {
                var file = this.files && this.files[0];
                if (!file) return;
                var isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
                if (!isPdf) {
                    voidAgreementFile = null;
                    voidFeedback = '作废协议仅支持 PDF 文件。';
                } else if (file.size > 20 * 1024 * 1024) {
                    voidAgreementFile = null;
                    voidFeedback = '作废协议不能超过 20 MB。';
                } else {
                    voidAgreementFile = file;
                    voidFeedback = '';
                }
                render();
            });
        }
        var voidForm = panel.querySelector('[data-contract-void-form]');
        if (voidForm) {
            voidForm.addEventListener('submit', function (event) {
                event.preventDefault();
                voidReason = (panel.querySelector('[data-contract-void-reason]') || {}).value || voidReason;
                if (!voidReason.trim()) {
                    voidFeedback = '请填写作废原因。';
                    render();
                    return;
                }
                if (!voidAgreementFile) {
                    voidFeedback = '请上传 PDF 格式的作废协议。';
                    render();
                    return;
                }
                var voidItem = CONTRACTS.find(function (item) { return item.id === activeVoidContractId; });
                if (!voidItem) return;
                var submittedAt = new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-');
                voidItem.contractStatus = '作废中';
                voidItem.currentNode = '作废协议已提交，等待合同作废流程处理';
                voidItem.taskStatus = '作废处理中';
                voidItem.voidStatus = '作废协议已提交';
                voidItem.voidAgreementName = voidAgreementFile.name;
                voidItem.voidAgreementSize = formatFileSize(voidAgreementFile.size);
                voidItem.voidReason = voidReason.trim();
                voidItem.voidSubmittedAt = submittedAt;
                voidItem.updatedAt = submittedAt;
                activeVoidContractId = '';
                voidAgreementFile = null;
                voidReason = '';
                voidFeedback = '';
                showToast('作废协议已提交，合同已进入作废处理中。');
            });
        }
    }

    var requestedOrderNo = params.get('orderNo');
    if (requestedOrderNo) {
        var requestedContract = CONTRACTS.find(function (item) {
            return item.type === businessType && item.orderNo === requestedOrderNo;
        });
        if (requestedContract) {
            activeContractId = requestedContract.id;
        }
    }

    document.addEventListener('lg-user-menu-config-ready', function () { render(); }, { once: true });
    render();
})();
