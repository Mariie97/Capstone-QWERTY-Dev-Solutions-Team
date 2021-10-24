import React, {Component} from 'react';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from "@material-ui/core";

import Alert from '@material-ui/lab/Alert';

import SecurityQuestionDropdown from "./SecurityQuestionDropdown";
import {Redirect} from "react-router-dom";
import "../Layouts/UserRegistrationPage.css"


const emailStyle = {
    position: "absolute",
    width: "429px",
    height: "52px",
    left: "162px",
    top: "437px",
    background: "#FFFFFF",
};

const passwordStyle = {
    position: "absolute",
    width: "429px",
    height: "52px",
    left: "162px",
    top: "579px",
    background: "#FFFFFF",
};

const confirmPasswordStyle = {
    position: "absolute",
    width: "429px",
    height: "52px",
    left: "162px",
    top: "735px",
    background: "#FFFFFF",
};

const answerOneStyle = {
    position: "absolute",
    width: "636px",
    height: "52px",
    left: "1047px",
    top: "501px",
    background: "#FFFFFF",
};

const answerTwoStyle = {
    position: "absolute",
    width: "636px",
    height: "52px",
    left: "1047px",
    top: "718px",
    background: "#FFFFFF",
};

const questionOneStyle = {
    position: "absolute",
    width: "229px",
    height: "52px",
    left: "1047px",
    top: "388px",
};

const questionTwoStyle = {
    position: "absolute",
    width: "229px",
    height: "52px",
    left: "1047px",
    top: "609px",
    color: "#FFFFFF",
};

const accountTypeStyle = {
    position: "absolute",
    left: "162px",
    top: "850px",
    width: "500px",
    color: "#FFFFFF",
};

const createButtonStyle = {
    position: "absolute",
    width: "190px",
    height: "80px",
    left: "1493px",
    top: "864px",
    borderColor: "black",
    borderRadius: "20px",
    borderWidth: "2px",
    background: "#FFEBCC",
    fontFamily: "Grand",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "24px",
};

const outerGridStyle= {
    top: "-70px",
    position: "absolute"
}

const formLabelStyle= {
    color:"#FFFFFF"
}

const radioStyle = {
    color:"#FFFFFF"
}

const errorStyle = {
    position: "absolute",
    width: "429px",
    height: "52px",
    left: "600px",
    top: "800px",
};

const questionErrorStyle = {
    marginTop: '32vh',
    marginLeft: '71vw',
    fontSize: '20px',
    color: '#f44336'
};

class UserRegistrationPage extends Component {

    constructor(props){
        super(props);
        this.state={
            firstName: '',
            firstNameError: undefined,
            lastName: '',
            lastNameError: undefined,
            email: '',
            emailError: undefined,
            password: '',
            passwordError: undefined,
            confirmPassword: '',
            confirmPasswordError: undefined,
            isFetchError: false,
            fetchError: '',
            questionOneRef: React.createRef(),
            questionTwoRef: React.createRef(),
            answerOne: '',
            answerOneError: undefined,
            answerTwo: '',
            answerTwoError: undefined,
            accountType: '1',
            accountTypeError: '',
            registerSuccess: false,
            questionError: undefined,
        };

        this.validateFirstName = this.validateFirstName.bind(this)
        this.validateLastName = this.validateLastName.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
        this.validatePassword = this.validatePassword.bind(this)
        this.validatePasswordConfirm = this.validatePasswordConfirm.bind(this)
        this.validateAnswerOne = this.validateAnswerOne.bind(this)
        this.validateAnswerTwo = this.validateAnswerTwo.bind(this)
        this.validateAccountType = this.validateAccountType.bind(this)
        this.validateQuestions = this.validateQuestions.bind(this)

        this.onSubmit = this.onSubmit.bind(this)

    }

    componentDidMount() {
        document.body.style.backgroundColor = "#2F2D4A"
    }

