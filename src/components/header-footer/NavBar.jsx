import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiToken from './../../api/apiToken';

class NavBar extends Component {

    state = {
        utilisateur: null,
        nbPanier: 0,
        isLoading: true
    }

    componentDidMount() { 

        if(localStorage.getItem("panier")) {
            this.setState({ nbPanier: JSON.parse(localStorage.getItem("panier")).length })
        }

        if(localStorage.getItem("token")) {
            apiToken.get("/public/account")
                   .then((resp) => {
                        this.setState({ utilisateur: resp.data, isLoading: false })
                        console.log(resp.data)
                   })
                   .catch()
        }
        else this.setState({isLoading: false})
    }

    render() {
        const { utilisateur, nbPanier, isLoading } = this.state
        if(isLoading) {
            return (
                <div className="navbar navbar-light bg-dark">
                    <Link className="navbar-brand text-white" to="/Home">Hard Corner</Link>
                    <div>
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                </div>
            )
        }
        if(!isLoading && utilisateur === null) {
            return (
                <div className="navbar navbar-light bg-dark">
                    <Link className="navbar-brand text-white" to="/Home">Hard Corner</Link>
                    <div>
                        <form className="form-inline">
                            <Link className="ml-4 connexionIcon d-flex flex-column" to="/Connexion" title="Mon compte">
                                    <i className="fa fa-user text-center" aria-hidden="true"></i>
                                    <span className="">S'identifier</span>
                            </Link>
                            <Link className="ml-4 connexionIcon d-flex flex-column" to="/Panier">
                                <i className="fa fa-shopping-basket text-center" aria-hidden="true" title="Mon panier"></i>
                                <span className="">Mon panier <span>{nbPanier === 0 ? "" : "(" + nbPanier + ")"}</span></span>
                            </Link>
                        </form>
                    </div>
                </div>
            );
        }
        else if(!isLoading && utilisateur !== null) {
            return (
                <div className="navbar navbar-light bg-dark">
                    <Link className="navbar-brand text-white" to="/Home">Hard Corner</Link>
                    <div>
                        <form className="form-inline">
                            <div className="nav-item dropdown">
                                <div className="nav-link ml-4 connexionIcon d-flex flex-column" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-user text-center" aria-hidden="true"></i>
                                    <span className="">Bonjour {utilisateur.login} <i className="fa fa-caret-down" aria-hidden="true"></i></span>
                                </div>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="#">Mon compte</Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" to="/Deconnexion">Déconnexion</Link>
                                </div>
                            </div>
                            <Link className="ml-4 connexionIcon d-flex flex-column" to="/Panier">
                                <i className="fa fa-shopping-basket text-center" aria-hidden="true" title="Mon panier"></i>
                                <span className="">Mon panier <span>{nbPanier === 0 ? "" : "(" + nbPanier + ")"}</span></span>
                            </Link>                    
                        </form>
                    </div>
                </div>
            );
        }
    }
}

export default NavBar;