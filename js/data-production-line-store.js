(function () {
    'use strict';

    const storageKey = 'lgk-data-production-lines-v1';
    const previewKey = 'lgk-data-production-line-preview';
    const defaults = [
        {
            id: "low-altitude",
            updatedAt: "2026-11-25T02:30:00.000Z",
            heroImg: "images/production-line-lowalt.jpg",
            badge: "低空经济数据底座",
            heroTitle: "低空数据产线",
            heroSubtitle: "涵盖低空数据基础建设、飞行数据处理、空域管理等多维度数据采集与分析体系",
            lead: "低空经济数据生产线是服务无人机、eVTOL等低空飞行器运营管理的核心数据基础设施。龙岗区作为深圳低空经济产业发展重点区域，已出台24条促进低空经济发展的政策措施，建成低空智能融合测试基地，并与高德合作打造地空一体数字地图示范基地，构建完整的低空数据生态体系。",
            sections: [
                {
                    title: "低空数据采集与融合",
                    cards: [
                        {
                            type: "image-grid", layout: { preset: "left-right", rows: 1, columns: 2 },
                            blocks: [
                                {
                                    kind: "text",
                                    ratio: 1,
                                    text: "依托雷达、ADS-B、光电传感器等多源感知设备，构建覆盖全域的低空数据采集网络。实时获取飞行器位置、速度、航向、高度等关键参数，融合气象、地形、障碍物等环境数据，形成低空态势感知全景视图。\n龙岗已建成国内领先的低空智能融合测试基地，部署了OpenSILAS——全国首个开放的智能融合低空系统，实现多源异构数据的实时融合处理与可视化呈现。"
                                },
                                {
                                    kind: "image",
                                    ratio: 1,
                                    visual: { type: "image", src: "images/production-line-lowalt.jpg", name: "低空数据采集" }
                                }
                            ]
                        }
                    ]
                },
                { title: "三维空域建模与航路规划", content: "基于高精度三维地图与倾斜摄影模型，构建城市低空三维空域数字孪生。通过空域网格化管理技术，将城市低空划分为可管控的飞行单元，支持航路自动规划、冲突检测与动态避障。龙岗区与高德软件联合打造的\"空中高德\"项目，已实现低空三维地图、数字路网等核心技术的落地应用，为无人机物流、空中交通等场景提供精准的空域数据服务。" },
                { title: "运营监管数据服务", content: "构建低空飞行器运营全周期数据管理体系，覆盖飞行器注册、适航审定、飞行计划审批、实时监控、应急处置等全流程。通过数据分析平台为监管部门提供飞行密度热力图、风险评估报告、运营效能分析等决策支持服务。龙岗正积极推进国家民用无人机产品质量监督检验中心和国家低空适航审定中心建设，为低空经济发展提供权威的检测认证与数据标准支撑。" },
                {
                    title: "应用案例",
                    cards: [
                        {
                            type: "icon",
                            title: "OpenSILAS系统",
                            desc: "全国首个开放的智能融合低空系统，龙岗低空经济分院率先落地应用。",
                            visual: { type: "icon", name: "flight" }
                        },
                        {
                            type: "icon",
                            title: "空中高德",
                            desc: "与高德合作打造地空一体数字地图示范基地，实现低空三维地图核心技术突破。",
                            visual: { type: "icon", name: "map" }
                        },
                        {
                            type: "icon",
                            title: "载人航线运营",
                            desc: "开设低空载人航线服务，年度总奖励额度达1500万元，推动城市空中交通发展。",
                            visual: { type: "icon", name: "public" }
                        }
                    ]
                }
            ]
        },
        {
            id: "embodied",
            updatedAt: "2026-11-24T07:20:00.000Z",
            heroImg: "images/production-line-robot.jpg",
            badge: "智能制造核心基础设施",
            heroTitle: "具身数据产线",
            heroSubtitle: "支撑人工智能模型训练的核心基础设施，涵盖数据采集、标注、增强、模型训练及验证全流程",
            lead: "机器人训练数据生产线是支撑人工智能模型训练的核心基础设施，其核心流程涵盖数据采集、标注、增强、模型训练及验证等环节，为机器人智能化提供高质量数据基础。",
            sections: [
                {
                    title: "数据采集与标注",
                    cards: [
                        {
                            type: "image-grid", layout: { preset: "left-right", rows: 1, columns: 2 },
                            blocks: [
                                {
                                    kind: "text",
                                    ratio: 1,
                                    text: "通过传感器（如摄像头、激光雷达）和工业设备（如机器人、数控机床）采集多模态数据，包括视觉、触觉、位置信息等，数据经清洗和标注，为模型提供监督信号。\n例如在模具智能生产线中，通过SCADA系统实时采集设备状态数据，并与MES/ERP系统联动，确保数据来源的准确性和实时性。"
                                },
                                {
                                    kind: "image",
                                    ratio: 1,
                                    visual: { type: "image", src: "images/production-line-robot.jpg", name: "机器人训练数据采集" }
                                }
                            ]
                        }
                    ]
                },
                { title: "数据增强与模型训练", content: "采用放射、缩放等策略扩充并多样化样本，结合卷积神经网络（CNN）、循环神经网络（RNN）等模型进行训练，多模态融合技术整合RGB图像、点云等数据，形成机器人的环境感知能力。通过数据增强有效解决训练样本不足的问题，同时提高模型的鲁棒性和泛化能力。" },
                { title: "仿真测试与迭代优化", content: "先在虚拟环境（如Gazebo）中预训练，再迁移至真实场景微调。宝佑软件的钢铁产线方案通过机器人替代人工，在高温、高污染环境中实现少人化生产，验证了数据驱动的可靠性。虚实结合的训练策略大幅缩短了从研发到部署的周期，降低了实际测试的成本与风险。" },
                {
                    title: "应用案例",
                    cards: [
                        {
                            type: "icon",
                            title: "工业领域",
                            desc: "模具智能生产线通过工业机器人、AGV等设备实现全流程自动化，生产效率显著提升。",
                            visual: { type: "icon", name: "settings" }
                        },
                        {
                            type: "icon",
                            title: "教育实训",
                            desc: "智能制造实验平台融合PLC、机器人等技术，提供柔性化训练环境。",
                            visual: { type: "icon", name: "school" }
                        },
                        {
                            type: "icon",
                            title: "人形机器人",
                            desc: "国内最大训练场年产超600万条真机数据，支持多任务协同训练。",
                            visual: { type: "icon", name: "smart_toy" }
                        }
                    ]
                }
            ]
        },
        {
            id: "governance",
            updatedAt: "2026-11-23T01:45:00.000Z",
            heroImg: "images/production-line-governance.jpg",
            badge: "数据质量管理标杆",
            heroTitle: "数据治理产线",
            heroSubtitle: "统一规范数据采集治理环节的数据处理规范，完善管理标准与信息化平台",
            lead: "数据治理生产线以\"一数一源一标准\"为核心理念，构建覆盖数据全生命周期的标准化治理体系。龙岗区政务数据管理能力已入选全国首批DCMM贯标试点，是粤港澳大湾区唯一获此资格的单位，汇聚政务业务数据超292亿条，治理形成35类专题509个数据图层。",
            sections: [
                {
                    title: "数据采集标准化",
                    cards: [
                        {
                            type: "image-grid", layout: { preset: "left-right", rows: 1, columns: 2 },
                            blocks: [
                                {
                                    kind: "text",
                                    ratio: 1,
                                    text: "建立统一的数据采集规范与接口标准，覆盖政务、产业、民生等多个领域。通过\"大采集\"行动方案，实现跨部门、跨系统数据的自动化归集与标准化入库。\n龙岗区印发《数据资源大采集大治理大流通大应用工作方案》，推动全区各部门数据资源统一编目登记，编制公共数据资源\"一本账\"，确保数据来源清晰、权属明确。"
                                },
                                {
                                    kind: "image",
                                    ratio: 1,
                                    visual: { type: "image", src: "images/production-line-governance.jpg", name: "数据治理标准化" }
                                }
                            ]
                        }
                    ]
                },
                { title: "数据清洗与质量管理", content: "建立多维度数据质量评估与管控机制，从完整性、一致性、准确性、时效性四个维度对数据资产进行全面评估。通过自动化数据清洗流水线，实现缺失值补全、异常值检测、格式统一等标准化处理。龙岗区已建成政务数据质量监控平台，实时监测数据更新频率与质量变化，确保数据资产始终处于高可用状态。" },
                { title: "数据流通与共享", content: "构建\"政府指导+市场化运营\"的数据要素流通体系。龙岗区已建立数据要素服务工作站，与深圳数据交易所联合运营，推进区域可信数据空间试点。政务服务数据调用量已超12.62亿次，实现超90项事项\"秒批秒办\"、200项\"无感申报\"、770项\"免证办\"，显著提升了政务服务效率与群众获得感。" },
                {
                    title: "应用案例",
                    cards: [
                        {
                            type: "icon",
                            title: "DCMM贯标试点",
                            desc: "全国首批政务数据管理能力成熟度贯标试点单位，大湾区唯一获此资格。",
                            visual: { type: "icon", name: "location_city" }
                        },
                        {
                            type: "icon",
                            title: "数据要素工作站",
                            desc: "联合深圳数据交易所运营，构建\"标准规范+4T底座+数据空间\"创新生态。",
                            visual: { type: "icon", name: "factory" }
                        },
                        {
                            type: "icon",
                            title: "公共数据授权运营",
                            desc: "建设1+N公共数据授权运营体系，推动\"数据要素×\"行动赋能经济社会发展。",
                            visual: { type: "icon", name: "analytics" }
                        }
                    ]
                }
            ]
        }
    ];

    function normalize(record) {
        const { name, summary, thumb, ...content } = record;
        return {
            ...content,
            heroTitle: record.heroTitle?.trim() || name || '',
            heroSubtitle: record.heroSubtitle ?? summary ?? '',
            heroImg: imageSrc(record.heroImg) || imageSrc(thumb),
            status: ['draft', 'published', 'offline'].includes(record.status) ? record.status : 'published',
            updatedAt: record.updatedAt || defaults.find(line => line.id === record.id)?.updatedAt
        };
    }

    function list() {
        const stored = localStorage.getItem(storageKey);
        const records = stored === null ? JSON.parse(JSON.stringify(defaults)) : JSON.parse(stored);
        if (!Array.isArray(records)) throw new TypeError('Invalid production line records');
        const legacyOrder = records.map(normalize).sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
        return legacyOrder.map((record, index) => ({ ...record, sort: Number.isFinite(record.sort) ? record.sort : index + 1 }))
            .sort((a, b) => a.sort - b.sort);
    }

    function listForPortal() {
        try {
            return list().filter(line => line.status === 'published');
        } catch {
            return [];
        }
    }

    function persist(records) {
        localStorage.setItem(storageKey, JSON.stringify(records.map((line, index) => ({ ...line, sort: index + 1 }))));
        window.dispatchEvent(new Event('data-production-line-change'));
    }

    function validatePublished(record) {
        if (!record.heroTitle?.trim()) throw new Error('请先填写标题。');
        if (!record.heroSubtitle?.trim()) throw new Error('请先填写副标题。');
        const message = window.ContentSectionEditor?.validate({ sections: record.sections || [] });
        if (message) throw new Error(message);
    }

    function save(fields, id) {
        if (fields.status && !['draft', 'published', 'offline'].includes(fields.status)) throw new Error('发布状态无效。');
        const records = list();
        const index = records.findIndex(line => line.id === id);
        if (id && index === -1) return false;
        const previous = records[index];
        const updated = normalize({
            ...previous,
            ...fields,
            sort: previous?.sort ?? records.length + 1,
            status: fields.status || previous?.status || 'draft',
            id: id || ('line-' + (window.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`)),
            updatedAt: new Date().toISOString()
        });
        delete updated.navDescription;
        delete updated.navGlyph;
        delete updated.badgeIcon;
        if (updated.status === 'published') validatePublished(updated);
        if (previous) records[index] = updated;
        else records.push(updated);
        persist(records);
        return true;
    }

    function remove(id) {
        const records = list();
        if (records.find(line => line.id === id)?.status === 'published') throw new Error('请先下架生产线，再执行删除。');
        const remaining = records.filter(line => line.id !== id);
        if (records.length === remaining.length) return false;
        persist(remaining);
        return true;
    }

    function setStatus(id, status) {
        if (!['draft', 'published', 'offline'].includes(status)) throw new Error('发布状态无效。');
        if (!save({ status }, id)) throw new Error('该生产线已不存在，请刷新列表。');
    }

    function move(id, direction, visibleIds) {
        const records = list();
        const visible = records.filter(line => visibleIds.includes(line.id));
        const index = visible.findIndex(line => line.id === id);
        const target = visible[index + direction];
        if (index < 0 || !target) return null;
        const from = records.findIndex(line => line.id === id);
        const to = records.findIndex(line => line.id === target.id);
        [records[from], records[to]] = [records[to], records[from]];
        persist(records);
        return index + direction;
    }

    function href(id) {
        return 'data-production-line.html' + (id ? '?line=' + encodeURIComponent(id) : '');
    }

    function imageSrc(source) {
        return /^(?:images\/[\w./-]+|data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/=]+)$/i.test(source || '') ? source : '';
    }

    window.DataProductionLineStore = { storageKey, previewKey, normalize, list, listForPortal, save, remove, setStatus, move, href, imageSrc };
})();
