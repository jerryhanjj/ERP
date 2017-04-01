<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Customer extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview(62);
    }
 
	public function exporter(){
		$name = 'customer_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('导出客户:'.$name);
		$skey         = str_enhtml($this->input->get('skey',TRUE));
		$categoryId   = intval($this->input->get_post('categoryId',TRUE));         
		$where = $categoryId>0 ? ' and cCategory = '.$categoryId.'' : ''; 
		$where .= $skey ? ' and (number like "%'.$skey.'%" or name like "%'.$skey.'%" or linkMans like "%'.$skey.'%")' : '';        
		$data['list'] = $this->mysql_model->get_results(CONTACT,'(isDelete=0) and type=-10 '.$where.' order by id desc');   
		$this->load->view('settings/customer-export',$data);
	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */