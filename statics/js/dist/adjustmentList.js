var queryConditions = {
	matchCon: ""
},
	hiddenAmount = !1,
	SYSTEM = system = parent.SYSTEM,
	THISPAGE = {
		init: function() {
			SYSTEM.isAdmin !== !1 || SYSTEM.rights.AMOUNT_COSTAMOUNT || (hiddenAmount = !0), this.initDom(), this.loadGrid(), this.addEvent()
		},
		initDom: function() {
			this.$_matchCon = $("#matchCon"), this.$_beginDate = $("#beginDate").val(system.beginDate), this.$_endDate = $("#endDate").val(system.endDate), this.$_matchCon.placeholder(), this.$_beginDate.datepicker(), this.$_endDate.datepicker(), this.storageCombo = $("#storageA").combo({
				data: function() {
					return parent.parent.SYSTEM.storageInfo
				},
				text: "name",
				value: "id",
				width: 112,
				defaultSelected: 0,
				addOptions: {
					text: "(所有)",
					value: -1
				},
				cache: !1
			}).getCombo()
		},
		loadGrid: function() {
			function a(a, b, c) {
				var d = '<div class="operating" data-id="' + c.id + '"><span class="ui-icon ui-icon-pencil" title="修改"></span><span class="ui-icon ui-icon-trash" title="删除"></span></div>';
				return d
			}
			var b = Public.setGrid();
			queryConditions.beginDate = this.$_beginDate.val(), queryConditions.endDate = this.$_endDate.val(), $("#grid").jqGrid({
				url: "../scm/invOi/listCbtz?action=listCbtz&type=cbtz",
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
					width: 150,
					align: "center"
				}, {
					name: "amount",
					label: "金额",
					hidden: hiddenAmount,
					width: 100,
					align: "right",
					formatter: "currency"
				}, {
					name: "userName",
					label: "制单人",
					index: "userName",
					width: 80,
					fixed: !0,
					align: "center",
					title: !1
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
				url: "../scm/invOi/listCbtz?action=listCbtz&type=cbtz",
				datatype: "json",
				postData: a
			}).trigger("reloadGrid")
		},
		addEvent: function() {
			var a = this;
			$(".grid-wrap").on("click", ".ui-icon-pencil", function(a) {
				a.preventDefault();
				var b = $(this).parent().data("id");
				parent.tab.addTabItem({
					tabid: "storage-adjustment",
					text: "成本调整单",
					url: "../scm/invOi?action=editOi&type=cbtz&id=" + b
				});
				$("#grid").jqGrid("getDataIDs");
				parent.salesListIds = $("#grid").jqGrid("getDataIDs")
			}), $(".grid-wrap").on("click", ".ui-icon-trash", function(a) {
				if (a.preventDefault(), Business.verifyRight("CADJ_DELETE")) {
					var b = $(this).parent().data("id");
					$.dialog.confirm("您确定要删除该成本调整记录吗？", function() {
						Public.ajaxGet("../scm/invOi/deleteCbtz?action=deleteCbtz", {
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
				queryConditions.matchCon = "请输入单据号或客户名或备注" === a.$_matchCon.val() ? "" : a.$_matchCon.val(), queryConditions.beginDate = a.$_beginDate.val(), queryConditions.endDate = a.$_endDate.val(), queryConditions.locationId = a.storageCombo.getValue(), THISPAGE.reloadData(queryConditions)
			}), $("#moreCon").click(function() {
				queryConditions.matchCon = a.$_matchCon.val(), queryConditions.beginDate = a.$_beginDate.val(), queryConditions.endDate = a.$_endDate.val(), $.dialog({
					id: "moreCon",
					width: 480,
					height: 300,
					min: !1,
					max: !1,
					title: "高级搜索",
					button: [{
						name: "确定",
						focus: !0,
						callback: function() {
							var b = this.content.handle(queryConditions);
							THISPAGE.reloadData(b), "" !== b.matchCon && a.$_matchCon.val(b.matchCon), a.$_beginDate.val(b.beginDate), a.$_endDate.val(b.endDate)
						}
					}, {
						name: "取消"
					}],
					resize: !1,
					content: "url:../storage/other_search?type=other",
					data: queryConditions
				})
			}), $("#add").click(function(a) {
				a.preventDefault(), Business.verifyRight("CADJ_ADD") && parent.tab.addTabItem({
					tabid: "storage-adjustment",
					text: "成本调整单",
					url: "../scm/invOi?action=initOi&type=cbtz"
				})
			}), $(window).resize(function() {
				Public.resizeGrid()
			}), $(".wrapper").on("click", "#export", function(a) {
				if (!Business.verifyRight("CADJ_EXPORT")) return void a.preventDefault();
				var b = $("#grid").jqGrid("getGridParam", "selarrrow"),
					c = b.join(),
					d = c ? "&id=" + c : "";
				for (var e in queryConditions) queryConditions[e] && (d += "&" + e + "=" + queryConditions[e]);
				var f = "../scm/invOi/exportInvCadj?action=exportInvCadj" + d;
				$(this).attr("href", f)
			})
		}
	};
THISPAGE.init();