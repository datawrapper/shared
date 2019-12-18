// fixes the sort order in the resulting readme
const fs = require('fs');
const path = require('path');
const readme = path.resolve(__dirname, '../README.md');
const md = fs.readFileSync(readme, 'utf-8');

const parts = md.split('## API reference');

let parts2 = parts[1].split('<a name="');

const toc =
    '\n\n* ' +
    parts2
        .shift()
        .trim()
        .split(/\* +/)
        .filter(s => s)
        .map(s => ({
            t: s.trim() + '\n',
            h: s.match(/\((?:#|docs\/)([^)]+)/)[1].toLowerCase()
        }))
        .sort((a, b) => (a.h > b.h ? 1 : -1))
        .map(s => s.t)
        .join('* ') +
    '\n\n';

parts2 = parts2.sort();
parts2.unshift(toc);
parts[1] = parts2.join('<a name="');
const out = parts.join('## API reference');

fs.writeFileSync(readme, out);
