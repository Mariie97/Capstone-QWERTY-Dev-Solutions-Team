import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {getQueryParams, verifyUserAuth,accountType} from "../Utilities";
import AgreementModal from "./AgreementModal"
import ErrorPage from './ErrorPage';
import Avatar from "@mui/material/Avatar";
import DefaultProfilePicture from "../Static/Images/DefaultProfilePicture.svg"
import {Box, CircularProgress} from "@material-ui/core";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

class RequestsPage extends Component {
    queryParams = undefined;
    currentUser = {
        id: parseInt(localStorage.getItem('user_id')),
        type: parseInt(localStorage.getItem('type'))
    };
    
    constructor(props) {
        super(props);
        this.queryParams = getQueryParams(this.props.queryParams);
        this.state = {
            is_auth: true,
            is_student: this.currentUser.type === accountType.student,
            requestsList: [],
            requestLoaded: false,
            showAgreement: false,
            pageNotFound: this.queryParams.get('job_id') === null,
            allowAccess : true
        };

        this.getJobRequests = this.getJobRequests.bind(this);
        this.renderCards = this.renderCards.bind(this);
        this.onClickAccept = this.onClickAccept.bind(this);
    }

    componentDidMount() {
        this.setState({
            is_auth: verifyUserAuth(this.props.cookies.get('csrf_access_token'))
        });
        this.getJobRequests();
    }

    getJobRequests(){
        fetch(`/job_requests/${this.queryParams.get('job_id')}?state=1`,{
                method: 'GET',
                headers: {
                    'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
                },
            }
        ).then(response => {
            if(response.status === 200) {
                response.json().then(data => {
                    this.setState({
                        requestsList: data.requests,
                        allowAccess: this.currentUser.id === data.owner_id
                    });
                })
            }
            this.setState({requestLoaded: true});
        })
    }

    onClickAccept() {
        const {showAgreement} = this.state;
        this.setState({showAgreement: !showAgreement});
    }

    renderCards() {
        const { requestsList, showAgreement} = this.state;
        const token = this.props.cookies.get('csrf_access_token');
        return requestsList.map(request => (
            <Card sx={{width: 300}} className='student-request-cards'>
                <Link to={`/profile/${request.user_id}`} className='student-request-card-content'>
                    <div className='request-image-container'>
                        <Avatar
                            className='avatar'
                            alt={`${request.first_name} ${request.last_name}`}
                            src={request.image === null ? DefaultProfilePicture: request.image}
                            sx={{width: 200, height: 200}}
                        />
                    </div>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" color='#1976d2'>
                            {`${request.first_name} ${request.last_name}`}
                        </Typography>
                    </CardContent>
                </Link>
                <CardActions className='request-card-actions-container'>
                    <Button size="small" onClick={this.onClickAccept}>Accept</Button>
                    {showAgreement && <AgreementModal isOpen={showAgreement} toggle={this.onClickAccept} 
                    job_id={this.queryParams.get('job_id')} student_id={request.user_id} cookies={token}/>}
                </CardActions>
            </Card>
        ) )
    }

    render() {
        const { is_auth, requestsList, requestLoaded, is_student, pageNotFound, allowAccess} = this.state;
        
        return (
            <React.Fragment>
                {pageNotFound ?  <ErrorPage errorNumber="404" errorType="Page Not Found" inside/> :
                    <div>
                        {!is_auth && <Redirect to='/' />}
                        {(is_student || !allowAccess) ? <ErrorPage errorNumber="403" errorType="Forbidden/Access Not Allowed" inside/>:
                        <React.Fragment>
                            {!requestLoaded ?
                                <div className='loading-icon'>
                                    <Box sx={{display: 'flex'}}>
                                        <CircularProgress />
                                    </Box>
                                </div>:
                                <div>
                                    <div className='header-flex-container'>
                                            <h1 className="page-title-header">Student's Requests</h1>
                                    </div>     
                                    <div className='student-requests-flex-container'>
                                            {requestsList.length === 0 ? <h2 className='request-page-subheader'>No requests available</h2> :
                                                this.renderCards()
                                            }
                                    </div>
                                </div>
                            }
                        </React.Fragment>}
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default RequestsPage;
