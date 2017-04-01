function initField() {
	rowData.id && $("#name").val(rowData.name)
}
function initEvent() {
	$("#manage-form").submit(function(a) {
		a.preventDefault(), postData()
	}), $("#name").focus().select().on("keydown", function(a) {
		a.stopPropagation(), "13" == a.keyCode && (a.preventDefault(), postData())
	}), initValidator()
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
		b = rowData.id ? "update" : "add",
		c = {
			id: rowData.id,
			name: a
		},
		d = "add" == b ? "新增属性" : "修改属性";
	c.typeNumber = typeNumber, Public.ajaxPost("../basedata/assist/" + b, c, function(a) {
		if (200 == a.status) {
			defaultPage.Public.tips({
				content: d + "成功！"
			}), resetForm();
			var c = defaultPage.SYSTEM.assistPropInfo.length;
			if ("add" != b) for (var e = 0; c > e; e++) defaultPage.SYSTEM.assistPropInfo[e].typeNumber == typeNumber && defaultPage.SYSTEM.assistPropInfo[e].id == a.data.id && (defaultPage.SYSTEM.assistPropInfo[e] = a.data);
			else defaultPage.SYSTEM.assistPropInfo.push(a.data);
			callback(a.data, b)
		} else defaultPage.Public.tips({
			type: 1,
			content: d + "失败！" + a.msg
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
	typeNumber = api.data.typeNumber,
	defaultPage = Public.getDefaultPage();
initPopBtns(), initField(), initEvent();