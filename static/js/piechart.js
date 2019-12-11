 // defined the margin and radius (because its Pie chart)
var margin = {top: 10, right: 20, bottom: 20, left: 20},
    width  = 400 - margin.right - margin.left,
	height = 400 - margin.top -margin.bottom,
	radius = width/2 ;
	
 // color range
 
 var color = d3.scaleOrdinal()
    .range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);

  
 // In d3 to create the Pie chart you need arc generator

 // donut chart arc
 var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);	 
	 
	 

 // lable generator
 var labelArc  = d3.arc()
     .outerRadius(radius - 40)
	 .innerRadius(radius - 40);
	 
 // pie generator	 
	 
 var pie = d3.pie() 	
     .sort(null) 
	 .value(function(d) {return d.count;});

 // define the svg donut chart
    var svg = d3.select("#piechart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); 
  
 // import the data 
    d3.csv("data/disaster_count_all.csv", function(error, data) {
    if (error) throw error;	
		
		// parse the data 
		data.forEach (function(d) {
			d.count    = +d.count;
			d.disaster = d.disaster;
		});
	
		 // "g element is a container used to group other SVG elements"
        var g = svg.selectAll(".arc")
           .data(pie(data))
           .enter().append("g")
           .attr("class", "arc");

       // append path 
         g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.disaster); })
          .transition()
          .ease(d3.easeLinear)
          .duration(2000)
          .attrTween("d", tweenDonut);
        
      // append text
	  g.append("text")
       .transition()
       .ease(d3.easeLinear)
       .duration(2000)
       .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
       .attr("dy", ".35em")
       .text(function(d) { return d.data.disaster; });

	});
	
	
	
	// Helper function for animation of pie chart and donut chart
function tweenDonut(b) {
  b.innerRadius = 0;
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  return function(t) { return arc(i(t)); };
}