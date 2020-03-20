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
            toolbar_items: {
                "Click Me": {
                    events_click: function () {
                        alert("Button clicked");
                    }
                }
            },
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

    componentDidMount() {
        APIManager.getAll("employees")
        .then(response => {
            console.log("response", response)
            const allEmployees = [];
            for (const employee of response) {
                let newItem = {
                    name: `${employee.user.first_name} ${employee.user.last_name}`,
                    id: `${employee.id}`,
                    attributes: {
                        'data': `<ul><li>${getDepartmentById(employee.department_id)}</li><li>${employee.position}</li><li><i>${employee.location}</i></li></ul>`,
                        'tasks': `<ul><li>email: ${employee.user.email}</li><li>phone: ${employee.phone}</li><li>slack: ${employee.slack}</li></ul>`
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
                // toolbar_items: {
                //     "Click Me": {
                //         events_click: function () {
                //             alert("Button clicked");
                //         }
                //     }
                // },
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
                        points: allEmployees
                    }
                ],
                height: 500
            }
            this.setState({
                config: new_config
            });
        })
    }

    render() {
        console.log("this.state", this.state)
        return (
            <div style={this.divStyle} ><JSCharting options={this.state.config} /></div>
        );
    }
}