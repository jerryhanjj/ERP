function initEvent() {
	$("#btn-add").click(function(a) {
		a.preventDefault(), handle.operate("add")
	}), $("#grid").on("click", ".operating .ui-icon-pencil", function(a) {
		a.preventDefault();
		var b = $(this).parent().data("id");
		handle.operate("edit", b)
	}), $("#grid").on("click", ".operating .ui-icon-trash", function(a) {
		a.preventDefault();
		var b = $(this).parent().data("id");
		handle.del(b)
	}), $("#btn-refresh").click(function(a) {
		a.preventDefault(), $("#grid").jqGrid("setGridParam", {
			url: "../basedata/assist?action=list&typeNumber=PayMethod&isDelete=2",
			datatype: "json"
		}).trigger("reloadGrid")
	}), $(window).resize(function() {
		Public.resizeGrid()
	})
}
function initGrid() {
	var a = ["操作", "名称"],
		b = [{
			name: "operate",
			width: 60,
			fixed: !0,
			align: "center",
			formatter: Public.operFmatter
		}, {
			name: "name",
			index: "name",
			width: 200
		}];
	$("#grid").jqGrid({
		url: "../basedata/assist?action=list&typeNumber=PayMethod&isDelete=2",
		datatype: "json",
		height: Public.setGrid().h,
		altRows: !0,
		gridview: !0,
		colNames: a,
		colModel: b,
		autowidth: !0,
		viewrecords: !0,
		cmTemplate: {
			sortable: !1,
			title: !1
		},
		page: 1,
		pager: "#page",
		rowNum: 2e3,
		rowList: [300, 500, 1e3],
		shrinkToFit: !1,
		scroll: 1,
		jsonReader: {
			root: "data.items",
			records: "data.totalsize",
			repeatitems: !1,
			id: "id"
		},
		loadComplete: function(a) {
			if (a && 200 == a.status) {
				var b = {};
				a = a.data;
				for (var c = 0; c < a.items.length; c++) {
					var d = a.items[c];
					b[d.id] = d
				}
				$("#grid").data("gridData", b)
			} else {
				var e = 250 == a.status ? "没有结算方式数据！" : "获取结算方式数据失败！" + a.msg;
				parent.Public.tips({
					type: 2,
					content: e
				})
			}
		},
		loadError: function() {
			parent.Public.tips({
				type: 1,
				content: "操作失败了哦，请检查您的网络链接！"
			})
		}
	})
}
var handle = {
	operate: function(a, b) {
		if ("add" == a) {
			if (!Business.verifyRight("Assist_ADD")) return;
			var c = "新增结算方式",
				d = {
					oper: a,
					callback: this.callback
				}
		} else {
			if (!Business.verifyRight("Assist_UPDATE")) return;
			var c = "修改结算方式",
				d = {
					oper: a,
					rowData: $("#grid").data("gridData")[b],
					callback: this.callback
				}
		}
		$.dialog({
			title: c,
			content: "url:settlement_category_manager",
			data: d,
			width: 400,
			height: 100,
			max: !1,
			min: !1,
			cache: !1,
			lock: !0
		})
	},
	del: function(a) {
		Business.verifyRight("Assist_DELETE") && $.dialog.confirm("删除的结算方式将不能恢复，请确认是否删除？", function() {
			Public.ajaxPost("../basedata/assist/delete?action=delete&typeNumber=customertype", {
				id: a
			}, function(b) {
				b && 200 == b.status ? (parent.Public.tips({
					content: "删除结算方式成功！"
				}), $("#grid").jqGrid("delRowData", a)) : parent.Public.tips({
					type: 1,
					content: "删除结算方式失败！" + b.msg
				})
			})
		})
	},
	callback: function(a, b, c) {
		var d = $("#grid").data("gridData");
		d || (d = {}, $("#grid").data("gridData", d)), d[a.id] = a, "edit" == b ? ($("#grid").jqGrid("setRowData", a.id, a), c && c.api.close()) : ($("#grid").jqGrid("addRowData", a.id, a, "last"), c && c.resetForm(a))
	}
};
initEvent(), initGrid();