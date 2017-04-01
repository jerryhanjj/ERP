<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class MY_Loader extends CI_Loader {

	public function __construct(){
		parent::__construct();
	}
	
	public function setpath(){
		$path = str_replace("\\", "/", FCPATH);
		$this->_ci_view_paths = array($path.'data/themes/' => TRUE);
	}
}
