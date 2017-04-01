function callbackSp() {
	var a = parent.THISPAGE || api.data.page,
		b = a.curID,
		c = (a.newId, "fix1"),
		d = (api.data.callback, $("#grid").jqGrid("getGridParam", "selarrrow")),
		e = d.length,
		f = oldRow = parent.curRow,
		g = parent.curCol;
	if (e > 0) {
		parent.$("#fixedGrid").jqGrid("restoreCell", f, g);
		var h = Public.getDefaultPage(),
			i = $("#grid").jqGrid("getRowData", d[0]);
		if (i.id = i.id.split("_")[0], h.SYSTEM.goodsInfo.push(i), "" === i.spec) var j = i.number + " " + i.name;
		else var j = i.number + " " + i.name + "_" + i.spec;
		var k = $.extend(!0, {}, i);
		if (k.goods = j, k.id = c, b) var l = parent.$("#fixedGrid").jqGrid("setRowData", b, {});
		l && parent.$("#" + b).data("goodsInfo", i).data("storageInfo", {
			id: i.locationId,
			name: i.locationName
		}).data("unitInfo", {
			unitId: i.unitId,
			name: i.unitName
		}), parent.$("#fixedGrid").jqGrid("setRowData", c, k)
	}
	return d
}
function callback() {
	var a = parent.THISPAGE || api.data.page,
		b = a.curID,
		c = a.newId,
		d = api.data.callback,
		e = $("#grid").jqGrid("getGridParam", "selarrrow"),
		f = e.length,
		g = oldRow = parent.curRow,
		h = parent.curCol;
	if (isSingle) {
		parent.$("#grid").jqGrid("restoreCell", g, h);
		var i = $("#grid").jqGrid("getRowData", $("#grid").jqGrid("getGridParam", "selrow"));
		if (i.id = i.id.split("_")[0], delete i.amount, defaultPage.SYSTEM.goodsInfo.push(i), "" === i.spec) var j = i.number + " " + i.name;
		else var j = i.number + " " + i.name + "_" + i.spec;
		if (g > 8 && g > oldRow) var k = g;
		else var k = b;
		var l = parent.$("#grid").jqGrid("getRowData", Number(b));
		l = $.extend({}, l, {
			id: i.id,
			goods: j,
			invNumber: i.number,
			invName: i.name,
			unitName: i.unitName,
			qty: 1,
			price: i.salePrice,
			spec: i.spec,
			skuId: i.skuId,
			skuName: i.skuName,
			isSerNum: i.isSerNum
		});
		var m = $.extend(!0, {}, l);
		parent.$("#" + k).data("goodsInfo", m).data("storageInfo", {
			id: i.locationId,
			name: i.locationName
		}).data("unitInfo", {
			unitId: i.unitId,
			name: i.unitName
		}), d(k, l)
	} else if (f > 0) {
		parent.$("#grid").jqGrid("restoreCell", g, h);
		for (rowid in addList) {
			var i = addList[rowid];
			if (i.id = i.id.split("_")[0], delete i.amount, defaultPage.SYSTEM.goodsInfo.push(i), "" === i.spec) var j = i.number + " " + i.name;
			else var j = i.number + " " + i.name + "_" + i.spec;
			if (b) var k = b;
			else var k = c;
			var n = $.extend(!0, {}, i);
			if (n.goods = j, n.id = k, n.qty = n.qty || 1, b) var o = parent.$("#grid").jqGrid("setRowData", Number(b), {});
			else {
				var o = parent.$("#grid").jqGrid("addRowData", Number(c), {}, "last");
				c++
			}
			o && parent.$("#" + k).data("goodsInfo", i).data("storageInfo", {
				id: i.locationId,
				name: i.locationName
			}).data("unitInfo", {
				unitId: i.unitId,
				name: i.unitName
			}), parent.$("#grid").jqGrid("setRowData", k, n), g++;
			var p = parent.$("#" + b).next();
			b = p.length > 0 ? parent.$("#" + b).next().attr("id") : ""
		}
		d(c, b, g), $("#grid").jqGrid("resetSelection"), addList = {}
	}
	return e
}
var queryConditions = {
	skey: (frameElement.api.data ? frameElement.api.data.skey : "") || ""
},
	$grid = $("#grid"),
	addList = {},
	urlParam = Public.urlParam(),
	zTree, defaultPage = Public.getDefaultPage(),
	SYSTEM = defaultPage.SYSTEM,
	taxRequiredCheck = SYSTEM.taxRequiredCheck;
