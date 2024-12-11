const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Replace with your WeatherAPI key
const API_KEY = '218213f06010421288194855241112';

app.get('/', (req, res) => {
    res.send('Welcome to the Weather App! Visit /weather?city=your_city');
});

// Weather endpoint
app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).send('Please provide a city name');
    }

    try {
        // Make an API call to WeatherAPI
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
            params: {
                key: API_KEY,
                q: city,
            }
        });

        const weatherData = response.data;
        res.send({
            city: weatherData.location.name,
            temperature: weatherData.current.temp_c, // temperature in Celsius
            condition: weatherData.current.condition.text,
            humidity: weatherData.current.humidity,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred. Please try again.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
