function callback() {
	var a, b;
	if (isSingle) a = $("#grid").jqGrid("getRowData", $("#grid").jqGrid("getGridParam", "selrow")), b = [a];
	else {
		rowDatas = $("#grid").jqGrid("getRowData"), b = [];
		for (var c = 0, d = rowDatas.length; d > c; c++) {
			var e = rowDatas[c];
			e.qty && b.push(e)
		}
	}
	"function" == typeof THISPAGE.data.callback && b.length && THISPAGE.data.callback(b, api)
}
var curRow, curCol, api = frameElement.api,
	queryConditions = {
		skey: "",
		skuClassId: api.data.skuClassId
	},
	defaultPage = Public.getDefaultPage(),
	SYSTEM = defaultPage.SYSTEM,
	data = api.data,
	isSingle = data ? data.isSingle : 0,
	qtyPlaces = Number(SYSTEM.qtyPlaces),
	pricePlaces = Number(SYSTEM.pricePlaces),
	amountPlaces = Number(SYSTEM.amountPlaces),
	THISPAGE = {
		init: function() {
			this.data = api.data, this.initDom(), this.loadGrid(), this.addEvent(), this.initButton()
		},
		initButton: function() {
			var a = ["确定", "取消"];
			api.button({
				id: "confirm",
				name: a[0],
				focus: !0,
				callback: function() {
					return null != curRow && null != curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null), callback(), !1
				}
			}, {
				id: "cancel",
				name: a[1]
			})
		},
		initDom: function() {
			this.$_matchCon = $("#matchCon"), this.$_matchCon.placeholder()
		},
		loadGrid: function() {
			{
				var a = "../basedata/assistSku?action=list";
				$(window).height() - $(".grid-wrap").offset().top - 84
			}
			$("#grid").jqGrid({
				url: a,
				postData: queryConditions,
				datatype: "json",
				width: 424,
				height: 254,
				altRows: !0,
				colModel: [{
					name: "operate",
					label: "操作",
					width: 30,
					fixed: !0,
					formatter: function(a, b, c) {
						var d = '<div class="operating" data-id="' + c.id + '"><span class="ui-icon ui-icon-trash" title="删除"></span></div>';
						return d
					}
				}, {
					name: "skuName",
					width: isSingle ? 320 : 260,
					label: "规格名称"
				}, {
					name: "skuId",
					label: "skuId",
					hidden: !0
				}, {
					name: "qty",
					label: "数量",
					width: 60,
					editable: !0,
					align: "right",
					formatter: "number",
					formatoptions: {
						decimalPlaces: qtyPlaces
					},
					hidden: isSingle
				}],
				cmTemplate: {
					sortable: !1,
					title: !1
				},
				page: 1,
				pager: "#page",
				rowNum: 2e3,
				rowList: [300, 500, 1e3],
				scroll: 1,
				viewrecords: !0,
				shrinkToFit: !1,
				forceFit: !1,
				cellEdit: !0,
				rownumbers: !0,
				triggerAdd: !1,
				cellsubmit: "clientArray",
				jsonReader: {
					root: "data.items",
					records: "data.records",
					total: "data.total",
					repeatitems: !1,
					id: "skuId"
				},
				loadError: function() {},
				afterSaveCell: function() {},
				ondblClickRow: function() {
					isSingle && (callback(), frameElement.api.close())
				},
				loadComplete: function(a) {
					var b = a.data.items;
					b.length && $("#grid").jqGrid("nextCell", 0, 4)
				}
			})
		},
		reloadData: function(a) {
			var b = this.data.url;
			$("#grid").jqGrid("setGridParam", {
				url: b,
				datatype: "json",
				postData: a
			}).trigger("reloadGrid")
		},
		addEvent: function() {
			var a = this;
			$("#search").click(function() {
				var b = $.trim(a.$_matchCon.val());
				queryConditions.skuName = "输入规格、属性名称查询" === b ? "" : b, THISPAGE.reloadData(queryConditions)
			}), $("#refresh").click(function() {
				THISPAGE.reloadData(queryConditions)
			}), $("#add").click(function() {
				Business.verifyRight("FZSX_ADD") && $.dialog({
					width: 300,
					height: 180,
					title: "新增商品规格",
					content: "url:assistingPropGroupManage",
					data: {
						skuClassId: queryConditions.skuClassId,
						callback: function(a, b) {
							$("#grid").jqGrid("addRowData", a.skuId, a, "first"), $("#grid").jqGrid("nextCell", 0, 4), b && b.close()
						}
					},
					init: function() {
						a.skey = ""
					},
					lock: !1,
					ok: !1,
					cancle: !1
				})
			}), $(".grid-wrap").on("click", ".ui-icon-trash", function(a) {
				if (a.preventDefault(), Business.verifyRight("FZSX_DELETE")) {
					var b = $(this).closest("tr").prop("id");
					$.dialog.confirm("您确定要删除该规格吗？", function() {
						Public.ajaxGet("../basedata/assistSku/delete?action=delete", {
							id: b
						}, function(a) {
							200 === a.status ? ($("#grid").jqGrid("delRowData", b), parent.Public.tips({
								content: "删除成功！"
							})) : parent.Public.tips({
								type: 1,
								content: a.msg
							})
						})
					})
				}
			}), $(document).bind("click.cancel", function(a) {
				var b = a.target || a.srcElement;
				!$(b).closest("#grid").length > 0 && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null)
			})
		}
	};
THISPAGE.init();