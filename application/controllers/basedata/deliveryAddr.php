<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Deliveryaddr extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
    }
	
	//发货地址列表
	public function index(){
        $v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$list = $this->mysql_model->get_results(ADDRESS,'(isDelete=0) order by id desc');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['id']          = $row['id'];
			$v[$arr]['shortName']   = $row['shortName'];
		    $v[$arr]['postalcode']  = $row['postalcode'];
			$v[$arr]['province']    = $row['province'];
			$v[$arr]['city']        = $row['city'];
			$v[$arr]['area']        = $row['area'];
			$v[$arr]['address']     = $row['address'];
			$v[$arr]['linkman']     = $row['linkman'];
			$v[$arr]['phone']       = $row['phone'];
			$v[$arr]['mobile']      = $row['mobile'];
			$v[$arr]['isDefault']   = 1;
		}
		$data['data']['items']      = $v;
		$data['data']['totalsize']  = $this->mysql_model->get_count(ADDRESS);
		die(json_encode($data));	  
	}
	
    //新增
	public function add(){
        $this->common_model->checkpurview(59);
		$data = str_enhtml($this->input->post(NULL,TRUE));
		if (count($data)>0) { 
			$sql = $this->mysql_model->insert(ADDRESS,$data);
			if ($sql) {
				$data['id'] = $sql;
				$this->common_model->logs('新增地址:'.$data['shortName']);
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
			$sql = $this->mysql_model->update(ADDRESS,$data,'(id='.$id.')');
			if ($sql) {
				$data['id'] = $id;
				$this->common_model->logs('更新地址:ID='.$id.',名称:'.$data['shortName']);
				str_alert(200,'success',$data);
			}
		}
		str_alert(-1,'更新失败');
	}
	
	//删除
	public function delete(){
		$this->common_model->checkpurview(59);
		$id = intval($this->input->post('id',TRUE));
		$data = $this->mysql_model->get_row(ADDRESS,'(id='.$id.')'); 
		if (count($data)>0) {
		    //$this->mysql_model->get_count(INVSA,'(contactid in('.$id.'))')>0 && str_alert(-1,'其中有客户发生业务不可删除');
			$info['isDelete'] = 1;
			$sql = $this->mysql_model->update(ADDRESS,$info,'(id='.$id.')');    
		    if ($sql) {
				$this->common_model->logs('删除地址:ID='.$id.' 名称:'.$data['shortname']);
				str_alert(200,'success',array('msg'=>'成功删除'));
			}
		}
		str_alert(-1,'删除失败');
	}
	
	//查询
	public function query(){
	    $id = intval($this->input->post('id',TRUE));
		$data = $this->mysql_model->get_row(ADDRESS,'(id='.$id.')'); 
		if (count($data)>0) {
		    $info['data']['id']          = intval($data['id']);
			$info['data']['shortName']   = $data['shortName'];
		    $info['data']['postalcode']  = $data['postalcode'];
			$info['data']['province']    = $data['province'];
			$info['data']['city']        = $data['city'];
			$info['data']['area']        = $data['area'];
			$info['data']['address']     = $data['address'];
			$info['data']['linkman']     = $data['linkman'];
			$info['data']['phone']       = $data['phone'];
			$info['data']['mobile']      = $data['mobile'];
			$info['data']['isDefault']   = intval($data['isdefault']);
			$info['status']   = 200;
			$info['msg']      = 'success'; 
			die(json_encode($info));
		}
		str_alert(-1,'地址不存在');
	}
	

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */