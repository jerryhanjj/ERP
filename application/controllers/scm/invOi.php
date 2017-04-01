<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class InvOi extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
		$this->jxcsys = $this->session->userdata('jxcsys');
    }
	
	public function index() {
	    $type   = $this->input->get('type',TRUE);
	    $action = $this->input->get('action',TRUE);
		switch ($action) {
			case 'initOi':
				$info = array('in'=>15,'out'=>19,'cbtz'=>152);
				$this->common_model->checkpurview($info[$type]);
			    $this->load->view('scm/invOi/initOi-'.$type);	
				break;  
			case 'editOi':
				$info = array('in'=>16,'out'=>20,'cbtz'=>153);
				$this->common_model->checkpurview($info[$type]);
			    $this->load->view('scm/invOi/initOi-'.$type);	
				break;  	
			case 'initOiList':
			    $info = array('in'=>14,'out'=>18,'cbtz'=>151);
				$this->common_model->checkpurview($info[$type]);
			    $this->load->view('scm/invOi/initOiList-'.$type);
				break; 
		}
	}
	
	//其他入库
	public function listIn() {
	    $this->common_model->checkpurview(14);
	    $v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100);
		$matchCon  = str_enhtml($this->input->get_post('matchCon',TRUE));
		$beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate   = str_enhtml($this->input->get_post('endDate',TRUE));
		$transTypeId  = intval($this->input->get_post('transTypeId',TRUE));
		$locationId   = intval($this->input->get_post('locationId',TRUE));
		$where = ' and a.billType="OI"';
		$where .= $matchCon  ? ' and (b.name like "%'.$matchCon.'%" or description like "%'.$matchCon.'%" or billNo like "%'.$matchCon.'%")' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 
		$where .= $transTypeId>0 ? ' and a.transType='.$transTypeId.'' : ''; 
		if ($locationId>0) {
		    $iid = $this->mysql_model->get_results(INVOICE_INFO,'(locationId='.$locationId.') and billType="OI" group by iid'); 
			if (is_array($a1) && count($a1)>0) {
			    $iid = array_column($iid, 'iid');
			    $iid = join(',',$iid);
			    $where .= ' and a.id in('.$iid.')'; 
			} else {
			    $where .= ' and 1<>1'; 
			}
		}
		$offset = $rows * ($page-1);
		$data['data']['page']      = $page;
		$data['data']['records']   = $this->data_model->get_invoice($where,3);                            //总条数 
		$data['data']['total']     = ceil($data['data']['records']/$rows);                                //总分页数
		$list = $this->data_model->get_invoice($where.' order by id desc limit '.$offset.','.$rows.'');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['checkName']    = $row['checkName'];
			$v[$arr]['checked']      = intval($row['checked']);
			$v[$arr]['billDate']     = $row['billDate'];
			$v[$arr]['billType']     = $row['billType'];
			$v[$arr]['id']           = intval($row['id']);
		    $v[$arr]['amount']       = (float)abs($row['totalAmount']);
			$v[$arr]['transType']    = intval($row['transType']);;
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
	
	//其他入库导出
	public function exportInvOi() { 
		$name = 'qtrk_record_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('导出其他入库单:'.$name);
		$matchCon  = str_enhtml($this->input->get_post('matchCon',TRUE));
		$beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate   = str_enhtml($this->input->get_post('endDate',TRUE));
		$transTypeId  = intval($this->input->get_post('transTypeId',TRUE));
		$locationId   = intval($this->input->get_post('locationId',TRUE));
		$where = ' and a.billType="OI"';
		$where .= $matchCon  ? ' and (b.name like "%'.$matchCon.'%" or description like "%'.$matchCon.'%" or billNo like "%'.$matchCon.'%")' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 
		$where .= $transTypeId>0 ? ' and a.transType='.$transTypeId.'' : ''; 
		if ($locationId>0) {
		    $iid = $this->mysql_model->get_results(INVOICE_INFO,'(locationId='.$locationId.') and billType="OI" group by iid'); 
			if (is_array($a1) && count($a1)>0) {
			    $iid = array_column($iid, 'iid');
			    $iid = join(',',$iid);
			    $where .= ' and a.id in('.$iid.')'; 
			} else {
			    $where .= ' and 1<>1'; 
			}
		}
		$data['list1'] = $this->data_model->get_invoice($where.' order by id desc');  
		$where1 = ' and billType="OI"';
		$where1 .= $beginDate ? ' and billDate>="'.$beginDate.'"' : ''; 
		$where1 .= $endDate ? ' and billDate<="'.$endDate.'"' : ''; 
		$where1 .= $transTypeId>0 ? ' and transType='.$transTypeId.'' : ''; 
		$where1 .= $locationId ? ' and locationId='.$locationId.'' : ''; 
		$data['list2'] = $this->data_model->get_invoice_info($where1.' order by billDate');  
		$this->load->view('scm/invOi/exportInvOi',$data);
	}

	//类型
	public function queryTransType(){
	    $type   = $this->input->get_post('type',TRUE) == 'out' ? 'out' : 'in';
		$v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$data['data']['totalsize']   = $this->mysql_model->get_count(INVOICE_TYPE,'(type="'.$type.'")');   //总条数
		$list = $this->mysql_model->get_results(INVOICE_TYPE,'(type="'.$type.'") order by id desc');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['acctId']       = 0;
			$v[$arr]['calCost']      = 1;
			$v[$arr]['commission']   = false;
			$v[$arr]['direction']    = 1;
		    $v[$arr]['free']         = false;
			$v[$arr]['id']           = intval($row['number']);
			$v[$arr]['inOut']        = 1;
			$v[$arr]['name']         = $row['name'];
			$v[$arr]['process']      = false;
			$v[$arr]['sysDefault']   = true;
			$v[$arr]['sysDelete']    = false;
			$v[$arr]['tableName']    = 't_scm_inventryoi';
			$v[$arr]['typeId']       = 1507;
			$v[$arr]['voucher']      = true;
		}
		$data['data']['items']       = $v;
		die(json_encode($data));
    }
	
	
	//其他入库新增
	public function add(){
	    $this->common_model->checkpurview(15);
	    $data = $this->input->post('postData',TRUE);
		if (strlen($data)>0) {
		    $data = (array)json_decode($data, true); 
			$this->validform($data);
			$info['billNo']          = str_no('QTRK');
			$info['billType']        = 'OI';
			$info['buId']            = intval($data['buId']);
			$info['billDate']        = $data['date'];   
			$info['description']     = $data['description'];
			$info['totalAmount']     = (float)$data['totalAmount'];
			$info['totalQty']        = (float)$data['totalQty'];
			$info['transType']       = intval($data['transTypeId']);
			$info['transTypeName']   = $data['transTypeName'];
			$info['uid']             = $this->jxcsys['uid'];
			$info['userName']        = $this->jxcsys['name'];
			$this->db->trans_begin();
			$iid = $this->mysql_model->insert(INVOICE,$info);
			if (is_array($data['entries'])) {
			     foreach ($data['entries'] as $arr=>$row) {
					 $v[$arr]['iid']           = $iid;
				     $v[$arr]['billNo']        = $info['billNo'];
				     $v[$arr]['buId']          = $info['buId'];
					 $v[$arr]['transType']     = $info['transType'];
					 $v[$arr]['transTypeName'] = $info['transTypeName'];
					 $v[$arr]['billDate']      = $info['billDate']; 
					 $v[$arr]['billType']      = $info['billType'];
					 $v[$arr]['invId']         = intval($row['invId']);
					 $v[$arr]['skuId']         = intval($row['skuId']);
					 $v[$arr]['unitId']        = intval($row['unitId']);
					 $v[$arr]['locationId']    = intval($row['locationId']);
					 $v[$arr]['qty']           = abs($row['qty']); 
					 $v[$arr]['amount']        = abs($row['amount']); 
					 $v[$arr]['price']         = abs($row['price']);  
					 $v[$arr]['description']   = $row['description'];   
				}
				if (isset($v)) {   
					$this->mysql_model->insert(INVOICE_INFO,$v);
				}
			 }
			 
			 if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'SQL错误回滚'); 
			 } else {
			    $this->db->trans_commit();
				$this->common_model->logs('新增其他入库 单据编号：'.$info['billNo']);
				str_alert(200,'success',array('id'=>intval($iid))); 
			 }
		}
		str_alert(-1,'提交的是空数据'); 
    }
	
	//新增
	public function addnew(){
	    $this->add();
    }
	
	 
	//修改
	public function updateOi(){
	    $this->common_model->checkpurview(16);
	    $data = $this->input->post('postData',TRUE);
		if (strlen($data)>0) {
		    $data = (array)json_decode($data, true); 
			$this->validform($data);
			$id   = intval($data['id']);
			$invoice = $this->mysql_model->get_row(INVOICE,'(id='.$id.') and billType="OI" and isDelete=0');
			count($invoice)<1 && str_alert(-1,'单据不存在');
			$info['buId']            = intval($data['buId']);
			$info['billDate']        = $data['date'];
			$info['billType']        = 'OI';
			$info['transType']       = intval($data['transTypeId']);
			$info['description']     = $data['description'];
			$info['totalAmount']     = (float)$data['totalAmount'];
			$info['totalQty']        = (float)$data['totalQty'];
			$info['transTypeName']   = $data['transTypeName'];
			$info['modifyTime']      = date('Y-m-d H:i:s');
			$info['uid']             = $this->jxcsys['uid'];
			$info['userName']        = $this->jxcsys['name'];  
			$this->db->trans_begin();
			$this->mysql_model->update(INVOICE,$info,'(id='.$id.')');
			$this->mysql_model->delete(INVOICE_INFO,'(iid='.$id.')');
			if (is_array($data['entries'])) {
			     foreach ($data['entries'] as $arr=>$row) {
					 $v[$arr]['iid']           = $id;
				     $v[$arr]['billNo']        = $invoice['billNo'];
				     $v[$arr]['buId']          = $info['buId'];
					 $v[$arr]['transType']     = $info['transType'];
					 $v[$arr]['transTypeName'] = $info['transTypeName'];
					 $v[$arr]['billDate']      = $info['billDate']; 
					 $v[$arr]['billType']      = $info['billType'];
					 $v[$arr]['invId']         = intval($row['invId']);
					 $v[$arr]['skuId']         = intval($row['skuId']);
					 $v[$arr]['unitId']        = intval($row['unitId']);
					 $v[$arr]['locationId']    = intval($row['locationId']);
					 $v[$arr]['qty']           = abs($row['qty']); 
					 $v[$arr]['amount']        = abs($row['amount']); 
					 $v[$arr]['price']         = abs($row['price']);  
					 $v[$arr]['description']   = $row['description'];   
				} 
				if (isset($v)) {   
					$this->mysql_model->insert(INVOICE_INFO,$v);
				}
			 }
			 if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'SQL错误回滚'); 
			 } else {
			    $this->db->trans_commit();
				$this->common_model->logs('修改其他入库 单据编号：'.$invoice['billNo']);
				str_alert(200,'success',array('id'=>$id)); 
			 }
		}
		str_alert(-1,'提交的是空数据'); 
    }
	
	
	//获取修改信息
	public function updateIn() {
	    $this->common_model->checkpurview(14);
	    $id   = intval($this->input->get_post('id',TRUE));
		$data = $this->data_model->get_invoice('and (a.id='.$id.') and billType="OI"',1);
		if (count($data)>0) {
			$v = array();
			$info['status'] = 200;
			$info['msg']    = 'success'; 
			$info['data']['id']                 = intval($data['id']);
			$info['data']['buId']               = intval($data['buId']);
			$info['data']['contactName']        = $data['contactName'];
			$info['data']['date']               = $data['billDate'];
			$info['data']['billNo']             = $data['billNo'];
			$info['data']['billType']           = $data['billType'];
			$info['data']['modifyTime']         = $data['modifyTime'];
			$info['data']['transType']          = intval($data['transType']);
			$info['data']['totalQty']           = (float)$data['totalQty'];
			$info['data']['totalAmount']        = (float)$data['totalAmount'];
			$info['data']['userName']           = $data['userName'];
			$info['data']['amount']             = (float)abs($data['totalAmount']);
			$info['data']['checked']            = intval($data['checked']); 
			$info['data']['status']             = intval($data['checked'])==1 ? 'view' : 'edit'; 
			$list = $this->data_model->get_invoice_info('and (iid='.$id.')  order by id desc');   
			foreach ($list as $arr=>$row) {
				$v[$arr]['invSpec']      = $row['invSpec'];
				$v[$arr]['goods']        = $row['invNumber'].' '.$row['invName'].' '.$row['invSpec'];
				$v[$arr]['invName']      = $row['invName'];
				$v[$arr]['qty']          = (float)abs($row['qty']);
				$v[$arr]['amount']       = (float)abs($row['amount']);
				$v[$arr]['price']        = (float)abs($row['price']);
				$v[$arr]['mainUnit']     = $row['mainUnit'];
				$v[$arr]['description']  = $row['description'];
				$v[$arr]['invId']        = intval($row['invId']);
				$v[$arr]['invNumber']    = $row['invNumber'];
				$v[$arr]['locationId']   = intval($row['locationId']);
				$v[$arr]['locationName'] = $row['locationName'];
				$v[$arr]['unitId']       = intval($row['unitId']);
				$v[$arr]['skuId']        = intval($row['skuId']);
				$v[$arr]['skuName']      = '';
			}
			$info['data']['entries']     = $v;
			die(json_encode($info));
		}
		str_alert(-1,'提交的是空数据'); 
    }
	
	
	//打印
    public function toOiPdf() {
	    $this->common_model->checkpurview(9);
	    $id   = intval($this->input->get('id',TRUE));
		$data = $this->data_model->get_invoice('and (a.id='.$id.') and billType="OI"',1);  
		if (count($data)>0) { 
			$data['num']    = 53;
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
				'amount'=>$row['amount'],
				'locationName'=>$row['locationName']
				);  
			}
		    ob_start();
			$this->load->view('scm/invOi/toOiPdf',$data);
			$content = ob_get_clean();
			require_once('./application/libraries/html2pdf/html2pdf.php');
			try {
				$html2pdf = new HTML2PDF('P', 'A4', 'en');
				$html2pdf->setDefaultFont('javiergb');
				$html2pdf->pdf->SetDisplayMode('fullpage');
				$html2pdf->writeHTML($content, isset($_GET['vuehtml']));
				$html2pdf->Output('toOiPdf_'.date('ymdHis').'.pdf');
			}catch(HTML2PDF_exception $e) {
				echo $e;
				exit;
			}  
		} else {
		    str_alert(-1,'单据不存在、或者已删除');  	  
		}  
	}
	
	
	
	//删除
    public function deletein() {
	    $this->common_model->checkpurview(17);
	    $id   = intval($this->input->get('id',TRUE));
		$data = $this->mysql_model->get_row(INVOICE,'(id='.$id.') and billType="OI"');  
		if (count($data)>0) {
		    $info['isDelete'] = 1;
		    $this->db->trans_begin();
			$this->mysql_model->update(INVOICE,$info,'(id='.$id.')');   
			$this->mysql_model->update(INVOICE_INFO,$info,'(iid='.$id.')');     
			if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'删除失败'); 
			} else {
			    $this->db->trans_commit();
				$this->common_model->logs('删除单据编号：'.$data['billNo']);
				str_alert(200,'success'); 	 
			}
		}
		str_alert(-1,'参数错误'); 
	}
	

	//其他出库列表
	public function listout() {
	    $this->common_model->checkpurview(18);
	    $v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100);
		$matchCon  = str_enhtml($this->input->get_post('matchCon',TRUE));
		$beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate   = str_enhtml($this->input->get_post('endDate',TRUE));
		$locationId   = intval($this->input->get_post('locationId',TRUE));
		$transTypeId   = intval($this->input->get_post('transTypeId',TRUE));
		
		$where = ' and a.billType="OO"';
		$where .= $matchCon  ? ' and (b.name like "%'.$matchCon.'%" or description like "%'.$matchCon.'%" or billNo like "%'.$matchCon.'%")' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 
		$where .= $transTypeId>0 ? ' and a.transType='.$transTypeId.'' : ''; 
		if ($locationId>0) {
		    $iid = $this->mysql_model->get_results(INVOICE_INFO,'(locationId='.$locationId.') and billType="OO" group by iid'); 
			if (is_array($a1) && count($a1)>0) {
			    $iid = array_column($iid, 'iid');
			    $iid = join(',',$iid);
			    $where .= ' and a.id in('.$iid.')'; 
			} else {
			    $where .= ' and 1<>1'; 
			}
		}

		$offset = $rows * ($page-1);
		$data['data']['page']      = $page;
		$data['data']['records']   = $this->data_model->get_invoice($where,3);                            //总条数 
		$data['data']['total']     = ceil($data['data']['records']/$rows);                                //总分页数
		$list = $this->data_model->get_invoice($where.' order by id desc limit '.$offset.','.$rows.'');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['checkName']    = $row['checkName'];
			$v[$arr]['checked']      = intval($row['checked']);
			$v[$arr]['billDate']     = $row['billDate'];
			$v[$arr]['billType']     = $row['billType'];
			$v[$arr]['id']           = intval($row['id']);
		    $v[$arr]['amount']       = (float)abs($row['totalAmount']);
			$v[$arr]['transType']    = intval($row['transType']);;
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
	
	//其他出库导出
	public function exportInvOo() { 
	    $this->common_model->checkpurview(105);
		$name = 'qtck_record_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('导出其他出库单:'.$name);
		$matchCon  = str_enhtml($this->input->get_post('matchCon',TRUE));
		$beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate   = str_enhtml($this->input->get_post('endDate',TRUE));
		$transTypeId  = intval($this->input->get_post('transTypeId',TRUE));
		$locationId   = intval($this->input->get_post('locationId',TRUE));
		$where = ' and a.billType="OO"';
		$where .= $matchCon  ? ' and (b.name like "%'.$matchCon.'%" or description like "%'.$matchCon.'%" or billNo like "%'.$matchCon.'%")' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 
		$where .= $transTypeId>0 ? ' and a.transType='.$transTypeId.'' : ''; 
		if ($locationId>0) {
		    $iid = $this->mysql_model->get_results(INVOICE_INFO,'(locationId='.$locationId.') and billType="OO" group by iid'); 
			if (is_array($a1) && count($a1)>0) {
			    $iid = array_column($iid, 'iid');
			    $iid = join(',',$iid);
			    $where .= ' and a.id in('.$iid.')'; 
			} else {
			    $where .= ' and 1<>1'; 
			}
		}
		$data['list1'] = $this->data_model->get_invoice($where.' order by id desc');  
		$where1 = ' and billType="OO"';
		$where1 .= $beginDate ? ' and billDate>="'.$beginDate.'"' : ''; 
		$where1 .= $endDate ? ' and billDate<="'.$endDate.'"' : ''; 
		$where1 .= $transTypeId>0 ? ' and transType='.$transTypeId.'' : ''; 
		$where1 .= $locationId ? ' and locationId='.$locationId.'' : ''; 
		$data['list2'] = $this->data_model->get_invoice_info($where1.' order by billDate');  
		$this->load->view('scm/invOi/exportInvOo',$data);
	}
	
	//新增
	public function addOo(){
	    $this->common_model->checkpurview(19);
	    $data = $this->input->post('postData',TRUE);
		if (strlen($data)>0) {
		    $data = (array)json_decode($data, true); 
			$this->validform($data);
			$info['billNo']      = str_no('QTCK');
			$info['buId']        = intval($data['buId']);
			$info['billDate']    = $data['date'];
			$info['description'] = $data['description'];
			$info['totalAmount'] = (float)$data['totalAmount'];
			$info['totalQty']    = (float)$data['totalQty'];
			$info['transType']   = intval($data['transTypeId']);
			$info['transTypeName']   = $data['transTypeName'];
			$info['billType']        = 'OO';
			$info['uid']         = $this->jxcsys['uid'];
			$info['userName']    = $this->jxcsys['name'];
			$this->db->trans_begin();
			$iid = $this->mysql_model->insert(INVOICE,$info);
			if (is_array($data['entries'])) {
			     $amount = 0;
			     $cost  = $this->data_model->get_invoice_info_ini('and billDate<="'.date('Y-m-d').'" group by invId'); 
			     foreach ($data['entries'] as $arr=>$row) {
				     $price = isset($cost['inunitcost'][$row['invId']]) ? $cost['inunitcost'][$row['invId']] : 0;
					 $amount +=  -abs($row['qty']) * $price;
					 $v[$arr]['iid']           = $iid;
				     $v[$arr]['billNo']        = $info['billNo'];
				     $v[$arr]['buId']          = $info['buId'];
					 $v[$arr]['transType']     = $info['transType'];
					 $v[$arr]['transTypeName'] = $info['transTypeName'];
					 $v[$arr]['billDate']      = $info['billDate']; 
					 $v[$arr]['billType']      = $info['billType'];
					 $v[$arr]['invId']         = intval($row['invId']);
					 $v[$arr]['skuId']         = intval($row['skuId']);
					 $v[$arr]['unitId']        = intval($row['unitId']);
					 $v[$arr]['locationId']    = intval($row['locationId']);
					 $v[$arr]['qty']           = -abs($row['qty']); 
					 $v[$arr]['amount']        = -abs($row['qty']) * $price; 
					 $v[$arr]['price']         = abs($price);  
					 $v[$arr]['description']   = $row['description'];  
				}  
				if (isset($v)) {  
				    $this->mysql_model->insert(INVOICE_INFO,$v);
					$this->mysql_model->update(INVOICE,array('totalAmount'=>$amount),'(id='.$iid.')');
				} 
			 }
			 
			 if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'SQL错误回滚'); 
			 } else {
 
			    $this->db->trans_commit();
				$this->common_model->logs('新增其他出库 单据编号：'.$info['billNo']);
				$this->get_updateOut($id);
			 }
		}
		str_alert(-1,'提交的是空数据'); 
    }
	
	//新增
	public function addnewOo(){
	    $this->addOo();
    }
	
	 
	//修改
	public function updateOo(){
	    $this->common_model->checkpurview(20);
	    $postData = $data = $this->input->post('postData',TRUE);
		if (strlen($data)>0) {
		    $data = (array)json_decode($data, true); 
			$this->validform($data);
			$id   = intval($data['id']);
			$invoice = $this->mysql_model->get_row(INVOICE,'(id='.$id.') and billType="OO" and isDelete=0');
			count($invoice)<1 && str_alert(-1,'单据不存在');
			$info['buId']        = intval($data['buId']);
			$info['billDate']    = $data['date'];
			$info['billType']    = 'OO';
			$info['description'] = $data['description'];
			$info['totalAmount'] = (float)$data['totalAmount'];
			$info['totalQty']    = (float)$data['totalQty'];
			$info['transType']   = intval($data['transTypeId']);
			$info['transTypeName']   = $data['transTypeName'];
			$info['modifyTime']  = date('Y-m-d H:i:s');
			$info['uid']         = $this->jxcsys['uid'];
			$info['userName']    = $this->jxcsys['name'];
 
			$this->db->trans_begin();
			$this->mysql_model->update(INVOICE,$info,'(id='.$id.')');
			if (is_array($data['entries'])) { 
			     $amount = 0;
			     $cost  = $this->data_model->get_invoice_info_ini('and billDate<="'.date('Y-m-d').'" group by invId'); 
			     foreach ($data['entries'] as $arr=>$row) {
				     $price = isset($cost['inunitcost'][$row['invId']]) ? $cost['inunitcost'][$row['invId']] : 0;
					 $amount +=  -abs($row['qty']) * $price;
					 $v[$arr]['iid']           = $id;
				     $v[$arr]['billNo']        = $invoice['billNo'];
				     $v[$arr]['buId']          = $info['buId'];
					 $v[$arr]['transType']     = $info['transType'];
					 $v[$arr]['transTypeName'] = $info['transTypeName'];
					 $v[$arr]['billDate']      = $info['billDate']; 
					 $v[$arr]['billType']      = $info['billType'];
					 $v[$arr]['invId']         = intval($row['invId']);
					 $v[$arr]['skuId']         = intval($row['skuId']);
					 $v[$arr]['unitId']        = intval($row['unitId']);
					 $v[$arr]['locationId']    = intval($row['locationId']);
					 $v[$arr]['qty']           = -abs($row['qty']); 
					 $v[$arr]['amount']        = -abs($row['qty']) * $price;; 
					 $v[$arr]['price']         = abs($price);
					 $v[$arr]['description']   = $row['description'];   
				} 
				if (isset($v)) {
				    $this->mysql_model->delete(INVOICE_INFO,'(iid='.$id.')');
					$this->mysql_model->insert(INVOICE_INFO,$v);
					$this->mysql_model->update(INVOICE,array('totalAmount'=>$amount),'(id='.$id.')');
				}
			 }
			 
			 if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'SQL错误回滚'); 
			 } else {
			    $this->db->trans_commit();
				$this->common_model->logs('修改其他出库 单据编号：'.$invoice['billNo']);
				$this->get_updateOut($id);
			 }
		}
		str_alert(-1,'提交数据不为空'); 
    }
	
	
	//获取修改信息
	public function updateOut() {
	    $this->common_model->checkpurview(18);
	    $id   = intval($this->input->get_post('id',TRUE));
		$this->get_updateOut($id);
    }
	
	
	//获取修改信息
	private function get_updateOut($id) {
		$data = $this->data_model->get_invoice('and (a.id='.$id.') and billType="OO"',1);
		if (count($data)>0) {
			$v = array();
			$info['status'] = 200;
			$info['msg']    = 'success'; 
			$info['data']['id']                 = intval($data['id']);
			$info['data']['buId']               = intval($data['buId']);
			$info['data']['contactName']        = $data['contactName'];
			$info['data']['date']               = $data['billDate'];
			$info['data']['billNo']             = $data['billNo'];
			$info['data']['billType']           = $data['billType'];
			$info['data']['modifyTime']         = $data['modifyTime'];
			$info['data']['transType']          = intval($data['transType']);
			$info['data']['totalQty']           = (float)$data['totalQty'];
			$info['data']['totalAmount']        = (float)abs($data['totalAmount']);
			$info['data']['userName']           = $data['userName'];
			$info['data']['amount']             = (float)abs($data['totalAmount']);
			$info['data']['checked']            = intval($data['checked']); 
			$info['data']['status']             = intval($data['checked'])==1 ? 'view' : 'edit'; 
			$list = $this->data_model->get_invoice_info('and (iid='.$id.')  order by id desc');   
			foreach ($list as $arr=>$row) {
			    $v[$arr]['invSpec']      = $row['invSpec'];
				$v[$arr]['goods']        = $row['invNumber'].' '.$row['invName'].' '.$row['invSpec'];
				$v[$arr]['invName']      = $row['invName'];
				$v[$arr]['qty']          = (float)abs($row['qty']);
				$v[$arr]['amount']       = (float)abs($row['amount']);
				$v[$arr]['price']        = (float)$row['price'];
				$v[$arr]['mainUnit']     = $row['mainUnit'];
				$v[$arr]['description']  = $row['description'];
				$v[$arr]['invId']        = intval($row['invId']);
				$v[$arr]['invNumber']    = $row['invNumber'];
				$v[$arr]['locationId']   = intval($row['locationId']);
				$v[$arr]['locationName'] = $row['locationName'];
				$v[$arr]['unitId']       = intval($row['unitId']);
				$v[$arr]['skuId']        = intval($row['skuId']);
				$v[$arr]['skuName']      = '';
			}
			$info['data']['entries']     = $v;
			die(json_encode($info));
		}
		str_alert(-1,'单据不存在'); 
    }
	
	
	//打印
    public function toOoPdf() {
	    $this->common_model->checkpurview(9);
	    $id   = intval($this->input->get('id',TRUE));
		$data = $this->data_model->get_invoice('and (a.id='.$id.') and billType="OO"',1);  
		if (count($data)>0) { 
			$data['num']    = 53;
			$data['system'] = $this->common_model->get_option('system'); 
			$list = $this->data_model->get_invoice_info('and (iid='.$id.') order by id');  
			$data['countpage']  = ceil(count($list)/$data['num']);   
			foreach($list as $arr=>$row) {
			    $data['list'][] = array(
				'i'=>$arr + 1,
				'goods'=>$row['invNumber'].' '.$row['invName'],
				'invSpec'=>$row['invSpec'],
				'qty'=>abs($row['qty']),
				'price'=>$row['price'],
				'amount'=>$row['amount'],
				'locationName'=>$row['locationName']
				);  
			}
		    ob_start();
			$this->load->view('scm/invOi/toOoPdf',$data);
			$content = ob_get_clean();
			require_once('./application/libraries/html2pdf/html2pdf.php');
			try {
				$html2pdf = new HTML2PDF('P', 'A4', 'en');
				$html2pdf->setDefaultFont('javiergb');
				$html2pdf->pdf->SetDisplayMode('fullpage');
				$html2pdf->writeHTML($content, isset($_GET['vuehtml']));
				$html2pdf->Output('toOoPdf_'.date('ymdHis').'.pdf');
			}catch(HTML2PDF_exception $e) {
				echo $e;
				exit;
			}  
		} else {
		    str_alert(-1,'单据不存在、或者已删除');  	  
		}  
	}
	
	
	//删除
    public function deleteOut() {
	    $this->common_model->checkpurview(21);
	    $id   = intval($this->input->get('id',TRUE));
		$data = $this->mysql_model->get_row(INVOICE,'(id='.$id.') and billType="OO"');  
		if (count($data)>0) {
		    $info['isDelete'] = 1;
		    $this->db->trans_begin();
			$this->mysql_model->update(INVOICE,$info,'(id='.$id.')');   
			$this->mysql_model->update(INVOICE_INFO,$info,'(iid='.$id.')'); 
			if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'删除失败'); 
			} else {
			    $this->db->trans_commit();
				$this->common_model->logs('删除单据编号：'.$data['billNo']);
				str_alert(200,'success'); 	 
			}
		}
		str_alert(-1,'单据不存在'); 
	}
	
	//成本调整单
	public function listCbtz() {
	    $v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100);
		$matchCon  = str_enhtml($this->input->get_post('matchCon',TRUE));
		$beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate   = str_enhtml($this->input->get_post('endDate',TRUE));
		$locationId   = intval($this->input->get_post('locationId',TRUE));
		$where = ' and transType=150807';
		$where .= $matchCon  ? ' and (b.name like "%'.$matchCon.'%" or description like "%'.$matchCon.'%" or billNo like "%'.$matchCon.'%")' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 
		if ($locationId>0) {
		    $iid = $this->mysql_model->get_results(INVOICE_INFO,'(locationId='.$locationId.') and transType=150807 group by iid'); 
			if (is_array($iid) && count($iid)>0) {
			    $iid = array_column($iid, 'iid');
			    $iid = join(',',$iid);
			    $where .= ' and a.id in('.$iid.')'; 
			} else {
			    $where .= ' and 1<>1'; 
			}
		}
		$offset = $rows * ($page-1);
		$data['data']['page']      = $page;
		$data['data']['records']   = $this->data_model->get_invoice($where,3);  //总条数 
		$data['data']['total']     = ceil($data['data']['records']/$rows);                                //总分页数
		$list = $this->data_model->get_invoice($where.' order by id desc limit '.$offset.','.$rows.'');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['checkName']    = $row['checkName'];
			$v[$arr]['checked']      = intval($row['checked']);
			$v[$arr]['billDate']     = $row['billDate'];
			$v[$arr]['billType']     = $row['billType'];
			$v[$arr]['id']           = intval($row['id']);
		    $v[$arr]['amount']       = (float)$row['totalAmount'];
			$v[$arr]['transType']    = intval($row['transType']); 
			$v[$arr]['contactName']  = $row['contactName'];
			$v[$arr]['description']  = $row['description'];
			$v[$arr]['billNo']       = $row['billNo'];
			$v[$arr]['totalAmount']  = (float)$row['totalAmount'];
			$v[$arr]['userName']     = $row['userName'];
			$v[$arr]['transTypeName']= $row['transTypeName'];
			
		}
		$data['data']['rows']        = $v;
		die(json_encode($data));
	}
	
	
	public function exportInvCadj() {
	    $name = 'adjustment_record_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('导出成本调整单:'.$name);
		$matchCon  = str_enhtml($this->input->get_post('matchCon',TRUE));
		$beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate   = str_enhtml($this->input->get_post('endDate',TRUE));
		$locationId   = intval($this->input->get_post('locationId',TRUE));
		$where = ' and transType=150807';
		$where .= $matchCon  ? ' and (b.name like "%'.$matchCon.'%" or description like "%'.$matchCon.'%" or billNo like "%'.$matchCon.'%")' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 
		if ($locationId>0) {
		    $iid = $this->mysql_model->get_results(INVOICE_INFO,'(locationId='.$locationId.') and transType=150807 group by iid'); 
			if (is_array($iid) && count($iid)>0) {
			    $iid = array_column($iid, 'iid');
			    $iid = join(',',$iid);
			    $where .= ' and a.id in('.$iid.')'; 
			} else {
			    $where .= ' and 1<>1'; 
			}
		}
		$data['list1'] = $this->data_model->get_invoice($where.' order by id desc');  
		$where1 = ' and transType=150807';
		$where1 .= $beginDate ? ' and billDate>="'.$beginDate.'"' : ''; 
		$where1 .= $endDate ? ' and billDate<="'.$endDate.'"' : ''; 
		$where1 .= $locationId ? ' and locationId='.$locationId.'' : ''; 
		$data['list2'] = $this->data_model->get_invoice_info($where1.' order by billDate');  
		$this->load->view('scm/invOi/exportInvCadj',$data);  
	} 
	
	
	public function addCADJ() {
	    $this->common_model->checkpurview(19);
	    $data = $this->input->post('postData',TRUE);
		if (strlen($data)>0) {
		     $data = (array)json_decode($data, true); 
			 $info['billNo']      = str_no('CBTZ');
			 $info['billDate']    = $data['date'];
			 $info['description'] = $data['description'];
			 $info['totalAmount'] = (float)$data['totalAmount'];
			 $info['transType']   = 150807;
			 $info['transTypeName']   = '成本调整';
			 $info['billType']        = 'CADJ';
			 $info['uid']         = $this->jxcsys['uid'];
			 $info['userName']    = $this->jxcsys['name'];
			 $this->db->trans_begin();
			 $iid = $this->mysql_model->insert(INVOICE,$info);
			 if (is_array($data['entries'])) {
			     $storage = $this->mysql_model->get_results(STORAGE,'(disable=0)','id');   
			     foreach ($data['entries'] as $arr=>$row) {
					 $v[$arr]['iid']           = $iid;
				     $v[$arr]['billNo']        = $info['billNo'];
					 $v[$arr]['transType']     = $info['transType'];
					 $v[$arr]['transTypeName'] = $info['transTypeName'];
					 $v[$arr]['billDate']      = $info['billDate']; 
					 $v[$arr]['billType']      = $info['billType'];
					 $v[$arr]['invId']         = intval($row['invId']);
					 $v[$arr]['skuId']         = intval($row['skuId']);
					 $v[$arr]['unitId']        = intval($row['unitId']);
					 $v[$arr]['locationId']    = intval($row['locationId']); 
					 $v[$arr]['amount']        = $row['amount']; 
					 $v[$arr]['description']   = $row['description'];   
                  
				}  
				if (isset($v)) {
					$this->mysql_model->insert(INVOICE_INFO,$v);
				}  
			 }
			 
			 if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'SQL错误回滚'); 
			 } else {
			    $info['entries'] = $v;
			    $this->db->trans_commit();
				$this->common_model->logs('新增成本调整 单据编号：'.$info['billNo']);
				str_alert(200,'success',$data); 
			 }
		}
		str_alert(-1,'提交的是空数据'); 
	} 
	
	public function addNewCADJ() {
	     $this->addCADJ();
	} 
	
	
	public function updateCbtz() {
	    $this->common_model->checkpurview(20);
	    $id   = intval($this->input->get_post('id',TRUE));
		$data = $this->data_model->get_invoice('and (a.id='.$id.') and transType=150807',1);
		if (count($data)>0) {
			$info['status'] = 200;
			$info['msg']    = 'success'; 
			$info['data']['id']                 = intval($data['id']);
			$info['data']['date']               = $data['billDate'];
			$info['data']['billNo']             = $data['billNo'];
			$info['data']['billType']           = $data['billType'];
			$info['data']['modifyTime']         = $data['modifyTime'];
			$info['data']['transType']          = intval($data['transType']);
			$info['data']['totalQty']           = (float)$data['totalQty'];
			$info['data']['totalAmount']        = (float)$data['totalAmount'];
			$info['data']['userName']           = $data['userName'];
			$info['data']['amount']             = (float)$data['totalAmount'];
			$info['data']['checked']            = intval($data['checked']); 
			$info['data']['status']             = intval($data['checked'])==1 ? 'view' : 'edit'; 
			$list = $this->data_model->get_invoice_info('and (iid='.$id.')  order by id desc');   
			foreach ($list as $arr=>$row) {
			    $v[$arr]['invSpec']      = $row['invSpec'];
				$v[$arr]['goods']        = $row['invNumber'].' '.$row['invName'].' '.$row['invSpec'];
				$v[$arr]['invName']      = $row['invName'];
				$v[$arr]['amount']       = (float)$row['amount'];
				$v[$arr]['mainUnit']     = $row['mainUnit'];
				$v[$arr]['description']  = $row['description'];
				$v[$arr]['invId']        = intval($row['invId']);
				$v[$arr]['invNumber']    = $row['invNumber'];
				$v[$arr]['locationId']   = intval($row['locationId']);
				$v[$arr]['locationName'] = $row['locationName'];
				$v[$arr]['unitId']       = intval($row['unitId']);
				$v[$arr]['skuId']        = intval($row['skuId']);
				$v[$arr]['skuName']      = '';
			}
			$info['data']['entries']     = isset($v) ? $v :'';
			die(json_encode($info));
		}
		str_alert(-1,'单据不存在'); 
	} 
 
 
	public function updateCADJ() {
	    $this->common_model->checkpurview(20);
	    $postData = $data = $this->input->post('postData',TRUE);
		if (strlen($data)>0) {
		     $data = (array)json_decode($data, true); 
			 $id   = intval($data['id']);
			 $invoice = $this->mysql_model->get_row(INVOICE,'(id='.$id.') and transType=150807 and isDelete=0');
			 count($invoice)<1 && str_alert(-1,'单据不存在');
			 $info['billDate']    = $data['date'];
			 $info['transType']   = 150807;
			 $info['transTypeName']   = '成本调整';
			 $info['billType']        = 'CADJ';
			 $info['description'] = $data['description'];
			 $info['totalAmount'] = (float)$data['totalAmount'];
			 $info['modifyTime']  = date('Y-m-d H:i:s');
			 $info['uid']         = $this->jxcsys['uid'];
			 $info['userName']    = $this->jxcsys['name'];
			 $this->db->trans_begin();
			 $this->mysql_model->update(INVOICE,$info,'(id='.$id.')');
			 $this->mysql_model->delete(INVOICE_INFO,'(iid='.$id.')');
			 if (is_array($data['entries'])) {
			     $storage = $this->mysql_model->get_results(STORAGE,'(disable=0)','id');   
			     foreach ($data['entries'] as $arr=>$row) {
					 $v[$arr]['iid']           = $id;
				     $v[$arr]['billNo']        = $invoice['billNo'];
					 $v[$arr]['transType']     = $info['transType'];
					 $v[$arr]['transTypeName'] = $info['transTypeName'];
					 $v[$arr]['billDate']      = $info['billDate']; 
					 $v[$arr]['billType']      = $info['billType'];
					 $v[$arr]['invId']         = intval($row['invId']);
					 $v[$arr]['skuId']         = intval($row['skuId']);
					 $v[$arr]['unitId']        = intval($row['unitId']);
					 $v[$arr]['locationId']    = intval($row['locationId']); 
					 $v[$arr]['amount']        = abs($row['amount']); 
					 $v[$arr]['description']   = $row['description'];    
				} 
				if (isset($v)) {
					$this->mysql_model->insert(INVOICE_INFO,$v);
				}
			 }
			 
			 if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'SQL错误回滚'); 
			 } else {
			    $this->db->trans_commit();
				$this->common_model->logs('修改成本调整 单据编号：'.$invoice['billNo']);
				die('{"status":200,"msg":"success","data":'.$postData.'}');
			 }
		}
		str_alert(-1,'提交数据不为空'); 
	} 
	
	
	
	//打印
    public function toCBTZPdf() {
	    $this->common_model->checkpurview(9);
	    $id   = intval($this->input->get('id',TRUE));
		$data = $this->data_model->get_invoice('and (a.id='.$id.') and transType=150807',1);  
		if (count($data)>0) { 
			$data['num']    = 53;
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
				'amount'=>$row['amount'],
				'locationName'=>$row['locationName']
				);  
			}
		    ob_start();
			$this->load->view('scm/invOi/toCBTZPdf',$data);
			$content = ob_get_clean();
			require_once('./application/libraries/html2pdf/html2pdf.php');
			try {
				$html2pdf = new HTML2PDF('L', 'A4', 'en');
				$html2pdf->setDefaultFont('javiergb');
				$html2pdf->pdf->SetDisplayMode('fullpage');
				$html2pdf->writeHTML($content, isset($_GET['vuehtml']));
				$html2pdf->Output('exemple_cn.pdf');
			}catch(HTML2PDF_exception $e) {
				echo $e;
				exit;
			}  
		} else {
		    str_alert(-1,'单据不存在、或者已删除');  	  
		}  
	}

	
	//删除
    public function deleteCbtz() {
	    $this->common_model->checkpurview(21);
	    $id   = intval($this->input->get('id',TRUE));
		$data = $this->mysql_model->get_row(INVOICE,'(id='.$id.') and transType=150807');  
		if (count($data)>0) {
		    $info['isDelete'] = 1;
		    $this->db->trans_begin();
			$this->mysql_model->update(INVOICE,$info,'(id='.$id.')');   
			$this->mysql_model->update(INVOICE_INFO,$info,'(iid='.$id.')'); 
			if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'删除失败'); 
			} else {
			    $this->db->trans_commit();
				$this->common_model->logs('删除单据编号：'.$data['billNo']);
				str_alert(200,'success'); 	 
			}
		}
		str_alert(-1,'单据不存在'); 
	}
	
 
	//盘点查询
	public function queryToPD() {
	    $this->common_model->checkpurview(11);
	    $v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100);
		$showZero   = intval($this->input->get_post('showZero',TRUE));
		$categoryId = intval($this->input->get_post('categoryId',TRUE));
		$locationId = intval($this->input->get_post('locationId',TRUE));
		$goods = str_enhtml($this->input->get_post('goods',TRUE));
		$where = '';
		$where .= strlen($goods)>0 ? ' and (b.name like "%'.$goods.'%")' : '';
		$where .= $locationId>0 ? ' and locationId='.$locationId.'' : ''; 
		$where .= $categoryId>0 ? ' and categoryId='.$categoryId.'' : ''; 
		$having = $showZero == 1 ? ' HAVING qty=0' : '';
		$offset = $rows * ($page-1);
		$data['data']['page']      = $page;
		$data['data']['records']   = $this->data_model->get_inventory($where.' GROUP BY invId'.$having,3);   //总条数
		$data['data']['total']     = ceil($data['data']['records']/$rows);                               //总分页数
		$list = $this->data_model->get_inventory($where.' GROUP BY invId '.$having.' limit '.$offset.','.$rows);  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['assistName']    = $row['categoryName'];
			$v[$arr]['invSpec']       = $row['invSpec'];
			$v[$arr]['locationId']    = $locationId > 0 ? intval($row['locationId']) : 0;
			$v[$arr]['skuName']       = '';
		    $v[$arr]['qty']           = (float)$row['qty'];
			$v[$arr]['locationName']  = $locationId > 0 ? $row['locationName'] : '所有仓库';
			$v[$arr]['assistId']      = 0;
			$v[$arr]['invCost']       = 0;
			$v[$arr]['unitName']      = $row['unitName']; 
			$v[$arr]['skuId']         = 0;
			$v[$arr]['invId']         = intval($row['invId']);
			$v[$arr]['invNumber']     = $row['invNumber']; 
			$v[$arr]['invName']       = $row['invName']; 	 
		}
		$data['data']['rows']         = $v;
		die(json_encode($data));
	}
	
	//导出盘点单据
	public function exportToPD() {
	    $this->common_model->checkpurview(13);
		$name = 'pdReport_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('导出盘点单据:'.$name);
		$showZero   = intval($this->input->get_post('showZero',TRUE));
		$categoryId = intval($this->input->get_post('categoryId',TRUE));
		$data['locationId'] = $locationId = intval($this->input->get_post('locationId',TRUE));
		$goods = str_enhtml($this->input->get_post('goods',TRUE));
		$where = '';
		$where .= strlen($goods)>0 ? ' and (b.name like "%'.$goods.'%")' : '';
		$where .= $locationId>0 ? ' and locationId='.$locationId.'' : ''; 
		$where .= $categoryId>0 ? ' and categoryId='.$categoryId.'' : ''; 
		$having = $showZero == 1 ? ' HAVING qty=0' : '';
		$data['list'] = $this->data_model->get_inventory($where.' GROUP BY invId'.$having); 
		$this->load->view('scm/invOi/exportToPD',$data); 
	}
	
	//生成盘点单据
	public function generatorPD() {
	    $this->common_model->checkpurview(12);
	    $s = $v = array();
	    $info = $this->input->post('postData',TRUE);
		$data['status'] = 200;
		$data['msg']    = 'success'; 
		if (strlen($info)>0) {
		     $info = (array)json_decode($info, true); 
			 if (is_array($info['entries'])) {
			     foreach ($info['entries'] as $arr=>$row) {
				     intval($row['locationId']) < 1 && str_alert(-1,'必须选择某一仓库进行盘点'); 
					 if (intval($row['invId'])>0) {
						 if (intval($row['change'])>0) {  //盘盈
							 $v[$arr]['goods']         = $row['invNumber'].' '.$row['invName'].' '.$row['invSpec'];
							 $v[$arr]['description']   = '';
							 $v[$arr]['invId']         = intval($row['invId']);
							 $v[$arr]['invNumber']     = $row['invNumber'];
							 $v[$arr]['invName']       = $row['invName'];
							 $v[$arr]['invSpec']       = $row['invSpec'];
							 $v[$arr]['skuId']         = intval($row['skuId']);
							 $v[$arr]['skuName']       = $row['skuName'];
							 $v[$arr]['unitId']        = intval($row['unitId']);
							 $v[$arr]['amount']        = 0;
							 $v[$arr]['price']         = 0;
							 $v[$arr]['qty']           = (float)abs($row['change']);
							 $v[$arr]['mainUnit']      = $row['mainUnit'];
							 $v[$arr]['locationId']    = intval($row['locationId']);
							 $v[$arr]['locationName']  = $row['locationName']; 
						 } elseif(intval($row['change'])<0) {	 //盘亏 
							 $s[$arr]['goods']         = $row['invNumber'].' '.$row['invName'].' '.$row['invSpec'];
							 $s[$arr]['description']   = '';
							 $s[$arr]['invId']         = intval($row['invId']);
							 $s[$arr]['invNumber']     = $row['invNumber'];
							 $s[$arr]['invName']       = $row['invName'];
							 $s[$arr]['invSpec']       = $row['invSpec'];
							 $s[$arr]['skuId']         = intval($row['skuId']);
							 $s[$arr]['skuName']       = $row['skuName'];
							 $s[$arr]['unitId']        = intval($row['unitId']);
							 $s[$arr]['amount']        = 0;
							 $s[$arr]['price']         = 0;
							 $s[$arr]['qty']           = (float)abs($row['change']);
							 $s[$arr]['mainUnit']      = $row['mainUnit'];
							 $s[$arr]['locationId']    = intval($row['locationId']);
							 $s[$arr]['locationName']  = $row['locationName'];
						 }
					 }
				}  
				
				$data['data']['items'][0]['id']          = -1;
				$data['data']['items'][0]['billType']    = 'OI';
				$data['data']['items'][0]['transType']   = 150701;
				$data['data']['items'][0]['description'] = '';
				$data['data']['items'][0]['buId']        = 0;
				$data['data']['items'][0]['billNo']      = str_no('QTRK');
				$data['data']['items'][0]['totalAmount'] = 0;
				$data['data']['items'][0]['userName']    = '';
				$data['data']['items'][0]['totalQty']    = 1;
				$data['data']['items'][0]['date']        = date('Y-m-d');
				$data['data']['items'][0]['entries']     = isset($v) ? array_merge(array() , $v) :'';
				$data['data']['items'][1]['id']          = -1;
				$data['data']['items'][1]['billType']    = 'OO';
				$data['data']['items'][1]['transType']   = 150801;
				$data['data']['items'][1]['description'] = '';
				$data['data']['items'][1]['buId']        = 0;
				$data['data']['items'][1]['billNo']      = str_no('QTCK');
				$data['data']['items'][1]['totalAmount'] = 0;
				$data['data']['items'][1]['userName']    = '';
				$data['data']['items'][1]['totalQty']    = 1;
				$data['data']['items'][1]['date']        = date('Y-m-d');
				$data['data']['items'][1]['entries']     = isset($s) ? array_merge(array() , $s) :''; 
			}
			$data['data']['totalsize']                   = 2;
		    die(json_encode($data));
		}
		str_alert(-1,'提交的是空数据'); 
    }
	
	//公共验证
	private function validform($data) {
	    
	
		//商品录入验证
		if (is_array($data['entries'])) {
		    $system    = $this->common_model->get_option('system'); 
		    if ($system['requiredCheckStore']==1) {                                         //开启检查时判断
				$item = array();                     
				foreach($data['entries'] as $k=>$v){
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
			$storage   = array_column($this->mysql_model->get_results(STORAGE,'(disable=0)'),'id');  
			foreach ($item as $arr=>$row) {
				(float)$row['qty'] < 0 || !is_numeric($row['qty']) && str_alert(-1,'商品数量要为数字，请输入有效数字！'); 
				(float)$row['price'] < 0 || !is_numeric($row['price']) && str_alert(-1,'商品销售单价要为数字，请输入有效数字！'); 
				intval($row['locationId']) < 1 && str_alert(-1,'请选择相应的仓库！'); 
				!in_array(intval($row['locationId']),$storage) && str_alert(-1,$row['locationName'].'不存在或不可用！');

				//库存判断
				if ($system['requiredCheckStore']==1) {  
				    if (intval($data['transTypeId'])==150806) {                        //其他出库才验证 
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
		
		  
	}  

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */