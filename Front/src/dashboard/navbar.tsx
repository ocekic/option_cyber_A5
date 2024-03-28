import React from 'react'; // Importer React depuis la bibliothèque react
interface NavbarProps {
    isLogged: boolean
    setIsLogged: (isLogged: boolean) => void
}

const Navbar = ({isLogged, setIsLogged}: NavbarProps) => {

    const logout = () => {
        localStorage.removeItem('JWT_auth_KillerBee');
        setIsLogged(false)
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">KillerBee</a>
                
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {isLogged ?
                                <>
                                    <div className="d-flex" role="search">
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                    </div>
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-outline-primary ms-2" onClick={logout}>Se déconnecter</button>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-outline-primary me-2" data-bs-toggle="modal" data-bs-target="#register">Créer un compte</button>
                                    </li>
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#login">Se connecter</button>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar