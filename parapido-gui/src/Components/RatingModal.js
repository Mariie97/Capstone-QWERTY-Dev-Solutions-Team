import React, {Component} from 'react'
import {Backdrop, Modal} from "@material-ui/core";
import "../Layouts/RatingModal.css"
import ItemsDropdown from "./ItemsDropdown";
import Button from "@mui/material/Button";

class RatingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ratingRef: this.props.ratingRef,
        };

        this.changeRating = this.changeRating.bind(this);
        this.handleRate = this.handleRate.bind(this);

    }

    ratings = [
        '1',
        '2',
        '3',
        '4',
        '5',
    ];

    render() {

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

                        <ItemsDropdown
                            blackLabel
                            initial_value={''}
                            ref={this.state.ratingRef}
                            validate={true}
                            itemsList={this.ratings}
                            label='Rating'
                        />


                        <Button id={"rate-button"} onClick={this.handleRate}> Rate </Button>

                    </Backdrop>

                </Modal>

            </div>
        )
    }

    changeRating(value) {
        this.setState({
            rating: value
        });
    }

    handleRate(){
        const { filterJobs, setAlert, handleClose } = this.props;

        if(this.state.ratingRef.current?.validate()) {
            fetch('/rate_job/' + this.props.job_id,{
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
                },
                body: JSON.stringify({
                    value: this.state.ratingRef.current.state.item,
                    user_id: this.props.userToRate
                })
            }).then(response => {
                if (response.status === 201) {
                    filterJobs();
                    setAlert('Rate completed successfully!!');
                }
                else {
                    setAlert("Can't rate at this moment, please try again later", "error");
                }
                handleClose();
            })
        }
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