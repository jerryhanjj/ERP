define(["jquery", "print"], function(a) {
	function b() {
		k.matchCon ? i("#matchCon").val(k.matchCon || "请输入客户、供应商或编号查询") : (i("#matchCon").addClass("ui-input-ph"), i("#matchCon").placeholder()), k.customer && i("#customer").attr("checked", !0), k.supplier && i("#supplier").attr("checked", !0), i("#search").on("click", function(a) {
			a.preventDefault();
			var b = "请输入客户、供应商或编号查询" === i("#matchCon").val() ? "" : i.trim(i("#matchCon").val());
			k = {
				matchCon: b,
				customer: i("#customer").is(":checked") ? 1 : "",
				supplier: i("#supplier").is(":checked") ? 1 : ""
			}, h()
		})
	}
	function c() {
		i("#btn-print").click(function(a) {
			a.preventDefault(), Business.verifyRight("ContactDebtReport_PRINT") && i("div.ui-print").printTable()
		}), i("#btn-export").click(function(a) {
			a.preventDefault(), Business.verifyRight("ContactDebtReport_EXPORT") && Business.getFile(l, k)
		})
	}
	function d() {
		var a = !1,
			b = !1,
			c = !1;
		j.isAdmin !== !1 || j.rights.AMOUNT_COSTAMOUNT || (a = !0), j.isAdmin !== !1 || j.rights.AMOUNT_OUTAMOUNT || (b = !0), j.isAdmin !== !1 || j.rights.AMOUNT_INAMOUNT || (c = !0);
		var d = [{
			name: "number",
			label: "往来单位编号",
			width: 80,
			align: "center"
		}, {
			name: "name",
			label: "名称",
			width: 120,
			align: "center"
		}, {
			name: "displayName",
			label: "往来单位性质",
			width: 80,
			align: "center"
		}, {
			name: "receivable",
			label: "应收款余额",
			width: 120,
			align: "right",
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.amountPlaces)
			}
		}, {
			name: "payable",
			label: "应付款余额",
			width: 120,
			align: "right",
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.amountPlaces)
			}
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
			rownumbers: !0,
			sortorder: "desc",
			rowNum: 1e6,
			loadonce: !0,
			viewrecords: !0,
			shrinkToFit: !0,
			footerrow: !0,
			userDataOnFooter: !0,
			jsonReader: {
				root: "data.list",
				userdata: "data.total",
				repeatitems: !1,
				id: "0"
			},
			loadComplete: function(a) {
				var b;
				if (a && a.data) {
					var c = a.data.list.length;
					b = c ? 31 * c : 1
				}
				e(b)
			},
			gridComplete: function() {
				i("#grid").footerData("set", {
					displayName: "合计:"
				}), i("table.ui-jqgrid-ftable").find('td[aria-describedby="grid_location"]').prevUntil().css("border-right-color", "#fff")
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
			matchCon: "",
			customer: "",
			supplier: ""
		}, Public.urlParam()),
		l = "../report/contactDebt_exporter?action=exporter",
		m = "../report/contactDebt_detail?action=detail";
	a("print"), b(), c(), d();
	var n;
	i(window).on("resize", function() {
		n || (n = setTimeout(function() {
			e(), n = null
		}, 50))
	})
});