import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {securityQuestions} from "../Utilities";
import Input from "./Input";
import ItemsDropdown from "./ItemsDropdown";
import {FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

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
            accountType: '',
            accountTypeError: undefined,
            registerSuccess: false,
            questionError: undefined,
            alert: {
                msg: undefined,
                severity: undefined
            }
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

        this.validateFetch = this.validateFetch.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        document.body.style.backgroundColor = "#2F2D4A"
    }

    change = e =>{
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            if (e.target.name === 'accountType') {
                this.validateAccountType();
            }});
    };

    onSubmit() {
        const val1 = this.validateFirstName();
        const val2 = this.validateLastName();
        const val3 = this.validateEmail();
        const val4 = this.validatePassword();
        const val5 = this.validatePasswordConfirm();
        const val6 = this.validateAnswerOne();
        const val7 = this.validateAnswerTwo();
        const val8 = this.validateAccountType();
        const val9 = this.validateQuestions();

        if(!val1 || !val2 || !val3 || !val4 || !val5 || !val6 || !val7 || !val8 || !val9)
            return;

        this.validateFetch();
    };

    hideAlert() {
        setTimeout(() => {this.setState({
            isFetchError: false,
            alert: {
                msg: undefined,
                severity: undefined
            }
        })}, 3000);
    }


    render() {
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
            isFetchError,
            alert,
            registerSuccess
        } = this.state;

        return (
            <div>
                {isFetchError &&
                <Alert onLoad={this.hideAlert()} severity={alert.severity} className="server-error">
                    {alert.msg}
                </Alert>}
                {registerSuccess &&
                <div>
                    <Redirect to={{
                        pathname: '/',
                        state: {
                            alertMssg: alert.msg,
                            severity: alert.severity
                        }
                    }}/>
                </div>
                }
                <div className="page-header"> Create Account </div>
                <div className={"outer-flexbox"}>
                    <div className={'right-flexbox'}>
                        <div className={'horizontal-flexbox1'}>
                            <Input
                                required
                                error = {this.state.firstNameError!==undefined}
                                variant="filled"
                                labelText="First Name"
                                type="text"
                                name="firstName"
                                value = {firstName}
                                onChange={this.change}
                                errorMsg={this.state.firstNameError}
                                className='first-name-style'
                                onBlur={this.validateFirstName}
                            />
                            <Input
                                required
                                error = {this.state.lastNameError!==undefined}
                                variant="filled"
                                labelText="Last Name"
                                type="text"
                                name="lastName"
                                value = {lastName}
                                onChange={this.change}
                                errorMsg={this.state.lastNameError}
                                className='last-name-style'
                                onBlur={this.validateLastName}
                            />
                        </div>
                        <div className={'horizontal-flexbox2'}>
                            <Input
                                required
                                error = {this.state.emailError!==undefined}
                                variant="filled"
                                labelText="Email"
                                type="text"
                                name="email"
                                value = {email}
                                onChange={this.change}
                                errorMsg={this.state.emailError}
                                className={'email-style'}
                                onBlur={this.validateEmail}
                            />
                        </div>
                        <div className={'horizontal-flexbox2'}>
                            <Input
                                required
                                error = {this.state.passwordError!==undefined}
                                variant="filled"
                                labelText="Password"
                                type="password"
                                name="password"
                                value = {password}
                                onChange={this.change}
                                errorMsg={this.state.passwordError}
                                className={'password-style'}
                                onBlur={this.validatePassword}
                            />
                        </div>
                        <div className={'horizontal-flexbox2'}>
                            <Input
                                required
                                error = {this.state.confirmPasswordError!==undefined}
                                variant="filled"
                                labelText="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value = {confirmPassword}
                                onChange={this.change}
                                errorMsg={this.state.confirmPasswordError}
                                className={'confirm-password-style'}
                                onBlur={this.validatePasswordConfirm}
                            />
                        </div>
                        <div className={'horizontal-flexbox2'}>
                            <FormControl
                                component="fieldset"
                                style={accounttype}
                                error={this.state.accountTypeError!==undefined}
                            >
                                <FormLabel component="legend" style={formlabel}>Account Type</FormLabel>
                                <RadioGroup row
                                            aria-label="Account Type"
                                            name="accountType"
                                            onChange={this.change}
                                            value={this.state.accountType}
                                >
                                    <FormControlLabel value="1" control={<Radio style={radio}/>} label="Student" />
                                    <FormControlLabel value="2" control={<Radio style={radio}/>} label="Client" />
                                </RadioGroup>
                                <FormHelperText>{this.state.accountTypeError}</FormHelperText>
                            </FormControl>
                        </div>
                    </div>
                    <div className={'left-flexbox'}>
                        <div className={"horizontal-flexbox2"}>
                            <h2 className="empty-list-subheader white">Security Questions</h2>
                        </div>
                        <div className={"horizontal-flexbox3"}>
                            <ItemsDropdown
                                initial_value={1}
                                ref={questionOneRef}
                                itemsList={securityQuestions}
                                validationFunc={this.validateQuestions}
                                label='Question 1'
                            />
                        </div>
                        <div className={"horizontal-flexbox4"}>
                            <Input
                                required
                                error = {this.state.answerOneError!==undefined}
                                variant="filled"
                                labelText="Answer 1"
                                errorMsg={this.state.answerOneError}
                                type="text"
                                name="answerOne"
                                value = {answerOne}
                                onChange={this.change}
                                className={"answer-one-style"}
                                onBlur={this.validateAnswerOne}
                            />
                        </div>
                        <div className={"horizontal-flexbox3"}>
                            <ItemsDropdown
                                initial_value={2}
                                ref={questionTwoRef}
                                itemsList={securityQuestions}
                                validationFunc={this.validateQuestions}
                                label='Question 2'
                            />
                        </div>
                        <div className={"horizontal-flexbox4"} style={{marginBottom:"2vh"}}>
                            <Input
                                required
                                error = {this.state.answerTwoError!==undefined}
                                variant="filled"
                                labelText="Answer 2"
                                errorMsg={this.state.answerTwoError}
                                type="text"
                                name="answerTwo"
                                value = {answerTwo}
                                onChange={this.change}
                                className={"answer-two-style"}
                                onBlur={this.validateAnswerTwo}
                            />
                        </div>
                        <div className={"horizontal-flexbox5"}>
                            <button variant="contained" className="create-button-style" onClick={this.onSubmit}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    validateFirstName(){
        const { firstName } = this.state;

        if (firstName.length===0) {
            this.setState({firstNameError: "This field is required"});
            return false;
        }
        this.setState({firstNameError: undefined });
        return true;
    }

    validateLastName(){
        const { lastName } = this.state;

        if (lastName.length===0) {
            this.setState({ lastNameError: "This field is required" });
            return false;
        }
        this.setState({lastNameError: undefined});
        return true;
    }

    validateEmail(){
        const { email, accountType } = this.state;

        if (email.length=== '') {
            this.setState({emailError: 'This field is required' });
            return false;
        }

        const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
        if (!pattern.test(email)) {
            this.setState({emailError: "The email provided is not valid"});
            return false;
        }

        if (accountType !== '' && !this.validateAccountType()) {
            return false;
        }

        this.setState({emailError: undefined});
        return true;

    }

    validatePassword() {
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

    validatePasswordConfirm() {
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

    validateAnswerOne() {
        const { answerOne } = this.state;

        if (answerOne.length===0) {
            this.setState({ answerOneError: "This field is required" });
            return false;
        }
        this.setState({answerOneError: undefined});
        return true;
    }

    validateAnswerTwo() {
        const { answerTwo } = this.state;

        if (answerTwo.length===0) {
            this.setState({ answerTwoError: "This field is required" });
            return false;
        }
        this.setState({answerTwoError: undefined});
        return true;
    }

    validateAccountType() {
        const { email, accountType } = this.state;
        const uprPattern = /^.+@upr\.edu$/;

        if (accountType==='') {
            this.setState({accountTypeError: 'This field is required'});
            return false;
        }

        if (accountType === "1" && (email !== '' && !uprPattern.test(email))) {
            this.setState({emailError: 'A upr email is needed to register as student'});
            return false;
        }

        this.setState({accountTypeError: undefined});
        return true;
    }

    validateQuestions() {
        const { questionOneRef, questionTwoRef } = this.state;

        if(questionOneRef.current !== null && questionTwoRef.current !== null){
            if (parseInt(questionOneRef?.current.state.item ) === parseInt(questionTwoRef?.current.state.item)) {
                questionOneRef?.current.setState({itemError: 'Please select different questions'});
                questionTwoRef?.current.setState({itemError: 'Please select different questions'});
                return false;
            }

            questionOneRef?.current.setState({itemError: undefined});
            questionTwoRef?.current.setState({itemError: undefined});
            return true
        }
    }

    validateFetch() {
        fetch('/api/create_user',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                q_type1: this.state.questionOneRef?.current.state.item,
                q_type2: this.state.questionTwoRef?.current.state.item,
                ans1: this.state.answerOne,
                ans2: this.state.answerTwo,
                type: this.state.accountType,
            })
        }).then(response => {
            if(response.status === 201) {
                this.setState({
                    registerSuccess: true,
                    alert: {
                        msg: "The account has been successfully created!!! 👍🏼",
                        severity: "success"}
                })
            }
            else {
                if (response.status === 409) {
                    this.setState({
                        isFetchError: true,
                        alert: {
                            msg: "Email address is already registered.",
                            severity: "error"
                        }
                    });
                }
                else {
                    this.setState({
                        isFetchError: true,
                        alert: {
                            msg: "Sorry, we are unable to create your account at this moment. Please try again later!",
                            severity: "error"
                        }
                    });
                }
            }
        })
    }
}

const accounttype = {
    position: "absolute",
    marginTop: "10px",
    color: "#FFFFFF",
};

const formlabel= {
    color:"#FFFFFF"
}

const radio = {
    color:"#FFFFFF"
}

export default UserRegistrationPage;