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
import DefaultOptions from './config/DefaultOptions'
import _Trigger from './scripts/Trigger'
import _TriggerCollection from './scripts/TriggerCollection'
import _ScrollAnimationLoop from './scripts/ScrollAnimationLoop'

import extend from 'object-extend'
import './extensions/Array'

export const Trigger = _Trigger
export const TriggerCollection = _TriggerCollection
export const ScrollAnimationLoop = _ScrollAnimationLoop

export default class ScrollTrigger {
	/**
	 * Constructor for the scroll trigger
	 * @param {DefaultOptions} [options=DefaultOptions] options
	 */
	constructor(options) {
		this._parseOptions(options)
		this._initCollection()
		this._initLoop()
	}

	/**
	 * Parses the options
	 * @param {DefaultOptions} [options=DefaultOptions] options
	 * @private
	 */
	_parseOptions(options) {
		options = extend(new DefaultOptions(), options)

		this.defaultTrigger = options.trigger
		this.scrollOptions = options.scroll
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
			sustain: this.scrollOptions.sustain,
			element: this.scrollOptions.element,
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
			trigger.checkVisibility(this.scrollOptions.element, direction)
		})

		this.scrollOptions.callback(position, direction)
	}

	/**
	 * When the scrolling started
	 * @private
	 */
	_scrollStart() {
		this.scrollOptions.start()
	}

	/**
	 * When the scrolling stopped
	 * @private
	 */
	_scrollStop() {
		this.scrollOptions.stop()
	}

	/**
	 * When the direction changes
	 * @param {string} direction
	 * @private
	 */
	_scrollDirectionChange(direction) {
		this.scrollOptions.directionChange(direction)
	}

	/**
	 * Creates a Trigger object from a given element and optional option set
	 * @param {HTMLElement} element
	 * @param {DefaultOptions.trigger} [options=DefaultOptions.trigger] options
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
	 * @param {Object} [options=null] options
	 * @returns {ScrollTrigger}
	 */
	add(objects, options) {
		if (objects instanceof HTMLElement) {
			this.collection.add(this.createTrigger(objects, options))

			return this
		}

		if (objects instanceof Trigger) {
			this.collection.add(objects)

			return this
		}

		if (objects instanceof NodeList) {
			this.collection.add(this.createTriggers(objects, options))

			return this
		}

		if (Array.isArray(objects) && objects.length && objects[0] instanceof Trigger) {
			this.collection.add(objects)

			return this
		}

		if (Array.isArray(objects) && objects.length && objects[0] instanceof HTMLElement) {
			this.collection.add(this.createTriggers(objects, options))

			return this
		}

		// assume it's a query string
		this.collection.add(this.createTriggers(document.querySelectorAll(objects), options))

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

	/**
	 * Reattaches the scroll listener
	 */
	listen() {
		if (this.loop) { return }

		this._initLoop()
	}

	/**
	 * Kills the scroll listener
	 */
	kill() {
		this.loop.kill()
		this.loop = null
	}
}
