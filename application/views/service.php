<?php $this->load->view('header');?>

<script type="text/javascript">
var DOMAIN = document.domain;
var WDURL = "<?php echo site_url()?>";
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

<link href="<?php echo base_url()?>statics/service/css/global.css?v=20120213" rel="stylesheet" type="text/css">
<style type="text/css">
.service-header{position:fixed;width:100%;background: none repeat scroll 0 0 #F4F4F4;z-index:99999;}

.holder{padding:25px 0;}
</style>
</head>
<body>
<div id="Wrapper">
  <div>
    <dl id="Service" class="service">
      <dt class="type cf service-header"><!--<a>自助服务</a>|<a  data-tab="news">系统消息</a>|
<a data-tab="problems">我的提问</a>|<a data-tab="question">在线提问</a>|<a class="cur">服务通道</a>--><!--|<a>专家服务</a>--></dt>

      <dd class="holder">
      <dd class="con">
        <div class="service-box news dn">
        	<div class="service-list">
        		<div class="load-place">
	              <table>
	                <thead>
	                    <tr>
	                      <th>标题</th>
	                      <td width="120">发送者</td>
	                      <td width="180">发布时间</td>
	                    </tr>
	                </thead>
	                <tbody>
	                </tbody>
	              </table>
	          </div>
	          <p class="tr paging"></p>
        	</div>
          	<div class="service-con news-con dn">
          		<div class="service-hd">
          			<h3 class="title"></h3>
          			<a href="" class="back"><i></i>返回</a>
          		</div>
          		<div class="con">
          			
          		</div>
          		<p class="skip"><a class="prev">&lt;&lt; 上一条</a> | <a class="next">下一条 &gt;&gt;</a></p>

          	</div>
        </div>
        <div class="service-box problems dn">
        	<div class="service-list">
        		<div class="load-place">
	              <table>
	                <thead>
	                    <tr>
	                      <th>标题</th>
	                      <td width="80">状态</td>
	                      <td width="160" align="center">创建时间</td>
	                      <td width="160" align="center">最后回复</td>
	                    </tr>
	                </thead>
	                <tbody>
	                </tbody>
	              </table>
	          </div>
	          <p class="tr paging"></p>
        	</div>
        	<div class="service-con problems-con dn">
        		<div class="service-hd">
          			<h3 class="title"></h3>
          			<a href="" class="back"><i></i>返回</a>
          		</div>
          		<div class="con aq-list">
          		</div>
          		<div class="continue-ask" id="continue-ask">
          			<!--<textarea name="question"></textarea>-->
                    <div><script id="continueAsk" type="text/plain"></script></div>
          			<p class="tr"><input type="button" class="ui-btn ui-btn-sp m0" value="继续提问" /></p>
          		</div>
          		<p class="skip"><a class="prev">&lt;&lt; 上一条</a> | <a class="next">下一条 &gt;&gt;</a></p>

        	</div>
        </div>
        <div class="service-box question dn">
          <h3 class="service-hd"><i></i>欢迎您给我们提出意见和建议，您的问题我们会在工作日内尽快回复，敬请留意<a href="javascript:;" id
="TabProblems">我的提问</a>，谢谢！</h3>
          <div class="service-bd">
          	  <div class="m20">
	            <label>标题：</label><input type="text" class="txt_fw" id="QTitle">
	          </div>
	          <div class="m20 cf">
	            <label class="fl">内容：</label>
	            <script id="editor" type="text/plain"></script>
	          </div>
	          <p class="tr">
	            <input type="button" class="ui-btn ui-btn-sp" value="提 交" id="submit">
	          </p>
          </div>
        </div>
        <div class="service-box contact">
    		<div class="service-hd contact-txt">
    			<p>若您在使用过程中遇到问题，您可以通过以下方式联系我们，我们将在线为您提供服务！</p>
    		</div>
    		<ul class="list cf">
    			<li class="weixin">
    				<div class="inner">
    					<i></i>
	    				<p class="tit">售后热线：13616216627</p>
	    				<p>通过热线&远程协控，为您提供产品应用和操作问题咨询、疑难业务指导和故障诊断等服务。</p>
	    				<p class="tit">服务响应：</p>
	    				<p>工作日（周一至周五）</p>
	    				<p>8:30-12:00、13:00-20:00</p>
	    				<p>周六</p>
	    				<p>9:00-12:00、13:30-17:30</p>
	    				<p>周日及其他法定假日除外，详见系统消息</p>
    				</div>
    			</li>
    			<li class="qq-club">
    				<div class="inner">
    					<i></i>
	    				<p class="tit">售后服务QQ：<a  title="在线QQ客服" id="wpa_shouhou" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=10373458&site=qq&menu=yes">10373458</a></p
>
	    				<p>您只需登录QQ即可在线沟通，通过文字应答&远程协控，为您提供产品应用操作问题指导和咨询服务。</p>
                        <p class="tit">服务响应：</p>
                        <p>工作日（周一至周五）</p>
                        <p>8:30-12:00、13:00-20:00</p>
                        <p>周六、周日</p>
                        <p>9:00-12:00、13:30-17:30</p>
                        <p>其他法定节假日除外，详见系统消息</p>
    				</div>
    			</li>
    			<li class="email">
    				<div class="inner">
    					<i></i>
	    				<p class="tit">客服邮箱：<a href="mailto:10373458@qq.com">10373458@qq.com</a></p>
                        <p>通过邮件提交您的事务性申请，如：密码修改申请、友盾挂失申请、补寄发票申请、产品升级申请等服务。</p>
                        <p class="tit">服务响应：</p>
                        <p>工作日24小时处理完毕</p>
    				</div>
    			</li>
    			<li class="qrCode">
                	<div class="inner">二维码</div>
    			</li>
    		</ul>
		</div>
<!--        <div class="added-service dn">
          <iframe id="IframeAdded" name="IframeAdded" scrolling="no" frameborder="0" height="600" width
="100%"></iframe>
        </div>-->
      </dd>
    </dl>
  </div>
</div>

 
<script type="text/javascript">
var $_tab = $('#Service > dt > a');
function openTab(index) {
	$_tab.eq(index -1).trigger('click');
};
$(function(){
	var Q_CONTENT = UE.getEditor('editor', { initialFrameWidth:627, initialFrameHeight:300, initialContent
:'' });
	var continueAsk;
	
	var param = Public.getRequest();
  	var system = SYSTEM = parent.SYSTEM;
	var URL = parent.CONFIG.SERVICE_URL;
	var CUR_TAB = param.tab || 1;
	var version;
	switch (system.siVersion) {
		case 3:
		  version = '1';
		  break;
		case 4:
		  version = '3';
		  break;
		default:
		  version = '2';
	};
	var CUR_INFO = {
		version: version,
		cur_type: '',
		news: { cur_page: 1 },
		problems: { cur_page: 1, cur_id: '' }
	};
	function getList(type, $_obj, pageIndex){
	  $.getJSON( URL+ "asy/Services.ashx?callback=?", {coid : system.DBID, loginuserno: system.userName
, version: CUR_INFO.version, pageIndex: pageIndex, pagesize: 12, type: type}, function(data){
		  if(data.status === 200) {
			  var tr = [];
			  if(data.data.recordes > 0) {
			  	  CUR_INFO.cur_type = type;
				  if(type === 'getsystemnews' + SYSTEM.servicePro) {
				  	CUR_INFO.news.cur_page = pageIndex;
					  $.each(data.data.items, function(i, data){
						  var flag = '';
						  flag = data.action === 'addrecord' ? ' class = "title unread"' : ' class="title"';
						  
						  var temp =  '<tr><td' + flag + ' rel="news' + data.id + '"><a href="" rel="news" data-id="' 
+ data.id + '" data-action="' + data.action + '">' + data.title + '</a></td><td>' + data.publisherno
 + '</td><td>' + data.publishtime + '</td></tr>';
						  tr.push(temp);
					  });
				  } else {
				  	CUR_INFO.problems.cur_page = pageIndex;
					  $.each(data.data.items, function(i, data){
						  var flag = '';
						  flag = data.action === 'addrecord' ? ' class = "title unread"' : ' class="title"';
						  
						  var temp =  '<tr><td' + flag + ' rel="problems' + data.no + '"><a href="" rel="problems" data-id
="' + data.no + '" data-action="' + data.action + '">' + data.title + '</a></td><td>' + data.state +
 '</td><td>' + data.uploadtime + '</td><td>' + data.ansertime + '</td></tr>';
						  tr.push(temp);
					  }); 
				  };
				  
				  var total = data.data.total;
				  var page = data.data.page;
				  $_obj.find('.paging').html('<a href="javascript:;" data-page="1" class="ser-first">首页</a> <a href
="#" class="ser-prev">&lt;&lt; 上一页</a> | <a href="#" class="ser-next">下一页 &gt;&gt;</a> 跳转<input type
="text" class="txt-go"><span class="btn-go">GO</span> 页码：<span class="page-info"></span>');
				  
				  $_obj.find('.load-place tbody').html(tr.join('')); 
				  $_obj.find('.page-info').text(page + '/' + total);
				  $_obj.find('.page-info').data('total', total);
				  if(total > page) {
					 $_obj.find('.ser-next').removeClass('dis').data('page', page + 1); 
				  } else {
					 $_obj.find('.ser-next').addClass('dis');
				  };
				  if(page > 1) {
					 $_obj.find('.ser-first').removeClass('dis'); 
					 $_obj.find('.ser-prev').removeClass('dis').data('page', page - 1);
				  } else {
					 $_obj.find('.ser-first').addClass('dis'); 
					 $_obj.find('.ser-prev').addClass('dis'); 
				  }
			  } else {
			  	  $_obj.find('.paging').html('&nbsp;');
			  }
		  }
	  });
	};
	
	function showDetail(type, id, action) {
		var $service_list, $service_con;
		if(type == 'getsystemnewsbyno' + SYSTEM.servicePro){
			$service_list = $('.news .service-list'); 
			$service_con = $('.news .service-con');
		}else if(type == 'getfeebackrecord' + SYSTEM.servicePro){
			$service_list = $('.problems .service-list'); 
			$service_con = $('.problems .service-con');
		}
		$service_list.hide();
		$service_con.show();
	  $.getJSON( URL+ "/asy/Services.ashx?callback=?", {coid : system.DBID, loginuserno: system.userName
, version: CUR_INFO.version, id: id, action: action, type: type},function(data){
		  if(type == 'getsystemnewsbyno' + SYSTEM.servicePro){
			var $news = $('.news-con'),
				$prev = $('.prev', $news),
				$next = $('.next', $news);
			$('.title', $news).text(data.title);
			$('.con', $news).html(data.htmlBody);
			if(data.preNo) {
				 $prev.removeClass('dis').data('action', 'addrecord' );
				 $prev.data('id', data.preNo);
			  } else {
				 $prev.addClass('dis').removeData('id');
				 $prev.removeData('action');
			  };
			  
			  if(data.nextNo) {
				 $next.removeClass('dis').data('action', 'addrecord');
				 $next.data('id', data.nextNo);
			  } else {
				 $next.addClass('dis').removeData('id');
				 $next.removeData('action');
			  };
		  }else if(type == 'getfeebackrecord' + SYSTEM.servicePro){
			if(!continueAsk) {
				continueAsk = UE.getEditor('continueAsk', { initialFrameWidth:'100%', initialContent:'' });
			}

		  	var $problems = $('.problems-con'),
				$prev = $('.prev', $problems),
				$next = $('.next', $problems),
				content = ['<ul>'];
		  	$.each(data.data, function(i, row){	
			  	  var temp = '';
			      if(i === 0) {
					  $('.title', $problems).text(row.title);
					  temp = '<li><h4><i></i>反馈内容：</h4><div class="ctn">' + row.body + '</div><p class="time">时间：' 
+ row.ansertime + '</p></li>';
					  if(row.preno) {
						 $prev.removeClass('dis').data('action', 'addrecord' );
				 		$prev.data('id', row.preno); 
					  } else {
						 $prev.addClass('dis').removeData('id');
				 		$prev.removeData('action');
					  };
					  
					  if(row.nextno) {
						 $next.removeClass('dis').data('action', 'addrecord');
				 		$next.data('id', row.nextno);
					  } else {
						 $next.addClass('dis').removeData('id');
				 		$next.removeData('action');
					  };
				  } else {
					  if(row.type === 'answer') {
					  	temp = '<li class="answer"><h4><i></i>客服答复：</h4><div class="ctn">' + row.body + '</div><p class
="time">时间：' + row.ansertime + '</p></li>';
					  } else {
					  	temp = '<li><h4><i></i>补充内容：</h4><div class="ctn">' + row.body + '</div><p class="time">时间：'
 + row.ansertime + '</p></li>';
					  }
				  }
				  content.push(temp);
			  }); 
			content.push('</ul>');
			$('.aq-list', $problems).html(content.join(''));
		  }
		  
	  });
    };

    function showServiceList(){
    	var $service_con;
    	if(CUR_INFO.cur_type == 'getsystemnews' + SYSTEM.servicePro){
    		$service_con = $('.news .service-con');
    		$service_con.hide();
			$service_con.find('.service-hd .title').text('');
    		$service_con.find('.con').html('');
			$('.news .service-list').show();
    	}else if(CUR_INFO.cur_type == 'getfeedback' + SYSTEM.servicePro){
    		$('.problems .service-con').hide();
    		$('.problems .service-list').show();
    	}
    }

	$("#Service").artTab({
		newsPage: false,
		problemsPage: false,
		addedPage: false,
		callback: function (curTab, curCon, opts) {
			if (curTab.html() === '系统消息') {
				CUR_INFO.cur_type = 'getsystemnews' + SYSTEM.servicePro;
				getList('getsystemnews' + SYSTEM.servicePro, curCon, CUR_INFO.news.cur_page);
				showServiceList();
				return;
			};
			
			if (curTab.html() === '我的提问') {
				CUR_INFO.cur_type = 'getfeedback' + SYSTEM.servicePro;
				getList('getfeedback' + SYSTEM.servicePro, curCon, CUR_INFO.problems.cur_page);
				showServiceList();
				return;
			};
			
			if (curTab.html() === '专家服务') {
				if(!opts.addedPage) {
					$('#IframeAdded').attr('src', 'added-service.html');
					opts.addedPage = true;
				}
				return;
			};
		}
	});
	$_tab.eq(CUR_TAB - 1).trigger('click');
	if(param.newsId){
		var $td = $('td[rel=news' + param.newsId + ']');
		showDetail('getsystemnewsbyno' + SYSTEM.servicePro, param.newsId, 'addrecord');		
		$td.length > 0 && $td.removeClass('unread');
	}

	$('#Service').on('click', '.ser-prev, .ser-next, .ser-first', function(){
		var $_obj = $(this).parent().parent();
		getList(CUR_INFO.cur_type, $_obj, $(this).data('page'));	
		$_obj.find('.txt-go').val('');
	});

	$('.txt-go').blur(function(){
		var total = $(this).siblings('.page-info').data('total');
		if(!total) return;
		if(this.value > total){
			this.value = total;
		}else if(this.value == 0){
			this.value = 1;
		}
	}).digital();
	
	$('.btn-go').click(function(){
		var $_obj = $(this).parent().parent();
		var pageIndex = $.trim($(this).siblings('.txt-go').val());
		getList(CUR_INFO.cur_type, $_obj, pageIndex);	
	});
	
	$('#Service').on('click', 'a[rel=news],a[rel=problems],.skip a', function(e){
		e.preventDefault();
		var $td,
			id = $(this).data('id');
		if(CUR_INFO.cur_type == 'getsystemnews' + SYSTEM.servicePro){
			showDetail('getsystemnewsbyno' + SYSTEM.servicePro, id, $(this).data('action'));
			$td = $('td[rel=news' + id + ']');
		}else if(CUR_INFO.cur_type == 'getfeedback' + SYSTEM.servicePro){
			showDetail('getfeebackrecord' + SYSTEM.servicePro, id, $(this).data('action'));
			CUR_INFO.problems.cur_id = id;
			$td = $('td[rel=problems' + id + ']');
		}
		if($td.hasClass('unread')) {
			$td.removeClass('unread');
			var $_notice = parent.$('#SysNews span');
			if(Number($_notice.text()) - 1 > 0) {
				$_notice.text(Number($_notice.text()) - 1);
			} else {
				$_notice.remove();
			}
			
		}
	});

	$('.service-con .back').click(function(e){
		e.preventDefault();
		showServiceList();
	});
	
	$('#continue-ask input').click(function(){
		var $this = $(this);
		if($this.data('sending')) return;
		var answerbody = continueAsk.getContent();
		var bodytext = answerbody;
		if(answerbody === ""){
		 parent.Public.tips({ type: 1, content: '请填写内容！'});
		 continueAsk.focus();
		 return;
		}
		$this.val('提交中...').data('sending', true);
		$.ajax({
			url: URL+ "asy/Services.ashx?callback=?",
			type: 'POST',
			data: {id:CUR_INFO.problems.cur_id, coid: system.DBID, loginuserno: system.userName, version: CUR_INFO
.version, type: 'addfeedbackrecord' + SYSTEM.servicePro, feedbackbody: answerbody, feedbackbodytext:
 bodytext},
			dataType:"jsonp",
			success: function(data){
				$this.val('继续提问').removeData('sending');
			  if(data.status === 200) {
				  var temp = '';
				  parent.Public.tips({content : '问题提交成功！'});
				  temp = '<li><h4><i></i>补充内容：</h4><div class="ctn">' + answerbody + '</div><p class="time">时间：'
 + data.answertime + '</p></li>';
				  $('.problems-con .con > ul').append(temp);
				  continueAsk.setContent('');
			  }
			}
		});
	});

	$("#submit").click(function(){
		if($(this).data('sending')) return;
		var $this = $(this),
			$title = $('#QTitle'),
			$contact = $('#QContact'),
			answertitle = $.trim($title.val()),
			answerbody = Q_CONTENT.getContent(),
			contactinfo = '';
		if(answertitle === ""){
			$title.focus();
			parent.Public.tips({type: 1, content: '请填写标题！'});
			return;
		}
		if(answerbody === ""){
			Q_CONTENT.focus();
			parent.Public.tips({type: 1, content: '请填写内容！'});
			return;
		}

		$this.val('提交中...').data('sending', true);
		$.ajax({
		  url: URL+ "asy/Services.ashx?callback=?",
		  type: 'POST',
		  data: {coid: system.DBID, loginuserno: system.userName, version: CUR_INFO.version, type: 'addfeedback'
 + SYSTEM.servicePro, answertitle: answertitle, answerbody: answerbody, bodytext: '', contactinfo: contactinfo
},
		  dataType:"jsonp",
		  success: function(data){
		  	$this.val('提 交').removeData('sending');
		  	if(data.msg == 'success'){
		  		parent.Public.tips({content : '问题提交成功！'});
		  		$title.val('');
		  		Q_CONTENT.setContent('');
		  		$contact.val('');
		  	}
		  }
		});
	});

	$('#TabProblems').click(function(){
		$_tab.filter("[data-tab='problems']").trigger('click');
	});
})
</script>
<!-- 营销QQ -->
<!--<script type="text/javascript" charset="utf-8" src="http://wpa.b.qq.com/cgi/wpa.php"></script>-->
<script type="text/javascript">
var QQnum = $('#wpa_shouhou').html();;
BizQQWPA.addCustom([{
	  nameAccount: QQnum,
	  aty: '1',
	  a:'1001',
	  selector: "wpa_shouhou"
}]);
</script>
<!-- 营销QQ end -->
</body>
</html>