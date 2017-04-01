define(["jquery", "print"], function(a) {
	function b() {
		Business.filterGoods(), Business.filterStorage(), h("#filter-fromDate").attr("disabled", "disabled"), h("#filter-toDate").datepicker();
		var a = Public.urlParam();
		chkboxes = h("#chk-wrap").cssCheckbox(), i.enableAssistingProp || h("#chk-wrap").hide(), a = {
			beginDate: j.startDate || a.beginDate,
			endDate: a.endDate,
			goods: a.goods || "",
			goodsNo: a.goodsNo || "",
			storage: a.storage || "",
			storageNo: a.storageNo || ""
		}, "1" === a.showSku && h('#chk-wrap input[name="showSku"]').attr("checked", !0), h("#filter-fromDate").val(a.beginDate || ""), h("#filter-toDate").val(a.endDate || ""), l = Public.categoryTree(h("#filterCat"), {
			width: 200
		})
	}
	function c() {
		h("#refresh").click(function(a) {
			a.preventDefault();
			var b = h("#filter-fromDate").val(),
				c = h("#filter-toDate").val();
			if (b && c && new Date(b).getTime() > new Date(c).getTime()) return parent.Public.tips({
				type: 1,
				content: "开始日期不能大于结束日期"
			}), !1;
			k = {
				beginDate: b,
				endDate: c,
				goods: h("#filter-goods input").data("ids") || "",
				goodsNo: h("#filter-goods input").val() || "",
				storage: h("#filter-storage input").data("ids") || "",
				storageNo: h("#filter-storage input").val() || "",
				catId: l.getValue(),
				catName: l.getText()
			}, chkVals = chkboxes.chkVal();
			for (var e = 0, f = chkVals.length; f > e; e++) k[chkVals[e]] = 1;
			var g = h.dialog.tips("正在查询，请稍候...", 1e3, "loading.gif", !0);
			Public.ajaxGet("../report/invBalance?action=detail", k, function(a) {
				200 === a.status ? (h(".no-query").remove(), h(".ui-print").show(), d(a.data), g.close(), h(".grid-subtitle").text(k.beginDate + "至" + c)) : (g.close(), parent.Public.tips({
					type: 1,
					content: msg
				}))
			})
		}), k.search && h("#refresh").trigger("click"), h("#btn-print").click(function(a) {
			a.preventDefault(), Business.verifyRight("InvBalanceReport_PRINT") && window.print()
		}), h("#btn-export").click(function(a) {
			if (a.preventDefault(), Business.verifyRight("InvBalanceReport_EXPORT")) {
				var b = {};
				for (var c in k) k[c] && (b[c] = k[c]);
				Business.getFile("../report/invBalance_exporter?action=exporter", b)
			}
		})
	}
	function d(a) {
		h("#grid").jqGrid("GridUnload");
		for (var b = "auto", c = [{
			name: "invNo",
			label: "商品编号",
			width: 80
		}, {
			name: "invName",
			label: "商品名称",
			width: 200,
			classes: "ui-ellipsis",
			title: !0
		}, {
			name: "spec",
			label: "规格型号",
			width: 60,
			align: "center"
		}, {
			name: "unit",
			label: "单位",
			width: 40,
			align: "center"
		}], d = a.colIndex, e = a.colNames, i = a.stoNames, j = [], k = "", l = 0, n = 4, o = d.length; o > n; n++) {
			var p = null;
			p = {
				name: d[n],
				label: e[n],
				width: 80,
				align: "right"
			}, c.push(p), d[n].split("_")[1] === k ? (j.pop(), j.push({
				startColumnName: d[n - 1],
				numberOfColumns: 2,
				titleText: i[l - 1]
			})) : (j.push({
				startColumnName: d[n],
				numberOfColumns: 1,
				titleText: i[l]
			}), l++), k = d[n].split("_")[1]
		}
		h("#grid").jqGrid({
			ajaxGridOptions: {
				complete: function() {}
			},
			data: a.rows,
			datatype: "local",
			autowidth: !0,
			height: b,
			gridview: !0,
			colModel: c,
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
			userData: a.userdata,
			userDataOnFooter: !0,
			jsonReader: {
				root: "data.rows",
				records: "data.records",
				total: "data.total",
				userdata: "data.userdata",
				repeatitems: !1,
				id: "0"
			},
			ondblClickRow: function() {},
			loadComplete: function(a) {
				var b = m = a.records,
					c = g();
				b > Math.floor(c / 31).toFixed(0) && (h("#grid").jqGrid("setGridHeight", c), h("#grid").jqGrid("setGridWidth", f(), !1))
			},
			gridComplete: function() {}

		}).jqGrid("setGroupHeaders", {
			useColSpanStyle: !0,
			groupHeaders: j
		}).jqGrid("setFrozenColumns")
	}
	function e() {
		var a = f(),
			b = g(),
			c = h("#grid");
		m > Math.floor(b / 31).toFixed(0) ? c.jqGrid("setGridHeight", b) : c.jqGrid("setGridHeight", "auto"), c.jqGrid("setGridWidth", a, !1)
	}
	function f() {
		return h(window).width() - (f.offsetLeft || (f.offsetLeft = h("#grid-wrap").offset().left)) - 36 - 22
	}
	function g() {
		return h(window).height() - (g.offsetTop = h("#grid").offset().top) - 36 - 16
	}
	var h = a("jquery"),
		i = parent.SYSTEM,
		j = i,
		k = h.extend({
			beginDate: "",
			endDate: "",
			goodsNo: "",
			storageNo: "",
			showSku: "0"
		}, Public.urlParam()),
		l = null,
		m = 0;
	a("print"), b(), c();
	var n;
	h(window).on("resize", function() {
		n || (n = setTimeout(function() {
			e(), n = null
		}, 50))
	})
});