import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react'
import './EmployeeAddForm.css'


class EmployeeAddForm extends Component {

    state = {
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        departmentId: null,
        supervisorId: null,
        position: "",
        location: "",
        bio: null,
        image_url: null,
        tasks: null,
        phone: null,
        slack: null,
        is_admin: false,
        departments: [],
        employees: [],
        department: "",
        supervisor: ""
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleSubmit = event => {
        event.preventDefault()
        // if (!event.target.checkValidity()) {
        //     return alert('Complete all fields')
        // } else {
        const newEmployee = {
            email: this.state.email,
            username: this.state.username,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            password: this.state.password,
            department_id: this.state.departmentId,
            supervisor_id: this.state.supervisorId,
            position: this.state.position,
            location: this.state.location,
            bio: this.state.bio,
            image_url: this.state.image_url,
            tasks: this.state.tasks,
            phone: this.state.phone,
            slack: this.state.slack,
            is_admin: false
        }

        APIManager.post('employees', newEmployee)
            .then((response) => {
                this.props.history.push(`/employees/${response.id}`)
            })

    }

    componentDidMount() {
        APIManager.getAll('departments')
            .then(departments => {
                this.setState({ departments })
            })
        APIManager.getAll('employees')
            .then(employees => {
                this.setState({ employees })
            })
    }


    render() {
        console.log("form this.state", this.state)
        return (
            <>
                <h2>Add An Employee</h2>
                <Form onSubmit={this.handleSubmit}>
                    <h3>Employee Info</h3>
                    <Form.Field>
                        <label
                            htmlFor="firstName">First Name<span className="requiredText">(required)</span></label>
                        <input
                            placeholder="First name"
                            id="firstName"
                            type="text"
                            onChange={this.handleInputChange}
                            required autoFocus />
                    </Form.Field>
                    <Form.Field>
                        <label
                            htmlFor="lastName">Last Name<span className="requiredText">(required)</span></label>
                        <input
                            placeholder="Last name"
                            id="lastName"
                            type="text"
                            onChange={this.handleInputChange}
                            required />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="department">Department<span className="requiredText">(required)</span></label>
                        <select id="department" value={this.state.department} onChange={this.handleInputChange}>
                            <option value="" disabled>Select department</option>
                            {this.state.departments.map(department => {
                                return <option key={department.id} value={department.id}>{department.name}</option>
                            })}
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="supervisor">Supervisor<span className="requiredText">(required)</span></label>
                        <select id="supervisor" value={this.state.supervisor} onChange={this.handleInputChange}>
                            <option value="" disabled>Select supervisor</option>
                            {this.state.employees.map(employee => {
                                return <option key={employee.id} value={employee.id}>{employee.user.last_name}, {employee.user.first_name}</option>
                            })}
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label
                            htmlFor="location">Location<span className="requiredText">(required)</span></label>
                        <input
                            placeholder="Location (City)"
                            id="location"
                            type="text"
                            onChange={this.handleInputChange}
                            required />
                    </Form.Field>
                    <Form.Field>
                        <label
                            htmlFor="position">Position / Job Title<span className="requiredText">(required)</span></label>
                        <input
                            placeholder="Position"
                            id="position"
                            type="text"
                            onChange={this.handleInputChange}
                            required />
                    </Form.Field>
                    <Form.Field>
                        <label
                            htmlFor="tasks">Main Work Duties</label>
                        <input
                            placeholder="Duties and tasks"
                            id="tasks"
                            type="text"
                            onChange={this.handleInputChange}
                            required />
                    </Form.Field>
                    <Form.Field>
                        <label
                            htmlFor="bio">Brief Bio</label>
                        <textarea
                            placeholder="A brief bio of the new employee (max: 500 characters)"
                            id="bio"
                            type="textarea"
                            rows="4" cols="50"
                            maxLength="500"
                            onChange={this.handleInputChange}
                            required >
                        </textarea>
                    </Form.Field>
                    <Form.Field>
                        <label
                            htmlFor="phone">Company Phone Number</label>
                        <input
                            placeholder="Company phone number"
                            id="phone"
                            type="text"
                            onChange={this.handleInputChange}
                            required />
                    </Form.Field>
                    <Form.Field>
                        <label
                            htmlFor="slack">Slack Username</label>
                        <input
                            placeholder="Slack username"
                            id="slack"
                            type="text"
                            onChange={this.handleInputChange}
                            required />
                    </Form.Field>
                    <Form.Field>
                        <label
                            htmlFor="imagePath">Profile Image URL
                        </label>
                        <input
                            placeholder="Paste URL here"
                            id="image_url"
                            type="text"
                            onChange={this.handleInputChange}
                            required />
                    </Form.Field>
                    <h3>Create Employee Account</h3>
                    <Form.Field>
                        <label
                            htmlFor="username">Employee's Username
                            <span className="requiredText">(required)</span>
                        </label>
                        <input
                            placeholder="Employee username"
                            id="username"
                            type="text"
                            onChange={this.handleInputChange}
                            required />
                    </Form.Field>
                    <Form.Field>
                        <label
                            htmlFor="email">Employee's Email Address
                            <span className="requiredText">(required)</span>
                        </label>
                        <input
                            placeholder="Company email address"
                            id="email"
                            type="text"
                            onChange={this.handleInputChange}
                            required />
                    </Form.Field>
                    <Form.Field>
                        <label
                            htmlFor="password">Employee's Password
                            <span className="requiredText">(required)</span>
                        </label>
                        <input
                            placeholder="Employee password"
                            id="password"
                            type="text"
                            onChange={this.handleInputChange}
                            required />
                    </Form.Field>
                    <Form.Field>
                        <Button>Submit</Button>
                    </Form.Field>
                </Form>
            </>
        )
    }
}
export default withRouter(EmployeeAddForm);