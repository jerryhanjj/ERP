<?php if (!defined('BASEPATH')) exit('No direct script access allowed');?>
<table width="1440px" class="list">
  			<tr><td class='H' align="center" colspan="8"><h3>其他收入支出明细表<h3></td></tr>
  			<tr><td colspan="8">日期：<?php echo $beginDate;?>至<?php echo $endDate;?></td></tr>
  		</table>
  		<table width="1440px" class="list" border="1">
  			<thead>
  				<tr>
  				<th>日期</th>
  				<th>单据编号</th>
  				<th>收支类别</th>
  				
  				<th>收支项目</th>
  				<th>收入</th>
  				<th>支出</th>
  				<th>往来单位</th>
  				<th>摘要</th>
  				</tr>
  			</thead>
  			<tbody>
  			    <?php foreach($data['rows'] as $arr=>$row){  ?>
  				<tr>
  				   <td><?php echo $row['date']?></td>
  				   <td><?php echo $row['billNo']?></td>
  				   <td><?php echo $row['transTypeName']?></td>
  			       <td class="R"><?php echo $row['typeName']?></td>
  			       <td class="R"><?php echo isset($row['amountIn'])? str_money($row['amountIn'],2) :''?></td>
  			       <td class="R"><?php echo isset($row['amountOut'])? str_money($row['amountOut'],2) :''?></td>
  			       <td class="R"><?php echo $row['contactName']?></td>
  			       <td class="R"><?php echo $row['desc']?></td>
  				</tr>
				<?php  }?>
  				<tr>
  				<td colspan="4" class="R B">合计：</td>
  				<td class="R B"><?php echo str_money($data['userdata']['amountIn'],2)?></td>
  				<td class="R B"><?php echo str_money($data['userdata']['amountOut'],2)?></td>
  				<td class="R B"></td>
  				<td class="R B"></td>
  				</tr> 
  			</tbody>
  		</table>