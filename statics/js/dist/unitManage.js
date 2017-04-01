function initField() {
	if (groupCombo = $("#group").combo({
		data: function() {
			return defaultPage.SYSTEM.unitGroupInfo || []
		},
		value: "id",
		text: "name",
		width: 212,
		listHeight: 100,
		defaultSelected: 0,
		cache: !1,
		editable: !1,
		addOptions: {
			value: 0,
			text: "(空)"
		},
		callback: {
			onChange: function(a) {
				if (a) {
					for (var b = defaultPage.SYSTEM.unitInfo, c = !0, d = 0; d < b.length; d++) a.id == b[d].unitTypeId && (c = !1);
					c ? $("#rate").val(1).attr("disabled", "disabled").addClass("ui-input-dis") : $("#rate").val(1).removeAttr("disabled").removeClass("ui-input-dis")
				} else $("#rate").val("").attr("disabled", "disabled").addClass("ui-input-dis");
				isPostback && callbackForBasePage && callbackForBasePage.groupComboChange && callbackForBasePage.groupComboChange(a)
			}
		},
		extraListHtml: '<a href="#" class="quick-add-link" onclick="addGroup();return false;"><i class="ui-icon-add"></i>新增</a>'
	}).getCombo(), rowData.id) $("#name").val(rowData.name), rowData.unitTypeId && (groupCombo.selectByValue(rowData.unitTypeId), rowData["default"] && (groupCombo.disable(), $("#rate").attr("disabled", "disabled").addClass("ui-input-dis")), $("#rate").val(rowData.rate));
	else {
		var a = api.opener.$("#group"),
			b = a.data("id");
		groupCombo.selectByValue(b)
	}
}
function addGroup() {
	parent.$.dialog({
		title: "新增计量单位组",
		content: "url:../settings/unitGroup_manage",
		data: {
			oper: "add",
			callback: function(a, b, c) {
				groupCombo.loadData(function() {
					return defaultPage.SYSTEM.unitGroupInfo || []
				}, ["id", a.id]), callbackForBasePage && callbackForBasePage.addGroupCallback && callbackForBasePage.addGroupCallback(a), c.close()
			}
		},
		width: 400,
		height: 80,
		max: !1,
		min: !1,
		cache: !1,
		lock: !0
	})
}
function initEvent() {
	var a = $("#name");
	$("#manage-form").submit(function(a) {
		a.preventDefault(), postData()
	}), a.focus().select(), initValidator();
	var b, c = "0123456789.";
	c = c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), b = new RegExp("[" + c + "]"), Public.limitInput($("#rate"), b)
}
function initPopBtns() {
	var a = "add" == oper ? ["保存", "关闭"] : ["确定", "取消"];
	api.button({
		id: "confirm",
		name: a[0],
		focus: !0,
		callback: function() {
			return postData(), !1
		}
	}, {
		id: "cancel",
		name: a[1]
	})
}
function initValidator() {
	$("#manage-form").validate({
		rules: {
			name: {
				required: !0
			}
		},
		messages: {
			name: {
				required: "名称不能为空"
			}
		},
		errorClass: "valid-error"
	})
}
function postData() {
	if (!$("#manage-form").validate().form()) return void $("#manage-form").find("input.valid-error").eq(0).focus();
	var a = $.trim($("#name").val()),
		b = {
			id: rowData.id,
			name: a
		},
		c = "add" == oper ? "新增计量单位" : "修改计量单位",
		d = groupCombo.getValue();
	if (d) {
		var e = Number($("#rate").val());
		e > 0 && (b.unitTypeId = d, b.rate = e);
		for (var f = defaultPage.SYSTEM.unitInfo, g = !0, h = 0; h < f.length; h++)(d == f[h].unitTypeId || f[h]["default"]) && (g = !1);
		b["default"] = g
	}
	Public.ajaxPost("../basedata/unit/" + ("add" == oper ? "add" : "update"), b, function(a) {
		if (200 == a.status) {
			if (parent.parent.Public.tips({
				content: c + "成功！"
			}), "add" == oper) defaultPage.SYSTEM.unitInfo.push(a.data);
			else for (var b = 0; b < defaultPage.SYSTEM.unitInfo.length; b++) defaultPage.SYSTEM.unitInfo[b].id == rowData.id && (defaultPage.SYSTEM.unitInfo[b] = a.data);
			$("#rate").val(1).removeAttr("disabled").removeClass("ui-input-dis"), callback && "function" == typeof callback && callback(a.data, oper, window)
		} else parent.parent.Public.tips({
			type: 1,
			content: c + "失败！" + a.msg
		})
	})
}
function resetForm() {
	$("#manage-form").validate().resetForm(), $("#name").val("").focus().select()
}
var api = frameElement.api,
	oper = api.data.oper,
	rowData = api.data.rowData || {},
	callback = api.data.callback,
	groupCombo, defaultPage = Public.getDefaultPage(),
	//siType = defaultPage.SYSTEM.siType,
	siType = 1,
	isPostback = !1,
	callbackForBasePage = api.data.callbackForBasePage;
initPopBtns(), initField(), initEvent(), isPostback = !0, 1 === siType && $(".row-item:gt(0)").hide();

