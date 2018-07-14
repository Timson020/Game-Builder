import { Scene, Sprite } from 'spritejs'

// 引入样式
import '@/sass/global'

// common
import { Constants, Resources, Utils, Services, Valitations } from './common'

// class
// import { Preload } from '@/class'
// console.info(Valitations)

// 初始化舞台
// const scene = new Scene('#app', {
// 	viewport: ['auto', 'auto'],
// 	resolution: [Constants.width, Constants.height],
// })

// const layout = scene.layer('first-scene')

// const box1 = new Sprite({
// 	size: [Constants.width/2, Constants.height/2],
// 	pos: [0, 0],
// 	border: [2, '#f77'],
// })

// layout.appendChild(box1)

// // console.info(Preload)
// console.info(Constants)
// console.info(scene)

// export default scene

class app extends Scene {
	constructor(props) {
		super(props)
		this.stage = null
	}

	async start(scene) {
		this.stage = this.layer('main-container')
		const res = await this.preload(Resources)
		// console.info(this)
		// console.info(this.stage)
		// console.info(scene)
		console.info(res)
		// this.stage.add
	}
}

const game = new app('#app', {
	viewport: [Constants.width, Constants.height],
	resolution: [Constants.width, Constants.height],
})

export default game
