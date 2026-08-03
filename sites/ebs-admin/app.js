/* Heatmap — same IA/data as ebs-admin-dashboard.html */
(function () {
  var days = ["월", "화", "수", "목", "금", "토", "일"];
  var hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  /* Kit primary scale (not source purple) */
  var scale = [
    "var(--heat-0)",
    "var(--heat-1)",
    "var(--heat-2)",
    "var(--heat-3)",
    "var(--heat-4)",
    "var(--heat-5)",
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
    if (h % 2 === 0) {
      thead += "<th colspan='2'>" + h + "</th>";
    }
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
})();
