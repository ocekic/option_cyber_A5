import axios from "axios";
import React from 'react';

// Ici on attend un string pour l'identifiant, qui sera l'_id de MongoDB
interface DeleteFrisbeeModalProps {
    frisbeeId: string;
    setFrisbees: (frisbees: any) => void;
}

const DeleteFrisbeeModal = ({ frisbeeId, setFrisbees }: DeleteFrisbeeModalProps) => {

    const handleDelete = async () => { // Pas besoin de passer l'id ici, il est déjà dans les props
        try {
            // L'URL attend un paramètre dans le chemin (path), pas dans les query params
            await axios.delete(`${import.meta.env.VITE_URL_MS_FRISBEE}/deleteFreezeBeeModel/${frisbeeId}`);

            // Mettre à jour la liste des frisbees
            const response = await axios.get(`${import.meta.env.VITE_URL_MS_FRISBEE}/getAllFreezeBeeModels`);
            setFrisbees(response.data);
            
        } catch (error) {
            console.error("Erreur lors de la suppression du modèle Frisbee:", error);
        }
    };

    return (
        // Utiliser l'_id pour les attributs ID dans le DOM
        <div className="modal fade" id={`deleteModal-${frisbeeId}`} tabIndex={-1} aria-labelledby={`deleteModalLabel-${frisbeeId}`} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={`deleteModalLabel-${frisbeeId}`}>Supprimer un frisbee</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Voulez-vous vraiment supprimer ce frisbee ?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        {/* Utiliser directement handleDelete sans argument puisque frisbeeId est accessible via les props */}
                        <button type="button" className="btn btn-outline-danger" onClick={handleDelete} data-bs-dismiss="modal">
                            Confirmer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteFrisbeeModal;
