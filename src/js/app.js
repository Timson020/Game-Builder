~ function () {
	// dev
	var host = '/'
	// release
	// var host = '/'

	// dev
	var port = ''
	// release
	// var port = ''

	var infix = '/'

	var wAlert = window.alert
	// var mobile = ''

	// 请求
	function ajax(obj) {
		var headers = { 'content-type': 'application/json', 'yidong-token': 'xxx' }
		window.request = ajax({ baseUrl: host + port + infix, headers: headers })

		window.request[obj.method](obj.url, obj.data).then(function (response, xhr) {
			obj.success(response, xhr)
		}).catch(function (response, xhr) {
			if (!obj.error) return
			obj.error(response, xhr)
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
