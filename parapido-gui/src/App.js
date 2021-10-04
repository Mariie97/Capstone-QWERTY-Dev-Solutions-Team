
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import {withCookies} from "react-cookie";
import LoginPage from "./Components/LoginPage";
import DashboardPage from "./Components/DashboardPage";
import NavBar from './Components/NavBar';



class App extends React.Component {
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
                                <React.Fragment>
                                <NavBar />
                                <h1>Landing Page</h1>
                                </React.Fragment>
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
                            path='/jobdashboard'
                            render={() => (
                                <DashboardPage cookies={this.props.cookies} />
                            )}
                        />

                    </Switch>
                </div>
            </BrowserRouter>

        );
    }
}

export default withCookies(App);
