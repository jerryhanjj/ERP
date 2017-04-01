function callback() {
	var a = frameElement.api,
		b = (a.data.oper, a.data.callback),
		c = $grid.jqGrid("getGridParam", "selarrrow"),
		d = c.length,
		e = oldRow = parent.curRow,
		f = parent.curCol;
	if (d > 0) {
		parent.$("#grid").jqGrid("restoreCell", e, f);
		for (rowid in addList) {
			var g = addList[rowid];
			if ("" === g.spec) var h = g.number + " " + g.name;
			else var h = g.number + " " + g.name + "_" + g.spec;
			var i = {
				goods: h,
				mainUnit: g.unitName,
				qty: 1,
				price: g.salePrice,
				amount: g.salePrice,
				locationName: g.locationName
			};
			if (e > 8 && e > oldRow) var j = parent.$("#grid").jqGrid("addRowData", Number(e) + 1, i, "last");
			else var j = parent.$("#grid").jqGrid("setRowData", Number(e), i);
			j && parent.$("#" + e).data("goodsInfo", {
				id: g.id,
				number: g.number,
				name: g.name,
				spec: g.spec,
				unitName: g.unitName
			}).data("storageInfo", {
				id: g.locationId,
				name: g.locationName
			}), e++
		}
		b(e)
	}
	return !1
}
var api = frameElement.api,
	data = api.data || {},
	$grid = $("#grid"),
	addList = {},
	queryConditions = {
		skey: "",
		isDelete: data.isDelete || 0
	},
	THISPAGE = {
		init: function() {
			this.initDom(), this.loadGrid(), this.addEvent()
		},
		initDom: function() {
			this.$_matchCon = $("#matchCon"), this.$_matchCon.placeholder()
		},
		loadGrid: function() {
			$(window).height() - $(".grid-wrap").offset().top - 84;
			$grid.jqGrid({
				url: "../basedata/employee?action=list",
				postData: queryConditions,
				datatype: "json",
				autoWidth: !0,
				height: 354,
				altRows: !0,
				gridview: !0,
				colModel: [{
					name: "number",
					label: "职员编号",
					width: 120,
					title: !1
				}, {
					name: "name",
					label: "职员名称",
					width: 300,
					classes: "ui-ellipsis"
				}],
				cmTemplate: {
					sortable: !1
				},
				multiselect: !0,
				page: 1,
				sortname: "number",
				sortorder: "desc",
				pager: "#page",
				rowNum: 100,
				rowList: [100, 200, 500],
				viewrecords: !0,
				shrinkToFit: !1,
				forceFit: !1,
				jsonReader: {
					root: "data.items",
					records: "data.records",
					total: "data.total",
					repeatitems: !1,
					id: "id"
				},
				loadError: function() {},
				onSelectRow: function(a, b) {
					if (b) {
						var c = $grid.jqGrid("getRowData", a);
						addList[a] = c
					} else addList[a] && delete addList[a]
				},
				onSelectAll: function(a, b) {
					for (var c = 0, d = a.length; d > c; c++) {
						var e = a[c];
						if (b) {
							var f = $grid.jqGrid("getRowData", e);
							addList[e] = f
						} else addList[e] && delete addList[e]
					}
				},
				gridComplete: function() {
					for (item in addList) $grid.jqGrid("setSelection", item, !1)
				}
			})
		},
		reloadData: function(a) {
			addList = {}, $grid.jqGrid("setGridParam", {
				url: "../basedata/employee/findByNumberOrName?action=findByNumberOrName",
				datatype: "json",
				postData: a
			}).trigger("reloadGrid")
		},
		addEvent: function() {
			var a = this;
			$("#search").click(function() {
				queryConditions.skey = "请输入职员编号或名称" === a.$_matchCon.val() ? "" : a.$_matchCon.val(), THISPAGE.reloadData(queryConditions)
			}), $("#refresh").click(function() {
				THISPAGE.reloadData(queryConditions)
			})
		}
	};
THISPAGE.init();