import React, { Component } from 'react';
import '../Layouts/myJobsDashboardCard.css';
import jobsposted from "../Static/Images/JobPosted.svg";

class myJobsDashboardPageCard extends Component {
    componentDidMount() {
		// webpage background color
		document.body.style.backgroundColor = "#FFFFFF";
	}
    render() {
        const {title} = this.props;

        return (
                <div className="myjobs-card"> 
                    <div className="myjobs-body-container">
                        <img  id="grow-myjobs" src= {jobsposted}  alt="jobsposted" />
                        <div className="bottom-card-styling-myjobs"> 
                        <div className="bottom-square-myjobs">
                            {title}
                        </div>            
                        </div>
                    </div>         
                </div>                                         
        )
    }
}

export default myJobsDashboardPageCard;
