
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const ejs = require('ejs');
const app = express();
const _ = require('lodash');
const fetch = require('node-fetch');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


// Get Route
app.get("/", (req, res) => {
    res.render('home');
})

app.post("/", (req, res) => {

    // OpenWeather API Details
    let city = req.body.city;
    const apiKey = "9e30b929852f450e315f513ed438524f"
    const unit = "metric"
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`

    try{
        https.get(URL, function (response) {

        
            response.on("data", function (data) {

            
                const weatherData = JSON.parse(data);
                
    
                if (weatherData.cod == 404) {
                    res.render('home', { code: weatherData.cod, message: _.capitalize(weatherData.message), city });
                } else if (weatherData.cod == 200) {
    
                    const { temp, temp_min, temp_max, humidity } = weatherData.main;
                    const speed = weatherData.wind.speed;
                    const { main, description, icon } = weatherData.weather[0];
                    const city = weatherData.name;
                    const { sunrise, sunset } = weatherData.sys;
                    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    const sunrise_time = new Date(sunrise).toLocaleTimeString("en-US")
                    const sunset_time = new Date(sunset).toLocaleTimeString("en-US");
                    const angles = weatherData.wind.deg;
    
                    function degToCompass(num) {
                        var val = Math.floor((num / 22.5) + 0.5);
                        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
                        return arr[(val % 16)];
                    }
                    const wind_dir = degToCompass(angles)
    
    
                    function fetchUrl(){
                        var myFunc =  require('./image');
    
                        var result =  myFunc(icon, description);
                        result.then((data)=>{
        
                            const backgroundUrl = data.results[0].urls.regular;
                            
                            res.render('home', {
                                backgroundUrl,
                                code: "200",
                                message: "City weather found.",
                                city,
                                main,
                                iconUrl,
                                humidity,
                                currTime : new Date().toLocaleTimeString("en-US"),
                                currDate: new Date().toLocaleDateString('en-IN'),
                                temp,
                                description:_.capitalize(description),
                                sunrise_time, sunset_time,
                                temp_min, temp_max,
                                wind_dir,
                                speed,
                                
                            })
                        })
                    }
                    fetchUrl();
                    
                }
            })
         
    })
    
    }
    catch(err) {
        console.error(err.message);
    }

})


app.listen(3000, function (req, res) {
    console.log('Server started on port 3000');
})