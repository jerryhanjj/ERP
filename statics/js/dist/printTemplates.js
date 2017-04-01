function initValidator() {
	$.validator.addMethod("number", function(a) {
		return /^[a-zA-Z0-9\-_]*$/.test(a)
	}), $("#manage-form").validate({
		rules: {
			templateNumber: {
				required: !0,
				number: !0
			},
			templateName: {
				required: !0
			}
		},
		messages: {
			templateNumber: {
				required: "模板编号不能为空",
				number: "模板编号只能由数字、字母、-或_等字符组成"
			},
			templateName: {
				required: "模板名称不能为空"
			}
		},
		errorClass: "valid-error"
	})
}
function resetForm() {
	$("#manage-form").validate().resetForm(), $("#templateDefault")[0].checked = !1, $("#templateDesribe").val(""), $("#templateName").val(""), $("#templateNumber").val(""), $templateTypeCombo.selectByIndex(0), $("#file-path").val("")
}
function initSWF() {
	function fileDialogComplete() {}
	function fileDialogStart() {
		$("#file-path").val(""), uploadInstance.cancelUpload()
	}
	function fileQueued(a) {
		try {
			$("#file-path").val(a.name)
		} catch (b) {}
	}
	function fileQueueError(a, b) {
		try {
			switch (b) {
			case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
				return void Public.tips({
					content: "每次只能上传一个文件！",
					type: 2
				});
			case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
				return void Public.tips({
					content: "文件大小不能超过10 MB！",
					type: 2
				});
			case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
				return void Public.tips({
					content: "您选择的文件大小为0，请重新选择！",
					type: 2
				});
			case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
				return void Public.tips({
					content: "只能导入Excel文件！",
					type: 2
				});
			default:
				return void Public.tips({
					content: "导入失败，请重试！",
					type: 2
				})
			}
		} catch (c) {}
	}
	function uploadStart() {
		progressPop = $.dialog.tips("正在导入凭证，请耐心等待...", 1e3, "loading.gif", !0).show()
	}
	function uploadProgress(a, b, c) {
		try {
			var d = Math.ceil(b / c * 100);
			$("#upload-progress .progress-bar > span").length > 0 && $("#upload-progress .progress-bar > span").width(d + "%")
		} catch (e) {}
	}
	function uploadError() {
		try {
			progressPop.close(), parent.Public.tips({
				content: "导入失败，请重试！",
				type: 2
			})
		} catch (a) {}
	}
	function uploadSuccess(file, serverData) {
		progressPop.close();
		var data = eval("(" + serverData + ")");
		200 == data.status ? (parent.Public.tips({
			content: "导入成功",
			type: 3
		}), resetForm(), $("#grid").trigger("reloadGrid")) : parent.Public.tips({
			type: 1,
			content: data.msg
		})
	}
	function uploadComplete() {
		$("#file-path").val("")
	}
	var progressPop;
//	uploadInstance = new SWFUpload({
//		upload_url: conf.tmpUploadUrl + ";jsessionid=" + $("body").data("sessionId"),
//		file_post_name: "resume_file",
//		file_size_limit: "10 MB",
//		file_types: "*.htm;*.html",
//		file_types_description: "All Files",
//		file_upload_limit: "0",
//		file_queue_limit: "1",
//		file_dialog_start_handler: fileDialogStart,
//		file_queued_handler: fileQueued,
//		file_queue_error_handler: fileQueueError,
//		file_dialog_complete_handler: fileDialogComplete,
//		upload_start_handler: uploadStart,
//		upload_progress_handler: uploadProgress,
//		upload_error_handler: uploadError,
//		upload_success_handler: uploadSuccess,
//		upload_complete_handler: uploadComplete,
//		button_image_url: "../../statics/js/common/libs/swfupload/import-btn.png",
//		button_placeholder_id: "import-btn",
//		button_width: 60,
//		button_height: 32,
//		flash_url: "../../statics/js/common/libs/swfupload/swfupload.swf",
//		custom_settings: {
//			progress_target: "fsUploadProgress",
//			upload_successful: !1
//		},
//		debug: !1
//	})
}
function initGrid() {
	var a = [350, 150, 150, 100, 60];
	$("#grid").jqGrid({
		url: "../noteprinttemp/findNotePrintTemp?action=findNotePrintTemp",
		datatype: "json",
		height: Public.setGrid().h,
		autowidth: !0,
		altRows: !0,
		gridview: !0,
		colNames: ["操作", "名称", "类别", "模版类型", "默认模版"],
		colModel: [{
			name: "operate",
			width: a[4],
			align: "center",
			formatter: operateFmatter,
			title: !1
		}, {
			name: "name",
			index: "name",
			width: a[0]
		}, {
			name: "type",
			index: "type",
			width: a[1],
			align: "center",
			formatter: typeFormatter
		}, {
			name: "level",
			index: "level",
			width: a[2],
			align: "center",
			formatter: levelFormatter
		}, {
			name: "isDefault",
			index: "isDefault",
			width: a[3],
			align: "center",
			formatter: isDefaultFormatter
		}],
		cmTemplate: {
			sortable: !1
		},
		pager: "#page",
		rowNum: 1e3,
		viewrecords: !0,
		shrinkToFit: !1,
		scroll: 1,
		jsonReader: {
			root: "data.items",
			records: "data.totalsize",
			repeatitems: !1,
			id: "id"
		},
		loadComplete: function(a) {
			if (a.data) {
				var a = a.data.items;
				$.each(a, function(b) {
					var c = a[b];
					c.isDefault && (DEFAULT_TEMP[c.type] = c)
				})
			}
		}
	})
}
function typeFormatter(a) {
	return TYPE_DATA[a]
}
function levelFormatter(a) {
	switch (a) {
	case 1:
		return "系统模版";
	default:
		return "自定义模版"
	}
}
function isDefaultFormatter(a) {
	return a ? "是" : "否"
}
function operateFmatter(a, b) {
	return '<p data-id="' + b.rowId + '" class="operate-wrap operating"><a class="edit ui-icon ui-icon-pencil" title="编辑" href="javascript:void(0)">编辑</a><a class="loadDown ui-icon ui-icon-arrowthickstop-1-s" title="下载">下载</a><a class="delete ui-icon ui-icon-trash" title="删除"></a></p>'
}
function editTemp(a) {
	var b = $("#grid").jqGrid("getLocalRow", a),
		c = ['<div class="manage-wrap word-mange" id="manage-wrap">', '<form id="manage-form" action="###">', '<ul class="mod-form-rows">', '<li class="row-item">', '<div class="label-wrap"><label for="tempName">名称:</label></div>', '<div class="ctn-wrap"><input type="text" id="tempName" name="tempName" class="ui-input"/></div>', "</li>", '<li class="row-item">', '<div class="label-wrap"><label>是否默认:</label></div>', '<div class="ctn-wrap radio-wrap">', '<input type="radio" name="isDefault" id="isDefault" value="1"/> <label for="isDefault">是</label>', '<input type="radio" name="isDefault" id="isNotDefault" value="0" checked="checked"/> <label for="isNotDefault">否</label>', "</div>", "</li>", "</ul>", "</form>", "</div>"].join("");
	magageDialog = $.dialog({
		title: "编辑套打模版",
		content: c,
		width: 380,
		height: 160,
		max: !1,
		min: !1,
		cache: !1,
		lock: !0,
		ok: function() {
			return postData(a), !1
		},
		okVal: "确定",
		cancelVal: "取消",
		cancel: !0
	}), 
	
	//$("#tempName").val(b.name), 0 == b.level ? $("#tempName").addClass("ui-input-dis").attr("readonly", !0) : $("#tempName").select().focus(), b.isDefault && $("#isDefault").attr("checked", !0), Public.bindEnterSkip($("#manage-wrap"), postData, a), $("#manage-form").validate({
//		rules: {
//			tempName: {
//				required: !0
//			}
//		},
//		messages: {
//			tempName: {
//				required: "名称不能为空！"
//			}
//		},
//		errorClass: "valid-error"
//	}), 
	
	$("#manage-form").submit(function(a) {
		a.preventDefault()
	})
}
function postData(a) {
	if (!$("#manage-form").validate().form()) return void $("#manage-form").find("input.valid-error").eq(0).focus();
	var b = $.trim($("#tempName").val()),
		c = $("input[name=isDefault]:checked").val(),
		d = $("#grid").jqGrid("getLocalRow", a),
		e = {
			type: d.type,
			templateId: a,
			name: b,
			isdefault: c,
			level: d.level
		};
	$.ajax({
		url: "/noteprint/noteprinttemp?m=update",
		type: "post",
		dataType: "json",
		data: e,
		success: function(b) {
			200 == b.status ? successCallback(a, b.data) : Public.tips({
				type: 1,
				content: b.msg
			})
		},
		error: function() {
			Public.tips({
				type: 1,
				content: "系统繁忙，请重试！"
			})
		}
	})
}
function successCallback(a, b) {
	if (Public.tips({
		content: "修改成功！"
	}), $("#grid").jqGrid("setRowData", a, b), magageDialog.close(), b.isDefault) {
		var c = DEFAULT_TEMP[b.type];
		b.id != c.id && (DEFAULT_TEMP[b.type] = b, c.isDefault = !1, $("#grid").jqGrid("setRowData", c.id, c))
	}
}
var TYPE_DATA = {
	0: "套打单据",
	1: "凭证",
	3: "总账",
	4: "明细账",
	8: "试算平衡表",
	10101: "采购单",
	10201: "销售单",
	//10205: "网店订单",
	//10501: "运单",
	//10301: "采购订单",
	//10303: "销售订单",
	////10419: "组装单",
	//10429: "拆卸单",
	10601: "收款单",
	10602: "付款单"
},
	DEFAULT_TEMP = {},
	magageDialog, uploadInstance, $templateTypeCombo, conf = {
		tmpUploadUrl: "../noteprinttemp",
		tmpDownloadUrl: "../noteprinttemp/downloadTemplate?action=downloadTemplate&templateId="
	};
