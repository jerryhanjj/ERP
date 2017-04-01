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

</head>
<body>
<div class="wrapper">
	<div class="mod-toolbar-top cf">
	    <div class="fl"><strong class="tit">结算账户</strong></div>
	    <div class="fr"><a href="#" class="ui-btn ui-btn-sp mrb" id="btn-add">新增</a><!--<a class="ui-btn mrb" id="btn-disable">禁用</a><a class="ui-btn mrb" id="btn-enable">启用</a>--><!--<a class="ui-btn mrb" id="btn-print">打印</a>--><!--<a class="ui-btn mrb" id="btn-import">导入</a>--><!--<a class="ui-btn mrb" id="btn-export">导出</a>--><a class="ui-btn" id="btn-refresh">刷新</a></div>
	  </div>
    <div class="grid-wrap">
	    <table id="grid">
	    </table>
	    <div id="page"></div>
	  </div>
</div>
<script src="<?php echo base_url()?>statics/js/dist/settlementAccount.js?ver=20150522"></script>
</body>
</html>

 