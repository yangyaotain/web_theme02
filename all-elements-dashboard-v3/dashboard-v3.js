(function () {
  "use strict";

  var dashboard = window.DASHBOARD_V3_DATA;
  if (!dashboard) return;

  var tones = {
    green: "#15995f",
    greenDark: "#0b7149",
    blue: "#3f8fe8",
    cyan: "#22b8ad",
    amber: "#e9a73c",
    mint: "#70c9a4"
  };

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderMetrics() {
    var root = document.querySelector("[data-metric-grid]");
    if (!root) return;

    root.innerHTML = dashboard.metrics.map(function (metric) {
      return [
        '<article class="overview-metric" tabindex="0" aria-label="' + escapeHtml(metric.label + metric.value + metric.unit) + '">',
        '  <span class="overview-metric__icon"><i class="fa ' + escapeHtml(metric.icon) + '" aria-hidden="true"></i></span>',
        '  <span class="overview-metric__copy"><strong>' + escapeHtml(metric.label) + '</strong><small>' + escapeHtml(metric.note) + '</small></span>',
        '  <b>' + escapeHtml(metric.value) + '<em>' + escapeHtml(metric.unit) + '</em></b>',
        '</article>'
      ].join("");
    }).join("");
  }

  function renderResourceComposition() {
    var root = document.querySelector("[data-resource-composition]");
    if (!root) return;

    var bar = dashboard.resourceCategories.map(function (item) {
      return '<span class="composition-bar__segment composition-bar__segment--' + escapeHtml(item.tone) + '" style="width:' + escapeHtml(item.share) + '%" title="' + escapeHtml(item.label + item.value + "，占比" + item.share + "%") + '"></span>';
    }).join("");

    var legend = dashboard.resourceCategories.map(function (item) {
      return [
        '<span class="composition-legend__item">',
        '  <i class="composition-dot composition-dot--' + escapeHtml(item.tone) + '" aria-hidden="true"></i>',
        '  <span><strong>' + escapeHtml(item.label) + '</strong><b>' + escapeHtml(item.value) + '</b></span>',
        '  <small>' + escapeHtml(item.share) + '%</small>',
        '</span>'
      ].join("");
    }).join("");

    root.innerHTML = '<div class="composition-bar" aria-hidden="true">' + bar + '</div><div class="composition-legend">' + legend + '</div>';
  }

  function renderValueOutputs() {
    var root = document.querySelector("[data-value-outputs]");
    if (!root) return;

    root.innerHTML = [
      '<div class="value-output-band__title"><i class="fa fa-exchange" aria-hidden="true"></i><span>资源价值转化</span></div>',
      dashboard.valueOutputs.map(function (item) {
        return '<div class="value-output-band__item"><span>' + escapeHtml(item.label) + '</span><strong>' + escapeHtml(item.value) + '<small>' + escapeHtml(item.unit) + '</small></strong></div>';
      }).join("")
    ].join("");
  }

  function renderGrowthHighlights() {
    var root = document.querySelector("[data-growth-highlights]");
    if (!root) return;

    root.innerHTML = dashboard.resourceGrowth.highlights.map(function (item) {
      return '<span><small>' + escapeHtml(item.label) + '</small><strong>' + escapeHtml(item.value) + '</strong></span>';
    }).join("");
  }

  function renderQualityDatasets() {
    var root = document.querySelector("[data-quality-datasets]");
    if (!root) return;
    var data = dashboard.qualityDatasets;
    var maxValue = Math.max.apply(null, data.categories.map(function (item) { return item.value; }));

    root.innerHTML = [
      '<div class="quality-overview">',
      '  <span class="quality-overview__total"><small>高质量数据集总量</small><strong>' + escapeHtml(data.total) + '<em>' + escapeHtml(data.unit) + '</em></strong></span>',
      '  <span class="quality-overview__stats">',
      data.stats.map(function (item) {
        return '<span><small>' + escapeHtml(item.label) + '</small><b>' + escapeHtml(item.value) + '</b></span>';
      }).join(""),
      '  </span>',
      '</div>',
      '<div class="quality-category-list">',
      data.categories.map(function (item) {
        var width = Math.round(item.value / maxValue * 1000) / 10;
        return [
          '<span class="quality-category-item">',
          '  <strong>' + escapeHtml(item.label) + '</strong>',
          '  <i><em class="quality-category-bar quality-category-bar--' + escapeHtml(item.tone) + '" style="width:' + width + '%"></em></i>',
          '  <b>' + escapeHtml(item.value) + '个</b>',
          '</span>'
        ].join("");
      }).join(""),
      '</div>',
      '<div class="quality-representatives"><strong>代表成果</strong><span>',
      data.representativeResults.map(function (item) {
        return '<small><i class="fa fa-database" aria-hidden="true"></i>' + escapeHtml(item) + '</small>';
      }).join(""),
      '</span></div>'
    ].join("");
  }

  function renderPublicData() {
    var root = document.querySelector("[data-public-data]");
    if (!root) return;
    var data = dashboard.publicData;

    root.innerHTML = [
      '<div class="public-summary__total"><small>公共数据归集规模</small><strong>' + escapeHtml(data.total) + '<em>' + escapeHtml(data.unit) + '</em></strong></div>',
      '<div class="public-summary__stats">',
      data.stats.map(function (item) {
        return '<span><small>' + escapeHtml(item.label) + '</small><b>' + escapeHtml(item.value) + '</b></span>';
      }).join(""),
      '</div>',
      '<p><i class="fa fa-check-circle" aria-hidden="true"></i>' + escapeHtml(data.summary) + '</p>'
    ].join("");
  }

  function renderTrustedSpaceSummary() {
    var root = document.querySelector("[data-trusted-space-summary]");
    if (!root) return;

    root.innerHTML = dashboard.trustedSpaceSummary.map(function (item) {
      return [
        '<span class="trusted-space-summary__item">',
        '  <small>' + escapeHtml(item.label) + '</small>',
        '  <strong>' + escapeHtml(item.value) + '<em>' + escapeHtml(item.unit) + '</em></strong>',
        '</span>'
      ].join("");
    }).join("");
  }

  function renderTrustedSpaces() {
    var root = document.querySelector("[data-trusted-spaces]");
    if (!root) return;

    root.innerHTML = dashboard.trustedSpaces.map(function (item, index) {
      return [
        '<article class="trusted-space-item" tabindex="0" aria-label="' + escapeHtml(item.name + "，" + item.amount + "，特色：" + item.feature) + '">',
        '  <div class="trusted-space-item__heading">',
        '    <span><i>' + String(index + 1).padStart(2, "0") + '</i><strong>' + escapeHtml(item.name) + '</strong></span>',
        '    <b>' + escapeHtml(item.amount) + '</b>',
        '  </div>',
        '  <div class="trusted-space-item__detail"><span>' + escapeHtml(item.feature) + '</span><small>' + escapeHtml(item.share) + '%</small></div>',
        '  <div class="trusted-space-item__bar" aria-hidden="true"><span style="width:' + escapeHtml(item.share) + '%"></span></div>',
        '</article>'
      ].join("");
    }).join("");
  }

  function renderSupportingResults() {
    var root = document.querySelector("[data-supporting-results]");
    if (!root) return;

    root.innerHTML = dashboard.supportingResults.map(function (item) {
      return [
        '<article class="supporting-result-item">',
        '  <i class="fa ' + escapeHtml(item.icon) + '" aria-hidden="true"></i>',
        '  <span><small>' + escapeHtml(item.title) + '</small><strong>' + escapeHtml(item.value) + '</strong></span>',
        '</article>'
      ].join("");
    }).join("");
  }

  function chartBaseOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      animation: { duration: 650 },
      interaction: { intersect: false, mode: "nearest" },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(6, 75, 50, 0.92)",
          titleFont: { size: 12, weight: "700" },
          bodyFont: { size: 12 },
          padding: 10,
          cornerRadius: 6,
          displayColors: true
        }
      },
      scales: {
        x: {
          border: { display: false },
          grid: { display: false },
          ticks: { color: "#6f8379", font: { size: 11 } }
        },
        y: {
          border: { display: false },
          grid: { color: "rgba(21, 153, 95, 0.1)" },
          ticks: { color: "#6f8379", font: { size: 11 } }
        }
      }
    };
  }

  function createResourceGrowthChart() {
    var canvas = document.getElementById("resourceGrowthChart");
    if (!canvas) return;
    var context = canvas.getContext("2d");
    var gradient = context.createLinearGradient(0, 0, 0, 230);
    gradient.addColorStop(0, "rgba(21, 153, 95, 0.3)");
    gradient.addColorStop(1, "rgba(21, 153, 95, 0.02)");
    var options = chartBaseOptions();
    options.scales.y.beginAtZero = false;
    options.scales.y.suggestedMin = 10;
    options.scales.y.ticks.maxTicksLimit = 4;
    options.scales.x.ticks.maxTicksLimit = 6;
    options.plugins.tooltip.callbacks = {
      label: function (contextValue) {
        return "资源总量 " + contextValue.raw + " 亿条";
      }
    };

    new window.Chart(canvas, {
      type: "line",
      data: {
        labels: dashboard.resourceGrowth.labels,
        datasets: [{
          label: "资源总量",
          data: dashboard.resourceGrowth.values,
          borderColor: tones.green,
          backgroundColor: gradient,
          borderWidth: 2.5,
          pointRadius: 2.5,
          pointHoverRadius: 5,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: tones.green,
          tension: 0.36,
          fill: true
        }]
      },
      options: options
    });
  }

  function createCharts() {
    if (!window.Chart) {
      document.querySelectorAll(".chart-box").forEach(function (box) {
        box.classList.add("chart-box--unavailable");
      });
      return;
    }

    window.Chart.defaults.font.family = '"Microsoft YaHei", "PingFang SC", Arial, sans-serif';
    window.Chart.defaults.color = "#60736a";
    createResourceGrowthChart();
  }

  function updateClock() {
    var now = new Date();
    var week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    var timeText = [now.getHours(), now.getMinutes(), now.getSeconds()].map(function (value) {
      return String(value).padStart(2, "0");
    }).join(":");
    var dateText = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join(".") + " " + week[now.getDay()];

    document.querySelector("[data-dashboard-time]").textContent = timeText;
    document.querySelector("[data-dashboard-date]").textContent = dateText;
  }

  renderMetrics();
  renderResourceComposition();
  renderValueOutputs();
  renderQualityDatasets();
  renderGrowthHighlights();
  renderPublicData();
  renderTrustedSpaceSummary();
  renderTrustedSpaces();
  renderSupportingResults();
  updateClock();
  window.setInterval(updateClock, 1000);
  window.requestAnimationFrame(createCharts);
})();
