import React, { Component } from "react";
import {Link} from "react-router-dom";
import {cities} from "../Utilities";
import ReactTooltip from 'react-tooltip';

class JobDashboardCard extends Component {
    componentDidMount(){
        document.body.style.backgroundColor = "#2F2D4A";
    }

    render() {
        const {job_id, title, price, category, city, owner_first, owner_last, street, zipcode, date_posted} =  this.props
        return (
            <div className="card-body-wrapper">
                <Link to={"/job/"+job_id}  className="none-display-for-link">
                    <div className="card-wrapper-1">
                        <div className="card-body">
                            <h2 className="card-title">
                                <div data-tip={title} className="break-title-job-dashboard"> {title}</div>
                                <div className="tooltip"> <ReactTooltip place="top" type="dark" effect="solid"/></div>
                                <div className= "circle-square"/>
                                <div className= "circle-square2"/>
                            </h2>
                            <h2 className="card-clientName"> {owner_first} {owner_last}</h2>
                            <p className="card-location">{cities[city-1]} {street} {zipcode}</p>
                            <div className="card-price"> {price} </div>
                            <div style={{marginLeft:6, fontWeight: "bold", color: "green"}}> {category} </div>
                            <div style= {{float: "right", paddingRight: "10px", fontFamily:"Times New Roman",fontSize: 10, fontWeight: "400"}}>
                                {date_posted}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default JobDashboardCard;
