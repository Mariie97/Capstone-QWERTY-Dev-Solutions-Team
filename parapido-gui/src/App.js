
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
                                 <NavBar cookies={this.props.cookies}/>
                                <h1>Landing Page</h1>
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
