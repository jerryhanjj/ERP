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

<link rel="stylesheet" href="<?php echo base_url()?>statics/css/report.css" />
<style>
.filter-list li.chk-list{height: 20px;}
.mod-report{position: relative;*zoom: 1;padding:66px 0 0 18px;}
.mod-report .search-wrap{position: fixed;left: 0;top: 0;width: 100%;_position:absolute;_left:expression
(eval(document.documentElement.scrollLeft));_top:expression(eval(document.documentElement.scrollTop)
);background: #f5f5f5;}
.mod-report .search-wrap .s-inner{padding: 18px;}
.mod-report .search-wrap strong.tit{font-size:14px;line-height: 30px;}
.mod-report .search-wrap .txt{display: inline-block;*display: inline;*zoom: 1;font-size: 14px;line-height
: 30px;}

.mod-report .grid-wrap:after{content: '.';display: block;clear: both;visibility: hidden;overflow: hidden
;height: 0;}
.mod-report .grid-wrap{*zoom: 1;}
.mod-report .grid-wrap .grid{float: left;padding: 18px;border:1px solid #cfcfcf;background: #fff;box-shadow
:0 1px 3px rgba(0,0,0,0.2);}
.mod-report .grid-wrap .H{font-size:24px;font-weight:bold;text-align: center;}
.mod-report .grid-wrap .R{text-align: right;}
.mod-report .grid-wrap .B{font-weight: bold;}
.mod-report .grid-wrap table{border-collapse:collapse;}
.mod-report .grid-wrap table.caption{margin-bottom: 5px;}
.mod-report .grid-wrap table.list{border:1px solid #666;}
.mod-report .grid-wrap table.list td{padding: 5px 5px;border:1px solid #666;}
.mod-report .grid-wrap table.list thead td{text-align: center;font-weight: bold;}
.link{ cursor:pointer; }
.tr-hover{ background:#f8ff94;}

#filter-menu .mod-choose-input{position: relative;*zoom: 1;}
#filter-menu .mod-choose-input .ui-input{padding-right: 25px;width:226px; font-family:"宋体";}
#filter-menu .ui-datepicker-input{width:105px; font-family:"宋体";}
.ui-icon-ellipsis{ right:3px; }

thead{word-break: keep-all;white-space:nowrap;}

@media print{
body{background: #fff;}
.mod-report{padding: 0;}
.mod-report .search-wrap{display: none;}
.mod-report .grid-wrap .grid{float: none;padding: 0;border:none;background: none;box-shadow:none;}
.mod-report .grid-wrap table.caption{margin-bottom: 0;}
.mod-report .grid-wrap table.list{width:100% !important;}
.mod-report .grid-wrap table.list td{padding: 1px;}
}
</style>
<script>
var defParams = {
	beginDate: '2015-04-01',
	endDate: '2015-04-16'
};
/*$(function(){
	$('.list').width($(window).width() - 74);
});
$(window).resize(function(){
	$('.list').width($(window).width() - 74);
});*/
</script>
</head>
<body>
<div class="mod-report">
  <div class="search-wrap" id="report-search">
    <div class="s-inner cf">
      <div class="fl"> <strong class="tit mrb fl">查询条件</strong>
        <div class="ui-btn-menu fl" id="filter-menu"> <span class="ui-btn menu-btn"> <strong id="selected-period"
>请选择查询条件</strong><b></b> </span>
          <div class="con">
            <ul class="filter-list">
              <li>
                <label class="tit">日期:</label>
                <input type="text" value="" class="ui-input ui-datepicker-input" name="filter-fromDate"
 id="filter-fromDate" />
                <span>至</span>
                <input type="text" value="" class="ui-input ui-datepicker-input" name="filter-toDate"
 id="filter-toDate" />
              </li>
            </ul>
            <ul class="filter-list" id="more-conditions">
              <li>
                <label class="tit">客户:</label>
                <span class="mod-choose-input" id="filter-customer"><input type="text" class="ui-input"
 id="customerAuto"/><span class="ui-icon-ellipsis"></span></span>
              </li>
            </ul>
            <div class="btns"> <a href="#" id="conditions-trigger" class="conditions-trigger" tabindex
="-1">更多条件<b></b></a> <a class="ui-btn ui-btn-sp" id="filter-submit" href="#">确定</a> <a class="ui-btn"
 id="filter-reset" href="#" tabindex="-1">重置</a> </div>
          </div>
        </div>
        <a id="refresh" class="ui-btn ui-btn-refresh fl mrb"><b></b></a> <span class="txt fl" id="cur-search-tip"
></span> </div>
      <div class="fr"><a href="#" class="ui-btn ui-btn-sp mrb fl" id="btn-print">打印</a><a href="#" class
="ui-btn fl" id="btn-export">导出</a></div>
    </div>
  </div>
 
  <div class="grid-wrap">
  	<div class="grid">
  		<table width=100% class="caption">
  			<tr><td class='H'>应收账款明细表</td></tr>
  			<tr><td>日期：<?php echo $beginDate?>至<?php echo $endDate?></td></tr>
  		</table>
  		<table width="1440px" class="list">
  			<thead>
  				<tr>
  				<td>客户</td>
  				<td>单据日期</td>
  				<td>单据编号</td>
  				<td>业务类型</td>
  				<td>增加应收款</td>
  				
  				
  				<td>支付应收款</td>
  				
  				<td>应收款余额</td>
  				</tr>
  			</thead>
  			<tbody>
  			  
  				<?php 
				 $sum0 = 0;
				 $sum1 = 0;
				 $sum2 = 0;
				 $sum3 = 0;
				 $sum4 = 0;
				 foreach($list1 as $arr=>$row){
				 ?>
  				<tr class="link" data-id="0" data-type="">
  			       <td><?php echo $row['contact']?></td>
  			       <td></td>
  			       <td>期初余额</td>
  			       <td></td>
  			       <td class="R"></td>
  			       <td class="R"></td>
  			       <td class="R"><?php echo $row['amount']?></td>
  				</tr>
  			    <?php 
				 foreach($list2 as $arr1=>$row1){
				 if ($row1['buId']==$row['id']) {
				     $sum1 += $a1 = $row1['billType']=='SALE'?($row1['payment']>0?abs($row1['payment']):-abs($row1['payment'])):0;
					 $sum2 += $a2 = $row1['billType']=='RECEIPT'?abs($row1['payment']):0;
				      
				 ?>
  				<tr class="link" data-id="<?php echo $row1['iid']?>" data-type="<?php echo $row1['billType']?>">
  			       <td><?php echo $row1['contactNo'].' '.$row1['contactName']?></td>
  			       <td><?php echo $row1['billDate']?></td>
  			       <td><?php echo $row1['billNo']?></td>
  			       <td><?php echo $row1['transTypeName']?></td>
  			       <td class="R"><?php echo $a1?></td>
  			       <td class="R"><?php echo $a2?></td>
  			       <td class="R"><?php echo $row['amount']+$sum1-$sum2?></td>
  				</tr>
				<?php  }}
				$sum = $row['amount']+$sum1-$sum2;
				?>
				<tr class="link" data-id="0" data-type="">
  			       <td></td>
  			       <td></td>
  			       <td>小计</td>
  			       <td></td>
  			       <td class="R"><?php echo $sum1?></td>
  			       <td class="R"><?php echo $sum2?></td>
  			       <td class="R"><?php echo $sum?></td>
  				</tr>
  			    <?php 
				    $sum3 += $sum1;
					$sum4 += $sum2;
					$sum0 += $sum; 
				 }
				 ?>

  				<tr>
  				<td colspan="4" class="R B">合计：</td>
  				<td class="R B"><?php echo $sum3?></td>
  				<td class="R B"><?php echo $sum4?></td>
  				<td class="R B"><?php echo $sum0?></td>
  				</tr>
  			</tbody>
  		</table>
  	</div>
  </div>

  
  
</div>
<script src="<?php echo base_url()?>statics/js/dist/accountProceedsDetail.js?ver=20140430"></script>
</body>
</html>




