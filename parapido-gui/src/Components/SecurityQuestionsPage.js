import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {securityQuestions} from "../Utilities";
import Input from "./Input";
import {Backdrop, Modal} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import Stack from "@mui/material/Stack";
import Logo from "../Static/Images/BackgroundPaRapidoLogo.png";

const backdrop = {
    left: "50%",
    top: "50%",
    transform: 'translate(-50%, -50%)',
    width: "26vw",
    height: "75vh",
    position: "absolute",
    display: "flex",
    flexFlow: "column",
    padding: '20px',
    backgroundColor: "#FFFFFF",
}

class SecurityQuestionsPage extends Component {
    constructor(props){
        super(props);
        this.state={
            email: '',
            emailError: undefined,
            questionOne: '',
            questionTwo: '',
            answerOne: '',
            answerOneError: undefined,
            answerTwo: '',
            answerTwoError: undefined,
            emailIsValid: false,
            open: false,
            password: '',
            passwordError: undefined,
            confirmPassword: '',
            confirmPasswordError: undefined,
            correctAnswers: false,
            changeSuccess: false,
            questionOneAnswer: undefined,
            questionTwoAnswer: undefined,
            psswordChangedSuccesfully: false,
            serverDown: false,
            alert: {
                msg: undefined,
                severity: undefined
            }
        };

        this.hideAlert = this.hideAlert.bind(this);
    }

    componentDidMount() {
        document.body.style.backgroundColor = "#2F2D4A"
    }

