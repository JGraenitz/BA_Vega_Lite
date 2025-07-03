// VegaLiteUtils.js

const knownOrdinals = [
  ["sehr schlecht", "schlecht", "mittel", "gut", "sehr gut"],
  ["klein", "mittel", "groß"],
  ["niedrig", "mittel", "hoch"],
  ["unzufrieden", "neutral", "zufrieden"],
  ["stark", "mittel", "schwach"],
  // Weitere Skalen können hier ergänzt werden
];



function isKnownOrdinal(values) {
  for (const scale of knownOrdinals) {
    // Prüfe, ob alle Werte in der Skala enthalten sind (Reihenfolge egal)
    if (values.every(v => scale.includes(v))) {
      return true;
    }
  }
  return false;
}

export function analyzeColumns(data, columns) {
  const result = {};
  for (const col of columns) {
    let missing = 0;
    let unique = new Set();
    let isDate = true, isNumber = true;
    for (const row of data) {
      let val = row[col];
      if (val === undefined || val === null || val === '' || val === 'null' || val === 'NaN') {
        missing++;
        continue;
      }
      unique.add(val);
      if (isNumber && isNaN(Number(val))) isNumber = false;
      if (isDate && isNaN(Date.parse(val))) isDate = false;
    }
    const uniqueArr = Array.from(unique);
    if (isNumber) {
      result[col] = { type: 'quantitative', missingCount: missing };
    } else if (isDate) {
      result[col] = { type: 'temporal', missingCount: missing };
    } else if (isKnownOrdinal(uniqueArr)) {
      result[col] = { type: 'ordinal', missingCount: missing };
    } else {
      result[col] = { type: 'nominal', missingCount: missing };
    }
  }
  return result;
} 




export function buildEncoding(field, type, title, aggregation = null) {
  let encoding = {
    field: field,
    type: type,
    axis: { title: title }
  };
  if (aggregation && type === 'quantitative') {
    encoding.aggregate = aggregation;
  }
  return encoding;
}

export function buildMark(plotType, opacity = 1, markSize = 30, markShape = 'circle') {
  let mark = { type: plotType, opacity };
  if (['point', 'circle', 'square'].includes(plotType)) {
    mark.size = markSize;
  }
  if (plotType === 'point') {
    mark.shape = markShape;
  }
  return mark;
}

export function generateVegaLiteSpec(controls, columnInfo) {

  if (!controls.layers || controls.layers.length === 0) return null; 

  let spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Auto-generated chart with layers',
    width: controls.width,
    height: controls.height,
    data: { name: 'table' },
    config: {
      axis: { labelFontSize: 13, titleFontSize: 15 },
      view: { stroke: 'transparent' },
    },
  };
  
  spec.layer = controls.layers.map((layer) => {
    const xType = columnInfo[layer.xAxis]?.type || 'nominal';
    const yType = columnInfo[layer.yAxis]?.type || 'quantitative';

/*
    if (layer.plotType === 'pie') {
      return {
        mark: { type: 'arc', outerRadius: layer.markSize || 100, tooltip: true },
        encoding: {
          theta: { field: layer.yAxis, type: yType, aggregate: layer.aggregation || undefined },
          color: { field: layer.xAxis, type: xType },
          tooltip: [
            { field: layer.xAxis, type: xType },
            {
              field: layer.yAxis,
              type: yType,
              ...(layer.aggregation && yType === 'quantitative' && {
                aggregate: layer.aggregation,
                title: `${layer.aggregation}(${layer.yAxis})`
              })
            }
          ]
        }
      };
    }
      */

    return {
      mark: buildMark(layer.plotType, layer.opacity, layer.markSize, layer.markShape),
      encoding: {
        x: buildEncoding(layer.xAxis, xType, controls.xLabel),
        y: buildEncoding(layer.yAxis, yType, controls.yLabel || layer.yAxis, layer.aggregation),
        color: { value: layer.color },
        tooltip: [
          { field: layer.xAxis, type: xType },
          {
            field: layer.yAxis,
            type: yType,
            ...(layer.aggregation && yType === 'quantitative' && {
              aggregate: layer.aggregation,
              title: `${layer.aggregation}(${layer.yAxis})`
            })
          }
        ],
      },
    };

  });
  return spec;
}

/**
 * Verarbeitet die hochgeladenen CSV-Daten und setzt alle relevanten States.
 * @param {Array} data - Die CSV-Daten als Array von Objekten
 * @param {Array} cols - Die Spaltennamen
 * @param {Function} setCsvData
 * @param {Function} setColumns
 * @param {Function} setColumnInfo
 * @param {Function} setControls
 * @param {Function} setVegaSpecError
 */
export function handleCsvData(data, cols, setCsvData, setColumns, setColumnInfo, setControls, setVegaSpecError) {
  setCsvData(data);
  setColumns(cols);
  const info = analyzeColumns(data, cols);
  setColumnInfo(info);
  // Erstelle Standard-Layer
  const defaultLayer = {
    id: Date.now(),
    xAxis: cols[0] || '',
    yAxis: cols[1] || cols[0] || '',
    aggregation: '',
    plotType: 'bar',
    color: '#4f6d9a',
    opacity: 0.8,
    markSize: 30,
    markShape: 'circle'
  };
  // Setze Standard-Steuerung
  setControls({
    layers: [defaultLayer],
    markSize: 30,
    markShape: 'circle',
    xLabel: cols[0] || '',
    yLabel: cols[1] || '',
    width: 1500,
    height: 350,
    dateFilter: { start: '', end: '' },
  });
  setVegaSpecError(null);
} 