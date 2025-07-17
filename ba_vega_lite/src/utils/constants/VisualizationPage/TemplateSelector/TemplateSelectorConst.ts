import { VisualizationTemplate } from '../../../interfaces/VisualizationPage/TemplateSelector/TemplateSelectorProps';

export const visualizationTemplates: VisualizationTemplate[] = [
  {
    id: 'bar-chart',
    name: 'Balkendiagramm',
    description: 'Klassisches Balkendiagramm für Kategorien und Werte',
    icon: 'B',
    layers: [
      {
        id: Date.now(),
        xAxis: '',
        yAxis: '',
        aggregation: '',
        plotType: 'bar',
        color: '#4f6d9a',
        opacity: 0.8,
        markSize: 30,
        markShape: 'circle'
      }
    ],
    markSize: 30,
    markShape: 'circle',
    xLabel: '',
    yLabel: '',
    width: 600,
    height: 400,
    dateFilter: { start: '', end: '' }
  },
  {
    id: 'line-chart',
    name: 'Liniendiagramm',
    description: 'Zeitreihen und Trends über die Zeit',
    icon: 'L',
    layers: [
      {
        id: Date.now(),
        xAxis: '',
        yAxis: '',
        aggregation: '',
        plotType: 'line',
        color: '#4f6d9a',
        opacity: 0.8,
        markSize: 30,
        markShape: 'circle'
      }
    ],
    markSize: 30,
    markShape: 'circle',
    xLabel: '',
    yLabel: '',
    width: 600,
    height: 400,
    dateFilter: { start: '', end: '' }
  },
  {
    id: 'scatter-plot',
    name: 'Streudiagramm',
    description: 'Korrelationen zwischen zwei numerischen Variablen',
    icon: 'S',
    layers: [
      {
        id: Date.now(),
        xAxis: '',
        yAxis: '',
        aggregation: '',
        plotType: 'point',
        color: '#4f6d9a',
        opacity: 0.8,
        markSize: 30,
        markShape: 'circle'
      }
    ],
    markSize: 30,
    markShape: 'circle',
    xLabel: '',
    yLabel: '',
    width: 600,
    height: 400,
    dateFilter: { start: '', end: '' }
  },

  {
    id: 'multi-line',
    name: 'Multi-Linien',
    description: 'Mehrere Linien in einem Diagramm',
    icon: 'ML',
    layers: [
      {
        id: Date.now(),
        xAxis: '',
        yAxis: '',
        aggregation: '',
        plotType: 'line',
        color: '#4f6d9a',
        opacity: 0.8,
        markSize: 30,
        markShape: 'circle'
      },
      {
        id: Date.now() + 1,
        xAxis: '',
        yAxis: '',
        aggregation: '',
        plotType: 'line',
        color: '#e74c3c',
        opacity: 0.8,
        markSize: 30,
        markShape: 'circle'
      }
    ],
    markSize: 30,
    markShape: 'circle',
    xLabel: '',
    yLabel: '',
    width: 600,
    height: 400,
    dateFilter: { start: '', end: '' }
  }
];

/**
 * Sucht eine Visualisierungsvorlage anhand ihrer ID.
 * @param id Die ID der gewünschten Vorlage
 * @returns Die gefundene VisualizationTemplate oder undefined, falls nicht gefunden
 */
export const getTemplateById = (id: string): VisualizationTemplate | undefined => {
  return visualizationTemplates.find(template => template.id === id);
};

/**
 * Wendet eine Visualisierungsvorlage auf die aktuellen Spalten an und erzeugt daraus ein Controls-Objekt.
 * Dabei werden die Layer der Vorlage mit den übergebenen Spaltennamen befüllt und erhalten neue IDs.
 * @param template Die ausgewählte Visualisierungsvorlage
 * @param columns Die aktuellen Spaltennamen aus den Daten
 * @returns Ein Controls-Objekt, das für die Steuerung der Visualisierung genutzt werden kann
 */
export const applyTemplateToControls = (template: VisualizationTemplate, columns: string[]): any => {
  const controls = { ...template };
  
  // Automatisch erste Spalten zuweisen, falls verfügbar
  if (columns.length > 0) {
    controls.layers = controls.layers.map((layer: any, index: number) => ({
      ...layer,
      id: Date.now() + index,
      xAxis: columns[0] || '',
      yAxis: columns[1] || columns[0] || ''
    }));
  } else {
    // IDs für alle Layer generieren, auch wenn keine Spalten verfügbar sind
    controls.layers = controls.layers.map((layer: any, index: number) => ({
      ...layer,
      id: Date.now() + index
    }));
  }
  
  return controls;
};