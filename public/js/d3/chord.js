function renderChord(data, mapping) {
  var svg = d3.select("#chord-diagram"),
    width = $("#chord-diagram").width(),
    height = $("#chord-diagram").height(),
    outerRadius = Math.min(width, height) * 0.5 - 100,
    innerRadius = outerRadius - 30;

  var matrix = data;
  console.log(matrix);

  var chord = d3.chord()
      .padAngle(0.05)
      .sortSubgroups(d3.descending);

  var arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

  var ribbon = d3.ribbon()
      .radius(innerRadius);

  var color = d3.scaleOrdinal()
      .domain(d3.range(data.length))
      .range(d3.schemeCategory20);

  var g = svg.append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .datum(chord(matrix));

  var group = g.append("g")
      .attr("class", "groups")
    .selectAll("g")
    .data(function(chords) { return chords.groups; })
    .enter().append("g");

  group.append("path")
      .style("fill", function(d) { return color(d.index); })
      .style("stroke", function(d) { return d3.rgb(color(d.index)).darker(); })
      .attr("d", arc);

  var groupTick = group.selectAll(".group-tick")
    .data(function(d) { return groupTicks(d, 1); })
    .enter().append("g")
      .attr("class", "group-tick")
      .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + outerRadius + ",0)"; });

  groupTick.append("line")
      .attr("x2", 6);

  groupTick
    .filter(function(d) { return d.value % 5 === 0; })
    .append("text")
      .attr("x", 8)
      .attr("dy", ".35em")
      .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
      .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
      .text(function(d) { return d.value; });

  g.append("g")
      .attr("class", "ribbons")
    .selectAll("path")
    .data(function(chords) { return chords; })
    .enter().append("path")
      .attr("d", ribbon)
      .style("fill", function(d) { return color(d.target.index); })
      .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); });

  d3.select(".groups").selectAll("g").append("text")
    .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
    .attr("dy", ".35em")
    .attr("transform", function(d) {
      return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
          + "translate(" + (innerRadius + 52) + ")"
          + (d.angle > Math.PI ? "rotate(180)" : "");
    })
    .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
    .text(function(d) { return mapping[d.index] });

  // Returns an array of tick angles and values for a given group and step.
  function groupTicks(d, step) {
    var k = (d.endAngle - d.startAngle) / d.value;
    return d3.range(0, d.value, step).map(function(value) {
      return {value: value, angle: value * k + d.startAngle};
    });
  }
}
