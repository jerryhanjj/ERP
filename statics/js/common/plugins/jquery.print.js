define(function(require){
	var $ = require("jquery");
	require("../../../../statics/css/print.css");
/**
 * @name   打印
 * @author Jony
 * TODO
    table宽度自适应
 */

    var document = window.document;

    /**
     * 打印页面的一个区域
     *
     * @param {Object} opt 选项
     * @example 
        $('#content').printArea();
     */
    $.fn.printArea = function (opt) {
        opt = $.extend({
            preview: false,     // 是否预览
            table: false,       // 是否打印table
            usePageStyle: true  // 是否使用页面中的样式
        }, opt);

        var content,
            iframe,
            win,
            links = document.getElementsByTagName("link"),
            html = '<!doctype html><html><head><meta charset="utf-8"><title></title>';

        // 自动添加样式
        for (var i=0,len=links.length; i<len; i++) {
            if (links[i].rel === 'stylesheet') {
                if ( opt.usePageStyle || links[i].href.indexOf('print.css') !== -1 ) {
                    html += links[i].outerHTML;
                }
            }
        }
        
        //content += '<object classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" width="0" height="0" id="wb" viewastext></object>';
        content = opt.table ? '' : this[0].outerHTML;
        html += '</head><body>' + content + '</body></html>';

        // 构造iframe
        var _self = this , timer , firstCall ,win , $html = $(html);
        iframe = document.createElement("iframe");
        iframe.id = "printProxyIframe";
        iframe.frameBorder = 0;
        iframe.setAttribute("style", 'position:absolute;z-index:100;left:0;top:0;width:100%;height:100%;background:#fff;'+ (opt.preview ? '' : 'visibility:hidden;') );
        iframe.onload = function() {
            // console.log(iframe.contentWindow.document.location);
            // iframe.onload = null;
            win = iframe.contentWindow;
            win.canAccess = true;
        }
        iframe.src = "javascript:void((function(){document.open();document.domain='"+ document.domain + "';document.close()})())";
        document.body.appendChild(iframe);
        var timer = setInterval(function(){  
           if(iframe.contentWindow.canAccess){  
                 clearInterval(timer);  
                 //iframe.contentWindow.document.body.innerHTML = '这是新设置的页面内容';  
                // 重新构造jqgrid渲染的table为单个table
                //win.document.write(html);
                win.onafterprint = function() {
                    win.onafterprint = null;
                    iframe.parentNode.removeChild(iframe);
                };
                if (opt.table) {
                    var $tb = _self.find("table.ui-jqgrid-htable").eq(0).clone().removeAttr("style").attr("class", "ui-table-print");
                    var $data = _self.find("table.ui-jqgrid-btable").eq(0).find("tbody").clone();
                    var $title = _self.find("div.grid-title");
                    var $subtitle = _self.find("div.grid-subtitle");
                    var $summary = _self.find("table.ui-jqgrid-ftable").find("tbody").clone();

                    if ($title.length) {
                        $('<caption/>').prependTo($tb).append($title.clone()).append($subtitle.clone());
                    }
                    $tb.find("th").css("width", "auto");
                    $summary.find("td").css("width", "auto");
                    $data.children().eq(0).remove();
                    $tb.append($data).append($summary);
                    //win.document.body.appendChild($tb[0]);
                    $(win.document.body).append($html).append($tb);
                }

                // 开始打印
                if(timer){
                    clearTimeout(timer);
                }
                timer = setTimeout(function(){
                    win.focus();
                    win.print();
                },100);
               
                if (!opt.preview) {
                    // 自销毁
                    setTimeout(function(){
                        iframe.parentNode && iframe.parentNode.removeChild(iframe);
                    }, 1000);
                }
            } 
        }, 100); 

        //openWindow(html);
        return this;
    };


    /**
     * 打印jqgrid渲染的table
     *
     * @param {Object} opt 选项
     * @example 
        $('#content').printTable();
     */
    $.fn.printTable = function (opt) {
        opt = opt || {};
        opt.table = true;
        opt.usePageStyle = false;
        return this.printArea(opt);
    };


    // 新开窗口打印
    function openWindow(html) {
        var win;
        win = window.open("", "_blank", "top=0,left=0,width="+ window.innerWidth +",height="+ window.innerHeight +",toolbar=no,menubar=no");
        win.document.write(html);
        win.document.close();
        win.focus();
        win.print();
        win.onafterprint = function() {
            win.close();
        };
    }
    
});