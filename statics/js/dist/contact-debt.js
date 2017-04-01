function initFilter() {
	var a = Public.urlParam();
	filterConditions = {
		matchCon: a.matchCon || "",
		customer: a.customer || "",
		supplier: a.supplier || ""
	}, filterConditions.matchCon ? $("#matchCon").val(filterConditions.matchCon || "请输入客户、供应商或编号查询") : ($("#matchCon").addClass("ui-input-ph"), $("#matchCon").placeholder()), filterConditions.customer && $("#customer").attr("checked", !0), filterConditions.supplier && $("#supplier").attr("checked", !0), $("#search").on("click", function(a) {
		a.preventDefault();
		var b = "请输入客户、供应商或编号查询" === $("#matchCon").val() ? "" : $.trim($("#matchCon").val());
		filterConditions = {
			matchCon: b,
			customer: $("#customer").is(":checked") ? 1 : "",
			supplier: $("#supplier").is(":checked") ? 1 : ""
		}, reloadReport()
	})
}
function initField() {
	var a = filterConditions.customer ? filterConditions.customer.split(",") : "",
		b = filterConditions.goods ? filterConditions.goods.split(",") : "",
		c = "";
	a && b ? c = "「您已选择了<b>" + a.length + "</b>个客户，<b>" + b.length + "</b>个商品进行查询」" : a ? c = "「您已选择了<b>" + a.length + "</b>个客户进行查询」" : b && (c = "「您已选择了<b>" + b.length + "</b>个商品进行查询」"), $("#cur-search-tip").html(c)
}
function initEvent() {
	$("#btn-print").click(function(a) {
		a.preventDefault(), Business.verifyRight("ContactDebtReport_PRINT") && window.print()
	}), $("#btn-export").click(function(a) {
		if (a.preventDefault(), Business.verifyRight("ContactDebtReport_EXPORT")) {
			var b = {};
			for (var c in filterConditions) filterConditions[c] && (b[c] = filterConditions[c]);
			Business.getFile("report/contactDebt_exporter?action=exporter", b)
		}
	}), Business.gridEvent()
}
function reloadReport() {
	var a = "";
	for (key in filterConditions) filterConditions[key] && (a += "&" + key + "=" + encodeURIComponent(filterConditions[key]));
	window.location = "../report/contactDebt_detail?action=detail" + a
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