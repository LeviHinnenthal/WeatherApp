import { useState } from "react";
import "./App.css";
import close from "./assets/close.png";
import search from "./assets/search.png";
import fog from "./assets/fog.png";
import clouds from "./assets/clouds.png";
import clear from "./assets/sun.png";
import wind from "./assets/wind.png";
import trueno from "./assets/trueno.png";
import rain from "./assets/rain.png";
import React from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState(``);
  const [errorLocation, setErrorLocation] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=5d4989e2ebcb6e53d7f0d9389db51a13`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
          setLocation("");
          setErrorLocation(false);
        })
        .catch((error) => {
          console.log(error);
          setErrorLocation(true);
        });
    }
  };

  const handleClick = () => {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
    setLocation("");
  };

  return (
    <div className="ContainerAll">
      <div className="backgroundImage"></div>
      <div className="top">
        <h2 className="searchForACity">Search for a city</h2>
        {errorLocation ? <p className="locationNotFounded">Location not founded</p> : ""}
        <div className="searchContainer">
          <img
            onClick={handleClick}
            className="buscar"
            id="buscarImg"
            src={search}
            alt=""
          />
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            type="text"
            placeholder="Search..."
          />
          <img
            onClick={() => setLocation("")}
            src={close}
            alt=""
            className="closeImg"
          />
          
        </div>
      
      </div>

      {data.name != undefined && (
        <>
          <div className="location">
            <img className="locationImg" src="" alt="" />
            <p>{data.name}</p>
          </div>

          <div className="mainInformation">
            <div className="imgStatus">
              <img
                src={
                  data.weather[0].main === "Clouds"
                    ? clouds
                    : data.weather[0].main === "Rain"
                    ? rain
                    : data.weather[0].main === "Clear"
                    ? clear
                    : data.weather[0].main === "Wind"
                    ? wind
                    : data.weather[0].main === "Storm"
                    ? trueno
                    : fog
                }
                alt=""
              />
            </div>

            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>

            <div className="temp">
              {data.main ? <p>{data.main.temp.toFixed()}º</p> : null}
            </div>
          </div>

          <div className="otherData">
            <div className="feels">
              <p>Feels like</p>
              {data.main ? <p>{data.main.feels_like.toFixed()}ºC</p> : null}
            </div>

            <div className="humidity">
              <p>Humidity</p>
              {data.main ? <p>{data.main.humidity.toFixed()}%</p> : null}
            </div>

            <div className="separator"></div>

            <div className="wind">
              <p>Wind</p>
              {data.wind ? (
                <p>{(data.wind.speed * 3.6).toFixed()}km/h</p>
              ) : null}
            </div>

            <div className="pressure">
              <p>Pressure</p>
              {data.main ? <p>{data.main.pressure.toFixed()}hPa</p> : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
