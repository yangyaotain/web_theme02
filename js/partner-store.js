(function () {
    'use strict';

    const prefix = 'lg-ecosystem-partners:v1:';
    const profilesKey = prefix + 'profiles-snapshot';
    const categories = ['数据安全', '人工智能', '云计算', '数据服务', '行业应用', '其他'];
    const examples = {
        profiles: [
            {
                id: 'shumei', name: '数美科技', category: '数据安全',
                logo: 'images/partners/shumei-logo.png',
                logoSource: 'https://www.ishumei.com/next/img/global/logo3.png',
                subtitle: '天净内容风控与天网业务风控，覆盖在线内容审核和业务风险识别。',
                heroImg: 'images/consult-governance.jpg', badge: '在线业务风控',
                heroTitle: '数美科技', heroSubtitle: '以智能风控能力，支持内容生态治理与在线业务安全。',
                lead: '数美科技（北京数美时代科技有限公司）成立于2015年6月，围绕企业在线经营中的内容风险与业务风险提供产品和服务。公司将人工智能、大数据分析与行业风控经验结合，形成以天净、天网为核心的产品体系，服务于内容社区、音视频、游戏、电商及金融等领域的业务安全需求。',
                sections: [
                    { title: '公司背景与业务定位', content: '随着用户发布内容、线上交易和数字营销不断发展，企业需要同时关注内容合规、账号安全以及异常行为带来的经营风险。数美科技从在线业务风控切入，围绕不同风险对象构建识别、分析和策略应用能力，让风控服务能够融入企业日常运营。\n公司业务覆盖内容审核、营销反作弊、账号保护和数据防盗爬等方向。产品既关注单条内容的风险识别，也关注账号、设备和行为之间的关联，帮助业务团队从不同维度理解风险。', cards: [] },
                    { title: '核心产品', content: '', cards: [
                        { type: 'icon', title: '天净 · 内容风控', desc: '面向文本、图片、音频、视频、网页及文档等内容形态提供检测能力，覆盖内容发布、互动评论、直播及音视频交流等环节，帮助企业组织内容审核和生态治理工作。', visual: { type: 'icon', name: 'fact_check' } },
                        { type: 'icon', title: '天网 · 业务风控', desc: '围绕注册登录、营销活动、交易和数据访问等业务环节识别异常行为。结合设备、账号与行为风险信息，为营销反作弊、账号保护和数据防盗爬等需求提供支持。', visual: { type: 'icon', name: 'shield' } }
                    ] },
                    { title: '内容安全与生态治理', content: '在内容社区和互动平台中，图文、音视频及链接等信息往往来自不同的生产和传播环节。天净通过多种内容检测能力帮助企业识别风险，并为审核人员组织复核、处置和持续优化提供依据。不同业务可以结合内容类型、发布场景及运营规则设置审核重点。\n数美的社区风控方案将机器识别与人工复核相结合。机器检测承担规模化内容筛查，审核团队对存疑内容开展复核，并将识别结果用于后续治理。这样的协同方式适用于内容发布频繁、审核任务较为集中的业务。', cards: [] },
                    { title: '账号保护与营销反作弊', content: '在用户增长和交易运营过程中，注册登录、优惠领取、活动参与以及支付等环节都可能出现异常行为。天网将设备、账号和用户行为等信息纳入风险分析，帮助业务识别可能影响活动公平性和资源分配的行为。\n对于需要保护内容资产的企业，数据访问环节的风险识别同样重要。围绕异常访问与内容盗爬开展防护，可以与账号保护、营销风控等能力配合，形成对在线经营过程的持续观察和风险响应。', cards: [] },
                    { title: '典型应用场景', content: '', cards: [
                        { type: 'icon', title: '社区与音视频互动', desc: '围绕帖子、评论、用户资料、音视频和互动消息组织审核。结合社区运营规则，关注违规内容、广告导流和异常账号活动，使内容治理与用户运营协同开展。', visual: { type: 'icon', name: 'forum' } },
                        { type: 'icon', title: '电商与数字营销', desc: '在促销、优惠发放、用户拉新及交易等场景中识别异常参与行为。将内容审核与业务风控结合，兼顾商品及营销内容管理、活动公平性和在线业务安全。', visual: { type: 'icon', name: 'storefront' } }
                    ] },
                    { title: '技术研究与专业服务', content: '数美科技围绕人工智能与数字风险持续开展研究，设有人工智能研究院、黑产研究院等专业团队。相关工作涉及风险行为研究、行业场景分析以及风控技术探索，并结合业务实践形成产品能力与行业方案。\n数字风控研究院关注黑产变化、内容治理和行业运营问题。其公开研究和行业分享覆盖音视频社交、游戏、新零售及金融等领域，为企业理解不同场景中的风险对象、治理重点和运营变化提供参考。', cards: [] },
                    { title: '产品能力与业务应用的衔接', content: '企业可根据自身业务链路梳理内容形态、用户互动和交易活动，确定需要接入的风险识别能力。内容审核较多的业务可以优先围绕天净组织检测与人工复核，而营销和账号风险较集中的业务可以结合天网完善策略。\n应用过程中，业务规则、审核标准和运营反馈共同影响风控效果。将风险识别结果与具体场景关联，有助于业务、审核和技术团队围绕同一风险问题开展沟通，并在日常运营中持续调整处置方式。', cards: [] }
                ],
                sources: [
                    { title: '公司介绍', url: 'https://www.ishumei.com/new/about/company' },
                    { title: '产品介绍', url: 'https://www.ishumei.com/m' },
                    { title: '社区风控方案', url: 'https://ishumei.com/new/product/solution/community' },
                    { title: '数字风控研究院', url: 'https://www.ishumei.com/new/consoleResearch/about' }
                ],
                status: 'published', exampleContentVersion: 3, createdAt: '2026-11-20T03:00:00.000Z'
            },
            {
                id: 'volcano', name: '火山引擎', category: '人工智能',
                logo: 'images/partners/volcano-logo.svg',
                logoSource: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/shayvw_lmjsvc/ljhwZthlaukjlkulzlp/logo-theme-light.svg',
                subtitle: '火山方舟提供大模型服务，豆包语音支持语音识别、合成与应用开发。',
                heroImg: 'images/consulting-detail-hero.jpg', badge: '大模型与语音',
                heroTitle: '火山引擎', heroSubtitle: '连接模型能力与业务应用，支持企业构建智能服务。',
                lead: '火山引擎是字节跳动旗下的云服务平台，将其在业务发展过程中积累的技术、产品和工具以云服务形式向外部企业开放。其业务覆盖云基础设施、人工智能、大数据、音视频与安全等方向，为企业从应用开发到业务运营提供技术支撑。',
                sections: [
                    { title: '公司背景与发展方向', content: '火山引擎于2020年推出，围绕企业数字化建设开放技术能力和增长工具。平台将云计算、数据技术、人工智能与业务应用衔接，支持企业在数字化过程中建设基础设施、组织数据资源和开发智能应用。\n其业务理念强调体验创新、数据驱动与敏捷迭代。面向不同行业，火山引擎通过产品矩阵和场景方案承接企业在研发、运维、产品和运营等环节的需求，使企业能够结合现有系统逐步引入云与智能能力。', cards: [] },
                    { title: '相关产品', content: '', cards: [
                        { type: 'icon', title: '火山方舟', desc: '提供模型推理、评测与精调等服务，承载豆包及其他模型能力。开发者可结合知识检索、工具调用等能力构建问答助手和智能业务应用。', visual: { type: 'icon', name: 'neurology' } },
                        { type: 'icon', title: '豆包语音', desc: '提供语音识别与语音合成等服务，将语音与文字相互连接。结合大模型和音视频能力，可支持语音播报、音频转写、内容配音和交互式应用开发。', visual: { type: 'icon', name: 'graphic_eq' } }
                    ] },
                    { title: '大模型服务与智能应用', content: '火山方舟面向模型应用提供从选型体验到推理调用的服务，企业可以根据业务目标和数据类型选择合适的模型能力。文本生成、视觉理解、向量化和工具调用等能力，可分别承接内容处理、资料检索和业务协作等需求。\n在企业知识应用中，模型能力可以与知识检索配合，将业务资料组织为可查询的信息来源。通过工具调用，应用还可以把模型交互与现有函数、接口及业务流程连接起来，支持从回答问题向完成具体任务延伸。', cards: [] },
                    { title: '语音识别与交互体验', content: '豆包语音支持将用户的语音转换为文字，也支持把文本内容转换为语音输出。相关能力可用于会议或音频资料转写、服务播报、媒体配音和有声内容等场景，为应用提供更自然的信息输入和输出方式。\n在实时对话场景中，火山引擎的音视频方案可组合语音识别、大模型和语音合成等服务，形成语音输入、语义处理和语音回复的交互链路。其应用方向包括智能助手、客服、口语教学及智能硬件等。', cards: [] },
                    { title: '数据研发与治理能力', content: '在大数据方向，DataLeap提供数据研发、治理、资产管理及数据消费等能力，连接开发、测试、调度与运维等工作环节。企业可以围绕数据任务建设开发流程，管理数据资产，并对数据的使用与服务进行组织。\n将数据研发治理与智能应用结合，有助于企业把分散的数据加工为适合检索、分析和应用调用的资源。业务团队可以先梳理数据来源和口径，再选择模型及应用工具，推动数据基础建设与应用开发相互衔接。', cards: [] },
                    { title: '云基础设施与音视频服务', content: '火山引擎的产品矩阵涵盖计算、存储、数据库、容器、网络以及安全等基础服务，为应用部署、运行和扩展提供支撑。企业可以结合应用负载和已有系统架构配置资源，并把研发与运营过程中的需求逐步纳入统一的云环境。\n在音视频方向，平台提供视频点播、直播、实时音视频与智能处理等相关服务。面向内容生产与互动业务，音视频能力可以与模型、语音和数据服务组合，承接媒体处理、在线互动和智能内容应用等需求。', cards: [] },
                    { title: '典型应用方向', content: '', cards: [
                        { type: 'icon', title: '企业知识与业务助手', desc: '围绕企业文档和业务资料建设检索问答应用，结合模型、知识库和工具调用处理信息查询及任务协作。应用可与已有系统衔接，服务于员工或客户的信息获取需求。', visual: { type: 'icon', name: 'manage_search' } },
                        { type: 'icon', title: '语音服务与智能互动', desc: '把语音输入、内容理解和语音回复组合为交互流程，可应用于客服问答、语音播报及教学交流。结合实时音视频能力，还可拓展在线陪伴、互动内容和终端设备等应用。', visual: { type: 'icon', name: 'record_voice_over' } }
                    ] }
                ],
                sources: [
                    { title: '火山引擎介绍', url: 'https://www.volcengine.com/about' },
                    { title: '火山方舟官方介绍', url: 'https://docs.volcengine.com/docs/ark?lang=zh' },
                    { title: '豆包语音官方介绍', url: 'https://docs.volcengine.com/docs/doubao-voice/product-overview-18?lang=zh' },
                    { title: '数据研发治理', url: 'https://docs.volcengine.com/docs/big-data-research-and-development-governance-suite/core-features-introduction?lang=zh' },
                    { title: '实时对话方案', url: 'https://console.volcengine.com/ark/region%3Acn-beijing/docs/rtc-ai' }
                ],
                status: 'published', exampleContentVersion: 3, createdAt: '2026-11-20T02:00:00.000Z'
            },
            {
                id: 'cec-cloud', name: '中电云', category: '云计算',
                logo: 'images/partners/cec-cloud-logo.png',
                logoSource: 'https://cecloud.com/image/logo.png',
                subtitle: '中国电子云提供云基础设施、数据智能与可信数据流通相关产品。',
                heroImg: 'images/consult-hosting.jpg', badge: '中国电子云',
                heroTitle: '中国电子云', heroSubtitle: '以云与数据能力，支撑政企数字化建设与数据应用。',
                lead: '中国电子云是中国电子旗下的云与数字化服务品牌，面向国家重大工程、政务及关键行业提供数字基础设施和数智化产品。业务体系涵盖专属云、存储、安全、数据智能与人工智能等方向，连接企业上云、数据管理、可信协作及行业应用建设。',
                sections: [
                    { title: '品牌背景与发展历程', content: '中国电子云品牌于2020年发布，随后推出CECSTACK全栈专属云等产品，并持续完善云、存储与数据相关能力。其业务面向政企客户的数字化建设需求，强调自主研发、云原生技术和行业场景的结合。\n在发展过程中，中国电子云围绕专属云基础设施、数据智能和AI应用逐步扩展产品体系。对政企客户而言，云服务既承担业务系统运行的基础环境，也与数据治理、行业应用和安全管理共同构成持续演进的数字化底座。', cards: [] },
                    { title: '数据相关能力', content: '', cards: [
                        { type: 'icon', title: '数据智能平台', desc: '围绕数据集成、加工、治理和服务组织工作流程，覆盖数据资源管理及开发利用需求。通过数据标准、质量管理与开发工具，支持企业持续建设可用的数据资源。', visual: { type: 'icon', name: 'database' } },
                        { type: 'icon', title: '可信数据流通平台', desc: '面向政府、企业和科研机构的数据共享与协作需求，提供可信数据空间及流通相关能力。在数据资源连接和使用过程中，兼顾流通效率、访问管理和安全要求。', visual: { type: 'icon', name: 'hub' } }
                    ] },
                    { title: '云基础设施与资源承载', content: '专属云产品为客户提供计算、存储、网络等基础资源，并与数据库、中间件及安全产品共同支撑业务系统运行。围绕不同应用的部署和管理需求，客户可以构建适合自身业务的数据中心和云资源环境。\n中国电子云的产品体系还包含仓海CeaStor存储、超融合以及灾备相关产品和方案。这些基础能力面向数据存放、业务连续性和资源管理等要求，为数据平台及上层业务应用提供运行支撑。', cards: [] },
                    { title: '数据开发治理与资产组织', content: '数据智能平台覆盖数据集成、标准、建模、开发、标签、资产及服务等环节。通过把数据加工与治理组织到连贯流程中，帮助开发和管理人员理解数据来源、加工过程以及下游使用关系。\n其数据治理能力包括标准建模、质量检查和数据血缘等方向，可与离线、实时等加工场景结合。对数据使用方而言，清晰的目录、稳定的数据口径和可理解的数据质量信息，是开展分析和应用开发的重要基础。', cards: [] },
                    { title: '可信数据协作与流通', content: '可信数据流通平台关注机构之间的数据共享和联合应用，服务于政府、企业及科研机构等多类主体。平台通过可信的数据连接与使用环境，帮助参与方在明确管理要求的基础上组织资源供给和业务协作。\n在可信数据空间相关建设中，数据资源归集、治理、共享与应用需要相互衔接。中国电子云将云资源与数据产品结合，为多主体协作提供基础支撑，并围绕公共数据利用、行业数据应用等方向形成相关方案。', cards: [] },
                    { title: '数据与人工智能融合', content: '中国电子云在数据智能平台中引入AI能力，围绕数据盘点、编目、治理与分析等工作探索智能化工具。通过把数据处理与模型应用相连接，帮助业务人员理解数据资源，也为面向行业的智能应用提供数据准备和开发支撑。\n其人工智能产品体系包含模型开发、应用开发和数据智能等平台方向，可与专属云及算力资源协同。对于政企应用建设，数据质量、知识组织、模型能力和业务流程需要共同考虑，形成从数据基础到应用服务的连续支撑。', cards: [] },
                    { title: '重点行业与应用方向', content: '', cards: [
                        { type: 'icon', title: '数字政府与城市治理', desc: '围绕政务上云、数据归集共享和城市运行管理组织建设。通过云资源与数据平台支撑业务系统协同，为管理部门开展综合分析、服务优化和运行监测提供基础。', visual: { type: 'icon', name: 'location_city' } },
                        { type: 'icon', title: '金融、医疗与企业应用', desc: '结合金融灾备、医疗业务及企业数字化需求配置云、存储和数据能力。通过基础设施与行业方案衔接，支撑数据处理、业务系统运行和跨系统协作。', visual: { type: 'icon', name: 'account_tree' } }
                    ] }
                ],
                sources: [
                    { title: '中国电子云介绍', url: 'https://cecloud.com/about.html' },
                    { title: '中国电子云产品介绍', url: 'https://cecloud.com/product/' },
                    { title: '可信数据流通平台', url: 'https://cecloud.com/product/7465571678228058112.html' },
                    { title: '数据智能平台', url: 'https://cecloud.com/product/datalim.html' },
                    { title: '人工智能产品', url: 'https://cecloud.com/product/artificial.html' }
                ],
                status: 'published', exampleContentVersion: 3, createdAt: '2026-11-20T01:00:00.000Z'
            }
        ],
        applications: [
            { id: 'example', name: '龙岗智研数据应用有限公司（示例）', creditCode: '91440300MA0000000X', contact: '李同学', phone: '13800000000', content: '希望与平台共创工业园区能耗分析应用，围绕数据治理、用能看板和异常预警开展联合验证。', createdAt: '2026-11-24T02:30:00.000Z' },
            { id: 'example-data-governance', name: '深圳市数源数据科技有限公司（示例）', creditCode: '91440300MA0000001X', contact: '张敏', phone: '13800000001', content: '申请共创企业数据治理服务，围绕数据目录梳理、标准统一和质量校验形成可复用方案，选择制造企业开展数据治理试点。', createdAt: '2026-11-26T01:20:00.000Z' },
            { id: 'example-trusted-sharing', name: '龙岗可信数据技术有限公司（示例）', creditCode: '91440300MA0000002X', contact: '陈宇', phone: '13800000002', content: '拟联合建设供应链可信数据流通应用，通过授权管理、隐私计算和使用留痕，支持上下游企业开展订单协同与供需匹配。', createdAt: '2026-11-25T07:45:00.000Z' },
            { id: 'example-ai-assistant', name: '深圳市知行智能科技有限公司（示例）', creditCode: '91440300MA0000003X', contact: '刘欣', phone: '13800000003', content: '希望共创数据服务智能助手，接入平台数据目录和咨询服务知识，提供资源检索、需求引导及服务匹配，联合验证问答准确性与使用体验。', createdAt: '2026-11-25T02:10:00.000Z' },
            { id: 'example-manufacturing', name: '龙岗智造数联科技有限公司（示例）', creditCode: '91440300MA0000004X', contact: '王磊', phone: '13800000004', content: '申请共创工业设备运行分析应用，整合设备状态、工单和产线数据，提供运行监测、故障预警和维护建议，先在园区制造企业开展验证。', createdAt: '2026-11-24T06:30:00.000Z' },
            { id: 'example-data-security', name: '深圳市安数信息技术有限公司（示例）', creditCode: '91440300MA0000005X', contact: '赵颖', phone: '13800000005', content: '拟共创数据流通过程安全评估服务，围绕敏感数据识别、分级分类、脱敏和访问审计形成检查流程，为数据产品上架及交付提供安全支持。', createdAt: '2026-11-23T08:15:00.000Z' },
            { id: 'example-commerce', name: '深圳市商域数据服务有限公司（示例）', creditCode: '91440300MA0000006X', contact: '周航', phone: '13800000006', content: '希望共创商圈经营分析应用，基于合法授权的商圈客流、门店分布及经营统计数据，提供选址评估、客群洞察和趋势分析服务。', createdAt: '2026-11-23T01:50:00.000Z' },
            { id: 'example-logistics', name: '龙岗云途物流科技有限公司（示例）', creditCode: '91440300MA0000007X', contact: '林悦', phone: '13800000007', content: '申请共创园区物流协同应用，结合货运需求、运力和配送时效数据，支持运力匹配、线路分析与异常提醒，提升企业物流协作效率。', createdAt: '2026-11-22T07:20:00.000Z' },
            { id: 'example-carbon', name: '深圳市绿衡数字科技有限公司（示例）', creditCode: '91440300MA0000008X', contact: '吴杰', phone: '13800000008', content: '拟共创企业碳排放核算与分析应用，梳理用电、用气及生产数据口径，提供碳排放统计、指标对比和减排分析，形成园区试点方案。', createdAt: '2026-11-22T02:40:00.000Z' },
            { id: 'example-data-assets', name: '龙岗数策咨询服务有限公司（示例）', creditCode: '91440300MA0000009X', contact: '郑琳', phone: '13800000009', content: '希望联合开展企业数据资产咨询服务，围绕资源盘点、应用场景梳理和数据产品设计形成服务包，帮助企业明确数据开发利用路径。', createdAt: '2026-11-21T06:10:00.000Z' },
            { id: 'example-quality', name: '深圳市数衡技术有限公司（示例）', creditCode: '91440300MA0000010X', contact: '黄晨', phone: '13800000010', content: '申请共创数据产品质量评估工具，从完整性、准确性、时效性和一致性开展规则校验，生成质量报告，支持供需双方核对数据交付结果。', createdAt: '2026-11-21T01:35:00.000Z' },
            { id: 'example-community', name: '龙岗科创数智研究有限公司（示例）', creditCode: '91440300MA0000011X', contact: '许宁', phone: '13800000011', content: '拟围绕数据社区征集的企业需求共创行业应用案例，组织供需交流与联合验证，沉淀可公开分享的实践材料，促进数据资源与应用需求对接。', createdAt: '2026-11-20T08:05:00.000Z' }
        ]
    };

    function list(collection) {
        const records = new Map(examples[collection].map(record => [record.id, { ...record }]));
        const collectionPrefix = prefix + collection + ':';
        try {
            for (const key of Object.keys(localStorage)) {
                if (!key.startsWith(collectionPrefix)) continue;
                try {
                    const record = JSON.parse(localStorage.getItem(key));
                    if (record?.id === key.slice(collectionPrefix.length)) {
                        const example = records.get(record.id);
                        const merged = { ...example, ...record };
                        if (collection === 'profiles') merged.subtitle = record.subtitle ?? record.summary ?? example?.subtitle ?? '';
                        if (collection === 'profiles' && example && (record.exampleContentVersion || 0) < 3) {
                            // Refresh built-in sample content and retain its publication state and uploaded logo.
                            ['heroImg', 'badge', 'heroTitle', 'heroSubtitle', 'lead', 'sections', 'sources', 'logoSource'].forEach(field => { merged[field] = example[field]; });
                            if (!record.logo || record.logo.startsWith('images/consult-advantage-')) merged.logo = example.logo;
                            merged.exampleContentVersion = 3;
                        }
                        records.set(record.id, merged);
                    }
                } catch {
                    // A malformed record should not hide the other records.
                }
            }
        } catch {
            // Keep the default examples available when browser storage is unavailable.
        }
        return [...records.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt) || a.id.localeCompare(b.id));
    }

    // 申请仅在当前页面内临时保留，重新加载后恢复内置记录。
    const submittedApplications = [];

    function listApplications() {
        return [...examples.applications, ...submittedApplications]
            .map(record => ({ ...record }))
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt) || a.id.localeCompare(b.id));
    }

    function submitApplication(fields) {
        const now = new Date().toISOString();
        const record = {
            ...fields,
            id: crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            createdAt: now,
            updatedAt: now
        };
        submittedApplications.push(record);
        window.dispatchEvent(new CustomEvent('partner-store-change', { detail: 'applications' }));
        return { ...record };
    }

    function listProfiles() {
        const stored = localStorage.getItem(profilesKey);
        const records = stored === null ? list('profiles') : JSON.parse(stored);
        if (!Array.isArray(records)) throw new Error('伙伴数据读取失败，请检查浏览器存储。');
        return records.map((record, index) => ({
            ...record,
            organizationCode: window.OrganizationCertificationStore?.resolveOrganization(record.organizationCode)?.code || record.organizationCode,
            subtitle: String(record.subtitle ?? record.summary ?? '').trim().slice(0, 100),
            status: ['draft', 'published', 'offline'].includes(record.status) ? record.status : 'draft',
            sort: Number.isFinite(record.sort) ? record.sort : index + 1
        })).sort((a, b) => a.sort - b.sort);
    }

    function persistProfiles(records) {
        try {
            localStorage.setItem(profilesKey, JSON.stringify(records.map((record, index) => ({ ...record, sort: index + 1 }))));
        } catch {
            throw new Error('暂时无法保存，请检查浏览器存储后重试。');
        }
        window.dispatchEvent(new CustomEvent('partner-store-change', { detail: 'profiles' }));
    }

    function savePartner(fields, id) {
        if (fields.status && !['draft', 'published', 'offline'].includes(fields.status)) throw new Error('发布状态无效。');
        const records = listProfiles();
        const index = records.findIndex(record => record.id === id);
        const previous = records[index];
        if (id && !previous) throw new Error('这条记录已不存在，请返回列表。');
        const now = new Date().toISOString();
        const record = {
            ...previous, ...fields,
            subtitle: String(fields.subtitle ?? fields.summary ?? previous?.subtitle ?? '').trim().slice(0, 100),
            id: previous?.id || (crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`),
            status: fields.status || previous?.status || 'draft',
            sort: previous?.sort ?? records.length + 1,
            createdAt: previous?.createdAt || now, updatedAt: now
        };
        const isUnpublishing = previous && fields.status === 'offline' && Object.keys(fields).length === 1;
        if (!isUnpublishing && !logoSrc(record.logo)) throw new Error('请上传企业 Logo。');
        if (record.status === 'published') {
            if (!record.name?.trim() || !record.subtitle) throw new Error('发布前请完善标题和副标题。');
            const message = window.ContentSectionEditor?.validate({ sections: record.sections || [] });
            if (message) throw new Error(message);
        }
        if (previous) records[index] = record;
        else records.push(record);
        persistProfiles(records);
        return record;
    }

    function associatePartner(id, organizationCode) {
        const organization = window.OrganizationCertificationStore.listOrganizations()
            .find(item => item.code === organizationCode && item.status === '已认证');
        if (!organization) throw new Error('请选择已认证的机构。');
        const records = listProfiles();
        const record = records.find(item => item.id === id);
        if (!record) throw new Error('这条记录已不存在，请返回列表。');
        record.organizationCode = organization.code;
        record.updatedAt = new Date().toISOString();
        persistProfiles(records);
        return record;
    }

    function setPartnerStatus(id, status) {
        if (!['draft', 'published', 'offline'].includes(status)) throw new Error('发布状态无效。');
        return savePartner({ status }, id);
    }

    function removePartner(id) {
        const records = listProfiles();
        if (records.find(record => record.id === id)?.status === 'published') throw new Error('请先下架伙伴，再执行删除。');
        persistProfiles(records.filter(record => record.id !== id));
    }

    function movePartner(id, direction, visibleIds) {
        const records = listProfiles();
        const visible = records.filter(record => visibleIds.includes(record.id));
        const index = visible.findIndex(record => record.id === id);
        const target = visible[index + direction];
        if (index < 0 || !target) return null;
        const from = records.findIndex(record => record.id === id);
        const to = records.findIndex(record => record.id === target.id);
        [records[from], records[to]] = [records[to], records[from]];
        persistProfiles(records);
        return index + direction;
    }

    window.addEventListener('storage', event => {
        if (event.key !== null && !event.key.startsWith(prefix)) return;
        const collection = event.key === profilesKey ? 'profiles' : event.key?.slice(prefix.length).split(':')[0];
        window.dispatchEvent(new CustomEvent('partner-store-change', { detail: collection }));
    });

    function logoSrc(value) {
        return /^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(value || '') || /^images\/partners\/(shumei-logo\.png|volcano-logo\.svg|cec-cloud-logo\.png)$/.test(value || '') ? value : '';
    }

    window.PartnerStore = {
        categories,
        listApplications,
        listPartners: listProfiles,
        listPublished: () => {
            try { return listProfiles().filter(record => record.status === 'published'); }
            catch { return []; }
        },
        submitApplication,
        savePartner, associatePartner, setPartnerStatus, removePartner, movePartner,
        logoSrc
    };
})();
