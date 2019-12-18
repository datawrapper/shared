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
 *  import httpRequest from '@datawrapper/shared/httpRequest';
 *  let res = await httpRequest('POST', '/v3/charts', {
        payload: {
            title: 'My new chart'
        }
    })
    res = await httpRequest('/v3/charts', {
        method: 'POST',
        payload: {
            title: 'My new chart'
        }
    })
 */
/* globals dw */
export default function(method, path, options = {}) {
    if (arguments.length === 2 && typeof path !== 'string') {
        // support httpReq('/path', { method: 'get' }) syntax as well
        options = path;
        path = method;
        method = options.method;
    }
    const { payload, baseUrl, raw, ...opts } = {
        payload: null,
        raw: false,
        method: method || 'get',
        baseUrl: `//${dw.backend.__api_domain}`,
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        ...options
    };
    const url = `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
    if (opts.method.toLowerCase() === 'get' && (payload || opts.body)) {
        throw new Error('GET requests do not support payloads');
    }
    if (payload) {
        // overwrite body
        opts.body = JSON.stringify(payload);
    }
    return window.fetch(url, opts).then(res => {
        if (raw) return res;
        if (!res.ok) throw new Error(`[${res.statusCode}] ${res.statusText}`);
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
