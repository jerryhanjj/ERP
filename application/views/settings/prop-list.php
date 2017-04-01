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
.manage-wrap{margin: 0 auto;width: 300px;}
.manage-wrap .ui-input{width: 200px;font-size:14px;}
.manage-wrap .hideFeild{position: absolute;top: 30px;left:80px;width:210px;border:solid 1px #ccc;background-color:#fff;}
.ztreeDefault{overflow-y:auto;max-height:240px;}
.searchbox{float: left;font-size: 14px;}
.searchbox li{float: left;margin-right: 10px;}
#matchCon{width:140px;}
.ui-input-ph {color: #aaa;}
.cur #custom-assisting .ui-combo-wrap {background: #eaeaea;border-color: #c1c1c1;}
.cur #custom-assisting input {background: #eaeaea;font-weight: bold;}
.ui-droplist-wrap .selected {background-color: #d2d2d2;}
.input-txt{font-size:14px;}
.ui-droplist-wrap .list-item {font-size:14px;}
</style>
</head>
<body>
<div class="wrapper">
	<div class="mod-toolbar-top cf">
	    <div class="left">
          <!--<div class="mod-crumb fl"><span class="cur"></span></div>-->
          <div id="assisting-category-select" class="ui-tab-select">
            <strong class="tit">类别</strong>
            <ul class="ui-tab mrb">
            </ul>
            <span class="fl mrb dn">
               <span id="custom-assisting"></span>
            </span>
            <ul class="searchbox cf">
		        <li>
		          <input type="text" id="matchCon" class="ui-input ui-input-ph matchCon" value="输入类别名称查询">

		        </li>
		        <li><a class="ui-btn mrb" id="search">查询</a></li>
		    </ul>
          </div>
        </div>
	    <div class="fr"><a href="#" class="ui-btn ui-btn-sp mrb" id="btn-add">新增</a><a class="ui-btn" id
="btn-refresh">刷新</a></div>
	  </div>
    <div class="grid-wrap">
	    <table id="grid">
	    </table>
	    <div id="page"></div>
	  </div>
</div>
<script src="<?php echo base_url()?>/statics/js/dist/propList.js?ver=20140430"></script>

</body>
</html>



 