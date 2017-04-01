<?php $this->load->view('header');?>
<script type="text/javascript">
var DOMAIN = document.domain;
var WDURL = "";
var SCHEME= "<?php echo sys_skin()?>";
try{
	document.domain = 'youshang.com';
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
.mod-crumb .cur {font-size: 16px;font-weight: bold;position: relative;top: 2px;}
.mod-crumb a, .mod-crumb span {margin: 0 3px;vertical-align: base-line;color: #555;}
.setting-wrap {width: 910px;}
.mod-inner {padding: 0;}
.wrapper-assisting{}
.assisting-list-wrap{position:relative;zoom:1;overflow:hidden;border: 1px solid #ccc;zoom:1;}
.assisting-list{position:relative;top:1px;margin:-1px -5px 0 0;background: #fff;overflow: hidden;}
.assisting-list li{position:relative;float: left;width: 25%;*width:24.9%;height: 165px;}
.assisting-list a.item{display: block;height: 164px;overflow:hidden;text-align:center;color: #3b87b1
;background: #fff;border-bottom: 1px dashed #ccc;border-right: 1px dashed #ccc;}
.assisting-list li i{display: block;width: 64px; height: 64px;margin:40px auto 0;background: url("<?php echo base_url()?>/statics/css/img/page_spr_icons.png") no-repeat;}
.assisting-list li strong{display:block;padding:10px 0; font-weight: normal; font-size: 14px;}
.assisting-list .on a.item,.assisting-list .add a.item{/*background: #f8f8f8;box-shadow:inset 0 0 4px
 rgba(0,0,0,.11);*/}
.assisting-list .add a.item{line-height: 164px; font-size:14px;}
.assisting-list .operation{display:none;position: absolute;right: 5px;top: 5px;}
.assisting-list .operation a{margin-right: 8px}
.assisting-list .on .operation{display: block;}

.assisting-list li dl{ color:#999; }
.assisting-list li dt{ font-size:14px; margin-bottom:10px; }
.assisting-list li dd{ margin-bottom:6px; }

/*列表图标*/
.assisting-list .supplier i {background-position: -64px 0;}
.assisting-list .customer i {background-position: -128px 0;}
.assisting-list .project i {background-position: -194px 0;}
.assisting-list .department i {background-position: -258px 0;}
.assisting-list .staff i {background-position: -322px 0;}
.assisting-list .custom i{background-position: -388px 0;}


/*新增编辑页*/
/*.assisting-manage{height: 80px;}*/

#assisting-category-select .ui-tab{margin-right: 5px;}


.cur #custom-assisting .ui-combo-wrap{background: #eaeaea;border-color: #c1c1c1;}
.cur #custom-assisting input{background: #eaeaea;font-weight: bold;}

.batch-fun{ margin:0 18px; border:1px solid #CCC; }
.batch-fun span{ margin-right:20px; }
</style>
</head>

<body>
<div class="wrapper">
  <div class="setting-wrap">
		<div class="mod-toolbar-top">
			<div class="left mod-crumb"><span class="cur">辅助属性</span></div>
		</div>
		<div class="mod-inner">
			<div class="assisting-list-wrap">
				<ul id="assisting-list" class="assisting-list cf">
					<li class="add" id="add-custom-assisting">
						<a href="#" class="item">+ 新增分类</a>
					</li>
				</ul>
			</div>
		</div>

	</div>
</div>
<script src="<?php echo base_url()?>/statics/js/dist/assistingProp.js?ver=20140430"></script>
</body>
</html>




 

