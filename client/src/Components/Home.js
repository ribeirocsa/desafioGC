import React,{Component} from 'react';
import Header from "./Header";

class Home extends Component {


    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false
        };

        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    isInputOk(input) {
        return input != null && input !== '';
    }

    validateForm(event){
        if(this.isInputOk(this.state.city1) && this.isInputOk(this.state.city2) && this.isInputOk(this.state.city3)) {
            this.enableButton();
        } else {
            this.disableButton();
        }
    }

    onChangeHandler (event) {
       this.setState({ [event.target.name]: event.target.value });

    }


    render(){

        return (
            <div>
                <Header/>

                <div className='col-md-10 offset-md-1 pt-3 pb-5'>
                    <p>To see the current weather conditions please insert the name of 3 cities and click on the submit
                        button.<br/>Note that all fields are required.</p>
                </div>

                <div className='col-md-10 offset-md-2 pb-5'>
                    <form method='POST' action='/search' className='form-inline'>
                        <div className='form-group mx-sm-3 mb-2'>
                            <input type='text'
                                   className='form-control'
                                   placeholder='Enter first city...'
                                   name='city1'
                                   value={this.state.value}
                                   onChange={this.onChangeHandler}
                                   onKeyUp={this.validateForm}
                            />
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <input type='text'
                                   className='form-control'
                                   placeholder='Enter second city...'
                                   name='city2'
                                   value={this.state.value}
                                   onChange={this.onChangeHandler}
                                   onKeyUp={this.validateForm}

                            />
                        </div>
                        <div className='form-group mx-sm-3 mb-2'>
                            <input type='text'
                                   className='form-control'
                                   placeholder='Enter third city...'
                                   name='city3'
                                   value={this.state.value}
                                   onChange={this.onChangeHandler}
                                   onKeyUp={this.validateForm}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-outline-light mx-sm-3 mb-2"
                            disabled={!this.state.canSubmit}>SUBMIT</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Home;