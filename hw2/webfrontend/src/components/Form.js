import React from "react";

const Form = (props) => {
    return (
        <div>
            <form onSubmit={props.getWeather}>
                <input type="text" name="city" placeholder="Enter City..." />
                <button>Get Weather</button>
            </form>
        </div>
    );
};
// class Form extends React.Component {
//     render() {
//         return (
//             <div>
//                 <form onSubmit={this.props.getWeather}>
//                     <input type="text" name="city" placeholder="City..." />
//                     <button>Get Weather</button>
//                 </form>
//             </div>
//         );
//     }
// }
export default Form;
