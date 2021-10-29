import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {withCookies} from "react-cookie";
import LandingPage from "./Components/LandingPage"
import ProfilePage from "./Components/ProfilePage";
import JobDashboardPage from "./Components/JobDashboardPage";
import NavBar from './Components/NavBar';
import JobListingPage from "./Components/JobListingPage";


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={() => (
                                <React.Fragment>
                                    <LandingPage cookies={this.props.cookies} />
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
                    path='/signup'
                    render={() => (
                    <React.Fragment>
                    <h1>Register Account</h1>
                    </React.Fragment>
                )}
                    />

                        <Route
                            exact
                            path='/listings'
                            render={() => (
                                <React.Fragment>
                                    <NavBar cookies= {this.props.cookies} />
                                    <JobListingPage cookies = {this.props.cookies}/>
                                </React.Fragment>
                            )}
                        />

                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default withCookies(App);
