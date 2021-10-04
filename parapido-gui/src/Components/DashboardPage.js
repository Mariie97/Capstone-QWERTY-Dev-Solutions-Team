import { Component } from 'react'
import NavBar from "./NavBar";

class LoginPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Dashboard">
                <h1>Job Dashboard</h1>
                <NavBar cookies={this.props.cookies} />
            </div>
        )
    }
}

export default LoginPage