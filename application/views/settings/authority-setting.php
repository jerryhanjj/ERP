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

</head>

<body>
<div class="wrapper">
  <div class="mod-toolbar-top cf">
    <div class="fl"><h3 class="f14">详细权限设置<span class="fwn">（请勾选为 <b id="userName"></b> 分配的权限）</span></h3></div>
    <div class="fr"><a class="ui-btn ui-btn-sp mrb" id="save">确定</a><a class="ui-btn" href="<?php echo site_url('settings/authority')?>">返回</a></div>
  </div>
  <div class="grid-wrap">
    <table id="grid">
    </table>
    <div id="page"></div>
  </div>
</div>
<script>
  var urlParam = Public.urlParam(), userName = urlParam.userName, curGroup;
  var height = Public.setGrid().h;
  var relation = {
			"购货单":[{name:'商品',rights:['查询']},{name:'仓库',rights:['查询']},{name:'供应商',rights:['查询']}],
			"销货单":[{name:'商品',rights:['查询']},{name:'仓库',rights:['查询']},{name:'客户',rights:['查询']}],
			"调拨单":[{name:'商品',rights:['查询']},{name:'仓库',rights:['查询']}]
	},
	$grid = $('#grid'),
	RelationalMapping = {};//Rowid与名字的映射
  $('#userName').text(userName);
  $("#grid").jqGrid({
	  url:'../right/queryalluserright?userName=' + userName,
	  datatype: "json",
	  //caption: "科目余额表",
	  autowidth: true,//如果为ture时，则当表格在首次被创建时会根据父元素比例重新调整表格宽度。如果父元素宽度改变，为了使表格宽度能够自动调整则需要实现函数：setGridWidth
	  //width: width,
	  height: height,
	  altRows: true, //设置隔行显示
	  //rownumbers: true,//如果为ture则会在表格左边新增一列，显示行顺序号，从1开始递增。此列名为'rn'
	  //gridview: true,
	  colNames:['<input type="checkbox" id="all" class="vm">', '功能列表', '操作', '<label for="all">授权</label>'],
	  colModel:[
	  	  {name:'fobjectid', width:40, align:"center", formatter:groupFmatter},
		  {name:'fobject', width:200, formatter:moduleFmatter},
		  {name:'faction', width:150, align:"center"},
		  {name:'fright', width:100, align:"center", formatter:rightFmatter}
	  ],
	  cmTemplate: {sortable: false, title: false},
	  //idPrefix: 'ys',
	  //loadui: 'block',
	  //multiselect: true,
	  //multiboxonly: true,
	  page: 1, 
	  sortname: 'number',    
	  sortorder: "desc", 
	  pager: "#page",  
	  rowNum: 2000,  
	  rowList:[300,500,1000],     
	  scroll: 1, //创建一个动态滚动的表格，当为true时，翻页栏被禁用，使用垂直滚动条加载数据，且在首次访问服务器端时将加载所有数据到客户端。当此参数为数字时，表格只控制可见的几行，所有数据都在这几行中加载
	  loadonce: true,
	  viewrecords: true,
	  shrinkToFit: false,
	  forceFit: false,
	  jsonReader: {
		root: "data.items", 
		records: "data.totalsize",  
		repeatitems : false,
		id: -1
	  },
	  afterInsertRow: function(rowid, rowdata, rowelem) {
		
	  },
	  loadComplete: function(data) {
	  	$('.group').each(function(index, element) {
			 var groupId = $(this).attr('id');
			 var $_ckbox = $('.ckbox[data-for=' + groupId + ']');
			 if($_ckbox.length === $_ckbox.filter(':checked').length) {
				this.checked = true;
			 };
        }); 
	  	initRelation();
	  },
	  loadError: function(xhr,st,err) {
		  
	  }
  });
  
  function groupFmatter(val, opt, row){
	if(curGroup !== val){
		return '<input class="group" type="checkbox" id="'  + val + '">';
	} else {
		return '';
	};
  };
  function moduleFmatter(val, opt, row){
	fillMap(val, opt ,row);//缓存映射关系
	if(curGroup !== row.fobjectid){
		curGroup = row.fobjectid;
		return val;
	} else {
		return '';
	};
  };
  
  function rightFmatter(val, opt, row){
	var html_str = '<input type="checkbox" class="ckbox" data-for="' + row.fobjectid + '" data-id="' + row.frightid + '"';
	if(row.faction === '查询') {
		html_str = html_str + 'data-view="true"';
	};
	if(val > 0){
		return html_str + ' checked="checked">';
	} else {
		return html_str + '>';
	};
  };
  
  $('#all').click(function(e){
	  e.stopPropagation();
	  if(this.checked) {
		$('.ckbox').each(function(){
			this.checked = true;
		});	
		$('.group').each(function(){
			this.checked = true;
		});	
	  } else {
		 $('.ckbox').removeAttr('checked');
		 $('.group').removeAttr('checked');
	  }
  });
  $('#save').click(function(e){
	  var items = [];
	  $('.ckbox').each(function(i){
		  if(this.checked) {
			 items.push($(this).data('id'));
	      }
	  });
	  //Public.ajaxPost('../right/addRights2OutUser?userName=' + userName + '&rightid={rightids:['+ items.join(',') + ']}', {}, function(data){
	  Public.ajaxPost('../right/addRights2OutUser?userName=' + userName + '&rightid='+ items.join(','), {}, function(data){
		  if(data.status === 200) {
			  parent.Public.tips({content : '保存成功！'});
		  } else {
			  parent.Public.tips({type: 1, content : data.msg});
		  }
	  });
  });
  $('.grid-wrap').on('click', '.group', function(){
	 var groupId = $(this).attr('id');
	 if(this.checked) {
		$('.ckbox[data-for=' + groupId + ']').each(function(){
			this.checked = true;
		});	
	 } else {
		$('.ckbox[data-for=' + groupId + ']').removeAttr('checked');
	 };
	 $(this).closest('tr').find('input').filter('[data-view=true]').trigger('checkChange');
  });
  $('.grid-wrap').on('click', '.ckbox', function(){
	 var groupId = $(this).data('for');
	 var $_group = $('.ckbox[data-for=' + groupId + ']'), $_view = $_group.filter('[data-view=true]'), $_others = $_group.not('[data-view=true]');
	 if(!$(this).data('view')) {
		if(this.checked && $_view.length > 0) {
	 		$_view[0].checked = true;
		};
	 } else {
	 	if($_others.length > 0 && $_others.filter(':checked').length > 0) {
			this.checked = true;
		};
	 };
	 $_view.trigger('checkChange');
	 if($_group.length === $_group.filter(':checked').length) {
		$('#' + groupId)[0].checked = true;
	 } else {
		$('#' + groupId).removeAttr('checked');
	 };
  });
/**
 * 关联权限处理
 */
 function fillMap(val, opt ,row){
		RelationalMapping[val+"-"+row.faction] = opt.rowId;
}
 function initRelation(){  
	 $grid.find('input').filter('[data-view=true]').each(function(){
		setRelativeRight($(this));
	});
 };
 function setRelativeRight(view){
	 var _modelName = view.closest('tr').find('td:eq(1)').html();
	 if(relation[_modelName]){
		 view.on('checkChange',function(){
			 var _arr = relation[_modelName];
			 var _isChecked = this.checked;
			 for(var i = 0,len = _arr.length; i < len; i++){
				 var _name = _arr[i].name;
				 var _rights = _arr[i].rights;
				 for(var j=0,l = _rights.length; j<l; j++){
					 var _proName = _arr[i].name+"-"+_rights[j];
					 var _rid = RelationalMapping[_proName];
					 if(!_arr[i].ckbox){
						 _arr[i].ckbox = {};
					 }
					 if(!_arr[i].ckbox[_proName]){
					 	_arr[i].ckbox[_proName] = $('#'+_rid).find('.ckbox')[0];//缓存当前对象
					 }
					 if(_isChecked){
						 //如果主权限获得，则做以下处理
						 _arr[i].ckbox[_proName].checked = true;
					 }
					 else{
						 //如果主权限取消，则做以下处理
					 }
				 }
			 }
			 this.checked = _isChecked;
		 });
	 }
}
</script>
</body>
</html>