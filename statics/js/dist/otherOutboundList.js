var queryConditions = {
	matchCon: "",
	locationId: -1,
	transTypeId: -1
},
	hiddenAmount = !1,
	SYSTEM = system = parent.SYSTEM,
	billRequiredCheck = system.billRequiredCheck,
	THISPAGE = {
		init: function() {
			SYSTEM.isAdmin !== !1 || SYSTEM.rights.AMOUNT_COSTAMOUNT || (hiddenAmount = !0), this.initDom(), this.loadGrid(), this.addEvent()
		},
		initDom: function() {
			this.$_matchCon = $("#matchCon"), this.$_beginDate = $("#beginDate").val(system.beginDate), this.$_endDate = $("#endDate").val(system.endDate), this.$_matchCon.placeholder(), this.$_beginDate.datepicker(), this.$_endDate.datepicker()
		},
		loadGrid: function() {
			function a(a, b, c) {
				var d = '<div class="operating" data-id="' + c.id + '"><span class="ui-icon ui-icon-pencil" title="修改"></span><span class="ui-icon ui-icon-trash" title="删除"></span></div>';
				return d
			}
			var b = Public.setGrid();
			queryConditions.beginDate = this.$_beginDate.val(), queryConditions.endDate = this.$_endDate.val(), $("#grid").jqGrid({
				url: "../scm/invOi/listOut?action=listOut&type=out",
				postData: queryConditions,
				datatype: "json",
				autowidth: !0,
				height: b.h,
				altRows: !0,
				gridview: !0,
				multiselect: !0,
				multiboxonly: !0,
				colModel: [{
					name: "operating",
					label: "操作",
					width: 60,
					fixed: !0,
					formatter: a,
					align: "center"
				}, {
					name: "billDate",
					label: "单据日期",
					width: 100,
					align: "center"
				}, {
					name: "billNo",
					label: "单据编号",
					width: 120,
					align: "center"
				}, {
					name: "transTypeName",
					label: "业务类别",
					width: 150
				}, {
					name: "amount",
					label: "金额",
					hidden: hiddenAmount,
					width: 100,
					align: "right",
					formatter: "currency"
				}, {
					name: "contactName",
					label: "客户",
					width: 200
				}, {
					name: "userName",
					label: "制单人",
					index: "userName",
					width: 80,
					fixed: !0,
					align: "center",
					title: !1
				}, {
					name: "checkName",
					label: "审核人",
					width: 80,
					hidden: billRequiredCheck ? !1 : !0,
					fixed: !0,
					align: "center",
					title: !0,
					classes: "ui-ellipsis"
				}, {
					name: "description",
					label: "备注",
					width: 200,
					classes: "ui-ellipsis"
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
					repeatitems: !1,
					total: "data.total",
					id: "id"
				},
				loadError: function() {},
				ondblClickRow: function(a) {
					$("#" + a).find(".ui-icon-pencil").trigger("click")
				}
			})
		},
		reloadData: function(a) {
			$("#grid").jqGrid("setGridParam", {
				url: "../scm/invOi/listOut?action=listOut&type=out",
				datatype: "json",
				postData: a
			}).trigger("reloadGrid")
		},
		addEvent: function() {
			var a = this;
			if ($(".grid-wrap").on("click", ".ui-icon-pencil", function(a) {
				a.preventDefault();
				var b = $(this).parent().data("id");
				parent.tab.addTabItem({
					tabid: "storage-otherOutbound",
					text: "其他出库",
					url: "../scm/invOi?action=editOi&type=out&id=" + b
				});
				$("#grid").jqGrid("getDataIDs");
				parent.salesListIds = $("#grid").jqGrid("getDataIDs")
			}), $(".grid-wrap").on("click", ".ui-icon-trash", function(a) {
				if (a.preventDefault(), Business.verifyRight("OO_DELETE")) {
					var b = $(this).parent().data("id");
					$.dialog.confirm("您确定要删除该出库记录吗？", function() {
						Public.ajaxGet("../scm/invOi/deleteOut?action=deleteOut", {
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
			}), billRequiredCheck) {
				{
					$("#audit").css("display", "inline-block"), $("#reAudit").css("display", "inline-block")
				}
				$(".wrapper").on("click", "#audit", function(a) {
					if (a.preventDefault(), Business.verifyRight("OO_CHECK")) {
						var b = $("#grid").jqGrid("getGridParam", "selarrrow"),
							c = b.join();
						return c ? void Public.ajaxPost("../scm/invOi/batchCheckInvOo?action=batchCheckInvOo", {
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
					}
				}), $(".wrapper").on("click", "#reAudit", function(a) {
					if (a.preventDefault(), Business.verifyRight("OO_UNCHECK")) {
						var b = $("#grid").jqGrid("getGridParam", "selarrrow"),
							c = b.join();
						return c ? void Public.ajaxPost("../scm/invOi/rsBatchCheckInvOo?action=rsBatchCheckInvOo", {
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
					}
				})
			}
			$("#search").click(function() {
				queryConditions.matchCon = "请输入单据号或客户名或备注" === a.$_matchCon.val() ? "" : a.$_matchCon.val(), queryConditions.beginDate = a.$_beginDate.val(), queryConditions.endDate = a.$_endDate.val(), queryConditions.locationId = -1, queryConditions.transTypeId = -1, THISPAGE.reloadData(queryConditions)
			}), $("#moreCon").click(function() {
				queryConditions.matchCon = "请输入单据号或客户名或备注" === a.$_matchCon.val() ? "" : a.$_matchCon.val(), queryConditions.beginDate = a.$_beginDate.val(), queryConditions.endDate = a.$_endDate.val(), $.dialog({
					id: "moreCon",
					width: 480,
					height: 330,
					min: !1,
					max: !1,
					title: "高级搜索",
					button: [{
						name: "确定",
						focus: !0,
						callback: function() {
							queryConditions = this.content.handle(queryConditions), THISPAGE.reloadData(queryConditions), "" !== queryConditions.matchCon && a.$_matchCon.val(queryConditions.matchCon), a.$_beginDate.val(queryConditions.beginDate), a.$_endDate.val(queryConditions.endDate)
						}
					}, {
						name: "取消"
					}],
					resize: !1,
					content: "url:../storage/other_search?type=other&diff=outbound",
					data: queryConditions
				})
			}), $("#add").click(function(a) {
				a.preventDefault(), Business.verifyRight("OO_ADD") && parent.tab.addTabItem({
					tabid: "storage-otherOutbound",
					text: "其他出库",
					url: "../scm/invOi?action=initOi&type=out"
				})
			}), $(window).resize(function() {
				Public.resizeGrid()
			}), $(".wrapper").on("click", "#export", function(a) {
				if (!Business.verifyRight("OO_EXPORT")) return void a.preventDefault();
				var b = $("#grid").jqGrid("getGridParam", "selarrrow"),
					c = b.join(),
					d = c ? "&id=" + c : "";
				for (var e in queryConditions) queryConditions[e] && (d += "&" + e + "=" + queryConditions[e]);
				var f = "../scm/invOi/exportInvOo?action=exportInvOo" + d;
				$(this).attr("href", f)
			})
		}
	};
THISPAGE.init();