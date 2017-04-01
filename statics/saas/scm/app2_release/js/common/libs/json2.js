!
function() {
	function f(a, c) {
		function u(a) {
			if (u[a] !== r) return u[a];
			var b;
			if ("bug-string-char-index" == a) b = "a" != "a" [0];
			else if ("json" == a) b = u("json-stringify") && u("json-parse");
			else {
				var d, f = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
				if ("json-stringify" == a) {
					var h = c.stringify,
						j = "function" == typeof h && s;
					if (j) {
						(d = function() {
							return 1
						}).toJSON = d;
						try {
							j = "0" === h(0) && "0" === h(new e) && '""' == h(new g) && h(o) === r && h(r) === r && h() === r && "1" === h(d) && "[1]" == h([d]) && "[null]" == h([r]) && "null" == h(null) && "[null,null,null]" == h([r, o, null]) && h({
								a: [d, !0, !1, null, "\0\b\n\f\r	"]
							}) == f && "1" === h(null, d) && "[\n 1,\n 2\n]" == h([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == h(new i(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == h(new i(864e13)) && '"-000001-01-01T00:00:00.000Z"' == h(new i(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == h(new i(-1))
						} catch (k) {
							j = !1
						}
					}
					b = j
				}
				if ("json-parse" == a) {
					var l = c.parse;
					if ("function" == typeof l) try {
						if (0 === l("0") && !l(!1)) {
							d = l(f);
							var m = 5 == d.a.length && 1 === d.a[0];
							if (m) {
								try {
									m = !l('"	"')
								} catch (k) {}
								if (m) try {
									m = 1 !== l("01")
								} catch (k) {}
								if (m) try {
									m = 1 !== l("1.")
								} catch (k) {}
							}
						}
					} catch (k) {
						m = !1
					}
					b = m
				}
			}
			return u[a] = !! b
		}
		a || (a = d.Object()), c || (c = d.Object());
		var p, q, r, e = a.Number || d.Number,
			g = a.String || d.String,
			h = a.Object || d.Object,
			i = a.Date || d.Date,
			j = a.SyntaxError || d.SyntaxError,
			k = a.TypeError || d.TypeError,
			l = a.Math || d.Math,
			n = (a.JSON || d.JSON, h.prototype),
			o = n.toString,
			s = new i(-0xc782b5b800cec);
		try {
			s = -109252 == s.getUTCFullYear() && 0 === s.getUTCMonth() && 1 === s.getUTCDate() && 10 == s.getUTCHours() && 37 == s.getUTCMinutes() && 6 == s.getUTCSeconds() && 708 == s.getUTCMilliseconds()
		} catch (t) {}
		if (!u("json")) {
			var v = "[object Function]",
				w = "[object Date]",
				x = "[object Number]",
				y = "[object String]",
				z = "[object Array]",
				A = "[object Boolean]",
				B = u("bug-string-char-index");
			if (!s) var C = l.floor,
				D = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
				E = function(a, b) {
					return D[b] + 365 * (a - 1970) + C((a - 1969 + (b = +(b > 1))) / 4) - C((a - 1901 + b) / 100) + C((a - 1601 + b) / 400)
				};
			if ((p = n.hasOwnProperty) || (p = function(a) {
				var c, b = {};
				return (b.__proto__ = null, b.__proto__ = {
					toString: 1
				}, b).toString != o ? p = function(a) {
					var b = this.__proto__,
						c = (this.__proto__ = null, a in this);
					return this.__proto__ = b, c
				} : (c = b.constructor, p = function(a) {
					var b = (this.constructor || c).prototype;
					return a in this && !(a in b && this[a] === b[a])
				}), b = null, p.call(this, a)
			}), q = function(a, c) {
				var e, f, g, d = 0;
				(e = function() {
					this.valueOf = 0
				}).prototype.valueOf = 0, f = new e;
				for (g in f) p.call(f, g) && d++;
				return e = f = null, d ? q = 2 == d ?
				function(a, b) {
					var e, c = {},
						d = o.call(a) == v;
					for (e in a) d && "prototype" == e || p.call(c, e) || !(c[e] = 1) || !p.call(a, e) || b(e)
				} : function(a, b) {
					var d, e, c = o.call(a) == v;
					for (d in a) c && "prototype" == d || !p.call(a, d) || (e = "constructor" === d) || b(d);
					(e || p.call(a, d = "constructor")) && b(d)
				} : (f = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], q = function(a, c) {
					var e, g, d = o.call(a) == v,
						h = !d && "function" != typeof a.constructor && b[typeof a.hasOwnProperty] && a.hasOwnProperty || p;
					for (e in a) d && "prototype" == e || !h.call(a, e) || c(e);
					for (g = f.length; e = f[--g]; h.call(a, e) && c(e));
				}), q(a, c)
			}, !u("json-stringify")) {
				var F = {
					92: "\\\\",
					34: '\\"',
					8: "\\b",
					12: "\\f",
					10: "\\n",
					13: "\\r",
					9: "\\t"
				},
					G = "000000",
					H = function(a, b) {
						return (G + (b || 0)).slice(-a)
					},
					I = "\\u00",
					J = function(a) {
						for (var b = '"', c = 0, d = a.length, e = !B || d > 10, f = e && (B ? a.split("") : a); d > c; c++) {
							var g = a.charCodeAt(c);
							switch (g) {
							case 8:
							case 9:
							case 10:
							case 12:
							case 13:
							case 34:
							case 92:
								b += F[g];
								break;
							default:
								if (32 > g) {
									b += I + H(2, g.toString(16));
									break
								}
								b += e ? f[c] : a.charAt(c)
							}
						}
						return b + '"'
					},
					K = function(a, b, c, d, e, f, g) {
						var h, i, j, l, m, n, s, t, u, v, B, D, F, G, I, L;
						try {
							h = b[a]
						} catch (M) {}
						if ("object" == typeof h && h) if (i = o.call(h), i != w || p.call(h, "toJSON"))"function" == typeof h.toJSON && (i != x && i != y && i != z || p.call(h, "toJSON")) && (h = h.toJSON(a));
						else if (h > -1 / 0 && 1 / 0 > h) {
							if (E) {
								for (m = C(h / 864e5), j = C(m / 365.2425) + 1970 - 1; E(j + 1, 0) <= m; j++);
								for (l = C((m - E(j, 0)) / 30.42); E(j, l + 1) <= m; l++);
								m = 1 + m - E(j, l), n = (h % 864e5 + 864e5) % 864e5, s = C(n / 36e5) % 24, t = C(n / 6e4) % 60, u = C(n / 1e3) % 60, v = n % 1e3
							} else j = h.getUTCFullYear(), l = h.getUTCMonth(), m = h.getUTCDate(), s = h.getUTCHours(), t = h.getUTCMinutes(), u = h.getUTCSeconds(), v = h.getUTCMilliseconds();
							h = (0 >= j || j >= 1e4 ? (0 > j ? "-" : "+") + H(6, 0 > j ? -j : j) : H(4, j)) + "-" + H(2, l + 1) + "-" + H(2, m) + "T" + H(2, s) + ":" + H(2, t) + ":" + H(2, u) + "." + H(3, v) + "Z"
						} else h = null;
						if (c && (h = c.call(b, a, h)), null === h) return "null";
						if (i = o.call(h), i == A) return "" + h;
						if (i == x) return h > -1 / 0 && 1 / 0 > h ? "" + h : "null";
						if (i == y) return J("" + h);
						if ("object" == typeof h) {
							for (G = g.length; G--;) if (g[G] === h) throw k();
							if (g.push(h), B = [], I = f, f += e, i == z) {
								for (F = 0, G = h.length; G > F; F++) D = K(F, h, c, d, e, f, g), B.push(D === r ? "null" : D);
								L = B.length ? e ? "[\n" + f + B.join(",\n" + f) + "\n" + I + "]" : "[" + B.join(",") + "]" : "[]"
							} else q(d || h, function(a) {
								var b = K(a, h, c, d, e, f, g);
								b !== r && B.push(J(a) + ":" + (e ? " " : "") + b)
							}), L = B.length ? e ? "{\n" + f + B.join(",\n" + f) + "\n" + I + "}" : "{" + B.join(",") + "}" : "{}";
							return g.pop(), L
						}
					};
				c.stringify = function(a, c, d) {
					var e, f, g, h;
					if (b[typeof c] && c) if ((h = o.call(c)) == v) f = c;
					else if (h == z) {
						g = {};
						for (var k, i = 0, j = c.length; j > i; k = c[i++], h = o.call(k), (h == y || h == x) && (g[k] = 1));
					}
					if (d) if ((h = o.call(d)) == x) {
						if ((d -= d % 1) > 0) for (e = "", d > 10 && (d = 10); e.length < d; e += " ");
					} else h == y && (e = d.length <= 10 ? d : d.slice(0, 10));
					return K("", (k = {}, k[""] = a, k), f, g, e, "", [])
				}
			}
			if (!u("json-parse")) {
				var N, O, L = g.fromCharCode,
					M = {
						92: "\\",
						34: '"',
						47: "/",
						98: "\b",
						116: "	",
						110: "\n",
						102: "\f",
						114: "\r"
					},
					P = function() {
						throw N = O = null, j()
					},
					Q = function() {
						for (var c, d, e, f, g, a = O, b = a.length; b > N;) switch (g = a.charCodeAt(N)) {
						case 9:
						case 10:
						case 13:
						case 32:
							N++;
							break;
						case 123:
						case 125:
						case 91:
						case 93:
						case 58:
						case 44:
							return c = B ? a.charAt(N) : a[N], N++, c;
						case 34:
							for (c = "@", N++; b > N;) if (g = a.charCodeAt(N), 32 > g) P();
							else if (92 == g) switch (g = a.charCodeAt(++N)) {
							case 92:
							case 34:
							case 47:
							case 98:
							case 116:
							case 110:
							case 102:
							case 114:
								c += M[g], N++;
								break;
							case 117:
								for (d = ++N, e = N + 4; e > N; N++) g = a.charCodeAt(N), g >= 48 && 57 >= g || g >= 97 && 102 >= g || g >= 65 && 70 >= g || P();
								c += L("0x" + a.slice(d, N));
								break;
							default:
								P()
							} else {
								if (34 == g) break;
								for (g = a.charCodeAt(N), d = N; g >= 32 && 92 != g && 34 != g;) g = a.charCodeAt(++N);
								c += a.slice(d, N)
							}
							if (34 == a.charCodeAt(N)) return N++, c;
							P();
						default:
							if (d = N, 45 == g && (f = !0, g = a.charCodeAt(++N)), g >= 48 && 57 >= g) {
								for (48 == g && (g = a.charCodeAt(N + 1), g >= 48 && 57 >= g) && P(), f = !1; b > N && (g = a.charCodeAt(N), g >= 48 && 57 >= g); N++);
								if (46 == a.charCodeAt(N)) {
									for (e = ++N; b > e && (g = a.charCodeAt(e), g >= 48 && 57 >= g); e++);
									e == N && P(), N = e
								}
								if (g = a.charCodeAt(N), 101 == g || 69 == g) {
									for (g = a.charCodeAt(++N), (43 == g || 45 == g) && N++, e = N; b > e && (g = a.charCodeAt(e), g >= 48 && 57 >= g); e++);
									e == N && P(), N = e
								}
								var h = a.slice(d, N),
									i = +h;
								return h !== i + "" ? "@" + h : i
							}
							if (f && P(), "true" == a.slice(N, N + 4)) return N += 4, !0;
							if ("false" == a.slice(N, N + 5)) return N += 5, !1;
							if ("null" == a.slice(N, N + 4)) return N += 4, null;
							P()
						}
						return "$"
					},
					R = function(a) {
						var b, c;
						if ("$" == a && P(), "string" == typeof a) {
							if ("@" == (B ? a.charAt(0) : a[0])) return a.slice(1);
							if ("[" == a) {
								for (b = []; a = Q(), "]" != a; c || (c = !0)) c && ("," == a ? (a = Q(), "]" == a && P()) : P()), "," == a && P(), b.push(R(a));
								return b
							}
							if ("{" == a) {
								for (b = {}; a = Q(), "}" != a; c || (c = !0)) c && ("," == a ? (a = Q(), "}" == a && P()) : P()), ("," == a || "string" != typeof a || "@" != (B ? a.charAt(0) : a[0]) || ":" != Q()) && P(), b[a.slice(1)] = R(Q());
								return b
							}
							P()
						}
						return a
					},
					S = function(a, b, c) {
						var d = T(a, b, c);
						d === r ? delete a[b] : a[b] = d
					},
					T = function(a, b, c) {
						var e, d = a[b];
						if ("object" == typeof d && d) if (o.call(d) == z) for (e = d.length; e--;) S(d, e, c);
						else q(d, function(a) {
							S(d, a, c)
						});
						return c.call(a, b, d)
					};
				c.parse = function(a, b) {
					var c, d;
					return N = 0, O = "" + a, c = R(Q()), "$" != Q() && P(), N = O = null, b && o.call(b) == v ? T((d = {}, d[""] = c, d), "", b) : c
				}
			}
		}
		return c.runInContext = f, c
	}
	var a = "function" == typeof define && define.amd,
		b = {
			"function": !0,
			object: !0
		},
		c = b[typeof exports] && exports && !exports.nodeType && exports,
		d = b[typeof window] && window || this,
		e = c && b[typeof module] && module && !module.nodeType && "object" == typeof global && global;
	if (!e || e.global !== e && e.window !== e && e.self !== e || (d = e), c && !a) f(d, c);
	else {
		var g = d.JSON,
			h = d.JSON3,
			i = !1,
			j = f(d, d.JSON3 = {
				noConflict: function() {
					return i || (i = !0, d.JSON = g, d.JSON3 = h, g = h = null), j
				}
			});
		d.JSON = {
			parse: j.parse,
			stringify: j.stringify
		}
	}
	a && define(function() {
		return j
	})
}.call(this);