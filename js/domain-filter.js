/* 门户资源、产品共用的一级领域分类。 */
(function () {
    'use strict';

    var domains = [
        '金融服务', '城市治理', '宏观经济', '智慧教育', '医疗健康', '工业制造',
        '商贸流通', '现代农业', '低空经济', '应急管理', '科技创新', '社会信用'
    ];

    function create(roots, onChange) {
        var selected = [];
        var inputs = [];
        var counters = [];

        function syncSelection() {
            inputs.forEach(function (input) {
                var domain = input.getAttribute('data-domain');
                input.checked = domain ? selected.indexOf(domain) !== -1 : !selected.length;
                input.closest('.filter-option').classList.toggle('active', input.checked);
            });
        }

        Array.prototype.forEach.call(roots, function (root) {
            root.classList.add('domain-filter');
            root.innerHTML = '<div class="filter-title"><span>领域分类</span>' +
                '<button class="filter-clear" type="button" aria-label="清除领域分类筛选">' +
                '<span class="material-symbols-outlined" aria-hidden="true">restart_alt</span>清除</button></div>' +
                '<div class="filter-options" role="group" aria-label="领域分类，多选">' +
                [''].concat(domains).map(function (domain) {
                    return '<label class="filter-option">' +
                        '<input class="domain-filter-input" type="checkbox" data-domain="' + domain + '">' +
                        '<span class="filter-checkbox" aria-hidden="true"><svg viewBox="0 0 24 24">' +
                        '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></span>' +
                        '<span class="filter-label">' + (domain || '全部') + '</span>' +
                        '<span class="filter-count" data-domain-count="' + domain + '">0</span></label>';
                }).join('') + '</div>';

            root.querySelectorAll('.domain-filter-input').forEach(function (input) {
                inputs.push(input);
                input.addEventListener('change', function () {
                    var domain = input.getAttribute('data-domain');
                    if (!domain) {
                        selected = [];
                    } else if (input.checked) {
                        if (selected.indexOf(domain) === -1) selected.push(domain);
                    } else {
                        selected = selected.filter(function (item) { return item !== domain; });
                    }
                    syncSelection();
                    onChange();
                });
            });
            root.querySelectorAll('[data-domain-count]').forEach(function (counter) {
                counters.push(counter);
            });
            root.querySelector('.filter-clear').addEventListener('click', function () {
                selected = [];
                syncSelection();
                onChange();
            });
        });

        syncSelection();
        return {
            matches: function (card) {
                return !selected.length || selected.indexOf(card.domain) !== -1;
            },
            // 统计当前 tab 中符合其他查询条件的数据，领域之间按“或”组合。
            updateCounts: function (cards) {
                var counts = {};
                cards.forEach(function (card) {
                    counts[card.domain] = (counts[card.domain] || 0) + 1;
                });
                counters.forEach(function (counter) {
                    var domain = counter.getAttribute('data-domain-count');
                    counter.textContent = domain ? (counts[domain] || 0) : cards.length;
                });
            }
        };
    }

    // 复用原有分页外观，筛选变化时复位，避免保留无效的示例页码。
    function createPager(nav, onChange) {
        var currentPage = 1;
        var pageCount = 1;
        var pageSize = 9;
        var numbers = nav.querySelector('.pagination-numbers');
        var buttons = nav.querySelectorAll('.pagination-btn');

        function goTo(page) {
            if (page < 1 || page > pageCount || page === currentPage) return;
            currentPage = page;
            onChange();
        }

        buttons[0].addEventListener('click', function () { goTo(currentPage - 1); });
        buttons[1].addEventListener('click', function () { goTo(currentPage + 1); });
        numbers.addEventListener('click', function (event) {
            var button = event.target.closest('[data-page]');
            if (button) goTo(Number(button.getAttribute('data-page')));
        });

        return {
            slice: function (cards, reset) {
                pageCount = Math.max(1, Math.ceil(cards.length / pageSize));
                currentPage = reset ? 1 : Math.min(currentPage, pageCount);
                buttons[0].disabled = currentPage === 1;
                buttons[1].disabled = currentPage === pageCount;
                numbers.innerHTML = '';
                for (var page = 1; page <= pageCount; page++) {
                    var button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'pagination-number' + (page === currentPage ? ' active' : '');
                    button.setAttribute('data-page', page);
                    button.setAttribute('aria-label', '第 ' + page + ' 页');
                    if (page === currentPage) button.setAttribute('aria-current', 'page');
                    button.textContent = page;
                    numbers.appendChild(button);
                }
                return cards.slice((currentPage - 1) * pageSize, currentPage * pageSize);
            }
        };
    }

    window.PortalDomainFilter = { create: create, createPager: createPager };
})();
