import React, {Component} from "react";
import {Link} from "react-router-dom";
import {accountType, mapAccount} from "../Utilities";
import DefaultProfilePicture from "../Static/Images/DefaultProfilePicture.svg";
import SchoolBag from "../Static/Images/SchoolBag.png";
import Employer from "../Static/Images/Employer.png";
import Admin from "../Static/Images/Admin.png";
import DeleteTwoTone from "@material-ui/icons/DeleteForeverTwoTone";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";
import StarIcon from "@material-ui/icons/Star";

class ProfileCard extends Component {
    render() {
        const { user_id, first_name, last_name, rating_value, jobs_cancelled, type, image} = this.props
        const profile_pic = image!==null ? image : DefaultProfilePicture;

        return (
            <div className='profile-card-container'>
                <div className="body-profile-card">
                    <div className = "profile-card">
                        <div className = "box-top-profile-card">
                            <Link to={`/profile/${user_id}`}>
                                <img className = "profile-card-image" style={image_resize} src= {profile_pic} alt="profile" />
                            </Link>
                        </div>
                        <ul className = "header-list-profile-card">
                            <li style= {{fontWeight : "bold"}}> {first_name} {last_name} </li>
                            <li>
                                <StarIcon style = {star}/>
                                {rating_value===null ?
                                    'No rating yet ':
                                    `Rating: ${rating_value} of 5`
                                }
                                <ThumbsUpDownIcon style = {thumbsupdown}/>
                            </li>
                            {type!==undefined &&
                            <div className= "top-profile-card-lettering">
                                {type === accountType.student ? <img src= {SchoolBag} alt="school bag" style={student}/>
                                    : type=== accountType.client ? <img src= {Employer} alt="client" style={client}/>
                                        :<img src= {Admin} alt="admin" style={admin}/>}
                                <p>{mapAccount[type]}</p>
                            </div>
                            }
                        </ul>
                        <div className="footer-line-profile-card">
                            <DeleteTwoTone style={trashcan} />
                            Jobs Cancelled: {jobs_cancelled}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const trashcan = {
    color: "red",
    position: "relative",
    top: 7,
};

const thumbsupdown = {
    color: "burlywood",
    position: "relative",
    width: 15,
    top: 6,
    left:2
};

const star = {
    color: "yellow",
    position: "relative",
    width: 19,
    top: 6,
    left:2
};

const image_resize = {
    height: 180,
    width: 180,
};

const student = {
    height: 50,
    width: 50,
};

const client = {
    height:  50,
    width: 50,
    backgroundColor: "white"
};

const admin = {
    height: 50,
    width: 50,
};

export default ProfileCard;