
//显示页码错误信息 add xia 2014-06-09 检查页码错误信息
function NameInspection(ctr) {
    var content = $(ctr).val();
    var errorCtr = $("#e_" + ctr.id);
    var infoCtr = $("#i_" + ctr.id);
    if (content.length == 0) {
        if (errorCtr.length > 0) {
            errorCtr.show();
        }
        if (infoCtr.length > 0) {
            infoCtr.show();
        }

    } else {
        if (errorCtr.length > 0) {
            errorCtr.hide();
        }
        if (infoCtr.length > 0) {
            infoCtr.hide();
        }
    }
}

//手机号码错误信息 add xia 2014-06-09 检查页码错误信息
function TelInspection(ctr) {
    var content = $(ctr).val();
    content = $.trim(content);
    $(ctr).val(content);
    var errorCtr = $("#e_" + ctr.id);
    var infoCtr = $("#i_" + ctr.id);
    var reg = /^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$/;
    if (!reg.test(content)) {
        errorCtr.show();
        return false;
    }
    if (content.length == 0) {
        if (errorCtr.length > 0) {
            errorCtr.show();
        }
        if (infoCtr.length > 0) {
            infoCtr.show();
        }

    } else if (content.length < 11) {
        if (errorCtr.length > 0) {
            errorCtr.show();
        }
        if (infoCtr.length > 0) {
            infoCtr.show();
        }
    } else if (content.length > 11) {
        if (errorCtr.length > 0) {
            errorCtr.show();
        }
        if (infoCtr.length > 0) {
            infoCtr.show();
        }
    } else {
        if (errorCtr.length > 0) {
            errorCtr.hide();
        }
        if (infoCtr.length > 0) {
            infoCtr.hide();
        }
    }
    return true;
}


//页面的数字 add xia 2014-06-09 检查
function numberInspection(ctr) {
    var content = $(ctr).val();
    var min = $(ctr).attr("min");
    var max = $(ctr).attr("max");
    var required = $(ctr).attr("required");
    var errproperty = $(ctr).attr("errproperty");
    var errorCtr = $("#e_" + ctr.id);
    var infoCtr = $("#i_" + ctr.id);
    if (content < min || content > max) {
        
        if (errorCtr.length > 0) {
            errorCtr.html(errproperty+"填写不正确");
            errorCtr.show();
        }
        if (infoCtr.length > 0) {
            infoCtr.show();
        }
        return;
    } else if (checkNullOrEmpty(content) && required=='required') {
        if (errorCtr.length > 0) {
            errorCtr.show();
        }
        if (infoCtr.length > 0) {
            infoCtr.show();
        }

    } else {
        if (errorCtr.length > 0) {
            errorCtr.hide();
        }
        if (infoCtr.length > 0) {
            infoCtr.hide();
        }
    }
}

//检查字符串是否为空 add xia 2014-06-12
function checkNullOrEmpty(str) {
    var result = false;
    if (str == null)
        result = true;
    str = str.replace(/(^\s*)|(\s*$)/g, "");
    if (str.length == 0)
        result = true;
    return result;
}

//特殊字符检查
function checkRegExp(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    if (pattern.test(str)){
        return true;
    }
    return false;
}

//检查是否含有特殊字符
function checkValueHashRxp(ctrlId) {
    var iu, iuu, regArray = new Array("◎", "■", "●", "№", "↑", "→", "↓" +
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "|", "", "[", "]", "？", "~", "`" +
    "!", "<", ">", "‰", "→", "←", "↑", "↓", "¤", "§", "＃", "＆", "＆", "＼", "≡", "≠" +
    "≈", "∈", "∪", "∏", "∑", "∧", "∨", "⊥", "‖", "‖", "∠", "⊙", "≌", "≌", "√", "∝", "∞", "∮" +
    "∫", "≯", "≮", "＞", "≥", "≤", "≠", "±", "＋", "÷", "×", "/" +
    "╄", "╅", "╇", "┻", "┻", "┇", "┭", "┷", "┦", "┣", "┝", "┤", "┷", "┷", "┹", "╉", "╇", "【", "】" +
    "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "┌", "├", "┬", "┼", "┍", "┕", "┗", "┏", "┅", "—" +
    "〖", "〗", "←", "〓", "☆", "§", "□", "‰", "◇", "＾", "＠", "△", "▲", "＃", "℃", "※", ".", "≈", "￠");
    iuu = regArray.length;
    var obj = document.getElementById(ctrlId);
    for (iu = 1; iu <= iuu; iu++) {
        if (regArray[iu] != "") {
            if (obj.value.indexOf(regArray[iu]) != -1) {
                return true;
            }
        }
    }
    return false;
}


