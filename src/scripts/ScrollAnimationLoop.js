/**
 * Created by Erik on 09/07/2017.
 */
export default class ScrollAnimationLoop {
	/**
	 * ScrollAnimationLoop constructor.
	 * Starts a requestAnimationFrame loop as long as the user has scrolled the scrollElement. Stops after a certain time.
	 *
	 * @param {Object} [options=Object] options The options for the loop
	 * @param {Window|HTMLDocument|Element} [options.element=Window] options.element The element to detect scroll in,
	 *                                                               defaults to window
	 * @param {number} options.sustain [options.sustain=500] The amount of time to sustain the loop after the scrolling
	 *                                                       has stopped, in ms. Defaults to 500.
	 * @param {Function} loop The loop
	 */
	constructor(options, loop) {
		this.callback = loop
		this.parseOptions(options)

		this.position = this.getPosition()
		this.lastAction = this.getTimestamp()
		this.running = true

		this.loop()

		this.element.addEventListener('scroll', this.didScroll.bind(this))
	}

	/**
	 * Parses the options
	 *
	 * @param {Object} [options=Object] options The options for the loop
	 * @param {Window|HTMLDocument|Element} [options.element=Window] options.element The element to detect scroll in,
	 *                                                               defaults to window
	 * @param {number} options.sustain [options.sustain=500] The amount of time to sustain the loop after the scrolling
	 *                                                       has stopped, in ms. Defaults to 500.
	 */
	parseOptions(options) {
		this.element = window
		this.sustain = 500

		// Checks if a function is given in the options argument, for when no custom options are needed
		if (typeof options == 'function') {
			this.callback = options

			return
		}

		if (options.element instanceof Window || options.element instanceof HTMLDocument || options.element instanceof Element) {
			this.element = options.element
		}

		if (options.sustain) {
			this.sustain = options.sustain
		}
	}

	/**
	 * Callback when the user scrolled the element
	 */
	didScroll() {
		const newPosition = this.getPosition()

		if (this.position != newPosition) {
			this.position = newPosition

			this.lastAction = this.getTimestamp()
		}

		if (!this.running) {
			this.running = true
			this.loop()
		}
	}

	/**
	 * The current position of the element
	 *
	 * @returns {{x: number, y: number}}
	 */
	getPosition() {
		const left = !this.element.scrollLeft ? document.documentElement.scrollLeft : this.element.scrollLeft
		const top = !this.element.scrollTop ? document.documentElement.scrollTop : this.element.scrollTop

		if (!left || !top) {
			const scrollLeft = document.body.scrollLeft
			const scrollTop = document.body.scrollTop

			return { x: scrollLeft ? scrollLeft : 0, y: scrollTop ? scrollTop : 0 }
		}

		return { x: left, y: top }
	}

	/**
	 * The current timestamp in ms
	 *
	 * @returns {number}
	 */
	getTimestamp() {
		return Number(Date.now())
	}

	/**
	 * One single tick of the animation
	 */
	tick() {
		const now = this.getTimestamp()

		if (now - this.lastAction > this.sustain) {
			this.running = false
		}

		this.callback(this.position)

		if (this.running) {
			this.loop()
		}
	}

	/**
	 * Requests an animation frame
	 */
	loop() {
		const frame = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			function(callback){ setTimeout(callback, 1000 / 60) }

		frame(this.tick.bind(this))
	}

	/**
	 * Kills the loop forever
	 */
	kill() {
		this.running = false
		this.element.removeEventListener('scroll', this.didScroll.bind(this))
	}
}