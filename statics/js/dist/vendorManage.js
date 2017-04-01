function init() {
	void 0 !== cRowId ? Public.ajaxPost("../basedata/contact/query?type=10&action=query", {
		id: cRowId
	}, function(a) {
		200 == a.status ? (rowData = a.data, initField(), initEvent(), initGrid(rowData.links)) : parent.$.dialog({
			title: "系统提示",
			content: "获取供应商数据失败，暂不能修改供应商，请稍候重试",
			icon: "alert.gif",
			max: !1,
			min: !1,
			cache: !1,
			lock: !0,
			ok: "确定",
			ok: function() {
				return !0
			},
			close: function() {
				api.close()
			}
		})
	}) : (initField(), initEvent(), initGrid())
}
function initPopBtns() {
	var a = "add" == oper ? ["保存", "关闭"] : ["确定", "取消"];
	api.button({
		id: "confirm",
		name: a[0],
		focus: !0,
		callback: function() {
			return cancleGridEdit(), $_form.trigger("validate"), !1
		}
	}, {
		id: "cancel",
		name: a[1]
	})
}
function initValidator() {
	$_form.validator({
		rules: {
			type: [/^[a-zA-Z0-9\-_]*$/, "编号只能由数字、字母、-或_等字符组成"],
			unique: function(a) {
				var b = $(a).val();
				return $.ajax({
					url: "/basedata/contact.do?action=checkName",
					type: "get",
					data: "name=" + b,
					dataType: "json",
					success: function(a) {
						return -1 != a.status ? !0 : void parent.parent.Public.tips({
							type: 2,
							content: "存在相同的客户名称！"
						})
					}
				})
			},
			myRemote: function(a, b, c) {
				return c.old.value === a.value || $(a).data("tip") === !1 && a.value.length > 1 ? !0 : $.ajax({
					url: "../basedata/contact/getNextNo?type=10",
					type: "post",
					data: "skey=" + a.value,
					dataType: "json",
					success: function(b) {
						if (b.data && b.data.number) {
							var c = a.value.length;
							a.value = b.data.number;
							var d = a.value.length;
							if (a.createTextRange) {
								var e = a.createTextRange();
								e.moveEnd("character", d), e.moveStart("character", c), e.select()
							} else a.setSelectionRange(c, d), a.focus();
							$(a).data("tip", !0)
						} else $(a).data("tip", !1)
					}
				})
			}
		},
		messages: {
			required: "请填写{0}"
		},
		fields: {
			number: {
				rule: "add" === oper ? "required; type; myRemote" : "required; type",
				timely: 3
			},
			name: "required;"
		},
		display: function(a) {
			return $(a).closest(".row-item").find("label").text()
		},
		valid: function() {
			var a = $.trim($("#name").val());
			Public.ajaxPost("../basedata/contact/checkname?type=10&action=checkName", {
				name: a,
				id: cRowId
			}, function(b) {
				-1 == b.status ? parent.$.dialog.confirm('供应商名称 "' + a + '" 已经存在！是否继续？', function() {
					postData()
				}, function() {}) : postData()
			})
		},
		ignore: ":hidden",
		theme: "yellow_bottom",
		timely: 1,
		stopOnError: !0
	})
}
function postData() {
	var a = "add" == oper ? "新增供应商" : "修改供应商",
		b = getData(),
		c = b.firstLink || {};
	delete b.firstLink, Public.ajaxPost("../basedata/contact/" + ("add" == oper ? "add" : "update")+"?type=10", b, function(d) {
		if (200 == d.status) {
			if (parent.parent.Public.tips({
				content: a + "成功！"
			}), callback && "function" == typeof callback) {
				var e = d.data.id;
				d = b, d.id = e, d.customerType = d.cCategoryName, d.contacter = c.linkName || "", d.mobile = c.linkMobile || "", d.telephone = c.linkPhone || "", d.linkIm = c.linkIm || "", callback(d, oper, window)
			}
		} else parent.parent.Public.tips({
			type: 1,
			content: a + "失败！" + d.msg
		})
	})
}
function getData() {
	var a = getEntriesData(),
		b = a.entriesData,
		c = {
			id: cRowId,
			number: $.trim($("#number").val()),
			name: $.trim($("#name").val()),
			cCategory: categoryCombo.getValue(),
			beginDate: $("#date").val(),
			amount: Public.currencyToNum($("#receiveFunds").val()),
			periodMoney: Public.currencyToNum($("#periodReceiveFunds").val()),
			linkMans: JSON.stringify(b),
			remark: $("#note").val() == $("#note")[0].defaultValue ? "" : $("#note").val(),
			taxRate: $("#taxRate").val()
		};
	return c.firstLink = a.firstLink, c
}
function getEntriesData() {
	for (var a = {}, b = [], c = $grid.jqGrid("getDataIDs"), d = !1, e = 0, f = c.length; f > e; e++) {
		var g, h = c[e],
			i = $grid.jqGrid("getRowData", h);
		if ("" == i.name) break;
		g = {
			linkName: i.name,
			linkMobile: i.mobile,
			linkPhone: i.phone,
			linkIm: i.im,
			linkFirst: "是" == i.first ? 1 : 0
		};
		var j = $("#" + h).data("addressInfo") || {};
		g.province = j.province, g.city = j.city, g.county = j.county, g.address = j.address, g.id = "edit" == oper && -1 != $.inArray(Number(h), linksIds) ? h : 0, "是" == i.first && (d = !0, a.firstLink = g), b.push(g)
	}
	return !d && b.length > 0 && (b[0].linkFirst = 1, a.firstLink = b[0]), a.entriesData = b, a
}
function initField() {
	if ($("#note").placeholder(), "edit" == oper) {
		if ($("#number").val(rowData.number), $("#name").val(rowData.name), $("#category").data("defItem", ["id", rowData.cCategory]), rowData.beginDate) {
			var a = new Date(rowData.beginDate),
				b = a.getFullYear(),
				c = 1 * a.getMonth() + 1,
				d = a.getDate();
			$("#date").val(b + "-" + c + "-" + d)
		}
		void 0 != rowData.amount && $("#receiveFunds").val(Public.numToCurrency(rowData.amount)), void 0 != rowData.periodMoney && $("#periodReceiveFunds").val(Public.numToCurrency(rowData.periodMoney)), rowData.remark && $("#note").val(rowData.remark), $("#taxRate").val(rowData.taxRate)
	} else $("#taxRate").val(17), $("#date").val(parent.parent.SYSTEM.startDate);
	api.opener.parent.SYSTEM.isAdmin || api.opener.parent.SYSTEM.rights.AMOUNT_INAMOUNT || ($("#receiveFunds").closest("li").hide(), $("#periodReceiveFunds").closest("li").hide())
}
function initEvent() {
	var a = "supplytype";
	categoryCombo = Business.categoryCombo($("#category"), {
		defaultSelected: $("#category").data("defItem") || void 0,
		editable: !0,
		trigger: !0,
		width: 210,
		ajaxOptions: {
			formatData: function(b) {
				categoryData = {};
				var c = Public.getDefaultPage();
				if (200 == b.status) {
					for (var d = 0; d < b.data.items.length; d++) {
						var e = b.data.items[d];
						categoryData[e.id] = e
					}
					return c.SYSTEM.categoryInfo = c.SYSTEM.categoryInfo || {}, c.SYSTEM.categoryInfo[a] = b.data.items, b.data.items.unshift({
						id: 0,
						name: "（空）"
					}), b.data.items
				}
				return []
			}
		}
	}, a);
	var b = $("#date");
	b.blur(function() {
		"" == b.val() && b.val(parent.parent.SYSTEM.startDate)
	}), b.datepicker({
		onClose: function() {
			var a = /^\d{4}-((0?[1-9])|(1[0-2]))-\d{1,2}/;
			a.test(b.val()) || b.val("")
		}
	}), $("#receiveFunds").keypress(Public.numerical).focus(function() {
		this.value = Public.currencyToNum(this.value), $(this).select()
	}).blur(function() {
		this.value = Public.numToCurrency(this.value)
	}), $("#periodReceiveFunds").keypress(Public.numerical).focus(function() {
		this.value = Public.currencyToNum(this.value), $(this).select()
	}).blur(function() {
		this.value = Public.numToCurrency(this.value)
	}), $("#taxRate").keypress(Public.numerical).focus(function() {
		this.value = Public.currencyToNum(this.value), $(this).select()
	}).blur(function() {
		this.value = this.value > 0 ? this.value : -1 * this.value, "" == this.value && (this.value = 0)
	}), $(".grid-wrap").on("click", ".ui-icon-ellipsis", function(a) {
		a.preventDefault();
		var b = $(this).siblings(),
			c = $(this).closest("tr"),
			d = c.data("addressInfo");
		parent.$.dialog({
			title: "联系地址",
			//content: "url:../settings/addressManage.jsp",
			content: "url:../settings/addressmanage",
			data: {
				rowData: d,
				callback: function(a, d) {
					if (a) {
						var e = {};
						e.province = a.province || "", e.city = a.city || "", e.county = a.area || "", e.address = a.address || "", b.val(e.province + e.city + e.county + e.address), c.data("addressInfo", e)
					}
					d.close()
				}
			},
			width: 640,
			height: 210,
			min: !1,
			max: !1,
			cache: !1,
			lock: !0
		})
	}), $(document).on("click.cancle", function(a) {
		var b = a.target || a.srcElement;
		!$(b).closest("#grid").length > 0 && cancleGridEdit()
	}), bindEventForEnterKey(), initValidator()
}
function addCategory() {
	Business.verifyRight("SUPPLYTYPE_ADD") && parent.$.dialog({
		title: "新增供应商类别",
		//content: "url:/settings/vendor-category-manage.jsp",
		content: "url:../settings/vendor_category_manage",
		data: {
			oper: "add",
			callback: function(a, b, c) {
				categoryCombo.loadData("../basedata/assist?action=list&typeNumber=supplytype", ["id", a.id]), c && c.api.close()
			}
		},
		width: 400,
		height: 100,
		max: !1,
		min: !1,
		cache: !1,
		lock: !1
	})
}
function bindEventForEnterKey() {
	Public.bindEnterSkip($("#base-form"), function() {
		$("#grid tr.jqgrow:eq(0) td:eq(0)").trigger("click")
	})
}
function initGrid(a) {
	if (a || (a = []), a.length < 3) for (var b = 3 - a.length, c = 0; b > c; c++) a.push({});
	a.push({}), $grid.jqGrid({
		data: a,
		datatype: "local",
		width: 598,
		gridview: !0,
		onselectrow: !1,
		colModel: [{
			name: "name",
			label: "联系人",
			width: 60,
			title: !1,
			editable: !0
		}, {
			name: "mobile",
			label: "手机",
			width: 80,
			title: !1,
			editable: !0
		}, {
			name: "phone",
			label: "座机",
			width: 80,
			title: !1,
			editable: !0
		}, {
			name: "im",
			label: "QQ/MSN",
			width: 82,
			title: !1,
			editable: !0
		}, {
			name: "addressStr",
			label: "联系地址",
			width: 140,
			title: !0,
			formatter: addressFmt,
			classes: "ui-ellipsis",
			editable: !0,
			edittype: "custom",
			editoptions: {
				custom_element: addressElem,
				custom_value: addressValue,
				handle: addressHandle,
				trigger: "ui-icon-ellipsis"
			}
		}, {
			name: "first",
			label: "首要联系人",
			width: 70,
			title: !1,
			formatter: isFirstFormate,
			editable: !0,
			edittype: "select",
			editoptions: {
				value: {
					1: "是",
					0: "否"
				}
			}
		}],
		cmTemplate: {
			sortable: !1
		},
		shrinkToFit: !0,
		forceFit: !0,
		cellEdit: !0,
		cellsubmit: "clientArray",
		localReader: {
			root: "items",
			records: "records",
			repeatitems: !0
		},
		loadComplete: function(a) {
			if ($grid.setGridHeight($grid.height() > 125 ? "125" : "auto"), $grid.setGridWidth(598), "add" != oper) {
				if (!a || !a.items) return void(linksIds = []);
				linksIds = [];
				for (var b = a.items, c = 0; c < b.length; c++) {
					var d = b[c];
					if (d.id) {
						linksIds.push(d.id);
						var e = {
							province: d.province,
							city: d.city,
							county: d.county,
							address: d.address
						};
						$("#" + d.id).data("addressInfo", e)
					}
				}
			}
		},
		afterEditCell: function(a, b, c) {
			$("#" + a).find("input").val(c)
		},
		afterSaveCell: function(a, b, c) {
			if ("first" == b && (c = "boolean" == typeof c ? c ? "1" : "0" : c, "1" === c)) for (var d = $grid.jqGrid("getDataIDs"), e = 0; e < d.length; e++) {
				var f = d[e];
				f != a && $grid.jqGrid("setCell", f, "first", "0")
			}
		}
	})
}
function addressFmt(a, b, c) {
	if (a) return a;
	var d = {};
	return d.province = c.province || "", d.city = c.city || "", d.county = c.county || "", d.address = c.address || "", $("#" + c.id).data("addressInfo", d), d.province + d.city + d.county + d.address
}
function addressElem() {
	var a = $(".address")[0];
	return a
}
function addressValue(a, b, c) {
	if ("get" === b) {
		var d = $.trim($(".address").val());
		return "" !== d ? d : ""
	}
	"set" === b && $("input", a).val(c)
}
function addressHandle() {
	$(".hideFile").append($(".address").val("").unbind("focus.once"))
}
function isFirstFormate(a) {
	return a = "boolean" == typeof a ? a ? "1" : "0" : a, "1" === a ? "是" : "&#160;"
}
function cancleGridEdit() {
	null !== curRow && null !== curCol && ($grid.jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null)
}
function resetForm(a) {
	var b = [{}, {}, {}, {}];
	$("#name").val(""), $("#date").val(""), $("#receiveFunds").val(""), $("#note").val(""), $("#taxRate").val(""), $("#periodReceiveFunds").val(""), $("#taxRate").val("17"), $grid.jqGrid("clearGridData").jqGrid("setGridParam", {
		data: b
	}).trigger("reloadGrid"), $("#number").val(Public.getSuggestNum(a.number)).focus().select()
}
var curRow, curCol, curArrears, api = frameElement.api,
	oper = api.data.oper,
	cRowId = api.data.rowId,
	rowData = {},
	linksIds = [],
	callback = api.data.callback,
	defaultPage = Public.getDefaultPage(),
	categoryCombo, categoryData = {},
	$grid = $("#grid"),
	$_form = $("#manage-form");
initPopBtns(), init();