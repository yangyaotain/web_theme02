(function () {
    'use strict';

    var SAMPLE_OUTPUT_ROOT = 'outputs/019fa0fb-0add-75a2-85a0-b0e49bf3fdcd/';
    var OTHER_SAMPLE_FILES = [
        {
            name: '龙岗区产业运行分析样例报告.pdf',
            meta: 'PDF 文件 · 产业运行分析报告',
            href: 'output/pdf/龙岗区产业运行分析样例报告.pdf'
        },
        {
            name: '龙岗区产业运行指标口径.csv',
            meta: 'CSV 文件 · 5 项核心指标口径',
            href: 'output/samples/龙岗区产业运行指标口径.csv'
        },
        {
            name: '龙岗区产业运行分析样例说明.txt',
            meta: 'TXT 文件 · 样例内容与使用说明',
            href: 'output/samples/龙岗区产业运行分析样例说明.txt'
        }
    ];

    function buildFeatureIntroduction(config) {
        function cards(type, items) {
            return (items || []).map(function (item) {
                return {
                    type: type,
                    title: item[0],
                    desc: item[1],
                    icon: item[2] || ''
                };
            });
        }
        return {
            sections: [
                {
                    title: config.highlightTitle,
                    content: config.highlightContent,
                    cards: cards('icon', config.highlights)
                },
                {
                    title: config.flowTitle,
                    content: config.flowContent,
                    cards: cards('sequence', config.flow)
                },
                {
                    title: config.sceneTitle,
                    content: config.sceneContent,
                    cards: cards('integrated', config.scenes)
                }
            ]
        };
    }

    var FEATURE_INTRODUCTIONS = {
        productDataset: buildFeatureIntroduction({
            highlightTitle: '核心能力',
            highlightContent: '数据集覆盖商圈、公园、交通枢纽和大型活动场地等典型区域，突出聚合统计、趋势分析与安全使用能力。',
            highlights: [
                ['多场景点位汇聚', '统一汇聚不同公共场所的点位编码、区域类型与分时段统计结果。', 'images/consult-advantage-scenario.png'],
                ['密度等级标准化', '按统一口径输出正常、较高、拥挤等密度等级，便于跨区域比较。', 'images/consult-advantage-design.png'],
                ['聚集状态可追踪', '保留统计时段与预警状态，可用于回溯重点区域的人群变化过程。', 'images/consult-advantage-operation.png'],
                ['聚合脱敏处理', '仅提供聚合统计结果，不包含可直接识别个人身份的原始影像。', 'images/consult-advantage-delivery.png']
            ],
            flowTitle: '应用流程',
            flowContent: '从场景选择到分析应用形成连续使用路径，适配城市运行研判和活动保障等业务。',
            flow: [
                ['选择监测范围', '按区域类型、点位和时间范围确定本次分析对象。'],
                ['获取聚合数据', '通过文件交付获取客流量、密度等级与预警状态。'],
                ['识别异常趋势', '对比不同点位和时段，定位持续上升或短时聚集区域。'],
                ['形成研判结果', '结合现场管理要求输出调度、疏导和活动保障参考。']
            ],
            sceneTitle: '典型场景',
            sceneContent: '以下场景用于说明数据产品的主要应用方向。',
            scenes: [
                ['城市运行监测', '辅助观察重点商圈、公园和交通枢纽的人群密度变化，为日常运行调度提供数据参考。'],
                ['大型活动保障', '分析活动前后重点区域的人群聚集趋势，支持现场力量安排和分级响应。'],
                ['公共空间评估', '结合分时段客流变化评估公共空间使用特征，为设施布局优化提供参考。']
            ]
        }),
        productApi: buildFeatureIntroduction({
            highlightTitle: '接口能力',
            highlightContent: '接口围绕稳定查询、统一指标和安全调用进行设计，可直接嵌入现有业务系统。',
            highlights: [
                ['统一指标输出', '以结构化 JSON 返回企业活力指数、经营状态和统计日期。', 'images/consult-advantage-design.png'],
                ['按企业精准查询', '支持按企业统一编码查询，减少名称匹配造成的歧义。', 'images/consult-advantage-scenario.png'],
                ['每日更新', '指标按日更新，满足企业服务与园区运营的常态化查询需求。', 'images/consult-advantage-operation.png'],
                ['网关安全控制', '通过数据岛网关鉴权、限流和链路标识保障接口调用安全。', 'images/consult-advantage-delivery.png']
            ],
            flowTitle: '接入流程',
            flowContent: '调用方完成授权后即可按照标准接口流程接入。',
            flow: [
                ['申请调用权限', '提交业务场景、调用系统和预计频次等信息。'],
                ['获取调用凭证', '审核通过后领取数据岛接口地址与鉴权凭证。'],
                ['完成联调验证', '使用示例参数验证请求格式、返回字段和异常码。'],
                ['接入业务系统', '上线后按授权范围调用，并通过请求标识追踪使用情况。']
            ],
            sceneTitle: '业务用途',
            sceneContent: '接口适合需要在业务过程中即时获取企业活力指标的应用。',
            scenes: [
                ['企业服务分层', '在企业服务平台中结合活力指数识别不同经营状态的企业，辅助配置差异化服务。'],
                ['园区运营分析', '汇总园区企业经营活力变化，辅助发现重点企业和异常波动。'],
                ['产业趋势监测', '按行业或区域汇总活力指标，为产业运行分析提供结构化数据输入。']
            ]
        }),
        productOther: buildFeatureIntroduction({
            highlightTitle: '报告亮点',
            highlightContent: '资料兼顾分析结论、指标解释与使用说明，便于不同业务角色快速理解。',
            highlights: [
                ['结构清晰', '按产业结构、企业活跃度和园区运行组织主要分析内容。', 'images/consult-advantage-design.png'],
                ['口径配套', '同步提供核心指标定义、计算说明和适用范围。', 'images/consult-advantage-delivery.png'],
                ['图表结合', '通过趋势图、结构图和重点指标卡片呈现主要发现。', 'images/consult-advantage-scenario.png'],
                ['便于复用', '报告、指标口径和说明文件可分别用于汇报、研究和内部沟通。', 'images/consult-advantage-operation.png']
            ],
            flowTitle: '使用流程',
            flowContent: '使用方可根据研究主题选取报告内容和配套口径。',
            flow: [
                ['确认分析范围', '明确产业、街道、园区和统计周期等关注范围。'],
                ['阅读核心结论', '通过摘要和关键图表掌握产业运行的主要变化。'],
                ['核对指标口径', '结合口径文件理解指标来源、范围和计算方式。'],
                ['形成业务材料', '按授权范围引用分析结果，形成内部研判或汇报材料。']
            ],
            sceneTitle: '适用场景',
            sceneContent: '面向需要快速了解区域产业运行情况的研究和管理工作。',
            scenes: [
                ['产业运行研判', '用于观察重点产业规模、企业活跃度和结构变化，为阶段性研判提供参考。'],
                ['园区运营复盘', '对比园区企业结构和运行指标，辅助识别运营重点与服务方向。'],
                ['专题汇报支撑', '选取报告结论和指标图表，支持内部会议、专题研究和工作汇报。']
            ]
        }),
        resourceDataset: buildFeatureIntroduction({
            highlightTitle: '数据特色',
            highlightContent: '资源突出统一标识、空间定位、属性完整和持续更新四项能力。',
            highlights: [
                ['逻辑单体统一标识', '为每个建筑物逻辑单体配置稳定编码，便于跨业务关联。', 'images/consult-advantage-design.png'],
                ['空间位置标准化', '提供中心点坐标及行政区划、街道等空间归属信息。', 'images/consult-advantage-scenario.png'],
                ['基础属性完整', '覆盖建筑名称、楼层、面积和建成年份等常用管理属性。', 'images/consult-advantage-delivery.png'],
                ['季度更新校核', '结合变化数据按季度更新，并对异常坐标和属性进行复核。', 'images/consult-advantage-operation.png']
            ],
            flowTitle: '更新与质量流程',
            flowContent: '通过标准化处理流程保持建筑空间数据的一致性和可用性。',
            flow: [
                ['来源汇聚', '汇集建筑物空间位置与相关基础属性。'],
                ['标识匹配', '按照逻辑单体规则完成对象识别和编码关联。'],
                ['质量校验', '检查坐标范围、字段完整性和属性逻辑关系。'],
                ['版本更新', '形成季度更新版本并记录主要变化情况。']
            ],
            sceneTitle: '应用场景',
            sceneContent: '标准化建筑物对象可作为多类城市治理业务的空间关联基础。',
            scenes: [
                ['城市空间底图', '将建筑物逻辑单体作为统一空间对象，支撑多来源业务数据上图和关联展示。'],
                ['公共设施服务', '结合建筑物位置和属性分析设施覆盖范围，辅助公共服务资源配置。'],
                ['空间规划分析', '按街道、区域和建筑属性开展结构统计，为规划评估提供数据基础。']
            ]
        }),
        resourceApi: buildFeatureIntroduction({
            highlightTitle: '接口特色',
            highlightContent: '资源以标准字段、实时响应和安全授权为重点，降低企业信息接入成本。',
            highlights: [
                ['标准企业编码', '以企业统一编码作为主要查询条件，保证跨系统对象一致。', 'images/consult-advantage-design.png'],
                ['结构化实时返回', '通过 JSON 返回企业名称、活力指数、经营状态和统计日期。', 'images/consult-advantage-scenario.png'],
                ['调用链路可追踪', '支持请求标识记录，便于定位接口调用和业务处理过程。', 'images/consult-advantage-operation.png'],
                ['授权范围控制', '通过网关凭证和限流策略控制调用系统与访问频次。', 'images/consult-advantage-delivery.png']
            ],
            flowTitle: '调用流程',
            flowContent: '接口调用遵循申请、鉴权、查询和留痕的标准流程。',
            flow: [
                ['场景申请', '说明调用系统、使用目的、数据范围和预计频次。'],
                ['权限审核', '核对使用边界并配置数据岛调用凭证。'],
                ['接口查询', '按企业编码和统计日期发起 HTTPS 请求。'],
                ['结果使用', '在授权业务中使用返回结果并保留必要调用记录。']
            ],
            sceneTitle: '适用场景',
            sceneContent: '适用于需要在线核验企业基础状态的业务环节。',
            scenes: [
                ['惠企服务核验', '在企业申报或服务匹配过程中查询企业基础信息，减少重复填报。'],
                ['园区企业管理', '在园区运营系统中核对入驻企业信息和经营状态标签。'],
                ['产业监测接入', '为产业监测系统提供标准企业对象与基础经营指标。']
            ]
        }),
        resourceOther: buildFeatureIntroduction({
            highlightTitle: '内容构成',
            highlightContent: '资料包由分析成果、指标口径和使用说明组成，兼顾阅读与复用。',
            highlights: [
                ['产业分析报告', '呈现重点产业结构、企业活跃度和园区运行情况。', 'images/consult-advantage-design.png'],
                ['指标口径清单', '说明核心指标的统计范围、字段来源和计算逻辑。', 'images/consult-advantage-delivery.png'],
                ['使用说明文件', '明确资料内容、适用范围和引用注意事项。', 'images/consult-advantage-operation.png'],
                ['多格式交付', '提供 PDF、CSV 和 TXT 等便于阅读或进一步处理的文件。', 'images/consult-advantage-scenario.png']
            ],
            flowTitle: '使用流程',
            flowContent: '通过资料选择、内容核对和成果引用完成使用。',
            flow: [
                ['选择资料主题', '根据研究目标选择产业、园区或区域分析内容。'],
                ['下载资料文件', '按授权范围获取报告、指标口径和使用说明。'],
                ['核对统计范围', '结合口径说明确认时间、区域和指标适用边界。'],
                ['开展分析引用', '用于内部研究、趋势判断或专题材料编制。']
            ],
            sceneTitle: '适用对象',
            sceneContent: '资料面向产业研究、园区运营和企业服务等角色。',
            scenes: [
                ['产业研究人员', '快速了解区域产业结构和企业运行趋势，辅助确定后续研究重点。'],
                ['园区运营团队', '对照园区指标与区域情况，辅助开展阶段性运营复盘。'],
                ['企业服务部门', '结合产业和企业运行信息研判服务方向，形成内部工作参考。']
            ]
        })
    };

    var PRODUCTS = {
        dataset: {
            name: '龙岗区人群聚集智能监测视觉数据集',
            type: '数据集',
            image: 'images/policy-recommend.jpg',
            description: '汇聚龙岗区重点商圈、公园、交通枢纽等公共场所的人群密度统计结果，提供分时段客流量、密度等级与聚集预警状态数据，支持城市运行监测和大型活动安全保障。',
            price: '0元',
            delivery: '文件传输',
            measure: '一事一议',
            billing: '无需预付',
            publishedAt: '2026-09-01 10:20:00',
            industry: '公共管理、社会保障和社会组织',
            region: '广东省 / 深圳市 / 龙岗区',
            coverage: '--',
            frequency: '不定期更新',
            personalInfo: '否',
            usageLimit: '无',
            authorizedUse: '是',
            dataSubject: '公共数据',
            dataScale: '100GB',
            relatedSource: '--',
            notes: '--',
            pricingAmount: '0',
            pricingUnit: '--',
            postpaid: '否',
            securityLevel: '基础',
            storageLimit: '脱敏后存储',
            introduction: '本数据集汇聚龙岗区重点公共场所的人群密度统计数据，覆盖商圈、公园、交通枢纽等典型场景，包含采集点位、统计时段、人群数量、密度等级和预警状态等字段。数据经聚合与脱敏处理，可用于城市运行态势研判、公共安全预警和活动保障分析。',
            featureIntroduction: FEATURE_INTRODUCTIONS.productDataset
        },
        api: {
            name: '龙岗企业经营活力指数查询 API',
            type: 'API',
            image: 'images/water-analytics.jpg',
            description: '提供企业经营活力指数、状态标签和统计日期查询能力，适用于企业服务、园区运营及产业监测系统的实时接口接入。',
            price: '0.08元/次',
            delivery: 'API传输',
            measure: '按次计费',
            billing: '预付费',
            publishedAt: '2025-11-4 15:00:00',
            industry: '企业服务',
            region: '广东省 / 深圳市 / 龙岗区',
            coverage: '2026-01-01 至今',
            frequency: '每日更新',
            personalInfo: '否',
            usageLimit: '仅限授权系统调用',
            authorizedUse: '是',
            dataSubject: '企业数据',
            dataScale: '约 32 万条',
            relatedSource: '龙岗区企业登记主题库',
            notes: '--',
            pricingAmount: '0.08',
            pricingUnit: '次',
            postpaid: '否',
            securityLevel: '二级',
            storageLimit: '不落地存储',
            introduction: '通过数据岛 API 网关提供企业经营活力指标查询服务，支持企业编码和统计日期参数，返回结构化 JSON 数据。',
            featureIntroduction: FEATURE_INTRODUCTIONS.productApi,
            apiService: {
                name: '龙岗企业经营活力指数查询服务',
                registry: '外部注册数据服务_8163',
                serviceType: '外部接口',
                org: '深圳市龙岗区产业服务集团有限公司',
                updated: '2026-08-07 11:08:25',
                creator: '周妍',
                method: 'GET',
                format: 'JSON',
                requestProtocol: 'HTTPS',
                average: '18(ms)',
                frequency: '80 (次/秒)',
                callUrl: 'https://api.dataisland.longgang.gov.cn/v1/enterprises/vitality',
                cache: '启动（5分钟）',
                auth: 'key-auth',
                serviceProtocol: 'HTTPS',
                balance: '一致性哈希',
                upstreamPath: '/api/v1/enterprise/vitality-index',
                node: 'api.dataisland.longgang.gov.cn:443',
                params: [
                    { name: 'enterpriseCode', type: '字符串', required: '是', example: 'LGQY0001', desc: '企业统一编码' },
                    { name: 'statDate', type: '日期', required: '否', example: '2026-07-20', desc: '统计日期，默认返回最新数据' }
                ],
                body: [],
                headers: [
                    { name: 'X-Data-Island-Key', type: '字符串', required: '是', example: 'di_live_******', desc: '数据岛调用凭证' },
                    { name: 'Accept', type: '字符串', required: '否', example: 'application/json', desc: '响应数据格式' }
                ],
                returns: [
                    { name: 'code', type: '整数', desc: '业务状态码，0表示成功' },
                    { name: 'message', type: '字符串', desc: '业务处理结果说明' },
                    { name: 'data.enterpriseCode', type: '字符串', desc: '企业统一编码' },
                    { name: 'data.enterpriseName', type: '字符串', desc: '企业名称' },
                    { name: 'data.vitalityIndex', type: '数字', desc: '企业经营活力指数' },
                    { name: 'data.operationStatus', type: '字符串', desc: '企业经营状态标签' },
                    { name: 'data.statDate', type: '日期', desc: '数据统计日期' }
                ],
                exampleUrl: 'https://api.dataisland.longgang.gov.cn/v1/enterprises/vitality?enterpriseCode=LGQY0001&statDate=2026-07-20',
                response: {
                    code: 0,
                    message: 'success',
                    data: {
                        enterpriseCode: 'LGQY0001',
                        enterpriseName: '深圳市启辰智能科技有限公司',
                        vitalityIndex: 92.6,
                        operationStatus: '活跃',
                        statDate: '2026-07-20'
                    }
                }
            }
        },
        other: {
            name: '龙岗区产业运行分析样例报告',
            type: '其他',
            image: 'images/tourism-weather.jpg',
            description: '围绕重点产业、街道和园区形成产业运行分析说明文件，展示数据口径、指标结构和主要分析内容。',
            price: '3,600元/份',
            delivery: '文件传输',
            measure: '按份计费',
            billing: '预付费',
            publishedAt: '2025-11-4 15:00:00',
            industry: '产业发展',
            region: '广东省 / 深圳市 / 龙岗区',
            coverage: '2025年度',
            frequency: '年度更新',
            personalInfo: '否',
            usageLimit: '仅限内部研究使用',
            authorizedUse: '否',
            dataSubject: '产业数据',
            dataScale: '3 个文件',
            relatedSource: '龙岗区产业运行主题库',
            notes: '不包含企业原始明细',
            pricingAmount: '3,600',
            pricingUnit: '份',
            postpaid: '否',
            securityLevel: '基础',
            storageLimit: '加密存储，授权到期后删除',
            introduction: '以说明文件形式交付产业运行分析样例，内容包括重点产业结构、企业活跃度、园区运行情况以及数据使用说明。',
            featureIntroduction: FEATURE_INTRODUCTIONS.productOther
        }
    };

    var RESOURCES = {
        dataset: {
            name: '龙岗区建筑物逻辑单体空间数据',
            type: '数据集',
            resourceType: '公共数据',
            image: 'images/data-screen.jpg',
            description: '汇聚龙岗区建筑物逻辑单体标识、空间位置和基础属性信息，为城市治理、空间规划与公共服务场景提供标准化数据支撑。',
            price: '面议',
            delivery: '文件传输',
            measure: '一事一议',
            billing: '线下结算',
            industry: '信息传输、软件和信息技术服务业',
            owner: '深圳市龙岗区城市空间数据服务中心',
            publishedAt: '2026-08-28 10:20:00',
            region: '广东省 / 深圳市 / 龙岗区',
            coverage: '2025年1月至今',
            updateFrequency: '1次/季度',
            developmentTerms: '脱敏后开放',
            circulationType: '有条件开放',
            contact: '李**',
            contactPhone: '136****5821',
            format: 'GeoJSON / SHP',
            source: '原始取得',
            pricing: '--',
            measureUnit: '--',
            deferredPayment: '否',
            personalInfo: '否',
            introduction: '汇聚龙岗区建筑物逻辑单体标识、空间位置、行政区划、楼层与建筑面积等基础属性，可用于城市空间底图构建和建筑物精细化管理。',
            featureIntroduction: FEATURE_INTRODUCTIONS.resourceDataset,
            fields: [
                ['建筑物编码', 'building_code', '字符串型', '32'],
                ['建筑物名称', 'building_name', '字符串型', '200'],
                ['行政区划代码', 'division_code', '字符串型', '12'],
                ['所属街道', 'street_name', '字符串型', '50'],
                ['中心点经度', 'longitude', '数值型', '10,6'],
                ['中心点纬度', 'latitude', '数值型', '10,6'],
                ['地上层数', 'floor_count', '整型', '4'],
                ['建筑面积', 'building_area', '数值型', '18,2'],
                ['建成年份', 'completion_year', '整型', '4'],
                ['更新时间', 'update_time', '日期时间型', '19']
            ]
        },
        api: {
            name: '龙岗企业登记信息查询 API 资源',
            type: 'API',
            resourceType: '企业数据',
            image: 'images/realtime-data.jpg',
            description: '提供龙岗区企业登记信息、经营活力指数和状态标签的实时查询能力，支持业务系统通过标准接口按企业编码调用。',
            price: '面议',
            delivery: 'API传输',
            measure: '按次计费',
            billing: '预付费',
            industry: '信息传输、软件和信息技术服务业',
            owner: '深圳市龙岗区政务数据运营有限公司',
            publishedAt: '2026-07-17 16:35:00',
            region: '广东省 / 深圳市 / 龙岗区',
            coverage: '2024年1月至今',
            updateFrequency: '实时更新',
            developmentTerms: '授权后使用',
            circulationType: '有条件开放',
            contact: '陈**',
            contactPhone: '138****4076',
            format: 'JSON',
            source: '加工取得',
            pricing: '--',
            measureUnit: '次',
            deferredPayment: '否',
            personalInfo: '否',
            introduction: '通过数据岛 API 网关提供标准化查询接口，调用方可按企业编码及统计日期获取结构化企业经营活力信息。',
            featureIntroduction: FEATURE_INTRODUCTIONS.resourceApi,
            fields: [
                ['企业编码', 'enterpriseCode', '字符串型', '32'],
                ['企业名称', 'enterpriseName', '字符串型', '255'],
                ['活力指数', 'vitalityIndex', '数值型', '5,2'],
                ['经营状态', 'operationStatus', '字符串型', '20'],
                ['统计日期', 'statDate', '日期型', '10']
            ],
            apiService: {
                name: '龙岗企业登记信息查询服务',
                registry: '外部注册数据服务_7284',
                serviceType: '外部接口',
                org: '深圳市龙岗区政务数据运营有限公司',
                updated: '2026-07-17 16:35:00',
                creator: '李晨',
                method: 'GET',
                format: 'JSON',
                requestProtocol: 'HTTPS',
                average: '12(ms)',
                frequency: '100 (次/秒)',
                callUrl: 'https://api.dataisland.longgang.gov.cn/v1/enterprises/registration',
                cache: '不启动',
                auth: 'key-auth',
                serviceProtocol: 'HTTPS',
                balance: '轮询',
                upstreamPath: '/api/v1/enterprise/registration-info',
                node: 'api.dataisland.longgang.gov.cn:443',
                params: [
                    { name: 'enterpriseCode', type: '字符串', required: '是', example: 'LGQY0001', desc: '企业统一编码' },
                    { name: 'statDate', type: '日期', required: '否', example: '2026-07-20', desc: '统计日期，默认返回最新数据' }
                ],
                body: [],
                headers: [
                    { name: 'X-Data-Island-Key', type: '字符串', required: '是', example: 'di_live_******', desc: '数据岛调用凭证' },
                    { name: 'X-Request-Id', type: '字符串', required: '否', example: 'req-20260720-00128', desc: '请求链路追踪标识' },
                    { name: 'Accept', type: '字符串', required: '否', example: 'application/json', desc: '响应数据格式' }
                ],
                returns: [
                    { name: 'code', type: '整数', desc: '业务状态码，0表示成功' },
                    { name: 'message', type: '字符串', desc: '业务处理结果说明' },
                    { name: 'data.enterpriseCode', type: '字符串', desc: '企业统一编码' },
                    { name: 'data.enterpriseName', type: '字符串', desc: '企业名称' },
                    { name: 'data.vitalityIndex', type: '数字', desc: '企业经营活力指数' },
                    { name: 'data.operationStatus', type: '字符串', desc: '企业经营状态标签' },
                    { name: 'data.statDate', type: '日期', desc: '数据统计日期' }
                ],
                exampleUrl: 'https://api.dataisland.longgang.gov.cn/v1/enterprises/registration?enterpriseCode=LGQY0001&statDate=2026-07-20',
                response: {
                    code: 0,
                    message: 'success',
                    data: {
                        enterpriseCode: 'LGQY0001',
                        enterpriseName: '深圳市启辰智能科技有限公司',
                        vitalityIndex: 92.6,
                        operationStatus: '活跃',
                        statDate: '2026-07-20'
                    }
                }
            }
        },
        other: {
            name: '龙岗区产业运行分析资料包',
            type: '其他',
            resourceType: '行业数据',
            image: 'images/data-screen.jpg',
            description: '汇集龙岗区重点产业、街道和园区运行情况的分析说明、指标口径及配套资料，供产业研究和业务研判参考。',
            price: '面议',
            delivery: '文件传输',
            measure: '按份计费',
            billing: '预付费',
            industry: '租赁和商务服务业',
            owner: '深圳市龙岗区产业数据运营有限公司',
            publishedAt: '2026-07-16 14:10:00',
            region: '广东省 / 深圳市 / 龙岗区',
            coverage: '2023年至2025年',
            updateFrequency: '1次/年',
            developmentTerms: '签署用途承诺后使用',
            circulationType: '有条件开放',
            contact: '周**',
            contactPhone: '135****2198',
            format: 'PDF / TXT',
            source: '加工取得',
            pricing: '--',
            measureUnit: '份',
            deferredPayment: '否',
            personalInfo: '否',
            introduction: '资料包包括覆盖范围、数据周期、主要分析内容和指标口径说明，以登记时上传的文件形式提供样例。',
            featureIntroduction: FEATURE_INTRODUCTIONS.resourceOther,
            fields: [
                ['文件名称', 'file_name', '字符串型', '255'],
                ['文件类型', 'file_type', '字符串型', '20'],
                ['文件大小', 'file_size', '字符串型', '20'],
                ['内容摘要', 'content_summary', '字符串型', '500'],
                ['更新日期', 'update_date', '日期型', '10']
            ]
        }
    };

    window.ProductDetailCatalog = {
        products: PRODUCTS,
        resources: RESOURCES
    };

    var DATASET_ROWS = [
        ['LG-RQ-20260901-001', 'LG-CAM-0018', '大运中心南广场', '体育场馆', '龙城街道', '2026-09-01 08:00', '286', '较高', '关注'],
        ['LG-RQ-20260901-002', 'LG-CAM-0032', '龙岗万达广场东门', '商业综合体', '平湖街道', '2026-09-01 09:00', '174', '正常', '正常'],
        ['LG-RQ-20260901-003', 'LG-CAM-0047', '甘坑古镇南入口', '文旅景区', '吉华街道', '2026-09-01 10:00', '231', '较高', '关注'],
        ['LG-RQ-20260901-004', 'LG-CAM-0063', '龙城公园主入口', '城市公园', '龙城街道', '2026-09-01 11:00', '96', '正常', '正常'],
        ['LG-RQ-20260901-005', 'LG-CAM-0075', '双龙地铁站B口', '交通枢纽', '龙岗街道', '2026-09-01 12:00', '318', '拥挤', '预警'],
        ['LG-RQ-20260901-006', 'LG-CAM-0089', '宝龙科技城服务大厅', '政务服务', '宝龙街道', '2026-09-01 13:00', '83', '正常', '正常'],
        ['LG-RQ-20260901-007', 'LG-CAM-0104', '布吉公园中心广场', '城市公园', '布吉街道', '2026-09-01 14:00', '142', '正常', '正常'],
        ['LG-RQ-20260901-008', 'LG-CAM-0116', '横岗文体广场', '公共文化', '横岗街道', '2026-09-01 15:00', '205', '较高', '关注'],
        ['LG-RQ-20260901-009', 'LG-CAM-0128', '园山街道大康广场', '社区广场', '园山街道', '2026-09-01 16:00', '119', '正常', '正常'],
        ['LG-RQ-20260901-010', 'LG-CAM-0141', '坪地中心公园北门', '城市公园', '坪地街道', '2026-09-01 17:00', '267', '较高', '关注']
    ];

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character];
        });
    }

    function icon(name) {
        var paths = {
            dataset: '<path d="M4 3h16v18H4V3zm2 2v3h12V5H6zm0 5v3h4v-3H6zm6 0v3h6v-3h-6zm-6 5v4h4v-4H6zm6 0v4h6v-4h-6z"/>',
            api: '<path d="M7 7h3V4h4v3h3a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-3v3h-4v-3H7a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H7zm2 2h2v2H9v-2zm4 0h2v2h-2v-2z"/>',
            file: '<path d="M6 2h8l4 4v16H6V2zm2 2v16h8V8h-4V4H8zm6 1.5V6h.5L14 5.5zM9 11h6v2H9v-2zm0 4h6v2H9v-2z"/>',
            download: '<path d="M11 3h2v10.17l3.59-3.58L18 11l-6 6-6-6 1.41-1.41L11 13.17V3zm-6 16h14v2H5v-2z"/>'
        };
        return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (paths[name] || paths.file) + '</svg>';
    }

    function renderFileCard(fileName, fileMeta, href, iconName) {
        return ''
            + '<div class="sample-file-card">'
            +   '<span class="sample-file-icon">' + icon(iconName || 'file') + '</span>'
            +   '<div class="sample-file-info"><strong>' + escapeHtml(fileName) + '</strong><span>' + escapeHtml(fileMeta) + '</span></div>'
            +   '<a class="sample-download" href="' + escapeHtml(href) + '" download>' + icon('download') + '<span>下载文件</span></a>'
            + '</div>';
    }

    function renderDatasetSample(product) {
        var header = ['记录编号', '点位编码', '点位名称', '场景类型', '所属街道', '统计时间', '人群数量（人）', '密度等级', '预警状态'];
        return ''
            + renderFileCard(
                '龙岗区人群聚集智能监测视觉数据样例.xlsx',
                'Excel 工作簿 · 10 条样例数据 · 9 个字段',
                SAMPLE_OUTPUT_ROOT + '龙岗区人群聚集智能监测视觉数据样例.xlsx',
                'dataset'
            )
            + '<h3 class="sample-table-title">样例数据预览</h3>'
            + '<p class="sample-table-note">以下内容与 Excel 文件中的“人群密度样例”工作表保持一致。</p>'
            + '<div class="sample-table-scroll"><table class="sample-preview-table">'
            +   '<thead><tr>' + header.map(function (item) { return '<th>' + escapeHtml(item) + '</th>'; }).join('') + '</tr></thead>'
            +   '<tbody>'
            +       DATASET_ROWS.map(function (row) {
                        return '<tr>' + row.map(function (cell) {
                            return '<td>' + escapeHtml(cell) + '</td>';
                        }).join('') + '</tr>';
                    }).join('')
            +   '</tbody>'
            + '</table></div>';
    }

    function renderApiInfoField(label, value, full) {
        return '<div class="sample-api-info-field' + (full ? ' full' : '') + '"><span>' + escapeHtml(label) + '：</span><strong>' + escapeHtml(value) + '</strong></div>';
    }

    function renderApiParamRows(rows) {
        if (!rows || !rows.length) {
            return '<tr class="sample-api-empty-row"><td colspan="5">暂无数据</td></tr>';
        }
        return rows.map(function (row) {
            return '<tr>'
                + '<td>' + escapeHtml(row.name) + '</td>'
                + '<td>' + escapeHtml(row.type) + '</td>'
                + '<td' + (row.required === '是' ? ' class="api-required"' : '') + '>' + escapeHtml(row.required) + '</td>'
                + '<td>' + escapeHtml(row.example) + '</td>'
                + '<td>' + escapeHtml(row.desc) + '</td>'
                + '</tr>';
        }).join('');
    }

    function renderApiReturnRows(rows) {
        if (!rows || !rows.length) {
            return '<tr class="sample-api-empty-row"><td colspan="3">暂无数据</td></tr>';
        }
        return rows.map(function (row) {
            return '<tr><td>' + escapeHtml(row.name) + '</td><td>' + escapeHtml(row.type) + '</td><td>' + escapeHtml(row.desc) + '</td></tr>';
        }).join('');
    }

    function renderApiParamGroup(service, key, label) {
        if (!service[key] || !service[key].length) return '';
        return ''
            + '<section class="sample-api-param-group">'
            +   '<h4>' + escapeHtml(label) + '</h4>'
            +   '<div class="sample-table-scroll"><table class="api-parameter-table sample-api-service-table">'
            +       '<colgroup><col class="col-name"><col class="col-type"><col class="col-required"><col class="col-example"><col class="col-description"></colgroup>'
            +       '<thead><tr><th>参数名称</th><th>参数类型</th><th>是否必填</th><th>示例值</th><th>说明</th></tr></thead>'
            +       '<tbody>' + renderApiParamRows(service[key]) + '</tbody>'
            +   '</table></div>'
            + '</section>';
    }

    function renderApiSample(product) {
        var service = product.apiService;
        var responseText = JSON.stringify(service.response, null, 2);
        return ''
            + '<article class="sample-api-service-card">'
            +   '<h3>' + escapeHtml(service.name) + '</h3>'
            +   '<p>' + escapeHtml(service.registry) + '</p>'
            +   '<div class="sample-api-service-meta">'
            +       '<span>服务类型：<strong>' + escapeHtml(service.serviceType) + '</strong></span>'
            +       '<span>所属组织：<strong>' + escapeHtml(service.org) + '</strong></span>'
            +       '<span>更新时间：<strong>' + escapeHtml(service.updated) + '</strong></span>'
            +   '</div>'
            + '</article>'
            + '<h3 class="api-doc-title">基础属性</h3>'
            + '<div class="sample-api-info-card">'
            +   renderApiInfoField('请求方式', service.method)
            +   renderApiInfoField('支持格式', service.format)
            +   renderApiInfoField('请求协议', service.requestProtocol)
            +   renderApiInfoField('创建人', service.creator)
            +   renderApiInfoField('平均耗时', service.average)
            +   renderApiInfoField('频次限制', service.frequency)
            +   '<div class="sample-api-info-field full"><span>调用地址：</span><span class="api-method">' + escapeHtml(service.method) + '</span><code>' + escapeHtml(service.callUrl) + '</code></div>'
            +   renderApiInfoField('数据缓存', service.cache)
            +   renderApiInfoField('认证策略', service.auth)
            + '</div>'
            + '<h3 class="api-doc-title">服务配置信息</h3>'
            + '<div class="sample-api-info-card">'
            +   renderApiInfoField('服务协议', service.serviceProtocol)
            +   renderApiInfoField('负载均衡', service.balance)
            +   '<div class="sample-api-info-field full"><span>接口地址：</span><span class="api-method">' + escapeHtml(service.method) + '</span><code>' + escapeHtml(service.upstreamPath) + '</code></div>'
            +   renderApiInfoField('服务节点', service.node, true)
            + '</div>'
            + '<h3 class="api-doc-title">请求参数</h3>'
            + renderApiParamGroup(service, 'params', 'Params')
            + renderApiParamGroup(service, 'body', 'Body')
            + renderApiParamGroup(service, 'headers', 'Headers')
            + '<h3 class="api-doc-title">返回参数</h3>'
            + '<p class="sample-api-format">参数格式：<strong>' + escapeHtml(service.format) + '</strong></p>'
            + '<div class="sample-table-scroll"><table class="api-parameter-table sample-api-return-table">'
            +   '<thead><tr><th>参数名称</th><th>参数类型</th><th>说明</th></tr></thead>'
            +   '<tbody>' + renderApiReturnRows(service.returns) + '</tbody>'
            + '</table></div>'
            + '<h3 class="api-doc-title">请求示例</h3>'
            + '<div class="api-endpoint"><span class="api-method">' + escapeHtml(service.method) + '</span><code>' + escapeHtml(service.exampleUrl) + '</code></div>'
            + '<h3 class="api-doc-title">返回示例</h3>'
            + '<pre class="api-code-block">' + escapeHtml(responseText) + '</pre>';
    }

    function renderOtherSample(product) {
        return ''
            + OTHER_SAMPLE_FILES.map(function (file) {
                return renderFileCard(file.name, file.meta, file.href, 'file');
            }).join('');
    }

    function setText(selector, value) {
        var element = document.querySelector(selector);
        if (element) element.textContent = value;
    }

    function setTextAll(selector, value) {
        document.querySelectorAll(selector).forEach(function (element) {
            element.textContent = value;
        });
    }

    function updateBuyLink(context, type) {
        var link = document.querySelector('[data-detail-buy]');
        if (!link) return;
        link.href = 'product-buy.html?catalog=' + encodeURIComponent(context)
            + '&sampleType=' + encodeURIComponent(type);
    }

    function applyProduct(product, type) {
        document.title = product.name + ' - 龙岗数据聚合服务平台';
        setText('[data-product-detail-breadcrumb]', product.name);
        setText('[data-product-detail-title]', product.name);
        setText('[data-product-detail-description]', product.description);
        setText('[data-product-detail-price]', product.price);
        setText('[data-product-detail-price-table]', product.pricingAmount || product.price);
        setText('[data-product-detail-delivery]', product.delivery);
        setText('[data-product-detail-measure]', product.measure);
        setText('[data-product-detail-measure-table]', product.measure);
        setText('[data-product-detail-billing]', product.billing);
        setText('[data-product-detail-published]', product.publishedAt);
        setText('[data-product-detail-name]', product.name);
        setText('[data-product-detail-type]', product.type);
        setText('[data-product-detail-industry]', product.industry);
        setText('[data-product-detail-region]', product.region || '--');
        setText('[data-product-detail-coverage]', product.coverage || '--');
        setText('[data-product-detail-frequency]', product.frequency || '--');
        setText('[data-product-detail-personal]', product.personalInfo || '--');
        setText('[data-product-detail-limit]', product.usageLimit || '--');
        setText('[data-product-detail-authorized]', product.authorizedUse || '--');
        setText('[data-product-detail-subject]', product.dataSubject || '--');
        setText('[data-product-detail-scale]', product.dataScale || '--');
        setText('[data-product-detail-source]', product.relatedSource || '--');
        setText('[data-product-detail-notes]', product.notes || '--');
        setText('[data-product-detail-unit]', product.pricingUnit || '--');
        setText('[data-product-detail-postpaid]', product.postpaid || '否');
        setText('[data-product-delivery-heading]', product.delivery);
        setText('[data-product-delivery-limit]', product.usageLimit || '--');
        setText('[data-product-delivery-security]', product.securityLevel || '--');
        setText('[data-product-delivery-storage]', product.storageLimit || '--');
        setText('[data-product-delivery-transfer]', product.delivery || '--');
        setText('[data-product-detail-introduction]', product.introduction);
        setText('[data-product-consult-target]', product.name);
        document.querySelectorAll('[data-product-detail-image]').forEach(function (image) {
            image.src = product.image;
            image.alt = product.name;
        });
        if (window.FeatureIntroduction) {
            window.FeatureIntroduction.renderPortal(
                document.querySelector('[data-feature-introduction]'),
                product.featureIntroduction
            );
        }
        updateBuyLink('product', type);
    }

    function renderResourceFields(fields) {
        var target = document.querySelector('[data-resource-detail-fields]');
        if (!target) return;
        if (!fields || !fields.length) {
            target.innerHTML = '<tr><td colspan="5"><div class="resource-detail-empty" role="status">'
                + '<span class="material-symbols-outlined" aria-hidden="true">inbox</span><span>暂无数据</span>'
                + '</div></td></tr>';
            return;
        }
        target.innerHTML = fields.map(function (field, index) {
            return '<tr><td>' + (index + 1) + '</td>'
                + '<td>' + escapeHtml(field[0]) + '</td>'
                + '<td>' + escapeHtml(field[1]) + '</td>'
                + '<td>' + escapeHtml(field[2]) + '</td>'
                + '<td>' + escapeHtml(field[3]) + '</td></tr>';
        }).join('');
    }

    function applyResource(resource, type) {
        document.title = resource.name + ' - 龙岗数据聚合服务平台';
        setText('[data-resource-detail-breadcrumb]', resource.name);
        setText('[data-resource-detail-title]', resource.name);
        setText('[data-resource-detail-description]', resource.description);
        setText('[data-resource-detail-published]', resource.publishedAt);
        setText('[data-resource-detail-price]', resource.price);
        setText('[data-resource-detail-delivery]', resource.delivery);
        setText('[data-resource-detail-measure]', resource.measure);
        setText('[data-resource-detail-billing]', resource.billing);
        setText('[data-resource-detail-name]', resource.name);
        setText('[data-resource-detail-type]', resource.resourceType);
        setText('[data-resource-detail-industry]', resource.industry);
        setText('[data-resource-detail-region]', resource.region || '--');
        setText('[data-resource-detail-coverage]', resource.coverage || '--');
        setText('[data-resource-detail-frequency]', resource.updateFrequency || '--');
        setText('[data-resource-detail-development]', resource.developmentTerms || '--');
        setText('[data-resource-detail-circulation]', resource.circulationType || '--');
        setText('[data-resource-detail-contact]', resource.contact || '--');
        setText('[data-resource-detail-phone]', resource.contactPhone || '--');
        setText('[data-resource-detail-format]', resource.format);
        setText('[data-resource-detail-source]', resource.source);
        setText('[data-resource-detail-introduction]', resource.introduction);
        setText('[data-resource-detail-personal]', resource.personalInfo || '否');
        setText('[data-resource-detail-pricing-method]', resource.measure || '--');
        setText('[data-resource-detail-pricing]', resource.pricing || '--');
        setText('[data-resource-detail-unit]', resource.measureUnit || '--');
        setText('[data-resource-detail-deferred]', resource.deferredPayment || '否');
        setText('[data-resource-detail-transfer]', resource.delivery);
        setText('[data-resource-consult-target]', resource.name);
        setText('[data-resource-consult-owner]', resource.owner);
        document.querySelectorAll('[data-resource-detail-owner]').forEach(function (element) {
            element.textContent = resource.owner;
        });
        document.querySelectorAll('[data-resource-detail-image]').forEach(function (image) {
            image.src = resource.image;
            image.alt = resource.name;
        });
        renderResourceFields(resource.fields);
        if (window.FeatureIntroduction) {
            window.FeatureIntroduction.renderPortal(
                document.querySelector('[data-feature-introduction]'),
                resource.featureIntroduction
            );
        }
        updateBuyLink('resource', type);
    }

    function initDetailSamples() {
        var samplePanel = document.getElementById('tabSample');
        if (!samplePanel) return;
        var context = samplePanel.getAttribute('data-sample-context') === 'resource' ? 'resource' : 'product';
        var catalog = context === 'resource' ? RESOURCES : PRODUCTS;
        var params = new URLSearchParams(window.location.search || '');
        var type = params.get('sampleType');
        if (!catalog[type]) type = 'dataset';
        var item = catalog[type];
        if (context === 'resource') applyResource(item, type);
        else applyProduct(item, type);
        samplePanel.classList.add('sample-panel');
        samplePanel.innerHTML = type === 'api'
            ? renderApiSample(item)
            : (type === 'other' ? renderOtherSample(item) : renderDatasetSample(item));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDetailSamples);
    } else {
        initDetailSamples();
    }
})();
