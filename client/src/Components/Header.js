import React,{Component} from 'react';

class Header extends Component {

    render(){
        return (
            <div className='searchCity col-md-10 offset-md-2'>
                <div className='header col-md-10'>
                    <a href='/'><h1>Weather App</h1></a>
                </div>
            </div>
        )
    }
}

export default Header;