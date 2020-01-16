import DefaultOptions from '../config/DefaultOptions'
import extend from 'object-extend'
import '../extensions/Array'

function isInt(n) {
	return Number(n) === n && n % 1 === 0
}

function isFloat(n) {
	return Number(n) === n && n % 1 !== 0
}

export default class Trigger {
	/**
	 * Creates a new Trigger from the given element and options
	 *
	 * @param {Element|HTMLElement} element
	 * @param {DefaultOptions.trigger} [options=DefaultOptions.trigger] options
	 */
	constructor(element, options) {
		this.element = element

		options = extend(new DefaultOptions().trigger, options)

		this.offset = options.offset
		this.toggle = options.toggle
		this.once = options.once
		this.visible = null
		this.active = true
	}

	/**
	 * Checks if the Trigger is in the viewport, calls the callbacks and toggles the classes
	 * @param {HTMLElement|HTMLDocument|Window} parent
	 * @param {string} direction top, bottom, left, right
	 * @returns {boolean} If the element is visible
	 */
	checkVisibility(parent, direction) {
		if (!this.active) {
			return this.visible
		}

		const parentWidth = parent.offsetWidth || parent.innerWidth || 0
		const parentHeight = parent.offsetHeight || parent.innerHeight || 0

		const parentFrame = { w: parentWidth, h: parentHeight }
		const rect = this.getBounds()

		const visible = this._checkVisibility(rect, parentFrame, direction)

		if (visible !== this.visible) {
			this.visible = visible

			const response = this._toggleCallback()

			if (response instanceof Promise) {
					response.then(this._toggleClass.bind(this)).catch(e => {
						console.error('Trigger promise failed')
						console.error(e)
					})
			} else {
					this._toggleClass()
			}

			if (this.visible && this.once) {
				this.active = false
			}
		} else if (visible) {
				if (typeof this.toggle.callback.visible == 'function') {
						return this.toggle.callback.visible.call(this.element, this)
				}
		}

		return visible
	}

	/**
	 * Get the bounds of this element
	 * @return {ClientRect | DOMRect}
	 */
	getBounds() {
  	return this.element.getBoundingClientRect()
	}

	/**
	 * Get the calculated offset to place on the element
	 * @param {ClientRect} rect
	 * @param {string} direction top, bottom, left, right
	 * @returns {{x: number, y: number}}
	 * @private
	 */
	_getElementOffset(rect, direction) {
		let offset = { x: 0, y: 0 }

		if (typeof this.offset.element.x === 'function') {
			offset.x = rect.width * this.offset.element.x(this, rect, direction)
		} else if (isFloat(this.offset.element.x)) {
			offset.x = rect.width * this.offset.element.x
		} else if (isInt(this.offset.element.x)) {
			offset.x = this.offset.element.x
		}

		if (typeof this.offset.element.y === 'function') {
			offset.y = rect.height * this.offset.element.y(this, rect, direction)
		} else if (isFloat(this.offset.element.y)) {
			offset.y = rect.height * this.offset.element.y
		} else if (isInt(this.offset.element.y)) {
			offset.y = this.offset.element.y
		}

		return offset
	}

	/**
	 * Get the calculated offset to place on the viewport
	 * @param {{w: number, h: number}} parent
	 * @param {string} direction top, bottom, left, right
	 * @returns {{x: number, y: number}}
	 * @private
	 */
	_getViewportOffset(parent, direction) {
		let offset = { x: 0, y: 0 }

		if (typeof this.offset.viewport.x === 'function') {
			offset.x = parent.w * this.offset.viewport.x(this, parent, direction)
		} else if (isFloat(this.offset.viewport.x)) {
			offset.x = parent.w * this.offset.viewport.x
		} else if (isInt(this.offset.viewport.x)) {
			offset.x = this.offset.viewport.x
		}

		if (typeof this.offset.viewport.y === 'function') {
			offset.y = parent.h * this.offset.viewport.y(this, parent, direction)
		} else if (isFloat(this.offset.viewport.y)) {
			offset.y = parent.h * this.offset.viewport.y
		} else if (isInt(this.offset.viewport.y)) {
			offset.y = this.offset.viewport.y
		}

		return offset
	}

	/**
	 * Check the visibility of the trigger in the viewport, with offsets applied
	 * @param {ClientRect} rect
	 * @param {{w: number, h: number}} parent
	 * @param {string} direction top, bottom, left, right
	 * @returns {boolean}
	 * @private
	 */
	 _checkVisibility(rect, parent, direction) {
		const elementOffset = this._getElementOffset(rect, direction)
		const viewportOffset = this._getViewportOffset(parent, direction)

		let visible = true

		if ((rect.left - viewportOffset.x) < -(rect.width - elementOffset.x)) {
			visible = false
		}

		if ((rect.left + viewportOffset.x) > (parent.w - elementOffset.x)) {
			visible = false
		}

		if ((rect.top - viewportOffset.y) < -(rect.height - elementOffset.y)) {
			visible = false
		}

		if ((rect.top + viewportOffset.y) > (parent.h - elementOffset.y)) {
			visible = false
		}

		return visible
	}

	/**
	 * Toggles the classes
	 * @private
	 */
	_toggleClass() {
		if (this.visible) {
			if (Array.isArray(this.toggle.class.in)) {
				this.toggle.class.in.each((className) => {
					this.element.classList.add(className)
				})
			} else {
      	this.element.classList.add(this.toggle.class.in)
      }

      if (Array.isArray(this.toggle.class.out)) {
      	this.toggle.class.out.each((className) => {
        	this.element.classList.remove(className)
        })
      } else {
      	this.element.classList.remove(this.toggle.class.out)
      }

      return
		}

		if (Array.isArray(this.toggle.class.in)) {
			this.toggle.class.in.each((className) => {
				this.element.classList.remove(className)
			})
		} else {
			this.element.classList.remove(this.toggle.class.in)
    }

		if (Array.isArray(this.toggle.class.out)) {
			this.toggle.class.out.each((className) => {
				this.element.classList.add(className)
			})
		} else {
    	this.element.classList.add(this.toggle.class.out)
    }
	}

	/**
	 * Toggles the callback
	 * @private
	 * @return null|Promise
	 */
	_toggleCallback() {
		if (this.visible) {
			if (typeof this.toggle.callback.in == 'function') {
				return this.toggle.callback.in.call(this.element, this)
			}
		} else {
			if (typeof this.toggle.callback.out == 'function') {
				return this.toggle.callback.out.call(this.element, this)
			}
		}
	}
}
