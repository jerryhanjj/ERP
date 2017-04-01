var curRow, curCol, curArrears, loading, urlParam = Public.urlParam(),
	SYSTEM = parent.SYSTEM,
	hiddenAmount = !1,
	requiredMoney = SYSTEM.requiredMoney,
	qtyPlaces = Number(parent.SYSTEM.qtyPlaces),
	pricePlaces = Number(parent.SYSTEM.pricePlaces),
	amountPlaces = Number(parent.SYSTEM.amountPlaces),
	hasLoaded = !1,
	originalData, THISPAGE = {
		init: function(a) {
			SYSTEM.isAdmin !== !1 || SYSTEM.rights.AMOUNT_COSTAMOUNT || (hiddenAmount = !0), this.loadGrid(a), this.initDom(a), this.initCombo(), this.addEvent(), THISPAGE.calTotal()
		},
		initDom: function(a) {
			this.$_customer = $("#customer"), this.$_date = $("#date").val(SYSTEM.endDate), this.$_number = $("#number"), this.$_note = $("#note"), this.$_toolTop = $("#toolTop"), this.$_toolBottom = $("#toolBottom"), this.$_amount = $("#amount").val(a.amount || 0), this.$_accountInfo = $("#accountInfo"), this.customerCombo = Business.billSupplierCombo($("#customer"), {
				defaultSelected: 0,
				emptyOptions: !0
			}), this.$_date.datepicker({
				onSelect: function(a) {
					if (!(originalData.id > 0)) {
						var b = a.format("yyyy-MM-dd");
						THISPAGE.$_number.text(""), Public.ajaxPost("../basedata/systemProfile/generateDocNo?action=generateDocNo", {
							billType: "QTZC",
							billDate: b
						}, function(a) {
							200 === a.status ? THISPAGE.$_number.text(a.data.billNo) : parent.Public.tips({
								type: 1,
								content: a.msg
							})
						})
					}
				}
			}), a.id > 0 ? (this.$_customer.data("contactInfo", {
				id: a.buId,
				name: a.contactName
			}), this.customerCombo.input.val(a.contactName), this.$_number.text(a.billNo), this.$_date.val(a.date), this.$_note.val(a.description), $("#grid").jqGrid("footerData", "set", {
				qty: a.totalQty,
				amount: a.totalAmount
			}), this.$_toolBottom.html("edit" === a.status ? '<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a id="edit" class="ui-btn mrb">保存</a>' : '<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a class="ui-btn-prev mrb" id="prev" title="上一张"><b></b></a><a class="ui-btn-next" id="next" title="下一张"><b></b></a>'), this.salesListIds = parent.salesListIds || [], this.idPostion = $.inArray(String(a.id), this.salesListIds), this.idLength = this.salesListIds.length, 0 === this.idPostion && $("#prev").addClass("ui-btn-prev-dis"), this.idPostion === this.idLength - 1 && $("#next").addClass("ui-btn-next-dis")) : this.$_toolBottom.html('<a id="savaAndAdd" class="ui-btn ui-btn-sp mrb">保存并新增</a><a id="save" class="ui-btn">保存</a>'), requiredMoney && ($("#accountWrap").show(), this.accountCombo = SYSTEM.isAdmin !== !1 || SYSTEM.rights.SettAcct_QUERY ? Business.accountCombo($("#account"), {
				width: 200,
				height: 300,
				defaultSelected: a.accId ? ["id", a.accId] : 0,
				callback: {
					onChange: function() {
						if (-1 === this.getValue());
						else {
							var a = [];
							a.push({
								accId: this.getValue(),
								account: "",
								amount: THISPAGE.$_amount.val(),
								wayId: 0,
								way: "",
								settlement: ""
							}), THISPAGE.$_accountInfo.data("accountInfo", a).hide()
						}
					}
				}
			}) : Business.accountCombo($("#account"), {
				width: 200,
				height: 300,
				data: [],
				editable: !1,
				disabled: !0,
				addOptions: {
					text: "(没有账户管理权限)",
					value: 0
				}
			}))
		},
		loadGrid: function(a) {
			function b(a, b, c) {
				return a ? a : c.invNumber ? c.invSpec ? c.invNumber + " " + c.invName + "_" + c.invSpec : c.invNumber + " " + c.invName : "&#160;"
			}
			function c() {
				var a = $(".categoryAuto")[0];
				return a
			}
			function d(a, b, c) {
				if ("get" === b) {
					if ("" !== $(".categoryAuto").getCombo().getValue()) return $(a).val();
					var d = $(a).parents("tr");
					return d.removeData("categoryInfo"), ""
				}
				"set" === b && $("input", a).val(c)
			}
			function e() {
				$("#initCombo").append($(".categoryAuto").val("").unbind("focus.once"))
			}
			var f = this;
			if (a.id) {
				var g = 8 - a.entries.length;
				if (g > 0) for (var h = 0; g > h; h++) a.entries.push({})
			}
			f.newId = 9, $("#grid").jqGrid({
				data: a.entries,
				datatype: "clientSide",
				autowidth: !0,
				height: "100%",
				rownumbers: !0,
				gridview: !0,
				onselectrow: !1,
				colModel: [{
					name: "operating",
					label: " ",
					width: 40,
					fixed: !0,
					formatter: Public.billsOper,
					align: "center"
				}, {
					name: "categoryName",
					label: "支出类别",
					width: 200,
					title: !0,
					classes: "ui-ellipsis",
					formatter: b,
					editable: !0,
					edittype: "custom",
					editoptions: {
						custom_element: c,
						custom_value: d,
						handle: e,
						trigger: "ui-icon-triangle-1-s"
					}
				}, {
					name: "categoryId",
					label: "支出类别ID",
					hidden: !0
				}, {
					name: "amount",
					label: "金额",
					width: 80,
					align: "right",
					formatter: "number",
					formatoptions: {
						decimalPlaces: amountPlaces
					},
					editable: !0
				}, {
					name: "description",
					label: "备注",
					width: 150,
					title: !0,
					editable: !0
				}],
				cmTemplate: {
					sortable: !1,
					title: !1
				},
				shrinkToFit: !0,
				forceFit: !1,
				rowNum: 1e3,
				cellEdit: !1,
				cellsubmit: "clientArray",
				localReader: {
					root: "rows",
					records: "records",
					repeatitems: !1,
					id: "id"
				},
				jsonReader: {
					root: "data.entries",
					records: "records",
					repeatitems: !1,
					id: "id"
				},
				loadComplete: function(a) {
					if (urlParam.id > 0) {
						var b = a.rows,
							c = b.length;
						f.newId = c + 1;
						for (var d = 0; c > d; d++) {
							var e = d + 1,
								g = b[d];
							if ($.isEmptyObject(b[d])) break;
							$("#" + e).data("categoryInfo", {
								id: g.categoryId,
								name: g.categoryName
							})
						}
					}
				},
				gridComplete: function() {},
				afterEditCell: function(a, b, c, d) {
					"categoryName" === b && ($("#" + d + "_categoryName", "#grid").val(c), THISPAGE.categoryCombo.selectByText(c), THISPAGE.curID = a)
				},
				formatCell: function() {},
				beforeSubmitCell: function() {},
				afterSaveCell: function(a, b) {
					"amount" == b && THISPAGE.calTotal()
				},
				loadonce: !0,
				footerrow: !0,
				userData: {
					categoryName: "合计：",
					amount: a.totalAmount
				},
				userDataOnFooter: !0,
				loadError: function(a, b) {
					Public.tips({
						type: 1,
						content: "Type: " + b + "; Response: " + a.status + " " + a.statusText
					})
				}
			}), $("#grid").jqGrid("setGridParam", {
				cellEdit: !0
			})
		},
		reloadData: function(a) {
			$("#grid").clearGridData();
			var b = 8 - a.entries.length;
			if (b > 0) for (var c = 0; b > c; c++) a.entries.push({})
		},
		initCombo: function() {
			var a = "paccttype";
			this.categoryCombo = Business.categoryCombo($(".categoryAuto"), a)
		},
		addEvent: function() {
			var a = this;
			this.customerCombo.input.enterKey(), this.$_date.bind("keydown", function(a) {
				13 === a.which && $("#grid").jqGrid("editCell", 1, 2, !0)
			}).bind("focus", function() {
				a.dateValue = $(this).val()
			}).bind("blur", function() {
				var b = /((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/;
				b.test($(this).val()) || (parent.Public.tips({
					type: 2,
					content: "日期格式有误！如：2012-08-08。"
				}), $(this).val(a.dateValue))
			}), $(".grid-wrap").on("click", ".ui-icon-triangle-1-s", function(b) {
				b.stopPropagation(), a.categoryCombo.doQuery()
			}), Business.billsEvent(a, "other-expense"), $(".wrapper").on("click", "#save", function(b) {
				b.preventDefault();
				var c = THISPAGE.getPostData();
				c && ("edit" === originalData.stata && (c.id = originalData.id, c.stata = "edit"), Public.ajaxPost("../scm/ori/addExp?action=addExp", {
					postData: JSON.stringify(c)
				}, function(b) {
					200 === b.status ? (originalData.id = b.data.id, urlParam.id = b.data.id, a.$_toolBottom.html('<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a id="edit" class="ui-btn mrb">保存</a>'), parent.Public.tips({
						content: "保存成功！"
					})) : parent.Public.tips({
						type: 1,
						content: b.msg
					})
				}))
			}), $(".wrapper").on("click", "#edit", function(a) {
				if (a.preventDefault(), Business.verifyRight("QTZC_UPDATE")) {
					var b = THISPAGE.getPostData();
					b && Public.ajaxPost("../scm/ori/updateExp?action=updateExp", {
						postData: JSON.stringify(b)
					}, function(a) {
						200 === a.status ? (originalData.id = a.data.id, urlParam.id = a.data.id, parent.Public.tips({
							content: "修改成功！"
						})) : parent.Public.tips({
							type: 1,
							content: a.msg
						})
					})
				}
			}), $(".wrapper").on("click", "#savaAndAdd", function(b) {
				b.preventDefault();
				var c = THISPAGE.getPostData();
				c && Public.ajaxPost("../scm/ori/addNewExp?action=addNewExp", {
					postData: JSON.stringify(c)
				}, function(b) {
					if (200 === b.status) {
						a.$_number.text(b.data.billNo), $("#grid").clearGridData(), $("#grid").clearGridData(!0);
						for (var c = 1; 8 >= c; c++) $("#grid").jqGrid("addRowData", c, {});
						a.newId = 9, a.$_note.val(""), parent.Public.tips({
							content: "保存成功！"
						})
					} else parent.Public.tips({
						type: 1,
						content: b.msg
					})
				})
			}), $(".wrapper").on("click", "#add", function(a) {
				a.preventDefault(), Business.verifyRight("QTZC_ADD") && parent.tab.overrideSelectedTabItem({
					tabid: "money-otherExpense",
					text: "其他支出单",
					url: "../scm/ori?action=initExp"
				})
			}), $(".wrapper").on("click", "#print", function(a) {
				return Business.verifyRight("QTZC_PRINT") ? void a.preventDefault() : void a.preventDefault()
			}), $("#prev").click(function(b) {
				return b.preventDefault(), $(this).hasClass("ui-btn-prev-dis") ? (parent.Public.tips({
					type: 2,
					content: "已经没有上一张了！"
				}), !1) : (a.idPostion = a.idPostion - 1, 0 === a.idPostion && $(this).addClass("ui-btn-prev-dis"), loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("../scm/ori/updateExp", {
					id: a.salesListIds[a.idPostion]
				}, function(a) {
					THISPAGE.reloadData(a.data), $("#next").removeClass("ui-btn-next-dis"), loading && loading.close()
				}), void 0)
			}), $("#next").click(function(b) {
				return b.preventDefault(), $(this).hasClass("ui-btn-next-dis") ? (parent.Public.tips({
					type: 2,
					content: "已经没有下一张了！"
				}), !1) : (a.idPostion = a.idPostion + 1, a.idLength === a.idPostion + 1 && $(this).addClass("ui-btn-next-dis"), loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("../scm/ori/updateExp?action=updateExp", {
					id: a.salesListIds[a.idPostion]
				}, function(a) {
					THISPAGE.reloadData(a.data), $("#prev").removeClass("ui-btn-prev-dis"), loading && loading.close()
				}), void 0)
			})
		},
		resetData: function() {
			var a = this;
			$("#grid").clearGridData();
			for (var b = 1; 8 >= b; b++) $("#grid").jqGrid("addRowData", b, {}), $("#grid").jqGrid("footerData", "set", {
				qty: 0,
				amount: 0
			});
			a.$_amount.val(0)
		},
		calTotal: function() {
			for (var a = $("#grid").jqGrid("getDataIDs"), b = 0, c = 0, d = a.length; d > c; c++) {
				var e = a[c],
					f = $("#grid").jqGrid("getRowData", e);
				f.amount && (b += parseFloat(f.amount))
			}
			$("#grid").jqGrid("footerData", "set", {
				amount: b
			}), THISPAGE.$_amount.val(b)
		},
		_getEntriesData: function() {
			for (var a = [], b = $("#grid").jqGrid("getDataIDs"), c = 0, d = b.length; d > c; c++) {
				var e, f = b[c],
					g = $("#grid").jqGrid("getRowData", f);
				if ("" !== g.categoryName && "" !== g.amount) {
					var h = $("#" + f).data("categoryInfo");
					e = {
						categoryId: h.id,
						amount: g.amount,
						description: g.description
					}, a.push(e)
				}
			}
			return a
		},
		getPostData: function() {
			var a = this,
				b = this;
			null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null);
			var c = b.$_customer.find("input");
			if ("" === c.val() || "(空)" === c.val()) {
				var d = {};
				d.id = 0, d.name = "(空)", b.$_customer.removeData("contactInfo")
			} else {
				var d = b.$_customer.data("contactInfo");
				if (null === d) return setTimeout(function() {
					c.focus().select()
				}, 15), parent.Public.tips({
					type: 2,
					content: "当前客户不存在！"
				}), !1
			}
			var e = this._getEntriesData();
			if (e.length > 0) {
				a.calTotal();
				var f = {
					id: originalData.id,
					buId: d.id,
					contactName: d.name,
					date: $.trim(a.$_date.val()),
					billNo: $.trim(a.$_number.text()),
					entries: e,
					totalAmount: $("#grid").jqGrid("footerData", "get").amount.replace(/,/g, "")
				};
				return requiredMoney && (f.accId = a.accountCombo.getValue(), f.accId <= 0) ? (parent.Public.tips({
					type: 2,
					content: "请检查账户信息是否正确！"
				}), !1) : f
			}
			return parent.Public.tips({
				type: 2,
				content: "至少保存一条有效分录数据！"
			}), $("#grid").jqGrid("editCell", 1, 2, !0), !1
		}
	};
urlParam.id ? hasLoaded || Public.ajaxGet("../scm/ori/getExpDetail?action=getExpDetail", {
	id: urlParam.id
}, function(a) {
	200 === a.status ? (originalData = a.data, THISPAGE.init(a.data), hasLoaded = !0) : parent.Public.tips({
		type: 1,
		content: msg
	})
}) : (originalData = {
	id: -1,
	status: "add",
	customer: 0,
	entries: [{
		id: "1"
	}, {
		id: "2"
	}, {
		id: "3"
	}, {
		id: "4"
	}, {
		id: "5"
	}, {
		id: "6"
	}, {
		id: "7"
	}, {
		id: "8"
	}],
	totalQty: 0,
	totalAmount: 0,
	disRate: 0,
	disAmount: 0,
	amount: "0.00",
	rpAmount: "0.00",
	arrears: "0.00"
}, THISPAGE.init(originalData));