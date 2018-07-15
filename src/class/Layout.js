import { Layer } from 'spritejs'

export default class Layout extends Layer {
	constructor(id, options, stage) {
		super(id, options)
		this.stage = stage
	}

	addTo(layout) {
		this.stage.appendLayer(layout)
	}
}
