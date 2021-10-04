import React, { Component } from 'react'
import { Link } from "react-router-dom"
import logo from "../Static/Images/Pa_RapidoLogo.png"
import "../Layouts/NavBar.css"

export class NavBar extends Component {
    render() {
        return (
            <nav className="NavBar"> 
                <div className="nav">
                <img className="logostyle" src={logo} alt="Logo" />

                <ul className="nav-links"> 
                <li>
                <Link to="/">Home</Link>
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
                </div>
                
            </nav>
        )
    }
}



export default NavBar;
