function initFilter() {
	Business.filterSupplier(), Business.filterGoods(), Business.filterStorage(), $("#filter-fromDate, #filter-toDate").datepicker();
	var a = Public.urlParam();
	filterConditions = {
		beginDate: a.beginDate || defParams.beginDate,
		endDate: a.endDate || defParams.endDate,
		customerNo: a.customerNo || "",
		goodsNo: a.goodsNo || "",
		storageNo: a.storageNo || ""
	}, $("#filter-fromDate").val(filterConditions.beginDate || ""), $("#filter-toDate").val(filterConditions.endDate || ""), $("#filter-customer input").val(filterConditions.customerNo || ""), $("#filter-goods input").val(filterConditions.goodsNo || ""), $("#filter-storage input").val(filterConditions.storageNo || ""), filterConditions.beginDate && filterConditions.endDate && $("#selected-period").text(filterConditions.beginDate + "至" + filterConditions.endDate), Public.dateCheck(), $(document).on("click", "#ui-datepicker-div,.ui-datepicker-header", function(a) {
		a.stopPropagation()
	}), Business.moreFilterEvent(), $("#conditions-trigger").trigger("click"), $("#filter-submit").on("click", function(a) {
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
			storageNo: $("#filter-storage input").val() || ""
		}, void reloadReport())
	}), $("#filter-reset").on("click", function(a) {
		a.preventDefault(), $("#filter-fromDate").val(""), $("#filter-toDate").val(""), $("#filter-customer input").val(""), $("#filter-goods input").val(""), $("#filter-storage input").val("")
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
		a.preventDefault(), Business.verifyRight("PUREOORTDETAIL_PRINT") && window.print()
	}), $("#btn-export").click(function(a) {
		if (a.preventDefault(), Business.verifyRight("PUREOORTDETAIL_EXPORT")) {
			var b = {};
			for (var c in filterConditions) filterConditions[c] && (b[c] = filterConditions[c]);
			Business.getFile("../report/puDetail/detailExporter?action=detailExporter", b)
		}
	}), $(".grid-wrap").on("click", ".link", function(a) {
		if (a.preventDefault(), Business.verifyRight("PU_QUERY")) {
			{
				var b = $(this).data("id");
				$(this).data("type")
			}
			parent.tab.addTabItem({
				tabid: "purchase-purchase",
				text: "购货单",
				url: "../scm/invpu?action=editPur&id=" + b
			}), $(this).addClass("tr-hover"), $_curTr = $(this)
		}
	}), Business.gridEvent()
}
function reloadReport() {
	var a = "";
	for (key in filterConditions) filterConditions[key] && (a += "&" + key + "=" + encodeURIComponent(filterConditions[key]));
	window.location = "../report/puDetail_detail?action=detail" + a
}
var filterConditions = {},
	profitChk, $_curTr;
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