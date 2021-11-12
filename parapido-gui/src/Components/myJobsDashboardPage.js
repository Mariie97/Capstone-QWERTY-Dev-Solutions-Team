import React, { Component } from 'react';
import MyJobsCard from './myJobsDashboardPageCard';
import {accountType} from "../Utilities";

class myJobsDashboardPage extends Component {
    currentUser = {
        id: parseInt(localStorage.getItem('user_id')),
        type: parseInt(localStorage.getItem('type'))
    };
    componentDidMount() {
		// webpage background color
		document.body.style.backgroundColor = "#FFFFFF";
	}
    render() {

        const is_client = this.currentUser.type === accountType.client
        const is_student = this.currentUser.type === accountType.student
      
        return (
            <div>
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
