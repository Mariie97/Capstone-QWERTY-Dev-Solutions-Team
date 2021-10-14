import React, { Component } from 'react';
import "../Layouts/JobCreation.css";

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
                    <div>
                        <h5> street </h5>
                        <h5> city </h5>
                        <h5> zipcode </h5>
                    </div>
                  
                </div>
            </React.Fragment>
        )
    }
}


export default JobCreation
