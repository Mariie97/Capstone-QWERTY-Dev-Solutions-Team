import React, { Component } from 'react';
// import {Link, Redirect} from "react-router-dom";
import "../Layouts/AgreementModal.css"
// import Alert from '@material-ui/lab/Alert';
import StyledEngineProvider from '@material-ui/styles/StylesProvider';
import {Box, Modal} from "@material-ui/core";
import loginModalLogo from '../Static/Images/Pa_Rapido_logo_bgPalette.png';
import continueArrow from '../Static/Images/continueArrow.png';

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
}

class AgreementModal extends Component {
    constructor(props){
        super(props);
  
        this.state = {
          open: false
        }
  
        this.toggleModal= this.toggleModal.bind(this);
  
      }
  
      toggleModal(){
        this.setState({
          open : !this.state.open
        })
      }

    render() {
        const {open} = this.state;


        return (
            <StyledEngineProvider injectFirst>
                
                    <div>
                        <div onClick={this.toggleModal}>Open modal</div>
                        <Modal
                            open={open}
                            onClose={this.toggleModal}
                            style={{textAlign:"center"}}
                        >
                            <Box sx={style}>
                                
                                <img src={loginModalLogo} alt="login logo" style={login_logostyle}/>
                                <div className="first-point-login-modal"> Hey! Good to see you again!</div>
                                <div className="second-point-login-modal">
                                    <div className="first-text-login-modal"> Log in to have</div>
                                    <div className="second-text-login-modal"> FUN.</div>
                                </div>
                                <div className="body-container-login-modal">
                                    <button onClick={this.handleOnClick} className="login-modal-continue-button">
                                        <div className="text-button-login-modal">
                                            CONTINUE
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
};

const continue_arrow_image_resize = {
    height: 80,
    width: 100,
    position: "fixed",
    bottom: 25,
};

export default AgreementModal;
