import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import Welcome from './Welcome';
import Login from './auth/Login';
import Register from './auth/Register';
import Tree from './employee/EmployeeTree';

class ApplicationViews extends Component {

    render() {
        return (
            <>
                <Route exact path="/" render={(props) => {
                    if (!this.props.isAuthenticated()) {
                        return <Welcome
                            {...props}
                            {...this.props} />
                    } else {
                        return <Redirect to="/home" />
                    }
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
                <Route exact path="/home" render={(props) => { 
                    if (this.props.isAuthenticated()) {
                        return <Tree
                            {...props}
                            {...this.props} />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
            </>
        )
    }
}

export default ApplicationViews;