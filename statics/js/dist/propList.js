function initDom() {
	function a(a, b, c) {
		conditions.typeNumber = a, conditions.name = b, c || $("#grid").setGridParam({
			postData: conditions
		}).trigger("reloadGrid"), parent.$("li.l-selected a").eq(0).text(conditions.name + "分类")
	}
	var b = ["id", Number(typeNumber)];
	$("#custom-assisting").combo({
		data: function() {
			return "../basedata/assistType?action=list"
		},
		text: "name",
		value: "id",
		width: 170,
		loadOnce: !1,
		ajaxOptions: {
			formatData: function(a) {
				var a = a.data.items;
				return a.length > 1 && $("#custom-assisting").parent().show(), a
			}
		},
		defaultSelected: b,
		defaultFlag: !1,
		callback: {
			onChange: function(b) {
				if (b.id) {
					var c = b.id,
						d = b.name;
					$("#assisting-category-select li").removeClass("cur"), $("#custom-assisting").parent().addClass("cur"), a(c, d)
				} else $("#custom-assisting").getCombo().selectByValue(conditions.typeNumber, !1)
			},
			beforeChange: function(a) {
				var b = a.id,
					c = a.name;
				return _oType = conditions.typeNumber, _oName = conditions.name, conditions.typeNumber = b, conditions.name = c, verifyRight(rightsAction.query) ? !0 : (conditions.typeNumber = _oType, conditions.name = _oName, !1)
			}
		}
	}).getCombo()
}
function initEvent() {
	$("#btn-add").click(function(a) {
		a.preventDefault(), verifyRight(rightsAction.add) && handle.operate("add")
	}), $("#grid").on("click", ".operating .ui-icon-pencil", function(a) {
		if (a.preventDefault(), verifyRight(rightsAction.update)) {
			var b = $(this).parent().data("id");
			handle.operate("edit", b)
		}
	}), $("#grid").on("click", ".operating .ui-icon-trash", function(a) {
		if (a.preventDefault(), verifyRight(rightsAction.del)) {
			var b = $(this).parent().data("id");
			handle.del(b)
		}
	}), $("#btn-refresh").click(function(a) {
		a.preventDefault(), $("#grid").trigger("reloadGrid")
	}), $("#search").click(function(a) {
		a.preventDefault();
		var b = $.trim($("#matchCon").val());
		conditions.skey = "输入名称查询" == b ? "" : b, $("#grid").setGridParam({
			postData: conditions
		}).trigger("reloadGrid")
	}), $("#matchCon").placeholder(), $(window).resize(function() {
		Public.resizeGrid()
	})
}
function initGrid() {
	var a = [{
		name: "operate",
		label: "操作",
		width: 60,
		fixed: !0,
		align: "center",
		formatter: Public.operFmatter
	}, {
		name: "name",
		label: "属性",
		width: 200,
		formatter: function(a, b, c) {
			for (var d = parseInt(c.level) - 1, e = "", f = 0; d > f; f++) e += "   ";
			return e + a
		}
	}, {
		name: "id",
		label: "id",
		hidden: !0
	}, {
		name: "level",
		label: "level",
		hidden: !0
	}, {
		name: "parentId",
		label: "parentId",
		hidden: !0
	}, {
		name: "parentName",
		label: "parentName",
		hidden: !0
	}, {
		name: "detail",
		label: "是否叶",
		hidden: !0
	}];
	$("#grid").jqGrid({
		url: url,
		postData: conditions,
		datatype: "json",
		height: Public.setGrid().h,
		altRows: !0,
		gridview: !0,
		colModel: a,
		autowidth: !0,
		viewrecords: !0,
		cmTemplate: {
			sortable: !1,
			title: !1
		},
		page: 1,
		pager: "#page",
		rowNum: 2e3,
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
				showParentCategory = "trade" === conditions.typeNumber ? !0 : !1;
				for (var c = 0; c < a.items.length; c++) {
					var d = a.items[c],
						e = b[d.parentId] || {};
					e.name && (showParentCategory = !0, b[d.id].parentName = e.name)
				}
				parent.SYSTEM.assistPropInfo = parent.SYSTEM.assistPropInfo || {}, parent.SYSTEM.assistPropInfo[conditions.typeNumber] = a.items, $("#grid").data("gridData", b)
			} else {
				var f = 250 == a.status ? "没有" + conditions.name + "属性数据！" : "获取" + conditions.name + "属性数据失败！" + a.msg;
				parent.Public.tips({
					type: 2,
					content: f
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
function verifyRight(a) {
	switch (a) {
	case rightsAction.query:
		break;
	case rightsAction.add:
		break;
	case rightsAction.del:
		break;
	case rightsAction.update:
		break;
	default:
		return !1
	}
	return Business.verifyRight("FZSX" + a)
}
var typeNumber, showParentCategory, url = "../basedata/assist?action=list&isDelete=2",
	urlParam = Public.urlParam(),
	SYSTEM = system = parent.SYSTEM;
urlParam.typeNumber && (typeNumber = urlParam.typeNumber);
var conditions = {
	typeNumber: typeNumber,
	skey: "",
	name: ""
},
	rightsAction = {
		query: "_QUERY",
		add: "_ADD",
		del: "_DELETE",
		update: "_UPDATE"
	},
	handle = {
		operate: function(a, b) {
			var c, d;
			"add" == a ? (c = "新增" + conditions.name + "属性", d = {
				oper: a,
				typeNumber: conditions.typeNumber,
				callback: this.callback
			}) : (c = "修改" + conditions.name + "属性", d = {
				oper: a,
				typeNumber: conditions.typeNumber,
				rowData: $("#grid").data("gridData")[b],
				callback: this.callback
			}), this.dialog = $.dialog({
				title: c,
				content: "url:propManage",
				data: d,
				width: 280,
				height: 90,
				max: !1,
				min: !1,
				cache: !1,
				lock: !0
			})
		},
		del: function(a) {
			$.dialog.confirm("删除的" + conditions.name + "属性将不能恢复，请确认是否删除？", function() {
				Public.ajaxPost("../basedata/assist/delete?action=delete", {
					id: a,
					typeNumber: conditions.typeNumber
				}, function(b) {
					if (b && 200 == b.status) {
						parent.Public.tips({
							content: "删除" + conditions.name + "属性成功！"
						}), $("#grid").jqGrid("delRowData", a);
						for (var c = parent.SYSTEM.assistPropInfo.length, d = 0; c > d; d++) parent.SYSTEM.assistPropInfo[d].typeNumber == conditions.typeNumber && parent.SYSTEM.assistPropInfo[d].id == a && (parent.SYSTEM.assistPropInfo.splice(d, 1), d--, c--)
					} else parent.Public.tips({
						type: 1,
						content: "删除" + conditions.name + "属性失败！" + b.msg
					})
				})
			})
		},
		callback: function(a, b) {
			var c = $("#grid").data("gridData");
			c || (c = {}, $("#grid").data("gridData", c)), c[a.id] = a, a.parentId && (c[a.id].parentName = c[a.parentId].name), "add" != b ? ($("#grid").jqGrid("setRowData", a.id, a), handle.dialog.close()) : ($("#grid").jqGrid("addRowData", a.id, a, "last"), $("#category").val("")), $("#grid").setGridParam({
				postData: conditions
			}).trigger("reloadGrid")
		}
	};
initDom(), initEvent(), initGrid();