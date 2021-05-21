import React, { Component } from 'react';
import apiLibre from '../api/apiLibre';
import Loader from './../shared/components/Loader';
import ProduitsComp from './../components/ProduitsComp';
import MenuCategoriesComp from './../components/MenuCategoriesComp';

const nbProduitPair = (produits) => {
    if(produits.length % 2 === 1) return <div className="objetProduitVide"></div>
}

class Home extends Component {

    state = {
        produits: [],
        images: [],
        isLoading: true
    }

    componentDidMount() {

        apiLibre.get("/public/products")
                .then((responce) => {
                    this.setState({
                        produits: responce.data                    
                    })
                    apiLibre.get("/public/images")
                    .then((resp) => {
                      this.setState({
                         images: resp.data,
                         isLoading: false
                      })
                    })
                })
    }

    render() {
        const { produits, images, isLoading } = this.state
        if(isLoading) return <Loader/>
        return (
            <div>

                <MenuCategoriesComp/>

                <div className="presentationProduits">
                    {produits.map((produit) => 
                        <ProduitsComp key={produit.id} produit={produit} image={images[produit.id - 1]}/>
                    )}
                    {nbProduitPair(produits)}
                </div>
            </div>
        );
    }
}

export default Home;