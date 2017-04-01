define(["jquery", "print"], function(a) {
	function b() {
		Business.filterGoods(), Business.filterStorage(), chkboxes = h("#chk-wrap").cssCheckbox(), j.beginDate && j.endDate && h(".grid-subtitle").text(j.beginDate + "至" + j.endDate), i.enableAssistingProp || h("#chk-wrap").hide(), "1" === j.showSku && h('#chk-wrap input[name="showSku"]').attr("checked", !0), h("#filter-fromDate").val(j.beginDate), h("#filter-toDate").val(j.endDate), h("#filter-goods input").val(j.goodsNo), h("#filter-storage input").val(j.storageNo), Public.dateCheck(), this.fDatePicker = new Pikaday({
			field: h("#filter-fromDate")[0]
		}), this.tDatePicker = new Pikaday({
			field: h("#filter-toDate")[0]
		}), k = Public.categoryTree(h("#filterCat"), {
			width: 200
		})
	}
	function c() {
		var a = this;
		h("#refresh").click(function(b) {
			b.preventDefault();
			var c = h("#filter-fromDate").val(),
				e = h("#filter-toDate").val(),
				f = a.fDatePicker.getDate(),
				g = a.tDatePicker.getDate();
			if (f.getTime() > g.getTime()) return void parent.Public.tips({
				type: 1,
				content: "开始日期不能大于结束日期"
			});
			j = {
				beginDate: c,
				endDate: e,
				goods: h("#filter-goods input").data("ids") || "",
				goodsNo: h("#filter-goods input").val() || "",
				storage: h("#filter-storage input").data("ids") || "",
				storageNo: h("#filter-storage input").val() || ""
			}, chkVals = chkboxes.chkVal();
			for (var i = 0, k = chkVals.length; k > i; i++) j[chkVals[i]] = 1;
			var l = h.dialog.tips("正在查询，请稍候...", 1e3, "loading.gif", !0);
			Public.ajaxGet("../report/deliverSummary?action=detail", j, function(a) {
				200 === a.status ? (h(".no-query").remove(), h(".ui-print").show(), h(".grid-subtitle").text(j.beginDate + "至" + j.endDate), d(a.data), l.close()) : (l.close(), parent.Public.tips({
					type: 1,
					content: msg
				}))
			})
		}), j.search && h("#refresh").trigger("click"), h("#btn-print").click(function(a) {
			a.preventDefault(), Business.verifyRight("InvBalanceReport_PRINT") && window.print()
		}), h("#btn-export").click(function(a) {
			if (a.preventDefault(), Business.verifyRight("DeliverSummaryReport_EXPORT")) {
				var b = {};
				for (var c in j) j[c] && (b[c] = j[c]);
				Business.getFile("../report/deliverSummary_exporter?action=exporter", b)
			}
		})
	}
	function d(a) {
		h("#grid").jqGrid("GridUnload");
		for (var b = "auto", c = [{
			name: "invNo",
			label: "商品编号",
			frozen: !0,
			width: 80
		}, {
			name: "invName",
			label: "商品名称",
			frozen: !0,
			width: 200,
			classes: "ui-ellipsis",
			title: !0
		}, {
			name: "spec",
			label: "规格型号",
			frozen: !0,
			width: 60,
			align: "center"
		}, {
			name: "unit",
			label: "单位",
			frozen: !0,
			width: 40,
			align: "center"
		}, {
			name: "locationNo",
			label: "仓库编码",
			width: 0,
			hidden: !0
		}, {
			name: "location",
			label: "仓库",
			frozen: !0,
			width: 100
		}], d = a.colIndex, e = a.colNames, i = a.stoNames, k = [], m = "", n = 0, o = 5, p = d.length; p > o; o++) {
			var q = null;
			q = {
				name: d[o],
				label: e[o],
				width: 80,
				align: "right"
			}, c.push(q), d[o].split("_")[1] === m ? (k.pop(), k.push({
				startColumnName: d[o - 1],
				numberOfColumns: 2,
				titleText: i[n - 1]
			})) : (k.push({
				startColumnName: d[o],
				numberOfColumns: 1,
				titleText: i[n]
			}), n++), m = d[o].split("_")[1]
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
			ondblClickRow: function(a) {
				var b = h("#grid").getRowData(a),
					c = b.invNo,
					d = b.locationNo;
				Business.verifyRight("DeliverDetailReport_QUERY") && parent.tab.addTabItem({
					tabid: "report-goodsFlowDetail",
					text: "商品收发明细表",
					url: "../report/goods_flow_detail?autoSearch=true&beginDate=" + j.beginDate + "&endDate=" + j.endDate + "&goodsNo=" + c + "&storageNo=" + d
				})
			},
			loadComplete: function(a) {
				var b = l = a.records,
					c = g();
				b > Math.floor(c / 31).toFixed(0) && (h("#grid").jqGrid("setGridHeight", c), h("#grid").jqGrid("setGridWidth", f(), !1))
			},
			gridComplete: function() {}
		}).jqGrid("setGroupHeaders", {
			useColSpanStyle: !0,
			groupHeaders: k
		}).jqGrid("setFrozenColumns")
	}
	function e() {
		var a = f(),
			b = g(),
			c = h("#grid");
		l > Math.floor(b / 31).toFixed(0) ? c.jqGrid("setGridHeight", b) : c.jqGrid("setGridHeight", "auto"), c.jqGrid("setGridWidth", a, !1)
	}
	function f() {
		return h(window).width() - (f.offsetLeft || (f.offsetLeft = h("#grid-wrap").offset().left)) - 36 - 22
	}
	function g() {
		return h(window).height() - (g.offsetTop = h("#grid").offset().top) - 36 - 16
	}
	var h = a("jquery"),
		i = parent.SYSTEM,
		j = h.extend({
			beginDate: "",
			endDate: "",
			goodsNo: "",
			storageNo: "",
			showSku: "0"
		}, Public.urlParam()),
		k = null,
		l = 0;
	a("print"), b(), c();
	var m;
	h(window).on("resize", function() {
		m || (m = setTimeout(function() {
			e(), m = null
		}, 50))
	})
});