function renderMain(data) {
  var width;
  var height;
  var margins = { top: 20, right: 20, bottom: 30, left: 50 };

  var svg = d3.select("#main-line");
  width = $("#main-line").width() - margin.left - margin.right;
  height = $("#main-line").height() - margin.top - margin.bottom;
  var g = svg.append("g").attr("transfrom", "translate(" + margin.left + ", " + margin.top")");

  var x = d3.scaleTime()
    .rangeRound([0, width]);

  var y = d3.scaleLinear()
    .rangeRound([height, 0]);

  var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.val); });
}
