angular.module("graphicDisplayMod",[]).component('graphicDisplay', {
  controller: 'graphicDisplayCtrl',
  templateUrl: 'graphicDisplay.html',
  bindings: {
    svgHeight: '<',
    svgWidth: '<'
  }
});

angular.module("graphicDisplayMod").controller('graphicDisplayCtrl', ['$scope', '$timeout',
  function($scope, $timeout) {

  var self = this;

    d3.csv("/public/ILWdm1.csv", function(d) {
      d.result = +d.result;
      return d;
    }, function(error, data) {
      if(error) throw error;

      $timeout( function() {

        //create svg main dimensions
        var svg = d3.select("svg");
        var margin = {top: 20, right: 20, bottom: 20, left: 20};
        var height = +svg.attr("height") - margin.top - margin.bottom;
        var width = +svg.attr("width") - margin.left - margin.right;

        //create bar scales
        //TODO: scale to data size
        var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
        var y = d3.scaleLinear().rangeRound([height, 0]);

        var graph = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        //Sets bounds for x and y?
        x.domain(data.map(function(d) { return d.column; }));
        y.domain([0, d3.max(data, function(d) { return d.result; })]);

        graph.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        graph.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y).ticks(10, "%"))
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Result");

        graph.selectAll(".bar")
          .data(data)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.column); })
          .attr("y", function(d) { return y(d.result); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) {
            return height - y(d.result);
          });
      });
    });

}]);
