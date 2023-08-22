// Grabbing the elemets
var submit = document.getElementById("submit");
var city = document.getElementById("city");
// let cityName = document.getElementById("cityName")
let cityName = document.querySelector("#cityName");
let temperature = document.getElementById("temperature");
let prev_entries = document.getElementById("prev_entries")
let cols= document.getElementsByClassName("col")

// console.log(cols)

cols=Array.from(cols)

cols.forEach(element => {
  // console.log(element)
  element.addEventListener("mouseover",()=>{
    // console.log("mouseover")
    let child1 = element.children[0];
    console.log(child1)
    child1.classList.add("border-dark")
    let child2=child1.children[0];
    child2.classList.add("border-dark")
    child2.classList.add("text-bg-dark")

  })

  element.addEventListener("mouseout",()=>{
    // console.log("mouseout")
    let child1 = element.children[0];
    console.log(child1)
    child1.classList.remove("border-dark")
    let child2=child1.children[0];
    child2.classList.remove("border-dark")
    child2.classList.remove("text-bg-dark")

  })



});




const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "508228a665msh14919cbc54adf79p157879jsn0092ef986616",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

const getWeather = (city) => {
  fetch(
    `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}&apiId={}`,
    options
  )
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((response) => {
      if (response.error){
        alert("Error in the name")
        return  
      }
      console.log(response);
      cityName.innerText = city;
      temp.innerText = response.temp;
      feels_like.innerText = response.feels_like;
      cloud_pct.innerText = response.cloud_pct;
      humidity.innerText = response.humidity;
      humidityHead.innerText = response.humidity;
      max_temp.innerText = response.max_temp;
      min_temp.innerText = response.min_temp;
      temperature.innerText = response.temp;
      //   wind_degrees.innerText = response.wind_degrees;
      wind_speed.innerText = response.wind_speed;
      wind_speedHead.innerText = response.wind_speed;

      let sunRiseDate = new Date(response.sunrise*1000)
      let hour = sunRiseDate.getHours()
      let minutes = sunRiseDate.getMinutes()
      sunrise.innerText = ""+hour+":"+minutes;

      let sunSetDate = new Date(response.sunset*1000)
      let hours = sunSetDate.getHours()
      let minutess = sunSetDate.getMinutes()
      sunset.innerText = ""+hours+":"+minutess;

      
      // Appending to previous weather reports
      prev_entries.innerHTML += 
      `
      <tr>
        <th scope="row" class="text-start">${city}</th>
        <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg>${response.temp}</td>
        <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg>${response.min_temp}</td>
        <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg>${response.max_temp}</td>
        <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg>${response.humidity}</td>
      </tr>
      `
      const video = document.querySelector('video');

      if (response.temp >  25) {
        //Summer
        video.setAttribute('src', './summer.mp4')
        let headings = document.querySelectorAll('.heading');
        headings.forEach((heading)=>{
          heading.style.color = `#ffffff`;
          heading.style.textShadow =  "1px 1px 1px black";

        })
      }

      else if (response.temp >= 5) {
        //Normal
        video.setAttribute('src', './normal.mp4')
        let headings = document.querySelectorAll('.heading');
        headings.forEach((heading)=>{
          heading.style.color = `#ffffff`;
          heading.style.textShadow =  "1px 1px 1px black";

        })
      }

      else if (response.temp < 5) {
        //Winter
        video.setAttribute('src', './winter.mp4')
        let headings = document.querySelectorAll('.heading');
        headings.forEach((heading)=>{
          heading.style.color = `#000`;
          heading.style.textShadow =  "1px 1px 1px white";
        })
      }


    
    })
    .catch((err) => console.error(err));
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(city.value);
});

getWeather("Delhi")

// console.log(count)
// console.log(getWeather)
