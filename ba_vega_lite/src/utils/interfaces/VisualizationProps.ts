export interface VisualizationPageProps {
    csvData: any;
    handleCsvData: (data: any, columns: any) => void;
    columns: any[];
    columnInfo: any;
    controls: any;
    filteredData: any[];
    setError: (error: any) => void;
    handleControlsApply: (controls: any) => void;
    parsedSpec: any;
    darkMode: boolean;
  }

export interface ControlPanelProps {
    columns: any[];
    columnInfo: any;
    layers?: any[];
    markSize?: number;
    markShape?: string;
    xLabel?: string;
    yLabel?: string;
    width?: number;
    height?: number;
    dateFilter?: any;
    onApply: (controls: any) => void;
    darkMode?: boolean;
  }
  
export interface DataUploaderProps {
    onData: (data: any, columns: any) => void;
    onError: (error: string) => void;
  } 

export interface VegaLiteChartProps {
    spec: any;
    data: any[];
    columns: any[];
    columnInfo: any;
    width: any;
    height: any;
  }  
  