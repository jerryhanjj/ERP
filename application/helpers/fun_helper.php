<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

function sys_skin() {
    $ci = &get_instance();
	return $ci->input->cookie('skin') ? $ci->input->cookie('skin') : 'blue';
}

function skin_url() {
	$useragent = $_SERVER['HTTP_USER_AGENT'];
	$skin_url = 'statics/saas/scm/app2_beta';
	if (strstr($useragent,'Chrome')) {
	    $skin_url = 'statics/saas/scm/app2_release';
	}
	return base_url($skin_url);
}

function token($str='') {
    $ci = &get_instance();
	if (!$str) {
		$data['token'] = md5(time().uniqid());
		set_cookie('token',$data['token'],120000);
		return $data['token'];
	} else {
	    $post   = $ci->input->get_post('token');
		$token  = get_cookie('token');
		if (isset($token) && isset($post) && $post == $token) {
		    set_cookie('token','',120000);
			return true;
		}
		return false;
	}
}

function alert($str,$url='') {
    $str = $str ? 'alert("'.$str.'");' : '';
    $url = $url ? 'location.href="'.$url.'";' : 'history.go(-1);';
	die('<script>'.$str.$url.'</script>');
}

function str_enhtml($str) {
	if (!is_array($str)) return addslashes(htmlspecialchars(trim($str)));
	foreach ($str as $key=>$val) {
		$str[$key] = str_enhtml($val);
	}
	return $str;
}

function str_nohtml($str) {
	if (!is_array($str)) return stripslashes(htmlspecialchars_decode(trim($str)));
	foreach ($str as $key=>$val) {
		$str[$key] = str_nohtml($val);
	}
	return $str;
} 

function str_alert($status=200,$msg='success',$data=array()) {
    $msg = array(
		'status' => $status,
		'msg' => $msg,
		'data' => $data,
	);
	return die(json_encode($msg));
}

function str_check($t0, $t1) {
	if (strlen($t0)<1) return false;   
	switch($t1){
		case 'en':$t2 = '/^[a-zA-Z]+$/'; break;   
		case 'cn':$t2 = '/[\u4e00-\u9fa5]+/u'; break;    
		case 'int':$t2 = '/^[0-9]*$/'; break;        
		case 'price':$t2 = '/^\d+(\.\d+)?$/'; break;  
		case 'username':$t2 = '/^[a-zA-Z0-9_]{5,20}$/'; break;   
		case 'password':$t2 = '/^[a-zA-Z0-9_]{6,16}$/'; break;   
		case 'email':$t2 = '/^[\w\-\.]+@[a-zA-Z0-9]+\.(([a-zA-Z0-9]{2,4})|([a-zA-Z0-9]{2,4}\.[a-zA-Z]{2,4}))$/'; break;      
		case 'tel':$t2 = '/^((\(\+?\d{2,3}\))|(\+?\d{2,3}\-))?(\(0?\d{2,3}\)|0?\d{2,3}-)?[1-9]\d{4,7}(\-\d{1,4})?$/'; break; 
		case 'mobile':$t2 = '/^(\+?\d{2,3})?0?1(3\d|5\d|8\d)\d{8}$/'; break; 
		case 'idcard':$t2 = '/(^([\d]{15}|[\d]{18}|[\d]{17}x)$)/'; break; 
		case 'qq':$t2 = '/^[1-9]\d{4,15}$/'; break; 
		case 'url':$t2 = '/^(http|https|ftp):\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\'\'])*$/'; break; 
		case 'ip':$t2 = '/^((25[0-5]|2[0-4]\d|(1\d|[1-9])?\d)\.){3}(25[0-5]|2[0-4]\d|(1\d|[1-9])?\d)$/'; break; 
		case 'file':$t2 = '/^[a-zA-Z0-9]{1,50}$/'; break;    
		case 'zipcode':$t2 = '/^\d{6}$/'; break;        
		case 'filename':$t2 = '/^[a-zA-Z0-9]{1,50}$/'; break;       
		case 'date':$t2 = '/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/'; break;  
		case 'time':$t2 = '/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/'; break; 
		case 'utf8':$t2 = '%^(?:
						[\x09\x0A\x0D\x20-\x7E] # ASCII
						| [\xC2-\xDF][\x80-\xBF] # non-overlong 2-byte
						| \xE0[\xA0-\xBF][\x80-\xBF] # excluding overlongs
						| [\xE1-\xEC\xEE\xEF][\x80-\xBF]{2} # straight 3-byte
						| \xED[\x80-\x9F][\x80-\xBF] # excluding surrogates
						| \xF0[\x90-\xBF][\x80-\xBF]{2} # planes 1-3
						| [\xF1-\xF3][\x80-\xBF]{3} # planes 4-15
						| \xF4[\x80-\x8F][\x80-\xBF]{2} # plane 16
						)*$%xs'; break;                                   
		default:$t2 = ''; break;      
	}
	$pour = @preg_match($t2, $t0);   
	if ($pour) {  
		return $t0;  
	} else {  
		return false;   
	}  
}

