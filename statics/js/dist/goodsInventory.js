var api = frameElement.api,
	curId = api.data.id,
	THISPAGE = {
		init: function() {
			this.initDom(), this.loadGrid(), this.addEvent()
		},
		initDom: function() {
			this.$_matchCon = $("#matchCon"), api.data.text ? this.$_matchCon.val(api.data.text) : this.$_matchCon.placeholder(), this.goodsCombo = this.$_matchCon.combo({
				data: function() {
					var a = Public.getDefaultPage();
					return a.SYSTEM.goodsInfo
				},
				formatText: function(a) {
					return "" === a.spec ? a.number + " " + a.name : a.number + " " + a.name + "_" + a.spec
				},
				value: "id",
				defaultSelected: ["id", api.data.id],
				editable: !0,
				maxListWidth: 500,
				cache: !1,
				forceSelection: !0,
				maxFilter: 10,
				trigger: !1,
				listHeight: 182,
				listWrapCls: "ui-droplist-wrap",
				callback: {
					onChange: function(a) {
						a && a.id && (curId = a.id, THISPAGE.reloadData())
					}
				},
				queryDelay: 0,
				inputCls: "edit_subject",
				wrapCls: "edit_subject_wrap",
				focusCls: "",
				disabledCls: "",
				activeCls: ""
			}).getCombo()
		},
		loadGrid: function() {
			$(window).height() - $(".grid-wrap").offset().top - 84;
			$("#grid").jqGrid({
				url: "scm/invSa/justIntimeInv?action=justIntimeInv&invId=" + curId,
				datatype: "json",
				width: 430,
				height: 264,
				altRows: !0,
				gridview: !0,
				colModel: [{
					name: "locationName",
					label: "仓库名称",
					width: 100
				}, {
					name: "qty",
					label: "数量",
					width: 100,
					title: !1,
					align: "right"
				}],
				cmTemplate: {
					sortable: !1
				},
				page: 1,
				sortname: "number",
				sortorder: "desc",
				pager: "#page",
				rowNum: 2e3,
				rowList: [300, 500, 1e3],
				scroll: 1,
				loadonce: !0,
				viewrecords: !0,
				shrinkToFit: !0,
				forceFit: !1,
				jsonReader: {
					root: "data.rows",
					records: "data.total",
					repeatitems: !1,
					id: 0
				},
				loadError: function() {}
			})
		},
		reloadData: function() {
			$("#grid").jqGrid("setGridParam", {
				url: "scm/invSa/justIntimeInv?action=justIntimeInv&invId=" + curId,
				datatype: "json"
			}).trigger("reloadGrid")
		},
		addEvent: function() {
			var a = this;
			$("#search").click(function() {
				curId = a.goodsCombo.getValue(), curId && THISPAGE.reloadData()
			}), $("#refresh").click(function() {
				THISPAGE.reloadData()
			}), this.$_matchCon.bind("focus", function() {
				var a = this;
				$(this).val() && setTimeout(function() {
					a.select()
				}, 10)
			})
		}
	};
THISPAGE.init();