import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import {withCookies} from "react-cookie";
import LandingPage from "./Components/LandingPage"
import LoginPage from "./Components/LoginPage";
import JobDashboardPage from "./Components/JobDashboardPage";
import DashboardPage from "./Components/JobDashboard";
import NavBar from './Components/NavBar';


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
                            path='/login'
                            render={() => (
                                is_auth ?
                                    <Redirect to='/jobdashboard'/> :
                                        <LoginPage />
                            )}
                        />
                           <Route
                            exact
                            path='/profile'
                            render={() => (
                                is_auth ?
                                    <Redirect to='/profile'/> :
                                       <React.Fragment>
                                            <NavBar cookies= {this.props.cookies} />
                                       </React.Fragment>
                            )}
                        />
                        <Route
                            exact
                            path='/editprofile'
                            render={() => (
                                <React.Fragment>
                                   <h1>Edit Profile</h1>
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
