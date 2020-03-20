import React, { Component } from "react"
import { Button, Form, Dropdown } from 'semantic-ui-react'
import { withRouter } from "react-router-dom"
import APIManager from "../../modules/APIManager"
// import CompanySearch from "../search/CompanySearch"

class Register extends Component {

    state = {
        company: "",
        companyName: "",
        email: "",
        userName: "",
        firstName: "",
        lastName: "",
        address: "",
        password: "",
        verifyPassword: "",
        companies: [],
        companyExists: true
    }

    toggleForm = (evt) => {
        let toggleSwitch = this.state.companyExists
        toggleSwitch = toggleSwitch ? false : true;
        this.setState({
            companyExists: toggleSwitch
        })

    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleChange = (evt) => {
        this.setState({ value: evt.target.value });
    }

    createCompany = (evt) => {
        const newCompany = {
            "name": this.state.companyName
        }
        APIManager.post("companies", newCompany)
    }

    handleAdminRegister = (evt) => {
        evt.preventDefault()

        const newCompany = {
            "name": this.state.companyName
        }
        APIManager.postNoAuth("companies", newCompany)
            .then((new_company) => {
                console.log("new_company", new_company)

                const new_user = {
                    "username": this.state.userName,
                    "first_name": this.state.firstName,
                    "last_name": this.state.lastName,
                    "email": this.state.email,
                    "password": this.state.password,
                    "department_id": null,
                    "supervisor_id": null,
                    "position": this.state.position,
                    "location": this.state.location,
                    "bio": null,
                    "image_url": null,
                    "tasks": null,
                    "phone": null,
                    "slack": null,
                    "is_admin": true,
                    "company_id": new_company.id
                }
                // Makes a fetch call with newUser object as the body of the POST request
                this.props.registerUser(new_user)
            })
            .then((response) => console.log("register response", response))
            .then(() => this.props.history.push("/home"))
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
        console.log("this.props", this.props)
        return (
            <>
                {this.state.companyExists ?
                    <Form onSubmit={this.handleRegister}>
                        <section>
                            <h3>Step 1: Find Your Company:</h3>
                            <select defaultValue="no" id="companies" value={this.state.value} onChange={this.handleInputChange}>
                                <option value="no" disabled>Select your option</option>
                                {this.state.companies.map(company => {
                                    return <option key={company.key} value={company.key}>{company.text}</option>
                                })}
                            </select>
                            <h3>Step 2: Request Access From Your Company's Administrator</h3>
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
                                    id="position"
                                    type="text"
                                    name="position"
                                    className="form-control"
                                    placeholder="Position / job title"
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
                                <Button type="submit">
                                    Request Access
                            </Button>
                            </Form.Field>
                            <h4>Don't see your company listed?</h4>
                            <Button onClick={this.toggleForm}>Register Your Company</Button>
                        </section>
                    </Form>
                    :
                    <Form onSubmit={this.handleAdminRegister}>
                        <h3>Step 1: Enter Your Company Name</h3>
                        <Form.Field>
                            <input onChange={(evt) => this.handleInputChange(evt)}
                                id="companyName"
                                type="text"
                                name="companyName"
                                className="form-control"
                                placeholder="Company name"
                                required autoFocus />
                        </Form.Field>
                        <h3>Step 2: Create Your Administrator Account</h3>
                        <Form.Field>
                            <input onChange={this.handleInputChange}
                                id="userName"
                                type="text"
                                name="userName"
                                className="form-control"
                                placeholder="Username"
                                required />
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
                                id="location"
                                type="text"
                                name="location"
                                className="form-control"
                                placeholder="Location (city)"
                                required />
                        </Form.Field>
                        <Form.Field>
                                <input onChange={this.handleInputChange}
                                    id="position"
                                    type="text"
                                    name="position"
                                    className="form-control"
                                    placeholder="Position / job title"
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
                    </Form>
                    }
                
            </>
        )
    }
}

export default Register;