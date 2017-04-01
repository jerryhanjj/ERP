<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Settacct extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
    }
	
	//结算账户列表
	public function index(){
		$v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$list = $this->mysql_model->get_results(ACCOUNT,'(isDelete=0) order by id');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['date']        = $row['date'];
			$v[$arr]['amount']      = (float)$row['amount'];
			$v[$arr]['del']         = false;
			$v[$arr]['id']          = intval($row['id']);
			$v[$arr]['name']        = $row['name'];
			$v[$arr]['number']      = $row['number'];
			$v[$arr]['type']        = intval($row['type']);
		}
		$data['data']['items']      = $v;
		$data['data']['totalsize']  = $this->mysql_model->get_count(ACCOUNT,'(isDelete=0)');
		die(json_encode($data)); 
	}
	
	//查询
	public function query(){
	    $id = intval($this->input->post('id',TRUE));
		$data = $this->mysql_model->get_row(ACCOUNT,'(id='.$id.') and (isDelete=0)'); 
		if (count($data)>0) {
			$v = array();
			$info['status'] = 200;
			$info['msg']    = 'success'; 
			$info['data']['date']     = $data['date'];
			$info['data']['amount']   = (float)$data['amount'];
			$info['data']['del']      = false;
			$info['data']['id']       = intval($data['id']);
			$info['data']['name']     = $data['name'];
			$info['data']['number']   = $data['number'];
			$info['data']['type']     = intval($data['type']);
			die(json_encode($info)); 
		}	
	}
	
	//当前余额
	public function findAmountOver(){
	    $ids = str_enhtml($this->input->post('ids',TRUE));
		if (strlen($ids)>0) {
		    $v = array();
			$data['status'] = 200;
			$data['msg']    = 'success'; 
			$list = $this->data_model->get_account('',' and a.id in('.$ids.')');  
			foreach ($list as $arr=>$row) {
				$v[$arr]['id']          = intval($row['id']);
				$v[$arr]['amountOver']  = (float)$row['amount'];
			}
			$data['data']['items']      = $v;
			$data['data']['totalsize']  = $this->data_model->get_account('',' and a.id in('.$ids.')',3);  
			die(json_encode($data));  
		} else {
		    str_alert(200,'');
		} 
	}
 
    //新增
	public function add(){
		$this->common_model->checkpurview(160);
		$data = str_enhtml($this->input->post(NULL,TRUE));
		if (count($data)>0) {
			$data = $this->validform($data);
			$info = elements(array('name','number','amount','date','type'),$data);
			$sql  = $this->mysql_model->insert(ACCOUNT,$info);
			if ($sql) {
				$data['id'] = $sql;
				$this->common_model->logs('新增账户:'.$data['number'].$data['name']);
				str_alert(200,'success',$data);
			}
		}
		str_alert(-1,'添加失败');
	}
	
	//修改
	public function update(){
		$this->common_model->checkpurview(161);
		$data = str_enhtml($this->input->post(NULL,TRUE));
		if (count($data)>0) {
			$id   = intval($data['id']); 
			$data = $this->validform($data);
			$info = elements(array('name','number','amount','date','type'),$data);
			$sql  = $this->mysql_model->update(ACCOUNT,$info,'(id='.$id.')');
			if ($sql) {
				$data['id'] = $id;
				$data['type'] = intval($data['type']);
				$this->common_model->logs('更新账户:'.$data['number'].$data['name']);
				str_alert(200,'success',$data);
			}
		}
		str_alert(-1,'更新失败');
	}
	
	//删除
	public function delete(){
		$this->common_model->checkpurview(162);
		$id = intval($this->input->post('id',TRUE));
		$data = $this->mysql_model->get_row(ACCOUNT,'(id='.$id.') and (isDelete=0)'); 
		if (count($data)>0) {
		    $this->mysql_model->get_count(ACCOUNT_INFO,'(isDelete=0) and (accId in('.$id.'))')>0 && str_alert(-1,'账户资料已经被使用');
			$info['isDelete'] = 1;
			$sql = $this->mysql_model->update(ACCOUNT,$info,'(id='.$id.')');       
		    if ($sql) {
				$this->common_model->logs('删除账户:ID='.$id.' 名称:'.$data['name']);
				str_alert(200,'success',array('msg'=>'成功删除'));
			}
		}
		str_alert(-1,'删除失败');
	}
	
	
	//公共验证
	private function validform($data) {
	    $data['amount'] = (float)$data['amount'];
		$data['type']   = intval($data['type']);
        !isset($data['name']) || strlen($data['name']) < 1 && str_alert(-1,'名称不能为空');
		!isset($data['number']) || strlen($data['number']) < 1 && str_alert(-1,'编号不能为空');
		$where = isset($data['id']) ? ' and (id<>'.$data['id'].')' :'';
		$this->mysql_model->get_count(ACCOUNT,'(isDelete=0) and (name="'.$data['name'].'") '.$where) > 0 && str_alert(-1,'名称重复');
		$this->mysql_model->get_count(ACCOUNT,'(isDelete=0) and (number="'.$data['number'].'") '.$where) > 0 && str_alert(-1,'编号重复');
		return $data;
	}  
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */