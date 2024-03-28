import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Frisbee } from './type/frizbee'; // Assure-toi que le chemin est correct
import CreateFrisbeeModal from './dashboard/createFrisbeeModal'; // Assure-toi que le chemin est correct
import Navbar from './dashboard/navbar'; // Assure-toi que le chemin est correct
import FrisbeeTable from './dashboard/frisbeeTable'; // Assure-toi que ce composant existe et qu'il est correctement importé

function App() {
  const [frisbees, setFrisbees] = useState<Frisbee[]>([]);

  useEffect(() => {
    // Charger initialement la liste des frisbees
    const fetchFrisbees = async () => {
      try {
        const response = await axios.get<Frisbee[]>(`${import.meta.env.VITE_URL_MS_FRISBEE}/getAllFreezeBeeModels`);
        setFrisbees(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles de frisbees:", error);
      }
    };

    fetchFrisbees();
  }, []);

  // La fonction pour ajouter un nouveau frisbee n'est pas nécessaire ici car elle est gérée dans CreateFrisbeeModal

  return (
    <>
      <Navbar isLogged={false} setIsLogged={() => { /* Logique pour changer l'état d'authentification */ }} />
      <CreateFrisbeeModal setFrisbees={setFrisbees} />
      <div className="container pt-4">
        {/* Bouton pour déclencher le modal d'ajout de frisbee */}
        <button type="button" className="btn btn-outline-warning mb-4" data-bs-toggle="modal" data-bs-target="#create">Ajouter un frisbee</button>
        
        {/* Le composant FrisbeeTable affiche la liste des frisbees */}
        <FrisbeeTable frisbees={frisbees} setFrisbees={setFrisbees} />
      </div>
    </>
  );
}

export default App;
