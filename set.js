import clone from './clone';
/**
 * safely set object properties without throwing nasty
 * `cannot access X of undefined` errors if a property along the
 * way doesn't exist.
 *
 * @param object - the object which properties you want to acccess
 * @param {String} key - dot-separated keys aka "path" to the property
 * @param {*} value - the value to be set
 *
 * @returns the value
 */
export default function(object, key, value) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    let pt = object;

    // resolve property until the parent dict
    keys.forEach(key => {
        if (pt[key] === undefined || pt[key] === null) {
            pt[key] = {};
        }
        pt = pt[key];
    });

    // check if new value is set
    if (clone(pt[lastKey]) !== clone(value)) {
        pt[lastKey] = value;
    }
    return object;
}
