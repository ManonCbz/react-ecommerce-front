import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Deconnexion extends Component {
    render() {
        if(localStorage.getItem("token")) {  
            localStorage.removeItem("token")
            window.location.reload()
        }
        return (
            <Redirect to="/"/>
        );
    }
}

export default Deconnexion;