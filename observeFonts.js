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
    let fonts = Array.isArray(fontsJSON)
        ? []
        : Object.keys(fontsJSON).map(font => {
              return {
                  family: font,
                  props: {
                      weight: 400,
                      style: 'normal'
                  }
              };
          });

    Object.keys(typographyJSON.fontFamilies || {}).forEach(fontFamily => {
        typographyJSON.fontFamilies[fontFamily].forEach(fontface => {
            if (fonts.map(f => f.family).includes(fontface.name)) {
                fonts = fonts.filter(f => f.family !== fontface.name);
                fonts.push({
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
        const obs = new FontFaceObserver(font.family, font.props);
        observers.push(obs.load(null, 5000));
    });

    return Promise.all(observers);
}
