import Trigger from './Trigger'
import '../extensions/Array'

export default class TriggerCollection {
	/**
	 * Initializes the collection
	 * @param {Trigger[]} [triggers=[]] triggers A set of triggers to init with, optional
	 */
	constructor(triggers) {
		/**
		 * @member {Trigger[]}
		 */
		this.triggers = triggers instanceof Array ? triggers : []
	}

	/**
	 * Adds one or multiple Trigger objects
	 * @param {Trigger|Trigger[]} objects
	 */
	add(objects) {
		if (objects instanceof Trigger) {
			// single
			return this.triggers.push(objects)
		}

		objects.each((trigger) => {
			if (trigger instanceof Trigger) {
				this.triggers.push(trigger)
			} else {
				console.error('Object added to TriggerCollection is not a Trigger. Object: ', trigger)
			}
		})
	}

	/**
	 * Removes one or multiple Trigger objects
	 * @param {Trigger|Trigger[]} objects
	 */
	remove(objects) {
		if (objects instanceof Trigger) {
			objects = [objects]
		}

		this.triggers = this.triggers.filter((trigger) => {
			let hit = false

			objects.each((object) => {
				if (object == trigger) {
					hit = true
				}
			})

			return !hit
		})
	}

	/**
	 * Lookup one or multiple triggers by a query string
	 * @param {string} selector
	 * @returns {Trigger[]}
	 */
	query(selector) {
		return this.triggers.filter((trigger) => {
			const element = trigger.element
			const parent = element.parentNode
			const nodes = [].slice.call(parent.querySelectorAll(selector))

			return nodes.indexOf(element) > -1
		})
	}

	/**
	 * Lookup one or multiple triggers by a certain HTMLElement or NodeList
	 * @param {HTMLElement|HTMLElement[]|NodeList} element
	 * @returns {Trigger|Trigger[]|null}
	 */
	search(element) {
		const found = this.triggers.filter((trigger) => {
			if (element instanceof NodeList || Array.isArray(element)) {
				let hit = false

				element.each((el) => {
					if (trigger.element == el) {
						hit = true
					}
				})

				return hit
			}

			return trigger.element == element
		})

		return found.length == 0 ? null : (found.length > 1 ? found : found[0])
	}

	/**
	 * Calls a function on all triggers
	 * @param {(function())} callback
	 */
	call(callback) {
		this.triggers.each(callback)
	}
}
