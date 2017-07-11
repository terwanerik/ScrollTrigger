/**
 * Created by Erik on 11/07/2017.
 */

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
	 *      x: number|(function()),
	 *      y: number|(function())
	 *    },
	 *    element: {
	 *      x: number|(function()),
	 *      y: number|(function())
	 *    }
	 *  },
	 *  toggle: {
	 *    class: {
	 *      in: string|string[],
	 *      out: string|string[]
	 *    },
	 *  callback: {
	 *    in: (function()),
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
				in: () => {},
				out: () => {}
			}
		}
	}

	/**
	 * The default options for the scroll behaviour
	 * @type {
	 * {
	 *  sustain: number,
	 *  element: Window|HTMLDocument|HTMLElement,
	 *  callback: (function()),
	 *  start: (function()),
	 *  stop: (function()),
	 *  directionChange: (function())
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
}