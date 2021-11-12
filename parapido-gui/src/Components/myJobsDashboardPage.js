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
            alertMssg: ""
        };

        this.hideAlert = this.hideAlert.bind(this);
    }

    componentDidMount() {
		// webpage background color
		document.body.style.backgroundColor = "#FFFFFF";

        if(this.props.history.action === 'POP') {
            this.setState({requestSuccessful: false, creationSuccessful:false});
        }
        else {
            if(this.props.location.state !== undefined){

            if (this.props.location.state.requestSuccessful !== undefined){
                this.setState({requestSuccessful: this.props.location.state.requestSuccessful});
            }
            else if(this.props.location.state.creationSuccessful !== undefined){
                this.setState({creationSuccessful: this.props.location.state.creationSuccessful});
            }
            else if(this.props.location.state.studentIsChoosen !== undefined){
                this.setState({studentIsChoosen: this.props.location.state.studentIsChoosen});
            }
        }
        }
	}

    hideAlert() {

        const {requestSuccessful, creationSuccessful, studentIsChoosen} = this.state
        console.log(studentIsChoosen)
        if(requestSuccessful){
            setTimeout(() => {this.setState({
                requestSuccessful: false})}, 3000);
        }

        else if(creationSuccessful){
            setTimeout(() => {this.setState({
                creationSuccessful: false})}, 3000);
            }
        else if(studentIsChoosen){
            setTimeout(() => {this.setState({
                studentIsChoosen: false})}, 3000);
            }
        }
        
    

    render() {

        const is_client = this.currentUser.type === accountType.client
        const is_student = this.currentUser.type === accountType.student
        const {requestSuccessful, creationSuccessful, studentIsChoosen} = this.state

        return (
            <div>
                {requestSuccessful && <Alert onLoad={this.hideAlert()} severity="success" className="server-error-job-creation">
                The job has been requested succesfully!!! 👍🏼</Alert>}

                {creationSuccessful && <Alert onLoad={this.hideAlert()} severity="success" className="server-error-job-creation">
                The job has been created succesfully!!! 👍🏼</Alert>}

                {studentIsChoosen && <Alert onLoad={this.hideAlert()} severity="info" className="server-error-job-creation">
                The job has been successfully added to the In-progress status!!! 👍🏼</Alert>}


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
