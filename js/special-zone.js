(function () {
    'use strict';

    var pageSize = 6;
    var state = {
        zone: null,
        type: 'resource',
        keyword: '',
        domain: [],
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

    function getResourceType(item) {
        if (item.resourceType) return item.resourceType;
        if (item.delivery === 'API传输') return 'API';
        if (item.delivery === '数据库传输') return '库表';
        return '数据集';
    }

    function getItemDomain(item) {
        var categoryDomainMap = {
            '产业政策': '宏观经济',
            '城市治理': '城市治理',
            '防汛排涝': '应急管理',
            '仿真训练': '工业制造',
            '风险预警': '城市治理',
            '工业制造': '工业制造',
            '公共数据': '城市治理',
            '公共卫生': '医疗健康',
            '机器人控制': '工业制造',
            '机器视觉': '工业制造',
            '健康养老': '医疗健康',
            '交通分析': '交通运输',
            '交通运输': '交通运输',
            '模型训练': '科技创新',
            '企业服务': '商贸流通',
            '商圈分析': '商贸流通',
            '商圈运营': '商贸流通',
            '设备运维': '工业制造',
            '市政设施': '城市治理',
            '文本解析': '科技创新',
            '文化旅游': '文化旅游',
            '协作安全': '工业制造',
            '药品保障': '医疗健康',
            '医疗服务': '医疗健康',
            '医疗资源': '医疗健康',
            '语料标注': '科技创新',
            '语料检索': '科技创新',
            '语料治理': '科技创新',
            '政务服务': '城市治理',
            '质量评估': '科技创新',
            '智能派单': '城市治理',
            '资源评估': '医疗健康',
            '自主导航': '工业制造'
        };
        return item.domain || categoryDomainMap[item.category] ||
            (window.PortalDomainFilter.domains.indexOf(item.category) !== -1 ? item.category : '其他');
    }

    function formatDelivery(value) {
        return value === 'API传输' ? 'API 传输' : value;
    }

    function formatUpdateCycle(value) {
        var labels = {
            '实时': '实时更新',
            '日度': '每日更新',
            '周度': '按周更新',
            '月度': '按月更新',
            '季度': '按季度更新',
            '年度': '按年更新',
            '次/天': '每日更新',
            '次/月': '按月更新',
            '次/季度': '按季度更新',
            '次/年': '按年更新'
        };
        return labels[value] || value || '按月更新';
    }

    function formatPrice(value) {
        var price = String(value || '一事一议');
        if (price === '面议') return '一事一议';
        if (/^\d/.test(price)) return '¥' + price.replace('万元/', '万/').replace('元/', '/');
        return price;
    }

    function getMeasure(value) {
        var price = String(value || '');
        if (price.indexOf('/MB') !== -1) return '按流量';
        if (/\/(天|月|季度|年)/.test(price)) return '按周期';
        if (/\/(次|份|期|套|单)/.test(price)) return '按次数';
        return '一事一议';
    }

    function shouldShowMeasure(value) {
        var price = String(value || '').trim();
        return price !== '一事一议' && price !== '面议';
    }

    function getCardDescription(item, isProduct) {
        var description = String(item.description || '');
        if (description.length >= 56) return description;
        return description.replace(/[。；;，,]+$/, '') + '，可用于' + item.category +
            (isProduct ? '相关业务的应用集成、辅助研判和运营优化。' : '相关业务的趋势分析、辅助研判和精细化运营。');
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
        }).map(function (item) {
            var normalized = Object.assign({}, item);
            normalized.domain = getItemDomain(item);
            return normalized;
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
        var values;
        if (group.stateKey === 'domain') {
            values = window.PortalDomainFilter.domains.slice();
        } else if (group.stateKey === 'delivery') {
            values = ['API传输', '文件传输', '数据库传输'];
        } else if (group.itemKey === 'dataSource') {
            values = ['原始数据', '加工数据', '交易数据'];
        } else if (group.itemKey === 'updateCycle') {
            values = ['次/天', '次/周', '次/月', '次/季度', '次/年'];
        } else {
            values = uniqueValues(items, group.itemKey);
        }
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
            +           (state[group.stateKey].length ? '' : ' disabled') + '>'
            +           '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5a7 7 0 1 1-6.7 9H3.2A9 9 0 1 0 5 6.7V3H3v7h7V8H6.4A6.96 6.96 0 0 1 12 5z"/></svg>'
            +           '<span>清除</span></button>'
            +   '</div>'
            +   '<div class="zone-filter-options">' + options + '</div>'
            + '</section>';
    }

    function renderFilterGroups() {
        var items = getLinkedItems(state.type);
        var groups = state.type === 'resource'
            ? [
                { title: '领域分类', stateKey: 'domain', itemKey: 'domain' },
                { title: '交付方式', stateKey: 'delivery', itemKey: 'delivery' },
                { title: '数据来源', stateKey: 'extra', itemKey: 'dataSource' }
            ]
            : [
                { title: '领域分类', stateKey: 'domain', itemKey: 'domain' },
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
                item.name, item.category, item.delivery, item.description,
                item.dataSource, item.updateCycle, item.productType, item.price,
                (item.labels || []).join(' ')
            ].join(' ').toLowerCase();
            if (keyword && text.indexOf(keyword) === -1) return false;
            if (state.domain.length && state.domain.indexOf(item.domain) === -1) return false;
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
        var cardType = isProduct ? (item.productType || '数据产品') : getResourceType(item);
        var sourcePrice = isProduct ? item.price : (item.price || (item.delivery === 'API传输' ? '0.02元/次' : '一事一议'));
        var price = formatPrice(sourcePrice);
        var billing = getMeasure(sourcePrice);
        return ''
            + '<article class="zone-data-card" tabindex="0" data-zone-href="' + escapeHtml(item.href || '#') + '">'
            +   '<div class="zone-card-head">'
            +       '<div class="zone-card-image">'
            +           '<img src="' + escapeHtml(item.image) + '" alt="">'
            +       '</div>'
            +       '<div class="zone-card-heading">'
            +           '<h2 class="zone-card-title" title="' + escapeHtml(item.name) + '">' + escapeHtml(item.name) + '</h2>'
            +           '<div class="zone-card-tags">'
            +               '<span class="zone-card-tag">' + escapeHtml(cardType) + '</span>'
            +               '<span class="zone-card-tag">' + escapeHtml(formatDelivery(item.delivery)) + '</span>'
            +           '</div>'
            +   '</div>'
            +   '</div>'
            +   '<p class="zone-card-description">' + escapeHtml(getCardDescription(item, isProduct)) + '</p>'
            +   '<div class="zone-card-info">'
            +       '<span class="zone-card-info-item"><span class="zone-card-info-label">覆盖范围：</span><span class="zone-card-info-value">龙岗区</span></span>'
            +       '<span class="zone-card-info-item"><span class="zone-card-info-label">更新频率：</span><span class="zone-card-info-value">' + escapeHtml(formatUpdateCycle(item.updateCycle)) + '</span></span>'
            +   '</div>'
            +   '<div class="zone-card-price-row">'
            +       '<span class="zone-card-price-label">参考价格</span>'
            +       '<strong class="zone-card-price-value' + (/^¥/.test(price) ? ' amount' : '') + '">' + escapeHtml(price) + '</strong>'
            +       (billing && shouldShowMeasure(price)
                ? '<span class="zone-card-billing"><span class="zone-card-info-label">计量方式：</span><span class="zone-card-info-value">' + escapeHtml(billing) + '</span></span>'
                : '')
            +   '</div>'
            +   '<div class="zone-card-footer">'
            +       '<span class="zone-card-type">' + escapeHtml(item.domain) + '</span>'
            +       '<span class="zone-card-meta">' + escapeHtml(item.listedAt) + '</span>'
            +   '</div>'
            + '</article>';
    }

    function renderPagination(total) {
        if (total === 0) {
            elements.zonePagination.innerHTML = '';
            return;
        }
        var pageCount = Math.max(1, Math.ceil(total / pageSize));
        var html = '<button class="zone-page-button" type="button" data-zone-page="' + (state.page - 1) + '"'
            + (state.page === 1 ? ' disabled' : '') + '>上一页</button>';
        for (var page = 1; page <= pageCount; page += 1) {
            html += '<button class="zone-page-button' + (page === state.page ? ' active' : '')
                + '" type="button" data-zone-page="' + page + '"'
                + (page === state.page ? ' aria-current="page"' : '') + '>' + page + '</button>';
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
        state.domain = [];
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
        state.domain = [];
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
