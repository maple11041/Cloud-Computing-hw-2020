const axios = require("axios");
const KEY = "MY_API_KEY";

exports.handler = async (event) => {
    console.log(event);
  let city = "gdfgd";
  let coord = {lon: 121.53, lat: 25.05};
  
  if (event.queryStringParameters && event.queryStringParameters.city) {
      city =  event.queryStringParameters.city;
    }
    const weather_res = await axios.get(
                "https://api.openweathermap.org/data/2.5/weather",
                {
                    params: {
                        q: city,
                        appid: KEY,
                    },
                }
            );
    // console.log(weather_res);
    let weather = weather_res.data;
    // console.log(weather);
    
    const parsed_data = {
      temp:   (parseInt(weather.main.temp) - 273),
      city: weather.name,
      humidity: weather.main.humidity,
      country: weather.sys.country,
      weather: weather.weather[0].main,
      icon: "http://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png",
      description: weather.weather[0].description
}
        
    // };
    // console.log(parsed_data);
    let response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify(parsed_data)
    };
    return response;
    
}

