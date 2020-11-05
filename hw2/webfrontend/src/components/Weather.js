import React from "react";

const Weather = (props) => {
    return (
        <div className="weather__info">
            {props.icon && <img src={props.icon} />}
            {props.city && props.country && (
                <p className="weather__key">
                    Location:{" "}
                    <span className="weather__value">
                        {props.city},{props.country}
                    </span>
                </p>
            )}
            {props.weather && (
                <p className="weather__key">
                    Weather:{" "}
                    <span className="weather__value">{props.weather}</span>
                </p>
            )}
            {props.temperature && (
                <p className="weather__key">
                    Temperature:{" "}
                    <span className="weather__value">
                        {props.temperature}°C
                    </span>
                </p>
            )}
            {props.humidity && (
                <p className="weather__key">
                    Humidity:{" "}
                    <span className="weather__value">{props.humidity}% </span>
                </p>
            )}
            {props.description && (
                <p className="weather__key">
                    Description:{" "}
                    <span className="weather__value">{props.description}</span>
                </p>
            )}
            {props.error && (
                <p className="weather__error">
                    <span>{props.error}</span>
                </p>
            )}
        </div>
    );
};

// class Weather extends React.Component {
//     render() {
//         return (
//             <div>
//                 {this.props.icon && <img src={this.props.icon} />}
//                 {this.props.city && this.props.country && (
//                     <p>
//                         Location: {this.props.city},{this.props.country}
//                     </p>
//                 )}
//                 {this.props.weather && <p>Weather: {this.props.weather}</p>}
//                 {this.props.temperature && (
//                     <p>Temperature: {this.props.temperature}</p>
//                 )}
//                 {this.props.humidity && <p>Humidity: {this.props.humidity}</p>}
//                 {this.props.error && <p>{this.props.error}</p>}
//             </div>
//         );
//     }
// }
export default Weather;
