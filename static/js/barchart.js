// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 90, left: 40},
    width = 350 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg2 = d3.select("#barchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// load the data
  d3.csv("data/avg_sales_price_top_st.csv", function(error,data) {
      if (error) throw error;
      data.forEach(function(d) {
      d.price = +d.price;
	  d.state = d.state;
       });
     
    // console.log(csv) 
	
	  // set the domains of the axes

  
// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.state; }))
  .padding(0.2);
svg2.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 350000])
  .range([ height, 0]);
svg2.append("g")
  .call(d3.axisLeft(y))
  .attr("transform", "translate(5,0)");

// Bars
svg2.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("class", "bar")
	  .attr("height",0)
	  .attr("y", height)
	  .transition().duration(2000)
	  .delay(function(d,i) {return i * 100;})
      .attr("x", function(d) { return x(d.state); })
      .attr("y", function(d) { return y(d.price); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.price); });	  

});