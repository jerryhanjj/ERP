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
.ui-icon-ellipsis{right:5px;}
#grid tr{cursor:pointer;}

</style>
</head>
<body>
<div class="mod-report">
  <div class="search-wrap" id="report-search">
    <div class="s-inner cf">
      <div class="fl"> <strong class="tit mrb fl">选择查询条件：</strong>
        <div class="ui-btn-menu fl" id="filter-menu"> <span class="ui-btn menu-btn"> <strong id="selected-period"
>请选择查询条件</strong><b></b> </span>
          <div class="con">
            <ul class="filter-list">
              <li>
                <label class="tit">日期:</label>
                <input type="text" value="" class="ui-input ui-datepicker-input" name="filter-fromDate"
 id="filter-fromDate" maxlength="10" />
                <span>至</span>
                <input type="text" value="" class="ui-input ui-datepicker-input" name="filter-toDate"
 id="filter-toDate" maxlength="10" />
              </li>
            </ul>
            <ul class="filter-list" id="more-conditions">
              <li>
                <label class="tit">客户:</label>
                <span class="mod-choose-input" id="filter-customer"><input type="text" class="ui-input"
 id="customerAuto"/><span class="ui-icon-ellipsis"></span></span>
              </li>
              <li style="height:60px; ">
                <label class="tit">商品:</label>
                <span class="mod-choose-input" id="filter-goods"><input type="text" class="ui-input"
 id="goodsAuto"/><span class="ui-icon-ellipsis"></span></span>
                <p style="color:#999; padding:3px 0 0 0; ">（可用,分割多个编码如1001,1008,2001，或直接输入编码段如1001--1009
查询）</p>
              </li>
              <li>
                <label class="tit">仓库:</label>
                <span class="mod-choose-input" id="filter-storage"><input type="text" class="ui-input"
 id="storageAuto"/><span class="ui-icon-ellipsis"></span></span>
              </li>
              <li class="chk-list dn" id="profit-wrap">
                <label class="chk">
                  <input type="checkbox" value="profit" name="profit" />
                  计算毛利</label>
                  <label class="chk">
                  <input type="checkbox" value="showSku" name="showSku" />
                  显示辅助属性</label>
              </li>
            </ul>
            <div class="btns"> <a href="#" id="conditions-trigger" class="conditions-trigger" tabindex
="-1">更多条件<b></b></a> <a class="ui-btn ui-btn-sp" id="filter-submit" href="#">确定</a> <a class="ui-btn"
 id="filter-reset" href="#" tabindex="-1">重置</a> </div>
          </div>
        </div>
        <a id="refresh" class="ui-btn ui-btn-refresh fl mrb"><b></b></a> <span class="txt fl" id="cur-search-tip"
></span> </div>
      <div class="fr"><a href="#" class="ui-btn ui-btn-sp fl" id="btn-export">导出</a></div>
    </div>
  </div>
	
	<div class="ui-print">
		<div class="grid-wrap" id="grid-wrap">
			<div class="grid-title">销售汇总表（按商品）</div>
			<div class="grid-subtitle"></div>
	    	<table id="grid"></table>
	   	</div>
	</div>
    <div class="no-query"></div>
</div>
 <!--
  <div class="grid-wrap">
    <div class="grid">
      <table width=100% class="caption">
        <tr>
          <td class='H'>销售汇总表（按商品）</td>
        </tr>
        <tr>
          <td>日期：至</td>
        </tr>
      </table>
      <table width="1128px" class="list">
        <thead>
          <tr>
            <td>商品编号</td>
            <td width="150px">商品名称</td>
            <td>规格型号</td>
            <td>单位</td>
            <td>仓库</td>
            <td>数量</td>
            <td>单价</td>
            <td>销售收入</td>
            
          </tr>
        </thead>
        <tbody>
          
          <tr>
            <td colspan="5" class="R B">合计：</td>
            <td class="R B"></td>
            <td class="R B"></td>
            <td class="R B"></td>
            
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  -->
  
<script>
	seajs.use("dist/salesSummary");
</script>
</body>
</html>



 