var curRow, curCol, loading, SYSTEM = system = parent.SYSTEM,
	billRequiredCheck = system.billRequiredCheck,
	requiredMoney = system.requiredMoney,
	taxRequiredCheck = system.taxRequiredCheck,
	taxRequiredInput = system.taxRequiredInput,
	hiddenAmount = !1,
	hideCustomerCombo = !1,
	urlParam = Public.urlParam(),
	disEditable = urlParam.disEditable,
	defaultPage = Public.getDefaultPage(),
	qtyPlaces = Number(parent.SYSTEM.qtyPlaces),
	pricePlaces = Number(parent.SYSTEM.pricePlaces),
	amountPlaces = Number(parent.SYSTEM.amountPlaces),
	THISPAGE = {
		init: function(a) {
			this.mod_PageConfig = Public.mod_PageConfig.init("150502" == urlParam.transType ? "purchaseBack" : "purchase"), SYSTEM.isAdmin !== !1 || SYSTEM.rights.AMOUNT_INAMOUNT || (hiddenAmount = !0, $("#amountArea").hide()), this.loadGrid(a), this.initDom(a), this.initCombo(), a.id > 0 && a.checked ? this.disableEdit() : (this.editable = !0, $("#grid").jqGrid("setGridParam", {
				cellEdit: !0
			})), this.addEvent(), $.cookie("BarCodeInsert") && THISPAGE.$_barCodeInsert.addClass("active"), this.goodsEdittypeInit()
		},
		initDom: function(a) {
			var b = this;
			this.$_customer = $("#customer"), this.$_date = $("#date").val(system.endDate), this.$_number = $("#number"), this.$_note = $("#note"), this.$_discountRate = $("#discountRate"), this.$_deduction = $("#deduction"), this.$_discount = $("#discount"), this.$_payment = $("#payment"), this.$_arrears = $("#arrears"), this.$_totalArrears = $("#totalArrears"), this.$_toolTop = $("#toolTop"), this.$_toolBottom = $("#toolBottom"), this.$_paymentTxt = $("#paymentTxt"), this.$_accountInfo = $("#accountInfo"), this.$_userName = $("#userName"), this.$_modifyTime = $("#modifyTime"), this.$_checkName = $("#checkName"), this.customerArrears = 0, this.$_note.placeholder(), "150502" == originalData.transType ? (parent.$("#page-tab").find("li.l-selected").children("a").html("购货退货单"), $("#paymentTxt").html("本次退款")) : (parent.$("#page-tab").find("li.l-selected").children("a").html("购货单"), $("#paymentTxt").html("本次付款")), this.customerCombo = Business.billSupplierCombo($("#customer"), {}), ("add" !== a.status || a.buId) && (this.$_customer.data("contactInfo", {
				id: a.buId,
				name: a.contactName
			}), this.customerCombo.input.val(a.contactName)), hideCustomerCombo && this.customerCombo.disable(), this.$_date.datepicker({
				onSelect: function(a) {
					if (!(originalData.id > 0)) {
						var c = a.format("yyyy-MM-dd");
						b.$_number.text(""), Public.ajaxPost("../basedata/systemProfile/generateDocNo?action=generateDocNo", {
							billType: "PUR",
							billDate: c
						}, function(a) {
							200 === a.status ? b.$_number.text(a.data.billNo) : parent.Public.tips({
								type: 1,
								content: a.msg
							})
						})
					}
				}
			}), a.description && this.$_note.val(a.description), this.$_discountRate.val(a.disRate), this.$_deduction.val(a.disAmount), this.$_discount.val(a.amount), this.$_payment.val(a.rpAmount), this.$_arrears.val(a.arrears), requiredMoney && ($("#accountWrap").show(), this.accountCombo = SYSTEM.isAdmin !== !1 || SYSTEM.rights.SettAcct_QUERY ? Business.accountCombo($("#account"), {
				width: 112,
				height: 300,
				emptyOptions: !0,
				addOptions: {
					text: "多账户",
					value: -1
				},
				defaultSelected: ["id", a.accId],
				callback: {
					onChange: function() {
						if (-1 === this.getValue()) b.chooseAccount();
						else {
							var a = [];
							a.push({
								accId: this.getValue(),
								account: "",
								payment: b.$_payment.val(),
								wayId: 0,
								way: "",
								settlement: ""
							}), b.$_accountInfo.data("accountInfo", a).hide(), b.$_payment.removeAttr("disabled").removeClass("ui-input-dis")
						}
					}
				}
			}) : Business.accountCombo($("#account"), {
				width: 112,
				height: 300,
				data: [],
				editable: !1,
				disabled: !0,
				addOptions: {
					text: "(没有账户管理权限)",
					value: 0
				}
			}));
			var c = '<a id="savaAndAdd" class="ui-btn ui-btn-sp">保存并新增</a><a id="save" class="ui-btn">保存</a>',
				d = '<a id="add" class="ui-btn ui-btn-sp">新增</a><a href="../scm/invPu/toPdf?action=toPdf&id=' + a.id + '" target="_blank" id="print" class="ui-btn">打印</a><a id="edit" class="ui-btn">保存</a>',
				e = '<a id="add" class="ui-btn ui-btn-sp">新增</a><a href="../scm/invPu/toPdf?action=toPdf&id=' + a.id + '" target="_blank" id="print" class="ui-btn">打印</a>',
				f = "",
				g = "";
			billRequiredCheck ? (f = '<a class="ui-btn" id="audit">审核</a>', g = '<a class="ui-btn" id="reAudit">反审核</a>') : this.$_checkName.parent().hide();
			var h = '<a class="ui-btn-prev" id="prev" title="上一张"><b></b></a><a class="ui-btn-next" id="next" title="下一张"><b></b></a>';
			this.btn_edit = d, this.btn_audit = f, this.btn_view = e, this.btn_reaudit = g, a.id > 0 ? (this.$_number.text(a.billNo), this.$_date.val(a.date), this.$_totalArrears.val(a.totalArrears), this.$_accountInfo.data("accountInfo", a.accounts), -1 === a.accId && (this.$_accountInfo.show(), b.$_payment.attr("disabled", "disabled").addClass("ui-input-dis")), $("#grid").jqGrid("footerData", "set", {
				qty: a.totalQty,
				amount: a.totalAmount
			}), "list" !== urlParam.flag && (h = ""), "edit" === a.status ? this.$_toolBottom.html("<span id=groupBtn>" + d + f + "</span>" + h) : a.checked ? ($("#mark").addClass("has-audit"), this.$_toolBottom.html('<span id="groupBtn">' + e + g + "</span>" + h)) : this.$_toolBottom.html('<span id="groupBtn">' + e + "</span>" + h), this.idList = "150502" == a.transType ? parent.cacheList.purchaseBackId || [] : parent.cacheList.purchaseId || [], this.idPostion = $.inArray(String(a.id), this.idList), this.idLength = this.idList.length, 0 === this.idPostion && $("#prev").addClass("ui-btn-prev-dis"), this.idPostion === this.idLength - 1 && $("#next").addClass("ui-btn-next-dis"), this.$_userName.html(a.userName), this.$_modifyTime.html(a.modifyTime), this.$_checkName.html(a.checkName)) : (this.$_toolBottom.html(billRequiredCheck ? "<span id=groupBtn>" + c + f + "</span>" : '<span id="groupBtn">' + c + "</span>"), this.$_userName.html(system.realName || ""), this.$_modifyTime.parent().hide(), this.$_checkName.parent().hide()), disEditable && (THISPAGE.disableEdit(), this.$_toolBottom.hide())
		},
		loadGrid: function(a) {
			function b(a) {
				if (taxRequiredCheck) {
					var b = $("#grid").jqGrid("getRowData", a),
						c = parseFloat(b.taxRate);
					if ($.isNumeric(c)) {
						var d = parseFloat(b.amount),
							e = d * c / 100,
							f = d + e;
						$("#grid").jqGrid("setRowData", a, {
							tax: e,
							taxAmount: f
						})
					}
				}
			}
			function c(a, b, c) {
				return a ? (p(b.rowId), a) : c.invNumber ? c.invSpec ? c.invNumber + " " + c.invName + "_" + c.invSpec : c.invNumber + " " + c.invName : "&#160;"
			}
			function d() {
				var a = $(".storageAuto")[0];
				return a
			}
			function e(a, b, c) {
				if ("get" === b) {
					if ("" !== $(".storageAuto").getCombo().getValue()) return $(a).val();
					var d = $(a).parents("tr");
					return d.removeData("storageInfo"), ""
				}
				"set" === b && $("input", a).val(c)
			}
			function f() {
				$("#initCombo").append($(".storageAuto").val(""))
			}
			function g() {
				var a = $(".unitAuto")[0];
				return a
			}
			function h(a, b, c) {
				if ("get" === b) {
					if ("" !== $(".unitAuto").getCombo().getValue()) return $(a).val();
					var d = $(a).parents("tr");
					return d.removeData("unitInfo"), ""
				}
				"set" === b && $("input", a).val(c)
			}
			function i() {
				$("#initCombo").append($(".unitAuto").val(""))
			}
			function j() {
				var a = $(".dateAuto")[0];
				return a
			}
			function k(a, b, c) {
				return "get" === b ? a.val() : void("set" === b && $("input", a).val(c))
			}
			function l() {
				$("#initCombo").append($(".dateAuto"))
			}
			function m() {
				var a = $(".batchAuto")[0];
				return a
			}
			function n(a, b, c) {
				return "get" === b ? a.val() : void("set" === b && $("input", a).val(c))
			}
			function o() {
				$("#initCombo").append($(".batchAuto").val(""))
			}
			function p(a) {
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
						taxRate: b.taxRate || taxRequiredInput,
						serNumList: b.serNumList,
						safeDays: b.safeDays
					};
					if (SYSTEM.ISSERNUM && 1 == b.isSerNum && (c.qty = b.serNumList ? b.serNumList.length : billRequiredCheck ? 1 : 0), c.qty > 0) {
						var d = parseFloat(c.qty),
							e = parseFloat(c.price),
							f = parseFloat(c.discountRate);
						$.isNumeric(e) && ($.isNumeric(f) ? (c.deduction = c.deduction || d * e * f / 100, c.amount = c.amount || d * e - c.deduction) : c.amount = c.amount || d * e)
					}
					c.amount = c.amount ? c.amount : c.price * c.qty;
					var g = Number(c.amount);
					if (taxRequiredCheck) {
						var h = c.taxRate,
							i = g * h / 100,
							j = g + i;
						c.tax = b.tax || i, c.taxAmount = b.taxAmount || j
					}
					var k = $("#grid").jqGrid("setRowData", a, c);
					k && THISPAGE.calTotal()
				}
			}
			var q = this,
				r = (new Date).format();
			if (a.id) {
				var s = 8 - a.entries.length;
				if (s > 0) for (var t = 0; s > t; t++) a.entries.push({})
			}
			q.newId = 9;
			var u = !1;
			1 === SYSTEM.siType && (u = !0);
			var v = [{
				name: "operating",
				label: " ",
				width: 60,
				fixed: !0,
				formatter: Public.billsOper_goods,
				align: "center"
			}, {
				name: "goods",
				label: "商品",
				nameExt: '<span id="barCodeInsert">扫描枪录入</span>',
				width: 300,
				classes: "goods",
				formatter: c,
				editable: !0,
				enterCallback: function() {
					if (THISPAGE.$_barCodeInsert.hasClass("active")) {
						var a = function(a) {
								var b = $("#" + a),
									c = b.next(),
									d = b.index() + 1;
								return 0 == c.length ? ($("#grid").jqGrid("addRowData", THISPAGE.newId, {}, "last"), THISPAGE.newId++, $("#" + (THISPAGE.newId - 1)).index()) : c.data("goodsInfo") ? arguments.callee(d) : d
							}(THISPAGE.curID);
						$("#grid").jqGrid("nextCell", a, 1)
					} else 0 != $("#grid")[0].p.savedRow.length && $("#grid").jqGrid("nextCell", $("#grid")[0].p.savedRow[0].id, $("#grid")[0].p.savedRow[0].ic)
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
					custom_element: g,
					custom_value: h,
					handle: i,
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
				editable: !0,
				edittype: "custom",
				editoptions: {
					custom_element: d,
					custom_value: e,
					handle: f,
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
					custom_element: m,
					custom_value: n,
					handle: o,
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
					custom_element: j,
					custom_value: k,
					handle: l
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
				label: "购货单价",
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
				name: "discountRate",
				label: "折扣率(%)",
				hidden: hiddenAmount,
				width: 70,
				fixed: !0,
				align: "right",
				formatter: "integer",
				editable: !0
			}, {
				name: "deduction",
				label: "折扣额",
				hidden: hiddenAmount,
				width: 70,
				fixed: !0,
				align: "right",
				formatter: "currency",
				formatoptions: {
					showZero: !0,
					decimalPlaces: amountPlaces
				},
				editable: !0
			}, {
				name: "amount",
				label: "购货金额",
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
			}];
			this.calAmount = "amount", taxRequiredCheck && (v.pop(), v.push({
				name: "amount",
				label: "金额",
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
				name: "taxRate",
				label: "税率(%)",
				hidden: hiddenAmount,
				width: 70,
				fixed: !0,
				align: "right",
				formatter: "integer",
				editable: !0
			}, {
				name: "tax",
				label: "税额",
				hidden: hiddenAmount,
				width: 70,
				fixed: !0,
				align: "right",
				formatter: "currency",
				formatoptions: {
					showZero: !0,
					decimalPlaces: amountPlaces
				},
				editable: !0
			}, {
				name: "taxAmount",
				label: "价税合计",
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
			}), this.calAmount = "taxAmount"), v.push({
				name: "description",
				label: "备注",
				width: 150,
				title: !0,
				editable: !0
			}, {
				name: "srcOrderEntryId",
				label: "源单分录ID",
				width: 0,
				hidden: !0
			}, {
				name: "srcOrderId",
				label: "源单ID",
				width: 0,
				hidden: !0
			}, {
				name: "srcOrderNo",
				label: "源单号",
				width: 120,
				fixed: !0,
				hidden: u,
				formatter: function(a) {
					return a && (hideCustomerCombo = !0), a || "&#160;"
				}
			});
			var w = "grid";
			q.mod_PageConfig.gridReg(w, v), v = q.mod_PageConfig.conf.grids[w].colModel, $("#grid").jqGrid({
				data: a.entries,
				datatype: "clientSide",
				autowidth: !0,
				height: "100%",
				rownumbers: !0,
				gridview: !0,
				onselectrow: !1,
				colModel: v,
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
					if (THISPAGE.$_barCodeInsert = $("#barCodeInsert"), urlParam.id > 0) {
						var b = a.rows,
							c = b.length;
						q.newId = c + 1;
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
									id: f.locationId,
									name: f.locationName
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
								serNumUsedList: h,
								creatable: "150502" != originalData.transType
							})
						}
					}
					if ("locationName" === b && ($("#" + d + "_locationName", "#grid").val(c), THISPAGE.storageCombo.selectByText(c), "150502" == originalData.transType)) {
						f();
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
								creatable: "150502" != originalData.transType
							})
						}
					}
					if ("batch" === b) {
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
						if (!j.unitId || "0" === j.unitId) return $("#grid").jqGrid("restoreCell", d, e), curCol = e + 1, void $("#grid").jqGrid("nextCell", d, e + 1);
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
				beforeSaveCell: function(a, b, c) {
					if ("goods" === b) {
						var d = $("#" + a).data("goodsInfo");
						if (d) return d.skuClassId && SYSTEM.enableAssistingProp && (q.skey = c, setTimeout(function() {
							$("#grid").jqGrid("restoreCell", curRow, 2), $("#grid").jqGrid("editCell", curRow, 2, !0), $("#grid").jqGrid("setCell", curRow, 2, "")
						}, 10)), c;
						q.skey = c;
						var e, f = function(b) {
								SYSTEM.ISSERNUM && b.isSerNum ? (Business.serNumManage({
									row: $("#" + a),
									data: b,
									creatable: "150502" != originalData.transType
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
								skey: q.skey,
								callback: function(a, b, c) {
									"" === b && ($("#grid").jqGrid("addRowData", a, {}, "last"), q.newId = a + 1), setTimeout(function() {
										$("#grid").jqGrid("editCell", c, 2, !0)
									}, 10), q.calTotal()
								}
							},
							init: function() {
								q.skey = ""
							},
							lock: !0,
							button: [{
								name: "选中",
								defClass: "ui_state_highlight fl",
								focus: !0,
								callback: function() {
									return this.content.callback && this.content.callback("purchase"), !1
								}
							}, {
								name: "选中并关闭",
								defClass: "ui_state_highlight",
								callback: function() {
									return this.content.callback("purchase"), this.close(), !1
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
				afterSaveCell: function(a, c, d, e, f) {
					switch (c) {
					case "goods":
						break;
					case "qty":
						var d = parseFloat(d),
							g = parseFloat($("#grid").jqGrid("getCell", a, f + 1)),
							h = parseFloat($("#grid").jqGrid("getCell", a, f + 2));
						if ($.isNumeric(g)) if ($.isNumeric(h)) var i = d * g * h / 100,
							j = d * g - i,
							k = $("#grid").jqGrid("setRowData", a, {
								deduction: i,
								amount: j
							});
						else var k = $("#grid").jqGrid("setRowData", a, {
							amount: d * g
						});
						b(a), k && THISPAGE.calTotal();
						break;
					case "price":
						var d = parseFloat(d),
							l = parseFloat($("#grid").jqGrid("getCell", a, f - 1)),
							h = parseFloat($("#grid").jqGrid("getCell", a, f + 1));
						if ($.isNumeric(l)) if ($.isNumeric(h)) var i = d * l * h / 100,
							j = d * l - i,
							k = $("#grid").jqGrid("setRowData", a, {
								deduction: i,
								amount: j
							});
						else var k = $("#grid").jqGrid("setRowData", a, {
							amount: d * l
						});
						b(a), k && THISPAGE.calTotal();
						break;
					case "discountRate":
						var d = parseFloat(d),
							l = parseFloat($("#grid").jqGrid("getCell", a, f - 2)),
							g = parseFloat($("#grid").jqGrid("getCell", a, f - 1));
						if ($.isNumeric(l) && $.isNumeric(g)) var m = l * g,
							i = m * d / 100,
							j = m - i,
							k = $("#grid").jqGrid("setRowData", a, {
								deduction: i,
								amount: j
							});
						b(a), k && THISPAGE.calTotal();
						break;
					case "deduction":
						var d = parseFloat(d),
							l = parseFloat($("#grid").jqGrid("getCell", a, f - 3)),
							g = parseFloat($("#grid").jqGrid("getCell", a, f - 2));
						if ($.isNumeric(l) && $.isNumeric(g)) var m = l * g,
							j = m - d,
							h = m ? (100 * d / m).toFixed(amountPlaces) : 0,
							k = $("#grid").jqGrid("setRowData", a, {
								discountRate: h,
								amount: j
							});
						b(a), k && THISPAGE.calTotal();
						break;
					case "amount":
						var d = parseFloat(d),
							n = $("#grid").jqGrid("getRowData", a);
						if ($.isNumeric(d)) {
							var i = parseFloat(n.deduction),
								o = parseFloat(n.qty),
								g = (d + i) / o;
							if ($.isNumeric(o) && $.isNumeric(g)) {
								var m = o * g,
									h = m ? (100 * i / m).toFixed(amountPlaces) : 0;
								$("#grid").jqGrid("setRowData", a, {
									discountRate: h
								})
							}
							$("#grid").jqGrid("setRowData", a, {
								discountRate: h,
								price: g
							})
						}
						b(a), THISPAGE.calTotal();
						break;
					case "taxRate":
						var p = d,
							d = parseFloat(d),
							n = $("#grid").jqGrid("getRowData", a),
							j = parseFloat(n.amount);
						if ($.isNumeric(d)) {
							var q = j * d / 100,
								s = j + q,
								k = $("#grid").jqGrid("setRowData", a, {
									tax: q,
									taxAmount: s
								});
							k && THISPAGE.calTotal();
							break
						}
						if ("" === p) {
							var k = $("#grid").jqGrid("setRowData", a, {
								tax: "",
								taxAmount: j
							});
							k && THISPAGE.calTotal();
							break
						}
					case "tax":
						var d = parseFloat(d),
							n = $("#grid").jqGrid("getRowData", a);
						if ($.isNumeric(d)) {
							var j = parseFloat(n.amount),
								s = j + d,
								k = $("#grid").jqGrid("setRowData", a, {
									taxAmount: s
								});
							k && THISPAGE.calTotal()
						}
						break;
					case "taxAmount":
						var d = parseFloat(d),
							n = $("#grid").jqGrid("getRowData", a);
						if ($.isNumeric(d)) {
							var i = parseFloat(n.deduction),
								t = parseFloat(n.taxRate) / 100,
								j = d / (1 + t),
								o = parseFloat(n.qty),
								h = (100 * i / (j + i)).toFixed(amountPlaces),
								g = (j + i) / o,
								q = d - j,
								k = $("#grid").jqGrid("setRowData", a, {
									discountRate: h,
									price: g,
									amount: j,
									tax: q
								});
							k && THISPAGE.calTotal()
						}
						break;
					case "batch":
						var u = $("#grid").jqGrid("getRowData", a),
							v = $("#" + a).data("goodsInfo") || {};
						if (v.safeDays) {
							var w = {};
							if ($.trim(u.prodDate) || (w.prodDate = r), $.trim(u.safeDays) || (w.safeDays = v.safeDays), !$.trim(u.validDate)) {
								var x = u.prodDate || w.prodDate,
									y = x.split("-");
								if (x = new Date(y[0], y[1] - 1, y[2]), "Invalid Date" === x.toString()) return defaultPage.Public.tips({
									type: 2,
									content: "日期格式错误！"
								}), void setTimeout(function() {
									$("#grid").jqGrid("editCellByColName", a, "prodDate")
								}, 10);
								x && (x.addDays(Number(u.safeDays || w.safeDays)), w.validDate = x.format())
							}
							$.isEmptyObject(w) || $("#grid").jqGrid("setRowData", a, w)
						}
						break;
					case "prodDate":
						var u = $("#grid").jqGrid("getRowData", a),
							v = $("#" + a).data("goodsInfo") || {},
							w = {};
						$.trim(u.safeDays) || (w.safeDays = v.safeDays), $.trim(d) || (w.prodDate = r);
						var x = d || w.prodDate,
							y = x.split("-");
						if (x = new Date(y[0], y[1] - 1, y[2]), "Invalid Date" === x.toString()) return defaultPage.Public.tips({
							type: 2,
							content: "日期格式错误！"
						}), void setTimeout(function() {
							$("#grid").jqGrid("editCellByColName", a, "prodDate")
						}, 10);
						x && (x.addDays(Number(u.safeDays || w.safeDays)), w.validDate = x.format()), $("#grid").jqGrid("setRowData", a, w)
					}
				},
				loadonce: !0,
				resizeStop: function(a, b) {
					q.mod_PageConfig.updatePageConfig("grid", ["width", q.mod_PageConfig.conf.grids.grid.defColModel[b - 1].name, a])
				},
				footerrow: !0,
				userData: {
					goods: "合计：",
					qty: a.totalQty,
					deduction: a.totalDiscount,
					amount: a.totalAmount,
					tax: a.totalTax,
					taxAmount: a.totalTaxAmount
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
		goodsEdittypeInit: function() {
			function a() {
				var a = $(".goodsAuto")[0];
				return a
			}
			function b(a, b, c) {
				if ("get" === b) {
					if ("" !== $(".goodsAuto").getCombo().getValue()) return $(a).val();
					var d = $(a).parents("tr");
					return d.removeData("goodsInfo"), ""
				}
				"set" === b && $("input", a).val(c)
			}
			function c() {
				$("#initCombo").append($(".goodsAuto").val("").unbind("focus.once"))
			}
			0 != $("#grid")[0].p.savedRow.length && $("#grid").jqGrid("saveCell", $("#grid")[0].p.savedRow[0].id, $("#grid")[0].p.savedRow[0].ic), THISPAGE.$_barCodeInsert.hasClass("active") ? $("#grid").jqGrid("setColProp", "goods", {
				edittype: "text",
				editoptions: null
			}) : $("#grid").jqGrid("setColProp", "goods", {
				edittype: "custom",
				editoptions: {
					custom_element: a,
					custom_value: b,
					handle: c,
					trigger: "ui-icon-ellipsis"
				}
			})
		},
		reloadData: function(a) {
			function b() {
				c.$_customer.data("contactInfo", {
					id: a.buId,
					name: a.contactName
				}), c.customerCombo.input.val(a.contactName), c.$_date.val(a.date), c.$_number.text(a.billNo), c.$_note.val(a.description), c.$_discountRate.val(a.disRate), c.$_deduction.val(a.disAmount), c.$_discount.val(a.amount), c.$_payment.val(a.rpAmount), c.accountCombo.selectByValue(a.accId, !1), c.$_accountInfo.data("accountInfo", a.accounts), -1 === a.accId ? c.$_accountInfo.show() : c.$_accountInfo.hide(), c.$_arrears.val(a.arrears), c.$_totalArrears.val(a.totalArrears), c.$_userName.html(a.userName), c.$_modifyTime.html(a.modifyTime), c.$_checkName.html(a.checkName)
			}
			$("#grid").clearGridData();
			var c = this;
			originalData = a;
			var d = 8 - a.entries.length;
			if (d > 0) for (var e = 0; d > e; e++) a.entries.push({});
			$("#grid").jqGrid("setGridParam", {
				data: a.entries,
				userData: {
					qty: a.totalQty,
					deduction: a.totalDiscount,
					amount: a.totalAmount,
					tax: a.totalTax,
					taxAmount: a.totalTaxAmount
				}
			}).trigger("reloadGrid"), b(), "edit" === a.status ? this.editable || (c.enableEdit(), $("#groupBtn").html(c.btn_edit + c.btn_audit), $("#mark").removeClass("has-audit")) : this.editable && (c.disableEdit(), $("#groupBtn").html(c.btn_view + c.btn_reaudit), $("#mark").addClass("has-audit"))
		},
		initCombo: function() {
			this.goodsCombo = Business.billGoodsCombo($(".goodsAuto"), {
				userData: {
					creatable: "150502" != originalData.transType
				}
			}), this.storageCombo = Business.billStorageCombo($(".storageAuto")), this.unitCombo = Business.unitCombo($(".unitAuto"), {
				defaultSelected: -1,
				forceSelection: !1
			}), this.cellPikaday = new Pikaday({
				field: $(".dateAuto")[0],
				editable: !1
			}), this.batchCombo = Business.batchCombo($(".batchAuto"))
		},
		disableEdit: function() {
			this.customerCombo.disable(), this.$_date.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_note.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_discountRate.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_deduction.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_payment.attr("disabled", "disabled").addClass("ui-input-dis"), this.accountCombo.disable(), $("#grid").jqGrid("setGridParam", {
				cellEdit: !1
			}), this.editable = !1
		},
		enableEdit: function() {
			disEditable || (!hideCustomerCombo && this.customerCombo.enable(), this.$_date.removeAttr("disabled").removeClass("ui-input-dis"), this.$_note.removeAttr("disabled").removeClass("ui-input-dis"), this.$_discountRate.removeAttr("disabled").removeClass("ui-input-dis"), this.$_deduction.removeAttr("disabled").removeClass("ui-input-dis"), this.$_payment.removeAttr("disabled").removeClass("ui-input-dis"), this.accountCombo.enable(), $("#grid").jqGrid("setGridParam", {
				cellEdit: !0
			}), this.editable = !0)
		},
		chooseAccount: function(a) {
			var b = this;
			b.$_accountInfo.show(), b.$_payment.attr("disabled", "disabled").addClass("ui-input-dis"), $.dialog({
				width: 670,
				height: 250,
				title: "多账户结算",
				content: "url:../settings/choose_account",
				data: {
					accountInfo: a,
					type: "purchase"
				},
				lock: !0,
				ok: function() {
					var a = this.content.callback();
					return a ? (b.$_payment.val(a.payment).trigger("keyup"), b.$_accountInfo.data("accountInfo", a.accounts), b.accountCombo.blur(), void 0) : !1
				},
				cancel: function() {
					var a = b.$_accountInfo.data("accountInfo");
					a ? 1 === a.length && b.accountCombo.selectByValue(a[0].accId) : b.accountCombo.selectByValue(0)
				}
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
			}), this.$_note.enterKey(), this.$_discount.enterKey(), this.$_discountRate.enterKey(), $(".grid-wrap").on("click", ".ui-icon-triangle-1-s", function() {
				var b = $(this).siblings();
				setTimeout(function() {
					b.hasClass("unitAuto") ? b.trigger("click") : (a.storageCombo.active = !0, a.storageCombo.doQuery())
				}, 10)
			}), Business.billsEvent(a, "purchase"), this.$_deduction.keyup(function() {
				var b = Number($(this).val()),
					c = Number($("#grid").jqGrid("footerData", "get")[a.calAmount].replace(/,/g, "")),
					d = (c - b).toFixed(amountPlaces);
				if (c) {
					var e = b / c * 100,
						f = d - Number($.trim(a.$_payment.val()));
					THISPAGE.$_discountRate.val(e.toFixed(amountPlaces)), THISPAGE.$_discount.val(d), THISPAGE.$_arrears.val(f.toFixed(amountPlaces))
				}
			}).on("keypress", function(a) {
				Public.numerical(a)
			}).on("focus", function() {
				this.select()
			}).blur(function() {
				$(this).val() < 0 && (defaultPage.Public.tips({
					type: 2,
					content: "优惠金额不能为负数！"
				}), $(this).focus())
			}), this.$_discountRate.keyup(function() {
				var b = Number($(this).val()),
					c = Number($("#grid").jqGrid("footerData", "get")[a.calAmount].replace(/,/g, "")),
					d = c * (b / 100),
					e = d.toFixed(amountPlaces),
					f = (c - e).toFixed(amountPlaces),
					g = f - Number($.trim(a.$_payment.val()));
				THISPAGE.$_deduction.val(e), THISPAGE.$_discount.val(f), THISPAGE.$_arrears.val(g.toFixed(amountPlaces))
			}).on("keypress", function(a) {
				Public.numerical(a)
			}).on("focus", function() {
				this.select()
			}).blur(function() {
				$(this).val() < 0 && (defaultPage.Public.tips({
					type: 2,
					content: "优惠率不能为负数！"
				}), $(this).focus())
			}), this.$_payment.keyup(function() {
				var b = $(this).val() || 0,
					c = a.$_discount.val(),
					d = Number(parseFloat(c) - parseFloat(b)),
					e = Number(d + THISPAGE.customerArrears);
				THISPAGE.$_arrears.val(d.toFixed(amountPlaces)), THISPAGE.$_totalArrears.val(e.toFixed(amountPlaces));
				var f = a.$_accountInfo.data("accountInfo");
				f && 1 === f.length && (f[0].payment = b)
			}).on("keypress", function(a) {
				Public.numerical(a)
			}).on("focus", function() {
				this.select()
			}), $(".wrapper").on("click", "#save", function(b) {
				b.preventDefault();
				var c = $(this),
					d = THISPAGE.getPostData();
				d && ("edit" === originalData.stata && (d.id = originalData.id, d.stata = "edit"), c.ajaxPost("../scm/invPu/add?action=add", {
					postData: JSON.stringify(d)
				}, function(b) {
					200 === b.status ? (a.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), originalData.id = b.data.id, a.$_toolBottom.html(billRequiredCheck ? '<span id="groupBtn">' + a.btn_edit + a.btn_audit + "</span>" : '<span id="groupBtn">' + a.btn_edit + "</span>"), parent.Public.tips({
						content: "保存成功！"
					})) : parent.Public.tips({
						type: 1,
						content: b.msg
					})
				}))
			}), $(".wrapper").on("click", "#savaAndAdd", function(b) {
				b.preventDefault();
				var c = $(this),
					d = THISPAGE.getPostData();
				d && c.ajaxPost("../scm/invPu/addNew?action=addNew", {
					postData: JSON.stringify(d)
				}, function(b) {
					if (200 === b.status) {
						a.$_number.text(b.data.billNo), $("#grid").clearGridData(), $("#grid").clearGridData(!0);
						for (var c = 1; 8 >= c; c++) $("#grid").jqGrid("addRowData", c, {});
						a.newId = 9, a.$_note.val(""), a.$_discountRate.val(originalData.disRate), a.$_deduction.val(originalData.disAmount), a.$_discount.val(originalData.amount), a.$_payment.val(originalData.rpAmount), a.$_arrears.val(originalData.arrears), a.accountCombo.selectByValue(0, !0), parent.Public.tips({
							content: "保存成功！"
						})
					} else parent.Public.tips({
						type: 1,
						content: b.msg
					})
				})
			}), $(".wrapper").on("click", "#edit", function(b) {
				if (b.preventDefault(), Business.verifyRight("PU_UPDATE")) {
					var c = $(this),
						d = THISPAGE.getPostData();
					d && c.ajaxPost("../scm/invPu/updateInvPu?action=updateInvPu", {
						postData: JSON.stringify(d)
					}, function(b) {
						200 === b.status ? (a.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), originalData.id = b.data.id, parent.Public.tips({
							content: "修改成功！"
						})) : parent.Public.tips({
							type: 1,
							content: b.msg
						})
					})
				}
			}), $(".wrapper").on("click", "#audit", function(b) {
				if (b.preventDefault(), Business.verifyRight("PU_CHECK")) {
					var c = $(this),
						d = THISPAGE.getPostData({
							checkSerNum: !0
						});
					d && c.ajaxPost("../scm/invPu/checkInvPu?action=checkInvPu", {
						postData: JSON.stringify(d)
					}, function(b) {
						200 === b.status ? (originalData.id = b.data.id, $("#mark").addClass("has-audit"), a.$_checkName.html(SYSTEM.realName).parent().show(), $("#edit").hide(), a.disableEdit(), $("#groupBtn").html(a.btn_view + a.btn_reaudit), parent.Public.tips({
							content: "审核成功！"
						})) : parent.Public.tips({
							type: 1,
							content: b.msg
						})
					})
				}
			}), $(".wrapper").on("click", "#reAudit", function(b) {
				if (b.preventDefault(), Business.verifyRight("PU_UNCHECK")) {
					var c = $(this),
						d = THISPAGE.getPostData();
					d && c.ajaxPost("../scm/invPu/revsCheckInvPu?action=revsCheckInvPu", {
						postData: JSON.stringify(d)
					}, function(b) {
						200 === b.status ? ($("#mark").removeClass(), $("#edit").show(), a.$_checkName.html(""), a.enableEdit(), $("#groupBtn").html(a.btn_edit + a.btn_audit), parent.Public.tips({
							content: "反审核成功！"
						})) : parent.Public.tips({
							type: 1,
							content: b.msg
						})
					})
				}
			}), $(".wrapper").on("click", "#add", function(a) {
				if (a.preventDefault(), Business.verifyRight("PU_ADD")) {
					var b = "购货单",
						c = "purchase-purchase";
					if ("150502" == originalData.transType) var b = "购货退货单",
						c = "purchase-purchaseBack";
					parent.tab.overrideSelectedTabItem({
						tabid: c,
						text: b,
						url: "../scm/invPu?action=initPur&transType=" + originalData.transType
					})
				}
			}), $(".wrapper").on("click", "#print", function(a) {
				a.preventDefault(), Business.verifyRight("PU_PRINT") && Public.print({
					title: "购货单列表",
					$grid: $("#grid"),
					pdf: "../scm/invPu/toPdf?action=toPdf",
					billType: 10101,
					filterConditions: {
						id: originalData.id
					}
				})
			}), this.$_accountInfo.click(function() {
				var b = $(this).data("accountInfo");
				a.chooseAccount(b)
			}), $("#prev").click(function(b) {
				return b.preventDefault(), $(this).hasClass("ui-btn-prev-dis") ? (parent.Public.tips({
					type: 2,
					content: "已经没有上一张了！"
				}), !1) : (a.idPostion = a.idPostion - 1, 0 === a.idPostion && $(this).addClass("ui-btn-prev-dis"), loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("../scm/invPu/update?action=update", {
					id: a.idList[a.idPostion]
				}, function(b) {
					originalData.id = a.idList[a.idPostion], THISPAGE.reloadData(b.data), $("#next").removeClass("ui-btn-next-dis"), loading && loading.close()
				}), void 0)
			}), $("#next").click(function(b) {
				return b.preventDefault(), $(this).hasClass("ui-btn-next-dis") ? (parent.Public.tips({
					type: 2,
					content: "已经没有下一张了！"
				}), !1) : (a.idPostion = a.idPostion + 1, a.idLength === a.idPostion + 1 && $(this).addClass("ui-btn-next-dis"), loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("../scm/invPu/update?action=update", {
					id: a.idList[a.idPostion]
				}, function(b) {
					originalData.id = a.idList[a.idPostion], THISPAGE.reloadData(b.data), $("#prev").removeClass("ui-btn-prev-dis"), loading && loading.close()
				}), void 0)
			}), THISPAGE.$_barCodeInsert.click(function() {
				var b = 1;
				THISPAGE.$_barCodeInsert.hasClass("active") ? (THISPAGE.$_barCodeInsert.removeClass("active"), b = null) : THISPAGE.$_barCodeInsert.addClass("active"), a.goodsEdittypeInit(), $.cookie("BarCodeInsert", b)
			}), $(document).on("click", "#ldg_lockmask", function(a) {
				a.stopPropagation()
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
			for (var a = $("#grid").jqGrid("getDataIDs"), b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = a.length; h > g; g++) {
				var i = a[g],
					j = $("#grid").jqGrid("getRowData", i);
				j.qty && (b += parseFloat(j.qty)), j.deduction && (c += parseFloat(j.deduction)), j.amount && (d += parseFloat(j.amount)), j.tax && (e += parseFloat(j.tax)), j.taxAmount && (f += parseFloat(j.taxAmount))
			}
			if ($("#grid").jqGrid("footerData", "set", {
				qty: b,
				deduction: c,
				amount: d,
				tax: e,
				taxAmount: f
			}), taxRequiredCheck) var k = (f - Number(this.$_deduction.val())).toFixed(2);
			else var k = (d - Number(this.$_deduction.val())).toFixed(2);
			var l = (k - Number(this.$_payment.val())).toFixed(2);
			this.$_discount.val(k), this.$_arrears.val(l)
		},
		_getEntriesData: function(a) {
			a = a || {};
			for (var b = [], c = $("#grid").jqGrid("getDataIDs"), d = 0, e = c.length; e > d; d++) {
				var f, g = c[d],
					h = $("#grid").jqGrid("getRowData", g);
				if ("" !== h.goods) {
					var i = $("#" + g).data("goodsInfo");
					if (i) {
						var j = $("#" + g).data("storageInfo");
						if (!j || !j.id) return parent.Public.tips({
							type: 2,
							content: "请选择相应的仓库！"
						}), $("#grid").jqGrid("editCellByColName", g, "locationName"), !1;
						var k = $("#" + g).data("unitInfo") || {};
						if (SYSTEM.ISSERNUM) {
							var l = i.serNumList;
							if (l || l && l.length != i.qty);
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
							discountRate: h.discountRate,
							deduction: h.deduction,
							amount: h.amount,
							locationId: j.id,
							locationName: j.name,
							description: h.description,
							srcOrderEntryId: h.srcOrderEntryId,
							srcOrderId: h.srcOrderId,
							srcOrderNo: h.srcOrderNo,
							serNumList: l
						}, SYSTEM.ISWARRANTY && $.extend(!0, f, {
							batch: h.batch || "",
							prodDate: h.prodDate || "",
							safeDays: h.safeDays || "",
							validDate: h.validDate || ""
						}), taxRequiredCheck && (f.taxRate = h.taxRate, f.tax = h.tax, f.taxAmount = h.taxAmount), b.push(f)
					}
				}
			}
			return b
		},
		getPostData: function(a) {
			var b = this,
				c = this;
			null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null);
			var d = c.$_customer.find("input");
			if ("" === d.val()) return c.$_customer.removeData("contactInfo"), parent.Public.tips({
				type: 2,
				content: "请选择供应商！"
			}), !1;
			var e = c.$_customer.data("contactInfo");
			if (!e || !e.id) return setTimeout(function() {
				d.focus().select()
			}, 15), parent.Public.tips({
				type: 2,
				content: "当前供应商不存在！"
			}), !1;
			var f = this._getEntriesData(a);
			if (!f) return !1;
			if (f.length > 0) {
				var g = $.trim(b.$_note.val()),
					h = {
						id: originalData.id,
						buId: e.id,
						contactName: e.name,
						date: $.trim(b.$_date.val()),
						billNo: $.trim(b.$_number.text()),
						transType: originalData.transType,
						entries: f,
						totalQty: $("#grid").jqGrid("footerData", "get").qty.replace(/,/g, ""),
						totalAmount: $("#grid").jqGrid("footerData", "get").amount.replace(/,/g, ""),
						description: g === b.$_note[0].defaultValue ? "" : g,
						disRate: $.trim(b.$_discountRate.val() || 0),
						disAmount: $.trim(b.$_deduction.val() || 0),
						amount: $.trim(b.$_discount.val()),
						rpAmount: $.trim(b.$_payment.val() || 0),
						arrears: $.trim(b.$_arrears.val()),
						totalArrears: ""
					};
				if (h.disRate < 0) return defaultPage.Public.tips({
					type: 2,
					content: "优惠率不能为负数！"
				}), !1;
				if (h.disAmount < 0) return defaultPage.Public.tips({
					type: 2,
					content: "优惠金额不能为负数！"
				}), !1;
				if (taxRequiredCheck && (h.totalTax = $("#grid").jqGrid("footerData", "get").tax.replace(/,/g, ""), h.totalTaxAmount = $("#grid").jqGrid("footerData", "get").taxAmount.replace(/,/g, "")), requiredMoney) {
					h.accId = b.accountCombo.getValue(), h.accounts = b.$_accountInfo.data("accountInfo");
					var i = "150501" == h.transType ? "付款额" : "退款额";
					if (0 !== Number(h.rpAmount) && 0 === h.accId) return parent.Public.tips({
						type: 1,
						content: i + "不为空时，请选择结算账户！"
					}), !1;
					if (0 === Number(h.rpAmount) && 0 !== h.accId) return parent.Public.tips({
						type: 1,
						content: "结算账户不为空时，需要输入" + i + "！"
					}), !1;
					if (-1 === h.accId && !h.accounts) return parent.Public.tips({
						type: 1,
						content: "请检查账户信息是否正确！"
					}), !1
				}
				return h
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
	if (urlParam.id) {
		if (!hasLoaded) {
			var a = $(".bills").hide();
			urlParam.turn ? Public.ajaxGet("../scm/invPo/queryDetails?action=queryDetails", {
				id: urlParam.id
			}, function(b) {
				200 === b.status ? (originalData = b.data, originalData.id = -1, originalData.orderId = b.data.id, originalData.orderNo = b.data.billNo, originalData.status = "add", THISPAGE.init(b.data), a.show(), hasLoaded = !0) : (parent.Public.tips({
					type: 1,
					content: b.msg
				}), a.show(), originalData = {
					id: -1,
					status: "add",
					customer: 0,
					transType: 150501,
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
					description: "",
					totalQty: 0,
					totalDiscount: 0,
					totalAmount: 0,
					totalTax: 0,
					totalTaxAmount: 0,
					disRate: 0,
					disAmount: 0,
					amount: "0.00",
					rpAmount: "0.00",
					arrears: "0.00",
					accId: 0
				}, originalData.transType = "150502" === urlParam.transType ? "150502" : "150501", THISPAGE.init(originalData))
			}) : Public.ajaxGet("../scm/invPu/update?action=update", {
				id: urlParam.id
			}, function(b) {
				200 === b.status ? (originalData = b.data, THISPAGE.init(b.data), a.show(), hasLoaded = !0) : parent.Public.tips({
					type: 1,
					content: b.msg
				})
			})
		}
	} else originalData = {
		id: -1,
		status: "add",
		customer: 0,
		transType: 150501,
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
		description: "",
		totalQty: 0,
		totalDiscount: 0,
		totalAmount: 0,
		totalTax: 0,
		totalTaxAmount: 0,
		disRate: 0,
		disAmount: 0,
		amount: "0.00",
		rpAmount: "0.00",
		arrears: "0.00",
		accId: 0
	}, originalData.transType = "150502" === urlParam.transType ? "150502" : "150501", THISPAGE.init(originalData)
});


 