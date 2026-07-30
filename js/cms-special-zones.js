(function () {
    'use strict';

    var ICONS = {
        preview: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>',
        edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17.3V21h3.7L17.6 10.1l-3.7-3.7L3 17.3zM20.7 7a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0l-1.8 1.8 3.7 3.7L20.7 7z"/></svg>',
        publish: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 16.2-4.2-4.2-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',
        offline: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 13H5v-2h14v2z"/></svg>',
        remove: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zm3-9h6v8H9v-8zm6.5-6-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>',
        up: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 14 5-5 5 5H7z"/></svg>',
        down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5H7z"/></svg>'
    };

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function statusMeta(status) {
        if (status === 'published') return { label: '已发布', className: 'published' };
        if (status === 'offline') return { label: '已下架', className: 'offline' };
        return { label: '未发布', className: 'draft' };
    }

    function showSuccess(title, description, onClose) {
        GlobalDialog.success({
            title: title,
            desc: description || '',
            duration: 1300,
            onClose: onClose
        });
    }

    function initList() {
        var root = document.querySelector('[data-special-zone-list]');
        if (!root) return;

        var paginationState = {
            page: 1,
            pageSize: 10
        };
        var keywordInput = document.getElementById('zoneAdminKeyword');
        var statusSelect = document.getElementById('zoneAdminStatus');
        var tableBody = document.getElementById('zoneAdminTableBody');
        var empty = document.getElementById('zoneAdminEmpty');
        var count = document.getElementById('zoneAdminCount');
        var pagination = document.getElementById('zoneAdminPagination');

        function filteredZones() {
            var keyword = keywordInput.value.trim().toLowerCase();
            var status = statusSelect.value;
            return SpecialZoneStore.listZones().filter(function (zone) {
                if (keyword && String(zone.name || '').toLowerCase().indexOf(keyword) === -1) return false;
                if (status && zone.status !== status) return false;
                return true;
            });
        }

        function actionButton(action, id, label, icon, className, disabled) {
            return '<button class="zone-row-action' + (className ? ' ' + className : '') + '" type="button"'
                + ' data-zone-row-action="' + action + '" data-zone-id="' + escapeHtml(id) + '"'
                + (disabled ? ' disabled aria-disabled="true"' : '') + '>'
                + icon + '<span>' + label + '</span></button>';
        }

        function paginationItems(page, pageCount) {
            var pages = [];
            for (var index = 1; index <= pageCount; index += 1) {
                if (index === 1 || index === pageCount || Math.abs(index - page) <= 2) pages.push(index);
            }
            return pages.reduce(function (items, current, index) {
                if (index && current - pages[index - 1] > 1) items.push('ellipsis-' + current);
                items.push(current);
                return items;
            }, []);
        }

        function renderPagination(total) {
            var pageCount = Math.max(1, Math.ceil(total / paginationState.pageSize));
            if (paginationState.page > pageCount) paginationState.page = pageCount;
            if (paginationState.page < 1) paginationState.page = 1;
            var start = total ? (paginationState.page - 1) * paginationState.pageSize + 1 : 0;
            var end = Math.min(paginationState.page * paginationState.pageSize, total);
            var pageButtons = paginationItems(paginationState.page, pageCount).map(function (item) {
                if (typeof item === 'string') return '<span class="page-ellipsis">…</span>';
                return '<button class="page-btn' + (item === paginationState.page ? ' active' : '')
                    + '" type="button" data-zone-page="' + item + '">' + item + '</button>';
            }).join('');
            pagination.innerHTML = ''
                + '<span class="pagination-info">第' + start + '-' + end + '条记录，共' + total + '条记录，每页显示 '
                + '<select data-zone-page-size aria-label="每页显示条数">'
                + '<option value="10"' + (paginationState.pageSize === 10 ? ' selected' : '') + '>10</option>'
                + '<option value="20"' + (paginationState.pageSize === 20 ? ' selected' : '') + '>20</option>'
                + '<option value="50"' + (paginationState.pageSize === 50 ? ' selected' : '') + '>50</option>'
                + '</select> 条记录</span>'
                + '<button class="page-btn' + (paginationState.page === 1 ? ' disabled' : '')
                + '" type="button" data-zone-page="' + (paginationState.page - 1) + '"'
                + (paginationState.page === 1 ? ' disabled' : '') + '>上一页</button>'
                + pageButtons
                + '<button class="page-btn' + (paginationState.page === pageCount ? ' disabled' : '')
                + '" type="button" data-zone-page="' + (paginationState.page + 1) + '"'
                + (paginationState.page === pageCount ? ' disabled' : '') + '>下一页</button>';
        }

        function render() {
            var zones = filteredZones();
            var allZones = SpecialZoneStore.listZones();
            var pageCount = Math.max(1, Math.ceil(zones.length / paginationState.pageSize));
            if (paginationState.page > pageCount) paginationState.page = pageCount;
            var start = (paginationState.page - 1) * paginationState.pageSize;
            var pageZones = zones.slice(start, start + paginationState.pageSize);
            count.textContent = allZones.length + ' 个专区';
            tableBody.innerHTML = pageZones.map(function (zone, index) {
                var status = statusMeta(zone.status);
                var orderIndex = allZones.findIndex(function (item) { return item.id === zone.id; });
                var statusAction = zone.status === 'published'
                    ? actionButton('offline', zone.id, '下架', ICONS.offline)
                    : actionButton('publish', zone.id, '发布', ICONS.publish);
                var deleteAction = zone.status !== 'published'
                    ? actionButton('delete', zone.id, '删除', ICONS.remove, 'danger')
                    : '';
                return '<tr>'
                    + '<td class="zone-sequence-column"><span class="zone-admin-sequence">' + (start + index + 1) + '</span></td>'
                    + '<td><strong class="zone-admin-name">' + escapeHtml(zone.name) + '</strong>'
                    + '<span class="zone-admin-description">' + escapeHtml(zone.introduction) + '</span></td>'
                    + '<td><strong class="zone-admin-number">' + (zone.resourceIds || []).length + '</strong> 项</td>'
                    + '<td><strong class="zone-admin-number">' + (zone.productIds || []).length + '</strong> 项</td>'
                    + '<td><span class="zone-table-status ' + status.className + '">' + status.label + '</span></td>'
                    + '<td>' + escapeHtml(zone.updatedAt || '—') + '</td>'
                    + '<td>' + escapeHtml(zone.updatedBy || '—') + '</td>'
                    + '<td><div class="zone-table-actions">'
                    + actionButton('up', zone.id, '上移', ICONS.up, '', orderIndex <= 0)
                    + actionButton('down', zone.id, '下移', ICONS.down, '', orderIndex >= allZones.length - 1)
                    + actionButton('preview', zone.id, '预览', ICONS.preview)
                    + actionButton('edit', zone.id, '编辑', ICONS.edit)
                    + statusAction
                    + deleteAction
                    + '</div></td>'
                    + '</tr>';
            }).join('');
            empty.hidden = zones.length !== 0;
            tableBody.closest('table').hidden = zones.length === 0;
            renderPagination(zones.length);
        }

        function moveZone(id, direction) {
            var storeState = SpecialZoneStore.read();
            var zones = storeState.zones.slice().sort(function (a, b) {
                return Number(a.sort || 0) - Number(b.sort || 0);
            });
            var currentIndex = zones.findIndex(function (zone) { return zone.id === id; });
            var targetIndex = currentIndex + direction;
            if (currentIndex < 0 || targetIndex < 0 || targetIndex >= zones.length) return;
            var moved = zones.splice(currentIndex, 1)[0];
            zones.splice(targetIndex, 0, moved);
            zones.forEach(function (zone, index) {
                zone.sort = index + 1;
            });
            storeState.zones = zones;
            SpecialZoneStore.write(storeState);
            render();
        }

        function publishZone(zone) {
            if (!(zone.resourceIds || []).length || !(zone.productIds || []).length) {
                GlobalDialog.warning({
                    title: '暂不能发布',
                    desc: '发布前请至少选择 1 个数据资源和 1 个数据产品。',
                    confirmText: '去编辑',
                    cancelText: '取消',
                    onConfirm: function () {
                        window.location.href = 'cms-special-zone-form.html?id=' + encodeURIComponent(zone.id);
                    }
                });
                return;
            }
            GlobalDialog.confirm({
                title: '发布特色专区',
                desc: '发布后【' + escapeHtml(zone.name) + '】将显示在门户“特色专区”菜单中。',
                confirmText: '确认发布',
                onConfirm: function () {
                    zone.status = 'published';
                    SpecialZoneStore.saveZone(zone);
                    render();
                    showSuccess('发布成功', '门户导航及专区页面已更新。');
                }
            });
        }

        tableBody.addEventListener('click', function (event) {
            var button = event.target.closest('[data-zone-row-action]');
            if (!button || button.disabled) return;
            var id = button.dataset.zoneId;
            var action = button.dataset.zoneRowAction;
            var zone = SpecialZoneStore.getZone(id);
            if (!zone) return;

            if (action === 'up' || action === 'down') {
                moveZone(id, action === 'up' ? -1 : 1);
                return;
            }
            if (action === 'preview') {
                window.open('special-zone.html?zone=' + encodeURIComponent(id) + '&preview=1', '_blank');
                return;
            }
            if (action === 'edit') {
                window.location.href = 'cms-special-zone-form.html?id=' + encodeURIComponent(id);
                return;
            }
            if (action === 'publish') {
                publishZone(zone);
                return;
            }
            if (action === 'offline') {
                GlobalDialog.warning({
                    title: '下架特色专区',
                    desc: '下架后【' + escapeHtml(zone.name) + '】将从门户导航中隐藏，配置内容仍会保留。',
                    confirmText: '确认下架',
                    onConfirm: function () {
                        zone.status = 'offline';
                        SpecialZoneStore.saveZone(zone);
                        render();
                        showSuccess('下架成功', '专区配置已保留，可再次编辑和发布。');
                    }
                });
                return;
            }
            if (action === 'delete') {
                if (zone.status === 'published') {
                    GlobalDialog.warning({
                        title: '请先下架专区',
                        desc: '已发布专区不能直接删除，请先完成下架操作。'
                    });
                    return;
                }
                GlobalDialog.danger({
                    title: '删除特色专区',
                    desc: '确定删除【' + escapeHtml(zone.name) + '】吗？删除后该专区配置无法恢复。',
                    confirmText: '确认删除',
                    onConfirm: function () {
                        SpecialZoneStore.removeZone(id);
                        render();
                        showSuccess('删除成功', '该专区配置已移除。');
                    }
                });
            }
        });

        pagination.addEventListener('click', function (event) {
            var button = event.target.closest('[data-zone-page]');
            if (!button || button.disabled) return;
            paginationState.page = Number(button.dataset.zonePage || 1);
            render();
        });
        pagination.addEventListener('change', function (event) {
            var select = event.target.closest('[data-zone-page-size]');
            if (!select) return;
            paginationState.pageSize = Number(select.value || 10);
            paginationState.page = 1;
            render();
        });
        document.getElementById('zoneAdminSearch').addEventListener('click', function () {
            paginationState.page = 1;
            render();
        });
        document.getElementById('zoneAdminReset').addEventListener('click', function () {
            keywordInput.value = '';
            statusSelect.value = '';
            paginationState.page = 1;
            render();
        });
        keywordInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                paginationState.page = 1;
                render();
            }
        });
        document.getElementById('zoneAddButton').addEventListener('click', function () {
            window.location.href = 'cms-special-zone-form.html?mode=create';
        });
        render();
    }

    function initForm() {
        var root = document.querySelector('[data-special-zone-form]');
        if (!root) return;

        var storeState = SpecialZoneStore.read();
        var params = new URLSearchParams(window.location.search);
        var mode = params.get('mode') === 'create' ? 'create' : 'edit';
        var zoneId = params.get('id') || 'corpus-data-zone';
        var savedZone = mode === 'create' ? null : SpecialZoneStore.getZone(zoneId);
        var zone = savedZone ? JSON.parse(JSON.stringify(savedZone)) : {
            id: '',
            name: '',
            introduction: '',
            cover: 'images/hero-ai-longgang.jpg',
            sort: SpecialZoneStore.listZones().length + 1,
            status: 'draft',
            resourceIds: [],
            productIds: [],
            updatedBy: '运营管理员'
        };

        var picker = {
            type: 'resource',
            selected: new Set(),
            page: 1,
            pageSize: 10
        };
        var selectedStates = {
            resource: { page: 1, pageSize: 10 },
            product: { page: 1, pageSize: 10 }
        };

        var nameInput = document.getElementById('zoneEditorName');
        var introductionInput = document.getElementById('zoneEditorIntroduction');
        var coverPreview = document.getElementById('zoneCoverPreview');
        var coverInput = document.getElementById('zoneCoverInput');
        var pickerModal = document.getElementById('zonePickerModal');
        var pickerKeyword = document.getElementById('zonePickerKeyword');
        var pickerCategory = document.getElementById('zonePickerCategory');
        var pickerProvider = document.getElementById('zonePickerProvider');
        var pickerCategorySearch = document.getElementById('zonePickerCategorySearch');
        var pickerProviderSearch = document.getElementById('zonePickerProviderSearch');
        var pickerCategoryMenu = document.getElementById('zonePickerCategoryMenu');
        var pickerProviderMenu = document.getElementById('zonePickerProviderMenu');
        var pickerTableBody = document.getElementById('zonePickerTableBody');
        var pickerPagination = document.getElementById('zonePickerPagination');
        var pickerFilterOptions = {
            category: [],
            provider: []
        };

        function updateLengths() {
            document.getElementById('zoneNameLength').textContent = nameInput.value.length;
            document.getElementById('zoneIntroductionLength').textContent = introductionInput.value.length;
        }

        function updateStatus() {
            var meta = statusMeta(zone.status);
            var statusElement = document.getElementById('zoneEditorStatus');
            statusElement.textContent = meta.label;
            statusElement.className = 'zone-status-tag ' + meta.className;
            document.getElementById('zoneOfflineButton').hidden = zone.status !== 'published';
            document.getElementById('zonePublishButton').querySelector('span').textContent =
                zone.status === 'published' ? '保存更新' : '保存并发布';
        }

        function getCatalog(type) {
            return type === 'resource' ? storeState.resources : storeState.products;
        }

        function selectedIds(type) {
            return type === 'resource' ? zone.resourceIds : zone.productIds;
        }

        function selectedBody(type) {
            return document.getElementById(type === 'resource' ? 'zoneSelectedResourceBody' : 'zoneSelectedProductBody');
        }

        function selectedEmpty(type) {
            return document.getElementById(type === 'resource' ? 'zoneSelectedResourceEmpty' : 'zoneSelectedProductEmpty');
        }

        function selectedCount(type) {
            return document.getElementById(type === 'resource' ? 'zoneSelectedResourceCount' : 'zoneSelectedProductCount');
        }

        function selectedKeyword(type) {
            return document.getElementById(type === 'resource' ? 'zoneSelectedResourceKeyword' : 'zoneSelectedProductKeyword');
        }

        function selectedPagination(type) {
            return document.getElementById(type === 'resource'
                ? 'zoneSelectedResourcePagination'
                : 'zoneSelectedProductPagination');
        }

        function formPaginationItems(page, pageCount) {
            var pages = [];
            for (var index = 1; index <= pageCount; index += 1) {
                if (index === 1 || index === pageCount || Math.abs(index - page) <= 2) pages.push(index);
            }
            return pages.reduce(function (items, current, index) {
                if (index && current - pages[index - 1] > 1) items.push('ellipsis-' + current);
                items.push(current);
                return items;
            }, []);
        }

        function renderFormPagination(container, state, total) {
            var pageCount = Math.max(1, Math.ceil(total / state.pageSize));
            if (state.page > pageCount) state.page = pageCount;
            if (state.page < 1) state.page = 1;
            var start = total ? (state.page - 1) * state.pageSize + 1 : 0;
            var end = Math.min(state.page * state.pageSize, total);
            var pageButtons = formPaginationItems(state.page, pageCount).map(function (item) {
                if (typeof item === 'string') return '<span class="page-ellipsis">…</span>';
                return '<button class="page-btn' + (item === state.page ? ' active' : '')
                    + '" type="button" data-zone-form-page="' + item + '">' + item + '</button>';
            }).join('');
            container.innerHTML = ''
                + '<span class="pagination-info">第' + start + '-' + end + '条记录，共' + total + '条记录，每页显示 '
                + '<select data-zone-form-page-size aria-label="每页显示条数">'
                + '<option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10</option>'
                + '<option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20</option>'
                + '<option value="50"' + (state.pageSize === 50 ? ' selected' : '') + '>50</option>'
                + '</select> 条记录</span>'
                + '<button class="page-btn' + (state.page === 1 ? ' disabled' : '')
                + '" type="button" data-zone-form-page="' + (state.page - 1) + '"'
                + (state.page === 1 ? ' disabled' : '') + '>上一页</button>'
                + pageButtons
                + '<button class="page-btn' + (state.page === pageCount ? ' disabled' : '')
                + '" type="button" data-zone-form-page="' + (state.page + 1) + '"'
                + (state.page === pageCount ? ' disabled' : '') + '>下一页</button>';
        }

        function selectedRow(item, type, index, total) {
            var typeValue = type === 'resource' ? item.category : (item.productType || item.category);
            return '<tr>'
                + '<td class="zone-order-column"><span class="zone-selected-index">' + (index + 1) + '</span></td>'
                + '<td><strong class="zone-selected-name">' + escapeHtml(item.name) + '</strong>'
                + '<span class="zone-selected-code">' + escapeHtml(item.code) + '</span></td>'
                + '<td>' + escapeHtml(item.provider) + '</td>'
                + '<td>' + escapeHtml(typeValue) + '</td>'
                + '<td>' + escapeHtml(item.delivery) + '</td>'
                + '<td><div class="zone-table-actions">'
                + '<button class="zone-selected-action" type="button" data-selected-action="up" data-selected-type="' + type
                + '" data-selected-index="' + index + '"' + (index === 0 ? ' disabled' : '') + '>'
                + ICONS.up + '<span>上移</span></button>'
                + '<button class="zone-selected-action" type="button" data-selected-action="down" data-selected-type="' + type
                + '" data-selected-index="' + index + '"' + (index === total - 1 ? ' disabled' : '') + '>'
                + ICONS.down + '<span>下移</span></button>'
                + '<button class="zone-selected-action danger" type="button" data-selected-action="remove" data-selected-type="' + type
                + '" data-selected-index="' + index + '">' + ICONS.remove + '<span>移除</span></button>'
                + '</div></td>'
                + '</tr>';
        }

        function getSelectedItems(type) {
            var catalog = getCatalog(type);
            return selectedIds(type).map(function (id) {
                return catalog.find(function (item) { return item.id === id; });
            }).filter(Boolean);
        }

        function renderSelected(type) {
            var ids = selectedIds(type);
            var state = selectedStates[type];
            var keyword = selectedKeyword(type).value.trim().toLowerCase();
            var allItems = getSelectedItems(type);
            var items = allItems.filter(function (item) {
                return !keyword || String(item.name || '').toLowerCase().indexOf(keyword) !== -1;
            });
            var pageCount = Math.max(1, Math.ceil(items.length / state.pageSize));
            if (state.page > pageCount) state.page = pageCount;
            var start = (state.page - 1) * state.pageSize;
            var pageItems = items.slice(start, start + state.pageSize);
            selectedBody(type).innerHTML = pageItems.map(function (item) {
                var itemIndex = ids.indexOf(item.id);
                return selectedRow(item, type, itemIndex, allItems.length);
            }).join('');
            selectedBody(type).closest('table').hidden = pageItems.length === 0;
            selectedEmpty(type).hidden = pageItems.length !== 0;
            selectedEmpty(type).querySelector('span').textContent = allItems.length && keyword
                ? '已选列表中未找到该名称'
                : '暂未选择数据' + (type === 'resource' ? '资源' : '产品');
            selectedCount(type).textContent = '已选择 ' + allItems.length + ' 项';
            renderFormPagination(selectedPagination(type), state, items.length);
        }

        function renderAllSelected() {
            renderSelected('resource');
            renderSelected('product');
        }

        function fillBasic() {
            document.getElementById('zoneEditorTitle').textContent = mode === 'create' ? '新增特色专区' : '编辑特色专区';
            document.title = (mode === 'create' ? '新增' : '编辑') + '特色专区 - 龙岗数据聚合服务平台';
            nameInput.value = zone.name || '';
            introductionInput.value = zone.introduction || '';
            coverPreview.src = zone.cover || 'images/hero-ai-longgang.jpg';
            updateLengths();
            updateStatus();
            renderAllSelected();
        }

        function moveSelected(type, index, direction) {
            var ids = selectedIds(type);
            var target = index + direction;
            if (target < 0 || target >= ids.length) return;
            var temp = ids[index];
            ids[index] = ids[target];
            ids[target] = temp;
            renderSelected(type);
        }

        function bindSelectedActions() {
            document.getElementById('zoneEditorForm').addEventListener('click', function (event) {
                var button = event.target.closest('[data-selected-action]');
                if (!button || button.disabled) return;
                var type = button.dataset.selectedType;
                var index = Number(button.dataset.selectedIndex);
                var action = button.dataset.selectedAction;
                if (action === 'up') moveSelected(type, index, -1);
                if (action === 'down') moveSelected(type, index, 1);
                if (action === 'remove') {
                    selectedIds(type).splice(index, 1);
                    renderSelected(type);
                }
            });
        }

        function bindPagination(container, state, render) {
            container.addEventListener('click', function (event) {
                var button = event.target.closest('[data-zone-form-page]');
                if (!button || button.disabled) return;
                state.page = Number(button.dataset.zoneFormPage || 1);
                render();
            });
            container.addEventListener('change', function (event) {
                var select = event.target.closest('[data-zone-form-page-size]');
                if (!select) return;
                state.pageSize = Number(select.value || 10);
                state.page = 1;
                render();
            });
        }

        function bindSelectedFilters() {
            ['resource', 'product'].forEach(function (type) {
                var input = selectedKeyword(type);
                document.querySelector('[data-selected-search="' + type + '"]').addEventListener('click', function () {
                    selectedStates[type].page = 1;
                    renderSelected(type);
                });
                document.querySelector('[data-selected-reset="' + type + '"]').addEventListener('click', function () {
                    input.value = '';
                    selectedStates[type].page = 1;
                    renderSelected(type);
                });
                input.addEventListener('keydown', function (event) {
                    if (event.key !== 'Enter') return;
                    event.preventDefault();
                    selectedStates[type].page = 1;
                    renderSelected(type);
                });
                bindPagination(selectedPagination(type), selectedStates[type], function () {
                    renderSelected(type);
                });
            });
        }

        function uniqueValues(items, key) {
            return Array.from(new Set(items.map(function (item) { return item[key]; }).filter(Boolean))).sort();
        }

        function pickerSearchSelect(type) {
            var isCategory = type === 'category';
            var input = isCategory ? pickerCategorySearch : pickerProviderSearch;
            return {
                root: input.closest('[data-zone-picker-search-select]'),
                input: input,
                value: isCategory ? pickerCategory : pickerProvider,
                menu: isCategory ? pickerCategoryMenu : pickerProviderMenu,
                allLabel: isCategory ? '全部分类' : '全部提供方'
            };
        }

        function closePickerSearchSelect(type) {
            var select = pickerSearchSelect(type);
            select.root.classList.remove('open');
            select.input.setAttribute('aria-expanded', 'false');
            select.menu.hidden = true;
        }

        function closeAllPickerSearchSelects(exceptType) {
            ['category', 'provider'].forEach(function (type) {
                if (type !== exceptType) closePickerSearchSelect(type);
            });
        }

        function renderPickerSearchOptions(type, keyword) {
            var select = pickerSearchSelect(type);
            var normalizedKeyword = String(keyword || '').trim().toLowerCase();
            var options = pickerFilterOptions[type].filter(function (value) {
                return !normalizedKeyword || value.toLowerCase().indexOf(normalizedKeyword) !== -1;
            });
            var allOption = !normalizedKeyword
                ? '<button class="zone-picker-search-option' + (!select.value.value ? ' active' : '')
                    + '" type="button" role="option" data-zone-picker-select-option="' + type
                    + '" data-zone-picker-option-value="">' + select.allLabel + '</button>'
                : '';
            select.menu.innerHTML = allOption + options.map(function (value) {
                return '<button class="zone-picker-search-option' + (select.value.value === value ? ' active' : '')
                    + '" type="button" role="option" data-zone-picker-select-option="' + type
                    + '" data-zone-picker-option-value="' + escapeHtml(value) + '">' + escapeHtml(value) + '</button>';
            }).join('');
            if (!allOption && !options.length) {
                select.menu.innerHTML = '<div class="zone-picker-search-empty">暂无匹配选项</div>';
            }
        }

        function openPickerSearchSelect(type, keyword) {
            var select = pickerSearchSelect(type);
            closeAllPickerSearchSelects(type);
            renderPickerSearchOptions(type, keyword);
            select.root.classList.add('open');
            select.input.setAttribute('aria-expanded', 'true');
            select.menu.hidden = false;
        }

        function setPickerSearchSelectValue(type, value) {
            var select = pickerSearchSelect(type);
            select.value.value = value || '';
            select.input.value = value || '';
        }

        function bindPickerSearchSelects() {
            ['category', 'provider'].forEach(function (type) {
                var select = pickerSearchSelect(type);
                select.input.addEventListener('focus', function () {
                    openPickerSearchSelect(type, select.input.value);
                });
                select.input.addEventListener('input', function () {
                    select.value.value = '';
                    openPickerSearchSelect(type, select.input.value);
                });
                select.input.addEventListener('keydown', function (event) {
                    if (event.key === 'Escape') {
                        closePickerSearchSelect(type);
                        return;
                    }
                    if (event.key !== 'Enter' || select.menu.hidden) return;
                    var firstOption = select.menu.querySelector('[data-zone-picker-select-option]');
                    if (!firstOption) return;
                    event.preventDefault();
                    firstOption.click();
                });
                select.root.querySelector('[data-zone-picker-select-toggle]').addEventListener('click', function () {
                    if (select.menu.hidden) {
                        select.input.focus();
                        openPickerSearchSelect(type, '');
                    } else {
                        closePickerSearchSelect(type);
                    }
                });
                select.menu.addEventListener('click', function (event) {
                    var option = event.target.closest('[data-zone-picker-select-option]');
                    if (!option) return;
                    setPickerSearchSelectValue(type, option.dataset.zonePickerOptionValue || '');
                    picker.page = 1;
                    closePickerSearchSelect(type);
                });
            });
            document.addEventListener('click', function (event) {
                if (event.target.closest('[data-zone-picker-search-select]')) return;
                closeAllPickerSearchSelects();
            });
        }

        function fillPickerFilters() {
            var items = availablePickerItems();
            pickerFilterOptions.category = uniqueValues(items, 'category');
            pickerFilterOptions.provider = uniqueValues(items, 'provider');
            setPickerSearchSelectValue('category', '');
            setPickerSearchSelectValue('provider', '');
            closeAllPickerSearchSelects();
        }

        function availablePickerItems() {
            var existingIds = selectedIds(picker.type);
            return getCatalog(picker.type).filter(function (item) {
                return item.status === 'listed' && existingIds.indexOf(item.id) === -1;
            });
        }

        function filteredPickerItems() {
            var keyword = pickerKeyword.value.trim().toLowerCase();
            return availablePickerItems().filter(function (item) {
                var text = (item.name + ' ' + item.code).toLowerCase();
                if (keyword && text.indexOf(keyword) === -1) return false;
                if (pickerCategory.value && item.category !== pickerCategory.value) return false;
                if (pickerProvider.value && item.provider !== pickerProvider.value) return false;
                return true;
            });
        }

        function renderPicker() {
            var items = filteredPickerItems();
            var pageCount = Math.max(1, Math.ceil(items.length / picker.pageSize));
            if (picker.page > pageCount) picker.page = pageCount;
            var start = (picker.page - 1) * picker.pageSize;
            var pageItems = items.slice(start, start + picker.pageSize);
            pickerTableBody.innerHTML = pageItems.map(function (item) {
                var checked = picker.selected.has(item.id);
                var typeValue = picker.type === 'resource' ? item.category : (item.productType || item.category);
                return '<tr>'
                    + '<td class="zone-check-column"><input type="checkbox" data-picker-id="' + escapeHtml(item.id) + '"'
                    + (checked ? ' checked' : '') + '></td>'
                    + '<td><strong class="zone-selected-name">' + escapeHtml(item.name) + '</strong>'
                    + '<span class="zone-selected-code">' + escapeHtml(item.code) + '</span></td>'
                    + '<td>' + escapeHtml(item.provider) + '</td>'
                    + '<td>' + escapeHtml(typeValue) + '</td>'
                    + '<td>' + escapeHtml(item.delivery) + '</td>'
                    + '</tr>';
            }).join('');
            document.getElementById('zonePickerEmpty').hidden = pageItems.length !== 0;
            document.getElementById('zonePickerEmpty').textContent =
                availablePickerItems().length ? '暂无符合条件的内容' : '暂无可添加内容，已添加内容不会重复展示';
            pickerTableBody.closest('table').hidden = pageItems.length === 0;
            document.getElementById('zonePickerSelectedCount').textContent = picker.selected.size;
            renderFormPagination(pickerPagination, picker, items.length);
        }

        function openPicker(type) {
            picker.type = type;
            picker.selected = new Set();
            picker.page = 1;
            pickerKeyword.value = '';
            document.getElementById('zonePickerTitle').textContent = type === 'resource' ? '选择数据资源' : '选择数据产品';
            document.getElementById('zonePickerSubtitle').textContent =
                '从已上架' + (type === 'resource' ? '资源' : '产品') + '目录中添加专区内容，已添加内容不再展示';
            fillPickerFilters();
            renderPicker();
            pickerModal.classList.add('show');
            pickerModal.setAttribute('aria-hidden', 'false');
        }

        function closePicker() {
            closeAllPickerSearchSelects();
            pickerModal.classList.remove('show');
            pickerModal.setAttribute('aria-hidden', 'true');
        }

        function bindPicker() {
            bindPickerSearchSelects();
            document.querySelectorAll('[data-open-zone-picker]').forEach(function (button) {
                button.addEventListener('click', function () {
                    openPicker(button.dataset.openZonePicker);
                });
            });
            pickerTableBody.addEventListener('change', function (event) {
                var checkbox = event.target.closest('[data-picker-id]');
                if (!checkbox) return;
                if (checkbox.checked) picker.selected.add(checkbox.dataset.pickerId);
                else picker.selected.delete(checkbox.dataset.pickerId);
                document.getElementById('zonePickerSelectedCount').textContent = picker.selected.size;
            });
            document.getElementById('zonePickerSearch').addEventListener('click', function () {
                picker.page = 1;
                renderPicker();
            });
            document.getElementById('zonePickerReset').addEventListener('click', function () {
                pickerKeyword.value = '';
                setPickerSearchSelectValue('category', '');
                setPickerSearchSelectValue('provider', '');
                closeAllPickerSearchSelects();
                picker.page = 1;
                renderPicker();
            });
            pickerKeyword.addEventListener('keydown', function (event) {
                if (event.key !== 'Enter') return;
                event.preventDefault();
                picker.page = 1;
                renderPicker();
            });
            bindPagination(pickerPagination, picker, renderPicker);
            document.getElementById('zonePickerClose').addEventListener('click', closePicker);
            document.getElementById('zonePickerCancel').addEventListener('click', closePicker);
            document.getElementById('zonePickerConfirm').addEventListener('click', function () {
                var existing = selectedIds(picker.type);
                var selected = Array.from(picker.selected);
                var added = selected.filter(function (id) { return existing.indexOf(id) === -1; });
                if (picker.type === 'resource') zone.resourceIds = existing.concat(added);
                else zone.productIds = existing.concat(added);
                renderSelected(picker.type);
                closePicker();
            });
            pickerModal.addEventListener('click', function (event) {
                if (event.target === pickerModal) closePicker();
            });
        }

        function readForm() {
            zone.name = nameInput.value.trim();
            zone.introduction = introductionInput.value.trim();
            zone.cover = coverPreview.getAttribute('src') || zone.cover;
            zone.updatedBy = '运营管理员';
            if (!zone.id) zone.id = SpecialZoneStore.makeZoneId(zone.name);
        }

        function validate(requireContent) {
            readForm();
            if (!zone.name) {
                GlobalDialog.warning({ title: '请填写专区名称', desc: '专区名称将用于门户菜单和页面标题。' });
                nameInput.focus();
                return false;
            }
            if (!zone.introduction) {
                GlobalDialog.warning({ title: '请填写简介说明', desc: '请说明专区定位、服务对象和主要内容。' });
                introductionInput.focus();
                return false;
            }
            if (!zone.cover) {
                GlobalDialog.warning({ title: '请配置专区封面', desc: '专区封面用于门户介绍横幅展示。' });
                return false;
            }
            if (requireContent && (!zone.resourceIds.length || !zone.productIds.length)) {
                GlobalDialog.warning({
                    title: '专区内容尚未配置完整',
                    desc: '发布前请至少选择 1 个数据资源和 1 个数据产品。'
                });
                return false;
            }
            return true;
        }

        function save(status, redirect) {
            if (!validate(status === 'published')) return;
            zone.status = status || zone.status || 'draft';
            zone = SpecialZoneStore.saveZone(zone);
            mode = 'edit';
            updateStatus();
            showSuccess(
                zone.status === 'published' ? '专区已发布' : '专区已保存',
                zone.status === 'published' ? '门户导航与专区页面已同步更新。' : '当前配置已保存，暂不会在门户展示。',
                redirect ? function () { window.location.href = 'cms-special-zones.html'; } : null
            );
        }

        function bindFormActions() {
            nameInput.addEventListener('input', updateLengths);
            introductionInput.addEventListener('input', updateLengths);
            document.getElementById('zoneCoverChoose').addEventListener('click', function () {
                coverInput.click();
            });
            coverInput.addEventListener('change', function () {
                var file = this.files && this.files[0];
                if (!file) return;
                if (file.size > 2 * 1024 * 1024) {
                    GlobalDialog.warning({ title: '图片大小超过限制', desc: '请选择不超过 2MB 的 JPG 或 PNG 图片。' });
                    this.value = '';
                    return;
                }
                var reader = new FileReader();
                reader.onload = function () {
                    coverPreview.src = reader.result;
                };
                reader.readAsDataURL(file);
            });
            document.getElementById('zoneSaveButton').addEventListener('click', function () {
                save(zone.status === 'published' ? 'published' : 'draft', false);
            });
            document.getElementById('zonePublishButton').addEventListener('click', function () {
                save('published', false);
            });
            document.getElementById('zonePreviewButton').addEventListener('click', function () {
                if (!validate(false)) return;
                SpecialZoneStore.setPreview(zone);
                window.open('special-zone.html?zone=' + encodeURIComponent(zone.id) + '&preview=1', '_blank');
            });
            document.getElementById('zoneOfflineButton').addEventListener('click', function () {
                GlobalDialog.warning({
                    title: '下架特色专区',
                    desc: '下架后专区将从门户导航中隐藏，当前配置内容仍会保留。',
                    confirmText: '确认下架',
                    onConfirm: function () {
                        zone.status = 'offline';
                        zone = SpecialZoneStore.saveZone(zone);
                        updateStatus();
                        showSuccess('下架成功', '专区配置已保留，可继续编辑并再次发布。');
                    }
                });
            });
        }

        fillBasic();
        bindSelectedActions();
        bindSelectedFilters();
        bindPicker();
        bindFormActions();
    }

    function init() {
        initList();
        initForm();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
