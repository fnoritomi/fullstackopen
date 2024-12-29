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

const Languages = ({country}) => {
    if ('languages' in country) return (
        <>
            <h3><b>languages:</b></h3>
            <ul>
                {Object.entries(country.languages).map(([code, language]) => (<li key={code}>{language}</li>))}
            </ul>
        </>
    )
}

const CountryDetails = ({country}) => {
    console.log(country)
    if (country) {
        return (
            <div>
                <h2>{country.name.common}</h2>
                <div>capital {country.capital}</div>
                <div>area {country.area}</div>
                <Languages country = {country} />
                <p><img src={country.flags.png} /></p>
            </div>
        ) 
    }
}  

export { CountriesList, CountryDetails }