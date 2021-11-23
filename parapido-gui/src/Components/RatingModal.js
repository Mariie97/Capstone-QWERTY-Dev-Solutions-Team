import React, {Component} from 'react'
import {ratings} from "../Utilities";
import {Backdrop, Modal} from "@material-ui/core";
import ItemsDropdown from "./ItemsDropdown";

class RatingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ratingRef: this.props.ratingRef,
        };

        this.changeRating = this.changeRating.bind(this);
        this.handleRate = this.handleRate.bind(this);
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

    changeRating(value) {
        this.setState({
            rating: value
        });
    }

    render() {
        const {open, handleClose} = this.props;
        return (
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Backdrop open={open} style={backdropStyle}>
                        <div className="empty-list-subheader black">Rate this Job:</div>
                        <ItemsDropdown
                            blackLabel
                            initial_value={''}
                            ref={this.state.ratingRef}
                            validate={true}
                            itemsList={ratings}
                            label='Rating'
                        />
                        <button className="custom-small-buttons" onClick={this.handleRate}> Rate </button>
                    </Backdrop>
                </Modal>
            </div>
        )
    }
}

const backdropStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "4vh",
    justifyContent: "center",
    left: "40%",
    top: "200px",
    width: "300px",
    height: "300px",
    backgroundColor: "#FFFFFF",
    border: '2px solid black',
}

export default RatingModal;