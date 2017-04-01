<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Employee extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
    }
	
	//员工列表
	public function index(){
        $v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$list = $this->mysql_model->get_results(STAFF,'(isDelete=0) order by id desc');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['birthday']    =$row['birthday'];
		    $v[$arr]['allowNeg']    = false;
			$v[$arr]['commissionrate'] = $row['commissionrate'];
			$v[$arr]['creatorId']    = $row['creatorId'];
			$v[$arr]['deptId']       = $row['deptId'];
			$v[$arr]['description']  = $row['description'];
			$v[$arr]['email']        = $row['name'];
			$v[$arr]['empId']        = $row['empId'];
			$v[$arr]['empType']      = $row['empType'];
			$v[$arr]['fullId']       = $row['fullId'];
			$v[$arr]['id']           = intval($row['id']);
			$v[$arr]['leftDate']     = NULL;
			$v[$arr]['mobile']       = $row['mobile'];
			$v[$arr]['name']         = $row['name'];
			$v[$arr]['number']       = $row['number'];
			$v[$arr]['parentId']     = $row['parentId'];
			$v[$arr]['sex']          = $row['sex'];
			$v[$arr]['userName']     = $row['userName'];
			$v[$arr]['delete']       = intval($row['disable'])==1 ? true : false;   //是否禁用
			
		}
		$data['data']['items']      = $v;
		$data['data']['total']      = $this->mysql_model->get_count(STAFF);
		$data['data']['records']    = 3;
		$data['data']['totalsize']  = 3;
		die(json_encode($data));	  
	}
	
	//新增
	public function add(){
		$this->common_model->checkpurview(59);
		$data = str_enhtml($this->input->post(NULL,TRUE));
		if (count($data)>0) {
			$data = $this->validform($data);
			$sql  = $this->mysql_model->insert(STAFF,elements(array('name','number'),$data));
			if ($sql) {
				$data['id'] = $sql;
				$this->common_model->logs('新增员工:编号'.$data['number'].' 名称'.$data['name']);
				str_alert(200,'success',$data);
			}
		}
		str_alert(-1,'添加失败');
	}
	
	//修改
	public function update(){
		$this->common_model->checkpurview(59);
		$data = str_enhtml($this->input->post(NULL,TRUE));
		if (count($data)>0) {
			$id   = intval($data['id']); 
			$data = $this->validform($data);
			$sql  = $this->mysql_model->update(STAFF,elements(array('name','number'),$data),'(id='.$id.')');
			if ($sql) {
				$data['id'] = $id;
				$this->common_model->logs('更新员工:编号'.$data['number'].' 名称'.$data['name']);
				str_alert(200,'success',$data);
			}
		}
		str_alert(-1,'更新失败');
	}
	
	//删除
	public function delete(){
		$this->common_model->checkpurview(59);
		$id = intval($this->input->post('id',TRUE));
		$data = $this->mysql_model->get_row(STAFF,'(id='.$id.')'); 
		if (count($data)>0) {
		    $this->mysql_model->get_count(INVOICE,'(isDelete=0) and (salesId='.$id.')')>0 && str_alert(-1,'其中有客户发生业务不可删除');
			$info['isDelete'] = 1;
			$sql = $this->mysql_model->update(STAFF,$info,'(id='.$id.')');     
		    if ($sql) {
				$this->common_model->logs('删除员工:ID='.$id.' 名称:'.$data['name']);
				str_alert(200,'success',array('msg'=>'成功删除'));
			}
		}
		str_alert(-1,'删除失败');
	}
	
	//状态
	public function disable(){
		$this->common_model->checkpurview(59);
		$id = str_enhtml($this->input->post('employeeIds',TRUE));
		$data = $this->mysql_model->get_row(STAFF,'(id='.$id.')'); 
		if (count($data) > 0) {
			$info['disable'] = intval($this->input->post('disable',TRUE));
			$sql = $this->mysql_model->update(STAFF,$info,'(id in('.$id.'))');
		    if ($sql) {
			    $action = $info['disable']==1 ? '员工禁用' : '员工启用';
				$this->common_model->logs($action.':ID:'.$id.'名称:'.$data['name']);
				str_alert(200,'success');
			}
		}
		str_alert(-1,'操作失败');
	}
	
	//名称查询
	public function findByNumberOrName(){
		$v = array();
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100);
		$skey = str_enhtml($this->input->get_post('skey',TRUE));
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$where  = $skey ? ' and name like "%'.$skey.'%" or number like "%'.$skey.'%"' : '';
		$offset = $rows*($page-1); 
		$data['data']['totalsize'] = $this->mysql_model->get_count(STAFF,'(isDelete=0) '.$where.'');    //总条数
		$list = $this->mysql_model->get_results(STAFF,'(isDelete=0) '.$where.' order by id desc limit '.$offset.','.$rows.'');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['id']         = intval($row['id']); 
			$v[$arr]['name']       = $row['name'];
			$v[$arr]['number']     = $row['number'];
		}
		$data['data']['items']     = $v;
		die(json_encode($data));
	}
	
	
	//公共验证
	private function validform($data) {
        strlen($data['name']) < 1 && str_alert(-1,'名称不能为空');
		strlen($data['number']) < 1 && str_alert(-1,'编号不能为空');
		$where = intval($data['id'])>0 ? 'and (id<>'.$data['id'].')' :''; 
		$this->mysql_model->get_count(STAFF,'(isDelete=0) and (number="'.$data['number'].'") '.$where) > 0 && str_alert(-1,'员工编号重复');
		return $data;
	}  
	

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */