import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [weather_info, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/weather/", { city });
      setWeather(response.data);
    } catch (err) {
      setError("Could not fetch weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Weather Scope Kenya</h1>
        <p>Get your weather today!</p>
      </header>

      <main>
        <div className="weather-form">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather} disabled={loading}>
            {loading ? "Loading..." : "Get Weather"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather_info && (
          <div className="weather-display">
            <h2>{weather_info.city}, {weather_info.region}</h2>
            <p>{weather_info.date}, {weather_info.time}</p>
            <p>
              {weather_info.temperature}°C - {weather_info.description}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${weather_info.icon}.png`}
              alt={weather_info.description}
            />
          </div>
        )}
      </main>
    </div>
  );
}

axios.defaults.headers.common['X-CSRFToken'] = window.CSRF_TOKEN;
export default App