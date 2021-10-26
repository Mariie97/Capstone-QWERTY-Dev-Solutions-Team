import {Component} from 'react';
import {Redirect} from "react-router-dom";
import "../Layouts/JobDashboard.css"
import verifyUserAuth from "../Utilities";


class JobDashboardPage extends Component {

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

        // webpage background color
		document.body.style.backgroundColor = "#2F2D4A";
    }

    render() {
        const {is_auth} = this.state;
        return (
            <div>
                {!is_auth && <Redirect to='/' />}
                <h1 className="job-dashboard-page-header">Job Dashboard</h1>
                <div className="first-flex-container-job-dashboard-page">
                    <div>
                        Category
                    </div>
                    <div>
                        Price
                    </div>
                    <div>
                        City
                    </div>
                    <button> Press to FILTER </button>
                </div>
            </div>
        )
    }
}

export default JobDashboardPage;