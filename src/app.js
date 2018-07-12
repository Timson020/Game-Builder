import { Scene } from 'spritejs'

// 引入样式
import './sass/global'

const scene = new Scene('#game', {
	viewport: ['auto', 'auto'],
	resolution: [600, 600],
})

console.info(scene)
