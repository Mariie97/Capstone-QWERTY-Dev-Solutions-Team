import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {Box, Button} from "@material-ui/core";
import JobListing from "./JobListing";
import "../Layouts/JobListing.css"


class JobListingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listings: [
                {id:"algo1", title: 'Job Example One', price:'$5.45', category:"TRABAJO", date: "mm/dd/yyyy"},
                {id:"algo2", title: 'Job Example Two', price:'$50.45', category:"TRABAJO", date: "mm/dd/yyyy"},
                {id:"algo3", title: 'Job Example Three', price:'$500.45', category:"TRABAJO", date: "mm/dd/yyyy"},
                {id:"algo4", title: 'Job Example Four', price:'$5,000.45', category:"TRABAJO", date: "mm/dd/yyyy"},
                {id:"algo5", title: 'Job Example Five', price:'$50,000.45', category:"TRABAJO", date: "mm/dd/yyyy"},
                {id:"algo6", title: 'Job Example Six', price:'$500,000.45', category:"TRABAJO", date: "mm/dd/yyyy"},
            ]
        }
    }


    deleteListing = (index, e) => {

        const listings = Object.assign([], this.state.listings);
        listings.splice(index, 1);
        this.setState({listings:listings});

    }

    render(){
        return (
            <div>

                <div className="job-listing-page-header"> Jobs In-Progress </div>
                <Button id={"go-back-button"}>Go Back</Button>

                <div id="list-style">
                    <ul id="list-bullet-style">


                        {
                            this.state.listings.map((listing, index)=>{
                                return <JobListing

                                    price = {listing.price} date = {listing.date}
                                    title = {listing.title} category = {listing.category}
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