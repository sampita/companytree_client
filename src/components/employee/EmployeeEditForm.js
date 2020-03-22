import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Button, Form } from 'semantic-ui-react'


class EmployeeDetailsEdit extends Component {
    // also this contains the form to add an itinerary item
    state = {
        first_name: "",
        last_name: "",
        email: "",
        department_id: "",
        supervisor_id: "",
        position: "",
        location: "",
        bio: "",
        image_url: "",
        tasks: "",
        phone: "",
        slack: "",
        is_admin: "",
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

    
    componentDidMount() {
        APIManager.get("employees", this.props.match.params.employeeId)
        .then((employee) => {
            console.log("employee response", employee)
            this.setState({
                first_name: employee.user.first_name,
                last_name: employee.user.last_name,
                email: employee.user.email,
                department_id: employee.department_id,
                supervisor_id: employee.supervisor_id,
                position: employee.position,
                location: employee.location,
                bio: employee.bio,
                image_url: employee.image_url,
                tasks: employee.tasks,
                phone: employee.phone,
                slack: employee.slack,
                is_admin: employee.is_admin
            })
        })
        
        APIManager.getAll("departments")
        .then((departments) => this.setState({
            departments: departments
        }))
        
        APIManager.getAll("employees")
        .then(async (employees) => {
            employees=await JSON.parse(employees)
            this.setState({
                employees: employees
            })
    })
    }
    
    handleSubmit() {
        const updatedEmployee = {
            department_id: Number(this.state.department_id),
            supervisor_id: Number(this.state.supervisor_id),
            position: this.state.position,
            location: this.state.location,
            bio: this.state.bio,
            image_url: this.state.image_url,
            tasks: this.state.tasks,
            phone: this.state.phone,
            slack: this.state.slack,
            is_admin: this.state.is_admin
        }

        APIManager.put("employees", updatedEmployee, this.props.match.params.employeeId)
            .then(() => this.props.history.push(`/employees/${this.props.match.params.employeeId}`))
    }

    render() {
        console.log("state edit", this.state)
        return (
            <>
                <main>
                <h1>Edit Employee</h1>
                <h2>{this.state.first_name} {this.state.last_name}</h2>
                <img src={this.state.image_url} alt={"employee_profile_photo"} id="profilePhoto" />
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Field>
                            <label
                                htmlFor="image_url">Profile Image URL
                        </label>
                            <input
                                value={this.state.image_url}
                                placeholder="Paste URL here"
                                id="image_url"
                                type="text"
                                onChange={this.handleInputChange}
                                required />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="department">Department</label>
                            <select id="department_id" value={this.state.department_id} onChange={this.handleInputChange}>
                                <option value="" disabled>Select department</option>
                                {this.state.departments.map(department => {
                                    return <option key={department.id} value={department.id}>{department.name}</option>
                                })}
                            </select>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="supervisor">Supervisor</label>
                            <select id="supervisor_id" value={this.state.supervisor_id} onChange={this.handleInputChange}>
                                <option value="" disabled>Select supervisor</option>
                                {this.state.employees.map(employee => {
                                    return <option key={employee.id} value={employee.id}>{employee.last_name}, {employee.first_name}</option>
                                })}
                            </select>
                        </Form.Field>
                        <Form.Field>
                            <label
                                htmlFor="location">Location</label>
                            <input
                                value={this.state.location}
                                placeholder="Location (City)"
                                id="location"
                                type="text"
                                onChange={this.handleInputChange}
                                required />
                        </Form.Field>
                        <Form.Field>
                            <label
                                htmlFor="position">Position / Job Title</label>
                            <input
                                value={this.state.position}
                                placeholder="Position"
                                id="position"
                                type="text"
                                onChange={this.handleInputChange}
                                required />
                        </Form.Field>
                        <Form.Field>
                            <label
                                htmlFor="bio">Brief Bio</label>
                            <textarea
                                value={this.state.bio}
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
                                htmlFor="tasks">Main Work Duties</label>
                            <input
                                value={this.state.tasks}
                                placeholder="Duties and tasks"
                                id="tasks"
                                type="text"
                                onChange={this.handleInputChange}
                                required />
                        </Form.Field>
                        <Form.Field>
                            <label
                                htmlFor="phone">Company Phone Number</label>
                            <input
                                value={this.state.phone}
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
                                value={this.state.slack}
                                placeholder="Slack username"
                                id="slack"
                                type="text"
                                onChange={this.handleInputChange}
                                required />
                        </Form.Field>     
                        <Form.Field>
                            <label
                                htmlFor="imagePath"><span className="requiredText">Has Administrator Access</span>
                            </label>
                            <select id="is_admin" value={this.state.is_admin} onChange={this.handleInputChange}>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </Form.Field>
                        <Form.Field>
                            <Button>Submit</Button>
                        </Form.Field>
                    </Form>
                </main>
            </>
        )
    }
}

export default EmployeeDetailsEdit