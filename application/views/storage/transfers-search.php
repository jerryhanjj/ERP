<?php $this->load->view('header');?>

<script type="text/javascript">
var DOMAIN = document.domain;
var WDURL = "";
var SCHEME= "<?php echo sys_skin()?>";
try{
	document.domain = '<?php echo base_url()?>';
}catch(e){
}
</script>

</head>

<body style="background:#FFF; ">
<div class="wrapper">
  <div class="mod-search-adv">
    <ul>
      <li>
        <label>搜索条件:</label>
        <input type="text" id="matchCon" class="ui-input ui-input-ph con" value="请输入单据号或客户名或备注">
      </li>
      <li>
        <label>日期:</label>
        <input type="text" id="beginDate" class="ui-input ui-datepicker-input">
        <i>至</i>
        <input type="text" id="endDate" class="ui-input ui-datepicker-input">
      </li>
      <li>
        <label>调出仓库:</label>
        <span id="storageA"></span>
        <i>调入仓库:</i>
        <span id="storageB"></span></li>
    </ul>
  </div>
</div>
<script src="<?php echo base_url()?>statics/js/dist/advSearch.js?2"></script>
</body>
</html>