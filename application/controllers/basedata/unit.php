<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Unit extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
    }
	
	//单位列表
	public function index(){
		$unittypeid   = intval($this->input->get_post('unitTypeId',TRUE));
		$where = $unittypeid>0 ? ' and unittypeid='.$unittypeid.'' :'';
		$v = '';
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$list = $this->mysql_model->get_results(UNIT,'(isDelete=0) '.$where.' order by id desc');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['default']    = $row['default']==1 ? true : false;
			$v[$arr]['guid']       = $row['guid'];
			$v[$arr]['id']         = intval($row['id']);
			$v[$arr]['name']       = $row['name'];
			$v[$arr]['rate']       = intval($row['rate']);
			$v[$arr]['isDelete']   = intval($row['isDelete']);
			$v[$arr]['unitTypeId'] = intval($row['unitTypeId']);
		}
		$data['data']['items']     = is_array($v) ? $v : '';
		$data['data']['totalsize'] = $this->mysql_model->get_count(UNIT,'(isDelete=0) '.$where.'');
		die(json_encode($data));	 
	}
	
	//新增
	public function add(){
		$this->common_model->checkpurview(78);
		$data = str_enhtml($this->input->post(NULL,TRUE));
		if (count($data)>0) {
		    $data = $this->validform($data);
			$sql  = $this->mysql_model->insert(UNIT,elements(array('name','default'),$data));
			if ($sql) {
				$data['id'] = $sql;
				$this->common_model->logs('新增单位:'.$data['name']);
  
				die('{"status":200,"msg":"success","data":{"default":false,"guid":"","id":'.$sql.',"isdelete":0,"name":"'.$data['name'].'","rate":1,"unitTypeId":0}}');
				str_alert(200,'success',$data);
			}
		}
		str_alert(-1,'添加失败');
	}
	
	//修改
	public function update(){
		$this->common_model->checkpurview(79);
		$id   = intval($this->input->post('id',TRUE));
		$data = str_enhtml($this->input->post(NULL,TRUE));
		if (count($data)>0) {
			$data = $this->validform($data);
			$sql  = $this->mysql_model->update(UNIT,elements(array('name','default'),$data),'(id='.$id.')');
			if ($sql) {
				$data['id']      = $id;
				$data['unitTypeId']  = isset($data['unitTypeId']) ? intval($data['unitTypeId']) :0;
				$data['rate']        = isset($data['rate']) ? intval($data['rate']) :0;
				$this->mysql_model->update(GOODS,array('unitName'=>$data['name']),'(baseUnitId='.$id.')');
				$this->common_model->logs('更新单位:'.$data['name']);
				str_alert(200,'success',$data);
			}
		}
		str_alert(-1,'更新失败');
	}
	
	//删除
	public function delete(){
		$this->common_model->checkpurview(80);
		$id = intval($this->input->post('id',TRUE));
		$data = $this->mysql_model->get_row(UNIT,'(id='.$id.') and (isDelete=0)'); 
		if (count($data)>0) {
		    $info['isDelete'] = 1;
		    $this->mysql_model->get_count(GOODS,'(isDelete=0) and (unitId='.$id.')')>0 && str_alert(-1,'该单位已经被使用，不允许删除');
			$sql = $this->mysql_model->update(UNIT,$info,'(id='.$id.')');        
		    if ($sql) {
				$this->common_model->logs('删除单位:ID='.$id.' 名称:'.$data['name']);
				str_alert(200,'success',array('msg'=>'成功删除','id'=>'['.$id.']'));
			}
		}
		str_alert(-1,'删除失败');
	}
	
	//公共验证
	private function validform($data) {
        !isset($data['name']) || strlen($data['name']) < 1 && str_alert(-1,'单位名称不能为空');
		$data['default'] = isset($data['default']) &&  $data['default']== 'true' ? 1 : 0;
		$where = isset($data['id']) ? ' and (id<>'.$data['id'].')' :'';
		$this->mysql_model->get_count(UNIT,'(isDelete=0) and (name="'.$data['name'].'")'.$where) && str_alert(-1,'单位名称重复');
		if (isset($data['id'])) {
			$this->mysql_model->get_count(GOODS,'(isDelete=0) and (unitId='.$data['id'].')')>0 && str_alert(-1,'该单位已经被使用，不允许更改组');
		}
		return $data;
	}  

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */