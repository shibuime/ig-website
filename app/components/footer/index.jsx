

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import ClassNames from "classnames";
import Icon from "../icon/index";
import BGImg from "../bg-img/";


import './_style.scss';



export default class MainMenu extends Component {

    render() {

        let {className} = this.props;

        className = ClassNames('Footer', className);

        return (
            <footer className={className}>

                <div className="image">
                    <BGImg cover src="/resources/images/footer.jpg"/>
                </div>

                <ul className="links">
                    <li>
                        <Link className="footer-link" to="/about">
                            <span className="label">Learn more about Intelligo</span>
                            <Icon type="arrow-right"/>
                        </Link>
                    </li>
                    <li>
                        <div className="footer-link">
                            <span className="label">Join our newsletter_</span>
                            <Icon type="arrow-right"/>
                        </div>
                    </li>
                    <li>
                        <Link className="footer-link" to="/contact-us">
                            <span className="label">Contact Us</span>
                            <Icon type="arrow-right"/>
                        </Link>
                    </li>
                    <li  className="footer-link social">
                        <a className="linkedin" href="#" target="_blank">
                            <Icon type="linkedin"/>
                        </a>
                        <a className="twitter" href="#" target="_blank">
                            <Icon type="twitter"/>
                        </a>
                        <a className="facebook" href="#" target="_blank">
                            <Icon type="facebook"/>
                        </a>
                        <a className="google" href="#" target="_blank">
                            <Icon type="google"/>
                        </a>
                    </li>
                </ul>


                <div className="rights">
                    All rights reserved to Intelligo Group 2017
                </div>

            </footer>


    );
}

}


