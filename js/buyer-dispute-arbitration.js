(function () {
    'use strict';

    var initialParams = new URLSearchParams(window.location.search);
    var initialMenu = initialParams.get('menu') || '';
    var SUPPORTED_MENUS = ['dispute', 'service-dispute', 'arbitration', 'service-arbitration'];
    if (SUPPORTED_MENUS.indexOf(initialMenu) < 0) return;

    var panel = document.querySelector('[data-consult-panel]');
    var pageTitle = document.querySelector('[data-center-title]');
    if (!panel || !pageTitle) return;
    var currentRole = panel.getAttribute('data-role') || 'buyer';
    var centerPage = currentRole === 'supplier' ? 'supplier-center.html' :
        currentRole === 'operation' ? 'operation-dispute-arbitration.html' : 'buyer-center.html';
    var centerName = currentRole === 'supplier' ? '供方中心' : currentRole === 'operation' ? '运营中心' : '需方中心';

    var DISPUTE_STATUSES = ['待审批', '已通过', '已驳回', '转仲裁', '已关闭'];
    var ARBITRATION_STATUSES = ['仲裁中', '需方已上报', '供方已上报', '双方已上报', '采纳需方结果', '采纳供方结果', '已关闭'];
    var TRADE_ORDERS = [
        { orderNo: '2026080611354207100000101162001', name: '龙岗区商事主体登记基础信息', menu: 'resource-order' },
        { orderNo: '2026070111185071000000101148100', name: '龙岗企业经营画像数据集', menu: 'product-order' },
        { orderNo: '2026080517081902300000101162017', name: '建筑工地扬尘监测数据', menu: 'resource-order' },
        { orderNo: '2026063015392301900000101148229', name: '重点企业运行监测数据产品', menu: 'product-order' },
        { orderNo: '2026080416123308500000101162033', name: '公交线路运行时刻数据', menu: 'resource-order' },
        { orderNo: '2026062710461803600000101148397', name: '龙岗区区域交通拥堵指数服务', menu: 'product-order' },
        { orderNo: '2026080312461506400000101162049', name: '惠企政策申报服务数据', menu: 'resource-order' },
        { orderNo: '2026062216553792300000101148580', name: '龙岗区产业经济运行监测数据产品', menu: 'product-order' },
        { orderNo: '2026080218042704200000101162065', name: '社区养老服务设施名录', menu: 'resource-order' },
        { orderNo: '2026061710091960000000101148788', name: '龙岗区公共信用评价数据服务', menu: 'product-order' },
        { orderNo: '2026080114273609600000101162081', name: '工业园区空间地理数据', menu: 'resource-order' },
        { orderNo: '2026061014253600800000101148853', name: '龙岗区中小微企业扶持政策匹配数据集', menu: 'product-order' },
        { orderNo: '2026072915124603300000101162129', name: '河流水质监测数据', menu: 'resource-order' },
        { orderNo: '2026060409472105400000101148980', name: '龙岗企业经营风险监测数据集', menu: 'product-order' }
    ];
    var SERVICE_ORDERS = [
        { orderNo: '2026071810260805600000101148479', name: '龙岗区企业数据资产入表全流程咨询服务', menu: 'service-order' },
        { orderNo: '2026071614070705400000101148401', name: '重点企业数据战略与要素发展规划咨询服务', menu: 'service-order' },
        { orderNo: '2026071414015101700000101148363', name: '企业数据治理诊断与质量提升实施服务', menu: 'service-order' },
        { orderNo: '2026070716265401500000101148252', name: '智慧园区数据融合应用解决方案设计服务', menu: 'service-order' },
        { orderNo: '2026070716015603600000101148208', name: '企业数据资产价值评估与登记辅导服务', menu: 'service-order' },
        { orderNo: '2026070715483204200000101148192', name: '园区企业数据治理整改实施服务', menu: 'service-order' },
        { orderNo: '2026061916051502100000101148466', name: '福田区金融风控数据建模与实施服务', menu: 'service-order' },
        { orderNo: '2026052710371205800000101148559', name: '企业数据产品合规评估与整改咨询服务', menu: 'service-order' },
        { orderNo: '2026052710303702400000101148518', name: '龙岗区企业数据接口接入技术实施服务', menu: 'service-order' },
        { orderNo: '2026052710260405600000101148472', name: '公共数据授权运营合规咨询服务', menu: 'service-order' },
        { orderNo: '2026052710252204500000101148465', name: '产业运行驾驶舱需求分析与指标设计服务', menu: 'service-order' },
        { orderNo: '2026052710245001700000101148458', name: '企业信用数据融合治理咨询服务', menu: 'service-order' },
        { orderNo: '2026052514225906300000101148564', name: '龙岗区企业数据资产托管运营服务', menu: 'service-order' }
    ];

    var disputeStatusSequence = ['待审批', '待审批', '已通过', '已通过', '已驳回', '已驳回', '转仲裁', '转仲裁', '已关闭', '已关闭'];
    var arbitrationStatusSequence = [
        '仲裁中', '仲裁中', '需方已上报', '需方已上报', '供方已上报', '供方已上报',
        '双方已上报', '双方已上报', '采纳需方结果', '采纳需方结果',
        '采纳供方结果', '采纳供方结果', '已关闭', '已关闭'
    ];

    var disputeTimes = [
        '2026-08-12 15:30:09', '2026-08-11 10:18:36', '2026-08-08 09:42:18', '2026-08-06 14:06:27',
        '2026-08-03 11:26:45', '2026-07-31 16:20:52', '2026-07-28 13:48:31', '2026-07-24 09:17:46',
        '2026-07-18 17:05:12', '2026-07-12 10:36:28'
    ];
    var arbitrationTimes = [
        '2026-08-12 16:22:14', '2026-08-10 11:08:46', '2026-08-08 15:34:22', '2026-08-06 10:29:17',
        '2026-08-03 17:16:35', '2026-07-31 14:42:08', '2026-07-29 09:52:41', '2026-07-26 16:18:59',
        '2026-07-24 14:26:38', '2026-07-21 10:15:24', '2026-07-18 16:22:14', '2026-07-15 11:47:06',
        '2026-07-11 09:38:40', '2026-07-08 15:03:26'
    ];

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function materialIcon(name, className) {
        return '<span class="material-symbols-outlined' + (className ? ' ' + className : '') + '" aria-hidden="true">' + name + '</span>';
    }

    function addMinutes(time, minutes) {
        var normalized = time.replace(' ', 'T');
        var date = new Date(normalized);
        date.setMinutes(date.getMinutes() + minutes);
        function pad(value) { return String(value).padStart(2, '0'); }
        return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + ' ' +
            pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
    }

    function buildDisputeLogs(record) {
        var logs = [{ node: '争议发起', operator: '需方', result: '发起成功', opinion: '--', time: record.initiatedAt }];
        if (record.status !== '待审批') {
            logs.unshift({
                node: '争议审核',
                operator: '供方',
                result: record.approvalResult,
                opinion: record.approvalOpinion,
                time: record.approvalAt
            });
        }
        if (record.status === '转仲裁') {
            logs.unshift({
                node: '转仲裁',
                operator: record.autoTransferred ? '系统' : '需方',
                result: record.autoTransferred ? '自动创建' : '发起成功',
                opinion: record.autoTransferred ? '供方审批不通过，自动转入仲裁。' : '--',
                time: record.autoTransferred ? record.approvalAt : addMinutes(record.approvalAt, 11)
            });
        }
        if (record.status === '已关闭') {
            logs.unshift({ node: '争议关闭', operator: '运营', result: '关闭成功', opinion: '双方已完成协商，关闭本次争议。', time: addMinutes(record.approvalAt, 36) });
        }
        return logs;
    }

    function buildDisputeRecords(orders, serviceMode) {
        return disputeStatusSequence.map(function (status, index) {
        var order = orders[index % orders.length];
        var approvalResult = '--';
        var approvalOpinion = '--';
        if (status === '已通过') {
            approvalResult = '通过';
            approvalOpinion = '同意需方争议诉求，本次争议处理结束。';
        } else if (status === '已驳回') {
            approvalResult = '驳回';
            approvalOpinion = '现有材料不足以支持争议诉求，请补充完整证明。';
        } else if (status === '转仲裁') {
            approvalResult = '驳回';
            approvalOpinion = '双方未能就处理方案达成一致，转入仲裁。';
        } else if (status === '已关闭') {
            approvalResult = '通过';
            approvalOpinion = '双方已确认协商方案，同意结束争议处理。';
        }
        var record = {
            id: (serviceMode ? 'service-dispute-' : 'dispute-') + String(index + 1).padStart(2, '0'),
            disputeNo: '202608' + String(12 - index).padStart(2, '0') + (serviceMode ? '15305195500000101148' : '15300956200000101148') + String((serviceMode ? 705 : 601) + index).padStart(3, '0'),
            orderNo: order.orderNo,
            orderMenu: order.menu,
            name: order.name,
            initiatedAt: disputeTimes[index],
            status: status,
            description: (serviceMode ? [
                '服务交付成果与订单约定范围存在差异，申请核验处理。',
                '服务实施进度超过约定时间，申请确认后续交付方案。',
                '服务报告部分内容缺失，申请补充完整成果材料。',
                '现场实施记录与验收要求不一致，申请重新核验。',
                '服务成果暂未达到验收标准，申请双方进一步协商。'
            ] : [
                '交付数据字段与订单约定存在差异，申请核验交付内容。',
                '订单交付时间超过约定期限，申请确认后续处理方案。',
                '交付文件部分记录缺失，申请补充完整数据。',
                '数据更新频率与产品说明不一致，申请重新核验。',
                '部分接口调用结果为空，现有材料暂无法证明稳定交付。'
            ])[index % 5],
            attachments: index % 3 === 1 ? [] : [{ name: (serviceMode ? '服务争议材料-' : '争议材料-') + String(index + 1).padStart(2, '0') + '.pdf' }],
            approvalAt: status === '待审批' ? '--' : addMinutes(disputeTimes[index], 17 + index),
            approvalResult: approvalResult,
            approvalOpinion: approvalOpinion,
            approvalAttachments: index % 4 === 0 || status === '待审批' ? [] : [{ name: '审核说明-' + String(index + 1).padStart(2, '0') + '.pdf' }],
            arbitrationId: '',
            serviceMode: serviceMode
        };
        record.logs = buildDisputeLogs(record);
        return record;
        });
    }

    var disputes = buildDisputeRecords(TRADE_ORDERS, false);
    var serviceDisputes = buildDisputeRecords(SERVICE_ORDERS, true);

    function partyResult(side, status, index, updatedAt, serviceMode) {
        var hasDemand = ['需方已上报', '双方已上报', '采纳需方结果', '采纳供方结果', '已关闭'].indexOf(status) >= 0;
        var hasSupplier = ['供方已上报', '双方已上报', '采纳需方结果', '采纳供方结果', '已关闭'].indexOf(status) >= 0;
        var hasResult = side === 'demand' ? hasDemand : hasSupplier;
        if (!hasResult) return null;
        var demandDescriptions = serviceMode
            ? ['服务成果未达到验收要求，需要进一步沟通。', '要求按订单约定补充服务报告并完成整改。']
            : ['要求补齐缺失记录并重新出具质量说明。', '要求按合同约定完成数据修订和再次交付。'];
        var supplierDescriptions = serviceMode
            ? ['现有服务成果符合约定，建议按已交付内容处理。', '同意补充说明材料，不同意调整原服务范围。']
            : ['已完成交付核验，建议按现有交付结果结案。', '同意补充说明文件，不同意变更原订单交付范围。'];
        return {
            submittedAt: addMinutes(updatedAt, side === 'demand' ? -27 : -39),
            result: serviceMode
                ? (side === 'demand' && index % 2 === 0 ? '不执行买方要求' : '执行买方要求')
                : (side === 'demand' ? '执行买方要求' : '不执行买方要求'),
            description: side === 'demand' ? demandDescriptions[index % 2] : supplierDescriptions[index % 2],
            attachments: (index + (side === 'demand' ? 0 : 1)) % 3 === 0 ? [] : [{ name: (side === 'demand' ? '需方' : '供方') + (serviceMode ? '服务仲裁证明-' : '仲裁证明-') + String(index + 1).padStart(2, '0') + '.pdf' }]
        };
    }

    function buildArbitrationLogs(record) {
        var logs = [{ node: '转仲裁', operator: '需方', result: '发起成功', opinion: '--', time: record.initiatedAt || addMinutes(record.updatedAt, -58) }];
        if (record.supplierResult) {
            logs.unshift({ node: '供方上报仲裁结果', operator: '供方', result: '上传成功', opinion: '--', time: record.supplierResult.submittedAt });
        }
        if (record.demandResult) {
            logs.unshift({ node: '需方上报仲裁结果', operator: '需方', result: '上传成功', opinion: '--', time: record.demandResult.submittedAt });
        }
        if (record.status === '采纳需方结果' || record.status === '采纳供方结果') {
            logs.unshift({ node: '确认结果', operator: '运营', result: record.status, opinion: '--', time: record.updatedAt });
        }
        if (record.status === '已关闭') {
            logs.unshift({
                node: '关闭仲裁',
                operator: record.closedBy || '运营',
                result: '关闭成功',
                opinion: record.closedBy ? '--' : '双方协商一致，终止本次仲裁。',
                time: record.updatedAt
            });
        }
        return logs;
    }

    function buildArbitrationRecords(orders, disputeRecords, serviceMode) {
        return arbitrationStatusSequence.map(function (status, index) {
        var order = orders[index % orders.length];
        var sourceDispute = disputeRecords[index % disputeRecords.length];
        var record = {
            id: (serviceMode ? 'service-arbitration-' : 'arbitration-') + String(index + 1).padStart(2, '0'),
            arbitrationNo: '202608' + String(12 - Math.floor(index / 2)).padStart(2, '0') + (serviceMode ? '10352710000000101148' : '16212081900000101148') + String((serviceMode ? 455 : 319) + index).padStart(3, '0'),
            disputeId: sourceDispute.id,
            disputeNo: sourceDispute.disputeNo,
            orderNo: order.orderNo,
            orderMenu: order.menu,
            name: order.name,
            updatedAt: arbitrationTimes[index],
            initiatedAt: addMinutes(arbitrationTimes[index], -58),
            confirmedAt: ['采纳需方结果', '采纳供方结果', '已关闭'].indexOf(status) >= 0 ? arbitrationTimes[index] : '--',
            status: status,
            serviceMode: serviceMode
        };
        record.demandResult = partyResult('demand', status, index, record.updatedAt, serviceMode);
        record.supplierResult = partyResult('supplier', status, index, record.updatedAt, serviceMode);
        record.logs = buildArbitrationLogs(record);
        return record;
        });
    }

    var arbitrations = buildArbitrationRecords(TRADE_ORDERS, disputes, false);
    var serviceArbitrations = buildArbitrationRecords(SERVICE_ORDERS, serviceDisputes, true);

    function linkDisputesToArbitrations(disputeRecords, arbitrationRecords) {
        [8, 10].forEach(function (arbitrationIndex, linkIndex) {
            var dispute = disputeRecords[6 + linkIndex];
            var arbitration = arbitrationRecords[arbitrationIndex];
            arbitration.disputeId = dispute.id;
            arbitration.disputeNo = dispute.disputeNo;
            arbitration.orderNo = dispute.orderNo;
            arbitration.orderMenu = dispute.orderMenu;
            arbitration.name = dispute.name;
            dispute.arbitrationId = arbitration.id;
        });
    }

    linkDisputesToArbitrations(disputes, arbitrations);
    linkDisputesToArbitrations(serviceDisputes, serviceArbitrations);

    var state = {
        mode: initialMenu,
        view: initialParams.get('view') === 'detail' ? 'detail' : 'list',
        activeId: initialParams.get('id') || '',
        keywordDraft: '',
        keyword: '',
        status: '',
        startDate: '',
        endDate: '',
        filterOpen: false,
        selectOpen: false,
        page: 1,
        pageSize: 10
    };

    var pageTitleBar = null;

    function ensureRequirementsEntry() {
        if (pageTitleBar) return pageTitleBar;
        pageTitleBar = document.createElement('div');
        pageTitleBar.className = 'bda-page-titlebar';
        pageTitle.parentNode.insertBefore(pageTitleBar, pageTitle);
        pageTitleBar.appendChild(pageTitle);

        var requirementsLink = document.createElement('a');
        requirementsLink.className = 'bda-requirements-entry';
        requirementsLink.href = 'dispute-arbitration-requirements.html?from=' + encodeURIComponent(currentRole) + '&menu=' + encodeURIComponent(state.mode);
        requirementsLink.target = '_blank';
        requirementsLink.rel = 'noopener';
        requirementsLink.title = '查看争议仲裁需求说明（原型辅助文档）';
        requirementsLink.innerHTML = materialIcon('description') + '<span>需求说明</span>' + materialIcon('open_in_new', 'bda-requirements-entry-open');
        pageTitleBar.appendChild(requirementsLink);
        return pageTitleBar;
    }

    function isDisputeMode() {
        return state.mode === 'dispute' || state.mode === 'service-dispute';
    }

    function isServiceMode() {
        return state.mode === 'service-dispute' || state.mode === 'service-arbitration';
    }

    function isActiveArbitrationStatus(status) {
        return ['仲裁中', '需方已上报', '供方已上报', '双方已上报'].indexOf(status) >= 0;
    }

    function setPageTitle(title, visible) {
        var titleBar = ensureRequirementsEntry();
        pageTitle.textContent = title;
        pageTitle.style.display = '';
        titleBar.style.display = visible ? 'flex' : 'none';
        document.title = title + ' - ' + centerName;
    }

    function setPanelClass(modifier) {
        panel.className = (currentRole === 'operation' ? 'operation-dispute-panel' : 'wb-consult-shell') + ' bda-shell ' + modifier;
    }

    function currentRecords() {
        if (state.mode === 'dispute') return disputes;
        if (state.mode === 'service-dispute') return serviceDisputes;
        if (state.mode === 'service-arbitration') return serviceArbitrations;
        return arbitrations;
    }

    function currentStatuses() {
        return isDisputeMode() ? DISPUTE_STATUSES : ARBITRATION_STATUSES;
    }

    function recordDate(record) {
        return (isDisputeMode() ? record.initiatedAt : record.updatedAt).slice(0, 10);
    }

    function filteredRecords() {
        var keyword = state.keyword.toLowerCase();
        return currentRecords().filter(function (record) {
            var number = isDisputeMode() ? record.disputeNo : record.arbitrationNo;
            var keywordMatched = !keyword || [number, record.orderNo, record.name].some(function (value) {
                return String(value).toLowerCase().indexOf(keyword) >= 0;
            });
            var statusMatched = !state.status || record.status === state.status;
            var date = recordDate(record);
            var startMatched = !state.startDate || date >= state.startDate;
            var endMatched = !state.endDate || date <= state.endDate;
            return keywordMatched && statusMatched && startMatched && endMatched;
        });
    }

    function statusTone(status) {
        if (['已驳回', '未采纳'].indexOf(status) >= 0) return 'danger';
        if (isServiceMode() && !isDisputeMode() && status !== '已关闭') return 'success';
        if (['转仲裁', '需方已上报', '供方已上报', '双方已上报'].indexOf(status) >= 0) return 'warning';
        if (status === '已关闭') return 'muted';
        return 'success';
    }

    function renderStatus(status) {
        return '<span class="bda-status bda-status--' + statusTone(status) + '"><i aria-hidden="true"></i>' + escapeHtml(status) + '</span>';
    }

    function renderOrderLink(record) {
        return '<button type="button" class="bda-text-link bda-order-link" data-action="open-order" data-menu="' +
            escapeHtml(record.orderMenu) + '" data-order-no="' + escapeHtml(record.orderNo) + '">' + escapeHtml(record.orderNo) + '</button>';
    }

    function renderTooltipId(value) {
        return '<span class="bda-id-clip" tabindex="0" data-tooltip="' + escapeHtml(value) + '" aria-label="完整编号：' +
            escapeHtml(value) + '">' + escapeHtml(value) + '</span>';
    }

    function renderFilterSelect() {
        var label = state.status || (isDisputeMode() ? '争议状态' : '仲裁状态');
        return '<div class="bda-filter-select' + (state.selectOpen ? ' is-open' : '') + '">' +
            '<button type="button" class="bda-select-trigger" data-action="toggle-status" aria-haspopup="listbox" aria-expanded="' + state.selectOpen + '">' +
                '<span>' + escapeHtml(label) + '</span>' + materialIcon('expand_more') +
            '</button>' +
            (state.selectOpen ? '<div class="bda-select-menu" role="listbox" aria-label="' + escapeHtml(label) + '">' +
                currentStatuses().map(function (status) {
                    return '<button type="button" role="option" aria-selected="' + (state.status === status) + '" class="bda-select-option' +
                        (state.status === status ? ' is-selected' : '') + '" data-action="select-status" data-status="' + escapeHtml(status) + '">' +
                        escapeHtml(status) + '</button>';
                }).join('') + '</div>' : '') +
        '</div>';
    }

    function renderFilters() {
        if (!state.filterOpen) return '';
        return '<div class="bda-filter-row">' +
            renderFilterSelect() +
            '<div class="bda-date-range">' +
                '<span class="bda-date-label">发起时间</span>' +
                '<input type="date" aria-label="开始日期" data-field="start-date" value="' + escapeHtml(state.startDate) + '">' +
                '<span class="bda-date-separator">-</span>' +
                '<input type="date" aria-label="结束日期" data-field="end-date" value="' + escapeHtml(state.endDate) + '">' +
                materialIcon('calendar_month', 'bda-date-icon') +
            '</div>' +
            '<button type="button" class="bda-reset" data-action="reset">重置</button>' +
        '</div>';
    }

    function renderDisputeRows(records) {
        return records.map(function (record) {
            var actions = '';
            if (currentRole === 'supplier' && record.status === '待审批') {
                actions += '<button type="button" class="bda-text-link" data-action="approve-dispute" data-id="' + escapeHtml(record.id) + '">审批</button>';
            }
            if (record.status === '转仲裁' && record.arbitrationId) {
                actions += '<button type="button" class="bda-text-link" data-action="open-arbitration" data-id="' + escapeHtml(record.arbitrationId) + '">仲裁详情</button>';
            }
            actions += '<button type="button" class="bda-text-link" data-action="open-detail" data-id="' + escapeHtml(record.id) + '">争议详情</button>';
            return '<tr>' +
                '<td><span class="bda-number">' + escapeHtml(record.disputeNo) + '</span></td>' +
                '<td>' + renderOrderLink(record) + '</td>' +
                '<td><span class="bda-name" title="' + escapeHtml(record.name) + '">' + escapeHtml(record.name) + '</span></td>' +
                '<td>' + escapeHtml(record.initiatedAt) + '</td>' +
                '<td>' + renderStatus(record.status) + '</td>' +
                '<td><div class="bda-row-actions">' + actions + '</div></td>' +
            '</tr>';
        }).join('');
    }

    function renderArbitrationRows(records) {
        return records.map(function (record) {
            var actions = '';
            if (currentRole === 'supplier' && isActiveArbitrationStatus(record.status)) {
                actions += '<button type="button" class="bda-text-link" data-action="report-arbitration" data-id="' + escapeHtml(record.id) + '">上报仲裁结果</button>';
            } else if (currentRole === 'buyer' && isServiceMode() && isActiveArbitrationStatus(record.status)) {
                actions += '<button type="button" class="bda-text-link" data-action="report-arbitration" data-id="' + escapeHtml(record.id) + '">上报仲裁结果</button>';
            }
            if (currentRole === 'operation' && record.status === '双方已上报') {
                actions += '<button type="button" class="bda-text-link" data-action="open-detail" data-id="' + escapeHtml(record.id) + '">去确认结果</button>';
            } else {
                actions += '<button type="button" class="bda-text-link" data-action="open-detail" data-id="' + escapeHtml(record.id) + '">仲裁详情</button>';
            }
            if (currentRole === 'buyer' && isServiceMode() && isActiveArbitrationStatus(record.status)) {
                actions += '<button type="button" class="bda-text-link" data-action="close-arbitration" data-id="' + escapeHtml(record.id) + '">关闭仲裁</button>';
            }
            return '<tr>' +
                '<td>' + renderTooltipId(record.arbitrationNo) + '</td>' +
                '<td><span class="bda-number">' + escapeHtml(record.disputeNo) + '</span></td>' +
                '<td>' + renderOrderLink(record) + '</td>' +
                '<td><span class="bda-name" title="' + escapeHtml(record.name) + '">' + escapeHtml(record.name) + '</span></td>' +
                '<td>' + escapeHtml(record.updatedAt) + '</td>' +
                '<td>' + renderStatus(record.status) + '</td>' +
                '<td><div class="bda-row-actions">' + actions + '</div></td>' +
            '</tr>';
        }).join('');
    }

    function renderEmptyRow(colspan) {
        return '<tr><td colspan="' + colspan + '"><div class="bda-empty">' + materialIcon('inbox') + '<span>暂无符合条件的数据</span></div></td></tr>';
    }

    function renderPagination(total, totalPages) {
        var pages = [];
        for (var page = 1; page <= totalPages; page += 1) {
            if (totalPages <= 5 || page === 1 || page === totalPages || Math.abs(page - state.page) <= 1) {
                pages.push('<button type="button" class="bda-page-number' + (page === state.page ? ' is-active' : '') + '" data-action="page" data-page="' + page + '"' +
                    (page === state.page ? ' aria-current="page"' : '') + '>' + page + '</button>');
            } else if (pages[pages.length - 1] !== '<span class="bda-page-ellipsis">…</span>') {
                pages.push('<span class="bda-page-ellipsis">…</span>');
            }
        }
        return '<div class="bda-pagination">' +
            '<span class="bda-total">共 ' + total + ' 条</span>' +
            '<button type="button" class="bda-page-arrow" data-action="page" data-page="' + (state.page - 1) + '" ' + (state.page <= 1 ? 'disabled' : '') + ' aria-label="上一页">' + materialIcon('chevron_left') + '</button>' +
            pages.join('') +
            '<button type="button" class="bda-page-arrow" data-action="page" data-page="' + (state.page + 1) + '" ' + (state.page >= totalPages ? 'disabled' : '') + ' aria-label="下一页">' + materialIcon('chevron_right') + '</button>' +
            '<label class="bda-page-size"><span class="sr-only">每页条数</span><select data-field="page-size"><option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10 条/页</option><option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20 条/页</option><option value="50"' + (state.pageSize === 50 ? ' selected' : '') + '>50 条/页</option></select></label>' +
            '<label class="bda-page-jump">前往<input type="number" min="1" max="' + totalPages + '" data-field="page-jump" aria-label="跳转页码"></label>' +
        '</div>';
    }

    function renderList() {
        var isDispute = isDisputeMode();
        var title = isDispute ? '争议管理' : '仲裁管理';
        var records = filteredRecords();
        var totalPages = Math.max(1, Math.ceil(records.length / state.pageSize));
        if (state.page > totalPages) state.page = totalPages;
        var pageRecords = records.slice((state.page - 1) * state.pageSize, state.page * state.pageSize);
        setPageTitle(title, true);
        setPanelClass('bda-shell--list');
        panel.innerHTML = '<div class="bda-list-page">' +
            '<div class="bda-toolbar">' +
                '<label class="bda-search">' +
                    '<span class="sr-only">关键词</span><input type="text" data-field="keyword" value="' + escapeHtml(state.keywordDraft) + '" placeholder="请输入' + (isDispute ? '争议' : '仲裁') + '编号/订单编号/名称">' +
                    '<button type="button" data-action="search" aria-label="查询">' + materialIcon('search') + '</button>' +
                '</label>' +
                '<button type="button" class="bda-filter-toggle' + (state.filterOpen ? ' is-active' : '') + '" data-action="toggle-filter" aria-expanded="' + state.filterOpen + '" aria-label="筛选">' + materialIcon('filter_alt') + '</button>' +
            '</div>' +
            renderFilters() +
            '<div class="bda-table-wrap"><table class="bda-table ' + (isDispute ? 'bda-table--dispute' : 'bda-table--arbitration') + (state.mode === 'service-arbitration' ? ' bda-table--service-arbitration' : '') + '">' +
                '<thead><tr>' + (isDispute ?
                    '<th>争议编号</th><th>订单编号</th><th>名称</th><th>发起时间</th><th>争议状态</th><th>操作</th>' :
                    '<th>仲裁编号</th><th>争议编号</th><th>订单编号</th><th>名称</th><th>更新时间</th><th>仲裁状态</th><th>操作</th>') +
                '</tr></thead><tbody>' + (pageRecords.length ? (isDispute ? renderDisputeRows(pageRecords) : renderArbitrationRows(pageRecords)) : renderEmptyRow(isDispute ? 6 : 7)) + '</tbody>' +
            '</table></div>' +
            renderPagination(records.length, totalPages) +
        '</div>';
    }

    function renderAttachments(files) {
        if (!files || !files.length) return '<span class="bda-muted">--</span>';
        return files.map(function (file) {
            return '<span class="bda-file"><span>' + escapeHtml(file.name) + '</span>' +
                '<button type="button" class="bda-text-link" data-action="preview-file" data-file="' + escapeHtml(file.name) + '">预览</button>' +
                '<button type="button" class="bda-text-link" data-action="download-file" data-file="' + escapeHtml(file.name) + '">下载</button></span>';
        }).join('');
    }

    function renderDetailBackbar(label) {
        return '<div class="bda-detail-backbar"><button type="button" data-action="back-list">' + materialIcon('chevron_left') + '<span>' + escapeHtml(label) + '</span></button></div>';
    }

    function renderLogs(logs) {
        return '<section class="bda-detail-section"><h2>日志</h2><div class="bda-table-wrap"><table class="bda-log-table"><thead><tr>' +
            '<th>操作节点</th><th>操作人</th><th>操作结果</th><th>操作意见</th><th>操作时间</th>' +
            '</tr></thead><tbody>' + logs.map(function (log) {
                return '<tr><td>' + escapeHtml(log.node) + '</td><td>' + escapeHtml(log.operator) + '</td><td>' + escapeHtml(log.result) +
                    '</td><td>' + escapeHtml(log.opinion) + '</td><td>' + escapeHtml(log.time) + '</td></tr>';
            }).join('') + '</tbody></table></div></section>';
    }

    function renderDisputeDetail(record) {
        var detailTitle = isServiceMode() ? '服务争议详情' : '争议详情';
        setPageTitle(detailTitle, false);
        setPanelClass('bda-shell--detail');
        panel.innerHTML = renderDetailBackbar(detailTitle) + '<div class="bda-detail-page">' +
            '<section class="bda-summary-card"><h1>' + escapeHtml(record.status) + '</h1><div class="bda-summary-meta">' +
                '<span><em>争议编号：</em>' + escapeHtml(record.disputeNo) + '</span>' +
                '<span><em>订单编号：</em>' + renderOrderLink(record) + '</span>' +
                '<span><em>发起时间：</em>' + escapeHtml(record.initiatedAt) + '</span>' +
            '</div></section>' +
            '<section class="bda-detail-section"><h2>争议发起信息</h2><div class="bda-info-panel bda-info-panel--two">' +
                '<div><em>发起时间：</em><span>' + escapeHtml(record.initiatedAt) + '</span></div>' +
                '<div><em>争议描述：</em><span>' + escapeHtml(record.description) + '</span></div>' +
                '<div class="bda-info-wide"><em>附件：</em><span>' + renderAttachments(record.attachments) + '</span></div>' +
            '</div></section>' +
            '<section class="bda-detail-section"><h2>争议审批信息</h2><div class="bda-info-panel bda-info-panel--two">' +
                '<div><em>审批时间：</em><span>' + escapeHtml(record.approvalAt) + '</span></div>' +
                '<div><em>审批意见：</em><span>' + escapeHtml(record.approvalOpinion) + '</span></div>' +
                '<div class="bda-info-wide"><em>附件：</em><span>' + renderAttachments(record.approvalAttachments) + '</span></div>' +
            '</div></section>' +
            renderLogs(record.logs) +
        '</div>';
    }

    function partyFlag(record, side) {
        var result = side === 'demand' ? record.demandResult : record.supplierResult;
        if (!result) return { text: '未上报', tone: 'muted' };
        if (record.status === '采纳需方结果') return side === 'demand' ? { text: '已采纳', tone: 'success' } : { text: '未采纳', tone: 'danger' };
        if (record.status === '采纳供方结果') return side === 'supplier' ? { text: '已采纳', tone: 'success' } : { text: '未采纳', tone: 'danger' };
        if (currentRole === 'operation' || isServiceMode()) return { text: '待采纳', tone: 'success' };
        return { text: '已上报', tone: 'success' };
    }

    function renderPartyResult(record, side) {
        var isDemand = side === 'demand';
        var result = isDemand ? record.demandResult : record.supplierResult;
        var flag = partyFlag(record, side);
        var canAdopt = currentRole === 'operation' && record.status === '双方已上报' && result;
        return '<section class="bda-detail-section"><h2><span class="bda-result-heading">' + (isDemand ? '需方仲裁结果' : '供方仲裁结果') +
            '<span class="bda-result-flag bda-result-flag--' + flag.tone + '">' + materialIcon(flag.tone === 'danger' ? 'cancel' : flag.tone === 'muted' ? 'pending' : 'check_circle') + escapeHtml(flag.text) + '</span></span>' +
            (canAdopt ? '<button type="button" class="bda-adopt-button" data-action="adopt-result" data-side="' + side + '" data-id="' + escapeHtml(record.id) + '">采纳' + (isDemand ? '需方' : '供方') + '结果</button>' : '') + '</h2>' +
            '<div class="bda-info-panel bda-result-panel">' +
                '<div><em>提交时间：</em><span>' + escapeHtml(result ? result.submittedAt : '--') + '</span></div>' +
                '<div><em>仲裁结果：</em><span>' + escapeHtml(result ? result.result : '--') + '</span></div>' +
                '<div><em>仲裁结果证明文件：</em><span>' + (result ? renderAttachments(result.attachments) : '<span class="bda-muted">--</span>') + '</span></div>' +
                '<div class="bda-info-wide"><em>仲裁描述：</em><span>' + escapeHtml(result ? result.description : '--') + '</span></div>' +
            '</div></section>';
    }

    function renderArbitrationDetail(record) {
        var detailTitle = isServiceMode() ? '服务仲裁详情' : '仲裁详情';
        var finalStatus = ['采纳需方结果', '采纳供方结果', '已关闭'].indexOf(record.status) >= 0;
        var timeLabel = !isServiceMode() && finalStatus ? '确定时间' : '发起时间';
        var timeValue = !isServiceMode() && finalStatus ? record.confirmedAt : record.initiatedAt;
        setPageTitle(detailTitle, false);
        setPanelClass('bda-shell--detail');
        panel.innerHTML = renderDetailBackbar(detailTitle) + '<div class="bda-detail-page">' +
            '<section class="bda-summary-card"><h1>' + escapeHtml(record.status) + '</h1><div class="bda-summary-meta">' +
                '<span><em>仲裁编号：</em>' + escapeHtml(record.arbitrationNo) + '</span>' +
                '<span><em>订单编号：</em>' + renderOrderLink(record) + '</span>' +
                '<span><em>' + escapeHtml(timeLabel) + '：</em>' + escapeHtml(timeValue) + '</span>' +
            '</div></section>' +
            renderPartyResult(record, 'demand') +
            renderPartyResult(record, 'supplier') +
            renderLogs(record.logs) +
        '</div>';
    }

    function findActiveRecord() {
        return currentRecords().find(function (record) { return record.id === state.activeId; }) || currentRecords()[0];
    }

    function render() {
        if (state.view === 'detail') {
            var record = findActiveRecord();
            state.activeId = record.id;
            if (isDisputeMode()) renderDisputeDetail(record);
            else renderArbitrationDetail(record);
        } else {
            renderList();
        }
    }

    function applyKeyword() {
        var input = panel.querySelector('[data-field="keyword"]');
        if (input) state.keywordDraft = input.value;
        state.keyword = state.keywordDraft.trim();
        state.page = 1;
        render();
    }

    function applySelectionFilter() {
        var input = panel.querySelector('[data-field="keyword"]');
        if (input) state.keywordDraft = input.value;
        state.keyword = state.keywordDraft.trim();
        state.page = 1;
        render();
    }

    function updateRoute(view, id) {
        var url = new URL(window.location.href);
        url.searchParams.set('menu', state.mode);
        if (view === 'detail') {
            url.searchParams.set('view', 'detail');
            url.searchParams.set('id', id);
        } else {
            url.searchParams.delete('view');
            url.searchParams.delete('id');
        }
        window.history.pushState({}, '', url.pathname + url.search + url.hash);
    }

    function openDetail(id) {
        state.view = 'detail';
        state.activeId = id;
        state.selectOpen = false;
        updateRoute('detail', id);
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function backToList() {
        state.view = 'list';
        state.activeId = '';
        updateRoute('list', '');
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showToast(message) {
        var toast = document.querySelector('.bda-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'bda-toast';
            toast.setAttribute('role', 'status');
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('is-visible');
        window.clearTimeout(showToast.timer);
        showToast.timer = window.setTimeout(function () { toast.classList.remove('is-visible'); }, 2200);
    }

    var modalState = null;

    function formatNow() {
        var date = new Date();
        function pad(value) { return String(value).padStart(2, '0'); }
        return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + ' ' +
            pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
    }

    function closeModal() {
        var layer = document.querySelector('[data-bda-modal]');
        if (layer) layer.remove();
        document.body.classList.remove('bda-modal-open');
        modalState = null;
    }

    function reportFileMarkup() {
        if (!modalState.fileName) {
            return '<label class="bda-report-upload" tabindex="0">' + materialIcon('upload_file') + '<span>上传文件</span>' +
                '<input type="file" accept=".doc,.docx,.pdf,.jpg,.jpeg,.png" data-bda-report-file></label>';
        }
        return '<div class="bda-report-file"><span class="bda-report-file-main">' + materialIcon('description') +
                '<span title="' + escapeHtml(modalState.fileName) + '">' + escapeHtml(modalState.fileName) + '</span>' +
                materialIcon('check', 'bda-report-file-check') + '</span>' +
            '<button type="button" class="bda-report-file-remove" data-bda-remove-file aria-label="删除证明文件">' + materialIcon('delete') + '</button></div>';
    }

    function renderReportModal() {
        var existing = document.querySelector('[data-bda-modal]');
        if (existing) existing.remove();
        var layer = document.createElement('div');
        layer.className = 'bda-modal-layer';
        layer.setAttribute('data-bda-modal', '');
        layer.innerHTML = '<section class="bda-modal bda-report-modal" role="dialog" aria-modal="true" aria-labelledby="bdaReportTitle">' +
            '<header class="bda-modal-header"><h2 id="bdaReportTitle">上报仲裁结果</h2><button type="button" data-bda-modal-close aria-label="关闭上报仲裁结果">' + materialIcon('close') + '</button></header>' +
            '<div class="bda-modal-body">' +
                '<div class="bda-report-order"><em>订单编号：</em><span>' + escapeHtml(modalState.record.orderNo) + '</span></div>' +
                '<div class="bda-report-row"><div class="bda-report-label"><i>*</i>仲裁结果</div><div class="bda-report-control bda-report-radios">' +
                    '<label><input type="radio" name="bda-report-result" value="执行买方要求"' + (modalState.result === '执行买方要求' ? ' checked' : '') + '><span>执行买方要求</span></label>' +
                    '<label><input type="radio" name="bda-report-result" value="不执行买方要求"' + (modalState.result === '不执行买方要求' ? ' checked' : '') + '><span>不执行买方要求</span></label>' +
                '</div></div>' +
                '<div class="bda-report-row bda-report-row--textarea"><label class="bda-report-label" for="bdaReportDescription"><i>*</i>描述</label><div class="bda-report-control">' +
                    '<div class="bda-report-textarea"><textarea id="bdaReportDescription" maxlength="400" placeholder="请输入仲裁描述，不超过400字" data-bda-report-description>' + escapeHtml(modalState.description) + '</textarea>' +
                        '<button type="button" data-bda-clear-description aria-label="清空描述">' + materialIcon('close') + '</button><span data-bda-report-count>' + modalState.description.length + '/400</span></div>' +
                '</div></div>' +
                '<div class="bda-report-row"><div class="bda-report-label"><i>*</i>仲裁结果证明</div><div class="bda-report-control" data-bda-report-file-slot>' + reportFileMarkup() + '</div></div>' +
                '<div class="bda-report-error" role="alert" data-bda-report-error></div>' +
            '</div>' +
            '<footer class="bda-modal-footer"><button type="button" class="bda-modal-cancel" data-bda-modal-close>取消</button><button type="button" class="bda-modal-confirm" data-bda-report-confirm>确定</button></footer>' +
        '</section>';
        document.body.appendChild(layer);
        document.body.classList.add('bda-modal-open');

        function setError(message, target) {
            var error = layer.querySelector('[data-bda-report-error]');
            error.textContent = message || '';
            layer.querySelectorAll('.is-invalid').forEach(function (element) { element.classList.remove('is-invalid'); });
            if (target) target.classList.add('is-invalid');
        }

        layer.querySelectorAll('[data-bda-modal-close]').forEach(function (button) { button.addEventListener('click', closeModal); });
        layer.querySelectorAll('input[name="bda-report-result"]').forEach(function (input) {
            input.addEventListener('change', function () {
                modalState.result = input.value;
                setError('');
            });
        });
        var textarea = layer.querySelector('[data-bda-report-description]');
        textarea.addEventListener('input', function () {
            modalState.description = textarea.value;
            layer.querySelector('[data-bda-report-count]').textContent = textarea.value.length + '/400';
            setError('');
        });
        layer.querySelector('[data-bda-clear-description]').addEventListener('click', function () {
            modalState.description = '';
            textarea.value = '';
            layer.querySelector('[data-bda-report-count]').textContent = '0/400';
            textarea.focus();
        });
        var fileInput = layer.querySelector('[data-bda-report-file]');
        if (fileInput) {
            var uploadTrigger = layer.querySelector('.bda-report-upload');
            uploadTrigger.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    fileInput.click();
                }
            });
            fileInput.addEventListener('change', function () {
                if (!fileInput.files || !fileInput.files[0]) return;
                modalState.fileName = fileInput.files[0].name;
                renderReportModal();
            });
        }
        var removeFile = layer.querySelector('[data-bda-remove-file]');
        if (removeFile) {
            removeFile.addEventListener('click', function () {
                modalState.fileName = '';
                renderReportModal();
            });
        }
        layer.querySelector('[data-bda-report-confirm]').addEventListener('click', function () {
            if (!modalState.result) {
                setError('请选择仲裁结果。', layer.querySelector('.bda-report-radios'));
                return;
            }
            if (!modalState.description.trim()) {
                setError('请输入仲裁描述。', layer.querySelector('.bda-report-textarea'));
                textarea.focus();
                return;
            }
            if (!modalState.fileName) {
                setError('请上传仲裁结果证明文件。', layer.querySelector('[data-bda-report-file-slot]'));
                return;
            }
            var now = formatNow();
            var record = modalState.record;
            var resultData = {
                submittedAt: now,
                result: modalState.result,
                description: modalState.description.trim(),
                attachments: [{ name: modalState.fileName }]
            };
            if (currentRole === 'supplier') {
                record.supplierResult = resultData;
                record.status = record.demandResult ? '双方已上报' : '供方已上报';
            } else {
                record.demandResult = resultData;
                record.status = record.supplierResult ? '双方已上报' : '需方已上报';
            }
            record.updatedAt = now;
            record.logs = buildArbitrationLogs(record);
            closeModal();
            render();
            showToast('仲裁结果已上报。');
        });
        layer.addEventListener('click', function (event) {
            if (event.target === layer) closeModal();
        });
        layer.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') closeModal();
        });
        window.setTimeout(function () {
            var focusTarget = layer.querySelector('input:checked') || layer.querySelector('input') || textarea;
            if (focusTarget) focusTarget.focus();
        }, 0);
    }

    function openReportModal(id) {
        var record = currentRecords().find(function (item) { return item.id === id; });
        if (!record || !isActiveArbitrationStatus(record.status)) return;
        var current = currentRole === 'supplier' ? record.supplierResult : record.demandResult;
        modalState = {
            record: record,
            result: current ? current.result : '',
            description: current ? current.description : '',
            fileName: current && current.attachments && current.attachments[0] ? current.attachments[0].name : ''
        };
        renderReportModal();
    }

    function createArbitrationFromDispute(dispute) {
        var records = dispute.serviceMode ? serviceArbitrations : arbitrations;
        var arbitration = records.find(function (item) { return item.status === '仲裁中' && !item.disputeLinkedByApproval; }) || records[0];
        var now = formatNow();
        arbitration.disputeId = dispute.id;
        arbitration.disputeNo = dispute.disputeNo;
        arbitration.orderNo = dispute.orderNo;
        arbitration.orderMenu = dispute.orderMenu;
        arbitration.name = dispute.name;
        arbitration.status = '仲裁中';
        arbitration.updatedAt = now;
        arbitration.initiatedAt = now;
        arbitration.confirmedAt = '--';
        arbitration.demandResult = null;
        arbitration.supplierResult = null;
        arbitration.disputeLinkedByApproval = true;
        arbitration.logs = buildArbitrationLogs(arbitration);
        dispute.arbitrationId = arbitration.id;
    }

    function approvalFilesMarkup() {
        if (!modalState.files.length) return '';
        return '<div class="bda-approval-files">' + modalState.files.map(function (name, index) {
            return '<span><span title="' + escapeHtml(name) + '">' + materialIcon('description') + escapeHtml(name) + '</span>' +
                '<button type="button" data-bda-remove-approval-file data-index="' + index + '" aria-label="删除' + escapeHtml(name) + '">' + materialIcon('delete') + '</button></span>';
        }).join('') + '</div>';
    }

    function renderApprovalModal() {
        var existing = document.querySelector('[data-bda-modal]');
        if (existing) existing.remove();
        var layer = document.createElement('div');
        layer.className = 'bda-modal-layer';
        layer.setAttribute('data-bda-modal', '');
        layer.innerHTML = '<section class="bda-modal bda-approval-modal" role="dialog" aria-modal="true" aria-labelledby="bdaApprovalTitle">' +
            '<header class="bda-modal-header"><h2 id="bdaApprovalTitle">争议审批</h2><button type="button" data-bda-modal-close aria-label="关闭争议审批">' + materialIcon('close') + '</button></header>' +
            '<div class="bda-modal-body">' +
                '<div class="bda-report-row"><div class="bda-report-label"><i>*</i>审批结果</div><div class="bda-report-control bda-report-radios">' +
                    '<label><input type="radio" name="bda-approval-result" value="同意"' + (modalState.result === '同意' ? ' checked' : '') + '><span>同意</span></label>' +
                    '<label><input type="radio" name="bda-approval-result" value="不通过"' + (modalState.result === '不通过' ? ' checked' : '') + '><span>不通过</span></label>' +
                '</div></div>' +
                '<div class="bda-report-row bda-report-row--textarea"><label class="bda-report-label" for="bdaApprovalOpinion">审批意见</label><div class="bda-report-control">' +
                    '<div class="bda-report-textarea"><textarea id="bdaApprovalOpinion" maxlength="400" placeholder="请输入争议审批意见" data-bda-approval-opinion>' + escapeHtml(modalState.opinion) + '</textarea><span data-bda-approval-count>' + modalState.opinion.length + '/400</span></div>' +
                '</div></div>' +
                '<div class="bda-report-row bda-approval-upload-row"><div class="bda-report-label">附件</div><div class="bda-report-control">' +
                    '<label class="bda-report-upload">' + materialIcon('upload_file') + '<span>上传文件</span><input type="file" multiple accept=".doc,.docx,.pdf,.jpg,.jpeg,.png" data-bda-approval-file></label>' +
                    '<p class="bda-upload-help">可上传10个文件，支持扩展名：.doc .docx .pdf .jpg .png格式，单个文件大小不超过5MB</p>' + approvalFilesMarkup() +
                '</div></div><div class="bda-report-error" role="alert" data-bda-report-error></div>' +
            '</div>' +
            '<footer class="bda-modal-footer"><button type="button" class="bda-modal-cancel" data-bda-modal-close>取消</button><button type="button" class="bda-modal-confirm" data-bda-approval-confirm>确定</button></footer>' +
        '</section>';
        document.body.appendChild(layer);
        document.body.classList.add('bda-modal-open');

        layer.querySelectorAll('[data-bda-modal-close]').forEach(function (button) { button.addEventListener('click', closeModal); });
        layer.querySelectorAll('input[name="bda-approval-result"]').forEach(function (input) {
            input.addEventListener('change', function () { modalState.result = input.value; });
        });
        var textarea = layer.querySelector('[data-bda-approval-opinion]');
        textarea.addEventListener('input', function () {
            modalState.opinion = textarea.value;
            layer.querySelector('[data-bda-approval-count]').textContent = textarea.value.length + '/400';
        });
        layer.querySelector('[data-bda-approval-file]').addEventListener('change', function (event) {
            var files = Array.from(event.target.files || []);
            var error = layer.querySelector('[data-bda-report-error]');
            if (modalState.files.length + files.length > 10) {
                error.textContent = '最多可上传10个文件。';
                return;
            }
            var tooLarge = files.find(function (file) { return file.size > 5 * 1024 * 1024; });
            if (tooLarge) {
                error.textContent = '单个文件大小不能超过5MB。';
                return;
            }
            modalState.files = modalState.files.concat(files.map(function (file) { return file.name; }));
            renderApprovalModal();
        });
        layer.querySelectorAll('[data-bda-remove-approval-file]').forEach(function (button) {
            button.addEventListener('click', function () {
                modalState.files.splice(Number(button.getAttribute('data-index')), 1);
                renderApprovalModal();
            });
        });
        layer.querySelector('[data-bda-approval-confirm]').addEventListener('click', function () {
            var record = modalState.record;
            var rejected = modalState.result === '不通过';
            var now = formatNow();
            record.approvalAt = now;
            record.approvalOpinion = modalState.opinion.trim() || (modalState.result === '同意' ? '同意' : '不同意本次争议处理诉求。');
            record.approvalAttachments = modalState.files.map(function (name) { return { name: name }; });
            if (modalState.result === '同意') {
                record.status = '已通过';
                record.approvalResult = '通过';
            } else {
                record.status = '转仲裁';
                record.approvalResult = '驳回';
                record.autoTransferred = true;
                createArbitrationFromDispute(record);
            }
            record.logs = buildDisputeLogs(record);
            closeModal();
            render();
            showToast(rejected ? '审批完成，争议已转仲裁。' : '争议审批已完成。');
        });
        layer.addEventListener('click', function (event) { if (event.target === layer) closeModal(); });
        layer.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeModal(); });
    }

    function openApprovalModal(id) {
        var record = currentRecords().find(function (item) { return item.id === id; });
        if (currentRole !== 'supplier' || !record || record.status !== '待审批') return;
        modalState = { record: record, result: '同意', opinion: '', files: [] };
        renderApprovalModal();
    }

    function openAdoptModal(id, side) {
        var record = currentRecords().find(function (item) { return item.id === id; });
        if (currentRole !== 'operation' || !record || record.status !== '双方已上报') return;
        var sideName = side === 'demand' ? '需方' : '供方';
        var layer = document.createElement('div');
        layer.className = 'bda-modal-layer';
        layer.setAttribute('data-bda-modal', '');
        layer.innerHTML = '<section class="bda-modal bda-confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="bdaAdoptTitle" aria-describedby="bdaAdoptDesc">' +
            '<header class="bda-modal-header"><h2 id="bdaAdoptTitle">' + materialIcon('warning') + '提示</h2><button type="button" data-bda-modal-close aria-label="关闭提示">' + materialIcon('close') + '</button></header>' +
            '<div class="bda-confirm-body"><div><h3>确定要采纳该结果吗？</h3><p id="bdaAdoptDesc">采纳后，系统将按当前采纳的结果及要求内容进行执行，后期无法更改，请仔细确认后再操作</p></div></div>' +
            '<footer class="bda-modal-footer"><button type="button" class="bda-modal-cancel" data-bda-modal-close>取消</button><button type="button" class="bda-modal-confirm" data-bda-adopt-confirm>确定采纳</button></footer>' +
        '</section>';
        document.body.appendChild(layer);
        document.body.classList.add('bda-modal-open');
        layer.querySelectorAll('[data-bda-modal-close]').forEach(function (button) { button.addEventListener('click', closeModal); });
        layer.querySelector('[data-bda-adopt-confirm]').addEventListener('click', function () {
            var now = formatNow();
            record.status = '采纳' + sideName + '结果';
            record.updatedAt = now;
            record.confirmedAt = now;
            record.logs = buildArbitrationLogs(record);
            closeModal();
            render();
            showToast('已采纳' + sideName + '仲裁结果。');
        });
        layer.addEventListener('click', function (event) { if (event.target === layer) closeModal(); });
        layer.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeModal(); });
    }

    function openCloseModal(id) {
        var record = serviceArbitrations.find(function (item) { return item.id === id; });
        if (!record || !isActiveArbitrationStatus(record.status)) return;
        var layer = document.createElement('div');
        layer.className = 'bda-modal-layer';
        layer.setAttribute('data-bda-modal', '');
        layer.innerHTML = '<section class="bda-modal bda-confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="bdaCloseTitle" aria-describedby="bdaCloseDesc">' +
            '<header class="bda-modal-header"><h2 id="bdaCloseTitle">关闭仲裁</h2><button type="button" data-bda-modal-close aria-label="关闭弹窗">' + materialIcon('close') + '</button></header>' +
            '<div class="bda-confirm-body">' + materialIcon('help', 'bda-confirm-icon') + '<div><h3>确认关闭当前仲裁吗？</h3><p id="bdaCloseDesc">关闭后将不能继续上报仲裁结果。</p></div></div>' +
            '<footer class="bda-modal-footer"><button type="button" class="bda-modal-cancel" data-bda-modal-close>取消</button><button type="button" class="bda-modal-confirm" data-bda-close-confirm>确定</button></footer>' +
        '</section>';
        document.body.appendChild(layer);
        document.body.classList.add('bda-modal-open');
        layer.querySelectorAll('[data-bda-modal-close]').forEach(function (button) { button.addEventListener('click', closeModal); });
        layer.querySelector('[data-bda-close-confirm]').addEventListener('click', function () {
            var now = formatNow();
            record.status = '已关闭';
            record.updatedAt = now;
            record.confirmedAt = now;
            record.closedBy = '需方';
            record.logs = buildArbitrationLogs(record);
            closeModal();
            render();
            showToast('仲裁已关闭。');
        });
        layer.addEventListener('click', function (event) { if (event.target === layer) closeModal(); });
        layer.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeModal(); });
        window.setTimeout(function () {
            var confirm = layer.querySelector('[data-bda-close-confirm]');
            if (confirm) confirm.focus();
        }, 0);
    }

    panel.addEventListener('input', function (event) {
        if (event.target.matches('[data-field="keyword"]')) state.keywordDraft = event.target.value;
    });

    panel.addEventListener('change', function (event) {
        var field = event.target.getAttribute('data-field');
        if (field === 'start-date' || field === 'end-date') {
            state[field === 'start-date' ? 'startDate' : 'endDate'] = event.target.value;
            applySelectionFilter();
        } else if (field === 'page-size') {
            state.pageSize = Number(event.target.value) || 10;
            state.page = 1;
            render();
        }
    });

    panel.addEventListener('keydown', function (event) {
        var field = event.target.getAttribute('data-field');
        if (field === 'keyword' && event.key === 'Enter') {
            event.preventDefault();
            applyKeyword();
        }
        if (field === 'page-jump' && event.key === 'Enter') {
            event.preventDefault();
            var totalPages = Math.max(1, Math.ceil(filteredRecords().length / state.pageSize));
            var target = Math.max(1, Math.min(totalPages, Number(event.target.value) || 1));
            state.page = target;
            render();
        }
        if (event.target.matches('[data-action="toggle-status"]') && event.key === 'ArrowDown') {
            event.preventDefault();
            state.selectOpen = true;
            render();
            window.setTimeout(function () {
                var option = panel.querySelector('.bda-select-option');
                if (option) option.focus();
            }, 0);
        }
    });

    panel.addEventListener('click', function (event) {
        var actionTarget = event.target.closest('[data-action]');
        if (!actionTarget) return;
        var action = actionTarget.getAttribute('data-action');
        if (action === 'search') applyKeyword();
        else if (action === 'toggle-filter') {
            state.filterOpen = !state.filterOpen;
            state.selectOpen = false;
            render();
        } else if (action === 'toggle-status') {
            state.selectOpen = !state.selectOpen;
            render();
        } else if (action === 'select-status') {
            state.status = actionTarget.getAttribute('data-status') || '';
            state.selectOpen = false;
            applySelectionFilter();
        } else if (action === 'reset') {
            state.keywordDraft = '';
            state.keyword = '';
            state.status = '';
            state.startDate = '';
            state.endDate = '';
            state.selectOpen = false;
            state.page = 1;
            render();
        } else if (action === 'page' && !actionTarget.disabled) {
            var totalPages = Math.max(1, Math.ceil(filteredRecords().length / state.pageSize));
            state.page = Math.max(1, Math.min(totalPages, Number(actionTarget.getAttribute('data-page')) || 1));
            render();
        } else if (action === 'open-detail') {
            openDetail(actionTarget.getAttribute('data-id'));
        } else if (action === 'approve-dispute') {
            openApprovalModal(actionTarget.getAttribute('data-id'));
        } else if (action === 'open-arbitration') {
            window.location.href = centerPage + '?menu=' + (isServiceMode() ? 'service-arbitration' : 'arbitration') + '&view=detail&id=' + encodeURIComponent(actionTarget.getAttribute('data-id'));
        } else if (action === 'report-arbitration') {
            openReportModal(actionTarget.getAttribute('data-id'));
        } else if (action === 'adopt-result') {
            openAdoptModal(actionTarget.getAttribute('data-id'), actionTarget.getAttribute('data-side'));
        } else if (action === 'close-arbitration') {
            openCloseModal(actionTarget.getAttribute('data-id'));
        } else if (action === 'open-order') {
            if (currentRole === 'operation') {
                showToast('正在查看订单：' + actionTarget.getAttribute('data-order-no'));
            } else {
                window.location.href = centerPage + '?menu=' + encodeURIComponent(actionTarget.getAttribute('data-menu')) + '&view=detail&orderNo=' + encodeURIComponent(actionTarget.getAttribute('data-order-no'));
            }
        } else if (action === 'back-list') {
            backToList();
        } else if (action === 'preview-file') {
            showToast('正在预览：' + actionTarget.getAttribute('data-file'));
        } else if (action === 'download-file') {
            showToast('已开始下载：' + actionTarget.getAttribute('data-file'));
        }
    });

    document.addEventListener('click', function (event) {
        if (!state.selectOpen || event.target.closest('.bda-filter-select')) return;
        state.selectOpen = false;
        render();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && state.selectOpen) {
            state.selectOpen = false;
            render();
        }
    });

    window.addEventListener('popstate', function () {
        var params = new URLSearchParams(window.location.search);
        var menu = params.get('menu');
        if (SUPPORTED_MENUS.indexOf(menu) < 0) return;
        state.mode = menu;
        state.view = params.get('view') === 'detail' ? 'detail' : 'list';
        state.activeId = params.get('id') || '';
        render();
    });

    render();
})();
