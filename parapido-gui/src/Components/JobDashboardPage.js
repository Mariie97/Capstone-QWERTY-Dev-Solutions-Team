import {Component, createRef} from 'react';
import {Redirect} from "react-router-dom";
import "../Layouts/JobDashboard.css"
import "../Layouts/JobDashboardCard.css";
import {verifyUserAuth} from "../Utilities";
import ItemsDropdown from "./ItemsDropdown.js";
import FilterListIcon from '@material-ui/icons/FilterList';
import JobDashboardCard from './JobDashboardCard';
import {Box, CircularProgress} from "@material-ui/core";
import {cities, categories, prices, current_user, accountType} from "../Utilities";

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
            filterLoaded: false
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
                  pageLoaded : true,
                  filterLoaded : true
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
        this.setState(
            {filterLoaded: false}
        )

        let category = this.state.change_category?.current.state.item;
        let city = this.state.change_city?.current.state.item;
        let selectedCity = 0;
        let filterResult = '?';
        let price = this.state.change_price?.current.state.item;

        if(category !== undefined && category !== '0'){
            console.log(category)
            console.log(typeof(category))
            category = `category=${category}`;
            filterResult += category
        }
        if(category === '0'){
            filterResult = '?';
        }       

        if(city !== undefined && city !== '0'){
            selectedCity = +city - 1;
            if(filterResult.length === 1){
                city = `city=${selectedCity}`;  
                filterResult += city
            }
            else{
                city = `&city=${selectedCity}`; 
                filterResult += city;
            }
        }

        if(price !== undefined && price !== '0'){
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
                console.log("There are no jobs with for this filter.")
            }
          })

    }

    render() {
        const { jobs, change_category, change_city, change_price, is_auth, pageLoaded, filterLoaded } = this.state;        
        console.log(this.state.jobs)
        console.log(current_user.type)
        const showJobCreationButton = current_user.type === accountType.client;
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
                    <h1 className="job-dashboard-page-header">Job Dashboard
                        {showJobCreationButton &&
                        <button>Create Job</button>
                        }
                    </h1>
                  
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