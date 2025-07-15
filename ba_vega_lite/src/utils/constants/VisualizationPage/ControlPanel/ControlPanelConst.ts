
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