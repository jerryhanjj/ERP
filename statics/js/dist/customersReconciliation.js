var $_curTr;
$(function() {
	var a = function(a) {
			var b = this,
				c = Public.urlParam(),
				d = "../report/customerBalance_detail?action=detail",
				e = "../report/customerBalance_exporter?action=exporter";
			$_fromDate = $("#filter-fromDate"), $_toDate = $("#filter-toDate"), $_customer = $("#customer"), $_customerText = $("#customerText"), $_match = $("#match"), $_matchChk = $("#match").find("input"), b.$_customer = $_customer, b.$_customerText = $_customerText;
			var f = {
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
				}
			},
				g = {
					beginDate: c.beginDate || defParams.beginDate,
					endDate: c.endDate || defParams.endDate,
					customerId: c.customerId || -1,
					customerName: c.customerName || "",
					showDetail: "true" === c.showDetail ? "true" : "false"
				},
				h = function() {
					$_fromDate.datepicker(), $_toDate.datepicker()
				},
				i = function() {
					Business.moreFilterEvent(), $("#conditions-trigger").trigger("click")
				},
				j = function() {
					var a = "";
					for (key in g) g[key] && (a += "&" + key + "=" + encodeURIComponent(g[key]));
					window.location = d + a
				},
				k = function() {
					$("#refresh").on("click", function(a) {
						a.preventDefault();
						var c = $_fromDate.val(),
							d = $_toDate.val();
						if (c && d && new Date(c).getTime() > new Date(d).getTime()) return void parent.Public.tips({
							type: 1,
							content: "开始日期不能大于结束日期"
						});
						g = {
							beginDate: c,
							endDate: d,
							showDetail: $_matchChk[0].checked ? "true" : "false"
						};
						var e = b.$_customer.find("input");
						if ("" === e.val() || "（请选择销货单位）" === e.val()) {
							var f = {};
							f.id = 0, f.name = "（请选择销货单位）", b.$_customer.removeData("contactInfo")
						} else {
							var f = b.$_customer.data("contactInfo");
							if (null === f) return setTimeout(function() {
								e.focus().select()
							}, 15), parent.Public.tips({
								type: 2,
								content: "当前客户不存在！"
							}), !1
						}
						g.customerId = f.id, g.customerName = f.name, j()
					}), $(document).on("click", "#ui-datepicker-div,.ui-datepicker-header", function(a) {
						a.stopPropagation()
					}), $("#filter-reset").on("click", function(a) {
						a.preventDefault(), $_fromDate.val(""), $_toDate.val(""), $_accountNoInput.val("")
					}), $("#btn-print").click(function(a) {
						a.preventDefault(), Business.verifyRight("CUSTOMERBALANCE_PRINT") && window.print()
					}), $("#btn-export").click(function(a) {
						if (a.preventDefault(), Business.verifyRight("CUSTOMERBALANCE_EXPORT")) {
							var c = {};
							for (var d in g) g[d] && (c[d] = g[d]);
							c.customerName = $.trim(b.$_customerText.html()), Business.getFile(e, c)
						}
					}), $(".grid-wrap").on("click", ".link", function() {
						var a = $(this).data("id"),
							b = $(this).data("type").toLocaleUpperCase(),
							c = f[b];
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
				$_fromDate.val(g.beginDate || ""), $_toDate.val(g.endDate || ""), $_match.cssCheckbox(), "true" == c.showDetail && ($_match.find("label").addClass("checked"), $_matchChk[0].checked = !0), g.beginDate && g.endDate && $("#selected-period").text(g.beginDate + "至" + g.endDate), b.customerCombo = Business.customerCombo($("#customer"), {
					defaultSelected: 0,
					addOptions: {
						text: "（请选择销货单位）",
						value: 0
					}
				}), c.customerId || ($(".grid-wrap").addClass("no-query"), $(".grid").remove()), b.$_customer.data("contactInfo", {
					id: Number(c.customerId) || 0,
					name: c.customerName || ""
				}), b.customerCombo.input.val(c.customerName || "（请选择销货单位）"), b.$_customerText.html("客户：" + b.$_customer.find("input").val()), h(), i(), k(), window.THISPAGE = b
			}, a
		}(a || {});
	a.init(), Public.initCustomGrid($("table.list"))
});