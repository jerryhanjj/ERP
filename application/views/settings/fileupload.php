<?php $this->load->view('header');?>

<script type="text/javascript">
var DOMAIN = document.domain;
var WDURL = "";
var SCHEME= "<?php echo sys_skin()?>";
try{
	document.domain = '<?php echo base_url()?>';
}catch(e){
}
</script>

<style>
.container{position:relative;}
#progress{position: absolute;top:0;left:0;width:100%}
.uploading #progress{z-index:1001;}
.content{padding: 10px;width: 730px;
margin: 0 auto;}
.content li{float: left;width: 20%;}
.content li img{padding:2px;width: 97%;cursor: pointer;}
.content .hover img{border:2px solid rgb(0, 235, 255);padding:0;}
.bar {height:30px;background:#5EC29A;}
.img-warp{
height:444px;
overflow-y:auto;
}
.fileinput-button{
overflow: hidden;
position: fixed;
bottom: 0;
background: #BBB;
color: #ffffff;
display: inline-block;
padding: 4px 0;
margin-bottom: 0;
font-size: 14px;
height: 22px;
line-height: 22px;
text-align: center;
vertical-align: middle;
cursor: pointer;
font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
width:100%;
}
.fileinput-button i{display: inline-block;
vertical-align: middle;
margin: 4px;
height: 16px;
width: 16px;
line-height: 14px;
z-index: 999;
position: relative;
}
.fileinput-button p{
position: absolute;
left: 0;
top: 0;
width:100%;
z-index: 999;
font-size: 16px;
line-height:30px;
}
.fileinput-button.uploading p{z-index: 1002;}
.fileinput-button input{cursor: pointer;
direction: ltr;
font-size: 1000px;
margin: 0;
opacity: 0;
filter: alpha(opacity=0);
position: absolute;
right: 0;
top: 0;
height: 30px;
line-height: 30px;
width: auto;
vertical-align: middle;
z-index: 1000;
}
.imgDiv{
position: relative;
}
.imgDiv .imgControl{
display:none;
width: 100%;
}
.imgDiv.hover .imgControl{
display:block;
position: absolute;
top: 0;
}
.imgDiv.hover .imgControl .del{background: rgb(0, 235, 255);
font-size: 14px;
padding: 0 6px;
position: absolute;
top: 2px;
color: #fff;
right: 2px;
cursor: pointer;
}
.icon-plus{
background: url(<?php echo base_url()?>statics/css/img/ui-icons.png) -210px -17px;
}
</style>
</head>
<body>
<div class="container">
	
	<div class="img-warp">
		<ul class="content">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>
	<div class="btn btn-success fileinput-button bar" id="fileinput-button">
		<div id="progress">
	    	<div class="bar" style="width: 100%;"></div>
		</div>
        <p><i class="icon-plus"></i><span>添加图片</span></p>
        <input id="upfile" type="file" name="files[]" multiple>
	</div>
</div>
<script src="<?php echo base_url()?>statics/js/common/plugins/fileupload/js/vendor/jquery.ui.widget.js?ver=20150320"></script>
<script src="<?php echo base_url()?>statics/js/common/plugins/fileupload/js/jquery.iframe-transport.js?ver=20150320"></script>
<script src="<?php echo base_url()?>statics/js/common/plugins/fileupload/js/jquery.fileupload.js?ver=20150320"></script>
<script src="<?php echo base_url()?>statics/js/dist/fileUpload.js?2"></script>
</body>
</html>