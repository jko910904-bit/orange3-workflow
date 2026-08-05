/* Heatmap + navigation + settings subtabs */
(function () {
  function renderHeatmapInto(tableId, rowLabels, opts) {
    opts = opts || {};
    var everyHour = !!opts.everyHour;
    var hours = [];
    for (var h = 0; h < 24; h++) hours.push(h);
    var scale = [
      "#F7F8FC",
      "#F4F1FF",
      "#DDD4FF",
      "#AF9AFF",
      "#8768FF",
      "#6D4AFF",
    ];
    var seedData = [
      [0, 0, 0, 0, 0, 1, 2, 3, 2, 1, 0, 0, 1, 2, 3, 2, 1, 0, 0, 0, 1, 2, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 1, 1, 2, 3, 4, 3, 2, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 2, 2, 1, 1, 2, 3, 4, 4, 3, 2, 2, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 3, 2, 2, 3, 4, 5, 4, 3, 2, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 2, 2, 1, 1, 2, 2, 3, 3, 2, 2, 1, 2, 3, 4, 3, 2, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 2, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 2, 2, 3, 3, 3, 2, 1, 1, 0],
    ];

    var table = document.getElementById(tableId);
    if (!table) return;

    var thead = "<thead><tr><th class='row-label'></th>";
    hours.forEach(function (h) {
      var label = (h < 10 ? "0" : "") + h;
      if (everyHour) {
        thead += "<th>" + label + "</th>";
      } else {
        thead += "<th>" + (h % 2 === 0 ? String(h) : "") + "</th>";
      }
    });
    thead += "</tr></thead>";

    var body = "<tbody>";
    rowLabels.forEach(function (d, r) {
      body += "<tr><td class='row-label'>" + d + "</td>";
      seedData[r].forEach(function (v) {
        body += "<td style='background:" + scale[v] + "'></td>";
      });
      body += "</tr>";
    });
    body += "</tbody>";
    table.innerHTML = thead + body;
  }

  function renderHeatmap() {
    renderHeatmapInto("heatTable", ["월", "화", "수", "목", "금", "토", "일"]);
    renderHeatmapInto(
      "monitorHeatTable",
      ["7/22", "7/23", "7/24", "7/25", "7/26", "7/27", "7/28"],
      { everyHour: true }
    );
  }

  var titles = {
    dashboard: "AI 실습 도구 관리 포털 — 대시보드",
    widgets: "AI 실습 도구 관리 포털 — 위젯 관리",
    settings: "AI 실습 도구 관리 포털 — 서비스 설정",
    monitor: "AI 실습 도구 관리 포털 — 운영 모니터링",
  };

  function showView(view) {
    var dashboard = document.getElementById("view-dashboard");
    var widgets = document.getElementById("view-widgets");
    var settings = document.getElementById("view-settings");
    var monitor = document.getElementById("view-monitor");

    function setPanel(el, on) {
      if (!el) return;
      el.hidden = !on;
      el.classList.toggle("is-active", on);
    }

    setPanel(dashboard, view === "dashboard");
    setPanel(widgets, view === "widgets");
    setPanel(settings, view === "settings");
    setPanel(monitor, view === "monitor");

    document.querySelectorAll(".nav-item[data-view]").forEach(function (link) {
      var active = link.getAttribute("data-view") === view;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    document.title = titles[view] || titles.dashboard;

    /* Keep viewport stable when switching LNB tabs */
    window.scrollTo(0, 0);
    var main = document.getElementById("main");
    if (main) main.scrollTop = 0;
  }

  function bindNav() {
    document.querySelectorAll(".nav-item[data-view]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        showView(link.getAttribute("data-view"));
      });
    });
  }

  function bindCategory() {
    document.querySelectorAll(".cat-row[data-cat]").forEach(function (row) {
      var main = row.querySelector(".cat-row-main");
      if (!main) return;
      main.addEventListener("click", function () {
        document.querySelectorAll(".cat-row").forEach(function (el) {
          el.classList.remove("is-active");
        });
        row.classList.add("is-active");
        var meta = document.getElementById("widget-panel-meta");
        if (meta && row.dataset.exposed && row.dataset.total) {
          meta.textContent = row.dataset.exposed + "/" + row.dataset.total + " 노출";
        }
      });
    });
  }

  function bindCategoryChecks() {
    var root = document.querySelector('.cat-checkbox[data-cat-check="all"]');
    var children = Array.prototype.slice.call(
      document.querySelectorAll(".cat-children .cat-checkbox")
    );
    if (!root || !children.length) return;

    function syncRoot() {
      var checked = children.filter(function (cb) {
        return cb.checked;
      }).length;
      root.checked = checked === children.length;
      root.indeterminate = checked > 0 && checked < children.length;
    }

    root.addEventListener("change", function () {
      children.forEach(function (cb) {
        cb.checked = root.checked;
      });
      root.indeterminate = false;
    });

    children.forEach(function (cb) {
      cb.addEventListener("change", syncRoot);
    });
    syncRoot();
  }

  function bindSettingsTabs() {
    var tabs = document.querySelectorAll(".subtab[data-subtab]");
    var panels = {
      lang: document.getElementById("subtab-lang"),
      loading: document.getElementById("subtab-loading"),
      logo: document.getElementById("subtab-logo"),
    };
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var id = tab.getAttribute("data-subtab");
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle("is-active", on);
          t.setAttribute("aria-selected", on ? "true" : "false");
        });
        Object.keys(panels).forEach(function (key) {
          if (panels[key]) panels[key].hidden = key !== id;
        });
      });
    });
  }

  function bindLogoPreview() {
    var expose = document.getElementById("logo-expose");
    var brand = document.querySelector(".logo-apply-brand .logo-mark");
    if (!expose || !brand) return;
    function sync() {
      brand.style.visibility = expose.checked ? "visible" : "hidden";
    }
    expose.addEventListener("change", sync);
    sync();
  }

  function bindCheckAll() {
    var all = document.getElementById("check-all");
    if (!all) return;
    all.addEventListener("change", function () {
      document.querySelectorAll("#widget-tbody input[type='checkbox']").forEach(function (cb) {
        cb.checked = all.checked;
      });
    });
  }

  function bindWelcomeLang() {
    var buttons = document.querySelectorAll(".lang-seg-btn[data-welcome-lang]");
    var textarea = document.getElementById("welcome-msg");
    var count = document.getElementById("welcome-count");
    var messages = {
      ko: "실습 준비가 완료되었습니다. 지금 바로 시작해 보세요.",
      en: "Your practice session is ready. Start now.",
      sl: "Vadba je pripravljena. Začnite zdaj.",
    };

    function updateCount() {
      if (textarea && count) count.textContent = String(textarea.value.length);
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        var lang = btn.getAttribute("data-welcome-lang");
        if (textarea && messages[lang]) textarea.value = messages[lang];
        updateCount();
      });
    });

    if (textarea) {
      textarea.addEventListener("input", updateCount);
      updateCount();
    }
  }

  function bindMonitorTabs() {
    var tabs = document.querySelectorAll(".subtab[data-monitor-tab]");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var id = tab.getAttribute("data-monitor-tab");
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle("is-active", on);
          t.setAttribute("aria-selected", on ? "true" : "false");
        });
        var session = document.getElementById("monitor-session");
        var widget = document.getElementById("monitor-widget");
        var workflow = document.getElementById("monitor-workflow");
        if (session) session.hidden = id !== "session";
        if (widget) widget.hidden = id !== "widget";
        if (workflow) workflow.hidden = id !== "workflow";
      });
    });

    document.querySelectorAll(".chip-group .chip-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.parentElement.querySelectorAll(".chip-btn").forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
      });
    });
  }

  function renderHourBars() {
    var root = document.getElementById("hourBars");
    var labels = document.getElementById("hourLabels");
    if (!root) return;
    var heights = [
      12, 8, 6, 5, 7, 14, 28, 45, 62, 78, 85, 90, 95, 88, 80, 72, 65, 58, 48,
      40, 32, 25, 18, 14,
    ];
    var barsHtml = "";
    var labelsHtml = "";
    for (var h = 0; h < 24; h++) {
      var label = (h < 10 ? "0" : "") + h;
      barsHtml +=
        '<div class="hour-col">' +
        '<div class="hour-bar" style="height:' +
        heights[h] +
        '%" title="' +
        label +
        '시"></div></div>';
      labelsHtml += "<span>" + label + "</span>";
    }
    root.innerHTML = barsHtml;
    if (labels) labels.innerHTML = labelsHtml;
  }

  renderHeatmap();
  renderHourBars();
  bindNav();
  bindCategory();
  bindCategoryChecks();
  bindSettingsTabs();
  bindLogoPreview();
  bindMonitorTabs();
  bindCheckAll();
  bindWelcomeLang();

  var hash = (location.hash || "").replace("#", "");
  if (hash === "widgets" || hash === "settings" || hash === "monitor") showView(hash);
  else showView("dashboard");
})();
