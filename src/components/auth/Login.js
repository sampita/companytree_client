import React, { Component } from "react"
import { Link } from "react-router-dom"

class Login extends Component {

    state = {
        username: "",
        password: ""
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = event => {
        event.preventDefault()

        const credentials = {
            "username": this.state.username,
            "password": this.state.password
        }

        this.props.loginUser(credentials)
            .then(() => this.props.history.push("/"))
    }

    render() {
        console.log("login props", this.props)
        return (
            <>
                <form className="form--login" onSubmit={this.handleLogin}>
                    <h1>Login</h1>
                    <fieldset>
                        <input onChange={(evt) => this.handleInputChange(evt)}
                            id="username"
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="Username"
                            required autoFocus />
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
                        <button type="submit">
                            Login
                    </button>
                    </fieldset>
                </form>
                <p><Link to="/register">or create an account</Link></p>
            </>
        )
    }
}

export default Login