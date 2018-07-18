// 引入样式
import '@/sass/global'

// common
// import { Constants, Resources, Utils, Services, Valitations } from './common'
import { Constants } from './common'

// class
import { Stage } from '@/class'

// scene
import { InitScene } from '@/scene'


// 整个应用只能存在一个app
export default class app {
	constructor() {
		// 初始化舞台
		this.stage = new Stage('#app', {
			viewport: ['auto' || Constants.width / 2, 'auto' || Constants.height / 2],
			resolution: [Constants.width, Constants.height],
		})
		// 全局引用
		window.stage = this
	}

	start() {
		this.scene = new InitScene('init-scene', {}, this.stage)
	}
}

// const game = new app('#app', {
// 	viewport: [Constants.width, Constants.height],
// 	resolution: [Constants.width, Constants.height],
// })

// export default game
