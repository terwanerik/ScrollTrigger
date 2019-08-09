import ScrollTrigger from './ScrollTrigger'

// Setup ScrollTrigger with default trigger options
const scroll = new ScrollTrigger({
  trigger: {
    once: false,
    offset: {
        viewport: {
            y: 0.5
        }
    }
  },
  scroll: {
      callback: (position, direction) => {
          const stats = document.querySelector('div.stats')

          stats.innerHTML = `x: ${position.x}, y: ${position.y}, direction: ${direction}`
      }
  }
})

// Add all sections to the scroll trigger colllection
scroll.add('section')
      .add('[data-lazy]', { once: true }) // add the lazy loaded image triggers to the collection with custom options

/**
 * Lazy loaded image triggers
 */
const lazyTriggers = scroll.query('[data-lazy]')

lazyTriggers.forEach((trigger) => {
	trigger.toggle.callback.in = function(trigger) {
        return new Promise((resolve, reject) => {
            // the image url is set in the data-lazy attribute
            const url = this.getAttribute('data-lazy')

            if (!url) { return resolve() }

            // create the image element
            const img = document.createElement('img')
            img.src = url

            img.addEventListener('load', _ => {
                // resolve the promise (that triggers the class) after a 200ms timeout
                setTimeout(resolve, 200)
            })

            img.addEventListener('error', _ => {
              reject()
            })

            // add the image element
            this.appendChild(img)
            this.removeAttribute('data-lazy')

            // remove the callback when the image is loaded
            trigger.toggle.callback.in = null
        })
    }
})

/**
 * Counter triggers
 */
const counterTriggers = scroll.query('[data-counter]')

counterTriggers.forEach((trigger) => {
	trigger.toggle.callback.in = function(trigger) {
        // grab the current count
        const count = parseInt(this.getAttribute('data-counter')) + 1

        // update the counter
        this.setAttribute('data-counter', count)
        this.querySelector('.count').innerHTML = count === 1 ? '1 time' : `${count} times`
    }
})

/**
 * Canvas triggers
 */
const canvasTriggers = scroll.query('[data-canvas]')

// Default canvas setup
const canvas = document.querySelector('canvas'),
                ctx = canvas.getContext('2d')

let w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight,
    density = 1,
    i = 0,
    color = '#'+(Math.random()*0xFFFFFF<<0).toString(16)

// Set the draw callback, it's already called by requestAnimationFrame, so no need for that
canvasTriggers.forEach((trigger) => {
	trigger.toggle.callback.visible = function(trigger) {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(w / 2, h / 2, i, 0, 2 * Math.PI)
        ctx.fill()

        i += 20

        const max = Math.max(w, h)

        if (i > max) {
            i = 0
            color = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
        }
    }
})

// simple resize / retina solution
function setup() {
  window.addEventListener('resize', resize)

  density = window.devicePixelRatio != undefined ? window.devicePixelRatio : 1.0

  canvas.width = w * density
  canvas.height = h * density

  ctx.scale(density,density)
}

function resize() {
  w = canvas.width = window.innerWidth
  h = canvas.height = window.innerHeight

  canvas.width = w * density
  canvas.height = h * density

  ctx.scale(density, density)
}

setup()
