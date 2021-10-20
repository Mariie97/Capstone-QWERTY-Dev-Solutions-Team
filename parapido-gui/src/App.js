import './App.css';
import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {withCookies} from "react-cookie";
import LoginPage from "./Components/LoginPage";
import DashboardPage from "./Components/DashboardPage";
import UserRegistrationPage from "./Components/UserRegistrationPage";


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const is_auth = localStorage.getItem('is_auth') === 'true';
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={() => (
                                <h1>Landing Page</h1>
                            )}
                        />
                        <Route
                            exact
                            path='/login'
                            render={() => (
                                is_auth ?
                                    <Redirect to='/dashboard'/> :
                                    <LoginPage />
                            )}
                        />
                        <Route
                            exact
                            path='/dashboard'
                            render={() => (
                                <DashboardPage cookies={this.props.cookies} />
                            )}
                        />

                        <Route

                            exact
                            path='/signup'
                            render={() => (
                                <div>
                                    <UserRegistrationPage/>
                                </div>


                            )}
                        />

                    </Switch>
                </div>
            </BrowserRouter>

        );
    }
}

export default withCookies(App);
