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

	var isCanAjax = true

	var mobile = getQueryString('mobile')

	var wAlert = window.alert

	var CryptoJS = window._c
	var keyHex = CryptoJS.enc.Utf8.parse('3DES加密密匙')
	var iv = '12101754'

	var headers = { 'content-type': 'application/json', 'yidong-token': 'xxx' }

	window.request = ajax({ baseUrl: host + port + infix, headers: headers })

	// 请求
	function ajax(obj) {
		if (!isCanAjax) return
		isCanAjax = false
		obj.data = { value: encrypt(obj.data) }
		window.request[obj.method](obj.url, obj.data).then(function (response, xhr) {
			var a = decrypt(response.value)
			isCanAjax = true
			obj.success(a, xhr)
		}).catch(function (response, xhr) {
			isCanAjax = true
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

	// 加密方法
	function encrypt(msg) {
		return CryptoJS.TripleDES.encrypt(msg, keyHex, {
			iv: CryptoJS.enc.Utf8.parse(iv),
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		}).toString()
	}

	// 解密方法
	function decrypt(msg) {
		var a = CryptoJS.TripleDES.decrypt(msg, keyHex, {
			iv: CryptoJS.enc.Utf8.parse(iv),
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		})
		var b = CryptoJS.enc.Utf8.stringify(a).toString()
		var c
		try {
			c = JSON.parse(b)
		} catch (e) {
			c = b
		}
		return c
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
