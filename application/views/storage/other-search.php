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
<body style="background:#FFF; ">
<div class="wrapper">
  <div class="mod-search-adv">
    <ul>
      <li>
        <label>搜索条件:</label>
        <input type="text" id="matchCon" class="ui-input con" value="请输入单据号或客户名或备注">
      </li>
      <li>
        <label>日期:</label>
        <input type="text" id="beginDate" class="ui-input ui-datepicker-input">
        <i>至</i>
        <input type="text" id="endDate" class="ui-input ui-datepicker-input">
      </li>
      <li>
        <label>仓库:</label>
        <span id="storageA"></span>
      </li>
      <li>
        <label>业务类型:</label>
        <span id="transType"></span>
      </li>
    </ul>
  </div>
</div>
<script src="<?php echo base_url()?>/statics/js/dist/advSearch.js?ver=20140430"></script>
</body>
</html>
 