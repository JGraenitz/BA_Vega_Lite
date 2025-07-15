export interface VisualizationTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  layers: any[];
  markSize: number;
  markShape: string;
  xLabel: string;
  yLabel: string;
  width: number;
  height: number;
  dateFilter: { start: string; end: string };
}

export interface TemplateSelectorProps {
  onTemplateSelect: (template: VisualizationTemplate) => void;
}

 