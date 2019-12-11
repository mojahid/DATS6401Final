 
 // set the dimensions and margins of the graph
    
     var svg4 = d3.select("#barchart").append("svg"),
        margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = 300 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var x = d3.scaleBand().range([0, width]).padding(0.1);
    var y = d3.scaleLinear().range([height, 0]);	
	
	
var g = svg4.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// create a variable that will hold the loaded data
  var csv;

// load the data
  d3.csv("data/avg_sales_price_st_year.csv", function(error,data) {
   // error check
   if (error) throw error;
   
   // store data into global var
   csv = data; 
   
   
   csv.forEach(function(d) {
   d.price = +d.price;
   });
     
    // console.log(csv)  
	
  // filter the data based on the inital value
    var data = csv.filter(function(d) { 
    var sq = d3.select("#filter").property("value");
    return d.year === sq;
  });

  // set the domains of the axes
  x.domain(data.map(function(d) { return d.state; }));
  y.domain([0, d3.max(data, function(d) { return d.price; })]);

  // add the svg elements
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  // create the bars
  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
	  .attr("height",0)
	  .attr("y", height)
	  .transition().duration(1000)
	  .delay(function(d,i) {return i * 100;})
      .attr("x", function(d) { return x(d.state); })
      .attr("y", function(d) { return y(d.price); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.price); });

  // add a change event handler 
  d3.select("#filter").on("change", function() {
      applyFilter(this.value);
    });


  // call this whenever the filter changes
  function applyFilter(value) {
    
// filter the data
    var data = csv.filter(function(d) {return d.year === value;})
    
    // console.log(data)
	 
    // update the bars
    d3.selectAll(".bar")
      .data(data)
	  .attr("height",0)
	  .attr("y", height)
      .transition().duration(1000)
      .attr("x", function(d) { return x(d.state); })
      .attr("y", function(d) { return y(d.price); })
      .attr("height", function(d) { return height - y(d.price); });

  }

});