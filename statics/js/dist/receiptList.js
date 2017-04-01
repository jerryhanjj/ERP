var queryConditions = {
	matchCon: ""
},
	SYSTEM = parent.SYSTEM,
	//VERSION = parent.SYSTEM.siType,
	VERSION = 1,
	billRequiredCheck = SYSTEM.billRequiredCheck,
	THISPAGE = {
		init: function() {
			this.initDom(), this.loadGrid(), this.addEvent()
		},
		initDom: function() {
			this.$_matchCon = $("#matchCon"), this.$_beginDate = $("#beginDate").val(SYSTEM.beginDate), this.$_endDate = $("#endDate").val(SYSTEM.endDate), this.$_matchCon.placeholder(), this.$_beginDate.datepicker(), this.$_endDate.datepicker()
		},
		loadGrid: function() {
			function a(a, b, c) {
				var d = '<div class="operating" data-id="' + c.id + '"><span class="ui-icon ui-icon-pencil" title="修改"></span><span class="ui-icon ui-icon-trash" title="删除"></span></div>';
				return d
			}
			var b = $(window).height() - $(".grid-wrap").offset().top - 65,
				c = this,
				d = [{
					name: "operating",
					label: "操作",
					width: 60,
					fixed: !0,
					formatter: a,
					align: "center"
				}, {
					name: "billDate",
					label: "单据日期",
					index: "billDate",
					width: 100,
					align: "center"
				}, {
					name: "billNo",
					label: "单据编号",
					index: "billNo",
					width: 120,
					align: "center"
				}, {
					name: "contactName",
					label: "销货单位",
					index: "contactName",
					width: 200
				}, {
					name: "amount",
					label: "收款金额",
					index: "amount",
					width: 100,
					align: "right",
					formatter: "currency"
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
				}];
			switch (VERSION) {
			case 1:
				break;
			case 2:
				d = d.concat([{
					name: "bDeAmount",
					label: "本次核销金额",
					index: "hxAmount",
					width: 100,
					align: "right",
					formatter: "currency"
				}, {
					name: "adjustRate",
					label: "整单折扣",
					index: "adjustRate",
					width: 100,
					align: "right",
					formatter: "currency"
				}, {
					name: "deAmount",
					label: "本次预收款",
					index: "deAmount",
					width: 100,
					align: "right",
					formatter: "currency"
				}])
			}
			d.push({
				name: "description",
				label: "备注",
				index: "description",
				width: 200,
				classes: "ui-ellipsis"
			}), queryConditions.beginDate = this.$_beginDate.val(), queryConditions.endDate = this.$_endDate.val(), c.markRow = [], $("#grid").jqGrid({
				url: "../scm/receipt?action=list",
				postData: queryConditions,
				datatype: "json",
				autowidth: !0,
				height: b,
				altRows: !0,
				rownumbers: !0,
				gridview: !0,
				colModel: d,
				cmTemplate: {
					sortable: !1,
					title: !1
				},
				multiselect: !0,
				page: 1,
				sortname: "number",
				sortorder: "desc",
				pager: "#page",
				rowNum: 2e3,
				rowList: [300, 500, 1e3],
				scroll: 1,
				loadonce: !0,
				viewrecords: !0,
				shrinkToFit: !1,
				forceFit: !1,
				jsonReader: {
					root: "data.rows",
					records: "data.records",
					repeatitems: !1,
					id: "id"
				},
				loadComplete: function() {
					var a = c.markRow.length;
					if (a > 0) for (var b = 0; a > b; b++) $("#" + c.markRow[b]).addClass("red")
				},
				loadError: function() {},
				ondblClickRow: function(a) {
					$("#" + a).find(".ui-icon-pencil").trigger("click")
				}
			})
		},
		reloadData: function(a) {
			this.markRow = [], $("#grid").jqGrid("setGridParam", {
				url: "../scm/receipt?action=list",
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
					tabid: "money-receipt",
					text: "收款单",
					url: "../scm/receipt?action=editReceipt&id=" + b
				});
				$("#grid").jqGrid("getDataIDs");
				parent.receiptListIds = $("#grid").jqGrid("getDataIDs")
			}), $(".grid-wrap").on("click", ".ui-icon-trash", function(a) {
				if (a.preventDefault(), Business.verifyRight("RECEIPT_DELETE")) {
					var b = $(this).parent().data("id");
					$.dialog.confirm("您确定要删除该收款记录吗？", function() {
						Public.ajaxGet("../scm/receipt/delete?action=delete", {
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
			}), $("#search").click(function() {
				queryConditions.matchCon = "请输入单据号或客户或备注" === a.$_matchCon.val() ? "" : a.$_matchCon.val(), queryConditions.beginDate = a.$_beginDate.val(), queryConditions.endDate = a.$_endDate.val(), THISPAGE.reloadData(queryConditions)
			}), $("#refresh").click(function() {
				THISPAGE.reloadData(queryConditions)
			}), $("#add").click(function(a) {
				a.preventDefault(), Business.verifyRight("RECEIPT_ADD") && parent.tab.addTabItem({
					tabid: "money-receipt",
					text: "收款单",
					url: "../scm/receipt?action=initReceipt"
				})
			}), billRequiredCheck) {
				{
					$("#audit").css("display", "inline-block"), $("#reAudit").css("display", "inline-block")
				}
				$(".wrapper").on("click", "#audit", function(a) {
					if (a.preventDefault(), Business.verifyRight("RECEIPT_CHECK")) {
						var b = $("#grid").jqGrid("getGridParam", "selarrrow"),
							c = b.join();
						return c ? void Public.ajaxPost("../scm/receipt/batchCheckReceipt?action=batchCheckReceipt", {
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
					}
				}), $(".wrapper").on("click", "#reAudit", function(a) {
					if (a.preventDefault(), Business.verifyRight("RECEIPT_UNCHECK")) {
						var b = $("#grid").jqGrid("getGridParam", "selarrrow"),
							c = b.join();
						return c ? void Public.ajaxPost("../scm/receipt/rsbatchCheckReceipt?action=rsbatchCheckReceipt", {
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
					}
				})
			}
			$("#export").click(function(a) {
				if (!Business.verifyRight("RECEIPT_EXPORT")) return void a.preventDefault();
				var b = $("#grid").jqGrid("getGridParam", "selarrrow"),
					c = b.join(),
					d = c ? "&id=" + c : "";
				for (var e in queryConditions) queryConditions[e] && (d += "&" + e + "=" + queryConditions[e]);
				var f = "../scm/receipt/exportReceipt?action=exportReceipt" + d;
				$(this).attr("href", f)
			}), $(window).resize(function() {
				Public.resizeGrid()
			})
		}
	};
THISPAGE.init();


 