(function($){
	$.fn.numberField = function(opts){
		return $(this).each(function(){
			if(this.tagName.toLowerCase() != 'input'){return ;}

			if( typeof(opts) == 'string' ){
				var instance = $(this).data('_numberField');
				if( !instance ){return ;}
				var args = Array.prototype.slice.call( arguments, 1 );
				if( typeof(instance[opts]) === 'function' ){
					instance[opts].apply(instance, args);
				}
				
			}

			else {
				var instance = $(this).data('_numberField');
				if( instance ){return ;}
				instance = new $.NumberField($(this),opts);
				$(this).data('_numberField', instance);
			}
		});
	}


	$.NumberField = function(obj, opts){
		this.input = obj;
		this.opts = $.extend(true, {}, $.NumberField.defaults, opts);
		this._init();
	}

	$.fn.getNumberField = function(){
		return $.NumberField.getNumberField(this);
	}


	$.NumberField.getNumberField = function(obj){
		obj = $(obj)
		if(obj.length == 0) {
			return ;
		} else if (obj.length == 1){
			return obj.data('_numberField');
		} else if ( obj.length > 1) {
			var array = [];
			obj.each(function(idx){
				array.push(this.data('_numberField'));
			})
			return array;
		}
	}

	$.NumberField.prototype = {

		constructor: $.NumberField,


		_init: function(){
			var opts = this.opts, min = parseFloat(opts.min), max = parseFloat(opts.max), 
				step = parseFloat(opts.step), precision = parseInt(opts.precision);
			this.min = !isNaN(min) ? min : Number.NEGATIVE_INFINITY;
			this.max = !isNaN(max) ? max : Number.MAX_VALUE;
			this.step = !isNaN(step) ? step : 1;
			this.precision = isNaN(precision) || !opts.decimal || precision < 0 ? 0 : precision;
			this.allowedReg = this._getAllowedReg();
			this.input.css('ime-mode', 'disabled');

			this._initVal();
			this._initDisabled();
			this._bindEvent();
		},


		_getAllowedReg: function(){
			var opts = this.opts, allowed = '0123456789', reg;
			if(opts.decimal){
				allowed += '.';
			}
			if(this.min < 0){
				allowed += '-';
			}
			allowed = allowed.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
			reg = new RegExp('[' + allowed + ']');
			return reg;
		},


		_initVal: function(){
			var val = this._getProcessedVal(this.opts.value);
			if(val === false){
				val = this._getProcessedVal(this.input.val());
				if(val === false){
					val = '';
				}
			}
			this._val = this.originVal = val;
			this.input.val(val);
		},


		_initDisabled: function(){
			var opts = this.opts;
			this._disabled = opts.disabled === true ? true : opts.disabled === false ? false : !!this.input.attr('disabled');
			this.originDisabled = this._disabled;
			this._handleDisabled(this._disabled);
		},


		_bindEvent: function(){
			var self = this, opts = self.opts;
			var KEYS = {
				'up': 38,
				'down': 40
			}

			//var mouseWheel = $.browser.mozilla ? 'DOMMouseScroll' : 'mousewheel';
			var mouseWheel = 'mousewheel';

			this.input.on('keydown', function(e){
				var which = e.which;
				if( which == KEYS.up || which == KEYS.down ){
					if( !opts.keyEnable ){ return ;}
					var operator = which == KEYS.up ? 'plus' : 'minus';
					self._handleAdjusting(operator);
					e.preventDefault();
				}
			})
			.on('keypress', function(e){
				var charCode = typeof e.charCode != 'undefined' ? e.charCode : e.keyCode; 
				var keyChar = $.trim(String.fromCharCode(charCode));
				if(charCode != 0 && !self.allowedReg.test(keyChar)){
					e.preventDefault();
				}
			})
			.on('keyup', function(e){
				self._clearAutoRepeat();
			})
			.on('focus', function(e){
				self.focus = true;
				//self.wrap.addClass(opts.activeCls);
			})
			.on('blur', function(e){
				self.focus = false;
				//self.wrap.removeClass(opts.activeCls);
				var val = $.trim(self.input.val());
				//alert('blur')
				//self._clearAutoRepeat();
				if(val === self._val){return ;}
				if(!self.setValue(val)){
					self.input.val(self._val);
				}
			})
			.on(mouseWheel,function(e){
				e.preventDefault();
				if (!self.focus || !opts.wheelEnable) {return ;}
				e = e.originalEvent;
				var delta = e.wheelDelta ? (e.wheelDelta / 120) : (- e.detail / 3);
				var operator = delta == 1 ? 'plus' : 'minus';
				var val = self.input.val();
				if(val !== self._val && !self.setValue(val)){
					self.input.val(this._val);
				}
				self._adjustVal(operator);
			});
		},


		/**
			*对原始值进行处理
			*@return {false || string || number} 原始值为空返回''，为NaN返回false，为number返回处理好的数字
		*/
		_getProcessedVal: function(val){
			if(typeof val == 'string' && $.trim(val) === '') {return '';}
			val = parseFloat(val);
			if(isNaN(val)){return false;}
			val = val > this.max ? this.max : val < this.min ? this.min : val;
			val = val.toFixed(this.precision);
			if (!this.opts.forceDecimal) {
				val = parseFloat(val);
			}
			return val;
		},


		enable: function(){
			this._handleDisabled(false);
		},


		disable: function(){
			this._handleDisabled(true);
		},


		_handleDisabled: function(disabled){
			var opts = this.opts;
			disabled === true ? this.input.addClass(opts.inputDisabledCls) : this.input.removeClass(opts.inputDisabledCls);
			this._disabled = disabled;
			this.input.attr('disabled', disabled);
		},

		
		/**
			*有微调发生时，对微调进行处理
		*/
		_handleAdjusting: function(operator){
			var val = this.input.val();
			if(val !== this._val && !this.setValue(val)){
				this.input.val(this._val);
			}

			//已经到达最大值，最小值时
			if( (this._val === this.max && operator == 'plus') || (this._val === this.min && operator == 'minus') ){
				return ;
			}

			if(this.opts.autoRepeat){
				this._clearAutoRepeat();
				this._setAutoRepeat(operator);
			}
			this._adjustVal(operator);
		},


		/**
			*微调值
		*/
		_adjustVal: function(operator){
			//已经到达最大值，最小值时
			if( (this._val === this.max && operator == 'plus') || (this._val === this.min && operator == 'minus') ){
				this._clearAutoRepeat();
				return ;
			}
			var baseVal = this._val !== '' ? this._val : this.min < 0 && this.min > Number.NEGATIVE_INFINITY ? this.min : 0;
			var val = operator == 'plus' ? baseVal + this.step : baseVal - this.step;
			this.setValue(val);
		},


		_setAutoRepeat: function(operator){
			var opts = this.opts, self = this;
			self.autoTimer = window.setTimeout(function(){
				self.autoRepeater = window.setInterval(function(){
					self._adjustVal(operator);
				}, opts.interval);
			},opts.delay);
		},


		_clearAutoRepeat: function(){
			if(this.autoTimer){
				window.clearTimeout(this.autoTimer);
			}
			if(this.autoRepeater){
				window.clearTimeout(this.autoRepeater);
			}
		},


		setValue: function(val){
			var opts = this.opts;
			if(this._disabled){return ;}
			val = this._getProcessedVal(val);
			if(val === false){return ;}
			this.input.val(val);
			this._val = val;
			return true;
		}

	}


	$.NumberField.defaults = {
		value: undefined,
		max: undefined,
		min: undefined,
		step: 1,
		decimal: false,
		precision: 2,
		disabled: undefined,
		keyEnable: false,
		wheelEnable: false,
		autoRepeat: true,
		delay: 400, 
		interval: 80,

		inputCls: 'ui-input',
		inputDisabledCls: 'ui-input-disabled'
		
	}


})(jQuery);



