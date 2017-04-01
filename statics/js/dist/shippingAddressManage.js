$(function() {
	api = frameElement.api;
	var a = this,
		b = api.data.oper,
		c = api.data.rowData || {},
		d = api.data.callback,
		e = api.data.hasDefault,
		f = Public.getDefaultPage(),
		g = !1;
	_page = {
		$shortName: $("#shortName"),
		$postalcode: $("#postalcode"),
		$province: $("#province"),
		$city: $("#city"),
		$area: $("#area"),
		$address: $("#address"),
		$linkman: $("#linkman"),
		$phone: $("#phone"),
		$mobile: $("#mobile"),
		$isDefault: $("#isDefault"),
		init: function() {
			mod_AreasCombo.init(_page.$province, _page.$city, _page.$area, function() {
				_page.provinceCombo = mod_AreasCombo.provinceCombo, _page.cityCombo = mod_AreasCombo.cityCombo, _page.areaCombo = mod_AreasCombo.areaCombo;
				var b = 1 == c.isDefault ? 0 : 1;
				g = c.isDefault ? !0 : !1;
				var d = e ? g : !0;
				_page.isDefaultCombo = _page.$isDefault.combo({
					data: [{
						id: 1,
						name: "是"
					}, {
						id: 0,
						name: "否"
					}],
					value: "id",
					text: "name",
					width: 197,
					defaultSelected: b || void 0,
					editable: !1,
					disabled: !d
				}).getCombo(), _page.$shortName.val(c.shortName), _page.$postalcode.val(c.postalcode), _page.provinceCombo.selectByText(c.province), _page.cityCombo.selectByText(c.city), _page.areaCombo.selectByText(c.area), _page.$address.val(c.address), _page.$linkman.val(c.linkman), _page.$phone.val(c.phone), _page.$mobile.val(c.mobile), $("#province").find("input").attr("name", "provinceInput"), $("#city").find("input").attr("name", "cityInput"), $("#area").find("input").attr("name", "areaInput"), a.initButton(), a.initValidator(), _page.$shortName.focus().select()
			})
		}
	}, _event = {}, a.initButton = function() {
		var d = "add" == b ? ["保存", "关闭"] : ["确定", "取消"];
		api.button({
			id: "confirm",
			name: d[0],
			focus: !0,
			callback: function() {
				return a.postData(b, c.id), !1
			}
		}, {
			id: "cancel",
			name: d[1]
		})
	}, a.initValidator = function() {
		$.validator.addMethod("mobile", function(a) {
			return a ? /0?(13|14|15|18)[0-9]{9}/.test(a) : !0
		}), $.validator.addMethod("phone", function(a) {
			return a ? /[0-9-()（）]{7,18}/.test(a) : !0
		}), $.validator.addMethod("postalcode", function(a) {
			return a ? /\d{6}/.test(a) : !0
		}), $.validator.addMethod("require_from_group", function(a, b, c) {
			var d = this,
				e = c[1],
				f = $(e, b.form).filter(function() {
					return d.elementValue(this)
				}).length >= c[0];
			if (!$(b).data("being_validated")) {
				var g = $(e, b.form);
				g.data("being_validated", !0), g.valid(), g.data("being_validated", !1)
			}
			return f
		}, jQuery.format("请输入电话或者手机号码")), $("#manage-form").validate({
			errorPlacement: function(a, b) {
				a.appendTo(b.parent());
				var c = "10px",
					d = "35px";
				a.parent().hasClass("ui-combo-wrap") && (c = "6px", d = "15px"), a.css({
					display: "block",
					position: "absolute",
					top: c,
					right: d
				})
			},
			rules: {
				shortName: {},
				address: {
					required: !0
				},
				linkman: {
					required: !0
				},
				mobile: {
					require_from_group: [1, ".phone-group"]
				},
				phone: {
					require_from_group: [1, ".phone-group"]
				},
				postalcode: {
					required: !0
				},
				provinceInput: {
					required: !0
				},
				cityInput: {
					required: !0
				},
				areaInput: {
					required: !0
				}
			},
			messages: {
				shortName: {
					required: "名称不能为空"
				},
				mobile: {
					mobile: "手机格式不正确"
				},
				phone: {
					phone: "电话格式不正确"
				},
				postalcode: {
					postalcode: "邮编格式不正确",
					required: "邮编不能为空"
				},
				address: {
					required: "详细地址不能为空"
				},
				linkman: {
					required: "联系人不能为空"
				},
				provinceInput: {
					required: "省份不能为空"
				},
				cityInput: {
					required: "市不能为空"
				},
				areaInput: {
					required: "区不能为空"
				}
			},
			errorClass: "valid-error"
		})
	}, a.postData = function(a, b) {
		if (!$("#manage-form").validate().form()) return void $("#manage-form").find("input.valid-error").eq(0).focus();
		var h = $.trim(_page.$shortName.val()),
			i = $.trim(_page.$postalcode.val()),
			j = _page.provinceCombo.getText(),
			k = _page.cityCombo.getText(),
			l = _page.areaCombo.getText(),
			m = $.trim(_page.$address.val()),
			n = $.trim(_page.$linkman.val()),
			o = $.trim(_page.$phone.val()),
			p = $.trim(_page.$mobile.val()),
			q = _page.isDefaultCombo.getValue(),
			r = "add" == a ? "新增地址" : "修改地址";
		params = c.id ? {
			id: b,
			shortName: h,
			postalcode: i,
			province: j,
			city: k,
			area: l,
			address: m,
			linkman: n,
			phone: o,
			mobile: p,
			isDefault: q
		} : {
			shortName: h,
			postalcode: i,
			province: j,
			city: k,
			area: l,
			address: m,
			linkman: n,
			phone: o,
			mobile: p,
			isDefault: q
		}, Public.ajaxPost("../basedata/deliveryaddr/" + ("add" == a ? "add" : "update"), params, function(b) {
			if (200 == b.status) {
				if (parent.parent.Public.tips({
					content: r + "成功！"
				}), 1 == q ? e = !0 : g && (e = !1), "add" == a) f.SYSTEM.addrInfo.push(b.data);
				else for (var h = 0; h < f.SYSTEM.addrInfo.length; h++) f.SYSTEM.addrInfo[h].id == c.id && (f.SYSTEM.addrInfo[h] = b.data);
				d && "function" == typeof d && d(b.data, a, window, e)
			} else parent.parent.Public.tips({
				type: 1,
				content: r + "失败！" + b.msg
			})
		})
	}, _page.init(), window.resetForm = function() {
		$("#manage-form").validate().resetForm(), _page.$shortName.val(""), _page.$postalcode.val(""), _page.provinceCombo.selectByText(""), _page.cityCombo.selectByText(""), _page.areaCombo.selectByText(""), _page.$address.val(""), _page.$linkman.val(""), _page.$phone.val(""), _page.$mobile.val(""), _page.isDefaultCombo.selectByText("否"), e && "add" == b && _page.isDefaultCombo.disable()
	}
});