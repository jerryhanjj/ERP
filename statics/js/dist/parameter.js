var system = parent.SYSTEM;
system.taxRequiredInput = system.taxRequiredInput ? system.taxRequiredInput : 0;
//var siType = system.siType,
var siType = 1,
	THISPAGE = {
		locaData: {
			funtParams: [{
				id: "billRequiredCheck",
				PID: "",
				name: "审核",
				value: 1 === system.billRequiredCheck,
				type: "checkbox",
				describe: "（启用后单据只有在审核后才会生效，报表数据才会变化）"
			}, {
				id: "taxRequiredCheck",
				PID: "",
				name: "税金",
				value: 1 === system.taxRequiredCheck,
				type: "checkbox",
				describe: " 增值税税率"
			}, {
				id: "taxRequiredInput",
				PID: "taxRequiredCheck",
				name: "",
				value: system.taxRequiredInput,
				type: "text",
				describe: "%"
			}, {
				id: "hasOnlineStore",
				PID: "",
				name: "网店",
				value: 1 === system.hasOnlineStore,
				type: "checkbox",
				describe: "（启用后将新增网店菜单模块）"
			}, {
				id: "enableStorage",
				PID: "",
				name: "京东仓储",
				value: 1 === system.enableStorage,
				type: "checkbox",
				describe: "（启用后将新增京东仓储相关功能）"
			}, {
				id: "skuRequired",
				PID: "",
				name: "辅助属性",
				value: 1 === system.enableAssistingProp,
				type: "checkbox",
				describe: "（启用后允许商品新增服装、尺码等自定义属性）"
			}, {
				id: "ISSERNUM",
				PID: "",
				name: "序列号",
				value: 1 === system.ISSERNUM,
				type: "checkbox",
				describe: " （启用后将新增商品序列号管理功能） "
			}]
		},
		init: function() {
			this.initDom(), this.addEvent()
		},
		initDom: function() {
			var a = [{
				value: "movingAverage",
				text: "移动平均法"
			}],
				b = !0;
			if (this.$_companyName = $("#companyName"), this.$_companyAddress = $("#companyAddress"), this.$_companyTel = $("#companyTel"), this.$_companyFax = $("#companyFax"), this.$_postcode = $("#postcode"), this.$_startDate = $("#startDate"), this.$_currency = $("#currency"), this.$_qtyPlaces = $("#qtyPlaces"), this.$_pricePlaces = $("#pricePlaces"), this.$_amountPlaces = $("#amountPlaces"), this.$_valMethods = $("#valMethods"), this.$_requiredCheckStore = $("#requiredCheckStore"), this.$_establishForm = $("#establish-form2"), this.$_companyName.val(system.companyName), this.$_companyAddress.val(system.companyAddr), this.$_companyTel.val(system.phone), this.$_companyFax.val(system.fax), this.$_postcode.val(system.postcode), this.$_startDate.val(system.startDate), this.$_currency.val(system.currency), this.$_qtyPlaces.spinbox({
				value: system.qtyPlaces,
				width: 80
			}), this.$_pricePlaces.spinbox({
				value: system.pricePlaces,
				width: 80
			}), this.$_amountPlaces.spinbox({
				value: system.amountPlaces,
				width: 80
			}), system.requiredCheckStore && (this.$_requiredCheckStore[0].checked = !0), 2 === siType && (a.push({
				value: "firstInFirstOut",
				text: "先进先出法"
			}), b = !1, this.locaData.funtParams.length > 0)) {
				for (var c = "", d = [], e = 0; e < this.locaData.funtParams.length; e++) {
					var f = this.locaData.funtParams[e];
					if ("" != f.PID) switch (f.type) {
					case "text":
						var g = "<input style='margin-left:10px;width:40px;text-align:right' class='ui-input' type='text' id='" + f.id + "' defaultValue = '" + f.value + "' value = '" + f.value + "'/><span class='tips'>" + f.describe + "</span>";
						d.push({
							id: f.id,
							html: g,
							PID: f.PID,
							callback: function(a, b) {
								a[0].checked ? (b.val(b.attr("defaultvalue")), b.attr("disabled", !1).removeClass("ui-input-dis")) : (b.val(b.attr("defaultvalue")), b.attr("disabled", !0).addClass("ui-input-dis")), a.click(function() {
									this.checked ? (b.val(b.attr("defaultvalue")), b.attr("disabled", !1).removeClass("ui-input-dis")) : (b.val(b.attr("defaultvalue")), b.attr("disabled", !0).addClass("ui-input-dis"))
								})
							}
						})
					} else {
						f.describe = "" == f.describe ? "" : f.describe;
						var h = "checkbox" == f.type && f.value ? "checked" : "";
						c += '<li class="row-item"><div class="label-wrap"><label>是否启用' + f.name + '：</label></div><div class="ctn-wrap"><input type="' + f.type + '" id="' + f.id + '" ' + h + '><label for="' + f.id + '" class="tips">' + f.describe + "</label></div></li>"
					}
				}
				this.$_establishForm.append(c).parent("div").show(), this.$_establishForm.closest(".para-item").show();
				for (var e = 0, i = d.length; i > e; e++) {
					var j = $("#" + d[e].PID);
					j.closest("div").append(d[e].html), d[e].callback(j, $("#" + d[e].id))
				}
			}
			this.valMethodsCombo = this.$_valMethods.combo({
				data: a,
				text: "text",
				value: "value",
				width: 230,
				disabled: b,
				defaultSelected: ["value", system.valMethods]
			}).getCombo()
		},
		addEvent: function() {
			var a = this;
			$("#save").click(function() {
				if (Business.verifyRight("SYSTEM_UPDATE")) {
					var b = $.trim(a.$_companyName.val()),
						c = $.trim(a.$_companyAddress.val()),
						d = $.trim(a.$_companyTel.val()),
						e = $.trim(a.$_companyFax.val()),
						f = $.trim(a.$_postcode.val());
					if (!b) return Public.tips({
						type: 2,
						content: "公司名称不能为空！"
					}), !1;
					var g = {
						companyName: b,
						companyAddr: c,
						phone: d,
						fax: e,
						postcode: f,
						qtyPlaces: a.$_qtyPlaces.val(),
						pricePlaces: a.$_pricePlaces.val(),
						amountPlaces: 2,
						valMethods: a.valMethodsCombo.getValue(),
						requiredCheckStore: a.$_requiredCheckStore.is(":checked") ? "1" : "0"
					};
					if (2 === siType) for (var h = 0; h < a.locaData.funtParams.length; h++) {
						var i = a.locaData.funtParams[h];
						switch (i.type) {
						case "text":
							g[i.id] = $("[id = " + i.id + "]").val();
							break;
						case "checkbox":
							g[i.id] = $("[id = " + i.id + "]").is(":checked") ? "1" : "0"
						}
					}
					$.dialog.confirm("修改系统参数将要刷新页面，是否确认修改？", function() {
						var a = parent.$.dialog.tips("提交中，请稍候...", 1e3, "loading.gif", !0);
						Public.ajaxPost("../basedata/systemProfile/update", g, function(b) {
							200 === b.status ? (parent.window.$.cookie("ReloadTips", "系统参数设置成功"), parent.window.location.reload()) : (parent.Public.tips({
								type: 1,
								content: b.msg
							}), a.close())
						}, function() {
							a.close()
						})
					})
				}
			})
		}
	};
THISPAGE.init();