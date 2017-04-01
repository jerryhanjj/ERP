<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Ori extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
		$this->jxcsys = $this->session->userdata('jxcsys');
    }
	
	public function index() {
	    $action = $this->input->get('action',TRUE);
		switch ($action) {
			case 'initInc':
			    $this->common_model->checkpurview(135);
			    $this->load->view('scm/ori/initInc');	
				break; 
			case 'editInc':
			    $this->common_model->checkpurview(136);
			    $this->load->view('scm/ori/initInc');	
				break;  
			case 'initIncList':
			    $this->common_model->checkpurview(134);
			    $this->load->view('scm/ori/initIncList');
				break; 
			case 'initExp':
			    $this->common_model->checkpurview(140);
			    $this->load->view('scm/ori/initExp');	
				break; 
			case 'editExp':
			    $this->common_model->checkpurview(141);
			    $this->load->view('scm/ori/initExp');	
				break;  
			case 'initExpList':
			    $this->common_model->checkpurview(139);
			    $this->load->view('scm/ori/initExpList');
				break; 	 	
			default:  
		}
	}
	
	//其他收入列表
	public function listInc() {
	    $this->common_model->checkpurview(134);
	    $v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100);
		$transtypeid = intval($this->input->get_post('transTypeId',TRUE));
		$matchCon  = str_enhtml($this->input->get_post('matchCon',TRUE));
		$beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate   = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and a.transType=153401';
		$where .= $matchCon  ? ' and (b.name like "%'.$matchCon.'%" or description like "%'.$matchCon.'%" or billNo like "%'.$matchCon.'%")' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 
		$offset = $rows * ($page-1);
		$data['data']['page']      = $page;
		$data['data']['records']   = $this->data_model->get_invoice($where,3);   //总条数
		$data['data']['total']     = ceil($data['data']['records']/$rows);                                 //总分页数
		$list = $this->data_model->get_invoice($where.' order by id desc limit '.$offset.','.$rows.'');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['id']           = intval($row['id']);
		    $v[$arr]['checkName']    = $row['checkName'];
			$v[$arr]['billDate']     = $row['billDate'];
			$v[$arr]['billType']     = $row['billType'];
		    $v[$arr]['amount']       = (float)$row['amount'];
			$v[$arr]['transType']    = intval($row['transType']);;
			$v[$arr]['contactName']  = $row['contactName'];
			$v[$arr]['description']  = $row['description'];
			$v[$arr]['billNo']       = $row['billNo'];
			$v[$arr]['totalAmount']  = (float)$row['amount'];
			$v[$arr]['userName']     = $row['userName'];
			$v[$arr]['transTypeName']= $row['transTypeName'];
			$v[$arr]['checked']      = intval($row['checked']);
		}
		$data['data']['rows']        = $v;
		die(json_encode($data));
	}
	
	//导出其他收入
	public function exportInc() {
	    $this->common_model->checkpurview(138);
		$name = 'other_receipt_record_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('导出其他收入单:'.$name);
		$transtypeid = intval($this->input->get_post('transTypeId',TRUE));
		$matchCon  = str_enhtml($this->input->get_post('matchCon',TRUE));
		$beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate   = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and a.transType=153401';
		$where .= $matchCon  ? ' and (b.name like "%'.$matchCon.'%" or description like "%'.$matchCon.'%" or billNo like "%'.$matchCon.'%")' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 
		$where1 = ' and transType=153401';
		$where1 .= $beginDate ? ' and billDate>="'.$beginDate.'"' : ''; 
		$where1 .= $endDate ? ' and billDate<="'.$endDate.'"' : ''; 
		$data['list1'] = $this->data_model->get_invoice($where.' order by id desc'); 
		$data['list2'] = $this->data_model->get_account_info($where1.' order by billDate');   
		$this->load->view('scm/ori/exportInc',$data);
	}
	
	
	//其他收入新增
	public function addInc(){
	    $this->common_model->checkpurview(135);
	    $data = $this->input->post('postData',TRUE);
		if (strlen($data)>0) {
		     $data = (array)json_decode($data, true);
			 $this->validform($data);
			 $info['billNo']          = str_no('QTSR');
			 $info['buId']            = intval($data['buId']);
			 $info['billDate']        = $data['date'];
			 $info['amount']          = (float)$data['totalAmount'];
			 $info['transTypeName']   = '其他收入';
			 $info['transType']       = '153401';
			 $info['billType']        = 'QTSR';
			 $info['uid']             = $this->jxcsys['uid'];
			 $info['userName']        = $this->jxcsys['name'];
			 $info['accId']           = (float)$data['accId'];
			 $this->db->trans_begin();
			 $iid = $this->mysql_model->insert(INVOICE,$info);
			 if (isset($data['entries'])&&is_array($data['entries'])) {
			     foreach ($data['entries'] as $arr=>$row) {
				     $v[$arr]['iid']           = $iid;
				     $v[$arr]['billNo']        = $info['billNo'];
				     $v[$arr]['buId']          = $info['buId'];
					 $v[$arr]['billType']      = $info['billType'];
				     $v[$arr]['billDate']      = $info['billDate']; 
					 $v[$arr]['transTypeName'] = $info['transTypeName'];
					 $v[$arr]['transType']     = $info['transType'];
					 $v[$arr]['accId']         = $info['accId'];
					 $v[$arr]['payment']       = $row['amount']; 
					 $v[$arr]['wayId']         = $row['categoryId'];
					 $v[$arr]['remark']        = $row['description'];
				}
				if (isset($v)) {  
					$this->mysql_model->insert(ACCOUNT_INFO,$v);
				}
             }
			 if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'SQL错误回滚'); 
			 } else {
			    $this->db->trans_commit();
				$this->common_model->logs('新增其他收入 单据编号：'.$info['billNo']);
				str_alert(200,'success',array('id'=>intval($iid))); 
			 }
		}
		str_alert(-1,'提交的是空数据'); 
    }
	
	//新增  
	public function addNewInc(){
	    $this->addInc();
    }
	    
	//修改
	public function updateInc(){
	    $this->common_model->checkpurview(136);
	    $data = $this->input->post('postData',TRUE);
		if (strlen($data)>0) {
		     $data = (array)json_decode($data, true);
			 $this->validform($data);
			 $id   = intval($data['id']);
			 $invoice = $this->mysql_model->get_row(INVOICE,'(id='.$id.') and transType=153401');
			 count($invoice)<1 && str_alert(-1,'参数错误');  
			 $info['buId']            = intval($data['buId']);
			 $info['billDate']        = $data['date'];
			 $info['amount']          = (float)$data['totalAmount'];
			 $info['transTypeName']   = '其他收入';
			 $info['transType']       = '153401';
			 $info['billType']        = 'QTSR';
			 $info['uid']             = $this->jxcsys['uid'];
			 $info['userName']        = $this->jxcsys['name'];
			 $info['accId']           = (float)$data['accId'];
			 $this->db->trans_begin();
			 $this->mysql_model->update(INVOICE,$info,'(id='.$id.')');
			 if (isset($data['entries'])&&is_array($data['entries'])) {
			     foreach ($data['entries'] as $arr=>$row) {
				     $v[$arr]['iid']           = $id;
				     $v[$arr]['billNo']        = $invoice['billNo'];
				     $v[$arr]['buId']          = $info['buId'];
					 $v[$arr]['billType']      = $info['billType'];
				     $v[$arr]['billDate']      = $info['billDate']; 
					 $v[$arr]['transTypeName'] = $info['transTypeName'];
					 $v[$arr]['transType']     = $info['transType'];
					 $v[$arr]['accId']         = $info['accId'];
					 $v[$arr]['payment']       = $row['amount']; 
					 $v[$arr]['wayId']         = $row['categoryId'];
					 $v[$arr]['remark']        = $row['description'];
				} 
				if (isset($v)) {  
					$this->mysql_model->delete(ACCOUNT_INFO,'(iid='.$id.')');
			        $this->mysql_model->insert(ACCOUNT_INFO,$v);
				} 
             }
			 if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'SQL错误'); 
			 } else {
			    $this->db->trans_commit();
				$this->common_model->logs('修改其他收入 单据编号：'.$invoice['billNo']);
				str_alert(200,'success',array('id'=>$id)); 
			 }
		}
		str_alert(-1,'单据不存在'); 
    }
	
	
	//获取修改信息
	public function getIncDetail() {
	    $this->common_model->checkpurview(136);
	    $id   = intval($this->input->get_post('id',TRUE));
		$data = $this->data_model->get_invoice('and (a.id='.$id.') and transType=153401',1); 
		if (count($data)>0) {
			$v = array();
			$info['status'] = 200;
			$info['msg']    = 'success'; 
			$info['data']['id']             = intval($data['id']);
			$info['data']['buId']           = intval($data['buId']);
			$info['data']['contactName']    = $data['contactName'];
			$info['data']['date']           = $data['billDate'];
			$info['data']['billNo']         = $data['billNo'];
			$info['data']['amount']         = (float)$data['totalAmount'];
			$info['data']['status']         = 'edit'; 
			$info['data']['accId']          = intval($data['accId']);
			$info['data']['acctName']       = ''; 
			$accounts = $this->data_model->get_account_info('and (iid='.$id.')  order by id');  
			foreach ($accounts as $arr=>$row) {
				$v[$arr]['amount']          = (float)$row['payment']; 
				$v[$arr]['categoryId']      = (float)$row['wayId']; 
				$v[$arr]['description']     = $row['remark'];
				$v[$arr]['categoryName']    = $row['categoryName']; 
		    }   
			$info['data']['entries']        = $v; 
			die(json_encode($info));
		}
		str_alert(-1,'单据不存在'); 
    }
	
	//删除
    public function deleteInc() {
	    $this->common_model->checkpurview(137);
	    $id   = intval($this->input->get('id',TRUE));
		$data = $this->mysql_model->get_row(INVOICE,'(id='.$id.') and transType=153401');  
		if (count($data)>0) {
		    $info['isDelete'] = 1;
		    $this->db->trans_begin();
			$this->mysql_model->update(INVOICE,$info,'(id='.$id.')');   
			$this->mysql_model->update(ACCOUNT_INFO,$info,'(iid='.$id.')');   
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
	
 
	 
	 
	//其他支出单列表
	public function listExp() {
	    $this->common_model->checkpurview(139);
	    $v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100);
		$matchCon  = str_enhtml($this->input->get_post('matchCon',TRUE));
		$beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate   = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and a.transType=153402';
		$where .= $matchCon  ? ' and (b.name like "%'.$matchCon.'%" or billNo like "%'.$matchCon.'%")' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 
		$offset = $rows * ($page-1);
		$data['data']['page']      = $page;
		$data['data']['records']   = $this->data_model->get_invoice($where,3);   //总条数
		$data['data']['total']     = ceil($data['data']['records']/$rows);                     //总分页数
		$list = $this->data_model->get_invoice($where.' order by id desc limit '.$offset.','.$rows.'');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['checkName']    = $row['checkName'];
			$v[$arr]['billDate']     = $row['billDate'];
			$v[$arr]['billType']     = $row['billType'];
			$v[$arr]['id']           = intval($row['id']);
		    $v[$arr]['amount']       = (float)$row['amount'];
			$v[$arr]['transType']    = intval($row['transType']);;
			$v[$arr]['contactName']  = $row['contactName'];
			$v[$arr]['description']  = $row['description'];
			$v[$arr]['billNo']       = $row['billNo'];
			$v[$arr]['totalAmount']  = (float)$row['amount'];
			$v[$arr]['userName']     = $row['userName'];
			$v[$arr]['transTypeName']= '';
			$v[$arr]['checked']      = intval($row['checked']);
		}
		$data['data']['rows']        = $v;
		die(json_encode($data));
	}
	
	//导出其他支出
	public function exportExp() {
	    $this->common_model->checkpurview(143);
		$name = 'other_payment_record_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('导出其他支出单:'.$name);
		$transtypeid = intval($this->input->get_post('transTypeId',TRUE));
		$matchCon  = str_enhtml($this->input->get_post('matchCon',TRUE));
		$beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate   = str_enhtml($this->input->get_post('endDate',TRUE));
		$where = ' and a.transType=153402';
		$where .= $matchCon  ? ' and (b.name like "%'.$matchCon.'%" or billNo like "%'.$matchCon.'%")' : ''; 
		$where .= $beginDate ? ' and a.billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and a.billDate<="'.$endDate.'"' : ''; 
		$where1 = ' and transType=153402';
		$where1 .= $beginDate ? ' and billDate>="'.$beginDate.'"' : ''; 
		$where1 .= $endDate ? ' and billDate<="'.$endDate.'"' : ''; 
		$data['list1'] = $this->data_model->get_invoice($where.' order by id desc'); 
		$data['list2'] = $this->data_model->get_account_info($where1.' order by billDate');   
		$this->load->view('scm/ori/exportExp',$data);
	}
	
	//新增
	public function addExp(){
	    $this->common_model->checkpurview(140);
	    $data = $this->input->post('postData',TRUE);
		if (strlen($data)>0) {
		     $data = (array)json_decode($data, true);
			 $this->validform($data);
			 $info['billNo']          = str_no('QTZC');
			 $info['buId']            = intval($data['buId']);
			 $info['billDate']        = $data['date'];
			 $info['amount']          = (float)$data['totalAmount'];
			 $info['transTypeName']   = '其他支出';
			 $info['transType']       = '153402';
			 $info['billType']        = 'QTZC';
			 $info['uid']             = $this->jxcsys['uid'];
			 $info['userName']        = $this->jxcsys['name'];
			 $info['accId']           = intval($data['accId']);
			 $this->db->trans_begin();
			 $iid = $this->mysql_model->insert(INVOICE,$info);
			 if (isset($data['entries'])&&is_array($data['entries'])) {
			     foreach ($data['entries'] as $arr=>$row) {
				     $v[$arr]['iid']           = $iid;
				     $v[$arr]['billNo']        = $info['billNo'];
				     $v[$arr]['buId']          = $info['buId'];
					 $v[$arr]['billType']      = $info['billType'];
				     $v[$arr]['billDate']      = $info['billDate']; 
					 $v[$arr]['transTypeName'] = $info['transTypeName'];
					 $v[$arr]['transType']     = $info['transType'];
					 $v[$arr]['accId']         = $info['accId'];
					 $v[$arr]['payment']       = -$row['amount']; 
					 $v[$arr]['wayId']         = $row['categoryId'];
					 $v[$arr]['remark']        = $row['description'];
				} 
				if (isset($v)) {   
					$this->mysql_model->insert(ACCOUNT_INFO,$v);
				} 
             }
			 
			 if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'SQL错误回滚'); 
			 } else {
			    $this->db->trans_commit(); 
				$this->common_model->logs('新增其他收入 单据编号：'.$info['billNo']);
				str_alert(200,'success',array('id'=>intval($iid))); 
			 }
		} else {
		    str_alert(-1,'提交的是空数据'); 
		}
    }
	
	//新增
	public function addNewExp(){
	    $this->addExp();
    }
	
	 
	//修改
	public function updateExp(){
	    $this->common_model->checkpurview(141);
	    $postData = $data = $this->input->post('postData',TRUE);
		if (strlen($data)>0) {
		     $data = (array)json_decode($data, true);
			 $this->validform($data);
			 $id   = intval($data['id']);
			 $invoice = $this->mysql_model->get_row(INVOICE,'(id='.$id.') and transType=153402');
			 count($invoice)<1 && str_alert(-1,'单据不存在');  
			 $info['buId']            = intval($data['buId']);
			 $info['billDate']        = $data['date'];
			 $info['amount']          = (float)$data['totalAmount'];
			 $info['transTypeName']   = '其他支出';
			 $info['transType']       = '153402';
			 $info['billType']        = 'QTZC';
			 $info['uid']             = $this->jxcsys['uid'];
			 $info['userName']        = $this->jxcsys['name'];
			 $info['accId']           = (float)$data['accId'];
			 $this->db->trans_begin();
			 $this->mysql_model->update(INVOICE,$info,'(id='.$id.')');
			 if (isset($data['entries'])&&is_array($data['entries'])) {
 
			     foreach ($data['entries'] as $arr=>$row) {
				     $v[$arr]['iid']           = $id;
				     $v[$arr]['billNo']        = $invoice['billNo'];
				     $v[$arr]['buId']          = $info['buId'];
					 $v[$arr]['billType']      = $info['billType'];
				     $v[$arr]['billDate']      = $info['billDate']; 
					 $v[$arr]['transTypeName'] = $info['transTypeName'];
					 $v[$arr]['transType']     = $info['transType'];
					 $v[$arr]['accId']         = $info['accId'];
					 $v[$arr]['payment']       = -$row['amount']; 
					 $v[$arr]['wayId']         = $row['categoryId'];
					 $v[$arr]['remark']        = $row['description'];
				}  
				if (isset($v)) {  
					$this->mysql_model->delete(ACCOUNT_INFO,'(iid='.$id.')');
					$this->mysql_model->insert(ACCOUNT_INFO,$v);
				}
             }
			 if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'SQL错误回滚'); 
			 } else {
			    $this->db->trans_commit();
				$this->common_model->logs('修改其他支出 单据编号：'.$invoice['billNo']);
				str_alert(200,'success',array('id'=>$id)); 
			 }
		} else {
		    str_alert(-1,'参数错误'); 
		}
    }
	
	
	//获取修改信息
	public function getExpDetail() {
	    $this->common_model->checkpurview(141);
	    $id   = intval($this->input->get_post('id',TRUE));
		$data = $this->data_model->get_invoice('and (a.id='.$id.') and transType=153402',1); 
		if (count($data)>0) {
			$v = array();
			$info['status'] = 200;
			$info['msg']    = 'success'; 
			$info['data']['id']             = intval($data['id']);
			$info['data']['buId']           = intval($data['buId']);
			$info['data']['contactName']    = $data['contactName'];
			$info['data']['date']           = $data['billDate'];
			$info['data']['billNo']         = $data['billNo'];
			$info['data']['amount']         = (float)abs($data['amount']);
			$info['data']['status']         = 'edit'; 
			$info['data']['accId']          = intval($data['accId']);
			$info['data']['acctName']       = ''; 
			$accounts = $this->data_model->get_account_info('and (iid='.$id.')  order by id');  
			foreach ($accounts as $arr=>$row) {
				$v[$arr]['amount']          = (float)$row['payment']>0 ? -abs($row['payment']) : abs($row['payment']); 
				$v[$arr]['categoryId']      = (float)$row['wayId']; 
				$v[$arr]['description']     = $row['remark'];
				$v[$arr]['categoryName']    = $row['categoryName']; 
		    }   
			 
			$info['data']['entries']        = $v; 
			die(json_encode($info));
		} else { 
		    str_alert(-1,'参数错误'); 
		}
    }
	
	//删除
    public function deleteExp() {
	    $this->common_model->checkpurview(142);
	    $id   = intval($this->input->get('id',TRUE));
		$data = $this->mysql_model->get_row(INVOICE,'(id='.$id.') and transType=153402');  
		if (count($data)>0) {
		    $info['isDelete'] = 1;
		    $this->db->trans_begin();
			$this->mysql_model->update(INVOICE,$info,'(id='.$id.')');   
			$this->mysql_model->update(ACCOUNT_INFO,$info,'(iid='.$id.')');   
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
	
	//公共验证
	private function validform($data) {
	    if (isset($data['entries'])&&is_array($data['entries'])) {
			foreach ($data['entries'] as $arr=>$row) {
				
			}
		} else {	
		    str_alert(-1,'提交的是空数据');   
        }
	}  
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */

