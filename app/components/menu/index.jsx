

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import ClassNames from "classnames";


import './_style.scss';



export default class MainMenu extends Component {

    render() {

        let {className} = this.props;

        className = ClassNames('MainMenu', className);

        return (

            <nav className={className}>
                <div id="logo">
                    <img width="110px" src="/resources/images/logo.svg"/>
                </div>

                <ul id="links">
                    <li>
                        <Link to="/services">Services</Link>
                    </li>
                    <li>
                        <Link to="/product">Product</Link>
                    </li>
                    <li>
                        <Link to="/case-studies">Case Studies</Link>
                    </li>
                    <li>
                        <Link to="/about">Company</Link>
                    </li>
                    <li>
                        <Link to="/contact-us">Contact</Link>
                    </li>
                    <li>
                        <Link to="_blank" className="login" href="/login">Login</Link>
                    </li>
                </ul>
            </nav>


    );
}

}


