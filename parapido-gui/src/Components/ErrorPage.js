import React, { Component } from 'react'
import errorpagecartoon from "../Static/Images/Error_Page_Cartoon.jpg"

class ErrorPage extends Component {
    componentDidMount() {
		// webpage background color
		document.body.style.backgroundColor = "#FFFFFF";
	}

    render() {
        return (
            <div className="main-container-error-page">
                <div className="body-container-error-page">
                    <img src= {errorpagecartoon}  alt="errorpagecartoon" />
                    <div className="main-text-container-error-page">
                        <div>
                            <div className="error-response-error-page"> 404 </div>
                            <div> Page Not Found!! </div>
                        </div>
                        <div>Uh-OH!!! 😲</div>
                        <div>Something Went Wrong!</div>
                                                
                     
                    </div>
                </div>
                <div className="footer-error-page">
                    <div>If needed support team can be contacted at:&nbsp; </div>
                        <a href="mailTo:parapidopr@gmail.com?subject=Contact Support&body=HI!! :) we will come back to you as soon as possible!!!!" 
                        id="parapido-email-error-page"> parapidopr@gmail.com</a>       
                </div>
            </div>
        )
    }
}

export default ErrorPage
