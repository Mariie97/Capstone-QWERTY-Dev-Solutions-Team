import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import Input from "./Input";
import Alert from "@material-ui/lab/Alert";
import StyledEngineProvider from "@material-ui/styles/StylesProvider";
import {Box, Modal} from "@material-ui/core";
import ContinueArrow from "../Static/Images/ContinueArrow.png";
import Logo from "../Static/Images/BackgroundPaRapidoLogo.png";

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

        this.handleChange = this.handleChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);

        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    async handleOnClick() {
        const {email, password} = this.state;
        const { adminLogin } = this.props;
        // const adminParam = adminLogin === undefined ? {} : {admin: 'true'};
        // const url = buildURL('/login', adminParam)
        const adminParam = adminLogin === undefined ? '' : '?admin=true';
        await fetch(`/api/login${adminParam}`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            // headers: {'Content-Type': 'text/plain'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                        localStorage.setItem('user_id', data.user_id);
                        localStorage.setItem('type', data.type);
                        this.setState({
                            login_success: true,
                            login_failed: false
                        });
                    }
                )
            } else {
                this.setState({
                    loginError: response.status === 401 ?
                        'Yikes!!! 😬 Incorrect Email or Password' :
                        <div>Sorry can not login right now 😔<br/>Please try again later!!!</div>,
                    login_success: false,
                    login_failed: true
                })
            }})
    }

    handleChange(event){
        const {name, value} = event.target;
        this.setState({[name]:value});
    }

    render() {
        const { isOpen, toggle, adminLogin } = this.props;
        const { login_success, loginError, emailError, passwordError, redirectAdminLogin} = this.state;
        const redirect = adminLogin === undefined ?  '/jobdashboard' : '/admin/site' ;

        return (
            <StyledEngineProvider injectFirst>
                {login_success && <Redirect to={redirect}/>}
                <Modal
                    open={isOpen}
                    onClose={toggle}
                    style={{textAlign:"center"}}
                >
                    <Box sx={style}>
                        {loginError !==undefined &&
                        <div>
                            <Alert style={{marginBottom: 40, display:"flex", justifyContent:"center"}} variant="outlined" severity="error">
                                {loginError}{redirectAdminLogin && <Link to={'/administration_login'}>click here</Link>}
                            </Alert>
                        </div>
                        }
                        <img src={Logo} alt="login logo" style={loginlogo}/>
                        <div className="first-point-login-modal"> Hey! Good to see you again!</div>
                        <div className="second-point-login-modal">
                            <div className="first-text-login-modal">
                                Log in to {adminLogin===undefined ? 'have' : 'administrate' }
                            </div>
                            <div className="second-text-login-modal">  {adminLogin===undefined ? 'FUN.' : '' } </div>
                        </div>
                        <div className="body-container-login-modal">
                            <Input
                                required
                                loginmodallabel
                                labelText='Enter E-mail'
                                className="input-login-modal"
                                id="email"
                                name="email"
                                placeholder="Email"
                                onChange={this.handleChange}
                                onBlur={this.validateEmail}
                                error={emailError!==undefined}
                                errorMsg={emailError}
                                style= {{border : emailError === undefined ? "1px solid black": "1px solid #cc3300"}}
                            />
                            <Input
                                required
                                loginmodallabel
                                labelText='Enter Password'
                                className="input-login-modal"
                                id="password"
                                name="password"
                                type='password'
                                placeholder="password"
                                onChange={this.handleChange}
                                onBlur={this.validatePassword}
                                error={passwordError!==undefined}
                                errorMsg={passwordError}
                                style= {{border : passwordError === undefined ? "1px solid black": "1px solid #cc3300"}}
                            />
                            <button onClick={this.handleOnClick} className="login-modal-continue-button">
                                <div className="text-button-login-modal">
                                    CONTINUE
                                </div>
                                <img style ={continuearrow} src={ContinueArrow} alt="continue arrow" />
                            </button>
                        </div>
                        <hr className="line-login-modal" />
                        <ul className="footer-flex-login-modal">
                            {adminLogin === undefined &&
                            <Link to={"/signup"} style={{color:"blue"}}> Create an Account? </Link>
                            }
                            <Link to={"/security-questions"} style={{color:"blue"}}> Forgot Password? </Link>
                        </ul>
                    </Box>
                </Modal>
            </StyledEngineProvider>
        );
    }

    validateEmail(){
        const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

        if (this.state.email.length===0) {
            this.setState({ emailError: "This field is required"})
            return false;
        }

        if (!pattern.test(this.state.email)) {
            this.setState({emailError: "Invalid email format: @..."});
            return false;
        }

        this.setState({emailError: undefined});
        return true;
    }

    validatePassword(){
        if (this.state.password.length===0) {
            this.setState({ passwordError: "This field is required"});
            return false;
        }

        this.setState({passwordError: undefined });
        return true;
    }
}

const loginlogo = {
    width: 80,
    height: 80,
};

const continuearrow = {
    height: 80,
    width: 100,
    position: "fixed",
    bottom: 25,
};

export default LoginModal;