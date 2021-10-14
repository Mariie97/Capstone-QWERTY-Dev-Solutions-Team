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
                    <div>
                        <h5> hi</h5>
                        <h5> hi</h5>
                    </div>
                    <div>
                        <h5> hi </h5>
                        <h5> hi </h5>
                    </div>
                  
                </div>




            </React.Fragment>
        )
    }
}

export default JobCreation
