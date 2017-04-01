function initDom() {
	function a(a, b, c) {
		conditions.typeNumber = a, conditions.name = b, c || $("#grid").setGridParam({
			postData: conditions
		}).trigger("reloadGrid"), parent.$("li.l-selected a").eq(0).text(conditions.name + "类别")
	}
	var b, c = $(".ui-tab").on("click", "li", function() {
		var b = $(this),
			c = b.data("id"),
			d = b.html(),
			e = conditions.typeNumber,
			f = conditions.name;
		return conditions.typeNumber = c, conditions.name = d, verifyRight(rightsAction.query) ? ($(".cur").removeClass("cur"), b.addClass("cur"), $("#custom-assisting").getCombo().selectByIndex(0, !1), void a(c, d)) : (conditions.typeNumber = e, void(conditions.name = f))
	}),
		d = [],
		e = {
			customertype: "客户",
			supplytype: "供应商",
			trade: "商品",
			paccttype: "支出",
			raccttype: "收入"
		};
	for (var f in e) d.push('<li data-id="' + f + '">' + e[f] + "</li>");
	c.append(d.join(""));
	var g = $("#assisting-category-select li[data-id=" + typeNumber + "]");
	1 == g.length ? (g.addClass("cur"), b = 0) : (b = ["number", typeNumber], $("#custom-assisting").parent().addClass("cur")), a(typeNumber, e[typeNumber], !0), $("#custom-assisting").combo({
		data: "../basedata/assist/getAssistType?action=getAssistType",
		text: "name",
		value: "number",
		width: 170,
		ajaxOptions: {
			formatData: function(a) {
				var a = a.data.items;
				a.unshift({
					number: "",
					name: "选择其他类别"
				});
				for (var b = 0, c = a.length; c > b; b++) a[b].name = a[b].name.replace("类别", ""), e[a[b].number] && (a.splice(b, 1), b--, c--);
				return a.length > 1 && $("#custom-assisting").parent().show(), a
			}
		},
		defaultSelected: b,
		defaultFlag: !1,
		callback: {
			onChange: function(b) {
				if (b.number) {
					var c = b.number,
						d = b.name;
					$("#assisting-category-select li").removeClass("cur"), $("#custom-assisting").parent().addClass("cur"), a(c, d)
				} else $("#custom-assisting").getCombo().selectByValue(conditions.typeNumber, !1)
			},
			beforeChange: function(a) {
				var b = a.number,
					c = a.name;
				return _oType = conditions.typeNumber, _oName = conditions.name, conditions.typeNumber = b, conditions.name = c, verifyRight(rightsAction.query) ? !0 : (conditions.typeNumber = _oType, conditions.name = _oName, !1)
			}
		}
	})
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
		conditions.skey = "输入类别名称查询" == b ? "" : b, $("#grid").setGridParam({
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
		label: "类别",
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
				parent.SYSTEM.categoryInfo = parent.SYSTEM.categoryInfo || {}, parent.SYSTEM.categoryInfo[conditions.typeNumber] = a.items, $("#grid").data("gridData", b)
			} else {
				var f = 250 == a.status ? "没有" + conditions.name + "类别数据！" : "获取" + conditions.name + "类别数据失败！" + a.msg;
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
function initValidator() {
	$("#manage-form").validate({
		rules: {
			category: {
				required: !0
			}
		},
		messages: {
			category: {
				required: "类别不能为空"
			}
		},
		errorClass: "valid-error"
	})
}
function postData(a) {
	if (!$("#manage-form").validate().form()) return void $("#manage-form").find("input.valid-error").eq(0).focus();
	var b = $.trim($("#category").val()),
		c = $.trim($("#ParentCategory").val()),
		d = a ? "update" : "add",
		e = c ? $("#ParentCategory").data("PID") : "";
	if (e === a) return void parent.parent.Public.tips({
		type: 2,
		content: "当前分类和上级分类不能相同！"
	});
	var f = {
		parentId: e,
		id: a,
		name: b
	},
		g = "add" == d ? "新增" + conditions.name + "类别" : "修改" + conditions.name + "类别";
	f.typeNumber = conditions.typeNumber, Public.ajaxPost("../basedata/assist/" + d, f, function(a) {
		200 == a.status ? (parent.parent.Public.tips({
			content: g + "成功！"
		}), handle.callback(a.data, d)) : parent.parent.Public.tips({
			type: 1,
			content: g + "失败！" + a.msg
		})
	})
}
function resetForm() {
	$("#manage-form").validate().resetForm(), $("#ParentCategory").val(""), $("#category").val("").focus().select()
}
function verifyRight(a) {
	var b = rightsType[conditions.typeNumber];
	if (!b) return !0;
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
	return Business.verifyRight(b += a)
}
var typeNumber, showParentCategory, url = "../basedata/assist?action=list&isDelete=2",
	urlParam = Public.urlParam();
urlParam.typeNumber && (typeNumber = urlParam.typeNumber);
var conditions = {
	typeNumber: typeNumber,
	skey: "",
	name: ""
},
	rightsType = {
		customertype: "BUTYPE",
		supplytype: "SUPPLYTYPE",
		trade: "TRADETYPE",
		raccttype: "RACCTTYPE",
		paccttype: "PACCTTYPE"
	},
	rightsAction = {
		query: "_QUERY",
		add: "_ADD",
		del: "_DELETE",
		update: "_UPDATE"
	},
	handle = {
		operate: function(a, b) {
			if ("add" == a) {
				var c = "新增" + conditions.name + "类别";
				({
					oper: a,
					callback: this.callback
				})
			} else {
				var c = "修改" + conditions.name + "类别";
				({
					oper: a,
					rowData: $("#grid").data("gridData")[b],
					callback: this.callback
				})
			}
			var d = ['<form id="manage-form" action="">', '<ul class="mod-form-rows manage-wrap" id="manager">', '<li class="row-item" style="position:relative; display:none;">', '<div class="label-wrap"><label for="ParentCategory">上级分类:</label></div>', '<div class="ctn-wrap" style="position:relative;"><input type="text" value="" class="ui-input" name="ParentCategory" id="ParentCategory" readonly></div>', '<div class="dn hideFeild"></div>', "</li>", '<li class="row-item">', '<div class="label-wrap"><label for="category">类别:</label></div>', '<div class="ctn-wrap"><input type="text" value="" class="ui-input" name="category" id="category"></div>', "</li>", "</ul>", "</form>"],
				e = 90;
			showParentCategory && (e = 150), this.dialog = $.dialog({
				title: c,
				content: d.join(""),
				width: 400,
				height: e,
				max: !1,
				min: !1,
				cache: !1,
				lock: !0,
				okVal: "确定",
				ok: function() {
					return postData(b), !1
				},
				cancelVal: "取消",
				cancel: function() {
					return !0
				},
				init: function() {
					var c = $(".hideFeild"),
						d = $("#ParentCategory"),
						e = $("#category");
					if (showParentCategory && (d.closest("li").show(), $("#ParentCategory").click(function() {
						c.show().data("hasInit") || (c.show().data("hasInit", !0), Public.zTree.init(c, {
							defaultClass: "ztreeDefault"
						}, {
							callback: {
								beforeClick: function(a, b) {
									d.val(b.name), d.data("PID", b.id), c.hide()
								}
							}
						}))
					}), $(".ui_dialog").click(function() {
						c.hide()
					}), $("#ParentCategory").closest(".row-item").click(function(a) {
						var b = a || window.event;
						b.stopPropagation ? b.stopPropagation() : window.event && (window.event.cancelBubble = !0)
					}), document.onclick = function() {
						c.hide()
					}), "add" != a) {
						var f = $("#grid").data("gridData")[b];
						e.val(f.name), d.val(f.parentName), d.data("PID", f.parentId)
					}
					initValidator()
				}
			})
		},
		del: function(a) {
			$.dialog.confirm("删除的" + conditions.name + "类别将不能恢复，请确认是否删除？", function() {
				Public.ajaxPost("../basedata/assist/delete?action=delete", {
					id: a,
					typeNumber: conditions.typeNumber
				}, function(b) {
					if (b && 200 == b.status) {
						parent.Public.tips({
							content: "删除" + conditions.name + "类别成功！"
						}), $("#grid").jqGrid("delRowData", a);
						for (var c = parent.SYSTEM.categoryInfo[conditions.typeNumber].length, d = 0; c > d; d++) parent.SYSTEM.categoryInfo[conditions.typeNumber][d].id === a && (parent.SYSTEM.categoryInfo[conditions.typeNumber].splice(d, 1), d--, c--)
					} else parent.Public.tips({
						type: 1,
						content: "删除" + conditions.name + "类别失败！" + b.msg
					})
				})
			})
		},
		callback: function(a, b) {
			var c = $("#grid").data("gridData");
			c || (c = {}, $("#grid").data("gridData", c));
			for (var d = parent.SYSTEM.categoryInfo[conditions.typeNumber].length, e = !0, f = 0; d > f; f++) parent.SYSTEM.categoryInfo[conditions.typeNumber][f].id === a.id && (parent.SYSTEM.categoryInfo[conditions.typeNumber][f] = a, e = !1);
			e && parent.SYSTEM.categoryInfo[conditions.typeNumber].push(a), c[a.id] = a, a.parentId && (c[a.id].parentName = c[a.parentId].name), "add" != b ? ($("#grid").jqGrid("setRowData", a.id, a), this.dialog.close()) : ($("#grid").jqGrid("addRowData", a.id, a, "last"), this.dialog.close()), $("#grid").setGridParam({
				postData: conditions
			}).trigger("reloadGrid")
		}
	};
initDom(), initEvent(), initGrid();



 