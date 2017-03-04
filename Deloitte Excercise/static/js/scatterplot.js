/*

	scatterplot.js - contains code for drawing scatter plot over
	browser screen. It primarily uses d3.js and html svg elements
	to draw the chart.

 */

function drawScatterPlot(data, cols) {
	var width = 1300,
		height = 510,
		yScale = undefined,
		g = undefined,
		circle = undefined,
		yTextScale = undefined,
		line = undefined,
		color = ['red', 'green', 'yellow', 'teal'];

	var xScaleDomianValues = new Array();
	var svg = d3.select('div.exercise')
		.append('svg')
		.attr('viewBox', '0 0 ' + (width - 50) + ' ' + height)
		.attr('preserveaspectratio', 'xMidYMid meet');

	var outerG = svg.append('g').attr('transform', 'translate(20, 80)');

	d3.map(data, function(d) {
		xScaleDomianValues.push(d['Brand Name']);
	});

	var xScale = d3.scale.ordinal()
		.domain(xScaleDomianValues)
		.rangeRoundPoints([20, width - 100], .15);

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.html(function(d) {
			return 'Brand Name : ' + d['brand'];
		})

	svg.call(tip);

	for (var i = 0; i < cols.length; i++) {

		g = outerG.append('g').attr('transform', 'translate(0, 0)');

		line = d3.svg.line()
			.x(function(d) {
				return xScale(d['Brand Name']);
			})
			.y(function(d) {
				return yScale(d[cols[i]]);
			});

		yTextScale = d3.scale.linear()
			.domain([0, d3.max(data, function(d) {
				return d[cols[i]];
			})])
			.range([height - 100, 50]);

		yScale = d3.scale.linear()
			.domain([0, d3.max(data, function(d) {
				return d[cols[i]];
			})])
			.range([height - i * 100, 50]);

		circle = g.selectAll('circle')
			.data(data)
			.enter()
			.append('circle')
			.attr('cx', function(d) {
				return xScale(d['Brand Name']);
			})
			.attr('cy', 0)
			.attr('r', 0)
			.attr("data-legend", function(d) {
				return cols[i]
			})
			.style('fill', color[i])
			.on('mouseover', function(d) {
				tip.show({
					'brand': d['Brand Name']
				})
			})
			.on('mouseout', tip.hide);

		lines = g.append('path')
			.datum(data)
			.attr('class', 'line')
			.attr('d', line);

		circle.transition()
			.duration(1000)
			.attr('cy', function(d) {
				return yScale(d[cols[i]]);
			})
			.attr('r', function(d) {
				var v = yScale(d[cols[i]]);
				if (v > 80)
					return v / (height - 350) + 5;
				return v / 7 + 5;
			})
	}

	var legend = svg.append("g")
		.attr("class", "legend")
		.attr("transform", "translate(1000,60)")
		.style("font-size", "12px")
		.call(d3.legend)

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient('bottom')

	var yAxis = d3.svg.axis()
		.scale(yTextScale)
		.orient('left');

	outerG.append('g')
		.call(xAxis)
		.attr('class', 'axis')
		.attr('transform', 'translate(0, 380)');

	svg.append('text')
		.text('Brand Ratings')
		.attr('transform', 'translate(0, 80)');

	outerG.append('g')
		.call(yAxis)
		.attr('class', 'axis')
		.attr('transform', 'translate(0, -30)');

	svg.append('text')
		.text('Brand Names')
		.attr('transform', 'translate(1150, 500)')

}