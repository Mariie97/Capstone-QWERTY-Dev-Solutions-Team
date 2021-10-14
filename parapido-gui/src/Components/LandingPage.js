import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Layouts/LandingPage.css";
import studentLandingPage from "../Static/Images/Student_LandingPage.png";
import logo from "../Static/Images/Pa_RapidoLogo.png";
import EmailIcon from '@material-ui/icons/Mail';

import LoginModal from './LoginModal';

export class Landing extends Component {

	constructor(props){
		super(props);
		this.showLoginModal = this.showLoginModal.bind(this);

	this.state = {
		showLogin: false
	}

	}

	componentDidMount() {
		// webpage background color

		document.body.style.backgroundColor = "#2F2D4A";
	}

	showLoginModal(){
		this.setState({showLogin: true});
	}

	render() {
		return (
			<div>
				<div className="landingnav">
					<img className="logostyle" src={logo} alt="Logo" />
					<ul className="landingnavlinks">
						<li className="miniflexcontactus">
							<div style={{ marginRight: 15, position: "relative", top: 2}}>Contact Us</div>
							<EmailIcon style={mail}/> 
							<a href="mailTo:parapidopr@gmail.com"  id="parapidoemail"> parapidopr@gmail.com</a>
						</li>
						<li>
							<div id="link" onClick={this.showLoginModal} >Login</div>
						</li>
					</ul>
				</div>

				<img src={studentLandingPage} alt="Landing page" style={studentimage} />
				<div className="firstpoint">An easier way of finding and providing</div>
				<p className="secondpoint">Flexible Jobs.</p>
				<p className="firstparagraph">Our team is committed in helping and providing flexible jobs to more than 10+ thousand low-income students 
				  from the UPR system. Also, we give employers the opportunity of helping 
				  the students by providing jobs in our platform.</p>

				<Link to={"/signup"} className="buttonlandingpage"> Try PaRapido for FREE </Link>
			</div>

			
		);
	}
}

// image styling

const studentimage = {
	width: 1205,
	float: "right",
};

// small icons & elements css

const mail = {
    color: "#ffebcc",
    paddingRight: 10,
	height: 20,
}




export default Landing;
