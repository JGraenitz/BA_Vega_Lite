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
  }


  