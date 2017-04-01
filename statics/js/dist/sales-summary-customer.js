function initFilter() {
	Business.filterCustomer(), Business.filterGoods(), Business.filterStorage(), $("#filter-fromDate, #filter-toDate").datepicker();
	var a = Public.urlParam();
	filterConditions = {
		beginDate: a.beginDate || defParams.beginDate,
		endDate: a.endDate || defParams.endDate,
		customerNo: a.customerNo || "",
		goodsNo: a.goodsNo || "",
		storageNo: a.storageNo || "",
		sortRule: a.sortRule || "0",
		profit: a.profit || "0"
	}, $("#filter-fromDate").val(filterConditions.beginDate || ""), $("#filter-toDate").val(filterConditions.endDate || ""), $("#filter-customer input").val(filterConditions.customerNo || ""), $("#filter-goods input").val(filterConditions.goodsNo || ""), $("#filter-storage input").val(filterConditions.storageNo || ""), "0" === filterConditions.sortRule ? $("#salesQty").attr("checked", !0) : $("#salesIncome").attr("checked", !0), filterConditions.beginDate && filterConditions.endDate && $("#selected-period").text(filterConditions.beginDate + "至" + filterConditions.endDate), SYSTEM.rights.SAREPORTBU_COST || SYSTEM.isAdmin ? ($("#profit-wrap").show(), "1" === filterConditions.profit && $("#profit-wrap input").attr("checked", !0)) : $("#profit-wrap").hide(), Public.dateCheck(), $(document).on("click", "#ui-datepicker-div,.ui-datepicker-header", function(a) {
		a.stopPropagation()
	}), profitChk = $("#profit-wrap").cssCheckbox(), Business.moreFilterEvent(), $("#conditions-trigger").trigger("click"), $("#filter-submit").on("click", function(a) {
		a.preventDefault();
		var b = $("#filter-fromDate").val(),
			c = $("#filter-toDate").val();
		return b && c && new Date(b).getTime() > new Date(c).getTime() ? void parent.Public.tips({
			type: 1,
			content: "开始日期不能大于结束日期"
		}) : (filterConditions = {
			beginDate: b,
			endDate: c,
			customerNo: $("#filter-customer input").val() || "",
			goodsNo: $("#filter-goods input").val() || "",
			storageNo: $("#filter-storage input").val() || "",
			sortRule: $("input[name='sort-rule']:checked").val(),
			profit: profitChk.chkVal().length > 0 ? "1" : "0"
		}, void reloadReport())
	}), $("#filter-reset").on("click", function(a) {
		a.preventDefault(), $("#filter-fromDate").val(""), $("#filter-toDate").val(""), $("#filter-customer input").val(""), $("#filter-goods input").val(""), $("#filter-storage input").val(""), $("#salesQty").attr("checked", !0), $("#salesIncome").removeAttr("checked"), profitChk.chkNot()
	})
}
function initField() {
	var a = filterConditions.customer ? filterConditions.customer.split(",") : "",
		b = filterConditions.goods ? filterConditions.goods.split(",") : "",
		c = "";
	a && b ? c = "「您已选择了<b>" + a.length + "</b>个客户，<b>" + b.length + "</b>个商品进行查询」" : a ? c = "「您已选择了<b>" + a.length + "</b>个客户进行查询」" : b && (c = "「您已选择了<b>" + b.length + "</b>个商品进行查询」"), $("#cur-search-tip").html(c)
}
function initEvent() {
	$("#refresh").on("click", function(a) {
		a.preventDefault(), reloadReport()
	}), $("#btn-print").click(function(a) {
		a.preventDefault(), Business.verifyRight("SAREPORTBU_PRINT") && window.print()
	}), $("#btn-export").click(function(a) {
		if (a.preventDefault(), Business.verifyRight("SAREPORTBU_EXPORT")) {
			var b = {};
			for (var c in filterConditions) filterConditions[c] && (b[c] = filterConditions[c]);
			Business.getFile("../report/salesDetail_customerExporter?action=customerExporter", b)
		}
	}), $(".grid-wrap").on("click", ".link", function(a) {
		if (a.preventDefault(), Business.verifyRight("SAREPORTDETAIL_QUERY")) {
			var b = $(this).data("buno"),
				c = $(this).data("invno"),
				d = $(this).data("locationno");
			parent.tab.addTabItem({
				tabid: "report-salesDetail",
				text: "销售明细表",
				url: "../report/sales_detail?autoSearch=true&beginDate=" + filterConditions.beginDate + "&endDate=" + filterConditions.endDate + "&customerNo=" + b + "&goodsNo=" + c + "&storageNo=" + d + "&profit=" + filterConditions.profit
			}), $(this).addClass("tr-hover"), $_curTr = $(this)
		}
	}), Business.gridEvent()
}
function reloadReport() {
	var a = "";
	for (key in filterConditions) filterConditions[key] && (a += "&" + key + "=" + encodeURIComponent(filterConditions[key]));
	window.location = "../report/salesDetail_customer?action=customer" + a
}
var filterConditions = {},
	profitChk, $_curTr, SYSTEM = parent.SYSTEM;
initFilter(), initEvent(), function() {
	if (Public.isIE6) {
		var a = $("#report-search"),
			b = $(window);
		a.width(b.width()), b.resize(function() {
			a.width(b.width())
		})
	}
}(), $(function() {
	Public.initCustomGrid($("table.list"))
});