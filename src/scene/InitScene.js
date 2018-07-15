import { Constants } from '@/common'
import { Layout, Background } from '@/class'

// 第一个界面
export default class InitScene extends Layout {
	constructor(id, options, stage) {
		super(id, options)
		this.stage = stage

		this.start()
	}

	start() {
		this.addTo(this)
		this.drawScene()
	}

	drawScene() {
		this.background = new Background({
			size: [Constants.width, Constants.height],
			pos: [0, 0],
			border: [0, '#7c7'],
			bgcolor: 'hsl(180, 50%, 50%)',
			borderRadius: 0,
		})

		this.appendChild(this.background)
	}
}
