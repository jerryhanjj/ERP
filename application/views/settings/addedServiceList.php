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
body { font:12px/1.5 \5b8b\4f53; color: #555;}

.mod_crumb{margin:18px 0;color:#555;font-size:12px;}
.mod_crumb .cur{font-size:16px;font-weight:bold;position:relative;top:2px;}
.mod_crumb span{margin:0 3px;vertical-align:base-line;color:#555;}

/* 普通按钮 */
.added_service{background: #fff;border: 1px solid #d2d2d2;border-collapse:collapse;border-spacing:0;width
: 100%;}
.added_service td{border-bottom: 1px dashed #d2d2d2;padding: 15px 10px;}
.added_service h3{font-size: 14px;margin-bottom: 5px;font-weight: bold;}
.added_service .details{margin-left:10px;color: #4e8cbc;}
/*.added_service .details:hover{text-decoration: underline;}*/
.added_service .img{width: 100px;text-align: center;}
.added_service .img i{display:inline-block;width:64px;height:64px;background: url("<?php echo base_url()?>statics/css/img/value-added-icon.png") no-repeat;}
.added_service .price{font-size: 14px;font-weight: bold;width: 160px;text-align: right;}
.added_service .price strong{font-size: 24px;color: #e67411;font-weight: bold;}
.added_service .buy{width: 100px;}
.w80 {width:80px;}
.wrapper{padding:0 18px;max-width:1240px;}
.dialog_wrapper{margin:0 auto;width:700px;}
</style>
<script src="<?php echo skin_url()?>/js/common/addedServiceData.js?ver=20150430"></script>
</head>
<body>
<div class="wrapper" id="wrapper">
   <div class="mod_crumb" id="serviceCrumb">
          <span class="cur">增值服务</span><span>可在此选择增值功能</span>
    </div>
    <div class="mod_inner">
        <table class="added_service" id="addedService">
        </table>
    </div>
</div>
<script src="<?php echo base_url()?>statics/js/dist/addedServiceList.js?ver=20150430"></script>
</body>
</html>

 