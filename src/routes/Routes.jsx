import React, { Component } from 'react';
import { createBrowserHistory } from 'history'
import { Switch, Route } from 'react-router-dom';
import ErrorView from './../shared/components/ErrorView';
import Home from '../views/Home';
import DetailProduitView from './../views/DetailProduitView';
import ConnexionView from './../views/ConnexionView';
import Deconnexion from './../components/Deconnexion';
import PanierView from './../views/PanierView';
import CategorieView from './../views/CategorieView';


const customHistory = createBrowserHistory()

class Routes extends Component {
    render() {
        return (
            <Switch history={customHistory}>
                <Route exact path="/" component={Home}/>
                <Route exact path="/Home" component={Home}/>
                <Route path="/Home/:type" component={CategorieView}/>
                <Route path="/Produit/:id" component={DetailProduitView}/>
                <Route path="/Panier" component={PanierView}/>
                <Route path="/Connexion" component={ConnexionView}/>
                <Route path="/Deconnexion" component={Deconnexion}/>
                <Route component={ErrorView}/>
            </Switch>
        );
    }
}

export default Routes;