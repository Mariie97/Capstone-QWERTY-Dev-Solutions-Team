import React, { Component } from 'react';
import MyJobsCard from './myJobsDashboardPageCard';
import {accountType, current_user} from "../Utilities";

class myJobsDashboardPage extends Component {
    componentDidMount() {
		// webpage background color
		document.body.style.backgroundColor = "##FFFFFF";
	}
    render() {

        const is_client = current_user.type === accountType.client
        const is_student = current_user.type === accountType.student
      
        return (
            <div>
                <div className="myjobs-card-general-style">
                    <div className="myjobs-card-container">
                        {is_client &&  <MyJobsCard title="Posted Jobs" imgtype = "1" /> }
                        {is_student && <MyJobsCard title="Requested Jobs" imgtype = "2"/> }
                        <MyJobsCard title="In-progress Jobs" imgtype = "3"/>
                        <MyJobsCard title="Completed Jobs" imgtype = "4"/>               
                    </div>
                </div>
            </div>
        )
    }
}

export default myJobsDashboardPage;
