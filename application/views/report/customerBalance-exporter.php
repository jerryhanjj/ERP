<?php 
if (!defined('BASEPATH')) exit('No direct script access allowed');
$sum1 = $sum2 = $sum3 = $sum4 = $sum5 = $sum6 = 0; 
$arrears = count($list1)>0 ? $list1['amount'] : 0;
?>
<table width="1440px" class="list">
  			<tr><td class='H' colspan="<?php echo $showDetail == "true" ? 14 : 8?>" align="center"><h3>客户对账单<h3></td></tr>
  			<tr><td colspan="<?php echo $showDetail == "true" ? 14 : 8?>"><?php echo $customerName?></td></tr>
  			<tr><td colspan="<?php echo $showDetail == "true" ? 14 : 8?>">日期：<?php echo $beginDate;?>至<?php echo $endDate;?></td></tr>
  		</table>
  		<table width="1440px" class="list" border="1">
  			<thead>
  				<tr>
  				<th>单据日期</th>
  				<th>单据编号</th>
  				<th>业务类别</th>
				
		        <?php if ($showDetail == "true") {?>
  				<th>商品编号</th>
  				<th>商品名称</th>
				<th>规格型号</th>
				<th>单位</th>
				<th>数量</th>
				<th>单价</th>
				<?php  }?>
  				<th>销售金额</th>
  				<th>整单折扣额</th>
  				<th>应收金额</th>
  				<th>实际收款金额</th>
  				<th>应收款余额</th>
  				</tr>
  			</thead>
  			<tbody>
  				<tr class="link" data-id="0" data-type="BAL">
  				   <td></td>
  				   <td>期初余额</td>
  				   <td></td>
				   <?php if ($showDetail == "true") {?>
  			       <td class="R"></td>
  			       <td class="R"></td>
  			       <td class="R"></td>
  			       <td class="R"></td>
				   <td class="R"></td>
  			       <td class="R"></td>
				   <?php  }?>
  			       <td class="R"></td>
  			       <td class="R"></td>
				   <td class="R"></td>
  			       <td class="R"></td>
  			       <td class="R"><?php echo str_money($arrears,2)?></td>
  				</tr>

  			    <?php 
				 foreach($list2 as $arr=>$row){
				     $sum1 += $row['arrears']; 
					 $sum2 += $row['amount'];               //应收金额
					 $sum3 += $row['totalAmount'];          //销售金额
					 $sum4 += $row['rpAmount'];             //实际收款金额
					 $sum5 += $row['disAmount'];            //折扣率
				 ?>
  				<tr class="link" data-id="<?php echo $row['id']?>" data-type="<?php echo $row['billType']?>">
  				   <td><?php echo $row['billDate']?></td>
  				   <td><?php echo $row['billNo']?></td>
  				   <td><?php echo $row['transTypeName']?></td>
				   <?php if ($showDetail == "true") {?>
				   <td class="R"></td>
				   <td class="R"></td>
				   <td class="R"></td>
				   <td class="R"></td>
				   <td class="R"></td>
				   <td class="R"></td>
				   <?php  }?>
  			       <td class="R"><?php echo str_money($row['totalAmount'],2)?></td>
  			       <td class="R"><?php echo str_money($row['disAmount'],2)?></td>
  			       <td class="R"><?php echo str_money($row['amount'],2)?></td>
  			       <td class="R"><?php echo str_money($row['rpAmount'],2)?></td>
  			       <td class="R"><?php echo str_money($arrears + $sum1,2)?></td>
  				</tr>
				
				<?php 
				if ($showDetail == "true") {
					foreach ($list3 as $arr1=>$row1) {
						if ($row['id']==$row1['iid']) { 
				?>
				<tr>
  				   <td></td>
  				   <td></td>
  				   <td></td>
				   
				   <td class="R"><?php echo $row1['invNumber']?></td>
				   <td class="R"><?php echo $row1['invName']?></td>
				   <td class="R"><?php echo $row1['invSpec']?></td>
				   <td class="R"><?php echo $row1['mainUnit']?></td>
				   <td class="R"><?php echo str_money(abs($row1['qty']),$this->systems['qtyPlaces'])?></td>
				   <td class="R"><?php echo str_money($row1['price'],$this->systems['qtyPlaces'])?></td>
				  
  			       <td class="R"></td>
  			       <td class="R"></td>
  			       <td class="R"></td>
  			       <td class="R"></td>
  			       <td class="R"><?php echo str_money($arrears + $sum1,2)?></td>
  				</tr>
				
				<?php  }}}?>
				<?php  }?>
				
				 
  				<tr>
  				<td colspan="3" class="R B">合计：</td>
				<?php if ($showDetail == "true") {?>
				<td class="R"></td>
				<td class="R"></td>
				<td class="R"></td>
				<td class="R"></td>
				<td class="R"></td>
				<td class="R"></td>
				<?php  }?>   
  				<td class="R B"><?php echo str_money($sum3,2)?></td>
  				<td class="R B"><?php echo str_money($sum5,2)?></td>
  				<td class="R B"><?php echo str_money($sum2,2)?></td>
  				<td class="R B"><?php echo str_money($sum4,2)?></td>
  				<td class="R B"><?php echo str_money($arrears + $sum1,2)?></td>
  				</tr> 
  			</tbody>
  		</table>