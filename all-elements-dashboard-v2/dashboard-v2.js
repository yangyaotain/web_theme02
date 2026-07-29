(function () {
  "use strict";

  var data = window.DASHBOARD_V2_DATA;
  var screen = document.body.getAttribute("data-screen") || "leader";
  var yearStorageKey = "all-elements-dashboard-v2-year";
  var selectedYear = readStoredValue(yearStorageKey, data ? data.defaultYear : "2026");
  var charts = {};
  var rankingState = {};

  var colors = {
    green: "#20a565",
    greenFill: "rgba(32, 165, 101, 0.72)",
    greenSoft: "rgba(32, 165, 101, 0.12)",
    cyan: "#0fc6c2",
    cyanFill: "rgba(15, 198, 194, 0.7)",
    blue: "#4f6ef7",
    blueFill: "rgba(79, 110, 247, 0.7)",
    amber: "#f7af1d",
    amberFill: "rgba(247, 175, 29, 0.72)",
    red: "#ef6262",
    redFill: "rgba(239, 98, 98, 0.7)",
    purple: "#9a72ed",
    purpleFill: "rgba(154, 114, 237, 0.7)",
    gray: "#6f8b80",
    grid: "rgba(165, 198, 182, 0.09)",
    text: "rgba(238, 248, 243, 0.76)",
    panel: "#142b23"
  };
  var verticalBarStandard = {
    barThickness: 14,
    maxBarThickness: 14
  };
  var horizontalBarStandard = {
    barThickness: 9,
    maxBarThickness: 9
  };

  function readStoredValue(key, fallback) {
    try {
      return window.sessionStorage.getItem(key) || fallback;
    } catch (error) {
      return fallback;
    }
  }

  function storeValue(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (error) {
      // 文件预览或隐私模式不可写时，保留当前页面状态即可。
    }
  }

  function getYearFactor() {
    return data.yearFactors[selectedYear] || 1;
  }

  function scaleValue(value, shouldScale) {
    if (shouldScale === false || typeof value !== "number") return value;
    var scaled = value * getYearFactor();
    return Number.isInteger(value) ? Math.round(scaled) : Math.round(scaled * 10) / 10;
  }

  function scaleSeries(values, shouldScale) {
    return values.map(function (value) {
      return scaleValue(value, shouldScale);
    });
  }

  function formatInteger(value) {
    return Math.round(Number(value) || 0).toLocaleString("zh-CN");
  }

  function formatMetric(metric) {
    var value = scaleValue(metric.value, metric.scale);
    if (metric.format === "percent") {
      return {
        value: Number(value).toFixed(1),
        unit: "%"
      };
    }
    if (metric.format === "amountYi") {
      return {
        value: (Number(value) / 10000).toFixed(2),
        unit: "亿元"
      };
    }
    return {
      value: formatInteger(value),
      unit: metric.unit || ""
    };
  }

  function scaleDisplayText(text) {
    var value = String(text || "");
    if (getYearFactor() === 1 || value.indexOf("%") >= 0 || value.indexOf("指数") >= 0) return value;
    return value.replace(/(\d[\d,]*(?:\.\d+)?)/, function (match) {
      var numeric = Number(match.replace(/,/g, ""));
      if (!Number.isFinite(numeric)) return match;
      var scaled = numeric * getYearFactor();
      var decimals = match.indexOf(".") >= 0 ? 1 : 0;
      return scaled.toLocaleString("zh-CN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    });
  }

  function renderHeader() {
    var root = document.querySelector("[data-dashboard-header]");
    if (!root) return;

    var navItems = [
      { id: "leader", label: "领导驾驶舱", icon: "fa-dashboard", href: "index.html" },
      { id: "operations", label: "运营人员驾驶舱", icon: "fa-cogs", href: "operations.html" },
      { id: "market", label: "客户驾驶舱", icon: "fa-exchange", href: "market.html" }
    ];

    var navHtml = navItems.map(function (item) {
      var active = item.id === screen;
      return [
        '<a class="role-nav__item' + (active ? " is-active" : "") + '" href="' + item.href + '"' + (active ? ' aria-current="page"' : "") + ">",
        '  <i class="fa ' + item.icon + '" aria-hidden="true"></i>',
        "  <span>" + item.label + "</span>",
        "</a>"
      ].join("");
    }).join("");

    var optionsHtml = data.years.map(function (year) {
      var selected = year === selectedYear;
      return [
        '<button class="year-control__option" type="button" role="option" aria-selected="' + selected + '" data-year-option="' + year + '">',
        "  <span>" + year + "年度</span>",
        '  <i class="fa fa-check" aria-hidden="true"' + (selected ? "" : ' style="visibility:hidden"') + "></i>",
        "</button>"
      ].join("");
    }).join("");

    root.innerHTML = [
      '<header class="dashboard-header">',
      '  <div class="dashboard-brand">',
      '    <span class="dashboard-brand__mark"><i class="fa fa-line-chart" aria-hidden="true"></i></span>',
      '    <div class="dashboard-brand__copy">',
      '      <h1 class="dashboard-brand__title">全要素展示驾驶舱2</h1>',
      '      <span class="dashboard-brand__subtitle">DATA ELEMENTS COMMAND CENTER</span>',
      "    </div>",
      "  </div>",
      '  <nav class="role-nav" aria-label="驾驶舱角色导航">' + navHtml + "</nav>",
      '  <div class="dashboard-actions">',
      '    <div class="year-control" data-year-control>',
      '      <button class="year-control__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" data-year-trigger>',
      '        <i class="fa fa-calendar-o" aria-hidden="true"></i>',
      '        <span data-year-label>' + selectedYear + "年度</span>",
      '        <i class="fa fa-angle-down" aria-hidden="true"></i>',
      "      </button>",
      '      <div class="year-control__menu" role="listbox" data-year-menu hidden>' + optionsHtml + "</div>",
      "    </div>",
      "  </div>",
      "</header>"
    ].join("");

    bindYearControl(root);
  }

  function bindYearControl(root) {
    var control = root.querySelector("[data-year-control]");
    var trigger = root.querySelector("[data-year-trigger]");
    var menu = root.querySelector("[data-year-menu]");
    if (!control || !trigger || !menu) return;

    function setOpen(open) {
      trigger.setAttribute("aria-expanded", String(open));
      menu.hidden = !open;
    }

    trigger.addEventListener("click", function () {
      setOpen(trigger.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", function (event) {
      var option = event.target.closest("[data-year-option]");
      if (!option) return;
      selectedYear = option.getAttribute("data-year-option");
      storeValue(yearStorageKey, selectedYear);
      updateYearControl();
      setOpen(false);
      refreshScreen();
    });

    document.addEventListener("click", function (event) {
      if (!control.contains(event.target)) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
  }

  function updateYearControl() {
    document.querySelectorAll("[data-year-label]").forEach(function (label) {
      label.textContent = selectedYear + "年度";
    });
    document.querySelectorAll("[data-year-option]").forEach(function (option) {
      var selected = option.getAttribute("data-year-option") === selectedYear;
      option.setAttribute("aria-selected", String(selected));
      var check = option.querySelector(".fa-check");
      if (check) check.style.visibility = selected ? "visible" : "hidden";
    });
  }

  function getMetricSet() {
    if (screen === "operations") return data.metrics.operations;
    if (screen === "market") return data.metrics.customer;
    return data.metrics.leader;
  }

  function renderMetrics() {
    var root = document.querySelector("[data-metric-grid]");
    if (!root) return;
    var metrics = getMetricSet();
    if (screen === "operations") {
      renderOperationMetricBelt(root, metrics);
      return;
    }
    root.innerHTML = metrics.map(function (metric) {
      var formatted = formatMetric(metric);
      var trendText = metric.trendText || ("同比 +" + Number(metric.trend || 0).toFixed(1) + "%");
      var trendTone = metric.trendTone === "warning" ? " is-warning" : "";
      return [
        '<article class="metric-card" title="' + metric.label + '">',
        '  <div class="metric-card__head">',
        '    <span class="metric-card__label">' + metric.label + "</span>",
        '    <span class="metric-card__icon"><i class="fa ' + metric.icon + '" aria-hidden="true"></i></span>',
        "  </div>",
        '  <div class="metric-card__value">' + formatted.value + '<span class="metric-card__unit">' + formatted.unit + "</span></div>",
        '  <div class="metric-card__foot">',
        '    <span class="metric-card__trend' + trendTone + '"><i class="fa ' + (metric.trendTone === "warning" ? "fa-exclamation-circle" : "fa-arrow-up") + '" aria-hidden="true"></i>' + trendText + "</span>",
        '    <span class="metric-card__period">' + selectedYear + "累计</span>",
        "  </div>",
        "</article>"
      ].join("");
    }).join("");
  }

  function renderOperationMetricBelt(root, metrics) {
    var groups = [
      { label: "供给底座", icon: "fa-database", tone: "supply", items: metrics.slice(0, 3) },
      { label: "需求闭环", icon: "fa-random", tone: "demand", items: metrics.slice(3, 6) },
      { label: "效率价值", icon: "fa-line-chart", tone: "value", items: metrics.slice(6, 8) }
    ];
    root.innerHTML = groups.map(function (group) {
      return [
        '<article class="operation-metric-group operation-metric-group--' + group.tone + '">',
        '  <div class="operation-metric-group__title"><i class="fa ' + group.icon + '" aria-hidden="true"></i><span>' + group.label + "</span></div>",
        '  <div class="operation-metric-group__items">',
        group.items.map(function (metric) {
          var formatted = formatMetric(metric);
          return [
            '<div class="operation-metric-item" title="' + metric.label + '">',
            '  <span class="operation-metric-item__label">' + metric.label + "</span>",
            '  <strong>' + formatted.value + '<em>' + formatted.unit + "</em></strong>",
            '  <span class="operation-metric-item__trend"><i class="fa fa-arrow-up" aria-hidden="true"></i>' + Number(metric.trend || 0).toFixed(1) + "%</span>",
            "</div>"
          ].join("");
        }).join(""),
        "  </div>",
        "</article>"
      ].join("");
    }).join("");
  }

  function chartBaseOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false
      },
      animation: {
        duration: 650,
        easing: "easeOutQuart"
      },
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            color: colors.text,
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 7,
            boxHeight: 7,
            padding: 15,
            font: { size: 10 }
          }
        },
        tooltip: {
          backgroundColor: "rgba(7, 19, 15, 0.96)",
          borderColor: "rgba(32, 165, 101, 0.5)",
          borderWidth: 1,
          padding: 10,
          titleColor: "#ffffff",
          bodyColor: "#dce9e2",
          displayColors: true
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: colors.text,
            font: { size: 9 },
            maxRotation: 0,
            autoSkip: true
          },
          border: { display: false }
        },
        y: {
          beginAtZero: true,
          grid: { color: colors.grid },
          ticks: {
            color: colors.text,
            font: { size: 9 }
          },
          border: { display: false }
        }
      }
    };
  }

  function lineDataset(label, values, color, fillColor, extra) {
    return Object.assign({
      label: label,
      data: scaleSeries(values),
      borderColor: color,
      backgroundColor: fillColor,
      borderWidth: 2,
      pointRadius: 2,
      pointHoverRadius: 5,
      pointBackgroundColor: color,
      tension: 0.36,
      fill: false
    }, extra || {});
  }

  function barDataset(label, values, color, extra, shouldScale) {
    return Object.assign({
      label: label,
      data: scaleSeries(values, shouldScale),
      backgroundColor: color,
      borderRadius: 4,
      borderSkipped: false,
      barPercentage: 0.72,
      categoryPercentage: 0.72
    }, extra || {});
  }

  function createChart(id, config) {
    var canvas = document.getElementById(id);
    if (!canvas || typeof window.Chart === "undefined") return;
    if (charts[id]) charts[id].destroy();
    charts[id] = new window.Chart(canvas.getContext("2d"), config);
  }

  function destroyAllCharts() {
    Object.keys(charts).forEach(function (key) {
      charts[key].destroy();
    });
    charts = {};
  }

  function renderLeaderCharts() {
    var source = data.leader;
    var platformOptions = chartBaseOptions();
    platformOptions.scales.x.stacked = true;
    platformOptions.scales.y.stacked = true;
    platformOptions.scales.y.title = {
      display: true,
      text: "供给数量",
      color: colors.text,
      font: { size: 10 }
    };
    platformOptions.scales.y1 = {
      beginAtZero: true,
      position: "right",
      grid: { drawOnChartArea: false },
      ticks: {
        color: colors.amber,
        font: { size: 9 },
        callback: function (value) { return value + "万"; }
      },
      title: {
        display: true,
        text: "成交金额（万元）",
        color: colors.amber,
        font: { size: 10 }
      },
      border: { display: false }
    };
    createChart("leaderPlatformTrendChart", {
      type: "bar",
      data: {
        labels: source.platformTrend.labels,
        datasets: [
          barDataset("数据资源", source.platformTrend.resources, colors.greenFill, { stack: "supply" }),
          barDataset("数据产品", source.platformTrend.products, colors.blueFill, { stack: "supply" }),
          barDataset("咨询服务", source.platformTrend.consulting, colors.cyanFill, { stack: "supply" }),
          barDataset("行业方案", source.platformTrend.solutions, colors.purpleFill, { stack: "supply" }),
          lineDataset("成交金额", source.platformTrend.transaction, colors.amber, "rgba(247, 175, 29, 0.1)", {
            type: "line",
            yAxisID: "y1",
            pointRadius: 3,
            fill: true
          })
        ]
      },
      options: platformOptions
    });

    var demandOptions = chartBaseOptions();
    demandOptions.plugins.legend.labels.padding = 12;
    createChart("leaderDemandTrendChart", {
      type: "line",
      data: {
        labels: source.demandTrend.labels,
        datasets: [
          lineDataset("新增需求", source.demandTrend.added, colors.green, colors.greenSoft, { fill: true }),
          lineDataset("响应需求", source.demandTrend.responded, colors.blue, "rgba(79, 110, 247, 0.08)"),
          lineDataset("响应成功", source.demandTrend.successful, colors.cyan, "rgba(15, 198, 194, 0.08)")
        ]
      },
      options: demandOptions
    });

    var industryOptions = chartBaseOptions();
    industryOptions.scales.x.stacked = true;
    industryOptions.scales.y.stacked = true;
    industryOptions.scales.y.max = 400;
    industryOptions.scales.y.ticks.callback = function (value) { return value; };
    createChart("leaderIndustryChart", {
      type: "bar",
      data: {
        labels: source.industry.labels,
        datasets: [
          barDataset("资源指数", source.industry.resources, colors.greenFill, { stack: "industry" }, false),
          barDataset("产品指数", source.industry.products, colors.blueFill, { stack: "industry" }, false),
          barDataset("咨询指数", source.industry.consulting, colors.cyanFill, { stack: "industry" }, false),
          barDataset("方案指数", source.industry.solutions, colors.amberFill, { stack: "industry" }, false)
        ]
      },
      options: industryOptions
    });
  }

  function renderOperationCharts() {
    var source = data.operations;
    var gapRows = source.supplyDemand.labels.map(function (label, index) {
      return {
        label: label,
        supply: source.supplyDemand.supply[index],
        demand: source.supplyDemand.demand[index],
        gap: source.supplyDemand.demand[index] - source.supplyDemand.supply[index]
      };
    }).sort(function (first, second) {
      return second.gap - first.gap || second.demand - first.demand;
    }).slice(0, 6);

    var matchingOptions = chartBaseOptions();
    matchingOptions.indexAxis = "y";
    var matchingMax = Math.ceil(Math.max.apply(null, gapRows.map(function (row) {
      return Math.max(row.supply, row.demand);
    })) / 20) * 20;
    matchingOptions.layout = { padding: { top: 4, right: 8, bottom: 2, left: 4 } };
    matchingOptions.scales.x = {
      min: -matchingMax,
      max: matchingMax,
      grid: {
        color: function (context) {
          return context.tick && context.tick.value === 0 ? "rgba(148, 173, 162, 0.4)" : colors.grid;
        }
      },
      ticks: {
        color: colors.text,
        font: { size: 11 },
        callback: function (value) { return Math.abs(value); }
      },
      border: { display: false }
    };
    matchingOptions.scales.y = {
      grid: { display: false },
      ticks: { color: colors.text, font: { size: 11 } },
      border: { display: false }
    };
    matchingOptions.plugins.legend.display = false;
    matchingOptions.plugins.tooltip.callbacks = {
      label: function (context) {
        return context.dataset.label + "：" + Math.abs(context.raw);
      }
    };
    createChart("operationSupplyDemandChart", {
      type: "bar",
      data: {
        labels: gapRows.map(function (row) { return row.label; }),
        datasets: [
          barDataset("供给指数", gapRows.map(function (row) { return -row.supply; }), colors.greenFill, Object.assign({}, horizontalBarStandard, { barPercentage: 0.78, categoryPercentage: 0.72 }), false),
          barDataset("需求热度", gapRows.map(function (row) { return row.demand; }), colors.amberFill, Object.assign({}, horizontalBarStandard, { barPercentage: 0.78, categoryPercentage: 0.72 }), false)
        ]
      },
      options: matchingOptions
    });

    var gapAlertRoot = document.querySelector("[data-operation-gap-alerts]");
    if (gapAlertRoot) {
      gapAlertRoot.innerHTML = gapRows.filter(function (row) {
        return row.gap > 0;
      }).slice(0, 3).map(function (row, index) {
        return [
          '<div class="operation-gap-alert">',
          '  <span class="operation-gap-alert__index">0' + (index + 1) + "</span>",
          '  <span class="operation-gap-alert__name">' + row.label + "</span>",
          '  <strong>缺口 +' + row.gap + "</strong>",
          "</div>"
        ].join("");
      }).join("");
    }

    renderOperationResponseLoop(source);
    renderOperationStructure(source);
    renderOperationTrend(source);
    renderOperationHeatmap(source);
  }

  function renderOperationResponseLoop(source) {
    var metrics = data.metrics.operations;
    var totalMetric = metrics.filter(function (metric) { return metric.label === "需求总量"; })[0];
    var responseMetric = metrics.filter(function (metric) { return metric.label === "响应需求数"; })[0];
    var successMetric = metrics.filter(function (metric) { return metric.label === "响应成功数"; })[0];
    var total = totalMetric ? totalMetric.value : 0;
    var responded = responseMetric ? responseMetric.value : 0;
    var successful = successMetric ? successMetric.value : 0;
    var responseRate = total ? responded / total * 100 : 0;
    var responseSuccessRate = responded ? successful / responded * 100 : 0;
    var successCoverage = total ? successful / total * 100 : 0;
    var responseLoopRoot = document.querySelector("[data-operation-response-loop]");

    if (responseLoopRoot) {
      var stages = [
        { label: "需求进入", value: total, rateLabel: "全量需求", icon: "fa-inbox", tone: "total" },
        { label: "完成响应", value: responded, rateLabel: "响应率 " + responseRate.toFixed(1) + "%", icon: "fa-reply-all", tone: "response" },
        { label: "响应成功", value: successful, rateLabel: "成功率 " + responseSuccessRate.toFixed(1) + "%", icon: "fa-check-circle", tone: "success" }
      ];
      responseLoopRoot.innerHTML = stages.map(function (stage, index) {
        return [
          '<div class="operation-response-stage operation-response-stage--' + stage.tone + '">',
          '  <span class="operation-response-stage__sequence">0' + (index + 1) + "</span>",
          '  <i class="fa ' + stage.icon + '" aria-hidden="true"></i>',
          '  <span class="operation-response-stage__label">' + stage.label + "</span>",
          "  <strong>" + formatInteger(scaleValue(stage.value)) + "<em>项</em></strong>",
          '  <span class="operation-response-stage__rate">' + stage.rateLabel + "</span>",
          "</div>"
        ].join("");
      }).join("");
    }

    var lossesRoot = document.querySelector("[data-operation-loop-losses]");
    if (lossesRoot) {
      var losses = [
        { label: "待响应需求", value: formatInteger(scaleValue(Math.max(total - responded, 0))) + " 项", tone: "warning" },
        { label: "响应未成功", value: formatInteger(scaleValue(Math.max(responded - successful, 0))) + " 项", tone: "attention" },
        { label: "总体闭环率", value: successCoverage.toFixed(1) + "%", tone: "success" }
      ];
      lossesRoot.innerHTML = losses.map(function (item) {
        return [
          '<div class="operation-loop-loss operation-loop-loss--' + item.tone + '">',
          '  <span>' + item.label + "</span>",
          "  <strong>" + item.value + "</strong>",
          "</div>"
        ].join("");
      }).join("");
    }
  }

  function renderOperationTrend(source) {
    var responseRates = source.demandTrend.added.map(function (added, index) {
      return added ? Math.round(source.demandTrend.responded[index] / added * 1000) / 10 : 0;
    });
    var demandOptions = chartBaseOptions();
    demandOptions.plugins.legend.display = false;
    demandOptions.layout = { padding: { top: 4, right: 2, bottom: 0, left: 2 } };
    demandOptions.scales.x.ticks.font.size = 11;
    demandOptions.scales.y.ticks.font.size = 11;
    demandOptions.scales.y.title = {
      display: true,
      text: "需求数量",
      color: colors.text,
      font: { size: 11 }
    };
    demandOptions.scales.y1 = {
      min: 80,
      max: 100,
      position: "right",
      grid: { drawOnChartArea: false },
      ticks: {
        color: colors.green,
        font: { size: 11 },
        callback: function (value) { return value + "%"; }
      },
      title: {
        display: true,
        text: "响应率",
        color: colors.green,
        font: { size: 11 }
      },
      border: { display: false }
    };
    createChart("operationDemandTrendChart", {
      type: "bar",
      data: {
        labels: source.demandTrend.labels,
        datasets: [
          barDataset("新增需求", source.demandTrend.added, colors.amberFill, verticalBarStandard),
          barDataset("响应需求", source.demandTrend.responded, colors.blueFill, verticalBarStandard),
          {
            type: "line",
            label: "响应率",
            data: responseRates,
            yAxisID: "y1",
            borderColor: colors.green,
            backgroundColor: colors.greenSoft,
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: colors.green,
            pointBorderColor: colors.panel,
            pointBorderWidth: 1,
            tension: 0.34,
            fill: true
          }
        ]
      },
      options: demandOptions
    });
  }

  function renderOperationStructure(source) {
    var totalDemand = source.status.values.reduce(function (sum, value) { return sum + value; }, 0);
    var statusTotalRoot = document.querySelector("[data-operation-status-total]");
    if (statusTotalRoot) {
      statusTotalRoot.textContent = formatInteger(scaleValue(totalDemand)) + " 项";
    }

    var statusListRoot = document.querySelector("[data-operation-status-list]");
    if (statusListRoot) {
      var statusToneClasses = ["is-green", "is-blue"];
      statusListRoot.innerHTML = source.status.labels.map(function (label, index) {
        var value = source.status.values[index];
        var percent = totalDemand ? value / totalDemand * 100 : 0;
        return renderStructureBar(label, value, percent, statusToneClasses[index]);
      }).join("");
    }

    var priorityTotal = source.priority.values.reduce(function (sum, value) { return sum + value; }, 0);
    var priorityOptions = chartBaseOptions();
    priorityOptions.scales = {
      r: {
        beginAtZero: true,
        grid: { color: "rgba(42, 73, 61, 0.48)" },
        angleLines: { color: "rgba(42, 73, 61, 0.34)" },
        ticks: { display: false, backdropColor: "transparent" },
        pointLabels: { display: false }
      }
    };
    priorityOptions.plugins.legend.position = "bottom";
    priorityOptions.plugins.legend.labels.padding = 13;
    priorityOptions.plugins.legend.labels.font.size = 11;
    priorityOptions.plugins.tooltip.callbacks = {
      label: function (context) {
        var percent = priorityTotal ? context.raw / scaleValue(priorityTotal) * 100 : 0;
        return context.label + "：" + formatInteger(context.raw) + "（" + percent.toFixed(1) + "%）";
      }
    };
    createChart("operationPriorityPolarChart", {
      type: "polarArea",
      data: {
        labels: source.priority.labels,
        datasets: [{
          data: scaleSeries(source.priority.values),
          backgroundColor: [colors.redFill, colors.amberFill, colors.cyanFill],
          borderColor: colors.panel,
          borderWidth: 2
        }]
      },
      options: priorityOptions
    });
  }

  function renderStructureBar(label, value, percent, toneClass) {
    return [
      '<div class="structure-bar-row ' + toneClass + '">',
      '  <div class="structure-bar-row__head">',
      '    <span class="structure-bar-row__label"><i aria-hidden="true"></i>' + label + "</span>",
      '    <span class="structure-bar-row__value">' + formatInteger(scaleValue(value)) + ' <em>' + percent.toFixed(1) + "%</em></span>",
      "  </div>",
      '  <div class="structure-bar-row__track" role="progressbar" aria-label="' + label + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + percent.toFixed(1) + '">',
      '    <span style="width:' + percent.toFixed(1) + '%"></span>',
      "  </div>",
      "</div>"
    ].join("");
  }

  function createDoughnut(id, labels, values, palette, cutout, radius) {
    var options = chartBaseOptions();
    options.cutout = cutout || "64%";
    options.radius = radius || "80%";
    options.layout = {
      padding: {
        top: 4,
        right: 8,
        bottom: 4,
        left: 8
      }
    };
    options.plugins.legend.position = "bottom";
    options.plugins.legend.labels.padding = 9;
    options.plugins.legend.labels.font.size = 9;
    options.scales = {};
    options.plugins.tooltip.callbacks = {
      label: function (context) {
        var total = context.dataset.data.reduce(function (sum, value) { return sum + value; }, 0);
        var percent = total ? (context.raw / total * 100).toFixed(1) : "0.0";
        return context.label + "：" + formatInteger(context.raw) + "（" + percent + "%）";
      }
    };
    createChart(id, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [{
          data: scaleSeries(values),
          backgroundColor: palette,
          borderColor: colors.panel,
          borderWidth: 2,
          hoverOffset: 5
        }]
      },
      options: options
    });
  }

  function renderOperationHeatmap(source) {
    var root = document.querySelector("[data-operation-heatmap]");
    if (!root) return;
    var columns = ["规模", "增长", "热度", "成效"];
    var header = ['<span class="operation-heatmap__corner">要素类型</span>'].concat(columns.map(function (column) {
      return '<span class="operation-heatmap__column">' + column + "</span>";
    })).join("");
    var rows = source.matrix.map(function (row) {
      var details = [scaleDisplayText(row.total), row.growth, row.hot, scaleDisplayText(row.result)];
      return [
        '<span class="operation-heatmap__type"><i aria-hidden="true"></i>' + row.type + "</span>",
        row.indices.map(function (score, index) {
          var levelClass = score >= 90 ? "is-hot" : (score >= 80 ? "is-strong" : (score >= 70 ? "is-medium" : "is-watch"));
          return [
            '<div class="operation-heatmap__cell ' + levelClass + '" title="' + columns[index] + "：" + details[index] + '">',
            "  <strong>" + details[index] + "</strong>",
            "</div>"
          ].join("");
        }).join("")
      ].join("");
    }).join("");
    root.innerHTML = header + rows;
  }

  function renderMarketCharts() {
    var source = data.market.customer;
    var supplyOptions = chartBaseOptions();
    supplyOptions.scales.x.stacked = true;
    supplyOptions.scales.y.stacked = true;
    supplyOptions.scales.y.max = 400;
    supplyOptions.scales.y.ticks.callback = function (value) { return value; };
    createChart("marketPrimaryChart", {
      type: "bar",
      data: {
        labels: source.primary.labels,
        datasets: [
          barDataset("资源指数", source.primary.resources, colors.greenFill, Object.assign({ stack: "market-supply" }, verticalBarStandard), false),
          barDataset("产品指数", source.primary.products, colors.blueFill, Object.assign({ stack: "market-supply" }, verticalBarStandard), false),
          barDataset("咨询指数", source.primary.consulting, colors.cyanFill, Object.assign({ stack: "market-supply" }, verticalBarStandard), false),
          barDataset("方案指数", source.primary.solutions, colors.amberFill, Object.assign({ stack: "market-supply" }, verticalBarStandard), false)
        ]
      },
      options: supplyOptions
    });

    var marketTrendOptions = chartBaseOptions();
    marketTrendOptions.scales.y1 = {
      beginAtZero: true,
      position: "right",
      grid: { drawOnChartArea: false },
      ticks: {
        color: colors.amber,
        font: { size: 9 },
        callback: function (value) { return value + "万"; }
      },
      border: { display: false }
    };
    createChart("marketTrendChart", {
      type: "bar",
      data: {
        labels: source.trend.labels,
        datasets: [
          barDataset("响应需求", source.trend.response, colors.greenFill, verticalBarStandard),
          lineDataset("交易金额（万元）", source.trend.transaction, colors.amber, "rgba(247, 175, 29, 0.1)", {
            type: "line",
            yAxisID: "y1",
            fill: true
          })
        ]
      },
      options: marketTrendOptions
    });

    createDoughnut("marketLeftDonutChart", source.leftDonut.labels, source.leftDonut.values, [colors.greenFill, colors.cyanFill, colors.blueFill, colors.amberFill, colors.purpleFill, colors.redFill], "60%", "78%");
    createDoughnut("marketRightDonutChart", source.rightDonut.labels, source.rightDonut.values, [colors.greenFill, colors.blueFill], "60%", "78%");
  }

  function getRankingConfig(context) {
    if (context === "operations") {
      return [
        { key: "resources", label: "资源", icon: "fa-database" },
        { key: "products", label: "产品", icon: "fa-cubes" },
        { key: "consulting", label: "咨询", icon: "fa-comments" },
        { key: "solutions", label: "方案", icon: "fa-sitemap" },
        { key: "demands", label: "需求", icon: "fa-tasks" }
      ];
    }
    if (context === "market") {
      return [
        { key: "resources", label: "资源", icon: "fa-database" },
        { key: "products", label: "产品", icon: "fa-cubes" },
        { key: "consulting", label: "咨询", icon: "fa-comments" },
        { key: "solutions", label: "方案", icon: "fa-sitemap" },
        { key: "demands", label: "需求", icon: "fa-tasks" }
      ];
    }
    return [
      { key: "products", label: "产品", icon: "fa-cubes" },
      { key: "consulting", label: "咨询", icon: "fa-comments" },
      { key: "solutions", label: "方案", icon: "fa-sitemap" },
      { key: "demands", label: "需求", icon: "fa-tasks" }
    ];
  }

  function renderRankings() {
    document.querySelectorAll("[data-ranking]").forEach(function (root) {
      var context = root.getAttribute("data-ranking") || "leader";
      var tabs = getRankingConfig(context);
      var allowedKeys = tabs.map(function (tab) { return tab.key; });
      var defaultKey = tabs[0].key;
      var activeKey = rankingState[context];
      if (!allowedKeys.includes(activeKey)) activeKey = defaultKey;
      rankingState[context] = activeKey;

      var tabsRoot = root.querySelector("[data-ranking-tabs]");
      var listRoot = root.querySelector("[data-ranking-list]");
      if (!tabsRoot || !listRoot) return;

      tabsRoot.innerHTML = tabs.map(function (tab) {
        var selected = tab.key === activeKey;
        return '<button class="panel-tab" type="button" role="tab" aria-selected="' + selected + '" data-ranking-tab="' + tab.key + '"><i class="fa ' + tab.icon + '" aria-hidden="true"></i>' + tab.label + "</button>";
      }).join("");

      var rankingItems = data.rankings[activeKey] || [];
      var rankingMax = Math.max.apply(null, rankingItems.map(function (item) {
        return Number(String(item.value).replace(/,/g, "").match(/[\d.]+/)) || 0;
      }).concat([1]));
      listRoot.innerHTML = rankingItems.map(function (item, index) {
        if (context === "operations") {
          var rankingValue = Number(String(item.value).replace(/,/g, "").match(/[\d.]+/)) || 0;
          var rankingWidth = Math.max(rankingValue / rankingMax * 100, 4);
          return [
            '<div class="ranking-item ranking-item--operation">',
            '  <span class="ranking-item__index">' + (index + 1) + "</span>",
            '  <div class="ranking-item__body">',
            '    <div class="ranking-item__main">',
            '      <span class="ranking-item__name" title="' + item.name + '">' + item.name + "</span>",
            '      <span class="ranking-item__value">' + scaleDisplayText(item.value) + "</span>",
            "    </div>",
            '    <span class="ranking-item__track"><i style="width:' + rankingWidth.toFixed(1) + '%"></i></span>',
            "  </div>",
            "</div>"
          ].join("");
        }
        return [
          '<div class="ranking-item">',
          '  <span class="ranking-item__index">' + (index + 1) + "</span>",
          '  <span class="ranking-item__name" title="' + item.name + '">' + item.name + "</span>",
          '  <span class="ranking-item__value">' + scaleDisplayText(item.value) + "</span>",
          "</div>"
        ].join("");
      }).join("");

      if (!root.hasAttribute("data-ranking-bound")) {
        root.setAttribute("data-ranking-bound", "true");
        root.addEventListener("click", function (event) {
          var button = event.target.closest("[data-ranking-tab]");
          if (!button) return;
          rankingState[context] = button.getAttribute("data-ranking-tab");
          renderRankings();
        });
      }
    });
  }

  function refreshScreen() {
    destroyAllCharts();
    renderMetrics();
    renderRankings();
    updateYearControl();
    if (screen === "operations") {
      renderOperationCharts();
    } else if (screen === "market") {
      renderMarketCharts();
    } else {
      renderLeaderCharts();
    }
  }

  function init() {
    if (!data) {
      document.body.innerHTML = '<div class="empty-state">驾驶舱数据加载失败，请检查数据脚本。</div>';
      return;
    }

    if (!data.years.includes(selectedYear)) selectedYear = data.defaultYear;

    renderHeader();
    refreshScreen();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
