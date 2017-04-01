<?php if (!defined('BASEPATH')) exit('No direct script access allowed');?>
  		<table  width="1200px" class="list">
  			<tr><td class='H' align="center" colspan="9"><h3>采购汇总表（按供应商）<h3></td></tr>
  			<tr><td colspan="9">日期：<?php echo $beginDate?>至<?php echo $endDate?></td></tr>
  		</table>
  		<table width="1200px" class="list" border="1">
  			<thead>
  				<tr>
  					<th width="150">供应商</th>
	  				<th>商品编号</th>
	  				<th width="150">商品名称</th>
	  				<th>规格型号</th>
	  				<th>单位</th>
	  				<th>仓库</th>
	  				<th>数量</th>
	  				<th>单价</th>
	  				<th>采购金额</th>
	  				
  				</tr>
  			</thead>
  			<tbody>
  			     <?php 
				 $sum1 = $sum2 = $sum3 = 0;
				 foreach($list as $arr=>$row){
				 ?>
  			       <tr>
  			       <td><?php echo $row['contactNo'];?> <?php echo $row['contactName'];?></td>
  			       <td><?php echo $row['invNumber']?></td>
				   <td><?php echo $row['invName']?></td>
  			       <td><?php echo $row['invSpec']?></td>
  			       <td><?php echo $row['mainUnit']?></td>
  			       <td><?php echo $row['locationName']?></td>
  			       <td class="R"><?php echo str_money($row['qty'],$this->systems['qtyPlaces'])?></td>
  			       <td class="R"><?php echo str_money($row['price'],$this->systems['qtyPlaces'])?></td>
  			       <td class="R"><?php echo str_money($row['amount'],2)?></td>
  			       </tr>
				 <?php 
				 $sum1 += $row['qty'];  
				 $sum2 += $row['price'];
				 $sum3 += $row['amount']; 
				 }
				 ?>
  				<tr>
  				<td colspan="6" class="R B">合计：</td>
				<td class="R B"><?php echo str_money($sum1,$this->systems['qtyPlaces'])?></td>
  				<td class="R B"><?php echo $sum1>0 ? str_money($sum3/$sum1,$this->systems['qtyPlaces']) : 0?></td>
  				<td class="R B"><?php echo str_money($sum3,2)?></td>
  				</tr>
  			</tbody>
  		</table>
		