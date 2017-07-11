import ScrollTrigger from './ScrollTrigger'

const scroll = new ScrollTrigger({
	scroll: {
		callback: (position, direction) => {
			const stats = document.querySelector('div.stats')

			stats.innerHTML = 'pos: ' + JSON.stringify(position)
			stats.innerHTML += ' [' + direction + ']'
		}
	}
})

scroll.add("div.block")

const lazyTriggers = scroll.query('[data-lazy]')

lazyTriggers.forEach((trigger) => {
	trigger.toggle.callback.in = loadImage
})

function loadImage(trigger) {
	const url = this.getAttribute('data-lazy')
	const img = document.createElement('img')
	img.src = url

	this.appendChild(img)
	this.removeAttribute('data-lazy')
	
	trigger.toggle.callback.in = null
}