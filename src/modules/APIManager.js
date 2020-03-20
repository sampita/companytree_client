const remoteURL = "http://localhost:8000";


export default {

    get(endpoint, id) {
        return fetch(`${remoteURL}/${endpoint}/${id}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${sessionStorage.getItem("auth_token")}`
            }
        }).then(result => result.json());
    },
    
    getAll(endpoint) {
        return fetch(`${remoteURL}/${endpoint}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${sessionStorage.getItem("auth_token")}`
            }
        }).then(result => result.json());
    },

    delete(endpoint, id) {
        return fetch(`${remoteURL}/${endpoint}/${id}`, {
            "method": "DELETE",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${sessionStorage.getItem("auth_token")}`
            }
        });
    },
    
    put(route, editedItem, id) {
        return fetch(`${remoteURL}/${route}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem("auth_token")}`
            },
            body: JSON.stringify(editedItem)
        })
        // .then(data => data.json());
    },
    
    post(endpoint, object) {
        return fetch(`${remoteURL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${sessionStorage.getItem("auth_token")}`
            },
            body: JSON.stringify(object)
        }).then(data => data.json())
    },
    
    patch(endpoint, editedItem, id) {
        return fetch(`${remoteURL}/${endpoint}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem("auth_token")}`
            },
            body: JSON.stringify(editedItem)
        }).then(data => data.json());
    },

    // ************ no auth_token required for the following functions ****************

    getNoAuth(endpoint, id) {
        return fetch(`${remoteURL}/${endpoint}/${id}`, {
            "method": "GET"
        }).then(result => result.json());
    },

    getAllNoAuth(endpoint) {
        return fetch(`${remoteURL}/${endpoint}`, {
            "method": "GET"
        })
        .then(result => result.json());
    },

    postNoAuth(endpoint, object) {
        return fetch(`${remoteURL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(object)
        }).then(data => data.json())
    },


    // profile_update(route, editedItem) {
    //     return fetch(`${remoteURL}/${route}/profile_update`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Token ${sessionStorage.getItem("auth_token")}`
    //         },
    //         body: JSON.stringify(editedItem)
    //     })
    //     // .then(data => data.json());
    // },

};