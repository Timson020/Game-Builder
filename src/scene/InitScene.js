import { Label, Group } from 'spritejs'

import { Constants } from '@/common'
import { Layout, Background } from '@/class'

// 第一个界面
export default class InitScene extends Layout {
	constructor(id, options, stage) {
		super(id, options)
		this.stage = stage
		this.labelGroup = null
		this.loadLabel = null

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
		
		this.labelGroup = this.drawLoadingLabel()
		this.appendChild(this.background)
		this.appendChild(this.labelGroup)
		console.info(this.loadLabel.boundingRect)
	}

	drawLoadingLabel()　{
		const container = new Group({
			size: [Constants.width, Constants.height],
			pos: [0, 0],
			anchor: [0, 0],
		})
		const label1 = new Label('正在努力搬砖中...')
		const label2 = new Label('0%')

		label1.attr({
			// 位置
			pos: [Constants.width / 2 - 200 , Constants.height / 2 - 100],
			// 锚点
			anchor: [0, 0],
			// 文字对齐方式
			textAlign: 'center',
			// 描边颜色
			strokeColor: '#f53d3d',
			// 字体方式
			font: 'oblique small-caps bold 50px "微软雅黑"',
		})

		label2.attr({
			// 位置
			pos: [Constants.width / 2 - 80 , Constants.height / 2],
			// 锚点
			anchor: [0, 0],
			// 文字对齐方式
			textAlign: 'center',
			// 描边颜色
			strokeColor: '#f53d3d',
			// 字体方式
			font: 'oblique small-caps bold 50px "微软雅黑"',
		})
		this.loadLabel = label2
		container.append(label1, label2)
		return container
	}
}
