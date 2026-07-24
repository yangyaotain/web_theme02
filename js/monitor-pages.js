(function () {
    var ICONS = {
        search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>',
        reset: '<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v6h6"/></svg>',
        export: '<svg viewBox="0 0 24 24"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>',
        view: '<svg viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>',
        calendar: '<svg viewBox="0 0 24 24"><path d="M7 2v4"/><path d="M17 2v4"/><path d="M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/></svg>',
        filter: '<svg viewBox="0 0 24 24"><path d="M3 5h18l-7 8v5l-4 2v-7L3 5z"/></svg>',
        close: '<svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>',
        grid: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/></svg>',
        checkCircle: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>',
        layers: '<svg viewBox="0 0 24 24"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 16l9 5 9-5"/></svg>',
        connector: '<svg viewBox="0 0 24 24"><circle cx="7" cy="7" r="3"/><circle cx="17" cy="17" r="3"/><path d="M9.2 9.2l5.6 5.6"/><path d="M14 7h3v3"/><path d="M10 17H7v-3"/></svg>'
    };

    var REGISTER_STATUS_OPTIONS = ['全部', '待登记', '登记审核中', '已登记', '已退回', '变更审核中', '注销审核中', '已注销', '登记公示中', '异议复核中', '区域节点审批', '注销区域审批中', '变更区域审批中'];
    var INDUSTRY_OPTIONS = ['全部', '农、林、牧、渔业', '采矿业', '制造业', '电力、热力、燃气及水生产和供应业', '建筑业', '批发和零售业', '交通运输、仓储和邮政业', '住宿和餐饮业', '信息传输、软件和信息技术服务业', '金融业', '房地产业', '租赁和商务服务业', '科学研究和技术服务业', '水利、环境和公共设施管理业', '居民服务、修理和其他服务业', '教育', '卫生和社会工作', '文化、体育和娱乐业', '公共管理、社会保障和社会组织', '国际组织'];
    var DATA_SOURCE_OPTIONS = ['全部', '原始取得', '收集取得', '交易取得', '其他'];
    var PLATFORM_OPERATOR_NAME = '深圳市龙岗区数据要素交易服务有限公司';
    var PLATFORM_OPERATOR_MERCHANT_ID = 'MER-PLATFORM-202607-0001';

    function getPlatformBillRows() {
        var billData = window.TransactionBillDemoData;
        if (!billData) return [];
        return billData.getPlatformBills().map(function (item) {
            item.repayAt = item.repaymentAt || '--';
            item.actions = item.status === '已结清' && item.showUsage
                ? ['用量明细', '账单详情']
                : ['账单详情'];
            return item;
        });
    }

    var PLATFORM_BILL_ROWS = getPlatformBillRows();

    function getOperationType(row) {
        if (!row) return '第三方供方';
        if (row.providerMerchantId) return row.providerMerchantId === PLATFORM_OPERATOR_MERCHANT_ID ? '自营' : '第三方供方';
        return row.provider === PLATFORM_OPERATOR_NAME ? '自营' : '第三方供方';
    }

    var PAGES = {
        resourceCatalog: {
            title: '数据资源登记',
            module: '数据目录监测',
            activeTitle: '资源登记目录',
            layout: 'resourceCatalog',
            total: 80,
            selectable: true,
            actions: ['导出记录', '全部导出'],
            filters: [
                { type: 'search', placeholder: '请输入资源名称搜索' },
                { type: 'select', key: 'status', label: '登记状态', options: REGISTER_STATUS_OPTIONS },
                { type: 'select', key: 'industry', label: '资源所属行业分类', options: INDUSTRY_OPTIONS },
                { type: 'select', key: 'source', label: '数据来源', options: DATA_SOURCE_OPTIONS },
                { type: 'date', placeholder: '更新时间  开始日期      -      结束日期' }
            ],
            columns: [
                { key: 'name', label: '资源名称', primary: true },
                { key: 'code', label: '数据资源标识码' },
                { key: 'industry', label: '资源所属行业分类' },
                { key: 'holder', label: '资源持有方' },
                { key: 'source', label: '数据来源' },
                { key: 'updatedAt', label: '更新时间' },
                { key: 'status', label: '登记状态', status: true },
                { key: '__actions', label: '操作' }
            ],
            rows: [
                { name: '1234', code: '702026060511310750700000101382841ABCDZGZE71Y1', industry: '住宿和餐饮业', holder: '深圳市龙岗区政务数据运营有限公司', source: '原始取得', updatedAt: '2026-06-05 11:32:10', status: '已登记', actions: ['日志'] },
                { name: '罗湖区金融风险监测数据资源260605JZ4', code: '702026060510083425700000101382725ABCO0D7BDR9Y', industry: '农、林、牧、渔业', holder: '深圳市龙岗区数据要素交易服务有限公司', source: '原始取得', updatedAt: '2026-06-05 10:09:39', status: '已登记', actions: ['日志'] },
                { name: '1', code: '702026060419275433200000101382207ABCD5JGDOWBW', industry: '采矿业', holder: '深圳市龙岗区政务数据运营有限公司', source: '收集取得', updatedAt: '2026-06-04 19:31:38', status: '注销审核中', actions: ['日志'] },
                { name: '宝安区大气环境监测数据资源260604TY8', code: '702026060419070890800000101382117ABCN97KSR7KH', industry: '农、林、牧、渔业', holder: '深圳市龙岗区数据要素交易服务有限公司', source: '原始取得', updatedAt: '2026-06-04 19:08:13', status: '已登记', actions: ['日志'] },
                { name: '公示', code: '702026052910480655800000101382707ABC3XOU6GGAR', industry: '农、林、牧、渔业', holder: '深圳市龙岗远望软件技术有限公司', source: '原始取得', updatedAt: '2026-05-29 13:57:52', status: '已注销', actions: ['日志'] },
                { name: '坪山区新能源充电桩数据资源260528', code: '702026052811302919000000101382239ABC49TML79DK', industry: '农、林、牧、渔业', holder: '深圳市龙岗区数据要素交易服务有限公司', source: '原始取得', updatedAt: '2026-05-28 11:32:59', status: '已登记', actions: ['日志'] },
                { name: '龙岗区空气质量监测数据', code: '702026052810181731400000101382701ABCEAZNN8L8W', industry: '生态保护和环境治理业', holder: '深圳市龙岗区数据要素交易服务有限公司', source: '收集取得', updatedAt: '2026-05-28 10:19:12', status: '已登记', actions: ['日志'] },
                { name: '龙岗区企业纳税信用评级数据', code: '702026052809422426100000101382427ABCZXAFAGNFH', industry: '租赁和商务服务业', holder: '深圳市龙岗区数据要素交易服务有限公司', source: '原始取得', updatedAt: '2026-05-28 09:45:27', status: '已登记', actions: ['日志'] },
                { name: '福田区产业运行监测数据资源', code: '702026052710181731400000101382701ABCEAZNN8L7A', industry: '信息传输、软件和信息技术服务业', holder: '深圳市龙岗区数据要素交易服务有限公司', source: '收集取得', updatedAt: '2026-05-27 10:20:12', status: '登记审核中', actions: ['日志'] },
                { name: '龙岗区低空经济企业数据资源', code: '702026052609422426100000101382427ABCZXAFAGL0W', industry: '科学研究和技术服务业', holder: '深圳市龙岗区政务数据运营有限公司', source: '原始取得', updatedAt: '2026-05-26 09:43:21', status: '已退回', actions: ['日志'] }
            ]
        },
        productCatalog: {
            title: '数据产品登记',
            module: '数据目录监测',
            activeTitle: '产品登记目录',
            layout: 'resourceCatalog',
            total: 86,
            selectable: true,
            actions: ['导出记录', '全部导出'],
            filters: [
                { type: 'search', placeholder: '请输入数据产品名称搜索' },
                { type: 'select', key: 'status', label: '状态', options: REGISTER_STATUS_OPTIONS },
                { type: 'select', key: 'deliveryMode', label: '交付方式', options: ['全部', 'API传输', '文件传输'] },
                { type: 'date', placeholder: '更新时间  开始日期      -      结束日期' }
            ],
            columns: [
                { key: 'name', label: '数据产品名称', primary: true },
                { key: 'code', label: '数据产品标识码' },
                { key: 'deliveryMode', label: '交付方式' },
                { key: 'frequency', label: '更新频率' },
                { key: 'updatedAt', label: '更新时间' },
                { key: 'status', label: '状态', status: true },
                { key: '__actions', label: '操作' }
            ],
            rows: [
                { name: '医疗健康数据集', code: '602026060419332975300000101382332ABCG74B3WFNI', deliveryMode: 'API传输', frequency: '1次/天', updatedAt: '2026-06-04 19:36:06', status: '已登记', actions: ['日志'] },
                { name: '龙岗企业经营画像数据集晨星园区分析精选版', code: '602026060418470066100000101382892ABC5GKX3O3NM', deliveryMode: '文件传输', frequency: '1次/天', updatedAt: '2026-06-04 18:49:00', status: '已登记', actions: ['日志'] },
                { name: '龙岗区中小微企业扶持政策匹配数据集', code: '602026060414363993100000101382732ABCGMVINF7E*', deliveryMode: 'API传输', frequency: '1次/天', updatedAt: '2026-06-04 14:41:14', status: '已登记', actions: ['日志'] },
                { name: '龙岗企业经营画像数据集云岭营商研判共享版', code: '602026060310190511300000101382108ABCMH50QPD5B', deliveryMode: '文件传输', frequency: '1次/天', updatedAt: '2026-06-03 10:21:05', status: '已登记', actions: ['日志'] },
                { name: '龙岗企业经营画像数据集清源营商洞察标准版', code: '602026060310143486800000101382915ABCCQ6L10730', deliveryMode: '文件传输', frequency: '1次/天', updatedAt: '2026-06-03 10:16:35', status: '已登记', actions: ['日志'] },
                { name: '龙岗企业经营画像数据集清源园区研判优选版', code: '602026052918122567300000101382831ABCJNKA3IUAT', deliveryMode: '文件传输', frequency: '1次/天', updatedAt: '2026-05-29 18:15:42', status: '已登记', actions: ['日志'] },
                { name: '龙岗企业经营画像数据集锦城园区监测标准版', code: '602026052918062125000000101382118ABC6YFM2S9HJ', deliveryMode: '文件传输', frequency: '1次/天', updatedAt: '2026-05-29 18:09:12', status: '已登记', actions: ['日志'] },
                { name: '龙岗企业经营画像数据集晨星园区洞察专享版', code: '602026052917581423200000101382615ABCIBJPIAGNG', deliveryMode: '文件传输', frequency: '1次/天', updatedAt: '2026-05-29 17:59:54', status: '已登记', actions: ['日志'] },
                { name: '龙岗企业经营画像数据集云岭营商洞察专项版', code: '--', deliveryMode: '文件传输', frequency: '1次/天', updatedAt: '2026-05-29 17:55:16', status: '登记审核中', actions: ['日志'] },
                { name: '龙岗企业经营画像数据集青湖企服监测优选版', code: '--', deliveryMode: '文件传输', frequency: '1次/天', updatedAt: '2026-05-29 17:53:03', status: '登记审核中', actions: ['日志'] }
            ]
        },
        resourceListing: {
            title: '资源上架监测',
            module: '数据目录监测',
            activeTitle: '数据资源上架监测',
            layout: 'listingMonitor',
            total: 19,
            selectable: true,
            actions: ['导出记录', '全部导出'],
            tabKey: 'listingStatus',
            tabs: [{ label: '已上架', value: '已上架' }, { label: '已下架', value: '已下架' }],
            filters: [
                { type: 'search', placeholder: '请输入资源名称搜索' },
                { type: 'select', key: 'space', label: '所属空间', options: ['全部', '流通利用平台'] },
                { type: 'date', placeholder: '更新时间  开始日期      -      结束日期' }
            ],
            columns: [
                { key: 'name', label: '数据资源名称', primary: true },
                { key: 'code', label: '数据资源标识' },
                { key: 'format', label: '数据格式' },
                { key: 'provider', label: '提供方' },
                { key: 'space', label: '所属空间' },
                { key: 'applyAt', label: '申请时间' },
                { key: 'updatedAt', label: '更新时间' },
                { key: '__actions', label: '操作' }
            ],
            rows: [
                { listingStatus: '已上架', name: '罗湖区金融风险监测数据', code: '702026060510083425700000101382725ABCO0D7BDR9Y', format: 'wps', provider: '深圳市龙岗区数据要素交易服务有限公司', space: '流通利用平台', applyAt: '2026-06-05 10:30:24', updatedAt: '2026-06-05 10:31:41', actions: ['日志'] },
                { listingStatus: '已上架', name: '宝安区大气环境监测数据', code: '702026060419070890800000101382117ABCN97KSR7KH', format: 'wps', provider: '深圳市龙岗区数据要素交易服务有限公司', space: '流通利用平台', applyAt: '2026-06-04 19:09:15', updatedAt: '2026-06-04 19:10:24', actions: ['日志'] },
                { listingStatus: '已上架', name: '坪山区新能源充电桩数据', code: '702026052811302919000000101382239ABC49TML79DK', format: 'wps', provider: '深圳市龙岗区数据要素交易服务有限公司', space: '流通利用平台', applyAt: '2026-05-28 11:33:54', updatedAt: '2026-05-28 11:37:30', actions: ['日志'] },
                { listingStatus: '已上架', name: '龙岗区空气质量监测数据', code: '702026052810181731400000101382701ABCEAZNN8L8W', format: 'wps', provider: '深圳市龙岗区数据要素交易服务有限公司', space: '流通利用平台', applyAt: '2026-05-28 10:20:24', updatedAt: '2026-05-28 10:21:32', actions: ['日志'] },
                { listingStatus: '已上架', name: '龙岗区企业纳税信用评级', code: '702026052809422426100000101382427ABCZXAFAGNFH', format: 'wps', provider: '深圳市龙岗区数据要素交易服务有限公司', space: '流通利用平台', applyAt: '2026-05-28 09:46:56', updatedAt: '2026-05-28 09:48:05', actions: ['日志'] },
                { listingStatus: '已上架', name: 'E2E资源_177987888630', code: '702026052718490337500000101382160ABCKKF8HSANP', format: 'wps', provider: '深圳市龙岗区数据要素交易服务有限公司', space: '流通利用平台', applyAt: '2026-05-27 18:51:14', updatedAt: '2026-05-27 18:52:25', actions: ['日志'] },
                { listingStatus: '已上架', name: '南山区高新技术企业创新', code: '702026052619390876200000101382191ABCFLBVWNY2', format: 'wps', provider: '深圳市龙岗区政务数据运营有限公司', space: '流通利用平台', applyAt: '2026-05-26 19:46:23', updatedAt: '2026-05-26 19:48:40', actions: ['日志'] },
                { listingStatus: '已上架', name: 'E2E资源_177970302987', code: '702026052517575528200000101382193ABCX3KG72COF', format: 'wps', provider: '测试供方机构', space: '流通利用平台', applyAt: '2026-05-25 17:59:51', updatedAt: '2026-05-25 18:00:56', actions: ['日志'] },
                { listingStatus: '已上架', name: '龙岗区企业纳税信用数据', code: '702026052517372494300000101382654ABCDMFJ2P8BS', format: 'Dm', provider: '深圳市龙岗区政务数据运营有限公司', space: '流通利用平台', applyAt: '2026-05-25 17:39:14', updatedAt: '2026-05-25 17:39:21', actions: ['日志'] },
                { listingStatus: '已上架', name: '龙岗区企业经营信用数据', code: '702026052514015135400000101382603ABCK9PZ6VXQL', format: 'dbase', provider: '深圳市龙岗区政务数据运营有限公司', space: '流通利用平台', applyAt: '2026-05-25 14:18:05', updatedAt: '2026-05-25 14:18:54', actions: ['日志'] },
                { listingStatus: '已下架', name: 'E2E资源_177987888631', code: '702026052409480337500000101382160ABCKKF8HSANQ', format: 'wps', provider: '深圳市龙岗区数据要素交易服务有限公司', space: '流通利用平台', applyAt: '2026-05-24 18:51:14', updatedAt: '2026-05-24 18:52:25', actions: ['日志'] }
            ]
        },
        productListing: {
            title: '产品上架监测',
            module: '数据目录监测',
            activeTitle: '数据产品上架监测',
            layout: 'listingMonitor',
            total: 51,
            selectable: true,
            actions: ['导出记录', '全部导出'],
            tabKey: 'listingStatus',
            tabs: [{ label: '已上架', value: '已上架' }, { label: '已下架', value: '已下架' }],
            filters: [
                { type: 'search', placeholder: '请输入产品名称搜索' },
                { type: 'select', key: 'space', label: '所属空间', options: ['全部', '流通利用平台'] },
                { type: 'date', placeholder: '更新时间  开始日期      -      结束日期' }
            ],
            columns: [
                { key: 'name', label: '数据产品名称', primary: true },
                { key: 'code', label: '数据产品标识' },
                { key: 'type', label: '产品类型' },
                { key: 'provider', label: '提供方' },
                { key: 'operationType', label: '经营属性' },
                { key: 'space', label: '所属空间' },
                { key: 'applyAt', label: '申请时间' },
                { key: 'updatedAt', label: '更新时间' },
                { key: '__actions', label: '操作' }
            ],
            rows: [
                { listingStatus: '已上架', name: '医疗健康数据集', code: '602026060419332975300000101382332ABCG74B3WFNI', type: '数据集', provider: '深圳市龙岗区政务数据运营有限公司', space: '流通利用平台', applyAt: '2026-06-04 19:43:02', updatedAt: '2026-06-05 11:20:49', actions: ['日志'], logs: [{ registerVersion: 'V1', listingVersion: 'V2', applicant: '张威', applyAt: '2026-06-04 19:43:02', description: '更新登记', flowStatus: '更新已通过' }, { registerVersion: 'V1', listingVersion: 'V1', applicant: '张威', applyAt: '2026-06-04 19:40:39', description: '--', flowStatus: '上架已通过' }] },
                { listingStatus: '已上架', name: '龙岗企业经营画像数据集晨星园区分析精选版', code: '602026060418470066100000101382892ABC5GKX3O3NM', type: '数据集', provider: '深圳市龙岗区数据要素交易服务有限公司', space: '流通利用平台', applyAt: '2026-06-04 18:51:11', updatedAt: '2026-06-04 18:52:07', actions: ['日志'] },
                { listingStatus: '已上架', name: '龙岗区中小微企业扶持政策匹配数据集', code: '602026060414363993100000101382732ABCGMVINF7E*', type: '数据集', provider: '测试供方机构', space: '流通利用平台', applyAt: '2026-06-04 14:42:46', updatedAt: '2026-06-04 14:42:57', actions: ['日志'] },
                { listingStatus: '已上架', name: '龙岗企业经营画像数据集云岭营商研判共享版', code: '602026060310190511300000101382108ABCMH50QPD5B', type: '数据集', provider: '深圳市龙岗区数据要素交易服务有限公司', space: '流通利用平台', applyAt: '2026-06-03 10:23:16', updatedAt: '2026-06-03 10:24:14', actions: ['日志'] },
                { listingStatus: '已上架', name: '龙岗企业经营画像数据集清源园区研判优选版', code: '602026052918122567300000101382831ABCJNKA3IUAT', type: '数据集', provider: '深圳市龙岗区数据要素交易服务有限公司', space: '流通利用平台', applyAt: '2026-05-29 18:18:07', updatedAt: '2026-05-29 18:19:27', actions: ['日志'] },
                { listingStatus: '已上架', name: '龙岗企业经营画像数据集晨星园区洞察专享版', code: '602026052917581423200000101382615ABCIBJPIAGNG', type: '数据集', provider: '深圳市龙岗区数据要素交易服务有限公司', space: '流通利用平台', applyAt: '2026-05-29 18:01:34', updatedAt: '2026-05-29 18:02:30', actions: ['日志'] },
                { listingStatus: '已上架', name: '龙岗企业经营画像数据集锦城园区监测标准版', code: '602026052917402081700000101382777ABC63YF2NM4', type: '数据集', provider: '深圳市龙岗区数据要素交易服务有限公司', space: '流通利用平台', applyAt: '2026-05-29 17:43:01', updatedAt: '2026-05-29 17:43:58', actions: ['日志'] },
                { listingStatus: '已上架', name: '龙岗区产业园区运营分析', code: '602026052915235326600000101382889ABCSLP5FI817', type: '数据产品', provider: '深圳市龙岗区数据要素交易服务有限公司', space: '流通利用平台', applyAt: '2026-05-29 15:28:29', updatedAt: '2026-05-29 15:28:38', actions: ['日志'] },
                { listingStatus: '已上架', name: '企业经营登记基础信息资源产品', code: '602026052809480243400000101382513ABC5R0PNSD9U', type: '数据集', provider: '深圳市龙岗区政务数据运营有限公司', space: '流通利用平台', applyAt: '2026-05-28 09:50:57', updatedAt: '2026-05-28 09:51:25', actions: ['日志'] },
                { listingStatus: '已上架', name: '龙岗企业经营画像数据集低空经济版', code: '602026052716520524200000101382118ABC6YFM2S8QA', type: '数据集', provider: '深圳市龙岗区数据要素交易服务有限公司', space: '流通利用平台', applyAt: '2026-05-27 16:54:52', updatedAt: '2026-05-27 16:55:51', actions: ['日志'] },
                { listingStatus: '已下架', name: '龙岗区产业园区运营分析历史版', code: '602026052615235326600000101382889ABCSLP5FI818', type: '数据产品', provider: '深圳市龙岗区数据要素交易服务有限公司', space: '流通利用平台', applyAt: '2026-05-26 15:28:29', updatedAt: '2026-05-26 15:28:38', actions: ['日志'] }
            ]
        },
        serviceListing: {
            title: '服务上架监测',
            module: '数据目录监测',
            activeTitle: '数据服务上架监测',
            total: 28,
            selectable: true,
            actions: ['导出记录', '全部导出'],
            tabKey: 'listingStatus',
            tabs: [{ label: '已上架', value: '已上架' }, { label: '已下架', value: '已下架' }],
            filters: [
                { type: 'search', placeholder: '请输入服务名称搜索' },
                { type: 'select', key: 'space', label: '所属空间', options: ['全部', '流通利用平台'] },
                { type: 'date', placeholder: '更新时间：开始时间 - 结束时间' }
            ],
            columns: [
                { key: 'name', label: '数据服务名称', primary: true },
                { key: 'code', label: '数据服务标识' },
                { key: 'type', label: '服务类型' },
                { key: 'provider', label: '提供方' },
                { key: 'operationType', label: '经营属性' },
                { key: 'space', label: '所属空间' },
                { key: 'applyAt', label: '申请时间' },
                { key: 'updatedAt', label: '更新时间' },
                { key: '__actions', label: '操作' }
            ],
            rows: [
                { listingStatus: '已上架', name: '企业数据治理与合规咨询服务', code: 'SVC202605181435210001', type: '数据咨询服务', provider: '深圳市龙岗区数据要素交易服务有限公司', space: '流通利用平台', applyAt: '2026-05-18 14:35:21', updatedAt: '2026-05-18 15:02:12', actions: ['日志'] },
                { listingStatus: '已上架', name: '企业数据资产入表咨询服务', code: 'SVC202605181424250002', type: '数据咨询服务', provider: '深圳市龙岗区数据要素交易服务有限公司', space: '流通利用平台', applyAt: '2026-05-18 14:24:25', updatedAt: '2026-05-18 14:58:40', actions: ['日志'] },
                { listingStatus: '已上架', name: '数据质量评估与优化咨询服务', code: 'SVC202605181111490006', type: '数据咨询服务', provider: '测试供方机构', space: '流通利用平台', applyAt: '2026-05-18 11:11:49', updatedAt: '2026-05-18 11:36:08', actions: ['日志'] },
                { listingStatus: '已下架', name: '企业数据资源托管运营服务', code: 'SVC202605181418490003', type: '数据运营服务', provider: '深圳市龙岗区政务数据运营有限公司', space: '流通利用平台', applyAt: '2026-05-18 14:18:49', updatedAt: '2026-05-19 09:18:26', actions: ['日志'] }
            ]
        },
        dataAuth: {
            title: '数据授权监测',
            module: '订单合同监测',
            activeTitle: '数据授权监测',
            layout: 'authMonitor',
            statusMode: 'dot',
            total: 61,
            filters: [
                { type: 'search', placeholder: '请输入订单编号/目录名称' },
                { type: 'select', key: 'space', label: '所属空间', emptyLabel: '所属空间  请选择空间', options: ['全部', '流通利用平台'] },
                { type: 'select', key: 'applyType', label: '申请类型', defaultValue: '数据资源申请', options: ['全部', '数据资源申请'] },
                { type: 'select', key: 'status', label: '状态', emptyLabel: '状态  请选择状态', options: ['全部', '待审批', '已撤回', '审批不通过', '待交付', '待确认交付', '交付完成'] }
            ],
            columns: [
                { key: 'applyNo', label: '申请编号' },
                { key: 'name', label: '资源目录名称', primary: true },
                { key: 'space', label: '所属空间' },
                { key: 'provider', label: '数据资源提供方', ellipsis: true },
                { key: 'user', label: '数据资源使用方', ellipsis: true },
                { key: 'applyAt', label: '申请时间' },
                { key: 'status', label: '状态', status: true }
            ],
            rows: [
                { applyNo: '2026060510341508500000101148277', name: '罗湖区金融风险监测数据资源260605JZ4', space: '流通利用平台', provider: '深圳市龙岗区数据要素交易服务有限公司', user: '营销机构测试', applyAt: '2026-06-05 10:34:15', applyType: '数据资源申请', status: '交付完成' },
                { applyNo: '2026060418594928500000101148152', name: '南山区高新技术企业创新能力数据资源260526', space: '流通利用平台', provider: '深圳市龙岗区政务数据运营有限公司', user: '深圳市星途科技发展有限公司', applyAt: '2026-06-04 18:59:49', applyType: '数据资源申请', status: '交付完成' },
                { applyNo: '2026060418555665900000101148130', name: '坪山区新能源充电桩数据资源260528', space: '流通利用平台', provider: '深圳市龙岗区数据要素交易服务有限公司', user: '深圳市星途科技发展有限公司', applyAt: '2026-06-04 18:55:56', applyType: '数据资源申请', status: '已撤回' },
                { applyNo: '2026060211141048100000101148923', name: '龙岗区政务企业信用数据资源集', space: '流通利用平台', provider: '深圳市龙岗区数据要素交易服务有限公司', user: '深圳市星途科技发展有限公司', applyAt: '2026-06-02 11:14:10', applyType: '数据资源申请', status: '待审批' },
                { applyNo: '2026060210523401200000101148918', name: '龙岗区企业纳税信用评级数据', space: '流通利用平台', provider: '深圳市龙岗区数据要素交易服务有限公司', user: '深圳市龙岗区政务数据运营有限公司', applyAt: '2026-06-02 10:52:34', applyType: '数据资源申请', status: '待审批' },
                { applyNo: '2026060210421341900000101148911', name: '龙岗区企业纳税信用评级数据', space: '流通利用平台', provider: '深圳市龙岗区数据要素交易服务有限公司', user: '深圳市星途科技发展有限公司', applyAt: '2026-06-02 10:42:13', applyType: '数据资源申请', status: '待审批' },
                { applyNo: '202606020950266700000101148906', name: '坪山区新能源充电桩数据资源260528', space: '流通利用平台', provider: '深圳市龙岗区数据要素交易服务有限公司', user: '深圳市星途科技发展有限公司', applyAt: '2026-06-02 09:50:26', applyType: '数据资源申请', status: '待审批' },
                { applyNo: '202605281140532050000101148918', name: '坪山区新能源充电桩数据资源260528', space: '流通利用平台', provider: '深圳市龙岗区数据要素交易服务有限公司', user: '营销机构测试', applyAt: '2026-05-28 11:40:53', applyType: '数据资源申请', status: '交付完成' },
                { applyNo: '202605280949244950000101148870', name: '龙岗区企业纳税信用评级数据', space: '流通利用平台', provider: '深圳市龙岗区数据要素交易服务有限公司', user: '营销机构测试', applyAt: '2026-05-28 09:49:24', applyType: '数据资源申请', status: '待确认交付' },
                { applyNo: '202605271853487640000101148845', name: 'E2E资源_1779878886300', space: '流通利用平台', provider: '深圳市龙岗区数据要素交易服务有限公司', user: '营销机构测试', applyAt: '2026-05-27 18:53:48', applyType: '数据资源申请', status: '交付完成' }
            ]
        },
        contract: {
            title: '合同管理',
            module: '订单合同监测',
            activeTitle: '交易合同监测',
            layout: 'contractMonitor',
            statusMode: 'dot',
            total: 82,
            filters: [
                { type: 'search', placeholder: '输入需方/供方/合同编号/合同名称' },
                { type: 'select', key: 'space', label: '所属空间', emptyLabel: '所属空间  请选择空间', options: ['全部', '流通利用平台'] },
                { type: 'select', key: 'signMode', label: '签署方式', emptyLabel: '签署方式', options: ['全部', '线下签署', '线上签署'] },
                { type: 'select', key: 'status', label: '合同状态', emptyLabel: '合同状态', options: ['全部', '待签署', '签署失败', '已签署', '作废中', '已作废'] },
                { type: 'date', placeholder: '签署时间  开始日期      -      结束日期' }
            ],
            columns: [
                { key: 'name', label: '合同名称', primary: true },
                { key: 'contractNo', label: '合同编号' },
                { key: 'space', label: '所属空间' },
                { key: 'signMode', label: '签署方式' },
                { key: 'buyer', label: '需方', ellipsis: true },
                { key: 'seller', label: '供方', ellipsis: true },
                { key: 'orderCount', label: '关联订单' },
                { key: 'signedAt', label: '合同签署时间' },
                { key: 'effectiveAt', label: '合同生效时间' },
                { key: 'endAt', label: '合同结束时间' },
                { key: 'status', label: '合同状态', status: true },
                { key: '__actions', label: '操作' }
            ],
            rows: [
                { name: '合同金银20260604', contractNo: '--', space: '流通利用平台', signMode: '线下签署', buyer: '深圳市星途科技发展有限公司', seller: '深圳市龙岗区政务数据运营有限公司', orderCount: '1', signedAt: '2026-06-04', effectiveAt: '2026-06-19', endAt: '2027-06-30', status: '已签署', actions: ['查看详情'] },
                { name: '企业扶持政策合同', contractNo: 'HJU-0001', space: '流通利用平台', signMode: '线下签署', buyer: '测试需方机构', seller: '测试供方机构', orderCount: '1', signedAt: '2026-06-04', effectiveAt: '2026-06-04', endAt: '2027-06-30', status: '已签署', actions: ['查看详情'] },
                { name: '龙岗企业经营画像数据集采购合同', contractNo: 'LGQYJYHXHTA', space: '流通利用平台', signMode: '线下签署', buyer: '营销机构测试', seller: '深圳市龙岗区数据要素交易服务有限公司', orderCount: '1', signedAt: '2026-06-01', effectiveAt: '2026-06-01', endAt: '2026-06-04', status: '已签署', actions: ['查看详情'] },
                { name: '龙岗企业经营画像数据集采购合同', contractNo: 'LGQYJYHXHTA', space: '流通利用平台', signMode: '线下签署', buyer: '营销机构测试', seller: '深圳市龙岗区数据要素交易服务有限公司', orderCount: '1', signedAt: '2026-06-01', effectiveAt: '2026-06-01', endAt: '2026-06-03', status: '已签署', actions: ['查看详情'] },
                { name: '1', contractNo: '--', space: '流通利用平台', signMode: '线下签署', buyer: '中节能铁汉生态环境股份有限公司', seller: '深圳市龙岗远望软件技术有限公司', orderCount: '1', signedAt: '2026-06-01', effectiveAt: '2026-06-01', endAt: '2026-06-29', status: '已签署', actions: ['查看详情'] },
                { name: '6', contractNo: '--', space: '流通利用平台', signMode: '线下签署', buyer: '中节能铁汉生态环境股份有限公司', seller: '深圳市龙岗远望软件技术有限公司', orderCount: '1', signedAt: '2026-06-01', effectiveAt: '2026-06-01', endAt: '2026-06-29', status: '已签署', actions: ['查看详情'] },
                { name: '4', contractNo: '--', space: '流通利用平台', signMode: '线下签署', buyer: '中节能铁汉生态环境股份有限公司', seller: '深圳市龙岗远望软件技术有限公司', orderCount: '1', signedAt: '2026-06-01', effectiveAt: '2026-06-01', endAt: '2026-06-30', status: '已签署', actions: ['查看详情'] },
                { name: '6', contractNo: '--', space: '流通利用平台', signMode: '线下签署', buyer: '中节能铁汉生态环境股份有限公司', seller: '深圳市龙岗远望软件技术有限公司', orderCount: '1', signedAt: '2026-06-01', effectiveAt: '2026-06-01', endAt: '2026-06-30', status: '已签署', actions: ['查看详情'] },
                { name: '4', contractNo: '--', space: '流通利用平台', signMode: '线下签署', buyer: '中节能铁汉生态环境股份有限公司', seller: '深圳市龙岗远望软件技术有限公司', orderCount: '1', signedAt: '2026-06-01', effectiveAt: '2026-06-01', endAt: '2026-06-23', status: '已签署', actions: ['查看详情'] },
                { name: '4', contractNo: '--', space: '流通利用平台', signMode: '线下签署', buyer: '中节能铁汉生态环境股份有限公司', seller: '深圳市龙岗远望软件技术有限公司', orderCount: '1', signedAt: '2026-06-01', effectiveAt: '2026-06-01', endAt: '2026-06-30', status: '已签署', actions: ['查看详情'] }
            ]
        },
        deliveryTask: {
            title: '交付任务监测',
            module: '数据交付监测',
            activeTitle: '交付任务监测',
            layout: 'deliveryTask',
            total: 109,
            detailUrl: 'operation-delivery-task-detail.html',
            stats: [
                { label: '交付任务总数', value: '109', unit: '个' },
                { label: '交付中的任务', value: '45', unit: '个' },
                { label: '接入数据产品', value: '42', unit: '个' },
                { label: '接入连接器', value: '109', unit: '个' }
            ],
            tabKey: 'stage',
            tabs: [
                { label: '全部(109)', value: 'all' },
                { label: '未开始交付(11)', value: '未开始交付' },
                { label: '交付中(45)', value: '交付中' },
                { label: '交付完成(53)', value: '交付完成' }
            ],
            filters: [
                { type: 'search', placeholder: '请输入名称/编号' },
                { type: 'select', key: 'space', label: '所属空间', options: ['全部', '流通利用平台'] },
                { type: 'select', key: 'source', label: '申请来源', options: ['全部', '数据资源', '数据产品'] },
                { type: 'select', key: 'deliveryMode', label: '交付方式', options: ['全部', '文件传输', 'API传输'] },
                { type: 'date', placeholder: '创建时间：开始时间 - 结束时间' }
            ],
            columns: [
                { key: 'taskNo', label: '交付任务编号' },
                { key: 'space', label: '所属空间' },
                { key: 'name', label: '产品/资源', primary: true },
                { key: 'source', label: '申请来源' },
                { key: 'userConnector', label: '数据使用方连接器' },
                { key: 'providerConnector', label: '数据提供方连接器' },
                { key: 'deliveryMode', label: '交付方式' },
                { key: 'updatedAt', label: '更新时间' },
                { key: 'createdAt', label: '创建时间' },
                { key: 'stage', label: '任务阶段' },
                { key: '__actions', label: '操作' }
            ],
            rows: [
                { taskNo: '02026060510351628200000101382508', space: '流通利用平台', name: '罗湖区金融风险监测数据资源260605JZ4', source: '数据资源', userConnector: '营销机构测试', providerConnector: '深圳市龙岗区数据要素交易服务有限公司', deliveryMode: '文件传输', updatedAt: '2026-06-05 11:00', createdAt: '2026-06-05 10:35', stage: '交付中', actions: ['详情'] },
                { taskNo: '02026060419511644600000101382698', space: '流通利用平台', name: '坪山区智能制造产业生态图谱', source: '数据产品', userConnector: '深圳市星途科技发展有限公司', providerConnector: '深圳市龙岗区政务数据运营有限公司', deliveryMode: 'API传输', updatedAt: '2026-06-04 19:55', createdAt: '2026-06-04 19:51', stage: '交付完成', actions: ['详情'] },
                { taskNo: '02026060419010709800000101382431', space: '流通利用平台', name: '南山区高新技术企业创新能力数据资源260526', source: '数据资源', userConnector: '深圳市星途科技发展有限公司', providerConnector: '深圳市龙岗区政务数据运营有限公司', deliveryMode: '文件传输', updatedAt: '2026-06-04 19:54', createdAt: '2026-06-04 19:01', stage: '交付完成', actions: ['详情'] },
                { taskNo: '02026060419010925600000101382441', space: '流通利用平台', name: '龙岗企业经营画像数据集晨星园区分析精选版', source: '数据产品', userConnector: '营销机构测试', providerConnector: '深圳市龙岗区数据要素交易服务有限公司', deliveryMode: '文件传输', updatedAt: '2026-06-04 19:30', createdAt: '2026-06-04 19:01', stage: '交付中', actions: ['详情'] },
                { taskNo: '02026052716344093600000101382929', space: '流通利用平台', name: '城市交通运行监测数据资源', source: '数据产品', userConnector: '深圳市星途科技发展有限公司', providerConnector: '深圳市龙岗区政务数据运营有限公司', deliveryMode: '文件传输', updatedAt: '2026-06-04 19:16', createdAt: '2026-05-27 16:34', stage: '交付完成', actions: ['详情'] },
                { taskNo: '02026052809593262100000101382225', space: '流通利用平台', name: '企业经营登记基础信息资源产品', source: '数据产品', userConnector: '深圳市星途科技发展有限公司', providerConnector: '深圳市龙岗区政务数据运营有限公司', deliveryMode: '文件传输', updatedAt: '2026-06-04 19:15', createdAt: '2026-05-28 09:59', stage: '交付完成', actions: ['详情'] },
                { taskNo: '02026052615392759200000101382750', space: '流通利用平台', name: '深圳市战略性新兴产业统计数据', source: '数据产品', userConnector: '深圳市星途科技发展有限公司', providerConnector: '深圳市龙岗区政务数据运营有限公司', deliveryMode: '文件传输', updatedAt: '2026-06-04 19:15', createdAt: '2026-05-26 15:39', stage: '交付中', actions: ['详情'] },
                { taskNo: '02026060414485676600000101382611', space: '流通利用平台', name: '龙岗区中小微企业扶持政策匹配数据集', source: '数据产品', userConnector: '测试需方机构', providerConnector: '测试供方机构', deliveryMode: 'API传输', updatedAt: '2026-06-04 14:52', createdAt: '2026-06-04 14:48', stage: '交付完成', actions: ['详情'] },
                { taskNo: '02026060310315691600000101382577', space: '流通利用平台', name: '龙岗企业经营画像数据集云岭营商研判共享版', source: '数据产品', userConnector: '营销机构测试', providerConnector: '深圳市龙岗区数据要素交易服务有限公司', deliveryMode: '文件传输', updatedAt: '2026-06-03 11:00', createdAt: '2026-06-03 10:31', stage: '交付中', actions: ['详情'] },
                { taskNo: '02026060210523401200000101382466', space: '流通利用平台', name: '龙岗区企业纳税信用评级数据', source: '数据资源', userConnector: '深圳市龙岗区政务数据运营有限公司', providerConnector: '深圳市龙岗区数据要素交易服务有限公司', deliveryMode: '文件传输', updatedAt: '2026-06-02 10:52', createdAt: '2026-06-02 10:52', stage: '未开始交付', actions: ['详情'] }
            ]
        },
        deliveryLog: {
            title: '交付日志',
            module: '数据交付监测',
            activeTitle: '交付任务日志',
            total: 345,
            actions: ['导出'],
            filters: [
                { type: 'search', placeholder: '请输入任务编号或产品/资源名称搜索' },
                { type: 'select', key: 'space', label: '所属空间', options: ['全部', '流通利用平台'] },
                { type: 'select', key: 'providerConnector', label: '数据提供方连接器', options: ['全部', '深圳市龙岗区数据要素交易服务有限公司', '深圳市龙岗区政务数据运营有限公司'] },
                { type: 'select', key: 'userConnector', label: '数据使用方连接器', options: ['全部', '营销机构测试', '深圳市星途科技发展有限公司'] },
                { type: 'select', key: 'source', label: '申请来源', options: ['全部', '数据资源', '数据产品'] },
                { type: 'select', key: 'deliveryMode', label: '交付方式', options: ['全部', '文件传输', 'API传输', '人工交付'] },
                { type: 'select', key: 'status', label: '操作状态', options: ['全部', '成功', '失败'] },
                { type: 'date', placeholder: '操作时间：开始时间 - 结束时间' }
            ],
            columns: [
                { key: 'index', label: '序号' },
                { key: 'taskNo', label: '任务编号' },
                { key: 'space', label: '所属空间' },
                { key: 'name', label: '产品/资源', primary: true },
                { key: 'source', label: '申请来源' },
                { key: 'providerConnector', label: '数据提供方连接器' },
                { key: 'userConnector', label: '数据使用方连接器' },
                { key: 'deliveryMode', label: '交付方式' },
                { key: 'operateAt', label: '操作时间' },
                { key: 'status', label: '操作状态', status: true },
                { key: 'content', label: '操作内容' },
                { key: '__actions', label: '操作' }
            ],
            rows: [
                { index: '1', taskNo: '02026060510351627800000101382507', space: '流通利用平台', name: '罗湖区金融风险监测数据资源260605JZ4', source: '数据资源', providerConnector: '深圳市龙岗区数据要素交易服务有限公司', userConnector: '营销机构测试', deliveryMode: '文件传输', operateAt: '2026-06-05 10:36', status: '成功', content: '供方连接器上报交付中任务', actions: ['查看详情'] },
                { index: '2', taskNo: '02026060510351627800000101382507', space: '流通利用平台', name: '罗湖区金融风险监测数据资源260605JZ4', source: '数据资源', providerConnector: '深圳市龙岗区数据要素交易服务有限公司', userConnector: '营销机构测试', deliveryMode: '文件传输', operateAt: '2026-06-05 10:35', status: '成功', content: '系统创建交付任务', actions: ['查看详情'] },
                { index: '3', taskNo: '02026060419511643900000101382697', space: '流通利用平台', name: '坪山区智能制造产业生态图谱', source: '数据产品', providerConnector: '深圳市龙岗区政务数据运营有限公司', userConnector: '深圳市星途科技发展有限公司', deliveryMode: 'API传输', operateAt: '2026-06-04 19:55', status: '成功', content: '供方连接器上报交付完成任务', actions: ['查看详情'] },
                { index: '4', taskNo: '02026060419511643900000101382697', space: '流通利用平台', name: '坪山区智能制造产业生态图谱', source: '数据产品', providerConnector: '深圳市龙岗区政务数据运营有限公司', userConnector: '深圳市星途科技发展有限公司', deliveryMode: 'API传输', operateAt: '2026-06-04 19:55', status: '成功', content: '供方连接器上报交付中任务', actions: ['查看详情'] },
                { index: '5', taskNo: '02026060419010709300000101382430', space: '流通利用平台', name: '南山区高新技术企业创新能力数据资源260526', source: '数据资源', providerConnector: '深圳市龙岗区政务数据运营有限公司', userConnector: '深圳市星途科技发展有限公司', deliveryMode: '文件传输', operateAt: '2026-06-04 19:54', status: '成功', content: '供方连接器上报交付完成任务', actions: ['查看详情'] },
                { index: '6', taskNo: '02026060419301648600000101382580', space: '流通利用平台', name: '罗湖区商业数据咨询服务260604MUZ', source: '服务交易', providerConnector: '--', userConnector: '--', deliveryMode: '人工交付', operateAt: '2026-06-04 19:31', status: '成功', content: '供方传输完成', actions: ['查看详情'] }
            ]
        },
        bill: {
            title: '交易账单管理',
            module: '交易费用监测',
            activeTitle: '交易账单监测',
            layout: 'billMonitor',
            statusMode: 'dot',
            total: PLATFORM_BILL_ROWS.length,
            selectable: true,
            filters: [
                { type: 'search', placeholder: '请输入账单编号/订单编号/交易标的/提供方' },
                { type: 'select', key: 'businessType', label: '业务类型', options: ['全部', '产品交易', '服务交易'] },
                { type: 'select', key: 'payMode', label: '付费方式', options: ['全部', '预付费', '后付费'] },
                { type: 'select', key: 'status', label: '账单状态', options: ['全部', '待出账', '待支付', '待支付（首次）', '待支付（阶段）', '待支付（最后）', '待支付确认', '已结清', '待供方确认', '待需方确认'] },
                { type: 'date', key: 'createdAt', label: '账单生成时间', placeholder: '账单生成时间    开始日期      -      结束日期' }
            ],
            columns: [
                { key: 'billNo', label: '账单编号', ellipsis: true },
                { key: 'orderNo', label: '订单编号', ellipsis: true },
                { key: 'target', label: '交易标的', primary: true },
                { key: 'businessType', label: '业务类型' },
                { key: 'targetType', label: '标的类型', ellipsis: true },
                { key: 'buyer', label: '需求方', ellipsis: true },
                { key: 'seller', label: '提供方', ellipsis: true },
                { key: 'payMode', label: '付费方式' },
                { key: 'measureMode', label: '计量方式', ellipsis: true },
                { key: 'price', label: '价格' },
                { key: 'quantity', label: '购买数量' },
                { key: 'amount', label: '账单金额(元)' },
                { key: 'createdAt', label: '账单生成时间' },
                { key: 'period', label: '账期' },
                { key: 'repayAt', label: '还款时间' },
                { key: 'paidAt', label: '付款时间' },
                { key: 'status', label: '账单状态', status: true },
                { key: '__actions', label: '操作' }
            ],
            rows: PLATFORM_BILL_ROWS
        },
        usageDetail: {
            title: '用量明细',
            module: '交易费用监测',
            activeTitle: '用量明细',
            total: 238,
            filters: [
                { type: 'search', placeholder: '请输入账单编号/订单编号/调用IP搜索' },
                { type: 'select', key: 'status', label: '调用状态', options: ['全部', '调用成功', '调用失败'] },
                { type: 'date', placeholder: '调用时间：开始时间 - 结束时间' }
            ],
            columns: [
                { key: 'index', label: '序号' },
                { key: 'billNo', label: '账单编号' },
                { key: 'orderNo', label: '订单编号' },
                { key: 'target', label: '交易标的', primary: true },
                { key: 'callIp', label: '调用IP' },
                { key: 'callAt', label: '调用时间' },
                { key: 'status', label: '返回状态', status: true },
                { key: 'dataSize', label: '返回数据量' }
            ],
            rows: [
                { index: '1', billNo: '2026060419485168900000101148674', orderNo: '2026060419400437100000101148221', target: '坪山区智能制造产业生态图谱', callIp: '10.24.18.36', callAt: '2026-06-04 19:51:20', status: '调用成功', dataSize: '24.6KB' },
                { index: '2', billNo: '2026060414483952000000101148245', orderNo: '2026060414472436900000101148980', target: '龙岗区中小微企业扶持政策匹配数据集', callIp: '10.24.18.42', callAt: '2026-06-04 14:53:18', status: '调用失败', dataSize: '--' },
                { index: '3', billNo: '2026060117232446800000101148103', orderNo: '2026060117224673400000101148870', target: '本平台数据产品列表', callIp: '10.24.18.51', callAt: '2026-06-01 17:31:04', status: '调用成功', dataSize: '18.2KB' }
            ]
        }
    };

    function escapeHTML(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }[char];
        });
    }

    function statusTone(value) {
        var text = String(value || '');
        if (/失败|异常|撤回|下架|注销|不通过|作废/.test(text)) return 'danger';
        if (/交付中/.test(text)) return 'info';
        if (/待|中|未开始|临期/.test(text)) return 'warning';
        return 'success';
    }

    function renderActions(actions) {
        return actions.map(function (label) {
            return '<button class="monitor-btn" type="button" data-top-action="' + escapeHTML(label) + '">'
                + ICONS.export + escapeHTML(label) + '</button>';
        }).join('');
    }

    function renderStats(stats) {
        if (!stats || !stats.length) return '';
        return '<div class="monitor-stats">' + stats.map(function (item) {
            return '<div class="monitor-stat-card">'
                + '<div class="monitor-stat-label">' + escapeHTML(item.label) + '</div>'
                + '<div class="monitor-stat-value"><strong>' + escapeHTML(item.value) + '</strong><span>' + escapeHTML(item.unit || '') + '</span></div>'
                + '</div>';
        }).join('') + '</div>';
    }

    function renderTabs(page) {
        if (!page.tabs || !page.tabs.length) return '';
        return '<div class="monitor-tabs">' + page.tabs.map(function (tab, index) {
            return '<button class="monitor-tab' + (index === 0 ? ' active' : '') + '" type="button" data-tab-value="' + escapeHTML(tab.value) + '">' + escapeHTML(tab.label) + '</button>';
        }).join('') + '</div>';
    }

    function renderFilters(filters) {
        return filters.map(function (filter) {
            if (filter.type === 'search') {
                return '<input class="filter-input" type="text" data-monitor-search placeholder="' + escapeHTML(filter.placeholder) + '">';
            }
            if (filter.type === 'select') {
                return '<select class="filter-select" data-monitor-filter="' + escapeHTML(filter.key) + '">'
                    + filter.options.map(function (option) {
                        return '<option value="' + escapeHTML(option) + '">' + escapeHTML((option === '全部' ? filter.label : option)) + '</option>';
                    }).join('')
                    + '</select>';
            }
            return '<input class="filter-date" type="text" data-monitor-date'
                + (filter.key ? ' data-monitor-date-key="' + escapeHTML(filter.key) + '"' : '')
                + ' placeholder="' + escapeHTML(filter.placeholder) + '">';
        }).join('')
            + '<button class="monitor-btn primary" type="button" data-monitor-search-btn>' + ICONS.search + '搜索</button>'
            + '<button class="monitor-btn" type="button" data-monitor-reset-btn>' + ICONS.reset + '重置</button>';
    }

    function renderFilterControl(filter) {
        if (filter.type === 'search') {
            return '<div class="monitor-search-wrap"><input class="filter-input" type="text" data-monitor-search placeholder="' + escapeHTML(filter.placeholder) + '"><span>' + ICONS.search + '</span></div>';
        }
        if (filter.type === 'select') {
            return '<select class="filter-select" data-monitor-filter="' + escapeHTML(filter.key) + '">'
                + filter.options.map(function (option) {
                    return '<option value="' + escapeHTML(option) + '">' + escapeHTML((option === '全部' ? (filter.emptyLabel || filter.label) : option)) + '</option>';
                }).join('')
                + '</select>';
        }
        if (filter.key) {
            return '<div class="monitor-date-range" data-monitor-date-key="' + escapeHTML(filter.key) + '">'
                + '<span class="monitor-date-range-label">' + escapeHTML(filter.label || '查询时间') + '</span>'
                + '<input class="monitor-date-input" type="datetime-local" step="1" data-monitor-date data-monitor-date-start aria-label="' + escapeHTML((filter.label || '查询时间') + '开始时间') + '">'
                + '<i>至</i>'
                + '<input class="monitor-date-input" type="datetime-local" step="1" data-monitor-date data-monitor-date-end aria-label="' + escapeHTML((filter.label || '查询时间') + '结束时间') + '">'
                + '</div>';
        }
        return '<div class="monitor-date-wrap"><input class="filter-date" type="text" data-monitor-date'
            + ' placeholder="' + escapeHTML(filter.placeholder) + '"><span>' + ICONS.calendar + '</span></div>';
    }

    function renderResourceCatalogFilters(page) {
        var filters = page.filters || [];
        var basic = filters.slice(0, 2);
        var advanced = filters.slice(2);
        return '<div class="monitor-resource-toolbar">'
            + '<div class="monitor-resource-basic">'
            + basic.map(renderFilterControl).join('')
            + '<button class="monitor-icon-btn" type="button" data-monitor-search-btn aria-label="筛选">' + ICONS.filter + '</button>'
            + '</div>'
            + '<div class="monitor-page-actions">' + renderActions(page.actions || []) + '</div>'
            + '</div>'
            + '<div class="monitor-resource-advanced ' + (advanced.length < 3 ? 'compact' : '') + '">'
            + advanced.map(renderFilterControl).join('')
            + '<button class="monitor-reset-link" type="button" data-monitor-reset-btn>重置</button>'
            + '</div>';
    }

    function renderListingMonitorFilters(page) {
        var filters = page.filters || [];
        var search = filters.find(function (filter) { return filter.type === 'search'; });
        var space = filters.find(function (filter) { return filter.key === 'space'; });
        var date = filters.find(function (filter) { return filter.type === 'date'; });
        return '<div class="monitor-listing-toolbar">'
            + '<div class="monitor-listing-primary">'
            + (search ? renderFilterControl(search) : '')
            + '<div class="monitor-filter-tabs">'
            + (page.tabs || []).map(function (tab) {
                return '<button class="monitor-filter-tab" type="button" data-tab-value="' + escapeHTML(tab.value) + '">' + escapeHTML(tab.label) + '</button>';
            }).join('')
            + '</div>'
            + (space ? renderFilterControl(space) : '')
            + '<button class="monitor-icon-btn" type="button" data-monitor-search-btn aria-label="筛选">' + ICONS.filter + '</button>'
            + '</div>'
            + '<div class="monitor-page-actions">' + renderActions(page.actions || []) + '</div>'
            + '</div>'
            + '<div class="monitor-listing-secondary">'
            + (date ? renderFilterControl(date) : '')
            + '<button class="monitor-reset-link" type="button" data-monitor-reset-btn>重置</button>'
            + '</div>';
    }

    function renderAuthMonitorFilters(page) {
        var filters = page.filters || [];
        var search = filters.find(function (filter) { return filter.type === 'search'; });
        var advanced = filters.filter(function (filter) { return filter.type !== 'search'; });
        return '<div class="monitor-auth-filters">'
            + '<div class="monitor-auth-primary">'
            + (search ? renderFilterControl(search) : '')
            + '<button class="monitor-icon-btn bordered" type="button" data-monitor-search-btn aria-label="筛选">' + ICONS.filter + '</button>'
            + '</div>'
            + '<div class="monitor-auth-secondary">'
            + advanced.map(renderFilterControl).join('')
            + '<button class="monitor-reset-link" type="button" data-monitor-reset-btn>重置</button>'
            + '</div>'
            + '</div>';
    }

    function renderContractMonitorFilters(page) {
        var filters = page.filters || [];
        var search = filters.find(function (filter) { return filter.type === 'search'; });
        var advanced = filters.filter(function (filter) { return filter.type !== 'search'; });
        return '<div class="monitor-auth-filters monitor-contract-filters">'
            + '<div class="monitor-auth-primary">'
            + (search ? renderFilterControl(search) : '')
            + '<button class="monitor-icon-btn bordered" type="button" data-monitor-search-btn aria-label="筛选">' + ICONS.filter + '</button>'
            + '</div>'
            + '<div class="monitor-auth-secondary">'
            + advanced.map(renderFilterControl).join('')
            + '<button class="monitor-reset-link" type="button" data-monitor-reset-btn>重置</button>'
            + '</div>'
            + '</div>';
    }

    function renderBillMonitorFilters(page) {
        var filters = page.filters || [];
        var search = filters.find(function (filter) { return filter.type === 'search'; });
        var advanced = filters.filter(function (filter) { return filter.type !== 'search'; });
        return '<div class="monitor-auth-filters monitor-bill-filters">'
            + '<div class="monitor-auth-primary">'
            + (search ? renderFilterControl(search) : '')
            + '<button class="monitor-icon-btn bordered" type="button" data-monitor-search-btn aria-label="筛选">' + ICONS.filter + '</button>'
            + '</div>'
            + '<div class="monitor-auth-secondary">'
            + advanced.map(renderFilterControl).join('')
            + '<button class="monitor-reset-link" type="button" data-monitor-reset-btn>重置</button>'
            + '</div>'
            + '</div>';
    }

    function renderDeliveryTaskHeader(page) {
        var space = (page.filters || []).find(function (filter) { return filter.key === 'space'; });
        return '<div class="delivery-dashboard-head">'
            + '<h1 class="monitor-page-title">' + escapeHTML(page.title) + '</h1>'
            + '<div class="delivery-space-filter">' + (space ? renderFilterControl(space) : '') + '</div>'
            + '</div>';
    }

    function renderDeliveryTaskOverview(page) {
        var statIcons = [ICONS.grid, ICONS.checkCircle, ICONS.layers, ICONS.connector];
        var chartItems = [
            { label: '文件传输', value: 41, color: '#5470c6' },
            { label: '数据库传输', value: 1, color: '#91cc75' },
            { label: 'API传输', value: 53, color: '#fac858' },
            { label: '人工交付', value: 5, color: '#ee6666' }
        ];
        var gradient = 'conic-gradient('
            + chartItems[0].color + ' 0 40%, '
            + chartItems[1].color + ' 40% 41%, '
            + chartItems[2].color + ' 41% 94%, '
            + chartItems[3].color + ' 94% 100%)';
        return '<div class="delivery-dashboard-grid">'
            + '<div class="delivery-kpi-grid">'
            + (page.stats || []).map(function (item, index) {
                return '<div class="delivery-kpi-card">'
                    + '<div class="delivery-kpi-icon tone-' + (index + 1) + '">' + statIcons[index] + '</div>'
                    + '<div><div class="delivery-kpi-label">' + escapeHTML(item.label) + '(' + escapeHTML(item.unit || '') + ')</div>'
                    + '<div class="delivery-kpi-value">' + escapeHTML(item.value) + '</div></div>'
                    + '</div>';
            }).join('')
            + '</div>'
            + '<div class="delivery-chart-card">'
            + '<div class="delivery-chart-title">数据交付方式分布</div>'
            + '<div class="delivery-chart-body">'
            + '<div class="delivery-donut" style="background:' + gradient + '"><span></span></div>'
            + '<div class="delivery-chart-legend">'
            + chartItems.map(function (item) {
                return '<div class="delivery-legend-item"><i style="background:' + item.color + '"></i>' + escapeHTML(item.label) + '</div>';
            }).join('')
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';
    }

    function renderDeliveryTaskFilters(page) {
        var search = (page.filters || []).find(function (filter) { return filter.type === 'search'; });
        return '<div class="delivery-task-filter-row">'
            + (search ? renderFilterControl(search) : '')
            + '<button class="monitor-icon-btn bordered" type="button" data-monitor-search-btn aria-label="筛选">' + ICONS.filter + '</button>'
            + '</div>';
    }

    function normalizeMonitorDateTime(value, isEnd) {
        var normalized = String(value || '').trim().replace('T', ' ');
        if (!normalized) return '';
        if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
            return normalized + (isEnd ? ' 23:59:59' : ' 00:00:00');
        }
        if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(normalized)) {
            return normalized + ':00';
        }
        return normalized;
    }

    function toMonitorDateTimeLocal(value) {
        var normalized = normalizeMonitorDateTime(value, false);
        return normalized ? normalized.replace(' ', 'T') : '';
    }

    function getMonitorDateRange(control) {
        if (!control) return null;
        var startInput = control.querySelector('[data-monitor-date-start]');
        var endInput = control.querySelector('[data-monitor-date-end]');
        var startAt = normalizeMonitorDateTime(startInput ? startInput.value : '', false);
        var endAt = normalizeMonitorDateTime(endInput ? endInput.value : '', true);
        if (!startAt && !endAt) return null;
        return {
            startAt: startAt,
            endAt: endAt,
            invalid: Boolean(startAt && endAt && startAt > endAt)
        };
    }

    function getRows(page, state, root) {
        var keywordInput = root.querySelector('[data-monitor-search]');
        var keyword = keywordInput ? keywordInput.value.trim().toLowerCase() : '';
        var rows = page.rows.slice();

        if (page.tabKey && state.tabValue && state.tabValue !== 'all') {
            rows = rows.filter(function (row) {
                return row[page.tabKey] === state.tabValue;
            });
        }

        root.querySelectorAll('[data-monitor-filter]').forEach(function (select) {
            var key = select.getAttribute('data-monitor-filter');
            var value = select.value;
            if (value && value !== '全部') {
                rows = rows.filter(function (row) {
                    return String(row[key] || '') === value;
                });
            }
        });

        root.querySelectorAll('[data-monitor-date-key]').forEach(function (input) {
            var key = input.getAttribute('data-monitor-date-key');
            var range = getMonitorDateRange(input);
            if (!key || !range || range.invalid) return;
            rows = rows.filter(function (row) {
                var value = String(row[key] || '');
                return value
                    && (!range.startAt || value >= range.startAt)
                    && (!range.endAt || value <= range.endAt);
            });
        });

        if (keyword) {
            rows = rows.filter(function (row) {
                return Object.keys(row).some(function (key) {
                    return String(row[key]).toLowerCase().indexOf(keyword) > -1;
                });
            });
        }

        return rows;
    }

    function detailField(label, value) {
        return '<div class="monitor-detail-field">'
            + '<span class="label">' + escapeHTML(label) + '</span>'
            + '<span class="value">' + escapeHTML(value || '--') + '</span>'
            + '</div>';
    }

    function detailGrid(fields) {
        return '<div class="monitor-detail-grid">' + fields.map(function (item) {
            return detailField(item.label, item.value);
        }).join('') + '</div>';
    }

    function detailSection(title, html) {
        return '<section class="monitor-detail-section">'
            + '<div class="monitor-detail-title">' + escapeHTML(title) + '</div>'
            + html
            + '</section>';
    }

    function detailTable(headers, rows, emptyText) {
        var body = rows && rows.length
            ? rows.map(function (row) {
                return '<tr>' + headers.map(function (header) {
                    return '<td>' + escapeHTML(row[header] || '--') + '</td>';
                }).join('') + '</tr>';
            }).join('')
            : '<tr><td class="monitor-empty" colspan="' + headers.length + '">' + escapeHTML(emptyText || '暂无数据') + '</td></tr>';

        return '<table class="data-table monitor-detail-table">'
            + '<thead><tr>' + headers.map(function (header) {
                return '<th>' + escapeHTML(header) + '</th>';
            }).join('') + '</tr></thead>'
            + '<tbody>' + body + '</tbody>'
            + '</table>';
    }

    function rowBaseFields(page, row) {
        return page.columns.filter(function (column) {
            return column.key !== '__actions';
        }).map(function (column) {
            return { label: column.label, value: row[column.key] || '--' };
        });
    }

    function getLogApplyType(page) {
        if (page.activeTitle === '资源登记目录') return '目录登记';
        if (page.activeTitle === '产品登记目录') return '目录登记';
        if (page.activeTitle === '数据资源上架监测') return '资源上架';
        if (page.activeTitle === '数据产品上架监测') return '产品上架';
        return '目录登记';
    }

    function getLogProcessStatus(row) {
        var status = row.logStatus || row.status || row.listingStatus || '已通过';
        if (/审核中|公示中|审批/.test(status)) return '审核中';
        if (/退回|失败|撤回/.test(status)) return '已退回';
        return '已通过';
    }

    function statusDotTone(page, value) {
        if (page.statusMode === 'dot' && page.activeTitle === '数据授权监测') {
            return /撤回|失败|不通过/.test(String(value || '')) ? 'danger' : 'success';
        }
        return statusTone(value);
    }

    function catalogBasicField(label, value, extraClass) {
        return '<div class="catalog-basic-field ' + (extraClass || '') + '">'
            + '<span class="label">' + escapeHTML(label) + '：</span>'
            + '<span class="value">' + escapeHTML(value || '--') + '</span>'
            + '</div>';
    }

    function catalogHtmlField(label, html, extraClass) {
        return '<div class="catalog-basic-field ' + (extraClass || '') + '">'
            + '<span class="label">' + escapeHTML(label) + '：</span>'
            + '<span class="value">' + html + '</span>'
            + '</div>';
    }

    function renderCatalogDirectoryDetail(page, row) {
        var isResource = page.activeTitle === '资源登记目录';
        var detailTitle = '目录详情';
        var tabSecondTitle = isResource ? '数据项信息' : '声明信息';
        var itemRows = isResource
            ? [
                { '序号': '1', '信息项名称': '年度纳税总额', '信息项英文名': 'annual_tax_amount', '数据类型': '字符串型C', '数据长度': '20' },
                { '序号': '2', '信息项名称': '纳税信用等级', '信息项英文名': 'tax_credit_level', '数据类型': '字符串型C', '数据长度': '100' }
            ]
            : [
                { '序号': '1', '信息项名称': '企业名称', '信息项英文名': 'enterprise_name', '数据类型': '字符串型C', '数据长度': '100' },
                { '序号': '2', '信息项名称': '经营状态', '信息项英文名': 'business_status', '数据类型': '字符串型C', '数据长度': '40' }
            ];
        return {
            title: detailTitle,
            body: '<div class="catalog-detail-tabs">'
                + '<button class="catalog-detail-tab active" type="button" data-catalog-detail-tab="base">基本信息</button>'
                + '<button class="catalog-detail-tab" type="button" data-catalog-detail-tab="items">' + tabSecondTitle + '</button>'
                + '</div>'
                + '<div class="catalog-detail-panel" data-catalog-detail-panel="base">'
                + '<div class="catalog-basic-card"><div class="catalog-basic-grid">'
                + (isResource
                    ? catalogBasicField('资源名称', row.name)
                        + catalogBasicField('资源类别', row.resourceType || '企业资源')
                        + catalogBasicField('资源所属行业分类', row.industry)
                        + catalogBasicField('资源持有方', row.holder)
                        + catalogBasicField('联系人', row.contact || '张明')
                        + catalogBasicField('联系方式', row.phone || '13923456789')
                        + catalogBasicField('资源格式', row.format || '电子文件 / wps')
                        + catalogBasicField('数据来源', row.source)
                        + catalogBasicField('是否涉及个人信息', row.personalInfo || '否')
                        + catalogBasicField('数据资源标识码', row.code)
                        + catalogBasicField('资源摘要', row.summary || '收录罗湖区持牌金融机构运营数据，涵盖信贷投放、不良率、资金流向等指标，用于区域金融风险监测和预警', 'full')
                        + catalogBasicField('其他', row.other || '--', 'full')
                    : catalogBasicField('数据产品名称', row.name)
                        + catalogBasicField('提供方名称', row.providerName || '深圳市龙岗区政务数据运营有限公司')
                        + catalogBasicField('产品类型', row.productType || '数据集')
                        + catalogBasicField('行业分类', row.industry || '采矿业')
                        + catalogBasicField('地域分类', row.region || '广东省 / 深圳市 / 龙岗区')
                        + catalogBasicField('覆盖时间范围', row.coverRange || '2026-06-10至2026-07-15')
                        + catalogBasicField('更新频率', row.frequency)
                        + catalogBasicField('是否涉及个人信息', row.personalInfo || '否')
                        + catalogBasicField('交付方式', row.deliveryMode)
                        + catalogBasicField('授权使用', row.authUse || '否')
                        + catalogBasicField('数据主体', row.dataSubject || '个人信息')
                        + catalogBasicField('数据规模', row.dataScale || '111MB')
                        + catalogBasicField('关联数据资源', row.relatedResource || '福田区金融服务业发展统计目录260526,…')
                        + catalogBasicField('数据产品标识码', row.code)
                        + catalogBasicField('使用限制', row.usageLimit || '111', 'full')
                        + catalogBasicField('产品简介', row.productIntro || '111', 'full')
                        + catalogBasicField('其他', row.other || '--', 'full'))
                + '</div></div></div>'
                + '<div class="catalog-detail-panel hidden" data-catalog-detail-panel="items">'
                + (isResource
                    ? detailTable(['序号', '信息项名称', '信息项英文名', '数据类型', '数据长度'], itemRows)
                    : '<div class="catalog-basic-card"><div class="catalog-basic-grid">'
                        + catalogBasicField('授权委托书', '--')
                        + catalogBasicField('数据样例', '--')
                        + catalogHtmlField('合法合规声明', '数据汇聚.docx <a class="monitor-table-action" href="javascript:void(0)">下载</a><a class="monitor-table-action" href="javascript:void(0)">预览</a>')
                        + catalogHtmlField('数据来源声明', '数据汇聚.docx <a class="monitor-table-action" href="javascript:void(0)">下载</a><a class="monitor-table-action" href="javascript:void(0)">预览</a>')
                        + catalogBasicField('安全分级分类报告', '--')
                        + catalogBasicField('数据质量、产品价值评估报告', '--')
                        + '</div></div>')
                + '</div>'
        };
    }

    function renderCatalogLog(page, row) {
        var applyType = getLogApplyType(page);
        var processStatus = getLogProcessStatus(row);
        var applyTime = row.logApplyAt || row.applyAt || row.updatedAt || row.createdAt || '--';
        var rowIndex = page.rows.indexOf(row);
        if (row.name === '1234') applyTime = '2026-06-05 11:31:07';
        if (page.activeTitle === '产品登记目录' && row.name === '医疗健康数据集') applyTime = '2026-06-04 19:33:29';
        return {
            title: '日志',
            body: '<div class="monitor-log-filter">'
                + '<div class="monitor-log-filter-row">'
                + '<select class="monitor-log-control"><option>申请类型&nbsp;&nbsp;请选择</option><option>' + escapeHTML(applyType) + '</option></select>'
                + '<select class="monitor-log-control"><option>流程状态&nbsp;&nbsp;请选择</option><option>已通过</option><option>审核中</option><option>已退回</option></select>'
                + '<div class="monitor-log-date"><span>申请时间</span><span>开始日期</span><span>-</span><span>结束日期</span><span class="monitor-log-calendar">' + ICONS.calendar + '</span></div>'
                + '</div>'
                + '<div class="monitor-log-actions"><button class="monitor-btn" type="button">重置</button><button class="monitor-btn primary" type="button">查询</button></div>'
                + '</div>'
                + '<div class="monitor-log-table-card">'
                + '<table class="data-table monitor-log-table">'
                + '<thead><tr><th>版本号</th><th>申请人</th><th>申请时间 <span class="sort-mark">◆</span></th><th>申请类型</th><th>更新说明</th><th>流程状态</th><th>操作</th></tr></thead>'
                + '<tbody><tr>'
                + '<td><span class="monitor-version-link">V1</span></td>'
                + '<td>' + escapeHTML(row.applicant || '张威') + '</td>'
                + '<td>' + escapeHTML(applyTime) + '</td>'
                + '<td>' + escapeHTML(applyType) + '</td>'
                + '<td>' + escapeHTML(row.updateDesc || '--') + '</td>'
                + '<td><span class="monitor-flow-status ' + statusTone(processStatus) + '"><i></i>' + escapeHTML(processStatus) + '</span></td>'
                + '<td><a class="monitor-table-action" href="javascript:void(0)" data-log-detail data-row-index="' + rowIndex + '">详情</a></td>'
                + '</tr></tbody>'
                + '</table>'
                + '<div class="monitor-log-pagination"><span>共 1 条</span><button class="page-btn ghost">‹</button><button class="page-btn active">1</button><button class="page-btn ghost">›</button><select class="page-size-select"><option>10 条/页</option></select><span>前往</span><input class="page-jumper" type="text"></div>'
                + '</div>'
        };
    }

    function getListingFlowStatus(row) {
        return row.listingStatus === '已下架' ? '下架已通过' : '上架已通过';
    }

    function renderListingLog(page, row) {
        var rowIndex = page.rows.indexOf(row);
        var logs = row.logs || [{
            registerVersion: row.registerVersion || 'V1',
            listingVersion: row.listingVersion || 'V1',
            applicant: row.applicant || (page.activeTitle === '数据产品上架监测' ? '张威' : '周九'),
            applyAt: row.applyAt || '--',
            description: row.description || '--',
            flowStatus: row.flowStatus || getListingFlowStatus(row)
        }];
        return {
            title: '日志',
            size: 'narrow',
            body: '<div class="monitor-log-table-card listing-log-card">'
                + '<table class="data-table monitor-log-table listing-log-table">'
                + '<thead><tr><th>登记版本号</th><th>上架版本号</th><th>申请人</th><th>申请时间</th><th>说明</th><th>流程状态</th><th>操作</th></tr></thead>'
                + '<tbody>' + logs.map(function (log) {
                    return '<tr>'
                        + '<td>' + escapeHTML(log.registerVersion || 'V1') + '</td>'
                        + '<td>' + escapeHTML(log.listingVersion || 'V1') + '</td>'
                        + '<td>' + escapeHTML(log.applicant || '--') + '</td>'
                        + '<td>' + escapeHTML(log.applyAt || '--') + '</td>'
                        + '<td>' + escapeHTML(log.description || '--') + '</td>'
                        + '<td><span class="monitor-flow-status success"><i></i>' + escapeHTML(log.flowStatus || getListingFlowStatus(row)) + '</span></td>'
                        + '<td><a class="monitor-table-action" href="javascript:void(0)" data-listing-detail data-row-index="' + rowIndex + '">详情</a></td>'
                        + '</tr>';
                }).join('') + '</tbody>'
                + '</table>'
                + '</div>'
        };
    }

    function buildProductListingDetailUrl(row) {
        var params = new URLSearchParams();
        ['name', 'code', 'type', 'provider', 'space'].forEach(function (key) {
            if (row[key]) params.set(key, row[key]);
        });
        return 'operation-product-listing-detail.html' + (params.toString() ? '?' + params.toString() : '');
    }

    function listingDetailField(label, value, extraClass) {
        return '<div class="listing-detail-field ' + (extraClass || '') + '">'
            + '<span class="label">' + escapeHTML(label) + '：</span>'
            + '<span class="value" title="' + escapeHTML(value || '--') + '">' + escapeHTML(value || '--') + '</span>'
            + '</div>';
    }

    function renderResourceListingDetail(page, row) {
        return {
            title: '资源上架详情',
            size: 'wide',
            body: '<section class="listing-detail-section">'
                + '<h2 class="listing-detail-title">基本信息</h2>'
                + '<div class="listing-detail-card">'
                + '<div class="listing-detail-grid">'
                + listingDetailField('数据资源名称', row.name)
                + listingDetailField('数据资源标识码', row.code)
                + listingDetailField('上架业务节点名称', row.space)
                + listingDetailField('上架业务节点ID', row.nodeId || '41234567899876543210018XXKTB1K')
                + listingDetailField('上架业务节点位置', row.nodeUrl || 'https://10.32.123.24/#/platformportal/trade-portal')
                + listingDetailField('资源交付方式', row.deliveryMode || '文件传输')
                + listingDetailField('交付说明', row.deliveryDesc || '--', 'full')
                + '<div class="listing-detail-image-field full"><span class="label">资源主图：</span><img src="images/hero-ai-longgang.jpg" alt="资源主图"></div>'
                + '</div>'
                + '</div>'
                + '</section>'
                + '<section class="listing-detail-section">'
                + '<h2 class="listing-detail-title">交付要求</h2>'
                + '<div class="listing-transfer-title">文件传输</div>'
                + '<div class="listing-detail-card compact">'
                + '<div class="listing-detail-grid two">'
                + listingDetailField('删除控制', row.deleteControl || '到期不删除')
                + listingDetailField('传输模式', row.transferMode || '拉(pull)')
                + '</div>'
                + '</div>'
                + '</section>'
        };
    }

    function renderDeliveryLogDetail(row) {
        return {
            title: '交付日志详情',
            body: detailSection('基本信息', detailGrid([
                { label: '任务编号', value: row.taskNo },
                { label: '所属空间', value: row.space },
                { label: '产品/资源', value: row.name },
                { label: '申请来源', value: row.source },
                { label: '数据提供方连接器', value: row.providerConnector },
                { label: '数据使用方连接器', value: row.userConnector },
                { label: '交付方式', value: row.deliveryMode },
                { label: '操作时间', value: row.operateAt },
                { label: '操作状态', value: row.status },
                { label: '操作内容', value: row.content }
            ]))
        };
    }

    function renderContractDetail(row) {
        var status = '<span class="monitor-flow-status success"><i></i>' + escapeHTML(row.status || '已签署') + '</span>';
        var flowId = row.flowId || '6d4ccb6a5521459bb05f48ae4417b03a';
        return {
            title: '合同详情',
            size: 'narrow',
            body: '<section class="contract-detail-section">'
                + '<h2 class="contract-detail-heading">合同基本信息 ' + status + '</h2>'
                + '<div class="contract-info-grid">'
                + detailField('合同名称', row.name)
                + detailField('合同编号', row.contractNo)
                + detailField('合同生效时间', row.effectiveAt)
                + detailField('合同失效时间', row.endAt)
                + detailField('合同签署方式', row.signMode)
                + detailField('签署时间', row.signedAt)
                + detailField('合同来源', row.source || '--')
                + detailField('备注', row.remark || '--')
                + '</div>'
                + '</section>'
                + '<section class="contract-detail-section">'
                + '<h2 class="contract-detail-heading">合同文件</h2>'
                + '<div class="contract-file-row"><span>数据汇聚.docx</span><a class="monitor-table-action" href="javascript:void(0)">预览</a><a class="monitor-table-action" href="javascript:void(0)">下载</a></div>'
                + '</section>'
                + '<section class="contract-detail-section">'
                + '<h2 class="contract-detail-heading">签署主体</h2>'
                + detailTable(
                    ['主体类型', '签署方角色', '签署方名称'],
                    [
                        { '主体类型': '法人', '签署方角色': '提供方', '签署方名称': row.seller },
                        { '主体类型': '法人', '签署方角色': '需求方', '签署方名称': row.buyer }
                    ]
                )
                + '</section>'
                + '<section class="contract-detail-section">'
                + '<h2 class="contract-detail-heading">合同流程</h2>'
                + '<table class="data-table monitor-detail-table contract-flow-table">'
                + '<thead><tr><th>合同流程ID</th><th>处理类型</th><th>处理方式</th><th>发起时间</th><th>发起方</th><th>流程状态</th><th>操作</th></tr></thead>'
                + '<tbody><tr>'
                + '<td><div class="monitor-ellipsis" title="' + escapeHTML(flowId) + '">' + escapeHTML(flowId.slice(0, 10)) + '...</div></td>'
                + '<td>合同签署</td><td>' + escapeHTML(row.signMode) + '</td><td>' + escapeHTML(row.signedAt) + ' ...</td><td>提供方</td>'
                + '<td><span class="monitor-flow-status success"><i></i>' + escapeHTML(row.status || '已签署') + '</span></td>'
                + '<td><a class="monitor-table-action" href="javascript:void(0)" data-contract-flow-detail>详情</a></td>'
                + '</tr></tbody>'
                + '</table>'
                + '</section>'
        };
    }

    function renderContractFlowModal() {
        return {
            title: '流程详情',
            body: '<section class="contract-modal-section">'
                + '<h3>流程信息</h3>'
                + '<div class="contract-modal-grid">'
                + detailField('流程ID', '6d4ccb6a5521459bb05f48ae4417b03a')
                + detailField('处理类型', '合同签署')
                + detailField('处理方式', '线下签署')
                + detailField('流程状态', '已签署')
                + detailField('当前节点', '已完成签署')
                + detailField('发起时间', '2026-06-04')
                + detailField('签署截止时间', '--')
                + detailField('结束时间', '2026-06-04')
                + detailField('外部流程ID', '--')
                + '</div>'
                + '</section>'
                + '<section class="contract-modal-section">'
                + '<h3>流程日志</h3>'
                + detailTable(
                    ['流程节点', '操作人角色', '操作结果', '操作时间', '操作意见'],
                    [
                        { '流程节点': '已完成签署', '操作人角色': '需方', '操作结果': '通过（线下签署）', '操作时间': '2026-06-04 19:48:50', '操作意见': '--' },
                        { '流程节点': '发起签署', '操作人角色': '供方', '操作结果': '已发起', '操作时间': '2026-06-04 19:47:57', '操作意见': '--' }
                    ]
                )
                + '</section>'
        };
    }

    function renderUsageDetail(row) {
        var calls = [
            { '序号': '1', '账单编号': row.billNo, '调用IP': '172.16.244.23', '调用时间': '2026-06-01 16:58:33', '返回状态': '调用失败', '返回数据量': '246B' },
            { '序号': '2', '账单编号': row.billNo, '调用IP': '172.16.244.23', '调用时间': '2026-06-01 16:45:22', '返回状态': '调用成功', '返回数据量': '3.65KB' },
            { '序号': '3', '账单编号': row.billNo, '调用IP': '172.16.244.23', '调用时间': '2026-06-01 16:41:32', '返回状态': '调用成功', '返回数据量': '3.65KB' },
            { '序号': '4', '账单编号': row.billNo, '调用IP': '172.16.244.23', '调用时间': '2026-06-01 16:36:46', '返回状态': '调用成功', '返回数据量': '3.65KB' },
            { '序号': '5', '账单编号': row.billNo, '调用IP': '172.16.244.23', '调用时间': '2026-06-01 16:36:21', '返回状态': '调用成功', '返回数据量': '3.65KB' },
            { '序号': '6', '账单编号': row.billNo, '调用IP': '172.16.244.23', '调用时间': '2026-06-01 16:12:55', '返回状态': '调用成功', '返回数据量': '3.66KB' }
        ];
        return {
            title: '用量明细',
            size: 'narrow',
            body: '<div class="bill-usage-table-card">'
                + '<table class="data-table monitor-log-table bill-usage-table">'
                + '<thead><tr><th>序号</th><th>账单编号</th><th>调用IP</th><th>调用时间</th><th>返回状态</th><th>返回数据量</th></tr></thead>'
                + '<tbody>' + calls.map(function (call) {
                    var tone = call['返回状态'] === '调用失败' ? 'danger' : 'success';
                    return '<tr>'
                        + '<td>' + escapeHTML(call['序号']) + '</td>'
                        + '<td><div class="monitor-ellipsis" title="' + escapeHTML(call['账单编号']) + '">' + escapeHTML(call['账单编号']) + '</div></td>'
                        + '<td>' + escapeHTML(call['调用IP']) + '</td>'
                        + '<td>' + escapeHTML(call['调用时间']) + '</td>'
                        + '<td><span class="monitor-flow-status ' + tone + '"><i></i>' + escapeHTML(call['返回状态']) + '</span></td>'
                        + '<td>' + escapeHTML(call['返回数据量']) + '</td>'
                        + '</tr>';
                }).join('') + '</tbody>'
                + '</table>'
                + '<div class="monitor-log-pagination"><span>共 6 条</span><button class="page-btn ghost">‹</button><button class="page-btn active">1</button><button class="page-btn ghost">›</button><select class="page-size-select"><option>10 条/页</option></select><span>前往</span><input class="page-jumper" type="text"></div>'
                + '</div>'
        };
    }

    function renderBillDetailFields(fields) {
        return '<div class="supplier-bill-detail-grid">' + fields.map(function (field) {
            return '<div class="supplier-bill-detail-field">'
                + '<span class="supplier-bill-detail-label">' + escapeHTML(field.label) + '：</span>'
                + '<span class="supplier-bill-detail-value">' + (field.html || escapeHTML(field.value || '--')) + '</span>'
                + '</div>';
        }).join('') + '</div>';
    }

    function renderBillDetailSection(title, content) {
        return '<section class="supplier-bill-detail-section">'
            + '<h3>' + escapeHTML(title) + '</h3>'
            + content
            + '</section>';
    }

    function renderBillDetailStatus(text, tone) {
        return '<span class="supplier-bill-detail-status' + (tone ? ' ' + tone : '') + '"><i></i>' + escapeHTML(text) + '</span>';
    }

    function getBillStageTone(status) {
        if (status === '已支付' || status === '支付成功' || status === '分账成功') return 'success';
        if (String(status || '').indexOf('待支付') === 0 || status === '分账处理中') return 'waiting';
        return '';
    }

    function renderBillStagePayment(stage) {
        if (!stage.payment) {
            return '<div class="supplier-bill-stage-empty">尚未发起支付</div>';
        }
        return '<div class="supplier-bill-stage-grid">'
            + '<div><span>支付流水号</span><strong>' + escapeHTML(stage.payment.paymentNo) + '</strong></div>'
            + '<div><span>实付金额</span><strong>¥' + escapeHTML(stage.payment.amount) + '</strong></div>'
            + '<div><span>支付渠道</span><strong>' + escapeHTML(stage.payment.channel) + '</strong></div>'
            + '<div><span>支付时间</span><strong>' + escapeHTML(stage.payment.paidAt) + '</strong></div>'
            + '<div><span>支付状态</span><strong>' + renderBillDetailStatus(stage.payment.status, getBillStageTone(stage.payment.status)) + '</strong></div>'
            + '</div>';
    }

    function renderBillStageSplit(stage) {
        var split = stage.payment && stage.payment.split;
        if (!split) {
            return '<div class="supplier-bill-stage-empty">当前期次尚未支付，暂未触发分账</div>';
        }
        return '<div class="supplier-bill-stage-grid is-split">'
            + '<div><span>平台服务费</span><strong>¥' + escapeHTML(split.fee) + '</strong></div>'
            + '<div><span>供方分账金额</span><strong class="is-money">¥' + escapeHTML(split.netAmount) + '</strong></div>'
            + '<div><span>外部分账流水号</span><strong>' + escapeHTML(split.outTraceNo) + '</strong></div>'
            + '<div><span>分账接收方编号</span><strong>' + escapeHTML(split.receiverId) + '</strong></div>'
            + '<div><span>分账状态</span><strong>' + renderBillDetailStatus(split.status, getBillStageTone(split.status)) + '</strong></div>'
            + '<div><span>最近查询时间</span><strong>' + escapeHTML(split.queriedAt) + '</strong></div>'
            + '</div>';
    }

    function renderBillPaymentStage(stage, index, total, includeSplit) {
        var stageLabel = total === 1 ? '一次性付款' : '第' + (index + 1) + '/' + total + '期';
        return '<article class="supplier-bill-payment-stage' + (stage.current ? ' is-current' : '') + '">'
            + '<header class="supplier-bill-payment-stage-head">'
            +   '<div><span>' + escapeHTML(stageLabel) + '</span><strong>' + escapeHTML(stage.name) + '</strong></div>'
            +   '<div class="supplier-bill-payment-stage-tags">' + (stage.current ? '<em>当前账单</em>' : '') + renderBillDetailStatus(stage.status, getBillStageTone(stage.status)) + '</div>'
            + '</header>'
            + '<div class="supplier-bill-stage-summary">'
            +   '<div><span>付款比例</span><strong>' + escapeHTML(stage.percent || '--') + '</strong></div>'
            +   '<div><span>应付金额</span><strong>¥' + escapeHTML(stage.amount) + '</strong></div>'
            +   '<div><span>付款节点</span><strong>' + escapeHTML(stage.node || '--') + '</strong></div>'
            + '</div>'
            + '<div class="supplier-bill-stage-block"><h4>支付记录</h4>' + renderBillStagePayment(stage) + '</div>'
            + (includeSplit ? '<div class="supplier-bill-stage-block is-split"><h4>分账信息</h4>' + renderBillStageSplit(stage) + '</div>' : '')
            + '</article>';
    }

    function getFallbackBillPaymentStages(row) {
        var hasPaid = row.paidAt && row.paidAt !== '--';
        var amount = Number(String(row.amount || '0').replace(/,/g, '')) || 0;
        var selfOperated = row.seller === PLATFORM_OPERATOR_NAME;
        var serviceFeeMode = row.serviceFeeMode === 'G' ? 'G' : 'P';
        var configuredServiceFeeValue = Number(row.serviceFeeValue);
        var legacyServiceFeeRate = Number(row.serviceFeeRate);
        var serviceFeeValue = selfOperated
            ? 0
            : (Number.isFinite(configuredServiceFeeValue) ? configuredServiceFeeValue : (Number.isFinite(legacyServiceFeeRate) ? legacyServiceFeeRate : 3));
        var serviceFee = serviceFeeMode === 'G' ? serviceFeeValue : amount * serviceFeeValue / 100;
        var digits = String(row.billNo || row.orderNo || '').replace(/\D/g, '');
        var payment = null;

        if (hasPaid) {
            payment = {
                paymentNo: 'PAY' + (digits.slice(-20) || '20260723000000000001') + 'P00',
                amount: amount.toFixed(2),
                channel: '统一支付平台',
                paidAt: row.paidAt,
                status: '支付成功'
            };
            if (!selfOperated) {
                payment.split = {
                    fee: serviceFee.toFixed(2),
                    netAmount: Math.max(0, amount - serviceFee).toFixed(2),
                    outTraceNo: 'PS' + (digits.slice(-17) || '20260723000000001'),
                    receiverId: row.receiverId || 'RCV-202607-00986',
                    appliedAt: row.paidAt,
                    queriedAt: row.paidAt,
                    status: '分账成功'
                };
            }
        }

        return [{
            name: '一次性付款',
            percent: '100%',
            amount: row.amount,
            node: '订单提交并完成合同签署后',
            status: hasPaid ? '已支付' : row.status,
            current: true,
            payment: payment
        }];
    }

    function renderBillPaymentDetail(row) {
        var stages = row.paymentStages || getFallbackBillPaymentStages(row);
        var includeSplit = row.seller !== PLATFORM_OPERATOR_NAME;
        return '<div class="supplier-bill-payment-groups">' + stages.map(function (stage, index) {
            return renderBillPaymentStage(stage, index, stages.length, includeSplit);
        }).join('') + '</div>';
    }

    function renderBillFlowDetail(row) {
        var stages = row.paymentStages || getFallbackBillPaymentStages(row);
        var rows = [
            { operator: '系统自动', type: '生成账单', result: '成功', content: '--', time: row.createdAt }
        ];

        stages.forEach(function (stage) {
            if (!stage.payment) return;
            rows.push({ operator: row.buyer || '--', type: '支付账单', result: '成功', content: stage.name, time: stage.payment.paidAt });
            rows.push({ operator: '统一支付平台', type: '查询支付结果', result: stage.payment.status, content: stage.payment.paymentNo, time: stage.payment.paidAt });
            if (stage.payment.split) {
                rows.push({ operator: '统一支付平台', type: '执行分账', result: stage.payment.split.status, content: '供方到账 ¥' + stage.payment.split.netAmount, time: stage.payment.split.appliedAt });
            }
        });

        if (rows.length === 1 && row.status === '待支付确认') {
            rows.push({ operator: row.buyer || '--', type: '提交支付凭证', result: '成功', content: '等待收款方确认', time: row.createdAt });
        } else if (rows.length === 1 && row.status === '待供方确认') {
            rows.push({ operator: row.buyer || '--', type: '提交账单确认', result: '成功', content: '等待供方确认', time: row.createdAt });
        } else if (rows.length === 1 && row.status === '待需方确认') {
            rows.push({ operator: row.seller || '--', type: '提交账单确认', result: '成功', content: '等待需方确认', time: row.createdAt });
        }

        return '<div class="supplier-bill-detail-table-scroll is-flow">'
            + '<table class="supplier-bill-detail-table">'
            + '<thead><tr><th>操作者</th><th>操作类型</th><th>操作结果</th><th>内容</th><th>操作时间</th></tr></thead>'
            + '<tbody>' + rows.map(function (item) {
                return '<tr><td>' + escapeHTML(item.operator) + '</td><td>' + escapeHTML(item.type) + '</td><td>' + escapeHTML(item.result) + '</td><td>' + escapeHTML(item.content) + '</td><td>' + escapeHTML(item.time) + '</td></tr>';
            }).join('') + '</tbody></table></div>';
    }

    function renderBillDetail(row) {
        return {
            title: '账单详情',
            drawerClass: 'bill-detail-reference',
            body: renderBillDetailSection('订单信息', renderBillDetailFields([
                { label: '订单编号', value: row.orderNo },
                { label: '交易标的', value: row.target },
                { label: '业务类型', value: row.businessType },
                { label: '标的类型', value: row.targetType },
                { label: '需求方', value: row.buyer },
                { label: '提供方', value: row.seller },
                { label: '付费方式', value: row.payMode },
                { label: '计量方式', value: row.measureMode },
                { label: '价格', value: row.price },
                { label: '订单金额', value: '¥' + (row.orderAmount || row.amount) },
                { label: '购买数量', value: row.quantity }
            ]))
            + renderBillDetailSection('账单信息', renderBillDetailFields([
                { label: '账单编号', value: row.billNo },
                { label: '账单状态', html: '<span class="supplier-order-status">' + escapeHTML(row.status) + '</span>' },
                { label: '账单金额', value: '¥' + row.amount },
                { label: '账单生成时间', value: row.createdAt },
                { label: '付款期次', value: row.period },
                { label: '还款时间', value: row.repayAt || row.repaymentAt },
                { label: '付款时间', value: row.paidAt }
            ]))
            + renderBillDetailSection('支付信息', renderBillPaymentDetail(row))
            + renderBillDetailSection('流程动态', renderBillFlowDetail(row))
        };
    }

    function renderDefaultDetail(page, row, actionLabel) {
        return {
            title: actionLabel || '详情',
            body: detailSection('基本信息', detailGrid(rowBaseFields(page, row)))
        };
    }

    function getDrawerPayload(page, row, actionLabel) {
        if (actionLabel === '日志') {
            if (page.layout === 'listingMonitor') return renderListingLog(page, row);
            return renderCatalogLog(page, row);
        }
        if (actionLabel === '用量明细') return renderUsageDetail(row);
        if (actionLabel === '账单详情') return renderBillDetail(row);
        if (page.activeTitle === '交易合同监测') return renderContractDetail(row);
        if (page.activeTitle === '交付任务日志') return renderDeliveryLogDetail(row);
        return renderDefaultDetail(page, row, actionLabel);
    }

    function renderDrawer(root, page, row, actionLabel) {
        var payload = getDrawerPayload(page, row, actionLabel);
        var drawerMask = root.querySelector('[data-monitor-drawer]');
        root.querySelector('[data-drawer-title]').textContent = payload.title;
        root.querySelector('[data-drawer-body]').innerHTML = payload.body;
        drawerMask.classList.remove('narrow', 'wide', 'bill-detail-reference');
        if (payload.size) drawerMask.classList.add(payload.size);
        if (payload.drawerClass) drawerMask.classList.add(payload.drawerClass);
        drawerMask.classList.add('show');
    }

    function closeDrawer(root) {
        root.querySelector('[data-monitor-drawer]').classList.remove('show');
    }

    function renderSubDrawer(root, payload) {
        var drawerMask = root.querySelector('[data-monitor-sub-drawer]');
        root.querySelector('[data-sub-drawer-title]').textContent = payload.title;
        root.querySelector('[data-sub-drawer-body]').innerHTML = payload.body;
        drawerMask.classList.remove('narrow', 'wide');
        if (payload.size) drawerMask.classList.add(payload.size);
        drawerMask.classList.add('show');
    }

    function closeSubDrawer(root) {
        root.querySelector('[data-monitor-sub-drawer]').classList.remove('show');
    }

    function renderModal(root, payload) {
        root.querySelector('[data-modal-title]').textContent = payload.title;
        root.querySelector('[data-modal-body]').innerHTML = payload.body;
        root.querySelector('[data-monitor-modal]').classList.add('show');
    }

    function closeModal(root) {
        root.querySelector('[data-monitor-modal]').classList.remove('show');
    }

    function renderCell(page, column, row, rowIndex) {
        if (column.key === '__actions') {
            var actions = row.actions || [];
            if (!actions.length) return '';
            return actions.map(function (label) {
                if (page.detailUrl && label === '详情') {
                    return '<a class="monitor-table-action" href="' + escapeHTML(page.detailUrl) + '?taskNo=' + encodeURIComponent(row.taskNo || '') + '">' + escapeHTML(label) + '</a>';
                }
                return '<a class="monitor-table-action" href="javascript:void(0)" data-row-index="' + rowIndex + '" data-row-action="' + escapeHTML(label) + '">'
                    + escapeHTML(label) + '</a>';
            }).join('');
        }

        if (column.key === 'operationType') {
            var operationType = getOperationType(row);
            return '<span class="monitor-status ' + (operationType === '自营' ? 'success' : 'info') + '">' + operationType + '</span>';
        }
        var value = row[column.key] || '--';
        if (column.status) {
            if (page.layout === 'billMonitor') {
                return '<span class="supplier-order-status">' + escapeHTML(value) + '</span>';
            }
            if (page.statusMode === 'dot') {
                return '<span class="monitor-flow-status ' + statusDotTone(page, value) + '"><i></i>' + escapeHTML(value) + '</span>';
            }
            return '<span class="monitor-status ' + statusTone(value) + '">' + escapeHTML(value) + '</span>';
        }
        if (page.activeTitle === '交易合同监测' && column.key === 'orderCount') {
            return '<span class="monitor-version-link">' + escapeHTML(value) + '</span>';
        }
        if (page.activeTitle === '交易账单监测' && column.key === 'orderNo') {
            return '<span class="monitor-version-link"><span class="monitor-ellipsis">' + escapeHTML(value) + '</span></span>';
        }
        if (column.primary) {
            return '<div class="text-main" title="' + escapeHTML(value) + '">' + escapeHTML(value) + '</div>';
        }
        if (column.ellipsis) {
            return '<div class="monitor-ellipsis" title="' + escapeHTML(value) + '">' + escapeHTML(value) + '</div>';
        }
        return escapeHTML(value);
    }

    function getBillTableCellClass(page, column) {
        if (page.layout !== 'billMonitor') return '';
        if (column.key === 'status') return 'monitor-bill-status-cell';
        if (column.key === '__actions') return 'monitor-bill-action-cell';
        return 'monitor-bill-col-' + column.key.replace(/^_+/, '').replace(/[A-Z]/g, function (char) {
            return '-' + char.toLowerCase();
        });
    }

    function getBillPaginationItems(currentPage, pageCount) {
        var items = [];
        var start;
        var end;
        var page;
        if (pageCount <= 7) {
            for (page = 1; page <= pageCount; page += 1) items.push(page);
            return items;
        }

        items.push(1);
        start = Math.max(2, currentPage - 1);
        end = Math.min(pageCount - 1, currentPage + 1);
        if (start > 2) items.push('left-ellipsis');
        for (page = start; page <= end; page += 1) items.push(page);
        if (end < pageCount - 1) items.push('right-ellipsis');
        items.push(pageCount);
        return items;
    }

    function updateBillPagination(root, total, state) {
        var pageCount = Math.max(1, Math.ceil(total / state.pageSize));
        state.pageNumber = Math.max(1, Math.min(state.pageNumber, pageCount));
        var totalNode = root.querySelector('[data-monitor-pagination-total]');
        var pagesNode = root.querySelector('[data-monitor-pagination-pages]');
        var prevButton = root.querySelector('[data-monitor-pagination-prev]');
        var nextButton = root.querySelector('[data-monitor-pagination-next]');
        if (totalNode) totalNode.textContent = '共 ' + total + ' 条';
        if (pagesNode) {
            pagesNode.innerHTML = getBillPaginationItems(state.pageNumber, pageCount).map(function (item) {
                if (typeof item === 'string') return '<span class="monitor-pagination-ellipsis">•••</span>';
                return '<button class="page-btn' + (item === state.pageNumber ? ' active' : '') + '" type="button" data-monitor-pagination-page="' + item + '">' + item + '</button>';
            }).join('');
        }
        if (prevButton) prevButton.disabled = state.pageNumber <= 1;
        if (nextButton) nextButton.disabled = state.pageNumber >= pageCount;
    }

    function renderTable(root, page, state) {
        var filteredRows = getRows(page, state, root);
        var rows = filteredRows;
        var body = root.querySelector('[data-monitor-table-body]');
        var meta = root.querySelector('[data-monitor-table-meta]');
        var checkAll = root.querySelector('[data-monitor-check-all]');
        var columnCount = page.columns.length + (page.selectable ? 1 : 0);
        var html = '';

        if (page.layout === 'billMonitor') {
            var pageCount = Math.max(1, Math.ceil(filteredRows.length / state.pageSize));
            state.pageNumber = Math.max(1, Math.min(state.pageNumber, pageCount));
            var start = (state.pageNumber - 1) * state.pageSize;
            rows = filteredRows.slice(start, start + state.pageSize);
        }

        if (checkAll) checkAll.checked = false;

        if (rows.length) {
            html = rows.map(function (row) {
                var rowIndex = page.rows.indexOf(row);
                return '<tr>' + (page.selectable ? '<td class="monitor-selection-col"><input class="monitor-check" type="checkbox" data-monitor-row-check></td>' : '') + page.columns.map(function (column) {
                    var cellClass = getBillTableCellClass(page, column);
                    return '<td' + (cellClass ? ' class="' + cellClass + '"' : '') + '>' + renderCell(page, column, row, rowIndex) + '</td>';
                }).join('') + '</tr>';
            }).join('');
        } else {
            html = '<tr><td class="monitor-empty" colspan="' + columnCount + '">暂无数据</td></tr>';
        }

        body.innerHTML = html;
        meta.textContent = '共 ' + filteredRows.length + ' 条';
        if (page.layout === 'billMonitor') updateBillPagination(root, filteredRows.length, state);
    }

    function renderPagination(page) {
        var total = Number(page.total || page.rows.length);
        if (page.layout === 'billMonitor') {
            return '<div class="pagination-bar" data-monitor-pagination>'
                + '<span class="pagination-info" data-monitor-pagination-total>共 ' + escapeHTML(total) + ' 条</span>'
                + '<button class="page-btn ghost" type="button" data-monitor-pagination-prev aria-label="上一页">‹</button>'
                + '<span class="monitor-pagination-pages" data-monitor-pagination-pages></span>'
                + '<button class="page-btn ghost" type="button" data-monitor-pagination-next aria-label="下一页">›</button>'
                + '<select class="page-size-select" data-monitor-page-size aria-label="每页条数"><option value="10">10 条/页</option><option value="20">20 条/页</option><option value="30">30 条/页</option><option value="40">40 条/页</option><option value="50">50 条/页</option></select>'
                + '<span class="pagination-info">前往</span><input class="page-jumper" type="number" min="1" data-monitor-page-jumper aria-label="跳转页码"></div>';
        }
        var pageCount = Math.max(1, Math.ceil(total / 10));
        var visibleCount = Math.min(pageCount, 9);
        var pages = [];
        var i;
        for (i = 1; i <= visibleCount; i += 1) {
            pages.push('<button class="page-btn' + (i === 1 ? ' active' : '') + '">' + i + '</button>');
        }
        return '<div class="pagination-bar"><span class="pagination-info">共 ' + escapeHTML(total) + ' 条</span>'
            + '<button class="page-btn ghost">‹</button>'
            + pages.join('')
            + '<button class="page-btn ghost">›</button>'
            + '<select class="page-size-select"><option>10 条/页</option><option>20 条/页</option><option>30 条/页</option><option>40 条/页</option><option>50 条/页</option></select>'
            + '<span class="pagination-info">前往</span><input class="page-jumper" type="text" value=""></div>';
    }

    function renderPage(root, pageKey) {
        var page = PAGES[pageKey];
        if (!page) return;
        var params = new URLSearchParams(window.location.search || '');
        var state = {
            tabValue: page.tabs && page.tabs.length ? page.tabs[0].value : 'all',
            pageNumber: 1,
            pageSize: 10
        };
        var tabParam = page.tabKey ? params.get(page.tabKey) : '';
        if (page.tabs && page.tabs.length && tabParam) {
            var matchedTab = page.tabs.find(function (tab) {
                return tab.value === tabParam;
            });
            if (matchedTab) state.tabValue = matchedTab.value;
        }

        document.title = page.activeTitle + ' - 龙岗数据聚合服务平台';
        var isDeliveryTaskPage = page.layout === 'deliveryTask';
        var filterHtml = isDeliveryTaskPage
            ? renderDeliveryTaskFilters(page)
            : (page.layout === 'resourceCatalog'
            ? renderResourceCatalogFilters(page)
            : (page.layout === 'listingMonitor'
                ? renderListingMonitorFilters(page)
                : (page.layout === 'authMonitor'
                    ? renderAuthMonitorFilters(page)
                    : (page.layout === 'contractMonitor'
                        ? renderContractMonitorFilters(page)
                        : (page.layout === 'billMonitor'
                            ? renderBillMonitorFilters(page)
                            : '<div class="filter-bar" style="margin-bottom:0;">' + renderFilters(page.filters || []) + '</div>')))));
        root.innerHTML = ''
            + (isDeliveryTaskPage
                ? renderDeliveryTaskHeader(page) + renderDeliveryTaskOverview(page)
                : '<div class="monitor-page-head">'
                    + '<h1 class="monitor-page-title">' + escapeHTML(page.title) + '</h1>'
                    + (page.layout === 'resourceCatalog' || page.layout === 'listingMonitor' || page.layout === 'authMonitor' || page.layout === 'contractMonitor' || page.layout === 'billMonitor' ? '' : '<div class="monitor-page-actions">' + renderActions(page.actions || []) + '</div>')
                    + '</div>'
                    + renderStats(page.stats))
            + (page.layout === 'listingMonitor' ? '' : renderTabs(page))
            + filterHtml
            + '<div class="monitor-table-card"><div class="monitor-table-meta" data-monitor-table-meta style="display:none;">共 0 条</div><div class="monitor-table-scroll"' + (page.layout === 'billMonitor' ? ' aria-label="交易账单列表，可横向滚动"' : '') + '><table class="data-table monitor-table"><thead><tr>'
            + (page.selectable ? '<th class="monitor-selection-col"><input class="monitor-check" type="checkbox" data-monitor-check-all></th>' : '')
            + page.columns.map(function (column) {
                var cellClass = getBillTableCellClass(page, column);
                return '<th' + (cellClass ? ' class="' + cellClass + '"' : '') + '>' + escapeHTML(column.label) + '</th>';
            }).join('')
            + '</tr></thead><tbody data-monitor-table-body></tbody></table></div>'
            + renderPagination(page) + '</div>'
            + '<div class="monitor-drawer-mask" data-monitor-drawer><div class="monitor-drawer" role="dialog" aria-modal="true"><div class="monitor-drawer-head"><div class="monitor-drawer-title" data-drawer-title>详情</div><button class="monitor-drawer-close" type="button" data-drawer-close aria-label="关闭">' + ICONS.close + '</button></div><div class="monitor-drawer-body" data-drawer-body></div></div></div>'
            + '<div class="monitor-drawer-mask sub" data-monitor-sub-drawer><div class="monitor-drawer" role="dialog" aria-modal="true"><div class="monitor-drawer-head"><div class="monitor-drawer-title" data-sub-drawer-title>详情</div><button class="monitor-drawer-close" type="button" data-sub-drawer-close aria-label="关闭">' + ICONS.close + '</button></div><div class="monitor-drawer-body" data-sub-drawer-body></div></div></div>'
            + '<div class="monitor-modal-mask" data-monitor-modal><div class="monitor-modal" role="dialog" aria-modal="true"><div class="monitor-modal-head"><div class="monitor-modal-title" data-modal-title>详情</div><button class="monitor-drawer-close" type="button" data-modal-close aria-label="关闭">' + ICONS.close + '</button></div><div class="monitor-modal-body" data-modal-body></div></div></div>';

        root.querySelectorAll('[data-tab-value]').forEach(function (tab) {
            tab.classList.toggle('active', tab.getAttribute('data-tab-value') === state.tabValue);
        });

        root.querySelectorAll('[data-monitor-filter]').forEach(function (select) {
            var key = select.getAttribute('data-monitor-filter');
            var value = params.get(key);
            var filter = (page.filters || []).find(function (item) {
                return item.key === key;
            });
            if ((!value || value === '全部') && filter && filter.defaultValue) {
                value = filter.defaultValue;
            }
            if (!value || value === '全部') return;
            var option = Array.prototype.find.call(select.options, function (item) {
                return item.value === value;
            });
            if (!option) {
                option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                select.appendChild(option);
            }
            select.value = value;
        });

        var startAt = params.get('startAt');
        var endAt = params.get('endAt');
        var dateControl = root.querySelector('[data-monitor-date-key="createdAt"]');
        if (dateControl) {
            var startInput = dateControl.querySelector('[data-monitor-date-start]');
            var endInput = dateControl.querySelector('[data-monitor-date-end]');
            if (startInput && startAt) startInput.value = toMonitorDateTimeLocal(startAt);
            if (endInput && endAt) endInput.value = toMonitorDateTimeLocal(endAt);
        }

        renderTable(root, page, state);

        root.querySelectorAll('[data-tab-value]').forEach(function (tab) {
            tab.addEventListener('click', function () {
                root.querySelectorAll('[data-tab-value]').forEach(function (item) {
                    item.classList.remove('active');
                });
                tab.classList.add('active');
                state.tabValue = tab.getAttribute('data-tab-value');
                renderTable(root, page, state);
            });
        });

        var searchBtn = root.querySelector('[data-monitor-search-btn]');
        if (searchBtn) {
            searchBtn.addEventListener('click', function () {
                var range = getMonitorDateRange(root.querySelector('[data-monitor-date-key="createdAt"]'));
                if (range && range.invalid) {
                    if (window.GlobalDialog) {
                        window.GlobalDialog.info({
                            title: '时间范围有误',
                            desc: '开始时间不能晚于结束时间，请重新选择。',
                            duration: 1800
                        });
                    }
                    return;
                }
                state.pageNumber = 1;
                renderTable(root, page, state);
            });
        }

        var keywordInput = root.querySelector('[data-monitor-search]');
        if (keywordInput) {
            keywordInput.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    state.pageNumber = 1;
                    renderTable(root, page, state);
                }
            });
        }

        root.querySelectorAll('[data-monitor-filter]').forEach(function (select) {
            select.addEventListener('change', function () {
                state.pageNumber = 1;
                renderTable(root, page, state);
            });
        });

        var resetBtn = root.querySelector('[data-monitor-reset-btn]');
        if (resetBtn) {
            resetBtn.addEventListener('click', function () {
                var search = root.querySelector('[data-monitor-search]');
                if (search) search.value = '';
                root.querySelectorAll('[data-monitor-filter]').forEach(function (select) {
                    select.selectedIndex = 0;
                });
                root.querySelectorAll('[data-monitor-date]').forEach(function (input) {
                    input.value = '';
                });
                state.pageNumber = 1;
                renderTable(root, page, state);
            });
        }

        var pageSizeSelect = root.querySelector('[data-monitor-page-size]');
        if (pageSizeSelect) {
            pageSizeSelect.addEventListener('change', function () {
                state.pageSize = Number(pageSizeSelect.value) || 10;
                state.pageNumber = 1;
                renderTable(root, page, state);
            });
        }

        var paginationPages = root.querySelector('[data-monitor-pagination-pages]');
        if (paginationPages) {
            paginationPages.addEventListener('click', function (event) {
                var button = event.target.closest('[data-monitor-pagination-page]');
                if (!button) return;
                state.pageNumber = Number(button.getAttribute('data-monitor-pagination-page')) || 1;
                renderTable(root, page, state);
            });
        }

        var paginationPrev = root.querySelector('[data-monitor-pagination-prev]');
        if (paginationPrev) {
            paginationPrev.addEventListener('click', function () {
                if (state.pageNumber <= 1) return;
                state.pageNumber -= 1;
                renderTable(root, page, state);
            });
        }

        var paginationNext = root.querySelector('[data-monitor-pagination-next]');
        if (paginationNext) {
            paginationNext.addEventListener('click', function () {
                var total = getRows(page, state, root).length;
                var pageCount = Math.max(1, Math.ceil(total / state.pageSize));
                if (state.pageNumber >= pageCount) return;
                state.pageNumber += 1;
                renderTable(root, page, state);
            });
        }

        var pageJumper = root.querySelector('[data-monitor-page-jumper]');
        if (pageJumper) {
            pageJumper.addEventListener('keydown', function (event) {
                if (event.key !== 'Enter') return;
                var total = getRows(page, state, root).length;
                var pageCount = Math.max(1, Math.ceil(total / state.pageSize));
                state.pageNumber = Math.max(1, Math.min(Number(pageJumper.value) || 1, pageCount));
                pageJumper.value = '';
                renderTable(root, page, state);
            });
        }

        var checkAll = root.querySelector('[data-monitor-check-all]');
        if (checkAll) {
            checkAll.addEventListener('change', function () {
                root.querySelectorAll('[data-monitor-row-check]').forEach(function (checkbox) {
                    checkbox.checked = checkAll.checked;
                });
            });
        }

        root.addEventListener('click', function (event) {
            var contractFlowDetail = event.target.closest('[data-contract-flow-detail]');
            if (contractFlowDetail) {
                event.preventDefault();
                renderModal(root, renderContractFlowModal());
                return;
            }

            var listingDetail = event.target.closest('[data-listing-detail]');
            if (listingDetail) {
                event.preventDefault();
                var listingRow = page.rows[Number(listingDetail.getAttribute('data-row-index'))];
                if (page.activeTitle === '数据产品上架监测') {
                    window.location.href = buildProductListingDetailUrl(listingRow);
                    return;
                }
                renderSubDrawer(root, renderResourceListingDetail(page, listingRow));
                return;
            }

            var logDetail = event.target.closest('[data-log-detail]');
            if (logDetail) {
                event.preventDefault();
                var logRow = page.rows[Number(logDetail.getAttribute('data-row-index'))];
                renderSubDrawer(root, renderCatalogDirectoryDetail(page, logRow));
                return;
            }

            var catalogTab = event.target.closest('[data-catalog-detail-tab]');
            if (catalogTab) {
                var tabValue = catalogTab.getAttribute('data-catalog-detail-tab');
                root.querySelectorAll('[data-catalog-detail-tab]').forEach(function (tab) {
                    tab.classList.toggle('active', tab.getAttribute('data-catalog-detail-tab') === tabValue);
                });
                root.querySelectorAll('[data-catalog-detail-panel]').forEach(function (panel) {
                    panel.classList.toggle('hidden', panel.getAttribute('data-catalog-detail-panel') !== tabValue);
                });
                return;
            }

            var topAction = event.target.closest('[data-top-action]');
            if (topAction) {
                GlobalDialog.success({
                    title: topAction.getAttribute('data-top-action') + '成功',
                    duration: 1200
                });
                return;
            }

            var rowAction = event.target.closest('[data-row-action]');
            if (rowAction) {
                event.preventDefault();
                var row = page.rows[Number(rowAction.getAttribute('data-row-index'))];
                var actionLabel = rowAction.getAttribute('data-row-action');
                if (page.detailUrl && actionLabel === '详情') {
                    window.location.href = page.detailUrl + '?taskNo=' + encodeURIComponent(row.taskNo || '');
                    return;
                }
                renderDrawer(root, page, row, actionLabel);
            }
        });

        root.querySelector('[data-drawer-close]').addEventListener('click', function () {
            closeDrawer(root);
        });

        root.querySelector('[data-sub-drawer-close]').addEventListener('click', function () {
            closeSubDrawer(root);
        });

        root.querySelector('[data-modal-close]').addEventListener('click', function () {
            closeModal(root);
        });

        root.querySelector('[data-monitor-drawer]').addEventListener('click', function (event) {
            if (event.target === event.currentTarget) {
                closeDrawer(root);
            }
        });

        root.querySelector('[data-monitor-sub-drawer]').addEventListener('click', function (event) {
            if (event.target === event.currentTarget) {
                closeSubDrawer(root);
            }
        });

        root.querySelector('[data-monitor-modal]').addEventListener('click', function (event) {
            if (event.target === event.currentTarget) {
                closeModal(root);
            }
        });
    }

    function init() {
        document.querySelectorAll('[data-monitor-page]').forEach(function (root) {
            renderPage(root, root.getAttribute('data-monitor-page'));
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
