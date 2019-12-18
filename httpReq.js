/**
 * The response body is automatically parsed according
 * to the response content type.
 *
 * @exports httpReq
 * @kind function
 *
 * @param {string} path               - the url path that gets appended to baseUrl
 * @param {object} options.payload    - payload to be send with req
 * @param {boolean} options.raw       - disable parsing of response body, returns raw response
 * @param {string} options.baseUrl    - base for url, defaults to dw api domain
 * @param {*} options                 - see documentation for window.fetch for additional options
 *
 * @returns {Promise} fetch promise to the parsed response body
 *
 * @example
 *  import httpReq from '@datawrapper/shared/httpReq';
 *  let res = await httpReq('/v3/charts', {
        method: 'post',
        payload: {
            title: 'My new chart'
        }
    });
    import { post } from '@datawrapper/shared/httpReq';
    res = await post('/v3/charts', {
        payload: {
            title: 'My new chart'
        }
    });
 */
/* globals dw */
export default httpReq;

httpReq.get = httpReqVerb('get');
httpReq.patch = httpReqVerb('patch');
httpReq.delete = httpReqVerb('delete');
httpReq.put = httpReqVerb('put');
httpReq.post = httpReqVerb('post');
httpReq.head = httpReqVerb('head');

function httpReqVerb(method) {
    return (path, options) => {
        if (options && options.method) {
            throw new Error(`Setting option.method is not allowed in ${method}()`);
        }
        return httpReq(path, { ...options, method });
    };
}

function httpReq(path, options = {}) {
    const { payload, baseUrl, raw, ...opts } = {
        payload: null,
        raw: false,
        method: 'get',
        baseUrl: `//${dw.backend.__api_domain}`,
        mode: 'cors',
        credentials: 'include',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    };
    const url = `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
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
