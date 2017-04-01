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
#matchCon { width: 280px; }
</style>
</head>

<body>
<div class="wrapper">
  <div class="mod-search cf">
    <div class="fl">
      <ul class="ul-inline">
        <li>
          <input type="text" id="matchCon" class="ui-input ui-input-ph" value="请输入单据号或客户或备注">
        </li>
        <li>
          <label>日期:</label>
          <input type="text" id="beginDate" value="2015-04-17" class="ui-input ui-datepicker-input">

          <i>-</i>
          <input type="text" id="endDate" value="2015-04-23" class="ui-input ui-datepicker-input">
        </li>
        <li><a class="ui-btn" id="search">查询</a></li>
      </ul>
    </div>
    <div class="fr">
	<a class="ui-btn ui-btn-sp mrb" id="add">新增</a>
    <a class="ui-btn mrb" id="export" target="_blank" href="javascript:void(0);">导出</a>
   <!-- <a class="ui-btn mrb" id="audit">审核</a>
    <a class="ui-btn" id="reAudit">反审核</a>-->
    
    </div>
  </div>
  <div class="grid-wrap">
    <table id="grid">
    </table>
    <div id="page"></div>
  </div>
</div>
<script src="<?php echo base_url()?>statics/js/dist/receiptList.js?ver=20140430"></script>
</body>
</html>