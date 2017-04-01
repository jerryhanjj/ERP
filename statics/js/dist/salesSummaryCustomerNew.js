define(["jquery", "print"], function(a) {
	function b() {
		Business.filterCustomer(), Business.filterGoods(), Business.filterStorage(), Business.moreFilterEvent(), i("#conditions-trigger").trigger("click"), i("#filter-fromDate").val(k.beginDate || ""), i("#filter-toDate").val(k.endDate || ""), i("#filter-customer input").val(k.customerNo || ""), i("#filter-goods input").val(k.goodsNo || ""), i("#filter-storage input").val(k.storageNo || ""), k.beginDate && k.endDate && (i("#selected-period").text(k.beginDate + "至" + k.endDate), i("div.grid-subtitle").text("日期: " + k.beginDate + " 至 " + k.endDate)), i("#filter-fromDate, #filter-toDate").datepicker(), Public.dateCheck(), j.rights.SAREPORTBU_COST || j.isAdmin ? (i("#profit-wrap").show(), "1" === k.profit && i("#profit-wrap input").attr("checked", !0)) : i("#profit-wrap").hide(), chkboxes = i("#profit-wrap").cssCheckbox(), i("#filter-submit").on("click", function(a) {
			a.preventDefault();
			var b = i("#filter-fromDate").val(),
				c = i("#filter-toDate").val();
			if (b && c && new Date(b).getTime() > new Date(c).getTime()) return void parent.Public.tips({
				type: 1,
				content: "开始日期不能大于结束日期"
			});
			k = {
				beginDate: b,
				endDate: c,
				customerNo: i("#filter-customer input").val() || "",
				goodsNo: i("#filter-goods input").val() || "",
				storageNo: i("#filter-storage input").val() || "",
				profit: ""
			}, i("#selected-period").text(b + "至" + c), i("div.grid-subtitle").text("日期: " + b + " 至 " + c), chkVals = chkboxes.chkVal();
			for (var d = 0, e = chkVals.length; e > d; d++) k[chkVals[d]] = 1;
			var f = k.profit;
			h(f), i("#filter-menu").removeClass("ui-btn-menu-cur")
		}), i("#filter-reset").on("click", function(a) {
			a.preventDefault(), i("#filter-fromDate").val(k.beginDate), i("#filter-toDate").val(k.endDate), i("#filter-customer input").val(""), i("#filter-goods input").val(""), i("#filter-storage input").val(""), k.customerNo = "", k.goodsNo = "", k.storageNo = ""
		})
	}
	function c() {
		i("#refresh").on("click", function(a) {
			a.preventDefault(), i("#filter-submit").click()
		}), i("#btn-print").click(function(a) {
			a.preventDefault(), Business.verifyRight("SAREPORTBU_PRINT") && i("div.ui-print").printTable()
		}), i("#btn-export").click(function(a) {
			a.preventDefault(), Business.verifyRight("SAREPORTBU_EXPORT") && Business.getFile(l, k)
		})
	}
	function d() {
		var a = !1,
			b = !1,
			c = !1;
		j.isAdmin !== !1 || j.rights.AMOUNT_COSTAMOUNT || (a = !0), j.isAdmin !== !1 || j.rights.AMOUNT_OUTAMOUNT || (b = !0), j.isAdmin !== !1 || j.rights.AMOUNT_INAMOUNT || (c = !0);
		var d = !0;
		1 == k.profit && (d = !1);
		var f = [{
			name: "buName",
			label: "客户",
			width: 80,
			align: "center"
		}, {
			name: "invNo",
			label: "商品编号",
			width: 80,
			align: "center"
		}, {
			name: "invName",
			label: "商品名称",
			width: 200,
			align: "center"
		}, {
			name: "spec",
			label: "规格型号",
			width: 60,
			align: "center"
		}, {
			name: "unit",
			label: "单位",
			width: 100,
			align: "center"
		}, {
			name: "location",
			label: "仓库",
			width: 80,
			align: "center"
		}, {
			name: "qty",
			label: "数量",
			width: 60,
			align: "right",
			formatter: "number",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.qtyPlaces)
			}
		}, {
			name: "unitPrice",
			label: "单价",
			width: 60,
			align: "right",
			hidden: b,
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.pricePlaces)
			}
		}, {
			name: "amount",
			label: "销售收入",
			width: 60,
			align: "right",
			hidden: b,
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.amountPlaces)
			}
		}, {
			name: "unitCost",
			label: "单位成本",
			width: 60,
			align: "right",
			hidden: d,
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.pricePlaces)
			}
		}, {
			name: "cost",
			label: "销售成本",
			width: 60,
			align: "right",
			hidden: d,
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.amountPlaces)
			}
		}, {
			name: "saleProfit",
			label: "销售毛利",
			width: 60,
			align: "right",
			hidden: d,
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.amountPlaces)
			}
		}, {
			name: "salepPofitRate",
			label: "毛利率",
			width: 60,
			align: "right",
			hidden: d,
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.amountPlaces)
			}
		}, {
			name: "buNo",
			label: "",
			width: 0,
			hidden: !0
		}, {
			name: "locationNo",
			label: "",
			width: 0,
			hidden: !0
		}],
			g = "local",
			h = "#";
		k.autoSearch && (g = "json", h = m), i("#grid").jqGrid({
			url: h,
			postData: k,
			datatype: g,
			autowidth: !0,
			gridview: !0,
			colModel: f,
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
				root: "data.list",
				userdata: "data.total",
				repeatitems: !1,
				id: "0"
			},
			onCellSelect: function(a) {
				if (Business.verifyRight("SAREPORTDETAIL_QUERY")) {
					var b = i("#grid").getRowData(a),
						c = b.buNo,
						d = b.invNo,
						e = b.locationNo;
					parent.tab.addTabItem({
						tabid: "report-salesDetail",
						text: "销售明细表",
						url: "../report/sales_detail?autoSearch=true&beginDate=" + k.beginDate + "&endDate=" + k.endDate + "&customerNo=" + c + "&goodsNo=" + d + "&storageNo=" + e + "&profit=" + k.profit
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
					location: "合计:"
				}), i("table.ui-jqgrid-ftable").find('td[aria-describedby="grid_location"]').prevUntil().css("border-right-color", "#fff")
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
	function h(a) {
		i(".no-query").remove(), i(".ui-print").show(), "undefined" != typeof a && (i("#grid").jqGrid(a ? "showCol" : "hideCol", ["unitCost", "cost", "saleProfit", "salepPofitRate"]), e()), i("#grid").clearGridData(!0), i("#grid").jqGrid("setGridParam", {
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
			customerNo: "",
			goodsNo: "",
			storageNo: "",
			profit: ""
		}, Public.urlParam()),
		l = "../report/salesDetail_customerExporter?action=customerExporter",
		m = "../report/salesDetail_customer?action=customer";
	a("print"), b(), c(), d();
	var n;
	i(window).on("resize", function() {
		n || (n = setTimeout(function() {
			e(), n = null
		}, 50))
	})
});