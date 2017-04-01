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

<link rel="stylesheet" href="<?php echo base_url()?>statics/js/common/libs/uploader/jquery.uploader.css">
<script type="text/javascript" src="<?php echo base_url()?>statics/js/common/libs/uploader/jquery.uploader.js"></script>
</head>

<body class="bgwh">
<div class="wrapper">
	<div class="mod-inner"  style="width:480px; ">
      <h3>请注意导入格式跟导出格式保存一致！</h3>
      <div id="import-wrap" class="cf">
          <div id="import-step2" class="step-item">
              <div class="ctn file-import-ctn"> 
                  <span class="tit">请选择要导入文件：</span>
                  <input type="text" name="file-path" id="file-path" class="ui-input" readonly autocomplete
="false" />
                  <a class="ui-btn" type="button" id="selectFile" style="width: 60px; height: 30px; "
>选择文件</a>
              </div>				
          </div>
      </div>
	</div>
</div>

<script type="text/javascript">
var callback = null;
var api = frameElement.api;
(function($){	
    $('#selectFile').uploader({
        action: "../scm/pdImport?jsessionid=F8FCE30624F78A4008DDA0A9F6E0374F",
        //mode: 'flash',        //上传模式，html5/flash
        name: "file",           //字段名
        formData: {},           //
        multiple: false,         //是否多选
        auto: false,            //是否自动上传
        showQueue: '#queue',                        //显示队列的位置（传递jQuery选择器自定义队列显示的元素，传递true自动生成队列）
        fileSizeLimit: '1M',                        //文件大小限制（'100kb' '5M' 等）
        fileTypeDesc: '选择文件',      //可选择的文件的描述，用中竖线分组。此字符串出现在浏览文件对话框的文件类型下拉中
        fileTypeExts: 'xlsx,xls',        //允许上传的文件类型类表，用逗号分隔多个扩展，用中竖线分组（eg: 'jpg,jpeg,png,gif'）

        /*
        // 鼠标点击触发按钮
        onMouseClick: function(){
            //log('onMouseClick')
        },
        // 鼠标经过触发按钮
        onMouseOver: function(el){
            //log('onMouseOver')
        },
        // 鼠标移出触发按钮
        onMouseOut: function(el){
            //log('onMouseOut')
        },*/
        
        // 上传初始化完成
        onInit:function(){

        },
        // 选择文件
        onSelected: function(filelist){
        	if(filelist.length > 0) {
        		$('#file-path').val(filelist[0].name);
        	}
        },
        // 开始上传
        onStart: function(e){
        },
        // 上传进行中
        onProgress: function(e){
        },
        // 上传发生错误
        onError: function(e){
        	api.data && api.data.callback && api.data.callback(e);
        },
        // 上传成功
        onSuccess: function(e){
        	var data = JSON.parse(e.data);
        	api.data && api.data.callback && api.data.callback(data);
        	//parent.parent.Public.tips({content: '导入成功！'});
        	//parent.$('#search').trigger('click');
        	//parent.loading.close();
        	//parent.import_dialog.close();
        	
        },
        // 单个文件处理完成（error or success）
        onComplete: function(e){
        },
        // 全部文件处理完成（error or success）
        onAllComplete: function(){
        },
        // 清空队列
        onClearQueue: function(){
        }
    }); 
    
    callback = function (){
    	$('#selectFile').uploader('start');

    };
})(jQuery);

</script>
</body>
</html>

