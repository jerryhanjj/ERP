<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class InvSa extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
		$this->jxcsys = $this->session->userdata('jxcsys');
    }
	
	public function index() {
	    $action = $this->input->get('action',TRUE);
		switch ($action) {
			case 'initSale':
			    $this->common_model->checkpurview(7);
			    $this->load->view('scm/invSa/initSale');	
				break;  
			case 'editSale':
			    $this->common_model->checkpurview(6);
			    $this->load->view('scm/invSa/initSale');	
				break;  	
			case 'initSaleList':
			    $this->common_model->checkpurview(6);
			    $this->load->view('scm/invSa/initSaleList');
				break; 
			default:  
			    $this->common_model->checkpurview(6);
			    $this->saleList();	
		}
	}
	
	public function saleList(){
	    $v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100);
		$sidx = str_enhtml($this->input->get_post('sidx',TRUE));
		$sord = str_enhtml($this->input->get_post('sord',TRUE));
		$transType = intval($this->input->get_post('transType',TRUE));
		$hxState   = intval($this->input->get_post('hxState',TRUE));
		$salesId   = intval($this->input->get_post('salesId',TRUE));
		$matchCon  = str_enhtml($this->input->get_post('matchCon',TRUE));
		$beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate   = str_enhtml($this->input->get_post('endDate',TRUE));
		$order = $sidx ? $sidx.' '.$sord :' a.id desc';
		$where = ' and a.billType="SALE"';
		$where .= $transType>0  ? ' and a.transType='.$transType : ''; 
		$where .= $salesId>0    ? ' and a.salesId='.$salesId : ''; 
		$where .= $hxState>0    ? ' and a.hxStateCode='.$hxState : ''; 
		$where .= $matchCon     ? ' and (b.name like "%'.$matchCon.'%" or description like "%'.$matchCon.'%" or billNo like "%'.$matchCon.'%")' : ''; 
		$where .= $beginDate    ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate      ? ' and a.billDate<="'.$endDate.'"' : ''; 
		$offset = $rows * ($page-1);
		$data['data']['page']      = $page;
		$data['data']['records']   = $this->data_model->get_invoice($where,3);               //总条数
		$data['data']['total']     = ceil($data['data']['records']/$rows);                   //总分页数
		$list = $this->data_model->get_invoice($where.' order by '.$order.' limit '.$offset.','.$rows.'');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['hxStateCode']  = intval($row['hxStateCode']);
		    $v[$arr]['checkName']    = $row['checkName'];
			$v[$arr]['checked']      = intval($row['checked']);
			$v[$arr]['salesId']      = intval($row['salesId']);
			$v[$arr]['salesName']    = $row['salesName'];
			$v[$arr]['billDate']     = $row['billDate'];
			$v[$arr]['billStatus']   = $row['billStatus'];
			$v[$arr]['totalQty']     = (float)$row['totalQty'];
			$v[$arr]['id']           = intval($row['id']);
		    $v[$arr]['amount']       = (float)abs($row['amount']);
			$v[$arr]['billStatusName']   = $row['billStatus']==0 ? '未出库' : '全部出库'; 
			$v[$arr]['transType']    = intval($row['transType']); 
			$v[$arr]['rpAmount']     = (float)abs($row['rpAmount']);
			$v[$arr]['contactName']  = $row['contactName'];
			$v[$arr]['description']  = $row['description'];
			$v[$arr]['billNo']       = $row['billNo'];
			$v[$arr]['totalAmount']  = (float)abs($row['totalAmount']);
			$v[$arr]['userName']     = $row['userName'];
			$v[$arr]['transTypeName']= $row['transTypeName'];
		}
		$data['data']['rows']        = $v;
		die(json_encode($data));
	}
	
	//导出
	public function exportInvSa() { 
	    $this->common_model->checkpurview(10);
		$name = 'sales_record_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('导出销售单据:'.$name);
		$sidx = str_enhtml($this->input->get_post('sidx',TRUE));
		$sord = str_enhtml($this->input->get_post('sord',TRUE));
		$transType = intval($this->input->get_post('transType',TRUE));
		$hxState   = intval($this->input->get_post('hxState',TRUE));
		$salesId   = intval($this->input->get_post('salesId',TRUE));
		$matchCon  = str_enhtml($this->input->get_post('matchCon',TRUE));
		$beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate   = str_enhtml($this->input->get_post('endDate',TRUE));
		$order = $sidx ? $sidx.' '.$sord :' a.id desc';
		$where = ' and billType="SALE"';
		$where .= $transType>0  ? ' and transType='.$transType : ''; 
		$where .= $salesId>0    ? ' and salesId='.$salesId : ''; 
		$where .= $hxState>0    ? ' and hxStateCode='.$hxState : ''; 
		$where .= $matchCon     ? ' and (b.name like "%'.$matchCon.'%" or description like "%'.$matchCon.'%" or billNo like "%'.$matchCon.'%")' : ''; 
		$where .= $beginDate    ? ' and billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate      ? ' and billDate<="'.$endDate.'"' : ''; 
		
		$where1 = ' and a.billType="SALE"';
		$where1 .= $transType>0  ? ' and a.transType='.$transType : ''; 
		$where1 .= $salesId>0    ? ' and a.salesId='.$salesId : ''; 
		$where1 .= $hxState>0    ? ' and a.hxStateCode='.$hxState : ''; 
		$where1 .= $beginDate    ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where1 .= $endDate      ? ' and a.billDate<="'.$endDate.'"' : ''; 
		$data['list1'] = $this->data_model->get_invoice($where.' order by '.$order.'');  
		$data['list2'] = $this->data_model->get_invoice_info($where1.' order by billDate');  
		$this->load->view('scm/invSa/exportInvSa',$data);
	}

	//新增
	public function add(){
	    $this->common_model->checkpurview(7);
	    $data = $this->input->post('postData',TRUE);
		if (strlen($data)>0) {
		    $data = (array)json_decode($data, true); 
			$data = $this->validform($data);
			$info = elements(array(
				'billNo',
				'billType',
				'transType',
				'transTypeName',
				'buId',
				'billDate',
				'description',
				'totalQty',
				'amount',
				'arrears',
				'rpAmount',
				'totalAmount',
				'hxStateCode',
				'totalArrears',
				'disRate',
				'disAmount',
				'salesId',
				'uid',
				'userName',
				'accId',
				'modifyTime'
				),$data);
			$this->db->trans_begin();
			$iid = $this->mysql_model->insert(INVOICE,$info);
			$this->invoice_info($iid,$data);
			$this->account_info($iid,$data);
			if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'SQL错误或者提交的是空数据'); 
			} else {
			    $this->db->trans_commit();
				$this->common_model->logs('新增销货 单据编号：'.$data['billNo']);
				str_alert(200,'success',array('id'=>intval($iid))); 
			}
		}
		str_alert(-1,'提交的是空数据'); 
    }
	
	//新增
	public function addNew(){
	    $this->add();
    }
	
	//修改
	public function updateInvSa(){
	    $this->common_model->checkpurview(8);
	    $data = $this->input->post('postData',TRUE);
		if (strlen($data)>0) {
		    $data = (array)json_decode($data, true); 
			$id   = intval($data['id']);
			$data = $this->validform($data);
		    $info = elements(array(
				'billType',
				'transType',
				'transTypeName',
				'buId',
				'billDate',
				'description',
				'totalQty',
				'amount',
				'arrears',
				'rpAmount',
				'totalAmount',
				'hxStateCode',
				'totalArrears',
				'disRate',
				'disAmount',
				'salesId',
				'uid',
				'userName',
				'accId',
				'modifyTime'
				),$data);
			$this->db->trans_begin();
			$this->mysql_model->update(INVOICE,$info,'(id='.$id.')');
			$this->invoice_info($id,$data);
			$this->account_info($id,$data);
			if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'SQL错误或者提交的是空数据'); 
			} else {
			    $this->db->trans_commit(); 
				$this->common_model->logs('修改销货 单据编号：'.$data['billNo']);
				str_alert(200,'success',array('id'=>$id)); 
			}
		}
		str_alert(-1,'提交的数据不为空'); 
    }
	
	//获取修改信息
	public function update() {
	    $this->common_model->checkpurview(6);
	    $id   = intval($this->input->get_post('id',TRUE));
		$data =  $this->data_model->get_invoice('and (a.id='.$id.') and billType="SALE"',1);
		if (count($data)>0) {
			$s = $v = array();
			$info['status'] = 200;
			$info['msg']    = 'success'; 
			$info['data']['id']                 = intval($data['id']);
			$info['data']['buId']               = intval($data['buId']);
			$info['data']['cLevel']             = 0;
			$info['data']['contactName']        = $data['contactName'];
			$info['data']['salesId']            = intval($data['salesId']);
			$info['data']['date']               = $data['billDate'];
			$info['data']['billNo']             = $data['billNo'];
			$info['data']['billType']           = $data['billType'];
			$info['data']['transType']          = intval($data['transType']);
			$info['data']['totalQty']           = (float)$data['totalQty'];
			$info['data']['modifyTime']         = $data['modifyTime'];
			$info['data']['checkName']          = $data['checkName'];
			$info['data']['disRate']            = (float)$data['disRate'];
			$info['data']['disAmount']          = (float)$data['disAmount'];
			$info['data']['amount']             = (float)abs($data['amount']);
			$info['data']['rpAmount']           = (float)abs($data['rpAmount']);
			$info['data']['customerFree']       = (float)$data['customerFree'];
			$info['data']['arrears']            = (float)abs($data['arrears']);
			$info['data']['userName']           = $data['userName'];
			$info['data']['status']             = intval($data['checked'])==1 ? 'view' : 'edit'; //edit
			$info['data']['totalDiscount']      = (float)$data['totalDiscount'];
			$info['data']['totalAmount']        = (float)abs($data['totalAmount']); 
			$info['data']['description']        = $data['description'];
			$list = $this->data_model->get_invoice_info('and (iid='.$id.') order by id');  
			foreach ($list as $arr=>$row) {
				$v[$arr]['invSpec']           = $row['invSpec'];
				$v[$arr]['taxRate']           = (float)$row['taxRate'];
				$v[$arr]['srcOrderEntryId']   = intval($row['srcOrderEntryId']);
				$v[$arr]['srcOrderNo']        = $row['srcOrderNo'];
				$v[$arr]['srcOrderId']        = intval($row['srcOrderId']);
				$v[$arr]['goods']             = $row['invNumber'].' '.$row['invName'].' '.$row['invSpec'];
				$v[$arr]['invName']      = $row['invName'];
				$v[$arr]['qty']          = (float)abs($row['qty']);
				$v[$arr]['locationName'] = $row['locationName'];
				$v[$arr]['amount']       = (float)abs($row['amount']);
				$v[$arr]['taxAmount']    = (float)$row['taxAmount'];
				$v[$arr]['price']        = (float)$row['price'];
				$v[$arr]['tax']          = (float)$row['tax'];
				$v[$arr]['mainUnit']     = $row['mainUnit'];
				$v[$arr]['deduction']    = (float)$row['deduction'];
				$v[$arr]['invId']        = intval($row['invId']);
				$v[$arr]['invNumber']    = $row['invNumber'];
				$v[$arr]['locationId']   = intval($row['locationId']);
				$v[$arr]['locationName'] = $row['locationName'];
				$v[$arr]['discountRate'] = $row['discountRate'];
				$v[$arr]['description']  = $row['description'];
				
				$v[$arr]['unitId']       = intval($row['unitId']);
				$v[$arr]['mainUnit']     = $row['mainUnit'];
			}

			$info['data']['entries']     = $v;
			$info['data']['accId']       = (float)$data['accId'];
			$accounts = $this->data_model->get_account_info('and (iid='.$id.') order by id');  
			foreach ($accounts as $arr=>$row) {
				$s[$arr]['invoiceId']     = intval($id);
				$s[$arr]['billNo']        = $row['billNo'];
				$s[$arr]['buId']          = intval($row['buId']);
			    $s[$arr]['billType']      = $row['billType'];
				$s[$arr]['transType']     = $row['transType'];
				$s[$arr]['transTypeName'] = $row['transTypeName'];
				$s[$arr]['billDate']      = $row['billDate']; 
			    $s[$arr]['accId']         = intval($row['accId']);
				$s[$arr]['account']       = $row['accountNumber'].' '.$row['accountName']; 
				$s[$arr]['payment']       = (float)abs($row['payment']); 
				$s[$arr]['wayId']         = (float)$row['wayId']; 
				$s[$arr]['way']           = $row['categoryName']; 
				$s[$arr]['settlement']    = $row['settlement']; 
		    }  
			$info['data']['accounts']     = $s;
			die(json_encode($info));
		}
		str_alert(-1,'单据不存在、或者已删除');  
    }
	
	
	//打印
    public function toPdf() {
	    $this->common_model->checkpurview(88);
	    $id   = intval($this->input->get('id',TRUE));
		$data = $this->data_model->get_invoice('and (a.id='.$id.') and billType="SALE"',1);  
		if (count($data)>0) { 
			$data['num']    = 8;
			$data['system'] = $this->common_model->get_option('system'); 
			$list = $this->data_model->get_invoice_info('and (iid='.$id.') order by id');  
			$data['countpage']  = ceil(count($list)/$data['num']);   //共多少页
			foreach($list as $arr=>$row) {
			    $data['list'][] = array(
				'i'=>$arr + 1,
				'goods'=>$row['invNumber'].' '.$row['invName'],
				'invSpec'=>$row['invSpec'],
				'qty'=>abs($row['qty']),
				'price'=>$row['price'],
				'discountRate'=>$row['discountRate']>0?$row['discountRate']:'',
				'deduction'=>$row['deduction']>0?$row['deduction']:'',
				'amount'=>$row['amount'],
				'locationName'=>$row['locationName']
				);  
			}
		    ob_start();
			$this->load->view('scm/invSa/toPdf',$data);
			$content = ob_get_clean();
			require_once('./application/libraries/html2pdf/html2pdf.php');
			try {
			    $html2pdf = new HTML2PDF('P', 'A4', 'en');
				$html2pdf->setDefaultFont('javiergb');
				$html2pdf->pdf->SetDisplayMode('fullpage');
				$html2pdf->writeHTML($content, '');
				$html2pdf->Output('invSa_'.date('ymdHis').'.pdf');
			}catch(HTML2PDF_exception $e) {
				echo $e;
				exit;
			}  
		} else {
		    str_alert(-1,'单据不存在、或者已删除');  	  
		}  
	}
	
	
	
	//删除 
    public function delete() {
	    $this->common_model->checkpurview(9);
	    $id   = intval($this->input->get('id',TRUE));
		$data = $this->mysql_model->get_row(INVOICE,'(id='.$id.') and billType="SALE"');  
		if (count($data)>0) {
		    $data['checked'] >0 && str_alert(-1,'已审核的不可删除'); 
		    $info['isDelete'] = 1;
		    $this->db->trans_begin();
			$this->mysql_model->update(INVOICE,$info,'(id='.$id.')');   
			$this->mysql_model->update(INVOICE_INFO,$info,'(iid='.$id.')');  
			$this->mysql_model->update(ACCOUNT_INFO,$info,'(iid='.$id.')');    
			if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'删除失败'); 
			} else {
			    $this->db->trans_commit();
				$this->common_model->logs('删除购货订单 单据编号：'.$data['billNo']);
				str_alert(200,'success'); 	 
			}
		}
		str_alert(-1,'单据不存在、或者已删除');  
	}

	
	//库存查询
	public function justIntimeInv() {
	    $v = array();
		$qty = 0;
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$page  = max(intval($this->input->get_post('page',TRUE)),1);
		$rows  = max(intval($this->input->get_post('rows',TRUE)),100);
		$invid = intval($this->input->get_post('invId',TRUE));
		$where = $invid > 0 ? ' and a.invId='.$invid.'' : ''; 
		$data['data']['total']     = 1;                         
		$data['data']['records']   = $this->data_model->get_inventory($where.' GROUP BY locationId',3);    
		$list = $this->data_model->get_inventory($where.' GROUP BY locationId');    
		foreach ($list as $arr=>$row) {
		    $i = $arr + 1;
			$v[$arr]['locationId']   = intval($row['locationId']);
			$qty += $v[$arr]['qty']  = (float)$row['qty'];
			$v[$arr]['locationName'] = $row['locationName'];
			$v[$arr]['invId']        = $row['invId'];
		}
		$v[$i]['locationId']   = 0;
		$v[$i]['qty']          = $qty;
		$v[$i]['locationName'] = '合计';
		$v[$i]['invId']        = 0;
		$data['data']['rows']  = $v;
		die(json_encode($data));
	}
	

	public function findNearSaEmp() {
		die('{"status":200,"msg":"success","data":{"empId":0}}');
		
	}
	
	//公共验证
	private function validform($data) {
	    if (isset($data['id']) && intval($data['id'])>0) {
		    $invoice = $this->mysql_model->get_row(INVOICE,'(id='.$data['id'].') and billType="SALE" and isDelete=0');  //修改的时候判断
			count($invoice)<1 && str_alert(-1,'单据不存在、或者已删除');
			$invoice['checked']>0 && str_alert(-1,'审核后不可修改');
			$data['billNo']      =  $invoice['billNo'];	
		} else {
		    $data['billNo']      = str_no('XS');    //修改的时候屏蔽
		}
	
	    $data['buId']            = intval($data['buId']);
		$data['salesId']         = intval($data['salesId']);
		$data['billType']        = 'SALE';
		$data['billDate']        = $data['date'];
		$data['transType']       = intval($data['transType']);
		$data['transTypeName']   = $data['transType']==150601 ? '销货' : '销退';
		$data['description']     = $data['description'];
		$data['totalQty']        = (float)$data['totalQty'];
		$data['totalTax']        = isset($data['totalTax']) ? (float)$data['totalTax'] : 0;
		$data['totalTaxAmount']  = isset($data['totalTaxAmount']) ? (float)$data['totalTaxAmount'] : 0; 
			 
		if ($data['transType']==150601) {
			$data['amount']      = abs($data['amount']);
			$data['arrears']     = abs($data['arrears']);
			$data['rpAmount']    = abs($data['rpAmount']);
			$data['totalAmount'] = abs($data['totalAmount']);
		} else {
			$data['amount']      = -abs($data['amount']);
			$data['arrears']     = -abs($data['arrears']);
			$data['rpAmount']    = -abs($data['rpAmount']);
			$data['totalAmount'] = -abs($data['totalAmount']);
		} 
			 
			 
		$data['disRate']        = (float)$data['disRate'];
		$data['disAmount']      = (float)$data['disAmount'];
		$data['hxStateCode']    = $data['rpAmount']==$data['amount'] ? 2 : ($data['rpAmount']>0 ? 1 : 0); 
		$data['totalArrears']   = (float)$data['totalArrears'];
		$data['totalDiscount']  = (float)$data['totalDiscount'];
		$data['customerFree']   = (float)$data['customerFree'];
		$data['accId']          = (float)$data['accId'];
		$data['uid']            = $this->jxcsys['uid'];
		$data['userName']       = $this->jxcsys['name'];  
		$data['modifyTime']     = date('Y-m-d H:i:s');
	
	
 
		(float)$data['arrears'] < 0  && str_alert(-1,'本次欠款要为数字，请输入有效数字！'); 
		(float)$data['disRate'] < 0  && str_alert(-1,'折扣率要为数字，请输入有效数字！'); 
		(float)$data['rpAmount'] < 0 && str_alert(-1,'本次收款要为数字，请输入有效数字！'); 
		(float)$data['customerFree'] < 0 && str_alert(-1,'客户承担费用要为数字，请输入有效数字！'); 
		//(float)$data['amount'] < (float)$data['rpAmount']  && str_alert(-1,'折扣率要为[0-100]之间数字，请输入有效数字！'); 
		//(float)$data['amount'] < (float)$data['disAmount'] && str_alert(-1,'折扣额不能大于合计金额！'); 
 
			
		//选择了结算账户 需要验证 
		if (isset($data['accounts']) && count($data['accounts'])>0) {
			foreach ($data['accounts'] as $arr=>$row) {
				(float)$row['payment'] < 0 && str_alert(-1,'结算金额要为数字，请输入有效数字！');
			}  
        }
			
		//商品录入验证
		if (is_array($data['entries'])) {
		    $system    = $this->common_model->get_option('system'); 
			
		    if ($system['requiredCheckStore']==1) {  //开启检查时判断
				$item = array();                     
				foreach($data['entries'] as $k=>$v){
				    !isset($v['invId']) && str_alert(-1,'参数错误');    
					!isset($v['locationId']) && str_alert(-1,'参数错误'); 
					if(!isset($item[$v['invId'].'-'.$v['locationId']])){    
						$item[$v['invId'].'-'.$v['locationId']] = $v;
					}else{
						$item[$v['invId'].'-'.$v['locationId']]['qty'] += $v['qty'];        //同一仓库 同一商品 数量累加
					}
				}
				$inventory = $this->data_model->get_invoice_info_inventory();
			} else {
			    $item = $data['entries'];	
			}
			
			//获取门店ID
			$storage   = array_column($this->mysql_model->get_results(STORAGE,'(disable=0)'),'id');  
			
			foreach ($item as $arr=>$row) {
			    !isset($row['invId']) && str_alert(-1,'参数错误');    
				!isset($row['locationId']) && str_alert(-1,'参数错误'); 
				(float)$row['qty'] < 0 || !is_numeric($row['qty']) && str_alert(-1,'商品数量要为数字，请输入有效数字！'); 
				(float)$row['price'] < 0 || !is_numeric($row['price']) && str_alert(-1,'商品销售单价要为数字，请输入有效数字！'); 
				//(float)$row['discountRate'] < 0 || !is_numeric($row['discountRate']) && str_alert(-1,'折扣率要为数字，请输入有效数字！');
				intval($row['locationId']) < 1 && str_alert(-1,'请选择相应的仓库！'); 
				!in_array(intval($row['locationId']),$storage) && str_alert(-1,$row['locationName'].'不存在或不可用！');
				
				//库存判断
				if ($system['requiredCheckStore']==1) {  
				    if (intval($data['transType'])==150601) {                        //销售才验证 
						if (isset($inventory[$row['invId']][$row['locationId']])) {
							$inventory[$row['invId']][$row['locationId']] < (float)$row['qty'] && str_alert(-1,$row['locationName'].$row['invName'].'商品库存不足！'); 
						} else {
							str_alert(-1,$row['invName'].'库存不足！');
						}
					}
				}
			}
			
		} else {	 
			str_alert(-1,'提交的是空数据'); 
		} 
		
		//供应商验证
		$this->mysql_model->get_count(CONTACT,'(id='.intval($data['buId']).')')<1 && str_alert(-1,'客户不存在'); 
		
		return $data;
		
	}  
	
	
	
	//组装数据
	private function invoice_info($iid,$data) {
	    if (is_array($data['entries'])) {
			foreach ($data['entries'] as $arr=>$row) {
			    if (intval($row['invId'])>0) {
					$v[$arr]['iid']           = $iid;
					$v[$arr]['billNo']        = $data['billNo'];
					$v[$arr]['billDate']      = $data['billDate']; 
					$v[$arr]['buId']          = $data['buId'];
					$v[$arr]['transType']     = $data['transType'];
					$v[$arr]['transTypeName'] = $data['transTypeName'];
					$v[$arr]['billType']      = $data['billType'];
					$v[$arr]['salesId']       = $data['salesId'];
					$v[$arr]['invId']         = intval($row['invId']);
					$v[$arr]['skuId']         = intval($row['skuId']);
					$v[$arr]['unitId']        = intval($row['unitId']);
					$v[$arr]['locationId']    = intval($row['locationId']);
					if ($data['transType']==150601) {
						$v[$arr]['qty']       = -abs($row['qty']); 
						$v[$arr]['amount']    = abs($row['amount']); 
					} else {
						$v[$arr]['qty']       = abs($row['qty']);  
						$v[$arr]['amount']    = -abs($row['amount']); 
					} 
					$v[$arr]['price']         = abs($row['price']);  
					$v[$arr]['discountRate']  = $row['discountRate'];  
					$v[$arr]['deduction']     = $row['deduction'];  
					$v[$arr]['description']   = $row['description'];   
					//$v[$arr]['srcOrderEntryId']    = intval($row['srcOrderEntryId']);
	//				$v[$arr]['srcOrderNo']         = $row['srcOrderNo'];
	//				$v[$arr]['srcOrderId']         = intval($row['srcOrderId']); 
				} 
			} 
			if (isset($v)) {
			    if (isset($data['id']) && $data['id']>0) {                    //修改的时候   
				    $this->mysql_model->delete(INVOICE_INFO,'(iid='.$iid.')');
				}
				$this->mysql_model->insert(INVOICE_INFO,$v);
			}
		} 
	}
	
	//组装数据
	private function account_info($iid,$data) {
	    if (isset($data['accounts']) && count($data['accounts'])>0) {
			foreach ($data['accounts'] as $arr=>$row) {
			    if (intval($row['accId'])>0) {
					$v[$arr]['iid']           = intval($iid);
					$v[$arr]['billNo']        = $data['billNo'];
					$v[$arr]['buId']          = $data['buId'];
					$v[$arr]['billType']      = $data['billType'];
					$v[$arr]['transType']     = $data['transType'];
					$v[$arr]['transTypeName'] = $data['transType']==150601 ? '普通销售' : '销售退回';
					$v[$arr]['billDate']      = $data['billDate']; 
					$v[$arr]['accId']         = $row['accId']; 
					$v[$arr]['payment']       = $data['transType']==150601 ? abs($row['payment']) : -abs($row['payment']); 
					$v[$arr]['wayId']         = $row['wayId'];
					$v[$arr]['settlement']    = $row['settlement'] ;
				} 
			} 
			if (isset($v)) {
			    if (isset($data['id']) && $data['id']>0) {                      //修改的时候
				    $this->mysql_model->delete(ACCOUNT_INFO,'(iid='.$iid.')');
				}
			    $this->mysql_model->insert(ACCOUNT_INFO,$v);
			}
		} 
	}
	
	
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */