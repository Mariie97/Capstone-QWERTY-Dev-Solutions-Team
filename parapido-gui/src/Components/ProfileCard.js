import React, {Component} from 'react';
import '../Layouts/ProfileCard.css';
import defaultPicture from '../Static/Images/defaultprofilepicture.svg';
import school_bag from '../Static/Images/school_bag_transparentbg.png';
import _employer from '../Static/Images/employer.png';
import _admin from '../Static/Images/admin.png';
import DeleteTwoTone from "@material-ui/icons/DeleteForeverTwoTone";
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import StarIcon from '@material-ui/icons/Star';
import {Link} from "react-router-dom";
import {accountType} from "../Utilities";


class ProfileCard extends Component {

    acc_type = {
        1: "STUDENT",
        2: "CLIENT",
        3: "ADMIN"
    }

    render() {
        const { user_id, first_name, last_name, rating_value, jobs_cancelled, type, image} = this.props
        const profile_pic = image!==null ? image : defaultPicture;

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
                                    ' No rating yet ':
                                    `Rating: ${rating_value} of 5`
                                }
                                <ThumbsUpDownIcon style = {thumbsupdown}/>
                            </li>
                            <li>
                                {type!==undefined &&
                                <div className= "top-profile-card-lettering">
                                    {type === accountType.student ? <img src= {school_bag} alt="school bag" style={student}/>
                                        : type=== accountType.client ? <img src= {_employer} alt="client" style={client}/>
                                            :<img src= {_admin} alt="admin" style={admin}/>}
                                    {this.acc_type[type]}
                                </div>
                                }
                            </li>
                        </ul>
                        <p className="footer-line-profile-card">
                            <DeleteTwoTone style={trashcan} />
                            Jobs Cancelled: {jobs_cancelled}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

// small icons & elements css
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