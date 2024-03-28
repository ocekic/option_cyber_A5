import React, { useState } from 'react';
import axios from 'axios';
import { Frisbee } from '../type/frizbee';

interface CreateFrisbeeModalProps {
  setFrisbees: React.Dispatch<React.SetStateAction<Frisbee[]>>;
}

const CreateFrisbeeModal: React.FC<CreateFrisbeeModalProps> = ({ setFrisbees }) => {
  const [nom, setNom] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [pUHT, setPUHT] = useState<number>(0);
  const [gamme, setGamme] = useState<string>('');
  const [ingredients, setIngredients] = useState<string>('');
  const [grammage, setGrammage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post<Frisbee>(`${import.meta.env.VITE_URL_MS_FRISBEE}/createFreezeBeeModel`, {
        nom,
        description,
        pUHT,
        gamme,
        ingredients,
        grammage,
      });

      setFrisbees(prevFrisbees => [...prevFrisbees, response.data]);

      // Réinitialisation des états
      setNom('');
      setDescription('');
      setPUHT(0);
      setGamme('');
      setIngredients('');
      setGrammage('');

    } catch (error) {
      console.error("Erreur lors de l'ajout du modèle Frisbee:", error);
    }
  };

  return (
    <div className="modal fade" id="create" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Ajouter un frisbee</h5>
            </div>
            <div className="modal-body">
              <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom du frisbee" required />
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
              <input type="number" value={pUHT} onChange={(e) => setPUHT(Number(e.target.value))} placeholder="Prix UHT" required />
              <input type="text" value={gamme} onChange={(e) => setGamme(e.target.value)} placeholder="Gamme" required />
              <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingrédients" required />
              <input type="text" value={grammage} onChange={(e) => setGrammage(e.target.value)} placeholder="Grammage" required />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
              <button type="submit" className="btn btn-primary">Ajouter</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFrisbeeModal;
