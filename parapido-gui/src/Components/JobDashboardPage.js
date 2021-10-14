import { Component } from 'react';
import {Redirect} from "react-router-dom";
import verifyUserAuth from "../Utilities";


class JobDashboard extends Component {

    constructor(props) {
        super(props);
        this.state={
            is_auth: true
        };
    }

    componentDidMount() {
        this.setState({
            is_auth: verifyUserAuth(this.props.cookies.get('csrf_access_token'))
        });
    }

    render() {
        const {is_auth} = this.state;
        return (
            <div className="Dashboard">
                {!is_auth && <Redirect to='/' />}
                <h1>Job Dashboard</h1>
            </div>
        )
    }
}

export default JobDashboard;