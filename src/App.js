import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import "./App.css";

function App() {
  const apikey = "f56f24967aaf51182d1d4df628297c6d";
  const [city, setCity] = useState("");
  const [data, setData] = useState({});

  const getWeather = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apikey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("res", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeInput = (e) => {
    setCity(e.target.value);
  };
  const handleSearch = () => {
    getWeather(city);
  };

  useEffect(() => {
    getWeather("delhi");
  }, []);

  return (
    <div className="col-md-12">
      <div className="weather">
        <h1>Find Your city Weather</h1>
        <div className="d-grid gap-3 col-4 mt-4">
          <input
            type="text"
            className="form-control"
            onChange={handleChangeInput}
            value={city}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="col-md-12 text-center mt-5 ">
        <div className="shadow rounded weatherReasult">
          <img
            className="weatherIcon"
            src="https://cdn-icons-png.flaticon.com/512/164/164806.png"
            alt=""
          />

          <h5 className="name">{data?.name}</h5>
          <h5 className="city">{(data?.main?.temp - 273.15).toFixed(2)} ℃</h5>
          <div class="icons">
            <i class="fas fa-wind"> &nbsp;{data?.wind?.speed} km/h</i>
            <br />
            <i class="fas fa-tint"> &nbsp; {data?.main?.humidity} %</i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
