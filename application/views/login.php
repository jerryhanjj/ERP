<?php if(!defined('BASEPATH')) exit('No direct script access allowed');?>
<!DOCTYPE html>
<html>
    <head>
        <title>进销存</title>
        <meta name="globalsign-domain-verification" content="wnLJy1jTEsQbKd3ZepUI9lK4R1lnQif9O4mKSlu1rX" />
        <meta name="viewport" content='width=device-width,initial-scale=0.4; maximum-scale=3.0;minimum-scale:0.5;user-scalable=yes;'  />
        <link href="<?php echo base_url()?>statics/login/Css/common.css" rel="stylesheet" />
        <link href="<?php echo base_url()?>statics/login/Css/global.css" rel="stylesheet" />
        <link rel="shortcut icon" href="<?php echo base_url()?>statics/login/Images/bitbug_favicon.ico" type="image/x-icon"/>
        <link rel="apple-touch-icon" href="<?php echo base_url()?>statics/login/Images/WebIcon/apple-touch-icon-57.png" />
        <link rel="apple-touch-icon" sizes="72x72"  href="<?php echo base_url()?>statics/login/Images/WebIcon/apple-touch-icon-72.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="<?php echo base_url()?>statics/login/Images/WebIcon/apple-touch-icon-114.png"  />
        <link rel="apple-touch-icon" sizes="144x144" href="<?php echo base_url()?>statics/login/Images/WebIcon/apple-touch-icon-144.png"  />
        <script src="<?php echo base_url()?>statics/login/Scripts/minijs/jquery-1.7.1.js"></script>
        <script src="<?php echo base_url()?>statics/login/Scripts/minijs/common.js"></script>
        <script src="<?php echo base_url()?>statics/login/Scripts/minijs/minicheck.js"></script>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head>    
<body id="body">
    <div class="connext">
    <form action="" onSubmit="return Login()">
        <div class="LoginBox">
            <div class="LoginLog"></div>
            <div class="Loginc">
                <div class="loginInputc">
                    <input type="text" class="logininput" value="<?php echo get_cookie('username')?>" id="username" placeholder="输入域账号" />
                </div>
                <div class="loginInputc">
                    <input type="password" class="logininput" id="password" value="<?php echo get_cookie('userpwd')?>" placeholder="输入域密码" />
                </div>
            </div>
            <div style="color:red; font-size:20px; margin-top:12px; line-height:20px; display:none;" id="loginerror"></div>
            <div class="checkMMBox">
                <span class="checkbox<?php echo get_cookie('ispwd')==1?'true':'false'?>" id="Checked" onClick="ChechBoxAction(this)" val="<?php echo get_cookie('ispwd')?>">记住账号</span>
            </div>
        
            <div class="LoginBtn"><input type="button" class="loginBtn" id="btnLogin" onClick="Login()" /></div>
        </div>
    </form>
</div>
<!--需要loading 的页面就在页面最下方加-->
<div class="loading">
	<img src="<?php echo base_url()?>statics/login/Images/loading.gif" style="position:absolute;top:50%;left:50%;margin:-82px 0 0 -135px;" alt="请稍后...">
</div>
<script type="text/javascript">
    //加载公用的js最后面
    $(window).load(function(){
        $('.loading').hide();
    });
    
    function Login() {
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;
        if (!cookieEnabled) {
            alert("该浏览器Cookie设置不正确，无法正常登录");
            return false;
        }
        var username = $.trim($("#username").val());
        var password = $.trim($("#password").val());
        var isRemmenbPassWord = $("#Checked").attr("val"); // 1为记住密码  0 未记住密码
        if (checkNullOrEmpty(username)) {
            $("#loginerror").text("请输入账号").show();
            $("#username").focus();
            return false;
        }
        if (checkNullOrEmpty(password)) {
            $("#loginerror").text("请输入密码").show();
            $("#password").focus();
            return false;
        }
        $('.loading').show();
        $.ajax({
            type: "POST",
            url: "<?php echo site_url('login');?>",
            data: {
                username: username,
                userpwd: password,
				token: "<?php echo token()?>",
                ispwd:isRemmenbPassWord
            },
            //dataType: "json",
            success: function (data) {
                //if (!data) {
//                    $("#loginerror").text("有未知错误发生").show();
//                    $('.loading').hide();
//                    return false;
//                }
//                if (!data.Success) {
//                    $("#loginerror").text(data.ResultMessage).show();
//                    $("#username").val('');
//                    $("#password").val('');
//                    $("#username").focus();
//                    $('.loading').hide();
//                    return false;
//                }
				if (data==1) {
				    $('.loading').hide();
					location.href = "<?php echo site_url('home/index')?>";
				} else {
				    $("#loginerror").text(data).show();	
					$('.loading').hide();
					setTimeout("location.href='<?php echo site_url('login')?>'",1500);
				}
				
                //$('.loading').hide();
                //location.href = "<?php echo site_url('home/index')?>";
                return false;
            },
            timeout: 60000,
            error: function (xhr, status) {
                if (status == "timeout") {
                    $("#loginerror").text("您的网络好像很糟糕，请刷新页面重试").show();
                    $('.loading').hide();
                    return false;
                }
                else {
                    $("#loginerror").text("服务器内部错误，请重试").show();
                    $('.loading').hide();
                    return false;
                }
            }
        });
        return false;
    }
    $(function () {
        document.onkeydown = function(e) {
            var ev = document.all ? window.event : e;
            if (ev.keyCode == 13) {
                $("#btnLogin").trigger("click");
            }
        };
    });
</script>
     
</body>
</html>
