<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Storage extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
    }
	
    //其他入库列表高级搜索
	public function other_search() {
		$this->load->view('storage/other-search');	
	}
	
	//盘点
	public function inventory() {
	    $this->common_model->checkpurview(11);
	    $this->load->view('storage/inventory');	
	}
	
	//其他入库列表高级搜索
	public function transfers_search () {
	    $this->load->view('storage/transfers-search');	
	}
	
	//盘点导入
	public function import () {
	    $this->load->view('storage/import');	
	}
	
	
	 
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */