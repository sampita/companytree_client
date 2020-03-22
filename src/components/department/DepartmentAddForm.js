import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react'
import '../employee/EmployeeAddForm.css'


class DepartmentAddForm extends Component {

    state = {
        departments: [],
        name: "",
        colorHex: ""
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleSubmit = event => {
        event.preventDefault()
        const newDepartment = {
            name: this.state.name,
            colorHex: this.state.colorHex
        }

        APIManager.post('departments', newDepartment)
            .then(APIManager.getAll('departments'))
                .then(departments => {
                    this.props.history.push('/home')
        })
    }

    componentDidMount() {
        APIManager.getAll('departments')
            .then(departments => {
                this.setState({ departments })
            })
    }


    render() {
        console.log("form this.state", this.state)
        return (
            <>
                <h2>Add A Department</h2>
                <h3>Existing Departments</h3>
                {this.state.departments.map(department => {
                                return <p key={department.id}>{department.name}</p>
                })}
                <br/>
                <Form onSubmit={this.handleSubmit}>
                    <h3>New Department Info</h3>
                    <Form.Field>
                        <label
                            htmlFor="name">Name<span className="requiredText">(required)</span></label>
                        <input
                            placeholder="Department name"
                            id="name"
                            type="text"
                            onChange={this.handleInputChange}
                            required autoFocus />
                    </Form.Field>
                    <Form.Field>
                        <label
                            htmlFor="colorHex">Color Hexadecimal Value<span className="requiredText">(required)</span></label>
                        <input
                            placeholder="Ex: FFFFFF"
                            id="colorHex"
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
export default withRouter(DepartmentAddForm);