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
<link rel="stylesheet" href="<?php echo base_url()?>statics/css/report.css" />
<style type="text/css">
.filter-menu .mod-choose-input{position: relative;*zoom: 1;}
.filter-menu .mod-choose-input .ui-input{padding-right: 25px;width:226px; font-family:"宋体";}
.filter-menu .ui-datepicker-input{width:105px; font-family:"宋体";}
.ui-icon-ellipsis{ right:3px; }
.ul-inline li{position:relative;}
.no-query {
    background: url("<?php echo base_url()?>statics/css/img/no_query.png") no-repeat scroll 100px 60px #fff;
    border: 1px solid #ddd;
    height: 402px;
    margin-right: 18px;
}
#chk-wrap{line-height: 30px;}
.frozen-sdiv{ display: none;}
#grid tr{cursor:pointer;}

</style>
</head>
<body>
<div class="wrapper">
  <div class="mod-search cf">
    <div class="l">
      <ul class="ul-inline fix">
      	<li>
                <label>购货单位:</label>
		        <span class="ui-combo-wrap" id="customer">
		        <input type="text" name="" class="input-txt" autocomplete="off" value="" data-ref="date">

		        <i class="ui-icon-ellipsis"></i></span></dd>
            </li>
		<li>
          <label>日期:</label>
          <input type="text" value="" class="ui-input ui-datepicker-input" name="filter-fromDate" id
="filter-fromDate" /> - <input type="text" value="" class="ui-input ui-datepicker-input" name="filter-toDate"
 id="filter-toDate" />
        </li>
        <li id="match">
          		<label class="chk" style="margin-top:6px; " title="是否显示商品明细"><input type="checkbox" name
="match">是否显示商品明细</label>
        </li>
        <li><a class="ui-btn mrb" id="filter-submit">查询</a></li>
      </ul>
    </div>
    <div class="fr"><!--<a href="#" class="ui-btn ui-btn-sp mrb fl" id="btn-print">打印</a>--><a href="#" class
="ui-btn fl" id="btn-export">导出</a></div>
  </div>
 
  <!-- grid begin -->
	<div class="ui-print" style="overflow: hidden; ">
		<div class="grid-wrap" id="grid-wrap">
			<div class="grid-title">供应商对账单</div>
			<div class="grid-subtitle"></div>
	    	<table id="grid"></table>
	   	</div>
	</div>
	<div class="no-query"></div>
	<!-- grid end -->
  
</div>
<script>
	seajs.use("dist/suppliersReconciliationNew");
</script>
</body>
</html>

 