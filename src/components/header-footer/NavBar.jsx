import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../shared/components/Loader';
import apiToken from './../../api/apiToken';

class NavBar extends Component {

    state = {
        utilisateur: null,
        isLoading: true
    }

    componentDidMount() { 
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
        const { utilisateur, isLoading } = this.state
        if(isLoading) return <Loader/>
        if(utilisateur === null) {
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
                                <span className="">Mon panier</span>
                            </Link>
                        </form>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="navbar navbar-light bg-dark">
                    <Link className="navbar-brand text-white" to="/Home">Hard Corner</Link>
                    <div>
                        <form className="form-inline">
                            <div class="nav-item dropdown">
                                <div class="nav-link ml-4 connexionIcon d-flex flex-column" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-user text-center" aria-hidden="true"></i>
                                    <span className="">Bonjour {utilisateur.login} <i class="fa fa-caret-down" aria-hidden="true"></i></span>
                                </div>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link class="dropdown-item" to="#">Mon compte</Link>
                                    <div class="dropdown-divider"></div>
                                    <Link class="dropdown-item" to="/Deconnexion">Déconnexion</Link>
                                </div>
                            </div>
                            <Link className="ml-4 connexionIcon d-flex flex-column" to="/Panier">
                                <i className="fa fa-shopping-basket text-center" aria-hidden="true" title="Mon panier"></i>
                                <span className="">Mon panier</span>
                            </Link>                    
                        </form>
                    </div>
                </div>
            );
        }
    }
}

export default NavBar;