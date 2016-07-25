function drawChart() {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  $.getJSON('http://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function (res) {
    var format = d3.timeParse("%Y-%m-%d");
    var data = res.data.map(function (val) {
      return {
        date: format(val[0]),
        value: val[1]
      };
    });

    var card = document.getElementsByClassName("card")[0];
    
    var wwidth = card.offsetWidth;
    var wheight = window.innerHeight;

    var margin = {
        top: 20,
        right: 20,
        bottom: 40,
        left: 50
      },
      width = wwidth * .81 - margin.left - margin.right,
      height = wheight * .7 - margin.top - margin.bottom;

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var xAxis = d3.axisBottom(x);
//      .tickFormat(d3.time.format("%Y"))
//      .ticks(d3.time.years, 5);;

    var yAxis = d3.axisLeft(y);
//      .ticks(10);

    var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    var svg = d3.select(".chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("class", "chart")
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")
      .attr("width", "80%");

    x.domain([d3.min(data, function (d) {
        return d.date;
      }),
             d3.max(data, function (d) {
        return d.date;
      })]);
    y.domain([0, d3.max(data, function (d) {
      return d.value;
    })]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "1em");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("GDP, USA");

    svg.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .attr("x", function (d) {
        return x(d.date);
      })
      .attr("width", Math.ceil(width / data.length))
      .attr("y", function (d) {
        return y(d.value);
      })
      .attr("height", function (d) {
        return height - y(d.value) - 1;
      })
      .on("mouseover", function (d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html("<b>" + (d.value).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
          }) + " Billion</b><br/>" + months[d.date.getMonth()] + " " + d.date.getFullYear())
          .style("left", (d3.event.pageX) + 5 + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });;

  });
}
