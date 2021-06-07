import React, { Component } from 'react';
import ProduitsComp from './ProduitsComp';

const nbProduitPair = (produits) => {
    if(produits.length % 2 === 1) return <div className="objetProduitVide"></div>
}

class ListeProduitCategorieComp extends Component {

    render() {
        const { produits, images } = this.props
        return (
            <div className="presentationProduits">
                {produits.map((produit) => 
                    <ProduitsComp key={produit.id} produit={produit} image={images[produit.id - 1]}/>
                )}
                {nbProduitPair(produits)}
        </div>
        );
    }
}

export default ListeProduitCategorieComp;