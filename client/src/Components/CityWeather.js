import React, {Component} from 'react';

class CityWeather extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.name);
        return (
            <div>
                <p>Cidade: {this.props.name}</p>
            </div>

        )
    }
}

export default CityWeather;
