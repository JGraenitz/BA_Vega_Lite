import { ModalErrorHandlerProps } from '../../utils/interfaces/ModalErrorPage/ModalErrorProps';
import './ModalErrorHandler.css';


/**
 * ModalErrorHandler Komponente
 * Stellt ein benutzerdefiniertes Modal für Fehler/Rückmeldungen bereit.
 *
 * @param {string} title - Titel des Modals
 * @param {string} message - Fehlermeldung oder Rückmeldung
 * @param {Function} onClose - Callback zum Schließen des Modals
 */
function ModalErrorHandler({ title, message, onClose }: ModalErrorHandlerProps) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-title">{title}</div>
        <div className="modal-message">{message}</div>
        <button className="modal-btn" onClick={onClose} autoFocus>OK</button>
      </div>
    </div>
  );
}

export default ModalErrorHandler;
