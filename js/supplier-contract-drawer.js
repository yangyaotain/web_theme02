(function () {
    if (window.SupplierContractDrawer) return;

    var drawer;
    var mask;
    var form;
    var orderInput;
    var contractNumberInput;
    var contractNameInput;
    var providerCell;
    var demanderCell;
    var operatorSignerRow;
    var signedAtInput;
    var startsAtInput;
    var endsAtInput;
    var remarkInput;
    var remarkCount;
    var fileInput;
    var uploadButton;
    var uploadHint;
    var feedback;
    var paymentTerms;
    var paymentMode = 'installment';
    var paymentStages = [];
    var paymentStageSeed = 0;
    var orderServiceFeeRate = 3;
    var selectedFiles = [];
    var activeOptions = {};
    var lastFocusedElement;
    var PLATFORM_OPERATOR_NAME = '深圳市龙岗区数据要素交易服务有限公司';

    function isSelfOperated() {
        return String(activeOptions.provider || '') === PLATFORM_OPERATOR_NAME;
    }

    function formatDate(date) {
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        return year + '-' + month + '-' + day;
    }

    function parseDate(value) {
        var parts = String(value || '').split('-').map(Number);
        if (parts.length !== 3 || parts.some(function (part) { return !part; })) return new Date();
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    function addDays(value, days) {
        var date = parseDate(value);
        date.setDate(date.getDate() + days);
        return formatDate(date);
    }

    function addYears(value, years) {
        var date = parseDate(value);
        date.setFullYear(date.getFullYear() + years);
        return formatDate(date);
    }

    function parseMoney(value) {
        var amount = Number(String(value == null ? '' : value).replace(/[^\d.-]/g, ''));
        return Number.isFinite(amount) ? amount : 0;
    }

    function formatMoney(value) {
        return '¥' + Number(value || 0).toFixed(2);
    }

    function createStage(name, percent) {
        paymentStageSeed += 1;
        return { id: paymentStageSeed, name: name, percent: percent, amount: 0, payStatus: '待发起', outTradeNo: '' };
    }

    function recalculateStageAmounts() {
        var totalCents = Math.round(parseMoney(activeOptions.amount) * 100);
        var allocatedCents = 0;
        paymentStages.forEach(function (stage, index) {
            var cents = index === paymentStages.length - 1
                ? Math.max(0, totalCents - allocatedCents)
                : Math.round(totalCents * Number(stage.percent || 0) / 100);
            stage.amount = cents / 100;
            allocatedCents += cents;
        });
    }

    function resetPaymentTerms() {
        paymentMode = activeOptions.businessType === 'service' ? 'installment' : 'once';
        if (paymentMode === 'installment') {
            paymentStages = [
                createStage('首期款', 30),
                createStage('阶段款', 40),
                createStage('尾款', 30)
            ];
        } else {
            paymentStages = [createStage('一次性付款', 100)];
        }
        recalculateStageAmounts();
    }

    function renderPaymentTerms() {
        if (!paymentTerms) return;
        var existing = form.elements.supplierContractRelation.value === 'existing';
        var isService = activeOptions.businessType === 'service';
        var selfOperated = isSelfOperated();
        var totalAmount = parseMoney(activeOptions.amount);
        var serviceFee = selfOperated ? 0 : orderServiceFeeRate;
        var calculatedServiceFee = Number.isFinite(serviceFee) ? serviceFee : 0;
        var displayOnlyPlan = existing || paymentMode === 'once';
        var hasStageActions = paymentMode === 'installment' && !existing;
        var rows = paymentStages.map(function (stage, index) {
            var stageFee = Number(stage.amount || 0) * calculatedServiceFee / 100;
            var providerNet = Number(stage.amount || 0) - stageFee;
            var stageName = displayOnlyPlan
                ? '<span class="supplier-contract-stage-value">' + stage.name + '</span>'
                : '<input type="text" value="' + stage.name + '" maxlength="20" data-stage-name aria-label="第' + (index + 1) + '期名称">';
            var stagePercent = displayOnlyPlan
                ? '<strong class="supplier-contract-stage-value is-percent">' + Number(stage.percent || 0).toFixed(2) + '%</strong>'
                : '<div class="supplier-contract-stage-suffix"><input type="number" min="0.01" max="100" step="0.01" value="' + stage.percent + '" data-stage-percent aria-label="第' + (index + 1) + '期付款比例"><i>%</i></div>';
            return ''
                + '<div class="supplier-contract-stage-row" data-stage-id="' + stage.id + '">'
                +   '<span class="supplier-contract-stage-index">' + (index + 1) + '</span>'
                +   stageName
                +   stagePercent
                +   '<strong class="supplier-contract-stage-calculated" data-stage-amount>' + formatMoney(stage.amount) + '</strong>'
                +   (selfOperated ? '' : '<strong class="supplier-contract-stage-money" data-stage-fee>' + formatMoney(stageFee) + '</strong><strong class="supplier-contract-stage-money is-net" data-stage-net>' + formatMoney(providerNet) + '</strong>')
                +   '<strong class="supplier-contract-stage-status">' + stage.payStatus + '</strong>'
                +   (hasStageActions ? (paymentStages.length > 2 ? '<button type="button" data-stage-remove="' + stage.id + '" aria-label="删除第' + (index + 1) + '期"><span class="material-symbols-outlined" aria-hidden="true">delete</span></button>' : '<span></span>') : '')
                + '</div>';
        }).join('');

        paymentTerms.innerHTML = ''
            + '<div class="supplier-contract-payment-head">'
            +   '<div><strong>' + (selfOperated ? '付款条款' : '付款与分账条款') + '</strong><p>' + (selfOperated ? '合同签订时冻结本订单的付款计划。' : '合同签订时冻结本订单的付款计划和平台服务费规则。') + '</p></div>'
            +   '<span class="supplier-contract-freeze"><span class="material-symbols-outlined" aria-hidden="true">lock</span>签订后冻结</span>'
            + '</div>'
            + '<div class="supplier-contract-payment-summary' + (selfOperated ? ' is-self-operated' : '') + '">'
            +   '<div><span>合同金额</span><strong>' + formatMoney(totalAmount) + '</strong></div>'
            +   (selfOperated ? '' : '<div><span>平台服务费比例</span><div class="supplier-contract-fee-rate-field"><input type="number" min="0" max="100" step="0.01" value="' + (Number.isFinite(serviceFee) ? serviceFee.toFixed(2) : '') + '" data-contract-service-fee' + (existing ? ' disabled' : '') + ' aria-label="平台服务费比例"><i>%</i></div><small>' + (existing ? '合同已冻结，按合同约定比例执行' : '默认由运营中心服务费规则带入，本订单可调整') + '</small></div>')
            +   '<div><span>结算方式</span><strong>' + (isService ? '按合同付款计划支付' : '订单一次性支付') + '</strong><small>' + (selfOperated ? '运营方统一收款，不发起对外分账' : '支付成功后按订单发起分账') + '</small></div>'
            +   (selfOperated ? '<div><span>经营属性</span><strong>运营方自营</strong><small>提供方与收款方均为运营方</small></div>' : '<div><span>提供方预计实收</span><strong data-contract-provider-net>' + formatMoney(totalAmount * (100 - calculatedServiceFee) / 100) + '</strong><small>合同金额扣除平台服务费</small></div>')
            + '</div>'
            + (isService ? ''
                + '<div class="supplier-contract-payment-mode">'
                +   '<span>付款方式</span>'
                +   '<label><input type="radio" name="supplierPaymentMode" value="once"' + (paymentMode === 'once' ? ' checked' : '') + (existing ? ' disabled' : '') + '>一次性付款</label>'
                +   '<label><input type="radio" name="supplierPaymentMode" value="installment"' + (paymentMode === 'installment' ? ' checked' : '') + (existing ? ' disabled' : '') + '>分期付款</label>'
                +   (paymentMode === 'installment' ? '<button type="button" data-stage-add' + (existing ? ' disabled' : '') + '><span class="material-symbols-outlined" aria-hidden="true">add</span>增加阶段</button>' : '')
            + '</div>' : '')
            + '<div class="supplier-contract-stage-table' + (selfOperated ? ' is-self-operated' : '') + (hasStageActions ? ' has-stage-actions' : '') + (displayOnlyPlan ? ' is-display-only' : '') + '">'
            +   '<div class="supplier-contract-stage-head"><span>期次</span><span>阶段名称</span><span>付款比例</span><span>付款金额</span>' + (selfOperated ? '' : '<span>平台服务费</span><span>提供方实收</span>') + '<span>支付状态</span>' + (hasStageActions ? '<span>操作</span>' : '') + '</div>'
            +   rows
            + '</div>'
            + '<div class="supplier-contract-payment-foot">'
            +   '<span><span class="material-symbols-outlined" aria-hidden="true">info</span>每一期在到达付款节点后独立生成支付流水号并发起支付，未到付款节点不生成流水。</span>'
            +   '<strong>合计：<b data-payment-percent-total>' + paymentStages.reduce(function (sum, item) { return sum + Number(item.percent || 0); }, 0).toFixed(2) + '%</b> / <b data-payment-amount-total>' + formatMoney(paymentStages.reduce(function (sum, item) { return sum + Number(item.amount || 0); }, 0)) + '</b></strong>'
            + '</div>';
        paymentTerms.classList.toggle('is-readonly', existing);
    }

    function refreshPaymentTotals(updateAmounts) {
        if (updateAmounts) {
            recalculateStageAmounts();
            paymentTerms.querySelectorAll('[data-stage-row], [data-stage-id]').forEach(function (row) {
                var stage = paymentStages.find(function (item) { return String(item.id) === String(row.dataset.stageId); });
                var amountTarget = row.querySelector('[data-stage-amount]');
                if (stage && amountTarget) amountTarget.textContent = formatMoney(stage.amount);
            });
        }
        var serviceFee = isSelfOperated() ? 0 : orderServiceFeeRate;
        var calculatedServiceFee = Number.isFinite(serviceFee) ? serviceFee : 0;
        paymentTerms.querySelectorAll('[data-stage-id]').forEach(function (row) {
            var stage = paymentStages.find(function (item) { return String(item.id) === String(row.dataset.stageId); });
            if (!stage) return;
            var fee = Number(stage.amount || 0) * calculatedServiceFee / 100;
            var feeTarget = row.querySelector('[data-stage-fee]');
            var netTarget = row.querySelector('[data-stage-net]');
            if (feeTarget) feeTarget.textContent = formatMoney(fee);
            if (netTarget) netTarget.textContent = formatMoney(Number(stage.amount || 0) - fee);
        });
        var percentTotal = paymentStages.reduce(function (sum, stage) { return sum + Number(stage.percent || 0); }, 0);
        var amountTotal = paymentStages.reduce(function (sum, stage) { return sum + Number(stage.amount || 0); }, 0);
        var percentCell = paymentTerms.querySelector('[data-payment-percent-total]');
        var amountCell = paymentTerms.querySelector('[data-payment-amount-total]');
        var providerNetCell = paymentTerms.querySelector('[data-contract-provider-net]');
        if (percentCell) percentCell.textContent = percentTotal.toFixed(2) + '%';
        if (amountCell) amountCell.textContent = formatMoney(amountTotal);
        if (providerNetCell) providerNetCell.textContent = formatMoney(parseMoney(activeOptions.amount) * (100 - calculatedServiceFee) / 100);
        paymentTerms.classList.remove('is-invalid');
        setFeedback('');
    }

    function setFeedback(message) {
        feedback.textContent = message || '';
        feedback.classList.toggle('show', Boolean(message));
    }

    function clearInvalidState() {
        drawer.querySelectorAll('.is-invalid').forEach(function (element) {
            element.classList.remove('is-invalid');
        });
        setFeedback('');
    }

    function updateDateMinimums() {
        startsAtInput.min = signedAtInput.value || '';

        if (signedAtInput.value && startsAtInput.value && startsAtInput.value < signedAtInput.value) {
            startsAtInput.value = signedAtInput.value;
        }
        endsAtInput.min = startsAtInput.value || signedAtInput.value || '';
        if (startsAtInput.value && endsAtInput.value && endsAtInput.value < startsAtInput.value) {
            endsAtInput.value = addYears(startsAtInput.value, 1);
        }
    }

    function buildNewContractPreset() {
        var appliedDate = String(activeOptions.appliedAt || '').slice(0, 10);
        var baseDate = /^\d{4}-\d{2}-\d{2}$/.test(appliedDate) ? appliedDate : formatDate(new Date());
        var signedDate = addDays(baseDate, 1);
        var startDate = signedDate;
        var typeCode = activeOptions.businessType === 'service' ? 'FW' : 'CP';
        var orderSuffix = String(activeOptions.orderNo || '').slice(-6) || '000001';

        return {
            number: 'LG-' + typeCode + '-' + baseDate.replace(/-/g, '') + '-' + orderSuffix,
            name: (activeOptions.itemName || '数据要素交易') + '交易合同',
            signedAt: signedDate,
            startsAt: startDate,
            endsAt: addYears(startDate, 1)
        };
    }

    function applyContractPreset(preset, readOnly) {
        contractNumberInput.value = preset.number;
        contractNameInput.value = preset.name;
        signedAtInput.value = preset.signedAt;
        startsAtInput.value = preset.startsAt;
        endsAtInput.value = preset.endsAt;
        contractNumberInput.readOnly = readOnly;
        contractNameInput.readOnly = readOnly;
        signedAtInput.readOnly = readOnly;
        startsAtInput.readOnly = readOnly;
        endsAtInput.readOnly = readOnly;
        contractNumberInput.classList.toggle('is-readonly', readOnly);
        contractNameInput.classList.toggle('is-readonly', readOnly);
        drawer.querySelectorAll('.supplier-contract-date-field').forEach(function (field) {
            field.classList.toggle('is-readonly', readOnly);
        });
        updateDateMinimums();
    }

    function updateUploadState() {
        if (!selectedFiles.length) {
            uploadHint.textContent = '最多上传10个附件，支持doc/docx/pdf/png/jpg/jpeg格式，单个文件不超过5M';
            uploadHint.classList.remove('has-files');
            return;
        }
        uploadHint.textContent = '已选择' + selectedFiles.length + '个文件：' + selectedFiles.map(function (file) { return file.name; }).join('、');
        uploadHint.classList.add('has-files');
    }

    function validateSelectedFiles(files) {
        var allowedExtensions = ['doc', 'docx', 'pdf', 'png', 'jpg', 'jpeg'];
        if (files.length > 10) return '最多只能上传10个附件。';

        for (var index = 0; index < files.length; index += 1) {
            var file = files[index];
            var extension = String(file.name || '').split('.').pop().toLowerCase();
            if (allowedExtensions.indexOf(extension) === -1) {
                return '文件“' + file.name + '”格式不支持，请上传doc、docx、pdf、png、jpg或jpeg文件。';
            }
            if (file.size > 5 * 1024 * 1024) {
                return '文件“' + file.name + '”超过5M，请重新选择。';
            }
        }
        return '';
    }

    function applyRelationMode(value) {
        var existing = value === 'existing';
        clearInvalidState();
        selectedFiles = [];
        fileInput.value = '';
        uploadButton.disabled = existing;

        if (existing) {
            applyContractPreset({
                number: 'HJU-0001',
                name: '企业扶持政策合同',
                signedAt: '2026-06-04',
                startsAt: '2026-06-04',
                endsAt: '2027-06-30'
            }, true);
            uploadHint.textContent = '已关联合同文件：企业扶持政策合同.pdf';
            uploadHint.classList.add('has-files');
        } else {
            applyContractPreset(buildNewContractPreset(), false);
            updateUploadState();
        }
        renderPaymentTerms();
    }

    function validateForm() {
        clearInvalidState();
        var relation = form.elements.supplierContractRelation.value;
        var invalidElement = null;
        var message = '';

        if (!contractNameInput.value.trim()) {
            contractNameInput.classList.add('is-invalid');
            invalidElement = contractNameInput;
            message = '请输入合同名称。';
        } else if (!signedAtInput.value || !startsAtInput.value || !endsAtInput.value) {
            [signedAtInput, startsAtInput, endsAtInput].forEach(function (input) {
                if (!input.value) input.parentElement.classList.add('is-invalid');
            });
            invalidElement = !signedAtInput.value ? signedAtInput : (!startsAtInput.value ? startsAtInput : endsAtInput);
            message = '请选择完整的合同签署、生效和结束日期。';
        } else if (startsAtInput.value < signedAtInput.value) {
            startsAtInput.parentElement.classList.add('is-invalid');
            invalidElement = startsAtInput;
            message = '合同生效时间不能早于合同签署时间。';
        } else if (endsAtInput.value < startsAtInput.value) {
            endsAtInput.parentElement.classList.add('is-invalid');
            invalidElement = endsAtInput;
            message = '合同结束时间不能早于合同生效时间。';
        } else if (!isSelfOperated() && (!Number.isFinite(orderServiceFeeRate) || orderServiceFeeRate < 0 || orderServiceFeeRate > 100)) {
            var serviceFeeInput = paymentTerms.querySelector('[data-contract-service-fee]');
            if (serviceFeeInput) serviceFeeInput.classList.add('is-invalid');
            invalidElement = serviceFeeInput;
            message = '平台服务费比例应在0%至100%之间。';
        } else if (Math.abs(paymentStages.reduce(function (sum, stage) { return sum + Number(stage.percent || 0); }, 0) - 100) > 0.001) {
            paymentTerms.classList.add('is-invalid');
            invalidElement = paymentTerms.querySelector('[data-stage-percent]');
            message = '付款比例合计必须等于100%。';
        } else if (Math.abs(paymentStages.reduce(function (sum, stage) { return sum + Number(stage.amount || 0); }, 0) - parseMoney(activeOptions.amount)) > 0.009) {
            paymentTerms.classList.add('is-invalid');
            invalidElement = paymentTerms.querySelector('[data-stage-amount]');
            message = '各期付款金额合计必须等于合同金额。';
        } else if (relation === 'new' && !selectedFiles.length) {
            uploadButton.classList.add('is-invalid');
            invalidElement = uploadButton;
            message = '请上传已签署的合同文件。';
        }

        if (message) {
            setFeedback(message);
            if (invalidElement) invalidElement.focus();
            return false;
        }
        return true;
    }

    function collectFormValues() {
        return {
            orderNo: orderInput.value,
            relation: form.elements.supplierContractRelation.value,
            signing: form.elements.supplierContractSigning.value,
            contractNo: contractNumberInput.value.trim(),
            contractName: contractNameInput.value.trim(),
            signedAt: signedAtInput.value,
            startsAt: startsAtInput.value,
            endsAt: endsAtInput.value,
            contractAmount: parseMoney(activeOptions.amount),
            serviceFeeRate: orderServiceFeeRate,
            paymentMode: paymentMode,
            paymentStages: paymentStages.map(function (stage, index) {
                return {
                    periodNo: index + 1,
                    periodName: stage.name,
                    percent: Number(stage.percent),
                    amount: Number(stage.amount),
                    payStatus: stage.payStatus,
                    outTradeNo: stage.outTradeNo
                };
            }),
            files: selectedFiles.map(function (file) { return file.name; }),
            remark: remarkInput.value.trim()
        };
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
        mask.setAttribute('data-supplier-contract-mask', '');

        drawer = document.createElement('aside');
        drawer.className = 'supplier-contract-drawer';
        drawer.setAttribute('data-supplier-contract-drawer', '');
        drawer.setAttribute('role', 'dialog');
        drawer.setAttribute('aria-modal', 'true');
        drawer.setAttribute('aria-hidden', 'true');
        drawer.setAttribute('aria-labelledby', 'supplierContractDrawerTitle');
        drawer.innerHTML = ''
            + '<header class="supplier-contract-drawer-head">'
            +   '<button class="supplier-contract-drawer-close" type="button" aria-label="关闭关联合同抽屉" data-supplier-contract-close>'
            +       '<span class="material-symbols-outlined" aria-hidden="true">close</span>'
            +   '</button>'
            +   '<h2 id="supplierContractDrawerTitle">关联合同</h2>'
            + '</header>'
            + '<form class="supplier-contract-form" data-supplier-contract-form>'
            +   '<div class="supplier-contract-drawer-body">'
            +       '<div class="supplier-contract-feedback" role="alert" aria-live="polite" data-supplier-contract-feedback></div>'
            +       '<div class="supplier-contract-form-row is-required">'
            +           '<label class="supplier-contract-form-label" for="supplierContractOrderNo">关联订单</label>'
            +           '<input class="supplier-contract-input" id="supplierContractOrderNo" type="text" disabled data-supplier-contract-order>'
            +       '</div>'
            +       '<div class="supplier-contract-form-row is-required">'
            +           '<div class="supplier-contract-form-label">关联方式</div>'
            +           '<div class="supplier-contract-radio-group">'
            +               '<label class="supplier-contract-radio"><input type="radio" name="supplierContractRelation" value="new" checked><span>关联新合同</span></label>'
            +               '<label class="supplier-contract-radio"><input type="radio" name="supplierContractRelation" value="existing"><span>关联已有合同</span></label>'
            +           '</div>'
            +       '</div>'
            +       '<div class="supplier-contract-form-row is-required">'
            +           '<div class="supplier-contract-form-label">签署方式</div>'
            +           '<div class="supplier-contract-radio-group">'
            +               '<label class="supplier-contract-radio"><input type="radio" name="supplierContractSigning" value="offline" checked><span>线下签署</span></label>'
            +               '<label class="supplier-contract-radio is-disabled"><input type="radio" name="supplierContractSigning" value="electronic" disabled><span>电子签章</span></label>'
            +           '</div>'
            +       '</div>'
            +       '<div class="supplier-contract-form-row">'
            +           '<label class="supplier-contract-form-label" for="supplierContractNo">合同编号</label>'
            +           '<input class="supplier-contract-input" id="supplierContractNo" type="text" placeholder="请输入合同编号" autocomplete="off" data-supplier-contract-number>'
            +       '</div>'
            +       '<div class="supplier-contract-form-row is-required">'
            +           '<label class="supplier-contract-form-label" for="supplierContractName">合同名称</label>'
            +           '<input class="supplier-contract-input" id="supplierContractName" type="text" placeholder="请输入合同名称" autocomplete="off" data-supplier-contract-name>'
            +       '</div>'
            +       '<div class="supplier-contract-form-row is-top-aligned">'
            +           '<div class="supplier-contract-form-label">签署主体</div>'
            +           '<div class="supplier-contract-signers">'
            +               '<div class="supplier-contract-signer-head"><span>主体类型</span><span>签署方角色</span><span>签署方名称</span></div>'
            +               '<div class="supplier-contract-signer-row"><span>法人</span><span>提供方</span><span data-supplier-contract-provider>深圳市龙岗数智科技有限公司</span></div>'
            +               '<div class="supplier-contract-signer-row"><span>法人</span><span>需求方</span><span data-supplier-contract-demander>产品需求方测试X</span></div>'
            +               '<div class="supplier-contract-signer-row" data-supplier-contract-operator><span>法人</span><span>平台运营方</span><span>' + PLATFORM_OPERATOR_NAME + '</span></div>'
            +           '</div>'
            +       '</div>'
            +       '<div class="supplier-contract-form-row is-required">'
            +           '<label class="supplier-contract-form-label" for="supplierContractSignedAt">合同签署时间</label>'
            +           '<div class="supplier-contract-date-field"><input id="supplierContractSignedAt" type="date" autocomplete="off" data-supplier-contract-signed-at><button type="button" aria-label="选择合同签署日期" data-supplier-contract-date-button><span class="material-symbols-outlined" aria-hidden="true">calendar_month</span></button></div>'
            +       '</div>'
            +       '<div class="supplier-contract-form-row is-required">'
            +           '<label class="supplier-contract-form-label" for="supplierContractStartsAt">合同生效时间</label>'
            +           '<div class="supplier-contract-date-field"><input id="supplierContractStartsAt" type="date" autocomplete="off" data-supplier-contract-starts-at><button type="button" aria-label="选择合同生效日期" data-supplier-contract-date-button><span class="material-symbols-outlined" aria-hidden="true">calendar_month</span></button></div>'
            +       '</div>'
            +       '<div class="supplier-contract-form-row is-required">'
            +           '<label class="supplier-contract-form-label supplier-contract-label-with-help" for="supplierContractEndsAt">合同结束时间<span class="material-symbols-outlined" title="合同结束时间应晚于合同生效时间" aria-hidden="true">help_outline</span></label>'
            +           '<div class="supplier-contract-date-field"><input id="supplierContractEndsAt" type="date" autocomplete="off" data-supplier-contract-ends-at><button type="button" aria-label="选择合同结束日期" data-supplier-contract-date-button><span class="material-symbols-outlined" aria-hidden="true">calendar_month</span></button></div>'
            +       '</div>'
            +       '<div class="supplier-contract-payment-terms" data-supplier-contract-payment></div>'
            +       '<div class="supplier-contract-form-row is-required is-top-aligned">'
            +           '<label class="supplier-contract-form-label supplier-contract-label-with-help" for="supplierContractFile">合同文件<span class="material-symbols-outlined" title="上传已签署的合同文件" aria-hidden="true">help_outline</span></label>'
            +           '<div class="supplier-contract-upload">'
            +               '<input class="supplier-contract-file-input" id="supplierContractFile" type="file" accept=".doc,.docx,.pdf,.png,.jpg,.jpeg" multiple data-supplier-contract-file>'
            +               '<button class="supplier-contract-upload-button" type="button" data-supplier-contract-upload>上传文件</button>'
            +               '<p data-supplier-contract-upload-hint>最多上传10个附件，支持doc/docx/pdf/png/jpg/jpeg格式，单个文件不超过5M</p>'
            +           '</div>'
            +       '</div>'
            +       '<div class="supplier-contract-form-row is-top-aligned">'
            +           '<label class="supplier-contract-form-label" for="supplierContractRemark">备注</label>'
            +           '<div class="supplier-contract-remark">'
            +               '<textarea id="supplierContractRemark" maxlength="400" placeholder="请输入备注信息" data-supplier-contract-remark></textarea>'
            +               '<span><b data-supplier-contract-remark-count>0</b>/400</span>'
            +           '</div>'
            +       '</div>'
            +   '</div>'
            +   '<footer class="supplier-contract-drawer-foot">'
            +       '<button class="supplier-contract-button" type="button" data-supplier-contract-close>取消</button>'
            +       '<button class="supplier-contract-button is-primary" type="submit">确定</button>'
            +   '</footer>'
            + '</form>';

        document.body.appendChild(mask);
        document.body.appendChild(drawer);

        form = drawer.querySelector('[data-supplier-contract-form]');
        orderInput = drawer.querySelector('[data-supplier-contract-order]');
        contractNumberInput = drawer.querySelector('[data-supplier-contract-number]');
        contractNameInput = drawer.querySelector('[data-supplier-contract-name]');
        providerCell = drawer.querySelector('[data-supplier-contract-provider]');
        demanderCell = drawer.querySelector('[data-supplier-contract-demander]');
        operatorSignerRow = drawer.querySelector('[data-supplier-contract-operator]');
        signedAtInput = drawer.querySelector('[data-supplier-contract-signed-at]');
        startsAtInput = drawer.querySelector('[data-supplier-contract-starts-at]');
        endsAtInput = drawer.querySelector('[data-supplier-contract-ends-at]');
        remarkInput = drawer.querySelector('[data-supplier-contract-remark]');
        remarkCount = drawer.querySelector('[data-supplier-contract-remark-count]');
        fileInput = drawer.querySelector('[data-supplier-contract-file]');
        uploadButton = drawer.querySelector('[data-supplier-contract-upload]');
        uploadHint = drawer.querySelector('[data-supplier-contract-upload-hint]');
        feedback = drawer.querySelector('[data-supplier-contract-feedback]');
        paymentTerms = drawer.querySelector('[data-supplier-contract-payment]');

        mask.addEventListener('click', closeDrawer);
        drawer.querySelectorAll('[data-supplier-contract-close]').forEach(function (button) {
            button.addEventListener('click', closeDrawer);
        });
        drawer.querySelectorAll('[data-supplier-contract-date-button]').forEach(function (button) {
            button.addEventListener('click', function () {
                var input = this.parentElement.querySelector('input');
                if (!input || input.readOnly) return;
                input.focus();
                if (typeof input.showPicker === 'function') input.showPicker();
            });
        });
        drawer.querySelectorAll('input[name="supplierContractRelation"]').forEach(function (radio) {
            radio.addEventListener('change', function () {
                if (this.checked) applyRelationMode(this.value);
            });
        });
        paymentTerms.addEventListener('change', function (event) {
            var target = event.target;
            if (target.matches('input[name="supplierPaymentMode"]')) {
                paymentMode = target.value;
                if (paymentMode === 'once') {
                    paymentStages = [createStage('一次性付款', 100)];
                } else {
                    paymentStages = [
                        createStage('首期款', 30),
                        createStage('阶段款', 40),
                        createStage('尾款', 30)
                    ];
                }
                recalculateStageAmounts();
                renderPaymentTerms();
                return;
            }
            var row = target.closest('[data-stage-id]');
            if (!row) return;
            var stage = paymentStages.find(function (item) { return String(item.id) === String(row.dataset.stageId); });
            if (!stage) return;
            if (target.matches('[data-stage-name]')) stage.name = target.value.trim() || stage.name;
            if (target.matches('[data-stage-percent]')) {
                stage.percent = Number(target.value || 0);
                refreshPaymentTotals(true);
            }
        });
        paymentTerms.addEventListener('input', function (event) {
            var target = event.target;
            if (target.matches('[data-contract-service-fee]')) {
                orderServiceFeeRate = target.value === '' ? NaN : Number(target.value);
                target.classList.remove('is-invalid');
                refreshPaymentTotals(false);
                return;
            }
            var row = target.closest('[data-stage-id]');
            if (!row) return;
            var stage = paymentStages.find(function (item) { return String(item.id) === String(row.dataset.stageId); });
            if (!stage) return;
            if (target.matches('[data-stage-name]')) stage.name = target.value;
            if (target.matches('[data-stage-percent]')) {
                stage.percent = Number(target.value || 0);
                refreshPaymentTotals(true);
            }
        });
        paymentTerms.addEventListener('click', function (event) {
            var addButton = event.target.closest('[data-stage-add]');
            var removeButton = event.target.closest('[data-stage-remove]');
            if (addButton) {
                var finalStage = paymentStages[paymentStages.length - 1];
                var newPercent = finalStage && finalStage.percent > 10 ? 10 : Number((100 / (paymentStages.length + 1)).toFixed(2));
                if (finalStage) finalStage.percent = Math.max(0, Number(finalStage.percent) - newPercent);
                paymentStages.splice(Math.max(1, paymentStages.length - 1), 0, createStage('阶段款' + paymentStages.length, newPercent));
                recalculateStageAmounts();
                renderPaymentTerms();
                return;
            }
            if (removeButton) {
                var id = String(removeButton.dataset.stageRemove);
                var index = paymentStages.findIndex(function (item) { return String(item.id) === id; });
                if (index < 0 || paymentStages.length <= 2) return;
                var removed = paymentStages.splice(index, 1)[0];
                paymentStages[paymentStages.length - 1].percent = Number(paymentStages[paymentStages.length - 1].percent) + Number(removed.percent || 0);
                recalculateStageAmounts();
                renderPaymentTerms();
            }
        });
        [signedAtInput, startsAtInput, endsAtInput].forEach(function (input) {
            input.addEventListener('change', function () {
                updateDateMinimums();
                this.parentElement.classList.remove('is-invalid');
                setFeedback('');
            });
        });
        contractNameInput.addEventListener('input', function () {
            this.classList.remove('is-invalid');
            setFeedback('');
        });
        uploadButton.addEventListener('click', function () {
            fileInput.click();
        });
        fileInput.addEventListener('change', function () {
            var files = Array.prototype.slice.call(this.files || []);
            var error = validateSelectedFiles(files);
            if (error) {
                this.value = '';
                selectedFiles = [];
                updateUploadState();
                uploadButton.classList.add('is-invalid');
                setFeedback(error);
                return;
            }
            selectedFiles = files;
            uploadButton.classList.remove('is-invalid');
            setFeedback('');
            updateUploadState();
        });
        remarkInput.addEventListener('input', function () {
            remarkCount.textContent = String(this.value.length);
        });
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (!validateForm()) return;
            var values = collectFormValues();
            var onConfirm = activeOptions.onConfirm;
            closeDrawer();
            if (typeof onConfirm === 'function') {
                window.setTimeout(function () { onConfirm(values); }, 0);
            }
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') closeDrawer();
        });
    }

    function openDrawer(options) {
        if (!drawer) createDrawer();
        options = options || {};
        activeOptions = options;
        var defaultServiceFeeRate = Number(options.serviceFeeRate);
        orderServiceFeeRate = Number.isFinite(defaultServiceFeeRate) ? defaultServiceFeeRate : 3;
        lastFocusedElement = document.activeElement;
        form.reset();
        orderInput.value = options.orderNo || '';
        providerCell.textContent = options.provider || '深圳市龙岗数智科技有限公司';
        demanderCell.textContent = options.demander || '产品需求方测试X';
        if (operatorSignerRow) operatorSignerRow.hidden = isSelfOperated();
        remarkInput.value = '本合同用于当前订单的线下签署及履约确认。';
        remarkCount.textContent = String(remarkInput.value.length);
        resetPaymentTerms();
        applyRelationMode('new');
        drawer.classList.add('show');
        mask.classList.add('show');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.classList.add('supplier-contract-drawer-open');
        window.setTimeout(function () {
            if (contractNumberInput) contractNumberInput.focus();
        }, 30);
    }

    window.SupplierContractDrawer = {
        open: openDrawer,
        close: closeDrawer
    };
})();
