import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {withCookies} from "react-cookie";
import SecurityQuestionsPage from "./Components/SecurityQuestionsPage";
import LandingPage from "./Components/LandingPage"
import ProfilePage from "./Components/ProfilePage";
import JobDashboardPage from "./Components/JobDashboardPage";
import NavBar from './Components/NavBar';


class App extends React.Component {

    constructor(props) {
        super(props);
    }

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
                                    <LandingPage cookies= {this.props.cookies}/>
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

                        <Route

                            exact
                            path='/security-questions'
                            render={() => (
                                <div>
                                    <NavBar cookies= {this.props.cookies} />
                                    <SecurityQuestionsPage/>
                                </div>


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

                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default withCookies(App);
