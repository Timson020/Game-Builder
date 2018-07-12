import { Scene, Sprite } from 'spritejs'

// 引入样式
import './sass/global'

console.info(Scene)
console.info(Sprite)
console.info('spritejs1')

const scene = new Scene('#game', {
	viewport: ['auto', 'auto'],
	resolution: [600, 600],
})

console.info(scene)
