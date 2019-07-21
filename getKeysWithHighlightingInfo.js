/**
 * Highlighting happens by "key", which means actually by row of the dataset, according to the
 * keys()-implementation in dw.visualization.base.js.
 * This method returns an array of all keys/rows, where the index is the index in the dataset
 * and the value includes the key of the row and the boolean "highlighting" indicating, if that row
 * was chosen by the user to be highlighted.
 *
 * @exports getKeysWithHighlightingInfo
 * @kind function
 *
 * @param visualization - the visualization object (vis, me, this, whatever has been registered)
 *
 * @export
 * @returns {array} - array of all keys/rows, where the index is the index in the dataset
 * and the value includes the key of the row and the boolean "highlighting" indicating, if that row
 * was chosen by the user to be highlighted.
 *
 */
export default function(visualization) {
    const valuesFromDataset = visualization.axes(true).labels.val;
    const keys = visualization.keys();
    const highlightingCandidates = keys.map((key, index) => {
        return {
            key: key,
            label: visualization.keyLabel(key),
            row: valuesFromDataset(index)
        };
    });
    const highlightedKeyLabels = visualization.get('highlighted-series', []);
    return highlightingCandidates.map(candidate =>
        highlightedKeyLabels.includes(candidate.key) ||
        highlightedKeyLabels.includes(candidate.label) ||
        highlightedKeyLabels.includes(candidate.row)
            ? {
                  rowInfo: candidate,
                  highlight: true
              }
            : {
                  rowInfo: candidate,
                  highlight: false
              }
    );
}
