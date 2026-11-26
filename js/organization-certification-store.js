(function () {
    'use strict';

    // 全部为虚构数据。列表与详情共用记录，避免名称、代码及关联信息错配。
    const organizations = [
        {
            name: '深圳辰域数据科技有限公司', shortName: '辰域数科', legalRepresentative: '林建华',
            code: '91440307MA5H8K3R2R', phone: '138****4627', accountPrefix: 'cydata',
            memberAccounts: ['linjh', 'xuzm', 'songy', 'tangjy', 'chengwh', 'gush'],
            memberPhones: ['138****4627', '186****7932', '135****2869', '158****9146', '137****5283', '189****3671'],
            certifiedAt: '2026-11-24 10:26:18', registeredOn: '2023-03-16', capital: '1,200万元人民币',
            region: '广东省深圳市龙岗区', address: '龙城街道黄阁坑社区腾飞路9号创投大厦601室',
            industry: '软件和信息技术服务业', businessRole: '数据提供方', connectorType: 'SaaS连接器',
            introduction: '面向产业园区提供企业经营数据整理、指标加工和数据产品服务。围绕企业画像、产业分布与经营趋势构建标准化数据集，支持按批次文件交付和API订阅。',
            scope: '数据处理和存储支持服务；大数据服务；软件开发；企业经营指标加工；数据产品开发与交付；信息系统集成服务。',
            team: ['林建华', '许志敏', '宋宇', '唐静怡', '程文浩', '顾珊']
        },
        {
            name: '广州青禾产业研究有限公司', shortName: '青禾研究', legalRepresentative: '苏志强',
            code: '91440112MABX6Q7D40', phone: '186****3058', accountPrefix: 'qinghe',
            memberAccounts: ['suzq', 'yul', 'fangyj', 'jiangt'],
            memberPhones: ['186****3058', '139****6724', '159****2841', '180****9356'],
            certifiedAt: '2026-11-21 14:08:32', registeredOn: '2022-08-25', capital: '800万元人民币',
            region: '广东省广州市黄埔区', address: '科学大道182号创新大厦B座405室',
            industry: '商务服务业', businessRole: '数据需求方', connectorType: 'SaaS连接器',
            introduction: '专注产业链研究、区域经济分析与园区招商咨询。通过采购合规数据产品建立产业监测模型，为客户提供行业报告、产业链图谱和招商研判服务。',
            scope: '市场调查；社会经济咨询服务；产业规划咨询；数据分析；企业管理咨询；信息咨询服务。',
            team: ['苏志强', '余磊', '方雅静', '江涛']
        },
        {
            name: '杭州澄川数据技术有限公司', shortName: '澄川治理', legalRepresentative: '叶俊峰',
            code: '91330110MA2KD8N57F', phone: '159****8732', accountPrefix: 'chengchuan',
            memberAccounts: ['yejf', 'luy', 'wenx', 'shenzh', 'xiaj'],
            memberPhones: ['159****8732', '137****4295', '188****6173', '150****9826', '181****3549'],
            certifiedAt: '2026-11-20 09:35:46', registeredOn: '2021-06-09', capital: '2,000万元人民币',
            region: '浙江省杭州市余杭区', address: '五常街道文一西路998号海创园2幢803室',
            industry: '软件和信息技术服务业', businessRole: '服务提供方', connectorType: '独立部署连接器',
            introduction: '为企业提供数据目录梳理、数据标准建设和质量治理服务。服务覆盖资源盘点、质量评估、治理实施与交付验收，帮助企业形成可维护的数据资产台账。',
            scope: '数据治理咨询；信息系统集成服务；数据质量评估；软件开发；技术咨询；数据资源目录建设。',
            team: ['叶俊峰', '陆颖', '闻溪', '沈志宏', '夏洁']
        },
        {
            name: '苏州云栖城市计算有限公司', shortName: '云栖计算', legalRepresentative: '周明远',
            code: '91320594MACB7P6H32', phone: '177****5916', accountPrefix: 'yunqi',
            memberAccounts: ['zhoumy', 'hex', 'shaomc', 'jinf'],
            memberPhones: ['177****5916', '151****6382', '189****7541', '138****2639'],
            certifiedAt: '2026-11-18 16:42:10', registeredOn: '2023-01-12', capital: '1,500万元人民币',
            region: '江苏省苏州市工业园区', address: '若水路388号纳米技术大学科技园C座902室',
            industry: '互联网和相关服务', businessRole: '供需方', connectorType: '独立部署连接器',
            introduction: '围绕城市运行、公共设施和园区管理提供数据分析服务。整合授权数据与自有采集指标，形成城市运行专题数据集，同时采购交通和气象产品支撑分析模型。',
            scope: '大数据服务；城市运行数据分析；物联网技术服务；软件开发；信息系统运行维护服务；数据产品开发。',
            team: ['周明远', '何欣', '邵明诚', '季芳']
        },
        {
            name: '上海禾序供应链科技有限公司', shortName: '禾序供应链', legalRepresentative: '许伟民',
            code: '91310115MA1H9T4W8U', phone: '139****2084', accountPrefix: 'hexu',
            memberAccounts: ['xuwm', 'yanq', 'xuzhiyuan', 'zhaoj', 'wangsy'],
            memberPhones: ['139****2084', '136****9517', '185****3426', '158****7063', '187****4892'],
            certifiedAt: '2026-11-15 11:18:25', registeredOn: '2020-09-18', capital: '3,000万元人民币',
            region: '上海市浦东新区', address: '金海路2588号智慧产业园5幢301室',
            industry: '多式联运和运输代理业', businessRole: '数据提供方', connectorType: 'SaaS连接器',
            introduction: '提供供应链协同、物流时效分析与库存优化服务。将脱敏后的物流节点、运输时效及仓储指标加工为标准产品，服务制造企业和物流运营机构。',
            scope: '供应链管理服务；物流信息咨询；数据处理服务；软件开发；仓储指标分析；信息系统集成服务。',
            team: ['许伟民', '严青', '徐志远', '赵婧', '王思雨']
        },
        {
            name: '成都栖原能源科技有限公司', shortName: '栖原能源', legalRepresentative: '孟庆华',
            code: '91510100MABT5G6R9T', phone: '158****7493', accountPrefix: 'qiyuan',
            memberAccounts: ['mengqh', 'dujh', 'mob'],
            memberPhones: ['158****7493', '181****2637', '135****8964'],
            certifiedAt: '2026-11-12 15:20:42', registeredOn: '2022-04-21', capital: '2,600万元人民币',
            region: '四川省成都市高新区', address: '天府三街218号软件园A座705室',
            industry: '科技推广和应用服务业', businessRole: '数据需求方', connectorType: 'SaaS连接器',
            introduction: '面向产业园区提供能源管理和节能诊断服务。通过用能数据与气象、行业指标联动分析，形成能耗预测、设备运行评估及节能优化方案。',
            scope: '节能管理服务；能源技术咨询；数据分析；合同能源管理；软件开发；设备运行监测技术服务。',
            team: ['孟庆华', '杜嘉慧', '莫斌']
        },
        {
            name: '深圳星垣数据资产咨询有限公司', shortName: '星垣咨询', legalRepresentative: '白晓敏',
            code: '91440305MAD38Y6C2D', phone: '135****9168', accountPrefix: 'xingyuan',
            memberAccounts: ['baixm', 'qinw', 'liuzl', 'hanst'],
            memberPhones: ['135****9168', '188****4375', '137****8026', '159****6243'],
            certifiedAt: '2026-11-11 14:05:17', registeredOn: '2024-02-28', capital: '600万元人民币',
            region: '广东省深圳市南山区', address: '粤海街道高新南七道18号数字技术园D座1006室',
            industry: '商务服务业', businessRole: '服务提供方', connectorType: 'SaaS连接器',
            introduction: '为企业提供数据资产盘点、产品规划和流通方案咨询。围绕数据来源、应用场景和交付要求开展梳理，输出资产清单、产品方案及运营建议。',
            scope: '数据资产咨询；企业管理咨询；数据产品规划；信息技术咨询；市场调研；技术服务。',
            team: ['白晓敏', '秦雯', '柳志林', '韩舒婷']
        },
        {
            name: '厦门润屿文旅数据有限公司', shortName: '润屿文旅', legalRepresentative: '贺景明',
            code: '91350203MA8W7N4F6W', phone: '189****6342', accountPrefix: 'runyu',
            memberAccounts: ['hejm', 'wenrx', 'zhongy', 'shiwb'],
            memberPhones: ['189****6342', '150****7819', '136****2948', '180****5736'],
            certifiedAt: '2026-11-09 13:36:54', registeredOn: '2021-11-11', capital: '950万元人民币',
            region: '福建省厦门市思明区', address: '软件园二期望海路16号3层502单元',
            industry: '文化艺术业', businessRole: '供需方', connectorType: 'SaaS连接器',
            introduction: '服务景区和文旅运营机构，提供客流趋势、文旅消费和活动运营分析。加工授权统计指标，并采购气象及区域出行数据用于旅游需求预测。',
            scope: '文化旅游信息咨询；数据分析；旅游资源开发咨询；数字内容服务；软件开发；数据产品运营。',
            team: ['贺景明', '温若溪', '钟悦', '石文彬']
        },
        {
            name: '武汉启澜工业智能科技有限公司', shortName: '启澜工业', legalRepresentative: '谢宇成',
            code: '91420100MA49Q3E72B', phone: '137****8526', accountPrefix: 'qilan',
            memberAccounts: ['xieyc', 'yuann', 'zhengsh', 'fengm', 'luoqy', 'yangsy'],
            memberPhones: ['137****8526', '159****4362', '186****7194', '138****2057', '177****9843', '135****6728'],
            certifiedAt: '2026-11-06 09:50:31', registeredOn: '2020-05-07', capital: '4,200万元人民币',
            region: '湖北省武汉市东湖高新区', address: '光谷大道77号金融港产业园E座201室',
            industry: '软件和信息技术服务业', businessRole: '数据提供方', connectorType: '独立部署连接器',
            introduction: '面向制造企业提供设备运行分析、产线质量监测和工业数据服务。加工设备稼动率、工况统计和质量分布数据，支持按月交付行业参考指标。',
            scope: '工业互联网数据服务；智能制造技术咨询；软件开发；设备运行数据分析；信息系统集成；数据产品开发。',
            team: ['谢宇成', '袁宁', '郑书涵', '冯敏', '罗清扬', '杨思怡']
        },
        {
            name: '山东朔源农业数字科技有限公司', shortName: '朔源农业', legalRepresentative: '陶建国',
            code: '91370102MACD6J8L5P', phone: '151****3975', accountPrefix: 'shuoyuan',
            memberAccounts: ['taojg', 'wangjm', 'jiangxy', 'dengn'],
            memberPhones: ['151****3975', '139****5816', '187****2634', '156****9427'],
            certifiedAt: '2026-11-04 14:12:09', registeredOn: '2023-07-20', capital: '1,100万元人民币',
            region: '山东省济南市历下区', address: '经十路9777号科技创新中心B座608室',
            industry: '农林牧渔专业及辅助性活动', businessRole: '供需方', connectorType: 'SaaS连接器',
            introduction: '围绕设施农业和农产品供应提供数字化服务。汇集种植环境与产销统计信息，并结合气象产品开展产量趋势、供需平衡和种植风险分析。',
            scope: '农业技术服务；农业数据分析；农产品产销信息咨询；软件开发；物联网技术服务；数据处理。',
            team: ['陶建国', '汪佳敏', '姜兴业', '邓宁']
        },
        {
            name: '重庆映禾商业咨询有限公司', shortName: '映禾洞察', legalRepresentative: '邱承安',
            code: '91500112MABU9R5A3X', phone: '185****7249', accountPrefix: 'yinghe',
            memberAccounts: ['qiuca', 'liaoy', 'panyc'],
            memberPhones: ['185****7249', '136****4082', '183****9516'],
            certifiedAt: '2026-11-02 11:29:43', registeredOn: '2022-12-06', capital: '750万元人民币',
            region: '重庆市渝北区', address: '仙桃街道数据谷东路19号商务楼C座1103室',
            industry: '商务服务业', businessRole: '数据需求方', connectorType: 'SaaS连接器',
            introduction: '为商业运营机构提供门店选址、商圈评估和经营分析。通过采购区域统计、消费趋势和交通可达性指标，形成多维度选址评估及经营诊断报告。',
            scope: '商业运营咨询；市场调查；数据分析；企业管理咨询；信息咨询服务；软件技术服务。',
            team: ['邱承安', '廖勇', '潘雨晨']
        },
        {
            name: '西安沐衡数据安全技术有限公司', shortName: '沐衡安全', legalRepresentative: '段志恒',
            code: '91610113MA7G2T8H4E', phone: '180****5631', accountPrefix: 'muheng',
            memberAccounts: ['duanzh', 'renq', 'luy', 'houjl', 'mawj'],
            memberPhones: ['180****5631', '137****8264', '189****3472', '155****9186', '182****6749'],
            certifiedAt: '2026-10-29 16:08:56', registeredOn: '2021-03-24', capital: '1,800万元人民币',
            region: '陕西省西安市雁塔区', address: '科技二路65号清华科技园F座403室',
            industry: '软件和信息技术服务业', businessRole: '服务提供方', connectorType: '独立部署连接器',
            introduction: '提供数据分类分级、脱敏方案设计和交付安全咨询。围绕数据产品开发、使用与交付流程，协助企业建立访问控制、交付校验和审计追溯机制。',
            scope: '数据安全技术咨询；数据分类分级服务；软件开发；信息系统安全技术服务；数据脱敏技术服务。',
            team: ['段志恒', '任倩', '卢悦', '侯建林', '马文杰']
        }
    ].map((record, index) => {
        const number = String(index + 1).padStart(3, '0');
        const date = record.certifiedAt.slice(0, 10);
        const division = [
            '440307', '440112', '330110', '320571', '310115', '510109',
            '440305', '350203', '420111', '370102', '500112', '610113'
        ][index];
        const certificationTime = Date.parse(record.certifiedAt.replace(' ', 'T') + 'Z');
        const timestamp = minutes => new Date(certificationTime + minutes * 60000).toISOString().slice(0, 19).replace('T', ' ');
        const submittedAt = timestamp([26, 51, 18, 72, 34, 43, 29, 62, 21, 47, 38, 56][index]);
        const completedAt = timestamp([49, 83, 54, 97, 78, 69, 64, 94, 58, 86, 71, 92][index]);
        const changedAt = timestamp([128, 143, 117, 156][index % 4]);
        const domain = 'https://' + record.accountPrefix + '.connector.yunheng-data.cn';
        const equipmentSuffix = record.code.slice(8, 16).split('').map(character => character.charCodeAt(0).toString(16).toUpperCase());
        return {
            ...record,
            // 兼容既有伙伴关联及详情链接；对外始终展示当前信用代码和名称。
            legacyCode: '91' + division + 'MA7A01' + number + 'X',
            status: '已认证',
            profile: {
                type: '企事业单位法人',
                validity: record.registeredOn + ' 至 ' + (index % 3 === 0 ? '长期' : (Number(record.registeredOn.slice(0, 4)) + 20) + record.registeredOn.slice(4)),
                region: record.region,
                address: record.region + record.address,
                introduction: record.introduction,
                scope: record.scope,
                industry: record.industry,
                capital: record.capital,
                registeredOn: record.registeredOn,
                logoText: record.shortName.slice(0, 2),
                members: record.team.map((name, memberIndex) => ({
                    id: memberIndex, name,
                    account: record.accountPrefix + '_' + record.memberAccounts[memberIndex],
                    role: memberIndex === 0 ? '管理员' : '成员',
                    phone: record.memberPhones[memberIndex],
                    expiry: ['2028-11-23', '2027-08-15', '2027-06-30', '2027-10-18', '2028-03-31'][(index + memberIndex) % 5],
                    enabled: memberIndex !== 3
                })),
                businesses: [
                    { name: '数商（' + record.businessRole + '）', role: record.businessRole, openedAt: timestamp(12 + index * 3) },
                    { name: '数据服务协作', role: record.businessRole === '服务提供方' ? '咨询服务人员' : '业务协作人员', openedAt: timestamp(43 + index * 2) }
                ],
                connector: {
                    name: record.shortName + '业务连接器',
                    identity: '502026' + date.replace(/-/g, '') + record.code.slice(8, 17) + '000000001',
                    type: record.connectorType,
                    node: '本节点', registeredAt: date, status: index === 8 ? '停用' : '启用',
                    networkType: '互联网（固定公网IP）',
                    equipmentId: ['02', ...equipmentSuffix.slice(0, 5)].join(':'),
                    specification: index % 3 === 0 ? '增强型' : '标准型',
                    addresses: [{
                        ip: ['192.0.2.86', '198.51.100.37', '203.0.113.124', '192.0.2.173', '198.51.100.92', '203.0.113.68', '192.0.2.215', '198.51.100.143', '203.0.113.56', '192.0.2.108', '198.51.100.196', '203.0.113.182'][index],
                        domain,
                        endpoint: domain + '/transmission-api/input/api/v1'
                    }],
                    issuer: '云衡可信身份服务中心',
                    issuedAt: completedAt,
                    supplier: '深圳云衡连接技术有限公司',
                    supplierCode: '91440300MA5J7N8Q6W',
                    serialNumber: 'YH-CON-26' + date.slice(5).replace('-', '') + '-' + record.code.slice(10, 17),
                    version: index % 3 === 0 ? 'V2.6.3' : 'V2.6.2',
                    changes: index % 3 === 0 ? [{
                        operator: record.team[0],
                        operatedAt: changedAt,
                        content: '更新连接器接口地址，保留原注册信息。'
                    }] : [],
                    flows: [{
                        type: '注册', number: 'ZC2026' + date.slice(5).replace('-', '') + [3286, 1947, 2673, 1854, 2391, 1468, 2085, 1372, 1846, 1259, 1673, 1198][index],
                        applicant: record.team[0], submittedAt, completedAt
                    }]
                },
                credentialIssuedAt: record.certifiedAt
            }
        };
    });

    window.OrganizationCertificationStore = {
        listOrganizations: () => structuredClone(organizations),
        resolveOrganization: code => structuredClone(organizations.find(record => record.code === code || record.legacyCode === code))
    };
})();
