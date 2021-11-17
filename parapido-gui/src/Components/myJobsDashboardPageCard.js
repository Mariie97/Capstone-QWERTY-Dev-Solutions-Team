import React, { Component } from 'react';
import '../Layouts/myJobsDashboardCard.css';
import {Link} from "react-router-dom";
import jobsposted from "../Static/Images/JobPosted.svg";
import jobsrequested from "../Static/Images/JobRequest.svg";
import jobsinprogress from "../Static/Images/JobIn-Progress.svg";
import jobscompleted from "../Static/Images/JobCompleted.svg";
import {getQueryParams} from "../Utilities";


class myJobsDashboardPageCard extends Component {
    queryParams = undefined

    constructor(props) {
        super(props);
        this.queryParams = {status: props.status};
        if (props.account !== undefined) {
            this.queryParams.account = props.account;
        }
        this.queryParams = `?${getQueryParams(this.queryParams)}`;
    }

    componentDidMount() {
        // webpage background color
        document.body.style.backgroundColor = "#FFFFFF";
    }

    render() {
        const {title, imgtype} = this.props;
        return (
            <div className="myjobs-card">
                <Link to={`/listings${this.queryParams}`}  className="none-display-for-link">
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
