<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Lib_code {

    public function __construct(){	
	    $this->border = 0;
		$this->how = 4;
		$this->w = 50;
		$this->h = 20;
		$this->size = 20;
		$this->name = 'code';
		$this->ci = &get_instance();
	}
	
	public function image(){
		$code = '';
		for ($i=0; $i<$this->how; $i++) {
			$code .= chr(mt_rand(65, 90));
		}
		$code = strtolower($code);
		$this->ci->session->set_userdata(array($this->name=>$code));
		$len = strlen($code);
		$im = imagecreate($this->w, $this->h);
		imagecolorallocate($im, 255, 255, 255);
		$lineColor1 = imagecolorallocate($im,240,220,180);
		$lineColor2 = imagecolorallocate($im,250,250,170);
		
		for ($j=3; $j<=$this->h; $j=$j+3) {
			imageline($im, 2, $j, $this->w, $j, $lineColor1);
		}
		for($j=2;$j<$this->w; $j= $j+(mt_rand(3,6))){
			imageline($im,$j,2,$j-6,18,$lineColor2);
		}
		$bordercolor = imagecolorallocate($im, 0x99, 0x99, 0x99);
		imagerectangle($im, 0, 0, $this->w-1, $this->h-1, $bordercolor);
		$fontColor = imagecolorallocate($im, 48, 61, 50);
		for ($i=0; $i<$len; $i++) {
			$bc = mt_rand(0, 3);
			$code[$i] = strtolower($code[$i]);
			imagestring($im, $this->size, $i*11+$this->w/4-$this->w/10, mt_rand($this->h/2-10,$this->h/2-5), $code[$i], $fontColor);
		}
		header("Cache-Control:max-age=1,s-maxage=1,no-cache, must-revalidate");
		header("Content-type:image/png;");
		imagepng($im);
		imagedestroy($im);
		exit();
	}

}