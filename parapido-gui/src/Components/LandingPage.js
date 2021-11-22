import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {verifyUserAuth} from "../Utilities";
import LoginModal from './LoginModal';
import Logo from "../Static/Images/PaRapidoLogo.png";
import StudentLandingPage from "../Static/Images/StudentLandingPage.png";
import EmailIcon from "@material-ui/icons/Mail";
import Alert from "@material-ui/lab/Alert";

class LandingPage extends Component {

	constructor(props){
		super(props);
		this.state = {
			showLogin: false,
			is_auth: false,
			psswordChangedSuccesfully: false,
			alertMssg: undefined,
			severity: undefined,
		};

		this.showLoginModal = this.showLoginModal.bind(this);
		this.hideAlert = this.hideAlert.bind(this);
	}

	componentDidMount() {
		this.setState({
			is_auth: verifyUserAuth(this.props.cookies.get('csrf_access_token'))
		});
		if(this.props.history.action === 'POP') {
            this.setState({psswordChangedSuccesfully: false, showLogin: false});
        }
        else {
            if(this.props.location.state !== undefined){
				if (this.props.location.state.psswordChangedSuccesfully !== undefined){ 
					this.setState({psswordChangedSuccesfully: this.props.location.state.psswordChangedSuccesfully, showLogin:true,
					});}
				if(this.props.location.state.alertMssg !== undefined && this.props.location.state.severity !== undefined){
					this.setState( 
						this.setState({alertMssg: this.props.location.state.alertMssg,
						severity: this.props.location.state.severity
						})	
						)
				}
			}
		}
		
		// webpage background color
		document.body.style.backgroundColor = "#2F2D4A";
	}

	showLoginModal(){
		this.setState({showLogin: !this.state.showLogin});
	}

	hideAlert() {
		setTimeout(() => {this.setState({
			alertMssg: undefined,
			severity: undefined})}, 3000);
	}

	render() {
		const {psswordChangedSuccesfully, alertMssg, severity, is_auth} = this.state
		return (
			<div>
				{is_auth && <Redirect to='/jobdashboard' />}
				{psswordChangedSuccesfully && <LoginModal isOpen={this.state.showLogin} toggle={this.showLoginModal} />}
				<img src={StudentLandingPage} alt="Landing page" style={studentimage} />
				<div className="landing-nav">
					<img className="logostyle" src={Logo} alt="Logo" />
					<ul className="landing-nav-links">
						<li className="mini-flex-contactus">
							<div style={contactuslink}>Contact Us</div>
							<EmailIcon style={mail}/>
							<a href="mailTo:parapidopr@gmail.com?subject=Contact Support&body=HI!! :) we will come back to you as soon as possible!!!!"  id="small-urls"> parapidopr@gmail.com</a>
						</li>
						<li>
							<div id="link" onClick={this.showLoginModal} >Login</div>
							{this.state.showLogin && 
								<LoginModal isOpen={this.state.showLogin} toggle={this.showLoginModal}/>}
						</li>
					</ul>
				</div>
				{(alertMssg !== undefined && severity !== undefined) && <Alert onLoad={this.hideAlert()} severity={severity} className="server-error-landing-page">
                {alertMssg}</Alert>} 
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

export default LandingPage;