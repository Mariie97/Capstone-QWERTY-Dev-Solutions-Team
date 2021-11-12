import React, {Component} from 'react';
import {Backdrop, Modal} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import {Alert} from "@material-ui/lab";
import Stack from '@mui/material/Stack';
import "../Layouts/SecurityQuestionsPage.css"
import loginModalLogo from '../Static/Images/Pa_Rapido_logo_bgPalette.png';
import Input from "./Input";
import {securityQuestions} from "../Utilities";

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
            fetchError: false,
            questionOneAnswer: undefined,
            questionTwoAnswer: undefined,
        };
    }

    componentDidMount() {
        document.body.style.backgroundColor = "#2F2D4A"
    }

    change = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
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

    validatePassword = () => {
        if (this.state.password !== this.state.confirmPassword && this.state.confirmPassword !== "") {
            this.setState({
                passwordError: "Passwords do not match",
                confirmPasswordError: "Passwords do not match",
            });
            return true;
        }

        this.setState({
            passwordError: undefined,
            confirmPasswordError: undefined,
        })
        return false;
    }

    handleClose = () => {
        if(this.state.password === this.state.confirmPassword && this.state.password !== "" && this.state.confirmPassword !== "")
            this.setState({open: false})
    };


    onSubmit = (e) => {
        e.preventDefault();
        const err = this.validateAnswerOne() || this.validateAnswerTwo()
        if(!err) {
            //clear
            this.setState({
                open: true,
                correctAnswers: true
            })
        }
    };

    onSubmitEmail = (e) => {
        //Make sure the email is valid and exists. Also fetch the questions and answers]
        e.preventDefault();
        const err = this.validateEmail()
        if (!err) {
            fetch('/change_password?email=' + encodeURIComponent(this.state.email),).then(response => {
                if(response.status === 200) {
                    //Success get data
                    response.json().then(data => {
                        this.setState({
                            emailIsValid: true,
                            fetchError: false,
                            questionOne: data["question_1"],
                            questionTwo: data["question_2"],
                            questionOneAnswer: data["answer_1"],
                            questionTwoAnswer: data["answer_2"]
                        })
                    })
                }
                else{
                    this.setState({fetchError: true})
                }
            })
        }
    };

    onSubmitPassword = (e) => {
        //Here we make sure the email is valid and exists. Also fetch the questions and answers
        e.preventDefault();
        const err = this.validatePassword()

        if (!err) {
            fetch('/change_password',{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    password: this.state.password,
                    email: this.state.email
                })
            }).then(response => {
                if(response.status === 200) {
                    //TODO: Redirect to Landing Page
                    this.setState({changeSuccess: true});
                }
                else {
                    //fetch error
                    //TODO: Change message to the correct text according to response's status code
                    this.setState({passwordError: "DB Error Try Again"})
                }
            })
        }
    };

    render(){
        const {
            email,
            open,
            password,
            confirmPassword,
            changeSuccess,
            fetchError,
        } = this.state;


        return (
            <div>
                {fetchError &&
                <Stack sx={{width: '100%'}} spacing={2}>
                    <Alert severity="error" className={"errorStyle"}>An error has occurred,.Please try again later!</Alert>
                </Stack>
                }

                {changeSuccess && <Redirect to='/'/>}
                <div className='header-flex-container'>
                    <h1 className="page-title-header">Account Recovery</h1>
                </div>
                <h2 className='security-page-subheader'>Security Questions:</h2>

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
                            className='custom-buttons security-page-button'
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
                                className='custom-buttons security-page-button'
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
                        <Backdrop open={open} style={backdropStyle}>
                            <div className='security-modal-container'>
                                <img alt='PaRapido Logo' src={loginModalLogo} className={"modalLogoStyle"}/>
                                <h2 className='modalTextStyle'> Enter your new password: </h2>
                                <Input
                                    required
                                    blackLabel
                                    error={this.state.passwordError!==undefined}
                                    labelText="Password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={e => this.change(e)}
                                    onBlur={this.validatePassword}
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
                                    onBlur={this.validatePassword}
                                    errorMsg={this.state.confirmPasswordError}
                                    className='security-page-input'
                                />

                                {changeSuccess &&
                                <Stack sx={{width: '100%'}} spacing={2}>
                                    <Alert severity="success" className={"errorStyle"}>This is a success alert — check it out!</Alert>
                                </Stack>
                                }
                                <button
                                    className='custom-buttons security-page-button'
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
}

const backdropStyle = {
    left: "50%",
    top: "50%",
    transform: 'translate(-50%, -50%)',
    width: "33vw",
    height: "80vh",
    position: "absolute",
    display: "flex",
    flexFlow: "column",
    padding: '20px',
    backgroundColor: "#FFFFFF",
}


export default SecurityQuestionsPage;