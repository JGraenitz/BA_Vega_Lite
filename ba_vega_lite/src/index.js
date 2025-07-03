import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Wenn du die Performance deiner App messen möchtest, übergib eine Funktion
// um Ergebnisse zu protokollieren (z.B.: reportWebVitals(console.log))
// oder sende sie an ein Analytics-Endpoint. Mehr Infos: https://bit.ly/CRA-vitals
reportWebVitals();
