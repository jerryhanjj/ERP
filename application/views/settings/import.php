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

<script src="<?php echo base_url()?>statics/js/common/libs/swfupload/swfupload.js?v=2015616"></script>
<style>
.wrapper {padding: 15px 0 0 18px;min-width: 0;}
</style>
</head>

<body>
<div class="wrapper">
	<div class="mod-inner"  style="width:480px; ">
      <h3>批量导入客户、供应商、商品信息及初始余额</h3>
      <ul class="mod-steps" id="import-steps">
          <li><span class="current">1.下载模版</span>&gt;</li>
          <li><span>2.导入Excel</span>&gt;</li>
          <li><span>3.导入完毕</span></li>
      </ul>
      <div id="import-wrap" class="cf">
          <div id="import-step1" class="step-item">
              <div class="ctn">
                  <h3 class="tit">温馨提示：</h3>
                  <p>导入模板的格式不能修改，录入方法请参考演示模板。</p>
              </div>
              <p><a href="../basedata/import/downloadtemplate1" class="link">下载导入客户模版</a></p>
              <p><a href="../basedata/import/downloadtemplate2" class="link">下载导入供应商模版</a></p>
              <p><a href="../basedata/import/downloadtemplate3" class="link">下载导入商品模版</a></p>
              <div class="step-btns">
                  <a href="#" class="ui-btn ui-btn-sp" rel="step2">下一步</a>
              </div>
          </div>

          <div id="import-step2" class="step-item" style="display:none;">
              <div class="ctn file-import-ctn"> 
                  <span class="tit">请选择要导入文件：</span>
                  <input type="text" name="file-path" id="file-path" class="ui-input" readonly autocomplete
="false" />
                  <span id="import-btn-wrap"><span id="import-btn"></span></span>
              </div>
              <div class="step-btns">
                  <a href="#" class="ui-btn mrb" rel="step1">上一步</a><a href="#" class="ui-btn ui-btn-sp"
 id="btn-import">导入</a>
              </div>					
          </div>

          <div id="import-step3" class="step-item" style="display:none;">
              <div class="ctn file-import-ctn" id="import-result"></div>

              <div class="step-btns">
                  <a href="#" class="link" id="a_step3">上一步</a><a href="#" class="ui-btn ui-btn-sp" id
="btn-complete">完成</a>
              </div>
          </div>
      </div>
	</div>
</div>



