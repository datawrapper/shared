import test from 'ava';
import colorLightness from './colorLightness';

test('white lightness is 100', t => {
    t.is(Math.round(colorLightness('#ffffff')), 100);
});

test('black lightness is 0', t => {
    t.is(Math.round(colorLightness('#000000')), 0);
});