$(function() {
	initGrid(), initSWF(), $("#dataGrid").on("click", ".edit", function(a) {
		a.preventDefault();
		var b = $(this).parent().data("id");
		editTemp(b)
	}), $("#dataGrid").on("click", ".delete", function(a) {
		a.preventDefault();
		var b = $(this).parent().data("id");
		$.dialog.confirm("您确定要删除该记录吗？", function() {
			Public.ajaxGet("../noteprinttemp/delete?action=delete&templateId=" + b, {}, function(a) {
				200 === a.status ? ($("#grid").jqGrid("delRowData", b), parent.Public.tips({
					content: "删除成功！"
				})) : parent.Public.tips({
					type: 1,
					content: a.msg
				})
			})
		})
	}), $("#dataGrid").on("click", ".loadDown", function(a) {
		a.preventDefault();
		var b = $(this).parent().data("id");
		window.open(conf.tmpDownloadUrl + b)
	}), $("#btnTemplateImport").on("click", function() {
		var a = $("#templateImport"),
			b = $("#manage-form");
		$.dialog({
			content: b,
			title: "编辑套打模版",
			width: 400,
			height: 160,
			max: !1,
			min: !1,
			lock: !0,
			ok: function() {
				//return $("#file-path").val() ? $("#manage-form").validate().form() ? (uploadInstance.addPostParam("isdefault", $("#templateDefault")[0].checked ? 1 : 0), uploadInstance.addPostParam("templateDesribe", $("#templateDesribe").val()), uploadInstance.addPostParam("name", $("#templateName").val()), uploadInstance.addPostParam("type", $templateTypeCombo.getValue()), uploadInstance.addPostParam("number", $("#templateNumber").val()), uploadInstance.startUpload(), !1) : ($("#manage-form").find("input.valid-error").eq(0).focus(), !1) : (parent.Public.tips({
					//content: "请选择要上传的文件！",
					//type: 2
				//}), !1)
			},
			okVal: "确定",
			cancelVal: "取消",
			cancel: !0,
			init: function() {
				a.show()
			},
			close: function() {
				return resetForm(), this.hide(), !1
			}
		})
	}), $templateTypeCombo = $("#templateType").combo({
		data: [{
			name: "销售单",
			id: 10201
		}, {
			name: "采购单",
			id: 10101
		},
//		{
//			name: "网店订单",
//			id: 10205
//		}, 
//		{
//			name: "运单",
//			id: 10501
//		}, 
//		{
//			name: "采购订单",
//			id: 10301
//		}, 
//		{
//			name: "销售订单",
//			id: 10303
//		}, 
		{
			name: "收款单",
			id: 10601
		}, {
			name: "付款单",
			id: 10602
		}],
		text: "name",
		value: "id",
		width: 212,
		defaultSelected: -1,
		zIndex: 2009,
		cache: !1
	}).getCombo(), initValidator()
}), $(window).resize(function() {
	Public.resizeGrid()
});