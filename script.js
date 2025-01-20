"use strict";
// query selctor for home screen layouts
const homeSearchButton = document.querySelector(".search-button");
const homeLeftSideBar = document.querySelector(".left-sidebar-grid");
const secondScreenAfterSearchClicked = document.querySelector(
  ".left-sidebar-grid-for-search"
);
// query selectors for left side home screen layout
const closeButton = document.querySelector(".close-button");
const chennaiButton = document.querySelector(".chennai-button");
const imageSelctorForChanging = document.querySelector(".img-changing");
const degreeSpaceLeft = document.querySelector(".left-degree-text");
const leftSideBarConditionText = document.querySelector(
  ".left-condition-space-text"
);
const leftSideTodayDateText = document.querySelector(".today-date");
const leftSidebarLocationText = document.querySelector(".location-text");
// celcias and farenhit button
const celciasButton = document.querySelector(".cel-button");
const farenheatButton = document.querySelector(".faren-button");
// Right space

//right side first grid (5)
const rightFirstInfoTop = document.querySelector(".tomorrow-image");
const rightFirstInfoTopCelcias = document.querySelector(".inside-info-cel");

const rightFirstTopSecondBoxText = document.querySelector(".inside-info-top1");
const rightFirstTopSecondBoxImage = document.querySelector(".day-after-day1");
const rightFirstTopSecondBoxCelcias =
  document.querySelector(".inside-info-cel1");

const rightFirstTopThirdBoxText = document.querySelector(".inside-info-top2");
const rightFirstTopThirdBoxImage = document.querySelector(".day-after-day2");
const rightFirstTopThirdBoxCelcies =
  document.querySelector(".inside-info-cel2");

const rightFirstTopFourthBoxText = document.querySelector(".inside-info-top3");
const rightFirstTopFourthBoxImage = document.querySelector(".day-after-day3");
const rightFirstTopFourthBoxCelcies =
  document.querySelector(".inside-info-cel3");

const rightFirstTopFifthBoxText = document.querySelector(".inside-info-top4");
const rightFirstTopFifthBoxImage = document.querySelector(".day-after-day4");
const rightFirstTopFifthBoxCelcies =
  document.querySelector(".inside-info-cel4");

// query selector for second (bottom) layout
const todaysHighlistWind = document.querySelector(".speed");
const todaysHighlistHumidity = document.querySelector(".text-percentage");
const progressBar = document.querySelector(".percentage-symbol");
const todaysHighlistVisibility = document.querySelector(".visi-text");
const todaysHighlistAirpressure = document.querySelector(".air-text-count");

// query selector for search list buttons
const listBox = document.querySelector(".list-box");

// button for search on home screen
homeSearchButton.addEventListener("click", function () {
  secondScreenAfterSearchClicked.style.display = "grid";
  homeLeftSideBar.style.display = "none";
});

