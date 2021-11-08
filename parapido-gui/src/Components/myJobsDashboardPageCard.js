import React, { Component } from 'react';
import '../Layouts/myJobsDashboardCard.css';
import jobsposted from "../Static/Images/JobPosted.svg";
import jobsrequested from "../Static/Images/JobRequest.svg";
import jobsinprogress from "../Static/Images/JobIn-Progress.svg";
import jobscompleted from "../Static/Images/JobCompleted.svg";


class myJobsDashboardPageCard extends Component {
    componentDidMount() {
		// webpage background color
		document.body.style.backgroundColor = "#FFFFFF";
	}
    render() {
        const {title, imgtype} = this.props;

        return (
                <div className="myjobs-card"> 
                    <div className="myjobs-body-container">
                        {imgtype === "1" && <img  id="grow-myjobs" src= {jobsposted}  alt="postedjobs" />}
                        {imgtype === "2" && <img  id="grow-myjobs" src= {jobsrequested}  alt="requestedjobs" />}
                        {imgtype === "3" && <img  id="grow-myjobs" src= {jobsinprogress}  alt="in-progressjobs" />}
                        {imgtype === "4" && <img  id="grow-myjobs" src= {jobscompleted}  alt="completedjobs" />}
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
