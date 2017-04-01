var queryConditions = {
	matchCon: ""
},
	SYSTEM = system = parent.SYSTEM,
	hiddenAmount = !1,
	billRequiredCheck = system.billRequiredCheck,
	THISPAGE = {
		init: function() {
			SYSTEM.isAdmin !== !1 || SYSTEM.rights.AMOUNT_OUTAMOUNT || (hiddenAmount = !0), this.mod_PageConfig = Public.mod_PageConfig.init("salesOrderList"), this.initDom(), this.loadGrid(), this.addEvent()
		},
		initDom: function() {
			this.$_matchCon = $("#matchCon"), this.$_beginDate = $("#beginDate").val(system.beginDate), this.$_endDate = $("#endDate").val(system.endDate), this.$_matchCon.placeholder(), this.$_beginDate.datepicker(), this.$_endDate.datepicker()
		},
		loadGrid: function() {
			function a(a, b, c) {
				var d = '<div class="operating" data-id="' + c.id + '"><a class="ui-icon ui-icon-pencil" title="修改"></a><a class="ui-icon ui-icon-trash" title="删除"></a></div>';
				return d
			}
			function b(a, b, c) {
				return 150601 === a ? "销货" : (d.markRow.push(c.id), "退货")
			}
			var c = Public.setGrid(),
				d = this;
			queryConditions.beginDate = this.$_beginDate.val(), queryConditions.endDate = this.$_endDate.val(), d.markRow = [];
			var e = [{
				name: "operating",
				label: "操作",
				width: 60,
				fixed: !0,
				formatter: a,
				align: "center",
				sortable: !1
			}, {
				name: "billDate",
				label: "订单日期",
				index: "billDate",
				width: 100,
				align: "center"
			}, {
				name: "billNo",
				label: "订单编号",
				index: "billNo",
				width: 120,
				align: "center"
			}, {
				name: "transType",
				label: "业务类别",
				index: "transType",
				width: 100,
				formatter: b,
				align: "center"
			}, {
				name: "salesName",
				label: "销售人员",
				width: 80
			}, {
				name: "contactName",
				label: "客户",
				index: "contactName",
				width: 200
			}, {
				name: "totalAmount",
				label: "销售金额",
				hidden: hiddenAmount,
				index: "totalAmount",
				width: 100,
				align: "right",
				formatter: "currency"
			}, {
				name: "totalQty",
				label: "数量",
				index: "totalQty",
				width: 80,
				align: "center"
			}, {
				name: "billStatusName",
				label: "订单状态",
				index: "billStatusName",
				width: 100,
				align: "center"
			}, {
				name: "deliveryDate",
				label: "交货日期",
				index: "deliveryDate",
				width: 100,
				align: "center"
			}, {
				name: "userName",
				label: "制单人",
				index: "userName",
				width: 80,
				title: !0,
				align: "center",
				classes: "ui-ellipsis"
			}, {
				name: "checkName",
				label: "审核人",
				index: "checkName",
				width: 80,
				hidden: billRequiredCheck ? !1 : !0,
				fixed: !0,
				align: "center",
				title: !0,
				classes: "ui-ellipsis"
			}, {
				name: "description",
				label: "备注",
				index: "description",
				width: 200,
				title: !0,
				sortable: !1
			}, {
				name: "disEditable",
				label: "不可编辑",
				index: "disEditable",
				hidden: !0
			}];
			this.mod_PageConfig.gridReg("grid", e), e = this.mod_PageConfig.conf.grids.grid.colModel, $("#grid").jqGrid({
				url: "../scm/invSo?action=list",
				postData: queryConditions,
				datatype: "json",
				autowidth: !0,
				height: c.h,
				altRows: !0,
				gridview: !0,
				multiselect: !0,
				colModel: e,
				cmTemplate: {
					sortable: !1,
					title: !1
				},
				page: 1,
				pager: "#page",
				rowNum: 100,
				rowList: [100, 200, 500],
				viewrecords: !0,
				shrinkToFit: !1,
				forceFit: !1,
				jsonReader: {
					root: "data.rows",
					records: "data.records",
					total: "data.total",
					repeatitems: !1,
					id: "id"
				},
				loadComplete: function() {
					var a = d.markRow.length;
					if (a > 0) for (var b = 0; a > b; b++) $("#" + d.markRow[b]).addClass("red")
				},
				loadError: function() {},
				ondblClickRow: function(a) {
					$("#" + a).find(".ui-icon-pencil").trigger("click")
				},
				resizeStop: function(a, b) {
					THISPAGE.mod_PageConfig.setGridWidthByIndex(a, b, "grid")
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
					THISPAGE.mod_PageConfig.config()
				},
				position: "last"
			})
		},
		reloadData: function(a) {
			this.markRow = [], $("#grid").jqGrid("setGridParam", {
				url: "../scm/invSo?action=list",
				datatype: "json",
				postData: a
			}).trigger("reloadGrid")
		},
		addEvent: function() {
			var a = this;
			if ($(".grid-wrap").on("click", ".ui-icon-pencil", function(a) {
				a.preventDefault();
				var b = $(this).parent().data("id"),
					c = $("#grid").jqGrid("getRowData", b),
					d = 1 == c.disEditable ? "&disEditable=true" : "";
				parent.tab.addTabItem({
					tabid: "sales-salesOrder",
					text: "销货订单",
					url: "../scm/invSo?action=editSo&id=" + b + "&flag=list" + d
				});
				$("#grid").jqGrid("getDataIDs");
				parent.cacheList.salesOrderId = $("#grid").jqGrid("getDataIDs")
			}), $(".grid-wrap").on("click", ".ui-icon-trash", function(a) {
				if (a.preventDefault(), Business.verifyRight("SO_DELETE")) {
					var b = $(this).parent().data("id");
					$.dialog.confirm("您确定要删除该销货记录吗？", function() {
						Public.ajaxGet("../scm/invSo/delete?action=delete", {
							id: b
						}, function(a) {
							200 === a.status ? ($("#grid").jqGrid("delRowData", b), parent.Public.tips({
								content: "删除成功！"
							})) : parent.Public.tips({
								type: 1,
								content: a.msg
							})
						})
					})
				}
			}), $(".wrapper").on("click", "#print", function(a) {
				a.preventDefault(), Business.verifyRight("SO_PRINT") && Public.print({
					title: "购货单列表",
					$grid: $("#grid"),
					pdf: "../scm/invSo/toPdf?action=toPdf",
					billType: 10303,
					filterConditions: queryConditions
				})
			}), $(".wrapper").on("click", "#import", function(a) {
				a.preventDefault(), Business.verifyRight("SO_导入") && parent.$.dialog({
					width: 560,
					height: 300,
					title: "批量导入",
					content: "url:../sales/import?type=so",
					lock: !0
				})
			}), $(".wrapper").on("click", "#export", function(a) {
				if (!Business.verifyRight("SO_EXPORT")) return void a.preventDefault();
				var b = $("#grid").jqGrid("getGridParam", "selarrrow"),
					c = b.join(),
					d = c ? "&id=" + c : "";
				for (var e in queryConditions) queryConditions[e] && (d += "&" + e + "=" + queryConditions[e]);
				var f = "../scm/invSo/exportInvSo?action=exportInvSo" + d;
				$(this).attr("href", f)
			}), billRequiredCheck) {
				{
					$("#audit").css("display", "inline-block"), $("#reAudit").css("display", "inline-block")
				}
				$(".wrapper").on("click", "#audit", function(a) {
					a.preventDefault();
					var b = $("#grid").jqGrid("getGridParam", "selarrrow"),
						c = b.join();
					return c ? void Public.ajaxPost("../scm/invSo/batchCheckInvSo?action=batchCheckInvSo", {
						id: c
					}, function(a) {
						parent.Public.tips(200 === a.status ? {
							content: a.msg
						} : {
							type: 1,
							content: a.msg
						}), $("#search").trigger("click")
					}) : void parent.Public.tips({
						type: 2,
						content: "请先选择需要审核的项！"
					})
				}), $(".wrapper").on("click", "#reAudit", function(a) {
					a.preventDefault();
					var b = $("#grid").jqGrid("getGridParam", "selarrrow"),
						c = b.join();
					return c ? void Public.ajaxPost("../scm/invSo/rsBatchCheckInvSo?action=rsBatchCheckInvSo", {
						id: c
					}, function(a) {
						parent.Public.tips(200 === a.status ? {
							content: a.msg
						} : {
							type: 1,
							content: a.msg
						}), $("#search").trigger("click")
					}) : void parent.Public.tips({
						type: 2,
						content: "请先选择需要反审核的项！"
					})
				})
			}
			$("#search").click(function() {
				queryConditions.salesId = null, queryConditions.matchCon = "请输入单据号或客户名或备注" === a.$_matchCon.val() ? "" : $.trim(a.$_matchCon.val()), queryConditions.beginDate = a.$_beginDate.val(), queryConditions.endDate = a.$_endDate.val(), THISPAGE.reloadData(queryConditions)
			}), $("#moreCon").click(function() {
				queryConditions.matchCon = a.$_matchCon.val(), queryConditions.beginDate = a.$_beginDate.val(), queryConditions.endDate = a.$_endDate.val(), $.dialog({
					id: "moreCon",
					lock: !0,
					width: 480,
					height: 300,
					min: !1,
					max: !1,
					title: "高级搜索",
					button: [{
						name: "确定",
						focus: !0,
						callback: function() {
							queryConditions = this.content.handle(), THISPAGE.reloadData(queryConditions), "" !== queryConditions.matchCon && a.$_matchCon.val(queryConditions.matchCon), a.$_beginDate.val(queryConditions.beginDate), a.$_endDate.val(queryConditions.endDate)
						}
					}, {
						name: "取消"
					}],
					resize: !1,
					content: "url:../sales/sales_search?type=sales",
					data: queryConditions
				})
			}), $("#refresh").click(function() {
				THISPAGE.reloadData(queryConditions)
			}), $("#add").click(function(a) {
				a.preventDefault(), Business.verifyRight("SO_ADD") && parent.tab.addTabItem({
					tabid: "sales-salesOrder",
					text: "销售订单",
					url: "../scm/invSo?action=initSo"
				})
			}), $(window).resize(function() {
				Public.resizeGrid()
			})
		}
	};
$(function() {
	THISPAGE.init()
});