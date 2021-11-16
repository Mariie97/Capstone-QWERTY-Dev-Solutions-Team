import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import StyledEngineProvider from '@material-ui/styles/StylesProvider';
import {Box, Modal} from "@material-ui/core";
import loginModalLogo from "../Static/Images/Pa_Rapido_logo_bgPalette.png";
import continueArrow from "../Static/Images/continueArrow.png";
import virtualContract from "../Static/Images/Virtual_Contract.png";
import {accountType} from "../Utilities";

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
    borderRadius: "1vh",
    paddingBottom: "2vh"
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
  
      isChecked(event){
            this.setState({
                checked: event.target.checked
              })
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
                alert('Failed' + response.status);
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
                       console.log("TODO: Error alert")
                    }
                })       
          }
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
                                    <img src={loginModalLogo} alt="login logo" style={login_logostyle}/>
                                </div>
                                <div className="first-point-agreement-modal">Virtual Contract Agreement:</div>      
                                <div className="body-container-agreement-modal">
                                    <p className="long-text-agreement-modal"> 
                                    <label class="checkbox">
                                    <input type="checkbox" id="agree" onChange={this.isChecked.bind(this)} />
                                    </label>
                                    Check to state that you have read and agree with the job information </p>
                                    <img style={virtual_contract_image_resize} src={virtualContract} alt="continue arrow" />
                                    {isstudent && <Redirect to={{
                                        pathname: '/myjobs',
                                        state: { alertMssg: alertMssg, severity: severity }
                                    }}/>}
                                     {isclient && <Redirect to={{
                                        pathname: '/myjobs',
                                        state: { alertMssg: alertMssg, severity: severity}
                                    }}/>}
                                    <button id="agreement" name="agreement" onClick={this.handleOnClick} className="agreement-modal-continue-button" disabled={!checked}>
                                        <div className="text-button-agreement-modal">
                                            Agree & Continue
                                        </div>
                                        <img style ={continue_arrow_image_resize} src={continueArrow} alt="continue arrow" />
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

// small icons and elements css

const login_logostyle = {
    width: 80,
    height: 80,
    float: "right",
};

const continue_arrow_image_resize = {
    height: "80px",
    width: "100px",
    position: "fixed",
    bottom: "-1.3vh",
};

const virtual_contract_image_resize = {
    height: 80,
    width: 75,
    marginBottom: "1vh"
};

export default AgreementModal;
