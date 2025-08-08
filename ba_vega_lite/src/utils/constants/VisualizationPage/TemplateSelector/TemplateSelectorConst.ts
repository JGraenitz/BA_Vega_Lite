import { VisualizationTemplate } from '../../../interfaces/VisualizationPage/TemplateSelector/TemplateSelectorProps';
import { v4 as uuidv4 } from 'uuid';

export const visualizationTemplates: VisualizationTemplate[] = [
  {
    id: 'bar-chart',
    name: 'Balkendiagramm',
    description: 'Klassisches Balkendiagramm für Kategorien und Werte',
    icon: 'B',
    layers: [
      {
        id: uuidv4(),
        xAxis: '',
        yAxis: 'value1',
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
        id: uuidv4(),
        xAxis: '',
        yAxis: 'value1',
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
        id: uuidv4(),
        xAxis: '',
        yAxis: 'value1',
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
        id: uuidv4(),
        xAxis: '',
        yAxis: 'value1', 
        aggregation: '',
        plotType: 'line',
        color: '#4f6d9a',
        opacity: 0.8,
        markSize: 30,
        markShape: 'circle'
      },
      {
        id: uuidv4(),
        xAxis: '',
        yAxis: 'value2',  
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
