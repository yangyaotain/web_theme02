(function () {
    'use strict';

    var pageSize = 6;
    var state = {
        zone: null,
        type: 'resource',
        keyword: '',
        category: [],
        delivery: [],
        extra: [],
        sort: 'listedAt',
        page: 1
    };

    var elements = {};

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function cacheElements() {
        [
            'zoneBreadcrumbName', 'zoneHero', 'zoneName', 'zoneIntroduction', 'zoneResourceCount',
            'zoneProductCount', 'zoneSearchForm', 'zoneSearchInput', 'zoneFilterGroups', 'zoneResultHeader',
            'zoneResultTitle', 'zoneResultCount', 'zoneSortSelect', 'zoneActiveSearch', 'zoneActiveKeyword',
            'zoneClearKeyword', 'zoneCardGrid', 'zoneEmpty', 'zoneEmptyReset', 'zonePagination',
            'zoneContentCard', 'zoneUnavailable', 'zonePreviewClose'
        ].forEach(function (id) {
            elements[id] = document.getElementById(id);
        });
    }

    function getLinkedItems(type) {
        var storeState = SpecialZoneStore.read();
        var catalog = type === 'resource' ? storeState.resources : storeState.products;
        var ids = type === 'resource' ? state.zone.resourceIds : state.zone.productIds;
        return (ids || []).map(function (id) {
            return catalog.find(function (item) { return item.id === id; });
        }).filter(function (item) {
            return item && item.status === 'listed';
        });
    }

    function fillHero() {
        var resources = getLinkedItems('resource');
        var products = getLinkedItems('product');
        document.title = state.zone.name + ' - 龙岗数据聚合服务平台';
        elements.zoneBreadcrumbName.textContent = state.zone.name;
        elements.zoneName.textContent = state.zone.name;
        elements.zoneIntroduction.textContent = state.zone.introduction;
        elements.zoneResourceCount.textContent = resources.length;
        elements.zoneProductCount.textContent = products.length;
        elements.zoneHero.style.backgroundImage = 'url("' + String(state.zone.cover || 'images/hero-ai-longgang.jpg').replace(/"/g, '') + '")';
    }

    function uniqueValues(items, key) {
        return Array.from(new Set(items.map(function (item) { return item[key]; }).filter(Boolean))).sort();
    }

    function filterOptionTemplate(group, value, label, count) {
        var selected = state[group.stateKey];
        var active = value ? selected.indexOf(value) >= 0 : selected.length === 0;
        return ''
            + '<button class="zone-filter-option' + (active ? ' active' : '') + '" type="button"'
            + ' data-zone-filter-key="' + group.stateKey + '" data-zone-filter-value="' + escapeHtml(value) + '">'
            +   '<span class="zone-filter-checkbox">'
            +       '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>'
            +   '</span>'
            +   '<span class="zone-filter-label">' + escapeHtml(label) + '</span>'
            +   '<span class="zone-filter-count">' + count + '</span>'
            + '</button>';
    }

    function filterGroupTemplate(group, items) {
        var values = uniqueValues(items, group.itemKey);
        var options = filterOptionTemplate(group, '', '全部', items.length);
        values.forEach(function (value) {
            var count = items.filter(function (item) { return item[group.itemKey] === value; }).length;
            var label = group.itemKey === 'delivery' && value === 'API传输' ? 'API 传输' : value;
            options += filterOptionTemplate(group, value, label, count);
        });
        return ''
            + '<section class="zone-filter-section">'
            +   '<div class="zone-filter-title">'
            +       '<strong>' + group.title + '</strong>'
            +       '<button type="button" data-zone-clear-filter="' + group.stateKey + '"'
            +           (state[group.stateKey].length ? '' : ' disabled') + '>清除</button>'
            +   '</div>'
            +   '<div class="zone-filter-options">' + options + '</div>'
            + '</section>';
    }

    function renderFilterGroups() {
        var items = getLinkedItems(state.type);
        var groups = state.type === 'resource'
            ? [
                { title: '行业分类', stateKey: 'category', itemKey: 'category' },
                { title: '交付方式', stateKey: 'delivery', itemKey: 'delivery' },
                { title: '数据来源', stateKey: 'extra', itemKey: 'dataSource' }
            ]
            : [
                { title: '行业分类', stateKey: 'category', itemKey: 'category' },
                { title: '更新频率', stateKey: 'extra', itemKey: 'updateCycle' },
                { title: '交付方式', stateKey: 'delivery', itemKey: 'delivery' }
            ];
        elements.zoneFilterGroups.innerHTML = groups.map(function (group) {
            return filterGroupTemplate(group, items);
        }).join('<div class="zone-filter-divider"></div>');
    }

    function getFilteredItems() {
        var keyword = state.keyword.trim().toLowerCase();
        var items = getLinkedItems(state.type).filter(function (item) {
            var text = [
                item.name, item.provider, item.category, item.delivery, item.description,
                item.dataSource, item.updateCycle, item.productType, item.price,
                (item.labels || []).join(' ')
            ].join(' ').toLowerCase();
            if (keyword && text.indexOf(keyword) === -1) return false;
            if (state.category.length && state.category.indexOf(item.category) === -1) return false;
            if (state.delivery.length && state.delivery.indexOf(item.delivery) === -1) return false;
            if (state.extra.length) {
                var extraValue = state.type === 'resource' ? item.dataSource : item.updateCycle;
                if (state.extra.indexOf(extraValue) === -1) return false;
            }
            return true;
        });
        return items.sort(function (a, b) {
            if (state.sort === 'listedAt') return String(b.listedAt).localeCompare(String(a.listedAt));
            var salt = state.sort === 'view' ? 17 : 7;
            var score = function (item) {
                return String(item.id).split('').reduce(function (total, char) {
                    return total + char.charCodeAt(0) * salt;
                }, 0);
            };
            return score(b) - score(a);
        });
    }

    function cardTemplate(item) {
        var isProduct = state.type === 'product';
        var deliveryBadge = item.delivery === 'API传输' ? 'API' : item.delivery.replace('传输', '');
        var secondBadge = isProduct ? (item.productType || '数据产品') : deliveryBadge;
        var secondBadgeClass = secondBadge === 'API' ? ' api' : '';
        return ''
            + '<article class="zone-data-card" tabindex="0" data-zone-href="' + escapeHtml(item.href || '#') + '">'
            +   '<div class="zone-card-image">'
            +       '<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.name) + '">'
            +       '<div class="zone-card-badges">'
            +           '<span class="zone-card-badge">' + escapeHtml(isProduct ? '数据产品' : (item.dataSource || '数据资源')) + '</span>'
            +           '<span class="zone-card-badge' + secondBadgeClass + '">' + escapeHtml(secondBadge) + '</span>'
            +       '</div>'
            +   '</div>'
            +   '<div class="zone-card-body">'
            +       '<h2 class="zone-card-title">' + escapeHtml(item.name) + '</h2>'
            +       (isProduct
                ? '<p class="zone-card-type-row">产品类型：<span>' + escapeHtml(item.productType || '数据产品') + '</span></p>'
                : '')
            +       '<p class="zone-card-provider">' + escapeHtml(item.provider) + '</p>'
            +       '<p class="zone-card-description">' + escapeHtml(item.description) + '</p>'
            +       (isProduct
                ? '<p class="zone-card-price">参考价格：<span class="price'
                    + (item.price === '面议' ? ' negotiate' : '') + '">' + escapeHtml(item.price || '面议') + '</span></p>'
                : '')
            +       '<div class="zone-card-footer">'
            +           '<span class="zone-card-meta">' + (isProduct ? '上架时间：' : '') + escapeHtml(item.listedAt) + '</span>'
            +           (isProduct
                ? '<div class="zone-scene-tags"><span class="zone-scene-tag">' + escapeHtml(item.category) + '</span></div>'
                : '<span class="zone-card-type">' + escapeHtml(item.category) + '</span>')
            +       '</div>'
            +   '</div>'
            + '</article>';
    }

    function renderPagination(total) {
        var pageCount = Math.ceil(total / pageSize);
        if (pageCount <= 1) {
            elements.zonePagination.innerHTML = '';
            return;
        }
        var html = '<button class="zone-page-button" type="button" data-zone-page="' + (state.page - 1) + '"'
            + (state.page === 1 ? ' disabled' : '') + '>上一页</button>';
        for (var page = 1; page <= pageCount; page += 1) {
            html += '<button class="zone-page-button' + (page === state.page ? ' active' : '')
                + '" type="button" data-zone-page="' + page + '">' + page + '</button>';
        }
        html += '<button class="zone-page-button" type="button" data-zone-page="' + (state.page + 1) + '"'
            + (state.page === pageCount ? ' disabled' : '') + '>下一页</button>';
        elements.zonePagination.innerHTML = html;
    }

    function render() {
        var items = getFilteredItems();
        var pageCount = Math.max(1, Math.ceil(items.length / pageSize));
        if (state.page > pageCount) state.page = pageCount;
        var start = (state.page - 1) * pageSize;
        var currentItems = items.slice(start, start + pageSize);

        elements.zoneResultTitle.textContent = state.type === 'resource' ? '数据资源' : '数据产品';
        elements.zoneResultCount.textContent = items.length;
        elements.zoneCardGrid.innerHTML = currentItems.map(cardTemplate).join('');
        elements.zoneCardGrid.hidden = currentItems.length === 0;
        elements.zoneEmpty.hidden = currentItems.length !== 0;
        elements.zoneActiveSearch.hidden = !state.keyword;
        elements.zoneActiveKeyword.textContent = state.keyword;
        elements.zoneSearchInput.value = state.keyword;
        renderPagination(items.length);
    }

    function resetFilters() {
        state.keyword = '';
        state.category = [];
        state.delivery = [];
        state.extra = [];
        state.sort = 'listedAt';
        state.page = 1;
        elements.zoneSearchInput.value = '';
        elements.zoneSortSelect.value = 'listedAt';
        renderFilterGroups();
        render();
    }

    function switchType(type) {
        if (type !== 'resource' && type !== 'product') return;
        state.type = type;
        state.category = [];
        state.delivery = [];
        state.extra = [];
        state.sort = 'listedAt';
        state.page = 1;
        document.querySelectorAll('[data-zone-type]').forEach(function (tab) {
            var active = tab.dataset.zoneType === type;
            tab.classList.toggle('active', active);
            tab.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        elements.zoneSearchInput.placeholder = type === 'resource'
            ? '搜索本专区的数据资源'
            : '搜索本专区的数据产品';
        elements.zoneSortSelect.innerHTML = type === 'resource'
            ? '<option value="listedAt">上架时间</option><option value="apply">申请量</option><option value="view">浏览量</option>'
            : '<option value="listedAt">上架时间</option><option value="purchase">购买量</option><option value="view">浏览量</option>';
        renderFilterGroups();
        render();
    }

    function bindEvents() {
        elements.zoneSearchForm.addEventListener('submit', function (event) {
            event.preventDefault();
            state.keyword = elements.zoneSearchInput.value.trim();
            state.page = 1;
            render();
        });

        document.querySelectorAll('[data-zone-keyword]').forEach(function (button) {
            button.addEventListener('click', function () {
                state.keyword = button.dataset.zoneKeyword || '';
                state.page = 1;
                render();
            });
        });

        document.querySelectorAll('[data-zone-type]').forEach(function (tab) {
            tab.addEventListener('click', function () {
                switchType(tab.dataset.zoneType);
            });
        });

        elements.zoneFilterGroups.addEventListener('click', function (event) {
            var option = event.target.closest('[data-zone-filter-key]');
            var clear = event.target.closest('[data-zone-clear-filter]');
            if (option) {
                var key = option.dataset.zoneFilterKey;
                var value = option.dataset.zoneFilterValue || '';
                if (!value) {
                    state[key] = [];
                } else {
                    var index = state[key].indexOf(value);
                    if (index >= 0) state[key].splice(index, 1);
                    else state[key].push(value);
                }
            } else if (clear && !clear.disabled) {
                state[clear.dataset.zoneClearFilter] = [];
            } else {
                return;
            }
            state.page = 1;
            renderFilterGroups();
            render();
        });

        elements.zoneEmptyReset.addEventListener('click', resetFilters);
        elements.zoneSortSelect.addEventListener('change', function () {
            state.sort = this.value;
            state.page = 1;
            render();
        });
        elements.zoneClearKeyword.addEventListener('click', function () {
            state.keyword = '';
            state.page = 1;
            render();
        });

        elements.zonePagination.addEventListener('click', function (event) {
            var button = event.target.closest('[data-zone-page]');
            if (!button || button.disabled) return;
            state.page = Number(button.dataset.zonePage || 1);
            render();
            elements.zoneResultHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        elements.zoneCardGrid.addEventListener('click', function (event) {
            var card = event.target.closest('[data-zone-href]');
            if (card) window.location.href = card.dataset.zoneHref;
        });

        elements.zoneCardGrid.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            var card = event.target.closest('[data-zone-href]');
            if (!card) return;
            event.preventDefault();
            window.location.href = card.dataset.zoneHref;
        });
    }

    function init() {
        cacheElements();
        var params = new URLSearchParams(window.location.search);
        var zoneId = params.get('zone') || 'corpus-data-zone';
        var preview = params.get('preview') === '1';
        if (preview) {
            document.body.classList.add('zone-preview-mode');
            elements.zonePreviewClose.hidden = false;
            elements.zonePreviewClose.addEventListener('click', function () {
                if (window.opener && !window.opener.closed) {
                    window.close();
                    return;
                }
                if (window.history.length > 1) window.history.back();
                else window.location.href = 'cms-special-zones.html';
            });
        }
        state.zone = preview
            ? (SpecialZoneStore.getPreview(zoneId) || SpecialZoneStore.getZone(zoneId))
            : SpecialZoneStore.getZone(zoneId);
        if (!state.zone || (state.zone.status !== 'published' && !preview)) {
            document.querySelector('.zone-breadcrumb').hidden = true;
            elements.zoneHero.hidden = true;
            elements.zoneContentCard.hidden = true;
            elements.zoneUnavailable.hidden = false;
            return;
        }
        fillHero();
        renderFilterGroups();
        bindEvents();
        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
