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
    var keyword = '';
    var statusFilter = '全部状态';
    var activeContractId = '';
    var drawerMode = 'detail';
    var toastText = '';
    var PLATFORM_OPERATOR_NAME = '深圳市龙岗区数据要素交易服务有限公司';

    var CONTRACTS = [
        {
            id: 'LG-CP-20260717-119048', type: 'product', orderNo: '2026071717251106400000101149048', name: '龙岗区交通运行拥堵指数服务交易合同', itemName: '龙岗区交通运行拥堵指数服务', provider: '深圳市龙岗数智科技有限公司', demander: '龙岗智慧交通科技有限公司', amount: 1500, serviceFeeRate: 3, signedAt: '2026-07-18', effectiveAt: '2026-07-18', endsAt: '2027-07-17', supplierStatus: '待供方签署', buyerStatus: '履约中', updatedAt: '2026-07-18 10:22:16', stages: [{ name: '一次性付款', percent: 100, amount: 1500, state: '待支付' }]
        },
        {
            id: 'LG-CP-20260716-114833', type: 'product', orderNo: '2026071610053204300000101148331', name: '产业链企业图谱查询交易合同', itemName: '产业链企业图谱查询产品', provider: '深圳市龙岗数智科技有限公司', demander: '深圳龙岗科创金融服务有限公司', amount: 1500, serviceFeeRate: 3, signedAt: '2026-07-16', effectiveAt: '2026-07-16', endsAt: '2027-07-15', supplierStatus: '履约中', buyerStatus: '履约中', updatedAt: '2026-07-17 09:08:42', stages: [{ name: '一次性付款', percent: 100, amount: 1500, state: '已支付' }]
        },
        {
            id: 'LG-CP-20260610-118853', type: 'product', orderNo: '2026061014253600800000101148853', name: '中小微企业扶持政策匹配数据集交易合同', itemName: '龙岗区中小微企业扶持政策匹配数据集', provider: '龙岗区企业服务集团有限公司', demander: '深圳市龙岗智慧产业有限公司', amount: 250, serviceFeeRate: 3, signedAt: '2026-06-11', effectiveAt: '2026-06-11', endsAt: '2027-06-10', supplierStatus: '履约中', buyerStatus: '待需方签署', updatedAt: '2026-06-11 09:36:12', stages: [{ name: '一次性付款', percent: 100, amount: 250, state: '待支付' }]
        },
        {
            id: 'LG-FW-20260718-114949', type: 'service', orderNo: '2026071817245104300000101149449', name: '数字化转型顶层规划咨询服务合同', itemName: '数字化转型顶层规划咨询服务', provider: '深圳市龙岗数智科技有限公司', demander: '龙岗数智产业研究院有限公司', amount: 8000, serviceFeeRate: 3, signedAt: '2026-07-19', effectiveAt: '2026-07-19', endsAt: '2026-10-19', supplierStatus: '待供方签署', buyerStatus: '履约中', updatedAt: '2026-07-19 11:34:25', stages: [{ name: '首期款', percent: 30, amount: 2400, state: '待支付（首次）' }, { name: '阶段款', percent: 40, amount: 3200, state: '未到付款节点' }, { name: '尾款', percent: 30, amount: 2400, state: '未到付款节点' }]
        },
        {
            id: 'LG-FW-20260619-118466', type: 'service', orderNo: '2026061916051502100000101148466', name: '金融风控数据建模与实施服务合同', itemName: '福田区金融风控数据建模与实施服务', provider: '深圳市龙岗区数据服务中心', demander: '深圳市龙岗智慧产业有限公司', amount: 1000, serviceFeeRate: 3, signedAt: '2026-06-20', effectiveAt: '2026-06-20', endsAt: '2026-09-20', supplierStatus: '履约中', buyerStatus: '待需方签署', updatedAt: '2026-06-20 10:15:36', stages: [{ name: '首期款', percent: 30, amount: 300, state: '待支付（首次）' }, { name: '阶段款', percent: 40, amount: 400, state: '未到付款节点' }, { name: '尾款', percent: 30, amount: 300, state: '未到付款节点' }]
        },
        {
            id: 'LG-FW-20260715-113908', type: 'service', orderNo: '2026071510364507600000101139088', name: '数据治理成熟度评估服务合同', itemName: '数据治理成熟度评估服务', provider: '深圳市龙岗数智科技有限公司', demander: '龙岗区数据应用创新中心', amount: 12000, serviceFeeRate: 3, signedAt: '2026-07-15', effectiveAt: '2026-07-15', endsAt: '2026-11-15', supplierStatus: '履约中', buyerStatus: '履约中', updatedAt: '2026-07-21 15:16:20', stages: [{ name: '首期款', percent: 30, amount: 3600, state: '已支付' }, { name: '方案确认款', percent: 20, amount: 2400, state: '已支付' }, { name: '初验款', percent: 30, amount: 3600, state: '待支付（阶段）' }, { name: '尾款', percent: 20, amount: 2400, state: '未到付款节点' }]
        },
        {
            id: 'LG-FW-20260628-112760', type: 'service', orderNo: '2026062810241507600000101127602', name: '公共数据授权运营咨询服务合同', itemName: '公共数据授权运营咨询服务', provider: '深圳市龙岗数智科技有限公司', demander: '龙岗数智产业研究院有限公司', amount: 20000, serviceFeeRate: 2.5, signedAt: '2026-06-29', effectiveAt: '2026-06-29', endsAt: '2026-09-30', supplierStatus: '履约中', buyerStatus: '履约中', updatedAt: '2026-07-22 08:42:10', stages: [{ name: '首期款', percent: 30, amount: 6000, state: '已支付' }, { name: '阶段款', percent: 40, amount: 8000, state: '已支付' }, { name: '尾款', percent: 30, amount: 6000, state: '待支付（最后）' }]
        }
    ];

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
        });
    }

    function icon(name) {
        var path = {
            search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
            refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
            eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
            sign: '<path d="M4 20h16M6 16l8.5-8.5 3 3L9 19H6zM13 6l3 3"/>',
            close: '<path d="M6 6l12 12M18 6 6 18"/>',
            check: '<path d="m5 12 4 4L19 6"/>',
            file: '<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/>'
        };
        return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (path[name] || path.file) + '</svg>';
    }

    function button(label, style, action, iconName, attrs) {
        return '<button class="trade-contract-btn ' + (style || '') + '" type="button" data-contract-action="' + action + '" ' + (attrs || '') + '>' + icon(iconName) + '<span>' + label + '</span></button>';
    }

    function statusTag(value) {
        var type = value === '履约中' || value === '已支付' ? 'success' : value.indexOf('待') === 0 ? 'warning' : value === '未到付款节点' ? 'neutral' : 'info';
        return '<span class="trade-contract-status ' + type + '"><i></i>' + escapeHtml(value) + '</span>';
    }

    function getStatus(item) {
        return role === 'supplier' ? item.supplierStatus : item.buyerStatus;
    }

    function records() {
        var lower = keyword.trim().toLowerCase();
        return CONTRACTS.filter(function (item) {
            var typeMatch = item.type === businessType;
            var keywordMatch = !lower || [item.id, item.orderNo, item.name, item.itemName, item.provider, item.demander].join(' ').toLowerCase().indexOf(lower) >= 0;
            var statusMatch = statusFilter === '全部状态' || getStatus(item) === statusFilter;
            return typeMatch && keywordMatch && statusMatch;
        });
    }

    function renderDrawer() {
        if (!activeContractId) return '';
        var item = CONTRACTS.find(function (contract) { return contract.id === activeContractId; });
        if (!item) return '';
        var selfOperated = item.provider === PLATFORM_OPERATOR_NAME;
        var feeRate = selfOperated ? 0 : item.serviceFeeRate;
        var stageRows = item.stages.map(function (stage, index) {
            var fee = stage.amount * feeRate / 100;
            return selfOperated
                ? '<tr><td>第' + (index + 1) + '期</td><td>' + stage.name + '</td><td>' + stage.percent.toFixed(2) + '%</td><td>¥' + stage.amount.toFixed(2) + '</td><td>' + statusTag(stage.state) + '</td></tr>'
                : '<tr><td>第' + (index + 1) + '期</td><td>' + stage.name + '</td><td>' + stage.percent.toFixed(2) + '%</td><td>¥' + stage.amount.toFixed(2) + '</td><td>¥' + fee.toFixed(2) + '</td><td>¥' + (stage.amount - fee).toFixed(2) + '</td><td>' + statusTag(stage.state) + '</td></tr>';
        }).join('');
        var stageHead = selfOperated
            ? '<tr><th>期次</th><th>阶段名称</th><th>比例</th><th>本期金额</th><th>状态</th></tr>'
            : '<tr><th>期次</th><th>阶段名称</th><th>比例</th><th>本期金额</th><th>平台服务费</th><th>提供方实收</th><th>状态</th></tr>';
        var stageFoot = selfOperated
            ? '<tr><td colspan="2">合计</td><td>100.00%</td><td>¥' + item.amount.toFixed(2) + '</td><td></td></tr>'
            : '<tr><td colspan="2">合计</td><td>100.00%</td><td>¥' + item.amount.toFixed(2) + '</td><td>¥' + (item.amount * feeRate / 100).toFixed(2) + '</td><td>¥' + (item.amount * (100 - feeRate) / 100).toFixed(2) + '</td><td></td></tr>';
        var signPanel = drawerMode === 'sign' ? '<section class="trade-contract-sign-panel"><label><input type="checkbox" data-contract-agree><span>我已核对合同主体、金额、付款计划' + (selfOperated ? '' : '及平台服务费条款') + '，同意签署本合同。</span></label><p>签署后付款计划' + (selfOperated ? '' : '和服务费比例') + '将冻结，后续调整不追溯本合同。</p></section>' : '';
        return ''
            + '<div class="trade-contract-drawer-mask" data-contract-drawer-close></div><aside class="trade-contract-drawer" role="dialog" aria-modal="true" aria-labelledby="tradeContractDrawerTitle">'
            +   '<header><div><h2 id="tradeContractDrawerTitle">' + (drawerMode === 'sign' ? '签署合同' : '合同详情') + '</h2><p>' + item.id + '</p></div><button type="button" data-contract-action="close-drawer" aria-label="关闭">' + icon('close') + '</button></header>'
            +   '<div class="trade-contract-drawer-body">'
            +       '<section><div class="trade-contract-section-head"><h3>合同基本信息</h3>' + statusTag(getStatus(item)) + '</div><div class="trade-contract-detail-grid"><div><span>合同名称</span><strong>' + item.name + '</strong></div><div><span>关联订单</span><strong>' + item.orderNo + '</strong></div><div><span>提供方</span><strong>' + item.provider + '</strong></div><div><span>需求方</span><strong>' + item.demander + '</strong></div><div><span>经营属性</span><strong>' + (selfOperated ? '自营' : '第三方供方') + '</strong></div>' + (selfOperated ? '' : '<div><span>平台运营方</span><strong>' + PLATFORM_OPERATOR_NAME + '</strong></div>') + '<div><span>签署日期</span><strong>' + item.signedAt + '</strong></div><div><span>合同期限</span><strong>' + item.effectiveAt + ' 至 ' + item.endsAt + '</strong></div></div></section>'
            +       '<section><div class="trade-contract-section-head"><h3>' + (selfOperated ? '付款条款' : '付款与分账条款') + '</h3><span class="trade-contract-frozen">' + icon('check') + '已按合同冻结</span></div><div class="trade-contract-rule-summary"><div><span>合同金额</span><strong>¥' + item.amount.toFixed(2) + '</strong></div>' + (selfOperated ? '' : '<div><span>平台服务费比例</span><strong>' + feeRate.toFixed(2) + '%</strong><small>来自服务费规则，签订时快照</small></div>') + '<div><span>资金处理方式</span><strong>' + (selfOperated ? '运营方统一收款' : '按每一期实付金额自动分账') + '</strong><small>' + (selfOperated ? '不发起对外分账' : '平台保留服务费后分账给供方') + '</small></div></div><div class="trade-contract-stage-scroll"><table><thead>' + stageHead + '</thead><tbody>' + stageRows + '</tbody><tfoot>' + stageFoot + '</tfoot></table></div></section>'
            +       '<section><div class="trade-contract-section-head"><h3>合同附件</h3></div><div class="trade-contract-file">' + icon('file') + '<div><strong>' + item.name + '.pdf</strong><span>PDF · 1.8 MB · 2026-07-18 上传</span></div>' + button('查看', 'text', 'view-file', 'eye') + '</div></section>'
            +       signPanel
            +   '</div>'
            +   '<footer>' + button('关闭', '', 'close-drawer', 'close') + (drawerMode === 'sign' ? button('确认签署', 'primary', 'confirm-sign', 'sign', 'data-contract-id="' + item.id + '"') : '') + '</footer>'
            + '</aside>';
    }

    function renderToast() {
        return toastText ? '<div class="trade-contract-toast" role="status">' + icon('check') + '<span>' + escapeHtml(toastText) + '</span></div>' : '';
    }

    function render() {
        var list = records();
        var typeLabel = businessType === 'service' ? '服务' : '产品';
        if (title) title.textContent = typeLabel + '合同管理';
        panel.className = 'wb-consult-shell is-trade-contracts';
        panel.innerHTML = ''
            + '<div class="trade-contract-page">'
            +   '<section class="trade-contract-summary"><div><span>合同总数</span><strong>' + list.length + '</strong><small>' + typeLabel + '交易合同</small></div><div><span>待我签署</span><strong>' + list.filter(function (item) { return getStatus(item).indexOf('待') === 0; }).length + '</strong><small>请核对付款与分账条款</small></div><div><span>履约中</span><strong>' + list.filter(function (item) { return getStatus(item) === '履约中'; }).length + '</strong><small>按合同付款节点执行</small></div><div><span>合同金额</span><strong>¥' + list.reduce(function (sum, item) { return sum + item.amount; }, 0).toLocaleString('zh-CN') + '</strong><small>当前筛选结果合计</small></div></section>'
            +   '<section class="trade-contract-toolbar"><label>' + icon('search') + '<input type="search" placeholder="搜索合同名称、合同编号或订单编号" value="' + escapeHtml(keyword) + '" data-contract-search></label><select data-contract-status><option>全部状态</option><option>待供方签署</option><option>待需方签署</option><option>履约中</option></select>' + button('查询', 'primary', 'search', 'search') + button('重置', '', 'reset', 'refresh') + '</section>'
            +   '<section class="trade-contract-table-card"><div class="trade-contract-table-meta"><span>共 <strong>' + list.length + '</strong> 份合同</span><span>付款计划与服务费比例以合同快照为准</span></div><div class="trade-contract-table-scroll"><table><thead><tr><th>合同编号 / 名称</th><th>关联订单</th><th>交易标的</th><th>交易对方</th><th>合同金额</th><th>付款方式</th><th>状态</th><th>更新时间</th><th>操作</th></tr></thead><tbody>'
            +   list.map(function (item) {
                    var status = getStatus(item);
                    var counterparty = role === 'supplier' ? item.demander : item.provider;
                    var paymentLabel = item.stages.length > 1 ? item.stages.length + '期付款' : '一次性付款';
                    return '<tr><td><strong>' + item.name + '</strong><small>' + item.id + '</small></td><td><code>' + item.orderNo + '</code></td><td>' + item.itemName + '</td><td>' + counterparty + '</td><td><strong class="trade-contract-money">¥' + item.amount.toFixed(2) + '</strong><small>服务费 ' + item.serviceFeeRate.toFixed(2) + '%</small></td><td><strong>' + paymentLabel + '</strong><small>' + item.stages.map(function (stage) { return stage.percent + '%'; }).join(' / ') + '</small></td><td>' + statusTag(status) + '</td><td>' + item.updatedAt + '</td><td><div class="trade-contract-actions">' + (status.indexOf('待') === 0 ? button('签署', 'text', 'sign', 'sign', 'data-contract-id="' + item.id + '"') : '') + button('详情', 'text', 'detail', 'eye', 'data-contract-id="' + item.id + '"') + '</div></td></tr>';
                }).join('')
            +   '</tbody></table></div></section>'
            + '</div>'
            + renderDrawer()
            + renderToast();
        bindEvents();
    }

    function showToast(message) {
        toastText = message;
        render();
        window.clearTimeout(showToast.timer);
        showToast.timer = window.setTimeout(function () { toastText = ''; render(); }, 2400);
    }

    function bindEvents() {
        var search = panel.querySelector('[data-contract-search]');
        var select = panel.querySelector('[data-contract-status]');
        if (search) {
            search.addEventListener('input', function () { keyword = this.value; });
            search.addEventListener('keydown', function (event) { if (event.key === 'Enter') render(); });
        }
        if (select) {
            select.value = statusFilter;
            select.addEventListener('change', function () { statusFilter = this.value; });
        }
        panel.querySelectorAll('[data-contract-action]').forEach(function (control) {
            control.addEventListener('click', function () {
                var action = this.dataset.contractAction;
                if (action === 'search') render();
                else if (action === 'reset') { keyword = ''; statusFilter = '全部状态'; render(); }
                else if (action === 'detail' || action === 'sign') { activeContractId = this.dataset.contractId; drawerMode = action; render(); }
                else if (action === 'close-drawer') { activeContractId = ''; render(); }
                else if (action === 'view-file') showToast('合同附件预览已打开（原型）。');
                else if (action === 'confirm-sign') {
                    var agree = panel.querySelector('[data-contract-agree]');
                    if (!agree || !agree.checked) { showToast('请先确认并勾选合同条款。'); return; }
                    var item = CONTRACTS.find(function (contract) { return contract.id === control.dataset.contractId; });
                    if (item) {
                        if (role === 'supplier') item.supplierStatus = '履约中';
                        else item.buyerStatus = '履约中';
                    }
                    activeContractId = '';
                    showToast('合同已签署，付款计划与结算规则已冻结。');
                }
            });
        });
        var mask = panel.querySelector('[data-contract-drawer-close]');
        if (mask) mask.addEventListener('click', function () { activeContractId = ''; render(); });
    }

    var requestedOrderNo = params.get('orderNo');
    var requestedAction = params.get('contractAction');
    if (requestedOrderNo) {
        var requestedContract = CONTRACTS.find(function (item) { return item.type === businessType && item.orderNo === requestedOrderNo; });
        if (requestedContract) {
            activeContractId = requestedContract.id;
            drawerMode = requestedAction === 'sign' ? 'sign' : 'detail';
        }
    }
    render();
})();