/**
	*Spinbox插件 扩展自 NumberField
	*带微调按钮的数字输入框
*/
(function($){
	$.fn.spinbox = function(opts){
		return $(this).each(function(){
			if( typeof(opts) == 'string' ){
				var instance = $(this).data('_spinbox');
				if( !instance ){return ;}
				var args = Array.prototype.slice.call( arguments, 1 );
				if( typeof(instance[opts]) === 'function' ){
					instance[opts].apply(instance, args);
				}
				
			}

			else {
				var instance = $(this).data('_spinbox');
				if( instance ){return ;}
				instance = new $.Spinbox($(this),opts);
				$(this).data('_spinbox', instance);
			}
		});
	}

	$.fn.getSpinbox = function(){
		return $.Spinbox.getSpinbox(this);
	}


	$.Spinbox = function(obj, opts){
		this.obj = obj;
		this.opts = $.extend(true, {}, $.Spinbox.defaults, opts);
		this._init();
	}

	$.Spinbox.getSpinbox = function(obj){
		obj = $(obj)
		if(obj.length == 0) {
			return ;
		} else if (obj.length == 1){
			return obj.data('_spinbox');
		} else if ( obj.length > 1) {
			var array = [];
			obj.each(function(idx){
				array.push(this.data('_spinbox'));
			})
			return array;
		}
	}

	$.Spinbox.prototype = {

		constructor: $.Spinbox,
		

		_init: function(){
			this._createStruture();
			this._initDisabled();
			this._bindEvent();
		},
		


		_createStruture: function(){
			var opts = this.opts, nextSibling, w = parseInt(opts.width), inputW;
			if( this.obj[0].tagName.toLowerCase() == 'input' ) {
				this.input = this.obj;
				this.obj = this.obj.parent();
				nextSibling = this.input.next().length == 0 ? null : this.input.next();
			} else {
				this.input = $('<input type="text" />');
			}
			this.input.attr('autocomplete', 'off').addClass(opts.inputCls).numberField(opts);
			this.numberField = this.input.data('_numberField');
			this.downBtn = $('<a />').addClass(opts.downBtnCls);
			this.upBtn = $('<a />').addClass(opts.upBtnCls);
			this.btnWrap = $('<span />').addClass(opts.btnWrapCls).append(this.upBtn,this.downBtn);
			this.btns = this.btnWrap.children();
			this.wrap = $('<span />').addClass(opts.wrapCls).append(this.input, this.btnWrap);
			if(nextSibling){
				this.wrap.insertBefore(nextSibling);
			} else {
				this.wrap.appendTo(this.obj);
			}

			if(w){
				this.wrap.width(w);
				inputW = w - this.btnWrap.outerWidth() - (this.input.outerWidth() - this.input.width());
				this.input.width(inputW);
			}
		},

		_initDisabled: function(){
			var opts = this.opts;
			this._disabled = opts.disabled === true ? true : opts.disabled === false ? false : undefined;
			if(this._disabled === undefined){
				this._disabled = !!this.input.attr('disabled');
			}
			this.defaultDisabled = this._disabled;
			if(this._disabled === true){
				this.disable();
			}
		},


		_bindEvent: function(){
			var self = this, opts = this.opts;

			this.wrap.on('mouseover', function(e){
				if(self._disabled){return ;}
				self.wrap.addClass(opts.hoverCls);
			}).on('mouseleave', function(e){
				if(self._disabled){return ;}
				self.wrap.removeClass(opts.hoverCls);
			});

			this.btnWrap.on('mouseover', function(e){
				if(self._disabled){return ;}
				$(this).addClass(opts.btnWrapHoverCls);
			}).on('mouseleave', function(e){
				if(self._disabled){return ;}
				$(this).removeClass(opts.btnWrapHoverCls);
			});


			//IE下需处理dblClick事件,IE9以下dblClick只执行一次click事件
			//var clickEvent = $.browser.msie && parseInt($.browser.version) < 9 ? 'mousedown dblclick' : 'mousedown';
			var clickEvent = 'mousedown';
			this.btns.on(clickEvent, function(e){
				if(self._disabled){ return ;}
				var operator = $(this)[0] == self.upBtn[0] ? 'plus' : 'minus';
				self.input.focus();
				if(e.type == 'mousedown'){
					self.numberField._handleAdjusting(operator);
				} else if(e.type == 'dblclick'){
					self.numberField._adjustVal(operator);
				}
				e.preventDefault();
			}).on('mouseup mouseleave', function(e){
				self.numberField._clearAutoRepeat();
			});


			this.input.on('focus',function(e){
				self.wrap.addClass(opts.activeCls);
			}).on('blur', function(){
				self.wrap.removeClass(opts.activeCls);
			});

			$(document).on('mousedown', function(e){
				var target  = e.target || e.srcElement;
				if( $(target).closest(self.wrap).length == 0){
					self.wrap.removeClass(opts.activeCls);
				}
			});
		},

		enable: function(){
			this._handleDisabled(false);
		},

		disable: function(disabled){
			disabled = typeof disabled == 'undefined' ? true : !!disabled; 
			this._handleDisabled(disabled);
		},
		
		_handleDisabled: function(disabled){
			var opts = this.opts;
			disabled === true ? this.wrap.addClass(opts.disabledCls) : this.wrap.removeClass(opts.disabledCls);
			this._disabled = disabled;
			this.numberField._handleDisabled(disabled);
		},

		getDisabled: function(){
			return this._disabled;
		},

		getValue: function(){
			this.numberField.getValue();
		},

		setValue: function(val){
			return this.numberField.setValue(val);
		}

	}

	$.Spinbox.defaults = $.extend(true, $.NumberField.defaults, {
		/*min: undefined,
		max: undefined,
		step: 1, //每次增加的值
		value: undefined,
		width: undefined, //spinbox总宽
		disabled: undefined,
		keyEnable: true,
		wheelEnable: true,
		autoRepeat: true,
		delay: 400, 
		interval: 50,*/
		width: undefined,

		wrapCls: 'ui-spinbox-wrap',
		activeCls: 'ui-spinbox-active',
		disabledCls: 'ui-spinbox-disabled',
		hoverCls: 'ui-spinbox-hover',
		inputCls: 'input-txt',
		btnWrapCls: 'btn-wrap',
		btnWrapHoverCls: 'btn-wrap-hover',
		btnCls: 'btn',
		downBtnCls: 'btn-down',
		upBtnCls: 'btn-up'

	})

})(jQuery);
