(function () {
    'use strict';

    const store = window.DataProductionLineStore;
    const page = 'cms-data-production-lines.html';
    const params = new URLSearchParams(location.search);
    const statusLabels = { draft: '未发布', published: '已发布', offline: '已下架' };
    const dateFormat = new Intl.DateTimeFormat('zh-CN', { dateStyle: 'short', timeStyle: 'short', hourCycle: 'h23' });

    function escape(value) {
        return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
    }

    function icon(name) {
        return `<span class="material-symbols-outlined" aria-hidden="true">${name}</span>`;
    }

    function image(source, alt = '') {
        const src = store.imageSrc(source);
        return src ? `<img src="${escape(src)}" alt="${escape(alt)}">` : '';
    }

    function url(values) {
        const query = new URLSearchParams();
        Object.entries(values).forEach(([key, value]) => { if (value) query.set(key, value); });
        return page + (query.size ? '?' + query : '');
    }

    function formatDate(value) {
        if (!value) return '—';
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? '—' : dateFormat.format(date);
    }

    function openPreview(record) {
        const tab = window.open('about:blank', '_blank');
        if (!tab) throw new Error('预览窗口被拦截，请允许弹出窗口后重试。');
        try {
            tab.sessionStorage.setItem(store.previewKey, JSON.stringify(record));
            tab.opener = null;
            tab.location.replace(new URL('data-production-line.html?preview=1', location.href).href);
        } catch (error) { tab.close(); throw error; }
    }

    function renderList() {
        const list = document.getElementById('lineAdminList');
        const filter = document.getElementById('lineAdminFilter');
        const keywordInput = filter.elements.q;
        const statusInput = filter.elements.status;
        const add = document.getElementById('lineAdminAdd');
        const count = document.getElementById('lineAdminCount');
        const rows = document.getElementById('lineAdminRows');
        const empty = document.getElementById('lineAdminEmpty');
        const pagination = document.getElementById('lineAdminPagination');
        const pageSize = 10;
        let keyword = (params.get('q') || '').trim();
        let status = Object.hasOwn(statusLabels, params.get('status')) ? params.get('status') : '';
        let current = Math.max(1, Number.parseInt(params.get('page'), 10) || 1);
        let records = [];
        let matched = [];

        function renderRows() {
            let storageError = false;
            try {
                records = store.list();
            } catch {
                storageError = true;
                records = [];
            }
            matched = records.filter(line => line.heroTitle.toLowerCase().includes(keyword.toLowerCase()) && (!status || line.status === status));
            const pages = Math.max(1, Math.ceil(matched.length / pageSize));
            current = Math.min(current, pages);
            add.href = url({ view: 'new', q: keyword, status, page: current > 1 ? current : '' });
            count.textContent = `${records.length} 条产线`;
            const navigationIds = new Set(store.listForNavigation().map(line => line.id));
            document.getElementById('lineNavigationCount').textContent = `导航展示 ${navigationIds.size} / 5 条`;
            function action(line, name, label, glyph, disabled = false, danger = false) {
                return `<button class="zone-row-action${danger ? ' danger' : ''}" type="button" data-line-action="${name}" data-id="${escape(line.id)}"${disabled ? ' disabled aria-disabled="true"' : ''}>${icon(glyph)}<span>${label}</span></button>`;
            }
            rows.innerHTML = matched.slice((current - 1) * pageSize, current * pageSize).map((line, index) => `
                <tr>
                    <td><span class="zone-admin-sequence">${(current - 1) * pageSize + index + 1}</span></td>
                    <td><strong class="zone-admin-name" title="${escape(line.heroTitle)}">${escape(line.heroTitle)}</strong></td>
                    <td><span class="zone-admin-description" title="${escape(line.heroSubtitle)}">${escape(line.heroSubtitle)}</span></td>
                    <td><span class="zone-table-status ${line.status}">${statusLabels[line.status]}</span></td>
                    <td><span class="zone-navigation-status${navigationIds.has(line.id) ? ' is-visible' : ''}">${navigationIds.has(line.id) ? '导航展示中' : line.status === 'published' ? '超出展示范围' : '—'}</span></td>
                    <td>${formatDate(line.updatedAt)}</td>
                    <td><div class="zone-table-actions">
                        ${action(line, 'up', '上移', 'arrow_drop_up', matched[0].id === line.id)}
                        ${action(line, 'down', '下移', 'arrow_drop_down', matched[matched.length - 1].id === line.id)}
                        ${action(line, 'preview', '预览', 'visibility')}
                        <a class="zone-row-action" href="${escape(url({ view: 'edit', id: line.id, q: keyword, status, page: current > 1 ? current : '' }))}">${icon('edit')}<span>编辑</span></a>
                        ${line.status === 'published' ? action(line, 'offline', '下架', 'remove_circle_outline') : action(line, 'publish', '发布', 'check_circle') + action(line, 'delete', '删除', 'delete', false, true)}
                    </div></td>
                </tr>`).join('');
            empty.hidden = matched.length > 0;
            empty.querySelector('strong').textContent = storageError ? '暂时无法读取数据生产线' : (keyword || status ? '暂无符合条件的生产线' : '暂无数据生产线');
            empty.querySelector('span').textContent = storageError ? '请检查浏览器存储设置后刷新页面。' : (keyword || status ? '请调整查询条件后重试。' : '可点击【新增生产线】添加。');
            pagination.hidden = !matched.length;
            pagination.innerHTML = `<span class="pagination-info">共 ${matched.length} 条</span>` + (pages > 1 ? `
                <button class="page-btn" type="button" data-page="${current - 1}" data-step="previous"${current === 1 ? ' disabled' : ''}>${icon('chevron_left')}<span>上一页</span></button>
                <span class="pagination-info">第 ${current} / ${pages} 页</span>
                <button class="page-btn" type="button" data-page="${current + 1}" data-step="next"${current === pages ? ' disabled' : ''}><span>下一页</span>${icon('chevron_right')}</button>` : '');
        }

        function refresh() {
            renderRows();
            history.replaceState(null, '', url({ q: keyword, status, page: current > 1 ? current : '' }));
        }

        keywordInput.value = keyword;
        statusInput.value = status;
        statusInput.addEventListener('change', () => { keyword = keywordInput.value.trim(); status = statusInput.value; current = 1; refresh(); });
        filter.addEventListener('submit', event => {
            event.preventDefault();
            keyword = keywordInput.value.trim();
            current = 1;
            refresh();
        });
        filter.addEventListener('reset', event => {
            event.preventDefault();
            keywordInput.value = keyword = '';
            statusInput.value = status = '';
            current = 1;
            refresh();
        });
        pagination.addEventListener('click', event => {
            const button = event.target.closest('[data-page]');
            if (!button || button.disabled) return;
            current = Number(button.dataset.page);
            refresh();
            const focusPage = pagination.querySelector(`[data-step="${button.dataset.step}"]:not(:disabled)`);
            (focusPage || pagination.querySelector('button:not(:disabled)'))?.focus();
        });
        rows.addEventListener('click', event => {
            const action = event.target.closest('[data-line-action]');
            const target = action && records.find(line => line.id === action.dataset.id);
            if (!target || action.disabled) return;
            const name = action.dataset.lineAction;
            try {
                if (name === 'preview') { openPreview(target); return; }
                if (name === 'up' || name === 'down') {
                    const position = store.move(target.id, name === 'up' ? -1 : 1, matched.map(line => line.id));
                    if (position !== null) current = Math.floor(position / pageSize) + 1;
                    refresh();
                    rows.querySelector(`[data-id="${target.id}"][data-line-action="${name}"]:not(:disabled)`)?.focus();
                    GlobalDialog.success({ title: '排序已更新', duration: 1000 });
                    return;
                }
            } catch (failure) { GlobalDialog.warning({ title: '操作未完成', desc: escape(failure.message) }); return; }
            const label = { publish: '发布', offline: '下架', delete: '删除' }[name];
            const dialog = name === 'delete' ? 'danger' : name === 'offline' ? 'warning' : 'confirm';
            GlobalDialog[dialog]({
                title: `${label}数据生产线`,
                desc: name === 'publish' ? `发布【${escape(target.heroTitle)}】后是否在门户展示，以已发布生产线中的排序前 5 条为准，超出部分暂不展示。` : name === 'offline' ? `下架【${escape(target.heroTitle)}】后，门户入口及正式详情将隐藏，配置和排序位置保留。` : `确定删除【${escape(target.heroTitle)}】吗？删除后配置无法恢复。`,
                confirmText: `确认${label}`,
                onConfirm: () => {
                    try {
                        if (name === 'delete') store.remove(target.id);
                        else store.setStatus(target.id, name === 'publish' ? 'published' : 'offline');
                        refresh();
                        GlobalDialog.success({ title: `${label}成功` });
                    } catch (failure) { GlobalDialog.warning({ title: `${label}失败`, desc: escape(failure.message) }); }
                }
            });
        });
        window.addEventListener('storage', event => {
            if (event.key === store.storageKey || event.key === null) refresh();
        });
        window.addEventListener('pageshow', event => { if (event.persisted) refresh(); });
        list.hidden = false;
        refresh();
        if (params.get('saved') === '1') GlobalDialog.success({ title: '保存成功' });
    }

    async function loadUpload(file, maxWidth) {
        if (!/^image\/(jpeg|png)$/.test(file.type)) throw new Error('请选择 JPG 或 PNG 格式的图片。');
        const url = URL.createObjectURL(file);
        try {
            const img = new Image();
            img.src = url;
            await img.decode();
            const ratio = Math.min(1, maxWidth / img.naturalWidth, maxWidth / img.naturalHeight);
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.round(img.naturalWidth * ratio));
            canvas.height = Math.max(1, Math.round(img.naturalHeight * ratio));
            canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
            return canvas.toDataURL(file.type === 'image/png' ? 'image/webp' : 'image/jpeg', 0.86);
        } finally {
            URL.revokeObjectURL(url);
        }
    }

    function renderEditor(isEdit) {
        const editor = document.getElementById('lineAdminEditor');
        const form = document.getElementById('lineForm');
        const error = document.getElementById('lineFormError');
        const preview = document.getElementById('lineFormPreview');
        const save = document.getElementById('lineFormSave');
        const publish = document.getElementById('lineFormPublish');
        const offline = document.getElementById('lineFormOffline');
        const hero = document.getElementById('lineHeroPreview');
        const id = isEdit ? params.get('id') : null;
        const title = isEdit ? '修改数据生产线' : '新增数据生产线';
        const textFields = ['badge', 'heroTitle', 'heroSubtitle', 'lead'];
        const images = { heroImg: '' };
        let record = {};
        let pendingImages = 0;

        function showError(message) {
            error.textContent = message;
            error.hidden = !message;
        }

        function setUploadPending(pending) {
            pendingImages += pending ? 1 : -1;
            save.disabled = preview.disabled = publish.disabled = offline.disabled = pendingImages > 0;
        }

        editor.hidden = false;
        document.title = `${title} · 运营中心`;
        document.getElementById('lineFormTitle').textContent = title;
        form.querySelectorAll('[data-line-back]').forEach(link => { link.href = url({ q: params.get('q'), status: params.get('status'), page: params.get('page') }); });
        try {
            const records = store.list();
            if (isEdit) record = records.find(line => line.id === id);
        } catch {
            showError('暂时无法读取数据生产线，请检查浏览器存储设置。');
        }
        if (!record || !error.hidden) {
            if (!record) showError('没有找到要修改的数据生产线。');
            document.getElementById('lineFormContent').hidden = true;
            document.getElementById('lineFormFooter').hidden = true;
            return;
        }

        const state = record.status || 'draft';
        const statusBadge = document.getElementById('lineFormStatus');
        statusBadge.className = 'zone-status-tag ' + state;
        statusBadge.textContent = statusLabels[state];
        publish.querySelector('span:last-child').textContent = state === 'published' ? '发布更新' : '发布';
        offline.hidden = state !== 'published';

        textFields.forEach(name => { form.elements[name].value = record[name] || ''; });
        const navigationEditor = window.NavigationIcon.mountEditor(document.getElementById('lineNavigationIcon'), {
            kind: 'line', value: record.navIcon,
            onUploadPending: setUploadPending
        });
        const sectionEditor = window.ContentSectionEditor.mountEditor(document.getElementById('lineSections'), { sections: record.sections || [] }, {
            embedded: true,
            showTitle: false,
            onError: showError,
            onUploadPending: setUploadPending
        });

        function updateHero() {
            const badge = form.elements.badge.value.trim();
            const heading = form.elements.heroTitle.value.trim() || '数据生产线';
            const subtitle = form.elements.heroSubtitle.value.trim();
            hero.innerHTML = image(images.heroImg) + `<div class="service-hero-editor-mask">
                ${badge ? `<span>${escape(badge)}</span>` : ''}<strong>${escape(heading)}</strong>${subtitle ? `<p>${escape(subtitle)}</p>` : ''}
            </div>`;
        }

        function showImage(field) {
            form.querySelector(`[data-line-image="${field}"]`).innerHTML = image(images[field]) || icon('image');
            const label = form.querySelector(`[data-line-upload-label="${field}"] span:last-child`);
            label.textContent = (images[field] ? '更换' : '上传') + '背景图';
        }

        function formData() {
            const values = Object.fromEntries(textFields.map(name => [name, form.elements[name].value.trim()]));
            const sections = sectionEditor.sections.map(section => ({ ...section, cards: section.cards.filter(window.ContentSectionEditor.hasCardContent) }))
                .filter(window.ContentSectionEditor.hasSectionContent);
            return { ...values, ...images, navIcon: navigationEditor.value(), sections };
        }

        form.querySelectorAll('[data-line-upload]').forEach(input => {
            const field = input.dataset.lineUpload;
            images[field] = store.imageSrc(record[field]);
            showImage(field);
            input.addEventListener('change', async () => {
                const file = input.files[0];
                if (!file) return;
                setUploadPending(true);
                input.disabled = true;
                showError('');
                try {
                    images[field] = await loadUpload(file, 1600);
                    showImage(field);
                    updateHero();
                } catch (failure) {
                    showError(failure.name === 'Error' ? failure.message : '图片读取失败，请重新选择。');
                } finally {
                    input.value = '';
                    input.disabled = false;
                    setUploadPending(false);
                }
            });
        });
        ['badge', 'heroTitle', 'heroSubtitle'].forEach(name => form.elements[name].addEventListener('input', updateHero));
        form.addEventListener('keydown', event => {
            if (event.key === 'Enter' && event.target.matches('[data-iip-search]')) event.preventDefault();
        });
        updateHero();

        preview.addEventListener('click', () => {
            const linksError = window.ContentSectionEditor.validate(sectionEditor);
            if (linksError) { showError(linksError); return; }
            const tab = window.open('about:blank', '_blank');
            if (!tab) {
                showError('预览窗口被拦截，请允许弹出窗口后重试。');
                return;
            }
            try {
                const draft = formData();
                tab.sessionStorage.setItem(store.previewKey, JSON.stringify(draft));
                tab.opener = null;
                tab.location.replace(new URL(store.href() + '?preview=1', location.href).href);
                showError('');
            } catch {
                tab.close();
                showError('无法打开预览，请检查浏览器存储设置或减少图片大小后重试。');
            }
        });

        function saveData(status) {
            if (pendingImages) return;
            const linksError = window.ContentSectionEditor.validate(sectionEditor);
            if (linksError) { showError(linksError); return; }
            const data = formData();
            if (!data.heroTitle) {
                showError('请填写标题。');
                form.elements.heroTitle.focus();
                return;
            }
            if (!data.heroSubtitle) {
                showError('请填写副标题。');
                form.elements.heroSubtitle.focus();
                return;
            }
            try {
                const saved = store.save(status ? { ...data, status } : data, id);
                if (!saved) {
                    showError('该数据生产线已删除，请返回列表。');
                    save.disabled = true;
                    return;
                }
                location.assign(url({ saved: '1', q: params.get('q'), status: params.get('status'), page: params.get('page') }));
            } catch (failure) {
                showError(failure.name === 'QuotaExceededError' ? '图片占用超过浏览器存储容量，请减少图片大小后重试。' : '保存失败，请检查浏览器存储设置后重试。');
            }
        }
        form.addEventListener('submit', event => { event.preventDefault(); saveData(); });
        publish.addEventListener('click', () => {
            if (!form.reportValidity() || pendingImages) return;
            GlobalDialog.confirm({ title: state === 'published' ? '发布更新' : '发布数据生产线', desc: '发布后是否在门户展示，以已发布生产线中的排序前 5 条为准，超出部分暂不展示。', confirmText: '确认发布', onConfirm: () => saveData('published') });
        });
        offline.addEventListener('click', () => {
            GlobalDialog.warning({ title: '下架数据生产线', desc: '下架后门户入口及正式详情将隐藏，已保存配置和排序位置保留。', confirmText: '确认下架', onConfirm: () => {
                try { store.setStatus(id, 'offline'); location.assign(url({ q: params.get('q'), status: params.get('status'), page: params.get('page') })); }
                catch (failure) { showError(failure.message); }
            } });
        });
    }

    const view = params.get('view');
    if (view === 'new' || view === 'edit') renderEditor(view === 'edit');
    else renderList();
})();
