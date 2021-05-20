import React, { Component } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup'
import { Redirect } from 'react-router';
import apiLibre from '../api/apiLibre';
import apiToken from './../api/apiToken';

const initialValues = {
    username: '',
    password: ''
}

const validationSchema = yup.object().shape({
    username:  yup.string().required(),
    password:  yup.string().required()
})

class ConnexionView extends Component {
    
    state = {
        redirection: false
    }

    submit = (values, {setSubmitting}) => {
        apiLibre.post('/authenticate', values)
        .then( resp => {
            setSubmitting(false)
            localStorage.setItem('token', resp.data.id_token)
            apiToken.get("/public/account")
                    .then((r) => {
                        this.setState({redirection: true})
                    })
                    .catch()
        })
        .catch()
    }

    render() {
        if(this.state.redirection === true) {
            window.location.reload();
        }
        if(localStorage.getItem("token")) {  
            this.setState({redirection: false})
            return <Redirect to="/Home"/>
        }
        return (
            <div>
                <Formik initialValues = {initialValues} onSubmit={this.submit} validationSchema={validationSchema}>
                    {({isSubmitting}) => (
                    <Form className="container connexionForm">
                        <div>
                            <Field type="text" name="username" placeholder="Pseudo" className="form-control mt-3"></Field>
                            <ErrorMessage name="username" component="small" className="text-danger float-left"/>

                            <Field type="password" name="password" placeholder="Mot de Passe" className="form-control mt-3"></Field>
                            <ErrorMessage name="password" component="small" className="text-danger float-left"/>
                        </div>
                        <div className="text-center mt-4">
                            <button type="submit" disabled={isSubmitting} className="btn btn-warning btn-sm">Submit</button>
                        </div>
                    </Form>
                    )}
                </Formik>

            </div>
        );
    }
}

export default ConnexionView;