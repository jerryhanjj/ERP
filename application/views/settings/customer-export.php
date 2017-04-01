<?php if (!defined('BASEPATH')) exit('No direct script access allowed');?>
		<table class="table" width="1500"  border="1">
			<thead>
				<tr>
				    <th width="120" align="center"><span style="color:#FF0000">客户编号</span></th>
					<th width="150" ><span style="color:#FF0000">客户名称</span></th>
					<th width="100" align="center">客户类别</th>
					<th width="100" align="center">客户等级</th>
					<th width="100" align="center">余额日期</th>
					<th width="100" align="center">期初应收款</th>	
					<th width="100" align="center">期初预收款</th>	
					<th width="120" align="center">备注</th>
					<th width="120" align="center">联系人</th>	
					<th width="100" align="center">手机</th>	
					<th width="100" align="center">座机</th>	
					<th width="100" align="center">QQ/MSN</th>	
					<th width="100" align="center">送货地址</th>
					<th width="100" align="center">首要联系人</th>	
				</tr>
			</thead>
			<tbody>
			    <?php 
			    $i = 1;
			    foreach($list as $arr=>$row) { 
			    ?>
				<tr target="id">
					<td ><?php echo $row['number']?></td>
					<td ><?php echo $row['name']?></td>
					<td ><?php echo $row['cCategoryName']?></td>
					<td ><?php echo $row['cLevelName']?></td>
					<td ><?php echo $row['beginDate']?></td>
					<td ><?php echo $row['amount']?></td>
					<td ><?php echo $row['periodMoney']?></td>
					<td ><?php echo $row['remark']?></td>
					<?php 
					if (strlen($row['linkMans'])>0) {                               //获取首个联系人
					  $array = (array)json_decode($row['linkMans'],true);
					  foreach ($array as $arr1=>$row1) {
						  if ($row1['linkFirst']==1) {
					?>
					<td ><?php echo @$row1['linkName']?></td>
					<td ><?php echo @$row1['linkMobile']?></td>
					<td ><?php echo @$row1['linkPhone']?></td>
					<td ><?php echo @$row1['linkIm']?></td>
					<td ><?php echo @$row1['address']?></td>
					<td ><?php echo @$row1['linkFirst']==1 ? '是' : '否'?></td>
					<?php }}?>
					<?php } else {?>
					<td ></td>
					<td ></td>
					<td ></td>
					<td ></td>
					<td ></td>
					<td ></td>
					<?php }?>
				</tr>
				<?php $i++;}?>
 
 </tbody>
</table>	
