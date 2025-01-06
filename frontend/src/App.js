import React, { useState, useEffect } from "react";
import { fetchWeather, fetchFilteredQueries } from "./services/api";
import Pagination from "./components/Pagination";
import ExportCsv from "./components/ExportCSVButton";
import "./App.css";
//import axios from "axios";

function App() {
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [weather, setWeather] = useState(null);
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [filters, setFilters] = useState({ filter_date: '', filter_region: '', page: 1 });
  const [paginationInfo, setPaginationInfo] = useState({ currentPage: 1, totalPages: 1 });

  const getWeather = async () => {
    const payload = {
        city,
        region,
    };

    try {
        const response = await fetch("/api/weather/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Specify JSON content type
                "X-CSRFToken": getCookie("csrftoken"), // Ensure CSRF token is included
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const data = await response.json();
            setWeather(data); // Assuming backend returns a JSON object with weather info
        } else {
            console.error("Failed to fetch weather data:", response.statusText);
        }
    } catch (error) {
        console.error("Error occurred while fetching weather data:", error);
    }
};

// Helper function to retrieve CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].startsWith(`${name}=`)) {
                cookieValue = decodeURIComponent(cookies[i].substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


  const applyFilters = async () => {
      try {
          const response = await fetchFilteredQueries(filters);
          setFilteredQueries(response.data.results);
          setPaginationInfo({
              currentPage: response.data.current,
              totalPages: response.data.total_pages,
          });
      } catch (error) {
          console.error('Error applying filters:', error);
      }
  };

  useEffect(() => {
      applyFilters();
  }, [filters]);

  const handlePageChange = (page) => {
      setFilters({ ...filters, page });
  };

  return (
      <div className="app-container">
          <h1>Welcome to WeatherScope Kenya</h1>
          <p>Get your weather today!</p>

          <div className="weather-form">
              <input
                  type="text"
                  placeholder="Enter City"
                  value={city}
                  name="city"
                  id="city"
                  onChange={(e) => setCity(e.target.value)}
              />
              <input
                  type="text"
                  placeholder="Enter Region (Optional)"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
              />
              <button onClick={getWeather}>Get Weather</button>
          </div>

          {weather && (
              <div className="weather-info">
                  <h2>Weather in {weather.city}, {weather.region}</h2>
                  <p>Temperature: {weather.temperature}°C</p>
                  <p>Condition: {weather.description}</p>
                  <p>Date: {weather.date}</p>
                  <p>Time: {weather.time}</p>
                  <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="Weather Icon" />
              </div>
          )}

          <div className="filters">
              <input
                  type="date"
                  onChange={(e) => setFilters({ ...filters, filter_date: e.target.value })}
              />
              <input
                  type="text"
                  placeholder="Region"
                  onChange={(e) => setFilters({ ...filters, filter_region: e.target.value })}
              />
              <button onClick={applyFilters}>Apply Filters</button>
          </div>

          <div className="filtered-queries">
              {filteredQueries.map((query) => (
                  <p key={query.id}>{query.city}, {query.region} - {query.query_time}</p>
              ))}
          </div>

          <Pagination
              currentPage={paginationInfo.currentPage}
              totalPages={paginationInfo.totalPages}
              onPageChange={handlePageChange}
          />

          <ExportCsv />
      </div>
  );
}

export default App;