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
 * @returns {Promise} promise of parsed response body or raw response
 *
 * @example
 *  import httpReq from '@datawrapper/shared/httpReq';
 *  let res = await httpReq('/v3/charts', {
 *      method: 'post',
 *      payload: {
 *          title: 'My new chart'
 *      }
 *  });
 *  import { post } from '@datawrapper/shared/httpReq';
 *  res = await post('/v3/charts', {
 *      payload: {
 *          title: 'My new chart'
 *      }
 *  });
 */
export default function httpReq(path, options = {}) {
    /* globals dw */
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
        if (!res.ok) {
            throw new HttpReqError(res);
        }
        if (res.status === 204) return; // no content

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

/**
 * Like `httpReq` but with fixed http method GET
 * @see {@link httpReq}
 *
 * @exports httpReq.get
 * @kind function
 */
httpReq.get = httpReqVerb('get');

/**
 * Like `httpReq` but with fixed http method PATCH
 * @see {@link httpReq}
 *
 * @exports httpReq.patch
 * @kind function
 */
httpReq.patch = httpReqVerb('patch');

/**
 * Like `httpReq` but with fixed http method DELETE
 * @see {@link httpReq}
 *
 * @exports httpReq.delete
 * @kind function
 */
httpReq.delete = httpReqVerb('delete');

/**
 * Like `httpReq` but with fixed http method PUT
 * @see {@link httpReq}
 *
 * @exports httpReq.put
 * @kind function
 */
httpReq.put = httpReqVerb('put');

/**
 * Like `httpReq` but with fixed http method POST
 * @see {@link httpReq}
 *
 * @exports httpReq.post
 * @kind function
 */
httpReq.post = httpReqVerb('post');

/**
 * Like `httpReq` but with fixed http method HEAD
 * @see {@link httpReq}
 *
 * @exports httpReq.head
 * @kind function
 */
httpReq.head = httpReqVerb('head');

function httpReqVerb(method) {
    return (path, options) => {
        if (options && options.method) {
            throw new Error(`Setting option.method is not allowed in ${method}()`);
        }
        return httpReq(path, { ...options, method });
    };
}

class HttpReqError extends Error {
    constructor(res) {
        super();
        this.name = 'HttpReqError';
        this.status = res.status;
        this.statusText = res.statusText;
        this.message = `[${res.status}] ${res.statusText}`;
        this.response = res;
    }
}
