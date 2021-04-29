import { isDate, identity } from 'underscore/modules';
import dayjs from 'dayjs';

export default function(column) {
    const format = column.format();
    if (!format) return identity;

    switch (column.precision()) {
        case 'year':
            return function(d) {
                return !isDate(d) ? d : d.getFullYear();
            };
        case 'half':
            return function(d) {
                return !isDate(d) ? d : d.getFullYear() + ' H' + (d.getMonth() / 6 + 1);
            };
        case 'quarter':
            return function(d) {
                return !isDate(d) ? d : d.getFullYear() + ' Q' + (d.getMonth() / 3 + 1);
            };
        case 'month':
            return function(d) {
                return !isDate(d) ? d : dayjs.format(d, 'MMM YY');
            };
        case 'week':
            return function(d) {
                return !isDate(d)
                    ? d
                    : dateToIsoWeek(d)
                          .slice(0, 2)
                          .join(' W');
            };
        case 'day':
            return function(d, verbose) {
                return !isDate(d) ? d : dayjs.format(d, verbose ? 'dddd, MMMM DD, YYYY' : 'l');
            };
        case 'day-minutes':
            return function(d) {
                return !isDate(d)
                    ? d
                    : dayjs.format(d, 'MMM DD').replace(' ', '&nbsp;') +
                          ' - ' +
                          dayjs.format(d, 'LT').replace(' ', '&nbsp;');
            };
        case 'day-seconds':
            return function(d) {
                return !isDate(d) ? d : dayjs.format(d, 'LTS').replace(' ', '&nbsp;');
            };
    }
}

function dateToIsoWeek(date) {
    const d = date.getUTCDay();
    const t = new Date(date.valueOf());
    t.setDate(t.getDate() - ((d + 6) % 7) + 3);
    const isoYear = t.getUTCFullYear();
    const w = Math.floor((t.getTime() - new Date(isoYear, 0, 1, -6)) / 864e5);
    return [isoYear, 1 + Math.floor(w / 7), d > 0 ? d : 7];
}
