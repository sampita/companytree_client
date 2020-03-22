import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Button } from 'semantic-ui-react'
import Logo from "./logo.png";
import './NavBar.css';
// import APIManager from '../../modules/APIManager'

class NavBar extends Component {
    
    render() {
        return (
            <header>
                <nav id="navbar">
                    <ul className="navbar flex">
                        <li className="nav"><Link className="nav-link" to="/"><img src={Logo} alt={"bangazon logo"} id="smallLogo" /></Link></li>

                    {this.props.isAuthenticated()
                        ? <li className="nav"><Link className="nav-link" to="/adddepartment">+ Add Department</Link></li>
                        : null}

                    {this.props.isAuthenticated()
                            ? <li className="nav"><Link className="nav-link" to="/addemployee">+ Add Employee</Link></li>
                            : null}

                        
                    {this.props.isAuthenticated()
                        ?
                        <li className="nav"><Button className="nav-link" onClick={this.props.logoutUser}>Logout</Button></li>

                        : <li className="nav"><Button><Link className="nav-link" to="/login">Login</Link></Button></li>
                    }
                    </ul>
                </nav>
            </header >
        )
    }
}

export default NavBar;