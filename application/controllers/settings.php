<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Settings extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
    }
	
    //客户列表
	public function customer_list() {
	    $this->common_model->checkpurview(58);
		$this->load->view('settings/customer-list');	
	}
	
	
	//客户新增修改
	public function customer_manage() {
		$this->load->view('settings/customer-manage');	
	}
	
	//供应商列表
	public function vendor_list() {
	    $this->common_model->checkpurview(63);
		$this->load->view('settings/vendor-list');	
	}
	
	
	//供应商新增修改
	public function vendor_manage() {
		$this->load->view('settings/vendor-manage');	
	}
	
	
	//联系地址
	public function addressmanage() {
		$this->load->view('settings/addressmanage');	
	}
	
	//商品列表
	public function goods_list() {
	    $this->common_model->checkpurview(68);
		$this->load->view('settings/goods-list');	
	}
	
	
	//仓库列表
	public function storage_list() {
	    $this->common_model->checkpurview(155);
		$this->load->view('settings/storage-list');	
	}
	
	//仓库新增
	public function storage_manage() {
		$this->load->view('settings/storage-manage');	
	}
	
	//职员列表
	public function staff_list() {
	    $this->common_model->checkpurview(97);
		$this->load->view('settings/staff-list');	
	}
	
	//职员新增
	public function staff_manage() {
		$this->load->view('settings/staff-manage');	
	}
	
	//发货地址管理
	public function shippingaddress() {
		$this->load->view('settings/shippingaddress');	
	}
	
	//发货地址新增修改
	public function shippingaddressmanage() {
		$this->load->view('settings/shippingaddressmanage');	
	}
	
	//账号管理
	public function settlement_account() {
	    $this->common_model->checkpurview(98);
		$this->load->view('settings/settlement-account');	
	}
	
	//账号管理新增修改
	public function settlementaccount_manager() {
		$this->load->view('settings/settlementaccount-manager');	
	}
	
	//系统参数
	public function system_parameter() {
	    $this->common_model->checkpurview(81);
		$this->load->view('settings/system-parameter');	
	}
	
	//计量单位
	public function unit_list() {
	    $this->common_model->checkpurview(77);
		$this->load->view('settings/unit-list');	
	}
	
	//计量单位新增修改
	public function unit_manage() {
		$this->load->view('settings/unit-manage');	
	}
	
	
	//计量单位新增修改
	public function unitgroup_manage() {
		$this->load->view('settings/unitgroup-manage');	
	}
	
	
	//数据备份
	public function backup() {
	    $this->common_model->checkpurview(84);
		$this->load->view('settings/backup');	
	}
	
	//结算方式
	public function settlement_category_list() {
	    $this->common_model->checkpurview(159);
		$this->load->view('settings/settlement-category-list');	
	}
	
	//结算方式新增修改
	public function settlement_category_manager() {
		$this->load->view('settings/settlement-category-manage');	
	}
	
	//客户类别、商品类别、供应商类别、支出、收入
	public function category_list() {
	    $type = str_enhtml($this->input->get('typeNumber',TRUE));
		$info = array('customertype'=>73,'supplytype'=>163,'trade'=>167,'paccttype'=>171,'raccttype'=>175);
		$this->common_model->checkpurview($info[$type]);
		$this->load->view('settings/category-list');	
	}
	
	//多账户结算
	public function choose_account() {
		$this->load->view('settings/choose-account');	
	}
	
	
	//库存预警
	public function inventory_warning() {
		$this->load->view('settings/inventory-warning');	
	}
	
	//日志
	public function log() {
	    $this->common_model->checkpurview(83);
		$this->load->view('settings/log-initloglist');	
	}
	
	//权限
	public function authority() {
	    $this->common_model->checkpurview(82);
		$this->load->view('settings/authority');	
	}
	
	//权限新增
	public function authority_new() {
	    $this->common_model->checkpurview(82);
		$this->load->view('settings/authority-new');	
	}
	
	//功能权限设置
	public function authority_setting() {
	    $this->common_model->checkpurview(82);
		$this->load->view('settings/authority-setting');	
	}
	
	//数据权限设置
	public function authority_setting_data() {
	    $this->common_model->checkpurview(82);
		$this->load->view('settings/authority-setting-data');	
	}
	
	//商品新增修改
	public function goods_manage() {
		$this->load->view('settings/goods-manage');	
	} 
	
	//商品图片上传
	public function fileupload() {
		$this->load->view('settings/fileupload');	
	}
	
	//辅助资料
	public function assistingprop() {
		$this->load->view('settings/assistingprop');	
	}
	
	//辅助资料
	public function prop_list() {
		$this->load->view('settings/prop-list');	
	}
	
	//辅助资料
	public function propmanage() {
		$this->load->view('settings/propmanage');	
	}
	
	//导入
	public function import() {
		$this->load->view('settings/import');	
	}
	
	//选择客户
	public function select_customer() {
		$this->load->view('settings/select-customer');	
	}
	
	//选择商品 
	public function goods_batch() {
		$this->load->view('settings/goods-batch');	
	}
	
	//增值服务
	public function addedServiceList() {
		$this->load->view('settings/addedServiceList');	
	}
	
	//属性 
	public function assistingProp_batch() {
		$this->load->view('settings/assistingProp-batch');	
	}
	
	//属性组合
	public function assistingPropGroupManage() {
		$this->load->view('settings/assistingPropGroupManage');	
	}
	
	//批量选择仓库
	public function storage_batch() {
		$this->load->view('settings/storage-batch');	
	}
	
	//批量选择销售人员 
	public function saler_batch() {
		$this->load->view('settings/saler-batch');	
	}
	
	//批量选择客户
	public function customer_batch() {
		$this->load->view('settings/customer-batch');	
	}
	
	//批量选择供应商
	public function supplier_batch() {
		$this->load->view('settings/supplier-batch');	
	}
	
	//批量选择账户
	public function settlementAccount_batch() {
		$this->load->view('settings/settlementAccount-batch');	
	}
	
	 
	//套打模板
	public function print_templates() {
		$this->load->view('settings/print-templates');	
	} 
	
	//套打模板新增修改
	public function print_templates_manage() {
		$this->load->view('settings/print-templates-manage');	
	} 
	 
	 
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */