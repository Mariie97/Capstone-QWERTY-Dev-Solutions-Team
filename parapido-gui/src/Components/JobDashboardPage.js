import {Component, createRef} from 'react';
import {Link, Redirect} from "react-router-dom";
import "../Layouts/JobDashboard.css"
import "../Layouts/JobDashboardCard.css";
import {accountType, categories, cities, prices, verifyUserAuth} from "../Utilities";
import Alert from '@material-ui/lab/Alert';
import ItemsDropdown from "./ItemsDropdown.js";
import FilterListIcon from '@material-ui/icons/FilterList';
import JobDashboardCard from './JobDashboardCard';
import {Box, CircularProgress} from "@material-ui/core";

class JobDashboardPage extends Component {
    currentUser = {
        id: parseInt(localStorage.getItem('user_id')),
        type: parseInt(localStorage.getItem('type'))
    };

    constructor(props) {
        super(props);
        this.state={
            jobs: [],
            change_category: createRef(),
            change_city: createRef(),
            change_price: createRef(),
            is_auth: true,
            pageLoaded: false,
            filterLoaded: false,
            jobcreationSuccesful: false,
        };

        this.getJobs = this.getJobs.bind(this);
        this.clickFilter = this.clickFilter.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
    }

    componentDidMount() {
        this.setState({
            is_auth: verifyUserAuth(this.props.cookies.get('csrf_access_token'))
        });

        if(this.props.history.action === 'POP') {
            this.setState({jobcreationSuccesful: false});
        }
        else {
            if (this.props.location.state !== undefined){
                this.setState({jobcreationSuccesful: this.props.location.state});
            }
        }

        // webpage background color
        document.body.style.backgroundColor = "#2F2D4A";
        this.getJobs();
    }

    hideAlert() {
        setTimeout(() => {this.setState({
            jobcreationSuccesful: false})}, 4000);
    }

    getJobs() {
        fetch("jobs_list/1", {
            method: 'GET'
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    this.setState(
                        {jobs : data,
                            pageLoaded : true,
                            filterLoaded : true
                        }
                    )
                })

            }
        })
    }

    clickFilter() {
        this.setState(
            {filterLoaded: false}
        )

        let category = this.state.change_category?.current.state.item;
        let city = this.state.change_city?.current.state.item;
        let filterResult = '?';
        let price = this.state.change_price?.current.state.item;

        if(category !== '' && category !== '0'){
            category = `category=${category}`;
            filterResult += category
        }
        if(category === '0'){
            filterResult = '?';
        }

        if(city !== '' && city !== '0'){
            if(filterResult.length === 1){
                city = `city=${city}`;
                filterResult += city
            }
            else{
                city = `&city=${city}`;
                filterResult += city;
            }
        }

        if(price !== '' && price !== '0'){
            if(filterResult.length === 1){
                if(price === '1'){
                    price = `maxPrice=20`;
                }
                else if(price === '2'){
                    price = `minPrice=20&maxPrice=40`;
                }
                else if(price === '3'){
                    price = `minPrice=50&maxPrice=60`;
                }
                else if(price === '4'){
                    price = `minPrice=70&maxPrice=100`;
                }
                else if(price === '5'){
                    price = `minPrice=100`;
                }

                filterResult += price
            }
            else{
                if(price === '1'){
                    price = `&maxPrice=20`;
                }
                else if(price === '2'){
                    price = `&minPrice=20&maxPrice=40`;
                }
                else if(price === '3'){
                    price = `&minPrice=50&maxPrice=60`;
                }
                else if(price === '4'){
                    price = `&minPrice=70&maxPrice=100`;
                }
                else if(price === '5'){
                    price = `&minPrice=100`;
                }

                filterResult += price
            }
        }

        fetch(`jobs_list/1`+filterResult, {
            method: 'GET'
        }).then(response => {
            if(category=== '0' && cities === '0' && price === '0'){
                this.getJobs();
            }
            else if (response.status === 200) {
                response.json().then(data => {
                    this.setState(
                        {jobs : data,
                            filterLoaded : true
                        }
                    )
                })
            }
            else{
                this.setState(
                    {jobs : [],
                        filterLoaded: true}
                )
            }
        })

    }

    render() {
        const { jobs, change_category, change_city, change_price, is_auth, pageLoaded, filterLoaded, jobcreationSuccesful} = this.state;
        const showJobCreationButton = this.currentUser.type === accountType.client;
        const cardArray = jobs.map(
            job => <JobDashboardCard
                job_id = {job.job_id}
                title = {job.title}
                city = {job.city}
                price = {job.price}
                category = {job.categories}
                owner_first  = {job.owner_first}
                owner_last = {job.owner_last}
                street = {job.street}
                zipcode = {job.zipcode}
            />
        )


        return (
            <div>
                {!is_auth && <Redirect to='/' />}
                {!pageLoaded ?
                    <div className='loading-icon'>
                        <Box sx={{display: 'flex'}}>
                            <CircularProgress/>
                        </Box>
                    </div> :
                    <div>
                        {(jobcreationSuccesful) && <Alert onLoad={this.hideAlert()} severity="success" className="server-error-job-creation">
                            The job was created succesfully!!! 👍🏼</Alert>}
                        <h1 className="job-dashboard-page-header">Job Dashboard
                            {showJobCreationButton &&
                            <Link to="/jobcreation">
                                <button className="create-job-button-job-dashboard">
                                    <div className="text1-button-job-dashboard">
                                        Create Job
                                    </div>
                                </button>
                            </Link>
                            }
                        </h1>

                        <div className="first-flex-container-job-dashboard-page">
                            <div className = "label-job-dashboard">
                                <ItemsDropdown
                                    ref={change_category}
                                    itemsList={categories}
                                    label='Categories'
                                />
                            </div>

                            <div className = "label-job-dashboard">
                                <ItemsDropdown
                                    ref={change_price}
                                    itemsList={prices}
                                    label='Prices'
                                />
                            </div>

                            <div className = "label-job-dashboard">
                                <ItemsDropdown
                                    ref={change_city}
                                    itemsList={cities}
                                    label='Cities'
                                />
                            </div>


                            <button className="filter-button-job-dashboard" onClick={this.clickFilter}>
                                <div className="text-button-job-dashboard">
                                    <FilterListIcon/>Filter
                                </div>
                            </button>
                        </div>
                        {!filterLoaded ?
                            <div className='loading-icon1'>
                                <Box sx={{display: 'flex'}}>
                                    <CircularProgress style={{alignItems:"center"}}/>
                                </Box>
                            </div> :
                            <div className="card-wrapper">
                                {cardArray}
                            </div>}
                    </div>}
            </div>

        )
    }
}

export default JobDashboardPage;