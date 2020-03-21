import React, { Component } from "react"
import { Link } from "react-router-dom"
import APIManager from "../../modules/APIManager"
import { Button } from 'semantic-ui-react'


class EmployeeDetails extends Component {
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
        supervisor: "",
        editMode: false
    }

    getDepartmentName() {
        const departmentsArray = this.state.departments
        let filteredDepartment = departmentsArray.filter(department => department.id===this.state.department_id)
        return filteredDepartment.length > 0 && filteredDepartment[0].name
    }

    getSupervisorName() {
        const supervisorArray = this.state.employees
        let filteredSupervisor = supervisorArray.filter(supervisor => supervisor.id===this.state.supervisor_id)
        return filteredSupervisor.length > 0 && `${filteredSupervisor[0].user.first_name} ${filteredSupervisor[0].user.last_name}`
    }

    deleteEmployee() {
        APIManager.delete("employees", this.props.match.params.employeeId)
            .then(() => this.props.history.push('/home'))
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
                                slack: employee.slack
                            })
                })

        APIManager.getAll("departments")
            .then((departments) => this.setState({
                departments: departments
            }))
        
            APIManager.getAll("employees")
                .then((employees) => this.setState({
                    employees: employees
                }))
    }
    

    render() {
        console.log("state", this.state)
        return (
            <>
                <main>
                    <img src={this.state.image_url} alt={"employee_profile_photo"} id="profilePhoto" />
                    <h2>{this.state.first_name} {this.state.last_name}</h2>
                    <h3>{this.state.position}</h3>
                    <h4>{this.getDepartmentName()} Department</h4>
                    <p>Supervisor: {this.getSupervisorName()}</p>
                    <h4>Bio</h4>
                    <p>{this.state.bio}</p>
                    <h4>Tasks & Duties</h4>
                    <p>{this.state.tasks}</p>
                    <section>
                        <h3>Contact Info</h3>
                            <ul>
                                <li>Office Phone: {this.state.phone}</li>
                                <li>Office Email: {this.state.email}</li>
                                <li>Slack Handle: @{this.state.slack}</li>
                            </ul>
                        
                    </section>
                </main>
                <Button><Link to={`/employee/${this.props.match.params.employeeId}/edit`}>Edit Employee</Link></Button>
                <Button onClick={this.deleteEmployee.bind(this)}>Delete Employee</Button>
            </>
        )
    }
}

export default EmployeeDetails