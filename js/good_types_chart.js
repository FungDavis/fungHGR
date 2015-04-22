var width = $(window).width() - 23,
	height = $(window).height() - 20;

if (height<650) {
	height = 650;
};
if (width<1000) {
	width = 1000;
};
	
width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;
	/*width = parseInt(d3.select(d3.select('.chart').node().parentNode).style('width'), 10),
	height = 0.667 * width, #sizes based on parent div and desired aspect ratio*/;

/* function responsivefy(svg) {
	// from http://www.brendansudol.com/posts/responsive-d3/
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("perserveAspectRatio", "xMinYMid")
        .call(resize);

    // to register multiple listeners for same event type, 
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
} */

var x = d3.scale.ordinal()
	.rangeRoundBands([11, width], .1);

var y = d3.scale.linear()
	.rangeRound([height, 0]);

var color = d3.scale.ordinal()
	.range(["#CB39A3","#53B327","#DD4C21","#509DAA","#3D3C15","#7281E4","#3F2D5E","#BE6B6A","#C6892B","#6BA365","#959F31","#612524","#A762DC","#A288C1","#2C3C4A","#D4404B","#396A51","#A39359","#E23B81","#5C9AD0","#E049DD","#903D1E","#99999B","#6D6457","#456D25","#8E3E8B","#76345B","#D37851","#405B8F","#C07C99","#402031","#584FA4","#DA76C4","#58A78B","#745C23","#B79177","#4BA445","#B7446D","#636A83","#222F21"]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.tickFormat(d3.format(".2s"));

var svg = d3.select('.chart')
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	//.call(responsivefy)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var prov_en = {
	"Архангельское Наместничество":"Arkhangelsk Viceroyalty",
	"Владимерское Наместничество":"Vladimir Viceroyalty",
	"Вологодское Наместничество":"Vologda Viceroyalty",
	"Воронежское Наместничество":"Voronezh Viceroyalty",
	"Выборгское Наместничество":"Vyborg Viceroyalty",
	"Вятское Наместничество":"Vyatsk Viceroyalty",
	"Екатеринославское Наместничество":"Yekaterinoslav Viceroyalty",
	"Иркутское Наместничество":"Irkutsk Viceroyalty",
	"Кавказское Наместничество":"Caucasus Viceroyalty",
	"Казанское Наместничество":"Kazan Viceroyalty",
	"Калужское Наместничество":"Kaluga Viceroyalty",
	"Киевское Наместничество":"Kiev Viceroyalty",
	"Костромское Наместничество":"Kostroma Viceroyalty",
	"Курское Наместничество":"Kursk Viceroyalty",
	"Могилевское Наместничество":"Mogilev Viceroyalty",
	"Московская Губерния":"Moscow Governorate",
	"Нижегородское Наместничество":"Nizhny Novgorod Viceroyalty",
	"Новогород - Северское Наместничество":"Novgorod - Severskoi Viceroyalty",
	"Новогородское Наместничество":"Novgorod Viceroyalty",
	"Олонецкое Наместничество":"Olonets Viceroyalty",
	"Орловское Наместничество":"Orlov Viceroyalty",
	"Пензенское Наместничество":"Penza Viceroyalty",
	"Пермское Наместничество":"Perm Viceroyalty",
	"Полотское Наместничество":"Polotsk Viceroyalty",
	"Псковское Наместничество":"Pskov Viceroyalty",
	"Рижское Наместничество":"Riga Viceroyalty",
	"Рязанское Наместничество":"Ryazan Viceroyalty",
	"Саратовское Наместничество":"Saratov Viceroyalty",
	"Синбирское Наместничество":"Sinbirsk Viceroyalty",
	"Смоленское Наместничество":"Smolensk Viceroyalty",
	"Ст Петербургская Губерния":"St. Petersburg Governorate",
	"Тамбовское Наместничество":"Tambov Viceroyalty",
	"Тверское Наместничество":"Tver Viceroyalty",
	"Тобольское Наместничество":"Tobol Viceroyalty",
	"Тульское Наместничество":"Tula Viceroyalty",
	"Уфимское Наместничество":"Ufa Viceroyalty",
	"Харьковское Наместничество":"Kharkiv Viceroyalty",
	"Черниговское Наместничество":"Chernihiv Viceroyalty",
	"Ярославское Наместничество":"Yaroslav Viceroyalty"
}

var desc_container = svg.append("g").append("text")
desc_container.append("tspan")
	.attr("x",width/6)
	.attr("y",0)
	.attr("font-size","16px")
	.text(title)
