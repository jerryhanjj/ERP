<?php if (!defined('BASEPATH')) exit('No direct script access allowed');?>
<table width="1500px" class="list">
  			<tr><td class='H' align="center" colspan="10"><h3>付款单记录</h3></td></tr>
  		</table>
		<table class="table" width="1500"  border="1">
			<thead>
				<tr>
				    <th width="100" align="center">单据日期</th>
				    <th width="150" align="center">单据编号</th>
				    <th width="120" align="center">购货单位</th>
					<th width="60" align="center">付款金额</th>
					<th width="100" align="center">备注</th>
					
					<th width="200" align="center">结算账户</th>
					<th width="60" align="center">付款金额</th>
					<th width="80" align="center">结算方式</th>	
					<th width="60" align="center">结算号</th>	
					<th width="100" align="center">备注</th>	
				</tr>
			</thead>
			<tbody>
			    <?php 
				  $i = 1;
				  $n = 1;
				  $amount = 0;
				  foreach($list1 as $arr=>$row) {
				      foreach($list2 as $arr1=>$row1) {
						  if ($row1['iid']==$row['id']) {
						      $n++;   
						  }
					  }
				?>
				<tr target="id">
				    <td rowspan="<?php echo $n?>" ><?php echo $row['billDate']?></td>
					<td rowspan="<?php echo $n?>" ><?php echo $row['billNo']?></td>
					<td rowspan="<?php echo $n?>" ><?php echo $row['contactNo'].' '.$row['contactName'];?></td>
					<td rowspan="<?php echo $n?>" ><?php echo $row['amount']?></td>
					<td rowspan="<?php echo $n?>" ><?php echo $row['description']?></td>
				<?php 
				$i = 1;
				foreach($list2 as $arr1=>$row1) {
				    if ($row1['iid']==$row['id']) {
					   $amount += $payment = $row1['payment']>0 ? -abs($row1['payment']) : abs($row1['payment']);
					   if ($i==1) {
				?>
				    
					<td ><?php echo $row1['accountName']?></td>
					<td ><?php echo $payment?></td>
					<td ><?php echo $row1['categoryName']?></td>
					<td ><?php echo $row1['settlement']?></td>
					<td ><?php echo $row1['remark']?></td>
				</tr>
				<?php } else {?>
				<tr target="id">
					<td ><?php echo $row1['accountName']?></td>
					<td ><?php echo $payment?></td>
					<td ><?php echo $row1['categoryName']?></td>
					<td ><?php echo $row1['settlement']?></td>
					<td ><?php echo $row1['remark']?></td>
				</tr>
				<?php }$i++;}}?>
				<tr target="id">
					<td >合计</td>
					<td ><?php echo $amount?></td>
					<td ></td>
					
					<td ></td>
					<td ></td>
	
				</tr>
				 
				<?php $qty = $amount = 0;$n = 1;}?>
				

				
				 
				
 </tbody>
</table>	


 