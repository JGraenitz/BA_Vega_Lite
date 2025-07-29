import React, { useState, useEffect } from 'react';
import { ControlPanelProps } from '../../../utils/interfaces/VisualizationPage/ControlPanel/ControlPanelProps';
import { aggregations, plotTypes, markShapes, generateRandomColor } from '../../../utils/constants/VisualizationPage/ControlPanel/ControlPanelConst';
import { Tooltip } from 'react-tooltip';
import './ControlPanel.css';
import { v4 as uuidv4 } from 'uuid';

/**
 * ControlPanel Komponente
 * Stellt die Steuerung für die Visualisierung mit Layern, Achsen, Diagrammtypen, Aggregationen usw. bereit.
 * Nutzt lokalen State und einen 'Übernehmen'-Button, um Änderungen anzuwenden.
 *
 * @param {Array} columns - Die Spaltennamen der Daten
 * @param {Object} columnInfo - Typinformationen zu den Spalten
 * @param {Array} layers - Die Layer-Konfigurationen
 * @param {number} markSize - Standardgröße für Markierungen
 * @param {string} markShape - Standardform für Markierungen
 * @param {string} xLabel - Label für die X-Achse
 * @param {string} yLabel - Label für die Y-Achse
 * @param {number} width - Breite des Diagramms
 * @param {number} height - Höhe des Diagramms
 * @param {Object} dateFilter - Datumsfilter (start, end)
 * @param {Function} onApply - Callback, das beim Übernehmen der Einstellungen aufgerufen wird
 * @param {boolean} darkMode - Ob Dark Mode aktiviert ist
 * @param {boolean} showLegend - Ob die Legende angezeigt werden soll
 */
function ControlPanel({columns, columnInfo, layers: initialLayers = [], markSize: initialMarkSize = 30, markShape: initialMarkShape,
  xLabel: initialXLabel, yLabel: initialYLabel, width: initialWidth, height: initialHeight, dateFilter: initialDateFilter, onApply,
 showLegend: initialShowLegend = false}: ControlPanelProps) {

  // Lokaler State für alle Steuerelemente 
  const [layers, setLayers] = useState(initialLayers);

  const [markSize, setMarkSize] = useState(initialMarkSize);

  const [markShape, setMarkShape] = useState(initialMarkShape);

  const [xLabel, setXLabel] = useState(initialXLabel);

  const [yLabel, setYLabel] = useState(initialYLabel);

  const [width, setWidth] = useState(initialWidth);

  const [height, setHeight] = useState(initialHeight);

  const [dateFilter, setDateFilter] = useState(initialDateFilter);

  const [showLegend, setShowLegend] = useState(initialShowLegend);

  const [animatingLayer, setAnimatingLayer] = useState<{id: any, direction: string} | null>(null);

  
  const temporalFields = columns.filter(col => columnInfo[col]?.type === 'temporal');
  const showDateFilter = temporalFields.length > 0;

  const [dateField, setDateField] = useState();

  const [isApplyDisabled, setIsApplyDisabled] = useState(false);


  const handleApply = () => {
    onApply?.({  
      layers,
      markSize,
      markShape,
      xLabel, 
      yLabel, 
      width, 
      height, 
      dateFilter,
      dateField,
      showLegend
    });
   
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleAddLayer = () => {
    const newLayer = {
      id: uuidv4(),
      xAxis: columns[0] || '',
      yAxis: columns[1] || columns[0] || '',
      aggregation: '',
      plotType: 'bar',
      color: generateRandomColor(),
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

  // Layer verschieben 
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

  const handleDateFilterStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter((df: any) => ({ ...df, start: e.target.value }));
  };
  const handleDateFilterEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter((df: any) => ({ ...df, end: e.target.value }));
  };

    // Synchronisiere lokalen State mit Eigenschaften
    useEffect(() => { setLayers(initialLayers); }, [initialLayers]);
    useEffect(() => { setMarkSize(initialMarkSize); }, [initialMarkSize]);
    useEffect(() => { setMarkShape(initialMarkShape); }, [initialMarkShape]);
    useEffect(() => { setXLabel(initialXLabel); }, [initialXLabel]);
    useEffect(() => { setYLabel(initialYLabel); }, [initialYLabel]);
    useEffect(() => { setWidth(initialWidth); }, [initialWidth]);
    useEffect(() => { setHeight(initialHeight); }, [initialHeight]);
    useEffect(() => { setDateFilter(initialDateFilter); }, [initialDateFilter]);
    useEffect(() => { setShowLegend(initialShowLegend); }, [initialShowLegend]);
  
    useEffect(() => {
      if (initialDateFilter !== dateFilter) {
        setIsApplyDisabled(true);
        const timer = setTimeout(() => {
          setIsApplyDisabled(false);
        }, 1000); 
        return () => clearTimeout(timer);
      }
    }, [dateFilter, initialDateFilter]);
    
    useEffect(() => {
      const temporalFields = columns.filter(col => columnInfo[col]?.type === 'temporal');
      if (temporalFields.length > 0 && !temporalFields.includes(dateField)) {
        setDateField(temporalFields[0]);
      }
    }, [columns, columnInfo, dateField, dateFilter]);

  return (
    <div className={`controlpanel-root`}
         aria-label="Visualisierungssteuerung">
      <div className="controlpanel-layout">
        <div className="controlpanel-left-column">
          <div className={`controlpanel-section no-border`}>
            <h4 className="controlpanel-section-title">Visualisierungsebenen</h4>
            <div className="controlpanel-layers-list">
              {layers.map((layer, index) => (
                <div 
                  key={layer.id} 
                  className={`controlpanel-layer-row${animatingLayer && animatingLayer.id === layer.id ? (animatingLayer.direction === 'up' ? ' moving-up' : ' moving-down') : ''}`}
                >
                  <div className="controlpanel-layer-controls"> 
                    <div className="controlpanel-layer-move-group">
                      <button
                        type="button"
                        onClick={() => handleMoveLayerUp(layer.id)}
                        disabled={index === 0}
                        className="controlpanel-layer-move-btn"
                        data-tooltip-id={`move-up-tooltip-${layer.id}`}
                        data-tooltip-content="Layer eine Position nach oben verschieben"
                      >
                        ▲
                      </button>
                      <Tooltip id={`move-up-tooltip-${layer.id}`} place="top" />
                      <button
                        type="button"
                        onClick={() => handleMoveLayerDown(layer.id)}
                        disabled={index === layers.length - 1}
                        className="controlpanel-layer-move-btn"
                        data-tooltip-id={`move-down-tooltip-${layer.id}`}
                        data-tooltip-content="Layer eine Position nach unten verschieben"
                      >
                        ▼
                      </button>
                      <Tooltip id={`move-down-tooltip-${layer.id}`} place="top" />
                    </div>
                    <div className="controlpanel-layer-fields">
                      <div>
                        <label className="controlpanel-label">X-Achse</label>
                        <select
                          className="controlpanel-select"
                          value={layer.xAxis}
                          onChange={e => handleUpdateLayer(layer.id, 'xAxis', e.target.value)}
                          data-tooltip-id={`xaxis-tooltip-${layer.id}`}
                          data-tooltip-content="Spalte für die X-Achse dieser Layer"
                        >
                          {columns.map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                        <Tooltip id={`xaxis-tooltip-${layer.id}`} place="top" />
                      </div>
                      <div>
                        <label className="controlpanel-label">Y-Achse</label>
                        <select
                          className="controlpanel-select"
                          value={layer.yAxis}
                          onChange={e => handleUpdateLayer(layer.id, 'yAxis', e.target.value)}
                          data-tooltip-id={`yaxis-tooltip-${layer.id}`}
                          data-tooltip-content="Spalte für die Y-Achse dieser Layer"
                        >
                          {columns.filter(col => col !== layer.xAxis).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                        <Tooltip id={`yaxis-tooltip-${layer.id}`} place="top" />
                      </div>
                      <div>
                        <label className="controlpanel-label">Aggregation</label>
                        <select
                          className="controlpanel-select"
                          value={layer.aggregation}
                          onChange={e => handleUpdateLayer(layer.id, 'aggregation', e.target.value)}
                          data-tooltip-id={`aggregation-tooltip-${layer.id}`}
                          data-tooltip-content="Y-Achsen-Aggregation für diese Layer (z.B. Summe, Durchschnitt)"
                        >
                          {aggregations.map(agg => (
                            <option key={agg.value} value={agg.value}>{agg.label}</option>
                          ))}
                        </select>
                        <Tooltip id={`aggregation-tooltip-${layer.id}`} place="top" />
                      </div>
                      <div>
                        <label className="controlpanel-label">Typ</label>
                        <select
                          className="controlpanel-select"
                          value={layer.plotType}
                          onChange={e => handleUpdateLayer(layer.id, 'plotType', e.target.value)}
                          data-tooltip-id={`plottype-tooltip-${layer.id}`}
                          data-tooltip-content="Diagrammtyp für diesen Layer wählen (z.B. Balken, Linie)"
                        >
                          {plotTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                        <Tooltip id={`plottype-tooltip-${layer.id}`} place="top" />
                      </div>
                      <div>
                        <label className="controlpanel-label">Farbe</label>
                        <input
                          type="color"
                          className="controlpanel-color-input"
                          value={layer.color}
                          onChange={e => handleUpdateLayer(layer.id, 'color', e.target.value)}
                          data-tooltip-id={`color-tooltip-${layer.id}`}
                          data-tooltip-content="Farbe für diesen Layer wählen"
                        />
                        <Tooltip id={`color-tooltip-${layer.id}`} place="top" />
                      </div>
                      <div>
                        <label className="controlpanel-label">Durchsichtigkeit</label>
                        <input
                          type="range"
                          className="controlpanel-range"
                          min={0.1}
                          max={1}
                          step={0.01}
                          value={layer.opacity}
                          onChange={e => handleUpdateLayer(layer.id, 'opacity', parseFloat(e.target.value))}
                          data-tooltip-id={`opacity-tooltip-${layer.id}`}
                          data-tooltip-content="Transparenz (Opazität) für diesen Layer einstellen"
                        />
                        <Tooltip id={`opacity-tooltip-${layer.id}`} place="top" />
                        <span className="controlpanel-value-display">{Math.round(layer.opacity * 100)}%</span>
                      </div>
                      {layer.plotType === 'point' && (
                        <>
                          <div>
                            <label className="controlpanel-label">Größe</label>
                            <input
                              type="range"
                              min={10}
                              max={100}
                              value={layer.markSize}
                              onChange={e => handleUpdateLayer(layer.id, 'markSize', Number(e.target.value))}
                              className="controlpanel-range"
                              data-tooltip-id={`marksize-tooltip-${layer.id}`}
                              data-tooltip-content="Größe der Markierungen für diesen Layer"
                            />
                            <Tooltip id={`marksize-tooltip-${layer.id}`} place="top" />
                            <span className="controlpanel-value-display">{layer.markSize}</span>
                          </div>
                          <div>
                            <label className="controlpanel-label">Form</label>
                            <select
                              value={layer.markShape}
                              onChange={e => handleUpdateLayer(layer.id, 'markShape', e.target.value)}
                              className="controlpanel-select"
                              data-tooltip-id={`markshape-tooltip-${layer.id}`}
                              data-tooltip-content="Form der Markierungen für diesen Layer"
                            >
                              {markShapes.map(shape => (
                                <option key={shape.value} value={shape.value}>{shape.label}</option>
                              ))}
                            </select>
                            <Tooltip id={`markshape-tooltip-${layer.id}`} place="top" />
                          </div>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveLayer(layer.id)}
                        className="controlpanel-layer-remove-btn"
                        data-tooltip-id={`remove-layer-tooltip-${layer.id}`}
                        data-tooltip-content="Diesen Layer entfernen"
                      >
                        ✕
                      </button>
                      <Tooltip id={`remove-layer-tooltip-${layer.id}`} place="top" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
                type="button"
                onClick={handleAddLayer}
                className="controlpanel-add-layer-btn"
                data-tooltip-id="add-layer-tooltip"
                data-tooltip-content="Neuen Layer hinzufügen"
              >
                + Ebene hinzufügen
              </button>
              <Tooltip id="add-layer-tooltip" place="top" />
          </div>
        </div>

        <div className="controlpanel-right-column">
          <div className={`controlpanel-section`}>
            <h4 className="controlpanel-section-title">Diagramm-Einstellungen</h4>
            <div>
              <div className="controlpanel-chart-settings-row">
                <div>
                  <label htmlFor="width" className="controlpanel-label">Breite</label>
                  <input id="width" type="number" min={200} max={5000} value={width} onChange={e => setWidth(Math.max(0, Math.min(5000, Number(e.target.value))))} className="controlpanel-input" />
                </div>
                <div>
                  <label htmlFor="height" className="controlpanel-label">Höhe</label>
                  <input id="height" type="number" min={150} max={5000} value={height} onChange={e => setHeight(Math.max(0, Math.min(5000, Number(e.target.value))))} className="controlpanel-input" />
                </div>
                <div>
                  <label htmlFor="y-label" className="controlpanel-label">Y-Achse</label>
                  <input id="y-label" type="text" className="controlpanel-input" value={yLabel} onChange={e => setYLabel(e.target.value)} placeholder="Y Axis Label" />
                </div>
                <div>
                  <label htmlFor="x-label" className="controlpanel-label">X-Achse</label>
                  <input id="x-label" type="text" className="controlpanel-input" value={xLabel} onChange={e => setXLabel(e.target.value)} placeholder="X Axis Label" />
                </div>
              </div>
              <div className="controlpanel-checkbox-row">
                <label className="controlpanel-label">
                  <input
                    type="checkbox"
                    checked={showLegend}
                    onChange={e => setShowLegend(e.target.checked)}
                    className="controlpanel-checkbox-input"
                  />
                  Legende anzeigen
                </label>
              </div>
            </div>
          </div>

          {showDateFilter && (
            <div className={`controlpanel-section`}>
              <h4 className="controlpanel-section-title">Datumsfilter</h4>
              <div className="controlpanel-datefilter-row">
                <span className="controlpanel-label">Datumsfeld: <b>{dateField}</b></span>
                <div className='controlpanel-datefilter-start'>
                  <label htmlFor="date-start" className="controlpanel-label">Von:</label>
                  <input
                    id="date-start"
                    type="date"
                    className="controlpanel-datefilter-input"
                    value={dateFilter.start || ''}
                    onChange={handleDateFilterStart}
                    aria-label="Start date"
                  />
                </div>
                <div className='controlpanel-datefilter-end'>
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
            </div>
          )}
         
          <div className="controlpanel-apply-btn-row">
            <button className="controlpanel-btn" onClick={handleApply} disabled={isApplyDisabled} data-tooltip-id="apply-tooltip" data-tooltip-content="Einstellungen übernehmen und Diagramm aktualisieren">
              Übernehmen
            </button>
            <Tooltip id="apply-tooltip" place="top" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;