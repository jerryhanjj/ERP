var queryConditions = {
	matchCon: ""
},
	SYSTEM = system = parent.SYSTEM,
	hiddenAmount = !1,
	billRequiredCheck = system.billRequiredCheck,
	THISPAGE = {
		init: function() {
			SYSTEM.isAdmin !== !1 || SYSTEM.rights.AMOUNT_INAMOUNT || (hiddenAmount = !0), this.initDom(), this.loadGrid(), this.addEvent()
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
				return 150501 === a ? "购货" : (d.markRow.push(c.id), "退货")
			}
			var c = Public.setGrid(),
				d = this;
			queryConditions.beginDate = this.$_beginDate.val(), queryConditions.endDate = this.$_endDate.val(), d.markRow = [], $("#grid").jqGrid({
				//url: "/scm/invPo.do?action=list",
				url: "../scm/invPo?action=list",
				postData: queryConditions,
				datatype: "json",
				autowidth: !0,
				height: c.h,
				altRows: !0,
				gridview: !0,
				multiselect: !0,
				colModel: [{
					name: "operating",
					label: "操作",
					width: 60,
					fixed: !0,
					formatter: a,
					align: "center"
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
					width: 140,
					align: "center"
				}, {
					name: "transType",
					label: "业务类别",
					index: "transType",
					width: 80,
					formatter: b,
					align: "center"
				}, {
					name: "contactName",
					label: "供应商",
					index: "contactName",
					width: 180
				}, {
					name: "totalAmount",
					label: "购货金额",
					index: "totalAmount",
					hidden: hiddenAmount,
					width: 80,
					align: "right",
					formatter: "currency"
				}, {
					name: "totalQty",
					label: "数量",
					index: "totalQty",
					width: 70,
					align: "center"
				}, {
					name: "billStatusName",
					label: "订单状态",
					index: "billStatusName",
					width: 80,
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
					width: 70,
					title: !0,
					align: "center",
					classes: "ui-ellipsis"
				}, {
					name: "checkName",
					label: "审核人",
					index: "checkName",
					width: 70,
					title: !0,
					hidden: billRequiredCheck ? !1 : !0,
					fixed: !0,
					align: "center",
					classes: "ui-ellipsis"
				}, {
					name: "description",
					label: "备注",
					index: "description",
					width: 200,
					classes: "ui-ellipsis"
				}, {
					name: "disEditable",
					label: "不可编辑",
					index: "disEditable",
					hidden: !0
				}],
				cmTemplate: {
					sortable: !1,
					title: !1
				},
				page: 1,
				sortname: "number",
				sortorder: "desc",
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
				}
			})
		},
		reloadData: function(a) {
			this.markRow = [], $("#grid").jqGrid("setGridParam", {
				url: "../scm/invPo?action=list",
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
					tabid: "purchase-purchaseOrder",
					text: "购货订单",
					url: "../scm/invPo?action=editPo&id=" + b + "&flag=list" + d
				});
				$("#grid").jqGrid("getDataIDs");
				parent.cacheList.purchaseOrderId = $("#grid").jqGrid("getDataIDs")
			}), $(".grid-wrap").on("click", ".ui-icon-trash", function(a) {
				if (a.preventDefault(), Business.verifyRight("PO_DELETE")) {
					var b = $(this).parent().data("id");
					$.dialog.confirm("您确定要删除该购货记录吗？", function() {
						Public.ajaxGet("../scm/invPo/delete?action=delete", {
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
				a.preventDefault(), Business.verifyRight("PO_PRINT") && Public.print({
					title: "购货订单列表",
					$grid: $("#grid"),
					pdf: "../scm/invPo/toPdf?action=toPdf",
					billType: 10301,
					filterConditions: queryConditions
				})
			}), $(".wrapper").on("click", "#export", function(a) {
				if (!Business.verifyRight("PO_EXPORT")) return void a.preventDefault();
				var b = $("#grid").jqGrid("getGridParam", "selarrrow"),
					c = b.join(),
					d = c ? "&id=" + c : "";
				for (var e in queryConditions) queryConditions[e] && (d += "&" + e + "=" + queryConditions[e]);
				var f = "../scm/invPo/exportInvPo?action=exportInvPo" + d;
				$(this).attr("href", f)
			}), billRequiredCheck) {
				{
					$("#audit").css("display", "inline-block"), $("#reAudit").css("display", "inline-block")
				}
				$(".wrapper").on("click", "#audit", function(a) {
					a.preventDefault();
					var b = $("#grid").jqGrid("getGridParam", "selarrrow"),
						c = b.join();
					return c ? void Public.ajaxPost("../scm/invPo/batchCheckInvPo?action=batchCheckInvPo", {
						id: c
					}, function(a) {
						if (200 === a.status) {
							for (var c = 0, d = b.length; d > c; c++) $("#grid").setCell(b[c], "checkName", system.realName);
							parent.Public.tips({
								content: "审核成功！"
							})
						} else parent.Public.tips({
							type: 1,
							content: a.msg
						})
					}) : void parent.Public.tips({
						type: 2,
						content: "请先选择需要审核的项！"
					})
				}), $(".wrapper").on("click", "#reAudit", function(a) {
					a.preventDefault();
					var b = $("#grid").jqGrid("getGridParam", "selarrrow"),
						c = b.join();
					return c ? void Public.ajaxPost("../scm/invPo/rsBatchCheckInvPo?action=rsBatchCheckInvPo", {
						id: c
					}, function(a) {
						if (200 === a.status) {
							for (var c = 0, d = b.length; d > c; c++) $("#grid").setCell(b[c], "checkName", "&#160;");
							parent.Public.tips({
								content: "反审核成功！"
							})
						} else parent.Public.tips({
							type: 1,
							content: a.msg
						})
					}) : void parent.Public.tips({
						type: 2,
						content: "请先选择需要反审核的项！"
					})
				})
			}
			$("#search").click(function() {
				queryConditions.matchCon = "请输入单据号或供应商或备注" === a.$_matchCon.val() ? "" : a.$_matchCon.val(), queryConditions.beginDate = a.$_beginDate.val(), queryConditions.endDate = a.$_endDate.val(), THISPAGE.reloadData(queryConditions)
			}), $("#add").click(function(a) {
				a.preventDefault(), Business.verifyRight("PO_ADD") && parent.tab.addTabItem({
					tabid: "purchase-purchaseOrder",
					text: "购货订单",
					url: "../scm/invPo?action=initPo"
				})
			}), $(window).resize(function() {
				Public.resizeGrid()
			})
		}
	};
THISPAGE.init();