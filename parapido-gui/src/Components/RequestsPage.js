import '../Layouts/RequestsPage.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, {Component} from "react";
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";

class RequestsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            requestsList: [],
            studentSelected: undefined,
        };

        this.getJobRequests = this.getJobRequests.bind(this);
        this.renderCards = this.renderCards.bind(this);
        this.onClickAccept = this.onClickAccept.bind(this);
    }

    componentDidMount() {
        this.getJobRequests();
    }

    getJobRequests(){
        fetch('/job_requests/13',{
                method: 'GET',
                headers: {
                    'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
                },
            }
        ).then(response => {
            if(response.status === 200) {
                response.json().then(data => {
                    this.setState({requestsList: data});
                })
            }
        })
    }

    onClickAccept(student_id) {
        fetch('/assign_job',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': this.props.cookies.get('csrf_access_token')
                },
                body: JSON.stringify({
                    job_id: 13,
                    student_id: student_id
                })
            }
        ).then(response => {
            if(response.status === 200) {
                //TODO: Redirect to job in progress page
                alert('success');
            }
            else{
                alert('Failed' + response.status);
            }
        })
    }

    renderCards() {
        const { requestsList } = this.state;
        return requestsList.map(request => (
            <Card sx={{width: 300}} className='student-request-cards'>
                <Link to={`/profile/${request.user_id}`} className='student-request-card-content'>
                    <div className='request-image-container'>
                        <Avatar
                            className='avatar'
                            alt="Remy Sharp"
                            src={request.image}
                            sx={{width: 200, height: 200}}
                        />
                    </div>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {`${request.first_name} ${request.last_name}`}
                        </Typography>
                    </CardContent>
                </Link>
                <CardActions>
                    <Button size="small" onClick={() => this.onClickAccept(request.user_id) }>Accept</Button>
                </CardActions>
            </Card>
        ) )
    }

    render() {
        //TODO: Show message when there are no request; fetch to accept a request
        return (
            <div>
                <div className='header-flex-container'>
                    <h1 className="page-title-header">Student's Requests</h1>
                </div>
                <div className='student-requests-flex-container'>
                    {this.renderCards()}
                </div>
            </div>

        );
    }
}

export default RequestsPage;
