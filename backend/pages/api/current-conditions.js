// utils/api.js
import axios from 'axios';

export async function fetchCurrentConditions(locationId) {
  try {
    const queryParams = {
      apikey: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-br',
      details: true,
    };

    const response = await axios.get(process.env.NEXT_PUBLIC_ACCU_URL + `currentconditions/v1/${locationId}`, {
      params: queryParams,
    });

    const conditions = response.data[0];
    console.log(conditions);
    return conditions;

  } catch (error) {
    console.error('Erro ao buscar condições do tempo da localidade informada: ', error);
    throw error; // Lança o erro para que possa ser tratado no componente ou em outra parte do código
  }
}
