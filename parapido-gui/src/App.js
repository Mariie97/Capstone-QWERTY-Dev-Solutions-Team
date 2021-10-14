import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import {withCookies} from "react-cookie";
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
                                    <NavBar cookies={this.props.cookies}/>
                                    <h1>Landing Page</h1>
                                </React.Fragment>
                            )}
                        />
                        <Route
                            exact
                            path='/jobdashboard'
                            render={() => (
                                <React.Fragment>
                                    <DashboardPage/>
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
