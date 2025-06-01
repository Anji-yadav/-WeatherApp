import React, { useState } from 'react'; // <-- Corrected: Added useState import
import Input from './components/Input';
import { CardContent, Cards } from './components/Cards';
import Button from './components/Button';
import { Sun, CloudRain, Snowflake } from 'lucide-react';

const API_KEY = '9a1ef0f4e8175fe292205ce0c92ca22e';

const WeatherApp = () => {
  // State variables
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch weather data
  const fetchWeather = async () => { // Corrected typo: fetechWeather -> fetchWeather
    setLoading(true);
    setError('');
    try {
      
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      
      if (!response.ok) {
        
        const errorData = await response.json();
        throw new Error(errorData.message || 'City not found or API error');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
      setWeather(null);
    } finally { 
      setLoading(false);
    }
  };

  console.log(weather); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center p-4">
      <Cards className="w-full max-w-md p-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-center">Weather App</h2>
          <div className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-grow p-2 border rounded-md"
            />
            <Button
              onClick={fetchWeather}
              disabled={loading || !city}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Get Weather'}
            </Button>
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {weather && (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">{weather.name}, {weather.sys.country}</h3>
              <div className="flex items-center justify-center mb-2">
                {/* Display weather icon based on weather.main or weather.weather[0].icon */}
                {weather.weather[0].main === 'Clear' && <Sun size={48} className="text-yellow-500" />}
                {weather.weather[0].main === 'Clouds' && <CloudRain size={48} className="text-gray-500" />} {/* Using CloudRain for clouds, you might want a specific cloud icon */}
                {weather.weather[0].main === 'Rain' && <CloudRain size={48} className="text-blue-500" />}
                {weather.weather[0].main === 'Snow' && <Snowflake size={48} className="text-blue-300" />}
                {/* Add more conditions for other weather types */}
                <p className="text-4xl ml-4 font-bold">{Math.round(weather.main.temp)}°C</p>
              </div>
              <p className="text-lg capitalize mb-1">{weather.weather[0].description}</p>
              <p className="text-md">Humidity: {weather.main.humidity}%</p>
              <p className="text-md">Wind Speed: {weather.wind.speed} m/s</p>
            </div>
          )}
          {!weather && !loading && !error && (
            <p className="text-center text-gray-500">Enter a city to get weather information.</p>
          )}
        </CardContent>
      </Cards>
    </div>
  );
};

export default WeatherApp;
