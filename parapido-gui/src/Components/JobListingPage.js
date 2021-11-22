import React, {Component, createRef} from "react";
import {accountType, cancelJobRequest, getQueryParams, jobStatus, setJobStatus, verifyUserAuth} from "../Utilities";
import { Button} from "@material-ui/core";
import JobListing from "./JobListing";
import RatingModal from "./RatingModal";
import ItemsDropdown from "./ItemsDropdown";
import Alert from "@material-ui/lab/Alert";
import JobCompleted_listings from "../Static/Images/JobCompletedBlue.svg"
import JobInProgress_listings from "../Static/Images/JobInProgressBlue.svg"
import JobPosted_listings from "../Static/Images/JobPostedBlue.svg"
import JobRequested_listings from "../Static/Images/JobRequestedBlue.svg"

class JobListingPage extends Component {
    status = undefined;
    idFilter = '';

    constructor(props) {
        super(props);
        const queryParams = getQueryParams(this.props.queryParams);
        this.status = queryParams.get('status');
        const userType = parseInt(localStorage.getItem('type'));
        this.state = {
            listings: [],
            rating: 1,
            ratingRef: createRef(),
            open: false,
            monthRef: createRef(),
            yearRef: createRef(),
            userAccountType: userType === accountType.admin ? parseInt(queryParams.get('account')) : userType,
            user_id: props.user_id,
            titleText: '',
            currJob: '',
            userToRate: '',
            listIsEmpty: false,
            deleteListing: true,
            alert: {
                msg: undefined,
                severity: undefined
            },
        }

        this.setAlert = this.setAlert.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.fetchList = this.fetchList.bind(this);
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
        let deleteSuccess;
        const job_id = this.state.listings[listingIndex].job_id;

        if(this.state.userAccountType === accountType.student && parseInt(this.status) === jobStatus.posted) {
            deleteSuccess = cancelJobRequest(this.token, job_id, this.state.user_id);
            if (deleteSuccess) {
                this.setAlert("Request has been cancelled successfully!!! 👍🏼");
            } else {
                this.setAlert("Can't cancel request at this moment, try again later!", "error");
            }
        }
        else {
            let status;
            if(this.state.userAccountType === 3) {
                deleteSuccess = setJobStatus(this.token, job_id, jobStatus.deleted);
                status = 'deleted';
            }
            else {
                const state = this.state.userAccountType === accountType.student ? jobStatus.posted : jobStatus.cancelled;
                deleteSuccess = setJobStatus(this.token, job_id, state)
                status = 'cancelled';
            }

            if (deleteSuccess) {
                this.setAlert(`Job ${status} successfully`);
            }
            else {
                this.setAlert(`Can't ${status} job at this moment, try again later!`, "error");
            }
        }

        if(deleteSuccess){
            const listings = Object.assign([], this.state.listings);
            listings.splice(listingIndex, 1);
            this.setState({
                listings:listings,
                listIsEmpty: listings.length === 0
            });
        }
    }

    setAlert(msg, severity="success") {
        this.setState({alert: {
                msg: msg,
                severity: severity
            }});
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
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    hideAlert() {
        setTimeout(() => {this.setState({
            alert: {msg: undefined}})}, 3000);
    }

    render(){
        const { alert } = this.state;
        return (
            <div>
                {alert.msg !== undefined &&
                <Alert onLoad={this.hideAlert()} severity={alert.severity} className="server-error-job-creation">
                    {alert.msg}</Alert>
                }
                <RatingModal
                    open = {this.state.open}
                    handleClose = {this.handleClose.bind(this)}
                    job_id = {this.state.currJob}
                    userToRate = {this.state.userToRate}
                    filterJobs = {this.fetchList}
                    ratingRef = {this.state.ratingRef}
                    cookies = {this.props.cookies}
                    setAlert={this.setAlert}
                />      
                {this.state.userAccountType === 1 && this.status === '1' && <div className="page-title-header black-title left-position-title"> Jobs Requested </div>}
                {this.state.userAccountType === 2 && this.status === '1' && <div className="page-title-header black-title left-position-title"> Jobs Posted </div>}
                {this.status === '2' && <div className="page-title-header black-title left-position-title"> Jobs In-Progress </div>}
                {this.status === '3' && <div className="page-title-header black-title left-position-title"> Jobs Completed </div>}
                {this.state.listIsEmpty && <h2 className="empty-list-subheader black"> No jobs available </h2>}
                <div className="main-listing-flex">
                    <div>   
                        {!this.state.listIsEmpty &&
                        <div>
                            {
                                this.state.listings.map((listing, index) => {
                                    let listingIndex = index
                                    return <JobListing
                                        price={listing.price} date_posted={listing.date_posted}
                                        title={listing.title} category={listing.categories}
                                        key={listing.id} job_id={listing.job_id} status={this.status}
                                        deleteListing={this.deleteListing.bind(this, listingIndex)}
                                        onClickRate={this.onClickRate.bind(this, listingIndex)}
                                    />
                                })
                            }
                        </div>
                        }
                    </div>
                    <div>
                        <div className={"filters-flexbox"}>
                            <ItemsDropdown
                                blackLabel
                                ref={this.state.yearRef}
                                validate={false}
                                itemsList={this.years}
                                label='Year'
                            />
                            <ItemsDropdown
                                blackLabel
                                ref={this.state.monthRef}
                                validate={false}
                                itemsList={this.months}
                                label='Month'
                            />
                            <Button onClick={this.fetchList}>
                                Filter
                            </Button>
                            
                        </div>
                        {this.state.userAccountType === 1 && this.status === '1' && <img id={"picture-style"} src={JobRequested_listings} alt="requested_job_img" />}
                        {this.state.userAccountType === 2 && this.status === '1' && <img id={"picture-style"} src={JobPosted_listings} alt="posted_job_img" />}
                        {this.status === '2' && <img id={"picture-style"} src={JobInProgress_listings} alt="inprogress_job_img" />}
                        {this.status === '3' && <img id={"picture-style"} src={JobCompleted_listings} alt="completed_job_img" />}
                    </div>
                </div>
            </div>
        );
    };

    fetchList() {
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
            })
        }

        //Fetch In-Progress, Completed and Posted Jobs
        else{
            fetch('/jobs_list/' + this.status + this.idFilter + filters, {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
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
            })
        }
    }
}


export default JobListingPage;