import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuCategoriesComp extends Component {
    render() {
        return (
            <>
                    <div className="categoriesProduits">
                        <div className="items">
                            <div className="items-head">
                                <p>Catégories</p>
                                <hr/>
                            </div>
                            
                            <div className="items-body">
                                <div className="items-body-content">
                                    <Link to="/">Accueil</Link>
                                    <i className="fa fa-angle-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
            </>
        );
    }
}

export default MenuCategoriesComp;