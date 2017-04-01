 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>成本调整单</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style></style>
</head>
<body>
<?php for($t=1; $t<=$countpage; $t++){?>
		<table  width="1100"  align="center">
		     
			<tr height="15px">
				<td align="center" style="font-family:'宋体'; font-size:24px; font-weight:normal;height:20px;"></td>
			</tr> 
		    <tr height="15px">
				<td align="center" style="font-family:'宋体'; font-size:20px; font-weight:normal;"><?php echo $system['companyName']?></td>
			</tr> 
			<tr height="15px">
				<td align="center" style="font-family:'宋体'; font-size:20px; font-weight:normal;">成本调整单</td>
			</tr>
		</table>	
		
		
		<table width="1300" align="center">
			<tr height="15" align="left">
				<td width="250" style="font-family:'宋体'; font-size:18px;">单据日期：<?php echo $billDate?></td>
				<td width="190" style="font-family:'宋体'; font-size:18px;"></td>
				<td width="150" style="font-family:'宋体'; font-size:18px;"></td>
				<td width="100" style="font-family:'宋体'; font-size:18px;"></td>
				<td width="280" style="font-family:'宋体'; font-size:18px;">单据编号：<?php echo $billNo?></td>
 
			</tr>
		</table>	
		
			
		<table width="1100" border="1" cellpadding="2" cellspacing="1" align="center" style="border-collapse:collapse;border:solid #000000;border-width:1px 0 0 1px;">
		         
				<tr style="height:20px">
				    <td width="30" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px; font-family:'宋体'; font-size:18px;height:15px;"  align="center">序号</td>
					<td width="400" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px; font-family:'宋体'; font-size:18px;height:15px;" align="center">商品</td> 
					<td width="150" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px; font-family:'宋体'; font-size:18px;height:15px;" align="center">单位</td>
					
					<td width="150" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px; font-family:'宋体'; font-size:18px;height:15px;" align="center">调整金额</td>	
					<td width="200" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px; font-family:'宋体'; font-size:18px;height:15px;" align="center">仓库</td>	
				</tr>
				
		       <?php 
			   $i = ($t-1)*$num + 1;
			   foreach($list as $arr=>$row) {
			       if ($row['i']>=(($t-1)*$num + 1) && $row['i'] <=$t*$num) {
			   
 
			   ?>
				<tr style="height:20px">
				   <td width="30" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px;height:15px;font-family:'宋体'; font-size:16px;" align="center"><?php echo $row['i']?></td>
					<td width="400" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px;height:15px;font-family:'宋体'; font-size:16px;"><?php echo $row['goods'];?></td>
					<td width="150" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px;height:15px;font-family:'宋体'; font-size:16px;" align="center"><?php echo $row['invSpec']?></td>
					
					<td width="150" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px;height:15px;font-family:'宋体'; font-size:16px;" align="center"><?php echo abs($row['amount'])?></td>
					<td width="200" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px;height:15px;font-family:'宋体'; font-size:16px;" align="center"><?php echo $row['locationName']?></td>
				</tr>
				<?php }
				    $i++;
				}
				
				?>
				
				
				<?php if ($t==$countpage) {?>
				<tr style="height:20px">
				   <td colspan="3" align="right" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px;height:15px;font-family:'宋体'; font-size:16px;">合计:</td>
					
					<td width="150" align="center" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px;height:15px;font-family:'宋体'; font-size:16px;"><?php echo $totalAmount;?></td>
					<td width="200" style="border:solid #000000;border-width:0 1px 1px 0;padding:2px;height:15px;font-family:'宋体'; font-size:16px;"></td>
				</tr>
				<?php }?>
		</table>
		

		
		<table  width="1300" align="center">
		  <tr height="15" align="left">
				<td align="left" width="960" style="font-family:'宋体'; font-size:18px;height:15px;">备注： <?php echo $description?></td>
				<td width="0" style="font-family:'宋体'; font-size:18px;height:15px;"></td>
				<td width="0" style="font-family:'宋体'; font-size:18px;height:15px;"></td>
				<td width="0" style="font-family:'宋体'; font-size:18px;height:15px;"></td>
				<td width="0" style="font-family:'宋体'; font-size:18px;height:15px;"></td>
 
		  </tr>
		</table>	 
		
		<table  width="1300" align="center">
			<tr height="15" align="left">
				<td align="left" width="250" style="font-family:'宋体'; font-size:18px;">制单人：<?php echo $userName?> </td>
				<td width="250" style="font-family:'宋体'; font-size:18px;"></td>
				<td width="250" style="font-family:'宋体'; font-size:18px;"></td>
				<td width="100" style="font-family:'宋体'; font-size:18px;"></td>
				<td width="100" style="font-family:'宋体'; font-size:18px;"></td>
 
			</tr>
		</table>	
<?php }?>		
		
		
		 
</body>
</html>		