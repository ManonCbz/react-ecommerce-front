import React, { Component } from 'react';
import Loader from '../shared/components/Loader';
import apiLibre from './../api/apiLibre';
import MenuCategoriesComp from './../components/MenuCategoriesComp';

var nbProduit = 1
class DetailProduitView extends Component {

    state = {
        produit: '',
        image: '',
        panier: [],
        isLoading: true
    }

    componentDidMount(){
        
        if(localStorage.getItem("panier")) {
            this.setState({ panier: JSON.parse(localStorage.getItem("panier")) })
        }

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

    ajouterAuPanier = (p) => {
        const panier = this.state.panier
        for(var i = 0; i < nbProduit; i++) {
            panier.push(p)
        }
        localStorage.setItem("panier", JSON.stringify(panier));
        window.location.reload();
    }

    render() {
        const { produit, image, isLoading } = this.state
        if(isLoading) return <Loader/>
        return (
            <div>
                <MenuCategoriesComp/>
                <div className="detailProduit">
                    <div className="w-75">
                        <h4>{produit.name}</h4>
                        <img alt="" src={image.path}/>
                    </div>
                    <div className="w-25 description">
                        <h4>{produit.price}€</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <div class="input-group mb-3">
                            <input type="number" class="form-control" placeholder="1" min="1" aria-describedby="button-addon2"
                                onChange={e => nbProduit = e.target.value}/>
                            <div class="input-group-append">
                                <button class="btn btn-warning text-secondary" type="button" id="button-addon2" onClick={() => this.ajouterAuPanier(produit)}>AJOUTER AU PANIER</button>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
        );
    }
}

export default DetailProduitView;