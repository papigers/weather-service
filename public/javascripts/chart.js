function drawChart(apiData) {
  var data = Object.keys(apiData.weatherHour).map(function (key) {
    return {
      date: +key,
      value: +apiData.weatherHour[key]
    };
  });

  var card = document.getElementsByClassName("card")[0];
  document.getElementById("chart-svg").innerHTML = "";

  var wwidth = card.offsetWidth;
  var wheight = window.innerHeight;

  var margin = {
      top: 20,
      right: 20,
      bottom: 60,
      left: 50
    },
    width = wwidth * .81 - margin.left - margin.right,
    height = wheight * .7 - margin.top - margin.bottom;

  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  var times = ["0a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p"];

  var xAxis = d3.axisBottom(x)
    .ticks(24)
    .tickFormat(function(time) {
      return (time < 10 ? "0"+time : time) + ":00";
    });
  //      .tickFormat(d3.time.format("%Y"))
  //      .ticks(d3.time.years, 5);;

  var yAxis = d3.axisLeft(y)
    .tickFormat(function(temp) {
      return temp+"\xB0C";
    });

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

  x.domain([-.5, 23.5]);

  y.domain([d3.min(data, function (d) {
    return d.value;
  }) - 5, d3.max(data, function (d) {
    return d.value;
  }) + 2]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "start")
    .attr("transform", "rotate(45)")
    .attr("dx", ".5em")
    .attr("dy", ".6em");

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");

  svg.selectAll("bar")
    .data(data)
    .enter().append("rect")
    .attr("x", function (d) {
      return x(d.date -.42);
    })
    .attr("width", (width / 24) *.9)
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
      tooltip.html("<b>"+d.value+"\xB0C</b>")
        .style("left", (d3.event.pageX) + 5 + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function (d) {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });
}
