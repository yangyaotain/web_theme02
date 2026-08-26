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
  var dashboardFrame = document.querySelector("[data-dashboard-frame]");
  var screenSlides = {};
  var liveStatus = document.querySelector("[data-live-status]");
  var currentScreenId = null;
  var switchToken = 0;

  document.querySelectorAll("[data-dashboard-screen]").forEach(function (slide) {
    screenSlides[slide.getAttribute("data-dashboard-screen")] = slide;
  });

  function getScreenId() {
    var screenId = window.location.hash.replace(/^#/, "");
    return screens[screenId] ? screenId : defaultScreen;
  }

  function updateScreenState(screenId, updateHash) {
    var screen = screens[screenId];

    document.title = "全要素展示驾驶舱 - " + screen.title;

    document.querySelectorAll("[data-screen-link]").forEach(function (link) {
      var isCurrent = link.getAttribute("data-screen-link") === screenId;
      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (updateHash && window.location.hash !== "#" + screenId) {
      window.history.replaceState(null, "", "#" + screenId);
    }

    liveStatus.textContent = "已切换至" + screen.alt;
  }

  function waitForSlide(slide) {
    var image = slide.querySelector("img");
    if (image.complete && image.naturalWidth) {
      return typeof image.decode === "function" ? image.decode().catch(function () {}) : Promise.resolve();
    }

    return new Promise(function (resolve) {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", resolve, { once: true });
    });
  }

  function activateScreen(screenId) {
    Object.keys(screenSlides).forEach(function (id) {
      var isCurrent = id === screenId;
      screenSlides[id].classList.toggle("is-active", isCurrent);
      if (isCurrent) {
        screenSlides[id].removeAttribute("aria-hidden");
      } else {
        screenSlides[id].setAttribute("aria-hidden", "true");
      }
    });
    currentScreenId = screenId;
  }

  function showScreen(screenId, updateHash, immediate) {
    var resolvedId = screens[screenId] ? screenId : defaultScreen;
    var targetSlide = screenSlides[resolvedId];
    var requestToken = ++switchToken;

    if (immediate || currentScreenId === null) {
      activateScreen(resolvedId);
      updateScreenState(resolvedId, updateHash);
      dashboardFrame.classList.add("is-ready");
      return;
    }

    if (currentScreenId === resolvedId) {
      updateScreenState(resolvedId, updateHash);
      return;
    }

    waitForSlide(targetSlide).then(function () {
      if (requestToken !== switchToken) return;

      window.requestAnimationFrame(function () {
        if (requestToken !== switchToken) return;
        activateScreen(resolvedId);
        updateScreenState(resolvedId, updateHash);
      });
    });
  }

  document.querySelector(".dashboard-hotspots").addEventListener("click", function (event) {
    var link = event.target.closest("[data-screen-link]");
    if (!link) return;
    event.preventDefault();
    showScreen(link.getAttribute("data-screen-link"), true, false);
  });

  window.addEventListener("hashchange", function () {
    showScreen(getScreenId(), false, false);
  });

  showScreen(getScreenId(), true, true);
})();
