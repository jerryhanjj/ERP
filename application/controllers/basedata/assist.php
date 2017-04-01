<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Assist extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
    }
	
	public function index(){
		$v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$type   = str_enhtml($this->input->get('typeNumber',TRUE));
		$skey   = str_enhtml($this->input->get('skey',TRUE));
		$where = ' and typenumber="'.$type.'"';
		$where .= $skey ? ' and name like "%'.$skey.'%"' :'';
		$pid  = array_column($this->mysql_model->get_results(CATEGORY,'(isDelete=0) '.$where.' order by id'), 'parentId'); 
		$list = $this->mysql_model->get_results(CATEGORY,'(isDelete=0) '.$where.' order by path');  
		foreach ($list as $arr=>$row) {
			$v[$arr]['detail']      = in_array($row['id'],$pid) ? false : true;
			$v[$arr]['id']          = intval($row['id']);
			$v[$arr]['level']       = $row['level'];
			$v[$arr]['name']        = $row['name'];
			$v[$arr]['parentId']    = intval($row['parentId']);
			$v[$arr]['remark']      = $row['remark'];
			$v[$arr]['sortIndex']   = intval($row['sortIndex']);
			$v[$arr]['status']      = intval($row['isDelete']);
			$v[$arr]['typeNumber']  = $row['typeNumber']; 
		}
		$data['data']['items']      = $v;
		$data['data']['totalsize']  = $this->mysql_model->get_count(CATEGORY,'(isDelete=0) '.$where.'');
		die(json_encode($data));	  
	}
    
	//分类
	public function getAssistType(){
		$v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
	    $v = array(
			0 => array('id'=>1001,'name'=>'商品类别','number'=>'trade'),
			1 => array('id'=>1002,'name'=>'客户类别','number'=>'customertype'),
			2 => array('id'=>1003,'name'=>'供应商类别','number'=>'supplytype'),
			3 => array('id'=>1004,'name'=>'收入类别','number'=>'raccttype'),
			4 => array('id'=>1005,'name'=>'支出类别','number'=>'paccttype')
		);
		$data['data']['items']      = $v;
		$data['data']['totalsize']  = 5;
		die(json_encode($data));		  
	}
	
	//新增
	public function add(){
		$data = str_enhtml($this->input->post(NULL,TRUE));
		$data = $this->validform($data);
        switch ($data['typeNumber']) {
			case 'trade':
				$this->common_model->checkpurview(168);
				$this->trade_add($data);	
				break;  
			case 'supplytype':
				$this->common_model->checkpurview(164);
				$success = '新增供应商类别:';	
				break;  	
			case 'customertype':
				$this->common_model->checkpurview(74);
				$success = '新增客户类别:';	
				break;
			case 'raccttype':
				$this->common_model->checkpurview(176);
				$success = '新增收入类别:';	
				break;
			case 'paccttype':
				$this->common_model->checkpurview(172);
				$success = '新增支出类别:';	
				break;
			case 'PayMethod':
				$this->common_model->checkpurview(160);
				$success = '新增结算方式:';	
				break;		 			 
			default: 
				str_alert(-1,'参数错误');
		}	
		$sql  = $this->mysql_model->insert(CATEGORY,elements(array('name','typeNumber'),$data));
		if ($sql) {
			$this->common_model->logs($success.$data['name']);
			die('{"status":200,"msg":"success","data":{"coId":0,"detail":true,"id":'.$sql.',"level":1,"name":"'.$data['name'].'","parentId":0,"remark":"","sortIndex":2,"status":0,"typeNumber":"'.$data['typeNumber'].'","uuid":""}}');
		}
		str_alert(-1,'添加失败');
	}
 
 
	//商品分类添加	
    private function trade_add($data){
		if ($data['parentId']==0) {    
		    $data['level'] = 1;
			$newid = $this->mysql_model->insert(CATEGORY,$data);
			$sql = $this->mysql_model->update(CATEGORY,array('path'=>$newid),'(id='.$newid.')');
		} else {   	
			$cate = $this->mysql_model->get_row(CATEGORY,'(id='.$data['parentId'].')');   
			count($cate)<1 && str_alert(-1,'参数错误'); 
			$data['level'] = $cate['level'] + 1;                           
			$newid = $this->mysql_model->insert(CATEGORY,$data);        
			$sql = $this->mysql_model->update(CATEGORY,array('path'=>$cate['path'].','.$newid),'(id='.$newid.')');    
		}
		if ($sql) {
			$this->common_model->logs('新增商品类别:'.$data['name']);
			die('{"status":200,"msg":"success","data":{"coId":0,"detail":true,"id":'.$newid.',"level":'.$data['level'].',"name":"'.$data['name'].'","parentId":'.$data['parentId'].',"remark":"","sortIndex":1,"status":0,"typeNumber":"'.$data['typeNumber'].'","uuid":""}}');
		}
		str_alert(-1,'添加失败');
	}
	
	
	//修改
	public function update(){
	    $data = str_enhtml($this->input->post(NULL,TRUE));
		$data = $this->validform($data);
        switch ($data['typeNumber']) {
			case 'trade':
				$this->common_model->checkpurview(169);
				$this->trade_update($data);	
				break;  
			case 'supplytype':
				$this->common_model->checkpurview(165);
				$success = '修改供应商类别:';	
				break;  	
			case 'customertype':
				$this->common_model->checkpurview(75);
				$success = '修改客户类别:';
				break;
			case 'raccttype':
				$this->common_model->checkpurview(177);
				$success = '修改收入类别:';
				break;
			case 'paccttype':
				$this->common_model->checkpurview(173);
				$success = '修改支出类别:';
				break;
			case 'PayMethod':
				$this->common_model->checkpurview(161);
				$success = '修改结算方式:';
				break;		 
			default: 
				str_alert(-1,'参数错误');
		}
		$sql = $this->mysql_model->update(CATEGORY,elements(array('name','typeNumber'),$data),'(id='.$data['id'].')');
		if ($sql) {
			$this->common_model->logs($success.$data['name']);
			die('{"status":200,"msg":"success","data":{"coId":0,"detail":true,"id":'.$data['id'].',"level":1,"name"
		:"'.$data['name'].'","parentId":0,"remark":"","sortIndex":2,"status":0,"typeNumber":"'.$data['typeNumber'].'","uuid":""
		}}');
		}
		str_alert(-1,'修改失败');
	}
	

	//商品分类修改	
    private function trade_update($data){
		if (count($data)>0) {
			$id   = intval($data['id']);
			$name = $data['name'];
			$pid  = $data['parentId'];
		    strlen($name) < 1 && str_alert(-1,'类别名称不能为空');
		    $this->mysql_model->get_count(CATEGORY,'(id<>'.$id.') and (name="'.$name.'") and typeNumber="'.$data['typeNumber'].'"') > 0 && str_alert(-1,'类别名称重复'); 
		    $cate = $this->mysql_model->get_row(CATEGORY,'(id='.$id.')');                                          //获取原ID数据
			count($cate)<1 && str_alert(-1,'参数错误'); 
			$old_pid  = $cate['parentId'];
			$old_path = $cate['path'];
			$pid_list = $this->mysql_model->get_results(CATEGORY,'(id<>'.$id.') and find_in_set('.$id.',path)');    //是否有子栏目
		    $old_pid_num = count($pid_list);         //是否有子栏目
		    //$pid == $old_pid && alert('没有移动'); 
			$pid == $id && str_alert(-1,'当前分类和上级分类不能相同');
			if ($pid==0) {                     //多级转顶级 
			    $pare_depth = 1; 
			    if ($old_pid_num==0) {         //ID不存在子栏目
				    $this->mysql_model->update(CATEGORY,array('parentId'=>0,'path'=>$id,'level'=>1,'name'=>$name),'(id='.$id.')');
				} else {                       //ID存在子栏目
				    $this->mysql_model->update(CATEGORY,array('parentId'=>0,'path'=>$id,'level'=>1,'name'=>$name),'(id='.$id.')');
					foreach($pid_list as $arr=>$row) {
					    $path = str_replace($id,'',$old_path);
					    $path = str_replace(''.$path.'','',''.$row['path'].'');  
						$pare_depth = substr_count($path,',')+1;
						$datas[] =  array('id'=>$row['id'],'path'=>$path,'level'=>$pare_depth);
					}
				    $this->mysql_model->update(CATEGORY,$datas,'id');
				}
			} else {                       //pid<>0时，顶级转多级  多级转多级
			    $cate = $this->mysql_model->get_row(CATEGORY,'(id='.$pid.')');     //获取原PID数据
				count($cate)<1 && str_alert(-1,'参数错误'); 
			    $pare_pid   = $cate['parentId'];
				$pare_path  = $cate['path'];
				$pare_depth = $cate['level'];
				if ($old_pid==0) {            //顶级转多级  
					if ($old_pid_num==0) {    //ID不存在子栏目
						$this->mysql_model->update(CATEGORY,array('name'=>$name,'parentId'=>$pid,'path'=>$pare_path.','.$id,'level'=>$pare_depth+1),'(id='.$id.')');
					} else {                  //ID存在子栏目 
						$this->mysql_model->update(CATEGORY,array('name'=>$name,'parentId'=>$pid,'path'=>$pare_path.','.$id,'level'=>$pare_depth+1),'(id='.$id.')');
						foreach ($pid_list as $arr=>$row) {
							$path = $pare_path.','.$row['path'];
							$pare_depth = substr_count($path,',')+1;
							$datas[] = array('id'=>$row['id'],'path'=>$path,'level'=>$pare_depth);
						}
						$this->mysql_model->update(CATEGORY,$datas,'id');
					}    
				} else {                      //多级转多级
					if ($old_pid_num==0) {    //ID不存在子栏目
						$this->mysql_model->update(CATEGORY,array('name'=>$name,'parentId'=>$pid,'path'=>$pare_path.','.$id,'level'=>$pare_depth+1),'(id='.$id.')');
					} else {                  //ID存在子栏目 
						$this->mysql_model->update(CATEGORY,array('name'=>$name,'parentId'=>$pid,'path'=>$pare_path.','.$id,'level'=>$pare_depth+1),'(id='.$id.')');
						foreach ($pid_list as $arr=>$row) {
							$path = str_replace($id,'',$old_path);
					        $path = str_replace($path,'',$row['path']);   
							$path = $pare_path.','.$path;
							$pare_depth = substr_count($path,',')+1;
							$datas[] = array('id'=>$row['id'],'path'=>$path,'level'=>$pare_depth+1);
						}
						$this->mysql_model->update(CATEGORY,$datas,'id');
					}
				}
			}
			$data['id']         = intval($id);
			$data['level']      = intval($pare_depth);
			$data['name']       = $name;
			$data['parentId']   = intval($pid);
			$this->mysql_model->update(GOODS,array('categoryName'=>$name),'(categoryId='.$id.')');
			$this->common_model->logs('修改类别:ID='.$id.' 名称:'.$data['name']);
			die('{"status":200,"msg":"success","data":{"coId":0,"detail":true,"id":'.$data['id'].',"level":'.$data['level'].',"name":"'.$data['name'].'","parentId":'.$data['parentId'].',"remark":"","sortIndex":0,"status":0,"typeNumber":"trade","uuid":""}}');
			str_alert(200,'success',$data);
		}
		str_alert(-1,'更新失败');
	}
	
	
    //分类删除
	public  function delete() {
		$id   = intval($this->input->post('id',TRUE));
		$type = str_enhtml($this->input->get_post('typeNumber',TRUE));
		switch ($type) {
			case 'trade':
				$this->common_model->checkpurview(170);
				$success = '删除商品类别:';
				break;  
			case 'supplytype':
				$this->common_model->checkpurview(166);	
				$success = '删除供应商类别:';
				break;  	
			case 'customertype':
				$this->common_model->checkpurview(76);
				$success = '删除客户类别:';
				break;
			case 'raccttype':
				$this->common_model->checkpurview(178);
				$success = '删除收入类别:';
				break;
			case 'paccttype':
				$this->common_model->checkpurview(174);
				$success = '删除支出类别:';
				break;	
			case 'PayMethod':
				$this->common_model->checkpurview(162);
				$success = '删除结算方式:';
				break;			 
			default: 
				str_alert(-1,'参数错误');	
		}		
		$data = $this->mysql_model->get_row(CATEGORY,'(id='.$id.')'); 
		if (count($data)>0) {
		    $info['isDelete'] = 1;
		    $this->mysql_model->get_count(GOODS,'(isDelete=0) and (categoryId='.$id.')')>0 && str_alert(-1,'辅助资料已经被使用');
			$this->mysql_model->get_count(CONTACT,'(isDelete=0) and (cCategory ='.$id.')')>0 && str_alert(-1,'辅助资料已经被使用');
			$this->mysql_model->get_count(CATEGORY,'(isDelete=0) and find_in_set('.$id.',path)')>1 && str_alert(-1,'不能删除，请先删除子分类！'); 
			$sql = $this->mysql_model->update(CATEGORY,$info,'(id='.$id.')'); 
		    if ($sql) {
			    $this->common_model->logs($success.'ID='.$id.' 名称:'.$data['name']);
				str_alert(200,'success',array('msg'=>'删除成功','id'=>'['.$id.']'));
			}
		}
		str_alert(-1,'删除失败');
	}
	
	
	//公共验证
	private function validform($data) {
	    $data['typeNumber'] = str_enhtml($this->input->get_post('typeNumber',TRUE));  //结算方式是GET 
		$data['parentId']   = isset($data['parentId']) ? $data['parentId'] : 0;
		strlen($data['name']) < 1 && str_alert(-1,'类别名称不能为空');
		strlen($data['typeNumber']) < 1 && str_alert(-1,'参数错误');
		if (isset($data['id'])) {
		    $data['id'] = intval($data['id']);
		}
		return $data;
	}  
	

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */