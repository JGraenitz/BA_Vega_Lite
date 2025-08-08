import { VisualizationTemplate } from '../../../interfaces/VisualizationPage/TemplateSelector/TemplateSelectorProps';
import { v4 as uuidv4 } from 'uuid';
  
  /**
   * Wendet eine Visualisierungsvorlage auf die aktuellen Spalten an und erzeugt daraus ein Controls-Objekt.
   * Dabei werden die Layer der Vorlage mit den übergebenen Spaltennamen befüllt und erhalten neue IDs.
   * @param template Die ausgewählte Visualisierungsvorlage
   * @param columns Die aktuellen Spaltennamen aus den Daten
   * @returns Ein Controls-Objekt, das für die Steuerung der Visualisierung genutzt werden kann
   */
  export const applyTemplateToControls = (template: VisualizationTemplate, columns: string[]): any => {
    const controls = { ...template };
    
    if (columns.length > 0) {   
      controls.layers = controls.layers.map((layer: any, index: number) => {
        let yAxisValue = layer.yAxis;
        
        if (yAxisValue === 'value1') {
          yAxisValue = columns[1] || '';
        } else if (yAxisValue === 'value2') {
          yAxisValue = columns[2] || columns[0] || '';
        }
        
        return {
          ...layer,
          id: uuidv4(),
          xAxis: columns[0] || '',
          yAxis: yAxisValue
        };
      });
    } else {
      controls.layers = controls.layers.map((layer: any, index: number) => ({     
      }));
    }
    
    return controls;
  };