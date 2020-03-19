import React, { Component } from 'react';
import { Route, Redirect, withRouter } from "react-router-dom";
import Welcome from './Welcome';
import Login from './auth/Login';
import Register from './auth/Register';

class ApplicationViews extends Component {

    render() {
        return (
            <>
                <Route exact path="/" render={(props) => {
                    return <Welcome 
                    {...props}
                    {...this.props} />
                }} />
                <Route exact path="/login" render={(props) => {
                    return <Login 
                    {...props}
                    {...this.props} />
                }} />
                <Route exact path="/register" render={(props) => {
                    return <Register
                    {...props}
                    {...this.props} />
                }} />
            </>
        )
    }
}

export default ApplicationViews;