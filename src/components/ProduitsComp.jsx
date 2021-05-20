import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProduitsComp extends Component {
    render() {
        const { produit, image } = this.props
        return (
            <div className="objetProduit">
                <div className="descriptionProduit">
                    <h5>{produit.name}</h5>{produit.price}€
                    <Link className="btn btn-outline-secondary btn-rounded boutonProduit" to={`/Produit/${produit.id}`}>Voir le produit</Link>
                </div>
                <img alt="" src={image.path}></img>
            </div>
        );
    }
}

export default ProduitsComp;