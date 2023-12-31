// utils/api.js
import axios from 'axios';

export async function fetchLocationId(query) {
  try {
    const queryParams = {
      apikey: process.env.NEXT_PUBLIC_API_KEY,
      q: query,
      language: 'pt-br',
      details: false,
    };

    const response = await axios.get(process.env.NEXT_PUBLIC_ACCU_URL + 'locations/v1/cities/search', {
      params: queryParams,
    });

    const locationId = response.data[0]?.Key;
    return locationId;
  } catch (error) {
    console.error('Erro ao buscar ID da localidade informada: ', error);
    throw error; // Lança o erro para que possa ser tratado no componente ou em outra parte do código
  }
}

// Restante das funções do arquivo api.js
