const apiKey = "db5398ff6708f73ae0a254233f59ed83";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDisplay = document.querySelector(".weather");
const errorDisplay = document.querySelector(".error");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        errorDisplay.style.display = "block";
        weatherDisplay.style.display = "none";
    } else {
        let data = await response.json()

        document.querySelector(".city").innerHTML = data.name + " - " + data.sys.country;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".temp-feel").innerHTML = Math.round(data.main.feels_like) + "°C";
        document.querySelector(".weather-description").innerHTML = data.weather[0].description;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "assets/images/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "assets/images/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "assets/images/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "assets/images/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "assets/images/mist.png";
                break;
            default:
                console.log("Unknown weather type");
                break;
        }

        weatherDisplay.style.display = "block";
        errorDisplay.style.display = "none";
    }

}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)
})

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
