export interface VisualizationPageProps {
    csvData: any;
    handleUploadedCsvData: (data: any, columns: any) => void;
    columns: any[];
    columnInfo: any;
    controls: any;
    filteredData: any[];
    setError: (error: any) => void;
    handleControlsApply: (controls: any) => void;
    parsedSpec: any;
    darkMode: boolean;
  }

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
  
export interface DataUploaderProps {
  onData: (data: any, columns: any, fileName?: string) => void;
  onError: (error: string) => void;
  fileName?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  darkMode?: boolean;
  } 

export interface VegaLiteChartProps {
    spec: any;
    data: any[];
    columns: any[];
    columnInfo: any;
    width: any;
    height: any;
  }  
  