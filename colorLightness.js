import hex2rgb from 'chroma-js/src/io/hex/hex2rgb';
import rgb2lab from 'chroma-js/src/io/lab/rgb2lab';

/**
 * Returns the L*a*b lightness value of a given hexidecimal
 * RGB color
 *
 * @exports colorLightness
 * @kind function
 *
 * @param {string} hexColor - the RGB color as hexadecimal string, e.g. "#330066"
 * @returns {number} - the L*a*b lightness, between 0 (black) and 100 (white)
 *
 * @exampe
 * import colorLightness from '@datawrapper/shared/colorLightness';
 * colorLightness('#2A4858') //
 */
export default function colorLightness(hexColor) {
    return rgb2lab(hex2rgb(hexColor))[0];
}
