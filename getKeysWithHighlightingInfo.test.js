import test from 'ava';
import getKeysWithHighlightingInfo from './getKeysWithHighlightingInfo';

// Caution! This test suffers from an architecture problem:
// Since dataset and visualization are both part of the old dw core, they connot be easily
// imported here for a test.
// Current workaround: Mocking the visualization and dataset "by hand" and "by sense".
// Of course, this workaround will be an error source, as soon as dataset and visualization get
// refactored.

const dataset = [['firstrow', 1], ['secondrow', 2], ['thirdrow', 3]];
const labels = { val: index => dataset[index] };
const visualization = {};
visualization.axes = asColumns => (asColumns ? { labels: labels } : []);
visualization.keys = () => ['firstrow', 'secondrow', 'thirdrow'];
visualization.keyLabel = key =>
    ['firstrow Label', 'secondrow Label', 'thirdrow Label'].find(k => k.includes(key));
visualization.get = (searchProp, defaultValue) =>
    searchProp === 'highlighted-series' ? 'thirdrow Label' : defaultValue;

const returnValue = [
    {
        rowInfo: { key: 'firstrow', label: 'firstrow Label', row: dataset[0] },
        highlight: false
    },
    {
        rowInfo: { key: 'secondrow', label: 'secondrow Label', row: dataset[1] },
        highlight: false
    },
    {
        rowInfo: { key: 'thirdrow', label: 'thirdrow Label', row: dataset[2] },
        highlight: true
    }
];

test('get keys with highlighting info (from mocked visualisation and dataset)', t => {
    t.deepEqual(
        getKeysWithHighlightingInfo(visualization),
        returnValue,
        'extracted highlighting information is wrong'
    );
});
