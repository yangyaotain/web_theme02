(function () {
  "use strict";

  var dashboard = window.DASHBOARD_V2_DATA;
  if (!dashboard || !dashboard.screens) return;

  var navRoot = document.querySelector("[data-screen-nav]");
  var metricRoot = document.querySelector("[data-metric-grid]");
  var leftRoot = document.querySelector("[data-left-panels]");
  var heroRoot = document.querySelector("[data-hero-panel]");
  var rightRoot = document.querySelector("[data-right-panels]");
  var liveStatus = document.querySelector("[data-live-status]");
  var chartInstances = [];
  var pendingCharts = [];
  var renderToken = 0;

  var tones = {
    green: "#15995f",
    blue: "#3f8fe8",
    cyan: "#22b8ad",
    amber: "#e9a73c",
    mint: "#70c9a4",
    coral: "#ee7e72"
  };

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function rgba(hex, alpha) {
    var value = String(hex || "").replace("#", "");
    if (value.length !== 6) return "rgba(21, 153, 95, " + alpha + ")";
    var red = parseInt(value.slice(0, 2), 16);
    var green = parseInt(value.slice(2, 4), 16);
    var blue = parseInt(value.slice(4, 6), 16);
    return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
  }

  function getScreenId() {
    var hashId = window.location.hash.replace(/^#/, "");
    return dashboard.screens[hashId] ? hashId : dashboard.defaultScreen;
  }

  function renderNavigation() {
    navRoot.innerHTML = Object.keys(dashboard.screens).map(function (id) {
      var screen = dashboard.screens[id];
      return [
        '<button class="screen-nav__button" type="button" role="tab" aria-selected="false" tabindex="-1" aria-label="切换至' + escapeHtml(screen.label) + '" data-screen-id="' + id + '">',
        '  <span class="screen-nav__label">' + escapeHtml(screen.label) + "</span>",
        "</button>"
      ].join("");
    }).join("");
  }

  function renderMetrics(metrics) {
    metricRoot.setAttribute("data-metric-count", String(metrics.length));
    metricRoot.innerHTML = metrics.map(function (metric, index) {
      var featuredClass = metric.featured ? " metric-card--featured" : "";
      return [
        '<article class="metric-card' + featuredClass + '" tabindex="0" aria-label="' + escapeHtml(metric.label + " " + metric.value + metric.unit) + '">',
        '  <div class="metric-card__top">',
        '    <span class="metric-card__label">' + escapeHtml(metric.label) + "</span>",
        '    <span class="metric-card__icon"><i class="fa ' + escapeHtml(metric.icon) + '" aria-hidden="true"></i></span>',
        "  </div>",
        '  <div class="metric-card__value">' + escapeHtml(metric.value) + '<span class="metric-card__unit">' + escapeHtml(metric.unit) + "</span></div>",
        '  <div class="metric-card__foot">',
        '    <span><i class="fa ' + (index === 0 ? "fa-arrow-up" : "fa-circle") + '" aria-hidden="true"></i>' + escapeHtml(metric.note) + "</span>",
        "  </div>",
        "</article>"
      ].join("");
    }).join("");
  }

  function renderHero(screen) {
    var calloutMode = screen.heroLayout === "callouts";
    var heroItemsMarkup = screen.heroItems.map(function (item, index) {
      if (calloutMode) {
        return [
          '<div class="hero-callout hero-callout--' + (index + 1) + '" aria-label="' + escapeHtml(item.label + " " + item.value) + '">',
          '  <span class="hero-callout__icon"><i class="fa ' + escapeHtml(item.icon) + '" aria-hidden="true"></i></span>',
          '  <span class="hero-callout__copy"><strong>' + escapeHtml(item.label) + "</strong><small>" + escapeHtml(item.value) + "</small></span>",
          "</div>"
        ].join("");
      }
      return [
        '<div class="hero-flow__item">',
        '  <span class="hero-flow__icon"><i class="fa ' + escapeHtml(item.icon) + '" aria-hidden="true"></i></span>',
        '  <span class="hero-flow__copy"><strong>' + escapeHtml(item.label) + "</strong><small>" + escapeHtml(item.value) + "</small></span>",
        "</div>"
      ].join("");
    }).join("");

    heroRoot.innerHTML = [
      '<header class="hero-panel__header">',
      '  <div>',
      '    <p class="hero-panel__eyebrow">' + escapeHtml(screen.eyebrow) + "</p>",
      '    <h2 class="hero-panel__title">' + escapeHtml(screen.title) + "</h2>",
      '    <p class="hero-panel__description">' + escapeHtml(screen.description) + "</p>",
      "  </div>",
      '  <div class="hero-panel__summary" aria-label="' + escapeHtml(screen.heroCaption + " " + screen.heroValue + screen.heroUnit) + '">',
      '    <span class="hero-panel__summary-label">' + escapeHtml(screen.heroCaption) + "</span>",
      '    <strong>' + escapeHtml(screen.heroValue) + '<small>' + escapeHtml(screen.heroUnit) + "</small></strong>",
      "  </div>",
      "</header>",
      '<div class="hero-panel__visual' + (calloutMode ? " hero-panel__visual--callouts" : "") + '">',
      '  <img src="' + escapeHtml(screen.heroImage) + '" alt="' + escapeHtml(screen.title + "三维业务链路示意") + '">',
      calloutMode ? '<div class="hero-callouts" aria-label="' + escapeHtml(screen.title + "关键环节") + '">' + heroItemsMarkup + "</div>" : "",
      "</div>",
      calloutMode ? "" : '<div class="hero-flow" aria-label="' + escapeHtml(screen.title + "关键环节") + '">' + heroItemsMarkup + "</div>"
    ].join("");
  }

  function panelHeader(panel) {
    return [
      '<header class="panel__header">',
      '  <div class="panel__title-wrap">',
      '    <h3 class="panel__title"><i class="fa ' + escapeHtml(panel.icon) + '" aria-hidden="true"></i>' + escapeHtml(panel.title) + "</h3>",
      '    <p class="panel__subtitle">' + escapeHtml(panel.subtitle) + "</p>",
      "  </div>",
      '  <span class="panel__badge">' + escapeHtml(panel.badge) + "</span>",
      "</header>"
    ].join("");
  }

  function renderChartPanel(panel, id) {
    pendingCharts.push({ id: id, spec: panel.chart, title: panel.title });
    return [
      '<article class="panel panel--chart">',
      panelHeader(panel),
      '  <div class="chart-box"><canvas id="' + id + '" role="img" aria-label="' + escapeHtml(panel.title) + '"></canvas></div>',
      "</article>"
    ].join("");
  }

  function renderListPanel(panel) {
    return [
      '<article class="panel panel--list">',
      panelHeader(panel),
      '  <ul class="insight-list">',
      panel.items.map(function (item, index) {
        return [
          "    <li>",
          '      <span class="insight-list__index">' + String(index + 1).padStart(2, "0") + "</span>",
          '      <span class="insight-list__icon"><i class="fa ' + escapeHtml(item.icon) + '" aria-hidden="true"></i></span>',
          '      <span class="insight-list__copy"><strong>' + escapeHtml(item.title) + "</strong><small>" + escapeHtml(item.note) + "</small></span>",
          '      <span class="insight-list__value">' + escapeHtml(item.value) + "</span>",
          "    </li>"
        ].join("");
      }).join(""),
      "  </ul>",
      "</article>"
    ].join("");
  }

  function renderPanelColumn(root, panels, prefix) {
    root.innerHTML = panels.map(function (panel, index) {
      if (panel.type === "chart") {
        return renderChartPanel(panel, prefix + "-chart-" + index);
      }
      return renderListPanel(panel);
    }).join("");
  }

  function destroyCharts() {
    chartInstances.forEach(function (chart) {
      chart.destroy();
    });
    chartInstances = [];
    pendingCharts = [];
  }

  function datasetConfig(dataset, chartType) {
    var baseTone = tones[dataset.tone] || tones.green;
    var colors = Array.isArray(dataset.tones)
      ? dataset.tones.map(function (tone) { return tones[tone] || tones.green; })
      : null;
    var isLine = chartType === "line";
    var isRadar = chartType === "radar";

    return {
      label: dataset.label,
      data: dataset.data,
      borderColor: colors || baseTone,
      backgroundColor: colors || rgba(baseTone, isLine || isRadar ? 0.18 : 0.82),
      pointBackgroundColor: baseTone,
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      pointRadius: isLine ? 3 : 2,
      pointHoverRadius: 5,
      borderWidth: isLine || isRadar ? 2.2 : 1,
      tension: isLine ? 0.34 : 0,
      fill: Boolean(dataset.fill),
      borderRadius: chartType === "bar" ? 5 : 0,
      maxBarThickness: chartType === "bar" ? 26 : undefined
    };
  }

  function cartesianScale(max, stacked) {
    return {
      beginAtZero: true,
      suggestedMax: max || undefined,
      max: max || undefined,
      stacked: Boolean(stacked),
      grid: {
        color: "rgba(56, 111, 88, 0.10)",
        drawBorder: false
      },
      ticks: {
        color: "#63766d",
        font: { size: 11 },
        padding: 6
      },
      border: { display: false }
    };
  }

  function chartOptions(spec) {
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var options = {
      responsive: true,
      maintainAspectRatio: false,
      animation: reducedMotion ? false : { duration: 650 },
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          display: spec.type === "doughnut" || spec.type === "radar" || spec.datasets.length > 1,
          position: spec.type === "doughnut" ? "right" : "top",
          labels: {
            color: "#53685f",
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 7,
            boxHeight: 7,
            padding: 12,
            font: { size: 11, weight: "600" }
          }
        },
        tooltip: {
          backgroundColor: "rgba(12, 86, 57, 0.94)",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          borderColor: "rgba(255, 255, 255, 0.24)",
          borderWidth: 1,
          padding: 10,
          displayColors: true
        }
      }
    };

    if (spec.type === "doughnut") {
      options.cutout = "62%";
      return options;
    }

    if (spec.type === "radar") {
      options.scales = {
        r: {
          beginAtZero: true,
          max: spec.max || 100,
          grid: { color: "rgba(56, 111, 88, 0.15)" },
          angleLines: { color: "rgba(56, 111, 88, 0.15)" },
          pointLabels: { color: "#53685f", font: { size: 11, weight: "600" } },
          ticks: { display: false }
        }
      };
      return options;
    }

    options.indexAxis = spec.indexAxis || "x";
    options.scales = {
      x: cartesianScale(spec.indexAxis === "y" ? spec.max : undefined, spec.stacked),
      y: cartesianScale(spec.indexAxis !== "y" ? spec.max : undefined, spec.stacked)
    };
    if (spec.indexAxis === "y") {
      options.plugins.legend.display = spec.datasets.length > 1;
    }
    return options;
  }

  function createCharts() {
    if (typeof window.Chart !== "function") {
      document.querySelectorAll(".chart-box").forEach(function (box) {
        box.innerHTML = '<div class="chart-fallback"><i class="fa fa-exclamation-circle" aria-hidden="true"></i><span>图表组件未加载</span></div>';
      });
      return;
    }

    window.Chart.defaults.font.family = '"Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", sans-serif';
    window.Chart.defaults.color = "#63766d";

    pendingCharts.forEach(function (entry) {
      var canvas = document.getElementById(entry.id);
      if (!canvas) return;
      var spec = entry.spec;
      var config = {
        type: spec.type,
        data: {
          labels: spec.labels,
          datasets: spec.datasets.map(function (dataset) {
            return datasetConfig(dataset, spec.type);
          })
        },
        options: chartOptions(spec)
      };
      chartInstances.push(new window.Chart(canvas, config));
    });
  }

  function setActiveScreen(id, updateHash) {
    var screenId = dashboard.screens[id] ? id : dashboard.defaultScreen;
    var screen = dashboard.screens[screenId];
    var currentToken = ++renderToken;

    destroyCharts();
    renderMetrics(screen.metrics);
    renderHero(screen);
    renderPanelColumn(leftRoot, screen.panels.left, screenId + "-left");
    renderPanelColumn(rightRoot, screen.panels.right, screenId + "-right");

    navRoot.querySelectorAll("[data-screen-id]").forEach(function (button) {
      var selected = button.getAttribute("data-screen-id") === screenId;
      button.setAttribute("aria-selected", String(selected));
      button.setAttribute("tabindex", selected ? "0" : "-1");
      button.classList.toggle("is-active", selected);
    });

    if (updateHash) {
      window.history.replaceState(null, "", "#" + screenId);
    }

    document.title = "全要素展示驾驶舱 - " + screen.shortLabel;
    liveStatus.textContent = "已切换至" + screen.label;
    window.requestAnimationFrame(function () {
      if (currentToken === renderToken) createCharts();
    });
  }

  function bindNavigation() {
    navRoot.addEventListener("click", function (event) {
      var button = event.target.closest("[data-screen-id]");
      if (!button) return;
      setActiveScreen(button.getAttribute("data-screen-id"), true);
    });

    navRoot.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      var buttons = Array.prototype.slice.call(navRoot.querySelectorAll("[data-screen-id]"));
      var currentIndex = buttons.indexOf(document.activeElement);
      if (currentIndex < 0) return;
      event.preventDefault();
      var offset = event.key === "ArrowRight" ? 1 : -1;
      var nextIndex = (currentIndex + offset + buttons.length) % buttons.length;
      buttons[nextIndex].focus();
      buttons[nextIndex].click();
    });

    window.addEventListener("hashchange", function () {
      setActiveScreen(getScreenId(), false);
    });
  }

  function updateClock() {
    var now = new Date();
    var timeText = [now.getHours(), now.getMinutes(), now.getSeconds()].map(function (value) {
      return String(value).padStart(2, "0");
    }).join(":");
    var dateText = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join(".");

    document.querySelector("[data-dashboard-time]").textContent = timeText;
    document.querySelector("[data-dashboard-date]").textContent = dateText;
  }

  renderNavigation();
  bindNavigation();
  updateClock();
  window.setInterval(updateClock, 1000);
  setActiveScreen(getScreenId(), true);
})();
