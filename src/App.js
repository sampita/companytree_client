import React, { Component } from 'react';
import './App.css';
import ApplicationViews from './components/ApplicationViews'
import { withRouter } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';


class CompanyTree extends Component {

  state = {
    user: false
  }

  isAuthenticated = () => {
    return sessionStorage.getItem("auth_token") !== null
  }

  registerUser = (userInfo) => {
    //creates user, saves user token to sessionStorage, and sets state of user to True
    return fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then(res => res.json())
      .then(res => {
        if ("token" in res) {
          sessionStorage.setItem("auth_token", res.token)
        }
      })
      .then(() => this.setState({
        user: this.isAuthenticated()
      }))
  }

  loginUser = (credentials) => {
    //logs in user, saves user token to sessionStorage, and sets state of user to True
    return fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      .then(res => {
        if ("valid" in res && res.valid && "token" in res) {
          sessionStorage.setItem("auth_token", res.token)
        }
        else window.alert('Incorrect username or password. Please try again.')
      })
      .then(() => this.setState({
        user: this.isAuthenticated()
      }))
  }

  //clears user from sessionStorage and redirects to home page
  logoutUser = () => {
    sessionStorage.removeItem("auth_token")
    this.setState({ user: this.isAuthenticated() })
  }

  render() {
    return (
      <>
        <NavBar 
          logoutUser={this.logoutUser}
          isAuthenticated={this.isAuthenticated} />
        <ApplicationViews
          isAuthenticated={this.isAuthenticated}
          registerUser={this.registerUser}
          loginUser={this.loginUser}
          logoutUser={this.logoutUser} />
      </>
    );
  }
}

export default withRouter(CompanyTree);
