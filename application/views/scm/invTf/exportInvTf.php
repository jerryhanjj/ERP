<?php if (!defined('BASEPATH')) exit('No direct script access allowed');?>
<table width="1500px" class="list">
  			<tr><td class='H' align="center" colspan="10"><h3>调拨记录</h3></td></tr>
  		</table>
		<table width="1500px" class="list"  border="1">
			<thead>
				<tr>
				    <th width="80" align="center">单据日期</th>
				    <th width="150" align="center">单据编号</th>
				    <th width="60" align="center">制单人</th>
					<th width="100" align="center">单据备注</th>
					<th width="150" align="center">商品</th>
					<th width="60" align="center">单位</th>
					<th width="60" align="center">数量</th>	
					<th width="80" align="center">调出仓库</th>	
					<th width="80" align="center">调入仓库</th>
					<th width="100" align="center">备注</th>	
				</tr>
			</thead>
			<tbody>
			    <?php 
				  $i = 1;
				  $n = 1;
				  $qty = 0;
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
					<td rowspan="<?php echo $n?>" ><?php echo $row['userName']?></td>
					<td rowspan="<?php echo $n?>" ><?php echo $row['description']?></td>
				<?php 
				$i = 1;
				foreach($list2 as $arr1=>$row1) {
				    if ($row1['iid']==$row['id']) {
					   $qty += $row1['qty'];
					   if ($i==1) {
				?>
				    
					<td ><?php echo $row1['invNumber'].' '.$row1['invName'].' '.$row1['invSpec']?></td>
					<td ><?php echo $row1['mainUnit']?></td>
					<td ><?php echo $row1['qty']?></td>
					<td ><?php echo $row1['outLocationName']?></td>
					<td ><?php echo $row1['inLocationName']?></td>
					<td ><?php echo $row1['description']?></td>
				</tr>
				<?php } else {?>
				<tr target="id">
					<td ><?php echo $row1['invNumber'].' '.$row1['invName'].' '.$row1['invSpec']?></td>
					<td ><?php echo $row1['mainUnit']?></td>
					<td ><?php echo $row1['qty']?></td>
					<td ><?php echo $row1['outLocationName']?></td>
					<td ><?php echo $row1['inLocationName']?></td>
					<td ><?php echo $row1['description']?></td>
				</tr>
				</tr>
				<?php }$i++;}}?>
				<tr target="id">
					<td >合计</td>
					<td ></td>
					<td ><?php echo $qty?></td>
					<td ></td>
					<td ></td>
					<td ></td>
				</tr>
				<?php $qty = 0; $n = 1;}?>
				
				
					
					
					
				 
				 
				
 </tbody>
</table>	


 