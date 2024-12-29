import axios from 'axios'

const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY

console.log('api', api_key)

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (country) => {
    const parameters = {
        params: {
            lat: country.latlng[0],
            lon: country.latlng[1],
            units: 'metric',
            appid: api_key
        }
    }
    const request = axios.get(baseUrl, parameters)
    return request.then(response => response.data)
}

export default { getWeather }
