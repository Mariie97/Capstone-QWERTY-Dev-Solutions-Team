import React, { Component } from 'react';
// import {Link, Redirect} from "react-router-dom";
import "../Layouts/AgreementModal.css"
// import Alert from '@material-ui/lab/Alert';
import StyledEngineProvider from '@material-ui/styles/StylesProvider';
import {Box, Modal} from "@material-ui/core";
import loginModalLogo from '../Static/Images/Pa_Rapido_logo_bgPalette.png';
// import continueArrow from '../Static/Images/continueArrow.png';
import virtualContract from '../Static/Images/Virtual_Contract.png';
import {accountType, current_user} from "../Utilities";

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
    constructor(props){
        super(props);
  
        this.state = {
          open: false,
          checked: false
        }
  
        this.toggleModal= this.toggleModal.bind(this);
        this.handleOnClick= this.handleOnClick.bind(this);
        this.isChecked = this.isChecked.bind(this);
      }
  
      toggleModal(){
        this.setState({
          open : !this.state.open
        })
      }

      isChecked(event){
        	console.log(event.target.checked)
            this.setState({
                checked: event.target.checked
              })
      }

      handleOnClick(){
          if(current_user.type === accountType.client){

          }
          else if(current_user.type === accountType.student){

          }
      }

    render() {
        const {open, checked} = this.state;

        console.log(checked, "inside render")

        return (
            <StyledEngineProvider injectFirst>
                
                    <div>
                        <div onClick={this.toggleModal}>Agreement Modal</div>
                        <Modal
                            open={open}
                            onClose={this.toggleModal}
                            style={{textAlign:"center"}}
                        >
                            <Box sx={style}>
                                <div className="logo-flex-Agreement">
                                    <img src={loginModalLogo} alt="login logo" style={login_logostyle}/>
                                </div>
                                <div className="first-point-agreement-modal">Virtual Contract Agreement:</div>
                              
                                <div className="body-container-agreement-modal">
                                    <p className="long-text-agreement-modal"> 
                                    <input type="checkbox" id="agree" onChange={this.isChecked.bind(this)} />
                                    Check to state that you have read and agree with the job information </p>
                                    <img style={virtual_contract_image_resize} src={virtualContract} alt="continue arrow" />

                                    <button id="agreement" name="agreement" onClick={this.handleOnClick} className="agreement-modal-continue-button" disabled={!checked}>
                                        <div className="text-button-login-modal">
                                            Agree & Continue
                                        </div>
                                        {/* <img style ={continue_arrow_image_resize} src={continueArrow} alt="continue arrow" /> */}
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

// const continue_arrow_image_resize = {
//     height: 80,
//     width: 100,
//     position: "fixed",
//     bottom: 25,
// };

const virtual_contract_image_resize = {
    height: 80,
    width: 75,
    marginBottom: "1vh"
};

export default AgreementModal;
