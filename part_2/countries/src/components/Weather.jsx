const Weather = ({country, weather}) => {
    if (country != null &&  weather!= null ) {
        const imgIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        return (
            <div>
                <h3>Weather in {country.name.common}</h3>
                <div>temperature {weather.main.temp} celcius</div>
                <img src={imgIcon} />
                <div>wind {weather.wind.speed} m/s</div>
            </div>
        ) 
    }
}

export default Weather