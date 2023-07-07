const inputBox=document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const wind_speed = document.getElementById('Wind speed');
const humidity = document.getElementById('humidity');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

let time=document.getElementById("dt");
setInterval(()=>{
  let d=new Date();
time.innerHTML=d.toLocaleTimeString();
},1000)

//ee function lo manam icchina input pass ayyi api valla result vastadi
//for API we used openweathermap.org
//akkada API-->Curent weather data-->search by city name link
//inak account create chesukunaka nee api key ni my api_key lo store chesam.
//so ippudu api call ki kavalsina two values-city and api key vachesayi
async function checkWeather(city){
    const api_key="0fcac3c46d61458b1851dd3be8834607";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
   

    //fetching data by using fetch function
    const weather_data = await fetch(`${url}`).then(response => response.json());
    
    console.log(weather_data);


    //okkavela wrong city type chesthe error kakunda
    if(weather_data.cod===`404`){
        location_not_found.style.display="flex";
        //loc not found ni css nunchi access cehsi display flex chesam appudu flex box setting ayyi choopistadi
        weather_body.style.display="none";
        console.log("Error");
        return;
    }



    // if paina cond true kaledu ante error ledu ante dispaly flex of weather body AND NONE FOR ERRor
    location_not_found.style.display="none";
    weather_body.style.display="flex";
    

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    //console log lo main lo temp:temperatutre value itla unde ade show cheyadniki .inenrhtml vadutunam
    //kelvin nuchi degree centigrade kosam -273.15
    //math.round  roundoff kosam


    //same migilinavatiki kuda api nunchi vache data update cheyali
    description.innerHTML=`${(weather_data.weather[0].description)}`;

    humidity.innerHTML=`${(weather_data.main.humidity)}%`;

    wind_speed.innerHTML = `${(weather_data.wind.speed)}Km/H`;

    //for image

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src="/assets/cloud.png";
            break;
        case 'Clear':
             weather_img.src="/assets/clear.png";
            break;
        case 'Rain':
            weather_img.src="/assets/rain.png";
            break;
        case 'Mist':
            weather_img.src="/assets/mist.png";
            break;
        case 'Snow':
            weather_img.src="/assets/snow.png";
            break;
        case 'Haze':
                weather_img.src="/assets/mist.png";
                break;
       
    }

    // return fetch(url).then((response) => response.json());
}

//await appudaina sync function lo vadutam
// .then(response=>response.json())-->ah vachina resposne ni .json lo ki convert chestunam

//await enduknte motham okkadaggara okkate saari store cheyochu 


//adding event listener click to serach box
//dani lo type hesi search click chesthe checkweather function lo ki manam ichina input value pass avtundi


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
}
);



// The fetch() method in JavaScript is used to request data from a server. The request can be of any type of API that returns the data in JSON or XML. The fetch() method requires one parameter, the URL to request, and returns a promise.

// JavaScript Promise are easy to manage when dealing with multiple asynchronous operations where callbacks can create callback hell leading to unmanageable code. Prior to promises events and callback functions were used but they had limited functionalities and created unmanageable code. Multiple callback functions would create callback hell that leads to unmanageable code. Promises are used to handle asynchronous operations in JavaScript.

//The promise constructor takes only one argument which is a callback function