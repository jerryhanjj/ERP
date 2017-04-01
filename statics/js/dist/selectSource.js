var queryConditions = {
	skey: ""
},
	SYSTEM = parent.SYSTEM,
	qtyPlaces = Number(parent.SYSTEM.qtyPlaces),
	pricePlaces = Number(parent.SYSTEM.pricePlaces),
	amountPlaces = Number(parent.SYSTEM.amountPlaces),
	THISPAGE = {
		init: function() {
			this.api = frameElement.api, this.data = this.api.data, this.initDom(), this.loadGrid(), this.addEvent()
		},
		initDom: function() {
			this.$_matchCon = $("#matchCon"), this.$_beginDate = $("#beginDate").val(SYSTEM.startDate), this.$_endDate = $("#endDate").val(SYSTEM.endDate), this.$_matchCon.placeholder(), this.$_beginDate.datepicker(), this.$_endDate.datepicker()
		},
		loadGrid: function() {
			{
				var a = this.data.url;
				$(window).height() - $(".grid-wrap").offset().top - 84
			}
			queryConditions.beginDate = this.$_beginDate.val(), queryConditions.endDate = this.$_endDate.val(), $("#grid").jqGrid({
				url: a,
				postData: queryConditions,
				datatype: "json",
				width: 724,
				height: 354,
				altRows: !0,
				colModel: [{
					name: "billId",
					label: "ID",
					width: 0,
					hidden: !0
				}, {
					name: "billType",
					width: 0,
					hidden: !0
				}, {
					name: "billNo",
					label: "源单编号",
					width: 150,
					classes: "ui-ellipsis"
				}, {
					name: "transType",
					label: "业务类别",
					width: 100
				}, {
					name: "billDate",
					label: "单据日期",
					width: 100,
					align: "center"
				}, {
					name: "billPrice",
					label: "单据金额",
					width: 100,
					align: "right",
					formatter: "currency",
					formatoptions: {
						showZero: !0,
						decimalPlaces: amountPlaces
					}
				}, {
					name: "hasCheck",
					label: "已核销金额",
					width: 100,
					align: "right",
					formatter: "currency",
					formatoptions: {
						showZero: !0,
						decimalPlaces: amountPlaces
					}
				}, {
					name: "notCheck",
					label: "未核销金额",
					width: 100,
					align: "right",
					formatter: "currency",
					formatoptions: {
						showZero: !0,
						decimalPlaces: amountPlaces
					}
				}],
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
					root: "data.items",
					records: "data.totalsize",
					repeatitems: !1,
					id: "billId"
				},
				loadError: function() {}
			})
		},
		reloadData: function(a) {
			var b = this.data.url;
			$("#grid").jqGrid("setGridParam", {
				url: b,
				datatype: "json",
				postData: a
			}).trigger("reloadGrid")
		},
		addEvent: function() {
			var a = this;
			$("#search").click(function() {
				var b = $("#beginDate").val(),
					c = $("#endDate").val();
				return b && c && new Date(b).getTime() > new Date(c).getTime() ? void parent.Public.tips({
					type: 1,
					content: "开始日期不能大于结束日期"
				}) : (queryConditions.beginDate = b, queryConditions.endDate = c, queryConditions.billNo = "请输入源单编号" === a.$_matchCon.val() ? "" : a.$_matchCon.val(), void THISPAGE.reloadData(queryConditions))
			}), $("#refresh").click(function() {
				THISPAGE.reloadData(queryConditions)
			})
		}
	};
THISPAGE.init();