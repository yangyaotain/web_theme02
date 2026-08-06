(function () {
    var params = new URLSearchParams(window.location.search || '');
    var scene = params.get('scene') || 'sign';
    var templateId = params.get('templateId') || 'TPL-LG-CP-001';
    var contractName = params.get('contractName') || '数据交易三方合同';
    var contractNo = params.get('contractNo') || '--';
    var orderNo = params.get('orderNo') || '--';
    var taskId = params.get('taskId') || 'FDD-DEMO-2026070001';
    var role = params.get('role') || '签署方';
    var party = params.get('party') || '当前登录企业';
    var node = params.get('node') || '合同签署';
    var channelId = params.get('channelId') || '';
    var businessType = params.get('businessType') || 'product';
    var sourceMenu = params.get('sourceMenu') || '';
    var returnUrl = params.get('returnUrl') || '';

    function setText(selector, value) {
        var target = document.querySelector(selector);
        if (target) target.textContent = value;
    }

    function showToast(message) {
        var toast = document.querySelector('[data-fdd-toast]');
        if (!toast) return;
        toast.querySelector('span:last-child').textContent = message;
        toast.classList.add('show');
        window.clearTimeout(showToast.timer);
        showToast.timer = window.setTimeout(function () { toast.classList.remove('show'); }, 2400);
    }

    function closeOrReturn() {
        if (window.opener && !window.opener.closed) {
            window.close();
            return;
        }
        if (returnUrl) {
            try {
                var target = new URL(returnUrl, window.location.href);
                if (window.location.origin === 'null' || target.origin === window.location.origin) {
                    window.location.href = target.href;
                    return;
                }
            } catch (error) {
                // 返回地址异常时保留当前页面。
            }
        }
        window.close();
    }

    function initTemplatePreviewScene() {
        var signPanel = document.querySelector('.fdd-sign-panel');
        var signatureZone = document.querySelector('.fdd-signature-zone');
        if (signPanel) signPanel.hidden = true;
        if (signatureZone) signatureZone.hidden = true;
        document.body.classList.add('is-template-preview');
        setText('[data-fdd-brand-context]', '合同模板预览');
        setText('[data-fdd-help-text]', '预览帮助');
        setText('[data-fdd-contract-name]', contractName);
        setText('[data-fdd-contract-no]', templateId);
        setText('[data-fdd-number-label]', '模板编号');
        setText('[data-fdd-paper-no]', templateId);
        setText('[data-fdd-paper-title]', contractName.replace(/（V[^）]+）$/, ''));
        document.title = contractName + ' - 法大大模板预览';

        document.querySelector('[data-fdd-help]').addEventListener('click', function () {
            showToast('当前页面用于预览已发布的法大大合同模板。');
        });
        document.querySelector('.fdd-document-toolbar button:last-child').addEventListener('click', function () {
            showToast('模板预览文件已加入下载队列。');
        });
    }

    function initManagementScene() {
        var service = window.ESignServiceState;
        var state = service ? service.get() : {};
        var companyName = params.get('companyName') || state.companyName || '中国电子云';
        var creditCode = params.get('creditCode') || state.creditCode || '--';
        var companyId = params.get('companyId') || state.companyId || '--';
        var signView = document.querySelector('[data-fdd-sign-view]');
        var managementView = document.querySelector('[data-fdd-management-view]');
        if (signView) signView.hidden = true;
        if (managementView) managementView.hidden = false;
        document.body.classList.add('is-management');
        setText('[data-fdd-brand-context]', scene === 'manage' ? '企业管理' : '企业实名认证');
        setText('[data-fdd-help-text]', '使用帮助');
        setText('[data-fdd-company-name]', companyName);
        setText('[data-fdd-company-id]', companyId);
        setText('[data-fdd-credit-code]', creditCode);
        setText('[data-fdd-verify-company]', companyName);
        setText('[data-fdd-verify-credit]', creditCode);
        setText('[data-fdd-authorize-company]', companyName);

        var home = document.querySelector('[data-fdd-manage-home]');
        var verifyCard = document.querySelector('[data-fdd-verify-card]');
        var authorizeCard = document.querySelector('[data-fdd-authorize-card]');
        var managementNav = document.querySelector('.fdd-management-sidebar nav');
        if (managementNav) managementNav.hidden = scene !== 'manage';
        if (home) home.hidden = scene !== 'manage';
        if (verifyCard) verifyCard.hidden = scene !== 'verify';
        if (authorizeCard) authorizeCard.hidden = scene !== 'authorize';

        if (scene === 'verify') {
            setText('[data-fdd-management-title]', '企业实名认证');
            setText('[data-fdd-management-subtitle]', '提交认证资料后，请以异步回调或状态查询结果为准');
            var verifySubmit = document.querySelector('[data-fdd-submit-verification]');
            var verifyingResult = document.querySelector('[data-fdd-verifying-result]');
            if (state.certificationStatus === 'verifying') {
                verifySubmit.hidden = true;
                verifyingResult.hidden = false;
            }
            verifySubmit.addEventListener('click', function () {
                if (service) service.markVerificationSubmitted();
                this.hidden = true;
                verifyingResult.hidden = false;
                showToast('认证资料已提交，等待法大大处理。');
            });
        } else if (scene === 'authorize') {
            setText('[data-fdd-management-title]', '企业实名认证授权');
            setText('[data-fdd-management-subtitle]', '完成法人或企业负责人授权后，企业实名认证才算通过');
            var agree = document.querySelector('[data-fdd-authorize-agree]');
            var authorizeSubmit = document.querySelector('[data-fdd-submit-authorization]');
            var authorizeResult = document.querySelector('[data-fdd-authorize-result]');
            agree.addEventListener('change', function () { authorizeSubmit.disabled = !this.checked; });
            authorizeSubmit.addEventListener('click', function () {
                if (service) service.markCertificationAuthorized();
                this.hidden = true;
                agree.parentElement.hidden = true;
                authorizeResult.hidden = false;
                showToast('认证授权已完成，结果已回调业务平台。');
            });
        } else {
            document.querySelectorAll('[data-fdd-manage-nav]').forEach(function (button) {
                button.addEventListener('click', function () {
                    document.querySelectorAll('[data-fdd-manage-nav]').forEach(function (item) { item.classList.remove('active'); });
                    this.classList.add('active');
                    var label = this.textContent.trim();
                    if (this.dataset.fddManageNav !== 'overview') showToast(label + '相关配置由法大大平台提供。');
                });
            });
            document.querySelectorAll('[data-fdd-module-action]').forEach(function (button) {
                button.addEventListener('click', function () { showToast(this.dataset.fddModuleAction + '相关配置由法大大平台提供。'); });
            });
        }

        document.querySelector('[data-fdd-management-close]').addEventListener('click', function () { window.close(); });
        document.querySelector('[data-fdd-help]').addEventListener('click', function () { showToast('企业认证、印章、模板和授权均由法大大平台提供。'); });
        document.title = (scene === 'manage' ? '企业业务管理' : (scene === 'verify' ? '企业实名认证' : '企业实名认证授权')) + ' - 法大大';
    }

    if (scene === 'template-preview') {
        initTemplatePreviewScene();
        return;
    }

    if (scene !== 'sign') {
        initManagementScene();
        return;
    }

    function setStep(name, state, label) {
        var step = document.querySelector('[data-fdd-step="' + name + '"]');
        if (!step) return;
        step.classList.remove('active', 'done');
        if (state) step.classList.add(state);
        step.querySelector('em').textContent = label;
    }

    function notifyPlatform(status, processedAt) {
        if (!channelId || !window.opener || window.opener.closed) return;
        var targetOrigin = window.location.origin === 'null' ? '*' : window.location.origin;
        window.opener.postMessage({
            type: 'fadada-sign-result',
            channelId: channelId,
            status: status,
            taskId: taskId,
            orderNo: orderNo,
            role: role,
            party: party,
            processedAt: processedAt
        }, targetOrigin);
    }

    function showResult(status) {
        var readCard = document.querySelector('[data-fdd-read-card]');
        var sealCard = document.querySelector('[data-fdd-seal-card]');
        var successCard = document.querySelector('[data-fdd-success-card]');
        var processedAt = new Date().toLocaleString('zh-CN', { hour12: false });
        readCard.hidden = true;
        sealCard.hidden = true;
        successCard.hidden = false;
        setText('[data-fdd-signed-at]', processedAt);

        if (status === 'refused') {
            setStep('read', 'done', '已完成');
            setStep('seal', '', '未处理');
            setStep('complete', 'done', '已拒签');
            setText('[data-fdd-result-title]', '已拒绝签署');
            setText('[data-fdd-result-description]', '拒签结果正在回调业务平台，合同不会继续流转下一签署方。');
            setText('[data-fdd-result-status]', '等待回调');
            setText('[data-fdd-next-node]', '合同签署已中止');
        } else {
            setStep('seal', 'done', '已完成');
            setStep('complete', 'active', '回调中');
            setText('[data-fdd-result-title]', '合同签署成功');
            setText('[data-fdd-result-description]', '签署结果已生成，正在回调业务平台；回调完成前平台不会推进签署进度。');
            setText('[data-fdd-result-status]', '等待回调');
            setText('[data-fdd-next-node]', '等待平台确认');
        }

        window.setTimeout(function () {
            setStep('complete', 'done', status === 'refused' ? '已回调' : '已完成');
            setText('[data-fdd-result-status]', status === 'refused' ? '已拒签' : '已签署');
            setText('[data-fdd-result-description]', status === 'refused'
                ? '拒签结果已回调业务平台，合同签署流程已停止。'
                : '签署成功回调已由业务平台接收，当前签署节点已经完成。');
            setText('[data-fdd-next-node]', status === 'refused'
                ? '合同签署已中止'
                : (/运营方/.test(role) ? '三方签署完成，等待任务关闭与归档' : '流转下一签署方'));
            notifyPlatform(status, processedAt);
            showToast(status === 'refused' ? '拒签结果已回调业务平台' : node + '结果已回调业务平台');
        }, 700);
    }

    setText('[data-fdd-contract-name]', contractName);
    setText('[data-fdd-contract-no]', contractNo);
    setText('[data-fdd-paper-no]', contractNo);
    setText('[data-fdd-order-no]', '关联订单：' + orderNo);
    setText('[data-fdd-task-id]', taskId);
    setText('[data-fdd-sign-role]', role);
    setText('[data-fdd-sign-party]', party);
    var sealParty = document.querySelector('.fdd-seal-image small');
    if (sealParty) sealParty.textContent = party;
    document.title = contractName + ' - 法大大电子签约';

    var agree = document.querySelector('[data-fdd-agree]');
    var next = document.querySelector('[data-fdd-next]');
    var readCard = document.querySelector('[data-fdd-read-card]');
    var sealCard = document.querySelector('[data-fdd-seal-card]');

    agree.addEventListener('change', function () { next.disabled = !this.checked; });
    next.addEventListener('click', function () {
        setStep('read', 'done', '已完成');
        setStep('seal', 'active', '进行中');
        readCard.hidden = true;
        sealCard.hidden = false;
    });

    document.querySelector('[data-fdd-sign]').addEventListener('click', function () { showResult('signed'); });
    document.querySelector('[data-fdd-refuse]').addEventListener('click', function () { showResult('refused'); });
    var closeButton = document.querySelector('[data-fdd-close]');
    if (closeButton) {
        closeButton.textContent = sourceMenu === 'resource-order' || businessType === 'resource' ? '返回资源订单管理' : '返回订单管理';
        closeButton.addEventListener('click', closeOrReturn);
    }
    document.querySelector('[data-fdd-help]').addEventListener('click', function () { showToast('身份认证、签署意愿校验及印章授权均由法大大完成。'); });
    document.querySelector('.fdd-document-toolbar button:last-child').addEventListener('click', function () { showToast('合同文件已加入下载队列。'); });
})();
