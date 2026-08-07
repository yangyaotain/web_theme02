(function () {
    var MENU_CONFIG = {
        'invoice-info': { role: 'buyer', category: 'product', view: 'info', menuTitle: '产品开票信息', pageTitle: '开票信息管理' },
        'invoice-apply': { role: 'buyer', category: 'product', view: 'apply', menuTitle: '产品开票申请', pageTitle: '开票申请' },
        'service-invoice-info': { role: 'buyer', category: 'service', view: 'info', menuTitle: '服务开票信息', pageTitle: '开票信息管理' },
        'service-invoice-apply': { role: 'buyer', category: 'service', view: 'apply', menuTitle: '服务开票申请', pageTitle: '开票申请' },
        'invoice': { role: 'supplier', category: 'product', view: 'review', menuTitle: '产品开票审核', pageTitle: '开票申请' },
        'service-invoice-review': { role: 'supplier', category: 'service', view: 'review', menuTitle: '服务开票审核', pageTitle: '开票申请' }
    };

    var HEADERS = {
        product: [
            {
                id: 'product-header-1',
                name: '深圳市龙岗智慧产业有限公司',
                taxId: '91440300MA5H7K2P6D',
                bank: '中国建设银行深圳龙岗支行',
                account: '4420157000001234567',
                address: '深圳市龙岗区龙城街道清林路园区A座1208室',
                phone: '075528960518'
            }
        ],
        service: [
            {
                id: 'service-header-1',
                name: '深圳市龙岗数智运营有限公司',
                taxId: '91440300MA5J8R4Q9T',
                bank: '招商银行深圳龙城支行',
                account: '755902130000123',
                address: '深圳市龙岗区坂田街道天安云谷产业园二期6栋',
                phone: '075528975826'
            }
        ]
    };

    var PRODUCT_PENDING_ROWS = [
        ['2026072510163201100000101151011', '2026072510091801100000101151011', '企业信用风险监测数据集', '数据集', '一次性付款', '2026-07-25 10:16:32', '500', '2026-07-25 10:18:06', '深圳市龙岗数智科技有限公司'],
        ['2026072414382102200000101151022', '2026072414305702200000101151022', '重点产业链运行分析数据产品', '数据产品', '一次性付款', '2026-07-24 14:38:21', '800', '2026-07-24 14:40:11', '龙岗数科产业运营有限公司'],
        ['2026072311094203300000101151033', '2026072311021603300000101151033', '园区企业能耗趋势监测数据集', '数据集', '2026年7月账期', '2026-07-23 11:09:42', '600', '2026-07-23 11:12:20', '深圳市智碳数据服务有限公司'],
        ['2026072217051304400000101151044', '2026072216584804400000101151044', '公共信用评价数据产品', '数据产品', '一次性付款', '2026-07-22 17:05:13', '500', '2026-07-22 17:06:59', '深圳市公共信用中心'],
        ['2026072115213605500000101151055', '2026072115140205500000101151055', '产业招商线索分析数据集', '数据集', '一次性付款', '2026-07-21 15:21:36', '1,000', '2026-07-21 15:23:42', '深圳市龙岗区数据服务中心'],
        ['2026072010452706600000101151066', '2026072010385106600000101151066', '低空经济企业经营画像数据产品', '数据产品', '一次性付款', '2026-07-20 10:45:27', '1,200', '2026-07-20 10:47:18', '龙岗数科产业运营有限公司'],
        ['2026071816325807700000101151077', '2026071816252407700000101151077', '中小微企业政策匹配数据集', '数据集', '一次性付款', '2026-07-18 16:32:58', '250', '2026-07-18 16:34:30', '龙岗区企业服务集团有限公司'],
        ['2026071714130908800000101151088', '2026071714054608800000101151088', '园区经营指标分析数据产品', '数据产品', '一次性付款', '2026-07-17 14:13:09', '600', '2026-07-17 14:14:56', '深圳市龙岗区政务数据运营有限公司'],
        ['2026071610264409900000101151099', '2026071610191309900000101151099', '企业诉求热点分析数据集', '数据集', '一次性付款', '2026-07-16 10:26:44', '160', '2026-07-16 10:28:05', '深圳市政务服务数据中心'],
        ['2026071517561201200000101151102', '2026071517483901200000101151102', '重点项目运行监测数据产品', '数据产品', '一次性付款', '2026-07-15 17:56:12', '600', '2026-07-15 17:58:04', '深圳市龙岗数智科技有限公司']
    ];

    var SERVICE_PENDING_ROWS = [
        ['2026072515281702100000101152011', '2026072515204302100000101152011', '企业数据治理成熟度评估服务', '企业数据治理与合规咨询服务', '阶段款（第2/3期）', '2026-07-25 15:28:17', '4,800', '2026-07-25 15:31:06', '深圳市龙岗数智科技有限公司'],
        ['2026072411163803200000101152022', '2026072411091203200000101152022', '公共数据授权运营咨询服务', '数据交易合规评估服务', '尾款（第3/3期）', '2026-07-24 11:16:38', '6,000', '2026-07-24 11:18:45', '深圳市龙岗区数据要素交易服务有限公司'],
        ['2026072316495204300000101152033', '2026072316422804300000101152033', '行业数据空间建设咨询服务', '行业数据空间建设咨询服务', '一次性付款', '2026-07-23 16:49:52', '3,600', '2026-07-23 16:52:19', '龙岗数智产业研究院有限公司'],
        ['2026072210352605400000101152044', '2026072210274305400000101152044', '数据资产融资可行性评估服务', '企业数据资产融资咨询服务', '首期款（第1/3期）', '2026-07-22 10:35:26', '1,800', '2026-07-22 10:37:08', '深圳市龙岗科创金融服务有限公司'],
        ['2026072114071406500000101152055', '2026072113593606500000101152055', '智慧园区解决方案评估服务', '行业解决方案咨询服务', '一次性付款', '2026-07-21 14:07:14', '3,200', '2026-07-21 14:09:22', '龙岗智慧园区运营有限公司'],
        ['2026071811243907600000101152066', '2026071811170507600000101152066', '企业经营数据合规诊断服务', '企业数据治理与合规咨询服务', '一次性付款', '2026-07-18 11:24:39', '2,600', '2026-07-18 11:26:13', '深圳市龙岗区政务数据运营有限公司']
    ];

    var PRODUCT_HISTORY_ROWS = [
        ['2026071410362101300000101151113', '2026071410284401300000101151113', '产业人才供需趋势数据产品', '数据产品', '一次性付款', '2026-07-14 10:36:21', '900', '2026-07-14 10:38:07', '深圳市龙岗数智科技有限公司', 'issued', '增值税专用发票', '2026-07-26 09:18:41', '2026-07-26 09:21:08', '--'],
        ['2026071315294802400000101151124', '2026071315221602400000101151124', '重点企业风险预警数据集', '数据集', '一次性付款', '2026-07-13 15:29:48', '500', '2026-07-13 15:31:26', '深圳市龙岗数智科技有限公司', 'applied', '增值税普通发票', '2026-07-26 09:16:32', '--', '--'],
        ['2026071214113503500000101151135', '2026071214035703500000101151135', '企业经营趋势分析报告', '数据产品', '一次性付款', '2026-07-12 14:11:35', '600', '2026-07-12 14:13:04', '深圳市龙岗数智科技有限公司', 'applied', '增值税专用发票', '2026-07-26 09:14:20', '--', '--'],
        ['2026071110261904600000101151146', '2026071110184204600000101151146', '公共服务资源分布数据集', '数据集', '一次性付款', '2026-07-11 10:26:19', '300', '2026-07-11 10:27:55', '深圳市龙岗数智科技有限公司', 'rejected', '增值税普通发票', '2026-07-26 09:12:08', '2026-07-26 09:13:21', '--']
    ];

    var SERVICE_HISTORY_ROWS = [
        ['2026071716412201700000101152077', '2026071716335801700000101152077', '数据战略与要素发展规划服务', '企业数据治理咨询服务', '尾款（第3/3期）', '2026-07-17 16:41:22', '6,000', '2026-07-17 16:43:06', '深圳市龙岗数智科技有限公司', 'issued', '增值税专用发票', '2026-07-26 10:08:35', '2026-07-26 10:11:02', '--'],
        ['2026071613584302800000101152088', '2026071613510902800000101152088', '数据交易合规评估服务', '数据交易合规评估服务', '一次性付款', '2026-07-16 13:58:43', '3,800', '2026-07-16 14:00:16', '深圳市龙岗数智科技有限公司', 'applied', '增值税普通发票', '2026-07-26 10:06:18', '--', '--'],
        ['2026071511293603900000101152099', '2026071511215203900000101152099', '园区数字化运营诊断服务', '行业解决方案咨询服务', '一次性付款', '2026-07-15 11:29:36', '4,200', '2026-07-15 11:31:10', '深圳市龙岗数智科技有限公司', 'applied', '增值税专用发票', '2026-07-26 10:04:06', '--', '--'],
        ['2026071417062404100000101152101', '2026071416584804100000101152101', '数据资产入表实施辅导服务', '企业数据资产融资咨询服务', '阶段款（第2/3期）', '2026-07-14 17:06:24', '5,600', '2026-07-14 17:08:11', '深圳市龙岗数智科技有限公司', 'rejected', '增值税普通发票', '2026-07-26 10:01:54', '2026-07-26 10:03:09', '--']
    ];

    var INVOICE_IMAGE = 'images/invoice-preview-demo.png';

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character];
        });
    }

    function icon(name) {
        return '<span class="material-symbols-outlined" aria-hidden="true">' + escapeHtml(name) + '</span>';
    }

    function formatAmount(value) {
        var amount = Number(String(value == null ? '' : value).replace(/[^\d.]/g, '')) || 0;
        return amount.toLocaleString('zh-CN', { maximumFractionDigits: 2 });
    }

    function rowsToRecords(category, stage, rows) {
        return rows.map(function (row, index) {
            var currentStage = stage || row[9];
            var header = HEADERS[category][index % HEADERS[category].length];
            return {
                id: row[0],
                category: category,
                billNo: row[0],
                orderNo: row[1],
                target: row[2],
                businessType: category === 'product' ? '产品交易' : '服务交易',
                targetType: row[3],
                period: row[4],
                billCreatedAt: row[5],
                paidAmount: row[6],
                invoiceAmount: row[6],
                paidAt: row[7],
                provider: row[8],
                stage: currentStage,
                invoiceType: currentStage === 'eligible' ? '' : row[10],
                invoiceHeader: currentStage === 'eligible' ? '' : header.name,
                taxId: currentStage === 'eligible' ? '' : header.taxId,
                bank: currentStage === 'eligible' ? '' : header.bank,
                account: currentStage === 'eligible' ? '' : header.account,
                address: currentStage === 'eligible' ? '' : header.address,
                phone: currentStage === 'eligible' ? '' : header.phone,
                appliedAt: currentStage === 'eligible' ? '' : row[11],
                processedAt: currentStage === 'eligible' ? '' : row[12],
                opinion: currentStage === 'eligible' ? '' : row[13],
                invoiceImage: currentStage === 'issued' ? INVOICE_IMAGE : ''
            };
        });
    }

    var RECORDS = rowsToRecords('product', 'eligible', PRODUCT_PENDING_ROWS)
        .concat(rowsToRecords('service', 'eligible', SERVICE_PENDING_ROWS))
        .concat(rowsToRecords('product', null, PRODUCT_HISTORY_ROWS))
        .concat(rowsToRecords('service', null, SERVICE_HISTORY_ROWS));

    function statusText(record, pendingView) {
        if (pendingView && record.stage === 'applied') return '待处理';
        if (record.stage === 'issued') return '已开票';
        if (record.stage === 'rejected') return '已驳回';
        return '处理中';
    }

    function statusClass(record) {
        if (record.stage === 'rejected') return ' rejected';
        if (record.stage === 'issued') return ' issued';
        return ' processing';
    }

    function initInvoiceManagement() {
        var params = new URLSearchParams(window.location.search || '');
        var menu = params.get('menu') || '';
        var config = MENU_CONFIG[menu];
        if (!config) return;

        var panel = document.querySelector('[data-consult-panel]');
        var title = document.querySelector('[data-center-title]');
        if (!panel || panel.dataset.role !== config.role) return;

        var state = {
            tab: 'pending',
            keywordDraft: '',
            keyword: '',
            businessType: 'all',
            status: 'all',
            page: 1,
            pageSize: 10,
            drawer: null
        };
        var drawerReturnFocus = null;

        panel.classList.remove('is-placeholder', 'is-service-management', 'is-order-management', 'is-supplier-order-management', 'is-bill-management', 'is-supplier-bill-management', 'is-offline-voucher-management');
        panel.classList.add('is-invoice-management');
        if (title) title.textContent = config.pageTitle;
        document.title = config.menuTitle + ' - ' + (config.role === 'buyer' ? '需方中心' : '供方中心');

        function getCategoryHeaders() {
            return HEADERS[config.category];
        }

        function getRecordById(id) {
            return RECORDS.find(function (record) { return record.id === id; });
        }

        function getFilteredRecords() {
            var keyword = state.keyword.toLowerCase();
            return RECORDS.filter(function (record) {
                if (record.category !== config.category) return false;
                if (state.tab === 'pending') {
                    if (config.role === 'buyer' && record.stage !== 'eligible') return false;
                    if (config.role === 'supplier' && record.stage !== 'applied') return false;
                } else if (record.stage === 'eligible') {
                    return false;
                }
                if (state.businessType !== 'all' && record.businessType !== state.businessType) return false;
                if (state.tab === 'records' && state.status !== 'all') {
                    if (state.status === 'processing' && record.stage !== 'applied') return false;
                    if (state.status === 'issued' && record.stage !== 'issued') return false;
                    if (state.status === 'rejected' && record.stage !== 'rejected') return false;
                }
                if (!keyword) return true;
                return [record.billNo, record.orderNo, record.target, record.provider, record.invoiceHeader]
                    .join(' ').toLowerCase().indexOf(keyword) !== -1;
            }).sort(function (left, right) {
                var leftTime = left.appliedAt || left.paidAt || left.billCreatedAt;
                var rightTime = right.appliedAt || right.paidAt || right.billCreatedAt;
                return String(rightTime).localeCompare(String(leftTime));
            });
        }

        function totalPages(total) {
            return Math.max(1, Math.ceil(total / state.pageSize));
        }

        function renderPagination(total) {
            var pages = totalPages(total);
            if (state.page > pages) state.page = pages;
            var buttons = [];
            for (var page = 1; page <= pages; page += 1) {
                buttons.push('<button class="invoice-page-button' + (page === state.page ? ' active' : '') + '" type="button" data-invoice-page="' + page + '">' + page + '</button>');
            }
            return ''
                + '<div class="invoice-pagination">'
                +   '<span>共 ' + total + ' 条</span>'
                +   '<button class="invoice-page-button" type="button" data-invoice-page="prev" aria-label="上一页"' + (state.page <= 1 ? ' disabled' : '') + '>‹</button>'
                +   buttons.join('')
                +   '<button class="invoice-page-button" type="button" data-invoice-page="next" aria-label="下一页"' + (state.page >= pages ? ' disabled' : '') + '>›</button>'
                +   '<select class="invoice-page-size" data-invoice-page-size aria-label="每页条数">'
                +       '<option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10 条/页</option>'
                +       '<option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20 条/页</option>'
                +   '</select>'
                +   '<span>前往</span>'
                +   '<input class="invoice-page-jump" type="number" min="1" max="' + pages + '" data-invoice-page-jump aria-label="前往页码">'
                + '</div>';
        }

        function renderHeaderRows(headers) {
            if (!headers.length) return '<tr><td class="invoice-empty" colspan="7">暂无开票信息</td></tr>';
            return headers.map(function (header) {
                return ''
                    + '<tr>'
                    +   '<td class="invoice-ellipsis" title="' + escapeHtml(header.name) + '">' + escapeHtml(header.name) + '</td>'
                    +   '<td>' + escapeHtml(header.taxId) + '</td>'
                    +   '<td class="invoice-ellipsis" title="' + escapeHtml(header.bank) + '">' + escapeHtml(header.bank || '--') + '</td>'
                    +   '<td>' + escapeHtml(header.account || '--') + '</td>'
                    +   '<td class="invoice-ellipsis" title="' + escapeHtml(header.address) + '">' + escapeHtml(header.address || '--') + '</td>'
                    +   '<td>' + escapeHtml(header.phone || '--') + '</td>'
                    +   '<td class="invoice-action-cell"><div class="invoice-actions">'
                    +       '<button type="button" data-invoice-header-action="edit" data-header-id="' + escapeHtml(header.id) + '">' + icon('edit') + '<span>修改</span></button>'
                    +       '<button type="button" data-invoice-header-action="delete" data-header-id="' + escapeHtml(header.id) + '">' + icon('delete') + '<span>删除</span></button>'
                    +   '</div></td>'
                    + '</tr>';
            }).join('');
        }

        function renderInfoPage() {
            var headers = getCategoryHeaders();
            var pages = totalPages(headers.length);
            if (state.page > pages) state.page = pages;
            var start = (state.page - 1) * state.pageSize;
            var pageRecords = headers.slice(start, start + state.pageSize);
            return ''
                + '<div class="invoice-board invoice-info-board">'
                +   '<div class="invoice-info-actions">'
                +       '<button class="invoice-primary-button" type="button" data-invoice-add-header>' + icon('add') + '<span>添加发票抬头</span></button>'
                +   '</div>'
                +   '<div class="invoice-table-card">'
                +       '<div class="invoice-table-scroll invoice-header-table-scroll">'
                +           '<table class="invoice-table invoice-header-table">'
                +               '<colgroup><col class="col-header"><col class="col-tax"><col class="col-bank"><col class="col-account"><col class="col-address"><col class="col-phone"><col class="col-actions"></colgroup>'
                +               '<thead><tr><th>发票抬头</th><th>纳税人识别号</th><th>开户银行</th><th>开户账号</th><th>企业注册地址</th><th>企业注册电话</th><th class="invoice-action-cell">操作</th></tr></thead>'
                +               '<tbody>' + renderHeaderRows(pageRecords) + '</tbody>'
                +           '</table>'
                +       '</div>'
                +       renderPagination(headers.length)
                +   '</div>'
                + '</div>';
        }

        function renderTabs() {
            return ''
                + '<div class="invoice-tabs" role="tablist">'
                +   '<button class="invoice-tab' + (state.tab === 'pending' ? ' active' : '') + '" type="button" data-invoice-tab="pending">待申请开票</button>'
                +   '<button class="invoice-tab' + (state.tab === 'records' ? ' active' : '') + '" type="button" data-invoice-tab="records">开票记录</button>'
                + '</div>';
        }

        function renderToolbar() {
            var businessLabel = config.category === 'product' ? '产品交易' : '服务交易';
            var statusFilters = state.tab === 'records'
                ? '<div class="invoice-status-filters" role="group" aria-label="开票状态">'
                    + '<button type="button" data-invoice-status="processing" class="' + (state.status === 'processing' ? 'active' : '') + '">处理中</button>'
                    + '<button type="button" data-invoice-status="issued" class="' + (state.status === 'issued' ? 'active' : '') + '">已开票</button>'
                    + '<button type="button" data-invoice-status="rejected" class="' + (state.status === 'rejected' ? 'active' : '') + '">已驳回</button>'
                    + '</div>'
                : '';
            return ''
                + '<div class="invoice-toolbar">'
                +   '<label class="invoice-search">'
                +       '<input type="search" value="' + escapeHtml(state.keywordDraft) + '" placeholder="请输入订单编号/账单编号/交易标的" data-invoice-keyword>'
                +       '<button type="button" data-invoice-query aria-label="查询">' + icon('search') + '</button>'
                +   '</label>'
                +   '<select data-invoice-business aria-label="业务类型">'
                +       '<option value="all">业务类型</option>'
                +       '<option value="' + businessLabel + '"' + (state.businessType === businessLabel ? ' selected' : '') + '>' + businessLabel + '</option>'
                +   '</select>'
                +   statusFilters
                + '</div>';
        }

        function renderBuyerPendingRows(records) {
            if (!records.length) return '<tr><td class="invoice-empty" colspan="11">暂无待申请开票记录</td></tr>';
            return records.map(function (record) {
                return ''
                    + '<tr>'
                    +   '<td class="invoice-ellipsis"><span class="invoice-number" title="' + escapeHtml(record.billNo) + '">' + escapeHtml(record.billNo) + '</span></td>'
                    +   '<td class="invoice-ellipsis" title="' + escapeHtml(record.orderNo) + '">' + escapeHtml(record.orderNo) + '</td>'
                    +   '<td class="invoice-ellipsis" title="' + escapeHtml(record.target) + '">' + escapeHtml(record.target) + '</td>'
                    +   '<td>' + escapeHtml(record.businessType) + '</td>'
                    +   '<td class="invoice-ellipsis" title="' + escapeHtml(record.targetType) + '">' + escapeHtml(record.targetType) + '</td>'
                    +   '<td>' + escapeHtml(record.period || '--') + '</td>'
                    +   '<td>' + escapeHtml(record.billCreatedAt) + '</td>'
                    +   '<td class="invoice-amount">' + escapeHtml(formatAmount(record.paidAmount)) + '</td>'
                    +   '<td class="invoice-amount">' + escapeHtml(formatAmount(record.invoiceAmount)) + '</td>'
                    +   '<td>' + escapeHtml(record.paidAt) + '</td>'
                    +   '<td class="invoice-action-cell"><div class="invoice-actions"><button type="button" data-invoice-action="apply" data-record-id="' + escapeHtml(record.id) + '">' + icon('receipt_long') + '<span>申请开票</span></button></div></td>'
                    + '</tr>';
            }).join('');
        }

        function renderHistoryRows(records, supplierPending) {
            if (!records.length) return '<tr><td class="invoice-empty" colspan="13">暂无开票记录</td></tr>';
            return records.map(function (record) {
                var actions = '';
                if (supplierPending) {
                    actions = '<button type="button" data-invoice-action="upload" data-record-id="' + escapeHtml(record.id) + '">' + icon('upload') + '<span>上传发票</span></button>'
                        + '<button type="button" data-invoice-action="reject" data-record-id="' + escapeHtml(record.id) + '">' + icon('undo') + '<span>驳回</span></button>';
                } else {
                    if (record.stage === 'issued') {
                        actions += '<button type="button" data-invoice-action="preview" data-record-id="' + escapeHtml(record.id) + '">' + icon('visibility') + '<span>预览发票</span></button>';
                    }
                    actions += '<button type="button" data-invoice-action="detail" data-record-id="' + escapeHtml(record.id) + '">' + icon('info') + '<span>详情</span></button>';
                }
                return ''
                    + '<tr>'
                    +   '<td class="invoice-ellipsis"><span class="invoice-number" title="' + escapeHtml(record.billNo) + '">' + escapeHtml(record.billNo) + '</span></td>'
                    +   '<td class="invoice-ellipsis" title="' + escapeHtml(record.orderNo) + '">' + escapeHtml(record.orderNo) + '</td>'
                    +   '<td class="invoice-ellipsis" title="' + escapeHtml(record.target) + '">' + escapeHtml(record.target) + '</td>'
                    +   '<td>' + escapeHtml(record.businessType) + '</td>'
                    +   '<td class="invoice-ellipsis" title="' + escapeHtml(record.targetType) + '">' + escapeHtml(record.targetType) + '</td>'
                    +   '<td>' + escapeHtml(record.period || '--') + '</td>'
                    +   '<td class="invoice-ellipsis" title="' + escapeHtml(record.invoiceHeader) + '">' + escapeHtml(record.invoiceHeader) + '</td>'
                    +   '<td>' + escapeHtml(record.taxId) + '</td>'
                    +   '<td class="invoice-amount">' + escapeHtml(formatAmount(record.invoiceAmount)) + '</td>'
                    +   '<td>' + escapeHtml(record.invoiceType) + '</td>'
                    +   '<td>' + escapeHtml(record.appliedAt) + '</td>'
                    +   '<td class="invoice-status-cell"><span class="invoice-status' + statusClass(record) + '"><i></i>' + escapeHtml(statusText(record, supplierPending)) + '</span></td>'
                    +   '<td class="invoice-action-cell"><div class="invoice-actions">' + actions + '</div></td>'
                    + '</tr>';
            }).join('');
        }

        function renderRecordsTable() {
            var filtered = getFilteredRecords();
            var pages = totalPages(filtered.length);
            if (state.page > pages) state.page = pages;
            var start = (state.page - 1) * state.pageSize;
            var pageRecords = filtered.slice(start, start + state.pageSize);
            var buyerPending = config.role === 'buyer' && state.tab === 'pending';
            var supplierPending = config.role === 'supplier' && state.tab === 'pending';
            var tableClass = buyerPending ? 'invoice-pending-table' : 'invoice-history-table';
            var head = buyerPending
                ? '<tr><th>账单编号</th><th>订单编号</th><th>交易标的</th><th>业务类型</th><th>标的类型</th><th>账期</th><th>账单生成时间</th><th>实付金额(元)</th><th>可开票金额(元)</th><th>支付时间</th><th class="invoice-action-cell">操作</th></tr>'
                : '<tr><th>账单编号</th><th>订单编号</th><th>交易标的</th><th>业务类型</th><th>标的类型</th><th>账期</th><th>发票抬头</th><th>纳税人识别号</th><th>开票金额(元)</th><th>发票类型</th><th>申请开票时间</th><th class="invoice-status-cell">开票状态</th><th class="invoice-action-cell">操作</th></tr>';
            var rows = buyerPending ? renderBuyerPendingRows(pageRecords) : renderHistoryRows(pageRecords, supplierPending);
            return ''
                + '<div class="invoice-table-card">'
                +   '<div class="invoice-table-scroll">'
                +       '<table class="invoice-table ' + tableClass + '"><thead>' + head + '</thead><tbody>' + rows + '</tbody></table>'
                +   '</div>'
                +   renderPagination(filtered.length)
                + '</div>';
        }

        function renderApplicationPage() {
            return ''
                + '<div class="invoice-board">'
                +   renderTabs()
                +   renderToolbar()
                +   renderRecordsTable()
                + '</div>';
        }

        function requiredMark(required) {
            return required ? '<i class="invoice-required">*</i>' : '';
        }

        function invalidClass(name) {
            return state.drawer && state.drawer.invalid && state.drawer.invalid.indexOf(name) !== -1 ? ' invalid' : '';
        }

        function renderField(label, name, value, maxLength, required, type) {
            return ''
                + '<label class="invoice-form-row">'
                +   '<span>' + requiredMark(required) + escapeHtml(label) + '</span>'
                +   '<span class="invoice-input-wrap' + (name === 'address' ? ' no-counter' : '') + invalidClass(name) + '">'
                +       '<input type="' + (type || 'text') + '" maxlength="' + maxLength + '" value="' + escapeHtml(value || '') + '" placeholder="请输入" data-invoice-drawer-field="' + name + '">'
                +       (name === 'address' ? '' : '<small>' + String(value || '').length + '/' + maxLength + '</small>')
                +   '</span>'
                + '</label>';
        }

        function renderDrawerShell(titleText, body, footer, wide, topAction) {
            return ''
                + '<div class="invoice-drawer-mask" data-invoice-close-drawer>'
                +   '<aside class="invoice-drawer' + (wide ? ' wide' : '') + '" role="dialog" aria-modal="true" aria-labelledby="invoiceDrawerTitle" data-invoice-drawer>'
                +       '<header class="invoice-drawer-header">'
                +           '<button class="invoice-drawer-close" type="button" data-invoice-close-drawer aria-label="关闭">' + icon('close') + '</button>'
                +           '<h2 id="invoiceDrawerTitle">' + escapeHtml(titleText) + '</h2>'
                +           (topAction || '')
                +       '</header>'
                +       '<div class="invoice-drawer-body">' + body + '</div>'
                +       (footer ? '<footer class="invoice-drawer-footer">' + footer + '</footer>' : '')
                +   '</aside>'
                + '</div>';
        }

        function renderHeaderDrawer() {
            var draft = state.drawer.draft;
            var body = ''
                + '<div class="invoice-form">'
                +   renderField('发票抬头', 'name', draft.name, 50, true)
                +   renderField('纳税人识别号', 'taxId', draft.taxId, 18, true)
                +   renderField('开户银行', 'bank', draft.bank, 50, false)
                +   renderField('开户账号', 'account', draft.account, 19, false)
                +   renderField('企业注册地址', 'address', draft.address, 100, false)
                +   renderField('企业注册电话', 'phone', draft.phone, 12, false)
                + '</div>';
            var footer = '<button class="invoice-secondary-button" type="button" data-invoice-close-drawer>' + icon('close') + '<span>取消</span></button>'
                + '<button class="invoice-primary-button" type="button" data-invoice-submit-header>' + icon('check') + '<span>提交</span></button>';
            return renderDrawerShell(state.drawer.mode === 'edit' ? '修改发票抬头' : '添加发票抬头', body, footer, false, '');
        }

        function renderHeaderOptions(selected) {
            return '<option value="">请选择</option>' + getCategoryHeaders().map(function (header) {
                return '<option value="' + escapeHtml(header.id) + '"' + (header.id === selected ? ' selected' : '') + '>' + escapeHtml(header.name) + '</option>';
            }).join('');
        }

        function renderApplyDrawer() {
            var draft = state.drawer.draft;
            var special = draft.invoiceType === '增值税专用发票';
            var body = ''
                + '<div class="invoice-form invoice-apply-form">'
                +   '<div class="invoice-form-row invoice-radio-row"><span>' + requiredMark(true) + '发票类型</span><div class="invoice-radio-group">'
                +       '<label><input type="radio" name="invoiceType" value="增值税普通发票"' + (!special ? ' checked' : '') + ' data-invoice-type><i></i><span>增值税普通发票</span></label>'
                +       '<label><input type="radio" name="invoiceType" value="增值税专用发票"' + (special ? ' checked' : '') + ' data-invoice-type><i></i><span>增值税专用发票</span></label>'
                +   '</div></div>'
                +   '<label class="invoice-form-row"><span>' + requiredMark(true) + '发票抬头</span><span class="invoice-select-wrap' + invalidClass('headerId') + '"><select data-invoice-header-select>' + renderHeaderOptions(draft.headerId) + '</select></span></label>'
                +   renderField('开户银行', 'bank', draft.bank, 50, special)
                +   renderField('开户账号', 'account', draft.account, 19, special)
                +   renderField('企业注册地址', 'address', draft.address, 100, special)
                +   renderField('企业注册电话', 'phone', draft.phone, 12, special)
                +   '<div class="invoice-form-row invoice-amount-row"><span>开票金额</span><strong>' + escapeHtml(formatAmount(draft.amount)) + '元</strong></div>'
                + '</div>';
            var footer = '<button class="invoice-secondary-button" type="button" data-invoice-close-drawer>' + icon('close') + '<span>取消</span></button>'
                + '<button class="invoice-primary-button" type="button" data-invoice-submit-apply>' + icon('check') + '<span>提交</span></button>';
            return renderDrawerShell('申请开票', body, footer, false, '');
        }

        function renderInvoiceInfo(record) {
            var rows = [
                ['发票类型', record.invoiceType],
                ['发票抬头', record.invoiceHeader],
                ['纳税人识别号', record.taxId],
                ['开户银行', record.bank],
                ['开户账号', record.account],
                ['企业注册地址', record.address],
                ['企业注册电话', record.phone],
                ['发票金额', formatAmount(record.invoiceAmount) + '元']
            ];
            return rows.map(function (row) {
                return '<div class="invoice-detail-row"><span>' + escapeHtml(row[0]) + '：</span><strong title="' + escapeHtml(row[1]) + '">' + escapeHtml(row[1] || '--') + '</strong></div>';
            }).join('');
        }

        function renderUploadDrawer() {
            var record = getRecordById(state.drawer.recordId);
            var draft = state.drawer.draft;
            var uploadContent = draft.dataUrl
                ? '<img src="' + escapeHtml(draft.dataUrl) + '" alt="待上传发票"><span>' + escapeHtml(draft.fileName) + '</span>'
                : icon('add') + '<span>上传图片</span>';
            var body = ''
                + '<div class="invoice-upload-summary">' + renderInvoiceInfo(record) + '</div>'
                + '<div class="invoice-upload-row">'
                +   '<span>' + requiredMark(true) + '上传发票</span>'
                +   '<div><label class="invoice-upload-box' + invalidClass('file') + '">' + uploadContent + '<input type="file" accept="image/jpeg,image/png" data-invoice-file></label>'
                +   '<small>单张图片，支持jpg/png/jpeg等格式，单个文件不超过5M</small></div>'
                + '</div>';
            var footer = '<button class="invoice-secondary-button" type="button" data-invoice-close-drawer>' + icon('close') + '<span>取消</span></button>'
                + '<button class="invoice-primary-button" type="button" data-invoice-submit-upload>' + icon('check') + '<span>提交</span></button>';
            return renderDrawerShell('上传发票', body, footer, false, '');
        }

        function renderPreviewDrawer() {
            var record = getRecordById(state.drawer.recordId);
            var source = record.invoiceImage || INVOICE_IMAGE;
            var body = '<div class="invoice-preview"><img src="' + escapeHtml(source) + '" alt="发票预览"></div>';
            var topAction = '<a class="invoice-primary-button invoice-download" href="' + escapeHtml(source) + '" download="电子发票.png">' + icon('download') + '<span>下载</span></a>';
            return renderDrawerShell('预览发票', body, '', true, topAction);
        }

        function renderDetailDrawer() {
            var record = getRecordById(state.drawer.recordId);
            var body = ''
                + '<section class="invoice-detail-section"><h3>发票信息</h3><div class="invoice-detail-list">' + renderInvoiceInfo(record) + '</div></section>'
                + '<section class="invoice-detail-section"><h3>开票日志</h3>'
                +   '<div class="invoice-log-table"><div class="invoice-log-head"><span>开票申请时间</span><span>处理时间</span><span>开票状态</span><span>处理意见</span></div>'
                +   '<div class="invoice-log-row"><span>' + escapeHtml(record.appliedAt || '--') + '</span><span>' + escapeHtml(record.processedAt || '--') + '</span><span><b class="invoice-status' + statusClass(record) + '"><i></i>' + escapeHtml(statusText(record, false)) + '</b></span><span>' + escapeHtml(record.opinion || '--') + '</span></div></div>'
                + '</section>';
            return renderDrawerShell('开票详情', body, '', true, '');
        }

        function renderDrawer() {
            if (!state.drawer) return '';
            if (state.drawer.type === 'header') return renderHeaderDrawer();
            if (state.drawer.type === 'apply') return renderApplyDrawer();
            if (state.drawer.type === 'upload') return renderUploadDrawer();
            if (state.drawer.type === 'preview') return renderPreviewDrawer();
            if (state.drawer.type === 'detail') return renderDetailDrawer();
            return '';
        }

        function render() {
            panel.innerHTML = (config.view === 'info' ? renderInfoPage() : renderApplicationPage()) + renderDrawer();
            document.body.classList.toggle('invoice-drawer-open', Boolean(state.drawer));
            bindEvents();
        }

        function openDrawer(drawer, trigger) {
            drawerReturnFocus = trigger || document.activeElement;
            state.drawer = drawer;
            render();
            var closeButton = panel.querySelector('.invoice-drawer-close');
            if (closeButton) closeButton.focus();
        }

        function closeDrawer() {
            state.drawer = null;
            render();
            if (drawerReturnFocus && document.body.contains(drawerReturnFocus)) drawerReturnFocus.focus();
            drawerReturnFocus = null;
        }

        function openHeaderDrawer(mode, header, trigger) {
            openDrawer({
                type: 'header',
                mode: mode,
                headerId: header ? header.id : '',
                invalid: [],
                draft: clone(header || { name: '', taxId: '', bank: '', account: '', address: '', phone: '' })
            }, trigger);
        }

        function openApplyDrawer(record, trigger) {
            openDrawer({
                type: 'apply',
                recordId: record.id,
                invalid: [],
                draft: {
                    invoiceType: '增值税普通发票',
                    headerId: '',
                    bank: '',
                    account: '',
                    address: '',
                    phone: '',
                    amount: record.invoiceAmount
                }
            }, trigger);
        }

        function submitHeader() {
            var drawer = state.drawer;
            drawer.invalid = [];
            if (!drawer.draft.name.trim()) drawer.invalid.push('name');
            if (!drawer.draft.taxId.trim()) drawer.invalid.push('taxId');
            if (drawer.invalid.length) {
                render();
                return;
            }
            if (drawer.mode === 'edit') {
                var existing = getCategoryHeaders().find(function (header) { return header.id === drawer.headerId; });
                if (existing) Object.assign(existing, drawer.draft);
            } else {
                drawer.draft.id = config.category + '-header-' + Date.now();
                getCategoryHeaders().push(clone(drawer.draft));
            }
            closeDrawer();
        }

        function submitApply() {
            var drawer = state.drawer;
            var draft = drawer.draft;
            var special = draft.invoiceType === '增值税专用发票';
            drawer.invalid = [];
            if (!draft.headerId) drawer.invalid.push('headerId');
            ['bank', 'account', 'address', 'phone'].forEach(function (field) {
                if (special && !String(draft[field] || '').trim()) drawer.invalid.push(field);
            });
            if (drawer.invalid.length) {
                render();
                return;
            }
            var record = getRecordById(drawer.recordId);
            var header = getCategoryHeaders().find(function (item) { return item.id === draft.headerId; });
            if (!record || !header) return;
            record.stage = 'applied';
            record.invoiceType = draft.invoiceType;
            record.invoiceHeader = header.name;
            record.taxId = header.taxId;
            record.bank = draft.bank;
            record.account = draft.account;
            record.address = draft.address;
            record.phone = draft.phone;
            record.appliedAt = formatCurrentTime();
            record.processedAt = '';
            record.opinion = '';
            state.tab = 'records';
            state.status = 'all';
            state.page = 1;
            closeDrawer();
        }

        function submitUpload() {
            var drawer = state.drawer;
            if (!drawer.draft.dataUrl) {
                drawer.invalid = ['file'];
                render();
                return;
            }
            var record = getRecordById(drawer.recordId);
            if (!record) return;
            record.stage = 'issued';
            record.invoiceImage = drawer.draft.dataUrl;
            record.processedAt = formatCurrentTime();
            record.opinion = '--';
            state.tab = 'records';
            state.status = 'all';
            closeDrawer();
        }

        function formatCurrentTime() {
            var date = new Date();
            function two(value) { return String(value).padStart(2, '0'); }
            return date.getFullYear() + '-' + two(date.getMonth() + 1) + '-' + two(date.getDate()) + ' '
                + two(date.getHours()) + ':' + two(date.getMinutes()) + ':' + two(date.getSeconds());
        }

        function bindPagination() {
            panel.querySelectorAll('[data-invoice-page]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var action = this.dataset.invoicePage;
                    var total = config.view === 'info' ? getCategoryHeaders().length : getFilteredRecords().length;
                    var pages = totalPages(total);
                    if (action === 'prev') state.page = Math.max(1, state.page - 1);
                    else if (action === 'next') state.page = Math.min(pages, state.page + 1);
                    else state.page = Math.max(1, Math.min(pages, parseInt(action, 10) || 1));
                    render();
                });
            });
            var pageSize = panel.querySelector('[data-invoice-page-size]');
            if (pageSize) pageSize.addEventListener('change', function () {
                state.pageSize = parseInt(this.value, 10) || 10;
                state.page = 1;
                render();
            });
            var jump = panel.querySelector('[data-invoice-page-jump]');
            if (jump) jump.addEventListener('keydown', function (event) {
                if (event.key !== 'Enter') return;
                var total = config.view === 'info' ? getCategoryHeaders().length : getFilteredRecords().length;
                state.page = Math.max(1, Math.min(totalPages(total), parseInt(this.value, 10) || 1));
                render();
            });
        }

        function bindDrawerFields() {
            if (!state.drawer) return;
            panel.querySelectorAll('[data-invoice-drawer-field]').forEach(function (input) {
                input.addEventListener('input', function () {
                    state.drawer.draft[this.dataset.invoiceDrawerField] = this.value;
                    state.drawer.invalid = state.drawer.invalid.filter(function (field) { return field !== input.dataset.invoiceDrawerField; });
                    var counter = this.parentElement.querySelector('small');
                    if (counter) counter.textContent = this.value.length + '/' + this.maxLength;
                });
            });
            panel.querySelectorAll('[data-invoice-type]').forEach(function (radio) {
                radio.addEventListener('change', function () {
                    state.drawer.draft.invoiceType = this.value;
                    state.drawer.invalid = [];
                    render();
                });
            });
            var headerSelect = panel.querySelector('[data-invoice-header-select]');
            if (headerSelect) headerSelect.addEventListener('change', function () {
                var header = getCategoryHeaders().find(function (item) { return item.id === headerSelect.value; });
                state.drawer.draft.headerId = this.value;
                state.drawer.invalid = [];
                if (header) {
                    state.drawer.draft.bank = header.bank;
                    state.drawer.draft.account = header.account;
                    state.drawer.draft.address = header.address;
                    state.drawer.draft.phone = header.phone;
                } else {
                    state.drawer.draft.bank = '';
                    state.drawer.draft.account = '';
                    state.drawer.draft.address = '';
                    state.drawer.draft.phone = '';
                }
                render();
            });
            var fileInput = panel.querySelector('[data-invoice-file]');
            if (fileInput) fileInput.addEventListener('change', function () {
                var file = this.files && this.files[0];
                if (!file || !/^image\/(jpeg|png)$/.test(file.type) || file.size > 5 * 1024 * 1024) {
                    state.drawer.invalid = ['file'];
                    render();
                    return;
                }
                var reader = new FileReader();
                reader.onload = function () {
                    state.drawer.draft.dataUrl = reader.result;
                    state.drawer.draft.fileName = file.name;
                    state.drawer.invalid = [];
                    render();
                };
                reader.readAsDataURL(file);
            });
        }

        function bindEvents() {
            bindPagination();

            var addButton = panel.querySelector('[data-invoice-add-header]');
            if (addButton) addButton.addEventListener('click', function () { openHeaderDrawer('add', null, this); });

            panel.querySelectorAll('[data-invoice-header-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var id = this.dataset.headerId;
                    var header = getCategoryHeaders().find(function (item) { return item.id === id; });
                    if (this.dataset.invoiceHeaderAction === 'edit') {
                        openHeaderDrawer('edit', header, this);
                    } else {
                        var index = getCategoryHeaders().findIndex(function (item) { return item.id === id; });
                        if (index !== -1) getCategoryHeaders().splice(index, 1);
                        render();
                    }
                });
            });

            panel.querySelectorAll('[data-invoice-tab]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.tab = this.dataset.invoiceTab;
                    state.keyword = state.keywordDraft.trim();
                    state.status = 'all';
                    state.page = 1;
                    render();
                });
            });

            var keyword = panel.querySelector('[data-invoice-keyword]');
            if (keyword) {
                keyword.addEventListener('input', function () { state.keywordDraft = this.value; });
                keyword.addEventListener('keydown', function (event) {
                    if (event.key !== 'Enter') return;
                    state.keyword = state.keywordDraft.trim();
                    state.page = 1;
                    render();
                });
            }
            var query = panel.querySelector('[data-invoice-query]');
            if (query) query.addEventListener('click', function () {
                state.keyword = state.keywordDraft.trim();
                state.page = 1;
                render();
            });

            var business = panel.querySelector('[data-invoice-business]');
            if (business) business.addEventListener('change', function () {
                state.businessType = this.value;
                state.keyword = state.keywordDraft.trim();
                state.page = 1;
                render();
            });

            panel.querySelectorAll('[data-invoice-status]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.status = state.status === this.dataset.invoiceStatus ? 'all' : this.dataset.invoiceStatus;
                    state.keyword = state.keywordDraft.trim();
                    state.page = 1;
                    render();
                });
            });

            panel.querySelectorAll('[data-invoice-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var action = this.dataset.invoiceAction;
                    var record = getRecordById(this.dataset.recordId);
                    if (!record) return;
                    if (action === 'apply') openApplyDrawer(record, this);
                    if (action === 'upload') openDrawer({ type: 'upload', recordId: record.id, invalid: [], draft: { dataUrl: '', fileName: '' } }, this);
                    if (action === 'preview') openDrawer({ type: 'preview', recordId: record.id }, this);
                    if (action === 'detail') openDrawer({ type: 'detail', recordId: record.id }, this);
                    if (action === 'reject') {
                        record.stage = 'rejected';
                        record.processedAt = formatCurrentTime();
                        record.opinion = '--';
                        render();
                    }
                });
            });

            panel.querySelectorAll('[data-invoice-close-drawer]').forEach(function (element) {
                element.addEventListener('click', function (event) {
                    if (event.target.closest('[data-invoice-drawer]') && !event.target.closest('.invoice-drawer-close') && !event.target.closest('.invoice-drawer-footer')) return;
                    closeDrawer();
                });
            });
            var drawer = panel.querySelector('[data-invoice-drawer]');
            if (drawer) drawer.addEventListener('click', function (event) { event.stopPropagation(); });

            var submitHeaderButton = panel.querySelector('[data-invoice-submit-header]');
            if (submitHeaderButton) submitHeaderButton.addEventListener('click', submitHeader);
            var submitApplyButton = panel.querySelector('[data-invoice-submit-apply]');
            if (submitApplyButton) submitApplyButton.addEventListener('click', submitApply);
            var submitUploadButton = panel.querySelector('[data-invoice-submit-upload]');
            if (submitUploadButton) submitUploadButton.addEventListener('click', submitUpload);
            bindDrawerFields();
        }

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && state.drawer) closeDrawer();
        });

        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initInvoiceManagement);
    } else {
        initInvoiceManagement();
    }
})();
