import test from 'ava';
import numberFormatter from './numberColumnFormatter';

test('format number with empty config', t => {
    const formatter = numberFormatter({});

    t.is(formatter(3.14), '3.14');
    t.is(formatter(1), '1');
    t.is(formatter(0), '0');
});

test('format number with decimal places', t => {
    const formatter = numberFormatter({
        'number-format': 'n2',
        'number-divisor': 0,
        'number-prepend': '',
        'number-append': ''
    });

    t.is(formatter(3.14567), '3.15');
    t.is(formatter(3.1), '3.10');
    t.is(formatter(1), '1.00');
});

test('format number with significant digits', t => {
    const formatter = numberFormatter({
        'number-format': 's3',
        'number-divisor': 0,
        'number-prepend': '',
        'number-append': ''
    });

    t.is(formatter(1), '1.000');
    t.is(formatter(3.14), '3.14');
    t.is(formatter(3.145675), '3.15');
    t.is(formatter(122445.56), '122,446');
});

test('autoformat number with prepend & append', t => {
    const formatter = numberFormatter({
        'number-format': '-',
        'number-divisor': 0,
        'number-prepend': 'ca. ',
        'number-append': ' US$'
    });

    t.is(formatter(1, true), 'ca. 1 US$'.replace(/ /g, '\u00A0'));
    t.is(formatter(3.14, true), 'ca. 3.14 US$'.replace(/ /g, '\u00A0'));
    t.is(formatter(3.145675, true), 'ca. 3.145675 US$'.replace(/ /g, '\u00A0'));
    t.is(formatter(122445.56, true), 'ca. 122,445.56 US$'.replace(/ /g, '\u00A0'));
});
