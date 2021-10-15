import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {withCookies} from "react-cookie";
import LandingPage from "./Components/LandingPage"
import JobDashboardPage from "./Components/JobDashboardPage";
import NavBar from './Components/NavBar';
import ProfilePage from "./Components/ProfilePage";


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
                                    <LandingPage />
                                </React.Fragment>
                            )}
                        />
                        <Route
                            exact
                            path='/profile'
                            render={() => (
                                <React.Fragment>
                                    <NavBar cookies= {this.props.cookies} />
                                    <ProfilePage cookies= {this.props.cookies} />
                                </React.Fragment>
                            )}
                        />
                        <Route
                            exact
                            path='/jobdashboard'
                            render={() => (
                                <React.Fragment>
                                    <JobDashboardPage />
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
