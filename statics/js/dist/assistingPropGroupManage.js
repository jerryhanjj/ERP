var curRow, curCol;
$(function() {
	var a = frameElement.api,
		b = (a.data.oper, a.data.opener, a.data.callback),
		c = a.data.skuClassId,
		d = Public.getDefaultPage(),
		e = {
			$comboField: $("#comboField"),
			combolist: [],
			init: function() {
				c && (this.initButton(), this.initDom(), this.initEvent())
			},
			initButton: function() {
				var f = ["保存", "关闭"];
				a.button({
					id: "confirm",
					name: f[0],
					focus: !0,
					callback: function() {
						for (var f = {
							skuClassId: c,
							skuName: "",
							skuAssistId: ""
						}, g = 0, h = e.combolist.length; h > g; g++) {
							var i = e.combolist[g].getSelectedRow();
							if (0 == i.value) return void d.Public.tips({
								type: 1,
								content: "属性不能为空！"
							});
							f.skuName = f.skuName ? f.skuName + "/" + i.name : i.name, f.skuAssistId = f.skuAssistId ? f.skuAssistId + "," + i.id : i.id
						}
						return Public.ajaxPost("../basedata/assistSku/add?action=add", f, function(c) {
							200 == c.status ? (d.Public.tips({
								content: "新增规格成功！"
							}), d.SYSTEM.assistPropGroupInfo.push(c.data), b && "function" == typeof b && b(c.data, a)) : d.Public.tips({
								type: 1,
								content: c.msg
							})
						}), !1
					}
				}, {
					id: "cancel",
					name: f[1]
				})
			},
			initDom: function() {
				for (var a, b = 0, f = d.SYSTEM.assistPropGroupInfo.length; f > b; b++) d.SYSTEM.assistPropGroupInfo[b].skuId == c && (a = d.SYSTEM.assistPropGroupInfo[b].skuAssistId.split(","));
				for (var b = 0, f = a.length; f > b; b++) {
					var g = ['<li class="row-item">', '<div class="ctn-wrap"><span id="' + a[b] + '"></span></div>', "</li>"];
					this.$comboField.append(g.join("")), function(c) {
						for (var f = "", g = 0, h = d.SYSTEM.assistPropTypeInfo.length; h > g; g++) d.SYSTEM.assistPropTypeInfo[g].id == c && (f = d.SYSTEM.assistPropTypeInfo[g].name);
						e.combolist.push($("#" + c).combo({
							data: function() {
								return e.handle.getComboData(c)
							},
							ajaxOptions: {
								formatData: function(a) {
									d.SYSTEM.assistPropInfo = a.data.items;
									for (var b = [], e = 0, f = d.SYSTEM.assistPropInfo.length; f > e; e++) d.SYSTEM.assistPropInfo[e].typeNumber === c && b.push(d.SYSTEM.assistPropInfo[e]);
									return b
								}
							},
							value: "id",
							text: "name",
							width: 230,
							defaultSelected: 0,
							editable: !0,
							extraListHtml: '<a href="javascript:void(0);" id="quickAddSku" class="quick-add-link"><i class="ui-icon-add"></i>新增属性</a>',
							maxListWidth: 500,
							cache: !1,
							forceSelection: !0,
							listHeight: 100,
							listWrapCls: "ui-droplist-wrap",
							noDataText: "请先添加" + f + "属性",
							callback: {
								onChange: function() {}
							}
						}).getCombo(a[b]))
					}(a[b])
				}
			},
			initEvent: function() {
				$(".quick-add-link").on("click", function() {
					for (var a = 0, b = e.combolist.length; b > a; a++) if (e.combolist[a].active) var c = e.combolist[a],
						d = c.obj[0].id,
						f = "新增" + c.opts.noDataText.replace("请先添加", ""),
						g = parent.$.dialog({
							title: f,
							content: "url:propManage.jsp",
							data: {
								oper: "add",
								typeNumber: d,
								callback: function(a) {
									c.loadData(e.handle.getComboData(d), "-1", !1), c.selectByValue(a.id), g.close()
								}
							},
							width: 280,
							height: 90,
							max: !1,
							min: !1,
							cache: !1,
							lock: !1
						})
				})
			},
			handle: {
				getComboData: function(a) {
					if (d.SYSTEM.assistPropInfo) {
						for (var b = [], c = 0, e = d.SYSTEM.assistPropInfo.length; e > c; c++) d.SYSTEM.assistPropInfo[c].typeNumber === a && b.push(d.SYSTEM.assistPropInfo[c]);
						return b
					}
					return "../basedata/assist?action=list&isDelete=2&typeNumber=" + a
				}
			}
		};
	e.init()
});