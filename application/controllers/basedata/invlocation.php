<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Invlocation extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
    }

    //仓库列表
	public function index(){
		$v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$list = $this->mysql_model->get_results(STORAGE,'(isDelete=0) order by id desc');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['address']     = $row['address'];;
			$v[$arr]['delete']      = $row['disable'] > 0 ? true : false;
		    $v[$arr]['allowNeg']    = false;
			$v[$arr]['deptId']      = intval($row['deptId']);;
			$v[$arr]['empId']       = intval($row['empId']);;
			$v[$arr]['groupx']      = $row['groupx'];
			$v[$arr]['id']          = intval($row['id']);
			$v[$arr]['locationNo']  = $row['locationNo'];
			$v[$arr]['name']        = $row['name'];
			$v[$arr]['phone']       = $row['phone'];
			$v[$arr]['type']        = intval($row['type']);
		}
		$data['data']['rows']       = $v;
		$data['data']['total']      = 1;
		$data['data']['records']    = $this->mysql_model->get_count(STORAGE,'(isDelete=0)');
		$data['data']['page']       = 1;
		die(json_encode($data));
	}
	
	
	//新增
	public function add(){
		$this->common_model->checkpurview(156);
		$data = str_enhtml($this->input->post(NULL,TRUE));
		if (count($data)>0) {
			$data = $this->validform($data);
			$sql = $this->mysql_model->insert(STORAGE,elements(array('name','locationNo'),$data));
			if ($sql) {
				$data['id'] = $sql;
				$this->common_model->logs('新增仓库:'.$data['name']);
				str_alert(200,'success',$data);
			}  
		}
		str_alert(-1,'添加失败');
	}
	
	//修改
	public function update(){
		$this->common_model->checkpurview(157);
		$data = str_enhtml($this->input->post(NULL,TRUE));
		if (count($data)>0) {
			$id   = intval($data['locationId']); 
			$data = $this->validform($data);
			$sql = $this->mysql_model->update(STORAGE,elements(array('name','locationNo'),$data),'(id='.$id.')');
			if ($sql) {
				$data['id'] = $id;
				$this->common_model->logs('更新仓库:'.$data['name']);
				str_alert(200,'success',$data);
			}
		}
		str_alert(-1,'更新失败');
	}
	
	//删除
	public function delete(){
		$this->common_model->checkpurview(158);
		$id   = intval($this->input->post('locationId',TRUE));
		$data = $this->mysql_model->get_row(STORAGE,'(id='.$id.') and (isDelete=0)'); 
		if (count($data) > 0) {
		    $info['isDelete'] = 1;
		    $this->mysql_model->get_count(INVOICE_INFO,'(locationId='.$id.')')>0 && str_alert(-1,'不能删除有业务关联的仓库！');
		    $sql = $this->mysql_model->update(STORAGE,$info,'(id='.$id.')');   
		    if ($sql) {
				$this->common_model->logs('删除仓库:ID='.$id.' 名称:'.$data['name']);
				str_alert(200,'success');
			}
		}
		str_alert(-1,'删除失败');
	}
	
	//启用禁用
	public function disable(){
		$this->common_model->checkpurview(158);
		$id = intval($this->input->post('locationId',TRUE));
		$data = $this->mysql_model->get_row(STORAGE,'(id='.$id.') and (isDelete=0)'); 
		if (count($data) > 0) {
			$info['disable'] = intval($this->input->post('disable',TRUE));
			$sql = $this->mysql_model->update(STORAGE,$info,'(id='.$id.')');
		    if ($sql) {
			    $actton = $info['disable']==0 ? '仓库启用' : '仓库禁用';
				$this->common_model->logs($actton.':ID='.$id.' 名称:'.$data['name']);
				str_alert(200,'success');
			}
		}
		str_alert(-1,'操作失败');
	}
	
	//公共验证
	private function validform($data) {
        !isset($data['name']) && strlen($data['name']) < 1 && str_alert(-1,'仓库名称不能为空');
		!isset($data['locationNo']) && strlen($data['locationNo']) < 1 && str_alert(-1,'编号不能为空');
		$where = isset($data['locationId']) ? ' and (id<>'.$data['locationId'].')' :'';
		$this->mysql_model->get_count(STORAGE,'(name="'.$data['name'].'") '.$where) > 0 && str_alert(-1,'名称重复');
		$this->mysql_model->get_count(STORAGE,'(locationNo="'.$data['locationNo'].'") '.$where) > 0 && str_alert(-1,'编号重复');
		return $data;
	}  
	

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */