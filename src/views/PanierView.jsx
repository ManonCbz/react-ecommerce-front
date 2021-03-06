import React, { Component } from 'react';
import Loader from './../shared/components/Loader';
import { Link } from 'react-router-dom';
import apiLibre from './../api/apiLibre';
import ProduitPanierComp from './../components/ProduitPanierComp';
import apiToken from './../api/apiToken';
import { Formik, Form } from 'formik';

const initialValues = {
    products: [],
    customer: '',
    price: 0
}
class PanierView extends Component {

    state = {
        panier: [],
        images: [],
        total: 0,
        utilisateur: false,
        isLoading: true
    }

    componentDidMount() {

        if(localStorage.getItem("token")) {
            this.setState({utilisateur: true})
            apiToken.get("/public/account")
            .then((resp) => {
                 initialValues.customer = resp.data
            })
            .catch()
        }

        if(localStorage.getItem("panier")) {

            JSON.parse(localStorage.getItem("panier")).map((produit) => 
                this.setState({ total: this.state.total += produit.price }),
                initialValues.price = this.state.total
            )

            apiLibre.get("/public/images/")
            .then((resp) => {
                this.setState({
                    images: resp.data,
                    panier: JSON.parse(localStorage.getItem("panier")), 
                    isLoading:false
                })
            })
        }
    }

    submit = (values, {setSubmitting}) => {
        console.log("ok !")
    }

    retirerPanier = (produit) => {
        var panier = this.state.panier
        var index = -1
        for (var i = 0; i < panier.length; i++) {
            if(panier[i] === produit) {
                index = i
                break
            }
        }
        panier.splice(index, 1)
        localStorage.setItem("panier", JSON.stringify(panier));
        window.location.reload();
    }

    contenuPanier = (panier) => {
        if(panier.length > 0) {
            return (
                <>
                    {panier.map((produit) => 
                        <>
                            <ProduitPanierComp key={produit.id} produit={produit} retirerPanier={this.retirerPanier} image={this.state.images[produit.id - 1]}/>
                        </>  
                    )}
                </>
            )}
        else {
            return (
                <div className="container d-flex flex-column">
                    <p>Votre panier est vide</p>
                    <Link to="/">Voir les produits</Link>
                </div>
            )
        }
    }

    render() {
        const { panier, total, utilisateur, isLoading } = this.state
        if(isLoading) return <Loader/>
        return (
            <div className="row justify-content-between viewportPanier">
                <div className="col-8 p-5 element">
                    <p className="h5">Votre panier</p>
                    <hr/>
                    <div className="menuPanier">
                        {this.contenuPanier(panier)}
                    </div>
                    <hr/>
                    <h5 className="d-flex justify-content-end">Total : {total}???</h5>
                </div>
                <div className="col-3 p-5 element">
                    <p className="h5">R??sum?? commande :</p>
                    <ul className="mt-4">
                        {panier.map((p) => <li>{p.name}</li> )}
                    </ul>
                    <h6 className="d-flex justify-content-end">Total : {total}???</h6>
                    {utilisateur ? 
                    
                    <Formik initialValues = {initialValues} onSubmit={this.submit}>
                    {({isSubmitting}) => (
                    <Form>
                        <button type="submit" disabled={isSubmitting} className="btn btn-warning btn-block mt-4">Valider le panier</button>
                    </Form>
                    )}
                    </Formik>
                    : 
                    <Link className="mt-5" to="/Connexion">Connectez-vous pour valider votre panier</Link> }
                </div>
            </div>
        );
    }
}

export default PanierView;