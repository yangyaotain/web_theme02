(function () {
    'use strict';

    const root = document.querySelector('[data-partner-admin]');
    const store = window.PartnerStore;
    const ui = window.PartnerUI;
    const { escape, icon, logo, date } = ui;
    const params = new URLSearchParams(window.location.search);
    const isApplications = params.get('menu') === 'applications';
    const pageSize = 10;
    const statusLabels = { draft: '未发布', published: '已发布', offline: '已下架' };
    const certifiedOrganizations = window.OrganizationCertificationStore.listOrganizations()
        .filter(record => record.status === '已认证');

    function associationCell(record) {
        const organization = certifiedOrganizations.find(item => item.code === record.organizationCode);
        return `<div class="partner-organization-cell">
            ${organization ? `<span class="partner-organization-name" title="${escape(organization.name)}">${escape(organization.name)}</span>` : ''}
            <button class="zone-row-action" type="button" data-partner-association="${escape(record.id)}"
                aria-label="${escape((organization ? '修改' : '设置') + record.name + '的认证机构关联')}" aria-haspopup="dialog" aria-expanded="false" aria-controls="partner-organization-picker">
                ${organization ? icon('edit') + '<span>修改</span>' : '<span>未关联</span>'}
            </button>
        </div>`;
    }

    function managementHref(query = {}) {
        const target = new URLSearchParams(query);
        ['q', 'status', 'page'].forEach(key => { if (!target.has(key) && params.has(key)) target.set(key, params.get(key)); });
        if (params.has('operationSidebarOpen')) target.set('operationSidebarOpen', params.get('operationSidebarOpen'));
        return 'operation-partners.html' + (target.size ? '?' + target.toString() : '');
    }

    function getRecords() {
        return isApplications ? store.listApplications() : store.listPartners();
    }

    function applicationRow(record) {
        return `<tr>
            <td><span class="zone-admin-name" title="${escape(record.name)}">${escape(record.name)}</span></td>
            <td>${escape(record.creditCode)}</td><td>${escape(record.contact)}</td><td>${escape(record.phone)}</td>
            <td>${escape(date(record.createdAt))}</td>
            <td><button class="zone-row-action" type="button" data-action="view" data-id="${escape(record.id)}">${icon('eye')}<span>查看</span></button></td>
        </tr>`;
    }

    function partnerRow(record, index, total) {
        const isPublished = record.status === 'published';
        const label = isPublished ? '下架' : '发布';
        function action(name, text, glyph, disabled = false, danger = false) {
            return `<button class="zone-row-action${danger ? ' danger' : ''}" type="button" data-action="${name}" data-id="${escape(record.id)}"${disabled ? ' disabled aria-disabled="true"' : ''}>${icon(glyph)}<span>${text}</span></button>`;
        }
        return `<tr>
            <td><span class="zone-admin-sequence">${index + 1}</span></td>
            <td><div class="partner-table-company">${logo(record)}<div>
                <span class="zone-admin-name" title="${escape(record.name)}">${escape(record.name)}</span>
                <span class="zone-admin-description">${escape(record.subtitle)}</span>
            </div></div></td>
            <td>${associationCell(record)}</td>
            <td><span class="zone-table-status partner-table-state ${escape(record.status)}">${statusLabels[record.status]}</span></td>
            <td>${escape(date(record.updatedAt || record.createdAt))}</td>
            <td><div class="zone-table-actions">
                ${action('up', '上移', 'up', index === 0)}
                ${action('down', '下移', 'down', index === total - 1)}
                ${action('preview', '预览', 'eye')}
                <a class="zone-row-action" href="${escape(managementHref({ view: 'edit', id: record.id }))}">${icon('edit')}<span>编辑</span></a>
                ${action('status', label, isPublished ? 'offline' : 'publish')}
                ${isPublished ? '' : action('delete', '删除', 'remove', false, true)}
            </div></td>
        </tr>`;
    }

    function renderList() {
        root.classList.toggle('partner-application-admin', isApplications);
        const title = isApplications ? '共创伙伴申请' : '共创伙伴管理';
        document.title = `${title} · 运营中心`;
        const columns = isApplications
            ? '<th>企业名称</th><th class="partner-credit-column">统一社会信用代码</th><th>对接联系人</th><th>联系电话</th><th class="partner-time-column">申请时间</th>'
            : '<th class="zone-sequence-column">序号</th><th>企业名称 / 副标题</th><th class="partner-organization-column">认证机构关联</th><th class="partner-status-column">发布状态</th><th class="partner-time-column">更新时间</th>';
        root.innerHTML = `
            <header class="zone-admin-header">
                <div class="zone-admin-title-row"><h1>${title}</h1></div>
                ${isApplications ? '' : `<a class="zone-admin-button primary" href="${escape(managementHref({ view: 'create' }))}">${icon('add')}<span>新建伙伴</span></a>`}
            </header>
            <form class="zone-admin-filter">
                <label><span>企业名称</span><input type="search" name="keyword" placeholder="请输入企业名称"></label>
                ${isApplications ? '' : `<label><span>发布状态</span><select name="status" aria-label="发布状态"><option value="">全部状态</option>${Object.entries(statusLabels).map(([value, label]) => `<option value="${value}">${label}</option>`).join('')}</select></label>`}
                <div class="zone-admin-filter-actions">
                    <button class="zone-admin-button primary compact" type="submit">${icon('search')}<span>查询</span></button>
                    ${isApplications ? '' : `<button class="zone-admin-button compact" type="reset">${icon('reset')}<span>重置</span></button>`}
                </div>
            </form>
            <p class="partner-form-error" data-list-error role="alert" hidden></p>
            <div class="zone-admin-table-card">
                <div class="zone-admin-table-scroll">
                    <table class="zone-admin-table" aria-label="${title}">
                        <thead><tr>${columns}<th class="partner-action-column">操作</th></tr></thead>
                        <tbody></tbody>
                    </table>
                </div>
                <p class="partner-admin-empty" hidden></p>
                <div class="pagination-bar" aria-label="列表分页"></div>
            </div>`;

        const filter = root.querySelector('form');
        const tableBody = root.querySelector('tbody');
        const empty = root.querySelector('.partner-admin-empty');
        const pagination = root.querySelector('.pagination-bar');
        const error = root.querySelector('[data-list-error]');
        let keyword = isApplications ? '' : (params.get('q') || '').trim().toLowerCase();
        let status = !isApplications && Object.hasOwn(statusLabels, params.get('status')) ? params.get('status') : '';
        let page = Math.max(1, Number.parseInt(params.get('page'), 10) || 1);
        let matched = [];
        let associationTrigger = null;
        let associationRecord = null;
        const picker = !isApplications ? document.createElement('div') : null;
        if (picker) {
            picker.id = 'partner-organization-picker';
            picker.className = 'zone-picker-search-menu partner-organization-picker';
            picker.hidden = true;
            picker.setAttribute('role', 'dialog');
            picker.setAttribute('aria-label', '选择认证机构');
            picker.innerHTML = `<div class="partner-organization-search">${icon('search')}
                <input type="search" placeholder="请输入机构名称搜索" aria-label="搜索认证机构" aria-controls="partner-organization-options" autocomplete="off">
                </div><div class="partner-organization-options" id="partner-organization-options" role="listbox" aria-label="已认证机构"></div>
                <p class="partner-form-error" role="alert" hidden></p>`;
            document.body.appendChild(picker);
            const search = picker.querySelector('input');
            const options = picker.querySelector('[role="listbox"]');
            search.addEventListener('input', renderOrganizationOptions);
            search.addEventListener('keydown', event => {
                if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key) || event.isComposing) return;
                event.preventDefault();
                const option = event.key === 'ArrowUp' ? options.lastElementChild : options.querySelector('button');
                if (option?.matches('button')) {
                    if (event.key === 'Enter') option.click();
                    else option.focus();
                }
            });
            picker.addEventListener('keydown', event => {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    closeOrganizationPicker(true);
                    return;
                }
                const option = event.target.closest('[data-organization-code]');
                if (!option || !['ArrowDown', 'ArrowUp'].includes(event.key)) return;
                event.preventDefault();
                const next = event.key === 'ArrowDown' ? option.nextElementSibling : option.previousElementSibling;
                (next || search).focus();
            });
            picker.addEventListener('click', event => {
                const option = event.target.closest('[data-organization-code]');
                if (!option || !associationRecord) return;
                const id = associationRecord.id;
                const wasAssociated = Boolean(associationRecord.organizationCode);
                try {
                    if (associationRecord.organizationCode !== option.dataset.organizationCode) {
                        store.associatePartner(id, option.dataset.organizationCode);
                        GlobalDialog.success({ title: wasAssociated ? '关联已更新' : '关联成功', duration: 1000 });
                    }
                    closeOrganizationPicker();
                    Array.from(tableBody.querySelectorAll('[data-partner-association]'))
                        .find(button => button.dataset.partnerAssociation === id)?.focus();
                } catch (failure) {
                    const message = picker.querySelector('[role="alert"]');
                    message.textContent = failure.message;
                    message.hidden = false;
                }
            });
            picker.addEventListener('focusout', event => {
                if (!picker.contains(event.relatedTarget)) closeOrganizationPicker();
            });
            document.addEventListener('pointerdown', event => {
                if (!picker.hidden && !picker.contains(event.target) && !associationTrigger?.contains(event.target)) closeOrganizationPicker();
            });
            window.addEventListener('resize', () => closeOrganizationPicker());
            window.addEventListener('scroll', event => {
                if (event.target === window || !picker.contains(event.target)) closeOrganizationPicker();
            }, true);
        }
        filter.elements.keyword.value = keyword;
        if (!isApplications) filter.elements.status.value = status;

        function closeOrganizationPicker(restoreFocus = false) {
            if (!picker || picker.hidden) return;
            const trigger = associationTrigger;
            picker.hidden = true;
            trigger?.setAttribute('aria-expanded', 'false');
            associationTrigger = associationRecord = null;
            if (restoreFocus && trigger?.isConnected) trigger.focus();
        }

        function renderOrganizationOptions() {
            const keyword = picker.querySelector('input').value.trim().toLowerCase();
            const records = certifiedOrganizations.filter(record => record.name.toLowerCase().includes(keyword));
            picker.querySelector('[role="listbox"]').innerHTML = records.map(record => {
                const selected = record.code === associationRecord?.organizationCode;
                return `<button class="zone-picker-search-option partner-organization-option${selected ? ' active' : ''}" type="button" role="option"
                    aria-selected="${selected}" data-organization-code="${escape(record.code)}">
                    <span><span class="partner-organization-option-name">${escape(record.name)}</span>
                    <span class="partner-organization-code">${escape(record.code)}</span></span>${selected ? icon('check') : ''}</button>`;
            }).join('') || `<div class="zone-picker-search-empty" role="status">${keyword ? '暂无匹配的认证机构' : '暂无可关联的认证机构'}</div>`;
        }

        function openOrganizationPicker(trigger) {
            if (associationTrigger === trigger && !picker.hidden) { closeOrganizationPicker(true); return; }
            closeOrganizationPicker();
            associationRecord = store.listPartners().find(record => record.id === trigger.dataset.partnerAssociation);
            if (!associationRecord) return;
            associationTrigger = trigger;
            trigger.setAttribute('aria-expanded', 'true');
            picker.querySelector('input').value = '';
            picker.querySelector('[role="alert"]').hidden = true;
            renderOrganizationOptions();
            // Use a body-level fixed layer so the table's scrolling container cannot clip the dropdown.
            const rect = trigger.closest('td').getBoundingClientRect();
            const width = Math.min(440, document.documentElement.clientWidth - 24);
            const below = window.innerHeight - rect.bottom - 16;
            const above = rect.top - 16;
            const openAbove = below < 300 && above > below;
            picker.style.width = width + 'px';
            picker.style.maxHeight = Math.max(100, Math.min(350, openAbove ? above : below)) + 'px';
            picker.style.left = Math.max(12, Math.min(rect.left, document.documentElement.clientWidth - width - 12)) + 'px';
            picker.hidden = false;
            picker.style.top = Math.max(12, openAbove ? rect.top - picker.offsetHeight - 4 : rect.bottom + 4) + 'px';
            picker.querySelector('input').focus({ preventScroll: true });
        }

        function renderRows() {
            closeOrganizationPicker();
            let records = [];
            try { records = getRecords().filter(record => record.name.toLowerCase().includes(keyword) && (!status || record.status === status)); }
            catch (failure) { error.textContent = failure.message; error.hidden = false; }
            matched = records;
            const totalPages = Math.max(1, Math.ceil(records.length / pageSize));
            page = Math.min(page, totalPages);
            const start = (page - 1) * pageSize;
            if (!isApplications) {
                params.set('q', keyword); params.set('status', status); params.set('page', page);
                history.replaceState(null, '', managementHref());
                root.querySelector('.zone-admin-header .zone-admin-button').href = managementHref({ view: 'create' });
            }
            tableBody.innerHTML = records.slice(start, start + pageSize).map((record, index) => isApplications ? applicationRow(record) : partnerRow(record, start + index, records.length)).join('');
            empty.hidden = records.length > 0;
            empty.textContent = keyword || status ? '暂无符合条件的记录' : `暂无${isApplications ? '共创伙伴申请' : '伙伴'}`;
            pagination.hidden = !records.length;
            pagination.innerHTML = `<span class="pagination-info">共 ${records.length} 条 · 第 ${page} / ${totalPages} 页</span>
                <button class="page-btn${page <= 1 ? ' disabled' : ''}" type="button" data-page="${page - 1}" aria-label="上一页" ${page <= 1 ? 'disabled' : ''}>${icon('back')}</button>
                <button class="page-btn${page >= totalPages ? ' disabled' : ''}" type="button" data-page="${page + 1}" aria-label="下一页" ${page >= totalPages ? 'disabled' : ''}>${icon('next')}</button>`;
        }

        function query() {
            keyword = filter.elements.keyword.value.trim().toLowerCase();
            page = 1;
            renderRows();
        }

        filter.addEventListener('submit', event => {
            event.preventDefault();
            query();
        });
        if (!isApplications) {
            filter.elements.status.addEventListener('change', () => { status = filter.elements.status.value; query(); });
            filter.addEventListener('reset', event => { event.preventDefault(); filter.elements.keyword.value = ''; filter.elements.status.value = status = ''; query(); });
        }
        pagination.addEventListener('click', event => {
            const button = event.target.closest('[data-page]');
            if (!button || button.disabled) return;
            page = Number(button.dataset.page);
            renderRows();
        });
        tableBody.addEventListener('click', event => {
            const associationButton = event.target.closest('[data-partner-association]');
            if (associationButton) {
                error.hidden = true;
                try { openOrganizationPicker(associationButton); }
                catch (failure) { error.textContent = failure.message; error.hidden = false; }
                return;
            }
            const button = event.target.closest('[data-action]');
            if (!button || button.disabled) return;
            const record = getRecords().find(item => item.id === button.dataset.id);
            if (!record) return;
            if (button.dataset.action === 'view') {
                ui.viewApplication(record);
                return;
            }
            const action = button.dataset.action;
            error.hidden = true;
            try {
                if (action === 'up' || action === 'down') {
                    const position = store.movePartner(record.id, action === 'up' ? -1 : 1, matched.map(item => item.id));
                    if (position !== null) page = Math.floor(position / pageSize) + 1;
                    renderRows();
                    tableBody.querySelector(`[data-id="${record.id}"][data-action="${action}"]:not(:disabled)`)?.focus();
                    GlobalDialog.success({ title: '排序已更新', duration: 1000 });
                    return;
                }
                if (action === 'preview') {
                    const token = crypto.randomUUID?.() || Date.now().toString(36);
                    localStorage.setItem('partner-preview:' + token, JSON.stringify(record));
                    window.open('partner-detail.html?preview=' + encodeURIComponent(token), '_blank');
                    return;
                }
            } catch (failure) { error.textContent = failure.message; error.hidden = false; return; }
            const isPublished = record.status === 'published';
            const label = action === 'delete' ? '删除' : isPublished ? '下架' : '发布';
            GlobalDialog[action === 'delete' ? 'danger' : isPublished ? 'warning' : 'confirm']({
                title: `${label}伙伴`,
                desc: action === 'delete' ? `确定删除【${escape(record.name)}】吗？删除后配置无法恢复。` : `${escape(record.name)}${isPublished ? '下架后，门户导航、伙伴目录及关联应用入口将隐藏，配置和排序位置保留。' : '发布后将在门户伙伴目录和相关入口展示。'}`,
                confirmText: `确认${label}`,
                onConfirm() {
                    try {
                        if (action === 'delete') store.removePartner(record.id);
                        else store.setPartnerStatus(record.id, isPublished ? 'offline' : 'published');
                        GlobalDialog.success({ title: `${label}成功` });
                    } catch (failure) {
                        error.textContent = failure.message;
                        error.hidden = false;
                    }
                }
            });
        });
        window.addEventListener('partner-store-change', event => {
            if (!event.detail || event.detail === (isApplications ? 'applications' : 'profiles')) renderRows();
        });
        renderRows();
    }

    async function readImage(file, maxSize) {
        if (!/^image\/(png|jpeg|webp)$/.test(file.type)) throw new Error('请选择 PNG、JPG 或 WebP 格式的图片。');
        const image = new Image();
        const url = URL.createObjectURL(file);
        try {
            image.src = url;
            await image.decode();
            const scale = Math.min(1, maxSize / Math.max(image.naturalWidth, image.naturalHeight));
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
            canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
            canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
            return canvas.toDataURL('image/png');
        } finally {
            URL.revokeObjectURL(url);
        }
    }

    function renderEditor(isEdit) {
        const record = isEdit ? store.listPartners().find(item => item.id === params.get('id')) : {};
        const title = isEdit ? '编辑伙伴' : '新建伙伴';
        const back = '<a class="service-back-btn" href="' + escape(managementHref()) + '">' + icon('back') + '<span>返回</span></a>';
        document.title = title + ' · 运营中心';
        if (!record) {
            root.innerHTML = back + '<p class="partner-admin-empty">没有找到要编辑的伙伴。</p>';
            return;
        }
        root.classList.add('partner-service-editor');
        const model = { ...record, lead: record.lead ?? record.intro ?? '' };
        const state = record.status || 'draft';
        let pendingImages = 0;
        const field = (label, content, required = false, top = false) => '<div class="service-editor-row' + (top ? ' align-start' : '') + '"><div class="service-editor-label">'
            + (required ? '<span>*</span>' : '') + label + '</div><div class="service-editor-field">' + content + '</div></div>';
        const input = (name, placeholder, required = false) => '<input class="service-editor-input" name="' + name + '" value="' + escape(model[name]) + '" placeholder="' + placeholder + '" maxlength="100"' + (required ? ' required' : '') + ' aria-label="' + placeholder + '">';
        const textarea = (name, placeholder, required = false) => '<textarea class="service-editor-textarea" name="' + name + '" placeholder="' + placeholder + '" maxlength="' + (name === 'lead' ? 2000 : 200) + '"' + (required ? ' required' : '') + ' aria-label="' + placeholder + '">' + escape(model[name]) + '</textarea>';
        const upload = (kind, label, hint) => '<div class="service-image-control"><div data-image-preview="' + kind + '"></div><div class="service-image-actions"><label class="service-secondary-btn">'
            + icon('publish') + '<span>' + label + '</span><input type="file" accept="image/png,image/jpeg,image/webp" data-image-upload="' + kind + '"' + (kind === 'logo' ? ' aria-required="true"' : '') + '></label><em>' + hint + '</em></div></div>';
        root.innerHTML = '<form class="service-editor-page">'
            + '<header class="service-editor-top"><div class="service-editor-heading">' + back + '<h1>' + title + '</h1><span class="zone-status-tag ' + state + '">' + statusLabels[state] + '</span></div></header>'
            + '<div class="service-editor-scroll"><p class="partner-form-error" data-form-error role="alert" hidden></p>'
            + '<div class="service-editor-layout service-editor-layout-content"><div class="service-editor-main">'
            + '<section class="service-form-section"><h2>左侧信息</h2>'
            + field('企业 Logo', upload('logo', '更换企业 Logo', '用于门户导航及伙伴目录，建议使用正方形图片，支持 JPG/PNG/WebP'), true)
            + field('标题', input('name', '请输入标题', true), true)
            + field('副标题', input('subtitle', '请输入副标题', true), true)
            + '</section><section class="service-form-section"><h2>横幅设置</h2>'
            + field('横幅预览', '<div class="service-hero-editor-preview" data-hero-preview></div>' + upload('heroImg', '更换背景图', '建议尺寸 1200×400，支持 JPG/PNG/WebP'))
            + field('角标文字', input('badge', '请输入横幅角标'))
            + field('横幅标题', input('heroTitle', '请输入横幅标题'))
            + field('横幅副标题', textarea('heroSubtitle', '请输入横幅副标题'))
            + '</section><section class="service-form-section"><h2>内容介绍</h2>'
            + field('引言', textarea('lead', '请输入引言'))
            + field('内容章节', '<div data-partner-section-editor></div>', false, true)
            + '</section></div></div></div>'
            + '<footer class="service-editor-footer"><a class="service-secondary-btn" href="' + escape(managementHref()) + '">' + icon('back') + '<span>取消</span></a>'
            + '<button class="service-secondary-btn" type="button" data-preview>' + icon('eye') + '<span>预览</span></button>'
            + '<button class="service-create-btn" type="submit">' + icon('check') + '<span>保存</span></button>'
            + '<button class="service-create-btn" type="button" data-publish>' + icon('publish') + '<span>' + (state === 'published' ? '发布更新' : '发布') + '</span></button>'
            + (state === 'published' ? '<button class="service-secondary-btn" type="button" data-offline>' + icon('offline') + '<span>下架</span></button>' : '') + '</footer></form>';
        const form = root.querySelector('form');
        const error = root.querySelector('[data-form-error]');
        const submit = form.querySelector('[type="submit"]');
        const previewButton = form.querySelector('[data-preview]');
        const publishButton = form.querySelector('[data-publish]');
        const offlineButton = form.querySelector('[data-offline]');
        function updatePending(pending) {
            pendingImages += pending ? 1 : -1;
            submit.disabled = previewButton.disabled = publishButton.disabled = pendingImages > 0;
            if (offlineButton) offlineButton.disabled = pendingImages > 0;
        }
        const sections = window.ContentSectionEditor.mountEditor(root.querySelector('[data-partner-section-editor]'), model, { embedded: true, showTitle: false, onUploadPending: updatePending });

        function updateHero() {
            root.querySelector('[data-hero-preview]').innerHTML = (model.heroImg ? '<img src="' + escape(model.heroImg) + '" alt="横幅预览">' : '')
                + '<div class="service-hero-editor-mask"><span>' + escape(model.badge || model.category || '共创伙伴') + '</span><strong>'
                + escape(model.heroTitle || model.name || '伙伴介绍') + '</strong><p>' + escape(model.heroSubtitle) + '</p></div>';
        }
        function syncFields() {
            ['name', 'subtitle', 'badge', 'heroTitle', 'heroSubtitle', 'lead'].forEach(name => { model[name] = form.elements[name].value.trim(); });
            model.intro = model.lead;
            model.sections = sections.sections;
            model.sources = [];
        }

        function validateLogo() {
            if (store.logoSrc(model.logo)) return true;
            error.textContent = '请上传企业 Logo。';
            error.hidden = false;
            root.querySelector('[data-image-preview="logo"]').scrollIntoView({ behavior: 'smooth', block: 'center' });
            return false;
        }

        function validateLinks() {
            const message = window.ContentSectionEditor.validate(sections);
            if (!message) return true;
            error.textContent = message;
            error.hidden = false;
            return false;
        }

        root.querySelector('[data-image-preview="logo"]').innerHTML = logo(model);
        root.querySelector('[data-image-preview="heroImg"]').innerHTML = model.heroImg ? '<img src="' + escape(model.heroImg) + '" alt="背景图">' : '';
        updateHero();
        form.addEventListener('input', () => { syncFields(); updateHero(); });
        root.querySelectorAll('[data-image-upload]').forEach(control => {
            control.addEventListener('change', async () => {
                const file = control.files[0];
                if (!file) return;
                error.hidden = true;
                updatePending(true);
                control.disabled = true;
                const kind = control.dataset.imageUpload;
                try {
                    model[kind] = await readImage(file, kind === 'logo' ? 192 : 1200);
                    root.querySelector('[data-image-preview="' + kind + '"]').innerHTML = kind === 'logo' ? logo(model) : '<img src="' + escape(model.heroImg) + '" alt="背景图">';
                    updateHero();
                } catch (failure) {
                    error.textContent = failure.name === 'Error' ? failure.message : '图片读取失败，请重新选择。';
                    error.hidden = false;
                } finally {
                    control.disabled = false;
                    control.value = '';
                    updatePending(false);
                }
            });
        });
        previewButton.addEventListener('click', () => {
            syncFields();
            error.hidden = true;
            if (!validateLinks()) return;
            const token = crypto.randomUUID?.() || Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
            try {
                localStorage.setItem('partner-preview:' + token, JSON.stringify(model));
            } catch {
                error.textContent = '预览暂不可用，请检查浏览器存储或减少图片数量后重试。';
                error.hidden = false;
                return;
            }
            window.open('partner-detail.html?preview=' + encodeURIComponent(token), '_blank');
        });
        function saveData(nextStatus) {
            if (pendingImages) return;
            syncFields();
            error.hidden = true;
            if (!validateLogo() || !validateLinks()) return;
            if (!model.name || !model.subtitle) {
                error.textContent = !model.name ? '请填写标题。' : '请填写副标题。';
                error.hidden = false;
                (!model.name ? form.elements.name : form.elements.subtitle).focus();
                return;
            }
            try {
                const { status, ...content } = model;
                store.savePartner(nextStatus ? { ...content, status: nextStatus } : content, record.id);
                window.location.href = managementHref();
            } catch (failure) {
                error.textContent = failure.message;
                error.hidden = false;
            }
        }
        form.addEventListener('submit', event => { event.preventDefault(); saveData(); });
        publishButton.addEventListener('click', () => {
            if (!form.reportValidity() || pendingImages) return;
            if (!validateLogo()) return;
            GlobalDialog.confirm({ title: state === 'published' ? '发布更新' : '发布伙伴', desc: '确认后，当前内容将在门户伙伴目录及相关入口展示。', confirmText: '确认发布', onConfirm: () => saveData('published') });
        });
        offlineButton?.addEventListener('click', () => {
            GlobalDialog.warning({ title: '下架伙伴', desc: '下架后门户目录、导航及关联应用入口将隐藏，已保存配置和排序位置保留。', confirmText: '确认下架', onConfirm: () => {
                try { store.setPartnerStatus(record.id, 'offline'); window.location.href = managementHref(); }
                catch (failure) { error.textContent = failure.message; error.hidden = false; }
            } });
        });
    }

    const mode = params.get('view');
    if (!isApplications && (mode === 'create' || mode === 'edit')) renderEditor(mode === 'edit');
    else renderList();
})();
