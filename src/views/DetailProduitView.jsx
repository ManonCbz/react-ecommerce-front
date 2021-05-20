import React, { Component } from 'react';
import Loader from '../shared/components/Loader';
import apiLibre from './../api/apiLibre';
import MenuCategoriesComp from './../components/MenuCategoriesComp';

class DetailProduitView extends Component {

    state = {
        produit: '',
        image: '',
        isLoading: true
    }

    componentDidMount(){
        const id = this.props.match.params.id

        apiLibre.get("/public/products/" + id)
                .then(responce => {
                    this.setState({
                        produit: responce.data,
                    })
                    apiLibre.get("/public/images/" + id)
                            .then(resp => {
                                this.setState({
                                    image: resp.data,
                                    isLoading: false                        
                                })
                            })
                })
    }


    render() {
        const { produit, image, isLoading } = this.state
        if(isLoading) return <Loader/>
        return (
            <div>

                <MenuCategoriesComp/>

                <div className="container-fluid detailProduit">
                    <div>
                        <h5>{produit.name}</h5>
                        <img alt="" src={image.path}/>
                    </div>
                    <div>
                        <h4>{produit.price}€</h4>
                        <button className="btn btn-outline-warning">AJOUTER AU PANIER</button>
                    </div>
                
                </div>
            </div>
        );
    }
}

export default DetailProduitView;