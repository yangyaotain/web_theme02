(function () {
    'use strict';
    const portal = window.PortalNavigation;
    const store = window.NavigationIconStore;
    const escape = portal.escape;
    const el = id => document.getElementById(id);
    const form = el('iconFilter');
    const overlay = el('iconOverlay');
    const dialog = overlay.querySelector('[role="dialog"]');
    const glyph = name => '<span class="material-symbols-outlined" aria-hidden="true">' + name + '</span>';
    const pageSize = 12;
    let filters = { q: '', section: '' };
    let page = 1;
    let entries = [];
    let editing = null;
    let draft = null;
    let picker;
    let pending = false;
    let triggerKey = '';
    let previousOverflow = '';

    function error(id, message) {
        el(id).textContent = message;
        el(id).hidden = !message;
    }
    function render() {
        try {
            entries = portal.iconEntries();
            error('iconLoadError', '');
        } catch {
            entries = [];
            error('iconLoadError', '暂时无法读取导航入口，请检查浏览器存储后重试。');
        }
        const keyword = filters.q.toLowerCase();
        const filtered = entries.filter(entry => (!keyword || String(entry.label).toLowerCase().includes(keyword))
            && (!filters.section || entry.sections.includes(filters.section)));
        const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
        page = Math.min(page, pages);
        const offset = (page - 1) * pageSize;
        el('iconCount').textContent = '共 ' + entries.length + ' 个入口';
        el('iconRows').innerHTML = filtered.slice(offset, offset + pageSize).map(entry => {
            return '<tr><td>' + entry.paths.map(path => '<span class="icon-path">' + escape(path) + '</span>').join('') + '</td>'
                + '<td class="icon-table-name">' + escape(entry.label || '—') + '</td>'
                + '<td>' + portal.renderIcon(entry) + '</td>'
                + '<td><button class="zone-row-action" type="button" data-configure="' + escape(entry.key) + '">' + glyph('edit') + '<span>配置图标</span></button></td></tr>';
        }).join('');
        el('iconEmpty').hidden = filtered.length > 0 || !el('iconLoadError').hidden;
        const button = (number, label, disabled, active = false) => '<button class="page-btn' + (active ? ' active' : '') + '" type="button" data-page="' + number + '"' + (disabled ? ' disabled' : '') + (active ? ' aria-current="page"' : '') + '>' + label + '</button>';
        let numbers = '';
        const start = Math.max(1, Math.min(page - 2, pages - 4));
        for (let number = start; number <= Math.min(pages, start + 4); number++) numbers += button(number, number, false, page === number);
        el('iconPagination').innerHTML = '<span class="pagination-info">共 ' + filtered.length + ' 条</span><div class="pagination-controls">'
            + button(page - 1, glyph('chevron_left') + '<span>上一页</span>', page === 1) + numbers
            + button(page + 1, '<span>下一页</span>' + glyph('chevron_right'), page === pages) + '</div>';
    }
    function query() {
        filters = { q: form.elements.q.value.trim(), section: form.elements.section.value };
        page = 1;
        render();
    }
    function preview() {
        el('iconPreview').innerHTML = portal.renderIcon(editing, draft)
            + '<span class="navigation-icon-preview-copy"><strong>' + escape(editing.label || '—') + '</strong></span>'
            + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>';
        error('iconSaveError', '');
    }
    function uploadPending(value) {
        pending = value;
        el('iconSave').disabled = value;
        el('iconUseDefault').disabled = value;
        overlay.querySelectorAll('[data-icon-close]').forEach(button => { button.disabled = value; });
        el('iconPicker').querySelector('.image-icon-picker-control')?.classList.toggle('is-uploading', value);
    }
    function mountPicker() {
        picker = window.ImageIconPicker.mount(el('iconPicker'), {
            label: '导航图标', modalTitle: '选择导航图标', maxCount: 1, maxSizeMB: 1, value: draft,
            onChange: values => { draft = values[0] || null; preview(); },
            onError: message => error('iconSaveError', message),
            onUploadPending: uploadPending
        });
    }
    function open(key) {
        editing = entries.find(entry => entry.key === key);
        if (!editing) return;
        triggerKey = key;
        draft = store.get(key);
        el('iconEntryName').textContent = editing.label || '—';
        el('iconEntryPath').textContent = editing.paths.join('；');
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        overlay.hidden = false;
        mountPicker();
        preview();
        dialog.focus();
    }
    function close() {
        if (pending) return;
        if (picker?.open) picker.close();
        overlay.hidden = true;
        editing = null;
        document.body.style.overflow = previousOverflow;
        Array.from(el('iconRows').querySelectorAll('[data-configure]')).find(button => button.dataset.configure === triggerKey)?.focus();
    }
    form.addEventListener('submit', event => { event.preventDefault(); query(); });
    form.addEventListener('change', event => { if (event.target.matches('select')) query(); });
    form.addEventListener('reset', event => {
        event.preventDefault();
        ['q', 'section'].forEach(name => { form.elements[name].value = ''; });
        query();
    });
    el('iconRows').addEventListener('click', event => {
        const button = event.target.closest('[data-configure]');
        if (button) open(button.dataset.configure);
    });
    el('iconPagination').addEventListener('click', event => {
        const button = event.target.closest('[data-page]');
        if (button && !button.disabled) { page = Number(button.dataset.page); render(); }
    });
    el('iconUseDefault').addEventListener('click', () => { draft = null; mountPicker(); preview(); });
    overlay.addEventListener('click', event => {
        if (event.target === overlay || event.target.closest('[data-icon-close]')) close();
        if (event.target.closest('[data-iip-open]')) el('iconPicker').querySelector('[data-iip-search]')?.focus();
    });
    el('iconSave').addEventListener('click', () => {
        if (!editing || pending) return;
        try {
            const latest = portal.iconEntries().find(entry => entry.key === editing.key);
            if (!latest) throw new Error('该导航入口已移除，请关闭弹窗后重新选择。');
            store.save(editing.key, draft);
            render();
            close();
            GlobalDialog.success({ title: '保存成功', desc: '导航菜单图标已更新。' });
        } catch (issue) { error('iconSaveError', issue.message); }
    });
    document.addEventListener('keydown', event => {
        if (overlay.hidden) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            if (pending) return;
            if (picker?.open) { picker.close(); el('iconPicker').querySelector('[data-iip-open]')?.focus(); }
            else close();
        }
        if (event.key !== 'Tab') return;
        const activeDialog = overlay.querySelector('.image-icon-picker-modal') || dialog;
        const focusable = Array.from(activeDialog.querySelectorAll('button:not(:disabled), input:not(:disabled), [tabindex="0"]')).filter(node => node.getClientRects().length);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first) { event.preventDefault(); return; }
        if (event.shiftKey && (document.activeElement === first || !activeDialog.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && (document.activeElement === last || !activeDialog.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    });
    ['navigation-icons-change', 'partner-store-change', 'special-zone-store-change', 'data-production-line-change', 'pageshow'].forEach(name => window.addEventListener(name, () => {
        render();
        if (editing) {
            const latest = entries.find(entry => entry.key === editing.key);
            if (latest) { editing = latest; preview(); }
            else error('iconSaveError', '该导航入口已移除，请关闭弹窗后重新选择。');
        }
    }));
    window.addEventListener('storage', event => {
        if ([window.DataProductionLineStore.storageKey, window.SpecialZoneStore.key].includes(event.key)) render();
    });
    render();
})();
