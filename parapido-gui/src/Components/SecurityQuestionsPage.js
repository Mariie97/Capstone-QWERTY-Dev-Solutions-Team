import React, {Component} from 'react';
import {
    Alert,
    Backdrop,
    Button, Fade, FilledInput,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid, InputLabel, Modal, OutlinedInput,
    Radio,
    RadioGroup, Stack
} from "@material-ui/core";
import {TextField} from "@material-ui/core";

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
            emailError: '',
            answerOneError: '',
            answerTwoError: '',
        };

        if(this.state.answerOne == ""){
            isError = true;
            errors.answerOneError = "Please submit a response";
        }

/*        if(this.state.answerOne == ""){
            isError = true;
            errors.answerOneError = "Answers do not match";
        }*/

        if(this.state.answerTwo == ""){
            isError = true;
            errors.answerTwoError = "Please submit a response";
        }

/*        if(this.state.answerTwo == ""){
            isError = true;
            errors.answerTwoError = "Answers do not match";
        }*/

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
            fetchError: false,
        };

        if (typeof this.state.email !== "undefined") {
            const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.email)) {
                isError = true;
                errors.emailError = "Please enter valid email address.";
            }

        }

        /*        if(!emailExists){
            isError=true;
            errors.emailError = "Email is not associated with an account"
        }*/

        fetch('/edit_user',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                password: this.state.password
            })
        }).then(response => {
            if(response.status === 200) {
                //Success
            }
            else {
                isError = true;
                errors.fetchError = true
            }
        })

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

        if (this.state.password !== this.state.confirmPassword) {
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
        //this.props.onSubmit(this.state)

        const err = this.validate()


        if(!err) {
            //clear
            //this.state.questionOneRef.clear;
            //this.state.questionTwoRef.clear;
            this.setState({open: true})
            this.setState({correctAnswers: true})

/*
            this.setState({
                email: '',
                emailError: '',
                questionOne: '',
                questionTwo: '',
                answerOne: '',
                answerOneError: '',
                answerTwo: '',
                answerTwoError: '',
                emailIsValid: false,
            })*/
            this.props.onChange({
                email: undefined,
                questionOne: undefined,
                questionTwo: undefined,
                answerOne: undefined,
                answerTwo: undefined,
                emailIsValid: undefined,
            })
        }
    };

    onSubmitEmail = (e) => {
        //Here we make sure the email is valid and exists. Also fetch the questions and answers
        e.preventDefault();//this.props.onSubmit(this.state)
        const err = this.validateEmail()

        if (!err) {

                this.state.emailIsValid = true;

                this.setState({
                    emailError: '',
                    questionOne: "Question 1 placeholder",
                    questionTwo: "Question placeholder",
                    answerOne: "",
                    answerOneError: '',
                    answerTwo: "",
                    answerTwoError: '',
                    emailIsValid: true,
                })


        }



    };

    onSubmitPassword = (e) => {
        //Here we make sure the email is valid and exists. Also fetch the questions and answers
        e.preventDefault();//this.props.onSubmit(this.state)
        const err = this.validatePassword()

        if (!err) {

            //redirect
            //success message
            this.setState({changeSuccess: true})

/*            this.setState({
                password: '',
                confirmPassword: '',
            })*/


        }



    };



    render(){

        let renderQuestionOne;
        let renderQuestionTwo;
        let button;

        const {
            email,
            answerOne,
            answerTwo,
            open,
            password,
            confirmPassword,
            changeSuccess,
            fetchError,
        } = this.state;


        const titleStyle = {
            position: "absolute",
            width: "800px",
            height: "120px",
            left: "550px",
            top: "124px",

            fontFamily: "Future BdCn BT",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "80px",
            lineHeight: "120px",


            color: "#FFFFFF",

            opacity: "0.62",
        };

        const emailStyle = {
            position: "absolute",
            width: "636px",
            left: "643px",
            top: "469px",
            //backgroundColor: "#FFFFFF",

            background: "#FFFFFF",
        };

        const answerOneStyle = {
            position: "absolute",
            width: "636px",
            left: "643px",
            top: "607px",

            background: "#FFFFFF",
        };

        const answerTwoStyle = {
            position: "absolute",
            width: "636px",
            left: "643px",
            top: "744px",

            background: "#FFFFFF",
        };

        const createButtonStyle = {
            position: "absolute",
            width: "190px",
            height: "80px",
            left: "860px",
            top: "900px",

            //background: "#FFFFFF",
        };

        const securityQuestionTextStyle = {
            position: "absolute",
            left: "643px",
            top: "327px",
            width: "500px",

            fontFamily: "Grand",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "30px",
            lineHeight: "27px",

            color: "#FFFFFF",
        };

        const outerGridStyle= {
            top: "-80px",
            position: "absolute"

        }

        const modalStyle = {
            left: "643px",
            top: "200px",
            width: "1000px",
            height: "1000px",
            position: "absolute",
            backgroundColor: "#2F2D4A",

        }

        const modalButtonStyle = {
            top: "327px",
            left: "600px",
            position: "absolute"

        }

        const confirmPasswordStyle = {
            position: "absolute",
            width: "400px",
            top: "300px",
            left: "100px",
            //backgroundColor: "#FFFFFF",

            background: "#FFFFFF",
        };

        const passwordStyle = {
            position: "absolute",
            width: "400px",
            top: "200px",
            left: "100px",
            //backgroundColor: "#FFFFFF",

            background: "#FFFFFF",
        };

        const changePasswordStyle = {
            position: "absolute",
            width: "190px",
            height: "80px",
            top: "400px",
            left: "200px",

            //background: "#FFFFFF",
        };

        if(this.state.emailIsValid){

            renderQuestionOne = <TextField
                required
                disabled = {this.state.correctAnswers}
                error = {this.state.answerOneError}
                variant="filled"
                label={this.state.questionOne}
                helperText={this.state.answerOneError}
                type="text"
                name="answerOne"
                placeholder="Answer"
                onChange={e => this.change(e)}
                style={answerOneStyle}
            />;

            renderQuestionTwo = <TextField
                required
                disabled = {this.state.correctAnswers}
                error = {this.state.answerTwoError}
                variant="filled"
                label={this.state.questionTwo}
                helperText={this.state.answerTwoError}
                type="text"
                name="answerTwo"
                placeholder="Answer"
                onChange={e => this.change(e)}
                style={answerTwoStyle}
            />;

        }

        if(!this.state.emailIsValid){
            button = <Button variant="contained" style={createButtonStyle} onClick={e => this.onSubmitEmail(e)}>Verify Email</Button>
        }
        else  button = <Button variant="contained" style={createButtonStyle} onClick={e => this.onSubmit(e)}>Submit</Button>

        const body = (
            <div >
                <form>
                    <TextField
                        required
                        error = {this.state.passwordError}
                        variant="filled"
                        label="Password"
                        type="password"
                        name="password"
                        defaultValue=""
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
                        defaultValue=""
                        value = {confirmPassword}
                        onChange={e => this.change(e)}
                        helperText={this.state.confirmPasswordError}
                        style={confirmPasswordStyle}
                    />
                    <Button variant="contained" style={changePasswordStyle} onClick={e => this.onSubmitPassword(e)}>Change Password</Button>
                </form>
            </div>
        );



        return (
            <div>

                {fetchError &&

                <Stack sx={{width: '100%'}} spacing={2}>
                    <Alert severity="error" style={errorStyle}>DB Error Try Again</Alert>
                </Stack>

                }

                {changeSuccess &&

                <Stack sx={{width: '100%'}} spacing={2}>
                    <Alert severity="success" style={errorStyle}>This is a success alert — check it out!</Alert>
                </Stack>

                }
{/*
                {changeSuccess && add redirect}
*/}

                <form>
                    <div style={outerGridStyle}>


                        <h1 style={titleStyle}>
                            Account Recovery
                        </h1>



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
                            helperText={this.state.emailError}
                            style={emailStyle}
                        />

                        {renderQuestionOne}
                        {renderQuestionTwo}


                        {button}



                        <h3 style={securityQuestionTextStyle}>Security Questions:</h3>

                        <div>
                            <Modal
                                open={open}
                                onClose={this.handleClose}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                style={modalStyle}
                            >
                                {body}
                            </Modal>
                        </div>


                    </div>
                </form>
            </div>

        );
    };
}


export default SecurityQuestionsPage;