import numeral from 'numeral';

/**
 * special number formatting that can deal with microtypography
 * and "prepend currencies" (e.g., −$1234.57)
 *
 * @exports formatNumber
 * @kind function
 *
 * @param {number} value
 * @param {object} options
 *
 * @example
 * // returns '1234.57'
 * formatNumber(1234.567)
 *
 * @example
 * // returns '−$1234.57'
 * formatNumber(-1234.567, { prepend: '$' })
 *
 * @export
 * @returns {string} - the formatted number
 */
export default function(value, options) {
    options = {
        format: '0.[00]',
        prepend: '',
        append: '',
        minusChar: '−',
        ...options
    };
    const { format, append, prepend, minusChar } = options;
    if (format.includes('%') && Number.isFinite(value)) {
        // numeraljs will multiply percentages with 100
        // which we don't want to happen
        value *= 0.01;
    }
    const fmt = numeral(Math.abs(value)).format(format);
    if (prepend && value < 0 && currencies.has(prepend.trim().toLowerCase())) {
        // pull minus sign to front
        return `${minusChar}${prepend}${fmt.replace('+', '')}${append}`;
    } else if (
        prepend &&
        value >= 0 &&
        currencies.has(prepend.trim().toLowerCase()) &&
        format.includes('+')
    ) {
        // pull plus sign to front
        return `${value === 0 ? '±' : '+'}${prepend}${fmt.replace('+', '')}${append}`;
    } else if (value === 0 && format.includes('+')) {
        return `${prepend}${fmt.replace('+', '±')}${append}`;
    }
    if (value < 0) {
        return `${prepend}${minusChar}${fmt.replace('+', '')}${append}`;
    }
    return `${prepend}${fmt}${append}`;
}

/*
 * list of currency signs that sometimes preceed the value
 * @todo: extend this list if users requesting it :)
 */
const currencies = new Set([
    '฿',
    '₿',
    '¢',
    '$',
    '€',
    'eur',
    '£',
    'gbp',
    '¥',
    'yen',
    'usd',
    'cad',
    'us$',
    'ca$',
    'can$'
]);
