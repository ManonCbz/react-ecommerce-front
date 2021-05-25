import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProduitPanierComp extends Component {
    render() {
        const { produit, image, retirerPanier } = this.props
        return (
            <div className="container row mt-4 p-4 border-bottom border-top">
                <img alt="" src={image.path} className="col-3"></img>
                <div className="">
                    <h5>{produit.name}</h5>
                    <span>{produit.price}€</span>
                    <Link className="btn btn-outline-secondary btn-rounded ml-5" to={`/Produit/${produit.id}`}>Voir le produit</Link>
                    <button className="btn btn-outline-warning ml-1" onClick={() => retirerPanier(produit)}>Retirer du panier</button>
                </div>
            </div>
        );
    }
}

export default ProduitPanierComp;