import React, {Component} from 'react';
import '../Layouts/JobDetails.css'
import {Link, Redirect} from "react-router-dom";
import {
    accountType,
    cities,
    current_user,
    getJobStatus,
    jobStatus,
    setJobStatus, verifyUserAuth,
    weekDays
} from "../Utilities";
import ProfileCard from "./ProfileCard";
import {Box, Chip, CircularProgress} from "@material-ui/core";


class JobDetailsPage extends Component {

    constructor(props) {
        super(props);
        this.state={
            is_auth: true,
            job: {
                owner_id: '',
                student_id: '',
                title: '',
                description: '',
                price: '',
                categories: '',
                status: '',
                date_posted: '',
                pdf: '',
                street: '',
                city: '',
                zipcode: '',
                owner_name: '',
                owner_last: '',
                owner_image: '',
                owner_cancellations: '',
                student_name: '',
                student_last: '',
                days: [],
                users_requested: [],
                owner_rating: '',
            },
            pageLoaded: false,
            redirect: undefined,
        };

        this.onClickRequest = this.onClickRequest.bind(this);
        this.onClickCancelRequest = this.onClickCancelRequest.bind(this);
        this.getJobDays = this.getJobDays.bind(this);
    }

    componentDidMount() {
        document.body.style.backgroundColor = "#2F2D4A"

        this.setState({
            is_auth: verifyUserAuth(this.props.cookies.get('csrf_access_token'))
        });

        const { job_id } =  this.props;
        fetch(`/job_details/${job_id}`, {
            method:'GET',
            headers: {
                'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
            }
        }).then(response => {
            if (response.status===200) {
                response.json().then(data =>{
                    this.setState({
                        job: {
                            owner_id: data.owner_id,
                            student_id: data.student_id,
                            title: data.title,
                            description: data.description,
                            price: data.price,
                            categories: data.categories,
                            status: data.status,
                            date_posted: data.date_posted,
                            pdf: data.pdf,
                            street: data.street,
                            city: data.city,
                            zipcode: data.zipcode,
                            owner_name: data.owner_name,
                            owner_last: data.owner_last,
                            owner_image: data.owner_image,
                            student_name: data.student_name,
                            student_last: data.student_last,
                            days: data.days,
                            users_requested: data.users_requested,
                            owner_rating: data.owner_rating,
                            owner_cancellations: data.owner_cancellations,
                        },
                        pageLoaded: true,
                    });
                })
            }
            else{
                alert(response);
            }
        })
    }

