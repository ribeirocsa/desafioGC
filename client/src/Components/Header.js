import React,{Component} from 'react';

class Header extends Component {

    render(){
        return (
            <div className='row'>
                <div className='myHeader col-centered col-md-5 pt-5'>
                    <a href='/'>
                        <h1>Weather App</h1>
                    </a>
                </div>
            </div>
        )
    }
}

export default Header;