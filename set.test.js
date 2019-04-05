import test from 'ava';
import set from './set';

const thing = {
    answer: 42,
    nested: {
        bar: true,
        nothing: null,
        array: [1, 2, 4, 8],
        nested: {
            foo: 12
        }
    }
};

test('set simple', t => {
    set(thing, 'answer', 21);
    t.is(thing.answer, 21);
});

test('set second level', t => {
    set(thing, 'nested.bar', false);
    t.is(thing.nested.bar, false);
});

test('set third level', t => {
    set(thing, 'nested.nested.foo', 'bar');
    t.is(thing.nested.nested.foo, 'bar');
});

test('set creating missing objects', t => {
    set(thing, 'newkey.foo', 123);
    t.is(thing.newkey.foo, 123);
});

test('set array elements', t => {
    set(thing, 'nested.array.1', 20);
    set(thing, 'nested.array.2', 40);
    t.is(thing.nested.array[0], 1);
    t.is(thing.nested.array[1], 20);
    t.is(thing.nested.array[2], 40);
    t.is(thing.nested.array[3], 8);
});
