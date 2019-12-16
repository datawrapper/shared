/**
 * The response body is automatically parsed according
 * to the response content type.
 *
 * @param {string} method             - the http method, e.g. GET, PUT
 * @param {string} path               - the url path that gets appended to baseUrl
 * @param {*} options.payload         - optional payload to be send with req
 * @param {string} options.baseUrl    - base for url, defaults to dw api domain
 * @param {string} options.contentType - base for url, defaults to dw api domain
 *
 * @returns {Promise} fetch promise to the parsed response body
 *
 * @example
 * import httpRequest from '@datawrapper/shared/httpRequest';
 * const res = await httpRequest('POST', '/v3/charts', {
      payload: {
        title: 'My new chart'
      }
    })
 *
 */
/* globals dw */
export default function(method, path, options = {}) {
    const opts = {
        payload: null,
        baseUrl: `//${dw.backend.__api_domain}`,
        contentType: 'application/json',
        ...options
    };
    const url = `${opts.baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
    if (method.toLowerCase() === 'get' && opts.payload !== null) {
        throw new Error('GET requests do not support payloads');
    }
    const body =
        opts.payload === null
            ? undefined
            : typeof opts.payload === 'string'
            ? opts.payload
            : JSON.stringify(opts.payload);
    return window
        .fetch(url, {
            method,
            body,
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': opts.contentType
            }
        })
        .then(res => {
            if (!res.ok) throw new Error(res.statusText);
            if (res.statusCode === 204) return; // no content
            // trim away the ;charset=utf-8 from content-type
            const contentType = res.headers.get('content-type').split(';')[0];
            if (contentType === 'application/json') {
                return res.json();
            }
            if (contentType === 'image/png' || contentType === 'application/pdf') {
                return res.blob();
            }
            // default to text for all other content types
            return res.text();
        });
}
