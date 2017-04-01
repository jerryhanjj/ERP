var queryConditions = {
	matchCon: ""
},
	api = frameElement.api,
	handle, urlParam = Public.urlParam(),
	THISPAGE = {
		init: function() {
			this.initDom(), this.addEvent()
		},
		initDom: function() {
			var a = api.data;
			switch (this.$_matchCon = $("#matchCon"), this.$_beginDate = $("#beginDate").val(a.beginDate), this.$_endDate = $("#endDate").val(a.endDate), this.$_hxState = $("#hxState"), a.matchCon && "请输入单据号或客户名或备注" != a.matchCon ? (this.$_matchCon.removeClass("ui-input-ph"), this.$_matchCon.val(a.matchCon)) : (this.$_matchCon.addClass("ui-input-ph"), this.$_matchCon.placeholder()), this.$_beginDate.datepicker(), this.$_endDate.datepicker(), urlParam.type) {
			case "sales":
				this.salesCombo = Business.salesCombo($("#sales"), {
					defaultSelected: 0,
					extraListHtml: ""
				}), this.hxStateCombo = this.$_hxState.combo({
					data: function() {
						return [{
							name: "未收款",
							id: 1
						}, {
							name: "部分收款",
							id: 2
						}, {
							name: "全部收款",
							id: 3
						}]
					},
					width: 120,
					height: 300,
					text: "name",
					value: "id",
					defaultSelected: 0,
					cache: !1,
					emptyOptions: !0
				}).getCombo();
				break;
			case "transfers":
				this.outStorageCombo = $("#storageA").combo({
					data: function() {
						return parent.parent.SYSTEM.storageInfo
					},
					text: "name",
					value: "id",
					width: 112,
					defaultSelected: 0,
					emptyOptions: !0,
					cache: !1
				}).getCombo(), -1 !== a.outLocationId && this.outStorageCombo.selectByValue(a.outLocationId), this.inStorageCombo = $("#storageB").combo({
					data: function() {
						return parent.parent.SYSTEM.storageInfo
					},
					text: "name",
					value: "id",
					width: 112,
					defaultSelected: 0,
					emptyOptions: !0,
					cache: !1
				}).getCombo(), -1 !== a.inLocationId && this.inStorageCombo.selectByValue(a.inLocationId);
				break;
			case "other":
				if (this.storageCombo = $("#storageA").combo({
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
				}).getCombo(), -1 !== a.locationId && this.storageCombo.selectByValue(a.locationId), "outbound" === urlParam.diff) var b = "../scm/invOi/queryTransType?action=queryTransType&type=out";
				else var b = "../scm/invOi/queryTransType?action=queryTransType&type=in";
				this.transTypeCombo = $("#transType").combo({
					data: b,
					ajaxOptions: {
						formatData: function(a) {
							return a.data.items
						}
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
				}).getCombo(), -1 !== a.transTypeId && this.transTypeCombo.selectByValue(a.transTypeId)
			}
		},
		addEvent: function() {},
		handle: function(a) {
			switch (a = a || {}, a.matchCon = "请输入单据号或客户名或备注" === THISPAGE.$_matchCon.val() ? "" : THISPAGE.$_matchCon.val(), a.beginDate = THISPAGE.$_beginDate.val(), a.endDate = THISPAGE.$_endDate.val(), THISPAGE.hxStateCombo && (a.hxState = THISPAGE.hxStateCombo.getValue() ? THISPAGE.hxStateCombo.getValue() - 1 : ""), urlParam.type) {
			case "sales":
				a.salesId = THISPAGE.salesCombo.getValue();
				break;
			case "transfers":
				a.outLocationId = THISPAGE.outStorageCombo.getValue(), a.inLocationId = THISPAGE.inStorageCombo.getValue();
				break;
			case "other":
				a.locationId = THISPAGE.storageCombo.getValue(), a.transTypeId = THISPAGE.transTypeCombo.getValue()
			}
			return a
		}
	};
THISPAGE.init(), handle = THISPAGE.handle;