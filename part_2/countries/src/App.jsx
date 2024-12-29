import { useState, useEffect } from 'react'
import { CountriesList, CountryDetails } from './components/Countries' 
import Weather from './components/Weather' 
import Notification from './components/Notification' 
import countryService from './services/countries'
import weatherService from './services/weather'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [countriesToShow, setSelCountriesToShow] = useState(null)
  const [selCountry, setSelCountry] = useState(null)
  const [notification, setNotification] = useState(null)
  const [weather, setWeather] = useState(null)
  
  let message = null

  useEffect(() => {
    countryService
      .getAll()
      .then(countries => {
        setAllCountries(countries)
      })
  }, [])

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    const countries = newFilter === ''
      ? []
      : allCountries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
    const countriesToShow = (countries.length > 1 && countries.length <= 10) ? countries : null
    const selCountry = countries.length === 1 ? countries[0] : null
    const message = countries.length > 10 ? 'Too many matches, specify another filter' : null
    setFilter(newFilter)
    setSelCountriesToShow(countriesToShow)
    setSelCountry(selCountry)
    setNotification(message)
    if (selCountry != null) checkWeather(selCountry)
  }

  const showCountry = (id) => {
    console.log(id)
    const country = allCountries.find(country => country.cca3 === id)
    setSelCountry(country)
    checkWeather(country)
  }

  const checkWeather = (country) => {
    weatherService
      .getWeather(country)
      .then(weather => setWeather(weather))
      .catch(error => setWeather(null))
  }


  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <CountriesList countries={countriesToShow} showCountry={showCountry} />
      <CountryDetails country={selCountry} />
      <Weather country={selCountry} weather={weather}/>
      <Notification message={notification} />
    </div>
  )
}

export default App