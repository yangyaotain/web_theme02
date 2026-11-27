(function () {
    'use strict';

    const root = document.querySelector('[data-partner-admin]');
    const ui = window.PartnerUI;
    const { escape, icon, logo, date } = ui;
    const params = new URLSearchParams(window.location.search);
    const isApplications = params.get('menu') === 'applications';
    const isPartnerApps = params.get('menu') === 'partner-apps';
    const store = isPartnerApps ? window.PartnerStore.applicationStore : window.PartnerStore;
    const entity = isPartnerApps ? '应用' : '伙伴';
    const detailPage = isPartnerApps ? 'partner-application-detail.html' : 'partner-detail.html';
    const previewPrefix = isPartnerApps ? 'lg-ecosystem-partners:v1:app-preview:' : 'partner-preview:';
    const associationKey = 'partnerId';
    const pageSize = 10;
    const statusLabels = { draft: '未发布', published: '已发布', offline: '已下架' };
    const associationRecords = () => window.PartnerStore.listPartners().map(record => ({ code: record.id, name: record.name }));

    function associationCell(record) {
        const organization = associationRecords().find(item => item.code === record[associationKey]);
        return `<div class="partner-organization-cell">
            ${organization ? `<span class="partner-organization-name" title="${escape(organization.name)}">${escape(organization.name)}</span>` : ''}
            <button class="zone-row-action" type="button" data-partner-association="${escape(record.id)}"
                aria-label="${escape((organization ? '修改' : '设置') + record.name + '的所属伙伴')}" aria-haspopup="dialog" aria-expanded="false" aria-controls="partner-organization-picker">
                ${icon('edit')}<span>${organization ? '修改' : '未关联'}</span>
            </button>
        </div>`;
    }

    function managementHref(query = {}) {
        const target = new URLSearchParams(query);
        if (isPartnerApps) target.set('menu', 'partner-apps');
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

    function partnerRow(record, index, total, navigationIds) {
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
            ${isPartnerApps ? `<td>${associationCell(record)}</td>` : ''}
            <td><span class="zone-table-status partner-table-state ${escape(record.status)}">${statusLabels[record.status]}</span></td>
            <td><span class="zone-navigation-status${navigationIds.has(record.id) ? ' is-visible' : ''}">${navigationIds.has(record.id) ? '导航展示中' : isPublished ? '未在导航展示' : '—'}</span></td>
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
        root.classList.toggle('partner-profile-admin', !isApplications && !isPartnerApps);
        const title = isApplications ? '生态伙伴申请' : isPartnerApps ? '生态伙伴应用' : '生态伙伴管理';
        document.title = `${title} · 运营中心`;
        const columns = isApplications
            ? '<th>企业名称</th><th class="partner-credit-column">统一社会信用代码</th><th>对接联系人</th><th>联系电话</th><th class="partner-time-column">申请时间</th>'
            : `<th class="zone-sequence-column">序号</th><th>${isPartnerApps ? '应用名称' : '企业名称'} / 副标题</th>${isPartnerApps ? '<th class="partner-organization-column">所属伙伴</th>' : ''}<th class="partner-status-column">发布状态</th><th class="zone-navigation-column">导航展示</th><th class="partner-time-column">更新时间</th>`;
        root.innerHTML = `
            <header class="zone-admin-header">
                <div class="zone-admin-title-row"><h1>${title}</h1></div>
                ${isApplications ? '' : `<a class="zone-admin-button primary" href="${escape(managementHref({ view: 'create' }))}">${icon('add')}<span>新建${entity}</span></a>`}
            </header>
            ${isApplications ? '' : `<div class="zone-navigation-notice">
                <p>门户导航按当前排序展示已发布内容的前 5 条，上架数量不限，超出部分仍可在${isPartnerApps ? '全部伙伴应用列表' : '伙伴目录'}中查看。可通过【上移】【下移】调整展示顺序。</p>
                <span class="zone-navigation-count" data-navigation-count role="status"></span>
            </div>`}
            <form class="zone-admin-filter">
                <label><span>${isPartnerApps ? '应用名称' : '企业名称'}</span><input type="search" name="keyword" placeholder="请输入${isPartnerApps ? '应用名称' : '企业名称'}"></label>
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
        const picker = isPartnerApps ? document.createElement('div') : null;
        if (picker) {
            picker.id = 'partner-organization-picker';
            picker.className = 'zone-picker-search-menu partner-organization-picker';
            picker.hidden = true;
            picker.setAttribute('role', 'dialog');
            picker.setAttribute('aria-label', '选择所属伙伴');
            picker.innerHTML = `<div class="partner-organization-search">${icon('search')}
                <input type="search" placeholder="请输入伙伴名称搜索" aria-label="搜索伙伴" aria-controls="partner-organization-options" autocomplete="off">
                </div><div class="partner-organization-options" id="partner-organization-options" role="listbox" aria-label="所属伙伴"></div>
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
                const wasAssociated = Boolean(associationRecord[associationKey]);
                try {
                    if (associationRecord[associationKey] !== option.dataset.organizationCode) {
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
            const records = associationRecords().filter(record => record.name.toLowerCase().includes(keyword));
            picker.querySelector('[role="listbox"]').innerHTML = records.map(record => {
                const selected = record.code === associationRecord?.[associationKey];
                return `<button class="zone-picker-search-option partner-organization-option${selected ? ' active' : ''}" type="button" role="option"
                    aria-selected="${selected}" data-organization-code="${escape(record.code)}">
                    <span><span class="partner-organization-option-name">${escape(record.name)}</span></span>${selected ? icon('check') : ''}</button>`;
            }).join('') || `<div class="zone-picker-search-empty" role="status">${keyword ? '暂无匹配的' : '暂无可关联的'}伙伴</div>`;
        }

        function openOrganizationPicker(trigger) {
            if (!picker) return;
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
            let navigationIds = new Set();
            try {
                records = getRecords().filter(record => record.name.toLowerCase().includes(keyword) && (!status || record.status === status));
                if (!isApplications) navigationIds = new Set(store.listForNavigation().map(record => record.id));
            }
            catch (failure) { error.textContent = failure.message; error.hidden = false; }
            if (!isApplications) root.querySelector('[data-navigation-count]').textContent = `导航展示 ${navigationIds.size} / 5 条`;
            matched = records;
            const totalPages = Math.max(1, Math.ceil(records.length / pageSize));
            page = Math.min(page, totalPages);
            const start = (page - 1) * pageSize;
            if (!isApplications) {
                params.set('q', keyword); params.set('status', status); params.set('page', page);
                history.replaceState(null, '', managementHref());
                root.querySelector('.zone-admin-header .zone-admin-button').href = managementHref({ view: 'create' });
            }
            tableBody.innerHTML = records.slice(start, start + pageSize).map((record, index) => isApplications ? applicationRow(record) : partnerRow(record, start + index, records.length, navigationIds)).join('');
            empty.hidden = records.length > 0;
            empty.textContent = keyword || status ? '暂无符合条件的记录' : `暂无${isApplications ? '生态伙伴申请' : entity}`;
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
                    localStorage.setItem(previewPrefix + token, JSON.stringify(record));
                    window.open(detailPage + '?preview=' + encodeURIComponent(token), '_blank');
                    return;
                }
            } catch (failure) { error.textContent = failure.message; error.hidden = false; return; }
            const isPublished = record.status === 'published';
            const label = action === 'delete' ? '删除' : isPublished ? '下架' : '发布';
            GlobalDialog[action === 'delete' ? 'danger' : isPublished ? 'warning' : 'confirm']({
                title: `${label}${entity}`,
                desc: action === 'delete' ? `确定删除【${escape(record.name)}】吗？删除后配置无法恢复。` : `${escape(record.name)}${isPublished ? `下架后，门户导航、${isPartnerApps ? '全部伙伴应用列表和应用详情' : '伙伴目录及伙伴详情'}将隐藏，配置和排序位置保留。` : `发布后将在门户${isPartnerApps ? '伙伴应用列表' : '伙伴目录'}展示，导航按当前排序展示已发布内容的前 5 条。`}`,
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
            if (!event.detail || event.detail === (isApplications ? 'applications' : isPartnerApps ? 'partnerApps' : 'profiles') || (isPartnerApps && event.detail === 'profiles')) renderRows();
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

    function mountPartnerSelect(container, model) {
        const records = window.PartnerStore.listPartners();
        if (records.length <= 10) {
            container.innerHTML = '<select class="service-editor-select" aria-label="所属伙伴" required><option value="">请选择所属伙伴</option>'
                + records.map(record => '<option value="' + escape(record.id) + '">' + escape(record.name) + '</option>').join('') + '</select>';
            const select = container.querySelector('select');
            select.value = model.partnerId || '';
            select.addEventListener('change', () => { model.partnerId = select.value; });
            return;
        }
        // Reuse the list association picker styles when the choices require search.
        container.innerHTML = '<button class="service-editor-select partner-select-trigger" type="button" aria-haspopup="listbox" aria-expanded="false"></button>'
            + '<div class="zone-picker-search-menu partner-editor-picker" hidden><div class="partner-organization-search">' + icon('search')
            + '<input type="search" aria-label="搜索所属伙伴" placeholder="请输入伙伴名称搜索" autocomplete="off"></div><div class="partner-organization-options" role="listbox" aria-label="所属伙伴"></div></div>';
        const trigger = container.querySelector('button');
        const menu = container.querySelector('.partner-editor-picker');
        const search = menu.querySelector('input');
        const options = menu.querySelector('[role="listbox"]');
        const sync = () => { trigger.textContent = records.find(record => record.id === model.partnerId)?.name || '请选择所属伙伴'; };
        const close = () => { menu.hidden = true; trigger.setAttribute('aria-expanded', 'false'); };
        function render() {
            const keyword = search.value.trim().toLowerCase();
            options.innerHTML = records.filter(record => record.name.toLowerCase().includes(keyword)).map(record =>
                '<button class="zone-picker-search-option partner-organization-option" type="button" role="option" aria-selected="' + (record.id === model.partnerId) + '" data-partner-id="' + escape(record.id) + '"><span>' + escape(record.name) + '</span>' + (record.id === model.partnerId ? icon('check') : '') + '</button>'
            ).join('') || '<div class="zone-picker-search-empty" role="status">暂无匹配的伙伴</div>';
        }
        trigger.addEventListener('click', () => {
            if (!menu.hidden) { close(); return; }
            menu.hidden = false;
            trigger.setAttribute('aria-expanded', 'true');
            search.value = '';
            render();
            search.focus();
        });
        search.addEventListener('input', render);
        options.addEventListener('click', event => {
            const button = event.target.closest('[data-partner-id]');
            if (!button) return;
            model.partnerId = button.dataset.partnerId;
            sync(); close(); trigger.focus();
        });
        container.addEventListener('keydown', event => {
            if (event.key === 'Escape') { close(); trigger.focus(); }
            if (!['ArrowDown', 'ArrowUp'].includes(event.key) || menu.hidden) return;
            event.preventDefault();
            const current = event.target.closest('[data-partner-id]');
            const next = current ? (event.key === 'ArrowDown' ? current.nextElementSibling : current.previousElementSibling)
                : (event.key === 'ArrowDown' ? options.firstElementChild : options.lastElementChild);
            if (next?.matches('button')) next.focus();
            else search.focus();
        });
        document.addEventListener('pointerdown', event => { if (!container.contains(event.target)) close(); });
        container.addEventListener('focusout', event => { if (!container.contains(event.relatedTarget)) close(); });
        sync();
    }

    function renderEditor(isEdit) {
        const record = isEdit ? store.listPartners().find(item => item.id === params.get('id')) : {};
        const title = (isEdit ? '编辑' : '新建') + entity;
        const back = '<a class="service-back-btn" href="' + escape(managementHref()) + '">' + icon('back') + '<span>返回</span></a>';
        document.title = title + ' · 运营中心';
        if (!record) {
            root.innerHTML = back + '<p class="partner-admin-empty">没有找到要编辑的' + entity + '，请返回列表。</p>';
            return;
        }
        root.classList.add('partner-service-editor');
        const model = { ...record, lead: isPartnerApps ? record.lead ?? '' : record.lead ?? record.intro ?? '' };
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
            + '<section class="service-form-section"><h2>' + (isPartnerApps ? '应用信息' : '左侧信息') + '</h2>'
            + field(isPartnerApps ? '应用 Logo' : '企业 Logo', '<div data-logo-picker role="group" aria-label="' + (isPartnerApps ? '应用 Logo' : '企业 Logo') + '"></div>', true, true)
            + field('标题', input('name', '请输入标题', true), true)
            + field('副标题', input('subtitle', '请输入副标题', true), true)
            + (isPartnerApps ? field('所属伙伴', '<div class="partner-editor-association" data-editor-association></div>', true) : '')
            + '</section><section class="service-form-section"><h2>横幅设置</h2>'
            + field('横幅预览', '<div class="service-hero-editor-preview" data-hero-preview></div>' + upload('heroImg', '更换背景图', '建议尺寸 1200×400，支持 JPG/PNG/WebP'))
            + field('角标文字', input('badge', isPartnerApps ? '用于卡片标签和横幅角标' : '请输入横幅角标'))
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
        if (isPartnerApps) mountPartnerSelect(root.querySelector('[data-editor-association]'), model);
        function updatePending(pending) {
            pendingImages += pending ? 1 : -1;
            submit.disabled = previewButton.disabled = publishButton.disabled = pendingImages > 0;
            if (offlineButton) offlineButton.disabled = pendingImages > 0;
        }
        window.NavigationIcon.mountEditor(root.querySelector('[data-logo-picker]'), {
            label: isPartnerApps ? '应用 Logo' : '企业 Logo',
            value: model.logo,
            hint: '同时用于门户列表和导航菜单，建议使用正方形图片，支持 JPG、PNG，单张不超过 1MB。',
            onChange: value => { model.logo = value; },
            onUploadPending: updatePending
        });
        const sections = window.ContentSectionEditor.mountEditor(root.querySelector('[data-partner-section-editor]'), isPartnerApps ? { sections: store.presentation(model).sections } : model, { embedded: true, showTitle: false, exactFields: isPartnerApps, onUploadPending: updatePending });

        function updateHero() {
            const preview = root.querySelector('[data-hero-preview]');
            if (isPartnerApps) {
                const content = store.presentation(model);
                preview.hidden = ![content.heroImg, content.badge, content.heroTitle, content.heroSubtitle].some(Boolean);
                preview.innerHTML = (content.heroImg ? '<img src="' + escape(content.heroImg) + '" alt="横幅预览">' : '')
                    + '<div class="service-hero-editor-mask">'
                    + (content.badge ? '<span>' + escape(content.badge) + '</span>' : '')
                    + (content.heroTitle ? '<strong>' + escape(content.heroTitle) + '</strong>' : '')
                    + (content.heroSubtitle ? '<p>' + escape(content.heroSubtitle) + '</p>' : '') + '</div>';
                return;
            }
            preview.innerHTML = (model.heroImg ? '<img src="' + escape(model.heroImg) + '" alt="横幅预览">' : '')
                + '<div class="service-hero-editor-mask"><span>' + escape(model.badge || model.category || (isPartnerApps ? '伙伴应用' : '生态伙伴')) + '</span><strong>'
                + escape(model.heroTitle || model.name || entity + '介绍') + '</strong><p>' + escape(model.heroSubtitle) + '</p></div>';
        }
        function syncFields() {
            ['name', 'subtitle', 'badge', 'heroTitle', 'heroSubtitle', 'lead'].forEach(name => { model[name] = form.elements[name].value.trim(); });
            model.intro = model.lead;
            model.sections = sections.sections;
            model.sources = [];
        }

        function validateLogo() {
            if (store.logoVisual(model.logo)) return true;
            error.textContent = isPartnerApps ? '请上传图片或选择图标作为应用 Logo。' : '请上传图片或选择图标作为企业 Logo。';
            error.hidden = false;
            root.querySelector('[data-logo-picker]').scrollIntoView({ behavior: 'smooth', block: 'center' });
            return false;
        }

        function validateLinks() {
            const message = window.ContentSectionEditor.validate(sections);
            if (!message) return true;
            error.textContent = message;
            error.hidden = false;
            return false;
        }

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
                    model[kind] = await readImage(file, 1200);
                    root.querySelector('[data-image-preview="' + kind + '"]').innerHTML = '<img src="' + escape(model.heroImg) + '" alt="背景图">';
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
                localStorage.setItem(previewPrefix + token, JSON.stringify(model));
            } catch {
                error.textContent = '预览暂不可用，请检查浏览器存储或减少图片数量后重试。';
                error.hidden = false;
                return;
            }
            window.open(detailPage + '?preview=' + encodeURIComponent(token), '_blank');
        });
        function saveData(nextStatus) {
            if (pendingImages) return;
            syncFields();
            error.hidden = true;
            if (!validateLogo() || !validateLinks()) return;
            if (isPartnerApps && !model.partnerId) {
                error.textContent = '请选择所属伙伴。';
                error.hidden = false;
                root.querySelector('[data-editor-association] select, [data-editor-association] .partner-select-trigger')?.focus();
                return;
            }
            if (!model.name || !model.subtitle) {
                error.textContent = !model.name ? '请填写标题。' : '请填写副标题。';
                error.hidden = false;
                (!model.name ? form.elements.name : form.elements.subtitle).focus();
                return;
            }
            try {
                const { status, ...content } = model;
                store.savePartner(nextStatus ? { ...content, status: nextStatus } : content, record.id);
                sessionStorage.setItem('lg-partner-admin-notice', (nextStatus ? '发布' : '保存') + '成功');
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
            GlobalDialog.confirm({ title: state === 'published' ? '发布更新' : '发布' + entity, desc: '确认后，当前内容将在门户' + (isPartnerApps ? '伙伴应用列表' : '伙伴目录') + '展示，导航按当前排序展示已发布内容的前 5 条。', confirmText: '确认发布', onConfirm: () => saveData('published') });
        });
        offlineButton?.addEventListener('click', () => {
            GlobalDialog.warning({ title: '下架' + entity, desc: '下架后门户' + (isPartnerApps ? '应用列表、导航及应用详情' : '伙伴目录、导航及伙伴详情') + '将隐藏，已保存配置和排序位置保留。', confirmText: '确认下架', onConfirm: () => {
                try { store.setPartnerStatus(record.id, 'offline'); sessionStorage.setItem('lg-partner-admin-notice', '下架成功'); window.location.href = managementHref(); }
                catch (failure) { error.textContent = failure.message; error.hidden = false; }
            } });
        });
    }

    const mode = params.get('view');
    if (!isApplications && (mode === 'create' || mode === 'edit')) renderEditor(mode === 'edit');
    else {
        renderList();
        const notice = sessionStorage.getItem('lg-partner-admin-notice');
        sessionStorage.removeItem('lg-partner-admin-notice');
        if (notice && window.performance?.getEntriesByType('navigation')[0]?.type !== 'reload') GlobalDialog.success({ title: notice });
    }
})();
