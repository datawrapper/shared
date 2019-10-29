/**
 * Shorten a string by removing characters from the middle
 *
 * @exports truncate
 * @kind function
 *
 * @example
 * import truncate from '@datawrapper/shared/truncate';
 * // returns 'This is a…tring'
 * truncate('This is a very very long string')
 *
 * @param {string} str
 * @returns {string}
 */
export default function truncate(str, start = 11, end = 7) {
    if (str.length < start + end + 3) return str;
    return str.substr(0, start).trim() + '…' + str.substr(str.length - end).trim();
}
