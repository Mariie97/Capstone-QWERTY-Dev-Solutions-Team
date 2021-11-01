import {Component, createRef} from 'react';
import {Redirect} from "react-router-dom";
import "../Layouts/JobDashboard.css"
import "../Layouts/JobDashboardCard.css";
import {verifyUserAuth} from "../Utilities";
import ItemsDropdown from "./ItemsDropdown.js";
import FilterListIcon from '@material-ui/icons/FilterList';
import JobDashboardCard from './JobDashboardCard';
import {Box, CircularProgress} from "@material-ui/core";
import {cities, categories, prices} from "../Utilities";

class JobDashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state={
            jobs: [],
            change_category: createRef(),
            change_city: createRef(),
            change_price: createRef(),
            is_auth: true,
            pageLoaded: false,
        };

        this.getJobs = this.getJobs.bind(this);
        this.clickFilter = this.clickFilter.bind(this);
    }

    componentDidMount() {
        this.setState({
            is_auth: verifyUserAuth(this.props.cookies.get('csrf_access_token'))
        });

        // webpage background color
		document.body.style.backgroundColor = "#2F2D4A";
        this.getJobs();
    }

    getJobs() {
        fetch("jobs_list/1", {
          method: 'GET'
        }).then(response => {
          if (response.status === 200) {
            response.json().then(data => { 
              this.setState(
                  {jobs : data,
                  pageLoaded : true
                  }
                  )      
            })
           
          }
          else{
              console.log("Error request couldn't get processed")
          }
        })
      }

    clickFilter() {
        let category = this.state.change_category?.current.state.item;
        console.log(category, "cat")
        let selectedCity = 0;
        let cities = '';
        let filterResult = '?'
        console.log(filterResult.length)

        if(category !== undefined){
            category = `category=${category}`;
            filterResult += category
        }
        if(cities !== undefined){
            selectedCity = +this.state.change_city?.current.state.item - 1;
            if(filterResult.length === 1){
                cities = `city=${selectedCity}`;  
                filterResult += cities
            }
            else{
                cities = `&city=${selectedCity}`; 
                filterResult += cities;
            }
        }

        fetch(`jobs_list/1`+filterResult, {
            method: 'GET'
          }).then(response => {
            if (response.status === 200) {
              response.json().then(data => { 
                this.setState(
                    {jobs : data,
                    pageLoaded : true
                    }
                    ) 
              }) 
            }
            else{
                this.getJobs();
            }
          })

    }

    render() {
        const { jobs, change_category, change_city, change_price, is_auth, pageLoaded } = this.state;
        
        console.log(this.state.jobs)
        const cardArray = jobs.map( 
            job => <JobDashboardCard 
            job_id = {job.job_id}
            title = {job.title} 
            city = {job.city}
            price = {job.price}
            category = {job.categories}
            owner_first  = {job.owner_first}
            owner_last = {job.owner_last}
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
                    <h1 className="job-dashboard-page-header">Job Dashboard</h1>
                    <div className="first-flex-container-job-dashboard-page">
                        <div className = "label-job-dashboard">
                            <ItemsDropdown
                                 initial_value={''}
                                 ref={change_category}
                                 itemsList={categories}
                                 label='Categories'
                            />
                        </div>

                        <div className = "label-job-dashboard">
                            <ItemsDropdown
                                 initial_value={''}
                                 ref={change_price}
                                 itemsList={prices}
                                 label='Prices'
                            />
                        </div>

                        <div className = "label-job-dashboard">
                            <ItemsDropdown
                                 initial_value={''}
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

                <div className="card-wrapper">
                    {cardArray}
                </div>
                </div>}
            </div>

        )
    }
}

// small icons and elements css

export default JobDashboardPage;