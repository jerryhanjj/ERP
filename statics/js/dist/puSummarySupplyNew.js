define(["jquery", "print"], function(a) {
	function b() {
		Business.filterSupplier(), Business.filterGoods(), Business.filterStorage(), Business.moreFilterEvent(), i("#conditions-trigger").trigger("click"), i("#filter-fromDate").val(k.beginDate || ""), i("#filter-toDate").val(k.endDate || ""), i("#filter-customer input").val(k.customerNo || ""), i("#filter-goods input").val(k.goodsNo || ""), i("#filter-storage input").val(k.storageNo || ""), k.beginDate && k.endDate && (i("#selected-period").text(k.beginDate + "至" + k.endDate), i("div.grid-subtitle").text("日期: " + k.beginDate + " 至 " + k.endDate)), i("#filter-fromDate, #filter-toDate").datepicker(), chkboxes = i("#chk-wrap").cssCheckbox(), i("#filter-submit").on("click", function(a) {
			a.preventDefault();
			var b = i("#filter-fromDate").val(),
				c = i("#filter-toDate").val();
			return b && c && new Date(b).getTime() > new Date(c).getTime() ? void parent.Public.tips({
				type: 1,
				content: "开始日期不能大于结束日期"
			}) : (k = {
				beginDate: b,
				endDate: c,
				customerNo: i("#filter-customer input").val() || "",
				goodsNo: i("#filter-goods input").val() || "",
				storageNo: i("#filter-storage input").val() || ""
			}, i("#selected-period").text(b + "至" + c), i("div.grid-subtitle").text("日期: " + b + " 至 " + c), h(), void i("#filter-menu").removeClass("ui-btn-menu-cur"))
		}), i("#filter-reset").on("click", function(a) {
			a.preventDefault(), i("#filter-fromDate").val(k.beginDate), i("#filter-toDate").val(k.endDate), i("#filter-customer input").val(""), i("#filter-goods input").val(""), i("#filter-storage input").val(""), k.customerNo = "", k.goodsNo = "", k.storageNo = ""
		})
	}
	function c() {
		i("#refresh").on("click", function(a) {
			a.preventDefault(), i("#filter-submit").click()
		}), i("#btn-print").click(function(a) {
			a.preventDefault(), Business.verifyRight("PUREPORTPUR_PRINT") && i("div.ui-print").printTable()
		}), i("#btn-export").click(function(a) {
			a.preventDefault(), Business.verifyRight("PUREPORTPUR_EXPORT") && Business.getFile(l, k)
		})
	}
	function d() {
		var a = !1,
			b = !1,
			c = !1;
		j.isAdmin !== !1 || j.rights.AMOUNT_COSTAMOUNT || (a = !0), j.isAdmin !== !1 || j.rights.AMOUNT_OUTAMOUNT || (b = !0), j.isAdmin !== !1 || j.rights.AMOUNT_INAMOUNT || (c = !0);
		var d = [{
			name: "buName",
			label: "供应商",
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
			width: 60,
			align: "center"
		}, {
			name: "location",
			label: "仓库",
			width: 100,
			align: "center"
		}, {
			name: "qty",
			label: "数量",
			width: 100,
			align: "center",
			formatter: "number",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.qtyPlaces)
			}
		}, {
			name: "unitPrice",
			label: "单价",
			width: 120,
			align: "right",
			hidden: c,
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.pricePlaces)
			}
		}, {
			name: "amount",
			label: "采购金额",
			width: 120,
			align: "right",
			hidden: c,
			formatter: "currency",
			formatoptions: {
				thousandsSeparator: ",",
				decimalPlaces: Number(j.amountPlaces)
			}
		}, {
			name: "locationNo",
			label: "",
			width: 0,
			hidden: !0
		}, {
			name: "buNo",
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
			gridview: !0,
			colModel: d,
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
				if (Business.verifyRight("PU_QUERY")) {
					var b = i("#grid").getRowData(a),
						c = b.buNo,
						d = b.invNo,
						e = b.locationNo;
					parent.tab.addTabItem({
						tabid: "report-puDetail",
						text: "采购明细表",
						url: "../report/pu_detail_new?autoSearch=true&beginDate=" + k.beginDate + "&endDate=" + k.endDate + "&customerNo=" + c + "&goodsNo=" + d + "&storageNo=" + e
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
	function h() {
		i(".no-query").remove(), i(".ui-print").show(), i("#grid").clearGridData(!0), i("#grid").jqGrid("setGridParam", {
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
			storageNo: ""
		}, Public.urlParam()),
		l = "../report/puDetail_supplyExporter?action=supplyExporter",
		m = "../report/puDetail_supply?action=supply";
	a("print"), b(), c(), d();
	var n;
	i(window).on("resize", function() {
		n || (n = setTimeout(function() {
			e(), n = null
		}, 50))
	})
});