$(function() {
    $("#registerBtn").click( function () { 
		var url,data;
		url="../noteprinttemp/add";
		data="name="+encodeURIComponent($.trim($('#name').val()));
		data+="&info="+encodeURIComponent($.trim($('#info').val()));
		data+="&isDefault="+encodeURIComponent($.trim($('#isDefault').val()));
		data+="&type="+encodeURIComponent($.trim($('#type').val()));
		$.ajax({
			type: "post",
			cache: !1,
			url: url,
			data: data,
			timeout: 1e4,
			error: function() {},
			success: function(e) {
				if (e=='OK') {
					window.location='../settings/print_templates';
					alert('提交成功');
				}else {
					alert(e);
				}
			}
		})
	});    
})

 