import { VEGA_SCHEMA_URL, LEGEND_ERROR_SPEC } from "../constants/VegaLiteUtilsConst";

import {DEFAULT_AXIS_LABEL_FONT_SIZE, DEFAULT_AXIS_TITLE_FONT_SIZE, DEFAULT_VIEW_STROKE, DEFAULT_X_TYPE, DEFAULT_Y_LABEL,
  DEFAULT_Y_TYPE, DEFAULT_LAYER_TEMPLATE } from "../constants/VegaLiteUtilsConst";  

import { knownOrdinals } from "../constants/VegaLiteUtilsConst"; 


/**
 * Prüft, ob ein Array von Werten einer bekannten Ordinalskala entspricht.
 * @param values Array von Werten
 * @returns true, wenn alle Werte in einer bekannten Skala enthalten sind
 */
function isKnownOrdinal(values: any): boolean {
  for (const scale of knownOrdinals) {
    // Prüfe, ob alle Werte in der Skala enthalten sind (Reihenfolge egal)
    if (values.every((v: any) => scale.includes(v))) {
      return true;
    }
  }
  return false;
}

/**
 * Analysiert die Spalten einer Daten-Tabelle und bestimmt den Typ jeder Spalte (quantitativ, temporal, ordinal, nominal).
 * @param data Array von Datenobjekten (z.B. aus CSV)
 * @param columns Array der Spaltennamen
 * @returns Objekt mit Spaltennamen als Schlüssel und Typ-Informationen als Wert
 */
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

/**
 * Baut ein Encoding-Objekt für Vega-Lite für eine Achse oder ein Feld.
 * @param field Name des Datenfelds
 * @param type Vega-Lite Typ ('quantitative', 'temporal', ...)
 * @param title Achsentitel
 * @param aggregation (optional) Aggregationsfunktion (z.B. 'sum')
 * @returns Encoding-Objekt für Vega-Lite
 */
