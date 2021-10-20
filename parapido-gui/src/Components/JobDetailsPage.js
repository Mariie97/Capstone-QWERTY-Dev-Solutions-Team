import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import verifyUserAuth, {accountType, cities, current_user, getJobStatus, jobStatus} from "../Utilities";
import ProfileCard from "./ProfileCard";
import "../Layouts/ProfilePage.css";
import {Box, CircularProgress} from "@material-ui/core";


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
        };

        this.onClickRequest = this.onClickRequest.bind(this);
        this.changeJobStatus = this.changeJobStatus.bind(this);
        this.onClickCancelRequest = this.onClickCancelRequest.bind(this);
    }

    componentDidMount() {
        document.body.style.backgroundColor = "#2F2D4A"

        this.setState({
            is_auth: verifyUserAuth(this.props.cookies.get('csrf_access_token'))
        });

        const { job_id } =  this.props;
        fetch(`/job_details/${job_id}`, {
            method:'GET'
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
                alert("Successful")
            }
            else {
                alert('Could not add request at this moment, please try again later');
            }
        })
    }

    changeJobStatus() {
        const { job_id } = this.props;
        const { job } = this .state;
        let new_status;

        if (current_user.type===accountType.admin)
            new_status = jobStatus.deleted;
        else
        if (current_user.id===job.owner_id)
            new_status = jobStatus.cancelled;
        else
            new_status = jobStatus.posted;

        fetch(`/job_status/${job_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
            },
            body: JSON.stringify({
                status: new_status
            })
        }).then(response => {
            if (response.status === 200) {
                //    TODO: Redirect to jobs, maybe???
                alert('Success');
            }
            else {
                alert('The server could not handle your request at this moment, please try again later.');
            }
        })
    }


    render() {
        //TODO: This must be able to show all job without considering the status?
        const {is_auth, job, pageLoaded } = this.state;

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
                        <div className="button-profile-page-flex-container">
                            {showRequestButton &&
                            <button onClick={this.onClickRequest} className="button-profile-page" style={{margin: 20}}>
                                Request Job
                            </button>
                            }
                            {showCancelButton &&
                            <button onClick={this.changeJobStatus} className="button-profile-page" style={{margin: 20}}>
                                Cancel Job
                            </button>
                            }
                            {showDeleteButton &&
                            <button onClick={this.changeJobStatus} className="button-profile-page" style={{margin: 20}}>
                                Delete Job
                            </button>
                            }
                            {showCancelRequestButton &&
                            <button onClick={this.onClickCancelRequest} className="button-profile-page" style={{margin: 20}}>
                                Cancel Request
                            </button>
                            }
                        </div>
                        <h1 className="profile-page-header">{job.title}</h1>
                        <div className = "parent-flex-container-profile-page">
                            <div className="child1-flex-container-profile-page">
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
                            <div className = "child2-flex-container-profile-page" style={{width: 800, marginLeft: 114}}>
                                <ul className = "bullet-removal-profile-page">
                                    <li>
                                        <ul className="body-flex-profile-page">
                                            <li className= "child-body-flex-profile-page">Description: </li>
                                            <li className="break-text-profile-page" style={{paddingTop: 1, paddingLeft: 14}}>
                                                {job.description}
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul className="body-flex-profile-page">
                                            <li  className= "child1-body-flex-profile-page"> Price: </li>
                                            <li className="break-text-profile-page" style={{paddingTop: 1, paddingLeft: 19}}>
                                                {job.price}
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul className="body-flex-profile-page">
                                            <li className= "child2-body-flex-profile-page" > Location: </li>
                                            <li className="break-text-profile-page" style={{paddingTop: 2}}>
                                                {job.street} {cities[job.city]} PR, {job.zipcode}
                                            </li>
                                        </ul>
                                    </li>
                                    <ul className="body-flex-profile-page">
                                        <li className= "child1-body-flex-profile-page">Category:</li>
                                        <p className="break-text-profile-page" style={{paddingLeft: 17 , paddingTop: 2.5}}>
                                            {job.categories}
                                        </p>
                                    </ul>
                                    <ul className="body-flex-profile-page">
                                        <li className= "child1-body-flex-profile-page">Status:</li>
                                        <p className="break-text-profile-page" style={{paddingLeft: 17 , paddingTop: 2.5}}>
                                            {getJobStatus[job.status-1]}
                                        </p>
                                    </ul>
                                    { job.student_id!==null &&
                                    <ul className="body-flex-profile-page">
                                        <li className= "child1-body-flex-profile-page">Assigned to:</li>
                                        <Link to={`/profile/${job.student_id}`} style={{color: '#FFFFFF'}}>
                                            {`${job.student_name} ${job.student_last}`}
                                        </Link>
                                    </ul>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default JobDetailsPage;