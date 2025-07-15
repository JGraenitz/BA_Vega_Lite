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

export const getTemplateById = (id: string): VisualizationTemplate | undefined => {
  return visualizationTemplates.find(template => template.id === id);
};

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