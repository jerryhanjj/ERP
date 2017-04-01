var queryConditions = {
	fromDate: "",
	toDate: "",
	type: "",
	user: ""
},
	SYSTEM = parent.SYSTEM,
	THISPAGE = {
		init: function() {
			this.initDom(), this.loadGrid(), this.addEvent()
		},
		initDom: function() {
			this.$_beginDate = $("#beginDate").val(SYSTEM.beginDate), this.$_endDate = $("#endDate").val(SYSTEM.endDate), this.$_beginDate.datepicker(), this.$_endDate.datepicker(), queryConditions.fromDate = this.$_beginDate.val(), queryConditions.toDate = this.$_endDate.val(), this.initFilter(queryConditions)
		},
		initFilter: function(a) {
			function b(a, b) {
				var c = "<strong>" + a + "</strong>";
				a != b && (c += " 至 <strong>" + b + "</strong>"), $("#selected-date").html(c)
			}
			var c = this;
			c.userCombo = $("#user").combo({
				text: "name",
				value: "userid",
				width: 240,
				data: "../basedata/log/queryAllUser?action=queryAllUser",
				ajaxOptions: {
					formatData: function(a) {
						return a.data.items.unshift({
							userid: "",
							name: "所有用户"
						}), a.data.items
					}
				}
			}).getCombo(), c.typeCombo = $("#type").combo({
				text: "operateTypeName",
				value: "indexid",
				width: 240,
				data: "../basedata/log/queryAllOperateType?action=queryAllOperateType",
				ajaxOptions: {
					formatData: function(a) {
						return a.data.items.unshift({
							operateTypeName: "所有操作",
							indexid: ""
						}), a.data.items
					}
				}
			}).getCombo(), b(a.fromDate, a.toDate), Business.moreFilterEvent(), $("#conditions-trigger").trigger("click"), $("#filter-submit").on("click", function(a) {
				a.preventDefault();
				var d = c.$_beginDate.val(),
					e = c.$_endDate.val();
				if (new Date(d).getTime() > new Date(e).getTime()) return void parent.Public.tips({
					type: 2,
					content: "开始日期不能大于结束日期！"
				});
				var f = c.userCombo.getText();
				queryConditions = {
					fromDate: d,
					toDate: e,
					user: "所有用户" === f ? "" : f
					//user: "所有用户" === f ? "" : f,
					//type: c.typeCombo.getValue()
				}, $("#grid").jqGrid("setGridParam", {
					url: "../basedata/log?action=list",
					page: 1,
					postData: queryConditions,
					datatype: "json"
				}).trigger("reloadGrid"), $("#filter-menu").removeClass("ui-btn-menu-cur"), b(d, e)
			}), $("#filter-reset").on("click", function(a) {
				a.preventDefault(), c.$_beginDate.val(""), c.$_endDate.val(""), c.userCombo.selectByIndex(0), c.typeCombo.selectByIndex(0)
			})
		},
		loadGrid: function() {
			var a = Public.setGrid();
			$("#grid").jqGrid({
				url: "../basedata/log?action=list",
				postData: queryConditions,
				datatype: "json",
				autowidth: !0,
				height: a.h,
				altRows: !0,
				gridview: !0,
				colModel: [{
					name: "modifyTime",
					label: "日期",
					width: 150,
					align: "center"
				}, {
					name: "loginName",
					label: "用户名",
					width: 150
				}, {
					name: "name",
					label: "姓名",
					width: 150
				}, 
				//{
//					name: "operateTypeName",
//					label: "操作类型",
//					width: 200
//				}, 
				{
					name: "log",
					label: "日志",
					width: 450
				}],
				cmTemplate: {
					sortable: !1
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
				loadError: function() {}
			})
		},
		reloadData: function(a) {
			$("#grid").jqGrid("setGridParam", {
				url: "../basedata/log?action=list",
				page: 1,
				datatype: "json",
				postData: a
			}).trigger("reloadGrid")
		},
		addEvent: function() {
			$("#refresh").click(function() {
				THISPAGE.reloadData(queryConditions)
			}), $(window).resize(function() {
				Public.resizeGrid()
			})
		}
	};
THISPAGE.init();