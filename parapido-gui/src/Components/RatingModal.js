import React, { Component } from 'react'
import {Backdrop, FormControl, InputLabel, MenuItem, Modal, Select} from "@material-ui/core";
import "../Layouts/RatingModal.css"
import {current_user} from "../Utilities";



class RatingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.initial_value!==''? this.props.initial_value : undefined,
            open: this.props.open
        };

        this.handleOnchangeRating = this.handleOnchangeRating.bind(this);
        this.changeRating = this.changeRating.bind(this);
        this.handleRate = this.handleRate.bind(this, this.state.rating, this.props.job_id);

    }

    render() {
        const { rating, open } = this.state;

        const body = (
            <div>

                <FormControl sx={{ m: 1, minWidth: 150, fontWeight: "bold", fontsize: 30 }}>
                    <InputLabel>Rating</InputLabel>
                    <Select
                        id={"rating-dropdown"}
                        value={rating}
                        onChange={this.handleOnchangeRating}
                        label="Rating"
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>

                    </Select>
                </FormControl>

            </div>
        )

        return (

            <div>

                <Modal
                    open={this.props.open}
                    onClose={this.props.handleClose}
                >
                    <Backdrop open={this.props.open} style={backdropStyle}>

                        <div className={"modalTextStyle"}>
                            Rate this Job:
                        </div>
                        <button id={"rate-button"} onClick={this.handleRate}> Rate </button>
                        {body}
                    </Backdrop>

                </Modal>

            </div>
        )
    }

    handleOnchangeRating(event) {
        this.changeRating(event.target.value.toString());
    }

    changeRating(value) {
        this.setState({
            rating: value
        });
    }

    handleRate(value, job_id){

        fetch('/api/rate_job/' + job_id,{
            method: 'POST',
            body: JSON.stringify({
                value: value
            }),
            headers: {'Content-Type': 'application/json'},
        }).then(response => {
            if(response.status === 200) {
                response.json().then(data => {

                        console.log(data)


                    }
                )
            }
            else {
                console.log("Error")
            }
        })

    }

}

const backdropStyle = {
    display: "flex",
    left: "40%",
    top: "200px",
    width: "500px",
    height: "300px",
    position: "absolute",
    backgroundColor: "#FFFFFF",
    border: '3px solid black',

}


export default RatingModal;