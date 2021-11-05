import React, {Component, createRef} from 'react';
import {Redirect} from "react-router-dom";
import {Box, Button} from "@material-ui/core";
import JobListing from "./JobListing";
import RatingModal from "./RatingModal";
import "../Layouts/JobListing.css";
import {cities, verifyUserAuth, current_user, accountType, setJobStatus, jobStatus, getQueryParams} from "../Utilities";
import ItemsDropdown from "./ItemsDropdown";


class JobListingPage extends Component {

    status = undefined;

    constructor(props) {
        super(props);
        this.state = {
            listings:
                [
                    {id:"algo1", title: 'Job Example One', price:'$5.45', category:"TRABAJO", date_posted: "mm/dd/yyyy"},
                    {id:"algo2", title: 'Job Example Two', price:'$50.45', category:"TRABAJO", date_posted: "mm/dd/yyyy"},
                    {id:"algo3", title: 'Job Example Three', price:'$500.45', category:"TRABAJO", date_posted: "mm/dd/yyyy"},
                    {id:"algo4", title: 'Job Example Four', price:'$5,000.45', category:"TRABAJO", date_posted: "mm/dd/yyyy"},
                    {id:"algo5", title: 'Job Example Five', price:'$50,000.45', category:"TRABAJO", date_posted: "mm/dd/yyyy"},
                    {id:"algo6", title: 'Job Example Six', price:'$500,000.45', category:"TRABAJO", date_posted: "mm/dd/yyyy"},
                ],
            /*                [
                            ],*/


            city: 1,
            cityError: undefined,
            cityRef: createRef(),
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

        /*        this.status = getQueryParams(this.props.queryParams).get('status');*/
        this.status = 1

        document.body.style.backgroundColor = "white";

        this.setState({
            is_auth: verifyUserAuth(this.props.cookies.get('csrf_access_token'))
        });

        fetch('/jobs_list/' + this.status /*+ "?owner_id=" + this.state.user_id*/, {
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
                        /*                        this.setState({ listings: data
                                                });*/

                    }
                )
            }
            else if(response.status === 404){
                this.setState({listIsEmpty: true})
            }
            /*
                                                else {
                                                    console.log("Error")
                                                }*/
        })

    }

    token = this.props.cookies.get('csrf_access_token');

    deleteListing = (index) => {

        const listings = Object.assign([], this.state.listings);
        listings.splice(index, 1);
        this.setState({listings:listings});


        /*
        setJobStatus(this.token, job_id, jobStatus.deleted).then(r => {})
        */

    }

    onClickRate = (job_id) => {
        this.state.currJob = job_id;
        this.setState({open:true});
    }

    handleClose = () => {
        this.setState({open: false})
    }

    findCategory = (category) => {
        if(category === 1) return "Animals"
        if(category === 2) return 'Auto'
        if(category === 3) return 'Education'
        if(category === 4) return 'Events'
        if(category === 5) return 'Home'
        if(category === 6) return 'Other'
        if(category === 7) return 'Self-care'
        if(category === 8) return 'Shop'
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

                <div className="year-dropdown-style">

                    <ItemsDropdown
                        initial_value={''}
                        ref={this.state.yearRef}
                        validate={true}
                        itemsList={this.years}
                        label='Year'
                    />

                    {this.state.cityError!==undefined &&
                    <p className='citi-field-error'>{this.state.cityError}</p>
                    }

                </div>

                <div className="month-dropdown-style">

                    <ItemsDropdown
                        initial_value={''}
                        ref={this.state.monthRef}
                        validate={true}
                        itemsList={this.months}
                        label='Month'
                    />

                    {this.state.cityError!==undefined &&
                    <p className='citi-field-error'>{this.state.cityError}</p>
                    }

                </div>


                {this.state.userAccountType === 1 && this.status === 1 && <div className="job-listing-page-header"> Jobs Requested </div>}
                {this.state.userAccountType === 2 && this.status === 1 && <div className="job-listing-page-header"> Jobs Posted </div>}
                {this.status === 2 && <div className="job-listing-page-header"> Jobs In-Progress </div>}
                {this.status === 3 && <div className="job-listing-page-header"> Jobs Completed </div>}
                {this.state.listIsEmpty && <div className="empty-list-error"> No jobs here pal </div>}


                <Button id={"go-back-button"} onClick={this.filterJobs}>Filter</Button>

                {!this.state.listIsEmpty &&
                <div id="list-style">
                    <ul id="list-bullet-style">

                        {
                            this.state.listings.map((listing, index)=>{
                                let currId = parseInt(listing.job_id)

                                return <JobListing

                                    price = {listing.price} date_posted = {listing.date_posted}
                                    title = {listing.title} category = {this.findCategory(listing.categories)}
                                    key = {listing.id}   job_id = {listing.job_id}   status = {this.status}
                                    deleteListing = {this.deleteListing.bind(this, currId)}
                                    //deleteListing = {this.deleteListing.bind(this, currId)}
                                    onClickRate={this.onClickRate.bind(this, currId)}
                                >

                                </JobListing>


                            })
                        }

                    </ul>
                </div>
                }

            </div>
        );
    };

    filterJobs = () => {
        const {monthRef, yearRef} = this.state

        let filters = '';

        if(yearRef.current.state.item !== undefined && yearRef.current.state.item !== '')
            filters += "&year=" + (parseInt(yearRef.current.state.item, 10) + 2020)

        if(monthRef.current.state.item !== undefined && monthRef.current.state.item !== '')
            filters += "&month=" + monthRef.current.state.item

        fetch('/jobs_list/' + this.status + "?owner_id=" + this.state.user_id + filters, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json',
            }
        }).then(response => {
            if(response.status === 200) {
                response.json().then(data => {

                        this.setState({listIsEmpty: false})
                        console.log(data)

                        /*                                                this.setState({ listings: data
                                                                        });*/

                    }
                )
            }
            else if(response.status === 404){
                this.setState({listIsEmpty: true})
                console.log(this.state.listIsEmpty)
            }
            /*
                                                else {
                                                    console.log("Error")
                                                }*/
        })
    }


}


export default JobListingPage;