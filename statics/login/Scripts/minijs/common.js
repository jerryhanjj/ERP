// JavaScript Document

function is_iPad(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/iPad/i)=="ipad") {
		return true;
 	} else {
		return false;
	}
}
function IsPC() {
    var userAgentInfo = navigator.userAgent;
	
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
if(is_iPad()){
	var viewport = document.querySelector("meta[name=viewport]");viewport.setAttribute('content', 'width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;');
}
function SameHeight(){
	 var iheightArr = new Array();
	$(".sBowserBoxDiv").each(function(index, element) { 
		var geth = $(this).css("height");
		 geth = geth.substring(0,geth.length-2);
		iheightArr.push(parseInt(geth));
    });	
	if(iheightArr.length > 1){
	$(".sBowserBoxDiv").css("height",Math.max.apply(null,iheightArr));
	}
	}


function SaveFunAniamte(id, iscroll){
	$("div[id^=PopBox]").hide();
	if(iscroll == "iscroll"){
		
		setTimeout(function(){myScrolls.refresh(); },200)	
	}
	if(iscroll == "iscroll1"){
			

				setTimeout(function(){	
					if($("#JtAutoIntent").hasClass('JtAutoIntentDetail')){
						var w1 = 0		
						for(var i=0;i<$("#JtAutoIntent .JtAuto").length;i++){
							if($("#JtAutoIntent .JtAuto").eq(i).width()>=w1){
								$("#JtAutoIntent .JtAuto").eq(i).width();
								w1 = $("#JtAutoIntent .JtAuto").eq(i).width();
							}
						}
						$("#djdrIntent").css("width",w1+'px');			
					}else{
						$("#djdrIntent").css("width",$("#JtAutoIntent").width());			
					}
				myScrolls1.refresh();
				$('#FyEditBg,#FyEditBox').show();
				},200)	
		}
	if(iscroll == "iscroll2"){
			
			setTimeout(function(){	
				if($("#JtAutoBan").hasClass('JtAutoBanDetail')){
					var w1 = 0		
					for(var i=0;i<$("#JtAutoBan .JtAuto").length;i++){
						if($("#JtAutoBan .JtAuto").eq(i).width()>=w1){
							$("#JtAutoBan .JtAuto").eq(i).width();
							w1 = $("#JtAutoBan .JtAuto").eq(i).width();
						}
					}
					$("#djdrBan").css("width",w1+'px');			
				}else{
					$("#djdrBan").css("width",$("#JtAutoBan").width());					
				}
				myScrolls2.refresh();
				$('#FyEditBg,#FyEditBox').show(); 
			},200);
			
		
		}
	var dh = $(document).height(), wh = $(window).height(), ww = $(window).width(), dst = $(document).scrollTop();
	$("#PopBg").css({"height":dh}).show();	
	$(id).show();
	var gd = $(id).height(), gw = $(id).width();
	
	var t = (wh-gd)/2-55+dst; 
	  t = (t<10) ?  20 : t;
	var l = (ww-gw)/2; 
	if(l<=0){l = 10}
	$(id).show().css({"top":t,"left":l});
	
	
	$(window).resize(function(){
		if($(id).css("display") == "block"){
			SaveFunAniamte(id);	
		}
	});
}

//刷新myScrolls

function closePop(id){
	$("#PopBg").hide();
	$(id).hide();
}

//洗客池详情使用
function closePop2(id){
	$("#PopBg").hide();
	$(id).hide();
	myScrolls1.refresh();
	myScrolls2.refresh();
}

function loadTR(){
	$(".FyLi").each(function(index, element) {
      var getLength = $(this).find("li").length;
	  var yshu =  getLength % 6; 
	 
	  var istring = '';
	  
	  for(var i=0; i< (6-yshu); i++){
		  istring += '<li>&nbsp;</li>';
		 }
		 if(yshu== 0 && getLength> 0){
		}else{
				$(this).append(istring);
			}
		 var getLength1 = $(this).find("li").length;
		 if(getLength1 <=6){
			$(".FyTitle").eq(index).css({"border-bottom":0});
		}
		for(var i =0; i< getLength1; i++){
			if(i!=0 && (i+1)%6 == 0){
				 $(this).find("li").eq(i).css({"border-right":0})		
			}
		}
    });	
}


function Tm(SearchDataId,ABoxl,ABoxt,dw,dh,Aw,Ah,At,Ab){
	var lei=$("#Pou_"+SearchDataId).attr("class");
	 var ClassArray = ['top_arrow', 'rt_arrow', 'bottom_arrow', 'lt_arrow'];
	 var BoxW = $("#Pou_" + SearchDataId).width(),BoxH = $("#Pou_" + SearchDataId).height();
		if (ABoxl > (dw* 2/3)) {
			if (Ab < BoxH) {
				
				var JtTOPM = BoxW - Aw;
				mjt = "<span class='" + ClassArray[2] + "' style='left:" + JtTOPM + "px'></span>";
				$("#Pou_" + SearchDataId).find(".PupClassBox").prepend(mjt);
				$("#Pou_" + SearchDataId).css({
					"left": ABoxl - BoxW + 50,
					"top": ABoxt - BoxH - 10
				})
			} else {
				
				var JtTOP = BoxH / 2 - 5;
				var Mj = ABoxt  - BoxH / 2,
				mleft = BoxW / 2 + 130;
				if (Mj < 50) {
					if (lei == "touxiang_bgboxwu"){
						mjt = "<span class='" + ClassArray[0] + "' style='left:" + mleft + "px'></span>";
						$("#Pou_" + SearchDataId).find(".PupClassBox").prepend(mjt);
						$("#Pou_" + SearchDataId).css({
							"left": ABoxl - BoxW + Aw,
							"top": ABoxt + Ah - 90
						})
					}else{
					
						mjt = "<span class='" + ClassArray[0] + "' style='left:" + mleft + "px'></span>";
						$("#Pou_" + SearchDataId).find(".PupClassBox").prepend(mjt);
						$("#Pou_" + SearchDataId).css({
							"left": ABoxl - BoxW + Aw,
							"top": ABoxt + Ah + 10
						})
					}
				} else {
					mjt = "<span class='" + ClassArray[1] + "' style='top:" + JtTOP + "px'></span>";
					$("#Pou_" + SearchDataId).find(".PupClassBox").prepend(mjt);
					$("#Pou_" + SearchDataId).css({
						"left": ABoxl - BoxW - 10,
						"top": Mj
					})
				}
			}
		} else {
				var chit = Aw/2+20;	
			if ((At - 40) < BoxH) {
				
				if(lei == "touxiang_bgboxwu"){
					mjt = "<span class='" + ClassArray[0] + "' style='left:"+chit+"px;'></span>";
					$("#Pou_" + SearchDataId).find(".PupClassBox").prepend(mjt);
					$("#Pou_" + SearchDataId).css({
						"left": ABoxl - Aw / 2,
						"top": ABoxt + Ah - 90
					})
				}else{
					
					mjt = "<span class='" + ClassArray[0] + "' style='left:"+chit+"px;'></span>";
					$("#Pou_" + SearchDataId).find(".PupClassBox").prepend(mjt);
					$("#Pou_" + SearchDataId).css({
						"left": ABoxl - Aw/2,
						"top": ABoxt + Ah + 10
					})
				}
			} else {
				if(lei == "touxiang_bgboxwu"){
					mjt = "<span class='" + ClassArray[2] + "' style='left:"+chit+"px;'></span>";
					$("#Pou_" + SearchDataId).find(".PupClassBox").prepend(mjt);
					$("#Pou_" + SearchDataId).css({
						"left": ABoxl - Aw / 2,
						"top": ABoxt - BoxH - 110 
					})
				}else{
					mjt = "<span class='" + ClassArray[2] + "' style='left:"+chit+"px;'></span>";
					$("#Pou_" + SearchDataId).find(".PupClassBox").prepend(mjt);
					$("#Pou_" + SearchDataId).css({
						"left": ABoxl - Aw / 2,
						"top": ABoxt - BoxH - 50
					})
				}
			}
		}
	
		$("#Pou_"+SearchDataId).show();
	}
	
 var tDate = null;
function PopLinBox(othis){
	$("div[id^=Pou_]").each(function(){
                        $(this).hide();
                })
	var SearchDataId = 'iPad';
		 $("#Pou_" + SearchDataId).find(".top_arrow").remove();
       $("#Pou_" + SearchDataId).find(".rt_arrow").remove();
        $("#Pou_" + SearchDataId).find(".bottom_arrow").remove();
       $("#Pou_" + SearchDataId).find(".lt_arrow").remove();
	   var aOffset = $(othis).offset(),
			
                ABoxl = aOffset.left,
                ABoxt = aOffset.top,
                dw = $(window).width(),
                dh = $(window).height(),
                Aw = $(othis).width(),
                Ah = $(othis).height();
		
                var Stop = $(document).scrollTop(),
				
                At = aOffset.top - Stop,
                Ab = dh - At - Ah;
		Tm(SearchDataId,ABoxl,ABoxt,dw,dh,Aw,Ah,At,Ab)
		
}



//人员分派
function CloudSearch(){
	$("#SearchTipsId").hide();
	$("#SearchResult").show();
	loaded();
	return false;
}
function checkboxValueTrue(o){
	$(".PcheckBoxtrue").removeClass("PcheckBoxtrue").addClass("PcheckBoxfalse");
	$(o).find(".PcheckBoxfalse").removeClass("PcheckBoxfalse").addClass("PcheckBoxtrue");
}
function ExampleSure(){
	var getl = $(".PcheckBoxtrue").length;
	if(getl == 0){
		alert("至少选择一个");	
		return false;
	}
	
	var getV = $(".PcheckBoxtrue").parent().attr("pid");
	alert("当前用户的ID为："+ getV)
	
}
//自定义alert

function newAlert(tit,txt,btnTxt){
	var html = '<div class="newAlert">'
		html += '<i class="closeAlert"></i>'
		html += '<h4>'+tit+'</h4>'
		html +='<p class="newAlertTxt">'+txt+'</p>';
		html +='<div class="newAlertFoot">'+btnTxt+'</div>'
		html += '</div>'
		html +='<div class="newAlertBg"></div>'
	   $('body').append(html);	
}
$('.closeAlert,.newAlertFoot').live('click',function(){
	$('.newAlert,.newAlertBg').remove();
});

function ChechBoxAction(o){
	if($(o).hasClass("checkboxfalse")){
		$(o).addClass("checkboxtrue").removeClass("checkboxfalse");
		$(o).attr("val",1);
	}else{
			$(o).addClass("checkboxfalse").removeClass("checkboxtrue");
		$(o).attr("val",0);
		}

}
function ActionRadio(radioname, o){

		$("div[name="+radioname+"]").each(function() {
            $(this).removeClass("checkBoxTrue").addClass("checkBoxfalse");
        });	

	$(o).addClass("checkBoxTrue");
}
function getRadioValue(radioname,isrequire){
		var uf  = ''; 
		$("div[name="+radioname+"]").each(function(index, element) {
            if($(this).hasClass("checkBoxTrue")){
				uf=  $(this).attr("Value");	
			}
        });
		if(uf != ""){
			return uf;
		}
		if(isrequire == "1"){
			$("div[name="+radioname+"]").parent().siblings(".stxtBoxUlLiTip").html('<div class="errorTip">必选</div>');
			return false; 	
		}
}

function ActionRadio1(radioname, o){

		$("div[name="+radioname+"]").each(function() {
            $(this).removeClass("checkBoxTrue").addClass("checkBoxfalse");
			$(this).siblings(".stxtBoxUlLiCtxt").hide();
        });	

	$(o).addClass("checkBoxTrue");
		$(o).siblings(".stxtBoxUlLiCtxt").show();
}

function CheckBoxFun(checkBoxName, o){
	if($(o).hasClass("CheckBoxM1")){
		$(o).removeClass("CheckBoxM1").addClass("CheckBoxM1True");	
			$("#Other"+checkBoxName).show();
	}else{
		$(o).removeClass("CheckBoxM1True").addClass("CheckBoxM1");	
		$("#Other"+checkBoxName).hide();
	}

}
//tabs切换
function tabs(o){
	$(o.tabs).find(o.tabsLi).click(function(){
		var thisIn = $(this).index();
		$(this).addClass(o.cur).siblings().removeClass(o.cur);
		$(o.panes).find(o.pane).eq(thisIn).show().siblings().hide();
	});
}

//thisCur
function thisCur(obj){
	$(obj).addClass('cur').siblings().removeClass('cur');
}

$(function() {
    if (IsPC()) {
        $("input[type=number]").each(function() {

        });
    }
    //check、radio 选择
    $('.check').live('click', function () {
        if ($(this).hasClass('checkTrue')) {
            $(this).removeClass('checkTrue');
        } else {
            $(this).addClass('checkTrue');
        }
    });
    $('.radio').live('click', function() {
        $(this).addClass('radioTrue').siblings().removeClass('radioTrue');
    });

});

//字符截取
function text(obj) {
	var leg1 = $(obj).val().length;
	if(leg1>1000){
		$(obj).val($(obj).val().substr(0,1000));
		return;
	}
	$('#txt0').html(leg1);
	$('#txt100').html(1000-leg1);	
}


function GoDateFun(id) {

    if ($.browser.msie) {
        var nid = id.substring(1, id.length);

        $(id).live("focus", function() { WdatePicker({ el: nid }); });
        return false;
    }
    var currYear = (new Date()).getFullYear();
    var opt = {};
    opt.date = { preset: 'date' };
    //opt.datetime = { preset : 'datetime', minDate: new Date(2012,3,10,9,22), maxDate: new Date(2014,7,30,15,44), stepMinute: 5  };
    opt.datetime = { preset: 'datetime' };
    opt.time = { preset: 'time' };
    if (!$.browser.msie) {
        eval("opt.default = {theme: 'android-ics light', display: 'modal',mode: 'scroller',lang:'zh',startYear:currYear - 10, endYear:currYear + 10 };");
    }
    $(id).val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
    setTimeout(function() {
        $("input,select,textarea").removeAttr("disabled");
        //因为来电页面使用时间控件，避免input冲突，故将明细页面的手机控件改为MobilePhone01
        $("#MobilePhone01").attr("disabled", "disabled");
    }, 200);
    return false;
}

//2014-06-13 add by company
$(function () {
    if (!IsPC()) {
        /*隐藏导航*/
        $('input[type=text],input[type=number],input[type=search],input[type=tel],textarea').focus(function () {
            $('.menu').hide();
        });
        $('input[type=text],input[type=number],input[type=search],input[type=tel],textarea').blur(function () {
            $('.menu').show();
        });
    }
});

function CommaFormatted(amount) {
    if (amount == 0) return 0;
    var delimiter = ","; // replace comma if desired
    amount = new String(amount);
    var a = amount.split('.', 2);
    var d = a[1];
    var i = parseInt(a[0]);
    if (isNaN(i)) { return ''; }
    var minus = '';
    if (i < 0) { minus = '-'; }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while (n.length > 3) {
        var nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) { a.unshift(n); }
    n = a.join(delimiter);
    if (d.length < 1 || d==0) {
        amount = n;
    } else {
        amount = n + '.' + d;
    }
    amount = minus + amount;
    return amount;
}

/**
*   Usage:  CommaFormatted(12345678);
*   result: 12,345,678
**/