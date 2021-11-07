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
                        <img  src= {jobsposted} style={posted} alt="jobsposted" />
                        <div> Jobs Posted </div>
                    </div>         
                </div>         
                <div className="myjobs-card"> 
                    <div className="myjobs-body-container">
                        <img  src= {jobsposted} style={posted} alt="jobsposted" />
                        <div> Jobs In-Progress </div>
                    </div>         
                </div>         
            </div>
            </div>
        )
    }
}

// small icons & elements css

const posted = {
    backgroundColor:"black", 
    width: "10vh",
    height: "10vh"
};

export default myJobsDashboardPageCard;
