define(["jquery", "print"], function(a) {
	function b() {
		Business.filterCustomer(), Business.filterGoods(), Business.filterStorage(), Business.filterSaler(), Business.moreFilterEvent(), j("#conditions-trigger").trigger("click"), j("#filter-fromDate").val(l.beginDate || ""), j("#filter-toDate").val(l.endDate || ""), j("#filter-customer input").val(l.customerNo || ""), j("#filter-goods input").val(l.goodsNo || ""), j("#filter-storage input").val(l.storageNo || ""), l.beginDate && l.endDate && (j("#selected-period").text(l.beginDate + "至" + l.endDate), j("div.grid-subtitle").text("日期: " + l.beginDate + " 至 " + l.endDate)), j("#filter-fromDate, #filter-toDate").datepicker(), Public.dateCheck();
		var a = parent.SYSTEM;
		a.rights.SAREPORTDETAIL_COST || a.isAdmin ? (j("#profit-wrap").show(), "1" === l.profit && j("#profit-wrap input").attr("checked", !0)) : j("#profit-wrap").hide();
		var b = j("#profit-wrap").cssCheckbox();
		j("#filter-submit").on("click", function(a) {
			a.preventDefault();
			var c = j("#filter-fromDate").val(),
				d = j("#filter-toDate").val();
			return c && d && new Date(c).getTime() > new Date(d).getTime() ? void parent.Public.tips({
				type: 1,
				content: "开始日期不能大于结束日期"
			}) : (l = {
				beginDate: c,
				endDate: d,
				customerNo: j("#filter-customer input").val() || "",
				goodsNo: j("#filter-goods input").val() || "",
				storageNo: j("#filter-storage input").val() || "",
				salesId: j("#filter-saler input").val() || "",
				profit: b.chkVal().length > 0 ? "1" : "0"
			}, j("#selected-period").text(c + "至" + d), j("div.grid-subtitle").text("日期: " + c + " 至 " + d), void i(+l.profit))
		}), j("#filter-reset").on("click", function(a) {
			a.preventDefault(), j("#filter-fromDate").val(l.beginDate), j("#filter-toDate").val(l.endDate), j("#filter-customer input").val(""), j("#filter-goods input").val(""), j("#filter-storage input").val(""), j("#filter-saler input").val(""), b.chkNot()
		})
	}
	function c() {
		var a = l.customer ? l.customer.split(",") : "",
			b = l.goods ? l.goods.split(",") : "",
			c = "";
		a && b ? c = "「您已选择了<b>" + a.length + "</b>个客户，<b>" + b.length + "</b>个商品进行查询」" : a ? c = "「您已选择了<b>" + a.length + "</b>个客户进行查询」" : b && (c = "「您已选择了<b>" + b.length + "</b>个商品进行查询」"), j("#cur-search-tip").html(c)
	}
	function d() {
		j("#refresh").on("click", function(a) {
			a.preventDefault(), i()
		}), j("#btn-print").click(function(a) {
			a.preventDefault(), Business.verifyRight("SAREPORTDETAIL_PRINT") && j("div.ui-print").printTable()
		}), j("#btn-export").click(function(a) {
			a.preventDefault(), Business.verifyRight("SAREPORTDETAIL_EXPORT") && Business.getFile("../report/salesDetail_detailExporter?action=detailExporter", l)
		})
	}
	function e() {
		var a = !1,
			b = !0;
		k.isAdmin !== !1 || k.rights.AMOUNT_OUTAMOUNT || (a = !0), "1" === l.profit && (b = !1);
		var c = [{
			name: "date",
			label: "销售日期",
			width: 80,
			fixed: !0,
			align: "center"
		}, {
			name: "billId",
			label: "销售ID",
			width: 0,
			hidden: !0
		}, {
			name: "billNo",
			label: "销售单据号",
			width: 110,
			fixed: !0,
			align: "center"
		}, {
			name: "transType",
			label: "业务类别",
			width: 60,
			fixed: !0,
			align: "center"
		}, {
			name: "salesName",
			label: "销售人员",
			width: 80
		}, {
			name: "buName",
			label: "客户",
			width: 150,
			classes: "ui-ellipsis",
			title: !0
		}, {
			name: "invNo",
			label: "商品编号",
			width: 100
		}, {
			name: "invName",
			label: "商品名称",
			width: 200,
			classes: "ui-ellipsis",
			title: !0
		}, {
			name: "spec",
			label: "规格型号",
			width: 60
		}, {
			name: "unit",
			label: "单位",
			width: 50,
			fixed: !0,
			align: "center"
		}, {
			name: "location",
			label: "仓库",
			width: 60,
			classes: "ui-ellipsis",
			title: !0
		}, {
			name: "qty",
			label: "数量",
			width: 100,
			fixed: !0,
			align: "right"
		}, {
			name: "unitPrice",
			label: "单价",
			width: 100,
			fixed: !0,
			hidden: a,
			align: "right"
		}, {
			name: "amount",
			label: "销售收入",
			width: 100,
			fixed: !0,
			hidden: a,
			align: "right"
		}, {
			name: "unitCost",
			label: "单位成本",
			width: 80,
			fixed: !0,
			hidden: b,
			align: "right"
		}, {
			name: "cost",
			label: "销售成本",
			width: 80,
			fixed: !0,
			hidden: b,
			align: "right"
		}, {
			name: "saleProfit",
			label: "销售毛利",
			width: 80,
			fixed: !0,
			hidden: b,
			align: "right"
		}, {
			name: "salepPofitRate",
			label: "毛利率",
			width: 80,
			fixed: !0,
			hidden: b,
			align: "right"
		}, {
			name: "description",
			label: "备注",
			width: 150
		}],
			d = "local",
			e = "#";
		l.autoSearch && (d = "json", e = "../report/salesDetail_detail?action=detail"), j("#grid").jqGrid({
			url: e,
			postData: l,
			datatype: d,
			autowidth: !0,
			gridview: !0,
			colModel: c,
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
				root: "data.rows",
				records: "data.records",
				total: "data.total",
				userdata: "data.userdata",
				repeatitems: !1,
				id: "0"
			},
			ondblClickRow: function(a) {
				if (Business.verifyRight("SA_QUERY")) {
					var b = j("#grid").getRowData(a).billId;
					parent.tab.addTabItem({
						tabid: "sales-sales",
						text: "销售单",
						url: "../scm/invSa?action=editSale&id=" + b
					})
				}
			},
			loadComplete: function(a) {
				var b;
				if (a && a.data) {
					var c = a.data.rows.length;
					b = c ? 31 * c : 1
				}
				f(b)
			},
			gridComplete: function() {
				j("#grid").footerData("set", {
					location: "合计:"
				}), j("table.ui-jqgrid-ftable").find('td[aria-describedby="grid_location"]').prevUntil().css("border-right-color", "#fff")
			}
		}), l.autoSearch ? (j(".no-query").remove(), j(".ui-print").show()) : j(".ui-print").hide()
	}
	function f(a) {
		a && (f.h = a);
		var b = g(),
			c = f.h,
			d = h(),
			e = j("#grid");
		c > d && (c = d), b < e.width() && (c += 17), j("#grid-wrap").height(function() {
			return document.body.clientHeight - this.offsetTop - 36 - 5
		}), e.jqGrid("setGridHeight", c), e.jqGrid("setGridWidth", b, !1)
	}
	function g() {
		return j(window).width() - j("#grid-wrap").offset().left - 36 - 20
	}
	function h() {
		return j(window).height() - j("#grid").offset().top - 36 - 16
	}
	function i(a) {
		j(".no-query").remove(), j(".ui-print").show(), "number" == typeof a && (j("#grid").jqGrid(a ? "showCol" : "hideCol", ["unitCost", "cost", "saleProfit", "salepPofitRate"]), f(), j("#grid").clearGridData(!0)), j("#grid").jqGrid("setGridParam", {
			datatype: "json",
			postData: l,
			url: "../report/salesDetail_detail?action=detail"
		}).trigger("reloadGrid")
	}
	var j = a("jquery"),
		k = parent.SYSTEM,
		l = j.extend({
			beginDate: "",
			endDate: "",
			customerNo: "",
			goodsNo: "",
			storageNo: "",
			profit: "0"
		}, Public.urlParam());
	a("print"), b(), c(), d(), e();
	var m;
	j(window).on("resize", function() {
		m || (m = setTimeout(function() {
			f(), m = null
		}, 50))
	})
});