function str_num2rmb($num) {
    $c1 = "零壹贰叁肆伍陆柒捌玖";
    $c2 = "分角元拾佰仟万拾佰仟亿";
    $num = round($num, 2);
    $num = $num * 100;
    if (strlen($num) > 10) {
        return "oh,sorry,the number is too long!";
    }
    $i = 0;
    $c = "";
    while (1) {
        if ($i == 0) {
            $n = substr($num, strlen($num)-1, 1);
        } else {
            $n = $num % 10;
        }
        $p1 = substr($c1, 3 * $n, 3);
        $p2 = substr($c2, 3 * $i, 3);
        if ($n != '0' || ($n == '0' && ($p2 == '亿' || $p2 == '万' || $p2 == '元'))) {
            $c = $p1 . $p2 . $c;
        } else {
            $c = $p1 . $c;
        }
        $i = $i + 1;
        $num = $num / 10;
        $num = (int)$num;
        if ($num == 0) {
            break;
        }
    }
    $j = 0;
    $slen = strlen($c);
    while ($j < $slen) {
        $m = substr($c, $j, 6);
        if ($m == '零元' || $m == '零万' || $m == '零亿' || $m == '零零') {
            $left = substr($c, 0, $j);
            $right = substr($c, $j + 3);
            $c = $left . $right;
            $j = $j-3;
            $slen = $slen-3;
        }
        $j = $j + 3;
    }
    if (substr($c, strlen($c)-3, 3) == '零') {
        $c = substr($c, 0, strlen($c)-3);
    }  
    return $c . "整";
}

function str_money($num,$f=2){
    $str = $num ? number_format($num, $f,'.',',') :'';
	return $str;
}

function str_random($len,$chars='ABCDEFJHIJKMNOPQRSTUVWSYZ'){
	$str = '';
	$max = strlen($chars) - 1;
	for ($i=0;$i<$len;$i++) {
		$str .= $chars[mt_rand(0,$max)];
	}
	return $str;
}

function str_quote($str) {
    $str = explode(',',$str);
	foreach($str as $v) {
	    $arr[] = "'$v'";
	}
	return @join(',',$arr);
}


function str_no($str='') {
	return $str.date("YmdHis").rand(0,9);
}

