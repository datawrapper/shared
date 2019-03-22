/**
 * Converts an array with properties back to a normal object.
 *
 * @description
 * This function fixes an uglyness when working with PHP backends.
 * in PHP, there is no distiction between arrays and objects, so
 * PHP converts an empty object {} to a empty array [].
 *
 * When this empty array then ends up in client-side JS functions which
 * might start to assign values to the array using `arr.foo = "bar"`
 * which results in a data structure like this:
 *
 * >> arr
 * []
 *   foo: "bar"
 *   length: 0
 *   <prototype>: Array []
 *
 * to convert this structure back to a proper object you can use
 * this `arrayToObject` function.
 * >> arrayToObject(arr)
 * Object { foo: "bar" }
 *
 * @param {array} o
 * @returns {object}
 */
export default function(o) {
	if (Array.isArray(o)) {
		const obj = {};
		Object.keys(o).forEach(k => (obj[k] = o[k]));
		return obj;
	}
	return o;
}
