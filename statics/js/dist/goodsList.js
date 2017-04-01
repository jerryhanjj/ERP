$(function() {
	function a() {
		Public.zTree.init($("#tree"), {
			defaultClass: "innerTree",
			showRoot: !0,
			rootTxt: "全部"
		}, {
			callback: {
				beforeClick: function(a, b) {
					$("#currentCategory").data("id", b.id).html(b.name), $("#search").trigger("click")
				}
			}
		})
	}
	function b() {
		var a = Public.setGrid(f, g),
			b = parent.SYSTEM.rights,
			c = !(parent.SYSTEM.isAdmin || b.AMOUNT_COSTAMOUNT),
			h = !(parent.SYSTEM.isAdmin || b.AMOUNT_INAMOUNT),
			k = !(parent.SYSTEM.isAdmin || b.AMOUNT_OUTAMOUNT),
			l = [{
				name: "operate",
				label: "操作",
				width: 90,
				fixed: !0,
				formatter: function(a, b, c) {
					var d = '<div class="operating" data-id="' + c.id + '"><span class="ui-icon ui-icon-pencil" title="修改"></span><span class="ui-icon ui-icon-trash" title="删除"></span><span class="ui-icon ui-icon-pic" title="商品图片"></span></div>';
					return d
				},
				title: !1
			}, {
				name: "categoryName",
				label: "商品类别",
				index: "categoryName",
				width: 100,
				title: !1
			}, {
				name: "number",
				label: "商品编号",
				index: "number",
				width: 100,
				title: !1
			}, {
				name: "name",
				label: "商品名称",
				index: "name",
				width: 200,
				classes: "ui-ellipsis"
			}, {
				name: "spec",
				label: "规格型号",
				index: "spec",
				width: 60,
				classes: "ui-ellipsis"
			}, {
				name: "unitName",
				label: "单位",
				index: "unitName",
				width: 40,
				align: "center",
				title: !1
			}, {
				name: "currentQty",
				label: "当前库存",
				index: "currentQty",
				width: 80,
				align: "right",
				title: !1,
				formatter: i.currentQty
			}, {
				name: "quantity",
				label: "期初数量",
				index: "quantity",
				width: 80,
				align: "right",
				title: !1,
				formatter: i.quantity
			}, {
				name: "unitCost",
				label: "单位成本",
				index: "unitCost",
				width: 100,
				align: "right",
				formatter: "currency",
				formatoptions: {
					showZero: !0,
					decimalPlaces: d
				},
				title: !1,
				hidden: c
			}, {
				name: "amount",
				label: "期初总价",
				index: "amount",
				width: 100,
				align: "right",
				formatter: "currency",
				formatoptions: {
					showZero: !0,
					decimalPlaces: e
				},
				title: !1,
				hidden: c
			}, {
				name: "purPrice",
				label: "预计采购价",
				index: "purPrice",
				width: 100,
				align: "right",
				formatter: "currency",
				formatoptions: {
					showZero: !0,
					decimalPlaces: d
				},
				title: !1,
				hidden: h
			}, {
				name: "salePrice",
				label: "零售价",
				index: "salePrice",
				width: 100,
				align: "right",
				formatter: "currency",
				formatoptions: {
					showZero: !0,
					decimalPlaces: d
				},
				title: !1,
				hidden: k
			}, {
				name: "remark",
				label: "备注",
				index: "remark",
				width: 100,
				title: !0
			}, {
				name: "delete",
				label: "状态",
				index: "delete",
				width: 80,
				align: "center",
				formatter: i.statusFmatter
			}];
		j.gridReg("grid", l), l = j.conf.grids.grid.colModel, $("#grid").jqGrid({
			url: "../basedata/inventory?action=list&isDelete=2",
			datatype: "json",
			width: a.w,
			height: a.h,
			altRows: !0,
			gridview: !0,
			onselectrow: !1,
			colModel: l,
			pager: "#page",
			viewrecords: !0,
			multiselect: !0,
			cmTemplate: {
				sortable: !1
			},
			rowNum: 100,
			rowList: [100, 200, 500],
			shrinkToFit: !1,
			forceFit: !0,
			jsonReader: {
				root: "data.rows",
				records: "data.records",
				total: "data.total",
				repeatitems: !1,
				id: "id"
			},
			loadComplete: function(a) {
				if (a && 200 == a.status) {
					var b = {};
					a = a.data;
					for (var c = 0; c < a.rows.length; c++) {
						var d = a.rows[c];
						b[d.id] = d
					}
					$("#grid").data("gridData", b)
				}
			},
			loadError: function() {
				parent.Public.tips({
					type: 1,
					content: "操作失败了哦，请检查您的网络链接！"
				})
			},
			resizeStop: function(a, b) {
				j.setGridWidthByIndex(a, b, "grid")
			}
		}).navGrid("#page", {
			edit: !1,
			add: !1,
			del: !1,
			search: !1,
			refresh: !1
		}).navButtonAdd("#page", {
			caption: "",
			buttonicon: "ui-icon-config",
			onClickButton: function() {
				j.config()
			},
			position: "last"
		})
	}
	function c() {
		$_matchCon = $("#matchCon"), $_matchCon.placeholder(), $("#search").on("click", function(a) {
			a.preventDefault();
			var b = "按商品编号，商品名称，规格型号等查询" === $_matchCon.val() ? "" : $.trim($_matchCon.val()),
				c = $("#currentCategory").data("id");
			$("#grid").jqGrid("setGridParam", {
				page: 1,
				postData: {
					skey: b,
					assistId: c
				}
			}).trigger("reloadGrid")
		}), $("#btn-add").on("click", function(a) {
			a.preventDefault(), Business.verifyRight("INVENTORY_ADD") && h.operate("add")
		}), $("#btn-print").on("click", function(a) {
			a.preventDefault()
		}), $("#btn-import").on("click", function(a) {
			a.preventDefault(), Business.verifyRight("BaseData_IMPORT") && parent.$.dialog({
				width: 560,
				height: 300,
				title: "批量导入",
				content: "url:../import",
				lock: !0
			})
		}), $("#btn-export").on("click", function() {
			if (Business.verifyRight("INVENTORY_EXPORT")) {
				var a = "按商品编号，商品名称，规格型号等查询" === $_matchCon.val() ? "" : $.trim($_matchCon.val()),
					b = $("#currentCategory").data("id") || "";
				$(this).attr("href", "../basedata/inventory/exporter?action=exporter&isDelete=2&skey=" + a + "&assistId=" + b)
			}
		}), $("#grid").on("click", ".operating .ui-icon-pencil", function(a) {
			if (a.preventDefault(), Business.verifyRight("INVENTORY_UPDATE")) {
				var b = $(this).parent().data("id");
				h.operate("edit", b)
			}
		}), $("#grid").on("click", ".operating .ui-icon-trash", function(a) {
			if (a.preventDefault(), Business.verifyRight("INVENTORY_DELETE")) {
				var b = $(this).parent().data("id");
				h.del(b + "")
			}
		}), $("#grid").on("click", ".operating .ui-icon-pic", function(a) {
			a.preventDefault();
			var b = $(this).parent().data("id"),
				c = "商品图片";
			$.dialog({
				content: "url:../settings/fileUpload",
				data: {
					title: c,
					id: b,
					callback: function() {}
				},
				title: c,
				width: 775,
				height: 470,
				max: !1,
				min: !1,
				cache: !1,
				lock: !0
			})
		}), $("#btn-batchDel").click(function(a) {
			if (a.preventDefault(), Business.verifyRight("INVENTORY_DELETE")) {
				var b = $("#grid").jqGrid("getGridParam", "selarrrow");
				b.length ? h.del(b.join()) : parent.Public.tips({
					type: 2,
					content: "请选择需要删除的项"
				})
			}
		}), $("#btn-disable").click(function(a) {
			a.preventDefault();
			var b = $("#grid").jqGrid("getGridParam", "selarrrow").concat();
			return b && 0 != b.length ? void h.setStatuses(b, !0) : void parent.Public.tips({
				type: 1,
				content: " 请先选择要禁用的商品！"
			})
		}), $("#btn-enable").click(function(a) {
			a.preventDefault();
			var b = $("#grid").jqGrid("getGridParam", "selarrrow").concat();
			return b && 0 != b.length ? void h.setStatuses(b, !1) : void parent.Public.tips({
				type: 1,
				content: " 请先选择要启用的商品！"
			})
		}), $("#hideTree").click(function(a) {
			a.preventDefault();
			var b = $(this),
				c = b.html();
			"&gt;&gt;" === c ? (b.html("&lt;&lt;"), g = 0, $("#tree").hide(), Public.resizeGrid(f, g)) : (b.html("&gt;&gt;"), g = 270, $("#tree").show(), Public.resizeGrid(f, g))
		}), $("#grid").on("click", ".set-status", function(a) {
			if (a.stopPropagation(), a.preventDefault(), Business.verifyRight("INVLOCTION_UPDATE")) {
				var b = $(this).data("id"),
					c = !$(this).data("delete");
				h.setStatus(b, c)
			}
		}), $(window).resize(function() {
			Public.resizeGrid(f, g), $(".innerTree").height($("#tree").height() - 95)
		}), Public.setAutoHeight($("#tree")), $(".innerTree").height($("#tree").height() - 95)
	}
	var d = (parent.SYSTEM, Number(parent.SYSTEM.qtyPlaces), Number(parent.SYSTEM.pricePlaces)),
		e = Number(parent.SYSTEM.amountPlaces),
		f = 95,
		g = 270,
		h = {
			operate: function(a, b) {
				if ("add" == a) var c = "新增商品",
					d = {
						oper: a,
						callback: this.callback
					};
				else var c = "修改商品",
					d = {
						oper: a,
						rowId: b,
						callback: this.callback
					};
				var e = 768;
				_h = 480, $.dialog({
					title: c,
					content: "url:goods_manage",
					data: d,
					width: e,
					height: 430,
					max: !1,
					min: !1,
					cache: !1,
					lock: !0
				})
			},
			del: function(a) {
				$.dialog.confirm("删除的商品将不能恢复，请确认是否删除？", function() {
					Public.ajaxPost("../basedata/inventory/delete?action=delete", {
						id: a
					}, function(b) {
						if (b && 200 == b.status) {
							var c = b.data.id || [];
							parent.Public.tips({
								content: "成功删除个商品！"
							});
							for (var d = 0, e = c.length; e > d; d++) $("#grid").jqGrid("setSelection", c[d]), $("#grid").jqGrid("delRowData", c[d])
						} else parent.Public.tips({
							type: 1,
							content: "删除商品失败！" + b.msg
						})
					})
				})
			},
			setStatus: function(a, b) {
				a && Public.ajaxPost("../basedata/inventory/disable?action=disable", {
					invIds: a,
					disable: Number(b)
				}, function(c) {
					c && 200 == c.status ? (parent.Public.tips({
						content: "商品状态修改成功！"
					}), $("#grid").jqGrid("setCell", a, "delete", b)) : parent.Public.tips({
						type: 1,
						content: "商品状态修改失败！" + c.msg
					})
				})
			},
			setStatuses: function(a, b) {
				if (a && 0 != a.length) {
					var c = $("#grid").jqGrid("getGridParam", "selarrrow"),
						d = c.join();
					Public.ajaxPost("../basedata/inventory/disable?action=disable", {
						invIds: d,
						disable: Number(b)
					}, function(c) {
						if (c && 200 == c.status) {
							parent.Public.tips({
								content: "商品状态修改成功！"
							});
							for (var d = 0; d < a.length; d++) {
								var e = a[d];
								$("#grid").jqGrid("setCell", e, "delete", b)
							}
						} else parent.Public.tips({
							type: 1,
							content: "商品状态修改失败！" + c.msg
						})
					})
				}
			},
			callback: function(a, b, c) {
				var d = $("#grid").data("gridData");
				d || (d = {}, $("#grid").data("gridData", d)), d[a.id] = a, "edit" == b ? ($("#grid").jqGrid("setRowData", a.id, a), c && c.api.close()) : ($("#grid").jqGrid("addRowData", a.id, a, "last"), c && c.resetForm(a))
			}
		},
		i = {
			money: function(a) {
				var a = Public.numToCurrency(a);
				return a || "&#160;"
			},
			currentQty: function(a) {
				if ("none" == a) return "&#160;";
				var a = Public.numToCurrency(a);
				return a
			},
			quantity: function(a) {
				var a = Public.numToCurrency(a);
				return a || "&#160;"
			},
			statusFmatter: function(a, b, c) {
				var d = a === !0 ? "已禁用" : "已启用",
					e = a === !0 ? "ui-label-default" : "ui-label-success";
				return '<span class="set-status ui-label ' + e + '" data-delete="' + a + '" data-id="' + c.id + '">' + d + "</span>"
			}
		},
		j = Public.mod_PageConfig.init("goodsList");
	b(), a(), c()
});