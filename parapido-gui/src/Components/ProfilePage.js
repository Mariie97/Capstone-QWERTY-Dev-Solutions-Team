import React, { Component } from 'react'
import ProfileCard from './ProfileCard'
import "../Layouts/ProfilePage.css"


export class Profile extends Component {    

        constructor(props){
            super(props)


            this.state = { user : {
                first_name : 'Jane',
                last_name : 'Doe',
                email : 'jane.doe1000@upr.edu',
                about : ' I am the best!!!!',
                type  :' 1 ',
                image : ' ', 
                address: ' Urb.Stephanie calle Caoba Ponce, PR 00680',
                jobs_cancelled : ' 50 ',
                rating_value : ' 3.5 ',
            }
            }
    }
    
    componentDidMount(){

        // webpage background color

        document.body.style.backgroundColor = "#2F2D4A"

        // get from the server the specific user - 
        // hasn't been implemented by the Back-End

        
    }

    render() {

        const {first_name, last_name } = this.state.user;

        return (
            
            <React.Fragment>
                 <h1 className="profile-header">{first_name} {last_name} </h1>
                 <ProfileCard />
            </React.Fragment>
               
                
           
        )
    }
}



export default Profile

