(function () {
  "use strict";

  var months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  var industries = ["金融", "制造", "零售", "物流", "能源", "电信", "医疗", "教育", "文旅", "建筑"];
  var scenes = ["政务服务", "交通出行", "医疗健康", "教育文化", "社保民政", "生态环境", "市场监管", "不动产", "税务服务", "公共安全"];

  var rankings = {
    resources: [
      { name: "政务服务事项清单", value: "128,542 次" },
      { name: "交通出行流量数据", value: "96,325 次" },
      { name: "企业信用信息库", value: "85,690 次" },
      { name: "医疗健康服务数据", value: "62,458 次" },
      { name: "文旅景点预约数据", value: "48,921 次" }
    ],
    products: [
      { name: "金融风控数据集", value: "2,580 单" },
      { name: "用户行为分析产品", value: "2,156 单" },
      { name: "市场洞察分析报告", value: "1,890 单" },
      { name: "供应链 RWA 凭证", value: "1,678 单" },
      { name: "销量预测数据模型", value: "1,540 单" }
    ],
    consulting: [
      { name: "企业数据资产入表全流程咨询", value: "2,856 次" },
      { name: "数据合规性尽调服务", value: "2,450 次" },
      { name: "数据质量评估与优化方案", value: "1,980 次" },
      { name: "跨境数据合规咨询", value: "1,850 次" },
      { name: "数据产品开发全流程指导", value: "1,620 次" }
    ],
    solutions: [
      { name: "金融风控大数据分析解决方案", value: "28,540 次" },
      { name: "制造业智能生产调度系统", value: "25,680 次" },
      { name: "零售行业用户画像分析平台", value: "22,350 次" },
      { name: "物流行业智能路径规划系统", value: "19,870 次" },
      { name: "能源消耗监测与优化解决方案", value: "18,420 次" }
    ],
    demands: [
      { name: "政务数据共享接口开发", value: "28,542 热度" },
      { name: "交通流量数据分析服务", value: "25,325 热度" },
      { name: "企业信用数据查询接口", value: "22,690 热度" },
      { name: "医疗健康数据统计分析", value: "18,458 热度" },
      { name: "文旅景点数据可视化", value: "16,921 热度" }
    ]
  };

  window.DASHBOARD_V2_DATA = {
    years: ["2026", "2025", "2024"],
    defaultYear: "2026",
    yearFactors: {
      "2026": 1,
      "2025": 0.9,
      "2024": 0.8
    },
    definitions: {
      responseRate: "响应需求数 ÷ 需求总量",
      responseSuccessRate: "响应成功数 ÷ 响应需求数",
      successCoverage: "响应成功数 ÷ 需求总量",
      totalTransaction: "数据产品、数据咨询与行业方案成交金额合计"
    },
    metrics: {
      leader: [
        { label: "数据资源总量", value: 156892, format: "integer", unit: "条", trend: 8.2, icon: "fa-database" },
        { label: "数据产品总量", value: 289568, format: "integer", unit: "个", trend: 15.7, icon: "fa-cubes" },
        { label: "咨询服务总量", value: 28568, format: "integer", unit: "项", trend: 15.3, icon: "fa-comments" },
        { label: "行业方案总量", value: 2856, format: "integer", unit: "个", trend: 15.7, icon: "fa-sitemap" },
        { label: "需求总量", value: 89756, format: "integer", unit: "项", trend: 15.3, icon: "fa-tasks" },
        { label: "入驻数商", value: 3842, format: "integer", unit: "家", trend: 8.3, icon: "fa-building" },
        { label: "需求成功覆盖率", value: 78.6, format: "percent", scale: false, trend: 2.4, icon: "fa-check-circle" },
        { label: "总交易规模", value: 105520.1, format: "amountYi", scale: true, trend: 18.9, icon: "fa-line-chart" }
      ],
      operations: [
        { label: "数据资源总量", value: 156892, format: "integer", unit: "条", trend: 8.2, icon: "fa-database" },
        { label: "数据产品总量", value: 289568, format: "integer", unit: "个", trend: 15.7, icon: "fa-cubes" },
        { label: "服务供给总量", value: 31424, format: "integer", unit: "项", trend: 15.4, icon: "fa-briefcase" },
        { label: "需求总量", value: 89756, format: "integer", unit: "项", trend: 15.3, icon: "fa-tasks" },
        { label: "响应需求数", value: 76892, format: "integer", unit: "项", trend: 11.2, icon: "fa-reply-all" },
        { label: "响应成功数", value: 70586, format: "integer", unit: "项", trend: 13.7, icon: "fa-check-square-o" },
        { label: "需求成功覆盖率", value: 78.6, format: "percent", scale: false, trend: 2.4, icon: "fa-pie-chart" },
        { label: "总交易规模", value: 105520.1, format: "amountYi", scale: true, trend: 18.9, icon: "fa-line-chart" }
      ],
      customer: [
        { label: "可用数据资源", value: 156892, format: "integer", unit: "条", trend: 8.2, icon: "fa-database" },
        { label: "可选数据产品", value: 289568, format: "integer", unit: "个", trend: 15.7, icon: "fa-cubes" },
        { label: "咨询服务", value: 28568, format: "integer", unit: "项", trend: 15.3, icon: "fa-comments" },
        { label: "行业方案", value: 2856, format: "integer", unit: "个", trend: 15.7, icon: "fa-sitemap" },
        { label: "有效需求", value: 76892, format: "integer", unit: "项", trend: 11.2, icon: "fa-tasks" },
        { label: "本月新增需求", value: 11200, format: "integer", unit: "项", trend: 6.7, icon: "fa-plus-square" },
        { label: "需求成功覆盖率", value: 78.6, format: "percent", scale: false, trend: 2.4, icon: "fa-check-circle" },
        { label: "市场交易规模", value: 105520.1, format: "amountYi", scale: true, trend: 18.9, icon: "fa-line-chart" }
      ]
    },
    rankings: rankings,
    leader: {
      platformTrend: {
        labels: months,
        resources: [12000, 13500, 14200, 15800, 17200, 18500, 19800, 21500, 23200, 24800, 26500, 28300],
        products: [8500, 9200, 9800, 10500, 11200, 12000, 12800, 13500, 14200, 15000, 15800, 16500],
        consulting: [4200, 4500, 4800, 5200, 5500, 5800, 6200, 6500, 6800, 7200, 7500, 7800],
        solutions: [280, 320, 350, 380, 420, 450, 480, 520, 550, 580, 620, 650],
        transaction: [6200, 6800, 7200, 7600, 7900, 8500, 8700, 9000, 9200, 9700, 10500, 12220]
      },
      demandTrend: {
        labels: months,
        added: [5200, 6800, 7500, 6900, 8200, 9500, 8800, 9200, 8500, 9800, 10500, 11200],
        responded: [4800, 6200, 7000, 6500, 7800, 8900, 8200, 8800, 8000, 9200, 9800, 10500],
        successful: [4380, 5680, 6410, 5940, 7140, 8150, 7510, 8060, 7320, 8420, 8970, 9620]
      },
      industry: {
        labels: industries,
        resources: [96, 88, 72, 68, 58, 55, 76, 66, 57, 49],
        products: [100, 84, 72, 61, 53, 47, 69, 59, 51, 45],
        consulting: [92, 78, 71, 67, 61, 58, 57, 53, 50, 47],
        solutions: [100, 88, 73, 60, 54, 46, 42, 38, 31, 22]
      }
    },
    operations: {
      supplyDemand: {
        labels: scenes,
        supply: [100, 72, 48, 38, 30, 18, 15, 13, 11, 9],
        demand: [100, 68, 53, 46, 41, 34, 31, 24, 21, 13]
      },
      demandTrend: {
        labels: months,
        added: [5200, 6800, 7500, 6900, 8200, 9500, 8800, 9200, 8500, 9800, 10500, 11200],
        responded: [4800, 6200, 7000, 6500, 7800, 8900, 8200, 8800, 8000, 9200, 9800, 10500]
      },
      priority: {
        labels: ["紧急", "较高", "普通"],
        values: [15680, 32540, 41536]
      },
      status: {
        labels: ["匹配中", "已截止"],
        values: [76892, 12864]
      },
      matrix: [
        { type: "数据资源", total: "156,892 条", growth: "+8.2%", category: "政务服务", hot: "政务服务事项清单", result: "授权申请 28,765", indices: [86, 62, 92, 76] },
        { type: "数据产品", total: "289,568 个", growth: "+15.7%", category: "金融", hot: "金融风控数据集", result: "成交 8,975.6 万元", indices: [100, 98, 96, 88] },
        { type: "咨询服务", total: "28,568 项", growth: "+15.3%", category: "金融", hot: "数据资产入表咨询", result: "成交 89,652 万元", indices: [72, 96, 83, 94] },
        { type: "行业方案", total: "2,856 个", growth: "+15.7%", category: "金融", hot: "金融风控解决方案", result: "成交 6,892.5 万元", indices: [66, 98, 78, 86] },
        { type: "需求大厅", total: "89,756 项", growth: "+15.3%", category: "政务服务", hot: "政务数据共享接口", result: "成功覆盖 78.6%", indices: [84, 96, 95, 82] }
      ]
    },
    market: {
      customer: {
        primary: {
          labels: industries,
          resources: [96, 88, 72, 68, 58, 55, 76, 66, 57, 49],
          products: [100, 84, 72, 61, 53, 47, 69, 59, 51, 45],
          consulting: [92, 78, 71, 67, 61, 58, 57, 53, 50, 47],
          solutions: [100, 88, 73, 60, 54, 46, 42, 38, 31, 22]
        },
        trend: {
          labels: months,
          response: [4800, 6200, 7000, 6500, 7800, 8900, 8200, 8800, 8000, 9200, 9800, 10500],
          transaction: [6200, 6800, 7200, 7600, 7900, 8500, 8700, 9000, 9200, 9700, 10500, 12220]
        },
        leftDonut: {
          title: "产品交付方式",
          labels: ["文件传输", "数据流传输", "API传输", "人工交付", "数据库传输"],
          values: [65400, 89200, 105600, 18900, 10468]
        },
        rightDonut: {
          title: "需求状态",
          labels: ["匹配中", "已截止"],
          values: [76892, 12864]
        }
      }
    }
  };
})();
