$(function() {
	var a = this,
		b = !1;
	_page = {
		$btnAdd: $("#btn-add"),
		$btnRefresh: $("#btn-refresh"),
		init: function() {
			this.$gird = $("#grid").jqGrid({
				colModel: [{
					name: "operate",
					label: "操作",
					width: 60,
					fixed: !0,
					align: "center",
					formatter: Public.operFmatter
				}, {
					name: "shortName",
					label: "地址简称",
					width: 100
				}, {
					name: "linkman",
					label: "联系人",
					width: 100,
					align: "center"
				}, {
					name: "phone",
					label: "联系电话",
					width: 100,
					align: "center"
				}, {
					name: "mobile",
					label: "手机号码",
					width: 100,
					align: "center"
				}, {
					name: "province",
					label: "省",
					width: 60,
					classes: "ui-ellipsis",
					align: "center"
				}, {
					name: "city",
					label: "市",
					width: 60,
					classes: "ui-ellipsis",
					align: "center"
				}, {
					name: "area",
					label: "区",
					width: 60,
					classes: "ui-ellipsis",
					align: "center"
				}, {
					name: "address",
					label: "详细地址",
					width: 150
				}, {
					name: "postalcode",
					label: "邮政编码",
					width: 80,
					align: "center"
				}, {
					name: "isDefault",
					label: "默认地址",
					width: 80,
					align: "center",
					formatter: function(a) {
						return 1 == a ? (b = !0, "是") : "否"
					}
				}],
				//url: "/basedata/deliveryAddr.do?action=list",
				url: "../basedata/deliveryaddr?action=list",
				datatype: "json",
				height: Public.setGrid().h,
				altRows: !0,
				gridview: !0,
				autowidth: !0,
				pager: "#page",
				viewrecords: !0,
				cmTemplate: {
					sortable: !1,
					title: !1
				},
				page: 1,
				rowNum: 3e3,
				shrinkToFit: !1,
				scroll: 1,
				jsonReader: {
					root: "data.items",
					records: "data.totalsize",
					repeatitems: !1,
					id: "id"
				},
				loadComplete: function(a) {
					if (a && 200 == a.status) {
						var b = {};
						a = a.data;
						for (var c = 0; c < a.items.length; c++) {
							var d = a.items[c];
							b[d.id] = d
						}
						$("#grid").data("gridData", b), 0 == a.items.length && parent.Public.tips({
							type: 2,
							content: "没有地址数据！"
						})
					} else parent.Public.tips({
						type: 2,
						content: "获取地址数据失败！" + a.msg
					})
				},
				loadError: function() {
					parent.Public.tips({
						type: 1,
						content: "操作失败了哦，请检查您的网络链接！"
					})
				}
			})
		}
	}, _event = {
		init: function() {
			_page.$btnRefresh.click(function(a) {
				a.preventDefault(), _page.$gird.trigger("reloadGrid")
			}), _page.$btnAdd.click(function(c) {
				c.preventDefault(), a.pop("新增发货地址", {
					oper: "add",
					callback: a.callback,
					hasDefault: b
				//}, "url:shippingAddressManage.jsp")
				}, "url:shippingaddressmanage")
			}), _page.$gird.on("click", ".operating .ui-icon-pencil", function(c) {
				c.preventDefault();
				var d = $(this).parent().data("id");
				Public.ajaxPost("../basedata/deliveryAddr/query?action=query", {
					id: d
				}, function(c) {
					return 200 != c.status ? void parent.parent.Public.tips({
						type: 1,
						content: msg + "失败！" + c.msg
					}) : void a.pop("修改发货地址", {
						oper: "edit",
						rowData: c.data,
						callback: a.callback,
						hasDefault: b
					//}, "url:shippingAddressManage.jsp")
					}, "url:shippingaddressmanage")
				})
			}), _page.$gird.on("click", ".operating .ui-icon-trash", function(a) {
				a.preventDefault();
				var c = $(this).parent().data("id");
				$.dialog.confirm("删除的地址将不能恢复，请确认是否删除？", function() {
					Public.ajaxPost("../basedata/deliveryAddr/delete?action=delete", {
						id: c
					}, function(a) {
						if (a && 200 == a.status) {
							parent.Public.tips({
								content: "地址删除成功！"
							});
							var d = $("#grid").jqGrid("getRowData", c);
							"是" == d.isDefault && (b = !1), $("#grid").jqGrid("delRowData", c)
						} else parent.Public.tips({
							type: 1,
							content: "地址删除失败！" + a.msg
						})
					})
				})
			}), $(window).resize(function() {
				Public.resizeGrid()
			})
		}
	}, a.callback = function(a, c, d, e) {
		b = e;
		var f = $("#grid").data("gridData");
		f || (f = {}, $("#grid").data("gridData", f)), f[a.id] = a, "edit" == c ? ($("#grid").jqGrid("setRowData", a.id, a), d && d.api.close()) : ($("#grid").jqGrid("addRowData", a.id, a, "last"), d && d.resetForm(a))
	}, a.pop = function(a, b, c) {
		$.dialog({
			title: a,
			content: c,
			data: b,
			width: 640,
			height: 310,
			min: !1,
			max: !1,
			cache: !1,
			lock: !0
		})
	}, a.init = function() {
		_page.init(), _event.init()
	}, a.init()
});