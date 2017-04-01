<?php $this->load->view('header');?>
 

<script type="text/javascript">
var DOMAIN = document.domain;
var WDURL = "";
var SCHEME= "<?php echo sys_skin()?>";
try{
	document.domain = '<?php echo base_url()?>';
}catch(e){
}
//ctrl+F5 增加版本号来清空iframe的缓存的
$(document).keydown(function(event) {
	/* Act on the event */
	if(event.keyCode === 116 && event.ctrlKey){
		var defaultPage = Public.getDefaultPage();
		var href = defaultPage.location.href.split('?')[0] + '?';
		var params = Public.urlParam();
		params['version'] = Date.parse((new Date()));
		for(i in params){
			if(i && typeof i != 'function'){
				href += i + '=' + params[i] + '&';
			}
		}
		defaultPage.location.href = href;
		event.preventDefault();
	}
});
</script>

<style>
.print-settings-wrap{padding: 25px 25px 10px;}
.print-settings-wrap a{text-decoration: underline;}
.print-settings-wrap .num-input{width: 50px;text-align: right;}
.print-settings-wrap .row-btns{margin-top: 30px;}
.print-settings-wrap .taoda-margin{margin-bottom: 5px;}
.print-settings-wrap .settings-ctn{margin-top: 25px;font-size: 14px;}
.print-settings-wrap .settings-ctn .print-tips{color: #dd4e4e;}
.print-settings-wrap .settings-ctn .print-tips a{color: #2383c0;}
.print-settings-wrap .mod-form-rows{margin-top: 20px;}
.taoda-settings .mod-form-rows .label-wrap{width: 110px;}
.taoda-settings .mod-form-rows a{color: #999;margin-left: 10px;}
.taoda-settings .mod-form-rows a:hover{color: #2383c0;}
#printTemp{margin-right: 10px;}
#setDefaultTemp{white-space: nowrap;margin-left: 0}
.template-list .list-item{font-size: 12px;}
</style>

</head>
<body class="ui-dialog-body">
<div class="print-settings-wrap">
  <ul class="ui-tab" id="printSelect">
      <li data-type="pdf" class="cur">PDF打印</li>
      <!--<li data-type="taoda">专业套打</li>-->
  </ul>
  <div class="settings-ctn" id="printSettings">
      <div class="item">
        <p class="print-tips">为了保证您的正常打印，请先下载安装<a href="http://dl.pconline.com.cn/html_2/1/81/id=1322&pn=0&linkPage=1.html" target="_blank">Adobe PDF阅读器</a></p>
        <ul class="mod-form-rows" id="pdfSettings">
          <li class="row-item">
            <div class="label-wrap">
              <label>打印纸型:</label>
            </div>
            <div class="ctn-wrap">
              <span class="radio-wrap"><input type="radio" name="paperType"  value="" checked="checked"/><labe>A4</label></span>
            </div>
          </li>
          <!--<li class="row-item">
            <div class="label-wrap">
              <label for="pdfStatX">左边距:</label>
            </div>
            <div class="ctn-wrap">
              <input type="text" id="pdfStatX" name="pdfStatX" value="50" class="ui-input margin-input  num-input"/>毫米
            </div>
          </li>-->
        </ul>
      </div>

      <div class="item taoda-settings" id="taodaSettings" style="display:none;">
        <p class="print-tips" id="taodaTips">为了保证您的正常打印，请先下载安装<a href="/noteprinttemp.do?action=downloadTemplateReader" target="_blank">友商网套打工具</a></p>
          <ul class="mod-form-rows">
            <li class="row-item">
              <div class="label-wrap">
                <label>选择模版:</label>
              </div>
              <div class="ctn-wrap">
                <span id="printTemp"></span><a href="#" id="setDefaultTemp">设为默认模版</a>
              </div>
            </li>
            <li class="row-item">
              <div class="label-wrap">
                <label for="entrysPerNote">每张打印分录数:</label>
              </div>
              <div class="ctn-wrap">
                <input type="text" value="0" class="ui-input num-input" id="entrysPerNote" name="entrysPerNote"/>
                <span class="tips">为0时，默认取套打模版中设置的打印分录数</span>
              </div>
            </li>
            <li class="row-item">
              <div class="label-wrap">
                <label>左边距:</label>
              </div>
              <div class="ctn-wrap">
                <p class="taoda-margin"><input type="text" id="taodaStartX" name="taodaStartX" class="ui-input margin-input num-input" value="0"/>毫米</p>
              </div>
              <div class="label-wrap">
                <label>上边距:</label>
              </div>
              <div class="ctn-wrap">
                <p><input type="text" id="taodaStartY" name="taodaStartY" class="ui-input margin-input num-input" value="0"/>毫米</p>
              </div>
            </li>
            <li class="row-item">   
              <span class="radio-wrap"><input type="checkbox" name="isEmptyLinePrint" id="isEmptyLinePrint"  checked="checked"/><label for="isEmptyLinePrint">打印空白行</label></span>
              <span class="radio-wrap"><input type="checkbox" name="printFirstLayer" id="printFirstLayer"  checked="checked"/><label for="printFirstLayer">打印表格线</span></span>
              <!--<span class="radio-wrap"><input type="checkbox" name="isSaveSettings" id="isSaveSettings" /><label for="isSaveSettings" checked="checked">保存该模版的设置</span></span>-->
            </li>
          </ul>
      </div>
  </div>
</div>
<form method="post" id="downloadForm" style="display:none;"></form>
<script>
 (function($){
    var billType = frameElement.api.data.billType;
    var printMethod = $.cookie('printMethod') || 'pdf';
    var taodaData = frameElement.api.data.taodaData;
    var pdfData = frameElement.api.data.pdfData;
    var pdfUrl = frameElement.api.data.pdfUrl;
    var defaultSelectValue = frameElement.api.data.opt.defaultSelectValue;//必须为数组形式：[key, value]
    init();
    
    function init(){
      //初始化设置
      initPrintMethod(printMethod);
      initSettings();

      //绑定事件
      $('#printSelect li').on('click', function(){
        if($(this).hasClass('cur')){return ;}
        printMethod = $(this).data('type');
        initPrintMethod(printMethod);
      });

      //模版选择下拉
      $('#printTemp').combo({
        data: '/noteprinttemp.do?action=findByType&type=' + billType,
        width: 'auto',
        listCls: 'template-list droplist',
        width: 340,
        defaultSelected: (defaultSelectValue?defaultSelectValue:['isDefault', true]),
        text: 'name',
        value: 'id',
        ajaxOptions: {
          formatData: function(data){         
             return data.data.items;
          }
        }
      });

      //限制输入数字
      Public.currencyToNum($('.num-input').val());

      //套打提示
      if (parent.parent.SYSTEM.serviceType == 8) {
        var taodaTips  = '您的帐套为免费版，须购买付费版才能使用套打功能，<a href="http://app.youshang.com/site/buy.jsp" target="_blank">点击购买</a>'
        $('#taodaTips').html(taodaTips);
      }

      //设置默认模版
      $('#setDefaultTemp').on('click', function(e){
          e.preventDefault();
          var templateId = $('#printTemp').getCombo().getValue();
          $.ajax({
            url:'/noteprinttemp.do?action=setDefault&templateId=' + templateId + '&type=' + billType,
            type: 'post',
            dataType: 'json',
            success: function(data){
              if (data.status == 200) {
            	  parent.parent.Public.tips({content: '设置默认模版成功！'});
              } else {
            	  parent.parent.Public.tips({type: 1,content: data.msg});
              }
            },
            error: function(){
            	parent.parent.Public.tips({type:1, content : '系统繁忙，请重试！'});
            }
          });
      });
      
      /*//监控表单提交
      $('#downloadForm').submit(function(){
    	  window.setTimeout(function(){
   	         frameElement.api.close();
   	      },500);
      });*/
    }


    function doPrint(){
      $.cookie('printMethod',printMethod);
      if (printMethod == 'pdf') {
         pdfPrint();
      } else if(printMethod == 'taoda'){
        tadaoPrint();
      }
    }
    window.doPrint = doPrint;


    function initPrintMethod(Method){
      var obj = $('#printSelect li').filter('[data-type='+printMethod+']');
      obj.addClass('cur').siblings('li').removeClass('cur');
      var idx = obj.index($('#printSelect li'));
      $('#printSettings .item').eq(idx).show().siblings().hide();
    }

    function initSettings(){
      $('#pdfStatX').val($.cookie('pdfMarginLeft') || 50);
      $('#entrysPerNote').val($.cookie('entrysPerNote') || 0);
      $('#taodaStartX').val($.cookie('taodaStartX') || 0);
      $('#taodaStartY').val($.cookie('taodaStartY') || 0);
      if ($.cookie('isEmptyLinePrint') != null) {
        var checked = $.cookie('isEmptyLinePrint') == 1 ? true : false;
        $('#isEmptyLinePrint').attr('checked', checked);
      }
      if ($.cookie('printFirstLayer') != null) {
        var checked = $.cookie('printFirstLayer') == 1 ? true : false;
        $('#printFirstLayer').attr('checked', checked);
      }
    }
    
    function getBillType(TypeId) {
    	switch(TypeId) {
    	case 0:
    		return 'Voucher';
    	case 10101:
    		return 'PUR';
    	case 10201:
    		return 'SAL';
    	case 10301:
    		return 'SCM_INV_PUR';
    	case 10303:
    		return 'SCM_INV_SALE';
    	default:
    		return '0';
    	}
    }


    function tadaoPrint(){
      if (parent.parent.SYSTEM.serviceType == 8) {
    	parent.parent.Public.tips({type: 1,content: '您的帐套为免费版，须购买付费版才能使用套打功能'});
        return ;
      }
      var url = '/noteprint.do?action=notePrint';
      var entrysPerNote = $.trim($('#entrysPerNote').val()) || 0;
      var isEmptyLinePrint = $('#isEmptyLinePrint')[0].checked ? 1 : 0;
      var printFirstLayer = $('#printFirstLayer')[0].checked ? 1 : 0;
      var startX = $.trim($('#taodaStartX').val()) || 0;
      var startY = $.trim($('#taodaStartY').val()) || 0;
      $.cookie('entrysPerNote', entrysPerNote, {expires: 365});
      $.cookie('isEmptyLinePrint', isEmptyLinePrint, {expires: 365});
      $.cookie('printFirstLayer', printFirstLayer, {expires: 365});
      $.cookie('taodaStartX', startX, {expires: 365});
      $.cookie('taodaStartY', startY, {expires: 365});
      var data = {
        billType: getBillType(billType),
        templateId: $('#printTemp').getCombo().getValue(),
        entrysPerNote: entrysPerNote,
        startX: startX,
        startY: startY,
        isEmptyLinePrint: isEmptyLinePrint,
        printFirstLayer: printFirstLayer
        //voucherIds: voucherIds
      };

      $.extend(data, taodaData);
      Business.getFile(url, data, true, true);
      frameElement.api.close();
    }

    function pdfPrint(){
      pdfData.marginLeft = $('#pdfStatX').val(); //设置左边距
      $.cookie('pdfMarginLeft', pdfData.marginLeft, {expires: 365});
      Business.getFile(pdfUrl, pdfData, true, false);
      frameElement.api.close();
    }
   
    //打印运单处理
    if(!pdfUrl){
  	  $('#printSelect li:eq(1)').trigger('click');
  	  $('#printSelect').hide();
  	  $('#setDefaultTemp').hide();
    }
 })(jQuery);
</script>
</body>
</html>


 