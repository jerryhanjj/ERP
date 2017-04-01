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
body{overflow-y:hidden;}
.grid-wrap p{margin:5px 0;}
#tree{background-color: #fff;width: 225px;border: solid #ddd 1px;margin-left: 5px;height:100%;}
h3{background: #EEEEEE;border: 1px solid #ddd;padding: 5px 10px;}
.grid-wrap{position:relative;}
.grid-wrap h3{border-bottom: none;}
#tree h3{border-style:none;border-bottom:solid 1px #D8D8D8;}
.quickSearchField{padding :10px; background-color: #f5f5f5;border-bottom:solid 1px #D8D8D8;}
#searchCategory input{width:165px;}
.innerTree{overflow-y:auto;}
#hideTree{cursor: pointer;color:#fff;padding: 0 4px;background-color: #B9B9B9;border-radius: 3px;position
: absolute;top: 5px;right: 5px;}
#hideTree:hover{background-color: #AAAAAA;}
#clear{display:none;}
.ztree li span.button.add {margin-left: 2px;margin-right: -1px;background-position: -144px 0;vertical-align
: top;}
</style>
</head>
<body>
<div class="wrapper">
	<div class="mod-toolbar-top cf">
	    <div class="fl">
		    <strong class="tit">计量单位</strong>
	    </div>
	    <div class="fr"><a href="#" class="ui-btn ui-btn-sp mrb" id="btn-add">新增</a><a class="ui-btn" id
="btn-refresh">刷新</a></div>
	  </div>
	<div class="cf">
	    <div class="grid-wrap fl cf">
	    	<h3>当前组：<span id='group'></span><a href="javascript:void(0);" id='hideTree'>&gt;&gt;</a></h3>

		    <table id="grid">
		    </table>
		    <div id="page"></div>
		</div>
		<div class="fl cf" id='tree'>
			<h3>快速查询</h3>
			<div class="quickSearchField dn">
				<form class="ui-search" id="searchGroup">
					<input type="text" class="ui-input" /><button type="submit" title="点击搜索" >搜索</button>
				</form>
			</div>
		</div>
	</div>
</div>
<script src="<?php echo base_url()?>/statics/js/dist/unitList.js?ver=20140430"></script>
</body>
</html>