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