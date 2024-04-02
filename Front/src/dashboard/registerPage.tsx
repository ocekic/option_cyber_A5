// RegisterPage.tsx
import React from 'react';
import RegisterModal from '../dashboard/registerModal'; // Assure-toi que le chemin est correct

const RegisterPage = () => {
  return (
    <>
      {/* Pas besoin de Navbar ici car elle est déjà incluse dans App.tsx */}
      <RegisterModal />
    </>
  );
};

export default RegisterPage;