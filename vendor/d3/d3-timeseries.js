!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("d3")) : "function" == typeof define && define.amd ? define(["d3"], e) : t.d3_timeseries = e(t.d3)
}(this, function(t) {
    "use strict";
    function e(t) {
        return "function" == typeof t ? t : function(e) {
            return e[t]
        }
    }
    function a(t, e) {
        var a = "function" == typeof t ? t : function(e) {
            return e[t]
        }
        ;
        return function(t) {
            return e(a(t))
        }
    }
    function n(t) {
        return function(e) {
            return e.hasOwnProperty(t) && null !== e[t] && !isNaN(e[t])
        }
    }
    function r(t) {
        return function(e) {
            return e[t]
        }
    }
    var i = ["#a6cee3", "#ff7f00", "#b2df8a", "#1f78b4", "#fdbf6f", "#33a02c", "#cab2d6", "#6a3d9a", "#fb9a99", "#e31a1c", "#ffff99", "#b15928"];
    return function() {
        function o(e) {
            var i = e.aes;
            e.options.interpolate ? e.options.interpolate = "monotone" == e.options.interpolate ? "monotoneX" : "step-after" == e.options.interpolate ? "stepAfter" : "step-before" == e.options.interpolate ? "stepBefore" : e.options.interpolate : e.options.interpolate = "linear";
            var o = "curve" + e.options.interpolate[0].toUpperCase() + e.options.interpolate.slice(1);
            e.interpolationFunction = t[o] || t.curveLinear;
            var s = t.line().x(a(i.x, v)).y(a(i.y, g)).curve(e.interpolationFunction).defined(n(i.y));
            if (e.line = s,
            e.options.label = e.options.label || e.options.name || e.aes.label || e.aes.y,
            i.ci_up && i.ci_down) {
                var l = t.area().x(a(i.x, v)).y0(a(i.ci_down, g)).y1(a(i.ci_up, g)).curve(e.interpolationFunction);
                e.ciArea = l
            }
            i.diff && (e.diffAreas = [t.area().x(a(i.x, v)).y0(a(i.y, g)).y1(function(t) {
                return g(t[i.y] > t[i.diff] ? t[i.diff] : t[i.y])
            }).curve(e.interpolationFunction), t.area().x(a(i.x, v)).y1(a(i.y, g)).y0(function(t) {
                return g(t[i.y] < t[i.diff] ? t[i.diff] : t[i.y])
            }).curve(e.interpolationFunction)]),
            e.find = function(a) {
                var n = (0,
                t.bisector(r(i.x)).left)(e.data, a) - 1;
                return -1 == n ? null : n == e.data.length - 1 && e.data.length > 1 && Number(a) - Number(e.data[n][i.x]) > Number(e.data[n][i.x]) - Number(e.data[n - 1][i.x]) ? null : e.data[n]
            }
        }
        function s(t) {
            if (t.linepath)
                t.linepath.attr("d", t.line),
                t.ciArea && t.cipath.attr("d", t.ciArea),
                t.diffAreas && (t.diffpaths[0].attr("d", t.diffAreas[0]),
                t.diffpaths[1].attr("d", t.diffAreas[1]));
            else {
                var e = _.append("path").datum(t.data).attr("class", "d3_timeseries line").attr("d", t.line).attr("stroke", t.options.color).attr("stroke-linecap", "round").attr("stroke-width", t.options.width || 1.5).attr("fill", "none");
                t.options.dashed && (1 == t.options.dashed || "dashed" == t.options.dashed ? t["stroke-dasharray"] = "5,5" : "long" == t.options.dashed ? t["stroke-dasharray"] = "10,10" : "dot" == t.options.dashed ? t["stroke-dasharray"] = "2,4" : t["stroke-dasharray"] = t.options.dashed,
                e.attr("stroke-dasharray", t["stroke-dasharray"])),
                t.linepath = e,
                t.ciArea && (t.cipath = _.insert("path", ":first-child").datum(t.data).attr("class", "d3_timeseries ci-area").attr("d", t.ciArea).attr("stroke", "none").attr("fill", t.options.color).attr("opacity", t.options.ci_opacity || .3)),
                t.diffAreas && (t.diffpaths = t.diffAreas.map(function(a, n) {
                    var r = (t.options.diff_colors ? t.options.diff_colors : ["red", "black"])[n];
                    return _.insert("path", function() {
                        return e.node()
                    }).datum(t.data).attr("class", "d3_timeseries diff-area").attr("d", a).attr("stroke", "none").attr("fill", r).attr("opacity", t.options.diff_opacity || .5)
                }))
            }
        }
        function l(t) {
            var e = w.selectAll("circle.d3_timeseries.focusring");
            (e = null == t ? e.data([]) : e.data(x.map(function(e) {
                return {
                    x: t,
                    item: e.find(t),
                    aes: e.aes,
                    color: e.options.color
                }
            }).filter(function(t) {
                return void 0 !== t.item && null !== t.item && null !== t.item[t.aes.y] && !isNaN(t.item[t.aes.y])
            }))).transition().duration(50).attr("cx", function(t) {
                return v(t.item[t.aes.x])
            }).attr("cy", function(t) {
                return g(t.item[t.aes.y])
            }),
            e.enter().append("circle").attr("class", "d3_timeseries focusring").attr("fill", "none").attr("stroke-width", 2).attr("r", 5).attr("stroke", r("color")),
            e.exit().remove()
        }
        function d(t) {
            if (null == t)
                E.style("opacity", 0);
            else {
                var e = x.map(function(e) {
                    return {
                        item: e.find(t),
                        aes: e.aes,
                        options: e.options
                    }
                });
                E.style("opacity", .9).style("left", y.left + 5 + v(t) + "px").style("top", "0px").html(M(t, e))
            }
        }
        function f() {
            var e = t.mouse(k.node())[0];
            e = v.invert(e),
            F.datum({
                x: e,
                visible: !0
            }),
            F.update(),
            l(e),
            d(e)
        }
        function c() {
            F.datum({
                x: null,
                visible: !1
            }),
            F.update(),
            l(null),
            d(null)
        }
        var p = 480
          , u = 600
          , m = 80
          , h = 10
          , y = {
            top: 10,
            bottom: 20,
            left: 30,
            right: 10
        }
          , x = []
          , g = t.scaleLinear()
          , v = t.scaleTime();
        g.label = "",
        v.label = "";
        var b, k, _, w, A, F, N, E, L = t.brushX();
        g.setformat = function(t) {
            return t.toLocaleString()
        }
        ,
        v.setformat = v.tickFormat();
        var M = function(e, a) {
            var n = '<table style="border:none">' + a.filter(function(t) {
                return void 0 !== t.item && null !== t.item
            }).map(function(t) {
                return '<tr><td style="color:' + t.options.color + '">' + t.options.label + ' </td><td style="color:#333333;text-align:right">' + g.setformat(t.item[t.aes.y]) + "</td></tr>"
            }).join("") + "</table>";
            return "<h4>" + v.setformat(t.timeDay(e)) + "</h4>" + n
        }
          , P = function(i) {
            x = x.map(function(a) {
                var n = t.extent(a.data.map(e(a.aes.y)));
                return a.min = n[0],
                a.max = n[1],
                n = t.extent(a.data.map(e(a.aes.x))),
                a.dateMin = n[0],
                a.dateMax = n[1],
                a
            }),
            g.range([p - y.top - y.bottom - m - h, 0]).domain([t.min(x.map(r("min"))), t.max(x.map(r("max")))]).nice(),
            v.range([0, u - y.left - y.right]).domain([t.min(x.map(r("dateMin"))), t.max(x.map(r("dateMax")))]).nice(),
            g.fixedomain && (1 == g.fixedomain.length && g.fixedomain.push(g.domain()[1]),
            g.domain(g.fixedomain)),
            v.fixedomain && v.domain(g.fixedomain),
            N = v.copy(),
            (b = t.select(i).append("svg").attr("width", u).attr("height", p)).append("defs").append("clipPath").attr("id", "clip").append("rect").attr("width", u - y.left - y.right).attr("height", p - y.bottom - m - h).attr("y", -y.top),
            k = b.insert("g", "rect.mouse-catch").attr("transform", "translate(" + y.left + "," + y.top + ")").attr("clip-path", "url(#clip)"),
            _ = k.append("g"),
            w = k.append("g"),
            A = b.append("g").attr("transform", "translate(" + y.left + "," + (p - m - y.bottom) + ")"),
            (F = b.append("g").datum({
                x: new Date,
                visible: !1
            })).append("line").attr("x1", 0).attr("x2", 0).attr("y1", g.range()[0]).attr("y2", g.range()[1]).attr("class", "d3_timeseries mousevline"),
            F.update = function() {
                this.attr("transform", function(t) {
                    return "translate(" + (y.left + v(t.x)) + "," + y.top + ")"
                }).style("opacity", function(t) {
                    return t.visible ? 1 : 0
                })
            }
            ,
            F.update();
            var d = t.axisBottom().scale(v).tickFormat(v.setformat)
              , M = t.axisLeft().scale(g).tickFormat(g.setformat);
            L.extent([[N.range()[0], 0], [N.range()[1], m - h]]).on("brush", function() {
                var e = t.event.selection;
                v.domain(e.map(N.invert, N)),
                x.forEach(s),
                b.select(".focus.x.axis").call(d),
                F.update(),
                l()
            }).on("end", function() {
                null === t.event.selection && (v.domain(N.domain()),
                x.forEach(s),
                b.select(".focus.x.axis").call(d),
                F.update(),
                l())
            }),
            b.append("g").attr("class", "d3_timeseries focus x axis").attr("transform", "translate(" + y.left + "," + (p - y.bottom - m - h) + ")").call(d),
            A.append("g").attr("class", "d3_timeseries x axis").attr("transform", "translate(0," + m + ")").call(d),
            A.append("g").attr("class", "d3_timeseries brush").call(L).attr("transform", "translate(0, " + h + ")").attr("height", m - h),
            b.append("g").attr("class", "d3_timeseries y axis").attr("transform", "translate(" + y.left + "," + y.top + ")").call(M).append("text").attr("transform", "rotate(-90)").attr("x", -y.top - t.mean(g.range())).attr("dy", ".71em").attr("y", 5 - y.left).style("text-anchor", "middle").text(g.label),
            b.append("rect").attr("width", u).attr("class", "d3_timeseries mouse-catch").attr("height", p - m).style("opacity", 0).on("mousemove", f).on("mouseout", c),
            E = t.select(i).style("position", "relative").append("div").attr("class", "d3_timeseries tooltip").style("opacity", 0),
            x.forEach(o),
            x.forEach(s),
            function() {
                var e = g.copy().range([m - h, 0])
                  , r = x[0]
                  , i = t.line().x(a(r.aes.x, N)).y(a(r.aes.y, e)).curve(r.interpolationFunction).defined(n(r.aes.y))
                  , o = A.insert("path", ":first-child").datum(r.data).attr("class", "d3_timeseries.line").attr("transform", "translate(0," + h + ")").attr("d", i).attr("stroke", r.options.color).attr("stroke-width", r.options.width || 1.5).attr("fill", "none");
                r.hasOwnProperty("stroke-dasharray") && o.attr("stroke-dasharray", r["stroke-dasharray"])
            }()
        };
        P.width = function(t) {
            return arguments.length ? (u = t,
            P) : u
        }
        ,
        P.height = function(t) {
            return arguments.length ? (p = t,
            P) : p
        }
        ,
        P.margin = function(t) {
            return arguments.length ? (y = t,
            P) : y
        }
        ,
        t.keys(y).forEach(function(t) {
            P.margin[t] = function(e) {
                return arguments.length ? (y[t] = e,
                P) : y[t]
            }
        });
        var j = function(t) {
            return {
                tickFormat: function(e) {
                    return arguments.length ? (t.setformat = e,
                    P) : t.setformat
                },
                label: function(e) {
                    return arguments.length ? (t.label = e,
                    P) : t.label
                },
                domain: function(e) {
                    return !arguments.length && t.fixedomain ? t.fixedomain : arguments.length ? (t.fixedomain = e,
                    P) : null
                }
            }
        };
        return P.yscale = j(g),
        P.xscale = j(v),
        P.addSerie = function(t, e, a) {
            return !t && x.length > 0 && (t = x[0].data),
            a.color || (a.color = i[x.length % i.length]),
            x.push({
                data: t,
                aes: e,
                options: a
            }),
            P
        }
        ,
        P
    }
});
