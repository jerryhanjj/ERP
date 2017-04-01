<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Common_model extends CI_Model{

	public function __construct(){
  		parent::__construct();
		$this->jxcsys = $this->session->userdata('jxcsys');
	}
	
	//判断是否登陆
	public function is_login() {
	    if (!$this->jxcsys) return false; 
		if ($this->jxcsys['login'] != 'jxc') return false; 
		return true;
	}
    
	//检测是否有权限
	public function checkpurview($id=0) {
	    !$this->is_login() && redirect(site_url('login'));
		if ($id<1) return true;
		$data = $this->mysql_model->get_row(ADMIN,'(uid='.$this->jxcsys['uid'].')'); 
		if (count($data)>0) {
		    //$data['status'] != 1 && die('该账号已被锁定');    
			if ($data['roleid']==0) {
			    return true; 
			} else {	
			    $lever = strlen($data['lever'])>0 ? explode(',',$data['lever']) : array();	
				if (in_array($id,$lever)) return true;
			}
		}
		alert('对不起，您没有此页面的管理权',site_url('home/main'));
		str_alert(-1,'对不起，您没有此页面的管理权');  	  
	}
	
	//写入日志
	public function logs($info) {
		$data['userId']     =  $this->jxcsys['uid'];
		$data['name']       =  $this->jxcsys['name'];
		$data['ip']         =  $this->input->ip_address();
		$data['log']        =  $info;
		$data['loginName']  =  $this->jxcsys['username'];
		$data['adddate']    =  date('Y-m-d H');
		$data['modifyTime'] =  date('Y-m-d H:i:s');
		$this->mysql_model->insert(LOG,$data);		
	}	
	
	//写入配置
	public function insert_option($key,$val) {
		if (!$this->get_option($key)) {
			$data['option_name']  = $key;
			$data['option_value'] = serialize($val);
			return $this->mysql_model->insert(OPTIONS,$data);
		}
		return $this->update_option($key,$val);
	}
	
	//更新配置
	public function update_option($key,$val) {
		$data['option_value'] = serialize($val);
		return $this->mysql_model->update(OPTIONS,$data,'(option_name="'.$key.'")');
	}
 
	//获取配置
	public function get_option($key) {
		$option_value = $this->mysql_model->get_row(OPTIONS,'(option_name="'.$key.'")','option_value'); 
		return $option_value ? unserialize($option_value) : ''; 
	}
	
	
	
}