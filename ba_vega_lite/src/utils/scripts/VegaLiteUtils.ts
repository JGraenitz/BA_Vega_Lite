// VegaLiteUtils.js

const knownOrdinals = [
  ["sehr schlecht", "schlecht", "mittel", "gut", "sehr gut"],
  ["klein", "mittel", "groß"],
  ["niedrig", "mittel", "hoch"],
  ["unzufrieden", "neutral", "zufrieden"],
  ["stark", "mittel", "schwach"],
];



function isKnownOrdinal(values: any): boolean {
  for (const scale of knownOrdinals) {
    // Prüfe, ob alle Werte in der Skala enthalten sind (Reihenfolge egal)
    if (values.every((v: any) => scale.includes(v))) {
      return true;
    }
  }
  return false;
}

export function analyzeColumns(data: any, columns: any): any {
  const result: any = {};
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




export function buildEncoding(field: any, type: any, title: any, aggregation: any = null): any {
  let encoding: any = {
    field: field,
    type: type,
    axis: { title: title }
  };
  if (aggregation && type === 'quantitative') {
    encoding.aggregate = aggregation;
  }
  return encoding;
}

export function buildMark(plotType: any, opacity: any = 1, markSize: any = 30, markShape: any = 'circle'): any {
  let mark: any = { type: plotType, opacity };
  if (['point', 'circle', 'square'].includes(plotType)) {
    mark.size = markSize;
  }
  if (plotType === 'point') {
    mark.shape = markShape;
  }
  return mark;
}

export function generateVegaLiteSpec(controls: any, columnInfo: any): any {

  if (!controls.layers || controls.layers.length === 0) return null; 

  // Wenn Legende aktiv, kombiniere alle Layer zu einer Serie mit 'Legend'-Feld
  if (controls.showLegend) {
    const legendDomain: string[] = controls.layers.map((layer: any) => layer.yAxis);
    const legendRange: string[] = controls.layers.map((layer: any) => layer.color);
    // Nutze das x-Feld des ersten Layers als Standard
    const xField = controls.layers[0]?.xAxis || '';
    const xType = columnInfo[xField]?.type || 'nominal';
    return {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: 'Auto-generated chart with legend',
      width: controls.width,
      height: controls.height,
      data: { name: 'table' },
      config: {
        axis: { labelFontSize: 13, titleFontSize: 15 },
        view: { stroke: 'transparent' },
      },
      layer: controls.layers.map((layer: any) => {
        // Hole Typen für Achsen
        const yType = 'quantitative'; // Im Legend-Modus ist value immer quantitativ
        // Aggregation berücksichtigen
        const yEncoding: any = {
          field: 'value',
          type: yType,
          axis: { title: controls.yLabel || 'Wert' }
        };
        if (layer.aggregation) {
          yEncoding.aggregate = layer.aggregation;
        }
        return {
          mark: buildMark(layer.plotType, layer.opacity, layer.markSize, layer.markShape),
          encoding: {
            x: { field: xField, type: xType, axis: { title: controls.xLabel } },
            y: yEncoding,
            color: {
              field: 'Legend',
              type: 'nominal',
              scale: { domain: legendDomain, range: legendRange },
              legend: { title: 'Layer' }
            },
            tooltip: [
              { field: xField, type: xType },
              { field: 'Legend', type: 'nominal' },
              {
                field: 'value',
                type: yType,
                ...(layer.aggregation ? { aggregate: layer.aggregation, title: `${layer.aggregation}(value)` } : {})
              }
            ]
          },
          transform: [
            { filter: `datum.Legend === '${layer.yAxis}'` }
          ]
        };
      })
    };
  }

  // Standardfall ohne Legende (Layering wie bisher)
  const spec: any = {
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
  
  spec.layer = controls.layers.map((layer: any) => {
    const xType = columnInfo[layer.xAxis]?.type || 'nominal';
    const yType = columnInfo[layer.yAxis]?.type || 'quantitative';
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
export function handleCsvData(
  data: any,
  cols: any,
  setCsvData: any,
  setColumns: any,
  setColumnInfo: any,
  setControls: any,
  setVegaSpecError: any
): void {
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
  setControls((prev: any) => ({
    ...prev,
    layers: [defaultLayer],
    width: prev.width && prev.width > 0 ? prev.width : 900,
    height: prev.height && prev.height > 0 ? prev.height : 500
  }));
  setVegaSpecError(null);
} 