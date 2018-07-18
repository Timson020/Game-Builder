import { Sprite, Label, Group } from 'spritejs'

import { Constants, Resources } from '@/common'
import { Layout, Background, Button } from '@/class'

const groupOpt = {
	size: [Constants.width, Constants.height],
	pos: [0, 0],
	anchor: [0, 0],
}

// 第一个界面
export default class InitScene extends Layout {
	constructor(id, options, stage) {
		super(id, options)
		stage.on('preload', this.onLoad.bind(this))
		this.zIndex = 1
		this.bgType = 0
		this.stage = stage
		this.bgGroup = new Group(groupOpt)
		this.labelGroup = null
		this.loadLabel = null
		this.animation = null
		this.toggleCompleted = true
		this.start()
	}

	async start() {
		this.addTo(this)
		this.drawScene()
		this.imgRes = await this.stage.preload(...Resources.first)
		this.drawButton()
		// console.info(this.imgRes)	
	}

	drawScene() {
		this.colorBg = new Background({
			size: [Constants.width, Constants.height],
			pos: [0, 0],
			border: [0, '#7c7'],
			// bgcolor: 'hsl(180, 50%, 50%)',
			gradients: {
				bgcolor: {
					vector: [0, 0, Constants.width, Constants.height],
					colors: [
						{ offset: 0, color: '#f94444' },
						{ offset: 0.5, color: '#3be8ff' },
						{ offset: 1, color: '#f83bff' },
					],
				},
			},
			borderRadius: 0,
		})

		this.bgGroup.appendChild(this.colorBg)
		this.labelGroup = this.drawLoadingLabel()
		this.appendChild(this.bgGroup)
		this.appendChild(this.labelGroup)
	}

	drawLoadingLabel() {
		const container = new Group(groupOpt)
		const label1 = new Label('正在努力搬砖中...')
		const label2 = new Label('0%')

		label1.attr({
			// 位置
			pos: [Constants.width / 2 , Constants.height / 2 - 100],
			// 锚点
			anchor: [0.5, 0.5],
			// 文字对齐方式
			textAlign: 'center',
			// 描边颜色
			// strokeColor: '#f53d3d',
			// 字体方式
			font: '50px "微软雅黑"',
		})

		label2.attr({
			// 位置
			pos: [Constants.width / 2, Constants.height / 2],
			// 锚点
			anchor: [0.5, 0.5],
			// 文字对齐方式
			textAlign: 'center',
			// 描边颜色
			// strokeColor: 'blue',
			// 字体方式
			font: 'oblique small-caps bold 50px "微软雅黑"',
			// 字体颜色
			// color: 'red',
			lineWidth: 10,
			// 渐变色
			gradients: {
				fillColor: {
					vector: [0, 0, 150, 150],
					colors: [
						{ offset: 0, color: 'red' },
						{ offset: 0.5, color: 'yellow' },
						{ offset: 1, color: 'green' },
					],
				},
			},
		})
		this.loadLabel = label2
		container.append(label1, label2)
		return container
	}

	async drawButton() {
		this.startBtn = new Button('点击切换背景')
		this.startBtn.on('click', this.startBtnClick.bind(this))
		await this.appendChild(this.startBtn.getEl())
		this.startBtn.attr({ pos: [Constants.width / 2, Constants.height / 2 + 100] })
	}

	startBtnClick() {
		if (!this.toggleCompleted) return
		this.toggleCompleted = false
		if (!this.imgBg) {
			this.imgBg = new Sprite('background', { size: [Constants.width, Constants.height], pos: [0, 0], anchor: [0, 0] })
			this.bgGroup.appendChild(this.imgBg)
			this.imgBg.on('update', () => { if (this.animation.progress === 1) this.toggleCompleted = true })
		}
		this.toggleBg()
	}

	toggleBg() {
		this.animation = this.imgBg.animate([{ opacity: this.bgType ? 1 : 0 }], { duration: 1000, fill: 'forwards' })
		this.bgType = this.bgType ? 0 : 1
	}

	onLoad(e) {
		const pre = (e.loaded.length / e.resources.length) * 100
		this.loadLabel.attr({ text: `${pre}%` })
	}

	destroy() {
		this.stage.off('preload', this.onLoad.bind(this))
	}
}