    change = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    };


    handleClose = () => {
        this.setState({open: false,
            passwordError: undefined,
            confirmPasswordError: undefined,
            password: '',
            confirmPassword: ''
        })
    };


    onSubmit = (e) => {
        e.preventDefault();
        const err = this.validateAnswerOne() || this.validateAnswerTwo()
        if(!err) {
            this.setState({
                open: true,
                correctAnswers: true
            })
        }
    };

    onSubmitEmail = (e) => {
        e.preventDefault();
        const err = this.validateEmail()
        if (!err) {
            fetch('/change_password?email=' + encodeURIComponent(this.state.email),).then(response => {
                if(response.status === 200) {
                    response.json().then(data => {
                        this.setState({
                            emailIsValid: true,
                            questionOne: data["question_1"],
                            questionTwo: data["question_2"],
                            questionOneAnswer: data["answer_1"],
                            questionTwoAnswer: data["answer_2"]
                        })
                    })
                }
                else{
                    if(response.status === 404)
                        this.setState({
                            alert: {
                                msg: "The email provided does not exist on our record",
                                severity: "error"
                            }
                        });
                    else {
                        this.setState({
                            alert: {
                                msg: "An error has occurred ????, Please try again later! ",
                                severity: "error"
                            }
                        });
                    }
                }
            })
        }
    };

    onSubmitPassword = (e) => {
        e.preventDefault();
        const err = this.validatePassword()
        if(err) return false
        const err1 = this.validateFirstPassword()
        const err2 = this.validateConfirmPassword()
        if(err1) return false
        else if (err2) return false
        if(!err){
            fetch('/change_password',{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    password: this.state.password,
                    email: this.state.email
                })
            }).then(response => {
                if(response.status === 200) {
                    this.setState({changeSuccess: true,
                        psswordChangedSuccesfully: true
                    });
                }
                else {
                    if(response.status === 500){
                        this.setState({serverDown: true})
                    }
                }
            })
        }
    };

    hideAlert() {
        setTimeout(() => {this.setState({
            alert: {
                msg: undefined,
                severity: undefined
            }
        })}, 3000);
    }

    render(){
        const {
            email,
            open,
            password,
            confirmPassword,
            changeSuccess,
            psswordChangedSuccesfully,
            serverDown,
            alert
        } = this.state;

        return (
            <div>
                {alert.msg!==undefined &&
                <Stack sx={{width: '100%'}} spacing={2}>
                    <Alert onLoad={this.hideAlert()} severity={alert.severity} className="server-error">{alert.msg}</Alert>
                </Stack>
                }
                <div className='header-flex-container'>
                    <h1 className="page-title-header white-title">Account Recovery</h1>
                </div>
                <h2 className='empty-list-subheader white' style={{marginBottom: "15px", textAlign:"center"}}>Security Questions:</h2>

                <div className='security-body-flex-container'>
                    <Input
                        required
                        disabled = {this.state.emailIsValid}
                        error = {this.state.emailError!==undefined}
                        labelText="Email"
                        name="email"
                        value = {email}
                        onChange={e => this.change(e)}
                        onBlur={this.validateEmail}
                        errorMsg={this.state.emailError}
                        className='security-page-input'
                    />

                    {!this.state.emailIsValid ?
                        <button
                            className='custom-small-buttons security-page-button'
                            onClick={e => this.onSubmitEmail(e)}>Verify Email
                        </button> :
                        <div className='security-questions-input'>
                            <Input
                                required
                                disabled = {this.state.correctAnswers}
                                error = {this.state.answerOneError!==undefined}
                                labelText={securityQuestions[this.state.questionOne-1]}
                                errorMsg={this.state.answerOneError}
                                type="text"
                                name="answerOne"
                                placeholder="Answer"
                                onChange={e => this.change(e)}
                                onBlur={this.validateAnswerOne}
                                className='security-page-input'
                            />
                            <Input
                                required
                                disabled = {this.state.correctAnswers}
                                error = {this.state.answerTwoError!==undefined}
                                labelText={securityQuestions[this.state.questionTwo-1]}
                                errorMsg={this.state.answerTwoError}
                                type="text"
                                name="answerTwo"
                                placeholder="Answer"
                                onChange={e => this.change(e)}
                                onBlur={this.validateAnswerTwo}
                                className='security-page-input'
                            />
                            <button
                                className='custom-small-buttons security-page-button'
                                id='security-submit-button'
                                onClick={e => this.onSubmit(e)}>Submit
                            </button>
                        </div>
                    }
                </div>
                <div>
                    <Modal
                        open={open}
                        onClose={this.handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <Backdrop open={open} style={backdrop}>
                            <div>
                                <h2 className='modalTextStyle'>
                                    {serverDown && <Alert severity="error">Sorry can't reset password right now ???? please try again later!!!</Alert>}
                                    Enter your new password: </h2>
                            </div>
                            <div>
                                <img alt='Logo' src={Logo} className={"modalLogoStyle"}/>
                            </div>
                            <div className='security-modal-container'>
                                <Input
                                    required
                                    blackLabel
                                    error={this.state.passwordError!==undefined}
                                    labelText="Password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={e => this.change(e)}
                                    onBlur={this.validateFirstPassword}
                                    errorMsg={this.state.passwordError}
                                    className='security-page-input black-label-input'
                                />
                                <Input
                                    required
                                    blackLabel
                                    error={this.state.confirmPasswordError!==undefined}
                                    labelText="Confirm Password"
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={e => this.change(e)}
                                    onBlur={this.validateConfirmPassword}
                                    errorMsg={this.state.confirmPasswordError}
                                    className='security-page-input'
                                />

                                {changeSuccess &&
                                <Stack sx={{width: '100%'}} spacing={2}>
                                    <Redirect to={{
                                        pathname: '/',
                                        state: { psswordChangedSuccesfully: psswordChangedSuccesfully}
                                    }} />
                                </Stack>
                                }
                                <button
                                    className='custom-small-buttons security-page-button'
                                    id='security-change-pswd-button'
                                    onClick={e => this.onSubmitPassword(e)}>Change Password
                                </button>
                            </div>
                        </Backdrop>
                    </Modal>
                </div>
            </div>
        );
    };

    validateAnswerOne = () => {
        if(this.state.answerOne === ""){
            this.setState({answerOneError:"This field is required" });
            return true;
        }

        if(this.state.answerOne !== this.state.questionOneAnswer){
            this.setState({answerOneError:"Incorrect answer" });
            return true;
        }

        this.setState({answerOneError: undefined});
        return false
    };

    validateAnswerTwo = () => {
        if(this.state.answerTwo === ""){
            this.setState({answerTwoError:"This field is required" });
            return true;
        }

        if(this.state.answerTwo !== this.state.questionTwoAnswer){
            this.setState({answerTwoError:"Incorrect answer" });
            return true;
        }

        this.setState({answerTwoError: undefined});
        return false
    };

    validateEmail = () => {
        if (this.state.email !== undefined) {
            const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.email)) {
                this.setState({ emailError: "Please enter valid email address."})
                return true;
            }
        }

        this.setState({ emailError: undefined})
        return false;
    }

    validateFirstPassword = () => {
        if(this.state.password.length === 0){
            this.setState({
                passwordError: "This Field is required",
            });
            return true;
        }
        this.setState({
            passwordError: undefined
        })
        return false;
    }

    validateConfirmPassword = () => {
        if(this.state.confirmPassword.length === 0){
            this.setState({
                confirmPasswordError: "This Field is required",
            });
            return true;
        }
        this.validatePassword()
        if(this.validatePassword() !== true){
            this.setState({
                confirmPasswordError: undefined
            })
            return false;
        }
    }

    validatePassword = () => {
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                passwordError: "Passwords do not match",
                confirmPasswordError: "Passwords do not match",
            });
            return true;
        }
        this.setState({
            passwordError: undefined,
            confirmPasswordError: undefined
        })
        return false;
    }
}

export default SecurityQuestionsPage;