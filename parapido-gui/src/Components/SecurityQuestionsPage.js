import React, {Component} from 'react';
import {Backdrop, Modal} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import {Alert} from "@material-ui/lab";
import Stack from '@mui/material/Stack';
import "../Layouts/SecurityQuestionsPage.css"
import loginModalLogo from '../Static/Images/Pa_Rapido_logo_bgPalette.png';

class SecurityQuestionsPage extends Component {

    constructor(props){
        super(props);
        this.state={
            email: '',
            emailError: '',
            questionOne: '',
            questionTwo: '',
            answerOne: '',
            answerOneError: '',
            answerTwo: '',
            answerTwoError: '',
            emailIsValid: false,
            open: false,
            password: '',
            passwordError: '',
            confirmPassword: '',
            confirmPasswordError: '',
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
        let isError = false;

        const errors = {
            emailError: '',
            answerOneError: '',
        };

        if(this.state.answerOne === ""){
            isError = true;
            errors.answerOneError = "Please submit a response";
        }

        if(this.state.answerOne !== this.state.questionOneAnswer){
            isError = true;
            errors.answerOneError = "Incorrect answer. Please try again.";
        }

        this.setState({
            ...this.state,
            ...errors
        })


        return isError

    };

    validateAnswerTwo = () => {
        let isError = false;

        const errors = {
            emailError: '',
            answerTwoError: '',
        };

        if(this.state.answerTwo === ""){
            isError = true;
            errors.answerTwoError = "Please submit a response";
        }

        if(this.state.answerTwo !== this.state.questionTwoAnswer){
            isError = true;
            errors.answerTwoError = "Incorrect answer. Please try again.";
        }

        this.setState({
            ...this.state,
            ...errors
        })


        return isError

    };

    validateEmail = () => {
        let isError = false;

        const errors = {
            emailError: '',
        };

        if (typeof this.state.email !== "undefined") {
            const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.email)) {
                isError = true;
                errors.emailError = "Please enter valid email address.";
            }

        }

        this.setState({
            ...this.state,
            ...errors
        })

