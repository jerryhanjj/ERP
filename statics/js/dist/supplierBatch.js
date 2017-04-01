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
				url: "../basedata/contact?type=10&action=list",
				postData: queryConditions,
				datatype: "json",
				width: 528,
				height: 354,
				altRows: !0,
				gridview: !0,
				colModel: [{
					name: "number",
					label: "编号",
					width: 100,
					title: !1
				}, {
					name: "name",
					label: "名称",
					width: 170,
					classes: "ui-ellipsis"
				}, {
					name: "customerType",
					label: "类别",
					width: 106,
					title: !1
				}, {
					name: "amount",
					label: "期初应付款",
					width: 90,
					title: !1,
					align: "right"
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
					root: "data.rows",
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
				url: "../basedata/contact?type=10&action=list",
				datatype: "json",
				postData: a
			}).trigger("reloadGrid")
		},
		addEvent: function() {
			var a = this;
			$("#search").click(function() {
				queryConditions.skey = "请输入供应商编号或名称或联系人" === a.$_matchCon.val() ? "" : a.$_matchCon.val(), THISPAGE.reloadData(queryConditions)
			}), $("#refresh").click(function() {
				THISPAGE.reloadData(queryConditions)
			})
		}
	};
THISPAGE.init();