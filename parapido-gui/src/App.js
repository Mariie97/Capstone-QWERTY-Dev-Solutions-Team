import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {withCookies} from "react-cookie";
import LandingPage from "./Components/LandingPage"
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
import ErrorPage from './Components/ErrorPage';
import "./Layouts/ErrorPage.css";



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
                                <NavBar cookies={this.props.cookies} />
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
                    <Route
                        exact
                        path='*'
                        render={() => (
                            <React.Fragment>
                                <NavBar cookies={this.props.cookies} />
                                <ErrorPage errorNumber="404" errorType="Page Not Found"/>
                            </React.Fragment>
                        )}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default withCookies(App);
