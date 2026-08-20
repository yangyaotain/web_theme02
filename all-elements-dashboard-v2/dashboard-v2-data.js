(function () {
  "use strict";

  var months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

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
          { label: "数据资源总量", value: "18.6", unit: "亿条", note: "较年初 +23.8%", icon: "fa-database", featured: true },
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
              type: "chart",
              title: "资源汇聚增长",
              subtitle: "年度累计数据资源规模",
              badge: "亿条",
              icon: "fa-line-chart",
              chart: {
                type: "line",
                labels: months,
                datasets: [
                  { label: "资源总量", data: [11.8, 12.4, 13.1, 13.8, 14.6, 15.2, 15.9, 16.5, 17.1, 17.6, 18.1, 18.6], tone: "green", fill: true }
                ]
              }
            },
            {
              type: "chart",
              title: "资源类型结构",
              subtitle: "按数据资源类别统计占比",
              badge: "结构",
              icon: "fa-pie-chart",
              chart: {
                type: "doughnut",
                labels: ["公共数据", "行业数据", "企业数据", "外部数据", "特色数据"],
                datasets: [
                  { label: "资源占比", data: [41.8, 26.5, 18.6, 8.2, 4.9], tones: ["green", "blue", "cyan", "amber", "mint"] }
                ]
              }
            }
          ],
          right: [
            {
              type: "chart",
              title: "来源覆盖能力",
              subtitle: "主要来源渠道接入覆盖指数",
              badge: "指数",
              icon: "fa-random",
              chart: {
                type: "bar",
                indexAxis: "y",
                labels: ["区属部门", "街道社区", "重点企业", "数据商", "外部渠道"],
                datasets: [
                  { label: "覆盖指数", data: [100, 92, 78, 65, 54], tone: "green" }
                ]
              }
            },
            {
              type: "list",
              title: "特色资源成果",
              subtitle: "龙岗数据资源代表性建设成果",
              badge: "重点",
              icon: "fa-star-o",
              items: [
                { icon: "fa-check-circle", title: "高质量数据集", value: "168个", note: "制造、政务、医疗等重点领域" },
                { icon: "fa-shopping-cart", title: "龙数采买数据", value: "286批", note: "按需补充市场化外部数据" },
                { icon: "fa-shield", title: "可信数据空间", value: "6个", note: "支撑跨主体可信流通" },
                { icon: "fa-android", title: "具身智能数据", value: "42套", note: "覆盖训练、仿真与质检数据" }
              ]
            }
          ]
        }
      },

      processing: {
        label: "数据加工与产品服务",
        shortLabel: "加工服务",
        icon: "fa-cogs",
        eyebrow: "DATA VALUE PRODUCTION",
        title: "数据加工与产品服务",
        description: "以实时接入、治理加工和产品化能力，持续释放数据资产价值",
        heroImage: "images/processing-chain.png",
        heroValue: "3.62",
        heroUnit: "TB/日",
        heroCaption: "日均数据加工处理量",
        heroItems: [
          { label: "实时接入", value: "2.48亿条/日", icon: "fa-sign-in" },
          { label: "清洗治理", value: "16.2亿条", icon: "fa-filter" },
          { label: "资产沉淀", value: "1,286项", icon: "fa-archive" },
          { label: "产品封装", value: "328个", icon: "fa-cube" },
          { label: "服务输出", value: "642项", icon: "fa-cloud" }
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
              type: "chart",
              title: "加工处理趋势",
              subtitle: "月度日均加工处理量",
              badge: "TB/日",
              icon: "fa-line-chart",
              chart: {
                type: "line",
                labels: months,
                datasets: [
                  { label: "加工处理量", data: [2.02, 2.13, 2.22, 2.36, 2.45, 2.58, 2.72, 2.85, 3.01, 3.18, 3.39, 3.62], tone: "green", fill: true },
                  { label: "实时接入量", data: [1.42, 1.51, 1.58, 1.66, 1.72, 1.83, 1.91, 2.02, 2.11, 2.23, 2.35, 2.48], tone: "blue", fill: false }
                ]
              }
            },
            {
              type: "chart",
              title: "治理质量指标",
              subtitle: "数据治理关键质量指标",
              badge: "%",
              icon: "fa-check-circle",
              chart: {
                type: "bar",
                indexAxis: "y",
                labels: ["完整性", "准确性", "一致性", "及时性", "可用性"],
                datasets: [
                  { label: "质量得分", data: [98.2, 97.6, 96.8, 95.4, 98.6], tone: "green" }
                ],
                max: 100
              }
            }
          ],
          right: [
            {
              type: "chart",
              title: "本年度新增成果",
              subtitle: "资产、产品、服务与方案产出",
              badge: "新增",
              icon: "fa-bar-chart",
              chart: {
                type: "bar",
                labels: ["数据资产", "数据产品", "数据服务", "行业方案"],
                datasets: [
                  { label: "新增成果", data: [286, 86, 142, 38], tones: ["green", "blue", "cyan", "amber"] }
                ]
              }
            },
            {
              type: "list",
              title: "一数多用成果",
              subtitle: "同一份数据形成不同产品与服务",
              badge: "转化",
              icon: "fa-exchange",
              items: [
                { icon: "fa-industry", title: "工业设备运行数据", value: "6项成果", note: "质检模型、能耗分析、预测维护" },
                { icon: "fa-building", title: "企业主体信用数据", value: "5项成果", note: "风险画像、准入核验、融资服务" },
                { icon: "fa-road", title: "交通运行数据", value: "4项成果", note: "拥堵研判、信号优化、出行服务" },
                { icon: "fa-heartbeat", title: "公共卫生数据", value: "3项成果", note: "资源调度、趋势分析、便民服务" }
              ]
            }
          ]
        }
      },

      applications: {
        label: "行业应用与价值成果",
        shortLabel: "行业应用",
        icon: "fa-sitemap",
        eyebrow: "INDUSTRY APPLICATION VALUE",
        title: "行业应用与价值成果",
        description: "以数据产品和服务连接重点行业，形成可感知、可衡量的应用价值",
        heroImage: "images/industry-ecosystem.png",
        heroValue: "46",
        heroUnit: "个场景",
        heroCaption: "已落地数据应用场景",
        heroItems: [
          { label: "智能制造", value: "12个场景", icon: "fa-industry" },
          { label: "城市治理", value: "10个场景", icon: "fa-university" },
          { label: "医疗健康", value: "8个场景", icon: "fa-heartbeat" },
          { label: "智慧交通", value: "9个场景", icon: "fa-road" },
          { label: "具身智能", value: "7个场景", icon: "fa-android" }
        ],
        metrics: [
          { label: "覆盖重点行业", value: "12", unit: "个", note: "制造与政务为重点", icon: "fa-industry", featured: true },
          { label: "落地应用场景", value: "46", unit: "个", note: "本年新增 14 个", icon: "fa-sitemap" },
          { label: "服务对象", value: "1,872", unit: "个", note: "企业主体占 78%", icon: "fa-users" },
          { label: "累计服务调用", value: "3.8", unit: "亿次", note: "月均 3,200 万次", icon: "fa-exchange" },
          { label: "代表性成果", value: "28", unit: "项", note: "形成可复制方案 16 项", icon: "fa-trophy" },
          { label: "特色领域", value: "8", unit: "个", note: "具身智能等重点方向", icon: "fa-star" }
        ],
        panels: {
          left: [
            {
              type: "chart",
              title: "重点行业能力",
              subtitle: "资源、产品与服务综合供给指数",
              badge: "指数",
              icon: "fa-industry",
              chart: {
                type: "bar",
                indexAxis: "y",
                labels: ["智能制造", "城市治理", "智慧交通", "医疗健康", "具身智能", "商贸服务"],
                datasets: [
                  { label: "综合能力", data: [96, 92, 86, 81, 78, 72], tone: "green" }
                ],
                max: 100
              }
            },
            {
              type: "chart",
              title: "应用场景增长",
              subtitle: "年度累计落地场景数量",
              badge: "个",
              icon: "fa-line-chart",
              chart: {
                type: "line",
                labels: months,
                datasets: [
                  { label: "应用场景", data: [24, 25, 27, 29, 31, 33, 35, 37, 39, 41, 44, 46], tone: "green", fill: true }
                ]
              }
            }
          ],
          right: [
            {
              type: "chart",
              title: "场景价值表现",
              subtitle: "典型场景综合价值评估",
              badge: "评估",
              icon: "fa-diamond",
              chart: {
                type: "radar",
                labels: ["降本增效", "治理提升", "服务体验", "创新带动", "复制推广"],
                datasets: [
                  { label: "综合表现", data: [92, 88, 90, 86, 82], tone: "green", fill: true }
                ],
                max: 100
              }
            },
            {
              type: "list",
              title: "代表性应用成果",
              subtitle: "龙岗数据特色场景与实际成效",
              badge: "案例",
              icon: "fa-trophy",
              items: [
                { icon: "fa-cog", title: "工业质量智能分析", value: "效率 +26%", note: "制造企业质量检测与异常研判" },
                { icon: "fa-android", title: "具身智能训练数据", value: "42套", note: "面向机器人训练与仿真验证" },
                { icon: "fa-map-marker", title: "城市治理一张图", value: "18专题", note: "支撑事件发现与协同处置" },
                { icon: "fa-shield", title: "可信数据协同应用", value: "6空间", note: "实现多主体数据可信使用" }
              ]
            }
          ]
        }
      }
    }
  };
})();
