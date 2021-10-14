import React, {Component} from 'react'
import {Link, Redirect} from "react-router-dom"
import logo from "../Static/Images/Pa_RapidoLogo.png"
import "../Layouts/NavBar.css"
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import CancelIcon from '@material-ui/icons/Cancel';

export class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logout_success: false,
            menu_open: false
        };

        this.handleLogOut = this.handleLogOut.bind(this);
    }

    //method to handle logging out
    handleLogOut() {
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
                response.json().then(data => {
                    localStorage.removeItem('user_id');
                    localStorage.removeItem('type');
                    this.setState({logout_success: true});
                })}
        })
    }

    // method to slide small nav bar from menu icon in website
    navSlide = () =>{
        const nav = document.querySelector('.nav-links')

        // toggle menu button
        nav.classList.toggle('nav-active');
        const navLinks = document.querySelectorAll(".nav-links li")
        this.setState({menu_open: !this.state.menu_open})

        // animate links
        navLinks.forEach((link, index) =>{
            if(link.style.animation){
                link.style.animation = ``
            }
            else{
                link.style.animation = `navLinksFade 0.4s ease forwards ${index/5}s`
            }
        })
    }

    render() {
        const { logout_success } = this.state;
        const { menu_open } = this.state;
        return (
            <nav  >
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
                            <div>
                                {logout_success && <Redirect to='/'/>}
                                <div onClick = {this.handleLogOut} id="logout"> Log Out </div>
                            </div>
                        </li>
                    </ul>
                    <div className="menuopen" onClick={this.navSlide}>
                        {menu_open && <CancelIcon />}
                        {!menu_open && <MenuOpenIcon/>}
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar