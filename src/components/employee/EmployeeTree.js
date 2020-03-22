import React from 'react';
import { JSCharting } from 'jscharting-react';
import APIManager from '../../modules/APIManager';

const getDepartmentById = (id) => {
    const departmentMap = {
        "1": "Human Resources",
        "2": "Finance"
    }
    return id in departmentMap ? departmentMap[id] : null;
}

export default class Tree extends React.Component {
    
    state = {
        config: {
            type: 'organization down',
            // chartArea_fill: [ '#3AB764' ],
            line: { color: '#004080', width: 1 },
            series: [
                {
                    defaultPoint: {
                        focusGlow: { color: '%color', opacity: .3 },
                        label: {
                            text: '<b>%name</b><br/>%data<img margin_left=-60 margin_top=-64 width=64 height=64 src=%img>',
                            autoWrap: false,
                            color: '#004080',
                            margin_left: 60
                        },
                        annotation: {
                            padding: 9,
                            corners: 'round',
                            radius: 15,
                            margin: [15, 5, 10, 0]
                        },
                        outline_width: 0,
                        color: '#b3d9ff',
                        tooltip: '<b>Tasks:</b><br><span style=\'listStyleType: circle; listPadding: 0;\'>%tasks</span>'
                    },
                    // To use information from the database, this should map through an array of people and dynamically populate the desired fields.
                    points: []
                }
            ],
        }
    }
    
    divStyle = {
        height: '100%',
        margin: 'none',
    };

    addHackyLink(id) {
        const ele = document.getElementById(id);
        if (ele) {
            console.log("flag")
            ele.onclick = () => {
                this.props.history.push(`/employees/${id}`);
            }
        }
    
    }

    componentDidMount() {
        APIManager.getAll("employees")
        .then(async response => {
            console.log("response", response)
            response = await JSON.parse(response);
            console.log(response);
            const allEmployees = [];
            for (const employee of response) {
                const fullName = `${employee.first_name} ${employee.last_name}`
                let newItem = {
                    name: `<span id="${employee.id}">${fullName}</span>`,
                    id: `${employee.id}`,
                    attributes: {
                        'data': `<ul><li>${employee.name}</li><li>${employee.position}</li><li><i>${employee.location}</i></li></ul>`,
                        'contact': `<ul><li>email: ${employee.email}</li><li>phone: ${employee.phone}</li><li>slack: ${employee.slack}</li></ul>`
                    }
                }
                if (employee.supervisor_id !== null) {
                    newItem.parent = `${employee.supervisor_id}`
                }
                if (employee.image_url !== null) {
                    newItem.attributes.img = `${employee.image_url}`
                }
                else (newItem.attributes.img = "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png")

                allEmployees.push(newItem);
            }

            let new_config = {
                type: 'organization down',
                // chartArea_fill: [ '#3AB764' ],
                line: { color: '#004080', width: 1 },
                series: [
                    {
                        defaultPoint: {
                            focusGlow: { color: '%color', opacity: .3 },
                            label: {
                                text: '<b>%name</b><br/>%data<img margin_left=-60 margin_top=-64 width=64 height=64 src=%img>',
                                autoWrap: false,
                                color: '#004080',
                                margin_left: 60
                            },
                            annotation: {
                                padding: 9,
                                corners: 'round',
                                radius: 15,
                                margin: [15, 5, 10, 0]
                            },
                            outline_width: 0,
                            color: '#b3d9ff',
                            tooltip: '<b>Contact:</b><br><span style=\'listStyleType: circle; listPadding: 0;\'>%contact</span>'
                        },
                        // To use information from the database, this should map through an array of people and dynamically populate the desired fields.
                        points: allEmployees
                    }
                ],
                height: 500
            }
            this.setState({
                config: new_config
            });
            window.setTimeout(() => {
                if (this.state.config) {
                    this.state.config.series[0].points.forEach(card => {
                        this.addHackyLink(card.id);
                    })
                 }
            }, 500)
        })
    }

    render() {
        console.log("this.state", this.state)
        return (
            <div style={this.divStyle} ><JSCharting options={this.state.config} /></div>
        );
    }
}