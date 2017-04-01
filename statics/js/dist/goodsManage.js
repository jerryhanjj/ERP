function init() {
	void 0 !== cRowId ? Public.ajaxPost("../basedata/inventory/query?action=query", {
		id: cRowId
	}, function(a) {
		200 === a.status ? (rowData = a.data, initField(), initEvent(), initGrid(rowData.propertys)) : parent.parent.Public.tips({
			type: 1,
			content: a.msg
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
			return $form.trigger("validate"), !1
		}
	}, {
		id: "cancel",
		name: a[1]
	})
}
function postCustomerData() {
	if ("add" == oper) {
		cancleGridEdit();
		var a = $("#name").val();
		Public.ajaxPost("../basedata/inventory/checkName?action=checkName", {
			name: a
		}, function(b) {
			-1 == b.status ? $.dialog.confirm('商品名称 "' + a + '" 已经存在！是否继续？', function() {
				postData()
			}) : postData()
		})
	} else postData()
}
function postData() {
	var a = "add" == oper ? "新增商品" : "修改商品",
		b = getCustomerData();
	if (b) {
		var c = {};
		c.skuAssistId = b.skuAssistId, c.skuClassId = 0, $itemList.find("input:checkbox").each(function() {
			var a = $(this).parent().text();
			this.checked && (c.skuName = c.skuName ? c.skuName + "+" + a : a)
		}), Public.ajaxPost("../basedata/inventory/" + ("add" == oper ? "add" : "update"), b, function(d) {
			if (200 == d.status) {
				if (parent.parent.Public.tips({
					content: a + "成功！"
				}), b.isWarranty && (d.data.safeDays = b.safeDays, d.data.advanceDay = b.advanceDay), SYSTEM.enableAssistingProp && d.data.skuClassId) {
					for (var e = !0, f = 0, g = SYSTEM.assistPropGroupInfo.length; g > f; f++) SYSTEM.assistPropGroupInfo[f].skuId === d.data.skuClassId && (e = !1);
					e && (c.skuId = d.data.skuClassId, SYSTEM.assistPropGroupInfo.push(c))
				}
				if (callback && "function" == typeof callback) {
					var h = getTempData(d.data);
					callback(h, oper, window)
				}
			} else parent.parent.Public.tips({
				type: 1,
				content: a + "失败！" + d.msg
			})
		})
	}
}
function getCustomerData() {
	var a = getEntriesData();
	if (a) {
		var b = {
			id: rowData.id,
			number: $.trim($("#number").val()),
			name: $.trim($("#name").val()),
			categoryId: categoryTree.getValue(),
			spec: $.trim($("#specs").val()),
			locationId: storageCombo.getValue(),
			locationName: 0 === storageCombo.getValue() ? "" : storageCombo.getText(),
			baseUnitId: unitCombo.getValue(),
			purPrice: Public.currencyToNum($("#purchasePrice").val()),
			salePrice: Public.currencyToNum($("#salePrice").val()),
			wholesalePrice: Public.currencyToNum($("#wholesalePrice").val()),
			vipPrice: Public.currencyToNum($("#vipPrice").val()),
			discountRate1: $.trim($("#discountRate1").val()),
			discountRate2: $.trim($("#discountRate2").val()),
			lowQty: $("#minInventory").val(),
			highQty: $("#maxInventory").val(),
			propertys: JSON.stringify(a),
			remark: $("#note").val() == $("#note")[0].defaultValue ? "" : $("#note").val(),
			barCode: $("#barCode").val()
		};
		return SYSTEM.enableStorage && (b.jianxing = jianxingCombo.getValue(), b.length = $("#length").val(), b.width = $("#width").val(), b.height = $("#height").val(), b.weight = $("#weight").val()), SYSTEM.enableAssistingProp && $itemList.find("input:checkbox").each(function() {
			this.checked && (b.skuAssistId = b.skuAssistId ? b.skuAssistId + "," + this.id : this.id)
		}), SYSTEM.ISSERNUM && (b.isSerNum = $isSerNum[0].checked ? 1 : 0), SYSTEM.ISWARRANTY && (b.isWarranty = $isWarranty[0].checked ? 1 : 0, b.isWarranty && (b.safeDays = $safeDays.val(), b.advanceDay = $advanceDay.val())), "edit" == oper && (b.deleteRow = JSON.stringify(deleteRow)), b
	}
}
function hasEntriesData(a) {
	for (var b = $grid.jqGrid("getDataIDs"), c = 0, d = b.length; d > c; c++) {
		var e = b[c],
			f = $grid.jqGrid("getRowData", e),
			g = $("#" + e).data("storageInfo"),
			h = !1;
		switch (a) {
		case "checkQty":
			"" != f.quantity || (h = !0);
			break;
		case "checkSafeDays":
			"" != f.safeDays || (h = !0);
			break;
		default:
			g && "" != f.quantity || (h = !0)
		}
		if (h) break;
		return !0
	}
	return !1
}
function getEntriesData() {
	var a = [],
		b = $grid.jqGrid("getDataIDs");
	cancleGridEdit();
	for (var c = 0, d = b.length; d > c; c++) {
		var e, f = b[c],
			g = $grid.jqGrid("getRowData", f),
			h = $("#" + f).data("storageInfo");
		if (!h || "" == g.quantity || "" == g.unitCost || "" == g.amount) {
			if (!h) break;
			if ("" == g.quantity) return defaultPage.Public.tips({
				type: 2,
				content: "初期数量不能为空！"
			}), void $grid.jqGrid("editCellByColName", f, "quantity")
		}
		if (e = {
			locationId: h.id,
			quantity: g.quantity,
			unitCost: Public.currencyToNum(g.unitCost),
			amount: Public.currencyToNum(g.amount),
			batch: "",
			prodDate: "",
			safeDays: "",
			validDate: ""
		}, SYSTEM.enableAssistingProp && (e.skuId = h.skuId || -1, e.skuName = h.skuName || ""), SYSTEM.ISSERNUM && (e.serNum = $("#" + f).data("serNumInfo")), SYSTEM.ISWARRANTY && $isWarranty[0].checked) {
			if (!g.batch && Number($safeDays.val()) <= 0) return defaultPage.Public.tips({
				type: 2,
				content: "初期批次不能为空！"
			}), void $grid.jqGrid("editCellByColName", f, "batch");
			if (e.batch = g.batch, Number($safeDays.val()) > 0) {
				if (!g.prodDate) return defaultPage.Public.tips({
					type: 2,
					content: "初期生产日期不能为空！"
				}), void $grid.jqGrid("editCellByColName", f, "prodDate");
				$.extend(!0, e, {
					prodDate: g.prodDate,
					safeDays: g.safeDays,
					validDate: g.validDate
				})
			}
		}
		e.id = "edit" == oper && -1 != $.inArray(f, propertysIds) ? f : 0, a.push(e)
	}
	return a
}
function getTempData(a) {
	var b, c, d, e, f = 0,
		g = 0,
		h = a.propertys;
	c = categoryTree.getText() || "", unitData[a.baseUnitId] && (d = unitData[a.baseUnitId].name || "");
	for (var i = 0; i < h.length; i++) h[i].quantity && (f += h[i].quantity), h[i].amount && (g += h[i].amount);
	return f && g && (e = g / f), b = $.extend({}, a, {
		categoryName: c,
		unitName: d,
		quantity: f,
		unitCost: e,
		amount: g
	})
}
function initField() {
	$("#note").placeholder(), "edit" == oper ? ($("#number").val(rowData.number), $("#name").val(rowData.name), $category.data("defItem", rowData.categoryId), $("#specs").val(rowData.spec), $("#storage").data("defItem", rowData.locationId), $("#unit").data("defItem", ["id", rowData.baseUnitId]), void 0 != rowData.purPrice && $("#purchasePrice").val(Public.numToCurrency(rowData.purPrice, pricePlaces)), void 0 != rowData.salePrice && ($("#salePrice").val(Public.numToCurrency(rowData.salePrice, pricePlaces)), $("#wholesalePrice").val(Public.numToCurrency(rowData.wholesalePrice, pricePlaces)), $("#vipPrice").val(Public.numToCurrency(rowData.vipPrice, pricePlaces)), $("#discountRate1").val(rowData.discountRate1), $("#discountRate2").val(rowData.discountRate2)), $("#minInventory").val(rowData.lowQty), $("#maxInventory").val(rowData.highQty), rowData.remark && $("#note").val(rowData.remark), $("#barCode").val(rowData.barCode), $("#length").val(rowData.length), $("#width").val(rowData.width), $("#height").val(rowData.height), $("#weight").val(rowData.weight), rowData.isSerNum && ($isSerNum[0].checked = !0), rowData.isWarranty && ($isWarranty[0].checked = !0, $(".isWarrantyIn").show(), $safeDays.val(rowData.safeDays), $advanceDay.val(rowData.advanceDay))) : $("#storage").data("defItem", 0), api.opener.parent.SYSTEM.isAdmin || (rights.AMOUNT_INAMOUNT || $("#purchasePrice").closest("li").hide(), rights.AMOUNT_OUTAMOUNT || ($("#salePrice").closest("li").hide(), $("#wholesalePrice").closest("li").hide(), $("#vipPrice").closest("li").hide(), $("#discountRate1").closest("li").hide(), $("#discountRate2").closest("li").hide())), SYSTEM.enableStorage && ($(".manage-wrapper").parent().addClass("hasJDStorage"), $("#barCode").closest("li").show()), SYSTEM.enableAssistingProp && ($(".prop-wrap").show().on("click", "input", function(a) {
		hasEntriesData() && (a.preventDefault(), defaultPage.Public.tips({
			type: 2,
			content: "设置了期初，不能修改该属性！"
		}))
	}), initSkuField()), SYSTEM.ISSERNUM && ($isSerNum.parent().show(), $isSerNum.click(function(a) {
		hasEntriesData("checkQty") && (a.preventDefault(), defaultPage.Public.tips({
			type: 2,
			content: "期初中设置了数量的分录，不能修改该属性！"
		}))
	})), SYSTEM.ISWARRANTY && ($(".qur-wrap").show(), $isWarranty.click(function(a) {
		hasEntriesData("checkSafeDays") ? (a.preventDefault(), defaultPage.Public.tips({
			type: 2,
			content: "期初中设置了保质期的分录，不能修改该属性！"
		})) : ($(".isWarrantyIn").toggle(), this.checked ? $grid.jqGrid("showCol", "batch") : $grid.jqGrid("hideCol", "batch"))
	}), $safeDays.blur(function() {
		var a = $.trim($(this).val());
		Number(a) > 0 ? $.each(["prodDate", "safeDays", "validDate"], function(a, b) {
			$grid.jqGrid("showCol", b)
		}) : $.each(["prodDate", "safeDays", "validDate"], function(a, b) {
			$grid.jqGrid("hideCol", b)
		})
	}))
}
function initSkuField() {
	var a = [];
	if (SYSTEM.assistPropTypeInfo) {
		var b = {};
		if ("edit" == oper) for (var c = 0, d = SYSTEM.assistPropGroupInfo.length; d > c; c++) if (SYSTEM.assistPropGroupInfo[c].skuId === rowData.skuClassId) for (var e = SYSTEM.assistPropGroupInfo[c].skuAssistId.split(","), c = 0, d = e.length; d > c; c++) b[e[c]] = !0;
		for (var c = 0, d = SYSTEM.assistPropTypeInfo.length; d > c; c++) {
			var f = SYSTEM.assistPropTypeInfo[c],
				g = b[f.id] ? "checked" : "";
			a.push('<label><input type="checkbox" id="' + f.id + '" ' + g + ">" + f.name + "</label>")
		}
	}
	a.push('<label id="createSku">+</label>'), $itemList.html(a.join(""))
}
function initEvent() {
	var a = /[^\\<\\>\\&\\\\\']+/;
	Public.limitInput($("#number"), a), $("#name").blur(function() {});
	var b = {
		width: 200,
		inputWidth: 145,
		defaultSelectValue: rowData.categoryId || "",
		showRoot: !1
	};
	categoryTree = Public.categoryTree($category, b), $("#specs").blur(function() {
		var a = $.trim(this.value);
		"" == a || "edit" == oper && a == rowData.spec || Public.ajaxPost("../basedata/inventory/checkSpec?action=checkSpec", {
			spec: a
		}, function(b) {
			-1 == b.status && parent.parent.Public.tips({
				type: 2,
				content: '规格型号 "' + a + '" 已经存在！'
			})
		})
	}), THISPAGE.cellPikaday = new Pikaday({
		field: $(".dateAuto")[0],
		editable: !1
	}), storageCombo = $("#storage").combo({
		data: function() {
			for (var a = Public.getDefaultPage(), b = [], c = 0; c < a.SYSTEM.storageInfo.length; c++) {
				var d = a.SYSTEM.storageInfo[c];
				d["delete"] || b.push(d)
			}
			return b
		},
		value: "id",
		text: "name",
		width: comboWidth,
		defaultSelected: 0,
		cache: !1,
		editable: !1,
		emptyOptions: !0,
		extraListHtml: '<a href="#" class="quick-add-link" onclick="addStorage();return false;"><i class="ui-icon-add"></i>新增</a>'
	}).getCombo(), storageCombo.selectByValue($("#storage").data("defItem")), unitCombo = $("#unit").combo({
		data: getBaseUnit(),
		value: "id",
		text: "name",
		formatText: function(a) {
			if (a.unitTypeId) {
				for (var b = 0; b < SYSTEM.unitGroupInfo.length; b++) if (a.unitTypeId === SYSTEM.unitGroupInfo[b].id) return a.name + "(" + SYSTEM.unitGroupInfo[b].name + ")";
				return a.name + "_"
			}
			return a.name
		},
		width: comboWidth,
		defaultSelected: $("#unit").data("defItem") || 0,
		extraListHtml: '<a href="#" class="quick-add-link" onclick="addUnit();return false;"><i class="ui-icon-add"></i>新增</a>'
	}).getCombo(), $(".money").keypress(Public.numerical).focus(function() {
		var a = $(this);
		this.value = Public.currencyToNum(this.value), setTimeout(function() {
			a.select()
		}, 10)
	}).blur(function() {
		this.value = Public.numToCurrency(this.value, pricePlaces).replace("-", "")
	}), $(".rate").keypress(Public.numerical).focus(function() {
		var a = $(this);
		setTimeout(function() {
			a.select()
		}, 10)
	}), $("#minInventory, #maxInventory").keypress(Public.numerical), gridStoCombo = Business.storageCombo($(".storageAuto"), {
		data: function() {
			for (var a = Public.getDefaultPage(), b = [], c = 0; c < a.SYSTEM.storageInfo.length; c++) {
				var d = a.SYSTEM.storageInfo[c];
				d["delete"] || b.push(d)
			}
			return b
		},
		callback: {
			onChange: function(a) {
				var b = this.input.parents("tr"),
					c = b.data("storageInfo") || {};
				if (a) {
					if (a.id != c.id) if (SYSTEM.enableAssistingProp) {
						var d = "",
							e = "";
						if ($itemList.find("input:checkbox").each(function() {
							if (this.checked) {
								d = d ? d + "," + this.id : this.id;
								var a = $(this).parent().text();
								e = e ? e + "+" + a : a
							}
						}), d) {
							var f = {};
							$grid.jqGrid("restoreCell", curRow, curCol);
							for (var g = 0, h = SYSTEM.assistPropGroupInfo.length; h > g; g++) SYSTEM.assistPropGroupInfo[g].skuAssistId === d && (f = SYSTEM.assistPropGroupInfo[g]);
							var i = function(b) {
									parent.$.dialog({
										width: 470,
										height: 400,
										title: "选择商品的属性",
										content: "url:../settings/assistingProp_batch",
										data: {
											skey: "",
											skuClassId: b,
											callback: function(b, c) {
												for (var d = THISPAGE.curID, e = THISPAGE.newId, f = 0, g = b.length; g > f; f++) {
													var h = d || e,
														i = b[f];
													if (d) {
														$("#" + d).data("storageInfo", null);
														var j = $grid.jqGrid("setRowData", Number(d), {})
													} else {
														var j = $grid.jqGrid("addRowData", Number(e), {}, "last");
														e++
													}
													var k = $.extend(!0, {}, a);
													k.locationName = k.name, k.quantity = i.qty, k.skuName = i.skuName, k.skuId = i.skuId, k.unitCost = 0, k.amount = 0, j && $("#" + h).data("storageInfo", k), $grid.jqGrid("setRowData", h, k), curRow && curRow++;
													var l = $("#" + d).next();
													d = l.length > 0 ? $("#" + d).next().attr("id") : ""
												}
												"" === d && ($grid.jqGrid("addRowData", e, {}, "last"), THISPAGE.newId = e + 1), setTimeout(function() {
													$grid.jqGrid("editCell", curRow, 2, !0)
												}, 10), setGridFooter(), c.close()
											}
										},
										init: function() {},
										lock: !0,
										ok: !1,
										cancle: !1
									})
								};
							if (f.skuId) i(f.skuId);
							else {
								var j = {
									skuClassId: 0,
									skuName: e,
									skuAssistId: d
								};
								Public.ajaxGet("../basedata/assistSku/add?action=add", j, function(a) {
									200 === a.status ? (j.skuId = a.data.skuId, SYSTEM.assistPropGroupInfo.push(j), i(j.skuId)) : Public.tips({
										type: 1,
										content: a.msg
									})
								})
							}
						} else b.data("storageInfo", a)
					} else b.data("storageInfo", a)
				} else b.data("storageInfo", null)
			}
		}
	}), $(".grid-wrap").on("click", ".ui-icon-triangle-1-s", function() {
		$(this).siblings();
		setTimeout(function() {
			gridStoCombo.active = !0, gridStoCombo.doQuery()
		}, 10)
	}), $("#tab").find("li").each(function(a) {
		var b = $(this),
			c = $(".manage-wrapper");
		b.click(function() {
			b.addClass("cur").siblings().removeClass("cur"), $(c[a]).show().siblings(".manage-wrapper").hide()
		})
	}), $(document).bind("click.cancel", function(a) {
		!$(a.target).closest(".ui-jqgrid-bdiv").length > 0 && !$(a.target).closest(".pika-single").length > 0 && null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null)
	}), $("#createSku").click(function() {
		if (Business.verifyRight("FZSX_ADD")) {
			var a = function() {
					var a = $.trim($("#assistingName").val());
					a && Public.ajaxPost("../basedata/assistType/add?action=add", {
						name: a
					}, function(a) {
						200 == a.status ? (defaultPage.Public.tips({
							content: "保存成功！"
						}), $("#assistingName").val("").focus(), defaultPage.SYSTEM.assistPropTypeInfo.push(a.data), initSkuField()) : defaultPage.Public.tips({
							type: 1,
							content: a.msg
						})
					})
				},
				b = ['<div class="manage-wrap assisting-manage" id="manage-wrap">', '<form action="#" id="manage-form">', '<ul class="mod-form-rows">', '<li class="row-item">', '<div class="label-wrap fl">', '<label for="assistingName">名称：</label>', "</div>", '<div class="ctn-wrap fl">', '<input type="text" id="assistingName" name="assistingName" class="ui-input" value="" />', "</div>", "</li>", "</ul>", "</form>", "<div>"].join("");
			manageDialog = $.dialog({
				title: "新增分类",
				width: 320,
				height: 100,
				content: b,
				min: !1,
				max: !1,
				lock: !1,
				init: function() {
					$("#assistingName").on("keypress", function(b) {
						return "13" == b.keyCode ? (b.stopPropagation(), a(), !1) : void 0
					}).focus()
				},
				ok: function() {
					return a(), !1
				}
			})
		}
	}), initValidator(), bindEventForEnterKey(), $(".grid-wrap").on("click", ".ui-icon-plus", function() {
		var a = $(this).parent().data("id"),
			b = ($("#grid tbody tr").length, {
				id: "num_" + THISPAGE.newId
			}),
			c = $("#grid").jqGrid("addRowData", "num_" + THISPAGE.newId, b, "before", a);
		c && ($(this).parents("td").removeAttr("class"), $(this).parents("tr").removeClass("selected-row ui-state-hover"), $("#grid").jqGrid("resetSelection"), THISPAGE.newId++)
	}), $(".grid-wrap").on("click", ".ui-icon-trash", function() {
		if (2 === $("#grid tbody tr").length) return parent.parent.Public.tips({
			type: 2,
			content: "至少保留一条分录！"
		}), !1;
		var a = $(this).parent().data("id"),
			b = $("#grid").jqGrid("delRowData", a);
		b && (Number(a) > 0 && deleteRow.push(a), setGridFooter())
	}), SYSTEM.enableStorage && (jianxingCombo = $("#jianxing").combo({
		data: [{
			id: "0",
			name: "免费"
		}, {
			id: "1",
			name: "超大件"
		}, {
			id: "2",
			name: "超大件半件"
		}, {
			id: "3",
			name: "大件"
		}, {
			id: "4",
			name: "大件半件"
		}, {
			id: "5",
			name: "中件"
		}, {
			id: "6",
			name: "中件半件"
		}, {
			id: "7",
			name: "小件"
		}, {
			id: "8",
			name: "超小件"
		}],
		value: "id",
		text: "name",
		width: comboWidth,
		defaultSelected: rowData.jianxing || void 0,
		editable: !1
	}).getCombo()), $("#itemList").on("click", "input", function() {
		var a = $(this),
			b = a.closest("div").find("input:checked");
		b.length >= 5 ? (a.closest("div").find("input").attr("disabled", !0), b.attr("disabled", !1), parent.parent.Public.tips({
			content: "辅助属性不能多于5个！"
		})) : a.closest("div").find("input").attr("disabled", !1)
	})
}
function addStorage() {
	parent.$.dialog({
		title: "新增仓库",
		content: "url:../settings/storage_manage",
		data: {
			oper: "add",
			callback: function(a, b, c) {
				Public.ajaxPost("../basedata/invlocation?action=list", {}, function(b) {
					if (b && 200 == b.status) {
						var c = b.data.rows;
						parent.parent.SYSTEM.storageInfo = c
					} else {
						var c = [];
						parent.parent.Public.tips({
							type: 1,
							content: "获取仓库信息失败！" + b.msg
						})
					}
					storageCombo.loadData(c, "-1", !1), storageCombo.selectByValue(a.id)
				}), c && c.api.close()
			}
		},
		width: 400,
		height: 160,
		max: !1,
		min: !1,
		cache: !1
	})
}
function addUnit() {
	parent.$.dialog({
		title: "新增计量单位",
		content: "url:../settings/unit_manage",
		data: {
			oper: "add",
			callback: function(a, b, c) {
				unitCombo.loadData(getBaseUnit, ["id", a.id]), c && c.api.close()
			}
		},
		width: 400,
		height: 1 === siType ? 100 : 230,
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
	function b() {
		var a = $(".storageAuto")[0];
		return a
	}
	function c(a, b, c) {
		if ("get" === b) {
			if ("" !== $(".storageAuto").getCombo().getValue()) return $(a).val();
			var d = $(a).parents("tr");
			return d.removeData("storageInfo"), ""
		}
		"set" === b && $("input", a).val(c)
	}
	function d() {
		$("#initCombo").append($(".storageAuto").val(""))
	}
	function e() {
		var a = $(".dateAuto")[0];
		return a
	}
	function f(a, b, c) {
		return "get" === b ? a.val() : void("set" === b && $("input", a).val(c))
	}
	function g() {
		$("#initCombo").append($(".dateAuto").val(""))
	}
	function h(a, b) {
		if (a > 0) {
			var c = $grid.jqGrid("getCell", b.rowId, "prodDate");
			if (c) {
				var d = c.split("-");
				d.length > 0 && (c = new Date(d[0], d[1] - 1, d[2]), c.addDays(Number(a)), $grid.jqGrid("setCell", b.rowId, "validDate", c.format()))
			}
		}
		return a || "&#160;"
	}
	a || (a = []);
	var i = 4;
	if (a.length < i) for (var j = i - a.length, k = 0; j > k; k++) a.push({
		id: "num_" + (i - k)
	});
	else THISPAGE.newId = a.length + 1;
	var l = api.opener.parent.SYSTEM.rights,
		m = !(api.opener.parent.SYSTEM.isAdmin || l.AMOUNT_COSTAMOUNT),
		n = $(".manage-wrap").width() - 2;
	$grid.jqGrid({
		data: a,
		datatype: "clientSide",
		width: n,
		height: 132,
		rownumbers: !0,
		gridview: !0,
		onselectrow: !1,
		colModel: [{
			name: "operating",
			label: " ",
			width: 40,
			fixed: !0,
			formatter: Public.billsOper,
			align: "center",
			hidden: rowData["delete"] ? !0 : !1
		}, {
			name: "locationName",
			label: "仓库",
			width: 120,
			title: !1,
			editable: !0,
			edittype: "custom",
			edittype: "custom",
			editoptions: {
				custom_element: b,
				custom_value: c,
				handle: d,
				trigger: "ui-icon-triangle-1-s"
			}
		}, {
			name: "skuId",
			label: "属性ID",
			hidden: !0
		}, {
			name: "skuName",
			label: "属性",
			width: 100,
			classes: "ui-ellipsis",
			hidden: !SYSTEM.enableAssistingProp,
			formatter: function(a, b, c) {
				if (!a && c.skuId) {
					if (tempAssistPropGroupInfo[c.skuId]) return tempAssistPropGroupInfo[c.skuId].skuName;
					for (var d = 0, e = SYSTEM.assistPropGroupInfo.length; e > d; d++) {
						var f = SYSTEM.assistPropGroupInfo[d];
						if (tempAssistPropGroupInfo[f.skuId] = f, f.skuId == c.skuId) return f.skuName
					}
				}
				return a || "&#160;"
			}
		}, {
			name: "batch",
			label: "批次",
			width: 90,
			hidden: !(SYSTEM.ISWARRANTY && rowData.isWarranty),
			title: !1,
			editable: !0,
			align: "left"
		}, {
			name: "prodDate",
			label: "生产日期",
			width: 90,
			hidden: !(SYSTEM.ISWARRANTY && rowData.isWarranty),
			title: !1,
			editable: !0,
			edittype: "custom",
			edittype: "custom",
			editoptions: {
				custom_element: e,
				custom_value: f,
				handle: g
			}
		}, {
			name: "safeDays",
			label: "保质期(天)",
			width: 90,
			hidden: !(SYSTEM.ISWARRANTY && rowData.isWarranty),
			title: !1,
			align: "left",
			formatter: h
		}, {
			name: "validDate",
			label: "有效期至",
			width: 90,
			hidden: !(SYSTEM.ISWARRANTY && rowData.isWarranty),
			title: !1,
			align: "left"
		}, {
			name: "quantity",
			label: "期初数量",
			width: 90,
			title: !1,
			formatter: "number",
			formatoptions: {
				decimalPlaces: qtyPlaces
			},
			editable: !0,
			align: "right"
		}, {
			name: "unitCost",
			label: "单位成本",
			width: 90,
			title: !1,
			formatter: "currency",
			formatoptions: {
				showZero: !0,
				decimalPlaces: pricePlaces
			},
			editable: !0,
			align: "right",
			hidden: m
		}, {
			name: "amount",
			label: "期初总价",
			width: 90,
			title: !1,
			formatter: "currency",
			formatoptions: {
				showZero: !0,
				decimalPlaces: amountPlaces
			},
			align: "right",
			hidden: m
		}],
		cmTemplate: {
			sortable: !1
		},
		shrinkToFit: !1,
		forceFit: !0,
		cellEdit: rowData["delete"] ? !1 : !0,
		cellsubmit: "clientArray",
		rowNum: 1e4,
		localReader: {
			root: "items",
			records: "records",
			repeatitems: !0,
			id: "id"
		},
		footerrow: !0,
		loadComplete: function() {},
		gridComplete: function() {
			if ("add" != oper) {
				$grid.footerData("set", {
					locationName: "合计:",
					quantity: rowData.quantity,
					amount: rowData.amount
				}), propertysIds = [];
				for (var b, c = 0; c < a.length; c++) b = a[c], $.isNumeric(b.id) && (propertysIds.push(b.id + ""), $("#" + b.id).data("storageInfo", {
					id: b.locationId,
					name: b.locationName,
					skuId: b.skuId,
					skuName: b.skuName
				}).data("serNumInfo", b.invSerNumList))
			}
		},
		afterEditCell: function(a, b, c, d, e) {
			switch (b) {
			case "locationName":
				$("#" + d + "_locationName", "#grid").val(c), THISPAGE.curID = a;
				break;
			case "prodDate":
				c && THISPAGE.cellPikaday.setDate(c), THISPAGE.curID = a;
				break;
			case "quantity":
				if (SYSTEM.ISSERNUM && $isSerNum[0].checked) {
					$grid.jqGrid("restoreCell", d, e);
					var f = $("#" + a).data("serNumInfo"),
						g = $("#" + a).data("storageInfo"),
						h = $grid.jqGrid("getRowData", a),
						i = {
							width: 650,
							height: 400,
							title: "序列号录入",
							content: "url:../settings/serNumBatch",
							data: {
								serNumUsedList: f,
								creatable: !0,
								storageInfo: g,
								callback: function(b, c) {
									var d = !0;
									if ($("#" + a).siblings(".jqgrow").each(function(a) {
										var c = $(this).data("serNumInfo");
										if (c) for (var a = c.length - 1; a >= 0; a--) for (var e = b.length - 1; e >= 0; e--) b[e].serNum === c[a].serNum && (defaultPage.Public.tips({
											type: 2,
											content: "期初分录中已存在序列号：[" + b[e].serNum + "]"
										}), d = !1)
									}), d) {
										if (b.length) {
											$("#" + a).data("serNumInfo", b);
											var e, f = b.length,
												g = parseFloat(Public.currencyToNum(h.unitCost));
											isNaN(f) || isNaN(g) || (e = f * g), $grid.jqGrid("setRowData", a, {
												quantity: f,
												amount: e
											})
										}
										setGridFooter(), c.close()
									}
								}
							},
							init: function() {},
							lock: !0,
							ok: !1,
							cancle: !1
						};
					parent.$.dialog($.extend(!0, {}, i))
				}
			}
		},
		beforeSaveCell: function() {},
		afterSaveCell: function(a, b, c, d, e) {
			if ("quantity" == b || "unitCost" == b) {
				var f = floatCheck(c, b);
				if (f[0]) {
					var g, h = $grid.jqGrid("getRowData", a),
						i = parseFloat(h.quantity),
						j = parseFloat(Public.currencyToNum(h.unitCost));
					isNaN(i) || isNaN(j) || (g = i * j, $grid.jqGrid("setCell", a, "amount", g))
				} else parent.parent.Public.tips({
					type: 1,
					content: f[1]
				}), $grid.jqGrid("restoreCell", d, e);
				setGridFooter()
			}
			if ("prodDate" === b) {
				var k = $grid.jqGrid("getRowData", a),
					l = {};
				l.safeDays = k.safeDays || $safeDays.val(), !$.trim(c) && l.safeDays && (l.prodDate = (new Date).format());
				var m = c || l.prodDate;
				if (!m) return;
				var n = m.split("-");
				if (m = new Date(n[0], n[1] - 1, n[2]), "Invalid Date" === m.toString()) return defaultPage.Public.tips({
					type: 2,
					content: "日期格式错误！"
				}), void setTimeout(function() {
					$grid.jqGrid("editCellByColName", a, "prodDate")
				}, 10);
				m && $grid.jqGrid("setCell", a, "safeDays", l.safeDays)
			}
		}
	})
}
function floatCheck(a, b) {
	var c = /^[0-9\.]+$/,
		a = $.trim(a);
	return "quantity" == b ? b = "期初数量" : "unitCost" == b && (b = "单位成本"), c.test(a) ? [!0, ""] : "" == a ? [!1, b + "不能为空！（如果不需要该行数据，可以删除行）"] : [!1, "请填写正确的" + b]
}
function setGridFooter() {
	for (var a, b, c = $grid.jqGrid("getRowData"), d = 0, e = 0, f = 0; f < c.length; f++) a = c[f], a.quantity && (d += parseFloat(a.quantity)), a.amount && (e += parseFloat(a.amount));
	d && e && (b = e / d), $grid.footerData("set", {
		locationName: "合计",
		quantity: d || "&#160",
		amount: e || "&#160"
	})
}
function initValidator() {
	var a = /[^\\<\\>\\&\\\\\']+/;
	$form.validator({
		rules: {
			code: [a, "商品编号只能包含<,>,&,,'字符组成"],
			number: function(a) {
				var b = $(a).val();
				try {
					return b = Number(b), b ? ($(a).val(b), !0) : "字段不合法！请输入数值"
				} catch (c) {
					return "字段不合法！请输入数值"
				}
			},
			checkCode: function(a) {
				var b = $(a).val();
				return $.ajax({
					type: "POST",
					url: "../basedata/inventory/checkBarCode?action=checkBarCode",
					data: {
						barCode: b
					},
					dataType: "json",
					async: !1,
					success: function(a) {
						return a ? void(b = -1 == a.status ? rowData && rowData.barCode === b ? !0 : "商品条码已经存在！" : !0) : !1
					},
					error: function() {
						b = "远程数据校验失败！"
					}
				}), b
			},
			myRemote: function(a, b, c) {
				return c.old.value === a.value || $(a).data("tip") === !1 && a.value.length > 1 ? !0 : $.ajax({
					url: "../basedata/inventory/getNextNo?action=getNextNo",
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
			},
			checkInventory: function(a) {
				var b = $(a).val();
				if ("" !== b) {
					var c = Number($("#minInventory").val()),
						d = Number(b);
					if (c > d) return "最高库存不能小于最低库存"
				}
			}
		},
		messages: {
			required: "请填写{0}",
			checkCode: "{0}",
			name: "{0}"
		},
		fields: {
			number: {
				rule: "add" === oper ? "required; code; myRemote" : "required; code",
				timely: 3
			},
			name: "required",
			barCode: "code;checkCode;",
			maxInventory: "checkInventory",
			length: "number;",
			width: "number;",
			height: "number;",
			weight: "number;"
		},
		display: function(a) {
			return $(a).closest(".row-item").find("label").text()
		},
		valid: function() {
			postCustomerData()
		},
		ignore: ":hidden",
		theme: "yellow_bottom",
		timely: 1,
		stopOnError: !0
	})
}
function cancleGridEdit() {
	null !== curRow && null !== curCol && ($grid.jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null)
}
function resetForm(a) {
	var b = [{}, {}, {}, {}];
	$("#name").val(""), $("#specs").val(""), $("#purchasePrice").val(""), $("#salePrice").val(""), $("#wholesalePrice").val(""), $("#vipPrice").val(""), $("#discountRate1").val(""), $("#discountRate2").val(""), $("#lowQty").val(""), $("#highQty").val(""), $("#note").val(""), $grid.jqGrid("clearGridData", !0).jqGrid("setGridParam", {
		data: b
	}).trigger("reloadGrid"), gridStoCombo.collapse(), $("#number").val(Public.getSuggestNum(a.number)).focus().select(), $("#barCode").val(""), jianxingCombo && jianxingCombo.selectByIndex(0), $("#length").val(""), $("#width").val(""), $("#height").val(""), $("#weight").val("")
}
function getBaseUnit() {
	var a = {},
		b = [];
	b.push({
		id: 0,
		name: "（空）"
	});
	for (var c = 0; c < SYSTEM.unitInfo.length; c++) {
		var d = SYSTEM.unitInfo[c],
			e = d.unitTypeId || c;
		a[e] || (a[e] = []), a[e].push(d), unitData[d.id] = d
	}
	for (var f in a) {
		var g = a[f];
		if (1 == g.length) b.push(g[0]);
		else for (var c = 0; c < g.length; c++) g[c]["default"] && b.push(g[c])
	}
	return b
}
var curRow, curCol, curArrears, api = frameElement.api,
	oper = api.data.oper,
	cRowId = api.data.rowId,
	rowData = {},
	propertysIds = [],
	deleteRow = [],
	callback = api.data.callback,
	defaultPage = Public.getDefaultPage(),
	siType = defaultPage.SYSTEM.siType,
	categoryTree, storageCombo, unitCombo, gridStoCombo, jianxingCombo, comboWidth = 147,
	gridWidth = 970,
	$grid = $("#grid"),
	$itemList = $("#itemList"),
	$form = $("#manage-form"),
	$category = $("#category"),
	$isSerNum = $("#isSerNum"),
	$isWarranty = $("#isWarranty "),
	$safeDays = $("#safeDays"),
	$advanceDay = $("#advanceDay"),
	categoryData = {},
	unitData = {},
	tempAssistPropGroupInfo = {},
	SYSTEM = parent.parent.SYSTEM,
	qtyPlaces = Number(SYSTEM.qtyPlaces) || 4,
	pricePlaces = Number(SYSTEM.pricePlaces) || 4,
	amountPlaces = Number(SYSTEM.amountPlaces) || 2,
	format = {
		quantity: function(a) {
			var b = parseFloat(a);
			return isNaN(b) ? "&#160;" : a
		},
		money: function(a) {
			var a = Public.numToCurrency(a, pricePlaces);
			return a || "&#160;"
		}
	},
	THISPAGE = {
		newId: 5
	},
	rights = api.opener.parent.SYSTEM.rights;
initPopBtns(), init();