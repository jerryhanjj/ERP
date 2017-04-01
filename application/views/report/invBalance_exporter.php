<?php if (!defined('BASEPATH')) exit('No direct script access allowed');?>
<table width="1440px" class="list">
  			<tr><td class='H' align="center" colspan="<?php echo 5 + count($storage)?>"><h3>商品库存余额表<h3></td></tr>
  			<tr><td colspan="<?php echo 4 + count($storage)?>">日期：<?php echo $beginDate;?>至<?php echo $endDate;?></td></tr>
</table>
  		<table width="1440px" class="list" border="1">
  				<tr>
  				<th width="216" rowspan="2">商品编号</th>
  				<th width="216" rowspan="2">商品名称</th>
  				<th width="216" rowspan="2">规格型号</th>
  				<th width="114" rowspan="2">单位</th>
  				<th colspan="2">所有仓库</th>
				<?php 
				$i = 2;
				$qty_1  = $cost_1 = 0;
				foreach($storage as $arr=>$row){
				    $qty['qty'.$i]  = 0;
				?>
  				<th width="50"><?php echo $row['name']?></th>
				<?php $i++;}?>
  				</tr>
  				<tr class="link" data-id="0" data-type="BAL">
  				   <td width="86">数量</td>
				   <td width="93">成本</td>
				   <?php foreach($storage as $arr=>$row){?>
				   <td>数量</td>
				   <?php }?>
  				</tr>
				
				<?php foreach($list as $arr=>$row){
				          $unitcost = isset($cost['inunitcost'][$row['invId']]) ? $cost['inunitcost'][$row['invId']] : 0;   //单位成本
						  $qty_1  += $row['qty'];  
			              $cost_1 += $row['qty'] * $unitcost;  
						  
				?>
				<tr class="link" data-id="0" data-type="BAL">
  				   <td><?php echo $row['invNumber']?></td>
  				   <td><?php echo $row['invName']?></td>
  				   <td><?php echo $row['invSpec']?></td>
  				   <td><?php echo $row['mainUnit']?></td>
				   <td><?php echo str_money($row['qty'],$this->systems['qtyPlaces'])?></td>
				   <td><?php echo str_money($row['qty'] * $unitcost,2)?></td>
				   <?php 
				   $i = 2;
				   foreach($storage as $arr1=>$row1){
				       $qty['qty'.$i] += $row['qty'.$i];
				   ?>
				   <td><?php echo str_money($row['qty'.$i],$this->systems['qtyPlaces'])?></td>
				  <?php $i++;}?>
  				</tr>
  			   <?php }?>
			   
			   <tr class="link" data-id="0" data-type="BAL">
  				   <td colspan="4" align="right">合计：</td>
  				   <td><?php echo str_money($qty_1,$this->systems['qtyPlaces'])?></td>
				   <td><?php echo str_money($cost_1,2)?></td>
				   <?php 
				   $i = 2;
				   foreach($storage as $arr1=>$row1){?>
				   <td><?php echo str_money($qty['qty'.$i],$this->systems['qtyPlaces'])?></td>
				  <?php $i++;}?>
  				</tr>
  		</table>
