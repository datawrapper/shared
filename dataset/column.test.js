import test from 'ava';
import column from './column.js';

const testData = '5.4\t4.2\t4\t3.6\t3.4\t4.5'.split('\t');
const col = column('my title', testData);

test('basic column api: returns the title', t => {
    t.is(col.name(), 'my title');
    t.is(col.title(), 'my title');
});

test('detects column type number', t => {
    t.is(col.type(), 'number');
});

test('num rows', t => {
    t.is(col.length, 6);
});

test('get values', t => {
    t.is(col.val(0), 5.4);
    t.is(col.val(1), 4.2);
    t.is(col.val(-1), 4.5);
    t.is(col.val(-2), 3.4);
});

test('get raw values', t => {
    t.is(col.raw(0), '5.4');
    t.is(col.raw(1), '4.2');
    t.is(col.raw(2), '4');
});

test('get range', t => {
    t.deepEqual(col.range(), [3.4, 5.4]);
});

test('get total', t => {
    t.is(col.total(), 25.1);
});

test('get string', t => {
    t.is(col.toString(), 'my title (number)');
});
