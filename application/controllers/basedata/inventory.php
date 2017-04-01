<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Inventory extends CI_Controller {

    public function __construct(){
        parent::__construct();
		$this->common_model->checkpurview();
		$this->load->library('lib_pinyin');
    }
	
    //商品列表
	public function index(){
		$v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100);
		$skey = str_enhtml($this->input->get_post('skey',TRUE));
		$categoryid   = intval($this->input->get_post('assistId',TRUE));
		$barCode = intval($this->input->get_post('barCode',TRUE));
		$where = '';
		$where .= $skey ? ' and (name like "%'.$skey.'%" or number like "%'.$skey.'%" or spec like "%'.$skey.'%")' : '';
		$where .= $barCode ? ' and barCode="'.$barCode.'"' : '';
		if ($categoryid > 0) {
		    $cid = array_column($this->mysql_model->get_results(CATEGORY,'(1=1) and find_in_set('.$categoryid.',path)'),'id'); 
			if (count($cid)>0) {
			    $cid = join(',',$cid);
			    $where .= ' and categoryid in('.$cid.')';
			} 
		}
		$offset = $rows*($page-1);
		$data['data']['page']      = $page;                                                             //当前页
		$data['data']['records']   = $this->data_model->get_goods($where,3);   //总条数
		$data['data']['total']     = ceil($data['data']['records']/$rows);                              //总分页数
		$list = $this->data_model->get_goods($where.' order by id desc limit '.$offset.','.$rows.'');   
		foreach ($list as $arr=>$row) {
		    $v[$arr]['amount']        = (float)$row['iniamount'];
			$v[$arr]['barCode']       = $row['barCode'];
			$v[$arr]['categoryName']  = $row['categoryName'];
			$v[$arr]['currentQty']    = $row['totalqty'];                            //当前库存
			$v[$arr]['delete']        = intval($row['disable'])==1 ? true : false;   //是否禁用
			$v[$arr]['discountRate']  = 0;
			$v[$arr]['id']            = intval($row['id']);
			$v[$arr]['isSerNum']      = intval($row['isSerNum']);
			$v[$arr]['josl']     = $row['josl'];
			$v[$arr]['name']     = $row['name'];
			$v[$arr]['number']   = $row['number'];
			$v[$arr]['pinYin']   = $row['pinYin'];
			$v[$arr]['locationId']   = intval($row['locationId']);
			$v[$arr]['locationName'] = $row['locationName'];
			$v[$arr]['locationNo'] = '';
			$v[$arr]['purPrice']   = $row['purPrice'];
			$v[$arr]['quantity']   = $row['iniqty'];
			$v[$arr]['salePrice']  = $row['salePrice'];
			$v[$arr]['skuClassId'] = $row['skuClassId'];
			$v[$arr]['spec']       = $row['spec'];
			$v[$arr]['unitCost']   = $row['iniunitCost'];
			$v[$arr]['unitId']     = intval($row['unitId']);
			$v[$arr]['unitName']   = $row['unitName'];
		}
		$data['data']['rows']   = $v;
		die(json_encode($data));
   
	}
	
	//商品选择 
	public function listBySelected() { 
	    $v = array();
	    $contactid = intval($this->input->post('contactId',TRUE));
		$id = intval($this->input->post('ids',TRUE));
		$data['status'] = 200;
		$data['msg']    = 'success';
		$list = $this->mysql_model->get_results(GOODS,'(isDelete=0) and (disable=0) and id='.$id.''); 
		foreach ($list as $arr=>$row) {
		    $v[$arr]['amount']        = (float)$row['amount'];
			$v[$arr]['barCode']       = $row['barCode'];
			$v[$arr]['categoryName']  = $row['categoryName'];
			$v[$arr]['currentQty']    = 0;                                           //当前库存
			$v[$arr]['delete']        = intval($row['disable'])==1 ? true : false;   //是否禁用
			$v[$arr]['discountRate']  = 0;
			$v[$arr]['id']            = intval($row['id']);
			$v[$arr]['isSerNum']      = intval($row['isSerNum']);
			$v[$arr]['josl']     = '';
			$v[$arr]['name']     = $row['name'];
			$v[$arr]['number']   = $row['number'];
			$v[$arr]['pinYin']   = $row['pinYin'];
			$v[$arr]['locationId']   = intval($row['locationId']);
			$v[$arr]['locationName'] = $row['locationName'];
			$v[$arr]['locationNo'] = '';
			$v[$arr]['purPrice']   = $row['purPrice'];
			$v[$arr]['quantity']   = $row['quantity'];
			$v[$arr]['salePrice']  = $row['salePrice'];
			$v[$arr]['skuClassId'] = $row['skuClassId'];
			$v[$arr]['spec']       = $row['spec'];
			$v[$arr]['unitCost']   = $row['unitCost'];
			$v[$arr]['unitId']     = intval($row['unitId']);
			$v[$arr]['unitName']   = $row['unitName'];
		}
		$data['data']['result']   = $v;
		die(json_encode($data)); 
	}
	
	
	//获取信息
	public function query() {
	    $id = intval($this->input->post('id',TRUE));
		str_alert(200,'success',$this->get_goods_info($id)); 
	}
	
	
	//检测编号
	public function getNextNo() {
		$skey = str_enhtml($this->input->post('skey',TRUE));
		$this->mysql_model->get_count(GOODS,'(isDelete=0) and (number="'.$skey.'")') > 0 && str_alert(-1,'商品编号已经存在');
		str_alert(200,'success');
	}
	
	//检测条码 
	public function checkBarCode() {
		 $barCode = str_enhtml($this->input->post('barCode',TRUE));
		 $this->mysql_model->get_count(GOODS,'(isDelete=0) and (barCode="'.$barCode.'")') > 0 && str_alert(-1,'商品条码已经存在');
		 str_alert(200,'success');
	}
	
	//检测规格
	public function checkSpec() {
		 $spec = str_enhtml($this->input->post('spec',TRUE));
		 $this->mysql_model->get_count(ASSISTSKU,'(isDelete=0) and (skuName="'.$spec.'")') > 0 && str_alert(-1,'商品规格已经存在');
		 str_alert(200,'success');
	}
	
	//检测名称
	public function checkname() {
		 $skey = str_enhtml($this->input->post('barCode',TRUE));
		 echo '{"status":200,"msg":"success","data":{"number":""}}';
	}
	
	//获取图片信息
	public function getImagesById() {
	    $v  = array(); 
	    $id = intval($this->input->post('id',TRUE));
	    $list = $this->mysql_model->get_results(GOODS_IMG,'(invId='.$id.') and isDelete=0');
		foreach ($list as $arr=>$row) {
		    $v[$arr]['pid']          = $row['id'];
			$v[$arr]['status']       = 1;
			$v[$arr]['name']         = $row['name'];
			$v[$arr]['url']          = site_url().'/basedata/inventory/getImage?action=getImage&pid='.$row['id'];
			$v[$arr]['thumbnailUrl'] = site_url().'/basedata/inventory/getImage?action=getImage&pid='.$row['id'];
			$v[$arr]['deleteUrl']    = '';
			$v[$arr]['deleteType']   = '';
		}
		$data['status'] = 200;
		$data['msg']    = 'success';
		$data['files']  = $v;
		die(json_encode($data));  
	}
	
	//上传图片信息
	public function uploadImages() {
	    require_once './application/libraries/UploadHandler.php';
		$config = array(
			'script_url' => base_url().'inventory/uploadimages',
			'upload_dir' => dirname($_SERVER['SCRIPT_FILENAME']).'/data/upfile/goods/',
			'upload_url' => base_url().'data/upfile/goods/',
			'delete_type' =>'',
			'print_response' =>false
		);
		$uploadHandler = new UploadHandler($config);
		$list  = (array)json_decode(json_encode($uploadHandler->response['files'][0]), true); 
		$newid = $this->mysql_model->insert(GOODS_IMG,$list);
		$files[0]['pid']          = intval($newid);
		$files[0]['status']       = 1;
		$files[0]['size']         = (float)$list['size'];
		$files[0]['name']         = $list['name'];
		$files[0]['url']          = site_url().'/basedata/inventory/getImage?action=getImage&pid='.$newid;
		$files[0]['thumbnailUrl'] = site_url().'/basedata/inventory/getImage?action=getImage&pid='.$newid;
		$files[0]['deleteUrl']    = '';
		$files[0]['deleteType']   = '';
		$data['status'] = 200;
		$data['msg']    = 'success';
		$data['files']  = $files;
        die(json_encode($data)); 
	}
	
	//保存上传图片信息
	public function addImagesToInv() {
	    $data = $this->input->post('postData');
		if (strlen($data)>0) {
		    $v = $s = array();
		    $data = (array)json_decode($data, true); 
			$id   = isset($data['id']) ? $data['id'] : 0;
		    !isset($data['files']) || count($data['files']) < 1 && str_alert(-1,'请先添加图片！'); 
			foreach($data['files'] as $arr=>$row) {
			    if ($row['status']==1) {
					$v[$arr]['id']       = $row['pid'];
					$v[$arr]['invId']    = $id;
				} else {
				    $s[$arr]['id']       = $row['pid'];
					$s[$arr]['invId']    = $id;
					$s[$arr]['isDelete'] = 1;
				}
			}
			$this->mysql_model->update(GOODS_IMG,array_values($v),'id');
			$this->mysql_model->update(GOODS_IMG,array_values($s),'id');
			str_alert(200,'success'); 
	    }
		str_alert(-1,'保存失败'); 
	}
	
	//获取图片信息
	public function getImage() {
	    $id = intval($this->input->get_post('pid',TRUE));
	    $data = $this->mysql_model->get_row(GOODS_IMG,'(id='.$id.')');
		if (count($data)>0) {
		    $url     = './data/upfile/goods/'.$data['name'];
			$info    = getimagesize($url);  
			$imgdata = fread(fopen($url,'rb'),filesize($url));   
			header('content-type:'.$info['mime'].'');  
			echo $imgdata;   
		}	 
	}
     
	//新增
	public function add(){
		$this->common_model->checkpurview(69);
		$data = $this->input->post(NULL,TRUE);
		if ($data) {
		    $v = '';
			$data = $this->validform($data);
			$this->mysql_model->get_count(GOODS,'(isDelete=0) and (number="'.$data['number'].'")') > 0 && str_alert(-1,'商品编号重复');
			$this->db->trans_begin();
			$info = array(
			    'barCode','baseUnitId','unitName','categoryId','categoryName',
				'discountRate1','discountRate2','highQty','locationId','pinYin',
				'locationName','lowQty','name','number','purPrice',
				'remark','salePrice','spec','vipPrice','wholesalePrice'
			);
			$info = elements($info, $data,NULL);
			$data['id'] = $invId = $this->mysql_model->insert(GOODS,$info);
			if (strlen($data['propertys'])>0) {                            
				$list = (array)json_decode($data['propertys'],true);
				foreach ($list as $arr=>$row) {
					$v[$arr]['invId']         = $invId;
					$v[$arr]['locationId']    = isset($row['locationId'])?$row['locationId']:0;
					$v[$arr]['qty']           = isset($row['quantity'])?$row['quantity']:0; 
					$v[$arr]['price']         = isset($row['unitCost'])?$row['unitCost']:0; 
					$v[$arr]['amount']        = isset($row['amount'])?$row['amount']:0; 
					$v[$arr]['skuId']         = isset($row['skuId'])?$row['skuId']:0; 
					$v[$arr]['billDate']      = date('Y-m-d');
					$v[$arr]['billNo']        = '期初数量';
					$v[$arr]['billType']      = 'INI';
					$v[$arr]['transTypeName'] = '期初数量';
				} 
				if (is_array($v)) {
					$this->mysql_model->insert(INVOICE_INFO,$v);
				}
			}
            if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'SQL错误回滚');
			} else {
			    $this->db->trans_commit();
				$this->common_model->logs('新增商品:'.$data['name']);
				str_alert(200,'success',$data);
			}
		}
		str_alert(-1,'添加失败');
	} 
	
	//修改
	public function update(){
		$this->common_model->checkpurview(70);
		$data = $this->input->post(NULL,TRUE);
		if ($data) {
			$id   = intval($data['id']);
			$data = $this->validform($data);
			$this->mysql_model->get_count(GOODS,'(isDelete=0) and (id<>'.$id.') and (number="'.$data['number'].'")') > 0 && str_alert(-1,'商品编号重复');
			$this->db->trans_begin();
			$info = array(
			    'barCode','baseUnitId','unitName','categoryId','categoryName',
				'discountRate1','discountRate2','highQty','locationId','pinYin',
				'locationName','lowQty','name','number','purPrice',
				'remark','salePrice','spec','vipPrice','wholesalePrice'
			);
			$info = elements($info, $data,NULL);
			$this->mysql_model->update(GOODS,$info,'(id='.$id.')');
			if (strlen($data['propertys'])>0) {  
			    $v = '';                          
				$list = (array)json_decode($data['propertys'],true);
				foreach ($list as $arr=>$row) {
					$v[$arr]['invId']         = $id;
					$v[$arr]['locationId']    = isset($row['locationId'])?$row['locationId']:0;
					$v[$arr]['qty']           = isset($row['quantity'])?$row['quantity']:0; 
					$v[$arr]['price']         = isset($row['unitCost'])?$row['unitCost']:0; 
					$v[$arr]['amount']        = isset($row['amount'])?$row['amount']:0; 
					$v[$arr]['skuId']         = isset($row['skuId'])?$row['skuId']:0;  
					$v[$arr]['billDate']      = date('Y-m-d');
					$v[$arr]['billNo']        = '期初数量';
					$v[$arr]['billType']      = 'INI';
					$v[$arr]['transTypeName'] = '期初数量';
				} 
				$this->mysql_model->delete(INVOICE_INFO,'(invId='.$id.') and billType="INI"');
				if (is_array($v)) {
					$this->mysql_model->insert(INVOICE_INFO,$v);
				}
			}
            if ($this->db->trans_status() === FALSE) {
			    $this->db->trans_rollback();
				str_alert(-1,'SQL错误回滚');
			} else {
			    $this->db->trans_commit();
				$this->common_model->logs('修改商品:ID='.$id.'名称:'.$data['name']);
				str_alert(200,'success',$this->get_goods_info($id));
			}	 
		}
		str_alert(-1,'修改失败');
	} 
	
	//删除
	public function delete(){
		$this->common_model->checkpurview(71);
		$id = str_enhtml($this->input->post('id',TRUE));
		$data = $this->mysql_model->get_results(GOODS,'(id in('.$id.')) and (isDelete=0)'); 
		if (count($data) > 0) {
		    $info['isDelete'] = 1;
		    $this->mysql_model->get_count(INVOICE_INFO,'(isDelete=0) and (invId in('.$id.'))')>0 && str_alert(-1,'其中有商品发生业务不可删除');
		    $sql  = $this->mysql_model->update(GOODS,$info,'(id in('.$id.'))');   
		    if ($sql) {
			    $name = array_column($data,'name'); 
				$this->common_model->logs('删除商品:ID='.$id.' 名称:'.join(',',$name));
				str_alert(200,'success',array('msg'=>'','id'=>'['.$id.']'));
			}
			str_alert(-1,'删除失败');
		}
	}
	
    //导出
	public function exporter() {
	    $this->common_model->checkpurview(72);
		$name = 'goods_'.date('YmdHis').'.xls';
		sys_csv($name);
		$this->common_model->logs('导出商品:'.$name);
		$skey = str_enhtml($this->input->get_post('skey',TRUE));
		$categoryid   = intval($this->input->get_post('assistId',TRUE));
		$barCode      = intval($this->input->get_post('barCode',TRUE));
		$where = '';
		$where .= $skey ? ' and (name like "%'.$skey.'%" or number like "%'.$skey.'%" or spec like "%'.$skey.'%")' : '';
		$where .= $barCode ? ' and barCode="'.$barCode.'"' : '';
		if ($categoryid > 0) {
		    $cid = array_column($this->mysql_model->get_results(CATEGORY,'(1=1) and find_in_set('.$categoryid.',path)'),'id'); 
			if (count($cid)>0) {
			    $cid = join(',',$cid);
			    $where .= ' and categoryid in('.$cid.')';
			} 
		}
		
		$data['ini']  = $this->data_model->get_invoice_info('and billType="INI"');
		$data['list'] = $this->data_model->get_goods($where.' order by id desc');  
        $this->load->view('settings/goods-export',$data);
		  
	}
	
	//状态
	public function disable(){
		$this->common_model->checkpurview(72);
		$disable = intval($this->input->post('disable',TRUE));
		$id = str_enhtml($this->input->post('invIds',TRUE));
		if (strlen($id) > 0) { 
			$info['disable'] = $disable; 
			$sql = $this->mysql_model->update(GOODS,$info,'(id in('.$id.'))');
		    if ($sql) {
				$this->common_model->logs('商品'.$disable==1?'禁用':'启用'.':ID:'.$id.'');
				str_alert(200,'success');
			}
		}
		str_alert(-1,'操作失败');
	}
	
	//库存预警 
	public function listinventoryqtywarning() {
	    $v = array();
	    $data['status'] = 200;
		$data['msg']    = 'success'; 
		$page = max(intval($this->input->get_post('page',TRUE)),1);
		$rows = max(intval($this->input->get_post('rows',TRUE)),100);
		$where = ''; 
		$data['data']['total']     = 1;                         
		$data['data']['records']   = $this->data_model->get_inventory($where.' GROUP BY invId HAVING qty>highQty or qty<lowQty',3);    
		$list = $this->data_model->get_inventory($where.' GROUP BY invId HAVING qty>highQty or qty<lowQty');    
		foreach ($list as $arr=>$row) {
		    $qty1 = (float)$row['qty'] - (float)$row['highQty'];
			$qty2 = (float)$row['qty'] - (float)$row['lowQty'];
			$v[$arr]['highQty']       = (float)$row['highQty'];
			$v[$arr]['id']            = intval($row['invId']);
			$v[$arr]['lowQty']        = (float)$row['lowQty'];
			$v[$arr]['name']          = $row['invName'];
			$v[$arr]['number']        = $row['invNumber'];
			$v[$arr]['warning']       = $qty1 > 0 ? $qty1 : $qty2;
			$v[$arr]['qty']           = (float)$row['qty'];
			$v[$arr]['unitName']      = $row['unitName'];
			$v[$arr]['spec']          = $row['invSpec'];
		}
		$data['data']['rows']  = $v;
		die(json_encode($data));
	} 
	
	//通过ID 获取商品信息
	private function get_goods_info($id) {
	    $data = $this->mysql_model->get_row(GOODS,'(id='.$id.') and (isDelete=0)');
		if (count($data)>0) {
			$v = array();
			$data['id']            = intval($id); 
			$data['count']         = 0;
			$data['unitTypeId']    = intval($data['unitTypeId']);
			$data['baseUnitId']    = intval($data['baseUnitId']);
			$data['categoryId']    = intval($data['categoryId']);
			$data['salePrice']     = (float)$data['salePrice'];
			$data['vipPrice']      = (float)$data['vipPrice'];
			$data['purPrice']      = (float)$data['purPrice'];
			$data['wholesalePrice']= (float)$data['wholesalePrice'];
			$data['discountRate1'] = (float)$data['discountRate1'];
			$data['discountRate2'] = (float)$data['discountRate2'];
			$data['remark']        = $data['remark'];
			$data['locationId']    = intval($data['locationId']);
			$data['baseUnitId']    = intval($data['baseUnitId']);
			$data['unitTypeId']    = intval($data['unitTypeId']);
			$data['unitId']        = intval($data['unitId']);
			$data['highQty']       = (float)$data['highQty'];
			$data['lowQty']        = (float)$data['lowQty'];
			$data['property']      = $data['property'] ? $data['property'] : NULL;
			$data['quantity']      = (float)$data['quantity'];
			$data['isWarranty']    = (float)$data['isWarranty'];
			$data['advanceDay']    = (float)$data['advanceDay'];
			$data['unitCost']      = (float)$data['unitCost'];
			$data['isSerNum']      = (float)$data['isSerNum'];
			$data['amount']        = (float)$data['amount'];
			$data['quantity']      = (float)$data['quantity'];
			$data['unitCost']      = (float)$data['unitCost'];
			$data['delete']        = intval($data['disable'])==1 ? true : false;   //是否禁用
			$propertys = $this->data_model->get_invoice_info('and (a.invId='.$id.') and a.billType="INI"'); 
			foreach ($propertys as $arr=>$row) { 
				$v[$arr]['id']            = intval($row['id']);
				$v[$arr]['locationId']    = intval($row['locationId']);
				$v[$arr]['inventoryId']   = intval($row['invId']);
				$v[$arr]['locationName']  = $row['locationName'];
				$v[$arr]['quantity']      = (float)$row['qty'];
				$v[$arr]['unitCost']      = (float)$row['price'];
				$v[$arr]['amount']        = (float)$row['amount'];
				$v[$arr]['skuId']         = intval($row['skuId']);
				$v[$arr]['skuName']       = '';
				$v[$arr]['date']          = $row['billDate'];
				$v[$arr]['tempId']        = 0;
				$v[$arr]['batch']         = '';
				$v[$arr]['invSerNumList'] = '';
			} 
			$data['propertys']            = $v;
		}
		return $data;
	}
	
	
	//公共验证
	private function validform($data) {
	    $this->load->library('lib_cn2pinyin');
	    strlen($data['name']) < 1 && str_alert(-1,'商品名称不能为空');
		strlen($data['number']) < 1 && str_alert(-1,'商品编号不能为空');
		intval($data['categoryId']) < 1 && str_alert(-1,'商品类别不能为空');
		intval($data['baseUnitId']) < 1 && str_alert(-1,'计量单位不能为空');
		$data['lowQty']    = (float)$data['lowQty'];
		$data['purPrice']  = (float)$data['purPrice'];
		$data['salePrice'] = (float)$data['salePrice'];
		$data['vipPrice']  = (float)$data['vipPrice'];
		$data['discountRate1']  = (float)$data['discountRate1'];
		$data['discountRate2']  = (float)$data['discountRate2'];
		$data['wholesalePrice'] = (float)$data['wholesalePrice'];
		$data['barCode']  = $data['barCode'] ? $data['barCode'] :NULL;
		$data['remark']   = $data['remark'] ? $data['remark'] :NULL;
		$data['spec']     = $data['spec'] ? $data['spec'] :NULL;
		
		
		$data['unitName']     = $this->mysql_model->get_row(UNIT,'(id='.$data['baseUnitId'].')','name');
		$data['categoryName'] = $this->mysql_model->get_row(CATEGORY,'(id='.$data['categoryId'].')','name');
		$data['pinYin'] = $this->lib_cn2pinyin->encode($data['name']); 
		!$data['categoryName'] && str_alert(-1,'商品类别不存在');
	    if (strlen($data['propertys'])>0) {                            
			$list         = (array)json_decode($data['propertys'],true);
			$storage      = $this->mysql_model->get_results(STORAGE,'(disable=0)');  
			$locationId   =  array_column($storage,'id'); 
			$locationName =  array_column($storage,'name','id');
			foreach ($list as $arr=>$row) {
				!in_array($row['locationId'],$locationId) && str_alert(-1,@$locationName[$row['locationId']].'仓库不存在或不可用！'); 
			} 
		}
		return $data;
	}  

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */