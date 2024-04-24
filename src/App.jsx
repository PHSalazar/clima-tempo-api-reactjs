import { useRef, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";

import './App.css'

function App() {

  const [queryLocation, setQueryLocation] = useState(null);
  const [message, setMessage] = useState('Criado por Pedro Henrique Salazar consumindo a API OpenWeather.');
  const [dataWeather, setDataWeather] = useState(null);
  const queryLocationInput = useRef('');


  const fetchData = async () => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${queryLocation}&limit=3&units=metric&appid=37a3fee3d379ce91786f5279d5af0086&lang=pt`;

      setMessage("Procurando por " + queryLocation);

      const fetchAPI = await fetch(apiUrl).then(res => res.json()).then(data => {
        if (data.cod == 200) {
          setDataWeather(data);
          setMessage(null);
        }else{
          setDataWeather(null);
          setMessage("Cidade não encontrada.");
        }
      });
      

    }catch (error) {
      console.log("Erro ao tentar consultar API: ", error);
    }
  }

  const submitQueryLocation = (event) => {
    event.preventDefault();

    if (queryLocationInput.current.value == '' || queryLocation == null) {
      queryLocationInput.current.focus();
      return
    }

    fetchData();
  }

  const handleChangeInput = (e) => {
    setQueryLocation(e.target.value);
  }
  return (
    <>
      <header>
        <h1>Encontrar Previsão do Tempo</h1>
        <form action="/" id='formWeather' onSubmit={submitQueryLocation}>
          <div id="inputForm" title='Escolha uma Localização'>
            <input type="text" placeholder='Cidade/Estado/País' id='q' onChange={handleChangeInput} ref={queryLocationInput}/>
            <button type='submit' title='Procurar'>
              <IoIosSearch />
            </button>
          </div>
        </form>
      </header>

      <div className='infoContainer'>
        {dataWeather ? (
          <>
            <span id='spanLoc' style={{display: 'flex', alignItems: 'center', gap: '8px'}}><FaLocationDot /> {dataWeather.name}, {dataWeather.sys.country}</span>
            <span id='spanTemp' title='Temperatura'>{dataWeather.main.temp} °C</span>
            <span id='spanDesc'>
              <img src={`http://openweathermap.org/img/w/${dataWeather.weather[0].icon}.png`} alt="" />
              {dataWeather.weather[0].description}
            </span>
            <div id='footer'>
              <span title='Umidade'><WiHumidity /> {dataWeather.main.humidity}%</span>
              <span title='Vento'><FaWind /> {dataWeather.wind.speed}m/s</span>
            </div>
          </>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </>
  )
}

export default App
