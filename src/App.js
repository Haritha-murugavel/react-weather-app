import React, { useState } from "react";
const api = {
  key: "47ad6d835bac4230145b80d3fcd40141",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [value,setValue] = useState('');
  const [weather,setWeather] = useState({});
  const searchPlace = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${value}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setValue('');
        });
    

    }
  }

  const dateBuilder = (d) => {
    let months = [
      "January", "February", "March", "April", 
      "May", "June", "July", "August", 
      "September", "October", "November", "December"
    ];  
    let  daysOfWeek = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    let day = daysOfWeek[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`

  }
  
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp >16)? 'app warm' : 'app'):'app'}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="search...." onChange={e => setValue(e.target.value)} onKeyPress={searchPlace}  value={value} />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
        <div className="location-box">
        <div className="location">
         {weather.name},{weather.sys.country}
          </div>
          <div className="date">
          {dateBuilder(new Date())}
          </div>
        </div>
        <div className="weather-box">
        <div className="temp-box">
        {Math.round(weather.main.temp)}&deg;C
          </div>
          <div className="weather">
          {weather.weather[0].main}
        </div>
        </div>

      </div>
      ):('')}

      </main>
    </div>
  );
}

export default App;
