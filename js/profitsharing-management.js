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
        outTraceNo: 'PSE20260723000001',
        notifyUrl: '由平台系统配置并接收审核结果',
        scene: '01 平台入驻商户应收款、02 平台服务费、05 供应商货款',
        signType: '0（电子签）',
        billPercent: '97.00%',
        billFeeRate: '0.30%',
        billMinFee: '0.10元'
    };

    var CONFIG_FILES = {
        background: '聚合平台分账业务场景说明.pdf',
        statement: '平台近三个月交易单据.pdf',
        cooperation: '平台与供方合作协议示例.pdf',
        agreement: '统一支付分账服务协议.pdf',
        cashflow: '运营方统一收款及资金流转说明.pdf'
    };
    var CONFIG_FILE_IDS = {
        background: 'FSS20260723000101',
        statement: 'FSS20260723000102',
        cooperation: 'FSS20260723000103',
        agreement: 'FSS20260723000104',
        cashflow: 'FSS20260723000105'
    };
    var CONFIG_VIDEO = '分账业务经营场景核验视频.mp4';
    var CONFIG_SUPPLEMENT = '分账业务补充说明.pdf';

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
        { receiverId: 'RCV-202607-00411', merchantId: 'MER2026071500411', name: '龙岗区数据应用创新中心', creditCode: '12440307MB2LG0411X', receiverType: '标准商户', account: '中国工商银行 · 6222 **** 0411', channelCode: '系统匹配', settleType: '0', settleName: '龙岗区数据应用创新中心', settleCardNo: '6222020200000411', bankName: '中国工商银行', bankBranch: '中国工商银行深圳龙岗支行', bankProvince: '4400', bankCity: '4403', alliedBankCode: '102584000041', legalName: '陈志远', legalMobile: '138****0411' },
        { receiverId: 'RCV-202607-00426', merchantId: 'MER2026071500426', name: '深圳市龙岗区产业数字化促进中心', creditCode: '12440307MB2LG0426P', receiverType: '标准商户', account: '中国建设银行 · 6217 **** 0426' },
        { receiverId: 'RCV-202607-00438', merchantId: 'MER2026071500438', name: '龙岗智慧园区运营有限公司', creditCode: '91440300MA5F8LG438', receiverType: '标准商户', account: '中国农业银行 · 6228 **** 0438' },
        { receiverId: 'RCV-202607-00452', merchantId: 'MER2026071500452', name: '深圳市数链科技有限公司', creditCode: '91440300MA5F8LG452', receiverType: '标准商户', account: '招商银行 · 7559 **** 0452' },
        { receiverId: 'RCV-202607-00467', merchantId: 'MER2026071500467', name: '龙岗区企业服务集团有限公司', creditCode: '91440307MA5LG0467Q', receiverType: '标准商户', account: '平安银行 · 1101 **** 0467' },
        { receiverId: 'RCV-202607-00483', merchantId: 'MER2026071500483', name: '深圳市星图数据技术有限公司', creditCode: '91440300MA5F8LG483', receiverType: '标准商户', account: '中国银行 · 6013 **** 0483' },
        { receiverId: 'RCV-202607-00495', merchantId: 'MER2026071500495', name: '深圳市龙岗科创服务有限公司', creditCode: '91440307MA5LG0495M', receiverType: '标准商户', account: '交通银行 · 6222 **** 0495' }
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
            chevronDown: '<path d="m7 10 5 5 5-5"/>',
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
            + '<div><strong>' + escapeHtml(label) + '</strong><small>示例：' + escapeHtml(example) + '</small><p>' + escapeHtml(fileName ? fileName + ' · ' + (CONFIG_FILE_IDS[key] || '文件编号已生成') : '暂未上传') + '</p></div>'
            + (readonly ? '' : '<label><span>' + (fileName ? '替换' : '上传') + '</span><input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" data-config-upload="' + key + '"></label>')
            + '</div>';
    }

    function renderConfigVideo(readonly) {
        return '<div class="profit-config-file' + (CONFIG_VIDEO ? ' has-file' : '') + '">'
            + '<span class="profit-config-file-icon">' + icon('upload') + '</span>'
            + '<div><strong>经营场景核验视频</strong><small>可选；连续展示营业执照和收银场景</small><p>' + escapeHtml(CONFIG_VIDEO ? CONFIG_VIDEO + ' · FSS20260723000107' : '暂未上传') + '</p></div>'
            + (readonly ? '' : '<label><span>' + (CONFIG_VIDEO ? '替换' : '上传') + '</span><input type="file" accept="video/*,.mp4,.mov" data-config-video></label>')
            + '</div>';
    }

    function renderConfigSupplement(readonly) {
        return '<div class="profit-config-file' + (CONFIG_SUPPLEMENT ? ' has-file' : '') + '">'
            + '<span class="profit-config-file-icon">' + icon('upload') + '</span>'
            + '<div><strong>补充材料</strong><small>选填；上传后记录文件编号</small><p>' + escapeHtml(CONFIG_SUPPLEMENT ? CONFIG_SUPPLEMENT + ' · FSS20260723000106' : '暂未上传') + '</p></div>'
            + (readonly ? '' : '<label><span>' + (CONFIG_SUPPLEMENT ? '替换' : '上传') + '</span><input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" data-config-supplement></label>')
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
            + '<label><span>申请流水号</span><input value="' + escapeHtml(OPERATOR.outTraceNo) + '" readonly><small>每次申请唯一，由系统生成</small></label>'
            + '<label class="is-wide"><span>审核结果通知</span><input value="' + escapeHtml(OPERATOR.notifyUrl) + '" readonly><small>回调地址由系统统一维护</small></label>'
            + '<div class="profit-form-field is-wide"><span>分账业务场景 <b>*</b></span><div class="profit-scene-options">'
            +   '<label><input type="checkbox" name="scene" value="01" checked' + (readonly ? ' disabled' : '') + '><span>01 平台入驻商户应收款</span></label>'
            +   '<label><input type="checkbox" name="scene" value="02" checked' + (readonly ? ' disabled' : '') + '><span>02 平台服务费</span></label>'
            +   '<label><input type="checkbox" name="scene" value="05" checked' + (readonly ? ' disabled' : '') + '><span>05 供应商货款</span></label>'
            +   '<label><input type="checkbox" name="scene" value="99"' + (readonly ? ' disabled' : '') + '><span>99 其他</span></label>'
            + '</div></div>'
            + '<label><span>签约方式 <b>*</b></span><select name="signType"' + (readonly ? ' disabled' : '') + '><option value="0" selected>电子签</option><option value="1">纸质签</option></select></label>'
            + '<label><span>最大对外分账比例</span><div class="profit-field-suffix"><input name="billPercent" type="number" min="0.01" max="100" step="0.01" value="97.00"' + (readonly ? ' readonly' : '') + '><i>%</i></div><small>选填，留空按渠道配置执行</small></label>'
            + '<label><span>分账手续费率</span><div class="profit-field-suffix"><input name="billFeeRate" type="number" min="0" max="100" step="0.01" value="0.30"' + (readonly ? ' readonly' : '') + '><i>%</i></div><small>选填，不等同平台服务费</small></label>'
            + '<label><span>最低分账手续费</span><div class="profit-field-suffix"><input name="billMinFee" type="number" min="0" step="0.01" value="0.10"' + (readonly ? ' readonly' : '') + '><i>元</i></div><small>选填，金额单位为元</small></label>'
            + '<label><span>当前状态</span><div class="profit-form-status">' + tag(state.label) + '</div></label>'
            + '</div>'
            + '<div class="profit-config-file-title"><strong>分账业务材料</strong><span>普通文件不超过2MB；核验视频不超过9MB。</span></div>'
            + (configUploadError ? '<div class="profit-form-error">' + escapeHtml(configUploadError) + '</div>' : '')
            + '<div class="profit-config-file-grid">'
            + renderConfigFile('background', '业务背景资料', '业务场景说明.pdf', readonly)
            + renderConfigFile('statement', '平台交易单据', '近三个月交易单据.pdf', readonly)
            + renderConfigFile('cooperation', '供方合作协议', '平台与供方合作协议.pdf', readonly)
            + renderConfigFile('agreement', '分账服务协议', '统一支付分账服务协议.pdf', readonly)
            + renderConfigFile('cashflow', '资金流转说明', '统一收款与分账说明.pdf', readonly)
            + renderConfigSupplement(readonly)
            + renderConfigVideo(readonly)
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
            detailItems.push('<div><span>申请流水号</span><strong>' + escapeHtml(OPERATOR.outTraceNo) + '</strong></div>');
            detailItems.push('<div><span>签约方式</span><strong>' + escapeHtml(OPERATOR.signType) + '</strong></div>');
            detailItems.push('<div><span>分账手续费率</span><strong>' + escapeHtml(OPERATOR.billFeeRate) + '</strong></div>');
            detailItems.push('<div><span>最低分账手续费</span><strong>' + escapeHtml(OPERATOR.billMinFee) + '</strong></div>');
            detailItems.push('<div><span>审核结果通知</span><strong>' + escapeHtml(OPERATOR.notifyUrl) + '</strong></div>');
        }
        detailItems.push('<div><span>' + (splitApplyAuditStatus === null ? '申请状态' : '审核状态') + '</span>' + tag(state.label) + '</div>');
        var inlineFiles = splitApplyAuditStatus !== null
            ? '<div class="profit-config-inline-files"><div class="profit-config-file-title"><strong>分账业务材料</strong><span>本次分账开通申请附件</span></div><div class="profit-config-file-grid">'
                + renderConfigFile('background', '业务背景资料', '业务场景说明.pdf', true)
                + renderConfigFile('statement', '平台交易单据', '近三个月交易单据.pdf', true)
                + renderConfigFile('cooperation', '供方合作协议', '平台与供方合作协议.pdf', true)
                + renderConfigFile('agreement', '分账服务协议', '统一支付分账服务协议.pdf', true)
                + renderConfigFile('cashflow', '资金流转说明', '统一收款与分账说明.pdf', true)
                + renderConfigSupplement(true)
                + renderConfigVideo(true)
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

    function getReceiverProfile(item) {
        if (!item) return null;
        return Object.assign({
            channelCode: '系统匹配',
            settleType: '0',
            settleName: item.name,
            settleCardNo: '440501010000' + String(item.merchantId || '').slice(-4),
            bankName: String(item.account || '').split(' · ')[0] || '中国农业银行',
            bankBranch: '开户银行深圳分行营业部',
            bankProvince: '4400',
            bankCity: '4403',
            alliedBankCode: '103584000015',
            legalName: '已同步法人信息',
            legalMobile: '138****3501'
        }, item);
    }

    function renderReceiverCandidateCombobox(candidate) {
        var selectedLabel = candidate.name + '（' + candidate.merchantId + '）';
        return ''
            + '<div class="profit-merchant-combobox is-wide" data-receiver-combobox>'
            +   '<span class="profit-merchant-combobox-label">选择供方商户 <b>*</b></span>'
            +   '<input type="hidden" name="merchantId" value="' + escapeHtml(candidate.merchantId) + '">'
            +   '<div class="profit-merchant-combobox-control">'
            +       icon('search')
            +       '<input type="search" value="' + escapeHtml(selectedLabel) + '" placeholder="搜索供方名称或商户编号" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="receiverCandidateList" aria-autocomplete="list" data-receiver-candidate-search>'
            +       '<button type="button" aria-label="展开供方商户列表" data-receiver-candidate-toggle>' + icon('chevronDown') + '</button>'
            +   '</div>'
            +   '<div class="profit-merchant-options" id="receiverCandidateList" role="listbox">'
            +       RECEIVER_CANDIDATES.map(function (item) {
                        var selected = item.merchantId === candidate.merchantId;
                        var searchable = [item.name, item.merchantId, item.creditCode].join(' ').toLowerCase();
                        return '<button class="profit-merchant-option' + (selected ? ' selected' : '') + '" type="button" role="option" aria-selected="' + selected + '" data-receiver-candidate-option="' + escapeHtml(item.merchantId) + '" data-receiver-candidate-search-text="' + escapeHtml(searchable) + '">'
                            + '<span><strong>' + escapeHtml(item.name) + '</strong><small>' + escapeHtml(item.merchantId) + '</small></span>'
                            + '<em>' + escapeHtml(item.account) + '</em>'
                            + (selected ? icon('check') : '')
                            + '</button>';
                    }).join('')
            +       '<div class="profit-merchant-empty" data-receiver-candidate-empty hidden>未找到匹配的供方商户</div>'
            +   '</div>'
            +   '<small class="profit-merchant-combobox-hint">支持按供方名称、商户编号或统一社会信用代码搜索</small>'
            + '</div>';
    }

    function renderReceiverAddModal() {
        if (!receiverAddOpen) return '';
        var retryItem = receiverAddTargetId ? RECEIVERS.find(function (item) { return item.receiverId === receiverAddTargetId; }) : null;
        var isRetry = !!retryItem;
        var candidate = getReceiverProfile(retryItem || getSelectedReceiverCandidate());
        if (!candidate) {
            return '<div class="profit-modal-mask" data-profit-modal-close><div class="profit-modal"><header><div><h2>添加分账接收方</h2><p>当前没有符合条件的第三方供方商户。</p></div><button type="button" data-profit-action="close-receiver-add" aria-label="关闭">' + icon('close') + '</button></header><div class="profit-modal-body"><div class="profit-empty">供方中心暂无结算账户已确认且尚未添加的第三方供方</div></div><footer>' + button('关闭', '', 'close-receiver-add', 'close') + '</footer></div></div>';
        }
        var merchantField = isRetry
            ? '<label class="is-wide"><span>供方商户</span><input value="' + escapeHtml(candidate.name + '（' + candidate.merchantId + '）') + '" readonly></label>'
            : renderReceiverCandidateCombobox(candidate);
        return '<div class="profit-modal-mask" data-profit-modal-close><form class="profit-modal" data-receiver-add-form>'
            + '<header><div><h2>' + (isRetry ? '重新添加分账接收方' : '添加分账接收方') + '</h2><p>' + (isRetry ? '确认供方商户和结算信息后重新提交。' : '从供方中心选择尚未发起添加的第三方供方商户。') + '</p></div><button type="button" data-profit-action="close-receiver-add" aria-label="关闭">' + icon('close') + '</button></header>'
            + '<div class="profit-modal-body"><div class="profit-form-grid">'
            + merchantField
            + '<label><span>供方名称</span><input value="' + escapeHtml(candidate.name) + '" readonly></label>'
            + '<label><span>统一社会信用代码</span><input value="' + escapeHtml(candidate.creditCode) + '" readonly></label>'
            + '<label><span>接收方类型</span><input value="' + escapeHtml(candidate.receiverType) + '" readonly></label>'
            + '<label><span>分账收款账户</span><input value="' + escapeHtml(candidate.account) + '" readonly></label>'
            + '<label><span>渠道编码</span><input value="' + escapeHtml(candidate.channelCode) + '" readonly><small>由支付渠道配置同步</small></label>'
            + '<label><span>账户类型</span><input value="' + (candidate.settleType === '0' ? '对公账户' : '对私账户') + '" readonly></label>'
            + '<label><span>结算户名</span><input value="' + escapeHtml(candidate.settleName) + '" readonly></label>'
            + '<label><span>结算账号</span><input value="' + escapeHtml(candidate.settleCardNo) + '" readonly></label>'
            + '<label><span>开户银行</span><input value="' + escapeHtml(candidate.bankName) + '" readonly></label>'
            + '<label><span>开户支行</span><input value="' + escapeHtml(candidate.bankBranch) + '" readonly></label>'
            + '<label><span>开户地区编码</span><input value="' + escapeHtml(candidate.bankProvince + '／' + candidate.bankCity) + '" readonly></label>'
            + '<label><span>联行号</span><input value="' + escapeHtml(candidate.alliedBankCode) + '" readonly></label>'
            + '<label><span>法人姓名</span><input value="' + escapeHtml(candidate.legalName) + '" readonly></label>'
            + '<label><span>法人手机号</span><input value="' + escapeHtml(candidate.legalMobile) + '" readonly></label>'
            + '</div><div class="profit-form-note">' + icon('info') + '<p>' + (isRetry ? '重新提交后，审核状态将更新为正在审核。' : '仅可选择供方中心已有、结算账户已确认且从未发起添加的第三方供方商户；接收方类型固定为标准商户。') + '</p></div></div>'
            + '<footer>' + button('取消', '', 'close-receiver-add', 'close') + '<button class="profit-btn primary" type="submit">' + icon('check') + '<span>' + (isRetry ? '确认重新添加' : '确认添加') + '</span></button></footer></form></div>';
    }

    function getActiveReceiver() {
        return RECEIVERS.find(function (item) { return item.receiverId === drawerReceiverId || item.merchantId === drawerReceiverId; });
    }

    function renderReceiverDrawer() {
        var item = getReceiverProfile(getActiveReceiver());
        if (!item) return '';
        return '<div class="profit-drawer-mask" data-profit-drawer-close></div><aside class="profit-drawer" role="dialog" aria-modal="true" aria-labelledby="receiverDrawerTitle">'
            + '<header><div><h2 id="receiverDrawerTitle">分账接收方详情</h2><p>' + item.name + '</p></div><button type="button" data-profit-action="close-drawer" aria-label="关闭">' + icon('close') + '</button></header>'
            + '<div class="profit-drawer-body"><section><h3>接收方信息</h3><div class="profit-detail-grid">'
            + '<div><span>供方商户编号</span><strong>' + item.merchantId + '</strong></div><div><span>接收方编号</span><strong>' + item.receiverId + '</strong></div>'
            + '<div><span>接收方类型</span><strong>' + item.receiverType + '</strong></div><div><span>申请时间</span><strong>' + item.createdAt + '</strong></div>'
            + '<div><span>统一社会信用代码</span><strong>' + item.creditCode + '</strong></div><div><span>审核状态</span>' + tag(RECEIVER_AUDIT_LABELS[item.status]) + '</div>'
            + '<div><span>渠道编码</span><strong>' + item.channelCode + '</strong></div><div><span>账户类型</span><strong>' + (item.settleType === '0' ? '对公账户' : '对私账户') + '</strong></div></div></section>'
            + '<section><h3>结算信息</h3><div class="profit-detail-grid"><div><span>结算户名</span><strong>' + item.settleName + '</strong></div><div><span>结算账号</span><strong>' + item.settleCardNo + '</strong></div><div><span>开户银行</span><strong>' + item.bankName + '</strong></div><div><span>开户支行</span><strong>' + item.bankBranch + '</strong></div><div><span>开户地区编码</span><strong>' + item.bankProvince + '／' + item.bankCity + '</strong></div><div><span>联行号</span><strong>' + item.alliedBankCode + '</strong></div><div><span>法人姓名</span><strong>' + item.legalName + '</strong></div><div><span>法人手机号</span><strong>' + item.legalMobile + '</strong></div></div><div class="profit-receiver-card"><span>供方分账收款账户</span><strong>' + item.account + '</strong><p>接收方资料由已审核的供方商户和结算账户同步，页面仅核对，不重复录入。</p></div></section>'
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

        var receiverCombobox = page.querySelector('[data-receiver-combobox]');
        var receiverCandidateSearch = page.querySelector('[data-receiver-candidate-search]');
        var receiverCandidateToggle = page.querySelector('[data-receiver-candidate-toggle]');
        var receiverCandidateOptions = Array.prototype.slice.call(page.querySelectorAll('[data-receiver-candidate-option]'));

        function setReceiverComboboxOpen(open) {
            if (!receiverCombobox || !receiverCandidateSearch) return;
            receiverCombobox.classList.toggle('is-open', open);
            receiverCandidateSearch.setAttribute('aria-expanded', String(open));
            if (!open) {
                receiverCandidateOptions.forEach(function (option) { option.classList.remove('is-keyboard-active'); });
            }
        }

        function filterReceiverCandidates(value) {
            var keyword = String(value || '').trim().toLowerCase();
            var visibleCount = 0;
            receiverCandidateOptions.forEach(function (option) {
                var visible = !keyword || String(option.dataset.receiverCandidateSearchText || '').indexOf(keyword) >= 0;
                option.hidden = !visible;
                option.classList.remove('is-keyboard-active');
                if (visible) visibleCount += 1;
            });
            var empty = page.querySelector('[data-receiver-candidate-empty]');
            if (empty) empty.hidden = visibleCount > 0;
        }

        if (receiverCandidateSearch) {
            receiverCandidateSearch.addEventListener('focus', function () {
                setReceiverComboboxOpen(true);
                filterReceiverCandidates('');
                this.select();
            });
            receiverCandidateSearch.addEventListener('input', function () {
                setReceiverComboboxOpen(true);
                filterReceiverCandidates(this.value);
            });
            receiverCandidateSearch.addEventListener('keydown', function (event) {
                var visibleOptions = receiverCandidateOptions.filter(function (option) { return !option.hidden; });
                var activeIndex = visibleOptions.findIndex(function (option) { return option.classList.contains('is-keyboard-active'); });
                if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    setReceiverComboboxOpen(true);
                    if (!visibleOptions.length) return;
                    activeIndex = event.key === 'ArrowDown'
                        ? (activeIndex + 1) % visibleOptions.length
                        : (activeIndex <= 0 ? visibleOptions.length - 1 : activeIndex - 1);
                    visibleOptions.forEach(function (option) { option.classList.remove('is-keyboard-active'); });
                    visibleOptions[activeIndex].classList.add('is-keyboard-active');
                    visibleOptions[activeIndex].scrollIntoView({ block: 'nearest' });
                } else if (event.key === 'Enter' && visibleOptions.length) {
                    event.preventDefault();
                    (activeIndex >= 0 ? visibleOptions[activeIndex] : visibleOptions[0]).click();
                } else if (event.key === 'Escape') {
                    event.preventDefault();
                    setReceiverComboboxOpen(false);
                }
            });
        }
        if (receiverCandidateToggle) receiverCandidateToggle.addEventListener('click', function () {
            var open = !receiverCombobox.classList.contains('is-open');
            setReceiverComboboxOpen(open);
            if (open) {
                filterReceiverCandidates('');
                receiverCandidateSearch.focus();
            }
        });
        receiverCandidateOptions.forEach(function (option) {
            option.addEventListener('click', function () {
                selectedReceiverCandidateId = this.dataset.receiverCandidateOption;
                render();
            });
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
            RECEIVERS.unshift(Object.assign({}, candidate, {
                status: '0',
                createdAt: '2026-07-22 14:26:18'
            }));
            RECEIVER_CANDIDATES.splice(candidateIndex, 1);
            selectedReceiverCandidateId = RECEIVER_CANDIDATES.length ? RECEIVER_CANDIDATES[0].merchantId : '';
            receiverAddOpen = false;
            showToast('分账接收方已提交，当前审核状态为正在审核。');
        });

        var configForm = page.querySelector('[data-profit-config-form]');
        if (configForm) configForm.addEventListener('submit', function (event) {
            event.preventDefault();
            if (!configForm.reportValidity()) return;
            if (!configForm.querySelector('input[name="scene"]:checked')) {
                configUploadError = '请至少选择一个分账业务场景。';
                render();
                return;
            }
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
                else if (file.size > 2 * 1024 * 1024) configUploadError = '普通分账业务材料不能超过2MB。';
                else {
                    CONFIG_FILES[this.dataset.configUpload] = file.name;
                    CONFIG_FILE_IDS[this.dataset.configUpload] = 'FSS' + String(Date.now()).slice(-14);
                    configUploadError = '';
                }
                render();
            });
        });
        var configVideoInput = page.querySelector('[data-config-video]');
        if (configVideoInput) configVideoInput.addEventListener('change', function () {
            var file = this.files && this.files[0];
            if (!file) return;
            if (file.size > 9 * 1024 * 1024) configUploadError = '经营场景核验视频不能超过9MB。';
            else { CONFIG_VIDEO = file.name; configUploadError = ''; }
            render();
        });
        var configSupplementInput = page.querySelector('[data-config-supplement]');
        if (configSupplementInput) configSupplementInput.addEventListener('change', function () {
            var file = this.files && this.files[0];
            if (!file) return;
            if (file.size > 2 * 1024 * 1024) configUploadError = '分账补充材料不能超过2MB。';
            else { CONFIG_SUPPLEMENT = file.name; configUploadError = ''; }
            render();
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
        if (modal) modal.addEventListener('click', function (event) {
            event.stopPropagation();
            if (receiverCombobox && !event.target.closest('[data-receiver-combobox]')) setReceiverComboboxOpen(false);
        });
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
