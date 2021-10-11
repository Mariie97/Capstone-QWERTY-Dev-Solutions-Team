import React, {Component} from 'react'
import defaultPicture from '../Static/Images/defaultprofilepicture.svg'
import school_bag from '../Static/Images/school_bag_transparentbg.png'
import _employer from '../Static/Images/employer.png'
import _admin from '../Static/Images/admin.png'
import  '../Layouts/ProfileCard.css' 
import DeleteTwoTone from "@material-ui/icons/DeleteForeverTwoTone"
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import StarIcon from '@material-ui/icons/Star';


class ProfileCard extends Component {

    // constructor(props){
    //     super(props);

    // }

    
    acc_type ={
        1: "STUDENT",
        2: "CLIENT",
        3: "ADMIN"
    }
    render() {

        const {first_name,last_name,rating_value,jobs_cancelled,type} = this.props.user


        return (
            

            <React.Fragment>
    
            <div className= "top-card-lettering"> 
            {type === 1 ? <img src= {school_bag} alt="school bag" style={schoolbag}/> : type === 2 ? <img src= {_employer} alt="employer" style={employer}/> 
            :<img src= {_admin} alt="admin" style={admin}/>}
            
            {this.acc_type[type]}  </div>
            <div className="body-profile">
            <div className = "card">
    
                    <div className = "box-top">
                        <img className = "profile-image" style={image_resize} src= {defaultPicture} alt="profile" />  
                    </div>
    
                    <ul className = "header-list"> 
                       <li style= {{fontWeight : "bold"}}> {first_name} {last_name} </li>
                       <li> <StarIcon style = {star}/> Rating: { rating_value} of 5 <ThumbsUpDownIcon style = {thumbsupdown}/></li>            
                    </ul>
                    
                    {/* footer */}
           
                   
                    <p className="footer-line"> <DeleteTwoTone style={trashcan} /> Jobs Cancelled: {jobs_cancelled} </p> 
               
        
            </div>
    
            </div>
    
            </React.Fragment>
        )
    }
}

export default ProfileCard

// const ProfileCard = (props) => {

//     // testing data

//     const user_name = props.first_name;
//     const last_name = "Doe"
//     const rating_value = "2.91"
//     const cancelled_jobs = 10;
//     const account_type = 3;

//     let acc_type;
  

//     if(account_type === 1 ){
//         acc_type = "STUDENT";
      
//     }
//     else if(account_type === 2){
//         acc_type = "CLIENT"
       
//     }
//     else{
//         acc_type = "ADMIN"
//     }

   

//     return (
     
//         <React.Fragment>

//         <div className= "top-card-lettering"> 
//         {account_type === 1 ? <img src= {school_bag} alt="school bag" style={schoolbag}/> : account_type === 2 ? <img src= {_employer} alt="employer" style={employer}/> 
//         :<img src= {_admin} alt="admin" style={admin}/>}
        
//         {acc_type}  </div>
//         <div className="body-profile">
//         <div className = "card">

//                 <div className = "box-top">
//                     <img className = "profile-image" style={image_resize} src= {defaultPicture} alt="profile" />  
//                 </div>

//                 <ul className = "header-list"> 
//                    <li style= {{fontWeight : "bold"}}> {user_name} {last_name} </li>
//                    <li> <StarIcon style = {star}/> Rating: { rating_value} of 5 <ThumbsUpDownIcon style = {thumbsupdown}/></li>            
//                 </ul>
                
//                 {/* footer */}
       
               
//                 <p className="footer-line"> <DeleteTwoTone style={trashcan} /> Jobs Cancelled: {cancelled_jobs} </p> 
           
    
//         </div>

//         </div>

//         </React.Fragment>
//     )
// }

// small icons & elements css

const trashcan = {
    color: "red",
    position: "relative",
    top: 7,
}

const thumbsupdown = {
    color: "burlywood",
    position: "relative",
    width: 15,
    top: 6,
    left:2
}

const star = {
    color: "yellow",
    position: "relative",
    width: 19,
    top: 6,
    left:2
}

const image_resize = {
    height: 180, 
    width: 180,
}

const schoolbag = {
    height: 70, 
    width: 60,
}

const employer = {
    height: 70, 
    width: 70,
    backgroundColor: "white"
}

const admin = {
    height: 70, 
    width: 70,
    // backgroundColor: "white"
}



