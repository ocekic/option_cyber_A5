import React from 'react';
import axios from 'axios';
// Importez l'interface Frisbee si elle n'est pas déjà définie.
import { Frisbee } from '../type/frizbee';

interface FrisbeeTableState {
  frisbee: Frisbee[];
}

export default class FrisbeeTable extends React.Component<{}, FrisbeeTableState> {
  state: FrisbeeTableState = {
    frisbee: []
  }

  componentDidMount() {
    axios.get('http://localhost:7000/freezbe')
      .then(res => {
        const frisbee: Frisbee[] = res.data;
        this.setState({ frisbee });
      })
      .catch(error => {
        console.error("Il y a eu un problème avec la requête Axios", error);
      });
  }

  handleDelete = (idToDelete: string) => {
    axios.delete(`http://localhost:7000/freezbe/${idToDelete}`)
      .then(() => {
        this.setState(prevState => ({
          frisbee: prevState.frisbee.filter(frisbeeItem => frisbeeItem._id !== idToDelete)
        }));
      })
      .catch(error => {
        console.error("Il y a eu un problème avec la requête de suppression Axios", error);
      });
  }
  
  renderTableData() {
    return this.state.frisbee.map((frisbeeItem: Frisbee, index: number) => {
      const { _id, nom, description, pUHT, gamme, ingredients, grammage } = frisbeeItem;
      return (
        <tr key={_id}>
          <td>{_id}</td>
          <td>{nom}</td>
          <td>{description}</td>
          <td>{pUHT}</td>
          <td>{gamme}</td>
          <td>{ingredients}</td>
          <td>{grammage}</td>
          <td className="table-action-cell">
            <button type="button" className="btn btn-danger action-btn" onClick={() => this.handleDelete(_id)}>
              Supprimer
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <table className="table ">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix Unitaire HT</th>
              <th>Gamme</th>
              <th>Ingrédients</th>
              <th>Grammage</th>
              <th>Actions</th> {/* Colonne supplémentaire pour les actions */}
            </tr>
          </thead>
          <tbody>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}
