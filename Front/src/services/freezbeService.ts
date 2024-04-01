import axios from 'axios';

const BASE_URL = 'http://localhost:7000'; // Ajustez selon vos besoins

export const fetchFrisbees = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/freezbes`);
        return response.data; // Retournez les données pour utilisation dans vos composants
    } catch (error) {
        console.error("There was an error fetching the freeze bees", error);
        throw error; // Propager l'erreur pour la gérer dans le composant
    }
};
