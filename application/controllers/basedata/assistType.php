<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Assisttype extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
    }
	
	//辅助属性列表
	public function index(){
	    $v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$list = $this->mysql_model->get_results(ASSISTINGPROP,'(isDelete=0) order by id desc');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['id']       = intval($row['id']);
			$v[$arr]['name']     = $row['name'];
			$v[$arr]['del']      = false;
		}
		$data['data']['items']      = $v;
		$data['data']['totalsize']  = $this->mysql_model->get_count(ASSISTINGPROP);
		die(json_encode($data));
	}
	
	//新增
	public function add(){
		$this->common_model->checkpurview(59);
		$type = $this->input->post('type',TRUE);
		$data = str_enhtml($this->input->post(NULL,TRUE));
		if (count($data)>0) {
			strlen($data['name']) < 1 && str_alert(-1,'名称不能为空');
			$this->mysql_model->get_count(ASSISTINGPROP,'(1=1) and (name="'.$data['name'].'")') > 0 && str_alert(-1,'名称重复');
			$sql = $this->mysql_model->insert(ASSISTINGPROP,$data);
			if ($sql) {
				$data['id'] = $sql;
				$this->common_model->logs('新增辅助属性:'.$data['name']);
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
			unset($data['id']);
			strlen($data['name']) < 1 && str_alert(-1,'名称不能为空');
			$this->mysql_model->get_count(ASSISTINGPROP,'(id<>'.$id.') and (name="'.$data['name'].'")') > 0 && str_alert(-1,'名称重复');
			$sql = $this->mysql_model->update(ASSISTINGPROP,$data,'(id='.$id.')');
			if ($sql) {
				$data['id'] = $id;
				$this->common_model->logs('更新辅助属性:'.$data['name']);
				str_alert(200,'success',$data);
			}
		}
		str_alert(-1,'更新失败');
	}
	
	//删除
	public function delete(){
		$this->common_model->checkpurview(59);
		$id = intval($this->input->get_post('id',TRUE));
		$data = $this->mysql_model->get_row(ASSISTINGPROP,'(id='.$id.')'); 
		if (count($data)>0) {
		    $this->mysql_model->get_count(GOODS,'(isDelete=0) and find_in_set('.$id.',skuAssistId)')>0 && str_alert(-1,'数据在使用中,不能删除'); 
			$info['isDelete'] = 1;
			$sql = $this->mysql_model->update(ASSISTINGPROP,$info,'(id='.$id.')');    
		    if ($sql) {
				$this->common_model->logs('删除辅助属性:ID='.$id.' 名称:'.$data['name']);
				str_alert(200,'success');
			}
		}
		str_alert(-1,'删除失败');
	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */