export function fetchJSON(url, method, credentials, body, callback) {
    var opts = {
        method,
        body,
        mode: 'cors',
        credentials
    };

    window
        .fetch(url, opts)
        .then(res => {
            if (res.status !== 200) return new Error(res.statusText);
            return res.text();
        })
        .then(text => {
            // console.log('status', res);
            try {
                return JSON.parse(text);
            } catch (Error) {
                // could not parse json, so just return text
                console.warn('malformed json input', text);
                return text;
            }
        })
        .then(callback)
        .catch(err => {
            console.error(err);
        });
}

export function getJSON(url, credentials, callback) {
    if (arguments.length === 2) {
        callback = credentials;
        credentials = 'include';
    }

    return fetchJSON(url, 'GET', credentials, null, callback);
}
export function postJSON(url, body, callback) {
    return fetchJSON(url, 'POST', 'include', body, callback);
}
export function putJSON(url, body, callback) {
    return fetchJSON(url, 'PUT', 'include', body, callback);
}
export function deleteJSON(url, callback) {
    return fetchJSON(url, 'DELETE', 'include', null, callback);
}

/**
 * injects a <script> element to the page to load a new JS script
 *
 * @param {string} src
 * @param {function} callback
 */
export function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
        if (callback) callback();
    };
    document.body.appendChild(script);
}

/**
 * injects a <link> element to the page to load a new stylesheet
 *
 * @param {string} src
 * @param {function} callback
 */
export function loadStylesheet(src, callback) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = src;
    link.onload = () => {
        if (callback) callback();
    };
    document.head.appendChild(link);
}
