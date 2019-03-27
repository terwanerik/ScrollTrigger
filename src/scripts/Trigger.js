/**
 * Created by Erik on 09/07/2017.
 */
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

		let visible = false

		switch (direction) {
			case 'none':
			case 'bottom':
			case 'right':
				visible = this._checkToBottomVisibility(rect, parentFrame) && this._checkToRightVisibility(rect, parentFrame)

				break
			case 'top':
			case 'left':
				visible = this._checkToTopVisibility(rect, parentFrame) && this._checkToLeftVisibility(rect, parentFrame)

				break
			default:
				break
		}

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
	 * Checks the visibility when the user scrolls to the bottom
	 * @param {ClientRect} rect
	 * @param {{w:(number),h:(number)}} parent
	 * @returns {boolean} If the element is visible
	 * @private
	 */
	_checkToBottomVisibility(rect, parent) {
		let height = rect.bottom - rect.top

		// Set the element offset
		if (typeof this.offset.element.y == 'function') {
			height -= height * this.offset.element.y()
		} else if (isFloat(this.offset.element.y)) {
			height -= height * this.offset.element.y
		} else if (isInt(this.offset.element.y)) {
			height -= this.offset.element.y
		}

		// Set the viewport offset
		let offset = 0

		if (typeof this.offset.viewport.y == 'function') {
			offset = parent.h * this.offset.viewport.y()
		} else if (isFloat(this.offset.viewport.y)) {
			offset = parent.h * this.offset.viewport.y
		} else if (isInt(this.offset.viewport.y)) {
			offset = this.offset.viewport.y
		}

		return (rect.bottom > 0 && rect.bottom < ((parent.h + height) - offset))
	}

	/**
	 * Checks the visibility when the user scrolls to the top
	 * @param {ClientRect} rect
	 * @param {{w:(number),h:(number)}} parent
	 * @returns {boolean} If the element is visible
	 * @private
	 */
	_checkToTopVisibility(rect, parent) {
		let height = rect.bottom - rect.top

		// Set the element offset
		if (typeof this.offset.element.y == 'function') {
			height -= height * this.offset.element.y()
		} else if (isFloat(this.offset.element.y)) {
			height -= height * this.offset.element.y
		} else if (isInt(this.offset.element.y)) {
			height -= this.offset.element.y
		}

		// Set the viewport offset
		let offset = 0

		if (typeof this.offset.viewport.y == 'function') {
			offset = parent.h * this.offset.viewport.y()
		} else if (isFloat(this.offset.viewport.y)) {
			offset = parent.h * this.offset.viewport.y
		} else if (isInt(this.offset.viewport.y)) {
			offset = this.offset.viewport.y
		}

		return (rect.top > -height && rect.top < ((parent.h + height) - offset))
	}


	/**
	 * Checks the visibility when the user scrolls to the right
	 * @param {ClientRect} rect
	 * @param {{w:(number),h:(number)}} parent
	 * @returns {boolean} If the element is visible
	 * @private
	 */
	_checkToRightVisibility(rect, parent) {
		let width = rect.right - rect.left

		// Set the element offset
		if (typeof this.offset.element.x == 'function') {
			width -= width * this.offset.element.x()
		} else if (isFloat(this.offset.element.x)) {
			width -= width * this.offset.element.x
		} else if (isInt(this.offset.element.x)) {
			width -= this.offset.element.x
		}

		// Set the viewport offset
		let offset = 0

		if (typeof this.offset.viewport.x == 'function') {
			offset = parent.w * this.offset.viewport.x()
		} else if (isFloat(this.offset.viewport.x)) {
			offset = parent.w * this.offset.viewport.x
		} else if (isInt(this.offset.viewport.x)) {
			offset = this.offset.viewport.x
		}

		return (rect.right > 0 && rect.right < ((parent.w + width) - offset))
	}

	/**
	 * Checks the visibility when the user scrolls to the left
	 * @param {ClientRect} rect
	 * @param {{w:(number),h:(number)}} parent
	 * @returns {boolean} If the element is visible
	 * @private
	 */
	_checkToLeftVisibility(rect, parent) {
		let width = rect.right - rect.left

		// Set the element offset
		if (typeof this.offset.element.x == 'function') {
			width -= width * this.offset.element.x()
		} else if (isFloat(this.offset.element.x)) {
			width -= width * this.offset.element.x
		} else if (isInt(this.offset.element.x)) {
			width -= this.offset.element.x
		}

		// Set the viewport offset
		let offset = 0

		if (typeof this.offset.viewport.x == 'function') {
			offset = parent.w * this.offset.viewport.x()
		} else if (isFloat(this.offset.viewport.x)) {
			offset = parent.w * this.offset.viewport.x
		} else if (isInt(this.offset.viewport.x)) {
			offset = this.offset.viewport.x
		}

		return (rect.left > (offset - width) && rect.left < (parent.w + width))
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

				this.toggle.class.out.each((className) => {
					this.element.classList.remove(className)
				})
			}

			this.element.classList.remove(this.toggle.class.out)

			return this.element.classList.add(this.toggle.class.in)
		}

		if (Array.isArray(this.toggle.class.out)) {
			this.toggle.class.in.each((className) => {
				this.element.classList.remove(className)
			})

			this.toggle.class.out.each((className) => {
				this.element.classList.add(className)
			})
		}

		this.element.classList.remove(this.toggle.class.in)

		return this.element.classList.add(this.toggle.class.out)
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