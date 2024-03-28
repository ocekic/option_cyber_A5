import React from 'react';
import { Frisbee } from "../type/frizbee"; // Assurez-vous que le chemin est correct
import FrisbeeRow from "./frisbeeRow"; // Assurez-vous que le chemin est correct

interface FrisbeeTableProps {
    frisbees: Frisbee[];
    setFrisbees: React.Dispatch<React.SetStateAction<Frisbee[]>>; // Utilisez le bon type pour setFrisbees
}

const FrisbeeTable = ({ frisbees, setFrisbees }: FrisbeeTableProps) => {
    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">Nom</th>
                <th scope="col">Description</th>
                <th scope="col">Prix UHT</th>
                <th scope="col">Gamme</th>
                <th scope="col">Ingrédients</th>
                <th scope="col">Grammage</th>
            </tr>
            </thead>
            <tbody>
            {frisbees.map(frisbee => (
                <FrisbeeRow
                    key={frisbee._id} // Utilisez l'_id comme clé pour une meilleure performance
                    frisbee={frisbee}
                    setFrisbees={setFrisbees}
                />
            ))}
            </tbody>
        </table>
    );
}

export default FrisbeeTable;
