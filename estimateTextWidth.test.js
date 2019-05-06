import test from 'ava';
import estimateTextWidth from './estimateTextWidth';

test('test a few simple strings', t => {
    t.is(estimateTextWidth('a'), 9);
    t.is(estimateTextWidth('aa'), 18);
    t.is(estimateTextWidth('aaa'), 27);
});

test('test some more strings', t => {
    t.snapshot(estimateTextWidth('hello world'));
    t.snapshot(estimateTextWidth('1234.56'));
    t.snapshot(estimateTextWidth('1234.56 $'));
});
