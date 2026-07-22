(function () {
    var STATUS_TABS = [
        '全部',
        '订单退回',
        '关联审批中',
        '关联合同签署中',
        '待支付',
        '解除审批中',
        '已解除关联',
        '待交付',
        '待确认交付',
        '交易完成'
    ];

    var ONLINE_CHANNELS = [
        { key: 'wechat', label: '微信支付', mode: 'scan', tip: '请使用微信扫一扫完成支付' },
        { key: 'alipay', label: '支付宝', mode: 'scan', tip: '请使用支付宝扫一扫完成支付' },
        { key: 'unionpay', label: '云闪付', mode: 'scan', tip: '请使用云闪付扫一扫完成支付' },
        { key: 'bank', label: '网银支付', mode: 'web', tip: '将前往银行支付页面完成付款' }
    ];

    var ONLINE_BANKS = [
        { code: 'CMB', label: '招商银行' },
        { code: 'CCB', label: '中国建设银行' }
    ];

    var ORDER_RECORDS = [
        {
            orderNo: '2026070111185071000000101148100',
            orderType: '常规订单',
            name: '龙岗企业经营画像数据集',
            productType: '数据集',
            provider: '深圳市龙岗区数据服务中心',
            price: '100元/次',
            quantity: '1次',
            delivery: '文件传输',
            amount: '¥100',
            appliedAt: '2026-07-01 11:18:50',
            status: '待支付'
        },
        {
            orderNo: '2026063015392301900000101148229',
            orderType: '常规订单',
            name: '重点企业运行监测数据产品',
            productType: '数据产品',
            provider: '龙岗数科产业运营有限公司',
            price: '500元/天',
            quantity: '1天',
            delivery: 'API传输',
            amount: '¥500',
            appliedAt: '2026-06-30 15:39:23',
            status: '待支付'
        },
        {
            orderNo: '2026062710461803600000101148397',
            orderType: '常规订单',
            name: '龙岗区区域交通拥堵指数服务',
            productType: '数据产品',
            provider: '深圳市龙岗区政务数据中心',
            price: '22元/天',
            quantity: '7天',
            delivery: 'API传输',
            amount: '¥154',
            appliedAt: '2026-06-27 10:46:18',
            status: '待确认交付'
        },
        {
            orderNo: '2026062216553792300000101148580',
            orderType: '常规订单',
            name: '龙岗区产业经济运行监测数据产品',
            productType: '数据产品',
            provider: '深圳市龙岗区产业服务中心',
            price: '5000元/月',
            quantity: '2月',
            delivery: 'API传输',
            amount: '¥10000',
            appliedAt: '2026-06-22 16:55:37',
            status: '待交付'
        },
        {
            orderNo: '2026061710091960000000101148788',
            orderType: '常规订单',
            name: '龙岗区公共信用评价数据服务',
            productType: '数据产品',
            provider: '深圳市龙岗区政务数据中心',
            price: '80元/次',
            quantity: '1次',
            delivery: '文件传输',
            amount: '¥80',
            appliedAt: '2026-06-17 10:09:19',
            status: '交易完成'
        },
        {
            orderNo: '2026061014253600800000101148853',
            orderType: '常规订单',
            name: '龙岗区中小微企业扶持政策匹配数据集',
            productType: '数据集',
            provider: '龙岗区企业服务集团有限公司',
            price: '50元/次',
            quantity: '5次',
            delivery: 'API传输',
            amount: '¥250',
            appliedAt: '2026-06-10 14:25:36',
            status: '关联合同签署中'
        },
        {
            orderNo: '2026060409472105400000101148980',
            orderType: '常规订单',
            name: '龙岗企业经营风险监测数据集',
            productType: '数据集',
            provider: '深圳市企业征信服务有限公司',
            price: '100元/次',
            quantity: '1次',
            delivery: '文件传输',
            amount: '¥100',
            appliedAt: '2026-06-04 09:47:21',
            status: '关联审批中'
        },
        {
            orderNo: '2026052909094164400000101148208',
            orderType: '常规订单',
            name: '龙岗企业经营画像数据集清澜企服洞察版',
            productType: '数据集',
            provider: '清澜企业服务有限公司',
            price: '50元/次',
            quantity: '3次',
            delivery: 'API传输',
            amount: '¥150',
            appliedAt: '2026-05-29 09:09:41',
            status: '解除审批中'
        },
        {
            orderNo: '2026052614553110700000101148227',
            orderType: '常规订单',
            name: '园区企业基础登记信息数据产品',
            productType: '数据集',
            provider: '深圳市龙岗区政务数据中心',
            price: '100元/次',
            quantity: '1次',
            delivery: '文件传输',
            amount: '¥100',
            appliedAt: '2026-05-26 14:55:31',
            status: '已解除关联'
        },
        {
            orderNo: '2026052513560834600000101148520',
            orderType: '常规订单',
            name: '龙岗区商事主体活跃度数据集',
            productType: '数据集',
            provider: '深圳市商事数据服务有限公司',
            price: '60元/次',
            quantity: '1次',
            delivery: '文件传输',
            amount: '¥60',
            appliedAt: '2026-05-25 13:56:08',
            status: '订单退回'
        },
        {
            orderNo: '2026052116474151500000101148295',
            orderType: '常规订单',
            name: '园区企业经营趋势分析数据产品',
            productType: '数据产品',
            provider: '龙岗数智产业研究院',
            price: '200元/月',
            quantity: '3月',
            delivery: 'API传输',
            amount: '¥600',
            appliedAt: '2026-05-21 16:47:41',
            status: '交易完成'
        },
        {
            orderNo: '2026052016573802500000101148316',
            orderType: '常规订单',
            name: '龙岗区从业人员结构分析数据',
            productType: '数据产品',
            provider: '深圳市人力资源数据服务中心',
            price: '20元/次',
            quantity: '3次',
            delivery: 'API传输',
            amount: '¥60',
            appliedAt: '2026-05-20 16:57:38',
            status: '待确认交付'
        },
        {
            orderNo: '2026052016163306300000101148368',
            orderType: '常规订单',
            name: '龙岗区产业园区空间信息数据集',
            productType: '数据集',
            provider: '龙岗区产业空间服务有限公司',
            price: '10元/天',
            quantity: '3天',
            delivery: 'API传输',
            amount: '¥30',
            appliedAt: '2026-05-20 16:16:33',
            status: '待交付'
        },
        {
            orderNo: '2026051811161908400000101148421',
            orderType: '常规订单',
            name: '龙岗区企业信用基础数据集',
            productType: '数据集',
            provider: '深圳市公共信用中心',
            price: '100元/次',
            quantity: '1次',
            delivery: '文件传输',
            amount: '¥100',
            appliedAt: '2026-05-18 11:16:19',
            status: '交易完成'
        },
        {
            orderNo: '2026051811022804700000101148469',
            orderType: '常规订单',
            name: '龙岗区产业链企业关联数据产品',
            productType: '数据产品',
            provider: '龙岗区产业发展研究中心',
            price: '300元/月',
            quantity: '1月',
            delivery: 'API传输',
            amount: '¥300',
            appliedAt: '2026-05-18 11:02:28',
            status: '关联审批中'
        },
        {
            orderNo: '2026051810560507700000101148502',
            orderType: '常规订单',
            name: '龙岗区企业诉求热点分析数据集',
            productType: '数据集',
            provider: '深圳市政务服务数据中心',
            price: '100元/次',
            quantity: '1次',
            delivery: '文件传输',
            amount: '¥100',
            appliedAt: '2026-05-18 10:56:05',
            status: '订单退回'
        },
        {
            orderNo: '2026051517280209200000101148564',
            orderType: '常规订单',
            name: '龙岗区园区招商线索数据产品',
            productType: '数据产品',
            provider: '深圳市龙岗区招商服务中心',
            price: '120元/次',
            quantity: '2次',
            delivery: 'API传输',
            amount: '¥240',
            appliedAt: '2026-05-15 17:28:02',
            status: '待支付'
        },
        {
            orderNo: '2026051510091403300000101148608',
            orderType: '常规订单',
            name: '龙岗区重点项目进展数据集',
            productType: '数据集',
            provider: '龙岗区重点项目服务中心',
            price: '100元/次',
            quantity: '1次',
            delivery: '文件传输',
            amount: '¥100',
            appliedAt: '2026-05-15 10:09:14',
            status: '交易完成'
        },
        {
            orderNo: '2026050816181602600000101148663',
            orderType: '常规订单',
            name: '龙岗区产业用房供需监测数据产品',
            productType: '数据产品',
            provider: '龙岗区产业空间服务有限公司',
            price: '200元/天',
            quantity: '1天',
            delivery: 'API传输',
            amount: '¥200',
            appliedAt: '2026-05-08 16:18:16',
            status: '解除审批中'
        },
        {
            orderNo: '2026042314260105100000101148727',
            orderType: '常规订单',
            name: '龙岗区产业经济月度分析数据产品',
            productType: '数据产品',
            provider: '龙岗区产业发展研究中心',
            price: '600元/月',
            quantity: '1月',
            delivery: '人工交付',
            amount: '¥600',
            appliedAt: '2026-04-23 14:26:01',
            status: '待确认交付'
        }
    ];

    var SERVICE_ORDER_RECORDS = [
        {
            orderNo: '2026071810260805600000101148479',
            orderType: '服务订单',
            name: '龙岗区企业数据资产入表全流程咨询服务',
            productType: '企业数据资产入表咨询服务',
            provider: '深圳市龙岗区数字经济产业促进中心',
            price: '9800元/项',
            quantity: '1项',
            delivery: '报告交付',
            amount: '¥9800',
            appliedAt: '2026-07-18 10:26:08',
            status: '待支付（首次）',
            paymentStage: { periodNo: 1, periodTotal: 3, name: '首期款', percent: 30, amount: 2940, contractAmount: 9800, serviceFeeRate: 3 }
        },
        {
            orderNo: '2026071614070705400000101148401',
            orderType: '服务订单',
            name: '重点企业数据战略与要素发展规划咨询服务',
            productType: '企业数据治理与合规咨询服务',
            provider: '龙岗数智咨询服务有限公司',
            price: '12000元/项',
            quantity: '1项',
            delivery: '报告+驻场',
            amount: '¥12000',
            appliedAt: '2026-07-16 14:07:07',
            status: '待支付（阶段）',
            paymentStage: { periodNo: 2, periodTotal: 4, name: '方案确认款', percent: 25, amount: 3000, contractAmount: 12000, serviceFeeRate: 3 }
        },
        {
            orderNo: '2026071414015101700000101148363',
            orderType: '服务订单',
            name: '企业数据治理诊断与质量提升实施服务',
            productType: '企业数据治理实施服务',
            provider: '深圳市龙岗区政务数据中心',
            price: '15000元/项',
            quantity: '1项',
            delivery: '驻场实施',
            amount: '¥15000',
            appliedAt: '2026-07-14 14:01:51',
            status: '待确认交付'
        },
        {
            orderNo: '2026070716265401500000101148252',
            orderType: '服务订单',
            name: '智慧园区数据融合应用解决方案设计服务',
            productType: '数据应用解决方案服务',
            provider: '龙岗数字城市研究院',
            price: '18000元/项',
            quantity: '1项',
            delivery: '方案交付',
            amount: '¥18000',
            appliedAt: '2026-07-07 16:26:54',
            status: '交易完成'
        },
        {
            orderNo: '2026070716015603600000101148208',
            orderType: '服务订单',
            name: '企业数据资产价值评估与登记辅导服务',
            productType: '数据资产评估咨询服务',
            provider: '深圳市数据资产评估中心',
            price: '6000元/项',
            quantity: '1项',
            delivery: '评估报告',
            amount: '¥6000',
            appliedAt: '2026-07-07 16:01:56',
            status: '关联审批中'
        },
        {
            orderNo: '2026061916051502100000101148466',
            orderType: '服务订单',
            name: '福田区金融风控数据建模与实施服务',
            productType: '企业数据治理与合规咨询服务',
            provider: '深圳市龙岗区数据服务中心',
            price: '1000元/次',
            quantity: '1次',
            delivery: '线下交付',
            amount: '¥1000',
            appliedAt: '2026-06-19 16:05:15',
            status: '关联合同签署中'
        },
        {
            orderNo: '2026052710371205800000101148559',
            orderType: '服务订单',
            name: '企业数据产品合规评估与整改咨询服务',
            productType: '数据合规咨询服务',
            provider: '深圳市数据合规服务中心',
            price: '5000元/月',
            quantity: '1月',
            delivery: '报告交付',
            amount: '¥5000',
            appliedAt: '2026-05-27 10:37:12',
            status: '待支付（最后）',
            paymentStage: { periodNo: 3, periodTotal: 3, name: '尾款', percent: 30, amount: 1500, contractAmount: 5000, serviceFeeRate: 3 }
        },
        {
            orderNo: '2026052710303702400000101148518',
            orderType: '服务订单',
            name: '龙岗区企业数据接口接入技术实施服务',
            productType: '数据接口技术实施服务',
            provider: '龙岗数科产业运营有限公司',
            price: '500元/次',
            quantity: '3次',
            delivery: '远程实施',
            amount: '¥1500',
            appliedAt: '2026-05-27 10:30:37',
            status: '待交付'
        },
        {
            orderNo: '2026052710260405600000101148472',
            orderType: '服务订单',
            name: '公共数据授权运营合规咨询服务',
            productType: '数据合规咨询服务',
            provider: '深圳市公共数据运营服务中心',
            price: '3000元/项',
            quantity: '1项',
            delivery: '报告交付',
            amount: '¥3000',
            appliedAt: '2026-05-27 10:26:04',
            status: '解除审批中'
        },
        {
            orderNo: '2026052710252204500000101148465',
            orderType: '服务订单',
            name: '产业运行驾驶舱需求分析与指标设计服务',
            productType: '数据应用解决方案服务',
            provider: '龙岗数字城市研究院',
            price: '8000元/项',
            quantity: '1项',
            delivery: '方案交付',
            amount: '¥8000',
            appliedAt: '2026-05-27 10:25:22',
            status: '订单退回'
        },
        {
            orderNo: '2026052710245001700000101148458',
            orderType: '服务订单',
            name: '企业信用数据融合治理咨询服务',
            productType: '企业数据治理与合规咨询服务',
            provider: '深圳市龙岗区数据服务中心',
            price: '100元/次',
            quantity: '5次',
            delivery: '线下交付',
            amount: '¥500',
            appliedAt: '2026-05-27 10:24:50',
            status: '已解除关联'
        },
        {
            orderNo: '2026052514225906300000101148564',
            orderType: '服务订单',
            name: '龙岗区企业数据资产托管运营服务',
            productType: '企业数据资产托管运营服务',
            provider: '龙岗数科产业运营有限公司',
            price: '500元/次',
            quantity: '3次',
            delivery: '线上服务',
            amount: '¥1500',
            appliedAt: '2026-05-25 14:22:59',
            status: '交易完成'
        }
    ];

    var ACTIONS_BY_STATUS = {
        '订单退回': [
            ['取消订单', 'cancel'],
            ['重新提交', 'redo'],
            ['订单详情', 'detail']
        ],
        '关联审批中': [
            ['取消订单', 'cancel'],
            ['撤回关联', 'withdraw'],
            ['订单详情', 'detail']
        ],
        '关联合同签署中': [
            ['取消订单', 'cancel'],
            ['签署合同', 'contract'],
            ['合同详情', 'detail'],
            ['订单详情', 'detail']
        ],
        '待支付': [
            ['发起争议', 'dispute'],
            ['去支付', 'pay'],
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
            ['发起争议', 'dispute'],
            ['交付详情', 'delivery'],
            ['订单详情', 'detail']
        ],
        '待确认交付': [
            ['发起争议', 'dispute'],
            ['确认交付', 'confirm'],
            ['交付详情', 'delivery'],
            ['订单详情', 'detail']
        ],
        '交易完成': [
            ['交付详情', 'delivery'],
            ['订单详情', 'detail']
        ]
    };

    var SERVICE_ACTIONS_BY_STATUS = Object.assign({}, ACTIONS_BY_STATUS, {
        '待支付（首次）': ACTIONS_BY_STATUS['待支付'],
        '待支付（阶段）': ACTIONS_BY_STATUS['待支付'],
        '待支付（最后）': ACTIONS_BY_STATUS['待支付'],
        '交易完成': [
            ['交付详情', 'delivery'],
            ['去评价', 'confirm'],
            ['订单详情', 'detail']
        ]
    });

    var ICON_PATHS = {
        search: '<path d="M9.5 3a6.5 6.5 0 0 1 5.16 10.45l4.45 4.44-1.42 1.42-4.44-4.45A6.5 6.5 0 1 1 9.5 3zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"/>',
        filter: '<path d="M3 5h18l-7 8v5l-4 2v-7L3 5zm4.4 2 4.6 5.25V17l1-.5v-4.25L17.6 7H7.4z"/>',
        reset: '<path d="M12 5V2L7 7l5 5V7a5 5 0 1 1-4.55 7.06l-1.82.83A7 7 0 1 0 12 5z"/>',
        cancel: '<path d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5z"/>',
        redo: '<path d="M12 5V2L7 7l5 5V7a5 5 0 1 1-4.55 7.06l-1.82.83A7 7 0 1 0 12 5z"/>',
        withdraw: '<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.42-1.41L7.83 13H20v-2z"/>',
        contract: '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-5 4h8v2H8v-2zm0 4h8v2H8v-2z"/>',
        dispute: '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>',
        pay: '<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4H4V6h16v2zm-8 8H5v-2h7v2z"/>',
        online: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-3a15.7 15.7 0 0 0-1.4-3.2A8 8 0 0 1 18.9 8zM12 4c.8 1 1.5 2.3 1.8 4h-3.6c.3-1.7 1-3 1.8-4zM4.3 14a7.7 7.7 0 0 1 0-4h3.5a16.5 16.5 0 0 0 0 4H4.3zm.8 2h3a15.7 15.7 0 0 0 1.4 3.2A8 8 0 0 1 5.1 16zm3-8h-3a8 8 0 0 1 4.4-3.2A15.7 15.7 0 0 0 8.1 8zm3.9 12c-.8-1-1.5-2.3-1.8-4h3.6c-.3 1.7-1 3-1.8 4zm2.2-6H9.8a14.8 14.8 0 0 1 0-4h4.4a14.8 14.8 0 0 1 0 4zm.3 5.2a15.7 15.7 0 0 0 1.4-3.2h3a8 8 0 0 1-4.4 3.2zm1.7-5.2a16.5 16.5 0 0 0 0-4h3.5a7.7 7.7 0 0 1 0 4h-3.5z"/>',
        upload: '<path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/>',
        delivery: '<path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2a3 3 0 0 0 6 0h6a3 3 0 0 0 6 0h2v-5l-3-4zM6 18.5A1.5 1.5 0 1 1 6 15a1.5 1.5 0 0 1 0 3.5zM15 15H9a3 3 0 0 0-6 0V6h12v9zm3 3.5a1.5 1.5 0 1 1 0-3.5 1.5 1.5 0 0 1 0 3.5zm3-3.5a3 3 0 0 0-4-2.83V10h2l2 3v2z"/>',
        confirm: '<path d="m9 16.2-3.5-3.5L4.1 14.1 9 19 20.3 7.7l-1.4-1.4L9 16.2z"/>',
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

    function initProductOrders() {
        var params = new URLSearchParams(window.location.search || '');
        var menu = params.get('menu');
        if (menu !== 'product-order' && menu !== 'service-order') return;
        var serviceMode = menu === 'service-order';
        var activeRecords = serviceMode ? SERVICE_ORDER_RECORDS : ORDER_RECORDS;
        var activeActions = serviceMode ? SERVICE_ACTIONS_BY_STATUS : ACTIONS_BY_STATUS;
        var objectTypeLabel = serviceMode ? '服务类型' : '产品类型';
        var allObjectTypeLabel = serviceMode ? '全部服务类型' : '全部产品类型';
        var orderTypeLabel = serviceMode ? '服务订单' : '常规订单';
        var objectTypeOptions = Array.from(new Set(activeRecords.map(function (item) { return item.productType; })));

        var panel = document.querySelector('[data-consult-panel]');
        var title = document.querySelector('[data-center-title]');
        if (!panel) return;

        var state = {
            tab: '全部',
            keyword: '',
            orderType: '全部订单类型',
            productType: allObjectTypeLabel,
            page: 1,
            pageSize: 10,
            filterOpen: false,
            checkoutOrderNo: '',
            paymentMethod: '',
            onlineChannel: '',
            onlineStage: 'select',
            onlineStatus: '',
            onlineQueryCount: 0,
            bankCode: 'CMB',
            cardType: '001',
            voucherName: '',
            checkoutError: ''
        };
        var toastTimer = null;
        var sharedCheckout = window.BuyerPaymentCheckout ? window.BuyerPaymentCheckout.create() : null;
        var paymentQueryTimer = null;
        var paymentResultTimer = null;
        var bankPaymentWindow = null;

        panel.classList.remove('is-placeholder', 'is-service-management');
        panel.classList.add('is-order-management');
        if (title) title.textContent = serviceMode ? '服务订单管理' : '订单管理';
        document.title = (serviceMode ? '服务订单管理' : '订单管理') + ' - 需方中心';

        function getFilteredRecords() {
            var keyword = state.keyword.toLowerCase();
            return activeRecords.filter(function (item) {
                if (state.tab !== '全部' && item.status !== state.tab) return false;
                if (state.orderType !== '全部订单类型' && item.orderType !== state.orderType) return false;
                if (state.productType !== allObjectTypeLabel && item.productType !== state.productType) return false;
                if (!keyword) return true;
                var text = [item.orderNo, item.name, item.provider].join(' ').toLowerCase();
                return text.indexOf(keyword) !== -1;
            });
        }

        function renderTabs() {
            var tabs = serviceMode
                ? STATUS_TABS.reduce(function (result, tab) {
                    if (tab === '待支付') return result.concat(['待支付（首次）', '待支付（阶段）', '待支付（最后）']);
                    result.push(tab);
                    return result;
                }, [])
                : STATUS_TABS;
            return tabs.map(function (tab) {
                var active = tab === state.tab;
                return '<button class="buyer-order-tab' + (active ? ' active' : '') + '" type="button" role="tab" aria-selected="' + active + '" data-order-tab="' + escapeHtml(tab) + '">' + escapeHtml(tab) + '</button>';
            }).join('');
        }

        function renderFilterPanel() {
            return ''
                + '<div class="buyer-order-filter-panel' + (state.filterOpen ? ' show' : '') + '" data-order-filter-panel>'
                +   '<select data-order-type aria-label="订单类型">'
                +       '<option>全部订单类型</option>'
                +       '<option' + (state.orderType === orderTypeLabel ? ' selected' : '') + '>' + orderTypeLabel + '</option>'
                +   '</select>'
                +   '<select data-order-product-type aria-label="' + objectTypeLabel + '">'
                +       '<option>' + allObjectTypeLabel + '</option>'
                +       objectTypeOptions.map(function (type) {
                            return '<option' + (state.productType === type ? ' selected' : '') + '>' + escapeHtml(type) + '</option>';
                        }).join('')
                +   '</select>'
                +   '<button class="buyer-order-filter-reset" type="button" data-order-reset>' + icon('reset') + '<span>重置</span></button>'
                + '</div>';
        }

        function renderActions(item) {
            var actions = activeActions[item.status] || [['订单详情', 'detail']];
            return actions.map(function (action) {
                return '<button class="buyer-order-action" type="button" data-order-action="' + escapeHtml(action[0]) + '" data-order-no="' + escapeHtml(item.orderNo) + '">' + icon(action[1]) + '<span>' + escapeHtml(action[0]) + '</span></button>';
            }).join('');
        }

        function getCheckoutOrder() {
            return activeRecords.find(function (item) {
                return item.orderNo === state.checkoutOrderNo;
            });
        }

        function getBillNo(item) {
            return 'BILL' + item.orderNo.slice(-24);
        }

        function getPayableAmount(item) {
            var amount = Number(String(item.amount).replace(/[^\d.]/g, '')) || 0;
            return amount.toFixed(2) + '元';
        }

        function getOnlineChannel() {
            return ONLINE_CHANNELS.find(function (channel) {
                return channel.key === state.onlineChannel;
            });
        }

        function getOnlineBankLabel() {
            var bank = ONLINE_BANKS.find(function (item) {
                return item.code === state.bankCode;
            });
            return bank ? bank.label : '';
        }

        function openBankPaymentPage(item) {
            var params = new URLSearchParams({
                orderNo: item.orderNo,
                productName: item.name,
                merchantName: item.provider,
                amount: getPayableAmount(item),
                bankCode: state.bankCode,
                bankName: getOnlineBankLabel(),
                cardType: state.cardType
            });
            bankPaymentWindow = window.open('unified-payment-bank.html?' + params.toString(), 'uppBankPayment');
            if (!bankPaymentWindow) return false;
            if (typeof bankPaymentWindow.focus === 'function') bankPaymentWindow.focus();
            return true;
        }

        function renderCheckoutInfo(label, value, className) {
            return ''
                + '<div class="checkout-info-item' + (className ? ' ' + className : '') + '">'
                +   '<span>' + escapeHtml(label) + '：</span>'
                +   '<strong title="' + escapeHtml(value) + '">' + escapeHtml(value) + '</strong>'
                + '</div>';
        }

        function renderOfflinePayment() {
            if (state.paymentMethod !== 'offline') return '';
            return ''
                + '<div class="checkout-offline-panel">'
                +   '<section class="checkout-detail-section">'
                +       '<h3>收款方信息</h3>'
                +       '<div class="checkout-receiver-grid">'
                +           renderCheckoutInfo('开户名称', '深圳市龙岗区数据要素交易服务有限公司')
                +           renderCheckoutInfo('开户银行', '中国农业银行深圳龙岗支行')
                +           renderCheckoutInfo('银行账号', '4405 0101 0000 12345')
                +           renderCheckoutInfo('摘要/附言', '订单号后8位', 'checkout-info-wide')
                +       '</div>'
                +   '</section>'
                +   '<section class="checkout-detail-section checkout-upload-section">'
                +       '<h3>上传支付凭证</h3>'
                +       '<div class="checkout-upload-row">'
                +           '<div class="checkout-upload-label"><em>*</em> 支付凭证</div>'
                +           '<div>'
                +               '<label class="checkout-upload-box">'
                +                   '<input type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" data-checkout-voucher>'
                +                   icon('upload')
                +                   '<span>' + (state.voucherName ? escapeHtml(state.voucherName) : '上传图片') + '</span>'
                +               '</label>'
                +               '<p>上传单个文件，支持 jpg、jpeg、png 等格式，单个文件不超过 2MB</p>'
                +           '</div>'
                +       '</div>'
                +   '</section>'
                + '</div>';
        }

        function renderOnlineChannels() {
            return ''
                + '<section class="checkout-detail-section checkout-channel-section">'
                +   '<h3>选择线上支付渠道</h3>'
                +   '<div class="checkout-channel-grid">'
                +       ONLINE_CHANNELS.map(function (channel) {
                            var active = channel.key === state.onlineChannel;
                            return ''
                                + '<button class="checkout-channel-option channel-' + channel.key + (active ? ' active' : '') + '" type="button" data-online-channel="' + channel.key + '">'
                                +   icon(channel.mode === 'web' ? 'pay' : 'online')
                                +   '<span>' + channel.label + '</span>'
                                + '</button>';
                        }).join('')
                +   '</div>'
                +   '<p class="checkout-channel-guide">选择微信、支付宝或云闪付后将立即展示二维码；网银支付将进入银行支付页面。</p>'
                + '</section>';
        }

        function renderBankPaymentForm() {
            if (state.onlineChannel !== 'bank' || state.onlineStage !== 'select') return '';
            return ''
                + '<section class="checkout-detail-section checkout-bank-section">'
                +   '<h3>填写网银支付信息</h3>'
                +   '<div class="checkout-bank-form">'
                +       '<label><span>支付银行</span><select data-online-bank>'
                +           ONLINE_BANKS.map(function (bank) {
                                return '<option value="' + bank.code + '"' + (state.bankCode === bank.code ? ' selected' : '') + '>' + bank.label + '</option>';
                            }).join('')
                +       '</select></label>'
                +       '<label><span>卡类型</span><select data-online-card-type>'
                +           '<option value="001"' + (state.cardType === '001' ? ' selected' : '') + '>借记卡</option>'
                +           '<option value="002"' + (state.cardType === '002' ? ' selected' : '') + '>信用卡</option>'
                +       '</select></label>'
                +   '</div>'
                +   '<div class="checkout-bank-notice">点击“前往网银支付”后，将进入银行支付页面。请保留当前收银台，以便返回后查询支付结果。</div>'
                + '</section>';
        }

        function getDemoQrUrl(item) {
            var payload = [
                'upp://pay',
                'order=' + item.orderNo,
                'channel=' + state.onlineChannel,
                'amount=' + getPayableAmount(item)
            ].join('&');
            return 'https://quickchart.io/qr?size=184&margin=1&text=' + encodeURIComponent(payload);
        }

        function renderOnlinePaying(item) {
            var channel = getOnlineChannel();
            if (!channel) return '';
            if (channel.mode === 'scan') {
                return ''
                    + '<section class="checkout-online-progress checkout-scan-progress">'
                    +   '<div class="checkout-qr-wrap">'
                    +       '<img src="' + getDemoQrUrl(item) + '" alt="' + channel.label + '支付二维码">'
                    +   '</div>'
                    +   '<div class="checkout-progress-copy">'
                    +       '<div class="checkout-progress-channel">' + icon('online') + '<span>' + channel.label + '</span></div>'
                    +       '<strong class="checkout-progress-amount">' + getPayableAmount(item) + '</strong>'
                    +       '<h3>' + channel.tip + '</h3>'
                    +       '<p>支付状态：<em>等待支付</em></p>'
                    +       '<p>扫码完成后系统将自动确认并返回支付结果，无需手动操作。</p>'
                    +       '<button class="checkout-text-action" type="button" data-online-change>' + icon('redo') + '<span>更换支付方式</span></button>'
                    +   '</div>'
                    + '</section>';
            }
            return ''
                + '<section class="checkout-online-progress checkout-bank-waiting">'
                +   '<div class="checkout-progress-icon is-waiting">' + icon('online') + '</div>'
                +   '<h3>等待网银支付结果</h3>'
                +   '<p>已选择' + getOnlineBankLabel() + ' · ' + (state.cardType === '002' ? '信用卡' : '借记卡') + '</p>'
                +   '<p>请在银行支付页面完成付款，返回后系统将自动确认支付结果。</p>'
                +   '<button class="checkout-text-action" type="button" data-online-change>' + icon('redo') + '<span>更换支付方式</span></button>'
                + '</section>';
        }

        function renderOnlineResult(item) {
            if (state.onlineStage === 'querying') {
                return ''
                    + '<section class="checkout-online-progress checkout-result-panel">'
                    +   '<div class="checkout-progress-icon is-querying">' + icon('online') + '</div>'
                    +   '<h3>正在确认支付结果</h3>'
                    +   '<p>请稍候，正在查询本次支付结果。</p>'
                    + '</section>';
            }
            if (state.onlineStage === 'success') {
                return ''
                    + '<section class="checkout-online-progress checkout-result-panel is-success">'
                    +   '<div class="checkout-progress-icon">' + icon('success') + '</div>'
                    +   '<h3>支付成功</h3>'
                    +   '<strong class="checkout-progress-amount">' + getPayableAmount(item) + '</strong>'
                    +   '<p>订单编号：' + item.orderNo + '</p>'
                    +   '<p>订单已进入待交付状态。</p>'
                    + '</section>';
            }
            if (state.onlineStage === 'failed') {
                return ''
                    + '<section class="checkout-online-progress checkout-result-panel is-failed">'
                    +   '<div class="checkout-progress-icon">' + icon('cancel') + '</div>'
                    +   '<h3>支付未完成</h3>'
                    +   '<p>本次支付失败，请重新选择支付方式后发起支付。</p>'
                    +   '<p>订单仍保留在“待支付”状态，不会重复扣款。</p>'
                    + '</section>';
            }
            return renderOnlinePaying(item);
        }

        function renderOnlinePayment(item) {
            if (state.paymentMethod !== 'online') return '';
            return ''
                + '<div class="checkout-online-panel">'
                +   (state.onlineStage === 'select' ? renderOnlineChannels() + renderBankPaymentForm() : renderOnlineResult(item))
                + '</div>';
        }

        function renderCheckoutFooter() {
            if (state.paymentMethod !== 'online') {
                return ''
                    + '<button class="checkout-footer-btn" type="button" data-checkout-close>' + icon('cancel') + '<span>取消</span></button>'
                    + '<button class="checkout-footer-btn primary" type="button" data-checkout-confirm>' + icon('confirm') + '<span>确定</span></button>';
            }
            if (state.onlineStage === 'success') {
                return '<button class="checkout-footer-btn primary" type="button" data-checkout-done>' + icon('confirm') + '<span>完成</span></button>';
            }
            if (state.onlineStage === 'failed') {
                return ''
                    + '<button class="checkout-footer-btn" type="button" data-checkout-close>' + icon('cancel') + '<span>关闭</span></button>'
                    + '<button class="checkout-footer-btn primary" type="button" data-online-retry>' + icon('redo') + '<span>重新支付</span></button>';
            }
            if (state.onlineStage === 'paying' || state.onlineStage === 'querying') {
                return '<button class="checkout-footer-btn" type="button" data-checkout-close>' + icon('cancel') + '<span>关闭</span></button>';
            }
            var channel = getOnlineChannel();
            if (!channel || channel.mode === 'scan') {
                return '<button class="checkout-footer-btn" type="button" data-checkout-close>' + icon('cancel') + '<span>取消</span></button>';
            }
            return ''
                + '<button class="checkout-footer-btn" type="button" data-checkout-close>' + icon('cancel') + '<span>取消</span></button>'
                + '<button class="checkout-footer-btn primary" type="button" data-checkout-confirm>' + icon('confirm') + '<span>前往网银支付</span></button>';
        }

        function renderCheckoutModal() {
            var item = getCheckoutOrder();
            if (!item) return '';
            var offlineActive = state.paymentMethod === 'offline';
            var onlineActive = state.paymentMethod === 'online';
            return ''
                + '<div class="checkout-modal-mask" data-checkout-mask>'
                +   '<section class="checkout-modal' + (offlineActive ? ' is-offline' : '') + (onlineActive ? ' is-online' : '') + '" role="dialog" aria-modal="true" aria-labelledby="checkout-title">'
                +       '<header class="checkout-modal-head">'
                +           '<h2 id="checkout-title">收银台</h2>'
                +           '<button type="button" aria-label="关闭收银台" data-checkout-close>' + icon('cancel') + '</button>'
                +       '</header>'
                +       '<div class="checkout-modal-body">'
                +           '<section class="checkout-order-section">'
                +               '<h3>订单信息</h3>'
                +               '<div class="checkout-info-grid">'
                +                   renderCheckoutInfo('支付费用类型', '交易价款')
                +                   renderCheckoutInfo('订单编号', item.orderNo)
                +                   renderCheckoutInfo('账单编号', getBillNo(item))
                +                   renderCheckoutInfo(serviceMode ? '服务名称' : '产品名称', item.name)
                +                   renderCheckoutInfo(objectTypeLabel, item.productType)
                +                   renderCheckoutInfo('付款方名称', '深圳市龙岗智慧产业有限公司')
                +                   renderCheckoutInfo('收款方名称', '深圳市龙岗区数据要素交易服务有限公司')
                +               '</div>'
                +               '<div class="checkout-payable"><span>应付金额：</span><strong>' + getPayableAmount(item) + '</strong></div>'
                +           '</section>'
                +           '<section class="checkout-payment-section">'
                +               '<h3>选择支付方式</h3>'
                +               '<div class="checkout-methods">'
                +                   '<button class="checkout-method' + (offlineActive ? ' active' : '') + '" type="button" data-checkout-method="offline">' + icon('pay') + '<span>线下支付</span></button>'
                +                   '<button class="checkout-method' + (onlineActive ? ' active' : '') + '" type="button" data-checkout-method="online">' + icon('online') + '<span>线上支付</span></button>'
                +               '</div>'
                +               renderOfflinePayment()
                +               renderOnlinePayment(item)
                +               (state.checkoutError ? '<div class="checkout-error">' + escapeHtml(state.checkoutError) + '</div>' : '')
                +           '</section>'
                +       '</div>'
                +       '<footer class="checkout-modal-footer">' + renderCheckoutFooter() + '</footer>'
                +   '</section>'
                + '</div>';
        }

        function renderRows(records) {
            if (!records.length) {
                return '<tr><td class="buyer-order-empty" colspan="' + (serviceMode ? '11' : '12') + '">暂无符合条件的' + (serviceMode ? '服务订单' : '产品订单') + '</td></tr>';
            }

            return records.map(function (item) {
                return ''
                    + '<tr>'
                    +   '<td title="' + escapeHtml(item.orderNo) + '">' + escapeHtml(item.orderNo) + '</td>'
                    +   (serviceMode ? '' : '<td>' + escapeHtml(item.orderType) + '</td>')
                    +   '<td class="buyer-order-ellipsis" title="' + escapeHtml(item.name) + '">' + escapeHtml(item.name) + '</td>'
                    +   '<td>' + escapeHtml(item.productType) + '</td>'
                    +   '<td class="buyer-order-ellipsis" title="' + escapeHtml(item.provider) + '">' + escapeHtml(item.provider) + '</td>'
                    +   '<td>' + escapeHtml(item.price) + '</td>'
                    +   '<td>' + escapeHtml(item.quantity) + '</td>'
                    +   '<td>' + escapeHtml(item.delivery) + '</td>'
                    +   '<td>' + escapeHtml(item.amount) + '</td>'
                    +   '<td>' + escapeHtml(item.appliedAt) + '</td>'
                    +   '<td class="order-status-cell"><span class="buyer-order-status">' + escapeHtml(item.status) + '</span></td>'
                    +   '<td class="order-action-cell"><div class="buyer-order-actions">' + renderActions(item) + '</div></td>'
                    + '</tr>';
            }).join('');
        }

        function renderPagination(total, totalPages) {
            var pageButtons = [];
            for (var page = 1; page <= totalPages; page += 1) {
                pageButtons.push('<button class="buyer-order-page-btn' + (page === state.page ? ' active' : '') + '" type="button" data-order-page="' + page + '">' + page + '</button>');
            }

            return ''
                + '<div class="buyer-order-pagination">'
                +   '<span>共 ' + total + ' 条</span>'
                +   '<button class="buyer-order-page-btn" type="button" aria-label="上一页" data-order-page="prev"' + (state.page <= 1 ? ' disabled' : '') + '>‹</button>'
                +   pageButtons.join('')
                +   '<button class="buyer-order-page-btn" type="button" aria-label="下一页" data-order-page="next"' + (state.page >= totalPages ? ' disabled' : '') + '>›</button>'
                +   '<select class="buyer-order-page-size" data-order-page-size aria-label="每页条数">'
                +       '<option value="10"' + (state.pageSize === 10 ? ' selected' : '') + '>10 条/页</option>'
                +       '<option value="20"' + (state.pageSize === 20 ? ' selected' : '') + '>20 条/页</option>'
                +   '</select>'
                +   '<span>前往</span>'
                +   '<input class="buyer-order-page-jump" type="number" min="1" max="' + totalPages + '" aria-label="前往页码" data-order-page-jump>'
                + '</div>';
        }

        function renderTable() {
            var filtered = getFilteredRecords();
            var totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
            if (state.page > totalPages) state.page = totalPages;
            var start = (state.page - 1) * state.pageSize;
            var pageRecords = filtered.slice(start, start + state.pageSize);

            return ''
                + '<div class="buyer-order-table-card">'
                +   '<div class="buyer-order-table-scroll" aria-label="' + (serviceMode ? '服务订单' : '产品订单') + '列表，可横向滚动">'
                +       '<table class="buyer-order-table' + (serviceMode ? ' buyer-service-order-table' : '') + '">'
                +           '<colgroup>'
                +               '<col class="col-order-no">' + (serviceMode ? '' : '<col class="col-order-type">') + '<col class="col-name"><col class="col-product-type">'
                +               '<col class="col-provider"><col class="col-price"><col class="col-quantity"><col class="col-delivery">'
                +               '<col class="col-amount"><col class="col-applied-at"><col class="col-status"><col class="col-actions">'
                +           '</colgroup>'
                +           '<thead><tr>'
                +               '<th>订单编号</th>' + (serviceMode ? '' : '<th>订单类型</th>') + '<th>名称</th><th>' + objectTypeLabel + '</th><th>提供方</th><th>价格</th>'
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
                + '<div class="buyer-order-board">'
                +   '<div class="buyer-order-tabs" role="tablist" aria-label="订单状态">' + renderTabs() + '</div>'
                +   '<div class="buyer-order-toolbar">'
                +       '<label class="buyer-order-search">'
                +           '<input type="search" placeholder="请输入订单编号/名称" value="' + escapeHtml(state.keyword) + '" data-order-keyword aria-label="搜索订单">'
                +           icon('search')
                +       '</label>'
                +       '<button class="buyer-order-filter-toggle' + (state.filterOpen ? ' active' : '') + '" type="button" aria-label="筛选订单" aria-expanded="' + state.filterOpen + '" data-order-filter-toggle>' + icon('filter') + '</button>'
                +   '</div>'
                +   renderFilterPanel()
                +   renderTable()
                + '</div>'
                + '<div class="buyer-order-toast" role="status" aria-live="polite" data-order-toast>' + icon('success') + '<span></span></div>'
                + renderCheckoutModal();
            bindEvents();
        }

        function showToast(message) {
            var toast = panel.querySelector('[data-order-toast]');
            if (!toast) return;
            toast.querySelector('span').textContent = message;
            toast.classList.add('show');
            window.clearTimeout(toastTimer);
            toastTimer = window.setTimeout(function () {
                toast.classList.remove('show');
            }, 2200);
        }

        function closeCheckout() {
            window.clearTimeout(paymentQueryTimer);
            window.clearTimeout(paymentResultTimer);
            state.checkoutOrderNo = '';
            state.paymentMethod = '';
            state.onlineChannel = '';
            state.onlineStage = 'select';
            state.onlineStatus = '';
            state.onlineQueryCount = 0;
            state.bankCode = 'CMB';
            state.cardType = '001';
            state.voucherName = '';
            state.checkoutError = '';
            render();
        }

        function confirmCheckout() {
            if (!state.paymentMethod) {
                state.checkoutError = '请选择支付方式。';
                render();
                return;
            }
            if (state.paymentMethod === 'online') {
                var channel = getOnlineChannel();
                if (!channel) {
                    state.checkoutError = '请选择线上支付渠道。';
                    render();
                    return;
                }
                if (channel.mode === 'web' && !openBankPaymentPage(getCheckoutOrder())) {
                    state.checkoutError = '浏览器阻止了网银支付页面，请允许弹窗后重试。';
                    render();
                    return;
                }
                state.onlineStage = 'paying';
                state.onlineStatus = 'PAYING';
                state.checkoutError = '';
                render();
                if (channel.mode === 'scan') scheduleOnlineQuery();
                return;
            }
            if (!state.voucherName) {
                state.checkoutError = '请上传支付凭证。';
                render();
                return;
            }
            state.checkoutOrderNo = '';
            state.paymentMethod = '';
            state.voucherName = '';
            state.checkoutError = '';
            render();
            showToast('线下支付凭证已提交。');
        }

        function queryOnlinePayment() {
            var item = getCheckoutOrder();
            if (!item || state.onlineStage !== 'paying') return;
            window.clearTimeout(paymentQueryTimer);
            state.onlineStage = 'querying';
            state.onlineQueryCount += 1;
            render();
            paymentResultTimer = window.setTimeout(function () {
                var failedSample = item.orderNo.slice(-1) === '9' && state.onlineQueryCount === 1;
                completeOnlinePayment(failedSample ? 'PAY_FAIL' : 'PAY_SUCCESS', item);
            }, 3000);
        }

        function completeOnlinePayment(status, item) {
            var success = status === 'PAY_SUCCESS';
            state.onlineStage = success ? 'success' : 'failed';
            state.onlineStatus = status;
            if (success) item.status = '待交付';
            render();
        }

        function receiveBankPaymentResult(payload) {
            var item = getCheckoutOrder();
            if (!item || !payload || payload.orderNo !== item.orderNo) return;
            if (payload.status !== 'PAY_SUCCESS' && payload.status !== 'PAY_FAIL') return;
            if (state.onlineStage === 'success') return;
            if (state.onlineStage === 'failed' && payload.status === 'PAY_FAIL') return;
            window.clearTimeout(paymentQueryTimer);
            window.clearTimeout(paymentResultTimer);
            state.onlineStage = 'querying';
            state.onlineStatus = 'PAYING';
            render();
            paymentResultTimer = window.setTimeout(function () {
                completeOnlinePayment(payload.status, item);
            }, 1500);
        }

        function readStoredBankPaymentResult() {
            var item = getCheckoutOrder();
            if (!item) return;
            var key = 'upp-payment-result:' + item.orderNo;
            try {
                if (!window.localStorage) return;
                var stored = window.localStorage.getItem(key);
                if (!stored) return;
                window.localStorage.removeItem(key);
                receiveBankPaymentResult(JSON.parse(stored));
            } catch (error) {
                return;
            }
        }

        function scheduleOnlineQuery() {
            window.clearTimeout(paymentQueryTimer);
            paymentQueryTimer = window.setTimeout(function () {
                if (state.checkoutOrderNo && state.onlineStage === 'paying') queryOnlinePayment();
            }, 12000);
        }

        function retryOnlinePayment() {
            window.clearTimeout(paymentQueryTimer);
            var channel = getOnlineChannel();
            state.onlineStage = channel && channel.mode === 'scan' ? 'paying' : 'select';
            state.onlineStatus = '';
            state.checkoutError = '';
            render();
            if (state.onlineStage === 'paying') scheduleOnlineQuery();
        }

        function changeOnlinePayment() {
            window.clearTimeout(paymentQueryTimer);
            state.onlineChannel = '';
            state.onlineStage = 'select';
            state.onlineStatus = '';
            state.checkoutError = '';
            render();
        }

        function bindEvents() {
            panel.querySelectorAll('[data-order-tab]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.tab = this.dataset.orderTab;
                    state.page = 1;
                    render();
                });
            });

            var keywordInput = panel.querySelector('[data-order-keyword]');
            if (keywordInput) {
                keywordInput.addEventListener('input', function () {
                    state.keyword = this.value.trim();
                    state.page = 1;
                    render();
                    var nextInput = panel.querySelector('[data-order-keyword]');
                    if (nextInput) {
                        nextInput.focus();
                        nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
                    }
                });
            }

            var filterToggle = panel.querySelector('[data-order-filter-toggle]');
            if (filterToggle) {
                filterToggle.addEventListener('click', function () {
                    state.filterOpen = !state.filterOpen;
                    render();
                });
            }

            var orderType = panel.querySelector('[data-order-type]');
            if (orderType) {
                orderType.value = state.orderType;
                orderType.addEventListener('change', function () {
                    state.orderType = this.value;
                    state.page = 1;
                    render();
                });
            }

            var productType = panel.querySelector('[data-order-product-type]');
            if (productType) {
                productType.value = state.productType;
                productType.addEventListener('change', function () {
                    state.productType = this.value;
                    state.page = 1;
                    render();
                });
            }

            var reset = panel.querySelector('[data-order-reset]');
            if (reset) {
                reset.addEventListener('click', function () {
                    state.orderType = '全部订单类型';
                    state.productType = allObjectTypeLabel;
                    state.page = 1;
                    render();
                });
            }

            panel.querySelectorAll('[data-order-page]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.disabled) return;
                    var target = this.dataset.orderPage;
                    if (target === 'prev') state.page -= 1;
                    else if (target === 'next') state.page += 1;
                    else state.page = parseInt(target, 10) || 1;
                    render();
                });
            });

            var pageSize = panel.querySelector('[data-order-page-size]');
            if (pageSize) {
                pageSize.addEventListener('change', function () {
                    state.pageSize = parseInt(this.value, 10) || 10;
                    state.page = 1;
                    render();
                });
            }

            var pageJump = panel.querySelector('[data-order-page-jump]');
            if (pageJump) {
                pageJump.addEventListener('keydown', function (event) {
                    if (event.key !== 'Enter') return;
                    var totalPages = Math.max(1, Math.ceil(getFilteredRecords().length / state.pageSize));
                    var target = Math.max(1, Math.min(totalPages, parseInt(this.value, 10) || 1));
                    state.page = target;
                    render();
                });
            }

            panel.querySelectorAll('[data-order-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.dataset.orderAction === '去支付') {
                        var item = activeRecords.find(function (record) {
                            return record.orderNo === button.dataset.orderNo;
                        });
                        if (sharedCheckout && item) {
                            sharedCheckout.open({
                                feeType: '交易价款',
                                orderNo: item.orderNo,
                                billNo: getBillNo(item),
                                objectLabel: serviceMode ? '服务名称' : '产品名称',
                                objectName: item.name,
                                objectTypeLabel: objectTypeLabel,
                                objectType: item.productType,
                                payerName: '深圳市龙岗智慧产业有限公司',
                                providerName: item.provider,
                                merchantName: item.provider,
                                receiverName: '深圳市龙岗区数据要素交易服务有限公司',
                                receiverBank: '中国农业银行深圳龙岗支行',
                                receiverAccount: serviceMode ? '4405 0101 0000 78632' : '4405 0101 0000 12345',
                                receiverMemo: (serviceMode ? '服务订单号' : '订单号') + '后8位',
                                amount: item.paymentStage ? item.paymentStage.amount : item.amount,
                                stageNo: item.paymentStage ? item.paymentStage.periodNo : '',
                                stageTotal: item.paymentStage ? item.paymentStage.periodTotal : '',
                                stageName: item.paymentStage ? item.paymentStage.name : '',
                                stagePercent: item.paymentStage ? item.paymentStage.percent : '',
                                contractAmount: item.paymentStage ? item.paymentStage.contractAmount : '',
                                serviceFeeRate: item.paymentStage ? item.paymentStage.serviceFeeRate : 3,
                                successText: (serviceMode ? '服务订单' : '订单') + '已进入待交付状态。',
                                failureText: '订单仍保留在当前待支付期次，不会重复扣款。'
                            }, {
                                onOfflineSubmitted: function () {
                                    showToast('线下支付凭证已提交。');
                                },
                                onOnlineSuccess: function () {
                                    item.status = '待交付';
                                    render();
                                },
                                onDone: function () {
                                    showToast('支付成功，' + (serviceMode ? '服务订单' : '订单') + '已进入待交付。');
                                }
                            });
                            return;
                        }
                        state.checkoutOrderNo = this.dataset.orderNo;
                        state.paymentMethod = '';
                        state.onlineChannel = '';
                        state.onlineStage = 'select';
                        state.onlineStatus = '';
                        state.onlineQueryCount = 0;
                        state.bankCode = 'CMB';
                        state.cardType = '001';
                        state.voucherName = '';
                        state.checkoutError = '';
                        render();
                        return;
                    }
                    if (this.dataset.orderAction === '签署合同' || this.dataset.orderAction === '合同详情') {
                        window.location.href = 'buyer-center.html?menu=' + (serviceMode ? 'service-contract' : 'product-contract') + '&contractAction=' + (this.dataset.orderAction === '签署合同' ? 'sign' : 'detail') + '&orderNo=' + encodeURIComponent(this.dataset.orderNo || '');
                        return;
                    }
                    showToast(this.dataset.orderAction + '：已触发订单 ' + this.dataset.orderNo);
                });
            });

            panel.querySelectorAll('[data-checkout-close]').forEach(function (button) {
                button.addEventListener('click', closeCheckout);
            });

            var checkoutMask = panel.querySelector('[data-checkout-mask]');
            if (checkoutMask) {
                checkoutMask.addEventListener('click', function (event) {
                    if (event.target === checkoutMask) closeCheckout();
                });
            }

            panel.querySelectorAll('[data-checkout-method]').forEach(function (button) {
                button.addEventListener('click', function () {
                    window.clearTimeout(paymentQueryTimer);
                    state.paymentMethod = this.dataset.checkoutMethod;
                    state.onlineStage = 'select';
                    state.onlineStatus = '';
                    state.onlineQueryCount = 0;
                    state.checkoutError = '';
                    render();
                });
            });

            panel.querySelectorAll('[data-online-channel]').forEach(function (button) {
                button.addEventListener('click', function () {
                    window.clearTimeout(paymentQueryTimer);
                    state.onlineChannel = this.dataset.onlineChannel;
                    var channel = getOnlineChannel();
                    state.onlineStage = channel && channel.mode === 'scan' ? 'paying' : 'select';
                    state.onlineStatus = '';
                    state.checkoutError = '';
                    render();
                    if (state.onlineStage === 'paying') scheduleOnlineQuery();
                });
            });

            var bankSelect = panel.querySelector('[data-online-bank]');
            if (bankSelect) {
                bankSelect.addEventListener('change', function () {
                    state.bankCode = this.value;
                });
            }

            var cardTypeSelect = panel.querySelector('[data-online-card-type]');
            if (cardTypeSelect) {
                cardTypeSelect.addEventListener('change', function () {
                    state.cardType = this.value;
                });
            }

            panel.querySelectorAll('[data-online-change]').forEach(function (button) {
                button.addEventListener('click', changeOnlinePayment);
            });

            panel.querySelectorAll('[data-online-retry]').forEach(function (button) {
                button.addEventListener('click', retryOnlinePayment);
            });

            var checkoutDone = panel.querySelector('[data-checkout-done]');
            if (checkoutDone) {
                checkoutDone.addEventListener('click', function () {
                    closeCheckout();
                    showToast('支付成功，订单已进入待交付。');
                });
            }

            var voucherInput = panel.querySelector('[data-checkout-voucher]');
            if (voucherInput) {
                voucherInput.addEventListener('change', function () {
                    var file = this.files && this.files[0];
                    if (!file) return;
                    if (file.size > 2 * 1024 * 1024) {
                        state.voucherName = '';
                        state.checkoutError = '支付凭证不能超过 2MB。';
                    } else {
                        state.voucherName = file.name;
                        state.checkoutError = '';
                    }
                    render();
                });
            }

            var checkoutConfirm = panel.querySelector('[data-checkout-confirm]');
            if (checkoutConfirm) checkoutConfirm.addEventListener('click', confirmCheckout);
        }

        render();

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && state.checkoutOrderNo) closeCheckout();
        });

        window.addEventListener('message', function (event) {
            if (event.origin && event.origin !== 'null' && event.origin !== window.location.origin) return;
            if (!event.data || event.data.type !== 'upp-payment-result') return;
            receiveBankPaymentResult(event.data);
        });

        window.addEventListener('storage', function (event) {
            if (!event.key || event.key.indexOf('upp-payment-result:') !== 0 || !event.newValue) return;
            try {
                receiveBankPaymentResult(JSON.parse(event.newValue));
            } catch (error) {
                return;
            }
        });

        window.addEventListener('focus', readStoredBankPaymentResult);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProductOrders);
    } else {
        initProductOrders();
    }
})();
