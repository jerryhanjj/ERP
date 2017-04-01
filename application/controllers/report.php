<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Report extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
		$this->jxcsys    = $this->session->userdata('jxcsys');
		$this->systems   = $this->common_model->get_option('system');  
    }
	
	public function index() {
	    //库存总量 成本
		
		$costini   = $this->data_model->get_invoice_info_ini('and billDate<="'.date('Y-m-d').'" group by invId');   
		
		$inventory1  = $inventory2 = 0;
		$where = ' and a.billDate<="'.date('Y-m-d').'"'; 
		$list   = $this->data_model->get_invBalance($where.' group by a.invId'); 
		foreach ($list as $arr=>$row) {
		    $unitcost = isset($costini['inunitcost'][$row['invId']]) ? $costini['inunitcost'][$row['invId']] : 0;   //单位成本
			
			$inventory1 += $row['qty'];
			$inventory2 += $row['qty'] * $unitcost;
		}
		$inventory1 = str_money($inventory1,$this->systems['qtyPlaces']); 
		$inventory2 = str_money($inventory2,2); 
	
	    //现金、银行存款
		$fund1 = $fund2 = 0;
	    $list = $this->data_model->get_account();
		foreach ($list as $arr=>$row) {
		    if ($row['type']==1) {
			    $fund1 += $row['amount'];
			} else {
			    $fund2 += $row['amount'];
			} 
		}
		$fund1 = str_money($fund1,2); 
		$fund2 = str_money($fund2,2); 
		
		//客户欠款
		$contact1 = $contact2 = 0;
		$list = $this->data_model->get_contact();
		foreach ($list as $arr=>$row) {
		//echo $row['id']."--".$row['name'].";";
		    if ($row['type']==-10) {
			    $contact1 += $row['amount']; //供应商
			} elseif ($row['type']==10) {
			    $contact2 += $row['amount']; //客户 
			} else {	
			    $contact1 = 0; 
		        $contact2 = 0; 
			}
		}
		$contact1 = str_money($contact1,2); 
		$contact2 = str_money($contact2,2); 

		//采购金额
		$list = $this->data_model->get_invoice_info_sum(' and a.transType=150501 and billDate>="'.date('Y-m-1').'" and billDate<="'.date('Y-m-d').'" group by a.invId');
		$purchase1 = 0;
		foreach ($list as $arr=>$row) {
			$purchase1 += $row['amount']; 
		}
		$purchase2 = count($list);
		$purchase1 = str_money($purchase1,2); 
		$purchase2 = str_money($purchase2,$this->systems['qtyPlaces']); 
		
		
		//销售收入 
		$sales1 = $sales2 = 0;
		$list1  = $this->data_model->get_invoice_info_sum(' and billType="SALE" and billDate>="'.date('Y-m-1').'" and billDate<="'.date('Y-m-d').'" group by a.invId, a.locationId'); 
		
		foreach ($list1 as $arr=>$row) {
		    $qty = $row['qty']>0 ? -abs($row['qty']) : abs($row['qty']);   //销售在数据库中是负数 在统计的时候应该是正数
			$unitcost = isset($costini['inunitcost'][$row['invId']]) ? $costini['inunitcost'][$row['invId']] : 0;   //单位成本
			$cost = $unitcost * $qty;           //销售成本
			$sales1 += $row['amount'];          //销售收入
			$sales2 += $row['amount'] - $cost;  //销售毛利
		}
		$sales1 = str_money($sales1,2); 
		$sales2 = str_money($sales2,2); 
		
		$data['status'] = 200;
		$data['msg']    = 'success';
		$data['data']['items'] =  array(
									array('mod'=>'inventory','total1'=>$inventory1,'total2'=>$inventory2),
									array('mod'=>'fund','total1'=>$fund1,'total2'=>$fund2),
									array('mod'=>'contact','total1'=>$contact1,'total2'=>$contact2),
									array('mod'=>'sales','total1'=>$sales1,'total2'=>$sales2),
									array('mod'=>'purchase','total1'=>$purchase1,'total2'=>$purchase2)
		);
		$data['totalsize'] = 5;
		die(json_encode($data));
	}
	
	 
    
	//采购明细表 (新版)
	public function pu_detail_new() {
	    $this->common_model->checkpurview(22);
		$data['beginDate']  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = str_enhtml($this->input->get_post('endDate',TRUE));
		$this->load->view('report/pu-detail-new',$data);	
	}
	
	//采购明细表 (新版接口)
	public function puDetail_detail() {
	    $this->common_model->checkpurview(22);
	    $v = array();
		$sum1 = $sum2 = $sum3 = 0;
	    $data['status'] = 200;
		$data['msg']    = 'success';
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100); 
	    $storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$customerNo = str_enhtml($this->input->get_post('customerNo',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$beginDate  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate    = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and a.billType="PUR"';
		$where .= $storageNo ? ' and d.locationNo in('.str_quote($storageNo).')' : ''; 
		$where .= $customerNo ? ' and c.number in('.str_quote($customerNo).')' : ''; 
		$where .= $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 
		$list   = $this->data_model->get_invoice_info($where.' order by a.billDate,a.id'); 
		foreach ($list as $arr=>$row) {
			$v[$arr]['billId']        = intval($row['iid']);
		    $v[$arr]['billNo']        = $row['billNo'];
			$v[$arr]['billType']      = $row['billType']; 
			$v[$arr]['date']          = $row['billDate']; 
			$v[$arr]['buId']          = intval($row['buId']);
			$v[$arr]['buName']        = $row['contactName'];
			$v[$arr]['invNo']         = $row['invNumber'];  
			$v[$arr]['invName']       = $row['invName'];   
			$v[$arr]['spec']          = $row['invSpec']; 
			$v[$arr]['unit']          = $row['mainUnit']; 
			$v[$arr]['location']      = $row['locationName']; 
			$v[$arr]['description']   = $row['description']; 
			$v[$arr]['baseQty']       = 0; 
			$v[$arr]['skuId']         = 0; 
			$v[$arr]['cost']          = 0;
			$v[$arr]['unitCost']      = 0;
			$v[$arr]['transType']     = $row['transTypeName'];
			$sum1 += $v[$arr]['qty']        = (float)$row['qty']; 
			$sum2 += $v[$arr]['unitPrice']  = (float)$row['price'];
		    $sum3 += $v[$arr]['amount']     = (float)$row['amount']; 
		}
		$data['data']['list']      = $v;
		$data['data']['total']['amount']      = '';
		$data['data']['total']['baseQty']     = 'PUR';
		$data['data']['total']['billId']      = '';
		$data['data']['total']['billNo']      = '';
		$data['data']['total']['billType']    = '';
		$data['data']['total']['buName']      = '';
		$data['data']['total']['buNo']        = '';
		$data['data']['total']['date']        = '';
		$data['data']['total']['invName']     = '';
		$data['data']['total']['location']    = '';
		$data['data']['total']['locationNo']  = '';
		$data['data']['total']['spec']        = '';
		$data['data']['total']['unit']        = '';
		$data['data']['total']['transType']   = '';
		$data['data']['total']['skuId']       = '';
		$data['data']['total']['qty']         = $sum1;
		$data['data']['total']['unitPrice']   = $sum1>0 ? $sum3/$sum1 : 0;
		$data['data']['total']['amount']      = $sum3;
		$data['data']['total']['cost']        = '';
		$data['data']['total']['unitCost']    = '';
		die(json_encode($data));
	}

	//采购明细表(导出明细)
	public function puDetail_detailExporter() {
	    $this->common_model->checkpurview(23);
		$name = 'pu_detail_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('采购明细表导出:'.$name);
		$storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$customerNo = str_enhtml($this->input->get_post('customerNo',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$data['beginDate']  = $beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = $endDate   = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and a.billType="PUR"';
		$where .= $storageNo ? ' and d.locationNo in('.str_quote($storageNo).')' : ''; 
		$where .= $customerNo ? ' and c.number in('.str_quote($customerNo).')' : ''; 
		$where .= $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 
		$data['list'] = $this->data_model->get_invoice_info($where.' order by a.id'); 
		$this->load->view('report/puDetail-detailExporter',$data);	
	}
	
	
 
	//采购汇总表（按商品）
	public function pu_summary_new() {
	    $this->common_model->checkpurview(25);
		$data['beginDate']  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = str_enhtml($this->input->get_post('endDate',TRUE));
		$this->load->view('report/pu-summary-new',$data);	
	}
	
	//采购汇总表（按商品接口）
	public function puDetail_inv() {
	    $this->common_model->checkpurview(25);
        $v = array();
		$sum1 = $sum2 = $sum3 = 0;
	    $data['status'] = 200;
		$data['msg']    = 'success';
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100); 
	    $storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$customerNo = str_enhtml($this->input->get_post('customerNo',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$beginDate  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate    = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and a.billType="PUR"';
		$where .= $storageNo ? ' and d.locationNo in('.str_quote($storageNo).')' : ''; 
		$where .= $customerNo ? ' and c.number in('.str_quote($customerNo).')' : ''; 
		$where .= $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 
		$list   = $this->data_model->get_invoice_info_sum($where.' group by a.invId, a.locationId'); 
		foreach ($list as $arr=>$row) {
			$v[$arr]['billId']        = intval($row['iid']);
		    $v[$arr]['billNo']        = $row['billNo'];
			$v[$arr]['billType']      = $row['billType']; 
			$v[$arr]['date']          = $row['billDate']; 
			$v[$arr]['buId']          = intval($row['buId']);
			$v[$arr]['buName']        = $row['contactName'];
			$v[$arr]['invNo']         = $row['invNumber'];  
			$v[$arr]['invName']       = $row['invName'];   
			$v[$arr]['spec']          = $row['invSpec']; 
			$v[$arr]['unit']          = $row['mainUnit']; 
			$v[$arr]['location']      = $row['locationName']; 
			$v[$arr]['baseQty']       = 0; 
			$v[$arr]['skuId']         = 0; 
			$v[$arr]['cost']          = 0;
			$v[$arr]['unitCost']      = 0;
			$v[$arr]['transType']     = $row['transTypeName'];
			$sum1 += $v[$arr]['qty']        = (float)$row['qty']; 
			$sum2 += $v[$arr]['unitPrice']  = (float)$row['qty']!=0 ? (float)abs($row['amount']/$row['qty']) : 0;
		    $sum3 += $v[$arr]['amount']     = (float)$row['amount']; 
		}
		$data['data']['list']      = $v;
		$data['data']['total']['amount']      = '';
		$data['data']['total']['baseQty']     = 'PUR';
		$data['data']['total']['billId']      = '';
		$data['data']['total']['billNo']      = '';
		$data['data']['total']['billType']    = '';
		$data['data']['total']['buName']      = '';
		$data['data']['total']['buNo']        = '';
		$data['data']['total']['date']        = '';
		$data['data']['total']['invName']     = '';
		$data['data']['total']['location']    = '';
		$data['data']['total']['locationNo']  = '';
		$data['data']['total']['spec']        = '';
		$data['data']['total']['unit']        = '';
		$data['data']['total']['transType']   = '';
		$data['data']['total']['skuId']       = '';
		$data['data']['total']['qty']         = $sum1;
		$data['data']['total']['unitPrice']   = $sum1!=0 ? abs($sum3/$sum1) : 0;
		$data['data']['total']['amount']      = $sum3;
		$data['data']['total']['cost']        = '';
		$data['data']['total']['unitCost']    = '';
		die(json_encode($data)); 
	}
	
	//采购明细表(导出明细)
	public function puDetail_invExporter() {
	    $this->common_model->checkpurview(26);
		$name = 'pu_summary_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('采购明细表(按商品)导出:'.$name);
		$storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$customerNo = str_enhtml($this->input->get_post('customerNo',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$data['beginDate']  = $beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = $endDate   = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and a.billType="PUR"';
		$where .= $storageNo ? ' and d.locationNo in('.str_quote($storageNo).')' : ''; 
		$where .= $customerNo ? ' and c.number in('.str_quote($customerNo).')' : ''; 
		$where .= $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 
		$data['list'] = $this->data_model->get_invoice_info($where.' group by a.invId, a.locationId'); 
		$this->load->view('report/puDetail-invExporter',$data);	
	}
	
	//采购汇总表（按供应商）
	public function pu_summary_supply_new() {
	    $this->common_model->checkpurview(28);
		$data['beginDate']  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = str_enhtml($this->input->get_post('endDate',TRUE));
		$this->load->view('report/pu-summary-supply-new',$data);	
	}
	
	
	//采购汇总表（按供应商接口）
	public function puDetail_supply() {
	    $this->common_model->checkpurview(28);
        $v = array();
		$sum1 = $sum2 = $sum3 = 0;
	    $data['status'] = 200;
		$data['msg']    = 'success';
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100); 
	    $storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$customerNo = str_enhtml($this->input->get_post('customerNo',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$beginDate  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate    = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and a.billType="PUR"';
		$where .= $storageNo ? ' and d.locationNo in('.str_quote($storageNo).')' : ''; 
		$where .= $customerNo ? ' and c.number in('.str_quote($customerNo).')' : ''; 
		$where .= $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 
		$list   = $this->data_model->get_invoice_info_sum($where.' group by a.buId,a.invId, a.locationId');  
		foreach ($list as $arr=>$row) {
			$v[$arr]['billId']        = intval($row['iid']);
		    $v[$arr]['billNo']        = $row['billNo'];
			$v[$arr]['billType']      = $row['billType']; 
			$v[$arr]['date']          = $row['billDate']; 
			$v[$arr]['buId']          = intval($row['buId']);
			$v[$arr]['buName']        = $row['contactName'];
			$v[$arr]['invNo']         = $row['invNumber'];  
			$v[$arr]['invName']       = $row['invName'];   
			$v[$arr]['spec']          = $row['invSpec']; 
			$v[$arr]['unit']          = $row['mainUnit']; 
			$v[$arr]['location']      = $row['locationName']; 
			$v[$arr]['baseQty']       = 0; 
			$v[$arr]['skuId']         = 0; 
			$v[$arr]['cost']          = 0;
			$v[$arr]['unitCost']      = 0;
			$v[$arr]['transType']     = $row['transTypeName'];
			$sum1 += $v[$arr]['qty']        = (float)$row['qty']; 
			$sum2 += $v[$arr]['unitPrice']  = (float)$row['qty']!=0 ? (float)abs($row['amount']/$row['qty']) : 0;
		    $sum3 += $v[$arr]['amount']     = (float)$row['amount']; 
		}
		$data['data']['list']      = $v;
		$data['data']['total']['amount']      = '';
		$data['data']['total']['baseQty']     = 'PUR';
		$data['data']['total']['billId']      = '';
		$data['data']['total']['billNo']      = '';
		$data['data']['total']['billType']    = '';
		$data['data']['total']['buName']      = '';
		$data['data']['total']['buNo']        = '';
		$data['data']['total']['date']        = '';
		$data['data']['total']['invName']     = '';
		$data['data']['total']['location']    = '';
		$data['data']['total']['locationNo']  = '';
		$data['data']['total']['spec']        = '';
		$data['data']['total']['unit']        = '';
		$data['data']['total']['transType']   = '';
		$data['data']['total']['skuId']       = '';
		$data['data']['total']['qty']         = $sum1;
		$data['data']['total']['unitPrice']   = $sum1!=0 ? abs($sum3/$sum1) : 0;
		$data['data']['total']['amount']      = $sum3;
		$data['data']['total']['cost']        = '';
		$data['data']['total']['unitCost']    = '';
		die(json_encode($data)); 
	}
	
	
	//采购汇总表（按供应商）
	public function puDetail_supplyExporter() {
	    $this->common_model->checkpurview(29);
		$name = 'pu_supply_summary_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('采购明细表(按供应商)导出:'.$name);
		$storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$customerNo = str_enhtml($this->input->get_post('customerNo',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$data['beginDate']  = $beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = $endDate = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and a.billType="PUR"';
		$where .= $storageNo ? ' and d.locationNo in('.str_quote($storageNo).')' : ''; 
		$where .= $customerNo ? ' and c.number in('.str_quote($customerNo).')' : ''; 
		$where .= $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 

		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 
		$data['list'] = $this->data_model->get_invoice_info($where.' group by a.buId,a.invId, a.locationId'); 
		$this->load->view('report/puDetail-supplyExporter',$data);	
	}
	
	
	//销售明细表
	public function sales_detail() {
	    $this->common_model->checkpurview(31);
		$this->load->view('report/sales-detail');	
	}
	
	//销售明细表接口
	public function salesDetail_detail() {
	    $this->common_model->checkpurview(31);
	    $v = array();
		$sum1 = $sum2 = $sum3 = $sum4 = $sum5 = $sum6 = $sum7 = 0;
	    $data['status'] = 200;
		$data['msg']    = 'success';
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100); 
		$profit     = intval($this->input->get_post('profit',TRUE));
		$salesId    = str_enhtml($this->input->get_post('salesId',TRUE));
	    $storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$customerNo = str_enhtml($this->input->get_post('customerNo',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$beginDate  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate    = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and a.billType="SALE"';
		$where .= $salesId ? ' and e.number  in('.str_quote($salesId).')' : ''; 
		$where .= $storageNo ? ' and d.locationNo in('.str_quote($storageNo).')' : ''; 
		$where .= $customerNo ? ' and c.number in('.str_quote($customerNo).')' : ''; 
		$where .= $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 
		$offset = $rows * ($page-1);
		$data['data']['page']      = $page;
		$data['data']['records']   = $this->data_model->get_invoice_info($where.' order by a.billDate,a.id',3);                   //总条数
		$data['data']['total']     = ceil($data['data']['records']/$rows);                            //总分页数
		$list   = $this->data_model->get_invoice_info($where.' order by a.billDate,a.id'); 
		foreach ($list as $arr=>$row) {
		    $sum1 += $qty = $row['qty']>0 ? -abs($row['qty']):abs($row['qty']);   //销售在数据库中是负数 在统计的时候应该是正数
			$sum3 += $amount = $row['amount'];                      //销售收入
			$unitPrice = $qty!=0 ? $amount/$qty : 0;                //单位成本
			if ($profit==1) {
				
			}
			
			$v[$arr]['billId']        = intval($row['iid']);
		    $v[$arr]['billNo']        = $row['billNo'];
			$v[$arr]['billType']      = $row['billType']; 
			$v[$arr]['date']          = $row['billDate']; 
			$v[$arr]['buId']          = intval($row['buId']);
			$v[$arr]['buName']        = $row['contactName'];
			$v[$arr]['invNo']         = $row['invNumber'];  
			$v[$arr]['invName']       = $row['invName'];   
			$v[$arr]['spec']          = $row['invSpec']; 
			$v[$arr]['unit']          = $row['mainUnit']; 
			$v[$arr]['location']      = $row['locationName']; 
			$v[$arr]['description']   = $row['description']; 
			
			$v[$arr]['skuId']         = 0; 
			$v[$arr]['cost']          = '';   //销售成本
			$v[$arr]['unitCost']      = '';   //单位成本
			$v[$arr]['saleProfit']    = '';   //销售毛利
			$v[$arr]['salepPofitRate']= '';   //销售毛利率
			$v[$arr]['salesName']     = $row['salesName'];
			$v[$arr]['transType']     = $row['transTypeName'];
			$v[$arr]['unitPrice']  = $unitPrice;
			$v[$arr]['qty']        = $qty;
		    $v[$arr]['amount']     = $amount;
		}
		$data['data']['rows']      = $v;
		$data['data']['userdata']['billId']      = 0;
		$data['data']['userdata']['billType']    = 'SALE';
		$data['data']['userdata']['skuId']       = 0;
		$data['data']['userdata']['qty']         = $sum1;
		$data['data']['userdata']['unitPrice']   = $sum1>0 ? str_money($sum3/$sum1,$this->systems['qtyPlaces']) : 0;
		$data['data']['userdata']['amount']      = $sum3;
		$data['data']['userdata']['cost']        = '';
		$data['data']['userdata']['unitCost']    = '';
		$data['data']['userdata']['saleProfit']      = '';
		$data['data']['userdata']['salepPofitRate']  = '';
		die(json_encode($data));
	}
	
	//销售明细表（导出）
	public function salesDetail_detailExporter() {
	    $this->common_model->checkpurview(32);
		$name = 'sales_detail_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('销售明细表导出:'.$name);
		$salesId    = str_enhtml($this->input->get_post('salesId',TRUE));
	    $storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$customerNo = str_enhtml($this->input->get_post('customerNo',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$data['beginDate']  = $beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = $endDate = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and a.billType="SALE"';
		$where .= $salesId ? ' and e.number  in('.str_quote($salesId).')' : ''; 
		$where .= $storageNo ? ' and d.locationNo in('.str_quote($storageNo).')' : ''; 
		$where .= $customerNo ? ' and c.number in('.str_quote($customerNo).')' : ''; 
		$where .= $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 
		$data['list'] = $this->data_model->get_invoice_info($where.' order by a.id'); 
		$this->load->view('report/salesDetail-detailExporter',$data);	
	} 
	
	//销售汇总表（按商品）
	public function sales_summary() {
	    $this->common_model->checkpurview(34);
		$this->load->view('report/sales-summary');	
	}
	
	//销售汇总表（按商品）接口
	public function salesDetail_inv() {
	    $this->common_model->checkpurview(34);
	    $v = array();
		$sum1 = $sum2 = $sum3 = $sum4 = $sum5 = $sum6 = $sum7 = 0;
	    $data['status'] = 200;
		$data['msg']    = 'success';
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100); 
		$profit     = intval($this->input->get_post('profit',TRUE));
		$salesId    = str_enhtml($this->input->get_post('salesId',TRUE));
	    $storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$customerNo = str_enhtml($this->input->get_post('customerNo',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$beginDate  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate    = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and a.billType="SALE"';
		$where .= $salesId ? ' and e.number  in('.str_quote($salesId).')' : ''; 
		$where .= $storageNo ? ' and d.locationNo in('.str_quote($storageNo).')' : ''; 
		$where .= $customerNo ? ' and c.number in('.str_quote($customerNo).')' : ''; 
		$where .= $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 
		$offset = $rows * ($page-1);
		$data['data']['page']      = $page;
		$data['data']['records']   = $this->data_model->get_invoice_info_sum($where.' group by a.invId, a.locationId',3);  //总条数
		$data['data']['total']     = ceil($data['data']['records']/$rows);              //总分页数
		$list  = $this->data_model->get_invoice_info_sum($where.' group by invId, locationId'); 
		if ($profit==1) {
			$info  = $this->data_model->get_invoice_info_ini('and billDate<="'.$endDate.'" group by invId');   
		}
		foreach ($list as $arr=>$row) {

		    $sum1 += $qty = $row['qty']>0 ? -abs($row['qty']):abs($row['qty']);   //销售在数据库中是负数 在统计的时候应该是正数
			$sum3 += $amount = $row['amount'];                      //销售收入
			$unitPrice = $qty!=0 ? $amount/$qty : 0;                //单位成本
			if ($profit==1) {
				$sum4 += $unitcost = isset($info['inunitcost'][$row['invId']]) ? $info['inunitcost'][$row['invId']] : 0;   //单位成本
				$sum5 += $cost = $unitcost * $qty;               //销售成本
				$sum6 += $saleProfit = $amount - $cost;          //销售毛利
				$sum7 += $salepPofitRate = $amount>0 ? ($saleProfit/$amount)*100 :0;                    //销售毛利率
			}
			
			$v[$arr]['billId']        = intval($row['id']);
		    $v[$arr]['billNo']        = $row['billNo'];
			$v[$arr]['billType']      = $row['billType']; 
			$v[$arr]['date']          = $row['billDate']; 
			$v[$arr]['buId']          = intval($row['buId']);
			$v[$arr]['buName']        = $row['contactName'];
			$v[$arr]['invNo']         = $row['invNumber'];  
			$v[$arr]['invName']       = $row['invName'];   
			$v[$arr]['spec']          = $row['invSpec']; 
			$v[$arr]['unit']          = $row['mainUnit']; 
			$v[$arr]['location']      = $row['locationName']; 
			$v[$arr]['locationNo']    = $row['locationNo']; 
			$v[$arr]['skuId']         = 0; 
			if ($profit==1) {
				$v[$arr]['cost']          = str_money($cost,2);
				$v[$arr]['unitCost']      = str_money($unitcost,2);
				$v[$arr]['saleProfit']    = str_money($saleProfit,2);
				$v[$arr]['salepPofitRate']= round($salepPofitRate,2).'%';
			}
			$v[$arr]['salesName']     = $row['salesName'];
			$v[$arr]['transType']     = $row['transTypeName'];
			$v[$arr]['qty']           = str_money($qty,$this->systems['qtyPlaces']); 
		    $v[$arr]['amount']        = str_money($amount,2); 
			$v[$arr]['unitPrice']     = str_money($unitPrice,2);  
		}
		$data['data']['rows']      = $v;
		$data['data']['userdata']['billId']      = 0;
		$data['data']['userdata']['billType']    = 'SALE';
		$data['data']['userdata']['skuId']       = 0;
		$data['data']['userdata']['qty']         = str_money($sum1,$this->systems['qtyPlaces']);
		$data['data']['userdata']['unitPrice']   = $sum1>0 ? $sum3/$sum1 : 0; 
		$data['data']['userdata']['amount']      = str_money($sum3,2);
		if ($profit==1) {
			$data['data']['userdata']['cost']        = str_money($sum5,2);
			$data['data']['userdata']['unitCost']    = str_money($sum4,2);
			$data['data']['userdata']['saleProfit']      = str_money($sum6,2);
			$data['data']['userdata']['salepPofitRate']  = round($sum7,2).'%';
		}
		die(json_encode($data));
	}
	
	//销售汇总表（按商品）导出
	public function salesDetail_invExporter() {
	    $this->common_model->checkpurview(35);
		$name = 'sales_inv_summary_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('导出销售汇总表(按商品):'.$name);
		$data['profit'] = $profit     = intval($this->input->get_post('profit',TRUE));
		$salesId    = str_enhtml($this->input->get_post('salesId',TRUE));
	    $storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$customerNo = str_enhtml($this->input->get_post('customerNo',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$data['beginDate']  = $beginDate  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = $endDate    = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and a.billType="SALE"';
		$where .= $salesId ? ' and e.number  in('.str_quote($salesId).')' : ''; 
		$where .= $storageNo ? ' and d.locationNo in('.str_quote($storageNo).')' : ''; 
		$where .= $customerNo ? ' and c.number in('.str_quote($customerNo).')' : ''; 
		$where .= $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 

		$data['list'] = $this->data_model->get_invoice_info_sum($where.' group by invId, locationId'); 
		if ($profit==1) {
			$data['info']  = $this->data_model->get_invoice_info_ini('and billDate<="'.$endDate.'" group by invId');   
		}
		$this->load->view('report/salesDetail_invExporter',$data);	
	}
	
	//销售汇总表（按客户）
	public function sales_summary_customer_new() {
	    $this->common_model->checkpurview(37);
		$this->load->view('report/sales-summary-customer-new');	
	}
	
	//销售汇总表（按客户接口）
	public function salesDetail_customer() {
	    $this->common_model->checkpurview(37);
	    $v = array();
		$sum1 = $sum2 = $sum3 = $sum4 = $sum5 = $sum6 = $sum7 = 0;
	    $data['status'] = 200;
		$data['msg']    = 'success';
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100); 
		$profit     = intval($this->input->get_post('profit',TRUE));
		$salesId    = str_enhtml($this->input->get_post('salesId',TRUE));
	    $storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$customerNo = str_enhtml($this->input->get_post('customerNo',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$beginDate  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate    = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and a.billType="SALE"';
		$where .= $salesId ? ' and e.number  in('.str_quote($salesId).')' : ''; 
		$where .= $storageNo ? ' and d.locationNo in('.str_quote($storageNo).')' : ''; 
		$where .= $customerNo ? ' and c.number in('.str_quote($customerNo).')' : ''; 
		$where .= $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 

		$list   = $this->data_model->get_invoice_info_sum($where.' group by buId,invId,locationId'); 
		if ($profit==1) {
			$info  = $this->data_model->get_invoice_info_ini('and billDate<="'.$endDate.'" group by invId');   
		}
		foreach ($list as $arr=>$row) {
		    $sum1 += $qty = $row['qty']>0 ? -abs($row['qty']):abs($row['qty']);   //销售在数据库中是负数 在统计的时候应该是正数
			$sum3 += $amount = $row['amount'];                      //销售收入
			$unitPrice = $qty!=0 ? $amount/$qty : 0;                //单位成本
			if ($profit==1) {
				$sum4 += $unitcost = isset($info['inunitcost'][$row['invId']]) ? $info['inunitcost'][$row['invId']] : 0;   //单位成本
				$sum5 += $cost = $unitcost * $qty;               //销售成本
				$sum6 += $saleProfit = $amount - $cost;          //销售毛利
				$sum7 += $salepPofitRate = ($saleProfit/$amount)*100;                    //销售毛利率
			}
			$v[$arr]['billId']        = intval($row['iid']);
		    $v[$arr]['billNo']        = $row['billNo'];
			$v[$arr]['billType']      = $row['billType']; 
			$v[$arr]['date']          = $row['billDate']; 
			$v[$arr]['buId']          = intval($row['buId']);
			$v[$arr]['buName']        = $row['contactName'];
			$v[$arr]['invNo']         = $row['invNumber'];  
			$v[$arr]['invName']       = $row['invName'];   
			$v[$arr]['spec']          = $row['invSpec']; 
			$v[$arr]['unit']          = $row['mainUnit']; 
			$v[$arr]['location']      = $row['locationName']; 
			$v[$arr]['locationNo']    = $row['locationNo']; 
			$v[$arr]['baseQty']       = 0; 
			$v[$arr]['skuId']         = 0; 
			if ($profit==1) {
				$v[$arr]['cost']          = str_money($cost,2);
				$v[$arr]['unitCost']      = str_money($unitcost,2);
				$v[$arr]['saleProfit']    = str_money($saleProfit,2);
				$v[$arr]['salepPofitRate']= round($salepPofitRate,2);
			}
			$v[$arr]['salesName']     = $row['salesName'];
			$v[$arr]['transType']     = $row['transTypeName'];
			$v[$arr]['qty']           = str_money($qty,$this->systems['qtyPlaces']); 
		    $v[$arr]['amount']        = str_money($amount,2); 
			$v[$arr]['unitPrice']     = str_money($unitPrice,2); 
		}
		$data['data']['list']      = $v;
		$data['data']['total']['amount']      = '';
		$data['data']['total']['baseQty']     = 'SALE';
		$data['data']['total']['billId']      = '';
		$data['data']['total']['billNo']      = '';
		$data['data']['total']['billType']    = '';
		$data['data']['total']['buName']      = '';
		$data['data']['total']['buNo']        = '';
		$data['data']['total']['date']        = '';
		$data['data']['total']['invName']     = '';
		$data['data']['total']['location']    = '';
		$data['data']['total']['locationNo']  = '';
		$data['data']['total']['spec']        = '';
		$data['data']['total']['unit']        = '';
		$data['data']['total']['transType']   = '';
		$data['data']['total']['skuId']       = '';
		
		$data['data']['total']['qty']         = str_money($sum1,$this->systems['qtyPlaces']);
		$data['data']['total']['unitPrice']   = $sum1>0 ? $sum3/$sum1 : 0; 
		$data['data']['total']['amount']      = str_money($sum3,2);
        if ($profit==1) {
			$data['data']['total']['cost']        = str_money($sum5,2);
			$data['data']['total']['unitCost']    = str_money($sum4,2);
			$data['data']['total']['saleProfit']      = str_money($sum6,2);
			$data['data']['total']['salepPofitRate']  = round($sum7,2);
		}
		die(json_encode($data));
	}
	

	//销售汇总表（按客户)导出
	public function salesDetail_customerExporter() {
	    $this->common_model->checkpurview(38);
		$name = 'sales_customer_summary_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('导出销售汇总表(按客户):'.$name);
		$data['profit'] = $profit     = intval($this->input->get_post('profit',TRUE));
		$salesId    = str_enhtml($this->input->get_post('salesId',TRUE));
	    $storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$customerNo = str_enhtml($this->input->get_post('customerNo',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$data['beginDate']  = $beginDate  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = $endDate    = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and a.billType="SALE"';
		$where .= $salesId ? ' and e.number  in('.str_quote($salesId).')' : ''; 
		$where .= $storageNo ? ' and d.locationNo in('.str_quote($storageNo).')' : ''; 
		$where .= $customerNo ? ' and c.number in('.str_quote($customerNo).')' : ''; 
		$where .= $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : '';
		
		$data['list'] = $this->data_model->get_invoice_info_sum($where.' group by invId, locationId'); 
		if ($profit==1) {
			$data['info']  = $this->data_model->get_invoice_info_ini('and billDate<="'.$endDate.'" group by invId');   
		}
		$this->load->view('report/salesDetail-customerExporter',$data);	
	}
	
	
	//往来单位欠款表
	public function contact_debt_new() {
	    $this->common_model->checkpurview(49);
		$this->load->view('report/contact-debt-new');	
	}
	
	//往来单位欠款表(接口)
	public function contactDebt_detail() {
	    $this->common_model->checkpurview(49);
		$v = array();
		$sum1 = $sum2 = 0;
	    $data['status'] = 200;
		$data['msg']    = 'success';
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100); 
		$matchCon  = str_enhtml($this->input->get_post('matchCon',TRUE));
		$supplier  = str_enhtml($this->input->get_post('supplier',TRUE));
		$customer  = str_enhtml($this->input->get_post('customer',TRUE));
		$where = '';
		if ($supplier && $customer) {
		} else {
			$where .= $supplier ? ' and type=10' : '';
			$where .= $customer ? ' and type=-10' : '';
		}
		$where .= $matchCon ? ' and (name like "%'.$matchCon.'%" or number like "%'.$matchCon.'%")' : '';
		$list = $this->data_model->get_contact('',$where. ' order by type desc');
		foreach ($list as $arr=>$row) {
		    $v[$arr]['dbid']        = 0;
			$v[$arr]['debt']        = 0; 
			$v[$arr]['displayName'] = $row['type']==10 ? '供应商' : '客户'; 
			$v[$arr]['buId']        = intval($row['id']);
			$v[$arr]['name']        = $row['name'];
			$v[$arr]['number']      = $row['number'];   
			$sum1 += $v[$arr]['payable']     = $row['type']==10  ? $row['amount'] : 0; 
			$sum2 += $v[$arr]['receivable']  = $row['type']==-10 ? $row['amount'] : 0; 
			$v[$arr]['type']        = $row['type']; 
		}
		$data['data']['list']      = $v;
		$data['data']['total']['buid']        = 0;
		$data['data']['total']['dbid']        = 0;
		$data['data']['total']['debt']        = '';
		$data['data']['total']['displayName'] = '';
		$data['data']['total']['name']        = '';
		$data['data']['total']['number']      = '';
		$data['data']['total']['payable']     = $sum1;
		$data['data']['total']['receivable']  = $sum2;
		$data['data']['total']['type']        = '';
		die(json_encode($data));
	}
	
	//往来单位欠款表导出
	public function contactDebt_exporter() {
	    $this->common_model->checkpurview(50);
		$name = 'contact_debt_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('导出往来单位欠款表:'.$name);
		$matchCon  = str_enhtml($this->input->get_post('matchCon',TRUE));
		$supplier  = str_enhtml($this->input->get_post('supplier',TRUE));
		$customer  = str_enhtml($this->input->get_post('customer',TRUE));
		$where = '';
		if ($supplier && $customer) {
		} else {
			$where .= $supplier ? ' and type=10' : '';
			$where .= $customer ? ' and type=-10' : '';
		}
		$where .= $matchCon ? ' and (name like "%'.$matchCon.'%" or number like "%'.$matchCon.'%")' : '';
		$data['list'] = $this->data_model->get_contact('',$where. ' order by type desc');
		$this->load->view('report/contactDebt-exporter',$data);	
	}
	
	
	//商品库存余额表
	public function goods_balance() {
	    $this->common_model->checkpurview(40);
		$this->load->view('report/goods-balance');	
	}
	
    //商品库存余额表(接口)
	public function invBalance() {
	    $this->common_model->checkpurview(40);
	    $i = 2;
		$select = '';
		$qty_1  = $cost_1 = 0;
		$stoNames = array();
		$colNames = array();
		$colIndex = array();
		$catId      = str_enhtml($this->input->get_post('catId',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$endDate    = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' ';
		$where .= $catId>0 ? ' and b.categoryId='.$catId.'' : ''; 
		$where .= $goodsNo ? ' and b.number="'.$goodsNo.'"' : ''; 
		$where .= $storageNo ? ' and c.locationNo="'.$storageNo.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 
		$where1 = $storageNo ? ' and locationNo="'.$storageNo.'"' : ''; 
		$storage    = $this->mysql_model->get_results(STORAGE,'(isDelete=0) '.$where1);
		foreach($storage as $arr=>$row) {
		    $qty['qty'.$i]  = 0;
		    $stoNames[] = $row['name'];
			$colNames[] = '数量';
			$colIndex[] = 'qty_'.$i;
			$select .= 'sum(case when a.locationId='.$row['id'].' then qty else 0 end ) as qty'.$i.',';
		$i++;
		}
		array_unshift($stoNames,'所有仓库');
		array_unshift($colNames,'商品编号','商品名称','规格型号','单位','数量','成本');
		array_unshift($colIndex,'invNo','invName','spec','unit','qty_1','cost_1');
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$data['data']['stoNames'] = $stoNames;
		$data['data']['colNames'] = $colNames;
		$data['data']['colIndex'] = $colIndex;
		$data['data']['total'] = 1;
		$data['data']['page']  = 1;
		$data['data']['records'] = 200;
		$v = array();
		$cost   = $this->data_model->get_invoice_info_ini('and billDate<="'.date('Y-m-d').'" group by invId');   
		$list   = $this->data_model->get_invBalance($where.' group by a.invId',$select); 
		foreach ($list as $arr=>$row) {
		    $unitcost = isset($cost['inunitcost'][$row['invId']]) ? $cost['inunitcost'][$row['invId']] : 0;   //单位成本
			$v[$arr]['invNo']         = $row['invNumber'];  
			$v[$arr]['invName']       = $row['invName'];   
			$v[$arr]['spec']          = $row['invSpec']; 
			$v[$arr]['unit']          = $row['mainUnit']; 
			$v[$arr]['qty_1']         = str_money($row['qty'],$this->systems['qtyPlaces']);  
			$v[$arr]['cost_1']        = str_money($row['qty'] * $unitcost,2);  
			$qty_1  += $row['qty'];  
			$cost_1 += $row['qty'] * $unitcost;   
			$i = 2;
			foreach($storage as $arr1=>$row1) {
				$v[$arr]['qty_'.$i]   = str_money($row['qty'.$i],$this->systems['qtyPlaces']);  
				$qty['qty'.$i] += $row['qty'.$i];
			$i++;
			}
		}
		$data['data']['rows']  = $v;
		$data['data']['userdata']['invNo']    = '';
		$data['data']['userdata']['invName']  = '';
		$data['data']['userdata']['spec']     = '';
		$data['data']['userdata']['unit']     = '';
		$data['data']['userdata']['qty_1']    = str_money($qty_1,$this->systems['qtyPlaces']);  
		$data['data']['userdata']['cost_1']   = str_money($cost_1,2); 
		$i = 2;
		foreach($storage as $arr1=>$row1) {
			$data['data']['userdata']['qty_'.$i]  = str_money($qty['qty'.$i],$this->systems['qtyPlaces']);  
		$i++;
		}
		die(json_encode($data));
	}
	
	
	//商品库存余额表(导出)
	public function invBalance_exporter() {
	    $this->common_model->checkpurview(41);
		sys_csv('inv_balance_'.date('YmdHis').'.xls');
		$i = 2;
		$select = '';
		$catId      = str_enhtml($this->input->get_post('catId',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$data['beginDate'] = $beginDate  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']   = $endDate    = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = '';
		$where .= $catId>0 ? ' and b.categoryId='.$catId.'' : ''; 
		$where .= $goodsNo ? ' and b.number="'.$goodsNo.'"' : ''; 
		$where .= $storageNo ? ' and c.locationNo="'.$storageNo.'"' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 
		$where1 = $storageNo ? ' and locationNo="'.$storageNo.'"' : ''; 
		$data['cost']  = $this->data_model->get_invoice_info_ini('and billDate<="'.date('Y-m-d').'" group by invId');   
		$data['storage'] = $storage = $this->mysql_model->get_results(STORAGE,'(isDelete=0) '.$where1);
		foreach($storage as $arr=>$row) {
			$select .= 'sum(case when a.locationId='.$row['id'].' then qty else 0 end ) as qty'.$i.',';
		    $i++;
		}
		$data['list']   = $this->data_model->get_invBalance($where.' group by a.invId',$select); 
		$this->load->view('report/invBalance_exporter',$data);	
	}
	
	//商品收发明细表
	public function goods_flow_detail() {
	    $this->common_model->checkpurview(43);
		$this->load->view('report/goods-flow-detail');	
	}
	
 
	//商品收发明细表(接口)
	public function deliverDetail() {
	    $this->common_model->checkpurview(43);
	    $v = array();
		$sum1 = $sum2 = $sum3 = $sum4 = 0;
		$where = '';
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100); 
	    $storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$beginDate  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate    = str_enhtml($this->input->get_post('endDate',TRUE));
		
		$where1 =  $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 
		$where1 .= $storageNo ? ' and c.locationNo in('.str_quote($storageNo).')' : ''; 
		$where1 .= $endDate ? ' and a.billDate<="'.$endDate.'"' : '';
		
		$where2 = ' and a.transType>0';
		$where2 .= $storageNo ? ' and d.locationNo in('.str_quote($storageNo).')' : ''; 
		$where2 .= $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 
		$where2 .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : '';
		$where2 .= $endDate ? ' and a.billDate<="'.$endDate.'"' : '';
		$data['data']['page']      = $page;
		$data['data']['records']   = 1;   
		$data['data']['total']     = ceil($data['data']['records']/$rows); 
		$list0   = $this->data_model->get_goods_ini($where1,$beginDate,$endDate,1);
		$list1   = $this->data_model->get_goods_ini($where1.' group by a.invId',$beginDate,$endDate);                      
		$list2   = $this->data_model->get_invoice_info($where2.' order by a.billDate,a.id'); 
		foreach ($list1 as $arr=>$row) {
		    $totalqty = $row['qty'] - $row['qty1'];
		    $v[$arr]['date']          = '';  
			$v[$arr]['billNo']        = '';  
			$v[$arr]['billId']        = '';  
			$v[$arr]['billType']      = '';  
			$v[$arr]['buName']        = '';  
			$v[$arr]['transType']     = '期初余额';  
			$v[$arr]['transTypeId']   = '';  
			$v[$arr]['invNo']         = $row['invNumber'];  
			$v[$arr]['invName']       = $row['invName']; 
			$v[$arr]['spec']          = ''; 
			$v[$arr]['unit']          = ''; 
			$v[$arr]['entryId']       = ''; 
			$v[$arr]['location']      = ''; 
			$v[$arr]['locationNo']    = ''; 
			$v[$arr]['inout']         = 0;
			$v[$arr]['qty']           = '';
			$v[$arr]['baseQty']       = '';
			$v[$arr]['inqty']         = '';
			$v[$arr]['outqty']        = '';
			$v[$arr]['totalqty']      = str_money($totalqty,$this->systems['qtyPlaces']);

			foreach ($list2 as $arr1=>$row1) {
			    $arr = time() + $arr1;
				if ($row['invId']==$row1['invId']) {
					$inqty         = $row1['qty']>0 ? abs($row1['qty']) : ''; //入库
					$outqty        = $row1['qty']<0 ? abs($row1['qty']) : '';  //出库
					$sum1   += $inqty;             //入库数量累加
					$sum2   += $outqty;            //出库数量累加
					$sum3   += $inqty;             //合计入库数量
					$sum4   += $outqty;            //合计出库数量
					$totalqtys   = $totalqty  + $sum1 - $sum2; //结存
					$v[$arr]['date']          = $row1['billDate'];  
					$v[$arr]['billNo']        = $row1['billNo'];  
					$v[$arr]['billId']        = $row1['iid'];  
					$v[$arr]['billType']      = $row1['billType'];  
					$v[$arr]['buName']        = $row1['contactName'];  
					$v[$arr]['transType']     = $row1['transTypeName'];  
					$v[$arr]['transTypeId']   = $row1['transType'];  
					$v[$arr]['invNo']         = $row1['invNumber'];  
					$v[$arr]['invName']       = $row1['invName'];   
					$v[$arr]['spec']          = $row1['invSpec']; 
					$v[$arr]['unit']          = $row1['mainUnit']; 
					$v[$arr]['entryId']       = ''; 
					$v[$arr]['location']      = $row1['locationName']; 
					$v[$arr]['locationNo']    = $row1['locationNo']; 
					$v[$arr]['inout']         = 0;
					$v[$arr]['qty']           = 0;
					$v[$arr]['baseQty']       = 0;
					$v[$arr]['unitCost']      = 0;
					$v[$arr]['cost']          = 0;
					$v[$arr]['inqty']         = str_money($inqty,$this->systems['qtyPlaces']);
					$v[$arr]['outqty']        = str_money($outqty,$this->systems['qtyPlaces']);
					$v[$arr]['totalqty']      = str_money($totalqtys,$this->systems['qtyPlaces']);
				}
			}
			$totalqty   = $sum1 = $sum2 =  0; //初始化
		}
		$data['data']['rows']    = array_values($v);
		$data['data']['userdata']['date']       = '';
		$data['data']['userdata']['billNo']     = '';
		$data['data']['userdata']['billId']     = '';
		$data['data']['userdata']['billType']   = '';
		$data['data']['userdata']['buName']     = '';
		$data['data']['userdata']['type']       = '';
		$data['data']['userdata']['transTypeId']= '';
		$data['data']['userdata']['invNo']      = '';
		$data['data']['userdata']['invName']    = '';
		$data['data']['userdata']['spec']       = '';
		$data['data']['userdata']['unit']       = '';
		$data['data']['userdata']['location']   = '';
		$data['data']['userdata']['locationNo'] = '';
		$data['data']['userdata']['inout']      = '';
		$data['data']['userdata']['qty']        = 0;
		$data['data']['userdata']['baseQty']    = '';
		$data['data']['userdata']['unitCost']   = '';
		$data['data']['userdata']['cost']       = '';
		$data['data']['userdata']['cost_5']     = '';
		$data['data']['userdata']['inqty']      = str_money($sum3,$this->systems['qtyPlaces']);
		$data['data']['userdata']['outqty']     = str_money($sum4,$this->systems['qtyPlaces']);
		$data['data']['userdata']['totalqty']   = count($list0)>0 ? str_money($list0['qty'],$this->systems['qtyPlaces']) :0;
		die(json_encode($data));
	}
	
	//商品收发明细表(导出)
	public function deliverDetail_exporter() {
	    $this->common_model->checkpurview(44);
		$name = 'deliver_Detail_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('商品收发明细表导出:'.$name); 
	    $storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$data['beginDate'] = $beginDate  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']   = $endDate    = str_enhtml($this->input->get_post('endDate',TRUE));
		$where1 =  $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 
		$where1 .= $storageNo ? ' and c.locationNo in('.str_quote($storageNo).')' : ''; 
		$where1 .= $endDate ? ' and a.billDate<="'.$endDate.'"' : '';
		
		$where2 = ' and a.transType>0';
		$where2 .= $storageNo ? ' and d.locationNo in('.str_quote($storageNo).')' : ''; 
		$where2 .= $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 
		$where2 .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : '';
		$where2 .= $endDate ? ' and a.billDate<="'.$endDate.'"' : '';
		$data['list0']   = $this->data_model->get_goods_ini($where1,$beginDate,$endDate,1);
		$data['list1']   = $this->data_model->get_goods_ini($where1.' group by a.invId',$beginDate,$endDate);                      
		$data['list2']   = $this->data_model->get_invoice_info($where2.' order by a.billDate,a.id'); 
		$this->load->view('report/deliverDetail-exporter',$data);	
	}
	
	//商品收发汇总表
	public function goods_flow_summary() {
	    $this->common_model->checkpurview(46);
		$this->load->view('report/goods-flow-summary');	
	}
	
	 
	
	//商品收发汇总表接口
	public function deliverSummary() {
	    $this->common_model->checkpurview(46);
	    $v = array();
		for ($i=0;$i<15;$i++) {
			$sum['qty'.$i]  = 0;  
			$sum['cost'.$i] = 0;  
		}
		$qty7   = $qty_7   = $qty13  = $qty_13 = 0; 
		$cost7  = $cost_7  = $cost13 = $cost_13 = 0; 
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100); 
		$storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$beginDate  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate    = str_enhtml($this->input->get_post('endDate',TRUE));
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$data['data']['stoNames'] = array("期初","调拨入库","普通采购","销售退回","盘盈","其他入库","成本调整","入库合计","调拨出库","采购退回","普通销售","盘亏","其他出库","出库合计","结存");
		$data['data']['colNames'] = array("商品编号","商品名称","规格型号","单位","仓库","数量","成本","数量","成本","数量","成本","数量","成本","数量","成本","数量","成本","数量","成本","数量","成本","数量","成本","数量","成本","数量","成本","数量","成本","数量","成本","数量","成本","数量","成本");
		$data['data']['colIndex'] = array("invNo","invName","spec","unit","locationNo","qty_0","cost_0","qty_1","cost_1","qty_2","cost_2","qty_3","cost_3","qty_4","cost_4","qty_5","cost_5","qty_6","cost_6","qty_7","cost_7","qty_8","cost_8","qty_9","cost_9","qty_10","cost_10","qty_11","cost_11","qty_12","cost_12","qty_13","cost_13","qty_14","cost_14");
		$where  = ' ';
		$where .= $storageNo ? ' and d.locationNo in('.str_quote($storageNo).')' : ''; 
		$where .= $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : '';
		$data['data']['page']      = $page;
		$data['data']['records']   = 1;   
		$data['data']['total']     = ceil($data['data']['records']/$rows);  
		$info  = $this->data_model->get_invoice_info_ini('and billDate<="'.$endDate.'" group by invId');     
		$list  = $this->data_model->get_deliverSummary($where.' group by a.invId,a.locationId',$beginDate,$endDate); 
		foreach ($list as $arr=>$row) {
		    $unitcost = isset($info['inunitcost'][$row['invId']]) ? $info['inunitcost'][$row['invId']] : 0;   //单位成本
		     //期初数量
		    $qty_0      = $row['qty0']; 
			 
			$cost_0     = $qty_0 * $unitcost;        //期初成本 = 期初数量*单位成本 
			
		    //结存数量
		    $qty_14    = $row['qty14'];             //结存数量
 
			$cost_14   = $qty_14 * $unitcost;       //结存成本 =  结存数量*单位成本 

		    for ($i=1;$i<7;$i++) {
			    if ($i==1) {                          //调拨  成本另计算
				    $qty_7  += abs($row['qty1']);   
					$cost_7 += abs($row['qty1']) * $unitcost; 
				} else {
					$qty_7  += abs($row['qty'.$i]);   
				    $cost_7 += abs($row['cost'.$i]);   
				}
			}
			for ($i=8;$i<13;$i++) {
				if ($i==10 || $i==11 || $i==12 || $i==8) {       //销售、盘亏、其他出库  成本另计算
				    $qty_13  += abs($row['qty'.$i]);   
					$cost_13 += abs($row['qty'.$i]) * $unitcost;  
				} else {
					$qty_13  += abs($row['qty'.$i]);   
					$cost_13 += abs($row['cost'.$i]);   
				}
			}
		
			$v[$arr]['invNo']         = $row['invNumber'];  
			$v[$arr]['invName']       = $row['invName'];   
			$v[$arr]['spec']          = $row['invSpec']; 
			$v[$arr]['unit']          = $row['mainUnit']; 
			$v[$arr]['location']      = $row['locationName']; 
			$v[$arr]['locationNo']    = $row['locationNo'];
			for ($i=0; $i<15; $i++) {
			    if ($i==0) {
				    $v[$arr]['qty_0']     = str_money($qty_0,$this->systems['qtyPlaces']);    //期初数量
			        $v[$arr]['cost_0']    = str_money($cost_0,2);    
					$sum['qty0']  += $qty_0;                //期初数量
			        $sum['cost0'] += $cost_0;                                    
				} elseif($i==7) {
				    $v[$arr]['qty_7']    = str_money($qty_7,$this->systems['qtyPlaces']);         //入库合计 
				    $v[$arr]['cost_7']   = str_money($cost_7,2);    
					$sum['qty7']  += $qty_7;             
			        $sum['cost7'] += $cost_7;     
				} elseif($i==13) {
				    $v[$arr]['qty_13']   = str_money($qty_13,$this->systems['qtyPlaces']);        //出库合计 
				    $v[$arr]['cost_13']  = str_money($cost_13,2);    
					$sum['qty13']  += $qty_13;            
			        $sum['cost13'] += $cost_13;    
				} elseif($i==14) {                                   
				    $v[$arr]['qty_14']   = str_money($qty_14,$this->systems['qtyPlaces']);        //结存合计 
				    $v[$arr]['cost_14']  = str_money($cost_14,2);  
					$sum['qty14']  += $qty_14;            
			        $sum['cost14'] += $cost_14;   
				} else {
				    if ($i==10 || $i==11 || $i==12 || $i==1 || $i==8) {  //销售、盘亏、其他出库、入库调拨、出库调拨  成本另计算
						$v[$arr]['qty_'.$i]   = str_money(abs($row['qty'.$i]),$this->systems['qtyPlaces']);  
					    $v[$arr]['cost_'.$i]  = str_money(abs($row['qty'.$i]) * $unitcost,2);
						$sum['qty'.$i]  += abs($row['qty'.$i]);            
			            $sum['cost'.$i] += abs($row['qty'.$i]) * $unitcost14;  
					} else { 
						$v[$arr]['qty_'.$i]   = str_money(abs($row['qty'.$i]),$this->systems['qtyPlaces']);   
					    $v[$arr]['cost_'.$i]  = str_money(abs($row['cost'.$i]),2); 
						$sum['qty'.$i]  += abs($row['qty'.$i]);            
			            $sum['cost'.$i] += abs($row['cost'.$i]);  
					}
				}
			}
			$qty_7 = $cost_7 = $qty_13 = $cost_13 = 0;         //停止累加 初始化值
		}
		
		$data['data']['rows']    = $v;
		$data['data']['userdata']['invNo']      = '';
		$data['data']['userdata']['invName']    = '';
		$data['data']['userdata']['spec']       = '';
		$data['data']['userdata']['unit']       = '';
		$data['data']['userdata']['location']   = '';
		$data['data']['userdata']['locationNo'] = '';
		for ($i=0;$i<15;$i++) {
			$data['data']['userdata']['qty_'.$i]   = str_money($sum['qty'.$i],$this->systems['qtyPlaces']);   
			$data['data']['userdata']['cost_'.$i]  = str_money($sum['cost'.$i],2); 
		}
		die(json_encode($data));
	}
	
	
	//商品收发汇总表(导出)
	public function deliverSummary_exporter() {
	    $this->common_model->checkpurview(47);
		$name = 'deliver_summary_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('商品收发汇总表导出:'.$name); 
		$storageNo  = str_enhtml($this->input->get_post('storageNo',TRUE));
		$goodsNo    = str_enhtml($this->input->get_post('goodsNo',TRUE));
		$data['beginDate'] = $beginDate  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']   = $endDate    = str_enhtml($this->input->get_post('endDate',TRUE));
		$where  = ' ';
		$where .= $storageNo ? ' and d.locationNo in('.str_quote($storageNo).')' : ''; 
		$where .= $goodsNo ? ' and b.number in('.str_quote($goodsNo).')' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : '';
		$data['info']   = $this->data_model->get_invoice_info_ini('and billDate<="'.$endDate.'" group by invId');     
		$data['list']   = $this->data_model->get_deliverSummary($where.' group by a.invId,a.locationId',$beginDate,$endDate); 
		//$data['info1']  = $this->data_model->get_invoice_info_ini('and billDate<"'.$beginDate.'" group by invId,locationId');   
//		$data['info2']  = $this->data_model->get_invoice_info_ini('and billDate<="'.$endDate.'" group by invId,locationId');   
//		$data['info3']  = $this->data_model->get_deliverSummary($where.' group by a.invId,a.locationId'); 
//		$data['list']   = $this->data_model->get_invoice_info(' and a.billDate<="'.$endDate.'" group by a.invId,a.locationId'); 
		$this->load->view('report/deliverSummary-exporter',$data);	
	}
	
	 
	//现金银行报表
	public function cash_bank_journal_new() {
	    $this->common_model->checkpurview(106);
	    $data['accountNo']  = $accountNo   = intval($this->input->get_post('accountNo',TRUE));
		$data['beginDate']  = $beginDate   = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = $endDate     = str_enhtml($this->input->get_post('endDate',TRUE));
		$this->load->view('report/cash-bank-journal-new', $data);	
	}
	
	
	//现金银行报表
	public function bankBalance_detail() {
	    $this->common_model->checkpurview(106);
		$v = array();
		$sum1 = $sum2 = $sum3 = $sum4 = $sum5 = 0;
	    $data['status'] = 200;
		$data['msg']    = 'success';
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100); 
		$accountNo   = str_enhtml($this->input->get_post('accountNo',TRUE));
		$beginDate   = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate     = str_enhtml($this->input->get_post('endDate',TRUE));
		$where1 = $beginDate ? ' and a.billDate>="'.$beginDate.'"' : '';
		$where1 .= $endDate ? ' and a.billDate<="'.$endDate.'"' : '';
		$where1 .= $accountNo ? ' and d.number in('.str_quote($accountNo).')' : ''; 
		$where2 = $accountNo ? ' and a.number in('.str_quote($accountNo).')' : ''; 
		$list1 = $this->data_model->get_account('and billDate<"'.$beginDate.'"',$where2.' order by a.id'); 
		$list2 = $this->data_model->get_account_info($where1.' order by a.billDate');
		foreach ($list1 as $arr=>$row) {
			$v[$arr]['accountName']   = $row['accountName'];
		    $v[$arr]['accountNumber'] = $row['accountNumber'];
			$v[$arr]['billType']      = '期初余额'; 
			$v[$arr]['date']          = '';
			$v[$arr]['buId']          = intval($row['id']);
			$v[$arr]['buName']        = '';
			$v[$arr]['billTypeNo']    = '';
			$v[$arr]['balance']       = $row['amount'];  
			$v[$arr]['billId']        = 0;   
			$v[$arr]['billNo']        = '';   
			$v[$arr]['expenditure']   = 0; 
			$v[$arr]['income']        = 0; 
			$v[$arr]['type']          = 0;   
			foreach ($list2 as $arr1=>$row1) {
			    $arr = time() + $arr1;
			    if ($row['id']==$row1['accId']) {
				    $sum1 += $a1 = $row1['payment']>0 ? abs($row1['payment']) : 0;  //收入
					$sum2 += $a2 = $row1['payment']<0 ? abs($row1['payment']) : 0;  //支出
					$a3 = $row['amount'] + $sum1 - $sum2;
				    $v[$arr]['accountName']   = $row1['accountName'];
					$v[$arr]['accountNumber'] = $row1['accountNumber'];
					$v[$arr]['billType']      = $row1['transTypeName'];
					$v[$arr]['date']          = $row1['billDate']; 
					$v[$arr]['buId']          = intval($row1['buId']);
					$v[$arr]['buName']        = $row1['contactName']; 
					$v[$arr]['billTypeNo']    = '';
					$v[$arr]['balance']       = $a3;  
					$v[$arr]['billId']        = 0;   
					$v[$arr]['billNo']        = $row1['billNo']; ;   
					$v[$arr]['expenditure']   = $a2; 
					$v[$arr]['income']        = $a1; 
					$v[$arr]['type']          = 0;   
				}
			} 
			$sum3 += $sum1;
			$sum4 += $sum2;
			$sum5 += $row['amount'] + $sum1 - $sum2;
			$sum1 = $sum2 = 0;  //初始化
		}
		$data['data']['list']      = array_values($v);
		$data['data']['total']['accountName']    = '';
		$data['data']['total']['accountNumber']  = '';
		$data['data']['total']['balance']        = $sum5;
		$data['data']['total']['billNo']         = '';
		$data['data']['total']['billTypeNo']     = '';
		$data['data']['total']['billId']         = '';
		$data['data']['total']['billType']       = '';
		$data['data']['total']['buName']         = '';
		$data['data']['total']['buNo']           = '';
		$data['data']['total']['date']           = '';
		$data['data']['total']['expenditure']    = $sum4;   //支出
		$data['data']['total']['income']         = $sum3;
		$data['data']['total']['type']           = '';
		$data['data']['params']['startTime']     = '';
		$data['data']['params']['numberFilter']  = '';
		$data['data']['params']['keyword']       = '';
		$data['data']['params']['dbid']          = '';
		$data['data']['params']['endDate']       = $endDate;
		$data['data']['params']['beginDate']     = $beginDate;
		die(json_encode($data));
	}
	
	
	//现金银行报表(导出)
	public function bankBalance_exporter() {
	    $this->common_model->checkpurview(107);
		$name = 'BankBalanc_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('现金银行报表导出:'.$name);
	    $data['accountNo']  = $accountNo   = str_enhtml($this->input->get_post('accountNo',TRUE));
		$data['beginDate']  = $beginDate   = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = $endDate     = str_enhtml($this->input->get_post('endDate',TRUE));
		$where1 = $beginDate ? ' and a.billDate>="'.$beginDate.'"' : '';
		$where1 .= $endDate ? ' and a.billDate<="'.$endDate.'"' : '';
		$where1 .= $accountNo ? ' and d.number in('.str_quote($accountNo).')' : ''; 
		$where2 = $accountNo ? ' and a.number in('.str_quote($accountNo).')' : ''; 
		$data['list1'] = $this->data_model->get_account('and billDate<"'.$beginDate.'"',$where2.' order by a.id'); 
		$data['list2'] = $this->data_model->get_account_info($where1.' order by a.accId desc');
		$this->load->view('report/bankBalance-exporter', $data);	
	}
 
	//应付账款明细表
	public function account_pay_detail_new() {
	    $this->common_model->checkpurview(52);
	    $data['accountNo']  = $accountNo  = intval($this->input->get_post('accountNo',TRUE));
		$data['beginDate']  = $beginDate   = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = $endDate     = str_enhtml($this->input->get_post('endDate',TRUE));
		$this->load->view('report/account-pay-detail-new', $data);	
	}
	 
	//应付账款明细表 
	public function fundBalance_detailSupplier() {
	    $this->common_model->checkpurview(52);
		$sum1 = $sum2 = $sum3 = $sum4 = $sum5 = $sum6 = 0;
	    $data['status'] = 200;
		$data['msg']    = 'success';
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100); 
		$type = intval($this->input->get_post('type',TRUE)); 
		$accountNo   = str_enhtml($this->input->get_post('accountNo',TRUE));
		$beginDate   = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate     = str_enhtml($this->input->get_post('endDate',TRUE));
		$where1 = ' and (billType="PUR" or billType="PAYMENT")';
		$where2 = ' and (a.type=10)';
		$where2 .= $accountNo ? ' and a.number="'.$accountNo.'"' : '';
		$list1 = $this->data_model->get_contact('and billDate<"'.$beginDate.'" '.$where1 ,$where2.' order by a.id');
		$where3 = $beginDate ? ' and a.billDate>="'.$beginDate.'"' : '';
		$where3 .= $endDate ? ' and a.billDate<="'.$endDate.'"' : '';
		$where3 .= ' and (a.billType="PUR" or a.billType="PAYMENT")';
		$list2 = $this->data_model->get_invoice($where3.' order by a.billDate');
		foreach ($list1 as $arr=>$row) {
			$v[$arr]['balance']     = $row['amount'];
		    $v[$arr]['billId']      = 0; 
			$v[$arr]['billNo']      = '期初余额'; 
			$v[$arr]['billType']    = 0;
			$v[$arr]['date']        = '';
			$v[$arr]['billTypeNo']  = 0;
			$v[$arr]['buId']        = 0;
			$v[$arr]['buName']      = $row['name'];
			$v[$arr]['number']      = $row['number'];
			$v[$arr]['transType']   = ''; 
			$v[$arr]['type']        = '';  
			$v[$arr]['expenditure'] = ''; 
			$v[$arr]['income']      = ''; 
			foreach ($list2 as $arr1=>$row1) {
			    $arr = time() + $arr1;
				if ($row['id']==$row1['buId']) {
				    $sum1 += $a1 = $row1['billType']=='PUR' ? $row1['arrears'] : 0;      //采购
					$sum2 += $a2 = $row1['billType']=='PAYMENT' ? abs($row1['arrears']) : 0;  //支付
					$a3 = $row['amount'] + $sum1 - $sum2;
					$v[$arr]['balance']     = $a3;   
					$v[$arr]['billId']      = $row1['id']; 
					$v[$arr]['billNo']      = $row1['billNo']; 
					$v[$arr]['date']        = $row1['billDate'];
					$v[$arr]['billTypeNo']  = $row1['billType'];
					$v[$arr]['buId']        = $row1['buId'];
					$v[$arr]['buName']      = $row1['contactName'];
					$v[$arr]['number']      = $row1['contactNo'];
					$v[$arr]['transType']   = $row1['transTypeName']; 
					$v[$arr]['type']        = -1;  
					$v[$arr]['expenditure'] = $a2; 
					$v[$arr]['income']      = $a1;  
				}
			}
			$sum3 = $row['amount'] + $sum1 - $sum2;
			$arr  = $arr + $row['id'];
			$v[$arr]['balance']     = $sum3;
		    $v[$arr]['billId']      = 0; 
			$v[$arr]['billNo']      = '小计'; 
			$v[$arr]['date']        = '';
			$v[$arr]['billTypeNo']  = 0;
			$v[$arr]['buId']        = 0;
			$v[$arr]['buName']      = '';
			$v[$arr]['number']      = '';
			$v[$arr]['transType']   = ''; 
			$v[$arr]['type']        = -1;  
			$v[$arr]['income']      = $sum1; 
			$v[$arr]['expenditure'] = $sum2; 
			$sum4 += $sum1;
			$sum5 += $sum2;
			$sum6 += $sum3;
		} 
		$data['data']['total']['balance']      = $sum6;
		$data['data']['total']['billId']       = '';
		$data['data']['total']['billNo']       = '';
		$data['data']['total']['billTypeNo']   = '';
		$data['data']['total']['buId']         = '';
		$data['data']['total']['buName']       = '';
		$data['data']['total']['date']         = '';
		$data['data']['total']['income']       = $sum4;
		$data['data']['total']['expenditure']  = $sum5;
		$data['data']['total']['number']       = '';
		$data['data']['total']['transType']    = '';
		$data['data']['total']['type']         = '';
		
		$data['data']['list']                  = isset($v) ? array_values($v) :'';
		 
		$data['data']['params']['startTime']     = '';
		$data['data']['params']['numberFilter']  = '';
		$data['data']['params']['categoryId']    = '';
		$data['data']['params']['keyword']       = '';
		$data['data']['params']['dbid']          = '';
		$data['data']['params']['table']         = '';
		$data['data']['params']['serviceType']   = '';
		$data['data']['params']['customer']      = '';
		$data['data']['params']['type']          = '';
		$data['data']['params']['supplier']      = '';
		$data['data']['params']['endDate']       = $endDate;
		$data['data']['params']['beginDate']     = $beginDate;
		die(json_encode($data)); 
	}
	
	
	//应付账款明细表 (导出)
	public function fundBalance_exporterSupplier() {
	    $this->common_model->checkpurview(53);
		$name = 'pay_balance_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('应付账款明细表导出:'.$name);
		$accountNo   = str_enhtml($this->input->get_post('accountNo',TRUE));
		$data['beginDate']  = $beginDate   = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = $endDate     = str_enhtml($this->input->get_post('endDate',TRUE));
		$where1 = ' and (billType="PUR" or billType="PAYMENT")';
		$where2 = ' and (a.type=10)';
		$where2 .= $accountNo ? ' and a.number="'.$accountNo.'"' : '';
		$data['list1'] = $this->data_model->get_contact('and billDate<"'.$beginDate.'" '.$where1 ,$where2.' order by a.id');
		$where3 = $beginDate ? ' and a.billDate>="'.$beginDate.'"' : '';
		$where3 .= $endDate ? ' and a.billDate<="'.$endDate.'"' : '';
		$where3 .= ' and (a.billType="PUR" or a.billType="PAYMENT")';
		$data['list2'] = $this->data_model->get_invoice($where3.' order by a.billDate');
		$this->load->view('report/fundBalance-exporterSupplier',$data);
	}
	
	
 
	//应收账款明细表
	public function account_proceeds_detail_new() {
	    $this->common_model->checkpurview(55);
	    $data['accountNo']  = $accountNo  = intval($this->input->get_post('accountNo',TRUE));
		$data['beginDate']  = $beginDate   = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = $endDate     = str_enhtml($this->input->get_post('endDate',TRUE));
		$this->load->view('report/account-proceeds-detail-new',$data);	
	}
	
	
	//应收账款明细表
	public function fundBalance_detail() {
	    $this->common_model->checkpurview(55);
		$sum1 = $sum2 = $sum3 = $sum4 = $sum5 = $sum6 = 0;
	    $data['status'] = 200;
		$data['msg']    = 'success';
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100); 
		$type = intval($this->input->get_post('type',TRUE)); 
		$accountNo   = str_enhtml($this->input->get_post('accountNo',TRUE));
		$beginDate   = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate     = str_enhtml($this->input->get_post('endDate',TRUE));
		$where2 = ' and (a.type=-10)';
		$where2 .= $accountNo ? ' and a.number="'.$accountNo.'"' : '';
		$list1 = $this->data_model->get_contact('and (billType="SALE" or billType="RECEIPT") and billDate<"'.$beginDate.'" ' ,$where2.' order by a.id');
		$where3 = $beginDate ? ' and a.billDate>="'.$beginDate.'"' : '';
		$where3 .= $endDate ? ' and a.billDate<="'.$endDate.'"' : '';
		$where3 .= ' and (a.billType="SALE" or a.billType="RECEIPT")';
		$list2 = $this->data_model->get_invoice($where3.' order by a.billDate');
		foreach ($list1 as $arr=>$row) {
			$v[$arr]['balance']     = $row['amount'];
		    $v[$arr]['billId']      = 0; 
			$v[$arr]['billNo']      = '期初余额'; 
			$v[$arr]['billType']    = 0;
			$v[$arr]['date']        = '';
			$v[$arr]['billTypeNo']  = 0;
			$v[$arr]['buId']        = 0;
			$v[$arr]['buName']      = $row['name'];
			$v[$arr]['number']      = $row['number'];
			$v[$arr]['transType']   = ''; 
			$v[$arr]['type']        = '';  
			$v[$arr]['expenditure'] = ''; 
			$v[$arr]['income']      = ''; 
			foreach ($list2 as $arr1=>$row1) {
			    $arr = time() + $arr1;
				if ($row['id']==$row1['buId']) {
				    $sum1 += $a1 = $row1['billType']=='SALE' ? $row1['arrears'] : 0; 
					$sum2 += $a2 = $row1['billType']=='RECEIPT' ? abs($row1['arrears']) : 0; 
					$a3 = $row['amount'] + $sum1 - $sum2;
					$v[$arr]['balance']     = $a3;   
					$v[$arr]['billId']      = $row1['id']; 
					$v[$arr]['billNo']      = $row1['billNo']; 
					$v[$arr]['date']        = $row1['billDate'];
					$v[$arr]['billTypeNo']  = $row1['billType'];
					$v[$arr]['buId']        = $row1['buId'];
					$v[$arr]['buName']      = $row1['contactName'];
					$v[$arr]['number']      = $row1['contactNo'];
					$v[$arr]['transType']   = $row1['transTypeName']; 
					$v[$arr]['type']        = -1;  
					$v[$arr]['expenditure'] = $a2; 
					$v[$arr]['income']      = $a1;  
				}
			}
			$sum3 = $row['amount'] + $sum1 - $sum2;
			$arr  = $arr + $row['id'];
			$v[$arr]['balance']     = $sum3;
		    $v[$arr]['billId']      = 0; 
			$v[$arr]['billNo']      = '小计'; 
			$v[$arr]['date']        = '';
			$v[$arr]['billTypeNo']  = 0;
			$v[$arr]['buId']        = 0;
			$v[$arr]['buName']      = '';
			$v[$arr]['number']      = '';
			$v[$arr]['transType']   = ''; 
			$v[$arr]['type']        = -1;  
			$v[$arr]['income']      = $sum1; 
			$v[$arr]['expenditure'] = $sum2; 
			$sum4 += $sum1;
			$sum5 += $sum2;
			$sum6 += $sum3;
		} 
		$data['data']['total']['balance']      = $sum6;
		$data['data']['total']['billId']       = '';
		$data['data']['total']['billNo']       = '';
		$data['data']['total']['billTypeNo']   = '';
		$data['data']['total']['buId']         = '';
		$data['data']['total']['buName']       = '';
		$data['data']['total']['date']         = '';
		$data['data']['total']['income']       = $sum4;
		$data['data']['total']['expenditure']  = $sum5;
		$data['data']['total']['number']       = '';
		$data['data']['total']['transType']    = '';
		$data['data']['total']['type']         = '';
		
		$data['data']['list']                  = isset($v) ? array_values($v) :'';
		 
		$data['data']['params']['startTime']     = '';
		$data['data']['params']['numberFilter']  = '';
		$data['data']['params']['categoryId']    = '';
		$data['data']['params']['keyword']       = '';
		$data['data']['params']['dbid']          = '';
		$data['data']['params']['table']         = '';
		$data['data']['params']['serviceType']   = '';
		$data['data']['params']['customer']      = '';
		$data['data']['params']['type']          = '';
		$data['data']['params']['supplier']      = '';
		$data['data']['params']['endDate']       = $endDate;
		$data['data']['params']['beginDate']     = $beginDate;
		die(json_encode($data)); 
	}
	
	
	//应收账款明细表(导出)
	public function fundBalance_exporter() {
	    $this->common_model->checkpurview(56);
		$name = 'receive_balance_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('应收账款明细表导出:'.$name);
		$accountNo   = str_enhtml($this->input->get_post('accountNo',TRUE));
		$data['beginDate']  = $beginDate   = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = $endDate     = str_enhtml($this->input->get_post('endDate',TRUE));
		$where1 = ' and (billType="SALE" or billType="RECEIPT")';
		$where2 = ' and (a.type=-10)';
		$where2 .= $accountNo ? ' and a.number="'.$accountNo.'"' : '';
		$data['list1'] = $this->data_model->get_contact('and billDate<"'.$beginDate.'" '.$where1 ,$where2.' order by a.id');
		$where3 = $beginDate ? ' and a.billDate>="'.$beginDate.'"' : '';
		$where3 .= $endDate ? ' and a.billDate<="'.$endDate.'"' : '';
		$where3 .= ' and (a.billType="SALE" or a.billType="RECEIPT")';
		$data['list2'] = $this->data_model->get_invoice($where3.' order by a.billDate');
		$this->load->view('report/fundBalance-exporter',$data);	
	}
	
	
 
	//客户对账单
	public function customers_reconciliation_new() {
	    $this->common_model->checkpurview(109);
	    $data['customerId'] = $customerId  = intval($this->input->get_post('customerId',TRUE));
		$data['customerName']  = str_enhtml($this->input->get_post('customerName',TRUE));
		$data['beginDate']  = $beginDate   = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = $endDate     = str_enhtml($this->input->get_post('endDate',TRUE));
		$this->load->view('report/customers-reconciliation-new',$data);	
	}
	
 
	//客户对账单
	public function customerBalance_detail() {
	    $this->common_model->checkpurview(109);
		$v = array();
		$sum1 = $sum2 = $sum3 = $sum4 = $sum5 = $sum6 = 0;
	    $data['status'] = 200;
		$data['msg']    = 'success';
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100); 
		$showDetail   = str_enhtml($this->input->get_post('showDetail',TRUE));
		$customerId   = intval($this->input->get_post('customerId',TRUE));
		$customerName = str_enhtml($this->input->get_post('customerName',TRUE));
		$beginDate    = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate      = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and (billType="SALE" or billType="RECEIPT")';
		$where .= ' and buId='.$customerId;
		$list1 = $this->data_model->get_contact('and billDate<"'.$beginDate.'"'.$where,' and a.id="'.$customerId.'"',1);
		$where .= $beginDate ? ' and billDate>="'.$beginDate.'"' : '';
		$where .= $endDate ? ' and billDate<="'.$endDate.'"' : '';
		$list2 = $this->mysql_model->get_results(INVOICE,'(isDelete=0) '.$where.' order by id');
		$list3 = $this->data_model->get_invoice_info($where.' order by a.id');
		$arrears = count($list1)>0 ? $list1['amount'] : 0;    //获取期初应收款余额
        $v[0]['amount']        = 0;
	    $v[0]['billId']        = 0; 
		$v[0]['billNo']        = '期初余额'; 
		$v[0]['billType']      = 'BAL'; 
		$v[0]['date']          = '';
		$v[0]['disAmount']     = 0;
		$v[0]['entryId']       = 0; 
		$v[0]['inAmount']      = $arrears;   //期初应收款余额
		$v[0]['invName']       = ''; 
		$v[0]['invNo']         = ''; 
		$v[0]['price']         = '';  
		$v[0]['qty']           = '';  
		$v[0]['spec']          = '';
		$v[0]['rpAmount']      = 0;  
		$v[0]['totalAmount']   = 0;  
		$v[0]['transType']     = '';   
		$v[0]['type']          = -1;   
		$v[0]['unit']          = ''; 
		foreach ($list2 as $arr=>$row) {
		    $arr = $arr + 1;
		    $sum1 += $row['arrears'];              //应收余款
			$sum2 += $row['amount'];               //应收金额
			$sum3 += $row['totalAmount'];          //销售金额
			$sum4 += $row['rpAmount'];             //实际收款金额
			$sum5 += $row['disAmount'];            //折扣率
			$v[$arr]['amount']      = (float)$row['amount']; //应收金额
		    $v[$arr]['billId']      = intval($row['id']); 
			$v[$arr]['billNo']      = $row['billNo']; 
			$v[$arr]['billType']    = $row['billType']; 
			$v[$arr]['date']        = $row['billDate'];
			$v[$arr]['disAmount']   = $row['disAmount'];
			$v[$arr]['entryId']     = 0; 
			$v[$arr]['inAmount']    = $sum1 + $arrears;  //应收款余额
			$v[$arr]['invName']     = ''; 
			$v[$arr]['invNo']       = ''; 
			$v[$arr]['price']       = '';  
			$v[$arr]['qty']         = '';  
			$v[$arr]['spec']        = '';
			$v[$arr]['rpAmount']    = $row['rpAmount'];  
			$v[$arr]['totalAmount'] = $row['totalAmount'];    //销售金额
			$v[$arr]['transType']   = $row['transTypeName'];   
			$v[$arr]['type']        = 1;   
			$v[$arr]['unit']        = ''; 
			if ($showDetail == "true") {
			    foreach ($list3 as $arr1=>$row1) {
				    $arr = time() + $arr1;
					if ($row['id']==$row1['iid']) {
						$v[$arr]['amount']       = 0;
						$v[$arr]['billId']       = intval($row1['iid']); 
						$v[$arr]['billNo']       = ''; 
						$v[$arr]['billType']     = ''; 
						$v[$arr]['date']         = '';
						$v[$arr]['disAmount']    = 0;
						$v[$arr]['entryId']      = 1; 
						$v[$arr]['inAmount']     = $sum1 + $arrears;  
						$v[$arr]['invName']      = $row1['invName'];
						$v[$arr]['invNo']        = $row1['invNumber'];
						$v[$arr]['price']        = $row1['price'];  
						$v[$arr]['qty']          = $row1['amount']>0 ? abs($row1['qty']) : -abs($row1['qty']);  
						$v[$arr]['rpAmount']     = 0;  
						$v[$arr]['spec']         = $row1['invSpec'];
						$v[$arr]['totalAmount']  = $row1['amount'];  
						$v[$arr]['transType']    = '';   
						$v[$arr]['type']         = '';   
						$v[$arr]['unit']         = 0; 
					}
				}
			} 
		}
		$data['data']['customerId']              = $customerId;
		$data['data']['showDetail']              = (bool)$showDetail;
		$data['data']['total']['amount']         = $sum2;
		$data['data']['total']['billNo']         = '';
		$data['data']['total']['billTypeNo']     = '';
		$data['data']['total']['billId']         = '';
		$data['data']['total']['billType']       = '';
		$data['data']['total']['buName']         = '';
		$data['data']['total']['buNo']           = '';
		$data['data']['total']['date']           = '';
		$data['data']['total']['disAmount']      = $sum5;
		$data['data']['total']['inAmount']       = $arrears + $sum1;
		$data['data']['total']['entryId']        = '';
		$data['data']['total']['invName']        = '';
		$data['data']['total']['invNo']          = '';
		$data['data']['total']['price']          = '';
		$data['data']['total']['qty']            = '';
		$data['data']['total']['rpAmount']       = $sum4;
		$data['data']['total']['spec']           = '';
		$data['data']['total']['totalAmount']    = $sum3;
		$data['data']['total']['transType']      = '';
		$data['data']['total']['type']           = '';
		$data['data']['total']['unit']           = '';
		$data['data']['list']                    = array_values($v);
		die(json_encode($data));	
	}
	
	//客户对账单(导出)
	public function customerBalance_exporter() {
	    $this->common_model->checkpurview(110);
		$name = 'contact_balance_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('客户对账单导出:'.$name);
		$data['showDetail'] = $showDetail   = str_enhtml($this->input->get_post('showDetail',TRUE));
	    $data['customerId'] = $customerId  = intval($this->input->get_post('customerId',TRUE));
		$data['customerName']  = str_enhtml($this->input->get_post('customerName',TRUE));
		$data['beginDate']  = $beginDate   = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = $endDate     = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and (billType="SALE" or billType="RECEIPT")';
		$where .= ' and buId='.$customerId;
		$data['list1'] = $this->data_model->get_contact('and billDate<"'.$beginDate.'"'.$where,' and a.id="'.$customerId.'"',1);
		$where .= $beginDate ? ' and billDate>="'.$beginDate.'"' : '';
		$where .= $endDate ? ' and billDate<="'.$endDate.'"' : '';
		$data['list2'] = $this->mysql_model->get_results(INVOICE,'(isDelete=0) '.$where.' order by id');
		$data['list3'] = $this->data_model->get_invoice_info($where.' order by a.id');
		$this->load->view('report/customerBalance-exporter',$data);	
	}
	
	
	 
	//供应商对账单
	public function suppliers_reconciliation_new() {
	    $this->common_model->checkpurview(112);
	    $data['supplierId'] = $supplierId  = intval($this->input->get_post('supplierId',TRUE));
		$data['supplierName']  = str_enhtml($this->input->get_post('supplierName',TRUE));
		$data['beginDate']  = $beginDate   = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = $endDate     = str_enhtml($this->input->get_post('endDate',TRUE));
		$this->load->view('report/suppliers-reconciliation-new',$data);	
	}
	
	//供应商对账单
	public function supplierBalance_detail() {
	    $this->common_model->checkpurview(112);
	    $v = array();
		$sum1 = $sum2 = $sum3 = $sum4 = $sum5 = $sum6 = 0;
	    $data['status'] = 200;
		$data['msg']    = 'success';
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100); 
		$showDetail   = str_enhtml($this->input->get_post('showDetail',TRUE));
		$supplierId   = intval($this->input->get_post('supplierId',TRUE));
		$supplierName = str_enhtml($this->input->get_post('supplierName',TRUE));
		$beginDate    = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate      = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and (billType="PUR" or billType="PAYMENT")';
		$where .= ' and buId='.$supplierId;
		$list1 = $this->data_model->get_contact('and billDate<"'.$beginDate.'"'.$where,' and a.id="'.$supplierId.'"',1);
		$where .= $beginDate ? ' and billDate>="'.$beginDate.'"' : '';
		$where .= $endDate ? ' and billDate<="'.$endDate.'"' : '';
		$list2 = $this->mysql_model->get_results(INVOICE,'(isDelete=0) '.$where.' order by id');
		$list3 = $this->data_model->get_invoice_info($where.' order by a.id');
		$arrears = count($list1)>0 ? $list1['amount'] : 0;    //获取期初应付款余额
		$v[0]['amount']        = 0;
	    $v[0]['billId']        = 0; 
		$v[0]['billNo']        = '期初余额'; 
		$v[0]['billType']      = 'BAL'; 
		$v[0]['date']          = '';
		$v[0]['disAmount']     = 0;
		$v[0]['entryId']       = 0; 
		$v[0]['inAmount']      = $arrears;   //期初应付款余额
		$v[0]['invName']       = ''; 
		$v[0]['invNo']         = ''; 
		$v[0]['price']         = '';  
		$v[0]['qty']           = '';  
		$v[0]['spec']          = '';
		$v[0]['rpAmount']      = 0;  
		$v[0]['totalAmount']   = 0;  
		$v[0]['transType']     = '';   
		$v[0]['type']          = -1;   
		$v[0]['unit']          = ''; 
		foreach ($list2 as $arr=>$row) {
		    $arr = $arr + 1;
		    $sum1 += $row['arrears']; 
			$sum2 += $row['amount'];               //应付金额
			$sum3 += $row['totalAmount'];          //销售金额
			$sum4 += $row['rpAmount'];             //实际付款金额
			$sum5 += $row['disAmount'];            //折扣率
			$v[$arr]['amount']      = (float)$row['amount'];
		    $v[$arr]['billId']      = intval($row['id']); 
			$v[$arr]['billNo']      = $row['billNo']; 
			$v[$arr]['billType']    = $row['billType']; 
			$v[$arr]['date']        = $row['billDate'];
			$v[$arr]['disAmount']   = $row['disAmount'];
			$v[$arr]['entryId']     = 0; 
			$v[$arr]['inAmount']    = $sum1 + $arrears;  
			$v[$arr]['invName']     = ''; 
			$v[$arr]['invNo']       = ''; 
			$v[$arr]['price']       = '';  
			$v[$arr]['qty']         = '';  
			$v[$arr]['spec']        = '';
			$v[$arr]['rpAmount']    = $row['rpAmount'];  
			$v[$arr]['totalAmount'] = $row['totalAmount'];  
			$v[$arr]['transType']   = $row['transTypeName'];   
			$v[$arr]['type']        = 1;   
			$v[$arr]['unit']        = ''; 
			if ($showDetail == "true") {
			    foreach ($list3 as $arr1=>$row1) {
				    $arr = time() + $arr1;
					if ($row['id']==$row1['iid']) {
						$v[$arr]['amount']       = 0;
						$v[$arr]['billId']       = intval($row1['iid']); 
						$v[$arr]['billNo']       = ''; 
						$v[$arr]['billType']     = ''; 
						$v[$arr]['date']         = '';
						$v[$arr]['disAmount']    = 0;
						$v[$arr]['entryId']      = 1; 
						$v[$arr]['inAmount']     = $sum1 + $arrears;  
						$v[$arr]['invName']      = $row1['invName'];
						$v[$arr]['invNo']        = $row1['invNumber'];
						$v[$arr]['price']        = $row1['price'];  
						$v[$arr]['qty']          = $row1['amount']>0 ? abs($row1['qty']) : -abs($row1['qty']);  
						$v[$arr]['rpAmount']     = 0;  
						$v[$arr]['spec']         = $row1['invSpec'];
						$v[$arr]['totalAmount']  = $row1['amount'];  
						$v[$arr]['transType']    = '';   
						$v[$arr]['type']         = '';   
						$v[$arr]['unit']         = 0; 
					}
				}
			} 
		}
		$data['data']['supplierId']   = $supplierId;
		$data['data']['showDetail']              = (bool)$showDetail;
		$data['data']['total']['amount']         = $sum2;
		$data['data']['total']['billNo']         = '';
		$data['data']['total']['billTypeNo']     = '';
		$data['data']['total']['billId']         = '';
		$data['data']['total']['billType']       = '';
		$data['data']['total']['buName']         = '';
		$data['data']['total']['buNo']           = '';
		$data['data']['total']['date']           = '';
		$data['data']['total']['disAmount']      = $sum5;
		$data['data']['total']['inAmount']       = $arrears + $sum1;
		$data['data']['total']['entryId']        = '';
		$data['data']['total']['invName']        = '';
		$data['data']['total']['invNo']          = '';
		$data['data']['total']['price']          = '';
		$data['data']['total']['qty']            = '';
		$data['data']['total']['rpAmount']       = $sum4;
		$data['data']['total']['spec']           = '';
		$data['data']['total']['totalAmount']    = $sum3;
		$data['data']['total']['transType']      = '';
		$data['data']['total']['type']           = '';
		$data['data']['total']['unit']           = '';
		$data['data']['list']                    = array_values($v);
		die(json_encode($data));	
	}
	
	
	//供应商对账单(导出)
	public function supplierBalance_exporter() {
	    $this->common_model->checkpurview(113);
		$name = 'supplier_balance_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('供应商对账单导出:'.$name);
		$data['showDetail'] = $showDetail   = str_enhtml($this->input->get_post('showDetail',TRUE));
	    $data['supplierId'] = $supplierId  = intval($this->input->get_post('supplierId',TRUE));
		$data['supplierName']  = str_enhtml($this->input->get_post('supplierName',TRUE));
		$data['beginDate']  = $beginDate   = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = $endDate     = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and (billType="PUR" or billType="PAYMENT")';
		$where .= ' and buId='.$supplierId;
		$data['list1'] = $this->data_model->get_contact('and billDate<"'.$beginDate.'"'.$where,' and a.id="'.$supplierId.'"',1);
		$where .= $beginDate ? ' and billDate>="'.$beginDate.'"' : '';
		$where .= $endDate ? ' and billDate<="'.$endDate.'"' : '';
		$data['list2'] = $this->mysql_model->get_results(INVOICE,'(isDelete=0) '.$where.' order by id');
		$data['list3'] = $this->data_model->get_invoice_info($where.' order by a.id');
		$this->load->view('report/supplierBalance-exporter',$data);	
	}
	
	
	//其他收支明细表
	public function other_income_expense_detail() {
	    $this->common_model->checkpurview(115);
	    $data['supplierId'] = $supplierId  = intval($this->input->get_post('supplierId',TRUE));
		$data['beginDate']  = $beginDate   = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = $endDate     = str_enhtml($this->input->get_post('endDate',TRUE));
		$this->load->view('report/other-income-expense-detail',$data);	
	}
	
	//其他收支明细表(接口)
	public function oriDetail_detail() {
	    $this->common_model->checkpurview(115);
	    $v = array();
		$payment1 = 0;
		$payment2 = 0;
	    $data['status'] = 200;
		$data['msg']    = 'success';
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100); 
		$transType    = str_enhtml($this->input->get_post('transType',TRUE));
	    $typeName  = str_enhtml($this->input->get_post('typeName',TRUE));
		$beginDate  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate    = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and (a.transType=153401 or a.transType=153402)';
		$where .= $transType ? ' and a.transType='.$transType : ''; 
		$offset = $rows * ($page-1);
		$data['data']['page']      = $page;
		$data['data']['records']   = $this->data_model->get_account_info($where.' order by a.id',3);    //总条数
		$data['data']['total']     = ceil($data['data']['records']/$rows);                             //总分页数
		$list   = $this->data_model->get_account_info($where.' order by a.id desc'); 
		foreach ($list as $arr=>$row) {
		    $v[$arr]['date']           = $row['billDate'];
			$v[$arr]['billId']         = intval($row['iid']);
		    $v[$arr]['billNo']         = $row['billNo'];
			$v[$arr]['transType']      = $row['transType'];
			$v[$arr]['transTypeName']  = $row['transTypeName'];
			$v[$arr]['contactNumber']  = $row['contactNo'];
			$v[$arr]['contactName']    = $row['contactName'];
			$v[$arr]['desc']           = $row['remark'];  
			$v[$arr]['typeName']       = $row['categoryName'];  
			if ($row['transType']==153401) {
				$payment1 += $v[$arr]['amountIn']       = $row['payment'];   //收入
			} else {
				$payment2 += $v[$arr]['amountOut']      = $row['payment']>0 ? -$row['payment'] : abs($row['payment']);   //支出
			}
		}
		$data['data']['rows']      = $v;
		$data['data']['userdata']['date']      = '';
		$data['data']['userdata']['billId']        = '';
		$data['data']['userdata']['billNo']        = '';
		$data['data']['userdata']['transType']     = '';
		$data['data']['userdata']['transTypeName'] = '';
		$data['data']['userdata']['contactNumber'] = '';
		$data['data']['userdata']['contactName']   = '';
		$data['data']['userdata']['desc']          = '';
		$data['data']['userdata']['typeName']      = '';
		$data['data']['userdata']['amountIn']      = $payment1;
		$data['data']['userdata']['amountOut']     = $payment2;
		die(json_encode($data));
	}
 
	 
	//其他收支明细表(导出)
	public function oriDetail_export() {
	    $this->common_model->checkpurview(116);
		$name = 'ori_detail_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('其他收支明细表导出:'.$name);
		$v = array();
		$payment1 = 0;
		$payment2 = 0;
	    $data['transType']  = str_enhtml($this->input->get_post('transType',TRUE));
	    $data['typeName']   = str_enhtml($this->input->get_post('typeName',TRUE));
		$data['beginDate']  = str_enhtml($this->input->get_post('beginDate',TRUE));
		$data['endDate']    = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and (a.transType=153401 or a.transType=153402)';
		$where .= $data['transType'] ? ' and a.transType='.$data['transType'].'' : ''; 
		$list = $this->data_model->get_account_info($where.' order by a.id desc'); 
		foreach ($list as $arr=>$row) {
		    $v[$arr]['date']           = $row['billDate'];
			$v[$arr]['billId']         = intval($row['iid']);
		    $v[$arr]['billNo']         = $row['billNo'];
			$v[$arr]['transType']      = $row['transType'];
			$v[$arr]['transTypeName']  = $row['transTypeName'];
			$v[$arr]['contactNumber']  = $row['contactNo'];
			$v[$arr]['contactName']    = $row['contactName'];
			$v[$arr]['desc']           = $row['remark'];  
			$v[$arr]['typeName']       = $row['categoryName'];  
			if ($row['transType']==153401) {
				$payment1 += $v[$arr]['amountIn']       = $row['payment'];   //收入
			} else {
				$payment2 += $v[$arr]['amountOut']      = $row['payment']>0 ? -$row['payment'] : abs($row['payment']);   //支出
			}
		}
		$data['data']['rows']      = $v;
		$data['data']['userdata']['date']      = '';
		$data['data']['userdata']['billId']        = '';
		$data['data']['userdata']['billNo']        = '';
		$data['data']['userdata']['transType']     = '';
		$data['data']['userdata']['transTypeName'] = '';
		$data['data']['userdata']['contactNumber'] = '';
		$data['data']['userdata']['contactName']   = '';
		$data['data']['userdata']['desc']          = '';
		$data['data']['userdata']['typeName']      = '';
		$data['data']['userdata']['amountIn']      = $payment1;
		$data['data']['userdata']['amountOut']     = $payment2;
		$this->load->view('report/oriDetail_export',$data);	
	}
	 
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */