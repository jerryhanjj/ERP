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
<script charset="utf-8" src="<?php echo base_url()?>/statics/js/common/libs/kind/kindeditor-min.js"></script>
<script charset="utf-8" src="<?php echo base_url()?>/statics/js/common/libs/kind/lang/zh_CN.js"></script>
<script type="text/javascript">
var upload_json="<?=site_url('upload/do_upload')?>";
var file_manager_json="<?=site_url('upload/manage')?>";
KindEditor.ready(function(K) {
	var editor = K.create('textarea[id="info"]', {
		urlType : 'domain',
		allowFileManager : true
	});
});

</script>
<link href="<?php echo base_url()?>/statics/css/authority.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class="wrapper authority-wrap">
  <div class="mod-inner">
       
      <div class="authority-ctn-wrap">
         
        <div class="register-wrap">
            <h3>新建模板</h3>
            <form action="../noteprinttemp/add" id="registerForm" method="post" class="register-form">
              <ul class="mod-form-rows">
                <li class="row-item">
                  <div class="label-wrap">
                    <label for="userName">模板名称</label>
                  </div>
                  <div class="ctn-wrap">
                    <input type="text" class="ui-input" id="name" name="name"/>
          
                  </div>
                </li>
				
				<li class="row-item">
                  <div class="label-wrap">
                    <label for="userName">模板类别</label>
                  </div>
                  <div class="ctn-wrap">
				    <input name="type" type="radio" value="10101">采购单 <input name="type" type="radio" value="10201">  销售单  <input name="type" type="radio" value="10601">收款单  <input name="type" type="radio" value="10602">付款单
                     
                    
                  </div>
                </li>
				
                 
                
                <li class="row-item">
                  <div class="label-wrap">
                    <label for="realName">模板设计</label>
                  </div>
                  <div class="ctn-wrap">
                      <textarea class="ckeditor" name="info" id="info" style="width:98%; height:250px;" ></textarea>
                      <p class="msg">真实姓名将应用在单据和账表打印中，请如实填写</p>
                  </div>
                </li>
                <li class="row-item">
                  <div class="label-wrap">
                    <label for="">默认模板</label>
                  </div>
                  <div class="ctn-wrap">
                      <input name="isDefault" type="radio" value="1">是&nbsp;&nbsp;&nbsp;    <input name="isDefault" type="radio" value="0">否  
                      <p class="msg">是否作为打印时候的默认模板</p>
                  </div>
                </li>
              </ul>
              <div class="btn-row">
               <!-- <a href="../settings/print_templates" class="ui-btn mrb">返回列表</a>-->
				<input name="" type="submit" value="提交">
				<!--<a href="#" class="ui-btn ui-btn-sp" id="registerBtn">下一步</a>-->
              </div>
            </form>
        </div>
      <div>
  </div>
</div>
<script src="<?php echo base_url()?>/statics/js/dist/print-templates-manage.js?ver=20140430"></script>
</body>
</html>

 