import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {withCookies} from "react-cookie";

// Pages imports

import LandingPage from "./Components/LandingPage";
import ProfilePage from "./Components/ProfilePage";
import JobDashboardPage from "./Components/JobDashboardPage";
import NavBar from './Components/NavBar';
import JobDetailsPage from "./Components/JobDetailsPage";
import UserRegistrationPage from "./Components/UserRegistrationPage";
import JobCreation from "./Components/JobCreation";
import ChatPage from "./Components/ChatPage";
import JobListingPage from "./Components/JobListingPage";
import SecurityQuestionsPage from "./Components/SecurityQuestionsPage";
import RequestsPage from "./Components/RequestsPage";
import AdministrationPage from "./Components/AdministrationPage";
import MyJobsPage from "./Components/myJobsDashboardPage"
import LoginModal from "./Components/LoginModal";


// CSS imports

import "./Layouts/AdministrationPage.css";
import "./Layouts/AgreementModal.css";
import "./Layouts/JobCreation.css";
import "./Layouts/ChatPage.css";
import "./Layouts/InputField.css";
import "./Layouts/JobCreation.css";
import "./Layouts/ItemsDropdown.css";
import "./Layouts/JobDashboard.css";
import "./Layouts/JobDashboardCard.css";
import './Layouts/JobDetails.css';
import "./Layouts/LandingPage.css";
import "./Layouts/LoginModal.css";
import "./Layouts/NavBar.css";
import "./Layouts/myJobsDashboardCard.css";
import "./Layouts/ProfileCard.css";
import "./Layouts/ProfilePage.css";
import "./Layouts/RequestsPage.css";
import "./Layouts/SecurityQuestionsPage.css";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path='/'
                        render={(props) => (
                            <React.Fragment>
                                <LandingPage {...props} cookies={this.props.cookies} />
                            </React.Fragment>
                        )}
                    />
                    
                    <Route
                        exact
                        path='/profile/:user_id'
                        render={(props) => (
                            <React.Fragment>
                                <NavBar cookies={this.props.cookies} />
                                <ProfilePage
                                    cookies={this.props.cookies}
                                    user_id={props.match.params.user_id}
                                />
                            </React.Fragment>
                        )}
                    />
                    <Route
                        exact
                        path='/jobdashboard'
                        render={() => (
                            <React.Fragment>
                                <NavBar cookies= {this.props.cookies} />
                                <JobDashboardPage cookies= {this.props.cookies}/>
                                
                            </React.Fragment>
                        )}
                    />

                        <Route
                            exact
                            path='/listings'
                        render={(props) => (
                                <React.Fragment>
                                    <NavBar cookies= {this.props.cookies} />
                                    <JobListingPage
                                        {...props}
                                        cookies = {this.props.cookies}
                                        queryParams = {props.location.search}
                                        status = {1}
                                    />
                                </React.Fragment>
                            )}
                        />

                    <Route
                        exact
                        path='/security-questions'
                        render={() => (
                            <React.Fragment>
                                <NavBar cookies={this.props.cookies} />
                                <SecurityQuestionsPage />
                            </React.Fragment>
                        )}
                    />
                    <Route
                        exact
                        path='/myjobs'
                        render={(props) => (
                            <React.Fragment>
                               <NavBar  cookies={this.props.cookies} />
                               <MyJobsPage {...props} />
                            </React.Fragment>
                        )}
                    />
                    <Route
                        exact
                        path='/signup'
                        render={() => (
                            <React.Fragment>
                                <UserRegistrationPage />
                                <UserRegistrationPage />
                            </React.Fragment>
                        )}
                    />
                    <Route
                        exact
                        path='/chat'
                        render={(props) => (
                            <React.Fragment>
                                <NavBar cookies= {this.props.cookies} />
                                <ChatPage
                                    cookies= {this.props.cookies}
                                    queryParams={props.location.search}
                                />

                            </React.Fragment>
                        )}
                    />
                    <Route
                        exact
                        path='/job/:job_id'
                        render={(props) => (
                            <React.Fragment>
                                <NavBar cookies={this.props.cookies} />
                                <JobDetailsPage
                                    cookies={this.props.cookies}
                                    job_id={props.match.params.job_id}
                                />
                            </React.Fragment>
                        )}
                    />
                    <Route
                        exact
                        path='/jobcreation'
                        render={() => (
                            <React.Fragment>
                                <NavBar cookies={this.props.cookies} />
                                <JobCreation cookies={this.props.cookies} />
                            </React.Fragment>
                        )}
                    />
                    <Route
                        exact
                        path='/job_requests'
                        render={(props) => (
                            <React.Fragment>
                                <NavBar cookies={this.props.cookies} />
                                <RequestsPage
                                    cookies={this.props.cookies}
                                    queryParams={props.location.search}
                                />
                            </React.Fragment>
                        )}
                    />
                    <Route
                        exact
                        path='/admin/site'
                        render={props => (
                            <React.Fragment>
                                <NavBar cookies={this.props.cookies} />
                                <AdministrationPage
                                    cookies={this.props.cookies}
                                    {...props}
                               />
                            </React.Fragment>
                        )}
                    />
                     <Route
                        exact
                        path='/admin'
                        render={() => (
                            <React.Fragment>
                                <LoginModal
                                    isOpen={true}
                                    toggle={() => {}}
                                    adminLogin={true}
                                />
                            </React.Fragment>
                        )}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default withCookies(App);
