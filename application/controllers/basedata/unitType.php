<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Unittype extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
    }
	
	public function index(){
		$v = '';
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$list = $this->mysql_model->get_results(UNITTYPE,'(isDelete=0) order by id desc');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['entries']     = array();
			$v[$arr]['guid']        = '';
			$v[$arr]['id']          = intval($row['id']);
			$v[$arr]['name']        = $row['name'];
		}
		$data['data']['items']      = is_array($v) ? $v : '';
		$data['data']['totalsize']  = $this->mysql_model->get_count(UNITTYPE,'(isDelete=0)');
		die(json_encode($data));  
	}
	
	//新增
	public function add(){
		$this->common_model->checkpurview(59);
		$data['name'] = $name = $this->input->post('name',TRUE);
		strlen($name) < 1 && str_alert(-1,'名称不能为空');
		$this->mysql_model->get_count(UNITTYPE,'(name="'.$name.'")') && str_alert(-1,'单位组名称重复');
		$sql = $this->mysql_model->insert(UNITTYPE,$data);
		if ($sql) {
			$data['id'] = $sql;
			$this->common_model->logs('新增单位组:'.$name);
			str_alert(200,'success',$data);
		} else {
			str_alert(-1,'添加失败');
		}
	}
	
	//修改
	public function update(){
		$this->common_model->checkpurview(59);
		$id   = intval($this->input->post('id',TRUE));
		$name = str_enhtml($this->input->post('name',TRUE));
		$info = $this->mysql_model->get_row(UNITTYPE,'(id='.$id.') and (isDelete=0)'); 
		if (count($info)>0) {
			strlen($name) < 1 && str_alert(-1,'名称不能为空');
			$this->mysql_model->get_count(UNITTYPE,'(isDelete=0) and (id<>'.$id.') and (name="'.$name.'")') > 0 && str_alert(-1,'单位组名称重复');
			$sql = $this->mysql_model->update(UNITTYPE,array('name'=>$name),'(id='.$id.')');
			if ($sql) {
				$data['id']      = $id;
				$data['name']    = $name;
				$data['entries'] = array();
				$data['guid']    = '';
				$this->common_model->logs('更新单位组:'.$data['name']);
				str_alert(200,'success',$data);
			} else {
				str_alert(-1,'更新失败');
			}
		} else {
		    str_alert(-1,'更新失败');
		}
	}
	
	//删除
	public function delete(){
		$this->common_model->checkpurview(59);
		$id = intval($this->input->post('id',TRUE));
		$data = $this->mysql_model->get_row(UNITTYPE,'(id='.$id.') and (isDelete=0)'); 
		if (count($data)>0) {
		    $this->mysql_model->get_count(UNIT,'(isDelete=0) and (unittypeid='.$id.')')>0 && str_alert(-1,'发生业务不可删除');
			$info['isDelete'] = 1;
			$sql = $this->mysql_model->update(UNITTYPE,$info,'(id='.$id.')');         
		    if ($sql) {
				$this->common_model->logs('删除单位组:ID='.$id.' 名称:'.$data['name']);
				str_alert(200,'success',array('msg'=>'成功删除','id'=>'['.$id.']'));
			} else {
			    str_alert(-1,'删除失败');
			}
		}
	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */