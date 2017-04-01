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
body{background: #fff;}
.manage-wrap{top :0;left :0; margin: 20px auto 10px;width: 600px;}
.manage-wrap .ui-input{width: 185px;font-size:12px;}
.row-item{float:left ; width:50%;}
#balance{text-align:right;}
.mod-form-rows .label-wrap {font-size: 12px;}
.p1 {width:100%;}
#address{width:485px;}
.mod-form-rows .ctn-wrap{position:relative ;height:32px;}
</style>
</head>
<body>
<div id="manage-wrap" class="manage-wrap">
	<form id="manage-form" action="#">
		<ul class="mod-form-rows cf">
			<!-- <li class="row-item">
				<div class="label-wrap"><label for="phone">联系电话：</label></div>
				<div class="ctn-wrap"><input type="text" value="" class="ui-input phone-group" name="phone" id="phone"
></div>
			</li>
			<li class="row-item">
				<div class="label-wrap"><label for="mobile">手机号码：</label></div>
				<div class="ctn-wrap"><input type="text" value="" class="ui-input phone-group" name="mobile" id="mobile"
></div>
			</li>
			<li class="row-item">
				<div class="label-wrap"><label for="postalcode">邮政编码：</label></div>
				<div class="ctn-wrap"><input type="text" value="" class="ui-input" name="postalcode" id="postalcode"
></div>
			</li>
			<li class="row-item">
				<div class="label-wrap"><label for="linkman">联系人：</label></div>
				<div class="ctn-wrap"><input type="text" value="" class="ui-input" name="linkman" id="linkman"><
/div>
			</li>
			<li class="row-item row-category">
    				<div class="label-wrap"><label for="isDefault">默认地址：</label></div>
    				<div class="ctn-wrap"><span id="isDefault"></span></div>
    		</li> -->
    		<li class="row-item">
				<div class="label-wrap"><label for="province">省：</label></div>
				<div class="ctn-wrap"><span id="province"></span></div>
			</li>
			<li class="row-item">
				<div class="label-wrap"><label for="city">市：</label></div>
				<div class="ctn-wrap"><span id="city"></span></div>
			</li>
			<li class="row-item">
				<div class="label-wrap"><label for="area">区：</label></div>
				<div class="ctn-wrap"><span id="area"></span></div>
			</li>
			<li class="row-item p1">
				<div class="label-wrap"><label for="address">详细地址：</label></div>
				<div class="ctn-wrap"><input type="text" value="" class="ui-input" name="address" id="address"></div>
			</li>
		</ul>
	</form>
</div>
<script src="<?php echo base_url()?>/statics/js/dist/addressManage.js?ver=20140430"></script>
</body>
</html>

