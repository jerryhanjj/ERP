<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Log extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview(83);
    }
	
	public function index(){
	    $v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$fromDate = str_enhtml($this->input->get_post('fromDate',TRUE));
		$toDate   = str_enhtml($this->input->get_post('toDate',TRUE));
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100);
		$skey   = str_enhtml($this->input->get_post('skey',TRUE));
		$user   = str_enhtml($this->input->get_post('user',TRUE));
		$where = $user ? ' and name="'.$user.'"' :'';
		$where .= $fromDate ? ' and adddate>="'.$fromDate.'"' :'';
		$where .= $toDate ? ' and adddate<="'.$toDate.'"' :'';
		$offset = $rows * ($page-1);
		$data['data']['page']      = $page;                                                      //当前页
		$data['data']['records']   = $this->mysql_model->get_count(LOG,'(1=1) '.$where.'');      //总条数
		$data['data']['total']     = ceil($data['data']['records']/$rows);                       //总分页数
		$list = $this->mysql_model->get_results(LOG,'(1=1) '.$where.' order by id desc limit '.$offset.','.$rows.'');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['id']              = intval($row['id']);
			$v[$arr]['name']            = $row['name'];
			$v[$arr]['loginName']       = $row['loginName'];
			$v[$arr]['operateTypeName'] = $row['operateTypeName'];
			$v[$arr]['operateType']     = 255;
			$v[$arr]['userId']          = $row['userId'];
			$v[$arr]['log']             = $row['log'];
			$v[$arr]['modifyTime']      = $row['modifyTime'];
		}
		$data['data']['rows']   = $v;
		die(json_encode($data));
	}
	
	public function initloglist(){
		$this->load->view('settings/log-initloglist');	
	}
	
	//用户列表
	public function queryAllUser(){
		$v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success';                                             
		$data['data']['totalsize']   = $this->mysql_model->get_count(ADMIN,'(1=1)');     
		$list = $this->mysql_model->get_results(ADMIN,'(1=1) order by uid desc');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['userid']   = intval($row['uid']);
			$v[$arr]['name']     = $row['name'];
		}
		$data['data']['items']   = $v;
		die(json_encode($data));
	}
	
		
    //操作类型
	public function queryAllOperateType(){
		$v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success';                                             
		$data['data']['totalsize']   = $this->mysql_model->get_count(MENU,'(depth>1)');  
		$menu = array_column($this->mysql_model->get_results(MENU,'(pid=0) order by id desc'),'title','id');     
		$list = $this->mysql_model->get_results(MENU,'(depth>1) order by id desc');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['indexid']           = $row['id'];
			$v[$arr]['operateTypeName']   = $row['title'].isset($menu[$row['pid']]) ? $menu[$row['pid']] : '';
		}
		$data['data']['items']   = $v;
		die(json_encode($data));
	}
	
	

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */