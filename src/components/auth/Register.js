import React, { Component } from "react"
import { Button, Form, Dropdown } from 'semantic-ui-react'
import { withRouter } from "react-router-dom"
import APIManager from "../../modules/APIManager"
// import CompanySearch from "../search/CompanySearch"

class Register extends Component {

    state = {
        company: "",
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
        stateToChange["company"] = evt.target.value
        this.setState(stateToChange)
    }

    handleInputChange2 = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleChange = (evt) => {
        this.setState({ value: evt.target.value });
    }

    handleRegister = (evt) => {
        evt.preventDefault()

        // Creates object with values from state
        const newUser = {
            "username": this.state.userName,
            "first_name": this.state.firstName,
            "last_name": this.state.lastName,
            "address": this.state.address,
            "email": this.state.email,
            "password": this.state.password,
            "company": this.state.company
        }

        // Makes a fetch call with newUser object as the body of the POST request
        this.props.registerUser(newUser)
            .then((response) => console.log("register response", response))
            .then(() => this.props.history.push("/"))
    }

    componentDidMount() {
        APIManager.getAllNoAuth("companies").then(response => {
            const newCompanies = [];
            for (const item of response) {
                let newItem = { key: `${item.id}`, text: `${item.name}` }
                newCompanies.push(newItem);
            }
            const uniqueCompanies = [...new Set(newCompanies)]
            this.setState({
                companies: uniqueCompanies
            });
        });
    }
    render() {
        console.log("this.state", this.state)
        return (
            <>
                <Form onSubmit={this.handleRegister}>
                    <section>
                        <h3>Step 1: Find Your Company:</h3>
                        <Dropdown
                            id="company"
                            placeholder='Select Company'
                            fluid
                            search
                            selection
                            options={this.state.companies}
                            onChange={(evt) => this.handleChange}
                            value={this.state.value}
                        />
                        <h4>Don't see your company listed?</h4>
                        <Button>Register Your Company</Button>
                        {/* <CompanySearch
                            handleInputChange={this.handleInputChange}
                            handleChange={this.handleChange}
                        /> */}
                    </section>
                    <br />
                    <section>
                        <h3>Step 2: Create Your Administrator Account</h3>
                        <Form.Field>
                            <input onChange={(evt) => this.handleInputChange(evt)}
                                id="userName"
                                type="text"
                                name="userName"
                                className="form-control"
                                placeholder="Username"
                                required autoFocus />
                        </Form.Field>
                        <Form.Field>
                            <input onChange={this.handleInputChange}
                                id="firstName"
                                type="text"
                                name="firstName"
                                className="form-control"
                                placeholder="First name"
                                required />
                        </Form.Field>
                        <Form.Field>
                            <input onChange={this.handleInputChange}
                                id="lastName"
                                type="text"
                                name="lastName"
                                className="form-control"
                                placeholder="Last name"
                                required />
                        </Form.Field>
                        <Form.Field>
                            <input onChange={this.handleInputChange}
                                id="address"
                                type="text"
                                name="address"
                                className="form-control"
                                placeholder="Location"
                                required />
                        </Form.Field>
                        <Form.Field>
                            <input onChange={this.handleInputChange}
                                id="email"
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email address"
                                required />
                        </Form.Field>
                        <Form.Field>
                            <input onChange={this.handleInputChange}
                                id="password"
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                required />
                        </Form.Field>
                        <Form.Field>
                            <input onChange={this.handleInputChange}
                                id="verifyPassword"
                                type="password"
                                name="verifyPassword"
                                className="form-control"
                                placeholder="Verify password"
                                required />
                        </Form.Field>
                        <Form.Field>
                            <Button type="submit">
                                Create Account
                                </Button>
                        </Form.Field>
                    </section>
                </Form>
            </>
        )
    }
}

export default Register;