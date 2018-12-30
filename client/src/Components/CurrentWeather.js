import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../App.css';
import Header from "./Header";

class CurrentWeather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cities: [],
            cityNotFound1: '',
            cityNotFound2: '',
            cityNotFound3: '',
            invalidCities: [],
            httpError: ''
        };
    }

    componentDidMount() {

        fetch('/search-location-weather')
            .then(res => res.json())
            .then(data => {
                let invalidCities = [];
                console.log(data.apiRequest1.cod);
                console.log(data.apiRequest2.cod);
                console.log(data.apiRequest3.cod);
                this.setState({
                    httpError: data.apiRequest1.cod
                });


                if(data.apiRequest1.cod === '404') {
                    this.setState({
                        city1NotFound: '404'
                    });
                    invalidCities.push(data.city1);
                    console.log(data.city1 + " is invalid");
                }
                if(data.apiRequest2.cod === '404') {
                    this.setState({
                        city2NotFound: '404'
                    });
                    invalidCities.push(data.city2);
                    console.log(data.city2 + " is invalid");
                }
                if(data.apiRequest3.cod === '404') {
                    this.setState({
                        city3NotFound: '404'
                    });
                    invalidCities.push(data.city3);
                    console.log(data.city3 + " is invalid");
                }



                if (invalidCities.length > 0) {
                    this.setState({
                        invalidCities: invalidCities
                    })

                } else {

                    const convertUnixToTime = (myDate) => {
                        // Convert sunrise unix time stamp to hour
                        const time = new Date(0);
                        time.setUTCSeconds(myDate);
                        return time.toLocaleTimeString(myDate);
                    };

                    // method to create a city (json object)
                    const createCity = (req) => {
                        return {
                            name: req.name,
                            sunrise: convertUnixToTime(req.sys.sunrise),
                            sunset: convertUnixToTime(req.sys.sunset),
                            temp: Math.round(req.main.temp),
                            description: req.weather[0].description,
                            icon: req.weather[0].icon
                        };
                    };

                    const arrayCities = [
                        createCity(data.apiRequest1),
                        createCity(data.apiRequest2),
                        createCity(data.apiRequest3)
                    ];

                    this.setState({
                        cities: arrayCities
                        });
                    }
            })
            .catch(err => {
                console.log(err);

            })
    }

    render() {
        if (this.state.invalidCities.length > 0) {

           let errorCities = '';
            for (let i = 0; i < this.state.invalidCities.length; i++) {

                if(i > 0) {
                    errorCities += ',';
                }

                errorCities += ' ';
                errorCities += "'" + this.state.invalidCities[i] + "'" ;
            }
            return (
                <div className='cityError'>Cities {errorCities} were not recognized. Please insert a valid name.</div>
            )
        }
        else if (this.state.httpError === 401) {
            return (
                <div> </div>
            )
        }
        else {
            const cities = this.state.cities;

            const columns = [
                {
                    Header: 'Name',
                    accessor: 'name'
                }, {
                    Header: 'Temperature (°C)',
                    accessor: 'temp',
                    Cell: props => <span>{props.value}°</span>
                }, {
                    Header: 'Sunrise (GMT)',
                    accessor: 'sunrise'
                }, {
                    Header: 'Sunset (GMT)',
                    accessor: 'sunset'
                }, {
                    Header: 'Icon',
                    accessor: 'icon',
                    Cell: props => <img src={`http://openweathermap.org/img/w/${props.value}.png`} alt='weather icon'></img>
                }, {
                    Header: 'Description',
                    accessor: 'description'
                }
            ];

            return (
                <div>
                    <Header/>
                    <div className='customTable mx-5 my-5'>
                        <ReactTable
                            data = {cities}
                            columns = {columns}
                            defaultSorted = {[
                                {
                                    id: "age",
                                    desc: true
                                }
                            ]}
                            defaultPageSize = {3}
                            showPagination = {false}
                            style={{
                                borderRadius: '5px'
                            }}

                        />
                    </div>
                    <div className="col-md-12 btn-center">
                        <Link to="/">
                            <button className='btn btn-outline-light mx-sm-3 mb-2 mt-5'>Go to home</button>
                        </Link>
                    </div>
                </div>
            );
        }
    }
}
export default CurrentWeather;