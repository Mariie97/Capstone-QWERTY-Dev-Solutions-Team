import React, { Component } from 'react'
import { Link } from "react-router-dom"
import logo from "../Static/Images/Pa_RapidoLogo.png"

export class NavBar extends Component {
    render() {
        return (
            <nav > 
                <img style={logoStyle} src={logo} alt="Logo" />
                <ul style={{listStyleType: "none"}}> 
                <li>
                <Link to="/">Main</Link>
                </li>           
                <li>
                <Link to="/jobdashboard">Job Dashboard</Link>
                </li>
                <li>
                <Link to="/profile">Profile</Link>
                </li>
                <li>
                <Link to="/"> Sign Out </Link>
                </li>
                </ul>
            </nav>
        )
    }
}

const logoStyle = {
    background: "black", 
    width: 60,
    height: 60, 
    left: 7,
    top: 5,
    position: "absolute"
}


export default NavBar;
