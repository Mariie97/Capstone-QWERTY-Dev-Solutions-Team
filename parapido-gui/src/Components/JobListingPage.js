import React, {Component, createRef} from 'react';
import {Redirect} from "react-router-dom";
import {Box, Button} from "@material-ui/core";
import JobListing from "./JobListing";
import CitiesDropdown from "./CitiesDropdown";
import "../Layouts/JobListing.css";
import verifyUserAuth from "../Utilities";


class JobListingPage extends Component {

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
                    {id:'', title: '', price:'', categories:0, date_posted: ""}
                ],*/
            city: 1,
            cityError: undefined,
            change_city: createRef(),


        }
    }

    componentDidMount(){

        this.setState({
            is_auth: verifyUserAuth(this.props.cookies.get('csrf_access_token'))
        });

        fetch('/jobs_list/1', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
            }
        }).then(response => {
            if(response.status === 200) {
                response.json().then(data => {

/*
                        console.log(data)
*/

/*                                                this.setState({ listings: data
                                                });*/

                    }
                )
            }
            else {
                console.log("Error")
            }
        })
    }

    deleteListing = (index, e) => {

        const listings = Object.assign([], this.state.listings);
        listings.splice(index, 1);
        this.setState({listings:listings});

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

    render(){
        return (
            <div>

                <div className="dropdown-style">
                    <CitiesDropdown
                        initial_value={this.state.city}
                        ref={this.state.change_city}
                    />
                    {this.state.cityError!==undefined &&
                    <p className='citi-field-error'>{this.state.cityError}</p>
                    }

                </div>

                <div className="job-listing-page-header"> Jobs In-Progress </div>
                {/*<Button id={"go-back-button"}>Go Back</Button>*/}

                <div id="list-style">
                    <ul id="list-bullet-style">


                        {
                            this.state.listings.map((listing, index)=>{
                                return <JobListing

                                    price = {listing.price} date_posted = {listing.date_posted}
                                    title = {listing.title} category = {this.findCategory(listing.categories)}
                                    key ={listing.id}
                                    deleteListing={this.deleteListing.bind(this, index)}
                                >

                                </JobListing>
                            })
                        }

                    </ul>
                </div>

            </div>
        );
    };
}


export default JobListingPage;