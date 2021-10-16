import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {withCookies} from "react-cookie";
import LoginPage from "./Components/LoginPage";
import DashboardPage from "./Components/DashboardPage";
import UserRegistrationPage from "./Components/UserRegistrationPage";
import LandingPage from "./Components/LandingPage"
import ProfilePage from "./Components/ProfilePage";
import JobDashboardPage from "./Components/JobDashboardPage";
import NavBar from './Components/NavBar';


class App extends React.Component {


    constructor(props) {
        super(props);
    }

    state = {
        fields: {}
    };

    onChange = (updatedValue) =>{

        this.setState({fields:{
                ...this.state.fields,
                ...updatedValue
            }})

    };
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
                            path='/signup'
                            render={() => (
                                <div>
                                    <UserRegistrationPage onChange={fields => this.onChange(fields)}/>
                                <p>
                            {JSON.stringify(this.state.fields, null, 2)}
                                </p>

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