    change = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    validateFetch = () => {
        fetch('/create_user',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                q_type1: this.state.questionOneRef?.current.state.question,
                q_type2: this.state.questionTwoRef?.current.state.question,
                ans1: this.state.answerOne,
                ans2: this.state.answerTwo,
                type: this.state.accountType,
            })
        }).then(response => {
                if(response.status === 201) {
                    this.setState({registerSuccess: true})
                }
                else{
                    //poner la alerta
                    this.setState({isFetchError: true})
                }
            }
        )

    }

    onSubmit() {

        const val1= this.validateFirstName();
        const val2= this.validateLastName();
        const val3= this.validateEmail();
        const val4= this.validatePassword();
        const val5= this.validatePasswordConfirm();
        const val6= this.validateAnswerOne();
        const val7= this.validateAnswerTwo();
        const val8= this.validateAccountType();
        const val9= this.validateQuestions();
        if(!val1 || !val2 || !val3 || !val4 || !val5 || !val6 || !val7 || !val8 || !val9)
            return;

        this.validateFetch()
    };

    validateFirstName(event){
        if (this.state.firstName.length===0) {
            this.setState({firstNameError: "This field is required"});
            return false;
        }
        this.setState({firstNameError: undefined });
        return true;
    }

    validateLastName(event){
        if (this.state.lastName.length===0) {
            this.setState({ lastNameError: "This field is required" });
            return false;
        }
        this.setState({lastNameError: undefined});
        return true;
    }

    validateEmail(event){
        const { email } = this.state;

        if (email.length===0) {
            this.setState({emailError: 'This field is required' });
            return false;
        }

        const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
        if (!pattern.test(this.state.email)) {
            this.setState({emailError: "The email provided is not valid"});
            return false;
        }

        this.setState({emailError: undefined});
        return true;

    }

    validatePassword(event) {
        const { password } = this.state;
        if (password.length===0) {
            this.setState({passwordError: 'This field is required'});
            return false;
        }

        if (password.length < 6) {
            this.setState({passwordError: 'At least 6 characters are required'});
            return false;
        }

        this.setState({passwordError: undefined});
        return true;
    }

    validatePasswordConfirm(event) {
        const { confirmPassword, password } = this.state;
        if (confirmPassword.length===0) {
            this.setState({confirmPasswordError: 'This field is required'});
            return false;
        }

        if (password!==confirmPassword) {
            this.setState({confirmPasswordError: 'Passwords does not match'});
            return false;
        }

        this.setState({confirmPasswordError: undefined});
        return true;
    }

    validateAnswerOne(event) {
        if (this.state.answerOne.length===0) {
            this.setState({ answerOneError: "This field is required" });
            return false;
        }
        this.setState({answerOneError: undefined});
        return true;
    }

    validateAnswerTwo(event) {
        if (this.state.answerTwo.length===0) {
            this.setState({ answerTwoError: "This field is required" });
            return false;
        }
        this.setState({answerTwoError: undefined});
        return true;
    }

    validateAccountType(event) {
        const { email, accountType } = this.state;
        const typeSelected = event!==undefined ? event.target.value : accountType;
        const uprPattern = /^.+@upr\.edu$/;

        if (typeSelected==='1' && !uprPattern.test(email)) {
            this.setState({
                accountType: typeSelected,
                emailError: 'A upr email is needed to register as student'
            });
            return false;
        }

        this.setState({
            accountType: typeSelected,
            emailError: undefined
        });
        return true;
    }

    validateQuestions() {
        const { questionOneRef, questionTwoRef } = this.state;

        if (questionOneRef?.current.state.question === questionTwoRef?.current.state.question) {
            this.setState({questionError: 'Please select different questions'})
            return false;

        }
        this.setState({questionError: undefined})
        return true
    }


    render() {
        //TODO: Needs CSS improvement
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            questionOneRef,
            questionTwoRef,
            answerOne,
            answerTwo,
            registerSuccess,
            isFetchError,
            questionError,
        } = this.state;

        return (
            <div>
                {isFetchError &&
                <Alert severity="error" style={errorStyle}>Unexpected Error. Try Again</Alert>
                }


                {registerSuccess &&
                <div>
                    <Alert severity="success" style={errorStyle}>Your account was created successfully!</Alert>
                    <Redirect to='/' />
                </div>
                }
                <form>
                    <div style={outerGridStyle}>
                        <div className={"title-style"}>
                            Create Account
                        </div>

                        <TextField
                            required
                            error = {this.state.firstNameError!==undefined}
                            variant="filled"
                            label="First Name"
                            type="text"
                            name="firstName"
                            value = {firstName}
                            onChange={this.change}
                            helperText={this.state.firstNameError}
                            className={"firstNameStyle"}
                            onBlur={this.validateFirstName}
                        />
                        <TextField
                            required
                            error = {this.state.lastNameError!==undefined}
                            variant="filled"
                            label="Last Name"
                            type="text"
                            name="lastName"
                            value = {lastName}
                            onChange={this.change}
                            helperText={this.state.lastNameError}
                            className={"lastNameStyle"}
                            onBlur={this.validateLastName}
                        />
                        <TextField
                            required
                            error = {this.state.emailError!==undefined}
                            variant="filled"
                            label="Email"
                            type="text"
                            name="email"
                            value = {email}
                            onChange={this.change}
                            helperText={this.state.emailError}
                            style={emailStyle}
                            onBlur={this.validateEmail}
                        />
                        <TextField
                            required
                            error = {this.state.passwordError!==undefined}
                            variant="filled"
                            label="Password"
                            type="password"
                            name="password"
                            value = {password}
                            onChange={this.change}
                            helperText={this.state.passwordError}
                            style={passwordStyle}
                            onBlur={this.validatePassword}
                        />
                        <TextField
                            required
                            error = {this.state.confirmPasswordError!==undefined}
                            variant="filled"
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value = {confirmPassword}
                            onChange={this.change}
                            helperText={this.state.confirmPasswordError}
                            style={confirmPasswordStyle}
                            onBlur={this.validatePasswordConfirm}
                        />
                        <Button variant="contained" style={createButtonStyle} onClick={this.onSubmit}>Create</Button>
                        <div className='security-questions-container' >
                            <div className={"securityQuestionTextStyle"}>Security Questions:</div>
                            {questionError!==undefined &&
                            <p style={questionErrorStyle}>{questionError}</p>
                            }


                            <SecurityQuestionDropdown
                                question={1}
                                num={1}
                                style_q={questionOneStyle}
                                ref={questionOneRef}
                                onClick={this.validateQuestions}
                            />
                            <TextField
                                required
                                error = {this.state.answerOneError!==undefined}
                                variant="filled"
                                label="Answer 1"
                                helperText={this.state.answerOneError}
                                type="text"
                                name="answerOne"
                                placeholder="Answer"
                                value = {answerOne}
                                onChange={this.change}
                                style={answerOneStyle}
                                onBlur={this.validateAnswerOne}
                            />
                            <SecurityQuestionDropdown
                                question={2}
                                num={2}
                                style_q={questionTwoStyle}
                                ref={questionTwoRef}
                                onClick={this.validateQuestions}
                            />

                            <TextField
                                required
                                error = {this.state.answerTwoError!==undefined}
                                variant="filled"
                                label="Answer 2"
                                helperText={this.state.answerTwoError}
                                type="text"
                                name="answerTwo"
                                placeholder="Answer"
                                value = {answerTwo}
                                onChange={this.change}
                                style={answerTwoStyle}
                                onBlur={this.validateAnswerTwo}
                            />
                        </div>

                        <FormControl
                            component="fieldset"
                            style={accountTypeStyle}
                            error={this.state.accountTypeError}
                            helperText={this.state.accountTypeError}
                        >
                            <FormLabel component="legend" style={formLabelStyle}>Account Type</FormLabel>
                            <RadioGroup row
                                        aria-label="Account Type"
                                        name="accountType"
                                        onChange={this.validateAccountType}
                                        value={this.state.accountType}
                            >
                                <FormControlLabel value="1" control={<Radio style={radioStyle}/>} label="Student" />
                                <FormControlLabel value="2" control={<Radio style={radioStyle}/>} label="Client" />
                            </RadioGroup>
                            <FormHelperText>{this.state.accountTypeError}</FormHelperText>
                        </FormControl>
                    </div>
                </form>
            </div>
        );
    };
}


export default UserRegistrationPage;