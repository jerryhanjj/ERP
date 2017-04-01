var curRow, curCol, loading = null,
	import_dialog = null,
	SYSTEM = parent.SYSTEM,
	tempAssistPropGroupInfo = {},
	queryConditions = {
		goods: "",
		showZero: 0,
		isSerNum: 0
	},
	qtyPlaces = Number(parent.SYSTEM.qtyPlaces),
	pricePlaces = Number(parent.SYSTEM.pricePlaces),
	amountPlaces = Number(parent.SYSTEM.amountPlaces),
	THISPAGE = {
		init: function(a) {
			this.initDom(a), this.addEvent(), this.loadGrid([]), $(".ui-jqgrid-bdiv").addClass("no-query")
		},
		initDom: function() {
			this.$_storage = $("#storage"), this.$_category = $("#category"), this.$_goods = $("#goods"), this.$_note = $("#note"), this.chkField = $("#chkField").cssCheckbox(), this.storageCombo = $("#storage").combo({
				data: function() {
					return parent.SYSTEM.storageInfo
				},
				text: "name",
				value: "id",
				width: 120,
				defaultSelected: 0,
				addOptions: {
					text: "所有仓库",
					value: -1
				},
				cache: !1
			}).getCombo(), this.categoryTree = Public.categoryTree(this.$_category, {
				rootTxt: "所有类别",
				width: 200
			}), 1 != SYSTEM.ISSERNUM && $("#chkField").find("label:eq(1)").hide()
		},
		loadGrid: function(a) {
			$("#grid").jqGrid("GridUnload");
			var b = $(window).height() - $(".grid-wrap").offset().top - 124;
			$("#grid").jqGrid({
				data: a,
				mtype: "GET",
				autowidth: !0,
				height: b,
				rownumbers: !0,
				altRows: !0,
				gridview: !0,
				colModel: [{
					name: "locationId",
					label: "仓库ID",
					width: 0,
					hidden: !0
				}, {
					name: "locationName",
					label: "仓库",
					width: 100
				}, {
					name: "assistName",
					label: "商品类别",
					width: 100
				}, {
					name: "invId",
					label: "商品ID",
					width: 0,
					hidden: !0
				}, {
					name: "invNumber",
					label: "商品编号",
					width: 100
				}, {
					name: "invName",
					label: "商品名称",
					width: 200,
					classes: "ui-ellipsis"
				}, {
					name: "skuId",
					label: "属性ID",
					hidden: !0
				}, {
					name: "skuName",
					label: "属性",
					width: 100,
					classes: "ui-ellipsis",
					hidden: !SYSTEM.enableAssistingProp,
					formatter: function(a, b, c) {
						if (!a && c.skuId) {
							if (tempAssistPropGroupInfo[c.skuId]) return tempAssistPropGroupInfo[c.skuId].skuName;
							for (var d = 0, e = parent.SYSTEM.assistPropGroupInfo.length; e > d; d++) {
								var f = SYSTEM.assistPropGroupInfo[d];
								if (tempAssistPropGroupInfo[f.skuId] = f, f.skuId == c.skuId) return f.skuName
							}
						}
						return a || "&#160;"
					}
				}, {
					name: "invSpec",
					label: "规格型号",
					width: 100
				}, {
					name: "unitId",
					label: "单位ID",
					width: 0,
					hidden: !0
				}, {
					name: "unitName",
					label: "单位",
					width: 50
				}, {
					name: "qty",
					label: "系统库存",
					width: 100,
					align: "right",
					formatter: "number",
					formatoptions: {
						decimalPlaces: qtyPlaces
					}
				}, {
					name: "checkInventory",
					label: "盘点库存",
					width: 100,
					title: !1,
					align: "right",
					editable: !0,
					formatter: "number",
					formatoptions: {
						decimalPlaces: qtyPlaces
					}
				}, {
					name: "change",
					label: "盘盈盘亏",
					width: 100,
					align: "right",
					formatter: "number",
					formatoptions: {
						decimalPlaces: qtyPlaces
					}
				}],
				cmTemplate: {
					sortable: !1
				},
				sortname: "number",
				sortorder: "desc",
				pager: "#page",
				rowNum: 20,
				rowList: [100, 200, 500],
				viewrecords: !0,
				shrinkToFit: !1,
				forceFit: !1,
				cellEdit: !0,
				triggerAdd: !1,
				cellsubmit: "clientArray",
				localReader: {
					root: "data.rows",
					records: "data.records",
					repeatitems: !1,
					total: "data.total",
					page: "data.page",
					id: "-1"
				},
				jsonReader: {
					root: "data.rows",
					records: "data.records",
					repeatitems: !1,
					total: "data.total",
					page: "data.page",
					id: "-1"
				},
				gridComplete: function() {
					$("tr#1").find("td:eq(11)").trigger("click")
				},
				afterSaveCell: function(a, b, c, d, e) {
					if ("checkInventory" == b) {
						var f = $("#grid").jqGrid("getCell", a, e - 1);
						if (!isNaN(parseFloat(f))) {
							$("#" + a).find("td:eq(-1)").removeClass("red");
							var g = parseFloat(c) - parseFloat(f);
							0 > g ? $("#grid").jqGrid("setCell", a, "change", g, "red") : $("#grid").jqGrid("setCell", a, "change", g)
						}
					}
				},
				loadError: function() {}
			})
		},
		reloadData: function(a) {
			$("#grid").jqGrid("setGridParam", {
				url: "../scm/invOi/queryToPD?action=queryToPD",
				datatype: "json",
				postData: a,
				page: 1
			}).trigger("reloadGrid")
		},
		_getEntriesData: function() {
			null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null);
			for (var a = [], b = $("#grid").jqGrid("getDataIDs"), c = 0, d = b.length; d > c; c++) {
				var e, f = b[c],
					g = $("#grid").jqGrid("getRowData", f);
				e = {
					invId: g.invId,
					invNumber: g.invNumber,
					invName: g.invName,
					skuId: g.skuId || -1,
					skuName: g.skuName || "",
					invSpec: g.invSpec,
					locationId: g.locationId,
					locationName: g.locationName,
					unitId: g.unitId,
					mainUnit: g.unitName,
					invCost: g.invCost,
					qty: g.qty,
					checkInventory: g.checkInventory,
					change: g.change
				}, a.push(e)
			}
			return a
		},
		manager: {
			_makeOutBound: function(a) {
				parent.tab.addTabItem({
					tabid: "storage-otherOutbound",
					text: "其他出库",
					url: "../scm/invOi?action=initOi&type=out&cacheId=" + a
				})
			},
			_makeWarehouse: function(a) {
				parent.tab.addTabItem({
					tabid: "storage-otherWarehouse",
					text: "其他入库",
					url: "../scm/invOi?action=initOi&type=in&cacheId=" + a
				})
			},
			makeOrder: function(a) {
				var b = this,
					c = {},
					d = function(a) {
						var c = !0;
						"out" === a && b.$input_out.length ? b.$input_out.removeClass("ui-label-warning").addClass("ui-label-success") : b.$input_in.length && b.$input_in.removeClass("ui-label-warning").addClass("ui-label-success"), b.$input_in.length && !b.$input_in.hasClass("ui-label-success") && (c = !1), b.$input_out.length && !b.$input_out.hasClass("ui-label-success") && (c = !1), c && (b.pop.close(), $("#search").trigger("click"))
					};
				if (a.items && a.items.length) for (var e = a.items.length - 1; e >= 0; e--)"OO" === a.items[e].billType ? c.outboundData = a.items[e] : c.warehouseData = a.items[e];
				var f = (new Date).getTime() + "";
				parent.Cache = parent.Cache || {}, parent.Cache[f] = {
					data: c,
					callback: d
				};
				var g = "",
					h = "";
				c.outboundData && (g = '<li><span class="ui-label ui-label-warning" id="out">盘亏单</span></li>'), c.warehouseData && (h = '<li><span class="ui-label ui-label-warning" id="in">盘盈单</span></li>');
				var i = ['<div id="manager">', "<ul>", g, h, "</ul>", "</div>"];
				b.pop = $.dialog({
					title: "打开盘点单据确认后保存",
					content: i.join(""),
					width: 150,
					height: 100,
					lock: !0,
					ok: !1,
					init: function() {
						b.$input_out = $("#out").click(function() {
							b._makeOutBound(f)
						}), b.$input_in = $("#in").click(function() {
							b._makeWarehouse(f)
						})
					},
					cancel: function() {
						return $.dialog.confirm("未完善相关出入库单据会影响本次盘点数据，确定要取消吗？", function() {
							parent.Cache[f] = null, $("#search").trigger("click"), b.pop.close()
						}), !1
					}
				})
			}
		},
		addEvent: function() {
			var a = this;
			$("#search").click(function() {
				queryConditions = {
					locationId: a.storageCombo.getValue(),
					categoryId: a.categoryTree.getValue(),
					goods: a.$_goods.val(),
					showZero: 0,
					isSerNum: 0
				};
				var b = a.chkField.chkVal();
				if (b.length) for (var c = b.length - 1; c >= 0; c--) queryConditions[b[c]] = 1;
				a.reloadData(queryConditions), a.loaded || ($(".ui-jqgrid-bdiv").removeClass("no-query"), a.loaded = !0, $("#handleDom").show(), $(".mod-search .fr").show())
			}), $("#save").click(function() {
				var b = a._getEntriesData();
				if (!(b.length > 0)) return parent.Public.tips({
					type: 2,
					content: "商品信息不能为空！"
				}), $("#grid").jqGrid("editCell", 1, 2, !0), !1;
				var c = new Date,
					d = {
						entries: b,
						description: $.trim(a.$_note.val()),
						date: c.format("yyyy-MM-dd")
					};
				Public.ajaxPost("../scm/invOi/generatorPD?action=generatorPD", {
					postData: JSON.stringify(d)
				}, function(b) {
					200 === b.status ? a.manager.makeOrder(b.data) : parent.Public.tips({
						type: 1,
						content: b.msg
					})
				})
			}), $("#export").click(function(a) {
				return Business.verifyRight("PD_EXPORT") ? void $(this).attr("href", "../scm/invOi/exportToPD?action=exportToPD&locationId=" + queryConditions.locationId + "&categoryId=" + queryConditions.categoryId + "&goods=" + queryConditions.goods + "&showZero=" + queryConditions.showZero + "&isSerNum=" + queryConditions.isSerNum) : void a.preventDefault()
			}), $("#import").click(function() {
				if (!Business.verifyRight("PD_IMPORT")) return void e.preventDefault();
				var b, c = this;
				c.import_dialog = $.dialog({
					width: 520,
					height: 150,
					title: "批量导入",
					content: "url:../storage/import",
					data: {
						curID: a.curID,
						callback: function(b) {
							var d = "上传失败！";
							if (b && b.msg) {
								if ("success" === b.msg) return c.loading.close(), c.import_dialog.close(), void a.manager.makeOrder(b.data);
								d = b.msg
							}
							parent.Public.tips({
								type: 1,
								content: d
							}), c.loading.close()
						}
					},
					lock: !0,
					ok: function() {
						return b = this.content.$("#file-path"), "" === b.val() ? (parent.Public.tips({
							type: 2,
							content: "请先选择导入的文件！"
						}), !1) : (c.loading = $.dialog.tips("正在导入数据，请稍候...", 1e3, "loading.gif", !0), this.content.callback(), !1)
					},
					cancel: !0
				})
			}), $(document).bind("click.cancel", function(a) {
				!$(a.target).closest(".ui-jqgrid-btable").length > 0 && null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null)
			}), $(window).resize(function() {
				Public.resizeGrid(94)
			})
		}
	};
THISPAGE.init();