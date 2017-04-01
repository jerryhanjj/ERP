var curRow, curCol, curArrears, loading, urlParam = Public.urlParam(),
	SYSTEM = parent.SYSTEM,
	qtyPlaces = Number(parent.SYSTEM.qtyPlaces),
	pricePlaces = Number(parent.SYSTEM.pricePlaces),
	amountPlaces = Number(parent.SYSTEM.amountPlaces),
	defaultPage = Public.getDefaultPage(),
	THISPAGE = {
		init: function(a) {
			this.mod_PageConfig = Public.mod_PageConfig.init("transfers"), this.loadGrid(a), this.initDom(a), this.initCombo(), this.addEvent()
		},
		initDom: function(a) {
			this.$_date = $("#date").val(SYSTEM.endDate), this.$_number = $("#number"), this.$_note = $("#note"), this.$_toolTop = $("#toolTop"), this.$_toolBottom = $("#toolBottom"), this.$_userName = $("#userName"), this.$_note.placeholder(), this.$_date.datepicker({
				onSelect: function(a) {
					if (!(originalData.id > 0)) {
						var b = a.format("yyyy-MM-dd");
						THISPAGE.$_number.text(""), Public.ajaxPost("../basedata/systemProfile/generateDocNo?action=generateDocNo", {
							billType: "TRANSFER",
							billDate: b
						}, function(a) {
							200 === a.status ? THISPAGE.$_number.text(a.data.billNo) : parent.Public.tips({
								type: 1,
								content: a.msg
							})
						})
					}
				}
			}), a.id > 0 ? (this.$_number.text(a.billNo), this.$_date.val(a.date), a.description && this.$_note.val(a.description), $("#grid").jqGrid("footerData", "set", {
				qty: a.totalQty,
				amount: a.totalAmount
			}), this.$_toolBottom.html("edit" === a.status ? '<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a href="../scm/invTf/toPdf?action=toPdf&id=' + a.id + '" target="_blank" id="print" class="ui-btn mrb">打印</a><a id="edit" class="ui-btn">保存</a>' : '<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a href="../scm/invTf/toPdf?action=toPdf&id=' + a.id + '" target="_blank" id="print" class="ui-btn mrb">打印</a><a class="ui-btn-prev mrb" id="prev" title="上一张"><b></b></a><a class="ui-btn-next" id="next" title="下一张"><b></b></a>'), this.salesListIds = parent.salesListIds || [], this.idPostion = $.inArray(String(a.id), this.salesListIds), this.idLength = this.salesListIds.length, 0 === this.idPostion && $("#prev").addClass("ui-btn-prev-dis"), this.idPostion === this.idLength - 1 && $("#next").addClass("ui-btn-next-dis"), this.$_userName.html(a.userName)) : (this.$_toolBottom.html('<a id="savaAndAdd" class="ui-btn ui-btn-sp mrb">保存并新增</a><a id="save" class="ui-btn">保存</a>'), this.$_userName.html(SYSTEM.realName || ""))
		},
		loadGrid: function(a) {
			function b(a, b, c) {
				return a ? (u(b.rowId), a) : c.invNumber ? c.invSpec ? c.invNumber + " " + c.invName + "_" + c.invSpec : c.invNumber + " " + c.invName : "&#160;"
			}
			function c() {
				var a = $(".goodsAuto")[0];
				return a
			}
			function d(a, b, c) {
				if ("get" === b) {
					if ("" !== $(".goodsAuto").getCombo().getValue()) return $(a).val();
					var d = $(a).parents("tr");
					return d.removeData("goodsInfo"), ""
				}
				"set" === b && $("input", a).val(c)
			}
			function e() {
				$("#initCombo").append($(".goodsAuto").val("").unbind("focus.once"))
			}
			function f() {
				var a = $(".storageAuto")[0];
				return a
			}
			function g(a, b, c) {
				if ("get" === b) {
					if ("" !== $(".storageAuto").getCombo().getValue()) return $(a).val();
					var d = $(a).parents("tr");
					return d.removeData("storageInfo"), ""
				}
				"set" === b && $("input", a).val(c)
			}
			function h() {
				$("#initCombo").append($(".storageAuto").val(""))
			}
			function i() {
				var a = $(".inStorage")[0];
				return a
			}
			function j(a, b, c) {
				if ("get" === b) {
					if ("" !== $(".inStorage").getCombo().getValue()) return $(a).val();
					var d = $(a).parents("tr");
					return d.removeData("inStorage"), ""
				}
				"set" === b && $("input", a).val(c)
			}
			function k() {
				$("#initCombo").append($(".inStorage").val(""))
			}
			function l() {
				var a = $(".unitAuto")[0];
				return a
			}
			function m(a, b, c) {
				if ("get" === b) {
					if ("" !== $(".unitAuto").getCombo().getValue()) return $(a).val();
					var d = $(a).parents("tr");
					return d.removeData("unitInfo"), ""
				}
				"set" === b && $("input", a).val(c)
			}
			function n() {
				$("#initCombo").append($(".unitAuto").val(""))
			}
			function o() {
				var a = $(".dateAuto")[0];
				return a
			}
			function p(a, b, c) {
				return "get" === b ? a.val() : void("set" === b && $("input", a).val(c))
			}
			function q() {
				$("#initCombo").append($(".dateAuto"))
			}
			function r() {
				var a = $(".batchAuto")[0];
				return a
			}
			function s(a, b, c) {
				return "get" === b ? a.val() : void("set" === b && $("input", a).val(c))
			}
			function t() {
				$("#initCombo").append($(".batchAuto").val(""))
			}
			function u(a) {
				var b = $("#" + a).data("goodsInfo");
				if (b) {
					b.batch || $("#grid").jqGrid("setCell", a, "batch", "&#160;"), b.safeDays || ($("#grid").jqGrid("setCell", a, "prodDate", "&#160;"), $("#grid").jqGrid("setCell", a, "safeDays", "&#160;"), $("#grid").jqGrid("setCell", a, "validDate", "&#160;")), 1 == b.isWarranty && $("#grid").jqGrid("showCol", "batch"), b.safeDays > 0 && ($("#grid").jqGrid("showCol", "prodDate"), $("#grid").jqGrid("showCol", "safeDays"), $("#grid").jqGrid("showCol", "validDate"));
					var c = (Number(b.purPrice), {
						skuId: b.skuId || -1,
						skuName: b.skuName || "",
						mainUnit: b.mainUnit || b.unitName,
						unitId: b.unitId,
						qty: b.qty || 1,
						price: b.price || b.salePrice,
						discountRate: b.discountRate || 0,
						deduction: b.deduction || 0,
						amount: b.amount || b.salePrice,
						inLocationName: b.inLocationName,
						inLocationId: b.inLocationId,
						outLocationName: b.locationName || b.outLocationName,
						outLocationId: b.locationId || b.outLocationId,
						serNumList: b.serNumList,
						safeDays: b.safeDays
					});
					SYSTEM.ISSERNUM && 1 == b.isSerNum && (c.qty = b.serNumList ? b.serNumList.length : 0);
					var d = $("#grid").jqGrid("setRowData", a, c);
					d && THISPAGE.calTotal()
				}
			}
			var v = this,
				w = (new Date).format();
			if (a.id) {
				for (var x = 0; x < a.entries.length; x++) a.entries[x].id = x + 1;
				var y = 8 - a.entries.length;
				if (y > 0) for (var x = 0; y > x; x++) a.entries.push({})
			}
			v.newId = 9;
			var z = "grid",
				A = [{
					name: "operating",
					label: " ",
					width: 40,
					fixed: !0,
					formatter: Public.billsOper,
					align: "center"
				}, {
					name: "goods",
					label: "商品",
					width: 318,
					title: !1,
					classes: "goods",
					formatter: b,
					editable: !0,
					edittype: "custom",
					editoptions: {
						custom_element: c,
						custom_value: d,
						handle: e,
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
						custom_element: l,
						custom_value: m,
						handle: n,
						trigger: "ui-icon-triangle-1-s"
					}
				}, {
					name: "unitId",
					label: "单位Id",
					hidden: !0
				}, {
					name: "batch",
					label: "批次",
					width: 90,
					classes: "ui-ellipsis batch",
					hidden: !0,
					title: !1,
					editable: !0,
					align: "left",
					edittype: "custom",
					edittype: "custom",
					editoptions: {
						custom_element: r,
						custom_value: s,
						handle: t,
						trigger: "ui-icon-ellipsis"
					}
				}, {
					name: "prodDate",
					label: "生产日期",
					width: 90,
					hidden: !0,
					title: !1,
					editable: !0,
					edittype: "custom",
					edittype: "custom",
					editoptions: {
						custom_element: o,
						custom_value: p,
						handle: q
					}
				}, {
					name: "safeDays",
					label: "保质期(天)",
					width: 90,
					hidden: !0,
					title: !1,
					align: "left"
				}, {
					name: "validDate",
					label: "有效期至",
					width: 90,
					hidden: !0,
					title: !1,
					align: "left"
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
					name: "outLocationName",
					label: "调出仓库",
					nameExt: '<small id="batch-storageA">(批量)</small>',
					sortable: !1,
					width: 100,
					title: !0,
					editable: !0,
					edittype: "custom",
					editoptions: {
						custom_element: f,
						custom_value: g,
						handle: h,
						trigger: "ui-icon-triangle-1-s"
					}
				}, {
					name: "inLocationName",
					label: "调入仓库",
					nameExt: '<small id="batch-storageB">(批量)</small>',
					width: 100,
					title: !0,
					editable: !0,
					edittype: "custom",
					editoptions: {
						custom_element: i,
						custom_value: j,
						handle: k,
						trigger: "ui-icon-triangle-1-s"
					}
				}, {
					name: "description",
					label: "备注",
					width: 150,
					title: !0,
					editable: !0
				}];
			v.mod_PageConfig.gridReg(z, A), A = v.mod_PageConfig.conf.grids[z].colModel, $("#grid").jqGrid({
				data: a.entries,
				datatype: "clientSide",
				autowidth: !0,
				height: "100%",
				rownumbers: !0,
				gridview: !0,
				onselectrow: !1,
				colModel: A,
				cmTemplate: {
					sortable: !1
				},
				shrinkToFit: !1,
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
					if (urlParam.id > 0) {
						var b = a.rows,
							c = b.length;
						v.newId = c + 1;
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
								g.isSerNum = a.isSerNum, g.isWarranty = f.isWarranty = a.isWarranty, g.safeDays = f.safeDays = a.safeDays, g.id = f.invId, $("#" + e).data("goodsInfo", g).data("storageInfo", {
									id: f.outLocationId,
									name: f.outLocationName
								}).data("inStorage", {
									id: f.inLocationId,
									name: f.inLocationName
								}).data("unitInfo", {
									unitId: f.unitId,
									name: f.mainUnit
								})
							}), 1 == f.isWarranty && $("#grid").jqGrid("showCol", "batch"), f.safeDays > 0 && ($("#grid").jqGrid("showCol", "prodDate"), $("#grid").jqGrid("showCol", "safeDays"), $("#grid").jqGrid("showCol", "validDate"))
						}
					}
				},
				gridComplete: function() {
					setTimeout(function() {
						Public.autoGrid($("#grid"))
					}, 10)
				},
				afterEditCell: function(a, b, c, d, e) {
					function f() {
						var b = $("#" + a).data("goodsInfo");
						if (b) {
							var c = $("#grid").jqGrid("getRowData", a);
							b = $.extend(!0, {}, b), b.mainUnit = c.mainUnit, b.unitId = c.unitId, b.qty = c.qty, b.price = c.price, b.discountRate = c.discountRate, b.deduction = c.deduction, b.amount_old = c.amount, b.taxRate = c.taxRate, b.tax = c.tax, b.taxAmount = c.taxAmount, b.inLocationId = c.inLocationId, b.inLocationName = c.inLocationName, b.outLocationId = c.outLocationId, b.outLocationName = c.outLocationName, $("#" + a).data("goodsInfo", b)
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
								serNumUsedList: h,
								beforeSet: function(a) {
									a.outLocationName = a.locationName, a.outLocationId = a.locationId
								}
							})
						}
					}
					if ("outLocationName" === b) {
						$("#" + d + "_outLocationName", "#grid").val(c), THISPAGE.outStorageCombo.selectByText(c), f();
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
								enableStorage: !0,
								beforeSet: function(a) {
									a.outLocationName = a.locationName, a.outLocationId = a.locationId
								}
							})
						}
					}
					if ("inLocationName" === b && (f(), $("#" + d + "_inLocationName", "#grid").val(c), THISPAGE.inStorageCombo.selectByText(c)), "batch" === b) {
						var g = $("#" + a).data("goodsInfo");
						if (!g) return $("#grid").jqGrid("restoreCell", d, e), curCol = e + 1, void $("#grid").jqGrid("nextCell", d, e + 1);
						$("#" + d + "_batch", "#grid").val(c), THISPAGE.batchCombo.selectByText(c), THISPAGE.curID = a
					}
					if ("prodDate" === b) {
						var g = $("#" + a).data("goodsInfo");
						if (!g) return $("#grid").jqGrid("restoreCell", d, e), curCol = e + 1, void $("#grid").jqGrid("nextCell", d, e + 1);
						if (!g.safeDays) return $("#grid").jqGrid("restoreCell", d, e), curCol = e + 1, void $("#grid").jqGrid("nextCell", d, e + 1);
						THISPAGE.cellPikaday.setDate(c ? c : THISPAGE.cellPikaday.getDate() || new Date), THISPAGE.curID = a
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
						if (d) return d.skuClassId && SYSTEM.enableAssistingProp && (v.skey = c, setTimeout(function() {
							$("#grid").jqGrid("restoreCell", curRow, 2), $("#grid").jqGrid("editCell", curRow, 2, !0), $("#grid").jqGrid("setCell", curRow, 2, "")
						}, 10)), c;
						v.skey = c;
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
						return THISPAGE.$_barCodeInsert && THISPAGE.$_barCodeInsert.hasClass("active") ? Business.cacheManage.getGoodsInfoByBarCode(c, f, !0) : Business.cacheManage.getGoodsInfoByNumber(c, f, !0), e ? e : ($.dialog({
							width: 775,
							height: 510,
							title: "选择商品",
							content: "url:../settings/goods_batch",
							data: {
								skuMult: SYSTEM.enableAssistingProp,
								skey: v.skey,
								callback: function(a, b, c) {
									"" === b && ($("#grid").jqGrid("addRowData", a, {}, "last"), v.newId = a + 1), setTimeout(function() {
										$("#grid").jqGrid("editCell", c, 2, !0)
									}, 10), v.calTotal()
								}
							},
							init: function() {
								v.skey = ""
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
				afterSaveCell: function(a, b, c) {
					switch (b) {
					case "goods":
						break;
					case "qty":
						THISPAGE.calTotal();
						break;
					case "batch":
						var d = $("#grid").jqGrid("getRowData", a),
							e = $("#" + a).data("goodsInfo") || {};
						if (e.safeDays) {
							var f = {};
							if ($.trim(d.prodDate) || (f.prodDate = w), $.trim(d.safeDays) || (f.safeDays = e.safeDays), !$.trim(d.validDate)) {
								var g = d.prodDate || f.prodDate,
									h = g.split("-");
								if (g = new Date(h[0], h[1] - 1, h[2]), "Invalid Date" === g.toString()) return defaultPage.Public.tips({
									type: 2,
									content: "日期格式错误！"
								}), void setTimeout(function() {
									$("#grid").jqGrid("editCellByColName", a, "prodDate")
								}, 10);
								g && (g.addDays(Number(d.safeDays || f.safeDays)), f.validDate = g.format())
							}
							$.isEmptyObject(f) || $("#grid").jqGrid("setRowData", a, f)
						}
						break;
					case "prodDate":
						var d = $("#grid").jqGrid("getRowData", a),
							e = $("#" + a).data("goodsInfo") || {},
							f = {};
						$.trim(d.safeDays) || (f.safeDays = e.safeDays), $.trim(c) || (f.prodDate = w);
						var g = c || f.prodDate,
							h = g.split("-");
						if (g = new Date(h[0], h[1] - 1, h[2]), "Invalid Date" === g.toString()) return defaultPage.Public.tips({
							type: 2,
							content: "日期格式错误！"
						}), void setTimeout(function() {
							$("#grid").jqGrid("editCellByColName", a, "prodDate")
						}, 10);
						g && (g.addDays(Number(d.safeDays || f.safeDays)), f.validDate = g.format()), $("#grid").jqGrid("setRowData", a, f)
					}
				},
				loadonce: !0,
				resizeStop: function(a, b) {
					v.mod_PageConfig.updatePageConfig("grid", [v.mod_PageConfig.conf.grids.grid.defColModel[b - 1].name, a])
				},
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
				c.$_date.val(a.date), c.$_number.text(a.billNo), c.$_note.val(a.note), c.$_userName.html(a.userName)
			}
			$("#grid").clearGridData();
			for (var c = this, d = 0; d < a.entries.length; d++) a.entries[d].id = d + 1;
			var e = 8 - a.entries.length;
			if (e > 0) for (var d = 0; e > d; d++) a.entries.push({});
			"edit" === a.status ? ($("#grid").jqGrid("setGridParam", {
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
			this.goodsCombo = Business.billGoodsCombo($(".goodsAuto"), {
				userData: {
					beforeSet: function(a) {
						a.outLocationName = a.locationName, a.outLocationId = a.locationId
					}
				}
			}), this.outStorageCombo = $(".storageAuto").combo({
				data: function() {
					if (defaultPage.SYSTEM.storageInfo) {
						for (var a = [], b = defaultPage.SYSTEM.storageInfo.length - 1; b >= 0; b--) {
							var c = defaultPage.SYSTEM.storageInfo[b];
							c["delete"] || a.push(c)
						}
						return a
					}
					return "../basedata/invlocation?action=list&isDelete=2"
				},
				text: "name",
				value: "id",
				defaultSelected: 0,
				cache: !1,
				trigger: !1,
				defaultFlag: !1,
				editable: !0,
				callback: {
					onChange: function(a) {
						var b = this.input.parents("tr"),
							c = b.data("storageInfo");
						c || (c = {}), a && (c.id = a.id, c.name = a.name), b.data("storageInfo", c)
					}
				}
			}).getCombo(), this.inStorageCombo = $(".inStorage").combo({
				data: function() {
					if (defaultPage.SYSTEM.storageInfo) {
						for (var a = [], b = defaultPage.SYSTEM.storageInfo.length - 1; b >= 0; b--) {
							var c = defaultPage.SYSTEM.storageInfo[b];
							c["delete"] || a.push(c)
						}
						return a
					}
					return "../basedata/invlocation?action=list&isDelete=2"
				},
				text: "name",
				value: "id",
				defaultSelected: 0,
				cache: !1,
				editable: !0,
				trigger: !1,
				defaultFlag: !1,
				callback: {
					onChange: function(a) {
						var b = this.input.parents("tr"),
							c = b.data("inStorage");
						c || (c = {}), a && (c.id = a.id, c.name = a.name), b.data("inStorage", c)
					}
				}
			}).getCombo(), $("#batchStorage").combo({
				data: function() {
					return parent.SYSTEM.storageInfo
				},
				text: "name",
				value: "id",
				defaultSelected: 0,
				cache: !1,
				editable: !1,
				trigger: !0,
				defaultFlag: !1,
				callback: {
					onChange: function() {}
				}
			}), this.unitCombo = Business.unitCombo($(".unitAuto"), {
				defaultSelected: -1,
				forceSelection: !1
			}), this.cellPikaday = new Pikaday({
				field: $(".dateAuto")[0],
				editable: !1
			}), this.batchCombo = Business.batchCombo($(".batchAuto"))
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
			}), $(".grid-wrap").on("click", ".ui-icon-triangle-1-s", function() {
				var b = $(this).siblings();
				setTimeout(function() {
					b.val();
					b.hasClass("unitAuto") ? b.trigger("click") : b.hasClass("inStorage") ? (a.inStorageCombo.active = !0, a.inStorageCombo.doQuery()) : (a.outStorageCombo.active = !0, a.outStorageCombo.doQuery())
				}, 10)
			}), $("#batch-storageA").powerFloat({
				eventType: "click",
				hoverHold: !1,
				reverseSharp: !0,
				target: function() {
					return null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null), $(".wrapper").data("batch", "storageA"), $("#storageBox")
				}
			}), $("#batch-storageB").powerFloat({
				eventType: "click",
				hoverHold: !1,
				reverseSharp: !0,
				target: function() {
					return null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null), $(".wrapper").data("batch", "storageB"), $("#storageBox")
				}
			}), $(".wrapper").on("click", "#storageBox li", function() {
				var a = $(this).data("id"),
					b = $(this).data("name"),
					c = $("#grid").jqGrid("getDataIDs");
				if ("storageA" === $(".wrapper").data("batch")) var d = "outLocationName",
					e = "storageInfo";
				else var d = "inLocationName",
					e = "inStorage";
				for (var f = 0, g = c.length; g > f; f++) {
					var h = c[f],
						i = $("#grid").jqGrid("getRowData", h),
						j = $("#" + h);
					if ("" !== i.goods && void 0 !== j.data("goodsInfo")) {
						var k = {};
						k[d] = b, $("#grid").jqGrid("setRowData", h, k), $("#" + h).data(e, {
							id: a,
							name: b
						})
					}
				}
				$.powerFloat.hide()
			}), Business.billsEvent(a, "transfers"), $(".wrapper").on("click", "#save", function(b) {
				b.preventDefault();
				var c = $(this);
				if (c.hasClass("ui-btn-dis")) return void parent.Public.tips({
					type: 2,
					content: "正在保存，请稍后..."
				});
				var d = THISPAGE.getPostData();
				d && ("edit" === originalData.stata && (d.id = originalData.id, d.stata = "edit"), c.addClass("ui-btn-dis"), Public.ajaxPost("../scm/invTf/add?action=add", {
					postData: JSON.stringify(d)
				}, function(b) {
					c.removeClass("ui-btn-dis"), 200 === b.status ? (originalData.id = b.data.id, a.$_toolBottom.html('<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a id="edit" class="ui-btn mrb">保存</a><a href="../scm/invTf/toPdf?action=toPdf&id=' + originalData.id + '" target="_blank" id="print" class="ui-btn">打印</a>'), parent.Public.tips({
						content: "保存成功！"
					})) : parent.Public.tips({
						type: 1,
						content: b.msg
					})
				}))
			}), $(".wrapper").on("click", "#edit", function(a) {
				if (a.preventDefault(), Business.verifyRight("TF_UPDATE")) {
					var b = THISPAGE.getPostData();
					b && Public.ajaxPost("../scm/invTf/updateInvTf?action=updateInvTf", {
						postData: JSON.stringify(b)
					}, function(a) {
						200 === a.status ? (originalData.id = a.data.id, parent.Public.tips({
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
				d && (c.addClass("ui-btn-dis"), Public.ajaxPost("../scm/invTf/addNew?action=addNew", {
					postData: JSON.stringify(d)
				}, function(b) {
					if (c.removeClass("ui-btn-dis"), 200 === b.status) {
						a.$_number.text(b.data.billNo), $("#grid").clearGridData(), $("#grid").clearGridData(!0);
						for (var d = 1; 8 >= d; d++) $("#grid").jqGrid("addRowData", d, {});
						a.newId = 9, a.$_note.val(""), parent.Public.tips({
							content: "保存成功！"
						})
					} else parent.Public.tips({
						type: 1,
						content: b.msg
					})
				}))
			}), $(".wrapper").on("click", "#add", function(a) {
				a.preventDefault(), Business.verifyRight("TF_ADD") && parent.tab.overrideSelectedTabItem({
					tabid: "storage-transfers",
					text: "调拨单",
					url: "../scm/invTf?action=initTf"
				})
			}), $(".wrapper").on("click", "#print", function(a) {
				return Business.verifyRight("TF_PRINT") ? void 0 : void a.preventDefault()
			}), $("#prev").click(function(b) {
				return b.preventDefault(), $(this).hasClass("ui-btn-prev-dis") ? (parent.Public.tips({
					type: 2,
					content: "已经没有上一张了！"
				}), !1) : (a.idPostion = a.idPostion - 1, 0 === a.idPostion && $(this).addClass("ui-btn-prev-dis"), loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("../scm/invTf/update?action=update", {
					id: a.salesListIds[a.idPostion]
				}, function(a) {
					THISPAGE.reloadData(a.data), $("#next").removeClass("ui-btn-next-dis"), loading && loading.close()
				}), void 0)
			}), $("#next").click(function(b) {
				return b.preventDefault(), $(this).hasClass("ui-btn-next-dis") ? (parent.Public.tips({
					type: 2,
					content: "已经没有下一张了！"
				}), !1) : (a.idPostion = a.idPostion + 1, a.idLength === a.idPostion + 1 && $(this).addClass("ui-btn-next-dis"), loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("../scm/invTf/update?action=update", {
					id: a.salesListIds[a.idPostion]
				}, function(a) {
					THISPAGE.reloadData(a.data), $("#prev").removeClass("ui-btn-prev-dis"), loading && loading.close()
				}), void 0)
			}), $("#config").click(function() {
				a.mod_PageConfig.config()
			}), $(window).resize(function() {
				Public.autoGrid($("#grid"))
			})
		},
		resetData: function() {
			var a = this;
			$("#grid").clearGridData();
			for (var b = 1; 8 >= b; b++) $("#grid").jqGrid("addRowData", b, {}), $("#grid").jqGrid("footerData", "set", {
				qty: 0,
				amount: 0
			});
			a.$_note.val("")
		},
		calTotal: function() {
			for (var a = $("#grid").jqGrid("getDataIDs"), b = 0, c = 0, d = a.length; d > c; c++) {
				var e = a[c],
					f = $("#grid").jqGrid("getRowData", e);
				f.qty && (b += parseFloat(f.qty))
			}
			$("#grid").jqGrid("footerData", "set", {
				qty: b
			})
		},
		_getEntriesData: function() {
			for (var a = [], b = $("#grid").jqGrid("getDataIDs"), c = 0, d = b.length; d > c; c++) {
				var e, f = b[c],
					g = $("#grid").jqGrid("getRowData", f);
				if ("" !== g.goods) {
					var h = $("#" + f).data("goodsInfo"),
						i = $("#" + f).data("storageInfo"),
						j = $("#" + f).data("inStorage"),
						k = $("#" + f).data("unitInfo") || {};
					if (!i || !i.id) return parent.Public.tips({
						type: 1,
						content: "请选择调出仓库！"
					}), $("#grid").jqGrid("editCellByColName", f, "outLocationName"), !1;
					if (!j || !j.id) return parent.Public.tips({
						type: 1,
						content: "请选择调入仓库！"
					}), $("#grid").jqGrid("editCellByColName", f, "inLocationName"), !1;
					if (SYSTEM.ISSERNUM) {
						var l = h.serNumList;
						if (l || l && l.length != h.qty);
						else {
							var m = !1,
								n = "点击";
							if (1 == h.isSerNum && (m = !0), m) return parent.Public.tips({
								type: 2,
								content: "请" + n + "数量设置【" + h.name + "】的序列号"
							}), $("#grid").jqGrid("editCellByColName", f, "qty"), !1
						}
					}
					e = {
						invId: h.id,
						invNumber: h.number,
						invName: h.name,
						invSpec: h.spec,
						skuId: h.skuId || -1,
						skuName: h.skuName || "",
						unitId: k.unitId || -1,
						mainUnit: k.name || "",
						qty: g.qty,
						description: g.description,
						outLocationId: i.id,
						outLocationName: i.name,
						inLocationId: j.id,
						inLocationName: j.name,
						serNumList: l
					}, SYSTEM.ISWARRANTY && $.extend(!0, e, {
						batch: g.batch || "",
						prodDate: g.prodDate || "",
						safeDays: g.safeDays || "",
						validDate: g.validDate || ""
					}), a.push(e)
				}
			}
			return a
		},
		getPostData: function() {
			var a = this;
			null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null);
			var b = this._getEntriesData();
			if (!b) return !1;
			if (b.length > 0) {
				var c = $.trim(a.$_note.val());
				a.calTotal();
				var d = {
					id: originalData.id,
					date: $.trim(a.$_date.val()),
					billNo: $.trim(a.$_number.text()),
					entries: b,
					totalQty: $("#grid").jqGrid("footerData", "get").qty.replace(/,/g, ""),
					description: c === a.$_note[0].defaultValue ? "" : c
				};
				return d
			}
			return parent.Public.tips({
				type: 2,
				content: "商品信息不能为空！"
			}), $("#grid").jqGrid("editCell", 1, 2, !0), !1
		}
	},
	hasLoaded = !1,
	originalData;
$(function() {
	urlParam.id ? hasLoaded || Public.ajaxGet("../scm/invTf/update?action=update", {
		id: urlParam.id
	}, function(a) {
		200 === a.status ? (originalData = a.data, THISPAGE.init(a.data), hasLoaded = !0) : parent.Public.tips({
			type: 1,
			content: msg
		})
	}) : (originalData = {
		id: -1,
		status: "add",
		customer: 0,
		transType: 0,
		entries: [{
			id: "1"
		}, {
			id: "2"
		}, {
			id: "3"
		}, {
			id: "4"
		}, {
			id: "5"
		}, {
			id: "6"
		}, {
			id: "7"
		}, {
			id: "8"
		}],
		totalQty: 0,
		totalAmount: 0,
		disRate: 0,
		disAmount: 0,
		amount: "0.00",
		rpAmount: "0.00",
		arrears: "0.00"
	}, THISPAGE.init(originalData))
});




 