function str_auth($string, $operation = 'ENCODE', $key = '', $expiry = 0) {
	$key_length = 4;
	$key = md5($key != '' ? $key : 'ci');
	$fixedkey = md5($key);
	$egiskeys = md5(substr($fixedkey, 16, 16));
	$runtokey = $key_length ? ($operation == 'ENCODE' ? substr(md5(microtime(true)), -$key_length) : substr($string, 0, $key_length)) : '';
	$keys = md5(substr($runtokey, 0, 16) . substr($fixedkey, 0, 16) . substr($runtokey, 16) . substr($fixedkey, 16));
	$string = $operation == 'ENCODE' ? sprintf('%010d', $expiry ? $expiry + time() : 0).substr(md5($string.$egiskeys), 0, 16) . $string : base64_decode(substr($string, $key_length));

	$i = 0; $result = '';
	$string_length = strlen($string);
	for ($i = 0; $i < $string_length; $i++){
		$result .= chr(ord($string{$i}) ^ ord($keys{$i % 32}));
	}
	if($operation == 'ENCODE') {
		return $runtokey . str_replace('=', '', base64_encode($result));
	} else {
		if((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 26).$egiskeys), 0, 16)) {
			return substr($result, 26);
		} else {
			return '';
		}
	}
}

function dir_add($dir,$mode=0777){
    if (is_dir($dir) || @mkdir($dir,$mode)) return true;
    if (!dir_add(dirname($dir),$mode)) return false;
    return @mkdir($dir,$mode);
}

function dir_del($dir) {
    $dir = str_replace('\\', '/', $dir);
	if (substr($dir, -1) != '/') $dir = $dir.'/';
	if (!is_dir($dir)) return false;
	$list = glob($dir.'*');
	foreach($list as $v) {
		is_dir($v) ? dir_del($v) : @unlink($v);
	}
    return @rmdir($dir);
}

function sys_csv($name){
    header("Content-type:text/xls");
    header("Content-Disposition:attachment;filename=".$name);
    header('Cache-Control:must-revalidate,post-check=0,pre-check=0');
    header('Expires:0'); 
	header('Pragma:public');
} 

if (!function_exists('array_column')) {
    function array_column(array $array, $columnKey, $indexKey = null) {
        $result = array();
        foreach ($array as $subArray) {
            if (!is_array($subArray)) {
                continue;
            } elseif (is_null($indexKey) && array_key_exists($columnKey, $subArray)) {
                $result[] = $subArray[$columnKey];
            } elseif (array_key_exists($indexKey, $subArray)) {
                if (is_null($columnKey)) {
                    $result[$subArray[$indexKey]] = $subArray;
                } elseif (array_key_exists($columnKey, $subArray)) {
                    $result[$subArray[$indexKey]] = $subArray[$columnKey];
                }
            }
        }
        return $result;
    }
}


function upload($file,$dir,$file_name='',$file_size=20480000,$ext=array('jpg','png','gif','ico')) {
    $name = $_FILES[$file]['name'];                 
    $size = $_FILES[$file]['size'];               
    $type = $_FILES[$file]['type'];  
	$tmp  = $_FILES[$file]['tmp_name'];    
	if (!empty($_FILES[$file]['error'])) {
		switch($_FILES[$file]['error']){
			case '1':$error = '超过php.ini允许的大小';break;
			case '2':$error = '超过表单允许的大小';break;
			case '3':$error = '图片只有部分被上传';break;
			case '4':$error = '请选择图片';break;
			case '6':$error = '找不到临时目录';break;
			case '7':$error = '写文件到硬盘出错';break;
			case '8':$error = 'File upload stopped by extension';break;
			case '999':
			default:$error = '未知错误。';
		}
		alert($error);
	}
	if (!is_dir($dir)) dir_add($dir);  
	if (!is_writable($dir)) return false;   	                                             
    $file_ext = strtolower(trim(substr(strrchr($name,'.'),1)));   
	if (!$file_name) $file_name = date('YmdHis').rand(1000,9999);                           
    $file_name = $file_name.'.'.$file_ext;                  
    $path = $dir.$file_name;                                 
    if (!in_array($file_ext,$ext)) return false;         
    if ($size>$file_size) return false;                             							
    if (!move_uploaded_file($tmp,$path)) {
	    return false;
	} else {
	    $info = array(
		    "old_name"=>$name, 
			"new_name"=>$file_name,   
			"path"=>$path,           
			"size"=>$size,  
			"ext"=>$file_ext,        
			"type"=>$type   
		);
	    return $info;
	} 
}


 
 
