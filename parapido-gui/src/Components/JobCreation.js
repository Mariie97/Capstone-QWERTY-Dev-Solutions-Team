import React, { Component } from 'react';
import "../Layouts/JobCreation.css";
import MunicipalitiesDropdown from "./MunicipalitiesDropdown.js"

export class JobCreation extends Component {

    componentDidMount() {
		// webpage background color
		document.body.style.backgroundColor = "#2F2D4A";
	}

    render() {
        return (
            <React.Fragment>
                 <h1 className="job-creation-page-header"> Job Creation </h1>
                
                <div className="big-flexbox-for-2-flexbox-containers">
                    <div className="left-body-container-1-job-creation">
                        <label className="label-job-creation"> *Title: </label>
                        <input className="input-1-job-creation" type="text" id="title" name="title" placeholder="Title"></input>
                        <label className="label-job-creation"> *Description: </label>
                        <textarea className="input-2-job-creation" type="text" id="description" name="description" placeholder="Description"></textarea>
                    </div>
                    <div className="selected">
                        <label className="label-job-creation"> *Street: </label>
                        <input className="input-1-job-creation" style={{ width:"160%" }} type="text" id="street" name="street" placeholder="Street"></input>
                        <div className="mini-flex-box-job-creation">
                            <div>
                            <label className="label-job-creation"> *Municipality: </label>
                            <MunicipalitiesDropdown />
                            </div>
                            <div>
                                <label className="label-job-creation"> *Zipcode: </label>
                                <input className="input-3-job-creation" type="text" id="zipcode" name="zipcode" placeholder="Zipcode"></input>
                            </div>
                        </div>
                    </div>
                  
                </div>
            </React.Fragment>
        )
    }
}


export default JobCreation
