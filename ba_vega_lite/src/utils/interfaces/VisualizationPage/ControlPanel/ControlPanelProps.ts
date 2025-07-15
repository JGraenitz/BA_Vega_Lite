export interface LayerConfig {
  id: any;
  xAxis: string;
  yAxis: string;
  aggregation?: string;
  plotType: string;
  color: string;
  opacity: number;
  markSize?: number;
  markShape?: string;
  colorField?: string;
} 

export interface ControlPanelProps {
    columns: any[];
    columnInfo: any;
    layers?: LayerConfig[];
    markSize?: number;
    markShape?: string;
    xLabel?: string;
    yLabel?: string;
    width?: number;
    height?: number;
    dateFilter?: any;
    onApply: (controls: any) => void;
    darkMode?: boolean;
    showLegend?: boolean;
  }