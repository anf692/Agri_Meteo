import "./App.css";
import { useState, useEffect } from "react";
import Map from "./components/Map";
import WeatherPanel from "./components/WeatherPanel";
import { useWeather } from "./hooks/useWeather";
import { useGeolocation } from "./hooks/useGeolocation";
import { regions } from "./data/regions";
import WeatherChart from "./components/WeatherChart";

function App() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const geoRegionId = useGeolocation();
  const { weather, loading, error, fetchWeather } = useWeather();

  // Effet 1 : définir la région depuis la géolocalisation
  useEffect(() => {
    if (geoRegionId && !selectedRegion) {
      setSelectedRegion(geoRegionId);
    }
  }, [geoRegionId, selectedRegion]);

  // Effet 2 : fetch météo quand la région change
  useEffect(() => {
    if (selectedRegion) {
      const region = regions.find(r => r.id === selectedRegion);

      if (region) {
        fetchWeather(region.lat, region.lon);
      }
    }
  }, [selectedRegion]);

  // clic sur une région
  function handleSelectRegion(id) {
    setSelectedRegion(id);
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">🌾 AgriMétéo SN</div>
        <div className="sidebar-menu-item active">Dashboard</div>
        <div className="sidebar-menu-item">Alertes</div>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <input type="text" placeholder="Rechercher une région..." />
        </div>

        <div className="content-grid">
          <div className="card map-card">
            <Map selectedRegion={selectedRegion} onSelectRegion={handleSelectRegion} />
          </div>

          <div className="card panel-card">
            <WeatherPanel
              selectedRegion={selectedRegion}
              weather={weather}
              loading={loading}
              error={error}
            />
          </div>
        </div>

        <div className="card chart-card">
          <WeatherChart currentTemp={weather?.temp} />
        </div>
      </main>
    </div>
  );
}

export default App;

