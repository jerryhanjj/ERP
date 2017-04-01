define(["jquery", "print"], function(a) {
	function b() {
		Business.filterCustomer(), Business.filterGoods(), Business.filterStorage(), Business.moreFilterEvent(), i("#conditions-trigger").trigger("click"), i("#filter-fromDate").val(k.beginDate || ""), i("#filter-toDate").val(k.endDate || ""), i("#filter-customer input").val(k.customerNo || ""), i("#filter-goods input").val(k.goodsNo || ""), i("#filter-storage input").val(k.storageNo || ""), k.beginDate && k.endDate && (i("#selected-period").text(k.beginDate + "至" + k.endDate), i("div.grid-subtitle").text("日期: " + k.beginDate + " 至 " + k.endDate)), i("#filter-fromDate, #filter-toDate").datepicker(), Public.dateCheck(), "1" === k.profit && i('#profit-wrap input[name="profit"]').attr("checked", !0), "1" === k.showSku && i('#profit-wrap input[name="showSku"]').attr("checked", !0), parent.SYSTEM.enableAssistingProp || i('#profit-wrap input[name="showSku"]').parent().hide();
		var a = parent.SYSTEM;
		a.rights.SAREPORTINV_COST || a.isAdmin ? i('#profit-wrap input[name="profit"]').parent().show() : i('#profit-wrap input[name="profit"]').parent().hide();
		var b = i("#profit-wrap").show().cssCheckbox();
		i("#filter-submit").on("click", function(a) {
			a.preventDefault();
			var c = i("#filter-fromDate").val(),
				d = i("#filter-toDate").val();
			if (c && d && new Date(c).getTime() > new Date(d).getTime()) return void parent.Public.tips({
				type: 1,
				content: "开始日期不能大于结束日期"
			});
			k = {
				beginDate: c,
				endDate: d,
				customerNo: i("#filter-customer input").val() || "",
				goodsNo: i("#filter-goods input").val() || "",
				storageNo: i("#filter-storage input").val() || "",
				profit: 0,
				showSku: 0
			}, chkVals = b.chkVal();
			for (var e = 0, f = chkVals.length; f > e; e++) k[chkVals[e]] = 1;
			i("#selected-period").text(c + "至" + d), i("div.grid-subtitle").text("日期: " + c + " 至 " + d), h(+k.profit)
		}), i("#filter-reset").on("click", function(a) {
			a.preventDefault(), i("#filter-fromDate").val(k.beginDate), i("#filter-toDate").val(k.endDate), i("#filter-customer input").val(""), i("#filter-goods input").val(""), i("#filter-storage input").val(""), b.chkNot()
		})
	}
	function c() {
		i("#refresh").on("click", function(a) {
			a.preventDefault(), h()
		}), i("#btn-print").click(function(a) {
			a.preventDefault(), Business.verifyRight("SAREPORTINV_PRINT") && i("div.ui-print").printTable()
		}), i("#btn-export").click(function(a) {
			a.preventDefault(), Business.verifyRight("SAREPORTINV_EXPORT") && Business.getFile("../report/salesDetail_invExporter?action=invExporter", k)
		})
	}
	function d() {
		var a = !1;
		j.isAdmin !== !1 || j.rights.AMOUNT_OUTAMOUNT || (a = !0);
		var b = [{
			name: "buNo",
			label: "客户编码",
			width: 0,
			hidden: !0
		}, {
			name: "invNo",
			label: "商品编号",
			width: 100
		}, {
			name: "locationNo",
			label: "仓库编码",
			width: 0,
			hidden: !0
		}, {
			name: "invName",
			label: "商品名称",
			width: 200,
			classes: "ui-ellipsis",
			title: !0
		}, {
			name: "spec",
			label: "规格型号",
			width: 100
		}, {
			name: "unit",
			label: "单位",
			width: 80,
			fixed: !0,
			align: "center"
		}, {
			name: "location",
			label: "仓库",
			width: 100,
			classes: "ui-ellipsis",
			title: !0
		}, {
			name: "qty",
			label: "数量",
			width: 100,
			align: "right"
		}, {
			name: "unitPrice",
			label: "单价",
			width: 100,
			hidden: a,
			align: "right"
		}, {
			name: "amount",
			label: "销售收入",
			width: 100,
			hidden: a,
			align: "right"
		}, {
			name: "unitCost",
			label: "单位成本",
			width: 80,
			hidden: !0,
			align: "right"
		}, {
			name: "cost",
			label: "销售成本",
			width: 80,
			hidden: !0,
			align: "right"
		}, {
			name: "saleProfit",
			label: "销售毛利",
			width: 80,
			hidden: !0,
			align: "right"
		}, {
			name: "salepPofitRate",
			label: "毛利率",
			width: 80,
			hidden: !0,
			align: "right"
		}];
		i("#grid").jqGrid({
			url: "../report/salesDetail_inv?action=inv",
			postData: k,
			datatype: "json",
			autowidth: !0,
			gridview: !0,
			colModel: b,
			cmTemplate: {
				sortable: !1,
				title: !1
			},
			page: 1,
			sortname: "date",
			sortorder: "desc",
			rowNum: 1e6,
			loadonce: !0,
			viewrecords: !0,
			shrinkToFit: !0,
			footerrow: !0,
			userDataOnFooter: !0,
			jsonReader: {
				root: "data.rows",
				records: "data.records",
				total: "data.total",
				userdata: "data.userdata",
				repeatitems: !1,
				id: "0"
			},
			ondblClickRow: function(a) {
				if (Business.verifyRight("SAREPORTDETAIL_QUERY")) {
					var b = i("#grid").getRowData(a),
						c = b.buNo,
						d = b.invNo,
						e = b.locationNo;
					parent.tab.addTabItem({
						tabid: "report-salesDetail",
						text: "销售明细表",
						url: "../report/sales_detail?autoSearch=true&beginDate=" + k.beginDate + "&endDate=" + k.endDate + "&customerNo=" + c + "&goodsNo=" + d + "&storageNo=" + e + "&profit=" + k.profit + "&showSku=" + k.showSku
					})
				}
			},
			loadComplete: function(a) {
				var b;
				if (a && a.data) {
					var c = a.data.rows.length;
					b = c ? 31 * c : 1
				}
				e(b)
			},
			gridComplete: function() {
				i("#grid").footerData("set", {
					location: "合计:"
				}), i("table.ui-jqgrid-ftable").find('td[aria-describedby="grid_location"]').prevUntil().css("border-right-color", "#fff")
			}
		})
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
	function h(a) {
		"number" == typeof a && (i("#grid").jqGrid(a ? "showCol" : "hideCol", ["unitCost", "cost", "saleProfit", "salepPofitRate"]), e()), i("#grid").clearGridData(!0), i("#grid").jqGrid("setGridParam", {
			datatype: "json",
			postData: k
		}).trigger("reloadGrid")
	}
	var i = a("jquery"),
		j = parent.SYSTEM,
		k = i.extend({
			beginDate: "",
			endDate: "",
			customerNo: "",
			goodsNo: "",
			storageNo: "",
			profit: 0,
			showSku: 0
		}, Public.urlParam());
	a("print"), b(), c(), d();
	var l;
	i(window).on("resize", function() {
		l || (l = setTimeout(function() {
			e(), l = null
		}, 50))
	})
});