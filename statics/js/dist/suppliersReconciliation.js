var $_curTr;
$(function() {
	var a = function(a) {
			var b = this,
				c = Public.urlParam(),
				d = "../report/supplierBalance_detail?action=detail",
				e = "../report/supplierBalance_exporter?action=exporter",
				f = $("#filter-fromDate"),
				g = $("#filter-toDate"),
				h = $("#customer"),
				i = $("#customerText"),
				j = $("#match"),
				k = $("#match").find("input");
			b.$_customer = h, b.$_customerText = i;
			var l = {
				SALE: {
					tabid: "sales-sales",
					text: "销货单",
					right: "SA_QUERY",
					url: "/sales/sales.jsp?id="
				},
				PUR: {
					tabid: "purchase-purchase",
					text: "购货单",
					right: "PU_QUERY",
					url: "/purchase/purchase.jsp?id="
				},
				TRANSFER: {
					tabid: "storage-transfers",
					text: "调拨单",
					right: "TF_QUERY",
					url: "/storage/transfers.jsp?id="
				},
				OO: {
					tabid: "storage-otherOutbound",
					text: "其它出库 ",
					right: "OO_QUERY",
					url: "/storage/other-outbound.jsp?id="
				},
				OI: {
					tabid: "storage-otherWarehouse",
					text: "其它入库 ",
					right: "IO_QUERY",
					url: "/storage/other-warehouse.jsp?id="
				},
				CADJ: {
					tabid: "storage-adjustment",
					text: "成本调整",
					right: "CADJ_QUERY",
					url: "/storage/adjustment.jsp?id="
				},
				PAYMENT: {
					tabid: "money-payment",
					text: "付款单",
					right: "PAYMENT_QUERY",
					url: "/money/payment.jsp?id="
				},
				RECEIPT: {
					tabid: "money-receipt",
					text: "收款单",
					right: "RECEIPT_QUERY",
					url: "/money/receipt.jsp?id="
				},
				VERIFICA: {
					tabid: "money-verifica",
					text: "核销单 ",
					right: "VERIFICA_QUERY",
					url: "/money/verification.jsp?id="
				}
			},
				m = {
					beginDate: c.beginDate || defParams.beginDate,
					endDate: c.endDate || defParams.endDate,
					supplierId: c.supplierId || -1,
					supplierName: c.supplierName || "",
					showDetail: "true" === c.showDetail ? "true" : "false"
				},
				n = function() {
					f.datepicker(), g.datepicker()
				},
				o = function() {
					Business.moreFilterEvent(), $("#conditions-trigger").trigger("click")
				},
				p = function() {
					var a = "";
					for (key in m) m[key] && (a += "&" + key + "=" + encodeURIComponent(m[key]));
					window.location = d + a
				},
				q = function() {
					$("#refresh").on("click", function(a) {
						a.preventDefault();
						var c = f.val(),
							d = g.val();
						if (c && d && new Date(c).getTime() > new Date(d).getTime()) return void parent.Public.tips({
							type: 1,
							content: "开始日期不能大于结束日期"
						});
						m = {
							beginDate: c,
							endDate: d,
							showDetail: k[0].checked ? "true" : "false"
						};
						var e = b.$_customer.find("input");
						if ("" === e.val() || "（请选择购货单位）" === e.val()) {
							var h = {};
							h.id = 0, h.name = "（请选择购货单位）", b.$_customer.removeData("contactInfo")
						} else {
							var h = b.$_customer.data("contactInfo");
							if (null === h) return setTimeout(function() {
								e.focus().select()
							}, 15), parent.Public.tips({
								type: 2,
								content: "当前供应商不存在！"
							}), !1
						}
						m.supplierId = h.id, m.supplierName = h.name, p()
					}), $(document).on("click", "#ui-datepicker-div,.ui-datepicker-header", function(a) {
						a.stopPropagation()
					}), $("#filter-reset").on("click", function(a) {
						a.preventDefault(), f.val(""), g.val(""), $_accountNoInput.val("")
					}), $("#btn-print").click(function(a) {
						a.preventDefault(), Business.verifyRight("SUPPLIERBALANCE_PRINT") && window.print()
					}), $("#btn-export").click(function(a) {
						if (a.preventDefault(), Business.verifyRight("SUPPLIERBALANCE_EXPORT")) {
							var b = {};
							for (var c in m) m[c] && (b[c] = m[c]);
							b.supplierName = $.trim(i.html()), Business.getFile(e, b)
						}
					}), $(".grid-wrap").on("click", ".link", function() {
						var a = $(this).data("id"),
							b = $(this).data("type").toLocaleUpperCase(),
							c = l[b];
						c && Business.verifyRight(c.right) && (parent.tab.addTabItem({
							tabid: c.tabid,
							text: c.text,
							url: c.url + a
						}), $(this).addClass("tr-hover"), $_curTr = $(this))
					}), $("#customer").on("click", ".ui-icon-ellipsis", function() {
						if ($(this).data("hasInstance")) b.customerDialog.show().zindex();
						else {
							var a = $("#customer").prev().text().slice(0, -1),
								c = "选择" + a;
							if ("供应商" === a || "购货单位" === a) var d = "url:../settings/select_customer?type=10";
							else var d = "url:../settings/select_customer";
							b.customerDialog = $.dialog({
								width: 775,
								height: 510,
								title: c,
								content: d,
								data: {
									isDelete: 2
								},
								lock: !0,
								ok: function() {
									return this.content.callback(), this.hide(), !1
								},
								cancel: function() {
									return this.hide(), !1
								}
							}), $(this).data("hasInstance", !0)
						}
					}), Business.gridEvent()
				};
			return a.init = function() {
				f.val(m.beginDate || ""), g.val(m.endDate || ""), j.cssCheckbox(), "true" == c.showDetail && (j.find("label").addClass("checked"), k[0].checked = !0), m.beginDate && m.endDate && $("#selected-period").text(m.beginDate + "至" + m.endDate), b.customerCombo = Business.supplierCombo(h, {
					defaultSelected: 0,
					addOptions: {
						text: "（请选择购货单位）",
						value: 0
					}
				}), c.supplierId || ($(".grid-wrap").addClass("no-query"), $(".grid").remove()), b.$_customer.data("contactInfo", {
					id: Number(c.supplierId) || 0,
					name: c.supplierName || ""
				}), b.customerCombo.input.val(c.supplierName || "（请选择购货单位）"), i.html("供应商：" + h.find("input").val()), n(), o(), q(), window.THISPAGE = b
			}, a
		}(a || {});
	a.init(), Public.initCustomGrid($("table.list"))
});