taxRequiredInput = SYSTEM.taxRequiredInput;
var api = frameElement.api,
	data = api.data || {},
	isSingle = data.isSingle || 0,
	skuMult = data.skuMult,
	THISPAGE = {
		init: function() {
			this.initDom(), this.loadGrid(), this.initZtree(), this.addEvent()
		},
		initDom: function() {
			this.$_matchCon = $("#matchCon").val(queryConditions.skey || "请输入商品编号或名称或型号"), this.$_matchCon.placeholder()
		},
		initZtree: function() {
			zTree = Public.zTree.init($(".grid-wrap"), {
				defaultClass: "ztreeDefault",
				showRoot: !0
			}, {
				callback: {
					beforeClick: function(a, b) {
						queryConditions.assistId = b.id, $("#search").trigger("click")
					}
				}
			})
		},
		loadGrid: function() {
			function a(a, b, c) {
				var d = '<div class="operating" data-id="' + c.id + '"><a class="ui-icon ui-icon-search" title="查询"></a><span class="ui-icon ui-icon-copy" title="商品图片"></span></div>';
				return d
			}
			$(window).height() - $(".grid-wrap").offset().top - 84;
			$("#grid").jqGrid({
				url: "../basedata/inventory?action=list",
				postData: queryConditions,
				datatype: "json",
				width: 578,
				height: 354,
				altRows: !0,
				gridview: !0,
				colModel: [{
					name: "id",
					label: "ID",
					width: 0,
					hidden: !0
				}, {
					name: "operating",
					label: "操作",
					width: 60,
					fixed: !0,
					formatter: a,
					align: "center"
				}, {
					name: "number",
					label: "商品编号",
					width: 100,
					title: !1
				}, {
					name: "name",
					label: "商品名称",
					width: 200,
					classes: "ui-ellipsis"
				}, {
					name: "skuClassId",
					label: "skuClassId",
					width: 0,
					hidden: !0
				}, {
					name: "skuId",
					label: "skuId",
					width: 0,
					hidden: !0
				}, {
					name: "skuName",
					label: "属性",
					width: 100,
					hidden: !skuMult,
					classes: "ui-ellipsis"
				}, {
					name: "qty",
					label: "数量",
					width: 60,
					hidden: !skuMult,
					formatter: function(a) {
						return a || "&#160;"
					}
				}, {
					name: "spec",
					label: "规格型号",
					width: 106,
					title: !1
				}, {
					name: "unitName",
					label: "单位",
					width: 60,
					title: !1
				}, {
					name: "unitId",
					label: "单位ID",
					width: 0,
					hidden: !0
				}, {
					name: "salePrice",
					label: "销售单价",
					width: 0,
					hidden: !0
				}, {
					name: "purPrice",
					label: "采购单价",
					width: 0,
					hidden: !0
				}, {
					name: "locationId",
					label: "仓库ID",
					width: 0,
					hidden: !0
				}, {
					name: "locationName",
					label: "仓库名称",
					width: 0,
					hidden: !0
				}, {
					name: "isSerNum",
					label: "是否启用序列号",
					width: 0,
					hidden: !0
				}],
				cmTemplate: {
					sortable: !1
				},
				multiselect: isSingle ? !1 : !0,
				page: 1,
				sortname: "number",
				sortorder: "desc",
				pager: "#page",
				page: 1,
				rowNum: 100,
				rowList: [100, 200, 500],
				viewrecords: !0,
				shrinkToFit: !0,
				forceFit: !1,
				jsonReader: {
					root: "data.rows",
					records: "data.records",
					total: "data.total",
					repeatitems: !1,
					id: "id"
				},
				loadError: function() {},
				ondblClickRow: function() {
					isSingle && (callback(), frameElement.api.close())
				},
				onSelectRow: function(a, b) {
					if (b) {
						var c = $grid.jqGrid("getRowData", a);
						skuMult && c.skuClassId > 0 ? ($("#grid").jqGrid("setSelection", a, !1), $.dialog({
							width: 470,
							height: 400,
							title: "选择【" + c.number + " " + c.name + "】的属性",
							content: "url:http://" + defaultPage.location.hostname + "/settings/assistingProp-batch.jsp",
							data: {
								isSingle: isSingle,
								skey: "",
								skuClassId: c.skuClassId,
								callback: function(b, d) {
									for (var e = [], f = 0, g = b.length; g > f; f++) {
										var h = b[f],
											i = $.extend(!0, {}, c);
										if (i.skuName = h.skuName, i.skuId = h.skuId, i.qty = h.qty, 0 === f) $("#grid").jqGrid("setRowData", a, i);
										else {
											var j = f;
											!
											function l() {
												$("#" + a + "_" + j).length && (j++, l())
											}(), i.id = a + "_" + j, $("#grid").jqGrid("addRowData", i.id, i, "after", a)
										}
										addList[i.id] = i, e.push(i)
									}
									for (var f = 0; f < e.length; f++) {
										var k = $("#" + e[f].id).find("input:checkbox")[0];
										k && !k.checked && $("#grid").jqGrid("setSelection", e[f].id, !1)
									}
									d.close()
								}
							},
							init: function() {},
							lock: !0,
							ok: !1,
							cancle: !1
						})) : addList[a] = c
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
					for (_item in addList) {
						var a = $("#" + addList[_item].id);
						!a.length && a.find("input:checkbox")[0].checked && $grid.jqGrid("setSelection", _item, !1)
					}
				}
			})
		},
		reloadData: function(a) {
			addList = {}, $("#grid").jqGrid("setGridParam", {
				url: "../basedata/inventory?action=list",
				datatype: "json",
				postData: a
			}).trigger("reloadGrid")
		},
		addEvent: function() {
			var a = this;
			$(".grid-wrap").on("click", ".ui-icon-search", function(a) {
				a.preventDefault();
				var b = $(this).parent().data("id");
				Business.forSearch(b, "")
			}), $(".grid-wrap").on("click", ".ui-icon-copy", function(a) {
				a.preventDefault();
				var b = $(this).parent().data("id"),
					c = "商品图片";
				parent.$.dialog({
					content: "url:../settings/fileUpload",
					data: {
						title: c,
						id: b,
						callback: function() {}
					},
					title: c,
					width: 775,
					height: 470,
					max: !1,
					min: !1,
					cache: !1,
					lock: !0
				})
			}), $("#search").click(function() {
				queryConditions.catId = a.catId, queryConditions.skey = "请输入商品编号或名称或型号" === a.$_matchCon.val() ? "" : a.$_matchCon.val(), a.reloadData(queryConditions)
			}), $("#refresh").click(function() {
				a.reloadData(queryConditions)
			})
		}
	};
THISPAGE.init();