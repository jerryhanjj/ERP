<?php if (!defined('BASEPATH')) exit('No direct script access allowed');?>
		<table class="table" width="1500"  border="1">
			<thead>
			    <tr>
				    <th colspan="20" align="center"><h3>商品明细表</h3></th>
				</tr>
				
				<tr>
				    <th width="80" >商品编号</th>
					<th width="100" >商品名称</th>
					<th width="100" >商品条码</th>
					<th width="80" >商品规格</th>
					<th width="80" >商品类别</th>
		
					<th width="80" >首选仓库</th>
					<th width="80" >当前库存</th>
					
					<th width="80" >最低库存</th>
					<th width="80" >最高库存</th>
					<th width="80" >计量单位</th>
					<th width="100" >预计采购价</th>
					<th width="60" >零售价</th>
					<th width="60" >批发价</th>
					<th width="60" >会员价</th>
					
					<th width="120" >折扣率一（%）</th>
					<th width="120" >折扣率二（%）</th>
					<th width="120" >备注</th>
					
					<th width="80" >仓库</th>

					<th width="70" align="center">初期数量</th>	
					<th width="70" align="center">单位成本</th>	
					<th width="70" align="center">初期总价</th>	
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
					<td ><?php echo $row['barCode']?></td>
					<td ><?php echo $row['spec']?></td>
					<td ><?php echo $row['categoryName']?></td>
					<td ><?php echo $row['locationName']?></td>
					<td ><?php echo $row['totalqty']?></td>
					<td ><?php echo $row['lowQty']?></td>
					<td ><?php echo $row['highQty']?></td>
					<td ><?php echo $row['unitName']?></td>
					<td ><?php echo $row['purPrice']?></td>
					<td ><?php echo $row['salePrice']?></td>
					<td ><?php echo $row['wholesalePrice']?></td>
					<td ><?php echo $row['vipPrice']?></td>
					<td ><?php echo $row['discountRate1']?></td>
					<td ><?php echo $row['discountRate2']?></td>
					<td ><?php echo $row['remark']?></td>

                    <td ></td>
					<td ><?php echo $row['iniqty']?></td>
					<td ><?php echo $row['iniqty']>0 ? $row['iniamount']/$row['iniqty'] :''?></td>
					<td ><?php echo $row['iniamount']?></td>
				</tr>
				<?php 
				foreach($ini as $arr1=>$row1) {
                   if ($row1['invId']==$row['id']) {
				?>
				<tr target="id">
				    <td ></td>
					<td ></td>
					<td ></td>
					<td ></td>
					<td ></td>
					<td ></td>
					<td ></td>
					<td ></td>
					<td ></td>
					<td ></td>
					<td ></td>
					<td ></td>
					<td ></td>
					<td ></td>
					<td ></td>
					<td ></td>
					<td ></td>
                    <td ><?php echo $row1['locationName']?></td>
					<td ><?php echo $row1['qty']?></td>
					<td ><?php echo $row1['price']?></td>
					<td ><?php echo $row1['amount']?></td>
				</tr>
				<?php }}?>
				<?php $i++;}?>
 
 </tbody>
</table>	
