define(["jquery", "print"], function(a) {
	function b() {
		o.cssCheckbox(), "true" == k.showDetail && (o.find("label").addClass("checked"), p[0].checked = !0), k.beginDate && k.endDate && i("div.grid-subtitle").text("日期: " + k.beginDate + "至" + k.endDate), i("#filter-fromDate").val(k.beginDate), i("#filter-toDate").val(k.endDate), i("#customer input").val(k.customerName), Business.customerCombo(i("#customer"), {
			defaultSelected: 0,
			addOptions: {
				text: r,
				value: 0
			}
		}), Public.dateCheck();
		var a = new Pikaday({
			field: i("#filter-fromDate")[0]
		}),
			b = new Pikaday({
				field: i("#filter-toDate")[0]
			});
		i("#filter-submit").on("click", function(c) {
			c.preventDefault();
			var d = i("#customer input").val();
			if (d === r || "" === d) return void parent.Public.tips({
				type: 1,
				content: r
			});
			var e = i("#filter-fromDate").val(),
				f = i("#filter-toDate").val(),
				g = a.getDate(),
				j = b.getDate(),
				l = window.THISPAGE.$_customer.data("contactInfo").id || "",
				m = window.THISPAGE.$_customer.data("contactInfo").name || "",
				n = p[0].checked ? "true" : "false",
				o = p[0].checked ? !0 : !1;
			return g.getTime() > j.getTime() ? void parent.Public.tips({
				type: 1,
				content: "开始日期不能大于结束日期"
			}) : (k = {
				beginDate: e,
				endDate: f,
				customerId: l,
				customerName: m,
				showDetail: n
			}, i("div.grid-subtitle").html("<p>客户：" + m + "</p><p>日期: " + e + " 至 " + f + "</p>"), void h(o))
		})
	}
	function c() {
		i("#btn-print").click(function(a) {
			a.preventDefault(), Business.verifyRight("CUSTOMERBALANCE_PRINT") && i("div.ui-print").printTable()
		}), i("#btn-export").click(function(a) {
			if (a.preventDefault(), Business.verifyRight("CUSTOMERBALANCE_EXPORT")) {
				var b = {};
				for (var c in k) k[c] && (b[c] = k[c]);
				Business.getFile(l, b)
			}
		}), i("#customer").on("click", ".ui-icon-ellipsis", function() {
			if (i(this).data("hasInstance")) this.customerDialog.show().zindex();
			else {
				var a = i("#customer").prev().text().slice(0, -1),
					b = "选择" + a;
				if ("供应商" === a || "购货单位" === a) var c = "url:../settings/select_customer?type=10&multiselect=false";
				else var c = "url:../settings/select_customer?multiselect=false";
				this.customerDialog = i.dialog({
					width: 775,
					height: 510,
					title: b,
					content: c,
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
				}), i(this).data("hasInstance", !0)
			}
		})
	}
	function d() {
		var a = !1,
			b = !1,
			c = !1;
		j.isAdmin !== !1 || j.rights.AMOUNT_COSTAMOUNT || (a = !0), j.isAdmin !== !1 || j.rights.AMOUNT_OUTAMOUNT || (b = !0), j.isAdmin !== !1 || j.rights.AMOUNT_INAMOUNT || (c = !0);
		var d = [{
			name: "date",
			label: "单据日期",
			width: 80,
			align: "center"
		}, {
			name: "billNo",
			label: "单据编号",
			width: 200,
			align: "center"
		}, {
			name: "transType",
			label: "业务类别",
			width: 60,
			align: "center"
		}, {
			name: "invNo",
			label: "商品编号",
			width: 50,
			align: "center"
		}, {
			name: "invName",
			label: "商品名称",
			width: 100,
			align: "center"
		}, {
			name: "spec",
			label: "规格型号",
			width: 120,
			align: "center"
		}, {
			name: "unit",
			label: "单位",
			width: 60,
			align: "center"
		}, {
			name: "qty",
			label: "数量",
			width: 80,
			align: "right",
			formatter: "number",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.qtyPlaces)
			}
		}, {
			name: "price",
			label: "单价",
			width: 120,
			align: "right",
			hidden: a,
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.pricePlaces)
			}
		}, {
			name: "totalAmount",
			label: "销售金额",
			width: 120,
			align: "right",
			hidden: a,
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.amountPlaces)
			}
		}, {
			name: "disAmount",
			label: "整单折扣额",
			width: 80,
			align: "right",
			hidden: a,
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.amountPlaces)
			}
		}, {
			name: "amount",
			label: "应收金额",
			width: 120,
			align: "right",
			hidden: a,
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.amountPlaces)
			}
		}, {
			name: "rpAmount",
			label: "实际收款金额",
			width: 120,
			align: "right",
			hidden: a,
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.amountPlaces)
			}
		}, {
			name: "inAmount",
			label: "应收款余额",
			width: 120,
			align: "right",
			hidden: a,
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.amountPlaces)
			}
		}, {
			name: "billId",
			label: "",
			width: 0,
			hidden: !0
		}, {
			name: "billType",
			label: "",
			width: 0,
			hidden: !0
		}],
			f = "local",
			g = "#";
		k.autoSearch && (f = "json", g = m), i("#grid").jqGrid({
			url: g,
			postData: k,
			datatype: f,
			autowidth: !0,
			height: "auto",
			gridview: !0,
			colModel: d,
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
			jsonReader: {
				root: "data.list",
				userdata: "data.total",
				repeatitems: !1,
				id: "0"
			},
			onCellSelect: function(a) {
				var b = i("#grid").getRowData(a),
					c = b.billId,
					d = b.billType.toUpperCase();
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
					b = c ? 31 * c : "auto"
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
		c > d && (c = d), b < h.width() && (c += 17), h.jqGrid("setGridWidth", b, !1), h.jqGrid("setGridHeight", c), i("#grid-wrap").height(function() {
			return document.body.clientHeight - this.offsetTop - 36 - 5
		})
	}
	function f() {
		return i(window).width() - (f.offsetLeft || (f.offsetLeft = i("#grid-wrap").offset().left)) - 36 - 20
	}
	function g() {
		return i(window).height() - (g.offsetTop || (g.offsetTop = i("#grid").offset().top)) - 36 - 16 - 24
	}
	function h(a) {
		i(".no-query").remove(), i(".ui-print").show(), "undefined" != typeof a && (i("#grid").jqGrid(a ? "showCol" : "hideCol", ["invNo", "invName", "spec", "unit", "qty", "price"]), e()), i("#grid").clearGridData(!0), i("#grid").jqGrid("setGridParam", {
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
			customerId: "",
			customerName: "",
			showDetail: ""
		}, Public.urlParam()),
		l = "../report/customerBalance_exporter?action=exporter",
		m = "../report/customerBalance_detail?action=detail",
		n = i("#customer"),
		o = i("#match"),
		p = i("#match").find("input"),
		q = q || {};
	q.$_customer = n, this.THISPAGE = q;
	var r = "（请选择销货单位）";
	a("print"), b(), c(), d();
	var s;
	i(window).on("resize", function() {
		s || (s = setTimeout(function() {
			e(), s = null
		}, 50))
	})
});