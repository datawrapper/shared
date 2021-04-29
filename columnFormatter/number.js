import formatNumber from '../formatNumber.js';
import equalish from '@datawrapper/shared/equalish';

export default function(config) {
    let format = config['number-format'] || '-';
    let div = Number(config['number-divisor'] || 0);
    let append = (config['number-append'] || '').replace(/ /g, '\u00A0');
    let prepend = (config['number-prepend'] || '').replace(/ /g, '\u00A0');

    return function(val, full, round) {
        if (isNaN(val)) return val;
        var _fmt = format;
        var digits = 0;
        if (div !== 0 && _fmt === '-') digits = 1;
        if (_fmt.substr(0, 1) === 's') {
            // significant figures
            digits = Math.max(0, signDigitsDecimalPlaces(val, +_fmt.substr(1)));
        }
        if (round) digits = 0;
        if (_fmt === '-') {
            // guess number format based on single number
            digits = equalish(val, Math.round(val))
                ? 0
                : equalish(val, Math.round(val * 10) * 0.1)
                ? 1
                : equalish(val, Math.round(val * 100) * 0.01)
                ? 2
                : equalish(val, Math.round(val * 1000) * 0.001)
                ? 3
                : equalish(val, Math.round(val * 10000) * 0.0001)
                ? 4
                : equalish(val, Math.round(val * 100000) * 0.00001)
                ? 5
                : 6;
        }

        let numeralFormat = '0';
        for (var i = 0; i < digits; i++) {
            if (i === 0) numeralFormat += '.';
            numeralFormat += '0';
        }

        return formatNumber(val, {
            format: numeralFormat,
            prepend: full ? prepend : '',
            append: full ? append : '',
            multiply: Math.pow(10, div)
        });
    };
}

function signDigitsDecimalPlaces(num, sig) {
    if (num === 0) return 0;
    return Math.round(sig - Math.ceil(Math.log(Math.abs(num)) / Math.LN10));
}
