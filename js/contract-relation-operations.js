(function () {
    'use strict';

    if (window.ContractRelationOperations) return;

    var activeLayers = [];
    var returnFocus = null;
    var keydownHandler = null;
    var PLATFORM_OPERATOR_NAME = '深圳市龙岗区数据要素交易服务有限公司';

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
        });
    }

    function materialIcon(name) {
        return '<span class="material-symbols-outlined" aria-hidden="true">' + escapeHtml(name) + '</span>';
    }

    function parseMoney(value) {
        var parsed = Number(String(value == null ? '' : value).replace(/[^\d.-]/g, ''));
        return Number.isFinite(parsed) ? parsed : 0;
    }

    function formatMoney(value) {
        return '¥' + Number(value || 0).toLocaleString('zh-CN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function close(immediate) {
        var layers = activeLayers.slice();
        var focusTarget = returnFocus;
        if (!layers.length) return;
        activeLayers = [];
        returnFocus = null;
        if (keydownHandler) document.removeEventListener('keydown', keydownHandler);
        keydownHandler = null;
        layers.forEach(function (layer) { layer.classList.remove('show'); });
        document.body.classList.remove('supplier-contract-drawer-open');
        window.setTimeout(function () {
            layers.forEach(function (layer) { layer.remove(); });
            if (focusTarget && document.contains(focusTarget)) focusTarget.focus();
        }, immediate ? 0 : 220);
    }

    function activate(selector, focusSelector) {
        activeLayers = Array.prototype.slice.call(document.querySelectorAll(selector));
        window.requestAnimationFrame(function () {
            activeLayers.forEach(function (layer) { layer.classList.add('show'); });
        });
        document.body.classList.add('supplier-contract-drawer-open');
        document.querySelectorAll('[data-contract-relation-close]').forEach(function (control) {
            control.addEventListener('click', function () { close(false); });
        });
        keydownHandler = function (event) {
            var dialog = document.querySelector('[data-contract-relation-dialog]');
            if (!dialog) return;
            if (event.key === 'Escape') {
                event.preventDefault();
                close(false);
                return;
            }
            if (event.key !== 'Tab') return;
            var focusables = dialog.querySelectorAll('button:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])');
            if (!focusables.length) return;
            var first = focusables[0];
            var last = focusables[focusables.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', keydownHandler);
        window.setTimeout(function () {
            var target = document.querySelector(focusSelector);
            if (target) target.focus();
        }, 60);
    }

    function openWithdraw(options) {
        options = options || {};
        close(true);
        returnFocus = options.returnFocus || document.activeElement;
        document.body.insertAdjacentHTML('beforeend', ''
            + '<div class="supplier-contract-drawer-mask supplier-order-operation-mask" data-contract-relation-layer data-contract-relation-close></div>'
            + '<section class="supplier-order-withdraw-modal" role="dialog" aria-modal="true" aria-labelledby="contractRelationWithdrawTitle" data-contract-relation-layer data-contract-relation-dialog>'
            +   '<div class="supplier-order-withdraw-content">'
            +       '<h2 id="contractRelationWithdrawTitle">' + materialIcon('warning') + '<span>撤回关联</span></h2>'
            +       '<p>确定撤回已关联的合同吗？</p>'
            +   '</div>'
            +   '<footer>'
            +       '<button class="supplier-order-operation-button" type="button" data-contract-relation-close>取消</button>'
            +       '<button class="supplier-order-operation-button is-primary" type="button" data-contract-relation-withdraw-confirm>确定</button>'
            +   '</footer>'
            + '</section>');
        activate('[data-contract-relation-layer]', '[data-contract-relation-close].supplier-order-operation-button');
        var confirm = document.querySelector('[data-contract-relation-withdraw-confirm]');
        if (confirm) {
            confirm.addEventListener('click', function () {
                close(false);
                if (typeof options.onConfirm === 'function') options.onConfirm();
            });
        }
    }

    function normalizeContract(options) {
        var record = options.record || {};
        var snapshot = options.snapshot || record.contractSnapshot || {};
        var orderNo = record.orderNo || options.orderNo || '';
        var itemName = record.name || options.itemName || '数据交易标的';
        var provider = options.provider || snapshot.provider || record.provider || '深圳市龙岗数智科技有限公司';
        var demander = options.demander || snapshot.demander || record.user || '深圳市龙岗智慧产业有限公司';
        var operationMode = options.operationMode || snapshot.operationMode || record.operationMode || (provider === PLATFORM_OPERATOR_NAME ? 'self' : 'thirdParty');
        var selfOperated = operationMode === 'self';
        var partyLabel = selfOperated ? '双方' : '三方';
        var operator = selfOperated ? '' : (options.operator || snapshot.operator || PLATFORM_OPERATOR_NAME);
        var amount = snapshot.contractAmount != null ? parseMoney(snapshot.contractAmount) : parseMoney(record.amount || options.amount);
        var serviceFeeMode = snapshot.serviceFeeMode || options.serviceFeeMode || (options.businessType === 'service' ? 'P' : 'G');
        var serviceFeeValue = snapshot.serviceFeeValue != null ? Number(snapshot.serviceFeeValue) : Number(options.serviceFeeValue != null ? options.serviceFeeValue : (options.businessType === 'service' ? 2.5 : 50));
        var stages = Array.isArray(snapshot.paymentStages) ? snapshot.paymentStages : [];
        var feeTotal = selfOperated ? 0 : (serviceFeeMode === 'P'
            ? amount * serviceFeeValue / 100
            : serviceFeeValue * Math.max(1, stages.length || 1));
        return {
            name: (snapshot.contractName || snapshot.name || itemName + partyLabel + '交易合同').replace(selfOperated ? /三方/g : /$^/, '双方'),
            number: snapshot.contractNo || snapshot.number || snapshot.id || ('LG-HT-' + String(orderNo).slice(-16)),
            effectiveAt: snapshot.startsAt || snapshot.effectiveAt || String(record.appliedAt || '--').slice(0, 10),
            endsAt: snapshot.endsAt || '--',
            signMethod: snapshot.signMethod || record.signMode || '--',
            signedAt: snapshot.signedAt || '--',
            source: snapshot.source || '订单关联生成',
            remark: snapshot.remark || '--',
            fileName: (snapshot.fileName || (snapshot.files && snapshot.files[0]) || itemName + partyLabel + '交易合同.pdf').replace(selfOperated ? /三方/g : /$^/, '双方'),
            provider: provider,
            demander: demander,
            operator: operator,
            operationMode: operationMode,
            selfOperated: selfOperated,
            amount: amount,
            paymentMode: snapshot.paymentMode === 'installment' || stages.length > 1 ? '分期付款' : '一次性付款',
            feeRule: selfOperated ? '--' : (serviceFeeMode === 'P' ? '按每笔付款金额的 ' + serviceFeeValue + '% 收取' : '每笔付款固定收取 ' + formatMoney(serviceFeeValue)),
            netAmount: Math.max(0, amount - feeTotal)
        };
    }

    function openUnlink(options) {
        options = options || {};
        var contract = normalizeContract(options);
        close(true);
        returnFocus = options.returnFocus || document.activeElement;
        document.body.insertAdjacentHTML('beforeend', ''
            + '<div class="supplier-contract-drawer-mask supplier-order-operation-mask" data-contract-relation-layer data-contract-relation-close></div>'
            + '<aside class="supplier-contract-drawer supplier-contract-unlink" role="dialog" aria-modal="true" aria-labelledby="contractRelationUnlinkTitle" data-contract-relation-layer data-contract-relation-dialog>'
            +   '<header class="supplier-contract-drawer-head">'
            +       '<button class="supplier-contract-drawer-close" type="button" aria-label="关闭解除关联合同抽屉" data-contract-relation-close>' + materialIcon('close') + '</button>'
            +       '<h2 id="contractRelationUnlinkTitle">解除关联合同</h2>'
            +   '</header>'
            +   '<form class="supplier-contract-form" data-contract-relation-unlink-form>'
            +       '<div class="supplier-contract-drawer-body supplier-contract-approval-body">'
            +           '<div class="supplier-contract-unlink-note">' + materialIcon('info') + '<p>解除关联后，原合同仍然生效；如需作废合同，请前往合同管理处理。</p></div>'
            +           '<section class="supplier-contract-approval-section">'
            +               '<div class="supplier-contract-approval-heading"><h3>合同基本信息</h3><span class="supplier-contract-approval-status">' + materialIcon('radio_button_unchecked') + '<span>已签署</span></span></div>'
            +               '<div class="supplier-contract-approval-info">'
            +                   '<div><span>合同名称：</span><strong>' + escapeHtml(contract.name) + '</strong></div>'
            +                   '<div><span>合同编号：</span><strong>' + escapeHtml(contract.number) + '</strong></div>'
            +                   '<div><span>合同生效时间：</span><strong>' + escapeHtml(contract.effectiveAt) + '</strong></div>'
            +                   '<div><span>合同失效时间：</span><strong>' + escapeHtml(contract.endsAt) + '</strong></div>'
            +                   '<div><span>合同签署方式：</span><strong>' + escapeHtml(contract.signMethod) + '</strong></div>'
            +                   '<div><span>签署时间：</span><strong>' + escapeHtml(contract.signedAt) + '</strong></div>'
            +                   '<div><span>合同来源：</span><strong>' + escapeHtml(contract.source) + '</strong></div>'
            +                   '<div><span>经营属性：</span><strong>' + (contract.selfOperated ? '自营' : '第三方') + '</strong></div>'
            +                   '<div class="is-full"><span>备注：</span><strong>' + escapeHtml(contract.remark) + '</strong></div>'
            +               '</div>'
            +           '</section>'
            +           '<section class="supplier-contract-approval-section">'
            +               '<div class="supplier-contract-approval-heading"><h3>合同文件</h3></div>'
            +               '<div class="supplier-contract-approval-file">'
            +                   materialIcon('description') + '<strong>' + escapeHtml(contract.fileName) + '</strong>'
            +                   '<button type="button" data-contract-relation-file-action="预览">' + materialIcon('visibility') + '<span>预览</span></button>'
            +                   '<button type="button" data-contract-relation-file-action="下载">' + materialIcon('download') + '<span>下载</span></button>'
            +               '</div>'
            +           '</section>'
            +           '<section class="supplier-contract-approval-section">'
            +               '<div class="supplier-contract-approval-heading"><h3>签署主体</h3></div>'
            +               '<div class="supplier-contract-signers supplier-contract-approval-signers supplier-contract-unlink-signers">'
            +                   '<div class="supplier-contract-signer-head"><span>主体类型</span><span>签署方角色</span><span>签署方名称</span></div>'
            +                   '<div class="supplier-contract-signer-row"><span>法人</span><span>提供方</span><span>' + escapeHtml(contract.provider) + '</span></div>'
            +                   '<div class="supplier-contract-signer-row"><span>法人</span><span>需求方</span><span>' + escapeHtml(contract.demander) + '</span></div>'
            +                   (contract.selfOperated ? '' : '<div class="supplier-contract-signer-row"><span>法人</span><span>平台运营方</span><span>' + escapeHtml(contract.operator) + '</span></div>')
            +               '</div>'
            +           '</section>'
            +           '<section class="supplier-contract-approval-section">'
            +               '<div class="supplier-contract-approval-heading"><h3>' + (contract.selfOperated ? '付款条款' : '付款与分账条款') + '</h3></div>'
            +               '<div class="supplier-order-relation-payment supplier-contract-unlink-payment">'
            +                   '<div><span>合同金额</span><strong>' + formatMoney(contract.amount) + '</strong></div>'
            +                   '<div><span>付款方式</span><strong>' + escapeHtml(contract.paymentMode) + '</strong></div>'
            +                   (contract.selfOperated ? '<div><span>经营属性</span><strong>运营方自营</strong></div>' : '<div><span>平台服务费</span><strong>' + escapeHtml(contract.feeRule) + '</strong></div><div><span>提供方预计实收</span><strong>' + formatMoney(contract.netAmount) + '</strong></div>')
            +               '</div>'
            +           '</section>'
            +           '<section class="supplier-contract-approval-section">'
            +               '<div class="supplier-contract-approval-heading"><h3>解除原因</h3></div>'
            +               '<div class="supplier-contract-approval-form-row is-required is-top-aligned">'
            +                   '<label class="supplier-contract-approval-label" for="contractRelationUnlinkReason">解除原因</label>'
            +                   '<div class="supplier-contract-approval-opinion">'
            +                       '<textarea id="contractRelationUnlinkReason" maxlength="400" placeholder="请输入" data-contract-relation-unlink-reason></textarea>'
            +                       '<span><b data-contract-relation-unlink-count>0</b>/400</span>'
            +                   '</div>'
            +               '</div>'
            +           '</section>'
            +       '</div>'
            +       '<footer class="supplier-contract-drawer-foot">'
            +           '<button class="supplier-contract-button" type="button" data-contract-relation-close>取消</button>'
            +           '<button class="supplier-contract-button is-primary" type="submit">确定</button>'
            +       '</footer>'
            +   '</form>'
            + '</aside>');
        activate('[data-contract-relation-layer]', '[data-contract-relation-close].supplier-contract-drawer-close');
        var reasonInput = document.querySelector('[data-contract-relation-unlink-reason]');
        var reasonCount = document.querySelector('[data-contract-relation-unlink-count]');
        if (reasonInput) {
            reasonInput.addEventListener('input', function () {
                if (reasonCount) reasonCount.textContent = String(this.value.length);
                this.classList.remove('is-invalid');
            });
        }
        document.querySelectorAll('[data-contract-relation-file-action]').forEach(function (button) {
            button.addEventListener('click', function () {
                if (typeof options.onDemo === 'function') options.onDemo('合同文件' + this.dataset.contractRelationFileAction + '操作已触发（原型演示）');
            });
        });
        var form = document.querySelector('[data-contract-relation-unlink-form]');
        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                var reason = reasonInput ? reasonInput.value.trim() : '';
                if (!reason) {
                    if (reasonInput) {
                        reasonInput.classList.add('is-invalid');
                        reasonInput.focus();
                    }
                    return;
                }
                close(false);
                if (typeof options.onConfirm === 'function') options.onConfirm(reason);
            });
        }
    }

    window.ContractRelationOperations = {
        openWithdraw: openWithdraw,
        openUnlink: openUnlink,
        close: close
    };
})();
