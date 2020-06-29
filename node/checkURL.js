function checkURL(url) {
    if (url.indexOf('://unix:') > -1 || url.indexOf('unix:') === 0) {
        return false;
    }

    return true;
}

module.exports = checkURL;
