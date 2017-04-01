function initField() {
	rowData.id && $("#name").val(rowData.name)
}
function initEvent() {
	$("#manage-form").submit(function(a) {
		a.preventDefault(), postData()
	}), $("#name").focus().select(), initValidator()
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
		c = "add" == oper ? "新增结算方式" : "修改结算方式";
	Public.ajaxPost("../basedata/assist/" + ("add" == oper ? "add" : "update")+"?typeNumber=PayMethod", b, function(a) {
		200 == a.status ? (parent.parent.Public.tips({
			content: c + "成功！"
		}), callback && "function" == typeof callback && callback(a.data, oper, window)) : parent.parent.Public.tips({
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
	callback = api.data.callback;
initPopBtns(), initField(), initEvent();