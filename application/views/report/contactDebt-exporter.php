<?php if (!defined('BASEPATH')) exit('No direct script access allowed');?>
<table width="1440px" class="list">
  			<tr><td class='H' align="center" colspan="6"><h3>往来单位欠款表<h3></td></tr>
  			 
  		</table>
  		<table width="1000px" class="list" border="1">
		         
  				<tr>
	  				<th width="80">行号</th>
	  				<th width="120">往来单位编号</th>
	  				<th width="250">往来单位名称</th>
	  				<th width="120">往来单位性质</th>
	  				<th width="100">应收款余额</th>
	  				<th width="100">应付款余额</th>
  				</tr>

  			    <?php 
				 $i = 1;
				 $sum1 = $sum2 = 0;
				 foreach($list as $arr=>$row){
				      $sum1  += $amount1 = $row['type']==-10 ? $row['amount'] : 0; 
					  $sum2  += $amount2 = $row['type']==10 ? $row['amount'] : 0; 
				 ?>
  				<tr>
  			       <td><?php echo $i?></td>
  			       <td><?php echo $row['number']?></td>
  			       <td><?php echo $row['name']?></td>
  			       <td><?php echo $row['type']==10 ? '供应商' : '客户'?></td>
  			       <td class="R"><?php echo str_money($amount1,2)?></td>
  			       <td class="R"><?php echo str_money($amount2,2)?></td>
  				</tr>
  			    <?php 
				 $i++;
				 }
				 ?>
  				<tr>
  				<td colspan="4" class="R B">合计：</td>
  				<td class="R B"><?php echo str_money($sum1,2)?></td>
  				<td class="R B"><?php echo str_money($sum2,2)?></td>
  				</tr>
  		</table>	
