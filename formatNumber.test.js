import test from 'ava';
import formatNumber from './formatNumber';

test('simple number', t => {
    t.is(formatNumber(1234.5678), '1234.57');
});

test('negative number', t => {
    t.is(formatNumber(-1234.5678), '−1234.57');
});

test('negative number, custom minus characte', t => {
    t.is(formatNumber(-1234.5678, { minusChar: '&minus;' }), '&minus;1234.57');
});

test('prepend/append', t => {
    t.is(formatNumber(1234.5678, { prepend: '[ ', append: ' ]' }), '[ 1234.57 ]');
});

test('number format', t => {
    t.is(formatNumber(1234.5678, { format: '0,.0' }), '1,234.6');
});

test('minus sign and prepend currencies', t => {
    t.is(formatNumber(-1234.5678, { prepend: '$' }), '−$1234.57');
    t.is(formatNumber(-1234.5678, { prepend: '$ ' }), '−$ 1234.57');
    t.is(formatNumber(-1234.5678, { prepend: 'USD ' }), '−USD 1234.57');
    t.is(formatNumber(-1234.5678, { prepend: 'Cad ' }), '−Cad 1234.57');
});

test('forced plus sign and prepend currencies', t => {
    t.is(formatNumber(1234.5678, { format: '+0.00', prepend: '$' }), '+$1234.57');
    t.is(formatNumber(1234.5678, { format: '+0.00', prepend: '$ ' }), '+$ 1234.57');
    t.is(formatNumber(1234.5678, { format: '+0.00', prepend: 'USD ' }), '+USD 1234.57');
});
