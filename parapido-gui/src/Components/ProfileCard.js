import React from 'react'
import default_picture from '../Static/Images/defaultprofilepicture.svg'
import  '../Layouts/ProfileCard.css' 
import DeleteTwoTone from "@material-ui/icons/DeleteForeverTwoTone"


const ProfileCard = (props) => {

    // testing data

    const user_name = "Jane"
    const last_name = "Doe"
    const rating_value = "2.91"
    const cancelled_jobs = 120;

   

    return (
        <div className="body-profile">

        <div className = "card">

                <div className = "box-top">
                    <img className = "profile-image" style={image_resize_margin} src= {default_picture} alt="profile" />  
                </div>

                <ul className = "header-list"> 
                   <li> {user_name} {last_name} </li>
                   <li> Rating: { rating_value} of 5 </li>            
                </ul>
                
                <p> <DeleteTwoTone style={trashcan} /> Jobs Cancelled: {cancelled_jobs} </p> 

        </div>

        </div>

    
    )
}

// small elements css

const trashcan = {
    color: "red",
    position: "relative",
    top: 6,
}

const image_resize_margin = {
    height: 150, 
    width: 150, 
    marginTop: 0, 
    marginBottom: 5

}


export default ProfileCard

