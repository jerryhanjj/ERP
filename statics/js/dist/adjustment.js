var curRow, curCol, curArrears, loading, urlParam = Public.urlParam(),
	SYSTEM = parent.SYSTEM,
	hiddenAmount = !1,
	qtyPlaces = Number(parent.SYSTEM.qtyPlaces),
	pricePlaces = Number(parent.SYSTEM.pricePlaces),
	amountPlaces = Number(parent.SYSTEM.amountPlaces),
	defaultPage = Public.getDefaultPage(),
	THISPAGE = {
		init: function(a) {
			this.mod_PageConfig = Public.mod_PageConfig.init("adjustment"), SYSTEM.isAdmin !== !1 || SYSTEM.rights.AMOUNT_COSTAMOUNT || (hiddenAmount = !0), this.loadGrid(a), this.initDom(a), this.initCombo(), this.addEvent()
		},
		initDom: function(a) {
			this.$_date = $("#date").val(SYSTEM.endDate), this.$_number = $("#number"), this.$_note = $("#note"), this.$_toolTop = $("#toolTop"), this.$_toolBottom = $("#toolBottom"), this.$_userName = $("#userName"), this.$_note.placeholder(), this.$_date.datepicker({
				onSelect: function(a) {
					if (!(originalData.id > 0)) {
						var b = a.format("yyyy-MM-dd");
						THISPAGE.$_number.text(""), Public.ajaxPost("../basedata/systemProfile/generateDocNo?action=generateDocNo", {
							billType: "CADJ",
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
			}), this.$_toolBottom.html("edit" === a.status ? '<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a href="../scm/invOi/toCBTZPdf?action=toCBTZPdf&id=' + a.id + '" target="_blank" id="print" class="ui-btn mrb">打印</a><a id="edit" class="ui-btn">保存</a>' : '<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a href="../scm/invOi/toCBTZPdf?action=toCBTZPdf&id=' + a.id + '" target="_blank" id="print" class="ui-btn mrb">打印</a><a class="ui-btn-prev mrb" id="prev" title="上一张"><b></b></a><a class="ui-btn-next" id="next" title="下一张"><b></b></a>'), this.salesListIds = parent.salesListIds || [], this.idPostion = $.inArray(String(a.id), this.salesListIds), this.idLength = this.salesListIds.length, 0 === this.idPostion && $("#prev").addClass("ui-btn-prev-dis"), this.idPostion === this.idLength - 1 && $("#next").addClass("ui-btn-next-dis"), this.$_userName.html(a.userName)) : (this.$_toolBottom.html('<a id="savaAndAdd" class="ui-btn ui-btn-sp mrb">保存并新增</a><a id="save" class="ui-btn">保存</a>'), this.$_userName.html(SYSTEM.realName || ""))
		},
		loadGrid: function(a) {
			function b(a, b, c) {
				return a ? (i(b.rowId), a) : c.invNumber ? c.invSpec ? c.invNumber + " " + c.invName + "_" + c.invSpec : c.invNumber + " " + c.invName : "&#160;"
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
			function i(a) {
				var b = $("#" + a).data("goodsInfo"),
					c = $("#grid").jqGrid("getRowData", a);
				if (b) {
					var c = {
						skuId: b.skuId || -1,
						skuName: b.skuName || "",
						mainUnit: b.mainUnit || b.unitName,
						unitId: b.unitId,
						amount: c.amount || 0,
						locationName: b.locationName
					},
						d = $("#grid").jqGrid("setRowData", a, c);
					d && THISPAGE.calTotal()
				}
			}
			var j = this;
			if (a.id) {
				var k = 8 - a.entries.length;
				if (k > 0) for (var l = 0; k > l; l++) a.entries.push({})
			}
			j.newId = 9;
			var m = "grid",
				n = [{
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
						trigger: "ui-icon-ellipsis disableSku"
					}
				}, {
					name: "skuId",
					label: "属性ID",
					hidden: !0
				}, {
					name: "mainUnit",
					label: "单位",
					width: 60
				}, {
					name: "amount",
					label: "调整金额",
					hidden: hiddenAmount,
					width: 100,
					align: "right",
					formatter: "currency",
					formatoptions: {
						showZero: !0,
						decimalPlaces: amountPlaces
					},
					editable: !0
				}, {
					name: "locationName",
					label: '仓库<small id="batchStorage">(批量)</small>',
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
					name: "description",
					label: "备注",
					width: 150,
					title: !0,
					editable: !0
				}];
			j.mod_PageConfig.gridReg(m, n), n = j.mod_PageConfig.conf.grids[m].colModel, $("#grid").jqGrid({
				data: a.entries,
				datatype: "clientSide",
				autowidth: !0,
				height: "100%",
				rownumbers: !0,
				gridview: !0,
				onselectrow: !1,
				colModel: n,
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
					if (urlParam.id > 0) {
						var b = a.rows,
							c = b.length;
						j.newId = c + 1;
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
								unitName: f.mainUnit
							}, f);
							g.id = f.invId, $("#" + e).data("goodsInfo", g).data("storageInfo", {
								id: f.locationId,
								name: f.locationName
							})
						}
					}
				},
				gridComplete: function() {
					setTimeout(function() {
						Public.autoGrid($("#grid"))
					}, 10)
				},
				afterEditCell: function(a, b, c, d) {
					if ("goods" === b) {
						var e = $("#" + a).data("goodsInfo");
						if (e) {
							var f = $("#grid").jqGrid("getRowData", a);
							e = $.extend(!0, {}, e), e.mainUnit = f.mainUnit, e.unitId = f.unitId, e.qty = f.qty, e.price = f.price, e.discountRate = f.discountRate, e.deduction = f.deduction, e.amount = f.amount, e.taxRate = f.taxRate, e.tax = f.tax, e.taxAmount = f.taxAmount, e.locationName = f.locationName, $("#" + a).data("goodsInfo", e)
						}
						$("#" + d + "_goods", "#grid").val(c), THISPAGE.goodsCombo.selectByText(c), THISPAGE.curID = a
					}
					"locationName" === b && ($("#" + d + "_locationName", "#grid").val(c), THISPAGE.storageCombo.selectByText(c))
				},
				formatCell: function() {},
				beforeSubmitCell: function() {},
				beforeSaveCell: function(a, b, c) {
					if ("goods" === b) {
						var d = $("#" + a).data("goodsInfo");
						if (d) return c;
						j.skey = c;
						var e, f = function(b) {
								$("#" + a).data("goodsInfo", b).data("storageInfo", {
									id: b.locationId,
									name: b.locationName
								}).data("unitInfo", {
									unitId: b.unitId,
									name: b.unitName
								}), e = Business.formatGoodsName(b)
							};
						return THISPAGE.$_barCodeInsert && THISPAGE.$_barCodeInsert.hasClass("active") ? Business.cacheManage.getGoodsInfoByBarCode(c, f, !0) : Business.cacheManage.getGoodsInfoByNumber(c, f, !0), e ? e : ($.dialog({
							width: 775,
							height: 510,
							title: "选择商品",
							content: "url:../settings/goods_batch",
							data: {
								skuMult: SYSTEM.enableAssistingProp,
								skey: j.skey,
								callback: function(a, b, c) {
									"" === b && ($("#grid").jqGrid("addRowData", a, {}, "last"), j.newId = a + 1), setTimeout(function() {
										$("#grid").jqGrid("editCell", c, 2, !0)
									}, 10), j.calTotal()
								}
							},
							init: function() {
								j.skey = ""
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
					if ("qty" == b) {
						var f = $("#grid").jqGrid("getCell", a, e + 1);
						if (!isNaN(parseFloat(f))) {
							var g = $("#grid").jqGrid("setRowData", a, {
								amount: parseFloat(c) * parseFloat(f)
							});
							g && THISPAGE.calTotal()
						}
					}
					if ("price" == b) {
						var h = $("#grid").jqGrid("getCell", a, e - 1);
						if (!isNaN(parseFloat(h))) {
							var g = $("#grid").jqGrid("setRowData", a, {
								amount: parseFloat(c) * parseFloat(h)
							});
							g && THISPAGE.calTotal()
						}
					}
					if ("amount" == b) {
						var h = $("#grid").jqGrid("getCell", a, e - 2);
						if (!isNaN(parseFloat(h))) {
							var f = parseFloat(c) / parseFloat(h);
							$("#grid").jqGrid("setRowData", a, {
								price: f
							})
						}
						THISPAGE.calTotal()
					}
				},
				loadonce: !0,
				resizeStop: function(a, b) {
					j.mod_PageConfig.updatePageConfig("grid", ["width", j.mod_PageConfig.conf.grids.grid.defColModel[b - 1].name, a])
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
				c.customerCombo.selectByValue(a.buId, !1), c.$_date.val(a.date), c.$_number.text(a.billNo), a.note && c.$_note.val(a.note), c.$_userName.html(a.userName)
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
			}).trigger("reloadGrid"), b(), this.editable || (this.customerCombo.enable(), this.$_date.removeAttr("disabled"), this.editable = !0)) : ($("#grid").jqGrid("setGridParam", {
				url: "",
				datatype: "json",
				cellEdit: !1
			}).trigger("reloadGrid"), b(), this.editable && (this.customerCombo.disable(), this.$_data.attr(disabled, "disabled"), this.editable = !1))
		},
		initCombo: function() {
			this.goodsCombo = Business.goodsCombo($(".goodsAuto"), {
				data: function() {
					if (defaultPage.SYSTEM.goodsInfo) {
						for (var a = [], b = 0; b < defaultPage.SYSTEM.goodsInfo.length; b++) {
							var c = defaultPage.SYSTEM.goodsInfo[b];
							c["delete"] || a.push(c)
						}
						return a
					}
					return "../basedata/inventory?action=list"
				}
			}), this.storageCombo = Business.billStorageCombo($(".storageAuto"))
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
					b.hasClass("unitAuto") ? b.trigger("click") : (a.storageCombo.active = !0, a.storageCombo.doQuery())
				}, 10)
			}), Business.billsEvent(a), $(".wrapper").on("click", "#save", function(b) {
				b.preventDefault();
				var c = THISPAGE.getPostData();
				c && ("edit" === originalData.stata && (c.id = originalData.id, c.stata = "edit"), Public.ajaxPost("../scm/invOi/addCADJ?action=addCADJ&type=cbtz", {
					postData: JSON.stringify(c)
				}, function(b) {
					200 === b.status ? (originalData.id = b.data.id, a.$_toolBottom.html('<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a id="edit" class="ui-btn mrb">保存</a><a href="../scm/invOi/toCBTZPdf?action=toCBTZPdf&id=' + originalData.id + '" target="_blank" id="print" class="ui-btn">打印</a>'), parent.Public.tips({
						content: "保存成功！"
					})) : parent.Public.tips({
						type: 1,
						content: b.msg
					})
				}))
			}), $(".wrapper").on("click", "#edit", function(a) {
				if (a.preventDefault(), Business.verifyRight("CADJ_UPDATE")) {
					var b = THISPAGE.getPostData();
					b && Public.ajaxPost("../scm/invOi/updateCADJ?action=updateCADJ&type=cbtz", {
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
				var c = THISPAGE.getPostData();
				c && Public.ajaxPost("../scm/invOi/addNewCADJ?action=addNewCADJ&type=cbtz", {
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
				a.preventDefault(), Business.verifyRight("CADJ_ADD") && parent.tab.overrideSelectedTabItem({
					tabid: "storage-adjustment",
					text: "成本调整单",
					url: "/scm/invOi.do?action=initOi&type=cbtz"
				})
			}), $(".wrapper").on("click", "#print", function(a) {
				return Business.verifyRight("CADJ_PRINT") ? void 0 : void a.preventDefault()
			}), $("#prev").click(function(b) {
				return b.preventDefault(), $(this).hasClass("ui-btn-prev-dis") ? (parent.Public.tips({
					type: 2,
					content: "已经没有上一张了！"
				}), !1) : (a.idPostion = a.idPostion - 1, 0 === a.idPostion && $(this).addClass("ui-btn-prev-dis"), loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("../scm/invOi/updateCbtz?action=updateCbtz&type=cbtz", {
					id: a.salesListIds[a.idPostion]
				}, function(a) {
					THISPAGE.reloadData(a.data), $("#next").removeClass("ui-btn-next-dis"), loading && loading.close()
				}), void 0)
			}), $("#next").click(function(b) {
				return b.preventDefault(), $(this).hasClass("ui-btn-next-dis") ? (parent.Public.tips({
					type: 2,
					content: "已经没有下一张了！"
				}), !1) : (a.idPostion = a.idPostion + 1, a.idLength === a.idPostion + 1 && $(this).addClass("ui-btn-next-dis"), loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("../scm/invOi/updateCbtz?action=updateCbtz&type=cbtz", {
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
		_getEntriesData: function() {
			for (var a = [], b = $("#grid").jqGrid("getDataIDs"), c = 0, d = b.length; d > c; c++) {
				var e, f = b[c],
					g = $("#grid").jqGrid("getRowData", f);
				if ("" !== g.goods) {
					var h = $("#" + f).data("goodsInfo"),
						i = $("#" + f).data("storageInfo");
					e = {
						invId: h.id,
						invNumber: h.number,
						invName: h.name,
						invSpec: h.spec,
						unitId: h.unitId,
						mainUnit: h.unitName,
						skuId: h.skuId || -1,
						skuName: h.skuName || "",
						qty: g.qty,
						price: g.price,
						amount: g.amount,
						description: g.description,
						locationId: i.id,
						locationName: i.name
					}, a.push(e)
				}
			}
			return a
		},
		getPostData: function() {
			var a = this;
			null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null);
			var b = this._getEntriesData();
			if (b.length > 0) {
				var c = $.trim(a.$_note.val());
				a.calTotal();
				var d = {
					id: originalData.id,
					date: $.trim(a.$_date.val()),
					billNo: $.trim(a.$_number.text()),
					entries: b,
					totalAmount: $("#grid").jqGrid("footerData", "get").amount.replace(/,/g, ""),
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
	urlParam.id ? hasLoaded || Public.ajaxGet("../scm/invOi/updateCbtz?action=updateCbtz&type=cbtz", {
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
		transType: "150601",
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