// close button
closeButton.addEventListener("click", function () {
  secondScreenAfterSearchClicked.style.display = "none";
  homeLeftSideBar.style.display = "grid";
});
// fetch data from json
const weatherDataFromJson = async function () {
  const responce = await fetch("/weather.json");
  const jsonData = await responce.json();
  // Working with button and fetching data for user request
  // Bangalore button;
  let bangaloreDataForStatic = [];
  for (let elem of jsonData.weather) {
    elem.currentcity = false;
    if (elem.city == "Bangalore") {
      bangaloreDataForStatic.push(elem);
    }
  }
  const displayFarenheat = function () {
    farenheatButton.addEventListener("click", function () {
      bangaloreDataForStatic[0].weatherdata.forEach((el) => {
        el.date == "Today"
          ? (degreeSpaceLeft.textContent = `${el.faren_max}`)
          : 0;
        el.date == "Tomorrow"
          ? (rightFirstInfoTopCelcias.textContent = `${el.faren_max} ${el.faren_min}`)
          : 0;
        el.date == "11-01-23"
          ? (rightFirstTopSecondBoxCelcias.textContent = `${el.faren_max} ${el.faren_min}`)
          : 0;
        el.date == "12-01-23"
          ? (rightFirstTopThirdBoxCelcies.textContent = `${el.faren_max} ${el.faren_min}`)
          : 0;
        el.date == "13-01-23"
          ? (rightFirstTopFourthBoxCelcies.textContent = `${el.faren_max} ${el.faren_min}`)
          : 0;
        el.date == "14-01-23"
          ? (rightFirstTopFifthBoxCelcies.textContent = `${el.faren_max} ${el.faren_min}`)
          : 0;
      });
    });
  };
  // Button function for celcius
  const displayCelciasButton = function () {
    celciasButton.addEventListener("click", function () {
      bangaloreDataForStatic[0].weatherdata.forEach((el) => {
        el.date == "Today"
          ? (degreeSpaceLeft.textContent = `${el.temp_max}`)
          : 0;

        el.date == "Tomorrow"
          ? (rightFirstInfoTopCelcias.textContent = `${el.temp_max} ${el.temp_min}`)
          : 0;
        el.date == "11-01-23"
          ? (rightFirstTopSecondBoxCelcias.textContent = `${el.temp_max} ${el.temp_min}`)
          : 0;
        el.date == "12-01-23"
          ? (rightFirstTopThirdBoxCelcies.textContent = `${el.temp_max} ${el.temp_min}`)
          : 0;
        el.date == "13-01-23"
          ? (rightFirstTopFourthBoxCelcies.textContent = `${el.temp_max} ${el.temp_min}`)
          : 0;
        el.date == "14-01-23"
          ? (rightFirstTopFifthBoxCelcies.textContent = `${el.temp_max} ${el.temp_min}`)
          : 0;
      });
    });
  };
  displayCelciasButton();
  displayFarenheat();
  // search city buttons
  listBox.addEventListener("click", function (e) {
    let html = e.target;
    let classNameOfClickedEvent = html.getAttribute("class");
    const cityClicked = document.querySelector(`.${classNameOfClickedEvent}`);
    secondScreenAfterSearchClicked.style.display = "none";
    homeLeftSideBar.style.display = "grid";
    // clicked city inforamtion separate into one array
    let currentcityWeatherDatas = [];
    for (let elem of jsonData.weather) {
      elem.currentcity = false;
      if (elem.city == cityClicked.textContent) {
        elem.currentcity = true;
        currentcityWeatherDatas.push(elem);
      }
    }
    // left side bar layout datas add from json file
    currentcityWeatherDatas.forEach((el) => {
      if (el.weatherdata[0].date == "Today") {
        leftSidebarLocationText.textContent = `${el.city}`;
        imageSelctorForChanging.setAttribute(
          "src",
          `/images/${el.weatherdata[0].condition}.png`
        );
        degreeSpaceLeft.textContent = `${el.weatherdata[0].temp_max}`;
        leftSideBarConditionText.textContent = `${el.weatherdata[0].condition}`;
      }
    });

    currentcityWeatherDatas[0].weatherdata.forEach((el) => {
      if (el.date == "Today") {
        console.log(el);
        leftSideTodayDateText.textContent = `${el.date}. ${el.day}`;
        // Todays hightlights and right side layouts add from json file
        todaysHighlistWind.textContent = `${el.wind_status}`;
        progressBar.setAttribute("value", `${el.humidity.slice(0, 2)}`);
        todaysHighlistHumidity.textContent = `${el.humidity}`;
        todaysHighlistVisibility.textContent = `${el.visibility}`;
        todaysHighlistAirpressure.textContent = `${el.pressure}`;
      }

      // right top first-box
      if (el.date == "Tomorrow") {
        rightFirstInfoTop.setAttribute("src", `/images/${el.condition}.png`);
        rightFirstInfoTopCelcias.textContent = `${el.temp_max} ${el.temp_min}`;
      }
      // right top second box
      if (el.date == "11-01-23") {
        rightFirstTopSecondBoxText.textContent = `${el.date}`;
        rightFirstTopSecondBoxImage.setAttribute(
          "src",
          `/images/${el.condition}.png`
        );
        rightFirstTopSecondBoxCelcias.textContent = `${el.temp_max} ${el.temp_min}`;
      }
      // right top third box
      if (el.date == "12-01-23") {
        rightFirstTopThirdBoxText.textContent = `${el.date}`;
        rightFirstTopThirdBoxImage.setAttribute(
          "src",
          `/images/${el.condition}.png`
        );
        rightFirstTopThirdBoxCelcies.textContent = `${el.temp_max} ${el.temp_min}`;
      }
      // right top fourth
      if (el.date == "13-01-23") {
        rightFirstTopFourthBoxText.textContent = `${el.date}`;
        rightFirstTopFourthBoxImage.setAttribute(
          "src",
          `/images/${el.condition}.png`
        );
        rightFirstTopFourthBoxCelcies.textContent = `${el.temp_max} ${el.temp_min}`;
      }
      // right top fifth
      if (el.date == "14-01-23") {
        rightFirstTopFifthBoxText.textContent = `${el.date}`;
        rightFirstTopFifthBoxImage.setAttribute(
          "src",
          `/images/${el.condition}.png`
        );
        rightFirstTopFifthBoxCelcies.textContent = `${el.temp_max} ${el.temp_min}`;
      }
      celciasButton.addEventListener("click", displayCelciasButton());
      farenheatButton.addEventListener("click", displayFarenheat());
    });
  });
};
// call the async function
weatherDataFromJson();
