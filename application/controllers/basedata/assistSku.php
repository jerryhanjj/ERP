<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Assistsku extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
    }
    
	//组合属性规格
	public function index(){
        $v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
	    $skuClassId     = intval($this->input->get('skuClassId',TRUE));
		$page   = max(intval($this->input->get_post('page',TRUE)),1);
		$rows   = max(intval($this->input->get_post('rows',TRUE)),100);
		$where  = ' and isDelete=0';
		$where  .= ' and skuClassId='.$skuClassId;
		$list = $this->mysql_model->get_results(ASSISTSKU,'(1=1) '.$where.' order by skuId desc');  
		foreach ($list as $arr=>$row) {
			$v[$arr]['skuClassId']    = $row['skuClassId'];
			$v[$arr]['skuAssistId']   = $row['skuAssistId'];
			$v[$arr]['skuId']         = intval($row['skuId']);
			$v[$arr]['skuName']       = $row['skuName'];
		}
		$data['data']['items']        = $v;
		$data['data']['totalsize']    = $this->mysql_model->get_count(ASSISTSKU,'(1=1) '.$where.'');
		die(json_encode($data));  
	}
	
	
	//新增
	public function add(){
		$this->common_model->checkpurview(59);
		$data['skuAssistId'] = $this->input->get_post('skuAssistId',TRUE);
		$data['skuClassId']  = $this->input->get_post('skuClassId',TRUE);
		$data['skuName']     = $this->input->get_post('skuName',TRUE);
		if (count($data)>0) {
			$this->mysql_model->get_count(ASSISTSKU,'(skuAssistId="'.$data['skuAssistId'].'")') > 0 && str_alert(-1,'辅助属性组已存在！');
			$sql = $this->mysql_model->insert(ASSISTSKU,$data);
			if ($sql) {
				$data['skuId'] = $sql;
				$this->common_model->logs('新增规格:'.$data['skuName']);
				str_alert(200,'success',$data);
			}
			str_alert(-1,'添加失败');
		}
		str_alert(-1,'添加失败');
	} 
	
	//删除
	public function delete(){
		$this->common_model->checkpurview(59);
		$id = intval($this->input->post('id',TRUE));
		$data = $this->mysql_model->get_row(ASSISTSKU,'(skuId='.$id.')'); 
		if (count($data)>0) {
		    //$this->mysql_model->get_count(INVSA,'(contactid in('.$id.'))')>0 && str_alert(-1,'其中有客户发生业务不可删除');
			$info['isDelete'] = 1;
			$sql = $this->mysql_model->update(ASSISTSKU,$info,'(skuId='.$id.')');   
		    if ($sql) {
				$this->common_model->logs('删除规格:ID='.$id.' 名称:'.$data['skuName']);
				str_alert(200,'success');
			}
			str_alert(-1,'删除失败');
		}
		str_alert(-1,'删除失败');
	}

	

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */