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


<script>
function validMaxForShare(){
    window.location.href='../noteprinttemp/add';
    //$.ajax({
//      url: '../right/isMaxShareUser?action=isMaxShareUser',
//      dataType: 'json',
//      type: 'POST',
//      success: function(data){
//        if(data.status === 200){
//        	var json = data.data;
//        	if(json.shareTotal >= json.totalUserNum)
//        	{
//        		parent.Public.tips({type:2, content : '共享用户已经达到上限值：'+json.totalUserNum});
//        		return false;
//        	}else
//        	{
//        		window.location.href='../noteprinttemp/add';
//        	}	
//        }
//      }
//  });
}
</script>
</head>
<body>
<div class="wrapper">
    <div class="mod-toolbar-top">
       <a href="javascript:validMaxForShare();" class="ui-btn ui-btn-sp mrb">新增模板</a>
       <span class="tit" id="shareInfo" style="display:none;"></span>
    </div>    
    <div class="grid-wrap">
      <table id="grid">
      </table>
      <div id="page"></div>
    </div>
</div>
<script>
  (function($){
    var totalUser, usedTotal, leftTotal;
    initGrid();

    $('.grid-wrap').on('click', '.delete', function(e){
      var id = $(this).parents('tr').attr('id');
      var rowData = $('#grid').getRowData(id);
      var userName = rowData.userName;
      e.preventDefault();
      $.ajax({
        url: '../right/auth2UserCancel?action=auth2UserCancel&userName=' + userName,
        type: 'POST',
        dataType: 'json',
        success: function(data){
          if (data.status == 200) {
            parent.Public.tips({content: '取消用户授权成功！'});
            usedTotal--;
            leftTotal++;
            showShareCount();
            if (rowData.isCom) {
                rowData.share = false;
                $("#grid").jqGrid('setRowData', id, rowData);
            } else {
                $("#grid").jqGrid('delRowData',id);
            }
           
          } else {
            parent.Public.tips({type: 1, content: '取消用户授权失败！' + data.msg});
          }
        },
        error: function(){
           parent.Public.tips({content:'取消用户授权失败！请重试。', type: 1});
        }
      });
    });

    $('.grid-wrap').on('click', '.authorize', function(e){
      var id = $(this).parents('tr').attr('id');
      var rowData = $('#grid').getRowData(id);
      var userName = rowData.userName;
      e.preventDefault();
       $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '../right/auth2User?action=auth2User&userName=' + userName,
        success: function(data){
          if (data.status == 200) {
            parent.Public.tips({content : '授权成功！'});
            rowData.share = true;
            $("#grid").jqGrid('setRowData', id, rowData);
            usedTotal++;
            leftTotal--;
            showShareCount();
            //window.location.href = 'authority-setting.jsp?userName=' + userName + '&right=0';
          } else {
            parent.Public.tips({type:1, content : data.msg});
          }
        },
        error: function(){
          parent.Public.tips({type:1, content : '用户授权失败！请重试。'});
        }
      });
    });

   
    function initGrid(){
      $('#grid').jqGrid({
        url: '../noteprinttemp/findNotePrintTemp?action=queryAllUser',
        datatype: 'json',
        height: Public.setGrid().h,
        colNames:['操作','名称', '类别', '模板类型','是否默认'],
        colModel:[
		  {name:'id', index:'id', width:100, align:"center", title:false, formatter: edit},
          {name:'name',index:'name', width:200},
          {name:'type', index:'type', width:200},
          {name:'level', index:'level'},
          {name:'isDefault', index:'isDefault', width:100},
		  //{name:'setting_data', index:'setting_data', width:100, align:"center", title:false, formatter: settingDataFormatter},
		  //{name:'setting_data', index:'setting_data', width:100, align:"center", title:false, formatter: settingDataFormatter, hidden:(parent.SYSTEM.siType == 1)},
		  //{name:'share', index:'share', width:100, align:"center", title:false, formatter: shareFormatter}

        ],
        altRows:true,
        gridview: true,
        page: 1,
        scroll: 1,
        autowidth: true,
        cmTemplate: {sortable:false}, 
        rowNum:150,
        shrinkToFit:false,
        forceFit:false,
        pager: '#page',
        viewrecords: true,
        jsonReader: {
          root: 'data.items', 
          records: 'data.totalsize',  
          repeatitems : false,
          id: 'userId'
        },
        loadComplete: function(data){
          if (data.status == 200) {
            data = data.data;
            totalUser = data.totalUserNum;
            usedTotal = data.shareTotal;
            leftTotal = totalUser - usedTotal;
            showShareCount();
            $('#shareInfo').show();
          } else {
        	  parent.Public.tips({type: 1, content: data.msg});
          }
          
        },
        loadonce: true
      });
    }


    function showShareCount(){
        $('#totalUser').text(totalUser);
        $('#usedTotal').text(usedTotal);
        $('#leftTotal').text(leftTotal);
    }
	
	
	function shareFormatter(val, opt, row) {
        if (val || row.admin) {
          if (row.admin) {
              return '管理员';
          } else {
               return '<div class="operating" data-id="' + row.userId + '"><span class="delete ui-label ui-label-success">已启用</span></div>';
          }
        } else {
          return '<p class="operate-wrap"><span class="authorize ui-label ui-label-default">已停用</span></p>';
        } 
    };
    function settingFormatter(val, opt, row) {
		if (row.admin || row.share === false) {
			return '&nbsp;';
		} else {
			return '<div class="operating" data-id="' + row.userId + '"><a class="ui-icon ui-icon-pencil" title="详细设置授权信息" href="../settings/authority_setting?userName=' + row.userName + '"></a></div>';
		}
    };
    function edit(val, opt, row) {
		if (row.admin || row.share === false) {
			return '&nbsp;';
		} else {
		    var d = '<div class="operating" data-id="' + row.id + '"><a class="ui-icon ui-icon-pencil" href="../Noteprinttemp/edit?id=' + row.id + '" title="修改"></a><a class="ui-icon ui-icon-trash" title="删除" href="../Noteprinttemp/del?id=' + row.id + '"></a></div>';
			return d
			//return '<a class="ui-icon ui-icon-pencil" title="详细设置授权信息" href="../settings/Noteprinttemp/edit?id=' + row.id + '"></a> <a class="ui-icon ui-icon-trash" title="删除"></a>';
		}
    };
	
  })(jQuery)
  
  $(window).resize(function(){
	  Public.resizeGrid();
  });
</script>
</body>
</html>


 