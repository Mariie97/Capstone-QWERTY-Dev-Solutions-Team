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
            requestsList: []
        };

        this.getJobRequests = this.getJobRequests.bind(this);
        this.renderCards = this.renderCards.bind(this);
    }

    componentDidMount() {
        this.getJobRequests();
    }

    getJobRequests(){
        fetch('/job_requests/13',{
                method: 'GET'
            }
        ).then(response => {
            if(response.status === 200) {
                response.json().then(data => {
                    this.setState({requestsList: data});
                })
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
                    <Button size="small">Accept</Button>
                </CardActions>
            </Card>
        ) )
    }

    render() {
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
