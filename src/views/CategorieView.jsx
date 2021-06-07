import React, { Component } from 'react';
import apiLibre from '../api/apiLibre';
import MenuCategoriesComp from '../components/MenuCategoriesComp';
import ListeProduitCategorieComp from './../components/ListeProduitCategorieComp';

class CategorieView extends Component {

    state = {
        produits: [],
        images: []
    }   

    componentDidMount() {

        const type = this.props.match.params.type
        apiLibre.get("/public/products/" + type)
                .then(resp => {

                })
    }

    render() {
        const {produits, images} = this.state
        return (
            <div>
                <MenuCategoriesComp/>
                <ListeProduitCategorieComp produits={produits} images={images} />
            </div>
        );
    }
}

export default CategorieView;