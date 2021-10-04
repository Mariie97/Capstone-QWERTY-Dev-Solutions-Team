import { Component } from 'react'
import {Redirect} from "react-router-dom";

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {login_success: false};

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        fetch('/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: 'test1@upr.edu',
                password: 'test1234'
            })
        }).then(response => {
            if(response.status === 200) {
                localStorage.setItem('is_auth', 'true');
                response.json().then(data => {
                    localStorage.setItem('user_id', data.user_id);
                    localStorage.setItem('type', data.type);
                    this.setState({login_success: true});
                })}
        })

    }

    render() {
        const { login_success } = this.state;
        return (
            <div>
                {login_success ?
                    <Redirect to='/dashboard' /> :
                    <button onClick={this.handleOnClick}>Log in</button>
                }
            </div>
        )
    }
}

export default LoginPage