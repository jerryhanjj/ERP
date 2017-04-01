function initServices() {
//	for (var a = ["<tr>", '<td class="img"><i width="64" height="64" style="#{imgOutStyle}"></i></td>', "<td>", "<h3>#{name}</h3>", '<p>#{desc}<a href="#{detailsLink}" class="details" target="_blank">详情&gt;&gt;</a></p>', "</td>", '<td class="price">￥ <strong>#{price}</strong> <span>#{unit}</span></td>', '<td class="w80 #{linkType}"><a href="#{buyLink}" class="ui-btn ui-btn-sc" target="_blank" data-product-id="#{productId}">#{btnValue}</a></td>', "</tr>"].join(""), b = [], c = 0; c < addedService.length; c++) {
	for (var a = ["<tr>", '<td class="img"><i width="64" height="64" style="#{imgOutStyle}"></i></td>', "<td>", "<h3>#{name}</h3>", '<p>#{desc}<a href="#" class="details">详情&gt;&gt;</a></p>', "</td>", '<td class="price">￥ <strong></strong> <span>#{unit}</span></td>', '<td class="w80 #{linkType}"><a href="#" class="ui-btn ui-btn-sc" data-product-id="#{productId}">咨询</a></td>', "</tr>"].join(""), b = [], c = 0; c < addedService.length; c++) {
		var d = addedService[c],
			e = a.replace(/\#{([\w\-]+)\}/g, function(a, b) {
				return d[b] || ""
			});
		b.push(e)
	}
	$("#addedService").html(b.join(""))
}!
function() {
	initServices()
}(jQuery);