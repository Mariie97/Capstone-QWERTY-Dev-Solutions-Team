import React, { Component } from 'react';
import {Link} from "react-router-dom";
import ErrorPageCartoon from "../Static/Images/ErrorPageCartoon.jpg";
import Error from "../Static/Images/Error.png";
import EmailIcon from '@material-ui/icons/Mail';

class ErrorPage extends Component {
    componentDidMount() {
        // webpage background color
        document.body.style.backgroundColor = "#FFFFFF";
    }

    render() {
        const {errorNumber, errorType} = this.props;
        return (
            <div className={"main-container-error-page"}>
                <div className="body-container-error-page">
                    <img src= {ErrorPageCartoon}  alt="errorpagecartoon" style={{height:"90vh"}} />
                    <div className="main-text-container-error-page">
                        <div className="error-response-error-page">
                            {errorNumber}
                            <img src= {Error}  alt="error" style={{marginLeft:"2vh"}}/>
                        </div>
                        <div className="error-response-error-page1">
                            <div>Uh-OH!!!</div>
                            <div>{errorType}</div>
                        </div>
                        <Link to="/">
                            <button className="button-error-page">
                                <div className="text-button-error-page">
                                    Home
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className={"footer-error-page"}>
                    <div> The support team can be contacted at:&nbsp; </div>
                    <EmailIcon style={mail}/>
                    <a href="mailTo:parapidopr@gmail.com?subject=Contact Support&body=HI!! :) we will come back to you as soon as possible!!!!"
                       id="parapido-email-error-page"> parapidopr@gmail.com</a>
                </div>
            </div>
        )
    }
}

// small icons and elements css

const mail = {
    color: "lightcoral",
    height: 20,
}

export default ErrorPage