import React, { Component } from "react";
import {Link} from "react-router-dom";
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
        const {title, imgtype, status} = this.props;

        return (
                <div className="myjobs-card"> 
                    <Link to={"/listings?status="+status}  className="none-display-for-link">
                        <div className="myjobs-body-container">
                            {imgtype === "1" && <img  id="grow-myjobs" src= {jobsposted}  alt="postedjobs" />}
                            {imgtype === "2" && <img  id="grow-myjobs" src= {jobsrequested}  alt="requestedjobs" />}
                            {imgtype === "3" && <img  id="grow1-myjobs" src= {jobsinprogress}  alt="in-progressjobs" />}
                            {imgtype === "4" && <img  id="grow2-myjobs" src= {jobscompleted}  alt="completedjobs" />}
                            <div className="bottom-card-styling-myjobs"> 
                                <div className="bottom-square-myjobs">
                                    {title}
                                </div>            
                            </div>
                        </div>
                    </Link>         
                </div>                                         
        )
    }
}

export default myJobsDashboardPageCard;
