import axios from 'axios'

// import CryptoJS from '@/lib/tripledes'

const headers = { 'content-type': 'application/json', 'yidong-token': 'xxx' }

// const keyHex = CryptoJS.enc.Utf8.parse('3DES加密密匙')

const iv = '12101754'

const utils = {
	// 获取query
	getQueryString: function (name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
		var a = window.location.href.split('?')[1]

		var r = /#/ig.test(window.location.href) ? ('?' + a).substr(1).match(reg) : window.location.search.substr(1).match(reg)
		if (r != null) return unescape(r[2])
		return null
	},

	// ajax: function (obj) {
	// 	axios({
	// 		headers,
	// 		method: obj.type,
	// 		url: obj.url,
	// 		data: obj.data,
	// 		responseType: 'json',
	// 		responseEncoding: 'utf8',
	// 	})
	// },

	// // 加密方法
	// encrypt: function (msg) {
	// 	return CryptoJS.TripleDES.encrypt(msg, keyHex, {
	// 		iv: CryptoJS.enc.Utf8.parse(iv),
	// 		mode: CryptoJS.mode.CBC,
	// 		padding: CryptoJS.pad.Pkcs7,
	// 	}).toString()
	// },

	// // 解密方法
	// decrypt: function (msg) {
	// 	var a = CryptoJS.TripleDES.decrypt(msg, keyHex, {
	// 		iv: CryptoJS.enc.Utf8.parse(iv),
	// 		mode: CryptoJS.mode.CBC,
	// 		padding: CryptoJS.pad.Pkcs7,
	// 	})
	// 	var b = CryptoJS.enc.Utf8.stringify(a).toString()
	// 	var c
	// 	try {
	// 		c = JSON.parse(b)
	// 	} catch (e) {
	// 		c = b
	// 	}
	// 	return c
	// },
}

export default utils
