var curRow, curCol, curArrears, loading, urlParam = Public.urlParam(),
	SYSTEM = parent.SYSTEM,
	hiddenAmount = !1,
	qtyPlaces = Number(parent.SYSTEM.qtyPlaces),
	pricePlaces = Number(parent.SYSTEM.pricePlaces),
	amountPlaces = Number(parent.SYSTEM.amountPlaces),
	hasLoaded = !1,
	originalData, isTemp, THISPAGE = {
		init: function(a) {
			SYSTEM.isAdmin !== !1 || SYSTEM.rights.AMOUNT_COSTAMOUNT || (hiddenAmount = !0), this.loadGrid(a), this.initDom(a), this.initCombo(), this.addEvent()
		},
		initDom: function(a) {
			if (this.btype = "", this.$_customer = $("#customer"), this.$_date = $("#date").val(SYSTEM.endDate), this.$_number = $("#number"), this.$_amount = $("#amount"), this.$_note = $("#note"), this.$_toolTop = $("#toolTop"), this.$_toolBottom = $("#toolBottom"), this.$_userName = $("#userName"), this.customerArrears = 0, "add" === a.status);
			else {
				["id", a.transType]
			}
			this.$_note.placeholder(), this.$_date.datepicker(), this.$_amount.val(a.amount), a.id > 0 ? (this.$_number.text(a.billNo), this.$_date.val(a.date), a.description && this.$_note.val(a.description), $("#grid").jqGrid("footerData", "set", {
				qty: a.totalQty,
				amount: a.totalAmount
			}), this.$_toolBottom.html("edit" === a.status ? '<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a target="_blank" id="print" class="ui-btn mrb">打印</a><a id="edit" class="ui-btn">保存</a>' : '<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a target="_blank" id="print" class="ui-btn mrb">打印</a><a class="ui-btn-prev mrb" id="prev" title="上一张"><b></b></a><a class="ui-btn-next" id="next" title="下一张"><b></b></a>'), this.salesListIds = parent.salesListIds || [], this.idPostion = $.inArray(String(a.id), this.salesListIds), this.idLength = this.salesListIds.length, 0 === this.idPostion && $("#prev").addClass("ui-btn-prev-dis"), this.idPostion === this.idLength - 1 && $("#next").addClass("ui-btn-next-dis"), this.$_userName.html(a.userName)) : (this.$_toolBottom.html('<a id="savaAndAdd" class="ui-btn ui-btn-sp mrb">保存并新增</a><a id="save" class="ui-btn">保存</a>'), this.$_userName.html(SYSTEM.realName || ""))
		},
		loadGrid: function(a) {
			function b() {
				var a = $(".goodsAuto_0")[0];
				return a
			}
			function c(a, b, c) {
				if ("get" === b) {
					if ("" !== $(".goodsAuto_0").getCombo().getValue()) return $(a).val();
					var d = $(a).parents("tr");
					return d.removeData("goodsInfo"), ""
				}
				"set" === b && $("input", a).val(c)
			}
			function d() {
				$("#initCombo").append($(".goodsAuto_0").val("").unbind("focus.once"))
			}
			function e() {
				var a = $(".storageAuto_0")[0];
				return a
			}
			function f(a, b, c) {
				if ("get" === b) {
					if ("" !== $(".storageAuto_0").getCombo().getValue()) return $(a).val();
					var d = $(a).parents("tr");
					return d.removeData("storageInfo"), ""
				}
				"set" === b && $("input", a).val(c)
			}
			function g() {
				$("#initCombo").append($(".storageAuto_0").val(""))
			}
			function h() {
				var a = $(".unitAuto_0")[0];
				return a
			}
			function i(a, b, c) {
				if ("get" === b) {
					if ("" !== $(".unitAuto_0").getCombo().getValue()) return $(a).val();
					var d = $(a).parents("tr");
					return d.removeData("unitInfo"), ""
				}
				"set" === b && $("input", a).val(c)
			}
			function j() {
				$("#initCombo").append($(".unitAuto_0").val(""))
			}
			function k(a, b, c) {
				return a ? (v(b.rowId), a) : c.invNumber ? c.invSpec ? c.invNumber + " " + c.invName + "_" + c.invSpec : c.invNumber + " " + c.invName : "&#160;"
			}
			function l(a, b, c) {
				return a ? (v("fix1", $("#fixedGrid")), a) : c.invNumber ? c.invSpec ? c.invNumber + " " + c.invName + "_" + c.invSpec : c.invNumber + " " + c.invName : "&#160;"
			}
			function m() {
				var a = $(".goodsAuto")[0];
				return a
			}
			function n(a, b, c) {
				if ("get" === b) {
					if ("" !== w.goodsCombo.getValue()) return w.goodsCombo.getText();
					var d = $(a).parents("tr");
					return d.removeData("goodsInfo"), ""
				}
				"set" === b && $("input", a).val(c)
			}
			function o() {
				$("#initCombo").append($(".goodsAuto").val("").unbind("focus.once"))
			}
			function p() {
				var a = $(".storageAuto")[0];
				return a
			}
			function q(a, b, c) {
				if ("get" === b) {
					if ("" !== $(".storageAuto").getCombo().getValue()) return $(a).val();
					var d = $(a).parents("tr");
					return d.removeData("storageInfo"), ""
				}
				"set" === b && $("input", a).val(c)
			}
			function r() {
				$("#initCombo").append($(".storageAuto").val(""))
			}
			function s() {
				var a = $(".unitAuto")[0];
				return a
			}
			function t(a, b, c) {
				if ("get" === b) {
					if ("" !== $(".unitAuto").getCombo().getValue()) return $(a).val();
					var d = $(a).parents("tr");
					return d.removeData("unitInfo"), ""
				}
				"set" === b && $("input", a).val(c)
			}
			function u() {
				$("#initCombo").append($(".unitAuto").val(""))
			}
			function v(a, b) {
				b = b || $("#grid");
				var c = $("#" + a).data("goodsInfo");
				if (c) {
					var d = {
						skuId: c.skuId || -1,
						skuName: c.skuName || "",
						mainUnit: c.mainUnit || c.unitName,
						unitId: c.unitId,
						qty: c.qty || 1,
						price: c.price || 0,
						discountRate: c.discountRate || 0,
						deduction: c.deduction || 0,
						amount: c.amount || 0,
						locationName: c.locationName,
						locationId: c.locationId,
						serNumList: c.serNumList
					};
					SYSTEM.ISSERNUM && 1 == c.isSerNum && (d.qty = c.serNumList ? c.serNumList.length : 0), d.amount = d.amount ? d.amount : d.price * d.qty; {
						Number(d.amount)
					}
					setTimeout(function() {
						var c = b.jqGrid("setRowData", a, d);
						c && THISPAGE.calTotal()
					}, 100)
				}
			}
			var w = this;
			if (a.id) {
				var x = 6 - a.entries.length;
				if (x > 0) for (var y = 0; x > y; y++) a.entries.push({})
			}
			w.newId = 6;
			var z = "fix";
			$("#fixedGrid").jqGrid({
				data: [a.entries.shift()],
				datatype: "clientSide",
				autowidth: !0,
				height: "100%",
				rownumbers: !0,
				gridview: !0,
				onselectrow: !1,
				colModel: [{
					name: "goods",
					label: "商品",
					width: 370,
					title: !0,
					classes: "ui-ellipsis",
					formatter: l,
					editable: !0,
					edittype: "custom",
					editoptions: {
						custom_element: b,
						custom_value: c,
						handle: d,
						trigger: "ui-icon-ellipsis"
					}
				}, {
					name: "skuId",
					label: "属性ID",
					hidden: !0
				}, {
					name: "skuName",
					label: "属性",
					width: 100,
					classes: "ui-ellipsis",
					hidden: !SYSTEM.enableAssistingProp
				}, {
					name: "mainUnit",
					label: "单位",
					width: 80,
					editable: !0,
					edittype: "custom",
					editoptions: {
						custom_element: h,
						custom_value: i,
						handle: j,
						trigger: "ui-icon-triangle-1-s"
					}
				}, {
					name: "unitId",
					label: "单位Id",
					hidden: !0
				}, {
					name: "qty",
					label: "数量",
					width: 80,
					align: "right",
					formatter: "number",
					formatoptions: {
						decimalPlaces: qtyPlaces
					},
					editable: !0
				}, {
					name: "price",
					label: "入库单位成本",
					hidden: hiddenAmount,
					width: 100,
					fixed: !0,
					align: "right",
					formatter: "currency",
					formatoptions: {
						showZero: !0,
						decimalPlaces: pricePlaces
					}
				}, {
					name: "amount",
					label: "入库成本",
					hidden: hiddenAmount,
					width: 100,
					fixed: !0,
					align: "right",
					formatter: "currency",
					formatoptions: {
						showZero: !0,
						decimalPlaces: amountPlaces
					}
				}, {
					name: "locationName",
					label: "仓库",
					width: 100,
					title: !0,
					editable: !0,
					edittype: "custom",
					editoptions: {
						custom_element: e,
						custom_value: f,
						handle: g,
						trigger: "ui-icon-triangle-1-s"
					}
				}],
				cmTemplate: {
					sortable: !1,
					title: !1
				},
				idPrefix: z,
				shrinkToFit: !0,
				forceFit: !1,
				rowNum: 1e3,
				cellEdit: !1,
				cellsubmit: "clientArray",
				localReader: {
					root: "rows",
					records: "records",
					repeatitems: !1,
					id: "id"
				},
				jsonReader: {
					root: "data.entries",
					records: "records",
					repeatitems: !1,
					id: "id"
				},
				loadComplete: function(a) {
					if (urlParam.id > 0 || isTemp) {
						var b = a.rows,
							c = b.length;
						w.newId = c + 1;
						for (var d = 0; c > d; d++) {
							var e = d + 1,
								f = b[d];
							if ($.isEmptyObject(b[d])) break;
							var g = $.extend(!0, {
								id: f.invId,
								number: f.invNumber,
								name: f.invName,
								spec: f.invSpec,
								unitId: f.unitId,
								unitName: f.mainUnit,
								isSerNum: f.isSerNum,
								serNumList: f.serNumList || f.invSerNumList
							}, f);
							Business.cacheManage.getGoodsInfoByNumber(g.number, function(a) {
								g.isSerNum = a.isSerNum, g.id = f.invId, $("#" + z + e).data("goodsInfo", g).data("storageInfo", {
									id: f.locationId,
									name: f.locationName
								}).data("unitInfo", {
									unitId: f.unitId,
									name: f.mainUnit
								})
							})
						}
					}
				},
				gridComplete: function() {
					setTimeout(function() {
						Public.autoGrid($("#fixedGrid"))
					}, 10)
				},
				beforeEditCell: function(a, b, c) {
					"qty" === b && (lastTemlQty = Number(c))
				},
				afterEditCell: function(a, b, c, d, e) {
					function f() {
						var b = $("#" + a).data("goodsInfo");
						if (b) {
							var c = $("#fixedGrid").jqGrid("getRowData", a);
							b = $.extend(!0, {}, b), b.mainUnit = c.mainUnit, b.unitId = c.unitId, b.qty = c.qty, b.price = c.price, b.discountRate = c.discountRate, b.deduction = c.deduction, b.amount = c.amount, b.taxRate = c.taxRate, b.tax = c.tax, b.taxAmount = c.taxAmount, b.locationName = c.locationName, $("#" + a).data("goodsInfo", b)
						}
					}
					if ("goods" === b && (f(), $("#" + d + "_goods", "#fixedGrid").val(c), THISPAGE.goodsCombo_0.selectByText(c), THISPAGE.curID = a), "qty" === b) {
						f();
						var g = $("#" + a).data("goodsInfo");
						if (!g) return;
						if (SYSTEM.ISSERNUM && 1 == g.isSerNum) {
							$("#fixedGrid").jqGrid("restoreCell", d, e), THISPAGE.curID = a;
							var h = g.serNumList;
							Business.serNumManage({
								row: $("#" + a),
								data: g,
								serNumUsedList: h,
								creatable: !0
							})
						}
					}
					if ("locationName" === b && $("#" + d + "_locationName", "#fixedGrid").val(c), "mainUnit" === b) {
						$("#" + d + "_mainUnit", "#fixedGrid").val(c);
						var i = $("#" + a).data("unitInfo") || {};
						if (!i.unitId || "0" === i.unitId) return void $("#fixedGrid").jqGrid("saveCell", d, e);
						THISPAGE.unitCombo_0.enable(), THISPAGE.unitCombo_0.loadData(function() {
							for (var a = {}, b = 0; b < SYSTEM.unitInfo.length; b++) {
								var c = SYSTEM.unitInfo[b],
									d = i.unitId;
								i.unitId == c.id && (i = c), i.unitId = d;
								var e = c.unitTypeId || b;
								a[e] || (a[e] = []), a[e].push(c)
							}
							return i.unitTypeId ? a[i.unitTypeId] : [i]
						}), THISPAGE.unitCombo_0.selectByText(c)
					}
				},
				formatCell: function() {},
				beforeSubmitCell: function() {},
				beforeSaveCell: function(a, b, c) {
					if ("goods" === b) {
						var d = $("#" + a).data("goodsInfo");
						if (d) return d.skuClassId && SYSTEM.enableAssistingProp && (w.skey = c, setTimeout(function() {
							$("#grid").jqGrid("restoreCell", curRow, 2), $("#grid").jqGrid("editCell", curRow, 2, !0), $("#grid").jqGrid("setCell", curRow, 2, "")
						}, 10)), c;
						w.skey = c;
						var e, f = function(b) {
								SYSTEM.ISSERNUM && b.isSerNum ? (Business.serNumManage({
									row: $("#" + a),
									data: b,
									creatable: !0
								}), e = "&#160;") : b.skuClassId && SYSTEM.enableAssistingProp ? (Business.billSkuManage($("#" + a), b), e = "&#160;") : ($("#" + a).data("goodsInfo", b).data("storageInfo", {
									id: b.locationId,
									name: b.locationName
								}).data("unitInfo", {
									unitId: b.unitId,
									name: b.unitName
								}), e = Business.formatGoodsName(b))
							};
						return THISPAGE.$_barCodeInsert && THISPAGE.$_barCodeInsert.hasClass("active") ? Business.cacheManage.getGoodsInfoByBarCode(c, f, !0) : Business.cacheManage.getGoodsInfoByNumber(c, f, !0), e ? e : ($.dialog({
							width: 775,
							height: 510,
							title: "选择商品",
							content: "url:/settings/goods-batch.jsp",
							data: {
								skuMult: SYSTEM.enableAssistingProp,
								skey: w.skey,
								callback: function(a, b, c) {
									"" === b && ($("#grid").jqGrid("addRowData", a, {}, "last"), w.newId = a + 1), setTimeout(function() {
										$("#grid").jqGrid("editCell", c, 2, !0)
									}, 10), w.calTotal()
								}
							},
							init: function() {
								w.skey = ""
							},
							lock: !0,
							button: [{
								name: "选中",
								defClass: "ui_state_highlight fl",
								focus: !0,
								callback: function() {
									return this.content.callback && this.content.callback(), !1
								}
							}, {
								name: "选中并关闭",
								defClass: "ui_state_highlight",
								callback: function() {
									return this.content.callback(), this.close(), !1
								}
							}, {
								name: "关闭",
								callback: function() {
									return !0
								}
							}]
						}), setTimeout(function() {
							$("#grid").jqGrid("editCell", curRow, 2, !0), $("#grid").jqGrid("setCell", curRow, 2, "")
						}, 10), "&#160;")
					}
				},
				afterSaveCell: function(a, b, c, d, e) {
					if ("qty" === b && isTemp) {
						$("#grid").find('[aria-describedby="grid_qty"]').each(function() {
							var a = $(this),
								b = Number(a.text());
							0 !== b && a.text((b * Number(c) / lastTemlQty).toFixed(qtyPlaces))
						});
						var f = parseFloat(c),
							g = parseFloat($("#fixedGrid").jqGrid("getCell", a, e + 1));
						if ($.isNumeric(g)) {
							$("#fixedGrid").jqGrid("setRowData", a, {
								amount: f * g
							})
						}
						THISPAGE.calTotal()
					}
				},
				loadonce: !0,
				loadError: function(a, b) {
					Public.tips({
						type: 1,
						content: "Type: " + b + "; Response: " + a.status + " " + a.statusText
					})
				}
			}), $("#fixedGrid").jqGrid("setGridParam", {
				cellEdit: !0
			}), $("#grid").jqGrid({
				data: a.entries,
				datatype: "clientSide",
				width: 1e3,
				height: "100%",
				rownumbers: !0,
				gridview: !0,
				onselectrow: !1,
				colModel: [{
					name: "operating",
					label: " ",
					width: 40,
					fixed: !0,
					formatter: Public.billsOper,
					align: "center"
				}, {
					name: "goods",
					label: "商品",
					width: 330,
					title: !0,
					classes: "ui-ellipsis",
					formatter: k,
					editable: !0,
					edittype: "custom",
					editoptions: {
						custom_element: m,
						custom_value: n,
						handle: o,
						trigger: "ui-icon-ellipsis"
					}
				}, {
					name: "skuId",
					label: "属性ID",
					hidden: !0
				}, {
					name: "skuName",
					label: "属性",
					width: 100,
					classes: "ui-ellipsis",
					hidden: !SYSTEM.enableAssistingProp
				}, {
					name: "mainUnit",
					label: "单位",
					width: 80,
					editable: !0,
					edittype: "custom",
					editoptions: {
						custom_element: s,
						custom_value: t,
						handle: u,
						trigger: "ui-icon-triangle-1-s"
					}
				}, {
					name: "unitId",
					label: "单位Id",
					hidden: !0
				}, {
					name: "qty",
					label: "数量",
					width: 80,
					align: "right",
					formatter: "number",
					formatoptions: {
						decimalPlaces: qtyPlaces
					},
					editable: !0
				}, {
					name: "price",
					label: "出库单位成本",
					hidden: hiddenAmount,
					width: 100,
					fixed: !0,
					align: "right",
					formatter: "currency",
					formatoptions: {
						showZero: !0,
						decimalPlaces: pricePlaces
					}
				}, {
					name: "amount",
					label: "出库成本",
					hidden: hiddenAmount,
					width: 100,
					fixed: !0,
					align: "right",
					formatter: "currency",
					formatoptions: {
						showZero: !0,
						decimalPlaces: amountPlaces
					}
				}, {
					name: "locationName",
					label: '仓库<small id="batchStorage">(批量)</small>',
					width: 100,
					title: !0,
					editable: !0,
					edittype: "custom",
					editoptions: {
						custom_element: p,
						custom_value: q,
						handle: r,
						trigger: "ui-icon-triangle-1-s"
					}
				}, {
					name: "description",
					label: "备注",
					width: 100,
					title: !0,
					classes: "ui-ellipsis",
					editable: !0
				}],
				cmTemplate: {
					sortable: !1,
					title: !1
				},
				shrinkToFit: !0,
				forceFit: !0,
				rowNum: 1e3,
				cellEdit: !1,
				cellsubmit: "clientArray",
				localReader: {
					root: "rows",
					records: "records",
					repeatitems: !1,
					id: "id"
				},
				jsonReader: {
					root: "data.entries",
					records: "records",
					repeatitems: !1,
					id: "id"
				},
				loadComplete: function(a) {
					if (urlParam.id > 0 || isTemp) {
						var b = a.rows,
							c = b.length;
						w.newId = c + 1;
						for (var d = 0; c > d; d++) {
							var e = d + 1,
								f = b[d];
							if ($.isEmptyObject(b[d])) break;
							var g = $.extend(!0, {
								id: f.invId,
								number: f.invNumber,
								name: f.invName,
								spec: f.invSpec,
								unitId: f.unitId,
								unitName: f.mainUnit,
								isSerNum: f.isSerNum,
								serNumList: f.serNumList || f.invSerNumList
							}, f);
							Business.cacheManage.getGoodsInfoByNumber(g.number, function(a) {
								g.isSerNum = a.isSerNum, g.id = f.invId, $("#" + e).data("goodsInfo", g).data("storageInfo", {
									id: f.locationId,
									name: f.locationName
								}).data("unitInfo", {
									unitId: f.unitId,
									name: f.mainUnit
								})
							})
						}
					}
				},
				gridComplete: function() {
					setTimeout(function() {
						Public.autoGrid($("#grid"))
					}, 10)
				},
				beforeEditCell: function() {},
				afterEditCell: function(a, b, c, d, e) {
					function f() {
						var b = $("#" + a).data("goodsInfo");
						if (b) {
							var c = $("#grid").jqGrid("getRowData", a);
							b = $.extend(!0, {}, b), b.mainUnit = c.mainUnit, b.unitId = c.unitId, b.qty = c.qty, b.price = c.price, b.discountRate = c.discountRate, b.deduction = c.deduction, b.amount = c.amount, b.taxRate = c.taxRate, b.tax = c.tax, b.taxAmount = c.taxAmount, b.locationName = c.locationName, $("#" + a).data("goodsInfo", b)
						}
					}
					if ("goods" === b && (f(), $("#" + d + "_goods", "#grid").val(c), THISPAGE.goodsCombo.selectByText(c), THISPAGE.curID = a), "qty" === b) {
						f();
						var g = $("#" + a).data("goodsInfo");
						if (!g) return;
						if (SYSTEM.ISSERNUM && 1 == g.isSerNum) {
							$("#grid").jqGrid("restoreCell", d, e), THISPAGE.curID = a;
							var h = g.serNumList;
							Business.serNumManage({
								row: $("#" + a),
								data: g,
								serNumUsedList: h
							})
						}
					}
					if ("locationName" === b) {
						$("#" + d + "_locationName", "#grid").val(c), f();
						var g = $("#" + a).data("goodsInfo"),
							i = $("#" + a).data("storageInfo") || {};
						if (!g || !i.id) return;
						if (SYSTEM.ISSERNUM && 1 == g.isSerNum) {
							$("#grid").jqGrid("restoreCell", d, e), THISPAGE.curID = a;
							var h = g.serNumList;
							Business.serNumManage({
								row: $("#" + a),
								data: g,
								serNumUsedList: h,
								enableStorage: !0
							})
						}
					}
					if ("mainUnit" === b) {
						$("#" + d + "_mainUnit", "#grid").val(c);
						var j = $("#" + a).data("unitInfo") || {};
						if (!j.unitId || "0" === j.unitId) return void $("#grid").jqGrid("saveCell", d, e);
						THISPAGE.unitCombo.enable(), THISPAGE.unitCombo.loadData(function() {
							for (var a = {}, b = 0; b < SYSTEM.unitInfo.length; b++) {
								var c = SYSTEM.unitInfo[b],
									d = j.unitId;
								j.unitId == c.id && (j = c), j.unitId = d;
								var e = c.unitTypeId || b;
								a[e] || (a[e] = []), a[e].push(c)
							}
							return j.unitTypeId ? a[j.unitTypeId] : [j]
						}), THISPAGE.unitCombo.selectByText(c)
					}
				},
				formatCell: function() {},
				beforeSubmitCell: function() {},
				beforeSaveCell: function(a, b, c) {
					if ("goods" === b) {
						var d = $("#" + a).data("goodsInfo");
						if (d) return d.skuClassId && SYSTEM.enableAssistingProp && (w.skey = c, setTimeout(function() {
							$("#grid").jqGrid("restoreCell", curRow, 2), $("#grid").jqGrid("editCell", curRow, 2, !0), $("#grid").jqGrid("setCell", curRow, 2, "")
						}, 10)), c;
						w.skey = c;
						var e, f = function(b) {
								SYSTEM.ISSERNUM && b.isSerNum ? (Business.serNumManage({
									row: $("#" + a),
									data: b
								}), e = "&#160;") : b.skuClassId && SYSTEM.enableAssistingProp ? (Business.billSkuManage($("#" + a), b), e = "&#160;") : ($("#" + a).data("goodsInfo", b).data("storageInfo", {
									id: b.locationId,
									name: b.locationName
								}).data("unitInfo", {
									unitId: b.unitId,
									name: b.unitName
								}), e = Business.formatGoodsName(b))
							};
						return THISPAGE.$_barCodeInsert && THISPAGE.$_barCodeInsert.hasClass("active") ? Business.cacheManage.getGoodsInfoByBarCode(c, f) : Business.cacheManage.getGoodsInfoByNumber(c, f), e ? e : ($.dialog({
							width: 775,
							height: 510,
							title: "选择商品",
							content: "url:../settings/goods_batch",
							data: {
								skuMult: SYSTEM.enableAssistingProp,
								skey: w.skey,
								callback: function(a, b, c) {
									"" === b && ($("#grid").jqGrid("addRowData", a, {}, "last"), w.newId = a + 1), setTimeout(function() {
										$("#grid").jqGrid("editCell", c, 2, !0)
									}, 10), w.calTotal()
								}
							},
							init: function() {
								w.skey = ""
							},
							lock: !0,
							button: [{
								name: "选中",
								defClass: "ui_state_highlight fl",
								focus: !0,
								callback: function() {
									return this.content.callback && this.content.callback(), !1
								}
							}, {
								name: "选中并关闭",
								defClass: "ui_state_highlight",
								callback: function() {
									return this.content.callback(), this.close(), !1
								}
							}, {
								name: "关闭",
								callback: function() {
									return !0
								}
							}]
						}), setTimeout(function() {
							$("#grid").jqGrid("editCell", curRow, 2, !0), $("#grid").jqGrid("setCell", curRow, 2, "")
						}, 10), "&#160;")
					}
				},
				afterSaveCell: function(a, b) {
					"qty" == b && THISPAGE.calTotal()
				},
				loadonce: !0,
				footerrow: !0,
				userData: {
					goods: "合计：",
					qty: a.totalQty,
					amount: a.totalAmount
				},
				userDataOnFooter: !0,
				loadError: function(a, b) {
					Public.tips({
						type: 1,
						content: "Type: " + b + "; Response: " + a.status + " " + a.statusText
					})
				}
			}), $("#grid").jqGrid("setGridParam", {
				cellEdit: !0
			})
		},
		reloadData: function(a) {
			function b() {
				d.$_date.val(isTemp ? SYSTEM.endDate : a.date), d.$_number.text(a.billNo), d.$_amount.val(a.amount), d.$_note.html(a.note)
			}
			for (var c = 1; c < a.entries.length; c++) a.entries[c].id -= 1;
			$("#grid").clearGridData(!0), $("#fixedGrid").clearGridData();
			var d = this,
				e = 6 - a.entries.length;
			if (e > 0) for (var c = 0; e > c; c++) a.entries.push({});
			"edit" === a.status || isTemp ? ($("#fixedGrid").jqGrid("setGridParam", {
				data: [a.entries.shift()],
				cellEdit: !0,
				datatype: "clientSide"
			}).trigger("reloadGrid"), $("#grid").jqGrid("setGridParam", {
				data: a.entries,
				userData: {
					qty: a.totalQty,
					amount: a.totalAmount
				},
				cellEdit: !0,
				datatype: "clientSide"
			}).trigger("reloadGrid"), b(), this.editable || (this.$_date.removeAttr("disabled"), this.editable = !0)) : ($("#grid").jqGrid("setGridParam", {
				url: "",
				datatype: "json",
				cellEdit: !1
			}).trigger("reloadGrid"), b(), this.editable && (this.$_data.attr(disabled, "disabled"), this.editable = !1))
		},
		initCombo: function() {
			this.goodsCombo_0 = Business.billGoodsCombo($(".goodsAuto_0"), {
				userData: {
					creatable: !0
				}
			}), this.goodsCombo = Business.billGoodsCombo($(".goodsAuto")), this.storageCombo_0 = Business.billStorageCombo($(".storageAuto_0")), this.storageCombo = Business.billStorageCombo($(".storageAuto")), this.unitCombo_0 = Business.unitCombo($(".unitAuto_0"), {
				defaultSelected: -1,
				forceSelection: !1
			}), this.unitCombo = Business.unitCombo($(".unitAuto"), {
				defaultSelected: -1,
				forceSelection: !1
			})
		},
		addEvent: function() {
			var a = this;
			this.$_date.bind("keydown", function(a) {
				13 === a.which && $("#grid").jqGrid("editCell", 1, 2, !0)
			}).bind("focus", function() {
				a.dateValue = $(this).val()
			}).bind("blur", function() {
				var b = /((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/;
				b.test($(this).val()) || (parent.Public.tips({
					type: 2,
					content: "日期格式有误！如：2012-08-08。"
				}), $(this).val(a.dateValue))
			}), THISPAGE.$_amount.on("keypress", function(a) {
				Public.numerical(a)
			}).on("click", function() {
				this.select()
			}).on("blur", function() {
				var a = $("#fixedGrid").jqGrid("getRowData", "fix1"),
					b = Number($(this).val()) + Number($("#grid").jqGrid("footerData", "get").amount.replace(/,/g, "")),
					c = b / Number(a.qty);
				$("#fixedGrid").jqGrid("setRowData", "fix1", {
					price: c,
					amount: b
				})
			}), $(".grid-wrap").on("click", ".ui-icon-triangle-1-s", function() {
				var b = $(this).siblings();
				setTimeout(function() {
					b.hasClass("unitAuto") || b.hasClass("unitAuto_0") ? b.trigger("click") : b.hasClass("storageAuto") ? (a.storageCombo.active = !0, a.storageCombo.doQuery()) : (a.storageCombo_0.active = !0, a.storageCombo_0.doQuery())
				}, 10)
			}), Business.billsEvent(a, "assemble"), $("#fixedGrid").on("click", ".ui-icon-ellipsis", function() {
				$(this).prev("input");
				$.dialog({
					width: 775,
					height: 510,
					title: "选择商品",
					content: "url:../settings/goods_batch",
					data: {
						skuMult: SYSTEM.enableAssistingProp,
						curID: a.curID,
						newId: a.newId,
						callback: function() {}
					},
					lock: !0,
					button: [{
						name: "确定",
						defClass: "ui_state_highlight",
						callback: function() {
							return this.content.callbackSp("assemble"), this.close(), !1
						}
					}, {
						name: "关闭",
						callback: function() {
							return !0
						}
					}]
				})
			}), $("#grid").on("click", ".ui-icon-ellipsis", function() {
				$(this).prev("input");
				$.dialog({
					width: 775,
					height: 510,
					title: "选择商品",
					content: "url:../settings/goods_batch",
					data: {
						skuMult: SYSTEM.enableAssistingProp,
						curID: a.curID,
						newId: a.newId,
						callback: function(b, c, d) {
							"" === c && ($("#grid").jqGrid("addRowData", b, {}, "last"), a.newId = b + 1), setTimeout(function() {
								$("#grid").jqGrid("editCell", d, 2, !0)
							}, 10), a.calTotal()
						}
					},
					lock: !0,
					button: [{
						name: "选中",
						defClass: "ui_state_highlight fl",
						callback: function() {
							return this.content.callback("assemble"), !1
						}
					}, {
						name: "选中并关闭",
						defClass: "ui_state_highlight",
						callback: function() {
							return this.content.callback("assemble"), this.close(), !1
						}
					}, {
						name: "关闭",
						callback: function() {
							return !0
						}
					}]
				})
			}), $(document).bind("click.cancel", function(a) {
				null !== curRow && null !== curCol && (!$(a.target).closest("#fixedGrid").length > 0 && $("#fixedGrid").jqGrid("saveCell", curRow, curCol), !$(a.target).closest("#grid").length > 0 && $("#grid").jqGrid("saveCell", curRow, curCol))
			}), $(".wrapper").on("click", "#save", function(b) {
				b.preventDefault();
				var c = $(this);
				if (c.hasClass("ui-btn-dis")) return void parent.Public.tips({
					type: 2,
					content: "正在保存，请稍后..."
				});
				THISPAGE.$_amount.trigger("blur");
				var d = THISPAGE.getPostData();
				d && ("edit" === originalData.stata && (d.id = originalData.id, d.stata = "edit"), c.addClass("ui-btn-dis"), Public.ajaxPost("../../scm/invOi/addZz?action=addZz&type=zz", {
					postData: JSON.stringify(d)
				}, function(b) {
					c.removeClass("ui-btn-dis"), 200 === b.status ? (originalData.id = b.data.id, urlParam.id = b.data.id, THISPAGE.reloadData(b.data), a.$_toolBottom.html('<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a id="edit" class="ui-btn mrb">保存</a><a href="/scm/invOi.do?action=toOoPdf&id=' + originalData.id + '" target="_blank" id="print" class="ui-btn">打印</a>'), parent.Public.tips({
						content: "保存成功！"
					})) : parent.Public.tips({
						type: 1,
						content: b.msg
					})
				}))
			}), $(".wrapper").on("click", "#edit", function(a) {
				if (a.preventDefault(), Business.verifyRight("ZZD_UPDATE")) {
					var b = THISPAGE.getPostData();
					b && Public.ajaxPost("../../scm/invOi/updateZz?action=updateZz&type=zz", {
						postData: JSON.stringify(b)
					}, function(a) {
						200 === a.status ? (originalData.id = a.data.id, urlParam.id = a.data.id, THISPAGE.reloadData(a.data), parent.Public.tips({
							content: "修改成功！"
						})) : parent.Public.tips({
							type: 1,
							content: a.msg
						})
					})
				}
			}), $(".wrapper").on("click", "#savaAndAdd", function(b) {
				b.preventDefault();
				var c = $(this);
				if (c.hasClass("ui-btn-dis")) return void parent.Public.tips({
					type: 2,
					content: "正在保存，请稍后..."
				});
				var d = THISPAGE.getPostData();
				d && (c.addClass("ui-btn-dis"), Public.ajaxPost("../../scm/invOi/addNewZz?action=addNewZz&type=zz", {
					postData: JSON.stringify(d)
				}, function(b) {
					if (c.removeClass("ui-btn-dis"), 200 === b.status) {
						a.$_number.text(b.data.billNo), $("#fixedGrid").clearGridData(), $("#grid").clearGridData(!0), $("#fixedGrid").jqGrid("addRowData", 1, {});
						for (var d = 1; 5 >= d; d++) $("#grid").jqGrid("addRowData", d, {});
						a.newId = 6, a.$_note.val(""), parent.Public.tips({
							content: "保存成功！"
						})
					} else parent.Public.tips({
						type: 1,
						content: b.msg
					})
				}))
			}), $(".wrapper").on("click", "#add", function(a) {
				a.preventDefault(), Business.verifyRight("ZZD_ADD") && parent.tab.overrideSelectedTabItem({
					tabid: "storage-otherOutbound",
					text: "组装单",
					url: "scm/invOi/initOi?action=initOi&type=zz"
				})
			}), $(".wrapper").on("click", "#print", function(a) {
				a.preventDefault(), Business.verifyRight("ZZD_PRINT") && Public.print({
					title: "组装单列表",
					$grid: $("#grid"),
					pdf: "/scm/invOi.do?action=toZzdPdf",
					billType: 10419,
					filterConditions: {
						id: originalData.id
					}
				})
			}), $("#prev").click(function(b) {
				return b.preventDefault(), $(this).hasClass("ui-btn-prev-dis") ? (parent.Public.tips({
					type: 2,
					content: "已经没有上一张了！"
				}), !1) : (a.idPostion = a.idPostion - 1, 0 === a.idPostion && $(this).addClass("ui-btn-prev-dis"), loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("/scm/invOi.do?action=updateOut&type=zz", {
					id: a.salesListIds[a.idPostion]
				}, function(a) {
					THISPAGE.reloadData(a.data), $("#next").removeClass("ui-btn-next-dis"), loading && loading.close()
				}), void 0)
			}), $("#next").click(function(b) {
				return b.preventDefault(), $(this).hasClass("ui-btn-next-dis") ? (parent.Public.tips({
					type: 2,
					content: "已经没有下一张了！"
				}), !1) : (a.idPostion = a.idPostion + 1, a.idLength === a.idPostion + 1 && $(this).addClass("ui-btn-next-dis"), loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("/scm/invOi.do?action=updateOut&type=zz", {
					id: a.salesListIds[a.idPostion]
				}, function(a) {
					THISPAGE.reloadData(a.data), $("#prev").removeClass("ui-btn-prev-dis"), loading && loading.close()
				}), void 0)
			}), $(".wrapper").on("click", "#saveTemp", function(a) {
				a.preventDefault(), THISPAGE.$_amount.trigger("blur");
				var b = THISPAGE.getPostData();
				if (b.id = -1, b) {
					var c = Number(b.entries[0].qty);
					if (1 !== c) {
						for (var d = 1; d < b.entries.length; d++) b.entries[d].qty = Number(b.entries[d].qty) / c;
						b.totalQty = Number(b.totalQty) / c, b.entries[0].qty = 1
					}
					$.dialog({
						lock: !0,
						width: 280,
						height: 120,
						title: "模板名称",
						content: '<div class="re-initialize"><label for="tempName">模板名称:</label> <input type="text" id="templateName" name="templateName" class="ui-input" value=""></div>',
						okVal: "确定",
						ok: function() {
							var a = this;
							return b.templateName = $.trim($("#templateName").val()), Public.ajaxPost("/scm/invTemplate.do?action=add&type=zz", {
								postData: JSON.stringify(b)
							}, function(b) {
								200 === b.status ? (parent.Public.tips({
									content: "模板保存成功！"
								}), a.close()) : parent.Public.tips({
									type: 1,
									content: b.msg
								})
							}), !1
						},
						cancelVal: "取消",
						cancel: !0
					})
				}
			}), $("#chooseTemp").on("click", function() {
				$.dialog({
					width: 780,
					height: 510,
					title: "选择模板",
					content: "url:/storage/select-temp.jsp",
					data: {
						url: "/scm/invTemplate.do?action=list&type=zz",
						callback: function(a, b) {
							a ? Public.ajaxGet("/scm/invTemplate.do?action=update&type=zz", {
								id: a
							}, function(a) {
								200 === a.status ? (originalData = a.data, a.data.id = -1, isTemp = !0, THISPAGE.reloadData(originalData), b.close()) : parent.Public.tips({
									type: 1,
									content: a.msg
								})
							}) : parent.Public.tips({
								type: 1,
								content: "请先选择一个模板！"
							})
						}
					},
					lock: !0
				})
			}), $("#grid,#fixedGrid").on("click", 'tr[role="row"]', function() {
				if ($("#mark").hasClass("has-audit")) {
					var a = $(this),
						b = (a.prop("id"), a.data("goodsInfo"));
					if (!b) return;
					if (SYSTEM.ISSERNUM && 1 == b.isSerNum) {
						var c = b.serNumList;
						Business.serNumManage({
							row: a,
							data: b,
							serNumUsedList: c,
							view: !0
						})
					}
				}
			}), $(window).resize(function() {
				Public.autoGrid($("#grid")), Public.autoGrid($("#fixedGrid"))
			})
		},
		resetData: function() {
			var a = this;
			$("#grid").clearGridData(!0), $("#fixedGrid").clearGridData();
			for (var b = 1; 8 >= b; b++) $("#grid").jqGrid("addRowData", b, {}), $("#grid").jqGrid("footerData", "set", {
				qty: 0,
				amount: 0
			});
			a.$_note.val(""), a.$_discountRate.val(originalData.disRate), a.$_deduction.val(originalData.disAmount), a.$_discount.val(originalData.amount), a.$_payment.val(originalData.rpAmount), a.$_arrears.val(originalData.arrears)
		},
		calTotal: function() {
			for (var a = $("#grid").jqGrid("getDataIDs"), b = 0, c = 0, d = 0, e = a.length; e > d; d++) {
				var f = a[d],
					g = $("#grid").jqGrid("getRowData", f);
				g.qty && (b += parseFloat(g.qty)), g.amount && (c += parseFloat(g.amount))
			}
			$("#grid").jqGrid("footerData", "set", {
				qty: b,
				amount: c
			})
		},
		_getEntriesData: function(a) {
			a = a || {};
			var b = [],
				c = $("#fixedGrid").jqGrid("getRowData", "fix1"),
				d = $("#fix1").data("goodsInfo"),
				e = $("#fix1").data("storageInfo");
			if (!e || !e.id) return parent.Public.tips({
				type: 2,
				content: "请选择相应的仓库！"
			}), $("#fixedGrid").jqGrid("editCell", n, 9, !0), !1;
			var f = $("#fix1").data("unitInfo") || {};
			if ("" === c.goods) return parent.Public.tips({
				type: 2,
				content: "组件信息不能为空！"
			}), !1;
			if (SYSTEM.ISSERNUM) {
				var g = d.serNumList;
				if (g && g.length == Number(c.qty));
				else {
					var h = !1,
						i = "点击";
					if (d.isSerNum && (h = !0, a.checkSerNum && (h = !0)), h) return parent.Public.tips({
						type: 2,
						content: "请" + i + "数量设置【" + d.name + "】的序列号"
					}), $("#fixedGrid").jqGrid("editCell", n, 6, !0), !1
				}
			}
			b.push({
				invId: d.id,
				invNumber: d.number,
				invName: d.name,
				invSpec: d.spec,
				unitId: f.unitId || f.id || -1,
				mainUnit: f.name || "",
				skuId: d.skuId || -1,
				skuName: d.skuName || "",
				qty: c.qty,
				price: c.price,
				amount: c.amount,
				locationId: e.id,
				locationName: e.name,
				serNumList: g
			});
			for (var j = $("#grid").jqGrid("getDataIDs"), k = 0, l = j.length; l > k; k++) {
				var m, n = j[k],
					o = $("#grid").jqGrid("getRowData", n);
				if ("" !== o.goods) {
					var p = $("#" + n).data("goodsInfo"),
						q = $("#" + n).data("storageInfo");
					if (!q || !q.id) return parent.Public.tips({
						type: 2,
						content: "请选择相应的仓库！"
					}), $("#grid").jqGrid("editCell", n, 10, !0), !1;
					var r = $("#" + n).data("unitInfo") || {},
						g = p.serNumList;
					if (g && g.length == Number(o.qty));
					else {
						var h = !1,
							i = "点击";
						if (1 == p.isSerNum && (h = !0, a.checkSerNum && (h = !0)), h) return parent.Public.tips({
							type: 2,
							content: "请" + i + "数量设置【" + p.name + "】的序列号"
						}), $("#grid").jqGrid("editCell", n, 7, !0), !1
					}
					m = {
						invId: p.id,
						invNumber: p.number,
						invName: p.name,
						invSpec: p.spec,
						skuId: p.skuId || -1,
						skuName: p.skuName || "",
						unitId: r.unitId || -1,
						mainUnit: r.name || "",
						qty: o.qty,
						price: o.price,
						amount: o.amount,
						locationId: q.id,
						locationName: q.name,
						description: o.description,
						serNumList: g
					}, b.push(m)
				}
			}
			return b
		},
		getPostData: function(a) {
			var b = this;
			null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), $("#fixedGrid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null);
			var c = this._getEntriesData(a);
			if (!c) return !1;
			if (c.length > 1) {
				var d = $.trim(b.$_note.val());
				b.calTotal();
				var e = {
					id: originalData.id,
					date: $.trim(b.$_date.val()),
					billNo: $.trim(b.$_number.text()),
					entries: c,
					totalQty: $("#grid").jqGrid("footerData", "get").qty.replace(/,/g, ""),
					totalAmount: $("#grid").jqGrid("footerData", "get").amount.replace(/,/g, ""),
					amount: $.trim(b.$_amount.val()) || 0,
					description: d === b.$_note[0].defaultValue ? "" : d
				};
				return e
			}
			return parent.Public.tips({
				type: 2,
				content: "子件信息不能为空！"
			}), $("#grid").jqGrid("editCell", 1, 2, !0), !1
		}
	};
urlParam.id ? hasLoaded || Public.ajaxGet("../../scm/invOi/updateZzd?action=updateZzd&type=zz", {
	id: urlParam.id
}, function(a) {
	if (200 === a.status) {
		originalData = a.data;
		for (var b = 1; b < originalData.entries.length; b++) originalData.entries[b].id -= 1;
		THISPAGE.init(originalData), hasLoaded = !0
	} else parent.Public.tips({
		type: 1,
		content: a.msg
	})
}) : (originalData = {
	id: -1,
	status: "add",
	customer: 0,
	transType: 0,
	header: [],
	entries: [{
		id: "1"
	}, {
		id: "1"
	}, {
		id: "2"
	}, {
		id: "3"
	}, {
		id: "4"
	}, {
		id: "5"
	}],
	totalQty: 0,
	totalAmount: 0,
	disRate: 0,
	disAmount: 0,
	amount: "0.00",
	rpAmount: "0.00",
	arrears: "0.00"
}, THISPAGE.init(originalData));