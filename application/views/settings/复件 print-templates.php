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


<link rel="stylesheet" href="<?php echo base_url()?>/statics/js/common/libs/kindeditor/themes/default/default.css" />
<script src="<?php echo base_url()?>/statics/js/common/libs/kindeditor/kindeditor-min.js"></script>
		
 
<script type="text/javascript">
 

KindEditor.ready(function(K) {
	var uploadbutton = K.uploadbutton({
			button : K('#uploadButton')[0],
					fieldName : 'imgFile',
					url : '../php/upload_json.php?dir=file',
					afterUpload : function(data) {
						if (data.error === 0) {
							var url = K.formatUrl(data.url, 'absolute');
							K('#file-path').val(url);
						} else {
							alert(data.message);
						}
					},
					afterError : function(str) {
						alert('自定义错误信息: ' + str);
					}
				});
				uploadbutton.fileBox.change(function(e) {
					uploadbutton.submit();
	});
});

</script>

 
<script src="<?php echo base_url()?>/statics/js/common/libs/swfupload/swfupload.js"></script>
<style type="text/css">
.ui_content {display: block;margin: 0 auto;width:360px;}
#tempName{width:200px}
.ui-input{width:200px;}
.operating .edit{display:none;}
#templateImport{}
#templateImport li{margin:10px 0;}
#templateDefault{vertical-align: middle;}
</style>
</head>
<body>
<div class="wrapper">
   <div class="mod-toolbar-top cf">
       <div class="fl mod-crumb">
          <strong class="tit">套打模版</strong>
        </div>
        <div class="fr">
          <a class="ui-btn ui-btn-sc" href="#" id='btnTemplateImport'>导入模板</a>
        </div>
    </div>
    <div id="dataGrid" class="autoGrid grid-wrap">
      <table id="grid"></table>
      <div id="page"></div>
    </div>
</div>
<form id="manage-form" action="#">
	<ul class='dn' id='templateImport'>
		<li><label>模板类别：</label><span id='templateType'></span></li>
		<li><label>模板文件：</label><input type="text" class='ui-input' id='file-path' name='file-path' readonly="readonly"/> <input type="button" id="uploadButton" value="浏览" /></li>
	    <li><label>模板名称：</label><input type="text" class='ui-input' id='templateName' name='templateName' /></li>
	    <li><label>模板描述：</label><input type="text" class='ui-input' id='templateDesribe' /></li>
	    <li><label>模板编码：</label><input type="text" class='ui-input' id='templateNumber' name='templateNumber' /></li>
	    <li><label>默认模板：</label><input type="checkbox" id='templateDefault' /></li>
	</ul>
</form>
<script type="text/javascript">
$(function(){
	$('body').data('sessionId',"083EAC00173AA742EADE66A25F114C83");
})
</script>
<script src="<?php echo base_url()?>/statics/js/dist/printTemplates.js?ver=20150"></script>
</body>
</html>


