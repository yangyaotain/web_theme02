(function () {
    var ICONS = {
        home: '<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
        bell: '<svg viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10.5 3.17 10.5 4v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>',
        user: '<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
        arrow: '<svg class="wb-side-arrow" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>',
        order: '<svg viewBox="0 0 24 24"><path d="M7 2h10v2h3c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2L2 6c0-1.1.9-2 2-2h3V2zm2 2h6V3H9v1zm2 14l6-6-1.41-1.41L11 15.17l-2.59-2.58L7 14l4 4z"/></svg>',
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
                {
                    label: '我的需求',
                    icon: 'demand',
                    children: [
                        { key: 'my-demand', label: '我的需求', href: 'buyer-center.html?menu=my-demand' },
                        { key: 'consults', label: '我的咨询', href: 'buyer-center.html?menu=consults' }
                    ]
                },
                { key: 'dispute', label: '争议仲裁', icon: 'dispute', href: 'buyer-center.html?menu=dispute' },
                { key: 'contract', label: '合约管理', icon: 'contract', href: 'buyer-center.html?menu=contract' }
            ]
        },
        supplier: {
            title: '供方中心',
            sections: [
                {
                    label: '资源产品管理',
                    icon: 'order',
                    children: [
                        { key: 'resource-register', label: '资源登记管理', href: 'supplier-center.html?menu=resource-register' },
                        { key: 'product-register', label: '产品登记管理', href: 'supplier-center.html?menu=product-register' },
                        { key: 'resource-shelf', label: '资源上下架管理', href: 'supplier-center.html?menu=resource-shelf' },
                        { key: 'product-shelf', label: '产品上下架管理', href: 'supplier-center.html?menu=product-shelf' }
                    ]
                },
                {
                    label: '订单合同',
                    icon: 'order',
                    children: [
                        { key: 'resource-order', label: '资源订单管理', href: 'supplier-center.html?menu=resource-order' },
                        { key: 'product-order', label: '产品订单管理', href: 'supplier-center.html?menu=product-order' },
                        { key: 'product-contract', label: '产品合同管理', href: 'supplier-center.html?menu=product-contract' }
                    ]
                },
                { key: 'fee', label: '费用管理', icon: 'money', href: 'supplier-center.html?menu=fee' },
                { key: 'invoice', label: '发票管理', icon: 'invoice', href: 'supplier-center.html?menu=invoice' },
                {
                    label: '需求响应',
                    icon: 'demand',
                    children: [
                        { key: 'demand-response', label: '需求响应', href: 'supplier-center.html?menu=demand-response' },
                        { key: 'consults', label: '我的咨询', href: 'supplier-center.html?menu=consults' }
                    ]
                },
                { key: 'dispute', label: '争议仲裁', icon: 'dispute', href: 'supplier-center.html?menu=dispute' },
                { key: 'contract', label: '合约管理', icon: 'contract', href: 'supplier-center.html?menu=contract' }
            ]
        }
    };

    var menuMeta = {
        'resource-apply': { title: '资源申请管理', desc: '查看和跟进已提交的数据资源申请、授权进度与交付状态。' },
        'resource-order': { title: '资源订单管理', desc: '处理需求方提交的数据资源申请、授权审批与交付确认。' },
        'product-order': { title: '产品订单管理', desc: '查看产品订单、购买申请、审批状态与交易进度。' },
        'product-contract': { title: '产品合同管理', desc: '管理产品交易合同、合同签署、确认和履约相关事项。' },
        'resource-register': { title: '资源登记管理', desc: '维护资源登记信息、资源目录资料和基础交付说明。' },
        'product-register': { title: '产品登记管理', desc: '维护数据产品登记信息、产品介绍、计费方式和交付资料。' },
        'resource-shelf': { title: '资源上下架管理', desc: '管理数据资源的展示状态、上架申请和下架处理。' },
        'product-shelf': { title: '产品上下架管理', desc: '管理数据产品上架、下架、展示状态和可售配置。' },
        'fee': { title: '费用管理', desc: '查看交易费用、应收应付、结算记录和费用确认事项。' },
        'invoice': { title: '发票管理', desc: '处理发票申请、开票记录和发票状态跟踪。' },
        'my-demand': { title: '我的需求', desc: '查看已发布的数据需求、需求状态和响应情况。' },
        'demand-response': { title: '需求响应', desc: '查看可响应需求、已响应记录和需求沟通进度。' },
        'consults': { title: '我的咨询', desc: '查看资源、产品、咨询服务、解决方案和需求咨询记录。' },
        'dispute': { title: '争议仲裁', desc: '管理交易争议、仲裁申请和处理记录。' },
        'contract': { title: '合约管理', desc: '查看智能合约、合约状态和链上存证信息。' }
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
            var isOpen = section.children && section.children.some(function (child) { return child.key === active; });
            var groupClass = isOpen ? 'wb-side-group' : 'wb-side-group collapsed';
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
        return consultRecords.filter(function (item) {
            return item.audience === role;
        });
    }

    function tagClass(item) {
        return item.typeClass ? 'consult-type ' + item.typeClass : 'consult-type';
    }

    function infoRows(rows) {
        return rows.map(function (row) {
            return '<div class="info-row"><div class="info-label">' + row[0] + '：</div><div class="info-value">' + row[1] + '</div></div>';
        }).join('');
    }

    function renderConsultPanel() {
        var panel = document.querySelector('[data-consult-panel]');
        if (!panel) return;

        var role = panel.dataset.role || 'buyer';
        var activeMenu = getActiveMenu(document.querySelector('[data-workbench-sidebar]'));
        var titleEl = document.querySelector('[data-center-title]');
        var meta = menuMeta[activeMenu] || menuMeta.consults;
        if (titleEl) titleEl.textContent = meta.title;

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
            if (role === 'supplier') return item.submitInfo.org;
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
            var history = getHistory(item);
            return history.length ? history[history.length - 1].time : '--';
        }

        function getConsultContent(item) {
            var history = getHistory(item);
            return history.length ? history[0].text : '--';
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
            return consultRecords.reduce(function (result, item) {
                if (result.indexOf(item.type) === -1) result.push(item.type);
                return result;
            }, []);
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
                if (filters.type !== 'all' && item.type !== filters.type) return false;
                if (filters.status !== 'all' && status !== filters.status) return false;
                if (!keyword) return true;
                var text = [item.object, item.type, item.person, item.submitInfo.org, getCounterparty(item)].join(' ').toLowerCase();
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
                    +   '<td><span class="' + tagClass(item) + '">' + escapeHtml(item.type) + '</span></td>'
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
                ['咨询类型', item.type],
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
                +           '<section class="consult-modal-section">'
                +               '<div class="consult-section-title">回复记录</div>'
                +               '<div class="consult-record-list">' + renderHistory(item) + '</div>'
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
