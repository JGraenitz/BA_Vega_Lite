import React from 'react';
import { ModalErrorHandlerProps } from '../../utils/interfaces/ModalErrorProps';
import './ModalErrorHandler.css';


/**
 * ModalErrorHandler Komponente
 * Stellt ein benutzerdefiniertes Modal für Fehler/Rückmeldungen bereit.
 * Props:
 *   - title: string
 *   - message: string
 *   - onClose: Funktion
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
