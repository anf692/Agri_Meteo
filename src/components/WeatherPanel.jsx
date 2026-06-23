import { senegalPaths } from "../data/senegalPaths";
import { calculateRisk } from "../utils/riskCalculator";
import RiskBadge from "./RiskBadge";

function WeatherPanel({ selectedRegion, weather, loading, error }) {
  if (!selectedRegion) {
    return null;
  }

  const region = senegalPaths.find((r) => r.id === selectedRegion);

  return (
    <div className="weather-panel">
      <h2>{region.name}</h2>

      {loading && <p>Chargement des données météo...</p>}

      {error && <p className="error">{error}</p>}

      {weather && !loading && !error && (
        <div>
          <p>Température : {weather.temp}°C</p>
          <p>Humidité : {weather.humidity }%</p>
          <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />

          <RiskBadge risk={calculateRisk(weather.temp, weather.humidity)} />

        </div>
      )}
    </div>
  );
}

export default WeatherPanel;


