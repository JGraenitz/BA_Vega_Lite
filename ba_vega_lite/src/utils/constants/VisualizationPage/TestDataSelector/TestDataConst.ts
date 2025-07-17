import { companyData2023 } from './companyData2023';
import { weatherData } from './weatherData';
import { salesData } from './salesData';
import { TestDataset } from "../../../interfaces/VisualizationPage/TestDataSelector/TestDataSelectorProps";

export const testDatasets: TestDataset[] = [
  weatherData,
  companyData2023,
  salesData
];

/**
 * Sucht ein Testdatenset anhand seiner ID.
 * @param id Die ID des gewünschten Testdatensatzes
 * @returns Das gefundene TestDataset oder undefined, falls nicht gefunden
 */
export const getTestDatasetById = (id: string): TestDataset | undefined => {
  return testDatasets.find(dataset => dataset.id === id);
};
