import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const request = axios.get(baseUrl + '/all')
    return request.then(response => response.data)  
}

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState('')
  let message = null

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    console.log(filter)
  }

  useEffect(() => {
    getAll()
      .then(countries => {
        setAllCountries(countries)
      })
  }, [])



  const filteredCountries = filter === ''
  ? []
  : allCountries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  const countriesQt = filteredCountries.length

  const countriesToShow = () => {
    if (countriesQt > 1 && countriesQt <= 10) {
      message = null
      return filteredCountries
    }
    if (filteredCountries.length > 10) message = 'Too many matches, specify another filter'
    return null
  }

  const selectedCountry = () => {
    if (countriesQt === 1) return filteredCountries[0]
    return null
  }

  const Country = ({name}) => {
    return (
      <div>{name}</div>
    )
  }

  const CountriesList = ({countries}) => {
    console.log(countries)
    if (countries) {
      return (
        <div>
            {countries.map(country => 
              <Country key={country.cca3} name={country.name.common}/> 
            )}
        </div>
      ) 
    }
  }

  const CountryDetails = ({country}) => {
    console.log(country)
    if (country) {
      return (
        <div>
          <h2>{country.name.common}</h2>
          <div>capital {country.capital}</div>
          <div>area {country.area}</div>
          <h3><b>languages:</b></h3>
          <ul>
            {Object.entries(country.languages).map(([code, language]) => (<li key={code}>{language}</li>))}
          </ul>
          <img src={country.flags.png} />
        </div>
      ) 
    }
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
      <Notification message={message} />
      <CountriesList countries={countriesToShow()} />
      <CountryDetails country={selectedCountry()} />
    </div>
  )
}

export default App