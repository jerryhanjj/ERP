<?php if (!defined('BASEPATH')) exit('No direct script access allowed');?>
  		<table width="1440px" class="list">
  			<tr><td class='H' align="center" colspan="9"><h3>现金银行报表<h3></td></tr>
  			<tr><td colspan="9">日期：<?php echo $beginDate?>至<?php echo $endDate?></td></tr>
  		</table>
  		<table width="1440px" class="list"  border="1">
  			<thead>
  				<tr>
  				<th>账户编号</th>
  				<th>账户名称</th>
  				<th>日期</th>
  				<th>单据编号</th>
  				<th>业务类型</th>
  				<th>收入</th>
  				<th>支出</th>
  				<th>账户余额</th>
  				<th>往来单位</th>
  				</tr>
  			</thead>
  			<tbody>
			    <?php 
				 $sum0 = $sum1 = $sum2 = $sum3 = $sum4 = 0;
				 foreach($list1 as $arr=>$row){
				 ?>
  				<tr class="link" data-id="0" data-type="">
  			       <td><?php echo $row['accountNumber']?></td>
  			       <td><?php echo $row['accountName']?></td>
  			       <td></td>
  			       <td></td>
  			       <td>期初余额</td>
  			       <td class="R"></td>
  			       <td class="R"></td>
  			       <td class="R"><?php echo $row['amount']?></td>
  			       <td></td>
  				</tr>
				<?php 
				 foreach($list2 as $arr1=>$row1){
				 if ($row1['accId']==$row['id']) {
				     $sum1 += $a1 = $row1['payment']>0 ? abs($row1['payment']) : 0;
					 $sum2 += $a2 = $row1['payment']<0 ? abs($row1['payment']) : 0;
					 $a3 = $row['amount']+$sum1-$sum2;
				 ?>
				<tr class="link" data-id="<?php echo $row1['iid']?>" data-type="<?php echo $row1['billType']?>"> 
  			       <td><?php echo $row1['accountNumber']?></td>
  			       <td><?php echo $row1['accountName']?></td>
  			       <td><?php echo $row1['billDate']?></td>
  			       <td><?php echo $row1['billNo']?></td>
  			       <td><?php echo $row1['transTypeName']?></td>
  			       <td class="R"><?php echo str_money($a1,2)?></td>
  			       <td class="R"><?php echo str_money($a2,2)?></td>
  			       <td class="R"><?php echo str_money($a3,2)?></td>
  			       <td><?php echo $row1['contactName']?></td>
  				</tr>
				<?php  }}
				$sum = $row['amount'] + $sum1 - $sum2;
				?>
				<tr class="link" data-id="0" data-type="">
  			       <td> </td>
  			       <td></td>
  			       <td></td>
  			       <td></td>
  			       <td>小计</td>
  			       <td class="R"><?php echo str_money($sum1,2)?></td>
  			       <td class="R"><?php echo str_money($sum2,2)?></td>
  			       <td class="R"><?php echo str_money($sum,2)?></td>
  			       <td></td>
  				</tr>
				<?php 
				    $sum3 += $sum1;
					$sum4 += $sum2;
					$sum0 += $sum; 
					$sum1 = $sum2 = 0;  //初始化
				 }
				 ?>
  				<tr>
  				<td colspan="5" class="R B">合计：</td>
  				<td class="R B"><?php echo str_money($sum3,2)?></td>
  				<td class="R B"><?php echo str_money($sum4,2)?></td>
  				<td class="R B"><?php echo str_money($sum0,2)?></td>
  				<td class="R B"></td>
  				</tr>
  			</tbody>
  		</table>




 