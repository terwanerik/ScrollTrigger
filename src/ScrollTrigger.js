/*!
 * ScrollTrigger
 *
 *
 * http://github.com/terwanerik
 *
 * Copyright 2017, Erik Terwan <erik@erikterwan.com>
 * Released under the MIT license.
 *
 * Date: 2017-07-09
 */

/**
 * Created by Erik on 09/07/2017.
 */
import Trigger from './scripts/Trigger'
import TriggerCollection from './scripts/TriggerCollection'
import ScrollAnimationLoop from './scripts/ScrollAnimationLoop'

import extend from 'object-extend'
import './extensions/Array'

export default class ScrollTrigger {
	constructor(options) {
		this._parseOptions(options)
		this._initCollection()
		this._initLoop()
	}

	_parseOptions(options) {
		const defaults = {
			trigger: {
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
			},
			scroll: {
				sustain: 300,
				element: window,
				callback: () => {},
				start: () => {},
				stop: () => {},
				directionChange: () => {}
			}
		}

		options = extend(defaults, options)

		this.defaultTrigger = options.trigger
		this.defaultScroll = options.scroll
	}

	/**
	 * Initializes the collection, picks all [data-scroll] elements as initial elements
	 * @private
	 */
	_initCollection() {
		const scrollAttributes = document.querySelectorAll('[data-scroll]')
		let elements = []

		if (scrollAttributes.length > 0) {
			elements = this.createTriggers(scrollAttributes)
		}

		this.collection = new TriggerCollection(elements)
	}

	/**
	 * Initializes the scroll loop
	 * @private
	 */
	_initLoop() {
		this.loop = new ScrollAnimationLoop({
			sustain: this.defaultScroll.sustain,
			element: this.defaultScroll.element,
			callback: (position, direction) => {
				this._scrollCallback(position, direction)
			},
			start: () => {
				this._scrollStart()
			},
			stop: () => {
				this._scrollStop()
			},
			directionChange: (direction) => {
				this._scrollDirectionChange(direction)
			}
		})
	}

	/**
	 * Callback for checking triggers
	 * @param {{x: number, y: number}} position
	 * @param {string} direction
	 * @private
	 */
	_scrollCallback(position, direction) {
		this.collection.call((trigger) => {
			trigger.update()
		})

		const stats = document.querySelector('div.stats')

		stats.innerHTML = 'pos: ' + JSON.stringify(position)
		stats.innerHTML += ' [' + direction + ']'

		this.defaultScroll.callback(position, direction)
	}

	/**
	 * When the scrolling started
	 * @private
	 */
	_scrollStart() {
		console.log('start')

		this.defaultScroll.start()
	}

	/**
	 * When the scrolling stopped
	 * @private
	 */
	_scrollStop() {
		console.log('stop')

		this.defaultScroll.stop()
	}

	/**
	 * When the direction changes
	 * @param {string} direction
	 * @private
	 */
	_scrollDirectionChange(direction) {
		console.log('change, ' + direction)

		this.defaultScroll.directionChange(direction)
	}

	/**
	 * Creates a Trigger object from a given element and optional option set
	 * @param {HTMLElement} element
	 * @param {Object} [options=null] options
	 * @returns Trigger
	 */
	createTrigger(element, options) {
		return new Trigger(element, extend(this.defaultTrigger, options))
	}

	/**
	 * Creates an array of triggers
	 * @param {HTMLElement[]|NodeList} elements
	 * @param {Object} [options=null] options
	 * @returns {Trigger[]} Array of triggers
	 */
	createTriggers(elements, options) {
		let triggers = []

		elements.each((element) => {
			triggers.push(this.createTrigger(element, options))
		})

		return triggers
	}

	/**
	 * Adds triggers
	 * @param {string|HTMLElement|NodeList|Trigger|Trigger[]} objects A list of objects or a query
	 * @returns {ScrollTrigger}
	 */
	add(objects) {
		if (objects instanceof HTMLElement) {
			this.collection.add(this.createTrigger(objects))

			return this
		}

		if (objects instanceof Trigger) {
			this.collection.add(objects)

			return this
		}

		if (objects instanceof NodeList) {
			this.collection.add(this.createTriggers(objects))

			return this
		}

		if (Array.isArray(objects) && objects.length && objects[0] instanceof Trigger) {
			this.collection.add(objects)

			return this
		}

		if (Array.isArray(objects) && objects.length && objects[0] instanceof HTMLElement) {
			this.collection.add(this.createTriggers(objects))

			return this
		}

		// assume it's a query string
		this.collection.add(this.createTriggers(document.querySelectorAll(objects)))

		return this
	}

	/**
	 * Removes triggers
	 * @param {string|HTMLElement|NodeList|Trigger|Trigger[]} objects A list of objects or a query
	 * @returns {ScrollTrigger}
	 */
	remove(objects) {
		if (objects instanceof Trigger) {
			this.collection.remove(objects)

			return this
		}

		if (Array.isArray(objects) && objects.length && objects[0] instanceof Trigger) {
			this.collection.remove(objects)

			return this
		}

		if (objects instanceof HTMLElement) {
			this.collection.remove(this.search(objects))

			return this
		}

		if (Array.isArray(objects) && objects.length && objects[0] instanceof HTMLElement) {
			this.collection.remove(this.search(objects))

			return this
		}

		if (objects instanceof NodeList) {
			this.collection.remove(this.search(objects))

			return this
		}

		if (Array.isArray(objects) && objects.length && objects[0] instanceof Trigger) {
			this.collection.remove(objects)

			return this
		}

		// assume it's a query string
		this.collection.remove(this.query(objects.toString()))

		return this
	}

	/**
	 * Lookup one or multiple triggers by a query string
	 * @param {string} selector
	 * @returns {Trigger[]}
	 */
	query(selector) {
		return this.collection.query(selector)
	}

	/**
	 * Lookup one or multiple triggers by a certain HTMLElement or NodeList
	 * @param {HTMLElement|HTMLElement[]|NodeList} element
	 * @returns {Trigger|Trigger[]|null}
	 */
	search(element) {
		return this.collection.search(element)
	}
}