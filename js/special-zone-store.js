(function (global) {
    'use strict';

    var STORAGE_KEY = 'lgk_special_zones_v1';
    var PREVIEW_KEY = 'lgk_special_zone_preview_v1';

    var resourceCatalog = [
        {
            id: 'RES-CORPUS-001',
            code: 'R202607180001',
            name: '龙岗区政务服务问答语料库',
            provider: '深圳市龙岗区政务服务和数据管理局',
            category: '政务服务',
            delivery: '文件传输',
            updateCycle: '季度',
            dataSource: '加工数据',
            description: '汇聚政务服务事项咨询、办事指南与常见问答，经结构化整理形成可用于智能问答训练的中文语料资源。',
            image: 'images/ai-longgang-infographic.jpg',
            labels: ['中文语料', '问答对'],
            listedAt: '2026-07-18',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-CORPUS-002',
            code: 'R202607160006',
            name: '龙岗区产业政策文本语料集',
            provider: '深圳市龙岗区工业和信息化局',
            category: '产业政策',
            delivery: '文件传输',
            updateCycle: '月度',
            dataSource: '原始数据',
            description: '覆盖产业扶持、科技创新、专精特新等政策正文及申报指南，支持政策解析、匹配与推荐模型训练。',
            image: 'images/news-policy.jpg',
            labels: ['政策文本', '长文本'],
            listedAt: '2026-07-16',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-CORPUS-003',
            code: 'R202607120009',
            name: '企业经营知识图谱基础语料',
            provider: '深圳市龙岗区数据要素交易服务有限公司',
            category: '企业服务',
            delivery: 'API传输',
            updateCycle: '周度',
            dataSource: '加工数据',
            description: '围绕企业登记、经营范围、产业标签和关联关系形成的实体语料，可支撑企业画像与知识图谱构建。',
            image: 'images/policy-recommend.jpg',
            labels: ['实体语料', '知识图谱'],
            listedAt: '2026-07-12',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-CORPUS-004',
            code: 'R202607080012',
            name: '城市治理事件描述语料集',
            provider: '深圳市龙岗区城市管理和综合执法局',
            category: '城市治理',
            delivery: '数据库传输',
            updateCycle: '日度',
            dataSource: '原始数据',
            description: '沉淀城市部件、环境秩序和公共设施事件描述及处置结果，用于事件分类、摘要和辅助派单训练。',
            image: 'images/rec-smart-city.jpg',
            labels: ['事件文本', '分类标注'],
            listedAt: '2026-07-08',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-CORPUS-005',
            code: 'R202607050018',
            name: '公共数据开放目录说明语料',
            provider: '深圳市龙岗区政务服务和数据管理局',
            category: '公共数据',
            delivery: '文件传输',
            updateCycle: '月度',
            dataSource: '原始数据',
            description: '汇聚公共数据目录名称、摘要、字段说明及开放条件，为目录检索、语义理解和智能推荐提供训练基础。',
            image: 'images/public-data-infographic.jpg',
            labels: ['目录语料', '字段说明'],
            listedAt: '2026-07-05',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-CORPUS-006',
            code: 'R202607010021',
            name: '园区招商服务对话语料集',
            provider: '深圳市龙岗区投资推广和企业服务中心',
            category: '企业服务',
            delivery: '文件传输',
            updateCycle: '季度',
            dataSource: '加工数据',
            description: '整理园区招商、企业落地和惠企服务咨询对话，支持园区服务助手的意图识别和多轮问答训练。',
            image: 'images/smart-park.jpg',
            labels: ['多轮对话', '意图标注'],
            listedAt: '2026-07-01',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-CORPUS-007',
            code: 'R202606280025',
            name: '文化旅游场景图文语料集',
            provider: '深圳市龙岗区文化广电旅游体育局',
            category: '文化旅游',
            delivery: '文件传输',
            updateCycle: '月度',
            dataSource: '加工数据',
            description: '包含文旅场所介绍、活动资讯、图片描述和游客问答，为多模态检索与文旅智能导览提供语料。',
            image: 'images/news-industry.jpg',
            labels: ['图文语料', '多模态'],
            listedAt: '2026-06-28',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-CORPUS-008',
            code: 'R202606220031',
            name: '制造业设备运维文本语料',
            provider: '深圳市龙岗区工业互联网创新中心',
            category: '工业制造',
            delivery: '数据库传输',
            updateCycle: '周度',
            dataSource: '原始数据',
            description: '汇聚设备告警、维修记录、故障现象和处置建议，服务工业知识库建设与设备运维模型训练。',
            image: 'images/production-line-robot.jpg',
            labels: ['运维文本', '故障标注'],
            listedAt: '2026-06-22',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-CITY-001',
            code: 'R202607280041',
            name: '龙岗区城市运行事件数据集',
            provider: '深圳市龙岗区城市运行和政务服务中心',
            category: '城市治理',
            delivery: 'API传输',
            updateCycle: '日度',
            dataSource: '原始数据',
            description: '汇聚城市管理、公共设施和环境秩序等事件的受理、派单、处置与反馈信息，支撑城市运行态势分析。',
            image: 'images/rec-smart-city.jpg',
            labels: ['城市事件', '运行监测'],
            listedAt: '2026-07-28',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-CITY-002',
            code: 'R202607260043',
            name: '道路交通运行监测数据',
            provider: '深圳市龙岗区交通运输局',
            category: '交通运输',
            delivery: '数据库传输',
            updateCycle: '实时',
            dataSource: '加工数据',
            description: '提供重点道路通行速度、拥堵指数、交通流量和运行状态等指标，为交通调度和出行服务提供数据支撑。',
            image: 'images/traffic-flow.jpg',
            labels: ['交通流量', '拥堵指数'],
            listedAt: '2026-07-26',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-CITY-003',
            code: 'R202607230046',
            name: '城市部件基础信息数据集',
            provider: '深圳市龙岗区城市管理和综合执法局',
            category: '市政设施',
            delivery: '文件传输',
            updateCycle: '月度',
            dataSource: '原始数据',
            description: '覆盖道路、桥梁、井盖、路灯和环卫设施等城市部件的空间位置、属性信息及管理责任单位。',
            image: 'images/production-line-cim.jpg',
            labels: ['城市部件', '空间位置'],
            listedAt: '2026-07-23',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-CITY-004',
            code: 'R202607200048',
            name: '重点商圈客流热力数据',
            provider: '深圳市龙岗区商务局',
            category: '商圈运营',
            delivery: 'API传输',
            updateCycle: '日度',
            dataSource: '加工数据',
            description: '形成重点商圈分时客流、停留时长、来源分布和节假日变化趋势，为商业布局与活动运营提供参考。',
            image: 'images/night-light.jpg',
            labels: ['客流热力', '商圈分析'],
            listedAt: '2026-07-20',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-CITY-005',
            code: 'R202607170052',
            name: '市政设施巡检工单数据',
            provider: '深圳市龙岗区城市管理和综合执法局',
            category: '市政设施',
            delivery: '数据库传输',
            updateCycle: '日度',
            dataSource: '原始数据',
            description: '记录市政设施日常巡检、问题发现、维修处置和复核结果，支持设施运维质量评估与风险排查。',
            image: 'images/consult-governance.jpg',
            labels: ['巡检工单', '设施运维'],
            listedAt: '2026-07-17',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-CITY-006',
            code: 'R202607140055',
            name: '城市内涝风险监测数据',
            provider: '深圳市龙岗区水务局',
            category: '防汛排涝',
            delivery: 'API传输',
            updateCycle: '实时',
            dataSource: '加工数据',
            description: '整合降雨、水位、积水点和排水设施运行信息，输出内涝风险等级和重点区域监测指标。',
            image: 'images/water-analysis.jpg',
            labels: ['内涝监测', '风险等级'],
            listedAt: '2026-07-14',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-HEALTH-001',
            code: 'R202607270061',
            name: '龙岗区医疗机构基础信息数据集',
            provider: '深圳市龙岗区卫生健康局',
            category: '医疗资源',
            delivery: 'API传输',
            updateCycle: '月度',
            dataSource: '原始数据',
            description: '提供辖区医疗机构名称、类别、等级、地址、服务时间和重点科室等基础信息，便于医疗资源查询。',
            image: 'images/rec-healthcare.jpg',
            labels: ['医疗机构', '资源目录'],
            listedAt: '2026-07-27',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-HEALTH-002',
            code: 'R202607240064',
            name: '医疗服务能力运行统计数据',
            provider: '深圳市龙岗区卫生健康局',
            category: '医疗服务',
            delivery: '数据库传输',
            updateCycle: '月度',
            dataSource: '加工数据',
            description: '汇总门急诊服务量、床位使用、重点专科和服务效率等统计指标，反映辖区医疗服务运行情况。',
            image: 'images/solution-healthcare.jpg',
            labels: ['服务能力', '运行统计'],
            listedAt: '2026-07-24',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-HEALTH-003',
            code: 'R202607210067',
            name: '公共卫生监测指标数据集',
            provider: '深圳市龙岗区疾病预防控制中心',
            category: '公共卫生',
            delivery: 'API传输',
            updateCycle: '周度',
            dataSource: '加工数据',
            description: '提供重点公共卫生指标、监测趋势和区域分布等汇总信息，服务公共卫生风险研判与资源调配。',
            image: 'images/space-hero-health.jpg',
            labels: ['公共卫生', '趋势监测'],
            listedAt: '2026-07-21',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-HEALTH-004',
            code: 'R202607180070',
            name: '医疗资源利用效率数据',
            provider: '深圳市龙岗区卫生健康数据中心',
            category: '医疗资源',
            delivery: '文件传输',
            updateCycle: '季度',
            dataSource: '加工数据',
            description: '围绕床位、设备、科室和人员等医疗资源形成利用率与供需结构指标，支撑资源配置优化。',
            image: 'images/economic-monitor.jpg',
            labels: ['资源利用', '供需分析'],
            listedAt: '2026-07-18',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-HEALTH-005',
            code: 'R202607150073',
            name: '药品供应保障监测数据',
            provider: '深圳市龙岗区药品供应保障中心',
            category: '药品保障',
            delivery: '数据库传输',
            updateCycle: '日度',
            dataSource: '原始数据',
            description: '汇聚重点药品库存、供应周期和配送状态等信息，为药品供应保障和异常短缺预警提供依据。',
            image: 'images/product-detail-hero.jpg',
            labels: ['药品供应', '库存监测'],
            listedAt: '2026-07-15',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-HEALTH-006',
            code: 'R202607120076',
            name: '老年健康服务统计数据集',
            provider: '深圳市龙岗区卫生健康局',
            category: '健康养老',
            delivery: '文件传输',
            updateCycle: '季度',
            dataSource: '加工数据',
            description: '统计老年健康管理、家庭医生服务和医养结合机构服务情况，支撑健康养老服务规划与评估。',
            image: 'images/space-hero-health.jpg',
            labels: ['健康养老', '服务统计'],
            listedAt: '2026-07-12',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-ROBOT-001',
            code: 'R202607290081',
            name: '工业机器人作业轨迹数据集',
            provider: '深圳市龙岗区工业互联网创新中心',
            category: '机器人控制',
            delivery: '数据库传输',
            updateCycle: '日度',
            dataSource: '原始数据',
            description: '记录工业机器人在装配、搬运和检测任务中的关节位置、速度、力矩及作业结果，支持控制策略训练。',
            image: 'images/production-line-robot.jpg',
            labels: ['作业轨迹', '控制训练'],
            listedAt: '2026-07-29',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-ROBOT-002',
            code: 'R202607260084',
            name: '机械臂抓取图像标注集',
            provider: '深圳市龙岗区人工智能数据标注基地',
            category: '机器视觉',
            delivery: '文件传输',
            updateCycle: '月度',
            dataSource: '加工数据',
            description: '包含多类工业物体、抓取姿态、关键点和遮挡关系标注，可用于机械臂视觉感知与抓取模型训练。',
            image: 'images/space-hero-robot.jpg',
            labels: ['抓取图像', '姿态标注'],
            listedAt: '2026-07-26',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-ROBOT-003',
            code: 'R202607230087',
            name: '移动机器人室内导航数据',
            provider: '深圳市龙岗区机器人产业园',
            category: '自主导航',
            delivery: '文件传输',
            updateCycle: '周度',
            dataSource: '原始数据',
            description: '提供室内地图、激光点云、视觉里程计、定位轨迹和避障事件等数据，支持移动机器人导航算法训练。',
            image: 'images/iot-platform.jpg',
            labels: ['室内导航', '定位轨迹'],
            listedAt: '2026-07-23',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-ROBOT-004',
            code: 'R202607200090',
            name: '机器人视觉缺陷检测样本集',
            provider: '深圳市龙岗区智能制造公共技术平台',
            category: '机器视觉',
            delivery: '文件传输',
            updateCycle: '月度',
            dataSource: '加工数据',
            description: '覆盖电子元件、精密零部件和包装外观等常见缺陷类型，提供图像、缺陷区域与分类标签。',
            image: 'images/solution-manufacturing.jpg',
            labels: ['缺陷检测', '图像标注'],
            listedAt: '2026-07-20',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-ROBOT-005',
            code: 'R202607170093',
            name: '人机协作安全事件数据集',
            provider: '深圳市龙岗区安全生产技术服务中心',
            category: '协作安全',
            delivery: 'API传输',
            updateCycle: '周度',
            dataSource: '原始数据',
            description: '记录人机协作场景中的距离告警、急停、碰撞风险和处置结果，为安全策略优化提供数据基础。',
            image: 'images/production-line-governance.jpg',
            labels: ['协作安全', '风险事件'],
            listedAt: '2026-07-17',
            status: 'listed',
            href: 'data-detail.html'
        },
        {
            id: 'RES-ROBOT-006',
            code: 'R202607140096',
            name: '机器人设备运行日志数据',
            provider: '深圳市龙岗区工业互联网创新中心',
            category: '设备运维',
            delivery: '数据库传输',
            updateCycle: '实时',
            dataSource: '原始数据',
            description: '汇聚控制器状态、传感器读数、故障代码和维护记录，为设备健康评估和故障预测提供基础数据。',
            image: 'images/realtime-data.jpg',
            labels: ['运行日志', '故障代码'],
            listedAt: '2026-07-14',
            status: 'listed',
            href: 'data-detail.html'
        }
    ];

    var productCatalog = [
        {
            id: 'PROD-CORPUS-001',
            code: 'P202607180001',
            name: '行业语料智能检索服务',
            provider: '深圳市龙岗区数据要素交易服务有限公司',
            category: '语料检索',
            delivery: 'API传输',
            updateCycle: '次/天',
            productType: 'API',
            price: '0.08元/次',
            description: '提供跨语料库的语义检索、相似问句召回和片段定位能力，支持业务系统快速接入行业知识。',
            image: 'images/data-chain.jpg',
            labels: ['语义检索', 'API'],
            listedAt: '2026-07-18',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-CORPUS-002',
            code: 'P202607150004',
            name: '企业知识库语料治理产品',
            provider: '深圳市龙岗区数据要素交易服务有限公司',
            category: '语料治理',
            delivery: '文件传输',
            updateCycle: '次/月',
            productType: '数据包',
            price: '面议',
            description: '面向企业制度、产品资料和客服知识，提供清洗、切分、去重、标签化及知识库入库成果。',
            image: 'images/data-factory-overview.png',
            labels: ['数据治理', '知识库'],
            listedAt: '2026-07-15',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-CORPUS-003',
            code: 'P202607110007',
            name: '政务问答模型训练数据包',
            provider: '深圳市龙岗区政务数据运营有限公司',
            category: '模型训练',
            delivery: '文件传输',
            updateCycle: '次/季度',
            productType: '数据包',
            price: '12万元/套',
            description: '提供经过脱敏、审核和质量抽检的政务问答训练样本，包含意图、事项和标准答案等标注。',
            image: 'images/hero-ai-longgang.jpg',
            labels: ['模型训练', '问答数据'],
            listedAt: '2026-07-11',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-CORPUS-004',
            code: 'P202607070011',
            name: '政策文本智能解析API',
            provider: '深圳市龙岗区数字经济研究院',
            category: '文本解析',
            delivery: 'API传输',
            updateCycle: '次/天',
            productType: 'API',
            price: '0.12元/次',
            description: '支持政策条款拆解、申报条件抽取、适用企业识别及政策标签生成，输出结构化解析结果。',
            image: 'images/rec-policy-ai.jpg',
            labels: ['政策解析', 'API'],
            listedAt: '2026-07-07',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-CORPUS-005',
            code: 'P202607030014',
            name: '中文文本质量评估工具',
            provider: '深圳市龙岗区人工智能产业协会',
            category: '质量评估',
            delivery: 'API传输',
            updateCycle: '次/周',
            productType: 'API',
            price: '0.05元/次',
            description: '从完整性、一致性、重复度、敏感内容和可训练性等维度输出中文语料质量评分及问题明细。',
            image: 'images/credit-data.jpg',
            labels: ['质量评估', '智能检测'],
            listedAt: '2026-07-03',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-CORPUS-006',
            code: 'P202606290019',
            name: '多模态语料标注成果包',
            provider: '深圳市龙岗区数据标注产业中心',
            category: '语料标注',
            delivery: '文件传输',
            updateCycle: '次/月',
            productType: '数据包',
            price: '面议',
            description: '交付图文匹配、目标描述和场景标签等多模态标注成果，适用于视觉语言模型训练和效果评测。',
            image: 'images/data-scenario-arch.png',
            labels: ['多模态', '标注成果'],
            listedAt: '2026-06-29',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-CORPUS-007',
            code: 'P202606250023',
            name: '客服对话意图识别数据产品',
            provider: '深圳市龙岗区企业服务中心',
            category: '模型训练',
            delivery: '数据库传输',
            updateCycle: '次/季度',
            productType: '数据库',
            price: '8万元/年',
            description: '提供企业服务咨询场景的多轮对话、意图分类和关键槽位标注，支撑客服模型训练与评测。',
            image: 'images/realtime-data.jpg',
            labels: ['意图识别', '多轮对话'],
            listedAt: '2026-06-25',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-CORPUS-008',
            code: 'P202606190028',
            name: '工业运维知识抽取服务',
            provider: '深圳市龙岗区工业互联网创新中心',
            category: '文本解析',
            delivery: 'API传输',
            updateCycle: '次/周',
            productType: 'API',
            price: '0.15元/次',
            description: '从设备说明、故障记录和维修工单中抽取设备、部件、故障及处置关系，形成工业知识结构。',
            image: 'images/production-line-governance.jpg',
            labels: ['知识抽取', '工业语料'],
            listedAt: '2026-06-19',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-CITY-001',
            code: 'P202607280041',
            name: '城市运行态势综合监测 API',
            provider: '深圳市龙岗区数据要素交易服务有限公司',
            category: '城市治理',
            delivery: 'API传输',
            updateCycle: '次/天',
            productType: 'API',
            price: '0.10元/次',
            description: '提供城市事件、交通运行、市政设施和重点区域等综合态势指标，支持治理平台按需调用。',
            image: 'images/data-screen.jpg',
            labels: ['运行态势', '综合监测'],
            listedAt: '2026-07-28 09:20:00',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-CITY-002',
            code: 'P202607250044',
            name: '道路拥堵指数数据产品',
            provider: '深圳市龙岗区智慧交通运营中心',
            category: '交通分析',
            delivery: 'API传输',
            updateCycle: '次/天',
            productType: 'API',
            price: '0.08元/次',
            description: '按道路和时段提供拥堵指数、平均速度、运行等级及趋势变化，服务交通调度和出行应用。',
            image: 'images/rec-traffic-data.jpg',
            labels: ['拥堵指数', '道路运行'],
            listedAt: '2026-07-25 14:10:00',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-CITY-003',
            code: 'P202607220047',
            name: '城市事件智能分类服务',
            provider: '深圳市龙岗区城市运行和政务服务中心',
            category: '智能派单',
            delivery: 'API传输',
            updateCycle: '次/周',
            productType: 'API',
            price: '0.06元/次',
            description: '基于事件描述自动识别事件类型、责任单位和处置优先级，辅助城市治理事件快速派单。',
            image: 'images/rec-governance.jpg',
            labels: ['事件分类', '智能派单'],
            listedAt: '2026-07-22 11:35:00',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-CITY-004',
            code: 'P202607190050',
            name: '市政设施风险预警数据包',
            provider: '深圳市龙岗区城市管理和综合执法局',
            category: '风险预警',
            delivery: '文件传输',
            updateCycle: '次/月',
            productType: '数据包',
            price: '6万元/年',
            description: '综合设施属性、巡检工单和历史故障形成风险等级、重点清单及维护建议，支持预防性运维。',
            image: 'images/consult-governance.jpg',
            labels: ['设施风险', '运维预警'],
            listedAt: '2026-07-19 15:40:00',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-CITY-005',
            code: 'P202607160053',
            name: '重点商圈客流分析报告',
            provider: '深圳市龙岗区商业数据服务中心',
            category: '商圈分析',
            delivery: '文件传输',
            updateCycle: '次/月',
            productType: '数据报告',
            price: '1.8万元/期',
            description: '分析重点商圈客流规模、时段分布、停留特征和节假日变化，为招商运营与活动策划提供参考。',
            image: 'images/night-light.jpg',
            labels: ['客流分析', '商业运营'],
            listedAt: '2026-07-16 10:25:00',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-CITY-006',
            code: 'P202607130056',
            name: '城市治理专题指标数据集',
            provider: '深圳市龙岗区政务数据运营有限公司',
            category: '城市治理',
            delivery: '数据库传输',
            updateCycle: '次/季度',
            productType: '数据集',
            price: '9万元/年',
            description: '围绕事件处置、交通运行、市政运维和公共安全形成统一口径的城市治理专题指标。',
            image: 'images/production-line-cim.jpg',
            labels: ['专题指标', '统一口径'],
            listedAt: '2026-07-13 16:00:00',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-HEALTH-001',
            code: 'P202607270061',
            name: '区域医疗资源智能检索 API',
            provider: '深圳市龙岗区卫生健康数据中心',
            category: '医疗资源',
            delivery: 'API传输',
            updateCycle: '次/天',
            productType: 'API',
            price: '0.05元/次',
            description: '支持按机构类别、服务科室、所在区域和服务时间检索辖区医疗资源，便于业务系统快速接入。',
            image: 'images/rec-healthcare.jpg',
            labels: ['医疗检索', '资源查询'],
            listedAt: '2026-07-27 10:15:00',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-HEALTH-002',
            code: 'P202607240064',
            name: '医疗机构服务能力画像数据集',
            provider: '深圳市龙岗区卫生健康局',
            category: '医疗服务',
            delivery: '数据库传输',
            updateCycle: '次/月',
            productType: '数据集',
            price: '8万元/年',
            description: '从机构规模、重点科室、服务效率和资源利用等维度形成医疗机构服务能力画像与对比指标。',
            image: 'images/solution-healthcare.jpg',
            labels: ['机构画像', '能力评价'],
            listedAt: '2026-07-24 13:50:00',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-HEALTH-003',
            code: 'P202607210067',
            name: '公共卫生趋势分析报告',
            provider: '深圳市龙岗区疾病预防控制中心',
            category: '公共卫生',
            delivery: '文件传输',
            updateCycle: '次/月',
            productType: '数据报告',
            price: '2万元/期',
            description: '围绕重点公共卫生指标形成时间趋势、区域分布和异常变化分析，为监测研判提供参考。',
            image: 'images/space-hero-health.jpg',
            labels: ['趋势分析', '公共卫生'],
            listedAt: '2026-07-21 09:40:00',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-HEALTH-004',
            code: 'P202607180070',
            name: '药品供应风险预警 API',
            provider: '深圳市龙岗区药品供应保障中心',
            category: '药品保障',
            delivery: 'API传输',
            updateCycle: '次/天',
            productType: 'API',
            price: '0.09元/次',
            description: '根据库存水平、消耗速度和补货周期输出重点药品供应风险等级及预警信息。',
            image: 'images/product-detail-hero.jpg',
            labels: ['供应预警', '药品库存'],
            listedAt: '2026-07-18 15:25:00',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-HEALTH-005',
            code: 'P202607150073',
            name: '医养结合服务分析数据包',
            provider: '深圳市龙岗区健康养老服务中心',
            category: '健康养老',
            delivery: '文件传输',
            updateCycle: '次/季度',
            productType: '数据包',
            price: '5万元/套',
            description: '提供医养结合机构分布、服务能力、覆盖情况及供需结构等指标，支持健康养老服务规划。',
            image: 'images/space-hero-health.jpg',
            labels: ['医养结合', '供需结构'],
            listedAt: '2026-07-15 11:30:00',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-HEALTH-006',
            code: 'P202607120076',
            name: '医疗资源供需评估模型',
            provider: '深圳市龙岗区数字健康研究院',
            category: '资源评估',
            delivery: '数据库传输',
            updateCycle: '次/季度',
            productType: '数据模型',
            price: '面议',
            description: '结合人口结构、服务半径和机构能力评估区域医疗资源供需匹配程度，输出配置优化建议。',
            image: 'images/data-scenario-arch.png',
            labels: ['供需评估', '资源规划'],
            listedAt: '2026-07-12 14:20:00',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-ROBOT-001',
            code: 'P202607290081',
            name: '机械臂抓取训练数据包',
            provider: '深圳市龙岗区人工智能数据标注基地',
            category: '模型训练',
            delivery: '文件传输',
            updateCycle: '次/月',
            productType: '数据包',
            price: '12万元/套',
            description: '提供多物体、多姿态和多遮挡场景的抓取图像、关键点与成功标签，适用于抓取模型训练评测。',
            image: 'images/space-hero-robot.jpg',
            labels: ['抓取训练', '姿态标注'],
            listedAt: '2026-07-29 09:30:00',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-ROBOT-002',
            code: 'P202607260084',
            name: '机器人视觉识别 API',
            provider: '深圳市龙岗区智能制造公共技术平台',
            category: '机器视觉',
            delivery: 'API传输',
            updateCycle: '次/天',
            productType: 'API',
            price: '0.18元/次',
            description: '提供工业物体识别、缺陷检测、关键点定位和结果置信度输出，支持机器人视觉系统快速接入。',
            image: 'images/solution-manufacturing.jpg',
            labels: ['视觉识别', '缺陷检测'],
            listedAt: '2026-07-26 14:45:00',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-ROBOT-003',
            code: 'P202607230087',
            name: '移动机器人导航场景数据集',
            provider: '深圳市龙岗区机器人产业园',
            category: '自主导航',
            delivery: '数据库传输',
            updateCycle: '次/周',
            productType: '数据集',
            price: '10万元/年',
            description: '覆盖园区、仓储和办公环境的地图、定位轨迹、动态障碍及导航任务结果，服务导航算法训练。',
            image: 'images/iot-platform.jpg',
            labels: ['导航场景', '动态避障'],
            listedAt: '2026-07-23 10:50:00',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-ROBOT-004',
            code: 'P202607200090',
            name: '机器人设备故障预测服务',
            provider: '深圳市龙岗区工业互联网创新中心',
            category: '设备运维',
            delivery: 'API传输',
            updateCycle: '次/天',
            productType: 'API',
            price: '0.20元/次',
            description: '基于运行日志和传感器指标评估关键部件健康状态，输出故障风险、影响因素和维护建议。',
            image: 'images/production-line-governance.jpg',
            labels: ['故障预测', '健康评估'],
            listedAt: '2026-07-20 16:10:00',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-ROBOT-005',
            code: 'P202607170093',
            name: '机器人仿真训练场景库',
            provider: '深圳市龙岗区具身智能创新中心',
            category: '仿真训练',
            delivery: '文件传输',
            updateCycle: '次/月',
            productType: '数据库',
            price: '面议',
            description: '提供装配、搬运、巡检和人机协作等可配置仿真场景，支持训练任务生成与策略验证。',
            image: 'images/production-line-robot.jpg',
            labels: ['仿真场景', '策略训练'],
            listedAt: '2026-07-17 13:35:00',
            status: 'listed',
            href: 'product-detail.html'
        },
        {
            id: 'PROD-ROBOT-006',
            code: 'P202607140096',
            name: '具身智能数据质量评估报告',
            provider: '深圳市龙岗区人工智能产业协会',
            category: '质量评估',
            delivery: '文件传输',
            updateCycle: '次/季度',
            productType: '数据报告',
            price: '3万元/期',
            description: '从场景覆盖、标注一致性、轨迹有效性和训练适用性等维度评估具身智能数据质量。',
            image: 'images/data-factory-overview.png',
            labels: ['质量评估', '训练适用性'],
            listedAt: '2026-07-14 11:05:00',
            status: 'listed',
            href: 'product-detail.html'
        }
    ];

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function nowText() {
        var date = new Date();
        var pad = function (value) { return String(value).padStart(2, '0'); };
        return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + ' '
            + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
    }

    function makeDefaultZones() {
        return [
            {
                id: 'corpus-data-zone',
                name: '语料数据专区',
                introduction: '汇聚政务服务、产业政策、企业经营与城市治理等高质量语料资源，面向大模型训练、企业知识库建设、智能问答和语义检索等场景，提供可检索、可组合、可持续运营的语料数据与产品服务。',
                cover: 'images/hero-ai-longgang.jpg',
                sort: 1,
                status: 'published',
                resourceIds: resourceCatalog.slice(0, 7).map(function (item) { return item.id; }),
                productIds: productCatalog.slice(0, 7).map(function (item) { return item.id; }),
                updatedAt: '2026-07-29 10:30:00',
                updatedBy: '运营管理员'
            },
            {
                id: 'city-governance-zone',
                name: '城市治理专区',
                introduction: '聚合城市运行、交通管理、市政设施、商圈客流和防汛排涝等治理数据，面向城市态势监测、事件协同处置、风险预警和精细化运营场景，提供统一、及时、可组合的数据资源与产品服务。',
                cover: 'images/production-line-cim.jpg',
                sort: 2,
                status: 'published',
                resourceIds: [
                    'RES-CITY-001', 'RES-CITY-002', 'RES-CITY-003',
                    'RES-CITY-004', 'RES-CITY-005', 'RES-CITY-006'
                ],
                productIds: [
                    'PROD-CITY-001', 'PROD-CITY-002', 'PROD-CITY-003',
                    'PROD-CITY-004', 'PROD-CITY-005', 'PROD-CITY-006'
                ],
                updatedAt: '2026-07-29 11:00:00',
                updatedBy: '运营管理员'
            },
            {
                id: 'medical-health-zone',
                name: '医疗健康专区',
                introduction: '汇聚医疗机构、服务能力、公共卫生、药品保障和健康养老等主题数据，服务医疗资源查询、运行分析、供需评估和健康服务规划，推动医疗健康数据在合规场景下释放应用价值。',
                cover: 'images/space-hero-health.jpg',
                sort: 3,
                status: 'published',
                resourceIds: [
                    'RES-HEALTH-001', 'RES-HEALTH-002', 'RES-HEALTH-003',
                    'RES-HEALTH-004', 'RES-HEALTH-005', 'RES-HEALTH-006'
                ],
                productIds: [
                    'PROD-HEALTH-001', 'PROD-HEALTH-002', 'PROD-HEALTH-003',
                    'PROD-HEALTH-004', 'PROD-HEALTH-005', 'PROD-HEALTH-006'
                ],
                updatedAt: '2026-07-29 11:10:00',
                updatedBy: '运营管理员'
            },
            {
                id: 'embodied-intelligence-zone',
                name: '具身智能专区',
                introduction: '汇聚机器人轨迹、机器视觉、自主导航、人机协作和设备运行等高质量数据，面向感知、决策、控制、仿真训练与设备运维场景，为具身智能模型研发和产业应用提供数据支撑。',
                cover: 'images/space-hero-robot.jpg',
                sort: 4,
                status: 'published',
                resourceIds: [
                    'RES-ROBOT-001', 'RES-ROBOT-002', 'RES-ROBOT-003',
                    'RES-ROBOT-004', 'RES-ROBOT-005', 'RES-ROBOT-006'
                ],
                productIds: [
                    'PROD-ROBOT-001', 'PROD-ROBOT-002', 'PROD-ROBOT-003',
                    'PROD-ROBOT-004', 'PROD-ROBOT-005', 'PROD-ROBOT-006'
                ],
                updatedAt: '2026-07-29 11:20:00',
                updatedBy: '运营管理员'
            }
        ];
    }

    function makeDefaultState() {
        return {
            version: 2,
            zones: makeDefaultZones(),
            resources: clone(resourceCatalog),
            products: clone(productCatalog)
        };
    }

    function read() {
        try {
            var raw = global.localStorage.getItem(STORAGE_KEY);
            if (!raw) return makeDefaultState();
            var state = JSON.parse(raw);
            if (!state || !Array.isArray(state.zones)) return makeDefaultState();
            var mergeCatalog = function (saved, defaults) {
                var current = Array.isArray(saved) ? saved : [];
                var merged = defaults.map(function (defaultItem) {
                    var savedItem = current.find(function (item) { return item.id === defaultItem.id; });
                    return Object.assign({}, defaultItem, savedItem || {});
                });
                current.forEach(function (item) {
                    if (!merged.some(function (mergedItem) { return mergedItem.id === item.id; })) {
                        merged.push(item);
                    }
                });
                return merged;
            };
            state.resources = mergeCatalog(state.resources, resourceCatalog);
            state.products = mergeCatalog(state.products, productCatalog);
            if (Number(state.version || 1) < 2) {
                makeDefaultZones().forEach(function (defaultZone) {
                    if (!state.zones.some(function (zone) { return zone.id === defaultZone.id; })) {
                        state.zones.push(defaultZone);
                    }
                });
                state.version = 2;
                global.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            }
            return state;
        } catch (error) {
            return makeDefaultState();
        }
    }

    function write(state) {
        global.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        global.dispatchEvent(new CustomEvent('special-zone-store-change', { detail: clone(state) }));
        return clone(state);
    }

    function listZones() {
        return read().zones.slice().sort(function (a, b) {
            return Number(a.sort || 0) - Number(b.sort || 0);
        });
    }

    function getZone(id) {
        return listZones().find(function (zone) { return zone.id === id; }) || null;
    }

    function saveZone(zone) {
        var state = read();
        var record = clone(zone);
        record.updatedAt = nowText();
        record.updatedBy = record.updatedBy || '运营管理员';
        var index = state.zones.findIndex(function (item) { return item.id === record.id; });
        if (index === -1) state.zones.push(record);
        else state.zones[index] = record;
        write(state);
        return clone(record);
    }

    function removeZone(id) {
        var state = read();
        state.zones = state.zones.filter(function (zone) { return zone.id !== id; });
        write(state);
    }

    function makeZoneId(name) {
        var normalized = String(name || 'special-zone')
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
            .replace(/^-|-$/g, '');
        return (normalized || 'special-zone') + '-' + Date.now().toString(36);
    }

    function reset() {
        return write(makeDefaultState());
    }

    function setPreview(zone) {
        try {
            global.sessionStorage.setItem(PREVIEW_KEY, JSON.stringify(zone));
        } catch (error) {
            return false;
        }
        return true;
    }

    function getPreview(id) {
        try {
            var raw = global.sessionStorage.getItem(PREVIEW_KEY);
            if (!raw) return null;
            var zone = JSON.parse(raw);
            return zone && zone.id === id ? zone : null;
        } catch (error) {
            return null;
        }
    }

    global.SpecialZoneStore = {
        key: STORAGE_KEY,
        read: read,
        write: write,
        listZones: listZones,
        getZone: getZone,
        saveZone: saveZone,
        removeZone: removeZone,
        makeZoneId: makeZoneId,
        reset: reset,
        setPreview: setPreview,
        getPreview: getPreview,
        nowText: nowText
    };
})(window);
