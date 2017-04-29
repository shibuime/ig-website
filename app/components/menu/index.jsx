

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import ClassNames from "classnames";
import Icon from "../../components/icon/icon";
import Button from "../../components/button/button";


import './_style.scss';



export default class MainMenu extends Component {

    render() {

        let {className} = this.props;

        className = ClassNames('MainMenu', className);

        return (

            <nav className={className}>
                <Link to="/" id="logo">
                    <img width="110px" src="/resources/images/logo.svg"/>
                </Link>

                <ul id="links">
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact-us">Contact Us</Link>
                    </li>
                    <li>
                        <Button white small to="/login">
                            <span className="label">Login</span>
                        </Button>
                    </li>
                    <li>
                        <Button primary small to="/request-a-demo">
                            <span className="label">Request a demo</span>
                        </Button>
                    </li>
                </ul>
            </nav>


    );
}

}


