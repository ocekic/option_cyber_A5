import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour la navigation

interface NavbarProps {
    isLogged: boolean;
    setIsLogged: (isLogged: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLogged, setIsLogged }) => {
    const navigate = useNavigate(); // Utiliser useNavigate pour la navigation

    const logout = () => {
        localStorage.removeItem('JWT_auth_KillerBee');
        setIsLogged(false);
    };

    const handleShowRegisterPage = () => {
        navigate('/register'); // Utiliser navigate pour naviguer vers la page d'inscription
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">KillerBee</a>
                <div className="navbar-nav ms-auto">
                    {isLogged ? (
                        <button type="button" className="btn btn-outline-primary" onClick={logout}>Se déconnecter</button>
                    ) : (
                        <>
                            <button type="button" className="btn btn-outline-primary me-2" onClick={handleShowRegisterPage}>Créer un compte</button>
                            <button type="button" className="btn btn-outline-primary">Se connecter</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
