import React from "react";
import {Link} from "react-router-dom";
import {blue, red} from "@material-ui/core/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {Box, Chip, IconButton} from "@material-ui/core";
import {accountType} from "../Utilities";

const box = {
    overflow:'none',
    display: 'flex',
    alignItems: 'center',
    alignContent:'center',
    flexWrap: 'wrap',
    height: "6vh",
    backgroundColor: '#2F2D4A',
    borderRadius: 20,
    border: 2,
    borderColor: 'black',
    '&:hover': {
        backgroundColor: '#2F2D8F',
        opacity: [0.9, 0.8, 0.7],
    },
    justifyContent:'space-evenly',
    gap:'2vh',
    marginLeft: '52px',
    width:'80vh',
    fontFamily: 'Jost',
    fontSize: '14px'
}

const listing = (props) => {
    const { job_id, title, price, category, date_posted, status, onClickRate, deleteListing, owner_id, student_id } = props
    const allowRate = status === '2' && (owner_id == localStorage.getItem('user_id') ||
        student_id == localStorage.getItem('user_id'));
    const allowDelete = (status === '1' || props.status === '2') && (owner_id == localStorage.getItem('user_id') ||
        student_id == localStorage.getItem('user_id') || localStorage.getItem('type')==accountType.admin)
    return(
                <Box
                    border = {2}
                    borderColor = "black"
                    sx = {box}
                    marginTop={5}
                >
                    <Link to = {"/job/" + job_id} id = "small-urls"><div> {title} </div></Link>
                    <Link to = {"/job/" + job_id} id = "small-urls"><div> {price} </div></Link>
                    <Link to = {"/job/" + job_id} id = "small-urls"><Chip label = {category} style = {chipjoblisting}/></Link>
                    <Link to = {"/job/" + job_id} id = "small-urls"><div> {date_posted} </div></Link>
                    {allowRate &&
                            <IconButton>
                                <ThumbUpIcon
                                    sx={{ color: blue[100],
                                        fontSize: 25,
                                    }}
                                    onClick={onClickRate}
                                />
                            </IconButton>
                    }
                    {allowDelete &&
                            <IconButton aria-label="delete" color="error">
                                <DeleteIcon
                                    onClick={deleteListing}
                                    sx={{ color: red[900],
                                        fontSize: 25,
                                    }}
                                />
                            </IconButton>
                    }
            </Box>
    )
}

const chipjoblisting = {
    backgroundColor : "#FFEBCC",
    fontFamily : "Jost",
    fontSize : "18px",
    fontWeight: "400",
    padding: '5px',
    border: "1px solid black",
    marginRight: '5px',
    cursor:"pointer"
}

export default listing;