import React, {Component, createRef} from 'react';
import {Button} from "@material-ui/core";
import JobListing from "./JobListing";
import RatingModal from "./RatingModal";
import "../Layouts/JobListing.css";
import {getQueryParams, jobStatus, setJobStatus, verifyUserAuth} from "../Utilities";
import ItemsDropdown from "./ItemsDropdown";
import JobCompleted_listings from "../Static/Images/JobCompleted_listings.svg"
import JobInProgress_listings from "../Static/Images/JobInProgress_listings.svg"
import JobPosted_listings from "../Static/Images/JobPosted_listings.svg"
import JobRequested_listings from "../Static/Images/JobRequested_listings.svg"


class JobListingPage extends Component {

    status = undefined;

    idFilter = '';

    constructor(props) {
        super(props);
        this.state = {
            listings: [],

            rating: 1,
            ratingRef: createRef(),
            open: false,
            monthRef: createRef(),
            yearRef: createRef(),
            userAccountType: parseInt(localStorage.getItem('type')),
            user_id: parseInt(localStorage.getItem('user_id')),
            titleText: '',
            currJob: '',
            userToRate: '',
            listIsEmpty: false,
            deleteListing: true,
        }
    }

    componentDidMount(){

        this.status = getQueryParams(this.props.queryParams).get('status');
        document.body.style.backgroundColor = "white";
        this.setState({
            is_auth: verifyUserAuth(this.props.cookies.get('csrf_access_token'))
        });

        this.fetchList();

    }

    token = this.props.cookies.get('csrf_access_token');

    deleteListing = (listingIndex) => {
// FilterJobs not working after fetch
        let deleteSuccess

        if(this.state.userAccountType === 3)
        {deleteSuccess = setJobStatus(this.token, this.state.listings[listingIndex].job_id, jobStatus.deleted).then(r => {})}
        else
        {deleteSuccess = setJobStatus(this.token, this.state.listings[listingIndex].job_id, jobStatus.cancelled).then(r => {})}

        if(deleteSuccess){
            const listings = Object.assign([], this.state.listings);
            listings.splice(listingIndex, 1);
            this.setState({listings:listings});
        }


    }

    onClickRate = (listingIndex) => {
        this.setState({
            currJob: this.state.listings[listingIndex].job_id,
            open:true
        })

        if(this.state.userAccountType === 1)
            this.setState({userToRate: this.state.listings[listingIndex].owner_id});
        else
            this.setState({userToRate: this.state.listings[listingIndex].student_id});

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
                    open = {this.state.open}
                    handleClose = {this.handleClose.bind(this)}
                    job_id = {this.state.currJob}
                    userToRate = {this.state.userToRate}
                    fillterJobs = {this.fetchList.bind(this)}
                    ratingRef = {this.state.ratingRef}
                    cookies = {this.props.cookies}
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
                                    let listingIndex = index



                                    return <JobListing

                                        price={listing.price} date_posted={listing.date_posted}
                                        title={listing.title} category={listing.categories}
                                        key={listing.id} job_id={listing.job_id} status={this.status}

                                        deleteListing={this.deleteListing.bind(this, listingIndex)}
                                        onClickRate={this.onClickRate.bind(this, listingIndex)}
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
                                blackLabel
                                initial_value={''}
                                ref={this.state.yearRef}
                                validate={false}
                                itemsList={this.years}
                                label='Year'
                            />



                            <ItemsDropdown
                                blackLabel
                                initial_value={''}
                                ref={this.state.monthRef}
                                validate={false}
                                itemsList={this.months}
                                label='Month'
                            />

                            <Button id={"go-back-button"} onClick={this.fetchList}>
                                Filter
                            </Button>

                        </div>

                        {this.state.userAccountType === 1 && this.status === '1' && <img id={"picture-style"} src={JobRequested_listings} alt="algo ahi" />}
                        {this.state.userAccountType === 2 && this.status === '1' && <img id={"picture-style"} src={JobPosted_listings} alt="algo ahi" />}
                        {this.status === '2' && <img id={"picture-style"} src={JobInProgress_listings} alt="algo ahi" />}
                        {this.status === '3' && <img id={"picture-style"} src={JobCompleted_listings} alt="algo ahi" />}

                    </div>

                </div>

            </div>

        );
    };

    fetchList = () => {
        //Handle Filters
        const {monthRef, yearRef} = this.state

        let filters = '';

        if(yearRef.current.state.item !== undefined && yearRef.current.state.item !== '')
            filters += "&year=" + (parseInt(yearRef.current.state.item, 10) + 2020)

        if(monthRef.current.state.item !== undefined && monthRef.current.state.item !== '')
            filters += "&month=" + monthRef.current.state.item

        if(this.state.userAccountType === 1) this.idFilter = "?student_id=" + this.state.user_id
        else this.idFilter = "?owner_id=" + this.state.user_id

        if(this.status === '1' && this.state.userAccountType === 1){

            //Fetch Requested Jobs

            fetch('/student_requests/' + this.state.user_id + this.idFilter + filters, {
                method: 'GET',
                credentials: 'same-origin',
                headers: {'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
                }
            }).then(response => {
                if(response.status === 200) {
                    response.json().then(data => {

                            this.setState({
                                listIsEmpty: false,
                                listings: data
                            })

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
        //Fetch In-Progress, Completed and Posted Jobs

        else{

            fetch('/jobs_list/' + this.status + this.idFilter + filters, {
                method: 'GET',
                credentials: 'same-origin',
                headers: {'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
                }
            }).then(response => {
                if(response.status === 200) {
                    response.json().then(data => {
                            this.setState({
                                listIsEmpty: false,
                                listings: data
                            })
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

    }

}


export default JobListingPage;