<?php if(!defined('BASEPATH')) exit('No direct script access allowed');?>
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="renderer" content="webkit">
<title>在线进销存</title>
<link href="<?php echo base_url()?>statics/css/common.css?ver=20140430" rel="stylesheet">
<link href="<?php echo base_url()?>statics/css/<?php echo sys_skin()?>/ui.min.css?ver=20140430" rel="stylesheet">
<script src="<?php echo base_url()?>statics/js/common/seajs/2.1.1/sea.js?ver=20140430" id="seajsnode"></script>
<script src="<?php echo base_url()?>statics/js/common/libs/jquery/jquery-1.10.2.min.js"></script>
<script type="text/javascript">
var WDURL = "";
var SCHEME= "<?php echo sys_skin()?>";
try{
	document.domain = '<?php echo base_url()?>';
}catch(e){
	//console.log(e);
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
<link rel="stylesheet" href="<?php echo base_url()?>statics/css/report.css" />
<style>
#matchCon{width:300px;}
</style>
</head>
<body>
<div class="mod-report">
  <div class="search-wrap" id="report-search">
    <div class="s-inner cf">
        <div class="fl">
          <ul class="ul-inline">
            <li>
              <input type="text" id="matchCon" class="ui-input" value="请输入客户、供应商或编号查询">
              <input type="checkbox" id="customer" class="vm" />
              <label for="customer" class="f14 vm">客户</label>
              <input type="checkbox" id="supplier" class="vm" />
              <label for="supplier" class="f14 vm">供应商</label>
            </li>
            <li><a class="ui-btn mrb" id="search">查询</a><!-- <a class="ui-btn ui-btn-refresh" id="refresh" title="刷新"><b></b></a> --></li>
          </ul>
        </div>
        <div class="fr"><!--<a href="#" class="ui-btn ui-btn-sp mrb fl" id="btn-print">打印</a>--><a href="#" class="ui-btn fl" id="btn-export">导出</a></div>
    
        </div>
  </div>
	
	<div class="ui-print">
		<div class="grid-wrap" id="grid-wrap">
			<div class="grid-title">往来单位欠款表</div>
			<div class="grid-subtitle"></div>
	    	<table id="grid"></table>
	   	</div>
	</div>
    <div class="no-query"></div>
</div>

  
<script>
	seajs.use("dist/contactDebtNew");
</script>
</body>
</html>







 