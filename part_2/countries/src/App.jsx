import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const request = axios.get(baseUrl + '/all')
    return request.then(response => response.data)  
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => setFilter(event.target.value)

  useEffect(() => {
    getAll()
      .then(allCountries => {
        console.log(allCountries)
        setCountries(allCountries)
      })
  }, [])

  const Country = ({name}) => {
    return (
      <div>{name}</div>
    )
  }

  const CountriesList = ({countriesToShow}) => {
    console.log(countriesToShow)
    return (
      <div>
          {countriesToShow.map(country => 
            <Country key={country.cca3} name={country.name.common}/> 
          )}
      </div>
    )
  }


  return (
    <div>
      <CountriesList countriesToShow={countries} />
    </div>
  )
}

export default App