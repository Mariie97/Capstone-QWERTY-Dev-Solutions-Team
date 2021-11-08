import React, { Component } from 'react';
import MyJobsCard from './myJobsDashboardPageCard';

class myJobsDashboardPage extends Component {
    componentDidMount() {
		// webpage background color
		document.body.style.backgroundColor = "##FFFFFF";
	}
    render() {
        return (
            <div>
                <div className="myjobs-card-general-style">
                    <div className="myjobs-card-container">
                        <MyJobsCard title="Posted Jobs"/>  
                        <MyJobsCard title="In-progress Jobs"/>
                        <MyJobsCard title="Completed Jobs"/>               
                    </div>
                </div>
            </div>
        )
    }
}

export default myJobsDashboardPage;
