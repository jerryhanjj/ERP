function initTree() {
	myTree.init($("#tree"), {
		defaultClass: "innerTree",
		showRoot: !0,
		rootTxt: "计量单位组"
	}, {
		callback: {
			beforeClick: function(a, b) {
				$("#group").data("id", b.id).html(b.id ? b.name : ""), $("#grid").jqGrid("setGridParam", {
					postData: {
						unitTypeId: b.id
					}
				}).jqGrid(b.id ? "showCol" : "hideCol", "rate").trigger("reloadGrid")
			}
		}
	})
}
function initEvent() {
	$("#btn-add").click(function(a) {
		a.preventDefault(), Business.verifyRight("UNIT_ADD") && handle.operate("add")
	}), $("#grid").on("click", ".operating .ui-icon-pencil", function(a) {
		if (a.preventDefault(), Business.verifyRight("UNIT_UPDATE")) {
			var b = $(this).parent().data("id");
			handle.operate("edit", b)
		}
	}), $("#grid").on("click", ".operating .ui-icon-trash", function(a) {
		if (a.preventDefault(), Business.verifyRight("UNIT_DELETE")) {
			var b = $(this).parent().data("id");
			handle.del(b)
		}
	}), $("#btn-refresh").click(function(a) {
		a.preventDefault(), $("#grid").trigger("reloadGrid")
	}), $("#hideTree").click(function(a) {
		a.preventDefault();
		var b = $(this),
			c = b.html();
		"&gt;&gt;" === c ? (b.html("&lt;&lt;"), ajustW = 0, $("#tree").hide(), Public.resizeGrid(ajustH, ajustW)) : (b.html("&gt;&gt;"), ajustW = 270, $("#tree").show(), Public.resizeGrid(ajustH, ajustW))
	}), $(window).resize(function() {
		Public.resizeGrid(ajustH, ajustW), $(".innerTree").height($("#tree").height() - 95)
	}), Public.setAutoHeight($("#tree")), $(".innerTree").height($("#tree").height() - 95)
}
function initGrid() {
	var a = Public.setGrid(ajustH, ajustW),
		b = [{
			name: "operate",
			label: "操作",
			width: 60,
			fixed: !0,
			align: "center",
			formatter: Public.operFmatter
		}, {
			name: "name",
			label: "名称",
			width: 200
		}, {
			name: "rate",
			label: "换算关系",
			width: 200,
			align: "center",
			hidden: !0,
			formatter: function(a, b, c) {
				return c.rate || "&#160;"
			}
		}, {
			name: "rate",
			label: "是否默认单位",
			width: 200,
			align: "center",
			hidden: !0,
			formatter: function(a, b, c) {
				return c["default"] ? "是" : "&#160;"
			}
		}];
	$("#grid").jqGrid({
		url: "../basedata/unit?action=list&isDelete=2",
		datatype: "json",
		postData: {
			unitTypeId: 0
		},
		width: a.w,
		height: a.h,
		altRows: !0,
		gridview: !0,
		colModel: b,
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
				$("#grid").data("gridData", b)
			} else {
				var e = 250 == a.status ? "没有计量单位数据！" : "获取计量单位数据失败！" + a.msg;
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
function addHoverDom(a, b) {
	var c = $("#" + b.tId + "_span");
	if (0 != b.id) {
		if (b.editNameFlag || $("#editBtn_" + b.tId).length > 0 || $("#removeBtn_" + b.tId).length > 0) return;
		for (var d = "<span class='button edit' id='editBtn_" + b.tId + "' title='edit node' onfocus='this.blur();'></span>", e = "<span class='button remove' id='removeBtn_" + b.tId + "' title='remove node' onfocus='this.blur();'></span>", f = !0, g = 0; g < defaultPage.SYSTEM.unitInfo.length; g++) defaultPage.SYSTEM.unitInfo[g].unitTypeId == b.id && (f = !1);
		f && c.after(e), c.after(d);
		var h = $("#editBtn_" + b.tId);
		h && h.bind("click", function(a) {
			a.stopPropagation();
			var c = myTree.zTree;
			return groupManager("edit", {
				id: b.id,
				name: b.name
			}, function(a) {
				b.name = a.name, c.updateNode(b), $("#group").data("id") === b.id && $("#group").data("id", b.id).html(a.name || "")
			}), !1
		});
		var i = $("#removeBtn_" + b.tId);
		return i && i.bind("click", function(a) {
			a.stopPropagation();
			var c = myTree.zTree;
			return Public.ajaxPost("../basedata/unitType/delete?action=delete", {
				id: b.id
			}, function(a) {
				if (a && 200 == a.status) {
					parent.Public.tips({
						content: "删除成功！"
					}), c.removeNode(b);
					var d = c.getNodes();
					d.length > 0 && c.selectNode(d[0]);
					for (var e = 0; e < defaultPage.SYSTEM.unitGroupInfo.length; e++) defaultPage.SYSTEM.unitGroupInfo[e].id === b.id && defaultPage.SYSTEM.unitGroupInfo.splice(e, 1);
					$("#group").data("id") === b.id && ($("#group").data("id", 0).html(""), $("#grid").jqGrid("setGridParam", {
						postData: {
							unitTypeId: 0
						}
					}).trigger("reloadGrid"))
				} else parent.Public.tips({
					type: 1,
					content: "删除失败！" + a.msg
				})
			}), !1
		}), !1
	}
	if (!(b.editNameFlag || $("#addBtn_" + b.tId).length > 0)) {
		var j = "<span class='button add' id='addBtn_" + b.tId + "' title='add node' onfocus='this.blur();'></span>";
		c.after(j);
		var k = $("#addBtn_" + b.tId);
		k && k.bind("click", function(a) {
			a.stopPropagation();
			var c = myTree.zTree;
			return groupManager("add", {}, function(a) {
				var d = c.addNodes(b, {
					id: a.id,
					pId: b.id,
					name: a.name
				});
				c.selectNode(d[0]), $("#group").data("id", a.id).html(a.name || ""), $("#grid").jqGrid("setGridParam", {
					postData: {
						unitTypeId: a.id
					}
				}).clearGridData()
			}), !1
		})
	}
}
function removeHoverDom(a, b) {
	$("#addBtn_" + b.tId).unbind().remove(), $("#editBtn_" + b.tId).unbind().remove(), $("#removeBtn_" + b.tId).unbind().remove()
}
function groupManager(a, b, c) {
	title = "add" === a ? "新增" : "修改", parent.$.dialog({
		title: title + "计量单位组",
		content: "url:../settings/unitGroup_manage",
		data: {
			oper: a,
			callback: function(a, b, d) {
				c(a), d.close()
			},
			rowData: b
		},
		width: 400,
		height: 80,
		max: !1,
		min: !1,
		cache: !1,
		lock: !0
	})
}
var defaultPage = Public.getDefaultPage(),
	ajustH = 95,
	ajustW = 270,
	defaultPage = Public.getDefaultPage(),
	//siType = defaultPage.SYSTEM.siType,
	siType = 1,
	handle = {
		operate: function(a, b) {
			if ("add" == a) var c = "新增计量单位1111",
				d = {
					oper: a,
					callback: this.callback
				};
			else var c = "修改计量单位",
				d = {
					oper: a,
					rowData: $("#grid").data("gridData")[b],
					callback: this.callback
				};
			d.callbackForBasePage = {
				groupComboChange: function(a) {
					var b = a ? a.id : 0,
						c = myTree.zTree,
						d = c.getNodeByParam("id", b, null);
					c.selectNode(d);
					var e = $("#group"),
						f = e.data("id");
					f !== b && ($("#grid").jqGrid("setGridParam", {
						postData: {
							unitTypeId: b
						}
					}).jqGrid(b ? "showCol" : "hideCol", "rate").trigger("reloadGrid"), e.data("id", b).html(a ? a.name : ""))
				},
				addGroupCallback: function(a) {
					var b = $("#group");
					if (b && b.data("id", a.id).html(a.name || ""), myTree) {
						myTree = myTree.zTree;
						var c = myTree.addNodes(myTree.getNodeByParam("id", 0, null), {
							id: a.id,
							pId: 0,
							name: a.name
						});
						myTree.selectNode(c[0])
					}
					$("#grid").jqGrid("setGridParam", {
						postData: {
							unitTypeId: a.id
						}
					}).clearGridData()
				}
			}, $.dialog({
				title: c,
				content: "url:unit_manage",
				data: d,
				width: 400,
				height: 1 === siType ? 100 : 230,
				max: !1,
				min: !1,
				cache: !1,
				lock: !0
			})
		},
		del: function(a) {
			$("#grid").data("gridData")[a];
			$.dialog.confirm("删除的计量单位将不能恢复，请确认是否删除？", function() {
				Public.ajaxPost("../basedata/unit/delete?action=delete", {
					id: a
				}, function(b) {
					if (b && 200 == b.status) {
						parent.Public.tips({
							content: "删除计量单位成功！"
						}), $("#grid").jqGrid("delRowData", a);
						for (var c = 0; c < defaultPage.SYSTEM.unitInfo.length; c++) defaultPage.SYSTEM.unitInfo[c].id == a && defaultPage.SYSTEM.unitInfo.splice(c, 1)
					} else parent.Public.tips({
						type: 1,
						content: "删除计量单位失败！" + b.msg
					})
				})
			})
		},
		callback: function(a, b, c) {
			var d = $("#grid").data("gridData");
			if (d || (d = {}, $("#grid").data("gridData", d)), d[a.id] = a, "edit" == b) {
				var e = $("#grid").jqGrid("getRowData", a.id);
				e.name ? $("#grid").jqGrid("setRowData", a.id, a) : $("#grid").jqGrid("addRowData", a.id, a, "last"), c && c.api.close()
			} else $("#grid").jqGrid("addRowData", a.id, a, "last"), c && c.resetForm(a)
		}
	};
$(function() {
	initEvent(), initGrid(), initTree();
	var a = myTree.zTree.getNodes();
	a.length > 0 && (myTree.zTree.selectNode(a[0]), $("#group").data("id", 0)), 1 === siType && $("#hideTree").hide().trigger("click")
});
var myTree = {
	zTree: {},
	opts: {
		showRoot: !0,
		defaultClass: "",
		disExpandAll: !1,
		callback: "",
		rootTxt: "全部"
	},
	setting: {
		view: {
			addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom,
			dblClickExpand: !1,
			showLine: !0,
			selectedMulti: !1
		},
		edit: {
			enable: !0,
			editNameSelectAll: !0,
			showRemoveBtn: !1,
			showRenameBtn: !1,
			drag: {
				isCopy: !1,
				isMove: !1
			}
		},
		data: {
			simpleData: {
				enable: !0,
				idKey: "id",
				pIdKey: "parentId",
				rootPId: ""
			}
		},
		callback: {}
	},
	_getTemplate: function(a) {
		this.id = "tree" + parseInt(1e4 * Math.random());
		var b = "ztree";
		return a && a.defaultClass && (b += " " + a.defaultClass), '<ul id="' + this.id + '" class="' + b + '"></ul>'
	},
	init: function(a, b, c) {
		if (0 !== a.length) {
			var d = this;
			d.opts = $.extend(!0, d.opts, b), d.container = $(a), d.obj = $(d._getTemplate(b)), d.container.append(d.obj), c = $.extend(!0, d.setting, c);
			for (var e = [], f = 0; f < defaultPage.SYSTEM.unitGroupInfo.length; f++) {
				var g = defaultPage.SYSTEM.unitGroupInfo[f];
				g.parentId = 0, e.push(g)
			}
			return d._callback(e), d
		}
	},
	_callback: function(a) {
		var b = this,
			c = b.opts.callback;
		b.opts.showRoot && (a.unshift({
			name: b.opts.rootTxt,
			id: 0,
			isParent: !0
		}), b.obj.addClass("showRoot")), a.length && (b.zTree = $.fn.zTree.init(b.obj, b.setting, a), b.zTree.expandAll(!b.opts.disExpandAll), c && "function" == typeof c && c(b, a))
	}
};