function checkRightDate() {
    
    var startdate = $("#Time").val();
    var arr = startdate.split("-");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    var starttimes = starttime.getTime();

    var enddate = '';
    var myDate = new Date();
    var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    enddate += year;   
    var month = (myDate.getMonth() + 1);       //获取当前月份(0-11,0代表1月)
    if (month < 10)
        enddate += '-0' + month;
    else
        enddate += '-' + month;
    var day = myDate.getDate();        //获取当前日(1-31)
    if (day < 10)
        enddate += '-0' + day;
    else
        enddate += '-' + day;

    var arrs = enddate.split("-");
    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
    var lktimes = lktime.getTime();

    if (starttimes > lktimes) {
        return true;
    }
    return false;
}

var GetFileObjectList = [
    { key: 0, name: 'UnKown', text: '其他' },
    { key: 7, name: 'IdCard', text: '身份证复印件' },
    { key: 8, name: 'Notification', text: '客户告知书' },
    { key: 9, name: 'Contracts', text: '签约合同' },
    { key: 10, name: 'Invoices', text: '收据或发票复印件' },
    { key: 11, name: 'Subscription', text: '认购书' },
    { key: 12, name: 'Proof', text: '收据复印件' },
    { key: 13, name: 'Application', text: '退定申请表' },
    { key: 14, name: 'ConfessPage', text: '认筹单' },
    { key: 15, name: 'ConfessQuitProve', text: '退筹单' },
    { key: 16, name: 'DaDingQuitProve', text: '退定证明' },
    { key: 17, name: 'ChangHouseProve', text: '换房申请表' },
    { key: 18, name: 'QuitHouseProve', text: '退房申请表' }

];

//获取文件类型和名称
function GetFileObject(name) {
    try {
        var lenght = GetFileObjectList.length;
        for (var i = 0; i < lenght; i++) {
            var file = GetFileObjectList[i];
            if (file.name == $.trim(name) || file.key ==name)
                return file;
        }
        return GetFileObjectList[0];
    } catch (e) {
        return GetFileObjectList[0];
    }
}

//格式化Json时间
function renderTime(date) {
    if (date == "" || date == null) {
        return false;
    }
    var da = new Date(parseInt(date.replace("/Date(", "").replace(")/", "").split("+")[0]));
    return da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate() + " " + da.getHours() + ":" + da.getSeconds() + ":" + da.getMinutes();
}
//格式化时间
function formatDate(date, format) {
    if (!date) return false;
    if (!format) format = "yyyy-MM-dd";
    switch (typeof date) {
        case "string":
            date = new Date(date.replace(/-/g, "/"));
            break;
        case "number":
            date = new Date(date);
            break;
    }
    if (!date instanceof Date) return false;
    var dict = {
        "yyyy": date.getFullYear(),
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "H": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "MM": ("" + (date.getMonth() + 101)).substr(1),
        "dd": ("" + (date.getDate() + 100)).substr(1),
        "HH": ("" + (date.getHours() + 100)).substr(1),
        "mm": ("" + (date.getMinutes() + 100)).substr(1),
        "ss": ("" + (date.getSeconds() + 100)).substr(1)
    };
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
        return dict[arguments[0]];
    });
}
/** 货币格式化函数 **/
function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}