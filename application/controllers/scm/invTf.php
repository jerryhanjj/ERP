<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class InvTf extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
		$this->jxcsys = $this->session->userdata('jxcsys');
    }
	
	public function index() {
	    $action = $this->input->get('action',TRUE);
		switch ($action) {
			case 'initTf':
			    $this->common_model->checkpurview(145);
			    $this->load->view('scm/invTf/initTf');	
				break;  
			case 'editTf':
			    $this->common_model->checkpurview(146);
			    $this->load->view('scm/invTf/initTf');	
				break;  	
			case 'initTfList':
			    $this->common_model->checkpurview(144);
			    $this->load->view('scm/invTf/initTfList');
				break; 
			default:  
			    $this->tfList();	
		}
	}
	
	//调拨单列表
	public function tfList(){
	    $this->common_model->checkpurview(144);
		$v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100);
		$matchCon  = str_enhtml($this->input->get_post('matchCon',TRUE));
		$beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate   = str_enhtml($this->input->get_post('endDate',TRUE));
		$inLocationId    = intval($this->input->get_post('inLocationId',TRUE));
		$outLocationId   = intval($this->input->get_post('outLocationId',TRUE)); 
		$where = ' and transType=103091'; 
		$where .= $matchCon ? ' and (description like "%'.$matchCon.'%" or billNo like "%'.$matchCon.'%")' : ''; 
		$where .= $beginDate ? ' and billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and billDate<="'.$endDate.'"' : ''; 
		$offset = $rows * ($page-1);
		$data['data']['page']      = $page;
		$data['data']['records']   = $this->data_model->get_invoice($where,3);   //总条数
		$data['data']['total']     = ceil($data['data']['records']/$rows);       //总分页数
		$info = $this->data_model->get_invoice_info($where.' order by id'); 
		//查询
		if ($inLocationId>0 || $outLocationId>0) {
		    $a1 = $this->data_model->get_invoice_info($where.' and locationId='.$inLocationId.' and qty>0 group by iid');  
			$a2 = $this->data_model->get_invoice_info($where.' and locationId='.$outLocationId.' and qty<0 group by iid');  
		    $a1 = count($a1)>0 ? array_column($a1, 'iid') : array();
			$a2 = count($a2)>0 ? array_column($a2, 'iid') : array();
			$a3 = array_intersect($a1, $a2);
			if (is_array($a3) && count($a3)>0) {
			    $id = join(',',$a3);
			    $where .= ' and a.id in('.$id.')'; 
			} else {
			    $where .= ' and 1<>1'; 
			}
		} 
		$list = $this->data_model->get_invoice($where.' order by id desc limit '.$offset.','.$rows.'');  
		foreach ($list as $arr=>$row) {
		    foreach ($info as $arr1=>$row1) {
			    if ($row1['iid']==$row['id']) {
				    if ($row1['qty']>0) {
					    $qty[$row['id']][]             = abs($row1['qty']);
						$mainUnit[$row['id']][]        = $row1['mainUnit'];
						$goods[$row['id']][]           = $row1['invNumber'].' '.$row1['invName'].' '.$row1['invSpec'];
					    $inLocationName[$row['id']][]  = $row1['locationName'];
					} else {
					    $outLocationName[$row['id']][] = $row1['locationName'];
					}
				}
			}
		    $v[$arr]['id']                 = intval($row['id']);
			$v[$arr]['billDate']           = $row['billDate'];
			$v[$arr]['qty']                = $qty[$row['id']];
			$v[$arr]['goods']              = $goods[$row['id']];
			$v[$arr]['mainUnit']           = $mainUnit[$row['id']];
			$v[$arr]['description']        = $row['description'];
			$v[$arr]['billNo']             = $row['billNo'];
			$v[$arr]['userName']           = $row['userName']; 
			$v[$arr]['outLocationName']    = $outLocationName[$row['id']];
			$v[$arr]['inLocationName']     = $inLocationName[$row['id']];
		}
		$data['data']['rows']        = $v ;
		die(json_encode($data));
	}
	
	//导出
	public function exportInvTf(){
	    $this->common_model->checkpurview(148);
		$name = 'db_record_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('导出调拨单据:'.$name);
		$matchCon  = str_enhtml($this->input->get_post('matchCon',TRUE));
		$beginDate = str_enhtml($this->input->get_post('beginDate',TRUE));
		$endDate   = str_enhtml($this->input->get_post('endDate',TRUE));
		$inLocationId    = intval($this->input->get_post('inLocationId',TRUE));
		$outLocationId   = intval($this->input->get_post('outLocationId',TRUE)); 
		$where = ' and transType=103091'; 
		$where .= $matchCon     ? ' and (description like "%'.$matchCon.'%" or billNo like "%'.$matchCon.'%")' : ''; 
		$where .= $beginDate ? ' and billDate>="'.$beginDate.'"' : ''; 
		$where .= $endDate ? ' and billDate<="'.$endDate.'"' : ''; 
		$v = array(); 
		$list = $this->data_model->get_invoice_info($where.' and qty>0 order by id');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['iid']             = intval($row['iid']);
			$v[$arr]['invId']           = intval($row['invId']);
			$v[$arr]['invNumber']       = $row['invNumber'];
			$v[$arr]['invSpec']         = $row['invSpec'];
			$v[$arr]['invName']         = $row['invName'];
			$v[$arr]['goods']           = $row['invNumber'].' '.$row['invName'].' '.$row['invSpec'];
			$v[$arr]['qty']             = (float)abs($row['qty']);
			$v[$arr]['mainUnit']        = $row['mainUnit'];
			$v[$arr]['unitId']          = intval($row['unitId']);
			$v[$arr]['inLocationId']    = $row['locationId'];
			$v[$arr]['inLocationName']  = $row['locationName'];
			$v[$arr]['description']     = $row['description'];
		}
		$list = $this->data_model->get_invoice_info($where.' and qty<0  order by id'); 
		foreach ($list as $arr=>$row) {
			$v[$arr]['outLocationId']   = $row['locationId'];
			$v[$arr]['outLocationName'] = $row['locationName'];
		}
		
		//查询
		if ($inLocationId>0 || $outLocationId>0) {
		    $a1 = $this->data_model->get_invoice_info($where.' and locationId='.$inLocationId.' and qty>0 group by iid');  
			$a2 = $this->data_model->get_invoice_info($where.' and locationId='.$outLocationId.' and qty<0 group by iid');  
		    $a1 = count($a1)>0 ? array_column($a1, 'iid') : array();
			$a2 = count($a2)>0 ? array_column($a2, 'iid') : array();
			$a3 = array_intersect($a1, $a2);
			if (is_array($a3) && count($a3)>0) {
			    $id = join(',',$a3);
			    $where .= ' and a.id in('.$id.')'; 
			} else {
			    $where .= ' and 1<>1'; 
			}
		} 
		$data['list1'] = $this->data_model->get_invoice($where.' order by id desc');  
		$data['list2'] = $v;  
		$this->load->view('scm/invtf/exportInvTf',$data);	
	}
	
 
    //新增
	public function add(){
	    $this->common_model->checkpurview(145);
	    $data = $this->input->post('postData',TRUE);
		if (strlen($data)>0) {
		     $data = (array)json_decode($data, true);
			 $this->validform($data);
			 $this->db->trans_begin();
			 $info['billNo']          = str_no('DB');  
			 $info['billType']        = 'TRANSFER';
			 $info['transType']       = 103091;
			 $info['transTypeName']   = '调拨单';
			 $info['billDate']        = $data['date'];
			 $info['description']     = $data['description'];
			 $info['totalQty']        = (float)$data['totalQty'];
			 $info['uid']             = $this->jxcsys['uid'];
			 $info['userName']        = $this->jxcsys['name'];
			 $iid = $this->mysql_model->insert(INVOICE,$info);
			 if (is_array($data['entries'])) {
			     foreach ($data['entries'] as $arr=>$row) {
				     if (intval($row['invId'])>0) {
						 $s[$arr]['iid']             = $v[$arr]['iid']             = $iid;
						 $s[$arr]['billNo']          = $v[$arr]['billNo']          = $info['billNo'];
						 $s[$arr]['billDate']        = $v[$arr]['billDate']        = $info['billDate'];
						 $s[$arr]['invId']           = $v[$arr]['invId']           = intval($row['invId']);
						 $s[$arr]['skuId']           = $v[$arr]['skuId']           = intval($row['skuId']);
						 $s[$arr]['unitId']          = $v[$arr]['unitId']          = intval($row['unitId']);
						 $s[$arr]['billType']        = $v[$arr]['billType']        = $info['billType'];
						 $s[$arr]['description']     = $v[$arr]['description']     = $row['description'];  
						 $s[$arr]['transTypeName']   = $v[$arr]['transTypeName']   = $info['transTypeName'];
						 $s[$arr]['transType']       = $v[$arr]['transType']       = $info['transType'];
						 $v[$arr]['locationId']      = intval($row['inLocationId']);
						 $v[$arr]['qty']             = abs($row['qty']); 
						 $v[$arr]['entryId']         = 1;
						 $s[$arr]['locationId']      = intval($row['outLocationId']);
						 $s[$arr]['qty']             = -abs($row['qty']);  
						 $s[$arr]['entryId']         = 2;
					 }
				} 
				if (isset($s) && isset($v)) {
					$this->mysql_model->insert(INVOICE_INFO,$v);
					$this->mysql_model->insert(INVOICE_INFO,$s);
				}
				
			 }
			 if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'SQL错误'); 
			 } else {
			    $this->db->trans_commit();
				$this->common_model->logs('新增调拨单编号：'.$info['billNo']);
				str_alert(200,'success',array('id'=>intval($iid))); 
			 }
		}
		str_alert(-1,'提交的是空数据'); 
    }
	
	//新增
	public function addNew(){
	    $this->add();
    }
	
	
	//信息
	public function update() {
	    $this->common_model->checkpurview(144);
	    $id   = intval($this->input->get_post('id',TRUE));
		$data = $this->mysql_model->get_row(INVOICE,'(id='.$id.') and transType=103091 and isDelete=0');
		if (count($data)>0) {
			$v = array();
			$info['status'] = 200;
			$info['msg']    = 'success'; 
			$info['data']['id']             = intval($data['id']);
			$info['data']['date']           = $data['billDate'];
			$info['data']['billNo']         = $data['billNo'];
			$info['data']['totalQty']       = (float)$data['totalQty']; 
			$info['data']['description']    = $data['description'];
			$info['data']['userName']       = $data['userName']; 
			$info['data']['status']         = 'edit'; 
			$list = $this->data_model->get_invoice_info('and (iid='.$id.') and qty>0  order by id');  
			foreach ($list as $arr=>$row) {
			    if (intval($row['invId'])>0) {
					$v[$arr]['invId']           = intval($row['invId']);
					$v[$arr]['invNumber']       = $row['invNumber'];
					$v[$arr]['invSpec']         = $row['invSpec'];
					$v[$arr]['invName']         = $row['invName'];
					$v[$arr]['goods']           = $row['invNumber'].' '.$row['invName'].' '.$row['invSpec'];
					$v[$arr]['qty']             = (float)abs($row['qty']);
					$v[$arr]['mainUnit']        = $row['mainUnit'];
					$v[$arr]['unitId']          = intval($row['unitId']);
					$v[$arr]['inLocationId']    = $row['locationId'];
					$v[$arr]['inLocationName']  = $row['locationName'];
				}
			}
			$list = $this->data_model->get_invoice_info('and (iid='.$id.') and qty<0 order by id'); 
			foreach ($list as $arr=>$row) {
				$v[$arr]['outLocationId']   = $row['locationId'];
				$v[$arr]['outLocationName'] = $row['locationName'];
			}
			$info['data']['entries']   = $v;
			die(json_encode($info));
		}
		str_alert(-1,'单据不存在'); 
    }
	
	
	//修改
	public function updateInvTf(){
	    $this->common_model->checkpurview(146);
	    $data = $this->input->post('postData',TRUE);
		if (strlen($data)>0) {
		     $data = (array)json_decode($data, true);
			 $id   = intval($data['id']);	  
			 $this->validform($data);
			 $invoice = $this->mysql_model->get_row(INVOICE,'(id='.$id.') and transType=103091');
			 count($invoice)<1 && str_alert(-1,'该单据不存在');
			 $this->db->trans_begin();
			 $info['billType']       = 'TRANSFER';
			 $info['transType']      = 103091;
			 $info['transTypeName']  = '调拨单';
			 $info['billDate']       = $data['date'];
			 $info['description']    = $data['description'];
			 $info['totalQty']       = (float)$data['totalQty'];
			 $info['modifyTime']     = date('Y-m-d H:i:s');
			 $info['uid']            = $this->jxcsys['uid'];
			 $info['userName']       = $this->jxcsys['name'];
			 $this->mysql_model->delete(INVOICE_INFO,'(iid='.$id.')');
			 if (is_array($data['entries'])) {
			     foreach ($data['entries'] as $arr=>$row) {
				     $s[$arr]['iid']             = $v[$arr]['iid']             = $id;
				     $s[$arr]['billNo']          = $v[$arr]['billNo']          = $invoice['billNo'];
					 $s[$arr]['billDate']        = $v[$arr]['billDate']        = $info['billDate'];
					 $s[$arr]['invId']           = $v[$arr]['invId']           = intval($row['invId']);
					 $s[$arr]['skuId']           = $v[$arr]['skuId']           = intval($row['skuId']);
					 $s[$arr]['unitId']          = $v[$arr]['unitId']          = intval($row['unitId']);
					 $s[$arr]['billType']        = $v[$arr]['billType']        = $info['billType'];
					 $s[$arr]['description']     = $v[$arr]['description']     = $row['description'];  
					 $s[$arr]['transTypeName']   = $v[$arr]['transTypeName']   = $info['transTypeName'];
                     $s[$arr]['transType']       = $v[$arr]['transType']       = $info['transType'];
					 $v[$arr]['locationId']      = intval($row['inLocationId']);
					 $v[$arr]['qty']             = abs($row['qty']); 
					 $v[$arr]['entryId']         = 1;
					 $s[$arr]['locationId']      = intval($row['outLocationId']);
					 $s[$arr]['qty']             = -abs($row['qty']);  
					 $s[$arr]['entryId']         = 2;
				} 
				if (isset($s) && isset($v)) {
					$this->mysql_model->insert(INVOICE_INFO,$v);
					$this->mysql_model->insert(INVOICE_INFO,$s);
				}
			 }
			 $this->mysql_model->update(INVOICE,$info,'(id='.$id.')');
			 if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'SQL错误'); 
			 } else {
			    $this->db->trans_commit();
				$this->common_model->logs('修改调拨单编号：'.$invoice['billNo']);
				str_alert(200,'success',array('id'=>intval($id))); 
			 }
		}
		str_alert(-1,'参数错误'); 
    }
	
	
	//打印
    public function toPdf() {
	    $this->common_model->checkpurview(179);
	    $id   = intval($this->input->get('id',TRUE));
		$data = $this->data_model->get_invoice('and (a.id='.$id.') and transType=103091',1);  
		if (count($data)>0) { 
			$data['num']    = 53;
			$data['system'] = $this->common_model->get_option('system'); 
			$v = array();
			$list = $this->data_model->get_invoice_info('and (iid='.$id.') and qty>0  order by id');  
			foreach ($list as $arr=>$row) {
				$v[$arr]['i']               = $arr + 1;
				$v[$arr]['invId']           = intval($row['invId']);
				$v[$arr]['invNumber']       = $row['invNumber'];
				$v[$arr]['invSpec']         = $row['invSpec'];
				$v[$arr]['invName']         = $row['invName'];
				$v[$arr]['goods']           = $row['invNumber'].' '.$row['invName'].' '.$row['invSpec'];
				$v[$arr]['qty']             = (float)abs($row['qty']);
			    $v[$arr]['mainUnit']        = $row['mainUnit'];
				$v[$arr]['unitId']          = intval($row['unitId']);
				$v[$arr]['inLocationId']    = $row['locationId'];
				$v[$arr]['inLocationName']  = $row['locationName'];
			}
			$list = $this->data_model->get_invoice_info('and (iid='.$id.') and qty<0 order by id'); 
			foreach ($list as $arr=>$row) {
				$v[$arr]['outLocationId']   = $row['locationId'];
				$v[$arr]['outLocationName'] = $row['locationName'];
			}
			$data['countpage']  = ceil(count($list)/$data['num']);   //共多少页
			$data['list']       = $v;
		    ob_start();
			$this->load->view('scm/invTf/toPdf',$data);
			$content = ob_get_clean();
			require_once('./application/libraries/html2pdf/html2pdf.php');
			try {
			    $html2pdf = new HTML2PDF('P', 'A4', 'en');
				$html2pdf->setDefaultFont('javiergb');
				$html2pdf->pdf->SetDisplayMode('fullpage');
				$html2pdf->writeHTML($content, isset($_GET['vuehtml']));
				$html2pdf->Output('invTf_'.date('ymdHis').'.pdf');
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
	    $this->common_model->checkpurview(147);
	    $id   = intval($this->input->get('id',TRUE));
		$data = $this->mysql_model->get_row(INVOICE,'(id='.$id.') and transType=103091');  
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
				$this->common_model->logs('删除调拨单 单据编号：'.$data['billNo']);
				str_alert(200,'success'); 	 
			}
		}
		str_alert(-1,'该单据不存在'); 
	}
	
	//公共验证
	private function validform($data) {
	    //商品录入验证
		if (is_array($data['entries'])) {
		    $system    = $this->common_model->get_option('system'); 
		    if ($system['requiredCheckStore']==1) {  //开启检查时判断
				$item = array();                     
				foreach($data['entries'] as $k=>$v){
				    !isset($v['invId']) && str_alert(-1,'参数错误');    
					!isset($v['outLocationId']) && str_alert(-1,'参数错误'); 
					if(!isset($item[$v['invId'].'-'.$v['outLocationId']])){    
						$item[$v['invId'].'-'.$v['outLocationId']] = $v;
					}else{
						$item[$v['invId'].'-'.$v['outLocationId']]['qty'] += $v['qty'];        //同一仓库 同一商品 数量累加
					}
				}
				$inventory = $this->data_model->get_invoice_info_inventory();
			} else {
			    $item = $data['entries'];	
			}
			$storage   = array_column($this->mysql_model->get_results(STORAGE,'(disable=0)'),'id');  
			foreach ($item as $arr=>$row) {
			     
				(float)$row['qty'] < 0 || !is_numeric($row['qty']) && str_alert(-1,'商品数量要为数字，请输入有效数字！'); 
				intval($row['outLocationId']) < 1 && str_alert(-1,'请选择调出仓库仓库！'); 
				intval($row['inLocationId']) < 1  && str_alert(-1,'请选择调入仓库仓库！'); 
				intval($row['outLocationId']) == intval($row['inLocationId']) && str_alert(-1,'调出仓库不能与调入仓库相同！'); 
				!in_array(intval($row['outLocationId']),$storage) && str_alert(-1,$row['outLocationName'].'不存在或不可用！');
				!in_array(intval($row['inLocationId']),$storage) && str_alert(-1,$row['inLocationName'].'不存在或不可用！');
				
				//库存判断
				if ($system['requiredCheckStore']==1) {  
					if (isset($inventory[$row['invId']][$row['outLocationId']])) {
						$inventory[$row['invId']][$row['outLocationId']] < (float)$row['qty'] && str_alert(-1,$row['outLocationName'].$row['invName'].'商品库存不足！'); 
					} else {
						str_alert(-1,$row['invName'].'库存不足！');
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