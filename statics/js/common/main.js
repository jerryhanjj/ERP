var Public = Public || {};
var Business = Business || {};
Public.isIE6 = !window.XMLHttpRequest;	//ie6

define(["jquery", "plugins", "grid", "dialog", "datepicker"], function(require, exports){
	var $ = require("jquery");
	
	// 加载jQuery插件
	 require("plugins");
	 require("grid");
	 require("dialog");
	 //require("datepicker");
	
		$(function(){
			//菜单按钮
			$('.ui-btn-menu .menu-btn').on('mouseenter.menuEvent',function(e){
				if($(this).hasClass("ui-btn-dis")) {
					return false;
				}
				$(this).parent().addClass('ui-btn-menu-cur');
				$(this).blur();
				e.preventDefault();
			});

			$(document).on('click.menu',function(e){
				var target  = e.target || e.srcElement;
				$('.ui-btn-menu').each(function(){
					var menu = $(this);
					if($(target).closest(menu).length == 0 && $('.con',menu).is(':visible')){
						 menu.removeClass('ui-btn-menu-cur');
					}
				})
			});
		});

		//设置表格宽高
		Public.setGrid = function(adjustH, adjustW){
			var defaultPage = Public.getDefaultPage();
			if(defaultPage.SYSTEM.skin === 'green'){
				var adjustH = adjustH || 70;
			} else {
				var adjustH = adjustH || 65;
			};
			var adjustW = adjustW || 20;
			var gridW = $(window).width() - adjustW, gridH = $(window).height() - $(".grid-wrap").offset().top - adjustH;
			return {
				w : gridW,
				h : gridH
			}
		};
		//重设表格宽高
		Public.resizeGrid = function(adjustH, adjustW){
			var grid = $("#grid");
			var gridWH = Public.setGrid(adjustH, adjustW);
			grid.jqGrid('setGridHeight', gridWH.h);
			grid.jqGrid('setGridWidth', gridWH.w);
		};
		//表格宽度自适应
		Public.autoGrid = function($grid){
			$grid.jqGrid('setGridWidth', $grid.closest('.grid-wrap').innerWidth() -2 );//去掉border的宽度
		}
		//自定义报表宽高初始化以及自适应
		Public.initCustomGrid = function(tableObj){
			//去除报表原始定义的宽度
			$(tableObj).css("width") && $(tableObj).attr("width","auto");
			//获取报表宽度当做最小宽度
			var _minWidth = $(tableObj).outerWidth();
			$(tableObj).css("min-width",_minWidth+"px");
			//获取当前window对象的宽度作为报表原始的宽度
			$(tableObj).width($(window).width() - 74);
			$(tableObj).closest('.mod-report').height($(window).height() - 66);
			//设置resize事件
			var _throttle = function(method,context){
				clearTimeout(method.tid);
				method.tid = setTimeout(function(){
					method.call(context);
				},100)
			};
			var _resize = function(){
				$(tableObj).width($(window).width() - 74);
				$(tableObj).closest('.mod-report').height($(window).height() - 66);
			};
			$(window).resize(function() {
				_throttle(_resize);
			});
		}
		/**
		 * 节点赋100%高度
		 *
		 * @param {object} obj 赋高的对象
		*/
		Public.setAutoHeight = function(obj){
		if(!obj || obj.length < 1){
			return ;
		}

		Public._setAutoHeight(obj);
		$(window).bind('resize', function(){
			Public._setAutoHeight(obj);
		});

		}

		Public._setAutoHeight = function(obj){
		obj = $(obj);
		//parent = parent || window;
		var winH = $(window).height();
		var h = winH - obj.offset().top - (obj.outerHeight() - obj.height());
		obj.height(h);
		}
		//操作项格式化，适用于有“修改、删除”操作的表格
		Public.operFmatter = function (val, opt, row) {
			var html_con = '<div class="operating" data-id="' + row.id + '"><span class="ui-icon ui-icon-pencil" title="修改"></span><span class="ui-icon ui-icon-trash" title="删除"></span></div>';
			return html_con;
		};

		Public.billsOper = function (val, opt, row) {
			var html_con = '<div class="operating" data-id="' + opt.rowId + '"><span class="ui-icon ui-icon-plus" title="新增行"></span><span class="ui-icon ui-icon-trash" title="删除行"></span></div>';
			return html_con;
		};

		Public.dateCheck = function(){
			$('.ui-datepicker-input').bind('focus', function(e){
				$(this).data('original', $(this).val());
			}).bind('blur', function(e){
				var reg = /((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/;
				var _self = $(this);
				setTimeout(function(){
					if(!reg.test(_self.val())) {
						parent.Public.tips({type:1, content : '日期格式有误！如：2013-08-08。'});
						_self.val(_self.data('original'));
					};
				}, 10)

			});
		}
		//日期格式化
		Date.prototype.format = function(format){ 
			var o = { 
				"M+" : this.getMonth()+1, //month 
				"d+" : this.getDate(), //day 
				"h+" : this.getHours(), //hour 
				"m+" : this.getMinutes(), //minute 
				"s+" : this.getSeconds(), //second 
				"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
				"S" : this.getMilliseconds() //millisecond 
			} 

			if(/(y+)/.test(format)) { 
				format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
			} 

			for(var k in o) { 
				if(new RegExp("("+ k +")").test(format)) { 
					format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
				} 
			} 
			return format; 
		} 
		Date.prototype.addMonths= function(m)
		{
		    var d = this.getDate();
		    this.setMonth(this.getMonth() + m);
		    if (this.getDate() < d)
		        this.setDate(0);
		};
		Date.prototype.addDays = function(d)
		{
		    this.setDate(this.getDate() + d);
		};

		//根据之前的编码生成下一个编码
		Public.getSuggestNum = function(prevNum){
			if (prevNum == '' || !prevNum) {
				return '';
			}
			var reg = /^([a-zA-Z0-9\-_]*[a-zA-Z\-_]+)?(\d+)$/;
			var match = prevNum.match(reg);
			if (match) {
				var prefix = match[1] || '';
				var prevNum = match[2];
				var num = parseInt(prevNum, 10) + 1;
				var delta = prevNum.toString().length - num.toString().length;
				if (delta > 0) {
					for (var i = 0; i < delta; i++) {
						num = '0' + num;
					}
				}
				return prefix + num;
			} else {
				return '';
			}
		};

		Public.bindEnterSkip = function(obj, func){
			var args = arguments;
			$(obj).on('keydown', 'input:visible:not(:disabled)', function(e){
				if (e.keyCode == '13') {
					var inputs = $(obj).find('input:visible:not(:disabled)');
					var idx = inputs.index($(this));
					idx = idx + 1;
					if (idx >= inputs.length) {
						if (typeof func == 'function') {
							var _args = Array.prototype.slice.call(args, 2 );
							func.apply(null,_args);
						}
					} else {
						inputs.eq(idx).focus();
					}
				}
			});
		};

		/*获取URL参数值*/
		Public.getRequest = Public.urlParam = function() {
		   var param, url = location.search, theRequest = {};
		   if (url.indexOf("?") != -1) {
		      var str = url.substr(1);
		      strs = str.split("&");
		      for(var i = 0, len = strs.length; i < len; i ++) {
				 param = strs[i].split("=");
		         theRequest[param[0]]=decodeURIComponent(param[1]);
		      }
		   }
		   return theRequest;
		};
		/**
		 * [ajax description]
		 * @param  {[type]} ajaxOpts [description]
		 * 默认json格式
		 * 默认post方式
		 * @return {[type]}          [description]
		 */
		Public.ajax = function(ajaxOpts){    
			var opts = {
			   type: "POST",
			   dataType: "json",  
			   error: function(err){  
					parent.Public.tips({type: 1, content : '操作失败了哦，请检查您的网络链接！'});
			   }
			};
			$.extend(true, opts, ajaxOpts);
			$.ajax(opts);  
		};  
		/*
		  通用post请求，返回json
		  url:请求地址， params：传递的参数{...}， callback：请求成功回调
		*/ 
		Public.ajaxPost = function(url, params, callback, errCallback){    
			$.ajax({  
			   type: "POST",
			   url: url,
			   data: params, 
			   dataType: "json",  
			   success: function(data, status){  
				   callback(data);  
			   },  
			   error: function(err){  
					parent.Public.tips({type: 1, content : '操作失败了哦，请检查您的网络链接！'});
					errCallback && errCallback(err);
			   }  
			});  
		};  
		//扩展对象方法
		$.fn.extend({
			//为对象新增ajaxPost方法
			ajaxPost:function(url, params, callback, errCallback){
				var $this = $(this);
				var loading;
				var myTimer;
				var preventTooFast = 'ui-btn-dis';
				var ajaxOpts = {  
				   type: "POST",
				   url: url,
				   data: params, 
				   dataType: "json",  
				   success: function(data, status){  
					   callback(data);  
				   },  
				   error: function(err){  
						parent.Public.tips({type: 1, content : '操作失败了哦，请检查您的网络链接！'});
						errCallback && errCallback(err);
				   }  
				}
				$.extend(true, ajaxOpts, {
					timeout : 20000,
					beforeSend : function(){
						$this.addClass(preventTooFast);
						myTimer = setTimeout(function(){
							$this.removeClass(preventTooFast);
						},2000)
						loading = $.dialog.tips('提交中，请稍候...', 1000, 'loading.gif', true);
					},
					success : function(data){
						callback(data);  
					},
					complete : function(){
						loading.close();
					},
					error: function(err){  
						parent.Public.tips({type: 2, content : '操作无法成功，请稍后重试！'});
						errCallback && errCallback(err);
				   	}
				});
				if($this.hasClass(preventTooFast)){
					return;
				}
				$.ajax(ajaxOpts); 
			}
		});
		Public.ajaxGet = function(url, params, callback, errCallback){    
			$.ajax({  
			   type: "GET",
			   url: url,
			   dataType: "json",  
			   data: params,    
			   success: function(data, status){  
				   callback(data);  
			   },   
			   error: function(err){  
					parent.Public.tips({type: 1, content : '操作失败了哦，请检查您的网络链接！'});
					errCallback && errCallback(err);
			   }  
			});  
		};
		/*操作提示*/
		Public.tips = function(options){ return new Public.Tips(options); }
		Public.Tips = function(options){
			var defaults = {
				renderTo: 'body',
				type : 0,
				autoClose : true,
				removeOthers : true,
				time : undefined,
				top : 10,
				onClose : null,
				onShow : null
			}
			this.options = $.extend({},defaults,options);
			this._init();
			
			!Public.Tips._collection ?  Public.Tips._collection = [this] : Public.Tips._collection.push(this);
			
		}

		Public.Tips.removeAll = function(){
			try {
				for(var i=Public.Tips._collection.length-1; i>=0; i--){
					Public.Tips._collection[i].remove();
				}
			}catch(e){}
		}

		Public.Tips.prototype = {
			_init : function(){
				var self = this,opts = this.options,time;
				if(opts.removeOthers){
					Public.Tips.removeAll();
				}

				this._create();

				if(opts.autoClose){
					time = opts.time || opts.type == 1 ? 5000 : 3000;
					window.setTimeout(function(){
						self.remove();
					},time);
				}

			},
			
			_create : function(){
				var opts = this.options, self = this;
				if(opts.autoClose) {
					this.obj = $('<div class="ui-tips"><i></i></div>').append(opts.content);
				} else {
					this.obj = $('<div class="ui-tips"><i></i><span class="close"></span></div>').append(opts.content);
					this.closeBtn = this.obj.find('.close');
					this.closeBtn.bind('click',function(){
						self.remove();
					});
				};
				
				switch(opts.type){
					case 0 : 
						this.obj.addClass('ui-tips-success');
						break ;
					case 1 : 
						this.obj.addClass('ui-tips-error');
						break ;
					case 2 : 
						this.obj.addClass('ui-tips-warning');
						break ;
					default :
						this.obj.addClass('ui-tips-success');
						break ;
				}
				
				this.obj.appendTo('body').hide();
				this._setPos();
				if(opts.onShow){
						opts.onShow();
				}

			},

			_setPos : function(){
				var self = this, opts = this.options;
				if(opts.width){
					this.obj.css('width',opts.width);
				}
				var h =  this.obj.outerHeight(),winH = $(window).height(),scrollTop = $(window).scrollTop();
				//var top = parseInt(opts.top) ? (parseInt(opts.top) + scrollTop) : (winH > h ? scrollTop+(winH - h)/2 : scrollTop);
				var top = parseInt(opts.top) + scrollTop;
				this.obj.css({
					position : Public.isIE6 ? 'absolute' : 'fixed',
					left : '50%',
					top : top,
					zIndex : '9999',
					marginLeft : -self.obj.outerWidth()/2	
				});

				window.setTimeout(function(){
					self.obj.show().css({
						marginLeft : -self.obj.outerWidth()/2
					});
				},150);

				if(Public.isIE6){
					$(window).bind('resize scroll',function(){
						var top = $(window).scrollTop() + parseInt(opts.top);
						self.obj.css('top',top);
					})
				}
			},

			remove : function(){
				var opts = this.options;
				this.obj.fadeOut(200,function(){
					$(this).remove();
					if(opts.onClose){
						opts.onClose();
					}
				});
			}
		};
		//数值显示格式转化
		Public.numToCurrency = function(val, dec) {
			val = parseFloat(val);	
			dec = dec || 2;	//小数位
			if(val === 0 || isNaN(val)){
				return '';
			}
			val = val.toFixed(dec).split('.');
			var reg = /(\d{1,3})(?=(\d{3})+(?:$|\D))/g;
			return val[0].replace(reg, "$1,") + '.' + val[1];
		};
		//数值显示
		Public.currencyToNum = function(val){
			var val = String(val);
			if ($.trim(val) == '') {
				return '';
			}
			val = val.replace(/,/g, '');
			val = parseFloat(val);
			return isNaN(val) ? 0 : val;
		};
		//只允许输入数字
		Public.numerical = function(e){
			var allowed = '0123456789.-', allowedReg;
			allowed = allowed.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
			allowedReg = new RegExp('[' + allowed + ']');
			var charCode = typeof e.charCode != 'undefined' ? e.charCode : e.keyCode; 
			var keyChar = String.fromCharCode(charCode);
			if(!e.ctrlKey && charCode != 0 && ! allowedReg.test(keyChar)){
				e.preventDefault();
			};
		};

		//限制只能输入允许的字符，不支持中文的控制
		Public.limitInput = function(obj, allowedReg){
		    var ctrlKey = null;
		    obj.css('ime-mode', 'disabled').on('keydown',function(e){
		        ctrlKey = e.ctrlKey;
		    }).on('keypress',function(e){
		        allowedReg = typeof allowedReg == 'string' ? new RegExp(allowedReg) : allowedReg;
		        var charCode = typeof e.charCode != 'undefined' ? e.charCode : e.keyCode; 
		        var keyChar = $.trim(String.fromCharCode(charCode));
		        if(!ctrlKey && charCode != 0 && charCode != 13 && !allowedReg.test(keyChar)){
		            e.preventDefault();
		        } 
		    });
		};
		//限制输入的字符长度
		Public.limitLength = function(obj, count){
			obj.on('keyup',function(e){
		        if(count < obj.val().length){
		        	e.preventDefault();
		        	obj.val(obj.val().substr(0,count));
		        }
		    });
		};
		/*批量绑定页签打开*/
		Public.pageTab = function() {
			$(document).on('click', '[rel=pageTab]', function(e){
				e.preventDefault();
				var right = $(this).data('right');
				if (right && !Business.verifyRight(right)) {
					return false;
				};
				var tabid = $(this).attr('tabid'), url = $(this).attr('href'), showClose = $(this).attr('showClose'), text = $(this).attr('tabTxt') || $(this).text(),parentOpen = $(this).attr('parentOpen');
				if(parentOpen){
					parent.tab.addTabItem({tabid: tabid, text: text, url: url, showClose: showClose});
				} else {
					tab.addTabItem({tabid: tabid, text: text, url: url, showClose: showClose});
				}
			});
		};

		$.fn.artTab = function(options) {
		  var defaults = {};
		  var opts = $.extend({}, defaults, options);
		  var callback = opts.callback || function () {};
		  this.each(function(){
			  var $tab_a =$("dt>a",this);
			  var $this = $(this);
			  $tab_a.bind("click", function(){
				  var target = $(this);
				  target.siblings().removeClass("cur").end().addClass("cur");
				  var index = $tab_a.index(this);
				  var showContent = $("dd>div", $this).eq(index);
				  showContent.siblings().hide().end().show();
				  callback(target, showContent, opts);
			  });
			  if(opts.tab)
				  $tab_a.eq(opts.tab).trigger("click");
			  if(location.hash) {
				  var tabs = location.hash.substr(1);
				  $tab_a.eq(tabs).trigger("click");
			  }
		  });	  
		};

		//文本列表滚动
		Public.txtSlide = function(opt){
			var def = {
				notice: '#notices > ul',
				size: 1, //显示出来的条数
				pause_time: 3000, //每次滚动后停留的时间
				speed: 'fast', //滚动动画执行的时间
				stop: true //鼠标移到列表时停止动画
			};
			opt = opt || {};
			opt = $.extend({}, def, opt);

			var $list = $(opt.notice),
				$lis = $list.children(),
				height = $lis.eq(0).outerHeight() * opt.size,
				interval_id;
			if($lis.length <= opt.size) return;
			interval_id = setInterval(begin, opt.pause_time);

			opt.stop && $list.on({
				'mouseover': function(){
					clearInterval(interval_id);
					$list.stop(true,true);
				},
				'mouseleave': function(){
					interval_id = setInterval(begin, opt.pause_time);
				}
			});

			function begin(){
				$list.stop(true, true).animate({marginTop: -height}, opt.speed, function(){
					for(var i=0; i<opt.size; i++){
						$list.append($list.find('li:first'));
					}
					$list.css('margin-top', 0);
				});
			}
		};

		$.fn.enterKey = function() {
			this.each(function() {
				$(this).keydown(function(e) {
					if (e.which == 13) {
						var ref = $(this).data("ref");
						if (ref) {
							$('#' + ref).select().focus().click();
						}
						else {
							eval($(this).data("enterKeyHandler"));
						}
					}
				});
			});
		};


		//input占位符
		$.fn.placeholder = function(){
			this.each(function() {
				$(this).focus(function(){
					if($.trim(this.value) == this.defaultValue){
						this.value = '';
					}
					$(this).removeClass('ui-input-ph');
				}).blur(function(){
					var val = $.trim(this.value);
					if(val == '' || val == this.defaultValue){
						$(this).addClass('ui-input-ph');
					}
					val == '' && $(this).val(this.defaultValue);
				});
			});
		};

		//单选框插件
		$.fn.cssRadio = function(opts){
			var opts = $.extend({}, opts);
			var $_radio = $('label.radio', this), $_this = this;
			$_radio.each(function() {
				var self = $(this);
				if (self.find("input")[0].checked) {
					self.addClass("checked");
				};

			}).hover(function() {
				$(this).addClass("over");
			}, function() {
				$(this).removeClass("over");
			}).click(function(event) {
				$_radio.find("input").removeAttr("checked");
				$_radio.removeClass("checked");
				$(this).find("input").attr("checked", "checked");
				$(this).addClass("checked");
				opts.callback($(this));
			});
			return {
				getValue: function() {
					return $_radio.find("input[checked]").val();
				},
				setValue: function(index) {
					return $_radio.eq(index).click();
				}
			}
		};
		//复选框插件
		$.fn.cssCheckbox = function() {
			var $_chk = $(".chk", this);
			$_chk.each(function() {
				if ($(this).find("input")[0].checked) {
					$(this).addClass("checked");
				};
				if ($(this).find("input")[0].disabled) {
					$(this).addClass("dis_check");
				};
			}).hover(function() {
				$(this).addClass("over")
			}, function() {
				$(this).removeClass("over")
			}).click(function(event) {
				if ($(this).find("input")[0].disabled) {
					return;
				};
				$(this).toggleClass("checked");
				$(this).find("input")[0].checked = !$(this).find("input")[0].checked;
				event.preventDefault();
			});
			
			return {
				chkAll:function(){
					$_chk.addClass("checked");
					$_chk.find("input").attr("checked","checked");
				},	
				chkNot:function(){
					$_chk.removeClass("checked");
					$_chk.find("input").removeAttr("checked");
				},
				chkVal:function(){
					var val = [];
					$_chk.find("input:checked").each(function() {
		            	val.push($(this).val());
		        	});
					return val;
				}
			}
		};

		Public.getDefaultPage = function(){
			var win = window.self;
			do{
				if (win.CONFIG) {
					return win;
				}
				win = win.parent;
			} while(true);
		};

		//权限验证
		Business.verifyRight = function(right){
			var system = Public.getDefaultPage().SYSTEM;
			var isAdmin = system.isAdmin;
			var siExperied = system.siExpired;
			var rights = system.rights;
			if (isAdmin && !siExperied) {
				return true;
			};

			if(siExperied) {
				if(rights[right]) {
					return true;
				} else {
					var html = [
						'<div class="ui-dialog-tips">',
						'<p>谢谢您使用本产品，您的当前服务已经到期，到期3个月后数据将被自动清除，如需继续使用请购买/续费！</p>',
						'<p style="color:#AAA; font-size:12px;">(续费后请刷新页面或重新登录。)</p>',
						'</div>'
					].join('');
					$.dialog({
						width: 280,
						title: '系统提示',
						icon: 'alert.gif',
						fixed: true,
						lock: true,
						resize: false,
						ok: true,
						content: html
					});
					return false;
				}
			} else {
				if (rights[right]) {
					return true;
				} else {
					var html = [
						'<div class="ui-dialog-tips">',
						'<h4 class="tit">您没有该功能的使用权限哦！</h4>',
						'<p>请联系管理员为您授权！</p>',
						'</div>'
					].join('');
					$.dialog({
						width: 240,
						title: '系统提示',
						icon: 'alert.gif',
						fixed: true,
						lock: true,
						resize: false,
						ok: true,
						content: html
					});
					return false;
				}
			};
		};

		//获取文件
		Business.getFile = function(url, args, isNewWinOpen){
			if (typeof url != 'string') {
				return ;
			}
			var url = url.indexOf('?') == -1 ? url += '?' : url;
			if(args.id) {
				url += '&id=' + args.id + '&random=' + new Date().getTime();
			} else {
				url += '&random=' + new Date().getTime();
			};
			
			var downloadForm = $('form#downloadForm');
			if (downloadForm.length == 0) {
				downloadForm = $('<form method="post" />').attr('id', 'downloadForm').hide().appendTo('body');
			} else {
				downloadForm.empty();
			}
			downloadForm.attr('action', url);
			for( k in args){
				$('<input type="hidden" />').attr({name: k, value: args[k]}).appendTo(downloadForm);
			}
			if (isNewWinOpen) {
				downloadForm.attr('target', '_blank');
			} else{
				var downloadIframe = $('iframe#downloadIframe');
				if (downloadIframe.length == 0) {
					downloadIframe = $('<iframe />').attr('id', 'downloadIframe').hide().appendTo('body');
				}
				downloadForm.attr('target', 'downloadIframe');
			}
			downloadForm.trigger('submit');
		};
		Business.billCustomerCombo = function($_obj, opts){
			var defaultPage = Public.getDefaultPage();
			opts = $.extend(true, {
				data: function(){
					if(defaultPage.SYSTEM.customerInfo) {
						var usingData = []//获取启用状态的;
						for (var i = 0; i < defaultPage.SYSTEM.customerInfo.length; i++) {
							var g = defaultPage.SYSTEM.customerInfo[i];
							if(!g['delete']){
								usingData.push(g);
							}
						};
						return usingData;
					} else {
						return '../basedata/contact?action=list$simple=1';
					}
				}
			}, opts);
			return Business.customerCombo($_obj, opts);
		}
		Business.customerCombo = function($_obj, opts){
			if ($_obj.length == 0) { return };
			var defaultPage = Public.getDefaultPage();
			var opts = $.extend(true, {
				data: function(){
					return defaultPage.SYSTEM.customerInfo;
				},
				ajaxOptions: {
					formatData: function(data){
						defaultPage.SYSTEM.customerInfo = data.data.rows;	//更新
						return data.data.rows;
					}	
				},
				width: 200,
				height: 300,
				formatText: function(row){
					return row.number + ' ' + row.name;
				},
				//formatResult: 'name',
				text: 'name',
				value: 'id',
				defaultSelected: 0,
				editable: true,
				extraListHtml: '<a href="javascript:void(0);" id="quickAddCustomer" class="quick-add-link"><i class="ui-icon-add"></i>新增客户</a>',
				maxListWidth: 500,
				cache: false,
				forceSelection: false,
				maxFilter: 100,
				trigger: false,	
				callback: {
					onChange: function(data){
						if(data) {
							$_obj.data('contactInfo', data);
						} else {
							$_obj.removeData('contactInfo');
						}
					},
					onEnter:function(e){
						//e.stopPropagation();
						var skey = $_obj.find('input').val();
						if(!$_obj.data('contactInfo')){
							$_obj.find('.ui-icon-ellipsis').data('skey',skey).data('type','customerInfo').trigger('click');
						}
					}
				}
			}, opts);
			
			var customerCombo = $_obj.combo(opts).getCombo();	
			//新增客户
			$('#quickAddCustomer').on('click', function(e){
				e.preventDefault();
				if (!Business.verifyRight('BU_ADD')) {
					return ;
				};
				$.dialog({
					title : '新增客户',
					content : 'url:../settings/customer_manage',
					data: {oper: 'add', callback: function(data, oper, dialogWin){
						//parent.getCustomer();
						//_self.customerCombo.selectByValue(data.id, false);
						//customerCombo.loadData('/basedata/contact.do?action=list', ['id', data.id]);
						if(data && data.id) {
							$_obj.data('contactInfo', data);	//存储
							$_obj.find('input').val(data.number + ' ' + data.name);	//回填数据
							defaultPage.SYSTEM.customerInfo.push(data);	//增加进缓存
							customerCombo.collapse();	//关闭下拉
						}
						dialogWin && dialogWin.api.close();
					}},
					width : 640,
					height : 460,
					max : false,
					min : false,
					cache : false,
					lock: true
				});
			});
			
			customerCombo.input.focus(function() {
				var $_this = $(this);
				setTimeout(function(){
					$_this.select();
				}, 15);
			});
			
			return customerCombo;
		};
		Business.billSalesCombo = function($_obj, opts){
			var defaultPage = Public.getDefaultPage();
			opts = $.extend(true, {
				data: function(){
					if(defaultPage.SYSTEM.salesInfo) {
						var usingData = []//获取启用状态的;
						for (var i = 0; i < defaultPage.SYSTEM.salesInfo.length; i++) {
							var g = defaultPage.SYSTEM.salesInfo[i];
							if(!g['delete']){
								usingData.push(g);
							}
						};
						return usingData;
					} else {
						return '../basedata/employee?action=list';
					}
				}
			}, opts);
			return Business.salesCombo($_obj, opts);
		}
		Business.salesCombo = function($_obj, opts){
			if ($_obj.length == 0) { return };
			var defaultPage = Public.getDefaultPage();
			var opts = $.extend(true, {
				data: function(){
					if(defaultPage.SYSTEM.salesInfo) {
						return defaultPage.SYSTEM.salesInfo;
					} else {
						return '../basedata/employee?action=list';
					}
				},
				ajaxOptions: {
					formatData: function(data){
						defaultPage.SYSTEM.salesInfo = data.data.items;	//更新
						return data.data.items;
					}	
				},
				width: 120,
				height: 300,
				text: 'name',
				value: 'id',
				defaultSelected: 0,
				defaultFlag: false,
				cache: false,
				editable: true,
				emptyOptions: true,
				callback: {
					onChange: function(data){
					}
				},
				extraListHtml: '<a href="javascript:void(0);" id="quickAddSales" class="quick-add-link"><i class="ui-icon-add"></i>新增职员</a>'
			}, opts);
			
			var salesCombo = $_obj.combo(opts).getCombo();	
			//新增客户
			$('#quickAddSales').on('click', function(e){
				e.preventDefault();
				if (!Business.verifyRight('BU_ADD')) {
					return ;
				};
				$.dialog({
					title : '新增职员',
					content : 'url:../settings/staff_manage',
					data: {oper: 'add', callback: function(data, oper, dialogWin){
						//parent.getCustomer();
						//_self.customerCombo.selectByValue(data.id, false);
						salesCombo.loadData('../basedata/employee?action=list', ['id', data.id]);
						dialogWin && dialogWin.api.close();
					}},
					width : 400,
					height : 160,
					max : false,
					min : false,
					cache : false,
					lock: true
				});
			});
			return salesCombo;
		};
		Business.billSupplierCombo = function($_obj, opts){
			var defaultPage = Public.getDefaultPage();
			opts = $.extend(true, {
				data: function(){
					if(defaultPage.SYSTEM.supplierInfo) {
						var usingData = []//获取启用状态的;
						for (var i = 0; i < defaultPage.SYSTEM.supplierInfo.length; i++) {
							var g = defaultPage.SYSTEM.supplierInfo[i];
							if(!g['delete']){
								usingData.push(g);
							}
						};
						return usingData;
					} else {
						return '../basedata/contact?action=listt&simple=1&type=10';
					}
				}
			}, opts);
			return Business.supplierCombo($_obj, opts);
		}
		Business.supplierCombo = function($_obj, opts){
			if ($_obj.length == 0) { return };
			var defaultPage = Public.getDefaultPage();
			var opts = $.extend(true, {
				data: function(){
					return defaultPage.SYSTEM.supplierInfo;;
				},
				ajaxOptions: {
					formatData: function(data){
						defaultPage.SYSTEM.supplierInfo = data.data.rows;	//更新
						return data.data.rows;
					}	
				},			
				width: 200,
				height: 300,
				formatText: function(row){
					return row.number + ' ' + row.name;
				},
				//formatResult: 'name',
				text: 'name',
				value: 'id',
				defaultSelected: 0,
				editable: true,
				extraListHtml: '<a href="javascript:void(0);" id="quickAddVendor" class="quick-add-link"><i class="ui-icon-add"></i>新增供应商</a>',
				maxListWidth: 500,
				cache: false,
				forceSelection: false,
				maxFilter: 10,
				trigger: false,	
				callback: {
					onChange: function(data){
						if(data) {
							$_obj.data('contactInfo', data);
						} else {
							$_obj.removeData('contactInfo');
						}
					},
					onEnter:function(e){
						//e.stopPropagation();
						var skey = $_obj.find('input').val();
						if(!$_obj.data('contactInfo')){
							$_obj.find('.ui-icon-ellipsis').data('skey',skey).data('type','supplierInfo').trigger('click');
						}
					}
				}			
			}, opts);
			
			var supplierCombo = $_obj.combo(opts).getCombo();	
			//新增供应商
			$('#quickAddVendor').on('click', function(e){
				e.preventDefault();
				if (!Business.verifyRight('PUR_ADD')) {
					return ;
				};
				$.dialog({
					title : '新增供应商',
					content : 'url:../settings/vendor_manage',
					data: {oper: 'add', callback: function(data, oper, dialogWin){
						//parent.getCustomer();
						//_self.customerCombo.selectByValue(data.id, false);
						supplierCombo.loadData('../basedata/contact?type=10&action=list', ['id', data.id]);
						dialogWin && dialogWin.api.close();
					}},
					width : 640,
					height : 460,
					max : false,
					min : false,
					cache : false,
					lock: true
				});
			});
			
			supplierCombo.input.focus(function() {
				var $_this = $(this);
				setTimeout(function(){
					$_this.select();
				}, 15);
			});
			return supplierCombo;
		};
		Business.billSettlementAccountCombo = function($_obj, opts){
			var defaultPage = Public.getDefaultPage();
			opts = $.extend(true, {
				data: function(){
					if(defaultPage.SYSTEM.settlementAccountInfo) {
						var usingData = []//获取启用状态的;
						for (var i = 0; i < defaultPage.SYSTEM.settlementAccountInfo.length; i++) {
							var g = defaultPage.SYSTEM.settlementAccountInfo[i];
							if(!g['delete']){
								usingData.push(g);
							}
						};
						return usingData;
					} else {
						return '../basedata/settAcct?action=list';
					}
				}
			}, opts);
			return Business.settlementAccountCombo($_obj, opts);
		}
		//结算账户下拉框初始化
		Business.settlementAccountCombo = function($_obj, opts){
			if ($_obj.length == 0) { return };
			var defaultPage = Public.getDefaultPage();
			var getInfo=(function(){
				Public.ajaxGet('../basedata/settAcct?action=list', {}, function(data){
					if(data.status === 200) {
						defaultPage.SYSTEM.settlementAccountInfo = data.data.items;
					} else if (data.status === 250){
						defaultPage.SYSTEM.settlementAccountInfo = [];
					} else {
						Public.tips({type: 1, content : data.msg});
					}
				});
			})();
			var opts = $.extend(true, {
				data: function(){
					return defaultPage.SYSTEM.settlementAccountInfo || [];
				},
				ajaxOptions: {
					formatData: function(data){
						defaultPage.SYSTEM.settlementAccountInfo = data.data.items;	//更新
						return data.data.items;
					}	
				},
				width: 200,
				height: 300,
		/*			formatText: function(row){
					return row.number + ' ' + row.name;
				},*/
				//formatResult: 'name',
				text: 'name',
				value: 'id',
				defaultSelected: -1,
				defaultFlag: false,
				cache: false,
				editable: true,
				callback: {
					onChange: function(data){
					}
				},
				extraListHtml: '<a href="javascript:void(0);" id="quickAddVendor" class="quick-add-link"><i class="ui-icon-add"></i>新增结算账户</a>'
			}, opts);
			
			var settlementAccountCombo = $_obj.combo(opts).getCombo();	
			//新增结算账户
			$('#quickAddVendor').on('click', function(e){
				e.preventDefault();
				if (!Business.verifyRight('SettAcct_ADD')) {
					return ;
				};
				$.dialog({
					title : '新增结算账户',
					content : 'url:../settings/settlementAccount_manage',
					data: {oper: 'add', callback: function(data, oper, dialogWin){
						defaultPage.SYSTEM.settlementAccountInfo.push(data);
						settlementAccountCombo.loadData('../basedata/settAcct/query?action=query', ['id', data.id]);
						dialogWin && dialogWin.api.close();
					}},
					width : 640,
					height : 205,
					max : false,
					min : false,
					cache : false,
					lock: true
				});
			});
			return settlementAccountCombo;
		};
		Business.formatGoodsName = function(good){
			var number = good.number;
			var name = good.name;
			var spec = good.spec ? '_' + good.spec : '';
			return number + ' ' + name + spec;
		}
		Business.cacheManage = {
			init : function(){
				if(this.inited) return;
				this.inited = 1;//只启用一次
				this.defaultPage = Public.getDefaultPage();
				this.goodsInfo = this.defaultPage.SYSTEM.goodsInfo;
			},
			getGoodInfo:function(params, callback, effective){
				if(!params)return;
				var defaultPage = Public.getDefaultPage();
				var _self = this;
				_self.init();
				var _prop = '';
				var val = '';
				switch(params.action){
					case 'queryByMatchCon':_prop = 'number';val = params.matchCon; break;
					case 'queryByBarcode':_prop = 'barCode';val = params.barCode; break;
					default:return;
				}
				//本地匹配多一次
				for (var i = _self.goodsInfo.length - 1; i >= 0; i--) {
					var good = _self.goodsInfo[i];
					delete good.amount;
					if(good[_prop] === val){
						/*$('#' + rowid).data('goodsInfo',good);
						var number = good.number;
						var name = good.name;
						var spec = good.spec ? '_' + good.spec : '';
						var barCode  = good.barCode ? '_' + good.barCode : '';
						return number + name + spec;*/
						if(typeof callback === 'function'){
							callback(good);
						}
						return good;
					}
				};
				//本地匹配不到，则去后端查找
				$.ajax({
					url: '../basedata/inventory',
					type: 'post',
					dataType: 'json',
					data: params,
					async:false,//勿修改该属性
					success:function(data){
						if(data.status === 200 && data.data){
							var good = {};
							if(data.data.items){
								if(data.data.items.length == 1){//精确匹配到的才需要,这个接口后面需要改成精确匹配编码&名称
									good = data.data.items[0];
								}else{
									return good;
								}
							}else{
								good = data.data;
							}
							delete good.amount;
							good.unitId = good.unitId || good.baseUnitId;
							if(good.unitId){
								for (var i = _self.defaultPage.SYSTEM.unitInfo.length - 1; i >= 0; i--) {
									var unit = _self.defaultPage.SYSTEM.unitInfo[i];
									if(unit.id == good.unitId){
										good.mainUnit = unit.name;
										good.unitName = unit.name;
									}
								};
							}
							if(good['delete'] && effective){
								defaultPage.Public.tips({type:2 , content:'该商品已经被禁用！'});
								return {};
							}
							//_self.goodsInfo.push(good);
							if(typeof callback === 'function'){
								callback(good);
							}
							return good;
						}else{
							//_self.defaultPage.Public.tips({type: 1, content : data.msg});
						}
					}
				})
				.done(function() {
					//console.log("success");
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
				});
			},
			getGoodsInfoByNumber:function(number, callback,effective){
				this.getGoodInfo({
					action:'queryByMatchCon',
					matchCon:number
				},callback, effective);
			},
			getGoodsInfoByBarCode:function(barCode, callback,effective){
				this.getGoodInfo({
					action:'queryByBarcode',
					barCode:barCode
				},callback, effective);
			}
		}
		Business.serNumManage = function(opts){
			var parentTr = opts.row,
			data = opts.data,
			serNumUsedList = opts.serNumUsedList,

			creatable = opts.creatable,
			enableStorage = opts.enableStorage,
			view = opts.view,
			$grid = parentTr.closest('table'),
			defaultPage = Public.getDefaultPage();

			
			var oldData = {
				goodsInfo: parentTr.data('goodsInfo'),
				storageInfo : parentTr.data('storageInfo') || {},
				unitInfo : parentTr.data('unitInfo')||{}
			} 
			if(!view){
				//非查询模式
				$grid.jqGrid("restoreCell", curRow, curCol);
				parentTr.data('goodsInfo', null).data('storageInfo', null).data('unitInfo', null);
			}
			var params = {
				width: 650,
				height: 400,
				title: (serNumUsedList ? '修改' : '录入') + '【'+data.name+'】的序列号',
				content: 'url:/settings/serNumBatch.jsp',
				data: {
					invId: data.id,
					creatable:creatable,
					enableStorage : enableStorage,
					serNumUsedList : serNumUsedList,
					storageInfo : oldData.storageInfo || {},
					view : view,
					callback: function(serNumList,win){
						var curID = THISPAGE.curID;
						$grid.jqGrid("restoreCell", curRow, curCol);
						//根据仓库分组
						var storageList = {};
						if(!$.isArray(serNumList)){
							var _serNumList = [];
							for(var item in serNumList){
								_serNumList.push(serNumList[item]);
							}
							serNumList = _serNumList;
						}
						for (var i = 0; i < serNumList.length; i++) {
							var locationId = serNumList[i].locationId || -1;
							storageList[locationId] = storageList[locationId] || [];
							storageList[locationId].push(serNumList[i]);
						};
						for(item in storageList){
							var serNums = storageList[item];
							var addId = curID || THISPAGE.newId;
							if(curID) {
								$('#'+curID).data('goodsInfo', null).data('storageInfo',null).data('unitInfo',null);
								var su = $grid.jqGrid('setRowData', Number(curID), {});
							} else {
								var su = $grid.jqGrid('addRowData', Number(THISPAGE.newId), {}, 'last');
								THISPAGE.newId++;
							};	
							var tempRowData = $.extend(true, {}, data);//克隆对象，不然会污染combo的数据
							tempRowData.goods = data.number + ' ' + data.name + (data.spec ? '_' + data.spec: '');
							tempRowData.qty = serNums.length;
							tempRowData.serNumList = serNums;
							//计算金额和税率start
							if(tempRowData.qty >0 && rowData.goods){
								var _qty = parseFloat(tempRowData.qty);
								var _price = parseFloat(rowData.price);
								var _discountRate = parseFloat(rowData.discountRate);
								if($.isNumeric(_price)) {
									if($.isNumeric(_discountRate)) {
										tempRowData.deduction = _qty * _price * _discountRate / 100;//重新计算折扣额会导致PROJECT-15589
										tempRowData.amount = _qty * _price - tempRowData.deduction;
									} else {
										tempRowData.amount = _qty * _price;
									};
								};
								//tempRowData.amount = rowData.price * tempRowData.qty;
								var amount = Number(tempRowData.amount);
								if(defaultPage.SYSTEM.taxRequiredCheck) {
									var taxRate = rowData.taxRate;
									var tax = amount * taxRate / 100;
									var taxAmount = amount + tax;
									tempRowData.tax = tax;
									tempRowData.taxAmount = taxAmount;
								};
							}
							//计算金额和税率end
							if(!creatable){
								tempRowData.locationId = serNums[0].locationId;
								tempRowData.locationName = serNums[0].locationName;
							}else{
								tempRowData.locationId = oldData.storageInfo.id;
								tempRowData.locationName = oldData.storageInfo.name;
							}
							if(su){
								$('#' + addId).data('goodsInfo',tempRowData)
								.data('storageInfo', { 
									id: tempRowData.locationId, 
									name: tempRowData.locationName
								}).data('unitInfo',{
									unitId: tempRowData.unitId,
									name: tempRowData.unitName
								});
							}
							$grid.jqGrid('setRowData', addId, tempRowData);
							if(serNumUsedList){
								//有使用过的说明是修改状态
							}else{
								curRow && curRow++;
							}
							var $_nextTr = $('#' + curID).next();
							if($_nextTr.length > 0) {
								curID = $('#' + curID).next().attr('id');
							} else {
								curID = '';
							};
							if(curID === '') {
								if($grid[0].id === 'fixedGrid'){
									//组装拆卸单的特殊处理,不需要新增一行
									win.close();
									return;
								}
								$grid.jqGrid('addRowData', THISPAGE.newId, {}, 'last');
								THISPAGE.newId = THISPAGE.newId + 1;
							};
							THISPAGE.calTotal();	
							if(serNumUsedList){
								//有使用过的说明是修改状态 
								setTimeout( function() { $grid.jqGrid("nextCell") }, 10);
							}else{
								setTimeout( function() { $grid.jqGrid("editCell", curRow, 2, true) }, 10);
							}
						}
						win.close();
					}
				},
				init:function(){
				},
				lock: true,
				ok:false,
				focus:false,//很奇葩，不设置这个按回车会触发该控件上close按钮的click事件~~~
				cancel:function(){
					$('#' + THISPAGE.curID).data('goodsInfo',oldData.goodsInfo)
					.data('storageInfo', { 
						id: oldData.storageInfo.id, 
						name: oldData.storageInfo.name
					}).data('unitInfo',{
						unitId: oldData.unitInfo.unitId,
						name: oldData.unitInfo.name
					});
				},
				esc:false,//插件的BUG，esc不触发cancel事件
				onClose:function(){
					//console.log(111)
				}
			};
			if(enableStorage){
				//如果是销售单等使用序列号新增商品时， 或者改变仓库时
				params.title = '选择【'+data.name+'】的序列号',
				params.content = 'url:/settings/serNumList.jsp';
				params.button = [{name: '确认',defClass:'ui_state_highlight', callback: function () {
									this.content.callback();
									//this.close();
							        return false;
								}}];
				params.width = 640;
				params.height = 460;
				params.data.enableStorage = true;
			}
			if(view){
				//查询模式
				params.cancel = true;
				params.cancelVal = '关闭';
				params.ok = false;
			}
			$.dialog(params);
		}
		/**
		 * isSkuSingle 可以为回调的执行函数
		 */
		Business.billSkuManage = function(parentTr , data, isSkuSingle){
			var $grid = parentTr.closest('table');
			var defaultPage = Public.getDefaultPage();
			$grid.jqGrid("restoreCell", curRow, curCol);
			parentTr.data('goodsInfo', null);
			$.dialog({
				width: 470,
				height: 410,
				title: '选择【'+data.name+'】的属性',
				content: 'url:http://'+defaultPage.location.hostname+'/settings/assistingProp_batch',
				data: {
					//skey:_self.skey,
					isSingle : isSkuSingle,
					skuClassId:data.skuClassId,
					callback: function(goodsPropList,win){
						var curID = THISPAGE.curID;
						$grid.jqGrid("restoreCell", curRow, curCol);
						if(isSkuSingle){
							var tempData = goodsPropList[0];
							var addId = curID;
							var tempRowData = $.extend(true, {}, data);//克隆对象，不然会污染combo的数据
							if(typeof isSkuSingle === 'function'){
								isSkuSingle(addId,tempRowData,tempData);
							}else{
								tempRowData.qty = tempData.qty;
								tempRowData.skuName = tempData.skuName;
								tempRowData.skuId = tempData.skuId;
								$('#' + addId).data('goodsInfo',tempRowData)
								.data('storageInfo', { 
									id: tempRowData.locationId, 
									name: tempRowData.locationName
								}).data('unitInfo',{
									unitId: tempRowData.unitId,
									name: tempRowData.unitName
								});
								var goodsData = $.extend(true, {}, tempRowData);
								delete goodsData.id;
								$grid.jqGrid('setRowData', addId, goodsData);	
							}					
						}else{
							for(var i = 0 ,len = goodsPropList.length; i<len; i++){
								var addId = curID || THISPAGE.newId;
								var tempData = goodsPropList[i];
								if(curID) {
									$('#'+curID).data('goodsInfo', null).data('storageInfo',null).data('unitInfo',null);
									var su = $grid.jqGrid('setRowData', Number(curID), {});
								} else {
									var su = $grid.jqGrid('addRowData', Number(THISPAGE.newId), {}, 'last');
									THISPAGE.newId++;
								};
								var tempRowData = $.extend(true, {}, data);//克隆对象，不然会污染combo的数据
								tempRowData.goods = data.number + ' ' + data.name + (data.spec ? '_' + data.spec: '');
								tempRowData.qty = tempData.qty;
								tempRowData.skuName = tempData.skuName;
								tempRowData.skuId = tempData.skuId;
								if(su){
									$('#' + addId).data('goodsInfo',tempRowData)
									.data('storageInfo', { 
										id: tempRowData.locationId, 
										name: tempRowData.locationName
									}).data('unitInfo',{
										unitId: tempRowData.unitId,
										name: tempRowData.unitName
									});
								}
								$grid.jqGrid('setRowData', addId, tempRowData);
								curRow && curRow++;
								var $_nextTr = $('#' + curID).next();
								if($_nextTr.length > 0) {
									curID = $('#' + curID).next().attr('id');
								} else {
									curID = '';
								};
								if($grid[0].id === 'fixedGrid'){
									//组装拆卸单的特殊处理,只要处理第一条
									break;
								}
							}
							if(curID === '') {
								if($grid[0].id === 'fixedGrid'){
									//组装拆卸单的特殊处理,不需要新增一行
									win.close();
									return;
								}
								$grid.jqGrid('addRowData', THISPAGE.newId, {}, 'last');
								THISPAGE.newId = THISPAGE.newId + 1;
							};
							THISPAGE.calTotal();	
							setTimeout( function() { $grid.jqGrid("editCell", curRow, 2, true) }, 10);
						}
						win.close();
					}
				},
				init:function(){
					//_self.skey = '';
					$grid.jqGrid("editCell", curRow, 2, true);
				},
				close:function(){
					//console.log(123)
				},
				lock: true,
				ok:false,
				focus:false,//很奇葩，不设置这个按回车会触发该控件上close按钮的click事件~~~
				cancle:false
			});
		}
		Business.billGoodsCombo = function($_obj, opts , isSkuSingle){
			var defaultPage = Public.getDefaultPage();
			opts = $.extend(true, {
				// autoSelectFirst:false//变来变去的。。。
				data: function(){
					if(defaultPage.SYSTEM.goodsInfo) {
						var usingData = []//获取启用状态的;
						for (var i = 0; i <  defaultPage.SYSTEM.goodsInfo.length; i++) {
							var g = defaultPage.SYSTEM.goodsInfo[i];
							if(!g['delete']){
								usingData.push(g);
							}
						};
						return usingData;
					} else {
						return '../basedata/inventory?action=list';
					}
				}
			}, opts);
			opts.callback = {
					onChange : function(data){
						var _self = this;
						_self.addQuery = true;
						var defaultPage = Public.getDefaultPage();
						var SYSTEM = defaultPage.SYSTEM;
						var parentTr = this.input.parents('tr');
						var $thisTd = this.input.closest('td');
						var goodsInfo = parentTr.data('goodsInfo')||{};
						opts.userData = opts.userData || {};
						if(data) {
							if(data.id != goodsInfo.id){
								//如果有商品信息
								delete data.amount;//商品的amount标示的是期初总额，这个字段没用
								if(!opts.disSerNum  && SYSTEM.ISSERNUM && data.isSerNum){
									//如果启用序列号
									parentTr.find('td:gt('+$thisTd.index()+')').html('');
									Business.serNumManage({
										row : parentTr,
										data : data,
										creatable : opts.userData.creatable
									});
								}else if(data.skuClassId && SYSTEM.enableAssistingProp){
									//如果启用多辅助属性
									parentTr.find('td:gt('+$thisTd.index()+')').html('');
									Business.billSkuManage(parentTr,data,isSkuSingle);
								}
								else{
									parentTr.data('goodsInfo', data);
									parentTr.data('storageInfo', { id: data.locationId, name: data.locationName});
									parentTr.data('unitInfo', { unitId: data.unitId, name: data.unitName});
								}
							}
						}else{
							parentTr.data('goodsInfo', null);
							parentTr.data('storageInfo',null);
							parentTr.data('unitInfo',null);
						}
					}
			};
			return Business.goodsCombo($_obj, opts);
		}
		Business.goodsCombo = function($_obj, opts){
			var defaultPage = Public.getDefaultPage();
			if ($_obj.length == 0) { return };
			var opts = $.extend(true, {
				data: function(){
					if(defaultPage.SYSTEM.goodsInfo) {
						return defaultPage.SYSTEM.goodsInfo;
					} else {
						return '../basedata/inventory?action=list';
					}
				},
				ajaxOptions: {
					formatData: function(data){
						defaultPage.SYSTEM.goodsInfo = data.data.rows;	//更新
						return data.data.rows;
					}	
				},
				formatText: function(data){
					return Business.formatGoodsName(data);

				},
				value: 'id',
				defaultSelected: -1,
				editable: true,
				extraListHtml: '<a href="javascript:void(0);" class="quick-add-link quickAddGoods"><i class="ui-icon-add"></i>新增商品</a>',
				maxListWidth: 500,
				cache: false,
				forceSelection: true,
				trigger: false,
				listHeight: 182,
				listWrapCls: 'ui-droplist-wrap',
				customMatch:function(item,query){
					var reg = new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
					var text = item.text + (item.rawData.pinYin || '');
					if(text.search(reg) == -1){
						return false;
					}
					return true;
				},
				callback: {
					onChange: function(data){
						var _self = this;
						_self.addQuery = true;
						var parentTr = this.input.parents('tr');
						var goodsInfo = parentTr.data('goodsInfo')||{};
						if(data) {
							if(data.id != goodsInfo.id){
								parentTr.data('goodsInfo', data);
								parentTr.data('storageInfo', { id: data.locationId, name: data.locationName});
								parentTr.data('unitInfo', { unitId: data.unitId, name: data.unitName});
							}
						}else{
							parentTr.data('goodsInfo', null);
							parentTr.data('storageInfo',null);
							parentTr.data('unitInfo',null);
						}
					},
					incrementalSearch: function(pos, callback){
						var _self = this;
						var query = $_obj.val()
						Public.ajaxGet('../basedata/inventory?action=list', { rows: 20, skey: query }, function(data){
							if(data.status === 200 || data.status === 250) {
								//SYSTEM.goodsInfo.push(data.data.rows);				
								_self.rawData = _self.addData = data.data.rows;	
								if(data.data.rows.length < _self.opts.maxFilter) {
									_self.addQuery = false;
								} else {
									_self.addQuery = true;
								};
								callback.call(_self);
								var addId = [];
								$.each(data.data.rows, function(i, n){
									addId.push(n.id);	
								});
								$.each(pos, function(i, n){
									if($.inArray(n.value, addId) !== -1) {
										if(i === 0) {
											defaultPage.SYSTEM.goodsInfo.splice(i, 1);
										} else {
											defaultPage.SYSTEM.goodsInfo.splice(i - 1, 1);
										};
									};	
								});
								$.merge(defaultPage.SYSTEM.goodsInfo, data.data.rows);
								var goodsInfo = defaultPage.SYSTEM.goodsInfo;
								if(goodsInfo.length > 100) {
									goodsInfo.splice(0, goodsInfo.length - 100);
								}
							};
						});
					},
					onListClick: function(){

					},
					onEnter:function(){
						setTimeout(function(){
							if(goodsCombo.isExpanded){
								goodsCombo.collapse();
							}
						},50)
					}
				},
				forceSelection : false,
				queryDelay: 200,
				inputCls: 'edit_subject',
				wrapCls: 'edit_subject_wrap',
				focusCls: '',
				disabledCls: '',
				activeCls: ''
			}, opts);
			
			var goodsCombo = $_obj.combo(opts).getCombo();
			
			//新增商品
			$('.quickAddGoods').unbind('click').on('click', function(e){
				e.preventDefault();
				if (!Business.verifyRight('INVENTORY_ADD')) {
					return ;
				};
				var _w = 1020,
				_h = defaultPage.SYSTEM.enableStorage?480:370;
				_h = defaultPage.SYSTEM.enableAssistingProp?_h:_h-100;
				_h = defaultPage.SYSTEM.ISSERNUM?_h + 40:_h;
				$.dialog({
					title : '新增商品',
					content : 'url:../settings/goods_manage',
					data: {oper: 'add', callback: function(data, oper, dialogWin){
						var goodID = data.id;
						//_self.goodsCombo.getAllRawData().push(data);
						defaultPage.SYSTEM.goodsInfo.push(data);
						data.unitId = data.unitId || data.baseUnitId;
						dialogWin && dialogWin.api.close();
						//var allRawData = _self.goodsCombo.getAllRawData();
						goodsCombo.loadData(defaultPage.SYSTEM.goodsInfo, '-1', false);
						setTimeout( function() {
							 //$("#grid").jqGrid("editCell", editRow, 2, true)
							 goodsCombo.selectByValue(goodID, true);
							 $_obj.focus();
						}, 10);
						
					}},
					width : _w,
					height : _h,
					max : false,
					min : false,
					cache : false,
					lock: true
				});
			});
			return goodsCombo;
		};
		Business.categoryCombo = function($_obj, opts, type){
			if ($_obj.length == 0) { return };
			var typeNumber = type||'';
			if(typeof opts != 'object'){
				typeNumber = opts;
				opts = {};
			}
			if(!typeNumber) { return };
			var defaultPage = Public.getDefaultPage();
			var opts = $.extend(true, {
				data: function(){
					if(defaultPage.SYSTEM.categoryInfo && defaultPage.SYSTEM.categoryInfo[typeNumber]) {
						return defaultPage.SYSTEM.categoryInfo[typeNumber];
					} else {
						return '../basedata/assist.do?action=list&isDelete=2&typeNumber='+typeNumber;
					}
				},
				ajaxOptions: {
					formatData: function(data){
						defaultPage.SYSTEM.categoryInfo = defaultPage.SYSTEM.categoryInfo ||{};
						defaultPage.SYSTEM.categoryInfo[typeNumber] = data.data.items;	//更新
						return data.data.items;
					}	
				},
				text: 'name',
				value: 'id',
				defaultSelected: -1,
				editable: true,
				extraListHtml: '<a href="javascript:void(0);" id="quickAddCategory" class="quick-add-link"><i class="ui-icon-add"></i>新增类别</a>',
				maxListWidth: 500,
				cache: false,
				forceSelection: true,
				maxFilter: 10,
				trigger: false,
				callback: {
					onChange: function(data){
						var parentTr = this.input.parents('tr');
						if(data) {
							parentTr.data('categoryInfo', data);
						}
					},
					onListClick: function(){

					}
				},
				queryDelay: 0
			}, opts);
			
			var categoryCombo = $_obj.combo(opts).getCombo();
			var rights = {
					'customertype' : 'BUTYPE_ADD',// '客户',
					'supplytype' : 'SUPPLYTYPE_ADD',// '供应商',
					'trade' : 'TRADETYPE_ADD'// '商品'
				};
			//新增分类
			$('#quickAddCategory').on('click', function(e){
				e.preventDefault();
				if (rights[typeNumber] && !Business.verifyRight(rights[typeNumber])) {
					return ;
				};
				var callback=function(data,dialogWin){
					categoryCombo.loadData(function(){return defaultPage.SYSTEM.categoryInfo[typeNumber]}, '-1', false);
					dialogWin.close();
					setTimeout( function() {
						categoryCombo.selectByValue(data.id, true);
						$_obj.focus();
					}, 10);
				};
				Public.categoryPop(typeNumber,window.parent,callback);
			});
			return categoryCombo;
		};
		Business.forSearch = function(id, text){
			if(id) {
				$.dialog({
					width: 470,
					height: 410,
					title: '商品库存查询',
					content: 'url:/inventory.jsp',
					data: { id: id, text: text},
					cancel: true,
					lock: true,
					cancelVal: '关闭'
					
				});
				//goodsCombo.removeSelected(false);
			} else {
				parent.Public.tips({type: 2, content : '请先选择一个商品！'});
			};
		};
		Business.billStorageCombo = function($_obj, opts){
			var defaultPage = Public.getDefaultPage();
			opts = $.extend(true, {
				data: function(){
					if(defaultPage.SYSTEM.storageInfo) {
						var usingData = []//获取启用状态的;
						for (var i = 0; i < defaultPage.SYSTEM.storageInfo.length; i++) {
							var g = defaultPage.SYSTEM.storageInfo[i];
							if(!g['delete']){
								usingData.push(g);
							}
						};
						return usingData;
					} else {
						return '../basedata/invlocation?action=list&isDelete=2';
					}
				}
			}, opts);
			return Business.storageCombo($_obj, opts);
		}
		Business.storageCombo = function($_obj, opts){
			var defaultPage = Public.getDefaultPage();
			if ($_obj.length == 0) { return };
			var opts = $.extend(true, {
					//data: parent.SYSTEM.storageInfo/*'/basedata/invlocation.do?action=list&isEnable=1'*/,
					data: function(){
						return defaultPage.SYSTEM.storageInfo;
					},
		/*			ajaxOptions: {
						formatData: function(data){
							return data.data.items;
						}	
					},*/
					text: 'name',
					value: 'id',
					defaultSelected: 0,
					cache: false,
					editable: true,
					trigger: false,
					defaultFlag: false,
					callback: {
						onChange: function(data){
							var parentTr = this.input.parents('tr');
							//var storageInfo = parentTr.data('storageInfo');
							//console.log(parentTr.data('storageInfo'))
		/*					if(!storageInfo) {
								storageInfo = {};
							};*/
							if(data) {
								parentTr.data('storageInfo', {id: data.id, name: data.name});
								//storageInfo.id = data.id;
								//storageInfo.name = data.name;
							}
						}
					}
				}, opts);
			
			var storageCombo = $_obj.combo(opts).getCombo();
			return storageCombo;
		};
		Business.unitCombo = function($_obj, opts){
			if ($_obj.length == 0) { return };
			var defaultPage = Public.getDefaultPage();
			var opts = $.extend(true, {
					//data: parent.SYSTEM.storageInfo/*'/basedata/invlocation.do?action=list&isEnable=1'*/,
					data: function(){
						return (defaultPage.SYSTEM || opts.userData.system).unitInfo;
					},
		/*			ajaxOptions: {
						formatData: function(data){
							return data.data.items;
						}	
					},*/
					text: 'name',
					value: 'id',
					defaultSelected: 0,
					cache: false,
					editable: false,
					trigger: false,
					defaultFlag: false,
					callback: {
						onChange: function(data){
							var parentTr = this.input.parents('tr');
							//var storageInfo = parentTr.data('storageInfo');
							//console.log(parentTr.data('storageInfo'))
		/*					if(!storageInfo) {
								storageInfo = {};
							};*/
							if(data) {
								data.id = data.id || data.unitId;
								parentTr.data('unitInfo', {unitId: data.id, name: data.name});
								//storageInfo.id = data.id;
								//storageInfo.name = data.name;
							}
						}
					}
				}, opts);
			
			var unitCombo = $_obj.combo(opts).getCombo();
			return unitCombo;
		};
		Business.accountCombo = function($_obj, opts){
			if ($_obj.length == 0) { return };
			var opts = $.extend(true, {
				data: function(){
					if(SYSTEM.accountInfo) {
						return SYSTEM.accountInfo;
					} else {
						return '../basedata/settAcct?action=list';
					}
				},
				ajaxOptions: {
					formatData: function(data){
						SYSTEM.accountInfo = data.data.items;	//更新
						return data.data.items;
					}	
				},
				formatText: function(data){
					return data.number + ' ' + data.name;
				},
				value: 'id',
				defaultSelected: 0,
				defaultFlag: false,
				cache: false,
				editable: true
			}, opts);	
			var accountCombo = $_obj.combo(opts).getCombo();
			return accountCombo;
		};

		Business.paymentCombo = function($_obj, opts){
			if ($_obj.length == 0) { return };
			var opts = $.extend(true, {
				data: function(){
					if(SYSTEM.paymentInfo) {
						return SYSTEM.paymentInfo;
					} else {
						return '../basedata/assist?action=list&typeNumber=PayMethod&isDelete=2';
					}
				},
				ajaxOptions: {
					formatData: function(data){
						SYSTEM.paymentInfo = data.data.items;	//更新缓存
						return data.data.items;
					}	
				},
				emptyOptions: true,
				text: 'name',
				value: 'id',
				defaultSelected: 0,
				cache: false,
				editable: false,
				trigger: false,
				defaultFlag: false
				
			}, opts);
			var paymentCombo = $_obj.combo(opts).getCombo();	
			return paymentCombo;
		};
		/*
		 * 网店下拉框
		 */
		Business.storeCombo = function($_obj, opts){
			if ($_obj.length == 0) { return };
			var defaultPage = Public.getDefaultPage();
			var SYSTEM = SYSTEM || defaultPage.SYSTEM || opts.system;
			var opts = $.extend(true, {
				data: function(){
					if(SYSTEM.storeInfo) {
						return SYSTEM.storeInfo;
					} else {
						return '/bs/cloudStore.do?action=list';
					}
				},
				ajaxOptions: {
					formatData: function(data){
						SYSTEM.storeInfo = data.data.items;	//更新
						return data.data.items;
					}	
				},
				formatText: function(data){
					return data.name;
				},
				value: 'id',
				defaultSelected: 0,
				addOptions : {text : '(所有)',value : -1	},
				defaultFlag: false,
				cache: false,
				editable: true
			}, opts);	
			var storeCombo = $_obj.combo(opts).getCombo();
			return storeCombo;
		};
		/*
		 * 物流公司下拉框
		 */
		Business.logisticCombo = function($_obj, opts){
			if ($_obj.length == 0) { return };
			var defaultPage = Public.getDefaultPage();
			var SYSTEM = SYSTEM || defaultPage.SYSTEM || opts.system;
			var opts = $.extend(true, {
				data: function(){
					if(SYSTEM.logisticInfo) {
						return SYSTEM.logisticInfo;
					} else {
						return '/bs/express.do?action=list';
					}
				},
				ajaxOptions: {
					formatData: function(data){
						SYSTEM.logisticInfo = data.data.items;	//更新
						return data.data.items;
					}	
				},
				formatText: function(data){
					return data.number + ' ' + data.name;
				},
				value: 'id',
				defaultSelected: 0,
				addOptions : {text : '(空)',value : 0	},
				defaultFlag: false,
				cache: false,
				editable: true
			}, opts);	
			var logisticCombo = $_obj.combo(opts).getCombo();
			return logisticCombo;
		};
		Business.billsEvent = function(obj, type, flag){
			var _self = obj;
			var defaultPage = Public.getDefaultPage();
			//新增分录
			$('.grid-wrap').on('click', '.ui-icon-plus', function(e){
				var rowId = $(this).parent().data('id');
				var newId = $('#grid tbody tr').length;
				var datarow = { id: _self.newId };
				var su = $("#grid").jqGrid('addRowData', _self.newId, datarow, 'before', rowId);
				if(su) {
					$(this).parents('td').removeAttr('class');
					$(this).parents('tr').removeClass('selected-row ui-state-hover');
					$("#grid").jqGrid('resetSelection');
					_self.newId++;
				}
			});
			//删除分录
			$('.grid-wrap').on('click', '.ui-icon-trash', function(e){
				if($('#grid tbody tr').length === 2) {
					parent.Public.tips({type: 2, content: '至少保留一条分录！'});
					return false;
				}
				var rowId = $(this).parent().data('id');
				var su = $("#grid").jqGrid('delRowData', rowId);
				if(su) {
					_self.calTotal();
				};
			});

			//区分组装拆卸单
			if(type !== 'assemble') {
				$('#customer').on('click', '.ui-icon-ellipsis', function(e){	
					var skey = $(this).data('skey');
					var lable = $('#customer').prev().text().slice(0, -1);
					var title = '选择' + lable;
					if(lable === '供应商' || lable === '购货单位') {
						var content = 'url:../settings/select_customer?type=10';
					} else {
						var content = 'url:../settings/select_customer';
					}
					_self.customerDialog = $.dialog({
						width: 775,
						height: 510,
						title: title,
						content: content,
						data: {
							skey : skey
						},
						lock: true,
						ok: function(){
							if(typeof this.content.callback === 'function'){
								this.content.callback();
								this.close();
							}
					        return false;
						},
						cancel: function(){
					        return true;
						}
					});
				});
				
				//批量添加
				$('.grid-wrap').on('click', '.ui-icon-ellipsis', function(e){
					var skuMult = false;
					if(!$(this).hasClass('disableSku')){
						skuMult = $(this).data('skuMult') || defaultPage.SYSTEM.enableAssistingProp;
					}
					$.dialog({
							width: 775,
							height: 510,
							title: '选择商品',
							content: 'url:http://'+defaultPage.location.hostname+'/settings/goods_batch',
							data: {
								skuMult: skuMult,
								skey:_self.skey,
								callback: function(newId, curID, curRow){
									if(curID === '') {
										$("#grid").jqGrid('addRowData', newId, {}, 'last');
										_self.newId = newId + 1;
									};
									setTimeout( function() { $("#grid").jqGrid("editCell", curRow, 2, true) }, 10);
									_self.calTotal();
								}
							},
							lock: true,
							button:[{name: '选中',defClass:'ui_state_highlight fl', callback: function () {
								this.content.callback(type);
						        return false;
							}},
							{name: '选中并关闭',defClass:'ui_state_highlight', callback: function () {
								this.content.callback(type);
								this.close();
						        return false;
							}},
							{name: '关闭', callback: function () {
						        return true;
							}}]
						});
						$(this).data('hasInstance', true);
				});
				//取消分录编辑状态
				$(document).bind('click.cancel', function(e){
					if(!$(e.target).closest(".ui-jqgrid-bdiv").length > 0 && curRow !== null && curCol !== null){
					   $("#grid").jqGrid("saveCell", curRow, curCol);
					   curRow = null;
					   curCol = null;
					};
				});
			};	
			initStorage();
			
			function initStorage() {
				var data = []//获取启用状态的;
				for (var i = 0; i < defaultPage.SYSTEM.storageInfo.length; i++) {
					var g = defaultPage.SYSTEM.storageInfo[i];
					if(!g['delete']){
						data.push(g);
					}
				};
				var list = '<ul>';
				for(var i = 0, len = data.length; i < data.length; i++) {
					list += '<li data-id="' + data[i].id + '" data-name="' + data[i].name + '" >' + data[i].locationNo + ' ' +data[i].name + '</li>';
				};
				list += '</ul>';
				$("#storageBox").html(list);
			};

			if(type === 'transfers') {
				return;
			};
			
			$("#batchStorage").powerFloat({
				eventType: "click",
				hoverHold: false,
				reverseSharp: true,
				target: function(){
					if(curRow !== null && curCol !== null){
					   $("#grid").jqGrid("saveCell", curRow, curCol);
					   curRow = null;
					   curCol = null;
					};
					return $("#storageBox");
				}
			});

			$('.wrapper').on('click', '#storageBox li', function(e){
				var stoId = $(this).data('id');
				var stoName = $(this).data('name');
				var ids = $("#grid").jqGrid('getDataIDs');
				var batName = 'locationName';
				var batInfo = 'storageInfo';
				for(var i = 0, len = ids.length; i < len; i++){
					var id = ids[i], itemData;
					var row = $("#grid").jqGrid('getRowData',id);
					var $_id = $('#' + id);
					if(row.goods === '' || $_id.data('goodsInfo') === undefined) {
						continue;	//跳过无效分录
					};
					var setData = {};
					setData[batName] = stoName;
					$("#grid").jqGrid('setRowData', id, setData);
					$('#' + id).data(batInfo, { id: stoId, name: stoName });
				};
				$.powerFloat.hide();
			});

		};

		Business.filterCustomer = function(){
			Business.customerCombo($('#customerAuto'), {
				width: '',
				formatText: function(data){
					return data.number + ' ' + data.name;
				},
				trigger: false,
				forceSelection: false,
				noDataText: '',
				extraListHtmlCls: '',
				extraListHtml: '', 
				callback: {
					onChange: function(data){
						if(data) {
							//this.input.data('ids', data.id);
							this.input.val(data.number);
						}
					}
				}
			});
			
			//客户
			$('#filter-customer .ui-icon-ellipsis').on('click', function(){
				var $input = $(this).prev('input');
				$.dialog({
					width: 570,
					height: 500,
					title: '选择客户',
					content: 'url:../settings/customer_batch',
					data:{isDelete:2},
					lock: true,
					ok: function(){
						Business.setFilterData(this.content, $input);
					},
					cancel: function(){
						return true;
					}
				});
			});
		};

		Business.filterSupplier = function(){
			Business.supplierCombo($('#supplierAuto'), {
				width: '',
				formatText: function(data){
					return data.number + ' ' + data.name;
				},
				trigger: false,
				forceSelection: false,
				noDataText: '',
				extraListHtmlCls: '',
				extraListHtml: '', 
				callback: {
					onChange: function(data){
						if(data) {
							//this.input.data('ids', data.id);
							this.input.val(data.number);
						}
					}
				}
			});
			
			//客户
			$('#filter-customer .ui-icon-ellipsis').on('click', function(){
				var $input = $(this).prev('input');
				$.dialog({
					width: 570,
					height: 500,
					title: '选择供应商',
					content: 'url:../settings/supplier_batch',
					data:{isDelete:2},
					lock: true,
					ok: function(){
						Business.setFilterData(this.content, $input);
					},
					cancel: function(){
						return true;
					}
				});
			});
		};
		//结算账户查询区域下拉框初始化
		Business.filterSettlementAccount = function(){
			Business.settlementAccountCombo($('#settlementAccountAuto'), {
				width: '',
				formatText: function(data){
					return data.number + ' ' + data.name;
				},
				trigger: false,
				forceSelection: false,
				noDataText: '',
				extraListHtmlCls: '',
				extraListHtml: '', 
				callback: {
					onChange: function(data){
						if(data) {
							//this.input.data('ids', data.id);
							this.input.val(data.number);
						}
					}
				}
			});
			
			//结算账户
			$('#filter-settlementAccount .ui-icon-ellipsis').on('click', function(){
				var $input = $(this).prev('input');
				$.dialog({
					width: 470,
					height: 500,
					title: '选择结算账户',
					content: 'url:../settings/settlementAccount_batch',
					data:{isDelete:2},
					lock: true,
					ok: function(){
						Business.setFilterData(this.content, $input);
					},
					cancel: function(){
						return true;
					}
				});
			});
		};

		Business.filterGoods = function(){
			Business.goodsCombo($('#goodsAuto'), { 
				forceSelection: false,
				noDataText: '',
				extraListHtmlCls: '',
				extraListHtml: '', 
				forceSelection: false,
				callback: {
					onChange: function(data){
						if(data) {
							this.input.data('ids', data.number);
							this.input.val(data.number);
						}
					}
				}
			});
			//商品	
			$('#filter-goods .ui-icon-ellipsis').on('click', function(){
				var $input = $(this).prev('input');
				$.dialog({
					width: 775,
					height: 500,
					title: '选择商品',
					content: 'url:../settings/goods_batch',
					data:{
						isDelete:2//获取全部商品要传2。。。
					},
					lock: true,
					ok: function(){
						Business.setFilterGoods(this.content, $input);
					},
					cancel: function(){
						return true;
					}
				});
			});
		};
		Business.filterStorage = function(){
			var defaultPage = Public.getDefaultPage();
			Business.storageCombo($('#storageAuto'), { 
				data: function(){
					return defaultPage.SYSTEM.storageInfo;
				},
				formatText: function(data){
					return data.locationNo + ' ' + data.name;
				},
				editable: true,
				defaultSelected: -1,
				forceSelection: false,
				callback: {
					onChange: function(data){
						if(data) {
							//this.input.data('ids', data.id);
							this.input.val(data.locationNo);
						}
					}
				}
			});
			//仓库
			$('#filter-storage .ui-icon-ellipsis').on('click', function(){
				var $input = $(this).prev('input');
				$.dialog({
					width: 510,
					height: 500,
					title: '选择仓库',
					content: 'url:../settings/storage_batch',
					data:{isDelete:2},
					lock: true,
					ok: function(){
						Business.setFilterData(this.content, $input);
					},
					cancel: function(){
						return true;
					}
				});
			});
		};
		Business.filterSaler = function(){
			Business.salesCombo($('#salerAuto'), {
					defaultSelected: -1,
					editable: true,
					extraListHtml: '',
					width:0,
					emptyOptions:false,
					forceSelection: false,
					formatText: function(row){
						return row.number + ' ' + row.name;
					},
					callback: {
						onChange: function(data){
							if(data) {
								//this.input.data('ids', data.id);
								this.input.val(data.number);
							}
						}
					},
					trigger:false
			});
			//销售员
			$('#filter-saler .ui-icon-ellipsis').on('click', function(){
				var $input = $(this).prev('input');
				$.dialog({
					width: 510,
					height: 500,
					title: '选择销售员',
					content: 'url:../settings/saler_batch',
					data:{isDelete:2},
					lock: true,
					ok: function(){
						Business.setFilterData(this.content, $input);
					},
					cancel: function(){
						return true;
					}
				});
			});
		};

		//将弹窗中返回的数据记录到相应的input中
		Business.setFilterData = function(dialogCtn, $input){
			var numbers = [];
			var ids = [];
			for(rowid in dialogCtn.addList){
				var row = dialogCtn.addList[rowid];
				ids.push(rowid);
				numbers.push(row.number || row.locationNo || row.serNum);
			}
			$input.data('ids', ids.join(',')).val(numbers.join(','));
		};

		Business.setFilterGoods = function(dialogCtn, $input){
			var numbers = [];
			var ids = [];
			for(rowid in dialogCtn.addList){
				var row = dialogCtn.addList[rowid];
				ids.push(rowid);
				numbers.push(row.number || row.locationNo);
			}
			$input.data('ids', ids.join(',')).val(numbers.join(','));
		};

		Business.moreFilterEvent = function(){
			$('#conditions-trigger').on('click', function(e){
				e.preventDefault();
			  if (!$(this).hasClass('conditions-expand')) {
				  $('#more-conditions').stop().slideDown(200, function(){
					   $('#conditions-trigger').addClass('conditions-expand').html('收起更多<b></b>');
					   $('#filter-reset').css('display', 'inline');
				  });
			  } else {
				  $('#more-conditions').stop().slideUp(200, function(){
					  $('#conditions-trigger').removeClass('conditions-expand').html('更多条件<b></b>');
					  $('#filter-reset').css('display', 'none');
				  });
			  };
			});
		};

		Business.gridEvent = function(){
			$('.grid-wrap').on('mouseenter', '.list tbody tr', function(e){
				$(this).addClass('tr-hover');
				if($_curTr) {
					$_curTr.removeClass('tr-hover');
					$_curTr = null;
				}
			}).on('mouseleave', '.list tbody tr', function(e){
				$(this).removeClass('tr-hover');
			});
		};

		//判断:当前元素是否是被筛选元素的子元素
		$.fn.isChildOf = function(b){
		    return (this.parents(b).length > 0);
		};

		//判断:当前元素是否是被筛选元素的子元素或者本身
		$.fn.isChildAndSelfOf = function(b){
		    return (this.closest(b).length > 0);
		};

		//数字输入框
		$.fn.digital = function() {
			this.each(function(){
				$(this).keyup(function() {
					this.value = this.value.replace(/\D/g,'');
				})
			});
		};

		/** 
		 1. 设置cookie的值，把name变量的值设为value   
		example $.cookie(’name’, ‘value’);
		 2.新建一个cookie 包括有效期 路径 域名等
		example $.cookie(’name’, ‘value’, {expires: 7, path: ‘/’, domain: ‘jquery.com’, secure: true});
		3.新建cookie
		example $.cookie(’name’, ‘value’);
		4.删除一个cookie
		example $.cookie(’name’, null);
		5.取一个cookie(name)值给myvar
		var account= $.cookie('name');
		**/
		$.cookie = function(name, value, options) {
		    if (typeof value != 'undefined') { // name and value given, set cookie
		        options = options || {};
		        if (value === null) {
		            value = '';
		            options.expires = -1;
		        }
		        var expires = '';
		        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
		            var date;
		            if (typeof options.expires == 'number') {
		                date = new Date();
		                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
		            } else {
		                date = options.expires;
		            }
		            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		        }
		        var path = options.path ? '; path=' + options.path : '';
		        var domain = options.domain ? '; domain=' + options.domain : '';
		        var secure = options.secure ? '; secure' : '';
		        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		    } else { // only name given, get cookie
		        var cookieValue = null;
		        if (document.cookie && document.cookie != '') {
		            var cookies = document.cookie.split(';');
		            for (var i = 0; i < cookies.length; i++) {
		                var cookie = jQuery.trim(cookies[i]);
		                // Does this cookie string begin with the name we want?
		                if (cookie.substring(0, name.length + 1) == (name + '=')) {
		                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		                    break;
		                }
		            }
		        }
		        return cookieValue;
		    }
		};
		Public.print = function (opt){
			var voucherIds = opt.$grid.jqGrid('getGridParam','selarrrow').join();
			var pdfUrl = opt.pdf;
			var sidx = opt.$grid.jqGrid('getGridParam','sortname');
			var sord = opt.$grid.jqGrid('getGridParam','sortorder');
			var billType = opt.billType;
			var data = {
				sidx: sidx,
				sord: sord,
				op: 2
			};
			if(opt.filterConditions){
				data = $.extend(true, data, opt.filterConditions);
			};
			if(voucherIds) {
				data.id = voucherIds;
			};
			$.dialog({
				title: opt.title,
				content : 'url:../print/print_settings_voucher',
				data: {taodaData: data, pdfData: data, pdfUrl: pdfUrl, billType:billType ,opt:opt},
				width: 520,
				height: 400,
				min: false,
				max: false,
				lock: true,
				ok: function(){
					this.content.doPrint();
					return false;
				},
				okVal: '打印',
				cancel: true
			});
		};
		//生成树
		Public.zTree = {
		    zTree: {},
		    opts:{
		    	showRoot:true,
		    	defaultClass:'',
		    	disExpandAll:false,//showRoot为true时无效
		    	callback:'',
		    	rootTxt:'全部'
		    },
		    setting: {
		        view: {
		            dblClickExpand: false,
		            showLine: true,
		            selectedMulti: false
		        },
		        data: {
		            simpleData: {
		                enable: true,
		                idKey: "id",
		                pIdKey: "parentId",
		                rootPId: ""
		            }
		        },
		        callback: {
		            //beforeClick: function(treeId, treeNode) {}
		        }
		    },
		    _getTemplate: function(opts) {
		    	this.id = 'tree'+parseInt(Math.random()*10000);
		        var _defaultClass = "ztree";
		        if (opts) {
		            if(opts.defaultClass){
		                _defaultClass += ' ' + opts.defaultClass;
		            }
		        }
		        return '<ul id="'+this.id+'" class="' + _defaultClass + '"></ul>';
		    },
		    init: function($target, opts, setting ,callback) {
		        if ($target.length === 0) {
		            return;
		        }
		        var self = this;
		        self.opts = $.extend(true, self.opts, opts);
		        self.container = $($target);
		        self.obj = $(self._getTemplate(opts)); 
		        self.container.append(self.obj);
		        setting = $.extend(true, self.setting, setting);
		        Public.ajaxPost('../basedata/assist?action=list&typeNumber=trade&isDelete=2', {}, function(data) {
		            if (data.status === 200 && data.data) {
		            	self._callback(data.data.items);
		            } else {
		            	Public.tips({
		                    type: 2,
		                    content: "加载分类信息失败！"
		                });
		            }
		        });
		        return self;
		    },
		    _callback: function(data){
		    	var self = this;
		    	var callback = self.opts.callback;
		    	if(self.opts.showRoot){
		    		data.unshift({name:self.opts.rootTxt,id:0});
		        	self.obj.addClass('showRoot');
		    	}
		    	if(!data.length) return;
		    	self.zTree = $.fn.zTree.init(self.obj, self.setting, data);
		    	//self.zTree.selectNode(self.zTree.getNodeByParam("id", 101));
		    	self.zTree.expandAll(!self.opts.disExpandAll);
		    	if(callback && typeof callback === 'function'){
		    		callback(self, data);
		    	}
		    }
		};
		//分类下拉框
		Public.categoryTree = function($obj, opts) {
			if ($obj.length === 0) {
		        return;
		    }
			opts = opts ? opts : opts = {};
			var opts = $.extend(true, {
				inputWidth:'145',
				width:'',//'auto' or int
				height:'240',//'auto' or int
				trigger:true,
				defaultClass:'ztreeCombo',
				disExpandAll:false,//展开全部
				defaultSelectValue:0,
				showRoot:true,//显示root选择
				rootTxt:'全部',
				treeSettings : {
					callback:{
						beforeClick: function(treeId, treeNode) {
							if(_Combo.obj){
								_Combo.obj.val(treeNode.name);
								_Combo.obj.data('id', treeNode.id);
								_Combo.hideTree();
							}
						}
					}
				}
			}, opts);
			var _Combo = {
				container:$('<span class="ui-tree-wrap" style="width:'+opts.inputWidth+'px"></span>'),
				obj : $('<input type="text" class="input-txt" style="width:'+(opts.inputWidth-26)+'px" id="'+$obj.attr('id')+'" autocomplete="off" readonly value="'+($obj.val()||$obj.text())+'">'),
				trigger : $('<span class="trigger"></span>'),
				data:{},
				init : function(){
					var _parent = $obj.parent();
					var _this = this;
					$obj.remove();
					this.obj.appendTo(this.container);
					if(opts.trigger){
						this.container.append(this.trigger);
					}
					this.container.appendTo(_parent);
					opts.callback = function(publicTree ,data){
						_this.zTree = publicTree;
						//_this.data = data;
						if(publicTree){
							publicTree.obj.css({
								'max-height' : opts.height
							});
							for ( var i = 0, len = data.length; i < len; i++){
								_this.data[data[i].id] = data[i];
							};
							if(opts.defaultSelectValue !== ''){
								_this.selectByValue(opts.defaultSelectValue);
							};
							_this._eventInit();
						}
					};
					this.zTree = Public.zTree.init($('body'), opts , opts.treeSettings);
					return this;
				},
				showTree:function(){
					if(!this.zTree)return;
					if(this.zTree){
						var offset = this.obj.offset();
						var topDiff = this.obj.outerHeight();
						var w = opts.width? opts.width : this.obj.width();
						var _o = this.zTree.obj.hide();
						_o.css({width:w, top:offset.top + topDiff,left:offset.left-1});
					}
					var _o = this.zTree.obj.show();
					this.isShow = true;
					this.container.addClass('ui-tree-active');
				},
				hideTree:function(){
					if(!this.zTree)return;
					var _o = this.zTree.obj.hide();
					this.isShow = false;
					this.container.removeClass('ui-tree-active');
				},
				_eventInit: function(){
					var _this = this;
					if(opts.trigger){
						_this.trigger.on('click',function(e){
							e.stopPropagation();
							if(_this.zTree && !_this.isShow){
								_this.showTree();
							}else{
								_this.hideTree();
							}
						});
					};
					_this.obj.on('click',function(e){
						e.stopPropagation();
						if(_this.zTree && !_this.isShow){
							_this.showTree();
						}else{
							_this.hideTree();
						}
					});
					if(_this.zTree){
						_this.zTree.obj.on('click',function(e){
							e.stopPropagation();
						});
					}
					$(document).click(function(){
						_this.hideTree();
					});
				},
				getValue:function(){
					var id = this.obj.data('id') || '';
					if(!id){
						var text = this.obj.val();
						if(this.data){
							for(var item in this.data){
								if(this.data[item].name === text){
									id = this.data[item].id;
								}
							}
						}
					}
					return id;
				},
				getText:function(){
					if(this.obj.data('id'))
						return this.obj.val();
					return '';
				},
				selectByValue:function(value){
					if(value !== ''){
						if(this.data){
							this.obj.data('id', value);
							this.obj.val(this.data[value].name);
						}
					}
					return this;
				}
			};
			return _Combo.init();
		};
		/*
		 * 分类新增弹窗
		 * 不支持多级结构（树）
		 * type string 分类类型
		 * parentWin object 父窗口对象,决定弹窗的覆盖范围，默认当前窗口的parent
		 */
		Public.categoryPop = function(type,targetWin,callback){ 
			var defaultPage = Public.getDefaultPage();
			var self = {
					init:function(){
						var myParent = targetWin || parent;
						var showParentCategory = false;
						var content = $(['<form id="manage-form" action="" style="width: 282px;">',
						               '<ul class="mod-form-rows manage-wrap" id="manager">',
								           '<li class="row-item">',
								               '<div class="label-wrap"><label for="category">类别:</label></div>',
								               '<div class="ctn-wrap"><input type="text" value="" class="ui-input" name="category" id="category" style="width:190px;"></div>',
								           '</li>',
								       '</ul>',
							       '</form>'].join(''));
						var height = 90;
						var dialog = myParent.$.dialog({
							title : '新增类别',
							content : content,
							//data: data,
							width : 400,
							height : height,
							max : false,
							min : false,
							cache : false,
							lock: true,
							okVal:'确定',
							ok:function(){
								var	category = $.trim(content.find('#category').val());
								if(!category){
									defaultPage.Public.tips({content : '请输入类别名称！'});
									category.focus();
									return false;
								}
								var oper = 'add'; 
								var params = { name: category ,typeNumber: type};
								var msg = '新增类别';
								Public.ajaxPost('../basedata/assist.do?action=' + oper, params, function(data){
									if (data.status == 200) {
										defaultPage.Public.tips({content : msg + '成功！'});
										defaultPage.SYSTEM.categoryInfo[type].push(data.data);
										if(typeof callback ==='function'){
											callback(data.data,dialog);
										}
									} else {
										defaultPage.Public.tips({type:1, content : msg + '失败！' + data.msg});
									}
								});
								return false;
							},
							cancelVal:'取消',
							cancel:function(){
								return true;
							}
						});
					}
			};
			self.init();
		};
		/*
		 * 兼容IE8 数组对象不支持indexOf()
		 * create by guoliang_zou ,20140812
		 */
		if (!Array.prototype.indexOf)
		{
		  Array.prototype.indexOf = function(elt /*, from*/)
		  {
		    var len = this.length >>> 0;
		    var from = Number(arguments[1]) || 0;
		    from = (from < 0)
		         ? Math.ceil(from)
		         : Math.floor(from);
		    if (from < 0)
		      from += len;
		    for (; from < len; from++)
		    {
		      if (from in this &&
		          this[from] === elt)
		        return from;
		    }
		    return -1;
		  };
		}
		/**
		 * 省市区
		 * 省下拉框ID：provinceCombo
		 * 市下拉框ID：cityCombo
		 * 区下拉框ID：areaCombo
		 * 需要搭配COMBO插件
		 * 默认值放在data('defaultValue')
		 */	
		var mod_AreasCombo = (function(mod) {
			var	_areasList = [],
				_capable = false,//模块启动开关
				_provinceList = [],
				_cityList = [], 
				_areasCahe = {},
				_pCombo,_cCombo,_aCombo;

			mod.init = function(_provinceCombo,_cityCombo,_areaCombo ,callback){
				_pCombo = _provinceCombo;
				_cCombo = _cityCombo;
				_aCombo = _areaCombo;
				//缓存省市数据
				if(!(_provinceCombo&&_cityCombo&&_areaCombo)){
					return;
				}
				Public.ajaxPost('../js/common/areasData.js', {}, function(data){
					if(data) {
						_capable = true;
						_areasList = data.areas_get_response.areas.area;
						for (i = 0,len = _areasList.length; i < len; i++) {
							if (_areasList[i].type === 2 && _areasList[i].parent_id === 1) {
								_provinceList.push({name:_areasList[i].name,id:_areasList[i].id, type:2, parent_id:1});
							} //中国的省
							if (_areasList[i].type === 3) {
								_cityList.push({name:_areasList[i].name,id:_areasList[i].id,type:_areasList[i].type,parent_id:_areasList[i].parent_id});
							} //中国的市
						}
						mod.provinceCombo = _getCombo( _pCombo,_getProvinceData());
						mod.cityCombo = _getCombo( _cCombo,[]);
						mod.areaCombo = _getCombo( _aCombo,[]);
						//mod.provinceCombo.loadData(_getProvinceData(),-1,false);
						callback();
					} else {
						Public.tips({type: 1, content : '初始化省市区失败！'});
					}
				});
				return mod;
			};
			function _getCombo(obj,data){
				var _disabled = $(obj).hasClass('disabled');
				return obj.combo({
					data: data,
					text: 'name',
					value: 'id',
					width: 112,
					defaultSelected: -1,
					//addOptions: {text:'', value: -1},
					cache: false,
					editable:true,
					disabled: _disabled,
					callback: {
						onFocus: null,
						onBlur: null,
						beforeChange: null,
						onChange: function(){
							switch(this){
							case mod.provinceCombo :
								mod.cityCombo.loadData(_getCityData(mod.provinceCombo.getValue()),-1,false);
								mod.areaCombo.loadData([],-1,false);
								break;
							case mod.cityCombo :
								mod.areaCombo.loadData(_getAreaData(mod.cityCombo.getValue()),-1,false);
								break;
							case mod.areaCombo :
								break;
							default:break;
							}
						},
						onExpand: null,
						onCollapse: null
					}
				}).getCombo();
			};
			function _getProvinceData (){
				var _data = [];
				for (i = 0,len = _provinceList.length; i < len; i++) {
					if (_provinceList[i].type === 2 && _provinceList[i].parent_id === 1) {
						_data.push({name:_provinceList[i].name,id:_provinceList[i].id});
					} 
				}
				return _data;
			};
			function _getCityData (PID){
				var _data = [];
				for (i = 0,len = _cityList.length; i < len; i++) {
					if (_cityList[i].parent_id === PID) {
						_data.push({name:_cityList[i].name,id:_cityList[i].id});
					} 
				}
				return _data;
			};
			function _getAreaData (PID){
				var _data = [];
				//查找缓存
				if(_areasCahe[PID]){
					_data = _areasCahe[PID].areaData;
				}
				//没有缓存则全表查找
				else{
					for (i = 0, len = _areasList.length; i < len; i++) {
						if (_areasList[i].type === 4 && _areasList[i].parent_id === PID) {
							_data.push({name:_areasList[i].name,id:_areasList[i].id});
						}
					}
					//缓存该次查找结果
					_areasCahe[PID] ={areaData : _data} ;
				}
				return _data;
			};
			return mod;
		})(mod_AreasCombo || {})

});



