import React from 'react';
import { Frisbee } from "../type/frizbee"; // Assurez-vous que le chemin est correct
import DeleteFrisbeeModal from "../dashboard/deleteFrisbeeModal"; // Pas besoin de spécifier .tsx

interface FrisbeeRowProps {
    frisbee: Frisbee;
    setFrisbees: React.Dispatch<React.SetStateAction<Frisbee[]>>;
}

const FrisbeeRow: React.FC<FrisbeeRowProps> = ({ frisbee, setFrisbees }) => {
    // Assurez-vous que chaque frisbee a un champ _id
    return (
        <>
            {/* Ici, nous passons _id à DeleteFrisbeeModal */}
            <DeleteFrisbeeModal frisbeeId={frisbee._id} setFrisbees={setFrisbees} />
            <tr>
                <td>{frisbee.nom}</td>
                <td>{frisbee.description}</td>
                <td>{frisbee.pUHT.toFixed(2)}</td> {/* Supposant que pUHT est un nombre et que vous voulez l'afficher avec deux décimales */}
                <td>{frisbee.gamme}</td>
                <td>{frisbee.ingredients}</td>
                <td>{frisbee.grammage}</td>
                <td>
                    {/* Utilisez frisbee._id pour le data-bs-target */}
                    <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target={`#deleteModal-${frisbee._id}`}>Supprimer</button>
                </td>
            </tr>
        </>
    );
}

export default FrisbeeRow;
