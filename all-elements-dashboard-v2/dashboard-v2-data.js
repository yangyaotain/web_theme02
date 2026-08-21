(function () {
  "use strict";

  window.DASHBOARD_V2_DATA = {
    defaultScreen: "resources",
    screens: {
      resources: {
        label: "数据资源与聚合",
        shortLabel: "资源聚合",
        icon: "fa-database",
        eyebrow: "DATA RESOURCE PANORAMA",
        title: "数据资源与聚合全景",
        description: "汇聚公共、行业、企业与特色数据资源，形成龙岗数据聚合底座",
        heroImage: "images/aggregation-hub.png",
        heroLayout: "callouts",
        heroMode: "radial",
        heroValue: "18.6",
        heroUnit: "亿条",
        heroCaption: "龙岗数据资源汇聚总量",
        heroItems: [
          { label: "公共数据", value: "7.8亿条", icon: "fa-university" },
          { label: "行业数据", value: "4.9亿条", icon: "fa-industry" },
          { label: "企业数据", value: "3.5亿条", icon: "fa-building" },
          { label: "外部数据", value: "1.5亿条", icon: "fa-external-link" },
          { label: "特色数据", value: "0.9亿条", icon: "fa-cubes" }
        ],
        metrics: [
          { label: "数据资源总量", value: "18.6", unit: "亿条", note: "较年初 +23.8%", icon: "fa-database" },
          { label: "资源存储总量", value: "126.8", unit: "TB", note: "较年初 +18.6%", icon: "fa-server" },
          { label: "数据资源目录", value: "12,846", unit: "项", note: "覆盖 32 个主题域", icon: "fa-list-alt" },
          { label: "接入数据来源", value: "326", unit: "个", note: "本年新增 48 个", icon: "fa-plug" },
          { label: "覆盖数据主体", value: "1,452", unit: "个", note: "184个部门 · 1,268家企业", icon: "fa-sitemap" },
          { label: "高质量数据集", value: "168", unit: "个", note: "重点领域 42 个", icon: "fa-check-square-o" },
          { label: "可信数据空间", value: "6", unit: "个", note: "汇聚数据 1.2 亿条", icon: "fa-shield" }
        ],
        panels: {
          left: [
            {
              type: "quality-datasets",
              title: "高质量数据集建设",
              subtitle: "重点领域数据集建设与质量表现",
              badge: "168个",
              icon: "fa-check-circle",
              compact: true,
              total: "168",
              qualityRate: "98.6%",
              items: [
                { label: "制造业", value: "56个", percent: 100, icon: "fa-industry" },
                { label: "政务服务", value: "42个", percent: 75, icon: "fa-university" },
                { label: "医疗健康", value: "38个", percent: 68, icon: "fa-heartbeat" },
                { label: "其他领域", value: "32个", percent: 57, icon: "fa-th" }
              ],
              stats: [
                { label: "重点领域", value: "42个" },
                { label: "质量通过率", value: "98.6%" }
              ]
            },
            {
              type: "resource-growth",
              title: "资源建设趋势",
              subtitle: "年度累计资源规模",
              badge: "弱化",
              icon: "fa-line-chart",
              start: "11.8",
              current: "18.6",
              unit: "亿条",
              chart: {
                type: "line",
                minimal: true,
                labels: ["年初", "2月", "4月", "6月", "8月", "10月", "当前"],
                datasets: [
                  { label: "资源总量", data: [11.8, 12.6, 13.4, 14.1, 15.6, 16.2, 18.6], tone: "green", fill: true }
                ]
              },
              stats: [
                { label: "本年新增来源", value: "48个", icon: "fa-plug" },
                { label: "资源目录", value: "12,846项", icon: "fa-list-alt" },
                { label: "覆盖主体", value: "1,452个", icon: "fa-sitemap" }
              ]
            }
          ],
          right: [
            {
              type: "trusted-spaces",
              title: "可信数据空间建设",
              subtitle: "跨主体数据可信流通与协同利用",
              badge: "6个",
              icon: "fa-shield",
              compact: true,
              items: [
                { label: "龙岗可信数据空间", icon: "fa-map-marker" },
                { label: "公共数据可信数据空间", icon: "fa-university" },
                { label: "低空经济可信数据空间", icon: "fa-plane" },
                { label: "具身智能可信数据空间", icon: "fa-android" },
                { label: "医药健康可信数据空间", icon: "fa-heartbeat" },
                { label: "文化艺术可信数据空间", icon: "fa-paint-brush" }
              ],
              summary: { label: "汇聚数据", value: "1.2", unit: "亿条" },
              capabilities: [
                { label: "可信接入", icon: "fa-shield" },
                { label: "授权使用", icon: "fa-user-plus" },
                { label: "全程留痕", icon: "fa-file-text" }
              ]
            },
            {
              type: "application-outcomes",
              title: "资源供给成效",
              subtitle: "龙岗特色数据资源供给成果",
              badge: "重点",
              icon: "fa-star-o",
              compact: true,
              items: [
                { icon: "fa-shopping-cart", title: "龙数采买数据", value: "286批", note: "市场化数据采买与供给" },
                { icon: "fa-android", title: "具身智能数据", value: "42套", note: "训练、仿真与质检数据" },
                { icon: "fa-star", title: "重点领域资源", value: "42个", note: "制造、政务、医疗等领域" },
                { icon: "fa-plug", title: "本年新增来源", value: "48个", note: "持续拓展多元数据渠道" }
              ],
              stats: []
            }
          ]
        }
      },

      processing: {
        label: "数据加工与产品服务",
        shortLabel: "加工服务",
        icon: "fa-cogs",
        eyebrow: "DATA VALUE PRODUCTION",
        title: "数据加工与产品服务全景",
        description: "从实时接入、治理加工到产品服务，持续释放数据资产价值",
        heroImage: "images/processing-chain.png",
        heroLayout: "callouts",
        heroMode: "process",
        heroValue: "3.62",
        heroUnit: "TB/日",
        heroCaption: "日均加工处理量",
        heroItems: [
          { label: "实时接入", value: "2.48亿条/日", icon: "fa-sign-in" },
          { label: "清洗治理", value: "16.2亿条", icon: "fa-filter" },
          { label: "资产沉淀", value: "1,286项", icon: "fa-archive" },
          { label: "产品封装", value: "328个", icon: "fa-cube" },
          { label: "服务输出", value: "642项", icon: "fa-cloud" }
        ],
        journey: [
          { label: "原始数据", icon: "fa-database" },
          { label: "标准数据", icon: "fa-check-square-o" },
          { label: "数据资产", icon: "fa-archive" },
          { label: "数据产品", icon: "fa-cube" },
          { label: "数据服务", icon: "fa-cloud" }
        ],
        metrics: [
          { label: "实时接入量", value: "2.48", unit: "亿条/日", note: "峰值 3.16 亿条/日", icon: "fa-bolt", featured: true },
          { label: "日均加工量", value: "3.62", unit: "TB", note: "较上月 +12.6%", icon: "fa-cogs" },
          { label: "累计治理数据", value: "16.2", unit: "亿条", note: "质量通过率 97.8%", icon: "fa-filter" },
          { label: "数据资产", value: "1,286", unit: "项", note: "本年新增 286 项", icon: "fa-archive" },
          { label: "数据产品", value: "328", unit: "个", note: "覆盖 12 个行业", icon: "fa-cubes" },
          { label: "数据服务", value: "642", unit: "项", note: "API服务 386 项", icon: "fa-cloud" }
        ],
        panels: {
          left: [
            {
              type: "processing-quality",
              title: "治理加工质量全景",
              subtitle: "数据治理加工质量综合表现",
              badge: "97.8%",
              icon: "fa-check-circle",
              qualityRate: "97.8%",
              items: [
                { label: "完整性", value: "98.2%", percent: 98.2, icon: "fa-shield" },
                { label: "准确性", value: "97.6%", percent: 97.6, icon: "fa-bullseye" },
                { label: "一致性", value: "96.8%", percent: 96.8, icon: "fa-link" },
                { label: "及时性", value: "95.4%", percent: 95.4, icon: "fa-clock-o" },
                { label: "可用性", value: "98.6%", percent: 98.6, icon: "fa-th" }
              ],
              stats: [
                { label: "治理规则", value: "3,286条" },
                { label: "异常修复率", value: "96.5%" }
              ]
            }
          ],
          right: [
            {
              type: "supply-overview",
              title: "产品服务供给全景",
              subtitle: "数据产品与服务分类供给能力",
              badge: "970项",
              icon: "fa-cubes",
              products: {
                label: "产品分类总计",
                total: "328个",
                items: [
                  { label: "数据集产品", value: "126个", percent: 38.4 },
                  { label: "API产品", value: "104个", percent: 31.7 },
                  { label: "模型产品", value: "58个", percent: 17.7 },
                  { label: "分析报告", value: "40个", percent: 12.2 }
                ]
              },
              services: {
                label: "服务类型总计",
                total: "642项",
                items: [
                  { label: "API服务", value: "386项", percent: "60.1%", icon: "fa-cloud" },
                  { label: "数据交付", value: "112项", percent: "17.4%", icon: "fa-database" },
                  { label: "算力分析", value: "86项", percent: "13.4%", icon: "fa-bar-chart" },
                  { label: "定制服务", value: "58项", percent: "9.0%", icon: "fa-user" }
                ]
              },
              footer: { label: "行业解决方案", value: "38项", icon: "fa-university" }
            }
          ]
        }
      },

      applications: {
        label: "行业应用与价值成果",
        shortLabel: "行业应用",
        icon: "fa-sitemap",
        eyebrow: "INDUSTRY APPLICATION VALUE",
        title: "行业应用与价值成果全景",
        description: "以数据产品和服务连接重点行业，形成可感知、可衡量的应用价值",
        heroImage: "images/industry-ecosystem.png",
        heroLayout: "callouts",
        heroMode: "ecosystem",
        heroValue: "46",
        heroUnit: "个",
        heroCaption: "已落地数据应用场景",
        heroItems: [
          { label: "智能制造", value: "12个场景", icon: "fa-cog" },
          { label: "城市治理", value: "10个场景", icon: "fa-university" },
          { label: "智慧交通", value: "9个场景", icon: "fa-bus" },
          { label: "医疗健康", value: "8个场景", icon: "fa-heartbeat" },
          { label: "具身智能", value: "7个场景", icon: "fa-android" }
        ],
        journey: [
          { label: "数据产品", icon: "fa-database" },
          { label: "行业场景", icon: "fa-university" },
          { label: "服务对象", icon: "fa-users" },
          { label: "应用成效", icon: "fa-bar-chart" }
        ],
        metrics: [
          { label: "覆盖重点行业", value: "12", unit: "个", note: "制造与政务为重点", icon: "fa-industry", featured: true },
          { label: "落地应用场景", value: "46", unit: "个", note: "本年新增 14 个", icon: "fa-th-large" },
          { label: "服务对象", value: "1,872", unit: "个", note: "企业主体占 78%", icon: "fa-users" },
          { label: "累计服务调用", value: "3.8", unit: "亿次", note: "月均 3,200 万次", icon: "fa-bar-chart" },
          { label: "代表性成果", value: "28", unit: "项", note: "可复制方案 16 项", icon: "fa-certificate" },
          { label: "特色领域", value: "8", unit: "个", note: "具身智能等重点方向", icon: "fa-star" }
        ],
        panels: {
          left: [
            {
              type: "industry-scenes",
              title: "重点行业场景全景",
              subtitle: "重点行业覆盖与落地场景分布",
              badge: "46个",
              icon: "fa-industry",
              coverage: "12个",
              total: "46个",
              items: [
                { label: "智能制造", value: "12个场景", percent: 100, icon: "fa-cog" },
                { label: "城市治理", value: "10个场景", percent: 83, icon: "fa-university" },
                { label: "智慧交通", value: "9个场景", percent: 75, icon: "fa-bus" },
                { label: "医疗健康", value: "8个场景", percent: 67, icon: "fa-plus-square" },
                { label: "具身智能", value: "7个场景", percent: 58, icon: "fa-android" }
              ],
              footer: { label: "特色领域", value: "8个", icon: "fa-star" }
            }
          ],
          right: [
            {
              type: "application-outcomes",
              title: "代表性应用成果全景",
              subtitle: "龙岗数据特色场景与实际成效",
              badge: "28项",
              icon: "fa-trophy",
              items: [
                { icon: "fa-cogs", title: "工业质量智能分析", value: "效率 +26%", note: "制造企业质量检测与异常研判" },
                { icon: "fa-android", title: "具身智能训练数据", value: "42套", note: "面向机器人训练与仿真验证" },
                { icon: "fa-building", title: "城市治理一张图", value: "18专题", note: "支撑事件发现与协同处置" },
                { icon: "fa-shield", title: "可信数据协同应用", value: "6空间", note: "实现多主体数据可信使用" }
              ],
              stats: [
                { label: "可复制方案", value: "16项" },
                { label: "累计服务调用", value: "3.8亿次" }
              ]
            }
          ]
        }
      }
    }
  };
})();
