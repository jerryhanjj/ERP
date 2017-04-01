<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Mysql_model extends CI_Model { 

    public function __construct(){
  		parent::__construct();
		//$this->cache_time = 3600000;
		$this->cache_time = 60000;
		$this->cache_path = $this->config->item('cache_path');
		$this->load->driver('cache', array('adapter' => 'file'));
	}

    public function query($table,$sql,$type=1) {
		$name   = $table.md5($table.$sql.$type);
		$result = $this->cache->get($name);
		if (!$result) {
			$query = $this->db->query($sql);
			switch ($type) {
				case 1:
					$result = $query->row_array();
					break;  
				case 2:
					$result = $query->result_array();
					break;  	
				case 3:
					$result = $query->num_rows();
					break; 	
			}
			$this->cache->save($name,$result,$this->cache_time);
		}
		return $result;
	}
	
	public function get_results($table,$where='',$field='*') {
	    $name   = $table.md5('get_results'.$table.$where.$field);
		$result = $this->cache->get($name);
		if (!$result) {
		    if ($where) {
				$this->db->where($where);
			}
			$this->db->select($field);
			$query = $this->db->get($table); 
			$result = $query->result_array();
			$this->cache->save($name,$result,$this->cache_time);
		}
		return $result;
	}
	
	public function get_row($table,$where='',$field='*') {
	    $name   = $table.md5('get_row'.$table.$where.$field);
		$result = $this->cache->get($name);
		if (!$result) {
			if (!$where) return false;
			if (isset($where)) {
				$this->db->where($where);
			}
			$this->db->select($field);
			$query = $this->db->get($table); 
			$result = $query->row_array();
			$result = ($field!='*') && $result ? $result[$field] : $result;
			$this->cache->save($name,$result,$this->cache_time);
		}
		return $result;
	}
	
	public function get_count($table,$where='') {
	    $name   = $table.md5('get_count'.$table.$where);
		$result = $this->cache->get($name);
		if (!$result) {
			if ($where) {
				$this->db->where($where);
			}
			$result = $this->db->count_all_results($table);
			$this->cache->save($name,$result,$this->cache_time);
		}
		return $result;
	}
	
	public function insert($table,$data){ 
	    if (!$data) return false;
        if (isset($data[0]) && is_array($data[0])) {
        	if ($this->db->insert_batch($table, $data)) {
        		$result = $this->db->insert_id(); 
        	}     
        } else {
			if ($this->db->insert($table, $data)) {
        		$result = $this->db->insert_id(); 
        	}     	
        }
		if (isset($result) && $result) {
		    $this->cache_delete($table);
			return  $result;  
		} 
        return false;
	}
	
	public function update($table,$data,$where='') {
	    if (!$data) return false;
        if (isset($data[0]) && is_array($data[0])) {
        	$this->db->update_batch($table,$data,$where);
        	if ($this->db->affected_rows()) {
			    $result = true;  
        	}     
        } else {
		    if (is_array($data)) {
				if ($where) {
					$this->db->where($where);
				}
				$result = $this->db->update($table, $data);  
			} else {
				$where = $where ? ' WHERE '.$where : '';
			    $sql = 'UPDATE '.$table.' SET '.$data .$where;
				$result = $this->db->query($sql);
			}	
        }
		if (isset($result) && $result) {
		    $this->cache_delete($table);
			return  $result;  
		} 
        return false;
    }

	public function delete($table,$where='') { 
		if ($where) {
			$this->db->where($where);
		}
		$this->db->delete($table);
		if ($this->db->affected_rows()) {
		    $this->cache_delete($table);
        	return  true; 
		} else {
			return  false; 
        } 
	}
	
	public function cache_delete($key) {
	    if (is_dir($this->cache_path.$key)) {
		    delete_files($this->cache_path.$key);
		} else {
		    $data = $this->cache->cache_info();
			foreach ($data as $arr=>$row) {
				if ($key == substr($arr,0,strlen($key))) {
					$this->cache->delete($arr);	
				}
			} 	
		}
	}
	
	public function clean() {
		return $this->cache->clean();
	}
	
	
}