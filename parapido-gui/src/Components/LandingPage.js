import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Layouts/LandingPage.css";
import logo from "../Static/Images/Pa_RapidoLogo.png";
import studentLandingPage from "../Static/Images/Student_LandingPage.png";
import EmailIcon from '@material-ui/icons/Mail';
import LoginModal from './LoginModal';

export class Landing extends Component {

	constructor(props){
		super(props);
		

	this.state = {
		showLogin: false
	}

	this.showLoginModal = this.showLoginModal.bind(this);
	}

	componentDidMount() {
		// webpage background color

		document.body.style.backgroundColor = "#2F2D4A";
	}

	showLoginModal(){
		this.setState({showLogin: !this.state.showLogin});
	}

	

	render() {
		return (
			<div>
				<img src={studentLandingPage} alt="Landing page" style={studentimage} />
				<div className="landing-nav">
					<img className="logostyle" src={logo} alt="Logo" />
					<ul className="landing-nav-links">
						<li className="mini-flex-contactus">
							<div style={contactuslink}>Contact Us</div>
							<EmailIcon style={mail}/> 
							<a href="mailTo:parapidopr@gmail.com?subject=Contact Support&body=HI!! :) we will come back to you as soon as possible!!!!"  id="parapido-email"> parapidopr@gmail.com</a>
						</li>

						<li>
							<Link to="/about" id="link" >Why PaRapido?</Link>
						</li>

						<li>
							<div id="link" onClick={this.showLoginModal} >Login</div>
							<LoginModal isOpen={this.state.showLogin} toggle={this.showLoginModal}/>
							
						
						</li>
					</ul>
				</div>

			
				<div className="first-point-landing">An easier way of finding and providing</div>
				<p className="second-point-landing">Flexible Jobs.</p>
				<p className="first-paragraph-landing">Our team is committed in helping and providing flexible jobs to more than 10+ thousand low-income students 
				  from the UPR system. Also, we give employers the opportunity of helping 
				  the students by providing jobs in our platform.</p>

				<Link to={"/signup"} className="button-landing"> Try PaRapido for FREE </Link>
			</div>		
		);
	}
}

// small icons and elements css

const mail = {
    color: "#ffebcc",
    paddingRight: 10,
	height: 20,
}

const studentimage = {
	position: "absolute",
	right: "0%",
	height: "100vh",
	objectFit: "contain",
};

const contactuslink = {
	marginRight: 15,
	position: "relative",
	top: 2
}

export default Landing;
