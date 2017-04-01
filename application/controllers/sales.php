<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Sales extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
    }
	
	public function sales_search() {
		$this->load->view('sales/sales-search');	
	}
	
	
	 
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */