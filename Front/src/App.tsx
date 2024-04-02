// App.tsx
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Frisbee } from './type/frizbee';
import CreateFrisbeeModal from './dashboard/createFrisbeeModal';
import Navbar from './dashboard/navbar';
import FrisbeeTable from './dashboard/frisbeeTable';
import RegisterPage from './dashboard/registerPage'; // Assure-toi que le chemin est correct pour RegisterPage

function App() {
  const [frisbees, setFrisbees] = useState<Frisbee[]>([]);
  const [isLogged, setIsLogged] = useState<boolean>(false); // Simule l'état de connexion

  return (
    <Router>
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged} />
      <Routes>
        <Route path="/" element={<><CreateFrisbeeModal />
        <FrisbeeTable/></>} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Ajoute ici d'autres routes si nécessaire */}
      </Routes>
    </Router>
  );
}

export default App;
