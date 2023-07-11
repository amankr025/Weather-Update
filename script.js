let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(searchInput.value);
  searchInput.value = "";
});

//Set up the API key
var APIKey = "a0aca8a89948154a4182dcecc780b513";
//dab3af44de7d24ae7ff86549334e45bd

const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`,

      { mode: "cors" }
    );

    const weatherData = await response.json();
    if (weatherData.id) {
      forecast(weatherData.id);
    }
    console.log(weatherData);
    const { name } = weatherData;
    const { feels_like } = weatherData.main;
    const { id, main } = weatherData.weather[0];
    loc.textContent = name;
    climate.textContent = main;
    tempvalue.textContent = Math.round(feels_like - 273);
    if (id < 300 && id > 200) {
      tempicon.src = "./icons/thunderstorm.svg";
    } else if (id < 400 && id > 300) {
      tempicon.src = "./icons/cloud-solid.svg";
    } else if (id < 600 && id > 500) {
      tempicon.src = "./icons/rain.svg";
    } else if (id < 700 && id > 600) {
      tempicon.src = "./icons/snow.svg";
    } else if (id < 800 && id > 700) {
      tempicon.src = "./icons/clouds.svg";
    } else if (id == 800) {
      tempicon.src = "./icons/clouds-and-sun.svg";
    }
  } catch (error) {
    alert("city not found");
  }
};

// Here we display the 5 days forecast for the current city.
const forecast = async (cityid) => {
  console.log("testing forcast");
  var dayover = false;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?id=${cityid}&appid=${APIKey}`,

    { mode: "cors" }
  );
  const weatherData = await response.json();
  if (weatherData) {
    for (i = 0; i < 5; i++) {
      var date = new Date(
        weatherData.list[(i + 1) * 8 - 1].dt * 1000
      ).toLocaleDateString();
      var iconcode = weatherData.list[(i + 1) * 8 - 1].weather[0].icon;
      var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
      var tempK = weatherData.list[(i + 1) * 8 - 1].main.temp;
      var tempC = ((tempK - 273.5) * 1.8 + 32).toFixed(2);
      var humidity = weatherData.list[(i + 1) * 8 - 1].main.humidity;

      $("#fDate" + i).html(date);
      $("#fImg" + i).html("<img src=" + iconurl + ">");
      $("#fTemp" + i).html(((tempC-32)/1.8).toFixed(2) + " &#8451");
      $("#fHumidity" + i).html(humidity + "%");
    }
  }

};

window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";

      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}     `;

      fetch(api)
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          const { name } = data;
          const { feels_like } = data.main;
          const { id, main } = data.weather[0];

          loc.textContent = name;
          climate.textContent = main;
          tempvalue.textContent = Math.round(feels_like - 273);
          if (id < 300 && id > 200) {
            tempicon.src = "./icons/thunderstorm.svg";
          } else if (id < 400 && id > 300) {
            tempicon.src = "./icons/cloud-solid.svg";
          } else if (id < 600 && id > 500) {
            tempicon.src = "./icons/rain.svg";
          } else if (id < 700 && id > 600) {
            tempicon.src = "./icons/snow.svg";
          } else if (id < 800 && id > 700) {
            tempicon.src = "./icons/clouds.svg";
          } else if (id == 800) {
            tempicon.src = "./icons/clouds-and-sun.svg";
          }

          console.log(data);
        });
    });
  }
});
