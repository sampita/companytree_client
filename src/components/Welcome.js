import React, { Component } from "react"
import { Link } from "react-router-dom"
import Login from "./auth/Login"

class Welcome extends Component {

    render() {
        return (
            <>
                <h1>CompanyTree</h1>
                <button><Link to="/login">Login</Link></button>
                <p><Link to="/register">or create an account</Link></p>
            </>
        )
    }
}

export default Welcome