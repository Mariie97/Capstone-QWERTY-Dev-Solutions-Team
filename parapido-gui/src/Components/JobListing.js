import React from 'react'
import {Box, Button, Checkbox, IconButton, withStyles} from "@material-ui/core";
import "../Layouts/JobListing.css"
import {green} from "@material-ui/core/colors";

const boxSX = {
    width: 1000,
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
    position: 'absolute',
    left: 450,
    width: 100,
    height: 9,
    color: '#2F2D4A',
    align: 'center',
    textAlign: 'center',
    fontWeight: 700,
    backgroundColor: '#FFEBCC',
    borderRadius: 50,
    border: 2,
    borderColor: 'black',
    padding: 17,
    marginTop: 7,
}

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const listing = (props) => {

    return(

        <li list-style-type = "none">
            <Box
                border = {2}
                borderColor = "black"
                sx = {boxSX}
                marginTop={5}
            >


                <span id={"listing-title"}> {props.title} </span>
                <span id={"listing-price"}> {props.price} </span>
                <Box component = "span" sx={categoryBoxSX}> {props.category} </Box>
                <span id={"listing-date"}> {props.date} </span>

                <span
                id={"checkbox-style"}
                >

                   <GreenCheckbox
                   />

               </span>

                <Button id={"delete-button"} onClick={props.deleteListing}>zafacon</Button>


                {/*                <span id={"delete-button"}>
                    <IconButton aria-label="delete" color="error">
                        <DeleteIcon onClick={props.deleteListing}/>
                    </IconButton>
                </span>*/}

            </Box>
        </li>
    )
}

export default listing;