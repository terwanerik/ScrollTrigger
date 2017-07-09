/**
 * Created by Erik on 09/07/2017.
 */

/**
 * Faster than .forEach
 * @param {(function())} fn The function to call
 */
Array.prototype.each = function (fn) {
	var l = this.length

	for(var i = 0; i < l; i++) {
		var e = this[i]

		if (e) {
			fn(e,i)
		}
	}
}

/**
 * Give NodeList some Array functions
 */
NodeList.prototype.each = Array.prototype.each
NodeList.prototype.filter = Array.prototype.filter