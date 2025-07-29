// Konstanten für Vega-Lite Utils
export const VEGA_SCHEMA_URL = 'https://vega.github.io/schema/vega-lite/v5.json';
export const LEGEND_ERROR_DESCRIPTION = 'Legende kann nicht angezeigt werden, wenn ein Datumsfeld auf der Y-Achse liegt.';
export const LEGEND_ERROR_TEXT = 'Legende ist deaktiviert: Datumsfeld auf Y-Achse nicht unterstützt.';
export const LEGEND_ERROR_FONT_SIZE = 32;
export const LEGEND_ERROR_X = 30;
export const LEGEND_ERROR_Y = 250;
export const LEGEND_ERROR_COLOR = 'red';
export const LEGEND_ERROR_AXIS_FONT_SIZE = 30;
export const LEGEND_ERROR_AXIS_TITLE_SIZE = 30;
export const DEFAULT_AXIS_LABEL_FONT_SIZE = 13;
export const DEFAULT_AXIS_TITLE_FONT_SIZE = 15;
export const DEFAULT_VIEW_STROKE = 'transparent';
export const DEFAULT_WIDTH = 900;
export const DEFAULT_HEIGHT = 500;
export const DEFAULT_Y_LABEL = 'Wert';
export const DEFAULT_X_TYPE = 'nominal';
export const DEFAULT_Y_TYPE = 'quantitative';

// Bekannte Ordinalskalen für automatische Typ-Erkennung
export const knownOrdinals = [
  ["sehr schlecht", "schlecht", "mittel", "gut", "sehr gut"],
  ["klein", "mittel", "groß"],
  ["niedrig", "mittel", "hoch"],
  ["unzufrieden", "neutral", "zufrieden"],
  ["stark", "mittel", "schwach"],
];

export const LEGEND_ERROR_SPEC = {
  $schema: VEGA_SCHEMA_URL,
  description: LEGEND_ERROR_DESCRIPTION,
  width: 500,
  height: 500,
  data: { name: 'table' },
  mark: { type: 'text', fontSize: LEGEND_ERROR_FONT_SIZE, align: 'left', baseline: 'middle' },
  encoding: {
    text: { value: LEGEND_ERROR_TEXT },
    x: { value: LEGEND_ERROR_X },
    y: { value: LEGEND_ERROR_Y },
    color: { value: LEGEND_ERROR_COLOR }
  },
  config: {
    axis: { labelFontSize: LEGEND_ERROR_AXIS_FONT_SIZE, titleFontSize: LEGEND_ERROR_AXIS_TITLE_SIZE },
    view: { stroke: DEFAULT_VIEW_STROKE },
  },
};

export const DEFAULT_LAYER_TEMPLATE = {
    aggregation: '',
    plotType: 'bar',
    color: '#4f6d9a',
    opacity: 0.8,
    markSize: 30,
    markShape: 'circle'
  };

export const DEFAULT_VEGA_TEMPLATE = {
  layers: [],
  markSize: 30,
  markShape: 'circle',
  xLabel: '',
  yLabel: '',
  width: 1000,
  height: 400,
  dateFilter: { start: '', end: '' },
}  


