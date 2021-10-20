import './App.css';
import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {withCookies} from "react-cookie";
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
