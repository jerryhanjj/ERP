define(["jquery", "print"], function(a) {
	function b() {
		i("#filter-fromDate").val(k.beginDate || ""), i("#filter-toDate").val(k.endDate || ""), k.beginDate && k.endDate && i("div.grid-subtitle").text("日期: " + k.beginDate + " 至 " + k.endDate), i("#filter-fromDate, #filter-toDate").datepicker(), Public.dateCheck();
		var a = {
			data: [{
				transType: "",
				transTypeName: "所有类别"
			}, {
				transType: "153401",
				transTypeName: "其它收入"
			}, {
				transType: "153402",
				transTypeName: "其它支出"
			}],
			text: "transTypeName",
			value: "transType",
			defaultSelected: 0,
			editable: !1,
			trigger: !0,
			extraListHtml: "",
			callback: {
				onChange: function(a) {
					switch (k.transType = a.transType, k.typeName = "", a.transType) {
					case "153401":
						i("#incomeName").removeClass("dn"), i("#expenseName").addClass("dn");
						break;
					case "153402":
						i("#incomeName").addClass("dn"), i("#expenseName").removeClass("dn")
					}
				}
			}
		};
		Business.categoryCombo(i("#incomeExpenseType"), a, !0);
		var b = {
			data: "../basedata/assist?action=list&isDelete=2&typeNumber=raccttype",
			text: "name",
			value: "id",
			addOptions: {
				value: "",
				text: "所有收入项目"
			},
			defaultSelected: 0,
			editable: !0,
			trigger: !0,
			cache: !1,
			extraListHtml: "",
			callback: {
				onChange: function(a) {
					return "undefined" == typeof a ? void(k.typeName = "") : void(k.typeName = a.name)
				}
			}
		};
		Business.categoryCombo(i("#incomeName"), b, !0);
		var c = {
			data: "../basedata/assist?action=list&isDelete=2&typeNumber=paccttype",
			text: "name",
			value: "id",
			addOptions: {
				value: "",
				text: "所有支出项目"
			},
			defaultSelected: 0,
			editable: !0,
			trigger: !0,
			cache: !1,
			extraListHtml: "",
			callback: {
				onChange: function(a) {
					return "undefined" == typeof a ? void(k.typeName = "") : void(k.typeName = a.name)
				}
			}
		};
		Business.categoryCombo(i("#expenseName"), c, !0), i("#filter-submit").on("click", function(a) {
			a.preventDefault();
			var b = i("#filter-fromDate").val(),
				c = i("#filter-toDate").val();
			return b && c && new Date(b).getTime() > new Date(c).getTime() ? void parent.Public.tips({
				type: 1,
				content: "开始日期不能大于结束日期"
			}) : (k.beginDate = b, paramsendDate = c, i("div.grid-subtitle").text("日期: " + b + " 至 " + c), void h())
		})
	}
	function c() {
		i("#btn-print").click(function(a) {
			a.preventDefault(), Business.verifyRight("ORIDETAIL_PRINT") && i("div.ui-print").printTable()
		}), i("#btn-export").click(function(a) {
			if (a.preventDefault(), Business.verifyRight("ORIDETAIL_EXPORT")) {
				var b = {};
				for (var c in k) k[c] && (b[c] = k[c]);
				Business.getFile(l, b)
			}
		})
	}
	function d() {
		var a = !1,
			b = !1,
			c = !1;
		j.isAdmin !== !1 || j.rights.AMOUNT_COSTAMOUNT || (a = !0), j.isAdmin !== !1 || j.rights.AMOUNT_OUTAMOUNT || (b = !0), j.isAdmin !== !1 || j.rights.AMOUNT_INAMOUNT || (c = !0);
		var d = [{
			name: "date",
			label: "日期",
			width: 150,
			align: "center"
		}, {
			name: "billNo",
			label: "单据编号",
			width: 110,
			align: "center"
		}, {
			name: "transTypeName",
			label: "收支类别",
			width: 110,
			align: "center"
		}, {
			name: "typeName",
			label: "收支项目",
			width: 110,
			align: "center"
		}, {
			name: "amountIn",
			label: "收入",
			align: "right",
			hidden: a,
			width: 120,
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.amountPlaces)
			}
		}, {
			name: "amountOut",
			label: "支出",
			width: 120,
			align: "right",
			hidden: a,
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.amountPlaces)
			}
		}, {
			name: "contactName",
			label: "往来单位",
			width: 110,
			align: "center"
		}, {
			name: "desc",
			label: "摘要",
			width: 110,
			align: "center"
		}],
			f = "local",
			g = "#";
		k.autoSearch && (f = "json", g = m), i("#grid").jqGrid({
			url: g,
			postData: k,
			datatype: f,
			autowidth: !0,
			gridview: !0,
			colModel: d,
			cmTemplate: {
				sortable: !1,
				title: !1
			},
			page: 1,
			sortname: "date",
			sortorder: "desc",
			rowNum: 3e3,
			loadonce: !0,
			viewrecords: !0,
			shrinkToFit: !1,
			footerrow: !0,
			userDataOnFooter: !0,
			cellLayout: 0,
			jsonReader: {
				root: "data.rows",
				userdata: "data.userdata",
				repeatitems: !1,
				id: "0"
			},
			loadComplete: function(a) {
				var b;
				if (a && a.data) {
					var c = a.data.rows.length;
					b = c ? 31 * c : 1
				}
				e(b)
			},
			gridComplete: function() {
				i("#grid").footerData("set", {
					typeName: "合计:"
				})
			}
		}), k.autoSearch ? (i(".no-query").remove(), i(".ui-print").show()) : i(".ui-print").hide()
	}
	function e(a) {
		a && (e.h = a);
		var b = f(),
			c = e.h,
			d = g(),
			h = i("#grid");
		c > d && (c = d), b < h.width() && (c += 17), i("#grid-wrap").height(function() {
			return document.body.clientHeight - this.offsetTop - 36 - 5
		}), h.jqGrid("setGridHeight", c), h.jqGrid("setGridWidth", b, !1)
	}
	function f() {
		return i(window).width() - i("#grid-wrap").offset().left - 36 - 20
	}
	function g() {
		return i(window).height() - i("#grid").offset().top - 36 - 16
	}
	function h() {
		i(".no-query").remove(), i(".ui-print").show(), i("#grid").clearGridData(!0), i("#grid").jqGrid("setGridParam", {
			datatype: "json",
			postData: k,
			url: m
		}).trigger("reloadGrid")
	}
	var i = a("jquery"),
		j = parent.SYSTEM,
		k = i.extend({
			beginDate: "",
			endDate: "",
			transType: "",
			typeName: ""
		}, Public.urlParam()),
		l = "../report/oriDetail_export?action=export",
		m = "../report/oriDetail_detail?action=detail";
	a("print"), b(), c(), d();
	var n;
	i(window).on("resize", function() {
		n || (n = setTimeout(function() {
			e(), n = null
		}, 50))
	})
});