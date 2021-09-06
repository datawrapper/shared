import chroma from 'chroma-js';
import get from './get.js';

/**
 * defines colors for the various chart elements like axis text, gridlines,
 * bar background etc. based on the theme background color, and some other optional theme parameters
 *
 * @exports defaultColors
 * @kind function
 *
 * @example
 * // returns {"tickText":{"secondary":"#aeaeae","primary":"#e3e3e3"},"series":"#f1f1f1","value":"#e3e3e3","axis":"#f1f1f1","gridline":"#707070","fallbackBaseColor":"#f1f1f1"}
 * defaultColors({"colors": {"background": "#333333"}});
 *
 * @example
 * // returns {"tickText":{"secondary":"#ffffff","primary":"#ffffff"},"series":"#ffffff","value":"#fff7ef","axis":"#ffffff","gridline":"#fedeb5","fallbackBaseColor":"#ffffff"}
 * defaultColors({"colors": {"bgBlendRatios": {"gridline": 0.5,"tickText": {"primary": 0,"secondary": 0}},"chartContentBaseColor": "#ffffff","background": "#FCB716"}});

 * @param {*} theme -- theme data for a chart
 * @returns {*} -- object with color definitions
 */

export function defaultColors(theme) {
    const baseColorSetting = get(theme, 'colors.chartContentBaseColor');
    const bgColor = get(theme, 'colors.background', '#ffffff');

    const baseColor =
        baseColorSetting || (chroma.contrast(bgColor, '#000000') < 5.5 ? '#f1f1f1' : '#333333');

    const bgBlendRatios = {
        tickText: {
            secondary: get(theme, 'colors.bgBlendRatios.tickText.secondary', 0.5),
            primary: get(theme, 'colors.bgBlendRatios.tickText.primary', 0.12)
        },
        series: get(theme, 'colors.bgBlendRatios.series', 0),
        value: get(theme, 'colors.bgBlendRatios.value', 0.12),
        axis: get(theme, 'colors.bgBlendRatios.axis', 0),
        gridline: get(theme, 'colors.bgBlendRatios.gridline', 0.82)
    };

    return {
        tickText: {
            secondary: chroma
                .mix(baseColor, theme.colors.background, bgBlendRatios.tickText.secondary)
                .hex(),
            primary: chroma
                .mix(baseColor, theme.colors.background, bgBlendRatios.tickText.primary)
                .hex()
        },

        series: chroma.mix(baseColor, theme.colors.background, bgBlendRatios.series).hex(),

        value: chroma.mix(baseColor, theme.colors.background, bgBlendRatios.value).hex(),

        axis: chroma.mix(baseColor, theme.colors.background, bgBlendRatios.axis).hex(),

        gridline: chroma.mix(baseColor, theme.colors.background, bgBlendRatios.gridline).hex(),

        fallbackBaseColor: baseColor
    };
}
