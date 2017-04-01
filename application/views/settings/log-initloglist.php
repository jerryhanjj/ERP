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
  <div class="mod-search cf">
    <div class="s-inner cf">
      <div class="fl"> <strong class="tit mrb fl">查询条件</strong>
        <div class="ui-btn-menu fl" id="filter-menu"> <span class="ui-btn menu-btn"> <span id="selected-date"
>请选择查询条件</span><b></b> </span>
          <div class="con">
            <ul class="filter-list">
              <li>
                <label class="tit">日期:</label>
                <input type="text" value="2015-04-20" class="ui-input ui-datepicker-input" readonly name
="beginDate" id="beginDate" />
                <span>至</span>
                <input type="text" value="2015-04-26" class="ui-input ui-datepicker-input" readonly name
="endDate" id="endDate" />
              </li>
            </ul>
            <ul class="filter-list" id="more-conditions">
              <li>
                  <label  class="tit" for="filter-user">用户：</label>
                  <span class="ui-combo-wrap" id="user">
                    <input type="text" name="filter-user" id="filter-user" class="input-txt" autocomplete
="off" />
                    <span class="trigger"></span>
                  </span>
              </li>
              <!--<li>
                  <label  class="tit" for="filter-type">类型：</label>
                  <span class="ui-combo-wrap"  id="type">
                    <input type="text" name="filter-type" id="filter-type" class="input-txt" autocomplete
="off" />
                    <span class="trigger"></span>
                  </span>
               </li>-->
            </ul>
            <div class="btns"> <a href="#" id="conditions-trigger" class="conditions-trigger" tabindex
="-1">更多条件<b></b></a> <a class="ui-btn ui-btn-sp" id="filter-submit" href="#">确定</a> <a class="ui-btn"
 id="filter-reset" href="#" tabindex="-1">重置</a> </div>
          </div>
        </div>
        <a id="refresh" class="ui-btn ui-btn-refresh fl mrb"><b></b></a> <span class="txt fl" id="cur-search-tip"
></span> </div>
      <!-- <div class="fr"><a href="#" class="ui-btn ui-btn-sp mrb fl" id="btn-print">打印</a><a href="
#" class="ui-btn fl" id="btn-export">导出</a></div> -->
    </div>
  </div>
  <div class="grid-wrap">
    <table id="grid">
    </table>
    <div id="page"></div>
  </div>
</div>
<script src="<?php echo base_url()?>statics/js/dist/operationLog.js?ver=20140430"></script>
</body>
</html>


 