import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import {accountType} from "../Utilities";
import StyledEngineProvider from "@material-ui/styles/StylesProvider";
import {Box, Modal} from "@material-ui/core";
import Logo from "../Static/Images/BackgroundPaRapidoLogo.png";
import ContinueArrow from "../Static/Images/ContinueArrow.png";
import VirtualContract from "../Static/Images/VirtualContract.png";

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
    padding: '9px',
    borderRadius: '1vh',
    paddingBottom: '2vh'
}

class AgreementModal extends Component {
    currentUser = {
        id: parseInt(localStorage.getItem('user_id')),
        type: parseInt(localStorage.getItem('type'))
    };

    constructor(props){
        super(props);

        this.state = {
            checked: false,
            isclient: false,
            isstudent: false,
            studentIsChoosen: false,
            alertMssg: undefined,
            severity: undefined
        }
        this.handleOnClick= this.handleOnClick.bind(this);
        this.isChecked = this.isChecked.bind(this);
    }

    handleOnClick(){
        const {job_id, student_id, cookies} = this.props;

        if(this.currentUser.type === accountType.client){
            fetch('/assign_job',{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': cookies
                    },
                    body: JSON.stringify({
                        job_id: job_id,
                        student_id: student_id
                    })
                }
            ).then(response => {
                if(response.status === 200) {
                    this.setState({
                        isclient: true,
                        alertMssg: "The job has been successfully added to the In-progress status!!! 👍🏼",
                        severity: "info"
                    })
                }
                else{
                    this.setState({
                        isclient: true,
                        alertMssg: "Sorry can't process right now 😔 please try again later!!!",
                        severity: "error"
                    })
                }
            })
        }
        else if(this.currentUser.type === accountType.student){
            fetch('/request_job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': cookies
                },
                body: JSON.stringify({
                    job_id: job_id,
                    student_id: this.currentUser.id,
                })
            }).then(response => {
                if (response.status === 200) {
                    this.setState({
                        isstudent: true,
                        alertMssg: "The job has been requested succesfully!!! 👍🏼",
                        severity: "success"
                    })
                }
                else {
                    this.setState({
                        isstudent: true,
                        alertMssg: "Sorry can't request job right now 😔 please try again later!!!",
                        severity: "error"
                    })
                }
            })
        }
    }

    isChecked(event){
        this.setState({
            checked: event.target.checked
        })
    }

    render() {
        const {checked, isclient, isstudent, alertMssg, severity} = this.state;
        const {isOpen, toggle} = this.props;

        return (
            <StyledEngineProvider injectFirst>
                <div>
                    <Modal
                        open={isOpen}
                        onClose={toggle}
                        style={{textAlign:"center"}}
                    >
                        <Box sx={style}>
                            <div className="logo-flex-Agreement">
                                <img src={Logo} alt="login logo" style={loginlogo}/>
                            </div>
                            <div className="first-point-agreement-modal">Virtual Contract Agreement:</div>
                            <div className="body-container-agreement-modal">
                                <p className="long-text-agreement-modal">
                                    <label class="checkbox">
                                        <input type="checkbox" id="checkbox-small-size" style={{marginRight: "1vh"}} onChange={this.isChecked.bind(this)} />
                                    </label>
                                    Check to state that you have read and agree with the job information
                                </p>
                                <img style={virtualcontract} src={VirtualContract} alt="continue arrow" />
                                {isstudent && <Redirect to={{
                                    pathname: `/myjobs/${this.currentUser.id}`,
                                    state: { alertMssg: alertMssg, severity: severity }
                                }}/>}
                                {isclient && <Redirect to={{
                                    pathname: `/myjobs/${this.currentUser.id}`,
                                    state: { alertMssg: alertMssg, severity: severity}
                                }}/>}
                                <button id="agreement" name="agreement" onClick={this.handleOnClick} className="agreement-modal-continue-button" disabled={!checked}>
                                    <div className="text-button-agreement-modal">
                                        Agree & Continue
                                    </div>
                                    <img style ={continuearrow} src={ContinueArrow} alt="continue arrow" />
                                </button>
                            </div>
                            <hr className="line-login-modal" />
                        </Box>
                    </Modal>
                </div>
            </StyledEngineProvider>
        );
    }
}

const loginlogo = {
    width: 80,
    height: 80,
    float: "right",
};

const continuearrow = {
    height: "80px",
    width: "100px",
    position: "fixed",
    bottom: "-1.3vh",
};

const virtualcontract = {
    height: 80,
    width: 75,
    marginBottom: "1vh"
};

export default AgreementModal;
