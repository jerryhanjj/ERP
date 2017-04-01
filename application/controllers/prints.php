<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Prints extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
    }
	
    public function index() {
	  
	}
	 
	public function print_settings_voucher() {
		$this->load->view('print/print-settings-voucher');	
	}
	 
	
	 
	 
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */