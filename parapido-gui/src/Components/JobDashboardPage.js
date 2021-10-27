import {Component} from 'react';
import {Redirect} from "react-router-dom";
import "../Layouts/JobDashboard.css"
import verifyUserAuth from "../Utilities";
import CategoriesDropdown from './CategoriesDropdown_';
import PricesDropdown from './PricesDropdown';
import CitiesDropdown from './CitiesDropdown_1';
import FilterListIcon from '@material-ui/icons/FilterList';

class JobDashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state={
            is_auth: true
        };

        this.getJobs = this.getJobs.bind(this);
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
              console.log(data)         
            })
          }
          else{
              console.log("Error")
          }
        })
    
      }

    render() {
        const {is_auth} = this.state;
        return (
            <div>
                {!is_auth && <Redirect to='/' />}
                <h1 className="job-dashboard-page-header">Job Dashboard</h1>
                <div className="first-flex-container-job-dashboard-page">
                    <div>
                        <label className="label-job-dashboard"> Categories </label>
                        <CategoriesDropdown initial_value= ''/>
                    </div>

                    <div>
                        <label className="label-job-dashboard"> Price </label>
                        <PricesDropdown initial_value= ''/>

                    </div>
                    
                    <div>
                        <label className="label-job-dashboard"> City</label>
                        <CitiesDropdown initial_value= ''/>
                    </div>
                    <button className="filter-button-job-dashboard"> 
                        <div className="text-button-job-dashboard">
                        <FilterListIcon style={filter}/>Press to FILTER!
                        </div>
                    </button>
                </div>
            </div>
        )
    }
}

// small icons and elements css

const filter = {
    position: "relative",
    top: "5.5px",
    left: "-13px"
}

export default JobDashboardPage;