var addList = {};
$(function() {
	function a(a) {
		addList = {}, d.jqGrid("setGridParam", {
			url: f,
			datatype: "json",
			postData: a
		}).trigger("reloadGrid")
	}
	function b() {
		h.placeholder(), i.click(function() {
			var b = h.val();
			g.skey = b == h[0].defaultValue ? "" : b, a(g)
		}), j.click(function() {
			a(g)
		})
	}
	function c() {
		d.jqGrid({
			url: f,
			postData: g,
			datatype: "json",
			height: 354,
			altRows: !0,
			gridview: !0,
			colModel: [{
				name: "number",
				width: 120
			}, {
				name: "name",
				width: 150
			}, {
				name: "type",
				width: 100,
				align: "center",
				formatter: function(a) {
					switch (a) {
					case 1:
						return "现金";
					case 2:
						return "银行存款";
					default:
						return ""
					}
				}
			}],
			colNames: ["账户编号", "账户名称", "账户类别"],
			cmTemplate: {
				sortable: !1
			},
			multiselect: !0,
			page: 1,
			sortname: "number",
			sortorder: "desc",
			pager: e,
			rowNum: 2e3,
			rowList: ["300", "500", "1000"],
			scroll: !0,
			loadonce: !0,
			viewrecords: !0,
			shrinkToFit: !1,
			jsonReader: {
				root: "data.items",
				records: "data.totalsize",
				repeatitems: !1,
				id: "id"
			},
			onSelectRow: function(a, b) {
				if (b) {
					var c = d.jqGrid("getRowData", a);
					addList[a] = c
				} else addList[a] && delete addList[a]
			},
			onSelectAll: function(a, b) {
				for (var c = 0, e = a.length; e > c; c++) {
					var f = a[c];
					if (b) {
						var g = d.jqGrid("getRowData", f);
						addList[f] = g
					} else addList[f] && delete addList[f]
				}
			},
			gridComplete: function() {
				for (item in addList) d.jqGrid("setSelection", item, !1)
			}
		})
	}
	var d = $("#grid"),
		e = $("#page"),
		f = "../basedata/settAcct?action=list",
		g = {},
		h = $("#matchCon"),
		i = $("#search"),
		j = $("#refresh"),
		k = function() {
			b(), c()
		};
	k()
});