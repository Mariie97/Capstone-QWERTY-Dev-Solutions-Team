
import React, {Component} from "react";
import { Link, Redirect} from "react-router-dom";
import "../Layouts/LoginModal.css"
import StyledEngineProvider from '@material-ui/styles/StylesProvider';
import { Box } from "@material-ui/core";
import { Modal } from '@material-ui/core';
import loginModalLogo from '../Static/Images/Pa_Rapido_logo_bgPalette.png';
import continueArrow from '../Static/Images/continueArrow.png'

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

export class LoginModal extends Component {
    
    constructor(props){
       super(props)

       this.state = {
         email : '',
         password: '',
         login_success: false
       }

       this.handleChange = this.handleChange.bind(this);
       this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
      const {email, password} = this.state;

      fetch('/login',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              email: email,
              password: password
              
          })
      }).then(response => {
          if(response.status === 200) {
              localStorage.setItem('is_auth', 'true');
              response.json().then(data => {
                  localStorage.setItem('user_id', data.user_id);
                  localStorage.setItem('type', data.type);
                  this.setState({login_success: true});
              })}         
      })
  }

    handleChange(event){
        const {name, value} = event.target
        console.log(name)
        console.log(value)
        this.setState({[name]:value})
    }

    render() {

      const {isOpen, toggle} = this.props;
      const { login_success } = this.state;

      return (
        <StyledEngineProvider injectFirst>
        {login_success ? <Redirect to='/jobdashboard'/> :
        <div>
          <Modal
            open={isOpen}
            onClose={toggle}
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
                <label className="third-point-login-modal"> Enter E-mail: </label>
                <input className="input-login-modal" type="text" id="email" name="email" placeholder="Email" onChange={this.handleChange}></input>
                <label className="third-point-login-modal"> Enter Password: </label>
                <input className="input-login-modal" type="text" id="password" name="password" placeholder="Password" onChange={this.handleChange}></input>
                <button onClick={this.handleOnClick} className="login-modal-continue-button"> 
                <div className="text-button-login-modal">
                  CONTINUE    
                </div>
                </button>
                </div>
               
                <img style ={continue_arrow_image_resize} src={continueArrow} alt="continue arrow" />
                <hr className="line-login-modal"></hr>
                <ul className="footer-flex-login-modal">
                <Link to={"/signup"} id="visited-login-modal"> Create an Account? </Link>
                <Link to={"#"} className="visited-login-modal" id="visited-login-modal"> Forgot Password? </Link>
                </ul>
            </Box>
          </Modal>
        </div>
    }
        </StyledEngineProvider>
      );
    }
}


 // small icons and elements css

 const login_logostyle = {
	width: 80,
	height: 80,
  
}

const continue_arrow_image_resize = {
  height: 80, 
  width: 100,
  position: "inherit",
  bottom: 25,
  left: 300,
}

export default LoginModal;



 