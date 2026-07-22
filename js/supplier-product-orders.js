(function () {
    var STATUS_TABS = [
        '全部',
        '待审批',
        '待关联合同',
        '关联审批中',
        '关联合同签署中',
        '待支付',
        '解除审批中',
        '已解除关联',
        '待交付',
        '待确认交付',
        '交易完成'
    ];

    var ORDER_RECORDS = [
        {
            orderNo: '2026072016421807100000101149001',
            orderType: '常规订单',
            name: '龙岗企业经营画像数据集',
            productType: '数据集',
            user: '深圳市星途科技发展有限公司',
            price: '300元/次',
            quantity: '1次',
            delivery: '文件传输',
            amount: '¥300',
            appliedAt: '2026-07-20 16:42:18',
            status: '待审批'
        },
        {
            orderNo: '2026071915384202300000101149016',
            orderType: '常规订单',
            name: '园区企业能耗趋势分析报告',
            productType: '数据产品',
            user: '龙岗区绿色产业运营有限公司',
            price: '800元/份',
            quantity: '1份',
            delivery: '人工交付',
            amount: '¥800',
            appliedAt: '2026-07-19 15:38:42',
            status: '待关联合同'
        },
        {
            orderNo: '2026071811043608500000101149032',
            orderType: '常规订单',
            name: '商事主体活跃度监测数据产品',
            productType: '数据产品',
            user: '深圳市清澜企业服务有限公司',
            price: '120元/次',
            quantity: '2次',
            delivery: 'API传输',
            amount: '¥240',
            appliedAt: '2026-07-18 11:04:36',
            status: '关联审批中'
        },
        {
            orderNo: '2026071717251106400000101149048',
            orderType: '常规订单',
            name: '龙岗区交通运行拥堵指数服务',
            productType: '数据产品',
            user: '龙岗智慧交通科技有限公司',
            price: '50元/天',
            quantity: '30天',
            delivery: 'API传输',
            amount: '¥1500',
            appliedAt: '2026-07-17 17:25:11',
            status: '关联合同签署中'
        },
        {
            orderNo: '2026071613195704200000101149064',
            orderType: '常规订单',
            name: '企业信用风险监测数据集',
            productType: '数据集',
            user: '深圳市龙岗产业投资服务有限公司',
            price: '100元/次',
            quantity: '5次',
            delivery: '文件传输',
            amount: '¥500',
            appliedAt: '2026-07-16 13:19:57',
            status: '待支付'
        },
        {
            orderNo: '2026071510502409600000101149081',
            orderType: '常规订单',
            name: '产业园区空间信息数据集',
            productType: '数据集',
            user: '龙岗区园区运营管理有限公司',
            price: '200元/月',
            quantity: '3月',
            delivery: 'API传输',
            amount: '¥600',
            appliedAt: '2026-07-15 10:50:24',
            status: '解除审批中'
        },
        {
            orderNo: '2026071418360901800000101149097',
            orderType: '常规订单',
            name: '惠企政策智能匹配数据服务',
            productType: '数据产品',
            user: '深圳市龙岗企业服务集团有限公司',
            price: '60元/次',
            quantity: '10次',
            delivery: 'API传输',
            amount: '¥600',
            appliedAt: '2026-07-14 18:36:09',
            status: '已解除关联'
        },
        {
            orderNo: '2026071214075305700000101149113',
            orderType: '常规订单',
            name: '公共信用评价数据产品',
            productType: '数据产品',
            user: '深圳市数治咨询服务有限公司',
            price: '500元/份',
            quantity: '1份',
            delivery: '人工交付',
            amount: '¥500',
            appliedAt: '2026-07-12 14:07:53',
            status: '待交付'
        },
        {
            orderNo: '2026071016243803300000101149129',
            orderType: '常规订单',
            name: '重点项目运行监测数据产品',
            productType: '数据产品',
            user: '龙岗区重点项目服务中心',
            price: '300元/月',
            quantity: '2月',
            delivery: 'API传输',
            amount: '¥600',
            appliedAt: '2026-07-10 16:24:38',
            status: '待确认交付'
        },
        {
            orderNo: '2026070817135202700000101149145',
            orderType: '常规订单',
            name: '产业招商线索分析数据集',
            productType: '数据集',
            user: '深圳市龙岗招商服务有限公司',
            price: '1000元/份',
            quantity: '1份',
            delivery: '文件传输',
            amount: '¥1000',
            appliedAt: '2026-07-08 17:13:52',
            status: '交易完成'
        },
        {
            orderNo: '2026070715011305100000101149161',
            orderType: '常规订单',
            name: '园区企业经营趋势分析报告',
            productType: '数据产品',
            user: '龙岗数智产业研究院有限公司',
            price: '600元/份',
            quantity: '1份',
            delivery: '人工交付',
            amount: '¥600',
            appliedAt: '2026-07-07 15:01:13',
            status: '交易完成'
        },
        {
            orderNo: '2026070613374208200000101149177',
            orderType: '常规订单',
            name: '龙岗区企业纳税信用评级数据',
            productType: '数据集',
            user: '深圳市星途科技发展有限公司',
            price: '100元/次',
            quantity: '1次',
            delivery: '文件传输',
            amount: '¥100',
            appliedAt: '2026-07-06 13:37:42',
            status: '待确认交付'
        },
        {
            orderNo: '2026070511460904900000101149193',
            orderType: '常规订单',
            name: '产业链企业关联关系数据产品',
            productType: '数据产品',
            user: '龙岗区产业发展研究中心',
            price: '180元/次',
            quantity: '3次',
            delivery: 'API传输',
            amount: '¥540',
            appliedAt: '2026-07-05 11:46:09',
            status: '待交付'
        },
        {
            orderNo: '2026070419400401500000101149209',
            orderType: '常规订单',
            name: '企业诉求热点分析数据集',
            productType: '数据集',
            user: '深圳市政务服务数据中心',
            price: '80元/次',
            quantity: '2次',
            delivery: 'API传输',
            amount: '¥160',
            appliedAt: '2026-07-04 19:40:04',
            status: '待支付'
        },
        {
            orderNo: '2026070314261807300000101149225',
            orderType: '常规订单',
            name: '龙岗区从业人员结构分析数据',
            productType: '数据产品',
            user: '深圳市人力资源数据服务中心',
            price: '200元/份',
            quantity: '1份',
            delivery: '人工交付',
            amount: '¥200',
            appliedAt: '2026-07-03 14:26:18',
            status: '关联合同签署中'
        },
        {
            orderNo: '2026070211093702400000101149241',
            orderType: '常规订单',
            name: '龙岗区产业用房供需监测数据产品',
            productType: '数据产品',
            user: '龙岗区产业空间服务有限公司',
            price: '200元/天',
            quantity: '7天',
            delivery: 'API传输',
            amount: '¥1400',
            appliedAt: '2026-07-02 11:09:37',
            status: '关联审批中'
        },
        {
            orderNo: '2026070110184309100000101149257',
            orderType: '常规订单',
            name: '园区企业基础登记信息数据产品',
            productType: '数据集',
            user: '龙岗区企业服务集团有限公司',
            price: '100元/次',
            quantity: '1次',
            delivery: '文件传输',
            amount: '¥100',
            appliedAt: '2026-07-01 10:18:43',
            status: '待关联合同'
        },
        {
            orderNo: '2026063016372506600000101149273',
            orderType: '常规订单',
            name: '区域商业活力监测数据集',
            productType: '数据集',
            user: '深圳市龙岗商业发展有限公司',
            price: '150元/次',
            quantity: '2次',
            delivery: 'API传输',
            amount: '¥300',
            appliedAt: '2026-06-30 16:37:25',
            status: '待审批'
        },
        {
            orderNo: '2026062913550803800000101149289',
            orderType: '常规订单',
            name: '企业经营风险预警数据服务',
            productType: '数据产品',
            user: '深圳市企业征信服务有限公司',
            price: '90元/次',
            quantity: '5次',
            delivery: 'API传输',
            amount: '¥450',
            appliedAt: '2026-06-29 13:55:08',
            status: '解除审批中'
        },
        {
            orderNo: '2026062811064401200000101149305',
            orderType: '常规订单',
            name: '产业经济月度分析数据产品',
            productType: '数据产品',
            user: '龙岗数智产业研究院有限公司',
            price: '600元/月',
            quantity: '1月',
            delivery: '人工交付',
            amount: '¥600',
            appliedAt: '2026-06-28 11:06:44',
            status: '交易完成'
        },
        {
            orderNo: '2026062710091908400000101149321',
            orderType: '常规订单',
            name: '区域交通出行特征数据集',
            productType: '数据集',
            user: '深圳市龙岗智慧交通有限公司',
            price: '220元/次',
            quantity: '1次',
            delivery: '文件传输',
            amount: '¥220',
            appliedAt: '2026-06-27 10:09:19',
            status: '已解除关联'
        },
        {
            orderNo: '2026062615360705500000101149337',
            orderType: '常规订单',
            name: '重点企业运行监测数据产品',
            productType: '数据产品',
            user: '龙岗区产业运营服务有限公司',
            price: '500元/月',
            quantity: '2月',
            delivery: 'API传输',
            amount: '¥1000',
            appliedAt: '2026-06-26 15:36:07',
            status: '交易完成'
        }
    ];

    var ACTIONS_BY_STATUS = {
        '待审批': [
            ['审批', 'approve'],
            ['订单详情', 'detail']
        ],
        '待关联合同': [
            ['关联合同', 'contract'],
            ['订单详情', 'detail']
        ],
        '关联审批中': [
            ['撤回关联', 'withdraw'],
            ['订单详情', 'detail']
        ],
        '关联合同签署中': [
            ['签署合同', 'sign'],
            ['合同详情', 'contract'],
            ['订单详情', 'detail']
        ],
        '待支付': [
            ['解除关联合同', 'unlink'],
            ['订单详情', 'detail']
        ],
        '解除审批中': [
            ['撤回解除', 'withdraw'],
            ['订单详情', 'detail']
        ],
        '已解除关联': [
            ['关联合同', 'contract'],
            ['订单详情', 'detail']
        ],
        '待交付': [
            ['交付详情', 'delivery'],
            ['订单详情', 'detail']
        ],
        '待确认交付': [
            ['交付详情', 'delivery'],
            ['订单详情', 'detail']
        ],
        '交易完成': [
            ['交付详情', 'delivery'],
            ['订单详情', 'detail']
        ]
    };

    var ICON_PATHS = {
        search: '<path d="M9.5 3a6.5 6.5 0 0 1 5.16 10.45l4.45 4.44-1.42 1.42-4.44-4.45A6.5 6.5 0 1 1 9.5 3zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"/>',
        filter: '<path d="M3 5h18l-7 8v5l-4 2v-7L3 5zm4.4 2 4.6 5.25V17l1-.5v-4.25L17.6 7H7.4z"/>',
        reset: '<path d="M12 5V2L7 7l5 5V7a5 5 0 1 1-4.55 7.06l-1.82.83A7 7 0 1 0 12 5z"/>',
        approve: '<path d="M9 16.2 5.5 12.7 4.1 14.1 9 19 20.3 7.7l-1.4-1.4L9 16.2z"/>',
        contract: '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-5 4h8v2H8v-2zm0 4h8v2H8v-2z"/>',
        withdraw: '<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.42-1.41L7.83 13H20v-2z"/>',
        sign: '<path d="m4 17.25 9.85-9.85 2.75 2.75L6.75 20H4v-2.75zM18.7 8.05 15.95 5.3l1.15-1.15a1 1 0 0 1 1.4 0l1.35 1.35a1 1 0 0 1 0 1.4L18.7 8.05z"/>',
        unlink: '<path d="M17 7h-3V5h3a5 5 0 0 1 0 10h-3v-2h3a3 3 0 0 0 0-6zM7 7a3 3 0 0 0 0 6h3v2H7A5 5 0 0 1 7 5h3v2H7zm1 4h8v2H8v-2zM4.7 3.3l16 16-1.4 1.4-16-16 1.4-1.4z"/>',
        delivery: '<path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2a3 3 0 0 0 6 0h6a3 3 0 0 0 6 0h2v-5l-3-4zM6 18.5A1.5 1.5 0 1 1 6 15a1.5 1.5 0 0 1 0 3.5zM15 15H9a3 3 0 0 0-6 0V6h12v9zm3 3.5a1.5 1.5 0 1 1 0-3.5 1.5 1.5 0 0 1 0 3.5zm3-3.5a3 3 0 0 0-4-2.83V10h2l2 3v2z"/>',
        detail: '<path d="M12 5c5 0 8.4 4.2 9.5 7-1.1 2.8-4.5 7-9.5 7S3.6 14.8 2.5 12C3.6 9.2 7 5 12 5zm0 2c-3.6 0-6.2 2.7-7.3 5 1.1 2.3 3.7 5 7.3 5s6.2-2.7 7.3-5C18.2 9.7 15.6 7 12 7zm0 2.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6z"/>',
        success: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-2 15-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"/>'
    };

    function icon(name) {
        return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICON_PATHS[name] || ICON_PATHS.detail) + '</svg>';
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
        });
    }

    function initSupplierProductOrders() {
        var params = new URLSearchParams(window.location.search || '');
        if (params.get('menu') !== 'product-order') return;

        var panel = document.querySelector('[data-consult-panel]');
        var title = document.querySelector('[data-center-title]');
        if (!panel) return;

        var state = {
            tab: '全部',
            keyword: '',
            orderType: '全部订单类型',
            productType: '全部产品类型',
            page: 1,
            pageSize: 10,
            filterOpen: false
        };
        var toastTimer = null;

        panel.classList.remove('is-placeholder', 'is-service-management', 'is-order-management');
        panel.classList.add('is-supplier-order-management');
        if (title) title.textContent = '订单管理';
        document.title = '订单管理 - 供方中心';

        function getFilteredRecords() {
            var keyword = state.keyword.toLowerCase();
            return ORDER_RECORDS.filter(function (item) {
                if (state.tab !== '全部' && item.status !== state.tab) return false;
                if (state.orderType !== '全部订单类型' && item.orderType !== state.orderType) return false;
                if (state.productType !== '全部产品类型' && item.productType !== state.productType) return false;
                if (!keyword) return true;
                var searchable = [item.orderNo, item.name, item.user].join(' ').toLowerCase();
                return searchable.indexOf(keyword) !== -1;
            });
        }

        function renderTabs() {
            return STATUS_TABS.map(function (tab) {
                var active = tab === state.tab;
                return '<button class="supplier-order-tab' + (active ? ' active' : '') + '" type="button" role="tab" aria-selected="' + active + '" data-supplier-order-tab="' + escapeHtml(tab) + '">' + escapeHtml(tab) + '</button>';
            }).join('');
        }

        function renderFilterPanel() {
            return ''
                + '<div class="supplier-order-filter-panel' + (state.filterOpen ? ' show' : '') + '" data-supplier-order-filter-panel>'
                +   '<select data-supplier-order-type aria-label="订单类型">'
                +       '<option>全部订单类型</option>'
                +       '<option' + (state.orderType === '常规订单' ? ' selected' : '') + '>常规订单</option>'
                +   '</select>'
                +   '<select data-supplier-order-product-type aria-label="产品类型">'
                +       '<option>全部产品类型</option>'
                +       '<option' + (state.productType === '数据集' ? ' selected' : '') + '>数据集</option>'
                +       '<option' + (state.productType === '数据产品' ? ' selected' : '') + '>数据产品</option>'
                +   '</select>'
                +   '<button class="supplier-order-filter-reset" type="button" data-supplier-order-reset>' + icon('reset') + '<span>重置</span></button>'
                + '</div>';
        }

        function renderActions(item) {
            var actions = ACTIONS_BY_STATUS[item.status] || [['订单详情', 'detail']];
            return actions.map(function (action) {
                return '<button class="supplier-order-action" type="button" data-supplier-order-action="' + escapeHtml(action[0]) + '" data-supplier-order-no="' + escapeHtml(item.orderNo) + '">' + icon(action[1]) + '<span>' + escapeHtml(action[0]) + '</span></button>';
            }).join('');
        }

        function renderRows(records) {
            if (!records.length) {
                return '<tr><td class="supplier-order-empty" colspan="12">暂无符合条件的产品订单</td></tr>';
            }

            return records.map(function (item) {
                var muted = item.status === '已解除关联' ? ' is-muted' : '';
                return ''
                    + '<tr>'
                    +   '<td title="' + escapeHtml(item.orderNo) + '">' + escapeHtml(item.orderNo) + '</td>'
                    +   '<td>' + escapeHtml(item.orderType) + '</td>'
                    +   '<td class="supplier-order-ellipsis" title="' + escapeHtml(item.name) + '">' + escapeHtml(item.name) + '</td>'
                    +   '<td>' + escapeHtml(item.productType) + '</td>'
                    +   '<td class="supplier-order-ellipsis" title="' + escapeHtml(item.user) + '">' + escapeHtml(item.user) + '</td>'
                    +   '<td>' + escapeHtml(item.price) + '</td>'
                    +   '<td>' + escapeHtml(item.quantity) + '</td>'
                    +   '<td>' + escapeHtml(item.delivery) + '</td>'
                    +   '<td>' + escapeHtml(item.amount) + '</td>'
                    +   '<td>' + escapeHtml(item.appliedAt) + '</td>'
                    +   '<td class="order-status-cell"><span class="supplier-order-status' + muted + '">' + escapeHtml(item.status) + '</span></td>'
                    +   '<td class="order-action-cell"><div class="supplier-order-actions">' + renderActions(item) + '</div></td>'
                    + '</tr>';
            }).join('');
        }

        function renderPagination(total, totalPages) {
            var pageButtons = [];
            for (var page = 1; page <= totalPages; page += 1) {
                pageButtons.push('<button class="supplier-order-page-btn' + (page === state.page ? ' active' : '') + '" type="button" data-supplier-order-page="' + page + '">' + page + '</button>');
            }

            return ''
                + '<div class="supplier-order-pagination">'
                +   '<span>共 ' + total + ' 条</span>'
                +   '<button class="supplier-order-page-btn" type="button" aria-label="上一页" data-supplier-order-page="prev"' + (state.page <= 1 ? ' disabled' : '') + '>‹</button>'
                +   pageButtons.join('')
                +   '<button class="supplier-order-page-btn" type="button" aria-label="下一页" data-supplier-order-page="next"' + (state.page >= totalPages ? ' disabled' : '') + '>›</button>'
                +   '<select class="supplier-order-page-size" data-supplier-order-page-size aria-label="每页条数">'
                +       '<option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10 条/页</option>'
                +       '<option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20 条/页</option>'
                +   '</select>'
                +   '<span>前往</span>'
                +   '<input class="supplier-order-page-jump" type="number" min="1" max="' + totalPages + '" aria-label="前往页码" data-supplier-order-page-jump>'
                + '</div>';
        }

        function renderTable() {
            var filtered = getFilteredRecords();
            var totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
            if (state.page > totalPages) state.page = totalPages;
            var start = (state.page - 1) * state.pageSize;
            var pageRecords = filtered.slice(start, start + state.pageSize);

            return ''
                + '<div class="supplier-order-table-card">'
                +   '<div class="supplier-order-table-scroll" aria-label="产品订单列表，可横向滚动">'
                +       '<table class="supplier-order-table">'
                +           '<colgroup>'
                +               '<col class="col-order-no"><col class="col-order-type"><col class="col-name"><col class="col-product-type">'
                +               '<col class="col-user"><col class="col-price"><col class="col-quantity"><col class="col-delivery">'
                +               '<col class="col-amount"><col class="col-applied-at"><col class="col-status"><col class="col-actions">'
                +           '</colgroup>'
                +           '<thead><tr>'
                +               '<th>订单编号</th><th>订单类型</th><th>名称</th><th>产品类型</th><th>使用方</th><th>价格</th>'
                +               '<th>数量</th><th>交付方式</th><th>实支付/应支付</th><th>申请时间</th>'
                +               '<th class="order-status-cell">交易状态</th><th class="order-action-cell">操作</th>'
                +           '</tr></thead>'
                +           '<tbody>' + renderRows(pageRecords) + '</tbody>'
                +       '</table>'
                +   '</div>'
                +   renderPagination(filtered.length, totalPages)
                + '</div>';
        }

        function render() {
            panel.innerHTML = ''
                + '<div class="supplier-order-board">'
                +   '<div class="supplier-order-tabs" role="tablist" aria-label="订单状态">' + renderTabs() + '</div>'
                +   '<div class="supplier-order-toolbar">'
                +       '<label class="supplier-order-search">'
                +           '<input type="search" placeholder="请输入订单编号/名称" value="' + escapeHtml(state.keyword) + '" data-supplier-order-keyword aria-label="搜索订单">'
                +           icon('search')
                +       '</label>'
                +       '<button class="supplier-order-filter-toggle' + (state.filterOpen ? ' active' : '') + '" type="button" aria-expanded="' + state.filterOpen + '" data-supplier-order-filter-toggle>' + icon('filter') + '<span>筛选</span></button>'
                +   '</div>'
                +   renderFilterPanel()
                +   renderTable()
                + '</div>'
                + '<div class="supplier-order-toast" role="status" aria-live="polite" data-supplier-order-toast>' + icon('success') + '<span></span></div>';
            bindEvents();
        }

        function showToast(message) {
            var toast = panel.querySelector('[data-supplier-order-toast]');
            if (!toast) return;
            toast.querySelector('span').textContent = message;
            toast.classList.add('show');
            window.clearTimeout(toastTimer);
            toastTimer = window.setTimeout(function () {
                toast.classList.remove('show');
            }, 2200);
        }

        function changePage(value) {
            var filtered = getFilteredRecords();
            var totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
            var nextPage = Math.min(totalPages, Math.max(1, parseInt(value, 10) || 1));
            state.page = nextPage;
            render();
        }

        function bindEvents() {
            panel.querySelectorAll('[data-supplier-order-tab]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.tab = this.dataset.supplierOrderTab;
                    state.page = 1;
                    render();
                });
            });

            var keywordInput = panel.querySelector('[data-supplier-order-keyword]');
            if (keywordInput) {
                keywordInput.addEventListener('keydown', function (event) {
                    if (event.key !== 'Enter') return;
                    state.keyword = this.value.trim();
                    state.page = 1;
                    render();
                });
                keywordInput.addEventListener('change', function () {
                    state.keyword = this.value.trim();
                    state.page = 1;
                    render();
                });
            }

            var filterToggle = panel.querySelector('[data-supplier-order-filter-toggle]');
            if (filterToggle) {
                filterToggle.addEventListener('click', function () {
                    state.filterOpen = !state.filterOpen;
                    render();
                });
            }

            var orderType = panel.querySelector('[data-supplier-order-type]');
            if (orderType) {
                orderType.value = state.orderType;
                orderType.addEventListener('change', function () {
                    state.orderType = this.value;
                    state.page = 1;
                    render();
                });
            }

            var productType = panel.querySelector('[data-supplier-order-product-type]');
            if (productType) {
                productType.value = state.productType;
                productType.addEventListener('change', function () {
                    state.productType = this.value;
                    state.page = 1;
                    render();
                });
            }

            var resetButton = panel.querySelector('[data-supplier-order-reset]');
            if (resetButton) {
                resetButton.addEventListener('click', function () {
                    state.orderType = '全部订单类型';
                    state.productType = '全部产品类型';
                    state.page = 1;
                    render();
                });
            }

            panel.querySelectorAll('[data-supplier-order-page]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.disabled) return;
                    var action = this.dataset.supplierOrderPage;
                    if (action === 'prev') changePage(state.page - 1);
                    else if (action === 'next') changePage(state.page + 1);
                    else changePage(action);
                });
            });

            var pageSize = panel.querySelector('[data-supplier-order-page-size]');
            if (pageSize) {
                pageSize.addEventListener('change', function () {
                    state.pageSize = parseInt(this.value, 10) || 10;
                    state.page = 1;
                    render();
                });
            }

            var pageJump = panel.querySelector('[data-supplier-order-page-jump]');
            if (pageJump) {
                pageJump.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') changePage(this.value);
                });
                pageJump.addEventListener('change', function () {
                    if (this.value) changePage(this.value);
                });
            }

            panel.querySelectorAll('[data-supplier-order-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var action = this.dataset.supplierOrderAction;
                    if (action === '关联合同' && window.SupplierContractDrawer) {
                        var orderNo = this.dataset.supplierOrderNo;
                        var record = ORDER_RECORDS.find(function (item) { return item.orderNo === orderNo; });
                        window.SupplierContractDrawer.open({
                            orderNo: orderNo,
                            demander: record ? record.user : '',
                            itemName: record ? record.name : '',
                            amount: record ? record.amount : '',
                            serviceFeeRate: 3,
                            appliedAt: record ? record.appliedAt : '',
                            businessType: 'product',
                            onConfirm: function () {
                                showToast('关联合同已提交，等待关联审批。');
                            }
                        });
                        return;
                    }
                    if (action === '签署合同' || action === '合同详情') {
                        window.location.href = 'supplier-center.html?menu=product-contract&contractAction=' + (action === '签署合同' ? 'sign' : 'detail') + '&orderNo=' + encodeURIComponent(this.dataset.supplierOrderNo || '');
                        return;
                    }
                    showToast(action + '功能将在后续设计，本页仅展示操作入口。');
                });
            });
        }

        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSupplierProductOrders);
    } else {
        initSupplierProductOrders();
    }
})();
