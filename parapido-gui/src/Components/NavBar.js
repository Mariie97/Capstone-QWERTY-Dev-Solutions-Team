import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {accountType} from "../Utilities";
import Logo from "../Static/Images/PaRapidoLogo.png";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import CancelIcon from "@material-ui/icons/Cancel";

class NavBar extends Component {
    currentUser = {
        id: parseInt(localStorage.getItem('user_id')),
        type: parseInt(localStorage.getItem('type'))
    };

    constructor(props) {
        super(props);
        this.state = {
            logout_success: false,
            menu_open: false,
        };

        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut() {
        fetch('/logout', {
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
        const nav = document.querySelector('.nav-links');

        // toggle menu button
        nav.classList.toggle('nav-active');
        const navLinks = document.querySelectorAll(".nav-links li");
        this.setState({menu_open: !this.state.menu_open});

        // animate links
        navLinks.forEach((link, index) =>{
            if(link.style.animation){
                link.style.animation = ``
            }
            else{
                link.style.animation = `navLinksFade 0.4s ease forwards ${index/5}s`
            }
        });
    }

    render() {
        const { logout_success, menu_open } = this.state;
        const isAuth  = this.props.cookies.get('csrf_access_token') !== undefined;

        return (
            <nav>
                {logout_success && <Redirect to='/'/>}
                <div className="nav">
                    <Link to={'/jobdashboard'}>
                        <img className="logostyle" src={Logo} alt="Logo" />
                    </Link>
                    {isAuth &&
                    <React.Fragment>
                        <ul className="nav-links">
                            <li>
                                <Link to="/jobdashboard">Job Dashboard</Link>
                            </li>
                            <li>
                                <Link to={"/profile/" + this.currentUser.id}>Profile</Link>
                            </li>
                            {this.currentUser.type === accountType.admin ?
                                <li>
                                    <Link to={"/admin/site"}>Administration</Link>
                                </li>:
                                <li>
                                    <Link to={`/myjobs/${this.currentUser.id}`}>My Jobs</Link>
                                </li>
                            }
                            <li>
                                <div>
                                    <div onClick = {this.handleLogOut} id="logout"> Log Out </div>
                                </div>
                            </li>
                        </ul>
                    </React.Fragment>
                    }
                    <div className="menu-open" onClick={this.navSlide}>
                        {menu_open ? <CancelIcon /> : <MenuOpenIcon/>}
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar;