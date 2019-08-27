import test from 'ava';
import round from './round';

test('round to zero decimals', t => {
    t.deepEqual(round(1.2345), 1);
    t.deepEqual(round(1.2345, 0), 1);
});

test('round to positive decimals', t => {
    t.deepEqual(round(1.2345, 1), 1.2);
    t.deepEqual(round(1.2345, 2), 1.23);
    t.deepEqual(round(1.2345, 3), 1.235);
    t.deepEqual(round(1.2345, 4), 1.2345);
});

test('round to negative decimals', t => {
    t.deepEqual(round(12345, 0), 12345);
    t.deepEqual(round(12345, -1), 12350);
    t.deepEqual(round(12345, -2), 12300);
    t.deepEqual(round(12345, -3), 12000);
    t.deepEqual(round(12345, -4), 10000);
});
