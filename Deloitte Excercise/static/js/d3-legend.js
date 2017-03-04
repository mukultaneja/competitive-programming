
/*
	d3-legend.js - It is a plugin to draw legends around the chart.
	It is a self driven plugin and has been created over d3.js.
 */

(function() {
	d3.legend = function(ig) {
		ig.each(function() {
			var g = d3.select(this),
				items = {},
				svg = d3.select(g.property("nearestViewportElement")),
				legendPadding = g.attr("data-style-padding") || 15,
				lb = g.selectAll(".legend-box").data([true]),
				li = g.selectAll(".legend-items").data([true])

			lb.enter().append("rect").classed("legend-box", true)
			li.enter().append("g").classed("legend-items", true)

			svg.selectAll("[data-legend]").each(function() {
				var self = d3.select(this)
				items[self.attr("data-legend")] = {
					pos: self.attr("data-legend-pos") || this.getBBox().y,
					color: self.attr("data-legend-color") != undefined ? self.attr("data-legend-color") : self.style("fill") != 'none' ? self.style("fill") : self.style("stroke")
				}
			})

			items = d3.entries(items).sort(function(a, b) {
				return a.value.pos - b.value.pos
			})


			li.selectAll("text")
				.data(items, function(d) {
					return d.key
				})
				.call(function(d) {
					d.enter().append("text")
				})
				.call(function(d) {
					d.exit().remove()
				})
				.attr("y", function(d, i) {
					return i + "em"
				})
				.attr("x", "1em")
				.text(function(d) {;
					return d.key
				})

			li.selectAll("circle")
				.data(items, function(d) {
					return d.key
				})
				.call(function(d) {
					d.enter().append("circle")
				})
				.call(function(d) {
					d.exit().remove()
				})
				.attr("cy", function(d, i) {
					return i - 0.25 + "em"
				})
				.attr("cx", 0)
				.attr("r", "0.4em")
				.style("fill", function(d) {
					console.log(d.value.color);
					return d.value.color
				})

			// Reposition and resize the box
			var lbbox = li[0][0].getBBox();
			lb.attr("x", (lbbox.x - legendPadding))
				.attr("y", (lbbox.y - legendPadding))
				.attr("height", (lbbox.height + 2 * legendPadding))
				.attr("width", (lbbox.width + 2 * legendPadding))
		})
		return ig
	}
})()