/**
 * Created by Erik on 09/07/2017.
 */
import extend from 'object-extend'

export default class Trigger {
	/**
	 * Creates a new Trigger from the given element and options
	 *
	 * @param {Element|HTMLElement} element
	 * @param {Object} [options=Object] options
	 * @param {boolean} [options.once=false] options.once If the trigger should only trigger the first time
	 * @param {number|function} [options.offset.screen.x=0] options.offset.screen.x The x offset of the screen. 0.5 == half a screen. Can be a function.
	 * @param {number|function} [options.offset.screen.x=0] options.offset.screen.y The y offset of the screen. 0.5 == half a screen. Can be a function.
	 * @param {number|function} [options.offset.element.x=0] options.offset.screen.x The x offset of the screen. 0.5 == half a screen. Can be a function.
	 * @param {number|function} [options.offset.element.x=0] options.offset.screen.y The y offset of the screen. 0.5 == half a screen. Can be a function.
	 * @param {string} [options.toggle.class.in=visible] options.toggle.class.in The class to toggle when the element is on screen
	 * @param {string} [options.toggle.class.out=visible] options.toggle.class.out The class to toggle when the element is off screen
	 * @param {function} [options.toggle.callback.in=null] options.toggle.callback.in The callback to call when te element comes on screen
	 * @param {function} [options.toggle.callback.out=null] options.toggle.callback.in The callback to call when te element goes off screen
	 */
	constructor(element, options) {
		this.element = element

		const defaults = {
			once: false,
			offset: {
				screen: {
					x: 0,
					y: 0
				},
				element: {
					x: 0,
					y: 0
				}
			},
			toggle: {
				class: {
					in: 'visible',
					out: 'invisible'
				},
				callback: {
					in: () => {},
					out: () => {}
				}
			}
		}

		options = extend(defaults, options)

		this.offset = options.offset
		this.toggle = options.toggle
	}

	update() {
		const rect = this.element.getBoundingClientRect()

		//console.log(rect)
	}
}