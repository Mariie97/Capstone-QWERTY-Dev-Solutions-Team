import React, { Component } from 'react';
import '../Layouts/myJobsDashboardCard.css';
import jobsposted from "../Static/Images/JobPosted.svg";

class myJobsDashboardPageCard extends Component {
    componentDidMount() {
		// webpage background color
		document.body.style.backgroundColor = "#FFFFFF";
	}
    render() {
        return (
            <div className="myjobs-card-general-style">
            <div className="myjobs-card-container">
                <div className="myjobs-card"> 
                    <div className="myjobs-body-container">
                        <img  id="grow" src= {jobsposted}  alt="jobsposted" />
                        <div className="bottom-card-styling-myjobs"> 
                        <div className="bottom-square-myjobs">
                                Posted Jobs
                        </div>            
                        </div>
                    </div>         
                </div>         
                        
            </div>
            </div>
        )
    }
}

export default myJobsDashboardPageCard;
