(function () {
    'use strict';

    if (window.PartnerStore) return;

    const prefix = 'lg-ecosystem-partners:v1:';
    const profilesKey = prefix + 'profiles-snapshot';
    const appsKey = prefix + 'partner-apps-snapshot';
    const requestsKey = prefix + 'requests-snapshot';
    const demoKey = prefix + 'demo-version';
    // Restore this module only on a real reload; navigation and new preview tabs share the current run.
    try {
        const reloaded = window.performance?.getEntriesByType('navigation')[0]?.type === 'reload';
        if (reloaded || localStorage.getItem(demoKey) !== '5') {
            Object.keys(localStorage).filter(key => key.startsWith(prefix) || key.startsWith('partner-preview:'))
                .forEach(key => localStorage.removeItem(key));
            localStorage.setItem(demoKey, '5');
        }
    } catch {
        // Defaults remain readable if browser storage is unavailable.
    }
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
            { id: 'example', name: '龙岗智研数据应用有限公司', creditCode: '91440300MA5H7K3R2W', contact: '李文博', phone: '13728649518', content: '拟联合开发宝龙工业园区能耗分析应用，首期接入两家制造企业的电表、生产班次及设备运行数据，建设分时用能看板和异常预警规则。已完成数据字段梳理，希望对接平台数据治理团队，确认接入规范及联合开发计划。', createdAt: '2026-11-24T02:30:00.000Z' },
            { id: 'example-data-governance', name: '深圳市数源数据科技有限公司', creditCode: '91440300MA5G9P6D8X', contact: '张敏', phone: '13928476305', content: '申请共建制造企业数据治理服务包，首批覆盖 ERP 物料、MES 工单及设备台账三类数据，统一编码标准并配置完整性、一致性校验规则。计划于12月完成首家企业的数据盘点和质量评估，申请安排技术对接。', createdAt: '2026-11-26T01:20:00.000Z' },
            { id: 'example-trusted-sharing', name: '龙岗可信数据技术有限公司', creditCode: '91440300MA5F8N2W6Y', contact: '陈宇', phone: '13632587149', content: '拟围绕龙岗电子制造产业链建设订单协同应用，连接采购订单、交付计划和库存汇总数据，通过企业授权、访问控制及操作留痕支持上下游协作。已明确三家意向企业，需共同确认数据使用边界和接入方案。', createdAt: '2026-11-25T07:45:00.000Z' },
            { id: 'example-ai-assistant', name: '深圳市知行智能科技有限公司', creditCode: '91440300MA5J3C7T4U', contact: '刘欣', phone: '15817369284', content: '计划建设平台数据服务智能助手，接入已发布的数据目录、产品说明及服务指南，支持自然语言检索和需求匹配。首期聚焦制造业数据采购咨询，希望与平台共同整理知识库并确定问答评测口径。', createdAt: '2026-11-25T02:10:00.000Z' },
            { id: 'example-manufacturing', name: '龙岗智造数联科技有限公司', creditCode: '91440300MA5E6Y9L3W', contact: '王磊', phone: '13590264837', content: '申请联合开发注塑设备运行分析应用，汇聚设备状态、停机原因及维修工单，形成故障预警和维护建议。首期覆盖宝龙片区一家企业的两条产线，拟于12月上旬开展数据接入，需协调工业数据接口与算法团队。', createdAt: '2026-11-24T06:30:00.000Z' },
            { id: 'example-data-security', name: '深圳市安数信息技术有限公司', creditCode: '91440300MA5H2B8Q77', contact: '赵颖', phone: '18675539216', content: '拟联合推出数据产品上架安全评估服务，围绕个人信息识别、数据分级分类、脱敏效果和访问审计形成检查清单。首期覆盖企业经营与供应链两类数据产品，交付风险评估报告及整改建议，申请确认审核衔接流程。', createdAt: '2026-11-23T08:15:00.000Z' },
            { id: 'example-commerce', name: '深圳市商域数据服务有限公司', creditCode: '91440300MA5G5U4M9U', contact: '周航', phone: '18823741695', content: '拟共建龙岗商圈经营分析应用，使用授权客流汇总、门店分布和经营统计数据，提供选址评估、业态分析及月度趋势报告。首期覆盖龙城、坂田两个片区，需对接商圈数据资源并统一统计周期。', createdAt: '2026-11-23T01:50:00.000Z' },
            { id: 'example-logistics', name: '龙岗云途物流科技有限公司', creditCode: '91440300MA5F9D6A2D', contact: '林悦', phone: '13480956372', content: '申请共建园区物流协同应用，整合发货计划、可用运力和到货时效信息，支持整车与零担需求匹配、线路分析及延误提醒。首期服务平湖片区三家仓储企业，希望共同确认运单字段、更新频率和数据授权方式。', createdAt: '2026-11-22T07:20:00.000Z' },
            { id: 'example-carbon', name: '深圳市绿衡数字科技有限公司', creditCode: '91440300MA5J7R3K87', contact: '吴杰', phone: '15989302746', content: '拟围绕园区制造企业开展碳排放核算应用共创，按月归集用电、用气和主要产品产量，形成企业碳排放台账及单位产值能耗分析。已完成首批企业的用能口径梳理，希望对接平台核算因子资源及报表服务。', createdAt: '2026-11-22T02:40:00.000Z' },
            { id: 'example-data-assets', name: '龙岗数策咨询服务有限公司', creditCode: '91440300MA5H4W8N59', contact: '郑琳', phone: '13825297461', content: '申请联合开展企业数据资产咨询服务，面向电子制造企业完成数据资源盘点、权属材料梳理和应用场景评估，形成资源清单及数据产品规划。首期拟服务两家企业，希望确认双方分工、交付清单和服务排期。', createdAt: '2026-11-21T06:10:00.000Z' },
            { id: 'example-quality', name: '深圳市数衡技术有限公司', creditCode: '91440300MA5G2T9C67', contact: '黄晨', phone: '18126283594', content: '拟开发数据交付质量评估工具，针对企业经营、物流运单等数据配置完整性、重复率、更新及时性和字段一致性规则，输出批次质量报告。计划对接平台交付流程，支持供需双方按合同约定核验交付结果。', createdAt: '2026-11-21T01:35:00.000Z' },
            { id: 'example-community', name: '龙岗科创数智研究有限公司', creditCode: '91440300MA5F6P3Y48', contact: '许宁', phone: '18948317625', content: '拟联合开展电子制造行业数据应用需求征集，已整理设备维护、库存协同和能耗管理三个方向的企业诉求。希望通过数据社区组织供需对接，筛选两项需求开展联合开发，并形成可供企业参考的应用成果。', createdAt: '2026-11-20T08:05:00.000Z' }
        ]
    };

    const section = (title, content, cards = []) => ({ title, content, cards });
    const capability = (title, desc, name) => ({ type: 'icon', title, desc, visual: { type: 'icon', name } });
    const step = (title, desc) => ({ type: 'sequence', title, desc });
    const references = links => ({ type: 'related-links', title: '官方产品资料', content: '', cards: [], links });

    examples.partnerApps = [
        {
            id: 'app-shumei-content', name: '数美天净', partnerId: 'shumei', badge: '内容安全',
            logo: 'images/applications/shumei-content.png',
            logoSource: 'https://www.ishumei.com/m/static/img/index/tj_04_a698123.png',
            subtitle: '覆盖文本、图片、音视频等内容形态，连接风险检测、审核策略与人工复核，支持企业内容生态治理。',
            heroSubtitle: '让内容检测融入发布与互动流程，兼顾审核效率和业务体验。',
            lead: '天净是数美科技面向在线内容安全的产品体系，围绕用户发布、内容传播与实时互动提供风险识别能力。企业可根据内容形态和业务规则组合检测服务，将识别结果用于发布审核、风险提示、人工复核及后续处置，形成持续优化的内容治理流程。',
            sections: [
                section('产品定位与适用对象', '在社区、电商、直播和在线教育业务中，帖子、商品描述、评论、图片及音视频往往由不同角色持续产生。天净面向这些内容进入业务系统的环节，帮助企业判断内容是否需要放行、复核或进一步处理。\n产品服务于需要管理内容发布和互动质量的运营、审核与技术团队。选用时可以从当前最集中的内容风险入手，再逐步覆盖新的内容形态和业务入口。'),
                section('多模态内容检测能力', '按文本、图片、音频和视频分别组织检测能力，便于在不同发布链路中配置审核重点。', [
                    capability('文本与语义检测', '识别广告导流、辱骂、垃圾信息及其他违规文本，结合语义、字符变体和自定义词库处理昵称、评论、帖子等内容。', 'text_fields'),
                    capability('图片内容识别', '检测图片中的风险内容、广告及二维码等信息，适用于用户头像、社区配图、商品图片等审核入口。', 'image'),
                    capability('音频内容审核', '围绕语音消息、语音直播和录播音频识别风险内容，帮助审核人员定位需要关注的语音信息。', 'graphic_eq'),
                    capability('视频与直播检测', '结合视频画面及音频内容开展检测，支持短视频、直播和视频社区等场景，关注风险片段及异常内容。', 'video_library')
                ]),
                section('审核策略与业务协同', '检测能力需要与企业自己的社区规则、发布权限和处置要求结合。不同入口可以设定不同的审核重点，例如评论关注辱骂和广告导流，商品图片关注违规内容，直播则更关注持续产生的音视频风险。\n机器检测用于处理规模化内容，人工复核用于判断存疑内容及特殊业务语境。业务团队可结合复核反馈观察风险类型和处置差异，持续调整词库、检测范围及内部审核流程。'),
                section('典型应用场景', '', [
                    capability('社区与用户互动', '在帖子、评论、昵称、签名和私信等入口组织检测，将风险结果交给审核或运营流程，协助维护社区内容秩序。', 'forum'),
                    capability('直播与音视频平台', '对直播画面、语音互动及上传视频进行持续或提交后检测，辅助定位风险内容，衔接提醒、复核和处置。', 'live_tv'),
                    capability('电商与在线教育', '围绕商品描述、用户评价、课程内容和课堂互动配置检测能力，兼顾业务内容规范与用户表达需求。', 'storefront')
                ]),
                section('接入与审核流程', '可按“确定内容范围—接入检测—配置处置—验证优化”组织落地工作。', [
                    step('梳理审核入口', '确定需要检测的内容类型、发布时机和内部审核规则，明确同步拦截或后续复核等业务要求。'),
                    step('开通并接入服务', '根据官方文档完成服务开通和接口接入，配置凭证、请求参数及相应内容的提交方式。'),
                    step('衔接处置流程', '将检测返回结果与业务记录关联，按业务规则分配放行、人工复核和风险处置任务。'),
                    step('验证并持续调整', '使用已授权的业务内容检查检测和复核效果，关注误判、漏判及处置反馈，逐步优化配置。')
                ]),
                section('使用条件与运营关注点', '接入前应确认提交内容的来源、使用授权和保存要求，并根据具体接口核对内容格式、文件大小、调用频率及结果返回方式。实时互动与批量文件审核的处理节奏不同，需要分别设计业务等待和异常处理流程。\n风险检测结果是审核流程的输入，应结合业务规则和复核机制使用。重要内容的处置、申诉与反馈由企业自身业务流程承接；具体检测范围和服务能力以开通产品及官方文档为准。'),
                references([
                    { title: '天净产品矩阵', url: 'https://www.ishumei.com/' },
                    { title: '文本检测', url: 'https://www.ishumei.com/new/product/tj/text' },
                    { title: '图片检测', url: 'https://www.ishumei.com/new/product/tj/image' },
                    { title: '音频检测', url: 'https://www.ishumei.com/new/product/tj/audio' },
                    { title: '视频检测', url: 'https://www.ishumei.com/new/product/tj/video' }
                ])
            ]
        },
        {
            id: 'app-shumei-risk', name: '数美天网', partnerId: 'shumei', badge: '业务风控',
            logo: 'images/applications/shumei-risk.jpg',
            logoSource: 'https://www.ishumei.com/m/static/img/index/tw_01_02a3e1b.jpg',
            subtitle: '围绕账号、设备与行为识别业务风险，为注册登录保护、营销反作弊和异常流量治理提供支持。',
            heroSubtitle: '关联设备、账号与行为，支持在线业务各环节的风险识别与处置。',
            lead: '天网是数美科技面向在线业务风险的产品体系，关注机器注册、账号盗用、营销作弊、渠道假量等问题。它将设备特征、账号信息与行为信号结合，帮助企业在用户进入、参与活动及领取权益等关键环节识别异常，并将风险判断衔接到业务策略和运营处置。',
            sections: [
                section('业务风险识别的产品定位', '在线业务中的异常行为往往会跨越多个环节：批量注册的账号可能继续参与拉新、领取优惠券或制造虚假热度。只观察单次请求，难以完整理解账号背后的设备和行为关系。\n天网围绕业务事件组织风险识别，适合有账号体系、营销活动和流量运营需求的企业。风控、运营和研发团队可以结合业务目标，选择需要保护的入口并明确对应的处置方式。'),
                section('核心风控能力', '', [
                    capability('注册与登录保护', '识别机器注册、异常登录和撞库盗号等风险，结合账号、设备及登录行为，辅助判断账号使用是否异常。', 'account_circle'),
                    capability('设备风险识别', '通过设备指纹及风险标签关注模拟器、云手机、设备篡改和自动化工具等环境，补充账号之外的识别维度。', 'devices'),
                    capability('营销活动反作弊', '针对领券、红包、抽奖、秒杀和拉新等环节识别批量参与、权益套取和虚假裂变行为。', 'campaign'),
                    capability('关联与团伙分析', '将账号、设备、手机号、网络环境及行为信号关联起来，辅助发现单个账号之外的群体性异常。', 'hub')
                ]),
                section('从风险信号到业务策略', '不同业务事件对应不同的损失和用户体验要求。登录保护更关注账号安全，活动参与更关注权益公平，渠道投放则更关注流量是否真实。风险识别应围绕具体事件配置，避免将不同场景直接使用同一处理规则。\n企业可根据风险结果安排放行、二次校验、限制参与或人工核查，并通过运营分析观察策略效果。把识别结果、业务决策和后续反馈关联起来，有助于持续理解异常行为的变化。'),
                section('典型应用场景', '', [
                    capability('账号与会员体系', '在注册、登录和账号重要操作时识别异常环境与行为，协助减少垃圾账号、账号盗用及异常访问带来的影响。', 'verified_user'),
                    capability('电商促销与用户增长', '对领券、抽奖、拼团、拉新等业务节点进行识别，辅助区分正常参与与批量作弊，保护活动资源。', 'shopping_bag'),
                    capability('渠道与内容运营', '围绕推广转化、榜单和内容互动关注虚假流量与自动化行为，结合真实业务反馈评估渠道质量。', 'monitoring')
                ]),
                section('接入与策略验证流程', '', [
                    step('明确保护事件', '梳理注册、登录、领券等关键节点，确认需要识别的风险、业务参数以及对应的处置目标。'),
                    step('接入信号与接口', '按官方接入说明配置所需 SDK 或接口，将合法取得的设备及业务事件信号提交到相应服务。'),
                    step('配置业务决策', '将返回的风险信息与企业规则结合，设计二次验证、限制操作、人工核查等处理路径。'),
                    step('观察运营反馈', '结合正常用户体验、活动资源分配和异常处置记录评估效果，持续修订事件参数及处理策略。')
                ]),
                section('数据范围与使用关注点', '接入前需明确设备信息、账号标识及行为参数的采集范围、权限和使用目的。不同客户端、业务节点和开通服务需要的参数可能不同，应按官方文档核对，避免提交与当前识别目标无关的数据。\n风险标签和评分需要结合实际业务语境解释。上线前宜验证正常用户、复杂网络环境及异常请求的处理路径；凭证、接口调用权限和结果访问权限由企业统一管理，服务范围以具体开通能力为准。'),
                references([
                    { title: '注册登录保护', url: 'https://www.ishumei.com/new/product/tw/register' },
                    { title: '营销风控', url: 'https://www.ishumei.com/new/product/tw/marketing' },
                    { title: '设备指纹产品概述', url: 'https://help.ishumei.com/docs/tw/sdk/overview/' },
                    { title: '渠道流量反作弊', url: 'https://ishumei.com/new/product/tw/channel' }
                ])
            ]
        },
        {
            id: 'app-volcano-ark', name: '火山方舟', partnerId: 'volcano', badge: '大模型应用',
            logo: 'images/applications/ark-model.svg',
            logoSource: 'https://lucide.dev/icons/brain-circuit',
            subtitle: '提供模型选择、推理调用、精调与评测等服务，帮助企业从能力验证走向业务应用开发。',
            heroSubtitle: '连接模型能力、开发工具与业务需求，构建适合企业场景的智能应用。',
            lead: '火山方舟是火山引擎的大模型服务平台，提供模型推理、精调和评测等服务。开发者可以从模型能力体验出发，结合业务数据和应用需求选择模型，通过 API 将文本生成、视觉理解、向量化或工具调用等能力组织到自己的业务流程中。',
            sections: [
                section('从模型服务到业务应用', '企业使用大模型时，既要判断模型是否适合当前任务，也要关注接入方式、结果质量和日常运行。火山方舟将模型发现、体验、调用及优化相关能力集中在同一服务体系中，为模型应用开发提供基础。\n产品面向应用研发、算法与业务团队。可先围绕一个明确任务开展验证，例如整理业务资料、辅助处理工单或生成内容，再根据效果和使用要求决定接入范围。'),
                section('模型开发与使用能力', '', [
                    capability('模型选择与体验', '在模型广场了解可用模型的能力与适用方向，通过推理体验比较不同模型在业务任务上的响应表现。', 'neurology'),
                    capability('API 推理调用', '通过接入点和 API 将模型能力连接到业务系统，按模型支持范围处理文本、图像及其他输入输出。', 'api'),
                    capability('模型精调', '在适用模型与服务范围内，使用准备好的业务数据进行精调，形成更贴近特定表达或任务要求的模型。', 'tune'),
                    capability('效果评测与管理', '结合评测数据观察模型表现，管理精调产物、模型信息和接入配置，为选型和后续优化提供依据。', 'fact_check')
                ]),
                section('知识检索与工具调用的组合方式', '面对企业资料问答，可以先检索有权限使用的业务文档，再把相关内容交给模型组织回答；面对需要查询业务状态或执行特定操作的任务，可以结合模型支持的工具调用能力连接相应服务。\n这些应用仍需要业务侧定义资料范围、工具权限和结果确认方式。模型负责理解与生成，知识检索、业务工具和应用界面共同组成完整流程，具体组合应按选用模型及当前服务能力设计。'),
                section('典型应用方向', '', [
                    capability('企业知识与资料问答', '围绕内部制度、产品说明和服务资料构建问答流程，为员工或客户提供带业务语境的信息获取入口。', 'menu_book'),
                    capability('文档与内容处理', '将摘要、信息提取、改写及分类等能力嵌入日常资料处理，由业务人员核对内容并完成后续使用。', 'description'),
                    capability('业务助手与工具协同', '结合工单、检索和查询工具组织智能助手，在明确权限下协助获取信息、整理事项和准备处理建议。', 'support_agent')
                ]),
                section('从体验到应用的接入流程', '', [
                    step('准备账号与任务', '完成服务所需的账号认证和权限设置，明确应用任务、数据范围与结果质量要求。'),
                    step('选择模型并验证', '在模型广场核对能力说明，用已授权的业务资料进行体验，比较输出质量与任务适配情况。'),
                    step('配置 API 接入', '按官方文档建立接入配置、管理密钥和调用权限，在应用中处理输入、输出、异常及结果展示。'),
                    step('评测与持续优化', '围绕任务准确性、回答完整性和业务适用性开展评测，按需调整提示词、检索方式或模型配置。')
                ]),
                section('数据、权限与结果使用', '接入时需核对模型支持的输入类型、上下文范围、调用限额及可用地域。密钥应由受控服务管理，企业知识和业务工具按用户权限提供，避免在不必要的调用中传入敏感资料。\n模型输出需要结合任务性质安排核对机制，涉及业务执行的操作应由应用设置必要的确认与权限控制。可用模型、具体能力和服务规则会持续更新，使用前以官方模型说明和控制台配置为准。'),
                references([
                    { title: '火山方舟产品介绍', url: 'https://docs.volcengine.com/docs/ark?lang=zh' },
                    { title: '平台能力速览', url: 'https://console.volcengine.com/ark/region:cn-beijing/docs/platform-capabilities-overview' },
                    { title: '官方产品入口', url: 'https://www.volcengine.com/product/ark' }
                ])
            ]
        },
        {
            id: 'app-doubao-speech', name: '豆包语音', partnerId: 'volcano', badge: '智能语音',
            logo: 'images/applications/doubao-icon.png',
            logoSource: 'https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/favicon/192x192.png',
            subtitle: '连接语音识别、录音转写与语音合成，为会议字幕、客服记录、内容配音及语音交互提供能力。',
            heroSubtitle: '让语音与文字自然连接，服务实时交互与音频内容生产。',
            lead: '豆包语音是火山引擎面向开发者和企业的智能语音服务体系，包含语音识别与语音合成等能力。业务系统可按使用节奏选择实时流式识别或录音文件转写，也可把文本转为语音，用于会议字幕、客服辅助、服务播报和音视频内容制作。',
            sections: [
                section('语音服务的产品定位', '语音业务通常包含两类需求：把用户说的话转成可处理的文字，以及把系统生成或人工编写的文字转成可听的声音。豆包语音围绕这些输入输出环节提供能力，便于企业与已有应用流程结合。\n实时对话、会议记录和内容配音对返回节奏与音频效果的要求不同。选型时应先确定声音从哪里产生、何时需要结果，以及结果将交给用户、业务人员还是后续系统使用。'),
                section('语音识别与合成能力', '', [
                    capability('实时流式识别', '将持续输入的语音转换为文字，支持边说边返回的实时字幕，或按语句返回结果的语音输入流程。', 'mic'),
                    capability('录音文件转写', '面向录音资料开展转写，可结合标点、分句、数字规整和说话人区分等能力组织文字结果。', 'audio_file'),
                    capability('自然语音合成', '根据文本及上下文生成语音，关注语调、情绪、停顿和表达方式，适用于播报、阅读与配音。', 'record_voice_over'),
                    capability('业务语言适配', '依据选用产品配置热词、纠错和识别输出方式，或选择适合业务内容的音色及合成参数。', 'settings_voice')
                ]),
                section('实时处理与文件处理的选择', '实时识别适合字幕、语音输入和交互式应用，需要关注网络连续性、结果返回节奏和对话停顿。录音文件识别适合会议资料、客服录音等已完成采集的内容，更关注完整转写及后续整理。\n语音合成则从文本内容出发，根据服务播报、知识讲解或内容配音选择表达方式。不同产品的音色、语种、格式和调用方式应分别核对，不能将一项服务的能力默认用于全部语音产品。'),
                section('典型应用场景', '', [
                    capability('会议字幕与资料整理', '在会议期间提供实时文字辅助，或在会议结束后转写录音；后续可与摘要、检索及事项整理流程衔接。', 'groups'),
                    capability('客服记录与服务辅助', '将通话或客服录音转为文字，便于服务人员检索、整理和开展质量分析；结果按业务权限管理。', 'headset_mic'),
                    capability('内容配音与语音播报', '为课程、短视频、有声阅读和业务通知生成语音，依据内容用途选择音色、语速及表达方式。', 'podcasts')
                ]),
                section('接入与效果验证流程', '', [
                    step('确定任务与音频来源', '区分实时识别、录音转写或文本合成，确认采集设备、输入语言、音频环境及结果使用方式。'),
                    step('开通服务并配置应用', '根据官方文档开通所需语音产品，配置应用凭证、资源和对应接口参数。'),
                    step('连接业务输入输出', '提交音频流、录音文件或待合成文本，处理返回文字、任务状态或语音文件并接入业务页面。'),
                    step('验证业务效果', '围绕背景噪声、专业词汇、说话方式和播报内容检查结果，调整热词、音色及应用处理逻辑。')
                ]),
                section('音频条件与使用范围', '识别效果会受到录音清晰度、背景噪声、口音及多人重叠讲话等因素影响。接入前应核对采样率、编码、声道、文件时长和并发等要求，并根据实时或文件任务安排失败重试与结果确认。\n音频采集、保存和使用应具有相应授权，声音及文字结果按业务权限访问。合成音色和声音使用范围以开通服务的规则为准；如使用声音复刻等能力，需另外核对授权和适用条件。'),
                references([
                    { title: '语音识别产品介绍', url: 'https://docs.volcengine.com/docs/doubao-voice/product-overview-22?lang=zh' },
                    { title: '语音合成产品介绍', url: 'https://docs.volcengine.com/docs/doubao-voice/product-overview-18?lang=zh' },
                    { title: '语音合成官方产品页', url: 'https://www.volcengine.com/product/tts' }
                ])
            ]
        },
        {
            id: 'app-cloud-collaboration', name: '中国电子云可信数据流通平台', partnerId: 'cec-cloud', badge: '可信数据流通',
            logo: 'images/applications/trusted-data.svg',
            logoSource: 'https://lucide.dev/icons/network',
            subtitle: '以连接器、数据目录、数字合约和使用控制连接多方主体，支撑公共数据开发与产业链数据协作。',
            heroSubtitle: '明确数据使用规则，连接资源发现、授权协作与可信流通。',
            lead: '中国电子云可信数据流通平台（Trusted Data Platform）面向跨主体的数据共享、开发和使用需求，围绕接入连接器、数据目录、数字合约及使用控制组织能力。平台通过可信协作环境连接数据提供方、使用方和服务方，支持公共数据开发利用、产业链协同及企业数据流通。',
            sections: [
                section('多主体数据协作的产品定位', '跨机构使用数据时，除了发现资源，还需要明确参与主体、使用目的和处理规则。可信数据流通平台将这些要求组织到数据协作过程，使资源目录、参与方及使用条件能够相互关联。\n产品适用于组织公共数据开发、产业链协作和企业间数据使用的机构。建设时应结合实际场景确定参与边界、数据范围和运营责任，再逐步连接资源与业务流程。'),
                section('可信流通核心能力', '', [
                    capability('接入连接器', '为参与机构提供接入可信数据协作环境的通道，连接业务节点与数据资源，支撑多方之间的协作。', 'cable'),
                    capability('数据目录与流通', '组织标准化的资源与产品清单，连接目录发现、数据共享、交付及交易相关流程，帮助参与方定位可用数据。', 'dataset'),
                    capability('数字合约', '以结构化方式描述参与方、数据用途、使用条件和环境要求，为协作过程提供可执行的规则依据。', 'contract'),
                    capability('数据使用控制', '将合约约定与运行环境中的控制手段结合，在数据传输、存储、使用和销毁等环节约束使用行为。', 'verified_user')
                ]),
                section('隐私保护与空间运营', '对于不适合直接汇集或对外提供原始数据的场景，可结合数据加密核验、数据沙箱和隐私计算等方式组织处理，在明确的数据边界内完成协作任务。具体采用哪种方式，需要结合数据形态、计算目标和参与方条件设计。\n平台支持围绕不同业务需求组织可信数据空间。各空间可明确参与主体、数据资源与使用策略，由运营方持续管理协作关系和服务范围，适配不同项目及行业需求。'),
                section('典型应用场景', '', [
                    capability('公共数据开发利用', '围绕授权运营场景组织公共数据与社会数据的融合开发，明确提供方、使用方及服务方的范围和使用规则。', 'account_balance'),
                    capability('产业链与供应链协同', '连接上下游在研发、生产、物流及金融等环节的协作需求，在约定边界内组织数据资源与联合应用。', 'hub'),
                    capability('企业数据共享与使用', '帮助企业引入业务所需的外部数据，也可组织自身可提供的数据资源，通过目录及规则连接潜在使用方。', 'domain')
                ]),
                section('协作建设与使用流程', '', [
                    step('确定参与方与场景', '明确数据提供方、使用方和运营方，梳理业务目标、协作范围及各方需要承担的维护责任。'),
                    step('连接资源并组织目录', '按建设方案接入连接器和相关系统，整理资源说明、数据范围及更新安排，形成可发现的目录。'),
                    step('约定并配置使用规则', '明确数据用途、处理环境和使用期限，将数字合约要求与使用控制、权限及计算方式相衔接。'),
                    step('开展协作与运营核对', '按约定流程组织共享、计算或交付，核对任务结果及使用情况，随业务变化调整资源和协作关系。')
                ]),
                section('建设条件与协作边界', '可信流通需要参与机构共同明确数据来源、使用授权、资源维护和协作规则。接入方案应核对现有系统、网络环境、数据质量及运行要求，并根据业务目标确定连接器、计算环境和运营流程的配置范围。\n数据可以采用共享、受控使用或联合计算等不同协作方式，具体路径由参与方需求和建设方案决定。平台能力及接入服务以中国电子云官方产品说明和具体项目约定为准。'),
                references([
                    { title: '可信数据流通平台', url: 'https://cecloud.com/product/7465571678228058112.html' },
                    { title: '中国电子云官方网站', url: 'https://cecloud.com/' }
                ])
            ]
        }
    ].map((application, index) => ({
        ...application,
        heroImg: examples.profiles.find(partner => partner.id === application.partnerId).heroImg,
        heroTitle: application.name, status: 'published', sort: index + 1,
        createdAt: '2026-11-26T02:00:00.000Z', updatedAt: '2026-11-26T02:00:00.000Z'
    }));

    function listApplications() {
        let submitted = [];
        try { submitted = JSON.parse(localStorage.getItem(requestsKey) || '[]'); } catch { /* Use defaults. */ }
        return [...examples.applications, ...submitted]
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
        const submitted = JSON.parse(localStorage.getItem(requestsKey) || '[]');
        submitted.push(record);
        localStorage.setItem(requestsKey, JSON.stringify(submitted));
        window.dispatchEvent(new CustomEvent('partner-store-change', { detail: 'applications' }));
        return { ...record };
    }

    function listProfiles(collection = 'profiles') {
        let stored = null;
        try { stored = localStorage.getItem(collection === 'profiles' ? profilesKey : appsKey); } catch { /* Use defaults. */ }
        const records = stored === null ? JSON.parse(JSON.stringify(examples[collection])) : JSON.parse(stored);
        if (!Array.isArray(records)) throw new Error('伙伴数据读取失败，请检查浏览器存储。');
        return records.map((record, index) => ({
            ...record,
            subtitle: collection === 'partnerApps' ? String(record.subtitle ?? '') : String(record.subtitle ?? record.summary ?? '').trim().slice(0, 100),
            status: ['draft', 'published', 'offline'].includes(record.status) ? record.status : 'draft',
            sort: Number.isFinite(record.sort) ? record.sort : index + 1
        })).sort((a, b) => a.sort - b.sort);
    }

    function persistProfiles(records, collection = 'profiles') {
        try {
            localStorage.setItem(collection === 'profiles' ? profilesKey : appsKey, JSON.stringify(records.map((record, index) => ({ ...record, sort: index + 1 }))));
        } catch {
            throw new Error('暂时无法保存，请检查浏览器存储后重试。');
        }
        window.dispatchEvent(new CustomEvent('partner-store-change', { detail: collection }));
    }

    function listForNavigation(collection = 'profiles') {
        try { return listProfiles(collection).filter(record => record.status === 'published').slice(0, 5); }
        catch { return []; }
    }

    function savePartner(fields, id, collection = 'profiles') {
        if (fields.status && !['draft', 'published', 'offline'].includes(fields.status)) throw new Error('发布状态无效。');
        const records = listProfiles(collection);
        const index = records.findIndex(record => record.id === id);
        const previous = records[index];
        if (id && !previous) throw new Error('这条记录已不存在，请返回列表。');
        const now = new Date().toISOString();
        const record = {
            ...previous, ...fields,
            subtitle: collection === 'partnerApps' ? String(fields.subtitle ?? previous?.subtitle ?? '') : String(fields.subtitle ?? fields.summary ?? previous?.subtitle ?? '').trim().slice(0, 100),
            id: previous?.id || (crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`),
            status: fields.status || previous?.status || 'draft',
            sort: previous?.sort ?? records.length + 1,
            createdAt: previous?.createdAt || now, updatedAt: now
        };
        const isUnpublishing = previous && fields.status === 'offline' && Object.keys(fields).length === 1;
        if (collection === 'partnerApps' && !isUnpublishing) {
            const limits = { name: 100, subtitle: 100, badge: 100, heroTitle: 100, heroSubtitle: 200, lead: 2000 };
            const labels = { name: '标题', subtitle: '副标题', badge: '角标文字', heroTitle: '横幅标题', heroSubtitle: '横幅副标题', lead: '引言' };
            Object.entries(limits).forEach(([field, limit]) => {
                if (String(record[field] ?? '').length > limit) throw new Error(labels[field] + '不能超过' + limit + '字，请调整后保存。');
            });
        }
        if (!isUnpublishing && !logoVisual(record.logo)) throw new Error(collection === 'profiles' ? '请上传图片或选择图标作为企业 Logo。' : '请上传图片或选择图标作为应用 Logo。');
        if (collection === 'partnerApps' && !isUnpublishing && !listProfiles().some(partner => partner.id === record.partnerId)) throw new Error('请选择所属伙伴。');
        if (record.status === 'published') {
            if (!record.name?.trim() || !record.subtitle) throw new Error('发布前请完善标题和副标题。');
            const message = window.ContentSectionEditor?.validate({ sections: record.sections || [] });
            if (message) throw new Error(message);
        }
        if (previous) records[index] = record;
        else records.push(record);
        persistProfiles(records, collection);
        return record;
    }

    function setPartnerStatus(id, status, collection = 'profiles') {
        if (!['draft', 'published', 'offline'].includes(status)) throw new Error('发布状态无效。');
        return savePartner({ status }, id, collection);
    }

    function removePartner(id, collection = 'profiles') {
        const records = listProfiles(collection);
        if (records.find(record => record.id === id)?.status === 'published') throw new Error('请先下架' + (collection === 'profiles' ? '伙伴' : '应用') + '，再执行删除。');
        if (collection === 'profiles' && listProfiles('partnerApps').some(app => app.partnerId === id)) throw new Error('该伙伴仍有关联应用，请先调整或删除关联应用。');
        persistProfiles(records.filter(record => record.id !== id), collection);
    }

    function movePartner(id, direction, visibleIds, collection = 'profiles') {
        const records = listProfiles(collection);
        const visible = records.filter(record => visibleIds.includes(record.id));
        const index = visible.findIndex(record => record.id === id);
        const target = visible[index + direction];
        if (index < 0 || !target) return null;
        const from = records.findIndex(record => record.id === id);
        const to = records.findIndex(record => record.id === target.id);
        [records[from], records[to]] = [records[to], records[from]];
        persistProfiles(records, collection);
        return index + direction;
    }

    window.addEventListener('storage', event => {
        if (event.key !== null && !event.key.startsWith(prefix)) return;
        const collection = event.key === profilesKey ? 'profiles' : event.key === appsKey ? 'partnerApps'
            : event.key === requestsKey ? 'applications' : null;
        window.dispatchEvent(new CustomEvent('partner-store-change', { detail: collection }));
    });
    window.addEventListener('pageshow', () => window.dispatchEvent(new CustomEvent('partner-store-change')));

    function logoSrc(value) {
        if (value && typeof value === 'object') value = value.type === 'image' ? value.src : '';
        return /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/i.test(value || '')
            || /^images\/partners\/(shumei-logo\.png|volcano-logo\.svg|cec-cloud-logo\.png)$/.test(value || '')
            || /^images\/applications\/(shumei-content\.png|shumei-risk\.jpg|doubao-icon\.png|ark-model\.svg|trusted-data\.svg)$/.test(value || '') ? value : '';
    }

    function logoVisual(value) {
        if (value?.type === 'icon' && /^[a-z][a-z0-9_]{0,60}$/.test(value.name || '')) return { type: 'icon', name: value.name };
        const src = logoSrc(value);
        return src ? { type: 'image', src } : null;
    }

    // One field map for the application form preview, navigation, cards and detail.
    // An intentionally empty field stays empty; business copy is never supplied here.
    function applicationPresentation(record = {}) {
        const text = field => String(record[field] ?? '');
        return {
            name: text('name'), subtitle: text('subtitle'), logo: logoVisual(record.logo),
            partnerName: listProfiles().find(partner => partner.id === record.partnerId)?.name || '',
            badge: text('badge'), heroImg: text('heroImg'), heroTitle: text('heroTitle'),
            heroSubtitle: text('heroSubtitle'), lead: text('lead'),
            sections: Array.isArray(record.sections) ? record.sections.map(section => ({
                ...section,
                title: String(section.title ?? ''), content: String(section.content ?? ''),
                cards: Array.isArray(section.cards) ? section.cards : []
            })) : []
        };
    }

    window.PartnerStore = {
        categories,
        listApplications,
        listPartners: listProfiles,
        listForNavigation,
        listPublished: () => {
            try { return listProfiles().filter(record => record.status === 'published'); }
            catch { return []; }
        },
        submitApplication,
        savePartner, setPartnerStatus, removePartner, movePartner,
        logoSrc, logoVisual,
        applicationStore: {
            presentation: applicationPresentation,
            listPartners: () => listProfiles('partnerApps'),
            listForNavigation: () => listForNavigation('partnerApps'),
            listPublished: () => {
                try { return listProfiles('partnerApps').filter(record => record.status === 'published'); }
                catch { return []; }
            },
            savePartner: (fields, id) => savePartner(fields, id, 'partnerApps'),
            setPartnerStatus: (id, status) => setPartnerStatus(id, status, 'partnerApps'),
            removePartner: id => removePartner(id, 'partnerApps'),
            movePartner: (id, direction, visibleIds) => movePartner(id, direction, visibleIds, 'partnerApps'),
            associatePartner: (id, partnerId) => savePartner({ partnerId }, id, 'partnerApps'),
            logoSrc, logoVisual
        }
    };
})();
