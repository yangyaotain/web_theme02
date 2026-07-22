(function () {
    'use strict';

    var page = document.querySelector('[data-profit-admin-page]');
    if (!page) return;

    var pageType = page.dataset.profitAdminPage;
    var query = '';
    var statusFilter = '全部状态';
    var sceneFilter = '全部业务类型';
    var modalState = null;
    var configOpen = false;
    var splitApplyAuditStatus = null;
    var drawerReceiverId = '';
    var receiverAddOpen = false;
    var receiverAddTargetId = '';
    var selectedReceiverCandidateId = 'MER2026071500411';
    var toastText = '';
    var configUploadError = '';

    var OPERATOR = {
        merchantId: 'MER-PLATFORM-202607-0001',
        name: '深圳市龙岗区数据要素交易服务有限公司',
        creditCode: '91440307MA5LG20261',
        scene: '平台入驻商户应收款、平台方服务费、供应商货款',
        billPercent: '97.00%'
    };

    var CONFIG_FILES = {
        background: '聚合平台分账业务场景说明.pdf',
        statement: '平台近三个月交易单据.pdf',
        cooperation: '平台与供方合作协议示例.pdf',
        agreement: '统一支付分账服务协议.pdf',
        cashflow: '运营方统一收款及资金流转说明.pdf'
    };

    var SPLIT_APPLY_AUDIT_STATES = {
        '0': {
            label: '正在审核',
            tone: 'warning',
            icon: 'refresh',
            title: '分账开通申请正在审核',
            description: '申请资料已提交，当前审核状态为正在审核。'
        },
        '1': {
            label: '审核成功',
            tone: 'success',
            icon: 'check',
            title: '运营方分账能力已开通',
            description: '分账开通申请审核成功，运营方可为符合条件的第三方订单发起分账。'
        },
        '2': {
            label: '审核驳回',
            tone: 'danger',
            icon: 'info',
            title: '分账开通申请审核驳回',
            description: '当前审核状态为审核驳回，可修改申请资料后重新发起申请。'
        },
        '3': {
            label: '审核拒绝',
            tone: 'danger',
            icon: 'info',
            title: '分账开通申请审核拒绝',
            description: '当前审核状态为审核拒绝，可修改申请资料后重新发起申请。'
        }
    };

    var SPLIT_APPLY_EMPTY_STATE = {
        label: '未申请',
        tone: 'neutral',
        icon: 'info',
        title: '尚未提交分账开通申请',
        description: '当前没有分账开通申请记录，请在本页提交申请。'
    };

    var RULES = [
        { id: 'PSR-202607-001', name: '数据资源订单-平台服务费', businessType: '数据资源', mode: 'P', value: 3, effectiveAt: '2026-07-22', updatedAt: '2026-07-22 10:18:36' },
        { id: 'PSR-202607-002', name: '数据产品订单-平台服务费', businessType: '数据产品', mode: 'P', value: 3, effectiveAt: '2026-07-22', updatedAt: '2026-07-22 10:26:15' },
        { id: 'PSR-202607-003', name: '数据咨询服务订单-平台服务费', businessType: '数据咨询服务', mode: 'P', value: 3, effectiveAt: '2026-07-22', updatedAt: '2026-07-22 10:34:48' },
        { id: 'PSR-202607-004', name: '行业解决方案订单-平台服务费', businessType: '行业解决方案', mode: 'P', value: 3, effectiveAt: '2026-07-22', updatedAt: '2026-07-22 10:41:27' }
    ];

    var RECEIVERS = [
        { receiverId: 'RCV-202607-00986', merchantId: 'MER2026072100986', name: '深圳市龙岗数智科技有限公司', creditCode: '91440300MA5F8LG001', receiverType: '标准商户', account: '中国农业银行 · 4405 **** 12345', status: '1', createdAt: '2026-07-22 09:18:36' },
        { receiverId: 'RCV-202607-00762', merchantId: 'MER2026071800762', name: '龙岗数智产业研究院有限公司', creditCode: '91440300MA5F8LG762', receiverType: '标准商户', account: '中国建设银行 · 6217 **** 0762', status: '0', createdAt: '2026-07-19 11:06:22' },
        { receiverId: 'RCV-202607-00655', merchantId: 'MER2026071700655', name: '深圳市龙数数据技术有限公司', creditCode: '91440300MA5F8LG655', receiverType: '标准商户', account: '招商银行 · 7559 **** 0655', status: '2', createdAt: '2026-07-18 15:26:11' },
        { receiverId: 'RCV-202607-00528', merchantId: 'MER2026071600528', name: '深圳龙岗科创金融服务有限公司', creditCode: '91440300MA5F8LG528', receiverType: '标准商户', account: '平安银行 · 1101 **** 0528', status: '3', createdAt: '2026-07-17 14:08:29' }
    ];

    var RECEIVER_CANDIDATES = [
        { receiverId: 'RCV-202607-00411', merchantId: 'MER2026071500411', name: '龙岗区数据应用创新中心', creditCode: '12440307MB2LG0411X', receiverType: '标准商户', account: '中国工商银行 · 6222 **** 0411' }
    ];

    var RECEIVER_AUDIT_LABELS = {
        '0': '正在审核',
        '1': '审核成功',
        '2': '审核驳回',
        '3': '审核拒绝'
    };

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
        });
    }

    function icon(name) {
        var paths = {
            add: '<path d="M12 5v14M5 12h14"/>',
            edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"/>',
            eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
            refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
            search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
            close: '<path d="M6 6l12 12M18 6 6 18"/>',
            check: '<path d="m5 12 4 4L19 6"/>',
            info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
            upload: '<path d="M12 16V4m0 0L7 9m5-5 5 5"/><path d="M5 20h14"/>',
            link: '<path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1-1"/>'
        };
        return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (paths[name] || paths.info) + '</svg>';
    }

    function button(label, style, action, iconName, attrs) {
        return '<button class="profit-btn ' + (style || '') + '" type="button" data-profit-action="' + action + '" ' + (attrs || '') + '>' + icon(iconName) + '<span>' + label + '</span></button>';
    }

    function tag(status) {
        var type = ['启用', '已开通', '审核成功'].indexOf(status) >= 0 ? 'success'
            : ['停用', '未添加', '未开通'].indexOf(status) >= 0 ? 'neutral'
                : status === '草稿' ? 'info'
                    : status === '正在审核' ? 'warning' : 'danger';
        return '<span class="profit-status ' + type + '"><i></i>' + escapeHtml(status) + '</span>';
    }

    function renderSummary(items, compact) {
        return '<section class="profit-summary-grid' + (compact ? ' is-compact' : '') + '">' + items.map(function (item) {
            return '<div><span>' + escapeHtml(item[0]) + '</span><strong>' + escapeHtml(item[1]) + '</strong><small>' + escapeHtml(item[2]) + '</small></div>';
        }).join('') + '</section>';
    }

    function renderHead(title, description, actionHtml) {
        return '<header class="profit-page-head"><div><h1>' + title + '</h1><p>' + description + '</p></div><div>' + (actionHtml || '') + '</div></header>';
    }

    function renderToast() {
        return toastText ? '<div class="profit-toast" role="status">' + icon('check') + '<span>' + escapeHtml(toastText) + '</span></div>' : '';
    }

    function showToast(message) {
        toastText = message;
        render();
        window.clearTimeout(showToast.timer);
        showToast.timer = window.setTimeout(function () {
            toastText = '';
            render();
        }, 2400);
    }

    function getSplitApplyAuditState() {
        return splitApplyAuditStatus == null ? SPLIT_APPLY_EMPTY_STATE : SPLIT_APPLY_AUDIT_STATES[splitApplyAuditStatus];
    }

    function renderConfigFile(key, label, example, readonly) {
        var fileName = CONFIG_FILES[key];
        return '<div class="profit-config-file' + (fileName ? ' has-file' : '') + '">'
            + '<span class="profit-config-file-icon">' + icon('upload') + '</span>'
            + '<div><strong>' + escapeHtml(label) + '</strong><small>示例：' + escapeHtml(example) + '</small><p>' + escapeHtml(fileName || '暂未上传') + '</p></div>'
            + (readonly ? '' : '<label><span>' + (fileName ? '替换' : '上传') + '</span><input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" data-config-upload="' + key + '"></label>')
            + '</div>';
    }

    function renderConfigModal() {
        if (!configOpen) return '';
        var state = getSplitApplyAuditState();
        var canResubmit = splitApplyAuditStatus === '2' || splitApplyAuditStatus === '3';
        var readonly = splitApplyAuditStatus !== null && !canResubmit;
        var modalTitle = splitApplyAuditStatus === null ? '申请开通分账' : canResubmit ? '重新发起分账开通申请' : '分账开通申请资料';
        var footer = readonly
            ? button('关闭', '', 'close-config', 'close')
            : button('取消', '', 'close-config', 'close') + '<button class="profit-btn primary" type="submit">' + icon('check') + '<span>' + (canResubmit ? '重新提交申请' : '提交开通申请') + '</span></button>';
        return '<div class="profit-modal-mask" data-profit-modal-close><form class="profit-modal profit-config-modal" data-profit-config-form>'
            + '<header><div><h2>' + modalTitle + '</h2><p>填写运营方业务信息并上传开通材料，提交后进入正在审核状态。</p></div><button type="button" data-profit-action="close-config" aria-label="关闭">' + icon('close') + '</button></header>'
            + '<div class="profit-modal-body">'
            + '<div class="profit-form-grid">'
            + '<label><span>运营方商户</span><input value="' + escapeHtml(OPERATOR.name) + '" readonly></label>'
            + '<label><span>商户编号</span><input value="' + escapeHtml(OPERATOR.merchantId) + '" readonly></label>'
            + '<label><span>统一社会信用代码</span><input value="' + escapeHtml(OPERATOR.creditCode) + '" readonly></label>'
            + '<label><span>分账业务场景 <b>*</b></span><input name="businessScene" value="平台服务费、供应商货款"' + (readonly ? ' readonly' : '') + ' required></label>'
            + '<label><span>最大对外分账比例 <b>*</b></span><div class="profit-field-suffix"><input name="billPercent" type="number" min="0.01" max="100" step="0.01" value="97.00"' + (readonly ? ' readonly' : '') + ' required><i>%</i></div></label>'
            + '<label><span>当前状态</span><div class="profit-form-status">' + tag(state.label) + '</div></label>'
            + '</div>'
            + '<div class="profit-config-file-title"><strong>分账业务材料</strong><span>支持 PDF、Word、JPG、PNG，单个文件不超过10MB。</span></div>'
            + (configUploadError ? '<div class="profit-form-error">' + escapeHtml(configUploadError) + '</div>' : '')
            + '<div class="profit-config-file-grid">'
            + renderConfigFile('background', '业务背景资料', '业务场景说明.pdf', readonly)
            + renderConfigFile('statement', '平台交易单据', '近三个月交易单据.pdf', readonly)
            + renderConfigFile('cooperation', '供方合作协议', '平台与供方合作协议.pdf', readonly)
            + renderConfigFile('agreement', '分账服务协议', '统一支付分账服务协议.pdf', readonly)
            + renderConfigFile('cashflow', '资金流转说明', '统一收款与分账说明.pdf', readonly)
            + '</div></div>'
            + '<footer>' + footer + '</footer>'
            + '</form></div>';
    }

    function renderConfigStateSimulator() {
        var states = [
            ['0', '0 正在审核', 'refresh'],
            ['1', '1 审核成功', 'check'],
            ['2', '2 审核驳回', 'info'],
            ['3', '3 审核拒绝', 'info']
        ];
        return '<div class="profit-config-simulator"><span>审核状态模拟</span><div>' + states.map(function (item) {
            return button(item[1], 'state' + (splitApplyAuditStatus === item[0] ? ' is-active' : ''), 'set-audit-status', item[2], 'data-audit-status="' + item[0] + '"');
        }).join('') + '</div></div>';
    }

    function renderConfigDetail(state) {
        var auditSuccess = splitApplyAuditStatus === '1';
        var title = auditSuccess ? '生效配置' : splitApplyAuditStatus === null ? '运营方基础信息' : '分账开通申请';
        var description = auditSuccess ? '以下为审核成功后生效的分账配置。' : splitApplyAuditStatus === null ? '当前没有分账开通申请记录。' : '当前申请审核状态：' + state.label + '。';
        var detailItems = [
            '<div><span>运营方商户</span><strong>' + escapeHtml(OPERATOR.name) + '</strong></div>',
            '<div><span>商户编号</span><strong>' + escapeHtml(OPERATOR.merchantId) + '</strong></div>',
            '<div><span>统一社会信用代码</span><strong>' + escapeHtml(OPERATOR.creditCode) + '</strong></div>'
        ];
        if (splitApplyAuditStatus !== null) {
            detailItems.push('<div><span>' + (auditSuccess ? '对外分账比例上限' : '申请对外分账比例') + '</span><strong>' + escapeHtml(OPERATOR.billPercent) + '</strong></div>');
            detailItems.push('<div><span>分账业务场景</span><strong>' + escapeHtml(OPERATOR.scene) + '</strong></div>');
        }
        detailItems.push('<div><span>' + (splitApplyAuditStatus === null ? '申请状态' : '审核状态') + '</span>' + tag(state.label) + '</div>');
        var inlineFiles = splitApplyAuditStatus !== null
            ? '<div class="profit-config-inline-files"><div class="profit-config-file-title"><strong>分账业务材料</strong><span>本次分账开通申请附件</span></div><div class="profit-config-file-grid">'
                + renderConfigFile('background', '业务背景资料', '业务场景说明.pdf', true)
                + renderConfigFile('statement', '平台交易单据', '近三个月交易单据.pdf', true)
                + renderConfigFile('cooperation', '供方合作协议', '平台与供方合作协议.pdf', true)
                + renderConfigFile('agreement', '分账服务协议', '统一支付分账服务协议.pdf', true)
                + renderConfigFile('cashflow', '资金流转说明', '统一收款与分账说明.pdf', true)
                + '</div></div>'
            : '';
        return '<section class="profit-table-card profit-config-card"><div class="profit-section-title"><div><h3>' + title + '</h3><p>' + description + '</p></div></div><div class="profit-detail-grid">'
            + detailItems.join('') + '</div>' + inlineFiles + '</section>';
    }

    function renderConfig() {
        var state = getSplitApplyAuditState();
        var auditSuccess = splitApplyAuditStatus === '1';
        var businessAction = splitApplyAuditStatus === null
            ? button('申请开通分账', 'primary', 'open-config', 'edit')
            : splitApplyAuditStatus === '2' || splitApplyAuditStatus === '3'
                ? button('重新发起申请', 'primary', 'open-config', 'edit')
                : '';
        var headActions = renderConfigStateSimulator() + businessAction;
        var summaryItems = auditSuccess
            ? [['分账主体', '1 个', '平台运营方商户'], ['审核状态', state.label, '分账能力已开通'], ['对外分账比例上限', OPERATOR.billPercent, '以开通配置为准'], ['审核成功接收方', String(RECEIVERS.filter(function (item) { return item.status === '1'; }).length) + ' 个', '可参与订单分账']]
            : [['分账主体', '1 个', '平台运营方商户'], [splitApplyAuditStatus === null ? '申请状态' : '审核状态', state.label, splitApplyAuditStatus === null ? '尚未提交开通申请' : '当前不可发起分账']];
        page.innerHTML = renderHead('分账基础配置', '运营方作为统一收款商户和分账方，在本页提交申请并查看审核状态。', headActions)
            + renderSummary(summaryItems, !auditSuccess)
            + '<section class="profit-config-hero is-' + state.tone + '"><div class="profit-config-hero-icon">' + icon(state.icon) + '</div><div><span>分账开通申请</span><h2>' + escapeHtml(state.title) + '</h2><p>' + escapeHtml(state.description) + '</p></div>' + tag(state.label) + '</section>'
            + renderConfigDetail(state)
            + '<section class="profit-api-banner">' + icon('info') + '<div><strong>订单处理规则</strong><p>自营产品由运营方全额收款，不发起对外分账；第三方产品仅在运营方分账能力已确认开通、供方已成为有效接收方后，按合同服务费快照计算供方实收金额。</p></div></section>'
            + renderConfigModal() + renderToast();
        bindEvents();
    }

    function renderFilters() {
        return '<section class="profit-filter-card is-simple">'
            + '<label class="profit-search">' + icon('search') + '<input type="search" placeholder="搜索配置名称或编号" value="' + escapeHtml(query) + '" data-profit-search></label>'
            + '<select data-profit-scene aria-label="业务类型"><option>全部业务类型</option><option>数据资源</option><option>数据产品</option><option>数据咨询服务</option><option>行业解决方案</option></select>'
            + button('查询', 'primary', 'search', 'search') + button('重置', '', 'reset', 'refresh') + '</section>';
    }

    function ruleAmount(rule) {
        return rule.mode === 'P' ? rule.value.toFixed(2) + '%' : '¥' + rule.value.toFixed(2) + '/笔';
    }

    function filteredRules() {
        var keyword = query.trim().toLowerCase();
        return RULES.filter(function (rule) {
            return (!keyword || [rule.id, rule.name].join(' ').toLowerCase().indexOf(keyword) >= 0)
                && (sceneFilter === '全部业务类型' || rule.businessType === sceneFilter);
        });
    }

    function renderRules() {
        var records = filteredRules();
        page.innerHTML = renderHead('平台服务费规则', '维护四类订单的全局平台服务费配置，合同签订时自动带入并冻结。')
            + renderSummary([['配置总数', String(RULES.length), '覆盖四类交易订单'], ['配置方式', '全局', '按订单业务类型匹配'], ['默认服务费', '3.00%', '从供方应收款中扣除'], ['经营属性', '第三方', '自营订单不收取']])
            + '<section class="profit-api-banner">' + icon('info') + '<div><strong>配置说明</strong><p>每类订单使用对应的全局服务费配置；需方按合同金额付款，运营方保留平台服务费，剩余金额分账给供方。</p></div></section>'
            + renderFilters()
            + '<section class="profit-table-card"><div class="profit-table-meta"><span>共 <strong>' + records.length + '</strong> 项配置</span><span>固定配置仅支持编辑维护</span></div><div class="profit-table-scroll"><table><thead><tr><th>配置编号 / 名称</th><th>业务类型</th><th>平台服务费</th><th>生效日期</th><th>操作</th></tr></thead><tbody>'
            + (records.length ? records.map(function (rule) {
                return '<tr><td><strong>' + escapeHtml(rule.name) + '</strong><small>' + rule.id + '</small></td><td>' + rule.businessType + '</td><td><strong class="profit-money">' + ruleAmount(rule) + '</strong><small>' + (rule.mode === 'P' ? '按每期实付金额比例' : '按笔固定收取') + '</small></td><td>' + rule.effectiveAt + '<small>更新：' + rule.updatedAt + '</small></td><td><div class="profit-row-actions">' + button('编辑', 'text', 'edit-rule', 'edit', 'data-rule-id="' + rule.id + '"') + '</div></td></tr>';
            }).join('') : '<tr><td colspan="5"><div class="profit-empty">未找到符合条件的平台服务费配置</div></td></tr>')
            + '</tbody></table></div></section>' + renderRuleModal() + renderToast();
        bindEvents();
    }

    function renderRuleModal() {
        if (!modalState) return '';
        var rule = modalState.rule;
        return '<div class="profit-modal-mask" data-profit-modal-close><form class="profit-modal" data-profit-rule-form>'
            + '<header><div><h2>编辑平台服务费配置</h2><p>配置名称和业务类型固定，合同签署后不随配置变更。</p></div><button type="button" data-profit-action="close-modal" aria-label="关闭">' + icon('close') + '</button></header>'
            + '<div class="profit-modal-body"><div class="profit-form-grid">'
            + '<label><span>配置编号</span><input value="' + escapeHtml(rule.id) + '" readonly></label>'
            + '<label><span>配置名称</span><input value="' + escapeHtml(rule.name) + '" readonly></label>'
            + '<label><span>业务类型</span><input value="' + escapeHtml(rule.businessType) + '" readonly></label>'
            + '<label><span>计费方式 <b>*</b></span><select name="mode"><option value="P"' + (rule.mode === 'P' ? ' selected' : '') + '>按实付金额比例</option><option value="G"' + (rule.mode === 'G' ? ' selected' : '') + '>按笔固定金额</option></select></label>'
            + '<label><span>服务费数值 <b>*</b></span><div class="profit-field-suffix"><input name="ruleValue" type="number" min="0.01" step="0.01" value="' + rule.value + '" required><i data-rule-unit>' + (rule.mode === 'P' ? '%' : '元') + '</i></div><small>平台从供方本期应收款中保留该费用</small></label>'
            + '<label><span>生效日期 <b>*</b></span><input name="effectiveAt" type="date" value="' + rule.effectiveAt + '" required></label>'
            + '<label class="is-wide"><span>规则说明</span><textarea maxlength="200">运营方从每一期实付金额中保留平台服务费，剩余金额自动分账给供方。</textarea></label>'
            + '</div><div class="profit-form-note">' + icon('info') + '<p>规则只适用于其他商户上架的第三方产品和服务，运营方自行上架的自营产品不匹配本规则。</p></div></div>'
            + '<footer>' + button('取消', '', 'close-modal', 'close') + '<button class="profit-btn primary" type="submit">' + icon('check') + '<span>保存规则</span></button></footer></form></div>';
    }

    function filteredReceivers() {
        var keyword = query.trim().toLowerCase();
        return RECEIVERS.filter(function (item) {
            return (!keyword || [item.receiverId, item.merchantId, item.name, item.creditCode].join(' ').toLowerCase().indexOf(keyword) >= 0)
                && (statusFilter === '全部状态' || item.status === statusFilter);
        });
    }

    function renderReceivers() {
        var records = filteredReceivers();
        var addDisabled = RECEIVER_CANDIDATES.length ? '' : 'disabled';
        page.innerHTML = renderHead('分账接收方管理', '从供方中心选择已有第三方供方商户，添加为运营方的分账接收方。', button('添加分账接收方', 'primary', 'add-receiver', 'add', addDisabled))
            + renderSummary([['已发起添加', String(RECEIVERS.length) + ' 个', '均为标准商户'], ['正在审核', String(RECEIVERS.filter(function (item) { return item.status === '0'; }).length) + ' 个', '等待审核结果'], ['审核成功', String(RECEIVERS.filter(function (item) { return item.status === '1'; }).length) + ' 个', '可参与订单分账'], ['需重新添加', String(RECEIVERS.filter(function (item) { return item.status === '2' || item.status === '3'; }).length) + ' 个', '审核驳回或拒绝']])
            + '<section class="profit-api-banner">' + icon('link') + '<div><strong>接收方说明</strong><p>列表展示已经发起添加的接收方及其审核状态；只有审核成功的接收方可以参与订单分账。</p></div></section>'
            + '<section class="profit-filter-card is-simple"><label class="profit-search">' + icon('search') + '<input type="search" placeholder="搜索供方名称、接收方编号或商户编号" value="' + escapeHtml(query) + '" data-profit-search></label><select data-profit-status aria-label="审核状态"><option value="全部状态">全部状态</option><option value="0">正在审核</option><option value="1">审核成功</option><option value="2">审核驳回</option><option value="3">审核拒绝</option></select>' + button('查询', 'primary', 'search', 'search') + button('重置', '', 'reset', 'refresh') + '</section>'
            + '<section class="profit-table-card"><div class="profit-table-meta"><span>共 <strong>' + records.length + '</strong> 个接收方</span><span>审核驳回或拒绝后可重新添加</span></div><div class="profit-table-scroll"><table><thead><tr><th>供方名称 / 商户编号</th><th>接收方编号</th><th>接收方类型</th><th>结算账户</th><th>审核状态</th><th>申请时间</th><th>操作</th></tr></thead><tbody>'
            + records.map(function (item) {
                var retry = item.status === '2' || item.status === '3' ? button('重新添加', 'text', 'retry-receiver', 'refresh', 'data-receiver-id="' + item.receiverId + '"') : '';
                return '<tr><td><strong>' + item.name + '</strong><small>' + item.merchantId + '</small></td><td>' + item.receiverId + '</td><td>' + item.receiverType + '</td><td>' + item.account + '</td><td>' + tag(RECEIVER_AUDIT_LABELS[item.status]) + '</td><td>' + item.createdAt + '</td><td><div class="profit-row-actions">' + button('详情', 'text', 'receiver-detail', 'eye', 'data-receiver-id="' + item.receiverId + '"') + retry + '</div></td></tr>';
            }).join('') + '</tbody></table></div></section>' + renderReceiverAddModal() + renderReceiverDrawer() + renderToast();
        bindEvents();
    }

    function getSelectedReceiverCandidate() {
        return RECEIVER_CANDIDATES.find(function (item) { return item.merchantId === selectedReceiverCandidateId; }) || RECEIVER_CANDIDATES[0];
    }

    function renderReceiverAddModal() {
        if (!receiverAddOpen) return '';
        var retryItem = receiverAddTargetId ? RECEIVERS.find(function (item) { return item.receiverId === receiverAddTargetId; }) : null;
        var isRetry = !!retryItem;
        var candidate = retryItem || getSelectedReceiverCandidate();
        if (!candidate) {
            return '<div class="profit-modal-mask" data-profit-modal-close><div class="profit-modal"><header><div><h2>添加分账接收方</h2><p>当前没有符合条件的第三方供方商户。</p></div><button type="button" data-profit-action="close-receiver-add" aria-label="关闭">' + icon('close') + '</button></header><div class="profit-modal-body"><div class="profit-empty">供方中心暂无结算账户已确认且尚未添加的第三方供方</div></div><footer>' + button('关闭', '', 'close-receiver-add', 'close') + '</footer></div></div>';
        }
        var merchantField = isRetry
            ? '<label class="is-wide"><span>供方商户</span><input value="' + escapeHtml(candidate.name + '（' + candidate.merchantId + '）') + '" readonly></label>'
            : '<label class="is-wide"><span>选择供方商户 <b>*</b></span><select name="merchantId" data-receiver-candidate>' + RECEIVER_CANDIDATES.map(function (item) { return '<option value="' + item.merchantId + '"' + (item.merchantId === candidate.merchantId ? ' selected' : '') + '>' + item.name + '（' + item.merchantId + '）</option>'; }).join('') + '</select></label>';
        return '<div class="profit-modal-mask" data-profit-modal-close><form class="profit-modal" data-receiver-add-form>'
            + '<header><div><h2>' + (isRetry ? '重新添加分账接收方' : '添加分账接收方') + '</h2><p>' + (isRetry ? '确认供方商户和结算信息后重新提交。' : '从供方中心选择尚未发起添加的第三方供方商户。') + '</p></div><button type="button" data-profit-action="close-receiver-add" aria-label="关闭">' + icon('close') + '</button></header>'
            + '<div class="profit-modal-body"><div class="profit-form-grid">'
            + merchantField
            + '<label><span>供方名称</span><input value="' + escapeHtml(candidate.name) + '" readonly></label>'
            + '<label><span>统一社会信用代码</span><input value="' + escapeHtml(candidate.creditCode) + '" readonly></label>'
            + '<label><span>接收方类型</span><input value="' + escapeHtml(candidate.receiverType) + '" readonly></label>'
            + '<label><span>分账收款账户</span><input value="' + escapeHtml(candidate.account) + '" readonly></label>'
            + '</div><div class="profit-form-note">' + icon('info') + '<p>' + (isRetry ? '重新提交后，审核状态将更新为正在审核。' : '仅可选择供方中心已有、结算账户已确认且从未发起添加的第三方供方商户；接收方类型固定为标准商户。') + '</p></div></div>'
            + '<footer>' + button('取消', '', 'close-receiver-add', 'close') + '<button class="profit-btn primary" type="submit">' + icon('check') + '<span>' + (isRetry ? '确认重新添加' : '确认添加') + '</span></button></footer></form></div>';
    }

    function getActiveReceiver() {
        return RECEIVERS.find(function (item) { return item.receiverId === drawerReceiverId || item.merchantId === drawerReceiverId; });
    }

    function renderReceiverDrawer() {
        var item = getActiveReceiver();
        if (!item) return '';
        return '<div class="profit-drawer-mask" data-profit-drawer-close></div><aside class="profit-drawer" role="dialog" aria-modal="true" aria-labelledby="receiverDrawerTitle">'
            + '<header><div><h2 id="receiverDrawerTitle">分账接收方详情</h2><p>' + item.name + '</p></div><button type="button" data-profit-action="close-drawer" aria-label="关闭">' + icon('close') + '</button></header>'
            + '<div class="profit-drawer-body"><section><h3>接收方信息</h3><div class="profit-detail-grid">'
            + '<div><span>供方商户编号</span><strong>' + item.merchantId + '</strong></div><div><span>接收方编号</span><strong>' + item.receiverId + '</strong></div>'
            + '<div><span>接收方类型</span><strong>' + item.receiverType + '</strong></div><div><span>申请时间</span><strong>' + item.createdAt + '</strong></div>'
            + '<div><span>统一社会信用代码</span><strong>' + item.creditCode + '</strong></div><div><span>审核状态</span>' + tag(RECEIVER_AUDIT_LABELS[item.status]) + '</div></div></section>'
            + '<section><h3>结算信息</h3><div class="profit-receiver-card"><span>供方分账收款账户</span><strong>' + item.account + '</strong><p>需方支付款项由运营方统一收取，扣除合同约定的平台服务费后分账至该账户。</p></div></section>'
            + '</div><footer>' + button('关闭', '', 'close-drawer', 'close') + '</footer></aside>';
    }

    function bindEvents() {
        var searchInput = page.querySelector('[data-profit-search]');
        if (searchInput) {
            searchInput.addEventListener('input', function () { query = this.value; });
            searchInput.addEventListener('keydown', function (event) { if (event.key === 'Enter') render(); });
        }
        var scene = page.querySelector('[data-profit-scene]');
        var status = page.querySelector('[data-profit-status]');
        if (scene) { scene.value = sceneFilter; scene.addEventListener('change', function () { sceneFilter = this.value; }); }
        if (status) { status.value = statusFilter; status.addEventListener('change', function () { statusFilter = this.value; }); }

        page.querySelectorAll('[data-profit-action]').forEach(function (control) {
            control.addEventListener('click', function () {
                var action = this.dataset.profitAction;
                if (action === 'search') render();
                else if (action === 'reset') { query = ''; statusFilter = '全部状态'; sceneFilter = '全部业务类型'; render(); }
                else if (action === 'open-config') { configOpen = true; configUploadError = ''; render(); }
                else if (action === 'close-config') { configOpen = false; render(); }
                else if (action === 'set-audit-status') { splitApplyAuditStatus = this.dataset.auditStatus; configOpen = false; render(); }
                else if (action === 'edit-rule') { modalState = { mode: 'edit', rule: RULES.find(function (rule) { return rule.id === control.dataset.ruleId; }) }; render(); }
                else if (action === 'close-modal') { modalState = null; render(); }
                else if (action === 'add-receiver') { receiverAddTargetId = ''; receiverAddOpen = true; selectedReceiverCandidateId = RECEIVER_CANDIDATES.length ? RECEIVER_CANDIDATES[0].merchantId : ''; render(); }
                else if (action === 'retry-receiver') { receiverAddTargetId = this.dataset.receiverId; receiverAddOpen = true; render(); }
                else if (action === 'close-receiver-add') { receiverAddOpen = false; receiverAddTargetId = ''; render(); }
                else if (action === 'receiver-detail') { drawerReceiverId = this.dataset.receiverId; render(); }
                else if (action === 'close-drawer') { drawerReceiverId = ''; render(); }
            });
        });

        var receiverCandidate = page.querySelector('[data-receiver-candidate]');
        if (receiverCandidate) receiverCandidate.addEventListener('change', function () {
            selectedReceiverCandidateId = this.value;
            render();
        });

        var receiverAddForm = page.querySelector('[data-receiver-add-form]');
        if (receiverAddForm) receiverAddForm.addEventListener('submit', function (event) {
            event.preventDefault();
            if (receiverAddTargetId) {
                var retryItem = RECEIVERS.find(function (item) { return item.receiverId === receiverAddTargetId; });
                if (!retryItem || (retryItem.status !== '2' && retryItem.status !== '3')) return;
                retryItem.status = '0';
                retryItem.createdAt = '2026-07-22 14:26:18';
                receiverAddOpen = false;
                receiverAddTargetId = '';
                showToast('分账接收方已重新提交，当前审核状态为正在审核。');
                return;
            }
            var candidateIndex = RECEIVER_CANDIDATES.findIndex(function (item) { return item.merchantId === selectedReceiverCandidateId; });
            if (candidateIndex < 0) return;
            var candidate = RECEIVER_CANDIDATES[candidateIndex];
            RECEIVERS.unshift({
                receiverId: candidate.receiverId,
                merchantId: candidate.merchantId,
                name: candidate.name,
                creditCode: candidate.creditCode,
                receiverType: candidate.receiverType,
                account: candidate.account,
                status: '0',
                createdAt: '2026-07-22 14:26:18'
            });
            RECEIVER_CANDIDATES.splice(candidateIndex, 1);
            selectedReceiverCandidateId = RECEIVER_CANDIDATES.length ? RECEIVER_CANDIDATES[0].merchantId : '';
            receiverAddOpen = false;
            showToast('分账接收方已提交，当前审核状态为正在审核。');
        });

        var configForm = page.querySelector('[data-profit-config-form]');
        if (configForm) configForm.addEventListener('submit', function (event) {
            event.preventDefault();
            if (!configForm.reportValidity()) return;
            var missingMaterial = Object.keys(CONFIG_FILES).some(function (key) { return !CONFIG_FILES[key]; });
            if (missingMaterial) {
                configUploadError = '请上传完整的分账业务材料后再提交申请。';
                render();
                return;
            }
            splitApplyAuditStatus = '0';
            configOpen = false;
            showToast('分账开通申请已提交，当前审核状态为正在审核。');
        });
        page.querySelectorAll('[data-config-upload]').forEach(function (input) {
            input.addEventListener('change', function () {
                var file = this.files && this.files[0];
                if (!file) return;
                if (!/\.(pdf|doc|docx|jpg|jpeg|png)$/i.test(file.name || '')) configUploadError = '材料格式不支持，请上传PDF、Word、JPG或PNG文件。';
                else if (file.size > 10 * 1024 * 1024) configUploadError = '单个分账业务材料不能超过10MB。';
                else { CONFIG_FILES[this.dataset.configUpload] = file.name; configUploadError = ''; }
                render();
            });
        });

        var ruleForm = page.querySelector('[data-profit-rule-form]');
        if (ruleForm) {
            ruleForm.elements.mode.addEventListener('change', function () {
                var unit = ruleForm.querySelector('[data-rule-unit]');
                if (unit) unit.textContent = this.value === 'P' ? '%' : '元';
            });
            ruleForm.addEventListener('submit', function (event) {
                event.preventDefault();
                if (!ruleForm.reportValidity()) return;
                var value = Number(ruleForm.elements.ruleValue.value);
                if (ruleForm.elements.mode.value === 'P' && value > 100) {
                    ruleForm.elements.ruleValue.setCustomValidity('按比例计费不能超过100%。');
                    ruleForm.reportValidity();
                    ruleForm.elements.ruleValue.setCustomValidity('');
                    return;
                }
                if (modalState.rule) {
                    modalState.rule.mode = ruleForm.elements.mode.value;
                    modalState.rule.value = value;
                    modalState.rule.effectiveAt = ruleForm.elements.effectiveAt.value;
                }
                modalState = null;
                showToast('平台服务费配置已保存。');
            });
        }

        var modalMask = page.querySelector('[data-profit-modal-close]');
        var modal = page.querySelector('.profit-modal');
        if (modalMask) modalMask.addEventListener('click', function () { modalState = null; configOpen = false; receiverAddOpen = false; receiverAddTargetId = ''; render(); });
        if (modal) modal.addEventListener('click', function (event) { event.stopPropagation(); });
        var drawerMask = page.querySelector('[data-profit-drawer-close]');
        if (drawerMask) drawerMask.addEventListener('click', function () { drawerReceiverId = ''; render(); });
    }

    function render() {
        if (pageType === 'config') renderConfig();
        else if (pageType === 'rules') renderRules();
        else renderReceivers();
    }

    render();
})();
