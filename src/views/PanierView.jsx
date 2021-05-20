import React, { Component } from 'react';
import Loader from './../shared/components/Loader';
import { Link } from 'react-router-dom';

class PanierView extends Component {

    state = {
        panier: [],
        utilisateur: false,
        isLoading: false
    }

    componentDidMount() {
        if(localStorage.getItem("token")) {
            this.setState({utilisateur: true})
        }
    }

    contenuPanier = (panier) => {

        const utilisateur = this.state.utilisateur

        if(panier.length > 0) {
            return (
                <>
                </>
            )
            }
        else {
            return (
                <div className="container d-flex flex-column">
                    <p>Votre panier est vide</p>
                    <Link to="/">Voir les produits</Link>
                    {!utilisateur && <Link to="/Connexion">Se connecter</Link>}
                </div>
            )
        }
    }

    render() {
        const { panier, isLoading } = this.state
        if(isLoading) return <Loader/>
        return (
            <div className="row justify-content-between viewportPanier">
                <div className="col-8 p-5 element">
                    <p class="h5">Votre panier</p>
                    <hr/>
                    { this.contenuPanier({panier}) }
                    <hr/>
                    <h5 className="d-flex justify-content-end">Total : 0€</h5>
                </div>
                <div className="col-3 p-5 element">
                    <p class="h5">Résumé commande :</p>
                </div>
            </div>
        );
    }
}

export default PanierView;