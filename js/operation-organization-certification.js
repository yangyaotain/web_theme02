(function () {
    'use strict';

    const organizations = window.OrganizationCertificationStore.listOrganizations();

    const root = document.getElementById('organization-certification');
    const byId = id => root.querySelector('#' + id);
    const list = byId('org-list');
    const listFilters = byId('org-filters');
    const exportButton = byId('org-export');
    const detail = byId('org-detail');
    const detailTitle = byId('org-detail-title');
    const memberFilters = byId('org-member-filters');
    const memberSort = byId('org-member-sort');
    const tabs = Array.from(detail.querySelectorAll('[role="tab"]'));
    const licenseButton = byId('org-license-button');
    const dialog = byId('org-dialog');
    const connectorDrawer = byId('org-connector-drawer');
    const applicationDrawer = byId('org-application-drawer');
    const listPager = bindPager(byId('org-pagination'), renderList);
    const memberPager = bindPager(byId('org-member-pagination'), renderMembers);
    let filteredOrganizations = organizations;
    let activeOrganization;
    let memberKeyword = '';
    let expirySort = 'none';
    let listScroll = 0;
    let lastDetailLink;

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, character => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[character]);
    }

    function icon(name) {
        return '<span class="material-symbols-outlined" aria-hidden="true">' + name + '</span>';
    }

    function emptyRow(columns, message) {
        return `<tr><td colspan="${columns}" class="org-empty">${message}</td></tr>`;
    }

    function matchesKeyword(keyword, ...values) {
        return values.some(value => value.toLowerCase().includes(keyword));
    }

    function bindPager(nav, render) {
        nav.append(byId('org-pagination-template').content.cloneNode(true));
        const totalLabel = nav.querySelector('.org-page-total');
        const currentLabel = nav.querySelector('[aria-current="page"]');
        const pageSize = nav.querySelector('.page-size-select');
        const jumpInput = nav.querySelector('.page-jumper');
        const [previous, next] = nav.querySelectorAll('[data-page-step]');
        let page = 1;
        let pageCount = 1;

        function goToPage(target) {
            page = Math.min(pageCount, Math.max(1, Math.trunc(target) || 1));
            jumpInput.value = '';
            render();
        }

        previous.addEventListener('click', () => goToPage(page - 1));
        next.addEventListener('click', () => goToPage(page + 1));
        pageSize.addEventListener('change', () => goToPage(1));
        jumpInput.form.addEventListener('submit', event => {
            event.preventDefault();
            if (jumpInput.value) goToPage(Number(jumpInput.value));
        });

        return {
            reset() {
                page = 1;
                jumpInput.value = '';
            },
            slice(records) {
                const size = Number(pageSize.value);
                pageCount = Math.max(1, Math.ceil(records.length / size));
                page = Math.min(page, pageCount);
                totalLabel.textContent = `共 ${records.length} 条`;
                currentLabel.textContent = page;
                previous.disabled = page === 1;
                next.disabled = page === pageCount;
                jumpInput.disabled = pageCount === 1;
                jumpInput.max = pageCount;
                return records.slice((page - 1) * size, page * size);
            }
        };
    }

    function renderList() {
        const records = listPager.slice(filteredOrganizations);
        byId('org-list-rows').innerHTML = records.map(record => `
            <tr>
                <td><span class="org-truncate" title="${escapeHtml(record.name)}">${escapeHtml(record.name)}</span></td>
                <td>${escapeHtml(record.code)}</td>
                <td>${escapeHtml(record.legalRepresentative)}</td>
                <td>${escapeHtml(record.phone)}</td>
                <td><span class="monitor-status success">${escapeHtml(record.status)}</span></td>
                <td>${escapeHtml(record.certifiedAt)}</td>
                <td><a class="link-green org-action" href="#org-${record.code}" aria-label="${escapeHtml(record.name)}详情">${icon('visibility')}详情</a></td>
            </tr>`).join('') || emptyRow(7, '暂无符合条件的机构');
        exportButton.disabled = !filteredOrganizations.length;
    }

    function queryOrganizations() {
        const { keyword, status, startDate, endDate } = listFilters.elements;
        const search = keyword.value.trim().toLowerCase();
        const invalidRange = Boolean(startDate.value && endDate.value && startDate.value > endDate.value);
        byId('org-date-error').hidden = !invalidRange;
        [startDate, endDate].forEach(input => {
            input.parentElement.classList.toggle('is-empty', !input.value);
            input.setAttribute('aria-invalid', String(invalidRange));
        });
        filteredOrganizations = invalidRange ? [] : organizations.filter(record => {
            const date = record.certifiedAt.slice(0, 10);
            return matchesKeyword(search, record.name, record.code)
                && (!status.value || record.status === status.value)
                && (!startDate.value || date >= startDate.value)
                && (!endDate.value || date <= endDate.value);
        });
        listPager.reset();
        renderList();
    }

    function getProfile(organization) {
        return organization?.profile;
    }

    function fields(rows) {
        return rows.map(([label, value]) => `<div><dt>${label}：</dt><dd>${escapeHtml(value || '--')}</dd></div>`).join('');
    }

    function renderMembers() {
        const members = getProfile(activeOrganization)?.members || [];
        const records = members.filter(member =>
            matchesKeyword(memberKeyword, member.account, member.name, member.phone)
        );
        if (expirySort !== 'none') {
            const direction = expirySort === 'ascending' ? 1 : -1;
            records.sort((a, b) => direction * a.expiry.localeCompare(b.expiry));
        }
        const page = memberPager.slice(records);
        byId('org-member-rows').innerHTML = page.map(member => `
            <tr>
                <td><span class="org-member-account">${escapeHtml(member.account)}</span><span class="org-tag">${escapeHtml(member.role)}</span></td>
                <td>${escapeHtml(member.name)}</td>
                <td>${escapeHtml(member.phone)}</td>
                <td>${escapeHtml(member.expiry)}</td>
                <td><input type="checkbox" class="org-switch" role="switch" aria-label="启用${escapeHtml(member.account)}" data-member-id="${member.id}" ${member.enabled ? 'checked' : ''}></td>
            </tr>`).join('') || emptyRow(5, members.length ? '暂无符合条件的成员' : '暂无成员');
    }

    function renderBusinesses(businesses) {
        if (!businesses?.length) return '<p class="org-info-card org-empty">暂无开通业务</p>';
        return '<div class="org-business-cards">' + businesses.map((business, index) => `
            <button class="org-business-card" type="button" data-business-index="${index}">
                <span class="material-symbols-outlined org-card-icon" aria-hidden="true">verified</span>
                <span class="org-business-copy">
                    <strong>${escapeHtml(business.name)}</strong>
                    <span>${escapeHtml(business.role)}</span>
                    <span>开通时间：${escapeHtml(business.openedAt)}</span>
                </span>
                ${icon('chevron_right')}
            </button>`).join('') + '</div>';
    }

    function renderConnector(connector) {
        if (!connector) return '<p class="org-info-card org-empty">暂无连接器</p>';
        return `<article class="org-connector-card">
            <div class="org-connector-header">
                <span class="material-symbols-outlined org-card-icon" aria-hidden="true">link</span>
                <div class="org-connector-heading">
                    <h2>${escapeHtml(connector.name)}</h2>
                    <span class="org-tag">${escapeHtml(connector.type)}</span>
                    <span class="org-tag is-local">${escapeHtml(connector.node)}</span>
                </div>
                <span class="monitor-status ${connector.status === '启用' ? 'success' : 'warning'}">${escapeHtml(connector.status)}</span>
            </div>
            <div class="org-connector-meta">
                <span class="org-connector-id">统一身份标识：${escapeHtml(connector.identity)}</span>
                <span>注册日期：${escapeHtml(connector.registeredAt)}</span>
            </div>
            <button class="link-green org-action" type="button" data-org-action="connector">${icon('visibility')}详情</button>
        </article>`;
    }

    function renderCredential(organization, issuedAt) {
        if (!issuedAt) return '<p class="org-info-card org-empty">暂无可信凭证</p>';
        return `<dl class="org-info-card org-fields">
            ${fields([['统一身份标识', organization.code], ['凭证签发日期', issuedAt]])}
            <div><dt>可信身份凭证：</dt><dd><button class="link-green org-action" type="button" data-org-action="credential">${icon('download')}下载身份凭证</button></dd></div>
        </dl>`;
    }

    function renderExtra(organization, info) {
        return `<div class="org-info-card org-extra-grid">
            <dl class="org-fields">
                ${fields([['行业类型', info.industry], ['注册金额', info.capital], ['注册日期', info.registeredOn]])}
            </dl>
            <div class="org-logo-field"><span>机构LOGO：</span>
                <div class="org-logo"><span class="org-logo-mark">${escapeHtml(info.logoText)}</span>
                    <strong>${escapeHtml(organization.shortName)}</strong>
                </div>
            </div>
        </div>`;
    }

    function connectorBasic(connector) {
        return `<section class="org-connector-section">
            <h3>基本信息</h3>
            <dl class="org-fields org-connector-fields">${fields([
                ['连接器名称', connector.name], ['网络接入类型', connector.networkType],
                ['物理设备唯一标识符', connector.equipmentId], ['连接器类型', connector.specification]
            ])}</dl>
            <p class="org-address-label">连接器地址：</p>
            <div class="monitor-table-scroll"><table class="data-table org-address-table" aria-label="连接器地址">
                <colgroup><col class="org-address-ip"><col><col></colgroup>
                <thead><tr><th scope="col">IP</th><th scope="col">域名</th><th scope="col">接口地址</th></tr></thead>
                <tbody>${connector.addresses.map(address => `<tr>
                    <td>${escapeHtml(address.ip)}</td>
                    <td>${escapeHtml(address.domain)}</td>
                    <td>${escapeHtml(address.endpoint)}</td>
                </tr>`).join('')}</tbody>
            </table></div>
        </section>`;
    }

    function connectorOwner(organization) {
        return `<section class="org-connector-section"><h3>所属法人信息</h3>
            <dl class="org-fields org-connector-fields">${fields([
                ['法人名称', organization.name], ['统一社会信用代码', organization.code]
            ])}</dl></section>`;
    }

    function connectorSupplier(connector) {
        return `<section class="org-connector-section"><h3>附属信息</h3>
            <dl class="org-fields org-connector-fields">${fields([
                ['供应商名称', connector.supplier], ['供应商统一社会信用代码', connector.supplierCode],
                ['产品SN号', connector.serialNumber], ['产品版本号', connector.version]
            ])}</dl></section>`;
    }

    function connectorRecords(connector) {
        return `<div class="content-tabs" role="tablist" aria-label="连接器记录">
            <button class="content-tab active" id="org-connector-tab-changes" type="button" role="tab" aria-selected="true" aria-controls="org-connector-changes">变更记录</button>
            <button class="content-tab" id="org-connector-tab-flows" type="button" role="tab" aria-selected="false" aria-controls="org-connector-flows" tabindex="-1">关联流程</button>
        </div>
        <section id="org-connector-changes" role="tabpanel" aria-labelledby="org-connector-tab-changes">
            <div class="monitor-table-scroll"><table class="data-table org-record-table" aria-label="连接器变更记录">
                <thead><tr><th scope="col">序号</th><th scope="col">操作人</th>
                    <th scope="col" aria-sort="descending"><button class="org-sort" type="button" data-connector-sort="operatedAt">操作时间${icon('arrow_downward')}</button></th><th scope="col">变更内容</th></tr></thead>
                <tbody>${connector.changes.map((change, index) => `<tr>
                    <td>${index + 1}</td><td>${escapeHtml(change.operator)}</td><td>${escapeHtml(change.operatedAt)}</td><td>${escapeHtml(change.content)}</td>
                </tr>`).join('') || emptyRow(4, '暂无变更记录')}</tbody>
            </table></div>
        </section>
        <section id="org-connector-flows" role="tabpanel" aria-labelledby="org-connector-tab-flows" hidden>
            <div class="monitor-table-scroll"><table class="data-table org-record-table org-flow-table" aria-label="连接器关联流程">
                <thead><tr><th scope="col">序号</th><th scope="col">业务类型</th><th scope="col">申请编号</th>
                    <th scope="col" aria-sort="none"><button class="org-sort" type="button" data-connector-sort="submittedAt">提交时间${icon('unfold_more')}</button></th>
                    <th scope="col" aria-sort="none"><button class="org-sort" type="button" data-connector-sort="completedAt">结束时间${icon('unfold_more')}</button></th><th scope="col">操作</th></tr></thead>
                <tbody>${connector.flows.map((flow, index) => `<tr>
                    <td>${index + 1}</td><td>${escapeHtml(flow.type)}</td><td>${escapeHtml(flow.number)}</td>
                    <td>${escapeHtml(flow.submittedAt)}</td><td>${escapeHtml(flow.completedAt)}</td>
                    <td><button class="link-green org-action" type="button" data-connector-application="${index}">${icon('visibility')}查看申请</button></td>
                </tr>`).join('') || emptyRow(6, '暂无关联流程')}</tbody>
            </table></div>
        </section>`;
    }

    function openConnectorDrawer() {
        const connector = getProfile(activeOrganization).connector;
        byId('org-connector-drawer-body').innerHTML = connectorBasic(connector)
            + connectorOwner(activeOrganization)
            + `<section class="org-connector-section"><h3>可信凭证信息</h3>
                <dl class="org-fields org-connector-fields">${fields([
                    ['统一身份标识', connector.identity], ['凭证签发机构', connector.issuer],
                    ['凭证颁发日期', connector.issuedAt]
                ])}
                <div><dt>可信身份凭证：</dt><dd><button class="link-green org-action" type="button" data-connector-download>${icon('download')}下载</button></dd></div>
                </dl></section>`
            + connectorSupplier(connector) + connectorRecords(connector);
        connectorDrawer.showModal();
    }

    function openConnectorApplication(index) {
        const connector = getProfile(activeOrganization).connector;
        const flow = connector.flows[index];
        byId('org-application-drawer-body').innerHTML = `<article class="org-application-sheet">
            <h1>注册申请单</h1>
            <dl class="org-fields org-application-meta">${fields([
                ['申请人', flow.applicant], ['申请编号', flow.number], ['提交时间', flow.submittedAt]
            ])}</dl>
            ${connectorBasic(connector)}
            ${connectorOwner(activeOrganization)}
            ${connectorSupplier(connector)}
        </article>`;
        applicationDrawer.showModal();
    }

    function activateTab(tab, tabSet = tabs) {
        tabSet.forEach(item => {
            const selected = item === tab;
            item.classList.toggle('active', selected);
            item.setAttribute('aria-selected', String(selected));
            item.tabIndex = selected ? 0 : -1;
            byId(item.getAttribute('aria-controls')).hidden = !selected;
        });
    }

    function setExpirySort(sort) {
        expirySort = sort;
        byId('org-member-expiry').setAttribute('aria-sort', sort);
        const glyph = sort === 'none' ? 'unfold_more' : sort === 'ascending' ? 'arrow_upward' : 'arrow_downward';
        memberSort.querySelector('.material-symbols-outlined').textContent = glyph;
    }

    function renderDetail(organization) {
        const info = getProfile(organization);
        detailTitle.textContent = organization.name;
        byId('org-detail-status').textContent = organization.status;
        byId('org-profile-fields').innerHTML = fields([
            ['机构类型', info?.type],
            ['机构名称', organization.name],
            ['统一社会信用代码', organization.code],
            ['营业期限或有效期', info?.validity],
            ['注册地址', info?.region],
            ['注册地址详情', info?.address]
        ]);
        byId('org-description-fields').innerHTML = fields([
            ['机构简介', info?.introduction], ['经营范围或业务范围', info?.scope]
        ]);
        licenseButton.hidden = !info;
        byId('org-license-empty').hidden = Boolean(info);
        byId('org-business').innerHTML = renderBusinesses(info?.businesses);
        byId('org-connector').innerHTML = renderConnector(info?.connector);
        byId('org-credential').innerHTML = renderCredential(organization, info?.credentialIssuedAt);
        byId('org-extra').innerHTML = renderExtra(organization, info);
        memberFilters.reset();
        memberKeyword = '';
        setExpirySort('none');
        memberPager.reset();
        renderMembers();
        activateTab(tabs[0]);
    }

    function syncView(moveFocus) {
        const organization = organizations.find(record => window.location.hash === '#org-' + record.code || window.location.hash === '#org-' + record.legacyCode);
        const previousOrganization = activeOrganization;
        if (organization !== previousOrganization) {
            [applicationDrawer, connectorDrawer, dialog].forEach(panel => {
                if (panel.open) panel.close();
            });
        }
        activeOrganization = organization;
        list.hidden = Boolean(organization);
        detail.hidden = !organization;

        if (organization && organization !== previousOrganization) {
            renderDetail(organization);
            window.scrollTo(0, 0);
            if (moveFocus) detailTitle.focus({ preventScroll: true });
        } else if (!organization && moveFocus) {
            window.scrollTo(0, listScroll);
            const focusTarget = lastDetailLink?.isConnected ? lastDetailLink : byId('org-list-title');
            focusTarget.focus({ preventScroll: true });
        }
    }

    function openDialog(title, content) {
        byId('org-dialog-title').textContent = title;
        const body = byId('org-dialog-body');
        body.replaceChildren(content);
        dialog.showModal();
    }

    function openFieldsDialog(title, rows) {
        const content = document.createElement('dl');
        content.className = 'org-fields';
        content.innerHTML = fields(rows);
        openDialog(title, content);
    }

    function downloadFile(filename, content, type) {
        const url = URL.createObjectURL(new Blob([content], { type }));
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.append(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    listFilters.addEventListener('submit', event => {
        event.preventDefault();
        queryOrganizations();
    });

    listFilters.addEventListener('change', event => {
        if (event.target.matches('select, input[type="date"]')) queryOrganizations();
    });

    byId('org-list-rows').addEventListener('click', event => {
        const link = event.target.closest('a[href^="#org-"]');
        if (link) {
            lastDetailLink = link;
            listScroll = window.scrollY;
        }
    });

    exportButton.addEventListener('click', () => {
        const headers = ['机构名称', '统一社会信用代码', '法定代表人', '法人/被授权人手机号', '状态', '认证时间'];
        const rows = filteredOrganizations.map(record =>
            [record.name, record.code, record.legalRepresentative, record.phone, record.status, record.certifiedAt]
        );
        const csv = [headers, ...rows].map(row => row.map(value => '"' + value.replace(/"/g, '""') + '"').join(',')).join('\r\n');
        downloadFile('机构管理列表.csv', '\uFEFF' + csv, 'text/csv;charset=utf-8');
    });

    memberFilters.addEventListener('submit', event => {
        event.preventDefault();
        memberKeyword = memberFilters.elements.keyword.value.trim().toLowerCase();
        memberPager.reset();
        renderMembers();
    });

    memberSort.addEventListener('click', () => {
        setExpirySort(expirySort === 'ascending' ? 'descending' : 'ascending');
        memberPager.reset();
        renderMembers();
    });

    byId('org-member-rows').addEventListener('change', event => {
        if (!event.target.matches('[data-member-id]')) return;
        const member = getProfile(activeOrganization)?.members.find(item => item.id === Number(event.target.dataset.memberId));
        if (member) member.enabled = event.target.checked;
    });

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activateTab(tab));
        tab.addEventListener('keydown', event => {
            const targetIndex = {
                ArrowLeft: (index - 1 + tabs.length) % tabs.length,
                ArrowRight: (index + 1) % tabs.length,
                Home: 0,
                End: tabs.length - 1
            }[event.key];
            if (targetIndex === undefined) return;
            event.preventDefault();
            activateTab(tabs[targetIndex]);
            tabs[targetIndex].focus();
        });
    });

    licenseButton.addEventListener('click', () => {
        const material = licenseButton.querySelector('img').cloneNode();
        openDialog('营业执照或其他证件照片', material);
    });

    byId('org-business').addEventListener('click', event => {
        const card = event.target.closest('[data-business-index]');
        if (!card) return;
        const business = getProfile(activeOrganization).businesses[Number(card.dataset.businessIndex)];
        openFieldsDialog(business.name, [['业务角色', business.role], ['开通时间', business.openedAt]]);
    });

    byId('org-connector').addEventListener('click', event => {
        if (!event.target.closest('[data-org-action="connector"]')) return;
        openConnectorDrawer();
    });

    byId('org-connector-drawer-close').addEventListener('click', () => connectorDrawer.close());
    byId('org-application-drawer-close').addEventListener('click', () => applicationDrawer.close());

    byId('org-connector-drawer-body').addEventListener('click', event => {
        const tab = event.target.closest('[role="tab"]');
        if (tab) activateTab(tab, Array.from(tab.parentElement.querySelectorAll('[role="tab"]')));

        const application = event.target.closest('[data-connector-application]');
        if (application) openConnectorApplication(Number(application.dataset.connectorApplication));

        if (event.target.closest('[data-connector-download]')) {
            const connector = getProfile(activeOrganization).connector;
            downloadFile('连接器身份凭证-' + connector.serialNumber + '.json', JSON.stringify({
                organization: activeOrganization.name,
                connector: connector.name, identity: connector.identity,
                issuer: connector.issuer, issuedAt: connector.issuedAt
            }, null, 2), 'application/json;charset=utf-8');
        }

        const sort = event.target.closest('[data-connector-sort]');
        if (!sort) return;
        const header = sort.closest('th');
        const table = sort.closest('table');
        const ascending = header.getAttribute('aria-sort') !== 'ascending';
        table.querySelectorAll('th[aria-sort]').forEach(item => {
            item.setAttribute('aria-sort', 'none');
            item.querySelector('.material-symbols-outlined').textContent = 'unfold_more';
        });
        header.setAttribute('aria-sort', ascending ? 'ascending' : 'descending');
        sort.querySelector('.material-symbols-outlined').textContent = ascending ? 'arrow_upward' : 'arrow_downward';
        const rows = Array.from(table.tBodies[0].rows).filter(row => !row.querySelector('.org-empty'));
        rows.sort((a, b) => (ascending ? 1 : -1) * a.cells[header.cellIndex].textContent.localeCompare(b.cells[header.cellIndex].textContent));
        rows.forEach((row, index) => {
            row.cells[0].textContent = index + 1;
            table.tBodies[0].append(row);
        });
    });

    connectorDrawer.addEventListener('keydown', event => {
        const tab = event.target.closest('[role="tab"]');
        if (!tab) return;
        const recordTabs = Array.from(tab.parentElement.querySelectorAll('[role="tab"]'));
        const index = recordTabs.indexOf(tab);
        const next = {
            ArrowLeft: (index + recordTabs.length - 1) % recordTabs.length,
            ArrowRight: (index + 1) % recordTabs.length,
            Home: 0, End: recordTabs.length - 1
        }[event.key];
        if (next === undefined) return;
        event.preventDefault();
        activateTab(recordTabs[next], recordTabs);
        recordTabs[next].focus();
    });

    byId('org-credential').addEventListener('click', event => {
        if (!event.target.closest('[data-org-action="credential"]')) return;
        const credential = {
            organization: activeOrganization.name,
            identity: activeOrganization.code,
            issuedAt: getProfile(activeOrganization).credentialIssuedAt
        };
        downloadFile('身份凭证-' + activeOrganization.code + '.json', JSON.stringify(credential, null, 2), 'application/json;charset=utf-8');
    });

    window.addEventListener('hashchange', () => syncView(true));
    queryOrganizations();
    syncView(false);
})();
