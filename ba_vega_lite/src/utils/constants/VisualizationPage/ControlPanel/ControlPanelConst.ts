
export const aggregations = [
    { value: '', label: 'Keine Aggregation' },
    { value: 'sum', label: 'Summe' },
    { value: 'mean', label: 'Durchschnitt' },
    { value: 'median', label: 'Median' },
    { value: 'count', label: 'Anzahl' },
    { value: 'min', label: 'Minimum' },
    { value: 'max', label: 'Maximum' },
];

export const plotTypes = [
    { value: 'bar', label: 'Balkendiagramm' },
    { value: 'line', label: 'Liniendiagramm' },
    { value: 'point', label: 'Streudiagramm' },
    { value: 'area', label: 'Flächendiagramm' },
    { value: 'tick', label: 'Ticks' },
    /*{ value: 'pie', label: 'Kuchendiagramm' },*/
];

export const markShapes = [
    { value: 'circle', label: 'Kreis' },
    { value: 'square', label: 'Quadrat' },
    { value: 'diamond', label: 'Diamant' },
    { value: 'triangle', label: 'Dreieck' },
    { value: 'cross', label: 'Kreuz' },
];

// Farbgenerator-Funktion
export const generateRandomColor = (): string => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
      '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
      '#F9E79F', '#ABEBC6', '#FAD7A0', '#D5A6BD', '#A9CCE3',
      '#F7DC6F', '#A2D9CE', '#F5B7B1', '#AED6F1', '#D2B4DE',
      '#FDEAA8', '#A9DFBF', '#F8C9C9', '#A3E4D7', '#D7BDE2'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };