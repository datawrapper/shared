import FontFaceObserver from 'fontfaceobserver';

/**
 * Function that returns a promise, that resolves when all fonts,
 * specified in fontsJSON and typographyJSON have been loaded.
 *
 * @exports observeFonts
 * @kind function
 *
 * @param {Object|Array} fontsJSON
 * @param {Object} typographyJSON
 * @returns {Promise}
 */
export default function observeFonts(fontsJSON, typographyJSON) {
    /* Render vis again after fonts have been loaded */
    const fonts = new Set(Array.isArray(fontsJSON) ? [] : Object.keys(fontsJSON));

    Object.keys(typographyJSON.fontFamilies || {}).forEach(fontFamily => {
        typographyJSON.fontFamilies[fontFamily].forEach(fontface => {
            if (fonts.has(fontface.name)) {
                fonts.delete(fontface.name);
                fonts.add({
                    family: fontFamily,
                    props: {
                        weight: fontface.weight || 400,
                        style: fontface.style || 'normal'
                    }
                });
            }
        });
    });

    const observers = [];
    fonts.forEach(font => {
        const obs =
            typeof font === 'string'
                ? new FontFaceObserver(font)
                : new FontFaceObserver(font.family, font.props);
        observers.push(obs.load(null, 5000));
    });

    return Promise.all(observers);
}
