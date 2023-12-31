// utils/api.js
import axios from 'axios';

export async function fetch5DaysDailyForecasts(locationId) {
  try {
    const queryParams = {
      apikey: process.env.NEXT_PUBLIC_API_KEY,
      language: 'pt-br',
      details: true,
      metric: true
    };

    const response = await axios.get(process.env.NEXT_PUBLIC_ACCU_URL + `forecasts/v1/daily/5day/${locationId}`, {
      params: queryParams,
    });

    const fiveDailyForecasts = response.data;

    return fiveDailyForecasts;

  } catch (error) {
    console.error('Erro ao buscar as condições do tempo dos próximos 5 dias da localidade informada: ', error);
    throw error; // Lança o erro para que possa ser tratado no componente ou em outra parte do código
  }
}
