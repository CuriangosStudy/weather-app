import { useState } from 'react';
import { fetchLocationId } from '../pages/api/city-search';
import { fetchCurrentConditions } from '../pages/api/current-conditions';
import { fetch5DaysDailyForecasts } from '../pages/api/5-days-daily-forecasts';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('Belo Horizonte'); //Ciadde padrão para busca
  const [cityId, setCityId] = useState(null);
  const [currentWeatherConditionsData, setWeatherConditionsData] = useState(null);
  const [FiveDaysDailyForecastsData, setFiveDaysDailyForecastsData] = useState(null);
  const [isSearching, setIsSearching] = useState(false); // Novo estado para indicar se a pesquisa está em andamento

  const handleSearch = async () => {
    try {
      // Se a pesquisa já estiver em andamento, não faça nada
      if (isSearching) {
        return;
      }

      // Inicie a pesquisa. Isso foi feito para evitar que faça as requisições em loop.
      setIsSearching(true);

      const newLocationId = await fetchLocationId(searchQuery);
      setCityId(newLocationId);

      console.log(newLocationId);

      if (newLocationId) {
        const newCurrentWeatherConditionsData = await fetchCurrentConditions(newLocationId);
        setWeatherConditionsData(newCurrentWeatherConditionsData);

        const new5DaysDailyForecastsData = await fetch5DaysDailyForecasts(newLocationId);
        setFiveDaysDailyForecastsData(new5DaysDailyForecastsData);
      }
    } catch (error) {
      console.error('Erro ao buscar dados: ', error);
    } finally {
      // Independentemente do resultado, encerre a pesquisa
      setIsSearching(false);
    }
  };

  return (
    <div>
      <h1>Dados da API Externa:</h1>
      <div>
        <label>
          Pesquisar Cidade:
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <button onClick={handleSearch}>Pesquisar</button>
      </div>
      {cityId ? (
        <div>
          <p>ID da Localidade: {cityId}</p>
          {currentWeatherConditionsData ? (
            <div>
              <p>Condição do Tempo: {currentWeatherConditionsData.WeatherText}</p>
              <p>Temperatura: {currentWeatherConditionsData.Temperature?.Metric?.Value}°C</p>
              <p>Sensação Térmica: {currentWeatherConditionsData.RealFeelTemperature?.Metric?.Value}°C</p>
              <p>Umidade Relativa: {currentWeatherConditionsData.RelativeHumidity}%</p>
              <p>Máxima: {currentWeatherConditionsData.TemperatureSummary?.Past12HourRange?.Maximum?.Metric?.Value}°C</p>
              <p>Mínima: {currentWeatherConditionsData.TemperatureSummary?.Past12HourRange?.Minimum?.Metric?.Value}°C</p>
            </div>
          ) : (
            <p>Carregando dados do clima...</p>
          )}

          {/* Renderize as previsões diárias, assumindo que DailyForecasts é um array */}
          {FiveDaysDailyForecastsData && FiveDaysDailyForecastsData.DailyForecasts ? (
            <div>
              <h2>Previsões Diárias para os Próximos 5 Dias:</h2>
              {FiveDaysDailyForecastsData.DailyForecasts.map((forecast, index) => (
                <div key={index}>
                  <p>Data: {forecast.Date}</p>
                  <p>Temperatura Máxima: {forecast.Temperature.Maximum.Value}°C</p>
                  <p>Temperatura Mínima: {forecast.Temperature.Minimum.Value}°C</p>
                  {/* Adicione outras propriedades conforme necessário */}
                </div>
              ))}
            </div>
          ) : (
            <p>Carregando previsões diárias...</p>
          )}

          {/* Outros Dados: (Adapte conforme necessário) */}
          {/* Exemplo: */}
          {/* <p>Outro Dado: {FiveDaysDailyForecastsData?.OutroDado}</p> */}
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div >
  );
};

export default Home;


export async function getServerSideProps() {
  return {
    props: {
      // Dados iniciais que você deseja passar para o componente
      cityId: null,
    },
  };
}
