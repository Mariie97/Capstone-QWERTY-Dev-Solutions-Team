import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import "../Layouts/ProfilePage.css";
import verifyUserAuth, {cities} from "../Utilities";
import ProfileCard from './ProfileCard';



class ProfilePage extends Component {

    constructor(props){
        super(props)
        this.state = { user : {
                first_name : '',
                last_name : '',
                email : '',
                about : '',
                type  :'',
                image : ' ',
                jobs_cancelled : '',
                street: '',
                city: '',
                zipcode: '',
                rating_value : '',
            },
            is_auth: true,
        }
    }

    componentDidMount(){
        this.setState({
            is_auth: verifyUserAuth(this.props.cookies.get('csrf_access_token'))
        });
        // webpage background color
        document.body.style.backgroundColor = "#2F2D4A"

        fetch('/user_info/' + localStorage.getItem('user_id'),{
            method: 'GET',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
            }
        }).then(response => {
            if(response.status === 200) {
                response.json().then(data => {
                        this.setState({ user: {
                                first_name: data.first_name,
                                last_name : data.last_name,
                                email : data.email,
                                image : data.image,
                                type  : data.type,
                                about : data.about,
                                jobs_cancelled : data.cancellations,
                                street: data.street,
                                city: data.city,
                                zipcode: data.zipcode,
                                rating_value : data.rate,
                            }
                        });
                    }
                ).catch((e) => {
                    console.log(e);
                    throw(e);
                });
            }
        })
    }

    render() {
        const {first_name, last_name, email, about , street, city, zipcode} = this.state.user;
        const {is_auth} = this.state;

        return (
            <React.Fragment>
                {!is_auth && <Redirect to='/' />}
                <div className="button-profile-page-flex-container">
                    <Link to={"/jobdashboard"} className="button-profile-page" style={{margin: 20}}> My Jobs </Link>
                    <Link to={"/editprofile"} className="button-profile-page" style={{marginRight: 70}}> Edit Profile </Link>
                </div>
                <h1 className="profile-page-header">{first_name} {last_name} </h1>
                <div className = "parent-flex-container-profile-page">
                    <div className="child1-flex-container-profile-page"><ProfileCard user={this.state.user} /></div>
                    <div className = "child2-flex-container-profile-page" style={{width: 800, marginLeft: 114}}>
                        <ul className = "bullet-removal-profile-page">
                            <li>
                                <ul className="body-flex-profile-page">
                                    <li className= "child-body-flex-profile-page">Name: </li>
                                    <li className="break-text-profile-page" style={{paddingTop: 1, paddingLeft: 14}}> {first_name} {last_name} </li>
                                </ul>
                            </li>
                            <li>
                                <ul className="body-flex-profile-page">
                                    <li  className= "child1-body-flex-profile-page"> Email: </li>
                                    <li className="break-text-profile-page" style={{paddingTop: 1, paddingLeft: 19}}> {email} </li>
                                </ul>
                            </li>
                            <li>
                                <ul className="body-flex-profile-page">
                                    <li className= "child2-body-flex-profile-page" > Address: </li>
                                    <li className="break-text-profile-page" style={{paddingTop: 2}}> {street} {cities[city]} PR, {zipcode} </li>
                                </ul>
                            </li>
                            <ul className="body-flex-profile-page">
                                <li className= "child1-body-flex-profile-page">About:</li>
                                <p className="break-text-profile-page" style={{paddingLeft: 17 , paddingTop: 2.5}} > {about} </p>
                            </ul>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProfilePage;

