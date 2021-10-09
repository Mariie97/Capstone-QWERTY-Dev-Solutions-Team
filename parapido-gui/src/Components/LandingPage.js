import React, { Component } from "react";
import "../Layouts/LandingPage.css";
import studentLandingPage from "../Static/Images/Student_LandingPage.png";
import logo from "../Static/Images/Pa_RapidoLogo.png";
import { Link } from "react-router-dom";

export class Landing extends Component {
	componentDidMount() {
		// webpage background color

		document.body.style.backgroundColor = "#2F2D4A";
	}

	render() {
		return (
			<div>
				<div className="landingnav">
					<img className="logostyle" src={logo} alt="Logo" />
					<ul className="landingnavlinks">
						<li className="miniflexcontactus">
							<div style={{ marginRight: 15 }}>Contact Us</div>
							<a href="mailTo:parapidopr@gmail.com"  id="parapidoemail" >parapidopr@gmail.com</a>
						</li>

						<li>
							<Link to="/about" id="link" >Why PaRapido?</Link>
						</li>

						<li>
							<Link to="/login" id="link" >Login</Link>
						</li>
					</ul>
				</div>

				<img src={studentLandingPage} alt="Landing page" style={studentimage} />
				<div className="firstpoint">An easier way of finding and providing</div>
				<p className="secondpoint">Flexible Jobs.</p>
				<p className="firstparagraph">Our team is committed in helping and providing flexible jobs to more than 10+ thousand low-income students 
				  from the UPR system. Also, we give employers the opportunity of helping 
				  the students by providing jobs in our platform.</p>
			</div>
		);
	}
}

// logo styling

const studentimage = {
	width: 1205,
	float: "right",
};




export default Landing;
