<?php if(!defined('BASEPATH')) exit('No direct script access allowed');?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>调拨单</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style></style>
</head>
<body>
<?php for($t=1; $t<=$countpage; $t++){?>
		<table  width="800"  align="center">
		     
			<tr height="15px">
				<td align="center" style="font-family:'宋体'; font-size:18px; font-weight:normal;height:50px;"></td>
			</tr> 
		    <tr height="15px">
				<td align="center" style="font-family:'宋体'; font-size:18px; font-weight:normal;"><?php echo $system['companyName']?></td>
			</tr> 
			<tr height="15px">
				<td align="center" style="font-family:'宋体'; font-size:18px; font-weight:normal;height:25px;">调拨单</td>
			</tr>
		</table>	
		
		
		<table width="800" align="center">
			<tr height="15" align="left">
				<td width="150" style="font-family:'宋体'; font-size:14px;">单据日期：<?php echo $billDate?> </td>
				<td width="100" style="font-family:'宋体'; font-size:14px;"></td>
				<td width="100" style="font-family:'宋体'; font-size:14px;"></td>
				<td width="150" style="font-family:'宋体'; font-size:14px;"></td>
				<td width="250" style="font-family:'宋体'; font-size:14px;">单据编号：<?php echo $billNo?></td>
 
			</tr>
		</table>	
		
			
		<table width="800" border="1" cellpadding="2" cellspacing="1" align="center" style="border-collapse:collapse;border:solid #000000;border-width:1px 0 0 1px;">   
			<tr style="height:20px">
				    <td width="30" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px; font-family:'宋体'; font-size:14px;height:15px;"  align="center">序号</td>
					<td width="280" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px; font-family:'宋体'; font-size:14px;height:15px;" align="center">商品</td> 
					<td width="60" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px; font-family:'宋体'; font-size:14px;height:15px;" align="center">单位</td>
					<td width="60" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px; font-family:'宋体'; font-size:14px;height:15px;" align="center">数量</td>
					<td width="130" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px; font-family:'宋体'; font-size:14px;height:15px;" align="center">调出仓库</td>	
					<td width="130" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px; font-family:'宋体'; font-size:14px;height:15px;" align="center">调入仓库</td>	
					
				</tr>
		       <?php 
			   $i = ($t-1)*$num + 1;
			   foreach($list as $arr=>$row) {
			       if ($row['i']>=(($t-1)*$num + 1) && $row['i'] <=$t*$num) {
			   ?>
				<tr style="border:solid #000000;border-width:0 1px 1px 0;padding:2px;height:12px;font-family:'宋体'; font-size:12px;">
				   <td  align="center"><?php echo $row['i']?></td>
					<td width="280" ><?php echo $row['goods'];?></td>
					<td width="60" align="center"><?php echo $row['mainUnit']?></td>
					<td width="60"  align="right"><?php echo str_money(abs($row['qty']),$system['qtyPlaces'])?></td>
					<td width="130" align="left"><?php echo $row['outLocationName']?></td>
					<td width="130" align="left"><?php echo $row['inLocationName']?></td>
				</tr>
				<?php 
				    }
				    $i++;
				}
				?>
	
				
				 <?php if ($t==$countpage) {?>
				 <tr style="border:solid #000000;border-width:0 1px 1px 0;padding:2px;height:15px;font-family:'宋体'; font-size:12px;">
				   <td colspan="3" width="340" align="right">合计：</td>
					<td width="60" align="right"><?php echo str_money(abs($totalQty),$system['qtyPlaces'])?></td>
					<td width="130" align="center"></td>
					<td width="130" align="center"></td>
				</tr>
				<?php }?>
		</table>
		
		

		
		<table  width="800" align="center">
		  <tr height="15" align="left">
				<td align="left" width="780" style="font-family:'宋体'; font-size:14px;height:15px;">备注： <?php echo $description?></td>
				<td width="0" style="font-family:'宋体'; font-size:14px;height:25px;"></td>
				<td width="0" style="font-family:'宋体'; font-size:14px;height:25px;"></td>
				<td width="0" style="font-family:'宋体'; font-size:14px;height:25px;"></td>
				<td width="0" style="font-family:'宋体'; font-size:14px;height:25px;"></td>
 
		  </tr>
		</table>	 
		
		<table  width="800" align="center">
			<tr height="15" align="left">
				<td align="left" width="250" style="font-family:'宋体'; font-size:14px;">制单人：<?php echo $userName?> </td>
				<td width="250" style="font-family:'宋体'; font-size:14px;">发货人签字：____________</td>
				<td width="250" style="font-family:'宋体'; font-size:14px;">收货人签字：____________</td>
				<td width="100" style="font-family:'宋体'; font-size:14px;"></td>
				<td width="100" style="font-family:'宋体'; font-size:14px;"></td>
 
			</tr>
		</table>	
<?php }?>		
		
		
		 
</body>
</html>		