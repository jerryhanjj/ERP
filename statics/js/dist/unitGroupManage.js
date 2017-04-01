function initField() {
	rowData.id && $("#name").val(rowData.name)
}
function initEvent() {
	var a = $("#name");
	$("#manage-form").submit(function(a) {
		a.preventDefault(), postData()
	}), a.focus().select(), initValidator()
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
		c = "add" == oper ? "新增计量单位组" : "修改计量单位组";
	Public.ajaxPost("../basedata/unittype/" + ("add" == oper ? "add" : "update"), b, function(a) {
		if (200 == a.status) {
			if (parent.parent.Public.tips({
				content: c + "成功！"
			}), "add" == oper) defaultPage.SYSTEM.unitGroupInfo.push(a.data);
			else for (var b = 0; b < defaultPage.SYSTEM.unitGroupInfo.length; b++) defaultPage.SYSTEM.unitGroupInfo[b].id == rowData.id && (defaultPage.SYSTEM.unitGroupInfo[b] = a.data);
			callback && "function" == typeof callback && callback(a.data, oper, api)
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
	defaultPage = Public.getDefaultPage();
initPopBtns(), initField(), initEvent();