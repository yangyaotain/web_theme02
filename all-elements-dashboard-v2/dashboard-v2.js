(function () {
  "use strict";

  var screens = {
    resources: {
      src: "images/dashboard-screen-resources.png",
      alt: "数据资源与聚合大屏",
      title: "资源聚合"
    },
    processing: {
      src: "images/dashboard-screen-processing.png",
      alt: "数据加工与产品服务大屏",
      title: "加工服务"
    },
    applications: {
      src: "images/dashboard-screen-applications.png",
      alt: "行业应用与价值成果大屏",
      title: "行业应用"
    }
  };

  var defaultScreen = "resources";
  var screenImage = document.querySelector("[data-dashboard-screen]");
  var liveStatus = document.querySelector("[data-live-status]");

  function getScreenId() {
    var screenId = window.location.hash.replace(/^#/, "");
    return screens[screenId] ? screenId : defaultScreen;
  }

  function showScreen(screenId, updateHash) {
    var resolvedId = screens[screenId] ? screenId : defaultScreen;
    var screen = screens[resolvedId];

    screenImage.src = screen.src;
    screenImage.alt = screen.alt;
    document.title = "全要素展示驾驶舱 - " + screen.title;

    document.querySelectorAll("[data-screen-link]").forEach(function (link) {
      var isCurrent = link.getAttribute("data-screen-link") === resolvedId;
      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (updateHash && window.location.hash !== "#" + resolvedId) {
      window.history.replaceState(null, "", "#" + resolvedId);
    }

    liveStatus.textContent = "已切换至" + screen.alt;
  }

  document.querySelector(".dashboard-hotspots").addEventListener("click", function (event) {
    var link = event.target.closest("[data-screen-link]");
    if (!link) return;
    event.preventDefault();
    showScreen(link.getAttribute("data-screen-link"), true);
  });

  window.addEventListener("hashchange", function () {
    showScreen(getScreenId(), false);
  });

  Object.keys(screens).forEach(function (screenId) {
    var preloadImage = new Image();
    preloadImage.src = screens[screenId].src;
  });

  showScreen(getScreenId(), true);
})();
