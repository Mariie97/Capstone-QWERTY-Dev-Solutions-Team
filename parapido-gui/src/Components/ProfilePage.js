import React, { Component } from 'react'
import "../Layouts/ProfilePage.css"
import { Link } from 'react-router-dom';
import ProfileCard from './ProfileCard'

export class Profile extends Component {    

        constructor(props){
            super(props)


            this.state = { user : {
                first_name : '',
                last_name : '',
                email : '',
                about : '',
                type  :'',
                image : ' ', 
                address: '',
                jobs_cancelled : '',
                rating_value : '',
            }
            }
    }
    
    componentDidMount(){

        // webpage background color

        document.body.style.backgroundColor = "#2F2D4A"

        // get from the server the specific user - 
        // hasn't been implemented by the Back-End

                fetch('/user_info',{
                        method: 'GET',
                        credentials: 'same-origin',
                        headers: {'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
                         },
            
                        data: JSON.stringify({
                            user_id: localStorage.getItem('user_id')
                        })
                    }).then(response => {
                        if(response.status === 200) {
                            response.json().then(data =>
                                {
            
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
            
                                    // testing purposes
                                    // console.log(this.state);
                                }
                                ).catch((e) => {
                                    console.log(e);
                                    throw(e);
                                });
                            }
                    })
    }

    render() {

        const {first_name, last_name } = this.state.user;

        //TODO: object variable with cities 

        return (
            
            <React.Fragment>
                    <div className="button-profile-page-flex-container">
                        <Link to={"/jobdashboard"} className="button-profile-page" style={{margin: 20}}> My Jobs</Link>
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
                                    <li className="break-text-profile-page" style={{paddingTop: 1, paddingLeft: 14}}>Jane Doe </li>
                                </ul>
                            </li>

                            <li>
                                <ul className="body-flex-profile-page">
                                    <li  className= "child1-body-flex-profile-page"> E-mail: </li>
                                    <li className="break-text-profile-page" style={{paddingTop: 1, paddingLeft: 10}}> jnedoe@stephanierocks.com </li>
                                </ul>
                            </li>

                            <li>
                                <ul className="body-flex-profile-page">
                                    <li className= "child2-body-flex-profile-page" > Address: </li>
                                    <li className="break-text-profile-page" style={{paddingTop: 2}}> Street Steph Ponce 00680 </li>
                                </ul>
                            </li>

                            <ul className="body-flex-profile-page">
                                    <li className= "child1-body-flex-profile-page">About:</li>
                                    <p className="break-text-profile-page" style={{paddingLeft: 17 , paddingTop: 2.5}} >I am a really hard working person and am interested in working cleaninfffkf kkrkkfr rfrormrfrmfrf frjrofjrofrfrrojfrojfrfrofjfrfg different things like plates and stuff.</p>
                            </ul>
                        </ul>
                    </div>                    
                </div>
            </React.Fragment>       
        )
    }
}

export default Profile

