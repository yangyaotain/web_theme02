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
        { key: 'island', label: '数据岛系统', href: 'data-dev-system.html' }
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
            object: '企业领导驾驶舱服务需求',
            type: '需求咨询',
            typeClass: 'demand',
            unread: true,
            createdAt: '2026-06-03 10:32',
            person: '刘洋',
            status: '跟进中',
            submitInfo: {
                org: '龙岗数智集成服务有限公司',
                name: '刘洋',
                phone: '13809523505',
                email: 'liuyang@lgdata.cn'
            },
            objectInfo: [
                ['需求名称', '企业领导驾驶舱服务需求'],
                ['需求类型', '应用需求'],
                ['需求方', '智慧数据科技有限公司'],
                ['需求预算', '面议'],
                ['截止时间', '2025-11-04']
            ],
            orgInfo: [
                ['法人或其他组织类型', '企业单位法人'],
                ['法人或其他组织名称', '龙岗数智集成服务有限公司'],
                ['统一社会信用代码', '91440300MA5LGD528R'],
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
                { kind: 'msg', from: 'provider', name: '刘洋', text: '您好，我们关注到企业领导驾驶舱服务需求，想确认是否已有固定数据源清单和指标口径。' },
                { kind: 'time', text: '2026-06-03 10:48' },
                { kind: 'msg', from: 'asker', name: '智慧数据科技有限公司', text: '您好，目前已有财务、项目、客户和运营系统数据源，指标口径还需要供应方协助梳理。' },
                { kind: 'msg', from: 'provider', name: '刘洋', text: '了解。我们可以先提供指标体系梳理和驾驶舱原型方案，再根据数据接入范围评估实施周期。' }
            ]
        },
        {
            id: 'resource',
            object: '金融行业A股上市公司股吧数据集',
            type: '数据资源',
            typeClass: '',
            unread: true,
            createdAt: '2026-06-03 09:28',
            person: '陈雨',
            status: '跟进中',
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
            id: 'product',
            object: '慧企政策智能推荐',
            type: '数据产品',
            typeClass: 'product',
            createdAt: '2026-06-02 16:20',
            person: '李明',
            status: '已回复',
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
            object: '数据资产入表规划咨询服务',
            type: '数据咨询服务',
            typeClass: 'service',
            unread: true,
            createdAt: '2026-06-01 11:36',
            person: '王静',
            status: '待回复',
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
            object: '金融行业数据应用解决方案',
            type: '行业解决方案',
            typeClass: 'solution',
            createdAt: '2026-05-31 14:12',
            person: '赵强',
            status: '已回复',
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
            var unreadDot = item.key === 'consults' && hasUnreadConsults() ? '<span class="wb-unread-dot"></span>' : '';
            var content = icon + '<span>' + item.label + '</span>' + unreadDot;
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

    function hasUnreadConsults() {
        return consultRecords.some(function (item) { return item.unread; });
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
        var activeId = consultRecords[0].id;
        var sendKeyMode = 'enter';

        function isSelf(from) {
            return role === 'supplier' ? from === 'provider' : from === 'asker';
        }

        function renderMessages(item) {
            return item.messages.map(function (message) {
                if (message.kind === 'time') {
                    return '<div class="chat-time"><span>' + message.text + '</span></div>';
                }
                var self = isSelf(message.from);
                var cls = self ? 'chat-msg self' : 'chat-msg';
                var avatar = self ? '我' : message.name.slice(0, 1);
                return ''
                    + '<div class="' + cls + '">'
                    +   '<div class="chat-avatar">' + avatar + '</div>'
                    +   '<div class="chat-content">'
                    +       '<div class="chat-name">' + (self ? '我' : message.name) + '</div>'
                    +       '<div class="chat-bubble">' + message.text + '</div>'
                    +   '</div>'
                    + '</div>';
            }).join('');
        }

        function renderList(activeItem) {
            return consultRecords.map(function (item) {
                var cls = item.id === activeItem.id ? 'consult-item active' : 'consult-item';
                var unreadDot = item.unread ? '<span class="consult-unread-dot"></span>' : '';
                return ''
                    + '<button class="' + cls + '" type="button" data-consult-id="' + item.id + '">'
                    +   '<div class="consult-item-row">'
                    +       '<span class="consult-object"><span class="consult-object-text">' + item.object + '</span>' + unreadDot + '</span>'
                    +       '<span class="consult-time">' + item.createdAt.slice(5, 16) + '</span>'
                    +   '</div>'
                    +   '<div class="consult-item-row">'
                    +       '<span class="' + tagClass(item) + '">' + item.type + '</span>'
                    +       '<span class="consult-person">' + item.person + '</span>'
                    +   '</div>'
                    + '</button>';
            }).join('');
        }

        function renderDetail(activeItem) {
            function sendModeOption(mode, label) {
                var cls = mode === sendKeyMode ? 'chat-send-option active' : 'chat-send-option';
                return '<button class="' + cls + '" type="button" data-send-mode="' + mode + '">'
                    + '<svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>'
                    + '<span>' + label + '</span>'
                    + '</button>';
            }

            panel.innerHTML = ''
                + '<aside class="consult-list-pane">'
                +   '<div class="consult-list-head"><span class="consult-list-title">咨询列表</span><span class="consult-list-count">共 ' + consultRecords.length + ' 条</span></div>'
                +   '<div class="consult-search"><input type="text" placeholder="搜索咨询对象/咨询人/类型"></div>'
                +   '<div class="consult-list">' + renderList(activeItem) + '</div>'
                + '</aside>'
                + '<section class="consult-chat-pane">'
                +   '<div class="chat-head"><div class="chat-title">' + activeItem.object + '</div><span class="chat-status">' + activeItem.status + '</span></div>'
                +   '<div class="chat-body" id="chatBody">' + renderMessages(activeItem) + '</div>'
                +   '<div class="chat-reply">'
                +       '<textarea id="chatReplyInput" placeholder="请输入回复内容"></textarea>'
                +       '<div class="chat-reply-actions">'
                +           '<div class="chat-send-wrap">'
                +               '<button class="chat-send-btn" type="button" id="chatSendBtn">发送(S)</button>'
                +               '<button class="chat-send-menu-btn" type="button" id="chatSendMenuBtn" aria-label="发送快捷键设置"><svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></button>'
                +               '<div class="chat-send-menu" id="chatSendMenu">'
                +                   sendModeOption('enter', '按Enter键发送消息')
                +                   sendModeOption('ctrlEnter', '按Ctrl+Enter键发送消息')
                +               '</div>'
                +           '</div>'
                +       '</div>'
                +   '</div>'
                + '</section>'
                + '<aside class="consult-info-pane">'
                +   '<section class="info-card">'
                +       '<div class="info-card-head">咨询提交信息</div>'
                +       '<div class="info-card-body">'
                +           '<div class="info-row"><div class="info-label">机构名称：</div><div class="info-value">' + activeItem.submitInfo.org + '</div></div>'
                +           '<div class="info-row"><div class="info-label">联系人姓名：</div><div class="info-value">' + activeItem.submitInfo.name + '</div></div>'
                +           '<div class="info-row"><div class="info-label">联系人电话：</div><div class="info-value">' + activeItem.submitInfo.phone + '</div></div>'
                +           '<div class="info-row"><div class="info-label">联系人邮箱：</div><div class="info-value">' + activeItem.submitInfo.email + '</div></div>'
                +       '</div>'
                +   '</section>'
                +   '<section class="info-card object-card">'
                +       '<div class="info-card-head">咨询对象信息</div>'
                +       '<div class="info-card-body">' + infoRows(activeItem.objectInfo) + '</div>'
                +   '</section>'
                +   '<section class="info-card org-card">'
                +       '<div class="info-card-head">法人或其他组织基本信息</div>'
                +       '<div class="info-card-body">' + infoRows(activeItem.orgInfo) + '</div>'
                +   '</section>'
                + '</aside>';

            var chatBody = panel.querySelector('#chatBody');
            if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;

            panel.querySelectorAll('[data-consult-id]').forEach(function (button) {
                button.addEventListener('click', function () {
                    activeId = this.dataset.consultId;
                    var next = consultRecords.find(function (item) { return item.id === activeId; }) || consultRecords[0];
                    next.unread = false;
                    renderSidebar();
                    renderDetail(next);
                });
            });

            var sendBtn = panel.querySelector('#chatSendBtn');
            var menuBtn = panel.querySelector('#chatSendMenuBtn');
            var sendMenu = panel.querySelector('#chatSendMenu');
            var input = panel.querySelector('#chatReplyInput');
            if (sendBtn && input) {
                function sendCurrentMessage() {
                    var text = input.value.trim();
                    if (!text) return;
                    activeItem.messages.push({ kind: 'time', text: '刚刚' });
                    activeItem.messages.push({ kind: 'msg', from: role === 'supplier' ? 'provider' : 'asker', name: '我', text: text });
                    renderDetail(activeItem);
                }

                sendBtn.addEventListener('click', sendCurrentMessage);

                input.addEventListener('keydown', function (e) {
                    var isEnter = e.key === 'Enter';
                    var shouldSend = isEnter && ((sendKeyMode === 'enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) || (sendKeyMode === 'ctrlEnter' && e.ctrlKey));
                    if (!shouldSend) return;
                    e.preventDefault();
                    sendCurrentMessage();
                });

                if (menuBtn && sendMenu) {
                    function closeSendMenuOnOutside(e) {
                        if (sendMenu.contains(e.target) || menuBtn.contains(e.target)) return;
                        sendMenu.classList.remove('active');
                        document.removeEventListener('click', closeSendMenuOnOutside);
                    }

                    menuBtn.addEventListener('click', function (e) {
                        e.stopPropagation();
                        var isOpen = sendMenu.classList.toggle('active');
                        if (isOpen) {
                            document.addEventListener('click', closeSendMenuOnOutside);
                        } else {
                            document.removeEventListener('click', closeSendMenuOnOutside);
                        }
                    });

                    sendMenu.querySelectorAll('[data-send-mode]').forEach(function (option) {
                        option.addEventListener('click', function () {
                            sendKeyMode = this.dataset.sendMode || 'enter';
                            sendMenu.querySelectorAll('[data-send-mode]').forEach(function (item) {
                                item.classList.toggle('active', item.dataset.sendMode === sendKeyMode);
                            });
                            sendMenu.classList.remove('active');
                            document.removeEventListener('click', closeSendMenuOnOutside);
                            input.focus();
                        });
                    });
                }
            }
        }

        renderDetail(consultRecords.find(function (item) { return item.id === activeId; }) || consultRecords[0]);
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
