var curRow, curCol, loading, urlParam = Public.urlParam(),
	SYSTEM = parent.SYSTEM,
	hiddenAmount = !1,
	billRequiredCheck = SYSTEM.billRequiredCheck,
	disEditable = urlParam.disEditable,
	qtyPlaces = Number(parent.SYSTEM.qtyPlaces),
	pricePlaces = Number(parent.SYSTEM.pricePlaces),
	amountPlaces = Number(parent.SYSTEM.amountPlaces),
	defaultPage = Public.getDefaultPage(),
	THISPAGE = {
		init: function(a) {
			this.mod_PageConfig = Public.mod_PageConfig.init("otherWarehouse"), SYSTEM.isAdmin !== !1 || SYSTEM.rights.AMOUNT_INAMOUNT || (hiddenAmount = !0), this.loadGrid(a), this.initDom(a), this.initCombo(), this.addEvent()
		},
		initDom: function(a) {
			this.$_customer = $("#customer"), this.$_date = $("#date").val(SYSTEM.endDate), this.$_number = $("#number"), this.$_transType = $("#transType"), this.$_note = $("#note"), this.$_toolTop = $("#toolTop"), this.$_toolBottom = $("#toolBottom"), this.$_userName = $("#userName"), this.customerArrears = 0;
			var b = ["id", a.transType || 150706];
			this.customerCombo = Business.billSupplierCombo($("#customer"), {
				defaultSelected: 0,
				emptyOptions: !0
			}), this.$_note.placeholder(), this.transTypeCombo = this.$_transType.combo({
				data: "../scm/invOi/queryTransType?action=queryTransType&type=in",
				ajaxOptions: {
					formatData: function(a) {
						return a.data.items
					}
				},
				width: 80,
				height: 300,
				text: "name",
				value: "id",
				defaultSelected: b,
				cache: !1,
				defaultFlag: !1
			}).getCombo(), this.$_date.datepicker({
				onSelect: function(a) {
					var b = a.format("yyyy-MM-dd");
					THISPAGE.$_number.text(""), Public.ajaxPost("../basedata/systemProfile/generateDocNo?action=generateDocNo", {
						billType: "OI",
						billDate: b
					}, function(a) {
						200 === a.status ? THISPAGE.$_number.text(a.data.billNo) : parent.Public.tips({
							type: 1,
							content: a.msg
						})
					})
				}
			});
			var c = "",
				d = "";
			billRequiredCheck && (c = '<a class="ui-btn" id="audit">审核</a>', d = '<a class="ui-btn" id="reAudit">反审核</a>'), this.btn_audit = c, this.btn_reaudit = d, this.btn_add = '<a id="savaAndAdd" class="ui-btn ui-btn-sp mrb">保存并新增</a><a id="save" class="ui-btn">保存</a>', this.btn_edit = '<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a href="../scm/invOi/toOiPdf?action=toOiPdf" target="_blank" id="print" class="ui-btn mrb">打印</a><a id="edit" class="ui-btn">保存</a>', this.btn_view = '<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a href="../scm/invOi/toOiPdf?action=toOiPdf" target="_blank" id="print" class="ui-btn mrb">打印</a>', this.btn_p_n = '<a class="ui-btn-prev mrb" id="prev" title="上一张"><b></b></a><a class="ui-btn-next" id="next" title="下一张"><b></b></a>', a.id > 0 ? (this.$_customer.data("contactInfo", {
				id: a.buId,
				name: a.contactName
			}), this.customerCombo.input.val(a.contactName), this.$_number.text(a.billNo), this.$_date.val(a.date), a.description && this.$_note.val(a.description), $("#grid").jqGrid("footerData", "set", {
				qty: a.totalQty,
				amount: a.totalAmount
			}), "edit" === a.status ? this.$_toolBottom.html(this.btn_edit + this.btn_audit) : a.checked ? ($("#mark").addClass("has-audit"), this.$_toolBottom.html(this.btn_view + this.btn_reaudit + this.btn_p_n)) : this.$_toolBottom.html(this.btn_view + this.btn_p_n), this.salesListIds = parent.salesListIds || [], this.idPostion = $.inArray(String(a.id), this.salesListIds), this.idLength = this.salesListIds.length, 0 === this.idPostion && $("#prev").addClass("ui-btn-prev-dis"), this.idPostion === this.idLength - 1 && $("#next").addClass("ui-btn-next-dis"), this.$_userName.html(a.userName)) : (this.$_toolBottom.html(billRequiredCheck ? this.btn_add + this.btn_audit : this.btn_add), this.$_userName.html(SYSTEM.realName || ""))
		},
		disableEdit: function() {
			this.customerCombo.disable(), this.$_date.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_note.attr("disabled", "disabled").addClass("ui-input-dis"), $("#grid").jqGrid("setGridParam", {
				cellEdit: !1
			}), this.editable = !1
		},
		enableEdit: function() {
			disEditable || (this.customerCombo.enable(), this.$_date.removeAttr("disabled").removeClass("ui-input-dis"), this.$_note.removeAttr("disabled").removeClass("ui-input-dis"), $("#grid").jqGrid("setGridParam", {
				cellEdit: !0
			}), this.editable = !0)
		},
		loadGrid: function(a) {
			function b(a, b, c) {
				return a ? (r(b.rowId), a) : c.invNumber ? c.invSpec ? c.invNumber + " " + c.invName + "_" + c.invSpec : c.invNumber + " " + c.invName : "&#160;"
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
				var a = $(".unitAuto")[0];
				return a
			}
			function j(a, b, c) {
				if ("get" === b) {
					if ("" !== $(".unitAuto").getCombo().getValue()) return $(a).val();
					var d = $(a).parents("tr");
					return d.removeData("unitInfo"), ""
				}
				"set" === b && $("input", a).val(c)
			}
			function k() {
				$("#initCombo").append($(".unitAuto").val(""))
			}
			function l() {
				var a = $(".dateAuto")[0];
				return a
			}
			function m(a, b, c) {
				return "get" === b ? a.val() : void("set" === b && $("input", a).val(c))
			}
			function n() {
				$("#initCombo").append($(".dateAuto"))
			}
			function o() {
				var a = $(".batchAuto")[0];
				return a
			}
			function p(a, b, c) {
				return "get" === b ? a.val() : void("set" === b && $("input", a).val(c))
			}
			function q() {
				$("#initCombo").append($(".batchAuto").val(""))
			}
			function r(a) {
				var b = $("#" + a).data("goodsInfo");
				if (b) {
					b.batch || $("#grid").jqGrid("setCell", a, "batch", "&#160;"), b.safeDays || ($("#grid").jqGrid("setCell", a, "prodDate", "&#160;"), $("#grid").jqGrid("setCell", a, "safeDays", "&#160;"), $("#grid").jqGrid("setCell", a, "validDate", "&#160;")), 1 == b.isWarranty && $("#grid").jqGrid("showCol", "batch"), b.safeDays > 0 && ($("#grid").jqGrid("showCol", "prodDate"), $("#grid").jqGrid("showCol", "safeDays"), $("#grid").jqGrid("showCol", "validDate"));
					var c = {
						skuId: b.skuId || -1,
						skuName: b.skuName || "",
						mainUnit: b.mainUnit || b.unitName,
						unitId: b.unitId,
						qty: b.qty || 1,
						price: b.price || b.purPrice,
						discountRate: b.discountRate || 0,
						deduction: b.deduction || 0,
						amount: b.amount,
						locationName: b.locationName,
						locationId: b.locationId,
						serNumList: b.serNumList,
						safeDays: b.safeDays
					};
					SYSTEM.ISSERNUM && b.isSerNum && (c.qty = b.serNumList ? b.serNumList.length : billRequiredCheck ? 1 : 0), c.amount = c.amount ? c.amount : c.price * c.qty;
					var d = (Number(c.amount), $("#grid").jqGrid("setRowData", a, c));
					d && THISPAGE.calTotal()
				}
			}
			var s = this,
				t = (new Date).format();
			if (a.id) {
				for (var u = 0; u < a.entries.length; u++) a.entries[u].id = u + 1;
				var v = 8 - a.entries.length;
				if (v > 0) for (var u = 0; v > u; u++) a.entries.push({})
			}
			s.newId = 9;
			var w = "grid",
				x = [{
					name: "operating",
					label: " ",
					width: 40,
					fixed: !0,
					formatter: Public.billsOper,
					align: "center"
				}, {
					name: "goods",
					label: "商品",
					width: 320,
					title: !0,
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
						custom_element: i,
						custom_value: j,
						handle: k,
						trigger: "ui-icon-triangle-1-s"
					}
				}, {
					name: "unitId",
					label: "单位Id",
					hidden: !0
				}, {
					name: "locationName",
					label: "仓库",
					nameExt: '<small id="batchStorage">(批量)</small>',
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
						custom_element: o,
						custom_value: p,
						handle: q,
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
						custom_element: l,
						custom_value: m,
						handle: n
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
					name: "price",
					label: "入库单价",
					hidden: hiddenAmount,
					width: 100,
					fixed: !0,
					align: "right",
					formatter: "currency",
					formatoptions: {
						showZero: !0,
						decimalPlaces: pricePlaces
					},
					editable: !0
				}, {
					name: "amount",
					label: "入库金额",
					hidden: hiddenAmount,
					width: 100,
					fixed: !0,
					align: "right",
					formatter: "currency",
					formatoptions: {
						showZero: !0,
						decimalPlaces: amountPlaces
					},
					editable: !0
				}, {
					name: "description",
					label: "备注",
					width: 150,
					title: !0,
					editable: !0
				}];
			s.mod_PageConfig.gridReg(w, x), x = s.mod_PageConfig.conf.grids[w].colModel, $("#grid").jqGrid({
				data: a.entries,
				datatype: "clientSide",
				autowidth: !0,
				height: "100%",
				rownumbers: !0,
				gridview: !0,
				onselectrow: !1,
				colModel: x,
				cmTemplate: {
					sortable: !1,
					title: !1
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
					if (urlParam.id > 0 || urlParam.cacheId) {
						var b = a.rows,
							c = b.length;
						s.newId = c + 1;
						for (var d = 0; c > d; d++) {
							var e = b[d];
							if ($.isEmptyObject(b[d])) break;
							var f = $.extend(!0, {
								id: e.invId,
								number: e.invNumber,
								name: e.invName,
								spec: e.invSpec,
								unitId: e.unitId,
								unitName: e.mainUnit,
								isSerNum: e.isSerNum,
								serNumList: e.serNumList || e.invSerNumList
							}, e);
							Business.cacheManage.getGoodsInfoByNumber(f.number, function(a) {
								f.isSerNum = a.isSerNum, f.isWarranty = e.isWarranty = a.isWarranty, f.safeDays = e.safeDays = a.safeDays, f.id = e.invId, $("#" + b[d].id).data("goodsInfo", f).data("storageInfo", {
									id: e.locationId,
									name: e.locationName
								}).data("unitInfo", {
									unitId: e.unitId,
									name: e.mainUnit
								})
							}), 1 == e.isWarranty && $("#grid").jqGrid("showCol", "batch"), e.safeDays > 0 && ($("#grid").jqGrid("showCol", "prodDate"), $("#grid").jqGrid("showCol", "safeDays"), $("#grid").jqGrid("showCol", "validDate"))
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
							b = $.extend(!0, {}, b), b.mainUnit = c.mainUnit, b.unitId = c.unitId, b.qty = c.qty, b.price = c.price, b.discountRate = c.discountRate, b.deduction = c.deduction, b.amount = c.amount, b.taxRate = c.taxRate, b.tax = c.tax, b.taxAmount = c.taxAmount, b.locationName = c.locationName, $("#" + a).data("goodsInfo", b)
						}
					}
					if ("goods" === b && (f(), $("#" + d + "_goods", "#grid").val(c), THISPAGE.goodsCombo.selectByText(c), THISPAGE.curID = a), "qty" === b) {
						f();
						var g = $("#" + a).data("goodsInfo");
						if (!g) return;
						if (SYSTEM.ISSERNUM && g.isSerNum) {
							$("#grid").jqGrid("restoreCell", d, e), THISPAGE.curID = a;
							var h = g.serNumList;
							Business.serNumManage({
								row: $("#" + a),
								data: g,
								serNumUsedList: h,
								creatable: !0
							})
						}
					}
					if ("locationName" === b && ($("#" + d + "_locationName", "#grid").val(c), THISPAGE.storageCombo.selectByText(c)), "batch" === b) {
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
						var i = $("#" + a).data("unitInfo") || {};
						if (!i.unitId || "0" === i.unitId) return void $("#grid").jqGrid("saveCell", d, e);
						THISPAGE.unitCombo.enable(), THISPAGE.unitCombo.loadData(function() {
							for (var a = {}, b = 0; b < SYSTEM.unitInfo.length; b++) {
								var c = SYSTEM.unitInfo[b],
									d = i.unitId;
								i.unitId == c.id && (i = c), i.unitId = d;
								var e = c.unitTypeId || b;
								a[e] || (a[e] = []), a[e].push(c)
							}
							return i.unitTypeId ? a[i.unitTypeId] : [i]
						}), THISPAGE.unitCombo.selectByText(c)
					}
				},
				formatCell: function() {},
				beforeSubmitCell: function() {},
				beforeSaveCell: function(a, b, c) {
					if ("goods" === b) {
						var d = $("#" + a).data("goodsInfo");
						if (d) return d.skuClassId && SYSTEM.enableAssistingProp && (s.skey = c, setTimeout(function() {
							$("#grid").jqGrid("restoreCell", curRow, 2), $("#grid").jqGrid("editCell", curRow, 2, !0), $("#grid").jqGrid("setCell", curRow, 2, "")
						}, 10)), c;
						s.skey = c;
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
						return THISPAGE.$_barCodeInsert && THISPAGE.$_barCodeInsert.hasClass("active") ? Business.cacheManage.getGoodsInfoByBarCode(c, f["true"]) : Business.cacheManage.getGoodsInfoByNumber(c, f, !0), e ? e : ($.dialog({
							width: 775,
							height: 510,
							title: "选择商品",
							content: "url:../settings/goods_batch",
							data: {
								skuMult: SYSTEM.enableAssistingProp,
								skey: s.skey,
								callback: function(a, b, c) {
									"" === b && ($("#grid").jqGrid("addRowData", a, {}, "last"), s.newId = a + 1), setTimeout(function() {
										$("#grid").jqGrid("editCell", c, 2, !0)
									}, 10), s.calTotal()
								}
							},
							init: function() {
								s.skey = ""
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
					switch (b) {
					case "goods":
						break;
					case "qty":
						var f = $("#grid").jqGrid("getCell", a, e + 1);
						if (!isNaN(parseFloat(f))) {
							var g = $("#grid").jqGrid("setRowData", a, {
								amount: parseFloat(c) * parseFloat(f)
							});
							g && THISPAGE.calTotal()
						}
						break;
					case "price":
						var h = $("#grid").jqGrid("getCell", a, e - 1);
						if (!isNaN(parseFloat(h))) {
							var g = $("#grid").jqGrid("setRowData", a, {
								amount: parseFloat(c) * parseFloat(h)
							});
							g && THISPAGE.calTotal()
						}
						break;
					case "amount":
						var h = $("#grid").jqGrid("getCell", a, e - 2);
						if (!isNaN(parseFloat(h))) {
							var f = parseFloat(c) / parseFloat(h);
							$("#grid").jqGrid("setRowData", a, {
								price: f
							})
						}
						THISPAGE.calTotal();
						break;
					case "batch":
						var i = $("#grid").jqGrid("getRowData", a),
							j = $("#" + a).data("goodsInfo") || {};
						if (j.safeDays) {
							var k = {};
							if ($.trim(i.prodDate) || (k.prodDate = t), $.trim(i.safeDays) || (k.safeDays = j.safeDays), !$.trim(i.validDate)) {
								var l = i.prodDate || k.prodDate,
									m = l.split("-");
								if (l = new Date(m[0], m[1] - 1, m[2]), "Invalid Date" === l.toString()) return defaultPage.Public.tips({
									type: 2,
									content: "日期格式错误！"
								}), void setTimeout(function() {
									$("#grid").jqGrid("editCellByColName", a, "prodDate")
								}, 10);
								l && (l.addDays(Number(i.safeDays || k.safeDays)), k.validDate = l.format())
							}
							$.isEmptyObject(k) || $("#grid").jqGrid("setRowData", a, k)
						}
						break;
					case "prodDate":
						var i = $("#grid").jqGrid("getRowData", a),
							j = $("#" + a).data("goodsInfo") || {},
							k = {};
						$.trim(i.safeDays) || (k.safeDays = j.safeDays), $.trim(c) || (k.prodDate = t);
						var l = c || k.prodDate,
							m = l.split("-");
						if (l = new Date(m[0], m[1] - 1, m[2]), "Invalid Date" === l.toString()) return defaultPage.Public.tips({
							type: 2,
							content: "日期格式错误！"
						}), void setTimeout(function() {
							$("#grid").jqGrid("editCellByColName", a, "prodDate")
						}, 10);
						l && (l.addDays(Number(i.safeDays || k.safeDays)), k.validDate = l.format()), $("#grid").jqGrid("setRowData", a, k)
					}
				},
				loadonce: !0,
				resizeStop: function(a, b) {
					s.mod_PageConfig.updatePageConfig("grid", [s.mod_PageConfig.conf.grids.grid.defColModel[b - 1].name, a])
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
				c.$_customer.data("contactInfo", {
					id: a.buId,
					name: a.contactName
				}), c.customerCombo.input.val(a.contactName), c.$_date.val(a.date), c.$_number.text(a.billNo), c.$_note.val(a.description), c.$_userName.html(a.userName)
			}
			$("#grid").clearGridData();
			var c = this,
				d = 8 - a.entries.length;
			if (d > 0) for (var e = 0; d > e; e++) a.entries.push({});
			"edit" === a.status ? ($("#grid").jqGrid("setGridParam", {
				data: a.entries,
				userData: {
					qty: a.totalQty,
					amount: a.totalAmount
				},
				cellEdit: !0,
				datatype: "clientSide"
			}).trigger("reloadGrid"), b(), this.editable || (this.customerCombo.enable(), this.$_date.removeAttr("disabled"), this.editable = !0, this.$_toolBottom.html(c.btn_edit + c.btn_audit), $("#mark").removeClass("has-audit"))) : ($("#grid").jqGrid("setGridParam", {
				url: "",
				datatype: "json",
				cellEdit: !1
			}).trigger("reloadGrid"), b(), this.editable && (this.customerCombo.disable(), this.$_date.attr("disabled", "disabled"), this.editable = !1, $("#groupBtn").html(c.btn_view + c.btn_reaudit), $("#mark").addClass("has-audit")))
		},
		initCombo: function() {
			this.goodsCombo = Business.billGoodsCombo($(".goodsAuto"), {
				userData: {
					creatable: !0
				}
			}), this.storageCombo = Business.billStorageCombo($(".storageAuto")), this.unitCombo = Business.unitCombo($(".unitAuto"), {
				defaultSelected: -1,
				forceSelection: !1
			}), this.cellPikaday = new Pikaday({
				field: $(".dateAuto")[0],
				editable: !1
			}), this.batchCombo = Business.batchCombo($(".batchAuto"))
		},
		addEvent: function() {
			var a = this;
			this.customerCombo.input.enterKey(), this.$_date.bind("keydown", function(a) {
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
					b.hasClass("unitAuto") ? b.trigger("click") : (a.storageCombo.active = !0, a.storageCombo.doQuery())
				}, 10)
			}), Business.billsEvent(a, "otherWarehouse"), $(".wrapper").on("click", "#save", function(b) {
				b.preventDefault();
				var c = THISPAGE.getPostData();
				c && ("edit" === originalData.stata && (c.id = originalData.id, c.stata = "edit"), Public.ajaxPost("../scm/invOi/add?action=add&type=in", {
					postData: JSON.stringify(c)
				}, function(b) {
					200 === b.status ? (originalData.id = b.data.id, a.$_toolBottom.html(billRequiredCheck ? a.btn_edit + a.btn_audit : a.btn_edit), parent.Public.tips({
						content: "保存成功！"
					}), originalData.callback && originalData.callback("in")) : parent.Public.tips({
						type: 1,
						content: b.msg
					})
				}))
			}), $(".wrapper").on("click", "#edit", function(a) {
				if (a.preventDefault(), Business.verifyRight("IO_UPDATE")) {
					var b = THISPAGE.getPostData();
					b && Public.ajaxPost("../scm/invOi/updateOi?action=updateOi&type=in", {
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
			}), $(".wrapper").on("click", "#audit", function(b) {
				if (b.preventDefault(), Business.verifyRight("IO_CHECK")) {
					var c = THISPAGE.getPostData();
					c && Public.ajaxPost("../scm/invOi/checkInvOi?action=checkInvOi", {
						postData: JSON.stringify(c)
					}, function(b) {
						200 === b.status ? (originalData.id = b.data.id, $("#mark").addClass("has-audit"), $("#edit").hide(), a.disableEdit(), a.$_toolBottom.html(a.btn_view + a.btn_reaudit), parent.Public.tips({
							content: "审核成功！"
						}), originalData.callback && originalData.callback("in")) : parent.Public.tips({
							type: 1,
							content: b.msg
						})
					})
				}
			}), $(".wrapper").on("click", "#reAudit", function(b) {
				if (b.preventDefault(), Business.verifyRight("IO_UNCHECK")) {
					var c = THISPAGE.getPostData();
					c && Public.ajaxPost("../scm/invOi/revsCheckInvOi?action=revsCheckInvOi", {
						postData: JSON.stringify(c)
					}, function(b) {
						200 === b.status ? ($("#mark").removeClass(), $("#edit").show(), a.enableEdit(), a.$_toolBottom.html(a.btn_edit + a.btn_audit), parent.Public.tips({
							content: "反审核成功！"
						})) : parent.Public.tips({
							type: 1,
							content: b.msg
						})
					})
				}
			}), $(".wrapper").on("click", "#savaAndAdd", function(b) {
				b.preventDefault();
				var c = THISPAGE.getPostData();
				c && Public.ajaxPost("../scm/invOi/addNew?action=addNew&type=in", {
					postData: JSON.stringify(c)
				}, function(b) {
					if (200 === b.status) {
						a.$_number.text(b.data.billNo), $("#grid").clearGridData(), $("#grid").clearGridData(!0);
						for (var c = 1; 8 >= c; c++) $("#grid").jqGrid("addRowData", c, {});
						a.newId = 9, a.$_note.val(""), parent.Public.tips({
							content: "保存成功！"
						})
					} else parent.Public.tips({
						type: 1,
						content: b.msg
					})
				})
			}), $(".wrapper").on("click", "#add", function(a) {
				a.preventDefault(), Business.verifyRight("IO_ADD") && parent.tab.overrideSelectedTabItem({
					tabid: "storage-otherWarehouse",
					text: "其他入库",
					url: "../scm/invOi/initOi?action=initOi&type=in"
				})
			}), $(".wrapper").on("click", "#print", function(a) {
				return Business.verifyRight("IO_PRINT") ? void(this.href += "&id=" + originalData.id) : void a.preventDefault()
			}), $("#prev").click(function(b) {
				return b.preventDefault(), $(this).hasClass("ui-btn-prev-dis") ? (parent.Public.tips({
					type: 2,
					content: "已经没有上一张了！"
				}), !1) : (a.idPostion = a.idPostion - 1, 0 === a.idPostion && $(this).addClass("ui-btn-prev-dis"), loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("../scm/invOi/updateIn?action=updateIn&type=in", {
					id: a.salesListIds[a.idPostion]
				}, function(a) {
					THISPAGE.reloadData(a.data), $("#next").removeClass("ui-btn-next-dis"), loading && loading.close()
				}), void 0)
			}), $("#next").click(function(b) {
				return b.preventDefault(), $(this).hasClass("ui-btn-next-dis") ? (parent.Public.tips({
					type: 2,
					content: "已经没有下一张了！"
				}), !1) : (a.idPostion = a.idPostion + 1, a.idLength === a.idPostion + 1 && $(this).addClass("ui-btn-next-dis"), loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("../scm/invOi/updateIn?action=updateIn&type=in", {
					id: a.salesListIds[a.idPostion]
				}, function(a) {
					THISPAGE.reloadData(a.data), $("#prev").removeClass("ui-btn-prev-dis"), loading && loading.close()
				}), void 0)
			}), $("#grid").on("click", 'tr[role="row"]', function() {
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
			for (var b = [], c = $("#grid").jqGrid("getDataIDs"), d = 0, e = c.length; e > d; d++) {
				var f, g = c[d],
					h = $("#grid").jqGrid("getRowData", g);
				if ("" !== h.goods) {
					var i = $("#" + g).data("goodsInfo"),
						j = $("#" + g).data("storageInfo");
					if (!j || !j.id) return parent.Public.tips({
						type: 2,
						content: "请选择相应的仓库！"
					}), $("#grid").jqGrid("editCellByColName", g, "locationName"), !1;
					var k = $("#" + g).data("unitInfo") || {};
					if (SYSTEM.ISSERNUM) {
						var l = i.serNumList;
						if (l && l.length == Number(h.qty));
						else {
							var m = !1,
								n = "点击";
							if (1 == i.isSerNum && (m = !0, a.checkSerNum && (m = !0)), m) return parent.Public.tips({
								type: 2,
								content: "请" + n + "数量设置【" + i.name + "】的序列号"
							}), $("#grid").jqGrid("editCellByColName", g, "qty"), !1
						}
					}
					f = {
						invId: i.id,
						invNumber: i.number,
						invName: i.name,
						invSpec: i.spec,
						skuId: i.skuId || -1,
						skuName: i.skuName || "",
						unitId: k.unitId || -1,
						mainUnit: k.name || "",
						qty: h.qty,
						price: h.price,
						amount: h.amount,
						description: h.description,
						locationId: j.id,
						locationName: j.name,
						serNumList: l
					}, SYSTEM.ISWARRANTY && $.extend(!0, f, {
						batch: h.batch || "",
						prodDate: h.prodDate || "",
						safeDays: h.safeDays || "",
						validDate: h.validDate || ""
					}), b.push(f)
				}
			}
			return b
		},
		getPostData: function() {
			var a = this,
				b = this;
			null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null);
			var c = b.$_customer.find("input");
			if ("" === c.val() || "(空)" === c.val()) {
				var d = {};
				d.id = 0, d.name = "(空)", b.$_customer.removeData("contactInfo")
			} else {
				var d = b.$_customer.data("contactInfo");
				if (null === d) return setTimeout(function() {
					c.focus().select()
				}, 15), parent.Public.tips({
					type: 2,
					content: "当前客户不存在！"
				}), !1
			}
			var e = this._getEntriesData();
			if (!e) return !1;
			if (e.length > 0) {
				var f = $.trim(a.$_note.val());
				a.calTotal();
				var g = {
					id: originalData.id,
					buId: d.id,
					contactName: d.name,
					date: $.trim(a.$_date.val()),
					billNo: $.trim(a.$_number.text()),
					transTypeId: a.transTypeCombo.getValue(),
					transTypeName: a.transTypeCombo.getText(),
					entries: e,
					totalQty: $("#grid").jqGrid("footerData", "get").qty.replace(/,/g, ""),
					totalAmount: $("#grid").jqGrid("footerData", "get").amount.replace(/,/g, ""),
					description: f === a.$_note[0].defaultValue ? "" : f
				};
				return g
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
	if (urlParam.id) hasLoaded || Public.ajaxGet("../scm/invOi/updateIn?action=updateIn&type=in", {
		id: urlParam.id
	}, function(a) {
		200 === a.status ? (originalData = a.data, THISPAGE.init(a.data), hasLoaded = !0) : parent.Public.tips({
			type: 1,
			content: a.msg
		})
	});
	else {
		if (originalData = {
			id: -1,
			status: "add",
			customer: 0,
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
		}, urlParam.cacheId) {
			var a = parent.Cache[urlParam.cacheId];
			originalData.transType = a.data.warehouseData.transType, originalData.entries = a.data.warehouseData.entries, originalData.callback = a.callback
		}
		THISPAGE.init(originalData)
	}
});


 