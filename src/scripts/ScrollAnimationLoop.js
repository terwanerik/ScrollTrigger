/**
 * Created by Erik on 09/07/2017.
 */
import extend from 'object-extend'
import '../extensions/Array'

export default class ScrollAnimationLoop {
	/**
	 * ScrollAnimationLoop constructor.
	 * Starts a requestAnimationFrame loop as long as the user has scrolled the scrollElement. Stops after a certain time.
	 *
	 * @param {Object} [options=Object] options The options for the loop
	 * @param {Window|HTMLDocument|HTMLElement} [options.element=Window] options.element The element to detect scroll in,
	 *                                                                                   defaults to window
	 * @param {number} options.sustain [options.sustain=300] The amount of time to sustain the loop after the scrolling
	 *                                                       has stopped, in ms. Defaults to 300.
	 * @param {Function} options.callback [options.callback=null] The callback for every loop
	 * @param {Function} options.start [options.start=null] The start callback, when the animationFrame loop starts
	 * @param {Function} options.stop [options.stop=null] The stop callback, when the animationFrame loop stops
	 * @param {Function} options.directionChange [options.directionChange=null] Callback for when the direction changes
	 * @param {Function} callback [loop=null] The loop callback
	 */
	constructor(options, callback) {
		this._parseOptions(options)

		if (typeof callback == 'function') {
			this.callback = callback
		}

		this.direction = 'none'
		this.position = this.getPosition()
		this.lastAction = this._getTimestamp()

		this._startRun()

		this.element.addEventListener('scroll', this._didScroll.bind(this))
	}

	/**
	 * Parses the options
	 *
	 * @param {Object} [options=Object] options The options for the loop
	 * @param {Window|HTMLDocument|HTMLElement} [options.element=Window] options.element The element to detect scroll in,
	 *                                                                                   defaults to window
	 * @param {number} options.sustain [options.sustain=300] The amount of time to sustain the loop after the scrolling
	 *                                                       has stopped, in ms. Defaults to 300.
	 * @param {Function} options.callback [options.callback=null] The callback for every loop
	 * @param {Function} options.start [options.start=null] The start callback, when the animationFrame loop starts
	 * @param {Function} options.stop [options.stop=null] The stop callback, when the animationFrame loop stops
	 * @param {Function} options.directionChange [options.directionChange=null] Callback for when the direction changes
	 * @private
	 */
	_parseOptions(options) {
		const defaults = {
			sustain: 300,
			element: window,
			callback: typeof options != 'function' ? () => {} : options,
			start: () => {},
			stop: () => {},
			directionChange: () => {}
		}

		options = extend(defaults, options)

		this.element = options.element
		this.sustain = options.sustain
		this.callback = options.callback
		this.startCallback = options.start
		this.stopCallback = options.stop
		this.directionChange = options.directionChange
	}

	/**
	 * Callback when the user scrolled the element
	 * @private
	 */
	_didScroll() {
		const newPosition = this.getPosition()

		if (this.position != newPosition) {
			let newDirection = this.direction

			if (newPosition.x != this.position.x) {
				newDirection = newPosition.x > this.position.x ? 'right' : 'left'
			} else if (newPosition.y != this.position.y) {
				newDirection = newPosition.y > this.position.y ? 'bottom' : 'top'
			} else {
				newDirection = 'none'
			}

			if (newDirection != this.direction) {
				this.direction = newDirection
				this.directionChange(this.direction)
			}

			this.position = newPosition
			this.lastAction = this._getTimestamp()
		}

		if (!this.running) {
			this._startRun()
		}
	}

	/**
	 * Starts the loop, calls the start callback
	 * @private
	 */
	_startRun() {
		this.running = true
		this.startCallback()
		this._loop()
	}

	/**
	 * Stops the loop, calls the stop callback
	 * @private
	 */
	_stopRun() {
		this.running = false
		this.stopCallback()
	}

	/**
	 * The current position of the element
	 * @returns {{x: number, y: number}}
	 */
	getPosition() {
		const left = this.element.pageXOffset || document.documentElement.scrollLeft || this.element.scrollLeft || 0
		const top = this.element.pageYOffset || document.documentElement.scrollTop || this.element.scrollTop || 0

		return { x: left, y: top }
	}

	/**
	 * The current timestamp in ms
	 * @returns {number}
	 * @private
	 */
	_getTimestamp() {
		return Number(Date.now())
	}

	/**
	 * One single tick of the animation
	 * @private
	 */
	_tick() {
		this.callback(this.position, this.direction)

		const now = this._getTimestamp()

		if (now - this.lastAction > this.sustain) {
			this._stopRun()
		}

		if (this.running) {
			this._loop()
		}
	}

	/**
	 * Requests an animation frame
	 * @private
	 */
	_loop() {
		const frame = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			((callback) => { setTimeout(callback, 1000 / 60) })

		frame(this._tick.bind(this))
	}

	/**
	 * Kills the loop forever
	 */
	kill() {
		this.running = false
		this.element.removeEventListener('scroll', this._didScroll.bind(this))
	}
}