for (var i = desc.length - 1; i >= 0; i--) {
	desc_container.append("tspan")
		.attr("x",width/6)
		.attr("y",(i-1) * 1.2 + 2.5 + "em")
		.attr("width",width/2)
		.text(desc[i]);
	};

d3.csv(filename, function(error, data) {
	categories = d3.keys(data[0]).filter(function(key) { return key !== "Good"; });
	color.domain(categories);

	var xAxisClasses = {};
	for (var i = data.length - 1; i >= 0; i--) {
		xAxisClasses[data[i]['Good']] = []
		for (var key in data[i]) {
			if (data[i].hasOwnProperty(key) && data[i][key] != 0 && key != 'Good') {
				xAxisClasses[data[i]['Good']].push(key.replace(/\s/g,"_"))
			}
		}
	};

	data.forEach(function(d) {
		var y0 = 0;
		d.provinces = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
		d.total = d.provinces[d.provinces.length - 1].y1;
	});

	data.sort(function(a, b) { return b.total - a.total; });

	x.domain(data.map(function(d) { return d.Good; }));
	y.domain([0, d3.max(data, function(d) { return d.total; })]);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Number of towns trading good");

	var data_area = svg.append("g")
		.attr("class", "data")

	data_area.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll("text")
			.style("text-anchor","start")
			.attr("dx",".5em")
			.attr("dy","-.1em")
			.attr("transform","rotate(30)")
			.attr("class",function(d) { return " xLabel " + xAxisClasses[d].join(" "); })
			.on("mouseover", function(d) {
				console.log(xAxisClasses[d])
				for (var i = xAxisClasses[d].length - 1; i >= 0; i--) {
					console.log(xAxisClasses[d][i])
					d3.selectAll("." + xAxisClasses[d][i].replace(/\s/g,"_")).classed("highlight",true)
				}
			})
			.on("mouseout", function(d) {
				console.log(xAxisClasses[d])
				for (var i = xAxisClasses[d].length - 1; i >= 0; i--) {
					console.log(xAxisClasses[d][i])
					d3.selectAll("." + xAxisClasses[d][i].replace(/\s/g,"_")).classed("highlight",false)
				}
			});

	var bars = data_area.selectAll(".bars")
		.data(data)
		.enter().append("g")
			.attr("class", "g")
			.attr("transform", function(d) { return "translate(" + x(d.Good) + ",0)"; });

	bars.selectAll("rect")
		.data(function(d) { return d.provinces; })
		.enter().append("rect")
			.attr("width", x.rangeBand())
			.attr("y", function(d) { return y(d.y1); })
			.attr("height", function(d) { return y(d.y0) - y(d.y1); })
			.attr("class", function(d) { return "bar " + d.name.replace(/\s/g,"_"); })
			.style("fill", function(d) { return color(d.name); })
			.on("mouseover", function(d) {
				d3.selectAll("." + d.name.replace(/\s/g,"_")).classed("highlight",true);
				/*d3.selectAll("." + d.name.replace(/\s/g,"_")).style("opacity","1");*/
				})
			.on("mouseout", function(d) {
				d3.selectAll("." + d.name.replace(/\s/g,"_")).classed("highlight",false);
				/*d3.selectAll("." + d.name.replace(/\s/g,"_")).style("opacity",".5");*/
			})
			/*.append("svg:title")
			.text(function(d) { if (d.name!="None") { return d.name + " (" + prov_en[d.name] + ")"; } else{ return d.name; }; })*/;

	var legend = data_area.selectAll(".legend")
		.data(color.domain().slice().reverse())
		.enter().append("g")
			.attr("class", function(d) { return "legend " + d.replace(/\s/g,"_"); })
			.attr("transform", function(d, i) { return "translate(0," + i * 12 + ")"; })
			.on("mouseover", function(d) {
				d3.selectAll("." + d.replace(/\s/g,"_")).classed("highlight",true);
			})
			.on("mouseout", function(d) {
				d3.selectAll("." + d.replace(/\s/g,"_")).classed("highlight",false);
			});

	legend.append("rect")
		.attr("x", width - 10)
		.attr("width", 10)
		.attr("height", 10)
		.style("fill", color);

	legend.append("text")
		.attr("x", width - 16)
		.attr("y", 9)
		.attr("dy", "0em")
		.style("text-anchor", "end")
		.text(function(d) { if (d!="None") { return d + " (" + prov_en[d] + ")"; } else{ return d; };  });

	});