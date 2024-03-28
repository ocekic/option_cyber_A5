import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Assurez-vous d'avoir un fichier CSS pour le style

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Bienvenue sur le Dashboard de KillerBee</h1>
      <p>Accédez aux différentes sections de gestion :</p>
      <div className="links-container">
        <Link to="/frisbees" className="dashboard-link">Gestion des Modèles Freezbe</Link>
        <Link to="/ingredients" className="dashboard-link">Gestion des Ingrédients</Link>
        <Link to="/processes" className="dashboard-link">Gestion des Procédés de Fabrication</Link>
      </div>
    </div>
  );
};

export default HomePage;
