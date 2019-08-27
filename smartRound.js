import significantDimension from './significantDimension';
import round from './round';

export default function smartRound(values, addPrecision = 0) {
    let dim = significantDimension(values);
    dim += addPrecision;
    return values.map(v => round(v, dim));
}
