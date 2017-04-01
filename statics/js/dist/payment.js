function setFilter(a, b) {
	for (var c, d = a.$("#grid").jqGrid("getGridParam", "selarrrow"), e = d.length, f = b.jqGrid("getDataIDs"), g = f.length, h = 0; g > h; h++) {
		var i = $("#" + f[h]).data("billInfo");
		if (!i) {
			c = f[h];
			break
		}
	}
	var j = g - h,
		k = e - j;
	if (void 0 === c && (c = "so" + billId), k > 0) {
		for (var l = []; k;) l.push({
			id: billId
		}), k--, billId++;
		$("#grid").jqGrid("addRowData", "id", l, "after", c)
	}
	e > 0 && $.each(d, function(b, d) {
		var e = a.$("#grid").jqGrid("getRowData", d);
		$("#grid").jqGrid("setRowData", c, e), c = $("#" + c).data("billInfo", e).next().attr("id")
	}), THISPAGE.calTotal()
}
var curRow, curCol, curArrears, loading, SYSTEM = parent.SYSTEM,
	VERSION = 1,
	//VERSION = parent.SYSTEM.siType,
	billRequiredCheck = SYSTEM.billRequiredCheck,
	urlParam = Public.urlParam(),
	qtyPlaces = Number(parent.SYSTEM.qtyPlaces),
	pricePlaces = Number(parent.SYSTEM.pricePlaces),
	amountPlaces = Number(parent.SYSTEM.amountPlaces),
	disEditable = urlParam.disEditable;
if (2 === VERSION) var accountId = 4,
	billId = initBillId = 6;
