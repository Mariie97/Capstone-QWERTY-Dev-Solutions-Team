import React, {Component} from 'react';
import {Grid} from "@material-ui/core";

import SecurityQuestion from "./SecurityQuestion";


class UserRegistrationPage extends Component {

    constructor(props){
        super(props);
        this.state={
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            questionOneRef: React.createRef(),
            questionTwoRef: React.createRef(),
        };
    }

    change = e =>{
        this.props.onChange({[e.target.name]: e.target.value});
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        //this.props.onSubmit(this.state)
        this.setState({
            firstName: undefined,
            lastName: undefined,
            email: undefined,
            password: undefined,
            confirmPassword: undefined,
            answerOne: undefined,
            answerTwo: undefined,
            questionOne: undefined,
            questionTwo: undefined,
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
        })
    };


    render(){

        const titleStyle = {
            position: "absolute",
            width: "1847px",
            height: "120px",
            left: "162px",
            top: "134px",

            fontFamily: "Future BdCn BT",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "100px",
            lineHeight: "120px",


            //color: "#FAF7FF",

            opacity: "0.62",
        };

        const firstNameStyle = {
            position: "absolute",
            width: "234px",
            height: "52px",
            left: "166px",
            top: "340px",

            //background: "#FFFFFF",
        };

        const lastNameStyle = {
            position: "absolute",
            width: "234px",
            height: "52px",
            left: "485px",
            top: "340px",

            //background: "#FFFFFF",
        };

        const emailStyle = {
            position: "absolute",
            width: "429px",
            height: "52px",
            left: "162px",
            top: "437px",

            //background: "#FFFFFF",
        };

        const passwordStyle = {
            position: "absolute",
            width: "429px",
            height: "52px",
            left: "162px",
            top: "579px",

            //background: "#FFFFFF",
        };

        const confirmPasswordStyle = {
            position: "absolute",
            width: "429px",
            height: "52px",
            left: "162px",
            top: "763px",

            //background: "#FFFFFF",
        };

        const answerOneStyle = {
            position: "absolute",
            width: "636px",
            height: "52px",
            left: "1047px",
            top: "501px",

            //background: "#FFFFFF",
        };

        const answerTwoStyle = {
            position: "absolute",
            width: "636px",
            height: "52px",
            left: "1047px",
            top: "718px",

            //background: "#FFFFFF",
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

            //background: "#FFFFFF",
        };

        const accountTypeStyle = {
            position: "absolute",
            width: "131px",
            height: "27px",
            left: "162px",
            top: "872px",

            /*            fontFamily: "Grand",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "24px",
                        lineHeight: "27px",*/


            //color: #FFFFFF;
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

            /*            fontFamily: "Grand",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "24px",
                        lineHeight: "27px",*/

            //background: "#FFFFFF",
        };



        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            questionOneRef,
            questionTwoRef } = this.state;

        console.log("Question 1 value: ", questionOneRef.current?.state.question);
        console.log("Question 2 value: ", questionTwoRef.current?.state.question);

        return (
            <div>

                <form>
                    <Grid container>
                        <Grid item xs={6}>

                            <h1 style={titleStyle}>
                                Create Account
                            </h1>

                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                width = "100%"
                                value = {firstName}
                                onChange={e => this.change(e)}
                                style={firstNameStyle}
                            />
                            <br />

                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value = {lastName}
                                onChange={e => this.change(e)}
                                style={lastNameStyle}
                            />
                            <br />

                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value = {email}
                                onChange={e => this.change(e)}
                                style={emailStyle}
                            />
                            <br />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value = {password}
                                onChange={e => this.change(e)}
                                style={passwordStyle}
                            />
                            <br />

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value = {confirmPassword}
                                onChange={e => this.change(e)}
                                style={confirmPasswordStyle}
                            />
                            <br />

                            <p style={accountTypeStyle}>Account Type: </p>
                            <input type="checkbox" value="Student" style={studentCheckboxStyle}/><span style={studentTextStyle}>Student</span>
                            <input type="checkbox" value="Client" style={clientCheckboxStyle} /><span style={clientTextStyle}>Client</span>
                            <br />
                            <br />

                            <button style={createButtonStyle} onClick={e => this.onSubmit(e)}>Create</button>

                        </Grid>
                        <Grid item xs={6}>
                            <h3 style={securityQuestionTextStyle}>Security Questions:</h3>
                            <SecurityQuestion
                                num={1}
                                style_q={questionOneStyle}
                                style_a={answerOneStyle}
                                ref={questionOneRef}
                            />
                            <br />
                            <br />
                            <SecurityQuestion
                                num={2}
                                style_q={questionTwoStyle}
                                style_a={answerTwoStyle}
                                ref={questionTwoRef}
                            />
                            <br />
                        </Grid>

                    </Grid>
                </form>
            </div>

        );
    };
}


export default UserRegistrationPage;