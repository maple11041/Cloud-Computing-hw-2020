import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        weather: undefined,
        icon: undefined,
        description: undefined,
        error: undefined,
    };
    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.city.value;
        console.log(city);
        const response = await axios
            .get(
                "https://lfw52ihw44.execute-api.us-east-1.amazonaws.com/default/myWebHook",
                {
                    params: {
                        city: city,
                    },
                }
            )
            .catch((err) => {
                console.log("test");
            });
        // .then((res) => {
        //     console.log(res.data);
        // });
        console.log(response);
        if (response) {
            this.setState({
                temperature: response.data.temp,
                city: response.data.city,
                country: response.data.country,
                humidity: response.data.humidity,
                weather: response.data.weather,
                icon: response.data.icon,
                description: response.data.description,
                error: "",
            });
            // console.log(this.state.description);
        } else {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                weather: undefined,
                icon: undefined,
                description: undefined,
                error: "City Not Found!",
            });
        }
    };
    render() {
        return (
            <div>
                <div className="wapper">
                    <div className="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-5 title-container">
                                    <Titles />
                                </div>
                                <div className="col-xs-7 form-container">
                                    <Form getWeather={this.getWeather} />
                                    <Weather
                                        weather={this.state.weather}
                                        city={this.state.city}
                                        temperature={this.state.temperature}
                                        country={this.state.country}
                                        humidity={this.state.humidity}
                                        icon={this.state.icon}
                                        description={this.state.description}
                                        error={this.state.error}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
