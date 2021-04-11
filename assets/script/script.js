/* Declaire Variables*/
function initPage() {
    const cityInput = document.getElementById("cityInput");
    const searchBtn = document.getElementById("search-button");
    const clearHist = document.getElementById("clearHistory");
    const cityName = document.getElementById("city-name");
    const currentPic = document.getElementById("currentPic");
    const currentTemp = document.getElementById("temperature");
    const currentHumid = document.getElementById("humidity");
    const currentWind = document.getElementById("windSpeed");
    const currentUV = document.getElementById("UV-index");
    const histOry = document.getElementById("history");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);
}

/* API Key */
    const apiKey = "134e5146b42c4bd36e44262482266fac"

// Function fot saved city name, excecute current condition
    function fetchWeather(cityName) {
        let requestURL = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
        axios.get(requestURL)
        .then(function(response){
            console.log(response);
// Method for using "date" objects
            const currentDate = new Date(response.data.dt*1000);
            console.log(currentDate);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            cityName.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
            let weatherImg = response.data.weather[0].icon;
            currentPic.setAttribute("src","https://openweathermap.org/img/wn/" + weatherImg + "@2x.png");
            currentPic.setAttribute("alt",response.data.weather[0].description);
            currentTemp.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176C"; //Check this later
            currentTemp.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            currentTemp.innerHTML = "Wind Speed: " + response.data.main.wind.speed + " KPH";
        let lat = response.data.coord.lat;
        let lon = response.data.coord.lon;
        let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=1";
        axios.get(UVQueryURL)
        .then(function(response) {
            let uvIndex = document.createElement("span");
            uvIndex.setAttribute("class", "badge badge-danger");
            uvIndex.innerHTML = response.data[0].value;
            currentUV.innerHTML = "UV Index: ";
            currentUV.append(uvIndex);
        });
//5-day forecast execution
        let cityId = response.data.id;
        let forecastQURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=" + apiKey;
        axios.get(forecastQURL)
        .then(function(response){
    // Display forecast
            console.log(respone);
            const forecastElement = document.querySelectorAll(".forecast");
            for (i=0; i<forecastW.length; i++) {
                forecastW[i].innerHTML = "";
                const forecastIndex = i*8 +4;
                const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                const forecastDay = forecastDate.getDate();
                const forecastMonth = forecastDate.getMonth() + 1;
                const forecastYear = forecastDate.getFullYear();
                const forecastDateElment = document.createElement("p");
                forecastDateElment.setAttribute("class", "mt-3 mb-0 forecast-date");
                forecastDateElment.innerHTML = forecastDay + "/" + forecastMonth + "/" + forecastYear;
                forecastElement[i].append(forecastDateElment);
                const forecastWeatherEl = document.createElement("img");
                forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
                forecastElement[i].append(forecastWeatherEl);
                const forecastTemp = document.createElement("p");
                forecastTemp.innerHTML = "Temp: " + k2f(response.data.main.temp) + " &#176C"; //Check this later
                forecastTemp[i].append(forecastTemp);
                const forecastHumid = document.createElement("p");
                forecastHumid.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                forecastElement[i].append(forecastHumid);
            }
        })
    });
}

"api.openweathermap.org/data/2.5/onecall?lat=30.489772&lon=-99.771335&units=metric"


// let weather = {
//     apiKey: "134e5146b42c4bd36e44262482266fac",
//     fetchWeather: function (city) {
//         fetch("https://http://api.openweathermap.org/data/2.5/weather?q="
//         + city
//         + "&units=metric&appid="
//         + this.apiKey
//         )
//         .then((response) => response.json())
//         .then((data) => this.displayWeather(data));
//     },
//     displayWeather: function(data) {
//         const { name } = data;
//         const { icon, description} = data.weather[0];
//         const { temp, humidity } = data.main;
//         const { speen } = data.wind;
//         console.log(name,icon,description,temp,humidity,speed)
//     }


// }