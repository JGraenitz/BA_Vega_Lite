export interface TestDataset {
  id: string;
  name: string;
  description: string;
  icon: string;
  data: any[];
  columns: string[];
}

export interface TestDataSelectorProps {
  onDatasetSelect: (dataset: TestDataset) => void;
}

