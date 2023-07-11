// import React, { useState } from 'react';
// const axios = require('axios');
// const Weather = () => {
//   const [city, setCity] = useState('');
//   const [weatherData, setWeatherData] = useState(null);
//   const API_KEY = '432333a8f1msh03dccea1f5fe944p14c840jsne58c7a128d14'; // Replace with your actual API key

//   const fetchWeatherData = async () => {
//     try {
//       const response = await rapidApiClient.request({
//         method: 'GET',
//         url: 'https://weatherapi-com.p.rapidapi.com/current.json',
//         params: {q: '53.1,-0.13'},
//         headers: {
//             'X-RapidAPI-Key': '432333a8f1msh03dccea1f5fe944p14c840jsne58c7a128d14',
//             'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
//         },
//       });
//       setWeatherData(response.data);
//     } catch (error) {
//       console.log('Error fetching weather data:', error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchWeatherData();
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter city"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//         />
//         <button type="submit">Get Weather</button>
//       </form>
//       {weatherData && (
//         <div>
//           <h2>Weather for {weatherData.location.name}</h2>
//           <p>Temperature: {weatherData.current.temp_c}°C</p>
//           <p>Condition: {weatherData.current.condition.text}</p>
//           {/* Add more weather details as needed */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Weather;
// import React, { useState } from 'react';

// const Weather = () => {
//   const [city, setCity] = useState('');
//   const [weatherData, setWeatherData] = useState(null);
//   const API_KEY = '432333a8f1msh03dccea1f5fe944p14c840jsne58c7a128d14'; // Replace with your actual API key

//   const fetchWeatherData = async () => {
//     try {
//       const response = await fetch(
//         `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
//       );
//       const data = await response.json();
//       setWeatherData(data);
//     } catch (error) {
//       console.log('Error fetching weather data:', error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchWeatherData();
//   };
import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';
import { Navigate, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
const Weather = () => {
    let imageStyle = {
        height: "700px",
        width: "1480px",
        backgroundImage:
        'url("https://media.istockphoto.com/id/1163366315/vector/sky-background-and-pastel-color-vector-illustration.jpg?s=612x612&w=0&k=20&c=xnMNLfDTeCjKQzPgRlgpJLAkBIrnpEsOGKk7HpWHKQY=")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '432333a8f1msh03dccea1f5fe944p14c840jsne58c7a128d14'; 
  const navigate = useNavigate();
  const Change1 = () =>{  
      navigate("/page1");
  }
  const Change2 = () => {
    window.open("http://127.0.0.1:5000/")
}

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        'https://weatherapi-com.p.rapidapi.com/current.json',
        {
          params: {
            q: city,
          },
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
          },
        }
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div class="image" style={imageStyle}>
      <button class="btn btn-primary b2" onClick={Change1}>Back to Home Page</button>
      <button class="btn btn-primary b3" onClick={Change2}>Go to Image Processing</button>
      <div className='loc'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          className='txt1'
          onChange={(e) => setCity(e.target.value)}
          />
        <button type="submit" className='but1'>Get Weather</button>
        <br></br><br></br>
      </form>
      {weatherData && (
        <div>
            <h4>Weather Conditions:</h4>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Humidity: {weatherData.current.humidity}</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <br></br>
          <h4>Geographical Details</h4>
          <p>Longitude: {weatherData.location.lon}</p>
          <p>Latitude: {weatherData.location.lat} </p>
          <br></br>
          <h4>Time:</h4>
          <p>{weatherData.location.localtime}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Weather;

