(function () {
    var drawer;
    var mask;
    var form;
    var feedback;
    var opinionInput;
    var opinionCount;
    var submitButtonText;
    var submitButtonIcon;
    var activeOptions = {};
    var lastFocusedElement;
    var PLATFORM_OPERATOR_NAME = '深圳市龙岗区数据要素交易服务有限公司';

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
        });
    }

    function parseMoney(value) {
        var amount = Number(String(value == null ? '' : value).replace(/[^\d.-]/g, ''));
        return Number.isFinite(amount) ? amount : 0;
    }

    function formatMoney(value) {
        return '¥' + Number(value || 0).toFixed(2);
    }

    function formatDate(date) {
        return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
    }

    function getContractDates(appliedAt) {
        var signedAt = String(appliedAt || '').slice(0, 10) || '2026-07-18';
        var parts = signedAt.split('-').map(Number);
        var endDate = new Date(parts[0] || 2026, (parts[1] || 1) - 1, parts[2] || 1);
        endDate.setFullYear(endDate.getFullYear() + 1);
        endDate.setDate(endDate.getDate() - 1);
        return {
            signedAt: signedAt,
            startsAt: signedAt,
            endsAt: formatDate(endDate)
        };
    }

    function buildContractNumber(options) {
        var orderNo = String(options.orderNo || '');
        var datePart = orderNo.slice(0, 8) || '20260718';
        var serialPart = orderNo.slice(-6) || '000001';
        var businessCode = options.businessType === 'service' ? 'FWHT' : (options.businessType === 'resource' ? 'ZYHT' : 'CPHT');
        return 'LG-' + businessCode + '-' + datePart + '-' + serialPart;
    }

    function buildPaymentSnapshot(options) {
        var totalAmount = parseMoney(options.amount);
        var totalCents = Math.round(totalAmount * 100);
        var feeMode = options.serviceFeeMode === 'G' ? 'G' : 'P';
        var feeValue = Number(options.serviceFeeValue);
        if (!Number.isFinite(feeValue)) feeValue = 0;
        var sourceStages = Array.isArray(options.paymentStages) && options.paymentStages.length
            ? options.paymentStages
            : (options.businessType === 'service'
                ? [
                    { name: '首期款', percent: 30 },
                    { name: '阶段款', percent: 40 },
                    { name: '尾款', percent: 30 }
                ]
                : [{ name: '一次性付款', percent: 100 }]);
        var allocatedCents = 0;
        var stages = sourceStages.map(function (stage, index) {
            var amountValue = Number(stage.amount);
            var stageCents = Number.isFinite(amountValue)
                ? Math.round(amountValue * 100)
                : (index === sourceStages.length - 1
                    ? Math.max(0, totalCents - allocatedCents)
                    : Math.round(totalCents * Number(stage.percent || 0) / 100));
            allocatedCents += stageCents;
            var stageAmount = stageCents / 100;
            var serviceFee = feeMode === 'G' ? feeValue : stageAmount * feeValue / 100;
            return {
                name: stage.name || ('第' + (index + 1) + '期'),
                percent: Number(stage.percent || 0),
                amount: stageAmount,
                serviceFee: serviceFee,
                providerNet: stageAmount - serviceFee,
                payStatus: stage.payStatus || '待发起'
            };
        });

        return {
            totalAmount: totalAmount,
            feeMode: feeMode,
            feeValue: feeValue,
            paymentMode: options.paymentMode || (options.businessType === 'service' ? 'installment' : 'once'),
            stages: stages,
            totalPercent: stages.reduce(function (sum, stage) { return sum + stage.percent; }, 0),
            totalServiceFee: stages.reduce(function (sum, stage) { return sum + stage.serviceFee; }, 0)
        };
    }

    function renderPaymentTerms(options) {
        var target = drawer.querySelector('[data-contract-approval-payment]');
        if (!target) return;
        var snapshot = buildPaymentSnapshot(options);
        var isService = options.businessType === 'service';
        var feeLabel = snapshot.feeMode === 'G'
            ? '固定金额 ' + formatMoney(snapshot.feeValue) + '/笔'
            : '金额比例 ' + snapshot.feeValue.toFixed(2) + '%';
        var feeNote = snapshot.feeMode === 'G' ? '每笔付款流水收取' : '按每笔付款金额计算';
        var rows = snapshot.stages.map(function (stage, index) {
            return ''
                + '<div class="supplier-contract-stage-row">'
                +   '<span class="supplier-contract-stage-index">' + (index + 1) + '</span>'
                +   '<span class="supplier-contract-stage-value">' + escapeHtml(stage.name) + '</span>'
                +   '<strong class="supplier-contract-stage-value is-percent">' + stage.percent.toFixed(2) + '%</strong>'
                +   '<strong class="supplier-contract-stage-calculated">' + formatMoney(stage.amount) + '</strong>'
                +   '<strong class="supplier-contract-stage-money">' + formatMoney(stage.serviceFee) + '</strong>'
                +   '<strong class="supplier-contract-stage-money is-net">' + formatMoney(stage.providerNet) + '</strong>'
                +   '<strong class="supplier-contract-stage-status">' + escapeHtml(stage.payStatus) + '</strong>'
                + '</div>';
        }).join('');

        target.innerHTML = ''
            + '<div class="supplier-contract-payment-head">'
            +   '<div><strong>付款与分账条款</strong><p>以下内容为关联合同时已确定的付款计划和平台服务费规则。</p></div>'
            +   '<span class="supplier-contract-freeze"><span class="material-symbols-outlined" aria-hidden="true">lock</span>签订后冻结</span>'
            + '</div>'
            + '<div class="supplier-contract-payment-summary">'
            +   '<div><span>合同金额</span><strong>' + formatMoney(snapshot.totalAmount) + '</strong><small>关联订单应付总额</small></div>'
            +   '<div><span>平台服务费</span><strong>' + feeLabel + '</strong><small>' + feeNote + '</small></div>'
            +   '<div><span>结算方式</span><strong>' + (isService ? '按合同付款计划支付' : '订单一次性支付') + '</strong><small>支付成功后按订单发起分账</small></div>'
            +   '<div><span>提供方预计实收</span><strong>' + formatMoney(snapshot.totalAmount - snapshot.totalServiceFee) + '</strong><small>合同金额扣除各笔平台服务费</small></div>'
            + '</div>'
            + '<div class="supplier-contract-approval-payment-mode"><span>付款方式</span><strong>' + (snapshot.paymentMode === 'installment' ? '分期付款' : '一次性付款') + '</strong><small>关联合同时已确定</small></div>'
            + '<div class="supplier-contract-stage-table is-display-only">'
            +   '<div class="supplier-contract-stage-head"><span>期次</span><span>阶段名称</span><span>付款比例</span><span>付款金额</span><span>平台服务费</span><span>提供方实收</span><span>支付状态</span></div>'
            +   rows
            + '</div>'
            + '<div class="supplier-contract-payment-foot">'
            +   '<span><span class="material-symbols-outlined" aria-hidden="true">info</span>每一期在到达付款节点后独立生成支付流水号并发起支付，未到付款节点不生成流水。</span>'
            +   '<strong>合计：<b>' + snapshot.totalPercent.toFixed(2) + '%</b> / <b>' + formatMoney(snapshot.totalAmount) + '</b></strong>'
            + '</div>';
    }

    function setText(selector, value) {
        var element = drawer.querySelector(selector);
        if (element) element.textContent = value || '--';
    }

    function setFeedback(message, type) {
        if (!feedback) return;
        feedback.textContent = message || '';
        feedback.classList.toggle('show', Boolean(message));
        feedback.classList.toggle('is-info', type === 'info');
    }

    function updateSubmitAction() {
        if (!form || !submitButtonText) return;
        var decision = form.elements.supplierContractApprovalResult.value;
        var electronic = activeOptions.signing === '电子签章';
        submitButtonText.textContent = decision === 'pass' ? (electronic ? '审核通过并前往签署' : '确认通过') : '确认不通过';
        if (submitButtonIcon) submitButtonIcon.textContent = decision === 'pass' ? (electronic ? 'draw' : 'check_circle') : 'block';
    }

    function closeDrawer() {
        if (!drawer || !drawer.classList.contains('show')) return;
        drawer.classList.remove('show');
        mask.classList.remove('show');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('supplier-contract-drawer-open');
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    }

    function createDrawer() {
        mask = document.createElement('div');
        mask.className = 'supplier-contract-drawer-mask';
        mask.setAttribute('data-supplier-contract-approval-mask', '');

        drawer = document.createElement('aside');
        drawer.className = 'supplier-contract-drawer supplier-contract-approval';
        drawer.setAttribute('data-supplier-contract-approval', '');
        drawer.setAttribute('role', 'dialog');
        drawer.setAttribute('aria-modal', 'true');
        drawer.setAttribute('aria-hidden', 'true');
        drawer.setAttribute('aria-labelledby', 'supplierContractApprovalTitle');
        drawer.innerHTML = ''
            + '<header class="supplier-contract-drawer-head">'
            +   '<button class="supplier-contract-drawer-close" type="button" aria-label="关闭合同审核弹窗" data-supplier-contract-approval-close>'
            +       '<span class="material-symbols-outlined" aria-hidden="true">close</span>'
            +   '</button>'
            +   '<h2 id="supplierContractApprovalTitle">审核并签署</h2>'
            + '</header>'
            + '<form class="supplier-contract-form" data-supplier-contract-approval-form>'
            +   '<div class="supplier-contract-drawer-body supplier-contract-approval-body">'
            +       '<div class="supplier-contract-feedback" role="alert" aria-live="polite" data-supplier-contract-approval-feedback></div>'
            +       '<section class="supplier-contract-approval-section">'
            +           '<div class="supplier-contract-approval-heading">'
            +               '<h3>合同基本信息</h3>'
            +               '<span class="supplier-contract-approval-status"><span class="material-symbols-outlined" aria-hidden="true">radio_button_unchecked</span><span data-contract-approval-status>待提供方审批</span></span>'
            +           '</div>'
            +           '<div class="supplier-contract-approval-info">'
            +               '<div><span>合同名称：</span><strong data-contract-approval-name></strong></div>'
            +               '<div><span>合同编号：</span><strong data-contract-approval-number></strong></div>'
            +               '<div><span>合同生效时间：</span><strong data-contract-approval-starts></strong></div>'
            +               '<div><span>合同失效时间：</span><strong data-contract-approval-ends></strong></div>'
            +               '<div><span>合同签署方式：</span><strong data-contract-approval-signing></strong></div>'
            +               '<div><span>签署截止时间：</span><strong data-contract-approval-deadline></strong></div>'
            +               '<div><span>合同来源：</span><strong data-contract-approval-source></strong></div>'
            +               '<div><span>关联订单：</span><strong data-contract-approval-order></strong></div>'
            +               '<div><span>当前审核方：</span><strong data-contract-approval-reviewer></strong></div>'
            +               '<div><span>关联发起方：</span><strong data-contract-approval-initiator></strong></div>'
            +               '<div class="is-full"><span>备注：</span><strong data-contract-approval-remark></strong></div>'
            +           '</div>'
            +       '</section>'
            +       '<section class="supplier-contract-approval-section supplier-contract-esign-summary" data-contract-approval-esign-summary>'
            +           '<div class="supplier-contract-approval-heading"><h3>电子签约信息</h3><span class="supplier-contract-approval-status is-info"><span class="material-symbols-outlined" aria-hidden="true">cloud_done</span><span data-contract-approval-task-status>签约任务进行中</span></span></div>'
            +           '<div class="supplier-contract-esign-grid">'
            +               '<div><span>制文方式</span><strong data-contract-approval-document-mode></strong><small data-contract-approval-template></small></div>'
            +               '<div><span>法大大任务编号</span><strong data-contract-approval-task-id></strong><small>签署结果以回调为准</small></div>'
            +               '<div><span>当前处理节点</span><strong data-contract-approval-current-node></strong><small>三方可独立完成审核与签署</small></div>'
            +               '<div><span>三方签署进度</span><strong data-contract-approval-progress></strong><small>运营方必须完成盖章</small></div>'
            +           '</div>'
            +           '<div class="supplier-contract-electronic-note"><span class="material-symbols-outlined" aria-hidden="true">info</span><p>审核通过后将跳转法大大完成意愿认证和电子签署；仅签署成功回调后，当前企业的审核与签署才算完成。<a href="user-center.html?menu=esign-service" target="_blank" data-contract-approval-open-service hidden>查看电子签章状态</a></p></div>'
            +       '</section>'
            +       '<section class="supplier-contract-approval-section">'
            +           '<div class="supplier-contract-approval-heading"><h3>合同文件</h3></div>'
            +           '<div class="supplier-contract-approval-file">'
            +               '<span class="material-symbols-outlined" aria-hidden="true">description</span>'
            +               '<strong data-contract-approval-file></strong>'
            +               '<button type="button" data-contract-approval-preview><span class="material-symbols-outlined" aria-hidden="true">visibility</span><span>预览</span></button>'
            +               '<button type="button" data-contract-approval-download><span class="material-symbols-outlined" aria-hidden="true">download</span><span>下载</span></button>'
            +           '</div>'
            +       '</section>'
            +       '<section class="supplier-contract-approval-section">'
            +           '<div class="supplier-contract-approval-heading"><h3>签署主体</h3></div>'
            +           '<div class="supplier-contract-signers supplier-contract-approval-signers">'
            +               '<div class="supplier-contract-signer-head"><span>主体类型</span><span>签署方角色</span><span>签署方名称</span><span>审核/签署状态</span></div>'
            +               '<div class="supplier-contract-signer-row"><span>法人</span><span>提供方</span><span data-contract-approval-provider></span><span data-contract-approval-provider-status></span></div>'
            +               '<div class="supplier-contract-signer-row"><span>法人</span><span>需求方</span><span data-contract-approval-demander></span><span data-contract-approval-demander-status></span></div>'
            +               '<div class="supplier-contract-signer-row"><span>法人</span><span>平台运营方</span><span data-contract-approval-operator></span><span data-contract-approval-operator-status></span></div>'
            +           '</div>'
            +       '</section>'
            +       '<section class="supplier-contract-approval-section supplier-contract-approval-payment-section">'
            +           '<div class="supplier-contract-payment-terms supplier-contract-approval-payment" data-contract-approval-payment></div>'
            +       '</section>'
            +       '<section class="supplier-contract-approval-section">'
            +           '<div class="supplier-contract-approval-heading"><h3>审批</h3></div>'
            +           '<div class="supplier-contract-approval-form-row is-required">'
            +               '<div class="supplier-contract-approval-label">审批结果</div>'
            +               '<div class="supplier-contract-radio-group">'
            +                   '<label class="supplier-contract-radio"><input type="radio" name="supplierContractApprovalResult" value="pass" checked><span>通过</span></label>'
            +                   '<label class="supplier-contract-radio"><input type="radio" name="supplierContractApprovalResult" value="reject"><span>不通过</span></label>'
            +               '</div>'
            +           '</div>'
            +           '<div class="supplier-contract-approval-form-row is-top-aligned">'
            +               '<label class="supplier-contract-approval-label" for="supplierContractApprovalOpinion">审批意见</label>'
            +               '<div class="supplier-contract-approval-opinion">'
            +                   '<textarea id="supplierContractApprovalOpinion" maxlength="400" placeholder="请输入审批意见" data-contract-approval-opinion></textarea>'
            +                   '<span><b data-contract-approval-opinion-count>0</b>/400</span>'
            +               '</div>'
            +           '</div>'
            +       '</section>'
            +   '</div>'
            +   '<footer class="supplier-contract-drawer-foot">'
            +       '<button class="supplier-contract-button" type="button" data-supplier-contract-approval-close><span class="material-symbols-outlined" aria-hidden="true">close</span><span>取消</span></button>'
            +       '<button class="supplier-contract-button is-primary" type="submit"><span class="material-symbols-outlined" aria-hidden="true" data-contract-approval-submit-icon>draw</span><span data-contract-approval-submit-text>审核通过并签署</span></button>'
            +   '</footer>'
            + '</form>';

        document.body.appendChild(mask);
        document.body.appendChild(drawer);

        form = drawer.querySelector('[data-supplier-contract-approval-form]');
        feedback = drawer.querySelector('[data-supplier-contract-approval-feedback]');
        opinionInput = drawer.querySelector('[data-contract-approval-opinion]');
        opinionCount = drawer.querySelector('[data-contract-approval-opinion-count]');
        submitButtonText = drawer.querySelector('[data-contract-approval-submit-text]');
        submitButtonIcon = drawer.querySelector('[data-contract-approval-submit-icon]');

        mask.addEventListener('click', closeDrawer);
        drawer.querySelectorAll('[data-supplier-contract-approval-close]').forEach(function (button) {
            button.addEventListener('click', closeDrawer);
        });
        drawer.querySelector('[data-contract-approval-preview]').addEventListener('click', function () {
            setFeedback('原型示例：已打开合同文件预览。', 'info');
        });
        drawer.querySelector('[data-contract-approval-download]').addEventListener('click', function () {
            setFeedback('原型示例：合同文件已加入下载队列。', 'info');
        });
        opinionInput.addEventListener('input', function () {
            opinionCount.textContent = this.value.length;
            this.classList.remove('is-invalid');
            if (feedback.classList.contains('show')) setFeedback('');
        });
        drawer.querySelectorAll('input[name="supplierContractApprovalResult"]').forEach(function (radio) {
            radio.addEventListener('change', function () {
                opinionInput.classList.remove('is-invalid');
                setFeedback('');
                updateSubmitAction();
            });
        });
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var decision = form.elements.supplierContractApprovalResult.value;
            var opinion = opinionInput.value.trim();
            if (decision === 'reject' && !opinion) {
                opinionInput.classList.add('is-invalid');
                setFeedback('审批不通过时，请填写审批意见。');
                opinionInput.focus();
                return;
            }
            var onConfirm = activeOptions.onConfirm;
            var onSignResult = activeOptions.onSignResult;
            var optionsForTask = activeOptions;
            var result = {
                orderNo: activeOptions.orderNo || '',
                contractNo: drawer.querySelector('[data-contract-approval-number]').textContent,
                decision: decision,
                opinion: opinion,
                requiresSignature: decision === 'pass' && activeOptions.signing === '电子签章',
                signatureStatus: decision === 'pass' && activeOptions.signing === '电子签章' ? 'waiting_signature' : '',
                taskId: activeOptions.signing === '电子签章' ? (activeOptions.taskId || ('FDD-' + String(activeOptions.orderNo || '').slice(-10))) : ''
            };
            if (result.requiresSignature && !window.FadadaSignDemo) {
                setFeedback('电子签署页面暂不可用，请刷新页面后重试。');
                return;
            }
            if (result.requiresSignature && window.FadadaSignDemo) {
                if (!activeOptions.demoMode && (!window.ESignServiceState || !window.ESignServiceState.isReady())) {
                    setFeedback('当前企业电子签章服务尚未就绪，请前往用户中心查看状态，并进入法大大完成企业认证或授权。');
                    return;
                }
                var reviewerRole = activeOptions.reviewerRole || '提供方';
                var reviewerParty = reviewerRole === '平台运营方'
                    ? (activeOptions.operator || PLATFORM_OPERATOR_NAME)
                    : (reviewerRole === '需求方' ? activeOptions.demander : activeOptions.provider);
                var launchResult = window.FadadaSignDemo.open({
                    taskId: result.taskId,
                    contractName: drawer.querySelector('[data-contract-approval-name]').textContent,
                    contractNo: result.contractNo,
                    orderNo: result.orderNo,
                    role: reviewerRole,
                    party: reviewerParty,
                    node: '审核通过并签署',
                    businessType: activeOptions.businessType,
                    sourceMenu: activeOptions.sourceMenu,
                    returnUrl: activeOptions.returnUrl || window.location.href,
                    signUrl: activeOptions.signUrl,
                    onResult: function (signResult) {
                        if (typeof onSignResult === 'function') onSignResult(signResult, result, optionsForTask);
                    }
                });
                if (!launchResult.windowRef) {
                    setFeedback('浏览器阻止了法大大签署页面，请允许打开新窗口后重试。');
                    return;
                }
            }
            closeDrawer();
            if (typeof onConfirm === 'function') onConfirm(result);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && drawer.classList.contains('show')) closeDrawer();
        });
    }

    function populate(options) {
        var dates = getContractDates(options.appliedAt);
        var contractName = options.contractName || ((options.itemName || '数据交易') + '三方交易合同');
        var contractNumber = options.contractNo || buildContractNumber(options);
        var reviewerRole = options.reviewerRole || '提供方';
        var electronic = options.signing === '电子签章';
        setText('#supplierContractApprovalTitle', electronic ? '审核并签署' : '合同审核');
        var esignReady = Boolean(options.demoMode) || (window.ESignServiceState && window.ESignServiceState.isReady());
        var electronicSummary = drawer.querySelector('[data-contract-approval-esign-summary]');
        if (electronicSummary) electronicSummary.hidden = !electronic;
        var openServiceLink = drawer.querySelector('[data-contract-approval-open-service]');
        if (openServiceLink) openServiceLink.hidden = !electronic || Boolean(esignReady);
        setText('[data-contract-approval-status]', options.approvalStatus || ('待' + reviewerRole + (electronic ? '审核并签署' : '审批')));
        setText('[data-contract-approval-name]', contractName);
        setText('[data-contract-approval-number]', contractNumber);
        setText('[data-contract-approval-starts]', options.startsAt || dates.startsAt);
        setText('[data-contract-approval-ends]', options.endsAt || dates.endsAt);
        setText('[data-contract-approval-signing]', options.signing || '线下签署');
        setText('[data-contract-approval-deadline]', options.signingDeadline || '2026-07-31');
        setText('[data-contract-approval-source]', options.source || ((options.initiatorRole || '需求方') + '提交关联'));
        setText('[data-contract-approval-order]', options.orderNo);
        setText('[data-contract-approval-reviewer]', reviewerRole);
        setText('[data-contract-approval-initiator]', options.initiatorRole || '需求方');
        setText('[data-contract-approval-remark]', options.remark || '--');
        setText('[data-contract-approval-file]', options.fileName || (contractName + '.pdf'));
        setText('[data-contract-approval-provider]', options.provider || '深圳市龙岗数智科技有限公司');
        setText('[data-contract-approval-demander]', options.demander);
        setText('[data-contract-approval-operator]', options.operator || PLATFORM_OPERATOR_NAME);
        setText('[data-contract-approval-document-mode]', options.documentMode === 'pdf' ? '上传待签PDF' : '法大大模板生成');
        setText('[data-contract-approval-template]', options.documentMode === 'pdf' ? (options.fileName || contractName + '.pdf') : (options.templateName || '数据交易三方合同（V3.2）'));
        setText('[data-contract-approval-task-id]', options.taskId || ('FDD-' + String(options.orderNo || '').slice(-10)));
        setText('[data-contract-approval-task-status]', options.taskStatus || '签约任务进行中');
        setText('[data-contract-approval-current-node]', options.currentNode || ('待' + reviewerRole + (electronic ? '审核并签署' : '审批')));
        setText('[data-contract-approval-progress]', options.signProgress || (electronic ? '1/3 已签署' : '线下合同已上传'));
        var readinessLabel = electronic && !esignReady && window.ESignServiceState
            ? window.ESignServiceState.getMeta().label
            : '';
        setText('[data-contract-approval-provider-status]', options.providerSignStatus || (reviewerRole === '提供方' ? (readinessLabel || (electronic ? '待审核并签署' : '待审批')) : (electronic ? '已审核并签署' : '已提交')));
        setText('[data-contract-approval-demander-status]', options.demanderSignStatus || (reviewerRole === '需求方' ? (readinessLabel || (electronic ? '待审核并签署' : '待审批')) : (electronic ? '已审核并签署' : '已提交')));
        setText('[data-contract-approval-operator-status]', options.operatorSignStatus || (reviewerRole === '平台运营方' ? (readinessLabel || (electronic ? '待审核并签署' : '待审核')) : (electronic ? '待审核并签署' : '待审核')));
        renderPaymentTerms(options);

        form.reset();
        form.elements.supplierContractApprovalResult.value = 'pass';
        opinionInput.value = '';
        opinionCount.textContent = '0';
        opinionInput.classList.remove('is-invalid');
        setFeedback('');
        updateSubmitAction();
    }

    function openDrawer(options) {
        if (!drawer) createDrawer();
        activeOptions = options || {};
        lastFocusedElement = document.activeElement;
        populate(activeOptions);
        mask.classList.add('show');
        drawer.classList.add('show');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.classList.add('supplier-contract-drawer-open');
        window.setTimeout(function () {
            var checkedRadio = form.querySelector('input[name="supplierContractApprovalResult"]:checked');
            if (checkedRadio) checkedRadio.focus();
        }, 60);
    }

    window.SupplierContractApproval = {
        open: openDrawer,
        close: closeDrawer
    };
})();
