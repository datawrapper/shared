import test from 'ava';
import delimited from './delimited.js';

test('simple tsv', async t => {
    const csv = `Party\tWomen\tMen\tTotal
CDU/CSU\t45\t192\t237
SPD\t57\t89\t146
FDP\t24\t69\t93
LINKE\t42\t34\t76
GRÜNE\t36\t32\t68
`;
    const dataset = await delimited({ csv }).dataset();
    // column count
    t.is(dataset.numColumns(), 4);
    // row count
    t.is(dataset.numRows(), 5);
    // column types
    t.deepEqual(dataset.columns().map(c => c.type()), ['text', 'number', 'number', 'number']);
});

test('nasty tsv with new lines in quoted values', async t => {
    const csv = `Party\t"Women\n\tfoo"\t""Men""\t"Total"
"CDU/CSU"\t45\t192\t237
"SPD"\t57\t89\t146
"FDP"\t24\t69\t93
"LINKE"\t42\t34\t76
"GRÜNE"\t36\t32\t68
`;
    const dataset = await delimited({ csv }).dataset();
    // column count
    t.is(dataset.numColumns(), 4);
    // row count
    t.is(dataset.numRows(), 5);
    // column types
    t.deepEqual(dataset.columns().map(c => c.type()), ['text', 'number', 'number', 'number']);
});

test('german debt dataset, transposed', async t => {
    const csv = `"","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016"
"New debt in Bio.","14,3","11,5","34,1","44","17,3","34,8","19,6","14,6","10,3","1,1"
`;
    const dataset = await delimited({ csv, transpose: true }).dataset();
    // column count
    t.is(dataset.numColumns(), 2);
    // row count
    t.is(dataset.numRows(), 10);
    t.is(dataset.column(1).val(0), 14.3);
    // column types
    t.deepEqual(dataset.columns().map(c => c.type()), ['date', 'number']);
});

test('another one', async t => {
    const csv = `ags\tlabel\tshort\tohne.2013.proz
1001\tFlensburg, Kreisfreie Stadt\tFlensburg\t0.076
1002\tKiel, Landeshauptstadt, Kreisfreie Stadt\tKiel\t0.077
1003\tLübeck, Hansestadt, Kreisfreie Stadt\tLübeck\t0.086
1004\tNeumünster, Kreisfreie Stadt\tNeumünster\t0.088
1051\tDithmarschen, Landkreis\tDithmarschen\t0.086
1053\tHerzogtum Lauenburg, Landkreis\tHerzogtum Lauenburg 0.086
1054\tNordfriesland, Landkreis\tNordfriesland\t0.072
1055\tOstholstein, Landkreis\tOstholstein 0.087
1056\tPinneberg, Landkreis\tPinneberg\t0.065
1057\tPlön, Landkreis\tPlön\t0.081
1058\tRendsburg-Eckernförde, Landkreis\tRendsburg-Eckernförde\t0.081`;
    const dataset = await delimited({ csv }).dataset();
    // column count
    t.is(dataset.numColumns(), 4);
    // row count
    t.is(dataset.numRows(), 11);
    // column types
    t.deepEqual(dataset.columns().map(c => c.type()), ['number', 'text', 'text', 'number']);
});

test('everything is quoted', async t => {
    const csv = `"Bezirk","Anzahl","Mittelwert Miete Euro pro qm"
"Charlottenburg-Wilmersdorf","609.0","17.573844996618483"
"Friedrichshain-Kreuzberg","366.0","18.732384651551758"`;
    const dataset = await delimited({ csv }).dataset();
    // column count
    t.is(dataset.column(0).name(), 'Bezirk');
});
