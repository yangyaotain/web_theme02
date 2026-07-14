(function () {
    'use strict';

    var modal;
    var form;
    var serviceInput;
    var typeInput;
    var startInput;
    var endInput;
    var remarkInput;
    var countEl;
    var errorEl;
    var lastTrigger;

    var ICONS = {
        service: '<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H7v-2h4v2zm6-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',
        close: '<svg viewBox="0 0 24 24"><path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.41 4.29 19.71 2.88 18.3 9.17 12 2.88 5.7 4.29 4.29 10.59 10.59 16.89 4.29z"/></svg>',
        cancel: '<svg viewBox="0 0 24 24"><path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.41 4.29 19.71 2.88 18.3 9.17 12 2.88 5.7 4.29 4.29 10.59 10.59 16.89 4.29z"/></svg>',
        submit: '<svg viewBox="0 0 24 24"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
        pending: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2zm1 11h-5V7h2v4h3z"/></svg>'
    };

    function pad(value) {
        return String(value).padStart(2, '0');
    }

    function formatDate(date) {
        return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
    }

    function setDefaultPeriod() {
        var start = new Date();
        start.setHours(0, 0, 0, 0);
        var end = new Date(start);
        end.setFullYear(end.getFullYear() + 1);
        end.setDate(end.getDate() - 1);
        startInput.value = formatDate(start);
        endInput.value = formatDate(end);
        startInput.min = formatDate(start);
        endInput.min = formatDate(start);
    }

    function createModal() {
        modal = document.createElement('div');
        modal.className = 'service-apply-mask';
        modal.id = 'serviceApplyModal';
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML =
            '<div class="service-apply-dialog" role="dialog" aria-modal="true" aria-labelledby="serviceApplyTitle">' +
                '<div class="service-apply-header">' +
                    '<div class="service-apply-title-wrap">' +
                        '<span class="service-apply-title-icon">' + ICONS.service + '</span>' +
                        '<h2 class="service-apply-title" id="serviceApplyTitle">服务开通申请</h2>' +
                    '</div>' +
                    '<button type="button" class="service-apply-close" data-service-apply-close aria-label="关闭">' + ICONS.close + '</button>' +
                '</div>' +
                '<form class="service-apply-form" novalidate>' +
                    '<div class="service-apply-body">' +
                        '<div class="service-apply-field">' +
                            '<label class="service-apply-label" for="serviceApplyName"><span class="service-apply-required">*</span>申请服务</label>' +
                            '<input class="service-apply-input" id="serviceApplyName" type="text" readonly>' +
                        '</div>' +
                        '<div class="service-apply-field">' +
                            '<label class="service-apply-label" for="serviceApplyType"><span class="service-apply-required">*</span>服务类型</label>' +
                            '<input class="service-apply-input" id="serviceApplyType" type="text" readonly>' +
                        '</div>' +
                        '<div class="service-apply-field">' +
                            '<label class="service-apply-label"><span class="service-apply-required">*</span>有效期</label>' +
                            '<div class="service-apply-period">' +
                                '<input class="service-apply-input" id="serviceApplyStart" type="date" aria-label="有效期开始日期">' +
                                '<span class="service-apply-period-separator">至</span>' +
                                '<input class="service-apply-input" id="serviceApplyEnd" type="date" aria-label="有效期结束日期">' +
                            '</div>' +
                            '<p class="service-apply-error" id="serviceApplyError"></p>' +
                        '</div>' +
                        '<div class="service-apply-field">' +
                            '<label class="service-apply-label" for="serviceApplyRemark">备注说明</label>' +
                            '<div class="service-apply-textarea-wrap">' +
                                '<textarea class="service-apply-textarea" id="serviceApplyRemark" maxlength="200" placeholder="请输入申请用途或补充说明"></textarea>' +
                                '<span class="service-apply-count"><span>0</span>/200</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="service-apply-footer">' +
                        '<button type="button" class="service-apply-btn service-apply-btn-secondary" data-service-apply-close>' + ICONS.cancel + '<span>取消</span></button>' +
                        '<button type="submit" class="service-apply-btn service-apply-btn-primary">' + ICONS.submit + '<span>提交申请</span></button>' +
                    '</div>' +
                '</form>' +
            '</div>';
        document.body.appendChild(modal);

        form = modal.querySelector('.service-apply-form');
        serviceInput = modal.querySelector('#serviceApplyName');
        typeInput = modal.querySelector('#serviceApplyType');
        startInput = modal.querySelector('#serviceApplyStart');
        endInput = modal.querySelector('#serviceApplyEnd');
        remarkInput = modal.querySelector('#serviceApplyRemark');
        countEl = modal.querySelector('.service-apply-count span');
        errorEl = modal.querySelector('#serviceApplyError');

        remarkInput.addEventListener('input', function () {
            countEl.textContent = this.value.length;
        });
        startInput.addEventListener('change', function () {
            endInput.min = this.value;
            clearError();
        });
        endInput.addEventListener('change', clearError);
        form.addEventListener('submit', submitApplication);
        modal.addEventListener('click', function (event) {
            if (event.target === modal) closeModal();
        });
    }

    function clearError() {
        errorEl.textContent = '';
        errorEl.classList.remove('show');
    }

    function showError(message) {
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }

    function openModal(trigger) {
        if (!modal) createModal();
        lastTrigger = trigger;
        serviceInput.value = trigger.dataset.serviceName || '';
        typeInput.value = trigger.dataset.serviceType || '';
        remarkInput.value = '';
        countEl.textContent = '0';
        clearError();
        setDefaultPeriod();
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('service-apply-modal-open');
        window.setTimeout(function () { startInput.focus(); }, 80);
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('service-apply-modal-open');
        if (lastTrigger) lastTrigger.focus();
    }

    function setPendingState(serviceName, serviceType) {
        document.querySelectorAll('[data-service-apply]').forEach(function (button) {
            if (button.dataset.serviceName !== serviceName || button.dataset.serviceType !== serviceType) return;
            button.disabled = true;
            button.setAttribute('aria-disabled', 'true');
            button.classList.add('service-apply-pending');
            button.innerHTML = ICONS.pending + '<span>申请审批中</span>';
        });
        document.querySelectorAll('[data-service-status]').forEach(function (status) {
            if (status.dataset.serviceName !== serviceName || status.dataset.serviceType !== serviceType) return;
            status.classList.remove('s-apply');
            status.classList.add('s-pending');
            status.textContent = '申请审批中';
        });
    }

    function submitApplication(event) {
        event.preventDefault();
        if (!startInput.value || !endInput.value) {
            showError('请选择完整的有效期。');
            return;
        }
        if (endInput.value < startInput.value) {
            showError('有效期结束日期不能早于开始日期。');
            return;
        }

        var serviceName = serviceInput.value;
        var serviceType = typeInput.value;
        closeModal();
        setPendingState(serviceName, serviceType);
        if (window.GlobalDialog) {
            GlobalDialog.success({
                title: '申请提交成功',
                desc: serviceName + '开通申请已提交，请留意审批结果。'
            });
        }
    }

    document.addEventListener('click', function (event) {
        var trigger = event.target.closest('[data-service-apply]');
        if (trigger) {
            event.preventDefault();
            if (trigger.disabled) return;
            openModal(trigger);
            return;
        }
        if (event.target.closest('[data-service-apply-close]')) closeModal();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal && modal.classList.contains('show')) closeModal();
    });
})();
