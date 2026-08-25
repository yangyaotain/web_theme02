(function () {
  "use strict";

  var screens = {
    scale: {
      src: "images/dashboard-two-view-01-scale-service.png",
      alt: "数据聚合与服务能力全景—规模流通与服务",
      title: "规模流通与服务"
    },
    ecosystem: {
      src: "images/dashboard-two-view-02-ecosystem-outcomes.png",
      alt: "数据聚合与服务能力全景—生态安全与成效",
      title: "生态安全与成效"
    }
  };

  var defaultScreen = "scale";
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
