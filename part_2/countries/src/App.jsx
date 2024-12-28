import { useState, useEffect } from 'react'
import axios from 'axios'
import { CountriesList, CountryDetails } from './components/Countries' 

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const request = axios.get(baseUrl + '/all')
    return request.then(response => response.data)  
}

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [countriesToShow, setSelCountriesToShow] = useState(null)
  const [selCountry, setSelCountry] = useState(null)
  const [notification, setNotification] = useState(null)
  
  let message = null

  useEffect(() => {
    getAll()
      .then(countries => {
        setAllCountries(countries)
      })
  }, [])

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    const countries = filteredCountries(newFilter)
    setFilter(newFilter)
    setSelCountriesToShow(listedCountries(countries))
    setSelCountry(selectedCountry(countries))
  }

  const filteredCountries = (filter) => {
    return filter === ''
      ? []
      : allCountries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  }

  const listedCountries = (countries) => {
    let countriesToShow = []
    if (countries.length > 1 && countries.length <= 10) {
      message = null
      console.log('filteredCountries', 'output', countries)
      countriesToShow = countries
    }
    if (countries.length > 10) {
      message = 'Too many matches, specify another filter'
      countriesToShow = null
    }
    setNotification(message)
    return countriesToShow
  }

  const selectedCountry = (countries) => {
    console.log('selectedCountry', 'input', countries)
    if (countries && countries.length === 1) {
        console.log(countries[0])
        return countries[0]
    }
    return null
  }

  const showCountry = (id) => {
    console.log(id)
    setSelCountry(allCountries.find(country => country.cca3 === id))
  }

  const Notification = ({message}) => {
    if (message) {
      return (
        <div>{message}</div>
      ) 
    }
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <CountriesList countries={countriesToShow} showCountry={showCountry} />
      <CountryDetails country={selCountry} />
      <Notification message={notification} />
    </div>
  )
}

export default App