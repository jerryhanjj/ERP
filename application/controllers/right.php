<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Right extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview(82);
    }
	
    //用户数检测
	public function isMaxShareUser() {
		die('{"status":200,"data":{"totalUserNum":1000,"shareTotal":1},"msg":"success"}');	
	}
	 
	
	//用户列表
	public function queryAllUser() {
	    $v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$list = $this->mysql_model->get_results(ADMIN,'(1=1) order by roleid');  
		foreach ($list as $arr=>$row) {
		    $v[$arr]['share']         = intval($row['status']) > 0 ? true : false;
			$v[$arr]['admin']         = $row['roleid'] > 0 ? false : true;
		    $v[$arr]['userId']        = intval($row['uid']);
			$v[$arr]['isCom']         = intval($row['status']);
			$v[$arr]['role']          = intval($row['roleid']);
			$v[$arr]['userName']      = $row['username'];
			$v[$arr]['realName']      = $row['name'];
			$v[$arr]['shareType']     = intval($row['status']);
			$v[$arr]['mobile']        = $row['mobile'];
		}
		$data['data']['items']        = $v;
		$data['data']['shareTotal']   = $this->mysql_model->get_count(ADMIN);
		$data['data']['totalsize']    = $data['data']['shareTotal'];
		$data['data']['corpID']       = 0;
		$data['data']['totalUserNum'] = 1000;
		die(json_encode($data));
	}
	
	//判断用户名是否存在
	public function queryUserByName() {
	    $data = str_enhtml($this->input->get_post(NULL,TRUE));
		if (is_array($data)&&count($data)>0) {
		     $user = $this->mysql_model->get_row(ADMIN,'(username="'.$data['userName'].'")');
			 if (count($user)>0) {
			     $info['share']      = true;
				 $info['email']      = '';
				 $info['userId']     = $user['uid'];
				 $info['userMobile'] = $user['mobile'];
				 $info['userName']   = $user['username'];
			     str_alert(200,'success',$info);  
			 }
		     str_alert(502,'用户名不存在');   
		}
        str_alert(502,'用户名不存在');   
	}
	
	 
	//新增用户
	public function adduser() {
	    $data = str_enhtml($this->input->post(NULL,TRUE));
		if (is_array($data)&&count($data)>0) {
			!isset($data['userNumber']) || strlen($data['userNumber'])<1 && str_alert(-1,'用户名不能为空');  
			!isset($data['password']) || strlen($data['password'])<1 && str_alert(-1,'密码不能为空');  
			$this->mysql_model->get_count(ADMIN,'(username="'.$data['userNumber'].'")')>0 && str_alert(-1,'用户名已经存在');   
			$this->mysql_model->get_count(ADMIN,'(mobile='.$data['userMobile'].')') >0 && str_alert(-1,'该手机号已被使用'); 
			$info = array(
				 'username' => $data['userNumber'],
				 'userpwd'  => md5($data['password']),
				 'name'     => $data['userName'],
				 'mobile'   => $data['userMobile']
			);
		    $sql = $this->mysql_model->insert(ADMIN,$info);
			if ($sql) {
			    $this->common_model->logs('新增用户:'.$data['userNumber']);
				die('{"status":200,"msg":"注册成功","userNumber":"'.$data['userNumber'].'"}');
			}
			str_alert(-1,'添加失败'); 
		}	
		str_alert(-1,'添加失败'); 
	}
	
	//更新权限
	public function addrights2Outuser() {
	    $data = str_enhtml($this->input->get_post(NULL,TRUE));
		if (is_array($data)&&count($data)>0) {
			!isset($data['userName']) || strlen($data['userName'])<1 && str_alert(-1,'用户名不能为空');  
			!isset($data['rightid']) && str_alert(-1,'参数错误');  
		    $sql = $this->mysql_model->update(ADMIN,array('lever'=>$data['rightid']),'(username="'.$data['userName'].'")');  
			if ($sql) {
			    $this->common_model->logs('更新权限:'.$data['userName']);
				str_alert(200,'操作成功'); 
			}
			str_alert(-1,'操作失败'); 
		}	
		str_alert(-1,'添加失败'); 
	}
	 
	//详细权限设置
	public function queryalluserright() {
	    $userName = str_enhtml($this->input->get_post('userName',TRUE));
		if (strlen($userName)>0) {
		    $lever = $this->mysql_model->get_row(ADMIN,'(username="'.$userName.'")','lever');  
			$lever = strlen($lever)>0 ? explode(',',$lever) : array();
		} else {
		    $lever = array();	
		}
		$v = array();
		$data['status'] = 200;
		$data['msg']    = 'success'; 
		$data['data']['totalsize']   = $this->mysql_model->get_count(MENU,'(isDelete=0)');    
		$list = $this->mysql_model->get_results(MENU,'(isDelete=0) order by path'); 
		$name = array_column($list,'name','id'); 
		foreach ($list as $arr=>$row) {
		    $v[$arr]['fobjectid']  = $row['parentId']>0 ? $row['parentId'] : $row['id']; 
			$v[$arr]['fobject']    = $row['parentId']>0 ? @$name[$row['parentId']] : $row['name'];
			$v[$arr]['faction']    = $row['level'] > 1 ? $row['name'] : '查询';
			$v[$arr]['fright']     = in_array($row['id'],$lever) ? 1 : 0;
			$v[$arr]['frightid']   = intval($row['id']);
		}
		$data['data']['items']     = $v;
		die(json_encode($data));
	}
	
	//停用
	public function auth2UserCancel(){
	    $data = str_enhtml($this->input->get_post(NULL,TRUE));
		if (is_array($data)&&count($data)>0) {
			!isset($data['userName']) && str_alert(-1,'用户名不能为空');  
		    $data['userName'] == 'admin' && str_alert(-1,'管理员不可操作');   
			$sql = $this->mysql_model->update(ADMIN,array('status'=>0),'(username="'.$data['userName'].'")');		
			if ($sql) {
			    $this->common_model->logs('用户停用:'.$data['userName']);
				str_alert(200,'success',$data); 
			}
			str_alert(-1,'停用失败'); 
		}	
		str_alert(-1,'停用失败'); 
 
	}
	
	//启用
	public function auth2User(){
	    $data = str_enhtml($this->input->get_post(NULL,TRUE));
		if (is_array($data)&&count($data)>0) {
			!isset($data['userName']) && str_alert(-1,'用户名不能为空');  
		    $data['userName'] == 'admin' && str_alert(-1,'管理员不可操作');   
			$sql = $this->mysql_model->update(ADMIN,array('status'=>1),'(username="'.$data['userName'].'")');		
			if ($sql) {
			    $this->common_model->logs('用户启用:'.$data['userName']);
				str_alert(200,'success',$data); 
			}
		    str_alert(-1,'启用失败'); 
		}	
		str_alert(-1,'启用失败'); 
	}
	 
	 
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */