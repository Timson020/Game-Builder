~ function () {
	// dev
	var host = '/'
	// release
	// var host = '/'

	// dev
	var port = ''
	// release
	var port = ''

	var infix = '/'

	var wAlert = window.alert

	// var mobile = ''

	// 请求
	function ajax(obj) {
		window.$.ajax({
			url: obj.url,
			method: obj.method,
			data: obj.data,
			success: function (data) {
				var a = typeof data == 'string' ? JSON.parse(data) : data
				obj.success(a)
			},
			error: function () {
				alert('出现错误')
			},
		})
	}

	// 获取query
	function getQueryString(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
		var a = window.location.href.split('?')[1]

		var r = /#/ig.test(window.location.href) ? ('?' + a).substr(1).match(reg) : window.location.search.substr(1).match(reg)
		if (r != null) return unescape(r[2])
		return null
	}

	window.alert = function (message) {
		try {
			var iframe = document.createElement('IFRAME')
			iframe.style.display = 'none'
			iframe.setAttribute('src', 'data:text/plain,')
			document.documentElement.appendChild(iframe)
			var alertFrame = window.frames[0]
			var iwindow = alertFrame.window
			if (iwindow == undefined) {
				iwindow = alertFrame.contentWindow
			}
			iwindow.alert(message)
			iframe.parentNode.removeChild(iframe)
		} catch (exc) {
			return wAlert(message)
		}
	}
}()
