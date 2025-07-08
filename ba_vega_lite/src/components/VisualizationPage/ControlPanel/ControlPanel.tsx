import React, { useState, useEffect } from 'react';
import { ControlPanelProps } from '../../../utils/interfaces/VisualizationProps';
import './ControlPanel.css';


/**
 * ControlPanel Komponente
 * Stellt die Steuerung für die Visualisierung mit Layern, Achsen, Diagrammtypen, Aggregationen usw. bereit.
 * Nutzt lokalen State und einen 'Übernehmen'-Button, um Änderungen anzuwenden.
 * Props:
 *   - columns, columnInfo
 *   - Initialwerte für alle Steuerelemente
 *   - onApply: Funktion({ layers, markSize, markShape, xLabel, yLabel, width, height, dateFilter })
 */
function ControlPanel({
  columns,
  columnInfo,
  layers: initialLayers = [],
  markSize: initialMarkSize = 30,
  markShape: initialMarkShape = 'circle',
  xLabel: initialXLabel,
  yLabel: initialYLabel,
  width: initialWidth,
  height: initialHeight,
  dateFilter: initialDateFilter,
  onApply,
  darkMode = false
}: ControlPanelProps) {
  // Lokaler State für alle Steuerelemente
  const [layers, setLayers] = useState(initialLayers);
  const [markSize, setMarkSize] = useState(initialMarkSize);
  const [markShape, setMarkShape] = useState(initialMarkShape);
  const [xLabel, setXLabel] = useState(initialXLabel);
  const [yLabel, setYLabel] = useState(initialYLabel);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [dateFilter, setDateFilter] = useState(initialDateFilter);
  const [animatingLayer, setAnimatingLayer] = useState<{id: any, direction: string} | null>(null);

  // Verfügbare Aggregationen
  const aggregations = [
    { value: '', label: 'Keine Aggregation' },
    { value: 'sum', label: 'Summe' },
    { value: 'mean', label: 'Durchschnitt' },
    { value: 'median', label: 'Median' },
    { value: 'count', label: 'Anzahl' },
    { value: 'min', label: 'Minimum' },
    { value: 'max', label: 'Maximum' },
  ];

  // Verfügbare Diagrammtypen
  const plotTypes = [
    { value: 'bar', label: 'Balkendiagramm' },
    { value: 'line', label: 'Liniendiagramm' },
    { value: 'point', label: 'Streudiagramm' },
    { value: 'area', label: 'Flächendiagramm' },
    { value: 'tick', label: 'Ticks' },
    /*{ value: 'pie', label: 'Kuchendiagramm' },*/
  ];

  // Verfügbare Markierungsformen
  const markShapes = [
    { value: 'circle', label: 'Kreis' },
    { value: 'square', label: 'Quadrat' },
    { value: 'diamond', label: 'Diamant' },
    { value: 'triangle', label: 'Dreieck' },
    { value: 'cross', label: 'Kreuz' },
  ];

  // Lokalen State aktualisieren, wenn Initialwerte sich ändern
  useEffect(() => { setLayers(initialLayers); }, [initialLayers]);
  useEffect(() => { setMarkSize(initialMarkSize); }, [initialMarkSize]);
  useEffect(() => { setMarkShape(initialMarkShape); }, [initialMarkShape]);
  useEffect(() => { setXLabel(initialXLabel); }, [initialXLabel]);
  useEffect(() => { setYLabel(initialYLabel); }, [initialYLabel]);
  useEffect(() => { setWidth(initialWidth); }, [initialWidth]);
  useEffect(() => { setHeight(initialHeight); }, [initialHeight]);
  useEffect(() => { setDateFilter(initialDateFilter); }, [initialDateFilter]);

  // Prüfen, ob ein Layer temporale Daten hat, um den Datumsfilter anzuzeigen
  const showDateFilter = layers.some(layer => {
    const xType = columnInfo[layer.xAxis]?.type;
    const yType = columnInfo[layer.yAxis]?.type;
    return xType === 'temporal' || yType === 'temporal';
  });

  // Übernehmen-Handler
  const handleApply = () => {
    onApply && onApply({ 
      layers,
      markSize,
      markShape,
      xLabel, 
      yLabel, 
      width, 
      height, 
      dateFilter 
    });
  };

  // Neuen Layer hinzufügen
  const handleAddLayer = () => {
    const newLayer = {
      id: Date.now(),
      xAxis: columns[0] || '',
      yAxis: columns[1] || columns[0] || '',
      aggregation: '',
      plotType: 'bar',
      color: '#4f6d9a',
      opacity: 0.8,
      markSize: 30,
      markShape: 'circle'
    };
    setLayers([...layers, newLayer]);
  };

  // Layer entfernen
  const handleRemoveLayer = (layerId: any) => {
    setLayers(layers.filter((layer: any) => layer.id !== layerId));
  };

  // Layer aktualisieren
  const handleUpdateLayer = (layerId: any, field: any, value: any) => {
    setLayers(layers.map((layer: any) => 
      layer.id === layerId ? { ...layer, [field]: value } : layer
    ));
  };

  // Layer verschieben mit Animation
  const handleMoveLayerUp = (layerId: any) => {
    const currentIndex = layers.findIndex((l: any) => l.id === layerId);
    if (currentIndex > 0) {
      setAnimatingLayer({ id: layerId, direction: 'up' });
      const newLayers = [...layers];
      [newLayers[currentIndex], newLayers[currentIndex - 1]] = [newLayers[currentIndex - 1], newLayers[currentIndex]];
      setLayers(newLayers);
    }
  };

  const handleMoveLayerDown = (layerId: any) => {
    const currentIndex = layers.findIndex((l: any) => l.id === layerId);
    if (currentIndex < layers.length - 1) {
      setAnimatingLayer({ id: layerId, direction: 'down' });
      const newLayers = [...layers];
      [newLayers[currentIndex], newLayers[currentIndex + 1]] = [newLayers[currentIndex + 1], newLayers[currentIndex]];
      setLayers(newLayers);
    }
  };

  // DateFilter-Handler
  const handleDateFilterStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter((df: any) => ({ ...df, start: e.target.value }));
  };
  const handleDateFilterEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter((df: any) => ({ ...df, end: e.target.value }));
  };

  return (
    <div className={`controlpanel-root${darkMode ? ' dark-mode' : ''}`}
         aria-label="Visualisierungssteuerung">
      <div className={`controlpanel-section${darkMode ? ' dark-mode' : ''}`}
           >
        <h4 className="controlpanel-section-title">Visualisierungsebenen (Layer)</h4>
        <div className="controlpanel-layers-list">
          {layers.map((layer, idx) => (
            <div 
              key={layer.id} 
              className={`controlpanel-layer-row${animatingLayer && animatingLayer.id === layer.id ? (animatingLayer.direction === 'up' ? ' moving-up' : ' moving-down') : ''}`}
            >
              <div className="controlpanel-layer-controls"> 
                <div className="controlpanel-layer-move-group">
                  <button
                    type="button"
                    onClick={() => handleMoveLayerUp(layer.id)}
                    disabled={idx === 0}
                    className="controlpanel-layer-move-btn"
                    title="Layer nach oben"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveLayerDown(layer.id)}
                    disabled={idx === layers.length - 1}
                    className="controlpanel-layer-move-btn"
                    title="Layer nach unten"
                  >
                    ▼
                  </button>
                </div>
                <div className="controlpanel-layer-fields">
                  <div>
                    <label className="controlpanel-label">X-Achse</label>
                    <select
                      className="controlpanel-select"
                      value={layer.xAxis}
                      onChange={e => handleUpdateLayer(layer.id, 'xAxis', e.target.value)}
                      title="Layer X-Achse"
                    >
                      {columns.map(col => (
                        <option key={col} value={col}>{col}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="controlpanel-label">Y-Achse</label>
                    <select
                      className="controlpanel-select"
                      value={layer.yAxis}
                      onChange={e => handleUpdateLayer(layer.id, 'yAxis', e.target.value)}
                      title="Layer Y-Achse"
                    >
                      {columns.filter(col => col !== layer.xAxis).map(col => (
                        <option key={col} value={col}>{col}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="controlpanel-label">Aggregation</label>
                    <select
                      className="controlpanel-select"
                      value={layer.aggregation}
                      onChange={e => handleUpdateLayer(layer.id, 'aggregation', e.target.value)}
                      title="Layer Aggregation"
                    >
                      {aggregations.map(agg => (
                        <option key={agg.value} value={agg.value}>{agg.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="controlpanel-label">Typ</label>
                    <select
                      className="controlpanel-select"
                      value={layer.plotType}
                      onChange={e => handleUpdateLayer(layer.id, 'plotType', e.target.value)}
                      title="Layer Plot-Typ"
                    >
                      {plotTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="controlpanel-label">Farbe</label>
                    <input
                      type="color"
                      className="controlpanel-color-input"
                      value={layer.color}
                      onChange={e => handleUpdateLayer(layer.id, 'color', e.target.value)}
                      title="Layer Farbe"
                    />
                  </div>
                  <div>
                    <label className="controlpanel-label">Opazität</label>
                    <input
                      type="range"
                      className="controlpanel-range"
                      min={0.1}
                      max={1}
                      step={0.01}
                      value={layer.opacity}
                      onChange={e => handleUpdateLayer(layer.id, 'opacity', parseFloat(e.target.value))}
                      title="Layer Opazität"
                    />
                    <span>{Math.round(layer.opacity * 100)}%</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLayer(layer.id)}
                    className="controlpanel-layer-remove-btn"
                    title="Layer entfernen"
                  >
                    ✕
                  </button>
                </div>
              </div>
              {(layer.plotType === 'point') && (
                <div className="controlpanel-point-settings">
                  <label className="controlpanel-label">Größe:</label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={layer.markSize}
                    onChange={e => handleUpdateLayer(layer.id, 'markSize', Number(e.target.value))}
                    className="controlpanel-range"
                  />
                  <span>{layer.markSize}</span>
                  <label className="controlpanel-label">Form:</label>
                  <select
                    value={layer.markShape}
                    onChange={e => handleUpdateLayer(layer.id, 'markShape', e.target.value)}
                    className="controlpanel-select"
                  >
                    {markShapes.map(shape => (
                      <option key={shape.value} value={shape.value}>{shape.label}</option>
                    ))}
                  </select>
                </div>
              )}
              {idx < layers.length - 1 && <hr className="controlpanel-layer-separator" />}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddLayer}
            className="controlpanel-add-layer-btn"
            title="Layer hinzufügen"
          >
            + Layer hinzufügen
          </button>
        </div>
      </div>

      {/* Chart Settings Sektion */}
      <div className={`controlpanel-section${darkMode ? ' dark-mode' : ''}`}
           >
        <h4 className="controlpanel-section-title">Diagramm-Einstellungen</h4>
        <div>
          <div className="controlpanel-chart-settings-row">
            <div>
              <label htmlFor="width" className="controlpanel-label">Width</label>
              <input id="width" type="number" min={200} max={1600} value={width} onChange={e => setWidth(Number(e.target.value))} className="controlpanel-input" />
            </div>
            <div>
              <label htmlFor="height" className="controlpanel-label">Height</label>
              <input id="height" type="number" min={150} max={1200} value={height} onChange={e => setHeight(Number(e.target.value))} className="controlpanel-input" />
            </div>
            <div>
              <label htmlFor="y-label" className="controlpanel-label">Y Label</label>
              <input id="y-label" type="text" className="controlpanel-input" value={yLabel} onChange={e => setYLabel(e.target.value)} placeholder="Y Axis Label" />
            </div>
            <div>
              <label htmlFor="x-label" className="controlpanel-label">X Label</label>
              <input id="x-label" type="text" className="controlpanel-input" value={xLabel} onChange={e => setXLabel(e.target.value)} placeholder="X Axis Label" />
            </div>
          </div>
        </div>
      </div>

      {/* Date Filter Sektion - Nur wenn in der x-Achse ein temporaler Wert erkannt wird */}
      {showDateFilter && (
        <div className={`controlpanel-section${darkMode ? ' dark-mode' : ''}`}
             >
          <h4 className="controlpanel-section-title">Datumsfilter</h4>
          <div className="controlpanel-datefilter-row">
            <label htmlFor="date-start" className="controlpanel-label">Von:</label>
            <input
              id="date-start"
              type="date"
              className="controlpanel-datefilter-input"
              value={dateFilter.start || ''}
              onChange={handleDateFilterStart}
              aria-label="Start date"
            />
            <label htmlFor="date-end" className="controlpanel-label">Bis:</label>
            <input
              id="date-end"
              type="date"
              className="controlpanel-datefilter-input"
              value={dateFilter.end || ''}
              onChange={handleDateFilterEnd}
              aria-label="End date"
            />
          </div>
        </div>
      )}

      <div className="controlpanel-apply-btn-row">
        <button className="controlpanel-btn" onClick={handleApply}>
          Übernehmen
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;
