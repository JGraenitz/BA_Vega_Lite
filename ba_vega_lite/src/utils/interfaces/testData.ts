export interface TestDataset {
  id: string;
  name: string;
  description: string;
  icon: string;
  data: any[];
  columns: string[];
  recommendedTemplate: string;
}

export const testDatasets: TestDataset[] = [
  {
    id: 'weather-data',
    name: 'Wetterdaten Seattle',
    description: 'Temperatur- und Niederschlagsdaten über ein Jahr',
    icon: '⛅',
    data: [
      { date: '2012-01-01', precipitation: 0.0, temp_max: 12.8, temp_min: 5.0, wind: 4.7, weather: 'drizzle' },
      { date: '2012-01-02', precipitation: 10.9, temp_max: 10.6, temp_min: 2.8, wind: 4.5, weather: 'rain' },
      { date: '2012-01-03', precipitation: 0.8, temp_max: 11.7, temp_min: 7.2, wind: 2.3, weather: 'rain' },
      { date: '2012-01-04', precipitation: 20.3, temp_max: 12.2, temp_min: 5.6, wind: 4.7, weather: 'rain' },
      { date: '2012-01-05', precipitation: 1.3, temp_max: 8.9, temp_min: 2.8, wind: 6.1, weather: 'rain' },
      { date: '2012-01-06', precipitation: 2.5, temp_max: 4.4, temp_min: 2.2, wind: 2.2, weather: 'rain' },
      { date: '2012-01-07', precipitation: 0.0, temp_max: 7.2, temp_min: 2.8, wind: 2.3, weather: 'rain' },
      { date: '2012-01-08', precipitation: 0.0, temp_max: 10.0, temp_min: 2.8, wind: 2.0, weather: 'sun' },
      { date: '2012-01-09', precipitation: 4.3, temp_max: 9.4, temp_min: 5.0, wind: 3.4, weather: 'rain' },
      { date: '2012-01-10', precipitation: 1.0, temp_max: 6.1, temp_min: 0.6, wind: 3.4, weather: 'rain' },
      { date: '2012-01-11', precipitation: 0.0, temp_max: 6.1, temp_min: -1.1, wind: 5.1, weather: 'sun' },
      { date: '2012-01-12', precipitation: 0.0, temp_max: 6.1, temp_min: -1.7, wind: 1.9, weather: 'sun' },
      { date: '2012-01-13', precipitation: 0.0, temp_max: 5.0, temp_min: -2.8, wind: 1.3, weather: 'sun' },
      { date: '2012-01-14', precipitation: 4.1, temp_max: 4.4, temp_min: 0.6, wind: 5.3, weather: 'snow' },
      { date: '2012-01-15', precipitation: 5.3, temp_max: 1.1, temp_min: -3.3, wind: 3.2, weather: 'snow' },
      { date: '2012-01-16', precipitation: 2.5, temp_max: 1.7, temp_min: -2.8, wind: 5.0, weather: 'snow' },
      { date: '2012-01-17', precipitation: 8.1, temp_max: 3.3, temp_min: 0.0, wind: 5.6, weather: 'snow' },
      { date: '2012-01-18', precipitation: 19.8, temp_max: 0.0, temp_min: -2.8, wind: 5.0, weather: 'snow' },
      { date: '2012-01-19', precipitation: 15.2, temp_max: -1.1, temp_min: -2.8, wind: 1.6, weather: 'snow' },
      { date: '2012-01-20', precipitation: 13.5, temp_max: 7.2, temp_min: -1.1, wind: 2.3, weather: 'snow' },
      { date: '2012-01-21', precipitation: 3.0, temp_max: 8.3, temp_min: 3.3, wind: 8.2, weather: 'rain' },
      { date: '2012-01-22', precipitation: 6.1, temp_max: 6.7, temp_min: 2.2, wind: 4.8, weather: 'rain' },
      { date: '2012-01-23', precipitation: 0.0, temp_max: 8.3, temp_min: 1.1, wind: 3.6, weather: 'rain' },
      { date: '2012-01-24', precipitation: 8.6, temp_max: 10.0, temp_min: 2.2, wind: 5.1, weather: 'rain' },
      { date: '2012-01-25', precipitation: 8.1, temp_max: 8.9, temp_min: 4.4, wind: 5.4, weather: 'rain' },
      { date: '2012-01-26', precipitation: 4.8, temp_max: 8.9, temp_min: 1.1, wind: 4.8, weather: 'rain' },
      { date: '2012-01-27', precipitation: 0.0, temp_max: 6.7, temp_min: -2.2, wind: 1.4, weather: 'drizzle' },
      { date: '2012-01-28', precipitation: 0.0, temp_max: 6.7, temp_min: 0.6, wind: 2.2, weather: 'rain' },
      { date: '2012-01-29', precipitation: 27.7, temp_max: 9.4, temp_min: 3.9, wind: 4.5, weather: 'rain' },
      { date: '2012-01-30', precipitation: 3.6, temp_max: 8.3, temp_min: 6.1, wind: 5.1, weather: 'rain' },
      { date: '2012-01-31', precipitation: 1.8, temp_max: 9.4, temp_min: 6.1, wind: 3.9, weather: 'rain' }
    ],
    columns: ['date', 'precipitation', 'temp_max', 'temp_min', 'wind', 'weather'],
    recommendedTemplate: 'line-chart'
  },
  {
    id: 'company-data',
    name: 'Unternehmensdaten',
    description: 'Marktkapitalisierung und Umsatz der größten Unternehmen',
    icon: '🏢',
    data: [
      { company: 'Microsoft', market_cap: 3142.04, revenue: 227.58 },
      { company: 'Apple', market_cap: 2638.25, revenue: 385.71 },
      { company: 'NVIDIA', market_cap: 2314.03, revenue: 60.92 },
      { company: 'Alphabet', market_cap: 1879.86, revenue: 307.39 },
      { company: 'Amazon', market_cap: 1866.72, revenue: 574.79 },
      { company: 'Meta', market_cap: 1282.40, revenue: 134.90 },
      { company: 'Berkshire Hathaway', market_cap: 891.67, revenue: 439.34 },
      { company: 'Eli Lilly', market_cap: 735.08, revenue: 34.12 },
      { company: 'TSMC', market_cap: 723.02, revenue: 70.35 },
      { company: 'Broadcom', market_cap: 626.35, revenue: 38.87 },
      { company: 'Visa', market_cap: 581.20, revenue: 33.35 },
      { company: 'Novo Nordisk', market_cap: 580.33, revenue: 34.41 },
      { company: 'JPMorgan Chase', market_cap: 563.77, revenue: 158.10 },
      { company: 'Tesla', market_cap: 549.79, revenue: 96.77 },
      { company: 'Walmart', market_cap: 488.08, revenue: 648.13 }
    ],
    columns: ['company', 'market_cap', 'revenue'],
    recommendedTemplate: 'bar-chart'
  },
  {
    id: 'sales-data',
    name: 'Verkaufsdaten',
    description: 'Monatliche Verkaufszahlen verschiedener Produkte',
    icon: '📈',
    data: [
      { month: 'Jan', product_a: 120, product_b: 85, product_c: 95 },
      { month: 'Feb', product_a: 135, product_b: 92, product_c: 88 },
      { month: 'Mar', product_a: 145, product_b: 78, product_c: 102 },
      { month: 'Apr', product_a: 160, product_b: 105, product_c: 115 },
      { month: 'May', product_a: 175, product_b: 118, product_c: 125 },
      { month: 'Jun', product_a: 190, product_b: 125, product_c: 135 },
      { month: 'Jul', product_a: 185, product_b: 132, product_c: 128 },
      { month: 'Aug', product_a: 200, product_b: 140, product_c: 145 },
      { month: 'Sep', product_a: 210, product_b: 148, product_c: 155 },
      { month: 'Oct', product_a: 225, product_b: 155, product_c: 165 },
      { month: 'Nov', product_a: 240, product_b: 162, product_c: 175 },
      { month: 'Dec', product_a: 255, product_b: 170, product_c: 185 }
    ],
    columns: ['month', 'product_a', 'product_b', 'product_c'],
    recommendedTemplate: 'multi-line'
  },
  {
    id: 'correlation-data',
    name: 'Korrelationsdaten',
    description: 'Beziehung zwischen Alter und Einkommen',
    icon: '🔍',
    data: [
      { age: 25, income: 35000, experience: 2, education: 12 },
      { age: 28, income: 42000, experience: 5, education: 14 },
      { age: 30, income: 48000, experience: 7, education: 16 },
      { age: 32, income: 55000, experience: 9, education: 16 },
      { age: 35, income: 62000, experience: 12, education: 18 },
      { age: 38, income: 68000, experience: 15, education: 18 },
      { age: 40, income: 75000, experience: 17, education: 20 },
      { age: 42, income: 82000, experience: 19, education: 20 },
      { age: 45, income: 88000, experience: 22, education: 22 },
      { age: 48, income: 95000, experience: 25, education: 22 },
      { age: 50, income: 102000, experience: 27, education: 24 },
      { age: 52, income: 108000, experience: 29, education: 24 },
      { age: 55, income: 115000, experience: 32, education: 26 },
      { age: 58, income: 122000, experience: 35, education: 26 },
      { age: 60, income: 128000, experience: 37, education: 28 }
    ],
    columns: ['age', 'income', 'experience', 'education'],
    recommendedTemplate: 'scatter-plot'
  }
];

export const getTestDatasetById = (id: string): TestDataset | undefined => {
  return testDatasets.find(dataset => dataset.id === id);
};

export const getRecommendedTemplateForDataset = (dataset: TestDataset): string => {
  return dataset.recommendedTemplate;
}; 