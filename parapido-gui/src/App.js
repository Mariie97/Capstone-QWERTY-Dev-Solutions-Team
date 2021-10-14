
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { withCookies } from "react-cookie";
import LandingPage from "./Components/LandingPage";
import ProfilePage from "./Components/ProfilePage";
import JobDashboardPage from "./Components/JobDashboardPage";
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
                    <LandingPage />          
                    </React.Fragment>
                )}
                    />

                {is_auth?
                    <div>
                    <Route
                    exact
                    path='/profile'
                    render={() => (

                    <React.Fragment>
                    <NavBar cookies= {this.props.cookies} />
                    <ProfilePage  cookies={this.props.cookies}/>
                    </React.Fragment>

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

                    <Route
                    exact
                    path='/jobdashboard'
                    render={() => (
                    <React.Fragment>
                    <NavBar cookies= {this.props.cookies} />
                    <JobDashboardPage />
                    </React.Fragment>
                )}
                    />
                    </div>: <Redirect to=""/>                          
                        
                        
                        }


                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default withCookies(App);
