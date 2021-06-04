import {useEffect, useState} from 'react';
import axios from "axios";

function App() {
  
  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')
  
  useEffect(()=>{
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  },[])

  const countriesList =
    filterText === '' ?
      countries :
      countries.filter(country => country.name.toLowerCase().includes(filterText.toLowerCase()))
  
  return (
    <div>
      <Filter setFilterText={setFilterText} />
      <Countries countriesList={countriesList} setFilterText={setFilterText} />
    </div>
  )
}

const Countries = ({countriesList, setFilterText}) => {

  const showCountry = (country) => {
    setFilterText(country.name)
  }
  
  if(countriesList.length > 10){
    return (
      <div>
        Too many countries, filter better
      </div>
    )
  }else if(countriesList.length === 1){
     let country = countriesList[0]
     
     return (
       <Country country={country} />
    )
  }else{
    return (
      <div>
        {
          countriesList.map(
            country => 
              <li key={country.numericCode}>{country.name}<button onClick={() => showCountry(country)}>Show</button></li>
          )
        }
      </div>
    );
  }
}

const Country = ({country}) => {
  
  const [weather, setWeather] = useState('')
  
  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [country])
  
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>population {country.population}</p>

      <h2>languages</h2>
      <ul>
        {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} alt={'country flag'} height={100}/>
      
      <h2>Weather in {weather === '' ? '' : country.capital}</h2>
      <p>Temperature: {weather === '' ? '' : weather.main.temp} celcius</p>
      <p>Wind: {weather === '' ? '' : weather.wind.speed}</p>
      <p>Data from <a href={'https://openweathermap.org'}>OpenWeatherMap.org</a></p>
    </div>
  )
}

const Filter = ({setFilterText}) => {
  
  const changeFilterInput = (e) => {
    setFilterText(e.target.value)
  }
  
  return (
    <div>
      Find countries <input onChange={changeFilterInput}/>
    </div>
  )
}

export default App;
