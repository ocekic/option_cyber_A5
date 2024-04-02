// RegisterModal.tsx
import React from 'react';
import axios from 'axios';

interface State {
  nom: string;
  prenom: string;
  username: string;
  password: string;
}

export default class RegisterModal extends React.Component<{}, State> {
  state: State = {
    nom: '',
    prenom: '',
    username: '',
    password: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = {
      surname: this.state.nom,
      name: this.state.prenom,
      username: this.state.username,
      password: this.state.password,
    };

    axios.post('http://localhost:9000/users/CreateUser', user, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      // Ici, tu peux gérer la réponse, par exemple en redirigeant l'utilisateur vers la page de connexion
      console.log(response.data);
      // Supposons que tu veuilles vider le formulaire après l'inscription :
      this.setState({
        nom: '',
        prenom: '',
        username: '',
        password: '',
      });
    })
    .catch(error => {
      console.error("Erreur lors de la création de l'utilisateur:", error);
    });
  };

  render() {
    return (
      <div className="container mt-5">
        <h2>Créer un compte</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="nom">Nom</label>
            <input type="text" id="nom" name="nom" value={this.state.nom} onChange={this.handleChange} className="form-control my-2" placeholder="Nom" required />
          </div>
          <div className="form-group">
            <label htmlFor="prenom">Prénom</label>
            <input type="text" id="prenom" name="prenom" value={this.state.prenom} onChange={this.handleChange} className="form-control my-2" placeholder="Prénom" required />
          </div>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input type="text" id="username" name="username" value={this.state.username} onChange={this.handleChange} className="form-control my-2" placeholder="Nom d'utilisateur" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control my-2" placeholder="Mot de passe" required />
          </div>
          <button type="submit" className="btn btn-primary">Créer un compte</button>
        </form>
      </div>
    );
  }
}
