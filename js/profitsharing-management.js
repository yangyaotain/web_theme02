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
    var receiverSyncOpen = false;
    var receiverSyncing = false;
    var receiverSyncCompleted = false;
    var receiverPage = 1;
    var receiverPageSize = 10;
    var toastText = '';
    var configUploadError = '';
    var selectedConfigScenes = ['01', '02'];

    var OPERATOR = {
        merchantId: 'MER-PLATFORM-202607-0001',
        name: '深圳市龙岗区数据要素交易服务有限公司',
        creditCode: '91440307MA5LG20261',
        outTraceNo: 'PSE20260723000001',
        notifyUrl: '由平台系统配置并接收审核结果',
        scene: '01 平台入驻商户应收款、02 平台服务费',
        signType: '0（电子签）',
        billPercent: '97.00%',
        billFeeRate: '0.30%',
        billMinFee: '0.10元'
    };

    var CONFIG_SCENE_LABELS = {
        '01': '01 平台入驻商户应收款',
        '02': '02 平台服务费'
    };
    var CONFIG_ATTACHMENTS = [
        { id: 'FSS20260723000101', name: '聚合平台分账业务场景说明.pdf', size: 1286400, type: 'application/pdf' },
        { id: 'FSS20260723000102', name: '平台近三个月交易单据.pdf', size: 936960, type: 'application/pdf' },
        { id: 'FSS20260723000103', name: '平台与供方合作协议示例.pdf', size: 1546240, type: 'application/pdf' },
        { id: 'FSS20260723000104', name: '统一支付分账服务协议.pdf', size: 1187840, type: 'application/pdf' },
        { id: 'FSS20260723000105', name: '运营方统一收款及资金流转说明.pdf', size: 860160, type: 'application/pdf' },
        { id: 'FSS20260723000106', name: '分账业务补充说明.pdf', size: 675840, type: 'application/pdf' },
        { id: 'FSS20260723000107', name: '分账业务经营场景核验视频.mp4', size: 8437760, type: 'video/mp4' }
    ];

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
        { id: 'PSR-202607-002', name: '数据产品订单-平台服务费', businessType: '数据产品', mode: 'G', value: 50, effectiveAt: '2026-07-22', updatedAt: '2026-07-22 10:26:15' },
        { id: 'PSR-202607-003', name: '数据咨询服务订单-平台服务费', businessType: '数据咨询服务', mode: 'P', value: 2.5, effectiveAt: '2026-07-22', updatedAt: '2026-07-22 10:34:48' },
        { id: 'PSR-202607-004', name: '行业解决方案订单-平台服务费', businessType: '行业解决方案', mode: 'G', value: 500, effectiveAt: '2026-07-22', updatedAt: '2026-07-22 10:41:27' }
    ];

    var RECEIVERS = [
        { receiverId: 'RCV-202607-00986', merchantId: 'MER2026072100986', name: '深圳市龙岗数智科技有限公司', creditCode: '91440300MA5F8LG001', receiverType: '标准商户', account: '中国农业银行 · 4405 **** 12345', status: '1', createdAt: '2026-07-22 09:18:36' },
        { receiverId: 'RCV-202607-00762', merchantId: 'MER2026071800762', name: '龙岗数智产业研究院有限公司', creditCode: '91440300MA5F8LG762', receiverType: '标准商户', account: '中国建设银行 · 6217 **** 0762', status: '0', createdAt: '2026-07-19 11:06:22' },
        { receiverId: 'RCV-202607-00655', merchantId: 'MER2026071700655', name: '深圳市龙数数据技术有限公司', creditCode: '91440300MA5F8LG655', receiverType: '标准商户', account: '招商银行 · 7559 **** 0655', status: '2', createdAt: '2026-07-18 15:26:11' },
        { receiverId: 'RCV-202607-00528', merchantId: 'MER2026071600528', name: '深圳龙岗科创金融服务有限公司', creditCode: '91440300MA5F8LG528', receiverType: '标准商户', account: '平安银行 · 1101 **** 0528', status: '3', createdAt: '2026-07-17 14:08:29' },
        { receiverId: 'RCV-202607-00491', merchantId: 'MER2026071500491', name: '深圳市龙岗智慧交通数据有限公司', creditCode: '91440300MA5F8LG491', receiverType: '标准商户', account: '中国工商银行 · 6222 **** 0491', status: '1', createdAt: '2026-07-16 16:42:08' },
        { receiverId: 'RCV-202607-00436', merchantId: 'MER2026071400436', name: '深圳市龙岗产业空间数据服务有限公司', creditCode: '91440300MA5F8LG436', receiverType: '标准商户', account: '中国银行 · 6216 **** 0436', status: '1', createdAt: '2026-07-15 10:31:45' },
        { receiverId: 'RCV-202607-00387', merchantId: 'MER2026071300387', name: '深圳市龙岗企业信用数据有限公司', creditCode: '91440300MA5F8LG387', receiverType: '标准商户', account: '交通银行 · 6222 **** 0387', status: '0', createdAt: '2026-07-14 14:20:17' },
        { receiverId: 'RCV-202607-00342', merchantId: 'MER2026071200342', name: '深圳市龙岗云链科技有限公司', creditCode: '91440300MA5F8LG342', receiverType: '标准商户', account: '浦发银行 · 6217 **** 0342', status: '1', createdAt: '2026-07-13 09:52:33' },
        { receiverId: 'RCV-202607-00296', merchantId: 'MER2026071100296', name: '深圳市龙岗数字文旅科技有限公司', creditCode: '91440300MA5F8LG296', receiverType: '标准商户', account: '中信银行 · 6217 **** 0296', status: '2', createdAt: '2026-07-12 17:06:54' },
        { receiverId: 'RCV-202607-00251', merchantId: 'MER2026071000251', name: '深圳市龙岗智能制造数据有限公司', creditCode: '91440300MA5F8LG251', receiverType: '标准商户', account: '兴业银行 · 6229 **** 0251', status: '1', createdAt: '2026-07-11 11:24:39' },
        { receiverId: 'RCV-202607-00208', merchantId: 'MER2026070900208', name: '深圳市龙岗数据资产服务有限公司', creditCode: '91440300MA5F8LG208', receiverType: '标准商户', account: '广发银行 · 6225 **** 0208', status: '0', createdAt: '2026-07-10 13:48:26' },
        { receiverId: 'RCV-202607-00169', merchantId: 'MER2026070800169', name: '深圳市龙岗民生服务科技有限公司', creditCode: '91440300MA5F8LG169', receiverType: '标准商户', account: '中国邮政储蓄银行 · 6217 **** 0169', status: '1', createdAt: '2026-07-09 08:56:12' }
    ];

    var RECEIVER_SYNC_CANDIDATE = {
        receiverId: 'RCV-202607-01036',
        merchantId: 'MER2026072301036',
        name: '深圳市龙岗智慧数据服务有限公司',
        creditCode: '91440300MA5F8LG036',
        receiverType: '标准商户',
        account: '中国银行 · 6216 **** 1036',
        status: '0',
        createdAt: '2026-07-23 14:36:20'
    };

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
            edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"/>',
            eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
            refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
            search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
            close: '<path d="M6 6l12 12M18 6 6 18"/>',
            check: '<path d="m5 12 4 4L19 6"/>',
            info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
            upload: '<path d="M12 16V4m0 0L7 9m5-5 5 5"/><path d="M5 20h14"/>',
            file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5"/>',
            trash: '<path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/>',
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

    function renderConfigWithoutJump(scrollToAttachmentEnd) {
        var modalBody = page.querySelector('[data-profit-config-form] .profit-modal-body');
        var attachmentPanel = page.querySelector('[data-profit-config-form] .profit-config-attachments');
        var modalScrollTop = modalBody ? modalBody.scrollTop : 0;
        var attachmentTop = attachmentPanel ? attachmentPanel.getBoundingClientRect().top : null;
        var windowScrollX = window.scrollX || 0;
        var windowScrollY = window.scrollY || 0;
        render();
        modalBody = page.querySelector('[data-profit-config-form] .profit-modal-body');
        attachmentPanel = page.querySelector('[data-profit-config-form] .profit-config-attachments');
        if (modalBody) {
            if (scrollToAttachmentEnd) {
                modalBody.scrollTop = modalBody.scrollHeight;
            } else {
                modalBody.scrollTop = modalScrollTop;
                if (attachmentPanel && attachmentTop !== null) {
                    modalBody.scrollTop += attachmentPanel.getBoundingClientRect().top - attachmentTop;
                }
            }
        }
        if (window.scrollX !== windowScrollX || window.scrollY !== windowScrollY) {
            window.scrollTo(windowScrollX, windowScrollY);
        }
    }

    function getSplitApplyAuditState() {
        return splitApplyAuditStatus == null ? SPLIT_APPLY_EMPTY_STATE : SPLIT_APPLY_AUDIT_STATES[splitApplyAuditStatus];
    }

    function formatAttachmentSize(size) {
        if (!size) return '未知大小';
        if (size >= 1024 * 1024) return (size / 1024 / 1024).toFixed(2) + ' MB';
        return Math.max(1, Math.round(size / 1024)) + ' KB';
    }

    function isVideoAttachment(file) {
        return /^video\//i.test(file.type || '') || /\.(mp4|mov)$/i.test(file.name || '');
    }

    function renderConfigAttachments(readonly) {
        var uploadControl = readonly ? ''
            : '<div class="profit-config-attachment-upload"><span class="profit-config-attachment-upload-icon">' + icon('upload') + '</span><div><strong>选择附件</strong><p>支持一次选择多个文件，再次上传会追加到现有列表。</p></div><label>' + icon('upload') + '<span>上传附件</span><input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov,video/mp4,video/quicktime" multiple data-config-attachments></label></div>';
        var attachmentList = CONFIG_ATTACHMENTS.length
            ? '<div class="profit-config-attachment-list">' + CONFIG_ATTACHMENTS.map(function (item) {
                return '<div class="profit-config-attachment-item"><span class="profit-config-attachment-file-icon">' + icon('file') + '</span><div><strong>' + escapeHtml(item.name) + '</strong><small>' + escapeHtml(formatAttachmentSize(item.size) + ' · ' + item.id) + '</small></div>'
                    + (readonly ? '' : button('删除', 'text attachment-remove', 'remove-config-attachment', 'trash', 'data-config-attachment-id="' + item.id + '"')) + '</div>';
            }).join('') + '</div>'
            : '<div class="profit-config-attachment-empty">' + icon('file') + '<span>暂未上传附件</span></div>';
        return '<div class="profit-config-attachments">' + uploadControl + attachmentList + '</div>';
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
            +   '<label><input type="checkbox" name="scene" value="01"' + (selectedConfigScenes.indexOf('01') >= 0 ? ' checked' : '') + (readonly ? ' disabled' : '') + '><span>01 平台入驻商户应收款</span></label>'
            +   '<label><input type="checkbox" name="scene" value="02"' + (selectedConfigScenes.indexOf('02') >= 0 ? ' checked' : '') + (readonly ? ' disabled' : '') + '><span>02 平台服务费</span></label>'
            + '</div></div>'
            + '<label><span>签约方式 <b>*</b></span><select name="signType"' + (readonly ? ' disabled' : '') + '><option value="0" selected>电子签</option><option value="1">纸质签</option></select></label>'
            + '<label><span>最大对外分账比例</span><div class="profit-field-suffix"><input name="billPercent" type="number" min="0.01" max="100" step="0.01" value="97.00"' + (readonly ? ' readonly' : '') + '><i>%</i></div><small>选填，留空按渠道配置执行</small></label>'
            + '<label><span>分账手续费率</span><div class="profit-field-suffix"><input name="billFeeRate" type="number" min="0" max="100" step="0.01" value="0.30"' + (readonly ? ' readonly' : '') + '><i>%</i></div><small>选填，不等同平台服务费</small></label>'
            + '<label><span>最低分账手续费</span><div class="profit-field-suffix"><input name="billMinFee" type="number" min="0" step="0.01" value="0.10"' + (readonly ? ' readonly' : '') + '><i>元</i></div><small>选填，金额单位为元</small></label>'
            + '<label><span>当前状态</span><div class="profit-form-status">' + tag(state.label) + '</div></label>'
            + '</div>'
            + '<div class="profit-config-file-title"><strong>附件上传</strong><span>普通文件单个不超过2MB；视频单个不超过9MB。</span></div>'
            + (configUploadError ? '<div class="profit-form-error">' + escapeHtml(configUploadError) + '</div>' : '')
            + renderConfigAttachments(readonly)
            + '</div>'
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
            ? '<div class="profit-config-inline-files"><div class="profit-config-file-title"><strong>已上传附件</strong><span>本次分账开通申请附件</span></div>'
                + renderConfigAttachments(true)
                + '</div>'
            : '';
        return '<section class="profit-table-card profit-config-card"><div class="profit-section-title"><div><h3>' + title + '</h3><p>' + description + '</p></div></div><div class="profit-detail-grid">'
            + detailItems.join('') + '</div>' + inlineFiles + '</section>';
    }

    function renderConfig() {
        var state = getSplitApplyAuditState();
        var businessAction = splitApplyAuditStatus === null
            ? button('申请开通分账', 'primary', 'open-config', 'edit')
            : splitApplyAuditStatus === '2' || splitApplyAuditStatus === '3'
                ? button('重新发起申请', 'primary', 'open-config', 'edit')
                : '';
        var headActions = renderConfigStateSimulator() + businessAction;
        page.innerHTML = renderHead('分账基础配置', '运营方作为统一收款商户和分账方，在本页提交申请并查看审核状态。', headActions)
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

    function ruleModeLabel(rule) {
        return rule.mode === 'P' ? '金额比例' : '固定金额';
    }

    function ruleDescription(rule) {
        return rule.mode === 'P'
            ? '按每期实付金额比例收取'
            : '按每笔付款流水固定收取';
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
            + renderSummary([['配置总数', String(RULES.length), '覆盖四类交易订单'], ['配置方式', '全局', '按订单业务类型匹配'], ['计费方式', '2种', '金额比例 / 固定金额'], ['经营属性', '第三方', '自营订单不收取']])
            + '<section class="profit-api-banner">' + icon('info') + '<div><strong>配置说明</strong><p>金额比例按每期实付金额计算，固定金额按每笔付款流水收取；合同签订时带入对应配置并冻结为订单级快照。</p></div></section>'
            + renderFilters()
            + '<section class="profit-table-card"><div class="profit-table-meta"><span>共 <strong>' + records.length + '</strong> 项配置</span><span>固定配置仅支持编辑维护</span></div><div class="profit-table-scroll"><table><thead><tr><th>配置编号 / 名称</th><th>业务类型</th><th>计费方式 / 标准</th><th>生效日期</th><th>操作</th></tr></thead><tbody>'
            + (records.length ? records.map(function (rule) {
                return '<tr><td><strong>' + escapeHtml(rule.name) + '</strong><small>' + rule.id + '</small></td><td>' + rule.businessType + '</td><td><strong class="profit-money">' + ruleAmount(rule) + '</strong><small>' + ruleModeLabel(rule) + ' · ' + ruleDescription(rule) + '</small></td><td>' + rule.effectiveAt + '<small>更新：' + rule.updatedAt + '</small></td><td><div class="profit-row-actions">' + button('编辑', 'text', 'edit-rule', 'edit', 'data-rule-id="' + rule.id + '"') + '</div></td></tr>';
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
            + '<label><span>计费方式 <b>*</b></span><select name="mode"><option value="P"' + (rule.mode === 'P' ? ' selected' : '') + '>金额比例</option><option value="G"' + (rule.mode === 'G' ? ' selected' : '') + '>固定金额</option></select></label>'
            + '<label><span>计费标准 <b>*</b></span><div class="profit-field-suffix"><input name="ruleValue" type="number" min="0.01" step="0.01" value="' + rule.value + '"' + (rule.mode === 'P' ? ' max="100"' : '') + ' required><i data-rule-unit>' + (rule.mode === 'P' ? '%' : '元') + '</i></div><small data-rule-value-help>' + (rule.mode === 'P' ? '按每期实付金额比例计算' : '每笔付款流水收取一次固定金额') + '</small></label>'
            + '<label><span>生效日期 <b>*</b></span><input name="effectiveAt" type="date" value="' + rule.effectiveAt + '" required></label>'
            + '<label class="is-wide"><span>规则说明</span><textarea maxlength="200" data-rule-description>' + (rule.mode === 'P' ? '运营方按每一期实付金额比例保留平台服务费，剩余金额自动分账给供方。' : '运营方从每一笔付款流水中保留固定金额的平台服务费，剩余金额自动分账给供方。') + '</textarea></label>'
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

    function receiverPaginationItems(currentPage, pageCount) {
        var items = [];
        var start;
        var end;
        var index;
        if (pageCount <= 7) {
            for (index = 1; index <= pageCount; index += 1) items.push(index);
            return items;
        }
        items.push(1);
        start = Math.max(2, currentPage - 1);
        end = Math.min(pageCount - 1, currentPage + 1);
        if (start > 2) items.push('start-ellipsis');
        for (index = start; index <= end; index += 1) items.push(index);
        if (end < pageCount - 1) items.push('end-ellipsis');
        items.push(pageCount);
        return items;
    }

    function renderReceiverPagination(total, pageCount) {
        var pageItems = receiverPaginationItems(receiverPage, pageCount);
        return '<div class="pagination-bar profit-pagination">'
            + '<span class="pagination-info">共 ' + total + ' 条</span>'
            + '<select class="profit-page-size" data-profit-page-size aria-label="每页条数">'
            + [10, 20, 50].map(function (size) {
                return '<option value="' + size + '"' + (receiverPageSize === size ? ' selected' : '') + '>' + size + ' 条/页</option>';
            }).join('') + '</select>'
            + '<button class="page-btn" type="button" data-profit-action="receiver-page-prev" aria-label="上一页"' + (receiverPage <= 1 ? ' disabled' : '') + '>‹</button>'
            + '<span class="profit-pagination-pages">' + pageItems.map(function (item) {
                if (typeof item === 'string') return '<span class="page-ellipsis">•••</span>';
                return '<button class="page-btn' + (item === receiverPage ? ' active' : '') + '" type="button" data-profit-action="receiver-page" data-receiver-page="' + item + '"' + (item === receiverPage ? ' aria-current="page"' : '') + '>' + item + '</button>';
            }).join('') + '</span>'
            + '<button class="page-btn" type="button" data-profit-action="receiver-page-next" aria-label="下一页"' + (receiverPage >= pageCount ? ' disabled' : '') + '>›</button>'
            + '</div>';
    }

    function renderReceivers() {
        var records = filteredReceivers();
        var pageCount = Math.max(1, Math.ceil(records.length / receiverPageSize));
        var pageStart;
        var visibleRecords;
        receiverPage = Math.min(Math.max(receiverPage, 1), pageCount);
        pageStart = (receiverPage - 1) * receiverPageSize;
        visibleRecords = records.slice(pageStart, pageStart + receiverPageSize);
        var syncAction = button(receiverSyncing ? '同步中…' : '同步接收方', receiverSyncing ? 'is-syncing' : '', 'open-receiver-sync', 'refresh', receiverSyncing ? 'disabled aria-busy="true"' : '');
        page.innerHTML = renderHead('分账接收方管理', '供方收款结算账号开通后，系统后台自动发起分账接收方添加，并同步展示审核状态。', syncAction)
            + '<section class="profit-api-banner">' + icon('link') + '<div><strong>自动添加说明</strong><p>供方在供方中心完成收款结算账号开通后，系统后台自动发起分账接收方添加；如因自动任务失败或其他原因未能添加，可点击右上角“同步接收方”手动检测并补充未添加记录。</p></div></section>'
            + '<section class="profit-filter-card is-simple"><label class="profit-search">' + icon('search') + '<input type="search" placeholder="搜索供方名称、接收方编号或商户编号" value="' + escapeHtml(query) + '" data-profit-search></label><select data-profit-status aria-label="审核状态"><option value="全部状态">全部状态</option><option value="0">正在审核</option><option value="1">审核成功</option><option value="2">审核驳回</option><option value="3">审核拒绝</option></select>' + button('查询', 'primary', 'search', 'search') + button('重置', '', 'reset', 'refresh') + '</section>'
            + '<section class="profit-table-card"><div class="profit-table-meta"><span>共 <strong>' + records.length + '</strong> 个接收方</span><span>接收方由系统后台自动添加</span></div><div class="profit-table-scroll"><table><thead><tr><th>供方名称 / 商户编号</th><th>接收方编号</th><th>接收方类型</th><th>结算账户</th><th>审核状态</th><th>自动发起时间</th><th>操作</th></tr></thead><tbody>'
            + visibleRecords.map(function (item) {
                return '<tr><td><strong>' + item.name + '</strong><small>' + item.merchantId + '</small></td><td>' + item.receiverId + '</td><td>' + item.receiverType + '</td><td>' + item.account + '</td><td>' + tag(RECEIVER_AUDIT_LABELS[item.status]) + '</td><td>' + item.createdAt + '</td><td><div class="profit-row-actions">' + button('详情', 'text', 'receiver-detail', 'eye', 'data-receiver-id="' + item.receiverId + '"') + '</div></td></tr>';
            }).join('') + '</tbody></table></div>' + renderReceiverPagination(records.length, pageCount) + '</section>' + renderReceiverDrawer() + renderReceiverSyncModal() + renderToast();
        bindEvents();
    }

    function renderReceiverSyncModal() {
        if (!receiverSyncOpen) return '';
        return '<div class="profit-modal-mask" data-profit-receiver-sync-close><div class="profit-modal profit-receiver-sync-modal" role="dialog" aria-modal="true" aria-labelledby="receiverSyncTitle">'
            + '<header><div><h2 id="receiverSyncTitle">同步接收方</h2><p>手动检测并补充未自动添加的分账接收方</p></div><button type="button" data-profit-action="close-receiver-sync" aria-label="关闭">' + icon('close') + '</button></header>'
            + '<div class="profit-modal-body"><p class="profit-sync-description">系统将检测已开通收款结算账号但尚未添加为分账接收方的供方，并重新发起添加。</p><div class="profit-form-note">' + icon('info') + '<p>本次操作仅补充尚未添加的接收方，已有接收方不会重复提交。</p></div></div>'
            + '<footer>' + button('取消', '', 'close-receiver-sync', 'close') + button('确认同步', 'primary', 'confirm-receiver-sync', 'refresh') + '</footer></div></div>';
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
            + '<div><span>接收方类型</span><strong>' + item.receiverType + '</strong></div><div><span>自动发起时间</span><strong>' + item.createdAt + '</strong></div>'
            + '<div><span>统一社会信用代码</span><strong>' + item.creditCode + '</strong></div><div><span>审核状态</span>' + tag(RECEIVER_AUDIT_LABELS[item.status]) + '</div>'
            + '<div><span>渠道编码</span><strong>' + item.channelCode + '</strong></div><div><span>账户类型</span><strong>' + (item.settleType === '0' ? '对公账户' : '对私账户') + '</strong></div></div></section>'
            + '<section><h3>结算信息</h3><div class="profit-detail-grid"><div><span>结算户名</span><strong>' + item.settleName + '</strong></div><div><span>结算账号</span><strong>' + item.settleCardNo + '</strong></div><div><span>开户银行</span><strong>' + item.bankName + '</strong></div><div><span>开户支行</span><strong>' + item.bankBranch + '</strong></div><div><span>开户地区编码</span><strong>' + item.bankProvince + '／' + item.bankCity + '</strong></div><div><span>联行号</span><strong>' + item.alliedBankCode + '</strong></div><div><span>法人姓名</span><strong>' + item.legalName + '</strong></div><div><span>法人手机号</span><strong>' + item.legalMobile + '</strong></div></div><div class="profit-receiver-card"><span>供方分账收款账户</span><strong>' + item.account + '</strong><p>接收方资料由供方已开通的收款结算账号同步，系统后台自动发起添加，页面仅用于核对。</p></div></section>'
            + '</div><footer>' + button('关闭', '', 'close-drawer', 'close') + '</footer></aside>';
    }

    function bindEvents() {
        var searchInput = page.querySelector('[data-profit-search]');
        if (searchInput) {
            searchInput.addEventListener('input', function () { query = this.value; });
            searchInput.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    receiverPage = 1;
                    render();
                }
            });
        }
        var scene = page.querySelector('[data-profit-scene]');
        var status = page.querySelector('[data-profit-status]');
        if (scene) { scene.value = sceneFilter; scene.addEventListener('change', function () { sceneFilter = this.value; }); }
        if (status) {
            status.value = statusFilter;
            status.addEventListener('change', function () {
                statusFilter = this.value;
                receiverPage = 1;
                render();
            });
        }

        var receiverPageSizeSelect = page.querySelector('[data-profit-page-size]');
        if (receiverPageSizeSelect) {
            receiverPageSizeSelect.addEventListener('change', function () {
                receiverPageSize = Number(this.value) || 10;
                receiverPage = 1;
                render();
            });
        }

        page.querySelectorAll('[data-profit-action]').forEach(function (control) {
            control.addEventListener('click', function () {
                var action = this.dataset.profitAction;
                if (action === 'search') { receiverPage = 1; render(); }
                else if (action === 'reset') { query = ''; statusFilter = '全部状态'; sceneFilter = '全部业务类型'; receiverPage = 1; render(); }
                else if (action === 'receiver-page') { receiverPage = Number(this.dataset.receiverPage) || 1; render(); }
                else if (action === 'receiver-page-prev') { receiverPage = Math.max(1, receiverPage - 1); render(); }
                else if (action === 'receiver-page-next') { receiverPage += 1; render(); }
                else if (action === 'open-config') { configOpen = true; configUploadError = ''; render(); }
                else if (action === 'close-config') { configOpen = false; render(); }
                else if (action === 'remove-config-attachment') {
                    var attachmentId = this.dataset.configAttachmentId;
                    CONFIG_ATTACHMENTS = CONFIG_ATTACHMENTS.filter(function (item) { return item.id !== attachmentId; });
                    configUploadError = '';
                    renderConfigWithoutJump();
                }
                else if (action === 'set-audit-status') { splitApplyAuditStatus = this.dataset.auditStatus; configOpen = false; render(); }
                else if (action === 'edit-rule') { modalState = { mode: 'edit', rule: RULES.find(function (rule) { return rule.id === control.dataset.ruleId; }) }; render(); }
                else if (action === 'close-modal') { modalState = null; render(); }
                else if (action === 'receiver-detail') { drawerReceiverId = this.dataset.receiverId; render(); }
                else if (action === 'close-drawer') { drawerReceiverId = ''; render(); }
                else if (action === 'open-receiver-sync') { receiverSyncOpen = true; render(); }
                else if (action === 'close-receiver-sync') { receiverSyncOpen = false; render(); }
                else if (action === 'confirm-receiver-sync') {
                    receiverSyncOpen = false;
                    receiverSyncing = true;
                    render();
                    window.setTimeout(function () {
                        receiverSyncing = false;
                        if (!receiverSyncCompleted) {
                            RECEIVERS.unshift(RECEIVER_SYNC_CANDIDATE);
                            receiverSyncCompleted = true;
                            receiverPage = 1;
                            showToast('同步完成：发现 1 个未添加接收方，已成功发起添加。');
                        } else {
                            showToast('同步完成，未发现需要补充添加的接收方。');
                        }
                    }, 900);
                }
            });
        });

        var configForm = page.querySelector('[data-profit-config-form]');
        if (configForm) {
            configForm.querySelectorAll('input[name="scene"]').forEach(function (input) {
                input.addEventListener('change', function () {
                    selectedConfigScenes = Array.prototype.map.call(configForm.querySelectorAll('input[name="scene"]:checked'), function (item) { return item.value; });
                });
            });
            configForm.addEventListener('submit', function (event) {
                event.preventDefault();
                if (!configForm.reportValidity()) return;
                selectedConfigScenes = Array.prototype.map.call(configForm.querySelectorAll('input[name="scene"]:checked'), function (item) { return item.value; });
                if (!selectedConfigScenes.length) {
                    configUploadError = '请至少选择一个分账业务场景。';
                    render();
                    return;
                }
                if (!CONFIG_ATTACHMENTS.length) {
                    configUploadError = '请至少上传一个附件后再提交申请。';
                    render();
                    return;
                }
                OPERATOR.scene = selectedConfigScenes.map(function (value) { return CONFIG_SCENE_LABELS[value]; }).join('、');
                splitApplyAuditStatus = '0';
                configOpen = false;
                showToast('分账开通申请已提交，当前审核状态为正在审核。');
            });
        }
        var configAttachmentInput = page.querySelector('[data-config-attachments]');
        if (configAttachmentInput) configAttachmentInput.addEventListener('change', function () {
            var files = Array.prototype.slice.call(this.files || []);
            var errors = [];
            var uploadedCount = 0;
            var createdAt = Date.now();
            files.forEach(function (file, index) {
                var video = isVideoAttachment(file);
                if (!/\.(pdf|doc|docx|jpg|jpeg|png|mp4|mov)$/i.test(file.name || '')) {
                    errors.push(file.name + '：格式不支持');
                } else if (video && file.size > 9 * 1024 * 1024) {
                    errors.push(file.name + '：视频不能超过9MB');
                } else if (!video && file.size > 2 * 1024 * 1024) {
                    errors.push(file.name + '：普通文件不能超过2MB');
                } else {
                    CONFIG_ATTACHMENTS.push({
                        id: 'FSS' + String(createdAt + index),
                        name: file.name,
                        size: file.size,
                        type: file.type || ''
                    });
                    uploadedCount += 1;
                }
            });
            configUploadError = errors.join('；');
            renderConfigWithoutJump(uploadedCount > 0);
        });

        var ruleForm = page.querySelector('[data-profit-rule-form]');
        if (ruleForm) {
            ruleForm.elements.mode.addEventListener('change', function () {
                var unit = ruleForm.querySelector('[data-rule-unit]');
                var valueInput = ruleForm.elements.ruleValue;
                var valueHelp = ruleForm.querySelector('[data-rule-value-help]');
                var description = ruleForm.querySelector('[data-rule-description]');
                if (unit) unit.textContent = this.value === 'P' ? '%' : '元';
                if (valueInput) {
                    if (this.value === 'P') valueInput.setAttribute('max', '100');
                    else valueInput.removeAttribute('max');
                }
                if (valueHelp) valueHelp.textContent = this.value === 'P' ? '按每期实付金额比例计算' : '每笔付款流水收取一次固定金额';
                if (description) description.value = this.value === 'P'
                    ? '运营方按每一期实付金额比例保留平台服务费，剩余金额自动分账给供方。'
                    : '运营方从每一笔付款流水中保留固定金额的平台服务费，剩余金额自动分账给供方。';
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
        if (modalMask) modalMask.addEventListener('click', function () { modalState = null; configOpen = false; render(); });
        if (modal) modal.addEventListener('click', function (event) {
            event.stopPropagation();
        });
        var drawerMask = page.querySelector('[data-profit-drawer-close]');
        if (drawerMask) drawerMask.addEventListener('click', function () { drawerReceiverId = ''; render(); });
        var receiverSyncMask = page.querySelector('[data-profit-receiver-sync-close]');
        if (receiverSyncMask) receiverSyncMask.addEventListener('click', function () { receiverSyncOpen = false; render(); });
    }

    function render() {
        if (pageType === 'config') renderConfig();
        else if (pageType === 'rules') renderRules();
        else renderReceivers();
    }

    render();
})();
