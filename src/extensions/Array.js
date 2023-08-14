/**
 * Faster than .forEach
 * @param {(function())} fn The function to call
 */
function arrayEach(fn) {
	const l = this.length

	for (let i = 0; i < l; i++) {
		const e = this[i]

		if (e) {
			fn(e, i)
		}
	}
}

Object.defineProperty(Array.prototype, "each", {
	value: arrayEach,
	enumerable: false,
});

/**
 * Give NodeList some Array functions
 */
Object.defineProperties(NodeList.prototype, {
	each: {
		value: Array.prototype.each,
		enumerable: false,
	},
	filter: {
		value: Array.prototype.filter,
		enumerable: false
	}
});