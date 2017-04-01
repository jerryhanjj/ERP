<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Data_model extends CI_Model{

	public function __construct(){
  		parent::__construct();
	}
	
	//库存统计
	public function get_inventory($where='',$type=2) {
	    $sql = 'select 
		            sum(a.qty) as qty, 
					a.invId, 
					a.isDelete, 
		            a.locationId,  
		            b.name as invName,  
					b.number as invNumber,
					b.spec as invSpec, 
					b.categoryId ,
					b.categoryName,
					b.unitName,
					b.unitid,
					b.lowQty,
					b.highQty,
					c.name as locationName
		        from '.INVOICE_INFO.' as a 
					left join 
						(select 
							id,name,number,spec,unitName ,unitid ,lowQty,highQty,categoryId,categoryName
						from '.GOODS.' 
						where (isDelete=0) 
						order by id desc) as b 
					on a.invId=b.id 
					left join 
						(select 
							id,name,locationNo 
						from '.STORAGE.' 
						where (isDelete=0) 
						order by id desc) as c 
					on a.locationId=c.id 
				where 
					(a.isDelete=0)
					'.$where.' 
				';
		return $this->mysql_model->query(INVOICE_INFO,$sql,$type);		
	}	
	
	//获取库存 用于判断库存是否满足
	public function get_invoice_info_inventory() {
	    $sql = 'select 
		            invId,locationId,sum(qty) as qty
		        from '.INVOICE_INFO.' 
				group by invId, locationId
				';
		$v = array();
		$list = $this->mysql_model->query(INVOICE_INFO,$sql,2);
		foreach($list as $arr=>$row){
		    $v[$row['invId']][$row['locationId']] = $row['qty'];
		}		
		return $v;		
	}	
	
	//获取单据列表
	public function get_invoice($where='',$type=2) {
	    $sql = 'select 
		            a.*,
					b.name as contactName,
					b.number as contactNo,   
					c.number as salesNo ,c.name as salesName, 
					d.number as accountNumber ,d.name as accountName   
				from '.INVOICE.' as a 
					left join 
						(select 
							id,number, name
						from '.CONTACT.' 
						where (isDelete=0) 
						order by id desc) as b
					on a.buId=b.id 
					left join 
						(select 
							id,name,number 
						from '.STAFF.' 
						where (isDelete=0) 
						order by id desc) as c
					on a.salesId=c.id 
					left join 
					(select 
						id,name,number
					from '.ACCOUNT.' 
						where (isDelete=0)) as d 
					on a.accId=d.id 
				where 
					(a.isDelete=0) '.$where;
		return $this->mysql_model->query(INVOICE,$sql,$type);	
	}	
	
	
 
	
	//获取销售订单
	public function get_invps($where='',$type=2) {
	    $sql = 'select 
		            a.*,
					b.name as contactName,
					b.number as contactNo,   
					c.number as salesNo ,c.name as salesName
				from '.INVPS.' as a 
					left join 
						(select 
							id,number, name
						from '.CONTACT.' 
						where (isDelete=0) 
						order by id desc) as b
					on a.buId=b.id 
					left join 
						(select 
							id,name,number 
						from '.STAFF.' 
						where (isDelete=0) 
						order by id desc) as c
					on a.salesId=c.id 
					
				where 
					(a.isDelete=0) '.$where;
		return $this->mysql_model->query(INVPS,$sql,$type);	
	}	

	
	//商品收发明细表(初始数量)  作用于report.php 商品收发明细表(接口)
	public function get_goods_ini($where='',$beginDate,$endDate,$type=2) {
	    $sql = 'select 
		            a.id,
					a.iid,
					a.billNo,
					a.billType,
					a.billDate,
					a.buId,
					a.invId,
					a.transTypeName,
					a.transType,
					a.price,
					a.locationId,
		            sum(a.qty) as qty, 
					sum(a.amount) as amount,  
					sum(case when a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then a.qty else 0 end) as qty1,
					sum(case when a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then a.amount else 0 end) as amount1,
					b.name as invName, b.number as invNumber, b.spec as invSpec, b.unitName as mainUnit, 
					c.name as locationName ,c.locationNo
				from '.INVOICE_INFO.' as a 
					left join 
						(select 
							id,name,number,spec,unitName 
						from '.GOODS.' 
						where (isDelete=0) 
						order by id desc) as b 
					on a.invId=b.id 
					left join 
						(select 
							id,name,locationNo 
						from '.STORAGE.' 
						where (isDelete=0) 
						order by id desc) as c 
					on a.locationId=c.id 
				where 
					(a.isDelete=0) 
					'.$where; 
		return $this->mysql_model->query(INVOICE_INFO,$sql,$type); 	
	}
 
	
	//采购、销售汇总表(按商品、客户、供应商)   作用于report.php  可用于商品初期
	public function get_invoice_info_sum($where='',$type=2) {
	    $sql = 'select 
		            a.id,
					a.iid,
					a.billNo,
					a.billType,
					a.billDate,
					a.buId,
					a.invId,
					a.transTypeName,
					a.transType,
					a.price,
					a.locationId,
					a.salesId,
		            sum(a.qty) as qty, 
					sum(a.amount) as amount,  
					b.name as invName, b.number as invNumber, b.spec as invSpec, b.unitName as mainUnit, 
					c.number as contactNo, c.name as contactName,
					d.name as locationName ,d.locationNo ,
					e.number as salesNo ,e.name as salesName
				from '.INVOICE_INFO.' as a 
					left join 
						(select 
							id,name,number,spec,unitName 
						from '.GOODS.' 
						where (isDelete=0) 
						order by id desc) as b 
					on a.invId=b.id 
					left join 
						(select 
							id,number, name 
						from '.CONTACT.' 
						where (isDelete=0) 
						order by id desc) as c
					on a.buId=c.id 	
					left join 
						(select 
							id,name,locationNo 
						from '.STORAGE.' 
						where (isDelete=0) 
						order by id desc) as d 
					on a.locationId=d.id 
					left join 
						(select 
							id,name,number 
						from '.STAFF.' 
						where (isDelete=0) 
						order by id desc) as e
					on a.salesId=e.id 	
				where 
					(a.isDelete=0) 
					'.$where; 
		return $this->mysql_model->query(INVOICE_INFO,$sql,$type); 	
	}
	 
	
	//获取单据列表明细
	public function get_invoice_info($where='',$type=2) {
	    $sql = 'select 
		            a.*, 
					b.name as invName, b.number as invNumber, b.spec as invSpec, b.unitName as mainUnit, 
					c.number as contactNo, c.name as contactName,
					d.name as locationName ,d.locationNo ,
					e.number as salesNo ,e.name as salesName
				from '.INVOICE_INFO.' as a 
					left join 
						(select 
							id,name,number,spec,unitName 
						from '.GOODS.' 
						where (isDelete=0) 
						order by id desc) as b 
					on a.invId=b.id 
					left join 
						(select 
							id,number, name 
						from '.CONTACT.' 
						where (isDelete=0) 
						order by id desc) as c
					on a.buId=c.id 	
					left join 
						(select 
							id,name,locationNo 
						from '.STORAGE.' 
						where (isDelete=0) 
						order by id desc) as d 
					on a.locationId=d.id 
					left join 
						(select 
							id,name,number 
						from '.STAFF.' 
						where (isDelete=0) 
						order by id desc) as e
					on a.salesId=e.id 	
				where 
					(a.isDelete=0) 
				'.$where;
		return $this->mysql_model->query(INVOICE_INFO,$sql,$type); 	
	}
	
	 
	
	
	//获取销售订单明细
	public function get_invps_info($where='',$type=2) {
	    $sql = 'select 
		            a.*, 
					b.name as invName, b.number as invNumber, b.spec as invSpec, b.unitName as mainUnit, 
					c.number as contactNo, c.name as contactName,
					d.name as locationName ,d.locationNo ,
					e.number as salesNo ,e.name as salesName
				from '.INVPS_INFO.' as a 
					left join 
						(select 
							id,name,number,spec,unitName 
						from '.GOODS.' 
						where (isDelete=0) 
						order by id desc) as b 
					on a.invId=b.id 
					left join 
						(select 
							id,number, name 
						from '.CONTACT.' 
						where (isDelete=0) 
						order by id desc) as c
					on a.buId=c.id 	
					left join 
						(select 
							id,name,locationNo 
						from '.STORAGE.' 
						where (isDelete=0) 
						order by id desc) as d 
					on a.locationId=d.id 
					left join 
						(select 
							id,name,number 
						from '.STAFF.' 
						where (isDelete=0) 
						order by id desc) as e
					on a.salesId=e.id 	
				where 
					(a.isDelete=0) 
				'.$where;
		return $this->mysql_model->query(INVPS_INFO,$sql,$type); 	
	}
	
	
	//商品库存余额表(接口)
	public function get_invBalance($where='',$select='',$type=2) {
	    //sum(case when a.locationId=1 then qty else 0 end ) as qty5,  $select
	    $sql = 'select 
		            a.invId,
		            sum(a.qty) as qty,
					sum(a.amount) as amount,
					'.$select.'
					sum(case when a.transType=150501 or a.transType=150502 or a.transType=150706 or a.billType="INI" then a.qty else 0 end) as inqty,
					sum(case when a.transType=150501 or a.transType=150502 or a.transType=150807 or a.transType=150706 or a.billType="INI" then a.amount else 0 end) as incost,
					b.name as invName, b.number as invNumber, b.spec as invSpec, b.unitName as mainUnit, b.categoryId,
					c.locationNo 
				from '.INVOICE_INFO.' as a 
					left join 
						(select 
							id,name,number,spec,unitName,categoryId
						from '.GOODS.' 
						where (isDelete=0) 
						order by id desc) as b 
					on a.invId=b.id 
					left join 
						(select 
							id,name,locationNo 
						from '.STORAGE.' 
						where (isDelete=0) 
						order by id desc) as c 
					on a.locationId=c.id 
				where 
					(a.isDelete=0) '.$where;	

		return $this->mysql_model->query(INVOICE_INFO,$sql,$type); 
	}
	
	
	//获取商品收发汇总表 
	public function get_deliverSummary($where='',$beginDate,$endDate,$type=2) {
	    $sql = 'select 
		            sum(case when a.billDate<"'.$beginDate.'" then qty else 0 end ) as qty0,
					sum(case when a.billDate<"'.$beginDate.'" then amount else 0 end ) as cost0,
					
					sum(case when (transType=150501 or transType=150502 or transType=150807 or transType=150706 or billType="INI") and a.billDate<"'.$beginDate.'" then amount else 0 end) as incost0,
					sum(case when (transType=150501 or transType=150502 or transType=150706 or billType="INI") and a.billDate<"'.$beginDate.'" then qty else 0 end)  as inqty0,
					
					sum(case when (transType=150501 or transType=150502 or transType=150807 or transType=150706 or billType="INI") and a.billDate<="'.$endDate.'" then amount else 0 end) as incost14,
					sum(case when (transType=150501 or transType=150502 or transType=150706 or billType="INI") and a.billDate<="'.$endDate.'" then qty else 0 end)  as inqty14,
					
		            sum(qty) as qty14,
					sum(case when a.transType=150501 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then qty else 0 end ) as qty2,
					sum(case when a.transType=150501 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then amount else 0 end ) as cost2,
					sum(case when a.transType=150502 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then qty else 0 end ) as qty9,
					sum(case when a.transType=150502 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then amount else 0 end ) as cost9,
					sum(case when a.transType=150601 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then qty else 0 end ) as qty10,
					sum(case when a.transType=150601 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then amount else 0 end ) as cost10,
					sum(case when a.transType=150602 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then qty else 0 end ) as qty3,
					sum(case when a.transType=150602 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then amount else 0 end ) as cost3,
					sum(case when a.transType=150701 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then qty else 0 end ) as qty4,
					sum(case when a.transType=150701 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then amount else 0 end ) as cost4,
					sum(case when a.transType=150702 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then qty else 0 end ) as qty3,
					sum(case when a.transType=150801 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then qty else 0 end ) as qty11,
					sum(case when a.transType=150801 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then amount else 0 end ) as cost11,
					sum(case when a.transType=103091 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" and qty>0 then qty else 0 end ) as qty1,
					sum(case when a.transType=103091 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" and qty>0 then amount else 0 end ) as cost1,
					sum(case when a.transType=103091 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" and qty<0 then qty else 0 end ) as qty8,
					sum(case when a.transType=103091 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" and qty<0 then amount else 0 end ) as cost8,
					sum(case when a.transType=150807 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then qty else 0 end ) as qty6,
					sum(case when a.transType=150807 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then amount else 0 end ) as cost6,
					sum(case when a.transType=150706 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'"then qty else 0 end ) as qty5,
					sum(case when a.transType=150706 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then amount else 0 end ) as cost5,
					sum(case when a.transType=150806 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then qty else 0 end ) as qty12,
					sum(case when a.transType=150806 and a.billDate>="'.$beginDate.'" and a.billDate<="'.$endDate.'" then amount else 0 end ) as cost12,
					a.transType,
					a.invId,
					a.locationId,
					b.name as invName, b.number as invNumber, b.spec as invSpec, b.unitName as mainUnit,
					d.name as locationName ,d.locationNo 
				from '.INVOICE_INFO.' as a 
				    left join 
						(select 
							id,name,number,spec,unitName 
						from '.GOODS.' 
						where (isDelete=0) 
						order by id desc) as b 
					on a.invId=b.id 
					left join 
						(select 
							id,number, name 
						from '.CONTACT.' 
						where (isDelete=0) 
						order by id desc) as c
					on a.buId=c.id 	
					left join 
						(select 
							id,name,locationNo 
						from '.STORAGE.' 
						where (isDelete=0) 
						order by id desc) as d 
					on a.locationId=d.id 
				where 
					(a.isDelete=0) 
				'.$where;
		return $this->mysql_model->query(INVOICE_INFO,$sql,2); 
	}
	
	
	
	//获取供应商客户      用于应付账、收账明细、客户、供应商对账单、来往单位欠款 (期初余额) 对应多个接口
	public function get_contact($where1='',$where2='',$type=2) {
	    $sql = 'select 
					a.id,
					a.type,
					a.difMoney,
					a.difMoney + ifnull(b.arrears,0) as amount,
					a.name,
					a.number,
					b.arrears
				from '.CONTACT.' as a 
				left join 
					(select 
					    buId,
					    billType,
						sum(arrears) as arrears
					from '.INVOICE.' 
						where (isDelete=0) 
						'.$where1.'
					group by buId) as b 
			    on a.id=b.buId  
				where 
					(a.isDelete=0) 
				'.$where2.'';
				//echo $sql;
		return $this->mysql_model->query(INVOICE,$sql,$type); 	
	}
	

	//获取结算用户     现金银行报表(期初余额)
	public function get_account($where1='',$where2='',$type=2) {
	    $sql = 'select 
		            a.id,
					a.name as accountName,
					a.number as accountNumber,
					a.date,
					a.type,
		            b.payment,
					(a.amount + ifnull(b.payment,0)) as amount
		        from '.ACCOUNT.' as a 
				left join 
				    (select 
					    accId,
						billDate,
					    sum(payment) as payment 
					from '.ACCOUNT_INFO.' 
					where 
						(isDelete=0) 
						'.$where1.' 
					GROUP BY accId) as b 
			    on a.id=b.accId  
				where (isDelete=0) '.$where2;	
		return $this->mysql_model->query(ACCOUNT_INFO,$sql,$type);		
	}	
	

	//获取结算明细     用于其他收支明细表、现金银行报表(明细)
	public function get_account_info($where='',$type=2) {
	    $sql = 'select 
		            a.id,
					a.iid,
					a.accId,
		            a.buId,
		            a.isDelete,
		            a.billType,
					a.billNo,
					a.remark,
					a.billDate,
					a.payment,
					a.wayId,
					a.settlement,
					a.transType,
					a.transTypeName,
					b.name as contactName,
					b.number as contactNo,
					c.name as categoryName,
					d.name as accountName,
					d.number as accountNumber    
				from '.ACCOUNT_INFO.' as a 
				left join 
					(select 
						id,name,number
					from '.CONTACT.' 
						where (isDelete=0)) as b 
					on a.buId=b.id 
				left join 
					(select 
						id,name
					from '.CATEGORY.' 
						where (isDelete=0)) as c 
					on a.wayId=c.id 
				left join 
					(select 
						id,name,number
					from '.ACCOUNT.' 
						where (isDelete=0)) as d 
					on a.accId=d.id 
				where (a.isDelete=0) '.$where;	
		return $this->mysql_model->query(ACCOUNT_INFO,$sql,$type); 	
	}
	
	
	
	
	//获取期初 结存数和成本
	public function get_invoice_info_ini($where='',$type=2) {
	    $sql = 'select 
		            invId,
					locationId,
					billDate,
					sum(qty) as qty,
					sum(case when transType=150501 or transType=150502 or transType=150807 or transType=150706 or billType="INI" then amount else 0 end) as incost,
					sum(case when transType=150501 or transType=150502 or transType=150706 or billType="INI" then qty else 0 end) as inqty
				from '.INVOICE_INFO.' 
				where 
					(isDelete=0)'.$where;
		$v = array();
		$list = $this->mysql_model->query(INVOICE_INFO,$sql,2);
		foreach($list as $arr=>$row){
		    $v['qty'][$row['invId']]   = $row['qty'];      //结存数量（时间段） 
		    $v['inqty'][$row['invId']]  = $row['inqty'];   //期初入库数量
			$v['incost'][$row['invId']] = $row['incost'];  //期初入库成本
			$v['inunitcost'][$row['invId']] = $row['inqty']>0 ? $row['incost']/$row['inqty'] :0;  //期初单位成本	
		}		
		return $v;		
	}	
	
	//获取商品明细  
	public function get_goods($where='',$type=2) {
	    $sql = 'select 
					a.*,
					b.iniqty,
					b.iniunitCost,
					b.iniamount,
					b.totalqty
				from '.GOODS.' as a 
				left join 
					(select 
						invId,
						sum(qty) as totalqty, 
						sum(case when billType="INI" then qty else 0 end) as iniqty,
						sum(case when billType="INI" then price else 0 end) as iniunitCost,
						sum(case when billType="INI" then amount else 0 end) as iniamount
					from '.INVOICE_INFO.' 
						where (isDelete=0)
					group by invId) as b 
				on a.id=b.invId  
				where 
					(a.isDelete=0) '.$where;
		return $this->mysql_model->query(GOODS,$sql,$type); 	
	}	
	 

 
}