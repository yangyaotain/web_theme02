(function () {
    'use strict';

    const paths = {
        add: '<path d="M12 5v14M5 12h14"/>',
        up: '<path d="m7 14 5-5 5 5z" fill="currentColor" stroke="none"/>',
        down: '<path d="m7 10 5 5 5-5z" fill="currentColor" stroke="none"/>',
        remove: '<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 10v7m4-7v7"/>',
        reset: '<path d="M4 10a8 8 0 1 1 1 7M4 4v6h6"/>',
        apply: '<rect x="5" y="4" width="14" height="16" rx="2"/><path d="M8 9h8m-8 4h8m-8 4h4"/>',
        back: '<path d="m14 6-6 6 6 6"/>',
        check: '<path d="m5 12 4 4L19 6"/>',
        close: '<path d="m6 6 12 12M6 18 18 6"/>',
        edit: '<path d="m4 16-1 5 5-1L20 8l-4-4L4 16zm10-10 4 4"/>',
        eye: '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
        next: '<path d="m10 6 6 6-6 6"/>',
        offline: '<path d="M12 4v12m-5-5 5 5 5-5M5 20h14"/>',
        partner: '<path d="M4 21V5h16v16M2 21h20M8 9h1m6 0h1m-8 4h1m6 0h1m-6 8v-4h4v4"/>',
        publish: '<path d="M12 17V5m-5 5 5-5 5 5M5 20h14"/>',
        search: '<circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 5 5"/>'
    };
    const applicationFields = [
        { name: 'name', label: '企业名称', attrs: 'maxlength="100" placeholder="请输入企业全称"' },
        { name: 'creditCode', label: '统一社会信用代码', attrs: 'minlength="18" maxlength="18" pattern="[0-9A-Za-z]{18}" title="请输入 18 位统一社会信用代码" placeholder="请输入统一社会信用代码"' },
        { name: 'contact', label: '对接联系人', attrs: 'maxlength="30" placeholder="请输入联系人姓名"' },
        { name: 'phone', label: '联系电话', attrs: 'type="tel" inputmode="tel" maxlength="11" pattern="1[3-9][0-9]{9}" title="请输入 11 位手机号" placeholder="请输入联系手机号"' },
        { name: 'content', label: '共创内容' }
    ];

    function escape(value) {
        return String(value ?? '').replace(/[&<>"']/g, char => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[char]));
    }

    function icon(name) {
        return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
    }

    function logo(record) {
        const visual = window.PartnerStore.logoVisual(record.logo);
        const src = visual?.type === 'image' ? visual.src : '';
        const fallback = record.name ? escape(Array.from(record.name.trim()).slice(0, 2).join('')) : icon('partner');
        const content = src ? `<img src="${escape(src)}" alt="">` : visual?.type === 'icon' ? `<span class="material-symbols-outlined partner-symbol-icon">${escape(visual.name)}</span>` : fallback;
        return `<span class="partner-logo${src ? ' has-image' : ''}${record.partnerId ? ' application-logo' : ''}" aria-hidden="true">${content}</span>`;
    }

    function date(value) {
        return new Date(value).toLocaleString('zh-CN', { hour12: false });
    }

    function details(fields) {
        return `<dl class="partner-dialog-details">${fields.map(([label, value]) => `
            <div class="monitor-detail-field">
                <dt class="label">${escape(label)}</dt><dd class="value">${escape(value || '—')}</dd>
            </div>`).join('')}</dl>`;
    }

    function showDialog({ title, glyph, body, submitText, onSubmit }) {
        const dialog = document.createElement('dialog');
        dialog.className = 'service-apply-dialog partner-dialog' + (submitText ? '' : ' monitor-modal partner-view-dialog');
        dialog.setAttribute('aria-labelledby', 'partner-dialog-title');
        dialog.innerHTML = `
            <header class="service-apply-header${submitText ? '' : ' monitor-modal-head'}">
                <div class="service-apply-title-wrap">
                    ${submitText ? `<span class="service-apply-title-icon">${icon(glyph)}</span>` : ''}
                    <h2 class="service-apply-title" id="partner-dialog-title">${escape(title)}</h2>
                </div>
                <button class="service-apply-close" type="button" data-partner-close aria-label="关闭">${icon('close')}</button>
            </header>
            <form class="service-apply-form">
                <div class="service-apply-body">${body}</div>
                <footer class="service-apply-footer">
                    <button type="button" class="service-apply-btn service-apply-btn-secondary" data-partner-close>
                        ${icon('close')}<span>${submitText ? '取消' : '关闭'}</span>
                    </button>
                    ${submitText ? `<button type="submit" class="service-apply-btn service-apply-btn-primary">${icon('check')}<span>${escape(submitText)}</span></button>` : ''}
                </footer>
            </form>`;
        dialog.addEventListener('click', event => {
            if (event.target === dialog || event.target.closest('[data-partner-close]')) dialog.close();
        });
        dialog.addEventListener('close', () => dialog.remove(), { once: true });
        dialog.querySelector('form').addEventListener('submit', event => {
            event.preventDefault();
            if (onSubmit) onSubmit(event.currentTarget, dialog);
        });
        document.body.appendChild(dialog);
        dialog.showModal();
        return dialog;
    }

    function openApplication() {
        if (document.querySelector('.partner-dialog[open]')) return;
        const limit = 1000;
        const formFields = applicationFields.map(field => `
            <label class="service-apply-field${field.name === 'content' ? ' partner-dialog-wide' : ''}">
                <span class="service-apply-label"><span class="service-apply-required" aria-hidden="true">*</span>${field.label}</span>
                ${field.name === 'content' ? `
                    <span class="service-apply-textarea-wrap">
                        <textarea class="service-apply-textarea" name="content" required maxlength="${limit}" placeholder="请描述拟共创的内容、场景或合作方向"></textarea>
                        <span class="service-apply-count"><span data-content-count>0</span>/${limit}</span>
                    </span>` : `<input class="service-apply-input" name="${field.name}" required ${field.attrs}>`}
            </label>`).join('');

        const dialog = showDialog({
            title: '生态伙伴加入',
            glyph: 'apply',
            body: `<div class="partner-application-fields">${formFields}</div><p class="service-apply-error" data-application-error role="alert"></p>`,
            submitText: '提交申请',
            onSubmit(form, dialog) {
                const values = Object.fromEntries([...new FormData(form)].map(([key, value]) => [key, value.trim()]));
                const incomplete = applicationFields.find(field => !values[field.name]);
                const error = form.querySelector('[data-application-error]');
                if (incomplete) {
                    error.textContent = `请填写${incomplete.label}。`;
                    error.classList.add('show');
                    form.elements[incomplete.name].focus();
                    return;
                }
                try {
                    window.PartnerStore.submitApplication({ ...values, creditCode: values.creditCode.toUpperCase() });
                } catch (failure) {
                    error.textContent = failure.message;
                    error.classList.add('show');
                    return;
                }
                dialog.querySelector('h2').textContent = '申请提交成功';
                dialog.querySelector('.service-apply-title-icon').innerHTML = icon('check');
                form.querySelector('.service-apply-body').innerHTML = '<p class="partner-success-message" role="status">平台已收到您的生态伙伴加入申请，我们会尽快与您联系，沟通后续合作事宜。</p>';
                const footer = form.querySelector('footer');
                footer.innerHTML = `<button type="button" class="service-apply-btn service-apply-btn-primary" data-partner-close>${icon('check')}<span>完成</span></button>`;
                footer.querySelector('button').focus();
            }
        });
        const content = dialog.querySelector('textarea');
        content.addEventListener('input', () => { dialog.querySelector('[data-content-count]').textContent = content.value.length; });
        dialog.querySelector('input').focus();
    }

    function viewApplication(record) {
        const fields = applicationFields.map(({ label, name }) => [label, record[name], name === 'content']);
        fields.splice(4, 0, ['申请时间', date(record.createdAt), true]);
        showDialog({ title: '查看生态伙伴申请', glyph: 'apply', body: details(fields) });
    }

    window.PartnerUI = { escape, icon, logo, date, openApplication, viewApplication };
})();