export function buildEncoding(
  field: any, 
  type: any, 
  title: any, 
  aggregation: any = null
): any {
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

/**
 * Baut ein Mark-Objekt für Vega-Lite (z.B. Balken, Linie, Punkt).
 * @param plotType Typ des Marks ('bar', 'line', 'point', ...)
 * @param opacity Transparenzwert
 * @param markSize Größe (für Punkt-/Kreisdiagramme)
 * @param markShape Form (z.B. 'circle', 'square')
 * @returns Mark-Objekt für Vega-Lite
 */
export function buildMark(
  plotType: any, 
  opacity: any, 
  markSize: any, 
  markShape: any 
): any {
  let mark: any = { type: plotType, opacity };
  if (['point', 'circle', 'square'].includes(plotType)) {
    mark.size = markSize;
  }
  if (plotType === 'point') {
    mark.shape = markShape;
  }
  return mark;
}

/**
 * Erzeugt das Tooltip-Array für einen Legenden-Layer.
 * @param xField Name des X-Datenfelds
 * @param xType Vega-Lite Typ der X-Achse
 * @param yType Vega-Lite Typ der Y-Achse (meist quantitativ)
 * @param aggregation (optional) Aggregationsfunktion (z.B. 'sum')
 * @returns Tooltip-Array für Vega-Lite
 */
function buildLegendTooltip(
  xField: string, 
  xType: string, 
  yType: string, 
  aggregation?: string
) {
  return [
    { field: xField, type: xType },
    { field: 'Legend', type: 'nominal' },
    {
      field: 'value',
      type: yType,
      ...(aggregation ? { aggregate: aggregation, title: `${aggregation}(value)` } : {})
    }
  ];
}

/**
 * Erzeugt das Tooltip-Array für einen Standard-Layer.
 * @param xField Name des X-Datenfelds
 * @param xType Vega-Lite Typ der X-Achse
 * @param yField Name des Y-Datenfelds
 * @param yType Vega-Lite Typ der Y-Achse
 * @param aggregation (optional) Aggregationsfunktion (z.B. 'sum')
 * @returns Tooltip-Array für Vega-Lite
 */
function buildStandardTooltip(
  xField: string, 
  xType: string, 
  yField: string, 
  yType: string, 
  aggregation?: string
) {
  return [
    { field: xField, type: xType },
    {
      field: yField,
      type: yType,
      ...(aggregation && yType === DEFAULT_Y_TYPE ? {
        aggregate: aggregation,
        title: `${aggregation}(${yField})`
      } : {})
    }
  ];
}

/**
 * Baut das vollständige encoding-Objekt für einen Legenden-Layer.
 * @param xField Name des X-Datenfelds
 * @param xType Vega-Lite Typ der X-Achse
 * @param xTitle Achsentitel X
 * @param yType Vega-Lite Typ der Y-Achse
 * @param yTitle Achsentitel Y
 * @param aggregation (optional) Aggregationsfunktion
 * @param colorObj Color-Encoding-Objekt
 * @param tooltip Tooltip-Array
 * @returns encoding-Objekt für Vega-Lite (Legende)
 */
function buildLegendEncoding(
  xField: string, 
  xType: string, 
  xTitle: string, 
  yType: string, 
  yTitle: string, 
  aggregation: any, 
  colorObj: any
) {
  return {
    x: buildEncoding(xField, xType, xTitle),
    y: buildEncoding('value', yType, yTitle, aggregation),
    color: colorObj,
    tooltip: buildLegendTooltip(xField, xType, yType, aggregation)
  };
}

/**
 * Baut das vollständige encoding-Objekt für einen Standard-Layer.
 * @param xField Name des X-Datenfelds
 * @param xType Vega-Lite Typ der X-Achse
 * @param xTitle Achsentitel X
 * @param yField Name des Y-Datenfelds
 * @param yType Vega-Lite Typ der Y-Achse
 * @param yTitle Achsentitel Y
 * @param aggregation (optional) Aggregationsfunktion
 * @param colorObj Color-Encoding-Objekt
 * @param tooltip Tooltip-Array
 * @returns encoding-Objekt für Vega-Lite (Standard)
 */
function buildStandardEncoding(
  xField: string, 
  xType: string, 
  xTitle: string, 
  yField: string, 
  yType: string, 
  yTitle: string, 
  aggregation: any, 
  colorObj: any
) {
  return {
    x: buildEncoding(xField, xType, xTitle),
    y: buildEncoding(yField, yType, yTitle, aggregation),
    color: colorObj,
    tooltip: buildStandardTooltip(xField, xType, yField, yType, aggregation)
  };
}

/**
 * Baut ein Vega-Lite-Layer-Objekt für einen Legenden-Layer.
 * @param layer Layer-Konfiguration
 * @param i Index des Layers
 * @param controls Steuerungsobjekt (z.B. Achsentitel)
 * @param columnInfo Spalten-Typinformationen
 * @param legendNames Namen für die Legende
 * @param legendDomain Domain für die Farblegende
 * @param legendRange Range für die Farblegende
 * @param xField Name des X-Datenfelds
 * @param xType Vega-Lite Typ der X-Achse
 * @returns Vega-Lite Layer-Objekt mit Legende
 */
function buildSingleLegendLayer(
  layer: any, 
  i: number, 
  controls: any, 
  columnInfo: any, 
  legendNames: string[], 
  legendDomain: string[], 
  legendRange: string[], 
  xField: string, 
  xType: string
) {
  const legendName = legendNames[i];
  const yType = DEFAULT_Y_TYPE;
  return {
    mark: buildMark(layer.plotType, layer.opacity, layer.markSize, layer.markShape),
    encoding: buildLegendEncoding(xField, xType, controls.xLabel, yType, controls.yLabel || DEFAULT_Y_LABEL, layer.aggregation,
      {
        field: 'Legend',
        type: 'nominal',
        scale: { domain: legendDomain, range: legendRange },
        legend: { title: 'Legende' }
      }
    ),
    transform: [
      { filter: `datum.Legend === '${legendName}'` }
    ]
  };
}

/**
 * Baut alle Vega-Lite-Layer-Objekte für die Legenden-Darstellung.
 * @param controls Steuerungsobjekt
 * @param columnInfo Spalten-Typinformationen
 * @returns Array von Vega-Lite Layer-Objekten mit Legende
 */
function buildLegendLayers(controls: any, columnInfo: any) {
  const { legendNames, legendDomain, legendRange } = getLegendMeta(controls);
  const xField = controls.layers[0]?.xAxis || '';
  const xType = columnInfo[xField]?.type || DEFAULT_X_TYPE;
  return controls.layers.map((layer: any, i: number) =>
    buildSingleLegendLayer(layer, i, controls, columnInfo, legendNames, legendDomain, legendRange, xField, xType)
  );
}

/**
 * Baut ein Vega-Lite-Layer-Objekt für einen Standard-Layer (ohne Legende).
 * @param layer Layer-Konfiguration
 * @param controls Steuerungsobjekt
 * @param columnInfo Spalten-Typinformationen
 * @returns Vega-Lite Layer-Objekt ohne Legende
 */
function buildSingleStandardLayer(layer: any, controls: any, columnInfo: any) {
  const xType = columnInfo[layer.xAxis]?.type || DEFAULT_X_TYPE;
  const yType = columnInfo[layer.yAxis]?.type || DEFAULT_Y_TYPE;
  return {
    mark: buildMark(layer.plotType, layer.opacity, layer.markSize, layer.markShape),
    encoding: buildStandardEncoding(layer.xAxis, xType, controls.xLabel, layer.yAxis, yType, controls.yLabel || layer.yAxis, layer.aggregation,
      { value: layer.color }
    )
  };
}

/**
 * Baut alle Vega-Lite-Layer-Objekte für die Standarddarstellung (ohne Legende).
 * @param controls Steuerungsobjekt
 * @param columnInfo Spalten-Typinformationen
 * @returns Array von Vega-Lite Layer-Objekten ohne Legende
 */
function buildStandardLayers(controls: any, columnInfo: any) {
  return controls.layers.map((layer: any) => buildSingleStandardLayer(layer, controls, columnInfo));
}

/**
 * Erzeugt Metadaten für die Legende (Namen, Domain, Range) basierend auf den Layern.
 * @param controls Steuerungsobjekt mit Layer-Informationen
 * @returns Objekt mit legendNames, legendDomain und legendRange
 */
function getLegendMeta(controls: any) {
  const legendNames: string[] = controls.layers.map((layer: any, i: number) => `${layer.yAxis} (Layer ${i + 1})`);
  const legendDomain: string[] = legendNames;
  const legendRange: string[] = controls.layers.map((layer: any) => layer.color);
  return { legendNames, legendDomain, legendRange };
}

/**
 * Generiert ein vollständiges Vega-Lite-Spec-Objekt basierend auf den Steuerelementen und Spalteninfos.
 * Behandelt sowohl Standard-Layer als auch Legenden-Layer und prüft auf Fehlerfälle.
 * @param controls Steuerungsobjekt (z.B. Layer, Achsentitel, Breite/Höhe, Legenden-Option)
 * @param columnInfo Spalten-Typinformationen (z.B. von analyzeColumns)
 * @returns Vega-Lite-Spec-Objekt oder LEGEND_ERROR_SPEC bei Fehler
 */
export function generateVegaLiteSpec(controls: any, columnInfo: any): any {
  if (controls.showLegend && controls.layers.some((layer: any) => columnInfo[layer.yAxis]?.type === 'temporal')) {
    return LEGEND_ERROR_SPEC;
  }
  const spec: any = {
    $schema: VEGA_SCHEMA_URL,
    description: `Diagramm erstellt mit ${controls.showLegend ? 'Legende' : 'Standartlayern'}`,
    data: { name: 'table' },
    config: {
      axis: { labelFontSize: DEFAULT_AXIS_LABEL_FONT_SIZE, titleFontSize: DEFAULT_AXIS_TITLE_FONT_SIZE },
      view: { stroke: DEFAULT_VIEW_STROKE },
    },
    layer: controls.showLegend
      ? buildLegendLayers(controls, columnInfo)
      : buildStandardLayers(controls, columnInfo),
  };

  return spec;
}

/**
 * Verarbeitet die hochgeladenen CSV-Daten und setzt alle relevanten States.
 * @param {Array} data - Die CSV-Daten als Array von Objekten
 * @param {Array} cols - Die Spaltennamen
 * @param {Function} setCsvData Callback zum Setzen der Daten
 * @param {Function} setColumns Callback zum Setzen der Spalten
 * @param {Function} setColumnInfo Callback zum Setzen der Spalten-Typinfos
 * @param {Function} setControls Callback zum Setzen der Steuerelemente
 * @param {Function} setVegaSpecError Callback für Fehlerbehandlung
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
  setColumnInfo(analyzeColumns(data, cols));
  // Erstelle Standard-Layer
  const defaultLayer = {
    ...DEFAULT_LAYER_TEMPLATE,
    id: Date.now(),
    xAxis: cols[0] || '',
    yAxis: cols[1] || cols[0] || ''
  };
  // Setze Standard-Steuerung
  setControls((prev: any) => ({ ...prev, layers: [defaultLayer] }));
  setVegaSpecError(null);
} 