else var accountId = 9;
var THISPAGE = {
	init: function(a) {
		this.loadGrid(a), this.initDom(a), this.initCombo(), 2 === VERSION ? ($("#standardVersion").show(), this.extendFun(a)) : $("#amountArea").hide(), a.id > 0 && a.checked ? this.disableEdit() : (this.editable = !0, $("#grid").jqGrid("setGridParam", {
			cellEdit: !0
		}), $("#accountGrid").jqGrid("setGridParam", {
			cellEdit: !0
		})), this.addEvent()
	},
	initDom: function(a) {
		if (this.$_customer = $("#customer"), this.$_date = $("#date").val(SYSTEM.endDate), this.$_number = $("#number"), this.$_discount = $("#discount"), this.$_payment = $("#payment"), this.$_toolTop = $("#toolTop"), this.$_toolBottom = $("#toolBottom"), this.$_userName = $("#userName"), this.$_modifyTime = $("#modifyTime"), this.$_checkName = $("#checkName"), this.$_note = $("#note"), this.$_note.placeholder(), "add" === a.status);
		else {
			["id", a.buId]
		}
		var b = '<a id="savaAndAdd" class="ui-btn ui-btn-sp mrb">保存并新增</a><a id="save" class="ui-btn">保存</a>',
			c = '<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a id="edit" class="ui-btn mrb">保存</a>',
			d = '<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><b></b></a>',
			e = "",
			f = "",
			g = "";
		billRequiredCheck ? (e = '<a class="ui-btn" id="audit">审核</a>', f = '<a class="ui-btn" id="reAudit">反审核</a>') : this.$_checkName.parent().hide();
		var h = '<a class="ui-btn-prev" id="prev" title="上一张"><b></b></a><a class="ui-btn-next" id="next" title="下一张"><b></b></a>';
		b += g, this.btn_edit = c, this.btn_audit = e, this.btn_view = d, this.btn_reaudit = f, this.btn_tempSave = g;
		if (this.customerCombo = Business.billSupplierCombo($("#customer"), {
			defaultSelected: 0,
			emptyOptions: !0
		}), this.$_date.datepicker({
			onSelect: function(a) {
				var b = a.format("yyyy-MM-dd");
				THISPAGE.$_number.text(""), Public.ajaxPost("../basedata/systemProfile/generateDocNo?action=generateDocNo", {
					billType: "PAYMENT",
					billDate: b
				}, function(a) {
					200 === a.status ? THISPAGE.$_number.text(a.data.billNo) : parent.Public.tips({
						type: 1,
						content: a.msg
					})
				})
			}
		}), this.$_discount.val(a.discount), this.$_payment.val(a.payment), a.id > 0) {
			if (this.$_customer.data("contactInfo", {
				id: a.buId,
				name: a.contactName
			}), this.customerCombo.input.val(a.contactName), this.$_number.text(a.billNo), this.$_date.val(a.date), a.description && this.$_note.val(a.description), "list" !== urlParam.flag && (h = ""), "edit" === a.status) {
				var i = "<span id=groupBtn>" + c + e + "</span>" + h;
				a.temp || (i += g), this.$_toolBottom.html(i), !a.temp
			} else a.checked ? ($("#mark").addClass("has-audit"), this.$_toolBottom.html('<span id="groupBtn">' + d + f + "</span>" + h)) : this.$_toolBottom.html('<span id="groupBtn">' + d + "</span>" + h);
			$("#print").on("click", function(a) {
				return Business.verifyRight("PAYMENT_PRINT") ? void 0 : void a.preventDefault()
			}), this.paymentListIds = parent.paymentListIds || [], this.idPostion = $.inArray(String(a.id), this.paymentListIds), this.idLength = this.paymentListIds.length, 0 === this.idPostion && $("#prev").addClass("ui-btn-prev-dis"), this.idPostion === this.idLength - 1 && $("#next").addClass("ui-btn-next-dis"), this.$_userName.html(a.userName), this.$_modifyTime.html(a.modifyTime), this.$_checkName.html(a.checkName)
		} else this.$_toolBottom.html(billRequiredCheck ? "<span id=groupBtn>" + b + e + "</span>" : '<span id="groupBtn">' + b + "</span>"), this.$_userName.html(SYSTEM.realName || ""), this.$_modifyTime.parent().hide(), this.$_checkName.parent().hide();
		disEditable && (THISPAGE.disableEdit(), this.$_toolBottom.hide())
	},
	loadGrid: function(a) {
		function b() {
			var a = $(".accountAuto")[0];
			return a
		}
		function c(a, b, c) {
			if ("get" === b) {
				if ("" !== $(".accountAuto").getCombo().getValue()) return $(a).val();
				var d = $(a).parents("tr");
				return d.removeData("accountInfo"), ""
			}
			"set" === b && $("input", a).val(c)
		}
		function d() {
			$("#initCombo").append($(".accountAuto").val(""))
		}
		function e() {
			var a = $(".paymentAuto")[0];
			return a
		}
		function f(a, b, c) {
			if ("get" === b) {
				if ("" !== $(".paymentAuto").getCombo().getValue()) return $(a).val();
				var d = $(a).parents("tr");
				return d.removeData("paymentInfo"), ""
			}
			"set" === b && $("input", a).val(c)
		}
		function g() {
			$("#initCombo").append($(".paymentAuto").val(""))
		}
		var h = this;
		if (a.id) {
			var i = a.accounts.length,
				j = accountId - i - 1;
			if (j > 0) for (var k = 0; j > k; k++) a.accounts.push({
				id: i + k + 1
			});
			else accountId = i + 1
		}
		$("#accountGrid").jqGrid({
			data: a.accounts,
			datatype: "clientSide",
			autowidth: !0,
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
				name: "accName",
				label: "结算账户",
				width: 200,
				classes: "ui-ellipsis",
				editable: !0,
				edittype: "custom",
				editoptions: {
					custom_element: b,
					custom_value: c,
					handle: d,
					trigger: "ui-icon-triangle-1-s account-trigger"
				}
			}, {
				name: "payment",
				label: "付款金额",
				width: 100,
				align: "right",
				formatter: "currency",
				formatoptions: {
					showZero: !0,
					decimalPlaces: amountPlaces
				},
				editable: !0
			}, {
				name: "wayName",
				label: "结算方式",
				width: 100,
				editable: !0,
				edittype: "custom",
				editoptions: {
					custom_element: e,
					custom_value: f,
					handle: g,
					trigger: "ui-icon-triangle-1-s payment-trigger"
				}
			}, {
				name: "settlement",
				label: "结算号",
				width: 100,
				editable: !0
			}, {
				name: "remark",
				label: "备注",
				width: 200,
				editable: !0
			}],
			cmTemplate: {
				sortable: !1,
				title: !1
			},
			idPrefix: "ac",
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
				root: "data.account",
				records: "records",
				repeatitems: !1,
				id: "id"
			},
			loadComplete: function(a) {
				if (urlParam.id > 0) {
					h.paymentTotal();
					for (var b = a.rows, c = 0, d = b.length; d > c; c++) {
						var e = c + 1,
							f = b[c];
						if ($.isEmptyObject(b[c])) break;
						$("#ac" + e).data("accountInfo", {
							id: f.accId,
							name: f.accName
						}).data("paymentInfo", {
							id: f.wayId,
							name: f.wayName
						})
					}
				}
			},
			gridComplete: function() {
				setTimeout(function() {
					Public.autoGrid($("#accountGrid"))
				}, 10)
			},
			afterEditCell: function(a, b, c, d) {
				"accName" === b && ($("#" + d + "_accName", "#accountGrid").val(c), h.accountCombo.selectByText(c)), "wayName" === b && $("#" + d + "_wayName", "#accountGrid").val(c)
			},
			afterSaveCell: function(a, b) {
				accountId = h.newId, "payment" == b && (h.paymentTotal(), 2 === VERSION && h.$_discount.trigger("keyup"))
			},
			afterRestoreCell: function() {
				accountId = h.newId
			},
			loadonce: !0,
			footerrow: !0,
			userData: {
				accName: "合计：",
				payment: a.acPayment
			},
			userDataOnFooter: !0
		})
	},
	extendFun: function(a) {
		var b = this;
		if (a.id) {
			var c = a.entries.length,
				d = initBillId - c - 1;
			if (d > 0) for (var e = 0; d > e; e++) a.entries.push({
				id: c + e + 1
			});
			else billId = c + 1
		}
		$("#grid").jqGrid({
			data: a.entries,
			datatype: "clientSide",
			autowidth: !0,
			height: "100%",
			idPrefix: "so",
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
				name: "billNo",
				label: "源单编号",
				width: 150,
				title: !1,
				classes: "ui-ellipsis"
			}, {
				name: "transType",
				label: "业务类别",
				width: 100,
				title: !1
			}, {
				name: "billDate",
				label: "单据日期",
				width: 100,
				title: !1,
				align: "center"
			}, {
				name: "billPrice",
				label: "单据金额",
				width: 100,
				title: !1,
				align: "right",
				formatter: "currency",
				formatoptions: {
					showZero: !0,
					decimalPlaces: amountPlaces
				}
			}, {
				name: "hasCheck",
				label: "已核销金额",
				width: 100,
				title: !1,
				align: "right",
				formatter: "currency",
				formatoptions: {
					showZero: !0,
					decimalPlaces: amountPlaces
				}
			}, {
				name: "notCheck",
				label: "未核销金额",
				width: 100,
				title: !1,
				align: "right",
				formatter: "currency",
				formatoptions: {
					showZero: !0,
					decimalPlaces: amountPlaces
				}
			}, {
				name: "nowCheck",
				label: "本次核销金额",
				width: 100,
				title: !1,
				align: "right",
				formatter: "currency",
				formatoptions: {
					showZero: !0,
					decimalPlaces: amountPlaces
				},
				editable: !0
			}],
			cmTemplate: {
				sortable: !1
			},
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
				if (urlParam.id > 0) {
					b.calTotal(!1);
					for (var c = a.rows, d = 0, e = c.length; e > d; d++) {
						var f = d + 1,
							g = c[d];
						if (void 0 === g.billId) break;
						$("#so" + f).data("billInfo", g)
					}
				}
			},
			gridComplete: function() {
				setTimeout(function() {
					Public.autoGrid($("#grid"))
				}, 10)
			},
			afterEditCell: function(a, c, d, e) {
				"billNo" === c && ($("#" + e + "_billNo", "#grid").val(d), b.billCombo.selectByText(d))
			},
			formatCell: function() {},
			beforeSubmitCell: function() {},
			afterSaveCell: function(a, c) {
				if (billId = b.newId, "billNo" == c) {
					var d = $("#" + a).data("billInfo");
					if (d) {
						var e = $("#grid").jqGrid("setRowData", a, {
							transType: d.transType,
							billDate: d.billDate,
							billPrice: d.billPrice,
							hasCheck: d.hasCheck,
							notCheck: d.notCheck
						});
						e && b.calTotal()
					}
				}
				"nowCheck" == c && (b.calTotal(!1), 2 === VERSION && b.$_discount.trigger("keyup"))
			},
			afterRestoreCell: function() {
				billId = b.newId
			},
			loadonce: !0,
			footerrow: !0,
			userData: {
				billNo: "合计：",
				billPrice: a.billPrice,
				hasCheck: a.billHasCheck,
				notCheck: a.billNotCheck,
				nowCheck: a.billNowCheck
			},
			userDataOnFooter: !0,
			loadError: function(a, b) {
				Public.tips({
					type: 1,
					content: "Type: " + b + "; Response: " + a.status + " " + a.statusText
				})
			}
		})
	},
	reloadData: function(a) {
		function b() {
			c.$_customer.data("contactInfo", {
				id: a.buId,
				name: a.contactName
			}), c.customerCombo.input.val(a.contactName), c.$_date.val(a.date), c.$_number.text(a.billNo), a.note && c.$_note.val(a.note), c.$_discount.val(a.discount), c.$_payment.val(a.payment), c.$_userName.html(a.userName), c.$_modifyTime.html(a.modifyTime), c.$_checkName.html(a.checkName)
		}
		$("#grid").clearGridData();
		var c = this;
		originalData = a;
		var d = 3 - a.accounts.length;
		if (d > 0) for (var e = 0; d > e; e++) a.accounts.push({});
		var f = 5 - a.entries.length;
		if (f > 0) for (var e = 0; f > e; e++) a.entries.push({});
		$("#accountGrid").jqGrid("setGridParam", {
			data: a.accounts,
			userData: {
				accName: "合计：",
				payment: a.acPayment
			},
			cellEdit: !0,
			datatype: "clientSide"
		}).trigger("reloadGrid"), $("#grid").jqGrid("setGridParam", {
			data: a.entries,
			userData: {
				billNo: "合计：",
				billPrice: a.billPrice,
				hasCheck: a.billHasCheck,
				notCheck: a.billNotCheck,
				nowCheck: a.billNowCheck
			},
			cellEdit: !0,
			datatype: "clientSide"
		}).trigger("reloadGrid"), b(), "edit" === a.status ? this.editable || (c.enableEdit(), $("#groupBtn").html(c.btn_edit + c.btn_audit), $("#mark").removeClass("has-audit")) : this.editable && (c.disableEdit(), $("#groupBtn").html(c.btn_view + c.btn_reaudit), $("#mark").addClass("has-audit"))
	},
	initCombo: function() {
		this.accountCombo = Business.accountCombo($(".accountAuto"), {
			editable: !0,
			trigger: !1,
			callback: {
				onChange: function(a) {
					var b = this.input.parents("tr");
					a && b.data("accountInfo", a)
				}
			}
		}), Business.paymentCombo($(".paymentAuto"), {
			callback: {
				onChange: function(a) {
					var b = this.input.parents("tr");
					a && b.data("paymentInfo", a)
				}
			}
		})
	},
	addEvent: function() {
		var a = this;
		this.customerCombo.input.enterKey(), this.$_note.enterKey(), this.$_date.bind("keydown", function(a) {
			13 === a.which && $("#grid").jqGrid("editCell", 1, 2, !0)
		}).bind("focus", function() {
			a.dateValue = $(this).val()
		}).bind("blur", function() {
			var b = /((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/;
			b.test($(this).val()) || (parent.Public.tips({
				type: 2,
				content: "日期格式有误！如：2012-08-08。"
			}), $(this).val(a.dateValue))
		}), this.$_discount.keyup(function() {
			var b = parseFloat($(this).val()) || 0,
				c = Number($("#accountGrid").jqGrid("footerData", "get").payment.replace(/,/g, "")),
				d = Number($("#grid").jqGrid("footerData", "get").nowCheck.replace(/,/g, "")),
				e = (c - (d ? d : 0) + b).toFixed(amountPlaces);
			a.$_payment.val(e)
		}).on("keypress", function(a) {
			Public.numerical(a)
		}).on("focus", function() {
			this.select()
		}), $(".grid-wrap").on("click", ".account-trigger", function() {
			setTimeout(function() {
				a.accountCombo._onTriggerClick()
			}, 10)
		}), $(".grid-wrap").on("click", ".payment-trigger", function() {
			setTimeout(function() {
				$(".paymentAuto").trigger("click")
			}, 10)
		}), $(document).bind("click.cancel", function(a) {
			null !== curRow && null !== curCol && (!$(a.target).closest("#accountGrid").length > 0 && $("#accountGrid").jqGrid("saveCell", curRow, curCol), !$(a.target).closest("#grid").length > 0 && $("#grid").jqGrid("saveCell", curRow, curCol))
		}), $("#acGridWrap").on("click", function() {
			a.newId = accountId

		}), $("#billGridWrap").on("click", function() {
			a.newId = billId
		}), $("#acGridWrap").on("click", ".ui-icon-plus", function() {
			a.newId = accountId;
			var b = "ac" + $(this).parent().data("id"),
				c = ($("#accountGrid tbody tr").length, {
					id: a.newId
				}),
				d = $("#accountGrid").jqGrid("addRowData", a.newId, c, "after", b);
			d && ($(this).parents("td").removeAttr("class"), $(this).parents("tr").removeClass("selected-row ui-state-hover"), $("#accountGrid").jqGrid("resetSelection"), accountId++)
		}), $("#acGridWrap").on("click", ".ui-icon-trash", function() {
			if (2 === $("#accountGrid tbody tr").length) return parent.Public.tips({
				type: 2,
				content: "至少保留一条分录！"
			}), !1;
			var b = "ac" + $(this).parent().data("id"),
				c = $("#accountGrid").jqGrid("delRowData", b);
			c && a.calTotal()
		}), $("#billGridWrap").on("click", ".ui-icon-plus", function() {
			a.newId = billId;
			var b = "so" + $(this).parent().data("id"),
				c = ($("#grid tbody tr").length, {
					id: a.newId
				}),
				d = $("#grid").jqGrid("addRowData", a.newId, c, "after", b);
			d && ($(this).parents("td").removeAttr("class"), $(this).parents("tr").removeClass("selected-row ui-state-hover"), $("#grid").jqGrid("resetSelection"), billId++)
		}), $("#billGridWrap").on("click", ".ui-icon-trash", function() {
			if (2 === $("#grid tbody tr").length) return parent.Public.tips({
				type: 2,
				content: "至少保留一条分录！"
			}), !1;
			var b = "so" + $(this).parent().data("id"),
				c = $("#grid").jqGrid("delRowData", b);
			c && a.calTotal()
		}), Business.billsEvent(a, "payment"), $(".wrapper").on("click", "#save", function(b) {
			b.preventDefault();
			var c = $(this);
			if (c.hasClass("ui-btn-dis")) return void parent.Public.tips({
				type: 2,
				content: "正在保存，请稍后..."
			});
			if (Business.verifyRight("PAYMENT_ADD")) {
				var d = THISPAGE.getPostData();
				d && ("edit" === originalData.stata && (d.id = originalData.id, d.stata = "edit"), c.addClass("ui-btn-dis"), Public.ajaxPost("../scm/payment/add?action=add", {
					postData: JSON.stringify(d)
				}, function(b) {
					c.removeClass("ui-btn-dis"), 200 === b.status ? (a.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), originalData.id = b.data.id, a.$_toolBottom.html(billRequiredCheck ? '<span id="groupBtn">' + a.btn_edit + a.btn_audit + "</span>" : '<span id="groupBtn">' + a.btn_edit + "</span>"), parent.Public.tips({
						content: "保存成功！"
					})) : parent.Public.tips({
						type: 1,
						content: b.msg
					})
				}))
			}
		}), $(".wrapper").on("click", "#edit", function(b) {
			if (b.preventDefault(), Business.verifyRight("PAYMENT_UPDATE")) {
				var c = THISPAGE.getPostData();
				c && Public.ajaxPost("../scm/payment/updatePayment?action=updatePayment", {
					postData: JSON.stringify(c)
				}, function(b) {
					200 === b.status ? (a.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), originalData.id = b.data.id, parent.Public.tips({
						content: "修改成功！"
					})) : parent.Public.tips({
						type: 1,
						content: b.msg
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
			if (Business.verifyRight("PAYMENT_ADD")) {
				var d = THISPAGE.getPostData();
				d && (c.addClass("ui-btn-dis"), Public.ajaxPost("../scm/payment/addNew?action=addNew", {
					postData: JSON.stringify(d)
				}, function(b) {
					if (c.removeClass("ui-btn-dis"), 200 === b.status) {
						a.$_number.text(b.data.billNo), $("#accountGrid").clearGridData(!0);
						for (var d = 1; 5 >= d; d++) $("#accountGrid").jqGrid("addRowData", d, {});
						if (accountId = 6, 2 === VERSION) {
							$("#grid").clearGridData(!0);
							for (var d = 1; 3 >= d; d++) $("#grid").jqGrid("addRowData", d, {})
						}
						a.$_note.val(""), a.$_discount.val(originalData.discount), a.$_payment.val(originalData.payment), parent.Public.tips({
							content: "保存成功！"
						})
					} else parent.Public.tips({
						type: 1,
						content: b.msg
					})
				}))
			}
		}), $(".wrapper").on("click", "#add", function(a) {
			a.preventDefault(), Business.verifyRight("PAYMENT_ADD") && parent.tab.overrideSelectedTabItem({
				tabid: "money-payment",
				text: "付款单",
				url: "../scm/payment?action=initPay"
			})
		}), $("#bottomField").on("click", "#prev", function(b) {
			return b.preventDefault(), $(this).hasClass("ui-btn-prev-dis") ? (parent.Public.tips({
				type: 2,
				content: "已经没有上一张了！"
			}), !1) : (a.idPostion = a.idPostion - 1, 0 === a.idPostion && $(this).addClass("ui-btn-prev-dis"), a.idPostion && (loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("/scm/payment.do?action=update", {
				id: a.paymentListIds[a.idPostion]
			}, function(a) {
				THISPAGE.reloadData(a.data), $("#next").removeClass("ui-btn-next-dis"), loading && loading.close()
			})), void 0)
		}), $("#bottomField").on("click", "#next", function(b) {
			return b.preventDefault(), $(this).hasClass("ui-btn-next-dis") ? (parent.Public.tips({
				type: 2,
				content: "已经没有下一张了！"
			}), !1) : (a.idPostion = a.idPostion + 1, a.idLength === a.idPostion + 1 && $(this).addClass("ui-btn-next-dis"), a.idPostion && (loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("/scm/payment.do?action=update", {
				id: a.paymentListIds[a.idPostion]
			}, function(a) {
				THISPAGE.reloadData(a.data), $("#prev").removeClass("ui-btn-prev-dis"), loading && loading.close()
			})), void 0)
		}), $("#selectSource").on("click", function() {
			var b = a.$_customer.data("contactInfo");
			if (!b) return parent.Public.tips({
				type: 1,
				content: "请先选择购货单位！"
			}), !1;
			originalData.buId = b.id;
			var c = $("#grid");
			$.dialog({
				width: 765,
				height: 510,
				title: "选择源单",
				content: "url:../scm/payment?action=initUnhxList",
				data: {
					url: "../scm/invPu?action=findUnhxList&buId=" + originalData.buId + "&id=" + originalData.id
				},
				lock: !0,
				ok: function() {
					setFilter(this.content, c)
				},
				cancel: !0
			})
		}), $(".wrapper").on("click", "#audit", function(b) {
			if (b.preventDefault(), Business.verifyRight("PAYMENT_CHECK")) {
				var c = $(this),
					d = THISPAGE.getPostData({
						checkSerNum: !0
					});
				d && c.ajaxPost("../scm/payment/checkPayment?action=checkPayment", {
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
			if (b.preventDefault(), Business.verifyRight("PAYMENT_UNCHECK")) {
				var c = $(this),
					d = THISPAGE.getPostData();
				d && c.ajaxPost("../scm/payment/rsCheckPayment?action=rsCheckPayment", {
					postData: JSON.stringify(d)
				}, function(b) {
					200 === b.status ? ($("#mark").removeClass(), a.$_checkName.html(""), $("#edit").show(), a.enableEdit(), $("#groupBtn").html(a.btn_edit + a.btn_audit), parent.Public.tips({
						content: "反审核成功！"
					})) : parent.Public.tips({
						type: 1,
						content: b.msg
					})
				})
			}
		}), $(window).resize(function() {
			Public.autoGrid($("#grid")), Public.autoGrid($("#accountGrid"))
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
	paymentTotal: function() {
		for (var a = $("#accountGrid"), b = a.jqGrid("getDataIDs"), c = 0, d = 0, e = b.length; e > d; d++) {
			var f = b[d],
				g = a.jqGrid("getRowData", f);
			g.payment && (c += parseFloat(g.payment))
		}
		a.jqGrid("footerData", "set", {
			payment: c
		})
	},
	disableEdit: function() {
		this.customerCombo.disable(), this.$_date.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_note.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_discount.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_payment.attr("disabled", "disabled").addClass("ui-input-dis"), $("#grid").jqGrid("setGridParam", {
			cellEdit: !1
		}), $("#accountGrid").jqGrid("setGridParam", {
			cellEdit: !1
		}), this.editable = !1
	},
	enableEdit: function() {
		disEditable || (this.customerCombo.enable(), this.$_date.removeAttr("disabled").removeClass("ui-input-dis"), this.$_note.removeAttr("disabled").removeClass("ui-input-dis"), this.$_discount.removeAttr("disabled").removeClass("ui-input-dis"), this.$_payment.removeAttr("disabled").removeClass("ui-input-dis"), $("#grid").jqGrid("setGridParam", {
			cellEdit: !0
		}), $("#accountGrid").jqGrid("setGridParam", {
			cellEdit: !0
		}), this.editable = !0)
	},
	calTotal: function(a) {
		for (var b = this, c = $("#grid").jqGrid("getDataIDs"), d = 0, e = 0, f = 0, g = 0, h = 0, i = c.length; i > h; h++) {
			var j = c[h],
				k = $("#grid").jqGrid("getRowData", j);
			a !== !1 && (k.billPrice && (d += parseFloat(k.billPrice)), k.hasCheck && (e += parseFloat(k.hasCheck)), k.notCheck && (f += parseFloat(k.notCheck)), $("#grid").jqGrid("footerData", "set", {
				billPrice: d,
				hasCheck: e,
				notCheck: f
			})), k.nowCheck && (g += parseFloat(k.nowCheck))
		}
		if ($("#grid").jqGrid("footerData", "set", {
			nowCheck: g
		}), a !== !1) {
			var l = Number($("#accountGrid").jqGrid("footerData", "get").payment.replace(/,/g, "")),
				m = Number(b.$_discount.val());
			l > g ? b.$_payment.val((l - g + m).toFixed(2)) : (b.$_discount.val((g - l).toFixed(2)), b.$_payment.val(0))
		}
	},
	resetGridData: function() {
		$("#grid").clearGridData(!0);
		for (var a = 1; a < initBillId; a++) $("#grid").jqGrid("addRowData", a, {});
		$("#grid").jqGrid("footerData", "set", {
			billNo: "合计：",
			billPrice: 0,
			hasCheck: 0,
			notCheck: 0,
			nowCheck: 0
		}), billId = initBillId
	},
	_getAccountsData: function() {
		for (var a = [], b = $("#accountGrid").jqGrid("getDataIDs"), c = 0, d = b.length; d > c; c++) {
			var e, f = b[c],
				g = $("#accountGrid").jqGrid("getRowData", f);
			if ("" !== g.accName) {
				var h = $("#" + f).data("accountInfo"),
					i = $("#" + f).data("paymentInfo") || {};
				e = {
					accId: h.id,
					payment: g.payment,
					wayId: i.id || 0,
					settlement: g.settlement,
					remark: g.remark
				}, a.push(e)
			}
		}
		return a
	},
	_getEntriesData: function() {
		for (var a = [], b = $("#grid").jqGrid("getDataIDs"), c = 0, d = b.length; d > c; c++) {
			var e, f = b[c],
				g = $("#grid").jqGrid("getRowData", f);
			if ("" !== g.billNo) {
				var h = $("#" + f).data("billInfo");
				e = {
					billId: h.billId,
					billNo: h.billNo,
					billType: h.billType,
					transType: h.transType,
					billDate: h.billDate,
					billPrice: h.billPrice,
					hasCheck: h.hasCheck,
					notCheck: h.notCheck,
					nowCheck: g.nowCheck
				}, a.push(e)
			}
		}
		return a
	},
	getPostData: function() {
		var a = this,
			b = this;
		null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), $("#accountGrid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null);
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
		var e = this._getAccountsData();
		if (0 === e.length) return parent.Public.tips({
			type: 2,
			content: "结算账户信息不能为空！"
		}), $("#accountGrid").jqGrid("editCell", 1, 2, !0), !1;
		if (2 === VERSION) var f = this._getEntriesData();
		else var f = [];
		var g = $.trim(a.$_note.val()),
			h = {
				id: originalData.id,
				buId: d.id,
				contactName: d.name,
				date: $.trim(a.$_date.val()),
				billNo: $.trim(a.$_number.text()),
				accounts: e,
				entries: f,
				discount: $.trim(a.$_discount.val()),
				payment: $.trim(a.$_payment.val()),
				description: g === a.$_note[0].defaultValue ? "" : g
			};
		return h
	}
},
	hasLoaded = !1,
	originalData;
urlParam.id ? hasLoaded || Public.ajaxGet("../scm/payment/update?action=update", {
	id: urlParam.id
}, function(a) {
	200 === a.status ? (originalData = a.data, THISPAGE.init(a.data), hasLoaded = !0) : parent.Public.tips({
		type: 1,
		content: a.msg
	})
}) : (originalData = {
	id: -1,
	status: "add",
	buId: -1,
	accounts: [{
		id: "1"
	}, {
		id: "2"
	}],
	acPayment: 0,
	entries: [{
		id: "1"
	}, {
		id: "2"
	}, {
		id: "3"
	}],
	billPrice: 0,
	billHasCheck: 0,
	billNotCheck: 0,
	billNowCheck: 0,
	discount: "0.00",
	payment: "0.00"
}, THISPAGE.init(originalData));

