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

<style>
#matchCon { width: 280px; }
.ui-jqgrid-bdiv .ui-state-highlight { background: none; }
.operating .ui-icon{ margin:0; }
.ui-icon-plus { background-position:-80px 0; }
.ui-icon-trash { background-position:-64px 0; }
.has-audit{ width: 150px; height: 74px; background: url(img/audit.png) 0 0 no-repeat; position: absolute; right: 40px; top: 20px; }
.line{ line-height:0; height:0; border:none; border-bottom:1px dashed #CCC; color:#CCC; font-size:0; margin:18px 0; }
</style>
</head>

<body>
<div class="container" style="margin:20px;">
  <div class="grid-wrap">
    <table id="accountGrid">
    </table>
    <div id="page"></div>
  </div>
  <div id="initCombo" class="dn">
    <input type="text" class="textbox accountAuto" name="account" autocomplete="off">
    <input type="text" class="textbox paymentAuto" name="payment" autocomplete="off">
  </div>
</div>
<script src="<?php echo base_url()?>/statics/js/dist/chooseAccount.js?2"></script>
</body>
</html>