        return isError
    }

    validatePassword = () => {
        let isError = false;

        const errors = {
            passwordError: '',
            confirmPasswordError: '',
        };

        if (this.state.password !== this.state.confirmPassword && this.state.confirmPassword !== "") {
            isError = true;
            errors.passwordError = "Passwords do not match!"
            errors.confirmPasswordError = "Passwords do not match!"
        }

        this.setState({
            ...this.state,
            ...errors
        })

        return isError
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

            this.setState({open: true})
            this.setState({correctAnswers: true})
        }
    };

    onSubmitEmail = (e) => {
        //Make sure the email is valid and exists. Also fetch the questions and answers]

        e.preventDefault();//this.props.onSubmit(this.state)
        const err = this.validateEmail()

        if (!err) {
            console.log(this.state.email)

            fetch('/change_password?email=' + encodeURIComponent(this.state.email),).then(response => {
                console.log(response.status)
                if(response.status === 200) {
                    this.setState({emailIsValid: true})
                    this.setState({fetchError: false})

                    //Success get data
                    response.json().then(data => {

                        this.setState({questionOne: data["question_1"]})
                        this.setState({questionTwo: data["question_2"]})
                        this.setState({questionOneAnswer: data["answer_1"]})
                        this.setState({questionTwoAnswer: data["answer_2"]})
                    })
                }
                else{
                    this.setState({fetchError: true})
                }

            })
        }


    };

    chooseQuestion = (e) => {

        if(e == 1) return "In what city were you born?"
        if(e == 2) return "What high school did you attend?"
        if(e == 3) return "What was your favorite food as a child?"
    }

    onSubmitPassword = (e) => {
        //Here we make sure the email is valid and exists. Also fetch the questions and answers
        e.preventDefault();//this.props.onSubmit(this.state)
        const err = this.validatePassword()

        if (!err) {
            //redirect
            fetch('/change_password',{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    password: this.state.password,
                    email: this.state.email
                })
            }).then(response => {
                if(response.status === 200) {

                    this.setState({changeSuccess: true})

                }
                else {
                    //fetch error
                    this.setState({passwordError: "DB Error Try Again"})
                }
            })



        }



    };


    render(){

        let renderQuestionOne;
        let renderQuestionTwo;
        let button;

        const {
            email,
            open,
            password,
            confirmPassword,
            changeSuccess,
            fetchError,
        } = this.state;

        if( this.state.emailIsValid ){

            renderQuestionOne = <TextField
                required
                disabled = {this.state.correctAnswers}
                error = {this.state.answerOneError}
                variant="filled"
                label={this.chooseQuestion(this.state.questionOne)}
                helperText={this.state.answerOneError}
                type="text"
                name="answerOne"
                placeholder="Answer"
                onChange={e => this.change(e)}
                onBlur={this.validateAnswerOne}
                className={"answerOneStyle"}
            />;

            renderQuestionTwo = <TextField
                required
                disabled = {this.state.correctAnswers}
                error = {this.state.answerTwoError}
                variant="filled"
                label={this.chooseQuestion(this.state.questionTwo)}
                helperText={this.state.answerTwoError}
                type="text"
                name="answerTwo"
                placeholder="Answer"
                onChange={e => this.change(e)}
                onBlur={this.validateAnswerTwo}
                className={"answerTwoStyle"}
            />;

        }

        if(!this.state.emailIsValid){
            button = <button variant="contained" className={"createButtonStyle"} onClick={e => this.onSubmitEmail(e)}>Verify Email</button>
        }
        else  button = <button variant="contained" className={"createButtonStyle"} onClick={e => this.onSubmit(e)}>Submit</button>

        const body = (
            <div >
                <img src={loginModalLogo} className={"modalLogoStyle"}/>


                <form>
                    <TextField
                        required
                        error = {this.state.passwordError}
                        variant="outlined"
                        label="Password"
                        type="password"
                        name="password"
                        defaultValue=""
                        value = {password}
                        onChange={e => this.change(e)}
                        onBlur={this.validatePassword}
                        helperText={this.state.passwordError}
                        className={"passwordStyle"}
                    />

                    <TextField
                        required
                        error = {this.state.confirmPasswordError}
                        variant="outlined"
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        defaultValue=""S
                        value = {confirmPassword}
                        onChange={e => this.change(e)}
                        onBlur={this.validatePassword}
                        helperText={this.state.confirmPasswordError}
                        className={"confirmPasswordStyle"}
                    />


                    {changeSuccess &&

                    <Stack sx={{width: '100%'}} spacing={2}>
                        <Alert severity="success" className={"errorStyle"}>This is a success alert — check it out!</Alert>
                    </Stack>

                    }
                    <button variant="contained" className={"changePasswordStyle"} onClick={e => this.onSubmitPassword(e)}>Change Password</button>

                </form>


            </div>
        );



        return (
            <div>


                {
                    fetchError &&

                    <Stack sx={{width: '100%'}} spacing={2}>
                        <Alert severity="error" className={"errorStyle"}>DB Error Try Again</Alert>
                    </Stack>

                }




                {changeSuccess && <Redirect to='/'/>}


                <form>
                    <div className={"outerGridStyle"}>

                        <div className={"titleStyle"}>
                            Account Recovery
                        </div>


                        <TextField
                            required
                            disabled = {this.state.emailIsValid}
                            error = {this.state.emailError}
                            variant="filled"
                            label="Email"
                            type="text"
                            name="email"
                            defaultValue=""
                            value = {email}
                            onChange={e => this.change(e)}
                            onBlur={this.validateEmail}
                            helperText={this.state.emailError}
                            className={"emailStyle"}
                        />

                        {renderQuestionOne}
                        {renderQuestionTwo}


                        {button}



                        <div className={"securityQuestionTextStyle"}>Security Questions:</div>

                        <div>

                            <Modal
                                open={open}
                                onClose={this.handleClose}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                //style={modalStyle}
                            >
                                <Backdrop open={open} style={backdropStyle}>
                                    <div className={"modalTextStyle"}> Enter your new password: </div>
                                    {body}
                                </Backdrop>

                            </Modal>
                        </div>


                    </div>
                </form>
            </div>

        );
    };
}

const backdropStyle = {
    left: "700px",
    top: "200px",
    width: "500px",
    height: "600px",
    position: "absolute",
    //backgroundColor: "#2F2D4A",
    backgroundColor: "#FFFFFF",
    border: '3px solid black',

}


export default SecurityQuestionsPage;