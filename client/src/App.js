import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import CurrentWeather from './Components/CurrentWeather';
import ErrorComponent from "./Components/Error";
import Loader from "./Components/loader";

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className='App'>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/current-weather' component={CurrentWeather}/>
                        <Route exact path='/error' component={ErrorComponent}/>

                        <Route component={ErrorComponent} />
                        <Route path='/loader' component={Loader} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;