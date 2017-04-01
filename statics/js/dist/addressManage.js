$(function() {
	api = frameElement.api;
	var a = this,
		b = api.data.oper,
		c = api.data.rowData || {},
		d = api.data.callback,
		e = api.data.hasDefault,
		f = !1;
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
				f = c.isDefault ? !0 : !1;
				var d = e ? f : !0;
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
				}).getCombo(), _page.$shortName.val(c.shortName), _page.$postalcode.val(c.postalcode), _page.provinceCombo.selectByText(c.province), _page.cityCombo.selectByText(c.city), _page.areaCombo.selectByText(c.area || c.county), _page.$address.val(c.address), _page.$linkman.val(c.linkman), _page.$phone.val(c.phone), _page.$mobile.val(c.mobile), $("#province").find("input").attr("name", "provinceInput"), $("#city").find("input").attr("name", "cityInput"), $("#area").find("input").attr("name", "areaInput"), a.initButton(), a.initValidator(), _page.$shortName.focus().select()
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
					required: !1
				},
				cityInput: {
					required: !1
				},
				areaInput: {
					required: !1
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
		var e = $.trim(_page.$shortName.val()),
			f = $.trim(_page.$postalcode.val()),
			g = _page.provinceCombo.getText(),
			h = _page.cityCombo.getText(),
			i = _page.areaCombo.getText(),
			j = $.trim(_page.$address.val()),
			k = $.trim(_page.$linkman.val()),
			l = $.trim(_page.$phone.val()),
			m = $.trim(_page.$mobile.val()),
			n = _page.isDefaultCombo && _page.isDefaultCombo.getValue();
		params = c.id ? {
			id: b,
			shortName: e,
			postalcode: f,
			province: g,
			city: h,
			area: i,
			address: j,
			linkman: k,
			phone: l,
			mobile: m,
			isDefault: n
		} : {
			shortName: e,
			postalcode: f,
			province: g,
			city: h,
			area: i,
			address: j,
			linkman: k,
			phone: l,
			mobile: m,
			isDefault: n
		}, d(params, api)
	}, _page.init(), window.resetForm = function() {
		$("#manage-form").validate().resetForm(), _page.$shortName.val(""), _page.$postalcode.val(""), _page.provinceCombo.selectByText(""), _page.cityCombo.selectByText(""), _page.areaCombo.selectByText(""), _page.$address.val(""), _page.$linkman.val(""), _page.$phone.val(""), _page.$mobile.val(""), _page.isDefaultCombo.selectByText("否"), e && "add" == b && _page.isDefaultCombo.disable()
	}
});
var mod_AreasCombo = function(a) {
		function b(b, c) {
			return b.combo({
				data: c,
				text: "name",
				value: "id",
				width: 195,
				listHeight: 100,
				defaultSelected: -1,
				cache: !1,
				editable: !0,
				callback: {
					onFocus: null,
					onBlur: null,
					beforeChange: null,
					onChange: function() {
						switch (this) {
						case a.provinceCombo:
							a.cityCombo.loadData(d(a.provinceCombo.getValue()), -1, !1), a.areaCombo.loadData([], -1, !1);
							break;
						case a.cityCombo:
							a.areaCombo.loadData(e(a.cityCombo.getValue()), -1, !1);
							break;
						case a.areaCombo:
						}
					},
					onExpand: null,
					onCollapse: null
				}
			}).getCombo()
		}
		function c() {
			var a = [];
			for (i = 0, len = l.length; i < len; i++) 2 === l[i].type && 1 === l[i].parent_id && a.push({
				name: l[i].name,
				id: l[i].id
			});
			return a
		}
		function d(a) {
			var b = [];
			for (i = 0, len = m.length; i < len; i++) m[i].parent_id === a && b.push({
				name: m[i].name,
				id: m[i].id
			});
			return b
		}
		function e(a) {
			var b = [];
			if (n[a]) b = n[a].areaData;
			else {
				for (i = 0, len = j.length; i < len; i++) 4 === j[i].type && j[i].parent_id === a && b.push({
					name: j[i].name,
					id: j[i].id
				});
				n[a] = {
					areaData: b
				}
			}
			return b
		}
		var f, g, h, j = [],
			k = !1,
			l = [],
			m = [],
			n = {};
		return a.init = function(d, e, n, o) {
			return f = d, g = e, h = n, d && e && n ? (Public.ajaxPost("../../statics/js/common/areasData.php", {}, function(d) {
				if (d) {
					for (k = !0, j = d.areas_get_response.areas.area, i = 0, len = j.length; i < len; i++) 2 === j[i].type && 1 === j[i].parent_id && l.push({
						name: j[i].name,
						id: j[i].id,
						type: 2,
						parent_id: 1
					}), 3 === j[i].type && m.push({
						name: j[i].name,
						id: j[i].id,
						type: j[i].type,
						parent_id: j[i].parent_id
					});
					a.provinceCombo = b(f, c()), a.cityCombo = b(g, []), a.areaCombo = b(h, []), o()
				} else parent.Public.tips({
					type: 1,
					content: "初始化省市区失败！"
				})
			}), a) : void 0
		}, a
	}(mod_AreasCombo || {});