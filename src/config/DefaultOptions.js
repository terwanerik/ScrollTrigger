/**
 * Default options for ScrollTrigger
 */
export default function() {
	/**
	 * The default options for a trigger
	 *
	 * @type {
	 * {
	 *  once: boolean,
	 *  offset: {
	 *    viewport: {
	 *      x: number|(function(frame, direction)),
	 *      y: number|(function(frame, direction))
	 *    },
	 *    element: {
	 *      x: number|(function(rect, direction)),
	 *      y: number|(function(rect, direction))
	 *    }
	 *  },
	 *  toggle: {
	 *    class: {
	 *      in: string|string[],
	 *      out: string|string[]
	 *    },
	 *  callback: {
	 *    in: {TriggerInCallback},
     *    visible: (function()),
	 *    out: (function())
	 *  }
	 * }
	 * }}
	 */
	this.trigger = {
		once: false,
		offset: {
			viewport: {
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
				in: null,
        		visible: null,
				out: null
			}
		}
	}

    /**
     * The `in` callback is called when the element enters the viewport
     * @callback TriggerInCallback
     * @param {{x: Number, y: Number}} position
     * @param {string} direction
     */

	/**
	 * The default options for the scroll behaviour
	 * @type {
	 * {
	 *  sustain: number,
	 *  element: Window|HTMLDocument|HTMLElement,
	 *  callback: {ScrollCallback},
	 *  start: (function()),
	 *  stop: (function()),
	 *  directionChange: (function(direction: {string}))
	 * }
	 * }
	 */
	this.scroll = {
		sustain: 300,
		element: window,
		callback: () => {},
		start: () => {},
		stop: () => {},
		directionChange: () => {}
	}

    /**
     * The scroll callback is called when the user scrolls
     * @callback ScrollCallback
     * @param {{x: Number, y: Number}} position
     * @param {string} direction
     */
}
