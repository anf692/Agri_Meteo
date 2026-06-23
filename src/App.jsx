import { useState, useEffect } from "react";
import Map from "./components/Map";
import WeatherPanel from "./components/WeatherPanel";
import { useWeather } from "./hooks/useWeather";
import { useGeolocation } from "./hooks/useGeolocation";
import { regions } from "./data/regions";

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
    <div className="app">
      <Map
        selectedRegion={selectedRegion}
        onSelectRegion={handleSelectRegion}
      />

      <WeatherPanel
        selectedRegion={selectedRegion}
        weather={weather}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;

