import React, { Component } from 'react';
import '../Layouts/JobDashboardCard.css';
import {Link} from "react-router-dom";
import {cities} from "../Utilities";

class JobDashboardCard extends Component {
    componentDidMount(){
        document.body.style.backgroundColor = "#2F2D4A";
    }

    render() {

        const {job_id, title, price, category, city, owner_first, owner_last} =  this.props
        return (
            <div className="card-body-wrapper">
                    <Link to={"/job/"+job_id}  className="none-display-for-link"> 
                        <div className="card-wrapper-1">
                            <div className="card-body">
                                <h2 className="card-title">
                                    <div className="break-title-job-dashboard"> {title}                                        
                                    </div>

                                    <div className= "circle-square"></div>
                                    <div className= "circle-square2"></div>
                                </h2>
                                <h2 className="card-clientName"> {owner_first} {owner_last}</h2>
                                <p className="card-location">
                                {cities[city]} calle 00718
                                </p>
                                <div className="card-price"> {price} </div>
                               
                                <div style={{marginLeft:6, fontWeight: "bold", color: "green"}}> {category} </div>
                            
                            </div>
                        </div>
                    </Link>                          
            </div>
         
        )
    }
}

export default JobDashboardCard;