    onClickRequest() {
        const { job_id } = this.props;
        fetch('/request_job', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
            },
            body: JSON.stringify({
                job_id: job_id,
                student_id: current_user.id,
            })
        }).then(response => {
            if (response.status === 200) {
                //    TODO: Redirect to request listing page
            }
            else {
                alert('Could not add request at this moment, please try again later');
            }
        })
    }

    onClickCancelRequest() {
        const { job_id } = this.props;
        fetch('/cancel_request', {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
            },
            body: JSON.stringify({
                job_id: job_id,
                student_id: current_user.id,
            })
        }).then(response => {
            if (response.status === 200) {
                //    TODO: Redirect to student request listing page
                alert("Successful")
            }
            else {
                alert('Could not add request at this moment, please try again later');
            }
        })
    }

    getJobDays() {
        const {days} = this.state.job;
        return days.map(day =>
            <Chip label={weekDays[day - 1]} style = {chipStyleJobDetails}/>
        )
    }

    render() {
        //TODO: This must be able to show all job without considering the status?
        const {is_auth, job, pageLoaded, redirect } = this.state;
        const { job_id } = this.props;
        const token = this.props.cookies.get('csrf_access_token');

        const showCancelRequestButton =
            job.users_requested.filter(request  => request[0]===current_user.id && request[1]===1).length > 0 &&
            job.status===jobStatus.posted;

        const showRequestButton = current_user.type===accountType.student &&
            job.users_requested.filter(request  => request[0]===current_user.id).length===0 &&
            job.status===jobStatus.posted;

        const showCancelButton = (current_user.id===job.owner_id && (
            job.status===jobStatus.posted || job.status===jobStatus.in_process)) || (
            current_user.id===job.student_id && job.status===jobStatus.in_process
        );

        const showDeleteButton = current_user.type===accountType.admin && job.status!==jobStatus.deleted;

        const showContractButton = (job.status === jobStatus.in_process || job.status === jobStatus.completed) &&
            (current_user.id===job.owner_id || current_user.id===job.student_id)

        const showChatButton = (job.status === jobStatus.in_process && (
            current_user.id === job.owner_id || current_user.id === job.student_id));

        const showJobRequestsButton = job.status === jobStatus.posted && job.owner_id === current_user.id;

        return (
            <div className="Dashboard">
                {!is_auth && <Redirect to='/' />}
                {!pageLoaded ?
                    <div className='loading-icon'>
                        <Box sx={{display: 'flex'}}>
                            <CircularProgress/>
                        </Box>
                    </div> :
                    <div>
                        {redirect !== undefined && <Redirect to={redirect} />}
                        <div className='header-flex-container'>
                            <div className="button-flex-container">
                                {showRequestButton &&
                                <button onClick={this.onClickRequest} className="custom-buttons">
                                    Request Job
                                </button>
                                }
                                {showCancelButton &&
                                <button
                                    onClick={() => {
                                        const status = current_user.type === accountType.client ? jobStatus.cancelled : jobStatus.posted;
                                        const success = setJobStatus(token, job_id, status);
                                        if(success) {
                                            //TODO: Redirect: student_request or job_posted depending on user account
                                            this.setState({redirect: '/jobdashboard'});
                                        }
                                    }}
                                    className="custom-buttons"
                                >
                                    Cancel Job
                                </button>
                                }
                                {showCancelRequestButton &&
                                <button onClick={this.onClickCancelRequest} className="custom-buttons">
                                    Cancel Request
                                </button>
                                }
                                {showContractButton &&
                                <a
                                    href={`${process.env.REACT_APP_API_URL}/pdf/${job_id}?student_id=${job.student_id}&owner_id=${job.owner_id}`}
                                    className="custom-buttons">
                                    View Contract
                                </a>
                                }
                                {showChatButton &&
                                <Link
                                    to={`/chat?job_id=${job_id}&title=${encodeURIComponent(job.title)}`}
                                    className="custom-buttons"
                                >Chat</Link>
                                }
                                {showDeleteButton &&
                                <button
                                    onClick={() => {
                                        const success = setJobStatus(token, job_id, jobStatus.deleted);
                                        if(success) {
                                            //TODO: Redirect to user admin list page
                                            this.setState({redirect: '/jobdashboard'});
                                        }
                                    }}
                                    className="custom-buttons delete-button"
                                >
                                    Delete Job
                                </button>
                                }
                                {showJobRequestsButton &&
                                <Link
                                    to={`/job_requests?job_id=${job_id}`}
                                    className="custom-buttons"
                                >
                                    View Requests
                                </Link>
                                }
                            </div>
                            <h1 className="page-title-header">{job.title}</h1>
                        </div>
                        <div className = "parent-table-body-container">
                            <div className="child1-flex-body-container">
                                <ProfileCard
                                    user_id={job.owner_id}
                                    first_name={job.owner_name}
                                    last_name={job.owner_last}
                                    rating_value={job.owner_rating}
                                    jobs_cancelled={job.owner_cancellations}
                                    type={undefined}
                                    image={job.owner_image}
                                />
                            </div>
                            <table className='table-body-content'>
                                <tr className='row-table-body'>
                                    <td className='column-table-body col1'>Description:</td>
                                    <td className='column-table-body col2'>{job.description} </td>
                                </tr>
                                <tr className='row-table-body'>
                                    <td className='column-table-body col1'>Price:</td>
                                    <td className='column-table-body col2'>{job.price}</td>
                                </tr>
                                <tr className='row-table-body'>
                                    <td className='column-table-body col1'>Location:</td>
                                    <td className='column-table-body col2'>{job.street} {cities[job.city-1]} PR, {job.zipcode}</td>
                                </tr>
                                <tr className='row-table-body'>
                                    <td className='column-table-body col1'>Category:</td>
                                    <td className='column-table-body col2'>
                                        <Chip label={job.categories} style = {chipStyleJobDetails}/>
                                    </td>
                                </tr>
                                <tr className='row-table-body'>
                                    <td className='column-table-body col1'>Available Days:</td>
                                    <td className='column-table-body col2'>{this.getJobDays()}</td>
                                </tr>
                                <tr className='row-table-body'>
                                    <td className='column-table-body col1'>Status:</td>
                                    <td className='column-table-body col2'>{getJobStatus[job.status-1]}</td>
                                </tr>
                                { job.student_id!==null &&
                                <tr className='row-table-body'>
                                    <td className='column-table-body col1'>Assigned to:</td>
                                    <td className='column-table-body col2'>
                                        <Link to={`/profile/${job.student_id}`} id='job-student-assigned-name'>
                                            {`${job.student_name} ${job.student_last}`}
                                        </Link>
                                    </td>
                                </tr>
                                }
                            </table>
                        </div>
                    </div>
                }
            </div>
        )
    }
}


const chipStyleJobDetails = {
    backgroundColor : "#FFEBCC",
    fontFamily : "Jost",
    fontSize : "18px",
    fontWeight: "400",
    padding: '5px',
    border: "1px solid black",
    marginRight: '5px',
}

export default JobDetailsPage;