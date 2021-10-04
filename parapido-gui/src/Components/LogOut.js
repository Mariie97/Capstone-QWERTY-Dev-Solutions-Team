import { Component } from 'react'
import { Redirect } from "react-router-dom";

class LogOut extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logout_success: false,
        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        fetch(
            '/logout',
            {
                method: 'POST',
                credentials: 'same-origin',
                headers:{
                    'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
                }
            }
        ).then(response => {
            if(response.ok) {
                localStorage.setItem('is_auth', 'false');
                response.json().then(data => {
                    localStorage.removeItem('user_id');
                    localStorage.removeItem('type');
                    this.setState({logout_success: true});
                })}
        })
    }

    render() {
        const { logout_success } = this.state;
        return (
            <div className="LogOut">
                {logout_success &&
                    <Redirect to='/'/>
                }
                 <button onClick={this.handleLogout}>Sign out!!!!!</button> 
            </div>
        )
    }
}

export default LogOut