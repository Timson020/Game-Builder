import { Label } from 'spritejs'

const defaultOpt = {
	anchor: [0.5, 0.5],
	padding: [6, 10, 6, 10],
	font: '50px "微软雅黑"',
	border: {
		style: [10, 20],
		width: 6,
		color: '#37c',
	},
}

export default class Button {
	constructor(txt, opt = defaultOpt) {
		if (typeof txt != 'string') throw new Error(`argument one is must be typeof string, but typeof ${typeof txt}`)

		if (typeof opt != 'object') throw new Error(`argument two is must be typeof object, but typeof ${typeof txt}`)
		if (opt instanceof Array) throw new Error('argument two is must be typeof object, but typeof array')
		this.init(txt, opt)
	}

	init(txt, opt) {
		this.label = this.drawLabel(txt, opt)
	}

	on(type, handle) {
		this.label.on(type, handle)
	}

	off(type, handle) {
		this.label.off(type, handle)
	}

	getEl() {
		return this.label
	}

	boundingRect() {
		return this.label.boundingRect
	}

	attr(opt) {
		return this.label.attr(opt)
	}

	drawLabel(txt, opt) {
		const label = new Label(txt)
		label.attr(Object.assign(defaultOpt, opt))
		return label
	}
}
