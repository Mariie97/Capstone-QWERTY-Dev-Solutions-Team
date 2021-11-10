import React, {Component, createRef} from 'react';
import {Redirect} from "react-router-dom";
import {Box, Button, IconButton} from "@material-ui/core";
import JobListing from "./JobListing";
import RatingModal from "./RatingModal";
import "../Layouts/JobListing.css";
import {cities, verifyUserAuth, current_user, accountType, setJobStatus, jobStatus, getQueryParams} from "../Utilities";
import ItemsDropdown from "./ItemsDropdown";
import Completed from "../Static/Images/Completed.svg"
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {blue} from "@material-ui/core/colors";
import {FilterList} from "@mui/icons-material";


class JobListingPage extends Component {

    status = undefined;

    constructor(props) {
        super(props);
        this.state = {
            listings: [],

            rating: 1,
            change_rating: createRef(),
            open: false,
            monthRef: createRef(),
            yearRef: createRef(),
            userAccountType: current_user.type,
            user_id: current_user.id,
            titleText: '',
            currJob: '',
            listIsEmpty: false,
        }
    }

    componentDidMount(){

        let idFilter = ''

        this.status = getQueryParams(this.props.queryParams).get('status');

        if(this.status === '1' && this.state.userAccountType === 1) idFilter = "?student_id=" + this.state.user_id
        else idFilter = "?owner_id=" + this.state.user_id

        document.body.style.backgroundColor = "white";

        this.setState({
            is_auth: verifyUserAuth(this.props.cookies.get('csrf_access_token'))
        });

        fetch('/jobs_list/' + this.status + idFilter, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
            }
        }).then(response => {
            if(response.status === 200) {
                response.json().then(data => {

                        this.setState({listIsEmpty: false})
                        console.log(data)
                        this.setState({ listings: data
                        });

                    }
                )
            }
            else if(response.status === 404){
                this.setState({listIsEmpty: true})
            }
            else {
                console.log("Error")
            }
        })

    }

    token = this.props.cookies.get('csrf_access_token');

    deleteListing = (job_id) => {

        setJobStatus(this.token, job_id, jobStatus.deleted).then(r => {})

    }

    onClickRate = (job_id) => {
        this.state.currJob = job_id;
        this.setState({open:true});
    }

    handleClose = () => {
        this.setState({open: false})
    }

    years = [
        '2021',
        '2022',
        '2023',
        '2024',
        '2025',
        '2026',
        '2027',
        '2028'
    ];

    months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dic'
    ];

    render(){

        return (
            <div>

                <RatingModal
                    initial_value={''}
                    ref={this.state.change_rating}
                    open = {this.state.open}
                    handleClose = {this.handleClose.bind(this)}
                    job_id = {this.state.currJob}
                />

                <div className={"outer-div"}>

                    <div className={"list-flexbox"}>

                        {this.state.userAccountType === 1 && this.status === '1' && <div className="job-listing-page-header"> Jobs Requested </div>}
                        {this.state.userAccountType === 2 && this.status === '1' && <div className="job-listing-page-header"> Jobs Posted </div>}
                        {this.status === '2' && <div className="job-listing-page-header"> Jobs In-Progress </div>}
                        {this.status === '3' && <div className="job-listing-page-header"> Jobs Completed </div>}
                        {this.state.listIsEmpty && <div className="empty-list-error"> ALERT PLACEHOLDER </div>}


                        {!this.state.listIsEmpty &&
                        <ul id="list-bullet-style">

                            {
                                this.state.listings.map((listing, index) => {
                                    let currId = parseInt(listing.job_id)

                                    return <JobListing

                                        price={listing.price} date_posted={listing.date_posted}
                                        title={listing.title} category={listing.categories}
                                        key={listing.id} job_id={listing.job_id} status={this.status}
                                        deleteListing={this.deleteListing.bind(this, currId)}
                                        onClickRate={this.onClickRate.bind(this, currId)}
                                    >

                                    </JobListing>


                                })
                            }

                        </ul>
                        }

                    </div>

                    <div className={"right-flexbox"}>

                        <div className={"filters-flexbox"}>

                            <ItemsDropdown
                                initial_value={''}
                                ref={this.state.yearRef}
                                validate={false}
                                itemsList={this.years}
                                label='Year'
                            />



                            <ItemsDropdown
                                initial_value={''}
                                ref={this.state.monthRef}
                                validate={false}
                                itemsList={this.months}
                                label='Month'
                            />

                            <Button id={"go-back-button"} onClick={this.filterJobs}>

                                <IconButton>
                                    <FilterList
                                        sx={{
                                            fontSize: 25,
                                        }}
                                    />
                                </IconButton>

                            </Button>

                        </div>

                {this.state.userAccountType === 1 && this.status === '1' && <img id={"picture-style"} src={Completed} alt="algo ahi" />}
                {this.state.userAccountType === 2 && this.status === '1' && <img id={"picture-style"} src={Completed} alt="algo ahi" />}
                {this.status === '2' && <img id={"picture-style"} src={Completed} alt="algo ahi" />}
                {this.status === '3' && <img id={"picture-style"} src={Completed} alt="algo ahi" />}

                    </div>

                </div>





            </div>

        );
    };

    filterJobs = () => {
        const {monthRef, yearRef} = this.state

        let filters = '';
        let idFilter = ''

        if(yearRef.current.state.item !== undefined && yearRef.current.state.item !== '')
            filters += "&year=" + (parseInt(yearRef.current.state.item, 10) + 2020)

        if(monthRef.current.state.item !== undefined && monthRef.current.state.item !== '')
            filters += "&month=" + monthRef.current.state.item

        if(this.status === '1' && this.state.userAccountType === 1) idFilter = "?student_id=" + this.state.user_id
        else idFilter = "?owner_id=" + this.state.user_id

        fetch('/jobs_list/' + this.status + idFilter + filters, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json',
            }
        }).then(response => {
            if(response.status === 200) {
                response.json().then(data => {

                        this.setState({listIsEmpty: false})
                        console.log(data)

                        this.setState({ listings: data
                        });

                    }
                )
            }
            else if(response.status === 404){
                this.setState({listIsEmpty: true})
                console.log(this.state.listIsEmpty)
            }
            else {
                console.log("Error")
            }
        })
    }


}


export default JobListingPage;