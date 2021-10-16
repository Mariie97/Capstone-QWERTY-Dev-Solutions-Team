import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {withCookies} from "react-cookie";
import LandingPage from "./Components/LandingPage"
import ProfilePage from "./Components/ProfilePage";
import JobDashboardPage from "./Components/JobDashboardPage";
import NavBar from './Components/NavBar';
<<<<<<< HEAD
import ProfilePage from "./Components/ProfilePage";
import JobCreation from "./Components/JobCreation";
=======
>>>>>>> origin


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
<<<<<<< HEAD
                                    <LandingPage cookies= {this.props.cookies} />
=======
                                    <LandingPage cookies= {this.props.cookies}/>
>>>>>>> origin
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
                                    <NavBar cookies= {this.props.cookies} />
                                    <JobDashboardPage cookies= {this.props.cookies}/>
                                </React.Fragment>
                            )}
                        />
<<<<<<< HEAD
                         <Route
                            exact
                            path='/jobcreation'
                            render={() => (
                                <React.Fragment>
                                    <NavBar cookies={this.props.cookies}/>
                                    <JobCreation />
                               </React.Fragment>
                            )}
                        />

=======
                    <Route
                    exact
                    path='/signup'
                    render={() => (
                    <React.Fragment>
                    <h1>Register Account</h1>
                    </React.Fragment>
                )}
                    />
>>>>>>> origin
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default withCookies(App);
