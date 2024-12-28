const CountryItem = ({name, showCountry}) => {
    return (
      <div>{name} <button onClick={showCountry}>show</button></div>
    )
  }

const CountriesList = ({countries, showCountry}) => {
    console.log(countries)
    if (countries) {
        return (
        <div>
            {countries.map(country => 
                <CountryItem key={country.cca3} name={country.name.common} showCountry={() => showCountry(country.cca3)} /> 
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

export { CountriesList, CountryDetails }