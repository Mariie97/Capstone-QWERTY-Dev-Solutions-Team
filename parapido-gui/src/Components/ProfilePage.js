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
                 <div className = "parent-flex-container">
                    <div className="child1-flex-container"><ProfileCard /></div>
                    <div className = "child2-flex-container">
                        <ul className = "bullet-removal">
                        <li>
                            <ul className="body-flex">
                                <li className= "child-body-flex">Name: </li>
                                <li className="keeptext">Jane Doe </li>
                            </ul>
        
                        </li>

                        <li>
                            <ul className="body-flex">
                                <li  className= "child1-body-flex"> E-mail: </li>
                                <li className="keeptext"> jnedoe@stephanierocks.com </li>
                            </ul>
                        </li>
                        <li>
                            <ul className="body-flex">
                                <li className= "child2-body-flex"> Address: </li>
                                <li className="keeptext"> Street Steph Ponce 00680 </li>
                            </ul>
                        
                        </li>
                            <ul className="body-flex">
                                <li className= "child1-body-flex">About:</li>
                                <p className="keeptext" >I am a really hard working person and am interested in working cleaning different things like plates and stuff. 
                                </p>
                            </ul>
                      
                        </ul>
                    </div>
                 </div>
            </React.Fragment>
               
                
           
        )
    }
}

   


export default Profile

