import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Assurez-vous que le chemin vers App est correct
import './index.css'; // Assurez-vous d'avoir un fichier CSS pour les styles globaux si nécessaire

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);