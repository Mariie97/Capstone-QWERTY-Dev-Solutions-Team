import React, { Component, Redirect } from 'react'
import {Link} from "react-router-dom"
import logo from "../Static/Images/Pa_RapidoLogo.png"
import "../Layouts/NavBar.css"


export class NavBar extends Component {
    
    constructor(props) {
        super(props);
     
        this.state = {
            signout_success: false,
            
        };

        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut() {
        
        fetch(
            '/logout',
            {
                method: 'POST',
                credentials: 'same-origin',
                headers:{
                    
                    'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
                }
          
            }
        ).then(response => {
            if(response.ok) {
                localStorage.setItem('is_auth', 'false');
                response.json().then(data => {
                    localStorage.removeItem('user_id');
                    localStorage.removeItem('type');
                    this.setState({signout_success:true});

                })}
        })
    }
    

    render() {
        const { signout_success } = this.state;

        return (
            <nav className="NavBar"> 
                <div className="nav">
                <img className="logostyle" src={logo} alt="Logo" />

                <ul className="nav-links"> 
                   
                <li>
                <Link to="/jobdashboard">Job Dashboard</Link>
                </li>
                <li>
                <Link to="/profile">Profile</Link>
                </li>
                <li>
                <div className="NavBar">
                {signout_success && <Redirect to='/'/>}   
                <div onClick = {this.handleSignOut} id="signout"> Sign Out </div>
                </div>
                </li>
                </ul>
                </div>
                
            </nav>
        )
    }
}



export default NavBar;