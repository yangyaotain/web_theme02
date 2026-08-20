(function () {
  "use strict";

  window.DASHBOARD_V3_DATA = {
    metrics: [
      { label: "数据资源总量", value: "18.6", unit: "亿条", note: "较年初 +23.8%", icon: "fa-database" },
      { label: "数据存储总量", value: "824.6", unit: "TB", note: "统一存储资源规模", icon: "fa-hdd-o" },
      { label: "接入数据来源", value: "326", unit: "个", note: "本年新增 48 个", icon: "fa-plug" },
      { label: "数据资产", value: "1,286", unit: "项", note: "本年新增 286 项", icon: "fa-archive" },
      { label: "高质量数据集", value: "168", unit: "个", note: "覆盖 5 类重点领域", icon: "fa-check-square-o" },
      { label: "已建可信空间", value: "6", unit: "个", note: "汇聚数据 1.2 亿条", icon: "fa-shield" }
    ],
    resourceCategories: [
      { label: "公共数据", value: "7.8亿条", share: 41.8, tone: "green" },
      { label: "行业数据", value: "4.9亿条", share: 26.5, tone: "blue" },
      { label: "企业数据", value: "3.5亿条", share: 18.6, tone: "cyan" },
      { label: "外部数据", value: "1.5亿条", share: 8.2, tone: "amber" },
      { label: "特色数据", value: "0.9亿条", share: 4.9, tone: "mint" }
    ],
    valueOutputs: [
      { label: "数据资产", value: "1,286", unit: "项" },
      { label: "数据产品", value: "328", unit: "个" },
      { label: "数据服务", value: "642", unit: "项" },
      { label: "应用场景", value: "46", unit: "个" }
    ],
    publicData: {
      total: "7.8",
      unit: "亿条",
      stats: [
        { label: "归集部门", value: "184个" },
        { label: "覆盖主题域", value: "32个" },
        { label: "覆盖主体", value: "1,452个" }
      ],
      summary: "覆盖区属部门、街道社区及公共企事业单位"
    },
    qualityDatasets: {
      total: "168",
      unit: "个",
      stats: [
        { label: "重点类型", value: "5类" },
        { label: "代表成果", value: "12项" }
      ],
      categories: [
        { label: "智能制造", value: 46, tone: "green" },
        { label: "政务治理", value: 38, tone: "greenDark" },
        { label: "医疗健康", value: 32, tone: "blue" },
        { label: "智慧交通", value: 28, tone: "cyan" },
        { label: "具身智能", value: 24, tone: "mint" }
      ],
      representativeResults: ["工业设备运行数据集", "企业主体信用数据集", "具身智能训练数据集"]
    },
    resourceGrowth: {
      labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      values: [11.8, 12.4, 13.1, 13.8, 14.6, 15.2, 15.9, 16.5, 17.1, 17.6, 18.1, 18.6],
      highlights: [
        { label: "年度净增", value: "6.8亿条" },
        { label: "新增来源", value: "48个" },
        { label: "汇聚增幅", value: "+23.8%" }
      ]
    },
    trustedSpaceSummary: [
      { label: "已建空间", value: "6", unit: "个" },
      { label: "空间数据", value: "1.2", unit: "亿条" },
      { label: "覆盖方向", value: "6", unit: "类" }
    ],
    trustedSpaces: [
      { name: "公共数据可信空间", amount: "3,200万条", share: 26.7, feature: "政务共享与授权运营" },
      { name: "医药健康可信空间", amount: "2,100万条", share: 17.5, feature: "医疗科研与健康服务" },
      { name: "城市治理可信空间", amount: "1,900万条", share: 15.8, feature: "城市运行与事件协同" },
      { name: "低空经济可信空间", amount: "1,800万条", share: 15, feature: "飞行保障与产业协同" },
      { name: "具身智能可信空间", amount: "1,600万条", share: 13.3, feature: "训练、仿真与评测" },
      { name: "文化艺术可信空间", amount: "1,400万条", share: 11.7, feature: "数字文化资产流通" }
    ],
    supportingResults: [
      { icon: "fa-shopping-cart", title: "龙数采买数据", value: "286批" },
      { icon: "fa-handshake-o", title: "数商数据资源", value: "68家" },
      { icon: "fa-android", title: "具身智能数据", value: "42套" }
    ]
  };
})();
