import { TemplateSelectorProps } from '../../../utils/interfaces/VisualizationPage/TemplateSelector/TemplateSelectorProps';
import { visualizationTemplates } from '../../../utils/constants/VisualizationPage/TemplateSelector/TemplateSelectorConst';
import './TemplateSelector.css';


function TemplateSelector({ onTemplateSelect }: TemplateSelectorProps) {
  return (
    <div className="template-selector">
      <h3 className="template-selector-title">Visualisierungsvorlagen</h3>
      <p className="template-selector-description">
        Wähle eine Vorlage aus, um schnell mit der Visualisierung zu beginnen:
      </p>
      
      <div className="template-grid">
        {visualizationTemplates.map((template) => (
          <div
            key={template.id}
            className="template-card"
            onClick={() => onTemplateSelect(template)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onTemplateSelect(template);
              }
            }}
            aria-label={`Vorlage ${template.name} auswählen`}
          >
            <div className="template-icon">{template.icon}</div>
            <div className="template-content">
              <h4 className="template-name">{template.name}</h4>
              <p className="template-description">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector; 