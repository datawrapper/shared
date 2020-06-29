const got = require('got');

async function fetchSafely(url) {
    if (url.indexOf('://unix:') > -1 || url.indexOf('unix:') === 0) {
        throw new Error('Not allowed to fetch data from unix sockets');
    }

    try {
        return await got(url);
    } catch (ex) {
        throw new Error('Received error when fetching remote data source');
    }
}

module.exports = fetchSafely;
