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
.ul-inline li .trigger{padding:0;}
.mod-report .search-wrap .s-inner {padding-bottom:15px;}
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
</script>
</head>
<body>
<div class="mod-report">
  <div class="search-wrap" id="report-search">
    <div class="s-inner cf">
      <div class="fl"> 
      	 <ul class="ul-inline">
      	 	<li><strong class="tit mrb fl dn">查询条件</strong></li>
      	 	<li>
                <label>购货单位:</label>
		        <span class="ui-combo-wrap" id="customer">
		        <input type="text" name="" class="input-txt" autocomplete="off" value="" data-ref="date">

		        <i class="ui-icon-ellipsis"></i></span></dd>
            </li>
            <li>
                <label class="tit">日期:</label>
                <input type="text" value="" class="ui-input ui-datepicker-input" name="filter-fromDate"
 id="filter-fromDate" />
                <span>至</span>
                <input type="text" value="" class="ui-input ui-datepicker-input" name="filter-toDate"
 id="filter-toDate" />
            </li>
            <li id="match">
          		<label class="chk" style="margin-top:6px; " title="是否显示商品明细"><input type="checkbox" name
="match">是否显示商品明细</label>
        	</li>
            <li>
            	<a id="refresh" class="ui-btn ui-btn fl mrb">查询</a> <span class="txt fl" id="cur-search-tip"
></span> 
            </li>
        </ul>
      </div>
      <div class="fr"><a href="#" class="ui-btn ui-btn-sp mrb fl" id="btn-print">打印</a><a href="#" class
="ui-btn fl" id="btn-export">导出</a></div>
    </div>
  </div>

<?php if ($supplierId<1) {?>
  <div class="grid-wrap">
  	<div class="grid">
  		<table width=100% class="caption">
  			<tr><td class='H'>供应商对账单</td></tr>
  			<tr><td id='customerText'>供应商：</td></tr>
  			<tr><td>日期：<?php echo $beginDate;?>至<?php echo $endDate;?></td></tr>
  		</table>
  		<table width="1440px" class="list">
  			<thead>
  				<tr>
  				<td>单据日期</td>
  				<td>单据编号</td>
  				<td>业务类别</td>
  				
  				<td>采购金额</td>
  				<td>整单折扣额</td>
  				<td>应付金额</td>
  				<td>实际付款金额</td>
  				<td>应付款余额</td>
  				</tr>
  			</thead>
  			<tbody>
  				<tr>
  				<td colspan="3" class="R B">合计：</td>
  				<td class="R B">0.00</td>
  				<td class="R B">0.00</td>
  				<td class="R B">0.00</td>
  				<td class="R B">0.00</td>
  				<td class="R B">0.00</td>
  				</tr> 
  			</tbody>
  		</table>
  	</div>
  </div>
<?php }?>
  
<?php if ($supplierId>0) {?>
  <div class="grid-wrap">
  	<div class="grid">
  		<table width=100% class="caption">
  			<tr><td class='H'>供应商对账单</td></tr>
  			<tr><td id='customerText'>供应商：</td></tr>
  			<tr><td>日期：<?php echo $beginDate;?>至<?php echo $endDate;?></td></tr>
  		</table>
  		<table width="1440px" class="list">
  			<thead>
  				<tr>
  				<td>单据日期</td>
  				<td>单据编号</td>
  				<td>业务类别</td>
  				
  				<td>采购金额</td>
  				<td>整单折扣额</td>
  				<td>应付金额</td>
  				<td>实际付款金额</td>
  				<td>应付款余额</td>
  				</tr>
  			</thead>
  			<tbody>
  			    
  				<tr class="link" data-id="0" data-type="BAL">
  				   <td></td>
  				   <td>期初余额</td>
  				   <td></td>
  				   
  			       <td class="R"></td>
  			       <td class="R"></td>
  			       <td class="R"></td>
  			       <td class="R"></td>
  			       <td class="R"><?php echo count($list1)>0 ? $list1['arrears'] : ''?></td>
  				</tr>
  			    <?php 
				 $sum1 = $sum2 = $sum3 = $sum4 = $sum5 = 0; 
				 $sum0 = count($list1)>0 ? $list1['arrears'] : 0;
				 foreach($list2 as $arr=>$row){
				     $sum1 += $row['totalAmount'];
					 $sum2 += $row['disAmount'];
					 $sum3 += $row['amount'];
					 $sum4 += $row['rpAmount'];
					 $sum5 += $row['arrears'];
				 ?>
  				<tr class="link" data-id="<?php echo $row['id']?>" data-type="<?php echo $row['billType']?>">
  				   <td><?php echo $row['billDate']?></td>
  				   <td><?php echo $row['billNo']?></td>
  				   <td><?php echo $row['transTypeName']?></td>
  			       <td class="R"><?php echo $row['totalAmount']?></td>
  			       <td class="R"><?php echo $row['disAmount']?></td>
  			       <td class="R"><?php echo $row['amount']?></td>
  			       <td class="R"><?php echo $row['rpAmount']?></td>
  			       <td class="R"><?php echo $row['arrears']?></td>
  				</tr>
				<?php  }?>
  			 
  				<tr>
  			    <td colspan="3" class="R B">合计：</td>
  				<td class="R B"><?php echo $sum1?></td>
  				<td class="R B"><?php echo $sum2?></td>
  				<td class="R B"><?php echo $sum3?></td>
  				<td class="R B"><?php echo $sum4?></td>
  				<td class="R B"><?php echo $sum0 + $sum5?></td>
  				</tr> 
  			</tbody>
  		</table>
  	</div>
  </div> 
<?php }?>
  
  
</div>
<script src="<?php echo base_url()?>statics/js/dist/suppliersReconciliation.js?ver=20140430"></script>
</body>
</html>



