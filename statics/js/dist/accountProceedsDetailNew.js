define(["jquery", "print"], function(a) {
	function b() {
		Business.filterCustomer(), i("#filter-fromDate").val(k.beginDate || ""), i("#filter-toDate").val(k.endDate || ""), k.beginDate && k.endDate && i("div.grid-subtitle").text("日期: " + k.beginDate + " 至 " + k.endDate), i("#filter-fromDate, #filter-toDate").datepicker(), Public.dateCheck(), i("#filter-submit").on("click", function(a) {
			a.preventDefault();
			var b = i("#filter-fromDate").val(),
				c = i("#filter-toDate").val();
			return b && c && new Date(b).getTime() > new Date(c).getTime() ? void parent.Public.tips({
				type: 1,
				content: "开始日期不能大于结束日期"
			}) : (k = {
				beginDate: b,
				endDate: c,
				accountNo: i("#customerAuto").val() || ""
			}, i("div.grid-subtitle").text("日期: " + b + " 至 " + c), void h())
		})
	}
	function c() {
		i("#btn-print").click(function(a) {
			a.preventDefault(), Business.verifyRight("RECEIPTDETAIL_PRINT") && i("div.ui-print").printTable()
		}), i("#btn-export").click(function(a) {
			if (a.preventDefault(), Business.verifyRight("RECEIPTDETAIL_EXPORT")) {
				var b = {};
				for (var c in k) k[c] && (b[c] = k[c]);
				Business.getFile(l, b)
			}
		})
	}
	function d() {
		var a = !1,
			b = !1,
			c = !1;
		j.isAdmin !== !1 || j.rights.AMOUNT_COSTAMOUNT || (a = !0), j.isAdmin !== !1 || j.rights.AMOUNT_OUTAMOUNT || (b = !0), j.isAdmin !== !1 || j.rights.AMOUNT_INAMOUNT || (c = !0);
		var d = j.serviceType,
			f = "";
		(12 == d || 13 == d) && (f = "支付应收款"), 12 != d && 13 != d && (f = "增加预收款");
		var g = [{
			name: "buName",
			label: "客户",
			width: 150,
			align: "center"
		}, {
			name: "date",
			label: "单据日期",
			width: 100,
			align: "center"
		}, {
			name: "billNo",
			label: "单据编号",
			width: 110,
			align: "center"
		}, {
			name: "transType",
			label: "业务类型",
			width: 110,
			align: "center"
		}, {
			name: "income",
			label: "增加应收款",
			width: 120,
			hidden: a,
			align: "right",
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.amountPlaces)
			}
		}, {
			name: "expenditure",
			label: f,
			width: 120,
			hidden: a,
			align: "right",
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.amountPlaces)
			}
		}, {
			name: "balance",
			label: "应收款余额",
			width: 120,
			hidden: a,
			align: "right",
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.amountPlaces)
			}
		}, {
			name: "billId",
			label: "",
			width: 0,
			align: "center",
			hidden: !0
		}, {
			name: "billTypeNo",
			label: "",
			width: 0,
			align: "center",
			hidden: !0
		}],
			h = "local",
			l = "#";
		k.autoSearch && (h = "json", l = m), i("#grid").jqGrid({
			url: l,
			postData: k,
			datatype: h,
			autowidth: !0,
			gridview: !0,
			colModel: g,
			cmTemplate: {
				sortable: !1,
				title: !1
			},
			page: 1,
			sortname: "date",
			sortorder: "desc",
			rowNum: 3e3,
			loadonce: !0,
			viewrecords: !0,
			shrinkToFit: !1,
			footerrow: !0,
			userDataOnFooter: !0,
			cellLayout: 0,
			jsonReader: {
				root: "data.list",
				userdata: "data.total",
				repeatitems: !1,
				id: "0"
			},
			onCellSelect: function(a) {
				var b = i("#grid").getRowData(a),
					c = b.billId,
					d = b.billTypeNo.toUpperCase();
				switch (d) {
				case "PUR":
					if (!Business.verifyRight("PU_QUERY")) return;
					parent.tab.addTabItem({
						tabid: "purchase-purchase",
						text: "购货单",
						url: "../scm/invPu?action=editPur&id="+ c
					});
					break;
				case "SALE":
					if (!Business.verifyRight("SA_QUERY")) return;
					parent.tab.addTabItem({
						tabid: "sales-sales",
						text: "销售单",
						url: "../scm/invSa?action=editSale&id="+ c

					});
					break;
				case "TRANSFER":
					if (!Business.verifyRight("TF_QUERY")) return;
					parent.tab.addTabItem({
						tabid: "storage-transfers",
						text: "调拨单",
						url: "../scm/invTf?action=editTf&id=" + c
					});
					break;
				case "OI":
					if (!Business.verifyRight("IO_QUERY")) return;
					parent.tab.addTabItem({
						tabid: "storage-otherWarehouse",
						text: "其他入库",
						url: "../scm/invOi?action=editOi&type=in&id=" + c
					});
					break;
				case "OO":
					if (!Business.verifyRight("OO_QUERY")) return;
					parent.tab.addTabItem({
						tabid: "storage-otherOutbound",
						text: "其他出库",
						url: "../scm/invOi?action=editOi&type=out&id=" + c
					});
					break;
				case "CADJ":
					if (!Business.verifyRight("CADJ_QUERY")) return;
					parent.tab.addTabItem({
						tabid: "storage-adjustment",
						text: "成本调整单",
						url: "../scm/invOi?action=editOi&type=cbtz&id=" + c
					});
					break;
				case "PAYMENT":
					if (!Business.verifyRight("PAYMENT_QUERY")) return;
					parent.tab.addTabItem({
						tabid: "money-payment",
						text: "付款单",
						url: "../scm/payment?action=editPay&id=" + c
					});
					break;
				case "VERIFICA":
					if (!Business.verifyRight("VERIFICA_QUERY")) return;
					parent.tab.addTabItem({
						tabid: "money-verifica",
						text: "核销单",
						url: "/money/verification.jsp?id=" + c
					});
					break;
				case "RECEIPT":
					if (!Business.verifyRight("RECEIPT_QUERY")) return;
					parent.tab.addTabItem({
						tabid: "money-receipt",
						text: "收款单",
						url: "../scm/receipt?action=editReceipt&id=" + c
					});
					break;
				case "QTSR":
					if (!Business.verifyRight("QTSR_QUERY")) return;
					parent.tab.addTabItem({
						tabid: "money-otherIncome",
						text: "其它收入单",
						url: "../scm/ori?action=editInc&id=" + c
					});
					break;
				case "QTZC":
					if (!Business.verifyRight("QTZC_QUERY")) return;
					parent.tab.addTabItem({
						tabid: "money-otherExpense",
						text: "其它支出单",
						url: "../scm/ori?action=editExp&id=" + c
					})
				}
			},
			loadComplete: function(a) {
				var b;
				if (a && a.data) {
					var c = a.data.list.length;
					b = c ? 31 * c : 1
				}
				e(b)
			},
			gridComplete: function() {
				i("#grid").footerData("set", {
					transType: "合计:"
				})
			}
		}), k.autoSearch ? (i(".no-query").remove(), i(".ui-print").show()) : i(".ui-print").hide()
	}
	function e(a) {
		a && (e.h = a);
		var b = f(),
			c = e.h,
			d = g(),
			h = i("#grid");
		c > d && (c = d), b < h.width() && (c += 17), i("#grid-wrap").height(function() {
			return document.body.clientHeight - this.offsetTop - 36 - 5
		}), h.jqGrid("setGridHeight", c), h.jqGrid("setGridWidth", b, !1)
	}
	function f() {
		return i(window).width() - i("#grid-wrap").offset().left - 36 - 20
	}
	function g() {
		return i(window).height() - i("#grid").offset().top - 36 - 16
	}
	function h() {
		i(".no-query").remove(), i(".ui-print").show(), i("#grid").clearGridData(!0), i("#grid").jqGrid("setGridParam", {
			datatype: "json",
			postData: k,
			url: m
		}).trigger("reloadGrid")
	}
	var i = a("jquery"),
		j = parent.SYSTEM,
		k = i.extend({
			beginDate: "",
			endDate: "",
			accountNo: ""
		}, Public.urlParam()),
		l = "../report/fundBalance_exporter?action=exporter",
		m = "../report/fundBalance_detail?action=detail";
	a("print"), b(), c(), d();
	var n;
	i(window).on("resize", function() {
		n || (n = setTimeout(function() {
			e(), n = null
		}, 50))
	})
});