<script type="text/javascript">
(function($){	
	var progressPop;
	var uploadInstance = new SWFUpload({
				upload_url: "../basedata/import/upload?jsessionid=AA76C16AF22059B6D59198658E425278",
				file_post_name: "resume_file",

				file_size_limit : "10 MB",
				file_types : "*.xls;*.xlsx",
				file_types_description : "All Files",
				file_upload_limit : "0",
				file_queue_limit : "1",

				file_dialog_start_handler: fileDialogStart,
				file_queued_handler : fileQueued,
				file_queue_error_handler : fileQueueError,
				file_dialog_complete_handler : fileDialogComplete,
				
				upload_start_handler : uploadStart,	
				upload_progress_handler : uploadProgress,
				upload_error_handler : uploadError,
				upload_success_handler : uploadSuccess,
				upload_complete_handler : uploadComplete,

				button_image_url : "../../statics/js/common/libs/swfupload/import-btn.png",
				button_placeholder_id : "import-btn",
				button_width: 60,
				button_height: 32,
				
				// Flash Settings
				flash_url : "../../statics/js/common/libs/swfupload/swfupload.swf",

				custom_settings : {
					progress_target : "fsUploadProgress",
					upload_successful : false
				},
				
				// Debug settings
				debug: false
	});
	
	$('#import-wrap .step-btns a[rel]').bind('click',function(e){
			var step = $(this).attr('rel').substr(4,1)-1;
			if(step < 2){
				$('#import-wrap .step-item').eq(step).show().siblings().hide();
				$('#import-steps >li >span').removeClass('current');
				$('#import-steps >li >span').eq(step).addClass('current');
			} else {
				
			}
			e.preventDefault();
	});
	
	function findImportResult() {
		$.ajax({
			url: '../basedata/import/findDataImporter?action=findDataImporter',
			type: 'post',
			dataType: 'json',
			success: function(data){
				if(data.status == 200){
					if(data.data.items.length == 0) {
						uploadInstance.addPostParam('voucherReSeq',$('#voucherReSeq').attr('checked') ? 1 : 0);
						uploadInstance.startUpload();
						return;
					}
					if(data.data.items[0].status == 1) {
						parent.Public.tips({content : '初始数据还在导入中。。。请稍后做此操作！', type : 2});
					} else {
						//uploadInstance.addPostParam({'voucherReSeq' : $('#voucherReSeq').attr('checked') ? 1 : 0});
						uploadInstance.addPostParam('voucherReSeq',$('#voucherReSeq').attr('checked') ? 1 : 0);
						uploadInstance.startUpload();
					}
				} else {
					Public.tips({ type:1,content : data.msg});
				}
			},
			error: function(){
				Public.tips({ type:1,content : '系统繁忙，请稍后重试！'});
			}
		});
	}
	
	$('#resultInfo').click(function(){
		var _pop = parent.$.dialog({
			width: 460,
			height: 300,
			title: '导入信息',
			content: 'url:../basedata/resultInfo',
			data: {
				callback: function(row){
					_pop.close();
				}
			},
			lock: true,
			parent:frameElement.api
		}); 
	}); 
	
	$("#import-wrap").on("click", '#resultInfo2', function() {
		parent.$.dialog({
			width: 460,
			height: 300,
			title: '导入信息',
			content: 'url:../basedata/resultInfo',
			data: {
				callback: function(row){
				}
			},
		lock: true
		});  
	});

	$('#btn-import').on('click',function(e){
		e.preventDefault();
		if(!$('#file-path').val()){
			parent.Public.tips({content : '请选择要上传的文件！', type : 2});
			return ;
		}
		findImportResult();
		//uploadInstance.addPostParam({'voucherReSeq' : $('#voucherReSeq').attr('checked') ? 1 : 0});
		//uploadInstance.addPostParam('voucherReSeq',$('#voucherReSeq').attr('checked') ? 1 : 0);
		//uploadInstance.startUpload();
	});

	function fileDialogComplete(a,b){
		
	}

	function fileDialogStart() {
		$('#file-path').val('');
		uploadInstance.cancelUpload();
	}

	function fileQueued(file) {
		//console.log(file);
		try {
			$('#file-path').val(file.name);
		} catch (e) {
		}
	}


	
	function fileQueueError(file, errorCode, message)  {
		try {
			// Handle this error separately because we don't want to create a FileProgress element for it.
			switch (errorCode) {
			case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
				Public.tips({content : '每次只能上传一个文件！', type : 2});
				return;
			case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
				Public.tips({content : '文件大小不能超过10 MB！', type : 2});
				return;
			case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
				Public.tips({content : '您选择的文件大小为0，请重新选择！', type : 2});
				return;
			case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
				Public.tips({content : '只能导入Excel文件！', type : 2});
				return;
			default:
				Public.tips({content : '导入失败，请重试！', type : 2});
				return;
			}
		} catch (e) {
		}
	}

	function uploadStart(){
		progressPop = $.dialog.tips('正在导入凭证，请耐心等待...',1000,'loading.gif',true).show();
	}

	function uploadProgress(file, bytesLoaded, bytesTotal){
		try {
			var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
			if($('#upload-progress .progress-bar > span').length > 0){
				$('#upload-progress .progress-bar > span').width(percent + '%');
			}
		} catch (e) {
		}
	}

	function uploadError(file, errorCode, message) {
		try {
			progressPop.close();
			parent.Public.tips({content : '导入失败，请重试！', type : 2});
		} catch (e) {
		}
	}

	function uploadSuccess(file, serverData) {
		try {
			progressPop.close();
			$('#import-wrap .step-item').eq(2).show().siblings().hide();
			$('#import-steps >li >span').removeClass('current');
			$('#import-steps >li >span').eq(2).addClass('current');

			$('#import-result').html(serverData);
			var html = "<a href='#' id='resultInfo2' class='link'>查看导入记录</a>";
			$('#import-result').append(html);
			return;
			//根据服务器返回数据进行处理
			if (serverData === " ") {
				this.customSettings.upload_successful = false;
			} else {
				this.customSettings.upload_successful = true;
				var data = eval('(' + serverData + ')');
				  if(data.status == 200){
					  $('#import-result').html(data.data.msg);
					  var html = "<a href='/basedata/import.do?action=download&relativePath=" + data.data.relativePath + "' class='link'>下载错误数据文件</a>";
					  $('#import-result').append(html);
				  }else{
					  //Public.tips({type:1, content : data.msg});
				  }
				//$('#import-result').html(serverData);
				//更新期间数据
				parent.getPeriod();
			}
			
		} catch (e) {
		}
	}

   $('#a_step3').bind('click',function(e){			
		$('#import-wrap .step-item').eq(1).show().siblings().hide();
		$('#import-steps2 >li >span').removeClass('current');
		$('#import-steps2 >li >span').eq(1).addClass('current');
		e.preventDefault();
	});
   $('#btn-complete').on('click',function(e){
   		frameElement.api.close();
   });
	function uploadComplete(){
		$('#file-path').val('');
	}	  
})(jQuery);

</script>
</body>
</html>
