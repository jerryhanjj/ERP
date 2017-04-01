var $_curTr;
$(function() {
	var a = function(a) {
			var b = Public.urlParam(),
				c = "../report/bankBalance_detail?action=detail",
				d = "../report/bankBalance_exporter?action=exporter",
				e = $("#filter-fromDate"),
				f = $("#filter-toDate"),
				g = $("#filter-settlementAccount input"),
				h = {
					SALE: {
						tabid: "sales-sales",
						text: "销货单",
						right: "SA_QUERY",
						url: "../scm/invsa?action=editSale&id="
					},
					PUR: {
						tabid: "purchase-purchase",
						text: "购货单",
						right: "PU_QUERY",
						url: "../scm/invpu?action=editPur&id="
					},
					TRANSFER: {
						tabid: "storage-transfers",
						text: "调拨单",
						right: "TF_QUERY",
						url: "../scm/invtf?action=editTf&id="
					},
					OO: {
						tabid: "storage-otherOutbound",
						text: "其它出库 ",
						right: "OO_QUERY",
						url: "../scm/invOi?action=editOi&type=in&id="
					},
					OI: {
						tabid: "storage-otherWarehouse",
						text: "其它入库 ",
						right: "IO_QUERY",
						url: "../scm/invOi?action=editOi&type=out&id="
					},
					CADJ: {
						tabid: "storage-adjustment",
						text: "成本调整",
						right: "CADJ_QUERY",
						url: "../storage/adjustment.jsp?id="
					},
					PAYMENT: {
						tabid: "money-payment",
						text: "付款单",
						right: "PAYMENT_QUERY",
						url: "../scm/payment?action=editPay&id="
					},
					RECEIPT: {
						tabid: "money-receipt",
						text: "收款单",
						right: "RECEIPT_QUERY",
						url: "../scm/receipt?action=editReceipt&id="
					},
					VERIFICA: {
						tabid: "money-verifica",
						text: "核销单 ",
						right: "VERIFICA_QUERY",
						url: "../money/verification.jsp?id="
					},
					QTSR: {
						tabid: "money-otherIncome",
						text: "其它收入单",
						right: "QTSR_QUERY",
						url: "scm/ori?action=editInc&id="
					},
					QTZC: {
						tabid: "money-otherExpense",
						text: "其它支出单",
						right: "QTZC_QUERY",
						url: "../scm/ori?action=editExp&id="
					}
				},
				i = {
					beginDate: b.beginDate || defParams.beginDate,
					endDate: b.endDate || defParams.endDate,
					accountNo: b.accountNo || ""
				},
				j = function() {
					e.datepicker(), f.datepicker()
				},
				k = function() {
					Business.moreFilterEvent(), $("#conditions-trigger").trigger("click")
				},
				l = function() {
					var a = "";
					for (key in i) i[key] && (a += "&" + key + "=" + encodeURIComponent(i[key]));
					window.location = c + a
				},
				m = function() {
					$("#filter-submit").on("click", function(a) {
						a.preventDefault();
						var b = e.val(),
							c = f.val();
						return b && c && new Date(b).getTime() > new Date(c).getTime() ? void parent.Public.tips({
							type: 1,
							content: "开始日期不能大于结束日期"
						}) : (i = {
							beginDate: b,
							endDate: c,
							accountNo: g.val() || ""
						}, void l())
					}), $(document).on("click", "#ui-datepicker-div,.ui-datepicker-header", function(a) {
						a.stopPropagation()
					}), $("#filter-reset").on("click", function(a) {
						a.preventDefault(), e.val(""), f.val(""), g.val("")
					}), $("#refresh").on("click", function(a) {
						a.preventDefault(), l()
					}), $("#btn-print").click(function(a) {
						a.preventDefault(), Business.verifyRight("SettAcctReport_PRINT") && window.print()
					}), $("#btn-export").click(function(a) {
						if (a.preventDefault(), Business.verifyRight("SettAcctReport_EXPORT")) {
							var b = {};
							for (var c in i) i[c] && (b[c] = i[c]);
							Business.getFile(d, b)
						}
					}), $(".grid-wrap").on("click", ".link", function() {
						var a = $(this).data("id"),
							b = $(this).data("type").toLocaleUpperCase(),
							c = h[b];
						c && Business.verifyRight(c.right) && (parent.tab.addTabItem({
							tabid: c.tabid,
							text: c.text,
							url: c.url + a
						}), $(this).addClass("tr-hover"), $_curTr = $(this))
					}), Business.gridEvent()
				};
			return a.init = function() {
				e.val(i.beginDate || ""), f.val(i.endDate || ""), g.val(i.accountNo || ""), i.beginDate && i.endDate && $("#selected-period").text(i.beginDate + "至" + i.endDate), Business.filterSettlementAccount(), j(), k(), m()
			}, a
		}(a || {});
	a.init(), Public.initCustomGrid($("table.list"))
});