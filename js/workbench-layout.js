(function () {
    var ICONS = {
        home: '<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
        bell: '<svg viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10.5 3.17 10.5 4v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>',
        user: '<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
        arrow: '<svg class="wb-side-arrow" viewBox="0 0 24 24"><path d="M7 14l5-5 5 5z"/></svg>',
        order: '<svg viewBox="0 0 24 24"><path d="M7 2h10v2h3c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2L2 6c0-1.1.9-2 2-2h3V2zm2 2h6V3H9v1zm2 14l6-6-1.41-1.41L11 15.17l-2.59-2.58L7 14l4 4z"/></svg>',
        register: '<svg viewBox="0 0 24 24"><path d="M4 5h3v3H4V5zm0 6h3v3H4v-3zm0 6h3v3H4v-3zm5-11h11v2H9V6zm0 6h11v2H9v-2zm0 6h11v2H9v-2z"/></svg>',
        listing: '<svg viewBox="0 0 24 24"><path d="M4 6h10v2H4V6zm12-2h2v2h2v2h-2v2h-2V8h-2V6h2V4zM4 11h16v2H4v-2zm0 5h10v2H4v-2zm12-2h2v2h2v2h-2v2h-2v-2h-2v-2h2v-2z"/></svg>',
        money: '<svg viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>',
        invoice: '<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v16l3-2 3 2 3-2 3 2 3-2 3 2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',
        demand: '<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 14H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2z"/></svg>',
        consult: '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 12H7v-2h10v2zm0-3H7V9h10v2zm0-3H7V6h10v2z"/></svg>',
        dispute: '<svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
        contract: '<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-5 4h8v2H8v-2zm0 4h8v2H8v-2z"/></svg>'
    };

    var topNav = [
        { key: 'workbench', label: '工作台', href: 'workbench.html' },
        { key: 'buyer', label: '需方中心', href: 'buyer-center.html' },
        { key: 'supplier', label: '供方中心', href: 'supplier-center.html' },
        { key: 'island', label: '数据岛系统' }
    ];

    var sidebarMenus = {
        user: {
            title: '用户中心',
            sections: [
                { key: 'profile', label: '账号中心', icon: 'user', href: 'user-center.html' },
                { key: 'message', label: '我的消息', icon: 'consult', href: 'user-center.html?menu=message' },
                { key: 'subscribe', label: '我的订阅', icon: 'invoice', href: 'user-center.html?menu=subscribe' },
                { key: 'my-demand', label: '我的需求', icon: 'demand', href: 'user-center.html?menu=my-demand' },
                { key: 'consults', label: '我的咨询', icon: 'consult', href: 'user-consults.html?menu=consults' },
                { key: 'objection', label: '公示异议', icon: 'dispute', href: 'user-center.html?menu=objection' }
            ]
        },
        buyer: {
            title: '需方中心',
            sections: [
                {
                    label: '订单合同',
                    icon: 'order',
                    children: [
                        { key: 'resource-apply', label: '资源申请管理', href: 'buyer-center.html?menu=resource-apply' },
                        { key: 'product-order', label: '产品订单管理', href: 'buyer-center.html?menu=product-order' },
                        { key: 'product-contract', label: '产品合同管理', href: 'buyer-center.html?menu=product-contract' }
                    ]
                },
                { key: 'fee', label: '费用管理', icon: 'money', href: 'buyer-center.html?menu=fee' },
                { key: 'invoice', label: '发票管理', icon: 'invoice', href: 'buyer-center.html?menu=invoice' },
                { key: 'dispute', label: '争议仲裁', icon: 'dispute', href: 'buyer-center.html?menu=dispute' },
                { key: 'contract', label: '合约管理', icon: 'contract', href: 'buyer-center.html?menu=contract' }
            ]
        },
        supplier: {
            title: '供方中心',
            sections: [
                {
                    label: '数据登记',
                    icon: 'register',
                    children: [
                        { key: 'resource-register', label: '资源登记管理', href: 'supplier-center.html?menu=resource-register' },
                        { key: 'product-register', label: '产品登记管理', href: 'supplier-center.html?menu=product-register' }
                    ]
                },
                {
                    label: '数据上架',
                    icon: 'listing',
                    defaultOpen: true,
                    children: [
                        { key: 'resource-shelf', label: '资源上下架管理', href: 'supplier-center.html?menu=resource-shelf' },
                        { key: 'product-shelf', label: '产品上下架管理', href: 'supplier-center.html?menu=product-shelf' },
                        { key: 'service-shelf', label: '服务上下架管理', href: 'supplier-center.html?menu=service-shelf' }
                    ]
                },
                {
                    label: '订单合同',
                    icon: 'order',
                    defaultOpen: true,
                    children: [
                        { key: 'resource-order', label: '资源申请审批', href: 'supplier-center.html?menu=resource-order' },
                        { key: 'product-order', label: '产品订单管理', href: 'supplier-center.html?menu=product-order' },
                        { key: 'service-order', label: '服务订单管理', href: 'supplier-center.html?menu=service-order' },
                        { key: 'product-contract', label: '产品合同管理', href: 'supplier-center.html?menu=product-contract' },
                        { key: 'service-contract', label: '服务合同管理', href: 'supplier-center.html?menu=service-contract' }
                    ]
                },
                {
                    label: '费用管理',
                    icon: 'money',
                    defaultOpen: true,
                    children: [
                        { key: 'transaction-bill', label: '交易账单管理', href: 'supplier-center.html?menu=transaction-bill' },
                        { key: 'offline-voucher', label: '线下支付凭证', href: 'supplier-center.html?menu=offline-voucher' }
                    ]
                },
                {
                    label: '发票管理',
                    icon: 'invoice',
                    children: [
                        { key: 'invoice', label: '发票管理', href: 'supplier-center.html?menu=invoice' }
                    ]
                },
                { key: 'demand-response', label: '需求响应', icon: 'demand', href: 'supplier-center.html?menu=demand-response' },
                {
                    label: '争议仲裁',
                    icon: 'dispute',
                    children: [
                        { key: 'dispute', label: '争议仲裁', href: 'supplier-center.html?menu=dispute' }
                    ]
                },
                {
                    label: '合约管理',
                    icon: 'contract',
                    children: [
                        { key: 'contract', label: '合约管理', href: 'supplier-center.html?menu=contract' }
                    ]
                }
            ]
        }
    };

    var menuMeta = {
        'resource-apply': { title: '资源申请管理', desc: '查看和跟进已提交的数据资源申请、授权进度与交付状态。' },
        'resource-order': { title: '资源申请审批', desc: '处理需求方提交的数据资源申请、授权审批与交付确认。' },
        'product-order': { title: '产品订单管理', desc: '查看产品订单、购买申请、审批状态与交易进度。' },
        'service-order': { title: '服务订单管理', desc: '查看服务订单、服务申请、审批状态与交付进度。' },
        'product-contract': { title: '产品合同管理', desc: '管理产品交易合同、合同签署、确认和履约相关事项。' },
        'service-contract': { title: '服务合同管理', desc: '管理服务交易合同、签署确认和履约相关事项。' },
        'resource-register': { title: '资源登记管理', desc: '维护资源登记信息、资源目录资料和基础交付说明。' },
        'product-register': { title: '产品登记管理', desc: '维护数据产品登记信息、产品介绍、计费方式和交付资料。' },
        'resource-shelf': { title: '资源上下架管理', desc: '管理数据资源的展示状态、上架申请和下架处理。' },
        'product-shelf': { title: '产品上下架管理', desc: '管理数据产品上架、下架、展示状态和可售配置。' },
        'service-shelf': { title: '服务管理', desc: '管理咨询服务和行业方案的上架、下架、审批与版本状态。' },
        'fee': { title: '费用管理', desc: '查看交易费用、应收应付、结算记录和费用确认事项。' },
        'transaction-bill': { title: '交易账单管理', desc: '查看交易账单、结算周期、应收应付与确认记录。' },
        'offline-voucher': { title: '线下支付凭证', desc: '管理线下转账凭证、到账确认和付款记录。' },
        'invoice': { title: '发票管理', desc: '处理发票申请、开票记录和发票状态跟踪。' },
        'profile': { title: '账号中心', desc: '查看账号信息、会员权益和业务开通情况。' },
        'message': { title: '我的消息', desc: '查看系统通知、业务提醒和站内消息。' },
        'subscribe': { title: '我的订阅', desc: '查看已订阅的数据资源、产品和服务动态。' },
        'my-demand': { title: '我的需求', desc: '查看已发布的数据需求、需求状态和响应情况。' },
        'demand-response': { title: '需求响应', desc: '查看可响应需求、已响应记录和需求沟通进度。' },
        'consults': { title: '我的咨询', desc: '查看需求、资源、产品、服务和方案咨询记录。' },
        'objection': { title: '公示异议', desc: '查看公示异议提交和处理情况。' },
        'dispute': { title: '争议仲裁', desc: '管理交易争议、仲裁申请和处理记录。' },
        'contract': { title: '合约管理', desc: '查看智能合约、合约状态和链上存证信息。' }
    };

    var CONSULT_TYPES = ['需求咨询', '资源咨询', '产品咨询', '服务咨询', '方案咨询'];
    var CONSULT_TYPE_MAP = {
        '数据资源': '资源咨询',
        '数据产品': '产品咨询',
        '数据咨询服务': '服务咨询',
        '行业解决方案': '方案咨询'
    };

    var consultRecords = [
        {
            id: 'demand',
            audience: 'buyer',
            object: '企业领导驾驶舱服务需求',
            type: '需求咨询',
            typeClass: 'demand',
            unread: true,
            createdAt: '2026-06-03 10:32',
            person: '刘洋',
            status: '待处理',
            submitInfo: {
                org: '智慧数据科技有限公司',
                name: '周琳',
                phone: '13809523505',
                email: 'zhoulin@smartdata.cn'
            },
            objectInfo: [
                ['需求名称', '企业领导驾驶舱服务需求'],
                ['需求类型', '应用需求'],
                ['响应供方', '龙岗数智集成服务有限公司'],
                ['需求预算', '面议'],
                ['截止时间', '2026-06-30']
            ],
            orgInfo: [
                ['法人或其他组织类型', '企业单位法人'],
                ['法人或其他组织名称', '智慧数据科技有限公司'],
                ['统一社会信用代码', '91440300MA5SDT328R'],
                ['营业期限或有效期', '长期有效'],
                ['所属行业类型', '软件和信息技术服务业'],
                ['注册金额', '1200万元'],
                ['注册日期', '2021-06-18'],
                ['注册地址', '广东省深圳市龙岗区'],
                ['注册详细地址', '龙岗区坂田街道天安云谷产业园一期3栋1506'],
                ['核准机构', '深圳市市场监督管理局'],
                ['经营范围或业务范围', '数据应用开发、数据治理服务、企业数字化咨询'],
                ['机构简介', '面向政企客户提供数据驾驶舱、指标体系建设和数据应用集成服务。']
            ],
            messages: [
                { kind: 'time', text: '2026-06-03 10:32' },
                { kind: 'msg', from: 'asker', name: '周琳', text: '我们计划建设企业领导驾驶舱，需要咨询是否可以提供指标体系梳理、数据接入评估和原型方案。' },
                { kind: 'time', text: '2026-06-03 10:48' },
                { kind: 'msg', from: 'provider', name: '刘洋', text: '您好，可以先确认现有财务、项目、客户和运营系统的数据源清单，再评估驾驶舱指标口径和实施周期。' },
                { kind: 'msg', from: 'provider', name: '刘洋', text: '请补充当前已有报表样例和希望优先展示的核心指标，我们会据此给出初步建议。' }
            ]
        },
        {
            id: 'buyer-demand-energy',
            audience: 'buyer',
            object: '园区能耗监测数据服务需求',
            type: '需求咨询',
            typeClass: 'demand',
            createdAt: '2026-06-02 15:18',
            person: '黄敏',
            status: '已处理',
            submitInfo: {
                org: '龙岗某园区运营有限公司',
                name: '黄敏',
                phone: '13809523506',
                email: 'huangmin@parkops.cn'
            },
            objectInfo: [
                ['需求名称', '园区能耗监测数据服务需求'],
                ['需求类型', '数据服务需求'],
                ['响应供方', '深圳市智碳数据服务有限公司'],
                ['需求预算', '30万元以内'],
                ['截止时间', '2026-06-25']
            ],
            orgInfo: [
                ['法人或其他组织类型', '企业单位法人'],
                ['法人或其他组织名称', '龙岗某园区运营有限公司'],
                ['统一社会信用代码', '91440300MA5PARK88Q'],
                ['营业期限或有效期', '长期有效'],
                ['所属行业类型', '园区运营服务'],
                ['注册金额', '2500万元'],
                ['注册日期', '2019-09-16'],
                ['注册地址', '广东省深圳市龙岗区'],
                ['注册详细地址', '龙岗区宝龙街道新能源产业园综合楼'],
                ['核准机构', '深圳市市场监督管理局'],
                ['经营范围或业务范围', '产业园区运营、能源管理、企业服务'],
                ['机构简介', '负责园区公共设施运营、企业入驻服务和能耗管理。']
            ],
            messages: [
                { kind: 'time', text: '2026-06-02 15:18' },
                { kind: 'msg', from: 'asker', name: '黄敏', text: '园区希望接入楼栋、企业和公共区域能耗数据，咨询是否支持按小时统计和异常用能提醒。' },
                { kind: 'time', text: '2026-06-02 16:05' },
                { kind: 'msg', from: 'provider', name: '周启', text: '支持按楼栋、楼层和企业维度统计，也可以配置峰谷用电、环比突增和离线设备提醒。' },
                { kind: 'msg', from: 'asker', name: '黄敏', text: '已收到，后续会整理电表点位清单和现有采集系统说明。' }
            ]
        },
        {
            id: 'buyer-demand-lowalt',
            audience: 'buyer',
            object: '低空巡检影像数据接入需求',
            type: '需求咨询',
            typeClass: 'demand',
            createdAt: '2026-05-30 09:42',
            person: '郭扬',
            status: '已处理',
            submitInfo: {
                org: '深圳市龙岗区城市服务有限公司',
                name: '郭扬',
                phone: '13809523507',
                email: 'guoyang@lgcity.cn'
            },
            objectInfo: [
                ['需求名称', '低空巡检影像数据接入需求'],
                ['需求类型', '场景应用需求'],
                ['响应供方', '龙岗低空科技有限公司'],
                ['需求预算', '面议'],
                ['截止时间', '2026-06-15']
            ],
            orgInfo: [
                ['法人或其他组织类型', '企业单位法人'],
                ['法人或其他组织名称', '深圳市龙岗区城市服务有限公司'],
                ['统一社会信用代码', '91440300MA5CITY26K'],
                ['营业期限或有效期', '长期有效'],
                ['所属行业类型', '城市公共服务'],
                ['注册金额', '5000万元'],
                ['注册日期', '2017-04-21'],
                ['注册地址', '广东省深圳市龙岗区'],
                ['注册详细地址', '龙岗区龙城街道城市服务中心'],
                ['核准机构', '深圳市市场监督管理局'],
                ['经营范围或业务范围', '城市运营服务、巡检管理、公共设施维护'],
                ['机构简介', '承担城市公共空间巡检、设施维护和事件处置协同工作。']
            ],
            messages: [
                { kind: 'time', text: '2026-05-30 09:42' },
                { kind: 'msg', from: 'asker', name: '郭扬', text: '想咨询低空巡检影像是否可以接入现有城市事件平台，用于识别楼顶堆物和道路积水。' },
                { kind: 'time', text: '2026-05-30 10:20' },
                { kind: 'msg', from: 'provider', name: '林峰', text: '可以通过接口推送识别结果和图片地址，建议先选取一个街道做试点验证。' },
                { kind: 'msg', from: 'asker', name: '郭扬', text: '本次咨询已完成，试点方案后续通过需求响应流程推进。' }
            ]
        },
        {
            id: 'buyer-demand-traffic',
            audience: 'buyer',
            object: '道路交通运行指标分析需求',
            type: '需求咨询',
            typeClass: 'demand',
            unread: true,
            createdAt: '2026-06-04 09:18',
            person: '许晨',
            status: '待处理',
            submitInfo: {
                org: '龙岗某交通科技有限公司',
                name: '许晨',
                phone: '13809523508',
                email: 'xuchen@lgtraffic.cn'
            },
            objectInfo: [
                ['需求名称', '道路交通运行指标分析需求'],
                ['需求类型', '数据分析需求'],
                ['响应供方', '深圳市路网数据服务有限公司'],
                ['需求预算', '20万元以内'],
                ['截止时间', '2026-07-05']
            ],
            orgInfo: [],
            messages: [
                { kind: 'time', text: '2026-06-04 09:18' },
                { kind: 'msg', from: 'asker', name: '许晨', text: '希望咨询道路拥堵指数、平均车速和重点路段通行效率指标是否可以按小时输出。' }
            ]
        },
        {
            id: 'buyer-demand-credit',
            audience: 'buyer',
            object: '企业信用画像数据应用需求',
            type: '需求咨询',
            typeClass: 'demand',
            unread: true,
            createdAt: '2026-06-04 10:46',
            person: '林雅',
            status: '待处理',
            submitInfo: {
                org: '深圳某产业金融服务有限公司',
                name: '林雅',
                phone: '13809523509',
                email: 'linya@finance.cn'
            },
            objectInfo: [
                ['需求名称', '企业信用画像数据应用需求'],
                ['需求类型', '数据应用需求'],
                ['响应供方', '龙岗信用数据服务有限公司'],
                ['需求预算', '面议'],
                ['截止时间', '2026-07-08']
            ],
            orgInfo: [],
            messages: [
                { kind: 'time', text: '2026-06-04 10:46' },
                { kind: 'msg', from: 'asker', name: '林雅', text: '想咨询企业信用画像是否能结合经营、司法、税务和融资行为数据形成评分模型。' }
            ]
        },
        {
            id: 'buyer-demand-tourism',
            audience: 'buyer',
            object: '文旅客流预测数据服务需求',
            type: '需求咨询',
            typeClass: 'demand',
            createdAt: '2026-06-04 14:12',
            person: '何佳',
            status: '待处理',
            submitInfo: {
                org: '龙岗某文旅运营有限公司',
                name: '何佳',
                phone: '13809523510',
                email: 'hejia@culture.cn'
            },
            objectInfo: [
                ['需求名称', '文旅客流预测数据服务需求'],
                ['需求类型', '场景应用需求'],
                ['响应供方', '深圳市文旅数智科技有限公司'],
                ['需求预算', '15万元以内'],
                ['截止时间', '2026-07-10']
            ],
            orgInfo: [],
            messages: [
                { kind: 'time', text: '2026-06-04 14:12' },
                { kind: 'msg', from: 'asker', name: '何佳', text: '需要了解节假日客流预测是否可以结合天气、活动日历和历史入园数据进行分析。' }
            ]
        },
        {
            id: 'buyer-demand-logistics',
            audience: 'buyer',
            object: '物流订单履约监测需求',
            type: '需求咨询',
            typeClass: 'demand',
            createdAt: '2026-06-05 09:05',
            person: '邓鹏',
            status: '待处理',
            submitInfo: {
                org: '深圳某供应链管理有限公司',
                name: '邓鹏',
                phone: '13809523511',
                email: 'dengpeng@scm.cn'
            },
            objectInfo: [
                ['需求名称', '物流订单履约监测需求'],
                ['需求类型', '数据服务需求'],
                ['响应供方', '龙岗物流数据服务有限公司'],
                ['需求预算', '25万元以内'],
                ['截止时间', '2026-07-12']
            ],
            orgInfo: [],
            messages: [
                { kind: 'time', text: '2026-06-05 09:05' },
                { kind: 'msg', from: 'asker', name: '邓鹏', text: '咨询订单履约监测是否支持运输节点、延误预警和异常签收统计。' }
            ]
        },
        {
            id: 'buyer-demand-governance',
            audience: 'buyer',
            object: '公共数据治理咨询需求',
            type: '需求咨询',
            typeClass: 'demand',
            createdAt: '2026-06-05 11:28',
            person: '叶宁',
            status: '待处理',
            submitInfo: {
                org: '龙岗某公共服务机构',
                name: '叶宁',
                phone: '13809523512',
                email: 'yening@govservice.cn'
            },
            objectInfo: [
                ['需求名称', '公共数据治理咨询需求'],
                ['需求类型', '咨询服务需求'],
                ['响应供方', '深圳市数治咨询有限公司'],
                ['需求预算', '面议'],
                ['截止时间', '2026-07-15']
            ],
            orgInfo: [],
            messages: [
                { kind: 'time', text: '2026-06-05 11:28' },
                { kind: 'msg', from: 'asker', name: '叶宁', text: '希望咨询数据目录梳理、质量规则配置和共享开放前的合规检查工作量。' }
            ]
        },
        {
            id: 'resource',
            audience: 'supplier',
            object: '金融行业A股上市公司股吧数据集',
            type: '数据资源',
            typeClass: '',
            unread: true,
            createdAt: '2026-06-03 09:28',
            person: '陈雨',
            status: '待处理',
            submitInfo: {
                org: '中节能铁汉生态环境股份有限公司',
                name: '陈雨',
                phone: '13809523501',
                email: 'chenyu@cecep-tiehan.cn'
            },
            objectInfo: [
                ['资源名称', '金融行业A股上市公司股吧数据集'],
                ['资源类型', '行业数据'],
                ['资源提供方', '智云****公司'],
                ['交付方式', '在线交付'],
                ['上架时间', '2025-11-04 15:00:00']
            ],
            orgInfo: [
                ['法人或其他组织类型', '企事业单位法人'],
                ['法人或其他组织名称', '中节能铁汉生态环境股份有限公司'],
                ['统一社会信用代码', '91440300731109149K'],
                ['营业期限或有效期', '长期有效'],
                ['所属行业类型', '--'],
                ['注册金额', '--'],
                ['注册日期', '--'],
                ['注册地址', '广东省深圳市龙岗区'],
                ['注册详细地址', '黄阁坑社区黄阁北路449号龙岗天安数码创新园三号厂房B1401'],
                ['核准机构', '--'],
                ['经营范围或业务范围', '--'],
                ['机构简介', '--']
            ],
            messages: [
                { kind: 'time', text: '2026-06-03 09:28' },
                { kind: 'msg', from: 'asker', name: '陈雨', text: '您好，我想了解这个数据集是否支持按行业和时间区间筛选，后续用于投资者情绪分析。' },
                { kind: 'time', text: '2026-06-03 09:41' },
                { kind: 'msg', from: 'provider', name: '智云****公司', text: '您好，当前样例支持按上市公司、行业分类和发帖时间筛选。正式交付时可以提供字段说明和调用口径。' },
                { kind: 'msg', from: 'asker', name: '陈雨', text: '如果申请 API 传输，是否可以先提供 7 天测试额度？' },
                { kind: 'time', text: '2026-06-03 10:05' },
                { kind: 'msg', from: 'provider', name: '智云****公司', text: '可以，建议您先提交资源申请，我们会在审批时备注测试额度和调用频率限制。' }
            ]
        },
        {
            id: 'supplier-resource-traffic',
            audience: 'supplier',
            object: '公共交通刷卡与站点客流数据',
            type: '数据资源',
            typeClass: '',
            unread: true,
            createdAt: '2026-06-04 08:50',
            person: '宋洁',
            status: '待处理',
            submitInfo: {
                org: '深圳某交通规划研究院',
                name: '宋洁',
                phone: '13809523513',
                email: 'songjie@transport.cn'
            },
            objectInfo: [
                ['资源名称', '公共交通刷卡与站点客流数据'],
                ['资源类型', '交通出行数据'],
                ['资源提供方', '龙岗数据'],
                ['交付方式', '接口调用'],
                ['上架时间', '2026-05-28 10:00:00']
            ],
            orgInfo: [],
            messages: [
                { kind: 'time', text: '2026-06-04 08:50' },
                { kind: 'msg', from: 'asker', name: '宋洁', text: '想了解站点客流数据是否支持按线路、站点和时段聚合，用于早晚高峰换乘分析。' }
            ]
        },
        {
            id: 'supplier-product-risk',
            audience: 'supplier',
            object: '企业经营风险预警产品',
            type: '数据产品',
            typeClass: 'product',
            unread: true,
            createdAt: '2026-06-04 13:26',
            person: '马宁',
            status: '待处理',
            submitInfo: {
                org: '龙岗某小微金融服务公司',
                name: '马宁',
                phone: '13809523514',
                email: 'maning@microfinance.cn'
            },
            objectInfo: [
                ['产品名称', '企业经营风险预警产品'],
                ['产品类型', '数据产品'],
                ['产品提供方', '智慧数据科技有限公司'],
                ['交付方式', '在线服务'],
                ['计费方式', '按年订阅']
            ],
            orgInfo: [],
            messages: [
                { kind: 'time', text: '2026-06-04 13:26' },
                { kind: 'msg', from: 'asker', name: '马宁', text: '咨询企业风险预警是否包含司法、经营异常和舆情变化提醒，是否支持批量企业名单导入。' }
            ]
        },
        {
            id: 'supplier-service-compliance',
            audience: 'supplier',
            object: '数据安全合规体系建设咨询服务',
            type: '数据咨询服务',
            typeClass: 'service',
            createdAt: '2026-06-05 09:40',
            person: '郑琪',
            status: '待处理',
            submitInfo: {
                org: '深圳某医疗科技有限公司',
                name: '郑琪',
                phone: '13809523515',
                email: 'zhengqi@medtech.cn'
            },
            objectInfo: [
                ['服务名称', '数据安全合规体系建设咨询服务'],
                ['服务类型', '数据咨询服务'],
                ['服务提供方', '智慧数据科技有限公司'],
                ['服务周期', '面议'],
                ['交付方式', '线上+线下交付']
            ],
            orgInfo: [],
            messages: [
                { kind: 'time', text: '2026-06-05 09:40' },
                { kind: 'msg', from: 'asker', name: '郑琪', text: '我们有医疗业务数据，希望咨询分类分级、权限管控和共享前脱敏评估的服务范围。' }
            ]
        },
        {
            id: 'supplier-solution-energy',
            audience: 'supplier',
            object: '园区能耗精细化治理方案',
            type: '行业解决方案',
            typeClass: 'solution',
            createdAt: '2026-06-05 10:18',
            person: '谢文',
            status: '待处理',
            submitInfo: {
                org: '龙岗某产业园区管理公司',
                name: '谢文',
                phone: '13809523516',
                email: 'xiewen@park.cn'
            },
            objectInfo: [
                ['方案名称', '园区能耗精细化治理方案'],
                ['方案类型', '行业解决方案'],
                ['方案提供方', '智慧数据科技有限公司'],
                ['适用行业', '园区运营'],
                ['交付周期', '面议']
            ],
            orgInfo: [],
            messages: [
                { kind: 'time', text: '2026-06-05 10:18' },
                { kind: 'msg', from: 'asker', name: '谢文', text: '咨询方案是否支持企业分户能耗核算、异常用能提醒和节能改造效果评估。' }
            ]
        },
        {
            id: 'supplier-product-supply',
            audience: 'supplier',
            object: '产业链供需匹配数据产品',
            type: '数据产品',
            typeClass: 'product',
            createdAt: '2026-06-05 14:06',
            person: '曹越',
            status: '待处理',
            submitInfo: {
                org: '深圳某产业服务平台运营方',
                name: '曹越',
                phone: '13809523517',
                email: 'caoyue@industry.cn'
            },
            objectInfo: [
                ['产品名称', '产业链供需匹配数据产品'],
                ['产品类型', '数据产品'],
                ['产品提供方', '智慧数据科技有限公司'],
                ['交付方式', '在线服务'],
                ['计费方式', '按调用量计费']
            ],
            orgInfo: [],
            messages: [
                { kind: 'time', text: '2026-06-05 14:06' },
                { kind: 'msg', from: 'asker', name: '曹越', text: '想了解供需匹配产品是否可按企业标签、产品能力和采购需求自动推荐合作对象。' }
            ]
        },
        {
            id: 'product',
            audience: 'supplier',
            object: '慧企政策智能推荐',
            type: '数据产品',
            typeClass: 'product',
            createdAt: '2026-06-02 16:20',
            person: '李明',
            status: '已处理',
            submitInfo: {
                org: '深圳市龙岗区数字产业服务有限公司',
                name: '李明',
                phone: '13809523502',
                email: 'liming@lgdigital.cn'
            },
            objectInfo: [
                ['产品名称', '慧企政策智能推荐'],
                ['产品类型', '数据产品'],
                ['产品提供方', '智慧数据科技有限公司'],
                ['交付方式', '在线交付'],
                ['计费方式', '预付费']
            ],
            orgInfo: [
                ['法人或其他组织类型', '企业单位法人'],
                ['法人或其他组织名称', '深圳市龙岗区数字产业服务有限公司'],
                ['统一社会信用代码', '91440300MA5K8A2G3L'],
                ['营业期限或有效期', '长期有效'],
                ['所属行业类型', '软件和信息技术服务业'],
                ['注册金额', '1000万元'],
                ['注册日期', '2022-08-18'],
                ['注册地址', '广东省深圳市龙岗区'],
                ['注册详细地址', '龙岗区坂田街道数字经济产业园A座1208'],
                ['核准机构', '深圳市市场监督管理局'],
                ['经营范围或业务范围', '数据技术服务、企业服务、产业咨询'],
                ['机构简介', '面向企业提供政策匹配、产业服务和数据应用支撑。']
            ],
            messages: [
                { kind: 'time', text: '2026-06-02 16:20' },
                { kind: 'msg', from: 'asker', name: '李明', text: '请问慧企政策智能推荐是否可以根据企业标签自动推送可申报政策？' },
                { kind: 'msg', from: 'provider', name: '智慧数据科技有限公司', text: '可以，产品会基于企业行业、规模、资质、区域等标签进行政策匹配，并支持订阅提醒。' },
                { kind: 'time', text: '2026-06-02 17:03' },
                { kind: 'msg', from: 'asker', name: '李明', text: '我们希望先用于园区企业服务场景，是否支持批量企业导入？' },
                { kind: 'msg', from: 'provider', name: '智慧数据科技有限公司', text: '支持批量导入，也可以通过接口同步企业清单。购买前可以先确认字段模板。' }
            ]
        },
        {
            id: 'service',
            audience: 'supplier',
            object: '数据资产入表规划咨询服务',
            type: '数据咨询服务',
            typeClass: 'service',
            unread: true,
            createdAt: '2026-06-01 11:36',
            person: '王静',
            status: '待处理',
            submitInfo: {
                org: '深圳某制造企业',
                name: '王静',
                phone: '13809523503',
                email: 'wangjing@manufacture.cn'
            },
            objectInfo: [
                ['服务名称', '数据资产入表规划咨询服务'],
                ['服务类型', '数据咨询服务'],
                ['服务提供方', '智慧数据科技有限公司'],
                ['服务周期', '面议'],
                ['交付方式', '线上+线下交付']
            ],
            orgInfo: [
                ['法人或其他组织类型', '企业单位法人'],
                ['法人或其他组织名称', '深圳某制造企业'],
                ['统一社会信用代码', '91440300MA5MFG8821'],
                ['营业期限或有效期', '长期有效'],
                ['所属行业类型', '制造业'],
                ['注册金额', '3000万元'],
                ['注册日期', '2018-05-12'],
                ['注册地址', '广东省深圳市龙岗区'],
                ['注册详细地址', '龙岗区宝龙街道智能制造产业园6栋'],
                ['核准机构', '深圳市市场监督管理局'],
                ['经营范围或业务范围', '智能装备制造、数据化生产管理'],
                ['机构简介', '正在推进生产数据资产梳理和财务入表准备。']
            ],
            messages: [
                { kind: 'time', text: '2026-06-01 11:36' },
                { kind: 'msg', from: 'asker', name: '王静', text: '我们计划梳理生产设备、能耗和质量检测相关数据资产，想咨询入表前需要准备哪些材料。' },
                { kind: 'time', text: '2026-06-01 13:10' },
                { kind: 'msg', from: 'provider', name: '智慧数据科技有限公司', text: '建议先准备数据资源目录、数据权属说明、采集链路、质量报告和内部使用场景说明。' },
                { kind: 'msg', from: 'asker', name: '王静', text: '是否可以安排一次初步访谈，帮助判断哪些数据适合优先入表？' }
            ]
        },
        {
            id: 'solution',
            audience: 'supplier',
            object: '金融行业数据应用解决方案',
            type: '行业解决方案',
            typeClass: 'solution',
            createdAt: '2026-05-31 14:12',
            person: '赵强',
            status: '已处理',
            submitInfo: {
                org: '龙岗某金融科技企业',
                name: '赵强',
                phone: '13809523504',
                email: 'zhaoqiang@fintech.cn'
            },
            objectInfo: [
                ['方案名称', '金融行业数据应用解决方案'],
                ['方案类型', '行业解决方案'],
                ['方案提供方', '智慧数据科技有限公司'],
                ['适用行业', '金融业'],
                ['交付周期', '面议']
            ],
            orgInfo: [
                ['法人或其他组织类型', '企业单位法人'],
                ['法人或其他组织名称', '龙岗某金融科技企业'],
                ['统一社会信用代码', '91440300MA5FIN982Q'],
                ['营业期限或有效期', '长期有效'],
                ['所属行业类型', '金融科技'],
                ['注册金额', '2000万元'],
                ['注册日期', '2020-11-09'],
                ['注册地址', '广东省深圳市龙岗区'],
                ['注册详细地址', '龙岗区天安云谷产业园二期4栋1602'],
                ['核准机构', '深圳市市场监督管理局'],
                ['经营范围或业务范围', '金融数据应用、风控模型、企业征信服务'],
                ['机构简介', '专注金融场景下的数据合规应用和智能风控。']
            ],
            messages: [
                { kind: 'time', text: '2026-05-31 14:12' },
                { kind: 'msg', from: 'asker', name: '赵强', text: '请问金融行业数据应用解决方案是否包含企业信用评估和风险预警模块？' },
                { kind: 'msg', from: 'provider', name: '智慧数据科技有限公司', text: '包含，方案内置企业画像、信用评估、经营异常监测和风险预警看板，可按业务场景裁剪。' },
                { kind: 'time', text: '2026-05-31 15:06' },
                { kind: 'msg', from: 'asker', name: '赵强', text: '如果已有自建风控系统，是否支持只采购数据接入和指标加工部分？' },
                { kind: 'msg', from: 'provider', name: '智慧数据科技有限公司', text: '支持模块化交付，可以先对接现有系统，再按指标体系补充加工模型和接口。' }
            ]
        }
    ];

    var consultationServiceCatalog = [
        {
            id: 'governance',
            status: 'listed',
            name: '企业数据治理与合规咨询服务',
            category: '数据咨询服务',
            serviceType: '企业数据治理与合规咨询服务',
            org: '数据提供方,数据需求方',
            business: '数据产品,数据资源需求',
            delivery: '线下交付',
            createdAt: '2026-05-27',
            version: 'v1',
            cover: 'images/consult-governance.jpg',
            tabDesc: '治理合规、风险识别、整改落地',
            badge: '数据治理与合规',
            heroTitle: '企业数据治理与合规咨询服务',
            heroSubtitle: '面向企业数据资源盘点、治理体系建设、合规风险识别和整改落地，帮助企业建立可管理、可审计、可流通的数据资产基础。',
            lead: '本服务围绕企业数据全生命周期治理与合规经营要求，帮助客户完成数据资源摸底、分类分级、制度流程建设、合规风险整改和数据资产化准备，为后续数据产品发布、数据交易流通和数据资产入表打好基础。',
            sections: [
                { title: '服务说明', content: '咨询团队将结合企业业务系统、数据资源目录、数据使用场景和外部合规要求，识别企业在数据采集、存储、加工、共享、交易、销毁等环节的治理短板与合规风险。\n服务成果包括数据资源清单、数据分类分级建议、数据治理制度框架、关键流程规范、合规风险清单和整改路线图，帮助企业形成可执行、可追踪、可持续优化的数据治理体系。' },
                { title: '服务流程', content: '01 需求调研：访谈业务、技术、法务和管理部门，明确治理目标、数据范围、业务场景和交付边界。\n02 数据盘点：梳理数据来源、系统分布、字段口径、共享链路和责任主体，形成数据资源基础台账。\n03 合规评估：围绕数据安全、个人信息保护、授权使用和跨主体流通开展风险识别与差距分析。\n04 治理方案：设计分类分级、权限管理、质量管理、共享审批和审计留痕等治理规则与流程。\n05 制度落地：辅导企业建立制度模板、流程表单、岗位职责和整改计划，推动治理动作进入日常运营。\n06 验收优化：复核整改结果，输出验收材料和持续优化建议，为后续数据资产化和流通应用提供支撑。' },
                { title: '服务优势', content: '01 合规要求与业务场景结合：不是单纯罗列法规条款，而是结合企业实际数据来源、使用路径和交易场景形成可落地规则。\n02 交付成果结构清晰：输出清单、制度、流程、风险和整改计划，方便企业内部评审、协同执行和后续复盘。\n03 衔接数据资产化路径：治理成果可继续支撑数据产品发布、数据资产入表、授权流通和融资评估等后续服务。\n04 持续改进机制：通过指标、责任和审计机制固化治理能力，避免咨询成果停留在一次性文档层面。' },
                { title: '服务案例', content: '01 制造企业数据治理与合规整改：为龙岗区某制造企业梳理生产、设备、供应链和客户服务数据资源，识别数据授权不清、共享审批缺失、质量口径不一致等问题，形成数据资源台账、分类分级规则和合规整改路线图，支撑企业后续开展数据产品包装和资产化评估。\n02 科技服务企业数据产品发布前合规评估：针对某科技服务企业拟上架的数据产品，梳理数据来源、授权链路、加工规则和对外服务边界，完成个人信息与敏感数据风险识别，输出产品发布前合规审查清单和整改建议，帮助企业降低上架审核与后续交易风险。\n03 商贸集团多系统数据分类分级治理：面向某商贸集团会员、交易、仓储和供应链系统数据分散的问题，建立统一的数据分类分级口径和权限管理规则，明确各类数据的使用范围、共享审批流程和审计要求，提升集团跨部门数据协同效率。\n04 园区运营企业数据共享授权流程优化：为某产业园区运营企业梳理企业服务、空间管理、能耗监测和招商运营数据的共享场景，设计数据使用申请、授权确认、调用留痕和周期复核机制，帮助园区形成可复用的数据共享管理规范。' }
            ],
            pricing: { payMode: '预付费', measures: ['按次数', '按时长', '面议'], countPrice: '', countUnit: '元/次', durationPrice: '', durationUnit: '元/月', referencePrice: '面议' }
        },
        {
            id: 'accounting',
            status: 'listed',
            name: '企业数据资产入表咨询服务',
            category: '数据咨询服务',
            serviceType: '企业数据资产入表咨询服务',
            org: '数据提供方,数据需求方',
            business: '数据产品,数据资源需求',
            delivery: '线下交付',
            createdAt: '2026-05-27',
            version: 'v1',
            cover: 'images/consult-accounting.jpg',
            tabDesc: '资产识别、评估入表、披露辅导',
            badge: '数据资产入表',
            heroTitle: '企业数据资产入表咨询服务',
            heroSubtitle: '面向企业数据资源资产化和财务入表需求，提供资源识别、价值评估、会计处理、审计协同和披露辅导的一体化咨询服务。',
            lead: '本服务帮助企业把可识别、可控制、可计量的数据资源转化为规范化的数据资产管理对象，围绕数据资产确认、计量、列报和后续运营建立可审计的入表路径。',
            sections: [
                { title: '服务说明', content: '咨询团队将结合企业业务模式、数据来源、权属边界、成本归集和收益场景，判断数据资源是否具备资产确认基础，并形成入表可行性诊断。\n服务成果包括数据资产识别清单、入表路径建议、价值评估思路、会计处理建议、审计沟通材料和数据资产后续管理建议，支撑企业稳妥推进数据资源入表。' },
                { title: '服务流程', content: '01 资源盘点：梳理企业数据资源类型、来源系统、形成过程和应用场景，明确重点入表对象。\n02 确认边界：核验数据权属、控制能力、使用限制和合规基础，判断资产确认条件。\n03 价值评估：结合成本投入、应用收益和市场参考，建立数据资产价值评估口径。\n04 入表方案：制定入表路径、科目建议、披露内容和管理制度配套方案。\n05 审计协同：协助准备底稿、证明材料和沟通要点，降低审计确认过程的不确定性。\n06 持续管理：建立数据资产台账、更新机制和后续减值、披露、运营管理建议。' },
                { title: '服务优势', content: '01 贴合会计处理要求：围绕企业数据资源相关会计处理要求，形成清晰的确认、计量和披露逻辑。\n02 评估口径可解释：将数据质量、应用价值、成本投入和收益预期纳入评估，便于内部决策和外部沟通。\n03 审计沟通前置：提前准备证明材料和底稿框架，提升入表过程的规范性和通过率。\n04 兼顾后续运营：不仅完成一次性入表规划，也同步建立数据资产台账和持续管理机制。' },
                { title: '服务案例', content: '01 文化科技企业模型数据资产入表：为某文化科技企业梳理大模型训练语料、标注成果和模型服务数据，明确成本归集口径和资产确认边界，形成入表方案和审计沟通材料。\n02 制造企业设备运行数据资产评估：围绕设备监测、故障诊断和产线优化数据，建立数据资源台账、价值评估模型和后续管理机制，支撑企业开展数据资产确认。\n03 平台企业客户运营数据入表辅导：针对客户画像、交易行为和运营标签数据，梳理数据形成过程、授权基础和收益应用场景，输出数据资产入表可行性报告。\n04 物流企业运输调度数据资产化：对线路调度、车辆轨迹和配送效率数据进行分类评估，形成可管理的数据资产清单和财务入表准备材料。' }
            ],
            pricing: { payMode: '预付费', measures: ['按时长', '面议'], countPrice: '', countUnit: '元/次', durationPrice: '3000', durationUnit: '元/天', referencePrice: '3000元/天' }
        },
        {
            id: 'hosting',
            status: 'listed',
            name: '企业数据资源托管运营服务',
            category: '数据咨询服务',
            serviceType: '企业数据资源托管运营服务',
            org: '数据提供方,数据需求方',
            business: '数据产品,数据资源需求',
            delivery: '线下交付',
            createdAt: '2026-05-27',
            version: 'v1',
            cover: 'images/consult-hosting.jpg',
            tabDesc: '资源托管、运营治理、价值提升',
            badge: '托管运营',
            heroTitle: '企业数据资源托管运营服务',
            heroSubtitle: '为企业提供数据资源接入、编目、治理、运营、监测和价值提升服务，让沉淀在系统里的数据资源持续产生业务价值。',
            lead: '本服务面向拥有多源数据但缺少运营能力的企业，提供从资源托管、数据治理、服务封装到持续运营的陪伴式服务，帮助企业把数据资源转化为可管理、可调用、可交易的服务能力。',
            sections: [
                { title: '服务说明', content: '服务团队将对企业数据资产现状、系统接口、数据质量、合规基础和应用需求进行评估，明确托管运营范围和服务边界。\n交付内容涵盖数据资源目录、运营台账、质量规则、调用服务规范、运营监测指标和定期优化建议，支撑企业长期运营数据资源。' },
                { title: '服务流程', content: '01 接入评估：评估数据源、接口条件、权限范围和安全要求，明确托管运营目标。\n02 资源编目：统一梳理数据资源目录、字段口径、更新周期和责任主体。\n03 托管治理：建立质量校验、权限控制、变更管理和审计留痕规则。\n04 服务封装：围绕调用、查询、报表或产品化需求，设计可运营的数据服务形态。\n05 运行监测：跟踪数据更新、调用量、质量异常、服务响应和客户反馈。\n06 迭代优化：按周期输出运营分析和优化建议，持续提升数据资源价值。' },
                { title: '服务优势', content: '01 资源目录清晰：通过统一编目和责任划分，让企业清楚掌握可运营的数据资源底盘。\n02 治理运营一体：把质量、权限、安全和运营指标放在同一套机制里管理，避免只建不运。\n03 服务价值可跟踪：通过调用量、服务响应、质量问题和业务反馈持续衡量运营成效。\n04 支撑后续交易：托管成果可进一步支撑数据产品孵化、授权流通和对外服务交付。' },
                { title: '服务案例', content: '01 园区企业服务数据托管运营：为某园区运营主体托管企业画像、诉求工单和空间资源数据，建立目录、质量规则和运营看板，提升园区精准服务能力。\n02 商贸企业会员数据运营管理：围绕会员标签、交易行为和营销触达数据，建立托管台账和调用规范，支撑企业开展精细化运营。\n03 制造企业供应链数据服务化：将供应商、库存、采购和交付数据统一治理并封装为内部查询服务，提升供应链协同效率。\n04 文旅企业客流数据持续运营：托管景区客流、票务和活动数据，形成周期性运营分析报告，为经营决策和活动排期提供支撑。' }
            ],
            pricing: { payMode: '预付费', measures: ['面议'], countPrice: '', countUnit: '元/次', durationPrice: '', durationUnit: '元/月', referencePrice: '面议' }
        },
        {
            id: 'financing',
            status: 'listed',
            name: '企业数据资产融资咨询服务',
            category: '数据咨询服务',
            serviceType: '企业数据资产融资咨询服务',
            org: '数据提供方,数据需求方',
            business: '数据产品,数据资源需求',
            delivery: '线下交付',
            createdAt: '2026-05-27',
            version: 'v1',
            cover: 'images/consult-financing.jpg',
            tabDesc: '资产评估、融资设计、机构对接',
            badge: '数据资产融资',
            heroTitle: '企业数据资产融资咨询服务',
            heroSubtitle: '围绕企业数据资产价值识别、融资路径设计、增信材料准备和金融机构对接，帮助企业探索数据资产价值转化的新通道。',
            lead: '本服务面向具备数据资源、数据产品或数据资产化基础的企业，提供融资可行性诊断、资产价值说明、融资材料准备和机构沟通辅导，提升数据资产在融资场景中的可识别性和可信度。',
            sections: [
                { title: '服务说明', content: '咨询团队将围绕企业数据资产权属、质量、应用价值、收入贡献、合规基础和可持续运营能力，评估其在融资场景中的表达方式与支撑材料。\n服务成果包括融资诊断报告、数据资产价值说明、增信材料清单、融资路径建议、金融机构沟通材料和后续管理建议。' },
                { title: '服务流程', content: '01 融资诊断：识别企业融资目标、资金用途、数据资产基础和可行融资方式。\n02 资产确认：梳理数据权属、形成过程、运营场景和可持续收益基础。\n03 价值说明：围绕成本、收益、市场和场景价值，形成金融机构可理解的价值表达。\n04 增信方案：准备治理制度、合规证明、运营记录、交易记录等支撑材料。\n05 机构对接：协助企业进行融资方案说明、问题回应和材料补充。\n06 融后管理：建立数据资产运营跟踪和价值复核机制，支撑持续信用管理。' },
                { title: '服务优势', content: '01 懂数据也懂融资表达：将数据资产的技术、运营和价值逻辑转化为金融机构可评估的材料。\n02 重视合规和权属基础：优先梳理权属、授权和使用边界，降低融资审核中的合规疑虑。\n03 价值材料可复用：融资材料可复用于资产评估、产品上架、交易洽谈和内部管理。\n04 关注融后持续运营：帮助企业建立资产运营和价值复核机制，提升后续融资与信用管理能力。' },
                { title: '服务案例', content: '01 制造企业设备数据融资材料准备：基于设备运行、维保和产能优化数据，梳理数据资产价值说明和增信材料，辅助企业与金融机构沟通融资方案。\n02 平台企业交易数据融资诊断：围绕交易流水、客户画像和运营指标，评估数据资产对业务收入和信用评价的支撑价值。\n03 物流企业调度数据价值说明：将线路调度、运输效率和车辆轨迹数据整理为资产价值材料，支撑企业开展授信沟通。\n04 文创企业内容数据融资辅导：针对版权、用户行为和内容消费数据，梳理资产边界和运营价值，为融资洽谈准备说明材料。' }
            ],
            pricing: { payMode: '预付费', measures: ['按时长', '面议'], countPrice: '', countUnit: '元/次', durationPrice: '3000', durationUnit: '元/天', referencePrice: '3000元/天' }
        },
        {
            id: 'state-owned',
            status: 'listed',
            name: '行政事业单位及央国企数据资产全过程管理服务',
            category: '数据咨询服务',
            serviceType: '行政事业单位及央国企数据资产全过程管理服务',
            org: '数据提供方,数据需求方,法律服务商',
            business: '数据资源需求,数据产品',
            delivery: '线下交付',
            createdAt: '2026-05-27',
            version: 'v1',
            cover: 'images/consult-government.jpg',
            tabDesc: '目录梳理、授权运营、持续监管',
            badge: '全过程管理',
            heroTitle: '行政事业单位及央国企数据资产全过程管理服务',
            heroSubtitle: '面向行政事业单位、央国企及公共数据运营主体，提供数据资源普查、目录管理、授权运营、资产管理和成效评估服务。',
            lead: '本服务帮助行政事业单位及央国企构建覆盖数据资源发现、编目、确权、授权、运营、监管和评价的全过程管理体系，让公共属性强、组织链条长的数据资产管理更规范、更透明、更可持续。',
            sections: [
                { title: '服务说明', content: '咨询团队将结合单位职责、业务系统、数据目录、共享需求和监管要求，建立数据资源台账和资产管理规则。\n服务成果包括数据资源普查报告、目录台账、授权运营流程、资产管理制度、监管指标体系和成效评估报告。' },
                { title: '服务流程', content: '01 资源普查：梳理单位数据系统、数据资源、共享接口和业务场景，形成资源底账。\n02 目录台账：建立统一目录、字段说明、责任部门和更新维护机制。\n03 确权授权：明确数据管理责任、使用边界、授权审批和安全要求。\n04 资产管理：建立资产分类、登记、变更、评价和退出管理机制。\n05 运营监管：设计运营监测、调用审计、风险预警和绩效评价指标。\n06 成效评估：复盘管理成果、应用价值和治理问题，形成持续优化建议。' },
                { title: '服务优势', content: '01 适配公共治理场景：兼顾职责边界、公共属性、授权规则和监管要求，适合多部门协同推进。\n02 目录与资产管理贯通：从资源目录延伸到资产登记、运营和评价，避免资源清单与管理动作脱节。\n03 监管留痕清晰：围绕授权、调用、共享和运营过程建立留痕机制，便于审计与复核。\n04 关注运营成效：通过绩效指标和应用价值评价，让数据资产管理真正服务业务和公共服务。' },
                { title: '服务案例', content: '01 公共服务单位数据资源普查：梳理政务服务、办事记录和公共服务数据资源，形成目录台账和共享边界建议。\n02 国企经营数据资产管理体系建设：围绕经营、客户、合同和项目数据建立资产登记、更新维护和价值评价机制。\n03 公共数据授权运营流程设计：设计授权申请、审批、调用、审计和退出流程，支撑公共数据安全合规运营。\n04 事业单位数据资产绩效评价：建立数据资产应用成效指标，对共享次数、服务对象、应用价值和风险问题进行评价。' }
            ],
            pricing: { payMode: '预付费', measures: ['面议'], countPrice: '', countUnit: '元/次', durationPrice: '', durationUnit: '元/月', referencePrice: '面议' }
        },
        {
            id: 'incubation',
            status: 'listed',
            name: '企业数据产品孵化服务',
            category: '数据咨询服务',
            serviceType: '企业数据产品孵化服务',
            org: '数据提供方,数据需求方',
            business: '数据产品,数据资源需求',
            delivery: '线下交付',
            createdAt: '2026-05-27',
            version: 'v1',
            cover: 'images/consult-incubation.jpg',
            tabDesc: '产品策划、上架包装、运营陪跑',
            badge: '产品孵化',
            heroTitle: '企业数据产品孵化服务',
            heroSubtitle: '面向具备数据资源但缺少产品化能力的企业，提供场景识别、产品策划、数据加工、合规包装、上架运营和持续迭代服务。',
            lead: '本服务帮助企业把分散的数据资源转化为面向市场和业务场景的数据产品，补齐从需求洞察、产品定义、数据加工、合规校验到上架运营的关键能力。',
            sections: [
                { title: '服务说明', content: '咨询团队将从企业数据资源、目标客户、业务痛点、合规基础和交付能力出发，识别适合产品化的数据场景。\n服务成果包括产品定位、目标客户画像、数据加工方案、产品说明书、合规材料、上架资料和运营迭代计划。' },
                { title: '服务流程', content: '01 场景识别：分析企业数据资源和目标市场，筛选具备产品化价值的业务场景。\n02 产品策划：定义产品名称、客户对象、核心能力、交付方式和收费模式。\n03 数据加工：设计清洗、脱敏、聚合、标签和指标加工规则，形成可服务的数据形态。\n04 合规包装：准备授权、来源、脱敏、安全和使用边界说明，降低产品上架风险。\n05 上架运营：完善产品介绍、应用场景、服务说明和交付材料，支撑平台展示和交易。\n06 迭代增长：根据咨询、调用、交易和反馈情况优化产品能力和定价策略。' },
                { title: '服务优势', content: '01 从资源到产品：把数据资源、业务场景和客户需求连接起来，形成可理解、可购买的数据产品。\n02 合规材料同步准备：在产品策划阶段同步梳理数据来源、授权和使用边界，减少后续返工。\n03 关注交易转化：围绕客户痛点、展示内容和交付体验设计产品，提升咨询和交易转化效率。\n04 可持续运营迭代：根据市场反馈持续优化产品描述、数据能力、定价和交付方式。' },
                { title: '服务案例', content: '01 交通运行数据产品孵化：围绕拥堵指数、路段速度和事件数据，策划交通态势监测产品，形成指标口径、产品说明和上架材料。\n02 园区企业画像数据产品：基于企业工商、空间、用能和服务记录数据，孵化园区企业画像产品，支撑招商和企业服务场景。\n03 消费客群洞察数据产品：整合会员、交易和活动数据，设计客群标签和消费趋势产品，服务商业运营决策。\n04 设备运维数据服务产品：将设备运行、告警和维修数据加工为运维评分和风险预警服务，辅助制造企业降本增效。' }
            ],
            pricing: { payMode: '预付费', measures: ['按时长', '面议'], countPrice: '', countUnit: '元/次', durationPrice: '3000', durationUnit: '元/天', referencePrice: '3000元/天' }
        }
    ];

    var serviceShelfRecords = consultationServiceCatalog.map(function (item) {
        return {
            id: item.id,
            status: item.status,
            name: item.name,
            category: item.category,
            serviceType: item.serviceType,
            org: item.org,
            business: item.business,
            delivery: item.delivery,
            createdAt: item.createdAt,
            version: item.version
        };
    });

    function renderTopbar() {
        var container = document.querySelector('[data-workbench-topbar]');
        if (!container) return;

        var active = container.dataset.active || 'workbench';
        var navHtml = topNav.map(function (item) {
            var cls = item.key === active ? 'topbar-nav-item active' : 'topbar-nav-item';
            if (!item.href) return '<span class="' + cls + '">' + item.label + '</span>';
            var target = item.key === 'island' ? ' target="_blank"' : '';
            return '<a class="' + cls + '" href="' + item.href + '"' + target + '>' + item.label + '</a>';
        }).join('');

        container.innerHTML = ''
            + '<header class="admin-topbar">'
            +   '<div class="topbar-left">'
            +       '<a class="topbar-logo" href="index.html"><img src="images/logo.png" alt="龙岗数据">龙岗数据聚合服务平台</a>'
            +       '<nav class="topbar-nav">' + navHtml + '</nav>'
            +   '</div>'
            +   '<div id="adminUserArea" class="topbar-right"></div>'
            + '</header>';
    }

    function renderSidebar() {
        var container = document.querySelector('[data-workbench-sidebar]');
        if (!container) return;

        var center = container.dataset.center || 'buyer';
        var active = getActiveMenu(container);
        var config = sidebarMenus[center];
        if (!config) return;

        function itemHtml(item) {
            var cls = item.key === active ? 'wb-side-item active' : 'wb-side-item';
            var icon = item.icon ? ICONS[item.icon] : '';
            var content = icon + '<span>' + item.label + '</span>';
            if (item.href) return '<a class="' + cls + '" href="' + item.href + '">' + content + '</a>';
            return '<span class="' + cls + '">' + content + '</span>';
        }

        var sections = config.sections.map(function (section) {
            var isActiveGroup = section.children && section.children.some(function (child) { return child.key === active; });
            var isOpen = section.children && (isActiveGroup || section.defaultOpen);
            var groupClass = 'wb-side-group' + (isActiveGroup ? ' active' : '') + (isOpen ? '' : ' collapsed');
            var group = '<div class="' + groupClass + '" data-wb-side-group>' + (ICONS[section.icon] || '') + '<span>' + section.label + '</span>';
            if (section.children) group += ICONS.arrow;
            group += '</div>';

            if (!section.children) return '<div class="wb-side-section">' + itemHtml(section) + '</div>';

            var children = section.children.map(itemHtml).join('');
            var subStyle = isOpen ? '' : ' style="display:none"';
            return '<div class="wb-side-section">' + group + '<div class="wb-side-sub"' + subStyle + '>' + children + '</div></div>';
        }).join('');

        container.innerHTML = '<div class="wb-sidebar-title">' + config.title + '</div><nav class="wb-side-nav">' + sections + '</nav>';

        container.querySelectorAll('[data-wb-side-group]').forEach(function (group) {
            var sub = group.nextElementSibling;
            if (!sub || !sub.classList.contains('wb-side-sub')) return;
            group.addEventListener('click', function () {
                var collapsed = group.classList.toggle('collapsed');
                sub.style.display = collapsed ? 'none' : '';
            });
        });
    }

    function getActiveMenu(container) {
        var params = new URLSearchParams(window.location.search || '');
        return params.get('menu') || (container && container.dataset.active) || 'consults';
    }

    function getConsultRecords(role) {
        if (role === 'all') return consultRecords;
        return consultRecords.filter(function (item) {
            return item.audience === role;
        });
    }

    function getConsultType(item) {
        return CONSULT_TYPE_MAP[item.type] || item.type;
    }

    function tagClass(item) {
        return item.typeClass ? 'consult-type ' + item.typeClass : 'consult-type';
    }

    function infoRows(rows) {
        return rows.map(function (row) {
            return '<div class="info-row"><div class="info-label">' + row[0] + '：</div><div class="info-value">' + row[1] + '</div></div>';
        }).join('');
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
        });
    }

    function uniqueServiceOptions(field) {
        return serviceShelfRecords.reduce(function (options, item) {
            if (item[field] && options.indexOf(item[field]) === -1) options.push(item[field]);
            return options;
        }, []);
    }

    function serviceOption(value, label, current) {
        return '<option value="' + escapeHtml(value) + '"' + (value === current ? ' selected' : '') + '>' + escapeHtml(label) + '</option>';
    }

    function renderServiceShelfPanel(panel) {
        var activeStatus = 'listed';
        var filters = {
            keyword: '',
            category: 'all',
            org: 'all',
            business: 'all',
            delivery: 'all',
            startDate: '',
            endDate: ''
        };
        var pageSize = 10;
        var noticeText = '';
        var serviceView = 'list';
        var editorMode = 'create';
        var editorStep = 'intro';
        var editorData = null;
        var icons = {
            add: '<svg viewBox="0 0 24 24"><path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z"/></svg>',
            search: '<svg viewBox="0 0 24 24"><path d="M9.5 3a6.5 6.5 0 0 1 5.16 10.45l4.45 4.44-1.42 1.42-4.44-4.45A6.5 6.5 0 1 1 9.5 3zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"/></svg>',
            filter: '<svg viewBox="0 0 24 24"><path d="M4 5h16l-6.5 7.3V19l-3 1v-7.7L4 5zm4.45 2 4.05 4.55V17l1-.33v-5.12L17.55 7h-9.1z"/></svg>',
            calendar: '<svg viewBox="0 0 24 24"><path d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2zm13 8H6v10h14V10zM6 8h14V6H6v2z"/></svg>',
            prev: '<svg viewBox="0 0 24 24"><path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4L10.8 12l4.6-4.6z"/></svg>',
            next: '<svg viewBox="0 0 24 24"><path d="M8.6 16.6 10 18l6-6-6-6-1.4 1.4 4.6 4.6-4.6 4.6z"/></svg>',
            back: '<svg viewBox="0 0 24 24"><path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4L10.8 12l4.6-4.6z"/></svg>',
            save: '<svg viewBox="0 0 24 24"><path d="M5 3h12l2 2v16H5V3zm2 2v14h10V7.8L14.2 5H7zm2 0h4v5H9V5zm0 9h6v2H9v-2z"/></svg>',
            eye: '<svg viewBox="0 0 24 24"><path d="M12 5c5 0 8.4 4.2 9.5 7-1.1 2.8-4.5 7-9.5 7S3.6 14.8 2.5 12C3.6 9.2 7 5 12 5zm0 2c-3.6 0-6.2 2.7-7.3 5 1.1 2.3 3.7 5 7.3 5s6.2-2.7 7.3-5C18.2 9.7 15.6 7 12 7zm0 2.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6z"/></svg>',
            check: '<svg viewBox="0 0 24 24"><path d="m9 16.2-3.5-3.5L4.1 14.1 9 19 20.3 7.7l-1.4-1.4L9 16.2z"/></svg>',
            upload: '<svg viewBox="0 0 24 24"><path d="M11 16h2V8l3.2 3.2 1.4-1.4L12 4.2 6.4 9.8l1.4 1.4L11 8v8zm-5 2h12v2H6v-2z"/></svg>',
            trash: '<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>'
        };

        function cloneServiceData(item) {
            return normalizeServiceData(JSON.parse(JSON.stringify(item || consultationServiceCatalog[0])));
        }

        function splitCardLine(line) {
            var text = String(line || '').trim();
            var match = text.match(/^(?:\d{2}\s*)?([^：:]+)[：:](.+)$/);
            if (!match) return null;
            return { title: match[1].trim(), desc: match[2].trim() };
        }

        function getDefaultCardType(sectionTitle) {
            var title = String(sectionTitle || '');
            if (title.indexOf('流程') > -1) return 'sequence';
            if (title.indexOf('案例') > -1) return 'integrated';
            return 'icon';
        }

        function getCardTypeLabel(type) {
            if (type === 'sequence') return '序号卡片';
            if (type === 'integrated') return '整行卡片';
            return '图标卡片';
        }

        function normalizeSection(section) {
            var next = {
                title: section && section.title || '',
                content: section && section.content || '',
                cards: section && (section.cards || section.features) || []
            };
            if (!next.cards.length && next.content) {
                var lines = next.content.split('\n').map(function (line) { return line.trim(); }).filter(Boolean);
                var cards = lines.map(splitCardLine).filter(Boolean);
                if (cards.length === lines.length && cards.length > 1) {
                    next.cards = cards;
                    next.content = '';
                }
            }
            var defaultType = getDefaultCardType(next.title);
            next.cards = next.cards.map(function (card) {
                return {
                    type: card.type || defaultType,
                    title: card.title || '',
                    desc: card.desc || '',
                    icon: card.icon || card.img || ''
                };
            });
            return next;
        }

        function normalizeServiceData(data) {
            data.thumb = data.thumb || data.cover || data.heroImg || 'images/consult-governance.jpg';
            data.cover = data.heroImg || data.cover || data.thumb;
            data.heroImg = data.heroImg || data.cover;
            data.tabTitle = data.tabTitle || data.name || data.serviceType || '';
            data.tabDesc = data.tabDesc || data.overview || data.heroSubtitle || '';
            data.heroTitle = data.heroTitle || data.tabTitle;
            data.heroSubtitle = data.heroSubtitle || data.tabDesc;
            data.sections = (data.sections || []).map(normalizeSection);
            return data;
        }

        function findConsultService(id) {
            return consultationServiceCatalog.find(function (item) { return item.id === id; }) || null;
        }

        function syncServiceShelfRecords() {
            serviceShelfRecords = consultationServiceCatalog.map(function (item) {
                return {
                    id: item.id,
                    status: item.status,
                    name: item.name,
                    category: item.category,
                    serviceType: item.serviceType,
                    org: item.org,
                    business: item.business,
                    delivery: item.delivery,
                    createdAt: item.createdAt,
                    version: item.version
                };
            });
        }

        function getServiceOptions() {
            return consultationServiceCatalog.map(function (item) {
                return serviceOption(item.id, item.serviceType, editorData && editorData.templateId === item.id ? item.id : '');
            }).join('');
        }

        function openConsultServiceEditor(record, mode) {
            var template = record ? findConsultService(record.id) : consultationServiceCatalog[0];
            editorMode = mode || 'create';
            editorStep = 'intro';
            editorData = cloneServiceData(template);
            editorData.templateId = template.id;
            if (editorMode === 'create') {
                editorData.id = 'consult-custom-' + (consultationServiceCatalog.length + 1);
                editorData.name = '';
                editorData.tabTitle = '';
                editorData.heroTitle = template.heroTitle;
            }
            serviceView = 'editor';
            noticeText = '';
            renderServiceEditor();
        }

        function renderRequiredLabel(text) {
            return '<div class="service-editor-label"><span>*</span>' + text + '</div>';
        }

        function renderTextarea(value, attrs) {
            return '<textarea ' + attrs + '>' + escapeHtml(value || '') + '</textarea>';
        }

        function getStatusCount(status) {
            return serviceShelfRecords.filter(function (item) { return item.status === status; }).length;
        }

        function renderTabs() {
            var tabs = [
                { key: 'listed', label: '已上架' },
                { key: 'offline', label: '已下架' },
                { key: 'draft', label: '草稿', showCount: true },
                { key: 'approval', label: '审批中', showCount: true },
                { key: 'rejected', label: '审批驳回', showCount: true }
            ];
            return tabs.map(function (tab) {
                var cls = tab.key === activeStatus ? 'service-tab active' : 'service-tab';
                var label = tab.label + (tab.showCount ? '(' + getStatusCount(tab.key) + ')' : '');
                return '<button class="' + cls + '" type="button" data-service-status="' + tab.key + '">' + label + '</button>';
            }).join('');
        }

        function renderSelect(name, label, options, current) {
            var html = serviceOption('all', label, current) + options.map(function (item) {
                return serviceOption(item, item, current);
            }).join('');
            return '<select class="service-select" data-service-filter="' + name + '">' + html + '</select>';
        }

        function isInDateRange(item) {
            if (filters.startDate && item.createdAt < filters.startDate) return false;
            if (filters.endDate && item.createdAt > filters.endDate) return false;
            return true;
        }

        function getFilteredRecords() {
            var keyword = filters.keyword.toLowerCase();
            return serviceShelfRecords.filter(function (item) {
                var text = [item.name, item.category, item.serviceType, item.org, item.business].join(' ').toLowerCase();
                if (item.status !== activeStatus) return false;
                if (filters.category !== 'all' && item.category !== filters.category) return false;
                if (filters.org !== 'all' && item.org !== filters.org) return false;
                if (filters.business !== 'all' && item.business !== filters.business) return false;
                if (filters.delivery !== 'all' && item.delivery !== filters.delivery) return false;
                if (keyword && text.indexOf(keyword) === -1) return false;
                return isInDateRange(item);
            });
        }

        function renderFilters() {
            return ''
                + '<div class="service-toolbar">'
                +   '<div class="service-search-row">'
                +       '<label class="service-search-wrap">'
                +           '<input type="text" data-service-keyword placeholder="请输入服务名称搜索" value="' + escapeHtml(filters.keyword) + '">'
                +           '<span>' + icons.search + '</span>'
                +       '</label>'
                +       '<button class="service-icon-btn" type="button" data-service-apply aria-label="筛选">' + icons.filter + '</button>'
                +   '</div>'
                +   '<div class="service-filter-row">'
                +       renderSelect('category', '服务类型', uniqueServiceOptions('category'), filters.category)
                +       renderSelect('org', '面向服务机构', uniqueServiceOptions('org'), filters.org)
                +       renderSelect('business', '关联业务类型', uniqueServiceOptions('business'), filters.business)
                +       renderSelect('delivery', '交付方式', uniqueServiceOptions('delivery'), filters.delivery)
                +       '<div class="service-date-range">'
                +           '<span>创建时间</span>'
                +           '<input type="text" data-service-date="startDate" placeholder="开始日期" value="' + escapeHtml(filters.startDate) + '">'
                +           '<em>-</em>'
                +           '<input type="text" data-service-date="endDate" placeholder="结束日期" value="' + escapeHtml(filters.endDate) + '">'
                +           icons.calendar
                +       '</div>'
                +       '<button class="service-reset-btn" type="button" data-service-reset>重置</button>'
                +   '</div>'
                + '</div>';
        }

        function renderRows(records) {
            if (!records.length) {
                return '<tr><td class="service-empty-cell" colspan="7">暂无匹配的服务记录</td></tr>';
            }
            return records.map(function (item) {
                return ''
                    + '<tr>'
                    +   '<td><a class="service-name-link" href="javascript:void(0)">' + escapeHtml(item.name) + '</a></td>'
                    +   '<td>' + escapeHtml(item.category) + '</td>'
                    +   '<td>' + escapeHtml(item.serviceType) + '</td>'
                    +   '<td><span class="service-ellipsis" title="' + escapeHtml(item.org) + '">' + escapeHtml(item.org) + '</span></td>'
                    +   '<td>' + escapeHtml(item.business) + '</td>'
                    +   '<td class="service-version">' + escapeHtml(item.version) + '</td>'
                    +   '<td><div class="service-actions">'
                    +       '<button type="button" data-service-id="' + escapeHtml(item.id) + '" data-service-row-action="update">更新</button>'
                    +       '<button type="button" data-service-id="' + escapeHtml(item.id) + '" data-service-row-action="offline">下架</button>'
                    +       '<button type="button" data-service-id="' + escapeHtml(item.id) + '" data-service-row-action="log">日志</button>'
                    +   '</div></td>'
                    + '</tr>';
            }).join('');
        }

        function renderPagination(total) {
            return ''
                + '<div class="service-pagination">'
                +   '<span>共 ' + total + ' 条</span>'
                +   '<button class="service-page-arrow disabled" type="button" aria-label="上一页">' + icons.prev + '</button>'
                +   '<button class="service-page-current" type="button">1</button>'
                +   '<button class="service-page-arrow disabled" type="button" aria-label="下一页">' + icons.next + '</button>'
                +   '<select class="service-page-size"><option>' + pageSize + ' 条/页</option></select>'
                +   '<span>前往</span>'
                +   '<input class="service-page-jump" type="text" aria-label="前往页码">'
                + '</div>';
        }

        function renderTable(records) {
            return ''
                + '<section class="service-table-section">'
                +   '<div class="service-table-scroll">'
                +       '<table class="service-table">'
                +           '<thead><tr>'
                +               '<th>服务名称</th>'
                +               '<th>服务类别</th>'
                +               '<th>服务类型</th>'
                +               '<th>面向服务机构</th>'
                +               '<th>关联业务类型</th>'
                +               '<th>版本号</th>'
                +               '<th>操作</th>'
                +           '</tr></thead>'
                +           '<tbody>' + renderRows(records) + '</tbody>'
                +       '</table>'
                +   '</div>'
                +   renderPagination(records.length)
                + '</section>';
        }

        function getReferencePrice(data) {
            var pricing = data.pricing || {};
            if (pricing.countPrice) return pricing.countPrice + pricing.countUnit;
            if (pricing.durationPrice) return pricing.durationPrice + pricing.durationUnit;
            if ((pricing.measures || []).indexOf('面议') !== -1) return '面议';
            return pricing.referencePrice || '面议';
        }

        function renderEditorSteps() {
            var introDone = editorStep === 'pricing';
            return ''
                + '<div class="service-editor-steps">'
                +   '<button class="service-editor-step ' + (introDone ? 'done' : 'active') + '" type="button" data-editor-step="intro">'
                +       '<span class="service-editor-step-index">' + (introDone ? icons.check : '1') + '</span><strong>服务介绍</strong>'
                +   '</button>'
                +   '<span class="service-editor-step-line"></span>'
                +   '<button class="service-editor-step ' + (editorStep === 'pricing' ? 'active' : '') + '" type="button" data-editor-step="pricing">'
                +       '<span class="service-editor-step-index">2</span><strong>定价信息</strong>'
                +   '</button>'
                + '</div>';
        }

        function renderImageUploader(kind, image, label, hint) {
            return ''
                + '<div class="service-image-control">'
                +   '<img src="' + escapeHtml(image) + '" alt="' + escapeHtml(label) + '" data-image-preview="' + kind + '">'
                +   '<div class="service-image-actions">'
                +       '<label class="service-secondary-btn">' + icons.upload + '<span>' + escapeHtml(label) + '</span><input type="file" accept="image/*" data-image-upload="' + kind + '"></label>'
                +       '<em>' + escapeHtml(hint) + '</em>'
                +   '</div>'
                + '</div>';
        }

        function renderHeroPreview() {
            return ''
                + '<div class="service-hero-editor-preview">'
                +   '<img src="' + escapeHtml(editorData.heroImg || editorData.cover) + '" alt="横幅预览">'
                +   '<div class="service-hero-editor-mask">'
                +       '<span>' + escapeHtml(editorData.badge || '数据咨询服务') + '</span>'
                +       '<strong>' + escapeHtml(editorData.heroTitle || editorData.tabTitle || editorData.serviceType) + '</strong>'
                +       '<p>' + escapeHtml(editorData.heroSubtitle || '') + '</p>'
                +   '</div>'
                + '</div>';
        }

        function renderCardEditors(cards, sectionIndex) {
            cards = cards || [];
            if (!cards.length) {
                return '<div class="service-card-editor-empty">暂无卡片内容，可按展示样式新增序号卡片、图标卡片或整行卡片。</div>';
            }
            return cards.map(function (card, cardIndex) {
                var type = card.type || getDefaultCardType((editorData.sections[sectionIndex] || {}).title);
                var iconHtml = type === 'icon' ? ''
                    + '<label>图标</label>'
                    + '<div class="service-card-icon-upload">'
                    +   '<span class="service-card-icon-preview">' + (card.icon ? '<img src="' + escapeHtml(card.icon) + '" alt="卡片图标">' : '上传图标') + '</span>'
                    +   '<label class="service-secondary-btn">' + icons.upload + '<span>上传图标</span><input type="file" accept="image/*" data-card-icon-upload="' + sectionIndex + '-' + cardIndex + '"></label>'
                    +   '<input type="hidden" data-card-icon="' + sectionIndex + '-' + cardIndex + '" value="' + escapeHtml(card.icon || '') + '">'
                    + '</div>'
                    : '<input type="hidden" data-card-icon="' + sectionIndex + '-' + cardIndex + '" value="' + escapeHtml(card.icon || '') + '">';
                return ''
                    + '<div class="service-card-editor type-' + escapeHtml(type) + '" data-card-index="' + cardIndex + '" data-card-type="' + escapeHtml(type) + '">'
                    +   '<div class="service-card-editor-head">'
                    +       '<span>卡片 ' + (cardIndex + 1) + '</span>'
                    +       '<em>' + getCardTypeLabel(type) + '</em>'
                    +       '<button class="service-delete-btn" type="button" data-section-action="delete-card" data-section-index="' + sectionIndex + '" data-card-index="' + cardIndex + '">' + icons.trash + '<span>删除</span></button>'
                    +   '</div>'
                    +   '<input type="hidden" data-card-type-input="' + sectionIndex + '-' + cardIndex + '" value="' + escapeHtml(type) + '">'
                    +   iconHtml
                    +   '<label>标题</label>'
                    +   '<input class="service-editor-input" data-card-title="' + sectionIndex + '-' + cardIndex + '" value="' + escapeHtml(card.title || '') + '">'
                    +   '<label>描述</label>'
                    +   '<textarea class="service-editor-textarea" data-card-desc="' + sectionIndex + '-' + cardIndex + '">' + escapeHtml(card.desc || '') + '</textarea>'
                    + '</div>';
            }).join('');
        }

        function renderSectionEditors() {
            return (editorData.sections || []).map(function (section, index) {
                var cards = section.cards || section.features || [];
                return ''
                    + '<div class="service-section-editor" data-section-block="' + index + '">'
                    +   '<div class="service-section-editor-head">'
                    +       '<span class="service-section-num">' + (index + 1) + '</span>'
                    +       '<input class="service-editor-input" data-section-title="' + index + '" value="' + escapeHtml(section.title) + '">'
                    +       '<button class="service-delete-btn" type="button" data-section-action="delete-section" data-section-index="' + index + '">' + icons.trash + '<span>删除章节</span></button>'
                    +   '</div>'
                    +   '<div class="service-section-editor-body">'
                    +       '<label>正文内容</label>'
                    +       renderTextarea(section.content, 'class="service-editor-textarea service-editor-textarea-large" data-section-content="' + index + '" placeholder="请输入该章节的正文内容"')
                    +   '</div>'
                +   '<div class="service-card-editor-panel">'
                +       '<div class="service-card-editor-title">'
                +           '<span>相关卡片</span>'
                +           '<div class="service-card-add-actions">'
                +               '<button class="service-secondary-btn" type="button" data-section-action="add-sequence-card" data-section-index="' + index + '">' + icons.add + '<span>新增序号卡片</span></button>'
                +               '<button class="service-secondary-btn" type="button" data-section-action="add-icon-card" data-section-index="' + index + '">' + icons.add + '<span>新增图标卡片</span></button>'
                +               '<button class="service-secondary-btn" type="button" data-section-action="add-integrated-card" data-section-index="' + index + '">' + icons.add + '<span>新增整行卡片</span></button>'
                +           '</div>'
                +       '</div>'
                    +       '<div class="service-card-editor-grid">' + renderCardEditors(cards, index) + '</div>'
                    +   '</div>'
                    + '</div>';
            }).join('');
        }

        function renderEditorIntro() {
            return ''
                + '<div class="service-editor-layout service-editor-layout-content">'
                +   '<div class="service-editor-main">'
                +       '<section class="service-form-section">'
                +           '<h2>左侧信息</h2>'
                +           '<div class="service-editor-row">'
                +               renderRequiredLabel('缩略图')
                +               '<div class="service-editor-field">'
                +                   renderImageUploader('thumb', editorData.thumb || editorData.cover, '更换缩略图', '用于门户左侧服务 tab，建议 320×180，支持 JPG/PNG')
                +               '</div>'
                +           '</div>'
                +           '<div class="service-editor-row">'
                +               renderRequiredLabel('标题')
                +               '<div class="service-editor-field"><input class="service-editor-input" data-consult-field="tabTitle" value="' + escapeHtml(editorData.tabTitle || editorData.name || '') + '" placeholder="请输入左侧 tab 标题"></div>'
                +           '</div>'
                +           '<div class="service-editor-row">'
                +               renderRequiredLabel('概述')
                +               '<div class="service-editor-field">' + renderTextarea(editorData.tabDesc, 'class="service-editor-textarea" data-consult-field="tabDesc" placeholder="请输入左侧 tab 概述"') + '</div>'
                +           '</div>'
                +       '</section>'
                +       '<section class="service-form-section">'
                +           '<h2>横幅设置</h2>'
                +           '<div class="service-editor-row">'
                +               '<div class="service-editor-label">横幅预览</div>'
                +               '<div class="service-editor-field">'
                +                   renderHeroPreview()
                +                   renderImageUploader('heroImg', editorData.heroImg || editorData.cover, '更换背景图', '建议尺寸 1200×400，支持 JPG/PNG')
                +               '</div>'
                +           '</div>'
                +           '<div class="service-editor-row">'
                +               '<div class="service-editor-label">角标文字</div>'
                +               '<div class="service-editor-field"><input class="service-editor-input" data-consult-field="badge" value="' + escapeHtml(editorData.badge) + '" placeholder="请输入横幅角标"></div>'
                +           '</div>'
                +           '<div class="service-editor-row">'
                +               '<div class="service-editor-label">横幅标题</div>'
                +               '<div class="service-editor-field"><input class="service-editor-input" data-consult-field="heroTitle" value="' + escapeHtml(editorData.heroTitle) + '" placeholder="请输入横幅标题"></div>'
                +           '</div>'
                +           '<div class="service-editor-row">'
                +               '<div class="service-editor-label">横幅副标题</div>'
                +               '<div class="service-editor-field">' + renderTextarea(editorData.heroSubtitle, 'class="service-editor-textarea" data-consult-field="heroSubtitle" placeholder="请输入横幅副标题"') + '</div>'
                +           '</div>'
                +       '</section>'
                +       '<section class="service-form-section">'
                +           '<h2>内容介绍</h2>'
                +           '<div class="service-editor-row">'
                +               '<div class="service-editor-label">引言</div>'
                +               '<div class="service-editor-field">' + renderTextarea(editorData.lead, 'class="service-editor-textarea" data-consult-field="lead" placeholder="请输入服务详情页引言"') + '</div>'
                +           '</div>'
                +           '<div class="service-editor-row align-start">'
                +               '<div class="service-editor-label">内容章节</div>'
                +               '<div class="service-editor-field">'
                +                   '<div class="service-section-editor-list" data-section-list>' + renderSectionEditors() + '</div>'
                +                   '<button class="service-secondary-btn service-add-section-btn" type="button" data-section-action="add-section">' + icons.add + '<span>新增章节</span></button>'
                +               '</div>'
                +           '</div>'
                +       '</section>'
                +   '</div>'
                + '</div>';
        }

        function renderEditorPricing() {
            var pricing = editorData.pricing || {};
            var measures = pricing.measures || [];
            function checked(value) {
                return measures.indexOf(value) !== -1 ? ' checked' : '';
            }
            function unitOptions(options, current) {
                return options.map(function (item) { return serviceOption(item, item, current); }).join('');
            }
            return ''
                + '<div class="service-editor-layout service-editor-layout-narrow">'
                +   '<div class="service-editor-main">'
                +       '<section class="service-form-section service-pricing-section">'
                +           '<h2>定价信息</h2>'
                +           '<div class="service-editor-row compact">'
                +               renderRequiredLabel('付费模式')
                +               '<div class="service-editor-field"><label class="service-radio-inline"><input type="radio" checked data-pricing-field="payMode" value="预付费"><span>预付费</span></label></div>'
                +           '</div>'
                +           '<div class="service-editor-row compact">'
                +               renderRequiredLabel('计量方式')
                +               '<div class="service-editor-field service-check-group">'
                +                   '<label class="service-check-inline"><input type="checkbox" value="按次数" data-pricing-measure' + checked('按次数') + '><span>按次数</span></label>'
                +                   '<label class="service-check-inline"><input type="checkbox" value="按时长" data-pricing-measure' + checked('按时长') + '><span>按时长</span></label>'
                +                   '<label class="service-check-inline"><input type="checkbox" value="面议" data-pricing-measure' + checked('面议') + '><span>面议</span></label>'
                +               '</div>'
                +           '</div>'
                +           '<div class="service-editor-row compact">'
                +               renderRequiredLabel('按次数计费')
                +               '<div class="service-price-input">'
                +                   '<input class="service-editor-input" data-pricing-field="countPrice" value="' + escapeHtml(pricing.countPrice || '') + '" placeholder="请输入">'
                +                   '<select class="service-editor-select" data-pricing-field="countUnit">' + unitOptions(['元/次', '元/单'], pricing.countUnit || '元/次') + '</select>'
                +               '</div>'
                +           '</div>'
                +           '<div class="service-editor-row compact">'
                +               renderRequiredLabel('按时长计费')
                +               '<div class="service-price-input">'
                +                   '<input class="service-editor-input" data-pricing-field="durationPrice" value="' + escapeHtml(pricing.durationPrice || '') + '" placeholder="请输入">'
                +                   '<select class="service-editor-select" data-pricing-field="durationUnit">' + unitOptions(['元/月', '元/天'], pricing.durationUnit || '元/月') + '</select>'
                +               '</div>'
                +           '</div>'
                +           '<div class="service-editor-row compact">'
                +               '<div class="service-editor-label">门户价格展示</div>'
                +               '<div class="service-editor-field"><div class="service-price-preview"><span>参考价</span><strong>' + escapeHtml(getReferencePrice(editorData)) + '</strong></div></div>'
                +           '</div>'
                +       '</section>'
                +   '</div>'
                + '</div>';
        }

        function renderServiceEditor() {
            var title = editorMode === 'create' ? '新建咨询服务' : '编辑咨询服务';
            panel.innerHTML = ''
                + '<div class="service-editor-page">'
                +   '<div class="service-editor-top">'
                +       '<div class="service-editor-heading">'
                +           '<button class="service-back-btn" type="button" data-service-editor-back>' + icons.back + '<span>返回</span></button>'
                +           '<h1>' + title + '</h1>'
                +       '</div>'
                +       renderEditorSteps()
                +   '</div>'
                +   (noticeText ? '<div class="service-notice service-editor-notice">' + escapeHtml(noticeText) + '</div>' : '')
                +   '<div class="service-editor-scroll">'
                +       (editorStep === 'pricing' ? renderEditorPricing() : renderEditorIntro())
                +   '</div>'
                +   '<div class="service-editor-footer">'
                +       (editorStep === 'pricing'
                    ? '<button class="service-secondary-btn" type="button" data-editor-prev>' + icons.back + '<span>上一步</span></button><button class="service-secondary-btn" type="button" data-editor-open-preview>' + icons.eye + '<span>预览</span></button><button class="service-create-btn" type="button" data-editor-save>' + icons.save + '<span>保存</span></button>'
                    : '<button class="service-secondary-btn" type="button" data-editor-cancel>' + icons.back + '<span>取消</span></button><button class="service-secondary-btn" type="button" data-editor-open-preview>' + icons.eye + '<span>预览</span></button><button class="service-create-btn" type="button" data-editor-next>' + icons.next + '<span>下一步</span></button>')
                +   '</div>'
                + '</div>';
            bindEditorEvents();
        }

        function collectEditorData() {
            if (!editorData) return;
            var tabTitleInput = panel.querySelector('[data-consult-field="tabTitle"]');
            var subtitleInput = panel.querySelector('[data-consult-field="heroSubtitle"]');
            var tabDescInput = panel.querySelector('[data-consult-field="tabDesc"]');
            var badgeInput = panel.querySelector('[data-consult-field="badge"]');
            var heroTitleInput = panel.querySelector('[data-consult-field="heroTitle"]');
            var leadInput = panel.querySelector('[data-consult-field="lead"]');
            if (tabTitleInput) {
                editorData.tabTitle = tabTitleInput.value.trim();
                editorData.name = editorData.tabTitle || editorData.serviceType;
            }
            if (subtitleInput) editorData.heroSubtitle = subtitleInput.value.trim();
            if (tabDescInput) editorData.tabDesc = tabDescInput.value.trim();
            if (badgeInput) editorData.badge = badgeInput.value.trim();
            if (heroTitleInput) editorData.heroTitle = heroTitleInput.value.trim();
            if (leadInput) editorData.lead = leadInput.value.trim();
            var sectionBlocks = panel.querySelectorAll('[data-section-block]');
            if (sectionBlocks.length) {
                editorData.sections = Array.prototype.map.call(sectionBlocks, function (block) {
                    var index = block.dataset.sectionBlock;
                    var title = block.querySelector('[data-section-title="' + index + '"]');
                    var content = block.querySelector('[data-section-content="' + index + '"]');
                    var cards = Array.prototype.map.call(block.querySelectorAll('[data-card-index]'), function (card) {
                        var cardIndex = card.dataset.cardIndex;
                        var cardTitle = card.querySelector('[data-card-title="' + index + '-' + cardIndex + '"]');
                        var cardDesc = card.querySelector('[data-card-desc="' + index + '-' + cardIndex + '"]');
                        var cardType = card.querySelector('[data-card-type-input="' + index + '-' + cardIndex + '"]');
                        var cardIcon = card.querySelector('[data-card-icon="' + index + '-' + cardIndex + '"]');
                        return {
                            type: cardType ? cardType.value : card.dataset.cardType || getDefaultCardType(title ? title.value : ''),
                            title: cardTitle ? cardTitle.value.trim() : '',
                            desc: cardDesc ? cardDesc.value.trim() : '',
                            icon: cardIcon ? cardIcon.value : ''
                        };
                    });
                    return {
                        title: title ? title.value.trim() : '',
                        content: content ? content.value.trim() : '',
                        cards: cards.filter(function (card) { return card.title || card.desc || card.icon; })
                    };
                });
            }
            if (panel.querySelector('[data-pricing-field]') || panel.querySelector('[data-pricing-measure]')) {
                var pricing = editorData.pricing || {};
                var countPrice = panel.querySelector('[data-pricing-field="countPrice"]');
                var countUnit = panel.querySelector('[data-pricing-field="countUnit"]');
                var durationPrice = panel.querySelector('[data-pricing-field="durationPrice"]');
                var durationUnit = panel.querySelector('[data-pricing-field="durationUnit"]');
                pricing.payMode = '预付费';
                pricing.measures = Array.prototype.map.call(panel.querySelectorAll('[data-pricing-measure]:checked'), function (input) { return input.value; });
                pricing.countPrice = countPrice ? countPrice.value.trim() : '';
                pricing.countUnit = countUnit ? countUnit.value : '元/次';
                pricing.durationPrice = durationPrice ? durationPrice.value.trim() : '';
                pricing.durationUnit = durationUnit ? durationUnit.value : '元/月';
                editorData.pricing = pricing;
                pricing.referencePrice = getReferencePrice(editorData);
            }
            editorData = normalizeServiceData(editorData);
        }

        function buildServicePreviewData() {
            collectEditorData();
            return cloneServiceData(Object.assign({}, editorData, {
                title: editorData.tabTitle || editorData.name,
                desc: editorData.tabDesc,
                price: getReferencePrice(editorData)
            }));
        }

        function openServicePreview() {
            var previewData = buildServicePreviewData();
            localStorage.setItem('consult-service-preview-data', JSON.stringify(previewData));
            window.open('consulting-service-preview.html', '_blank');
        }

        function persistEditorData() {
            collectEditorData();
            var saved = cloneServiceData(editorData);
            saved.name = saved.tabTitle || saved.name || saved.serviceType;
            saved.tabTitle = saved.tabTitle || saved.name;
            saved.heroTitle = saved.heroTitle || saved.tabTitle;
            saved.heroSubtitle = saved.heroSubtitle || saved.lead;
            saved.cover = saved.heroImg || saved.cover;
            saved.status = editorMode === 'create' ? 'draft' : saved.status || 'listed';
            var index = consultationServiceCatalog.findIndex(function (item) { return item.id === saved.id; });
            if (index >= 0) consultationServiceCatalog[index] = saved;
            else consultationServiceCatalog.push(saved);
            syncServiceShelfRecords();
            activeStatus = saved.status;
            serviceView = 'list';
            editorData = null;
            noticeText = '咨询服务内容已保存，数据门户将按当前服务介绍与定价信息展示。';
            renderPanel();
        }

        function bindEditorEvents() {
            var backButton = panel.querySelector('[data-service-editor-back]');
            if (backButton) {
                backButton.addEventListener('click', function () {
                    serviceView = 'list';
                    editorData = null;
                    noticeText = '';
                    renderPanel();
                });
            }

            panel.querySelectorAll('[data-editor-step]').forEach(function (button) {
                button.addEventListener('click', function () {
                    collectEditorData();
                    editorStep = this.dataset.editorStep || 'intro';
                    noticeText = '';
                    renderServiceEditor();
                });
            });

            panel.querySelectorAll('[data-image-upload]').forEach(function (input) {
                input.addEventListener('change', function () {
                    if (!this.files || !this.files[0]) return;
                    var field = this.dataset.imageUpload;
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        collectEditorData();
                        if (field === 'thumb') editorData.thumb = event.target.result;
                        if (field === 'heroImg') {
                            editorData.heroImg = event.target.result;
                            editorData.cover = event.target.result;
                        }
                        noticeText = '';
                        renderServiceEditor();
                    };
                    reader.readAsDataURL(this.files[0]);
                });
            });

            panel.querySelectorAll('[data-card-icon-upload]').forEach(function (input) {
                input.addEventListener('change', function () {
                    if (!this.files || !this.files[0]) return;
                    var parts = this.dataset.cardIconUpload.split('-');
                    var sectionIndex = Number(parts[0]);
                    var cardIndex = Number(parts[1]);
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        collectEditorData();
                        var section = editorData.sections[sectionIndex];
                        if (section && section.cards && section.cards[cardIndex]) {
                            section.cards[cardIndex].icon = event.target.result;
                        }
                        noticeText = '';
                        renderServiceEditor();
                    };
                    reader.readAsDataURL(this.files[0]);
                });
            });

            panel.querySelectorAll('[data-section-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var action = this.dataset.sectionAction;
                    collectEditorData();
                    if (action === 'add-section') {
                        editorData.sections.push({ title: '新增内容章节', content: '', cards: [] });
                    }
                    if (action === 'delete-section') {
                        editorData.sections.splice(Number(this.dataset.sectionIndex), 1);
                    }
                    if (action === 'add-sequence-card' || action === 'add-icon-card' || action === 'add-integrated-card') {
                        var section = editorData.sections[Number(this.dataset.sectionIndex)];
                        if (section) {
                            section.cards = section.cards || [];
                            var typeMap = {
                                'add-sequence-card': 'sequence',
                                'add-icon-card': 'icon',
                                'add-integrated-card': 'integrated'
                            };
                            section.cards.push({ type: typeMap[action], title: '', desc: '', icon: '' });
                        }
                    }
                    if (action === 'delete-card') {
                        var targetSection = editorData.sections[Number(this.dataset.sectionIndex)];
                        if (targetSection && targetSection.cards) {
                            targetSection.cards.splice(Number(this.dataset.cardIndex), 1);
                        }
                    }
                    noticeText = '';
                    renderServiceEditor();
                });
            });

            var cancelButton = panel.querySelector('[data-editor-cancel]');
            if (cancelButton) {
                cancelButton.addEventListener('click', function () {
                    serviceView = 'list';
                    editorData = null;
                    noticeText = '';
                    renderPanel();
                });
            }
            var nextButton = panel.querySelector('[data-editor-next]');
            if (nextButton) {
                nextButton.addEventListener('click', function () {
                    collectEditorData();
                    editorStep = 'pricing';
                    noticeText = '';
                    renderServiceEditor();
                });
            }
            var prevButton = panel.querySelector('[data-editor-prev]');
            if (prevButton) {
                prevButton.addEventListener('click', function () {
                    collectEditorData();
                    editorStep = 'intro';
                    noticeText = '';
                    renderServiceEditor();
                });
            }
            var saveButton = panel.querySelector('[data-editor-save]');
            if (saveButton) saveButton.addEventListener('click', persistEditorData);
            var previewButton = panel.querySelector('[data-editor-open-preview]');
            if (previewButton) previewButton.addEventListener('click', openServicePreview);
        }

        function renderPanel() {
            var records = getFilteredRecords();
            panel.innerHTML = ''
                + '<div class="service-board">'
                +   '<div class="service-page-head">'
                +       '<h1 class="service-page-title">服务管理</h1>'
                +       '<div class="service-create-actions">'
                +           '<button class="service-create-btn" type="button" data-service-create="consult">' + icons.add + '<span>新建咨询服务</span></button>'
                +           '<button class="service-create-btn" type="button" data-service-create="solution">' + icons.add + '<span>新建行业方案</span></button>'
                +       '</div>'
                +   '</div>'
                +   (noticeText ? '<div class="service-notice">' + escapeHtml(noticeText) + '</div>' : '')
                +   '<div class="service-tabs" role="tablist">' + renderTabs() + '</div>'
                +   renderFilters()
                +   renderTable(records)
                + '</div>';
            bindEvents();
        }

        function applyFilters() {
            var keyword = panel.querySelector('[data-service-keyword]');
            filters.keyword = keyword ? keyword.value.trim() : '';
            renderPanel();
        }

        function bindEvents() {
            panel.querySelectorAll('[data-service-status]').forEach(function (button) {
                button.addEventListener('click', function () {
                    activeStatus = this.dataset.serviceStatus || 'listed';
                    renderPanel();
                });
            });

            var keyword = panel.querySelector('[data-service-keyword]');
            if (keyword) {
                keyword.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') applyFilters();
                });
            }

            panel.querySelectorAll('[data-service-filter]').forEach(function (select) {
                select.addEventListener('change', function () {
                    filters[this.dataset.serviceFilter] = this.value;
                    renderPanel();
                });
            });

            panel.querySelectorAll('[data-service-date]').forEach(function (input) {
                input.addEventListener('change', function () {
                    filters[this.dataset.serviceDate] = this.value.trim();
                    renderPanel();
                });
            });

            var applyButton = panel.querySelector('[data-service-apply]');
            if (applyButton) applyButton.addEventListener('click', applyFilters);

            var resetButton = panel.querySelector('[data-service-reset]');
            if (resetButton) {
                resetButton.addEventListener('click', function () {
                    filters = { keyword: '', category: 'all', org: 'all', business: 'all', delivery: 'all', startDate: '', endDate: '' };
                    noticeText = '';
                    renderPanel();
                });
            }

            panel.querySelectorAll('[data-service-create]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.dataset.serviceCreate === 'solution') {
                        noticeText = '新建行业方案表单将在下一步设计。';
                        renderPanel();
                        return;
                    }
                    openConsultServiceEditor(null, 'create');
                });
            });

            panel.querySelectorAll('[data-service-row-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var action = this.dataset.serviceRowAction;
                    var record = serviceShelfRecords.find(function (item) { return item.id === button.dataset.serviceId; });
                    if (action === 'update') {
                        if (!record || record.category !== '数据咨询服务') {
                            noticeText = '行业方案更新表单将在下一步设计。';
                            renderPanel();
                            return;
                        }
                        openConsultServiceEditor(record, 'edit');
                        return;
                    }
                    var labelMap = { update: '更新', offline: '下架', log: '日志' };
                    noticeText = (labelMap[action] || '操作') + '功能将在下一步设计。';
                    renderPanel();
                });
            });
        }

        renderPanel();
    }

    function renderConsultPanel() {
        var panel = document.querySelector('[data-consult-panel]');
        if (!panel) return;

        var role = panel.dataset.role || 'buyer';
        var activeMenu = getActiveMenu(document.querySelector('[data-workbench-sidebar]'));
        var titleEl = document.querySelector('[data-center-title]');
        var meta = menuMeta[activeMenu] || menuMeta.consults;
        if (titleEl) titleEl.textContent = meta.title;
        if (titleEl) titleEl.style.display = '';

        panel.classList.remove('is-service-management');

        if (activeMenu === 'service-shelf') {
            panel.classList.remove('is-placeholder');
            panel.classList.add('is-service-management');
            if (titleEl) titleEl.style.display = 'none';
            renderServiceShelfPanel(panel);
            return;
        }

        if (activeMenu !== 'consults') {
            panel.classList.add('is-placeholder');
            panel.innerHTML = ''
                + '<div class="wb-module-empty">'
                +   '<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-5 4h8v2H8v-2zm0 4h8v2H8v-2z"/></svg>'
                +   '<h2>' + meta.title + '页面框架已创建</h2>'
                +   '<p>' + meta.desc + '</p>'
                + '</div>';
            return;
        }

        panel.classList.remove('is-placeholder');
        var consultRecords = getConsultRecords(role);

        var activeTab = 'pending';
        var filters = { keyword: '', type: 'all', status: 'all' };
        var pagination = { page: 1, pageSize: 5 };
        var modalState = { id: null, mode: 'view', error: '' };
        var noticeText = '';
        var icons = {
            search: '<svg viewBox="0 0 24 24"><path d="M9.5 3a6.5 6.5 0 0 1 5.16 10.45l4.45 4.44-1.42 1.42-4.44-4.45A6.5 6.5 0 1 1 9.5 3zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"/></svg>',
            reset: '<svg viewBox="0 0 24 24"><path d="M12 5V2L7 7l5 5V7a5 5 0 1 1-4.55 7.06l-1.82.83A7 7 0 1 0 12 5z"/></svg>',
            handle: '<svg viewBox="0 0 24 24"><path d="M4 4h16v2H4V4zm0 5h16v2H4V9zm0 5h10v2H4v-2zm13.7-.7 1.4 1.4-5.6 5.6-3.1-3.1 1.4-1.4 1.7 1.7 4.2-4.2z"/></svg>',
            view: '<svg viewBox="0 0 24 24"><path d="M12 5c5 0 8.4 4.2 9.5 7-1.1 2.8-4.5 7-9.5 7S3.6 14.8 2.5 12C3.6 9.2 7 5 12 5zm0 2c-3.6 0-6.2 2.7-7.3 5 1.1 2.3 3.7 5 7.3 5s6.2-2.7 7.3-5C18.2 9.7 15.6 7 12 7zm0 2.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6z"/></svg>',
            close: '<svg viewBox="0 0 24 24"><path d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5z"/></svg>',
            submit: '<svg viewBox="0 0 24 24"><path d="M3 20.5 21 12 3 3.5V10l10 2-10 2v6.5z"/></svg>'
        };

        function escapeHtml(value) {
            return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
                return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
            });
        }

        function getStatus(item) {
            return item.status || '待处理';
        }

        function getStatusClass(status) {
            if (status === '待处理') return 'pending';
            return 'done';
        }

        function findInfoValue(item, labels) {
            var rows = item.objectInfo || [];
            for (var i = 0; i < labels.length; i += 1) {
                var row = rows.find(function (entry) { return entry[0] === labels[i]; });
                if (row) return row[1];
            }
            return '';
        }

        function getCounterparty(item) {
            if (role === 'supplier' || item.audience === 'supplier') return item.submitInfo.org;
            return findInfoValue(item, ['响应供方', '对接供方', '资源提供方', '产品提供方', '服务提供方', '方案提供方']) || item.submitInfo.org;
        }

        function getHistory(item) {
            var currentTime = item.createdAt;
            return (item.messages || []).reduce(function (result, message) {
                if (message.kind === 'time') {
                    currentTime = message.text;
                    return result;
                }
                result.push({
                    time: currentTime,
                    name: message.name,
                    text: message.text,
                    from: message.from
                });
                return result;
            }, []);
        }

        function getLatestReplyTime(item) {
            var reply = getReplyEntry(item);
            return reply ? reply.time : '--';
        }

        function getConsultContent(item) {
            var history = getHistory(item);
            var ask = history.find(function (entry) { return entry.from === 'asker'; });
            return ask ? ask.text : '--';
        }

        function getReplyEntry(item) {
            var history = getHistory(item);
            return history.find(function (entry) { return entry.from !== 'asker'; });
        }

        function getReplyContent(item) {
            var reply = getReplyEntry(item);
            return reply ? reply.text : '暂无回复内容';
        }

        function getTabCount(tabKey) {
            return consultRecords.filter(function (item) {
                var status = getStatus(item);
                if (tabKey === 'pending') return status === '待处理';
                if (tabKey === 'processed') return status !== '待处理';
                return true;
            }).length;
        }

        function getTypeOptions() {
            return CONSULT_TYPES;
        }

        function option(value, label, current) {
            var selected = value === current ? ' selected' : '';
            return '<option value="' + escapeHtml(value) + '"' + selected + '>' + escapeHtml(label) + '</option>';
        }

        function renderTabs() {
            var tabs = [
                { key: 'pending', label: '待处理' },
                { key: 'processed', label: '已处理' },
                { key: 'mine', label: '我发起' }
            ];
            return tabs.map(function (tab) {
                var cls = tab.key === activeTab ? 'consult-tab active' : 'consult-tab';
                return '<button class="' + cls + '" type="button" data-consult-tab="' + tab.key + '">'
                    + '<span>' + tab.label + '</span><em>' + getTabCount(tab.key) + '</em>'
                    + '</button>';
            }).join('');
        }

        function renderFilters() {
            var typeOptions = option('all', '全部类型', filters.type) + getTypeOptions().map(function (type) {
                return option(type, type, filters.type);
            }).join('');
            var statusOptions = option('all', '全部状态', filters.status)
                + option('待处理', '待处理', filters.status)
                + option('已处理', '已处理', filters.status);

            return ''
                + '<div class="consult-filter-card">'
                +   '<div class="consult-filter-main">'
                +       '<input class="consult-filter-input" type="text" data-consult-keyword placeholder="搜索咨询对象/对接方/联系人" value="' + escapeHtml(filters.keyword) + '">'
                +       '<select class="consult-filter-select" data-consult-type>' + typeOptions + '</select>'
                +       '<select class="consult-filter-select" data-consult-status>' + statusOptions + '</select>'
                +   '</div>'
                +   '<div class="consult-filter-actions">'
                +       '<button class="consult-filter-btn primary" type="button" data-consult-search>' + icons.search + '<span>查询</span></button>'
                +       '<button class="consult-filter-btn" type="button" data-consult-reset>' + icons.reset + '<span>重置</span></button>'
                +   '</div>'
                + '</div>';
        }

        function getFilteredRecords() {
            var keyword = filters.keyword.toLowerCase();
            return consultRecords.filter(function (item) {
                var status = getStatus(item);
                if (activeTab === 'pending' && status !== '待处理') return false;
                if (activeTab === 'processed' && status === '待处理') return false;
                if (filters.type !== 'all' && getConsultType(item) !== filters.type) return false;
                if (filters.status !== 'all' && status !== filters.status) return false;
                if (!keyword) return true;
                var text = [item.object, getConsultType(item), item.person, item.submitInfo.org, getCounterparty(item)].join(' ').toLowerCase();
                return text.indexOf(keyword) !== -1;
            });
        }

        function renderPageButton(page, currentPage) {
            var cls = page === currentPage ? 'consult-page-btn active' : 'consult-page-btn';
            return '<button class="' + cls + '" type="button" data-consult-page="' + page + '">' + page + '</button>';
        }

        function renderPagination(total, totalPages, startIndex, pageCount) {
            var currentPage = pagination.page;
            var startText = total ? startIndex + 1 : 0;
            var endText = total ? startIndex + pageCount : 0;
            var pageButtons = [];
            for (var i = 1; i <= totalPages; i += 1) {
                pageButtons.push(renderPageButton(i, currentPage));
            }
            var prevCls = currentPage <= 1 ? 'consult-page-btn disabled' : 'consult-page-btn';
            var nextCls = currentPage >= totalPages ? 'consult-page-btn disabled' : 'consult-page-btn';
            var sizeOptions = [5, 10, 20].map(function (size) {
                var selected = size === pagination.pageSize ? ' selected' : '';
                return '<option value="' + size + '"' + selected + '>' + size + '条/页</option>';
            }).join('');

            return ''
                + '<div class="consult-pagination">'
                +   '<div class="consult-page-info">显示 ' + startText + '-' + endText + ' 条，共 ' + total + ' 条</div>'
                +   '<div class="consult-page-controls">'
                +       '<select class="consult-page-size" data-consult-page-size>' + sizeOptions + '</select>'
                +       '<button class="' + prevCls + '" type="button" data-consult-page="prev">上一页</button>'
                +       pageButtons.join('')
                +       '<button class="' + nextCls + '" type="button" data-consult-page="next">下一页</button>'
                +   '</div>'
                + '</div>';
        }

        function renderRows(records) {
            if (!records.length) {
                return '<tr><td class="consult-empty-cell" colspan="8">暂无匹配的咨询记录</td></tr>';
            }
            return records.map(function (item) {
                var status = getStatus(item);
                var actions = activeTab === 'pending' && status === '待处理'
                    ? '<button class="consult-action-btn primary" type="button" data-consult-action="handle" data-consult-id="' + item.id + '">' + icons.handle + '<span>处理</span></button>'
                    : '<button class="consult-action-btn" type="button" data-consult-action="view" data-consult-id="' + item.id + '">' + icons.view + '<span>查看</span></button>';

                return ''
                    + '<tr>'
                    +   '<td class="consult-name-cell"><a class="consult-object-link" href="javascript:void(0)" data-consult-action="view" data-consult-id="' + item.id + '">' + escapeHtml(item.object) + '</a></td>'
                    +   '<td><span class="' + tagClass(item) + '">' + escapeHtml(getConsultType(item)) + '</span></td>'
                    +   '<td>' + escapeHtml(getCounterparty(item)) + '</td>'
                    +   '<td>' + escapeHtml(item.person) + '</td>'
                    +   '<td class="consult-nowrap">' + escapeHtml(item.createdAt) + '</td>'
                    +   '<td class="consult-nowrap">' + escapeHtml(getLatestReplyTime(item)) + '</td>'
                    +   '<td><span class="consult-status-badge ' + getStatusClass(status) + '">' + escapeHtml(status) + '</span></td>'
                    +   '<td><div class="consult-action-group">' + actions + '</div></td>'
                    + '</tr>';
            }).join('');
        }

        function renderTable(records) {
            var total = records.length;
            var totalPages = Math.max(1, Math.ceil(total / pagination.pageSize));
            if (pagination.page > totalPages) pagination.page = totalPages;
            if (pagination.page < 1) pagination.page = 1;
            var startIndex = (pagination.page - 1) * pagination.pageSize;
            var pageRecords = records.slice(startIndex, startIndex + pagination.pageSize);

            return ''
                + '<section class="consult-table-card">'
                +   '<div class="consult-table-head">'
                +       '<div class="consult-table-title">咨询记录</div>'
                +       '<div class="consult-table-count">共 ' + total + ' 条</div>'
                +   '</div>'
                +   '<div class="consult-table-scroll">'
                +       '<table class="consult-table">'
                +           '<thead><tr>'
                +               '<th>咨询对象</th><th>咨询类型</th><th>对接方</th><th>联系人</th><th>提交时间</th><th>最近回复时间</th><th>状态</th><th>操作</th>'
                +           '</tr></thead>'
                +           '<tbody>' + renderRows(pageRecords) + '</tbody>'
                +       '</table>'
                +   '</div>'
                +   renderPagination(total, totalPages, startIndex, pageRecords.length)
                + '</section>';
        }

        function renderInfoGrid(rows) {
            return rows.map(function (row) {
                return '<div class="consult-info-item"><span>' + escapeHtml(row[0]) + '</span><strong>' + escapeHtml(row[1]) + '</strong></div>';
            }).join('');
        }

        function renderObjectInfo(item) {
            return (item.objectInfo || []).map(function (row) {
                return '<div class="consult-detail-row"><span>' + escapeHtml(row[0]) + '</span><strong>' + escapeHtml(row[1]) + '</strong></div>';
            }).join('');
        }

        function renderHistory(item) {
            var history = getHistory(item);
            if (!history.length) return '<div class="consult-record-empty">暂无回复记录</div>';
            return history.map(function (entry) {
                var actor = entry.name || (entry.from === 'asker' ? '咨询方' : '对接方');
                return ''
                    + '<div class="consult-record-item">'
                    +   '<div class="consult-record-time">' + escapeHtml(entry.time) + '</div>'
                    +   '<div class="consult-record-main">'
                    +       '<div class="consult-record-actor">' + escapeHtml(actor) + '</div>'
                    +       '<div class="consult-record-text">' + escapeHtml(entry.text) + '</div>'
                    +   '</div>'
                    + '</div>';
            }).join('');
        }

        function renderModal() {
            if (!modalState.id) return '';
            var item = consultRecords.find(function (record) { return record.id === modalState.id; });
            if (!item) return '';
            var status = getStatus(item);
            var isHandle = modalState.mode === 'handle';
            var title = isHandle ? '处理咨询' : '查看咨询';
            var baseRows = [
                ['咨询对象', item.object],
                ['咨询类型', getConsultType(item)],
                ['对接方', getCounterparty(item)],
                ['联系人', item.person],
                ['提交时间', item.createdAt],
                ['状态', status]
            ];
            var contactRows = [
                ['机构名称', item.submitInfo.org],
                ['联系人姓名', item.submitInfo.name],
                ['联系人电话', item.submitInfo.phone],
                ['联系人邮箱', item.submitInfo.email]
            ];
            var replySection = isHandle
                ? '<section class="consult-modal-section">'
                    + '<div class="consult-section-title">处理回复</div>'
                    + '<textarea class="consult-reply-textarea" data-consult-reply placeholder="请输入处理回复"></textarea>'
                    + (modalState.error ? '<div class="consult-form-error">' + escapeHtml(modalState.error) + '</div>' : '')
                + '</section>'
                : '';
            var viewReplySection = isHandle
                ? ''
                : '<div class="consult-reply-box">'
                    + '<div class="consult-reply-title">回复内容</div>'
                    + '<div class="consult-reply-content">' + escapeHtml(getReplyContent(item)) + '</div>'
                + '</div>';
            var footer = isHandle
                ? '<button class="consult-modal-btn" type="button" data-consult-modal-close>' + icons.close + '<span>取消</span></button>'
                    + '<button class="consult-modal-btn primary" type="button" data-consult-submit>' + icons.submit + '<span>提交回复</span></button>'
                : '<button class="consult-modal-btn primary" type="button" data-consult-modal-close>' + icons.close + '<span>关闭</span></button>';

            return ''
                + '<div class="consult-modal-mask show" role="presentation">'
                +   '<div class="consult-modal-box" role="dialog" aria-modal="true" aria-label="' + title + '">'
                +       '<div class="consult-modal-head">'
                +           '<div><div class="consult-modal-title">' + title + '</div><div class="consult-modal-subtitle">' + escapeHtml(item.object) + '</div></div>'
                +           '<button class="consult-modal-close" type="button" data-consult-modal-close aria-label="关闭">' + icons.close + '</button>'
                +       '</div>'
                +       '<div class="consult-modal-body">'
                +           '<section class="consult-modal-section">'
                +               '<div class="consult-section-title">咨询基本信息</div>'
                +               '<div class="consult-info-grid">' + renderInfoGrid(baseRows) + '</div>'
                +           '</section>'
                +           '<section class="consult-modal-section">'
                +               '<div class="consult-section-title">咨询内容</div>'
                +               '<div class="consult-content-box">' + escapeHtml(getConsultContent(item)) + '</div>'
                +               viewReplySection
                +           '</section>'
                +           '<section class="consult-modal-section consult-modal-split">'
                +               '<div>'
                +                   '<div class="consult-section-title">联系方式</div>'
                +                   '<div class="consult-detail-list">' + renderInfoGrid(contactRows) + '</div>'
                +               '</div>'
                +               '<div>'
                +                   '<div class="consult-section-title">咨询对象信息</div>'
                +                   '<div class="consult-detail-list">' + renderObjectInfo(item) + '</div>'
                +               '</div>'
                +           '</section>'
                +           replySection
                +       '</div>'
                +       '<div class="consult-modal-footer">' + footer + '</div>'
                +   '</div>'
                + '</div>';
        }

        function renderPanel() {
            var records = getFilteredRecords();
            panel.innerHTML = ''
                + '<div class="consult-board">'
                +   (noticeText ? '<div class="consult-notice"><span></span>' + escapeHtml(noticeText) + '</div>' : '')
                +   '<div class="consult-tabs" role="tablist">' + renderTabs() + '</div>'
                +   renderFilters()
                +   renderTable(records)
                + '</div>'
                + renderModal();
            bindEvents();
        }

        function closeModal() {
            modalState = { id: null, mode: 'view', error: '' };
            renderPanel();
        }

        function openModal(id, mode) {
            var item = consultRecords.find(function (record) { return record.id === id; });
            if (!item) return;
            item.unread = false;
            modalState = { id: id, mode: mode || 'view', error: '' };
            renderSidebar();
            renderPanel();
        }

        function submitReply() {
            var item = consultRecords.find(function (record) { return record.id === modalState.id; });
            var input = panel.querySelector('[data-consult-reply]');
            if (!item || !input) return;
            var text = input.value.trim();
            if (!text) {
                modalState.error = '请填写处理回复。';
                renderPanel();
                return;
            }
            item.messages.push({ kind: 'time', text: '刚刚' });
            item.messages.push({ kind: 'msg', from: role === 'supplier' ? 'provider' : 'asker', name: '我', text: text });
            item.status = '已处理';
            item.unread = false;
            activeTab = 'processed';
            pagination.page = 1;
            modalState = { id: null, mode: 'view', error: '' };
            noticeText = '处理回复已提交。';
            renderSidebar();
            renderPanel();
        }

        function bindEvents() {
            panel.querySelectorAll('[data-consult-tab]').forEach(function (button) {
                button.addEventListener('click', function () {
                    activeTab = this.dataset.consultTab || 'pending';
                    filters.status = 'all';
                    pagination.page = 1;
                    modalState = { id: null, mode: 'view', error: '' };
                    renderPanel();
                });
            });

            var keywordInput = panel.querySelector('[data-consult-keyword]');
            var typeSelect = panel.querySelector('[data-consult-type]');
            var statusSelect = panel.querySelector('[data-consult-status]');
            var searchButton = panel.querySelector('[data-consult-search]');
            var resetButton = panel.querySelector('[data-consult-reset]');

            function applyKeyword() {
                filters.keyword = keywordInput ? keywordInput.value.trim() : '';
                pagination.page = 1;
                renderPanel();
            }

            if (keywordInput) {
                keywordInput.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') applyKeyword();
                });
            }
            if (searchButton) searchButton.addEventListener('click', applyKeyword);
            if (typeSelect) {
                typeSelect.addEventListener('change', function () {
                    filters.type = this.value;
                    pagination.page = 1;
                    renderPanel();
                });
            }
            if (statusSelect) {
                statusSelect.addEventListener('change', function () {
                    filters.status = this.value;
                    pagination.page = 1;
                    renderPanel();
                });
            }
            if (resetButton) {
                resetButton.addEventListener('click', function () {
                    filters = { keyword: '', type: 'all', status: 'all' };
                    pagination.page = 1;
                    renderPanel();
                });
            }

            panel.querySelectorAll('[data-consult-page]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.classList.contains('disabled')) return;
                    var action = this.dataset.consultPage;
                    if (action === 'prev') pagination.page -= 1;
                    else if (action === 'next') pagination.page += 1;
                    else pagination.page = parseInt(action, 10) || 1;
                    renderPanel();
                });
            });

            var pageSizeSelect = panel.querySelector('[data-consult-page-size]');
            if (pageSizeSelect) {
                pageSizeSelect.addEventListener('change', function () {
                    pagination.pageSize = parseInt(this.value, 10) || 5;
                    pagination.page = 1;
                    renderPanel();
                });
            }

            panel.querySelectorAll('[data-consult-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    openModal(this.dataset.consultId, this.dataset.consultAction === 'handle' ? 'handle' : 'view');
                });
            });

            panel.querySelectorAll('[data-consult-modal-close]').forEach(function (button) {
                button.addEventListener('click', closeModal);
            });

            var submitButton = panel.querySelector('[data-consult-submit]');
            if (submitButton) submitButton.addEventListener('click', submitReply);
        }

        renderPanel();
    }

    function init() {
        renderTopbar();
        renderSidebar();
        renderConsultPanel();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
