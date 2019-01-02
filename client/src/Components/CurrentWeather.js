import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../App.css';
import Home from "./Home";
import ErrorComponent from "./Error";
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js';
import Loader from './loader';

Chart.defaults.global.defaultFontColor = 'white';

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

                if(data.apiResponse1 == null || data.apiResponse2 == null || data.apiResponse3 == null){
                    //if any of the responses is undefined, we want to redirect to error component
                    this.setState({
                        httpError: -1
                    });
                }
                else {
                    this.setState({
                        httpError: data.apiResponse1.cod
                    });


                    if (data.apiResponse1.cod === '404') {
                        this.setState({
                            city1NotFound: '404'
                        });
                        invalidCities.push(data.city1);
                        console.log(`Error on getting info: the city ${data.city1} is invalid`);
                    }
                    if (data.apiResponse2.cod === '404') {
                        this.setState({
                            city2NotFound: '404'
                        });
                        invalidCities.push(data.city2);
                        console.log(`Error on getting info: the city ${data.city2} is invalid`);
                    }
                    if (data.apiResponse3.cod === '404') {
                        this.setState({
                            city3NotFound: '404'
                        });
                        invalidCities.push(data.city3);
                        console.log(`Error on getting info: the city ${data.city3} is invalid`);
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
                            createCity(data.apiResponse1),
                            createCity(data.apiResponse2),
                            createCity(data.apiResponse3)
                        ];

                        this.setState({
                            cities: arrayCities
                        });
                    }
                }
            })
            .catch(err => {
                console.log(err);

            })
    }

    render() {

        //check if there was any error
        if ( this.state.httpError === 401 || this.state.httpError === 500 || this.state.httpError === -1) {
            console.log("error has been triggered: " + this.state.httpError);
            return (
                <div>
                    <ErrorComponent/>
                </div>
            )
        }

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
                <div>
                    <Home />
                    <div className='cityError'>Cities {errorCities} were not recognized. Please insert a valid name.</div>
                </div>
            )
        }
        else {
            const cities = this.state.cities;
            if(cities.length>0) {


                // Table
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
                        // Cell: props => <img src={`http://openweathermap.org/img/w/${props.value}.png`} alt='weather icon'></img>
                        Cell: props => <img src={require(`../assets/weatherIcons/${props.value}.png`)}
                                            alt='weather icon'></img>
                    }, {
                        Header: 'Description',
                        accessor: 'description'
                    }
                ];


                //Bar Chart
                const data = {
                    labels: [cities[0].name, cities[1].name, cities[2].name],
                    datasets: [
                        {
                            label: 'Temperature (ºC)',
                            backgroundColor: [
                                'rgba(255,255,255,0.7)',
                                'rgba(255,255,255,0.7)',
                                'rgba(255,255,255,0.7)'
                            ],
                            borderColor: 'rgba(211,211,211,1)',
                            borderWidth: 1,
                            hoverBorderWidth: 3,
                            hoverBackgroundColor: 'rgba(255,255,255,0.7)',
                            hoverBorderColor: 'rgba(0,113,156,1)',
                            scaleFontColor: "#FFFFFF",
                            data: [cities[0].temp, cities[1].temp, cities[2].temp]
                        }
                    ]
                };

                const chartOptions = {
                    xAxes: [{
                        barPercentage: 0.1,
                        categoryPercentage: .8
                    }],
                    responsive: true,
                    maintainAspectRatio: false
                };

                return (
                    <div>
                        <Home/>
                        <div className='row'>
                            <div className='customTable col-centered col-md-11 px-0 mb-5'>
                                <ReactTable
                                    data={cities}
                                    columns={columns}
                                    defaultSorted={[
                                        {
                                            id: "age",
                                            desc: true
                                        }
                                    ]}
                                    defaultPageSize={3}
                                    showPagination={false}
                                    style={{
                                        borderRadius: '5px'
                                    }}
                                />
                            </div>
                        </div>


                        <div className='row'>
                            <div className='myChart col-centered'>
                                <Bar
                                    data={data}
                                    options={{
                                        chartOptions
                                    }}
                                />
                            </div>
                        </div>


                        <div className="col-md-12 btn-center">
                            <Link to="/">
                                <button className='btn btn-outline-light mx-sm-3 mb-2 mt-5'>Go to home</button>
                            </Link>
                        </div>
                    </div>
                );
            }
            else
            {
                return (
                    <div className="loader col-md-10 offset-md-5 my-5 py-5">
                        <Loader type='spinningBubbles' color='#FFF'/>
                    </div>
                        );
            }
        }
    }
}
export default CurrentWeather;