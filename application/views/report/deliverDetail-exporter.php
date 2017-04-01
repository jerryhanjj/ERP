<?php if (!defined('BASEPATH')) exit('No direct script access allowed');?>
<table width="1440px" class="list">
  			<tr>
			<td colspan="12" class='H' align="center"><h3>商品收发明细表<h3></td>
			</tr>
  			<tr>
			<td colspan="12">日期：<?php echo $beginDate;?>至<?php echo $endDate;?></td>
			</tr>
  		</table>
  		<table width="1440px" class="list" border="1">
  			<thead>
  				<tr>
					<th>商品编号</th>
					<th>商品名称</th>
					<th>规格型号</th>
					<th>单位</th>
					<th>日期</th>
					<th>单据号</th>
					<th>业务类型</th>
					<th>往来单位</th>
					<th>仓库</th>
					<th>入库</th>
					<th>出库</th>
					<th>结存</th>
  				</tr>
  			</thead>
  			<tbody>
			<?php 
			$sum1 = $sum2 = $sum3 = $sum4 = 0;
			foreach($list1 as $arr=>$row){
			$totalqty = $row['qty'] - $row['qty1'];
			?>
  				<tr class="link" data-id="0" data-type="BAL">
  				   <td><?php echo $row['invNumber']?></td>
  				   <td><?php echo $row['invName']?></td>
  				   <td></td>
  			       <td class="R"></td>
  			       <td class="R"></td>
				   <td class="R"></td>
				   <td class="R">期初余额</td>

				   <td class="R"></td>
				   <td class="R"></td>
  			       <td class="R"></td>
				   <td class="R"></td>
  			       <td class="R"><?php echo str_money($totalqty,$this->systems['qtyPlaces'])?></td>
  				</tr>
  			    <?php foreach($list2 as $arr1=>$row1) {
				if ($row['invId']==$row1['invId']) {
					$inqty         = $row1['qty']>0 ? abs($row1['qty']) : '';  //入库
					$outqty        = $row1['qty']<0 ? abs($row1['qty']) : '';  //出库
					$sum1   += $inqty;             //入库数量累加
					$sum2   += $outqty;            //出库数量累加
					$sum3   += $inqty;             //合计入库数量
					$sum4   += $outqty;            //合计出库数量
					$totalqtys   = $totalqty  + $sum1 - $sum2; //结存
				?>
  				<tr>
				   <td><?php echo $row1['invNumber']?></td>
				   <td><?php echo $row1['invName']?></td>
				   <td><?php echo $row1['invSpec']?></td>
				   <td><?php echo $row1['mainUnit']?></td>
				   <td><?php echo $row1['billDate']?></td>
				   <td><?php echo $row1['billNo']?></td>
  				   <td><?php echo $row1['transTypeName']?></td>
				   <td><?php echo $row1['contactName']?></td>
  			       <td class="R"><?php echo $row1['locationName']?></td>
  			       <td class="R"><?php echo str_money($inqty,$this->systems['qtyPlaces'])?></td>
  			       <td class="R"><?php echo str_money($outqty,$this->systems['qtyPlaces'])?></td>
  			       <td class="R"><?php echo str_money($totalqtys,$this->systems['qtyPlaces'])?></td>
 
  				</tr>
				<?php  }}
				$totalqty   = $sum1 = $sum2 =  0; //初始化
				?>
				<?php  }?>
  				<tr>
				
  				<td colspan="3" class="R B">合计：</td>
  				<td class="R B"></td>
  				<td class="R B"></td>
				<td class="R B"></td>
  				<td class="R B"></td>
				<td class="R B"></td>
				<td class="R B"></td>
  				<td class="R B"><?php echo str_money($sum3,$this->systems['qtyPlaces'])?></td>
  				<td class="R B"><?php echo str_money($sum4,$this->systems['qtyPlaces'])?></td>
  				<td class="R B"><?php echo count($list0)>0 ?str_money($list0['qty'],$this->systems['qtyPlaces']) :0?></td>
  				</tr> 
  			</tbody>
  		</table>