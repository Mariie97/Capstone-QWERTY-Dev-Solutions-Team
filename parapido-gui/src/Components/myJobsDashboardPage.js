import React, { Component } from 'react';
import MyJobsCard from './myJobsDashboardPageCard';
import {accountType} from "../Utilities";
import Alert from '@material-ui/lab/Alert';

class myJobsDashboardPage extends Component {
    
    currentUser = {
        id: parseInt(localStorage.getItem('user_id')),
        type: parseInt(localStorage.getItem('type'))
    };

    constructor(props) {
        super(props);
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
            if(this.props.location.state !== undefined){
            if (this.props.location.state.alertMssg !== undefined && this.props.location.state.severity !== undefined){
                this.setState({alertMssg: this.props.location.state.alertMssg,
                severity: this.props.location.state.severity 
            });
            }
        }
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
        const {alertMssg, severity} = this.state

        return (
            <div>
                {(alertMssg !== undefined && severity !== undefined) && <Alert onLoad={this.hideAlert()} severity={severity} className="server-error-job-creation">
                {alertMssg}</Alert>} 

                <div className="myjobs-card-general-style">
                    <div className="myjobs-card-container">
                        {is_client &&  <MyJobsCard title="Posted Jobs" imgtype = "1" status="1"/> }
                        {is_student && <MyJobsCard title="Requested Jobs" imgtype = "2" status="1"/> }
                        <MyJobsCard title="In-progress Jobs" imgtype = "3" status="2"/>
                        <MyJobsCard title="Completed Jobs" imgtype = "4" status="3"/>               
                    </div>
                </div>
            </div>
        )
    }
}

export default myJobsDashboardPage;
