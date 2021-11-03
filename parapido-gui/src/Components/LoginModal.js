import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import "../Layouts/LoginModal.css"
import Alert from '@material-ui/lab/Alert';
import StyledEngineProvider from '@material-ui/styles/StylesProvider';
import {Box, Modal} from "@material-ui/core";
import loginModalLogo from '../Static/Images/Pa_Rapido_logo_bgPalette.png';
import continueArrow from '../Static/Images/continueArrow.png';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import {accountType} from "../Utilities";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '3px solid black',
    boxShadow: 24,
    p: 4,
}

class LoginModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password: '',
            login_success: false,
            login_failed: false,
            emailError: undefined,
            passwordError: undefined,
            loginError: undefined,
            redirectAdminLogin: false,
        };

        // event methods - before render method
        this.handleChange = this.handleChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);

        // validation methods - end of render method
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    handleOnClick() {
        const {email, password} = this.state;
        const { adminLogin } = this.props;

        fetch('/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => {
                if(response.status === 200) {
                    response.json().then(data => {
                        if ((adminLogin === undefined && data.type !== accountType.admin) ||
                            (adminLogin!== undefined && data.type === accountType.admin)) {
                            localStorage.setItem('user_id', data.user_id);
                            localStorage.setItem('type', data.type);
                            this.setState({
                                login_success: true,
                                login_failed: false
                            });
                        }
                        else {
                            //Todo Handle that the user is already login needs to do a logout or send to query param to auth a admin
                            this.setState({
                                loginError: adminLogin!==undefined ?
                                    'This is not an admin account\n' : "Use administration login page: ",
                                redirectAdminLogin: adminLogin===undefined,
                            })
                        }
                    })}
                else {
                    if(response.status === 401) {
                        this.setState({loginError: 'Yikes!!! 😬 Incorrect Email or Password.\n'})
                    }
                    else{
                        this.setState({loginError: 'Can not login at this moment. Please try again later!\n'})}
                }
            }
        )
    }

    handleChange(event){
        const {name, value} = event.target;
        this.setState({[name]:value});
    }

    render() {
        const { isOpen, toggle, adminLogin } = this.props;
        const { login_success, login_failed, loginError, emailError, passwordError, redirectAdminLogin} = this.state;

        let redirect = undefined;
        if (login_success) {
            if (adminLogin !== undefined) {redirect = '/administration_site';}
            else {redirect = '/jobdashboard';}
        }

        return (
            <StyledEngineProvider injectFirst>
                {redirect !== undefined && <Redirect to={redirect}/>}
                <div>
                    <Modal
                        open={isOpen}
                        onClose={toggle}
                        style={{textAlign:"center"}}
                    >
                        <Box sx={style}>
                            {loginError !==undefined &&
                            <Alert style={{marginBottom: 40}} variant="outlined" severity="error">
                                {loginError}{redirectAdminLogin && <Link to={'/administration_login'}>click here</Link>}
                            </Alert>
                            }
                            <img src={loginModalLogo} alt="login logo" style={login_logostyle}/>
                            <div className="first-point-login-modal"> Hey! Good to see you again!</div>
                            <div className="second-point-login-modal">
                                <div className="first-text-login-modal">
                                    Log in to {adminLogin===undefined ? 'have' : 'administrate with' }
                                </div>
                                <div className="second-text-login-modal"> FUN.</div>
                            </div>
                            <div className="body-container-login-modal">
                                <label className="third-point-login-modal"> Enter E-mail: </label>
                                {login_failed ?
                                    <input
                                        className="input-login-modal-error"
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={this.handleChange}
                                        onBlur={this.validateEmail}
                                    />:
                                    <input
                                        className="input-login-modal"
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={this.handleChange}
                                        onBlur={this.validateEmail}
                                    />
                                }
                                {emailError !== undefined &&
                                <div className="required-field-login-modal">
                                    <ReportProblemIcon style={report} /> {emailError}
                                </div>
                                }
                                <label className="third-point-login-modal"> Enter Password: </label>
                                {login_failed ?
                                    <input
                                        className="input-login-modal-error"
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={this.handleChange}
                                        onBlur={this.validatePassword}
                                    />:
                                    <input
                                        className="input-login-modal1"
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={this.handleChange}
                                        onBlur={this.validatePassword}
                                    />}

                                {passwordError !== undefined &&
                                <div className="required-field-login-modal">
                                    <ReportProblemIcon style={report} /> {passwordError}
                                </div>
                                }

                                <button onClick={this.handleOnClick} className="login-modal-continue-button">
                                    <div className="text-button-login-modal">
                                        CONTINUE
                                    </div>
                                    <img style ={continue_arrow_image_resize} src={continueArrow} alt="continue arrow" />
                                </button>
                            </div>
                            <hr className="line-login-modal" />
                            <ul className="footer-flex-login-modal">
                                <Link to={"/signup"} id="visited-login-modal"> Create an Account? </Link>
                                <Link to={"/security-questions"} className="visited-login-modal" id="visited-login-modal"> Forgot Password? </Link>
                            </ul>
                        </Box>
                    </Modal>
                </div>
            </StyledEngineProvider>
        );
    }

    validateEmail(){
        const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

        if (this.state.email.length===0) {
            this.setState({
                emailError: "This field is required"
            })

            document.querySelector('.input-login-modal').style.cssText = 'border: 2px solid #cc3300;';
            return false;
        }
        else if (!pattern.test(this.state.email)) {
            this.setState({
                emailError: "Invalid email format"
            });
            document.querySelector('.input-login-modal').style.cssText = 'border: 2px solid #cc3300;';
            return false;
        }
        this.setState({
            emailError: undefined
        })
        document.querySelector('.input-login-modal').style.cssText = 'border: 3px solid #2F2D4A;';
        return true;

    }

    validatePassword(){
        if (this.state.password.length===0) {
            this.setState({
                passwordError: "This field is required"
            })

            document.querySelector('.input-login-modal1').style.cssText = 'border: 2px solid #cc3300;';
            return false;
        }
        this.setState({
            passwordError: undefined
        })
        document.querySelector('.input-login-modal1').style.cssText = 'border: 3px solid #2F2D4A;';
        return true;
    }
}

// small icons and elements css

const login_logostyle = {
    width: 80,
    height: 80,
};

const continue_arrow_image_resize = {
    height: 80,
    width: 100,
    position: "fixed",
    bottom: 25,
    left: 300,
};

const report = {
    color: "red",
    position: "relative",
    top: "4px"
}


export default LoginModal;