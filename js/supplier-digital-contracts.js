(function () {
    'use strict';

    var params = new URLSearchParams(window.location.search || '');
    var menu = params.get('menu');
    var supportedMenus = ['contract', 'contract-sign', 'contract-filing', 'contract-performance', 'contract-termination'];
    if (supportedMenus.indexOf(menu) < 0) return;

    var MENU_CONFIG = {
        contract: { title: '数字合约管理', detailTitle: '合约详情', type: 'management' },
        'contract-sign': { title: '数字合约签署', detailTitle: '合约签署详情', type: 'sign' },
        'contract-filing': { title: '数字合约备案', detailTitle: '合约备案详情', type: 'filing' },
        'contract-performance': { title: '数字合约履行', detailTitle: '合约履行详情', type: 'performance' },
        'contract-termination': { title: '数字合约解除', detailTitle: '', type: 'termination' }
    };

    var config = MENU_CONFIG[menu];
    var panel = document.querySelector('[data-consult-panel]');
    var role = panel && panel.dataset.role === 'buyer' ? 'buyer' : 'supplier';
    var isBuyer = role === 'buyer';
    var centerPage = isBuyer ? 'buyer-center.html' : 'supplier-center.html';
    var centerName = isBuyer ? '需方中心' : '供方中心';
    var titleEl;
    var toastTimer = null;
    var state = {
        draftKeyword: '',
        keyword: '',
        statusTab: '全部',
        startDate: '',
        endDate: '',
        page: 1,
        pageSize: 10,
        detailId: '',
        detailTab: 'basic',
        showAllTimeline: false,
        drawer: null,
        toast: ''
    };

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>'"]/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char];
        });
    }

    function icon(name) {
        return '<span class="material-symbols-outlined" aria-hidden="true">' + name + '</span>';
    }

    function addDays(dateText, days) {
        var date = new Date(dateText.replace(' ', 'T'));
        if (Number.isNaN(date.getTime())) return dateText;
        date.setDate(date.getDate() + days);
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        return year + '-' + month + '-' + day;
    }

    var providerNames = [
        '深圳市龙岗数智科技有限公司',
        '深圳市龙岗区政务数据运营有限公司',
        '龙岗区企业服务集团有限公司',
        '龙岗智慧交通科技有限公司'
    ];
    var consumerNames = [
        '深圳市星途科技发展有限公司',
        '深圳市龙岗产业投资服务有限公司',
        '龙岗区园区运营管理有限公司',
        '深圳市清澜企业服务有限公司'
    ];

    function makeContract(source, index) {
        var sequence = String(101382701 + index * 37);
        var compactDate = source.createdAt.slice(0, 10).replace(/-/g, '');
        var signAt = source.signStatus === '待签署' || source.signStatus === '签署中' || source.signStatus === '签署失败'
            ? (source.signStatus === '签署失败' ? addDays(source.createdAt, 1) + ' 10:18:24' : '--')
            : addDays(source.createdAt, 1) + ' 09:' + String(12 + index).padStart(2, '0') + ':16';
        var provider = providerNames[index % providerNames.length];
        var consumer = isBuyer ? '深圳市星途科技发展有限公司' : consumerNames[index % consumerNames.length];
        var orderPrefix = source.business === 'service' ? 'FW' : (source.business === 'resource' ? 'ZY' : 'CP');
        var sampleNo = String(index + 1).padStart(3, '0');
        var orderNo = compactDate + (isBuyer ? '25021393200000101158' : '15011393200000101148') + sampleNo;
        var contractId = '52913' + compactDate.slice(2) + '01810921783407674044' + sampleNo + (isBuyer ? 'LGDB' : 'LGDC') + String(index + 1).padStart(2, '0');
        var version = index === 2 || index === 8 ? 'V2' : 'V1';
        var filingAt = source.filingStatus === '未备案' ? '--' : addDays(source.createdAt, 2) + ' 15:03:' + String(20 + index).padStart(2, '0');
        var performanceAt = source.performanceStatus === '待履行' ? '--' : addDays(source.createdAt, 3) + ' 10:20:00';
        var fileBase = source.name.replace(/[《》]/g, '');

        return {
            id: contractId,
            name: source.name,
            business: source.business,
            contractType: '平台参与',
            orderNo: orderNo,
            orderLabel: orderPrefix + '-' + orderNo,
            signerCount: 2,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt || addDays(source.createdAt, 4) + ' 14:30:12',
            signAt: signAt,
            validFrom: signAt === '--' ? '--' : signAt.slice(0, 10),
            validTo: signAt === '--' ? '--' : addDays(signAt, source.business === 'service' ? 180 : 365),
            overallStatus: source.overallStatus,
            signStatus: source.signStatus,
            filingStatus: source.filingStatus,
            performanceStatus: source.performanceStatus,
            terminationStatus: source.terminationStatus,
            version: version,
            templateName: source.business === 'service' ? '数据服务数字合约模板' : '数据产品数字合约模板',
            description: '本数字合约来源于订单' + orderNo + '，采用' + source.name + '对应的数字合约模板，约定数据使用范围、履行方式及合约策略。',
            targetId: '6020' + compactDate + '14550297800000101382' + sampleNo + 'LG',
            targetName: source.targetName,
            strategyId: '020' + compactDate + '15100182500000101382' + sampleNo,
            strategyCount: source.strategyCount || 1000,
            networkAddress: source.networkAddress || '0.0.0.0',
            deliveryTaskId: '020' + compactDate + '15133800900000101382' + sampleNo,
            filingNo: 'DCBA-' + compactDate + '-LG' + String(150320 + index),
            proofNo: 'DCPF-' + compactDate + '-' + String(1008 + index),
            filingAt: filingAt,
            performanceAt: performanceAt,
            fileName: fileBase + '-数字合约.docx',
            provider: {
                type: '数据提供方',
                id: '020' + compactDate + '10164885200000101377' + sampleNo,
                name: provider,
                signAt: signAt === '--' ? '--' : signAt.slice(0, 10) + ' 15:03:27'
            },
            consumer: {
                type: '数据使用方',
                id: '020' + compactDate + '14224937900000101377' + sampleNo,
                name: consumer,
                signAt: signAt === '--' ? '--' : signAt.slice(0, 10) + ' 15:02:19'
            }
        };
    }

    var CONTRACTS = [
        makeContract({
            name: '园区综合能耗监测数据API合约', business: 'product', targetName: '园区综合能耗监测数据API',
            createdAt: '2026-08-01 09:20:14', updatedAt: '2026-08-12 15:21:03', overallStatus: '终止', signStatus: '签署成功', filingStatus: '已归档', performanceStatus: '履行完成', terminationStatus: '解除成功'
        }, 0),
        makeContract({
            name: '商事主体登记基础信息数据合约', business: 'resource', targetName: '龙岗区商事主体登记基础信息',
            createdAt: '2026-08-02 10:16:32', updatedAt: '2026-08-12 14:18:46', overallStatus: '履行中', signStatus: '签署成功', filingStatus: '已归档', performanceStatus: '履行中', terminationStatus: '待解除'
        }, 1),
        makeContract({
            name: '公交线路运行分析数据产品合约', business: 'product', targetName: '公交线路运行分析数据产品',
            createdAt: '2026-08-03 11:08:45', updatedAt: '2026-08-11 17:09:22', overallStatus: '签订成功', signStatus: '签署成功', filingStatus: '已备案', performanceStatus: '待履行', terminationStatus: '待解除'
        }, 2),
        makeContract({
            name: '企业经营画像查询服务合约', business: 'service', targetName: '企业经营画像查询服务',
            createdAt: '2026-08-04 13:26:18', updatedAt: '2026-08-11 16:40:09', overallStatus: '签订失败', signStatus: '签署失败', filingStatus: '未备案', performanceStatus: '待履行', terminationStatus: '待解除'
        }, 3),
        makeContract({
            name: '产业园运行态势分析报告合约', business: 'product', targetName: '产业园运行态势分析报告',
            createdAt: '2026-08-05 09:42:27', updatedAt: '2026-08-11 15:22:37', overallStatus: '签订', signStatus: '签署中', filingStatus: '未备案', performanceStatus: '待履行', terminationStatus: '待解除'
        }, 4),
        makeContract({
            name: '社区养老服务设施名录数据合约', business: 'resource', targetName: '社区养老服务设施名录',
            createdAt: '2026-08-06 10:51:06', updatedAt: '2026-08-11 12:32:18', overallStatus: '协商', signStatus: '待签署', filingStatus: '未备案', performanceStatus: '待履行', terminationStatus: '待解除'
        }, 5),
        makeContract({
            name: '产业链企业关联关系数据合约', business: 'product', targetName: '产业链企业关联关系数据产品',
            createdAt: '2026-08-07 14:06:31', updatedAt: '2026-08-10 18:01:56', overallStatus: '发起', signStatus: '待签署', filingStatus: '未备案', performanceStatus: '待履行', terminationStatus: '待解除'
        }, 6),
        makeContract({
            name: '重点企业信用风险监测数据合约', business: 'product', targetName: '重点企业信用风险监测数据产品',
            createdAt: '2026-07-28 16:12:05', updatedAt: '2026-08-10 11:24:13', overallStatus: '履行中', signStatus: '签署成功', filingStatus: '备案中', performanceStatus: '履行中', terminationStatus: '解除中', strategyCount: 800
        }, 7),
        makeContract({
            name: '工业园区空间地理数据合约', business: 'resource', targetName: '工业园区空间地理数据库',
            createdAt: '2026-07-25 11:34:40', updatedAt: '2026-08-09 09:12:36', overallStatus: '终止', signStatus: '签署成功', filingStatus: '已归档', performanceStatus: '履行完成', terminationStatus: '解除成功', strategyCount: 600
        }, 8),
        makeContract({
            name: '中小微企业政策匹配数据合约', business: 'product', targetName: '中小微企业政策匹配数据集',
            createdAt: '2026-07-22 15:08:19', updatedAt: '2026-08-08 17:41:25', overallStatus: '签订成功', signStatus: '签署成功', filingStatus: '已备案', performanceStatus: '待履行', terminationStatus: '解除失败', strategyCount: 1200
        }, 9),
        makeContract({
            name: '公共数据授权运营咨询服务合约', business: 'service', targetName: '公共数据授权运营咨询服务',
            createdAt: '2026-08-08 09:36:22', updatedAt: '2026-08-09 15:19:08', overallStatus: '协商', signStatus: '待签署', filingStatus: '未备案', performanceStatus: '待履行', terminationStatus: '待解除'
        }, 10),
        makeContract({
            name: '企业投融资事件监测数据合约', business: 'product', targetName: '企业投融资事件监测数据产品',
            createdAt: '2026-07-18 13:20:17', updatedAt: '2026-08-07 10:28:43', overallStatus: '签订失败', signStatus: '签署失败', filingStatus: '未备案', performanceStatus: '待履行', terminationStatus: '待解除'
        }, 11)
    ];

    function statusClass(status) {
        if (/失败/.test(status)) return 'danger';
        if (/终止|归档/.test(status)) return 'muted';
        if (/成功|已备案|履行中|履行完成|解除成功/.test(status)) return 'success';
        return 'pending';
    }

    function renderStatus(status) {
        return '<span class="dc-status ' + statusClass(status) + '"><i></i>' + escapeHtml(status) + '</span>';
    }

    function actionButton(label, action, iconName, contractId, extraClass, attributes) {
        return '<button class="dc-link-action' + (extraClass ? ' ' + extraClass : '') + '" type="button" data-dc-action="' + action + '"' + (contractId ? ' data-contract-id="' + escapeHtml(contractId) + '"' : '') + (attributes ? ' ' + attributes : '') + '>' + icon(iconName) + '<span>' + escapeHtml(label) + '</span></button>';
    }

    function orderMenu(item) {
        if (item.business === 'service') return 'service-order';
        if (item.business === 'resource') return 'resource-order';
        return 'product-order';
    }

    function renderOrderLink(item) {
        var href = centerPage + '?menu=' + orderMenu(item) + '&view=detail&orderNo=' + encodeURIComponent(item.orderNo);
        return '<a class="dc-order-link" href="' + href + '" title="前往对应订单处理">' + escapeHtml(item.orderNo) + '</a>';
    }

    function getDisplayStatus(item) {
        if (config.type === 'sign') return item.signStatus;
        if (config.type === 'filing') return item.filingStatus;
        if (config.type === 'performance') return item.performanceStatus;
        if (config.type === 'termination') return item.terminationStatus;
        return item.overallStatus;
    }

    function getFilteredRecords() {
        var keyword = state.keyword.trim().toLowerCase();
        return CONTRACTS.filter(function (item) {
            if (config.type === 'management' && state.statusTab !== '全部' && item.overallStatus !== state.statusTab) return false;
            if (keyword) {
                var source = [item.id, item.name, item.orderNo, item.deliveryTaskId, item.targetName].join(' ').toLowerCase();
                if (source.indexOf(keyword) < 0) return false;
            }
            if (config.type === 'management' && state.startDate) {
                if (item.signAt === '--' || item.signAt.slice(0, 10) < state.startDate) return false;
            }
            if (config.type === 'management' && state.endDate) {
                if (item.signAt === '--' || item.signAt.slice(0, 10) > state.endDate) return false;
            }
            return true;
        });
    }

    function renderBanner() {
        var text = '';
        if (config.type === 'sign') text = '签署流程由订单状态驱动，如进行后续操作，请点击对应的“订单/申请编号”前往处理';
        if (config.type === 'performance') text = '履行流程由连接器的交付任务驱动，如进行后续操作，请前往对应的连接器处理';
        if (config.type === 'termination') text = '解除流程由订单状态驱动，如进行后续操作，请点击对应的“订单/申请编号”前往处理';
        return text ? '<div class="dc-notice">' + icon('info') + '<span>' + escapeHtml(text) + '</span></div>' : '';
    }

    function renderManagementTabs() {
        if (config.type !== 'management') return '';
        var tabs = ['全部', '发起', '协商', '签订', '签订成功', '签订失败', '履行中', '终止'];
        return '<div class="dc-tabs dc-status-tabs" role="tablist" aria-label="合约状态">' + tabs.map(function (tab) {
            return '<button type="button" role="tab" aria-selected="' + String(state.statusTab === tab) + '" class="dc-tab' + (state.statusTab === tab ? ' active' : '') + '" data-dc-status-tab="' + escapeHtml(tab) + '">' + escapeHtml(tab) + '</button>';
        }).join('') + '</div>';
    }

    function renderSearch() {
        var placeholder = '请输入合约标识码/合约名称';
        var dateRange = config.type === 'management'
            ? '<div class="dc-date-range"><span>签署时间</span><input type="date" aria-label="签署开始日期" value="' + escapeHtml(state.startDate) + '" data-dc-start-date><b>-</b><input type="date" aria-label="签署结束日期" value="' + escapeHtml(state.endDate) + '" data-dc-end-date>' + icon('calendar_month') + '</div>'
            : '';
        return '<div class="dc-query-row">'
            + '<label class="dc-search"><input type="text" value="' + escapeHtml(state.draftKeyword) + '" placeholder="' + placeholder + '" data-dc-keyword><button type="button" aria-label="查询" data-dc-search>' + icon('search') + '</button></label>'
            + dateRange
            + '</div>';
    }

    function renderTableHeader() {
        if (config.type === 'management') return '<tr><th>合约标识码</th><th>合约名称</th><th>合约类型</th><th>申请/订单编码</th><th>签署主体</th><th>更新时间</th><th>签署时间</th><th>合约状态</th><th class="dc-col-actions">操作</th></tr>';
        if (config.type === 'sign') return '<tr><th>合约标识码</th><th>合约名称</th><th>合约类型</th><th>申请/订单编码</th><th>签署主体</th><th>更新时间</th><th>合约版本</th><th>签署状态</th><th class="dc-col-actions">操作</th></tr>';
        if (config.type === 'filing') return '<tr><th>合约标识码</th><th>合约名称</th><th>合约类型</th><th>申请/订单编码</th><th>签署主体</th><th>更新时间</th><th>备案状态</th><th>合约版本</th><th class="dc-col-actions">操作</th></tr>';
        if (config.type === 'performance') return '<tr><th>合约标识码</th><th>合约名称</th><th>合约类型</th><th>交付任务ID</th><th>签署主体</th><th>更新时间</th><th>履行状态</th><th>合约版本</th><th class="dc-col-actions dc-wide-actions">操作</th></tr>';
        return '<tr><th>合约标识码</th><th>合约名称</th><th>合约类型</th><th>申请/订单编码</th><th>签署主体</th><th>更新时间</th><th>解除状态</th><th>合约版本</th><th class="dc-col-actions">操作</th></tr>';
    }

    function renderRow(item) {
        var status = getDisplayStatus(item);
        var commonStart = '<td class="dc-ellipsis" title="' + escapeHtml(item.id) + '">' + escapeHtml(item.id) + '</td>'
            + '<td class="dc-ellipsis" title="' + escapeHtml(item.name) + '">' + escapeHtml(item.name) + '</td>'
            + '<td>' + escapeHtml(item.contractType) + '</td>';
        var signer = '<td class="dc-number">' + item.signerCount + '</td>';
        var actions = '';

        if (config.type === 'management') {
            actions = actionButton('详情', 'detail', 'visibility', item.id);
            return '<tr>' + commonStart + '<td>' + renderOrderLink(item) + '</td>' + signer
                + '<td>' + escapeHtml(item.updatedAt) + '</td><td>' + escapeHtml(item.signAt) + '</td><td>' + renderStatus(status) + '</td><td class="dc-col-actions"><div class="dc-row-actions">' + actions + '</div></td></tr>';
        }
        if (config.type === 'sign') {
            actions = actionButton('详情', 'detail', 'visibility', item.id);
            return '<tr>' + commonStart + '<td>' + renderOrderLink(item) + '</td>' + signer
                + '<td>' + escapeHtml(item.updatedAt) + '</td><td>' + escapeHtml(item.version) + '</td><td>' + renderStatus(status) + '</td><td class="dc-col-actions"><div class="dc-row-actions">' + actions + '</div></td></tr>';
        }
        if (config.type === 'filing') {
            actions = actionButton('详情', 'detail', 'visibility', item.id);
            return '<tr>' + commonStart + '<td>' + renderOrderLink(item) + '</td>' + signer
                + '<td>' + escapeHtml(item.updatedAt) + '</td><td>' + renderStatus(status) + '</td><td>' + escapeHtml(item.version) + '</td><td class="dc-col-actions"><div class="dc-row-actions">' + actions + '</div></td></tr>';
        }
        if (config.type === 'performance') {
            if (item.performanceStatus === '履行完成') actions += actionButton('履约证明', 'performance-proof', 'verified', item.id);
            actions += actionButton('详情', 'detail', 'visibility', item.id);
            return '<tr>' + commonStart + '<td><button class="dc-task-link" type="button" data-dc-action="task" data-contract-id="' + escapeHtml(item.id) + '">' + escapeHtml(item.deliveryTaskId) + '</button></td>' + signer
                + '<td>' + escapeHtml(item.updatedAt) + '</td><td>' + renderStatus(status) + '</td><td>' + escapeHtml(item.version) + '</td><td class="dc-col-actions dc-wide-actions"><div class="dc-row-actions">' + actions + '</div></td></tr>';
        }
        return '<tr>' + commonStart + '<td>' + renderOrderLink(item) + '</td>' + signer
            + '<td>' + escapeHtml(item.updatedAt) + '</td><td>' + renderStatus(status) + '</td><td>' + escapeHtml(item.version) + '</td><td class="dc-col-actions"><span class="dc-no-action">--</span></td></tr>';
    }

    function renderPagination(total) {
        var totalPages = Math.max(1, Math.ceil(total / state.pageSize));
        state.page = Math.min(Math.max(1, state.page), totalPages);
        var pages = [];
        for (var i = 1; i <= totalPages; i += 1) pages.push(i);
        return '<div class="dc-pagination">'
            + '<span>共 ' + total + ' 条</span>'
            + '<button type="button" class="dc-page-arrow" data-dc-page="prev"' + (state.page === 1 ? ' disabled' : '') + ' aria-label="上一页">' + icon('chevron_left') + '</button>'
            + pages.map(function (page) { return '<button type="button" class="dc-page-number' + (state.page === page ? ' active' : '') + '" data-dc-page="' + page + '">' + page + '</button>'; }).join('')
            + '<button type="button" class="dc-page-arrow" data-dc-page="next"' + (state.page === totalPages ? ' disabled' : '') + ' aria-label="下一页">' + icon('chevron_right') + '</button>'
            + '<select class="dc-page-size" aria-label="每页数量" data-dc-page-size><option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10 条/页</option><option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20 条/页</option><option value="50"' + (state.pageSize === 50 ? ' selected' : '') + '>50 条/页</option></select>'
            + '<label class="dc-page-jump">前往<input type="number" min="1" max="' + totalPages + '" aria-label="跳转页码" data-dc-page-jump></label>'
            + '</div>';
    }

    function renderList() {
        var records = getFilteredRecords();
        var totalPages = Math.max(1, Math.ceil(records.length / state.pageSize));
        state.page = Math.min(state.page, totalPages);
        var start = (state.page - 1) * state.pageSize;
        var rows = records.slice(start, start + state.pageSize).map(renderRow).join('');
        if (!rows) rows = '<tr><td class="dc-empty-cell" colspan="9">' + icon('inbox') + '<span>暂无匹配数据</span></td></tr>';
        return '<div class="dc-page dc-list-page">'
            + renderBanner()
            + renderManagementTabs()
            + renderSearch()
            + '<div class="dc-table-card"><div class="dc-table-scroll"><table class="dc-table dc-table-' + config.type + '"><thead>' + renderTableHeader() + '</thead><tbody>' + rows + '</tbody></table></div>'
            + renderPagination(records.length)
            + '</div></div>';
    }

    function renderDetailHeader(item, status, secondaryLabel, secondaryValue, showCreatedAt) {
        return '<section class="dc-detail-summary"><h2>' + escapeHtml(status) + '</h2><div class="dc-detail-meta">'
            + '<div><span>合约标识码：</span><strong>' + escapeHtml(item.id) + '</strong></div>'
            + '<div><span>' + escapeHtml(secondaryLabel) + '：</span><strong class="dc-emphasis">' + escapeHtml(secondaryValue) + '</strong></div>'
            + (showCreatedAt ? '<div><span>创建时间：</span><strong>' + escapeHtml(item.createdAt) + '</strong></div>' : '')
            + '</div></section>';
    }

    function renderPartyCard(party, includeSignTime) {
        return '<article class="dc-party-card">'
            + '<div><span>签署主体类型：</span><strong>' + escapeHtml(party.type) + '</strong></div>'
            + '<div><span>签署主体标识码：</span><strong>' + escapeHtml(party.id) + '</strong></div>'
            + '<div><span>签署主体名称：</span><strong>' + escapeHtml(party.name) + '</strong></div>'
            + (includeSignTime ? '<div><span>签署时间：</span><strong>' + escapeHtml(party.signAt) + '</strong></div>' : '')
            + '</article>';
    }

    function renderAttachment(item) {
        return '<section class="dc-section"><h3>其他</h3><div class="dc-attachment"><span>附件：</span><strong>' + escapeHtml(item.fileName) + '</strong>' + actionButton('下载', 'download-attachment', 'download', item.id) + '</div></section>';
    }

    function renderManagementBasic(item) {
        return '<div class="dc-detail-content">'
            + '<section class="dc-section"><h3>合约信息</h3><div class="dc-info-grid"><div><span>合约名称：</span><strong>' + escapeHtml(item.name) + '</strong></div><div><span>所用合约模板：</span><strong>' + escapeHtml(item.templateName) + '</strong></div><div class="dc-wide"><span>合约简介：</span><strong>' + escapeHtml(item.description) + '</strong></div></div></section>'
            + '<section class="dc-section"><h3>签署信息</h3><div class="dc-info-grid"><div><span>合约签署模式：</span><strong>' + escapeHtml(item.contractType) + '</strong></div><div><span>合约签署时间：</span><strong>' + escapeHtml(item.signAt) + '</strong></div><div class="dc-wide"><span>合约有效时间：</span><strong>' + escapeHtml(item.validFrom + ' ~ ' + item.validTo) + '</strong></div></div><div class="dc-party-grid">' + renderPartyCard(item.provider, true) + renderPartyCard(item.consumer, true) + '</div></section>'
            + renderAttachment(item)
            + '</div>';
    }

    function renderContractVersions(item) {
        var rows = '<tr><td>' + escapeHtml(item.version) + ' <span class="dc-current-tag">当前</span></td><td>' + escapeHtml(item.signAt) + '</td><td>' + actionButton(item.fileName, 'download-attachment', 'description', item.id) + '</td></tr>';
        if (item.version === 'V2') rows += '<tr><td>V1</td><td>' + escapeHtml(addDays(item.createdAt, 1) + ' 09:20:00') + '</td><td>' + actionButton(item.name + '-V1.docx', 'download-attachment', 'description', item.id) + '</td></tr>';
        return '<div class="dc-detail-content"><div class="dc-simple-table"><table><thead><tr><th>合约版本</th><th>签署时间</th><th>附件</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
    }

    function renderStrategyTable(item) {
        return '<div class="dc-strategy-note"><span>操作类行为：</span><strong>数据使用方在使用数据产品时的操作</strong></div>'
            + '<div class="dc-simple-table dc-strategy-table"><table><thead><tr><th>策略实例</th><th>行为</th><th>约束条件</th><th>约束条件具体值</th></tr></thead><tbody>'
            + '<tr><td rowspan="2"><span class="dc-emphasis">' + escapeHtml(item.strategyId) + '</span></td><td rowspan="2">访问</td><td>使用次数</td><td>' + item.strategyCount + '</td></tr>'
            + '<tr><td>网络地址</td><td>' + escapeHtml(item.networkAddress) + '</td></tr>'
            + '</tbody></table></div>';
    }

    function renderExecutionNodes(item) {
        return '<section class="dc-section dc-node-section"><h3>策略执行节点</h3><div class="dc-info-grid">'
            + '<div><span>数据提供方指定策略执行节点标识：</span><strong>' + escapeHtml('502' + item.provider.id) + '</strong></div><div><span>数据提供方指定策略执行节点名称：</span><strong>' + escapeHtml(item.provider.name) + '</strong></div>'
            + '<div><span>数据使用方指定策略执行节点标识：</span><strong>' + escapeHtml('502' + item.consumer.id) + '</strong></div><div><span>数据使用方指定策略执行节点名称：</span><strong>' + escapeHtml(item.consumer.name) + '</strong></div>'
            + '</div></section>';
    }

    function renderContractStrategy(item) {
        return '<div class="dc-detail-content">'
            + '<section class="dc-section"><h3>合约标的</h3><div class="dc-info-grid"><div><span>数据产品/资源标识：</span><strong>' + escapeHtml(item.targetId) + '</strong></div><div><span>数据产品/资源名称：</span><strong>' + escapeHtml(item.targetName) + '</strong></div></div></section>'
            + '<section class="dc-section"><h3>合约策略</h3>' + renderStrategyTable(item) + '</section>'
            + renderExecutionNodes(item)
            + '</div>';
    }

    function getTimeline(item) {
        var events = [];
        if (item.filingStatus === '已归档') events.push({ title: '数字合约备案状态变更', text: '合约状态【终止】达到归档条件，合约的备案状态从【已备案】变成【已归档】', time: item.updatedAt });
        if (item.overallStatus === '终止') events.push({ title: '数字合约完结', text: '数字合约已完成全部履行与状态核验，合约生命周期结束', time: addDays(item.createdAt, 10) + ' 15:21:03' });
        if (item.performanceStatus === '履行完成') events.push({ title: '数字合约状态变成【终止】', text: '接收交付监测状态【交付完成】，合约的履行状态从【履行中】变成【履行完成】', time: addDays(item.createdAt, 10) + ' 15:21:02' });
        if (item.performanceStatus !== '待履行') events.push({ title: '数字合约状态变成【履行中】', text: '接收交付监测状态【交付中】，合约的履行状态从【未履行】变成【履行中】', time: addDays(item.createdAt, 4) + ' 15:14:16' });
        if (item.signStatus === '签署成功') events.push({ title: '数字合约准备履行', text: '接收合约状态【签订成功】，合约的履行状态从【初始】变成【未履行】', time: addDays(item.createdAt, 3) + ' 15:03:34' });
        if (item.filingStatus === '已备案' || item.filingStatus === '已归档') events.push({ title: '数字合约备案成功', text: '备案成功，合约的备案状态从【备案中】变成【已备案】', time: addDays(item.createdAt, 3) + ' 15:03:33' });
        if (item.filingStatus === '备案中') events.push({ title: '数字合约备案状态变更', text: '开始自动备案，合约的备案状态从【未备案】变成【备案中】', time: item.filingAt });
        if (item.signStatus === '签署成功') events.push({ title: '数字合约创建备案', text: '接收合约状态【签订成功】，创建数字合约备案记录', time: addDays(item.createdAt, 3) + ' 15:03:31' });
        if (item.signStatus === '签署失败') events.push({ title: '数字合约签署失败', text: '签署任务未完成，合约状态从【签订】变成【签订失败】', time: item.updatedAt });
        if (item.signStatus === '签署中') events.push({ title: '数字合约进入签订', text: '签署任务已创建，等待各签署主体完成签署', time: item.updatedAt });
        events.push({ title: '数字合约发起', text: '订单已提交数字合约申请，合约状态进入【发起】', time: item.createdAt });
        return events;
    }

    function renderTimeline(item) {
        var events = getTimeline(item);
        var visible = state.showAllTimeline ? events : events.slice(0, 6);
        var more = events.length > visible.length ? '<div class="dc-timeline-more">' + actionButton('查看更多', 'toggle-timeline', 'refresh', item.id) + '</div>' : '';
        return '<div class="dc-detail-content dc-timeline-wrap"><div class="dc-timeline">' + visible.map(function (event) {
            return '<article class="dc-timeline-item"><i></i><h4>' + escapeHtml(event.title) + '</h4><p>' + escapeHtml(event.text) + '</p><time>' + escapeHtml(event.time) + '</time></article>';
        }).join('') + '</div>' + more + '</div>';
    }

    function renderSignBasic(item) {
        return '<div class="dc-detail-content">'
            + '<section class="dc-section"><h3>合约信息</h3><div class="dc-info-grid"><div><span>合约名称：</span><strong>' + escapeHtml(item.name) + '</strong></div><div><span>合约版本：</span><strong>' + escapeHtml(item.version) + '</strong></div><div><span>创建时间：</span><strong>' + escapeHtml(item.createdAt) + '</strong></div><div><span>签署时间：</span><strong>' + escapeHtml(item.signAt) + '</strong></div></div></section>'
            + '<section class="dc-section"><h3>签署信息</h3><div class="dc-party-grid">' + renderPartyCard(item.provider, true) + renderPartyCard(item.consumer, true) + '</div></section>'
            + renderAttachment(item)
            + '</div>';
    }

    function getNegotiationRows(item) {
        var result = item.signStatus === '签署失败' ? '失败' : '成功';
        var rows = [
            ['系统', '供方完成合约签订', result, '--', item.provider.signAt],
            ['张威', '供方完成合约签订', result, '--', item.provider.signAt],
            ['测试TL', '关联合同', '成功', '--', item.consumer.signAt],
            ['张威', '供方审批通过', '成功', '--', addDays(item.createdAt, 1) + ' 15:01:39'],
            ['测试TL', '需方提交订单', '成功', '--', item.createdAt]
        ];
        if (item.signStatus === '待签署') rows = rows.slice(3);
        if (item.signStatus === '签署中') rows = rows.slice(2);
        return rows;
    }

    function renderNegotiation(item) {
        var rows = getNegotiationRows(item).map(function (row) { return '<tr><td>' + row.map(function (value) { return escapeHtml(value); }).join('</td><td>') + '</td></tr>'; }).join('');
        return '<div class="dc-detail-content"><div class="dc-simple-table"><table><thead><tr><th>操作方</th><th>操作类型</th><th>操作结果</th><th>操作内容</th><th>操作时间</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
    }

    function renderFilingBasic(item) {
        return '<div class="dc-detail-content">'
            + '<section class="dc-section"><h3>合约信息</h3><div class="dc-info-grid"><div><span>合约名称：</span><strong>' + escapeHtml(item.name) + '</strong></div><div><span>合约版本：</span><strong>' + escapeHtml(item.version) + '</strong></div><div><span>签署时间：</span><strong>' + escapeHtml(item.signAt) + '</strong></div><div><span>备案完成时间：</span><strong>' + escapeHtml(item.filingAt) + '</strong></div></div></section>'
            + '<section class="dc-section"><h3>签署信息</h3><div class="dc-party-grid">' + renderPartyCard(item.provider, true) + renderPartyCard(item.consumer, true) + '</div></section>'
            + renderAttachment(item)
            + '</div>';
    }

    function filingVersionRows(item) {
        var canProof = item.filingStatus === '已备案' || item.filingStatus === '已归档';
        var rows = [[item.version, item.filingNo, item.filingAt, item.signAt, '--']];
        if (item.version === 'V2' || item.filingStatus === '已归档') rows.push(['V1', item.filingNo.replace(/\d+$/, function (number) { return String(Number(number) - 1); }), addDays(item.filingAt, -1) + ' 15:03:28', addDays(item.signAt, -1) + ' 00:00:00', '--']);
        return rows.map(function (row, index) {
            var action = canProof ? actionButton('备案凭证', 'filing-proof', 'verified', item.id, index ? 'secondary-version' : '', 'data-filing-version="' + escapeHtml(row[0]) + '" data-filing-no="' + escapeHtml(row[1]) + '"') : '<span class="dc-no-action">--</span>';
            return '<tr><td>' + row.map(function (value) { return escapeHtml(value); }).join('</td><td>') + '</td><td class="dc-inline-actions">' + action + '</td></tr>';
        }).join('');
    }

    function renderFilingVersions(item) {
        return '<div class="dc-detail-content"><div class="dc-simple-table"><table><thead><tr><th>合约版本</th><th>备案编号</th><th>备案时间</th><th>签署时间</th><th>备注</th><th>操作</th></tr></thead><tbody>' + filingVersionRows(item) + '</tbody></table></div></div>';
    }

    function getFilingProcess(item) {
        var rows = [];
        if (item.filingStatus === '已备案' || item.filingStatus === '已归档') rows.push(['已备案', item.filingAt, '备案编码：' + item.filingNo]);
        if (item.filingStatus !== '未备案') rows.push(['备案中', addDays(item.createdAt, 2) + ' 15:03:27', '--']);
        rows.push(['未备案', addDays(item.createdAt, 1) + ' 15:03:27', '合约' + item.orderLabel + (item.signStatus === '签署成功' ? '签订成功' : '等待签订完成')]);
        return rows;
    }

    function renderFilingProcess(item) {
        var rows = getFilingProcess(item).map(function (row) { return '<tr><td>' + row.map(function (value) { return escapeHtml(value); }).join('</td><td>') + '</td></tr>'; }).join('');
        return '<div class="dc-detail-content"><div class="dc-simple-table"><table><thead><tr><th>操作类型</th><th>更新时间</th><th>操作说明</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
    }

    function renderPerformanceBasic(item) {
        return '<div class="dc-detail-content">'
            + '<section class="dc-section"><h3>合约信息</h3><div class="dc-info-grid"><div><span>合约名称：</span><strong>' + escapeHtml(item.name) + '</strong></div><div><span>合约版本：</span><strong>' + escapeHtml(item.version) + '</strong></div><div><span>签署时间：</span><strong>' + escapeHtml(item.signAt) + '</strong></div><div><span>履行开始时间：</span><strong>' + escapeHtml(item.performanceAt) + '</strong></div></div></section>'
            + '<section class="dc-section"><h3>签署信息</h3><div class="dc-party-grid">' + renderPartyCard(item.provider, true) + renderPartyCard(item.consumer, true) + '</div></section>'
            + renderAttachment(item)
            + '</div>';
    }

    function getPerformanceLogs(item) {
        if (item.performanceStatus === '履行完成') return [];
        if (item.performanceStatus === '待履行') return [];
        return [
            [addDays(item.createdAt, 5) + ' 10:16:08', item.provider.name, addDays(item.createdAt, 5) + ' 10:16:12', '正常'],
            [addDays(item.createdAt, 4) + ' 16:42:31', item.consumer.name, addDays(item.createdAt, 4) + ' 16:42:36', '正常']
        ];
    }

    function renderLogRows(item, forDrawer) {
        var logs = getPerformanceLogs(item);
        if (!logs.length) return '<tr><td class="dc-log-empty" colspan="' + (forDrawer ? '4' : '5') + '">' + icon('inbox') + '<span>暂无数据</span></td></tr>';
        return logs.map(function (row) {
            var values = row.map(function (value) { return '<td>' + escapeHtml(value) + '</td>'; }).join('');
            return '<tr>' + values + (forDrawer ? '' : '<td><span class="dc-no-action">--</span></td>') + '</tr>';
        }).join('');
    }

    function renderPerformanceLogs(item) {
        return '<div class="dc-detail-content"><div class="dc-simple-table dc-log-table"><table><thead><tr><th>日志时间</th><th>执行节点</th><th>日志上报时间</th><th>状态</th><th>操作</th></tr></thead><tbody>' + renderLogRows(item, false) + '</tbody></table></div></div>';
    }

    function detailTabs() {
        if (config.type === 'management') return [['basic', '基本信息'], ['versions', '合约版本'], ['strategy', '合约策略'], ['timeline', '时间轴']];
        if (config.type === 'sign') return [['basic', '基本信息'], ['negotiation', '协商过程']];
        if (config.type === 'filing') return [['basic', '基本信息'], ['filing-versions', '备案版本'], ['filing-process', '备案过程']];
        return [['basic', '基本信息'], ['performance-logs', '履行日志']];
    }

    function renderDetailTabs() {
        return '<div class="dc-tabs dc-detail-tabs" role="tablist">' + detailTabs().map(function (tab) {
            return '<button type="button" role="tab" aria-selected="' + String(state.detailTab === tab[0]) + '" class="dc-tab' + (state.detailTab === tab[0] ? ' active' : '') + '" data-dc-detail-tab="' + tab[0] + '">' + tab[1] + '</button>';
        }).join('') + '</div>';
    }

    function renderDetailBody(item) {
        if (config.type === 'management') {
            if (state.detailTab === 'versions') return renderContractVersions(item);
            if (state.detailTab === 'strategy') return renderContractStrategy(item);
            if (state.detailTab === 'timeline') return renderTimeline(item);
            return renderManagementBasic(item);
        }
        if (config.type === 'sign') return state.detailTab === 'negotiation' ? renderNegotiation(item) : renderSignBasic(item);
        if (config.type === 'filing') {
            if (state.detailTab === 'filing-versions') return renderFilingVersions(item);
            if (state.detailTab === 'filing-process') return renderFilingProcess(item);
            return renderFilingBasic(item);
        }
        return state.detailTab === 'performance-logs' ? renderPerformanceLogs(item) : renderPerformanceBasic(item);
    }

    function renderDetail() {
        var item = CONTRACTS.find(function (contract) { return contract.id === state.detailId; });
        if (!item) return renderList();
        var banner = (config.type === 'sign' || config.type === 'performance') ? renderBanner() : '';
        var header = '';
        if (config.type === 'management') header = renderDetailHeader(item, item.overallStatus, '订单/申请编号', item.orderNo, true);
        if (config.type === 'sign') header = renderDetailHeader(item, item.signStatus, '订单/申请编号', item.orderNo, false);
        if (config.type === 'filing') header = renderDetailHeader(item, item.filingStatus, '订单/申请编号', item.orderNo, false);
        if (config.type === 'performance') header = renderDetailHeader(item, item.performanceStatus, '交付任务ID', item.deliveryTaskId, false);
        return '<div class="dc-page dc-detail-page">' + banner + header + renderDetailTabs() + renderDetailBody(item) + '</div>';
    }

    function renderCredentialDrawer(item) {
        var filingVersion = state.drawer && state.drawer.version ? state.drawer.version : item.version;
        var filingNo = state.drawer && state.drawer.filingNo ? state.drawer.filingNo : item.filingNo;
        return '<div class="dc-drawer-mask" data-dc-action="close-drawer"></div><aside class="dc-proof-drawer" role="dialog" aria-modal="true" aria-labelledby="dcProofTitle">'
            + '<header><button type="button" data-dc-action="close-drawer" aria-label="关闭">' + icon('close') + '</button><h2 id="dcProofTitle">备案凭证</h2></header>'
            + '<div class="dc-proof-body"><h1>数字合约备案凭证</h1><div class="dc-proof-meta"><div><span>凭证编号：</span><strong>' + escapeHtml(filingNo) + '</strong></div><div><span>出具时间：</span><strong>2026-08-13 14:12:44</strong></div></div>'
            + '<section><h3>合约信息</h3><div class="dc-info-grid"><div><span>合约标识码：</span><strong>' + escapeHtml(item.id) + '</strong></div><div><span>合约名称：</span><strong>' + escapeHtml(item.name) + '</strong></div><div><span>合约版本：</span><strong>' + escapeHtml(filingVersion) + '</strong></div><div><span>签署模式：</span><strong>' + escapeHtml(item.contractType) + '</strong></div></div></section>'
            + '<section><h3>签署主体</h3><div class="dc-party-grid">' + renderPartyCard(item.provider, true) + renderPartyCard(item.consumer, true) + '</div></section>'
            + '<section><h3>合约标的</h3><div class="dc-info-grid"><div><span>数据产品/资源标识：</span><strong>' + escapeHtml(item.targetId) + '</strong></div><div><span>数据产品/资源名称：</span><strong>' + escapeHtml(item.targetName) + '</strong></div></div></section>'
            + '<section><h3>合约策略</h3>' + renderStrategyTable(item) + '</section>'
            + renderExecutionNodes(item)
            + '</div></aside>';
    }

    function renderPerformanceProofDrawer(item) {
        return '<div class="dc-drawer-mask" data-dc-action="close-drawer"></div><aside class="dc-proof-drawer dc-performance-proof" role="dialog" aria-modal="true" aria-labelledby="dcPerformanceProofTitle">'
            + '<header><button type="button" data-dc-action="close-drawer" aria-label="关闭">' + icon('close') + '</button><h2 id="dcPerformanceProofTitle">履约证明</h2><button class="dc-download-button" type="button" data-dc-action="download-proof" data-contract-id="' + escapeHtml(item.id) + '">' + icon('download') + '<span>下载</span></button></header>'
            + '<div class="dc-proof-body"><h1>数字合约履约证明</h1><div class="dc-proof-meta"><div><span>证明编号：</span><strong>' + escapeHtml(item.proofNo) + '</strong></div><div><span>出具时间：</span><strong>2026-08-13 14:13:22</strong></div></div>'
            + '<section><h3>合约信息</h3><div class="dc-info-grid"><div><span>合约标识码：</span><strong>' + escapeHtml(item.id) + '</strong></div><div><span>合约名称：</span><strong>' + escapeHtml(item.name) + '</strong></div><div class="dc-wide"><span>关联订单号：</span><strong>' + escapeHtml(item.orderNo) + '</strong></div></div></section>'
            + '<section><h3>签署信息</h3><div class="dc-info-grid"><div class="dc-wide"><span>签署时间：</span><strong>' + escapeHtml(item.signAt) + '</strong></div></div><div class="dc-party-grid">' + renderPartyCard(item.provider, false) + renderPartyCard(item.consumer, false) + '</div></section>'
            + '<section><h3>履约陈述</h3><div class="dc-proof-status"><span>合约状态：</span>' + renderStatus(item.performanceStatus) + '</div><div class="dc-simple-table"><table><thead><tr><th>日志时间</th><th>执行节点</th><th>日志上报时间</th><th>状态</th></tr></thead><tbody>' + renderLogRows(item, true) + '</tbody></table></div></section>'
            + '<footer><strong>声明：</strong><p>本证明由本平台根据合约履行过程中产生的记录生成。上述履约事实记录真实、完整，且因其技术特性而不可篡改。本证明旨在客观记录合约履行情况，仅供参考与验证之用，不构成任何额外的承诺或保证。具体权利义务，仍以各方签署的原始合约为准。</p></footer>'
            + '</div></aside>';
    }

    function renderDrawer() {
        if (!state.drawer) return '';
        var item = CONTRACTS.find(function (contract) { return contract.id === state.drawer.contractId; });
        if (!item) return '';
        return state.drawer.type === 'filing' ? renderCredentialDrawer(item) : renderPerformanceProofDrawer(item);
    }

    function renderToast() {
        return state.toast ? '<div class="dc-toast" role="status" aria-live="polite">' + icon('check_circle') + '<span>' + escapeHtml(state.toast) + '</span></div>' : '';
    }

    function renderTitle() {
        if (!titleEl) return;
        if (state.detailId) {
            titleEl.innerHTML = '<button class="dc-back-button" type="button" data-dc-title-back>' + icon('chevron_left') + '<span>' + escapeHtml(config.detailTitle) + '</span></button>';
        } else {
            titleEl.textContent = config.title;
        }
    }

    function render() {
        renderTitle();
        document.title = (state.detailId ? config.detailTitle : config.title) + ' - ' + centerName;
        panel.className = 'wb-consult-shell is-digital-contracts';
        panel.innerHTML = (state.detailId ? renderDetail() : renderList()) + renderDrawer() + renderToast();
        bindEvents();
    }

    function showToast(message) {
        state.toast = message;
        render();
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(function () {
            state.toast = '';
            var toast = document.querySelector('.dc-toast');
            if (toast) toast.remove();
        }, 2200);
    }

    function downloadDocument(item, proof) {
        var heading = proof ? '数字合约履约证明' : item.name;
        var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + escapeHtml(heading) + '</title></head><body><h1>' + escapeHtml(heading) + '</h1><p>合约标识码：' + escapeHtml(item.id) + '</p><p>合约名称：' + escapeHtml(item.name) + '</p><p>订单编号：' + escapeHtml(item.orderNo) + '</p><p>状态：' + escapeHtml(proof ? item.performanceStatus : item.overallStatus) + '</p></body></html>';
        var blob = new Blob(['\ufeff' + html], { type: 'application/msword' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.download = (proof ? '数字合约履约证明-' + item.proofNo : item.name) + '.doc';
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(function () { URL.revokeObjectURL(url); }, 0);
        showToast(proof ? '履约证明已下载。' : '合约附件已下载。');
    }

    function resetDetail() {
        state.detailId = '';
        state.detailTab = 'basic';
        state.showAllTimeline = false;
        state.drawer = null;
        render();
    }

    function bindEvents() {
        var back = titleEl && titleEl.querySelector('[data-dc-title-back]');
        if (back) back.addEventListener('click', resetDetail);

        var keyword = panel.querySelector('[data-dc-keyword]');
        if (keyword) {
            keyword.addEventListener('input', function () { state.draftKeyword = this.value; });
            keyword.addEventListener('keydown', function (event) {
                if (event.key !== 'Enter') return;
                state.keyword = state.draftKeyword;
                state.page = 1;
                render();
            });
        }
        var search = panel.querySelector('[data-dc-search]');
        if (search) search.addEventListener('click', function () { state.keyword = state.draftKeyword; state.page = 1; render(); });

        panel.querySelectorAll('[data-dc-status-tab]').forEach(function (button) {
            button.addEventListener('click', function () { state.statusTab = this.dataset.dcStatusTab; state.page = 1; render(); });
        });
        var startDate = panel.querySelector('[data-dc-start-date]');
        var endDate = panel.querySelector('[data-dc-end-date]');
        if (startDate) startDate.addEventListener('change', function () { state.startDate = this.value; state.keyword = state.draftKeyword; state.page = 1; render(); });
        if (endDate) endDate.addEventListener('change', function () { state.endDate = this.value; state.keyword = state.draftKeyword; state.page = 1; render(); });

        panel.querySelectorAll('[data-dc-page]').forEach(function (button) {
            button.addEventListener('click', function () {
                var target = this.dataset.dcPage;
                var totalPages = Math.max(1, Math.ceil(getFilteredRecords().length / state.pageSize));
                if (target === 'prev') state.page = Math.max(1, state.page - 1);
                else if (target === 'next') state.page = Math.min(totalPages, state.page + 1);
                else state.page = Number(target) || 1;
                render();
            });
        });
        var pageSize = panel.querySelector('[data-dc-page-size]');
        if (pageSize) pageSize.addEventListener('change', function () { state.pageSize = Number(this.value) || 10; state.page = 1; render(); });
        var pageJump = panel.querySelector('[data-dc-page-jump]');
        if (pageJump) pageJump.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter') return;
            var totalPages = Math.max(1, Math.ceil(getFilteredRecords().length / state.pageSize));
            state.page = Math.min(totalPages, Math.max(1, Number(this.value) || 1));
            render();
        });

        panel.querySelectorAll('[data-dc-detail-tab]').forEach(function (button) {
            button.addEventListener('click', function () { state.detailTab = this.dataset.dcDetailTab; state.showAllTimeline = false; render(); });
        });

        panel.querySelectorAll('[data-dc-action]').forEach(function (button) {
            button.addEventListener('click', function (event) {
                var action = this.dataset.dcAction;
                var contractId = this.dataset.contractId;
                var item = CONTRACTS.find(function (contract) { return contract.id === contractId; });
                if (action === 'detail' && item) {
                    state.detailId = item.id;
                    state.detailTab = 'basic';
                    state.showAllTimeline = false;
                    state.drawer = null;
                    render();
                } else if (action === 'filing-proof' && item) {
                    state.drawer = { type: 'filing', contractId: item.id, version: this.dataset.filingVersion || item.version, filingNo: this.dataset.filingNo || item.filingNo };
                    render();
                } else if (action === 'performance-proof' && item) {
                    state.drawer = { type: 'performance', contractId: item.id };
                    render();
                } else if (action === 'close-drawer') {
                    event.preventDefault();
                    state.drawer = null;
                    render();
                } else if (action === 'toggle-timeline') {
                    state.showAllTimeline = true;
                    render();
                } else if (action === 'download-attachment' && item) {
                    downloadDocument(item, false);
                } else if (action === 'download-proof' && item) {
                    downloadDocument(item, true);
                } else if (action === 'task' && item) {
                    showToast('已定位交付任务：' + item.deliveryTaskId);
                }
            });
        });
    }

    function init() {
        panel = document.querySelector('[data-consult-panel][data-role="' + role + '"]');
        titleEl = document.querySelector('[data-center-title]');
        if (!panel || !titleEl) return;
        render();
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && state.drawer) {
                state.drawer = null;
                render();
            }
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
