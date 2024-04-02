import React from 'react';
import axios from 'axios';



export default class CreateFrisbeeModal extends React.Component {
  state = {
    nom: '',
    description: '',
    pUHT: 0,
    gamme: '',
    ingredients: '',
    grammage: ''
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const frisbee = {
      nom: this.state.nom,
      description: this.state.description,
      pUHT: this.state.pUHT,
      gamme: this.state.gamme,
      ingredients: this.state.ingredients,
      grammage: this.state.grammage
    };

    axios.post('http://127.0.0.1:8000/freezbe', frisbee, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        // Si tu as besoin de mettre à jour l'état avec le nouveau frisbee dans un composant parent :
        // Réinitialiser le formulaire
        this.setState({
          nom: '',
          description: '',
          pUHT: 0,
          gamme: '',
          ingredients: '',
          grammage: ''
        });
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout du modèle Frisbee:", error);
      });
  }


  render() {
    return (
      <div className="modal fade" id="create" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <form onSubmit={this.handleSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Ajouter un frisbee</h5>
              </div>
              <div className="modal-body">
                <input type="text" value={this.state.nom} onChange={this.handleChange} name="nom" placeholder="Nom du frisbee" required />
                <input type="text" value={this.state.description} onChange={this.handleChange} name="description" placeholder="Description" required />
                <input type="number" value={this.state.pUHT} onChange={this.handleChange} name="pUHT" placeholder="Prix UHT" required />
                <input type="text" value={this.state.gamme} onChange={this.handleChange} name="gamme" placeholder="Gamme" required />
                <input type="text" value={this.state.ingredients} onChange={this.handleChange} name="ingredients" placeholder="Ingrédients" required />
                <input type="text" value={this.state.grammage} onChange={this.handleChange} name="grammage" placeholder="Grammage" required />
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
  }
}
