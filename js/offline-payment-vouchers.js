(function () {
    var VOUCHER_IMAGE = 'images/offline-payment-voucher-demo.png';

    function mapRows(rows) {
        return rows.map(function (row) {
            return {
                billNo: row[0],
                orderNo: row[1],
                target: row[2],
                businessType: row[3],
                targetType: row[4],
                counterparty: row[5],
                amount: row[6],
                createdAt: row[7],
                paidAt: row[8],
                status: row[9],
                voucherImage: VOUCHER_IMAGE
            };
        });
    }

    var BUYER_VOUCHERS = mapRows([
        ['2026070817271796000000101148114', '2026070817260805600000101148101', '数据治理与标准体系咨询服务', '服务交易', '企业数据治理咨询服务', '深圳市龙岗区政务数据运营有限公司', '10,000', '2026-07-08 17:27:17', '2026-07-08 17:27:34', '已通过'],
        ['2026070817154863200000101148203', '2026070817135286300000101148174', '企业经营登记基础信息数据集', '产品交易', '数据集', '深圳市龙岗区政务数据运营有限公司', '1,000', '2026-07-08 17:15:48', '2026-07-08 17:16:24', '已通过'],
        ['2026070814074822600000101148140', '2026070814070075400000101148170', '智慧园区解决方案评估服务', '服务交易', '行业解决方案咨询服务', '龙岗智慧园区运营有限公司', '122', '2026-07-08 14:07:48', '2026-07-08 14:07:58', '已通过'],
        ['2026070814030262900000101148290', '2026070814015177100000101148162', '数据战略与要素发展顶层规划', '服务交易', '企业数据治理咨询服务', '深圳市龙岗区政务数据运营有限公司', '100', '2026-07-08 14:03:02', '2026-07-08 14:03:12', '已通过'],
        ['2026070716282007100000101148306', '2026070716265451500000101148172', '数据战略与要素发展顾问服务', '服务交易', '企业数据治理咨询服务', '深圳市龙岗区政务数据运营有限公司', '100', '2026-07-07 16:28:20', '2026-07-07 16:28:37', '已通过'],
        ['2026070716030708200000101148308', '2026070716015636100000101148182', '智慧园区解决方案咨询服务', '服务交易', '行业解决方案咨询服务', '龙岗智慧园区运营有限公司', '100', '2026-07-07 16:03:07', '2026-07-07 16:03:24', '已通过'],
        ['2026070715032669200000101148226', '2026070715011393200000101148110', '园区能耗趋势分析报告', '产品交易', '数据产品', '深圳市智碳数据服务有限公司', '1,000', '2026-07-07 15:03:26', '2026-07-07 15:05:20', '已通过'],
        ['2026061916064264800000101148264', '2026061916051502100000101148116', '福田区金融风控数据建模服务', '服务交易', '数据建模服务', '深圳市金融数据服务有限公司', '100', '2026-06-19 16:06:42', '2026-06-19 16:07:05', '已通过'],
        ['2026061915534737100000101148273', '2026061915515202800000101148184', '医疗健康主题数据集', '产品交易', '数据集', '深圳市健康数据服务中心', '1', '2026-06-19 15:53:47', '2026-06-19 15:58:31', '已通过'],
        ['2026060419485168900000101148674', '2026060419400437100000101148221', '坪山区智能制造产业生态图谱', '产品交易', '数据集', '深圳市龙岗区政务数据运营有限公司', '200', '2026-06-04 19:48:51', '2026-06-04 19:49:20', '已通过'],
        ['2026060419214779100000101148551', '2026060419184903500000101148173', '罗湖区商业数据咨询服务', '服务交易', '企业数据治理与合规咨询服务', '深圳市龙岗区数据要素交易服务有限公司', '100', '2026-06-04 19:21:47', '2026-06-04 19:22:10', '已驳回'],
        ['2026060116110648700000101148228', '2026060116103245300000101148835', '企业运营指标分析数据产品', '产品交易', '数据产品', '深圳市龙岗远望软件技术有限公司', '100', '2026-06-01 16:11:06', '2026-06-01 16:11:13', '已通过']
    ]);

    var SUPPLIER_VOUCHERS = mapRows([
        ['2026072310111807600000101149465', '2026071714092607600000101149465', '数据资产融资可行性评估服务', '服务交易', '企业数据资产融资咨询服务', '深圳市龙岗科创金融服务有限公司', '1,800', '2026-07-23 10:11:18', '2026-07-23 10:13:06', '已通过'],
        ['2026072213374207500000101149593', '2026070613102407500000101149593', '数据治理成熟度阶段评估服务', '服务交易', '企业数据治理与合规咨询服务', '龙岗区数据应用创新中心', '4,800', '2026-07-22 13:37:42', '2026-07-22 13:40:19', '已通过'],
        ['2026072210521604200000101149064', '2026071613195704200000101149064', '企业信用风险监测数据集', '产品交易', '数据集', '深圳市龙岗产业投资服务有限公司', '500', '2026-07-22 10:52:16', '2026-07-22 10:54:03', '已通过'],
        ['2026072210311907500000101149609', '2026070510294107500000101149609', '公共数据授权运营咨询服务', '服务交易', '数据交易合规评估服务', '龙岗数智产业研究院有限公司', '6,000', '2026-07-22 10:31:19', '2026-07-22 10:33:25', '已通过'],
        ['2026071214290605700000101149113', '2026071214075305700000101149113', '公共信用评价数据产品', '产品交易', '数据产品', '深圳市数治咨询服务有限公司', '500', '2026-07-12 14:09:06', '2026-07-12 14:12:18', '已通过'],
        ['2026071011301806400000101149545', '2026071011182506400000101149545', '行业数据空间建设咨询服务', '服务交易', '行业数据空间建设咨询服务', '龙岗区产业发展研究中心', '3,600', '2026-07-10 11:30:18', '2026-07-10 11:31:06', '已通过'],
        ['2026072016382203300000101149129', '2026071016243803300000101149129', '重点项目运行监测数据产品', '产品交易', '数据产品', '龙岗区重点项目服务中心', '600', '2026-07-10 16:26:22', '2026-07-10 16:29:11', '已通过'],
        ['2026071817264102700000101149145', '2026070817135202700000101149145', '产业招商线索分析数据集', '产品交易', '数据集', '深圳市龙岗招商服务有限公司', '1,000', '2026-07-08 17:15:41', '2026-07-08 17:16:21', '已通过'],
        ['2026071715131905100000101149161', '2026070715011305100000101149161', '园区企业经营趋势分析报告', '产品交易', '数据产品', '龙岗数智产业研究院有限公司', '600', '2026-07-07 15:03:19', '2026-07-07 15:04:08', '已通过'],
        ['2026071419522401500000101149209', '2026070419400401500000101149209', '企业诉求热点分析数据集', '产品交易', '数据集', '深圳市政务服务数据中心', '160', '2026-07-04 19:42:24', '2026-07-04 19:44:10', '已驳回'],
        ['2026062814351502300000101149225', '2026062814213602300000101149225', '产业人才供需趋势分析服务', '服务交易', '数据分析服务', '深圳市人才发展研究中心', '2,400', '2026-06-28 14:35:15', '2026-06-28 14:37:52', '已通过'],
        ['2026061911183204600000101149241', '2026061911032804600000101149241', '重点企业风险预警数据产品', '产品交易', '数据产品', '龙岗区企业服务中心', '900', '2026-06-19 11:18:32', '2026-06-19 11:20:16', '已通过']
    ]);

    var ICON_PATHS = {
        search: '<path d="M9.5 3a6.5 6.5 0 0 1 5.16 10.45l4.45 4.44-1.42 1.42-4.44-4.45A6.5 6.5 0 1 1 9.5 3zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"/>',
        filter: '<path d="M3 5h18l-7 8v5l-4 2v-7L3 5zm4.4 2 4.6 5.25V17l1-.5v-4.25L17.6 7H7.4z"/>',
        reset: '<path d="M12 5V2L7 7l5 5V7a5 5 0 1 1-4.55 7.06l-1.82.83A7 7 0 1 0 12 5z"/>',
        view: '<path d="M12 5c5 0 8.4 4.2 9.5 7-1.1 2.8-4.5 7-9.5 7S3.6 14.8 2.5 12C3.6 9.2 7 5 12 5zm0 2c-3.6 0-6.2 2.7-7.3 5 1.1 2.3 3.7 5 7.3 5s6.2-2.7 7.3-5C18.2 9.7 15.6 7 12 7zm0 2.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6z"/>',
        close: '<path d="M18.3 5.71 12 12l6.3 6.29-1.42 1.42L10.59 13.4 4.29 19.71 2.88 18.3 9.17 12 2.88 5.71 4.29 4.3l6.3 6.29 6.29-6.29 1.42 1.41z"/>',
        image: '<path d="M21 19V5c0-1.1-.9-2-2-2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 11.5 11 14.51 14.5 10l4.5 6H5l3.5-4.5z"/>'
    };

    function icon(name) {
        return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICON_PATHS[name] || ICON_PATHS.view) + '</svg>';
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character];
        });
    }

    function formatAmount(value) {
        var amount = Number(String(value == null ? '' : value).replace(/[^\d.]/g, '')) || 0;
        return amount.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    }

    function initOfflinePaymentVouchers() {
        var params = new URLSearchParams(window.location.search || '');
        if (params.get('menu') !== 'offline-voucher') return;

        var panel = document.querySelector('[data-consult-panel]');
        var title = document.querySelector('[data-center-title]');
        if (!panel) return;

        var role = panel.dataset.role === 'supplier' ? 'supplier' : 'buyer';
        var records = role === 'supplier' ? SUPPLIER_VOUCHERS : BUYER_VOUCHERS;
        var state = {
            keyword: '',
            keywordDraft: '',
            businessType: '全部业务类型',
            status: '全部状态',
            startDate: '',
            endDate: '',
            filterOpen: true,
            page: 1,
            pageSize: 10
        };
        var activeRecord = null;
        var drawerReturnFocus = null;

        panel.classList.remove('is-placeholder', 'is-service-management', 'is-order-management', 'is-supplier-order-management', 'is-bill-management', 'is-supplier-bill-management');
        panel.classList.add('is-offline-voucher-management');
        if (title) title.textContent = '线下支付凭证';
        document.title = '线下支付凭证 - ' + (role === 'supplier' ? '供方中心' : '需方中心');

        function getFilteredRecords() {
            var keyword = state.keyword.toLowerCase();
            return records.filter(function (item) {
                var createdDate = item.createdAt.slice(0, 10);
                if (state.businessType !== '全部业务类型' && item.businessType !== state.businessType) return false;
                if (state.status !== '全部状态' && item.status !== state.status) return false;
                if (state.startDate && createdDate < state.startDate) return false;
                if (state.endDate && createdDate > state.endDate) return false;
                if (!keyword) return true;
                var searchable = [item.billNo, item.orderNo, item.target, item.counterparty].join(' ').toLowerCase();
                return searchable.indexOf(keyword) !== -1;
            });
        }

        function renderOptions(options, selected) {
            return options.map(function (option) {
                return '<option value="' + escapeHtml(option) + '"' + (option === selected ? ' selected' : '') + '>' + escapeHtml(option) + '</option>';
            }).join('');
        }

        function renderFilters() {
            return ''
                + '<div class="offline-voucher-filters' + (state.filterOpen ? ' show' : '') + '" data-offline-voucher-filters>'
                +   '<select data-offline-voucher-business aria-label="业务类型">' + renderOptions(['全部业务类型', '产品交易', '服务交易'], state.businessType) + '</select>'
                +   '<select data-offline-voucher-status aria-label="状态">' + renderOptions(['全部状态', '已通过', '已驳回'], state.status) + '</select>'
                +   '<div class="offline-voucher-date-range" role="group" aria-label="账单生成时间范围">'
                +       '<span>账单生成时间</span>'
                +       '<input type="date" value="' + escapeHtml(state.startDate) + '" data-offline-voucher-start-date aria-label="账单生成开始日期">'
                +       '<i>—</i>'
                +       '<input type="date" value="' + escapeHtml(state.endDate) + '" data-offline-voucher-end-date aria-label="账单生成结束日期">'
                +   '</div>'
                +   '<button class="offline-voucher-reset" type="button" data-offline-voucher-reset>' + icon('reset') + '<span>重置</span></button>'
                + '</div>';
        }

        function renderRows(items) {
            if (!items.length) {
                return '<tr><td class="offline-voucher-empty" colspan="11">'
                    + icon('image')
                    + '<strong>暂无符合条件的线下支付凭证</strong>'
                    + '<span>请调整关键词或筛选条件后重试</span>'
                    + '</td></tr>';
            }
            return items.map(function (item) {
                var statusClass = item.status === '已驳回' ? ' rejected' : ' approved';
                return ''
                    + '<tr>'
                    +   '<td class="offline-voucher-ellipsis" title="' + escapeHtml(item.billNo) + '"><span class="offline-voucher-number">' + escapeHtml(item.billNo) + '</span></td>'
                    +   '<td class="offline-voucher-ellipsis" title="' + escapeHtml(item.orderNo) + '"><span class="offline-voucher-number">' + escapeHtml(item.orderNo) + '</span></td>'
                    +   '<td class="offline-voucher-ellipsis" title="' + escapeHtml(item.target) + '">' + escapeHtml(item.target) + '</td>'
                    +   '<td>' + escapeHtml(item.businessType) + '</td>'
                    +   '<td class="offline-voucher-ellipsis" title="' + escapeHtml(item.targetType) + '">' + escapeHtml(item.targetType) + '</td>'
                    +   '<td class="offline-voucher-ellipsis" title="' + escapeHtml(item.counterparty) + '">' + escapeHtml(item.counterparty) + '</td>'
                    +   '<td class="offline-voucher-amount">' + escapeHtml(formatAmount(item.amount)) + '</td>'
                    +   '<td>' + escapeHtml(item.createdAt) + '</td>'
                    +   '<td>' + escapeHtml(item.paidAt) + '</td>'
                    +   '<td class="offline-voucher-status-cell"><span class="offline-voucher-status' + statusClass + '"><i></i>' + escapeHtml(item.status) + '</span></td>'
                    +   '<td class="offline-voucher-action-cell"><button class="offline-voucher-action" type="button" data-offline-voucher-view="' + escapeHtml(item.billNo) + '">' + icon('view') + '<span>查看凭证</span></button></td>'
                    + '</tr>';
            }).join('');
        }

        function renderPagination(total, totalPages) {
            var pageButtons = [];
            for (var pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
                pageButtons.push('<button class="offline-voucher-page-button' + (pageNumber === state.page ? ' active' : '') + '" type="button" data-offline-voucher-page="' + pageNumber + '">' + pageNumber + '</button>');
            }
            return ''
                + '<div class="offline-voucher-pagination">'
                +   '<span>共 ' + total + ' 条</span>'
                +   '<button class="offline-voucher-page-button" type="button" aria-label="上一页" data-offline-voucher-page="prev"' + (state.page <= 1 ? ' disabled' : '') + '>‹</button>'
                +   pageButtons.join('')
                +   '<button class="offline-voucher-page-button" type="button" aria-label="下一页" data-offline-voucher-page="next"' + (state.page >= totalPages ? ' disabled' : '') + '>›</button>'
                +   '<select class="offline-voucher-page-size" data-offline-voucher-page-size aria-label="每页条数">'
                +       '<option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10 条/页</option>'
                +       '<option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20 条/页</option>'
                +   '</select>'
                +   '<span>前往</span>'
                +   '<input class="offline-voucher-page-jump" type="number" min="1" max="' + totalPages + '" aria-label="前往页码" data-offline-voucher-page-jump>'
                + '</div>';
        }

        function renderTable() {
            var filtered = getFilteredRecords();
            var totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
            if (state.page > totalPages) state.page = totalPages;
            var start = (state.page - 1) * state.pageSize;
            var currentRecords = filtered.slice(start, start + state.pageSize);
            var counterpartyLabel = role === 'supplier' ? '需方' : '提供方';
            var amountLabel = role === 'supplier' ? '应收金额(元)' : '应付金额(元)';
            return ''
                + '<div class="offline-voucher-table-card">'
                +   '<div class="offline-voucher-table-scroll" aria-label="线下支付凭证列表，可横向滚动">'
                +       '<table class="offline-voucher-table">'
                +           '<colgroup>'
                +               '<col class="col-bill-no"><col class="col-order-no"><col class="col-target"><col class="col-business"><col class="col-target-type"><col class="col-counterparty">'
                +               '<col class="col-amount"><col class="col-created"><col class="col-paid"><col class="col-status"><col class="col-action">'
                +           '</colgroup>'
                +           '<thead><tr>'
                +               '<th>账单编号</th><th>订单编号</th><th>交易标的</th><th>业务类型</th><th>标的类型</th><th>' + counterpartyLabel + '</th>'
                +               '<th class="offline-voucher-amount">' + amountLabel + '</th><th>账单生成时间</th><th>付款时间</th>'
                +               '<th class="offline-voucher-status-cell">状态</th><th class="offline-voucher-action-cell">操作</th>'
                +           '</tr></thead>'
                +           '<tbody>' + renderRows(currentRecords) + '</tbody>'
                +       '</table>'
                +   '</div>'
                +   renderPagination(filtered.length, totalPages)
                + '</div>';
        }

        function render() {
            panel.innerHTML = ''
                + '<div class="offline-voucher-board">'
                +   '<div class="offline-voucher-toolbar">'
                +       '<label class="offline-voucher-search">'
                +           '<input type="search" placeholder="请输入账单编号/订单编号/交易标的" value="' + escapeHtml(state.keywordDraft) + '" data-offline-voucher-keyword aria-label="搜索线下支付凭证">'
                +           icon('search')
                +       '</label>'
                +       '<button class="offline-voucher-query" type="button" data-offline-voucher-query>' + icon('search') + '<span>查询</span></button>'
                +       '<button class="offline-voucher-filter-toggle' + (state.filterOpen ? ' active' : '') + '" type="button" aria-expanded="' + state.filterOpen + '" data-offline-voucher-filter-toggle>' + icon('filter') + '<span>筛选</span></button>'
                +   '</div>'
                +   renderFilters()
                +   renderTable()
                + '</div>';
            bindEvents();
        }

        function applyKeyword() {
            state.keyword = state.keywordDraft.trim();
            state.page = 1;
            render();
        }

        function applySelection(selector, key) {
            var control = panel.querySelector(selector);
            if (!control) return;
            control.addEventListener('change', function () {
                state[key] = this.value;
                state.keyword = state.keywordDraft.trim();
                state.page = 1;
                render();
            });
        }

        function changePage(value) {
            var totalPages = Math.max(1, Math.ceil(getFilteredRecords().length / state.pageSize));
            state.page = Math.min(totalPages, Math.max(1, parseInt(value, 10) || 1));
            render();
        }

        function renderDrawer(record) {
            return ''
                + '<div class="offline-voucher-drawer-mask" data-offline-voucher-drawer-mask>'
                +   '<aside class="offline-voucher-drawer" role="dialog" aria-modal="true" aria-labelledby="offlineVoucherDrawerTitle">'
                +       '<header class="offline-voucher-drawer-header">'
                +           '<h2 id="offlineVoucherDrawerTitle">查看凭证</h2>'
                +           '<button class="offline-voucher-drawer-close" type="button" aria-label="关闭查看凭证" data-offline-voucher-drawer-close>' + icon('close') + '</button>'
                +       '</header>'
                +       '<div class="offline-voucher-drawer-body">'
                +           '<div class="offline-voucher-preview">'
                +               '<img src="' + escapeHtml(record.voucherImage) + '" alt="线下支付凭证：' + escapeHtml(record.billNo) + '" data-offline-voucher-image>'
                +               '<div class="offline-voucher-image-error" hidden data-offline-voucher-image-error>' + icon('image') + '<strong>凭证图片加载失败</strong><span>请关闭后重新查看</span></div>'
                +           '</div>'
                +       '</div>'
                +   '</aside>'
                + '</div>';
        }

        function openDrawer(record, trigger) {
            closeDrawer(false);
            activeRecord = record;
            drawerReturnFocus = trigger || document.activeElement;
            document.body.insertAdjacentHTML('beforeend', renderDrawer(record));
            document.body.classList.add('offline-voucher-drawer-open');
            bindDrawerEvents();
            var closeButton = document.querySelector('[data-offline-voucher-drawer-close]');
            if (closeButton) closeButton.focus();
        }

        function closeDrawer(restoreFocus) {
            var mask = document.querySelector('[data-offline-voucher-drawer-mask]');
            if (mask) mask.remove();
            document.body.classList.remove('offline-voucher-drawer-open');
            activeRecord = null;
            if (restoreFocus !== false && drawerReturnFocus && document.body.contains(drawerReturnFocus)) {
                drawerReturnFocus.focus();
            }
            if (restoreFocus !== false) drawerReturnFocus = null;
        }

        function bindDrawerEvents() {
            var mask = document.querySelector('[data-offline-voucher-drawer-mask]');
            var closeButton = document.querySelector('[data-offline-voucher-drawer-close]');
            var image = document.querySelector('[data-offline-voucher-image]');
            var errorState = document.querySelector('[data-offline-voucher-image-error]');
            if (closeButton) closeButton.addEventListener('click', function () { closeDrawer(true); });
            if (mask) {
                mask.addEventListener('click', function (event) {
                    if (event.target === mask) closeDrawer(true);
                });
            }
            if (image) {
                image.addEventListener('error', function () {
                    image.hidden = true;
                    if (errorState) errorState.hidden = false;
                });
            }
        }

        function bindEvents() {
            var keyword = panel.querySelector('[data-offline-voucher-keyword]');
            if (keyword) {
                keyword.addEventListener('input', function () { state.keywordDraft = this.value; });
                keyword.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') applyKeyword();
                });
            }

            var queryButton = panel.querySelector('[data-offline-voucher-query]');
            if (queryButton) queryButton.addEventListener('click', applyKeyword);

            var filterToggle = panel.querySelector('[data-offline-voucher-filter-toggle]');
            if (filterToggle) {
                filterToggle.addEventListener('click', function () {
                    state.filterOpen = !state.filterOpen;
                    render();
                });
            }

            applySelection('[data-offline-voucher-business]', 'businessType');
            applySelection('[data-offline-voucher-status]', 'status');
            applySelection('[data-offline-voucher-start-date]', 'startDate');
            applySelection('[data-offline-voucher-end-date]', 'endDate');

            var resetButton = panel.querySelector('[data-offline-voucher-reset]');
            if (resetButton) {
                resetButton.addEventListener('click', function () {
                    state.keyword = '';
                    state.keywordDraft = '';
                    state.businessType = '全部业务类型';
                    state.status = '全部状态';
                    state.startDate = '';
                    state.endDate = '';
                    state.page = 1;
                    render();
                });
            }

            panel.querySelectorAll('[data-offline-voucher-view]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var billNo = this.dataset.offlineVoucherView;
                    var record = records.find(function (item) { return item.billNo === billNo; });
                    if (record) openDrawer(record, this);
                });
            });

            panel.querySelectorAll('[data-offline-voucher-page]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.disabled) return;
                    var target = this.dataset.offlineVoucherPage;
                    if (target === 'prev') changePage(state.page - 1);
                    else if (target === 'next') changePage(state.page + 1);
                    else changePage(target);
                });
            });

            var pageSize = panel.querySelector('[data-offline-voucher-page-size]');
            if (pageSize) {
                pageSize.addEventListener('change', function () {
                    state.pageSize = parseInt(this.value, 10) || 10;
                    state.page = 1;
                    render();
                });
            }

            var pageJump = panel.querySelector('[data-offline-voucher-page-jump]');
            if (pageJump) {
                pageJump.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') changePage(this.value);
                });
                pageJump.addEventListener('change', function () {
                    if (this.value) changePage(this.value);
                });
            }
        }

        document.addEventListener('keydown', function (event) {
            if (!activeRecord) return;
            if (event.key === 'Escape') {
                event.preventDefault();
                closeDrawer(true);
                return;
            }
            if (event.key === 'Tab') {
                var closeButton = document.querySelector('[data-offline-voucher-drawer-close]');
                if (closeButton) {
                    event.preventDefault();
                    closeButton.focus();
                }
            }
        });

        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOfflinePaymentVouchers);
    } else {
        initOfflinePaymentVouchers();
    }
})();
