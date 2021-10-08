import React, {Component} from 'react';
import {
    Button, FilledInput,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid, InputLabel, OutlinedInput,
    Radio,
    RadioGroup
} from "@material-ui/core";
import {TextField} from "@material-ui/core";

import SecurityQuestion from "./SecurityQuestion";


class UserRegistrationPage extends Component {

    constructor(props){
        super(props);
        this.state={
            firstName: '',
            firstNameError: '',
            lastName: '',
            lastNameError: '',
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            confirmPassword: '',
            confirmPasswordError: '',
            submitted: false,
            questionOneRef: React.createRef(),
            questionTwoRef: React.createRef(),
            answerOne: '',
            answerOneError: '',
            answerTwo: '',
            answerTwoError: '',
            accountType: '',
            accountTypeError: '',
        };

    }

    componentDidMount() {
                document.body.style.backgroundColor = "#2F2D4A"
/*
        document.body.style.backgroundColor = "#FFFFFF"
*/
    }

    change = e =>{
        this.props.onChange({[e.target.name]: e.target.value});
        this.setState({
            [e.target.name]: e.target.value
        })
    };


    validate = () => {
        let isError = false;

        const errors = {
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            passwordError: '',
            confirmPasswordError: '',
            answerOneError: '',
            answerTwoError: '',
            accountTypeError: '',
        };

        if(this.state.firstName == ""){
            isError = true;
            errors.firstNameError = "Field is required";
        }

        if(this.state.lastName == ""){
            isError = true;
            errors.lastNameError = "Field is required";
        }

        if(this.state.password == ""){
            isError = true;
            errors.passwordError = "Please enter your password";
        }

        if(this.state.password == ""){
            isError = true;
            errors.confirmPasswordError = "Please confirm your password";
        }

        if (typeof this.state.email !== "undefined") {
            const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.email)) {
                isError = true;
                errors.emailError = "Please enter valid email address.";
            }

        }

        if (typeof this.state.password !== "undefined" && typeof this.state.confirmPassword !== "undefined") {
            if (this.state.password != this.state.confirmPassword) {
                isError = true;
                errors.passwordError = "Passwords don't match.";
                errors.confirmPasswordError = "Passwords don't match.";
            }
        }

        if(this.state.answerOne == ""){
            isError = true;
            errors.answerOneError = "Please submit a response";
        }

        if(this.state.answerTwo == ""){
            isError = true;
            errors.answerTwoError = "Please submit a response";
        }

        if(this.state.accountType == ""){
            isError = true;
            errors.accountTypeError = "Please select an account type";
        }

        if(this.state.accountType=="student" ) {
            if (typeof this.state.email !== "undefined") {
                const pattern = new RegExp('^.+@upr\.edu$');
                if (!pattern.test(this.state.email)) {
                    isError = true;
                    errors.emailError = "A upr email is needed to register as student";
                }

            }
        }

        this.setState({
            ...this.state,
            ...errors
        })


        return isError

    };


    onSubmit = (e) => {
        e.preventDefault();
        //this.props.onSubmit(this.state)

        const err = this.validate()


        if(!err) {
            //clear
            //this.state.questionOneRef.clear;
            //this.state.questionTwoRef.clear;

            this.setState({
                firstName: '',
                firstNameError: '',
                lastName: '',
                lastNameError: '',
                email: '',
                emailError: '',
                password: '',
                passwordError: '',
                confirmPassword: '',
                confirmPasswordError: '',
                answerOne: '',
                answerOneError: '',
                answerTwo: '',
                answerTwoError: '',
                accountTypeError: false,
                accountType: '',
            })
            this.props.onChange({
                firstName: undefined,
                lastName: undefined,
                email: undefined,
                password: undefined,
                confirmPassword: undefined,
                answerOne: undefined,
                answerTwo: undefined,
                questionOne: undefined,
                questionTwo: undefined,
                accountType: undefined,
            })
        }
    };





    render(){

        const titleStyle = {
            position: "absolute",
            width: "1847px",
            height: "120px",
            left: "162px",
            top: "100px",

            fontFamily: "Future BdCn BT",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "100px",
            lineHeight: "120px",


            color: "#FFFFFF",

            opacity: "0.62",
        };

        const firstNameStyle = {
            position: "absolute",
            width: "234px",
            height: "52px",
            left: "166px",
            top: "340px",

            background: "#FFFFFF",
            color: "red",
        };

        const lastNameStyle = {
            position: "absolute",
            width: "234px",
            height: "52px",
            left: "485px",
            top: "340px",

            background: "#FFFFFF",
        };

        const emailStyle = {
            position: "absolute",
            width: "429px",
            height: "52px",
            left: "162px",
            top: "437px",
            //backgroundColor: "#FFFFFF",

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

            //background: "#FFFFFF",
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

            /*            fontFamily: "Grand",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "24px",
                        lineHeight: "27px",*/


            color: "#FFFFFF",
        };

        const studentCheckboxStyle = {
            position: "absolute",
            left: "329px",
            top: "872px",

            //background: "#FFFFFF",
        };

        const clientCheckboxStyle = {
            position: "absolute",
            left: "489px",
            top: "872px",

            //background: "#FFFFFF",
        };

        const createButtonStyle = {
            position: "absolute",
            width: "190px",
            height: "80px",
            left: "1493px",
            top: "864px",

            //background: "#FFFFFF",
        };

        const studentTextStyle = {
            position: "absolute",
            left: "375px",
            top: "872px",

            /*            fontFamily: "Grand",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "24px",
                        lineHeight: "27px",*/

            //background: "#FFFFFF",
        };

        const clientTextStyle = {
            position: "absolute",
            left: "531px",
            top: "872px",

            /*            fontFamily: "Grand",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "24px",
                        lineHeight: "27px",*/

            //background: "#FFFFFF",
        };

        const securityQuestionTextStyle = {
            position: "absolute",
            left: "1047px",
            top: "304px",
            width: "500px",

            /*            fontFamily: "Grand",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "24px",
                        lineHeight: "27px",*/

            color: "#FFFFFF",
        };

        const outerGridStyle= {
            top: "-80px",
            position: "absolute"

        }

        const formLabelStyle= {
         color:"#FFFFFF"
        }

        const radioStyle = {
            color:"#FFFFFF"
        }

        const inputStyle = {
            color:"#000000"
        }



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
        } = this.state;

        console.log("Question 1 value: ", questionOneRef.current?.state.question);
        console.log("Question 2 value: ", questionTwoRef.current?.state.question);

        return (
            <div>

                <form>
                    <div style={outerGridStyle}>


                        <h1 style={titleStyle}>
                            Create Account
                        </h1>

                        <TextField
                            required
                            error = {this.state.firstNameError}
                            variant="filled"
                            label="First Name"
                            type="text"
                            name="firstName"
                            defaultValue="First Name"
                            value = {firstName}
                            onChange={e => this.change(e)}
                            helperText={this.state.firstNameError}
                            style={firstNameStyle}
                        />




                        <TextField
                            required
                            error = {this.state.lastNameError}
                            variant="filled"
                            label="Last Name"
                            type="text"
                            name="lastName"
                            defaultValue=""
                            value = {lastName}
                            onChange={e => this.change(e)}
                            helperText={this.state.lastNameError}
                            style={lastNameStyle}
                        />


                        <TextField
                            required
                            error = {this.state.emailError}
                            variant="filled"
                            label="Email"
                            type="text"
                            name="email"
                            defaultValue=""
                            value = {email}
                            onChange={e => this.change(e)}
                            helperText={this.state.emailError}
                            style={emailStyle}
                        />

                        <TextField
                            required
                            error = {this.state.passwordError}
                            variant="filled"
                            label="Password"
                            type="password"
                            name="password"
                            value = {password}
                            onChange={e => this.change(e)}
                            helperText={this.state.passwordError}
                            style={passwordStyle}
                        />


                        <TextField
                            required
                            error = {this.state.confirmPasswordError}
                            variant="filled"
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value = {confirmPassword}
                            onChange={e => this.change(e)}
                            helperText={this.state.confirmPasswordError}
                            style={confirmPasswordStyle}
                        />


                        <Button variant="contained" style={createButtonStyle} onClick={e => this.onSubmit(e)}>Create</Button>



                        <h3 style={securityQuestionTextStyle}>Security Questions:</h3>

                        <TextField
                            required
                            error = {this.state.answerOneError}
                            variant="filled"
                            label="Answer 1"
                            helperText={this.state.answerOneError}
                            type="text"
                            name="answerOne"
                            placeholder="Answer"
                            value = {answerOne}
                            onChange={e => this.change(e)}
                            style={answerOneStyle}
                        />

                        <TextField
                            required
                            error = {this.state.answerTwoError}
                            variant="filled"
                            label="Answer 2"
                            helperText={this.state.answerTwoError}
                            type="text"
                            name="answerTwo"
                            placeholder="Answer"
                            value = {answerTwo}
                            onChange={e => this.change(e)}
                            style={answerTwoStyle}
                        />


                        <SecurityQuestion
                            num={2}
                            style_q={questionTwoStyle}
                            ref={questionTwoRef}
                        />
                        <SecurityQuestion
                            num={1}
                            style_q={questionOneStyle}
                            ref={questionOneRef}
                        />


                        <FormControl component="fieldset" style={accountTypeStyle} error={this.state.accountTypeError} helperText={this.state.accountTypeError}>
                            <FormLabel component="legend" style={formLabelStyle}>Account Type</FormLabel>
                            <RadioGroup row
                                        aria-label="Account Type"
                                        name="accountType"
                                        onChange={e => this.change(e)}
                                        value={this.state.accountType}

                            >
                                <FormControlLabel value="student" control={<Radio style={radioStyle}/>} label="Student" />
                                <FormControlLabel value="client" control={<Radio style={radioStyle}/>} label="Client" />
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