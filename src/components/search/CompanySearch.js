// CompanySearch module searches existing Companies

import React, { Component } from "react";
import { Dropdown } from 'semantic-ui-react';
import APIManager from "../../modules/APIManager";

class CompanySearch extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        companies: [],
        // value: "Search for your company"
    };

    componentDidMount() {
        APIManager.getAllNoAuth("companies").then(response => {
            const newCompanies = [];
            for (const item of response) {
                let newItem = {key: `${item.id}`, text: `${item.name}`}
                newCompanies.push(newItem);
            }
            const uniqueCompanies = [...new Set(newCompanies)]
            this.setState({
                companies: uniqueCompanies
            });
        });
    }

    //   Updates state 
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    //   Currently a pop-up that shows which company was chosen
    handleSubmit(event) {
        alert("You chose: " + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <Dropdown
                placeholder='Select Company'
                fluid
                search
                selection
                options={this.state.companies}
            />
            // <form onSubmit={this.handleSubmit}>
            //     <label>Find Your Company:</label>
            //         <select value={this.state.value} onChange={this.handleChange}>
            //             {this.state.companies.map((company, index) => (
            //                 <option onClick={this.handleChange} key={index} value={company}>
            //                     {company}
            //                 </option>
            //             ))}
            //         </select>
            //     <input type="submit" value="Submit" />
            // </form>
        );
    }
}

export default CompanySearch;