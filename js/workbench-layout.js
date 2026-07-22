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
                    defaultOpen: true,
                    children: [
                        { key: 'resource-apply', label: '资源申请管理', href: 'buyer-center.html?menu=resource-apply' },
                        { key: 'product-order', label: '产品订单管理', href: 'buyer-center.html?menu=product-order' },
                        { key: 'service-order', label: '服务订单管理', href: 'buyer-center.html?menu=service-order' },
                        { key: 'product-contract', label: '产品合同管理', href: 'buyer-center.html?menu=product-contract' },
                        { key: 'service-contract', label: '服务合同管理', href: 'buyer-center.html?menu=service-contract' }
                    ]
                },
                {
                    label: '费用管理',
                    icon: 'money',
                    defaultOpen: true,
                    children: [
                        { key: 'transaction-bill', label: '交易账单管理', href: 'buyer-center.html?menu=transaction-bill' },
                        { key: 'offline-voucher', label: '线下支付凭证', href: 'buyer-center.html?menu=offline-voucher' }
                    ]
                },
                {
                    label: '发票管理',
                    icon: 'invoice',
                    defaultOpen: true,
                    children: [
                        { key: 'invoice-info', label: '产品开票信息', href: 'buyer-center.html?menu=invoice-info' },
                        { key: 'invoice-apply', label: '产品开票申请', href: 'buyer-center.html?menu=invoice-apply' }
                    ]
                },
                { key: 'my-demand', label: '我的需求', icon: 'demand', href: 'buyer-center.html?menu=my-demand' },
                {
                    label: '争议仲裁',
                    icon: 'dispute',
                    children: [
                        { key: 'dispute', label: '争议仲裁', href: 'buyer-center.html?menu=dispute' }
                    ]
                },
                {
                    label: '合约管理',
                    icon: 'contract',
                    children: [
                        { key: 'contract', label: '合约管理', href: 'buyer-center.html?menu=contract' }
                    ]
                }
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
                        { key: 'offline-voucher', label: '线下支付凭证', href: 'supplier-center.html?menu=offline-voucher' },
                        { key: 'settlement-account', label: '收款结算账户', href: 'supplier-center.html?menu=settlement-account' }
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
        'settlement-account': { title: '收款结算账户', desc: '维护线上收款商户资料、结算账户和进件审核状态。' },
        'invoice': { title: '发票管理', desc: '处理发票申请、开票记录和发票状态跟踪。' },
        'invoice-info': { title: '产品开票信息', desc: '维护产品交易开票抬头、税号和收票信息。' },
        'invoice-apply': { title: '产品开票申请', desc: '查看产品订单的开票申请和处理状态。' },
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

    var consultPortalCategories = [
            "数据战略规划与治理咨询服务类",
            "数据资产管理与价值评估咨询服务类",
            "数据合规运营与流通交易咨询服务类",
            "行业场景化AI数据服务咨询服务类"
    ];
    var serviceCategoryOptions = ['数据咨询服务', '行业解决方案'];
    var servicePayModeOptions = ['预付费', '后付费'];
    var serviceMeasureModeOptions = ['按次数', '按时长', '面议'];

    var consultationServiceCatalog = [
            {
                    "id": "strategy-top",
                    "status": "listed",
                    "name": "数据战略与要素发展顶层规划咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据战略规划与治理咨询服务类",
                    "serviceType": "数据战略与要素发展顶层规划咨询服务",
                    "org": "数据提供方,数据需求方",
                    "business": "数据资源需求,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-18",
                    "version": "v1",
                    "cover": "images/consult-governance.jpg",
                    "thumb": "images/consult-governance.jpg",
                    "heroImg": "images/consult-governance.jpg",
                    "tabTitle": "数据战略与要素发展顶层规划咨询服务",
                    "tabDesc": "数据发展战略蓝图、价值转化路径与业务赋能策略",
                    "badge": "战略治理",
                    "heroTitle": "数据战略与要素发展顶层规划咨询服务",
                    "heroSubtitle": "围绕数据发展战略蓝图、价值转化路径与业务赋能策略，提供战略治理方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦数据发展战略蓝图、价值转化路径与业务赋能策略，结合数据战略规划与治理咨询服务的实施要求，为客户形成数据战略蓝图、目标体系、实施路线图和重点任务清单，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "面对数字化转型浪潮，本服务旨在为客户提供全面的数据发展战略蓝图设计。我们将深入分析客户的业务特点、行业趋势及政策导向，明确数据要素的开发利用方向、价值转化路径及业务赋能策略。通过顶层设计，帮助客户洞察数据价值，制定前瞻性的数据发展目标，并规划切实可行的实施路径，确保数据战略与企业整体战略高度协同，驱动组织创新与增长。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 需求共识：围绕数据发展战略蓝图、价值转化路径与业务赋能策略开展访谈与资料收集，明确服务目标、参与角色和交付边界。\n02 现状诊断：梳理客户现有业务流程、数据基础、组织机制和系统能力，识别关键差距。\n03 方案设计：结合政策要求与行业实践，设计数据战略与要素发展顶层规划咨询服务的总体思路和核心任务。\n04 路径规划：拆解阶段目标、重点工程、责任分工和里程碑，形成可推进的实施路线。\n05 材料沉淀：整理数据战略蓝图、目标体系、实施路线图和重点任务清单，支撑内部评审、项目立项和后续实施。\n06 迭代优化：结合试点反馈和业务变化，持续优化治理规则、应用场景和运营机制。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 顶层设计与业务协同：围绕数据发展战略蓝图、价值转化路径与业务赋能策略开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 体系化落地路径：以数据战略蓝图、目标体系、实施路线图和重点任务清单为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 制造企业数字化转型规划：面向制造企业数字化转型规划，围绕数据发展战略蓝图、价值转化路径与业务赋能策略开展现状梳理、方案设计和落地辅导，形成数据战略蓝图、目标体系、实施路线图和重点任务清单，支撑后续实施、审核或运营转化。\n02 园区数据要素发展规划：面向园区数据要素发展规划，围绕数据发展战略蓝图、价值转化路径与业务赋能策略开展现状梳理、方案设计和落地辅导，形成数据战略蓝图、目标体系、实施路线图和重点任务清单，支撑后续实施、审核或运营转化。\n03 集团数据战略升级：面向集团数据战略升级，围绕数据发展战略蓝图、价值转化路径与业务赋能策略开展现状梳理、方案设计和落地辅导，形成数据战略蓝图、目标体系、实施路线图和重点任务清单，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "governance-standard",
                    "status": "listed",
                    "name": "数据治理与标准体系建设咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据战略规划与治理咨询服务类",
                    "serviceType": "数据治理与标准体系建设咨询服务",
                    "org": "数据提供方,数据需求方",
                    "business": "数据资源需求,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-19",
                    "version": "v1",
                    "cover": "images/consult-governance.jpg",
                    "thumb": "images/consult-governance.jpg",
                    "heroImg": "images/consult-governance.jpg",
                    "tabTitle": "数据治理与标准体系建设咨询服务",
                    "tabDesc": "数据全生命周期治理、标准体系与主数据元数据管理",
                    "badge": "战略治理",
                    "heroTitle": "数据治理与标准体系建设咨询服务",
                    "heroSubtitle": "围绕数据全生命周期治理、标准体系与主数据元数据管理，提供战略治理方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦数据全生命周期治理、标准体系与主数据元数据管理，结合数据战略规划与治理咨询服务的实施要求，为客户形成治理制度框架、数据标准规范、主数据与元数据管理方案，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "数据治理是数据价值释放的基石。本服务围绕数据全生命周期管理，构建涵盖制度、流程、组织、技术及工具的完整数据治理体系。服务内容包括数据标准、主数据、元数据管理体系设计，旨在从源头提升数据的一致性、互通性与可复用性。通过建立健全的数据治理框架，为客户奠定坚实的数据管理基础，实现数据资产的规范化运营，有效降低数据风险。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 需求共识：围绕数据全生命周期治理、标准体系与主数据元数据管理开展访谈与资料收集，明确服务目标、参与角色和交付边界。\n02 现状诊断：梳理客户现有业务流程、数据基础、组织机制和系统能力，识别关键差距。\n03 方案设计：结合政策要求与行业实践，设计数据治理与标准体系建设咨询服务的总体思路和核心任务。\n04 路径规划：拆解阶段目标、重点工程、责任分工和里程碑，形成可推进的实施路线。\n05 材料沉淀：整理治理制度框架、数据标准规范、主数据与元数据管理方案，支撑内部评审、项目立项和后续实施。\n06 迭代优化：结合试点反馈和业务变化，持续优化治理规则、应用场景和运营机制。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 顶层设计与业务协同：围绕数据全生命周期治理、标准体系与主数据元数据管理开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 体系化落地路径：以治理制度框架、数据标准规范、主数据与元数据管理方案为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 企业数据治理体系建设：面向企业数据治理体系建设，围绕数据全生命周期治理、标准体系与主数据元数据管理开展现状梳理、方案设计和落地辅导，形成治理制度框架、数据标准规范、主数据与元数据管理方案，支撑后续实施、审核或运营转化。\n02 多系统数据标准统一：面向多系统数据标准统一，围绕数据全生命周期治理、标准体系与主数据元数据管理开展现状梳理、方案设计和落地辅导，形成治理制度框架、数据标准规范、主数据与元数据管理方案，支撑后续实施、审核或运营转化。\n03 数据中台治理规则落地：面向数据中台治理规则落地，围绕数据全生命周期治理、标准体系与主数据元数据管理开展现状梳理、方案设计和落地辅导，形成治理制度框架、数据标准规范、主数据与元数据管理方案，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "quality-improvement",
                    "status": "listed",
                    "name": "数据质量评价与提升咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据战略规划与治理咨询服务类",
                    "serviceType": "数据质量评价与提升咨询服务",
                    "org": "数据提供方,数据需求方",
                    "business": "数据资源需求,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-20",
                    "version": "v1",
                    "cover": "images/consult-governance.jpg",
                    "thumb": "images/consult-governance.jpg",
                    "heroImg": "images/consult-governance.jpg",
                    "tabTitle": "数据质量评价与提升咨询服务",
                    "tabDesc": "数据质量评估、问题诊断与持续提升机制",
                    "badge": "战略治理",
                    "heroTitle": "数据质量评价与提升咨询服务",
                    "heroSubtitle": "围绕数据质量评估、问题诊断与持续提升机制，提供战略治理方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦数据质量评估、问题诊断与持续提升机制，结合数据战略规划与治理咨询服务的实施要求，为客户形成数据质量评估报告、质量规则清单、整改计划和监测机制，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "高质量数据是精准决策的前提。本服务针对数据在采集、存储、处理及应用过程中出现的缺失、错误、重复、不一致等常见质量问题，提供系统性的评估、诊断与优化方案。我们将运用专业工具与方法，识别数据质量瓶颈，并建立数据质量管理机制，帮助客户持续提升数据的准确性、完整性与可用性，确保数据分析与决策的可靠性与有效性，避免因数据质量问题导致的业务损失。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 需求共识：围绕数据质量评估、问题诊断与持续提升机制开展访谈与资料收集，明确服务目标、参与角色和交付边界。\n02 现状诊断：梳理客户现有业务流程、数据基础、组织机制和系统能力，识别关键差距。\n03 方案设计：结合政策要求与行业实践，设计数据质量评价与提升咨询服务的总体思路和核心任务。\n04 路径规划：拆解阶段目标、重点工程、责任分工和里程碑，形成可推进的实施路线。\n05 材料沉淀：整理数据质量评估报告、质量规则清单、整改计划和监测机制，支撑内部评审、项目立项和后续实施。\n06 迭代优化：结合试点反馈和业务变化，持续优化治理规则、应用场景和运营机制。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 顶层设计与业务协同：围绕数据质量评估、问题诊断与持续提升机制开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 体系化落地路径：以数据质量评估报告、质量规则清单、整改计划和监测机制为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 经营分析数据质量提升：面向经营分析数据质量提升，围绕数据质量评估、问题诊断与持续提升机制开展现状梳理、方案设计和落地辅导，形成数据质量评估报告、质量规则清单、整改计划和监测机制，支撑后续实施、审核或运营转化。\n02 客户主数据质量治理：面向客户主数据质量治理，围绕数据质量评估、问题诊断与持续提升机制开展现状梳理、方案设计和落地辅导，形成数据质量评估报告、质量规则清单、整改计划和监测机制，支撑后续实施、审核或运营转化。\n03 监管报送数据质量校验：面向监管报送数据质量校验，围绕数据质量评估、问题诊断与持续提升机制开展现状梳理、方案设计和落地辅导，形成数据质量评估报告、质量规则清单、整改计划和监测机制，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "classification-organization",
                    "status": "listed",
                    "name": "数据分类分级与组织管理设计咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据战略规划与治理咨询服务类",
                    "serviceType": "数据分类分级与组织管理设计咨询服务",
                    "org": "数据提供方,数据需求方",
                    "business": "数据资源需求,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-21",
                    "version": "v1",
                    "cover": "images/consult-governance.jpg",
                    "thumb": "images/consult-governance.jpg",
                    "heroImg": "images/consult-governance.jpg",
                    "tabTitle": "数据分类分级与组织管理设计咨询服务",
                    "tabDesc": "分类分级标准、组织职责与安全边界设计",
                    "badge": "战略治理",
                    "heroTitle": "数据分类分级与组织管理设计咨询服务",
                    "heroSubtitle": "围绕分类分级标准、组织职责与安全边界设计，提供战略治理方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦分类分级标准、组织职责与安全边界设计，结合数据战略规划与治理咨询服务的实施要求，为客户形成分类分级目录、管理规范、职责矩阵和协同机制，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "为确保数据资产的安全合规与高效利用，本服务依据数据的敏感程度、重要性及业务属性，为客户建立科学的数据分类分级标准与管理规范。同时，设计与数据管理相匹配的组织架构、职责分工及协同机制，明确不同数据的治理要求与安全边界。通过精细化管理，有效防范数据泄露风险，提升数据管理效率，促进数据在合规框架下的有序流通。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 需求共识：围绕分类分级标准、组织职责与安全边界设计开展访谈与资料收集，明确服务目标、参与角色和交付边界。\n02 现状诊断：梳理客户现有业务流程、数据基础、组织机制和系统能力，识别关键差距。\n03 方案设计：结合政策要求与行业实践，设计数据分类分级与组织管理设计咨询服务的总体思路和核心任务。\n04 路径规划：拆解阶段目标、重点工程、责任分工和里程碑，形成可推进的实施路线。\n05 材料沉淀：整理分类分级目录、管理规范、职责矩阵和协同机制，支撑内部评审、项目立项和后续实施。\n06 迭代优化：结合试点反馈和业务变化，持续优化治理规则、应用场景和运营机制。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 顶层设计与业务协同：围绕分类分级标准、组织职责与安全边界设计开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 体系化落地路径：以分类分级目录、管理规范、职责矩阵和协同机制为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 企业敏感数据分级管理：面向企业敏感数据分级管理，围绕分类分级标准、组织职责与安全边界设计开展现状梳理、方案设计和落地辅导，形成分类分级目录、管理规范、职责矩阵和协同机制，支撑后续实施、审核或运营转化。\n02 公共数据安全边界划定：面向公共数据安全边界划定，围绕分类分级标准、组织职责与安全边界设计开展现状梳理、方案设计和落地辅导，形成分类分级目录、管理规范、职责矩阵和协同机制，支撑后续实施、审核或运营转化。\n03 跨部门数据协同治理：面向跨部门数据协同治理，围绕分类分级标准、组织职责与安全边界设计开展现状梳理、方案设计和落地辅导，形成分类分级目录、管理规范、职责矩阵和协同机制，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "metrics-master-data",
                    "status": "listed",
                    "name": "数据指标与主数据管理体系咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据战略规划与治理咨询服务类",
                    "serviceType": "数据指标与主数据管理体系咨询服务",
                    "org": "数据提供方,数据需求方",
                    "business": "数据资源需求,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-22",
                    "version": "v1",
                    "cover": "images/consult-governance.jpg",
                    "thumb": "images/consult-governance.jpg",
                    "heroImg": "images/consult-governance.jpg",
                    "tabTitle": "数据指标与主数据管理体系咨询服务",
                    "tabDesc": "统一指标口径、主数据治理与经营分析支撑",
                    "badge": "战略治理",
                    "heroTitle": "数据指标与主数据管理体系咨询服务",
                    "heroSubtitle": "围绕统一指标口径、主数据治理与经营分析支撑，提供战略治理方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦统一指标口径、主数据治理与经营分析支撑，结合数据战略规划与治理咨询服务的实施要求，为客户形成指标体系、主数据模型、口径定义和应用规则，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "为解决数据口径不一、指标混乱的问题，本服务聚焦企业核心业务对象，提供主数据治理设计，统一数据口径与标准，减少数据冗余与冲突。同时，构建面向经营分析、运营监测及绩效考核的数据指标体系，确保指标定义规则清晰、应用体系完善。旨在为客户提供精准、统一的决策支持，提升业务运营效率，实现数据驱动的精细化管理。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 需求共识：围绕统一指标口径、主数据治理与经营分析支撑开展访谈与资料收集，明确服务目标、参与角色和交付边界。\n02 现状诊断：梳理客户现有业务流程、数据基础、组织机制和系统能力，识别关键差距。\n03 方案设计：结合政策要求与行业实践，设计数据指标与主数据管理体系咨询服务的总体思路和核心任务。\n04 路径规划：拆解阶段目标、重点工程、责任分工和里程碑，形成可推进的实施路线。\n05 材料沉淀：整理指标体系、主数据模型、口径定义和应用规则，支撑内部评审、项目立项和后续实施。\n06 迭代优化：结合试点反馈和业务变化，持续优化治理规则、应用场景和运营机制。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 顶层设计与业务协同：围绕统一指标口径、主数据治理与经营分析支撑开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 体系化落地路径：以指标体系、主数据模型、口径定义和应用规则为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 经营指标口径统一：面向经营指标口径统一，围绕统一指标口径、主数据治理与经营分析支撑开展现状梳理、方案设计和落地辅导，形成指标体系、主数据模型、口径定义和应用规则，支撑后续实施、审核或运营转化。\n02 客户与产品主数据治理：面向客户与产品主数据治理，围绕统一指标口径、主数据治理与经营分析支撑开展现状梳理、方案设计和落地辅导，形成指标体系、主数据模型、口径定义和应用规则，支撑后续实施、审核或运营转化。\n03 绩效考核指标体系建设：面向绩效考核指标体系建设，围绕统一指标口径、主数据治理与经营分析支撑开展现状梳理、方案设计和落地辅导，形成指标体系、主数据模型、口径定义和应用规则，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "aggregation-platform",
                    "status": "listed",
                    "name": "数据聚合与运营平台架构设计咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据战略规划与治理咨询服务类",
                    "serviceType": "数据聚合与运营平台架构设计咨询服务",
                    "org": "数据提供方,数据需求方",
                    "business": "数据资源需求,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-23",
                    "version": "v1",
                    "cover": "images/consult-governance.jpg",
                    "thumb": "images/consult-governance.jpg",
                    "heroImg": "images/consult-governance.jpg",
                    "tabTitle": "数据聚合与运营平台架构设计咨询服务",
                    "tabDesc": "多源数据汇聚、治理分析与运营平台架构",
                    "badge": "战略治理",
                    "heroTitle": "数据聚合与运营平台架构设计咨询服务",
                    "heroSubtitle": "围绕多源数据汇聚、治理分析与运营平台架构，提供战略治理方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦多源数据汇聚、治理分析与运营平台架构，结合数据战略规划与治理咨询服务的实施要求，为客户形成平台总体架构、功能蓝图、建设路径和运营管理方案，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "面对海量异构数据，本服务为客户提供多源数据汇聚、整合、治理、分析及运营管理平台的整体架构规划与功能设计。旨在帮助客户搭建统一的数据中台或数据湖平台，形成强大的数据聚合能力，支撑数据资产的集中管理、高效利用与价值释放。通过先进的平台架构，赋能业务创新，加速数字化转型进程，构建企业核心竞争力。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 需求共识：围绕多源数据汇聚、治理分析与运营平台架构开展访谈与资料收集，明确服务目标、参与角色和交付边界。\n02 现状诊断：梳理客户现有业务流程、数据基础、组织机制和系统能力，识别关键差距。\n03 方案设计：结合政策要求与行业实践，设计数据聚合与运营平台架构设计咨询服务的总体思路和核心任务。\n04 路径规划：拆解阶段目标、重点工程、责任分工和里程碑，形成可推进的实施路线。\n05 材料沉淀：整理平台总体架构、功能蓝图、建设路径和运营管理方案，支撑内部评审、项目立项和后续实施。\n06 迭代优化：结合试点反馈和业务变化，持续优化治理规则、应用场景和运营机制。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 顶层设计与业务协同：围绕多源数据汇聚、治理分析与运营平台架构开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 体系化落地路径：以平台总体架构、功能蓝图、建设路径和运营管理方案为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 集团数据中台规划：面向集团数据中台规划，围绕多源数据汇聚、治理分析与运营平台架构开展现状梳理、方案设计和落地辅导，形成平台总体架构、功能蓝图、建设路径和运营管理方案，支撑后续实施、审核或运营转化。\n02 园区数据湖平台建设：面向园区数据湖平台建设，围绕多源数据汇聚、治理分析与运营平台架构开展现状梳理、方案设计和落地辅导，形成平台总体架构、功能蓝图、建设路径和运营管理方案，支撑后续实施、审核或运营转化。\n03 产业数据运营平台设计：面向产业数据运营平台设计，围绕多源数据汇聚、治理分析与运营平台架构开展现状梳理、方案设计和落地辅导，形成平台总体架构、功能蓝图、建设路径和运营管理方案，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "service-mall",
                    "status": "listed",
                    "name": "数据产品/服务商城建设咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据战略规划与治理咨询服务类",
                    "serviceType": "数据产品/服务商城建设咨询服务",
                    "org": "数据提供方,数据需求方",
                    "business": "数据资源需求,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-24",
                    "version": "v1",
                    "cover": "images/consult-governance.jpg",
                    "thumb": "images/consult-governance.jpg",
                    "heroImg": "images/consult-governance.jpg",
                    "tabTitle": "数据产品/服务商城建设咨询服务",
                    "tabDesc": "数据产品展示、检索、交易与评价入口建设",
                    "badge": "战略治理",
                    "heroTitle": "数据产品/服务商城建设咨询服务",
                    "heroSubtitle": "围绕数据产品展示、检索、交易与评价入口建设，提供战略治理方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦数据产品展示、检索、交易与评价入口建设，结合数据战略规划与治理咨询服务的实施要求，为客户形成商城功能方案、栏目结构、交易流程和运营规则，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "为响应数据要素市场化趋势，本服务围绕数据产品与服务的市场化需求，为客户设计标准化、功能完善的数据产品展示、检索、交易及评价入口。旨在帮助客户打造一站式数据服务门户，提升数据产品的市场吸引力与客户接受度，促进数据要素的流通与变现。通过搭建高效的交易平台，加速数据价值的商业化落地，拓展新的营收增长点。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 需求共识：围绕数据产品展示、检索、交易与评价入口建设开展访谈与资料收集，明确服务目标、参与角色和交付边界。\n02 现状诊断：梳理客户现有业务流程、数据基础、组织机制和系统能力，识别关键差距。\n03 方案设计：结合政策要求与行业实践，设计数据产品/服务商城建设咨询服务的总体思路和核心任务。\n04 路径规划：拆解阶段目标、重点工程、责任分工和里程碑，形成可推进的实施路线。\n05 材料沉淀：整理商城功能方案、栏目结构、交易流程和运营规则，支撑内部评审、项目立项和后续实施。\n06 迭代优化：结合试点反馈和业务变化，持续优化治理规则、应用场景和运营机制。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 顶层设计与业务协同：围绕数据产品展示、检索、交易与评价入口建设开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 体系化落地路径：以商城功能方案、栏目结构、交易流程和运营规则为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 数据服务门户建设：面向数据服务门户建设，围绕数据产品展示、检索、交易与评价入口建设开展现状梳理、方案设计和落地辅导，形成商城功能方案、栏目结构、交易流程和运营规则，支撑后续实施、审核或运营转化。\n02 企业数据产品商城上线：面向企业数据产品商城上线，围绕数据产品展示、检索、交易与评价入口建设开展现状梳理、方案设计和落地辅导，形成商城功能方案、栏目结构、交易流程和运营规则，支撑后续实施、审核或运营转化。\n03 数据交易入口运营优化：面向数据交易入口运营优化，围绕数据产品展示、检索、交易与评价入口建设开展现状梳理、方案设计和落地辅导，形成商城功能方案、栏目结构、交易流程和运营规则，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "resource-inventory",
                    "status": "listed",
                    "name": "数据资源普查与资产盘点咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据资产管理与价值评估咨询服务类",
                    "serviceType": "数据资源普查与资产盘点咨询服务",
                    "org": "数据提供方,数据需求方,评估服务商",
                    "business": "数据资产管理,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-25",
                    "version": "v1",
                    "cover": "images/consult-accounting.jpg",
                    "thumb": "images/consult-accounting.jpg",
                    "heroImg": "images/consult-accounting.jpg",
                    "tabTitle": "数据资源普查与资产盘点咨询服务",
                    "tabDesc": "数据资源底数摸查、资产识别与核心资源盘点",
                    "badge": "资产管理",
                    "heroTitle": "数据资源普查与资产盘点咨询服务",
                    "heroSubtitle": "围绕数据资源底数摸查、资产识别与核心资源盘点，提供资产管理方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦数据资源底数摸查、资产识别与核心资源盘点，结合数据资产管理与价值评估咨询服务的实施要求，为客户形成数据资源清单、资产盘点报告、可运营资源目录，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "本服务为客户全面梳理其拥有的数据资源底数，通过深入的业务调研和技术分析，摸清数据存量、来源分布与现状。我们将从资产视角识别具备产品化、可运营化及可资产化的核心数据资源，为客户形成清晰的数据资产清单，为后续的价值评估、财务入表及市场化运作奠定坚实基础，助力企业发现“沉睡”的数据财富。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 资产识别：围绕数据资源底数摸查、资产识别与核心资源盘点梳理数据来源、业务责任、使用范围和可资产化条件。\n02 现状盘点：核查数据资源质量、权属边界、授权关系和运营基础，形成资产底图。\n03 价值判断：结合业务价值、市场需求、成本投入和合规基础，判断资产价值表达方式。\n04 路径设计：设计登记、评估、入表、定价、融资或运营的实施路径和协同流程。\n05 材料准备：沉淀数据资源清单、资产盘点报告、可运营资源目录，支撑审计沟通、交易挂牌、融资对接或资产管理。\n06 持续管理：建立台账更新、价值复核、风险检查和运营跟踪机制，保障资产持续可管。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 资产视角贯穿全程：围绕数据资源底数摸查、资产识别与核心资源盘点开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 支撑入表交易融资：以数据资源清单、资产盘点报告、可运营资源目录为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 企业数据资源普查：面向企业数据资源普查，围绕数据资源底数摸查、资产识别与核心资源盘点开展现状梳理、方案设计和落地辅导，形成数据资源清单、资产盘点报告、可运营资源目录，支撑后续实施、审核或运营转化。\n02 国企资产盘点专项：面向国企资产盘点专项，围绕数据资源底数摸查、资产识别与核心资源盘点开展现状梳理、方案设计和落地辅导，形成数据资源清单、资产盘点报告、可运营资源目录，支撑后续实施、审核或运营转化。\n03 园区数据资源底数梳理：面向园区数据资源底数梳理，围绕数据资源底数摸查、资产识别与核心资源盘点开展现状梳理、方案设计和落地辅导，形成数据资源清单、资产盘点报告、可运营资源目录，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "按时长",
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "3000",
                            "durationUnit": "元/天",
                            "referencePrice": "3000元/天"
                    }
            },
            {
                    "id": "asset-catalog",
                    "status": "listed",
                    "name": "数据资产目录与动态台账建设咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据资产管理与价值评估咨询服务类",
                    "serviceType": "数据资产目录与动态台账建设咨询服务",
                    "org": "数据提供方,数据需求方,评估服务商",
                    "business": "数据资产管理,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-26",
                    "version": "v1",
                    "cover": "images/consult-accounting.jpg",
                    "thumb": "images/consult-accounting.jpg",
                    "heroImg": "images/consult-accounting.jpg",
                    "tabTitle": "数据资产目录与动态台账建设咨询服务",
                    "tabDesc": "资产目录结构、分类体系与动态台账管理",
                    "badge": "资产管理",
                    "heroTitle": "数据资产目录与动态台账建设咨询服务",
                    "heroSubtitle": "围绕资产目录结构、分类体系与动态台账管理，提供资产管理方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦资产目录结构、分类体系与动态台账管理，结合数据资产管理与价值评估咨询服务的实施要求，为客户形成数据资产目录、动态台账、登记更新规则和管理模板，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "为实现数据资产的精细化管理，本服务为客户建立统一的数据资产目录结构与分类体系，确保数据资产的可查、可管、可用。同时，构建数据资源、数据产品、授权关系及使用状态的动态管理台账，实现数据资产的持续登记、更新与规范管理。通过系统化的管理工具，提升资产管理效率，为数据资产的流转与交易提供透明化支撑。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 资产识别：围绕资产目录结构、分类体系与动态台账管理梳理数据来源、业务责任、使用范围和可资产化条件。\n02 现状盘点：核查数据资源质量、权属边界、授权关系和运营基础，形成资产底图。\n03 价值判断：结合业务价值、市场需求、成本投入和合规基础，判断资产价值表达方式。\n04 路径设计：设计登记、评估、入表、定价、融资或运营的实施路径和协同流程。\n05 材料准备：沉淀数据资产目录、动态台账、登记更新规则和管理模板，支撑审计沟通、交易挂牌、融资对接或资产管理。\n06 持续管理：建立台账更新、价值复核、风险检查和运营跟踪机制，保障资产持续可管。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 资产视角贯穿全程：围绕资产目录结构、分类体系与动态台账管理开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 支撑入表交易融资：以数据资产目录、动态台账、登记更新规则和管理模板为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 数据资产目录初始化：面向数据资产目录初始化，围绕资产目录结构、分类体系与动态台账管理开展现状梳理、方案设计和落地辅导，形成数据资产目录、动态台账、登记更新规则和管理模板，支撑后续实施、审核或运营转化。\n02 授权关系台账建设：面向授权关系台账建设，围绕资产目录结构、分类体系与动态台账管理开展现状梳理、方案设计和落地辅导，形成数据资产目录、动态台账、登记更新规则和管理模板，支撑后续实施、审核或运营转化。\n03 数据产品状态跟踪管理：面向数据产品状态跟踪管理，围绕资产目录结构、分类体系与动态台账管理开展现状梳理、方案设计和落地辅导，形成数据资产目录、动态台账、登记更新规则和管理模板，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "按时长",
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "3000",
                            "durationUnit": "元/天",
                            "referencePrice": "3000元/天"
                    }
            },
            {
                    "id": "ownership-confirmation",
                    "status": "listed",
                    "name": "数据权属梳理与确权分析咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据资产管理与价值评估咨询服务类",
                    "serviceType": "数据权属梳理与确权分析咨询服务",
                    "org": "数据提供方,数据需求方,评估服务商",
                    "business": "数据资产管理,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-27",
                    "version": "v1",
                    "cover": "images/consult-accounting.jpg",
                    "thumb": "images/consult-accounting.jpg",
                    "heroImg": "images/consult-accounting.jpg",
                    "tabTitle": "数据权属梳理与确权分析咨询服务",
                    "tabDesc": "数据来源、管理责任、使用边界与授权关系分析",
                    "badge": "资产管理",
                    "heroTitle": "数据权属梳理与确权分析咨询服务",
                    "heroSubtitle": "围绕数据来源、管理责任、使用边界与授权关系分析，提供资产管理方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦数据来源、管理责任、使用边界与授权关系分析，结合数据资产管理与价值评估咨询服务的实施要求，为客户形成权属梳理报告、责任边界说明、确权建议和授权链路材料，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "数据权属不清是数据流通的障碍。本服务深入分析数据来源、管理责任、使用边界及授权关系，为客户厘清数据权属与责任划分。我们将提供法律与管理层面的确权分析与管理建议，帮助客户明确数据资产的归属及责任边界，有效规避潜在的法律纠纷，为数据合规流通与交易提供坚实保障，促进数据要素市场健康发展。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 资产识别：围绕数据来源、管理责任、使用边界与授权关系分析梳理数据来源、业务责任、使用范围和可资产化条件。\n02 现状盘点：核查数据资源质量、权属边界、授权关系和运营基础，形成资产底图。\n03 价值判断：结合业务价值、市场需求、成本投入和合规基础，判断资产价值表达方式。\n04 路径设计：设计登记、评估、入表、定价、融资或运营的实施路径和协同流程。\n05 材料准备：沉淀权属梳理报告、责任边界说明、确权建议和授权链路材料，支撑审计沟通、交易挂牌、融资对接或资产管理。\n06 持续管理：建立台账更新、价值复核、风险检查和运营跟踪机制，保障资产持续可管。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 资产视角贯穿全程：围绕数据来源、管理责任、使用边界与授权关系分析开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 支撑入表交易融资：以权属梳理报告、责任边界说明、确权建议和授权链路材料为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 多主体数据权属厘清：面向多主体数据权属厘清，围绕数据来源、管理责任、使用边界与授权关系分析开展现状梳理、方案设计和落地辅导，形成权属梳理报告、责任边界说明、确权建议和授权链路材料，支撑后续实施、审核或运营转化。\n02 数据交易前确权分析：面向数据交易前确权分析，围绕数据来源、管理责任、使用边界与授权关系分析开展现状梳理、方案设计和落地辅导，形成权属梳理报告、责任边界说明、确权建议和授权链路材料，支撑后续实施、审核或运营转化。\n03 授权关系风险复核：面向授权关系风险复核，围绕数据来源、管理责任、使用边界与授权关系分析开展现状梳理、方案设计和落地辅导，形成权属梳理报告、责任边界说明、确权建议和授权链路材料，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "按时长",
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "3000",
                            "durationUnit": "元/天",
                            "referencePrice": "3000元/天"
                    }
            },
            {
                    "id": "asset-valuation",
                    "status": "listed",
                    "name": "数据资产价值评估与定价咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据资产管理与价值评估咨询服务类",
                    "serviceType": "数据资产价值评估与定价咨询服务",
                    "org": "数据提供方,数据需求方,评估服务商",
                    "business": "数据资产管理,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-18",
                    "version": "v1",
                    "cover": "images/consult-accounting.jpg",
                    "thumb": "images/consult-accounting.jpg",
                    "heroImg": "images/consult-accounting.jpg",
                    "tabTitle": "数据资产价值评估与定价咨询服务",
                    "tabDesc": "数据资产价值评估模型、价值区间与定价策略",
                    "badge": "资产管理",
                    "heroTitle": "数据资产价值评估与定价咨询服务",
                    "heroSubtitle": "围绕数据资产价值评估模型、价值区间与定价策略，提供资产管理方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦数据资产价值评估模型、价值区间与定价策略，结合数据资产管理与价值评估咨询服务的实施要求，为客户形成价值评估报告、定价模型、报价建议和交易支撑材料，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "本服务结合数据资产的业务价值、市场稀缺性、变现能力及成本结构，为客户提供科学、客观的价值评估模型与定价策略。我们将运用多种评估方法，量化数据资产的经济价值，旨在帮助客户准确掌握数据资产的价值区间，制定更合理的市场报价策略，最大化数据资产的经济效益，为数据交易提供可靠依据。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 资产识别：围绕数据资产价值评估模型、价值区间与定价策略梳理数据来源、业务责任、使用范围和可资产化条件。\n02 现状盘点：核查数据资源质量、权属边界、授权关系和运营基础，形成资产底图。\n03 价值判断：结合业务价值、市场需求、成本投入和合规基础，判断资产价值表达方式。\n04 路径设计：设计登记、评估、入表、定价、融资或运营的实施路径和协同流程。\n05 材料准备：沉淀价值评估报告、定价模型、报价建议和交易支撑材料，支撑审计沟通、交易挂牌、融资对接或资产管理。\n06 持续管理：建立台账更新、价值复核、风险检查和运营跟踪机制，保障资产持续可管。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 资产视角贯穿全程：围绕数据资产价值评估模型、价值区间与定价策略开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 支撑入表交易融资：以价值评估报告、定价模型、报价建议和交易支撑材料为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 数据产品挂牌定价：面向数据产品挂牌定价，围绕数据资产价值评估模型、价值区间与定价策略开展现状梳理、方案设计和落地辅导，形成价值评估报告、定价模型、报价建议和交易支撑材料，支撑后续实施、审核或运营转化。\n02 经营数据资产估值：面向经营数据资产估值，围绕数据资产价值评估模型、价值区间与定价策略开展现状梳理、方案设计和落地辅导，形成价值评估报告、定价模型、报价建议和交易支撑材料，支撑后续实施、审核或运营转化。\n03 市场化交易报价测算：面向市场化交易报价测算，围绕数据资产价值评估模型、价值区间与定价策略开展现状梳理、方案设计和落地辅导，形成价值评估报告、定价模型、报价建议和交易支撑材料，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "按时长",
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "3000",
                            "durationUnit": "元/天",
                            "referencePrice": "3000元/天"
                    }
            },
            {
                    "id": "financial-statement",
                    "status": "listed",
                    "name": "企业数据资产财务入表咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据资产管理与价值评估咨询服务类",
                    "serviceType": "企业数据资产财务入表咨询服务",
                    "org": "数据提供方,数据需求方,评估服务商",
                    "business": "数据资产管理,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-19",
                    "version": "v1",
                    "cover": "images/consult-accounting.jpg",
                    "thumb": "images/consult-accounting.jpg",
                    "heroImg": "images/consult-accounting.jpg",
                    "tabTitle": "企业数据资产财务入表咨询服务",
                    "tabDesc": "可入表数据资源识别、入表路径与财务确认材料",
                    "badge": "资产管理",
                    "heroTitle": "企业数据资产财务入表咨询服务",
                    "heroSubtitle": "围绕可入表数据资源识别、入表路径与财务确认材料，提供资产管理方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦可入表数据资源识别、入表路径与财务确认材料，结合数据资产管理与价值评估咨询服务的实施要求，为客户形成入表可行性诊断、入表路径建议、审计沟通材料和管理台账，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "数据资产入表是企业数字化转型的重要里程碑。本服务辅导企业识别符合会计准则的可入表数据资源，设计数据资产入表路径，并协助准备相关材料。旨在帮助企业推进数据资产的财务确认工作，优化资产负债表，提升企业估值，实现数据资产的资本化运作，为企业带来新的利润增长点和融资机会。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 资产识别：围绕可入表数据资源识别、入表路径与财务确认材料梳理数据来源、业务责任、使用范围和可资产化条件。\n02 现状盘点：核查数据资源质量、权属边界、授权关系和运营基础，形成资产底图。\n03 价值判断：结合业务价值、市场需求、成本投入和合规基础，判断资产价值表达方式。\n04 路径设计：设计登记、评估、入表、定价、融资或运营的实施路径和协同流程。\n05 材料准备：沉淀入表可行性诊断、入表路径建议、审计沟通材料和管理台账，支撑审计沟通、交易挂牌、融资对接或资产管理。\n06 持续管理：建立台账更新、价值复核、风险检查和运营跟踪机制，保障资产持续可管。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 资产视角贯穿全程：围绕可入表数据资源识别、入表路径与财务确认材料开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 支撑入表交易融资：以入表可行性诊断、入表路径建议、审计沟通材料和管理台账为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 制造企业数据资产入表：面向制造企业数据资产入表，围绕可入表数据资源识别、入表路径与财务确认材料开展现状梳理、方案设计和落地辅导，形成入表可行性诊断、入表路径建议、审计沟通材料和管理台账，支撑后续实施、审核或运营转化。\n02 科技企业数据资源确认：面向科技企业数据资源确认，围绕可入表数据资源识别、入表路径与财务确认材料开展现状梳理、方案设计和落地辅导，形成入表可行性诊断、入表路径建议、审计沟通材料和管理台账，支撑后续实施、审核或运营转化。\n03 集团财务入表材料准备：面向集团财务入表材料准备，围绕可入表数据资源识别、入表路径与财务确认材料开展现状梳理、方案设计和落地辅导，形成入表可行性诊断、入表路径建议、审计沟通材料和管理台账，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "按时长",
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "3000",
                            "durationUnit": "元/天",
                            "referencePrice": "3000元/天"
                    }
            },
            {
                    "id": "capital-financing",
                    "status": "listed",
                    "name": "数据资产资本化与融资咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据资产管理与价值评估咨询服务类",
                    "serviceType": "数据资产资本化与融资咨询服务",
                    "org": "数据提供方,数据需求方,评估服务商",
                    "business": "数据资产管理,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-20",
                    "version": "v1",
                    "cover": "images/consult-accounting.jpg",
                    "thumb": "images/consult-accounting.jpg",
                    "heroImg": "images/consult-accounting.jpg",
                    "tabTitle": "数据资产资本化与融资咨询服务",
                    "tabDesc": "数据资产质押、增信、证券化与金融机构对接",
                    "badge": "资产管理",
                    "heroTitle": "数据资产资本化与融资咨询服务",
                    "heroSubtitle": "围绕数据资产质押、增信、证券化与金融机构对接，提供资产管理方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦数据资产质押、增信、证券化与金融机构对接，结合数据资产管理与价值评估咨询服务的实施要求，为客户形成融资诊断报告、资本化路径方案、增信材料清单和沟通材料，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "为激活数据资产的金融属性，本服务面向具备基础数据资产的企业，设计多元化的资本化路径，包括数据资产质押、增信及证券化方案。我们将协助客户对接金融机构，提供专业的融资方案设计与辅导，旨在帮助客户拓宽融资渠道，提升数据资产的金融价值与资本运作能力，为企业发展注入新的资本动能，实现数据价值最大化。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 资产识别：围绕数据资产质押、增信、证券化与金融机构对接梳理数据来源、业务责任、使用范围和可资产化条件。\n02 现状盘点：核查数据资源质量、权属边界、授权关系和运营基础，形成资产底图。\n03 价值判断：结合业务价值、市场需求、成本投入和合规基础，判断资产价值表达方式。\n04 路径设计：设计登记、评估、入表、定价、融资或运营的实施路径和协同流程。\n05 材料准备：沉淀融资诊断报告、资本化路径方案、增信材料清单和沟通材料，支撑审计沟通、交易挂牌、融资对接或资产管理。\n06 持续管理：建立台账更新、价值复核、风险检查和运营跟踪机制，保障资产持续可管。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 资产视角贯穿全程：围绕数据资产质押、增信、证券化与金融机构对接开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 支撑入表交易融资：以融资诊断报告、资本化路径方案、增信材料清单和沟通材料为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 企业数据资产质押融资：面向企业数据资产质押融资，围绕数据资产质押、增信、证券化与金融机构对接开展现状梳理、方案设计和落地辅导，形成融资诊断报告、资本化路径方案、增信材料清单和沟通材料，支撑后续实施、审核或运营转化。\n02 数据资产增信方案设计：面向数据资产增信方案设计，围绕数据资产质押、增信、证券化与金融机构对接开展现状梳理、方案设计和落地辅导，形成融资诊断报告、资本化路径方案、增信材料清单和沟通材料，支撑后续实施、审核或运营转化。\n03 金融机构尽调材料准备：面向金融机构尽调材料准备，围绕数据资产质押、增信、证券化与金融机构对接开展现状梳理、方案设计和落地辅导，形成融资诊断报告、资本化路径方案、增信材料清单和沟通材料，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "按时长",
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "3000",
                            "durationUnit": "元/天",
                            "referencePrice": "3000元/天"
                    }
            },
            {
                    "id": "public-asset-management",
                    "status": "listed",
                    "name": "行政事业单位数据资产专项管理咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据资产管理与价值评估咨询服务类",
                    "serviceType": "行政事业单位数据资产专项管理咨询服务",
                    "org": "数据提供方,数据需求方,评估服务商",
                    "business": "数据资产管理,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-21",
                    "version": "v1",
                    "cover": "images/consult-accounting.jpg",
                    "thumb": "images/consult-accounting.jpg",
                    "heroImg": "images/consult-accounting.jpg",
                    "tabTitle": "行政事业单位数据资产专项管理咨询服务",
                    "tabDesc": "公共部门数据资源摸底、登记管理与全过程管理设计",
                    "badge": "资产管理",
                    "heroTitle": "行政事业单位数据资产专项管理咨询服务",
                    "heroSubtitle": "围绕公共部门数据资源摸底、登记管理与全过程管理设计，提供资产管理方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦公共部门数据资源摸底、登记管理与全过程管理设计，结合数据资产管理与价值评估咨询服务的实施要求，为客户形成公共数据资源台账、专项管理制度、评估指标和应用建议，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "行政事业单位的数据资产管理具有特殊性。本服务针对公共部门的特点和要求，提供从数据资源摸底、治理、登记、管理、评估到应用的规范化全过程管理设计。旨在帮助公共部门规范推进数据资产工作，提升数据管理水平，促进公共数据资源的有效利用与价值释放，支撑政府数字化转型和公共服务优化。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 资产识别：围绕公共部门数据资源摸底、登记管理与全过程管理设计梳理数据来源、业务责任、使用范围和可资产化条件。\n02 现状盘点：核查数据资源质量、权属边界、授权关系和运营基础，形成资产底图。\n03 价值判断：结合业务价值、市场需求、成本投入和合规基础，判断资产价值表达方式。\n04 路径设计：设计登记、评估、入表、定价、融资或运营的实施路径和协同流程。\n05 材料准备：沉淀公共数据资源台账、专项管理制度、评估指标和应用建议，支撑审计沟通、交易挂牌、融资对接或资产管理。\n06 持续管理：建立台账更新、价值复核、风险检查和运营跟踪机制，保障资产持续可管。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 资产视角贯穿全程：围绕公共部门数据资源摸底、登记管理与全过程管理设计开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 支撑入表交易融资：以公共数据资源台账、专项管理制度、评估指标和应用建议为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 行政事业单位资产登记：面向行政事业单位资产登记，围绕公共部门数据资源摸底、登记管理与全过程管理设计开展现状梳理、方案设计和落地辅导，形成公共数据资源台账、专项管理制度、评估指标和应用建议，支撑后续实施、审核或运营转化。\n02 公共数据资源专项管理：面向公共数据资源专项管理，围绕公共部门数据资源摸底、登记管理与全过程管理设计开展现状梳理、方案设计和落地辅导，形成公共数据资源台账、专项管理制度、评估指标和应用建议，支撑后续实施、审核或运营转化。\n03 国企公共服务数据管理：面向国企公共服务数据管理，围绕公共部门数据资源摸底、登记管理与全过程管理设计开展现状梳理、方案设计和落地辅导，形成公共数据资源台账、专项管理制度、评估指标和应用建议，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "按时长",
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "3000",
                            "durationUnit": "元/天",
                            "referencePrice": "3000元/天"
                    }
            },
            {
                    "id": "public-authorization",
                    "status": "listed",
                    "name": "公共数据授权运营总体方案设计咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据合规运营与流通交易咨询服务类",
                    "serviceType": "公共数据授权运营总体方案设计咨询服务",
                    "org": "数据提供方,数据需求方,法律服务商",
                    "business": "合规审查,数据交易",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-22",
                    "version": "v1",
                    "cover": "images/consult-government.jpg",
                    "thumb": "images/consult-government.jpg",
                    "heroImg": "images/consult-government.jpg",
                    "tabTitle": "公共数据授权运营总体方案设计咨询服务",
                    "tabDesc": "公共数据授权运营模式、机制、范围、主体与流程设计",
                    "badge": "合规流通",
                    "heroTitle": "公共数据授权运营总体方案设计咨询服务",
                    "heroSubtitle": "围绕公共数据授权运营模式、机制、范围、主体与流程设计，提供合规流通方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦公共数据授权运营模式、机制、范围、主体与流程设计，结合数据合规运营与流通交易咨询服务的实施要求，为客户形成授权运营总体方案、权责清单、流程规范和监管机制，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "为推动公共数据价值释放，本服务围绕公共数据授权运营的模式、机制、范围、主体及流程，提供全面的总体方案设计。我们将协助客户构建可持续的授权运营体系，明确各方权责，确保公共数据在安全可控的前提下向社会开放与应用，促进数据要素市场健康发展，实现公共数据资源的社会效益与经济效益双丰收。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 场景梳理：围绕公共数据授权运营模式、机制、范围、主体与流程设计梳理数据流向、参与主体、使用目的和交付边界。\n02 合规审查：依据法律法规、行业标准和平台规则，对关键环节进行合规性评估。\n03 风险识别：识别授权、隐私、安全、交易、出域或运营过程中的制度与管理风险。\n04 方案设计：设计可执行的流程、规则、审计留痕和风险控制措施。\n05 落地辅导：形成授权运营总体方案、权责清单、流程规范和监管机制，辅导客户完成内部评审、平台审核或合作对接。\n06 监测复盘：结合运营数据、交易反馈和审计结果，持续优化合规控制与服务流程。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 合规审查与运营结合：围绕公共数据授权运营模式、机制、范围、主体与流程设计开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 风险控制可追溯：以授权运营总体方案、权责清单、流程规范和监管机制为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 区级公共数据授权运营：面向区级公共数据授权运营，围绕公共数据授权运营模式、机制、范围、主体与流程设计开展现状梳理、方案设计和落地辅导，形成授权运营总体方案、权责清单、流程规范和监管机制，支撑后续实施、审核或运营转化。\n02 公共数据开放应用机制设计：面向公共数据开放应用机制设计，围绕公共数据授权运营模式、机制、范围、主体与流程设计开展现状梳理、方案设计和落地辅导，形成授权运营总体方案、权责清单、流程规范和监管机制，支撑后续实施、审核或运营转化。\n03 多主体授权运营协同：面向多主体授权运营协同，围绕公共数据授权运营模式、机制、范围、主体与流程设计开展现状梳理、方案设计和落地辅导，形成授权运营总体方案、权责清单、流程规范和监管机制，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "transaction-compliance",
                    "status": "listed",
                    "name": "数据流通与交易合规性评估咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据合规运营与流通交易咨询服务类",
                    "serviceType": "数据流通与交易合规性评估咨询服务",
                    "org": "数据提供方,数据需求方,法律服务商",
                    "business": "合规审查,数据交易",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-23",
                    "version": "v1",
                    "cover": "images/consult-government.jpg",
                    "thumb": "images/consult-government.jpg",
                    "heroImg": "images/consult-government.jpg",
                    "tabTitle": "数据流通与交易合规性评估咨询服务",
                    "tabDesc": "采集、存储、共享、开放、授权及交易全链路合规审查",
                    "badge": "合规流通",
                    "heroTitle": "数据流通与交易合规性评估咨询服务",
                    "heroSubtitle": "围绕采集、存储、共享、开放、授权及交易全链路合规审查，提供合规流通方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦采集、存储、共享、开放、授权及交易全链路合规审查，结合数据合规运营与流通交易咨询服务的实施要求，为客户形成合规评估报告、风险清单、整改建议和交易审核材料，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "数据流通与交易的合规性至关重要。本服务对数据采集、存储、共享、开放、授权及交易等全生命周期环节进行严格的合规审查。我们将依据最新的法律法规和行业标准，识别潜在的法律、制度及管理风险点，并提供专业的风险规避建议，旨在帮助客户确保数据流通过程的合法合规，规避潜在的法律风险与声誉损失，保障业务的稳健运行。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 场景梳理：围绕采集、存储、共享、开放、授权及交易全链路合规审查梳理数据流向、参与主体、使用目的和交付边界。\n02 合规审查：依据法律法规、行业标准和平台规则，对关键环节进行合规性评估。\n03 风险识别：识别授权、隐私、安全、交易、出域或运营过程中的制度与管理风险。\n04 方案设计：设计可执行的流程、规则、审计留痕和风险控制措施。\n05 落地辅导：形成合规评估报告、风险清单、整改建议和交易审核材料，辅导客户完成内部评审、平台审核或合作对接。\n06 监测复盘：结合运营数据、交易反馈和审计结果，持续优化合规控制与服务流程。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 合规审查与运营结合：围绕采集、存储、共享、开放、授权及交易全链路合规审查开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 风险控制可追溯：以合规评估报告、风险清单、整改建议和交易审核材料为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 数据产品交易前合规评估：面向数据产品交易前合规评估，围绕采集、存储、共享、开放、授权及交易全链路合规审查开展现状梳理、方案设计和落地辅导，形成合规评估报告、风险清单、整改建议和交易审核材料，支撑后续实施、审核或运营转化。\n02 跨主体数据共享审查：面向跨主体数据共享审查，围绕采集、存储、共享、开放、授权及交易全链路合规审查开展现状梳理、方案设计和落地辅导，形成合规评估报告、风险清单、整改建议和交易审核材料，支撑后续实施、审核或运营转化。\n03 平台数据流通规则复核：面向平台数据流通规则复核，围绕采集、存储、共享、开放、授权及交易全链路合规审查开展现状梳理、方案设计和落地辅导，形成合规评估报告、风险清单、整改建议和交易审核材料，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "security-protection",
                    "status": "listed",
                    "name": "数据安全防护体系建设咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据合规运营与流通交易咨询服务类",
                    "serviceType": "数据安全防护体系建设咨询服务",
                    "org": "数据提供方,数据需求方,法律服务商",
                    "business": "合规审查,数据交易",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-24",
                    "version": "v1",
                    "cover": "images/consult-government.jpg",
                    "thumb": "images/consult-government.jpg",
                    "heroImg": "images/consult-government.jpg",
                    "tabTitle": "数据安全防护体系建设咨询服务",
                    "tabDesc": "制度、技术、权限、审计及应急处置安全防护框架",
                    "badge": "合规流通",
                    "heroTitle": "数据安全防护体系建设咨询服务",
                    "heroSubtitle": "围绕制度、技术、权限、审计及应急处置安全防护框架，提供合规流通方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦制度、技术、权限、审计及应急处置安全防护框架，结合数据合规运营与流通交易咨询服务的实施要求，为客户形成数据安全体系方案、权限审计规则、应急预案和整改清单，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "面对日益严峻的网络安全挑战，本服务围绕数据全生命周期安全，为客户提供涵盖制度、技术、权限、审计及应急处置的整体安全防护框架设计。我们将协助客户建立完善的数据安全管理体系，运用先进的安全技术，旨在帮助客户全面提升数据安全防护能力，有效抵御各类安全威胁，确保数据资产的完整性、保密性与可用性，为业务发展保驾护航。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 场景梳理：围绕制度、技术、权限、审计及应急处置安全防护框架梳理数据流向、参与主体、使用目的和交付边界。\n02 合规审查：依据法律法规、行业标准和平台规则，对关键环节进行合规性评估。\n03 风险识别：识别授权、隐私、安全、交易、出域或运营过程中的制度与管理风险。\n04 方案设计：设计可执行的流程、规则、审计留痕和风险控制措施。\n05 落地辅导：形成数据安全体系方案、权限审计规则、应急预案和整改清单，辅导客户完成内部评审、平台审核或合作对接。\n06 监测复盘：结合运营数据、交易反馈和审计结果，持续优化合规控制与服务流程。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 合规审查与运营结合：围绕制度、技术、权限、审计及应急处置安全防护框架开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 风险控制可追溯：以数据安全体系方案、权限审计规则、应急预案和整改清单为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 企业数据安全体系建设：面向企业数据安全体系建设，围绕制度、技术、权限、审计及应急处置安全防护框架开展现状梳理、方案设计和落地辅导，形成数据安全体系方案、权限审计规则、应急预案和整改清单，支撑后续实施、审核或运营转化。\n02 平台权限审计机制优化：面向平台权限审计机制优化，围绕制度、技术、权限、审计及应急处置安全防护框架开展现状梳理、方案设计和落地辅导，形成数据安全体系方案、权限审计规则、应急预案和整改清单，支撑后续实施、审核或运营转化。\n03 关键数据防护能力提升：面向关键数据防护能力提升，围绕制度、技术、权限、审计及应急处置安全防护框架开展现状梳理、方案设计和落地辅导，形成数据安全体系方案、权限审计规则、应急预案和整改清单，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "desensitization-outbound",
                    "status": "listed",
                    "name": "数据脱敏、匿名化与出域合规咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据合规运营与流通交易咨询服务类",
                    "serviceType": "数据脱敏、匿名化与出域合规咨询服务",
                    "org": "数据提供方,数据需求方,法律服务商",
                    "business": "合规审查,数据交易",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-25",
                    "version": "v1",
                    "cover": "images/consult-government.jpg",
                    "thumb": "images/consult-government.jpg",
                    "heroImg": "images/consult-government.jpg",
                    "tabTitle": "数据脱敏、匿名化与出域合规咨询服务",
                    "tabDesc": "敏感信息脱敏、匿名化处理与数据出域合规控制",
                    "badge": "合规流通",
                    "heroTitle": "数据脱敏、匿名化与出域合规咨询服务",
                    "heroSubtitle": "围绕敏感信息脱敏、匿名化处理与数据出域合规控制，提供合规流通方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦敏感信息脱敏、匿名化处理与数据出域合规控制，结合数据合规运营与流通交易咨询服务的实施要求，为客户形成脱敏规则方案、匿名化处理建议、出域审批流程和控制清单，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "为平衡数据利用与隐私保护，本服务针对敏感信息、个人信息及可识别信息，提供专业的脱敏与匿名化处理方案。同时，设计数据出域的合规条件、审批流程及控制要求，旨在帮助客户在确保数据安全与隐私保护的前提下，实现数据安全有序的跨域流转与共享。这不仅满足合规要求，也为数据创新应用提供了可能。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 场景梳理：围绕敏感信息脱敏、匿名化处理与数据出域合规控制梳理数据流向、参与主体、使用目的和交付边界。\n02 合规审查：依据法律法规、行业标准和平台规则，对关键环节进行合规性评估。\n03 风险识别：识别授权、隐私、安全、交易、出域或运营过程中的制度与管理风险。\n04 方案设计：设计可执行的流程、规则、审计留痕和风险控制措施。\n05 落地辅导：形成脱敏规则方案、匿名化处理建议、出域审批流程和控制清单，辅导客户完成内部评审、平台审核或合作对接。\n06 监测复盘：结合运营数据、交易反馈和审计结果，持续优化合规控制与服务流程。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 合规审查与运营结合：围绕敏感信息脱敏、匿名化处理与数据出域合规控制开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 风险控制可追溯：以脱敏规则方案、匿名化处理建议、出域审批流程和控制清单为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 个人信息脱敏方案设计：面向个人信息脱敏方案设计，围绕敏感信息脱敏、匿名化处理与数据出域合规控制开展现状梳理、方案设计和落地辅导，形成脱敏规则方案、匿名化处理建议、出域审批流程和控制清单，支撑后续实施、审核或运营转化。\n02 跨区域数据出域审批：面向跨区域数据出域审批，围绕敏感信息脱敏、匿名化处理与数据出域合规控制开展现状梳理、方案设计和落地辅导，形成脱敏规则方案、匿名化处理建议、出域审批流程和控制清单，支撑后续实施、审核或运营转化。\n03 数据共享隐私保护评估：面向数据共享隐私保护评估，围绕敏感信息脱敏、匿名化处理与数据出域合规控制开展现状梳理、方案设计和落地辅导，形成脱敏规则方案、匿名化处理建议、出域审批流程和控制清单，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "scenario-matching",
                    "status": "listed",
                    "name": "公共数据场景策划与供需撮合咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据合规运营与流通交易咨询服务类",
                    "serviceType": "公共数据场景策划与供需撮合咨询服务",
                    "org": "数据提供方,数据需求方,法律服务商",
                    "business": "合规审查,数据交易",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-26",
                    "version": "v1",
                    "cover": "images/consult-government.jpg",
                    "thumb": "images/consult-government.jpg",
                    "heroImg": "images/consult-government.jpg",
                    "tabTitle": "公共数据场景策划与供需撮合咨询服务",
                    "tabDesc": "公共数据高价值应用场景策划与供需撮合",
                    "badge": "合规流通",
                    "heroTitle": "公共数据场景策划与供需撮合咨询服务",
                    "heroSubtitle": "围绕公共数据高价值应用场景策划与供需撮合，提供合规流通方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦公共数据高价值应用场景策划与供需撮合，结合数据合规运营与流通交易咨询服务的实施要求，为客户形成场景清单、供需匹配表、合作路径和场景落地建议，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "为激活公共数据价值，本服务深入挖掘治理、民生、产业及服务需求，策划适合公共数据授权运营的高价值应用场景。我们将连接数据供给方、需求方及开发方，推动公共数据资源与业务场景的精准对接，旨在帮助客户更快形成合作机会，加速数据价值变现，促进数据要素在各行各业的深度融合与创新应用。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 场景梳理：围绕公共数据高价值应用场景策划与供需撮合梳理数据流向、参与主体、使用目的和交付边界。\n02 合规审查：依据法律法规、行业标准和平台规则，对关键环节进行合规性评估。\n03 风险识别：识别授权、隐私、安全、交易、出域或运营过程中的制度与管理风险。\n04 方案设计：设计可执行的流程、规则、审计留痕和风险控制措施。\n05 落地辅导：形成场景清单、供需匹配表、合作路径和场景落地建议，辅导客户完成内部评审、平台审核或合作对接。\n06 监测复盘：结合运营数据、交易反馈和审计结果，持续优化合规控制与服务流程。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 合规审查与运营结合：围绕公共数据高价值应用场景策划与供需撮合开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 风险控制可追溯：以场景清单、供需匹配表、合作路径和场景落地建议为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 公共数据应用场景征集：面向公共数据应用场景征集，围绕公共数据高价值应用场景策划与供需撮合开展现状梳理、方案设计和落地辅导，形成场景清单、供需匹配表、合作路径和场景落地建议，支撑后续实施、审核或运营转化。\n02 产业数据供需撮合：面向产业数据供需撮合，围绕公共数据高价值应用场景策划与供需撮合开展现状梳理、方案设计和落地辅导，形成场景清单、供需匹配表、合作路径和场景落地建议，支撑后续实施、审核或运营转化。\n03 治理服务场景共创：面向治理服务场景共创，围绕公共数据高价值应用场景策划与供需撮合开展现状梳理、方案设计和落地辅导，形成场景清单、供需匹配表、合作路径和场景落地建议，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "product-incubation-listing",
                    "status": "listed",
                    "name": "数据产品孵化、包装与挂牌辅导咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据合规运营与流通交易咨询服务类",
                    "serviceType": "数据产品孵化、包装与挂牌辅导咨询服务",
                    "org": "数据提供方,数据需求方,法律服务商",
                    "business": "合规审查,数据交易",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-27",
                    "version": "v1",
                    "cover": "images/consult-government.jpg",
                    "thumb": "images/consult-government.jpg",
                    "heroImg": "images/consult-government.jpg",
                    "tabTitle": "数据产品孵化、包装与挂牌辅导咨询服务",
                    "tabDesc": "数据产品构思、标准化设计、市场化包装与挂牌辅导",
                    "badge": "合规流通",
                    "heroTitle": "数据产品孵化、包装与挂牌辅导咨询服务",
                    "heroSubtitle": "围绕数据产品构思、标准化设计、市场化包装与挂牌辅导，提供合规流通方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦数据产品构思、标准化设计、市场化包装与挂牌辅导，结合数据合规运营与流通交易咨询服务的实施要求，为客户形成产品说明书、上架材料、交付规则、合规材料和运营建议，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "本服务提供从数据资源转化为可上架、可交付、可服务的数据产品的全流程支持。包括产品构思、标准化设计、市场化包装及交易平台挂牌辅导，旨在帮助客户将原始数据转化为具有市场竞争力的数据产品，提升数据产品的市场吸引力与交易效率，加速数据价值的商业化落地，拓展新的营收增长点。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 场景梳理：围绕数据产品构思、标准化设计、市场化包装与挂牌辅导梳理数据流向、参与主体、使用目的和交付边界。\n02 合规审查：依据法律法规、行业标准和平台规则，对关键环节进行合规性评估。\n03 风险识别：识别授权、隐私、安全、交易、出域或运营过程中的制度与管理风险。\n04 方案设计：设计可执行的流程、规则、审计留痕和风险控制措施。\n05 落地辅导：形成产品说明书、上架材料、交付规则、合规材料和运营建议，辅导客户完成内部评审、平台审核或合作对接。\n06 监测复盘：结合运营数据、交易反馈和审计结果，持续优化合规控制与服务流程。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 合规审查与运营结合：围绕数据产品构思、标准化设计、市场化包装与挂牌辅导开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 风险控制可追溯：以产品说明书、上架材料、交付规则、合规材料和运营建议为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 企业数据产品挂牌：面向企业数据产品挂牌，围绕数据产品构思、标准化设计、市场化包装与挂牌辅导开展现状梳理、方案设计和落地辅导，形成产品说明书、上架材料、交付规则、合规材料和运营建议，支撑后续实施、审核或运营转化。\n02 数据服务包装升级：面向数据服务包装升级，围绕数据产品构思、标准化设计、市场化包装与挂牌辅导开展现状梳理、方案设计和落地辅导，形成产品说明书、上架材料、交付规则、合规材料和运营建议，支撑后续实施、审核或运营转化。\n03 交易平台上架材料准备：面向交易平台上架材料准备，围绕数据产品构思、标准化设计、市场化包装与挂牌辅导开展现状梳理、方案设计和落地辅导，形成产品说明书、上架材料、交付规则、合规材料和运营建议，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "transaction-operation",
                    "status": "listed",
                    "name": "数据交易运营与跨平台流通设计咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据合规运营与流通交易咨询服务类",
                    "serviceType": "数据交易运营与跨平台流通设计咨询服务",
                    "org": "数据提供方,数据需求方,法律服务商",
                    "business": "合规审查,数据交易",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-18",
                    "version": "v1",
                    "cover": "images/consult-government.jpg",
                    "thumb": "images/consult-government.jpg",
                    "heroImg": "images/consult-government.jpg",
                    "tabTitle": "数据交易运营与跨平台流通设计咨询服务",
                    "tabDesc": "交易后客户、订单、服务、结算管理与跨平台流通设计",
                    "badge": "合规流通",
                    "heroTitle": "数据交易运营与跨平台流通设计咨询服务",
                    "heroSubtitle": "围绕交易后客户、订单、服务、结算管理与跨平台流通设计，提供合规流通方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦交易后客户、订单、服务、结算管理与跨平台流通设计，结合数据合规运营与流通交易咨询服务的实施要求，为客户形成交易运营机制、跨平台流转方案、结算规则和服务支撑流程，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "为提升数据交易效率与持续经营能力，本服务设计数据交易后的客户管理、订单管理、服务支撑及结算管理机制。同时，提供多平台、多主体之间的数据协同与流转设计，旨在帮助客户实现数据的高效互通与价值共享，构建开放、繁荣的数据流通生态，促进数据要素在更大范围内的优化配置。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 场景梳理：围绕交易后客户、订单、服务、结算管理与跨平台流通设计梳理数据流向、参与主体、使用目的和交付边界。\n02 合规审查：依据法律法规、行业标准和平台规则，对关键环节进行合规性评估。\n03 风险识别：识别授权、隐私、安全、交易、出域或运营过程中的制度与管理风险。\n04 方案设计：设计可执行的流程、规则、审计留痕和风险控制措施。\n05 落地辅导：形成交易运营机制、跨平台流转方案、结算规则和服务支撑流程，辅导客户完成内部评审、平台审核或合作对接。\n06 监测复盘：结合运营数据、交易反馈和审计结果，持续优化合规控制与服务流程。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 合规审查与运营结合：围绕交易后客户、订单、服务、结算管理与跨平台流通设计开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 风险控制可追溯：以交易运营机制、跨平台流转方案、结算规则和服务支撑流程为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 数据交易运营机制设计：面向数据交易运营机制设计，围绕交易后客户、订单、服务、结算管理与跨平台流通设计开展现状梳理、方案设计和落地辅导，形成交易运营机制、跨平台流转方案、结算规则和服务支撑流程，支撑后续实施、审核或运营转化。\n02 多平台数据流通协同：面向多平台数据流通协同，围绕交易后客户、订单、服务、结算管理与跨平台流通设计开展现状梳理、方案设计和落地辅导，形成交易运营机制、跨平台流转方案、结算规则和服务支撑流程，支撑后续实施、审核或运营转化。\n03 交易后服务支撑优化：面向交易后服务支撑优化，围绕交易后客户、订单、服务、结算管理与跨平台流通设计开展现状梳理、方案设计和落地辅导，形成交易运营机制、跨平台流转方案、结算规则和服务支撑流程，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "privacy-compliance",
                    "status": "listed",
                    "name": "个人信息保护与隐私合规咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "数据合规运营与流通交易咨询服务类",
                    "serviceType": "个人信息保护与隐私合规咨询服务",
                    "org": "数据提供方,数据需求方,法律服务商",
                    "business": "合规审查,数据交易",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-19",
                    "version": "v1",
                    "cover": "images/consult-government.jpg",
                    "thumb": "images/consult-government.jpg",
                    "heroImg": "images/consult-government.jpg",
                    "tabTitle": "个人信息保护与隐私合规咨询服务",
                    "tabDesc": "个人信息采集、使用、保存、共享及删除全环节保护机制",
                    "badge": "合规流通",
                    "heroTitle": "个人信息保护与隐私合规咨询服务",
                    "heroSubtitle": "围绕个人信息采集、使用、保存、共享及删除全环节保护机制，提供合规流通方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦个人信息采集、使用、保存、共享及删除全环节保护机制，结合数据合规运营与流通交易咨询服务的实施要求，为客户形成隐私合规评估、个人信息处理规则、告知授权文本和整改建议，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "在数据驱动的时代，个人信息保护至关重要。本服务围绕个人信息的采集、使用、保存、共享及删除等环节，提供全面的保护机制设计。我们将协助客户建立健全的隐私保护与合规管理体系，提升对个人信息的保护水平，确保业务运营符合《个人信息保护法》等相关法律法规要求，增强企业社会责任感与用户信任度。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 场景梳理：围绕个人信息采集、使用、保存、共享及删除全环节保护机制梳理数据流向、参与主体、使用目的和交付边界。\n02 合规审查：依据法律法规、行业标准和平台规则，对关键环节进行合规性评估。\n03 风险识别：识别授权、隐私、安全、交易、出域或运营过程中的制度与管理风险。\n04 方案设计：设计可执行的流程、规则、审计留痕和风险控制措施。\n05 落地辅导：形成隐私合规评估、个人信息处理规则、告知授权文本和整改建议，辅导客户完成内部评审、平台审核或合作对接。\n06 监测复盘：结合运营数据、交易反馈和审计结果，持续优化合规控制与服务流程。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 合规审查与运营结合：围绕个人信息采集、使用、保存、共享及删除全环节保护机制开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 风险控制可追溯：以隐私合规评估、个人信息处理规则、告知授权文本和整改建议为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 平台个人信息保护评估：面向平台个人信息保护评估，围绕个人信息采集、使用、保存、共享及删除全环节保护机制开展现状梳理、方案设计和落地辅导，形成隐私合规评估、个人信息处理规则、告知授权文本和整改建议，支撑后续实施、审核或运营转化。\n02 会员数据合规管理：面向会员数据合规管理，围绕个人信息采集、使用、保存、共享及删除全环节保护机制开展现状梳理、方案设计和落地辅导，形成隐私合规评估、个人信息处理规则、告知授权文本和整改建议，支撑后续实施、审核或运营转化。\n03 隐私授权流程优化：面向隐私授权流程优化，围绕个人信息采集、使用、保存、共享及删除全环节保护机制开展现状梳理、方案设计和落地辅导，形成隐私合规评估、个人信息处理规则、告知授权文本和整改建议，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "city-brain",
                    "status": "listed",
                    "name": "政务治理与城市大脑应用方案咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "行业场景化AI数据服务咨询服务类",
                    "serviceType": "政务治理与城市大脑应用方案咨询服务",
                    "org": "数据提供方,数据需求方,技术服务商",
                    "business": "AI应用,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-20",
                    "version": "v1",
                    "cover": "images/hero-ai-longgang.jpg",
                    "thumb": "images/hero-ai-longgang.jpg",
                    "heroImg": "images/hero-ai-longgang.jpg",
                    "tabTitle": "政务治理与城市大脑应用方案咨询服务",
                    "tabDesc": "城市运行监测、基层治理、政务服务及应急管理应用方案",
                    "badge": "AI数据服务",
                    "heroTitle": "政务治理与城市大脑应用方案咨询服务",
                    "heroSubtitle": "围绕城市运行监测、基层治理、政务服务及应急管理应用方案，提供AI数据服务方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦城市运行监测、基层治理、政务服务及应急管理应用方案，结合行业场景化AI数据服务咨询服务的实施要求，为客户形成城市大脑应用方案、指标体系、数据需求清单和实施路线，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "本服务围绕城市运行监测、基层治理、政务服务及应急管理等核心场景，提供数据驱动的精细化治理应用方案设计。我们将利用大数据、人工智能等技术，构建城市大脑，旨在帮助政府客户提升城市管理效能，优化公共服务体验，实现城市运行的智能化决策与响应，推动智慧城市建设迈向新高度。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 场景共创：围绕城市运行监测、基层治理、政务服务及应急管理应用方案梳理业务痛点、数据基础、算法适配条件和应用目标。\n02 数据评估：评估数据覆盖范围、质量水平、标注基础、知识沉淀和合规边界。\n03 方案设计：设计数据应用、模型接入、知识库建设或智能体落地的总体方案。\n04 数据治理：明确采集、清洗、标注、检索、训练、调用和质量验收规则。\n05 验证试点：沉淀城市大脑应用方案、指标体系、数据需求清单和实施路线，支撑样板场景验证、效果评估和实施决策。\n06 迭代运营：根据模型效果、业务反馈和数据变化，持续优化场景适配与治理机制。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 场景与数据双适配：围绕城市运行监测、基层治理、政务服务及应急管理应用方案开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 模型落地可验证：以城市大脑应用方案、指标体系、数据需求清单和实施路线为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 城市运行监测驾驶舱：面向城市运行监测驾驶舱，围绕城市运行监测、基层治理、政务服务及应急管理应用方案开展现状梳理、方案设计和落地辅导，形成城市大脑应用方案、指标体系、数据需求清单和实施路线，支撑后续实施、审核或运营转化。\n02 基层治理智能分析：面向基层治理智能分析，围绕城市运行监测、基层治理、政务服务及应急管理应用方案开展现状梳理、方案设计和落地辅导，形成城市大脑应用方案、指标体系、数据需求清单和实施路线，支撑后续实施、审核或运营转化。\n03 应急管理辅助决策：面向应急管理辅助决策，围绕城市运行监测、基层治理、政务服务及应急管理应用方案开展现状梳理、方案设计和落地辅导，形成城市大脑应用方案、指标体系、数据需求清单和实施路线，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "low-altitude-logistics",
                    "status": "listed",
                    "name": "低空经济与交通物流专项咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "行业场景化AI数据服务咨询服务类",
                    "serviceType": "低空经济与交通物流专项咨询服务",
                    "org": "数据提供方,数据需求方,技术服务商",
                    "business": "AI应用,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-21",
                    "version": "v1",
                    "cover": "images/hero-ai-longgang.jpg",
                    "thumb": "images/hero-ai-longgang.jpg",
                    "heroImg": "images/hero-ai-longgang.jpg",
                    "tabTitle": "低空经济与交通物流专项咨询服务",
                    "tabDesc": "低空飞行、空域管理、航线规划、交通组织与物流调度",
                    "badge": "AI数据服务",
                    "heroTitle": "低空经济与交通物流专项咨询服务",
                    "heroSubtitle": "围绕低空飞行、空域管理、航线规划、交通组织与物流调度，提供AI数据服务方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦低空飞行、空域管理、航线规划、交通组织与物流调度，结合行业场景化AI数据服务咨询服务的实施要求，为客户形成专项应用方案、数据指标清单、调度模型建议和监管协同流程，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "聚焦低空飞行服务、空域管理、航线规划及安全监管，以及交通组织、物流调度、仓配协同等垂直领域。本服务提供基于大数据与AI的专业解决方案，旨在帮助客户支撑低空经济产业发展与监管协同，提升交通物流的通行与配送效率，优化资源配置，为新兴产业和传统物流业注入智能化动力。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 场景共创：围绕低空飞行、空域管理、航线规划、交通组织与物流调度梳理业务痛点、数据基础、算法适配条件和应用目标。\n02 数据评估：评估数据覆盖范围、质量水平、标注基础、知识沉淀和合规边界。\n03 方案设计：设计数据应用、模型接入、知识库建设或智能体落地的总体方案。\n04 数据治理：明确采集、清洗、标注、检索、训练、调用和质量验收规则。\n05 验证试点：沉淀专项应用方案、数据指标清单、调度模型建议和监管协同流程，支撑样板场景验证、效果评估和实施决策。\n06 迭代运营：根据模型效果、业务反馈和数据变化，持续优化场景适配与治理机制。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 场景与数据双适配：围绕低空飞行、空域管理、航线规划、交通组织与物流调度开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 模型落地可验证：以专项应用方案、数据指标清单、调度模型建议和监管协同流程为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 低空航线规划服务：面向低空航线规划服务，围绕低空飞行、空域管理、航线规划、交通组织与物流调度开展现状梳理、方案设计和落地辅导，形成专项应用方案、数据指标清单、调度模型建议和监管协同流程，支撑后续实施、审核或运营转化。\n02 城市物流调度优化：面向城市物流调度优化，围绕低空飞行、空域管理、航线规划、交通组织与物流调度开展现状梳理、方案设计和落地辅导，形成专项应用方案、数据指标清单、调度模型建议和监管协同流程，支撑后续实施、审核或运营转化。\n03 交通运行效率提升：面向交通运行效率提升，围绕低空飞行、空域管理、航线规划、交通组织与物流调度开展现状梳理、方案设计和落地辅导，形成专项应用方案、数据指标清单、调度模型建议和监管协同流程，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "finance-medical-education",
                    "status": "listed",
                    "name": "金融、医疗与教育行业数据应用咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "行业场景化AI数据服务咨询服务类",
                    "serviceType": "金融、医疗与教育行业数据应用咨询服务",
                    "org": "数据提供方,数据需求方,技术服务商",
                    "business": "AI应用,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-22",
                    "version": "v1",
                    "cover": "images/hero-ai-longgang.jpg",
                    "thumb": "images/hero-ai-longgang.jpg",
                    "heroImg": "images/hero-ai-longgang.jpg",
                    "tabTitle": "金融、医疗与教育行业数据应用咨询服务",
                    "tabDesc": "金融风控授信、医疗质量健康管理、教育教学成长分析",
                    "badge": "AI数据服务",
                    "heroTitle": "金融、医疗与教育行业数据应用咨询服务",
                    "heroSubtitle": "围绕金融风控授信、医疗质量健康管理、教育教学成长分析，提供AI数据服务方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦金融风控授信、医疗质量健康管理、教育教学成长分析，结合行业场景化AI数据服务咨询服务的实施要求，为客户形成行业数据应用方案、模型需求、指标体系和落地路线，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "本服务针对金融风控、授信、营销，医疗服务质量、健康管理，以及教育教学管理、学生成长等行业痛点，提供深度定制的数据应用设计。我们将结合行业特点，运用数据分析与AI模型，旨在帮助客户提升风控能力、优化经营效率、改善服务质量，实现行业智能化转型，创造更大的社会与经济价值。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 场景共创：围绕金融风控授信、医疗质量健康管理、教育教学成长分析梳理业务痛点、数据基础、算法适配条件和应用目标。\n02 数据评估：评估数据覆盖范围、质量水平、标注基础、知识沉淀和合规边界。\n03 方案设计：设计数据应用、模型接入、知识库建设或智能体落地的总体方案。\n04 数据治理：明确采集、清洗、标注、检索、训练、调用和质量验收规则。\n05 验证试点：沉淀行业数据应用方案、模型需求、指标体系和落地路线，支撑样板场景验证、效果评估和实施决策。\n06 迭代运营：根据模型效果、业务反馈和数据变化，持续优化场景适配与治理机制。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 场景与数据双适配：围绕金融风控授信、医疗质量健康管理、教育教学成长分析开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 模型落地可验证：以行业数据应用方案、模型需求、指标体系和落地路线为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 金融风险画像应用：面向金融风险画像应用，围绕金融风控授信、医疗质量健康管理、教育教学成长分析开展现状梳理、方案设计和落地辅导，形成行业数据应用方案、模型需求、指标体系和落地路线，支撑后续实施、审核或运营转化。\n02 医疗服务质量分析：面向医疗服务质量分析，围绕金融风控授信、医疗质量健康管理、教育教学成长分析开展现状梳理、方案设计和落地辅导，形成行业数据应用方案、模型需求、指标体系和落地路线，支撑后续实施、审核或运营转化。\n03 学生成长数据应用：面向学生成长数据应用，围绕金融风控授信、医疗质量健康管理、教育教学成长分析开展现状梳理、方案设计和落地辅导，形成行业数据应用方案、模型需求、指标体系和落地路线，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "manufacturing-agriculture",
                    "status": "listed",
                    "name": "工业制造与农贸流通数字化方案咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "行业场景化AI数据服务咨询服务类",
                    "serviceType": "工业制造与农贸流通数字化方案咨询服务",
                    "org": "数据提供方,数据需求方,技术服务商",
                    "business": "AI应用,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-23",
                    "version": "v1",
                    "cover": "images/hero-ai-longgang.jpg",
                    "thumb": "images/hero-ai-longgang.jpg",
                    "heroImg": "images/hero-ai-longgang.jpg",
                    "tabTitle": "工业制造与农贸流通数字化方案咨询服务",
                    "tabDesc": "生产排产、设备管理、质量控制、能耗优化与农贸流通分析",
                    "badge": "AI数据服务",
                    "heroTitle": "工业制造与农贸流通数字化方案咨询服务",
                    "heroSubtitle": "围绕生产排产、设备管理、质量控制、能耗优化与农贸流通分析，提供AI数据服务方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦生产排产、设备管理、质量控制、能耗优化与农贸流通分析，结合行业场景化AI数据服务咨询服务的实施要求，为客户形成数字化场景方案、数据采集清单、分析模型和运营指标，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "本服务围绕生产排产、设备管理、质量控制、能耗优化等工业制造核心环节，以及价格监测、交易分析、供应链管理等农贸流通关键领域。提供数据驱动的数字化解决方案，旨在帮助客户提升生产效率、降低运营成本，保障市场稳定，实现传统产业的智能化升级，增强市场竞争力。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 场景共创：围绕生产排产、设备管理、质量控制、能耗优化与农贸流通分析梳理业务痛点、数据基础、算法适配条件和应用目标。\n02 数据评估：评估数据覆盖范围、质量水平、标注基础、知识沉淀和合规边界。\n03 方案设计：设计数据应用、模型接入、知识库建设或智能体落地的总体方案。\n04 数据治理：明确采集、清洗、标注、检索、训练、调用和质量验收规则。\n05 验证试点：沉淀数字化场景方案、数据采集清单、分析模型和运营指标，支撑样板场景验证、效果评估和实施决策。\n06 迭代运营：根据模型效果、业务反馈和数据变化，持续优化场景适配与治理机制。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 场景与数据双适配：围绕生产排产、设备管理、质量控制、能耗优化与农贸流通分析开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 模型落地可验证：以数字化场景方案、数据采集清单、分析模型和运营指标为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 制造企业设备运维优化：面向制造企业设备运维优化，围绕生产排产、设备管理、质量控制、能耗优化与农贸流通分析开展现状梳理、方案设计和落地辅导，形成数字化场景方案、数据采集清单、分析模型和运营指标，支撑后续实施、审核或运营转化。\n02 农贸价格监测分析：面向农贸价格监测分析，围绕生产排产、设备管理、质量控制、能耗优化与农贸流通分析开展现状梳理、方案设计和落地辅导，形成数字化场景方案、数据采集清单、分析模型和运营指标，支撑后续实施、审核或运营转化。\n03 供应链协同管理：面向供应链协同管理，围绕生产排产、设备管理、质量控制、能耗优化与农贸流通分析开展现状梳理、方案设计和落地辅导，形成数字化场景方案、数据采集清单、分析模型和运营指标，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "training-corpus",
                    "status": "listed",
                    "name": "高质量AI训练与行业语料库建设咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "行业场景化AI数据服务咨询服务类",
                    "serviceType": "高质量AI训练与行业语料库建设咨询服务",
                    "org": "数据提供方,数据需求方,技术服务商",
                    "business": "AI应用,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-24",
                    "version": "v1",
                    "cover": "images/hero-ai-longgang.jpg",
                    "thumb": "images/hero-ai-longgang.jpg",
                    "heroImg": "images/hero-ai-longgang.jpg",
                    "tabTitle": "高质量AI训练与行业语料库建设咨询服务",
                    "tabDesc": "AI训练数据选题、采集、治理、标注、验收与行业语料库建设",
                    "badge": "AI数据服务",
                    "heroTitle": "高质量AI训练与行业语料库建设咨询服务",
                    "heroSubtitle": "围绕AI训练数据选题、采集、治理、标注、验收与行业语料库建设，提供AI数据服务方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦AI训练数据选题、采集、治理、标注、验收与行业语料库建设，结合行业场景化AI数据服务咨询服务的实施要求，为客户形成训练数据建设方案、标注规范、验收标准和语料库结构，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "为满足大模型、行业模型及智能体训练对高质量数据的需求，本服务提供全面的数据支撑。服务内容包括数据选题、采集、治理、标注及验收设计，并构建专业的行业语料库，旨在帮助客户沉淀可用于训练和检索的行业知识，奠定AI模型成功的基石，加速人工智能技术的研发与应用。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 场景共创：围绕AI训练数据选题、采集、治理、标注、验收与行业语料库建设梳理业务痛点、数据基础、算法适配条件和应用目标。\n02 数据评估：评估数据覆盖范围、质量水平、标注基础、知识沉淀和合规边界。\n03 方案设计：设计数据应用、模型接入、知识库建设或智能体落地的总体方案。\n04 数据治理：明确采集、清洗、标注、检索、训练、调用和质量验收规则。\n05 验证试点：沉淀训练数据建设方案、标注规范、验收标准和语料库结构，支撑样板场景验证、效果评估和实施决策。\n06 迭代运营：根据模型效果、业务反馈和数据变化，持续优化场景适配与治理机制。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 场景与数据双适配：围绕AI训练数据选题、采集、治理、标注、验收与行业语料库建设开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 模型落地可验证：以训练数据建设方案、标注规范、验收标准和语料库结构为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 行业模型训练数据建设：面向行业模型训练数据建设，围绕AI训练数据选题、采集、治理、标注、验收与行业语料库建设开展现状梳理、方案设计和落地辅导，形成训练数据建设方案、标注规范、验收标准和语料库结构，支撑后续实施、审核或运营转化。\n02 政务语料库沉淀：面向政务语料库沉淀，围绕AI训练数据选题、采集、治理、标注、验收与行业语料库建设开展现状梳理、方案设计和落地辅导，形成训练数据建设方案、标注规范、验收标准和语料库结构，支撑后续实施、审核或运营转化。\n03 智能客服知识数据治理：面向智能客服知识数据治理，围绕AI训练数据选题、采集、治理、标注、验收与行业语料库建设开展现状梳理、方案设计和落地辅导，形成训练数据建设方案、标注规范、验收标准和语料库结构，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "rag-agent",
                    "status": "listed",
                    "name": "RAG知识库与企业智能体建设咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "行业场景化AI数据服务咨询服务类",
                    "serviceType": "RAG知识库与企业智能体建设咨询服务",
                    "org": "数据提供方,数据需求方,技术服务商",
                    "business": "AI应用,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-25",
                    "version": "v1",
                    "cover": "images/hero-ai-longgang.jpg",
                    "thumb": "images/hero-ai-longgang.jpg",
                    "heroImg": "images/hero-ai-longgang.jpg",
                    "tabTitle": "RAG知识库与企业智能体建设咨询服务",
                    "tabDesc": "RAG知识库、可检索知识底座与企业智能体建设",
                    "badge": "AI数据服务",
                    "heroTitle": "RAG知识库与企业智能体建设咨询服务",
                    "heroSubtitle": "围绕RAG知识库、可检索知识底座与企业智能体建设，提供AI数据服务方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦RAG知识库、可检索知识底座与企业智能体建设，结合行业场景化AI数据服务咨询服务的实施要求，为客户形成知识库建设方案、知识治理规则、智能体场景设计和评估机制，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "面向检索增强生成（RAG）场景，本服务提供企业级知识库的构建支持。旨在帮助客户建立可检索、可更新、可调用的知识底座，并在此基础上开发企业智能体，提升知识管理效率与智能决策水平，赋能业务创新。通过智能体的应用，实现企业内部知识的快速检索与智能问答，提高工作效率。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 场景共创：围绕RAG知识库、可检索知识底座与企业智能体建设梳理业务痛点、数据基础、算法适配条件和应用目标。\n02 数据评估：评估数据覆盖范围、质量水平、标注基础、知识沉淀和合规边界。\n03 方案设计：设计数据应用、模型接入、知识库建设或智能体落地的总体方案。\n04 数据治理：明确采集、清洗、标注、检索、训练、调用和质量验收规则。\n05 验证试点：沉淀知识库建设方案、知识治理规则、智能体场景设计和评估机制，支撑样板场景验证、效果评估和实施决策。\n06 迭代运营：根据模型效果、业务反馈和数据变化，持续优化场景适配与治理机制。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 场景与数据双适配：围绕RAG知识库、可检索知识底座与企业智能体建设开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 模型落地可验证：以知识库建设方案、知识治理规则、智能体场景设计和评估机制为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 企业制度知识库建设：面向企业制度知识库建设，围绕RAG知识库、可检索知识底座与企业智能体建设开展现状梳理、方案设计和落地辅导，形成知识库建设方案、知识治理规则、智能体场景设计和评估机制，支撑后续实施、审核或运营转化。\n02 客服智能体应用：面向客服智能体应用，围绕RAG知识库、可检索知识底座与企业智能体建设开展现状梳理、方案设计和落地辅导，形成知识库建设方案、知识治理规则、智能体场景设计和评估机制，支撑后续实施、审核或运营转化。\n03 项目资料检索问答：面向项目资料检索问答，围绕RAG知识库、可检索知识底座与企业智能体建设开展现状梳理、方案设计和落地辅导，形成知识库建设方案、知识治理规则、智能体场景设计和评估机制，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "embodied-multimodal",
                    "status": "listed",
                    "name": "具身智能与多模态数据集设计咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "行业场景化AI数据服务咨询服务类",
                    "serviceType": "具身智能与多模态数据集设计咨询服务",
                    "org": "数据提供方,数据需求方,技术服务商",
                    "business": "AI应用,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-26",
                    "version": "v1",
                    "cover": "images/hero-ai-longgang.jpg",
                    "thumb": "images/hero-ai-longgang.jpg",
                    "heroImg": "images/hero-ai-longgang.jpg",
                    "tabTitle": "具身智能与多模态数据集设计咨询服务",
                    "tabDesc": "动作、环境、感知、交互及图像视频文本音频多模态数据集设计",
                    "badge": "AI数据服务",
                    "heroTitle": "具身智能与多模态数据集设计咨询服务",
                    "heroSubtitle": "围绕动作、环境、感知、交互及图像视频文本音频多模态数据集设计，提供AI数据服务方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦动作、环境、感知、交互及图像视频文本音频多模态数据集设计，结合行业场景化AI数据服务咨询服务的实施要求，为客户形成多模态数据集设计方案、采集规范、标注规则和质量验收标准，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "针对机器人、自动驾驶及其他复杂AI应用对感知、交互数据的需求，本服务提供动作、环境、感知及交互等专用数据集的设计与构建。同时，支持图像、视频、文本、音频等多模态数据集的整合，旨在帮助客户支撑具身智能训练，满足复杂AI训练需求，推动具身智能技术在现实世界中的广泛应用。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 场景共创：围绕动作、环境、感知、交互及图像视频文本音频多模态数据集设计梳理业务痛点、数据基础、算法适配条件和应用目标。\n02 数据评估：评估数据覆盖范围、质量水平、标注基础、知识沉淀和合规边界。\n03 方案设计：设计数据应用、模型接入、知识库建设或智能体落地的总体方案。\n04 数据治理：明确采集、清洗、标注、检索、训练、调用和质量验收规则。\n05 验证试点：沉淀多模态数据集设计方案、采集规范、标注规则和质量验收标准，支撑样板场景验证、效果评估和实施决策。\n06 迭代运营：根据模型效果、业务反馈和数据变化，持续优化场景适配与治理机制。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 场景与数据双适配：围绕动作、环境、感知、交互及图像视频文本音频多模态数据集设计开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 模型落地可验证：以多模态数据集设计方案、采集规范、标注规则和质量验收标准为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 机器人训练数据集设计：面向机器人训练数据集设计，围绕动作、环境、感知、交互及图像视频文本音频多模态数据集设计开展现状梳理、方案设计和落地辅导，形成多模态数据集设计方案、采集规范、标注规则和质量验收标准，支撑后续实施、审核或运营转化。\n02 自动驾驶感知数据治理：面向自动驾驶感知数据治理，围绕动作、环境、感知、交互及图像视频文本音频多模态数据集设计开展现状梳理、方案设计和落地辅导，形成多模态数据集设计方案、采集规范、标注规则和质量验收标准，支撑后续实施、审核或运营转化。\n03 多模态样本库建设：面向多模态样本库建设，围绕动作、环境、感知、交互及图像视频文本音频多模态数据集设计开展现状梳理、方案设计和落地辅导，形成多模态数据集设计方案、采集规范、标注规则和质量验收标准，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            },
            {
                    "id": "model-governance",
                    "status": "listed",
                    "name": "AI模型落地场景适配与治理咨询服务",
                    "category": "数据咨询服务",
                    "portalCategory": "行业场景化AI数据服务咨询服务类",
                    "serviceType": "AI模型落地场景适配与治理咨询服务",
                    "org": "数据提供方,数据需求方,技术服务商",
                    "business": "AI应用,数据产品",
                    "delivery": "线下交付",
                    "createdAt": "2026-05-27",
                    "version": "v1",
                    "cover": "images/hero-ai-longgang.jpg",
                    "thumb": "images/hero-ai-longgang.jpg",
                    "heroImg": "images/hero-ai-longgang.jpg",
                    "tabTitle": "AI模型落地场景适配与治理咨询服务",
                    "tabDesc": "AI模型场景适配、数据支撑、知识接入与AI数据治理",
                    "badge": "AI数据服务",
                    "heroTitle": "AI模型落地场景适配与治理咨询服务",
                    "heroSubtitle": "围绕AI模型场景适配、数据支撑、知识接入与AI数据治理，提供AI数据服务方向的一体化咨询支持，帮助客户形成可落地、可运营、可持续优化的数据服务能力。",
                    "lead": "本服务聚焦AI模型场景适配、数据支撑、知识接入与AI数据治理，结合行业场景化AI数据服务咨询服务的实施要求，为客户形成模型落地适配方案、数据治理清单、接入流程和运行评估机制，支撑后续数据要素开发利用、合规流通与持续运营。",
                    "sections": [
                            {
                                    "title": "服务说明",
                                    "content": "AI模型成功落地是实现价值的关键。本服务辅导AI模型在具体业务场景中的适配接入与优化，确保模型上线前后的数据支撑、知识接入及场景匹配。同时，提供AI数据治理咨询，旨在帮助客户推动模型真正进入业务使用，并确保AI数据使用的合规性与可靠性，最大化AI模型的商业价值。"
                            },
                            {
                                    "title": "服务流程",
                                    "content": "01 场景共创：围绕AI模型场景适配、数据支撑、知识接入与AI数据治理梳理业务痛点、数据基础、算法适配条件和应用目标。\n02 数据评估：评估数据覆盖范围、质量水平、标注基础、知识沉淀和合规边界。\n03 方案设计：设计数据应用、模型接入、知识库建设或智能体落地的总体方案。\n04 数据治理：明确采集、清洗、标注、检索、训练、调用和质量验收规则。\n05 验证试点：沉淀模型落地适配方案、数据治理清单、接入流程和运行评估机制，支撑样板场景验证、效果评估和实施决策。\n06 迭代运营：根据模型效果、业务反馈和数据变化，持续优化场景适配与治理机制。"
                            },
                            {
                                    "title": "服务优势",
                                    "content": "01 场景与数据双适配：围绕AI模型场景适配、数据支撑、知识接入与AI数据治理开展设计，避免咨询成果与实际业务、数据基础和平台能力脱节。\n02 模型落地可验证：以模型落地适配方案、数据治理清单、接入流程和运行评估机制为核心交付物，便于客户内部评审、跨部门协同和后续实施。\n03 贴合数据要素场景：兼顾数据治理、资产管理、合规流通和运营转化要求，支撑数据价值持续释放。\n04 便于持续运营优化：通过指标、台账、流程和复盘机制沉淀管理能力，让服务成果进入长期运营。"
                            },
                            {
                                    "title": "服务案例",
                                    "content": "01 模型业务接入评估：面向模型业务接入评估，围绕AI模型场景适配、数据支撑、知识接入与AI数据治理开展现状梳理、方案设计和落地辅导，形成模型落地适配方案、数据治理清单、接入流程和运行评估机制，支撑后续实施、审核或运营转化。\n02 智能体上线治理：面向智能体上线治理，围绕AI模型场景适配、数据支撑、知识接入与AI数据治理开展现状梳理、方案设计和落地辅导，形成模型落地适配方案、数据治理清单、接入流程和运行评估机制，支撑后续实施、审核或运营转化。\n03 AI应用运行效果复盘：面向AI应用运行效果复盘，围绕AI模型场景适配、数据支撑、知识接入与AI数据治理开展现状梳理、方案设计和落地辅导，形成模型落地适配方案、数据治理清单、接入流程和运行评估机制，支撑后续实施、审核或运营转化。"
                            }
                    ],
                    "pricing": {
                            "payMode": "预付费",
                            "measures": [
                                    "面议"
                            ],
                            "countPrice": "",
                            "countUnit": "元/次",
                            "durationPrice": "",
                            "durationUnit": "元/月",
                            "referencePrice": "面议"
                    }
            }
    ];

    var industrySolutionShelfSamples = [
        {
            id: 'solution-smart-park',
            status: 'listed',
            name: '智慧园区数据运营行业解决方案',
            category: '行业解决方案',
            serviceType: '行业解决方案',
            payMode: '后付费',
            measureMode: '按时长',
            createdAt: '2026-06-08',
            version: 'v1.2'
        },
        {
            id: 'solution-manufacturing-chain',
            status: 'listed',
            name: '制造业供应链协同数据解决方案',
            category: '行业解决方案',
            serviceType: '行业解决方案',
            payMode: '预付费',
            measureMode: '按次数',
            createdAt: '2026-06-12',
            version: 'v1.1'
        },
        {
            id: 'solution-finance-risk',
            status: 'listed',
            name: '金融风控数据融合应用解决方案',
            category: '行业解决方案',
            serviceType: '行业解决方案',
            payMode: '后付费',
            measureMode: '面议',
            createdAt: '2026-06-18',
            version: 'v1.0'
        },
        {
            id: 'solution-urban-governance',
            status: 'listed',
            name: '城市治理多源数据分析解决方案',
            category: '行业解决方案',
            serviceType: '行业解决方案',
            payMode: '预付费',
            measureMode: '按时长',
            createdAt: '2026-06-22',
            version: 'v1.0'
        }
    ];

    function getShelfPayMode(item) {
        var pricing = item.pricing || {};
        return item.payMode || pricing.payMode || '预付费';
    }

    function getShelfMeasureMode(item) {
        var pricing = item.pricing || {};
        var measures = item.measureMode ? [item.measureMode] : (pricing.measures || []);
        for (var i = 0; i < serviceMeasureModeOptions.length; i += 1) {
            if (measures.indexOf(serviceMeasureModeOptions[i]) !== -1) return serviceMeasureModeOptions[i];
        }
        return '面议';
    }

    function toServiceShelfRecord(item) {
        return {
            id: item.id,
            status: item.status,
            name: item.name,
            category: item.category,
            portalCategory: item.portalCategory || '',
            serviceType: item.serviceType,
            payMode: getShelfPayMode(item),
            measureMode: getShelfMeasureMode(item),
            org: item.org || '',
            business: item.business || '',
            delivery: item.delivery || '',
            createdAt: item.createdAt,
            version: item.version
        };
    }

    var serviceShelfRecords = consultationServiceCatalog.map(toServiceShelfRecord).concat(industrySolutionShelfSamples.map(toServiceShelfRecord));

    function renderTopbar() {
        var container = document.querySelector('[data-workbench-topbar]');
        if (!container) return;

        container.setAttribute('data-admin-topbar', '');
        if (window.AdminTopbar) {
            window.AdminTopbar.render(container);
        }
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
            payMode: 'all',
            measureMode: 'all',
            startDate: '',
            endDate: ''
        };
        var pagination = { page: 1, pageSize: 10 };
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
            trash: '<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>',
            drag: '<svg viewBox="0 0 24 24"><path d="M10 4h4v2h-4V4zm0 7h4v2h-4v-2zm0 7h4v2h-4v-2zM5 4h3v2H5V4zm0 7h3v2H5v-2zm0 7h3v2H5v-2zm11-14h3v2h-3V4zm0 7h3v2h-3v-2zm0 7h3v2h-3v-2z"/></svg>'
        };

        function cloneServiceData(item) {
            return normalizeServiceData(JSON.parse(JSON.stringify(item || consultationServiceCatalog[0])));
        }

        function splitCardLine(line) {
            var text = String(line || '').trim();
            var match = text.match(/^\d{1,2}(?:[\s.、]+)([^：:]+)[：:](.+)$/);
            if (!match) return null;
            return { title: match[1].trim(), desc: match[2].trim() };
        }

        function canAutoSplitSectionCards(sectionTitle) {
            return String(sectionTitle || '').indexOf('流程') > -1;
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

        function hasServiceCardContent(card) {
            return !!(card && (String(card.title || '').trim() || String(card.desc || '').trim() || String(card.icon || '').trim()));
        }

        function pruneEmptyServiceCards(data) {
            data.sections = (data.sections || []).map(function (section) {
                section.cards = (section.cards || section.features || []).filter(hasServiceCardContent);
                return section;
            });
            return data;
        }

        function normalizeSection(section) {
            var next = {
                title: section && section.title || '',
                content: section && section.content || '',
                cards: section && (section.cards || section.features) || []
            };
            if (!next.cards.length && next.content && canAutoSplitSectionCards(next.title)) {
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
            data.category = data.category || '数据咨询服务';
            data.portalCategory = data.portalCategory || consultPortalCategories[0] || '';
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
            serviceShelfRecords = consultationServiceCatalog.map(toServiceShelfRecord).concat(industrySolutionShelfSamples.map(toServiceShelfRecord));
        }

        function getServiceOptions() {
            return consultationServiceCatalog.map(function (item) {
                return serviceOption(item.id, item.serviceType, editorData && editorData.templateId === item.id ? item.id : '');
            }).join('');
        }

        function getPortalCategoryOptions(current) {
            return consultPortalCategories.map(function (item) {
                return serviceOption(item, item, current);
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

        function renderDragHandle() {
            return '<span class="service-drag-handle">' + icons.drag + '<span>拖动排序</span></span>';
        }

        function getEditorScrollTop() {
            var scroll = panel.querySelector('.service-editor-scroll');
            return scroll ? scroll.scrollTop : 0;
        }

        function restoreEditorScrollTop(scrollTop) {
            if (typeof scrollTop !== 'number') return;
            var scroll = panel.querySelector('.service-editor-scroll');
            if (scroll) scroll.scrollTop = scrollTop;
        }

        function getEditorActionPosition(button) {
            var sectionBlock = button.closest('[data-section-block]');
            var sectionBlocks = Array.prototype.slice.call(panel.querySelectorAll('[data-section-block]'));
            var sectionIndex = sectionBlock ? sectionBlocks.indexOf(sectionBlock) : -1;
            var cardBlock = button.closest('.service-card-editor[data-card-index]');
            var cardIndex = -1;
            if (sectionBlock && cardBlock) {
                cardIndex = Array.prototype.slice.call(sectionBlock.querySelectorAll('.service-card-editor[data-card-index]')).indexOf(cardBlock);
            }
            return {
                sectionIndex: sectionIndex,
                cardIndex: cardIndex
            };
        }

        function sectionSelector(index) {
            return '[data-section-block="' + index + '"]';
        }

        function cardSelector(sectionIndex, cardIndex) {
            return sectionSelector(sectionIndex) + ' [data-card-index="' + cardIndex + '"]';
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
                var text = [item.name, item.category, item.payMode, item.measureMode, item.version].join(' ').toLowerCase();
                if (item.status !== activeStatus) return false;
                if (filters.category !== 'all' && item.category !== filters.category) return false;
                if (filters.payMode !== 'all' && item.payMode !== filters.payMode) return false;
                if (filters.measureMode !== 'all' && item.measureMode !== filters.measureMode) return false;
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
                +       renderSelect('category', '服务类别', serviceCategoryOptions, filters.category)
                +       renderSelect('payMode', '付费模式', servicePayModeOptions, filters.payMode)
                +       renderSelect('measureMode', '计量方式', serviceMeasureModeOptions, filters.measureMode)
                +       '<div class="service-date-range">'
                +           '<span>创建时间</span>'
                +           '<input type="date" data-service-date="startDate" aria-label="开始日期" value="' + escapeHtml(filters.startDate) + '">'
                +           '<em>-</em>'
                +           '<input type="date" data-service-date="endDate" aria-label="结束日期" value="' + escapeHtml(filters.endDate) + '">'
                +           icons.calendar
                +       '</div>'
                +       '<button class="service-reset-btn" type="button" data-service-reset>重置</button>'
                +   '</div>'
                + '</div>';
        }

        function renderRows(records) {
            if (!records.length) {
                return '<tr><td class="service-empty-cell" colspan="6">暂无匹配的服务记录</td></tr>';
            }
            return records.map(function (item) {
                return ''
                    + '<tr>'
                    +   '<td><a class="service-name-link" href="javascript:void(0)">' + escapeHtml(item.name) + '</a></td>'
                    +   '<td><span class="service-ellipsis" title="' + escapeHtml(item.category) + '">' + escapeHtml(item.category) + '</span></td>'
                    +   '<td>' + escapeHtml(item.payMode) + '</td>'
                    +   '<td>' + escapeHtml(item.measureMode) + '</td>'
                    +   '<td class="service-version">' + escapeHtml(item.version) + '</td>'
                    +   '<td><div class="service-actions">'
                    +       '<button type="button" data-service-id="' + escapeHtml(item.id) + '" data-service-row-action="update">更新</button>'
                    +       '<button type="button" data-service-id="' + escapeHtml(item.id) + '" data-service-row-action="offline">下架</button>'
                    +       '<button type="button" data-service-id="' + escapeHtml(item.id) + '" data-service-row-action="log">日志</button>'
                    +   '</div></td>'
                    + '</tr>';
            }).join('');
        }

        function renderPageButton(page) {
            var cls = page === pagination.page ? 'service-page-number active' : 'service-page-number';
            return '<button class="' + cls + '" type="button" data-service-page="' + page + '">' + page + '</button>';
        }

        function renderPagination(total, totalPages) {
            var pageButtons = [];
            var startPage = Math.max(1, pagination.page - 2);
            var endPage = Math.min(totalPages, startPage + 4);
            if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);
            for (var i = startPage; i <= endPage; i += 1) {
                pageButtons.push(renderPageButton(i));
            }
            var prevCls = pagination.page <= 1 ? ' disabled' : '';
            var nextCls = pagination.page >= totalPages ? ' disabled' : '';
            return ''
                + '<div class="service-pagination">'
                +   '<span>共 ' + total + ' 条</span>'
                +   '<button class="service-page-arrow' + prevCls + '" type="button" data-service-page="prev" aria-label="上一页">' + icons.prev + '</button>'
                +   pageButtons.join('')
                +   '<button class="service-page-arrow' + nextCls + '" type="button" data-service-page="next" aria-label="下一页">' + icons.next + '</button>'
                +   '<select class="service-page-size" aria-label="每页条数" disabled><option>' + pagination.pageSize + ' 条/页</option></select>'
                +   '<span>前往</span>'
                +   '<input class="service-page-jump" type="text" data-service-page-jump aria-label="前往页码" value="' + pagination.page + '">'
                +   '<span>页</span>'
                + '</div>';
        }

        function renderTable(records) {
            var total = records.length;
            var totalPages = Math.max(1, Math.ceil(total / pagination.pageSize));
            if (pagination.page > totalPages) pagination.page = totalPages;
            if (pagination.page < 1) pagination.page = 1;
            var startIndex = (pagination.page - 1) * pagination.pageSize;
            var pageRecords = records.slice(startIndex, startIndex + pagination.pageSize);
            return ''
                + '<section class="service-table-section">'
                +   '<div class="service-table-scroll">'
                +       '<table class="service-table">'
                +           '<thead><tr>'
                +               '<th>服务名称</th>'
                +               '<th>服务类别</th>'
                +               '<th>付费模式</th>'
                +               '<th>计量方式</th>'
                +               '<th>版本号</th>'
                +               '<th>操作</th>'
                +           '</tr></thead>'
                +           '<tbody>' + renderRows(pageRecords) + '</tbody>'
                +       '</table>'
                +   '</div>'
                +   renderPagination(total, totalPages)
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

        function getServiceDropReference(container, selector, x, y) {
            var items = Array.prototype.slice.call(container.querySelectorAll(selector + ':not(.service-dragging)'));
            var isGrid = selector !== '.service-section-editor';

            if (!isGrid) {
                for (var listIndex = 0; listIndex < items.length; listIndex += 1) {
                    var listBox = items[listIndex].getBoundingClientRect();
                    if (y < listBox.top + listBox.height / 2) return items[listIndex];
                }
                return null;
            }

            var rowItems = [];
            items.forEach(function (child) {
                var box = child.getBoundingClientRect();
                if (y >= box.top && y <= box.bottom) {
                    rowItems.push({ element: child, box: box });
                }
            });

            if (rowItems.length) {
                rowItems.sort(function (a, b) { return a.box.left - b.box.left; });
                for (var rowIndex = 0; rowIndex < rowItems.length; rowIndex += 1) {
                    if (x < rowItems[rowIndex].box.left + rowItems[rowIndex].box.width / 2) {
                        return rowItems[rowIndex].element;
                    }
                }

                var rowBottom = Math.max.apply(null, rowItems.map(function (item) { return item.box.bottom; }));
                for (var nextIndex = 0; nextIndex < items.length; nextIndex += 1) {
                    var nextBox = items[nextIndex].getBoundingClientRect();
                    if (nextBox.top > rowBottom - 1) return items[nextIndex];
                }
                return null;
            }

            for (var fallbackIndex = 0; fallbackIndex < items.length; fallbackIndex += 1) {
                var fallbackBox = items[fallbackIndex].getBoundingClientRect();
                if (y < fallbackBox.top + fallbackBox.height / 2) return items[fallbackIndex];
            }
            return null;
        }

        function createServiceDropPlaceholder(item, selector) {
            var placeholder = document.createElement('div');
            placeholder.className = 'service-drop-placeholder' + (selector === '.service-section-editor' ? ' section' : '');
            placeholder.style.minHeight = Math.max(56, item.offsetHeight) + 'px';
            return placeholder;
        }

        function createServiceDragGhost(item) {
            var rect = item.getBoundingClientRect();
            var ghost = item.cloneNode(true);
            ghost.classList.add('service-drag-ghost');
            ghost.style.width = rect.width + 'px';
            ghost.style.height = rect.height + 'px';
            document.body.appendChild(ghost);
            return ghost;
        }

        function positionServiceDragGhost(ghost, x, y, offsetX, offsetY) {
            ghost.style.left = (x - offsetX) + 'px';
            ghost.style.top = (y - offsetY) + 'px';
        }

        function moveServicePlaceholder(container, selector, placeholder, x, y) {
            var reference = getServiceDropReference(container, selector, x, y);
            if (reference == null) {
                container.appendChild(placeholder);
            } else if (reference !== placeholder) {
                container.insertBefore(placeholder, reference);
            }
        }

        function bindServiceSortable(container, selector, afterSort) {
            if (!container || container.dataset.serviceSortableBound === 'true') return;
            container.dataset.serviceSortableBound = 'true';
            container.addEventListener('mousedown', function (event) {
                if (event.button !== 0) return;

                var item = event.target.closest(selector);
                if (!item || !container.contains(item)) return;

                var nearestSortable = event.target.closest('.service-section-editor, .service-card-editor');
                if (nearestSortable !== item || !event.target.closest('.service-drag-handle')) return;

                event.preventDefault();

                var rect = item.getBoundingClientRect();
                var offsetX = event.clientX - rect.left;
                var offsetY = event.clientY - rect.top;
                var placeholder = createServiceDropPlaceholder(item, selector);
                var ghost = createServiceDragGhost(item);

                item.parentNode.insertBefore(placeholder, item.nextSibling);
                item.classList.add('service-dragging');
                item.style.display = 'none';
                container.classList.add('service-sort-active');
                document.body.classList.add('service-is-sorting');
                positionServiceDragGhost(ghost, event.clientX, event.clientY, offsetX, offsetY);

                function onMouseMove(moveEvent) {
                    moveEvent.preventDefault();
                    positionServiceDragGhost(ghost, moveEvent.clientX, moveEvent.clientY, offsetX, offsetY);
                    moveServicePlaceholder(container, selector, placeholder, moveEvent.clientX, moveEvent.clientY);
                }

                function cleanup(shouldCommit) {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                    document.body.classList.remove('service-is-sorting');
                    container.classList.remove('service-sort-active');

                    if (shouldCommit && placeholder.parentNode) {
                        placeholder.parentNode.insertBefore(item, placeholder);
                    }

                    item.style.display = '';
                    item.classList.remove('service-dragging');

                    if (placeholder.parentNode) placeholder.parentNode.removeChild(placeholder);
                    if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
                    if (shouldCommit && typeof afterSort === 'function') afterSort();
                }

                function onMouseUp() {
                    cleanup(true);
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        }

        function syncEditorSortOrder() {
            var scrollTop = getEditorScrollTop();
            collectEditorData();
            noticeText = '';
            renderServiceEditor(scrollTop);
        }

        function bindServiceCardSortables(scope) {
            (scope || panel).querySelectorAll('.service-card-editor-grid').forEach(function (grid) {
                bindServiceSortable(grid, '.service-card-editor', syncEditorSortOrder);
            });
        }

        function renderCardEditors(cards, sectionIndex) {
            cards = cards || [];
            if (!cards.length) {
                return '<div class="service-card-editor-empty">暂无卡片内容，可按展示样式新增序号卡片、图标卡片或整行卡片。</div>';
            }
            return cards.map(function (card, cardIndex) {
                var type = card.type || getDefaultCardType((editorData.sections[sectionIndex] || {}).title);
                var iconHtml = type === 'icon' ? ''
                    + '<label class="service-card-image-upload">'
                    +   '<span class="service-card-image-preview">' + (card.icon ? '<img src="' + escapeHtml(card.icon) + '" alt="卡片图标">' : '<span class="service-card-image-empty">' + icons.upload + '<span>上传图片</span></span>') + '</span>'
                    +   '<input type="file" accept="image/*" data-card-icon-upload="' + sectionIndex + '-' + cardIndex + '">'
                    + '</label>'
                    + '<input type="hidden" data-card-icon="' + sectionIndex + '-' + cardIndex + '" value="' + escapeHtml(card.icon || '') + '">'
                    : '<input type="hidden" data-card-icon="' + sectionIndex + '-' + cardIndex + '" value="' + escapeHtml(card.icon || '') + '">';
                var fieldHtml = ''
                    + '<div class="service-card-fields">'
                    +   '<label>标题</label>'
                    +   '<input class="service-editor-input" data-card-title="' + sectionIndex + '-' + cardIndex + '" value="' + escapeHtml(card.title || '') + '">'
                    +   '<label>描述</label>'
                    +   '<textarea class="service-editor-textarea" data-card-desc="' + sectionIndex + '-' + cardIndex + '">' + escapeHtml(card.desc || '') + '</textarea>'
                    + '</div>';
                return ''
                    + '<div class="service-card-editor type-' + escapeHtml(type) + '" data-card-index="' + cardIndex + '" data-card-type="' + escapeHtml(type) + '">'
                    +   '<div class="service-card-editor-head">'
                    +       renderDragHandle()
                    +       (type === 'icon' ? '' : '<em>' + getCardTypeLabel(type) + '</em>')
                    +       '<button class="service-delete-btn" type="button" data-section-action="delete-card">' + icons.trash + '<span>删除</span></button>'
                    +   '</div>'
                    +   '<input type="hidden" data-card-type-input="' + sectionIndex + '-' + cardIndex + '" value="' + escapeHtml(type) + '">'
                    +   (type === 'icon' ? '<div class="service-card-feature-row">' + iconHtml + fieldHtml + '</div>' : iconHtml + fieldHtml)
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
                    +       renderDragHandle()
                    +       '<input class="service-editor-input" data-section-title="' + index + '" value="' + escapeHtml(section.title) + '">'
                    +       '<button class="service-delete-btn" type="button" data-section-action="delete-section">' + icons.trash + '<span>删除章节</span></button>'
                    +   '</div>'
                    +   '<div class="service-section-editor-body">'
                    +       '<label>正文内容</label>'
                    +       renderTextarea(section.content, 'class="service-editor-textarea service-editor-textarea-large" data-section-content="' + index + '" placeholder="请输入该章节的正文内容"')
                    +   '</div>'
                +   '<div class="service-card-editor-panel">'
                +       '<div class="service-card-editor-title">'
                +           '<span>相关卡片</span>'
                +           '<div class="service-card-add-actions">'
                +               '<button class="service-secondary-btn" type="button" data-section-action="add-sequence-card">' + icons.add + '<span>新增序号卡片</span></button>'
                +               '<button class="service-secondary-btn" type="button" data-section-action="add-icon-card">' + icons.add + '<span>新增图标卡片</span></button>'
                +               '<button class="service-secondary-btn" type="button" data-section-action="add-integrated-card">' + icons.add + '<span>新增整行卡片</span></button>'
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
                +               renderRequiredLabel('所属分类')
                +               '<div class="service-editor-field"><select class="service-editor-select" data-consult-field="portalCategory">' + getPortalCategoryOptions(editorData.portalCategory) + '</select></div>'
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
            function payModeChecked(value) {
                return (pricing.payMode || '预付费') === value ? ' checked' : '';
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
                +               '<div class="service-editor-field service-check-group">'
                +                   '<label class="service-radio-inline"><input type="radio" name="consult-pay-mode" data-pricing-field="payMode" value="预付费"' + payModeChecked('预付费') + '><span>预付费</span></label>'
                +                   '<label class="service-radio-inline"><input type="radio" name="consult-pay-mode" data-pricing-field="payMode" value="后付费"' + payModeChecked('后付费') + '><span>后付费</span></label>'
                +               '</div>'
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
                +       '</section>'
                +   '</div>'
                + '</div>';
        }

        function renderServiceEditor(renderOptions) {
            if (typeof renderOptions === 'number') {
                renderOptions = { scrollTop: renderOptions };
            } else {
                renderOptions = renderOptions || {};
            }
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
            restoreEditorScrollTop(renderOptions.scrollTop);
            if (renderOptions.scrollTo) {
                var target = panel.querySelector(renderOptions.scrollTo);
                if (target && target.scrollIntoView) {
                    target.scrollIntoView({ block: 'nearest' });
                }
            }
        }

        function collectEditorData() {
            if (!editorData) return;
            var tabTitleInput = panel.querySelector('[data-consult-field="tabTitle"]');
            var subtitleInput = panel.querySelector('[data-consult-field="heroSubtitle"]');
            var tabDescInput = panel.querySelector('[data-consult-field="tabDesc"]');
            var portalCategoryInput = panel.querySelector('[data-consult-field="portalCategory"]');
            var badgeInput = panel.querySelector('[data-consult-field="badge"]');
            var heroTitleInput = panel.querySelector('[data-consult-field="heroTitle"]');
            var leadInput = panel.querySelector('[data-consult-field="lead"]');
            if (tabTitleInput) {
                editorData.tabTitle = tabTitleInput.value.trim();
                editorData.name = editorData.tabTitle || editorData.serviceType;
            }
            if (subtitleInput) editorData.heroSubtitle = subtitleInput.value.trim();
            if (tabDescInput) editorData.tabDesc = tabDescInput.value.trim();
            if (portalCategoryInput) editorData.portalCategory = portalCategoryInput.value;
            if (badgeInput) editorData.badge = badgeInput.value.trim();
            if (heroTitleInput) editorData.heroTitle = heroTitleInput.value.trim();
            if (leadInput) editorData.lead = leadInput.value.trim();
            var sectionBlocks = panel.querySelectorAll('[data-section-block]');
            if (sectionBlocks.length) {
                editorData.sections = Array.prototype.map.call(sectionBlocks, function (block) {
                    var index = block.dataset.sectionBlock;
                    var title = block.querySelector('[data-section-title="' + index + '"]');
                    var content = block.querySelector('[data-section-content="' + index + '"]');
                    var cards = Array.prototype.map.call(block.querySelectorAll('.service-card-editor[data-card-index]'), function (card) {
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
                        cards: cards
                    };
                });
            }
            if (panel.querySelector('[data-pricing-field]') || panel.querySelector('[data-pricing-measure]')) {
                var pricing = editorData.pricing || {};
                var countPrice = panel.querySelector('[data-pricing-field="countPrice"]');
                var countUnit = panel.querySelector('[data-pricing-field="countUnit"]');
                var durationPrice = panel.querySelector('[data-pricing-field="durationPrice"]');
                var durationUnit = panel.querySelector('[data-pricing-field="durationUnit"]');
                var payMode = panel.querySelector('[data-pricing-field="payMode"]:checked');
                pricing.payMode = payMode ? payMode.value : '预付费';
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
            return pruneEmptyServiceCards(cloneServiceData(Object.assign({}, editorData, {
                title: editorData.tabTitle || editorData.name,
                desc: editorData.tabDesc,
                price: getReferencePrice(editorData)
            })));
        }

        function openServicePreview() {
            var previewData = buildServicePreviewData();
            localStorage.setItem('consult-service-preview-data', JSON.stringify(previewData));
            window.open('consulting-service-preview.html', '_blank');
        }

        function persistEditorData() {
            collectEditorData();
            var saved = pruneEmptyServiceCards(cloneServiceData(editorData));
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
                        var scrollTop = getEditorScrollTop();
                        collectEditorData();
                        if (field === 'thumb') editorData.thumb = event.target.result;
                        if (field === 'heroImg') {
                            editorData.heroImg = event.target.result;
                            editorData.cover = event.target.result;
                        }
                        noticeText = '';
                        renderServiceEditor(scrollTop);
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
                        var scrollTop = getEditorScrollTop();
                        collectEditorData();
                        var section = editorData.sections[sectionIndex];
                        if (section && section.cards && section.cards[cardIndex]) {
                            section.cards[cardIndex].icon = event.target.result;
                        }
                        noticeText = '';
                        renderServiceEditor(scrollTop);
                    };
                    reader.readAsDataURL(this.files[0]);
                });
            });

            panel.querySelectorAll('[data-section-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var action = this.dataset.sectionAction;
                    var scrollTop = getEditorScrollTop();
                    var position = getEditorActionPosition(this);
                    var renderOptions = { scrollTop: scrollTop };
                    collectEditorData();
                    if (action === 'add-section') {
                        editorData.sections.push({ title: '新增内容章节', content: '', cards: [] });
                        renderOptions.scrollTo = sectionSelector(editorData.sections.length - 1);
                    }
                    if (action === 'delete-section') {
                        if (position.sectionIndex > -1) {
                            editorData.sections.splice(position.sectionIndex, 1);
                            if (editorData.sections.length) {
                                renderOptions.scrollTo = sectionSelector(Math.min(position.sectionIndex, editorData.sections.length - 1));
                            }
                        }
                    }
                    if (action === 'add-sequence-card' || action === 'add-icon-card' || action === 'add-integrated-card') {
                        var section = editorData.sections[position.sectionIndex];
                        if (section) {
                            section.cards = section.cards || [];
                            var typeMap = {
                                'add-sequence-card': 'sequence',
                                'add-icon-card': 'icon',
                                'add-integrated-card': 'integrated'
                            };
                            section.cards.push({ type: typeMap[action], title: '', desc: '', icon: '' });
                            renderOptions.scrollTo = cardSelector(position.sectionIndex, section.cards.length - 1);
                        }
                    }
                    if (action === 'delete-card') {
                        var targetSection = editorData.sections[position.sectionIndex];
                        if (targetSection && targetSection.cards && position.cardIndex > -1) {
                            targetSection.cards.splice(position.cardIndex, 1);
                            if (targetSection.cards.length) {
                                renderOptions.scrollTo = cardSelector(position.sectionIndex, Math.min(position.cardIndex, targetSection.cards.length - 1));
                            } else {
                                renderOptions.scrollTo = sectionSelector(position.sectionIndex);
                            }
                        }
                    }
                    noticeText = '';
                    renderServiceEditor(renderOptions);
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

            var sectionList = panel.querySelector('[data-section-list]');
            bindServiceSortable(sectionList, '.service-section-editor', syncEditorSortOrder);
            bindServiceCardSortables(panel);
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
            pagination.page = 1;
            renderPanel();
        }

        function bindEvents() {
            panel.querySelectorAll('[data-service-status]').forEach(function (button) {
                button.addEventListener('click', function () {
                    activeStatus = this.dataset.serviceStatus || 'listed';
                    pagination.page = 1;
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
                    pagination.page = 1;
                    renderPanel();
                });
            });

            panel.querySelectorAll('[data-service-date]').forEach(function (input) {
                input.addEventListener('change', function () {
                    filters[this.dataset.serviceDate] = this.value.trim();
                    pagination.page = 1;
                    renderPanel();
                });
            });

            var applyButton = panel.querySelector('[data-service-apply]');
            if (applyButton) applyButton.addEventListener('click', applyFilters);

            var resetButton = panel.querySelector('[data-service-reset]');
            if (resetButton) {
                resetButton.addEventListener('click', function () {
                    filters = { keyword: '', category: 'all', payMode: 'all', measureMode: 'all', startDate: '', endDate: '' };
                    pagination.page = 1;
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

            panel.querySelectorAll('[data-service-page]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (this.classList.contains('disabled')) return;
                    var action = this.dataset.servicePage;
                    if (action === 'prev') pagination.page -= 1;
                    else if (action === 'next') pagination.page += 1;
                    else pagination.page = parseInt(action, 10) || 1;
                    renderPanel();
                });
            });

            var jumpInput = panel.querySelector('[data-service-page-jump]');
            if (jumpInput) {
                jumpInput.addEventListener('keydown', function (event) {
                    if (event.key !== 'Enter') return;
                    pagination.page = parseInt(this.value, 10) || 1;
                    renderPanel();
                });
                jumpInput.addEventListener('change', function () {
                    pagination.page = parseInt(this.value, 10) || 1;
                    renderPanel();
                });
            }
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
                var extraClass = row[2] ? ' ' + row[2] : '';
                return '<div class="consult-info-item' + extraClass + '"><span>' + escapeHtml(row[0]) + '</span><strong>' + escapeHtml(row[1]) + '</strong></div>';
            }).join('');
        }

        function renderObjectInfo(item) {
            return (item.objectInfo || []).map(function (row) {
                return '<div class="consult-detail-row"><span>' + escapeHtml(row[0]) + '</span><strong>' + escapeHtml(row[1]) + '</strong></div>';
            }).join('');
        }

        function getObjectIntro(item) {
            var introMap = {
                '需求咨询': '围绕业务场景、实施范围、预算周期和对接条件进行前期沟通，便于后续形成可响应的需求方案。',
                '资源咨询': '用于了解数据资源覆盖范围、更新频率、授权方式和使用边界，支撑后续申请或采购判断。',
                '产品咨询': '用于了解数据产品功能、适用场景、交付方式和使用限制，支撑后续购买决策。',
                '服务咨询': '用于了解咨询服务范围、交付成果、实施周期和协作方式，支撑后续服务对接。',
                '方案咨询': '用于了解行业方案能力、落地路径、交付边界和适配条件，支撑后续方案选型。'
            };
            return item.object + '主要' + (introMap[getConsultType(item)] || '用于明确咨询对象的背景、范围和对接要点，支撑后续业务沟通。');
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
                ['对接方', getCounterparty(item)],
                ['咨询类型', getConsultType(item)],
                ['提交时间', item.createdAt],
                ['状态', status],
                ['对象简介', getObjectIntro(item), 'consult-info-item-summary']
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
                +               '<div class="consult-section-title">咨询对象信息</div>'
                +               '<div class="consult-info-grid consult-object-info-grid">' + renderInfoGrid(baseRows) + '</div>'
                +           '</section>'
                +           '<section class="consult-modal-section">'
                +               '<div class="consult-section-title">咨询内容</div>'
                +               '<div class="consult-content-box">' + escapeHtml(getConsultContent(item)) + '</div>'
                +               viewReplySection
                +           '</section>'
                +           '<section class="consult-modal-section">'
                +               '<div class="consult-section-title">联系方式</div>'
                +               '<div class="consult-contact-grid">' + renderInfoGrid(contactRows) + '</div>'
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
