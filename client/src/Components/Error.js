import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import warning from '../assets/warning_black_128.png';

class ErrorComponent extends Component {

    render() {
        return (
            <div className="jumbotron my-5">
                <img src={warning} alt='warning'/>
                <h1 className="display-4 pt-3">Oops something went wrong...</h1>
                <div className='pt-5'>
                    <h5>Please try again!</h5>
                </div>
                    <Link to="/">
                    <button className='btn btn-outline-dark mx-sm-3 mb-2 mt-5'>Go to home</button>
                </Link>
            </div>
        )
    }
}

export default ErrorComponent;