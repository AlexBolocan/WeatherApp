let URL_CURRENT_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
let URL_FORECAST_WEATHER =
  "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
let URL_WEATHER_ICON_PREFIX = "http://openweathermap.org/img/w/"; // sufix .png
let urlWheatherApp =
  "https://wheatherapp-91e24-default-rtdb.europe-west1.firebasedatabase.app/";
let wheatherElem = {
  main: {},
};

// functia pentru afisare vreme acum
async function showWeather() {
  let weatherCity = document.querySelector(`[name="cityName"]`).value;
  let currentWeather = await fetch(URL_CURRENT_WEATHER + weatherCity);
  let resCurrentWeather = await currentWeather.json();
  wheatherElem.elem = resCurrentWeather;
  let dataWeatherCity = document.querySelector("#idShowWeather");
  let strWeatherCity = "";
  strWeatherCity += `
    <div class="currentWeather "> <img src="${URL_WEATHER_ICON_PREFIX}${wheatherElem.elem.weather[0].icon}.png" alt=""> </div>
    <div class="currentWeather "> Descriere: ${wheatherElem.elem.weather[0].description}  </div>
    <div class="currentWeather "> Temperatura este: ${wheatherElem.elem.main.temp} &#176C  </div>
    <div class="currentWeather "> Presiune este: ${wheatherElem.elem.main.pressure} MPa </div>
    <div class="currentWeather "> Umiditatea este: ${wheatherElem.elem.main.humidity} %  </div>
    <div class="currentWeather "> Maxima zilei este: ${wheatherElem.elem.main.temp_max} &#176C  </div>
    <div class="currentWeather "> Minima zilei este: ${wheatherElem.elem.main.temp_min} &#176C  </div>
`;
  dataWeatherCity.innerHTML = strWeatherCity;
}

// functia pentru afisare prognoza
async function showForecast() {
  let weatherCity = document.querySelector(`[name="cityName"]`).value;
  let currentWeather = await fetch(URL_FORECAST_WEATHER + weatherCity);
  let resCurrentWeather = await currentWeather.json();
  wheatherElem.elem = resCurrentWeather.list;
  let dataWeatherCity = document.querySelector("#idShowForecast");
  let strWeatherCity = "";
  
  for (let index = 0; index < wheatherElem.elem.length; index++) {
    let dataDayHour = wheatherElem.elem[index].dt_txt;
    let strDay = "";
    let hourDay = "";
    for (let dayIdx = 0; dayIdx < dataDayHour.length; dayIdx++) {
      if (dayIdx < 10) {
        strDay = strDay + dataDayHour[dayIdx];
      } else {
        hourDay = hourDay + dataDayHour[dayIdx];
      }
    }
    console.log(strDay);
    console.log(hourDay);
    if (hourDay === " 00:00:00") {
      strWeatherCity += `
        <div>  
          <br></br>        
          <div class="currentWeather"> Ziua: ${strDay} </div>
        </div>`;
    }

    console.log(strWeatherCity);
    strWeatherCity += `
      <div>  
        <div class="currentWeather "> <img src="${URL_WEATHER_ICON_PREFIX}${wheatherElem.elem[index].weather[0].icon}.png" alt=""> </div>
        <div class="currentWeather "> Ora : ${hourDay} </div>
        <div class="currentWeather "> Temperatura : ${wheatherElem.elem[index].main.temp} &#176C  </div>
        <div class="currentWeather "> Descriere: ${wheatherElem.elem[index].weather[0].description}  </div>
      </div>`;
  }
  console.log(strWeatherCity);
  dataWeatherCity.innerHTML = strWeatherCity;
}
