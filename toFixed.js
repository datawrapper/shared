/**
 * returns the length of the "tail" of a number, meaning the
 * number of meaningful decimal places
 *
 * @example
 * // returns 3
 * tailLength(3.123)
 *
 * @example
 * // returns 2
 * tailLength(3.12999999)
 *
 * @param {number} value
 * @returns {number}
 */
function tailLength(value) {
    return Math.max(
        0,
        String(value - Math.floor(value))
            .replace(/00000*[0-9]+$/, "")
            .replace(/99999*[0-9]+$/, "").length - 2
    );
}

/**
 * automatically converts a numeric value to a string. this is better
 * than the default number to string conversion in JS which sometimes
 * produces ugly strings like "3.999999998"
 *
 * @example
 * // returns '3.1'
 * toFixed(3.100001)
 *
 * @param {number} value
 * @returns {string}
 */
export default function(value) {
    return (+value).toFixed(tailLength(value));
}
