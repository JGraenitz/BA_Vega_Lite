import { companyData2023 } from './companyData2023';
import { weatherData } from './weatherData';
import { salesData } from './salesData';
import { TestDataset } from "../../../interfaces/VisualizationPage/TestDataSelector/TestDataSelectorProps";

export const testDatasets: TestDataset[] = [
  weatherData,
  companyData2023,
  salesData
];

export const getTestDatasetById = (id: string): TestDataset | undefined => {
  return testDatasets.find(dataset => dataset.id === id);
};
