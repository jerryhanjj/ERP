!
function(a) {
	function b() {
		a("#assisting-list").on("mouseover", ">li", function() {
			a(this).addClass("on").siblings().removeClass("on")
		}).on("mouseleave", ">li", function() {
			a(this).removeClass("on")
		}), a("#assisting-list").on("click", ".btn-edit", function(b) {
			if (b.preventDefault(), Business.verifyRight("FZSX_UPDATE")) {
				var d = a(this).parents("#assisting-list li").find(".item"),
					e = {
						id: d.data("id"),
						name: d.text()
					};
				c("edit", e)
			}
		}), a("#assisting-list").on("click", ".btn-del", function(b) {
			if (b.preventDefault(), Business.verifyRight("FZSX_DELETE")) {
				var c = a(this).parents("#assisting-list li").find(".item").data("id");
				a.dialog.confirm("删除后不可恢复！您确定要删除该辅助属性吗？", function() {
					e(c)
				})
			}
		}), a("#btn-add,#add-custom-assisting .item").on("click", function(a) {
			a.preventDefault(), Business.verifyRight("FZSX_ADD") && c("add")
		}), a("#assisting-list").on("click", ".item", function(b) {
			if (b.preventDefault(), "add-custom-assisting" != a(this).parent().attr("id")) {
				var c = a(this).text(),
					d = a(this).data("id");
				parent.tab.addTabItem({
					text: c + "分类",
					url: "settings/prop_list?typeNumber=" + d + "&name=" + encodeURIComponent(c) + "&rd=" + (new Date).getTime(),
					tabid: "setting-propList"
				}), window.setTimeout(function() {
					a("#assisting-list > li").removeClass("on")
				}, 100)
			}
		})
	}
	function c(b, c) {
		var e = "add" == b ? "新增分类" : "编辑分类",
			f = "add" == b ? ["保存", "关闭"] : ["确定", "取消"],
			g = c ? c.id : void 0,
			i = "edit" == b ? c.name : "",
			j = ['<div class="manage-wrap assisting-manage" id="manage-wrap">', '<form action="#" id="manage-form">', '<ul class="mod-form-rows">', '<li class="row-item">', '<div class="label-wrap fl">', '<label for="assistingName">名称：</label>', "</div>", '<div class="ctn-wrap fl">', '<input type="text" id="assistingName" name="assistingName" class="ui-input" value="' + i + '" />', "</div>", "</li>", "</ul>", "</form>", "<div>"].join("");
		h = a.dialog({
			title: e,
			width: 320,
			height: 100,
			data: c,
			content: j,
			min: !1,
			max: !1,
			lock: !0,
			ok: function() {
				return d(b, g), !1
			},
			cancel: !0,
			okVal: f[0],
			cancelVal: f[1]
		}), a("#assistingName").focus(), a("#manage-form").on("submit", function(a) {
			a.preventDefault()
		}), Public.bindEnterSkip(a("#manage-wrap"), d, b, g), a("#manage-form").validate({
			rules: {
				assistingName: {
					required: !0
				}
			},
			messages: {
				assistingName: {
					required: "名称不能为空！"
				}
			},
			errorClass: "valid-error"
		})
	}
	function d(b, c) {
		if (!a("#manage-form").validate().form()) return void a("#manage-form").find("input.valid-error").eq(0).focus();
		var d = a.trim(a("#assistingName").val()),
			e = {
				id: c,
				name: d
			};
		a.ajax({
			type: "POST",
			dataType: "json",
			data: e,
			url: "../basedata/assistType/" + ("add" == b ? "add" : "update"),
			success: function(d) {
				if (200 == d.status) if (a("#manage-form").validate().resetForm(), parent.Public.tips({
					content: "保存成功！"
				}), "edit" === b) {
					a("li a[data-id=" + c + "]").val(d.data.id).find("strong").text(d.data.name), h.close();
					for (var e = 0, f = parent.SYSTEM.assistPropTypeInfo.length; f > e; e++) {
						var i = parent.SYSTEM.assistPropTypeInfo[e];
						i.id === c && (parent.SYSTEM.assistPropTypeInfo[e] = d.data)
					}
				} else {
					var j = [];
					j.push(d.data), g(j), a("#assistingName").val("").focus(), parent.SYSTEM.assistPropTypeInfo.push(d.data)
				} else parent.Public.tips({
					type: 1,
					content: "保存失败！" + d.msg
				})
			},
			error: function() {
				parent.Public.tips({
					type: 1,
					content: "系统繁忙，请重试！"
				})
			}
		})
	}
	function e(b) {
		a.ajax({
			type: "POST",
			dataType: "json",
			url: "../basedata/assistType/delete?action=delete&id=" + b,
			success: function(c) {
				if (200 == c.status) {
					a("li a[data-id=" + b + "]").parent().remove(), parent.Public.tips({
						content: "删除成功！"
					});
					for (var d = 0, e = parent.SYSTEM.assistPropTypeInfo.length; e > d; d++) {
						var f = parent.SYSTEM.assistPropTypeInfo[d];
						f.id === b && (parent.SYSTEM.assistPropTypeInfo.splice(d, 1), e--, d--)
					}
				} else parent.Public.tips({
					type: 1,
					content: "删除失败！" + c.msg
				})
			}
		})
	}
	function f() {
		a.ajax({
			type: "POST",
			dataType: "json",
			url: "../basedata/assistType?action=list",
			success: function(a) {
				200 == a.status ? (a = a.data.items, g(a)) : parent.Public.tips({
					type: 1,
					content: "获取自定义辅助属性失败！请刷新页面重试。",
					autoClose: !1
				})
			}
		})
	}
	function g(b) {
		for (var c = '<li class="custom"><a href="#" data-id="#{id}" class="item"><i></i><strong>#{name}</strong></a><span class="operation"><a href="#" class="btn-edit ui-icon-edit" title="编辑">编辑</a><a href="#" class="btn-del ui-icon-del" title="删除">删除</a></span></li>', d = [], e = 0, f = b.length; f > e; e++) {
			var g = b[e];
			d.push(c.replace(/\#{id}/g, g.id).replace(/\#{name}/g, g.name))
		}
		a("#add-custom-assisting").before(d.join(""))
	}
	var h;
	f(), b()
}(jQuery);