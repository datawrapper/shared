/**
 * safely access object properties without throwing nasty
 * `cannot access X of undefined` errors if a property along the
 * way doesn't exist.
 *
 * @param object - the object which properties you want to acccess
 * @param {String} key - dot-separated keys aka "path" to the property
 * @param {*} _default - the fallback value to be returned if key doesn't exist
 *
 * @returns the value
 */
export default function(object, key = null, _default = null) {
    if (!key) return object;
    // expand keys
    const keys = key.split('.');
    let pt = object;

    for (let i = 0; i < keys.length; i++) {
        if (pt === null || pt === null) break; // break out of the loop
        // move one more level in
        pt = pt[keys[i]];
    }
    return pt === undefined || pt === null ? _default : pt;
}
