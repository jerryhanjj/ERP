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

<link href="<?php echo base_url()?>statics/css/<?php echo sys_skin()?>/bills.css?ver=20150427" rel="stylesheet" type="text/css">
<style>
#bottomField{line-height:30px;}
#bottomField label{width: 75px;display: inline-block;}
.con-footer{padding:10px 0 0 0;}
.grid-wrap h5{ padding:10px 0; }
#tempName{ width: 160px;}
</style>
</head>

<body>
<div class="wrapper">
  <div class="mod-toolbar-top mr0 cf dn" id="toolTop"></div>
  <div class="bills cf">
    <div class="con-header">
      <dl class="cf">
        <dd class="pct35">
          <a id="chooseTemp" class="ui-btn">选择模板</a>
          <a id="saveTemp" class="ui-btn">存为模板</a>
        <dd class="pct30 tc">
          <label>单据日期：</label>
          <input type="text" id="date" class="ui-input ui-datepicker-input" value="2015-05-05">
        </dd>
        <dd id="identifier" class="pct35 tr">
          <label>单据编号：</label>
          <span id="number"><?php echo str_no('CXD')?></span></dd>
      </dl>
    </div>
    <div class="grid-wrap">
      <h5><label class="r"><input type="checkbox" checked="checked" value="1" class="vm" id="isAuto"> 自动分摊</label>组合件：</h5>
      <table id="fixedGrid">
      </table>
      <h5>子件：</h5>
      <table id="grid">
      </table>
    </div>
    <div class="con-footer cf">
      <div class="mb10">
          <textarea type="text" id="note" class="ui-input ui-input-ph">暂无备注信息</textarea>
      </div>
      <ul id="amountArea" class="cf">
        <li>
          <label>拆卸费用:</label>
          <input type="text" id="amount" class="ui-input" data-ref="discount">
        </li>
      </ul>
      <ul class="c999 cf">
        <li>
          <label>制单人:</label>
          <span id="userName"></span>
        </li>
      </ul>
    </div>
    <div class="cf" id="bottomField">
    	<div class="fr" id="toolBottom"></div>
    </div>
  </div>
  
  <div id="initCombo" class="dn">
    <input type="text" class="textbox goodsAuto_0" name="goods_0" autocomplete="off">
    <input type="text" class="textbox storageAuto_0" name="storage_0" autocomplete="off">
    <input type="text" class="textbox unitAuto_0" name="unit_0" autocomplete="off">
    <input type="text" class="textbox goodsAuto" name="goods" autocomplete="off">
    <input type="text" class="textbox storageAuto" name="storage" autocomplete="off">
    <input type="text" class="textbox unitAuto" name="unit" autocomplete="off">
  </div>
  <div id="storageBox" class="shadow target_box dn">
  </div>
</div>
<script src="<?php echo base_url()?>statics/js/dist/disassemble.js?ver=20150427"></script>
</body>
</html>

