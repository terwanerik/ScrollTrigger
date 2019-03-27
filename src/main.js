import ScrollTrigger from './ScrollTrigger'

const scroll = new ScrollTrigger({
  trigger: {
    // once: true
  },
	scroll: {
		callback: (position, direction) => {
			const stats = document.querySelector('div.stats')

			stats.innerHTML = 'pos: ' + JSON.stringify(position)
			stats.innerHTML += ' [' + direction + ']'
		}
	}
})

scroll.add('div.block')

const lazyTriggers = scroll.query('[data-lazy]')

lazyTriggers.forEach((trigger) => {
	trigger.toggle.callback.in = loadImage
})

function loadImage(trigger) {
  return new Promise((resolve, reject) => {
    const url = this.getAttribute('data-lazy')

    if (!url) { return resolve() }

    const img = document.createElement('img')
    img.src = url

    img.addEventListener('load', _ => {
      setTimeout(resolve, 1200)
    })

    img.addEventListener('error', _ => {
      reject()
    })

    this.appendChild(img)
    this.removeAttribute('data-lazy')

    trigger.toggle.callback.in = null
  })
}