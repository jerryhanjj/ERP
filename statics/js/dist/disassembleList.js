var queryConditions = {
	matchCon: ""
},
	system = parent.SYSTEM,
	qtyPlaces = Number(parent.SYSTEM.qtyPlaces),
	pricePlaces = Number(parent.SYSTEM.pricePlaces),
	amountPlaces = Number(parent.SYSTEM.amountPlaces),
	hiddenAmount = !1;
system.isAdmin !== !1 || system.rights.AMOUNT_COSTAMOUNT || (hiddenAmount = !0);
var THISPAGE = {
	init: function() {
		this.initDom(), this.loadGrid(), this.addEvent()
	},
	initDom: function() {
		this.$_matchCon = $("#matchCon"), this.$_beginDate = $("#beginDate").val(system.beginDate), this.$_endDate = $("#endDate").val(system.endDate), this.$_matchCon.placeholder(), this.$_beginDate.datepicker(), this.$_endDate.datepicker()
	},
	loadGrid: function() {
		function a(a, b, c) {
			var d = '<div class="operating" data-id="' + c.id + '"><span class="ui-icon ui-icon-pencil" title="修改"></span><span class="ui-icon ui-icon-trash" title="删除"></span></div>';
			return d
		}
		function b(a, b) {
			var c;
			if (c = "unitCosts" === b.colModel.name && a ? $.map(a, function(a) {
				return Number(a).toFixed(pricePlaces)
			}) : "costs" === b.colModel.name && a ? $.map(a, function(a) {
				return Number(a).toFixed(amountPlaces)
			}) : a) var d = c.join('<p class="line" />');
			return d || "&#160;"
		}
		var c = Public.setGrid();
		queryConditions.beginDate = this.$_beginDate.val(), queryConditions.endDate = this.$_endDate.val(), $("#grid").jqGrid({
			url: "/scm/invOi.do?action=listCx&type=cx",
			postData: queryConditions,
			datatype: "json",
			autowidth: !0,
			height: c.h,
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
				align: "center",
				title: !1
			}, {
				name: "billDate",
				label: "单据日期",
				width: 80,
				align: "center",
				title: !1
			}, {
				name: "billNo",
				label: "单据编号",
				width: 120,
				align: "center",
				title: !1
			}, {
				name: "good",
				label: "组合件",
				width: 200,
				title: !0,
				classes: "ui-ellipsis"
			}, {
				name: "qty",
				label: "组合件数量",
				width: 80,
				title: !1
			}, {
				name: "mainUnit",
				label: "单位",
				width: 35,
				title: !1,
				align: "center"
			}, {
				name: "unitCost",
				label: "组合件单位成本",
				width: 100,
				title: !1,
				align: "right",
				formatter: "currency",
				formatoptions: {
					showZero: !0,
					decimalPlaces: pricePlaces
				},
				hidden: hiddenAmount
			}, {
				name: "cost",
				label: "组合件成本",
				width: 80,
				title: !1,
				align: "right",
				hidden: hiddenAmount
			}, {
				name: "goods",
				label: "子件",
				index: "userName",
				formatter: b,
				width: 200,
				fixed: !0,
				title: !0,
				classes: "ui-ellipsis"
			}, {
				name: "qtys",
				label: "子件数量",
				width: 80,
				formatter: b,
				classes: "ui-ellipsis"
			}, {
				name: "mainUnits",
				label: "单位",
				width: 35,
				formatter: b,
				align: "center"
			}, {
				name: "unitCosts",
				label: "子件单位成本",
				width: 100,
				formatter: b,
				classes: "ui-ellipsis",
				align: "right",
				hidden: hiddenAmount
			}, {
				name: "costs",
				label: "子件成本",
				width: 80,
				formatter: b,
				classes: "ui-ellipsis",
				align: "right",
				hidden: hiddenAmount
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
			url: "/scm/invOi.do?action=listCx&type=cx",
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
				tabid: "storage-disassemble",
				text: "拆卸单",
				url: "/storage/disassemble.jsp?id=" + b
			});
			$("#grid").jqGrid("getDataIDs");
			parent.salesListIds = $("#grid").jqGrid("getDataIDs")
		}), $(".grid-wrap").on("click", ".ui-icon-trash", function(a) {
			if (a.preventDefault(), Business.verifyRight("CXD_DELETE")) {
				var b = $(this).parent().data("id");
				$.dialog.confirm("您确定要删除该拆卸记录吗？", function() {
					Public.ajaxGet("/scm/invOi.do?action=deleteCx", {
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
			queryConditions.matchCon = "请输入单据号或备注" === a.$_matchCon.val() ? "" : a.$_matchCon.val(), queryConditions.beginDate = a.$_beginDate.val(), queryConditions.endDate = a.$_endDate.val(), THISPAGE.reloadData(queryConditions)
		}), $("#moreCon").click(function() {
			queryConditions.matchCon = a.$_matchCon.val(), queryConditions.beginDate = a.$_beginDate.val(), queryConditions.endDate = a.$_endDate.val(), $.dialog({
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
						queryConditions = this.content.handle(queryConditions), THISPAGE.reloadData(queryConditions), a.$_matchCon.val("" !== queryConditions.matchCon ? queryConditions.matchCon : "请输入单据号或备注"), a.$_beginDate.val(queryConditions.beginDate), a.$_endDate.val(queryConditions.endDate)
					}
				}, {
					name: "取消"
				}],
				resize: !1,
				content: "url:/storage/assemble-search.jsp?type=transfers",
				data: queryConditions
			})
		}), $(".wrapper").on("click", "#print", function(a) {
			a.preventDefault(), Business.verifyRight("CXD_PRINT") && Public.print({
				title: "拆卸单列表",
				$grid: $("#grid"),
				pdf: "/scm/invOi.do?action=toCxdPdf",
				billType: 10429,
				filterConditions: queryConditions
			})
		}), $("#add").click(function(a) {
			a.preventDefault(), Business.verifyRight("CXD_ADD") && parent.tab.addTabItem({
				tabid: "storage-disassemble",
				text: "拆卸单",
				url: "/scm/invOi.do?action=initOi&type=cx"
			})
		}), $(window).resize(function() {
			Public.resizeGrid()
		}), $(".wrapper").on("click", "#export", function(a) {
			if (!Business.verifyRight("CXD_EXPORT")) return void a.preventDefault();
			var b = $("#grid").jqGrid("getGridParam", "selarrrow"),
				c = b.join(),
				d = c ? "&id=" + c : "";
			for (var e in queryConditions) queryConditions[e] && (d += "&" + e + "=" + queryConditions[e]);
			var f = "/scm/invOi.do?action=exportInvCxd" + d;
			$(this).attr("href", f)
		})
	}
};
THISPAGE.init();