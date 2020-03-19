import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import CompanySearch from "../search/CompanySearch"

class Register extends Component {

    state = {
        email: "",
        userName: "",
        firstName: "",
        lastName: "",
        address: "",
        password: "",
        verifyPassword: "",
        companies: []
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleRegister = event => {
        event.preventDefault()

        // Creates object with values from state
        const newUser = {
            "username": this.state.userName,
            "first_name": this.state.firstName,
            "last_name": this.state.lastName,
            "address": this.state.address,
            "email": this.state.email,
            "password": this.state.password
        }

        // Makes a fetch call with newUser object as the body of the POST request
        this.props.registerUser(newUser)
            .then((response) => console.log("register response", response))
            .then(() => this.props.history.push("/"))
    }

    render() {
        return (
            <>
                <section>
                    <label>Find Your Company:</label>
                    <CompanySearch/>
                </section>
                <br />
                <form onSubmit={this.handleRegister}>
                    <h1>Sign Up</h1>
                    <fieldset>
                        <input onChange={(evt) => this.handleInputChange(evt)}
                            id="userName"
                            type="text"
                            name="userName"
                            className="form-control"
                            placeholder="Username"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <input onChange={this.handleInputChange}
                            id="firstName"
                            type="text"
                            name="firstName"
                            className="form-control"
                            placeholder="First name"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <input onChange={this.handleInputChange}
                            id="lastName"
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="Last name"
                            required />
                    </fieldset>
                    <fieldset>
                        <input onChange={this.handleInputChange}
                            id="address"
                            type="text"
                            name="address"
                            className="form-control"
                            placeholder="Location"
                            required />
                    </fieldset>
                    <fieldset>
                        <input onChange={this.handleInputChange}
                            id="email"
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email address"
                            required />
                    </fieldset>
                    <fieldset>
                        <input onChange={this.handleInputChange}
                            id="password"
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset>
                        <input onChange={this.handleInputChange}
                            id="verifyPassword"
                            type="password"
                            name="verifyPassword"
                            className="form-control"
                            placeholder="Verify password"
                            required />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Register
                        </button>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default Register;