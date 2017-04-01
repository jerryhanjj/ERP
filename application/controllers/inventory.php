<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Inventory extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
    }
	
    //¿â´æ²éÑ¯
	public function index() {
		$this->load->view('inventory');	
	}
	
	 
	
	 
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */