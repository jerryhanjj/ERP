function callback() {
	{
		var a = frameElement.api;
		a.data.oper, a.data.callback
	}
	null !== curRow && null !== curCol && ($("#accountGrid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null);
	var b = {};
	return b.accounts = THISPAGE._getAccountsData(), b.accounts ? 0 === b.accounts.length ? (parent.parent.Public.tips({
		type: 1,
		content: "结算账户信息不能为空！"
	}), $("#accountGrid").jqGrid("editCell", 1, 2, !0), !1) : (b.payment = $("#accountGrid").jqGrid("footerData", "get").payment.replace(/,/g, ""), b) : !1
}
var SYSTEM = parent.parent.SYSTEM,
	curRow, curCol, qtyPlaces = Number(SYSTEM.qtyPlaces) || 4,
	pricePlaces = Number(SYSTEM.pricePlaces) || 4,
	amountPlaces = Number(SYSTEM.amountPlaces) || 2,
	api = frameElement.api,
	oper = api.data.oper,
	accountInfo = api.data.accountInfo ? [].concat(api.data.accountInfo) : api.data.accountInfo;
if (accountInfo) {
	var gap = 4 - accountInfo.length;
	if (gap > 0) for (var i = 0; gap > i; i++) accountInfo.push({});
	var originalData = {
		accounts: accountInfo
	}
} else var originalData = {
	accounts: [{
		id: "1"
	}, {
		id: "2"
	}, {
		id: "3"
	}, {
		id: "4"
	}]
};
var THISPAGE = {
	init: function(a) {
		this.loadGrid(a), this.initCombo(), this.addEvent()
	},
	initDom: function() {},
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
		$("#accountGrid").jqGrid({
			data: a.accounts,
			datatype: "clientSide",
			width: 628,
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
				name: "account",
				label: "结算账户",
				width: 200,
				classes: "ui-ellipsis",
				editable: !0,
				edittype: "custom",
				editoptions: {
					custom_element: b,
					custom_value: c,
					handle: d
				}
			}, {
				name: "payment",
				label: "金额",
				width: 100,
				align: "right",
				formatter: "currency",
				formatoptions: {
					showZero: !0,
					decimalPlaces: amountPlaces
				},
				editable: !0
			}, {
				name: "way",
				label: "结算方式",
				width: 200,
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
			}],
			cmTemplate: {
				sortable: !1,
				title: !1
			},
			idPrefix: "ac",
			shrinkToFit: !0,
			forceFit: !0,
			cellEdit: !0,
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
				if (accountInfo) for (var b = a.rows, c = 0, d = b.length; d > c; c++) {
					var e = c + 1,
						f = b[c];
					if ($.isEmptyObject(b[c])) break;
					$("#ac" + e).data("accountInfo", {
						id: f.accId
					}).data("paymentInfo", {
						id: f.wayId
					})
				}
			},
			gridComplete: function() {
				h.paymentTotal()
			},
			afterEditCell: function(a, b, c, d) {
				"account" === b && ($("#" + d + "_account", "#accountGrid").val(c), h.accountCombo.selectByText(c)), "way" === b && $("#" + d + "_way", "#accountGrid").val(c)
			},
			afterSaveCell: function(a, b) {
				"payment" == b && h.paymentTotal()
			},
			loadonce: !0,
			footerrow: !0,
			userData: {
				account: "合计："
			},
			userDataOnFooter: !0
		})
	},
	reloadData: function(a) {
		$("#grid").jqGrid("setGridParam", {
			url: "../../basedata/inventory?action=listForBill",
			datatype: "json",
			postData: a
		}).trigger("reloadGrid")
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
		a.newId = 5, $(".grid-wrap").on("click", ".account-trigger", function() {
			setTimeout(function() {
				a.accountCombo._onTriggerClick()
			}, 10)
		}), $(".grid-wrap").on("click", ".payment-trigger", function() {
			setTimeout(function() {
				$(".paymentAuto").trigger("click")
			}, 10)
		}), $(".grid-wrap").on("click", ".ui-icon-plus", function() {
			var b = "ac" + $(this).parent().data("id"),
				c = ($("#accountGrid tbody tr").length, {
					id: a.newId
				}),
				d = $("#accountGrid").jqGrid("addRowData", a.newId, c, "after", b);
			d && ($(this).parents("td").removeAttr("class"), $(this).parents("tr").removeClass("selected-row ui-state-hover"), $("#accountGrid").jqGrid("resetSelection"), a.newId++)
		}), $(".grid-wrap").on("click", ".ui-icon-trash", function() {
			if (2 === $("#accountGrid tbody tr").length) return parent.Public.tips({
				type: 2,
				content: "至少保留一条分录！"
			}), !1;
			var b = "ac" + $(this).parent().data("id"),
				c = $("#accountGrid").jqGrid("delRowData", b);
			c && a.calTotal()
		}), $(document).bind("click.cancel", function(a) {
			null !== curRow && null !== curCol && (!$(a.target).closest("#accountGrid").length > 0 && $("#accountGrid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null)
		})
	},
	_getAccountsData: function() {
		for (var a = [], b = $("#accountGrid").jqGrid("getDataIDs"), c = 0, d = b.length; d > c; c++) {
			var e, f = b[c],
				g = $("#accountGrid").jqGrid("getRowData", f);
			if ("" !== g.account) {
				var h = $("#" + f).data("accountInfo"),
					i = $("#" + f).data("paymentInfo") || {};
				e = {
					accId: h.id,
					account: g.account,
					payment: g.payment,
					wayId: i.id || 0,
					way: g.way,
					settlement: g.settlement
				}, a.push(e)
			}
		}
		return a
	}
};
THISPAGE.init(originalData);