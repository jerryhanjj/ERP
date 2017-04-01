define(["jquery", "print"], function(a) {
	function b() {
		Business.filterCustomer(), Business.filterGoods(), Business.filterSaler(), Business.moreFilterEvent(), i("#conditions-trigger").trigger("click"), i("#filter-fromDate").val(j.beginDate || ""), i("#filter-toDate").val(j.endDate || ""), i("#filter-fromDeliveryDate").val(j.fromDeliveryDate || ""), i("#filter-toDeliveryDate").val(j.toDeliveryDate || ""), i("#filter-customer input").val(j.customerNo || ""), i("#filter-goods input").val(j.goodsNo || ""), j.beginDate && j.endDate && (i("#selected-period").text(j.beginDate + "至" + j.endDate), i("div.grid-subtitle").text("日期: " + j.beginDate + " 至 " + j.endDate)), i("#filter-fromDate, #filter-toDate, #filter-fromDeliveryDate, #filter-toDeliveryDate").datepicker();
		var a = i("#status-wrap").cssCheckbox();
		i("#filter-submit").on("click", function(b) {
			b.preventDefault();
			var c = i("#filter-fromDate").val(),
				d = i("#filter-toDate").val(),
				e = i("#filter-fromDeliveryDate").val(),
				f = i("#filter-toDeliveryDate").val();
			return c && d && new Date(c).getTime() > new Date(d).getTime() ? void parent.Public.tips({
				type: 1,
				content: "开始日期不能大于结束日期"
			}) : (j = {
				beginDate: c,
				endDate: d,
				beginDeliveryDate: e,
				endDeliveryDate: f,
				customerNo: i("#filter-customer input").val() || "",
				goodsNo: i("#filter-goods input").val() || "",
				status: a.chkVal().join(),
				salesId: i("#filter-saler input").val() || ""
			}, i("#selected-period").text(c + "至" + d), i("div.grid-subtitle").text("日期: " + c + " 至 " + d), void h())
		}), i("#filter-reset").on("click", function(b) {
			b.preventDefault(), i("#filter-fromDate").val(j.beginDate), i("#filter-toDate").val(j.endDate), i("#filter-fromDeliveryDate").val(j.fromDeliveryDate), i("#filter-toDeliveryDate").val(j.toDeliveryDate), i("#filter-customer input").val(""), i("#filter-goods input").val(""), i("#filter-saler input").val(""), a.chkNot()
		})
	}
	function c() {
		i("#refresh").on("click", function(a) {
			a.preventDefault(), h()
		}), i("#btn-print").click(function(a) {
			a.preventDefault(), Business.verifyRight("SALESORDER_PRINT") && i("div.ui-print").printTable()
		}), i("#btn-export").click(function(a) {
			a.preventDefault(), Business.verifyRight("SALESORDER_EXPORT") && Business.getFile("../report/salesOrder_detailExporter?action=detailExporter", j)
		})
	}
	function d() {
		var a = i(window).height() - i(".grid-wrap").offset().top - 65 - 70,
			b = [{
				name: "invNo",
				label: "商品编号",
				frozen: !0,
				width: 80
			}, {
				name: "invName",
				label: "商品名称",
				frozen: !0,
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
				align: "center"
			}, {
				name: "date",
				label: "订单日期",
				width: 80,
				align: "center"
			}, {
				name: "billNo",
				label: "销售订单编号",
				width: 120,
				align: "center"
			}, {
				name: "billId",
				label: "销售订单ID",
				width: 0,
				hidden: !0
			}, {
				name: "salesName",
				label: "销售人员",
				width: 80
			}, {
				name: "buName",
				label: "客户",
				width: 150
			}, {
				name: "status",
				label: "状态",
				width: 60
			}, {
				name: "qty",
				label: "数量",
				width: 80,
				align: "right"
			}, {
				name: "amount",
				label: "销售额",
				width: 100,
				align: "right"
			}, {
				name: "unQty",
				label: "未出库数量",
				width: 80,
				align: "right"
			}, {
				name: "deliveryDate",
				label: "预计交货日期",
				width: 80,
				align: "center"
			}, {
				name: "inDate",
				label: "出库日期",
				width: 80,
				align: "center"
			}];
		i("#grid").jqGrid({
			url: "../report/salesOrder?action=detail",
			postData: j,
			datatype: "json",
			autowidth: !0,
			height: a,
			gridview: !0,
			colModel: b,
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
			jsonReader: {
				root: "data.rows",
				records: "data.records",
				total: "data.total",
				userdata: "data.userdata",
				repeatitems: !1,
				id: "0"
			},
			ondblClickRow: function(a) {
				var b = i("#grid").getRowData(a).billId;
				b && parent.tab.addTabItem({
					tabid: "sales-salesOrder",
					text: "销货订单",  
					url: "scm/invSo/editso?id=" + b
				})
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
				var a = i("#grid").find('td[aria-describedby="grid_invNo"]');
				a.each(function() {
					var a = i(this);
					"&nbsp;" === a.html() && a.parent().addClass("fb")
				})
			}
		})
	}
	function e(a) {
		a && (e.h = a);
		var b = f(),
			c = i(window).height() - i(".grid-wrap").offset().top - 65 - 70,
			d = (g(), i("#grid"));
		i("#grid-wrap").height(function() {
			return document.body.clientHeight - this.offsetTop - 36 - 5
		}), d.jqGrid("setGridHeight", c), d.jqGrid("setGridWidth", b)
	}
	function f() {
		return i(window).width() - (f.offsetLeft || (f.offsetLeft = i("#grid-wrap").offset().left)) - 36 - 20
	}
	function g() {
		return i(window).height() - (g.offsetTop || (g.offsetTop = i("#grid").offset().top)) - 36 - 16
	}
	function h() {
		i("#grid").jqGrid("setGridParam", {
			datatype: "json",
			postData: j
		}).trigger("reloadGrid")
	}
	var i = a("jquery"),
		j = (parent.SYSTEM, i.extend({
			beginDate: "",
			endDate: "",
			fromDeliveryDate: "",
			toDeliveryDate: "",
			customerNo: "",
			goodsNo: "",
			status: ""
		}, Public.urlParam()));
	a("print"), b(), c(), d();
	var k;
	i(window).on("resize", function() {
		k || (k = setTimeout(function() {
			e(), k = null
		}, 50))
	})
});