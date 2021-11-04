import React, { Component } from 'react'
import {Backdrop, FormControl, InputLabel, MenuItem, Modal, Select} from "@material-ui/core";
import "../Layouts/RatingModal.css"



class RatingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.initial_value!==''? this.props.initial_value : undefined,
            open: this.props.open
        };

        this.handleOnchangeRating = this.handleOnchangeRating.bind(this);
        this.changeRating = this.changeRating.bind(this);

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

}

const backdropStyle = {
    left: "700px",
    top: "200px",
    width: "500px",
    height: "300px",
    position: "absolute",
    backgroundColor: "#FFFFFF",
    border: '3px solid black',

}


export default RatingModal;