<?php $this->load->view('header');?>
 

<script type="text/javascript">
var DOMAIN = document.domain;
var WDURL = "";
var SCHEME= "<?php echo sys_skin()?>";
try{
	document.domain = '<?php echo base_url()?>';
}catch(e){
}
//ctrl+F5 增加版本号来清空iframe的缓存的
$(document).keydown(function(event) {
	/* Act on the event */
	if(event.keyCode === 116 && event.ctrlKey){
		var defaultPage = Public.getDefaultPage();
		var href = defaultPage.location.href.split('?')[0] + '?';
		var params = Public.urlParam();
		params['version'] = Date.parse((new Date()));
		for(i in params){
			if(i && typeof i != 'function'){
				href += i + '=' + params[i] + '&';
			}
		}
		defaultPage.location.href = href;
		event.preventDefault();
	}
});
</script>

<link rel="stylesheet" href="<?php echo base_url()?>statics/js/common/plugins/validator/jquery.validator.css">
<script type="text/javascript" src="<?php echo base_url()?>statics/js/common/plugins/validator/jquery.validator.js"></script>
<script type="text/javascript" src="<?php echo base_url()?>statics/js/common/plugins/validator/local/zh_CN.js"></script>
<style>
body{background: #fff;}
.ui-combo-wrap{position:static;}
.mod-form-rows .label-wrap{font-size:12px;}
.manage-wrap .ui-input{width: 198px;}
.base-form{*zoom: 1;margin:0 -10px;}
.base-form:after{content: '.';display: block;clear: both;height: 0;overflow: hidden;}
.base-form .row-item{float: left;width: 290px;height: 31px;margin: 0 10px;overflow: visible;padding-bottom:15px;}
.manage-wrapper{margin:0 auto;width:722px;padding: 20px;}
.manage-wrap textarea.ui-input{width: 100%;height: 80px;*vertical-align:auto;overflow: hidden;box-sizing: border-box;}
#manage-form{overflow: hidden;}
.contacters{margin-bottom: 10px;}
.contacters h3{margin-bottom: 10px;font-weight: normal;}
.ui-jqgrid-bdiv .ui-state-highlight { background: none; }
.operating .ui-icon{ margin:0; }
.ui-icon-plus { background-position:-80px 0; }
.ui-icon-trash { background-position:-64px 0; }
.mod-form-rows .ctn-wrap{overflow: visible;;}
.mod-form-rows .pb0{margin-bottom:0;}
.jdInfo{display:none;margin-top: 5px;}
.jdInfo h3{position: absolute;left: 50%;margin-left: -62px;top: -11px;background-color: #fff;padding: 0 10px;color: #ccc;}
.jdInfo a{cursor: help;border-bottom:dotted #555 1px;}
.hasJDStorage .jdInfo{display:block;position:relative;z-index:1;padding-top: 15px;margin: 10px 0;border-top: solid 1px #ccc;}
.hasJDStorage .manage-wrapper{width: 970px;}
/*.hasJDStorage .manage-wrap textarea.ui-input{height: 34px;width:958px;}*/
.base-form .row-item{width: 227px;padding-bottom:9px;}
.manage-wrap .ui-input{width: 135px;}
.ui-tab{border-left:none;border-bottom: 1px solid #EBEBEB; position: absolute;   background-color: #fff;  top: 0;  left: 0;  width: 100%;}
.ui-tab li {border-top:none;border-bottom:none;border-color:#EBEBEB;}
.prop-wrap{line-height: 26px;margin-bottom: 20px;}
.prop-wrap.on{background: #f4f4f4;}
.qur-wrap{line-height: 42px;margin-bottom: 20px;}
.qur-wrap.on{background: #f4f4f4;}
.prop-wrap input{vertical-align: middle;margin-right: 3px;}
.prop-wrap label {margin-right: 8px;}
.prop-wrap .content{padding: 5px 0 12px 15px;height: 35px;overflow-y: auto;}
#createSku{color:#948D8D; font-size: 20px;border: dotted 2px #948D8D;padding: 0 15px;cursor: pointer;line-height: 15px;display: inline-block;vertical-align: middle;}
#createSku:hover{color:#1680F3;border-color:#1680F3;}
.serField{padding: 10px 0;}
#isSerNum{vertical-align: middle;margin-left: 17px;}
#isWarranty{vertical-align: middle;margin-left: 17px;}
.isWarrantyData{float: left; margin-left: 17px;}
.fl{float: left;}
.cle{clear: both;}
</style>
</head>
<body>
<div class="hd cf">
	<ul class="ui-tab" id="tab">
		<li class="cur">基础资料</li>
        <li>高级</li>
        <li>期初设置</li>
	</ul>
</div>
<div id="tabContent">
    <div style='width:100%;height:29px;'></div>
    <div class="manage-wrapper">
        <div id="manage-wrap" class="manage-wrap">
            <form id="manage-form" action="">
                <ul class="mod-form-rows base-form cf" id="base-form">
                    <li class="row-item">
                        <div class="label-wrap"><label for="number">商品编号</label></div>
                        <div class="ctn-wrap"><input type="text" value="" class="ui-input" name="number" id="number"></div>
                    </li>
                    <li class="row-item">
                        <div class="label-wrap"><label for="name">商品名称</label></div>
                        <div class="ctn-wrap"><input type="text" value="" class="ui-input" name="name" id="name"></div>
                    </li>
                    <li class="row-item">
                        <div class="label-wrap"><label for="barCode">商品条码</label></div>
                        <div class="ctn-wrap"><input type="text" value="" class="ui-input" name="barCode" id="barCode"></div>
                    </li>
                    <li class="row-item">
                        <div class="label-wrap"><label for="specs">规格型号</label></div>
                        <div class="ctn-wrap"><input type="text" value="" class="ui-input" name="specs" id="specs" /></div>
                    </li>
                    <li class="row-item">
                        <div class="label-wrap"><label for="category">商品类别</label></div>
                        <div class="ctn-wrap"><span id="category"></span></div>
                    </li>
                    <li class="row-item">
                        <div class="label-wrap"><label for="storage">首选仓库</label></div>
                        <div class="ctn-wrap"><span id="storage"></span></div>
                    </li>
                    <li class="row-item">
                        <div class="label-wrap"><label for="minInventory">最低库存</label></div>
                        <div class="ctn-wrap"><input type="text" class="ui-input" name="minInventory" id="minInventory"></div>
                    </li>
                    <li class="row-item">
                        <div class="label-wrap"><label for="maxInventory">最高库存</label></div>
                        <div class="ctn-wrap"><input type="text" class="ui-input" name="maxInventory" id="maxInventory"></div>
                    </li>  
                    <li class="row-item row-category">
                        <div class="label-wrap"><label for="unit">计量单位</label></div>
                        <div class="ctn-wrap"><span id="unit"></span></div>
                    </li>
                    <li class="row-item">
                        <div class="label-wrap"><label for="purchasePrice">预计采购价</label></div>
                        <div class="ctn-wrap"><input type="text" value="" class="ui-input money" name="purchasePrice" id="purchasePrice" /></div>
                    </li>   
                    <li class="row-item">
                        <div class="label-wrap"><label for="salePrice">零售价</label></div>
                        <div class="ctn-wrap"><input type="text" value="" class="ui-input money" name="salePrice" id="salePrice"></div>
                    </li>
                    <li class="row-item"></li>
                    <li class="row-item">
                        <div class="label-wrap"><label for="wholesalePrice">批发价</label></div>
                        <div class="ctn-wrap"><input type="text" value="" class="ui-input money" name="wholesalePrice" id="wholesalePrice"></div>
                    </li>
                    <li class="row-item">
                        <div class="label-wrap"><label for="vipPrice">VIP会员价</label></div>
                        <div class="ctn-wrap"><input type="text" value="" class="ui-input money" name="vipPrice" id="vipPrice"></div>
                    </li>
                    <li class="row-item">
                        <div class="label-wrap"><label for="discountRate1">折扣率一(%)</label></div>
                        <div class="ctn-wrap"><input type="text" value="" class="ui-input rate" name="discountRate1" id="discountRate1"></div>
                    </li>
                    <li class="row-item">
                        <div class="label-wrap"><label for="discountRate2">折扣率二(%)</label></div>
                        <div class="ctn-wrap"><input type="text" value="" class="ui-input rate" name="discountRate2" id="discountRate2"></div>
                    </li>
                    <li class="row-item dn">
                        <div class="label-wrap"><label for="guarantDate">保质期天数</label></div>
                        <div class="ctn-wrap"><input type="text" value="" class="ui-input rate" name="guarantDate" id="guarantDate"></div>
                    </li>
                    <li class="row-item dn">
                        <div class="label-wrap"><label for="warnDate">报警天数</label></div>
                        <div class="ctn-wrap"><input type="text" value="" class="ui-input rate" name="warnDate" id="warnDate"></div>
                    </li>
                </ul>
                <div id="jdInfo" class="jdInfo cf dn">
                    <h3>维护京东仓储信息</h3>
                    <ul class="mod-form-rows base-form cf">
                        <li class="row-item">
                            <div class="label-wrap"><label for="jianxing">商品件型</label></div>
                            <div class="ctn-wrap"><span id="jianxing"></span></div>
                        </li>   
                        <li class="row-item">
                            <div class="label-wrap"><label for="length">长(mm)</label></div>
                            <div class="ctn-wrap"><input type="text" value="" class="ui-input" name="length" id="length"></div>
                        </li> 
                        <li class="row-item">
                            <div class="label-wrap"><label for="width">宽(mm)</label></div>
                            <div class="ctn-wrap"><input type="text" value="" class="ui-input" name="width" id="width"></div>
                        </li> 
                        <li class="row-item">
                            <div class="label-wrap"><label for="height">高(mm)</label></div>
                            <div class="ctn-wrap"><input type="text" value="" class="ui-input" name="height" id="height"></div>
                        </li> 
                        <li class="row-item">
                            <div class="label-wrap"><label for="weight">重量(kg)</label></div>
                            <div class="ctn-wrap"><input type="text" value="" class="ui-input" name="weight" id="weight"></div>
                        </li>               
                    </ul>
                </div>
                
                <ul class="mod-form-rows">
                    <li class="row-item pb0">
                        <div class="ctn-wrap" style="line-height: normal;"><textarea name="" id="note" class="ui-input ui-input-ph">添加备注信息</textarea></div>
                    </li>
                </ul>
                
            </form>
        </div>
        
        <div id="initCombo" class="dn">
          <input type="text" class="textbox storageAuto" name="storage" autocomplete="off"> 
          <input type="text" class="textbox dateAuto" name="date" autocomplete="off">
       </div>
    </div>
    <div class="manage-wrapper dn">
        <div id="manage-wrap" class="manage-wrap">
           <div class="row-item prop-wrap on dn">
                <span class="check-wrap adjust-item">
                    <!-- <input type="checkbox" name="isItem" id="isItem"> -->
                    <label for="isItem">辅助属性分类</label>
                </span>
                <div class="content" id="itemList">
                </div>
            </div>

            <div class="row-item qur-wrap on dn">
                    <label for="isWarranty">启用批次保质期管理</label>
                    <input type="checkbox" id="isWarranty"/>
                <span class = "isWarrantyIn dn">
                        <label for="safeDays">保质期天数</label>
                        <input type="text" value="" class="ui-input rate" name="safeDays" id="safeDays">
                        <label for="advanceDay">报警天数</label>
                        <input type="text" value="" class="ui-input rate" name="advanceDay" id="advanceDay">
               </span>
                    
            </div>

            <div class="row-item serField dn">
                <label for="isSerNum">启用序列号</label>
                <input type="checkbox" id="isSerNum"/>
            </div>
        </div>
    </div>
    <div class="manage-wrapper dn">
        <div id="manage-wrap" class="manage-wrap">
            <div class="contacters">
                    
                    <div class="grid-wrap">
                      <table id="grid">
                      </table>
                      <div id="page"></div>
                    </div>
                </div>
        </div>
    </div>
</div>
<script src="<?php echo base_url()?>statics/js/dist/goodsManage.js?ver=20150522"></script>

</body>
</html>

 