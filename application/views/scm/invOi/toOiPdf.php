<?php if(!defined('BASEPATH')) exit('No direct script access allowed');?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title><?php echo $transTypeName?>单</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<?php for($t=1; $t<=$countpage; $t++){?>
		<table  width="800"  align="center">
			<tr>
				<td style="height:50px;"></td>
			</tr> 
		    <tr>
				<td align="center" style="font-family:'宋体'; font-size:18px; font-weight:bold;"><?php echo $system['companyName']?></td>
			</tr> 
			<tr>
				<td align="center" style="font-family:'宋体'; font-size:18px; font-weight:bold;height:25px;">其他入库单</td>
			</tr>
		</table>	
		
		
		<table width="800" align="center">
			<tr height="15" align="left" style="font-family:'宋体'; font-size:12px;">
				<td width="220" >供应商：<?php echo $contactNo.' '.$contactName?> </td>
				<td width="130" >单据日期：<?php echo $billDate?></td>
				<td width="200" >单据编号：<?php echo $billNo?></td>
				<td width="70"  >币别：RMB</td>
				<td width="150" >业务类型：<?php echo $transTypeName?></td>
			</tr>
		</table>	
		
			
		<table width="800" border="1" cellpadding="2" cellspacing="1" align="center" style="border-collapse:collapse;border:solid #000000;border-width:1px 0 0 1px;">
			<tr style="border:solid #000000;border-width:0 1px 0px 0;padding:1px; font-family:'宋体'; font-size:14px;height:15px;">
				<td width="30"  align="center">序号</td>
				<td width="250" align="center">商品</td> 
				<td width="60"  align="center">单位</td>
				<td width="60"  align="center">数量</td>
				<td width="80"  align="center">入库单价</td>	
				<td width="80"  align="center">入库金额</td>	
				<td width="150" align="center">仓库</td>	
			</tr>
		       <?php 
			   $i = ($t-1)*$num + 1;
			   foreach($list as $arr=>$row) {
			       if ($row['i']>=(($t-1)*$num + 1) && $row['i'] <=$t*$num) {
			   ?>
				<tr style="border:solid #000000;height:15px;font-family:'宋体'; font-size:12px;vertical-align:bottom;">
				    <td width="30" align="center"><?php echo $row['i']?></td>
					<td width="250"><?php echo $row['goods']?></td>
					<td width="60" align="center"><?php echo $row['invSpec']?></td>
					<td width="60" align="right"><?php echo str_money(abs($row['qty']),$system['qtyPlaces'])?></td>
					<td width="80" align="right"><?php echo abs($row['price'])?></td>
					<td width="80" align="right"><?php echo str_money(abs($row['amount']),2)?></td>
					<td width="150"><?php echo $row['locationName']?></td>
				</tr>
				<?php }
				    $i++;
				}
				?>
				<?php if ($t==$countpage) {?>
				<tr style="border:solid #000000;border-width:0 1px 0px 0;height:15px;font-family:'宋体'; font-size:12px;">
				   <td colspan="3" width="340" align="right" >合计:</td>
					<td width="60" align="right"><?php echo str_money($totalQty,$system['qtyPlaces'])?></td>
					<td width="80" ></td>
					<td width="80" align="right"><?php echo str_money($totalAmount,2)?></td>
					<td width="150"></td>
				</tr>
				<?php }?>
		</table>
		

		<?php if ($t==$countpage) {?>
		<table  width="800" align="center">
		  <tr align="left">
				<td align="left" width="780" style="font-family:'宋体'; font-size:12px;height:25px;">备注： <?php echo $description?></td>
				<td width="0" ></td>
				<td width="0" ></td>
				<td width="0" ></td>
				<td width="0" ></td>
		  </tr>
		</table>	 
		
		<table  width="800" align="center">
			<tr height="15" align="left" style="font-family:'宋体'; font-size:12px;">
				<td align="left" width="250" style="font-family:'宋体'; font-size:12px;">制单人：<?php echo $userName?> </td>
				<td width="250" >收货人签字：____________</td>
				<td width="250" ></td>
				<td width="100" ></td>
				<td width="100" ></td>
 
			</tr>
		</table>
		<?php }?>	
<?php }?>		
		
		
		 
</body>
</html>		