import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import CurrentWeather from './Components/CurrentWeather';
import ErrorComponent from "./Components/Error";

class App extends Component {

    render() {
        return (
            <BrowserRouter>

                <div className='App'>
                    <Switch>

                        <Route exact path='/error' component={ErrorComponent}/>
                    </Switch>

                    <Route path='/' component={Home}/>
                    <Route path='/current-weather' component={CurrentWeather}/>

                </div>
            </BrowserRouter>
        )
    }
}

export default App;