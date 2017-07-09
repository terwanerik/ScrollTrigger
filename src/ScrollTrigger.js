/**
 * Created by Erik on 09/07/2017.
 */
import Trigger from './scripts/Trigger'
import ScrollAnimationLoop from './scripts/ScrollAnimationLoop'

export default class ScrollTrigger {
	constructor() {
		const count = document.querySelector('div.count')
		var i = 0

		const loop = new ScrollAnimationLoop((position) => {
			i++

			count.innerHTML = i + ', pos: ' + JSON.stringify(position)
		})
	}
}