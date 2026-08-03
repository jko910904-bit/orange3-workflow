/* Heatmap + navigation + settings subtabs */
(function () {
  function renderHeatmap() {
    var days = ["월", "화", "수", "목", "금", "토", "일"];
    var hours = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ];
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

    var table = document.getElementById("heatTable");
    if (!table) return;

    var thead = "<tr><th class='row-label'></th>";
    hours.forEach(function (h) {
      if (h % 2 === 0) thead += "<th colspan='2'>" + h + "</th>";
    });
    thead += "</tr>";

    var body = "";
    days.forEach(function (d, r) {
      body += "<tr><td class='row-label'>" + d + "</td>";
      seedData[r].forEach(function (v) {
        body += "<td style='background:" + scale[v] + "'></td>";
      });
      body += "</tr>";
    });
    table.innerHTML = thead + body;
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
    var placeholder = document.getElementById("view-placeholder");

    function setPanel(el, on) {
      if (!el) return;
      el.hidden = !on;
      el.classList.toggle("is-active", on);
    }

    setPanel(dashboard, view === "dashboard");
    setPanel(widgets, view === "widgets");
    setPanel(settings, view === "settings");
    setPanel(placeholder, view === "monitor");

    if (view === "monitor") {
      var t = document.getElementById("placeholder-title");
      if (t) t.textContent = "운영 모니터링";
    }

    document.querySelectorAll(".nav-item[data-view]").forEach(function (link) {
      var active = link.getAttribute("data-view") === view;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    document.title = titles[view] || titles.dashboard;
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
    document.querySelectorAll(".cat-row[data-cat]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".cat-row").forEach(function (el) {
          el.classList.remove("is-active");
        });
        btn.classList.add("is-active");
        var meta = document.getElementById("widget-panel-meta");
        if (meta && btn.dataset.exposed && btn.dataset.total) {
          meta.textContent = btn.dataset.exposed + "/" + btn.dataset.total + " 노출";
        }
      });
    });
  }

  function bindSettingsTabs() {
    var tabs = document.querySelectorAll(".subtab[data-subtab]");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var id = tab.getAttribute("data-subtab");
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle("is-active", on);
          t.setAttribute("aria-selected", on ? "true" : "false");
        });
        var lang = document.getElementById("subtab-lang");
        var loading = document.getElementById("subtab-loading");
        if (lang) lang.hidden = id !== "lang";
        if (loading) loading.hidden = id !== "loading";
      });
    });
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

  renderHeatmap();
  bindNav();
  bindCategory();
  bindSettingsTabs();
  bindCheckAll();
  bindWelcomeLang();

  var hash = (location.hash || "").replace("#", "");
  if (hash === "widgets" || hash === "settings" || hash === "monitor") showView(hash);
  else showView("dashboard");
})();
