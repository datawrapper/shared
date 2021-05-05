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
            /* if this font is being used inside of a font family */
            if (fonts.filter(f => f.family === fontface.name).length) {
                /* remove it from the list of fonts */
                fonts = fonts.filter(f => f.family !== fontface.name);
                /* and add it again with theme-defined weight and style */
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

    /* also check for fonts used in theme */
    Object.keys(typographyJSON).forEach(key => {
        if (typographyJSON[key].typeface) {
            const font = {
                family: typographyJSON[key].typeface.split(',')[0].replace(/['"]/gm, ''),
                props: {
                    weight: typographyJSON[key].fontWeight || 400,
                    style: typographyJSON[key].cursive ? 'italic' : 'normal'
                }
            };
            if (!fontAlreadyRegistered(font)) fonts.push(font);
        }
    });

    function fontAlreadyRegistered(font) {
        return fonts.filter(f => {
            return (
                f.family === font.family &&
                f.props.weight === font.props.weight &&
                f.props.style === font.props.style
            );
        }).length;
    }

    const observers = [];
    fonts.forEach(font => {
        const obs = new FontFaceObserver(font.family, font.props);
        observers.push(obs.load(null, 5000));
    });

    return Promise.all(observers);
}
