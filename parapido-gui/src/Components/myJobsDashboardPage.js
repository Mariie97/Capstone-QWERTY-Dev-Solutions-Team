import React, { Component } from 'react';
import MyJobsCard from './myJobsDashboardPageCard';
import {accountType, getQueryParams, jobStatus} from "../Utilities";
import Alert from '@material-ui/lab/Alert';
import ErrorPage from "./ErrorPage";

class myJobsDashboardPage extends Component {
    currentUser = {
        id: parseInt(localStorage.getItem('user_id')),
        type: parseInt(localStorage.getItem('type'))
    };
    queryParams = undefined;

    constructor(props) {
        super(props);
        this.queryParams = getQueryParams(props.queryParams);
        this.state={
            requestSuccessful: false,
            creationSuccessful: false,
            studentIsChoosen: false,
            alertMssg: undefined,
            severity: undefined
        };

        this.hideAlert = this.hideAlert.bind(this);
    }

    componentDidMount() {
        // webpage background color
        document.body.style.backgroundColor = "#FFFFFF";

        if(this.props.history.action === 'POP') {
            this.setState({alertMssg: undefined, severity: undefined});
        }
        else {
            this.setState({
                alertMssg: this.props.location.state?.alertMssg,
                severity: this.props.location.state?.severity
            });
        }
    }

    hideAlert() {
        setTimeout(() => {this.setState({
            alertMssg: undefined,
            severity: undefined})}, 3000);
    }

    render() {
        const is_client = this.currentUser.type === accountType.client
        const is_student = this.currentUser.type === accountType.student
        const is_admin = this.currentUser.type === accountType.admin;
        const {alertMssg, severity} = this.state

        return (
            <div>
                {is_admin && this.queryParams.get('account')===null ?
                    <ErrorPage errorNumber="400" errorType="Bad request" inside/> :
                    <React.Fragment>
                        {(alertMssg !== undefined && severity !== undefined) &&
                        <Alert onLoad={this.hideAlert()} severity={severity} className="server-error-job-creation">
                            {alertMssg}
                        </Alert>}
                        <div className="myjobs-card-general-style">
                            <div className="myjobs-card-container">
                                {(is_client || (is_admin && this.queryParams.get('account')==accountType.client)) &&
                                <MyJobsCard
                                    title="Posted Jobs"
                                    imgtype="1"
                                    status={jobStatus.posted}
                                    account={this.queryParams.get('account')===null ? undefined : this.queryParams.get('account')}
                                />
                                }
                                {(is_student || (is_admin && this.queryParams.get('account')==accountType.student)) &&
                                <MyJobsCard
                                    title="Requested Jobs"
                                    imgtype="2"
                                    status={jobStatus.posted}
                                    account={this.queryParams.get('account')===null ? undefined : this.queryParams.get('account')}
                                />
                                }
                                <MyJobsCard
                                    title="In-progress Jobs"
                                    imgtype = "3"
                                    status={jobStatus.in_process}
                                    account={this.queryParams.get('account')===null ? undefined : this.queryParams.get('account')}
                                />
                                <MyJobsCard
                                    title="Completed Jobs"
                                    imgtype="4"
                                    status={jobStatus.completed}
                                    account={this.queryParams.get('account')===null ? undefined : this.queryParams.get('account')}
                                />
                            </div>
                        </div>
                    </React.Fragment>
                }
            </div>
        )
    }
}

export default myJobsDashboardPage;
