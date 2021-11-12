import React from 'react'
import {Box, IconButton} from "@material-ui/core";
import "../Layouts/JobListing.css"
import {blue, red} from "@material-ui/core/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {Link} from "react-router-dom";

const boxSX = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '80%',
    height: 60,
    backgroundColor: '#2F2D4A',
    borderRadius: 20,
    border: 2,
    borderColor: 'black',
    '&:hover': {
        backgroundColor: '#2F2D8F',
        opacity: [0.9, 0.8, 0.7],
    },
}

const categoryBoxSX = {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'absolute',
    marginLeft: '25%',
    width: '7%',
    height: 8,
    verticalAlign: 'middle',
    color: '#2F2D4A',
    align: 'center',
    textAlign: 'center',
    fontWeight: 700,
    backgroundColor: '#FFEBCC',
    borderRadius: 50,
    border: 2,
    borderColor: 'black',
    padding: 17,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
}


const listing = (props) => {
    return(

        <li list-style-type = "none">


            <Link to = {"/job/" + props.job_id} className = "titleLink" >
                <Box
                    border = {2}
                    borderColor = "black"
                    sx = {boxSX}
                    marginTop={5}
                >

                    <span id={"listing-title"}> {props.title} </span>
                    <span id={"listing-price"}> {props.price} </span>
                    <Box component = "span" sx={categoryBoxSX}> {props.category} </Box>
                    <span id={"listing-date"}> {props.date_posted} </span>

                </Box>
            </Link>
                                { props.status === '2' &&

                    <span id={"checkbox-style"}>
                        <IconButton>
                            <ThumbUpIcon
                                sx={{ color: blue[100],
                                    fontSize: 25,
                                }}
                                onClick={props.onClickRate}
                            />
                        </IconButton>
                            </span>
                    }


                    { (props.status === '1' || props.status === '2') &&
                    <span id={"delete-button"}>
                    <IconButton aria-label="delete" color="error">
                        <DeleteIcon
                            onClick={props.deleteListing}
                            sx={{ color: red[900],
                                fontSize: 25,
                            }}

                        />
                    </IconButton>
                </span>
                    }
        </li>
    )
}

export default listing;